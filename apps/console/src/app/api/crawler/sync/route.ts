import { NextRequest, NextResponse } from "next/server";
import {
  getSitemap,
  updateSitemapProgress,
  markSitemapDone,
  upsertProducts,
  syncCrawlerProducts,
} from "@/lib/scraper-store";

type SyncProduct = {
  source_url: string;
  title: string;
  image: string | null;
  shop: string;
  price: string | null;
  currency: string | null;
};

// Called by the Go crawler worker after each batch of products is scraped.
// When sitemapId is provided the products are linked to the brand's real sitemap
// record and progress is updated live. When done=true the sitemap is marked done.
// Falls back to the legacy crawler:jobId sentinel when sitemapId is absent.
export async function POST(req: NextRequest) {
  const secret = process.env.WORKER_SECRET ?? "";
  const auth = req.headers.get("Authorization") ?? "";
  if (!secret || auth !== `Bearer ${secret}`) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  const body = await req.json().catch(() => null);
  if (!body?.jobId || !Array.isArray(body?.products)) {
    return NextResponse.json({ error: "invalid payload" }, { status: 400 });
  }

  const {
    jobId,
    sitemapId,
    consoleUserId,
    scraped,
    total,
    done = false,
    products,
  } = body as {
    jobId: string;
    sitemapId?: number;
    consoleUserId?: string;
    scraped?: number;
    total?: number;
    done?: boolean;
    products: SyncProduct[];
  };

  if (sitemapId && consoleUserId) {
    // Linked mode: products belong to a real brand sitemap
    const sitemap = await getSitemap(sitemapId);
    if (!sitemap || sitemap.user_id !== consoleUserId) {
      return NextResponse.json({ error: "sitemap not found" }, { status: 404 });
    }

    await upsertProducts(consoleUserId, sitemapId, products);

    if (scraped !== undefined && total !== undefined) {
      await updateSitemapProgress(sitemapId, scraped, total);
    }

    if (done) {
      await markSitemapDone(sitemapId);
    }
  } else {
    // Legacy mode: orphaned under crawler:jobId
    await syncCrawlerProducts(jobId, products);
  }

  return NextResponse.json({ synced: products.length });
}
