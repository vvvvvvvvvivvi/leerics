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
      className="w-full h-full"
      style={{
        backgroundColor: '#EDE8D0',
        backgroundImage: `url("${paperSrc}")`,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        border: '1px solid rgba(160,120,200,0.18)',
      }}
    />
  );
});

export default BlankPage;
