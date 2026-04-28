import { X, ArrowRight } from 'lucide-react';
import type { Connection, ConnectionType } from './types';
import { CONNECTION_STYLES } from './types';

interface ConnectionModalProps {
  open: boolean;
  connection: Connection | null;
  onClose: () => void;
  onChangeType: (id: string, type: ConnectionType) => void;
  onDelete: (id: string) => void;
}

const types: ConnectionType[] = ['mandatory', 'alternative', 'ignorable'];

export default function ConnectionModal({ open, connection, onClose, onChangeType, onDelete }: ConnectionModalProps) {
  if (!open || !connection) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center p-4" onClick={onClose}>
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />
      <div
        className="relative bg-zinc-900 border border-zinc-700 rounded-lg w-full max-w-xs shadow-2xl"
        onClick={e => e.stopPropagation()}
      >
        <div className="flex items-center justify-between p-4 border-b border-zinc-800">
          <h2 className="text-white font-bold text-sm">Tipo de Conexão</h2>
          <button onClick={onClose} className="text-zinc-500 hover:text-white transition-colors">
            <X size={18} />
          </button>
        </div>

        <div className="p-4 space-y-2">
          {types.map(type => {
            const s = CONNECTION_STYLES[type];
            const isActive = connection.type === type;
            return (
              <button
                key={type}
                onClick={() => { onChangeType(connection.id, type); onClose(); }}
                className="w-full flex items-center gap-3 p-3 rounded transition-all text-left"
                style={{
                  backgroundColor: isActive ? s.color + '22' : 'transparent',
                  border: `1px solid ${isActive ? s.color : '#374151'}`,
                }}
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
                {isActive && <ArrowRight size={14} className="ml-auto text-zinc-400" />}
              </button>
            );
          })}

          <button
            onClick={() => { onDelete(connection.id); onClose(); }}
            className="w-full mt-2 text-red-400 hover:text-red-300 text-xs font-medium py-2 border border-red-900/50 rounded hover:bg-red-900/20 transition-colors"
          >
            Remover Conexão
          </button>
        </div>
      </div>
    </div>
  );
}
