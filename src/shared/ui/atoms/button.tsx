import React from 'react';

export function ButtonPrimary(props: React.HTMLProps<HTMLButtonElement>) {
  return (
    <button {...(props as any)} className={`${props.className ?? ''} button button-primary`} />
  );
}
