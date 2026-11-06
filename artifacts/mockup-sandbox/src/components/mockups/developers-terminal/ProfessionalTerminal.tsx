import './_group.css';
import { ArrowRight } from 'lucide-react';
import { DeveloperTerminal } from './_DeveloperTerminal';

export function ProfessionalTerminal() {
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
        <DeveloperTerminal />
      </section>
    </div>
  );
}
