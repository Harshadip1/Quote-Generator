/* Search Functionality */
function initSearch() {
  const searchInputs = document.querySelectorAll('.search-bar input, #global-search');
  searchInputs.forEach(input => {
    input.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        const query = input.value.trim();
        if (query) {
          window.location.href = `search.html?q=${encodeURIComponent(query)}`;
        }
      }
    });
  });

  const suggestionsEl = document.getElementById('search-suggestions');
  if (suggestionsEl) {
    const suggestions = ['motivation', 'success', 'love', 'happiness', 'Steve Jobs', 'dream', 'courage', 'peace'];
    suggestionsEl.innerHTML = suggestions.map(s =>
      `<button class="tab-btn" onclick="location.href='search.html?q=${encodeURIComponent(s)}'">${s}</button>`
    ).join('');
  }
}

function renderSearchResults() {
  const container = document.getElementById('search-results');
  if (!container) return;

  const params = new URLSearchParams(window.location.search);
  const query = params.get('q') || '';
  const queryDisplay = document.getElementById('search-query-display');
  if (queryDisplay) queryDisplay.textContent = query || 'all quotes';

  const searchInput = document.getElementById('search-page-input');
  if (searchInput) searchInput.value = query;

  const results = query ? searchQuotes(query) : QUOTES_DB.slice(0, 12);
  container.innerHTML = results.length
    ? results.map(q => renderQuoteCard(q)).join('')
    : `<div class="empty-state"><div class="empty-icon">🔍</div><h3>No quotes found</h3><p>Try different keywords</p></div>`;

  attachQuoteCardListeners(container);
}

document.addEventListener('DOMContentLoaded', () => {
  initSearch();
  if (document.getElementById('search-results')) renderSearchResults();
});
