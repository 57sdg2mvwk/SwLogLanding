import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'motion/react';
import {
  ArrowRight,
  ArrowLeft,
  Lock,
  Mail,
  CheckCircle2,
  AlertCircle,
  RefreshCw,
  ChevronRight,
  Eye,
  EyeOff,
  ClipboardCheck,
  Ship,
  Container,
  UsersRound,
  MapPin,
  FileText,
  Clock3,
  Building2,
  Handshake,
  Paperclip,
  MoreHorizontal,
  Check,
  ArrowUpRight,
} from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { CutButton } from './CutButton';
import { CornerPlus, Kicker } from './CornerPlus';
import { RotatingContainer } from './RotatingContainer';

const softEase = [0.22, 1, 0.36, 1] as const;

const cutPathCard: React.CSSProperties = {
  clipPath: 'polygon(0 0, calc(100% - 34px) 0, 100% 34px, 100% 100%, 0 100%)',
};

const cutPathInner: React.CSSProperties = {
  ['--cut' as string]: '14px',
  clipPath:
    'polygon(var(--cut) 0, 100% 0, 100% calc(100% - var(--cut)), calc(100% - var(--cut)) 100%, 0 100%, 0 var(--cut))',
};

function BenefitScene({ index }: { index: number }) {
  const reduceMotion = useReducedMotion();
  const drift = reduceMotion ? undefined : { y: [0, -2, 0] };
  const driftTransition = { duration: 5, repeat: Infinity, ease: 'easeInOut' as const };
  const sceneCard =
    'rounded-md border border-border/80 bg-background/90 shadow-sm';
  const miniLabel =
    'font-mono text-[8px] uppercase tracking-[0.12em] text-muted-foreground';
  return (
    <div
      aria-hidden="true"
      className="relative mt-4 h-[126px] overflow-hidden border-y border-dotted border-border/70 bg-muted/10 sm:h-[138px]"
    >
      {index === 0 && (
        <div className="relative flex h-full items-center justify-center px-3">
          <div className="absolute inset-x-[9%] bottom-[27px] border-t border-dotted border-border/90" />
          <RotatingContainer reduceMotion={reduceMotion} />
          <div className="absolute inset-x-[9%] bottom-[18px] flex items-center justify-between">
            <span className="h-1.5 w-1.5 rounded-full bg-[#2f80ff] ring-4 ring-[#2f80ff]/10" />
            <span className="h-1.5 w-1.5 rounded-full bg-[#2f80ff]/75" />
            <span className="h-1.5 w-1.5 rounded-full bg-muted-foreground/50" />
          </div>
          <div className="absolute inset-x-[7%] bottom-[2px] flex justify-between font-mono text-[7px] uppercase tracking-[0.1em] text-muted-foreground sm:text-[8px]">
            <span>Origin</span>
            <span>In transit</span>
            <span>Delivery</span>
          </div>
        </div>
      )}
      {index === 1 && (
        <div className="relative flex h-full items-center justify-center gap-3 px-3 sm:gap-5">
          <motion.div className={`w-[43%] max-w-[190px] p-2.5 ${sceneCard}`} animate={drift} transition={driftTransition}>
            <div className="flex items-center justify-between">
              <span className={miniLabel}>Inspection request</span>
              <MoreHorizontal className="h-3.5 w-3.5 text-muted-foreground" />
            </div>
            <div className="mt-2 text-[10px] font-semibold">Pre-shipment check</div>
            <div className="mt-1 flex items-center gap-1.5 text-[8px] text-muted-foreground">
              <MapPin className="h-3 w-3 text-[#2f80ff]" /> Ningbo, CN
            </div>
            <div className="mt-2 flex items-center justify-between border-t border-border/70 pt-1.5">
              <span className="text-[8px] text-muted-foreground">Assigned inspector</span>
              <span className="h-5 w-5 rounded-full border border-border bg-muted text-center text-[8px] leading-5">JL</span>
            </div>
          </motion.div>
          <motion.div className={`w-[35%] max-w-[145px] p-2.5 ${sceneCard}`} animate={reduceMotion ? undefined : { y: [0, 2, 0] }} transition={{ ...driftTransition, delay: 0.5 }}>
            <div className="flex items-center gap-1.5 text-[#2f80ff]">
              <FileText className="h-3.5 w-3.5" /><span className={miniLabel}>Field report</span>
            </div>
            <div className="mt-2 h-1 w-4/5 rounded bg-muted-foreground/30" />
            <div className="mt-1.5 h-1 w-full rounded bg-muted-foreground/15" />
            <div className="mt-1 h-1 w-3/4 rounded bg-muted-foreground/15" />
            <div className="mt-2 flex items-center gap-1 border-t border-border/70 pt-1.5 text-[8px] text-muted-foreground">
              <Paperclip className="h-3 w-3" /> 4 evidence files
            </div>
          </motion.div>
          <span className="absolute bottom-2 right-3 flex items-center gap-1 font-mono text-[8px] uppercase tracking-wider text-muted-foreground"><Check className="h-3 w-3 text-[#2f80ff]" />Report linked</span>
        </div>
      )}
      {index === 2 && (
        <div className="relative flex h-full items-center justify-center px-3">
          <div className="absolute left-[13%] top-1/2 h-10 border-l border-dashed border-border" />
          <motion.div className={`relative z-10 w-full max-w-[350px] p-2.5 ${sceneCard}`} animate={drift} transition={driftTransition}>
            <div className="flex items-center justify-between border-b border-border/70 pb-2">
              <span className={miniLabel}>Shipment handoff · WS-2048</span>
              <span className="rounded-sm bg-muted px-1.5 py-0.5 font-mono text-[8px] text-muted-foreground">EXPORT</span>
            </div>
            <div className="grid grid-cols-[1fr_auto_1fr_auto_1fr] items-center gap-2 py-2.5">
              <div><div className="text-[9px] font-medium">Origin team</div><div className="mt-1 text-[8px] text-muted-foreground">Booking confirmed</div></div>
              <ArrowRight className="h-3 w-3 text-[#2f80ff]" />
              <div><div className="text-[9px] font-medium">Operations</div><div className="mt-1 text-[8px] text-muted-foreground">Documents checked</div></div>
              <ArrowRight className="h-3 w-3 text-muted-foreground/60" />
              <div><div className="text-[9px] font-medium">Customer</div><div className="mt-1 text-[8px] text-muted-foreground">Update prepared</div></div>
            </div>
            <div className="flex items-center gap-2 border-t border-border/70 pt-2">
              <FileText className="h-3 w-3 text-[#2f80ff]" /><span className="min-w-0 flex-1 truncate text-[8px] text-muted-foreground">Commercial_invoice_v3.pdf</span><span className="font-mono text-[8px] text-muted-foreground">PDF · 2.4 MB</span>
            </div>
          </motion.div>
        </div>
      )}
      {index === 3 && (
        <div className="relative flex h-full items-center justify-center gap-3 px-3 sm:gap-5">
          <motion.div className={`w-[39%] max-w-[165px] p-2.5 ${sceneCard}`} animate={drift} transition={driftTransition}>
            <div className="flex items-center justify-between"><span className={miniLabel}>Company</span><MoreHorizontal className="h-3.5 w-3.5 text-muted-foreground" /></div>
            <div className="mt-2 flex items-center gap-2">
              <span className="flex h-7 w-7 items-center justify-center border border-border bg-muted text-[#2f80ff]"><Building2 className="h-3.5 w-3.5" /></span>
              <span className="min-w-0 truncate text-[10px] font-semibold">Northstar Imports</span>
            </div>
            <div className="mt-2 border-t border-border/70 pt-1.5 text-[8px] text-muted-foreground">Rotterdam · 3 active shipments</div>
          </motion.div>
          <motion.div className={`w-[39%] max-w-[165px] p-2.5 ${sceneCard}`} animate={reduceMotion ? undefined : { y: [0, 2, 0] }} transition={{ ...driftTransition, delay: 0.5 }}>
            <div className="flex items-center justify-between"><span className={miniLabel}>Opportunity</span><ArrowUpRight className="h-3 w-3 text-[#2f80ff]" /></div>
            <div className="mt-2 flex items-center gap-1.5 text-[10px] font-semibold"><Handshake className="h-3.5 w-3.5 text-[#2f80ff]" />Q3 ocean freight</div>
            <div className="mt-1.5 flex items-center justify-between text-[8px] text-muted-foreground"><span>Proposal sent</span><span className="font-mono">€18.4k</span></div>
            <div className="mt-2 h-1 overflow-hidden rounded-full bg-muted"><div className="h-full w-2/3 bg-[#2f80ff]/70" /></div>
          </motion.div>
          <span className="absolute bottom-2 right-3 flex items-center gap-1 font-mono text-[8px] uppercase tracking-wider text-muted-foreground"><Clock3 className="h-3 w-3 text-[#2f80ff]" />Follow-up · 2 days</span>
        </div>
      )}
    </div>
  );
}

