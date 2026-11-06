import React, { lazy, Suspense, useState, useEffect } from 'react';
import { ThemeProvider, ThemeSwitch } from './context/ThemeContext';
import { Nav } from './components/Nav';
import { Footer } from './components/Footer';
import { CommandPalette } from './components/CommandPalette';
import { AuthModals, ModalState } from './components/AuthModals';

type CurrentView =
  | 'home'
  | 'platform'
  | 'solutions'
  | 'teams'
  | 'developers'
  | 'glossary'
  | 'calculator'
  | 'containerPlanner'
  | 'contact'
  | 'login';

const loadHomePage = () =>
  import('./pages/HomePage').then(({ HomePage }) => ({ default: HomePage }));
const loadPlatformPage = () =>
  import('./pages/PlatformPage').then(({ PlatformPage }) => ({ default: PlatformPage }));
const loadSolutionsPage = () =>
  import('./pages/SolutionsPage').then(({ SolutionsPage }) => ({ default: SolutionsPage }));
const loadTeamsPage = () =>
  import('./pages/TeamsPage').then(({ TeamsPage }) => ({ default: TeamsPage }));
const loadDevelopersPage = () =>
  import('./pages/DevelopersPage').then(({ DevelopersPage }) => ({ default: DevelopersPage }));
const loadGlossaryPage = () =>
  import('./pages/ToolsGlossaryPage').then(({ ToolsGlossaryPage }) => ({ default: ToolsGlossaryPage }));
const loadCalculatorPage = () =>
  import('./pages/FreightCalculatorPage').then(({ FreightCalculatorPage }) => ({
    default: FreightCalculatorPage,
  }));
const loadContainerPlannerPage = () =>
  import('./pages/ContainerLoadPlannerPage').then(({ ContainerLoadPlannerPage }) => ({
    default: ContainerLoadPlannerPage,
  }));
const loadContactPage = () =>
  import('./components/contact/ContactPagePro').then(({ ContactPagePro }) => ({
    default: ContactPagePro,
  }));
const loadLoginPage = () =>
  import('./components/LoginPage').then(({ LoginPage }) => ({ default: LoginPage }));

const HomePage = lazy(loadHomePage);
const PlatformPage = lazy(loadPlatformPage);
const SolutionsPage = lazy(loadSolutionsPage);
const TeamsPage = lazy(loadTeamsPage);
const DevelopersPage = lazy(loadDevelopersPage);
const ToolsGlossaryPage = lazy(loadGlossaryPage);
const FreightCalculatorPage = lazy(loadCalculatorPage);
const ContainerLoadPlannerPage = lazy(loadContainerPlannerPage);
const ContactPage = lazy(loadContactPage);
const LoginPage = lazy(loadLoginPage);

const routePreloaders: Record<string, () => Promise<unknown>> = {
  '/': loadHomePage,
  '/platform': loadPlatformPage,
  '/solutions': loadSolutionsPage,
  '/teams': loadTeamsPage,
  '/developers': loadDevelopersPage,
  '/tools': loadGlossaryPage,
  '/tools/glossary': loadGlossaryPage,
  '/tools/cbm-calculator': loadCalculatorPage,
  '/tools/container-load-planner': loadContainerPlannerPage,
  '/contact': loadContactPage,
  '/sign-in': loadLoginPage,
  '/login': loadLoginPage,
};
const preloadedRoutes = new Set<string>();

function normalizePath(path: string) {
  return path.replace(/\/+$/, '') || '/';
}

function preloadRoute(path: string) {
  const normalizedPath = normalizePath(path);
  const load = routePreloaders[normalizedPath];
  if (!load || preloadedRoutes.has(normalizedPath)) return;

  preloadedRoutes.add(normalizedPath);
  void load().catch(() => preloadedRoutes.delete(normalizedPath));
}

function RouteLoading() {
  return (
    <main
      id="main-content"
      className="mx-auto flex w-full max-w-[1440px] flex-1 items-center px-5 pb-20 pt-28 sm:px-8 lg:px-10"
      role="status"
      aria-busy="true"
      aria-label="Cargando página"
    >
      <div className="grid w-full items-center gap-12 lg:grid-cols-[1.04fr_0.96fr] lg:gap-16">
        <section>
          <div className="mb-6 flex items-center gap-2">
            <span className="h-2 w-2 animate-pulse bg-[#2f80ff]" aria-hidden="true" />
            <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
              Cargando página
            </span>
          </div>
          <div className="h-12 max-w-xl animate-pulse bg-muted/70 sm:h-14" />
          <div className="mt-3 h-12 w-4/5 max-w-lg animate-pulse bg-muted/70 sm:h-14" />
          <div className="mt-8 space-y-3">
            <div className="h-3 w-full max-w-xl animate-pulse bg-muted/60" />
            <div className="h-3 w-11/12 max-w-lg animate-pulse bg-muted/60" />
            <div className="h-3 w-3/4 max-w-md animate-pulse bg-muted/60" />
          </div>
          <div className="mt-8 h-10 w-40 animate-pulse bg-muted/70" />
        </section>
        <div
          className="min-h-[300px] animate-pulse border border-border bg-muted/20 p-6 sm:min-h-[360px]"
          style={{ clipPath: 'polygon(0 0, calc(100% - 28px) 0, 100% 28px, 100% 100%, 0 100%)' }}
          aria-hidden="true"
        >
          <div className="h-5 border-b border-border/70" />
          <div className="mt-8 h-4 w-2/5 bg-muted/60" />
          <div className="mt-4 h-10 w-3/5 bg-muted/60" />
          <div className="mt-8 h-24 border border-border/70" />
          <div className="mt-6 h-3 w-4/5 bg-muted/60" />
        </div>
      </div>
    </main>
  );
}

