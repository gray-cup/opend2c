"use client";

import { useEffect, useRef, useState } from "react";

type Sitemap = {
  id: number;
  url: string;
  status: "queued" | "running" | "done" | "failed";
  product_count: number;
  progress_scraped: number;
  progress_total: number;
  error: string | null;
  created_at: string;
  updated_at: string;
};

type ActiveProgress = {
  id: number;
  scraped: number;
  total: number;
  status: "running" | "done" | "failed";
  error?: string | null;
};

const statusClass: Record<Sitemap["status"], string> = {
  queued:  "bg-gray-100 text-gray-600",
  running: "bg-blue-100 text-blue-700",
  done:    "bg-emerald-100 text-emerald-700",
  failed:  "bg-red-100 text-red-600",
};

export default function ScraperPage() {
  const [url, setUrl]           = useState("");
  const [sitemaps, setSitemaps] = useState<Sitemap[]>([]);
  const [loading, setLoading]   = useState(true);
  const [saving, setSaving]     = useState(false);
  const [error, setError]       = useState("");
  const [progress, setProgress] = useState<ActiveProgress | null>(null);
  const esRef = useRef<EventSource | null>(null);

  async function loadSitemaps() {
    const res = await fetch("/api/scraper/sitemaps", { cache: "no-store" });
    if (!res.ok) { setError("Could not load sitemaps"); setLoading(false); return; }
    setSitemaps(await res.json());
    setLoading(false);
  }

  useEffect(() => { loadSitemaps(); }, []);

  function openSSE(id: number) {
    if (esRef.current) { esRef.current.close(); esRef.current = null; }

    setProgress({ id, scraped: 0, total: 0, status: "running" });

    const es = new EventSource(`/api/scraper/sitemaps/${id}/events`);
    esRef.current = es;

    es.onmessage = (e) => {
      let ev: { type: string; scraped?: number; total?: number; error?: string | null };
      try { ev = JSON.parse(e.data); } catch { return; }

      setProgress((prev) => {
        if (!prev) return prev;
        return {
          ...prev,
          scraped: ev.scraped ?? prev.scraped,
          total:   ev.total   ?? prev.total,
          status:  ev.type === "done" ? "done" : ev.type === "failed" ? "failed" : "running",
          error:   ev.error ?? prev.error,
        };
      });

      if (ev.type === "done" || ev.type === "failed") {
        es.close();
        loadSitemaps();
      }
    };

    es.onerror = () => { es.close(); loadSitemaps(); };
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError("");

    const res = await fetch("/api/scraper/sitemaps", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ url }),
    });

    setSaving(false);

    if (!res.ok) {
      const body = await res.json().catch(() => ({}));
      setError(body.error ?? "Could not scrape sitemap");
      return;
    }

    const { id } = await res.json();
    setUrl("");
    openSSE(id);
  }

  const pct = progress && progress.total > 0
    ? Math.round((progress.scraped / progress.total) * 100)
    : null;

  return (
    <div className="px-8 py-6 max-w-[1100px] space-y-5">
      <div>
        <h1 className="text-xl font-semibold text-gray-900">Scraper</h1>
        <p className="mt-1 text-sm text-gray-500">
          Add a product sitemap and pull discovered products into your product table.
        </p>
      </div>

      <form onSubmit={submit} className="bg-white border border-gray-200 rounded-lg p-5 space-y-4">
        <div>
          <label htmlFor="sitemap-url" className="block text-xs font-medium text-gray-700 mb-2">
            Sitemap URL
          </label>
          <div className="flex gap-2">
            <input
              id="sitemap-url"
              type="url"
              required
              placeholder="https://store.example.com/sitemap_products_1.xml"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              className="flex-1 px-3 py-2 text-sm border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-gray-400"
            />
            <button
              type="submit"
              disabled={saving}
              className="px-4 py-2 text-sm font-medium bg-gray-900 text-white rounded-md hover:bg-gray-700 disabled:opacity-50"
            >
              {saving ? "Submitting…" : "Add sitemap"}
            </button>
          </div>
          {error && <p className="mt-3 text-xs text-red-500">{error}</p>}
        </div>

        {/* Progress bar */}
        {progress && (
          <div className="space-y-1.5 pt-1">
            <div className="flex items-center justify-between text-xs text-gray-500">
              <span className="flex items-center gap-1.5">
                {progress.status === "running" && (
                  <span className="h-1.5 w-1.5 rounded-full bg-blue-500 animate-pulse" />
                )}
                {progress.status === "done" && (
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                )}
                {progress.status === "failed" && (
                  <span className="h-1.5 w-1.5 rounded-full bg-red-500" />
                )}
                {progress.status === "running" ? "Scraping products…" : progress.status === "done" ? "Done" : "Failed"}
              </span>
              <span className="tabular-nums">
                {progress.scraped}{progress.total > 0 ? ` / ${progress.total}` : ""} products
                {pct !== null ? ` · ${pct}%` : ""}
              </span>
            </div>
            <div className="h-1.5 w-full bg-gray-100 rounded-full overflow-hidden">
              <div
                className={`h-full rounded-full transition-all duration-500 ${
                  progress.status === "failed" ? "bg-red-400" : "bg-blue-500"
                }`}
                style={{ width: pct !== null ? `${pct}%` : progress.status === "running" ? "5%" : "100%" }}
              />
            </div>
            {progress.error && (
              <p className="text-xs text-red-500">{progress.error}</p>
            )}
          </div>
        )}
      </form>

      <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
        <div className="px-5 py-3 border-b border-gray-100">
          <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
            Saved sitemaps
          </span>
        </div>

        {loading ? (
          <div className="px-5 py-10 text-center text-sm text-gray-400">Loading sitemaps...</div>
        ) : sitemaps.length === 0 ? (
          <div className="px-5 py-10 text-center text-sm text-gray-400">No sitemaps saved yet.</div>
        ) : (
          <div className="divide-y divide-gray-100">
            {sitemaps.map((sitemap) => (
              <div key={sitemap.id} className="px-5 py-4 flex items-center justify-between gap-4">
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium text-gray-900 truncate">{sitemap.url}</p>
                  <p className="mt-1 text-xs text-gray-400">
                    {sitemap.product_count} products · {new Date(sitemap.created_at).toLocaleString()}
                  </p>
                  {sitemap.status === "running" && progress?.id === sitemap.id && (
                    <div className="mt-2 space-y-1">
                      <div className="h-1 w-full bg-gray-100 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-blue-500 rounded-full transition-all duration-500"
                          style={{ width: pct !== null ? `${pct}%` : "5%" }}
                        />
                      </div>
                    </div>
                  )}
                  {sitemap.error && <p className="mt-1 text-xs text-red-500">{sitemap.error}</p>}
                </div>
                <span className={`shrink-0 px-2.5 py-1 rounded-full text-xs font-medium ${statusClass[sitemap.status]}`}>
                  {sitemap.status}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
