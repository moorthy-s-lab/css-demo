---
name: new-css-demo
description: >
  Scaffolds a new CSS specimen page for THIS repo (css-demo, gh-pages branch)
  and prepends it to index.html. Use whenever the user names a CSS topic,
  property, selector, or feature and wants a demo, specimen, example page, or
  writeup for it here — e.g. "make a demo for CSS subgrid", "add a page for
  :has()", "I want a specimen on container queries", "cover anchor
  positioning next", or just "add a demo for X". Always use this skill for
  that request instead of hand-writing a new .html file from scratch — it
  knows the house style (drafting-paper palette, Space Grotesk / Hanken
  Grotesk / JetBrains Mono, the shared styles.css, the caniuse support
  widget) and the index-update convention this repo expects.
---

# New CSS demo

Turn a CSS topic into a finished specimen page in this repo's house style,
then link it from `index.html`. This skill is specific to `css-demo` — it
assumes the repo's existing conventions (see `CLAUDE.md`) and its shared
`styles.css`.

## Before you start

Skim one existing demo (`gap-decorations.html` or `gap-decorations-advanced.html`)
if you haven't already this session — it's the canonical example of the
finished shape. `references/template.html` is a stripped scaffold of the same
thing with the feature-specific parts removed; use it as your starting file,
don't rebuild the shell from memory.

## Workflow

1. **Pick a filename.** Kebab-case the topic → `<slug>.html` (e.g. "CSS
   Subgrid" → `subgrid.html`, "the `:has()` selector" → `has-selector.html`).
   Check it doesn't already exist; if it does, pick a more specific slug
   (the way `gap-decorations-advanced.html` disambiguated from Part I).

2. **Copy the template.** Copy `references/template.html` to `<slug>.html` at
   the repo root. It already links `styles.css` and the Google Fonts, and
   carries the masthead, one interactive section, one static section, and the
   full caniuse support section as clonable patterns. It also already links
   the shared `toc.js` — don't remove that `<script>` tag.

3. **Write the masthead.** Fill in the `<title>`, `.eyebrow` (the template
   already opens it with `<a href="index.html">← All demos</a> · ` — keep
   that link, just replace the `TODO · spec / module name` part after it),
   `h1` (a short, punchy hook — see "Lines that live in the gaps." / "Past
   the basics." for tone), and `.lede` (2-3 sentences: what the feature is,
   why it matters, what a per-item hack it replaces).

4. **Build 3-6 numbered sections.** Each section is `<p class="num">NN /
   LABEL</p>`, an `h2`, a `.desc`, a `.specimen` containing the live rendered
   example, and a syntax-highlighted `<pre>` below it (`.k` property, `.v`
   value, `.c` comment). Order sections from the simplest form of the feature
   to its more advanced corners, the way both existing demos build from a
   basic shorthand up through edge cases.

   The shared `toc.js` builds the page's sticky sidebar table-of-contents by
   reading each section's `<p class="num">NN / LABEL</p>` text automatically
   — there's no separate menu list to maintain, just keep that `NN / LABEL`
   format and keep labels short (a trailing `— interactive` qualifier is
   stripped for the TOC).

   Only add JS-driven controls (`.controls` / `.ctl` / range or select
   inputs bound via a small `bind`/bind-like helper, see the template's demo
   1) when dragging a value actually teaches something about the feature —
   e.g. a numeric knob (width, inset, gap) or a small enum (style keyword).
   A static specimen + code block is the default and is completely fine for
   most sections; don't wire up a slider just to have one.

   All CSS you write for the demos themselves (the `.demo-*` rules) goes in
   this page's own inline `<style>` block, appended after the template's
   comment marker — never duplicate anything already in `styles.css`
   (palette vars, masthead, `.specimen`, `.cell`, `.controls`, `pre`/`.k/.v/.c`,
   the caniuse classes, `footer`). If a demo needs its own JS, add it to this
   page's own inline `<script>`, following the same small-helper style as the
   existing demos (`bind`/`rangeBind`/`selBind`).

5. **Wire the support section.** Every generated page keeps the support
   section (per repo convention, always included, not optional). Update:
   - The `id="support"` banner's `CSS.supports(prop, value)` test in the
     script to check the actual feature.
   - The `.ciu-embed` `data-feature` attribute to the correct caniuse/MDN
     slug for the topic (look it up — don't guess; check caniuse.com or MDN's
     browser-compat data for the right identifier, same as
     `mdn-css_properties_row-rule` in the existing demos).
   - The static fallback `<table class="support-table">` rows with current,
     accurate per-browser support data for the feature (don't leave the
     gap-decorations placeholder data in).
   - The `.ciu-note` links (caniuse.com URL, and webstatus.dev if the feature
     has an entry there).

6. **Write the footer.** One line: how to view it (which browsers support
   it), a spec link, and a fallback caveat if relevant — mirror the tone of
   the existing footers.

7. **Update `index.html`.** Prepend a new card to the *top* of `<ul
   class="demo-list">` (newest-first order — this repo does not use number
   badges on cards, so don't add one):
   ```html
   <li>
     <a class="demo-card" href="<slug>.html">
       <span class="body">
         <h2><Display title></h2>
         <span class="file"><slug>.html</span>
       </span>
       <span class="arrow" aria-hidden="true">&rarr;</span>
     </a>
   </li>
   ```
   Copy an existing card's structure exactly; only the `href`, `h2` text, and
   `.file` text change.

## Conventions to hold onto

- **Link, don't re-inline.** `styles.css` at the repo root carries the shared
  palette, typography, masthead, section scaffolding, controls, code-block,
  caniuse-widget, sticky-TOC (`.toc`), and dark-mode CSS. New demo pages
  `<link>` it and add only feature-specific CSS inline. Don't copy shared
  rules into the new page's `<style>` block — that's the duplication this
  stylesheet exists to avoid.
- **Dark mode covers the whole page, including `.specimen`.** `styles.css`
  flips the palette vars via `:root[data-theme="dark"]`; because every rule
  reads colour through those vars, `.specimen` cards and the demos inside
  them go dark automatically — don't hand-roll a per-page dark variant. The
  template already carries the no-flash inline snippet + `theme.js` link
  that apply the theme and wire the toggle button; don't remove them.
  **Always use the palette vars** (`var(--paper)`, `var(--accent)`, etc.) for
  any colour a demo needs, never a bare hex — a hardcoded colour won't adapt
  between themes and can silently go low-contrast (e.g. dark text becoming
  invisible once the card goes dark). If a demo genuinely needs a fixed
  highlight tint that a var can't express, add an explicit
  `:root[data-theme="dark"] .your-selector { … }` counterpart next to it, the
  way `has-selector.html`'s checked-card highlight does.
  The caniuse `.ciu-embed`'s `data-theme` is set at runtime by the existing
  `loadCaniuse()` script (matching the page theme at load) — don't hardcode
  `data-theme="light"` on it.
- **One file per demo**, inline `<style>`/`<script>` for the feature-specific
  parts only — still no build step, no JS framework, no bundler.
- **Index is newest-first, no `idx` numbers.** New card goes at the top of
  the list; don't add a number badge.
- **If you commit:** plain, conventional commit messages. **Never** add a
  `Co-Authored-By` trailer or any other AI-attribution trailer — this is a
  hard rule in the repo's `CLAUDE.md`.

## Reference

- `references/template.html` — the fill-in scaffold to copy for step 2.
