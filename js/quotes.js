/* Quote Data Store */
const QUOTE_CATEGORIES = [
  { id: 'motivation', name: 'Motivation', icon: '🔥', count: 48, page: 'motivational.html' },
  { id: 'success', name: 'Success', icon: '🏆', count: 42, page: 'success.html' },
  { id: 'love', name: 'Love', icon: '❤️', count: 36, page: 'love.html' },
  { id: 'fitness', name: 'Fitness', icon: '💪', count: 30, page: 'fitness.html' },
  { id: 'study', name: 'Study', icon: '📚', count: 28, page: 'study.html' },
  { id: 'business', name: 'Business', icon: '💼', count: 35, page: 'business.html' },
  { id: 'happiness', name: 'Happiness', icon: '😊', count: 32, page: 'categories.html' },
  { id: 'leadership', name: 'Leadership', icon: '👑', count: 27, page: 'leadership.html' },
  { id: 'spiritual', name: 'Spiritual', icon: '🕊️', count: 24, page: 'spiritual.html' },
  { id: 'funny', name: 'Funny', icon: '😂', count: 22, page: 'funny.html' },
  { id: 'sad', name: 'Sad', icon: '🌧️', count: 20, page: 'sad.html' },
  { id: 'life', name: 'Life', icon: '🌱', count: 40, page: 'categories.html' }
];

const MOODS = [
  { id: 'happy', name: 'Happy', emoji: '😊' },
  { id: 'sad', name: 'Sad', emoji: '😢' },
  { id: 'motivated', name: 'Motivated', emoji: '💪' },
  { id: 'calm', name: 'Calm', emoji: '🧘' },
  { id: 'focused', name: 'Focused', emoji: '🎯' },
  { id: 'heartbroken', name: 'Heartbroken', emoji: '💔' },
  { id: 'energetic', name: 'Energetic', emoji: '⚡' }
];

const AUTHORS = [
  'Marcus Aurelius', 'Rumi', 'Buddha', 'Einstein', 'Steve Jobs',
  'Maya Angelou', 'Confucius', 'Aristotle', 'Helen Keller', 'Oscar Wilde',
  'Nelson Mandela', 'Eleanor Roosevelt', 'Winston Churchill', 'Lao Tzu', 'Seneca'
];

