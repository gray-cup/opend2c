import { Metadata } from "next";
import { generateTitle, generateDescription } from "@/lib/seo";
import Link from "next/link";

export const metadata: Metadata = {
  title: generateTitle("Advertise"),
  description: generateDescription(
    "Reach Indian D2C buyers on Open D2C. Learn about advertising and brand promotion opportunities on the platform.",
  ),
};

const formats = [
  {
    title: "Sponsored brand listings",
    description:
      "Your brand appears at the top of relevant category and search pages, clearly marked as sponsored. Buyers see your products first.",
    status: "Coming soon",
  },
  {
    title: "Promoted product cards",
    description:
      "Individual products boosted in search results and discovery feeds. Pay per click, not per impression.",
    status: "Coming soon",
  },
  {
    title: "Banner placements",
    description:
      "Display advertising on high-traffic pages — homepage, category pages, and search results. Fixed monthly placements.",
    status: "Coming soon",
  },
  {
    title: "Featured brand page",
    description:
      "A dedicated, enriched brand page with curated product showcase, brand story, and priority placement in brand directories.",
    status: "Coming soon",
  },
];

const whyPoints = [
  {
    stat: "Indian D2C",
    label: "Focused audience",
    body: "Everyone on Open D2C is here to discover and buy from Indian D2C brands. No generic marketplace noise.",
  },
  {
    stat: "Search-first",
    label: "High intent traffic",
    body: "Buyers arrive with a product or category in mind. Advertising here reaches people actively looking — not just scrolling.",
  },
  {
    stat: "Free + Paid",
    label: "Organic base included",
    body: "Your products are already indexed for free. Advertising amplifies reach on top of organic discovery, not instead of it.",
  },
];

export default function AdvertisePage() {
  return (
    <div className="max-w-3xl mx-auto min-h-screen py-10 lg:py-20 px-4">
      <div className="mb-12">
        <p className="text-xs font-medium uppercase tracking-widest text-neutral-400 mb-3">
          Advertising
        </p>
        <h1 className="text-3xl md:text-4xl font-semibold text-neutral-900 mb-3">
          Reach Indian D2C buyers
        </h1>
        <p className="text-lg text-muted-foreground">
          Open D2C is building advertising tools for brands who want more than organic discovery.
          Advertising is also how we keep the platform free — revenue from ads covers server costs
          and funds improvements so brands never pay to get listed.
        </p>
      </div>

      <section className="mb-12">
        <div className="rounded-xl border border-amber-200 bg-amber-50 px-5 py-4 mb-8">
          <p className="text-sm font-medium text-amber-800 mb-1">Advertising is not live yet</p>
          <p className="text-sm text-amber-700">
            These formats are in development. If you're interested in being an early advertiser
            — especially at launch pricing — reach out now and we'll add you to the waitlist.
          </p>
        </div>

        <h2 className="text-xl font-semibold text-neutral-800 mb-5">Ad formats we're building</h2>
        <div className="space-y-4">
          {formats.map((f) => (
            <div
              key={f.title}
              className="flex flex-col sm:flex-row sm:items-start gap-3 rounded-xl border border-neutral-200 bg-neutral-50 p-5"
            >
              <div className="flex-1">
                <p className="text-sm font-semibold text-neutral-800 mb-1">{f.title}</p>
                <p className="text-sm text-neutral-600">{f.description}</p>
              </div>
              <span className="shrink-0 self-start rounded-full border border-neutral-200 bg-white px-3 py-1 text-xs text-neutral-500">
                {f.status}
              </span>
            </div>
          ))}
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-xl font-semibold text-neutral-800 mb-5">Why advertise on Open D2C</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {whyPoints.map((p) => (
            <div key={p.stat} className="rounded-xl border border-neutral-200 p-5">
              <p className="text-xs font-medium uppercase tracking-widest text-neutral-400 mb-1">
                {p.label}
              </p>
              <p className="text-base font-semibold text-neutral-900 mb-2">{p.stat}</p>
              <p className="text-sm text-neutral-600">{p.body}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-xl font-semibold text-neutral-800 mb-3">Our commitment</h2>
        <p className="text-neutral-600 mb-3">
          Advertising will always be clearly labelled. Sponsored results will never be mixed with
          organic listings without a visible label. We will not use deceptive placement.
        </p>
        <p className="text-neutral-600">
          Organic discovery — based on search relevance and product quality — is never for sale.
          Advertising buys visibility, not search rank manipulation.
        </p>
      </section>

      <section className="rounded-xl border border-neutral-200 bg-neutral-50 p-6 mb-10">
        <p className="text-base font-semibold text-neutral-800 mb-2">Interested in early access?</p>
        <p className="text-sm text-neutral-600 mb-5">
          Get in touch and we'll keep you updated as advertising launches. Early advertisers will
          get preferential rates and direct input into how the formats work.
        </p>
        <div className="flex flex-col sm:flex-row gap-3">
          <a
            href="mailto:partnerships@opend2c.in"
            className="inline-block rounded-md bg-neutral-900 px-5 py-2.5 text-sm font-medium text-white hover:bg-neutral-700 transition-colors"
          >
            Email partnerships@opend2c.in
          </a>
          <Link
            href="/contact"
            className="inline-block rounded-md border border-neutral-200 px-5 py-2.5 text-sm font-medium text-neutral-800 hover:bg-neutral-100 transition-colors"
          >
            Other contact options
          </Link>
        </div>
      </section>

      <p className="text-xs text-muted-foreground">
        See also:{" "}
        <Link href="/terms" className="text-blue-700 underline underline-offset-2">
          Terms of Use
        </Link>{" "}
        ·{" "}
        <Link href="/privacy" className="text-blue-700 underline underline-offset-2">
          Privacy Policy
        </Link>
      </p>
    </div>
  );
}
