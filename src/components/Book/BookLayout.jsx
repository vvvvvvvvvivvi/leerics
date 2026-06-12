import { useRef, useState, useCallback } from 'react';
import HTMLFlipBook from 'react-pageflip';
import { songs } from '../../data/songs';
import MenuTab from './MenuTab';
import CoverLeft from '../Landing/CoverLeft';
import JiuYinGe from '../Landing/JiuYinGe';
import SongSpread from '../Song/SongSpread';

const BOOK_MAX_WIDTH = 1200;
const PAGE_ASPECT    = 0.707; // portrait ratio

export default function BookLayout() {
  const flipRef = useRef(null);
  const [currentPage, setCurrentPage]   = useState(0);
  const [activeSongId, setActiveSongId] = useState(null);
  const [menuOpen, setMenuOpen]         = useState(false);

  // Page map:
  //   0 = cover left,  1 = 九因歌 right  (landing spread)
  //   2+  = song pages in pairs

  const goToSong = useCallback((songId) => {
    const idx = songs.findIndex(s => s.id === songId);
    if (idx === -1) return;
    setActiveSongId(songId);
    setMenuOpen(false);
    flipRef.current?.pageFlip()?.flip(2 + idx * 2);
  }, []);

  const goToCover = useCallback(() => {
    setActiveSongId(null);
    setMenuOpen(false);
    flipRef.current?.pageFlip()?.flip(0);
  }, []);

  const onFlip = useCallback((e) => {
    const p = e.data;
    setCurrentPage(p);
    if (p < 2) {
      setActiveSongId(null);
    } else {
      setActiveSongId(songs[Math.floor((p - 2) / 2)]?.id ?? null);
    }
  }, []);

  const totalPages = 2 + songs.reduce((n, s) => n + s.pages.length, 0);

  const allPages = [
    <CoverLeft key="cover-left" onStickerClick={goToSong} />,
    <JiuYinGe  key="jiuyinge"   onSongClick={goToSong} />,
    ...songs.flatMap((song, si) =>
      song.pages.map((_, pi) => (
        <SongSpread
          key={`${song.id}-p${pi}`}
          song={song}
          pageIndex={pi}
          totalPages={song.pages.length}
          absolutePageNum={2 + si * 2 + pi}
          activeSongId={activeSongId}
        />
      ))
    ),
  ];

  const canPrev = currentPage > 0;
  const canNext = currentPage < totalPages - 2;

  return (
    <div
      className="relative flex flex-col items-center justify-center w-full min-h-screen"
      style={{ background: '#CECA9E' }}
    >
      {/* Book wrapper */}
      <div className="relative w-full" style={{ maxWidth: BOOK_MAX_WIDTH }}>

        {/* ── Desktop flip book ── */}
        <div className="hidden sm:block">
          <HTMLFlipBook
            ref={flipRef}
            width={Math.floor(BOOK_MAX_WIDTH / 2)}
            height={Math.floor(BOOK_MAX_WIDTH / 2 / PAGE_ASPECT)}
            size="stretch"
            minWidth={300}
            maxWidth={600}
            minHeight={424}
            maxHeight={848}
            showCover={false}
            flippingTime={700}
            usePortrait={false}
            startPage={0}
            drawShadow={false}
            /* Disable click-anywhere-to-flip so links/buttons work */
            disableFlipByClick={true}
            /* Require intentional swipe */
            swipeDistance={40}
            /* Forward click events to page content */
            clickEventForward={true}
            onFlip={onFlip}
            className="mx-auto"
          >
            {allPages}
          </HTMLFlipBook>

          {/* Spine */}
          <div
            className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 z-10 pointer-events-none"
            style={{ width: 14, background: '#D8D196' }}
          />

          {/* ← → corner navigation arrows */}
          {canPrev && (
            <button
              onClick={() => flipRef.current?.pageFlip()?.flipPrev()}
              aria-label="上一頁"
              className="absolute left-0 top-1/2 -translate-y-1/2 z-20 flex items-center justify-center transition-opacity hover:opacity-100 opacity-50"
              style={{
                width: 36, height: 56,
                background: 'rgba(216,209,150,0.7)',
                border: 'none', cursor: 'pointer',
                borderRadius: '0 4px 4px 0',
              }}
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M10 3 L5 8 L10 13" stroke="#2C2C2A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          )}
          {canNext && (
            <button
              onClick={() => flipRef.current?.pageFlip()?.flipNext()}
              aria-label="下一頁"
              className="absolute right-0 top-1/2 -translate-y-1/2 z-20 flex items-center justify-center transition-opacity hover:opacity-100 opacity-50"
              style={{
                width: 36, height: 56,
                background: 'rgba(216,209,150,0.7)',
                border: 'none', cursor: 'pointer',
                borderRadius: '4px 0 0 4px',
              }}
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M6 3 L11 8 L6 13" stroke="#2C2C2A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          )}
        </div>

        {/* ── Mobile single-page stack ── */}
        <div className="block sm:hidden">
          {allPages.map((page, i) => (
            <div key={i} className="w-full" style={{ minHeight: '100dvh' }}>
              {page}
            </div>
          ))}
        </div>
      </div>

      {/* 目錄 tab */}
      <MenuTab
        open={menuOpen}
        onToggle={() => setMenuOpen(o => !o)}
        onCover={goToCover}
        onSong={goToSong}
        activeSongId={activeSongId}
      />
    </div>
  );
}
