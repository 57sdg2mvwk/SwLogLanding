import {
  useRef,
  type PointerEvent,
  type ReactNode,
} from 'react';
import './DeveloperTerminal.css';

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
  {
    number: '08',
    content: (
      <>
        <span className="developer-terminal__keyword">const</span> event = shipment.events.latest()
      </>
    ),
  },
  {
    number: '09',
    content: (
      <>
        <span className="developer-terminal__keyword">await</span> workspace.audit.record(event)
      </>
    ),
  },
];

export function DeveloperTerminal() {
  const terminalRef = useRef<HTMLDivElement>(null);

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
      onPointerMove={handlePointerMove}
    >
      <div className="developer-terminal__background" aria-hidden="true" />

      <div className="developer-terminal__content">
        <header className="developer-terminal__header">
          <div className="developer-terminal__window" aria-hidden="true">
            <span />
            <span />
            <span />
          </div>
          <div className="developer-terminal__brand">
            <span className="developer-terminal__brand-mark" aria-hidden="true" />
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
