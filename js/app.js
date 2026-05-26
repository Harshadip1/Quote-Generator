/* Main Application */
const NAV_SECTIONS = [
  {
    title: 'Main',
    links: [
      { href: 'index.html', icon: '🏠', label: 'Home' },
      { href: 'daily.html', icon: '☀️', label: 'Daily Quote' },
      { href: 'trending.html', icon: '📈', label: 'Trending' },
      { href: 'categories.html', icon: '📂', label: 'Categories' },
      { href: 'mood.html', icon: '🎭', label: 'Mood Quotes' },
      { href: 'search.html', icon: '🔍', label: 'Search' }
    ]
  },
  {
    title: 'Categories',
    links: [
      { href: 'motivational.html', icon: '🔥', label: 'Motivation' },
      { href: 'success.html', icon: '🏆', label: 'Success' },
      { href: 'love.html', icon: '❤️', label: 'Love' },
      { href: 'fitness.html', icon: '💪', label: 'Fitness' },
      { href: 'study.html', icon: '📚', label: 'Study' },
      { href: 'business.html', icon: '💼', label: 'Business' },
      { href: 'leadership.html', icon: '👑', label: 'Leadership' },
      { href: 'spiritual.html', icon: '🕊️', label: 'Spiritual' },
      { href: 'funny.html', icon: '😂', label: 'Funny' },
      { href: 'sad.html', icon: '🌧️', label: 'Sad' }
    ]
  },
  {
    title: 'Features',
    links: [
      { href: 'favorites.html', icon: '❤️', label: 'Favorites' },
      { href: 'collections.html', icon: '📁', label: 'Collections' },
      { href: 'wallpapers.html', icon: '🖼️', label: 'Wallpapers' },
      { href: 'share.html', icon: '📤', label: 'Share' },
      { href: 'audio.html', icon: '🎧', label: 'Audio Quotes' },
      { href: 'ai-generator.html', icon: '🤖', label: 'AI Generator' },
      { href: 'community.html', icon: '👥', label: 'Community' }
    ]
  },
  {
    title: 'Account',
    links: [
      { href: 'profile.html', icon: '👤', label: 'Profile' },
      { href: 'analytics.html', icon: '📊', label: 'Analytics' },
      { href: 'notifications.html', icon: '🔔', label: 'Notifications' },
      { href: 'settings.html', icon: '⚙️', label: 'Settings' },
      { href: 'about.html', icon: 'ℹ️', label: 'About' },
      { href: 'contact.html', icon: '📧', label: 'Contact' }
    ]
  }
];

function getCurrentPage() {
  return window.location.pathname.split('/').pop() || 'index.html';
}

function renderSidebar() {
  const sidebar = document.getElementById('sidebar');
  if (!sidebar) return;

  const current = getCurrentPage();
  const navHtml = NAV_SECTIONS.map(section => `
    <div class="nav-section">
      <div class="nav-section-title">${section.title}</div>
      ${section.links.map(link => `
        <a href="${link.href}" class="nav-link ${current === link.href ? 'active' : ''}">
          <span class="icon">${link.icon}</span>
          <span>${link.label}</span>
        </a>
      `).join('')}
    </div>
  `).join('');

  sidebar.innerHTML = `
    <div class="sidebar-header">
      <a href="index.html" class="logo">
        <div class="logo-icon">✦</div>
        <span>InspireHub</span>
      </a>
    </div>
    <nav class="sidebar-nav">${navHtml}</nav>
    <div class="sidebar-footer">
      <div class="progress-bar mb-2"><div class="progress-fill" style="width: ${Math.min(getStreak() * 10, 100)}%"></div></div>
      <small class="text-muted">🔥 ${getStreak()} day streak</small>
    </div>
  `;
}

function renderQuoteCard(quote) {
  const fav = isFavorite(quote.id);
  return `
    <article class="quote-card reveal" data-id="${quote.id}">
      <p class="quote-preview">"${quote.text}"</p>
      <div class="quote-card-footer">
        <div>
          <strong class="text-accent">— ${quote.author}</strong>
          <div class="quote-tags mt-1">
            <span class="tag">${quote.category}</span>
          </div>
        </div>
        <div class="quote-card-actions">
          <button class="action-btn favorite-btn ${fav ? 'active' : ''}" data-id="${quote.id}" title="Favorite">❤️</button>
          <button class="action-btn share-btn" data-id="${quote.id}" title="Share">📤</button>
          <a href="quote-details.html?id=${quote.id}" class="action-btn" title="View">👁️</a>
        </div>
      </div>
    </article>
  `;
}

