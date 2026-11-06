import React, { useRef } from 'react';
import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import { CutButton } from './CutButton';
import { AsciiIcon } from './AsciiIcon';
import { useTheme } from '../context/ThemeContext';

type GridMedia = {
  src: string;
  alt: string;
  type?: 'video';
  poster?: string;
};

const gridMedia: GridMedia[] = [
  { src: '/logistics/port-containers.jpg', alt: 'Container ship and cranes at a port at dusk' },
  { src: '/logistics/origin-inspection.jpg', alt: 'Origin inspector reviewing cargo documentation' },
  { src: '/logistics/freight-warehouse.jpg', alt: 'Freight team coordinating warehouse operations' },
  { src: '/logistics/container-yard.jpg', alt: 'Container yard with freight handling equipment' },
  {
    src: '/logistics/port-operations.mp4',
    poster: '/logistics/port-containers.jpg',
    alt: 'Short moving view of container port operations',
    type: 'video',
  },
  { src: '/logistics/freight-vessel.jpg', alt: 'Freight vessel traveling along the coast' },
  { src: '/logistics/truck-crossdock.jpg', alt: 'Freight truck at a cross-dock warehouse' },
  { src: '/logistics/customs-documents.jpg', alt: 'Shipment documents reviewed beside a laptop' },
  { src: '/logistics/port-cranes.jpg', alt: 'Port cranes and cargo ship at sunrise' },
];

const columns = [0, 1, 2].map((col) =>
  gridMedia.filter((_, idx) => idx % 3 === col)
);

const cutCardStyle: React.CSSProperties = {
  clipPath: 'polygon(0 0, calc(100% - 34px) 0, 100% 34px, 100% 100%, 0 100%)',
};

