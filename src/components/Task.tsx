import React from 'react';

interface TaskProps {
  task: string;
  onDelete: () => void;
}

const Task: React.FC<TaskProps> = ({ task, onDelete }) => (
  <div>
    <span>{task}</span>
    <button onClick={onDelete}>Удалить</button>
  </div>
);

export default Task;
