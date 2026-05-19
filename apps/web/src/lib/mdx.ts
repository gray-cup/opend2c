import fs from "fs";
import path from "path";
import matter from "gray-matter";

export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  date: string;
  author: string;
  tags: string[];
  category: string;
  featured: boolean;
  published: boolean;
  readingTime: number;
  content: string;
}

const BLOGS_DIR = path.join(process.cwd(), "content/blogs");

export async function getBlogPosts(): Promise<BlogPost[]> {
  try {
    if (!fs.existsSync(BLOGS_DIR)) {
      return [];
    }

    const files = fs.readdirSync(BLOGS_DIR);
    const posts = files
      .filter((file) => file.endsWith(".mdx"))
      .map((file) => {
        const slug = file.replace(".mdx", "");
        const filePath = path.join(BLOGS_DIR, file);
        const fileContent = fs.readFileSync(filePath, "utf8");
        const { data, content } = matter(fileContent);

        return {
          slug,
          title: data.title || "",
          description: data.description || "",
          date: data.date || "",
          author: data.author || "",
          tags: data.tags || [],
          category: data.category || "General",
          published: data.published !== false,
          featured: data.featured || false,
          readingTime: data.readingTime || 5,
          content: content || "",
        };
      })
      .filter((post) => post.published)
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

    return posts;
  } catch (error) {
    console.error("Error reading blog posts:", error);
    return [];
  }
}

export function getBlogPost(slug: string): BlogPost | null {
  const filePath = path.join(BLOGS_DIR, `${slug}.mdx`);

  if (!fs.existsSync(filePath)) {
    return null;
  }

  try {
    const fileContent = fs.readFileSync(filePath, "utf8");
    const { data, content } = matter(fileContent);

    return {
      slug,
      content,
      category: data.category || "General",
      ...data,
    } as BlogPost;
  } catch (error) {
    console.error(`Error loading blog post ${slug}:`, error);
    return null;
  }
}

export function getAllBlogSlugs(): string[] {
  try {
    if (!fs.existsSync(BLOGS_DIR)) return [];
    return fs
      .readdirSync(BLOGS_DIR)
      .filter((name) => name.endsWith(".mdx"))
      .map((fileName) => fileName.replace(/\.mdx$/, ""));
  } catch {
    return [];
  }
}

export function getAllCategories(): string[] {
  try {
    if (!fs.existsSync(BLOGS_DIR)) return [];
    const files = fs.readdirSync(BLOGS_DIR);
    const categories = new Set<string>();
    for (const file of files) {
      if (!file.endsWith(".mdx")) continue;
      const { data } = matter(fs.readFileSync(path.join(BLOGS_DIR, file), "utf8"));
      if (data.published !== false && data.category) {
        categories.add(data.category);
      }
    }
    return Array.from(categories).sort();
  } catch {
    return [];
  }
}

export function categoryToSlug(category: string): string {
  return category.toLowerCase().replace(/\s+/g, "-");
}

export function slugToCategory(slug: string): string {
  return slug
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}
