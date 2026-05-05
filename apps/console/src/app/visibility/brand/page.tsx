"use client";

import { useEffect, useState } from "react";

type Brand = {
  id: number;
  slug: string;
  name: string;
  description: string;
  logo_url: string | null;
  website_url: string | null;
};

export default function BrandPage() {
  const [brand, setBrand]     = useState<Brand | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving]   = useState(false);
  const [error, setError]     = useState("");
  const [success, setSuccess] = useState(false);

  const [name, setName]             = useState("");
  const [slug, setSlug]             = useState("");
  const [description, setDescription] = useState("");
  const [logoUrl, setLogoUrl]       = useState("");
  const [websiteUrl, setWebsiteUrl] = useState("");
  const [slugEdited, setSlugEdited] = useState(false);

  useEffect(() => {
    fetch("/api/brands")
      .then((r) => r.json())
      .then((data: Brand | null) => {
        if (data) {
          setBrand(data);
          setName(data.name);
          setSlug(data.slug);
          setDescription(data.description);
          setLogoUrl(data.logo_url ?? "");
          setWebsiteUrl(data.website_url ?? "");
          setSlugEdited(true);
        }
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const derivedSlug = (value: string) =>
    value.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

  const handleNameChange = (value: string) => {
    setName(value);
    if (!slugEdited) setSlug(derivedSlug(value));
  };

  const handleSlugChange = (value: string) => {
    setSlug(derivedSlug(value));
    setSlugEdited(true);
  };

  async function save(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError("");
    setSuccess(false);

    const res = await fetch("/api/brands", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: name.trim(),
        slug: slug.trim(),
        description: description.trim(),
        logo_url: logoUrl.trim() || null,
        website_url: websiteUrl.trim() || null,
      }),
    });

    setSaving(false);

    if (!res.ok) {
      const body = await res.json().catch(() => ({}));
      setError(body.error ?? "Could not save brand");
      return;
    }

    const saved: Brand = await res.json();
    setBrand(saved);
    setSlugEdited(true);
    setSuccess(true);
    setTimeout(() => setSuccess(false), 3000);
  }

  const publicUrl = slug ? `/${slug}` : null;

  return (
    <div className="px-8 py-6 max-w-[640px]">
      <div className="mb-6">
        <h1 className="text-xl font-semibold text-gray-900">Brand Profile</h1>
        <p className="mt-1 text-sm text-gray-500">
          Set up your public D2C brand page. Visitors can find your products at{" "}
          <span className="font-mono text-gray-700">/{slug || "your-brand"}</span>.
        </p>
      </div>

      {loading ? (
        <div className="text-sm text-gray-400">Loading…</div>
      ) : (
        <form onSubmit={save} className="space-y-5">
          {/* Brand name */}
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1.5">
              Brand name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => handleNameChange(e.target.value)}
              placeholder="Brahmaputra Estates"
              className="w-full px-3 py-2 text-sm border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-gray-400"
            />
          </div>

          {/* Slug */}
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1.5">
              Brand URL slug <span className="text-red-500">*</span>
            </label>
            <div className="flex items-center border border-gray-200 rounded-md overflow-hidden focus-within:ring-1 focus-within:ring-gray-400">
              <span className="px-3 py-2 text-sm text-gray-400 bg-gray-50 border-r border-gray-200 shrink-0">
                opend2c.com/
              </span>
              <input
                type="text"
                required
                value={slug}
                onChange={(e) => handleSlugChange(e.target.value)}
                placeholder="brahmaputra-estates"
                className="flex-1 px-3 py-2 text-sm bg-white focus:outline-none"
              />
            </div>
            <p className="mt-1 text-xs text-gray-400">
              Only lowercase letters, numbers, and hyphens.
            </p>
          </div>

          {/* Description */}
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1.5">Description</label>
            <textarea
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="A short description of your brand and what you sell…"
              className="w-full px-3 py-2 text-sm border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-gray-400 resize-none"
            />
          </div>

          {/* Logo URL */}
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1.5">Logo URL</label>
            <input
              type="url"
              value={logoUrl}
              onChange={(e) => setLogoUrl(e.target.value)}
              placeholder="https://example.com/logo.png"
              className="w-full px-3 py-2 text-sm border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-gray-400"
            />
          </div>

          {/* Website URL */}
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1.5">Website</label>
            <input
              type="url"
              value={websiteUrl}
              onChange={(e) => setWebsiteUrl(e.target.value)}
              placeholder="https://yourstore.com"
              className="w-full px-3 py-2 text-sm border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-gray-400"
            />
          </div>

          {error && <p className="text-xs text-red-500">{error}</p>}

          <div className="flex items-center justify-between pt-1">
            <div>
              {brand && publicUrl && (
                <p className="text-xs text-gray-400">
                  Your profile:{" "}
                  <a
                    href={publicUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="text-blue-600 hover:underline font-mono"
                  >
                    /{slug}
                  </a>
                </p>
              )}
            </div>
            <div className="flex items-center gap-3">
              {success && <span className="text-xs text-emerald-600 font-medium">Saved!</span>}
              <button
                type="submit"
                disabled={saving}
                className="px-4 py-2 text-sm font-medium bg-gray-900 text-white rounded-md hover:bg-gray-700 disabled:opacity-50"
              >
                {saving ? "Saving…" : brand ? "Update brand" : "Create brand"}
              </button>
            </div>
          </div>
        </form>
      )}

      {brand && (
        <div className="mt-8 pt-6 border-t border-gray-200">
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3">
            Quick links
          </p>
          <div className="space-y-2">
            <a
              href={`/${slug}`}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 text-sm text-blue-600 hover:underline"
            >
              <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
              /{slug} — brand profile
            </a>
            <a
              href={`/${slug}/products`}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 text-sm text-blue-600 hover:underline"
            >
              <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
              /{slug}/products — product catalog
            </a>
          </div>
        </div>
      )}
    </div>
  );
}
