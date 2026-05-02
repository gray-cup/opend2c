"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";

const invoices = [
  { id: "INV-2025-041", order: "#ORD-1048", buyer: "Blue Leaf Roasters", amount: "₹32,000", gst: "₹5,760", total: "₹37,760", date: "Apr 20, 2025", status: "unpaid" },
  { id: "INV-2025-040", order: "#ORD-1047", buyer: "Mehtabrands Pvt Ltd", amount: "₹44,500", gst: "₹8,010", total: "₹52,510", date: "Apr 19, 2025", status: "paid" },
  { id: "INV-2025-038", order: "#ORD-1046", buyer: "Cafe De Lune", amount: "₹37,000", gst: "₹6,660", total: "₹43,660", date: "Apr 18, 2025", status: "paid" },
  { id: "INV-2025-035", order: "#ORD-1045", buyer: "Jain Spice House", amount: "₹72,500", gst: "₹13,050", total: "₹85,550", date: "Apr 15, 2025", status: "paid" },
  { id: "INV-2025-030", order: "#ORD-1044", buyer: "Rao Procurement Co.", amount: "₹16,200", gst: "₹2,916", total: "₹19,116", date: "Apr 8, 2025", status: "overdue" },
];

const statusStyles: Record<string, string> = {
  paid: "bg-green-50 text-green-700 border-green-200",
  unpaid: "bg-yellow-50 text-yellow-700 border-yellow-200",
  overdue: "bg-red-50 text-red-600 border-red-200",
};

const tabs = ["Invoices", "Tax Summary", "Bank Details"] as const;
type Tab = typeof tabs[number];

