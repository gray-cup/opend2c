import { Metadata } from "next";
import { generateTitle, generateDescription } from "@/lib/seo";
import Link from "next/link";

export const metadata: Metadata = {
  title: generateTitle("For Sellers"),
  description: generateDescription(
    "List your Indian D2C brand on Open D2C for free. We crawl your Shopify store automatically and make your products searchable to buyers.",
  ),
};

const steps = [
  {
    n: "01",
    title: "Connect your store",
    body: "Submit your website URL in the seller console. We validate your Shopify store and detect your sitemap automatically. No manual product entry.",
  },
  {
    n: "02",
    title: "We crawl your catalog",
    body: "Our crawler walks your sitemap, extracts product data (titles, images, prices, variants) from your product pages, and normalises it into our index.",
  },
  {
    n: "03",
    title: "Your products go live",
    body: "Products appear in Open D2C search and discovery within minutes of a successful crawl. Buyers can find your brand and click through to your site.",
  },
  {
    n: "04",
    title: "Stays in sync automatically",
    body: "We re-crawl on a schedule so price changes, new products, and stock updates reflect on the platform without you doing anything.",
  },
];

const faqs = [
  {
    q: "Is it really free?",
    a: "Yes. Listing your store and having your products indexed is completely free. We don't take a commission on any sale — because we never touch the transaction.",
  },
  {
    q: "What platforms do you support?",
    a: "We work best with Shopify stores. We extract product data from sitemaps, Shopify product feeds, and JSON-LD structured data. Other platforms with standard sitemaps should work too.",
  },
  {
    q: "Do I have control over what appears?",
    a: "Yes. Through the seller console you can hide individual products, pause syncing, or remove your store entirely. Changes propagate within the next crawl cycle.",
  },
  {
    q: "Do buyers purchase through Open D2C?",
    a: "No. We are a discovery platform. When a buyer clicks on your product they are taken directly to your website. You handle the sale, payment, and fulfilment entirely.",
  },
  {
    q: "What data do you crawl?",
    a: "Only publicly available data from your website — the same data any visitor can see. We never access your Shopify admin, order data, or customer information.",
  },
  {
    q: "How long does the first crawl take?",
    a: "For most stores it completes within a few minutes. Larger catalogs (1,000+ products) may take longer. You can track progress in real time in the seller console.",
  },
];

const consoleFeatures = [
  "Real-time crawl progress and logs",
  "Product visibility controls (show/hide individual products)",
  "Sync scheduling and manual re-sync",
  "Basic analytics — clicks and impressions",
  "Edit product titles and descriptions after import",
];

export default function ForSellersPage() {
  return (
    <div className="max-w-3xl mx-auto min-h-screen py-10 lg:py-20 px-4">
      <div className="mb-12">
        <p className="text-xs font-medium uppercase tracking-widest text-neutral-400 mb-3">
          For sellers
        </p>
        <h1 className="text-3xl md:text-4xl font-semibold text-neutral-900 mb-3">
          Get your D2C brand discovered
        </h1>
        <p className="text-lg text-muted-foreground mb-6">
          Connect your Shopify store once. We handle the rest — crawling, indexing, and keeping
          your catalog in sync. Free, forever.
        </p>
        <Link
          href="/register"
          className="inline-block rounded-md bg-neutral-900 px-6 py-3 text-sm font-medium text-white hover:bg-neutral-700 transition-colors"
        >
          Connect your store →
        </Link>
      </div>

      <section className="mb-14">
        <h2 className="text-xl font-semibold text-neutral-800 mb-6">How it works</h2>
        <div className="space-y-6">
          {steps.map((s) => (
            <div key={s.n} className="flex gap-5">
              <div className="shrink-0 w-8 h-8 rounded-full bg-neutral-100 flex items-center justify-center">
                <span className="text-xs font-semibold text-neutral-500">{s.n}</span>
              </div>
              <div>
                <p className="text-sm font-semibold text-neutral-800 mb-1">{s.title}</p>
                <p className="text-sm text-neutral-600">{s.body}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="mb-14">
        <h2 className="text-xl font-semibold text-neutral-800 mb-4">What you get in the seller console</h2>
        <div className="rounded-xl border border-neutral-200 bg-neutral-50 p-5">
          <ul className="space-y-3">
            {consoleFeatures.map((f) => (
              <li key={f} className="flex items-start gap-3 text-sm text-neutral-600">
                <span className="mt-0.5 h-4 w-4 shrink-0 rounded-full bg-neutral-200 flex items-center justify-center">
                  <svg className="h-2.5 w-2.5 text-neutral-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </span>
                {f}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="mb-14">
        <h2 className="text-xl font-semibold text-neutral-800 mb-6">Frequently asked questions</h2>
        <div className="space-y-5">
          {faqs.map((faq) => (
            <div key={faq.q} className="border-b border-neutral-100 pb-5 last:border-0">
              <p className="text-sm font-semibold text-neutral-800 mb-2">{faq.q}</p>
              <p className="text-sm text-neutral-600">{faq.a}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="rounded-xl border border-neutral-200 bg-neutral-50 p-6 mb-10">
        <p className="text-base font-semibold text-neutral-800 mb-2">Ready to get started?</p>
        <p className="text-sm text-neutral-600 mb-5">
          Create a seller account and connect your store. The first crawl usually completes in under
          five minutes.
        </p>
        <div className="flex flex-col sm:flex-row gap-3">
          <Link
            href="/register"
            className="inline-block rounded-md bg-neutral-900 px-5 py-2.5 text-sm font-medium text-white hover:bg-neutral-700 transition-colors"
          >
            Connect your store
          </Link>
          <a
            href="mailto:sellers@opend2c.in"
            className="inline-block rounded-md border border-neutral-200 px-5 py-2.5 text-sm font-medium text-neutral-800 hover:bg-neutral-100 transition-colors"
          >
            Questions? Email us
          </a>
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
        </Link>{" "}
        ·{" "}
        <Link href="/pricing" className="text-blue-700 underline underline-offset-2">
          Pricing
        </Link>
      </p>
    </div>
  );
}
