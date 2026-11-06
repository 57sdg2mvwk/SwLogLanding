import React, { useEffect, useMemo, useRef, useState } from 'react';
import {
  ArrowRight,
  BookOpen,
  ChevronRight,
  CircleHelp,
  Search,
  Ship,
  X,
} from 'lucide-react';
import { CutButton } from '../components/CutButton';
import { PageKicker, PageShell, clippedPanel } from './PagePrimitives';
import {
  freightGlossaryTerms,
  glossaryCategories,
  type FreightGlossaryTerm,
  type GlossaryCategory,
} from '../data/freightGlossary';

const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

function normalize(value: string) {
  return value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLocaleLowerCase('es');
}

function termMatchesLetter(term: FreightGlossaryTerm, letter: string) {
  return normalize(term.term).startsWith(letter.toLocaleLowerCase('es'));
}

function GlossaryHeroCard() {
  return (
    <div className="relative">
      <div className="absolute -inset-3 border border-dashed border-border/70" aria-hidden="true" />
      <div className="bg-border p-px" style={clippedPanel}>
        <div className="bg-background p-5 sm:p-7" style={clippedPanel}>
          <div className="flex items-center justify-between border-b border-border/70 pb-4">
            <div className="flex items-center gap-2.5">
              <BookOpen className="h-4 w-4 text-[#2f80ff]" aria-hidden="true" />
              <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-muted-foreground">
                Consulta rápida
              </span>
            </div>
            <span className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
              TOOL 01
            </span>
          </div>

          <div className="py-6">
            <p className="font-mono text-[10px] uppercase tracking-[0.12em] text-muted-foreground">
              Marítimo / Contenedores
            </p>
            <div className="mt-2 flex items-baseline gap-3">
              <span className="font-serif text-5xl leading-none tracking-tight">FCL</span>
              <span className="text-xs text-muted-foreground">Full Container Load</span>
            </div>
            <p className="mt-4 max-w-md text-sm leading-relaxed text-muted-foreground">
              Un contenedor reservado para un embarque, sin compartir espacio con otras cargas.
            </p>
          </div>

          <div className="flex flex-wrap gap-2 border-t border-dotted border-border pt-4">
            {['CBM', 'B/L', 'Demurrage', 'Incoterms'].map((term) => (
              <span
                key={term}
                className="border border-border px-2.5 py-1.5 font-mono text-[10px] text-muted-foreground"
              >
                {term}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function TermRow({
  term,
  selected,
  onSelect,
}: {
  term: FreightGlossaryTerm;
  selected: boolean;
  onSelect: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onSelect}
      aria-pressed={selected}
      className={`focus-ring group flex w-full items-center justify-between gap-4 border-b border-border/70 px-4 py-3.5 text-left transition-colors last:border-b-0 ${
        selected ? 'bg-muted/80' : 'hover:bg-muted/50'
      }`}
    >
      <span className="min-w-0">
        <span className="block truncate text-sm font-semibold tracking-tight">{term.term}</span>
        <span className="mt-1 block text-xs text-muted-foreground">{term.category}</span>
      </span>
      <ChevronRight
        className={`h-4 w-4 shrink-0 transition-transform ${
          selected ? 'translate-x-0.5 text-[#2f80ff]' : 'text-muted-foreground group-hover:translate-x-0.5'
        }`}
        aria-hidden="true"
      />
    </button>
  );
}

function TermDetail({ term }: { term: FreightGlossaryTerm | null }) {
  if (!term) {
    return (
      <div
        className="flex min-h-[320px] flex-col items-center justify-center border border-border bg-background px-8 text-center"
        style={clippedPanel}
      >
        <CircleHelp className="h-6 w-6 text-muted-foreground" aria-hidden="true" />
        <p className="mt-3 text-sm font-medium">No hay términos para mostrar</p>
        <p className="mt-1 max-w-xs text-xs leading-relaxed text-muted-foreground">
          Prueba otra búsqueda o selecciona una categoría distinta.
        </p>
      </div>
    );
  }

  return (
    <article
      className="border border-border bg-background p-5 sm:p-7 lg:sticky lg:top-24"
      style={clippedPanel}
      aria-live="polite"
    >
      <div className="flex items-center justify-between gap-4 border-b border-border/70 pb-4">
        <span className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.14em] text-muted-foreground">
          <span className="h-2 w-2 bg-[#2f80ff]" aria-hidden="true" />
          {term.category}
        </span>
        <span className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
          WISESHIPS / TOOLS
        </span>
      </div>

      <div className="py-6 sm:py-8">
        <p className="font-mono text-[10px] uppercase tracking-[0.12em] text-muted-foreground">
          Definición
        </p>
        <h3 className="mt-2 text-balance font-serif text-3xl font-normal leading-tight tracking-[-0.015em] sm:text-4xl">
          {term.term}
        </h3>
        <p className="mt-5 max-w-2xl text-base leading-7 text-muted-foreground">
          {term.definition}
        </p>
      </div>

      {term.practicalNote && (
        <div className="border-l-2 border-[#2f80ff] bg-muted/50 px-4 py-3">
          <p className="font-mono text-[10px] uppercase tracking-[0.12em] text-muted-foreground">
            En la práctica
          </p>
          <p className="mt-1.5 text-sm leading-relaxed">{term.practicalNote}</p>
        </div>
      )}

      <div className="mt-6 flex items-center justify-between gap-3 border-t border-dotted border-border pt-4">
        <p className="text-xs text-muted-foreground">Definición orientativa</p>
        <span className="font-mono text-[10px] text-muted-foreground">
          {String(freightGlossaryTerms.findIndex((entry) => entry.id === term.id) + 1).padStart(2, '0')}
        </span>
      </div>
    </article>
  );
}

export function ToolsGlossaryPage() {
  const [query, setQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<GlossaryCategory | 'Todas'>('Todas');
  const [activeLetter, setActiveLetter] = useState<string | null>(null);
  const [selectedId, setSelectedId] = useState('fcl');
  const searchRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleShortcut = (event: KeyboardEvent) => {
      const target = event.target;
      const typing =
        target instanceof HTMLElement &&
        (target.isContentEditable || ['INPUT', 'TEXTAREA', 'SELECT'].includes(target.tagName));

      if (event.key === '/' && !typing && !event.metaKey && !event.ctrlKey && !event.altKey) {
        event.preventDefault();
        searchRef.current?.focus();
      }
      if (event.key === 'Escape' && document.activeElement === searchRef.current) {
        setQuery('');
        searchRef.current?.blur();
      }
    };

    window.addEventListener('keydown', handleShortcut);
    return () => window.removeEventListener('keydown', handleShortcut);
  }, []);

  const filteredTerms = useMemo(() => {
    const normalizedQuery = normalize(query.trim());
    return [...freightGlossaryTerms]
      .filter((term) => activeCategory === 'Todas' || term.category === activeCategory)
      .filter((term) => !activeLetter || termMatchesLetter(term, activeLetter))
      .filter((term) => {
        if (!normalizedQuery) return true;
        return normalize(
          [term.term, term.category, term.definition, ...(term.aliases ?? [])].join(' '),
        ).includes(normalizedQuery);
      })
      .sort((a, b) => a.term.localeCompare(b.term, 'es'));
  }, [activeCategory, activeLetter, query]);

  const selectedTerm =
    filteredTerms.find((term) => term.id === selectedId) ?? filteredTerms[0] ?? null;

  const categoryCounts = useMemo(
    () =>
      Object.fromEntries(
        glossaryCategories.map((category) => [
          category,
          freightGlossaryTerms.filter((term) => term.category === category).length,
        ]),
      ) as Record<GlossaryCategory, number>,
    [],
  );

  return (
    <PageShell>
      <section className="mx-auto grid w-full max-w-[1440px] gap-10 px-5 pb-16 pt-12 sm:px-8 sm:pb-20 sm:pt-16 lg:grid-cols-[1.04fr_0.96fr] lg:items-end lg:gap-16 lg:px-10 lg:pb-24 lg:pt-20">
        <div className="max-w-3xl">
          <PageKicker>Tools / Diccionario del transitario</PageKicker>
          <h1 className="mt-5 text-balance font-serif text-4xl font-normal leading-[1.08] tracking-[-0.01em] sm:text-5xl lg:text-[3.7rem]">
            El diccionario{' '}
            <span className="font-sans font-semibold tracking-tight">del transitario.</span>
          </h1>
          <p className="mt-5 max-w-2xl text-pretty text-sm leading-7 text-muted-foreground sm:text-base">
            Definiciones en lenguaje llano de los términos de marítimo, aéreo, terrestre, aduanas
            e Incoterms que aparecen en la operativa real del flete, desde FCL y CBM hasta
            conocimientos de embarque y demoras.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <CutButton variant="solid" href="#glossary">
              Explorar términos
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </CutButton>
            <CutButton
              variant="outline"
              href="#glossary"
              onClick={() => setActiveCategory('Incoterms')}
            >
              Ver Incoterms
            </CutButton>
          </div>
        </div>
        <GlossaryHeroCard />
      </section>

      <section
        id="glossary"
        className="mx-auto max-w-[1440px] scroll-mt-24 px-5 pb-20 sm:px-8 sm:pb-28 lg:px-10"
      >
        <div className="border-t border-border pt-8 sm:pt-10">
          <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
            <div>
              <PageKicker>Consulta rápida</PageKicker>
              <h2 className="mt-3 font-serif text-3xl font-normal leading-tight tracking-tight sm:text-4xl">
                Busca una definición.
              </h2>
            </div>
            <p className="max-w-md text-sm leading-relaxed text-muted-foreground">
              Explora {freightGlossaryTerms.length} términos por tema, inicial o palabra clave.
            </p>
          </div>

          <div className="mt-7">
            <label htmlFor="glossary-search" className="sr-only">
              Buscar términos
            </label>
            <div className="flex h-12 items-center gap-3 border border-border bg-background px-4 transition-colors focus-within:border-[#2f80ff]/60">
              <Search className="h-4 w-4 shrink-0 text-muted-foreground" aria-hidden="true" />
              <input
                ref={searchRef}
                id="glossary-search"
                type="search"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Buscar FCL, demurrage, aduanas..."
                className="h-full min-w-0 flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground/80"
              />
              {query ? (
                <button
                  type="button"
                  onClick={() => setQuery('')}
                  aria-label="Limpiar búsqueda"
                  className="focus-ring inline-flex h-8 w-8 items-center justify-center text-muted-foreground transition-colors hover:text-foreground"
                >
                  <X className="h-4 w-4" aria-hidden="true" />
                </button>
              ) : (
                <kbd className="hidden border border-border px-1.5 py-0.5 font-mono text-[10px] text-muted-foreground sm:inline">
                  /
                </kbd>
              )}
            </div>
          </div>

          <div className="mt-5 flex flex-wrap gap-2" aria-label="Filtrar por categoría">
            <button
              type="button"
              onClick={() => setActiveCategory('Todas')}
              aria-pressed={activeCategory === 'Todas'}
              className={`focus-ring border px-3 py-2 text-xs font-medium transition-colors ${
                activeCategory === 'Todas'
                  ? 'border-foreground bg-foreground text-background'
                  : 'border-border text-muted-foreground hover:text-foreground'
              }`}
            >
              Todas <span className="ml-1 opacity-70">{freightGlossaryTerms.length}</span>
            </button>
            {glossaryCategories.map((category) => (
              <button
                key={category}
                type="button"
                onClick={() => setActiveCategory(category)}
                aria-pressed={activeCategory === category}
                className={`focus-ring border px-3 py-2 text-xs font-medium transition-colors ${
                  activeCategory === category
                    ? 'border-foreground bg-foreground text-background'
                    : 'border-border text-muted-foreground hover:text-foreground'
                }`}
              >
                {category}
                <span className="ml-1 opacity-70">{categoryCounts[category]}</span>
              </button>
            ))}
          </div>

          <div className="mt-5 flex flex-col gap-2 border-y border-border py-4 sm:flex-row sm:items-center sm:gap-4">
            <span className="shrink-0 font-mono text-[10px] uppercase tracking-[0.12em] text-muted-foreground">
              Explorar por letra
            </span>
            <div className="flex flex-wrap gap-1" aria-label="Filtrar por letra inicial">
              <button
                type="button"
                onClick={() => setActiveLetter(null)}
                aria-pressed={activeLetter === null}
                className={`focus-ring px-2 py-1 text-xs font-medium transition-colors ${
                  activeLetter === null ? 'text-[#2f80ff]' : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                #
              </button>
              {alphabet.map((letter) => (
                <button
                  key={letter}
                  type="button"
                  onClick={() => setActiveLetter(activeLetter === letter ? null : letter)}
                  aria-pressed={activeLetter === letter}
                  className={`focus-ring px-1.5 py-1 font-mono text-[11px] transition-colors ${
                    activeLetter === letter ? 'text-[#2f80ff]' : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  {letter}
                </button>
              ))}
            </div>
            <p className="text-xs text-muted-foreground sm:ml-auto">
              {filteredTerms.length} {filteredTerms.length === 1 ? 'resultado' : 'resultados'}
            </p>
          </div>

          <div className="mt-6 grid items-start gap-5 lg:grid-cols-[0.9fr_1.1fr]">
            <section className="overflow-hidden border border-border bg-background" style={clippedPanel}>
              <div className="flex items-center justify-between border-b border-border px-4 py-3.5">
                <span className="font-mono text-[10px] uppercase tracking-[0.13em] text-muted-foreground">
                  Índice de términos
                </span>
                <span className="font-mono text-[10px] text-muted-foreground">
                  {String(filteredTerms.length).padStart(2, '0')}
                </span>
              </div>
              {filteredTerms.length ? (
                <div className="max-h-[560px] overflow-y-auto">
                  {filteredTerms.map((term) => (
                    <TermRow
                      key={term.id}
                      term={term}
                      selected={selectedTerm?.id === term.id}
                      onSelect={() => setSelectedId(term.id)}
                    />
                  ))}
                </div>
              ) : (
                <div className="px-5 py-12 text-center">
                  <Search className="mx-auto h-5 w-5 text-muted-foreground" aria-hidden="true" />
                  <p className="mt-3 text-sm font-medium">No encontramos ese término</p>
                  <p className="mt-1 text-xs text-muted-foreground">
                    Prueba otra palabra o limpia los filtros.
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setQuery('');
                      setActiveCategory('Todas');
                      setActiveLetter(null);
                    }}
                    className="focus-ring mt-4 text-xs font-semibold text-[#2f80ff] hover:underline"
                  >
                    Restablecer filtros
                  </button>
                </div>
              )}
            </section>

            <TermDetail term={selectedTerm} />
          </div>

          <div className="mt-5 flex items-start gap-3 border-t border-border pt-4 text-xs leading-relaxed text-muted-foreground">
            <Ship className="mt-0.5 h-4 w-4 shrink-0 text-[#2f80ff]" aria-hidden="true" />
            <p>
              Las definiciones son orientativas. En Incoterms, confirma siempre la regla, el lugar
              nombrado y la edición indicada en el contrato.
            </p>
          </div>
        </div>
      </section>
    </PageShell>
  );
}

export default ToolsGlossaryPage;
