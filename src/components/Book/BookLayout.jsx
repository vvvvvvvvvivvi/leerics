import { useRef, useState, useEffect } from 'react';
import HTMLFlipBook from 'react-pageflip';
import { songs } from '../../data/songs';
import MenuTab from './MenuTab';
import CoverLeft from '../Landing/CoverLeft';
import JiuYinGe from '../Landing/JiuYinGe';
import SongSpread from '../Song/SongSpread';
import { useViewport } from '../../hooks/useViewport';

const BOOK_MAX_WIDTH  = 1200;
const PAGE_ASPECT     = 0.707;
const MOBILE_NAV_H    = 52;
const MOBILE_RHYTHM   = 32;
// Content must clear PlayBar (48px above nav bar) + nav bar (52px) + gap (4px)
const COMPACT_BOTTOM  = 104;
// Approximate pixel heights for the two header types in compact mode
const COMPACT_FIRST_HEADER_H = 80; // rule + credit + title + divider + margins
const COMPACT_CONT_HEADER_H  = 25; // paddingTop + running-title lineHeight

/**
 * Flatten all song lines and re-split so every mobile page fits on screen.
 * Returns a new pages array whose length may differ from the original two pages.
 */
function splitSongForMobile(song, firstCap, contCap) {
  const allLines = song.pages.flat();
  if (allLines.length === 0) return [[]];
  const pages = [allLines.slice(0, firstCap)];
  let start = firstCap;
  while (start < allLines.length) {
    pages.push(allLines.slice(start, start + contCap));
    start += contCap;
  }
  return pages;
}

