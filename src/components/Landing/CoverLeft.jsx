import { forwardRef } from 'react';
import { songs } from '../../data/songs';

/**
 * CoverLeft — the scanned exercise-book cover rendered as a page.
 *
 * The real scan sits at /public/assets/cover/cover.webp.
 * Invisible <button> hotspots are overlaid at percentage positions;
 * one sticker ≡ one song.
 */
const CoverLeft = forwardRef(function CoverLeft({ onStickerClick }, ref) {
  return (
    <div
      ref={ref}
      className="relative w-full h-full overflow-hidden"
      style={{
        background: '#EFE8AC',
        border: '3px solid #C9C284',
      }}
    >
      {/* Scanned cover image — fills the page */}
      <img
        src="/assets/cover/cover.png"
        alt="Eiro 2020-2025 填詞作品集 封面"
        className="absolute inset-0 w-full h-full object-cover select-none pointer-events-none"
        draggable={false}
      />

      {/* Sticker hotspots — positioned with % coords so they scale */}
      {songs.map((song) => (
        <button
          key={song.id}
          aria-label={`開啟 ${song.title}`}
          onClick={() => onStickerClick(song.id)}
          className="absolute cursor-pointer rounded-sm focus:outline-none focus:ring-2 focus:ring-[#E24B4A]"
          style={{
            top: song.stickerPos.top,
            left: song.stickerPos.left,
            width: '14%',
            height: '9%',
            background: 'transparent',
            border: 'none',
            zIndex: 10,
          }}
        />
      ))}
    </div>
  );
});

export default CoverLeft;
