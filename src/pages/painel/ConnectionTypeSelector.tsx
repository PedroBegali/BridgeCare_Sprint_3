import { X } from 'lucide-react';
import type { ConnectionType } from './types';
import { CONNECTION_STYLES } from './types';

interface ConnectionTypeSelectorProps {
  open: boolean;
  onSelect: (type: ConnectionType) => void;
  onCancel: () => void;
}

const types: ConnectionType[] = ['mandatory', 'alternative', 'ignorable'];

export default function ConnectionTypeSelector({ open, onSelect, onCancel }: ConnectionTypeSelectorProps) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center p-4" onClick={onCancel}>
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />
      <div
        className="relative bg-zinc-900 border border-zinc-700 rounded-lg w-full max-w-xs shadow-2xl"
        onClick={e => e.stopPropagation()}
      >
        <div className="flex items-center justify-between p-4 border-b border-zinc-800">
          <h2 className="text-white font-bold text-sm">Tipo de Ligação</h2>
          <button onClick={onCancel} className="text-zinc-500 hover:text-white transition-colors">
            <X size={18} />
          </button>
        </div>

        <div className="p-4 space-y-2">
          {types.map(type => {
            const s = CONNECTION_STYLES[type];
            return (
              <button
                key={type}
                onClick={() => onSelect(type)}
                className="w-full flex items-center gap-3 p-3 rounded transition-all text-left border border-zinc-800 hover:border-zinc-600"
              >
                <div className="flex-shrink-0">
                  <svg width={40} height={12}>
                    <line
                      x1={0} y1={6} x2={40} y2={6}
                      stroke={s.color}
                      strokeWidth={type === 'mandatory' ? 3 : 2}
                      strokeDasharray={s.dashArray}
                    />
                  </svg>
                </div>
                <div>
                  <div className="text-white text-xs font-bold">{s.label}</div>
                  <div className="text-zinc-500 text-[10px]">{s.description}</div>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
