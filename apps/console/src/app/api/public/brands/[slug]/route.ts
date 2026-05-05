import { NextRequest, NextResponse } from "next/server";
import { getBrandBySlug } from "@/lib/scraper-store";

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ slug: string }> },
) {
  const { slug } = await params;
  const brand = await getBrandBySlug(slug);
  if (!brand) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json(brand);
}
