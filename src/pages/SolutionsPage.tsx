import React from 'react';
import { motion } from 'motion/react';
import { ArrowDownRight, ArrowRight, ClipboardCheck, PackageCheck, UsersRound } from 'lucide-react';
import { CutButton } from '../components/CutButton';
import { Faq } from '../components/Faq';
import { PageHero, PageShell, SectionIntro, clippedPanel } from './PagePrimitives';

const solutionTracks = [
  {
    label: 'For freight forwarders',
    index: '01',
    title: 'Keep each shipment moving—and its context close.',
    copy: 'Track containers and milestone dates while keeping client communication, deals, and supporting documents in view.',
    steps: ['Create a clear shipment record', 'Follow routes and milestones', 'Keep client and commercial context connected'],
    icon: PackageCheck,
    footer: 'Containers · Clients · Deals',
  },
  {
    label: 'For origin-inspection companies',
    index: '02',
    title: 'Coordinate the inspection around the shipment.',
    copy: 'Keep requests, assignments, reports, and evidence together with the operation and customer they support.',
    steps: ['Organize inspection requests', 'Keep reports and evidence at hand', 'Pass updates along with shipment context'],
    icon: ClipboardCheck,
    footer: 'Requests · Reports · Evidence',
  },
];

export function SolutionsPage({ onOpenContact }: { onOpenContact?: () => void }) {
  return (
    <PageShell>
      <PageHero
        kicker="Solutions / Workflows"
        title={<>Built around the work</>}
        emphasis="behind every shipment."
        description="Different teams own different steps. WiseShips gives forwarders and origin-inspection companies a connected view of the operational and client work around each shipment."
      />
      <section id="page-details" className="mx-auto max-w-[1440px] scroll-mt-24 px-5 pb-14 sm:px-8 sm:pb-20 lg:px-10">
        <div className="flex flex-col justify-between gap-5 border-t border-border pt-8 sm:flex-row sm:items-end">
          <SectionIntro eyebrow="Two operating rhythms" title={<>Clear workflows. Connected handoffs.</>}>
            Start with the way your team works, then keep the related records in view across the journey.
          </SectionIntro>
          <div className="flex items-center gap-2 pb-1 font-mono text-[10px] uppercase tracking-[0.14em] text-muted-foreground">
            <span>Origin</span><ArrowRight className="h-3 w-3 text-[#2f80ff]" aria-hidden="true" /><span>Delivery</span>
          </div>
        </div>
        <div className="mt-10 grid gap-5 lg:grid-cols-2 lg:gap-6">
          {solutionTracks.map((track, index) => {
            const Icon = track.icon;
            return (
              <motion.article
                key={track.index}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.55, delay: index * 0.1 }}
                className="relative overflow-hidden border border-border bg-background p-6 sm:p-8"
                style={clippedPanel}
              >
                <div className="flex items-center justify-between border-b border-border/70 pb-5">
                  <div className="flex items-center gap-3">
                    <span className="flex h-10 w-10 items-center justify-center border border-border text-[#2f80ff]">
                      <Icon className="h-[18px] w-[18px]" strokeWidth={1.6} aria-hidden="true" />
                    </span>
                    <span className="text-sm font-semibold tracking-tight">{track.label}</span>
                  </div>
                  <span className="font-mono text-xs text-muted-foreground">{track.index} / 02</span>
                </div>
                <h2 className="mt-7 max-w-lg text-balance font-serif text-2xl leading-tight tracking-tight sm:text-3xl">{track.title}</h2>
                <p className="mt-3 max-w-lg text-sm leading-relaxed text-muted-foreground">{track.copy}</p>
                <ol className="mt-8 border-t border-dotted border-border">
                  {track.steps.map((step, idx) => (
                    <li key={step} className="flex items-center gap-4 border-b border-dotted border-border py-4">
                      <span className="font-mono text-[10px] text-[#2f80ff]">0{idx + 1}</span>
                      <span className="text-sm font-medium">{step}</span>
                      <ArrowDownRight className="ml-auto h-4 w-4 text-muted-foreground/60" aria-hidden="true" />
                    </li>
                  ))}
                </ol>
                <div className="mt-6 flex items-center justify-between gap-4">
                  <span className="font-mono text-[9px] uppercase tracking-[0.12em] text-muted-foreground">{track.footer}</span>
                  <CutButton variant="outline" href="/contact" iconOnly aria-label={`Discuss ${track.label}`}>
                    <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </CutButton>
                </div>
              </motion.article>
            );
          })}
        </div>
      </section>
      <section className="mx-auto max-w-[1440px] px-5 pb-20 sm:px-8 sm:pb-28 lg:px-10">
        <div className="relative grid gap-8 border-y border-border py-10 sm:py-14 lg:grid-cols-[1fr_auto_1fr] lg:items-center">
          <div>
            <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-muted-foreground">Shared record</span>
            <h2 className="mt-3 max-w-md font-serif text-2xl leading-tight sm:text-3xl">A better handoff starts with shared context.</h2>
          </div>
          <div className="hidden h-16 w-px bg-border lg:block" aria-hidden="true" />
          <div className="flex items-start gap-4">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center border border-[#2f80ff]/30 bg-[#2f80ff]/[0.06] text-[#2f80ff]">
              <UsersRound className="h-4 w-4" aria-hidden="true" />
            </span>
            <p className="max-w-xl text-sm leading-relaxed text-muted-foreground">
              When shipment milestones, inspection work, client records, and documents stay connected, teams can pick up the next step with more of the picture in front of them.
            </p>
          </div>
        </div>
      </section>
      <Faq onOpenContact={onOpenContact} />
    </PageShell>
  );
}

export default SolutionsPage;
