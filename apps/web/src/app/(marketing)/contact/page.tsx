import { Metadata } from "next";
import { generateTitle, generateDescription } from "@/lib/seo";
import Link from "next/link";

export const metadata: Metadata = {
  title: generateTitle("Contact"),
  description: generateDescription(
    "Get in touch with the Open D2C team — for seller onboarding, partnerships, press, or general enquiries.",
  ),
};

const contacts = [
  {
    label: "General enquiries",
    description: "Questions about the platform, how it works, or anything else.",
    email: "hello@opend2c.in",
  },
  {
    label: "Seller onboarding",
    description: "Want to list your D2C brand? We'll walk you through it.",
    email: "sellers@opend2c.in",
  },
  {
    label: "Partnerships & advertising",
    description: "Brand partnerships, advertising opportunities, and media enquiries.",
    email: "partnerships@opend2c.in",
  },
  {
    label: "Legal & compliance",
    description: "IP concerns, takedown requests, and legal correspondence.",
    email: "legal@opend2c.in",
  },
];

export default function ContactPage() {
  return (
    <div className="max-w-3xl mx-auto min-h-screen py-10 lg:py-20 px-4">
      <h1 className="text-3xl md:text-4xl font-semibold text-neutral-900 mb-3">
        Contact Open D2C
      </h1>
      <p className="text-lg text-muted-foreground mb-12">
        We're a small team. Pick the right inbox and we'll get back to you.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-12">
        {contacts.map((c) => (
          <a
            key={c.email}
            href={`mailto:${c.email}`}
            className="group flex flex-col rounded-xl border border-neutral-200 bg-neutral-50 hover:bg-white hover:border-neutral-300 hover:shadow-sm transition-all p-5"
          >
            <p className="text-sm font-semibold text-neutral-800 mb-1">{c.label}</p>
            <p className="text-xs text-neutral-500 mb-4 flex-1">{c.description}</p>
            <span className="text-xs font-medium text-blue-700 group-hover:underline underline-offset-2">
              {c.email}
            </span>
          </a>
        ))}
      </div>

      <section className="rounded-xl border border-neutral-200 bg-neutral-50 p-6 mb-10">
        <p className="text-sm font-semibold text-neutral-800 mb-1">Schedule a call</p>
        <p className="text-sm text-neutral-500 mb-4">
          Prefer to talk? Book a 30-minute call with Arjun directly.
        </p>
        <a
          href="https://cal.com/arjunaditya/30min"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block rounded-md bg-neutral-900 px-4 py-2 text-sm font-medium text-white hover:bg-neutral-700 transition-colors"
        >
          Book on Cal.com →
        </a>
      </section>

      <p className="text-xs text-muted-foreground">
        Want to list your brand instead?{" "}
        <Link href="/for-sellers" className="text-blue-700 underline underline-offset-2">
          See how it works
        </Link>
        .
      </p>
    </div>
  );
}