type LoginMethod = 'sso' | 'password' | 'breakglass';

const platformBenefits = [
  {
    eyebrow: '01 / CONTAINER TRACKING',
    title: 'Know where every shipment stands.',
    description:
      'Follow bookings, container references, routes, and milestones from origin to delivery.',
    points: ['Container references', 'Route milestones', 'Shared shipment view'],
    Icon: Container,
  },
  {
    eyebrow: '02 / ORIGIN INSPECTIONS',
    title: 'Keep inspection work connected.',
    description:
      'Coordinate requests and assignments while keeping reports and evidence with the shipment.',
    points: ['Requests & assignments', 'Reports & evidence', 'Shipment context'],
    Icon: ClipboardCheck,
  },
  {
    eyebrow: '03 / FORWARDER OPERATIONS',
    title: 'Make each operational handoff clear.',
    description:
      'Bring shipment details, documents, and customer updates into one forwarder workspace.',
    points: ['Shipment handoffs', 'Documents in context', 'Customer updates'],
    Icon: Ship,
  },
  {
    eyebrow: '04 / CLIENTS & DEALS',
    title: 'Keep commercial follow-up in view.',
    description:
      'Connect client records, opportunities, proposals, and contracts to the work behind each shipment.',
    points: ['Companies & contacts', 'Deals & proposals', 'Contracts & follow-up'],
    Icon: UsersRound,
  },
];

