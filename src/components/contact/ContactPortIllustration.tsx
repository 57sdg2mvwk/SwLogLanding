import React, { useRef } from 'react';
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from 'motion/react';

export function ContactPortIllustration() {
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
        <span>CENTRO OPERATIVO · MÉXICO</span>
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
