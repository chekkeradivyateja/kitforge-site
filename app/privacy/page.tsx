import type { Metadata } from "next";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: `Privacy policy for ${site.name}.`,
};

export default function Privacy() {
  return (
    <article className="prose">
      <h1>Privacy Policy</h1>
      <p><em>Last updated: 30 September 2026</em></p>

      <p>
        {site.name} (&quot;we&quot;, &quot;us&quot;) publishes free educational
        articles and links to digital products. This policy explains what data is
        and isn&apos;t collected when you visit {site.name}.
      </p>

      <h2>What we collect</h2>
      <p>
        This is a static website. We do <strong>not</strong> run our own servers,
        databases, accounts, or forms, and we do not directly collect names,
        emails, or payment details on this site.
      </p>
      <ul>
        <li>
          <strong>Hosting logs.</strong> Our host (Vercel) may process standard
          technical data such as IP address and browser type to serve pages and
          protect the site, per Vercel&apos;s own privacy terms.
        </li>
        <li>
          <strong>Purchases.</strong> When you click a product link you are taken
          to Gumroad. Any information you enter to buy (email, payment) is handled
          by <strong>Gumroad</strong> under <em>their</em> privacy policy and terms
          — not by us.
        </li>
      </ul>

      <h2>Cookies &amp; analytics</h2>
      <p>
        We do not set advertising or tracking cookies. If we add basic,
        privacy-respecting analytics in future, this page will be updated to say
        so.
      </p>

      <h2>Your rights</h2>
      <p>
        Depending on where you live (e.g. GDPR/UK GDPR or CCPA), you may have
        rights over personal data held about you. Because we don&apos;t collect
        personal data directly, most such requests should be directed to the
        relevant service (Vercel for hosting, Gumroad for purchases).
      </p>

      <h2>Contact</h2>
      <p>
        Questions about this policy can be sent through our{" "}
        <a href="https://divyatejareddy.gumroad.com">Gumroad store</a> profile.
      </p>
    </article>
  );
}
