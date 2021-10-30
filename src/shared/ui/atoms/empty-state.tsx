import React from 'react';

export function EmptyState({
  icon: Icon,
  children,
}: {
  children: React.ReactNode;
  icon: React.FC<{ className?: string }>;
}) {
  return (
    <div className="flex flex-col mt-6 justify-center items-center h-40 border-dashed border-2 border-gray-300 rounded-lg bg-white">
      <Icon className="w-8 h-8 text-gray-500" />
      <span className="text-sm text-gray-800 mt-3">{children}</span>
    </div>
  );
}
