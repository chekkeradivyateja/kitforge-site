---
title: "Why Your Color Ramp Looks Muddy - And How Perceptual Color Fixes It"
description: "Learn why HSL color ramps look muddy and how to use OKLCH in Figma Variables for even, perceptual color shades. A practical guide to building accessible, themea"
keywords: ["perceptual color", "oklch color ramp", "even color shades", "color ramp figma"]
date: "2026-10-03"
product: kitforge
---
## The Problem with Linear Lightness

You pick a brand blue. You need five shades: 50 to 900. You open HSL in Figma and adjust the lightness slider uniformly. The result looks muddy. The mid-tones feel gray, while the darks crush together. This is not a mistake in your execution; it is a failure of the HSL color model.

HSL (Hue, Saturation, Lightness) is perceptually uneven. It tries to model lightness on a linear scale, but human vision is logarithmic. We perceive small differences at the dark end and large differences at the bright end. When you step HSL lightness by 10% increments, you are not creating even visual steps. You are creating uneven steps that violate the principle of perceptual uniformity.

The solution is to switch to a perceptual color space like OKLCH (or LCH). These models are designed so that equal numerical changes in lightness result in equal perceived changes in brightness. This is the only way to build a color ramp that looks consistent across the entire spectrum.

## Why OKLCH Beats HSL for Ramps

OKLCH separates color into Hue, Chroma, and Lightness. The key advantage is the Lightness axis. In HSL, a lightness value of 50% does not look like the midpoint between black and white. In OKLCH, a lightness value of 0.5 is perceptually the midpoint.

When building a ramp, you want to control the *perceived* distance between steps. If you use HSL, your 100-step and 200-step might look too close, while your 800-step and 900-step might look too distinct. With OKLCH, you can define a lightness range (e.g., 0.95 to 0.15) and distribute shades evenly within that range. The result is a ramp where every step is visually distinct and balanced.

## Implementing Perceptual Ramps in Figma

Figma now supports OKLCH in its color picker and variables. Here is how to build a robust, themeable color system using this.

**1. Define Primitive Tokens in OKLCH**

Create a new Figma Variables collection for your primitives. Do not use HSL. For your primary blue, define the base hue and chroma. Then, define your lightness steps. A good starting point for a 9-step ramp is:

-   50: Lightness 0.95
-   100: Lightness 0.85
-   200: Lightness 0.75
-   300: Lightness 0.65
-   400: Lightness 0.55
-   500: Lightness 0.45
-   600: Lightness 0.35
-   700: Lightness 0.25
-   800: Lightness 0.15

Keep the hue and chroma constant for the base shade, but adjust chroma for the light and dark extremes. High chroma at low lightness can look muddy; high chroma at high lightness can look washed out. A common strategy is to reduce chroma as lightness increases or decreases to maintain saturation consistency.

**2. Create Variable Modes for Theming**

Once your primitives are defined, create Variable Modes for your themes: `light`, `dark`, and `high-contrast`. 

-   **Light Mode:** Map your semantic tokens (e.g., `bg-primary`, `text-primary`) to the appropriate primitive shades. For example, `bg-primary` might map to `blue-50`.
-   **Dark Mode:** This is where perceptual color shines. You cannot simply invert HSL lightness and expect it to work. In dark mode, you need to adjust the lightness steps to ensure contrast. Often, your `text-primary` in dark mode will map to a lighter shade (e.g., `blue-100` or `blue-200`) rather than the reverse of the light-mode background.

**3. Semantic Tokens and WCAG Compliance**

Your primitives are the building blocks. Your semantic tokens are the interface. Never hardcode primitive colors in components. Always reference semantic tokens. 

-   `text-primary`: Must meet WCAG 2.1 AA. For normal text, this means a contrast ratio of at least 4.5:1 against the background. For large text (18pt+ or 14pt+ bold), the ratio must be 3:1.
-   `bg-primary`: The background color.
-   `border-default`: The default border color. This often needs to be darker than the background in light mode and lighter in dark mode to maintain visibility.

Use Figma’s accessibility plugin or a contrast checker to verify these ratios. Because you are using OKLCH, you can tweak the lightness of your semantic tokens in small increments (e.g., 0.01 lightness steps) to hit the exact contrast ratio without drastically changing the hue or chroma.

**4. Tradeoffs and Practical Tips**

-   **Chroma Control:** In OKLCH, high chroma values can cause banding in gradients. Keep chroma moderate (e.g., 0.1–0.2) for most UI elements. Reserve high chroma (0.3+) for accents and highlights.
-   **Dark Mode Adjustment:** Do not assume a 1:1 mapping between light and dark modes. Adjust the lightness of your semantic tokens independently for each mode. A `blue-200` in light mode might need to become a `blue-100` in dark mode to maintain the same perceived prominence.
-   **Testing:** Always test your ramps on actual screens. Perceptual uniformity is a mathematical approximation; real-world displays and lighting conditions can affect how colors appear.

## Building the System

Start with one brand color. Define its hue and chroma. Create a 9-step ramp in OKLCH. Create semantic tokens for background, text, and borders. Create modes for light and dark. Check contrast ratios. Iterate on lightness and chroma until the ramp looks even and the contrast is compliant.

This process is tedious. You are manually adjusting lightness values, checking contrast, and ensuring the ramp looks consistent across themes. It takes hours for a single color, and days for a full palette.

Kitforge is a Figma plugin that automates this. It generates the entire perceptual color system from a single base color, handling the OKLCH calculations, semantic token mapping, and mode creation. It saves you the repetitive work of tweaking lightness steps and lets you focus on the design decisions that matter.
