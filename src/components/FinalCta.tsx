import React from 'react';
import { motion } from 'motion/react';
import { useTheme } from '../context/ThemeContext';
import { HeroWaves } from './HeroWaves';
import { CutButton } from './CutButton';

const softEase = [0.22, 1, 0.36, 1] as const;

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const f =
  'linear-gradient(to right, transparent 0%, black 13%, black 27%, transparent 43%, transparent 57%, black 73%, black 87%, transparent 100%)';
const m =
  'linear-gradient(to bottom, transparent 0%, black 18%, black 82%, transparent 100%)';

export function FinalCta({
  onOpenGetStarted,
  onOpenDemo,
}: {
  onOpenGetStarted?: () => void;
  onOpenDemo?: () => void;
}) {
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === 'dark';

  return (
    <section className="relative overflow-hidden">
      {/* ASCII Wave Background with dual horizontal/vertical masks */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <div className="mx-auto h-full max-w-[1440px]">
          <motion.div
            className="h-full w-full"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: isDark ? 0.9 : 1 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 1.4, ease: softEase }}
            style={{
              maskImage: m,
              WebkitMaskImage: m,
              filter: isDark ? 'brightness(1.3)' : 'saturate(2.6) contrast(1.35)',
            }}
          >
            <div
              className="h-full w-full"
              style={{
                maskImage: f,
                WebkitMaskImage: f,
              }}
            >
              <HeroWaves
                color={isDark ? '#ffffff' : '#0a0a0a'}
                intensity={0}
                elementSize={12}
                videoUrl="/logistics/port-operations.mp4"
                noiseScale={25}
                hasCursorInteraction={false}
                disableDefaultMask={true}
              />
            </div>
          </motion.div>
        </div>
      </div>

      {/* Center ambient glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/2 -z-[1] h-[130%] w-[70%] -translate-x-1/2 -translate-y-1/2"
        style={{
          background:
            'radial-gradient(ellipse at center, var(--background) 0%, color-mix(in srgb, var(--background) 70%, transparent) 50%, transparent 78%)',
        }}
      />

      <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-10">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          transition={{ staggerChildren: 0.1 }}
          className="mx-auto flex max-w-2xl flex-col items-center py-28 text-center sm:py-36 lg:py-44"
        >
          <motion.h2
            variants={fadeInUp}
            transition={{ duration: 0.7, ease: softEase }}
            className="text-balance font-serif text-4xl font-normal leading-[1.08] tracking-[-0.01em] sm:text-5xl lg:text-[3.75rem]"
          >
            Bring every shipment into focus
          </motion.h2>

          <motion.p
            variants={fadeInUp}
            transition={{ duration: 0.7, ease: softEase }}
            className="mt-5 max-w-md text-balance text-[15px] leading-relaxed text-muted-foreground sm:text-base"
          >
            See how WiseShips connects container follow-up, origin inspections,
            customers, and commercial deals in one CRM.
          </motion.p>

          <motion.div
            variants={fadeInUp}
            transition={{ duration: 0.7, ease: softEase }}
            className="mt-8 flex flex-wrap items-center justify-center gap-3"
          >
            <CutButton
              variant="solid"
              href="/contact"
              onClick={(e) => {
                if (onOpenGetStarted) {
                  e.preventDefault();
                  onOpenGetStarted();
                }
              }}
            >
              Book a demo
            </CutButton>
            <CutButton
              variant="outline"
              href="/contact"
              onClick={(e) => {
                if (onOpenDemo) {
                  e.preventDefault();
                  onOpenDemo();
                }
              }}
            >
              Contact WiseShips
            </CutButton>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