export default function BillingPage() {
  const [activeTab, setActiveTab] = useState<Tab>("Invoices");

  return (
    <div className="px-8 py-8 max-w-4xl">
      <div className="mb-6">
        <h1 className="text-xl font-semibold text-neutral-900">Taxes & Billing</h1>
        <p className="mt-0.5 text-sm text-neutral-500">Manage invoices, GST filings, and payout details.</p>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
        {[
          { label: "Total Billed", value: "₹2,38,596", sub: "This quarter" },
          { label: "GST Collected", value: "₹36,396", sub: "18% rate" },
          { label: "Pending Payouts", value: "₹37,760", sub: "1 unpaid invoice" },
          { label: "Overdue", value: "₹19,116", sub: "1 invoice" },
        ].map((s) => (
          <div key={s.label} className="rounded-xl border border-neutral-200 bg-white p-4">
            <p className="text-xs text-neutral-500">{s.label}</p>
            <p className="mt-1 text-lg font-semibold text-neutral-900">{s.value}</p>
            <p className="text-xs text-neutral-400 mt-0.5">{s.sub}</p>
          </div>
        ))}
      </div>

      {/* Tabs */}
      <div className="flex gap-1 mb-5">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
              activeTab === tab ? "bg-neutral-900 text-white" : "text-neutral-600 hover:bg-neutral-100"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {activeTab === "Invoices" && (
        <div className="rounded-xl border border-neutral-200 bg-white overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-neutral-100 bg-neutral-50">
                <th className="text-left text-xs font-medium text-neutral-500 px-5 py-3">Invoice</th>
                <th className="text-left text-xs font-medium text-neutral-500 px-4 py-3">Buyer</th>
                <th className="text-left text-xs font-medium text-neutral-500 px-4 py-3">Subtotal</th>
                <th className="text-left text-xs font-medium text-neutral-500 px-4 py-3">GST (18%)</th>
                <th className="text-left text-xs font-medium text-neutral-500 px-4 py-3">Total</th>
                <th className="text-left text-xs font-medium text-neutral-500 px-4 py-3">Date</th>
                <th className="text-left text-xs font-medium text-neutral-500 px-4 py-3">Status</th>
                <th className="px-4 py-3" />
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-100">
              {invoices.map((inv) => (
                <tr key={inv.id} className="hover:bg-neutral-50 transition-colors">
                  <td className="px-5 py-3.5">
                    <p className="font-medium text-neutral-900">{inv.id}</p>
                    <p className="text-xs text-neutral-400">{inv.order}</p>
                  </td>
                  <td className="px-4 py-3.5 text-neutral-700">{inv.buyer}</td>
                  <td className="px-4 py-3.5 text-neutral-700">{inv.amount}</td>
                  <td className="px-4 py-3.5 text-neutral-500">{inv.gst}</td>
                  <td className="px-4 py-3.5 font-medium text-neutral-900">{inv.total}</td>
                  <td className="px-4 py-3.5 text-xs text-neutral-500">{inv.date}</td>
                  <td className="px-4 py-3.5">
                    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium border capitalize ${statusStyles[inv.status]}`}>
                      {inv.status}
                    </span>
                  </td>
                  <td className="px-4 py-3.5">
                    <button className="text-xs text-neutral-500 hover:text-neutral-900 transition-colors">Download</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {activeTab === "Tax Summary" && (
        <div className="space-y-4">
          <div className="rounded-xl border border-neutral-200 bg-white p-5">
            <h2 className="text-sm font-semibold text-neutral-900 mb-4">GST Summary – Q1 FY 2025–26</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {[
                { label: "Taxable Turnover", value: "₹2,02,200" },
                { label: "CGST (9%)", value: "₹18,198" },
                { label: "SGST (9%)", value: "₹18,198" },
              ].map((row) => (
                <div key={row.label} className="rounded-lg bg-neutral-50 border border-neutral-100 p-4">
                  <p className="text-xs text-neutral-500">{row.label}</p>
                  <p className="mt-1 text-lg font-semibold text-neutral-900">{row.value}</p>
                </div>
              ))}
            </div>
            <div className="mt-4 pt-4 border-t border-neutral-100 flex items-center justify-between">
              <div>
                <p className="text-xs text-neutral-500">GSTIN</p>
                <p className="text-sm font-medium text-neutral-900 mt-0.5">27AAAAA0000A1Z5</p>
              </div>
              <div>
                <p className="text-xs text-neutral-500">Next GSTR-1 Due</p>
                <p className="text-sm font-medium text-neutral-900 mt-0.5">May 11, 2025</p>
              </div>
              <Button variant="redoutline" size="minor">Download GSTR Report</Button>
            </div>
          </div>

          <div className="rounded-xl border border-neutral-200 bg-white p-5">
            <h2 className="text-sm font-semibold text-neutral-900 mb-3">TDS Deductions</h2>
            <p className="text-sm text-neutral-500 mb-3">
              TDS at 1% applies on marketplace transactions above ₹50,000 per buyer per year under Section 194-O.
            </p>
            <div className="grid grid-cols-2 gap-4">
              <div className="rounded-lg bg-neutral-50 border border-neutral-100 p-4">
                <p className="text-xs text-neutral-500">TDS Deducted (YTD)</p>
                <p className="mt-1 text-lg font-semibold text-neutral-900">₹2,022</p>
              </div>
              <div className="rounded-lg bg-neutral-50 border border-neutral-100 p-4">
                <p className="text-xs text-neutral-500">Form 26AS Status</p>
                <p className="mt-1 text-sm font-semibold text-green-700">Reflected</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === "Bank Details" && (
        <div className="space-y-4">
          <div className="rounded-xl border border-neutral-200 bg-white p-5">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-sm font-semibold text-neutral-900">Payout Bank Account</h2>
              <button className="text-xs text-neutral-600 border border-neutral-200 px-3 py-1.5 rounded-lg hover:bg-neutral-50 transition-colors">
                Update
              </button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { label: "Account Holder", value: "Ravi Kumar" },
                { label: "Bank Name", value: "State Bank of India" },
                { label: "Account Number", value: "••••  ••••  4821" },
                { label: "IFSC Code", value: "SBIN0001234" },
              ].map((row) => (
                <div key={row.label}>
                  <p className="text-xs text-neutral-500">{row.label}</p>
                  <p className="mt-0.5 text-sm text-neutral-900">{row.value}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-xl border border-neutral-200 bg-white p-5">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-sm font-semibold text-neutral-900">Payout Schedule</h2>
            </div>
            <div className="space-y-3">
              {[
                { label: "Settlement Cycle", value: "T+3 days after delivery confirmation" },
                { label: "Minimum Payout Threshold", value: "₹500" },
                { label: "Next Scheduled Payout", value: "Apr 23, 2025" },
                { label: "Amount to be Settled", value: "₹37,760" },
              ].map((row) => (
                <div key={row.label} className="flex items-center justify-between py-2 border-b border-neutral-50 last:border-0">
                  <p className="text-sm text-neutral-500">{row.label}</p>
                  <p className="text-sm font-medium text-neutral-900">{row.value}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
