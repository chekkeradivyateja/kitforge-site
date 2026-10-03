import Link from "next/link";
import { getAllMeta } from "@/lib/articles";
import { getProduct, productUrl } from "@/lib/site";

const p = getProduct();
const buy = (c: string) => productUrl(p, c);

const CREATES = [
  ["5 palettes × 11 shades", "Perceptual color space, so every step looks even. Your exact brand hex is kept."],
  ["Light & dark as real variables", "25 semantic tokens for surfaces, text, borders, actions, focus and feedback."],
  ["WCAG AA, fixed for you", "48 checks. Any pair that would fail is nudged to the nearest shade that passes."],
  ["59 component variants", "Button, Input, Card, Modal and Navbar — every state, all bound to variables."],
  ["Responsive by default", "4/8/12-column grids, an 8px spacing scale, 11 text styles, 3 shadow styles."],
  ["Re-theme without breaking", "Run it again with a new color and choose Update. Components re-theme in place."],
];

const STEPS = [
  ["Type a brand color", "Or pick it straight from your logo."],
  ["Press Generate", "Kitforge builds the system inside the file you already have open."],
  ["Ship, or re-theme later", "Hand off clean tokens to developers, or update the color anytime."],
];

const FAQ = [
  ["Who is it for?", "Freelance UI designers, agencies and product teams who rebuild the same color ramps, buttons and dark themes for every project."],
  ["Does it work on my existing file?", "Yes. It generates into the file you already have open, and the contrast audit works on any file."],
  ["Will developers be able to use the output?", "Yes — everything is real Figma variables and semantic tokens, ready to export to code."],
  ["What if I change my brand color?", "Run Kitforge again and choose Update. Variables and styles update in place; components already in your designs re-theme without breaking."],
];

export default function Home() {
  const articles = getAllMeta().slice(0, 6);
  return (
    <>
      <section className="hero">
        <p className="eyebrow">Figma plugin · design systems</p>
        <h1>One brand color in.<br />A whole design system out.</h1>
        <p className="lede">
          Stop rebuilding the same palettes, buttons and dark themes for every
          client. Kitforge turns one color into a connected, accessible Figma
          design system — variables, light &amp; dark themes, 59 components,
          grids and tokens — in seconds.
        </p>
        <div className="hero-cta">
          <a className="cta-btn" href={buy("hero")}>Get Kitforge — {p.price} →</a>
          <Link className="ghost-btn" href="/articles/">Read the guides</Link>
        </div>
        <p className="reassure">One-time purchase · works on your existing Figma file · WCAG-checked output</p>
      </section>

      <section className="showcase">
        {/* DEMO VIDEO: once you record a ~30s clip, drop demo.mp4 in /public and
            replace the <img> below with:
            <video src="/demo.mp4" poster="/kitforge-ui.png" controls playsInline
                   muted loop width={1005} height={565} /> */}
        <img src="/kitforge-ui.png" width={1005} height={565}
             alt="The Kitforge plugin running in Figma: a brand colour input, a live preview of 11-shade palettes, light and dark component previews, and a 48/48 WCAG AA pass." />
        <p className="shot-cap">The plugin building a full system from one colour — live palettes, light &amp; dark components, and a 48/48 WCAG&nbsp;AA pass.</p>
      </section>

      <section>
        <h2>What it builds</h2>
        <div className="feature-grid">
          {CREATES.map(([t, d]) => (
            <div key={t} className="feature">
              <h3>{t}</h3>
              <p>{d}</p>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2>How it works</h2>
        <ol className="steps">
          {STEPS.map(([t, d], i) => (
            <li key={t}><span className="step-n">{i + 1}</span><div><strong>{t}</strong><p>{d}</p></div></li>
          ))}
        </ol>
        <div className="center"><a className="cta-btn" href={buy("how")}>Generate your system — {p.price} →</a></div>
      </section>

      {articles.length > 0 && (
        <section>
          <h2>Design-system guides</h2>
          <ul className="article-list">
            {articles.map((a) => (
              <li key={a.slug}>
                <Link href={`/articles/${a.slug}/`}>{a.title}</Link>
                <p className="muted">{a.description}</p>
              </li>
            ))}
          </ul>
          <p><Link href="/articles/">All guides →</Link></p>
        </section>
      )}

      <section>
        <h2>Questions</h2>
        <dl className="faq">
          {FAQ.map(([q, a]) => (<div key={q}><dt>{q}</dt><dd>{a}</dd></div>))}
        </dl>
        <div className="center cta-final">
          <h2>Build your next design system in seconds</h2>
          <a className="cta-btn" href={buy("footer")}>Get Kitforge — {p.price} →</a>
        </div>
      </section>
    </>
  );
}
