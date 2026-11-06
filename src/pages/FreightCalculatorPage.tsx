import React, { useMemo, useRef, useState } from 'react';
import {
  ArrowRight,
  Calculator,
  Info,
  PackagePlus,
  Plus,
  RotateCcw,
  Trash2,
} from 'lucide-react';
import { CutButton } from '../components/CutButton';
import { PageKicker, PageShell, clippedPanel } from './PagePrimitives';
import {
  calculateFreightTotals,
  isFreightLineComplete,
  sanitizeNumericInput,
  type DimensionUnit,
  type FreightPackageLine,
  type WeightUnit,
} from '../lib/freightCalculator';

const initialLine: FreightPackageLine = {
  id: 'line-1',
  quantity: '1',
  length: '',
  width: '',
  height: '',
  weightPerPiece: '',
};

type LineField = Exclude<keyof FreightPackageLine, 'id'>;

function formatNumber(value: number, maxDecimals = 2) {
  return new Intl.NumberFormat('es-MX', {
    maximumFractionDigits: maxDecimals,
  }).format(value);
}

function ResultMetric({
  label,
  value,
  unit,
  featured = false,
}: {
  label: string;
  value: string;
  unit: string;
  featured?: boolean;
}) {
  return (
    <div className={`border p-4 ${featured ? 'border-[#2f80ff]/40 bg-[#2f80ff]/[0.05]' : 'border-border'}`}>
      <p className="font-mono text-[10px] uppercase tracking-[0.13em] text-muted-foreground">
        {label}
      </p>
      <div className="mt-3 flex items-baseline gap-2">
        <span className={`text-2xl font-semibold tracking-tight ${featured ? 'text-[#2f80ff]' : ''}`}>
          {value}
        </span>
        <span className="text-xs text-muted-foreground">{unit}</span>
      </div>
    </div>
  );
}

