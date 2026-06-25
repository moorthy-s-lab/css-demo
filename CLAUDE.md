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

- Each demo is a single standalone `.html` file (inline `<style>`/`<script>`),
  using the shared "drafting-paper" palette and the Space Grotesk / Hanken
  Grotesk / JetBrains Mono type set.
- New demos: add `<name>.html` to the branch, then add a matching `<li>` card to
  `index.html` (copy an existing one — bump the `idx`, set the `<h2>`, `href`, and
  `.file`).
