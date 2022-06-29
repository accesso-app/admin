import React from 'react';

export const Input = (props: React.HTMLProps<HTMLInputElement>) => (
  <input
    {...props}
    className={`${
      props.className ?? ''
    } mt-1 focus:ring-indigo-500 bg-white px-3 py-2 border focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md`}
  />
);

export function Field({
  label,
  children,
  actions = null,
  className = '',
}: {
  label: string;
  children: React.ReactNode;
  actions?: React.ReactNode;
  className?: string;
}) {
  return (
    <>
      <div
        className={
          'block text-sm font-medium text-gray-700 flex flex-row justify-between' + className
        }
      >
        <span>{label}</span>
        {actions ? <div className="">{actions}</div> : null}
      </div>
      <div className="mt-1">{children}</div>
    </>
  );
}
