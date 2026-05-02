"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { Check } from "lucide-react";

const plans = [
  {
    name: "Free",
    description: "New sellers",
    monthly: "₹0",
    yearly: "₹0",
    cta: "Get started",
    featured: false,
    features: [
      "Up to 3 product listings",
      "Basic buyer discovery",
      "Community support",
    ],
  },
  {
    name: "Starter",
    description: "Small businesses",
    monthly: "₹1,499",
    yearly: "₹12,999",
    cta: "Start free trial",
    featured: false,
    features: [
      "Up to 20 product listings",
      "Buyer enquiry inbox",
      "Order management",
      "Email support",
    ],
  },
  {
    name: "Growth",
    description: "Scaling suppliers",
    monthly: "₹5,999",
    yearly: "₹59,999",
    cta: "Start free trial",
    featured: true,
    features: [
      "Unlimited listings",
      "Priority placement in search",
      "Analytics dashboard",
      "Verified seller badge",
      "Dedicated account manager",
    ],
  },
  {
    name: "Enterprise",
    description: "Large companies",
    monthly: "₹19,999",
    yearly: "₹1,99,999",
    cta: "Contact sales",
    featured: false,
    features: [
      "Everything in Growth",
      "Custom integrations",
      "Multi-user access",
      "SLA guarantee",
      "White-glove onboarding",
    ],
  },
];

export default function PricingPage() {
  const [yearly, setYearly] = useState(false);

  return (
    <div className="px-4 lg:px-6 py-16 max-w-5xl mx-auto">
      {/* Header */}
      <div className="text-center mb-10">
        <h1 className="text-3xl font-semibold text-neutral-900 tracking-tight">
          Simple, transparent pricing
        </h1>
        <p className="mt-2 text-sm text-neutral-500">
          No hidden fees. Cancel anytime.
        </p>

        {/* Toggle */}
        <div className="mt-6 inline-flex items-center gap-3">
          <span
            className={cn(
              "text-sm",
              !yearly ? "text-neutral-900 font-medium" : "text-neutral-400",
            )}
          >
            Monthly
          </span>
          <button
            type="button"
            onClick={() => setYearly((y) => !y)}
            className={cn(
              "relative inline-flex h-5 w-9 items-center rounded-full transition-colors",
              yearly ? "bg-neutral-900" : "bg-neutral-200",
            )}
          >
            <span
              className={cn(
                "inline-block h-3.5 w-3.5 rounded-full bg-white shadow transition-transform",
                yearly ? "translate-x-4" : "translate-x-1",
              )}
            />
          </button>
          <span
            className={cn(
              "text-sm",
              yearly ? "text-neutral-900 font-medium" : "text-neutral-400",
            )}
          >
            Yearly
            <span className="ml-1.5 rounded-full bg-neutral-100 px-2 py-0.5 text-xs text-neutral-600">
              Save ~15%
            </span>
          </span>
        </div>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {plans.map((plan) => (
          <div
            key={plan.name}
            className={cn(
              "relative flex flex-col rounded-xl border p-5",
              plan.featured
                ? "bg-neutral-900 border-neutral-900 text-white"
                : "bg-white border-neutral-200 text-neutral-900",
            )}
          >
            {plan.featured && (
              <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-white px-3 py-0.5 text-xs font-medium text-neutral-900 border border-neutral-200">
                Most popular
              </span>
            )}

            <div className="mb-4">
              <p
                className={cn(
                  "text-sm font-medium",
                  plan.featured ? "text-white" : "text-neutral-900",
                )}
              >
                {plan.name}
              </p>
              <p
                className={cn(
                  "text-xs mt-0.5",
                  plan.featured ? "text-neutral-400" : "text-neutral-400",
                )}
              >
                {plan.description}
              </p>
            </div>

            <div className="mb-5">
              <span
                className={cn(
                  "text-2xl font-semibold",
                  plan.featured ? "text-white" : "text-neutral-900",
                )}
              >
                {yearly ? plan.yearly : plan.monthly}
              </span>
              <span
                className={cn(
                  "text-xs ml-1",
                  plan.featured ? "text-neutral-400" : "text-neutral-400",
                )}
              >
                /{yearly ? "yr" : "mo"}
              </span>
            </div>

            <ul className="flex-1 space-y-2 mb-6">
              {plan.features.map((f) => (
                <li key={f} className="flex items-start gap-2 text-xs">
                  <Check
                    className={cn(
                      "mt-0.5 h-3.5 w-3.5 shrink-0",
                      plan.featured ? "text-white" : "text-neutral-500",
                    )}
                  />
                  <span
                    className={
                      plan.featured ? "text-neutral-300" : "text-neutral-600"
                    }
                  >
                    {f}
                  </span>
                </li>
              ))}
            </ul>

            <button
              type="button"
              className={cn(
                "w-full rounded-lg py-2 text-sm font-medium transition-colors",
                plan.featured
                  ? "bg-white text-neutral-900 hover:bg-neutral-100"
                  : "bg-neutral-900 text-white hover:bg-neutral-700",
              )}
            >
              {plan.cta}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
