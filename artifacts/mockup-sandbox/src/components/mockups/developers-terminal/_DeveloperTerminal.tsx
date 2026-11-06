import {
  lazy,
  Suspense,
  useRef,
  useState,
  type PointerEvent,
  type ReactNode,
} from 'react';
import './DeveloperTerminal.css';

const ShapeWaves = lazy(() => import('./_ShapeWaves'));

const codeLines: { number: string; content: ReactNode }[] = [
  {
    number: '01',
    content: (
      <>
        <span className="developer-terminal__keyword">const</span> shipment ={' '}
        <span className="developer-terminal__keyword">await</span> workspace.load(
        <span className="developer-terminal__string">"WS-2048"</span>)
      </>
    ),
  },
  {
    number: '02',
    content: (
      <>
        <span className="developer-terminal__keyword">const</span> route = shipment.route
      </>
    ),
  },
  {
    number: '03',
    content: (
      <>
        <span className="developer-terminal__keyword">await</span> shipment.inspection.attach({'{'}
      </>
    ),
  },
  {
    number: '04',
    content: (
      <>
        {'  '}origin: <span className="developer-terminal__string">"Ningbo"</span>,
      </>
    ),
  },
  {
    number: '05',
    content: (
      <>
        {'  '}report: <span className="developer-terminal__string">"inspection.pdf"</span>,
      </>
    ),
  },
  { number: '06', content: '});' },
  {
    number: '07',
    content: (
      <>
        <span className="developer-terminal__keyword">await</span> workspace.sync(shipment)
      </>
    ),
  },
];

export function DeveloperTerminal() {
  const terminalRef = useRef<HTMLDivElement>(null);
  const [wavesFailed, setWavesFailed] = useState(false);

  const handlePointerMove = (event: PointerEvent<HTMLDivElement>) => {
    const terminal = terminalRef.current;
    if (!terminal) return;
    const bounds = terminal.getBoundingClientRect();
    const x = ((event.clientX - bounds.left) / bounds.width) * 100;
    const y = ((event.clientY - bounds.top) / bounds.height) * 100;
    terminal.style.setProperty('--terminal-pointer-x', `${x.toFixed(1)}%`);
    terminal.style.setProperty('--terminal-pointer-y', `${y.toFixed(1)}%`);
  };

  return (
    <div
      ref={terminalRef}
      className="developer-terminal"
      role="group"
      aria-label="Example shipment integration terminal"
      data-wave-fallback={wavesFailed}
      onPointerMove={handlePointerMove}
    >
      <div className="developer-terminal__fallback" aria-hidden="true" />
      {wavesFailed && (
        <svg
          className="developer-terminal__fallback-waves"
          viewBox="0 0 900 420"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <path className="developer-terminal__fallback-wave developer-terminal__fallback-wave--one" d="M-70 300C70 250 110 120 250 130s190 150 330 90 210-150 390-80" />
          <path className="developer-terminal__fallback-wave developer-terminal__fallback-wave--two" d="M-70 340c150-60 180-170 340-150s170 170 330 120 210-110 370-40" />
          <path className="developer-terminal__fallback-wave developer-terminal__fallback-wave--three" d="M-40 250c100-20 140-100 260-80s180 110 300 70 210-110 370-60" />
        </svg>
      )}
      <Suspense fallback={null}>
        <ShapeWaves
          text="</>"
          fontFamily='Geist Mono, "SFMono-Regular", monospace'
          fontWeight={600}
          textSize={0.44}
          shapes="mixed"
          cellSize={11}
          dotSize={0.52}
          color="#52657b"
          hoverColor="#4b8eff"
          backgroundColor="#080b11"
          speed={0.55}
          scale={1.15}
          contrast={0.9}
          brightness={0.34}
          flow={0}
          direction={0}
          fade={0.72}
          interactive={true}
          splashRadius={54}
          splashStrength={0.32}
          glow={0.16}
          intro={true}
          introDuration={1.4}
          onError={(error: Error) => {
            setWavesFailed(true);
            console.info('ShapeWaves WebGPU unavailable; using the animated CSS fallback.', error);
          }}
          className="developer-terminal__waves"
        />
      </Suspense>

      <div className="developer-terminal__content">
        <header className="developer-terminal__header">
          <div className="developer-terminal__window" aria-hidden="true">
            <span />
            <span />
            <span />
          </div>
          <div className="developer-terminal__brand">
            <span className="developer-terminal__brand-mark">W</span>
            <span>WiseShips SDK</span>
          </div>
          <span className="developer-terminal__session">SAMPLE ENVIRONMENT</span>
        </header>

        <div className="developer-terminal__filebar">
          <span className="developer-terminal__file">
            <span className="developer-terminal__file-dot" />
            shipment-flow.ts
          </span>
          <span>EXAMPLE ONLY · NOT CONNECTED</span>
        </div>

        <pre className="developer-terminal__code" aria-label="Example TypeScript flow">
          <code>
            {codeLines.map((line) => (
              <span className="developer-terminal__line" key={line.number}>
                <span className="developer-terminal__line-number">{line.number}</span>
                <span className="developer-terminal__line-content">{line.content}</span>
              </span>
            ))}
          </code>
        </pre>

        <div className="developer-terminal__output">
          <div className="developer-terminal__command">
            <span aria-hidden="true">$</span> workspace verify WS-2048
          </div>
          <div className="developer-terminal__result">
            <span className="developer-terminal__result-mark" aria-hidden="true">✓</span>
            Shipment and inspection linked
            <span className="developer-terminal__result-note">· sample data</span>
          </div>
        </div>

        <footer className="developer-terminal__footer">
          <span><i aria-hidden="true" /> READY</span>
          <span>WS-2048 / ROUTE SYNCED</span>
          <span className="developer-terminal__cursor" aria-hidden="true" />
        </footer>
      </div>
    </div>
  );
}
