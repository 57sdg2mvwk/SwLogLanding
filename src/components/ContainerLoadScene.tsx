import { useEffect, useRef, useState } from 'react';
import { Maximize2, RotateCcw, RotateCw, ZoomIn, ZoomOut } from 'lucide-react';
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import type { CargoPlacement, ContainerPreset } from '../lib/containerLoadPlanner';

const EPSILON = 0.001;

type ContainerLoadSceneProps = {
  container: ContainerPreset;
  placements: CargoPlacement[];
  visibleCount: number;
  className?: string;
};

function disposeGroup(group: THREE.Group) {
  for (const child of [...group.children]) {
    child.traverse((node) => {
      if (node instanceof THREE.Mesh || node instanceof THREE.LineSegments) {
        node.geometry.dispose();
        const materials = Array.isArray(node.material) ? node.material : [node.material];
        materials.forEach((material) => material.dispose());
      }
    });
    group.remove(child);
  }
}

function fitCamera(
  camera: THREE.PerspectiveCamera,
  controls: OrbitControls,
  container: ContainerPreset,
  direction?: THREE.Vector3,
) {
  const length = container.lengthCm / 100;
  const width = container.widthCm / 100;
  const height = container.heightCm / 100;
  const center = new THREE.Vector3(length / 2, height / 2, width / 2);
  const verticalFov = THREE.MathUtils.degToRad(camera.fov);
  const horizontalFov = 2 * Math.atan(Math.tan(verticalFov / 2) * Math.max(camera.aspect, 0.1));
  const projectedWidth = length * 0.94 + width * 0.4;
  const projectedHeight = height * 0.94 + length * 0.27 + width * 0.25;
  const distance = Math.max(
    projectedWidth / (2 * Math.tan(horizontalFov / 2)),
    projectedHeight / (2 * Math.tan(verticalFov / 2)),
  ) * 1.16;
  const viewDirection =
    direction?.lengthSq()
      ? direction.clone().normalize()
      : new THREE.Vector3(0.58, 0.38, 1).normalize();

  camera.position.copy(center).addScaledVector(viewDirection, distance);
  camera.near = Math.max(0.01, length / 1000);
  camera.far = Math.max(150, length * 8);
  camera.updateProjectionMatrix();
  controls.target.copy(center);
  controls.minDistance = Math.max(1.8, length * 0.16);
  controls.maxDistance = Math.max(20, length * 3.2);
  controls.update();
}

function SceneFallback({
  container,
  placements,
  visibleCount,
}: Pick<ContainerLoadSceneProps, 'container' | 'placements' | 'visibleCount'>) {
  const visiblePlacements = placements.slice(0, visibleCount);

  return (
    <svg
      viewBox="0 0 860 500"
      className="absolute inset-0 h-full w-full"
      role="img"
      aria-label={`Vista esquemática de ${visiblePlacements.length} bultos dentro de ${container.name}`}
    >
      <defs>
        <linearGradient id="load-plan-floor" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor="#2f80ff" stopOpacity="0.09" />
          <stop offset="100%" stopColor="#2f80ff" stopOpacity="0.015" />
        </linearGradient>
      </defs>
      <g fill="none" stroke="currentColor" strokeOpacity="0.38" strokeWidth="1.4">
        <path d="M88 365 708 365 790 314 170 314Z" fill="url(#load-plan-floor)" />
        <path d="M88 365V188l82-50v176" />
        <path d="M708 365V188l82-50v176" />
        <path d="M88 188 708 188 790 138 170 138Z" />
        <path d="M170 138 790 138" strokeDasharray="5 6" />
      </g>
      <g stroke="currentColor" strokeOpacity="0.55" strokeWidth="1">
        {visiblePlacements.map((placement) => {
          const x =
            88 +
            (placement.xCm / container.lengthCm) * 620 +
            (placement.yCm / container.widthCm) * 82;
          const baseY =
            365 -
            (placement.zCm / container.heightCm) * 177 -
            (placement.xCm / container.lengthCm) * 50 -
            (placement.yCm / container.widthCm) * 50;
          const width = (placement.lengthCm / container.lengthCm) * 620;
          const depthX = (placement.widthCm / container.widthCm) * 82;
          const depthY = (placement.widthCm / container.widthCm) * 50;
          const height = (placement.heightCm / container.heightCm) * 177;
          const top = baseY - height;
          const color = placement.color || '#2f80ff';

          return (
            <g key={placement.id}>
              <path
                d={`M${x} ${top}h${width}v${height}H${x}Z`}
                fill={color}
                fillOpacity="0.22"
              />
              <path
                d={`M${x + width} ${top}l${depthX} ${-depthY}v${height}l${-depthX} ${depthY}Z`}
                fill={color}
                fillOpacity="0.32"
              />
              <path
                d={`M${x} ${top}l${depthX} ${-depthY}h${width}l${-depthX} ${depthY}Z`}
                fill={color}
                fillOpacity="0.42"
              />
            </g>
          );
        })}
      </g>
      {visiblePlacements.length === 0 && (
        <g
          fill="none"
          stroke="#2f80ff"
          strokeOpacity="0.7"
          strokeWidth="1.5"
          transform="translate(370 230)"
        >
          <path d="M0 18 38 0 78 18 39 38Z" />
          <path d="M0 18v42l39 22V38M78 18v42L39 82" />
          <path d="M39 38v44" stroke="#d06c78" />
        </g>
      )}
      <title>{container.name}: {visiblePlacements.length} bultos cargados</title>
    </svg>
  );
}

