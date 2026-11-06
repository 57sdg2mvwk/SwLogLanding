export type DimensionUnit = 'cm' | 'in';
export type WeightUnit = 'kg' | 'lb';

export interface FreightPackageLine {
  id: string;
  quantity: string;
  length: string;
  width: string;
  height: string;
  weightPerPiece: string;
}

export interface FreightCalculation {
  totalCbm: number;
  grossWeightKg: number;
  volumetricWeightKg: number;
  chargeableWeightKg: number;
  totalPieces: number;
}

function positiveNumber(value: string) {
  const normalized = value.trim();
  if (!/^(?:\d+(?:\.\d+)?|\.\d+)$/.test(normalized)) return null;
  const number = Number(normalized);
  return Number.isFinite(number) && number > 0 ? number : null;
}

export function sanitizeNumericInput(value: string, allowDecimal = true) {
  const normalized = value.replace(/,/g, '.');
  const valid = allowDecimal
    ? /^\d*(?:\.\d*)?$/.test(normalized)
    : /^\d*$/.test(normalized);
  return valid ? normalized : null;
}

export function isFreightLineComplete(line: FreightPackageLine) {
  const quantity = positiveNumber(line.quantity);
  const length = positiveNumber(line.length);
  const width = positiveNumber(line.width);
  const height = positiveNumber(line.height);
  const weight = positiveNumber(line.weightPerPiece);

  return Boolean(
    quantity &&
      Number.isInteger(quantity) &&
      length &&
      width &&
      height &&
      weight,
  );
}

export function calculateFreightTotals(
  lines: FreightPackageLine[],
  dimensionUnit: DimensionUnit,
  weightUnit: WeightUnit,
  volumetricFactorCm3PerKg: number,
): FreightCalculation | null {
  if (
    !lines.length ||
    !Number.isFinite(volumetricFactorCm3PerKg) ||
    volumetricFactorCm3PerKg <= 0 ||
    !lines.every(isFreightLineComplete)
  ) {
    return null;
  }

  const dimensionMultiplier = dimensionUnit === 'in' ? 2.54 : 1;
  const weightMultiplier = weightUnit === 'lb' ? 0.45359237 : 1;

  let totalCubicCentimeters = 0;
  let grossWeightKg = 0;
  let totalPieces = 0;

  for (const line of lines) {
    const quantity = Number(line.quantity);
    const lengthCm = Number(line.length) * dimensionMultiplier;
    const widthCm = Number(line.width) * dimensionMultiplier;
    const heightCm = Number(line.height) * dimensionMultiplier;
    const weightKg = Number(line.weightPerPiece) * weightMultiplier;

    totalCubicCentimeters += lengthCm * widthCm * heightCm * quantity;
    grossWeightKg += weightKg * quantity;
    totalPieces += quantity;
  }

  const totalCbm = totalCubicCentimeters / 1_000_000;
  const volumetricWeightKg = totalCubicCentimeters / volumetricFactorCm3PerKg;

  return {
    totalCbm,
    grossWeightKg,
    volumetricWeightKg,
    chargeableWeightKg: Math.max(grossWeightKg, volumetricWeightKg),
    totalPieces,
  };
}
