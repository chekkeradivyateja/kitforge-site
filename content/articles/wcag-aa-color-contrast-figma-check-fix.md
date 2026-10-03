---
title: "WCAG AA Color Contrast in Figma: How to Check and Fix Failing Pairs"
description: "Fix WCAG AA contrast in Figma using variables, modes, and OKLCH. Learn how to structure semantic tokens to ensure 4.5:1 compliance across light and dark themes."
keywords: ["wcag contrast figma", "figma accessibility", "4.5:1 contrast", "fix color contrast"]
date: "2026-10-03"
product: kitforge
---
## Stop Guessing: The Math Behind 4.5:1

WCAG 2.1 AA is not a suggestion; it is a baseline for accessibility. For normal text (under 24px regular or 18.66px bold), you need a contrast ratio of at least 4.5:1. For large text and UI components (icons, borders), the threshold drops to 3:1. Most designers treat these numbers as abstract goals. In Figma, they are concrete constraints you can enforce through token architecture.

The problem with manual checking is speed. If you have 50 color pairs across light and dark modes, checking them one by one in a browser extension is unsustainable. The fix starts with how you structure your color system in Figma Variables.

## Structure Your Tokens: Primitive vs. Semantic

Do not reference primitive colors directly in your components. This is the most common cause of broken contrast in multi-theme systems.

Create a **Collection** for your brand colors. Inside, define **Primitives** as raw values (e.g., `blue-500`, `gray-900`). These are the building blocks. They have no semantic meaning; they are just hues and lightness values.

Next, create **Semantic Tokens** (often called Roles) that reference the primitives. Examples include `text-primary`, `bg-surface`, and `border-subtle`. Components should only reference semantic tokens.

This separation is critical because it allows you to swap the underlying primitive without breaking the component structure. If `blue-500` fails contrast against `white` in Dark Mode, you don’t edit every component. You simply re-point the `text-primary` variable in the Dark Mode to a lighter `blue-300`. The component updates automatically.

## Leveraging Variable Modes for Theming

Figma Variables allow you to define **Modes** (e.g., Light, Dark, High Contrast). When you create a variable, you can assign different values to different modes.

Here is the workflow to ensure compliance:

1.  **Define Base Pairs:** Start with your primary brand color in Light Mode. Check the contrast against `bg-surface` (usually white or near-white).
2.  **Calculate the Offset:** If your brand blue is too dark for white text, do not just lighten it arbitrarily. Use a contrast checker tool to find the exact hex value that hits 4.5:1.
3.  **Map the Dark Mode:** In the Dark Mode column for that same variable, set the value to a lighter variant of the brand color that passes 4.5:1 against your dark background (e.g., `#121212`).

**Pro Tip:** Use the **Variable Picker** in Figma’s right-hand panel to see which tokens are currently applied. If you see a direct hex code instead of a variable, your system is broken. Refactor it immediately.

## Perceptual Color Spaces: Why HSL Fails You

Many designers adjust contrast by tweaking HSL values. This is a trap. HSL is non-perceptual. A 10% change in lightness in HSL does not produce a 10% change in perceived brightness to the human eye. This makes it nearly impossible to create even steps in a color scale by hand.

Figma now supports **OKLCH** (and LCH) in variable values. OKLCH is based on human perception. The `L` (Lightness) channel is linear to the eye. This means if you create a scale from L=0.2 to L=0.9 in steps of 0.1, the perceived difference between each step is consistent.

**How to use this for contrast:**
When fixing a failing pair, do not just increase saturation. Increase the Lightness (`L` value) in OKLCH. Because the space is perceptual, you can predictably move toward a value that meets the 4.5:1 threshold without overshooting into a color that looks washed out.

For example, if `#0055FF` fails against white, switching to OKLCH and incrementing `L` by 0.05 at a time will show you exactly when the contrast ratio crosses the threshold, and the color will remain visually harmonious with your brand.

## The UI Component Exception (3:1 Rule)

Remember that large text and user interface components only require 3:1. This includes:
*   Icons that convey meaning.
*   Borders on input fields.
*   Focus rings.

Do not over-correct these. If you force a 4.5:1 ratio on a subtle border, it will become visually noisy. In your Figma variables, create a separate semantic token for `border-subtle` that targets the 3:1 ratio against the background, rather than reusing `text-secondary`.

## Validation in Figma

Figma does not have a native "Contrast Checker" plugin built into the core UI, but you can use the **Variable Watcher** or third-party plugins like *Contrast* to audit your file.

1.  Select a component.
2.  Open the **Design** tab.
3.  Hover over a fill or stroke.
4.  Look for the contrast ratio indicator (if enabled via a plugin or community tool).

If you are working without plugins, export your pairs as PNGs and use a browser extension. However, the goal is to fix the variables, not the instances. Once the variables are correct, every instance is fixed.

## The Tradeoff: Flexibility vs. Consistency

Strict tokenization limits your freedom. You cannot pick a random hex code for a button hover state if it breaks the system. This is a feature, not a bug. It forces you to design within the constraints of accessibility from the start, rather than retrofitting it later.

The tradeoff is upfront time. Setting up a robust variable collection with modes and OKLCH values takes longer than grabbing a hex code from a palette. But it pays off when you switch to Dark Mode or High Contrast Mode in one click, knowing every pair is compliant.

## Conclusion

Building an accessible color system in Figma requires discipline. You need to separate primitives from semantics, use variable modes for theming, and lean on perceptual color spaces like OKLCH to make precise lightness adjustments. Doing this manually for a large design system is tedious and error-prone. If you want to save time, tools like Kitforge can generate the entire token structure and contrast-compliant scales from a single brand color, letting you focus on the design itself rather than the math. But if you do it by hand, follow the 4.5:1 rule, use semantic variables, and let the math work for you.
