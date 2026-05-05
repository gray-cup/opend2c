import { NextRequest } from "next/server";
import { getServerSession } from "@/lib/session";
import { getSitemap } from "@/lib/scraper-store";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const session = await getServerSession();
  if (!session) {
    return new Response("Unauthorized", { status: 401 });
  }

  const { id } = await params;
  const sitemapId = Number(id);
  if (!Number.isInteger(sitemapId)) {
    return new Response("Invalid id", { status: 400 });
  }

  const encoder = new TextEncoder();

  const stream = new ReadableStream({
    async start(controller) {
      const send = (data: object) => {
        controller.enqueue(encoder.encode(`data: ${JSON.stringify(data)}\n\n`));
      };

      const heartbeat = setInterval(() => {
        controller.enqueue(encoder.encode(`:ping\n\n`));
      }, 15_000);

      try {
        // Poll DB every second until done or failed
        while (true) {
          if (req.signal.aborted) break;

          const sitemap = await getSitemap(sitemapId);

          if (!sitemap || sitemap.user_id !== session.user.id) {
            send({ type: "error", message: "Not found" });
            break;
          }

          send({
            type: sitemap.status,
            scraped: sitemap.progress_scraped,
            total: sitemap.progress_total,
            product_count: sitemap.product_count,
            error: sitemap.error,
          });

          if (sitemap.status === "done" || sitemap.status === "failed") break;

          await new Promise((resolve) => setTimeout(resolve, 1000));
        }
      } finally {
        clearInterval(heartbeat);
        controller.close();
      }
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache",
      Connection: "keep-alive",
    },
  });
}
