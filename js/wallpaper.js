/* Wallpaper Creator */
const WALLPAPER_GRADIENTS = [
  'linear-gradient(135deg, #7C3AED, #06B6D4)',
  'linear-gradient(135deg, #F43F5E, #FB923C)',
  'linear-gradient(135deg, #10B981, #84CC16)',
  'linear-gradient(135deg, #6366F1, #8B5CF6)',
  'linear-gradient(135deg, #0F172A, #7C3AED)',
  'linear-gradient(135deg, #06B6D4, #3B82F6)',
  'linear-gradient(180deg, #1E293B 0%, #7C3AED 100%)',
  'linear-gradient(45deg, #EC4899, #8B5CF6, #06B6D4)'
];

const WALLPAPER_FONTS = [
  { name: 'Modern', family: 'Segoe UI, sans-serif' },
  { name: 'Elegant', family: 'Georgia, serif' },
  { name: 'Bold', family: 'Impact, sans-serif' },
  { name: 'Classic', family: 'Times New Roman, serif' }
];

function initWallpaperCreator() {
  const preview = document.getElementById('wallpaper-preview');
  const quoteInput = document.getElementById('wallpaper-quote');
  const authorInput = document.getElementById('wallpaper-author');
  const fontSize = document.getElementById('wallpaper-font-size');
  const fontSizeVal = document.getElementById('font-size-value');

  if (!preview) return;

  let currentGradient = WALLPAPER_GRADIENTS[0];
  let currentFont = WALLPAPER_FONTS[0].family;

  const q = getDailyQuote();
  if (quoteInput) quoteInput.value = q.text;
  if (authorInput) authorInput.value = q.author;

  function updatePreview() {
    const quote = quoteInput?.value || 'Your quote here';
    const author = authorInput?.value || 'Author';
    const size = fontSize?.value || 24;

    preview.style.background = currentGradient;
    preview.style.fontFamily = currentFont;
    preview.innerHTML = `
      <div class="preview-quote" style="font-size:${size}px">"${quote}"</div>
      <p style="margin-top:1rem;opacity:0.8;font-size:${size * 0.6}px">— ${author}</p>
    `;
    if (fontSizeVal) fontSizeVal.textContent = `${size}px`;
  }

  quoteInput?.addEventListener('input', updatePreview);
  authorInput?.addEventListener('input', updatePreview);
  fontSize?.addEventListener('input', updatePreview);

  const colorsContainer = document.getElementById('gradient-colors');
  if (colorsContainer) {
    colorsContainer.innerHTML = WALLPAPER_GRADIENTS.map((g, i) => `
      <div class="color-swatch ${i === 0 ? 'active' : ''}" style="background:${g}" data-index="${i}"></div>
    `).join('');

    colorsContainer.querySelectorAll('.color-swatch').forEach(swatch => {
      swatch.addEventListener('click', () => {
        colorsContainer.querySelectorAll('.color-swatch').forEach(s => s.classList.remove('active'));
        swatch.classList.add('active');
        currentGradient = WALLPAPER_GRADIENTS[parseInt(swatch.dataset.index, 10)];
        updatePreview();
      });
    });
  }

  const fontsContainer = document.getElementById('font-options');
  if (fontsContainer) {
    fontsContainer.innerHTML = WALLPAPER_FONTS.map((f, i) => `
      <button class="tab-btn ${i === 0 ? 'active' : ''}" data-font="${f.family}">${f.name}</button>
    `).join('');

    fontsContainer.querySelectorAll('.tab-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        fontsContainer.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        currentFont = btn.dataset.font;
        updatePreview();
      });
    });
  }

  document.getElementById('download-wallpaper')?.addEventListener('click', () => {
    showToast('Wallpaper saved! (Demo mode)', '🖼️');
  });

  document.getElementById('random-wallpaper-quote')?.addEventListener('click', () => {
    const rq = getRandomQuote();
    if (quoteInput) quoteInput.value = rq.text;
    if (authorInput) authorInput.value = rq.author;
    updatePreview();
  });

  updatePreview();
}

document.addEventListener('DOMContentLoaded', initWallpaperCreator);
