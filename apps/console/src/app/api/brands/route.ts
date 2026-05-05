import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "@/lib/session";
import { getBrandByUserId, upsertBrand } from "@/lib/scraper-store";

export async function GET() {
  const session = await getServerSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const brand = await getBrandByUserId(session.user.id);
  return NextResponse.json(brand ?? null);
}

export async function POST(req: NextRequest) {
  const session = await getServerSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await req.json().catch(() => null);

  const name = typeof body?.name === "string" ? body.name.trim() : "";
  const rawSlug = typeof body?.slug === "string" ? body.slug.trim().toLowerCase() : "";
  const slug = rawSlug.replace(/[^a-z0-9-]/g, "-").replace(/-+/g, "-").replace(/^-|-$/g, "");

  if (!name) return NextResponse.json({ error: "Brand name is required" }, { status: 400 });
  if (!slug) return NextResponse.json({ error: "Brand slug is required" }, { status: 400 });
  if (!/^[a-z0-9-]+$/.test(slug)) {
    return NextResponse.json({ error: "Slug can only contain lowercase letters, numbers, and hyphens" }, { status: 400 });
  }

  try {
    const brand = await upsertBrand(session.user.id, {
      slug,
      name,
      description: typeof body?.description === "string" ? body.description.trim() : "",
      logo_url: typeof body?.logo_url === "string" ? body.logo_url.trim() || null : null,
      website_url: typeof body?.website_url === "string" ? body.website_url.trim() || null : null,
    });
    return NextResponse.json(brand, { status: 201 });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : "";
    if (msg.includes("unique") || msg.includes("duplicate")) {
      return NextResponse.json({ error: "That slug is already taken" }, { status: 409 });
    }
    return NextResponse.json({ error: "Could not save brand" }, { status: 500 });
  }
}
