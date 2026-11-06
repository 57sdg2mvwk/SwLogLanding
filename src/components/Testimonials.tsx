import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { CornerPlus, Kicker } from './CornerPlus';
import { CutButton } from './CutButton';

interface Testimonial {
  quote: string;
  name: string;
  role: string;
  image: string;
}

const testimonials: Testimonial[] = [
  {
    quote:
      'The flexibility is really what made the difference. Our threat surface shifts weekly — I surface a new gap and in two clicks WiseShips already has it covered. That is a real advantage when you are moving quickly.',
    name: 'Olivier Reinaud',
    role: 'Co-founder at NetZero',
    image: '/testimonials/person-1.jpg',
  },
  {
    quote:
      'We cut mean time to detect from hours to seconds. Instead of drowning my analysts in alerts, WiseShips hands them the one correlated signal that actually matters — every single time.',
    name: 'Priya Anand',
    role: 'CISO at Halcyon Bank',
    image: '/testimonials/person-2.jpg',
  },
  {
    quote:
      'Consolidating six tools into one platform paid for itself in a quarter. The audit trail alone turned a two-week compliance scramble into an afternoon. Nothing slips through anymore.',
    name: 'Marcus Webb',
    role: 'Head of Security at Arc Logistics',
    image: '/testimonials/person-3.jpg',
  },
];

export function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(1);

  const current = testimonials[currentIndex];

  const handlePrev = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const handleNext = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  return (
    <section className="mx-auto max-w-[1440px] px-5 pb-24 sm:px-8 sm:pb-32 lg:px-10">
      <div className="grid items-stretch gap-10 lg:grid-cols-[1fr_1.35fr] lg:gap-12">
        {/* Left: Cut Portrait Photo */}
        <div className="flex items-center">
          <div
            style={{ ['--cut' as string]: '28px' }}
            className="relative aspect-[4/5] w-full overflow-hidden [clip-path:polygon(var(--cut)_0,100%_0,100%_calc(100%-var(--cut)),calc(100%-var(--cut))_100%,0_100%,0_var(--cut))] bg-[#e6eeff] dark:bg-[#05122e]"
          >
            <AnimatePresence mode="wait">
              <motion.img
                key={current.image}
                src={current.image}
                alt={current.name}
                initial={{ opacity: 0, scale: 1.05 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.45 }}
                className="block h-full w-full object-cover [filter:grayscale(1)_contrast(1.1)] dark:[filter:grayscale(1)_contrast(1.2)]"
              />
            </AnimatePresence>
            <div className="absolute inset-0 bg-[#3b76ff] opacity-15 mix-blend-color pointer-events-none" />
          </div>
        </div>

        {/* Right: Quote & Controls */}
        <div className="relative flex flex-col lg:border-l lg:border-border lg:pl-12">
          <CornerPlus className="left-0 top-0 hidden -translate-x-1/2 -translate-y-1/2 lg:block" />
          <CornerPlus className="bottom-0 left-0 hidden -translate-x-1/2 translate-y-1/2 lg:block" />

          <Kicker>Real reviews from real customers</Kicker>

          <div className="mt-6 flex-1 min-h-[160px]">
            <AnimatePresence mode="wait">
              <motion.blockquote
                key={current.quote}
                initial={{ opacity: 0, x: direction * 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -direction * 20 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                className="text-balance font-serif text-2xl font-normal leading-[1.28] tracking-[-0.01em] sm:text-3xl lg:text-[2.25rem] lg:leading-[1.3]"
              >
                &ldquo;{current.quote}&rdquo;
              </motion.blockquote>
            </AnimatePresence>
          </div>

          <div className="mt-10 flex items-end justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="flex gap-2">
                <CutButton
                  variant="outline"
                  iconOnly
                  onClick={handlePrev}
                  aria-label="Previous testimonial"
                >
                  <ArrowLeft className="h-4 w-4" aria-hidden="true" />
                </CutButton>
                <CutButton
                  variant="outline"
                  iconOnly
                  onClick={handleNext}
                  aria-label="Next testimonial"
                >
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </CutButton>
              </div>

              <div className="flex items-center gap-1.5">
                {testimonials.map((_, idx) => (
                  <button
                    key={idx}
                    type="button"
                    aria-label={`Show testimonial ${idx + 1}`}
                    aria-current={currentIndex === idx}
                    onClick={() => {
                      setDirection(idx > currentIndex ? 1 : -1);
                      setCurrentIndex(idx);
                    }}
                    className={`h-2 rounded-[2px] transition-all duration-300 focus-ring ${
                      currentIndex === idx
                        ? 'w-5 bg-[#2f80ff]'
                        : 'w-2 bg-border hover:bg-muted-foreground/50'
                    }`}
                  />
                ))}
              </div>
            </div>

            <div className="text-right">
              <div className="text-sm font-semibold tracking-tight">
                {current.name}
              </div>
              <div className="mt-0.5 text-sm text-muted-foreground">
                {current.role}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
