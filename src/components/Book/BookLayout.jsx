import { useRef, useState, useEffect, useMemo, useCallback } from 'react';
import HTMLFlipBook from 'react-pageflip';
import { songs } from '../../data/songs';
import MenuTab from './MenuTab';
import CoverLeft from '../Landing/CoverLeft';
import MultiplierTable from '../Landing/MultiplierTable';
import SongSpread from '../Song/SongSpread';
import BlankPage from '../Song/BlankPage';
import NanoPlayer from '../Song/NanoPlayer';
import { useViewport } from '../../hooks/useViewport';

const PAGE_ASPECT = 0.707; // width / height

// Mobile layout (no bottom nav bar; PlayBar at bottom: 0)
const MOBILE_RHYTHM          = 32;
const COMPACT_BOTTOM         = 56;  // PlayBar 48px + 8px gap
const COMPACT_FIRST_HEADER_H = 80;
const COMPACT_CONT_HEADER_H  = 25;

// Desktop layout — DESKTOP_PLAYBAR_RESERVE matches paddingBottom:28 (no PlayBar on desktop)
const DESKTOP_RHYTHM          = 38;
const DESKTOP_FIRST_HEADER_H  = 116; // paddingTop(44) + header block(~72)
const DESKTOP_CONT_HEADER_H   = 64;  // paddingTop(44) + continuation label(~20)
const DESKTOP_PLAYBAR_RESERVE = 44;  // matches paddingBottom:44 (no PlayBar)

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

  // ── Desktop book dimensions (dynamic, fills viewport height) ─────────────
  const desktopBookH = isMobile ? 0 : Math.min(
    Math.round(vh * 0.92),
    Math.round((vw / 2 - 20) / PAGE_ASPECT),
    1000
  );
  const desktopBookW = isMobile ? 0 : Math.round(desktopBookH * PAGE_ASPECT);

  // ── Mobile pagination ────────────────────────────────────────────────────
  const mobileFirstCap = Math.max(4, Math.floor((vh - COMPACT_FIRST_HEADER_H - COMPACT_BOTTOM) / MOBILE_RHYTHM));
  const mobileContCap  = Math.max(4, Math.floor((vh - COMPACT_CONT_HEADER_H  - COMPACT_BOTTOM) / MOBILE_RHYTHM));

  const mobileSongs = useMemo(() => songs.map(song => ({
    ...song,
    pages: splitSongPages(song, mobileFirstCap, mobileContCap),
  })), [mobileFirstCap, mobileContCap]); // eslint-disable-line react-hooks/exhaustive-deps

  const { mobileOffsets, totalMobilePages } = useMemo(() => {
    const offsets = [];
    let offset = 1;
    mobileSongs.forEach(song => { offsets.push(offset); offset += song.pages.length; });
    return { mobileOffsets: offsets, totalMobilePages: offset };
  }, [mobileSongs]);

  // ── Desktop pagination ───────────────────────────────────────────────────
  const desktopFirstCap = Math.max(4, Math.floor(
    (desktopBookH - DESKTOP_FIRST_HEADER_H - DESKTOP_PLAYBAR_RESERVE) / DESKTOP_RHYTHM
  ));
  const desktopContCap = Math.max(4, Math.floor(
    (desktopBookH - DESKTOP_CONT_HEADER_H - DESKTOP_PLAYBAR_RESERVE) / DESKTOP_RHYTHM
  ));

  const desktopSongs = useMemo(() => songs.map(song => ({
    ...song,
    pages: splitSongPages(song, desktopFirstCap, desktopContCap),
  })), [desktopFirstCap, desktopContCap]); // eslint-disable-line react-hooks/exhaustive-deps

  // Each song must start on an even absolute page (left page of a spread).
  // Insert a blank page after any song whose page count is odd so the next
  // song always starts on a left page — prevents two songs sharing one spread.
  const { desktopOffsets, totalDesktopPages } = useMemo(() => {
    const offsets = [];
    let offset = 2; // 0=cover, 1=multipliertable
    desktopSongs.forEach(song => {
      offsets.push(offset);
      offset += song.pages.length;
      if (song.pages.length % 2 !== 0) offset += 1;
    });
    return { desktopOffsets: offsets, totalDesktopPages: offset };
  }, [desktopSongs]);

  const mobileOffsetsRef  = useRef(mobileOffsets);  mobileOffsetsRef.current  = mobileOffsets;
  const desktopOffsetsRef = useRef(desktopOffsets); desktopOffsetsRef.current = desktopOffsets;
  const isMobileRef       = useRef(isMobile);       isMobileRef.current       = isMobile;

  // ── Navigation ───────────────────────────────────────────────────────────
  // useCallback with empty deps — read volatile values from refs so the
  // function identity never changes, preventing page-array rememos on every render.
  const goToSong = useCallback((songId) => {
    const idx = songs.findIndex(s => s.id === songId);
    if (idx === -1) return;
    setActiveSongId(songId);
    setMenuOpen(false);
    const page = isMobileRef.current
      ? mobileOffsetsRef.current[idx]
      : desktopOffsetsRef.current[idx];
    requestAnimationFrame(() => {
      flipRef.current?.pageFlip()?.flip(page);
    });
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const goToCover = useCallback(() => {
    setActiveSongId(null);
    setMenuOpen(false);
    requestAnimationFrame(() => {
      flipRef.current?.pageFlip()?.flip(0);
    });
  }, []);

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
  }, []);

  // ── Page arrays — memoized so react-pageflip never receives new child
  //    references when only UI state (menuOpen, activeSongId) changes.
  const desktopPages = useMemo(() => [
    <CoverLeft key="cover-left" onStickerClick={goToSong} />,
    <MultiplierTable key="multipliertable" />,
    ...desktopSongs.flatMap((song, si) => {
      const songPages = song.pages.map((_, pi) => (
        <SongSpread
          key={`d-${song.id}-p${pi}`}
          song={song}
          pageIndex={pi}
          totalPages={song.pages.length}
          absolutePageNum={desktopOffsets[si] + pi}
          noPlayBar
        />
      ));
      if (song.pages.length % 2 !== 0) {
        songPages.push(
          <BlankPage
            key={`blank-${song.id}`}
            absolutePageNum={desktopOffsets[si] + song.pages.length}
          />
        );
      }
      return songPages;
    }),
  ], [desktopSongs, desktopOffsets, goToSong]); // eslint-disable-line react-hooks/exhaustive-deps

  const mobilePages = useMemo(() => [
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
  ], [mobileSongs, mobileOffsets, goToSong]); // eslint-disable-line react-hooks/exhaustive-deps

  const canPrev        = currentPage > 0;
  const canNextDesktop = currentPage < totalDesktopPages - 2;
  const canNextMobile  = currentPage < totalMobilePages - 1;

  const activeSong = songs.find(s => s.id === activeSongId) ?? null;

  return (
    <div
      className="relative flex flex-col items-center justify-center w-full min-h-screen"
      style={{ background: isMobile ? '#EDE8D0' : '#E0D8C8' }}
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
        /* ── Desktop: two-page spread, fills viewport height ──────────────── */
        <div
          className="relative"
          style={{
            width: desktopBookW * 2,
            maxWidth: '100vw',
          }}
        >
          <HTMLFlipBook
            ref={flipRef}
            key="desktop"
            width={desktopBookW}
            height={desktopBookH}
            size="stretch"
            minWidth={280}
            maxWidth={desktopBookW}
            minHeight={400}
            maxHeight={desktopBookH}
            showCover={false}
            flippingTime={700}
            usePortrait={false}
            startPage={0}
            drawShadow={false}
            useMouseEvents={false}
            clickEventForward={true}
            onFlip={onFlip}
            className="mx-auto"
            style={{ filter: 'drop-shadow(0 10px 32px rgba(0,0,0,0.22)) drop-shadow(0 2px 6px rgba(0,0,0,0.12))' }}
          >
            {desktopPages}
          </HTMLFlipBook>

          {/* Binding gutter shadow */}
          <div
            className="absolute top-0 bottom-0 left-0 right-0 z-10 pointer-events-none"
            style={{
              background: 'linear-gradient(90deg, transparent 35%, rgba(0,0,0,0.07) 44%, rgba(0,0,0,0.19) 50%, rgba(0,0,0,0.07) 56%, transparent 65%)',
            }}
          />

          {/* Prev arrow */}
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

          {/* Next arrow */}
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

          {/* iPod — bottom-right corner of the book, overlapping the right page */}
          {activeSong && (
            <NanoPlayer song={activeSong} />
          )}
        </div>
      )}

      {/* Mobile ghost nav: edge chevrons only (no bar) */}
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
