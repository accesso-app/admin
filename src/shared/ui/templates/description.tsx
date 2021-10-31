import React from 'react';

export function DescriptionTemplate({
  className = '',
  description,
  children,
}: {
  className?: string;
  description: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <div className={`${className} md:grid md:grid-cols-3 md:gap-6`}>
      <div className={'md:col-span-1'}>
        <div className={'px-4 sm:px-0'}>{description}</div>
      </div>
      <div className={'mt-5 md:mt-0 md:col-span-2'}>{children}</div>
    </div>
  );
}