export function LoginPage({ onBackToHome }: { onBackToHome: () => void }) {
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === 'dark';

  const [activeMethod, setActiveMethod] = useState<LoginMethod>('password');
  const [step, setStep] = useState<1 | 2 | 3>(1); // 1 = credentials, 2 = recovery challenge, 3 = ready
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberDevice, setRememberDevice] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [activeBenefitIndex, setActiveBenefitIndex] = useState(0);
  const [benefitDirection, setBenefitDirection] = useState<1 | -1>(1);
  const [benefitInteraction, setBenefitInteraction] = useState(false);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    if (reduceMotion || benefitInteraction) return;
    const timer = window.setTimeout(() => {
      setBenefitDirection(1);
      setActiveBenefitIndex((current) => (current + 1) % platformBenefits.length);
    }, 7200);
    return () => window.clearTimeout(timer);
  }, [activeBenefitIndex, benefitInteraction, reduceMotion]);

  const changeBenefit = (index: number) => {
    setBenefitDirection(index >= activeBenefitIndex ? 1 : -1);
    setActiveBenefitIndex(index);
  };

  const stepBenefit = (direction: 1 | -1) => {
    setBenefitDirection(direction);
    setActiveBenefitIndex(
      (current) =>
        (current + direction + platformBenefits.length) % platformBenefits.length,
    );
  };

  const handleIdentifierSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    if (activeMethod === 'password' && !password) return;
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setStep(activeMethod === 'password' ? 3 : 2);
    }, 600);
  };

  const handleChallengeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setStep(3);
    }, 900);
  };

  return (
    <div className="relative min-h-screen bg-background text-foreground antialiased selection:bg-[#2f80ff]/20 selection:text-foreground">
      {/* Background ambient radial gradients & grid */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 -z-10"
        style={{
          background:
            'radial-gradient(70% 60% at 50% 0%, color-mix(in srgb, var(--foreground) 4%, transparent), transparent 75%)',
        }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 -z-10 opacity-30 dark:opacity-20"
        style={{
          backgroundImage:
            'linear-gradient(to right, var(--border) 1px, transparent 1px), linear-gradient(to bottom, var(--border) 1px, transparent 1px)',
          backgroundSize: '64px 64px',
        }}
      />

      {/* Top Bar Navigation */}
      <header className="border-b border-border/50 bg-background/80 backdrop-blur-md sticky top-0 z-40">
        <div className="mx-auto flex h-16 max-w-[1440px] items-center justify-between px-5 sm:px-8 lg:px-10">
          <div className="flex items-center gap-6">
            <button
              onClick={onBackToHome}
              className="focus-ring group inline-flex items-center gap-2.5 text-left cursor-pointer"
            >
              <span
                className="h-7 w-7 bg-foreground transition-transform duration-300 group-hover:rotate-3 [clip-path:polygon(6px_0,100%_0,100%_calc(100%-6px),calc(100%-6px)_100%,0_100%,0_6px)]"
                aria-hidden="true"
              />
              <span className="text-[17px] font-semibold tracking-tight">WiseShips</span>
            </button>

          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={onBackToHome}
              className="focus-ring inline-flex items-center gap-1.5 text-xs font-medium text-muted-foreground hover:text-foreground transition-colors py-2 px-3 rounded-md hover:bg-muted"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              <span>Back to Overview</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Split Interface */}
      <main className="mx-auto max-w-[1440px] px-5 py-8 sm:px-8 sm:py-12 lg:px-10">
        <div className="grid gap-8 lg:grid-cols-12 lg:gap-10 items-stretch">
          {/* Left Column (7 cols): Forwarder and origin inspection activity */}
          <div className="lg:col-span-7 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-[#2f80ff] animate-pulse" />
                <Kicker>Forwarder CRM · Shipment Operations</Kicker>
              </div>

              <h1 className="mt-3 text-balance font-serif text-3xl font-normal leading-[1.15] tracking-tight sm:text-4xl lg:text-[2.75rem]">
                Your shipments and inspections,{' '}
                <span className="font-sans font-semibold tracking-tight">
                  in sync
                </span>{' '}
              </h1>

              <p className="mt-4 max-w-xl text-sm leading-relaxed text-muted-foreground sm:text-base">
                Track containers, coordinate origin inspections, and keep
                customers, deals, contracts, and documents connected in one workspace.
              </p>

              {/* Core logistics workflows */}
              <div className="mt-8 grid grid-cols-2 sm:grid-cols-3 gap-3">
                <div className="p-3.5 rounded-lg border border-border/70 bg-muted/20">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] text-muted-foreground">Container Tracking</span>
                    <Ship className="h-3.5 w-3.5 text-[#2f80ff]" />
                  </div>
                  <div className="mt-1.5 text-sm font-semibold tracking-tight">
                    Milestones in view
                  </div>
                  <p className="mt-0.5 text-[10px] text-muted-foreground">
                    References and routes together
                  </p>
                </div>

                <div className="p-3.5 rounded-lg border border-border/70 bg-muted/20">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] text-muted-foreground">Origin Inspections</span>
                    <ClipboardCheck className="h-3.5 w-3.5 text-[#2f80ff]" />
                  </div>
                  <div className="mt-1.5 text-sm font-semibold tracking-tight">
                    Managed at origin
                  </div>
                  <p className="mt-0.5 text-[10px] text-muted-foreground">
                    Reports and evidence organized
                  </p>
                </div>

                <div className="p-3.5 rounded-lg border border-border/70 bg-muted/20 col-span-2 sm:col-span-1">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] text-muted-foreground">Clients &amp; Deals</span>
                    <UsersRound className="h-3.5 w-3.5 text-[#2f80ff]" />
                  </div>
                  <div className="mt-1.5 text-sm font-semibold tracking-tight">
                    Commercial follow-up
                  </div>
                  <p className="mt-0.5 text-[10px] text-muted-foreground">
                    Deals and contracts connected
                  </p>
                </div>
              </div>

              {/* Public platform benefits carousel */}
              <section
                aria-label="WiseShips platform benefits"
                className="mt-6 overflow-hidden rounded-xl border border-border/70 bg-background shadow-lg"
                onMouseEnter={() => setBenefitInteraction(true)}
                onMouseLeave={() => setBenefitInteraction(false)}
                onFocusCapture={() => setBenefitInteraction(true)}
                onBlurCapture={(event) => {
                  if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
                    setBenefitInteraction(false);
                  }
                }}
              >
                <div className="flex items-center justify-between border-b border-border/60 bg-muted/30 px-4 py-2.5">
                  <div className="flex items-center gap-2">
                    <Container className="h-3.5 w-3.5 text-[#2f80ff]" aria-hidden="true" />
                    <span className="text-xs font-semibold tracking-tight">
                      Platform benefits
                    </span>
                  </div>
                  <span className="font-mono text-[9px] uppercase tracking-wider text-muted-foreground">
                    {String(activeBenefitIndex + 1).padStart(2, '0')} /{' '}
                    {String(platformBenefits.length).padStart(2, '0')}
                  </span>
                </div>

                <div className="min-h-[330px] px-4 py-5 sm:min-h-[305px] sm:px-5">
                  <AnimatePresence mode="wait" initial={false}>
                    {platformBenefits.map((benefit, index) => {
                      if (index !== activeBenefitIndex) return null;
                      const Icon = benefit.Icon;
                      return (
                        <motion.div
                          key={benefit.eyebrow}
                          initial={reduceMotion ? { opacity: 1 } : { opacity: 0, x: benefitDirection * 18 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={reduceMotion ? { opacity: 1 } : { opacity: 0, x: benefitDirection * -18 }}
                          transition={reduceMotion ? { duration: 0 } : { duration: 0.24, ease: softEase }}
                          aria-live="polite"
                          aria-atomic="true"
                        >
                          <div className="flex items-start gap-3">
                            <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-md border border-border bg-muted/20 text-[#2f80ff]">
                              <Icon className="h-4 w-4" strokeWidth={1.6} aria-hidden="true" />
                            </span>
                            <div className="min-w-0">
                              <p className="font-mono text-[9px] uppercase tracking-[0.12em] text-muted-foreground">
                                {benefit.eyebrow}
                              </p>
                              <h2 className="mt-1 text-sm font-semibold tracking-tight">
                                {benefit.title}
                              </h2>
                              <p className="mt-1 max-w-xl text-[11px] leading-relaxed text-muted-foreground">
                                {benefit.description}
                              </p>
                            </div>
                          </div>
                          <BenefitScene index={index} />
                          <ul className="mt-3 grid gap-x-3 sm:grid-cols-3">
                            {benefit.points.map((point) => (
                              <li
                                key={point}
                                className="flex items-center gap-2 border-t border-dotted border-border/70 py-2 text-[10px] text-muted-foreground"
                              >
                                <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-[#2f80ff]" aria-hidden="true" />
                                <span>{point}</span>
                              </li>
                            ))}
                          </ul>
                        </motion.div>
                      );
                    })}
                  </AnimatePresence>
                </div>

                <div className="flex items-center justify-between border-t border-border/60 bg-muted/20 px-4 py-2.5">
                  <div
                    role="group"
                    aria-label="Select a platform benefit"
                    className="flex items-center gap-1.5"
                  >
                    {platformBenefits.map((benefit, index) => (
                      <button
                        key={benefit.eyebrow}
                        type="button"
                        aria-label={`Show benefit ${index + 1} of ${platformBenefits.length}`}
                        aria-pressed={activeBenefitIndex === index}
                        onClick={() => changeBenefit(index)}
                        className={`focus-ring h-1.5 rounded-full transition-all ${
                          activeBenefitIndex === index
                            ? 'w-5 bg-[#2f80ff]'
                            : 'w-1.5 bg-muted-foreground/30 hover:bg-muted-foreground/60'
                        }`}
                      />
                    ))}
                  </div>
                  <div className="flex items-center gap-1">
                    <button
                      type="button"
                      aria-label="Previous platform benefit"
                      onClick={() => stepBenefit(-1)}
                      className="focus-ring flex h-7 w-7 items-center justify-center rounded-md border border-border/70 text-muted-foreground transition-colors hover:text-foreground"
                    >
                      <ArrowLeft className="h-3.5 w-3.5" aria-hidden="true" />
                    </button>
                    <button
                      type="button"
                      aria-label="Next platform benefit"
                      onClick={() => stepBenefit(1)}
                      className="focus-ring flex h-7 w-7 items-center justify-center rounded-md border border-border/70 text-muted-foreground transition-colors hover:text-foreground"
                    >
                      <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                    </button>
                  </div>
                </div>
              </section>
            </div>

            {/* Core workflow areas */}
            <div className="mt-8 pt-6 border-t border-dotted border-border flex flex-wrap items-center justify-between gap-4 text-xs text-muted-foreground">
              <div className="flex items-center gap-4">
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="h-3.5 w-3.5 text-[#2f80ff]" />
                  Container Tracking
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="h-3.5 w-3.5 text-[#2f80ff]" />
                  Origin Inspections
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="h-3.5 w-3.5 text-[#2f80ff]" />
                  Clients &amp; Deals
                </span>
              </div>
              <span className="text-[11px]">Built for forwarder operations</span>
            </div>
          </div>

          {/* Right Column (5 cols): The Dedicated Sliding Form Panel */}
          <div className="lg:col-span-5">
            <div className="bg-border p-px" style={cutPathCard}>
              <div
                className="relative flex h-full flex-col justify-between bg-background p-6 sm:p-8"
                style={cutPathCard}
              >
                <CornerPlus className="left-0 top-0 -translate-x-1/2 -translate-y-1/2" />
                <CornerPlus className="right-0 top-0 translate-x-1/2 -translate-y-1/2" />

                <div>
                  {/* Slide Menu Tabs for Auth Methods */}
                  <div className="relative mb-6">
                    <div className="flex items-center justify-between border-b border-border/70 pb-3">
                      <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                        Workspace Sign-In
                      </span>
                      <span className="text-[10px] font-mono text-[#2f80ff]">
                        {step === 3
                          ? 'Workspace ready'
                          : activeMethod === 'password'
                            ? 'Direct sign-in'
                            : `Step ${step} of 2`}
                      </span>
                    </div>

                    <div className="mt-3 grid grid-cols-3 gap-1 rounded-lg border border-border bg-muted p-1">
                      {[
                        { id: 'sso', label: 'Company SSO', disabled: true },
                        { id: 'password', label: 'Password', disabled: false },
                        { id: 'breakglass', label: 'Recovery', disabled: true },
                      ].map((tab) => {
                        const isActive = activeMethod === tab.id;
                        const isDisabled = tab.disabled;
                        return (
                          <button
                            key={tab.id}
                            type="button"
                            disabled={isDisabled}
                            title={isDisabled ? `${tab.label} is coming soon` : undefined}
                            aria-label={isDisabled ? `${tab.label} coming soon` : tab.label}
                            onClick={() => {
                              if (isDisabled) return;
                              setActiveMethod(tab.id as LoginMethod);
                              setStep(1);
                            }}
                            className={`focus-ring relative flex min-h-9 flex-col items-center justify-center rounded-[5px] px-1 py-1 text-center text-xs font-medium leading-tight transition-colors ${
                              isDisabled ? 'cursor-not-allowed opacity-45' : ''
                            }`}
                          >
                            {isActive && (
                              <motion.span
                                layoutId="login-method-pill"
                                className="absolute inset-0 rounded-[5px] bg-background shadow-sm"
                                transition={{
                                  type: 'spring',
                                  stiffness: 420,
                                  damping: 34,
                                }}
                              />
                            )}
                            <span
                              className={`relative z-10 ${
                                isActive
                                  ? 'font-semibold text-foreground'
                                  : 'text-muted-foreground hover:text-foreground'
                              }`}
                            >
                              {isDisabled ? (
                                <span className="inline-flex items-center gap-1">
                                  <Lock className="h-3 w-3" aria-hidden="true" />
                                  {tab.label}
                                </span>
                              ) : (
                                tab.label
                              )}
                              {isDisabled && (
                                <span className="mt-0.5 block text-[8px] uppercase tracking-wider">
                                  Coming soon
                                </span>
                              )}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Form Container with Slide Animations */}
                  <AnimatePresence mode="wait">
                    {/* State 3: Success Authenticated */}
                    {step === 3 && (
                      <motion.div
                        key="step-3"
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -16 }}
                        transition={{ duration: 0.35, ease: softEase }}
                        className="py-8 text-center"
                      >
                        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#2f80ff]/10 text-[#2f80ff] mb-4">
                          <CheckCircle2 className="h-7 w-7" />
                        </div>
                        <h2 className="text-xl font-semibold tracking-tight">
                          WiseShips Workspace Ready
                        </h2>
                        <p className="mt-2 text-xs text-muted-foreground leading-relaxed max-w-xs mx-auto">
                          Your team workspace is ready for shipment updates, origin
                          inspection reports, and customer records.
                        </p>

                        <div className="mt-6 p-3 rounded-lg border border-border/70 bg-muted/20 font-mono text-[11px] text-left">
                          <div className="flex justify-between py-1 border-b border-border/40">
                            <span className="text-muted-foreground">Identity:</span>
                            <span className="text-foreground">{email}</span>
                          </div>
                          <div className="flex justify-between py-1 border-b border-border/40">
                            <span className="text-muted-foreground">Workspace:</span>
                            <span className="text-[#2f80ff]">Forwarder Operations</span>
                          </div>
                          <div className="flex justify-between py-1">
                            <span className="text-muted-foreground">Access:</span>
                            <span className="text-emerald-500">Team access ready</span>
                          </div>
                        </div>

                        <div className="mt-6 flex justify-center">
                          <CutButton
                            variant="solid"
                            fullWidth
                            onClick={onBackToHome}
                          >
                            Open WiseShips Workspace
                            <ArrowRight className="h-4 w-4" />
                          </CutButton>
                        </div>
                      </motion.div>
                    )}

                    {/* State 2: Account recovery */}
                    {step === 2 && (
                      <motion.div
                        key="step-2"
                        initial={{ opacity: 0, x: 24 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -24 }}
                        transition={{ duration: 0.35, ease: softEase }}
                      >
                        <div className="flex items-center gap-2 mb-4">
                          <button
                            type="button"
                            onClick={() => setStep(1)}
                            className="text-xs text-muted-foreground hover:text-foreground flex items-center gap-1 focus-ring rounded"
                          >
                            <ArrowLeft className="h-3 w-3" />
                            Change company email
                          </button>
                        </div>

                        {activeMethod === 'breakglass' && (
                          <form onSubmit={handleChallengeSubmit} className="space-y-4">
                            <div>
                              <h2 className="text-lg font-semibold tracking-tight">
                                Account Recovery
                              </h2>
                              <p className="mt-1 text-xs text-muted-foreground">
                                Enter the recovery code provided by your WiseShips
                                workspace administrator.
                              </p>
                            </div>

                            <div>
                              <textarea
                                rows={3}
                                required
                                placeholder="Enter your recovery code"
                                className="focus-ring w-full rounded-lg border border-border bg-background p-3 text-xs font-mono outline-none"
                              />
                            </div>

                            <div className="p-2.5 rounded border border-amber-500/30 bg-amber-500/10 text-[11px] text-amber-500 flex items-start gap-2">
                              <AlertCircle className="h-4 w-4 shrink-0 mt-0.5" />
                              <span>
                                Recovery access is recorded for your workspace
                                administrator.
                              </span>
                            </div>

                            <CutButton variant="solid" fullWidth type="submit">
                              {isLoading ? (
                                <RefreshCw className="h-4 w-4 animate-spin" />
                              ) : (
                                <>
                                  Continue with Recovery Code
                                  <ArrowRight className="h-4 w-4" />
                                </>
                              )}
                            </CutButton>
                          </form>
                        )}
                      </motion.div>
                    )}

                    {/* State 1: Primary Identifier Input */}
                    {step === 1 && (
                      <motion.div
                        key="step-1"
                        initial={{ opacity: 0, x: -24 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 24 }}
                        transition={{ duration: 0.35, ease: softEase }}
                      >
                        <form onSubmit={handleIdentifierSubmit} className="space-y-4">
                          <div>
                            <h2 className="text-xl font-serif font-normal tracking-tight">
                              Sign In to WiseShips CRM
                            </h2>
                            <p className="mt-1 text-xs text-muted-foreground">
                              Use your company email to access shipments, inspections,
                              documents, and customer records.
                            </p>
                          </div>

                          {/* Company Email Field */}
                          <div>
                            <label className="block text-xs font-medium text-foreground mb-1.5">
                              Company Email
                            </label>
                            <div className="relative">
                              <input
                                type="email"
                                autoComplete="email"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="you@your-forwarding-company.com"
                                className="focus-ring h-10 w-full rounded-lg border border-border bg-background pl-9 pr-3 text-sm outline-none transition-colors"
                              />
                              <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground pointer-events-none" />
                            </div>
                          </div>

                          {/* Password Field (Only for password method) */}
                          {activeMethod === 'password' && (
                            <div>
                              <div className="flex items-center justify-between mb-1.5">
                                <label className="text-xs font-medium text-foreground">
                                  Password
                                </label>
                              </div>
                              <div className="relative">
                                <input
                                  type={showPassword ? 'text' : 'password'}
                                  autoComplete="current-password"
                                  required
                                  value={password}
                                  onChange={(e) => setPassword(e.target.value)}
                                  placeholder="••••••••••••"
                                  className="focus-ring h-10 w-full rounded-lg border border-border bg-background pl-9 pr-9 text-sm outline-none transition-colors"
                                />
                                <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground pointer-events-none" />
                                <button
                                  type="button"
                                  onClick={() => setShowPassword((prev) => !prev)}
                                  className="absolute right-3 top-3 text-muted-foreground hover:text-foreground"
                                >
                                  {showPassword ? (
                                    <EyeOff className="h-4 w-4" />
                                  ) : (
                                    <Eye className="h-4 w-4" />
                                  )}
                                </button>
                              </div>
                            </div>
                          )}

                          {/* Remember Device Checkbox */}
                          <div className="flex items-center gap-2 pt-1">
                            <input
                              type="checkbox"
                              id="remember-device"
                              checked={rememberDevice}
                              onChange={(e) => setRememberDevice(e.target.checked)}
                              className="h-4 w-4 rounded border-border accent-[#2f80ff] cursor-pointer"
                            />
                            <label
                              htmlFor="remember-device"
                              className="text-xs text-muted-foreground cursor-pointer select-none"
                            >
                              Remember this device for 30 days
                            </label>
                          </div>

                          {/* Submit CutButton */}
                          <div className="pt-2">
                            <CutButton variant="solid" fullWidth type="submit">
                              {isLoading ? (
                                <RefreshCw className="h-4 w-4 animate-spin" />
                              ) : (
                                <>
                                  {activeMethod === 'sso'
                                    ? 'Company SSO coming soon'
                                    : activeMethod === 'breakglass'
                                    ? 'Use Recovery Code'
                                    : 'Sign in'}
                                  <ArrowRight className="h-4 w-4" />
                                </>
                              )}
                            </CutButton>
                          </div>
                        </form>

                        {/* Compact logistics capability cards */}
                        <div className="mt-6 pt-5 border-t border-border/70">
                          <div className="mb-3">
                            <h3 className="text-xs font-semibold tracking-tight">
                              Forwarder operations
                            </h3>
                            <p className="mt-0.5 text-[10px] text-muted-foreground">
                              From origin to customer
                            </p>
                          </div>
                          <div className="grid grid-cols-3 gap-2">
                            {[
                              {
                                title: 'Shipments',
                                detail: 'Milestones & tracking',
                                Icon: Ship,
                              },
                              {
                                title: 'Inspections',
                                detail: 'Reports & evidence',
                                Icon: ClipboardCheck,
                              },
                              {
                                title: 'Clients & deals',
                                detail: 'Contacts and follow-up',
                                Icon: UsersRound,
                              },
                            ].map(({ title, detail, Icon }, index) => (
                              <motion.div
                                key={title}
                                initial={{ opacity: 0, y: 8 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{
                                  duration: 0.3,
                                  delay: 0.06 * index,
                                  ease: softEase,
                                }}
                                whileHover={{
                                  y: -2,
                                  transition: { duration: 0.16 },
                                }}
                                className="min-w-0 rounded-lg border border-border bg-muted/20 p-2.5 transition-colors hover:bg-muted/35"
                              >
                                <span className="mb-2 flex h-7 w-7 items-center justify-center rounded-md border border-border bg-background text-[#2f80ff]">
                                  <Icon className="h-3.5 w-3.5" aria-hidden="true" />
                                </span>
                                <p className="truncate text-[10px] font-semibold tracking-tight text-foreground">
                                  {title}
                                </p>
                                <p className="mt-0.5 text-[9px] leading-snug text-muted-foreground">
                                  {detail}
                                </p>
                              </motion.div>
                            ))}
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Footer workspace note */}
                <div className="mt-8 pt-4 border-t border-dotted border-border/60 text-center">
                  <span className="text-[11px] text-muted-foreground">
                    Sign in to your WiseShips operations workspace
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
