import React from 'react';
import { CutButton } from './_CutButton';
import Ferrofluid from './_Ferrofluid';
import './_group.css';

const darkSettings = {
  colors: ['#ffffff', '#9db8e8', '#ffffff'],
  scale: 1.15,
  spikeHeight: 0.62,
  sharpness: 2.5,
  turbulence: 0.72,
  fluidity: 0.42,
  magnetism: 0.9,
  brightness: 0.92,
  mouseStrength: 0.9,
  mouseRadius: 0.24,
  opacity: 0.7,
};

const tunedSettings = {
  colors: ['#8799ad', '#647992', '#bbc8d6'],
  scale: 0.92,
  spikeHeight: 0.42,
  sharpness: 2.2,
  turbulence: 0.42,
  fluidity: 0.34,
  magnetism: 0.72,
  brightness: 1.08,
  mouseStrength: 0.65,
  mouseRadius: 0.2,
  opacity: 0.65,
};

export function HomeHeroPreview({ tuned = false }: { tuned?: boolean }) {
  const settings = tuned ? tunedSettings : darkSettings;

  return (
    <main className="home-hero-preview">
      <header className="home-hero-preview__nav">
        <div className="home-hero-preview__logo">
          <span className="home-hero-preview__logo-mark" />
          <span>WiseShips</span>
        </div>
        <nav className="home-hero-preview__nav-links" aria-label="Primary">
          <span>Platform</span>
          <span>Solutions</span>
          <span>Teams</span>
          <span>Developers</span>
          <span>Contact</span>
        </nav>
        <CutButton variant="solid" href="#">
          Book a demo
        </CutButton>
      </header>

      <section className="relative isolate overflow-visible">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-12 bottom-[-96px] z-0"
        >
          <Ferrofluid
            className="pointer-events-none"
            colors={settings.colors}
            speed={0.32}
            scale={settings.scale}
            spikeHeight={settings.spikeHeight}
            sharpness={settings.sharpness}
            turbulence={settings.turbulence}
            fluidity={settings.fluidity}
            tilt={48}
            magnetism={settings.magnetism}
            brightness={settings.brightness}
            mouseInteraction
            mouseStrength={settings.mouseStrength}
            mouseRadius={settings.mouseRadius}
            clickPulse={false}
            intro={false}
            lightMode
            transparent
            opacity={settings.opacity}
            dpr={1}
            style={{ position: 'absolute', inset: 0 }}
          />
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                'linear-gradient(to bottom, color-mix(in srgb, var(--foreground) 1.5%, var(--background)) 0%, transparent 68%, var(--background) 100%)',
            }}
          />
        </div>

        <div className="relative z-10 mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-10">
          <div className="home-hero-preview__content mx-auto flex max-w-3xl flex-col items-center">
            <h1 className="home-hero-preview__title text-balance">
              Run every shipment from
              <span>one connected workspace</span>
            </h1>
            <p className="home-hero-preview__description text-balance">
              WiseShips CRM helps freight forwarders and origin-inspection teams
              track containers, coordinate operations, manage clients, and move
              deals forward.
            </p>
            <div className="home-hero-preview__actions">
              <CutButton variant="solid" href="#">
                Book a demo
              </CutButton>
              <CutButton variant="outline" href="#">
                Talk to our team
              </CutButton>
            </div>
          </div>
        </div>
      </section>

      <section className="home-hero-preview__dashboard" aria-label="Dashboard preview">
        <div className="home-hero-preview__dashboard-bar">
          WiseShips CRM · Demo workspace · Sample data
        </div>
        <div className="home-hero-preview__dashboard-body">
          <aside className="home-hero-preview__sidebar">◆ &nbsp; WiseShips</aside>
          <div className="home-hero-preview__dashboard-content">
            <div className="home-hero-preview__dashboard-title">
              Operations Overview
            </div>
            <div className="home-hero-preview__stats">
              <div className="home-hero-preview__stat">
                Containers in transit
                <strong>24</strong>
              </div>
              <div className="home-hero-preview__stat">
                Inspections due
                <strong>08</strong>
              </div>
              <div className="home-hero-preview__stat">
                Active clients
                <strong>18</strong>
              </div>
              <div className="home-hero-preview__stat">
                Open deals
                <strong>06</strong>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
