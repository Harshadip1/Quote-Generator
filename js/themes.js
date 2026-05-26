/* Theme Management */
const THEMES = ['default', 'ocean', 'sunset', 'forest', 'midnight', 'light'];

function initTheme() {
  const saved = localStorage.getItem('inspirehub_theme') || 'default';
  applyTheme(saved);
}

function applyTheme(theme) {
  if (theme === 'default') {
    document.documentElement.removeAttribute('data-theme');
  } else {
    document.documentElement.setAttribute('data-theme', theme);
  }
  localStorage.setItem('inspirehub_theme', theme);

  document.querySelectorAll('[data-theme-option]').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.themeOption === theme);
  });
}

function setupThemeControls() {
  document.querySelectorAll('[data-theme-option]').forEach(btn => {
    btn.addEventListener('click', () => applyTheme(btn.dataset.themeOption));
  });
}

document.addEventListener('DOMContentLoaded', initTheme);
