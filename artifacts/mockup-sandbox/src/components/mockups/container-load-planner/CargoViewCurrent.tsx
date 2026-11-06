import { useMemo, useState } from 'react';
import { Copy, Info, Pause, Play, RotateCcw, Trash2, Truck } from 'lucide-react';
import { ContainerLoadScene } from './ContainerLoadScene';
import {
  calculateContainerLoadPlan,
  containerPresets,
  type CargoItemSpec,
} from './containerLoadPlanner';
import './_group.css';

type CargoLine = CargoItemSpec;

const starterLines: CargoLine[] = [
  {
    id: 'spares',
    name: 'Cajas de repuestos',
    group: 'Repuestos',
    quantity: 8,
    lengthCm: 60,
    widthCm: 40,
    heightCm: 35,
    weightKg: 18,
    color: '#2f80ff',
    canRotate: true,
    canTilt: false,
    stackable: true,
    fragile: false,
  },
  {
    id: 'wood',
    name: 'Cajas de madera',
    group: 'Maquinaria',
    quantity: 4,
    lengthCm: 80,
    widthCm: 60,
    heightCm: 55,
    weightKg: 42,
    color: '#e7a34e',
    canRotate: true,
    canTilt: false,
    stackable: false,
    fragile: false,
  },
  {
    id: 'textile',
    name: 'Bultos textiles',
    group: 'Textil',
    quantity: 6,
    lengthCm: 50,
    widthCm: 50,
    heightCm: 40,
    weightKg: 12,
    color: '#75b79e',
    canRotate: true,
    canTilt: false,
    stackable: true,
    fragile: false,
  },
];

const groupOptions = [
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

function Switch({
  checked,
  onChange,
  label,
}: {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label: string;
}) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      onClick={() => onChange(!checked)}
      className="focus-ring inline-flex min-h-8 shrink-0 items-center gap-2 whitespace-nowrap text-xs text-muted-foreground transition-colors hover:text-foreground"
    >
      <span className={`relative h-5 w-9 shrink-0 border transition-colors ${checked ? 'border-[#2f80ff] bg-[#2f80ff]/15' : 'border-border bg-muted'}`}>
        <span className={`absolute top-[3px] h-3 w-3 shrink-0 transition-transform ${checked ? 'translate-x-[18px] bg-[#2f80ff]' : 'translate-x-[3px] bg-muted-foreground'}`} />
      </span>
      <span>{label}</span>
    </button>
  );
}

