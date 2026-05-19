import { notFound } from "next/navigation";
import { Metadata } from "next";
import { generateTitle, SITE_URL } from "@/lib/seo";
import { getBlogPost, getAllBlogSlugs, categoryToSlug } from "@/lib/mdx";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import Link from "next/link";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getAllBlogSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) return {};
  return {
    title: generateTitle(post.title),
    description: post.description,
    alternates: {
      canonical: `${SITE_URL}/blogs/${slug}`,
    },
    openGraph: {
      title: post.title,
      description: post.description,
      url: `${SITE_URL}/blogs/${slug}`,
      type: "article",
      publishedTime: post.date,
      authors: [post.author],
      tags: post.tags,
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = getBlogPost(slug);

  if (!post) notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    author: { "@type": "Organization", name: post.author },
    publisher: { "@type": "Organization", name: "Open D2C", url: SITE_URL },
    url: `${SITE_URL}/blogs/${slug}`,
    keywords: post.tags.join(", "),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="max-w-3xl mx-auto min-h-screen py-10 lg:py-20 px-4">
        <div className="flex items-center gap-3 mb-8">
          <Link
            href="/blogs"
            className="text-sm text-muted-foreground hover:text-neutral-900 transition-colors"
          >
            ← Blog
          </Link>
          {post.category && (
            <>
              <span className="text-muted-foreground text-sm">/</span>
              <Link
                href={`/blogs/category/${categoryToSlug(post.category)}`}
                className="text-sm text-muted-foreground hover:text-neutral-900 transition-colors"
              >
                {post.category}
              </Link>
            </>
          )}
        </div>
        <p className="text-xs text-muted-foreground mb-3">{post.date}</p>
        <h1 className="text-3xl md:text-4xl font-semibold text-neutral-900 mb-6">{post.title}</h1>
        {post.author && (
          <p className="text-sm text-muted-foreground mb-8">By {post.author}</p>
        )}
        <div className="text-neutral-700 leading-relaxed [&_h2]:text-xl [&_h2]:font-semibold [&_h2]:text-neutral-900 [&_h2]:mt-8 [&_h2]:mb-3 [&_h3]:text-base [&_h3]:font-semibold [&_h3]:text-neutral-900 [&_h3]:mt-6 [&_h3]:mb-2 [&_p]:mb-4 [&_ul]:mb-4 [&_ul]:list-disc [&_ul]:pl-5 [&_li]:mb-1 [&_a]:underline [&_a]:underline-offset-2 [&_strong]:font-semibold [&_strong]:text-neutral-900">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>{post.content}</ReactMarkdown>
        </div>
      </div>
    </>
  );
}
