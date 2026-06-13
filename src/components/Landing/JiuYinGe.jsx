import { forwardRef } from 'react';
import backImg from '../../assets/back.png';

/**
 * JiuYinGe — scanned exercise-book back cover.
 * Displays back.png (the actual scanned 九因歌 back cover) as a full-page photograph.
 * Song navigation is handled via the MenuTab and CoverLeft sticker hotspots.
 */
const JiuYinGe = forwardRef(function JiuYinGe(_props, ref) {
  return (
    <div
      ref={ref}
      className="relative w-full h-full overflow-hidden select-none"
      style={{ background: '#EDE8D0' }}
    >
      {/* Scanned back cover */}
      <img
        src={backImg}
        alt="九因歌"
        className="absolute inset-0 w-full h-full object-cover pointer-events-none"
        draggable={false}
      />

      {/* Scanner gutter shadow — right page, shadow on left edge */}
      <div style={{
        position: 'absolute', top: 0, bottom: 0, left: 0, width: 64, zIndex: 8,
        background: 'linear-gradient(to right, rgba(0,0,0,0.14) 0%, rgba(0,0,0,0.06) 45%, transparent 100%)',
        pointerEvents: 'none',
      }} />

      {/* Edge vignette */}
      <div style={{
        position: 'absolute', inset: 0, zIndex: 7,
        background: 'radial-gradient(ellipse at center, transparent 60%, rgba(0,0,0,0.06) 100%)',
        pointerEvents: 'none',
      }} />
    </div>
  );
});

export default JiuYinGe;
