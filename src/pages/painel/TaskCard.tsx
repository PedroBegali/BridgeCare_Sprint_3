import { useState, useRef, useCallback } from 'react';
import { Check, Trash2, Link, GripVertical, Edit3 } from 'lucide-react';
import type { Task } from './types';
import { CATEGORY_COLORS } from './types';

interface TaskCardProps {
  task: Task;
  zoom: number;
  onMove: (id: string, x: number, y: number) => void;
  onDelete: (id: string) => void;
  onToggleComplete: (id: string) => void;
  onEdit: (task: Task) => void;
  onStartConnection: (id: string) => void;
  isConnecting: boolean;
  onConnectionTarget: (id: string) => void;
}

export default function TaskCard({
  task,
  zoom,
  onMove,
  onDelete,
  onToggleComplete,
  onEdit,
  onStartConnection,
  isConnecting,
  onConnectionTarget,
}: TaskCardProps) {
  const [isDragging, setIsDragging] = useState(false);
  const dragOffset = useRef({ x: 0, y: 0 });
  const cardRef = useRef<HTMLDivElement>(null);
  const colors = CATEGORY_COLORS[task.category];

  const handlePointerDown = useCallback((e: React.PointerEvent) => {
    if ((e.target as HTMLElement).closest('button')) return;

    if (isConnecting) {
      onConnectionTarget(task.id);
      return;
    }

    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);

    const rect = cardRef.current?.getBoundingClientRect();
    if (rect) {
      dragOffset.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      };
    }

    const el = cardRef.current;
    if (el) {
      el.setPointerCapture(e.pointerId);
    }
  }, [isConnecting, onConnectionTarget, task.id]);

  const handlePointerMove = useCallback((e: React.PointerEvent) => {
    if (!isDragging) return;
    e.preventDefault();

    const board = cardRef.current?.parentElement;
    if (!board) return;
    const boardRect = board.getBoundingClientRect();

    const newX = (e.clientX - boardRect.left - dragOffset.current.x) / zoom;
    const newY = (e.clientY - boardRect.top - dragOffset.current.y) / zoom;

    onMove(task.id, Math.max(0, newX), Math.max(0, newY));
  }, [isDragging, onMove, task.id, zoom]);

  const handlePointerUp = useCallback((e: React.PointerEvent) => {
    if (!isDragging) return;
    setIsDragging(false);
    const el = cardRef.current;
    if (el) {
      el.releasePointerCapture(e.pointerId);
    }
  }, [isDragging]);

  return (
    <div
      ref={cardRef}
      data-task-id={task.id}
      className="absolute select-none touch-none"
      style={{
        left: task.x,
        top: task.y,
        width: 180,
        zIndex: isDragging ? 50 : 10,
        cursor: isConnecting ? 'crosshair' : isDragging ? 'grabbing' : 'grab',
      }}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
    >
      {/* Pin */}
      <div
        className="absolute -top-2 left-1/2 -translate-x-1/2 w-4 h-4 rounded-full shadow-lg z-20"
        style={{ backgroundColor: colors.bg, border: `2px solid ${colors.border}` }}
      />

      {/* Card body */}
      <div
        className="rounded-sm shadow-xl p-3 pt-4 relative overflow-hidden"
        style={{
          backgroundColor: task.completed ? '#1F2937' : '#FEFCE8',
          borderLeft: `4px solid ${colors.bg}`,
          opacity: task.completed ? 0.6 : 1,
          transform: `rotate(${(task.x * 0.02 % 3) - 1.5}deg)`,
          boxShadow: `0 4px 16px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.1)`,
        }}
      >
        {/* Category badge */}
        <span
          className="text-[9px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded-sm inline-block mb-1.5"
          style={{ backgroundColor: colors.bg, color: colors.text }}
        >
          {colors.label}
        </span>

        {/* Title */}
        <h3
          className="text-sm font-bold leading-tight mb-1"
          style={{
            color: task.completed ? '#6B7280' : '#1F2937',
            textDecoration: task.completed ? 'line-through' : 'none',
          }}
        >
          {task.title}
        </h3>

        {/* Description */}
        {task.description && (
          <p
            className="text-[10px] leading-snug"
            style={{ color: task.completed ? '#4B5563' : '#6B7280' }}
          >
            {task.description.length > 60 ? task.description.slice(0, 60) + '…' : task.description}
          </p>
        )}

        {/* Actions */}
        <div className="flex gap-1 mt-2 justify-end">
          <button
            onClick={(e) => { e.stopPropagation(); onToggleComplete(task.id); }}
            className="p-1 rounded hover:bg-black/10 transition-colors"
            title={task.completed ? 'Reabrir' : 'Concluir'}
          >
            <Check size={12} color={task.completed ? '#10B981' : '#9CA3AF'} />
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); onEdit(task); }}
            className="p-1 rounded hover:bg-black/10 transition-colors"
            title="Editar"
          >
            <Edit3 size={12} color="#6B7280" />
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); onStartConnection(task.id); }}
            className="p-1 rounded hover:bg-black/10 transition-colors"
            title="Conectar"
          >
            <Link size={12} color="#6B7280" />
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); onDelete(task.id); }}
            className="p-1 rounded hover:bg-black/10 transition-colors"
            title="Excluir"
          >
            <Trash2 size={12} color="#EF4444" />
          </button>
        </div>

        {/* Drag handle indicator */}
        <div className="absolute top-1 right-1 opacity-30">
          <GripVertical size={10} color="#9CA3AF" />
        </div>
      </div>
    </div>
  );
}