const QUOTES_DB = [
  { id: 1, text: 'The only way to do great work is to love what you do.', author: 'Steve Jobs', category: 'motivation', mood: 'motivated', likes: 1240, trending: true },
  { id: 2, text: 'Success is not final, failure is not fatal: it is the courage to continue that counts.', author: 'Winston Churchill', category: 'success', mood: 'motivated', likes: 980, trending: true },
  { id: 3, text: 'Believe you can and you are halfway there.', author: 'Theodore Roosevelt', category: 'motivation', mood: 'motivated', likes: 856 },
  { id: 4, text: 'The best time to plant a tree was 20 years ago. The second best time is now.', author: 'Chinese Proverb', category: 'life', mood: 'motivated', likes: 720 },
  { id: 5, text: 'Love is composed of a single soul inhabiting two bodies.', author: 'Aristotle', category: 'love', mood: 'happy', likes: 654 },
  { id: 6, text: 'Take care of your body. It is the only place you have to live.', author: 'Jim Rohn', category: 'fitness', mood: 'energetic', likes: 590 },
  { id: 7, text: 'Education is the most powerful weapon which you can use to change the world.', author: 'Nelson Mandela', category: 'study', mood: 'focused', likes: 880 },
  { id: 8, text: 'The way to get started is to quit talking and begin doing.', author: 'Walt Disney', category: 'business', mood: 'motivated', likes: 745, trending: true },
  { id: 9, text: 'A leader is one who knows the way, goes the way, and shows the way.', author: 'John C. Maxwell', category: 'leadership', mood: 'focused', likes: 612 },
  { id: 10, text: 'Peace comes from within. Do not seek it without.', author: 'Buddha', category: 'spiritual', mood: 'calm', likes: 534 },
  { id: 11, text: 'I am so clever that sometimes I do not understand a single word of what I am saying.', author: 'Oscar Wilde', category: 'funny', mood: 'happy', likes: 890 },
  { id: 12, text: 'Tears are words that need to be written.', author: 'Paulo Coelho', category: 'sad', mood: 'sad', likes: 445 },
  { id: 13, text: 'Happiness is not something ready made. It comes from your own actions.', author: 'Dalai Lama', category: 'happiness', mood: 'happy', likes: 678 },
  { id: 14, text: 'You miss 100% of the shots you do not take.', author: 'Wayne Gretzky', category: 'motivation', mood: 'energetic', likes: 923 },
  { id: 15, text: 'The future belongs to those who believe in the beauty of their dreams.', author: 'Eleanor Roosevelt', category: 'success', mood: 'motivated', likes: 1102, trending: true },
  { id: 16, text: 'Where there is love there is life.', author: 'Mahatma Gandhi', category: 'love', mood: 'happy', likes: 567 },
  { id: 17, text: 'No pain, no gain. Shut up and train.', author: 'Unknown', category: 'fitness', mood: 'energetic', likes: 432 },
  { id: 18, text: 'Live as if you were to die tomorrow. Learn as if you were to live forever.', author: 'Mahatma Gandhi', category: 'study', mood: 'focused', likes: 789 },
  { id: 19, text: 'Innovation distinguishes between a leader and a follower.', author: 'Steve Jobs', category: 'business', mood: 'focused', likes: 834 },
  { id: 20, text: 'The greatest glory in living lies not in never falling, but in rising every time we fall.', author: 'Nelson Mandela', category: 'leadership', mood: 'motivated', likes: 956 },
  { id: 21, text: 'Silence is a source of great strength.', author: 'Lao Tzu', category: 'spiritual', mood: 'calm', likes: 398 },
  { id: 22, text: 'Life is what happens when you are busy making other plans.', author: 'John Lennon', category: 'funny', mood: 'happy', likes: 521 },
  { id: 23, text: 'Sometimes the heart sees what is invisible to the eye.', author: 'H. Jackson Brown Jr.', category: 'sad', mood: 'heartbroken', likes: 467 },
  { id: 24, text: 'Waste no more time arguing about what a good man should be. Be one.', author: 'Marcus Aurelius', category: 'life', mood: 'focused', likes: 623 },
  { id: 25, text: 'What lies behind us and what lies before us are tiny matters compared to what lies within us.', author: 'Ralph Waldo Emerson', category: 'motivation', mood: 'calm', likes: 712 },
  { id: 26, text: 'It does not matter how slowly you go as long as you do not stop.', author: 'Confucius', category: 'success', mood: 'motivated', likes: 845 },
  { id: 27, text: 'To love and be loved is to feel the sun from both sides.', author: 'David Viscott', category: 'love', mood: 'happy', likes: 589 },
  { id: 28, text: 'The body achieves what the mind believes.', author: 'Unknown', category: 'fitness', mood: 'energetic', likes: 678 },
  { id: 29, text: 'The more that you read, the more things you will know.', author: 'Dr. Seuss', category: 'study', mood: 'focused', likes: 445 },
  { id: 30, text: 'Opportunities do not happen. You create them.', author: 'Chris Grosser', category: 'business', mood: 'motivated', likes: 734 },
  { id: 31, text: 'Do not watch the clock; do what it does. Keep going.', author: 'Sam Levenson', category: 'motivation', mood: 'energetic', likes: 567 },
  { id: 32, text: 'He who has a why to live can bear almost any how.', author: 'Friedrich Nietzsche', category: 'life', mood: 'sad', likes: 489 },
  { id: 33, text: 'Your limitation is only your imagination.', author: 'Unknown', category: 'motivation', mood: 'motivated', likes: 892, trending: true },
  { id: 34, text: 'Push yourself, because no one else is going to do it for you.', author: 'Unknown', category: 'fitness', mood: 'energetic', likes: 756 },
  { id: 35, text: 'Great things never come from comfort zones.', author: 'Unknown', category: 'success', mood: 'motivated', likes: 934 },
  { id: 36, text: 'Dream it. Wish it. Do it.', author: 'Unknown', category: 'motivation', mood: 'energetic', likes: 823 },
  { id: 37, text: 'Success does not just find you. You have to go out and get it.', author: 'Unknown', category: 'business', mood: 'focused', likes: 612 },
  { id: 38, text: 'The harder you work for something, the greater you will feel when you achieve it.', author: 'Unknown', category: 'study', mood: 'focused', likes: 545 },
  { id: 39, text: 'Dream bigger. Do bigger.', author: 'Unknown', category: 'leadership', mood: 'motivated', likes: 478 },
  { id: 40, text: 'Do not stop when you are tired. Stop when you are done.', author: 'Unknown', category: 'fitness', mood: 'energetic', likes: 689 }
];