function attachQuoteCardListeners(container) {
  if (!container) return;
  container.querySelectorAll('.favorite-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const id = parseInt(btn.dataset.id, 10);
      const isFav = toggleFavorite(id);
      btn.classList.toggle('active', isFav);
    });
  });
  container.querySelectorAll('.share-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const quote = getQuoteById(btn.dataset.id);
      if (quote) copyToClipboard(`"${quote.text}" — ${quote.author}`);
    });
  });
  container.querySelectorAll('.quote-card').forEach(card => {
    card.addEventListener('click', (e) => {
      if (!e.target.closest('.action-btn')) {
        window.location.href = `quote-details.html?id=${card.dataset.id}`;
      }
    });
  });
}

function renderCategoriesGrid(containerId) {
  const container = document.getElementById(containerId);
  if (!container) return;
  container.innerHTML = QUOTE_CATEGORIES.map(cat => `
    <a href="${cat.page}" class="category-card reveal">
      <div class="category-icon">${cat.icon}</div>
      <div class="category-name">${cat.name}</div>
      <div class="category-count">${cat.count} quotes</div>
    </a>
  `).join('');
}

function renderQuotesByCategory(category, containerId) {
  const container = document.getElementById(containerId);
  if (!container) return;
  const quotes = getQuotesByCategory(category);
  container.innerHTML = quotes.length
    ? quotes.map(q => renderQuoteCard(q)).join('')
  : `<div class="empty-state"><div class="empty-icon">📝</div><h3>No quotes yet</h3></div>`;
  attachQuoteCardListeners(container);
}

function initDailyQuote() {
  const textEl = document.getElementById('daily-quote-text');
  const authorEl = document.getElementById('daily-quote-author');
  const tagsEl = document.getElementById('daily-quote-tags');
  if (!textEl) return;

  let currentQuote = getDailyQuote();
  function displayQuote(quote, animate = false) {
    if (animate) {
      textEl.classList.add('fade-out');
      setTimeout(() => {
        textEl.textContent = `"${quote.text}"`;
        authorEl.textContent = `— ${quote.author}`;
        tagsEl.innerHTML = `<span class="tag">${quote.category}</span><span class="tag">${quote.mood}</span>`;
        textEl.classList.remove('fade-out');
      }, 300);
    } else {
      textEl.textContent = `"${quote.text}"`;
      authorEl.textContent = `— ${quote.author}`;
      tagsEl.innerHTML = `<span class="tag">${quote.category}</span><span class="tag">${quote.mood}</span>`;
    }
    currentQuote = quote;
    updateStreak();
  }

  displayQuote(currentQuote);

  document.getElementById('new-quote-btn')?.addEventListener('click', () => {
    displayQuote(getRandomQuote(), true);
  });

  document.getElementById('save-daily-btn')?.addEventListener('click', () => {
    toggleFavorite(currentQuote.id);
  });

  const timerEl = document.getElementById('quote-timer');
  if (timerEl) {
    function updateTimer() {
      const now = new Date();
      const midnight = new Date(now);
      midnight.setHours(24, 0, 0, 0);
      const diff = midnight - now;
      const h = Math.floor(diff / 3600000);
      const m = Math.floor((diff % 3600000) / 60000);
      const s = Math.floor((diff % 60000) / 1000);
      timerEl.textContent = `${String(h).padStart(2,'0')}:${String(m).padStart(2,'0')}:${String(s).padStart(2,'0')}`;
    }
    updateTimer();
    setInterval(updateTimer, 1000);
  }
}

function initMoodQuotes() {
  const moodGrid = document.getElementById('mood-selector');
  const quotesContainer = document.getElementById('mood-quotes');
  if (!moodGrid) return;

  moodGrid.innerHTML = MOODS.map(m => `
    <button class="mood-btn" data-mood="${m.id}">
      <span class="mood-emoji">${m.emoji}</span>
      <span>${m.name}</span>
    </button>
  `).join('');

  function showMoodQuotes(moodId) {
    recordMood(moodId);
    const quotes = getQuotesByMood(moodId);
    if (quotesContainer) {
      quotesContainer.innerHTML = quotes.map(q => renderQuoteCard(q)).join('');
      attachQuoteCardListeners(quotesContainer);
    }
  }

  moodGrid.querySelectorAll('.mood-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      moodGrid.querySelectorAll('.mood-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      showMoodQuotes(btn.dataset.mood);
    });
  });

  showMoodQuotes('happy');
  moodGrid.querySelector('[data-mood="happy"]')?.classList.add('active');
}

