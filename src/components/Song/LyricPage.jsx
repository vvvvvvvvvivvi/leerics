import { forwardRef } from 'react';
import PlayBar from './PlayBar';
import { useKaraoke } from '../../hooks/useKaraoke';

const MARGIN = 32; // px — left margin rule

// On compact (mobile): PlayBar sits above the fixed nav bar (52px).
// Content padding-bottom must clear PlayBar (48px) + nav bar (52px) + gap.
const COMPACT_BOTTOM_PAD = 52 + 48 + 4; // 104px

const LyricPage = forwardRef(function LyricPage(
  { song, pageIndex, totalPages, absolutePageNum, showHeader, compact },
  ref
) {
  const { activeLineKey, playState, position, duration, toggle, seek } =
    useKaraoke(song);

  const RHYTHM    = compact ? 32 : 38;
  const FONT_SIZE = compact ? 16 : 17;

  const lines      = song.pages[pageIndex] ?? [];
  const isLastPage = pageIndex === totalPages - 1;
  // PlayBar: every page on compact (mobile), only last page on desktop
  const showPlayBar = isLastPage || compact;

  const activeLinkOnThisPage = lines.findIndex((_, li) =>
    `${song.id}-p${pageIndex}-l${li}` === activeLineKey
  );

  return (
    <div
      ref={ref}
      className="relative w-full h-full overflow-hidden"
      style={{
        background: '#F7F4DA',
        backgroundImage: `
          linear-gradient(#E7E3C0 1px, transparent 1px),
          linear-gradient(90deg, transparent ${MARGIN}px, #d4a8f0 ${MARGIN}px, #d4a8f0 ${MARGIN + 1}px, transparent ${MARGIN + 1}px)
        `,
        backgroundSize: `100% ${RHYTHM}px, 100% 100%`,
        border: '2px solid #b090d0',
        fontFamily: 'var(--font-wenkai)',
      }}
    >
      <div
        className="flex flex-col h-full"
        style={{
          paddingLeft: MARGIN + 10,
          paddingRight: 18,
          paddingBottom: compact ? COMPACT_BOTTOM_PAD : (showPlayBar ? 54 : 12),
        }}
      >

        {/* ── First-page header ─────────────────────────────────── */}
        {showHeader ? (
          <div style={{ paddingTop: 10, flexShrink: 0 }}>
            <div style={{ height: 2, background: '#9b59d4' }} />

            <div style={{ paddingTop: 4 }}>
              <p style={{
                fontSize: 11,
                color: '#6b3fa0',
                letterSpacing: '1.5px',
                lineHeight: '19px',
                margin: 0,
              }}>
                原曲&ensp;{song.originalTitle}&ensp;·&ensp;原唱&ensp;{song.originalArtist}
              </p>

              <h1 style={{
                fontSize: compact ? 20 : 26,
                fontWeight: 500,
                letterSpacing: compact ? '4px' : '7px',
                color: '#2C2C2A',
                lineHeight: `${RHYTHM}px`,
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

            <div style={{ height: 1, background: '#b090d0', marginTop: 6 }} />
          </div>
        ) : (
          <div style={{
            paddingTop: compact ? 6 : 10,
            fontSize: 10,
            color: '#B4B2A9',
            letterSpacing: '3px',
            lineHeight: '19px',
            flexShrink: 0,
          }}>
            {song.title}
          </div>
        )}

        {/* ── Lyrics ─────────────────────────────────────────────── */}
        <div
          className="flex-1 overflow-hidden"
          style={{ marginTop: showHeader ? 4 : 0 }}
        >
          {lines.map((line, i) => {
            const lineKey  = `${song.id}-p${pageIndex}-l${i}`;
            const isActive = lineKey === activeLineKey;
            const isSung   = activeLinkOnThisPage !== -1 && i < activeLinkOnThisPage;

            if (line.type === 'blank') {
              return <div key={lineKey} style={{ height: RHYTHM }} aria-hidden="true" />;
            }

            if (line.type === 'section') {
              return (
                <div
                  key={lineKey}
                  className="flex items-center gap-2"
                  style={{ height: RHYTHM, lineHeight: `${RHYTHM}px` }}
                >
                  <span style={{
                    flex: '0 0 16px', height: 1,
                    background: '#d4a8f0',
                    display: 'inline-block', marginBottom: 2,
                  }} />
                  <span style={{
                    fontSize: 10,
                    color: '#6b3fa0',
                    letterSpacing: '1.5px',
                    fontWeight: 500,
                    textTransform: 'uppercase',
                  }}>
                    {line.text.replace(/^\[|\]$/g, '')}
                  </span>
                </div>
              );
            }

            return (
              <div
                key={lineKey}
                className={isActive ? 'line-active' : isSung ? 'line-sung' : 'line-upcoming'}
                style={{
                  fontSize: FONT_SIZE,
                  lineHeight: `${RHYTHM}px`,
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

      {/* Page number — desktop only; mobile shows indicator in nav bar */}
      {!compact && (
        <div
          className="absolute bottom-0 left-0 right-0 text-center pointer-events-none"
          style={{
            fontSize: 10,
            color: '#B4B2A9',
            letterSpacing: '3px',
            paddingBottom: showPlayBar ? 58 : 5,
          }}
        >
          — {absolutePageNum} —
        </div>
      )}

      {/* Playbar */}
      {showPlayBar && (
        <PlayBar
          song={song}
          playState={playState}
          position={position}
          duration={duration}
          onToggle={toggle}
          onSeek={seek}
          compact={compact}
        />
      )}
    </div>
  );
});

export default LyricPage;
