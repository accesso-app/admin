import React from 'react';
import { NavLink } from 'react-router-dom';

import { paths } from '../../pages/paths';
import { createEvent } from 'effector';

export interface HistoryChange {
  pathname: string;
  hash: string;
  search: string;
  action: 'PUSH' | 'POP' | 'REPLACE';
}

export const historyChanged = createEvent<HistoryChange>();

export const historyPush = createEvent<string>();
export const historyReplace = createEvent<string>();

export function StackedTemplate({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <>
      <Heading title={title} />
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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <div className="block">
              <div className="flex items-baseline space-x-4">
                <MenuItem label="Dashboard" to={paths.dashboard()} exact />
                <MenuItem label="Applications" to={paths.applications()} />
                <MenuItem label="Users" to={paths.users()} />
              </div>
            </div>
          </div>
          <div className="block">
            <div className="flex items-baseline">
              <LogoutButton />
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

function Heading({ title }: { title: string }) {
  return (
    <header className="bg-white shadow">
      <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900">{title}</h1>
      </div>
    </header>
  );
}

function MenuItem({ label, to, exact = false }: { label: string; to: string; exact?: boolean }) {
  return (
    <NavLink
      className={(active) =>
        (active ? 'text-white bg-gray-900' : 'text-gray-300 hover:bg-gray-700 hover:text-white') +
        ' px-3 py-2 rounded-md text-sm font-medium'
      }
      to={to}
      exact={exact}
      aria-current="page"
    >
      {label}
    </NavLink>
  );
}