function initQuoteDetails() {
  const params = new URLSearchParams(window.location.search);
  const id = params.get('id');
  if (!id) return;

  const quote = getQuoteById(id);
  if (!quote) return;

  const textEl = document.getElementById('detail-quote-text');
  const authorEl = document.getElementById('detail-quote-author');
  const tagsEl = document.getElementById('detail-quote-tags');
  const likesEl = document.getElementById('detail-likes');

  if (textEl) textEl.textContent = `"${quote.text}"`;
  if (authorEl) authorEl.textContent = quote.author;
  if (tagsEl) tagsEl.innerHTML = `<span class="tag">${quote.category}</span><span class="tag">${quote.mood}</span>`;
  if (likesEl) likesEl.textContent = quote.likes.toLocaleString();

  document.getElementById('detail-fav-btn')?.addEventListener('click', function() {
    const isFav = toggleFavorite(quote.id);
    this.classList.toggle('active', isFav);
  });

  document.getElementById('detail-share-btn')?.addEventListener('click', () => {
    copyToClipboard(`"${quote.text}" — ${quote.author}`);
  });

  const related = document.getElementById('related-quotes');
  if (related) {
    const relatedQuotes = QUOTES_DB.filter(q => q.category === quote.category && q.id !== quote.id).slice(0, 3);
    related.innerHTML = relatedQuotes.map(q => renderQuoteCard(q)).join('');
    attachQuoteCardListeners(related);
  }
}

function initFavoritesPage() {
  const container = document.getElementById('favorites-list');
  if (!container) return;
  const quotes = getFavoriteQuotes();
  container.innerHTML = quotes.length
    ? quotes.map(q => renderQuoteCard(q)).join('')
    : `<div class="empty-state"><div class="empty-icon">❤️</div><h3>No favorites yet</h3><p>Save quotes you love to see them here</p><a href="daily.html" class="btn btn-primary mt-2">Explore Quotes</a></div>`;
  attachQuoteCardListeners(container);
}

function initCollectionsPage() {
  const container = document.getElementById('collections-list');
  if (!container) return;
  const collections = getCollections();

  if (!collections.length) {
    container.innerHTML = `
      <div class="empty-state reveal">
        <div class="empty-icon">📁</div>
        <h3>No collections yet</h3>
        <p>Create collections to organize your favorite quotes</p>
      </div>
    `;
  } else {
    container.innerHTML = collections.map(col => `
      <div class="glass-card reveal mb-2">
        <div class="flex justify-between items-center mb-2">
          <h3>📁 ${col.name}</h3>
          <span class="text-muted">${col.quotes.length} quotes</span>
        </div>
        <div class="quotes-grid">
          ${col.quotes.slice(0, 3).map(id => {
            const q = getQuoteById(id);
            return q ? `<p class="text-muted">"${q.text.substring(0, 60)}..."</p>` : '';
          }).join('')}
        </div>
      </div>
    `).join('');
  }

  document.getElementById('create-collection-btn')?.addEventListener('click', () => {
    const name = prompt('Collection name:');
    if (name) createCollection(name);
    initCollectionsPage();
  });
}

function initCommunityFeed() {
  const container = document.getElementById('community-feed');
  if (!container) return;
  container.innerHTML = COMMUNITY_POSTS.map(post => `
    <div class="feed-card reveal">
      <div class="feed-header">
        <div class="avatar">${post.avatar}</div>
        <div>
          <strong>${post.user}</strong>
          <div class="text-muted" style="font-size:0.8rem">${post.time}</div>
        </div>
      </div>
      <p style="font-size:1.1rem;line-height:1.7">"${post.text}"</p>
      <div class="feed-actions">
        <span class="feed-action like-action" data-id="${post.id}">❤️ ${post.likes}</span>
        <span class="feed-action">💬 ${post.comments}</span>
        <span class="feed-action">📤 Share</span>
        <span class="feed-action">🔖 Save</span>
      </div>
    </div>
  `).join('');

  container.querySelectorAll('.like-action').forEach(el => {
    el.addEventListener('click', function() {
      this.classList.toggle('liked');
      const count = parseInt(this.textContent.match(/\d+/)[0], 10);
      this.innerHTML = this.classList.contains('liked') ? `❤️ ${count + 1}` : `❤️ ${count}`;
    });
  });
}

