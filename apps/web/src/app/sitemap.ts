import { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/seo";
import { getBlogPosts, getAllCategories, categoryToSlug } from "@/lib/mdx";

const STATIC_ROUTES: { url: string; priority: number; changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"] }[] = [
  { url: "/", priority: 1.0, changeFrequency: "daily" },
  { url: "/brands", priority: 0.9, changeFrequency: "daily" },
  { url: "/search", priority: 0.9, changeFrequency: "daily" },
  { url: "/blogs", priority: 0.8, changeFrequency: "weekly" },
  { url: "/about", priority: 0.7, changeFrequency: "monthly" },
  { url: "/for-sellers", priority: 0.7, changeFrequency: "monthly" },
  { url: "/advertise", priority: 0.7, changeFrequency: "monthly" },
  { url: "/pricing", priority: 0.7, changeFrequency: "monthly" },
  { url: "/contact", priority: 0.6, changeFrequency: "monthly" },
  { url: "/register", priority: 0.6, changeFrequency: "monthly" },
  { url: "/gov-schemes", priority: 0.5, changeFrequency: "monthly" },
  { url: "/privacy", priority: 0.3, changeFrequency: "yearly" },
  { url: "/terms", priority: 0.3, changeFrequency: "yearly" },
  { url: "/impressum", priority: 0.3, changeFrequency: "yearly" },
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [posts, categories] = await Promise.all([
    getBlogPosts(),
    Promise.resolve(getAllCategories()),
  ]);

  const staticEntries: MetadataRoute.Sitemap = STATIC_ROUTES.map(({ url, priority, changeFrequency }) => ({
    url: `${SITE_URL}${url}`,
    lastModified: new Date(),
    changeFrequency,
    priority,
  }));

  const blogEntries: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `${SITE_URL}/blogs/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  const categoryEntries: MetadataRoute.Sitemap = categories.map((cat) => ({
    url: `${SITE_URL}/blogs/category/${categoryToSlug(cat)}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 0.7,
  }));

  return [...staticEntries, ...blogEntries, ...categoryEntries];
}
