import { createEvent } from 'effector';
import React from 'react';
import { NavLink } from 'react-router-dom';

import { paths } from '~/pages/paths';

export interface HistoryChange {
  pathname: string;
  hash: string;
  search: string;
  action: 'PUSH' | 'POP' | 'REPLACE';
}

export const historyChanged = createEvent<HistoryChange>();

export const historyPush = createEvent<string>();
export const historyReplace = createEvent<string>();

export function StackedTemplate({
  title,
  children,
  extras,
}: {
  title: React.ReactNode;
  children: React.ReactNode;
  extras?: React.ReactNode;
}) {
  return (
    <>
      <Heading title={title} extras={extras} />
      <main>
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">{children}</div>
      </main>
    </>
  );
}

export function NavigationTemplate({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-full flex flex-col">
      <Navigation />
      {children}
    </div>
  );
}

function LogoutButton() {
  return (
    <button className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
      Sign out
    </button>
  );
}

function Navigation() {
  return (
    <nav className="bg-gray-800">
      <div className="max-w-7xl mx-auto px-0 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between sm:h-16">
          <div className="flex flex-col sm:items-center sm:flex-row">
            <div className="flex flex-1 sm:block">
              <div className="flex flex-1 sm:items-baseline flex-col sm:space-x-4 sm:flex-row">
                <MenuItem label="Dashboard" to={paths.dashboard()} exact />
                <MenuItem label="Applications" to={paths.applications()} />
                <MenuItem label="Users" to={paths.users()} />
                <MenuItem label="Registration Requests" to={paths.registrationRequests()} />
              </div>
            </div>
          </div>
          <div className="block hidden">
            <div className="flex items-baseline">
              <LogoutButton />
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

function Heading({ title, extras }: { title: React.ReactNode; extras?: React.ReactNode }) {
  return (
    <header className="bg-white shadow">
      <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 lg:flex lg:items-center lg:justify-between">
        <h1 className="text-3xl font-bold text-gray-900 min-w-0 flex-1">{title}</h1>
        {extras ? <div className="flex mt-4 lg:mt-0 lg:ml-4">{extras}</div> : null}
      </div>
    </header>
  );
}

function MenuItem({ label, to, exact = false }: { label: string; to: string; exact?: boolean }) {
  return (
    <NavLink
      className={(active) =>
        (active ? 'text-white bg-gray-900' : 'text-gray-300 hover:bg-gray-700 hover:text-white') +
        ' px-5 py-4 sm:px-3 sm:py-2 sm:rounded-md text-sm font-medium'
      }
      to={to}
      exact={exact}
      aria-current="page"
    >
      {label}
    </NavLink>
  );
}
