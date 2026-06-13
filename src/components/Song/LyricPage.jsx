import { forwardRef } from 'react';
import PlayBar from './PlayBar';
import { useKaraoke } from '../../hooks/useKaraoke';

const MARGIN = 32; // px — left margin rule position

// Mobile: PlayBar at bottom:0; content needs clearance
const COMPACT_BOTTOM_PAD = 56; // 48px playbar + 8px gap

// SVG paper grain — subtle fractal noise tiled at 300×300
const GRAIN_URL = "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='g'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='300' height='300' filter='url(%23g)' opacity='0.048'/%3E%3C/svg%3E\")";

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
  const showPlayBar = isLastPage || compact;

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
        background: '#EDE8D0',
        backgroundImage: [
          GRAIN_URL,
          `linear-gradient(#D4C9A8 1px, transparent 1px)`,
          `linear-gradient(90deg, transparent ${MARGIN}px, #C4A0E4 ${MARGIN}px, #C4A0E4 ${MARGIN + 1}px, transparent ${MARGIN + 1}px)`,
        ].join(', '),
        backgroundSize: `300px 300px, 100% ${RHYTHM}px, 100% 100%`,
        border: '1px solid rgba(160,120,200,0.18)',
        fontFamily: 'var(--font-wenkai)',
      }}
    >
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
          paddingLeft: MARGIN + 20,
          paddingRight: 28,
          paddingBottom: compact ? COMPACT_BOTTOM_PAD : (showPlayBar ? 54 : 12),
          position: 'relative',
          zIndex: 2,
        }}
      >

        {/* ── First-page header ─────────────────────────────────── */}
        {showHeader ? (
          <div style={{ paddingTop: 10, flexShrink: 0, position: 'relative' }}>

            {/* Washi tape strip across the header */}
            <div style={{
              position: 'absolute',
              top: 14,
              left: -(MARGIN + 20),
              width: '65%',
              height: 15,
              background: 'repeating-linear-gradient(90deg, rgba(160,200,155,0.38) 0px, rgba(155,195,150,0.33) 4px, rgba(170,210,165,0.32) 4px, rgba(160,200,155,0.36) 8px)',
              transform: 'rotate(-0.6deg)',
              borderRadius: '1px 2px 2px 1px',
              pointerEvents: 'none',
            }} />

            <div style={{ height: 2, background: '#9b59d4', position: 'relative', zIndex: 1 }} />

            <div style={{ paddingTop: 4, position: 'relative', zIndex: 1 }}>
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

            <div style={{ height: 1, background: '#A890C8', marginTop: 6, position: 'relative', zIndex: 1 }} />
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
            paddingBottom: showPlayBar ? 58 : 5,
            zIndex: 5,
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
