import type { Metadata } from "next";
import Link from "next/link";
import { site, getProduct, productUrl } from "@/lib/site";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: `${site.name} — Figma Design System Generator`, template: `%s — ${site.name}` },
  description: site.tagline,
  openGraph: { title: site.name, description: site.tagline, url: site.url, type: "website" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <header className="site-header">
          <Link href="/" className="brand">{site.name}</Link>
          <nav className="brand-nav">
            <Link href="/articles/">Guides</Link>
            <a className="cta-btn cta-sm" href={productUrl(getProduct(), "header")}>Get Kitforge — $29</a>
          </nav>
        </header>
        <main className="container">{children}</main>
        <footer className="site-footer">
          <p>
            {site.name} — a Figma design system generator.{" "}
            <a href={getProduct().url}>Get it on Gumroad</a>
          </p>
          <p className="footer-legal">
            <a href="/privacy/">Privacy</a> · <a href="/terms/">Terms</a> ·{" "}
            <a href="/disclaimer/">Disclaimer</a>
          </p>
        </footer>
      </body>
    </html>
  );
}