function initNotifications() {
  const container = document.getElementById('notifications-list');
  if (!container) return;
  container.innerHTML = NOTIFICATIONS_DATA.map(n => `
    <div class="notification-item ${n.unread ? 'unread' : ''} reveal">
      <div class="notification-icon" style="background:rgba(124,58,237,0.2)">${n.icon}</div>
      <div>
        <strong>${n.title}</strong>
        <p class="text-muted" style="font-size:0.9rem">${n.message}</p>
        <small class="text-muted">${n.time}</small>
      </div>
    </div>
  `).join('');
}

function initProfile() {
  const favCount = document.getElementById('profile-fav-count');
  const streakEl = document.getElementById('profile-streak');
  const readEl = document.getElementById('profile-read-count');
  if (favCount) favCount.textContent = getFavorites().length;
  if (streakEl) streakEl.textContent = getStreak();
  if (readEl) readEl.textContent = getReadCount();

  const achievements = document.getElementById('achievements-grid');
  if (achievements) {
    achievements.innerHTML = ACHIEVEMENTS.map(a => `
      <div class="achievement-badge ${a.unlocked ? '' : 'locked'} reveal">
        <div style="font-size:2rem">${a.icon}</div>
        <small>${a.name}</small>
      </div>
    `).join('');
  }
}

function initHomePage() {
  const dailyCard = document.getElementById('home-daily-quote');
  if (dailyCard) {
    const q = getDailyQuote();
    dailyCard.innerHTML = `
      <p class="quote-text">"${q.text}"</p>
      <p class="quote-author">— ${q.author}</p>
      <div class="quote-tags"><span class="tag">${q.category}</span></div>
    `;
  }

  const trending = document.getElementById('home-trending');
  if (trending) {
    trending.innerHTML = getTrendingQuotes().slice(0, 6).map(q => renderQuoteCard(q)).join('');
    attachQuoteCardListeners(trending);
  }

  const categories = document.getElementById('home-categories');
  if (categories) {
    categories.innerHTML = QUOTE_CATEGORIES.slice(0, 8).map(cat => `
      <a href="${cat.page}" class="category-card reveal">
        <div class="category-icon">${cat.icon}</div>
        <div class="category-name">${cat.name}</div>
      </a>
    `).join('');
  }

  const authors = document.getElementById('home-authors');
  if (authors) {
    authors.innerHTML = AUTHORS.slice(0, 8).map(a => `
      <div class="glass-card text-center reveal" style="padding:1rem">
        <div class="avatar" style="margin:0 auto 0.5rem;width:48px;height:48px;font-size:1rem">${a.split(' ').map(n=>n[0]).join('').slice(0,2)}</div>
        <strong style="font-size:0.85rem">${a}</strong>
      </div>
    `).join('');
  }
}

function initTrending() {
  const container = document.getElementById('trending-quotes');
  if (!container) return;
  container.innerHTML = getTrendingQuotes().map(q => renderQuoteCard(q)).join('');
  attachQuoteCardListeners(container);
}

function initCategoriesPage() {
  renderCategoriesGrid('all-categories');
}

function initAIGenerator() {
  const generateBtn = document.getElementById('ai-generate-btn');
  const output = document.getElementById('ai-output');
  const cards = document.getElementById('ai-cards');

  const demoQuotes = [
    'Your potential is limitless when you choose courage over comfort.',
    'Every setback is a setup for a greater comeback.',
    'The universe rewards those who persist with unwavering faith.',
    'Transform your wounds into wisdom and your pain into power.'
  ];

  generateBtn?.addEventListener('click', () => {
    const prompt = document.getElementById('ai-prompt')?.value || 'motivation';
    output.innerHTML = '<p class="typing-cursor">Generating your personalized quote</p>';
    generateBtn.disabled = true;

    setTimeout(() => {
      const quote = demoQuotes[Math.floor(Math.random() * demoQuotes.length)];
      output.innerHTML = `<p class="quote-text">"${quote}"</p><p class="quote-author mt-2">— AI Inspired</p><p class="text-muted mt-1">Based on: "${prompt}"</p>`;
      generateBtn.disabled = false;

      if (cards) {
        const card = document.createElement('div');
        card.className = 'ai-card reveal';
        card.innerHTML = `<p>"${quote}"</p><small class="text-muted">Just generated</small>`;
        cards.prepend(card);
      }
    }, 2000);
  });
}

