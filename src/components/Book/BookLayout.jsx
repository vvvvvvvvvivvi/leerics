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

// Mobile layout constants (no bottom nav bar; PlayBar at bottom: 0)
const MOBILE_RHYTHM          = 32;
const COMPACT_BOTTOM         = 56;  // PlayBar 48px + 8px gap
const COMPACT_FIRST_HEADER_H = 80;
const COMPACT_CONT_HEADER_H  = 25;

// Desktop layout constants
const DESKTOP_RHYTHM          = 38;
const DESKTOP_FIRST_HEADER_H  = 80;
const DESKTOP_CONT_HEADER_H   = 30;
const DESKTOP_PLAYBAR_RESERVE = 54; // playbar height used conservatively for all pages

/**
 * Flatten all song lines and re-split so every page fits on screen.
 */
function splitSongPages(song, firstCap, contCap) {
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
  const mobileFirstCap = Math.max(4, Math.floor((vh - COMPACT_FIRST_HEADER_H - COMPACT_BOTTOM) / MOBILE_RHYTHM));
  const mobileContCap  = Math.max(4, Math.floor((vh - COMPACT_CONT_HEADER_H  - COMPACT_BOTTOM) / MOBILE_RHYTHM));

  const mobileSongs = songs.map(song => ({
    ...song,
    pages: splitSongPages(song, mobileFirstCap, mobileContCap),
  }));

  const mobileOffsets = [];
  let mobileOffset = 1; // page 0 = cover
  mobileSongs.forEach(song => {
    mobileOffsets.push(mobileOffset);
    mobileOffset += song.pages.length;
  });
  const totalMobilePages = mobileOffset;

  // ── Desktop pagination ───────────────────────────────────────────────────
  // Estimate rendered page height from viewport width
  const desktopPageH = Math.min(
    Math.floor(Math.min(vw / 2, 600) / PAGE_ASPECT),
    848
  );
  const desktopFirstCap = Math.max(4, Math.floor(
    (desktopPageH - DESKTOP_FIRST_HEADER_H - DESKTOP_PLAYBAR_RESERVE) / DESKTOP_RHYTHM
  ));
  const desktopContCap = Math.max(4, Math.floor(
    (desktopPageH - DESKTOP_CONT_HEADER_H - DESKTOP_PLAYBAR_RESERVE) / DESKTOP_RHYTHM
  ));

  const desktopSongs = songs.map(song => ({
    ...song,
    pages: splitSongPages(song, desktopFirstCap, desktopContCap),
  }));

  const desktopOffsets = [];
  let desktopOffset = 2; // page 0 = cover, page 1 = jiuyinge
  desktopSongs.forEach(song => {
    desktopOffsets.push(desktopOffset);
    desktopOffset += song.pages.length;
  });
  const totalDesktopPages = desktopOffset;

  // Stable refs so event handlers always see latest values
  const mobileOffsetsRef  = useRef(mobileOffsets);  mobileOffsetsRef.current  = mobileOffsets;
  const desktopOffsetsRef = useRef(desktopOffsets); desktopOffsetsRef.current = desktopOffsets;
  const isMobileRef       = useRef(isMobile);       isMobileRef.current       = isMobile;

  // ── Navigation ───────────────────────────────────────────────────────────
  const goToSong = (songId) => {
    const idx = songs.findIndex(s => s.id === songId);
    if (idx === -1) return;
    setActiveSongId(songId);
    setMenuOpen(false);
    const page = isMobile ? mobileOffsets[idx] : desktopOffsets[idx];
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

    if (isMobileRef.current) {
      if (p === 0) { setActiveSongId(null); return; }
      const offs = mobileOffsetsRef.current;
      let found = null;
      for (let i = 0; i < songs.length; i++) {
        const end = i < songs.length - 1 ? offs[i + 1] : Infinity;
        if (p >= offs[i] && p < end) { found = songs[i].id; break; }
      }
      setActiveSongId(found);
    } else {
      if (p < 2) { setActiveSongId(null); return; }
      const offs = desktopOffsetsRef.current;
      let found = null;
      for (let i = 0; i < songs.length; i++) {
        const end = i < songs.length - 1 ? offs[i + 1] : Infinity;
        if (p >= offs[i] && p < end) { found = songs[i].id; break; }
      }
      setActiveSongId(found);
    }
  };

  // Auto page-turn: karaoke crosses a page boundary during playback
  useEffect(() => {
    function handlePageChange(e) {
      const { songId, pageIdx } = e.detail;
      const songIdx = songs.findIndex(s => s.id === songId);
      if (songIdx === -1) return;
      const targetPage = isMobileRef.current
        ? (mobileOffsetsRef.current[songIdx] ?? 0) + pageIdx
        : (desktopOffsetsRef.current[songIdx] ?? 0) + pageIdx;
      flipRef.current?.pageFlip()?.flip(targetPage);
    }
    window.addEventListener('karaoke-page-change', handlePageChange);
    return () => window.removeEventListener('karaoke-page-change', handlePageChange);
  }, []); // stable — reads changing values via refs

  // ── Page arrays ──────────────────────────────────────────────────────────
  const desktopPages = [
    <CoverLeft key="cover-left" onStickerClick={goToSong} />,
    <JiuYinGe  key="jiuyinge"   onSongClick={goToSong} />,
    ...desktopSongs.flatMap((song, si) =>
      song.pages.map((_, pi) => (
        <SongSpread
          key={`d-${song.id}-p${pi}`}
          song={song}
          pageIndex={pi}
          totalPages={song.pages.length}
          absolutePageNum={desktopOffsets[si] + pi}
        />
      ))
    ),
  ];

  const mobilePages = [
    <CoverLeft key="cover-left" onStickerClick={goToSong} />,
    ...mobileSongs.flatMap((song, si) =>
      song.pages.map((_, pi) => (
        <SongSpread
          key={`m-${song.id}-p${pi}`}
          song={song}
          pageIndex={pi}
          totalPages={song.pages.length}
          absolutePageNum={mobileOffsets[si] + pi}
          compact
        />
      ))
    ),
  ];

  const canPrev         = currentPage > 0;
  const canNextDesktop  = currentPage < totalDesktopPages - 2;
  const canNextMobile   = currentPage < totalMobilePages - 1;

  return (
    <div
      className="relative flex flex-col items-center justify-center w-full min-h-screen"
      style={{ background: isMobile ? '#F7F4DA' : '#f0eaf8' }}
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
            style={{ width: 7, background: '#c4a0e8' }}
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

      {/* Mobile ghost nav: small edge chevrons, no bar */}
      {isMobile && (
        <>
          <button
            onClick={() => flipRef.current?.pageFlip()?.flipPrev()}
            disabled={!canPrev}
            aria-label="上一頁"
            style={{
              position: 'fixed', left: 0, top: '50%',
              transform: 'translateY(-50%)',
              zIndex: 15,
              width: 28, height: 52,
              background: canPrev ? 'rgba(196,160,232,0.28)' : 'transparent',
              border: 'none',
              cursor: canPrev ? 'pointer' : 'default',
              borderRadius: '0 26px 26px 0',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              opacity: canPrev ? 1 : 0,
              transition: 'opacity 0.2s',
              fontFamily: 'var(--font-wenkai)',
            }}
          >
            <svg width="10" height="18" viewBox="0 0 10 18" fill="none">
              <path d="M8 2 L2 9 L8 16" stroke="#9b59d4" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>

          <button
            onClick={() => flipRef.current?.pageFlip()?.flipNext()}
            disabled={!canNextMobile}
            aria-label="下一頁"
            style={{
              position: 'fixed', right: 0, top: '50%',
              transform: 'translateY(-50%)',
              zIndex: 15,
              width: 28, height: 52,
              background: canNextMobile ? 'rgba(196,160,232,0.28)' : 'transparent',
              border: 'none',
              cursor: canNextMobile ? 'pointer' : 'default',
              borderRadius: '26px 0 0 26px',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              opacity: canNextMobile ? 1 : 0,
              transition: 'opacity 0.2s',
              fontFamily: 'var(--font-wenkai)',
            }}
          >
            <svg width="10" height="18" viewBox="0 0 10 18" fill="none">
              <path d="M2 2 L8 9 L2 16" stroke="#9b59d4" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </>
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
