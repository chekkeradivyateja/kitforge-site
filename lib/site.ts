// Central site + product config. Update `url` after the first Vercel deploy so
// canonical URLs, the sitemap, and robots point at the real domain.
export const site = {
  name: "Kitforge",
  tagline:
    "Turn one brand color into a complete, accessible Figma design system — " +
    "variables, light & dark themes, 59 components and tokens, in seconds.",
  url: "https://kitforge-site.vercel.app",
  author: "Kitforge",
  // Paste the token from Google Search Console (URL-prefix property → verify via
  // "HTML tag" → copy the content="..." value here), then redeploy, to verify
  // ownership and submit the sitemap. Leave "" to omit the tag.
  googleSiteVerification: "",
};

export type Product = { id: string; name: string; tagline: string; price: string; url: string };

// The product every article and the landing page funnel to.
export const products: Record<string, Product> = {
  kitforge: {
    id: "kitforge",
    name: "Kitforge — Figma Design System Generator",
    tagline:
      "One brand color in. A connected design system out: palettes, light/dark " +
      "variables, auto-fixed WCAG contrast, 59 components, grids and tokens.",
    price: "$29",
    url: "https://divyatejareddy.gumroad.com/l/kitforge",
  },
};

export const DEFAULT_PRODUCT = "kitforge";

export function getProduct(id?: string): Product {
  return products[id ?? DEFAULT_PRODUCT] ?? products[DEFAULT_PRODUCT];
}

// A UTM-tagged product link so Gumroad can attribute clicks to the page/article.
export function productUrl(product: Product, campaign: string): string {
  const u = new URL(product.url);
  u.searchParams.set("utm_source", "kitforge-site");
  u.searchParams.set("utm_medium", "article");
  u.searchParams.set("utm_campaign", campaign);
  return u.toString();
}
