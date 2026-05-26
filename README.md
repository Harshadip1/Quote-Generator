# InspireHub — Quote Generator & Motivation Platform

A premium, futuristic quote and motivation platform built with **HTML5**, **CSS3**, and **Vanilla JavaScript**. Features glassmorphism UI, smooth animations, mood-based quotes, favorites, collections, wallpaper creator, analytics dashboard, and 30+ fully navigable pages.

![Platform](https://img.shields.io/badge/Pages-30%2B-7C3AED)
![Tech](https://img.shields.io/badge/Tech-HTML%20CSS%20JS-06B6D4)
![License](https://img.shields.io/badge/License-MIT-22C55E)

---

## Features

| Feature | Description |
|---------|-------------|
| **Daily Quotes** | Quote of the day with countdown timer and random quote button |
| **12+ Categories** | Motivation, Success, Love, Fitness, Study, Business, and more |
| **Favorites** | Save quotes with LocalStorage persistence |
| **Collections** | Organize quotes into custom bookmark folders |
| **Mood-Based Quotes** | 7 moods — Happy, Sad, Motivated, Calm, Focused, etc. |
| **Wallpaper Creator** | Live preview editor with gradients, fonts, and download UI |
| **Share Quotes** | Copy, social previews (Instagram/Twitter layouts) |
| **Audio Player** | Inspirational audio quotes UI with visualizer animation |
| **AI Generator** | Futuristic AI quote generator interface (frontend demo) |
| **Analytics Dashboard** | Streaks, charts, mood analytics, progress widgets |
| **Community Feed** | Social-style quote cards with likes and comments |
| **6 Themes** | Default, Ocean, Sunset, Forest, Midnight, Light |
| **Search** | Full-text search across quotes, authors, and categories |
| **Responsive** | Mobile, tablet, and desktop optimized |

---

## Technologies Used

- **HTML5** — Semantic markup, 30+ pages
- **CSS3** — Variables, Flexbox, Grid, animations, glassmorphism
- **Vanilla JavaScript** — Modular architecture, LocalStorage, Intersection Observer
- **No frameworks** — Zero dependencies, runs in any modern browser

---

## How to Run in VS Code

### Step 1: Install Visual Studio Code

Download and install [Visual Studio Code](https://code.visualstudio.com/) if you don't have it.

### Step 2: Open the Project Folder

1. Launch VS Code
2. Go to **File → Open Folder**
3. Select the `Quote Generator` folder

### Step 3: Install Live Server Extension

1. Open the Extensions panel (`Ctrl+Shift+X` / `Cmd+Shift+X`)
2. Search for **Live Server** by Ritwick Dey
3. Click **Install**

### Step 4: Launch the App

1. In the Explorer panel, locate `index.html`
2. **Right-click** on `index.html`
3. Select **"Open with Live Server"**
4. Your browser will open at `http://127.0.0.1:5500` (or similar)

> **Alternative:** Open `index.html` directly in Chrome, Firefox, or Edge. Live Server is recommended for best experience.

---

## Folder Structure

```
Quote Generator/
├── index.html              # Home page
├── daily.html              # Daily quote
├── trending.html           # Trending quotes
├── categories.html         # All categories
├── motivational.html       # Category pages
├── success.html
├── love.html
├── fitness.html
├── study.html
├── business.html
├── leadership.html
├── spiritual.html
├── funny.html
├── sad.html
├── mood.html               # Mood-based quotes
├── favorites.html          # Saved favorites
├── collections.html        # Quote collections
├── quote-details.html      # Single quote view
├── wallpapers.html         # Wallpaper creator
├── share.html              # Share quotes
├── notifications.html      # Notifications
├── profile.html            # User profile
├── analytics.html          # Analytics dashboard
├── settings.html           # Theme settings
├── about.html              # About platform
├── contact.html            # Contact form
├── search.html             # Search results
├── audio.html              # Audio quotes player
├── ai-generator.html       # AI quote generator UI
├── community.html          # Community feed
├── css/
│   ├── style.css           # Main styles
│   ├── themes.css          # Theme variables
│   └── responsive.css      # Responsive breakpoints
├── js/
│   ├── app.js              # Core app & navigation
│   ├── quotes.js           # Quote data store
│   ├── favorites.js        # Favorites & collections
│   ├── themes.js           # Theme switching
│   ├── analytics.js        # Dashboard charts
│   ├── wallpaper.js        # Wallpaper creator
│   ├── audio.js            # Audio player
│   └── search.js           # Search functionality
├── assets/
│   ├── images/
│   └── audio/
└── README.md
```

---

## Usage Guide

### Navigation
Use the **sidebar** to navigate between all 30+ pages. On mobile, tap the **☰ menu** button to open the sidebar.

### Saving Favorites
Click the **❤️** button on any quote card to save it. Favorites persist in your browser via LocalStorage.

### Creating Collections
Go to **Collections** → **Create Collection** → name your folder → add quotes from detail pages.

### Theme Customization
Open **Settings** and click a theme card. Your choice is saved automatically.

Edit CSS variables in `css/themes.css`:

```css
:root {
  --bg-primary: #0F172A;
  --primary: #7C3AED;
  --accent: #06B6D4;
}
```

### Wallpaper Generator
1. Go to **Wallpapers**
2. Edit quote text and author
3. Pick a gradient background and font style
4. Click **Download Wallpaper**

### Mood Quotes
Select a mood on the **Mood Quotes** page to filter matching quotes instantly.

---

## LocalStorage System

| Key | Purpose |
|-----|---------|
| `inspirehub_favorites` | Array of favorite quote IDs |
| `inspirehub_collections` | User-created quote collections |
| `inspirehub_streak` | Daily reading streak count |
| `inspirehub_theme` | Selected color theme |
| `inspirehub_mood_history` | Mood selection analytics |

Clear data: Open browser DevTools → Application → Local Storage → delete keys.

---

## Browser Compatibility

| Browser | Supported |
|---------|-----------|
| Chrome 90+ | ✅ |
| Firefox 88+ | ✅ |
| Safari 14+ | ✅ |
| Edge 90+ | ✅ |

Requires: CSS Grid, Flexbox, LocalStorage, Intersection Observer, CSS Variables.

---

## Troubleshooting

| Issue | Solution |
|-------|----------|
| Sidebar not visible on mobile | Tap the ☰ menu button in the header |
| Favorites not saving | Ensure cookies/storage aren't blocked; use `http://` not `file://` |
| Styles not loading | Verify `css/` folder path; use Live Server |
| Search returns nothing | Try keywords: "motivation", "success", "love" |
| Theme not applying | Clear cache; check `settings.html` theme buttons |

---

## Performance

- Efficient DOM updates with targeted rendering
- CSS animations use GPU-accelerated transforms
- Intersection Observer for scroll reveal (no scroll listeners)
- Reduced motion support via `prefers-reduced-motion`
- Minimal JavaScript — no external libraries

---

## License

MIT License — free to use, modify, and deploy.

---

**InspireHub** — *Discover inspiration every single day.* ✦
