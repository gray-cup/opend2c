import { NextRequest, NextResponse } from "next/server";
import { getAllActiveProducts, searchActiveProducts, type SortOption } from "@/lib/scraper-store";

const VALID_SORTS = new Set<SortOption>(["relevance", "price_asc", "price_desc", "newest"]);

function parseSort(raw: string | null): SortOption {
  if (raw && VALID_SORTS.has(raw as SortOption)) return raw as SortOption;
  return "relevance";
}

export async function GET(req: NextRequest) {
  const q        = req.nextUrl.searchParams.get("q")?.trim() ?? "";
  const sort     = parseSort(req.nextUrl.searchParams.get("sort"));
  const category = req.nextUrl.searchParams.get("category")?.trim() ?? "";

  let products = q
    ? await searchActiveProducts(q, sort)
    : await getAllActiveProducts(sort === "relevance" ? "newest" : sort);

  if (category) {
    products = products.filter((p) => p.category === category);
  }

  return NextResponse.json(products);
}
