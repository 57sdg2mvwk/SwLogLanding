import { HeroWaves } from '../components/HeroWaves';
import { Hero } from '../components/Hero';
import { DashboardMockup } from '../components/DashboardMockup';
import { CoverageGrid } from '../components/CoverageGrid';
import { FinalCta } from '../components/FinalCta';

export function HomePage({
  onOpenGetStarted,
  onOpenDemo,
  onOpenCommandPalette,
}: {
  onOpenGetStarted: () => void;
  onOpenDemo: () => void;
  onOpenCommandPalette: () => void;
}) {
  return (
    <main id="main-content" className="flex-1">
      <div className="relative">
        <HeroWaves />
        <Hero
          onOpenGetStarted={onOpenGetStarted}
          onOpenTalkToUs={onOpenDemo}
        />
        <DashboardMockup onOpenCommandPalette={onOpenCommandPalette} />
      </div>
      <CoverageGrid />
      <FinalCta
        onOpenGetStarted={onOpenGetStarted}
        onOpenDemo={onOpenDemo}
      />
    </main>
  );
}
