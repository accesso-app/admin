import React from 'react';

export function Table({
  children,
  className = '',
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`${className} shadow border-b border-gray-200`}>
      <table className="min-w-full divide-y divide-gray-200 rounded-md flex flex-col lg:table">
        {children}
      </table>
    </div>
  );
}

export function TableHead({ children }: { children: React.ReactNode }) {
  return (
    <thead className="bg-gray-50 hidden lg:table-header-group">
      <tr className="">{children}</tr>
    </thead>
  );
}

export function ColumnHead({ children }: { children: React.ReactNode }) {
  return (
    <th
      scope="col"
      className="lg:px-6 lg:py-3 px-3 py-2 text-left text-xs font-medium text-gray-600 uppercase tracking-wider"
    >
      {children}
    </th>
  );
}

export function Column({
  children,
  className = '',
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <td className={className + ' whitespace-normal lg:px-6 lg:py-4 px-3 py-2'}>{children}</td>;
}

export function TableBody({ children }: { children: React.ReactNode }) {
  return <tbody className="bg-white divide-y divide-gray-200">{children}</tbody>;
}

export function Row({
  children,
  className = '',
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <tr className={`${className} bg-white hover:bg-gray-50 flex flex-col items-start lg:table-row`}>
      {children}
    </tr>
  );
}