const COMMUNITY_POSTS = [
  { id: 1, user: 'QuoteExplorer', avatar: 'QE', text: 'Every morning is a chance to rewrite your story. Make today count!', likes: 234, comments: 18, time: '2h ago' },
  { id: 2, user: 'MindfulSoul', avatar: 'MS', text: 'Gratitude turns what we have into enough. Start your day with thankfulness.', likes: 189, comments: 12, time: '4h ago' },
  { id: 3, user: 'DreamChaser', avatar: 'DC', text: 'The only person you should try to be better than is the person you were yesterday.', likes: 312, comments: 27, time: '6h ago' },
  { id: 4, user: 'ZenMaster', avatar: 'ZM', text: 'Breathe in courage, breathe out fear. You have everything you need within you.', likes: 156, comments: 9, time: '8h ago' },
  { id: 5, user: 'RiseUp', avatar: 'RU', text: 'Failure is not the opposite of success. It is part of success.', likes: 278, comments: 21, time: '12h ago' }
];

const AUDIO_TRACKS = [
  { id: 1, title: 'Morning Motivation', duration: '3:24', category: 'motivation' },
  { id: 2, title: 'Calm Reflection', duration: '5:12', category: 'spiritual' },
  { id: 3, title: 'Power Focus', duration: '4:08', category: 'business' },
  { id: 4, title: 'Evening Gratitude', duration: '6:30', category: 'happiness' },
  { id: 5, title: 'Workout Energy', duration: '3:45', category: 'fitness' },
  { id: 6, title: 'Study Flow', duration: '4:55', category: 'study' }
];

const NOTIFICATIONS_DATA = [
  { id: 1, type: 'quote', icon: '✨', title: 'Daily Quote Ready', message: 'Your inspirational quote for today is waiting.', time: '5 min ago', unread: true },
  { id: 2, type: 'streak', icon: '🔥', title: '7 Day Streak!', message: 'Amazing! You have read quotes for 7 days straight.', time: '1h ago', unread: true },
  { id: 3, type: 'achievement', icon: '🏆', title: 'New Badge Unlocked', message: 'You earned the "Quote Collector" badge.', time: '3h ago', unread: false },
  { id: 4, type: 'community', icon: '💬', title: 'New Comment', message: 'Someone liked your shared quote.', time: '5h ago', unread: false },
  { id: 5, type: 'reminder', icon: '⏰', title: 'Meditation Reminder', message: 'Time for your daily mindfulness session.', time: '1d ago', unread: false }
];

const ACHIEVEMENTS = [
  { id: 1, name: 'First Quote', icon: '📖', unlocked: true },
  { id: 2, name: '7 Day Streak', icon: '🔥', unlocked: true },
  { id: 3, name: 'Collector', icon: '⭐', unlocked: true },
  { id: 4, name: 'Sharer', icon: '📤', unlocked: false },
  { id: 5, name: 'Explorer', icon: '🧭', unlocked: true },
  { id: 6, name: 'Mood Master', icon: '🎭', unlocked: false }
];

function getQuotesByCategory(category) {
  return QUOTES_DB.filter(q => q.category === category);
}

function getQuotesByMood(mood) {
  return QUOTES_DB.filter(q => q.mood === mood);
}

function getTrendingQuotes() {
  return QUOTES_DB.filter(q => q.trending).concat(
    QUOTES_DB.filter(q => !q.trending).sort((a, b) => b.likes - a.likes).slice(0, 6)
  ).slice(0, 12);
}

function getDailyQuote() {
  const day = new Date().getDate();
  return QUOTES_DB[day % QUOTES_DB.length];
}

function getRandomQuote() {
  return QUOTES_DB[Math.floor(Math.random() * QUOTES_DB.length)];
}

function searchQuotes(query) {
  const q = query.toLowerCase();
  return QUOTES_DB.filter(quote =>
    quote.text.toLowerCase().includes(q) ||
    quote.author.toLowerCase().includes(q) ||
    quote.category.toLowerCase().includes(q)
  );
}

function getQuoteById(id) {
  return QUOTES_DB.find(q => q.id === parseInt(id, 10));
}

if (typeof module !== 'undefined') module.exports = { QUOTES_DB, QUOTE_CATEGORIES, getDailyQuote };
