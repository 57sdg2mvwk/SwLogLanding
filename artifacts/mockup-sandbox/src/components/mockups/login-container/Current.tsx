import './_group.css';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowLeft, ArrowRight, Container } from 'lucide-react';

function CurrentContainerScene() {
  const reduceMotion = useReducedMotion();

  return (
    <div className="relative mt-4 h-[126px] overflow-hidden border-y border-dotted border-border/70 bg-muted/10">
      <div className="relative flex h-full items-center justify-center px-3">
        <div className="absolute inset-x-[9%] bottom-[27px] border-t border-dotted border-border/90" />
        <motion.div
          className="absolute top-0 z-10 flex h-[92px] w-[min(82%,320px)] items-center justify-center sm:h-[100px] sm:w-[min(76%,350px)]"
          animate={reduceMotion ? undefined : { y: [0, -2, 0], rotate: [0, 0.45, 0] }}
          transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
          style={{ transformOrigin: '50% 55%' }}
        >
          <svg viewBox="0 0 420 160" className="h-full w-full overflow-visible" role="presentation" focusable="false">
            <g style={{ transform: 'perspective(720px) rotateX(4deg) rotateY(-8deg)', transformOrigin: '50% 50%' }}>
              <polygon points="29,31 88,11 389,19 330,39" fill="color-mix(in srgb, var(--ws-background) 90%, var(--ws-foreground) 10%)" stroke="var(--ws-border)" strokeWidth="1.4" strokeLinejoin="round" />
              <path d="M42 29 96 14M76 30 128 15M110 31 162 16M144 32 196 17M178 33 230 18M212 34 264 19M246 35 298 20M280 36 332 21M314 37 366 22" fill="none" stroke="var(--ws-foreground)" strokeOpacity=".12" strokeWidth="1" />
              <polygon points="330,39 389,19 389,112 330,132" fill="color-mix(in srgb, var(--ws-background) 68%, var(--ws-foreground) 32%)" stroke="var(--ws-border)" strokeWidth="1.4" strokeLinejoin="round" />
              <path d="M344 35v92M359 30v92M374 25v92" stroke="var(--ws-foreground)" strokeOpacity=".17" strokeWidth="1.3" />
              <polygon points="29,31 330,39 330,132 29,121" fill="color-mix(in srgb, var(--ws-background) 80%, var(--ws-foreground) 20%)" stroke="var(--ws-border)" strokeWidth="1.5" strokeLinejoin="round" />
              <path d="M43 32 43 122M61 32 61 122M79 32 79 122M97 33 97 123M115 33 115 124M133 34 133 124M151 34 151 125M169 35 169 125M187 35 187 126M205 36 205 127M223 36 223 127M241 37 241 128M259 37 259 129M277 38 277 129M295 38 295 130M313 39 313 131" fill="none" stroke="var(--ws-foreground)" strokeOpacity=".19" strokeWidth="2.2" />
              <path d="M43 32 43 122M61 32 61 122M79 32 79 122M97 33 97 123M115 33 115 124M133 34 133 124M151 34 151 125M169 35 169 125M187 35 187 126M205 36 205 127M223 36 223 127M241 37 241 128M259 37 259 129M277 38 277 129M295 38 295 130M313 39 313 131" fill="none" stroke="var(--ws-background)" strokeOpacity=".42" strokeWidth=".7" />
              <path d="m44 108 39 1.5v5L44 113z" fill="#2f80ff" fillOpacity=".9" />
              <text x="45" y="48" fill="var(--ws-foreground)" fillOpacity=".52" fontFamily="monospace" fontSize="7" letterSpacing="1.5">WSHU 482910–6</text>
              <path d="M30 31 89 11 389 19 389 112 330 132 29 121z" fill="none" stroke="var(--ws-foreground)" strokeOpacity=".2" strokeWidth="1" strokeLinejoin="round" />
            </g>
          </svg>
        </motion.div>
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
    </div>
  );
}

export function Current() {
  return (
    <main className="login-container-mockup dark flex min-h-screen items-center justify-center bg-background p-3 font-sans text-foreground">
      <section className="w-full max-w-[800px] overflow-hidden rounded-xl border border-border bg-background">
        <header className="flex h-9 items-center justify-between border-b border-border/70 px-3">
          <span className="flex items-center gap-2 text-xs font-semibold tracking-tight">
            <Container className="h-3.5 w-3.5 text-[#2f80ff]" />
            Platform benefits
          </span>
          <span className="font-mono text-[9px] uppercase tracking-wider text-muted-foreground">01 / 04</span>
        </header>
        <div className="flex items-start gap-3 px-3 pt-4">
          <span className="mt-1 flex h-9 w-9 shrink-0 items-center justify-center rounded-md border border-border text-[#2f80ff]">
            <Container className="h-4 w-4" />
          </span>
          <div className="min-w-0 flex-1">
            <p className="font-mono text-[9px] uppercase tracking-[0.12em] text-muted-foreground">01 / Container tracking</p>
            <h1 className="mt-1 text-sm font-semibold tracking-tight">Know where every shipment stands.</h1>
            <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
              Follow bookings, container references, routes, and milestones from origin to delivery.
            </p>
          </div>
        </div>
        <div className="px-3">
          <CurrentContainerScene />
          <div className="grid grid-cols-3 border-b border-dotted border-border/70">
            {['Container references', 'Route milestones', 'Shared shipment view'].map((item) => (
              <span key={item} className="flex min-h-10 items-center gap-2 border-r border-dotted border-border/70 px-2 text-[10px] text-muted-foreground last:border-r-0">
                <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-[#2f80ff]" />
                {item}
              </span>
            ))}
          </div>
        </div>
        <footer className="flex h-12 items-center justify-between px-3">
          <div className="flex items-center gap-1.5">
            <span className="h-1.5 w-6 rounded-full bg-[#2f80ff]" />
            <span className="h-1.5 w-1.5 rounded-full bg-muted-foreground/40" />
            <span className="h-1.5 w-1.5 rounded-full bg-muted-foreground/40" />
            <span className="h-1.5 w-1.5 rounded-full bg-muted-foreground/40" />
          </div>
          <div className="flex gap-2">
            <button className="flex h-8 w-8 items-center justify-center rounded-md border border-border text-muted-foreground" aria-label="Previous benefit">
              <ArrowLeft className="h-4 w-4" />
            </button>
            <button className="flex h-8 w-8 items-center justify-center rounded-md border border-border text-muted-foreground" aria-label="Next benefit">
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </footer>
      </section>
    </main>
  );
}
