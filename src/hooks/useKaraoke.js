import { useState, useEffect, useRef, useCallback } from 'react';
import { buildLineIndex } from '../data/songs';

/**
 * useKaraoke — singleton-per-song pattern.
 *
 * Multiple LyricPages for the same song share ONE YouTube player via the
 * module-level `songPlayers` map. The player is created on first subscriber
 * and destroyed when the last subscriber unmounts.
 *
 * Returns { activeLineKey, playState, position, duration, toggle, seek }
 */

// ── YouTube IFrame API bootstrap ──────────────────────────────────────────

let ytApiState = 'idle'; // 'idle' | 'loading' | 'ready'
const ytReadyCallbacks = [];

function loadYTApi() {
  if (ytApiState !== 'idle') return;
  ytApiState = 'loading';
  const tag = document.createElement('script');
  tag.src = 'https://www.youtube.com/iframe_api';
  document.head.appendChild(tag);
  window.onYouTubeIframeAPIReady = () => {
    ytApiState = 'ready';
    ytReadyCallbacks.splice(0).forEach(cb => cb());
  };
}

function onYTReady(cb) {
  if (ytApiState === 'ready') { cb(); return; }
  ytReadyCallbacks.push(cb);
  loadYTApi();
}

// ── Singleton player store ────────────────────────────────────────────────
// songId → { player, container, rafId, lastPageIdx, subscribers: Set<setState> }

const songPlayers = {};

function broadcast(songId, patch) {
  const entry = songPlayers[songId];
  if (!entry) return;
  entry.subscribers.forEach(setState => setState(prev => ({ ...prev, ...patch })));
}

function startPoll(songId, lineIndex) {
  const entry = songPlayers[songId];
  if (!entry || entry.rafId) return;

  function tick() {
    const e = songPlayers[songId];
    if (!e?.player?.getCurrentTime) return;
    const t = e.player.getCurrentTime();
    // Find last timed line whose time ≤ t
    let active = null;
    for (let i = lineIndex.length - 1; i >= 0; i--) {
      if (lineIndex[i].time <= t) { active = lineIndex[i]; break; }
    }
    const key = active
      ? `${songId}-p${active.pageIdx}-l${active.lineIdx}`
      : null;

    // Emit page-change event when active line crosses to a different page
    if (active && active.pageIdx !== e.lastPageIdx) {
      e.lastPageIdx = active.pageIdx;
      window.dispatchEvent(new CustomEvent('karaoke-page-change', {
        detail: { songId, pageIdx: active.pageIdx },
      }));
    }

    broadcast(songId, { position: t, activeLineKey: key });
    e.rafId = requestAnimationFrame(tick);
  }
  entry.rafId = requestAnimationFrame(tick);
}

function stopPoll(songId) {
  const entry = songPlayers[songId];
  if (!entry) return;
  if (entry.rafId) { cancelAnimationFrame(entry.rafId); entry.rafId = null; }
}

function createPlayer(song, lineIndex) {
  const el = document.createElement('div');
  el.id = `yt-${song.id}`;
  el.style.cssText =
    'position:fixed;width:1px;height:1px;opacity:0;pointer-events:none;top:-9999px;left:-9999px;';
  document.body.appendChild(el);

  const entry = songPlayers[song.id];
  entry.container = el;

  onYTReady(() => {
    if (!songPlayers[song.id]) return; // might have been removed
    songPlayers[song.id].player = new window.YT.Player(el.id, {
      videoId: song.youtubeId,
      playerVars: { autoplay: 0, controls: 0, rel: 0, origin: window.location.origin },
      events: {
        onReady(e) {
          broadcast(song.id, { duration: e.target.getDuration() });
        },
        onStateChange(e) {
          const YT = window.YT.PlayerState;
          if (e.data === YT.PLAYING) {
            broadcast(song.id, { playState: 'playing' });
            startPoll(song.id, lineIndex);
          } else if (e.data === YT.PAUSED || e.data === YT.ENDED) {
            broadcast(song.id, { playState: 'paused' });
            stopPoll(song.id);
          }
        },
      },
    });
  });
}

// ── Hook ─────────────────────────────────────────────────────────────────

const DEFAULT_STATE = { activeLineKey: null, playState: 'paused', position: 0, duration: 0 };

export function useKaraoke(song) {
  const [state, setState] = useState(DEFAULT_STATE);
  const lineIndex = useRef(buildLineIndex(song)).current;

  useEffect(() => {
    const id = song.id;

    if (!songPlayers[id]) {
      songPlayers[id] = { player: null, container: null, rafId: null, lastPageIdx: -1, subscribers: new Set() };
      createPlayer(song, lineIndex);
    }
    songPlayers[id].subscribers.add(setState);

    return () => {
      const entry = songPlayers[id];
      if (!entry) return;
      entry.subscribers.delete(setState);
      if (entry.subscribers.size === 0) {
        stopPoll(id);
        try { entry.player?.destroy(); } catch (_) {}
        if (entry.container) document.body.removeChild(entry.container);
        delete songPlayers[id];
      }
    };
  }, [song.id]); // eslint-disable-line react-hooks/exhaustive-deps

  const toggle = useCallback(() => {
    const p = songPlayers[song.id]?.player;
    if (!p) return;
    const s = p.getPlayerState();
    if (s === window.YT?.PlayerState?.PLAYING) p.pauseVideo();
    else p.playVideo();
  }, [song.id]);

  const seek = useCallback((seconds) => {
    const p = songPlayers[song.id]?.player;
    if (!p) return;
    p.seekTo(seconds, true);
    broadcast(song.id, { position: seconds });
  }, [song.id]);

  return { ...state, toggle, seek };
}
