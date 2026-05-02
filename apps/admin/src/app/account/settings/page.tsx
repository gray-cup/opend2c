export default function SettingsPage() {
  return (
    <div>
      <h1 className="text-xl font-semibold text-neutral-900 mb-1">Settings</h1>
      <p className="text-sm text-neutral-500 mb-6">Manage your preferences.</p>

      <div className="rounded-xl border border-neutral-200 bg-white divide-y divide-neutral-100">
        {[
          {
            label: "Email notifications",
            description: "Receive updates about orders and sourcing requests.",
          },
          {
            label: "Marketing emails",
            description: "News, product updates, and offers from GraySourced.",
          },
          {
            label: "Two-factor authentication",
            description: "Add an extra layer of security to your account.",
          },
        ].map((item) => (
          <div
            key={item.label}
            className="flex items-center justify-between px-6 py-4"
          >
            <div>
              <p className="text-sm font-medium text-neutral-900">
                {item.label}
              </p>
              <p className="text-xs text-neutral-500 mt-0.5">
                {item.description}
              </p>
            </div>
            {/* Dummy toggle */}
            <button className="h-5 w-9 rounded-full bg-neutral-200 relative shrink-0 cursor-pointer">
              <span className="absolute left-0.5 top-0.5 h-4 w-4 rounded-full bg-white shadow-sm transition-transform" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
