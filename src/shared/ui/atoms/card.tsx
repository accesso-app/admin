import React from 'react';

export function Card({
  children,
  className = '',
  footer,
}: {
  children: React.ReactNode;
  className?: string;
  footer?: React.ReactNode;
}) {
  return (
    <div className={`shadow sm:rounded-md sm:overflow-hidden`}>
      <div className={`${className} px-4 py-5 bg-white sm:p-6`}>{children}</div>
      {footer ? <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">{footer}</div> : null}
    </div>
  );
}
