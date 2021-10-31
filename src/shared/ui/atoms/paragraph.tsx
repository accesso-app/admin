import React from 'react';

export function Paragraph({
  title,
  children,
}: {
  title: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <>
      <h3 className={'text-lg font-medium leading-6 text-gray-900'}>{title}</h3>
      <p className={'mt-1 text-sm text-gray-600'}>{children}</p>
    </>
  );
}
