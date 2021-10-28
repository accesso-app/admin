import { createEvent, createStore } from 'effector';
import { useEvent, useStore } from 'effector-react/scope';
import React from 'react';

import {
  CheckIcon,
  ExclamationCircleIcon,
  ExclamationIcon,
  PlusIcon,
  RefreshIcon,
} from '@heroicons/react/solid';

import { NavigationTemplate, StackedTemplate } from '~/entities/navigation';

import { RequestStatus } from './common';

export const $emailForNewRequest = createStore('');
export const $newRequestStatus = createStore<RequestStatus>('new');

export const emailForNewRequestChanged = createEvent<string>();
export const createRegistrationRequestClicked = createEvent();

export const RegistationRequestsPage = () => {
  return (
    <NavigationTemplate>
      <StackedTemplate title="Registration Requests">
        <NewRegistrationRequest />
      </StackedTemplate>
    </NavigationTemplate>
  );
};

function NewRegistrationRequest() {
  const status = useStore($newRequestStatus);
  const onCreate = useEvent(createRegistrationRequestClicked);
  return (
    <Banner className="flex-col space-y-3 items-start md:flex-row md:space-y-0">
      <div className="flex items-center flex-1">
        <span className="p-2 rounded-lg bg-indigo-800">
          <PlusIcon className="h-6 w-6" />
        </span>
        <div className="flex-grow ml-3 truncate">Create a new registration request</div>
      </div>
      <div className="flex">
        {status === 'error' && (
          <>
            <ExclamationCircleIcon className="h-6 w-6 mx-2 text-red-300" />
            <span className="pr-4 text-white">Wow! Failed to do it :(</span>
          </>
        )}
        {status === 'invalid' && (
          <>
            <ExclamationIcon className="h-6 w-6 mx-2 text-yellow-300" />
            <span className="pr-4 text-white">Please, type correct email</span>
          </>
        )}
      </div>
      <form
        className="flex items-center"
        aria-disabled={status === 'pending'}
        onSubmit={(event) => {
          event.preventDefault();
          onCreate();
        }}
      >
        {status === 'done' && <CheckIcon className="h-6 w-6 mx-2 text-white transition -ml-8" />}
        {status === 'pending' && (
          <RefreshIcon className="h-6 w-6 mx-2 text-indigo-300 animate-spin -ml-8" />
        )}
        <InputSearch
          disabled={status === 'pending'}
          className="rounded-r-none"
          placeholder="email@domain.com"
        />
        <ButtonWhite
          disabled={status === 'pending'}
          className="rounded-l-none"
          onClick={onCreate as any}
        >
          Generate
        </ButtonWhite>
      </form>
    </Banner>
  );
}

function Banner({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <div
      className={`${className} bg-indigo-600 text-white py-3 px-3 rounded-lg shadow-md flex items-center`}
    >
      {children}
    </div>
  );
}

function ButtonWhite({ className, ...props }: React.HTMLProps<HTMLButtonElement>) {
  return (
    <button
      className={`${className} bg-white text-base box-content text-indigo-600 border-white border rounded-md py-2 px-4 transition shadow-sm
      hover:bg-indigo-100 active:bg-indigo-300 disabled:bg-indigo-400 disabled:border-indigo-400 disabled:text-blue-700 disabled:cursor-default`}
      {...(props as any)}
    />
  );
}

function InputWhite(props: React.HTMLProps<HTMLInputElement>) {
  return (
    <input
      {...(props as any)}
      className={`${props.className} text-base bg-transparent rounded-md box-content py-2 pl-4 pr-2 placeholder-blue-400 text-white border border-white
      focus:bg-indigo-50 focus:text-black focus:outline-none disabled:border-indigo-400 disabled:text-blue-700 disabled:cursor-default`}
    />
  );
}

function InputSearch(props: React.HTMLProps<HTMLInputElement>) {
  const value = useStore($emailForNewRequest);
  const changer = useEvent(emailForNewRequestChanged);
  const onChange = React.useCallback((event) => changer(event.target.value), [changer]);
  return <InputWhite {...props} value={value} onChange={onChange} />;
}
