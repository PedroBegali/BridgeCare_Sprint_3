import type { Task, Connection } from './types';
import { CONNECTION_STYLES } from './types';

interface ConnectionLinesProps {
  tasks: Task[];
  connections: Connection[];
  onClickConnection: (connection: Connection) => void;
}

const CARD_W = 180;
const CARD_H = 120;

function getCardCenter(task: Task): { x: number; y: number } {
  return { x: task.x + CARD_W / 2, y: task.y + CARD_H / 2 };
}

export default function ConnectionLines({ tasks, connections, onClickConnection }: ConnectionLinesProps) {
  const taskMap = new Map(tasks.map(t => [t.id, t]));

  return (
    <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 5 }}>
      <defs>
        <marker id="arrow-mandatory" viewBox="0 0 10 7" refX="10" refY="3.5"
          markerWidth="8" markerHeight="6" orient="auto-start-reverse" fill="#EF4444">
          <polygon points="0 0, 10 3.5, 0 7" />
        </marker>
        <marker id="arrow-alternative" viewBox="0 0 10 7" refX="10" refY="3.5"
          markerWidth="8" markerHeight="6" orient="auto-start-reverse" fill="#EF4444">
          <polygon points="0 0, 10 3.5, 0 7" />
        </marker>
        <marker id="arrow-ignorable" viewBox="0 0 10 7" refX="10" refY="3.5"
          markerWidth="8" markerHeight="6" orient="auto-start-reverse" fill="#374151">
          <polygon points="0 0, 10 3.5, 0 7" />
        </marker>
      </defs>

      {connections.map(conn => {
        const from = taskMap.get(conn.fromId);
        const to = taskMap.get(conn.toId);
        if (!from || !to) return null;

        const start = getCardCenter(from);
        const end = getCardCenter(to);
        const style = CONNECTION_STYLES[conn.type];

        const midX = (start.x + end.x) / 2;
        const midY = (start.y + end.y) / 2;
        const cpOffset = Math.abs(end.x - start.x) * 0.2 + 20;

        const d = `M ${start.x} ${start.y} C ${start.x + cpOffset} ${start.y}, ${end.x - cpOffset} ${end.y}, ${end.x} ${end.y}`;

        return (
          <g key={conn.id}>
            {/* Visible line */}
            <path
              d={d}
              fill="none"
              stroke={style.color}
              strokeWidth={conn.type === 'mandatory' ? 2.5 : 1.8}
              strokeDasharray={style.dashArray}
              markerEnd={`url(#arrow-${conn.type})`}
              opacity={0.85}
            />
            {/* Invisible wider path for click/tap target */}
            <path
              d={d}
              fill="none"
              stroke="transparent"
              strokeWidth={20}
              className="pointer-events-auto cursor-pointer"
              onClick={() => onClickConnection(conn)}
            />
            {/* Label at midpoint */}
            <text
              x={midX}
              y={midY - 8}
              textAnchor="middle"
              fill={style.color}
              fontSize={9}
              fontWeight="bold"
              className="pointer-events-none select-none"
              opacity={0.7}
            >
              {style.label}
            </text>
          </g>
        );
      })}
    </svg>
  );
}
