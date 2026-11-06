import './_group.css';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowLeft, ArrowRight, Container } from 'lucide-react';

function RotatingCargo() {
  const reduceMotion = useReducedMotion();

  return (
    <div className="relative mt-4 h-[126px] overflow-hidden border-y border-dotted border-border/70 bg-muted/10">
      <div className="cargo-3d-stage absolute inset-x-0 top-0 bottom-[27px] z-10 flex items-center justify-center overflow-hidden">
        <div className="pointer-events-none absolute bottom-5 h-7 w-[62%] rounded-[50%] bg-black/70 blur-xl" />
        <motion.div
          className="cargo-3d-shell z-10"
          style={{ transformStyle: 'preserve-3d', transformOrigin: '50% 50%' }}
          animate={
            reduceMotion
              ? { rotateX: -10, rotateY: -30, y: -5 }
              : { rotateX: [-12, -8, -12], rotateY: [-30, 330], y: [-5, -7, -5] }
          }
          transition={
            reduceMotion
              ? undefined
              : {
                  rotateY: { duration: 18, repeat: Infinity, ease: 'linear' },
                  rotateX: { duration: 8, repeat: Infinity, ease: 'easeInOut' },
                  y: { duration: 4.5, repeat: Infinity, ease: 'easeInOut' },
                }
          }
          whileHover={reduceMotion ? undefined : { scale: 1.035 }}
        >
          <div className="cargo-face cargo-face-front overflow-hidden">
            <div className="absolute left-3 top-2 font-mono text-[6px] tracking-[0.16em] text-white/50">WSHU 482910–6</div>
            <div className="absolute bottom-2 left-3 h-1 w-9 bg-[#2f80ff]" />
            <div className="cargo-scan-line" />
          </div>
          <div className="cargo-face cargo-face-back overflow-hidden">
            <div className="absolute left-3 top-2 font-mono text-[6px] tracking-[0.16em] text-white/40">WISESHIPS · 40 HC</div>
            <div className="cargo-scan-line" />
          </div>
          <div className="cargo-face cargo-face-side cargo-face-right">
            <span className="absolute inset-x-0 top-2 text-center font-mono text-[5px] tracking-widest text-white/40">WS</span>
          </div>
          <div className="cargo-face cargo-face-side cargo-face-left" />
          <div className="cargo-face cargo-face-top" />
          <div className="cargo-face cargo-face-bottom" />
        </motion.div>
      </div>
      <div className="absolute inset-x-[9%] bottom-[27px] z-0 border-t border-dotted border-border/90" />
      <div className="absolute inset-x-[9%] bottom-[18px] z-20 flex items-center justify-between">
        <span className="h-1.5 w-1.5 rounded-full bg-[#2f80ff] ring-4 ring-[#2f80ff]/10" />
        <span className="h-1.5 w-1.5 rounded-full bg-[#2f80ff]/75" />
        <span className="h-1.5 w-1.5 rounded-full bg-muted-foreground/50" />
      </div>
      <div className="absolute inset-x-[7%] bottom-[2px] z-20 flex justify-between font-mono text-[7px] uppercase tracking-[0.1em] text-muted-foreground sm:text-[8px]">
        <span>Origin</span>
        <span>In transit</span>
        <span>Delivery</span>
      </div>
    </div>
  );
}

export function Rotating() {
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
          <RotatingCargo />
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
