import React from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { ArrowRight, Check, CircleDashed, GitBranch, Layers3 } from 'lucide-react';
import { CutButton } from '../components/CutButton';
import { DeveloperTerminal } from '../components/DeveloperTerminal';
import {
  ContactBand,
  NumberedRows,
  PageHero,
  PageShell,
  SectionIntro,
} from './PagePrimitives';

const reviewRows = [
  {
    title: 'We learn the operation before shaping a solution.',
    body: 'The team looks at the people, records, handoffs, and constraints behind the request—not just the screen someone asked for.',
  },
  {
    title: 'A proposal is reviewed for fit and reliability.',
    body: 'We assess whether the module belongs in WiseShips, how it should behave alongside existing workflows, and what it would take to support it well.',
  },
  {
    title: 'Viable work is scoped and built with you.',
    body: 'If the proposal is a good fit, we define its scope and build the module around the agreed operational need. Not every request will be a fit to build.',
  },
  {
    title: 'Shared availability is a separate decision.',
    body: 'A module is not automatically added to the product for everyone. If it is suitable beyond your operation, we can review whether to make an approved version active for WiseShips users.',
  },
];

const examples = [
  {
    label: 'Forwarding operations',
    title: 'A handoff that matches your route.',
    body: 'Bring the shipment details your team relies on into a focused view for the next operational decision.',
    icon: GitBranch,
  },
  {
    label: 'Origin inspection',
    title: 'An inspection flow built around the assignment.',
    body: 'Shape the way requests, findings, and evidence come together for the work your inspectors actually do.',
    icon: Check,
  },
  {
    label: 'Across your operation',
    title: 'A specific step, made easier to follow.',
    body: 'Explore a purpose-built module when an important process does not quite fit the standard workspace.',
    icon: Layers3,
  },
];

export function DevelopersPage() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <PageShell>
      <PageHero
        kicker="Developers / Built around your operation"
        title={<>Your operation has</>}
        emphasis="its own logic."
        description="The only freight-forwarder CRM with a development team built in, WiseShips turns the right operational needs into considered modules—reviewed for reliability, built when viable, and shared only when approved for broader use."
        heroArt={<DeveloperTerminal />}
      />

      <section
        id="page-details"
        className="mx-auto max-w-[1440px] scroll-mt-24 px-5 pb-16 sm:px-8 sm:pb-24 lg:px-10"
      >
        <div className="grid gap-10 border-t border-border pt-10 lg:grid-cols-[0.76fr_1.24fr] lg:gap-20 lg:pt-14">
          <div>
            <SectionIntro eyebrow="A development team, included" title={<>Not a request box. A thoughtful process.</>}>
              Start with the work your team needs to get done. We help decide what belongs in a custom module, then take the viable ideas through review and build.
            </SectionIntro>
            <CutButton variant="outline" href="/contact" className="mt-6">
              Discuss your workflow
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </CutButton>
          </div>

          <div className="relative overflow-hidden border border-border bg-muted/20 p-5 sm:p-7">
            <div className="flex items-center justify-between border-b border-border/70 pb-4">
              <div className="flex items-center gap-2.5">
                <span className="h-2 w-2 bg-[#2f80ff]" aria-hidden="true" />
                <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-muted-foreground">
                  From operational need to considered module
                </span>
              </div>
              <span className="hidden font-mono text-[10px] uppercase tracking-wider text-muted-foreground sm:block">
                WS / DEV
              </span>
            </div>

            <div className="relative mt-7 grid gap-3 sm:grid-cols-4">
              {[
                { n: '01', title: 'Understand', note: 'Your workflow' },
                { n: '02', title: 'Review', note: 'Fit & reliability' },
                { n: '03', title: 'Build', note: 'Viable scope' },
                { n: '04', title: 'Approve', note: 'Shared, if suitable' },
              ].map((step, index) => (
                <motion.div
                  key={step.n}
                  initial={shouldReduceMotion ? false : { opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-20px' }}
                  transition={{ duration: 0.42, delay: shouldReduceMotion ? 0 : index * 0.08 }}
                  className="relative border border-border bg-background p-3.5"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-[10px] text-[#2f80ff]">{step.n}</span>
                    {index === 3 ? (
                      <CircleDashed className="h-3.5 w-3.5 text-muted-foreground" aria-hidden="true" />
                    ) : (
                      <span className="h-px w-5 bg-border" aria-hidden="true" />
                    )}
                  </div>
                  <p className="mt-5 text-sm font-semibold tracking-tight">{step.title}</p>
                  <p className="mt-1 text-[11px] leading-relaxed text-muted-foreground">{step.note}</p>
                </motion.div>
              ))}
            </div>

            <p className="mt-5 border-l-2 border-[#2f80ff]/50 pl-3 text-xs leading-relaxed text-muted-foreground">
              A custom module is reviewed before it is built. Broader availability is considered separately; it is never automatic.
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1440px] px-5 pb-16 sm:px-8 sm:pb-24 lg:px-10">
        <div className="grid gap-10 border-y border-border py-10 sm:py-14 lg:grid-cols-[0.76fr_1.24fr] lg:gap-20">
          <SectionIntro eyebrow="How it works" title={<>Good ideas get a proper review.</>}>
            The development team is part of the service. Its job is to understand your context and make careful decisions—not to promise that every suggestion becomes software.
          </SectionIntro>
          <NumberedRows rows={reviewRows} />
        </div>
      </section>

      <section className="mx-auto max-w-[1440px] px-5 pb-20 sm:px-8 sm:pb-28 lg:px-10">
        <div className="grid gap-10 lg:grid-cols-[0.76fr_1.24fr] lg:gap-20">
          <div>
            <SectionIntro eyebrow="Where it can help" title={<>The details that make your operation yours.</>}>
              A useful module starts with a real operational distinction: a handoff, an inspection step, or a way your team needs to see its work.
            </SectionIntro>
          </div>
          <div className="divide-y divide-dotted divide-border border-y border-border">
            {examples.map((example, index) => {
              const Icon = example.icon;
              return (
                <motion.article
                  key={example.label}
                  initial={shouldReduceMotion ? false : { opacity: 0, x: 10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: '-25px' }}
                  transition={{ duration: 0.45, delay: shouldReduceMotion ? 0 : index * 0.07 }}
                  className="grid gap-4 py-6 sm:grid-cols-[52px_1fr] sm:gap-5 sm:py-7"
                >
                  <div className="flex items-center gap-3 sm:block">
                    <span className="font-mono text-[11px] text-[#2f80ff]">0{index + 1}</span>
                    <span className="flex h-9 w-9 items-center justify-center border border-border text-muted-foreground sm:mt-4">
                      <Icon className="h-4 w-4" strokeWidth={1.6} aria-hidden="true" />
                    </span>
                  </div>
                  <div className="grid gap-3 md:grid-cols-[0.9fr_1.1fr] md:items-start">
                    <div>
                      <p className="font-mono text-[10px] uppercase tracking-[0.12em] text-muted-foreground">{example.label}</p>
                      <h3 className="mt-1.5 text-base font-semibold tracking-tight">{example.title}</h3>
                    </div>
                    <p className="max-w-md text-sm leading-relaxed text-muted-foreground">{example.body}</p>
                  </div>
                </motion.article>
              );
            })}
          </div>
        </div>
      </section>

      <ContactBand
        title="Tell us where the workflow gets specific."
        description="Walk us through your forwarding or inspection operation. We’ll discuss whether a custom module is a good fit and what a thoughtful next step could be."
      />
    </PageShell>
  );
}

export default DevelopersPage;
