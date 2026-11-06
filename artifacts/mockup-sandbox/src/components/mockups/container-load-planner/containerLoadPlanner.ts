export interface ContainerPreset {
  id: string;
  name: string;
  shortName: string;
  lengthCm: number;
  widthCm: number;
  heightCm: number;
  maxPayloadKg: number;
}

export const containerPresets: ContainerPreset[] = [
  {
    id: '20-standard',
    name: 'Contenedor 20′ estándar',
    shortName: '20′ estándar',
    lengthCm: 590,
    widthCm: 235,
    heightCm: 239,
    maxPayloadKg: 28_200,
  },
  {
    id: '40-standard',
    name: 'Contenedor 40′ estándar',
    shortName: '40′ estándar',
    lengthCm: 1_203,
    widthCm: 235,
    heightCm: 239,
    maxPayloadKg: 26_700,
  },
  {
    id: '40-high-cube',
    name: 'Contenedor 40′ High Cube',
    shortName: '40′ High Cube',
    lengthCm: 1_203,
    widthCm: 235,
    heightCm: 270,
    maxPayloadKg: 26_500,
  },
  {
    id: '45-high-cube',
    name: 'Contenedor 45′ High Cube',
    shortName: '45′ High Cube',
    lengthCm: 1_356,
    widthCm: 235,
    heightCm: 270,
    maxPayloadKg: 25_600,
  },
  {
    id: 'semi-trailer',
    name: 'Semirremolque 13,6 m',
    shortName: 'Semirremolque',
    lengthCm: 1_360,
    widthCm: 245,
    heightCm: 270,
    maxPayloadKg: 24_000,
  },
  {
    id: 'rigid-truck',
    name: 'Camión rígido 7,2 m',
    shortName: 'Camión rígido',
    lengthCm: 720,
    widthCm: 245,
    heightCm: 240,
    maxPayloadKg: 10_000,
  },
];

export interface CargoItemSpec {
  id: string;
  name: string;
  group: string;
  quantity: number;
  lengthCm: number;
  widthCm: number;
  heightCm: number;
  weightKg: number;
  color: string;
  canRotate: boolean;
  canTilt: boolean;
  stackable: boolean;
  fragile: boolean;
}

export interface CargoPlacement {
  id: string;
  itemId: string;
  itemName: string;
  group: string;
  pieceNumber: number;
  xCm: number;
  yCm: number;
  zCm: number;
  lengthCm: number;
  widthCm: number;
  heightCm: number;
  weightKg: number;
  color: string;
}

export interface UnplacedCargoGroup {
  itemId: string;
  itemName: string;
  quantity: number;
  reason: 'payload' | 'space';
}

export interface ContainerLoadPlan {
  placements: CargoPlacement[];
  unplaced: UnplacedCargoGroup[];
  totalPieces: number;
  loadedPieces: number;
  unplacedPieces: number;
  containerVolumeM3: number;
  usedVolumeM3: number;
  volumeUtilizationPercent: number;
  usedWeightKg: number;
  weightUtilizationPercent: number;
}

interface FreeSpace {
  x: number;
  y: number;
  z: number;
  length: number;
  width: number;
  height: number;
}

interface CargoPiece {
  item: CargoItemSpec;
  pieceNumber: number;
  volume: number;
}

interface Orientation {
  length: number;
  width: number;
  height: number;
}

const EPSILON = 0.001;
export const MAX_PLANNER_PIECES = 300;

function getOrientations(item: CargoItemSpec): Orientation[] {
  const dimensions = [item.lengthCm, item.widthCm, item.heightCm];
  const permutations = [
    dimensions,
    ...(item.canRotate ? [[dimensions[1], dimensions[0], dimensions[2]]] : []),
    ...(item.canTilt
      ? [
          [dimensions[0], dimensions[2], dimensions[1]],
          [dimensions[2], dimensions[1], dimensions[0]],
        ]
      : []),
    ...(item.canRotate && item.canTilt
      ? [
          [dimensions[1], dimensions[2], dimensions[0]],
          [dimensions[2], dimensions[0], dimensions[1]],
        ]
      : []),
  ];
  const seen = new Set<string>();

  return permutations
    .filter(([length, width, height]) => {
      const key = `${length}:${width}:${height}`;
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    })
    .map(([length, width, height]) => ({ length, width, height }));
}

