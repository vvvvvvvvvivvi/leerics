import { forwardRef } from 'react';
import LyricPage from './LyricPage';

const SongSpread = forwardRef(function SongSpread(
  { song, pageIndex, totalPages, absolutePageNum, compact, noPlayBar },
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
      compact={!!compact}
      noPlayBar={!!noPlayBar}
    />
  );
});

export default SongSpread;
