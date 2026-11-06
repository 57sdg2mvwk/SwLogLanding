import React from 'react';
import { UsersRound } from 'lucide-react';
import { CornerPlus } from './CornerPlus';

const workflows = [
  'Container tracking',
  'Origin operations',
  'Inspections',
  'Clients & deals',
  'Documents',
];

export function CoverageGrid() {
  return (
    <section className="mx-auto max-w-[1440px] px-5 pb-24 sm:px-8 lg:px-10">
      <div className="relative border border-border">
        <CornerPlus className="left-0 top-0 -translate-x-1/2 -translate-y-1/2" />
        <CornerPlus className="right-0 top-0 translate-x-1/2 -translate-y-1/2" />
        <CornerPlus className="bottom-0 left-0 -translate-x-1/2 translate-y-1/2" />
        <CornerPlus className="bottom-0 right-0 translate-x-1/2 translate-y-1/2" />

        <div className="flex flex-col items-stretch md:flex-row">
          <div className="flex shrink-0 items-center justify-center border-b border-border px-6 py-5 md:border-b-0 md:border-r md:py-7">
            <span className="text-xs font-medium text-muted-foreground">
              One workspace for
            </span>
          </div>

          <div className="flex flex-1 flex-wrap items-center justify-evenly gap-x-8 gap-y-6 px-8 py-7">
            {workflows.map((workflow) => (
              <span
                key={workflow}
                className="text-xs font-medium tracking-tight text-foreground/70 transition-colors duration-200 hover:text-foreground"
              >
                {workflow}
              </span>
            ))}
          </div>

          <div className="flex shrink-0 items-center justify-center gap-2 border-t border-border px-6 py-5 text-muted-foreground md:border-l md:border-t-0 md:py-7">
            <UsersRound className="h-4 w-4" aria-hidden="true" />
            <span className="text-xs font-medium">Forwarders & inspectors</span>
          </div>
        </div>
      </div>
    </section>
  );
}
