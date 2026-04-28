import { useState, useRef, useCallback } from 'react';
import { Plus, ZoomIn, ZoomOut, RotateCcw, Home, Search } from 'lucide-react';
import { useBoard } from './useBoard';
import TaskCard from './TaskCard';
import ConnectionLines from './ConnectionLines';
import TaskModal from './TaskModal';
import ConnectionModal from './ConnectionModal';
import ConnectionTypeSelector from './ConnectionTypeSelector';
import type { Task, Connection, TaskCategory, ConnectionType } from './types';
import { CATEGORY_COLORS, CONNECTION_STYLES } from './types';

export default function PainelEvidencias() {
  const {
    board,
    addTask,
    updateTask,
    deleteTask,
    moveTask,
    toggleComplete,
    addConnection,
    updateConnection,
    deleteConnection,
    setPan,
    setZoom,
  } = useBoard();

  const [taskModalOpen, setTaskModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [connectionModalOpen, setConnectionModalOpen] = useState(false);
  const [selectedConnection, setSelectedConnection] = useState<Connection | null>(null);
  const [connectingFrom, setConnectingFrom] = useState<string | null>(null);
  const [pendingConnectionTo, setPendingConnectionTo] = useState<string | null>(null);
  const [typeSelectorOpen, setTypeSelectorOpen] = useState(false);
  const [isPanning, setIsPanning] = useState(false);
  const [showLegend, setShowLegend] = useState(false);
  const panStart = useRef({ x: 0, y: 0, panX: 0, panY: 0 });
  const boardRef = useRef<HTMLDivElement>(null);
  const [newTaskPos, setNewTaskPos] = useState({ x: 100, y: 100 });

  const handleBoardPointerDown = useCallback((e: React.PointerEvent) => {
    if ((e.target as HTMLElement).closest('[data-task-id]')) return;
    if (connectingFrom) {
      setConnectingFrom(null);
      return;
    }
    setIsPanning(true);
    panStart.current = { x: e.clientX, y: e.clientY, panX: board.panX, panY: board.panY };
  }, [connectingFrom, board.panX, board.panY]);

  const handleBoardPointerMove = useCallback((e: React.PointerEvent) => {
    if (!isPanning) return;
    const dx = e.clientX - panStart.current.x;
    const dy = e.clientY - panStart.current.y;
    setPan(panStart.current.panX + dx, panStart.current.panY + dy);
  }, [isPanning, setPan]);

  const handleBoardPointerUp = useCallback(() => {
    setIsPanning(false);
  }, []);

  const handleAddTask = () => {
    const offsetX = 150 + Math.random() * 200;
    const offsetY = 100 + Math.random() * 200;
    setNewTaskPos({ x: (-board.panX / board.zoom) + offsetX, y: (-board.panY / board.zoom) + offsetY });
    setEditingTask(null);
    setTaskModalOpen(true);
  };

  const handleSaveTask = (title: string, description: string, category: TaskCategory) => {
    if (editingTask) {
      updateTask(editingTask.id, { title, description, category });
    } else {
      addTask(title, description, category, newTaskPos.x, newTaskPos.y);
    }
  };

  const handleEditTask = (task: Task) => {
    setEditingTask(task);
    setTaskModalOpen(true);
  };

  const handleStartConnection = (fromId: string) => {
    setConnectingFrom(fromId);
  };

  const handleConnectionTarget = useCallback((toId: string) => {
    if (!connectingFrom || connectingFrom === toId) {
      setConnectingFrom(null);
      return;
    }
    setPendingConnectionTo(toId);
    setTypeSelectorOpen(true);
  }, [connectingFrom]);

  const handleSelectConnectionType = (type: ConnectionType) => {
    if (connectingFrom && pendingConnectionTo) {
      addConnection(connectingFrom, pendingConnectionTo, type);
    }
    setConnectingFrom(null);
    setPendingConnectionTo(null);
    setTypeSelectorOpen(false);
  };

  const handleCancelConnectionType = () => {
    setConnectingFrom(null);
    setPendingConnectionTo(null);
    setTypeSelectorOpen(false);
  };

  const handleClickConnection = (conn: Connection) => {
    setSelectedConnection(conn);
    setConnectionModalOpen(true);
  };

  const handleResetView = () => {
    setPan(0, 0);
    setZoom(1);
  };

  return (
    <div className="fixed inset-0 bg-black overflow-hidden flex flex-col" style={{ fontFamily: "'Inter', system-ui, sans-serif" }}>
      {/* Top Bar */}
      <header className="relative z-50 flex items-center justify-between px-3 py-2 bg-zinc-950/90 border-b border-zinc-800/60 backdrop-blur-sm">
        <div className="flex items-center gap-2">
          <a href="/" className="text-zinc-600 hover:text-zinc-300 transition-colors" title="Voltar ao site">
            <Home size={16} />
          </a>
          <div className="w-px h-4 bg-zinc-800" />
          <h1 className="text-xs font-bold text-zinc-300 tracking-wider uppercase">
            <span className="text-red-500">●</span> Painel de Evidências
          </h1>
        </div>
        <div className="flex items-center gap-1">
          <span className="text-[10px] text-zinc-600 mr-1">{board.tasks.length} tarefas</span>
          <button
            onClick={() => setShowLegend(!showLegend)}
            className="p-1.5 text-zinc-500 hover:text-white rounded transition-colors"
            title="Legenda"
          >
            <Search size={14} />
          </button>
        </div>
      </header>

      {/* Legend overlay */}
      {showLegend && (
        <div className="absolute top-12 right-3 z-50 bg-zinc-900/95 border border-zinc-700 rounded-lg p-3 shadow-2xl backdrop-blur-sm max-w-[200px]">
          <h3 className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider mb-2">Categorias</h3>
          <div className="space-y-1 mb-3">
            {Object.entries(CATEGORY_COLORS).map(([key, val]) => (
              <div key={key} className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-sm" style={{ backgroundColor: val.bg }} />
                <span className="text-[10px] text-zinc-400">{val.label}</span>
              </div>
            ))}
          </div>
          <h3 className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider mb-2">Conexões</h3>
          <div className="space-y-1.5">
            {Object.entries(CONNECTION_STYLES).map(([key, val]) => (
              <div key={key} className="flex items-center gap-2">
                <svg width={24} height={8}>
                  <line x1={0} y1={4} x2={24} y2={4} stroke={val.color} strokeWidth={key === 'mandatory' ? 2.5 : 1.5} strokeDasharray={val.dashArray} />
                </svg>
                <span className="text-[10px] text-zinc-400">{val.description}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Connecting indicator */}
      {connectingFrom && (
        <div className="absolute top-12 left-1/2 -translate-x-1/2 z-50 bg-red-600 text-white text-xs font-bold px-4 py-1.5 rounded-full shadow-lg animate-pulse">
          Toque no card de destino
        </div>
      )}

      {/* Board area */}
      <div
        ref={boardRef}
        className="flex-1 relative overflow-hidden cursor-grab active:cursor-grabbing"
        onPointerDown={handleBoardPointerDown}
        onPointerMove={handleBoardPointerMove}
        onPointerUp={handleBoardPointerUp}
        style={{ touchAction: 'none' }}
      >
        {/* Grid background */}
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)',
            backgroundSize: `${24 * board.zoom}px ${24 * board.zoom}px`,
            backgroundPosition: `${board.panX}px ${board.panY}px`,
          }}
        />

        {/* Transformed container */}
        <div
          className="absolute"
          style={{
            transform: `translate(${board.panX}px, ${board.panY}px) scale(${board.zoom})`,
            transformOrigin: '0 0',
            width: 5000,
            height: 5000,
          }}
        >
          <ConnectionLines
            tasks={board.tasks}
            connections={board.connections}
            onClickConnection={handleClickConnection}
          />

          {board.tasks.map(task => (
            <TaskCard
              key={task.id}
              task={task}
              zoom={board.zoom}
              onMove={moveTask}
              onDelete={deleteTask}
              onToggleComplete={toggleComplete}
              onEdit={handleEditTask}
              onStartConnection={handleStartConnection}
              isConnecting={!!connectingFrom}
              onConnectionTarget={handleConnectionTarget}
            />
          ))}
        </div>

        {/* Empty state */}
        {board.tasks.length === 0 && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="text-center px-8">
              <div className="text-4xl mb-3 opacity-20">📌</div>
              <p className="text-zinc-600 text-sm font-medium mb-1">Seu painel está vazio</p>
              <p className="text-zinc-700 text-xs">Toque em <span className="text-red-500 font-bold">+</span> para adicionar sua primeira tarefa</p>
            </div>
          </div>
        )}
      </div>

      {/* Bottom controls */}
      <div className="relative z-50 flex items-center justify-between px-3 py-2 bg-zinc-950/90 border-t border-zinc-800/60 backdrop-blur-sm">
        <div className="flex items-center gap-1">
          <button
            onClick={() => setZoom(board.zoom - 0.15)}
            className="p-2 text-zinc-500 hover:text-white rounded transition-colors"
            title="Diminuir zoom"
          >
            <ZoomOut size={16} />
          </button>
          <span className="text-[10px] text-zinc-600 w-10 text-center">{Math.round(board.zoom * 100)}%</span>
          <button
            onClick={() => setZoom(board.zoom + 0.15)}
            className="p-2 text-zinc-500 hover:text-white rounded transition-colors"
            title="Aumentar zoom"
          >
            <ZoomIn size={16} />
          </button>
          <button
            onClick={handleResetView}
            className="p-2 text-zinc-500 hover:text-white rounded transition-colors"
            title="Resetar visualização"
          >
            <RotateCcw size={16} />
          </button>
        </div>

        {/* Add task FAB */}
        <button
          onClick={handleAddTask}
          className="bg-red-600 hover:bg-red-700 text-white rounded-full p-3 shadow-lg shadow-red-600/30 transition-all active:scale-95"
          title="Nova tarefa"
        >
          <Plus size={20} />
        </button>
      </div>

      {/* Modals */}
      <TaskModal
        open={taskModalOpen}
        task={editingTask}
        onClose={() => { setTaskModalOpen(false); setEditingTask(null); }}
        onSave={handleSaveTask}
      />

      <ConnectionModal
        open={connectionModalOpen}
        connection={selectedConnection}
        onClose={() => { setConnectionModalOpen(false); setSelectedConnection(null); }}
        onChangeType={updateConnection}
        onDelete={deleteConnection}
      />

      <ConnectionTypeSelector
        open={typeSelectorOpen}
        onSelect={handleSelectConnectionType}
        onCancel={handleCancelConnectionType}
      />
    </div>
  );
}
