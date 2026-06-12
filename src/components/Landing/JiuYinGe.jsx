import { forwardRef } from 'react';
import { songs, CATEGORIES } from '../../data/songs';

/**
 * JiuYinGe — 九因歌 (song index) page.
 *
 * Faithfully recreates the Hong Kong exercise-book back-cover format:
 * - outer 3px double black border
 * - boxed header 歌因九  (right-to-left)
 * - nine vertical columns ordered right-to-left (一 on far right)
 * - writing-mode: vertical-rl; text-orientation: mixed
 * - each column = one song category
 * - unused columns show 待續⋯ in muted grey
 *
 * All content is derived from the songs data — no hardcoded copy.
 */

// Nine column definitions (right-to-left order, so index 0 = rightmost)
const COLUMNS = [
  { label: '一', categoryKey: 'western',   title: '西洋流行' },
  { label: '二', categoryKey: 'kpop',      title: '韓國流行' },
  { label: '三', categoryKey: 'japanese',  title: '日本流行' },
  { label: '四', categoryKey: 'cantonese', title: '廣東流行' },
  { label: '五', categoryKey: null, title: null },
  { label: '六', categoryKey: null, title: null },
  { label: '七', categoryKey: null, title: null },
  { label: '八', categoryKey: null, title: null },
  { label: '九', categoryKey: null, title: null },
];

// Group songs by category
function songsByCategory() {
  const map = {};
  songs.forEach(s => {
    if (!map[s.category]) map[s.category] = [];
    map[s.category].push(s);
  });
  return map;
}

const CartoucheSVG = () => (
  <svg
    viewBox="0 0 160 32"
    xmlns="http://www.w3.org/2000/svg"
    className="absolute inset-0 w-full h-full"
    preserveAspectRatio="none"
  >
    {/* Simple geometric stand-in for the floral cartouche — traced from scan */}
    <rect x="1" y="1" width="158" height="30" rx="4" ry="4"
      fill="none" stroke="#1a1a18" strokeWidth="1.5"/>
    {/* Corner flourishes */}
    <path d="M8,1 Q1,1 1,8" fill="none" stroke="#1a1a18" strokeWidth="1"/>
    <path d="M152,1 Q159,1 159,8" fill="none" stroke="#1a1a18" strokeWidth="1"/>
    <path d="M8,31 Q1,31 1,24" fill="none" stroke="#1a1a18" strokeWidth="1"/>
    <path d="M152,31 Q159,31 159,24" fill="none" stroke="#1a1a18" strokeWidth="1"/>
    {/* Inner border */}
    <rect x="4" y="3" width="152" height="26" rx="2" ry="2"
      fill="none" stroke="#1a1a18" strokeWidth="0.75" strokeDasharray="2,2"/>
  </svg>
);

const JiuYinGe = forwardRef(function JiuYinGe({ onSongClick }, ref) {
  const byCat = songsByCategory();

  return (
    <div
      ref={ref}
      className="relative w-full h-full overflow-hidden flex flex-col"
      style={{
        background: '#F7F4DA',
        /* Double border via box-shadow to avoid layout impact */
        boxShadow: 'inset 0 0 0 3px #1a1a18, inset 0 0 0 6px #F7F4DA, inset 0 0 0 9px #1a1a18',
        fontFamily: 'var(--font-wenkai)',
      }}
    >
      {/* Header block ─ 歌因九 */}
      <div
        className="relative mx-auto mt-4"
        style={{ width: '75%', height: 40 }}
      >
        <CartoucheSVG />
        <div
          className="relative z-10 flex items-center justify-center w-full h-full"
          style={{
            writingMode: 'horizontal-tb',
            direction: 'rtl',
            fontSize: 18,
            fontWeight: 700,
            letterSpacing: '6px',
            color: '#1a1a18',
          }}
        >
          歌因九
        </div>
      </div>

      {/* Column headers (一–九, right-to-left) */}
      <div className="flex flex-row-reverse justify-stretch mt-2 mx-4">
        {COLUMNS.map(col => (
          <div
            key={col.label}
            className="flex-1 text-center text-xs font-semibold"
            style={{ color: '#1a1a18', letterSpacing: '1px' }}
          >
            {col.label}
          </div>
        ))}
      </div>

      {/* Separator */}
      <div className="mx-4 mt-1" style={{ height: 1, background: '#1a1a18' }} />

      {/* Nine vertical columns */}
      <div
        className="flex flex-row-reverse flex-1 mx-4 mb-4 mt-0 gap-0"
        style={{ minHeight: 0 }}
      >
        {COLUMNS.map((col, ci) => {
          const catSongs = col.categoryKey ? (byCat[col.categoryKey] || []) : [];
          const hasContent = catSongs.length > 0;

          return (
            <div
              key={col.label}
              className="flex-1 flex flex-col items-center overflow-hidden"
              style={{
                borderLeft: ci < COLUMNS.length - 1 ? '1px solid #C9C284' : 'none',
              }}
            >
              {/* Category title */}
              <div
                style={{
                  writingMode: 'vertical-rl',
                  textOrientation: 'mixed',
                  fontSize: 11,
                  fontWeight: 600,
                  color: hasContent ? '#2C2C2A' : '#B4B2A9',
                  letterSpacing: '1px',
                  marginTop: 8,
                  marginBottom: 4,
                }}
              >
                {col.title ?? '　'}
              </div>

              {/* Separator dot */}
              {hasContent && (
                <div style={{ width: 3, height: 3, borderRadius: '50%', background: '#888780', margin: '2px 0' }} />
              )}

              {/* Song entries */}
              {hasContent ? (
                catSongs.map(song => (
                  <button
                    key={song.id}
                    onClick={() => onSongClick(song.id)}
                    title={song.title}
                    style={{
                      writingMode: 'vertical-rl',
                      textOrientation: 'mixed',
                      fontSize: 10,
                      color: '#3A3A37',
                      background: 'none',
                      border: 'none',
                      cursor: 'pointer',
                      padding: '2px 0',
                      fontFamily: 'var(--font-wenkai)',
                      lineHeight: 1.4,
                      letterSpacing: '0.5px',
                      textDecoration: 'none',
                    }}
                    className="hover:text-[#E24B4A] transition-colors"
                  >
                    {song.title}
                  </button>
                ))
              ) : (
                <div
                  style={{
                    writingMode: 'vertical-rl',
                    textOrientation: 'mixed',
                    fontSize: 10,
                    color: '#B4B2A9',
                    marginTop: 8,
                    letterSpacing: '1px',
                  }}
                >
                  待續⋯
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
});

export default JiuYinGe;
