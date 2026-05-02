import { Metadata } from "next";
import { generateTitle, generateDescription } from "@/lib/seo";
import { TENDER_SITES, EXTRA_TENDER_SITES } from "@/lib/tenders";
import { ChevronRight } from "lucide-react";

export const metadata: Metadata = {
  title: generateTitle("Government Tenders"),
  description: generateDescription(
    "Browse Indian government tender portals — central government, PSUs, PMGSY, state portals, and more.",
  ),
};

const CATEGORIES = [
  "Central Government",
  "PSUs",
  "PMGSY",
  "State Portals",
] as const;

export default function GovernmentTendersPage() {
  const grouped = CATEGORIES.map((cat) => ({
    category: cat,
    sites: TENDER_SITES.filter((s) => s.category === cat),
  }));

  return (
    <div className="max-w-5xl mx-auto min-h-screen py-10 lg:py-20 px-4">
      <h1 className="text-3xl md:text-4xl font-semibold text-black mb-3">
        Government Tender Portals
      </h1>
      <p className="text-md md:text-lg text-muted-foreground mb-12">
        A directory of Indian government e-procurement portals — central, state,
        PSU, and PMGSY.
      </p>

      <div className="space-y-12">
        {grouped.map(({ category, sites }) => (
          <section key={category}>
            <h2 className="text-lg font-semibold text-neutral-800 mb-4 pb-2 border-b border-neutral-200">
              {category}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
              {sites.map((site) => (
                <a
                  key={site.url}
                  href={site.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between rounded-lg border border-neutral-200 bg-neutral-50 px-4 py-3 text-sm font-medium text-neutral-800 hover:bg-neutral-100 hover:border-neutral-300 transition-colors"
                >
                  <span>{site.name}</span>
                  <ChevronRight className="opacity-60" />

                </a>
              ))}
            </div>
          </section>
        ))}

        <section>
          <h2 className="text-lg font-semibold text-neutral-800 mb-1 pb-2 border-b border-neutral-200">
            Additional Portals
          </h2>
          <p className="text-sm text-muted-foreground mb-4">
            Specialized portals with varying access requirements.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {EXTRA_TENDER_SITES.map((site) => (
              <a
                key={site.url}
                href={site.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col rounded-lg border border-neutral-200 bg-neutral-50 px-4 py-3 hover:bg-neutral-100 hover:border-neutral-300 transition-colors"
              >
                <span className="text-sm font-medium text-neutral-800 flex items-center justify-between">
                  {site.name}
                  <ChevronRight className="opacity-60 ml-2" />
                </span>
                <span className="text-xs text-muted-foreground mt-1">
                  {site.notes}
                </span>
              </a>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
