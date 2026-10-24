## Overview

Mobbin is a reference library of real product interfaces, and its own interface is engineered to get out of the way. The system is strictly monochrome: near-black ink (`{colors.ink}` — #141414) on a pure white canvas (`{colors.canvas}`), with structure carried by a ladder of barely-perceptible neutral tints rather than by shadows or color. The thousands of app screenshots, icon tiles, and brand logos the site exists to show are the only saturated elements on any page — the chrome frames them the way a gallery wall frames paintings.

The geometry does the brand work that color refuses to do. Every interactive element is a stadium pill (`{rounded.full}`): the floating navigation bar, every button, the segmented billing toggle, the overlay badges. Containers sit at a calm `{rounded.md}` (24px), media tiles at `{rounded.sm}` (16px), and app icons render as iOS-style squircles at 30% corner radius. Type is set in Saans at deliberately non-standard variable weights — a chunky 652 for every heading, a bookish 456 for text, an airy 300 for hero subtitles — which gives the monochrome pages a strong typographic voice without a single decorative flourish.

One color is allowed to interrupt: an electric blue accent (`{colors.accent}` — #0066ff), used exclusively for commercial signals — the "Popular" plan badge and the yearly-savings callout on pricing. Its scarcity is the point; when blue appears, it is asking for a decision.

**Key Characteristics:**
- Gallery-white monochrome palette — `{colors.ink}` on `{colors.canvas}`, zero brand chroma outside the single `{colors.accent}` blue
- Stadium-pill interaction language: nav bar, buttons, toggles, and badges all at `{rounded.full}`
- Shadow-free elevation — hierarchy built from a neutral tint ladder (`{colors.canvas-soft}`, `{colors.field}`, `{colors.hairline}`) and 1px hairlines
- Saans at signature variable weights: 652 headings with tight 1.0–1.13 line-height, 456 body, 300 light subtitles
- iOS-style squircle icon tiles (30% radius) as a recurring visual motif across library counters and brand marquees
- Content supplies the color: app screenshots, brand icons, and grayscale curator portraits carry all visual richness
- Full-bleed near-black `{colors.ink}` footer with rounded top corners closes every page in polarity inversion

## Colors

### Brand & Accent
- **Ink Black** (`{colors.primary}` — #141414): The brand color. Fills every primary CTA pill, the footer band, and all display typography.
- **Electric Blue** (`{colors.accent}` — #0066ff): The only chromatic accent in the system. Reserved for commercial emphasis — the "Popular" / "Top Match" badge and savings callouts. Never used decoratively, never used for CTAs.

### Surface
- **Canvas** (`{colors.canvas}` — #ffffff): Default page and card background across all pages.
- **Soft Canvas** (`{colors.canvas-soft}` — #f3f3f3): The workhorse tint — a 6% ink wash over white. Fills the floating nav pill, featured cards, FAQ rows, soft utility pills, and segmented tracks.
- **Field** (`{colors.field}` — #f0f0f0): An 8% ink wash used as the fill for form inputs, giving fields presence without borders.
- **Soft Hairline** (`{colors.hairline-soft}` — #f0f0f0): 1px card outlines on white-on-white surfaces.
- **Hairline** (`{colors.hairline}` — #e0e0e0): The stronger 16% control border, used on outlined pill buttons and interactive chrome.

### Text
- **Ink** (`{colors.ink}` — #141414): Headings, body copy, and nav links.
- **Soft Ink** (`{colors.ink-soft}` — #262626): Lifted dark used for secondary headings and badges.
- **Muted** (`{colors.text-muted}` — #707070): Secondary copy — supporting paragraphs, descriptions, subtitles.
- **Faint** (`{colors.text-faint}` — #adadad): Tertiary text — placeholders, de-emphasized links, fine print.

## Shapes

- Stadium pills: `rounded-full` (nav bar, buttons, search bars, segmented controls, badges)
- Containers & Cards: `rounded-[24px]` (24px radius)
- Tiles & Inputs: `rounded-[16px]` (16px radius)
- App / Category Squircles: `rounded-[30%]` or `app-icon-squircle` (iOS 30% corner radius)
- Shadow-free elevation: 0 drop shadows. Hierarchy is built strictly by fills and 1px hairlines.
