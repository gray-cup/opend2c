"use client";

import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { PRODUCTS, getDiscountForQty } from "@/lib/products";
import { useCart } from "@/lib/cart";

const categoryEmoji: Record<string, string> = {
  Tea: "🍵",
  Coffee: "☕",
  Spices: "🌿",
};

export default function ProductDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const router = useRouter();
  const { addItem } = useCart();

  const product = PRODUCTS.find((p) => p.slug === slug);
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);

  if (!product) {
    return (
      <div className="flex items-center justify-center h-full text-sm text-neutral-500">
        Product not found.
      </div>
    );
  }

  const discountPct = getDiscountForQty(product.discountTiers, qty);
  const unitPrice = product.price;
  const discountedPrice = unitPrice * (1 - discountPct / 100);
  const total = discountedPrice * qty;
  const savings = (unitPrice - discountedPrice) * qty;

  // Find next tier to show upsell hint
  const nextTier = product.discountTiers.find((t) => t.minQty > qty);

  function handleAddToCart() {
    addItem({
      productId: product!.id,
      slug: product!.slug,
      name: product!.name,
      price: product!.price,
      unit: product!.unit,
      quantity: qty,
      discountPct,
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  }

  function adjustQty(delta: number) {
    setQty((prev) => Math.max(1, Math.min(product!.stock, prev + delta)));
  }

  return (
    <div className="px-8 py-8 max-w-5xl">
      {/* Back */}
      <button
        onClick={() => router.back()}
        className="flex items-center gap-1.5 text-sm text-neutral-500 hover:text-neutral-900 transition-colors mb-6"
      >
        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
        </svg>
        Back to products
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
        {/* Left: product info */}
        <div className="lg:col-span-3 space-y-5">
          {/* Image placeholder */}
          <div className="rounded-xl bg-gradient-to-br from-neutral-100 to-neutral-50 border border-neutral-200 h-56 flex items-center justify-center">
            <span className="text-7xl select-none">{categoryEmoji[product.category] ?? "📦"}</span>
          </div>

          <div>
            <div className="flex items-start gap-3 flex-wrap mb-1">
              <h1 className="text-xl font-semibold text-neutral-900">{product.name}</h1>
              <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-neutral-100 text-neutral-600 mt-0.5">
                {product.category}
              </span>
            </div>
            <p className="text-sm text-neutral-500">
              {product.farm} · {product.origin} · Harvest {product.harvestYear}
            </p>
          </div>

          <p className="text-sm text-neutral-700 leading-relaxed">{product.description}</p>

          {/* Certifications */}
          <div>
            <p className="text-xs font-medium text-neutral-500 uppercase tracking-wide mb-2">Certifications</p>
            <div className="flex flex-wrap gap-1.5">
              {product.certifications.map((cert) => (
                <span
                  key={cert}
                  className="text-xs px-2 py-1 rounded-lg bg-green-50 text-green-700 border border-green-100 font-medium"
                >
                  {cert}
                </span>
              ))}
            </div>
          </div>

          {/* Seller */}
          <div className="rounded-lg border border-neutral-200 bg-white p-4 flex items-center gap-3">
            <div className="h-9 w-9 rounded-lg bg-neutral-100 flex items-center justify-center text-sm font-semibold text-neutral-700 shrink-0">
              {product.seller[0]}
            </div>
            <div>
              <p className="text-sm font-medium text-neutral-900">{product.seller}</p>
              <p className="text-xs text-neutral-500">{product.farm}</p>
            </div>
            <button className="ml-auto text-xs px-3 py-1.5 rounded-lg border border-neutral-200 text-neutral-600 hover:bg-neutral-50 transition-colors">
              Contact
            </button>
          </div>

          {/* Discount tiers table */}
          <div>
            <p className="text-xs font-medium text-neutral-500 uppercase tracking-wide mb-2">Volume Discounts</p>
            <div className="rounded-lg border border-neutral-200 overflow-hidden">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-neutral-50 border-b border-neutral-100">
                    <th className="text-left text-xs font-medium text-neutral-500 px-4 py-2.5">Min. Quantity</th>
                    <th className="text-left text-xs font-medium text-neutral-500 px-4 py-2.5">Discount</th>
                    <th className="text-left text-xs font-medium text-neutral-500 px-4 py-2.5">Price / {product.unit}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-100">
                  <tr className={qty < (product.discountTiers[0]?.minQty ?? Infinity) ? "bg-blue-50" : ""}>
                    <td className="px-4 py-2.5 text-neutral-700">1 {product.unit}</td>
                    <td className="px-4 py-2.5 text-neutral-500">No discount</td>
                    <td className="px-4 py-2.5 text-neutral-900 font-medium">₹{product.price.toLocaleString("en-IN")}</td>
                  </tr>
                  {product.discountTiers.map((tier, i) => {
                    const isActive = qty >= tier.minQty && (i === product.discountTiers.length - 1 || qty < product.discountTiers[i + 1].minQty);
                    const tierPrice = product.price * (1 - tier.discountPct / 100);
                    return (
                      <tr key={tier.minQty} className={isActive ? "bg-green-50" : ""}>
                        <td className="px-4 py-2.5 text-neutral-700">
                          {tier.minQty}+ {product.unit}
                          {isActive && (
                            <span className="ml-2 text-[10px] bg-green-500 text-white px-1.5 py-0.5 rounded-full font-medium">
                              Active
                            </span>
                          )}
                        </td>
                        <td className="px-4 py-2.5 font-medium text-green-700">{tier.discountPct}% off</td>
                        <td className="px-4 py-2.5 text-neutral-900 font-medium">
                          ₹{tierPrice.toLocaleString("en-IN", { maximumFractionDigits: 0 })}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Right: order panel */}
        <div className="lg:col-span-2">
          <div className="sticky top-6 rounded-xl border border-neutral-200 bg-white p-5 space-y-4">
            <div>
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-bold text-neutral-900">
                  ₹{discountedPrice.toLocaleString("en-IN", { maximumFractionDigits: 0 })}
                </span>
                <span className="text-sm text-neutral-400">/{product.unit}</span>
                {discountPct > 0 && (
                  <span className="text-sm text-neutral-400 line-through">
                    ₹{product.price.toLocaleString("en-IN")}
                  </span>
                )}
              </div>
              {discountPct > 0 && (
                <p className="text-xs font-medium text-green-600 mt-0.5">{discountPct}% volume discount applied</p>
              )}
            </div>

            {/* Quantity selector */}
            <div>
              <label className="block text-xs font-medium text-neutral-700 mb-2">
                Quantity ({product.unit})
              </label>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => adjustQty(-1)}
                  disabled={qty <= 1}
                  className="h-9 w-9 rounded-lg border border-neutral-200 flex items-center justify-center text-neutral-600 hover:bg-neutral-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                >
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M20 12H4" />
                  </svg>
                </button>
                <input
                  type="number"
                  min={1}
                  max={product.stock}
                  value={qty}
                  onChange={(e) => {
                    const v = parseInt(e.target.value);
                    if (!isNaN(v)) setQty(Math.max(1, Math.min(product.stock, v)));
                  }}
                  className="w-20 text-center rounded-lg border border-neutral-200 px-3 py-2 text-sm font-medium text-neutral-900 focus:outline-none focus:ring-2 focus:ring-neutral-900"
                />
                <button
                  onClick={() => adjustQty(1)}
                  disabled={qty >= product.stock}
                  className="h-9 w-9 rounded-lg border border-neutral-200 flex items-center justify-center text-neutral-600 hover:bg-neutral-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                >
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                  </svg>
                </button>
              </div>
              <p className="text-xs text-neutral-400 mt-1.5">{product.stock} {product.unit} available</p>
            </div>

            {/* Upsell hint */}
            {nextTier && (
              <div className="rounded-lg bg-amber-50 border border-amber-100 px-3 py-2.5">
                <p className="text-xs text-amber-700">
                  Add {nextTier.minQty - qty} more {product.unit} to unlock{" "}
                  <span className="font-semibold">{nextTier.discountPct}% off</span>
                </p>
              </div>
            )}

            {/* Order total */}
            <div className="rounded-lg bg-neutral-50 px-4 py-3 space-y-1.5">
              <div className="flex justify-between text-sm">
                <span className="text-neutral-600">Subtotal</span>
                <span className="text-neutral-900">₹{(product.price * qty).toLocaleString("en-IN")}</span>
              </div>
              {discountPct > 0 && (
                <div className="flex justify-between text-sm">
                  <span className="text-green-600">Volume discount ({discountPct}%)</span>
                  <span className="text-green-600">−₹{savings.toLocaleString("en-IN", { maximumFractionDigits: 0 })}</span>
                </div>
              )}
              <div className="flex justify-between text-sm font-semibold pt-1.5 border-t border-neutral-200">
                <span className="text-neutral-900">Total</span>
                <span className="text-neutral-900">₹{total.toLocaleString("en-IN", { maximumFractionDigits: 0 })}</span>
              </div>
            </div>

            {/* Add to cart */}
            <button
              onClick={handleAddToCart}
              className={`w-full py-2.5 rounded-lg text-sm font-semibold transition-all ${
                added
                  ? "bg-green-600 text-white"
                  : "bg-neutral-900 text-white hover:bg-neutral-700"
              }`}
            >
              {added ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                  </svg>
                  Added to Cart
                </span>
              ) : (
                "Add to Cart"
              )}
            </button>

            <p className="text-[11px] text-neutral-400 text-center">
              Final pricing confirmed on order placement. GST applicable.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