function fits(space: FreeSpace, box: Orientation) {
  return (
    box.length <= space.length + EPSILON &&
    box.width <= space.width + EPSILON &&
    box.height <= space.height + EPSILON
  );
}

function isContained(inner: FreeSpace, outer: FreeSpace) {
  return (
    inner.x >= outer.x - EPSILON &&
    inner.y >= outer.y - EPSILON &&
    inner.z >= outer.z - EPSILON &&
    inner.x + inner.length <= outer.x + outer.length + EPSILON &&
    inner.y + inner.width <= outer.y + outer.width + EPSILON &&
    inner.z + inner.height <= outer.z + outer.height + EPSILON
  );
}

function pruneFreeSpaces(spaces: FreeSpace[]) {
  const usable = spaces.filter(
    (space) =>
      space.length > EPSILON &&
      space.width > EPSILON &&
      space.height > EPSILON,
  );

  return usable.filter(
    (space, index) =>
      !usable.some(
        (other, otherIndex) =>
          index !== otherIndex &&
          isContained(space, other) &&
          (space.length * space.width * space.height <
            other.length * other.width * other.height - EPSILON ||
            otherIndex < index),
      ),
  );
}

function comparePlacementOptions(
  first: { space: FreeSpace; orientation: Orientation },
  second: { space: FreeSpace; orientation: Orientation },
) {
  const firstValues = [
    first.space.z,
    first.space.y,
    first.space.x,
    first.space.length * first.space.width * first.space.height -
      first.orientation.length * first.orientation.width * first.orientation.height,
  ];
  const secondValues = [
    second.space.z,
    second.space.y,
    second.space.x,
    second.space.length * second.space.width * second.space.height -
      second.orientation.length * second.orientation.width * second.orientation.height,
  ];

  for (let index = 0; index < firstValues.length; index += 1) {
    if (Math.abs(firstValues[index] - secondValues[index]) > EPSILON) {
      return firstValues[index] - secondValues[index];
    }
  }
  return 0;
}

