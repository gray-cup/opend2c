# Prompt for Coding Agent — Fix SEO Issues + Bing IndexNow (Next.js)

You are working on a **Next.js (App Router) + TypeScript project**.

The website currently has SEO issues flagged by Bing Webmaster Tools:

- Page titles are **too short**
- Meta descriptions are **too short**
- Many pages have **duplicate titles**
- Many pages have **duplicate meta descriptions**
- **IndexNow is not configured**

Your task is to implement a **complete SEO system** that resolves all these issues.

---

# 1. Implement Central SEO Metadata System

Create a utility:

```
/lib/seo.ts
```

```ts
export const SITE_NAME = "GraySourced";

export function generateTitle(title: string) {
  const full = `${title} | ${SITE_NAME}`;

  if (full.length > 60) {
    return full.slice(0, 57) + "...";
  }

  return full;
}

export function generateDescription(text: string) {
  if (text.length > 160) {
    return text.slice(0, 157) + "...";
  }

  if (text.length < 140) {
    return (
      text +
      " Explore global sourcing, exports, wholesale and retail coffee, tea and spices from GraySourced."
    );
  }

  return text;
}
```

---

# 2. Use Next.js Metadata API

Every page must export metadata using the helpers.

Example:

```
app/page.tsx
```

```ts
import { generateTitle, generateDescription } from "@/lib/seo";

export const metadata = {
  title: generateTitle("Global Coffee, Tea & Spice Exporter"),
  description: generateDescription(
    "GraySourced exports premium coffee beans, tea and spices worldwide while building infrastructure for farms and D2C brands.",
  ),
};
```

---

# 3. Prevent Duplicate Metadata

Each page must have **unique metadata**.

Examples:

### Home

Title:

```
Global Coffee, Tea & Spice Exporter | GraySourced
```

Description:

```
GraySourced exports premium coffee beans, tea and spices worldwide for wholesale, retail and international buyers.
```

---

### Products Page

Title:

```
Premium Coffee, Tea & Spice Products | GraySourced
```

Description:

```
Explore globally sourced coffee beans, teas and spices from GraySourced available for wholesale, export and retail buyers.
```

---

### About Page

Title:

```
About GraySourced Coffee & Spice Export Company
```

Description:

```
Learn about GraySourced, a global sourcing and export company specializing in coffee, tea and spices for international markets.
```

---

# 4. Dynamic Metadata for Dynamic Pages

For dynamic pages like:

```
/products/[slug]
```

Use `generateMetadata()`.

Example:

```ts
import { generateTitle, generateDescription } from "@/lib/seo";

export async function generateMetadata({ params }) {
  const product = await getProduct(params.slug);

  return {
    title: generateTitle(`${product.name} Coffee Beans Export`),

    description: generateDescription(
      `Buy ${product.name} green coffee beans sourced globally by GraySourced. Available for wholesale, retail and international export.`,
    ),
  };
}
```

This ensures **no duplicate titles/descriptions**.

---

# 5. Generate Sitemap

Create:

```
app/sitemap.ts
```

Example:

```ts
import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://yourdomain.com",
      lastModified: new Date(),
    },
    {
      url: "https://yourdomain.com/products",
      lastModified: new Date(),
    },
    {
      url: "https://yourdomain.com/about",
      lastModified: new Date(),
    },
  ];
}
```

Output:

```
/sitemap.xml
```

---

# 6. Create Robots.txt

Create:

```
app/robots.ts
```

```ts
import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: "https://yourdomain.com/sitemap.xml",
  };
}
```

---

# 7. Implement Bing IndexNow

Generate key:

```
openssl rand -hex 16
```

Example key:

```
a8d9e21c3b4f5a67123b4c5d6e7f8a9b
```

Create file:

```
/public/a8d9e21c3b4f5a67123b4c5d6e7f8a9b.txt
```

Contents:

```
a8d9e21c3b4f5a67123b4c5d6e7f8a9b
```

Accessible at:

```
https://yourdomain.com/a8d9e21c3b4f5a67123b4c5d6e7f8a9b.txt
```

---

# 8. Create IndexNow API Route

```
app/api/indexnow/route.ts
```

```ts
export async function POST(req: Request) {
  const urls = await req.json();

  const payload = {
    host: "yourdomain.com",
    key: "YOUR_INDEXNOW_KEY",
    urlList: urls,
  };

  await fetch("https://api.indexnow.org/indexnow", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  return Response.json({ success: true });
}
```

---

# 9. Automatically Notify Bing on Content Changes

Whenever:

- product added
- page created
- blog published

Call:

```
POST /api/indexnow
```

with:

```json
["https://yourdomain.com/new-page"]
```

This makes Bing **index the page within minutes**.

---

# 10. Add Organization Structured Data

On homepage:

```ts
<script type="application/ld+json">
{
 "@context": "https://schema.org",
 "@type": "Organization",
 "name": "GraySourced",
 "url": "https://yourdomain.com",
 "description": "Global exporter of coffee, tea and spices."
}
</script>
```

---

# Final Validation

Agent must ensure:

- Titles **50–60 characters**
- Descriptions **140–160 characters**
- **No duplicate metadata**
- Sitemap generated
- Robots.txt configured
- IndexNow active
- Metadata system reusable

---

# Expected Result

After deployment:

- Bing warnings disappear
- Pages index **within minutes**
- Titles/descriptions optimized for CTR
- Search visibility improves
