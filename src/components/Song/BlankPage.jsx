import { forwardRef } from 'react';
const paperL1 = `${import.meta.env.BASE_URL}assets/paper/L1.png`;
const paperR1 = `${import.meta.env.BASE_URL}assets/paper/R1.png`;

/**
 * BlankPage — spacer page inserted after songs with odd page counts so the
 * next song always starts on a left (even-numbered) page in the desktop spread.
 */
const BlankPage = forwardRef(function BlankPage({ absolutePageNum }, ref) {
  const paperSrc = absolutePageNum % 2 === 1 ? paperL1 : paperR1;
  return (
    <div
      ref={ref}
      className="relative w-full h-full overflow-hidden"
      style={{ backgroundColor: '#EDE8D0', border: '1px solid rgba(160,120,200,0.18)' }}
    >
      <img
        src={paperSrc}
        aria-hidden="true"
        draggable={false}
        style={{
          position: 'absolute', inset: 0,
          width: '100%', height: '100%',
          objectFit: 'cover',
          pointerEvents: 'none',
        }}
      />
    </div>
  );
});

export default BlankPage;
