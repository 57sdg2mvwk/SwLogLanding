import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import { CutButton } from '../components/CutButton';
import { CornerPlus } from '../components/CornerPlus';

export const clippedPanel: React.CSSProperties = {
  clipPath: 'polygon(0 0, calc(100% - 28px) 0, 100% 28px, 100% 100%, 0 100%)',
};

export function PageShell({
  children,
  allowStickyOverflow = false,
}: {
  children: React.ReactNode;
  allowStickyOverflow?: boolean;
}) {
  return (
    <div className={`relative flex flex-1 flex-col ${allowStickyOverflow ? 'overflow-visible' : 'overflow-hidden'} bg-background text-foreground antialiased`}>
      <div className="h-16 shrink-0" aria-hidden="true" />
      <main id="main-content" className="relative flex-1">
        {children}
      </main>
    </div>
  );
}

export function PageKicker({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-2">
      <span className="h-2 w-2 bg-[#2f80ff]" aria-hidden="true" />
      <p className="font-mono text-[11px] font-medium uppercase tracking-[0.16em] text-muted-foreground">
        {children}
      </p>
    </div>
  );
}

export function PageHero({
  kicker,
  title,
  emphasis,
  description,
  heroArt,
}: {
  kicker: string;
  title: React.ReactNode;
  emphasis?: React.ReactNode;
  description: string;
  heroArt?: React.ReactNode;
}) {
  return (
    <section className="relative mx-auto grid max-w-[1440px] gap-10 px-5 pb-16 pt-12 sm:px-8 sm:pb-20 sm:pt-16 lg:grid-cols-[1.04fr_0.96fr] lg:items-end lg:gap-16 lg:px-10 lg:pb-24 lg:pt-20">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
        className="max-w-3xl"
      >
        <PageKicker>{kicker}</PageKicker>
        <h1 className="mt-5 text-balance font-serif text-4xl font-normal leading-[1.08] tracking-[-0.01em] sm:text-5xl lg:text-[3.7rem]">
          {title}{' '}
          {emphasis && (
            <span className="font-sans font-semibold tracking-tight">{emphasis}</span>
          )}
        </h1>
        <p className="mt-5 max-w-2xl text-pretty text-sm leading-7 text-muted-foreground sm:text-base">
          {description}
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <CutButton variant="solid" href="/contact">
            Talk to our team
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </CutButton>
          <CutButton variant="outline" href="#page-details">
            Explore the workflow
          </CutButton>
        </div>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
        className="relative"
      >
        {heroArt ?? childrenHeroArt(kicker)}
      </motion.div>
    </section>
  );
}

function childrenHeroArt(kicker: string) {
  return (
    <div className="relative">
      <div className="absolute -inset-3 border border-dashed border-border/70" aria-hidden="true" />
      <div className="bg-border p-px" style={clippedPanel}>
        <div className="relative overflow-hidden bg-background p-5 sm:p-7" style={clippedPanel}>
          <div className="mb-5 flex items-center justify-between border-b border-border/70 pb-4">
            <div className="flex items-center gap-2.5">
              <span className="h-2 w-2 rounded-full bg-[#2f80ff]" aria-hidden="true" />
              <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-muted-foreground">
                WiseShips workspace
              </span>
            </div>
            <span className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
              {kicker}
            </span>
          </div>
          <div className="grid grid-cols-[1fr_auto] gap-4">
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.12em] text-muted-foreground">
                Sample shipment record
              </p>
              <p className="mt-1 text-lg font-semibold tracking-tight">WS-2048 / Ningbo → Long Beach</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {['Container', 'Milestones', 'Documents'].map((label) => (
                  <span key={label} className="border border-border px-2 py-1 text-[10px] text-muted-foreground">
                    {label}
                  </span>
                ))}
              </div>
            </div>
            <div className="flex h-10 w-10 items-center justify-center border border-[#2f80ff]/35 bg-[#2f80ff]/[0.07] font-mono text-[10px] text-[#2f80ff]">
              WS
            </div>
          </div>
          <div className="mt-6 border-t border-dotted border-border pt-4">
            <div className="flex items-center justify-between text-[11px]">
              <span className="font-medium">Origin inspection</span>
              <span className="text-muted-foreground">Report attached</span>
            </div>
            <div className="mt-3 h-1 overflow-hidden bg-muted">
              <div className="h-full w-[68%] bg-[#2f80ff]" />
            </div>
            <div className="mt-2 flex justify-between font-mono text-[9px] uppercase tracking-wider text-muted-foreground">
              <span>Origin</span><span>In transit</span><span>Delivery</span>
            </div>
          </div>
          <CornerPlus className="right-0 top-0 translate-x-1/2 -translate-y-1/2" />
        </div>
      </div>
      <p className="mt-3 text-right font-mono text-[10px] uppercase tracking-[0.14em] text-muted-foreground">
        One connected operational record
      </p>
    </div>
  );
}

export function SectionIntro({
  eyebrow,
  title,
  children,
}: {
  eyebrow: string;
  title: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <div className="max-w-2xl">
      <PageKicker>{eyebrow}</PageKicker>
      <h2 className="mt-4 text-balance font-serif text-3xl font-normal leading-[1.12] tracking-[-0.01em] sm:text-4xl lg:text-[2.75rem]">
        {title}
      </h2>
      <p className="mt-4 max-w-xl text-sm leading-relaxed text-muted-foreground sm:text-base">
        {children}
      </p>
    </div>
  );
}

export function ContactBand({
  title = 'Bring your operation into focus.',
  description = 'Talk with the WiseShips team about the handoffs your operation needs to keep connected.',
}: {
  title?: string;
  description?: string;
}) {
  return (
    <section className="mx-auto max-w-[1440px] px-5 pb-20 sm:px-8 sm:pb-28 lg:px-10">
      <div className="relative border-y border-border py-9 sm:py-12">
        <CornerPlus className="left-0 top-0 -translate-x-1/2 -translate-y-1/2" />
        <CornerPlus className="right-0 bottom-0 translate-x-1/2 translate-y-1/2" />
        <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="max-w-2xl">
            <h2 className="font-serif text-2xl font-normal tracking-tight sm:text-3xl">{title}</h2>
            <p className="mt-2 max-w-xl text-sm leading-relaxed text-muted-foreground">{description}</p>
          </div>
          <CutButton variant="solid" href="/contact" className="self-start shrink-0 sm:self-auto">
            Contact WiseShips
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </CutButton>
        </div>
      </div>
    </section>
  );
}

export function NumberedRows({ rows }: { rows: { title: string; body: string }[] }) {
  return (
    <div className="border-t border-border">
      {rows.map((row, index) => (
        <div key={row.title} className="grid gap-2 border-b border-dotted border-border py-5 sm:grid-cols-[64px_1fr] sm:gap-4 sm:py-6">
          <span className="font-mono text-xs text-[#2f80ff]">0{index + 1}</span>
          <div>
            <h3 className="text-sm font-semibold tracking-tight">{row.title}</h3>
            <p className="mt-1.5 max-w-xl text-sm leading-relaxed text-muted-foreground">{row.body}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
