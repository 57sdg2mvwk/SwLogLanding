import React from 'react';
import { ArrowUpRight, Clock3, Mail, MessageCircle, Ship } from 'lucide-react';
import './_group.css';

const whatsappMessage =
  'Hola, me gustaría agendar una reunión para conocer cómo usar el CRM de WiseShips.';
const whatsappHref = `https://wa.me/525653848838?text=${encodeURIComponent(whatsappMessage)}`;

const clippedCard: React.CSSProperties = {
  clipPath: 'polygon(0 0, calc(100% - 30px) 0, 100% 30px, 100% 100%, 0 100%)',
};

export function Current() {
  return (
    <div className="relative flex min-h-screen flex-col overflow-hidden bg-background text-foreground antialiased">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-35"
        style={{
          backgroundImage:
            'linear-gradient(to right, hsl(var(--border)) 1px, transparent 1px), linear-gradient(to bottom, hsl(var(--border)) 1px, transparent 1px)',
          backgroundSize: '72px 72px',
          maskImage: 'linear-gradient(to bottom, black, transparent 78%)',
        }}
      />
      <div className="h-16 shrink-0" aria-hidden="true" />

      <main id="main-content" className="relative mx-auto grid w-full max-w-[1180px] flex-1 content-center gap-12 px-5 py-14 sm:px-8 sm:py-20 lg:grid-cols-[1fr_0.82fr] lg:items-center lg:gap-20 lg:py-28">
        <section aria-labelledby="contact-title" className="max-w-2xl">
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-[#2f80ff]" aria-hidden="true" />
            <p className="font-mono text-[11px] font-medium uppercase tracking-[0.16em] text-muted-foreground">
              Atención WiseShips
            </p>
          </div>
          <h1 id="contact-title" className="mt-5 text-balance font-serif text-4xl font-normal leading-[1.1] tracking-tight sm:text-5xl lg:text-[3.65rem]">
            Hablemos de cómo trabaja tu equipo.
          </h1>
          <p className="mt-5 max-w-xl text-sm leading-7 text-muted-foreground sm:text-base">
            Conoce cómo WiseShips CRM ayuda a freight forwarders y empresas de inspección en origen a mantener embarques, reportes y clientes en sintonía.
          </p>

          <div className="mt-9 flex flex-col items-start gap-3 sm:flex-row">
            <a
              href={whatsappHref}
              target="_blank"
              rel="noreferrer"
              className="focus-ring group inline-flex min-h-12 w-full items-center justify-center gap-2.5 bg-foreground px-5 text-sm font-semibold text-background transition-transform duration-200 hover:-translate-y-0.5 sm:w-auto"
              style={{ clipPath: 'polygon(0 0, calc(100% - 14px) 0, 100% 14px, 100% 100%, 0 100%)' }}
            >
              <MessageCircle className="h-4 w-4" aria-hidden="true" />
              Agendar una reunión
              <ArrowUpRight className="h-4 w-4 opacity-70 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden="true" />
            </a>
            <a
              href="mailto:support@wiseships.com"
              className="focus-ring inline-flex min-h-12 w-full items-center justify-center gap-2.5 border border-border bg-background px-5 text-sm font-medium transition-colors hover:bg-muted sm:w-auto"
            >
              <Mail className="h-4 w-4 text-muted-foreground" aria-hidden="true" />
              Escribir a soporte
            </a>
          </div>
          <p className="mt-4 text-xs leading-5 text-muted-foreground">
            Te atenderá nuestro equipo en horario laboral de Ciudad de México.
          </p>
        </section>

        <aside aria-label="Canales de contacto y horario" className="relative">
          <div className="absolute -inset-4 -z-10 border border-dashed border-border/70" aria-hidden="true" />
          <div className="bg-border p-px" style={clippedCard}>
            <div className="bg-background p-6 sm:p-8" style={clippedCard}>
              <div className="flex items-center justify-between border-b border-border/70 pb-5">
                <div className="flex items-center gap-3">
                  <span className="flex h-10 w-10 items-center justify-center border border-border bg-muted/50">
                    <Ship className="h-5 w-5 text-[#2f80ff]" strokeWidth={1.6} aria-hidden="true" />
                  </span>
                  <div>
                    <p className="text-sm font-semibold tracking-tight">Equipo de soporte</p>
                    <p className="mt-0.5 text-xs text-muted-foreground">WiseShips · México</p>
                  </div>
                </div>
                <span className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
                  Atención comercial
                </span>
              </div>

              <dl className="divide-y divide-border/70">
                <div className="py-5">
                  <dt className="text-[11px] font-medium uppercase tracking-[0.12em] text-muted-foreground">WhatsApp</dt>
                  <dd className="mt-2">
                    <a href={whatsappHref} target="_blank" rel="noreferrer" className="focus-ring rounded-sm text-base font-semibold tracking-tight transition-colors hover:text-[#2f80ff]">
                      +52 56 5384 8838
                    </a>
                  </dd>
                </div>
                <div className="py-5">
                  <dt className="text-[11px] font-medium uppercase tracking-[0.12em] text-muted-foreground">Correo electrónico</dt>
                  <dd className="mt-2">
                    <a href="mailto:support@wiseships.com" className="focus-ring rounded-sm text-sm font-semibold tracking-tight transition-colors hover:text-[#2f80ff] sm:text-base">
                      support@wiseships.com
                    </a>
                  </dd>
                </div>
                <div className="flex items-start gap-3 py-5">
                  <Clock3 className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground" aria-hidden="true" />
                  <div>
                    <dt className="text-[11px] font-medium uppercase tracking-[0.12em] text-muted-foreground">Horario de atención</dt>
                    <dd className="mt-2 text-sm leading-6">
                      Lunes a viernes, 9:00 a. m.–6:00 p. m.
                      <span className="block text-xs text-muted-foreground">Zona horaria: America/Mexico_City</span>
                    </dd>
                  </div>
                </div>
              </dl>
            </div>
          </div>
          <p className="mt-4 text-right font-mono text-[10px] uppercase tracking-[0.14em] text-muted-foreground">
            Operaciones en sintonía, desde el primer contacto
          </p>
        </aside>
      </main>
    </div>
  );
}
