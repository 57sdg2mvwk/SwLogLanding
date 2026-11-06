import React, { useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import { Kicker } from './CornerPlus';

const cutCorner28: React.CSSProperties = {
  clipPath: 'polygon(28px 0, 100% 0, 100% calc(100% - 28px), calc(100% - 28px) 100%, 0 100%, 0 28px)',
};

function BlueOverlay() {
  return (
    <>
      <div className="absolute inset-0 bg-[#3b76ff] mix-blend-color dark:bg-[#1466ff]" />
      <div className="absolute inset-0 bg-[#9bc0ff] opacity-30 mix-blend-multiply dark:bg-[#0a235c] dark:opacity-40" />
      <div className="absolute inset-0 bg-white opacity-25 mix-blend-screen dark:bg-[#4d9bff] dark:opacity-25" />
    </>
  );
}

function CurtainVisualizer() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId = 0;
    let t = 0;

    const render = () => {
      t += 0.015;
      const w = (canvas.width = canvas.offsetWidth || 400);
      const h = (canvas.height = canvas.offsetHeight || 400);

      ctx.clearRect(0, 0, w, h);
      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = 1;

      const spacing = 16;
      const count = Math.floor(w / spacing);

      for (let i = 0; i < count; i++) {
        const x = i * spacing;
        const offset = Math.sin(x * 0.02 + t) * 40 + Math.cos(t * 0.7 + i * 0.1) * 20;
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.bezierCurveTo(x + offset, h * 0.3, x - offset, h * 0.7, x, h);
        ctx.globalAlpha = 0.15 + 0.1 * Math.sin(t + i * 0.2);
        ctx.stroke();
      }

      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);
    return () => cancelAnimationFrame(animId);
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="block h-full w-full object-cover"
      aria-hidden="true"
    />
  );
}

export function TradeoffsSection() {
  return (
    <section className="mx-auto max-w-[1440px] px-5 pb-24 sm:px-8 sm:pb-32 lg:px-10">
      <div className="grid items-center gap-10 lg:grid-cols-[1.35fr_1fr] lg:gap-12">
        {/* Right Graphic in desktop, ordered 2 */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="relative aspect-[4/3] w-full overflow-hidden sm:aspect-square lg:order-2 bg-[#e6eeff] [filter:saturate(1.15)] [isolation:isolate] dark:bg-[#05122e] dark:[filter:saturate(1.35)]"
          style={cutCorner28}
        >
          <div
            style={{ backgroundImage: 'url(/logistics/freight-vessel.jpg)' }}
            className="absolute inset-0 bg-cover bg-center [filter:grayscale(1)_contrast(0.85)_brightness(1.55)] dark:[filter:grayscale(1)_contrast(1.2)_brightness(1.08)]"
          />
          <CurtainVisualizer />
          <BlueOverlay />
        </motion.div>

        {/* Left Copy, ordered 1 */}
        <div className="lg:order-1">
          <Kicker>Where work gets disconnected</Kicker>
          <h2 className="mt-5 max-w-2xl text-balance font-serif text-3xl font-normal leading-[1.12] tracking-[-0.01em] sm:text-4xl lg:text-[2.75rem]">
            Every shipment crosses teams.{' '}
            <span className="font-sans font-semibold tracking-tight">
              Its information should stay together
            </span>{' '}
          </h2>

          <dl className="mt-10">
            <div className="border-t border-dotted border-border py-5">
              <dt className="text-sm font-semibold tracking-tight">
                Shipment details in different places
              </dt>
              <dd className="mt-1.5 max-w-md text-sm leading-relaxed text-muted-foreground">
                Container references, route updates, documents, and customer
                messages can become difficult to follow across separate tools.
              </dd>
            </div>
            <div className="border-t border-dotted border-border py-5">
              <dt className="text-sm font-semibold tracking-tight">
                Inspection work out of context
              </dt>
              <dd className="mt-1.5 max-w-md text-sm leading-relaxed text-muted-foreground">
                Requests, evidence, and reports are easier to coordinate when
                they stay attached to the shipment and client they support.
              </dd>
            </div>
          </dl>
        </div>
      </div>
    </section>
  );
}
