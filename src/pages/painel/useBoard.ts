import { useState, useCallback, useEffect } from 'react';
import type { Task, Connection, BoardState, TaskCategory, ConnectionType } from './types';

const STORAGE_KEY = 'painel-evidencias-board';

function generateId(): string {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 8);
}

function loadBoard(): BoardState {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw) as BoardState;
  } catch { /* ignore */ }
  return { tasks: [], connections: [], panX: 0, panY: 0, zoom: 1 };
}

function saveBoard(state: BoardState) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

export function useBoard() {
  const [board, setBoard] = useState<BoardState>(loadBoard);

  useEffect(() => {
    saveBoard(board);
  }, [board]);

  const addTask = useCallback((title: string, description: string, category: TaskCategory, x: number, y: number) => {
    const task: Task = { id: generateId(), title, description, category, x, y, completed: false };
    setBoard(prev => ({ ...prev, tasks: [...prev.tasks, task] }));
    return task.id;
  }, []);

  const updateTask = useCallback((id: string, updates: Partial<Omit<Task, 'id'>>) => {
    setBoard(prev => ({
      ...prev,
      tasks: prev.tasks.map(t => t.id === id ? { ...t, ...updates } : t),
    }));
  }, []);

  const deleteTask = useCallback((id: string) => {
    setBoard(prev => ({
      ...prev,
      tasks: prev.tasks.filter(t => t.id !== id),
      connections: prev.connections.filter(c => c.fromId !== id && c.toId !== id),
    }));
  }, []);

  const moveTask = useCallback((id: string, x: number, y: number) => {
    setBoard(prev => ({
      ...prev,
      tasks: prev.tasks.map(t => t.id === id ? { ...t, x, y } : t),
    }));
  }, []);

  const toggleComplete = useCallback((id: string) => {
    setBoard(prev => ({
      ...prev,
      tasks: prev.tasks.map(t => t.id === id ? { ...t, completed: !t.completed } : t),
    }));
  }, []);

  const addConnection = useCallback((fromId: string, toId: string, type: ConnectionType) => {
    setBoard(prev => {
      const exists = prev.connections.some(c => c.fromId === fromId && c.toId === toId);
      if (exists) return prev;
      const conn: Connection = { id: generateId(), fromId, toId, type };
      return { ...prev, connections: [...prev.connections, conn] };
    });
  }, []);

  const updateConnection = useCallback((id: string, type: ConnectionType) => {
    setBoard(prev => ({
      ...prev,
      connections: prev.connections.map(c => c.id === id ? { ...c, type } : c),
    }));
  }, []);

  const deleteConnection = useCallback((id: string) => {
    setBoard(prev => ({
      ...prev,
      connections: prev.connections.filter(c => c.id !== id),
    }));
  }, []);

  const setPan = useCallback((panX: number, panY: number) => {
    setBoard(prev => ({ ...prev, panX, panY }));
  }, []);

  const setZoom = useCallback((zoom: number) => {
    setBoard(prev => ({ ...prev, zoom: Math.max(0.3, Math.min(2, zoom)) }));
  }, []);

  return {
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
  };
}
