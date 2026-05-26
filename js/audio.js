/* Audio Quotes Player */
let isPlaying = false;
let currentTrack = null;

function initAudioPlayer() {
  const playlist = document.getElementById('audio-playlist');
  const visualizer = document.getElementById('audio-visualizer');
  const playBtn = document.getElementById('audio-play-btn');
  const trackTitle = document.getElementById('current-track-title');
  const trackDuration = document.getElementById('current-track-duration');
  const progressBar = document.getElementById('audio-progress');

  if (playlist) {
    playlist.innerHTML = AUDIO_TRACKS.map((track, i) => `
      <div class="playlist-card ${i === 0 ? 'playing' : ''}" data-track="${track.id}">
        <div class="playlist-thumb">🎵</div>
        <div>
          <strong>${track.title}</strong>
          <div class="text-muted" style="font-size:0.8rem">${track.duration} · ${track.category}</div>
        </div>
      </div>
    `).join('');

    playlist.querySelectorAll('.playlist-card').forEach(card => {
      card.addEventListener('click', () => {
        const trackId = parseInt(card.dataset.track, 10);
        const track = AUDIO_TRACKS.find(t => t.id === trackId);
        if (!track) return;

        playlist.querySelectorAll('.playlist-card').forEach(c => c.classList.remove('playing'));
        card.classList.add('playing');
        currentTrack = track;

        if (trackTitle) trackTitle.textContent = track.title;
        if (trackDuration) trackDuration.textContent = track.duration;

        if (!isPlaying) togglePlay();
      });
    });

    currentTrack = AUDIO_TRACKS[0];
    if (trackTitle) trackTitle.textContent = currentTrack.title;
    if (trackDuration) trackDuration.textContent = currentTrack.duration;
  }

  function togglePlay() {
    isPlaying = !isPlaying;
    if (playBtn) playBtn.textContent = isPlaying ? '⏸️' : '▶️';
    visualizer?.classList.toggle('paused', !isPlaying);

    if (isPlaying && progressBar) {
      let progress = 0;
      const interval = setInterval(() => {
        if (!isPlaying) { clearInterval(interval); return; }
        progress += 1;
        progressBar.style.width = `${Math.min(progress, 100)}%`;
        if (progress >= 100) {
          clearInterval(interval);
          isPlaying = false;
          if (playBtn) playBtn.textContent = '▶️';
          visualizer?.classList.add('paused');
        }
      }, 300);
    }
  }

  playBtn?.addEventListener('click', togglePlay);

  document.getElementById('audio-prev')?.addEventListener('click', () => showToast('Previous track', '⏮️'));
  document.getElementById('audio-next')?.addEventListener('click', () => showToast('Next track', '⏭️'));

  const demoTracks = document.getElementById('featured-audio');
  if (demoTracks) {
    demoTracks.innerHTML = AUDIO_TRACKS.slice(0, 3).map(t => `
      <div class="glass-card reveal">
        <div style="font-size:2rem;margin-bottom:0.5rem">🎧</div>
        <strong>${t.title}</strong>
        <p class="text-muted">${t.duration}</p>
        <button class="btn btn-secondary btn-sm mt-2 play-featured" data-id="${t.id}">Play</button>
      </div>
    `).join('');

    demoTracks.querySelectorAll('.play-featured').forEach(btn => {
      btn.addEventListener('click', () => {
        if (!isPlaying) togglePlay();
        showToast('Now playing', '🎵');
      });
    });
  }
}

document.addEventListener('DOMContentLoaded', initAudioPlayer);
