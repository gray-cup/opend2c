"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";

type DiscountTier = { minQty: string; discountPct: string };

type Product = {
  id: string;
  name: string;
  category: string;
  origin: string;
  price: string;
  unit: string;
  quantity: string;
  status: "active" | "pending" | "draft";
  discountTiers?: DiscountTier[];
};

const mockProducts: Product[] = [
  { id: "P001", name: "Assam Orthodox Black Tea", category: "Tea", origin: "Assam, India", price: "₹320", unit: "kg", quantity: "500", status: "active", discountTiers: [{ minQty: "10", discountPct: "5" }, { minQty: "50", discountPct: "10" }, { minQty: "100", discountPct: "15" }] },
  { id: "P002", name: "Darjeeling First Flush", category: "Tea", origin: "Darjeeling, WB", price: "₹890", unit: "kg", quantity: "200", status: "active", discountTiers: [{ minQty: "5", discountPct: "4" }, { minQty: "20", discountPct: "8" }] },
  { id: "P003", name: "Green Coffee Beans – Robusta", category: "Coffee", origin: "Coorg, Karnataka", price: "₹185", unit: "kg", quantity: "1000", status: "pending" },
  { id: "P004", name: "Turmeric Fingers (Organic)", category: "Spices", origin: "Erode, Tamil Nadu", price: "₹145", unit: "kg", quantity: "800", status: "active", discountTiers: [{ minQty: "25", discountPct: "6" }, { minQty: "100", discountPct: "12" }] },
  { id: "P005", name: "Nilgiri Blue Mountain Tea", category: "Tea", origin: "Nilgiris, TN", price: "₹540", unit: "kg", quantity: "150", status: "draft" },
];

const statusStyles: Record<string, string> = {
  active: "bg-green-50 text-green-700 border-green-200",
  pending: "bg-yellow-50 text-yellow-700 border-yellow-200",
  draft: "bg-neutral-100 text-neutral-600 border-neutral-200",
};

const categories = ["Tea", "Coffee", "Spices", "Pulses", "Grains", "Other"];
const units = ["kg", "MT", "Quintal", "Bag (50kg)", "Box"];
const origins = [
  "Assam, India", "Darjeeling, WB", "Coorg, Karnataka", "Nilgiris, TN",
  "Munnar, Kerala", "Erode, Tamil Nadu", "Wayanad, Kerala", "Other",
];

const inputClass =
  "w-full rounded-lg border border-neutral-200 px-3 py-2 text-sm text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-neutral-900 focus:border-transparent";

