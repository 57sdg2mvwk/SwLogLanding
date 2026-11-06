import React, { lazy, Suspense, useEffect, useMemo, useRef, useState } from 'react';
import {
  Copy,
  Info,
  Pause,
  Play,
  Plus,
  RotateCcw,
  RotateCw,
  Trash2,
  Truck,
} from 'lucide-react';
import { CutButton } from '../components/CutButton';
import {
  calculateContainerLoadPlan,
  containerPresets,
  MAX_PLANNER_PIECES,
  type CargoItemSpec,
  type ContainerLoadPlan,
  type ContainerPreset,
} from '../lib/containerLoadPlanner';
import { sanitizeNumericInput } from '../lib/freightCalculator';
import { PageKicker, PageShell, clippedPanel } from './PagePrimitives';

const ContainerLoadScene = lazy(() =>
  import('../components/ContainerLoadScene').then(({ ContainerLoadScene }) => ({
    default: ContainerLoadScene,
  })),
);

type PlannerLine = {
  id: string;
  name: string;
  group: string;
  quantity: string;
  lengthCm: number | null;
  widthCm: number | null;
  heightCm: number | null;
  weightKg: number | null;
  canRotate: boolean;
  canTilt: boolean;
  stackable: boolean;
  fragile: boolean;
  color: string;
};
type DimensionUnit = 'cm' | 'in';
type WeightUnit = 'kg' | 'lb';

const SAMPLE_LINES: PlannerLine[] = [
  {
    id: 'sample-pallets',
    name: 'Pallet europeo',
    group: 'Palets',
    quantity: '40',
    lengthCm: 120,
    widthCm: 80,
    heightCm: 100,
    weightKg: 300,
    canRotate: true,
    canTilt: false,
    stackable: true,
    fragile: false,
    color: '#8fb3de',
  },
  {
    id: 'sample-cartons',
    name: 'Caja de repuestos',
    group: 'Repuestos',
    quantity: '1',
    lengthCm: 60,
    widthCm: 40,
    heightCm: 35,
    weightKg: 18,
    canRotate: true,
    canTilt: true,
    stackable: true,
    fragile: false,
    color: '#df9d4e',
  },
];

const DEFAULT_CONTAINER =
  containerPresets.find((preset) => preset.id === '45-high-cube') ?? containerPresets[0];
const COLORS = ['#2f80ff', '#df9d4e', '#69a88d', '#b879a4', '#d46f70', '#7c8fa8'];
const CARGO_GROUP_OPTIONS = [
  'Carga general',
  'Palets',
  'Cajas',
  'Repuestos',
  'Maquinaria',
  'Textil',
  'Perecederos',
  'Mercancía peligrosa',
  'Otros',
];
type NumericKey = 'lengthCm' | 'widthCm' | 'heightCm' | 'weightKg';

const toDisplay = (canonical: number | null, unit: DimensionUnit | WeightUnit) => {
  if (canonical === null) return '';
  const value = unit === 'in' ? canonical / 2.54 : unit === 'lb' ? canonical / 0.45359237 : canonical;
  return Number(value.toFixed(2)).toString();
};
const toCanonical = (value: string, unit: DimensionUnit | WeightUnit) => {
  if (!value.trim() || value.endsWith('.')) return null;
  const parsed = Number(value);
  if (!Number.isFinite(parsed)) return null;
  return unit === 'in' ? parsed * 2.54 : unit === 'lb' ? parsed * 0.45359237 : parsed;
};
const fmt = (value: number, digits = 1) =>
  new Intl.NumberFormat('es-MX', { maximumFractionDigits: digits }).format(value);

