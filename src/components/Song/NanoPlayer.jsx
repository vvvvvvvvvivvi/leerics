import { useKaraoke } from '../../hooks/useKaraoke';
import ipodImg from '../../assets/ipod.png';

function fmt(sec) {
  if (!sec || isNaN(sec)) return '0:00';
  const m = Math.floor(sec / 60);
  const s = Math.floor(sec % 60);
  return `${m}:${String(s).padStart(2, '0')}`;
}

function stopBubble(e) { e.stopPropagation(); }

/**
 * NanoPlayer — photographic iPod overlapping the right page.
 * ipod.png is the device body; a screen overlay sits at the correct percentage
 * position over the device photo for the live karaoke UI.
 */
export default function NanoPlayer({ song }) {
  const { playState, position, duration, toggle } = useKaraoke(song);
  const pct = duration > 0 ? Math.min((position / duration) * 100, 100) : 0;

  return (
    <div
      style={{
        position: 'absolute',
        right: -14,
        top: '58%',
        transform: 'translateY(-50%) rotate(-4deg)',
        zIndex: 25,
        width: 130,
        userSelect: 'none',
        filter: 'drop-shadow(-5px 10px 18px rgba(0,0,0,0.50)) drop-shadow(0 2px 4px rgba(0,0,0,0.30))',
      }}
      onMouseDown={stopBubble}
      onTouchStart={stopBubble}
    >
      <div style={{ position: 'relative', width: '100%' }}>

        {/* Physical device photo */}
        <img
          src={ipodImg}
          alt="iPod"
          style={{ width: '100%', display: 'block', pointerEvents: 'none' }}
          draggable={false}
        />

        {/* Screen overlay — layered over the device's actual screen area.
            Percentages match the iPod classic screen position within the 1024×1024 photo. */}
        <div style={{
          position: 'absolute',
          top: '8%',
          left: '14%',
          right: '14%',
          height: '40%',
          background: 'rgba(14,14,18,0.88)',
          borderRadius: 3,
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          padding: '6px 7px 5px',
          boxSizing: 'border-box',
        }}>
          {/* Screen glare */}
          <div style={{
            position: 'absolute',
            top: 0, left: 0, right: 0, height: '35%',
            background: 'linear-gradient(to bottom, rgba(255,255,255,0.08), transparent)',
            pointerEvents: 'none',
          }} />

          {/* Artist */}
          <div style={{
            fontSize: 5.5,
            color: '#999',
            letterSpacing: '0.4px',
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
            fontSize: 8.5,
            color: '#f2f2f2',
            fontWeight: 700,
            letterSpacing: '0.4px',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            lineHeight: 1.3,
            fontFamily: 'var(--font-wenkai)',
            flexShrink: 0,
            marginTop: 1,
            position: 'relative',
          }}>
            {song.title}
          </div>

          <div style={{ flex: 1 }} />

          {/* Progress bar */}
          <div style={{
            height: 2,
            background: '#2a2a2a',
            borderRadius: 1,
            overflow: 'hidden',
            marginBottom: 3,
            flexShrink: 0,
            position: 'relative',
          }}>
            <div style={{
              height: '100%',
              width: `${pct}%`,
              background: 'linear-gradient(90deg, #7c3aed, #9b59d4)',
              transition: 'width 0.3s linear',
              borderRadius: 1,
            }} />
          </div>

          {/* Time row */}
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexShrink: 0,
            position: 'relative',
          }}>
            <span style={{ fontSize: 5, color: '#777', fontFamily: 'ui-monospace,monospace' }}>
              {fmt(position)}
            </span>
            <button
              onClick={toggle}
              aria-label={playState === 'playing' ? '暫停' : '播放'}
              style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                color: '#ccc',
                fontSize: 7,
                padding: 0,
                lineHeight: 1,
              }}
            >
              {playState === 'playing' ? '⏸' : '▶'}
            </button>
            <span style={{ fontSize: 5, color: '#777', fontFamily: 'ui-monospace,monospace' }}>
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
            bottom: '14%',
            left: '20%',
            right: '20%',
            height: '26%',
            background: 'transparent',
            border: 'none',
            cursor: 'pointer',
          }}
        />
      </div>
    </div>
  );
}
