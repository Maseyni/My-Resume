import React from 'react';
import { Task } from '../App';

interface TaskCounterProps {
  tasks: Task[];
}

const TaskCounter: React.FC<TaskCounterProps> = ({ tasks }) => {
  const remainingTasks = tasks.filter((task) => !task.completed).length;

  return <p className="task-counter">Оставшиеся задачи: {remainingTasks}</p>;
};

export default TaskCounter;
