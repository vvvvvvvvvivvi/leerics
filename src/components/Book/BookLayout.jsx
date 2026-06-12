import { useRef, useState, useCallback, useEffect } from 'react';
import HTMLFlipBook from 'react-pageflip';
import { songs } from '../../data/songs';
import MenuTab from './MenuTab';
import CoverLeft from '../Landing/CoverLeft';
import JiuYinGe from '../Landing/JiuYinGe';
import SongSpread from '../Song/SongSpread';
import { useViewport } from '../../hooks/useViewport';

const BOOK_MAX_WIDTH = 1200;
const PAGE_ASPECT    = 0.707; // portrait ratio
const MOBILE_NAV_H   = 52;    // fixed bottom nav bar on mobile

export default function BookLayout() {
  const flipRef = useRef(null);
  const [currentPage, setCurrentPage]   = useState(0);
  const [activeSongId, setActiveSongId] = useState(null);
  const [menuOpen, setMenuOpen]         = useState(false);
  const { w: vw, h: vh, isMobile } = useViewport();

  // Desktop: 0=cover, 1=九因歌, 2+= song pages
  // Mobile:  0=cover,           1+= song pages  (九因歌 hidden)
  const pageOffset = isMobile ? 1 : 2;

  const goToSong = useCallback((songId) => {
    const idx = songs.findIndex(s => s.id === songId);
    if (idx === -1) return;
    setActiveSongId(songId);
    setMenuOpen(false);
    flipRef.current?.pageFlip()?.flip(pageOffset + idx * 2);
  }, [pageOffset]);

  const goToCover = useCallback(() => {
    setActiveSongId(null);
    setMenuOpen(false);
    flipRef.current?.pageFlip()?.flip(0);
  }, []);

  const onFlip = useCallback((e) => {
    const p = e.data;
    setCurrentPage(p);
    if (p < pageOffset) {
      setActiveSongId(null);
    } else {
      setActiveSongId(songs[Math.floor((p - pageOffset) / 2)]?.id ?? null);
    }
  }, [pageOffset]);

  // Auto page-turn when karaoke active line crosses a page boundary
  useEffect(() => {
    function handlePageChange(e) {
      const { songId, pageIdx } = e.detail;
      const songIdx = songs.findIndex(s => s.id === songId);
      if (songIdx === -1) return;
      const targetPage = pageOffset + songIdx * 2 + pageIdx;
      flipRef.current?.pageFlip()?.flip(targetPage);
    }
    window.addEventListener('karaoke-page-change', handlePageChange);
    return () => window.removeEventListener('karaoke-page-change', handlePageChange);
  }, [pageOffset]);

  // Desktop page array: cover + 九因歌 + all song pages
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

  // Mobile page array: cover only + song pages (九因歌 omitted)
  const mobilePages = [
    <CoverLeft key="cover-left" onStickerClick={goToSong} />,
    ...songs.flatMap((song, si) =>
      song.pages.map((_, pi) => (
        <SongSpread
          key={`${song.id}-p${pi}`}
          song={song}
          pageIndex={pi}
          totalPages={song.pages.length}
          absolutePageNum={1 + si * 2 + pi}
          compact
        />
      ))
    ),
  ];

  const totalPagesDesktop = desktopPages.length;
  const totalPagesMobile  = mobilePages.length;
  const canPrev           = currentPage > 0;
  const canNextDesktop    = currentPage < totalPagesDesktop - 2;
  const canNextMobile     = currentPage < totalPagesMobile - 1;

  // Mobile page height: full viewport minus bottom nav bar
  const mobilePageH = Math.max(400, vh - MOBILE_NAV_H);

  return (
    <div
      className="relative flex flex-col items-center justify-center w-full min-h-screen"
      style={{ background: isMobile ? '#F7F4DA' : '#ddbef7' }}
    >

      {isMobile ? (
        /* ── Mobile: one page at a time, portrait flipbook ──────────────── */
        <div className="relative w-full" style={{ height: mobilePageH, overflow: 'hidden' }}>
          <HTMLFlipBook
            ref={flipRef}
            key="mobile"
            width={vw}
            height={mobilePageH}
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
        /* ── Desktop: two-page spread ─────────────────────────────────────── */
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

          {/* ← desktop arrow */}
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

          {/* → desktop arrow */}
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
              fontSize: 18, color: '#2C2C2A',
              lineHeight: 1,
            }}
          >
            ←
          </button>

          <span style={{ fontSize: 10, color: '#B4B2A9', letterSpacing: '2px' }}>
            {currentPage + 1}&thinsp;/&thinsp;{totalPagesMobile}
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
              fontSize: 18, color: '#2C2C2A',
              lineHeight: 1,
            }}
          >
            →
          </button>
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