export function FreightCalculatorPage() {
  const [lines, setLines] = useState<FreightPackageLine[]>([initialLine]);
  const [dimensionUnit, setDimensionUnit] = useState<DimensionUnit>('cm');
  const [weightUnit, setWeightUnit] = useState<WeightUnit>('kg');
  const [factor, setFactor] = useState('6000');
  const nextLineNumber = useRef(2);

  const factorValue = Number(factor);
  const factorIsValid = Number.isFinite(factorValue) && factorValue > 0;
  const allLinesComplete = lines.every(isFreightLineComplete);
  const calculation = useMemo(
    () =>
      allLinesComplete && factorIsValid
        ? calculateFreightTotals(lines, dimensionUnit, weightUnit, factorValue)
        : null,
    [allLinesComplete, dimensionUnit, factorIsValid, factorValue, lines, weightUnit],
  );

  const updateLine = (id: string, field: LineField, value: string) => {
    setLines((current) =>
      current.map((line) => (line.id === id ? { ...line, [field]: value } : line)),
    );
  };

  const addLine = () => {
    const id = `line-${nextLineNumber.current}`;
    nextLineNumber.current += 1;
    setLines((current) => [
      ...current,
      { ...initialLine, id, quantity: '' },
    ]);
  };

  const resetCalculator = () => {
    setLines([{ ...initialLine }]);
    setDimensionUnit('cm');
    setWeightUnit('kg');
    setFactor('6000');
    nextLineNumber.current = 2;
  };

  return (
    <PageShell>
      <section className="mx-auto grid w-full max-w-[1440px] gap-10 px-5 pb-16 pt-12 sm:px-8 sm:pb-20 sm:pt-16 lg:grid-cols-[1.04fr_0.96fr] lg:items-end lg:gap-16 lg:px-10 lg:pb-24 lg:pt-20">
        <div className="max-w-3xl">
          <PageKicker>Tools / Calculadora de carga</PageKicker>
          <h1 className="mt-5 text-balance font-serif text-4xl font-normal leading-[1.08] tracking-[-0.01em] sm:text-5xl lg:text-[3.7rem]">
            Calcula CBM y{' '}
            <span className="font-sans font-semibold tracking-tight">peso facturable.</span>
          </h1>
          <p className="mt-5 max-w-2xl text-pretty text-sm leading-7 text-muted-foreground sm:text-base">
            Añade tus bultos y compara el peso real con el volumétrico. Ajusta el factor según la
            tarifa del transportista para obtener una estimación clara.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <CutButton variant="solid" href="#calculator">
              Abrir calculadora
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </CutButton>
          </div>
        </div>

        <div className="relative">
          <div className="absolute -inset-3 border border-dashed border-border/70" aria-hidden="true" />
          <div className="bg-border p-px" style={clippedPanel}>
            <div className="bg-background p-5 sm:p-7" style={clippedPanel}>
              <div className="flex items-center justify-between border-b border-border/70 pb-4">
                <div className="flex items-center gap-2.5">
                  <Calculator className="h-4 w-4 text-[#2f80ff]" aria-hidden="true" />
                  <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-muted-foreground">
                    Fórmula de referencia
                  </span>
                </div>
                <span className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
                  TOOL 02
                </span>
              </div>
              <div className="space-y-4 py-6">
                <div>
                  <p className="font-mono text-[10px] uppercase tracking-[0.12em] text-muted-foreground">
                    Volumen
                  </p>
                  <p className="mt-1 text-sm font-semibold tracking-tight">
                    Largo × ancho × alto × cantidad
                  </p>
                  <p className="mt-1 font-mono text-xs text-muted-foreground">÷ 1,000,000 = CBM</p>
                </div>
                <div className="border-t border-dotted border-border pt-4">
                  <p className="font-mono text-[10px] uppercase tracking-[0.12em] text-muted-foreground">
                    Peso facturable aéreo
                  </p>
                  <p className="mt-1 text-sm font-semibold tracking-tight">
                    Mayor entre peso bruto y volumétrico
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2 border-t border-border/70 pt-4 text-xs text-muted-foreground">
                <span className="h-2 w-2 bg-[#2f80ff]" aria-hidden="true" />
                Factor inicial: 6,000 cm³/kg
              </div>
            </div>
          </div>
        </div>
      </section>

      <section
        id="calculator"
        className="mx-auto max-w-[1440px] scroll-mt-24 px-5 pb-20 sm:px-8 sm:pb-28 lg:px-10"
      >
        <div className="border-t border-border pt-8 sm:pt-10">
          <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
            <div>
              <PageKicker>Calculadora de flete</PageKicker>
              <h2 className="mt-3 font-serif text-3xl font-normal leading-tight tracking-tight sm:text-4xl">
                Introduce la carga.
              </h2>
            </div>
            <button
              type="button"
              onClick={resetCalculator}
              className="focus-ring inline-flex w-fit items-center gap-2 text-xs font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              <RotateCcw className="h-3.5 w-3.5" aria-hidden="true" />
              Restablecer
            </button>
          </div>

          <div className="mt-7 grid items-start gap-5 lg:grid-cols-[1.25fr_0.75fr]">
            <div className="border border-border bg-background p-4 sm:p-6" style={clippedPanel}>
              <div className="grid gap-4 sm:grid-cols-3">
                <label className="block">
                  <span className="mb-2 block font-mono text-[10px] uppercase tracking-[0.12em] text-muted-foreground">
                    Unidad de medidas
                  </span>
                  <select
                    value={dimensionUnit}
                    onChange={(event) => setDimensionUnit(event.target.value as DimensionUnit)}
                    className="focus-ring h-10 w-full border border-border bg-background px-3 text-sm"
                  >
                    <option value="cm">Centímetros (cm)</option>
                    <option value="in">Pulgadas (in)</option>
                  </select>
                </label>

                <label className="block">
                  <span className="mb-2 block font-mono text-[10px] uppercase tracking-[0.12em] text-muted-foreground">
                    Unidad de peso
                  </span>
                  <select
                    value={weightUnit}
                    onChange={(event) => setWeightUnit(event.target.value as WeightUnit)}
                    className="focus-ring h-10 w-full border border-border bg-background px-3 text-sm"
                  >
                    <option value="kg">Kilogramos (kg)</option>
                    <option value="lb">Libras (lb)</option>
                  </select>
                </label>

                <label className="block">
                  <span className="mb-2 block font-mono text-[10px] uppercase tracking-[0.12em] text-muted-foreground">
                    Factor (cm³/kg)
                  </span>
                  <input
                    type="text"
                    inputMode="decimal"
                    pattern="[0-9]*[.]?[0-9]*"
                    value={factor}
                    onChange={(event) => {
                      const value = sanitizeNumericInput(event.target.value);
                      if (value !== null) setFactor(value);
                    }}
                    aria-label="Factor volumétrico en centímetros cúbicos por kilogramo"
                    className="focus-ring h-10 w-full border border-border bg-background px-3 text-sm"
                  />
                </label>
              </div>

              <div className="mt-6 flex items-center justify-between gap-3 border-y border-border py-3">
                <span className="font-mono text-[10px] uppercase tracking-[0.12em] text-muted-foreground">
                  Líneas de bultos
                </span>
                <span className="font-mono text-[10px] text-muted-foreground">
                  {String(lines.length).padStart(2, '0')} {lines.length === 1 ? 'línea' : 'líneas'}
                </span>
              </div>

              <div className="mt-4 space-y-3">
                {lines.map((line, index) => (
                  <div key={line.id} className="border border-border/80 p-4">
                    <div className="mb-4 flex items-center justify-between gap-3">
                      <div className="flex items-center gap-2.5">
                        <span className="flex h-7 w-7 items-center justify-center border border-border font-mono text-[10px] text-muted-foreground">
                          {String(index + 1).padStart(2, '0')}
                        </span>
                        <span className="text-sm font-semibold tracking-tight">
                          Tipo de bulto
                        </span>
                      </div>
                      <button
                        type="button"
                        onClick={() => setLines((current) => current.filter((entry) => entry.id !== line.id))}
                        disabled={lines.length === 1}
                        aria-label={`Eliminar línea ${index + 1}`}
                        className="focus-ring inline-flex h-8 w-8 items-center justify-center text-muted-foreground transition-colors hover:text-foreground disabled:cursor-not-allowed disabled:opacity-30"
                      >
                        <Trash2 className="h-4 w-4" aria-hidden="true" />
                      </button>
                    </div>

                    <div className="grid grid-cols-2 gap-3 sm:grid-cols-5">
                      {(
                        [
                          ['quantity', 'Cantidad', '1'],
                          ['length', `Largo (${dimensionUnit})`, '0'],
                          ['width', `Ancho (${dimensionUnit})`, '0'],
                          ['height', `Alto (${dimensionUnit})`, '0'],
                          ['weightPerPiece', `Peso bruto (${weightUnit})`, '0'],
                        ] as const
                      ).map(([field, label, placeholder]) => (
                        <label key={field} className="block">
                          <span className="mb-1.5 block text-[11px] text-muted-foreground">
                            {label}
                          </span>
                          <input
                            type="text"
                            inputMode={field === 'quantity' ? 'numeric' : 'decimal'}
                            pattern={field === 'quantity' ? '[0-9]*' : '[0-9]*[.]?[0-9]*'}
                            value={line[field]}
                            placeholder={placeholder}
                            onChange={(event) => {
                              const value = sanitizeNumericInput(
                                event.target.value,
                                field !== 'quantity',
                              );
                              if (value !== null) updateLine(line.id, field, value);
                            }}
                            aria-label={`Línea ${index + 1}: ${label}`}
                            className="focus-ring h-10 w-full border border-border bg-background px-2.5 text-sm"
                          />
                        </label>
                      ))}
                    </div>
                    {!isFreightLineComplete(line) && (
                      <p className="mt-3 text-[11px] text-muted-foreground">
                        Completa cantidad, dimensiones y peso para incluir esta línea.
                      </p>
                    )}
                  </div>
                ))}
              </div>

              <button
                type="button"
                onClick={addLine}
                className="focus-ring mt-4 inline-flex h-10 items-center gap-2 border border-border px-3 text-xs font-semibold transition-colors hover:bg-muted"
              >
                <Plus className="h-4 w-4" aria-hidden="true" />
                Añadir tipo de bulto
              </button>

              <div className="mt-5 flex items-start gap-2.5 border-t border-dotted border-border pt-4 text-xs leading-relaxed text-muted-foreground">
                <Info className="mt-0.5 h-4 w-4 shrink-0 text-[#2f80ff]" aria-hidden="true" />
                <p>
                  6,000 cm³/kg es un factor inicial común para carga aérea. Confirma y ajusta el
                  valor según la tarifa del transportista.
                </p>
              </div>
            </div>

            <aside
              className="border border-border bg-background p-5 sm:p-6 lg:sticky lg:top-24"
              style={clippedPanel}
              aria-live="polite"
            >
              <div className="flex items-center justify-between border-b border-border/70 pb-4">
                <div className="flex items-center gap-2.5">
                  <Calculator className="h-4 w-4 text-[#2f80ff]" aria-hidden="true" />
                  <span className="font-mono text-[10px] uppercase tracking-[0.13em] text-muted-foreground">
                    Resumen del embarque
                  </span>
                </div>
                <span className="font-mono text-[10px] text-muted-foreground">
                  {calculation ? `${calculation.totalPieces} bultos` : 'Pendiente'}
                </span>
              </div>

              <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
                <ResultMetric
                  label="Volumen total"
                  value={calculation ? formatNumber(calculation.totalCbm, 3) : '—'}
                  unit="m³ / CBM"
                />
                <ResultMetric
                  label="Peso bruto"
                  value={calculation ? formatNumber(calculation.grossWeightKg) : '—'}
                  unit="kg"
                />
                <ResultMetric
                  label="Peso volumétrico"
                  value={calculation ? formatNumber(calculation.volumetricWeightKg) : '—'}
                  unit="kg"
                />
                <ResultMetric
                  label="Peso facturable"
                  value={calculation ? formatNumber(calculation.chargeableWeightKg) : '—'}
                  unit="kg"
                  featured
                />
              </div>

              <div className="mt-4 border-t border-dotted border-border pt-4">
                {calculation ? (
                  <p className="text-xs leading-relaxed text-muted-foreground">
                    Se toma el mayor entre el peso bruto y el volumétrico, usando un factor de{' '}
                    <span className="font-semibold text-foreground">
                      {formatNumber(factorValue)} cm³/kg
                    </span>
                    . Los resultados se muestran en kg y m³.
                  </p>
                ) : (
                  <p className="text-xs leading-relaxed text-muted-foreground">
                    Completa todas las líneas y usa un factor mayor que cero para calcular el
                    resumen completo.
                  </p>
                )}
              </div>
            </aside>
          </div>
        </div>
      </section>
    </PageShell>
  );
}

export default FreightCalculatorPage;
