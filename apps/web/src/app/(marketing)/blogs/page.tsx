import { Metadata } from "next";
import { generateTitle, generateDescription, SITE_URL } from "@/lib/seo";
import { getBlogPosts, getAllCategories, categoryToSlug } from "@/lib/mdx";
import Link from "next/link";

export const metadata: Metadata = {
  title: generateTitle("Blog"),
  description: generateDescription(
    "Insights, guides, and stories about Indian D2C brands, e-commerce trends, and seller tips from the Open D2C team.",
  ),
  alternates: {
    canonical: `${SITE_URL}/blogs`,
  },
  openGraph: {
    title: generateTitle("Blog"),
    description: "Insights, guides, and stories about Indian D2C brands.",
    url: `${SITE_URL}/blogs`,
    type: "website",
  },
};

export default async function BlogsPage() {
  const [posts, categories] = await Promise.all([getBlogPosts(), getAllCategories()]);

  return (
    <div className="max-w-3xl mx-auto min-h-screen py-10 lg:py-20 px-4">
      <h1 className="text-3xl md:text-4xl font-semibold text-neutral-900 mb-3">Blog</h1>
      <p className="text-lg text-muted-foreground mb-8">
        Insights, guides, and stories about Indian D2C brands.
      </p>

      {categories.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-10">
          {categories.map((cat) => (
            <Link
              key={cat}
              href={`/blogs/category/${categoryToSlug(cat)}`}
              className="text-xs font-medium px-3 py-1.5 rounded-full bg-neutral-100 text-neutral-700 hover:bg-neutral-200 transition-colors"
            >
              {cat}
            </Link>
          ))}
        </div>
      )}

      {posts.length === 0 ? (
        <p className="text-neutral-500">No posts yet.</p>
      ) : (
        <div className="flex flex-col divide-y divide-neutral-100">
          {posts.map((post) => (
            <Link
              key={post.slug}
              href={`/blogs/${post.slug}`}
              className="py-6 group"
            >
              <div className="flex items-center gap-3 mb-2">
                <p className="text-xs text-muted-foreground">{post.date}</p>
                {post.category && (
                  <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-neutral-100 text-neutral-600">
                    {post.category}
                  </span>
                )}
              </div>
              <h2 className="text-lg font-semibold text-neutral-900 group-hover:text-neutral-600 transition-colors mb-2">
                {post.title}
              </h2>
              <p className="text-sm text-neutral-600">{post.description}</p>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
