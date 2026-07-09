# css-demo — project instructions

A collection of small, self-contained CSS demo pages, published via GitHub
Pages from the `gh-pages` branch. `index.html` is a plain, hand-kept index that
links to the demo `.html` files.

## Git / commits

- **Do NOT add a `Co-Authored-By` trailer to commit messages.** Likewise, do not
  append any other AI-attribution trailers (e.g. `Claude-Session:`). Keep commit
  messages plain and conventional — subject line plus an optional body.
- Default working branch is `gh-pages` (this is what GitHub Pages serves).
- Remote: `git@github.com:moorthy-g/css-demo.git`.

## Conventions

- Each demo is a single `.html` file that links the shared `styles.css` (the
  "drafting-paper" palette, Space Grotesk / Hanken Grotesk / JetBrains Mono
  type set, masthead, specimen/code/caniuse-widget scaffolding) and inlines
  only its own feature-specific `<style>`/`<script>`. Don't duplicate anything
  already in `styles.css` into a page's inline styles.
- New demos: add `<name>.html` to the branch, then prepend a matching `<li>`
  card to the top of `<ul class="demo-list">` in `index.html` (copy an
  existing card — set the `<h2>`, `href`, and `.file`; there is no `idx`
  number badge). The list is newest-first.
- Use the `new-css-demo` skill (`.claude/skills/new-css-demo/`) to scaffold a
  new demo page from a CSS topic — it knows this house style and the
  index-update convention above.
