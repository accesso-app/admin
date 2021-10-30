import { createEvent, createStore } from 'effector';
import { useList, useStore, useEvent } from 'effector-react/scope';
import React from 'react';
import { Link } from 'react-router-dom';

import { DocumentSearchIcon, RefreshIcon, SearchIcon, XIcon } from '@heroicons/react/solid';

import { NavigationTemplate, StackedTemplate } from '~/entities/navigation';
import { paths } from '~/pages/paths';
import { Column, ColumnHead, EmptyState, Row, Table, TableBody, TableHead } from '~/shared/ui';

import { LocalUser } from './common';

export const searchQueryChanged = createEvent<string>();
export const searchQueryReset = createEvent();

export const $users = createStore<LocalUser[]>([]);
export const $searchQuery = createStore('');
export const $searchPending = createStore(false);

export function UsersPage() {
  return (
    <NavigationTemplate>
      <StackedTemplate title="Registered users" extras={<Search />}>
        <Users />
      </StackedTemplate>
    </NavigationTemplate>
  );
}

function Search() {
  return null; // TODO: create graphql `usersSearch({ query })`
  const query = useStore($searchQuery);
  const pending = useStore($searchPending);
  const changeQuery = useEvent(searchQueryChanged);
  const resetQuery = useEvent(searchQueryReset);
  const onChange = React.useCallback((event) => changeQuery(event.target.value), [changeQuery]);

  return (
    <div className="relative rounded-md shadow-sm focus-within:ring-offset-2 focus-within:ring-2 focus-within:ring-indigo-400">
      <div className="absolute l-0 top-0 bottom-0 flex justify-center items-center pl-2">
        {pending ? (
          <RefreshIcon className="text-gray-400 h-4 w-4 animate-spin" />
        ) : (
          <SearchIcon className="text-gray-400 h-4 w-4" />
        )}
      </div>
      <input
        type="text"
        className={`border block w-full pl-7 pr-9 py-2 sm:text-sm border-gray-300 rounded-md
        focus-within:outline-none`}
        placeholder="Search users"
        value={query}
        onChange={onChange}
      />
      <div
        className={
          (query !== '' ? '' : 'hidden') +
          ` absolute cursor-pointer right-1 top-1 bottom-1 flex justify-center items-center px-2
         group hover:bg-blue-50 rounded-md`
        }
        onClick={resetQuery}
      >
        <XIcon className="text-gray-400 group-hover:text-blue-800 h-4 w-4" />
      </div>
    </div>
  );
}

const $isEmpty = $users.map((list) => list.length === 0);

function Users() {
  const isEmpty = useStore($isEmpty);
  const list = useList($users, {
    getKey: (user) => user.id,
    fn: (user) => <UserRow user={user} />,
  });

  if (isEmpty) {
    return <EmptyState icon={DocumentSearchIcon}>Nothing found. Start the search again</EmptyState>;
  }

  return (
    <Table>
      <TableHead>
        <ColumnHead>Name</ColumnHead>
        <ColumnHead>EMail</ColumnHead>
        <ColumnHead className="hidden">Flags</ColumnHead>
        <ColumnHead>
          <span className="sr-only">Actions</span>
        </ColumnHead>
      </TableHead>
      <TableBody>{list}</TableBody>
    </Table>
  );
}

function UserRow({ user }: { user: LocalUser }) {
  return (
    <Row>
      <Column>
        <span className="lg:hidden pr-2 select-none">Name:</span>
        <span className="inline">
          {user.firstName} {user.lastName}
        </span>
      </Column>
      <Column>
        <span className="lg:hidden pr-2 select-none">Email:</span>
        <pre className="inline">{user.email}</pre>
      </Column>
      <Column className="hidden">&nbsp;</Column>
      <Column className="text-right">
        <span className="lg:hidden pr-2">Actions:</span>
        <Link
          to={paths.usersView(user.id)}
          className="px-4 py-2 whitespace-nowrap text-right text-md lg:text-sm font-medium text-indigo-600
          hover:text-indigo-900 hover:bg-indigo-50 border-transparent border rounded-md"
        >
          Open
        </Link>
      </Column>
    </Row>
  );
}
