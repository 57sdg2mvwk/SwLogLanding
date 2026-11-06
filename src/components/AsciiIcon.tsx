import React, { useEffect, useRef } from 'react';

const shapes: Record<string, { d: string; evenOdd?: boolean }> = {
  scan: {
    d: 'M3 50 C28 12 72 12 97 50 C72 88 28 88 3 50 ZM17 50 C34 26 66 26 83 50 C66 74 34 74 17 50 ZM31 50 A19 19 0 1 1 69 50 A19 19 0 1 1 31 50 Z',
    evenOdd: true,
  },
  shield: {
    d: 'M50 8 L86 22 L86 50 C86 78 62 90 50 94 C38 90 14 78 14 50 L14 22 Z',
  },
  key: {
    d: 'M6 50 A22 22 0 1 1 50 50 A22 22 0 1 1 6 50 ZM18 50 A10 10 0 1 1 38 50 A10 10 0 1 1 18 50 ZM50 42 L92 42 L92 58 L50 58 ZM70 58 L78 58 L78 72 L70 72 ZM84 58 L92 58 L92 76 L84 76 Z',
    evenOdd: true,
  },
  bolt: {
    d: 'M60 4 L26 52 L48 52 L40 96 L80 44 L56 44 Z',
  },
  plus: {
    d: 'M40 10 H60 V40 H90 V60 H60 V90 H40 V60 H10 V40 H40 Z',
  },
  bars: {
    d: 'M14 58 H30 V88 H14 Z M42 38 H58 V88 H42 Z M70 18 H86 V88 H70 Z',
  },
};

const characters = '@#%&$08WMXKB'.split('');

function hash(e: number, t: number, n: number) {
  const i = 43758.5453 * Math.sin(12.9898 * e + 78.233 * t + 43.123 * n);
  return i - Math.floor(i);
}

function rasterizeShape(shapeKey: string, cols: number, rows: number): boolean[] {
  const shape = shapes[shapeKey];
  if (!shape) return Array(cols * rows).fill(false);

  const scale = 4;
  const rw = cols * scale;
  const rh = rows * scale;
  const offscreen = document.createElement('canvas');
  offscreen.width = rw;
  offscreen.height = rh;
  const ctx = offscreen.getContext('2d');
  const result = Array(cols * rows).fill(false);
  if (!ctx) return result;

  ctx.save();
  ctx.scale(rw / 100, rh / 100);
  ctx.fillStyle = '#fff';
  ctx.fill(new Path2D(shape.d), shape.evenOdd ? 'evenodd' : 'nonzero');
  ctx.restore();

  const data = ctx.getImageData(0, 0, rw, rh).data;
  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) {
      let count = 0;
      for (let sy = 0; sy < scale; sy++) {
        for (let sx = 0; sx < scale; sx++) {
          const idx = ((y * scale + sy) * rw + (x * scale + sx)) * 4 + 3;
          if ((data[idx] ?? 0) > 110) count++;
        }
      }
      result[y * cols + x] = count / (scale * scale) > 0.4;
    }
  }
  return result;
}

export interface AsciiIconProps {
  shape: 'scan' | 'shield' | 'key' | 'bolt' | 'plus' | 'bars' | string;
  color?: string;
  cols?: number;
  className?: string;
}

export function AsciiIcon({
  shape,
  color = '#2f80ff',
  cols = 22,
  className = '',
}: AsciiIconProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const size = 9 * cols;
    canvas.width = size * dpr;
    canvas.height = size * dpr;
    canvas.style.width = `${size}px`;
    canvas.style.height = `${size}px`;

    ctx.scale(dpr, dpr);
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.font = 'bold 9px var(--font-mono), monospace';
    ctx.fillStyle = color;

    const bitmap = rasterizeShape(shape, cols, cols);

    const render = (time: number, progress: number) => {
      ctx.clearRect(0, 0, size, size);
      const limit = progress * (cols + 1);

      for (let y = 0; y < cols; y++) {
        if (y > limit) continue;
        const isStable = limit - y >= 1;
        for (let x = 0; x < cols; x++) {
          if (!bitmap[y * cols + x]) continue;
          const animSpeed = isStable ? 150 + 260 * hash(x, y, 2) : 35;
          const charOffset = Math.floor(time / animSpeed + 7 * hash(x, y, 1));
          const charIdx = Math.floor(hash(x, y, charOffset) * characters.length);
          const char = characters[Math.min(characters.length - 1, charIdx)] ?? '#';

          ctx.globalAlpha = 0.82 + 0.18 * hash(x, y, charOffset + 3);
          ctx.fillText(char, 9 * x + 4.5, 9 * y + 4.5);
        }
      }
      ctx.globalAlpha = 1;
    };

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      render(0, 1);
      return;
    }

    let animId = 0;
    let lastTime = 0;
    let startTime = 0;
    let isRunning = false;

    const tick = (now: number) => {
      if (!startTime) startTime = now;
      if (now - lastTime >= 44) {
        lastTime = now;
        const progress = Math.min(1, (now - startTime) / 650);
        render(now, progress);
      }
      animId = requestAnimationFrame(tick);
    };

    const stop = () => {
      isRunning = false;
      cancelAnimationFrame(animId);
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          if (!isRunning) {
            isRunning = true;
            animId = requestAnimationFrame(tick);
          }
        } else {
          stop();
        }
      },
      { threshold: 0 }
    );

    observer.observe(canvas);

    return () => {
      observer.disconnect();
      stop();
    };
  }, [shape, color, cols]);

  return <canvas ref={canvasRef} aria-hidden="true" className={className} />;
}