function copyToClipboard(text) {
  navigator.clipboard?.writeText(text).then(() => showToast('Copied to clipboard!', '📋'))
    .catch(() => showToast('Copy failed', '⚠️'));
}

function showToast(message, icon = '✓') {
  let container = document.querySelector('.toast-container');
  if (!container) {
    container = document.createElement('div');
    container.className = 'toast-container';
    document.body.appendChild(container);
  }
  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.innerHTML = `<span>${icon}</span><span>${message}</span>`;
  container.appendChild(toast);
  setTimeout(() => toast.remove(), 3000);
}

function initParticles() {
  const container = document.getElementById('particles');
  if (!container) return;
  for (let i = 0; i < 30; i++) {
    const p = document.createElement('div');
    p.className = 'particle';
    p.style.left = `${Math.random() * 100}%`;
    p.style.top = `${Math.random() * 100}%`;
    p.style.animationDelay = `${Math.random() * 15}s`;
    p.style.animationDuration = `${10 + Math.random() * 10}s`;
    container.appendChild(p);
  }
}

function initScrollReveal() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) entry.target.classList.add('visible');
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

  const observe = () => document.querySelectorAll('.reveal:not(.visible)').forEach(el => observer.observe(el));
  observe();
  new MutationObserver(observe).observe(document.body, { childList: true, subtree: true });
}

function initSidebarToggle() {
  const toggle = document.getElementById('menu-toggle');
  const sidebar = document.getElementById('sidebar');
  const overlay = document.getElementById('sidebar-overlay');

  toggle?.addEventListener('click', () => {
    sidebar?.classList.toggle('open');
    overlay?.classList.toggle('active');
  });

  overlay?.addEventListener('click', () => {
    sidebar?.classList.remove('open');
    overlay?.classList.remove('active');
  });
}

function initOnboarding() {
  if (localStorage.getItem('inspirehub_onboarded')) return;
  const overlay = document.createElement('div');
  overlay.className = 'onboarding-overlay';
  overlay.innerHTML = `
    <div class="onboarding-card">
      <div style="font-size:3rem;margin-bottom:1rem">✦</div>
      <h2>Welcome to InspireHub</h2>
      <p class="text-muted mt-2">Your premium quote & motivation platform. Discover daily inspiration, save favorites, and track your journey.</p>
      <div class="onboarding-steps">
        <span class="onboarding-step active"></span>
        <span class="onboarding-step"></span>
        <span class="onboarding-step"></span>
      </div>
      <button class="btn btn-primary btn-lg" id="onboarding-start">Get Started</button>
    </div>
  `;
  document.body.appendChild(overlay);
  document.getElementById('onboarding-start')?.addEventListener('click', () => {
    localStorage.setItem('inspirehub_onboarded', 'true');
    overlay.remove();
  });
}

function initPageTransition() {
  document.body.classList.add('page-loading');
  window.addEventListener('load', () => {
    document.body.classList.remove('page-loading');
    document.body.classList.add('page-loaded');
  });
}

function initSharePage() {
  document.getElementById('share-copy-btn')?.addEventListener('click', () => {
    copyToClipboard('"The only way to do great work is to love what you do." — Steve Jobs');
  });
}

document.addEventListener('DOMContentLoaded', () => {
  renderSidebar();
  initSharePage();
  initSidebarToggle();
  initParticles();
  initScrollReveal();
  initPageTransition();
  initOnboarding();
  initHomePage();
  initDailyQuote();
  initMoodQuotes();
  initQuoteDetails();
  initFavoritesPage();
  initCollectionsPage();
  initCommunityFeed();
  initNotifications();
  initProfile();
  initTrending();
  initCategoriesPage();
  initAIGenerator();

  const pageCategory = document.body.dataset.category;
  if (pageCategory) renderQuotesByCategory(pageCategory, 'category-quotes');
});
