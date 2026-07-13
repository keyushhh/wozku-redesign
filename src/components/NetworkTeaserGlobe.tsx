import React, { useEffect, useRef } from 'react';
import createGlobe from 'cobe';

export default function NetworkTeaserGlobe() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const phi = useRef(2.8);
  const pointerInteracting = useRef<number | null>(null);
  const pointerInteractionMovement = useRef(0);
  const currentPhi = useRef(2.8);

  // Theme-reactive color ref: stores the current --indigo-500 as fractional [R,G,B]
  const themeColorRef = useRef<[number, number, number]>([0.38, 0.4, 0.95]);
  const themeColorValueRef = useRef('');
  const themeColorFrameRef = useRef<number | null>(null);

  // Parse computed --indigo-500 (hex or rgb()) to fractional [R,G,B] and store in ref
  const readThemeColor = () => {
    try {
      const raw = getComputedStyle(document.documentElement)
        .getPropertyValue('--indigo-500');
      const trimmed = raw.trim();
      if (!trimmed) return;
      if (trimmed === themeColorValueRef.current) return;
      themeColorValueRef.current = trimmed;
      let r = 0.38, g = 0.4, b = 0.95; // safe fallback
      if (trimmed.startsWith('#')) {
        const hex = trimmed.replace('#', '');
        const full = hex.length === 3
          ? hex.split('').map(c => c + c).join('')
          : hex;
        r = parseInt(full.slice(0, 2), 16) / 255;
        g = parseInt(full.slice(2, 4), 16) / 255;
        b = parseInt(full.slice(4, 6), 16) / 255;
      } else if (trimmed.startsWith('rgb')) {
        const parts = trimmed.match(/\d+/g);
        if (parts && parts.length >= 3) {
          r = parseInt(parts[0]) / 255;
          g = parseInt(parts[1]) / 255;
          b = parseInt(parts[2]) / 255;
        }
      }
      themeColorRef.current = [r, g, b];
    } catch (_) {
      // Keep existing value on parse error
    }
  };

  // Watch preset class and custom inline-variable changes without re-parsing unchanged colors.
  useEffect(() => {
    readThemeColor();
    const observer = new MutationObserver(() => {
      if (themeColorFrameRef.current !== null) return;
      themeColorFrameRef.current = requestAnimationFrame(() => {
        themeColorFrameRef.current = null;
        readThemeColor();
      });
    });
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class', 'style'] });
    return () => {
      observer.disconnect();
      if (themeColorFrameRef.current !== null) cancelAnimationFrame(themeColorFrameRef.current);
    };
  }, []);

  useEffect(() => {
    if (!canvasRef.current) return;

    const config = {
      devicePixelRatio: typeof window !== 'undefined' ? window.devicePixelRatio : 2,
      width: 350 * 2,
      height: 350 * 2,
      phi: 2.8,
      theta: 0.25,
      dark: 1,
      diffuse: 1.2,
      mapSamples: 16000,
      mapBrightness: 6,
      baseColor: [1, 1, 1] as [number, number, number],
      markerColor: themeColorRef.current,
      glowColor: [0, 0, 0] as [number, number, number],
      markers: [],
      arcs: []
    };

    const globe = createGlobe(canvasRef.current, config);

    let rafId: number;
    const tick = () => {
      if (pointerInteracting.current === null) {
        phi.current += 0.003;
      }
      const targetPhi = phi.current + pointerInteractionMovement.current / 200;
      currentPhi.current = targetPhi;

      globe.update({
        phi: targetPhi,
        theta: 0.25,
        markers: [
          { location: [22.5726, 88.3639],   size: 0.07, color: themeColorRef.current },
          { location: [12.9716, 77.5946],   size: 0.06, color: themeColorRef.current },
          { location: [51.5074, -0.1278],   size: 0.06, color: themeColorRef.current },
          { location: [37.7749, -122.4194], size: 0.06, color: themeColorRef.current }
        ] as any,
        arcs: [
          { from: [22.5726, 88.3639], to: [12.9716, 77.5946],   color: themeColorRef.current },
          { from: [22.5726, 88.3639], to: [51.5074, -0.1278],   color: themeColorRef.current },
          { from: [22.5726, 88.3639], to: [37.7749, -122.4194], color: themeColorRef.current }
        ] as any
      });

      rafId = requestAnimationFrame(tick);
    };
    rafId = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(rafId);
      globe.destroy();
    };
  }, []);

  return (
    <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
      <canvas
        ref={canvasRef}
        onPointerDown={(e) => {
          pointerInteracting.current = e.clientX - pointerInteractionMovement.current;
          if (canvasRef.current) canvasRef.current.style.cursor = 'grabbing';
        }}
        onPointerUp={() => {
          pointerInteracting.current = null;
          if (canvasRef.current) canvasRef.current.style.cursor = 'grab';
        }}
        onPointerOut={() => {
          pointerInteracting.current = null;
          if (canvasRef.current) canvasRef.current.style.cursor = 'grab';
        }}
        onPointerMove={(e) => {
          if (pointerInteracting.current !== null) {
            const delta = e.clientX - pointerInteracting.current;
            pointerInteractionMovement.current = delta;
          }
        }}
        style={{ width: 350, height: 350, cursor: 'grab', display: 'block', outline: 'none' }}
      />
    </div>
  );
}
