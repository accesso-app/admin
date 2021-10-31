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
  htmlFor,
}: {
  label: string;
  children: React.ReactNode;
  htmlFor?: string;
}) {
  return (
    <>
      <label htmlFor={htmlFor} className={'block text-sm font-medium text-gray-700'}>
        {label}
      </label>
      <div className="mt-1">{children}</div>
    </>
  );
}
