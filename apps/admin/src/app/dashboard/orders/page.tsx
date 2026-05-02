"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";

type OrderStatus = "pending" | "processing" | "shipped" | "delivered" | "cancelled";

type Order = {
  id: string;
  buyer: string;
  company: string;
  product: string;
  quantity: string;
  amount: string;
  date: string;
  status: OrderStatus;
};

const mockOrders: Order[] = [
  { id: "#ORD-1048", buyer: "Ravi Sharma", company: "Blue Leaf Roasters", product: "Assam Orthodox Black Tea", quantity: "100 kg", amount: "₹32,000", date: "Apr 20, 2025", status: "pending" },
  { id: "#ORD-1047", buyer: "Priya Mehta", company: "Mehtabrands Pvt Ltd", product: "Darjeeling First Flush", quantity: "50 kg", amount: "₹44,500", date: "Apr 19, 2025", status: "processing" },
  { id: "#ORD-1046", buyer: "Cafe De Lune", company: "Cafe De Lune", product: "Green Coffee Beans – Robusta", quantity: "200 kg", amount: "₹37,000", date: "Apr 18, 2025", status: "shipped" },
  { id: "#ORD-1045", buyer: "Amit Jain", company: "Jain Spice House", product: "Turmeric Fingers (Organic)", quantity: "500 kg", amount: "₹72,500", date: "Apr 15, 2025", status: "delivered" },
  { id: "#ORD-1044", buyer: "Sunita Rao", company: "Rao Procurement Co.", product: "Nilgiri Blue Mountain Tea", quantity: "30 kg", amount: "₹16,200", date: "Apr 14, 2025", status: "delivered" },
  { id: "#ORD-1043", buyer: "Ketan Patel", company: "Patel Traders", product: "Assam Orthodox Black Tea", quantity: "250 kg", amount: "₹80,000", date: "Apr 12, 2025", status: "cancelled" },
];

const statusConfig: Record<OrderStatus, { label: string; style: string }> = {
  pending: { label: "Pending", style: "bg-yellow-50 text-yellow-700 border-yellow-200" },
  processing: { label: "Processing", style: "bg-blue-50 text-blue-700 border-blue-200" },
  shipped: { label: "Shipped", style: "bg-purple-50 text-purple-700 border-purple-200" },
  delivered: { label: "Delivered", style: "bg-green-50 text-green-700 border-green-200" },
  cancelled: { label: "Cancelled", style: "bg-red-50 text-red-500 border-red-200" },
};

const tabs: { key: "all" | OrderStatus; label: string }[] = [
  { key: "all", label: "All" },
  { key: "pending", label: "Pending" },
  { key: "processing", label: "Processing" },
  { key: "shipped", label: "Shipped" },
  { key: "delivered", label: "Delivered" },
];

export default function OrdersPage() {
  const [activeTab, setActiveTab] = useState<"all" | OrderStatus>("all");
  const [expandedOrder, setExpandedOrder] = useState<string | null>(null);

  const filtered = activeTab === "all" ? mockOrders : mockOrders.filter((o) => o.status === activeTab);

  return (
    <div className="px-8 py-8">
      <div className="mb-6">
        <h1 className="text-xl font-semibold text-neutral-900">Orders</h1>
        <p className="mt-0.5 text-sm text-neutral-500">Track and manage incoming orders from buyers.</p>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
        {[
          { label: "Total Orders", value: "6", sub: "All time" },
          { label: "Pending", value: "1", sub: "Needs action" },
          { label: "In Transit", value: "1", sub: "Shipped" },
          { label: "Completed", value: "2", sub: "Delivered" },
        ].map((s) => (
          <div key={s.label} className="rounded-xl border border-neutral-200 bg-white p-4">
            <p className="text-xs text-neutral-500">{s.label}</p>
            <p className="mt-1 text-xl font-semibold text-neutral-900">{s.value}</p>
            <p className="text-xs text-neutral-400 mt-0.5">{s.sub}</p>
          </div>
        ))}
      </div>

      {/* Tabs */}
      <div className="flex gap-1 mb-4">
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

      {/* Orders list */}
      <div className="rounded-xl border border-neutral-200 bg-white overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-neutral-100 bg-neutral-50">
              <th className="text-left text-xs font-medium text-neutral-500 px-5 py-3">Order</th>
              <th className="text-left text-xs font-medium text-neutral-500 px-4 py-3">Buyer</th>
              <th className="text-left text-xs font-medium text-neutral-500 px-4 py-3">Product</th>
              <th className="text-left text-xs font-medium text-neutral-500 px-4 py-3">Qty</th>
              <th className="text-left text-xs font-medium text-neutral-500 px-4 py-3">Amount</th>
              <th className="text-left text-xs font-medium text-neutral-500 px-4 py-3">Date</th>
              <th className="text-left text-xs font-medium text-neutral-500 px-4 py-3">Status</th>
              <th className="px-4 py-3" />
            </tr>
          </thead>
          <tbody className="divide-y divide-neutral-100">
            {filtered.map((order) => (
              <React.Fragment key={order.id}>
                <tr
                  className="hover:bg-neutral-50 transition-colors cursor-pointer"
                  onClick={() => setExpandedOrder(expandedOrder === order.id ? null : order.id)}
                >
                  <td className="px-5 py-3.5 font-medium text-neutral-900">{order.id}</td>
                  <td className="px-4 py-3.5">
                    <p className="text-neutral-900">{order.buyer}</p>
                    <p className="text-xs text-neutral-400">{order.company}</p>
                  </td>
                  <td className="px-4 py-3.5 text-neutral-600 max-w-[180px] truncate">{order.product}</td>
                  <td className="px-4 py-3.5 text-neutral-600">{order.quantity}</td>
                  <td className="px-4 py-3.5 font-medium text-neutral-900">{order.amount}</td>
                  <td className="px-4 py-3.5 text-neutral-500 text-xs">{order.date}</td>
                  <td className="px-4 py-3.5">
                    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium border ${statusConfig[order.status].style}`}>
                      {statusConfig[order.status].label}
                    </span>
                  </td>
                  <td className="px-4 py-3.5">
                    <svg
                      className={`h-4 w-4 text-neutral-400 transition-transform ${expandedOrder === order.id ? "rotate-180" : ""}`}
                      fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                    </svg>
                  </td>
                </tr>
                {expandedOrder === order.id && (
                  <tr>
                    <td colSpan={8} className="px-5 py-4 bg-neutral-50 border-b border-neutral-100">
                      <div className="flex items-center gap-6">
                        <div>
                          <p className="text-xs text-neutral-500 mb-0.5">Delivery address</p>
                          <p className="text-sm text-neutral-700">Plot 12, APMC Market, Navi Mumbai, MH 400703</p>
                        </div>
                        <div>
                          <p className="text-xs text-neutral-500 mb-0.5">Payment</p>
                          <p className="text-sm text-neutral-700">Net 30 – Invoice pending</p>
                        </div>
                        {order.status === "pending" && (
                          <div className="ml-auto flex gap-2">
                            <Button variant="redoutline" size="minor">Accept Order</Button>
                            <button className="text-xs text-red-500 border border-red-200 px-3 py-1.5 rounded-lg hover:bg-red-50 transition-colors">
                              Decline
                            </button>
                          </div>
                        )}
                        {order.status === "processing" && (
                          <div className="ml-auto">
                            <Button variant="redoutline" size="minor">Mark as Shipped</Button>
                          </div>
                        )}
                      </div>
                    </td>
                  </tr>
                )}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
