import { Metadata } from "next";
import { notFound } from "next/navigation";
import { generateTitle, generateDescription, SITE_URL } from "@/lib/seo";
import { getBlogPosts, getAllCategories, categoryToSlug, slugToCategory } from "@/lib/mdx";
import Link from "next/link";

interface Props {
  params: Promise<{ category: string }>;
}

export async function generateStaticParams() {
  const categories = getAllCategories();
  return categories.map((cat) => ({ category: categoryToSlug(cat) }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { category: categorySlug } = await params;
  const category = slugToCategory(categorySlug);
  const url = `${SITE_URL}/blogs/category/${categorySlug}`;
  return {
    title: generateTitle(`${category} — Blog`),
    description: generateDescription(
      `Browse all ${category} articles on the Open D2C blog. Tips, insights, and guides for Indian D2C brands and consumers.`,
    ),
    alternates: { canonical: url },
    openGraph: {
      title: generateTitle(`${category} — Blog`),
      description: `Browse all ${category} articles on the Open D2C blog.`,
      url,
      type: "website",
    },
  };
}

export default async function CategoryPage({ params }: Props) {
  const { category: categorySlug } = await params;
  const categoryLabel = slugToCategory(categorySlug);

  const allPosts = await getBlogPosts();
  const posts = allPosts.filter(
    (p) => categoryToSlug(p.category) === categorySlug,
  );

  if (posts.length === 0) notFound();

  return (
    <div className="max-w-3xl mx-auto min-h-screen py-10 lg:py-20 px-4">
      <Link
        href="/blogs"
        className="text-sm text-muted-foreground hover:text-neutral-900 transition-colors mb-8 inline-block"
      >
        ← All posts
      </Link>
      <h1 className="text-3xl md:text-4xl font-semibold text-neutral-900 mb-3">{categoryLabel}</h1>
      <p className="text-lg text-muted-foreground mb-12">
        {posts.length} {posts.length === 1 ? "post" : "posts"} in this category
      </p>

      <div className="flex flex-col divide-y divide-neutral-100">
        {posts.map((post) => (
          <Link
            key={post.slug}
            href={`/blogs/${post.slug}`}
            className="py-6 group"
          >
            <p className="text-xs text-muted-foreground mb-2">{post.date}</p>
            <h2 className="text-lg font-semibold text-neutral-900 group-hover:text-neutral-600 transition-colors mb-2">
              {post.title}
            </h2>
            <p className="text-sm text-neutral-600">{post.description}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
