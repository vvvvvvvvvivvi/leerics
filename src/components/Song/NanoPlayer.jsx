import { useKaraoke } from '../../hooks/useKaraoke';

function fmt(sec) {
  if (!sec || isNaN(sec)) return '0:00';
  const m = Math.floor(sec / 60);
  const s = Math.floor(sec % 60);
  return `${m}:${String(s).padStart(2, '0')}`;
}

function stopBubble(e) { e.stopPropagation(); }

/**
 * NanoPlayer — iPod nano 6th-gen style mini player clipped to the book edge.
 * Shares the singleton karaoke player with LyricPage for the same song.
 */
export default function NanoPlayer({ song }) {
  const { playState, position, duration, toggle } = useKaraoke(song);
  const pct = duration > 0 ? Math.min((position / duration) * 100, 100) : 0;

  return (
    <div
      style={{
        position: 'absolute',
        right: 0,
        top: '38%',
        transform: 'translateY(-50%) rotate(2deg)',
        zIndex: 25,
        filter: 'drop-shadow(-3px 5px 14px rgba(0,0,0,0.28))',
        userSelect: 'none',
      }}
      onMouseDown={stopBubble}
      onTouchStart={stopBubble}
    >
      {/* Aluminium body */}
      <div style={{
        width: 62,
        height: 88,
        borderRadius: 14,
        background: 'linear-gradient(160deg, #f4f4f4 0%, #e2e2e2 35%, #d4d4d4 65%, #c8c8c8 100%)',
        border: '1px solid #b0b0b0',
        position: 'relative',
        overflow: 'visible',
      }}>

        {/* Polished chamfer edge highlight */}
        <div style={{
          position: 'absolute',
          inset: 0,
          borderRadius: 14,
          background: 'linear-gradient(135deg, rgba(255,255,255,0.45) 0%, transparent 50%)',
          pointerEvents: 'none',
        }} />

        {/* Screen recess */}
        <div style={{
          position: 'absolute',
          top: 6, left: 5, right: 5,
          height: 60,
          background: '#0e0e0e',
          borderRadius: 8,
          boxShadow: 'inset 0 2px 5px rgba(0,0,0,0.7)',
          overflow: 'hidden',
        }}>
          {/* Glass glare */}
          <div style={{
            position: 'absolute',
            top: 0, left: 0, right: 0,
            height: '38%',
            background: 'linear-gradient(to bottom, rgba(255,255,255,0.10), transparent)',
            borderRadius: '8px 8px 0 0',
            pointerEvents: 'none',
            zIndex: 1,
          }} />

          {/* Content */}
          <div style={{
            padding: '6px 6px 5px',
            display: 'flex',
            flexDirection: 'column',
            height: '100%',
            boxSizing: 'border-box',
            position: 'relative',
            zIndex: 2,
          }}>
            <div style={{
              fontSize: 6,
              color: '#888',
              letterSpacing: '0.8px',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
              marginBottom: 1,
              fontFamily: 'var(--font-wenkai)',
            }}>
              {song.originalArtist}
            </div>

            <div style={{
              fontSize: 8.5,
              color: '#f2f2f2',
              fontWeight: 700,
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
              letterSpacing: '0.4px',
              lineHeight: 1.25,
              fontFamily: 'var(--font-wenkai)',
            }}>
              {song.title}
            </div>

            {song.subtitle && (
              <div style={{
                fontSize: 5.5,
                color: '#999',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
                letterSpacing: '0.3px',
                marginTop: 1,
                fontFamily: 'var(--font-wenkai)',
              }}>
                {song.subtitle}
              </div>
            )}

            <div style={{ marginTop: 'auto' }}>
              <div style={{
                height: 2,
                background: '#252525',
                borderRadius: 1,
                overflow: 'hidden',
                marginBottom: 3,
              }}>
                <div style={{
                  height: '100%',
                  width: `${pct}%`,
                  background: 'linear-gradient(90deg, #7c3aed, #9b59d4)',
                  transition: 'width 0.3s linear',
                  borderRadius: 1,
                }} />
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ fontSize: 5.5, color: '#666', fontFamily: 'ui-monospace,monospace' }}>{fmt(position)}</span>
                <span style={{ fontSize: 5.5, color: '#666', fontFamily: 'ui-monospace,monospace' }}>{fmt(duration)}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Click-wheel style play/pause button */}
        <button
          onClick={toggle}
          aria-label={playState === 'playing' ? '暫停' : '播放'}
          style={{
            position: 'absolute',
            bottom: 7,
            left: '50%',
            transform: 'translateX(-50%)',
            width: 24,
            height: 24,
            borderRadius: '50%',
            background: 'linear-gradient(145deg, #ebebeb 0%, #c8c8c8 100%)',
            border: '1px solid #a8a8a8',
            boxShadow: '0 1px 4px rgba(0,0,0,0.22), inset 0 1px 0 rgba(255,255,255,0.9)',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#444',
            fontSize: 8,
            lineHeight: 1,
            padding: 0,
          }}
        >
          {playState === 'playing' ? (
            <span style={{ letterSpacing: '-1px', paddingLeft: 1 }}>⏸</span>
          ) : (
            <span style={{ paddingLeft: 2 }}>▶</span>
          )}
        </button>

        {/* Clip (right side) — the metal spring clip that grips the page */}
        <div style={{
          position: 'absolute',
          right: -6,
          top: 16,
          bottom: 16,
          width: 7,
          background: 'linear-gradient(90deg, #b4b4b4 0%, #d4d4d4 50%, #b8b8b8 100%)',
          borderRadius: '0 4px 4px 0',
          boxShadow: '1px 0 3px rgba(0,0,0,0.18)',
        }}>
          {/* Clip spring tension hint */}
          <div style={{
            position: 'absolute',
            top: '40%',
            left: 1,
            right: 1,
            height: 1,
            background: 'rgba(0,0,0,0.12)',
          }} />
        </div>
      </div>
    </div>
  );
}
