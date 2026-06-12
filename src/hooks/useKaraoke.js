import { useState, useEffect, useRef, useCallback } from 'react';
import { buildLineIndex } from '../data/songs';

/**
 * useKaraoke
 *
 * Drives karaoke sync using YouTube IFrame API.
 * - Loads the YT IFrame API script once (singleton guard)
 * - Polls getCurrentTime() at ~60ms for active-line tracking
 * - Returns { activeLineKey, playState, position, duration, toggle, seek }
 *
 * activeLineKey format: `${song.id}-p${pageIdx}-l${lineIdx}`
 * This matches the key format used in LyricPage.
 *
 * Line→page mapping is derived from buildLineIndex so the BookLayout
 * can auto-flip when the active line crosses a page boundary.
 */

let ytApiReady = false;
let ytApiLoading = false;
const ytReadyCallbacks = [];

function loadYTApi() {
  if (ytApiReady || ytApiLoading) return;
  ytApiLoading = true;
  const tag = document.createElement('script');
  tag.src = 'https://www.youtube.com/iframe_api';
  document.head.appendChild(tag);
  window.onYouTubeIframeAPIReady = () => {
    ytApiReady = true;
    ytApiLoading = false;
    ytReadyCallbacks.forEach(cb => cb());
    ytReadyCallbacks.length = 0;
  };
}

function onYTReady(cb) {
  if (ytApiReady) { cb(); return; }
  ytReadyCallbacks.push(cb);
  loadYTApi();
}

export function useKaraoke(song) {
  const playerRef    = useRef(null);
  const containerRef = useRef(null);
  const rafRef       = useRef(null);
  const lineIndex    = useRef(buildLineIndex(song));

  const [playState,     setPlayState]     = useState('paused');
  const [position,      setPosition]      = useState(0);
  const [duration,      setDuration]      = useState(0);
  const [activeLineKey, setActiveLineKey] = useState(null);

  // Mount hidden YT player ─────────────────────────────────────────────────
  useEffect(() => {
    // Create a hidden container
    const el = document.createElement('div');
    el.id = `yt-player-${song.id}`;
    el.style.cssText = 'position:absolute;width:1px;height:1px;overflow:hidden;opacity:0;pointer-events:none;';
    document.body.appendChild(el);
    containerRef.current = el;

    onYTReady(() => {
      if (playerRef.current) return;
      playerRef.current = new window.YT.Player(el.id, {
        videoId: song.youtubeId,
        playerVars: { autoplay: 0, controls: 0, rel: 0 },
        events: {
          onReady: (e) => {
            setDuration(e.target.getDuration());
          },
          onStateChange: (e) => {
            const s = e.data;
            if (s === window.YT.PlayerState.PLAYING) {
              setPlayState('playing');
              startPoll();
            } else if (s === window.YT.PlayerState.PAUSED || s === window.YT.PlayerState.ENDED) {
              setPlayState('paused');
              stopPoll();
            }
          },
        },
      });
    });

    return () => {
      stopPoll();
      if (playerRef.current) {
        try { playerRef.current.destroy(); } catch (_) {}
        playerRef.current = null;
      }
      if (containerRef.current) {
        document.body.removeChild(containerRef.current);
        containerRef.current = null;
      }
    };
  }, [song.id]); // eslint-disable-line react-hooks/exhaustive-deps

  // Polling loop ─────────────────────────────────────────────────────────
  const startPoll = useCallback(() => {
    function tick() {
      const player = playerRef.current;
      if (!player?.getCurrentTime) return;
      const t = player.getCurrentTime();
      setPosition(t);
      updateActiveLine(t);
      rafRef.current = requestAnimationFrame(tick);
    }
    rafRef.current = requestAnimationFrame(tick);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const stopPoll = useCallback(() => {
    if (rafRef.current) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    }
  }, []);

  function updateActiveLine(t) {
    const lines = lineIndex.current;
    // Find last line whose time ≤ t
    let active = null;
    for (let i = lines.length - 1; i >= 0; i--) {
      if (lines[i].time <= t) { active = lines[i]; break; }
    }
    if (!active) { setActiveLineKey(null); return; }
    const key = `${song.id}-p${active.pageIdx}-l${active.lineIdx}`;
    setActiveLineKey(key);
  }

  // Controls ─────────────────────────────────────────────────────────────
  const toggle = useCallback(() => {
    const p = playerRef.current;
    if (!p) return;
    const state = p.getPlayerState();
    if (state === window.YT?.PlayerState?.PLAYING) {
      p.pauseVideo();
    } else {
      p.playVideo();
    }
  }, []);

  const seek = useCallback((seconds) => {
    const p = playerRef.current;
    if (!p) return;
    p.seekTo(seconds, true);
    setPosition(seconds);
  }, []);

  return { activeLineKey, playState, position, duration, toggle, seek };
}
