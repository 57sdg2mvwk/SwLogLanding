import { Box } from 'lucide-react';
import { ContainerLoadScene } from './ContainerLoadScene';
import { calculateContainerLoadPlan, containerPresets, type CargoItemSpec } from './containerLoadPlanner';
import './_group.css';

const container = containerPresets.find((preset) => preset.id === '45-high-cube')!;
const cargo: CargoItemSpec[] = [
  {
    id: 'europallet',
    name: 'Palet europeo',
    group: 'Palets',
    quantity: 40,
    lengthCm: 120,
    widthCm: 80,
    heightCm: 100,
    weightKg: 300,
    color: '#3b82f6',
    canRotate: true,
    canTilt: false,
    stackable: true,
    fragile: false,
  },
  {
    id: 'carton',
    name: 'Cartón / caja',
    group: 'Cartones',
    quantity: 1,
    lengthCm: 60,
    widthCm: 40,
    heightCm: 35,
    weightKg: 18,
    color: '#f97316',
    canRotate: true,
    canTilt: true,
    stackable: true,
    fragile: false,
  },
];
const plan = calculateContainerLoadPlan(container, cargo);

export function Current() {
  return (
    <main className="min-h-screen bg-[#0a0a0a] px-5 py-6 font-sans text-[#fafafa] sm:px-8">
      <div className="mx-auto max-w-[1180px]">
        <section className="overflow-hidden rounded-xl border border-white/10 bg-[#0c0c0c]">
          <header className="flex h-12 items-center justify-between border-b border-white/10 px-4">
            <div className="flex items-center gap-2 text-sm font-medium">
              <Box className="size-4 text-blue-500" />
              Plan de carga
            </div>
            <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-white/45">
              {container.shortName} · {plan.placements.length} bultos
            </span>
          </header>

          <div className="relative h-[420px] overflow-hidden bg-[#090a0c] sm:h-[500px]">
            <ContainerLoadScene
              container={container}
              placements={plan.placements}
              visibleCount={plan.placements.length}
              className="h-full w-full"
            />
          </div>

          <footer className="flex flex-wrap items-center justify-between gap-3 border-t border-white/10 px-4 py-3 text-xs text-white/50">
            <span>
              Vista previa del acomodo · {container.lengthCm} × {container.widthCm} × {container.heightCm} cm
            </span>
            <span>La estiba se muestra a escala · arrastra para girar</span>
          </footer>
        </section>
      </div>
    </main>
  );
}
