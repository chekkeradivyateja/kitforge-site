---
title: "How to Build a Design System in Figma From One Brand Color"
description: "Design system from a single brand color in Figma: palettes, light/dark variables, components, tokens — step by step."
keywords: ["figma design system", "design system from brand color", "figma variables", "build design system figma"]
date: "2026-10-03"
product: kitforge
---
## Define the Primitive Palette in OKLCH

Most design systems fail at the color stage because designers start with HEX codes. HEX values are arbitrary; they do not communicate intent. To build a scalable system in Figma, you must move from raw values to semantic tokens, but the foundation is your primitive palette.

Start by identifying your single brand color. Do not use HSL for generating shades and tints. HSL lightness is perceptually uneven; a 10% step in HSL can result in a massive visual jump in some hues and a barely visible change in others. Use OKLCH (or LCH) instead. In Figma, you can input colors using the `oklch` syntax directly in the color picker. This ensures that a 10% change in lightness results in a perceptually uniform step, which is critical for creating accessible, consistent scales.

Generate a scale of 11 steps (e.g., `100` to `900`) for your primary hue. Keep the chroma (saturation) constant or slightly adjusted for extreme lightness levels to avoid muddy mid-tones. These are your **primitive tokens**. They have no meaning beyond their position in the scale.

## Set Up Variable Collections and Modes

In Figma, open **Assets > Variables**. Create a new collection named `Color`. This collection will house all your color variables.

Define your variable modes immediately. At minimum, you need two modes: `Light` and `Dark`. Add a third mode, `High Contrast`, if you are targeting strict accessibility compliance beyond standard AA. This is where the power of Figma variables lies: you can map different primitive values to the same variable name depending on the active mode.

For example, create a variable named `text-primary`.
- In `Light` mode, map it to `gray-900` (or your brand’s dark neutral).
- In `Dark` mode, map it to `gray-100`.
- In `High Contrast` mode, map it to `black` or `white`.

Do not create separate variables for `text-primary-light` and `text-primary-dark`. That is an anti-pattern. One variable, multiple values per mode. This keeps your component library clean and allows for instant theming.

## Build Semantic Tokens for UI States

Primitive tokens are for developers who need raw data. Semantic tokens are for designers building interfaces. You need semantic layers for `background`, `surface`, `border`, `text`, and `accent`.

Create a new group within your collection called `Semantic`. Define variables like `surface-default`, `border-subtle`, and `accent-interactive`.

Map these to your primitives. For `surface-default`:
- `Light` mode: `white` or `gray-50`.
- `Dark` mode: `gray-900`.

For `accent-interactive`, map to your brand color scale. However, do not blindly map `brand-500` to all states. You need distinct tokens for `hover`, `active`, and `focus` states. This is where WCAG 2.1 AA comes into play.

## Enforce WCAG 2.1 AA Contrast Ratios

Accessibility is not a checkbox; it is a constraint that shapes your token values. WCAG 2.1 AA requires a contrast ratio of at least 4.5:1 for normal text and 3:1 for large text (18pt+ or 14pt+ bold) and UI components.

You cannot rely on eye-testing. Use Figma’s built-in contrast checker or a plugin like Stark. When testing your `text-primary` against `surface-default`:
- If the ratio is below 4.5:1, adjust the primitive value. Do not change the semantic token mapping; change the underlying primitive.
- For your brand color used as text on a white background, you may need to use a darker step (e.g., `brand-700` instead of `brand-500`) to pass AA. In Dark mode, you may need a lighter step (e.g., `brand-300`) against a dark surface.

This is why you need a full scale. If your brand color is a bright yellow, it will fail AA on white. You must generate a dark variant of your brand hue for light mode text, or restrict its use to large text/icons only. Document these constraints in your variable descriptions.

## Create the Component Library Bindings

Now, bind your components to these variables. Do not hardcode colors in your component styles. Select a text layer in your Button component and apply the `text-primary` variable. Select the background and apply `surface-default`.

This creates a live link. When you switch the Figma file’s variable mode from `Light` to `Dark`, every component instance updates instantly. This is the core utility of a Figma design system: it is not just a library of static frames; it is a dynamic, stateful environment.

Test this by creating a frame with your button in Light mode, duplicating it, and switching the duplicate to Dark mode. The colors should shift automatically. If they don’t, check that you haven’t manually overridden the variable binding on the instance.

## Handle Edge Cases: Focus Rings and Borders

Borders and focus rings are often overlooked. A 1px border in `border-subtle` may not meet the 3:1 contrast requirement for UI components. In Light mode, a light gray border on a white background often fails. You may need to use a darker gray (e.g., `gray-300`) for borders in Light mode, while using a lighter gray (e.g., `gray-700`) in Dark mode.

For focus rings, use your `accent-interactive` or a dedicated `focus-ring` variable. Ensure this ring is visible on both light and dark surfaces. A common mistake is using a blue focus ring that disappears on a blue button. Create a `focus-ring` variable that maps to a high-contrast color (often black or white, depending on the background) to ensure visibility.

## Finalize and Document

Once your variables are set, lock the collection. Document your token naming convention. Use BEM-like naming for semantic tokens: `component-role-state` (e.g., `button-primary-hover`). Keep primitive tokens simple: `hue-scale-step` (e.g., `blue-500`).

Export your tokens to JSON using a plugin like Tokens Studio if you need to sync with a developer’s codebase. Ensure the JSON structure mirrors your variable hierarchy. This reduces friction between design and engineering, as developers can consume the same semantic tokens you use in Figma.

Building this system manually is a meticulous process. You will spend hours adjusting lightness values to hit contrast ratios and ensuring perceptual uniformity across the scale. It is tedious, but necessary for a robust system. If you find yourself copying and pasting color values or struggling to maintain consistency across modes, tools like Kitforge (a Figma plugin) can automate the generation of the entire variable hierarchy from a single brand color, saving you the manual labor while enforcing best practices around contrast and scale generation.
