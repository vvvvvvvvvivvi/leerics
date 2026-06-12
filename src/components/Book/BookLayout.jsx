import { useRef, useState, useCallback } from 'react';
import HTMLFlipBook from 'react-pageflip';
import { songs } from '../../data/songs';
import MenuTab from './MenuTab';
import CoverLeft from '../Landing/CoverLeft';
import JiuYinGe from '../Landing/JiuYinGe';
import SongSpread from '../Song/SongSpread';

/**
 * BookLayout
 *
 * Renders the open two-page exercise-book spread.
 * - Desktop: react-pageflip double-page spread, max-width ~1200px
 * - Mobile (<640px): single-page portrait mode, no flip animation
 *
 * Page sequence (react-pageflip pages array, 0-indexed):
 *   0 = cover left (scanned image)
 *   1 = 九因歌 (index)
 *   2,3 = song 0 page 1 (left) + page 2 (right)
 *   4,5 = song 1 …  etc.
 */

const BOOK_MAX_WIDTH  = 1200;
const PAGE_ASPECT     = 0.707; // A4-ish: width/height

export default function BookLayout() {
  const flipRef  = useRef(null);
  const [currentPage, setCurrentPage]   = useState(0);
  const [activeSongId, setActiveSongId] = useState(null);
  const [menuOpen, setMenuOpen]         = useState(false);

  // Build the flat page list ─────────────────────────────────────────────────
  // spread 0 → pages 0,1  (landing)
  // spread n → pages 2n, 2n+1
  // song i, page j  → absolute page = 2 + i*2 + j  (but songs have 2 pages each)

  const goToSong = useCallback((songId) => {
    const idx = songs.findIndex(s => s.id === songId);
    if (idx === -1) return;
    const pageNum = 2 + idx * 2; // first page of that song
    setActiveSongId(songId);
    setMenuOpen(false);
    if (flipRef.current?.pageFlip) {
      flipRef.current.pageFlip().flip(pageNum);
    }
  }, []);

  const goToCover = useCallback(() => {
    setActiveSongId(null);
    setMenuOpen(false);
    if (flipRef.current?.pageFlip) {
      flipRef.current.pageFlip().flip(0);
    }
  }, []);

  const onFlip = useCallback((e) => {
    const p = e.data;
    setCurrentPage(p);
    // Determine which song is visible
    if (p < 2) {
      setActiveSongId(null);
    } else {
      const idx = Math.floor((p - 2) / 2);
      setActiveSongId(songs[idx]?.id ?? null);
    }
  }, []);

  // Build rendered pages ─────────────────────────────────────────────────────
  const allPages = [
    <CoverLeft key="cover-left" onStickerClick={goToSong} />,
    <JiuYinGe key="jiuyinge" onSongClick={goToSong} />,
    ...songs.flatMap((song, si) =>
      song.pages.map((_, pi) => (
        <SongSpread
          key={`${song.id}-p${pi}`}
          song={song}
          pageIndex={pi}
          totalPages={song.pages.length}
          absolutePageNum={2 + si * 2 + pi}
          activeSongId={activeSongId}
          isLeft={pi % 2 === 0}
        />
      ))
    ),
  ];

  return (
    <div
      className="relative flex items-center justify-center w-full min-h-screen"
      style={{ background: '#CECA9E' }}
    >
      {/* Book wrapper — centred, capped width */}
      <div
        className="relative w-full"
        style={{ maxWidth: BOOK_MAX_WIDTH }}
      >
        {/* Desktop flip book */}
        <div className="hidden sm:block">
          <HTMLFlipBook
            ref={flipRef}
            width={Math.floor(BOOK_MAX_WIDTH / 2)}
            height={Math.floor((BOOK_MAX_WIDTH / 2) / PAGE_ASPECT)}
            size="stretch"
            minWidth={280}
            maxWidth={620}
            minHeight={395}
            maxHeight={875}
            showCover={true}
            flippingTime={600}
            usePortrait={false}
            startPage={0}
            drawShadow={false}
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
        </div>

        {/* Mobile single-page stack */}
        <div className="block sm:hidden">
          {allPages.map((page, i) => (
            <div key={i} className="w-full">
              {page}
            </div>
          ))}
        </div>
      </div>

      {/* 目錄 tab + flyout */}
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