export function calculateContainerLoadPlan(
  container: ContainerPreset,
  cargoItems: CargoItemSpec[],
): ContainerLoadPlan {
  const containerDimensions = [
    container.lengthCm,
    container.widthCm,
    container.heightCm,
    container.maxPayloadKg,
  ];
  if (containerDimensions.some((value) => !Number.isFinite(value) || value <= 0)) {
    throw new RangeError('Las dimensiones y la carga útil del contenedor deben ser mayores que cero.');
  }

  for (const item of cargoItems) {
    const itemDimensions = [
      item.quantity,
      item.lengthCm,
      item.widthCm,
      item.heightCm,
      item.weightKg,
    ];
    if (
      !item.name.trim() ||
      !item.group.trim() ||
      itemDimensions.some((value) => !Number.isFinite(value) || value <= 0) ||
      !Number.isInteger(item.quantity)
    ) {
      throw new RangeError(`Revisa la cantidad, las dimensiones y el peso de "${item.name || 'la carga'}".`);
    }
  }

  const totalPieces = cargoItems.reduce((sum, item) => sum + item.quantity, 0);
  if (totalPieces > MAX_PLANNER_PIECES) {
    throw new RangeError(`El plan admite hasta ${MAX_PLANNER_PIECES} piezas por cálculo.`);
  }

  const pieces: CargoPiece[] = cargoItems
    .flatMap((item) =>
      Array.from({ length: item.quantity }, (_, index) => ({
        item,
        pieceNumber: index + 1,
        volume: item.lengthCm * item.widthCm * item.heightCm,
      })),
    )
    .sort(
      (a, b) =>
        b.volume - a.volume ||
        b.item.weightKg - a.item.weightKg ||
        a.item.name.localeCompare(b.item.name, 'es'),
    );

  const freeSpaces: FreeSpace[] = [
    {
      x: 0,
      y: 0,
      z: 0,
      length: container.lengthCm,
      width: container.widthCm,
      height: container.heightCm,
    },
  ];
  const placements: CargoPlacement[] = [];
  const unplacedByReason = new Map<string, UnplacedCargoGroup>();
  let usedWeightKg = 0;

  for (const piece of pieces) {
    const { item } = piece;
    if (usedWeightKg + item.weightKg > container.maxPayloadKg + EPSILON) {
      const key = `${item.id}:payload`;
      const previous = unplacedByReason.get(key);
      unplacedByReason.set(key, {
        itemId: item.id,
        itemName: item.name,
        quantity: (previous?.quantity ?? 0) + 1,
        reason: 'payload',
      });
      continue;
    }

    let bestOption:
      | { spaceIndex: number; space: FreeSpace; orientation: Orientation }
      | undefined;

    for (let spaceIndex = 0; spaceIndex < freeSpaces.length; spaceIndex += 1) {
      const space = freeSpaces[spaceIndex];
      for (const orientation of getOrientations(item)) {
        if (!fits(space, orientation)) continue;
        const option = { spaceIndex, space, orientation };
        if (!bestOption || comparePlacementOptions(option, bestOption) < 0) {
          bestOption = option;
        }
      }
    }

    if (!bestOption) {
      const key = `${item.id}:space`;
      const previous = unplacedByReason.get(key);
      unplacedByReason.set(key, {
        itemId: item.id,
        itemName: item.name,
        quantity: (previous?.quantity ?? 0) + 1,
        reason: 'space',
      });
      continue;
    }

    const { space, orientation, spaceIndex } = bestOption;
    placements.push({
      id: `${item.id}-${piece.pieceNumber}`,
      itemId: item.id,
      itemName: item.name,
      group: item.group,
      pieceNumber: piece.pieceNumber,
      xCm: space.x,
      yCm: space.y,
      zCm: space.z,
      lengthCm: orientation.length,
      widthCm: orientation.width,
      heightCm: orientation.height,
      weightKg: item.weightKg,
      color: item.color,
    });
    usedWeightKg += item.weightKg;

    freeSpaces.splice(spaceIndex, 1);
    const remainingLength = space.length - orientation.length;
    const remainingWidth = space.width - orientation.width;
    const remainingHeight = space.height - orientation.height;

    if (remainingLength > EPSILON) {
      freeSpaces.push({
        x: space.x + orientation.length,
        y: space.y,
        z: space.z,
        length: remainingLength,
        width: space.width,
        height: space.height,
      });
    }
    if (remainingWidth > EPSILON) {
      freeSpaces.push({
        x: space.x,
        y: space.y + orientation.width,
        z: space.z,
        length: orientation.length,
        width: remainingWidth,
        height: space.height,
      });
    }
    if (item.stackable && !item.fragile && remainingHeight > EPSILON) {
      freeSpaces.push({
        x: space.x,
        y: space.y,
        z: space.z + orientation.height,
        length: orientation.length,
        width: orientation.width,
        height: remainingHeight,
      });
    }

    const prunedSpaces = pruneFreeSpaces(freeSpaces);
    freeSpaces.splice(0, freeSpaces.length, ...prunedSpaces);
  }

  const containerVolumeCm3 =
    container.lengthCm * container.widthCm * container.heightCm;
  const usedVolumeCm3 = placements.reduce(
    (sum, item) => sum + item.lengthCm * item.widthCm * item.heightCm,
    0,
  );
  const unplaced = Array.from(unplacedByReason.values());

  return {
    placements,
    unplaced,
    totalPieces,
    loadedPieces: placements.length,
    unplacedPieces: totalPieces - placements.length,
    containerVolumeM3: containerVolumeCm3 / 1_000_000,
    usedVolumeM3: usedVolumeCm3 / 1_000_000,
    volumeUtilizationPercent: (usedVolumeCm3 / containerVolumeCm3) * 100,
    usedWeightKg,
    weightUtilizationPercent: (usedWeightKg / container.maxPayloadKg) * 100,
  };
}
