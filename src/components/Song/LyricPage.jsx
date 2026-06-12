import { forwardRef } from 'react';
import PlayBar from './PlayBar';
import { useKaraoke } from '../../hooks/useKaraoke';

const MARGIN = 32; // px — red margin rule from left edge

/**
 * LyricPage — one exercise-book page, editorial quality.
 *
 * Header block (first page only):
 *   ─── thin red rule ───────────────────────────────── [YouTube]
 *   原曲 · originalTitle  /  原唱 · originalArtist
 *   TITLE  subtitle
 *   ─── page rule ───────────────────────────────────
 *
 * Section labels: crimson chip with a short preceding rule
 * Lyrics: 18px / 38px grid, left of margin rule
 * Running song title: top of every continuation page
 */
const LyricPage = forwardRef(function LyricPage(
  { song, pageIndex, totalPages, absolutePageNum, showHeader },
  ref
) {
  const { activeLineKey, playState, position, duration, toggle, seek } =
    useKaraoke(song);

  const lines      = song.pages[pageIndex] ?? [];
  const isLastPage = pageIndex === totalPages - 1;

  // Determine active line index within this page for sung/upcoming logic
  const activeLinkOnThisPage = lines.findIndex((_, li) => {
    return `${song.id}-p${pageIndex}-l${li}` === activeLineKey;
  });

  function openYouTube() {
    window.open(`https://www.youtube.com/watch?v=${song.youtubeId}`, '_blank', 'noopener,noreferrer');
  }

  return (
    <div
      ref={ref}
      className="relative w-full h-full overflow-hidden"
      style={{
        background: '#F7F4DA',
        backgroundImage: `
          linear-gradient(#E7E3C0 1px, transparent 1px),
          linear-gradient(90deg, transparent ${MARGIN}px, #E8A0A0 ${MARGIN}px, #E8A0A0 ${MARGIN + 1}px, transparent ${MARGIN + 1}px)
        `,
        backgroundSize: '100% 38px, 100% 100%',
        border: '2px solid #C9C284',
        fontFamily: 'var(--font-wenkai)',
      }}
    >
      <div
        className="flex flex-col h-full"
        style={{
          paddingLeft: MARGIN + 10,
          paddingRight: 18,
          paddingBottom: isLastPage ? 54 : 12,
        }}
      >

        {/* ── First-page header ─────────────────────────────────── */}
        {showHeader ? (
          <div style={{ paddingTop: 10 }}>

            {/* Top accent rule */}
            <div style={{ height: 2, background: '#E24B4A', marginBottom: 0 }} />

            {/* Credit line + YouTube button */}
            <div className="flex items-start justify-between" style={{ paddingTop: 4, paddingBottom: 0 }}>
              <div>
                <p style={{
                  fontSize: 11,
                  color: '#993C1D',
                  letterSpacing: '1.5px',
                  lineHeight: '19px',
                  margin: 0,
                  textTransform: 'none',
                }}>
                  原曲&ensp;{song.originalTitle}&ensp;·&ensp;原唱&ensp;{song.originalArtist}
                </p>

                {/* Song title */}
                <h1 style={{
                  fontSize: 26,
                  fontWeight: 500,
                  letterSpacing: '7px',
                  color: '#2C2C2A',
                  lineHeight: '38px',
                  margin: 0,
                  marginTop: 2,
                }}>
                  {song.title}
                  {song.subtitle && (
                    <span style={{
                      fontSize: 13,
                      fontWeight: 400,
                      letterSpacing: '1px',
                      color: '#5F5E5A',
                      marginLeft: 10,
                    }}>
                      {song.subtitle}
                    </span>
                  )}
                </h1>
              </div>

              {/* 聆聽原曲 button — stopPropagation so pageflip doesn't intercept */}
              <button
                onClick={openYouTube}
                onMouseDown={e => e.stopPropagation()}
                onTouchStart={e => { e.stopPropagation(); openYouTube(); }}
                aria-label="聆聽原曲"
                className="flex flex-col items-center flex-shrink-0 cursor-pointer"
                style={{
                  background: 'none',
                  border: 'none',
                  padding: 0,
                  marginLeft: 14,
                  marginTop: 4,
                }}
              >
                <div style={{
                  width: 40, height: 40,
                  borderRadius: 4,
                  background: '#1a1a18',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                  {/* YouTube icon */}
                  <svg width="20" height="20" viewBox="0 0 24 24" aria-hidden="true">
                    <rect width="24" height="24" rx="5" fill="#FF0000"/>
                    <polygon points="10,7 18,12 10,17" fill="white"/>
                  </svg>
                </div>
                <span style={{ fontSize: 9, color: '#888780', marginTop: 3, letterSpacing: '0.5px' }}>
                  聆聽原曲
                </span>
              </button>
            </div>

            {/* Divider rule */}
            <div style={{ height: 1, background: '#C9C284', marginTop: 6, marginBottom: 0 }} />
          </div>
        ) : (
          /* Continuation pages: small running header */
          <div style={{
            paddingTop: 10,
            fontSize: 10,
            color: '#B4B2A9',
            letterSpacing: '3px',
            lineHeight: '19px',
          }}>
            {song.title}
          </div>
        )}

        {/* ── Lyrics ───────────────────────────────────────────── */}
        <div className="flex-1 overflow-hidden" style={{ marginTop: showHeader ? 4 : 0 }}>
          {lines.map((line, i) => {
            const lineKey  = `${song.id}-p${pageIndex}-l${i}`;
            const isActive = lineKey === activeLineKey;
            const isSung   = activeLinkOnThisPage !== -1 && i < activeLinkOnThisPage;

            if (line.type === 'blank') {
              return (
                <div key={lineKey} style={{ height: 38 }} aria-hidden="true" />
              );
            }

            if (line.type === 'section') {
              return (
                <div
                  key={lineKey}
                  className="flex items-center gap-2"
                  style={{ height: 38, lineHeight: '38px' }}
                >
                  <span style={{ flex: '0 0 16px', height: 1, background: '#E8A0A0', display: 'inline-block', marginBottom: 2 }} />
                  <span style={{
                    fontSize: 10,
                    color: '#993C1D',
                    letterSpacing: '1.5px',
                    fontWeight: 500,
                    textTransform: 'uppercase',
                  }}>
                    {/* Strip square brackets if present */}
                    {line.text.replace(/^\[|\]$/g, '')}
                  </span>
                </div>
              );
            }

            // Lyric line
            return (
              <div
                key={lineKey}
                className={isActive ? 'line-active' : isSung ? 'line-sung' : 'line-upcoming'}
                style={{
                  fontSize: 17,
                  lineHeight: '38px',
                  letterSpacing: '1.5px',
                  userSelect: 'none',
                }}
              >
                {line.text}
              </div>
            );
          })}
        </div>
      </div>

      {/* Page number */}
      <div
        className="absolute bottom-0 left-0 right-0 text-center pointer-events-none"
        style={{
          fontSize: 10,
          color: '#B4B2A9',
          letterSpacing: '3px',
          paddingBottom: isLastPage ? 58 : 5,
        }}
      >
        — {absolutePageNum} —
      </div>

      {/* Playbar */}
      {isLastPage && (
        <PlayBar
          song={song}
          playState={playState}
          position={position}
          duration={duration}
          onToggle={toggle}
          onSeek={seek}
        />
      )}
    </div>
  );
});

export default LyricPage;
