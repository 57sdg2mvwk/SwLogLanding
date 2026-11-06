import type { ComponentType } from 'react';

type ShapeWavesProps = {
  text?: string;
  fontFamily?: string;
  fontWeight?: number | string;
  textSize?: number;
  shapes?: string;
  cellSize?: number;
  dotSize?: number;
  color?: string;
  hoverColor?: string;
  backgroundColor?: string;
  speed?: number;
  scale?: number;
  contrast?: number;
  brightness?: number;
  flow?: number;
  direction?: number;
  fade?: number;
  interactive?: boolean;
  splashRadius?: number;
  splashStrength?: number;
  glow?: number;
  intro?: boolean;
  introDuration?: number;
  introKey?: string | number;
  paused?: boolean;
  onError: (error: Error) => void;
  className?: string;
};

declare const ShapeWaves: ComponentType<ShapeWavesProps>;

export default ShapeWaves;
