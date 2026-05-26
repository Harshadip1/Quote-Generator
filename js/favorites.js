/* Favorites & Collections - LocalStorage */
const STORAGE_KEYS = {
  favorites: 'inspirehub_favorites',
  collections: 'inspirehub_collections',
  streak: 'inspirehub_streak',
  lastVisit: 'inspirehub_last_visit',
  moodHistory: 'inspirehub_mood_history',
  readCount: 'inspirehub_read_count',
  achievements: 'inspirehub_achievements'
};

function getFavorites() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEYS.favorites) || '[]');
  } catch { return []; }
}

function saveFavorites(favorites) {
  localStorage.setItem(STORAGE_KEYS.favorites, JSON.stringify(favorites));
}

function isFavorite(quoteId) {
  return getFavorites().includes(quoteId);
}

function toggleFavorite(quoteId) {
  let favorites = getFavorites();
  const index = favorites.indexOf(quoteId);
  if (index > -1) {
    favorites.splice(index, 1);
    showToast('Removed from favorites', '💔');
  } else {
    favorites.push(quoteId);
    showToast('Added to favorites', '❤️');
    updateStreak();
  }
  saveFavorites(favorites);
  return favorites.includes(quoteId);
}

function getCollections() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEYS.collections) || '[]');
  } catch { return []; }
}

function saveCollections(collections) {
  localStorage.setItem(STORAGE_KEYS.collections, JSON.stringify(collections));
}

function addToCollection(collectionName, quoteId) {
  let collections = getCollections();
  let collection = collections.find(c => c.name === collectionName);
  if (!collection) {
    collection = { name: collectionName, quotes: [], created: Date.now() };
    collections.push(collection);
  }
  if (!collection.quotes.includes(quoteId)) {
    collection.quotes.push(quoteId);
    showToast(`Added to "${collectionName}"`, '📁');
  }
  saveCollections(collections);
}

function createCollection(name) {
  const collections = getCollections();
  if (collections.some(c => c.name === name)) {
    showToast('Collection already exists', '⚠️');
    return false;
  }
  collections.push({ name, quotes: [], created: Date.now() });
  saveCollections(collections);
  showToast(`Created "${name}"`, '✅');
  return true;
}

function updateStreak() {
  const today = new Date().toDateString();
  const lastVisit = localStorage.getItem(STORAGE_KEYS.lastVisit);
  let streak = parseInt(localStorage.getItem(STORAGE_KEYS.streak) || '0', 10);

  if (lastVisit !== today) {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    if (lastVisit === yesterday.toDateString()) {
      streak++;
    } else if (lastVisit !== today) {
      streak = 1;
    }
    localStorage.setItem(STORAGE_KEYS.streak, streak.toString());
    localStorage.setItem(STORAGE_KEYS.lastVisit, today);
  }

  const readCount = parseInt(localStorage.getItem(STORAGE_KEYS.readCount) || '0', 10) + 1;
  localStorage.setItem(STORAGE_KEYS.readCount, readCount.toString());
}

function getStreak() {
  return parseInt(localStorage.getItem(STORAGE_KEYS.streak) || '0', 10);
}

function getReadCount() {
  return parseInt(localStorage.getItem(STORAGE_KEYS.readCount) || '0', 10);
}

function recordMood(mood) {
  let history = [];
  try {
    history = JSON.parse(localStorage.getItem(STORAGE_KEYS.moodHistory) || '[]');
  } catch { /* empty */ }
  history.push({ mood, date: Date.now() });
  if (history.length > 100) history = history.slice(-100);
  localStorage.setItem(STORAGE_KEYS.moodHistory, JSON.stringify(history));
}

function getMoodAnalytics() {
  try {
    const history = JSON.parse(localStorage.getItem(STORAGE_KEYS.moodHistory) || '[]');
    const counts = {};
    history.forEach(h => { counts[h.mood] = (counts[h.mood] || 0) + 1; });
    return counts;
  } catch { return {}; }
}

function getFavoriteQuotes() {
  return getFavorites().map(id => getQuoteById(id)).filter(Boolean);
}
