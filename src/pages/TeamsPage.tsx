import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, ClipboardCheck, PackageCheck, UsersRound } from 'lucide-react';
import { PageHero, PageShell, SectionIntro, ContactBand, NumberedRows } from './PagePrimitives';

const teams = [
  {
    number: '01',
    title: 'Freight forwarders',
    icon: PackageCheck,
    description: 'Follow containers and milestones without losing sight of the customer relationship behind the shipment.',
    includes: ['Shipment & container tracking', 'Client records and follow-up', 'Deals, contracts, and documents'],
  },
  {
    number: '02',
    title: 'Origin-inspection teams',
    icon: ClipboardCheck,
    description: 'Keep inspection requests, assignments, reporting, and evidence connected to the shipment being inspected.',
    includes: ['Inspection requests', 'Reports and evidence', 'Shipment and client context'],
  },
  {
    number: '03',
    title: 'Client operations',
    icon: UsersRound,
    description: 'Keep customer communication and commercial follow-up close to the operational work it relates to.',
    includes: ['Companies and contacts', 'Opportunities and proposals', 'Next steps around shipments'],
  },
];

export function TeamsPage() {
  return (
    <PageShell>
      <PageHero
        kicker="Teams / Shared operations"
        title={<>For the people who</>}
        emphasis="keep shipments moving."
        description="WiseShips brings forwarders, origin-inspection teams, and client operations around a shared view of the shipment, the relationship, and the next handoff."
      />
      <section id="page-details" className="mx-auto max-w-[1440px] scroll-mt-24 px-5 pb-16 sm:px-8 sm:pb-24 lg:px-10">
        <div className="grid gap-10 border-t border-border pt-10 lg:grid-cols-[0.75fr_1.25fr] lg:gap-20 lg:pt-14">
          <SectionIntro eyebrow="Who it supports" title={<>One journey. Different responsibilities.</>}>
            Each team can work in its own part of the process while keeping the shared shipment context close.
          </SectionIntro>
          <div className="divide-y divide-dotted divide-border border-y border-border">
            {teams.map((team, index) => {
              const Icon = team.icon;
              return (
                <motion.article
                  key={team.number}
                  initial={{ opacity: 0, x: 10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: '-30px' }}
                  transition={{ duration: 0.5, delay: index * 0.08 }}
                  className="grid gap-4 py-6 sm:grid-cols-[52px_1fr] sm:gap-5 sm:py-7"
                >
                  <div className="flex items-center gap-3 sm:block">
                    <span className="font-mono text-[11px] text-[#2f80ff]">{team.number}</span>
                    <span className="flex h-9 w-9 items-center justify-center border border-border text-muted-foreground sm:mt-4">
                      <Icon className="h-4 w-4" strokeWidth={1.6} aria-hidden="true" />
                    </span>
                  </div>
                  <div className="grid gap-4 md:grid-cols-[0.9fr_1.1fr] md:items-start">
                    <div>
                      <h3 className="text-lg font-semibold tracking-tight">{team.title}</h3>
                      <p className="mt-2 max-w-md text-sm leading-relaxed text-muted-foreground">{team.description}</p>
                    </div>
                    <ul className="border-l border-border pl-4 md:ml-2">
                      {team.includes.map((item) => (
                        <li key={item} className="py-1.5 text-xs text-muted-foreground">{item}</li>
                      ))}
                    </ul>
                  </div>
                </motion.article>
              );
            })}
          </div>
        </div>
      </section>
      <section className="mx-auto max-w-[1440px] px-5 pb-20 sm:px-8 sm:pb-28 lg:px-10">
        <div className="grid gap-10 lg:grid-cols-[0.75fr_1.25fr] lg:gap-20">
          <div>
            <SectionIntro eyebrow="The shared thread" title={<>A record teams can pick up.</>}>
              The details that matter to one role often become the next team’s starting point.
            </SectionIntro>
            <a href="/platform" className="focus-ring mt-6 inline-flex items-center gap-2 text-sm font-medium transition-colors hover:text-[#2f80ff]">
              Explore the platform <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </a>
          </div>
          <NumberedRows rows={[
            { title: 'Operations see the shipment', body: 'Container details, routes, and milestone dates provide the shared operational picture.' },
            { title: 'Inspection sees the assignment', body: 'Requests, reports, and evidence stay in context with the shipment being inspected.' },
            { title: 'Client teams see the relationship', body: 'Contacts, deals, documents, and follow-up connect commercial work to operations.' },
          ]} />
        </div>
      </section>
      <ContactBand title="A closer look for your team." description="Share how your forwarding, inspection, or client operations work today." />
    </PageShell>
  );
}

export default TeamsPage;
