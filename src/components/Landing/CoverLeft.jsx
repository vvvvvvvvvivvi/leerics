import { forwardRef, useState } from 'react';
import { songs } from '../../data/songs';
import frontImg from '../../assets/front.png';

/**
 * CoverLeft — scanned exercise-book cover.
 * Invisible hotspot buttons sit over each sticker at percentage coordinates.
 */
const CoverLeft = forwardRef(function CoverLeft({ onStickerClick }, ref) {
  const [imgError, setImgError] = useState(false);

  return (
    <div
      ref={ref}
      className="relative w-full h-full overflow-hidden select-none"
      style={{ background: '#E0CCEC', border: '1px solid rgba(160,120,200,0.2)' }}
    >
      {/* Scanner gutter shadow — cover is left page so shadow on right edge */}
      <div style={{
        position: 'absolute', top: 0, bottom: 0, right: 0, width: 64, zIndex: 8,
        background: 'linear-gradient(to left, rgba(0,0,0,0.14) 0%, rgba(0,0,0,0.06) 45%, transparent 100%)',
        pointerEvents: 'none',
      }} />
      {/* Edge vignette */}
      <div style={{
        position: 'absolute', inset: 0, zIndex: 7,
        background: 'radial-gradient(ellipse at center, transparent 60%, rgba(0,0,0,0.06) 100%)',
        pointerEvents: 'none',
      }} />
      {/* Scanned cover */}
      {!imgError ? (
        <img
          src={frontImg}
          alt="Eiro 2020–2025 填詞作品集 封面"
          className="absolute inset-0 w-full h-full object-cover pointer-events-none"
          draggable={false}
          onError={() => setImgError(true)}
        />
      ) : (
        /* Fallback if image not yet exported */
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 p-8"
          style={{ background: '#ead4fb' }}>
          <p style={{ fontFamily: 'var(--font-wenkai)', fontSize: 28, fontWeight: 500,
            letterSpacing: '8px', color: '#2C2C2A', fontStyle: 'italic' }}>
            Portfolio
          </p>
          <p style={{ fontFamily: 'var(--font-wenkai)', fontSize: 13, letterSpacing: '3px',
            color: '#5F5E5A' }}>BOOK</p>
          <div style={{ width: 120, height: 1, background: '#b090d0', margin: '8px 0' }} />
          <p style={{ fontFamily: 'var(--font-wenkai)', fontStyle: 'italic', fontSize: 22,
            color: '#3A3A37', letterSpacing: '2px' }}>Eiro</p>
          <p style={{ fontFamily: 'var(--font-wenkai)', fontSize: 12, color: '#5F5E5A',
            letterSpacing: '1px' }}>2020 – 2025 填詞作品集</p>
        </div>
      )}

      {/* Sticker hotspots */}
      {songs.map((song) => (
        <button
          key={song.id}
          aria-label={`開啟 ${song.title}`}
          onClick={() => onStickerClick(song.id)}
          onMouseDown={e => e.stopPropagation()}
          onTouchStart={e => e.stopPropagation()}
          className="absolute cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#9b59d4] rounded"
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