function ContainerSketch({ container }: { container: ContainerPreset }) {
  const isRoadVehicle = container.id === 'semi-trailer' || container.id === 'rigid-truck';
  const bodyWidth = isRoadVehicle
    ? container.id === 'semi-trailer' ? 52 : 36
    : 34 + Math.round(((container.lengthCm - 590) / (1_356 - 590)) * 29);

  return (
    <svg viewBox="0 0 88 36" className="h-8 w-[76px] shrink-0 text-muted-foreground" aria-hidden="true">
      <g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.1">
        <path d={`M5 10h${bodyWidth}v15H5Z`} />
        {Array.from({ length: Math.max(3, Math.round(bodyWidth / 8)) }, (_, index) => {
          const x = 8 + index * ((bodyWidth - 5) / Math.max(3, Math.round(bodyWidth / 8)));
          return <path key={index} d={`M${x} 11v13`} />;
        })}
        {isRoadVehicle ? (
          <>
            <path d={`M${bodyWidth + 5} 17h11l6 6v2H${bodyWidth + 5}Z`} />
            <circle cx="18" cy="28" r="2.4" />
            <circle cx="46" cy="28" r="2.4" />
            <circle cx={bodyWidth + 13} cy="28" r="2.4" />
          </>
        ) : (
          <path d={`M5 28h${bodyWidth}`} />
        )}
      </g>
    </svg>
  );
}

function createSampleCargo(): CargoItemSpec[] {
  return SAMPLE_LINES.map((line) => ({
    id: line.id,
    name: line.name,
    group: line.group,
    quantity: Number(line.quantity),
    lengthCm: line.lengthCm ?? 0,
    widthCm: line.widthCm ?? 0,
    heightCm: line.heightCm ?? 0,
    weightKg: line.weightKg ?? 0,
    color: line.color,
    canRotate: line.canRotate,
    canTilt: line.canTilt,
    stackable: line.stackable,
    fragile: line.fragile,
  }));
}

function createSamplePlan() {
  return calculateContainerLoadPlan(DEFAULT_CONTAINER, createSampleCargo());
}

function Metric({
  label,
  value,
  unit,
  percent,
}: {
  label: string;
  value: string;
  unit?: string;
  percent?: number;
}) {
  return (
    <div className="border border-border/80 p-4">
      <p className="font-mono text-[10px] uppercase tracking-[0.13em] text-muted-foreground">{label}</p>
      <div className="mt-2 flex items-baseline gap-1.5">
        <span className="text-2xl font-semibold tracking-tight">{value}</span>
        {unit && <span className="text-xs text-muted-foreground">{unit}</span>}
      </div>
      {percent !== undefined && (
        <div className="mt-3 h-1 overflow-hidden bg-muted" aria-label={`${fmt(percent)}% utilizado`}>
          <div className="h-full bg-[#2f80ff] transition-[width] duration-300" style={{ width: `${Math.min(percent, 100)}%` }} />
        </div>
      )}
    </div>
  );
}

function Switch({
  checked,
  onChange,
  label,
  disabled = false,
}: {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label: string;
  disabled?: boolean;
}) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      disabled={disabled}
      onClick={() => onChange(!checked)}
      className="focus-ring inline-flex min-h-8 shrink-0 items-center gap-2 whitespace-nowrap text-xs text-muted-foreground transition-colors hover:text-foreground disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:text-muted-foreground"
    >
      <span className={`relative h-5 w-9 shrink-0 border transition-colors ${checked ? 'border-[#2f80ff] bg-[#2f80ff]/15' : 'border-border bg-muted'}`}>
        <span className={`absolute top-[3px] h-3 w-3 shrink-0 transition-transform ${checked ? 'translate-x-[18px] bg-[#2f80ff]' : 'translate-x-[3px] bg-muted-foreground'}`} />
      </span>
      <span>{label}</span>
    </button>
  );
}