const pageMeta: Record<CurrentView, { title: string; description: string }> = {
  home: {
    title: 'WiseShips — Forwarder & Origin Inspection CRM',
    description: 'Track containers, coordinate inspections, and connect clients and deals with WiseShips CRM.',
  },
  platform: {
    title: 'Platform — WiseShips',
    description: 'Explore container tracking, origin inspections, client records, deals, and documents in WiseShips.',
  },
  solutions: {
    title: 'Solutions — WiseShips',
    description: 'WiseShips workflows for freight forwarders and origin-inspection companies.',
  },
  teams: {
    title: 'Teams — WiseShips',
    description: 'A connected shipment workspace for forwarders, inspection teams, and client operations.',
  },
  developers: {
    title: 'Developers — WiseShips',
    description: 'A development team included with WiseShips, reviewing and building viable custom modules for freight forwarders and origin-inspection teams.',
  },
  glossary: {
    title: 'Diccionario del transitario — WiseShips Tools',
    description: 'Definiciones claras de términos marítimos, aéreos, terrestres, aduaneros e Incoterms.',
  },
  calculator: {
    title: 'Calculadora de CBM y peso facturable — WiseShips Tools',
    description: 'Calcula CBM, peso volumétrico y peso facturable con un factor editable.',
  },
  containerPlanner: {
    title: 'Planificador de carga 3D — WiseShips Tools',
    description: 'Calcula y visualiza la distribución, el volumen y el peso de la carga en un contenedor.',
  },
  contact: {
    title: 'Contact — WiseShips',
    description: 'Talk with the WiseShips team about your freight-forwarding or inspection workflow.',
  },
  login: {
    title: 'Sign in — WiseShips',
    description: 'Sign in to your WiseShips operations workspace.',
  },
};

function getCurrentView(): CurrentView {
  const path = normalizePath(window.location.pathname);
  const hash = window.location.hash;

  if (path === '/sign-in' || path === '/login' || hash === '#sign-in') return 'login';
  if (path === '/contact' || (path === '/' && hash === '#contact')) return 'contact';
  if (path === '/platform' || (path === '/' && hash.startsWith('#platform'))) return 'platform';
  if (path === '/solutions' || (path === '/' && ['#solutions', '#faq'].includes(hash))) return 'solutions';
  if (path === '/teams' || (path === '/' && hash === '#customers')) return 'teams';
  if (path === '/developers') return 'developers';
  if (path === '/tools/cbm-calculator') return 'calculator';
  if (path === '/tools/container-load-planner') return 'containerPlanner';
  if (path === '/tools' || path === '/tools/glossary') return 'glossary';
  return 'home';
}

