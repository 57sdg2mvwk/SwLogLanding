import { motion } from 'motion/react';

type RotatingContainerProps = {
  reduceMotion: boolean | null;
};

export function RotatingContainer({ reduceMotion }: RotatingContainerProps) {
  return (
    <div
      className="shipment-container-3d-stage absolute inset-x-[6%] top-0 bottom-[27px] z-10 flex items-center justify-center overflow-hidden"
      aria-hidden="true"
    >
      <div className="shipment-container-3d-scale">
        <div className="shipment-container-3d-shadow" />
        <motion.div
          className="shipment-container-3d-shell"
          style={{ transformStyle: 'preserve-3d', transformOrigin: '50% 50%' }}
          animate={
            reduceMotion
              ? { rotateX: -10, rotateY: -30, y: -5 }
              : { rotateX: [-12, -8, -12], rotateY: [-30, 330], y: [-5, -7, -5] }
          }
          transition={
            reduceMotion
              ? undefined
              : {
                  rotateY: { duration: 18, repeat: Infinity, ease: 'linear' },
                  rotateX: { duration: 8, repeat: Infinity, ease: 'easeInOut' },
                  y: { duration: 4.5, repeat: Infinity, ease: 'easeInOut' },
                }
          }
          whileHover={reduceMotion ? undefined : { scale: 1.035 }}
        >
          <div className="shipment-container-face shipment-container-face-front">
            <span className="absolute left-3 top-2 font-mono text-[6px] tracking-[0.16em] text-white/50">
              WSHU 482910–6
            </span>
            <span className="absolute bottom-2 left-3 h-1 w-9 bg-[#2f80ff]" />
            <span className="shipment-container-scan" />
          </div>
          <div className="shipment-container-face shipment-container-face-back">
            <span className="absolute left-3 top-2 font-mono text-[6px] tracking-[0.16em] text-white/40">
              WISESHIPS · 40 HC
            </span>
            <span className="shipment-container-scan" />
          </div>
          <div className="shipment-container-face shipment-container-face-side shipment-container-face-right">
            <span className="absolute inset-x-0 top-2 text-center font-mono text-[5px] tracking-widest text-white/40">
              WS
            </span>
          </div>
          <div className="shipment-container-face shipment-container-face-side shipment-container-face-left" />
          <div className="shipment-container-face shipment-container-face-top" />
          <div className="shipment-container-face shipment-container-face-bottom" />
        </motion.div>
      </div>
    </div>
  );
}
