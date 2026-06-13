/**
 * PlayBar — karaoke control strip, pinned to the bottom of the last song page.
 *
 * All interactive elements stopPropagation on mousedown/touchstart so
 * react-pageflip never intercepts clicks meant for the controls.
 */

function fmt(sec) {
  if (!sec || isNaN(sec)) return '0:00';
  const m = Math.floor(sec / 60);
  const s = Math.floor(sec % 60);
  return `${m}:${String(s).padStart(2, '0')}`;
}

function stopBubble(e) {
  e.stopPropagation();
}

export default function PlayBar({ song, playState, position, duration, onToggle, onSeek, compact }) {
  const pct = duration > 0 ? Math.min((position / duration) * 100, 100) : 0;

  return (
    <div
      className="absolute left-0 right-0 flex items-center gap-3"
      style={{
        bottom: 0,
        height: 48,
        padding: '0 14px',
        borderTop: '1px dashed #D3D1C7',
        background: '#EDE8D0',
        fontFamily: 'var(--font-wenkai)',
        zIndex: 5,
      }}
      onMouseDown={stopBubble}
      onTouchStart={stopBubble}
    >
      {/* Song title */}
      <span style={{
        fontSize: 9,
        color: '#B4B2A9',
        letterSpacing: '2px',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        maxWidth: 70,
        flexShrink: 0,
      }}>
        {song.title}
      </span>

      {/* Play / Pause */}
      <button
        onClick={onToggle}
        aria-label={playState === 'playing' ? '暫停' : '播放'}
        className="flex-shrink-0 hover:opacity-70 transition-opacity"
        style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
      >
        {playState === 'playing' ? <PauseIcon /> : <PlayIcon />}
      </button>

      {/* Progress track */}
      <div className="flex-1 relative" style={{ height: 20 }}>
        <div className="absolute rounded-full" style={{
          height: 4, top: '50%', transform: 'translateY(-50%)',
          left: 0, right: 0, background: '#E5E1BE',
        }} />
        <div className="absolute rounded-full" style={{
          height: 4, top: '50%', transform: 'translateY(-50%)',
          left: 0, width: `${pct}%`,
          background: '#9b59d4',
          transition: 'width 0.25s linear',
        }} />
        <div className="absolute" style={{
          width: 11, height: 11, borderRadius: '50%',
          background: '#9b59d4',
          top: '50%', left: `${pct}%`,
          transform: 'translate(-50%, -50%)',
          transition: 'left 0.25s linear',
        }} />
        <input
          type="range"
          min={0}
          max={duration || 100}
          step={0.5}
          value={position}
          onChange={e => onSeek(Number(e.target.value))}
          className="absolute inset-0 w-full cursor-pointer"
          style={{ opacity: 0 }}
          aria-label="播放進度"
        />
      </div>

      {/* Timestamp */}
      <span style={{
        fontSize: 10,
        color: '#5F5E5A',
        fontFamily: 'ui-monospace, monospace',
        fontVariantNumeric: 'tabular-nums',
        letterSpacing: '0.3px',
        whiteSpace: 'nowrap',
        flexShrink: 0,
      }}>
        {fmt(position)}&thinsp;/&thinsp;{fmt(duration)}
      </span>
    </div>
  );
}

function PlayIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
      <circle cx="9" cy="9" r="8.5" stroke="#b090d0"/>
      <polygon points="7,5.5 13.5,9 7,12.5" fill="#3A3A37"/>
    </svg>
  );
}

function PauseIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
      <circle cx="9" cy="9" r="8.5" stroke="#b090d0"/>
      <rect x="5.5" y="5.5" width="2.5" height="7" rx="1" fill="#3A3A37"/>
      <rect x="10" y="5.5" width="2.5" height="7" rx="1" fill="#3A3A37"/>
    </svg>
  );
}
