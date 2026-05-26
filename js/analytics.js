/* Analytics Dashboard */
function initAnalytics() {
  const favCount = getFavorites().length;
  const streak = getStreak();
  const readCount = getReadCount();
  const collections = getCollections().length;

  animateCounter('stat-favorites', favCount);
  animateCounter('stat-streak', streak);
  animateCounter('stat-read', readCount);
  animateCounter('stat-collections', collections);

  renderCategoryChart();
  renderMoodChart();
  renderActivityChart();
  renderProgressWidgets();
}

function animateCounter(elementId, target) {
  const el = document.getElementById(elementId);
  if (!el) return;
  let current = 0;
  const duration = 1500;
  const step = target / (duration / 16);
  const timer = setInterval(() => {
    current += step;
    if (current >= target) {
      el.textContent = target;
      clearInterval(timer);
    } else {
      el.textContent = Math.floor(current);
    }
  }, 16);
}

function renderCategoryChart() {
  const container = document.getElementById('category-chart');
  if (!container) return;

  const categoryCounts = {};
  getFavorites().forEach(id => {
    const q = getQuoteById(id);
    if (q) categoryCounts[q.category] = (categoryCounts[q.category] || 0) + 1;
  });

  const defaults = { motivation: 5, success: 4, love: 3, life: 6, fitness: 2 };
  const data = Object.keys({ ...defaults, ...categoryCounts }).slice(0, 6);
  const values = data.map(k => categoryCounts[k] || defaults[k] || 2);
  const max = Math.max(...values, 1);

  container.innerHTML = `
    <div class="bar-chart">
      ${data.map((cat, i) => `
        <div class="bar" style="height: ${(values[i] / max) * 100}%" title="${cat}: ${values[i]}">
          <span class="bar-label">${cat.slice(0, 4)}</span>
        </div>
      `).join('')}
    </div>
  `;
}

function renderMoodChart() {
  const container = document.getElementById('mood-chart');
  if (!container) return;

  const moodData = getMoodAnalytics();
  const defaults = { happy: 12, motivated: 18, calm: 8, focused: 10, energetic: 7, sad: 3 };
  const merged = { ...defaults, ...moodData };
  const total = Object.values(merged).reduce((a, b) => a + b, 0) || 1;

  const moods = Object.entries(merged).slice(0, 5);
  const primaryPercent = Math.round((moods[0]?.[1] || 0) / total * 100) || 65;

  container.innerHTML = `
    <div class="circular-chart">
      <svg width="150" height="150" viewBox="0 0 150 150">
        <circle cx="75" cy="75" r="60" fill="none" stroke="var(--bg-secondary)" stroke-width="12"/>
        <circle cx="75" cy="75" r="60" fill="none" stroke="url(#gradient)" stroke-width="12"
          stroke-dasharray="${primaryPercent * 3.77} 377" stroke-linecap="round"/>
        <defs>
          <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stop-color="var(--primary)"/>
            <stop offset="100%" stop-color="var(--accent)"/>
          </linearGradient>
        </defs>
      </svg>
      <div class="chart-value">${primaryPercent}%</div>
    </div>
    <div class="mt-2">
      ${moods.map(([mood, count]) => `
        <div class="flex justify-between mb-1" style="font-size:0.85rem">
          <span>${mood}</span>
          <span class="text-muted">${count}</span>
        </div>
      `).join('')}
    </div>
  `;
}

function renderActivityChart() {
  const container = document.getElementById('activity-chart');
  if (!container) return;

  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  const activity = [4, 7, 5, 9, 6, 3, 8];
  const max = Math.max(...activity);

  container.innerHTML = `
    <div class="bar-chart">
      ${days.map((day, i) => `
        <div class="bar" style="height: ${(activity[i] / max) * 100}%">
          <span class="bar-label">${day}</span>
        </div>
      `).join('')}
    </div>
  `;
}

function renderProgressWidgets() {
  const widgets = document.getElementById('progress-widgets');
  if (!widgets) return;

  const streak = getStreak();
  const goals = [
    { label: 'Daily Reading Goal', current: Math.min(streak, 7), target: 7, icon: '📖' },
    { label: 'Favorites Collection', current: getFavorites().length, target: 20, icon: '❤️' },
    { label: 'Categories Explored', current: 8, target: 12, icon: '📂' },
    { label: 'Share Quotes', current: 3, target: 10, icon: '📤' }
  ];

  widgets.innerHTML = goals.map(g => {
    const pct = Math.min((g.current / g.target) * 100, 100);
    return `
      <div class="glass-card reveal">
        <div class="flex justify-between items-center mb-2">
          <span>${g.icon} ${g.label}</span>
          <span class="text-accent">${g.current}/${g.target}</span>
        </div>
        <div class="progress-bar"><div class="progress-fill" style="width:${pct}%"></div></div>
      </div>
    `;
  }).join('');
}

document.addEventListener('DOMContentLoaded', initAnalytics);
