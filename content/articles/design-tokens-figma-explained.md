---
title: "Design Tokens in Figma, Explained (And How to Generate Them Fast)"
description: "Learn how to implement design tokens in Figma using variables, modes, and semantic naming. Covers WCAG contrast, OKLCH color science, and developer handoff best"
keywords: ["design tokens figma", "semantic tokens", "design tokens explained", "figma tokens for developers"]
date: "2026-10-03"
product: kitforge
---
# Design Tokens in Figma, Explained (And How to Generate Them Fast)

Design tokens are the source of truth for your design system. They are named values that define visual properties like color, spacing, and typography. In Figma, these are no longer just static styles; they are **Variables**. Understanding the architecture of variables is the difference between a fragile mockup and a scalable product.

## The Two-Layer Architecture: Primitive vs. Semantic

The most common mistake in design systems is mapping colors directly to components. If you name a token `Blue-500` and use it for a primary button, you create a rigid dependency. When you need to change the primary button color, you have to hunt down every instance of `Blue-500`.

Instead, use a two-layer structure:

1.  **Primitive Tokens (Global):** These are raw, unbranded values. They represent the palette. Examples: `grey-100`, `blue-500`, `green-600`. These values rarely change. They are the atoms of your system.
2.  **Semantic Tokens (Alias):** These describe the *purpose* of the value, not the value itself. You alias them to primitives. Examples: `bg-primary`, `text-error`, `border-focus`. These point to primitives via Figma’s variable aliasing feature.

When you need to update your brand, you change the primitive value. The semantic token (`bg-primary`) automatically updates everywhere it is used. Your components never break because they reference the intent, not the hex code.

## Figma Variables: Collections and Modes

In Figma, variables live in **Collections**. A collection is a logical container for related variables (e.g., a "Colors" collection, a "Spacing" collection).

Inside a collection, you define **Modes**. Modes are the engine of theming.

*   **Static Mode:** For tokens that don’t change across themes (like standard spacing scales).
*   **Multiple Modes:** For tokens that change based on context, such as `Light Mode` and `Dark Mode`, or `Brand A` and `Brand B`.

### How to Set Up Semantic Color Variables

1.  Open the **Design Tokens** panel (or Variables sidebar).
2.  Create a new Collection named `Colors`.
3.  Add Modes: `Light`, `Dark`.
4.  Create Primitive Variables: Add `grey-100`, `grey-900`, `blue-500`. Set their values in both modes (they can be the same).
5.  Create Semantic Variables: Add `bg-surface`, `text-primary`.
6.  **Alias:** Click the value field for `bg-surface` in `Light` mode and select `grey-100`. In `Dark` mode, select `grey-900`.

Now, when you switch your Figma file’s variable mode to `Dark`, every component using `bg-surface` updates instantly. This is how you simulate theming for developers without writing code.

## Spacing and Typography: Beyond Color

Color is the most visible token, but spacing and typography are where consistency lives or dies.

**Spacing:**
Use a base unit of 4px or 8px. In Figma, create a variable collection called `Spacing` with a single static mode. Define values like:
*   `space-xs`: 4px
*   `space-sm`: 8px
*   `space-md`: 16px
*   `space-lg`: 24px

Avoid arbitrary values like 13px or 27px. They break the visual rhythm and make CSS generation messy. Stick to the scale. If you need a 12px gap, use `space-sm` (8px) or `space-md` (16px) and adjust the component padding, not the token.

**Typography:**
Figma variables support font size, line height, and letter spacing. Create a collection `Typography`.
*   `font-size-body`: 16px
*   `line-height-body`: 1.5
*   `font-weight-regular`: 400

Link your text styles to these variables. This ensures that when you change the base font size for accessibility, all text styles update proportionally.

## WCAG 2.1 AA: The Non-Negotiable Contrast Check

Design tokens are not an excuse to ignore accessibility. WCAG 2.1 AA requires:
*   **4.5:1** contrast ratio for normal text (< 24px).
*   **3:1** contrast ratio for large text (≥ 24px) and UI components (icons, borders).

When defining your semantic color tokens, test the pair: `text-primary` on `bg-surface`. Use a contrast checker tool (built into Figma plugins or external sites). If you set `text-primary` to `grey-600` and `bg-surface` to `white`, the ratio is often around 7:1, which passes AA. But if you use `grey-400`, it might fail.

**Pro Tip:** Don’t just check the default state. Check `text-disabled` on `bg-surface`. Disabled states often fail contrast because designers lighten the color too much. Keep disabled text at least 3:1 against the background to remain perceivable.

## Color Science: Why HSL Fails and OKLCH Works

Figma’s color picker defaults to HSL (Hue, Saturation, Lightness). HSL is perceptually uneven. A change in L (Lightness) does not produce a consistent perceived brightness change across different hues. This makes it hard to create balanced scales.

For serious design systems, use **OKLCH** (or LCH). OKLCH is a modern color space where Lightness (L) is perceptually uniform. If you set L to 0.5, all colors at that lightness appear equally bright, regardless of hue.

In Figma, you can’t natively generate OKLCH scales, but you can import them. Generate your primitive color scales in a tool like `oklch.js` or `ColorJS`, then paste the hex values into Figma. This ensures that your `blue-100` to `blue-900` scale has consistent perceived steps, making it easier for users to distinguish between shades.

## Handing Off to Developers

Developers don’t want to guess what `bg-primary` means. They want a machine-readable format.

Figma variables can be exported via plugins to JSON, CSS Custom Properties, or SCSS. The key is naming convention. Use kebab-case for primitives (`grey-100`) and semantic (`bg-primary`). Ensure your JSON structure mirrors your Figma collections.

Example JSON output:
```json
{
  "colors": {
    "primary": {
      "light": "#0055FF",
      "dark": "#3377FF"
    }
  }
}
```

This structure allows developers to map tokens to CSS variables easily: `var(--color-primary)`.

## The Manual Grind

Setting up variables, aliasing them, and testing contrast for every state (hover, active, disabled) is tedious. You’ll spend hours tweaking hex codes to hit the exact contrast ratio while maintaining brand fidelity.

That’s where tools like **Kitforge** come in. It’s a Figma plugin that can generate the entire token system from a single brand color, handling the perceptual color science and contrast checks for you. It saves you from the manual grind of building the foundation, letting you focus on the components that actually matter.
