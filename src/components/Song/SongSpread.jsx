import { forwardRef } from 'react';
import LyricPage from './LyricPage';

/**
 * SongSpread — wraps one physical page of a song.
 * react-pageflip gives each child a ref; we forward it to the DOM node.
 *
 * The spread renders either the left page (first of song, shows header + QR block)
 * or subsequent pages (just ruled paper + lyrics).
 */
const SongSpread = forwardRef(function SongSpread(
  { song, pageIndex, totalPages, absolutePageNum, activeSongId, isLeft },
  ref
) {
  return (
    <LyricPage
      ref={ref}
      song={song}
      pageIndex={pageIndex}
      totalPages={totalPages}
      absolutePageNum={absolutePageNum}
      showHeader={pageIndex === 0}
    />
  );
});

export default SongSpread;
