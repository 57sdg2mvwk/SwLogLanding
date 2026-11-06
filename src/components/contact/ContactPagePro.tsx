import React, { lazy, Suspense } from 'react';
import {
  ArrowDown,
  ArrowUpRight,
  Clock3,
  Mail,
  MessageCircle,
  MoveUpRight,
  Waypoints,
} from 'lucide-react';
import { motion, useReducedMotion } from 'motion/react';
import { contactScene } from './contact-scene-data';
import './contact-page.css';

const ContainerLoadScene = lazy(() =>
  import('../ContainerLoadScene').then(({ ContainerLoadScene: Scene }) => ({ default: Scene })),
);

const whatsappMessage =
  'Hola, me gustaría agendar una reunión para conocer cómo usar el CRM de WiseShips.';
const whatsappHref = `https://wa.me/525653848838?text=${encodeURIComponent(whatsappMessage)}`;
const ease = [0.22, 1, 0.36, 1] as const;

function ContactChannel({
  number,
  icon,
  label,
  value,
  detail,
  href,
  external = false,
}: {
  number: string;
  icon: React.ReactNode;
  label: string;
  value: string;
  detail: string;
  href: string;
  external?: boolean;
}) {
  return (
    <a className="ws-channel" href={href} {...(external ? { target: '_blank', rel: 'noreferrer' } : {})}>
      <span className="ws-channel-num">{number}</span>
      <span className="ws-channel-icon">{icon}</span>
      <span className="ws-channel-copy">
        <span className="ws-channel-label">{label}</span>
        <strong>{value}</strong>
        <span className="ws-channel-detail">{detail}</span>
      </span>
      <MoveUpRight className="ws-channel-arrow" size={17} strokeWidth={1.6} aria-hidden="true" />
    </a>
  );
}

export function ContactPagePro() {
  const reduceMotion = useReducedMotion();
  const entrance = reduceMotion ? false : { opacity: 0, y: 18 };

  return (
    <div className="ws-contact">
      <div className="h-16" aria-hidden="true" />
      <main id="main-content">
        <section className="ws-hero" aria-labelledby="ws-contact-title">
          <motion.div
            className="ws-hero-copy"
            initial={entrance}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease }}
          >
            <div className="ws-eyebrow"><span className="ws-eyebrow-mark" /> ATENCIÓN WISESHIPS · MÉXICO</div>
            <h1 id="ws-contact-title">Las operaciones complejas empiezan con una <em>buena conversación.</em></h1>
            <p className="ws-lede">
              Cuéntanos cómo coordina tu equipo embarques, inspecciones en origen y clientes. Te mostraremos cómo mantener cada traspaso en sintonía con WiseShips CRM.
            </p>
            <div className="ws-hero-actions">
              <a className="ws-button ws-button-primary" href={whatsappHref} target="_blank" rel="noreferrer">
                <MessageCircle size={16} aria-hidden="true" />
                Agendar una reunión
                <ArrowUpRight size={15} aria-hidden="true" />
              </a>
              <a className="ws-button ws-button-secondary" href="mailto:support@wiseships.com">
                <Mail size={16} aria-hidden="true" />
                Escribir a soporte
              </a>
            </div>
            <p className="ws-local-note">Te atenderá nuestro equipo en horario laboral de Ciudad de México.</p>
            <div className="ws-hero-aside">
              <span>Freight forwarders</span><span>Inspección en origen</span>
            </div>
          </motion.div>

          <motion.div
            className="ws-art-wrap"
            initial={reduceMotion ? false : { opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease }}
          >
            <div className="ws-scene-card">
              <div className="ws-scene-heading">
                <span><span className="ws-status-dot" /> VISTA DE PLANIFICACIÓN</span>
                <span>01 / CARGA</span>
              </div>
              <div className="ws-scene-stage">
                <Suspense
                  fallback={
                    <div className="ws-scene-loading" role="status" aria-label="Preparando visualización 3D">
                      <span className="ws-scene-skeleton" />
                      <span>Preparando vista 3D</span>
                    </div>
                  }
                >
                  <ContainerLoadScene
                    container={contactScene.container}
                    placements={contactScene.placements}
                    visibleCount={contactScene.placements.length}
                    className="ws-load-scene"
                  />
                </Suspense>
              </div>
              <div className="ws-scene-meta">
                <span>Distribución de carga · ejemplo</span>
                <span>{contactScene.container.shortName}</span>
              </div>
            </div>
            <div className="ws-art-note">
              <span className="ws-art-note-mark"><Waypoints size={15} strokeWidth={1.7} aria-hidden="true" /></span>
              <span>Un mismo registro para cada traspaso operativo.</span>
            </div>
          </motion.div>
          <a href="#contact-channels" className="ws-scroll" aria-label="Ver canales de contacto">
            <ArrowDown size={15} aria-hidden="true" />
          </a>
        </section>

        <section className="ws-band" aria-label="Enfoque de WiseShips">
          <div className="ws-band-inner">
            <div className="ws-band-intro">
              <span className="ws-band-icon"><Waypoints size={20} strokeWidth={1.6} aria-hidden="true" /></span>
              <div>
                <strong>Cada equipo, en el mismo mapa.</strong>
                <span>Una conversación enfocada en tu operación real.</span>
              </div>
            </div>
            <div className="ws-band-steps" aria-label="Temas de conversación">
              <span><b>01</b> Embarques</span>
              <span><b>02</b> Inspecciones</span>
              <span><b>03</b> Handoffs</span>
            </div>
          </div>
        </section>

        <section className="ws-contact-section" id="contact-channels" aria-labelledby="ws-channels-title">
          <motion.div
            className="ws-contact-heading"
            initial={reduceMotion ? false : { opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.35 }}
            transition={{ duration: 0.55, delay: 0.08, ease }}
          >
            <div>
              <div className="ws-eyebrow"><span className="ws-eyebrow-mark" /> LÍNEAS DIRECTAS</div>
              <h2 id="ws-channels-title">Estamos para escucharte.</h2>
            </div>
            <p>Elige el canal que mejor le funcione a tu equipo. Nuestro horario está en tiempo de Ciudad de México.</p>
          </motion.div>
          <div className="ws-contact-layout">
            <div className="ws-channel-list">
              <ContactChannel
                number="01"
                icon={<MessageCircle size={19} strokeWidth={1.6} aria-hidden="true" />}
                label="WhatsApp"
                value="+52 56 5384 8838"
                detail="Coordina una reunión directamente con el equipo."
                href={whatsappHref}
                external
              />
              <ContactChannel
                number="02"
                icon={<Mail size={19} strokeWidth={1.6} aria-hidden="true" />}
                label="Correo electrónico"
                value="support@wiseships.com"
                detail="Escríbenos sobre soporte, producto o una primera conversación."
                href="mailto:support@wiseships.com"
              />
            </div>
            <aside className="ws-hours" aria-label="Horario de atención">
              <div className="ws-hours-top">
                <span className="ws-hours-icon"><Clock3 size={19} strokeWidth={1.6} aria-hidden="true" /></span>
                <span className="ws-hours-label">Horario de atención</span>
              </div>
              <strong>Lunes a viernes,<br />9:00 a. m.–6:00 p. m.</strong>
              <span className="ws-hours-timezone">Zona horaria<br /><b>America/Mexico_City</b></span>
              <span className="ws-hours-rule" aria-hidden="true" />
              <p>Te responderá una persona del equipo, en horario local.</p>
            </aside>
          </div>
        </section>
      </main>
    </div>
  );
}
