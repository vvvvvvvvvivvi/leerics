import { useState, useEffect } from 'react';

/**
 * Tracks viewport dimensions and orientation.
 * Fires on resize + orientationchange so portrait/landscape transitions are instant.
 */
export function useViewport() {
  const [vp, setVp] = useState(() => ({
    w: window.innerWidth,
    h: window.innerHeight,
  }));

  useEffect(() => {
    function update() {
      setVp({ w: window.innerWidth, h: window.innerHeight });
    }
    window.addEventListener('resize', update);
    window.addEventListener('orientationchange', update);
    return () => {
      window.removeEventListener('resize', update);
      window.removeEventListener('orientationchange', update);
    };
  }, []);

  return { w: vp.w, h: vp.h, isMobile: vp.w < 640 };
}
