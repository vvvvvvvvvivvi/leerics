import { useKaraoke } from '../../hooks/useKaraoke';
const ipodImg = `${import.meta.env.BASE_URL}assets/play/ipod.png`;

function fmt(sec) {
  if (!sec || isNaN(sec)) return '0:00';
  const m = Math.floor(sec / 60);
  const s = Math.floor(sec % 60);
  return `${m}:${String(s).padStart(2, '0')}`;
}

function stopBubble(e) { e.stopPropagation(); }

/**
 * NanoPlayer — photographic iPod resting in the bottom-right corner of the book.
 * The device photo uses mix-blend-mode:screen so the black photo background
 * disappears, leaving only the device sitting on the paper.
 * The screen content (artist, title, scrubber, play/pause) is overlaid at the
 * correct percentage position on the iPod photo.
 */
export default function NanoPlayer({ song }) {
  const { playState, position, duration, toggle } = useKaraoke(song);
  const pct = duration > 0 ? Math.min((position / duration) * 100, 100) : 0;

  return (
    <div
      style={{
        position: 'fixed',
        right: 0,
        bottom: 0,
        width: 217,
        zIndex: 9999,
        userSelect: 'none',
        // No filter here — filter creates a stacking context that breaks mix-blend-mode
      }}
      onMouseDown={stopBubble}
      onTouchStart={stopBubble}
    >
      <div style={{ position: 'relative', width: '100%' }}>

        {/* Device photo. mix-blend-mode:screen makes the black background
            transparent so the paper shows through underneath. */}
        <img
          src={ipodImg}
          alt="iPod"
          style={{
            width: '100%',
            display: 'block',
            pointerEvents: 'none',
            mixBlendMode: 'screen',
          }}
          draggable={false}
        />

        {/* Screen overlay — positioned over the iPod's screen area.
            Percentages calibrated to the iPod Classic in ipod.png (1024×1024).
            Adjust top/left/right/height if your image has different margins. */}
        <div style={{
          position: 'absolute',
          top: '7.5%',
          left: '20%',
          right: '18.5%',
          height: '30%',
          background: 'rgba(14,14,18,0.90)',
          borderRadius: 4,
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          padding: '10px 12px 8px',
          boxSizing: 'border-box',
        }}>
          {/* Screen glare */}
          <div style={{
            position: 'absolute',
            top: 0, left: 0, right: 0, height: '30%',
            background: 'linear-gradient(to bottom, rgba(255,255,255,0.07), transparent)',
            pointerEvents: 'none',
          }} />

          {/* Artist */}
          <div style={{
            fontSize: 9,
            color: '#888',
            letterSpacing: '0.5px',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            fontFamily: 'var(--font-wenkai)',
            flexShrink: 0,
            position: 'relative',
          }}>
            {song.originalArtist}
          </div>

          {/* Title */}
          <div style={{
            fontSize: 13,
            color: '#f2f2f2',
            fontWeight: 700,
            letterSpacing: '0.5px',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            lineHeight: 1.3,
            fontFamily: 'var(--font-wenkai)',
            flexShrink: 0,
            marginTop: 2,
            position: 'relative',
          }}>
            {song.title}
          </div>

          <div style={{ flex: 1 }} />

          {/* Progress bar */}
          <div style={{
            height: 3,
            background: '#2a2a2a',
            borderRadius: 2,
            overflow: 'hidden',
            marginBottom: 5,
            flexShrink: 0,
            position: 'relative',
          }}>
            <div style={{
              height: '100%',
              width: `${pct}%`,
              background: 'linear-gradient(90deg, #7c3aed, #9b59d4)',
              transition: 'width 0.3s linear',
              borderRadius: 2,
            }} />
          </div>

          {/* Time + play/pause row */}
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexShrink: 0,
            position: 'relative',
          }}>
            <span style={{ fontSize: 8, color: '#666', fontFamily: 'ui-monospace,monospace' }}>
              {fmt(position)}
            </span>
            <button
              onClick={toggle}
              aria-label={playState === 'playing' ? '暫停' : '播放'}
              style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                color: '#bbb',
                fontSize: 11,
                padding: 0,
                lineHeight: 1,
              }}
            >
              {playState === 'playing' ? '⏸' : '▶'}
            </button>
            <span style={{ fontSize: 8, color: '#666', fontFamily: 'ui-monospace,monospace' }}>
              {fmt(duration)}
            </span>
          </div>
        </div>

        {/* Invisible click target over the scroll wheel for play/pause */}
        <button
          onClick={toggle}
          aria-label={playState === 'playing' ? '暫停' : '播放'}
          style={{
            position: 'absolute',
            top: '52%',
            left: '18%',
            right: '18%',
            height: '30%',
            background: 'transparent',
            border: 'none',
            cursor: 'pointer',
          }}
        />
      </div>
    </div>
  );
}
