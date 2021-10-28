import { createStore } from 'effector';
import { useList } from 'effector-react/scope';
import React from 'react';
import { Link } from 'react-router-dom';

import { NavigationTemplate, StackedTemplate } from '~/entities/navigation';
import { paths } from '~/pages/paths';
import { Application } from '~/shared/api';
import { Column, ColumnHead, Row, Table, TableBody, TableHead } from '~/shared/ui';

export const $applications = createStore<Application[]>([]);

export function ApplicationsPage() {
  const list = useList($applications, (app) => <App app={app} />);
  return (
    <NavigationTemplate>
      <StackedTemplate title="Applications" extras={<CreateApplication />}>
        <Table>
          <TableHead>
            <ColumnHead>ID</ColumnHead>
            <ColumnHead>Application name</ColumnHead>
            <ColumnHead>Flags</ColumnHead>
            <ColumnHead>
              <span className="sr-only">Actions</span>
            </ColumnHead>
          </TableHead>
          <TableBody>{list}</TableBody>
        </Table>
      </StackedTemplate>
    </NavigationTemplate>
  );
}

function App({ app }: { app: Application }) {
  return (
    <Row>
      <Column>
        <span className="font-mono text-xs">{app.id}</span>
      </Column>
      <Column className="">
        <Link
          to={paths.applicationsView(app.id)}
          title="View application"
          className="px-4 -ml-4 py-2 whitespace-nowrap text-right text-sm font-medium text-indigo-600
          hover:text-indigo-900 hover:bg-indigo-50 border-transparent border rounded-md"
        >
          {app.title}
        </Link>
      </Column>
      <Column className="space-y-1 flex flex-col items-start">
        {app.isDev ? <Tag text="DEV Mode" color="red" /> : null}
        {app.allowedRegistrations ? (
          <Tag text="register allowed" color="blue" />
        ) : (
          <Tag text="register prohibited" color="red" />
        )}
      </Column>
      <Column className="text-right">
        <Link
          to={paths.applicationsEdit(app.id)}
          className="px-4 py-2 whitespace-nowrap text-right text-sm font-medium text-indigo-600
          hover:text-indigo-900 hover:bg-indigo-50 border-transparent border rounded-md"
        >
          Edit
        </Link>
        <Link
          to={paths.applicationsRegistrations(app.id)}
          className="px-4 py-2 whitespace-nowrap text-right text-sm font-medium text-indigo-600
          hover:text-indigo-900 hover:bg-indigo-50 border-transparent border rounded-md"
        >
          Registrations
        </Link>
      </Column>
    </Row>
  );
}

function Tag({ text, color }: { text: string; color: 'red' | 'blue' }) {
  const blue = 'bg-blue-100 text-blue-800';
  const red = 'bg-red-100 text-red-800';
  const cls = color === 'red' ? red : blue;
  return (
    <span className={'px-2 inline-flex text-xs leading-5 font-semibold rounded-full ' + cls}>
      {text}
    </span>
  );
}

function CreateApplication() {
  return (
    <Link
      to={paths.applicationsNew()}
      className="inline-flex items-center px-4 py-2 border border-transparent rounded-md
      text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-800
      focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
    >
      Create new
    </Link>
  );
}
