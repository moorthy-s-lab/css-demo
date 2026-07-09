// Sticky sidebar table-of-contents, shared by every demo page.
// Builds itself from each section's <p class="num">NN / LABEL — …</p> — no
// manual menu list to keep in sync. index.html has no numbered sections so
// this script is a no-op there (linking it is harmless but unnecessary).
document.addEventListener('DOMContentLoaded', () => {
  const sections = document.querySelectorAll('.wrap > section');
  if (!sections.length) return;

  const items = [...sections].map((sec, i) => {
    if (!sec.id) sec.id = `sec-${i + 1}`;
    const numEl = sec.querySelector('.num');
    let n = String(i + 1).padStart(2, '0');
    let label = sec.querySelector('h2')?.textContent.trim() || sec.id;
    if (numEl) {
      const m = numEl.textContent.match(/^\s*(\S+)\s*\/\s*(.+)$/);
      if (m) {
        n = m[1];
        label = m[2].split('—')[0].trim(); // drop trailing "— interactive" etc.
      }
    }
    return { id: sec.id, n, label, sec };
  });

  const nav = document.createElement('nav');
  nav.className = 'toc';
  nav.setAttribute('aria-label', 'Sections');
  nav.innerHTML = `<ol>${items.map(it =>
    `<li><a href="#${it.id}"><span class="toc-n">${it.n}</span>${it.label}</a></li>`
  ).join('')}</ol>`;
  document.querySelector('.wrap').prepend(nav);

  // ponytail: IntersectionObserver scroll-spy is plenty — no need for a
  // scroll-position math loop.
  const links = new Map(items.map(it => [it.id, nav.querySelector(`a[href="#${it.id}"]`)]));
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      const link = links.get(entry.target.id);
      if (link) link.classList.toggle('active', entry.isIntersecting);
    });
  }, { rootMargin: '-10% 0px -70% 0px' });
  sections.forEach(sec => observer.observe(sec));
});
