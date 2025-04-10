import React from 'react';
import { Task } from '../App';

interface TaskListProps {
  tasks: Task[];
  onToggleCompletion: (id: number) => void;
  onDelete: (id: number) => void;
}

const TaskList: React.FC<TaskListProps> = ({ tasks, onToggleCompletion, onDelete }) => (
  <div className="task-list">
    <h2>Общий список</h2>
    {tasks.map((task) => (
      <div key={task.id} className="task">
        <input
          type="checkbox"
          checked={task.completed}
          onChange={() => onToggleCompletion(task.id)}
        />
        <span style={{ textDecoration: task.completed ? 'line-through' : 'none' }}>
          {task.text}
        </span>
        <button onClick={() => onDelete(task.id)}>Удалить</button>
      </div>
    ))}
  </div>
);

export default TaskList;
