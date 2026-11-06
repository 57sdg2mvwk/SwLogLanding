import React, { useRef } from 'react';
import { motion, useInView } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import { CutButton } from './CutButton';

const teamsData = [
  {
    title: 'Freight forwarders',
    detail:
      'Track containers and milestones while keeping customers, deals, and documents in view.',
  },
  {
    title: 'Origin inspection teams',
    detail:
      'Coordinate inspection assignments, reports, and evidence against each shipment.',
  },
  {
    title: 'Client operations',
    detail:
      'Connect customer communication, shipment updates, and commercial follow-up.',
  },
];

export function Stats() {
  const ref = useRef<HTMLDivElement | null>(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <section
      id="customers"
      ref={ref}
      className="mx-auto max-w-[1440px] scroll-mt-24 px-5 pb-24 sm:px-8 sm:pb-32 lg:px-10"
    >
      <div className="grid items-start gap-10 lg:grid-cols-2 lg:gap-16">
        <div className="lg:pt-6">
          <h2 className="text-balance font-serif text-3xl font-normal leading-[1.12] tracking-[-0.01em] sm:text-4xl lg:text-[2.75rem]">
            One workspace for{' '}
            <span className="font-sans font-semibold tracking-tight">
              every team in the shipment journey
            </span>
          </h2>
          <p className="mt-4 max-w-md text-sm leading-relaxed text-muted-foreground sm:text-base">
            Bring forwarders, origin inspection companies, and client teams
            around the shipment, its documents, and the next action.
          </p>
          <div className="mt-8">
            <CutButton variant="outline" href="/platform">
              Explore team workflows
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </CutButton>
          </div>
        </div>

        <div className="grid gap-6 sm:grid-cols-3 lg:gap-8">
          {teamsData.map((team, idx) => (
            <motion.div
              key={team.title}
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: idx * 0.12 }}
              className="flex flex-col border-t border-border pt-6"
            >
              <span className="font-serif text-5xl font-normal leading-none tracking-[-0.02em] tabular-nums sm:text-6xl">
                0{idx + 1}
              </span>
              <h3 className="mt-4 text-sm font-semibold tracking-tight">
                {team.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {team.detail}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
