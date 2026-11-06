import React from 'react';
import { motion } from 'motion/react';
import { ClipboardCheck, FileText, PackageCheck, UsersRound } from 'lucide-react';
import { PlatformShowcase } from '../components/PlatformShowcase';
import { PageHero, PageShell, SectionIntro, ContactBand, NumberedRows, clippedPanel } from './PagePrimitives';

const featureItems = [
  {
    anchor: 'shipment-tracking',
    icon: PackageCheck,
    code: '01 / TRACK',
    title: 'Shipment milestones, in context',
    description:
      'Keep container references, routes, booking details, and milestone dates together. The shipment record gives teams a shared place to follow the operation from origin through delivery.',
    details: ['Containers & bookings', 'Routes & milestone dates', 'Shipment status'],
    side: '01',
  },
  {
    anchor: 'origin-inspections',
    icon: ClipboardCheck,
    code: '02 / INSPECT',
    title: 'Origin work that stays attached',
    description:
      'Coordinate inspection requests and assignments with the shipment and client they support. Keep reports, evidence, and updates alongside the operation.',
    details: ['Inspection requests', 'Reports & evidence', 'Shipment handoffs'],
    side: '02',
  },
  {
    anchor: 'clients-deals',
    icon: UsersRound,
    code: '03 / CONNECT',
    title: 'Commercial context for every client',
    description:
      'Keep company and contact records, opportunities, proposals, contracts, and follow-up visible alongside day-to-day shipment work.',
    details: ['Companies & contacts', 'Deals & proposals', 'Contracts & follow-up'],
    side: '03',
  },
  {
    anchor: 'documents',
    icon: FileText,
    code: '04 / FIND',
    title: 'Documents with the work they support',
    description:
      'Keep shipment files, inspection evidence, and commercial paperwork close to their related records, so the context does not disappear between teams.',
    details: ['Shipment files', 'Inspection documents', 'Commercial paperwork'],
    side: '04',
  },
];

export function PlatformPage() {
  return (
    <PageShell allowStickyOverflow>
      <PageHero
        kicker="Platform / One connected workspace"
        title={<>The operational picture,</>}
        emphasis="from origin to delivery."
        description="WiseShips connects container tracking, origin inspections, clients, deals, and documents around the shipments your team moves every day."
      />
      <PlatformShowcase includePillars={false} />
      <section id="page-details" className="mx-auto max-w-[1440px] scroll-mt-24 px-5 pb-16 sm:px-8 sm:pb-24 lg:px-10">
        <div className="grid gap-10 border-t border-border pt-10 lg:grid-cols-[0.72fr_1.28fr] lg:gap-20 lg:pt-14">
          <div>
            <SectionIntro eyebrow="The platform" title={<>A shipment is more than a status.</>}>
              It is a chain of decisions, documents, and handoffs. WiseShips keeps the connected pieces visible in one CRM.
            </SectionIntro>
          </div>
          <div className="grid gap-5 sm:grid-cols-2">
            {featureItems.map((item, index) => {
              const Icon = item.icon;
              return (
                <motion.article
                  key={item.code}
                  id={item.anchor}
                  initial={{ opacity: 0, y: 14 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ duration: 0.5, delay: index * 0.07 }}
                  className="group relative flex min-h-[270px] scroll-mt-24 flex-col border border-border p-5 transition-transform duration-300 hover:-translate-y-1 sm:p-6"
                  style={clippedPanel}
                >
                  <div className="flex items-center justify-between">
                    <span className="flex h-9 w-9 items-center justify-center border border-border text-[#2f80ff]">
                      <Icon className="h-4 w-4" strokeWidth={1.6} aria-hidden="true" />
                    </span>
                    <span className="font-mono text-[10px] tracking-[0.12em] text-muted-foreground">{item.code}</span>
                  </div>
                  <h3 className="mt-7 text-lg font-semibold leading-snug tracking-tight">{item.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{item.description}</p>
                  <div className="mt-auto flex flex-wrap gap-x-3 gap-y-1 border-t border-dotted border-border pt-4 mt-5">
                    {item.details.map((detail) => (
                      <span key={detail} className="text-[10px] text-muted-foreground">{detail}</span>
                    ))}
                  </div>
                  <span className="absolute bottom-4 right-4 font-serif text-4xl leading-none text-foreground/[0.035]" aria-hidden="true">{item.side}</span>
                </motion.article>
              );
            })}
          </div>
        </div>
      </section>
      <section className="mx-auto max-w-[1440px] px-5 pb-20 sm:px-8 sm:pb-28 lg:px-10">
        <div className="grid gap-10 border-y border-border py-10 sm:py-14 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
          <SectionIntro eyebrow="A connected record" title={<>The handoff is part of the shipment.</>}>
            Keep the operational details and commercial relationships in view as work moves from one team to the next.
          </SectionIntro>
          <NumberedRows rows={[
            { title: 'Start with the shipment', body: 'Bring container references, route details, and milestones into a shared operational view.' },
            { title: 'Attach origin inspection work', body: 'Keep assignments, findings, and supporting evidence connected to the right shipment.' },
            { title: 'Keep the relationship visible', body: 'See the client, opportunity, and documents that belong with the work.' },
          ]} />
        </div>
      </section>
      <ContactBand title="See how WiseShips fits your workflow." />
    </PageShell>
  );
}

export default PlatformPage;
