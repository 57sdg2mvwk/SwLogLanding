import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Gauge,
  Container,
  ClipboardCheck,
  UsersRound,
  Building2,
  Handshake,
  FileText,
  Search,
  Bell,
} from 'lucide-react';

const navItems = [
  { id: 'overview', label: 'Overview', icon: Gauge },
  { id: 'shipments', label: 'Shipments', icon: Container },
  { id: 'operations', label: 'Operations', icon: ClipboardCheck },
  { id: 'clients', label: 'Clients', icon: Building2 },
  { id: 'deals', label: 'Deals', icon: Handshake },
  { id: 'documents', label: 'Documents', icon: FileText },
];

const recentOperations = [
  {
    title: 'Inspection report received',
    context: 'WS-2048 · Manzanillo',
    time: '10:42',
    status: 'Ready',
  },
  {
    title: 'Vessel departed from origin',
    context: 'WS-2051 · Shenzhen → Veracruz',
    time: '10:18',
    status: 'In transit',
  },
  {
    title: 'Shipment documents approved',
    context: 'WS-2054 · Cima Imports',
    time: '09:56',
    status: 'Approved',
  },
  {
    title: 'Deal moved to proposal',
    context: 'DEAL-018 · Pacific Freight',
    time: '09:31',
    status: 'Proposal',
  },
];

const shipmentList = [
  {
    booking: 'WS-2048',
    container: 'MSCU 483192-4',
    route: 'Shenzhen → Manzanillo',
    client: 'Pacific Freight Co.',
    eta: 'Nov 22',
    status: 'In transit',
  },
  {
    booking: 'WS-2051',
    container: 'TGHU 902776-1',
    route: 'Yantian → Veracruz',
    client: 'Norte Logistics',
    eta: 'Nov 25',
    status: 'At origin',
  },
  {
    booking: 'WS-2054',
    container: 'FSCU 128603-7',
    route: 'Ningbo → Altamira',
    client: 'Cima Imports',
    eta: 'Dec 02',
    status: 'Docs pending',
  },
  {
    booking: 'WS-2058',
    container: 'MSKU 422781-0',
    route: 'Busan → Manzanillo',
    client: 'Pacific Freight Co.',
    eta: 'Dec 06',
    status: 'In transit',
  },
];

const operationsList = [
  {
    ref: 'WS-2048',
    operation: 'Origin inspection',
    location: 'Manzanillo, MX',
    owner: 'Inspection team',
    updated: '10:42',
    status: 'Report received',
  },
  {
    ref: 'WS-2051',
    operation: 'Vessel departure',
    location: 'Shenzhen, CN',
    owner: 'Forwarder team',
    updated: '10:18',
    status: 'Completed',
  },
  {
    ref: 'WS-2054',
    operation: 'Document review',
    location: 'Altamira, MX',
    owner: 'Client operations',
    updated: '09:56',
    status: 'Approved',
  },
  {
    ref: 'WS-2058',
    operation: 'Container arrival',
    location: 'Manzanillo, MX',
    owner: 'Forwarder team',
    updated: '09:31',
    status: 'In progress',
  },
];

const clientsList = [
  {
    company: 'Pacific Freight Co.',
    type: 'Freight forwarder',
    shipments: '08',
    openDeals: '02',
    nextStep: 'Proposal review',
  },
  {
    company: 'Norte Logistics',
    type: 'Freight forwarder',
    shipments: '06',
    openDeals: '01',
    nextStep: 'Update shipment plan',
  },
  {
    company: 'Cima Imports',
    type: 'Importer',
    shipments: '04',
    openDeals: '01',
    nextStep: 'Confirm documents',
  },
  {
    company: 'Harbor Origin Services',
    type: 'Inspection company',
    shipments: '03',
    openDeals: '02',
    nextStep: 'Inspection schedule',
  },
];

const dealsList = [
  {
    id: 'DEAL-018',
    name: 'Forwarding program',
    client: 'Pacific Freight Co.',
    stage: 'Proposal',
    nextStep: 'Review scope',
    updated: 'Today',
  },
  {
    id: 'DEAL-021',
    name: 'Origin inspection services',
    client: 'Cima Imports',
    stage: 'Qualified',
    nextStep: 'Confirm locations',
    updated: 'Today',
  },
  {
    id: 'DEAL-024',
    name: 'Container coordination',
    client: 'Norte Logistics',
    stage: 'Negotiation',
    nextStep: 'Prepare agreement',
    updated: 'Yesterday',
  },
  {
    id: 'DEAL-027',
    name: 'Inspection partnership',
    client: 'Harbor Origin Services',
    stage: 'Discovery',
    nextStep: 'Schedule meeting',
    updated: 'Yesterday',
  },
];

