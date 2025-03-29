import React from 'react';

interface EmptyStateProps {
  message: string;
}

const EmptyState: React.FC<EmptyStateProps> = ({ message }) => {
  return (
    <div className="text-center py-4 text-gray-500">
      {message}
    </div>
  );
};

export default EmptyState;