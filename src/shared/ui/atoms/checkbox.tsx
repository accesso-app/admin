import React from 'react';

export const Checkbox = (props: React.HTMLProps<HTMLInputElement>) => (
  <input
    type="checkbox"
    {...props}
    className={`${
      props.className ?? ''
    } form-tick appearance-none text-indigo-600 mt-1 h-6 w-6 bg-white block shadow-sm sm:text-sm border border-gray-300 rounded focus:ring-indigo-500`}
  />
);
