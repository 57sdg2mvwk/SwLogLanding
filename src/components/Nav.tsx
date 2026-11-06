import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  ChevronDown,
  PackageCheck,
  ClipboardCheck,
  UsersRound,
  FileText,
  BookOpen,
  Calculator,
  Boxes,
  Menu as MenuIcon,
  X as CloseIcon,
} from 'lucide-react';
import { CutButton } from './CutButton';

interface PlatformItem {
  title: string;
  desc: string;
  href: string;
  icon: React.ComponentType<{ className?: string; strokeWidth?: number }>;
  featureTitle: string;
  featureDesc: string;
}

const platformItems: PlatformItem[] = [
  {
    title: 'Shipment tracking',
    desc: 'Containers, routes & milestones',
    href: '/platform#shipment-tracking',
    icon: PackageCheck,
    featureTitle: 'One view for every shipment',
    featureDesc:
      'Keep container references, routes, milestone dates, and documents connected.',
  },
  {
    title: 'Origin inspections',
    desc: 'Assignments, reports & evidence',
    href: '/platform#origin-inspections',
    icon: ClipboardCheck,
    featureTitle: 'Keep inspection handoffs together',
    featureDesc:
      'Organize inspection requests, reports, evidence, and shipment updates in context.',
  },
  {
    title: 'Clients & deals',
    desc: 'Contacts, opportunities & follow-up',
    href: '/platform#clients-deals',
    icon: UsersRound,
    featureTitle: 'Connect conversations to operations',
    featureDesc:
      'Keep client records, deals, proposals, contracts, and next steps visible.',
  },
  {
    title: 'Documents',
    desc: 'Contracts & shipment files',
    href: '/platform#documents',
    icon: FileText,
    featureTitle: 'Keep paperwork with the work',
    featureDesc:
      'Find commercial and inspection documents alongside the shipments they support.',
  },
];

const toolsItems: PlatformItem[] = [
  {
    title: 'Diccionario de flete',
    desc: 'Marítimo, aéreo, terrestre, aduanas e Incoterms',
    href: '/tools/glossary',
    icon: BookOpen,
    featureTitle: 'El diccionario del transitario',
    featureDesc:
      'Encuentra definiciones claras de los términos que aparecen en las operaciones de flete.',
  },
  {
    title: 'Calculadora de carga',
    desc: 'CBM y peso facturable',
    href: '/tools/cbm-calculator',
    icon: Calculator,
    featureTitle: 'Calcula volumen y peso facturable',
    featureDesc:
      'Compara peso bruto y volumétrico con dimensiones y un factor editable por transportista.',
  },
  {
    title: 'Planificador de carga 3D',
    desc: 'Distribución y capacidad de contenedor',
    href: '/tools/container-load-planner',
    icon: Boxes,
    featureTitle: 'Visualiza la carga antes de embarcar',
    featureDesc:
      'Distribuye bultos y revisa ocupación, peso y colocación en un plan 3D interactivo.',
  },
];

const navLinks = [
  { href: '/solutions', label: 'Solutions' },
  { href: '/teams', label: 'Teams' },
  { href: '/developers', label: 'Developers' },
  { href: '/contact', label: 'Contact' },
];

