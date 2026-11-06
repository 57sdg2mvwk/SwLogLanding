import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ArrowRight, Check } from 'lucide-react';
import { CutButton } from './CutButton';

export interface ModalState {
  type: 'get-started' | 'demo' | null;
}

export function AuthModals({
  state,
  onClose,
}: {
  state: ModalState;
  onClose: () => void;
}) {
  const [email, setEmail] = useState('');
  const [company, setCompany] = useState('');
  const [operationType, setOperationType] = useState('forwarder');
  const [monthlyShipments, setMonthlyShipments] = useState('51-200');
  const [submitted, setSubmitted] = useState(false);

  const isDemo = state.type === 'demo';
  const isOpen = state.type !== null;

  const inquiryMessage = [
    'Hola, quiero agendar una demo de WiseShips CRM.',
    `Empresa: ${company}`,
    `Correo: ${email}`,
    `Tipo de operación: ${
      operationType === 'forwarder'
        ? 'Forwarder'
        : operationType === 'inspection'
          ? 'Inspección en origen'
          : 'Forwarder e inspección en origen'
    }`,
    `Embarques mensuales: ${monthlyShipments}`,
  ].join('\n');
  const whatsappHref = `https://wa.me/525653848838?text=${encodeURIComponent(inquiryMessage)}`;

  const handleClose = () => {
    setSubmitted(false);
    setEmail('');
    setCompany('');
    setOperationType('forwarder');
    setMonthlyShipments('51-200');
    onClose();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm"
          />

          {/* Modal Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 12 }}
            transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
            className="relative w-full max-w-md overflow-hidden rounded-2xl border border-border bg-background p-6 shadow-2xl shadow-black/20 sm:p-8"
          >
            {/* Close button */}
            <button
              onClick={handleClose}
              className="focus-ring absolute top-5 right-5 flex h-8 w-8 items-center justify-center rounded-md border border-border/70 text-muted-foreground hover:text-foreground transition-colors"
              aria-label="Close dialog"
            >
              <X className="h-4 w-4" />
            </button>

            {/* Header */}
            <div className="flex items-center gap-2.5">
              <span
                className="h-6 w-6 bg-foreground [clip-path:polygon(5px_0,100%_0,100%_calc(100%-5px),calc(100%-5px)_100%,0_100%,0_5px)]"
                aria-hidden="true"
              />
              <span className="text-base font-semibold tracking-tight">WiseShips</span>
            </div>

            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="py-12 text-center"
              >
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-[#2f80ff]/10 text-[#2f80ff] mb-4">
                  <Check className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-semibold tracking-tight">
                  Your demo request is ready
                </h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  Continue in WhatsApp to arrange a time with the WiseShips team.
                </p>
                <a
                  href={whatsappHref}
                  target="_blank"
                  rel="noreferrer"
                  className="focus-ring mt-6 inline-flex min-h-11 items-center justify-center gap-2 bg-foreground px-5 text-sm font-semibold text-background transition-transform hover:-translate-y-0.5"
                  style={{ clipPath: 'polygon(0 0, calc(100% - 12px) 0, 100% 12px, 100% 100%, 0 100%)' }}
                >
                  Continue in WhatsApp
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </a>
              </motion.div>
            ) : (
              <div className="mt-6">
                <h2 className="text-2xl font-serif font-normal tracking-tight">
                  {isDemo
                    ? 'Book a WiseShips CRM demo'
                    : 'Explore WiseShips for your operation'}
                </h2>
                <p className="mt-1.5 text-xs text-muted-foreground">
                  Tell us about your forwarding or inspection workflow. Continue
                  in WhatsApp to schedule a conversation.
                </p>

                <form onSubmit={handleSubmit} className="mt-6 space-y-3.5">
                  <div>
                    <label className="block text-xs font-medium text-foreground mb-1.5">
                      Company Email
                    </label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@company.com"
                      className="focus-ring h-10 w-full rounded-lg border border-border bg-background px-3 text-sm outline-none transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-foreground mb-1.5">
                      Company Name
                    </label>
                    <input
                      type="text"
                      required
                      value={company}
                      onChange={(e) => setCompany(e.target.value)}
                      placeholder="Your company"
                      className="focus-ring h-10 w-full rounded-lg border border-border bg-background px-3 text-sm outline-none transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-foreground mb-1.5">
                      Company Type
                    </label>
                    <select
                      value={operationType}
                      onChange={(e) => setOperationType(e.target.value)}
                      className="focus-ring h-10 w-full rounded-lg border border-border bg-background px-3 text-sm outline-none transition-colors"
                    >
                      <option value="forwarder">Freight forwarder</option>
                      <option value="inspection">Origin inspection company</option>
                      <option value="both">Forwarder &amp; inspection team</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-foreground mb-1.5">
                      Monthly Shipment Volume
                    </label>
                    <select
                      value={monthlyShipments}
                      onChange={(e) => setMonthlyShipments(e.target.value)}
                      className="focus-ring h-10 w-full rounded-lg border border-border bg-background px-3 text-sm outline-none transition-colors"
                    >
                      <option value="1-50">1 – 50 shipments</option>
                      <option value="51-200">51 – 200 shipments</option>
                      <option value="201-500">201 – 500 shipments</option>
                      <option value="500+">500+ shipments</option>
                    </select>
                  </div>

                  <div className="pt-2">
                    <CutButton variant="solid" fullWidth type="submit">
                      Prepare WhatsApp request
                      <ArrowRight className="h-4 w-4" />
                    </CutButton>
                  </div>
                </form>

                <p className="mt-4 text-center text-[11px] text-muted-foreground">
                  No commitment. Arrange a time directly with our team.
                </p>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
