import React, { useEffect, useRef } from 'react';
import { useTheme } from '../context/ThemeContext';

export interface HeroWavesProps {
  color?: string;
  intensity?: number;
  elementSize?: number;
  videoUrl?: string;
  noiseScale?: number;
  hasCursorInteraction?: boolean;
  className?: string;
  disableDefaultMask?: boolean;
}

export function HeroWaves({
  color,
  elementSize = 12,
  videoUrl = '/logistics/port-operations.mp4',
  hasCursorInteraction = true,
  className = '',
  disableDefaultMask = false,
}: HeroWavesProps) {
  const { resolvedTheme } = useTheme();
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const mouseRef = useRef({ x: -1000, y: -1000, active: false });

  const isDark = resolvedTheme === 'dark';
  const fillColor = color || (isDark ? '#ffffff' : '#0a0a0a');

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId = 0;
    let width = (canvas.width = canvas.offsetWidth || window.innerWidth);
    let height = (canvas.height = canvas.offsetHeight || 600);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.offsetWidth || window.innerWidth;
      height = canvas.height = canvas.offsetHeight || 600;
    };

    window.addEventListener('resize', handleResize);

    const video = document.createElement('video');
    video.src = videoUrl;
    video.crossOrigin = 'anonymous';
    video.loop = true;
    video.muted = true;
    video.playsInline = true;
    video.play().catch(() => {});

    // ASCII characters gradient from lightest to densest
    const chars = ' .:-=+*%@#8';
    const cellSize = elementSize;

    const offscreen = document.createElement('canvas');
    const offCtx = offscreen.getContext('2d', { willReadFrequently: true });

    let t = 0;

    const render = () => {
      t += 0.02;
      ctx.clearRect(0, 0, width, height);

      const cols = Math.floor(width / cellSize);
      const rows = Math.floor(height / cellSize);
      if (cols <= 0 || rows <= 0) {
        animId = requestAnimationFrame(render);
        return;
      }

      offscreen.width = cols;
      offscreen.height = rows;

      if (offCtx) {
        if (video.readyState >= 2) {
          offCtx.drawImage(video, 0, 0, cols, rows);
        } else {
          // Flow field fallback
          const imgData = offCtx.createImageData(cols, rows);
          for (let y = 0; y < rows; y++) {
            for (let x = 0; x < cols; x++) {
              const nx = x / cols;
              const ny = y / rows;
              const wave =
                Math.sin(nx * 8 + t) * Math.cos(ny * 6 + t * 0.7) +
                Math.sin((nx + ny) * 5 - t * 0.5);
              const val = Math.floor(((wave + 2) / 4) * 255);
              const idx = (y * cols + x) * 4;
              imgData.data[idx] = val;
              imgData.data[idx + 1] = val;
              imgData.data[idx + 2] = val;
              imgData.data[idx + 3] = 255;
            }
          }
          offCtx.putImageData(imgData, 0, 0);
        }

        const data = offCtx.getImageData(0, 0, cols, rows).data;

        ctx.font = 'bold 9px var(--font-mono), monospace';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillStyle = fillColor;

        const mx = mouseRef.current.x;
        const my = mouseRef.current.y;

        for (let y = 0; y < rows; y++) {
          for (let x = 0; x < cols; x++) {
            const idx = (y * cols + x) * 4;
            const r = data[idx];
            const g = data[idx + 1];
            const b = data[idx + 2];
            let brightness = (0.299 * r + 0.587 * g + 0.114 * b) / 255;

            // Interactive mouse repulsion/ripple
            const px = x * cellSize + cellSize / 2;
            const py = y * cellSize + cellSize / 2;

            if (hasCursorInteraction) {
              const dist = Math.hypot(px - mx, py - my);
              if (dist < 180) {
                const factor = (1 - dist / 180) * 0.6;
                brightness = Math.min(1, brightness + factor);
              }
            }

            const charIndex = Math.floor(brightness * (chars.length - 1));
            const char = chars[charIndex];

            if (char && char !== ' ') {
              ctx.globalAlpha = Math.max(0.12, brightness * (isDark ? 0.7 : 0.5));
              ctx.fillText(char, px, py);
            }
          }
        }
      }

      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);

    const onMouseMove = (e: MouseEvent) => {
      if (!hasCursorInteraction) return;
      const rect = canvas.getBoundingClientRect();
      mouseRef.current.x = e.clientX - rect.left;
      mouseRef.current.y = e.clientY - rect.top;
      mouseRef.current.active = true;
    };

    const onMouseLeave = () => {
      mouseRef.current.x = -1000;
      mouseRef.current.y = -1000;
      mouseRef.current.active = false;
    };

    if (hasCursorInteraction) {
      window.addEventListener('mousemove', onMouseMove);
      document.addEventListener('mouseleave', onMouseLeave);
    }

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
      if (hasCursorInteraction) {
        window.removeEventListener('mousemove', onMouseMove);
        document.removeEventListener('mouseleave', onMouseLeave);
      }
      video.pause();
    };
  }, [isDark, fillColor, elementSize, videoUrl, hasCursorInteraction]);

  const defaultMask =
    'linear-gradient(to bottom, transparent 0%, black 25%, black 80%, transparent 100%)';

  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 -z-10 overflow-hidden ${className}`}
      style={
        disableDefaultMask
          ? undefined
          : {
              maskImage: defaultMask,
              WebkitMaskImage: defaultMask,
              filter: isDark ? undefined : 'saturate(2.4) contrast(1.25)',
            }
      }
    >
      <canvas
        ref={canvasRef}
        className="h-full w-full opacity-50 dark:opacity-60 transition-opacity duration-700"
      />
    </div>
  );
}