export function ContainerLoadScene({
  container,
  placements,
  visibleCount,
  className = '',
}: ContainerLoadSceneProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const containerGroupRef = useRef<THREE.Group | null>(null);
  const cargoGroupRef = useRef<THREE.Group | null>(null);
  const pieceGroupsRef = useRef<THREE.Group[]>([]);
  const visibleCountRef = useRef(visibleCount);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const controlsRef = useRef<OrbitControls | null>(null);
  const invalidateRef = useRef<() => void>(() => {});
  const [webglUnavailable, setWebglUnavailable] = useState(false);
  const containerRef = useRef(container);
  containerRef.current = container;

  useEffect(() => {
    const canvas = canvasRef.current;
    const wrapper = wrapperRef.current;
    if (!canvas || !wrapper) return;

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        canvas,
        alpha: true,
        antialias: true,
        powerPreference: 'low-power',
      });
    } catch {
      setWebglUnavailable(true);
      return;
    }

    setWebglUnavailable(false);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.5));
    renderer.setClearColor(0x000000, 0);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(35, 1, 0.05, 500);
    const containerGroup = new THREE.Group();
    const cargoGroup = new THREE.Group();
    scene.add(containerGroup, cargoGroup);
    scene.add(new THREE.HemisphereLight(0xffffff, 0x8b919a, 1.55));

    const keyLight = new THREE.DirectionalLight(0xffffff, 2.1);
    keyLight.position.set(8, 14, 10);
    scene.add(keyLight);
    const fillLight = new THREE.DirectionalLight(0xb9d3ff, 0.72);
    fillLight.position.set(-8, 6, -8);
    scene.add(fillLight);

    const controls = new OrbitControls(camera, canvas);
    controls.enableRotate = true;
    controls.enableZoom = true;
    controls.enableDamping = true;
    controls.dampingFactor = 0.075;
    controls.enablePan = false;
    controls.minPolarAngle = 0.18;
    controls.maxPolarAngle = Math.PI * 0.46;

    sceneRef.current = scene;
    containerGroupRef.current = containerGroup;
    cargoGroupRef.current = cargoGroup;
    pieceGroupsRef.current = [];
    cameraRef.current = camera;
    controlsRef.current = controls;

    const resize = () => {
      const { width, height } = wrapper.getBoundingClientRect();
      if (!width || !height) return;
      renderer.setSize(width, height, false);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      const offset = camera.position.clone().sub(controls.target);
      fitCamera(
        camera,
        controls,
        containerRef.current,
        offset.lengthSq() > EPSILON ? offset.normalize() : undefined,
      );
      invalidate();
    };

    let frame = 0;
    const render = () => {
      frame = 0;
      controls.update();
      renderer.render(scene, camera);
    };
    const invalidate = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(render);
    };
    controls.addEventListener('change', invalidate);
    invalidateRef.current = invalidate;

    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(wrapper);
    resize();
    invalidate();

    return () => {
      window.cancelAnimationFrame(frame);
      resizeObserver.disconnect();
      controls.removeEventListener('change', invalidate);
      controls.dispose();
      disposeGroup(containerGroup);
      disposeGroup(cargoGroup);
      renderer.dispose();
      renderer.forceContextLoss();
      scene.clear();
      sceneRef.current = null;
      containerGroupRef.current = null;
      cargoGroupRef.current = null;
      pieceGroupsRef.current = [];
      cameraRef.current = null;
      controlsRef.current = null;
      invalidateRef.current = () => {};
    };
  }, []);

  useEffect(() => {
    const scene = sceneRef.current;
    const contents = containerGroupRef.current;
    const camera = cameraRef.current;
    const controls = controlsRef.current;
    if (!scene || !contents || !camera || !controls) return;

    disposeGroup(contents);

    const length = container.lengthCm / 100;
    const width = container.widthCm / 100;
    const height = container.heightCm / 100;
    const center = new THREE.Vector3(length / 2, height / 2, width / 2);
    const currentDirection = camera.position.clone().sub(controls.target);
    fitCamera(
      camera,
      controls,
      container,
      currentDirection.lengthSq() > EPSILON ? currentDirection.normalize() : undefined,
    );

    const containerGeometry = new THREE.BoxGeometry(length, height, width);
    const shell = new THREE.Mesh(
      containerGeometry,
      new THREE.MeshBasicMaterial({
        color: 0x9aa3ad,
        transparent: true,
        opacity: 0.035,
        side: THREE.BackSide,
        depthWrite: false,
      }),
    );
    shell.position.copy(center);
    contents.add(shell);

    const edges = new THREE.LineSegments(
      new THREE.EdgesGeometry(new THREE.BoxGeometry(length, height, width)),
      new THREE.LineBasicMaterial({
        color: 0x687482,
        transparent: true,
        opacity: 0.68,
      }),
    );
    edges.position.copy(center);
    contents.add(edges);

    const floorPoints: THREE.Vector3[] = [];
    for (let x = 0; x <= length + EPSILON; x += 2) {
      floorPoints.push(new THREE.Vector3(x, 0.012, 0), new THREE.Vector3(x, 0.012, width));
    }
    for (let z = 0; z <= width + EPSILON; z += 0.5) {
      floorPoints.push(new THREE.Vector3(0, 0.012, z), new THREE.Vector3(length, 0.012, z));
    }
    const floorGrid = new THREE.LineSegments(
      new THREE.BufferGeometry().setFromPoints(floorPoints),
      new THREE.LineBasicMaterial({
        color: 0x84909d,
        transparent: true,
        opacity: 0.13,
      }),
    );
    contents.add(floorGrid);
    invalidateRef.current();
  }, [container]);

  useEffect(() => {
    visibleCountRef.current = visibleCount;
    pieceGroupsRef.current.forEach((pieceGroup, index) => {
      pieceGroup.visible = index < visibleCount;
    });
    invalidateRef.current();
  }, [visibleCount]);

  useEffect(() => {
    const contents = cargoGroupRef.current;
    if (!contents) return;

    disposeGroup(contents);
    const pieceGroups: THREE.Group[] = [];

    for (const placement of placements) {
      const boxLength = placement.lengthCm / 100;
      const boxWidth = placement.widthCm / 100;
      const boxHeight = placement.heightCm / 100;
      const seam = Math.min(0.012, boxLength * 0.015, boxWidth * 0.015, boxHeight * 0.015);
      const visibleLength = Math.max(0.025, boxLength - seam * 2);
      const visibleWidth = Math.max(0.025, boxWidth - seam * 2);
      const visibleHeight = Math.max(0.025, boxHeight - seam * 2);
      const color = new THREE.Color(placement.color || '#2f80ff');
      const pieceGroup = new THREE.Group();
      const box = new THREE.Mesh(
        new THREE.BoxGeometry(visibleLength, visibleHeight, visibleWidth),
        new THREE.MeshStandardMaterial({
          color: color.clone().multiplyScalar(0.86),
          roughness: 0.72,
          metalness: 0.005,
        }),
      );
      box.position.set(
        placement.xCm / 100 + boxLength / 2,
        placement.zCm / 100 + boxHeight / 2,
        placement.yCm / 100 + boxWidth / 2,
      );
      pieceGroup.add(box);

      const outlines = new THREE.LineSegments(
        new THREE.EdgesGeometry(new THREE.BoxGeometry(visibleLength, visibleHeight, visibleWidth)),
        new THREE.LineBasicMaterial({
          color: 0x1c2939,
          transparent: true,
          opacity: 0.82,
        }),
      );
      outlines.position.copy(box.position);
      pieceGroup.add(outlines);
      pieceGroup.visible = pieceGroups.length < visibleCountRef.current;
      contents.add(pieceGroup);
      pieceGroups.push(pieceGroup);
    }
    pieceGroupsRef.current = pieceGroups;
    invalidateRef.current();
  }, [placements]);

  const rotateView = (radians: number) => {
    const camera = cameraRef.current;
    const controls = controlsRef.current;
    if (!camera || !controls) return;
    const offset = camera.position.clone().sub(controls.target);
    const spherical = new THREE.Spherical().setFromVector3(offset);
    spherical.theta += radians;
    spherical.phi = THREE.MathUtils.clamp(
      spherical.phi,
      controls.minPolarAngle,
      controls.maxPolarAngle,
    );
    camera.position.copy(controls.target).add(new THREE.Vector3().setFromSpherical(spherical));
    controls.update();
    invalidateRef.current();
  };

  const zoomView = (factor: number) => {
    const camera = cameraRef.current;
    const controls = controlsRef.current;
    if (!camera || !controls) return;
    const offset = camera.position.clone().sub(controls.target);
    const distance = THREE.MathUtils.clamp(
      offset.length() * factor,
      controls.minDistance,
      controls.maxDistance,
    );
    camera.position.copy(controls.target).add(offset.normalize().multiplyScalar(distance));
    controls.update();
    invalidateRef.current();
  };

  const resetView = () => {
    const camera = cameraRef.current;
    const controls = controlsRef.current;
    if (!camera || !controls) return;
    fitCamera(camera, controls, container);
    invalidateRef.current();
  };

  return (
    <div
      ref={wrapperRef}
      className={`relative h-full min-h-[340px] w-full overflow-hidden ${className}`}
    >
      <canvas
        ref={canvasRef}
        className={`absolute inset-0 h-full w-full ${webglUnavailable ? 'invisible' : ''}`}
        aria-hidden="true"
      />
      {webglUnavailable && (
        <SceneFallback
          container={container}
          placements={placements}
          visibleCount={visibleCount}
        />
      )}
      <div className="absolute right-3 top-3 z-[3] flex items-center gap-1 border border-border bg-background/90 p-1 shadow-sm backdrop-blur-sm">
        <button
          type="button"
          onClick={() => rotateView(-Math.PI / 10)}
          disabled={webglUnavailable}
          title="Girar a la izquierda"
          aria-label="Girar la vista a la izquierda"
          className="focus-ring grid size-8 place-items-center text-muted-foreground transition-colors hover:bg-muted hover:text-foreground disabled:cursor-not-allowed disabled:opacity-40"
        >
          <RotateCcw className="size-4" aria-hidden="true" />
        </button>
        <button
          type="button"
          onClick={() => rotateView(Math.PI / 10)}
          disabled={webglUnavailable}
          title="Girar a la derecha"
          aria-label="Girar la vista a la derecha"
          className="focus-ring grid size-8 place-items-center text-muted-foreground transition-colors hover:bg-muted hover:text-foreground disabled:cursor-not-allowed disabled:opacity-40"
        >
          <RotateCw className="size-4" aria-hidden="true" />
        </button>
        <span className="mx-0.5 h-5 w-px bg-border" aria-hidden="true" />
        <button
          type="button"
          onClick={() => zoomView(0.82)}
          disabled={webglUnavailable}
          title="Acercar"
          aria-label="Acercar la vista"
          className="focus-ring grid size-8 place-items-center text-muted-foreground transition-colors hover:bg-muted hover:text-foreground disabled:cursor-not-allowed disabled:opacity-40"
        >
          <ZoomIn className="size-4" aria-hidden="true" />
        </button>
        <button
          type="button"
          onClick={() => zoomView(1.22)}
          disabled={webglUnavailable}
          title="Alejar"
          aria-label="Alejar la vista"
          className="focus-ring grid size-8 place-items-center text-muted-foreground transition-colors hover:bg-muted hover:text-foreground disabled:cursor-not-allowed disabled:opacity-40"
        >
          <ZoomOut className="size-4" aria-hidden="true" />
        </button>
        <span className="mx-0.5 h-5 w-px bg-border" aria-hidden="true" />
        <button
          type="button"
          onClick={resetView}
          disabled={webglUnavailable}
          title="Ajustar vista"
          aria-label="Restablecer la vista 3D"
          className="focus-ring grid size-8 place-items-center text-muted-foreground transition-colors hover:bg-muted hover:text-foreground disabled:cursor-not-allowed disabled:opacity-40"
        >
          <Maximize2 className="size-4" aria-hidden="true" />
        </button>
      </div>
      <span className="pointer-events-none absolute bottom-3 right-3 z-[2] border border-border bg-background/85 px-2 py-1 font-mono text-[9px] uppercase tracking-wider text-muted-foreground backdrop-blur-sm">
        {webglUnavailable ? 'Vista esquemática · giro 3D no disponible' : 'Arrastra para girar · rueda o pellizca para acercar'}
      </span>
      <span className="sr-only" aria-live="polite">
        Vista 3D: {Math.min(visibleCount, placements.length)} de {placements.length} bultos.
      </span>
    </div>
  );
}
