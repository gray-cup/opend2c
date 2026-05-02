"use client";

import Link from "next/link";
import { useState } from "react";
import { PRODUCTS } from "@/lib/products";

const categories = ["All", "Tea", "Coffee", "Spices"];

const categoryColors: Record<string, string> = {
  Tea: "bg-emerald-50 text-emerald-700",
  Coffee: "bg-amber-50 text-amber-700",
  Spices: "bg-orange-50 text-orange-700",
};

export default function BuyerProductsPage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [search, setSearch] = useState("");

  const filtered = PRODUCTS.filter((p) => {
    const matchesCategory = activeCategory === "All" || p.category === activeCategory;
    const matchesSearch =
      search === "" ||
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.origin.toLowerCase().includes(search.toLowerCase()) ||
      p.seller.toLowerCase().includes(search.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="px-8 py-8">
      <div className="mb-6">
        <h1 className="text-xl font-semibold text-neutral-900">Browse Products</h1>
        <p className="mt-0.5 text-sm text-neutral-500">
          Source directly from verified farms and estates across India.
        </p>
      </div>

      {/* Search + filters */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 mb-6">
        <div className="relative flex-1 max-w-sm">
          <svg className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
          </svg>
          <input
            type="text"
            placeholder="Search by name, origin, seller..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2 rounded-lg border border-neutral-200 text-sm text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-neutral-900 focus:border-transparent bg-white"
          />
        </div>

        <div className="flex gap-1">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                activeCategory === cat
                  ? "bg-neutral-900 text-white"
                  : "text-neutral-600 hover:bg-neutral-100 bg-white border border-neutral-200"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Results count */}
      <p className="text-xs text-neutral-400 mb-4">
        {filtered.length} product{filtered.length !== 1 ? "s" : ""} found
      </p>

      {/* Product grid */}
      {filtered.length === 0 ? (
        <div className="text-center py-16 text-neutral-400">
          <svg className="mx-auto h-8 w-8 mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z" />
          </svg>
          <p className="text-sm">No products match your search.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((product) => {
            const bestDiscount = product.discountTiers[product.discountTiers.length - 1]?.discountPct ?? 0;
            return (
              <Link
                key={product.id}
                href={`/buyer/products/${product.slug}`}
                className="group rounded-xl border border-neutral-200 bg-white hover:border-neutral-300 hover:shadow-sm transition-all overflow-hidden"
              >
                {/* Product image placeholder */}
                <div className="h-36 bg-gradient-to-br from-neutral-100 to-neutral-50 flex items-center justify-center relative">
                  <span className="text-4xl select-none">
                    {product.category === "Tea" ? "🍵" : product.category === "Coffee" ? "☕" : "🌿"}
                  </span>
                  {bestDiscount > 0 && (
                    <span className="absolute top-2.5 right-2.5 bg-red-500 text-white text-[10px] font-semibold px-1.5 py-0.5 rounded-full">
                      Up to {bestDiscount}% off
                    </span>
                  )}
                </div>

                <div className="p-4">
                  <div className="flex items-start justify-between gap-2 mb-1">
                    <h3 className="text-sm font-semibold text-neutral-900 leading-snug group-hover:text-neutral-700 transition-colors">
                      {product.name}
                    </h3>
                    <span className={`shrink-0 text-[10px] font-medium px-1.5 py-0.5 rounded-full ${categoryColors[product.category] ?? "bg-neutral-100 text-neutral-600"}`}>
                      {product.category}
                    </span>
                  </div>

                  <p className="text-xs text-neutral-500 mb-3">
                    {product.farm} · {product.origin}
                  </p>

                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-base font-semibold text-neutral-900">
                        ₹{product.price.toLocaleString("en-IN")}
                      </span>
                      <span className="text-xs text-neutral-400 ml-1">/{product.unit}</span>
                    </div>
                    <span className="text-xs text-neutral-400">{product.stock} {product.unit} avail.</span>
                  </div>

                  {/* Discount tiers preview */}
                  {product.discountTiers.length > 0 && (
                    <div className="mt-3 pt-3 border-t border-neutral-100 flex gap-2 flex-wrap">
                      {product.discountTiers.map((tier) => (
                        <span key={tier.minQty} className="text-[10px] bg-green-50 text-green-700 border border-green-100 px-1.5 py-0.5 rounded-full">
                          {tier.minQty}+ {product.unit} → {tier.discountPct}% off
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}
