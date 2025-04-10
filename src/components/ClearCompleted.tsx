import React from 'react';

interface ClearCompletedProps {
  onClear: () => void;
}

const ClearCompleted: React.FC<ClearCompletedProps> = ({ onClear }) => {
  return (
    <div className="clear-completed">
      <button onClick={onClear}>Очистить выполненные задачи</button>
    </div>
  );
};

export default ClearCompleted;
