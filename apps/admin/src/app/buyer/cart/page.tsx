"use client";

import Link from "next/link";
import { useCart } from "@/lib/cart";
import { getDiscountForQty, PRODUCTS } from "@/lib/products";

export default function CartPage() {
  const { items, updateQty, removeItem, clearCart } = useCart();

  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const totalDiscount = items.reduce((sum, item) => {
    const disc = item.price * (item.discountPct / 100) * item.quantity;
    return sum + disc;
  }, 0);
  const grandTotal = subtotal - totalDiscount;

  if (items.length === 0) {
    return (
      <div className="px-8 py-8">
        <div className="mb-6">
          <h1 className="text-xl font-semibold text-neutral-900">Cart</h1>
          <p className="mt-0.5 text-sm text-neutral-500">Your sourcing cart.</p>
        </div>
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <svg className="h-10 w-10 text-neutral-300 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
          </svg>
          <p className="text-sm font-medium text-neutral-700 mb-1">Your cart is empty</p>
          <p className="text-sm text-neutral-400 mb-4">Browse products and add items to start sourcing.</p>
          <Link
            href="/buyer/products"
            className="text-sm font-medium px-4 py-2 rounded-lg bg-neutral-900 text-white hover:bg-neutral-700 transition-colors"
          >
            Browse Products
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="px-8 py-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-xl font-semibold text-neutral-900">Cart</h1>
          <p className="mt-0.5 text-sm text-neutral-500">
            {items.length} item{items.length !== 1 ? "s" : ""} · Review before placing order
          </p>
        </div>
        <button
          onClick={clearCart}
          className="text-xs text-red-500 hover:text-red-700 transition-colors"
        >
          Clear all
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Cart items */}
        <div className="lg:col-span-2 space-y-3">
          {items.map((item) => {
            const product = PRODUCTS.find((p) => p.id === item.productId);
            const discountPct = getDiscountForQty(product?.discountTiers ?? [], item.quantity);
            const lineTotal = item.price * (1 - discountPct / 100) * item.quantity;
            const nextTier = product?.discountTiers.find((t) => t.minQty > item.quantity);

            return (
              <div key={item.productId} className="rounded-xl border border-neutral-200 bg-white p-4">
                <div className="flex items-start gap-4">
                  {/* Icon */}
                  <div className="h-12 w-12 rounded-lg bg-neutral-50 border border-neutral-100 flex items-center justify-center text-xl shrink-0">
                    {product?.category === "Tea" ? "🍵" : product?.category === "Coffee" ? "☕" : "🌿"}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <Link
                          href={`/buyer/products/${item.slug}`}
                          className="text-sm font-semibold text-neutral-900 hover:underline"
                        >
                          {item.name}
                        </Link>
                        <p className="text-xs text-neutral-400 mt-0.5">
                          ₹{item.price.toLocaleString("en-IN")}/{item.unit} base price
                        </p>
                      </div>
                      <button
                        onClick={() => removeItem(item.productId)}
                        className="text-neutral-300 hover:text-red-400 transition-colors shrink-0"
                      >
                        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>

                    <div className="flex items-center gap-4 mt-3">
                      {/* Quantity control */}
                      <div className="flex items-center gap-1.5">
                        <button
                          onClick={() => updateQty(item.productId, item.quantity - 1)}
                          className="h-7 w-7 rounded-md border border-neutral-200 flex items-center justify-center text-neutral-500 hover:bg-neutral-50 transition-colors"
                        >
                          <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M20 12H4" />
                          </svg>
                        </button>
                        <span className="w-12 text-center text-sm font-medium text-neutral-900">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQty(item.productId, item.quantity + 1)}
                          disabled={product ? item.quantity >= product.stock : false}
                          className="h-7 w-7 rounded-md border border-neutral-200 flex items-center justify-center text-neutral-500 hover:bg-neutral-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                        >
                          <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                          </svg>
                        </button>
                        <span className="text-xs text-neutral-400">{item.unit}</span>
                      </div>

                      {/* Price */}
                      <div className="ml-auto text-right">
                        <p className="text-sm font-semibold text-neutral-900">
                          ₹{lineTotal.toLocaleString("en-IN", { maximumFractionDigits: 0 })}
                        </p>
                        {discountPct > 0 && (
                          <p className="text-xs text-green-600">{discountPct}% off applied</p>
                        )}
                      </div>
                    </div>

                    {/* Upsell hint */}
                    {nextTier && (
                      <p className="text-[11px] text-amber-600 mt-2">
                        Add {nextTier.minQty - item.quantity} more {item.unit} to unlock {nextTier.discountPct}% off
                      </p>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Order summary */}
        <div>
          <div className="sticky top-6 rounded-xl border border-neutral-200 bg-white p-5 space-y-4">
            <h2 className="text-sm font-semibold text-neutral-900">Order Summary</h2>

            <div className="space-y-2">
              {items.map((item) => {
                const discountPct = getDiscountForQty(
                  PRODUCTS.find((p) => p.id === item.productId)?.discountTiers ?? [],
                  item.quantity
                );
                const lineTotal = item.price * (1 - discountPct / 100) * item.quantity;
                return (
                  <div key={item.productId} className="flex justify-between text-xs text-neutral-600">
                    <span className="truncate mr-2">{item.name} × {item.quantity} {item.unit}</span>
                    <span className="shrink-0 font-medium text-neutral-900">
                      ₹{lineTotal.toLocaleString("en-IN", { maximumFractionDigits: 0 })}
                    </span>
                  </div>
                );
              })}
            </div>

            <div className="border-t border-neutral-100 pt-3 space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-neutral-600">Subtotal</span>
                <span className="text-neutral-900">₹{subtotal.toLocaleString("en-IN")}</span>
              </div>
              {totalDiscount > 0 && (
                <div className="flex justify-between text-sm">
                  <span className="text-green-600">Volume discounts</span>
                  <span className="text-green-600 font-medium">
                    −₹{totalDiscount.toLocaleString("en-IN", { maximumFractionDigits: 0 })}
                  </span>
                </div>
              )}
              <div className="flex justify-between text-sm text-neutral-400">
                <span>GST & taxes</span>
                <span>Calculated at checkout</span>
              </div>
            </div>

            <div className="border-t border-neutral-200 pt-3 flex justify-between">
              <span className="text-sm font-semibold text-neutral-900">Total</span>
              <span className="text-base font-bold text-neutral-900">
                ₹{grandTotal.toLocaleString("en-IN", { maximumFractionDigits: 0 })}
              </span>
            </div>

            {totalDiscount > 0 && (
              <div className="rounded-lg bg-green-50 border border-green-100 px-3 py-2.5 text-xs text-green-700">
                You're saving{" "}
                <span className="font-semibold">
                  ₹{totalDiscount.toLocaleString("en-IN", { maximumFractionDigits: 0 })}
                </span>{" "}
                with volume discounts.
              </div>
            )}

            <button className="w-full py-2.5 rounded-lg bg-neutral-900 text-white text-sm font-semibold hover:bg-neutral-700 transition-colors">
              Place Order
            </button>
            <Link
              href="/buyer/products"
              className="block text-center text-sm text-neutral-500 hover:text-neutral-800 transition-colors"
            >
              Continue browsing
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
