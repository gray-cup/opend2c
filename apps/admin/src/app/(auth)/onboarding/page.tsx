"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type Role = "buyer" | "seller";

const roles: {
  value: Role;
  label: string;
  description: string;
  icon: string;
}[] = [
  {
    value: "buyer",
    label: "Buyer",
    description: "I want to source tea, coffee, or other products.",
    icon: "M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z",
  },
  {
    value: "seller",
    label: "Seller",
    description: "I want to list and sell my farm's produce.",
    icon: "M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4",
  },
];

export default function OnboardingPage() {
  const router = useRouter();
  const [selected, setSelected] = useState<Role | null>(null);

  function handleContinue() {
    if (!selected) return;
    router.push(selected === "seller" ? "/dashboard" : "/account/profile");
  }

  return (
    <div className="w-full max-w-md">
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-neutral-900">
          How will you use GraySourced?
        </h1>
        <p className="mt-1 text-sm text-neutral-500">
          This helps us set up the right experience for you.
        </p>
      </div>

      <div className="space-y-3">
        {roles.map((role) => (
          <button
            key={role.value}
            onClick={() => setSelected(role.value)}
            className={cn(
              "w-full text-left flex items-start gap-4 rounded-xl border p-4 transition-colors",
              selected === role.value
                ? "border-neutral-900 bg-neutral-900 text-white"
                : "border-neutral-200 bg-white text-neutral-900 hover:border-neutral-400",
            )}
          >
            <div
              className={cn(
                "mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg",
                selected === role.value ? "bg-white/10" : "bg-neutral-100",
              )}
            >
              <svg
                className={cn(
                  "h-5 w-5",
                  selected === role.value ? "text-white" : "text-neutral-600",
                )}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={1.75}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d={role.icon}
                />
              </svg>
            </div>
            <div>
              <p className="font-medium text-sm">{role.label}</p>
              <p
                className={cn(
                  "text-xs mt-0.5",
                  selected === role.value
                    ? "text-neutral-300"
                    : "text-neutral-500",
                )}
              >
                {role.description}
              </p>
            </div>
          </button>
        ))}
      </div>

      <Button
        onClick={handleContinue}
        disabled={!selected}
        variant="black"
        className="mt-6 w-full disabled:opacity-40 disabled:cursor-not-allowed"
      >
        Continue
      </Button>
    </div>
  );
}