export default function App() {
  const [currentView, setCurrentView] = useState<CurrentView>(getCurrentView);
  const [commandPaletteOpen, setCommandPaletteOpen] = useState(false);
  const [modalState, setModalState] = useState<ModalState>({ type: null });

  useEffect(() => {
    const syncView = () => setCurrentView(getCurrentView());
    const handleInternalNavigation = (event: MouseEvent) => {
      if (
        event.defaultPrevented ||
        event.button !== 0 ||
        event.metaKey ||
        event.ctrlKey ||
        event.shiftKey ||
        event.altKey ||
        !(event.target instanceof Element)
      ) {
        return;
      }

      const anchor = event.target.closest<HTMLAnchorElement>('a[href]');
      if (!anchor || anchor.target === '_blank' || anchor.hasAttribute('download')) return;

      const destination = new URL(anchor.href, window.location.href);
      if (destination.origin !== window.location.origin) return;

      const destinationPath = normalizePath(destination.pathname);
      if (!routePreloaders[destinationPath]) return;
      if (destinationPath === normalizePath(window.location.pathname)) {
        if (destination.hash && destination.hash !== window.location.hash) return;
        event.preventDefault();
        if (!destination.hash) window.scrollTo({ top: 0, behavior: 'auto' });
        return;
      }

      event.preventDefault();
      window.history.pushState(null, '', `${destination.pathname}${destination.search}${destination.hash}`);
      syncView();
      if (!destination.hash) window.scrollTo({ top: 0, behavior: 'auto' });
    };

    const warmInternalRoute = (event: Event) => {
      if (!(event.target instanceof Element)) return;
      const anchor = event.target.closest<HTMLAnchorElement>('a[href]');
      if (!anchor || anchor.target === '_blank') return;

      const destination = new URL(anchor.href, window.location.href);
      if (destination.origin === window.location.origin) preloadRoute(destination.pathname);
    };

    window.addEventListener('popstate', syncView);
    window.addEventListener('hashchange', syncView);
    document.addEventListener('click', handleInternalNavigation);
    document.addEventListener('pointerover', warmInternalRoute);
    document.addEventListener('focusin', warmInternalRoute);
    return () => {
      window.removeEventListener('popstate', syncView);
      window.removeEventListener('hashchange', syncView);
      document.removeEventListener('click', handleInternalNavigation);
      document.removeEventListener('pointerover', warmInternalRoute);
      document.removeEventListener('focusin', warmInternalRoute);
    };
  }, []);

  useEffect(() => {
    const hash = window.location.hash;
    if (currentView === 'login' || !hash || ['#top', '#landing', '#contact', '#sign-in'].includes(hash)) {
      if (currentView === 'contact') window.scrollTo({ top: 0, behavior: 'auto' });
      return;
    }

    const targetId = hash.slice(1);
    let attempts = 0;
    let frame = 0;
    const scrollWhenReady = () => {
      const target = document.getElementById(targetId);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
        return;
      }
      if (attempts++ < 120) frame = window.requestAnimationFrame(scrollWhenReady);
    };

    frame = window.requestAnimationFrame(scrollWhenReady);
    return () => window.cancelAnimationFrame(frame);
  }, [currentView]);

  const handleOpenSignIn = () => {
    window.history.pushState(null, '', '/sign-in');
    setCurrentView('login');
    window.scrollTo({ top: 0, behavior: 'auto' });
  };

  const handleBackToHome = () => {
    window.history.pushState(null, '', '/');
    setCurrentView('home');
    window.scrollTo({ top: 0, behavior: 'auto' });
  };

  const handleOpenGetStarted = () => setModalState({ type: 'get-started' });
  const handleOpenDemo = () => setModalState({ type: 'demo' });
  const handleCloseModal = () => setModalState({ type: null });

  useEffect(() => {
    document.title = pageMeta[currentView].title;
    document
      .querySelector('meta[name="description"]')
      ?.setAttribute('content', pageMeta[currentView].description);
  }, [currentView]);

  if (currentView === 'login') {
    return (
      <ThemeProvider>
        <Suspense fallback={<RouteLoading />}>
          <LoginPage onBackToHome={handleBackToHome} />
        </Suspense>
        <ThemeSwitch />
        <CommandPalette
          isOpen={commandPaletteOpen}
          onClose={() => setCommandPaletteOpen(false)}
        />
      </ThemeProvider>
    );
  }

  const currentPath =
    currentView === 'home'
      ? '/'
      : currentView === 'glossary'
        ? '/tools/glossary'
        : currentView === 'calculator'
          ? '/tools/cbm-calculator'
          : currentView === 'containerPlanner'
            ? '/tools/container-load-planner'
        : `/${currentView}`;
  let pageContent: React.ReactNode;

  if (currentView === 'platform') {
    pageContent = <PlatformPage />;
  } else if (currentView === 'solutions') {
    pageContent = <SolutionsPage onOpenContact={handleOpenDemo} />;
  } else if (currentView === 'teams') {
    pageContent = <TeamsPage />;
  } else if (currentView === 'developers') {
    pageContent = <DevelopersPage />;
  } else if (currentView === 'glossary') {
    pageContent = <ToolsGlossaryPage />;
  } else if (currentView === 'calculator') {
    pageContent = <FreightCalculatorPage />;
  } else if (currentView === 'containerPlanner') {
    pageContent = <ContainerLoadPlannerPage />;
  } else if (currentView === 'contact') {
    pageContent = <ContactPage />;
  } else {
    pageContent = (
      <HomePage
        onOpenGetStarted={handleOpenGetStarted}
        onOpenDemo={handleOpenDemo}
        onOpenCommandPalette={() => setCommandPaletteOpen(true)}
      />
    );
  }

  return (
    <ThemeProvider>
      <span id="top" className="sr-only" />
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-background focus:text-foreground focus:border focus:border-border focus:shadow-lg focus:rounded-md"
      >
        Skip to main content
      </a>

      <div className="relative flex min-h-screen flex-col bg-background text-foreground antialiased selection:bg-[#2f80ff]/20 selection:text-foreground">
        <Nav
          currentPath={currentPath}
          onOpenSignIn={handleOpenSignIn}
          onOpenGetStarted={handleOpenGetStarted}
        />
        <Suspense fallback={<RouteLoading />}>{pageContent}</Suspense>
        <Footer onOpenTalkToUs={handleOpenDemo} />
        <ThemeSwitch />
        <CommandPalette
          isOpen={commandPaletteOpen}
          onClose={() => setCommandPaletteOpen(false)}
        />
        <AuthModals state={modalState} onClose={handleCloseModal} />
      </div>
    </ThemeProvider>
  );
}
