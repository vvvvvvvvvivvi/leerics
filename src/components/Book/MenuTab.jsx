import { songs } from '../../data/songs';

export default function MenuTab({ open, onToggle, onCover, onSong, activeSongId }) {
  return (
    <>
      {/* Tab trigger */}
      <button
        onClick={onToggle}
        aria-label={open ? '關閉目錄' : '開啟目錄'}
        aria-expanded={open}
        className="fixed right-0 top-1/2 z-50 cursor-pointer select-none"
        style={{
          writingMode: 'vertical-rl',
          textOrientation: 'mixed',
          background: '#E24B4A',
          color: '#fff',
          fontFamily: 'var(--font-wenkai)',
          fontSize: 13,
          fontWeight: 600,
          letterSpacing: '4px',
          padding: '16px 8px',
          border: 'none',
          borderTopLeftRadius: 6,
          borderBottomLeftRadius: 6,
          transform: open ? 'translateY(-50%) translateX(-236px)' : 'translateY(-50%)',
          transition: 'transform 0.3s ease',
          zIndex: 51,
        }}
      >
        目錄
      </button>

      {/* Flyout panel */}
      <div
        role="menu"
        aria-hidden={!open}
        className="fixed right-0 top-0 bottom-0 z-40 flex flex-col overflow-y-auto"
        style={{
          width: 236,
          background: '#F7F4DA',
          borderLeft: '2px solid #b090d0',
          transform: open ? 'translateX(0)' : 'translateX(100%)',
          transition: 'transform 0.3s ease',
          fontFamily: 'var(--font-wenkai)',
        }}
      >
        {/* Panel header */}
        <div
          className="flex items-center justify-between flex-shrink-0"
          style={{
            padding: '16px 20px 14px',
            borderBottom: '1px solid #b090d0',
          }}
        >
          <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: '4px', color: '#5F5E5A' }}>
            目錄
          </span>
          <button
            onClick={onToggle}
            aria-label="關閉目錄"
            style={{
              background: 'none', border: 'none', cursor: 'pointer',
              color: '#B4B2A9', fontSize: 18, lineHeight: 1, padding: '2px 4px',
            }}
          >
            ×
          </button>
        </div>

        {/* 返回封面 */}
        <button
          role="menuitem"
          onClick={onCover}
          className="text-left hover:bg-[#ead4fb] transition-colors flex-shrink-0"
          style={{
            padding: '12px 20px',
            fontSize: 12,
            color: '#5F5E5A',
            borderBottom: '1px solid #E7E3C0',
            letterSpacing: '1px',
          }}
        >
          ← 返回封面
        </button>

        {/* Song list */}
        <div className="flex flex-col">
          {songs.map((song, i) => {
            const isActive = song.id === activeSongId;
            return (
              <button
                key={song.id}
                role="menuitem"
                onClick={() => onSong(song.id)}
                className="text-left hover:bg-[#ead4fb] transition-colors"
                style={{
                  padding: '11px 20px',
                  borderBottom: '1px solid #E7E3C0',
                  display: 'flex',
                  alignItems: 'baseline',
                  gap: 12,
                  background: isActive ? '#F0ECC8' : 'transparent',
                }}
              >
                <span style={{
                  fontSize: 10,
                  color: isActive ? '#E24B4A' : '#b090d0',
                  fontVariantNumeric: 'tabular-nums',
                  letterSpacing: '1px',
                  flexShrink: 0,
                  width: 20,
                  textAlign: 'right',
                }}>
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span style={{ fontSize: 13, color: isActive ? '#E24B4A' : '#3A3A37', fontWeight: isActive ? 600 : 400 }}>
                  {song.title}
                  {song.subtitle && (
                    <span style={{ display: 'block', fontSize: 10, color: '#888780', fontWeight: 400, marginTop: 1 }}>
                      {song.subtitle}
                    </span>
                  )}
                </span>
                {isActive && (
                  <span style={{ marginLeft: 'auto', color: '#E24B4A', fontSize: 10, flexShrink: 0 }}>▶</span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Backdrop */}
      {open && (
        <div
          className="fixed inset-0 z-30"
          onClick={onToggle}
          aria-hidden="true"
          style={{ background: 'rgba(0,0,0,0.08)' }}
        />
      )}
    </>
  );
}
