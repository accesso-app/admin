import dayjs from 'dayjs';
import { createEvent, createStore } from 'effector';
import { useEvent, useList, useStore } from 'effector-react/scope';
import React from 'react';

import { UserAddIcon } from '@heroicons/react/outline';
import {
  CheckIcon,
  ExclamationCircleIcon,
  ExclamationIcon,
  PlusIcon,
  RefreshIcon,
} from '@heroicons/react/solid';

import { NavigationTemplate, StackedTemplate } from '~/entities/navigation';
import { Column, ColumnHead, Row, Table, TableBody, TableHead, Tag } from '~/shared/ui';

import { LocalRegisterRequest, RequestStatus } from './common';

export const $emailForNewRequest = createStore('');
export const $newRequestStatus = createStore<RequestStatus>('new');
export const $registerRequests = createStore<LocalRegisterRequest[]>([]);

export const emailForNewRequestChanged = createEvent<string>();
export const createRegistrationRequestClicked = createEvent();
export const registrationRequestDeleteClicked = createEvent<{ code: string }>();

export const RegistationRequestsPage = () => {
  return (
    <NavigationTemplate>
      <StackedTemplate title="Registration Requests">
        <NewRegistrationRequest />
        <RegistrationRequestsList />
      </StackedTemplate>
    </NavigationTemplate>
  );
};

function NewRegistrationRequest() {
  const status = useStore($newRequestStatus);
  const onCreate = useEvent(createRegistrationRequestClicked);
  return (
    <Banner className="flex-col space-y-3 items-start md:flex-row md:space-y-0">
      <div className="flex items-center flex-1 self-start lg:self-auto">
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
        className="flex items-center self-end lg:self-auto"
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
      className={`${className} bg-indigo-600 text-white py-3 px-3 sm:rounded-lg shadow-md flex items-center`}
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

const $isEmpty = $registerRequests.map((list) => list.length === 0);

function RegistrationRequestsList() {
  const isEmpty = useStore($isEmpty);
  const list = useList($registerRequests, (request) => <RegistrationRequest request={request} />);

  if (isEmpty) {
    return (
      <div className="flex flex-col mt-6 justify-center items-center h-40 border-dashed border-2 border-gray-300 rounded-lg bg-white">
        <UserAddIcon className="w-8 h-8 text-gray-500" />
        <span className="text-sm text-gray-800 mt-3">
          Fill form to generate registration request
        </span>
      </div>
    );
  }

  return (
    <Table className="mt-6">
      <TableHead>
        <ColumnHead>Email</ColumnHead>
        <ColumnHead>Code</ColumnHead>
        <ColumnHead>Expiration</ColumnHead>
        <ColumnHead>
          <span className="sr-only">Actions</span>
        </ColumnHead>
      </TableHead>
      <TableBody>{list}</TableBody>
    </Table>
  );
}

function RegistrationRequest({ request }: { request: LocalRegisterRequest }) {
  const date = React.useMemo(() => dayjs(request.expiresAt), [request.expiresAt]);
  const isExpired = dayjs().isAfter(date);

  const [deleting, toggleDelete] = React.useReducer((is) => !is, false);
  const deleteClicked = useEvent(registrationRequestDeleteClicked);
  const onDelete = React.useCallback(
    () => deleteClicked({ code: request.code! }),
    [request.code, deleteClicked],
  );
  React.useEffect(() => {
    if (deleting) toggleDelete();
  }, [request.code]);

  return (
    <Row className={request.new ? 'bg-yellow-50' : ''}>
      <Column>
        <span className="lg:hidden pr-2 select-none">Email:</span>
        <pre className="font-mono inline">{request.email}</pre>
      </Column>
      <Column>
        <span className="lg:hidden pr-2 select-none">Code:</span>
        <pre className="font-mono inline">{request.code}</pre>
      </Column>
      <Column>
        <span className="lg:hidden pr-2">Expiration:</span>
        {isExpired ? (
          <Tag text="Expired" title={date.format('HH:mm DD.MM.YYYY')} color="red" />
        ) : (
          <Tag text="Valid" title={date.format('HH:mm DD.MM.YYYY')} color="blue" />
        )}
      </Column>
      <Column className="text-right">
        <span className="lg:hidden pr-2">Actions:</span>
        {deleting ? (
          <>
            <button
              className="px-4 py-2 whitespace-nowrap text-right text-md lg:text-sm font-medium text-red-600
          hover:text-white hover:bg-red-600 border-transparent border rounded-md"
              onClick={onDelete}
            >
              Yes
            </button>
            <button
              className="px-4 py-2 whitespace-nowrap text-right text-md lg:text-sm font-medium text-gray-600
          hover:text-gray-900 hover:bg-gray-200 border-transparent border rounded-md"
              onClick={toggleDelete}
            >
              No, undo
            </button>
          </>
        ) : (
          <button
            className="px-4 py-2 whitespace-nowrap text-right text-md lg:text-sm font-medium text-red-600
          hover:text-red-900 hover:bg-red-50 border-transparent border rounded-md"
            onClick={toggleDelete}
          >
            Delete
          </button>
        )}
      </Column>
    </Row>
  );
}
