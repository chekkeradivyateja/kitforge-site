---
title: "Light and Dark Mode in Figma With Variables: A Complete Guide"
description: "Master Figma variable modes for light/dark themes. Learn semantic tokens, OKLCH for even lightness, and WCAG AA contrast checks for accessible design systems."
keywords: ["figma light dark mode", "figma variable modes", "dark theme figma", "semantic color tokens"]
date: "2026-10-03"
product: kitforge
---
# Light and Dark Mode in Figma With Variables: A Complete Guide

Building a themeable design system in Figma is no longer about duplicating frames. It is about mastering the relationship between primitive tokens, semantic tokens, and variable modes. If your current setup relies on manual color swapping or broken auto-layouts, this guide will reset your architecture.

## The Hierarchy: Primitives vs. Semantics

The most common mistake in Figma theming is attaching variables directly to UI components. Do not bind a `Button` to a color named `Blue-500`. Instead, introduce a semantic layer.

**Primitive Tokens** are raw values. They represent the palette. Examples: `Gray-100`, `Blue-600`, `Red-500`. These should rarely change unless your brand identity shifts.

**Semantic Tokens** describe intent. They map to primitives based on context. Examples: `bg-surface-primary`, `text-body`, `border-default`. When you switch themes, you change which primitive the semantic token points to, not the component itself.

In Figma, create two variable collections:
1. **Primitives**: Contains raw color values.
2. **Semantics**: Contains variables that reference primitives.

Your components should only reference the Semantic collection. This decoupling is what makes mode switching automatic.

## Setting Up Variable Modes

Figma variables support modes, which act as theme states. Here is how to configure them correctly:

1. Go to **Design** > **Variables**.
2. Create your Semantic collection variables (e.g., `bg-surface`).
3. Click the three dots next to the collection name and select **Add mode**.
4. Name the modes `Light` and `Dark`.

Now, assign values. In the `Light` mode, `bg-surface` might point to `White` (#FFFFFF). In the `Dark` mode, it points to `Gray-900` (#121212). When you switch the variable mode in the Figma sidebar, every instance of `bg-surface` across your file updates instantly.

## Why HSL Fails for Dark Mode

Most designers build light palettes in HSL and try to invert them for dark mode. This fails because human perception of lightness is non-linear in HSL. A 50% lightness value in HSL does not look like the midpoint between black and white to the human eye.

Use **OKLCH** or **LCH** color spaces for your primitives. These models distribute lightness evenly. If you set your light mode surface to an L* of 95, your dark mode surface should target an L* of 15-20. This ensures consistent visual weight across themes. Figma’s color picker supports these spaces natively; use them for your primitive tokens to avoid muddy, washed-out dark themes.

## Meeting WCAG 2.1 AA Compliance

Aesthetic consistency means nothing if your text is unreadable. WCAG 2.1 AA requires:
*   **4.5:1** contrast ratio for normal text.
*   **3:1** contrast ratio for large text (18pt or 24px bold) and UI components.

When setting your Dark mode tokens, you cannot simply invert the light mode colors. White text on a #121212 background passes, but light gray text (#CCCCCC) on a mid-gray background (#424242) often fails the 4.5:1 threshold.

**Actionable Step:** Use a contrast checker plugin or tool to validate every semantic token pair. Specifically, test `text-body` against `bg-surface` and `border-default` against `bg-surface`. In dark mode, you often need to *lighten* your text colors more than you expect to maintain contrast against the darker background.

## Handling Borders and Dividers

Borders are the first thing to break in dark mode. In light mode, a 1px #E0E0E0 border is visible. In dark mode, that same light gray becomes a glaring, harsh line.

Create a semantic token `border-subtle`. In Light mode, map it to a light gray. In Dark mode, map it to a darker gray (e.g., #333333) or reduce the opacity. Never use pure black for borders in dark mode; it disappears against dark backgrounds. Use a value that is slightly lighter than your background surface to maintain definition without creating a "glowing" effect.

## The Tradeoff: Complexity vs. Flexibility

Using variables adds a layer of abstraction. You now have two collections to manage. However, the tradeoff is worth it. Without variables, changing a brand color requires updating 500 components. With variables, you update one primitive, and the semantic tokens cascade the change. It is the difference between manual maintenance and systemic integrity.

Ensure your team agrees on the naming convention before starting. If `bg-surface` is called `surface-bg` in one file and `background-primary` in another, your mode switching will fail. Standardize your semantic names first, then build the modes.

## Final Thoughts

Building this architecture manually is tedious. You have to calculate OKLCH values, verify contrast ratios for every token pair, and ensure consistent naming across dozens of components. It is easy to miss a single token that breaks the theme. If you want to skip the manual calculation and generation phase, **Kitforge** (a Figma plugin) can generate the entire variable system from a single brand color, handling the mode mapping and contrast checks for you. It turns hours of token definition into minutes.