const cutTileStyle: React.CSSProperties = {
  ['--cut' as string]: '12px',
  clipPath:
    'polygon(var(--cut) 0, 100% 0, 100% calc(100% - var(--cut)), calc(100% - var(--cut)) 100%, 0 100%, 0 var(--cut))',
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

function GridTile({ media }: { media: GridMedia }) {
  return (
    <div
      style={cutTileStyle}
      role="img"
      aria-label={media.alt}
      className="relative aspect-square w-full overflow-hidden bg-[#e6eeff] [filter:saturate(1.15)] [isolation:isolate] dark:bg-[#05122e] dark:[filter:saturate(1.35)]"
    >
      {media.type === 'video' ? (
        <>
          <div
            style={{ backgroundImage: `url(${media.poster})` }}
            className="absolute inset-0 bg-cover bg-center [filter:grayscale(1)_contrast(1.1)_brightness(0.82)] dark:[filter:grayscale(1)_contrast(1.2)_brightness(0.82)]"
          />
          <video
            src={media.src}
            poster={media.poster}
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            aria-hidden="true"
            className="absolute inset-0 h-full w-full object-cover motion-reduce:hidden [filter:grayscale(1)_contrast(1.1)_brightness(0.82)] dark:[filter:grayscale(1)_contrast(1.2)_brightness(0.82)]"
          />
        </>
      ) : (
        <div
          style={{ backgroundImage: `url(${media.src})` }}
          className="absolute inset-0 bg-cover bg-center [filter:grayscale(1)_contrast(1.1)_brightness(0.82)] dark:[filter:grayscale(1)_contrast(1.2)_brightness(0.82)]"
        />
      )}
      <BlueOverlay />
    </div>
  );
}

const pillars = [
  {
    title: 'Know every container',
    shape: 'scan',
    desc: 'Keep bookings, container references, routes, and milestones together so each shipment has a clear next step.',
    tag: 'Shipment tracking · WiseShips CRM',
    href: '#platform',
  },
  {
    title: 'Coordinate origin inspections',
    shape: 'bolt',
    desc: 'Keep inspection requests, reports, evidence, and updates connected to the shipment they belong to.',
    tag: 'Origin operations · WiseShips CRM',
    href: '#platform',
  },
  {
    title: 'Move client deals forward',
    shape: 'key',
    desc: 'Connect customer records, opportunities, proposals, contracts, and follow-up in one commercial workflow.',
    tag: 'Clients & deals · WiseShips CRM',
    href: '#customers',
  },
];

export function PlatformShowcase({ includePillars = true }: { includePillars?: boolean }) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const prefersReducedMotion = useReducedMotion();
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === 'dark';

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  const scale = useTransform(scrollYProgress, [0.5, 0.92], [1, prefersReducedMotion ? 1 : 1.45]);
  const leftX = useTransform(scrollYProgress, [0.52, 0.92], ['0%', prefersReducedMotion ? '0%' : '-30%']);
  const rightX = useTransform(scrollYProgress, [0.52, 0.92], ['0%', prefersReducedMotion ? '0%' : '30%']);
  const gridOpacity = useTransform(scrollYProgress, [0, 0.05, 0.88, 1], prefersReducedMotion ? [1, 1, 1, 1] : [0, 1, 1, 0]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.05, 0.7, 0.85], prefersReducedMotion ? [1, 1, 1, 1] : [1, 1, 1, 0]);
  const textY = useTransform(scrollYProgress, [0, 0.2], prefersReducedMotion ? [0, 0] : [0, -18]);
  const overlayStyle: React.CSSProperties = {
    color: isDark ? '#fafafa' : '#0a0a0a',
    backgroundColor: isDark ? 'rgba(10, 10, 10, 0.78)' : 'rgba(255, 255, 255, 0.9)',
    borderColor: isDark ? 'rgba(250, 250, 250, 0.14)' : 'rgba(10, 10, 10, 0.1)',
    clipPath: 'polygon(0 0, calc(100% - 24px) 0, 100% 24px, 100% 100%, 0 100%)',
    boxShadow: isDark
      ? '0 24px 72px rgba(0, 0, 0, 0.3)'
      : '0 24px 72px rgba(10, 10, 10, 0.08)',
    backdropFilter: 'blur(16px)',
  };

  return (
    <>
      {/* Scroll-driven grid interactive section */}
      <section
        id="platform"
        ref={containerRef}
        className={`relative ${prefersReducedMotion ? 'h-[75dvh]' : 'h-[145svh] lg:h-[170svh]'}`}
      >
        <div className={`${prefersReducedMotion ? 'relative h-[75dvh]' : 'sticky top-0 h-[100dvh]'} overflow-hidden bg-background`}>
          {/* Animated logistics media grid */}
          <motion.div
            style={{ opacity: gridOpacity }}
            className="absolute inset-0 z-0 flex items-center justify-center pointer-events-none"
          >
            <motion.div
              style={{ scale }}
              className="w-[min(86vw,760px,62dvh)] will-change-transform"
            >
              <div className="grid grid-cols-3 gap-3 sm:gap-4">
                {columns.map((col, colIdx) => {
                  const xTransform = colIdx === 0 ? leftX : colIdx === 2 ? rightX : 0;
                  return (
                    <motion.div
                      key={colIdx}
                      style={{ x: xTransform }}
                      className="flex flex-col gap-3 will-change-transform sm:gap-4"
                    >
                      {col.map((media) => (
                        <div key={media.src} className="will-change-transform">
                          <GridTile media={media} />
                        </div>
                      ))}
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          </motion.div>

          {/* Overlay text & CTA */}
          <div className="relative z-10 flex h-full flex-col items-center justify-center px-5 text-center">
            <motion.div
              style={{ opacity: textOpacity, y: textY, ...overlayStyle }}
              className="max-w-3xl border px-5 py-5 text-foreground transition-colors duration-300 sm:px-8 sm:py-6"
            >
              <h2 className="text-balance font-serif text-4xl font-normal leading-[1.08] tracking-[-0.01em] sm:text-5xl lg:text-[3.5rem]">
                Every handoff,{' '}
                <span className="font-sans font-semibold tracking-tight">
                  in view
                </span>{' '}
                from origin to delivery
              </h2>
              <div className="mt-8 flex justify-center">
                <CutButton variant="solid" href="/platform#origin-inspections">
                  Explore logistics workflows
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </CutButton>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {includePillars && <section
        id="platform-features"
        className="mx-auto max-w-[1440px] px-5 pb-24 sm:px-8 sm:pb-32 lg:px-10"
      >
        <div className="max-w-2xl">
          <h2 className="text-balance font-serif text-3xl font-normal leading-[1.12] tracking-[-0.01em] sm:text-4xl lg:text-[2.75rem]">
            One CRM that{' '}
            <span className="font-sans font-semibold tracking-tight">tracks</span>,{' '}
            <span className="font-sans font-semibold tracking-tight">coordinates</span>, and{' '}
            <span className="font-sans font-semibold tracking-tight">connects</span>{' '}
            every logistics handoff
          </h2>
          <p className="mt-4 max-w-xl text-sm leading-relaxed text-muted-foreground sm:text-base">
            WiseShips brings container tracking, origin inspections, client
            relationships, and commercial follow-up into one shared workspace.
          </p>
        </div>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
          {pillars.map((pillar) => (
            <div
              key={pillar.title}
              className="bg-border p-px transition-transform hover:-translate-y-1 duration-300"
              style={cutCardStyle}
            >
              <article
                className="flex h-full flex-col bg-background p-6 sm:p-7"
                style={cutCardStyle}
              >
                <h3 className="text-lg font-semibold tracking-tight">
                  {pillar.title}
                </h3>

                <div className="my-5 border-t border-dotted border-border" />

                <div className="flex justify-center py-6 sm:py-8">
                  <AsciiIcon shape={pillar.shape} cols={22} className="" />
                </div>

                <div className="mb-6 border-t border-dotted border-border" />

                <p className="text-sm leading-relaxed text-muted-foreground">
                  {pillar.desc}
                </p>

                <div className="mt-auto flex items-center justify-between gap-4 pt-8">
                  <span className="text-xs font-medium text-muted-foreground">
                    {pillar.tag}
                  </span>
                  <CutButton
                    variant="outline"
                    iconOnly
                    href={pillar.href}
                    aria-label={`Learn more about ${pillar.title}`}
                  >
                    <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </CutButton>
                </div>
              </article>
            </div>
          ))}
        </div>
      </section>}
    </>
  );
}
