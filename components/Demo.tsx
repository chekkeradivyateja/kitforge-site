"use client";
import { useState } from "react";
import { getProduct, productUrl } from "@/lib/site";

// A live taste of the product: one brand color -> an even (perceptual) 11-shade
// ramp + a themed light/dark UI. Steps are mixed in OKLAB so lightness is even,
// the same idea Kitforge uses. Button text flips to stay readable (real
// contrast awareness, not a claim).
const PRESETS = ["#4F46E5", "#0EA5E9", "#0D9488", "#E11D48", "#D97706", "#7C3AED"];
const TINTS = [92, 82, 68, 50, 30];
const SHADES = [15, 30, 45, 58, 70];

function readableOn(hex: string): string {
  const h = hex.replace("#", "");
  const n = h.length === 3 ? h.split("").map((c) => c + c).join("") : h;
  const r = parseInt(n.slice(0, 2), 16) / 255,
    g = parseInt(n.slice(2, 4), 16) / 255,
    b = parseInt(n.slice(4, 6), 16) / 255;
  const lin = (c: number) => (c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4);
  const L = 0.2126 * lin(r) + 0.7152 * lin(g) + 0.0722 * lin(b);
  return L > 0.42 ? "#111318" : "#ffffff";
}

export default function Demo() {
  const [brand, setBrand] = useState("#4F46E5");
  const p = getProduct();
  const ink = readableOn(brand);
  const ramp = [
    ...TINTS.map((t) => `color-mix(in oklab, ${brand}, white ${t}%)`),
    brand,
    ...SHADES.map((s) => `color-mix(in oklab, ${brand}, black ${s}%)`),
  ];
  const vars = { ["--brand" as string]: brand, ["--brand-ink" as string]: ink } as React.CSSProperties;

  const Card = ({ mode }: { mode: "light" | "dark" }) => (
    <div className={`demo-card ${mode}`}>
      <div className="dc-row">
        <span className="dc-title">Nova UI</span>
        <span className="dc-badge">AA ✓</span>
      </div>
      <p className="dc-text">Secondary text · <span className="dc-link">Link</span></p>
      <div className="dc-btns">
        <button type="button" className="dc-primary">Primary</button>
        <button type="button" className="dc-secondary">Secondary</button>
      </div>
    </div>
  );

  return (
    <div className="demo" style={vars}>
      <div className="demo-top">
        <label className="demo-pick">
          <input type="color" value={brand} onChange={(e) => setBrand(e.target.value)} aria-label="Pick a brand color" />
          <span className="demo-pick-txt">Your brand color<br /><b>{brand.toUpperCase()}</b></span>
        </label>
        <div className="demo-presets" role="group" aria-label="Preset colors">
          {PRESETS.map((c) => (
            <button key={c} type="button" title={c}
              className={"preset" + (c.toLowerCase() === brand.toLowerCase() ? " on" : "")}
              style={{ background: c }} onClick={() => setBrand(c)} aria-label={`Use ${c}`} />
          ))}
        </div>
        <span className="demo-hint">↑ change it — the whole system re-themes</span>
      </div>

      <div className="demo-ramp" aria-hidden="true">
        {ramp.map((c, i) => (<span key={i} className="rampcell" style={{ background: c }} />))}
      </div>

      <div className="demo-cards">
        <Card mode="light" />
        <Card mode="dark" />
      </div>

      <p className="demo-cap">
        That's one color → an even 11-shade ramp and a themed light/dark UI.
        The plugin builds the whole thing — 5 palettes, variables, 59 components,
        grids and tokens — inside your Figma file.
      </p>
      <a className="cta-btn" href={productUrl(p, "demo")}>Generate the full system in Figma — {p.price} →</a>
    </div>
  );
}
