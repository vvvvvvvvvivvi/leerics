/**
 * PlayBar — karaoke control strip.
 *
 * Spec:
 * - Dashed top border #D3D1C7
 * - Pause/play Tabler-style icon
 * - 5px track #E5E1BE with red #E24B4A fill + 12px red dot thumb
 * - Monospace timestamp  1:17 / 3:02  in #5F5E5A
 */

function fmt(sec) {
  if (!sec || isNaN(sec)) return '0:00';
  const m = Math.floor(sec / 60);
  const s = Math.floor(sec % 60);
  return `${m}:${String(s).padStart(2, '0')}`;
}

export default function PlayBar({ song, playState, position, duration, onToggle, onSeek }) {
  const pct = duration > 0 ? (position / duration) * 100 : 0;

  return (
    <div
      className="absolute bottom-0 left-0 right-0 flex items-center gap-3 px-4"
      style={{
        height: 48,
        borderTop: '1px dashed #D3D1C7',
        background: '#F7F4DA',
        fontFamily: 'var(--font-wenkai)',
      }}
    >
      {/* Play / Pause button */}
      <button
        onClick={onToggle}
        aria-label={playState === 'playing' ? '暫停' : '播放'}
        className="flex-shrink-0 hover:opacity-70 transition-opacity"
        style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
      >
        {playState === 'playing' ? <PauseIcon /> : <PlayIcon />}
      </button>

      {/* Progress track */}
      <div className="flex-1 relative flex items-center" style={{ height: 20 }}>
        {/* Track background */}
        <div
          className="absolute inset-y-0 my-auto rounded-full"
          style={{ height: 5, left: 0, right: 0, background: '#E5E1BE' }}
        />
        {/* Fill */}
        <div
          className="absolute inset-y-0 my-auto rounded-full"
          style={{
            height: 5,
            left: 0,
            width: `${pct}%`,
            background: '#E24B4A',
            transition: 'width 0.3s linear',
          }}
        />
        {/* Thumb */}
        <div
          className="absolute"
          style={{
            width: 12,
            height: 12,
            borderRadius: '50%',
            background: '#E24B4A',
            top: '50%',
            left: `${pct}%`,
            transform: 'translate(-50%, -50%)',
            transition: 'left 0.3s linear',
          }}
        />
        {/* Click target */}
        <input
          type="range"
          min={0}
          max={duration || 100}
          step={0.1}
          value={position}
          onChange={e => onSeek(Number(e.target.value))}
          className="absolute inset-0 w-full opacity-0 cursor-pointer"
          aria-label="播放進度"
        />
      </div>

      {/* Timestamp */}
      <span
        style={{
          fontSize: 11,
          color: '#5F5E5A',
          fontVariantNumeric: 'tabular-nums',
          letterSpacing: '0.5px',
          whiteSpace: 'nowrap',
          fontFamily: 'ui-monospace, monospace',
        }}
      >
        {fmt(position)} / {fmt(duration)}
      </span>
    </div>
  );
}

function PlayIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#3A3A37" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="5,3 19,12 5,21" fill="#3A3A37" stroke="none"/>
    </svg>
  );
}

function PauseIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#3A3A37" strokeWidth="2" strokeLinecap="round">
      <line x1="6" y1="4" x2="6" y2="20"/>
      <line x1="18" y1="4" x2="18" y2="20"/>
    </svg>
  );
}