export default function ProductsPage() {
  const [showForm, setShowForm] = useState(false);
  const [activeTab, setActiveTab] = useState<"all" | "active" | "pending" | "draft">("all");
  const [discountTiers, setDiscountTiers] = useState<DiscountTier[]>([]);
  const [expandedProduct, setExpandedProduct] = useState<string | null>(null);

  const filtered = activeTab === "all" ? mockProducts : mockProducts.filter((p) => p.status === activeTab);

  function addTier() {
    setDiscountTiers((prev) => [...prev, { minQty: "", discountPct: "" }]);
  }

  function removeTier(i: number) {
    setDiscountTiers((prev) => prev.filter((_, idx) => idx !== i));
  }

  function updateTier(i: number, field: keyof DiscountTier, value: string) {
    setDiscountTiers((prev) =>
      prev.map((t, idx) => (idx === i ? { ...t, [field]: value } : t))
    );
  }

  function handleCloseForm() {
    setShowForm(false);
    setDiscountTiers([]);
  }

  return (
    <div className="px-8 py-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-xl font-semibold text-neutral-900">Products</h1>
          <p className="mt-0.5 text-sm text-neutral-500">Manage your product listings.</p>
        </div>
        <Button variant="redoutline" onClick={() => setShowForm(!showForm)}>
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
          </svg>
          Add Product
        </Button>
      </div>

      {/* Create product form */}
      {showForm && (
        <div className="rounded-xl border border-neutral-200 bg-white p-6 mb-6">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-sm font-semibold text-neutral-900">New Product Listing</h2>
            <button onClick={handleCloseForm} className="text-neutral-400 hover:text-neutral-600">
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="sm:col-span-2">
              <label className="block text-xs font-medium text-neutral-700 mb-1">Product Name</label>
              <input type="text" placeholder="e.g. Assam CTC Grade A" className={inputClass} />
            </div>

            <div>
              <label className="block text-xs font-medium text-neutral-700 mb-1">Category</label>
              <select className={inputClass}>
                <option value="">Select category</option>
                {categories.map((c) => <option key={c}>{c}</option>)}
              </select>
            </div>

            <div>
              <label className="block text-xs font-medium text-neutral-700 mb-1">Origin</label>
              <select className={inputClass}>
                <option value="">Select origin</option>
                {origins.map((o) => <option key={o}>{o}</option>)}
              </select>
            </div>

            <div>
              <label className="block text-xs font-medium text-neutral-700 mb-1">Price per Unit (₹)</label>
              <input type="number" placeholder="e.g. 320" className={inputClass} />
            </div>

            <div>
              <label className="block text-xs font-medium text-neutral-700 mb-1">Unit</label>
              <select className={inputClass}>
                {units.map((u) => <option key={u}>{u}</option>)}
              </select>
            </div>

            <div>
              <label className="block text-xs font-medium text-neutral-700 mb-1">Available Quantity</label>
              <input type="number" placeholder="e.g. 500" className={inputClass} />
            </div>

            <div>
              <label className="block text-xs font-medium text-neutral-700 mb-1">Harvest Year</label>
              <select className={inputClass}>
                <option>2025</option>
                <option>2024</option>
                <option>2023</option>
              </select>
            </div>

            <div className="sm:col-span-2">
              <label className="block text-xs font-medium text-neutral-700 mb-1">Description</label>
              <textarea
                rows={3}
                placeholder="Describe quality, certifications, processing method..."
                className={`${inputClass} resize-none`}
              />
            </div>

            {/* Quantity-based discount tiers */}
            <div className="sm:col-span-2">
              <div className="flex items-center justify-between mb-2">
                <div>
                  <label className="block text-xs font-medium text-neutral-700">Volume Discounts</label>
                  <p className="text-xs text-neutral-400 mt-0.5">Offer % discounts when buyers order above a quantity threshold.</p>
                </div>
                <button
                  type="button"
                  onClick={addTier}
                  className="flex items-center gap-1.5 text-xs font-medium text-neutral-700 px-3 py-1.5 rounded-lg border border-neutral-200 hover:bg-neutral-50 transition-colors"
                >
                  <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                  </svg>
                  Add tier
                </button>
              </div>

              {discountTiers.length === 0 ? (
                <div className="rounded-lg border border-dashed border-neutral-200 py-5 text-center">
                  <p className="text-xs text-neutral-400">No discount tiers added. Click "Add tier" to offer volume pricing.</p>
                </div>
              ) : (
                <div className="rounded-lg border border-neutral-200 overflow-hidden">
                  <div className="grid grid-cols-[1fr_1fr_36px] bg-neutral-50 border-b border-neutral-100 px-4 py-2 gap-3">
                    <span className="text-xs font-medium text-neutral-500">Min. quantity</span>
                    <span className="text-xs font-medium text-neutral-500">Discount (%)</span>
                    <span />
                  </div>
                  <div className="divide-y divide-neutral-100">
                    {discountTiers.map((tier, i) => (
                      <div key={i} className="grid grid-cols-[1fr_1fr_36px] px-4 py-2.5 gap-3 items-center">
                        <div className="relative">
                          <input
                            type="number"
                            min={1}
                            placeholder="e.g. 50"
                            value={tier.minQty}
                            onChange={(e) => updateTier(i, "minQty", e.target.value)}
                            className="w-full rounded-md border border-neutral-200 px-3 py-1.5 text-sm text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-neutral-900 focus:border-transparent"
                          />
                        </div>
                        <div className="relative">
                          <input
                            type="number"
                            min={1}
                            max={100}
                            placeholder="e.g. 10"
                            value={tier.discountPct}
                            onChange={(e) => updateTier(i, "discountPct", e.target.value)}
                            className="w-full rounded-md border border-neutral-200 px-3 py-1.5 pr-7 text-sm text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-neutral-900 focus:border-transparent"
                          />
                          <span className="absolute right-2.5 top-1/2 -translate-y-1/2 text-xs text-neutral-400 pointer-events-none">%</span>
                        </div>
                        <button
                          type="button"
                          onClick={() => removeTier(i)}
                          className="h-7 w-7 flex items-center justify-center rounded-md text-neutral-300 hover:text-red-400 hover:bg-red-50 transition-colors"
                        >
                          <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </button>
                      </div>
                    ))}
                  </div>

                  {/* Preview */}
                  {discountTiers.some((t) => t.minQty && t.discountPct) && (
                    <div className="bg-green-50 border-t border-green-100 px-4 py-2.5 flex flex-wrap gap-2">
                      {discountTiers
                        .filter((t) => t.minQty && t.discountPct)
                        .sort((a, b) => Number(a.minQty) - Number(b.minQty))
                        .map((t, i) => (
                          <span key={i} className="text-[11px] bg-white text-green-700 border border-green-200 px-2 py-0.5 rounded-full font-medium">
                            {t.minQty}+ units → {t.discountPct}% off
                          </span>
                        ))}
                    </div>
                  )}
                </div>
              )}
            </div>

            <div className="sm:col-span-2">
              <label className="block text-xs font-medium text-neutral-700 mb-1">Product Images</label>
              <div className="border-2 border-dashed border-neutral-200 rounded-lg p-6 text-center hover:border-neutral-300 transition-colors cursor-pointer">
                <svg className="mx-auto h-6 w-6 text-neutral-400 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                </svg>
                <p className="text-xs text-neutral-500">Click to upload or drag and drop</p>
                <p className="text-xs text-neutral-400 mt-0.5">PNG, JPG up to 5MB</p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3 mt-5 pt-5 border-t border-neutral-100">
            <Button variant="redoutline">Submit for Review</Button>
            <button className="text-sm text-neutral-600 px-5 py-2 rounded-lg border border-neutral-200 hover:bg-neutral-50 transition-colors">
              Save as Draft
            </button>
          </div>
        </div>
      )}

      {/* Tabs */}
      <div className="flex gap-1 mb-4">
        {(["all", "active", "pending", "draft"] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium capitalize transition-colors ${
              activeTab === tab
                ? "bg-neutral-900 text-white"
                : "text-neutral-600 hover:bg-neutral-100"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Products table */}
      <div className="rounded-xl border border-neutral-200 bg-white overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-neutral-100 bg-neutral-50">
              <th className="text-left text-xs font-medium text-neutral-500 px-5 py-3">Product</th>
              <th className="text-left text-xs font-medium text-neutral-500 px-4 py-3">Category</th>
              <th className="text-left text-xs font-medium text-neutral-500 px-4 py-3">Origin</th>
              <th className="text-left text-xs font-medium text-neutral-500 px-4 py-3">Price</th>
              <th className="text-left text-xs font-medium text-neutral-500 px-4 py-3">Stock</th>
              <th className="text-left text-xs font-medium text-neutral-500 px-4 py-3">Discounts</th>
              <th className="text-left text-xs font-medium text-neutral-500 px-4 py-3">Status</th>
              <th className="px-4 py-3" />
            </tr>
          </thead>
          <tbody className="divide-y divide-neutral-100">
            {filtered.map((product) => (
              <>
                <tr key={product.id} className="hover:bg-neutral-50 transition-colors">
                  <td className="px-5 py-3.5">
                    <p className="font-medium text-neutral-900">{product.name}</p>
                    <p className="text-xs text-neutral-400">{product.id}</p>
                  </td>
                  <td className="px-4 py-3.5 text-neutral-600">{product.category}</td>
                  <td className="px-4 py-3.5 text-neutral-600">{product.origin}</td>
                  <td className="px-4 py-3.5 text-neutral-900 font-medium">{product.price}/{product.unit}</td>
                  <td className="px-4 py-3.5 text-neutral-600">{product.quantity} {product.unit}</td>
                  <td className="px-4 py-3.5">
                    {product.discountTiers && product.discountTiers.length > 0 ? (
                      <button
                        onClick={() => setExpandedProduct(expandedProduct === product.id ? null : product.id)}
                        className="flex items-center gap-1 text-xs text-green-700 hover:text-green-900 transition-colors"
                      >
                        <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M9 14l6-6m-5.5.5h.01m4.99 5h.01M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16l3.5-2 3.5 2 3.5-2 3.5 2z" />
                        </svg>
                        {product.discountTiers.length} tier{product.discountTiers.length !== 1 ? "s" : ""}
                      </button>
                    ) : (
                      <span className="text-xs text-neutral-400">None</span>
                    )}
                  </td>
                  <td className="px-4 py-3.5">
                    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium border capitalize ${statusStyles[product.status]}`}>
                      {product.status}
                    </span>
                  </td>
                  <td className="px-4 py-3.5">
                    <div className="flex items-center gap-2">
                      <button className="text-xs text-neutral-500 hover:text-neutral-900 transition-colors">Edit</button>
                      <button className="text-xs text-red-400 hover:text-red-600 transition-colors">Remove</button>
                    </div>
                  </td>
                </tr>
                {expandedProduct === product.id && product.discountTiers && (
                  <tr key={`${product.id}-tiers`} className="bg-green-50">
                    <td colSpan={8} className="px-5 py-3">
                      <div className="flex items-center gap-3 flex-wrap">
                        <span className="text-xs font-medium text-green-800">Volume discounts:</span>
                        {product.discountTiers.map((t) => (
                          <span key={t.minQty} className="text-xs bg-white text-green-700 border border-green-200 px-2 py-0.5 rounded-full">
                            {t.minQty}+ {product.unit} → {t.discountPct}% off
                          </span>
                        ))}
                      </div>
                    </td>
                  </tr>
                )}
              </>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
