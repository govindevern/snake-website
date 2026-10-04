(() => {
  const root = document.documentElement;
  const themeButtons = document.querySelectorAll('.theme-toggle');
  const savedTheme = localStorage.getItem('snake-theme');
  if (savedTheme === 'dark' || savedTheme === 'light') root.dataset.theme = savedTheme;

  const refreshThemeControls = () => {
    const dark = root.dataset.theme === 'dark';
    themeButtons.forEach(button => button.setAttribute('aria-label', dark ? 'Switch to light theme' : 'Switch to dark theme'));
    document.querySelector('meta[name="theme-color"]')?.setAttribute('content', dark ? '#121713' : '#f8f8f5');
  };
  refreshThemeControls();
  themeButtons.forEach(button => button.addEventListener('click', () => {
    root.dataset.theme = root.dataset.theme === 'dark' ? 'light' : 'dark';
    localStorage.setItem('snake-theme', root.dataset.theme);
    refreshThemeControls();
  }));

  document.querySelectorAll('.menu-toggle').forEach(button => button.addEventListener('click', () => {
    const links = document.getElementById(button.getAttribute('aria-controls'));
    const open = button.getAttribute('aria-expanded') !== 'true';
    button.setAttribute('aria-expanded', String(open));
    button.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
    links?.classList.toggle('is-open', open);
  }));

  document.querySelectorAll('[data-copy]').forEach(button => button.addEventListener('click', async () => {
    const target = document.getElementById(button.dataset.copy);
    if (!target) return;
    const text = target.innerText;
    const label = button.querySelector('span');
    try {
      await navigator.clipboard.writeText(text);
      if (label) label.textContent = 'Copied';
      button.setAttribute('aria-label', 'Code copied');
    } catch {
      const selection = window.getSelection();
      const range = document.createRange();
      range.selectNodeContents(target);
      selection.removeAllRanges(); selection.addRange(range);
      if (label) label.textContent = 'Select & copy';
    }
    window.setTimeout(() => { if (label) label.textContent = 'Copy'; button.setAttribute('aria-label', 'Copy code'); }, 1800);
  }));

  document.querySelectorAll('[data-year]').forEach(node => node.textContent = new Date().getFullYear());
})();
