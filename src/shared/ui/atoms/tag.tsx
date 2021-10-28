import React from 'react';

export function Tag({
  text,
  color,
  title,
}: {
  text: string;
  color: 'red' | 'blue';
  title?: string;
}) {
  const blue = 'bg-blue-100 text-blue-800';
  const red = 'bg-red-100 text-red-800';
  const cls = color === 'red' ? red : blue;
  return (
    <span
      className={'px-2 inline-flex text-xs leading-5 font-semibold rounded-full ' + cls}
      title={title}
    >
      {text}
    </span>
  );
}
