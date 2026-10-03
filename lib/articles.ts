import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { marked } from "marked";

const DIR = path.join(process.cwd(), "content", "articles");

export type ArticleMeta = {
  slug: string;
  title: string;
  description: string;
  keywords: string[];
  date: string;
  product?: string; // which registered product's CTA this article funnels to
  // Self-contained CTA (used by pipeline-generated articles): overrides `product`.
  productName?: string;
  productUrl?: string;
  productPrice?: string;
};
export type Article = ArticleMeta & { html: string };

export function getSlugs(): string[] {
  return fs
    .readdirSync(DIR)
    .filter((f) => f.endsWith(".md"))
    .map((f) => f.replace(/\.md$/, ""));
}

export function getArticle(slug: string): Article {
  const raw = fs.readFileSync(path.join(DIR, `${slug}.md`), "utf8");
  const { data, content } = matter(raw);
  const html = marked.parse(content, { async: false }) as string;
  return {
    slug,
    title: String(data.title ?? slug),
    description: String(data.description ?? ""),
    keywords: Array.isArray(data.keywords) ? data.keywords : [],
    date: String(data.date ?? ""),
    product: data.product ? String(data.product) : undefined,
    productName: data.product_name ? String(data.product_name) : undefined,
    productUrl: data.product_url ? String(data.product_url) : undefined,
    productPrice: data.product_price ? String(data.product_price) : undefined,
    html,
  };
}

export function getAllMeta(): ArticleMeta[] {
  return getSlugs()
    .map((slug) => {
      const { html: _html, ...meta } = getArticle(slug);
      return meta;
    })
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}
