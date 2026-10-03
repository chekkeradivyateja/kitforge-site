import type { Metadata } from "next";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Terms of Use",
  description: `Terms of use for ${site.name}.`,
};

export default function Terms() {
  return (
    <article className="prose">
      <h1>Terms of Use</h1>
      <p><em>Last updated: 30 September 2026</em></p>

      <p>
        By using {site.name} you agree to these terms. If you do not agree, please
        don&apos;t use the site.
      </p>

      <h2>The content</h2>
      <p>
        Articles here are provided free for general informational and educational
        purposes. We try to be accurate and useful, but we make no warranty that
        the content is complete, current, or fits your particular situation. Use
        it at your own discretion.
      </p>

      <h2>Products &amp; purchases</h2>
      <p>
        Product links take you to <strong>Gumroad</strong>, which handles the sale,
        payment, delivery, and refunds under Gumroad&apos;s own terms and refund
        policy. Your purchase is a transaction between you and the seller via
        Gumroad; please review the product page and Gumroad&apos;s terms before
        buying.
      </p>

      <h2>No guarantees</h2>
      <p>
        We do not guarantee any specific result, grade, income, or outcome from
        using our articles or products. Results depend on your own effort and
        circumstances.
      </p>

      <h2>Intellectual property</h2>
      <p>
        The articles and branding on this site are ours. You may read and share
        links, but please don&apos;t republish the content as your own.
      </p>

      <h2>Limitation of liability</h2>
      <p>
        To the maximum extent permitted by law, {site.name} is not liable for any
        loss or damage arising from your use of the site or reliance on its
        content.
      </p>

      <h2>Changes</h2>
      <p>We may update these terms; the &quot;last updated&quot; date reflects the latest version.</p>
    </article>
  );
}