export function ContainerLoadPlannerPage() {
  const [containerId, setContainerId] = useState(DEFAULT_CONTAINER.id);
  const container = useMemo(
    () => containerPresets.find((preset) => preset.id === containerId) ?? containerPresets[0],
    [containerId],
  );
  const [lines, setLines] = useState<PlannerLine[]>(SAMPLE_LINES);
  const [dimensionUnit, setDimensionUnit] = useState<DimensionUnit>('cm');
  const [weightUnit, setWeightUnit] = useState<WeightUnit>('kg');
  const [numericDrafts, setNumericDrafts] = useState<
    Record<string, Partial<Record<NumericKey, string>>>
  >({});
  const [plan, setPlan] = useState<ContainerLoadPlan | null>(createSamplePlan);
  const [error, setError] = useState('');
  const [visibleCount, setVisibleCount] = useState(
    SAMPLE_LINES.reduce((sum, line) => sum + Number(line.quantity), 0),
  );
  const [playing, setPlaying] = useState(false);
  const nextId = useRef(1);

  useEffect(() => {
    if (!playing) return;
    const stepMs = Math.max(45, Math.min(180, 5_000 / (plan?.placements.length ?? 1)));
    const timer = window.setInterval(() => {
      setVisibleCount((count) => {
        if (count >= (plan?.placements.length ?? 0)) {
          setPlaying(false);
          return count;
        }
        return count + 1;
      });
    }, stepMs);
    return () => window.clearInterval(timer);
  }, [playing, plan]);

  const updateLine = (id: string, patch: Partial<PlannerLine>) => {
    setLines((current) => current.map((line) => (line.id === id ? { ...line, ...patch } : line)));
    setPlan(null);
    setVisibleCount(0);
    setPlaying(false);
    setError('');
  };

  const addLine = (copy?: PlannerLine) => {
    const id = `cargo-${nextId.current++}`;
    setLines((current) => [
      ...current,
      copy
        ? { ...copy, id, name: `${copy.name} (copia)` }
        : {
            id,
            name: '',
            group: 'Carga general',
            quantity: '1',
            lengthCm: null,
            widthCm: null,
            heightCm: null,
            weightKg: null,
            canRotate: true,
            canTilt: false,
            stackable: true,
            fragile: false,
            color: COLORS[(current.length + 1) % COLORS.length],
          },
    ]);
    setPlan(null);
    setVisibleCount(0);
    setError('');
  };

  const totalPieces = lines.reduce((total, line) => total + (Number(line.quantity) || 0), 0);
  const validLines = lines.length > 0 && lines.every((line) =>
    line.name.trim() &&
    line.group.trim() &&
    Number.isInteger(Number(line.quantity)) &&
    Number(line.quantity) > 0 &&
    line.lengthCm !== null && line.lengthCm > 0 &&
    line.widthCm !== null && line.widthCm > 0 &&
    line.heightCm !== null && line.heightCm > 0 &&
    line.weightKg !== null && line.weightKg > 0,
  );

  const calculate = () => {
    if (!validLines) {
      setError('Completa nombre, grupo, cantidad, dimensiones y peso con valores mayores que cero.');
      return;
    }
    if (totalPieces > MAX_PLANNER_PIECES) {
      setError(`El plan admite hasta ${MAX_PLANNER_PIECES} piezas por cálculo. Reduce la cantidad para continuar.`);
      return;
    }
    const cargo: CargoItemSpec[] = lines.map((line) => ({
      id: line.id,
      name: line.name.trim(),
      group: line.group.trim(),
      quantity: Number(line.quantity),
      lengthCm: line.lengthCm!,
      widthCm: line.widthCm!,
      heightCm: line.heightCm!,
      weightKg: line.weightKg!,
      color: line.color,
      canRotate: line.canRotate,
      canTilt: line.canTilt,
      stackable: line.stackable,
      fragile: line.fragile,
    }));
    try {
      const result = calculateContainerLoadPlan(container, cargo);
      setPlan(result);
      setVisibleCount(result.placements.length);
      setPlaying(false);
      setError('');
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : 'No se pudo calcular este plan.');
    }
  };

  const reset = () => {
    setContainerId(DEFAULT_CONTAINER.id);
    setLines(SAMPLE_LINES);
    setDimensionUnit('cm');
    setWeightUnit('kg');
    setNumericDrafts({});
    setPlan(createSamplePlan());
    setVisibleCount(SAMPLE_LINES.reduce((sum, line) => sum + Number(line.quantity), 0));
    setPlaying(false);
    setError('');
    nextId.current = 1;
  };

  const fieldClass = 'focus-ring h-10 w-full border border-border bg-background px-2.5 text-sm transition-colors focus:border-[#2f80ff]';
  const numericInput = (
    line: PlannerLine,
    key: NumericKey,
    label: string,
    unit: DimensionUnit | WeightUnit,
    index: number,
  ) => (
    <label className="block">
      <span className="mb-1.5 block text-[10px] text-muted-foreground">{label} <span className="font-mono">({unit})</span></span>
      <input
        type="text"
        inputMode="decimal"
        pattern="[0-9]*[.]?[0-9]*"
        value={numericDrafts[line.id]?.[key] ?? toDisplay(line[key], unit)}
        onChange={(event) => {
          const value = sanitizeNumericInput(event.target.value);
          if (value !== null) {
            setNumericDrafts((current) => ({
              ...current,
              [line.id]: { ...current[line.id], [key]: value },
            }));
            updateLine(line.id, { [key]: toCanonical(value, unit) });
          }
        }}
        aria-label={`Línea ${index + 1}: ${label}`}
        className={fieldClass}
      />
    </label>
  );

  return (
    <PageShell>
      <section className="mx-auto w-full max-w-[1440px] px-5 pb-9 pt-10 sm:px-8 sm:pb-12 sm:pt-14 lg:px-10">
        <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end">
          <div className="max-w-3xl">
            <PageKicker>Tools / Planificador de carga</PageKicker>
            <h1 className="mt-5 text-balance font-serif text-4xl font-normal leading-[1.08] tracking-tight sm:text-5xl lg:text-[3.55rem]">
              Comprueba el encaje.<br className="hidden sm:block" /> <span className="font-sans font-semibold">Antes de reservar.</span>
            </h1>
            <p className="mt-5 max-w-2xl text-pretty text-sm leading-7 text-muted-foreground sm:text-base">
              Organiza bultos por tipo, estima cuánto cabe y recorre la carga pieza a pieza.
              La propuesta es una heurística orientativa, no una optimización ni una garantía de estiba.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3 lg:justify-end">
            <CutButton variant="outline" onClick={reset} type="button">
              <RotateCcw className="h-3.5 w-3.5" aria-hidden="true" /> Restaurar ejemplo
            </CutButton>
            <span className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">Cálculo local · no persiste</span>
          </div>
        </div>
        <div className="mt-7 flex flex-wrap items-center gap-x-5 gap-y-2 border-y border-border py-3 text-xs text-muted-foreground">
          <span className="inline-flex items-center gap-2"><span className="h-2 w-2 bg-[#2f80ff]" />Ejemplo de carga</span>
          <span>Sin guardar ni enviar datos</span>
          <span className="font-mono">Límite: {MAX_PLANNER_PIECES} piezas</span>
        </div>
      </section>

      <section className="mx-auto max-w-[1440px] px-5 pb-16 sm:px-8 sm:pb-24 lg:px-10">
        <div className="grid items-start gap-6 xl:grid-cols-[minmax(0,1.08fr)_minmax(440px,0.92fr)]">
          <div className="min-w-0 border border-border bg-background p-4 sm:p-6" style={clippedPanel}>
            <div className="flex flex-wrap items-start justify-between gap-4 border-b border-border/70 pb-5">
              <div>
                <PageKicker>01 / Define la carga</PageKicker>
                <h2 className="mt-2 font-serif text-2xl">Parámetros del embarque</h2>
              </div>
              <div className="flex gap-2">
                <label className="block">
                  <span className="mb-1 block font-mono text-[9px] uppercase tracking-wider text-muted-foreground">Medidas</span>
                  <select value={dimensionUnit} onChange={(event) => { setDimensionUnit(event.target.value as DimensionUnit); setNumericDrafts({}); }} className={`${fieldClass} min-w-[100px] px-2`}>
                    <option value="cm">cm</option><option value="in">in</option>
                  </select>
                </label>
                <label className="block">
                  <span className="mb-1 block font-mono text-[9px] uppercase tracking-wider text-muted-foreground">Peso</span>
                  <select value={weightUnit} onChange={(event) => { setWeightUnit(event.target.value as WeightUnit); setNumericDrafts({}); }} className={`${fieldClass} min-w-[100px] px-2`}>
                    <option value="kg">kg</option><option value="lb">lb</option>
                  </select>
                </label>
              </div>
            </div>

            <div className="mt-5">
              <p className="mb-2 font-mono text-[10px] uppercase tracking-[0.12em] text-muted-foreground">Equipo / tipo de contenedor</p>
              <div className="grid auto-rows-fr grid-cols-2 gap-2 sm:grid-cols-3">
                {containerPresets.map((preset) => {
                  const selected = preset.id === containerId;
                  const volumeM3 = (preset.lengthCm * preset.widthCm * preset.heightCm) / 1_000_000;
                  return (
                    <button
                      key={preset.id}
                      type="button"
                      aria-pressed={selected}
                      onClick={() => {
                        if (selected) return;
                        setContainerId(preset.id);
                        setPlan(null);
                        setVisibleCount(0);
                        setPlaying(false);
                      }}
                      className={`focus-ring flex h-full min-h-[116px] min-w-0 flex-col overflow-hidden border p-3 text-left transition-[border-color,background-color,transform] duration-200 hover:-translate-y-0.5 ${
                        selected
                          ? 'border-[#2f80ff] bg-[#2f80ff]/[0.055]'
                          : 'border-border/80 bg-background hover:border-[#2f80ff]/45'
                      }`}
                    >
                      <div className="flex w-full items-center justify-between gap-2">
                        <ContainerSketch container={preset} />
                        <span className={`mt-1 h-2 w-2 shrink-0 rounded-full border ${selected ? 'border-[#2f80ff] bg-[#2f80ff]' : 'border-border'}`} />
                      </div>
                      <div className="mt-2 w-full min-w-0">
                        <span className="block truncate text-xs font-semibold leading-4">{preset.shortName}</span>
                        <span className="mt-1 block whitespace-nowrap font-mono text-[9px] leading-3 text-muted-foreground">
                          {fmt(preset.lengthCm / 100, 2)} × {fmt(preset.widthCm / 100, 2)} × {fmt(preset.heightCm / 100, 2)} m
                        </span>
                        <span className="mt-1 block whitespace-nowrap font-mono text-[9px] leading-3 text-muted-foreground">
                          {fmt(volumeM3, 1)} m³ · {fmt(preset.maxPayloadKg / 1000, 1)} t
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>
              <p className="mt-2 text-[10px] leading-relaxed text-muted-foreground">
                Medidas interiores de referencia; confirma las dimensiones y la carga útil con tu proveedor.
              </p>
            </div>

            <div className="mt-6 flex items-center justify-between border-y border-border py-3">
              <span className="font-mono text-[10px] uppercase tracking-[0.12em] text-muted-foreground">Líneas de carga</span>
              <span className={`font-mono text-[10px] ${totalPieces > MAX_PLANNER_PIECES ? 'text-red-600' : 'text-muted-foreground'}`}>
                {String(totalPieces).padStart(2, '0')} / {MAX_PLANNER_PIECES} piezas
              </span>
            </div>
            {totalPieces > MAX_PLANNER_PIECES && (
              <p role="alert" className="mt-3 border border-red-500/35 bg-red-500/[0.06] px-3 py-2 text-xs leading-relaxed text-red-700 dark:text-red-300">
                Excede el máximo de {MAX_PLANNER_PIECES} piezas. Reduce las cantidades antes de calcular.
              </p>
            )}

            <div className="mt-4 space-y-3">
              {lines.map((line, index) => (
                <article key={line.id} className="border border-border/80 p-3.5 sm:p-4">
                  <div className="mb-4 flex items-center justify-between gap-2">
                    <div className="flex min-w-0 items-center gap-2.5">
                      <span className="flex h-7 w-7 shrink-0 items-center justify-center border border-border font-mono text-[10px] text-muted-foreground">{String(index + 1).padStart(2, '0')}</span>
                      <span className="h-2.5 w-2.5 shrink-0" style={{ backgroundColor: line.color }} />
                      <span className="truncate text-sm font-semibold">{line.name || 'Nueva línea de carga'}</span>
                    </div>
                    <div className="flex shrink-0 items-center">
                      <button type="button" onClick={() => addLine(line)} aria-label={`Duplicar línea ${index + 1}`} className="focus-ring inline-flex h-8 w-8 items-center justify-center text-muted-foreground transition-colors hover:text-foreground">
                        <Copy className="h-3.5 w-3.5" aria-hidden="true" />
                      </button>
                      <button type="button" onClick={() => { setLines((current) => current.filter((entry) => entry.id !== line.id)); setPlan(null); setVisibleCount(0); setPlaying(false); }} disabled={lines.length === 1} aria-label={`Eliminar línea ${index + 1}`} className="focus-ring inline-flex h-8 w-8 items-center justify-center text-muted-foreground transition-colors hover:text-red-600 disabled:cursor-not-allowed disabled:opacity-30">
                        <Trash2 className="h-3.5 w-3.5" aria-hidden="true" />
                      </button>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                    <label className="block sm:col-span-2">
                      <span className="mb-1.5 block text-[10px] text-muted-foreground">Nombre del bulto</span>
                      <input value={line.name} onChange={(event) => updateLine(line.id, { name: event.target.value })} placeholder="Ej. Cajas de repuestos" className={fieldClass} />
                    </label>
                    <label className="block">
                      <span className="mb-1.5 block text-[10px] text-muted-foreground">Grupo</span>
                      <select
                        value={line.group}
                        onChange={(event) => updateLine(line.id, { group: event.target.value })}
                        aria-label={`Grupo del bulto ${index + 1}`}
                        className={fieldClass}
                      >
                        <option value="" disabled>Selecciona un grupo</option>
                        {Array.from(new Set([...CARGO_GROUP_OPTIONS, line.group.trim()].filter(Boolean))).map((group) => (
                          <option key={group} value={group}>{group}</option>
                        ))}
                      </select>
                    </label>
                    <label className="block">
                      <span className="mb-1.5 block text-[10px] text-muted-foreground">Cantidad</span>
                      <input
                        type="text" inputMode="numeric" pattern="[0-9]*" value={line.quantity}
                        onChange={(event) => {
                          const value = sanitizeNumericInput(event.target.value, false);
                          if (value !== null) updateLine(line.id, { quantity: value });
                        }}
                        className={fieldClass}
                      />
                    </label>
                    {numericInput(line, 'lengthCm', 'Largo', dimensionUnit, index)}
                    {numericInput(line, 'widthCm', 'Ancho', dimensionUnit, index)}
                    {numericInput(line, 'heightCm', 'Alto', dimensionUnit, index)}
                    {numericInput(line, 'weightKg', 'Peso / pieza', weightUnit, index)}
                  </div>
                  <div className="mt-4 grid gap-3 border-t border-dotted border-border pt-3 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-end">
                    <div className="min-w-0">
                      <p className="mb-2 font-mono text-[9px] uppercase tracking-[0.12em] text-muted-foreground">Reglas de estiba</p>
                      <div className="grid grid-cols-2 gap-x-4 gap-y-2 sm:flex sm:flex-wrap">
                      <Switch checked={line.canRotate} onChange={(value) => updateLine(line.id, { canRotate: value })} label="Girar" />
                      <Switch checked={line.canTilt} onChange={(value) => updateLine(line.id, { canTilt: value })} label="Tumbar" />
                      <Switch checked={line.stackable} onChange={(value) => updateLine(line.id, { stackable: value })} label="Apilar" disabled={line.fragile} />
                      <Switch
                        checked={line.fragile}
                        onChange={(value) => updateLine(line.id, { fragile: value, ...(value ? { stackable: false } : {}) })}
                        label="Frágil"
                      />
                      </div>
                    </div>
                    <label className="inline-flex w-fit items-center gap-2 text-[10px] text-muted-foreground">
                      <span>Color de línea</span>
                      <input type="color" value={line.color} onChange={(event) => updateLine(line.id, { color: event.target.value })} aria-label={`Color de línea ${index + 1}`} className="h-8 w-10 cursor-pointer border border-border bg-background p-0.5" />
                    </label>
                  </div>
                </article>
              ))}
            </div>

            <button type="button" onClick={() => addLine()} className="focus-ring mt-4 inline-flex h-10 items-center gap-2 border border-border px-3 text-xs font-semibold transition-colors hover:border-[#2f80ff]/60 hover:bg-[#2f80ff]/[0.04]">
              <Plus className="h-4 w-4 text-[#2f80ff]" aria-hidden="true" /> Añadir línea
            </button>
            {error && <p role="alert" className="mt-4 border border-red-500/35 bg-red-500/[0.06] px-3 py-2.5 text-xs leading-relaxed text-red-700 dark:text-red-300">{error}</p>}
            <div className="mt-5 flex flex-col gap-3 border-t border-border pt-5 sm:flex-row sm:items-center sm:justify-between">
              <p className="max-w-md text-[11px] leading-relaxed text-muted-foreground">Los valores introducidos se convierten a cm y kg para calcular; el cambio de unidades no altera los datos originales.</p>
              <CutButton onClick={calculate} type="button" className="shrink-0">
                <Truck className="h-4 w-4" aria-hidden="true" /> Calcular distribución
              </CutButton>
            </div>
          </div>

          <aside className="min-w-0 border border-border bg-background" style={clippedPanel}>
            <div className="flex flex-wrap items-end justify-between gap-3 border-b border-border/70 px-4 py-4 sm:px-5">
              <div>
                <PageKicker>02 / Inspecciona el plan</PageKicker>
                <h2 className="mt-2 font-serif text-2xl">Vista de estiba</h2>
              </div>
              <div className="flex flex-wrap items-center gap-2">
                <span className="border border-border px-2 py-1 font-mono text-[10px] uppercase tracking-wider text-muted-foreground">{container.shortName}</span>
                <span className="font-mono text-[10px] text-muted-foreground">
                  {plan ? `${visibleCount} / ${plan.placements.length} bultos` : `${totalPieces} bultos`}
                </span>
              </div>
            </div>
            <div className="relative h-[340px] overflow-hidden bg-muted/25 sm:h-[380px]">
              <Suspense
                fallback={
                  <div className="absolute inset-0 grid place-content-center gap-3 text-center" role="status">
                    <span className="mx-auto h-10 w-10 animate-pulse border border-[#2f80ff]/45 bg-[#2f80ff]/[0.06]" aria-hidden="true" />
                    <span className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">Preparando vista 3D</span>
                  </div>
                }
              >
                <ContainerLoadScene container={container} placements={plan?.placements ?? []} visibleCount={visibleCount} className="z-[1]" />
              </Suspense>
            </div>
            <div className="border-t border-border/70 p-4 sm:p-5">
              <div className="flex flex-wrap items-center gap-2">
                <button
                  type="button"
                  onClick={() => {
                    if (!plan?.placements.length) return;
                    if (visibleCount >= plan.placements.length) setVisibleCount(0);
                    setPlaying(true);
                  }}
                  disabled={!plan?.placements.length || playing}
                  aria-label="Reproducir secuencia"
                  className="focus-ring inline-flex h-9 items-center gap-2 border border-border px-3 text-xs font-medium transition-colors hover:bg-muted disabled:cursor-not-allowed disabled:opacity-40"
                ><Play className="h-3.5 w-3.5" aria-hidden="true" /> Reproducir</button>
                <button type="button" onClick={() => setPlaying(false)} disabled={!playing} aria-label="Pausar secuencia" className="focus-ring inline-flex h-9 w-9 items-center justify-center border border-border text-muted-foreground transition-colors hover:bg-muted disabled:cursor-not-allowed disabled:opacity-40"><Pause className="h-3.5 w-3.5" aria-hidden="true" /></button>
                <button type="button" onClick={() => { setPlaying(false); setVisibleCount(0); }} disabled={!plan?.placements.length} aria-label="Reiniciar secuencia" className="focus-ring inline-flex h-9 w-9 items-center justify-center border border-border text-muted-foreground transition-colors hover:bg-muted disabled:cursor-not-allowed disabled:opacity-40"><RotateCcw className="h-3.5 w-3.5" aria-hidden="true" /></button>
                <span className="ml-auto font-mono text-[10px] text-muted-foreground">{playing ? 'Cargando secuencia' : 'Secuencia de carga'}</span>
              </div>
              <div className="mt-4 flex items-center gap-3 font-mono text-[10px] text-muted-foreground">
                <span className="shrink-0">{String(visibleCount).padStart(2, '0')}</span>
                <input
                  type="range" min="0" max={plan?.placements.length ?? 0} value={Math.min(visibleCount, plan?.placements.length ?? 0)}
                  onChange={(event) => { setPlaying(false); setVisibleCount(Number(event.target.value)); }}
                  disabled={!plan?.placements.length}
                  aria-label="Recorrer colocaciones de carga"
                  className="h-1 min-w-0 flex-1 cursor-pointer accent-[#2f80ff] disabled:cursor-not-allowed"
                />
                <span className="shrink-0">{String(plan?.placements.length ?? 0).padStart(2, '0')}</span>
              </div>
              <p className="mt-3 flex items-start gap-2 text-[11px] leading-relaxed text-muted-foreground">
                <Info className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#2f80ff]" aria-hidden="true" />
                Vista estimada con algoritmo heurístico. Verifica medidas, resistencia, distribución de peso y requisitos de sujeción antes de cargar.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-px border-t border-border bg-border">
              <div className="bg-background p-4 sm:p-5">
                <p className="font-mono text-[10px] uppercase tracking-[0.13em] text-muted-foreground">Piezas colocadas</p>
                <p className="mt-2 text-2xl font-semibold tracking-tight">{plan?.loadedPieces ?? '—'}<span className="ml-1 text-xs font-normal text-muted-foreground">/ {plan?.totalPieces ?? totalPieces}</span></p>
              </div>
              <div className="bg-background p-4 sm:p-5">
                <p className="font-mono text-[10px] uppercase tracking-[0.13em] text-muted-foreground">Sin colocar</p>
                <p className={`mt-2 text-2xl font-semibold tracking-tight ${(plan?.unplacedPieces ?? 0) > 0 ? 'text-amber-700 dark:text-amber-300' : ''}`}>{plan?.unplacedPieces ?? '—'}</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-px border-t border-border bg-border">
              <div className="bg-background p-4 sm:p-5">
                <Metric label="Volumen utilizado" value={plan ? fmt(plan.volumeUtilizationPercent) : '—'} unit={plan ? '%' : undefined} percent={plan?.volumeUtilizationPercent} />
                <p className="mt-2 font-mono text-[10px] text-muted-foreground">{plan ? `${fmt(plan.usedVolumeM3, 2)} / ${fmt(plan.containerVolumeM3, 2)} m³` : 'Calcula para ver el volumen'}</p>
              </div>
              <div className="bg-background p-4 sm:p-5">
                <Metric label="Carga útil utilizada" value={plan ? fmt(plan.weightUtilizationPercent) : '—'} unit={plan ? '%' : undefined} percent={plan?.weightUtilizationPercent} />
                <p className="mt-2 font-mono text-[10px] text-muted-foreground">{plan ? `${fmt(plan.usedWeightKg, 0)} / ${fmt(container.maxPayloadKg, 0)} kg` : 'Calcula para ver el peso'}</p>
              </div>
            </div>
            {plan && plan.unplaced.length > 0 && (
              <div className="border-t border-border px-4 py-4 sm:px-5">
                <p className="font-mono text-[10px] uppercase tracking-[0.13em] text-muted-foreground">Bultos sin colocar</p>
                <ul className="mt-3 space-y-2">
                  {plan.unplaced.map((item) => (
                    <li key={`${item.itemId}-${item.reason}`} className="flex items-start justify-between gap-3 text-xs">
                      <span>{item.itemName} <span className="text-muted-foreground">× {item.quantity}</span></span>
                      <span className="shrink-0 text-right text-amber-700 dark:text-amber-300">{item.reason === 'payload' ? 'Límite de peso' : 'Sin espacio disponible'}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {!plan && (
              <div className="border-t border-border px-4 py-4 sm:px-5">
                <p className="text-xs leading-relaxed text-muted-foreground">Edita la carga y calcula para actualizar la vista y las métricas del contenedor.</p>
              </div>
            )}
          </aside>
        </div>
        <div className="mt-5 flex items-center justify-between border-t border-dotted border-border pt-4 font-mono text-[9px] uppercase tracking-wider text-muted-foreground">
          <span>WiseShips Tools / Plan de carga local</span>
          <span className="inline-flex items-center gap-1.5"><RotateCw className="h-3 w-3" aria-hidden="true" /> Arrastra para orbitar la vista</span>
        </div>
      </section>
    </PageShell>
  );
}

export default ContainerLoadPlannerPage;