export function CargoViewCurrent() {
  const [lines, setLines] = useState(starterLines);
  const [visibleCount, setVisibleCount] = useState(3);
  const [playing, setPlaying] = useState(false);
  const container = containerPresets[0];
  const plan = useMemo(() => calculateContainerLoadPlan(container, lines), [container, lines]);
  const fieldClass = 'focus-ring h-10 w-full border border-border bg-background px-2.5 text-sm transition-colors focus:border-[#2f80ff]';
  const updateLine = (id: string, patch: Partial<CargoLine>) =>
    setLines((current) => current.map((line) => line.id === id ? { ...line, ...patch } : line));

  return (
    <main className="min-h-screen bg-[#0a0a0a] p-5 font-sans text-[#fafafa]">
      <div className="mx-auto grid max-w-[1240px] items-start gap-5 xl:grid-cols-[minmax(0,1.08fr)_minmax(440px,0.92fr)]">
        <section className="min-w-0 border border-white/10 bg-[#0c0c0c] p-4">
          <header className="mb-4 border-b border-white/10 pb-3">
            <p className="font-mono text-[10px] uppercase tracking-[0.12em] text-muted-foreground">01 / Define la carga</p>
            <h2 className="mt-2 font-serif text-2xl">Líneas de carga</h2>
          </header>
          <div className="space-y-3">
            {lines.map((line, index) => (
              <article key={line.id} className="border border-white/10 p-3.5 sm:p-4">
                <div className="mb-4 flex items-center justify-between gap-2">
                  <div className="flex min-w-0 items-center gap-2.5">
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center border border-white/10 font-mono text-[10px] text-muted-foreground">{String(index + 1).padStart(2, '0')}</span>
                    <span className="h-2.5 w-2.5 shrink-0" style={{ backgroundColor: line.color }} />
                    <span className="truncate text-sm font-semibold">{line.name}</span>
                  </div>
                  <div className="flex shrink-0 items-center">
                    <button type="button" aria-label={`Duplicar línea ${index + 1}`} className="focus-ring inline-flex h-8 w-8 items-center justify-center text-muted-foreground"><Copy className="h-3.5 w-3.5" /></button>
                    <button type="button" aria-label={`Eliminar línea ${index + 1}`} className="focus-ring inline-flex h-8 w-8 items-center justify-center text-muted-foreground"><Trash2 className="h-3.5 w-3.5" /></button>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                  <label className="block sm:col-span-2">
                    <span className="mb-1.5 block text-[10px] text-muted-foreground">Nombre del bulto</span>
                    <input value={line.name} onChange={(event) => updateLine(line.id, { name: event.target.value })} className={fieldClass} />
                  </label>
                  <label className="block">
                    <span className="mb-1.5 block text-[10px] text-muted-foreground">Grupo</span>
                    <select value={line.group} onChange={(event) => updateLine(line.id, { group: event.target.value })} className={fieldClass}>
                      <option value="" disabled>Selecciona un grupo</option>
                      {Array.from(new Set([...groupOptions, line.group.trim()].filter(Boolean))).map((group) => (
                        <option key={group} value={group}>{group}</option>
                      ))}
                    </select>
                  </label>
                  <label className="block">
                    <span className="mb-1.5 block text-[10px] text-muted-foreground">Cantidad</span>
                    <input value={line.quantity} readOnly className={fieldClass} />
                  </label>
                  {([
                    ['lengthCm', 'Largo'],
                    ['widthCm', 'Ancho'],
                    ['heightCm', 'Alto'],
                    ['weightKg', 'Peso / pieza'],
                  ] as const).map(([key, label]) => (
                    <label key={key} className="block">
                      <span className="mb-1.5 block text-[10px] text-muted-foreground">{label} ({key === 'weightKg' ? 'kg' : 'cm'})</span>
                      <input value={line[key]} readOnly className={fieldClass} />
                    </label>
                  ))}
                </div>
                <div className="mt-4 grid gap-3 border-t border-dotted border-white/15 pt-3 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-end">
                  <div className="min-w-0">
                    <p className="mb-2 font-mono text-[9px] uppercase tracking-[0.12em] text-muted-foreground">Reglas de estiba</p>
                    <div className="grid grid-cols-2 gap-x-4 gap-y-2 sm:flex sm:flex-wrap">
                      <Switch checked={line.canRotate} onChange={(value) => updateLine(line.id, { canRotate: value })} label="Girar" />
                      <Switch checked={line.canTilt} onChange={(value) => updateLine(line.id, { canTilt: value })} label="Tumbar" />
                      <Switch checked={line.stackable} onChange={(value) => updateLine(line.id, { stackable: value })} label="Apilar" />
                      <Switch checked={line.fragile} onChange={(value) => updateLine(line.id, { fragile: value })} label="Frágil" />
                    </div>
                  </div>
                  <label className="inline-flex w-fit items-center gap-2 text-[10px] text-muted-foreground">
                    <span>Color de línea</span>
                    <input type="color" value={line.color} onChange={(event) => updateLine(line.id, { color: event.target.value })} aria-label={`Color de línea ${index + 1}`} className="h-8 w-10 cursor-pointer border border-white/10 bg-background p-0.5" />
                  </label>
                </div>
              </article>
            ))}
          </div>
        </section>

        <aside className="min-w-0 border border-white/10 bg-[#0c0c0c]">
          <div className="flex flex-wrap items-end justify-between gap-3 border-b border-white/10 px-4 py-4">
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.12em] text-muted-foreground">02 / Inspecciona el plan</p>
              <h2 className="mt-2 font-serif text-2xl">Vista de estiba</h2>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <span className="border border-white/10 px-2 py-1 font-mono text-[10px] uppercase tracking-wider text-muted-foreground">{container.shortName}</span>
              <span className="font-mono text-[10px] text-muted-foreground">{visibleCount} / {plan.placements.length} bultos</span>
            </div>
          </div>
          <div className="relative h-[340px] overflow-hidden bg-[#090a0c] sm:h-[380px]">
            <ContainerLoadScene container={container} placements={plan.placements} visibleCount={visibleCount} className="z-[1]" />
          </div>
          <div className="border-t border-white/10 p-4">
            <div className="flex flex-wrap items-center gap-2">
              <button type="button" onClick={() => setPlaying(true)} disabled={playing} aria-label="Reproducir secuencia" className="focus-ring inline-flex h-9 items-center gap-2 border border-white/10 px-3 text-xs font-medium disabled:opacity-40"><Play className="h-3.5 w-3.5" /> Reproducir</button>
              <button type="button" onClick={() => setPlaying(false)} disabled={!playing} aria-label="Pausar secuencia" className="focus-ring inline-flex h-9 w-9 items-center justify-center border border-white/10 text-muted-foreground disabled:opacity-40"><Pause className="h-3.5 w-3.5" /></button>
              <button type="button" onClick={() => { setPlaying(false); setVisibleCount(0); }} aria-label="Reiniciar secuencia" className="focus-ring inline-flex h-9 w-9 items-center justify-center border border-white/10 text-muted-foreground"><RotateCcw className="h-3.5 w-3.5" /></button>
              <span className="ml-auto font-mono text-[10px] text-muted-foreground">{playing ? 'Cargando secuencia' : 'Secuencia de carga'}</span>
            </div>
            <div className="mt-4 flex items-center gap-3 font-mono text-[10px] text-muted-foreground">
              <span className="shrink-0">{String(visibleCount).padStart(2, '0')}</span>
              <input type="range" min="0" max={plan.placements.length} value={visibleCount} onChange={(event) => { setPlaying(false); setVisibleCount(Number(event.target.value)); }} aria-label="Recorrer colocaciones de carga" className="h-1 min-w-0 flex-1 cursor-pointer accent-[#2f80ff]" />
              <span className="shrink-0">{String(plan.placements.length).padStart(2, '0')}</span>
            </div>
            <p className="mt-3 flex items-start gap-2 text-[11px] leading-relaxed text-muted-foreground">
              <Info className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#2f80ff]" />
              Vista estimada; confirma medidas, distribución de peso y requisitos de sujeción antes de cargar.
            </p>
          </div>
          <div className="grid grid-cols-2 border-t border-white/10">
            <div className="border-r border-white/10 p-4">
              <p className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">Piezas colocadas</p>
              <p className="mt-2 text-2xl font-semibold">{plan.loadedPieces}<span className="ml-1 text-xs font-normal text-muted-foreground">/ {plan.totalPieces}</span></p>
            </div>
            <div className="p-4">
              <p className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">Sin colocar</p>
              <p className="mt-2 text-2xl font-semibold">{plan.unplacedPieces}</p>
            </div>
          </div>
          <div className="border-t border-white/10 p-4 text-[11px] text-muted-foreground">
            <Truck className="mr-2 inline h-3.5 w-3.5 text-[#2f80ff]" />
            {plan.volumeUtilizationPercent.toFixed(1)}% del volumen · {plan.weightUtilizationPercent.toFixed(1)}% de carga útil
          </div>
        </aside>
      </div>
    </main>
  );
}
