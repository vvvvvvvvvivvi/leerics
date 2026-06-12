import { forwardRef } from 'react';
import PlayBar from './PlayBar';
import { useKaraoke } from '../../hooks/useKaraoke';

const MARGIN_LEFT = 28; // px — red margin rule position

/**
 * LyricPage — one physical exercise-book page.
 *
 * Layout rules from spec:
 * - Paper #F7F4DA; horizontal rules at 38px rhythm
 * - Red margin rule at ~24px from left; text starts right of it
 * - 18px lyrics / 12px section labels, line-height 38px
 * - Page number centred at bottom: – N –
 * - Song header (title + credit + 聆聽原曲 block) on first page only
 * - Playbar pinned bottom of the right page (last page of song)
 */
const LyricPage = forwardRef(function LyricPage(
  { song, pageIndex, totalPages, absolutePageNum, showHeader },
  ref
) {
  const { activeLineKey, playState, position, duration, toggle, seek } =
    useKaraoke(song);

  const lines      = song.pages[pageIndex] ?? [];
  const isLastPage = pageIndex === totalPages - 1;

  return (
    <div
      ref={ref}
      className="ruled-paper relative w-full h-full flex flex-col overflow-hidden"
      style={{
        border: '2px solid #C9C284',
        /* Red margin rule */
        backgroundImage: `
          linear-gradient(#E7E3C0 1px, transparent 1px),
          linear-gradient(90deg, transparent ${MARGIN_LEFT}px, #E8A0A0 ${MARGIN_LEFT}px, #E8A0A0 ${MARGIN_LEFT + 1}px, transparent ${MARGIN_LEFT + 1}px)
        `,
        backgroundSize: '100% 38px, 100% 100%',
        fontFamily: 'var(--font-wenkai)',
      }}
    >
      {/* Content area */}
      <div
        className="flex-1 overflow-hidden"
        style={{
          paddingLeft: MARGIN_LEFT + 8,
          paddingRight: 16,
          paddingTop: 8,
          paddingBottom: isLastPage ? 56 : 16, // space for playbar
        }}
      >
        {/* Song header — first page only */}
        {showHeader && (
          <div className="mb-2" style={{ paddingTop: 6 }}>
            {/* 聆聽原曲 block — top right */}
            <div className="flex items-start justify-between">
              <div>
                <h1
                  style={{
                    fontSize: 22,
                    fontWeight: 500,
                    letterSpacing: '6px',
                    color: '#2C2C2A',
                    lineHeight: '38px',
                    margin: 0,
                  }}
                >
                  {song.title}
                  {song.subtitle && (
                    <span style={{ fontSize: 13, letterSpacing: '1px', fontWeight: 400, marginLeft: 8 }}>
                      {song.subtitle}
                    </span>
                  )}
                </h1>
                <p style={{ fontSize: 12, color: '#5F5E5A', lineHeight: '19px', marginTop: 0 }}>
                  原曲: {song.originalTitle} / 原唱: {song.originalArtist}
                </p>
              </div>

              {/* YouTube link block */}
              <a
                href={`https://www.youtube.com/watch?v=${song.youtubeId}`}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="聆聽原曲"
                className="flex flex-col items-center flex-shrink-0"
                style={{ marginLeft: 12 }}
              >
                <div
                  style={{
                    width: 44,
                    height: 44,
                    background: '#1a1a18',
                    borderRadius: 4,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  {/* Simple play icon stand-in; QR would need a library */}
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                    <rect width="24" height="24" rx="4" fill="#FF0000"/>
                    <polygon points="9,7 19,12 9,17" fill="white"/>
                  </svg>
                </div>
                <span style={{ fontSize: 10, color: '#888780', marginTop: 2 }}>聆聽原曲</span>
              </a>
            </div>

            {/* Rule under header */}
            <div style={{ height: 1, background: '#C9C284', margin: '4px 0 0' }} />
          </div>
        )}

        {/* Lyrics */}
        {lines.map((line, i) => {
          const lineKey = `${song.id}-p${pageIndex}-l${i}`;
          const isActive = lineKey === activeLineKey;
          const isSung   = activeLineKey
            ? lines.findIndex((_, li) => `${song.id}-p${pageIndex}-l${li}` === activeLineKey) > i
            : false;

          if (line.type === 'blank') {
            return (
              <div
                key={lineKey}
                style={{ height: 38, lineHeight: '38px' }}
                aria-hidden="true"
              />
            );
          }

          if (line.type === 'section') {
            return (
              <div
                key={lineKey}
                style={{
                  fontSize: 12,
                  color: '#993C1D',
                  lineHeight: '38px',
                  letterSpacing: '0.5px',
                }}
              >
                {line.text}
              </div>
            );
          }

          // lyric line
          return (
            <div
              key={lineKey}
              className={
                isActive
                  ? 'line-active'
                  : isSung
                  ? 'line-sung'
                  : 'line-upcoming'
              }
              style={{
                fontSize: 18,
                lineHeight: '38px',
                letterSpacing: '1.5px',
              }}
            >
              {line.text}
            </div>
          );
        })}
      </div>

      {/* Page number */}
      <div
        className="absolute bottom-1 left-0 right-0 text-center"
        style={{ fontSize: 11, color: '#888780', letterSpacing: '2px' }}
      >
        – {absolutePageNum} –
      </div>

      {/* Playbar — pinned to bottom of last song page */}
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
