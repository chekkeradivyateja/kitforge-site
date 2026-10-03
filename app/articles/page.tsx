import type { Metadata } from "next";
import Link from "next/link";
import { getAllMeta } from "@/lib/articles";
import { site, getProduct, productUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "Design-System Guides",
  description:
    "Practical guides to building accessible design systems in Figma — variables, " +
    "light & dark themes, WCAG contrast and design tokens.",
  alternates: { canonical: `${site.url}/articles/` },
};

export default function Articles() {
  const articles = getAllMeta();
  const p = getProduct();
  return (
    <>
      <section className="hero compact">
        <h1>Design-system guides</h1>
        <p className="lede">
          Everything on building accessible, maintainable design systems in
          Figma — do it by hand with these guides, or let {p.name.split(" —")[0]} do it for you.
        </p>
        <a className="cta-btn" href={productUrl(p, "guides-index")}>Get Kitforge — {p.price} →</a>
      </section>
      <section>
        <ul className="article-list">
          {articles.map((a) => (
            <li key={a.slug}>
              <Link href={`/articles/${a.slug}/`}>{a.title}</Link>
              <p className="muted">{a.description}</p>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
