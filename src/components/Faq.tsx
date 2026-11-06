import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown } from 'lucide-react';
import { CornerPlus } from './CornerPlus';
import { CutButton } from './CutButton';

interface FaqItem {
  question: string;
  answer: string;
}

const faqs: FaqItem[] = [
  {
    question: 'What is WiseShips CRM?',
    answer:
      'WiseShips is a logistics CRM for freight forwarders and origin-inspection companies. It brings container tracking, shipment operations, client relationships, deals, and documents into one workspace.',
  },
  {
    question: 'Who is WiseShips built for?',
    answer:
      'WiseShips is designed for freight forwarders, origin-inspection teams, and the client teams that coordinate with them around shipments.',
  },
  {
    question: 'Can I follow containers and shipment milestones?',
    answer:
      'Keep container references, routes, milestone dates, and shipment documents together so your team can follow the operation from origin to destination.',
  },
  {
    question: 'How do origin inspections fit into the workflow?',
    answer:
      'Inspection companies can coordinate requests and keep reports, evidence, and updates connected to the shipment and client they support.',
  },
  {
    question: 'Can we manage clients, deals, and contracts?',
    answer:
      'WiseShips is designed to keep company and contact records, commercial opportunities, proposals, contracts, and follow-up in view alongside operations.',
  },
  {
    question: 'Can WiseShips match our current process?',
    answer:
      'Every forwarding and inspection operation is different. In a demo, we can review your current handoffs and confirm how WiseShips fits your team.',
  },
  {
    question: 'How can I see WiseShips in action?',
    answer:
      'Contact our team to arrange a conversation about your operation. You can schedule through WhatsApp or write to support@wiseships.com.',
  },
];

const softEase = [0.22, 1, 0.36, 1] as const;

export function Faq({ onOpenContact }: { onOpenContact?: () => void }) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (idx: number) => {
    setOpenIndex((prev) => (prev === idx ? null : idx));
  };

  return (
    <section id="faq" className="mx-auto max-w-[1440px] px-5 pb-24 sm:px-8 sm:pb-32 lg:px-10">
      <div className="relative grid border-y border-border lg:grid-cols-[0.85fr_1.15fr]">
        <CornerPlus className="left-0 top-0 -translate-x-1/2 -translate-y-1/2" />
        <CornerPlus className="right-0 top-0 translate-x-1/2 -translate-y-1/2" />
        <CornerPlus className="bottom-0 left-0 -translate-x-1/2 translate-y-1/2" />
        <CornerPlus className="bottom-0 right-0 translate-x-1/2 translate-y-1/2" />

        {/* Left Column: Heading & Contact CTA */}
        <div className="border-b border-border py-10 lg:border-b-0 lg:border-r lg:py-16 lg:pr-12">
          <h2 className="text-balance font-serif text-4xl font-normal leading-[1.05] tracking-[-0.01em] sm:text-5xl lg:text-[3.5rem]">
            Questions about WiseShips
          </h2>
          <p className="mt-6 max-w-sm text-sm leading-relaxed text-muted-foreground sm:text-base">
            Learn how the CRM supports forwarders, inspection teams, and the
            shipments they coordinate. Need more detail? Talk to our team.
          </p>
          <div className="mt-8">
            <CutButton
              href="/contact"
              variant="outline"
              onClick={(e) => {
                if (onOpenContact) {
                  e.preventDefault();
                  onOpenContact();
                }
              }}
            >
              Contact WiseShips
            </CutButton>
          </div>
        </div>

        {/* Right Column: Accordion Panels */}
        <div className="relative">
          <CornerPlus className="left-0 top-0 hidden -translate-x-1/2 -translate-y-1/2 lg:block" />
          <CornerPlus className="bottom-0 left-0 hidden -translate-x-1/2 translate-y-1/2 lg:block" />

          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            const panelId = `faq-panel-${idx}`;
            const buttonId = `faq-button-${idx}`;

            return (
              <div
                key={faq.question}
                className="border-dotted border-border [&:not(:first-child)]:border-t"
              >
                <h3>
                  <button
                    id={buttonId}
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    onClick={() => toggle(idx)}
                    className="focus-ring flex w-full items-center justify-between gap-6 py-5 pr-1 text-left lg:py-6 lg:pl-12"
                  >
                    <span className="text-base font-medium tracking-tight sm:text-lg">
                      {faq.question}
                    </span>
                    <motion.span
                      animate={{ rotate: isOpen ? 180 : 0 }}
                      transition={{ duration: 0.3, ease: softEase }}
                      className="shrink-0 text-muted-foreground"
                    >
                      <ChevronDown className="h-5 w-5" aria-hidden="true" />
                    </motion.span>
                  </button>
                </h3>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      id={panelId}
                      role="region"
                      aria-labelledby={buttonId}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.4, ease: softEase }}
                      className="overflow-hidden"
                    >
                      <p className="max-w-xl pb-6 pr-6 text-sm leading-relaxed text-muted-foreground lg:pl-12">
                        {faq.answer}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
