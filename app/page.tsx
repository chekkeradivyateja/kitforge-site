import Link from "next/link";
import { getAllMeta } from "@/lib/articles";
import { getProduct, productUrl } from "@/lib/site";
import Demo from "@/components/Demo";

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

const INCLUDES = [
  "5 palettes × 11 perceptual shades",
  "Light & dark themes as Figma variables",
  "25 semantic tokens (surfaces, text, actions, focus…)",
  "48 automatic WCAG 2.1 AA contrast checks",
  "59 component variants, bound to variables",
  "4/8/12-column grids · 8px spacing · type & shadow styles",
  "Re-run to re-theme any time",
  "Contrast-audit tool for any file",
];

const FAQ = [
  ["Who is it for?", "Freelance UI designers, agencies and product teams who rebuild the same color ramps, buttons and dark themes for every project."],
  ["Does it work on my existing file?", "Yes. It generates into the file you already have open, and the contrast audit works on any file."],
  ["Will developers be able to use the output?", "Yes — everything is real Figma variables and semantic tokens, ready to export to code."],
  ["What if I change my brand color?", "Run Kitforge again and choose Update. Variables and styles update in place; components already in your designs re-theme without breaking."],
  ["How do I get it?", "It's a one-time purchase on Gumroad — no subscription. You get the plugin and every update."],
];

export default function Home() {
  const articles = getAllMeta().slice(0, 6);
  return (
    <>
      <section className="hero2">
        <div className="hero2-copy">
          <p className="eyebrow">Figma plugin · design systems</p>
          <h1>One brand color in.<br /><span className="grad">A whole design system</span> out.</h1>
          <p className="lede">
            Stop rebuilding the same palettes, buttons and dark themes for every
            client. Kitforge turns one color into a connected, accessible Figma
            design system — in seconds.
          </p>
          <div className="hero-cta">
            <a className="cta-btn" href={buy("hero")}>Get Kitforge — {p.price} →</a>
            <a className="ghost-btn" href="#try">Try it live ↓</a>
          </div>
          <ul className="trust">
            <li>One-time, no subscription</li><li>Works on your existing file</li><li>WCAG-checked output</li>
          </ul>
        </div>
        <figure className="hero2-shot">
          {/* DEMO VIDEO: drop a ~30s demo.mp4 in /public and replace this <img> with:
             <video src="/demo.mp4" poster="/kitforge-ui.png" controls playsInline muted loop /> */}
          <img src="/kitforge-ui.png" width={1005} height={565}
            alt="The Kitforge plugin running in Figma: a brand-colour input, a live 11-shade palette preview, light and dark component previews, and a 48/48 WCAG AA pass." />
          <figcaption>The plugin in Figma — colour in, full system out, 48/48 WCAG&nbsp;AA.</figcaption>
        </figure>
      </section>

      <section id="try" className="try">
        <h2>See it work — pick a color</h2>
        <p className="lead center">This is a taste in your browser. The plugin does the whole system inside Figma.</p>
        <Demo />
      </section>

      <section>
        <h2>What it builds</h2>
        <div className="feature-grid">
          {CREATES.map(([t, d]) => (
            <div key={t} className="feature"><h3>{t}</h3><p>{d}</p></div>
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
      </section>

      <section className="pricing">
        <div className="price-card">
          <p className="eyebrow">One-time purchase</p>
          <div className="price"><span className="amt">{p.price}</span><span className="per">· yours forever</span></div>
          <ul className="incl">
            {INCLUDES.map((i) => (<li key={i}>{i}</li>))}
          </ul>
          <a className="cta-btn wide" href={buy("pricing")}>Get Kitforge on Gumroad →</a>
          <p className="reassure">Secure checkout via Gumroad · instant download</p>
        </div>
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

      <a className="buybar" href={buy("sticky")}>Get Kitforge — {p.price} →</a>
    </>
  );
}
