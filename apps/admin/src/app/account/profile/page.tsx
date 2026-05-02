export default function ProfilePage() {
  return (
    <div>
      <h1 className="text-xl font-semibold text-neutral-900 mb-1">Profile</h1>
      <p className="text-sm text-neutral-500 mb-6">Your personal details.</p>

      <div className="rounded-xl border border-neutral-200 bg-white p-6 space-y-5">
        <div className="flex items-center gap-4">
          <div className="h-14 w-14 rounded-full bg-neutral-100 border border-neutral-200 flex items-center justify-center">
            <svg
              className="h-7 w-7 text-neutral-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1.5}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
              />
            </svg>
          </div>
          <div>
            <p className="font-medium text-neutral-900 text-sm">John Buyer</p>
            <p className="text-xs text-neutral-500">john@example.com</p>
          </div>
        </div>

        <div className="border-t border-neutral-100 pt-5 grid grid-cols-1 sm:grid-cols-2 gap-4">
          {[
            { label: "Full name", value: "John Buyer" },
            { label: "Email", value: "john@example.com" },
            { label: "Phone", value: "+91 8527914317" },
            { label: "Location", value: "Bengaluru, India" },
          ].map((field) => (
            <div key={field.label}>
              <p className="text-xs text-neutral-500 mb-0.5">{field.label}</p>
              <p className="text-sm text-neutral-900">{field.value}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
