// Light/dark toggle, shared by every page. The theme itself is applied
// before first paint by an inline snippet in each page's <head> (avoids a
// flash); this just builds and wires the button. A manual choice persists in
// localStorage.theme; otherwise the OS preference decides.
document.addEventListener('DOMContentLoaded', () => {
  const root = document.documentElement;
  const btn = document.createElement('button');
  btn.className = 'theme-toggle';
  btn.setAttribute('aria-label', 'Toggle dark mode');

  const sync = () => {
    const dark = root.dataset.theme === 'dark';
    btn.textContent = dark ? '☀' : '☾';
    btn.setAttribute('aria-pressed', dark);
  };
  btn.addEventListener('click', () => {
    root.dataset.theme = root.dataset.theme === 'dark' ? 'light' : 'dark';
    localStorage.theme = root.dataset.theme;
    sync();
  });

  sync();
  document.body.appendChild(btn);
});
