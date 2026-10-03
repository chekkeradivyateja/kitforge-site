import type { Metadata } from "next";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Disclaimer",
  description: `Disclaimer for ${site.name}.`,
};

export default function Disclaimer() {
  return (
    <article className="prose">
      <h1>Disclaimer</h1>
      <p><em>Last updated: 30 September 2026</em></p>

      <h2>Informational only</h2>
      <p>
        The content on {site.name} is for general informational and educational
        purposes. It is not professional, academic, financial, or legal advice,
        and should not be relied on as such.
      </p>

      <h2>No guaranteed results</h2>
      <p>
        Tips, templates, and products may help you get organized, but we make no
        promise of any specific outcome (grades, productivity, income, or
        otherwise). Your results depend on how you apply them.
      </p>

      <h2>Third-party links &amp; products</h2>
      <p>
        We link to products sold via <strong>Gumroad</strong> and may reference
        third-party tools (e.g. Figma, Gumroad). We are not responsible for the
        content, availability, or policies of third-party services. Trademarks
        belong to their respective owners and are used for description only; those
        companies do not endorse us.
      </p>

      <h2>Accuracy</h2>
      <p>
        We aim to keep content accurate and up to date but cannot guarantee it.
        Verify anything important before you act on it.
      </p>
    </article>
  );
}