export function Nav({
  currentPath = '/',
  onOpenSignIn,
  onOpenGetStarted,
}: {
  currentPath?: string;
  onOpenSignIn?: () => void;
  onOpenGetStarted?: () => void;
}) {
  const [scrolled, setScrolled] = useState(false);
  const [platformOpen, setPlatformOpen] = useState(false);
  const [activeFeatureIdx, setActiveFeatureIdx] = useState(0);
  const [toolsOpen, setToolsOpen] = useState(false);
  const [activeToolIdx, setActiveToolIdx] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobilePlatformOpen, setMobilePlatformOpen] = useState(false);
  const [mobileToolsOpen, setMobileToolsOpen] = useState(false);
  const hoverTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 8);
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setPlatformOpen(false);
        setToolsOpen(false);
        setMobileMenuOpen(false);
        setMobileToolsOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  useEffect(() => {
    setPlatformOpen(false);
    setToolsOpen(false);
    setMobileMenuOpen(false);
    setMobilePlatformOpen(false);
    setMobileToolsOpen(false);
  }, [currentPath]);

  const activeFeature = platformItems[activeFeatureIdx] ?? platformItems[0];
  const activeTool = toolsItems[activeToolIdx] ?? toolsItems[0];

  return (
    <motion.header
      initial={{ opacity: 0, y: -16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        scrolled || mobileMenuOpen
          ? 'border-border/50 bg-background/95 backdrop-blur-md border-b'
          : 'border-b border-transparent bg-transparent'
      }`}
    >
      <div className="mx-auto flex h-16 max-w-[1440px] items-center justify-between px-5 sm:px-8 lg:px-10">
        <div className="flex items-center gap-8">
          <a
            href="/"
            className="focus-ring group inline-flex items-center gap-2.5"
            aria-label="WiseShips home"
          >
            <span
              className="h-7 w-7 bg-foreground transition-transform duration-300 group-hover:rotate-3 [clip-path:polygon(6px_0,100%_0,100%_calc(100%-6px),calc(100%-6px)_100%,0_100%,0_6px)]"
              aria-hidden="true"
            />
            <span className="text-[17px] font-semibold tracking-tight">WiseShips</span>
          </a>

          <nav className="hidden items-center gap-1 lg:flex">
            <div
              className="relative"
              onMouseEnter={() => {
                if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);
                setPlatformOpen(true);
                setToolsOpen(false);
              }}
              onMouseLeave={() => {
                if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);
                hoverTimeoutRef.current = setTimeout(() => setPlatformOpen(false), 120);
              }}
            >
              <button
                type="button"
                onClick={() => {
                  setPlatformOpen((prev) => !prev);
                  setToolsOpen(false);
                }}
                aria-expanded={platformOpen}
                className={`focus-ring inline-flex items-center gap-1 rounded-md px-3 py-2 text-[13px] font-medium transition-colors ${
                  platformOpen || currentPath === '/platform'
                    ? 'text-accent'
                    : 'text-foreground/80 hover:text-foreground'
                }`}
              >
                Platform
                <ChevronDown
                  className={`h-4 w-4 transition-transform duration-300 ${
                    platformOpen ? 'rotate-180' : ''
                  }`}
                  aria-hidden="true"
                />
              </button>

              <AnimatePresence>
                {platformOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 8 }}
                    transition={{ duration: 0.22, ease: [0.4, 0, 0.2, 1] }}
                    className="absolute top-full left-3 pt-3"
                  >
                    <div className="border-border bg-background flex w-[600px] overflow-hidden rounded-md border shadow-2xl shadow-black/10">
                      <div className="flex w-[268px] flex-col gap-0.5 p-2">
                        {platformItems.map((item, idx) => {
                          const IconComp = item.icon;
                          return (
                            <a
                              key={item.href}
                              href={item.href}
                              onClick={() => setPlatformOpen(false)}
                              onMouseEnter={() => setActiveFeatureIdx(idx)}
                              onFocus={() => setActiveFeatureIdx(idx)}
                              className="focus-ring group hover:bg-muted flex items-center gap-2.5 rounded p-2 transition-colors"
                            >
                              <span className="border-border bg-background text-muted-foreground group-hover:text-foreground flex h-7 w-7 shrink-0 items-center justify-center rounded-sm border transition-colors">
                                <IconComp className="h-4 w-4" strokeWidth={1.5} />
                              </span>
                              <span className="flex flex-col">
                                <span className="text-[13px] font-medium tracking-tight">
                                  {item.title}
                                </span>
                                <span className="text-muted-foreground text-xs">
                                  {item.desc}
                                </span>
                              </span>
                            </a>
                          );
                        })}
                      </div>

                      <div className="bg-border w-px self-stretch" />

                      <div className="flex flex-1 flex-col p-3">
                        <div className="relative min-h-0 w-full flex-1 overflow-hidden rounded bg-muted/40 p-4 border border-border/40">
                          <div className="flex items-center gap-2 mb-2">
                            <span className="h-2 w-2 rounded-full bg-[#2f80ff] animate-pulse" />
                            <span className="text-[11px] font-mono text-muted-foreground uppercase">
                              Workflow Preview
                            </span>
                          </div>
                          <div className="h-16 w-full rounded bg-foreground/5 flex items-center justify-center border border-border/50">
                            <span className="font-mono text-xs text-muted-foreground">
                              {activeFeature.title}
                            </span>
                          </div>
                        </div>

                        <div className="mt-3 h-16">
                          <AnimatePresence mode="wait">
                            <motion.div
                              key={activeFeature.title}
                              initial={{ opacity: 0, y: 6 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: -6 }}
                              transition={{ duration: 0.2 }}
                            >
                              <p className="text-[13px] font-semibold tracking-tight">
                                {activeFeature.featureTitle}
                              </p>
                              <p className="text-muted-foreground mt-1 text-xs leading-relaxed">
                                {activeFeature.featureDesc}
                              </p>
                            </motion.div>
                          </AnimatePresence>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <div
              className="relative"
              onMouseEnter={() => {
                if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);
                setToolsOpen(true);
                setPlatformOpen(false);
              }}
              onMouseLeave={() => {
                if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);
                hoverTimeoutRef.current = setTimeout(() => setToolsOpen(false), 120);
              }}
            >
              <button
                type="button"
                onClick={() => {
                  setToolsOpen((prev) => !prev);
                  setPlatformOpen(false);
                }}
                aria-expanded={toolsOpen}
                aria-haspopup="true"
                className={`focus-ring inline-flex items-center gap-1 rounded-md px-3 py-2 text-[13px] font-medium transition-colors ${
                  toolsOpen || currentPath.startsWith('/tools')
                    ? 'text-accent'
                    : 'text-foreground/80 hover:text-foreground'
                }`}
              >
                Tools
                <ChevronDown
                  className={`h-4 w-4 transition-transform duration-300 ${
                    toolsOpen ? 'rotate-180' : ''
                  }`}
                  aria-hidden="true"
                />
              </button>

              <AnimatePresence>
                {toolsOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 8 }}
                    transition={{ duration: 0.22, ease: [0.4, 0, 0.2, 1] }}
                    className="absolute top-full left-3 pt-3"
                  >
                    <div className="border-border bg-background flex w-[600px] overflow-hidden rounded-md border shadow-2xl shadow-black/10">
                      <div className="flex w-[268px] flex-col gap-0.5 p-2">
                        {toolsItems.map((item, idx) => {
                          const IconComp = item.icon;
                          return (
                            <a
                              key={item.href}
                              href={item.href}
                              onClick={() => setToolsOpen(false)}
                              onMouseEnter={() => setActiveToolIdx(idx)}
                              onFocus={() => setActiveToolIdx(idx)}
                              className="focus-ring group hover:bg-muted flex items-center gap-2.5 rounded p-2 transition-colors"
                            >
                              <span className="border-border bg-background text-muted-foreground group-hover:text-foreground flex h-7 w-7 shrink-0 items-center justify-center rounded-sm border transition-colors">
                                <IconComp className="h-4 w-4" strokeWidth={1.5} />
                              </span>
                              <span className="flex flex-col">
                                <span className="text-[13px] font-medium tracking-tight">
                                  {item.title}
                                </span>
                                <span className="text-muted-foreground text-xs">{item.desc}</span>
                              </span>
                            </a>
                          );
                        })}
                      </div>

                      <div className="bg-border w-px self-stretch" />

                      <div className="flex flex-1 flex-col p-3">
                        <div className="relative min-h-0 w-full flex-1 overflow-hidden rounded border border-border/40 bg-muted/40 p-4">
                          <div className="mb-2 flex items-center gap-2">
                            <span className="h-2 w-2 animate-pulse rounded-full bg-[#2f80ff]" />
                            <span className="font-mono text-[11px] uppercase text-muted-foreground">
                              Tool Preview
                            </span>
                          </div>
                          <div className="flex h-16 w-full items-center justify-center rounded border border-border/50 bg-foreground/5">
                            <span className="font-mono text-xs text-muted-foreground">
                              {activeToolIdx === 0
                                ? 'FCL · CBM · B/L · Incoterms'
                                : activeToolIdx === 1
                                  ? 'CBM · m³ · kg · cm³/kg'
                                  : '3D · m³ · kg · pallets'}
                            </span>
                          </div>
                        </div>

                        <div className="mt-3 h-16">
                          <p className="text-[13px] font-semibold tracking-tight">
                            {activeTool.featureTitle}
                          </p>
                          <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                            {activeTool.featureDesc}
                          </p>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {navLinks.map((link) => {
              const active = currentPath === link.href;
              return (
              <a
                key={link.href}
                href={link.href}
                aria-current={active ? 'page' : undefined}
                className={`focus-ring rounded-md px-3 py-2 text-[13px] font-medium transition-colors ${
                  active ? 'text-foreground' : 'text-foreground/80 hover:text-foreground'
                }`}
              >
                {link.label}
              </a>
              );
            })}
          </nav>
        </div>

        <div className="hidden items-center gap-3 lg:flex">
          <CutButton
            variant="outline"
            href="/sign-in"
            onClick={(e) => {
              if (onOpenSignIn) {
                e.preventDefault();
                onOpenSignIn();
              }
            }}
          >
            Sign in
          </CutButton>
          <CutButton
            variant="solid"
            href="/contact"
            onClick={(e) => {
              if (onOpenGetStarted) {
                e.preventDefault();
                onOpenGetStarted();
              }
            }}
          >
            Book a demo
          </CutButton>
        </div>

        <div className="flex items-center gap-2.5 lg:hidden">
          <CutButton
            variant="solid"
            href="/contact"
            onClick={(e) => {
              if (onOpenGetStarted) {
                e.preventDefault();
                onOpenGetStarted();
              }
            }}
          >
            Book a demo
          </CutButton>
          <CutButton
            variant="outline"
            iconOnly
            aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
            onClick={() => setMobileMenuOpen((prev) => !prev)}
          >
            {mobileMenuOpen ? (
              <CloseIcon className="h-5 w-5" aria-hidden="true" />
            ) : (
              <MenuIcon className="h-5 w-5" aria-hidden="true" />
            )}
          </CutButton>
        </div>
      </div>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.28, ease: [0.4, 0, 0.2, 1] }}
            className="border-border/50 overflow-hidden border-t lg:hidden bg-background"
          >
            <div className="mx-auto max-w-[1440px] px-5 py-4 sm:px-8">
              <button
                type="button"
                onClick={() => setMobilePlatformOpen((prev) => !prev)}
                aria-expanded={mobilePlatformOpen}
                className="focus-ring flex w-full items-center justify-between rounded-md px-2 py-3 text-sm font-medium"
              >
                Platform
                <ChevronDown
                  className={`h-4 w-4 transition-transform duration-300 ${
                    mobilePlatformOpen ? 'rotate-180' : ''
                  }`}
                  aria-hidden="true"
                />
              </button>

              <AnimatePresence>
                {mobilePlatformOpen && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.22 }}
                    className="overflow-hidden"
                  >
                    <div className="flex flex-col gap-1 pb-2 pl-2">
                      {platformItems.map((item) => {
                        const IconComp = item.icon;
                        return (
                          <a
                            key={item.href}
                            href={item.href}
                            onClick={() => {
                              setMobileMenuOpen(false);
                              setMobilePlatformOpen(false);
                            }}
                            className="focus-ring hover:bg-muted flex items-center gap-3 rounded-md p-2.5"
                          >
                            <span className="border-border text-foreground flex h-8 w-8 shrink-0 items-center justify-center rounded-md border">
                              <IconComp className="h-4 w-4" />
                            </span>
                            <span className="flex flex-col">
                              <span className="text-sm font-medium">{item.title}</span>
                              <span className="text-muted-foreground text-xs">
                                {item.desc}
                              </span>
                            </span>
                          </a>
                        );
                      })}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <button
                type="button"
                onClick={() => setMobileToolsOpen((prev) => !prev)}
                aria-expanded={mobileToolsOpen}
                className={`focus-ring flex w-full items-center justify-between rounded-md px-2 py-3 text-sm font-medium ${
                  currentPath.startsWith('/tools') ? 'text-foreground' : ''
                }`}
              >
                Tools
                <ChevronDown
                  className={`h-4 w-4 transition-transform duration-300 ${
                    mobileToolsOpen ? 'rotate-180' : ''
                  }`}
                  aria-hidden="true"
                />
              </button>

              <AnimatePresence>
                {mobileToolsOpen && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.22 }}
                    className="overflow-hidden"
                  >
                    <div className="flex flex-col gap-1 pb-2 pl-2">
                      {toolsItems.map((item) => {
                        const IconComp = item.icon;
                        return (
                          <a
                            key={item.href}
                            href={item.href}
                            onClick={() => {
                              setMobileMenuOpen(false);
                              setMobileToolsOpen(false);
                            }}
                            className="focus-ring hover:bg-muted flex items-center gap-3 rounded-md p-2.5"
                          >
                            <span className="border-border text-foreground flex h-8 w-8 shrink-0 items-center justify-center rounded-md border">
                              <IconComp className="h-4 w-4" />
                            </span>
                            <span className="flex flex-col">
                              <span className="text-sm font-medium">{item.title}</span>
                              <span className="text-muted-foreground text-xs">{item.desc}</span>
                            </span>
                          </a>
                        );
                      })}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {navLinks.map((link) => {
                const active = currentPath === link.href;
                return (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  aria-current={active ? 'page' : undefined}
                  className={`focus-ring block rounded-md px-2 py-3 text-sm font-medium ${
                    active ? 'text-foreground' : 'text-foreground/80'
                  }`}
                >
                  {link.label}
                </a>
                );
              })}

              <div className="border-border/50 mt-3 border-t pt-4">
                <CutButton
                  variant="outline"
                  href="/sign-in"
                  fullWidth
                  onClick={(e) => {
                    setMobileMenuOpen(false);
                    if (onOpenSignIn) {
                      e.preventDefault();
                      onOpenSignIn();
                    }
                  }}
                >
                  Sign in
                </CutButton>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
