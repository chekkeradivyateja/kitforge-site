import { getProduct, productUrl, type Product } from "@/lib/site";

type CtaProps = {
  campaign: string;
  product?: string; // registered product id
  // Self-contained CTA from article frontmatter (pipeline-generated articles).
  productName?: string;
  productUrl?: string;
  productPrice?: string;
};

// Funnel card shown on every article — the article gives the how-to for free,
// this offers the matching done-for-you product. The product comes from the
// article's own frontmatter (self-contained) or a registered product id.
export default function Cta(props: CtaProps) {
  const p: Product = props.productUrl
    ? {
        id: props.product ?? "custom",
        name: props.productName ?? "the template",
        tagline: "",
        price: props.productPrice ?? "",
        url: props.productUrl,
      }
    : getProduct(props.product);

  return (
    <aside className="cta">
      <p className="cta-kicker">Skip the setup</p>
      <h3 className="cta-title">{p.name}</h3>
      <p className="cta-desc">
        {p.tagline || "The done-for-you version"}. Get it done in minutes instead
        of building from scratch.
      </p>
      <a className="cta-btn" href={productUrl(p, props.campaign)}>
        {p.price ? `Get it for ${p.price} →` : "Get it →"}
      </a>
    </aside>
  );
}