export default function BookLayout() {
  const flipRef = useRef(null);
  const [currentPage, setCurrentPage]   = useState(0);
  const [activeSongId, setActiveSongId] = useState(null);
  const [menuOpen, setMenuOpen]         = useState(false);
  const { w: vw, h: vh, isMobile } = useViewport();

  // ── Mobile pagination ────────────────────────────────────────────────────
  // How many lines fit per page type (floor so content never overflows)
  const firstCap = Math.max(4, Math.floor((vh - COMPACT_FIRST_HEADER_H - COMPACT_BOTTOM) / MOBILE_RHYTHM));
  const contCap  = Math.max(4, Math.floor((vh - COMPACT_CONT_HEADER_H  - COMPACT_BOTTOM) / MOBILE_RHYTHM));

  // Re-paginated songs for mobile; desktop songs are unchanged
  const mobileSongs = songs.map(song => ({
    ...song,
    pages: splitSongForMobile(song, firstCap, contCap),
  }));

  // mobileOffsets[i] = flip-page index of songs[i]'s first lyric page
  // page 0 = cover; song pages follow immediately (no 九因歌 on mobile)
  const mobileOffsets = [];
  let mobileOffset = 1;
  mobileSongs.forEach(song => {
    mobileOffsets.push(mobileOffset);
    mobileOffset += song.pages.length;
  });
  const totalMobilePages = mobileOffset;

  // Keep refs so the stable event handler always sees the latest values
  const mobileOffsetsRef = useRef(mobileOffsets);
  mobileOffsetsRef.current = mobileOffsets;
  const isMobileRef = useRef(isMobile);
  isMobileRef.current = isMobile;

  // ── Navigation ───────────────────────────────────────────────────────────
  const goToSong = (songId) => {
    const idx = songs.findIndex(s => s.id === songId);
    if (idx === -1) return;
    setActiveSongId(songId);
    setMenuOpen(false);
    const page = isMobile ? mobileOffsets[idx] : (2 + idx * 2);
    flipRef.current?.pageFlip()?.flip(page);
  };

  const goToCover = () => {
    setActiveSongId(null);
    setMenuOpen(false);
    flipRef.current?.pageFlip()?.flip(0);
  };

  const onFlip = (e) => {
    const p = e.data;
    setCurrentPage(p);

    if (!isMobileRef.current) {
      setActiveSongId(p < 2 ? null : (songs[Math.floor((p - 2) / 2)]?.id ?? null));
      return;
    }
    if (p === 0) { setActiveSongId(null); return; }
    const offs = mobileOffsetsRef.current;
    let found = null;
    for (let i = 0; i < songs.length; i++) {
      const end = i < songs.length - 1 ? offs[i + 1] : Infinity;
      if (p >= offs[i] && p < end) { found = songs[i].id; break; }
    }
    setActiveSongId(found);
  };

  // Auto page-turn: karaoke crosses a page boundary during playback
  useEffect(() => {
    function handlePageChange(e) {
      const { songId, pageIdx } = e.detail;
      const songIdx = songs.findIndex(s => s.id === songId);
      if (songIdx === -1) return;
      const targetPage = isMobileRef.current
        ? (mobileOffsetsRef.current[songIdx] ?? 0) + pageIdx
        : 2 + songIdx * 2 + pageIdx;
      flipRef.current?.pageFlip()?.flip(targetPage);
    }
    window.addEventListener('karaoke-page-change', handlePageChange);
    return () => window.removeEventListener('karaoke-page-change', handlePageChange);
  }, []); // stable — reads isMobile and offsets via refs

  // ── Page arrays ──────────────────────────────────────────────────────────
  const desktopPages = [
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
        />
      ))
    ),
  ];

  const mobilePages = [
    <CoverLeft key="cover-left" onStickerClick={goToSong} />,
    ...songs.flatMap((song, si) =>
      mobileSongs[si].pages.map((_, pi) => (
        <SongSpread
          key={`${song.id}-p${pi}`}
          song={mobileSongs[si]}
          pageIndex={pi}
          totalPages={mobileSongs[si].pages.length}
          absolutePageNum={mobileOffsets[si] + pi}
          compact
        />
      ))
    ),
  ];

  const totalDesktopPages = desktopPages.length;
  const canPrev        = currentPage > 0;
  const canNextDesktop = currentPage < totalDesktopPages - 2;
  const canNextMobile  = currentPage < totalMobilePages - 1;

  return (
    <div
      className="relative flex flex-col items-center justify-center w-full min-h-screen"
      style={{ background: isMobile ? '#F7F4DA' : '#ddbef7' }}
    >

      {isMobile ? (
        /* ── Mobile: full-screen single-page flipbook ─────────────────────── */
        <div className="relative w-full" style={{ height: vh, overflow: 'hidden' }}>
          <HTMLFlipBook
            ref={flipRef}
            key="mobile"
            width={vw}
            height={vh}
            size="fixed"
            usePortrait={true}
            showCover={false}
            flippingTime={450}
            useMouseEvents={false}
            mobileScrollSupport={false}
            drawShadow={false}
            startPage={0}
            onFlip={onFlip}
          >
            {mobilePages}
          </HTMLFlipBook>
        </div>
      ) : (
        /* ── Desktop: two-page spread ──────────────────────────────────────── */
        <div className="relative w-full" style={{ maxWidth: BOOK_MAX_WIDTH }}>
          <HTMLFlipBook
            ref={flipRef}
            key="desktop"
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
            useMouseEvents={false}
            clickEventForward={true}
            onFlip={onFlip}
            className="mx-auto"
          >
            {desktopPages}
          </HTMLFlipBook>

          {/* Spine */}
          <div
            className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 z-10 pointer-events-none"
            style={{ width: 14, background: '#c4a0e8' }}
          />

          {canPrev && (
            <button
              onClick={() => flipRef.current?.pageFlip()?.flipPrev()}
              aria-label="上一頁"
              className="absolute left-0 top-1/2 -translate-y-1/2 z-20 flex items-center justify-center transition-opacity hover:opacity-100 opacity-50"
              style={{
                width: 36, height: 56,
                background: 'rgba(196,160,232,0.7)',
                border: 'none', cursor: 'pointer',
                borderRadius: '0 4px 4px 0',
              }}
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M10 3 L5 8 L10 13" stroke="#2C2C2A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          )}

          {canNextDesktop && (
            <button
              onClick={() => flipRef.current?.pageFlip()?.flipNext()}
              aria-label="下一頁"
              className="absolute right-0 top-1/2 -translate-y-1/2 z-20 flex items-center justify-center transition-opacity hover:opacity-100 opacity-50"
              style={{
                width: 36, height: 56,
                background: 'rgba(196,160,232,0.7)',
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
      )}

      {/* Mobile bottom nav bar */}
      {isMobile && (
        <div
          className="fixed bottom-0 left-0 right-0 z-20 flex items-center justify-between"
          style={{
            height: MOBILE_NAV_H,
            paddingLeft: 28,
            paddingRight: 28,
            background: '#F7F4DA',
            borderTop: '1px solid #b090d0',
            fontFamily: 'var(--font-wenkai)',
          }}
        >
          <button
            onClick={() => flipRef.current?.pageFlip()?.flipPrev()}
            disabled={!canPrev}
            aria-label="上一頁"
            style={{
              background: 'none', border: 'none',
              cursor: canPrev ? 'pointer' : 'default',
              opacity: canPrev ? 1 : 0.25,
              padding: '8px 4px',
              fontSize: 18, color: '#2C2C2A', lineHeight: 1,
            }}
          >←</button>

          <span style={{ fontSize: 10, color: '#B4B2A9', letterSpacing: '2px' }}>
            {currentPage + 1}&thinsp;/&thinsp;{totalMobilePages}
          </span>

          <button
            onClick={() => flipRef.current?.pageFlip()?.flipNext()}
            disabled={!canNextMobile}
            aria-label="下一頁"
            style={{
              background: 'none', border: 'none',
              cursor: canNextMobile ? 'pointer' : 'default',
              opacity: canNextMobile ? 1 : 0.25,
              padding: '8px 4px',
              fontSize: 18, color: '#2C2C2A', lineHeight: 1,
            }}
          >→</button>
        </div>
      )}

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
