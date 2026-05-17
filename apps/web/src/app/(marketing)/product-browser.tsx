"use client";

import { useState, useMemo } from "react";
import { Search } from "lucide-react";
import { withUTM } from "@/lib/utils";

type Product = {
  id: number;
  source_url: string;
  title: string;
  image: string | null;
  shop: string;
  price: string | null;
  currency: string | null;
  category: string | null;
};

const CATEGORY_ICONS: Record<string, string> = {
  "Skincare": "✨",
  "Haircare": "💆",
  "Bath & Body": "🛁",
  "Wellness": "🌿",
  "Coffee": "☕",
  "Tea": "🍵",
  "Masala & Spices": "🌶️",
  "Food & Snacks": "🍿",
  "Clothing": "👗",
  "Shoes": "👟",
  "Accessories": "💎",
  "Bags": "👜",
  "Jewellery": "💍",
  "Fragrances": "🌸",
  "Home & Living": "🏡",
};

function shuffle<T>(arr: T[]): T[] {
  const out = [...arr];
  for (let i = out.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [out[i], out[j]] = [out[j], out[i]];
  }
  return out;
}

export default function ProductBrowser({ products }: { products: Product[] }) {
  const [query, setQuery]         = useState("");
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const shuffled = useMemo(() => shuffle(products).slice(0, 30), []);

  // Derive categories that actually have products
  const categories = useMemo(() => {
    const seen = new Set<string>();
    for (const p of products) {
      if (p.category) seen.add(p.category);
    }
    return [...seen].sort();
  }, [products]);

  function trackClick(id: number) {
    fetch("/api/track-click", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    }).catch(() => {});
  }

  const filtered = (activeCategory ? products : shuffled).filter((p) => {
    if (activeCategory && p.category !== activeCategory) return false;
    const q = query.toLowerCase();
    return (
      !q ||
      p.title.toLowerCase().includes(q) ||
      p.shop.toLowerCase().includes(q) ||
      (p.category ?? "").toLowerCase().includes(q)
    );
  });

  return (
    <div>
      {/* Category pills */}
      {categories.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-6">
          <button
            onClick={() => setActiveCategory(null)}
            className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
              activeCategory === null
                ? "bg-neutral-900 text-white"
                : "bg-white border border-neutral-200 text-neutral-600 hover:border-neutral-400"
            }`}
          >
            All
          </button>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(activeCategory === cat ? null : cat)}
              className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors flex items-center gap-1.5 ${
                activeCategory === cat
                  ? "bg-neutral-900 text-white"
                  : "bg-white border border-neutral-200 text-neutral-600 hover:border-neutral-400"
              }`}
            >
              {CATEGORY_ICONS[cat] && <span>{CATEGORY_ICONS[cat]}</span>}
              {cat}
            </button>
          ))}
        </div>
      )}

      {/* Search box */}
      <div className="w-full max-w-xl mb-8">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-400 pointer-events-none" />
          <input
            type="text"
            placeholder="Search tea, coffee, spices by name or shop..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full rounded-lg border border-neutral-200 bg-white py-2.5 pl-9 pr-4 text-sm text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
          />
        </div>
      </div>

      {products.length === 0 ? (
        <p className="text-sm text-neutral-400 py-10">No products listed yet.</p>
      ) : filtered.length === 0 ? (
        <p className="text-sm text-neutral-400 py-10 text-center">
          No results for &ldquo;{query || activeCategory}&rdquo;
        </p>
      ) : (
        <>
          <p className="text-xs text-neutral-400 uppercase tracking-widest font-medium mb-4">
            {activeCategory || query
              ? `${filtered.length} ${filtered.length === 1 ? "product" : "products"}`
              : `Showing 30 of ${products.length} products`}
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {filtered.map((p) => (
              <a
                key={p.id}
                href={withUTM(p.source_url)}
                target="_blank"
                rel="noreferrer"
                onClick={() => trackClick(p.id)}
                className="rounded-xl bg-white hover:shadow-sm transition-all flex flex-col"
              >
                <div className="p-3 pb-0">
                  <div className="relative h-52 w-full bg-neutral-100 rounded-lg overflow-hidden">
                    {p.image ? (
                      <img
                        src={p.image}
                        alt={p.title}
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <div className="h-full w-full bg-neutral-100" />
                    )}
                  </div>
                </div>
                <div className="p-4 flex flex-col flex-1">
                  <h3 className="text-sm font-semibold text-neutral-900 mb-1 line-clamp-2">
                    {p.title}
                  </h3>
                  <p className="text-xs text-neutral-500 mb-2">{p.shop}</p>
                  {p.category && (
                    <span className="inline-block self-start rounded-full px-2 py-0.5 text-[10px] font-medium bg-neutral-100 text-neutral-500 mb-2">
                      {p.category}
                    </span>
                  )}
                  {p.price && (
                    <span className="text-sm font-semibold text-neutral-900 mt-auto">
                      {p.currency ? `${p.currency} ${p.price}` : p.price}
                    </span>
                  )}
                </div>
              </a>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
