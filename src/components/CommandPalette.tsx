import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Search,
  PackageCheck,
  ClipboardCheck,
  UsersRound,
  Handshake,
  FileText,
  ArrowRight,
  ExternalLink,
} from 'lucide-react';

interface CommandItem {
  id: string;
  category: 'Platform' | 'Workflows' | 'Resources';
  title: string;
  subtitle: string;
  icon: React.ComponentType<{ className?: string }>;
  shortcut?: string;
  action: () => void;
}

export function CommandPalette({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);

  const commands: CommandItem[] = [
    {
      id: 'shipments',
      category: 'Workflows',
      title: 'Container and shipment tracking',
      subtitle: 'Routes, milestone updates, and shipment documents',
      icon: PackageCheck,
      action: () => {
        window.location.assign('/platform#shipment-tracking');
        onClose();
      },
    },
    {
      id: 'inspections',
      category: 'Workflows',
      title: 'Origin inspection operations',
      subtitle: 'Requests, reports, evidence, and handoffs',
      icon: ClipboardCheck,
      action: () => {
        window.location.assign('/platform#origin-inspections');
        onClose();
      },
    },
    {
      id: 'clients',
      category: 'Workflows',
      title: 'Clients and commercial pipeline',
      subtitle: 'Client records, deals, proposals, and contracts',
      icon: Handshake,
      action: () => {
        window.location.assign('/platform#clients-deals');
        onClose();
      },
    },
    {
      id: 'solutions',
      category: 'Platform',
      title: 'Solutions for logistics teams',
      subtitle: 'Forwarders, inspection companies, and clients',
      icon: UsersRound,
      action: () => {
        window.location.assign('/solutions');
        onClose();
      },
    },
    {
      id: 'documents',
      category: 'Workflows',
      title: 'Documents and contracts',
      subtitle: 'Keep commercial and shipment records in context',
      icon: FileText,
      action: () => {
        window.location.assign('/platform#documents');
        onClose();
      },
    },
    {
      id: 'demo',
      category: 'Resources',
      title: 'Book a WiseShips CRM demo',
      subtitle: 'Talk through your forwarder or inspection workflow',
      icon: ExternalLink,
      action: () => {
        window.location.assign('/contact');
        onClose();
      },
    },
    {
      id: 'faq-section',
      category: 'Resources',
      title: 'Frequently asked questions',
      subtitle: 'Learn how WiseShips fits logistics operations',
      icon: ExternalLink,
      action: () => {
        window.location.assign('/solutions#faq');
        onClose();
      },
    },
  ];

  const filtered = commands.filter(
    (c) =>
      c.title.toLowerCase().includes(query.toLowerCase()) ||
      c.subtitle.toLowerCase().includes(query.toLowerCase()) ||
      c.category.toLowerCase().includes(query.toLowerCase())
  );

  useEffect(() => {
    setSelectedIndex(0);
  }, [query]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
        else setQuery('');
      }
      if (!isOpen) return;

      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIndex((prev) => (prev + 1) % (filtered.length || 1));
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIndex((prev) => (prev - 1 + filtered.length) % (filtered.length || 1));
      } else if (e.key === 'Enter') {
        e.preventDefault();
        if (filtered[selectedIndex]) {
          filtered[selectedIndex].action();
        }
      } else if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, filtered, selectedIndex, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-start justify-center pt-20 px-4 sm:pt-28">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm"
          />

          {/* Modal Box */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: -8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: -8 }}
            transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="relative w-full max-w-xl overflow-hidden rounded-xl border border-border bg-background shadow-2xl shadow-black/20"
          >
            {/* Search Input Bar */}
            <div className="flex h-13 items-center gap-3 border-b border-border px-4">
              <Search className="h-4 w-4 shrink-0 text-muted-foreground" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search workflows, shipments, clients, or help..."
                className="flex-1 bg-transparent text-sm font-medium outline-none placeholder:text-muted-foreground"
                autoFocus
              />
              <kbd className="rounded border border-border/80 bg-muted px-1.5 py-0.5 text-[10px] font-mono text-muted-foreground">
                ESC
              </kbd>
            </div>

            {/* Command List */}
            <div className="max-h-80 overflow-y-auto p-2">
              {filtered.length === 0 ? (
                <div className="py-12 text-center text-sm text-muted-foreground">
                  No matching WiseShips pages or workflows found.
                </div>
              ) : (
                <div className="space-y-1">
                  {filtered.map((item, idx) => {
                    const Icon = item.icon;
                    const isSelected = selectedIndex === idx;
                    return (
                      <button
                        key={item.id}
                        type="button"
                        onClick={item.action}
                        onMouseEnter={() => setSelectedIndex(idx)}
                        className={`flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-left text-sm transition-colors ${
                          isSelected
                            ? 'bg-foreground/[0.07] text-foreground'
                            : 'text-muted-foreground hover:bg-muted/60 hover:text-foreground'
                        }`}
                      >
                        <div className="flex items-center gap-3 min-w-0">
                          <span
                            className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-md border transition-colors ${
                              isSelected
                                ? 'border-[#2f80ff] bg-[#2f80ff]/10 text-[#2f80ff]'
                                : 'border-border bg-muted/40 text-muted-foreground'
                            }`}
                          >
                            <Icon className="h-4 w-4" />
                          </span>
                          <div className="flex flex-col truncate">
                            <span className="truncate text-xs font-semibold text-foreground">
                              {item.title}
                            </span>
                            <span className="truncate text-[11px] text-muted-foreground">
                              {item.subtitle}
                            </span>
                          </div>
                        </div>

                        <div className="flex items-center gap-2 pl-2 shrink-0">
                          {item.shortcut ? (
                            <kbd className="rounded border border-border/70 bg-background px-1.5 py-0.5 text-[10px] font-mono text-muted-foreground">
                              {item.shortcut}
                            </kbd>
                          ) : (
                            <ArrowRight className="h-3.5 w-3.5 opacity-50" />
                          )}
                        </div>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Footer with key hints */}
            <div className="flex items-center justify-between border-t border-border/60 bg-muted/30 px-4 py-2 text-[11px] text-muted-foreground">
              <div className="flex items-center gap-3">
                <span className="flex items-center gap-1">
                  <kbd className="rounded border border-border/80 bg-background px-1 text-[10px]">
                    ↑↓
                  </kbd>{' '}
                  Navigate
                </span>
                <span className="flex items-center gap-1">
                  <kbd className="rounded border border-border/80 bg-background px-1 text-[10px]">
                    ↵
                  </kbd>{' '}
                    Open
                </span>
              </div>
              <span className="font-mono text-[10px] text-muted-foreground/70">
                WiseShips CRM
              </span>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