const documentsList = [
  {
    title: 'Origin inspection report',
    reference: 'WS-2048 · Manzanillo',
    type: 'Inspection',
    updated: 'Today · 10:42',
    status: 'Ready',
  },
  {
    title: 'Commercial invoice',
    reference: 'WS-2054 · Cima Imports',
    type: 'Shipment',
    updated: 'Today · 09:56',
    status: 'Approved',
  },
  {
    title: 'Service agreement',
    reference: 'DEAL-018 · Pacific Freight',
    type: 'Contract',
    updated: 'Yesterday',
    status: 'In review',
  },
  {
    title: 'Packing list',
    reference: 'WS-2051 · Norte Logistics',
    type: 'Shipment',
    updated: 'Yesterday',
    status: 'Received',
  },
];

export function DashboardMockup({
  onOpenCommandPalette,
}: {
  onOpenCommandPalette?: () => void;
}) {
  const [activeTab, setActiveTab] = useState('overview');
  const [timeRange, setTimeRange] = useState('30d');
  const activeSection = navItems.find((item) => item.id === activeTab)?.label ?? 'Overview';

  return (
    <section className="relative px-5 pb-24 sm:px-8 lg:px-10">
      <motion.div
        initial={{ opacity: 0, y: 24, scale: 0.985 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true, margin: '-50px' }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="mx-auto max-w-[1100px] overflow-hidden rounded-2xl border border-border/60 bg-background shadow-2xl shadow-black/[0.08]"
      >
        {/* Window Chrome Header */}
        <div className="relative flex h-7 items-center border-b border-border/60 px-2.5">
          <div className="flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
          </div>
          <span className="pointer-events-none absolute inset-x-0 text-center text-xs font-normal text-muted-foreground">
            WiseShips CRM · Demo workspace · Sample data
          </span>
        </div>

        {/* Window Body */}
        <div className="flex h-auto min-h-[560px] flex-col lg:flex-row">
          {/* Left Sidebar */}
          <aside className="hidden w-[212px] shrink-0 flex-col border-r border-border/60 bg-muted/20 lg:flex">
            <div className="flex h-14 items-center gap-2.5 border-b border-border/60 px-4">
              <span
                className="h-6 w-6 bg-foreground [clip-path:polygon(5px_0,100%_0,100%_calc(100%-5px),calc(100%-5px)_100%,0_100%,0_5px)]"
                aria-hidden="true"
              />
              <span className="text-[15px] font-semibold tracking-tight">WiseShips</span>
            </div>

            <nav className="flex flex-1 flex-col gap-0.5 p-3">
              <p className="px-2 pb-1.5 text-[10px] font-medium uppercase tracking-wider text-muted-foreground/70">
                Workspace
              </p>
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id)}
                    className={`flex items-center gap-2.5 rounded-md px-2.5 py-2 text-[13px] transition-colors cursor-pointer ${
                      isActive
                        ? 'bg-foreground/[0.06] font-medium text-foreground'
                        : 'text-muted-foreground hover:text-foreground'
                    }`}
                  >
                    <Icon className="h-[15px] w-[15px]" aria-hidden="true" />
                    {item.label}
                  </button>
                );
              })}
            </nav>

            <div className="border-t border-border/60 p-3">
              <div className="flex items-center gap-2 rounded-md border border-border/60 bg-background px-2.5 py-2">
                <span className="relative flex h-2 w-2 shrink-0">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-muted-foreground/40" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-muted-foreground" />
                </span>
                <span className="flex flex-col leading-tight">
                  <span className="text-[11px] font-medium">Sample workspace</span>
                  <span className="text-[10px] text-muted-foreground">Illustrative data</span>
                </span>
              </div>
            </div>
          </aside>

          {/* Main Dashboard Area */}
          <section className="flex min-w-0 flex-1 flex-col">
            {/* Top Toolbar */}
            <div className="flex h-14 shrink-0 items-center justify-between gap-3 border-b border-border/60 px-4 sm:px-5">
              <div className="flex min-w-0 flex-col">
                <h2 className="truncate text-sm font-semibold tracking-tight capitalize">
                  {activeTab === 'overview'
                    ? 'Operations Overview'
                    : activeSection}
                </h2>
                <p className="hidden text-[11px] text-muted-foreground sm:block">
                  Forwarder and origin-inspection workflows
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={onOpenCommandPalette}
                  className="hidden h-8 w-44 items-center gap-2 rounded-md border border-border/60 bg-muted/40 px-2.5 text-muted-foreground md:flex hover:border-border transition-colors cursor-pointer"
                >
                  <Search className="h-3.5 w-3.5" aria-hidden="true" />
                  <span className="truncate text-xs">Search shipments, clients, containers...</span>
                  <kbd className="ml-auto rounded border border-border/60 bg-background px-1 text-[10px] font-medium">
                    ⌘K
                  </kbd>
                </button>
                <button
                  type="button"
                  aria-label="Notifications"
                  className="flex h-8 w-8 items-center justify-center rounded-md border border-border/60 text-muted-foreground hover:text-foreground transition-colors"
                >
                  <Bell className="h-4 w-4" aria-hidden="true" />
                </button>
                <span className="grid h-8 w-8 place-items-center rounded-full bg-foreground text-[11px] font-semibold text-background">
                  AR
                </span>
              </div>
            </div>

            {/* Dashboard Subviews */}
            <div className="flex min-h-0 flex-1 flex-col gap-3 p-3 sm:p-4">
              {activeTab === 'overview' && (
                <>
                  {/* 4 Logistics Summary Cards */}
                  <div className="grid shrink-0 grid-cols-2 gap-3 lg:grid-cols-4">
                    <div className="flex flex-col justify-between rounded-lg border border-border/60 bg-background p-3">
                      <div className="flex items-center justify-between">
                        <span className="text-[11px] text-muted-foreground">
                          Containers in transit
                        </span>
                         <Container className="h-3.5 w-3.5 text-muted-foreground/60" />
                      </div>
                      <div className="mt-2 flex items-end justify-between gap-2">
                        <span className="text-xl font-semibold tracking-tight">24</span>
                        <span className="text-[10px] text-muted-foreground">Sample</span>
                      </div>
                    </div>

                    <div className="flex flex-col justify-between rounded-lg border border-border/60 bg-background p-3">
                      <div className="flex items-center justify-between">
                        <span className="text-[11px] text-muted-foreground">
                          Inspections due
                        </span>
                        <ClipboardCheck className="h-3.5 w-3.5 text-muted-foreground/60" />
                      </div>
                      <div className="mt-2 flex items-end justify-between gap-2">
                        <span className="text-xl font-semibold tracking-tight">08</span>
                        <span className="text-[10px] text-muted-foreground">Sample</span>
                      </div>
                    </div>

                    <div className="flex flex-col justify-between rounded-lg border border-border/60 bg-background p-3">
                      <div className="flex items-center justify-between">
                        <span className="text-[11px] text-muted-foreground">
                          Active clients
                        </span>
                         <Building2 className="h-3.5 w-3.5 text-muted-foreground/60" />
                      </div>
                      <div className="mt-2 flex items-end justify-between gap-2">
                        <span className="text-xl font-semibold tracking-tight">18</span>
                        <span className="text-[10px] text-muted-foreground">Sample</span>
                      </div>
                    </div>

                    <div className="flex flex-col justify-between rounded-lg border border-border/60 bg-background p-3">
                      <div className="flex items-center justify-between">
                        <span className="text-[11px] text-muted-foreground">
                          Open deals
                        </span>
                        <Handshake className="h-3.5 w-3.5 text-muted-foreground/60" />
                      </div>
                      <div className="mt-2 flex items-end justify-between gap-2">
                        <span className="text-xl font-semibold tracking-tight">06</span>
                        <span className="text-[10px] text-muted-foreground">Sample</span>
                      </div>
                    </div>
                  </div>

                  {/* Chart & Alerts */}
                  <div className="grid min-h-0 flex-1 grid-cols-1 gap-3 lg:grid-cols-3">
                    <div className="flex min-h-0 flex-col rounded-lg border border-border/60 bg-background p-4 lg:col-span-2">
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="text-[13px] font-semibold tracking-tight">
                            Shipment activity
                          </h3>
                          <p className="text-[11px] text-muted-foreground">
                            Container departures &amp; arrivals
                          </p>
                        </div>
                        <div className="hidden items-center gap-1 rounded-md border border-border/60 p-0.5 sm:flex">
                          {(['7d', '30d', '90d'] as const).map((r) => (
                            <button
                              key={r}
                              onClick={() => setTimeRange(r)}
                              className={`rounded px-2 py-0.5 text-[11px] font-medium transition-colors ${
                                timeRange === r
                                  ? 'bg-foreground/[0.06] text-foreground'
                                  : 'text-muted-foreground hover:text-foreground'
                              }`}
                            >
                              {r}
                            </button>
                          ))}
                        </div>
                      </div>

                      <div className="mt-3 flex items-center gap-4">
                        <span className="flex items-center gap-1.5 text-[11px] text-muted-foreground">
                          <span className="h-1.5 w-1.5 rounded-full bg-foreground" />
                          Departures
                        </span>
                        <span className="flex items-center gap-1.5 text-[11px] text-muted-foreground">
                          <span className="h-1.5 w-1.5 rounded-full bg-muted-foreground/40" />
                          Arrivals
                        </span>
                      </div>

                      <div className="relative mt-3 min-h-[160px] flex-1 text-foreground">
                        <svg
                          viewBox="0 0 600 200"
                          preserveAspectRatio="none"
                          className="h-full w-full"
                          aria-hidden="true"
                        >
                          <defs>
                            <linearGradient id="shipmentFill" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="0%" stopColor="currentColor" stopOpacity="0.16" />
                              <stop offset="100%" stopColor="currentColor" stopOpacity="0" />
                            </linearGradient>
                          </defs>
                          <line
                            x1="0"
                            y1="40"
                            x2="600"
                            y2="40"
                            stroke="currentColor"
                            strokeOpacity="0.08"
                            strokeWidth="1"
                            vectorEffect="non-scaling-stroke"
                          />
                          <line
                            x1="0"
                            y1="80"
                            x2="600"
                            y2="80"
                            stroke="currentColor"
                            strokeOpacity="0.08"
                            strokeWidth="1"
                            vectorEffect="non-scaling-stroke"
                          />
                          <line
                            x1="0"
                            y1="120"
                            x2="600"
                            y2="120"
                            stroke="currentColor"
                            strokeOpacity="0.08"
                            strokeWidth="1"
                            vectorEffect="non-scaling-stroke"
                          />
                          <line
                            x1="0"
                            y1="160"
                            x2="600"
                            y2="160"
                            stroke="currentColor"
                            strokeOpacity="0.08"
                            strokeWidth="1"
                            vectorEffect="non-scaling-stroke"
                          />
                          <path
                            d="M0,165 C40,160 50,150 90,150 C140,150 150,128 190,126 C240,124 250,140 300,132 C350,124 360,104 410,100 C460,96 470,108 510,104 C550,101 570,92 600,90"
                            fill="none"
                            stroke="currentColor"
                            strokeOpacity="0.28"
                            strokeWidth="1.5"
                            strokeDasharray="4 4"
                            strokeLinecap="round"
                            vectorEffect="non-scaling-stroke"
                          />
                          <path
                            d="M0,140 C30,130 30,128 60,120 C90,112 100,138 120,135 C150,131 155,98 180,95 C210,92 215,114 240,110 C270,106 280,72 300,70 C330,68 335,88 360,85 C390,82 400,57 420,55 C450,53 455,78 480,75 C510,72 520,42 540,40 C570,38 580,54 600,52 L600,200 L0,200 Z"
                            fill="url(#shipmentFill)"
                            stroke="none"
                          />
                          <path
                            d="M0,140 C30,130 30,128 60,120 C90,112 100,138 120,135 C150,131 155,98 180,95 C210,92 215,114 240,110 C270,106 280,72 300,70 C330,68 335,88 360,85 C390,82 400,57 420,55 C450,53 455,78 480,75 C510,72 520,42 540,40 C570,38 580,54 600,52"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1.75"
                            strokeLinecap="round"
                            vectorEffect="non-scaling-stroke"
                          />
                        </svg>
                      </div>
                    </div>

                    <div className="flex min-h-0 flex-col rounded-lg border border-border/60 bg-background p-4">
                      <div className="flex items-center justify-between">
                        <h3 className="text-[13px] font-semibold tracking-tight">
                          Recent operations
                        </h3>
                        <span className="text-[11px] text-muted-foreground">Sample</span>
                      </div>

                      <ul className="mt-2 flex min-h-0 flex-1 flex-col divide-y divide-border/50 overflow-hidden">
                        {recentOperations.map((operation) => (
                          <li
                            key={operation.title}
                            className="flex items-center gap-2.5 py-2.5 first:pt-1"
                          >
                            <span className="mt-1 h-1.5 w-1.5 shrink-0 self-start rounded-full bg-muted-foreground/50" aria-hidden="true" />
                            <span className="flex min-w-0 flex-1 flex-col">
                              <span className="truncate text-xs font-medium tracking-tight">
                                {operation.title}
                              </span>
                              <span className="truncate text-[11px] text-muted-foreground">
                                {operation.context} · {operation.time}
                              </span>
                            </span>
                            <span className="shrink-0 rounded border border-border/60 px-1.5 py-0.5 text-[10px] font-medium text-muted-foreground">
                              {operation.status}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </>
              )}

              {/* Dedicated Subview: Shipments */}
              {activeTab === 'shipments' && (
                <div className="flex flex-1 flex-col overflow-hidden rounded-lg border border-border/60 bg-background p-4">
                  <div className="flex items-center justify-between pb-3 border-b border-border/60">
                    <div>
                      <h3 className="text-sm font-semibold">Container tracking</h3>
                      <p className="text-xs text-muted-foreground">
                        Sample shipment records and milestone status
                      </p>
                    </div>
                    <span className="text-xs font-mono text-muted-foreground">DEMO DATA</span>
                  </div>

                  <div className="mt-3 flex-1 overflow-x-auto">
                    <table className="w-full min-w-[720px] text-left text-xs">
                      <thead>
                        <tr className="border-b border-border/60 text-muted-foreground">
                          <th className="pb-2 font-medium">Booking</th>
                          <th className="pb-2 font-medium">Container</th>
                          <th className="pb-2 font-medium">Route</th>
                          <th className="pb-2 font-medium">Client</th>
                          <th className="pb-2 font-medium">ETA</th>
                          <th className="pb-2 font-medium">Status</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-border/40 font-mono text-[11px]">
                        {shipmentList.map((shipment) => (
                          <tr key={shipment.booking} className="hover:bg-muted/30">
                            <td className="py-2.5 font-medium text-[#2f80ff]">
                              {shipment.booking}
                            </td>
                            <td className="py-2.5 text-muted-foreground">{shipment.container}</td>
                            <td className="py-2.5 text-muted-foreground">{shipment.route}</td>
                            <td className="py-2.5 text-muted-foreground">{shipment.client}</td>
                            <td className="py-2.5 text-muted-foreground">{shipment.eta}</td>
                            <td className="py-2.5 text-muted-foreground">{shipment.status}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* Dedicated Subview: Operations */}
              {activeTab === 'operations' && (
                <div className="flex flex-1 flex-col overflow-hidden rounded-lg border border-border/60 bg-background p-4">
                  <div className="flex items-center justify-between pb-3 border-b border-border/60">
                    <div>
                      <h3 className="text-sm font-semibold">Origin &amp; shipment operations</h3>
                      <p className="text-xs text-muted-foreground">
                        Sample inspection work and shipment milestones
                      </p>
                    </div>
                    <span className="text-xs font-mono text-muted-foreground">DEMO DATA</span>
                  </div>

                  <div className="mt-3 flex-1 overflow-x-auto">
                    <table className="w-full min-w-[680px] text-left text-xs">
                      <thead>
                        <tr className="border-b border-border/60 text-muted-foreground">
                          <th className="pb-2 font-medium">Reference</th>
                          <th className="pb-2 font-medium">Operation</th>
                          <th className="pb-2 font-medium">Location</th>
                          <th className="pb-2 font-medium">Owner</th>
                          <th className="pb-2 font-medium">Updated</th>
                          <th className="pb-2 font-medium">Status</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-border/40 font-mono text-[11px]">
                        {operationsList.map((operation) => (
                          <tr key={`${operation.ref}-${operation.operation}`} className="hover:bg-muted/30">
                            <td className="py-2.5 font-medium text-[#2f80ff]">{operation.ref}</td>
                            <td className="py-2.5 text-foreground">{operation.operation}</td>
                            <td className="py-2.5 text-muted-foreground">{operation.location}</td>
                            <td className="py-2.5 text-muted-foreground">{operation.owner}</td>
                            <td className="py-2.5 text-muted-foreground">{operation.updated}</td>
                            <td className="py-2.5 text-muted-foreground">{operation.status}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* Dedicated Subview: Clients */}
              {activeTab === 'clients' && (
                <div className="flex flex-1 flex-col gap-4 overflow-hidden rounded-lg border border-border/60 bg-background p-4">
                  <div className="flex items-center justify-between pb-3 border-b border-border/60">
                    <div>
                      <h3 className="text-sm font-semibold">Clients &amp; accounts</h3>
                      <p className="text-xs text-muted-foreground">
                        Sample forwarder, importer, and inspection-company records
                      </p>
                    </div>
                    <span className="text-xs font-mono text-muted-foreground">DEMO DATA</span>
                  </div>

                  <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                    {clientsList.map((client) => (
                      <article key={client.company} className="rounded-md border border-border/60 bg-muted/20 p-3">
                        <div className="flex items-start justify-between gap-3">
                          <div>
                            <h4 className="text-xs font-semibold">{client.company}</h4>
                            <p className="mt-0.5 text-[11px] text-muted-foreground">{client.type}</p>
                          </div>
                          <span className="font-mono text-[10px] text-muted-foreground">DEMO</span>
                        </div>
                        <div className="my-2.5 border-t border-dotted border-border/70" />
                        <p className="text-[11px] text-muted-foreground">
                          {client.shipments} shipments · {client.openDeals} open deals
                        </p>
                        <p className="mt-1 text-[11px] text-foreground/80">
                          Next: {client.nextStep}
                        </p>
                      </article>
                    ))}
                  </div>
                </div>
              )}

              {/* Dedicated Subview: Deals */}
              {activeTab === 'deals' && (
                <div className="flex flex-1 flex-col overflow-hidden rounded-lg border border-border/60 bg-background p-4">
                  <div className="flex items-center justify-between pb-3 border-b border-border/60">
                    <div>
                      <h3 className="text-sm font-semibold">Deals &amp; contracts</h3>
                      <p className="text-xs text-muted-foreground">
                        Sample commercial pipeline and next steps
                      </p>
                    </div>
                    <span className="text-xs font-mono text-muted-foreground">DEMO DATA</span>
                  </div>

                  <div className="mt-3 flex-1 overflow-x-auto">
                    <table className="w-full min-w-[620px] text-left text-xs">
                      <thead>
                        <tr className="border-b border-border/60 text-muted-foreground">
                          <th className="pb-2 font-medium">Deal</th>
                          <th className="pb-2 font-medium">Client</th>
                          <th className="pb-2 font-medium">Stage</th>
                          <th className="pb-2 font-medium">Next step</th>
                          <th className="pb-2 font-medium">Updated</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-border/40 text-[11px]">
                        {dealsList.map((deal) => (
                          <tr key={deal.id} className="hover:bg-muted/30">
                            <td className="py-3">
                              <span className="mr-2 font-mono text-[#2f80ff]">{deal.id}</span>
                              <span className="font-medium">{deal.name}</span>
                            </td>
                            <td className="py-3 text-muted-foreground">{deal.client}</td>
                            <td className="py-3 text-muted-foreground">{deal.stage}</td>
                            <td className="py-3 text-muted-foreground">{deal.nextStep}</td>
                            <td className="py-3 text-muted-foreground">{deal.updated}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* Dedicated Subview: Documents */}
              {activeTab === 'documents' && (
                <div className="flex flex-1 flex-col gap-3 overflow-hidden rounded-lg border border-border/60 bg-background p-4">
                  <div className="flex items-center justify-between pb-3 border-b border-border/60">
                    <div>
                      <h3 className="text-sm font-semibold">Shipment &amp; commercial documents</h3>
                      <p className="text-xs text-muted-foreground">
                        Sample documents connected to shipments and deals
                      </p>
                    </div>
                    <span className="text-xs font-mono text-muted-foreground">DEMO DATA</span>
                  </div>

                  <div className="space-y-2">
                    {documentsList.map((item) => (
                      <div
                        key={item.title}
                        className="flex items-center justify-between p-3 rounded border border-border/50 bg-muted/20 hover:bg-muted/40 transition-colors"
                      >
                        <div className="min-w-0">
                          <p className="text-xs font-semibold text-foreground">
                            {item.title}
                          </p>
                          <p className="text-[11px] text-muted-foreground">
                            {item.reference} · {item.type} · {item.updated}
                          </p>
                        </div>
                        <span className="ml-3 shrink-0 rounded bg-muted px-1.5 py-0.5 text-[10px] text-muted-foreground">
                          {item.status}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </section>
        </div>
      </motion.div>
    </section>
  );
}
