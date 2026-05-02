"use client";

const stats = [
  { label: "Active Orders", value: "3" },
  { label: "Products Saved", value: "12" },
  { label: "Sellers Connected", value: "7" },
  { label: "Total Spent", value: "₹1,53,500" },
];

const recentActivity = [
  { text: "Order #ORD-1048 confirmed by Assam Tea Estate", time: "1h ago" },
  { text: "New message from Green Valley Farms regarding your inquiry", time: "3h ago" },
  { text: "Order #ORD-1045 delivered — Turmeric Fingers 500kg", time: "Yesterday" },
  { text: "Saved product: Nilgiri Blue Mountain Tea", time: "Yesterday" },
  { text: "Quote received from Coorg Coffee Estate", time: "2d ago" },
];

const recentOrders = [
  { id: "#ORD-1048", product: "Assam Orthodox Black Tea", seller: "Brahmaputra Estates", qty: "100 kg", amount: "₹32,000", status: "processing" },
  { id: "#ORD-1047", product: "Darjeeling First Flush", seller: "Hill Top Growers", qty: "50 kg", amount: "₹44,500", status: "pending" },
  { id: "#ORD-1046", product: "Green Coffee Beans – Robusta", seller: "Coorg Coffee Estate", qty: "200 kg", amount: "₹37,000", status: "shipped" },
];

const statusStyles: Record<string, string> = {
  pending: "bg-yellow-50 text-yellow-700 border-yellow-200",
  processing: "bg-blue-50 text-blue-700 border-blue-200",
  shipped: "bg-purple-50 text-purple-700 border-purple-200",
  delivered: "bg-green-50 text-green-700 border-green-200",
};

export default function BuyerDashboardPage() {
  return (
    <div className="px-8 py-8 max-w-5xl">
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-neutral-900">Buyer Dashboard</h1>
        <p className="mt-1 text-sm text-neutral-500">Track your orders, manage supplier conversations, and discover products.</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
        {stats.map((s) => (
          <div key={s.label} className="rounded-xl border border-neutral-200 bg-white p-4">
            <p className="text-xs text-neutral-500">{s.label}</p>
            <p className="mt-1 text-xl font-semibold text-neutral-900">{s.value}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 mb-6">
        {/* Recent Orders */}
        <div className="lg:col-span-3 rounded-xl border border-neutral-200 bg-white overflow-hidden">
          <div className="px-5 py-4 border-b border-neutral-100 flex items-center justify-between">
            <h2 className="text-sm font-semibold text-neutral-900">Recent Orders</h2>
            <a href="/buyer/orders" className="text-xs text-neutral-500 hover:text-neutral-800 underline">View all</a>
          </div>
          <div className="divide-y divide-neutral-100">
            {recentOrders.map((order) => (
              <div key={order.id} className="px-5 py-3.5 flex items-center justify-between gap-4">
                <div className="min-w-0">
                  <p className="text-sm font-medium text-neutral-900 truncate">{order.product}</p>
                  <p className="text-xs text-neutral-400">{order.id} · {order.seller}</p>
                </div>
                <div className="flex items-center gap-3 shrink-0">
                  <div className="text-right">
                    <p className="text-sm font-medium text-neutral-900">{order.amount}</p>
                    <p className="text-xs text-neutral-400">{order.qty}</p>
                  </div>
                  <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium border capitalize ${statusStyles[order.status]}`}>
                    {order.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="lg:col-span-2 rounded-xl border border-neutral-200 bg-white p-5">
          <h2 className="text-sm font-semibold text-neutral-900 mb-4">Activity</h2>
          <ul className="space-y-3">
            {recentActivity.map((item, i) => (
              <li key={i} className="flex items-start gap-2.5">
                <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-neutral-300 shrink-0" />
                <div className="min-w-0">
                  <p className="text-xs text-neutral-700 leading-relaxed">{item.text}</p>
                  <p className="text-xs text-neutral-400 mt-0.5">{item.time}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Quick actions */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <a
          href="/buyer/chat"
          className="rounded-xl border border-neutral-200 bg-white p-4 hover:border-neutral-300 hover:shadow-sm transition-all group flex items-center gap-3"
        >
          <div className="h-9 w-9 rounded-lg bg-neutral-100 flex items-center justify-center shrink-0">
            <svg className="h-4 w-4 text-neutral-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
          </div>
          <div>
            <p className="text-sm font-medium text-neutral-900">Chat with Sellers</p>
            <p className="text-xs text-neutral-500 mt-0.5">2 unread messages</p>
          </div>
        </a>
        <a
          href="/buyer/orders"
          className="rounded-xl border border-neutral-200 bg-white p-4 hover:border-neutral-300 hover:shadow-sm transition-all group flex items-center gap-3"
        >
          <div className="h-9 w-9 rounded-lg bg-neutral-100 flex items-center justify-center shrink-0">
            <svg className="h-4 w-4 text-neutral-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
          </div>
          <div>
            <p className="text-sm font-medium text-neutral-900">Track Orders</p>
            <p className="text-xs text-neutral-500 mt-0.5">3 active orders</p>
          </div>
        </a>
      </div>
    </div>
  );
}
