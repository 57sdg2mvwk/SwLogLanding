import type { CSSProperties, ComponentType } from 'react';

type FerrofluidProps = {
  colors?: string[];
  speed?: number;
  scale?: number;
  spikeHeight?: number;
  sharpness?: number;
  turbulence?: number;
  fluidity?: number;
  tilt?: number;
  magnetism?: number;
  brightness?: number;
  mouseInteraction?: boolean;
  mouseStrength?: number;
  mouseRadius?: number;
  clickPulse?: boolean;
  intro?: boolean;
  lightMode?: boolean;
  transparent?: boolean;
  color?: string;
  opacity?: number;
  dpr?: number;
  mixBlendMode?: CSSProperties['mixBlendMode'];
  className?: string;
  style?: CSSProperties;
};

declare const Ferrofluid: ComponentType<FerrofluidProps>;

export default Ferrofluid;
