import React from 'react';
import { CornerPlus } from './CornerPlus';
import { CutButton } from './CutButton';

const cutCorner28: React.CSSProperties = {
  clipPath:
    'polygon(28px 0, 100% 0, 100% calc(100% - 28px), calc(100% - 28px) 100%, 0 100%, 0 28px)',
};

export function Footer({
  onOpenTalkToUs,
}: {
  onOpenTalkToUs?: () => void;
}) {
  return (
    <footer className="mx-auto w-full min-w-0 max-w-[1440px] px-5 pb-10 sm:px-8 lg:px-10">
      <div className="min-w-0 bg-border p-px" style={cutCorner28}>
        <div className="min-w-0 bg-background p-6 sm:p-10 lg:p-14" style={cutCorner28}>
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

          <div className="mt-10 grid grid-cols-1 gap-y-9 sm:mt-12 sm:grid-cols-2 sm:gap-x-8 sm:gap-y-10 md:mt-14 md:gap-x-0 xl:grid-cols-4">
            {/* Column 1: Product */}
            <div className="relative min-w-0 sm:pr-8 xl:pl-0">
              <h3 className="text-sm font-semibold tracking-tight">Product</h3>
              <ul className="mt-4 space-y-3">
                <li>
                  <a
                    href="/platform"
                    className="focus-ring text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    Platform
                  </a>
                </li>
                <li>
                  <a
                    href="/solutions"
                    className="focus-ring text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    Solutions
                  </a>
                </li>
                <li>
                  <a
                    href="/teams"
                    className="focus-ring text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    Teams
                  </a>
                </li>
                <li>
                  <a
                    href="/developers"
                    className="focus-ring text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    Developers
                  </a>
                </li>
                <li>
                  <a
                    href="/solutions#faq"
                    className="focus-ring text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    FAQs
                  </a>
                </li>
              </ul>
            </div>

            {/* Column 2: Workflows */}
            <div className="relative min-w-0 sm:border-l sm:border-border sm:pl-8 xl:px-8">
              <CornerPlus className="left-0 top-0 hidden -translate-x-1/2 -translate-y-1/2 sm:block" />
              <CornerPlus className="bottom-0 left-0 hidden -translate-x-1/2 translate-y-1/2 sm:block" />
              <h3 className="text-sm font-semibold tracking-tight">Workflows</h3>
              <ul className="mt-4 space-y-3">
                <li>
                  <a
                    href="/platform#shipment-tracking"
                    className="focus-ring text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    Container tracking
                  </a>
                </li>
                <li>
                  <a
                    href="/platform#origin-inspections"
                    className="focus-ring text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    Origin inspections
                  </a>
                </li>
                <li>
                  <a
                    href="/platform#clients-deals"
                    className="focus-ring text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    Clients & deals
                  </a>
                </li>
                <li>
                  <a
                    href="/platform#documents"
                    className="focus-ring text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    Documents & contracts
                  </a>
                </li>
              </ul>
            </div>

            {/* Column 3: Support */}
            <div className="relative min-w-0 sm:border-l-0 sm:pl-0 xl:border-l xl:border-border xl:px-8">
              <CornerPlus className="left-0 top-0 hidden -translate-x-1/2 -translate-y-1/2 xl:block" />
              <CornerPlus className="bottom-0 left-0 hidden -translate-x-1/2 translate-y-1/2 xl:block" />
              <h3 className="text-sm font-semibold tracking-tight">Support</h3>
              <ul className="mt-4 space-y-3">
                <li>
                  <a
                    href="/solutions#faq"
                    className="focus-ring text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    Frequently asked questions
                  </a>
                </li>
                <li>
                  <a
                    href="/contact"
                    className="focus-ring text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    Contact WiseShips
                  </a>
                </li>
              </ul>
            </div>

            {/* Column 4: Connect */}
            <div className="relative min-w-0 sm:border-l sm:border-border sm:pl-8 xl:px-8 xl:pr-0">
              <CornerPlus className="left-0 top-0 hidden -translate-x-1/2 -translate-y-1/2 sm:block" />
              <CornerPlus className="bottom-0 left-0 hidden -translate-x-1/2 translate-y-1/2 sm:block" />
              <h3 className="text-sm font-semibold tracking-tight">Connect</h3>
              <ul className="mt-4 space-y-3">
                <li>
                  <a
                    href="https://wa.me/525653848838"
                    target="_blank"
                    rel="noreferrer"
                    className="focus-ring text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    Schedule through WhatsApp
                  </a>
                </li>
              </ul>
              <a
                href="mailto:support@wiseships.com"
                className="focus-ring mt-4 inline-block text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                support@wiseships.com
              </a>
              <div className="mt-6 flex flex-col items-start gap-2.5">
                <CutButton
                  variant="solid"
                  href="/contact"
                  onClick={(e) => {
                    if (onOpenTalkToUs) {
                      e.preventDefault();
                      onOpenTalkToUs();
                    }
                  }}
                >
                  Book a demo
                </CutButton>
                <CutButton variant="outline" href="/contact">
                  Contact page
                </CutButton>
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="mt-10 flex flex-col-reverse items-start justify-between gap-4 pt-6 sm:mt-12 sm:flex-row sm:items-center sm:gap-6 md:mt-14">
            <p className="text-xs text-muted-foreground">
              &copy; 2026 WiseShips. All rights reserved.
            </p>

            <p className="text-xs text-muted-foreground">
              Mexico City · Monday–Friday, 9:00–18:00
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
