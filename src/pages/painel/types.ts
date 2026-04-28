export type TaskCategory = 'estudo' | 'trabalho' | 'pessoal' | 'saude' | 'financeiro' | 'outro';

export type ConnectionType = 'mandatory' | 'alternative' | 'ignorable';

export interface Task {
  id: string;
  title: string;
  description: string;
  category: TaskCategory;
  x: number;
  y: number;
  completed: boolean;
}

export interface Connection {
  id: string;
  fromId: string;
  toId: string;
  type: ConnectionType;
}

export interface BoardState {
  tasks: Task[];
  connections: Connection[];
  panX: number;
  panY: number;
  zoom: number;
}

export const CATEGORY_COLORS: Record<TaskCategory, { bg: string; border: string; text: string; label: string }> = {
  estudo: { bg: '#3B82F6', border: '#60A5FA', text: '#DBEAFE', label: 'Estudo' },
  trabalho: { bg: '#F59E0B', border: '#FBBF24', text: '#FEF3C7', label: 'Trabalho' },
  pessoal: { bg: '#8B5CF6', border: '#A78BFA', text: '#EDE9FE', label: 'Pessoal' },
  saude: { bg: '#10B981', border: '#34D399', text: '#D1FAE5', label: 'Saúde' },
  financeiro: { bg: '#EF4444', border: '#F87171', text: '#FEE2E2', label: 'Financeiro' },
  outro: { bg: '#6B7280', border: '#9CA3AF', text: '#F3F4F6', label: 'Outro' },
};

export const CONNECTION_STYLES: Record<ConnectionType, { color: string; dashArray: string; label: string; description: string }> = {
  mandatory: { color: '#EF4444', dashArray: '', label: 'Obrigatória', description: 'Próxima tarefa obrigatória' },
  alternative: { color: '#EF4444', dashArray: '8 4', label: 'Alternativa', description: 'Alternativa importante' },
  ignorable: { color: '#374151', dashArray: '4 4', label: 'Ignorável', description: 'Pode ser ignorada' },
};
