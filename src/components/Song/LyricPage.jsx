import { forwardRef } from 'react';
import PlayBar from './PlayBar';
import { useKaraoke } from '../../hooks/useKaraoke';
const paperL1 = `${import.meta.env.BASE_URL}assets/paper/L1.png`;
const paperR1 = `${import.meta.env.BASE_URL}assets/paper/R1.png`;

const MARGIN = 32; // px — left margin rule position

// Mobile: PlayBar at bottom:0; content needs clearance
const COMPACT_BOTTOM_PAD = 56; // 48px playbar + 8px gap

const LyricPage = forwardRef(function LyricPage(
  { song, pageIndex, totalPages, absolutePageNum, showHeader, compact, noPlayBar },
  ref
) {
  const { activeLineKey, playState, position, duration, toggle, seek } =
    useKaraoke(song);

  const RHYTHM    = compact ? 32 : 38;
  const FONT_SIZE = compact ? 16 : 17;

  const lines      = song.pages[pageIndex] ?? [];
  const isLastPage = pageIndex === totalPages - 1;
  const showPlayBar = !noPlayBar && (isLastPage || compact);

  // Odd absolutePageNum → L1 paper; even → R1 paper (alternates facing pages)
  const paperSrc = absolutePageNum % 2 === 1 ? paperL1 : paperR1;

  // Scanner aesthetic: even absolutePageNum = left page (gutter on right)
  //                    odd  absolutePageNum = right page (gutter on left)
  const isRightPage = absolutePageNum % 2 === 1;

  const activeLinkOnThisPage = lines.findIndex((_, li) =>
    `${song.id}-p${pageIndex}-l${li}` === activeLineKey
  );

  return (
    <div
      ref={ref}
      className="relative w-full h-full overflow-hidden"
      style={{
        backgroundColor: '#EDE8D0',
        border: '1px solid rgba(160,120,200,0.18)',
        fontFamily: 'var(--font-wenkai)',
      }}
    >
      {/* Paper texture */}
      <img
        src={paperSrc}
        aria-hidden="true"
        draggable={false}
        style={{
          position: 'absolute', inset: 0,
          width: '100%', height: '100%',
          objectFit: 'cover',
          zIndex: 0,
          pointerEvents: 'none',
          userSelect: 'none',
        }}
      />



      {/* Scanner gutter shadow — desktop only */}
      {!compact && (
        <div
          style={{
            position: 'absolute',
            top: 0, bottom: 0,
            [isRightPage ? 'left' : 'right']: 0,
            width: 64,
            background: `linear-gradient(to ${isRightPage ? 'right' : 'left'},
              rgba(0,0,0,0.14) 0%,
              rgba(0,0,0,0.06) 45%,
              transparent 100%)`,
            pointerEvents: 'none',
            zIndex: 4,
          }}
        />
      )}

      {/* Subtle page-edge vignette (scanner corner loss) */}
      {!compact && (
        <div style={{
          position: 'absolute', inset: 0,
          background: 'radial-gradient(ellipse at center, transparent 60%, rgba(0,0,0,0.06) 100%)',
          pointerEvents: 'none',
          zIndex: 3,
        }} />
      )}

      <div
        className="flex flex-col h-full"
        style={{
          paddingTop: compact ? 14 : 44,
          paddingLeft: MARGIN + 20,
          paddingRight: 28,
          paddingBottom: compact ? COMPACT_BOTTOM_PAD : (showPlayBar ? 54 : 44),
          position: 'relative',
          zIndex: 2,
        }}
      >

        {/* ── First-page header ─────────────────────────────────── */}
        {showHeader ? (
          <div style={{ flexShrink: 0 }}>
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

            <div style={{ height: 1, background: '#A890C8', marginTop: 6 }} />
          </div>
        ) : (
          <div style={{
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
                  style={{ height: RHYTHM, lineHeight: `${RHYTHM}px`, marginTop: i > 0 ? 4 : 0 }}
                >
                  <span style={{
                    flex: '0 0 16px', height: 1,
                    background: '#C4A0E4',
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

      {/* Page number */}
      {compact ? (
        <div
          className="absolute left-0 right-0 text-center pointer-events-none"
          style={{
            bottom: 52,
            fontSize: 9,
            color: '#B4B2A9',
            letterSpacing: '3px',
            zIndex: 2,
          }}
        >
          — {absolutePageNum} —
        </div>
      ) : (
        <div
          className="absolute bottom-0 left-0 right-0 text-center pointer-events-none"
          style={{
            fontSize: 10,
            color: '#B4B2A9',
            letterSpacing: '3px',
            paddingBottom: showPlayBar ? 58 : 8,
            zIndex: 5,
          }}
        >
          — {absolutePageNum} —
        </div>
      )}

      {/* Playbar — mobile only (desktop: lives in NanoPlayer) */}
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
