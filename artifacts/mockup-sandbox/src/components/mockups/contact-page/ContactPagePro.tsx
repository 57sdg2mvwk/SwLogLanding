import React, { useRef } from 'react';
import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from 'framer-motion';
import {
  ArrowDown,
  ArrowUpRight,
  Clock3,
  Mail,
  MessageCircle,
  MoveUpRight,
  Ship,
  Waypoints,
} from 'lucide-react';
import './_group.css';

const whatsappMessage =
  'Hola, me gustaría agendar una reunión para conocer cómo usar el CRM de WiseShips.';
const whatsappHref = `https://wa.me/525653848838?text=${encodeURIComponent(whatsappMessage)}`;

const ease = [0.22, 1, 0.36, 1] as const;

function PortIllustration() {
  const sceneRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const springX = useSpring(pointerX, { stiffness: 90, damping: 22, mass: 0.8 });
  const springY = useSpring(pointerY, { stiffness: 90, damping: 22, mass: 0.8 });
  const rotateY = useTransform(springX, [-0.5, 0.5], [-5, 5]);
  const rotateX = useTransform(springY, [-0.5, 0.5], [4, -4]);
  const farX = useTransform(springX, [-0.5, 0.5], [10, -10]);
  const nearX = useTransform(springX, [-0.5, 0.5], [-14, 14]);

  function handlePointerMove(event: React.PointerEvent<HTMLDivElement>) {
    if (reduceMotion || event.pointerType === 'touch' || !sceneRef.current) return;
    const rect = sceneRef.current.getBoundingClientRect();
    pointerX.set((event.clientX - rect.left) / rect.width - 0.5);
    pointerY.set((event.clientY - rect.top) / rect.height - 0.5);
  }

  function resetPointer() {
    pointerX.set(0);
    pointerY.set(0);
  }

  return (
    <div
      ref={sceneRef}
      className="ws-port"
      onPointerMove={handlePointerMove}
      onPointerLeave={resetPointer}
      aria-label="Ilustración tridimensional de un buque de carga junto a una terminal portuaria"
      role="img"
    >
      <div className="ws-port-grid" aria-hidden="true" />
      <div className="ws-port-index">
        <span>OPERACIONES CONECTADAS</span>
        <span>19° 25′ N · 99° 08′ W</span>
      </div>
      <motion.div
        className="ws-scene"
        style={reduceMotion ? undefined : { rotateX, rotateY }}
      >
        <motion.div className="ws-back-crane" style={reduceMotion ? undefined : { x: farX }} aria-hidden="true">
          <svg viewBox="0 0 420 260" fill="none">
            <path d="M48 232 92 73h17l40 159M78 121h54M93 76h202M112 83l96 43 91-43M291 77v112M278 189h26" stroke="currentColor" strokeWidth="3" />
            <path d="M197 122v55h27v-55M186 177h49M208 176v20" stroke="currentColor" strokeWidth="2" />
            <path d="M67 231h290M150 231l-12 12m68-12-12 12m68-12-12 12m68-12-12 12" stroke="currentColor" strokeWidth="2" />
            <path d="M108 106h166" stroke="currentColor" strokeWidth="1" strokeDasharray="3 5" />
          </svg>
        </motion.div>

        <div className="ws-horizon" aria-hidden="true" />
        <motion.div className="ws-container-stack ws-stack-back" style={reduceMotion ? undefined : { x: farX }} aria-hidden="true">
          <span className="ws-box ws-box-sand"><i /><i /><i /><i /></span>
          <span className="ws-box ws-box-blue"><i /><i /><i /><i /></span>
          <span className="ws-box ws-box-ink"><i /><i /><i /><i /></span>
        </motion.div>
        <motion.div className="ws-ship" style={reduceMotion ? undefined : { x: nearX }} aria-hidden="true">
          <div className="ws-ship-deck">
            <span className="ws-box ws-box-blue"><i /><i /><i /><i /></span>
            <span className="ws-box ws-box-ochre"><i /><i /><i /><i /></span>
            <span className="ws-box ws-box-sand"><i /><i /><i /><i /></span>
            <span className="ws-box ws-box-ink"><i /><i /><i /><i /></span>
            <span className="ws-bridge"><b /><b /><b /></span>
          </div>
          <div className="ws-hull"><span>W S</span></div>
          <div className="ws-hull-shadow" />
        </motion.div>
        <div className="ws-water" aria-hidden="true">
          <i /><i /><i /><i /><i /><i />
        </div>
        <motion.div className="ws-front-crane" style={reduceMotion ? undefined : { x: nearX }} aria-hidden="true">
          <svg viewBox="0 0 270 250" fill="none">
            <path d="M58 230 83 32h14l35 198M75 84h49M84 37h152M96 44l65 34 72-34M236 39v140M224 179h25M163 78v81h22V78M153 159h43M174 159v24" stroke="currentColor" strokeWidth="3" />
            <path d="M45 230h205M104 229l-13 13m62-13-13 13m62-13-13 13" stroke="currentColor" strokeWidth="2" />
          </svg>
        </motion.div>
        <div className="ws-port-stamp" aria-hidden="true">
          <span>WS</span>
          <span>01 / 03</span>
        </div>
      </motion.div>
      <div className="ws-port-caption">
        <span><span className="ws-caption-dot" /> UN SOLO REGISTRO · CADA TRASPASO</span>
        <span>WISESHIPS CRM</span>
      </div>
    </div>
  );
}

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
  return (
    <div className="ws-contact">
      <style>{`
        .ws-contact {
          --ws-ink: #171d25;
          --ws-muted: #68727d;
          --ws-line: #d8dee4;
          --ws-blue: #2f80ff;
          --ws-paper: #f5f7f8;
          --ws-white: #fbfcfc;
          color: var(--ws-ink);
          background: var(--ws-white);
          min-height: 100dvh;
          overflow: hidden;
          font-family: "Geist", sans-serif;
          position: relative;
        }
        .ws-contact * { box-sizing: border-box; }
        .ws-contact a { color: inherit; text-decoration: none; }
        .ws-contact button, .ws-contact a { -webkit-tap-highlight-color: transparent; }
        .ws-contact a:focus-visible { outline: 2px solid var(--ws-blue); outline-offset: 4px; }
        .ws-topbar {
          align-items: center; border-bottom: 1px solid var(--ws-line); display: flex;
          height: 72px; justify-content: space-between; margin: 0 auto; max-width: 1440px;
          padding: 0 5.1%;
        }
        .ws-brand { align-items: center; display: flex; gap: 11px; }
        .ws-brand-mark { align-items: center; background: var(--ws-ink); color: white; display: flex; height: 31px; justify-content: center; width: 31px; }
        .ws-brand-mark svg { width: 18px; }
        .ws-brand-name { font-size: 15px; font-weight: 650; letter-spacing: -.045em; }
        .ws-brand-name span { color: var(--ws-blue); }
        .ws-topnav { align-items: center; display: flex; gap: 31px; }
        .ws-topnav-label, .ws-topnav-action { font-family: "Geist Mono", monospace; font-size: 10px; letter-spacing: .1em; text-transform: uppercase; }
        .ws-topnav-label { color: var(--ws-muted); }
        .ws-topnav-action { align-items: center; border-left: 1px solid var(--ws-line); color: var(--ws-ink); display: flex; gap: 8px; padding-left: 20px; transition: color .2s; }
        .ws-topnav-action:hover { color: var(--ws-blue); }
        .ws-topnav-action svg { color: var(--ws-blue); }
        .ws-hero {
          display: grid; gap: 20px; grid-template-columns: 1fr 1fr; margin: 0 auto; max-width: 1440px;
          min-height: 610px; padding: 70px 5.1% 65px; position: relative; align-items: center;
        }
        .ws-hero::before {
          background-image: linear-gradient(to right, rgba(36,55,71,.055) 1px, transparent 1px), linear-gradient(to bottom, rgba(36,55,71,.055) 1px, transparent 1px);
          background-size: 48px 48px; content: ""; height: 100%; left: 0; mask-image: linear-gradient(90deg, black, transparent 88%);
          pointer-events: none; position: absolute; top: 0; width: 56%;
        }
        .ws-hero-copy { max-width: 610px; padding: 0 0 8px 3.8%; position: relative; z-index: 2; }
        .ws-eyebrow { align-items: center; color: var(--ws-muted); display: flex; font-family: "Geist Mono", monospace; font-size: 10px; gap: 10px; letter-spacing: .13em; text-transform: uppercase; }
        .ws-eyebrow-mark { background: var(--ws-blue); height: 7px; width: 7px; }
        .ws-hero h1 { font-family: "Source Serif 4", Georgia, serif; font-size: clamp(45px, 5.1vw, 72px); font-weight: 400; letter-spacing: -.055em; line-height: .99; margin: 27px 0 22px; max-width: 610px; }
        .ws-hero h1 em { color: var(--ws-blue); font-weight: 400; }
        .ws-lede { color: #5c6671; font-size: 15px; line-height: 1.85; margin: 0; max-width: 480px; }
        .ws-hero-actions { display: flex; flex-wrap: wrap; gap: 10px; margin-top: 32px; }
        .ws-button { align-items: center; display: inline-flex; font-size: 12px; font-weight: 600; gap: 10px; justify-content: center; min-height: 48px; padding: 0 17px; transition: background .2s, color .2s, transform .2s, border-color .2s; }
        .ws-button:hover { transform: translateY(-2px); }
        .ws-button-primary { background: var(--ws-ink); color: white !important; }
        .ws-button-primary:hover { background: #2a3541; }
        .ws-button-primary > svg:last-child { color: #84b4ff; }
        .ws-button-secondary { border: 1px solid #cbd2d9; background: rgba(251,252,252,.72); }
        .ws-button-secondary:hover { border-color: var(--ws-blue); }
        .ws-local-note { color: #7b858e; font-size: 11px; line-height: 1.6; margin: 15px 0 0; }
        .ws-hero-aside { color: #75808a; display: flex; font-family: "Geist Mono", monospace; font-size: 9px; gap: 16px; letter-spacing: .09em; margin-top: 48px; text-transform: uppercase; }
        .ws-hero-aside span + span { border-left: 1px solid var(--ws-line); padding-left: 16px; }
        .ws-scroll { align-items: center; border: 1px solid #cbd4da; bottom: 26px; color: #71808b !important; display: flex; height: 33px; justify-content: center; position: absolute; right: 5.1%; transition: color .2s, border-color .2s, transform .2s; width: 33px; z-index: 3; }
        .ws-scroll:hover { border-color: var(--ws-blue); color: var(--ws-blue) !important; transform: translateY(2px); }
        .ws-art-wrap { min-width: 0; position: relative; }
        .ws-art-wrap::before { border: 1px dashed #cfd6dc; content: ""; inset: 15px -16px -15px 16px; pointer-events: none; position: absolute; }
        .ws-port {
          background: #e9eff2; height: clamp(365px, 39vw, 500px); overflow: hidden; perspective: 1000px;
          position: relative; transform-style: preserve-3d; width: 100%;
        }
        .ws-port-grid { background-image: linear-gradient(rgba(54,76,93,.065) 1px, transparent 1px), linear-gradient(90deg, rgba(54,76,93,.065) 1px, transparent 1px); background-size: 35px 35px; inset: 0; mask-image: linear-gradient(to bottom, black 5%, transparent 82%); position: absolute; }
        .ws-port-index, .ws-port-caption { color: #66727d; display: flex; font-family: "Geist Mono", monospace; font-size: 8px; justify-content: space-between; left: 19px; letter-spacing: .12em; position: absolute; right: 19px; text-transform: uppercase; z-index: 5; }
        .ws-port-index { top: 18px; }
        .ws-port-caption { bottom: 15px; }
        .ws-scene { height: 100%; position: absolute; inset: 0; transform-style: preserve-3d; }
        .ws-back-crane { color: #9baab3; height: 59%; left: 22%; opacity: .8; position: absolute; top: 8%; transform: translateZ(-45px); width: 78%; }
        .ws-back-crane svg, .ws-front-crane svg { height: 100%; overflow: visible; width: 100%; }
        .ws-horizon { background: linear-gradient(90deg, transparent, rgba(86,119,139,.35), transparent); height: 1px; left: 0; position: absolute; right: 0; top: 58%; }
        .ws-container-stack { display: flex; gap: 3px; position: absolute; transform-style: preserve-3d; }
        .ws-stack-back { right: 6%; top: 38%; transform: translateZ(-30px) scale(.82); }
        .ws-box { border: 1px solid rgba(26,48,65,.28); display: flex; height: 62px; overflow: hidden; position: relative; width: 57px; }
        .ws-box::after { background: repeating-linear-gradient(90deg, transparent 0 9px, rgba(23,38,50,.19) 9px 10px); content: ""; inset: 0; position: absolute; }
        .ws-box i { border-right: 1px solid rgba(255,255,255,.14); width: 25%; }
        .ws-box-blue { background: linear-gradient(135deg, #467c9a, #28516b); }
        .ws-box-sand { background: linear-gradient(135deg, #d6c8ac, #b5a17e); }
        .ws-box-ink { background: linear-gradient(135deg, #52616b, #35434d); }
        .ws-box-ochre { background: linear-gradient(135deg, #c18d52, #9c6939); }
        .ws-ship { bottom: 19%; height: 175px; left: 12%; position: absolute; transform-style: preserve-3d; width: 76%; }
        .ws-ship-deck { align-items: flex-end; bottom: 70px; display: flex; gap: 2px; left: 14%; position: absolute; transform: translateZ(20px); }
        .ws-ship-deck .ws-box { height: 52px; width: 58px; }
        .ws-ship-deck .ws-box:nth-child(2), .ws-ship-deck .ws-box:nth-child(4) { height: 44px; }
        .ws-bridge { align-items: flex-end; background: #eef0eb; border: 1px solid #aeb9bd; display: flex; gap: 4px; height: 50px; justify-content: center; margin-left: 3px; padding: 8px 6px; width: 42px; }
        .ws-bridge b { background: #70899a; height: 12px; width: 6px; }
        .ws-hull { background: linear-gradient(180deg, #3f5361 0%, #293944 80%); clip-path: polygon(0 0, 100% 0, 91% 65%, 82% 100%, 10% 100%); height: 74px; left: 0; position: absolute; right: 0; top: 107px; }
        .ws-hull::before { background: #a75b47; content: ""; height: 8px; left: 0; position: absolute; right: 0; top: 0; }
        .ws-hull span { bottom: 13px; color: #e5ecef; font-family: "Geist Mono", monospace; font-size: 8px; left: 49%; letter-spacing: .3em; position: absolute; }
        .ws-hull-shadow { background: rgba(43,62,75,.2); border-radius: 50%; filter: blur(12px); height: 18px; left: 7%; position: absolute; right: 3%; top: 176px; }
        .ws-water { background: repeating-linear-gradient(176deg, transparent 0 15px, rgba(75,119,145,.11) 16px 17px, transparent 18px 27px); bottom: 10%; height: 24%; left: 0; position: absolute; right: 0; transform: translateZ(10px); }
        .ws-water i { background: rgba(47,128,255,.3); height: 1px; position: absolute; width: 35px; }
        .ws-water i:nth-child(1) { left: 6%; top: 34%; width: 45px; }
        .ws-water i:nth-child(2) { left: 20%; top: 67%; width: 29px; }
        .ws-water i:nth-child(3) { left: 64%; top: 30%; width: 53px; }
        .ws-water i:nth-child(4) { left: 79%; top: 72%; width: 37px; }
        .ws-water i:nth-child(5) { left: 42%; top: 80%; width: 22px; }
        .ws-water i:nth-child(6) { left: 91%; top: 19%; width: 26px; }
        .ws-front-crane { bottom: 12%; color: #344d5d; height: 59%; left: -2%; opacity: .8; position: absolute; transform: translateZ(55px); width: 49%; }
        .ws-port-stamp { align-items: center; background: var(--ws-blue); color: white; display: flex; flex-direction: column; font-family: "Geist Mono", monospace; font-size: 8px; gap: 5px; height: 55px; justify-content: center; position: absolute; right: 17px; top: 64px; transform: translateZ(80px); width: 54px; }
        .ws-port-stamp span:first-child { font-family: "Geist", sans-serif; font-size: 18px; font-weight: 700; letter-spacing: -.08em; }
        .ws-caption-dot { background: var(--ws-blue); display: inline-block; height: 6px; margin-right: 7px; width: 6px; }
        .ws-band { background: var(--ws-paper); border-bottom: 1px solid var(--ws-line); border-top: 1px solid var(--ws-line); }
        .ws-band-inner { align-items: center; display: grid; gap: 24px; grid-template-columns: 1.07fr 1fr; margin: 0 auto; max-width: 1440px; padding: 29px 8.9%; }
        .ws-band-intro { align-items: center; display: flex; gap: 16px; }
        .ws-band-icon { align-items: center; border: 1px solid #cad5dd; color: var(--ws-blue); display: flex; flex: 0 0 43px; height: 43px; justify-content: center; }
        .ws-band-intro strong { display: block; font-family: "Source Serif 4", Georgia, serif; font-size: 20px; font-weight: 400; letter-spacing: -.025em; }
        .ws-band-intro span { color: var(--ws-muted); display: block; font-size: 11px; margin-top: 4px; }
        .ws-band-steps { border-left: 1px solid var(--ws-line); display: flex; justify-content: space-between; padding-left: 30px; }
        .ws-band-steps span { color: #66717b; font-family: "Geist Mono", monospace; font-size: 9px; letter-spacing: .04em; text-transform: uppercase; }
        .ws-band-steps b { color: var(--ws-blue); font-weight: 500; margin-right: 7px; }
        .ws-contact-section { margin: 0 auto; max-width: 1440px; padding: 78px 8.9% 88px; }
        .ws-contact-heading { align-items: end; display: flex; justify-content: space-between; margin-bottom: 29px; }
        .ws-contact-heading .ws-eyebrow { margin-bottom: 12px; }
        .ws-contact-heading h2 { font-family: "Source Serif 4", Georgia, serif; font-size: clamp(31px, 3.2vw, 43px); font-weight: 400; letter-spacing: -.045em; line-height: 1.08; margin: 0; }
        .ws-contact-heading p { color: var(--ws-muted); font-size: 12px; line-height: 1.7; margin: 0 0 3px; max-width: 290px; }
        .ws-channel-list { border-top: 1px solid var(--ws-line); }
        .ws-channel { align-items: center; border-bottom: 1px solid var(--ws-line); display: grid; gap: 18px; grid-template-columns: 37px 46px 1fr 20px; min-height: 112px; padding: 18px 11px; transition: background .22s, padding .22s; }
        .ws-channel:hover { background: #f7f9fa; padding-left: 17px; padding-right: 17px; }
        .ws-channel-num { align-self: start; color: #87919a; font-family: "Geist Mono", monospace; font-size: 10px; padding-top: 6px; }
        .ws-channel-icon { align-items: center; border: 1px solid #d5dce1; color: var(--ws-blue); display: flex; height: 43px; justify-content: center; width: 43px; }
        .ws-channel-copy { display: flex; flex-direction: column; gap: 4px; }
        .ws-channel-label { color: #68737d; font-family: "Geist Mono", monospace; font-size: 9px; letter-spacing: .12em; text-transform: uppercase; }
        .ws-channel-copy strong { font-size: 16px; font-weight: 600; letter-spacing: -.025em; }
        .ws-channel-detail { color: #79838c; font-size: 11px; }
        .ws-channel-arrow { color: #86919b; transition: color .2s, transform .2s; }
        .ws-channel:hover .ws-channel-arrow { color: var(--ws-blue); transform: translate(2px, -2px); }
        .ws-hours { align-items: start; background: #f1f4f5; border: 1px solid #e1e6e9; display: flex; gap: 18px; margin-top: 27px; padding: 22px 24px; }
        .ws-hours-icon { color: var(--ws-blue); margin-top: 2px; }
        .ws-hours-content { display: flex; flex: 1; flex-wrap: wrap; gap: 12px 30px; justify-content: space-between; }
        .ws-hours-label { color: #68737d; display: block; font-family: "Geist Mono", monospace; font-size: 9px; letter-spacing: .12em; text-transform: uppercase; }
        .ws-hours strong { display: block; font-size: 13px; font-weight: 600; margin-top: 7px; }
        .ws-hours-timezone { align-self: end; color: #74808a; font-family: "Geist Mono", monospace; font-size: 10px; }
        .ws-footer { align-items: center; border-top: 1px solid var(--ws-line); color: #7a858e; display: flex; font-family: "Geist Mono", monospace; font-size: 9px; justify-content: space-between; letter-spacing: .09em; margin: 0 auto; max-width: 1440px; padding: 23px 5.1%; text-transform: uppercase; }
        .ws-footer strong { color: #4c5963; font-weight: 500; }
        .ws-footer-link { align-items: center; color: #4c5963 !important; display: flex; gap: 7px; transition: color .2s; }
        .ws-footer-link:hover { color: var(--ws-blue) !important; }
        @media (min-width: 1500px) { .ws-hero { min-height: 670px; } }
        @media (max-width: 900px) {
          .ws-hero { gap: 26px; grid-template-columns: 1fr; padding: 62px 7% 54px; }
          .ws-hero-copy { max-width: 680px; padding-left: 0; }
          .ws-hero h1 { max-width: 680px; }
          .ws-art-wrap { margin: 12px 14px 0; }
          .ws-port { height: min(64vw, 470px); min-height: 330px; }
          .ws-band-inner { padding: 24px 7%; }
          .ws-contact-section { padding: 65px 7% 72px; }
        }
        @media (max-width: 600px) {
          .ws-topbar { height: 62px; padding: 0 20px; }
          .ws-topnav { gap: 0; }
          .ws-topnav-label { display: none; }
          .ws-topnav-action { padding-left: 0; border-left: 0; }
          .ws-hero { gap: 30px; padding: 49px 21px 43px; }
          .ws-hero h1 { font-size: clamp(44px, 12.6vw, 58px); margin-top: 24px; }
          .ws-lede { font-size: 14px; line-height: 1.78; }
          .ws-hero-actions { display: grid; grid-template-columns: 1fr; margin-top: 25px; }
          .ws-button { width: 100%; }
          .ws-hero-aside { font-size: 8px; gap: 10px; margin-top: 30px; }
          .ws-hero-aside span + span { padding-left: 10px; }
          .ws-scroll { bottom: 17px; right: 21px; }
          .ws-art-wrap { margin: 0 8px 0 4px; }
          .ws-art-wrap::before { inset: 9px -9px -9px 9px; }
          .ws-port { height: 320px; min-height: 0; }
          .ws-port-index, .ws-port-caption { font-size: 7px; left: 12px; right: 12px; }
          .ws-port-index { top: 13px; }
          .ws-port-caption { bottom: 12px; }
          .ws-back-crane { left: 13%; top: 11%; width: 88%; }
          .ws-front-crane { height: 55%; left: -9%; width: 52%; }
          .ws-ship { bottom: 18%; height: 145px; left: 7%; width: 86%; }
          .ws-ship-deck { bottom: 57px; left: 9%; }
          .ws-ship-deck .ws-box { height: 44px; width: 42px; }
          .ws-ship-deck .ws-box:nth-child(2), .ws-ship-deck .ws-box:nth-child(4) { height: 38px; }
          .ws-hull { height: 62px; top: 92px; }
          .ws-hull-shadow { top: 150px; }
          .ws-box { height: 50px; width: 44px; }
          .ws-stack-back { right: -2%; top: 38%; transform: translateZ(-30px) scale(.7); }
          .ws-port-stamp { height: 47px; right: 12px; top: 52px; width: 46px; }
          .ws-band-inner { align-items: start; gap: 19px; grid-template-columns: 1fr; padding: 23px 21px; }
          .ws-band-intro strong { font-size: 18px; }
          .ws-band-steps { border-left: 0; border-top: 1px solid var(--ws-line); flex-wrap: wrap; gap: 13px 19px; padding: 17px 0 0; }
          .ws-band-steps span { font-size: 8px; }
          .ws-contact-section { padding: 52px 21px 59px; }
          .ws-contact-heading { align-items: start; flex-direction: column; gap: 13px; margin-bottom: 22px; }
          .ws-contact-heading h2 { font-size: 35px; }
          .ws-contact-heading p { max-width: 340px; }
          .ws-channel { gap: 11px; grid-template-columns: 20px 39px 1fr 16px; min-height: 102px; padding: 16px 2px; }
          .ws-channel:hover { padding-left: 6px; padding-right: 6px; }
          .ws-channel-icon { height: 37px; width: 37px; }
          .ws-channel-copy strong { font-size: 14px; overflow-wrap: anywhere; }
          .ws-channel-detail { font-size: 10px; line-height: 1.5; }
          .ws-hours { gap: 12px; padding: 18px 15px; }
          .ws-hours-content { gap: 12px; }
          .ws-hours strong { font-size: 12px; line-height: 1.5; }
          .ws-hours-timezone { font-size: 9px; }
          .ws-footer { align-items: start; flex-direction: column; gap: 12px; padding: 19px 21px; }
        }
        @media (prefers-reduced-motion: reduce) {
          .ws-contact *, .ws-contact *::before, .ws-contact *::after {
            animation-duration: .01ms !important;
            animation-iteration-count: 1 !important;
            scroll-behavior: auto !important;
            transition-duration: .01ms !important;
          }
        }
      `}</style>

      <header className="ws-topbar">
        <div className="ws-brand" aria-label="WiseShips">
          <span className="ws-brand-mark"><Ship aria-hidden="true" strokeWidth={1.7} /></span>
          <span className="ws-brand-name">wise<span>ships</span></span>
        </div>
        <nav className="ws-topnav" aria-label="Navegación de contacto">
          <span className="ws-topnav-label">CRM para operaciones de carga</span>
          <a className="ws-topnav-action" href={whatsappHref} target="_blank" rel="noreferrer">
            Hablemos <ArrowUpRight size={13} aria-hidden="true" />
          </a>
        </nav>
      </header>

      <main>
        <section className="ws-hero" aria-labelledby="ws-contact-title">
          <motion.div
            className="ws-hero-copy"
            initial={reduceMotion ? false : { opacity: 0, y: 18 }}
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
            <PortIllustration />
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
            initial={false}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: reduceMotion ? 0 : 0.55, delay: 0.18, ease }}
          >
            <div>
              <div className="ws-eyebrow"><span className="ws-eyebrow-mark" /> LÍNEAS DIRECTAS</div>
              <h2 id="ws-channels-title">Estamos para escucharte.</h2>
            </div>
            <p>Elige el canal que mejor le funcione a tu equipo. Nuestro horario está en tiempo de Ciudad de México.</p>
          </motion.div>
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
          <div className="ws-hours">
            <Clock3 className="ws-hours-icon" size={19} strokeWidth={1.6} aria-hidden="true" />
            <div className="ws-hours-content">
              <div>
                <span className="ws-hours-label">Horario de atención</span>
                <strong>Lunes a viernes, 9:00 a. m.–6:00 p. m.</strong>
              </div>
              <span className="ws-hours-timezone">Zona horaria: America/Mexico_City</span>
            </div>
          </div>
        </section>
      </main>

      <footer className="ws-footer">
        <span><strong>WiseShips</strong> · Operaciones en sintonía, desde el primer contacto</span>
        <a className="ws-footer-link" href="mailto:support@wiseships.com">support@wiseships.com <ArrowUpRight size={12} aria-hidden="true" /></a>
      </footer>
    </div>
  );
}
