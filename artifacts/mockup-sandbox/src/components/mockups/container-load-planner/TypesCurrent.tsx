import { useState } from 'react';
import { containerPresets, type ContainerPreset } from './containerLoadPlanner';
import './_group.css';

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

export function TypesCurrent() {
  const [containerId, setContainerId] = useState('45-high-cube');

  return (
    <main className="min-h-screen bg-[#0a0a0a] p-4 font-sans text-[#fafafa]">
      <section className="mx-auto max-w-[720px] border border-white/10 bg-[#0c0c0c] p-3 sm:p-4">
        <p className="mb-2 font-mono text-[10px] uppercase tracking-[0.12em] text-muted-foreground">
          Equipo / tipo de contenedor
        </p>
        <div className="grid auto-rows-fr grid-cols-2 gap-2 sm:grid-cols-3">
          {containerPresets.map((preset) => {
            const selected = preset.id === containerId;
            const volumeM3 = (preset.lengthCm * preset.widthCm * preset.heightCm) / 1_000_000;
            return (
              <button
                key={preset.id}
                type="button"
                aria-pressed={selected}
                onClick={() => setContainerId(preset.id)}
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
      </section>
    </main>
  );
}
