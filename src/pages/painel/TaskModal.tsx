import { useState, useRef } from 'react';
import { X } from 'lucide-react';
import type { Task, TaskCategory } from './types';
import { CATEGORY_COLORS } from './types';

interface TaskModalProps {
  open: boolean;
  task?: Task | null;
  onClose: () => void;
  onSave: (title: string, description: string, category: TaskCategory) => void;
}

const categories = Object.entries(CATEGORY_COLORS) as [TaskCategory, typeof CATEGORY_COLORS[TaskCategory]][];

export default function TaskModal({ open, task, onClose, onSave }: TaskModalProps) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState<TaskCategory>('pessoal');
  const prevKey = useRef<string | null>(null);

  const key = open ? (task?.id ?? '__new__') : null;
  if (key !== prevKey.current) {
    prevKey.current = key;
    if (task) {
      setTitle(task.title);
      setDescription(task.description);
      setCategory(task.category);
    } else {
      setTitle('');
      setDescription('');
      setCategory('pessoal');
    }
  }

  if (!open) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;
    onSave(title.trim(), description.trim(), category);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4" onClick={onClose}>
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />
      <div
        className="relative bg-zinc-900 border border-zinc-700 rounded-lg w-full max-w-sm shadow-2xl"
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-zinc-800">
          <h2 className="text-white font-bold text-sm">
            {task ? 'Editar Tarefa' : 'Nova Tarefa'}
          </h2>
          <button onClick={onClose} className="text-zinc-500 hover:text-white transition-colors">
            <X size={18} />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-4 space-y-4">
          <div>
            <label className="text-zinc-400 text-xs font-medium block mb-1">Título</label>
            <input
              type="text"
              value={title}
              onChange={e => setTitle(e.target.value)}
              placeholder="Ex: Estudar para prova de cálculo"
              className="w-full bg-zinc-800 border border-zinc-700 text-white text-sm rounded px-3 py-2 focus:outline-none focus:border-red-500 placeholder:text-zinc-600"
              autoFocus
            />
          </div>

          <div>
            <label className="text-zinc-400 text-xs font-medium block mb-1">Descrição</label>
            <textarea
              value={description}
              onChange={e => setDescription(e.target.value)}
              placeholder="Detalhes da tarefa..."
              rows={3}
              className="w-full bg-zinc-800 border border-zinc-700 text-white text-sm rounded px-3 py-2 focus:outline-none focus:border-red-500 placeholder:text-zinc-600 resize-none"
            />
          </div>

          <div>
            <label className="text-zinc-400 text-xs font-medium block mb-2">Categoria</label>
            <div className="grid grid-cols-3 gap-2">
              {categories.map(([key, val]) => (
                <button
                  key={key}
                  type="button"
                  onClick={() => setCategory(key)}
                  className="text-xs font-medium px-2 py-1.5 rounded transition-all"
                  style={{
                    backgroundColor: category === key ? val.bg : 'transparent',
                    color: category === key ? val.text : val.bg,
                    border: `1px solid ${category === key ? val.bg : val.bg + '44'}`,
                  }}
                >
                  {val.label}
                </button>
              ))}
            </div>
          </div>

          <button
            type="submit"
            disabled={!title.trim()}
            className="w-full bg-red-600 hover:bg-red-700 disabled:opacity-40 disabled:cursor-not-allowed text-white font-bold text-sm py-2.5 rounded transition-colors"
          >
            {task ? 'Salvar Alterações' : 'Adicionar ao Painel'}
          </button>
        </form>
      </div>
    </div>
  );
}
