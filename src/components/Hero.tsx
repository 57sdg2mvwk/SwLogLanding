import { lazy, Suspense } from 'react';
import { motion } from 'motion/react';
import { CutButton } from './CutButton';
import { useTheme } from '../context/ThemeContext';

const Ferrofluid = lazy(() => import('./Ferrofluid'));

const fadeInUp = {
  hidden: { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0 },
};

const staggerContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const softEase = [0.22, 1, 0.36, 1] as const;

export function Hero({
  onOpenGetStarted,
  onOpenTalkToUs,
}: {
  onOpenGetStarted?: () => void;
  onOpenTalkToUs?: () => void;
}) {
  const { resolvedTheme } = useTheme();
  const isLight = resolvedTheme === 'light';
  const fluidSettings = isLight
    ? {
        colors: ['#8799ad', '#647992', '#bbc8d6'],
        scale: 0.92,
        spikeHeight: 0.42,
        sharpness: 2.2,
        turbulence: 0.42,
        fluidity: 0.34,
        magnetism: 0.72,
        brightness: 1.08,
        mouseStrength: 0.65,
        mouseRadius: 0.2,
        opacity: 0.65,
      }
    : {
        colors: ['#ffffff', '#9db8e8', '#ffffff'],
        scale: 1.15,
        spikeHeight: 0.62,
        sharpness: 2.5,
        turbulence: 0.72,
        fluidity: 0.42,
        magnetism: 0.9,
        brightness: 0.92,
        mouseStrength: 0.9,
        mouseRadius: 0.24,
        opacity: 0.7,
      };

  return (
    <section className="relative isolate overflow-visible">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-12 bottom-[-96px] z-0 sm:top-16 sm:bottom-[-140px]"
      >
        <Suspense fallback={null}>
          <Ferrofluid
            className="pointer-events-none"
            colors={fluidSettings.colors}
            speed={0.32}
            scale={fluidSettings.scale}
            spikeHeight={fluidSettings.spikeHeight}
            sharpness={fluidSettings.sharpness}
            turbulence={fluidSettings.turbulence}
            fluidity={fluidSettings.fluidity}
            tilt={48}
            magnetism={fluidSettings.magnetism}
            brightness={fluidSettings.brightness}
            mouseInteraction
            mouseStrength={fluidSettings.mouseStrength}
            mouseRadius={fluidSettings.mouseRadius}
            clickPulse={false}
            intro={false}
            lightMode={isLight}
            transparent
            opacity={fluidSettings.opacity}
            dpr={1}
            color={undefined}
            mixBlendMode={undefined}
            style={{ position: 'absolute', inset: 0 }}
          />
        </Suspense>
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background: `linear-gradient(to bottom, color-mix(in srgb, var(--foreground) ${
              resolvedTheme === 'dark' ? '2.5%' : '1.5%'
            }, var(--background)) 0%, transparent 68%, var(--background) 100%)`,
          }}
        />
      </div>
      <div className="relative z-10 mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-10">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="relative mx-auto flex max-w-2xl flex-col items-center pb-12 pt-32 text-center sm:pt-40"
        >
          <motion.h1
            variants={fadeInUp}
            transition={{ duration: 0.7, ease: softEase }}
            className="text-balance font-serif text-4xl font-normal leading-[1.1] tracking-[-0.01em] sm:text-5xl lg:text-[3.5rem]"
          >
            Run every shipment from{' '}
            <span className="font-sans font-medium tracking-tight">
              one connected workspace
            </span>
          </motion.h1>

          <motion.p
            variants={fadeInUp}
            transition={{ duration: 0.7, ease: softEase }}
            className="mt-4 max-w-xl text-balance text-[15px] leading-relaxed text-muted-foreground sm:text-base"
          >
            WiseShips CRM helps freight forwarders and origin-inspection teams
            track containers, coordinate operations, manage clients, and move
            deals forward.
          </motion.p>

          <motion.div
            variants={fadeInUp}
            transition={{ duration: 0.7, ease: softEase }}
            className="mt-7 flex items-center justify-center gap-3"
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
                if (onOpenTalkToUs) {
                  e.preventDefault();
                  onOpenTalkToUs();
                }
              }}
            >
              Talk to our team
            </CutButton>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
