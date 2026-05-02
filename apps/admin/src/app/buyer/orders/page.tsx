"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";

type OrderStatus = "pending" | "processing" | "shipped" | "delivered" | "cancelled";

type Order = {
  id: string;
  seller: string;
  farm: string;
  product: string;
  quantity: string;
  amount: string;
  placedOn: string;
  expectedBy: string;
  status: OrderStatus;
};

const mockOrders: Order[] = [
  { id: "#ORD-1048", seller: "Ravi Kumar", farm: "Brahmaputra Estates", product: "Assam Orthodox Black Tea", quantity: "100 kg", amount: "₹32,000", placedOn: "Apr 20, 2025", expectedBy: "Apr 27, 2025", status: "processing" },
  { id: "#ORD-1047", seller: "Deepika Singh", farm: "Hill Top Growers", product: "Darjeeling First Flush", quantity: "50 kg", amount: "₹44,500", placedOn: "Apr 19, 2025", expectedBy: "Apr 26, 2025", status: "pending" },
  { id: "#ORD-1046", seller: "Mohan Nair", farm: "Coorg Coffee Estate", product: "Green Coffee Beans – Robusta", quantity: "200 kg", amount: "₹37,000", placedOn: "Apr 18, 2025", expectedBy: "Apr 24, 2025", status: "shipped" },
  { id: "#ORD-1045", seller: "Suresh Pillai", farm: "Jain Spice Co.", product: "Turmeric Fingers (Organic)", quantity: "500 kg", amount: "₹72,500", placedOn: "Apr 10, 2025", expectedBy: "Apr 17, 2025", status: "delivered" },
  { id: "#ORD-1044", seller: "Kavitha R.", farm: "Nilgiri Estates", product: "Nilgiri Blue Mountain Tea", quantity: "30 kg", amount: "₹16,200", placedOn: "Apr 8, 2025", expectedBy: "Apr 15, 2025", status: "delivered" },
  { id: "#ORD-1042", seller: "Arun Thakur", farm: "North Bengal Tea", product: "Assam CTC Grade A", quantity: "300 kg", amount: "₹51,000", placedOn: "Mar 28, 2025", expectedBy: "Apr 5, 2025", status: "cancelled" },
];

const statusConfig: Record<OrderStatus, { label: string; style: string; dot: string }> = {
  pending: { label: "Pending", style: "bg-yellow-50 text-yellow-700 border-yellow-200", dot: "bg-yellow-400" },
  processing: { label: "Processing", style: "bg-blue-50 text-blue-700 border-blue-200", dot: "bg-blue-400" },
  shipped: { label: "Shipped", style: "bg-purple-50 text-purple-700 border-purple-200", dot: "bg-purple-400" },
  delivered: { label: "Delivered", style: "bg-green-50 text-green-700 border-green-200", dot: "bg-green-400" },
  cancelled: { label: "Cancelled", style: "bg-red-50 text-red-500 border-red-200", dot: "bg-red-400" },
};

const trackingSteps = ["Order Placed", "Confirmed", "Dispatched", "In Transit", "Delivered"];
const stepsByStatus: Record<OrderStatus, number> = {
  pending: 1,
  processing: 2,
  shipped: 3,
  delivered: 5,
  cancelled: 0,
};

const tabs: { key: "all" | OrderStatus; label: string }[] = [
  { key: "all", label: "All Orders" },
  { key: "pending", label: "Pending" },
  { key: "processing", label: "Processing" },
  { key: "shipped", label: "Shipped" },
  { key: "delivered", label: "Delivered" },
];

