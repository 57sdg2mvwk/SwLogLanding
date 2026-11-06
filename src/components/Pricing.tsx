import React from 'react';
import { motion } from 'motion/react';
import { CheckCircle2 } from 'lucide-react';
import { CutButton } from './CutButton';
import { AsciiIcon } from './AsciiIcon';

interface Plan {
  name: string;
  audience: string;
  scope: string;
  blurb: string;
  icon: string;
  features: string[];
  highlighted?: boolean;
}

const plans: Plan[] = [
  {
    name: 'Forwarder CRM',
    audience: 'Freight forwarders',
    scope: 'Containers & customers',
    blurb: 'Keep shipment operations and customer follow-up connected.',
    icon: 'bolt',
    features: [
      'Container and shipment tracking',
      'Routes, milestones, and documents',
      'Client records and follow-up',
      'Deals, proposals, and contracts',
    ],
    highlighted: true,
  },
  {
    name: 'Origin inspections',
    audience: 'Inspection companies',
    scope: 'Requests & evidence',
    blurb: 'Coordinate inspection work in the context of each shipment.',
    icon: 'plus',
    features: [
      'Inspection requests and assignments',
      'Reports and supporting evidence',
      'Shipment and client context',
      'Operational handoff visibility',
    ],
  },
  {
    name: 'Connected operations',
    audience: 'Forwarders & inspectors',
    scope: 'Origin-to-destination',
    blurb: 'Keep the teams and information around a shipment aligned.',
    icon: 'bars',
    features: [
      'Shared shipment records',
      'Inspection and document handoffs',
      'Client and deal visibility',
      'Follow-up tied to each operation',
    ],
  },
];

const cutPathCard: React.CSSProperties = {
  clipPath: 'polygon(0 0, calc(100% - 34px) 0, 100% 34px, 100% 100%, 0 100%)',
};

export function Pricing({
  onOpenGetStarted,
  onOpenContact,
}: {
  onOpenGetStarted?: () => void;
  onOpenContact?: () => void;
}) {
  return (
    <section
      id="solutions"
      className="mx-auto max-w-[1440px] scroll-mt-24 px-5 pb-24 sm:px-8 sm:pb-32 lg:px-10"
    >
      <div className="max-w-2xl">
          <h2 className="text-balance font-serif text-3xl font-normal leading-[1.12] tracking-[-0.01em] sm:text-4xl lg:text-[2.75rem]">
            One CRM for the teams behind every shipment
          </h2>
          <p className="mt-4 max-w-xl text-sm leading-relaxed text-muted-foreground sm:text-base">
            Explore how WiseShips supports forwarders, origin-inspection
            companies, and the handoffs they coordinate together.
          </p>
      </div>

      {/* Logistics workflow cards */}
      <div className="mt-12 grid gap-5 lg:grid-cols-3 lg:gap-6">
        {plans.map((plan, idx) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.55, delay: idx * 0.1 }}
              className={`p-px ${
                plan.highlighted ? 'bg-[#2f80ff]' : 'bg-border'
              }`}
              style={cutPathCard}
            >
              <article
                className="flex h-full flex-col bg-background p-6 sm:p-7"
                style={cutPathCard}
              >
                <header className="flex items-start justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-2.5">
                      <h3 className="text-lg font-semibold tracking-tight">
                        {plan.name}
                      </h3>
                      {plan.highlighted && (
                        <span className="rounded-[3px] bg-[#2f80ff] px-2 py-0.5 text-[11px] font-semibold leading-none text-white">
                          Forwarder workflow
                        </span>
                      )}
                    </div>
                    <p className="mt-1.5 text-sm text-muted-foreground">
                      {plan.blurb}
                    </p>
                  </div>
                  <AsciiIcon shape={plan.icon} cols={10} className="-mt-1 shrink-0" />
                </header>

                <div className="mt-6">
                  <span className="text-[10px] font-medium uppercase tracking-[0.12em] text-muted-foreground">
                    {plan.audience}
                  </span>
                  <p className="mt-1 font-serif text-2xl font-normal tracking-tight">
                    {plan.scope}
                  </p>
                </div>

                <div className="my-6 border-t border-dotted border-border" />

                <ul className="flex-1 space-y-3">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2.5">
                      <CheckCircle2
                        className="mt-0.5 h-[18px] w-[18px] shrink-0 text-[#2f80ff]"
                        aria-hidden="true"
                      />
                      <span className="text-sm leading-relaxed text-muted-foreground">
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>

                <div className="mt-8">
                  <CutButton
                    href="/contact"
                    variant={plan.highlighted ? 'solid' : 'outline'}
                    fullWidth
                    onClick={(e) => {
                      if (onOpenGetStarted) {
                        e.preventDefault();
                        onOpenGetStarted();
                      }
                    }}
                  >
                    Discuss this workflow
                  </CutButton>
                </div>
              </article>
            </motion.div>
          ))}
      </div>

      {/* Tailored workflow banner */}
      <div className="mt-6 bg-border p-px" style={cutPathCard}>
        <div
          className="flex flex-col gap-6 bg-background p-6 sm:flex-row sm:items-center sm:justify-between sm:p-8"
          style={cutPathCard}
        >
          <div>
            <h3 className="font-serif text-xl font-normal tracking-[-0.01em] sm:text-2xl">
              Need a workflow tailored to your operation?
            </h3>
            <p className="mt-1.5 max-w-xl text-sm leading-relaxed text-muted-foreground">
              Tell us how your forwarding, inspection, and customer handoffs
              work today. We&apos;ll review how WiseShips fits your team.
            </p>
          </div>
          <CutButton
            href="/contact"
            variant="outline"
            className="self-start shrink-0 sm:self-auto"
            onClick={(e) => {
              if (onOpenContact) {
                e.preventDefault();
                onOpenContact();
              }
            }}
          >
            Arrange a demo
          </CutButton>
        </div>
      </div>
    </section>
  );
}
