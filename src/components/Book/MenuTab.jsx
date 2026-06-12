import { songs } from '../../data/songs';

/**
 * 目錄 tab — protrudes from right edge of the book.
 * Tap-to-toggle on touch, hover-enhanced on desktop (never hover-only).
 * Flyout shows 返回封面 + numbered song list; current song highlighted in red.
 */
export default function MenuTab({ open, onToggle, onCover, onSong, activeSongId }) {
  return (
    <>
      {/* Tab trigger */}
      <button
        onClick={onToggle}
        aria-label={open ? '關閉目錄' : '開啟目錄'}
        aria-expanded={open}
        className="
          fixed right-0 top-1/2 -translate-y-1/2 z-50
          flex items-center justify-center
          writing-mode-vertical select-none
          cursor-pointer
          transition-transform duration-200
        "
        style={{
          writingMode: 'vertical-rl',
          textOrientation: 'mixed',
          background: '#E24B4A',
          color: '#fff',
          fontFamily: 'var(--font-wenkai)',
          fontSize: 14,
          fontWeight: 600,
          letterSpacing: '3px',
          padding: '14px 6px',
          borderTopLeftRadius: 6,
          borderBottomLeftRadius: 6,
          transform: open
            ? 'translateY(-50%) translateX(-4px)'
            : 'translateY(-50%)',
        }}
      >
        目錄
      </button>

      {/* Flyout panel */}
      <div
        role="menu"
        className="
          fixed right-0 top-0 bottom-0 z-40
          flex flex-col
          overflow-y-auto
          transition-transform duration-300 ease-in-out
        "
        style={{
          width: 220,
          background: '#F7F4DA',
          borderLeft: '1px solid #C9C284',
          transform: open ? 'translateX(0)' : 'translateX(100%)',
          paddingTop: 56,
          paddingBottom: 24,
          fontFamily: 'var(--font-wenkai)',
        }}
      >
        {/* 返回封面 */}
        <button
          role="menuitem"
          onClick={onCover}
          className="text-left px-5 py-3 text-sm hover:bg-[#EFE8AC] transition-colors"
          style={{ color: '#5F5E5A', borderBottom: '1px solid #E7E3C0' }}
        >
          返回封面
        </button>

        {/* Song list */}
        <div className="flex flex-col mt-1">
          {songs.map((song, i) => {
            const isActive = song.id === activeSongId;
            return (
              <button
                key={song.id}
                role="menuitem"
                onClick={() => onSong(song.id)}
                className="text-left px-5 py-3 text-sm hover:bg-[#EFE8AC] transition-colors"
                style={{
                  color: isActive ? '#E24B4A' : '#3A3A37',
                  fontWeight: isActive ? 600 : 400,
                  borderBottom: '1px solid #E7E3C0',
                }}
              >
                <span
                  className="inline-block mr-3 text-xs"
                  style={{ color: '#B4B2A9', minWidth: 20 }}
                >
                  {String(i + 1).padStart(2, '0')}
                </span>
                {song.title}
                {song.subtitle && (
                  <span className="block text-xs ml-8 mt-0.5" style={{ color: '#888780' }}>
                    {song.subtitle}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Backdrop on mobile */}
      {open && (
        <div
          className="fixed inset-0 z-30 sm:hidden"
          onClick={onToggle}
          aria-hidden="true"
          style={{ background: 'rgba(0,0,0,0.15)' }}
        />
      )}
    </>
  );
}