export default function BuyerOrdersPage() {
  const [activeTab, setActiveTab] = useState<"all" | OrderStatus>("all");
  const [expandedOrder, setExpandedOrder] = useState<string | null>(null);

  const filtered = activeTab === "all" ? mockOrders : mockOrders.filter((o) => o.status === activeTab);

  return (
    <div className="px-8 py-8">
      <div className="mb-6">
        <h1 className="text-xl font-semibold text-neutral-900">My Orders</h1>
        <p className="mt-0.5 text-sm text-neutral-500">Track the status of all your placed orders.</p>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
        {[
          { label: "Total Orders", value: "6" },
          { label: "Active", value: "3" },
          { label: "Delivered", value: "2" },
          { label: "Total Spent", value: "₹2,53,200" },
        ].map((s) => (
          <div key={s.label} className="rounded-xl border border-neutral-200 bg-white p-4">
            <p className="text-xs text-neutral-500">{s.label}</p>
            <p className="mt-1 text-xl font-semibold text-neutral-900">{s.value}</p>
          </div>
        ))}
      </div>

      {/* Tabs */}
      <div className="flex gap-1 mb-4 flex-wrap">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
              activeTab === tab.key
                ? "bg-neutral-900 text-white"
                : "text-neutral-600 hover:bg-neutral-100"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Orders */}
      <div className="space-y-3">
        {filtered.map((order) => (
          <div key={order.id} className="rounded-xl border border-neutral-200 bg-white overflow-hidden">
            {/* Order summary row */}
            <button
              className="w-full text-left px-5 py-4 hover:bg-neutral-50 transition-colors"
              onClick={() => setExpandedOrder(expandedOrder === order.id ? null : order.id)}
            >
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-4 min-w-0">
                  <div className="min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <p className="text-sm font-medium text-neutral-900">{order.product}</p>
                      <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium border ${statusConfig[order.status].style}`}>
                        <span className={`h-1.5 w-1.5 rounded-full ${statusConfig[order.status].dot}`} />
                        {statusConfig[order.status].label}
                      </span>
                    </div>
                    <p className="text-xs text-neutral-400 mt-0.5">{order.id} · {order.farm} · {order.quantity}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 shrink-0">
                  <div className="text-right hidden sm:block">
                    <p className="text-sm font-semibold text-neutral-900">{order.amount}</p>
                    <p className="text-xs text-neutral-400">Placed {order.placedOn}</p>
                  </div>
                  <svg
                    className={`h-4 w-4 text-neutral-400 transition-transform ${expandedOrder === order.id ? "rotate-180" : ""}`}
                    fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
            </button>

            {/* Expanded detail */}
            {expandedOrder === order.id && (
              <div className="border-t border-neutral-100 px-5 py-5 bg-neutral-50">
                {/* Tracking progress */}
                {order.status !== "cancelled" && (
                  <div className="mb-5">
                    <p className="text-xs font-medium text-neutral-700 mb-3">Order Tracking</p>
                    <div className="flex items-center gap-0">
                      {trackingSteps.map((step, idx) => {
                        const completed = idx < stepsByStatus[order.status];
                        const current = idx === stepsByStatus[order.status] - 1;
                        return (
                          <div key={step} className="flex items-center flex-1 last:flex-none">
                            <div className="flex flex-col items-center">
                              <div
                                className={`h-6 w-6 rounded-full flex items-center justify-center text-xs border-2 transition-colors ${
                                  completed
                                    ? "bg-neutral-900 border-neutral-900 text-white"
                                    : current
                                    ? "border-neutral-400 bg-white text-neutral-400"
                                    : "border-neutral-200 bg-white text-neutral-300"
                                }`}
                              >
                                {completed ? (
                                  <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                  </svg>
                                ) : (
                                  <span>{idx + 1}</span>
                                )}
                              </div>
                              <p className={`text-xs mt-1.5 text-center leading-tight max-w-[60px] ${completed ? "text-neutral-700" : "text-neutral-400"}`}>
                                {step}
                              </p>
                            </div>
                            {idx < trackingSteps.length - 1 && (
                              <div className={`flex-1 h-0.5 mb-5 mx-1 ${idx < stepsByStatus[order.status] - 1 ? "bg-neutral-900" : "bg-neutral-200"}`} />
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* Order details */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-sm">
                  <div>
                    <p className="text-xs text-neutral-500 mb-0.5">Seller</p>
                    <p className="text-neutral-800">{order.seller}</p>
                    <p className="text-xs text-neutral-400">{order.farm}</p>
                  </div>
                  <div>
                    <p className="text-xs text-neutral-500 mb-0.5">Amount</p>
                    <p className="text-neutral-800 font-medium">{order.amount}</p>
                    <p className="text-xs text-neutral-400">{order.quantity}</p>
                  </div>
                  <div>
                    <p className="text-xs text-neutral-500 mb-0.5">Placed On</p>
                    <p className="text-neutral-800">{order.placedOn}</p>
                  </div>
                  <div>
                    <p className="text-xs text-neutral-500 mb-0.5">Expected By</p>
                    <p className="text-neutral-800">{order.expectedBy}</p>
                  </div>
                </div>

                <div className="flex gap-2 mt-4">
                  <Button variant="redoutline" size="minor" asChild>
                    <a href="/buyer/chat">Message Seller</a>
                  </Button>
                  {order.status === "delivered" && (
                    <button className="text-xs border border-neutral-200 text-neutral-600 px-3 py-1.5 rounded-lg hover:bg-white transition-colors">
                      Reorder
                    </button>
                  )}
                  {(order.status === "pending" || order.status === "processing") && (
                    <button className="text-xs border border-red-200 text-red-500 px-3 py-1.5 rounded-lg hover:bg-red-50 transition-colors">
                      Cancel Order
                    </button>
                  )}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
