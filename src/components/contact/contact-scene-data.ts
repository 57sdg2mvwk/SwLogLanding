import {
  calculateContainerLoadPlan,
  containerPresets,
  type CargoItemSpec,
} from '../../lib/containerLoadPlanner';

const container =
  containerPresets.find((preset) => preset.id === '40-high-cube') ?? containerPresets[0];

const sampleCargo: CargoItemSpec[] = [
  {
    id: 'contact-pallets',
    name: 'Pallet de producto',
    group: 'Palets',
    quantity: 8,
    lengthCm: 120,
    widthCm: 80,
    heightCm: 100,
    weightKg: 280,
    color: '#8fb3de',
    canRotate: true,
    canTilt: false,
    stackable: true,
    fragile: false,
  },
  {
    id: 'contact-cartons',
    name: 'Cajas de repuestos',
    group: 'Repuestos',
    quantity: 5,
    lengthCm: 60,
    widthCm: 40,
    heightCm: 35,
    weightKg: 18,
    color: '#df9d4e',
    canRotate: true,
    canTilt: true,
    stackable: true,
    fragile: false,
  },
];

export const contactScene = {
  container,
  placements: calculateContainerLoadPlan(container, sampleCargo).placements,
};
