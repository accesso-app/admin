import React from 'react';

export function Note({ text, className = '' }: { text: string; className?: string }) {
  return (
    <div className={`${className} py-3 px-4 text-gray-800 bg-gray-100 rounded-md`}>
      <span className="italic pr-1 text-indigo-800">NOTE:</span>
      <span>{text}</span>
    </div>
  );
}
