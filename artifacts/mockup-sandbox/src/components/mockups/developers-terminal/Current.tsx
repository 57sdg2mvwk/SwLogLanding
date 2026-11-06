import './_group.css';
import { ArrowRight } from 'lucide-react';

const clippedPanel: React.CSSProperties = {
  clipPath: 'polygon(0 0, calc(100% - 28px) 0, 100% 28px, 100% 100%, 0 100%)',
};

export function Current() {
  return (
    <div className="developers-terminal-preview min-h-screen bg-background text-foreground antialiased">
      <div className="h-16" aria-hidden="true" />
      <section className="mx-auto grid max-w-[1440px] gap-10 px-5 pb-16 pt-12 sm:px-8 sm:pb-20 sm:pt-16 lg:grid-cols-[1.04fr_0.96fr] lg:items-end lg:gap-16 lg:px-10 lg:pb-24 lg:pt-20">
        <div className="max-w-3xl">
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 bg-[#2f80ff]" />
            <p className="font-mono text-[11px] font-medium uppercase tracking-[0.16em] text-muted-foreground">
              Developers / Built around your operation
            </p>
          </div>
          <h1 className="mt-5 text-balance font-serif text-4xl font-normal leading-[1.08] tracking-[-0.01em] sm:text-5xl lg:text-[3.7rem]">
            Your operation has <span className="font-sans font-semibold tracking-tight">its own logic.</span>
          </h1>
          <p className="mt-5 max-w-2xl text-pretty text-sm leading-7 text-muted-foreground sm:text-base">
            The only freight-forwarder CRM with a development team built in, WiseShips turns the right operational needs into considered modules—reviewed for reliability, built when viable, and shared only when approved for broader use.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href="#" className="inline-flex h-10 items-center gap-2 bg-foreground px-5 text-sm font-medium tracking-wide text-background">
              Talk to our team <ArrowRight className="h-4 w-4" />
            </a>
            <a href="#" className="inline-flex h-10 items-center border border-border px-5 text-sm font-medium tracking-wide text-foreground">
              Explore the workflow
            </a>
          </div>
        </div>

        <div className="relative">
          <div className="absolute -inset-3 border border-dashed border-border/70" aria-hidden="true" />
          <div className="bg-border p-px" style={clippedPanel}>
            <div className="relative overflow-hidden bg-background p-5 sm:p-7" style={clippedPanel}>
              <div className="mb-5 flex items-center justify-between border-b border-border/70 pb-4">
                <div className="flex items-center gap-2.5">
                  <span className="h-2 w-2 rounded-full bg-[#2f80ff]" />
                  <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-muted-foreground">
                    WiseShips workspace
                  </span>
                </div>
                <span className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
                  Developers / Built around your operation
                </span>
              </div>
              <div className="grid grid-cols-[1fr_auto] gap-4">
                <div>
                  <p className="font-mono text-[10px] uppercase tracking-[0.12em] text-muted-foreground">
                    Sample shipment record
                  </p>
                  <p className="mt-1 text-lg font-semibold tracking-tight">WS-2048 / Ningbo → Long Beach</p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {['Container', 'Milestones', 'Documents'].map((label) => (
                      <span key={label} className="border border-border px-2 py-1 text-[10px] text-muted-foreground">
                        {label}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="flex h-10 w-10 items-center justify-center border border-[#2f80ff]/35 bg-[#2f80ff]/[0.07] font-mono text-[10px] text-[#2f80ff]">
                  WS
                </div>
              </div>
              <div className="mt-6 border-t border-dotted border-border pt-4">
                <div className="flex items-center justify-between text-[11px]">
                  <span className="font-medium">Origin inspection</span>
                  <span className="text-muted-foreground">Report attached</span>
                </div>
                <div className="mt-3 h-1 overflow-hidden bg-muted">
                  <div className="h-full w-[68%] bg-[#2f80ff]" />
                </div>
                <div className="mt-2 flex justify-between font-mono text-[9px] uppercase tracking-wider text-muted-foreground">
                  <span>Origin</span><span>In transit</span><span>Delivery</span>
                </div>
              </div>
              <svg className="pointer-events-none absolute right-0 top-0 z-10 h-3.5 w-3.5 text-[#2f80ff]" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M12 4v16M4 12h16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </div>
          </div>
          <p className="mt-3 text-right font-mono text-[10px] uppercase tracking-[0.14em] text-muted-foreground">
            One connected operational record
          </p>
        </div>
      </section>
    </div>
  );
}
