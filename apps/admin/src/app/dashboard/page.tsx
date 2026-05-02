"use client";

const stats = [
  { label: "Listed Products", value: "8" },
  { label: "Pending Orders", value: "5" },
  { label: "Buyers Reached", value: "31" },
  { label: "Total Revenue", value: "₹1,85,000" },
];

const activity = [
  { text: "New order for 50kg CTC from Buyer A", time: "1h ago" },
  { text: "Product listing approved: Green Coffee Beans", time: "3h ago" },
  { text: "Payment received for Order #1038", time: "Yesterday" },
  { text: "New message from Roaster Co. regarding Darjeeling First Flush", time: "Yesterday" },
  { text: "Listing updated: Assam Orthodox Black Tea", time: "2d ago" },
];

const quickLinks = [
  { label: "Add New Product", href: "/dashboard/products", description: "List a new product for buyers" },
  { label: "View Orders", href: "/dashboard/orders", description: "Track and manage incoming orders" },
  { label: "Open Chat", href: "/dashboard/chat", description: "Respond to buyer inquiries" },
];

export default function DashboardPage() {
  return (
    <div className="px-8 py-8 max-w-5xl">
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-neutral-900">Seller Dashboard</h1>
        <p className="mt-1 text-sm text-neutral-500">Manage your listings, orders, and buyer conversations.</p>
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

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        {quickLinks.map((link) => (
          <a
            key={link.href}
            href={link.href}
            className="rounded-xl border border-neutral-200 bg-white p-4 hover:border-neutral-300 hover:shadow-sm transition-all group"
          >
            <p className="text-sm font-medium text-neutral-900 group-hover:text-neutral-700">{link.label}</p>
            <p className="mt-0.5 text-xs text-neutral-500">{link.description}</p>
          </a>
        ))}
      </div>

      {/* Recent Activity */}
      <div className="rounded-xl border border-neutral-200 bg-white p-5">
        <h2 className="text-sm font-semibold text-neutral-900 mb-4">Recent Activity</h2>
        <ul className="space-y-3">
          {activity.map((item, i) => (
            <li key={i} className="flex items-start justify-between gap-4">
              <div className="flex items-start gap-2.5">
                <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-neutral-300 shrink-0" />
                <span className="text-sm text-neutral-700">{item.text}</span>
              </div>
              <span className="text-xs text-neutral-400 shrink-0">{item.time}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
