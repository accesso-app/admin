import { createStore } from 'effector';
import { useList } from 'effector-react/scope';
import React from 'react';
import { Link } from 'react-router-dom';

import { NavigationTemplate, StackedTemplate } from '~/entities/navigation';
import { paths } from '~/pages/paths';
import { Application } from '~/shared/api';
import { Column, ColumnHead, Row, Table, TableBody, TableHead, Tag } from '~/shared/ui';

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
        <span className="lg:hidden pr-2 select-none">ID:</span>
        <pre className="font-mono text-sm lg:text-xs inline">{app.id}</pre>
      </Column>
      <Column className="">
        <span className="lg:hidden pr-2">Application name:</span>
        <Link
          to={paths.applicationsView(app.id)}
          title="View application"
          className="px-4 lg:-ml-4 py-2 whitespace-nowrap text-right text-md lg:text-sm font-medium text-indigo-600
          hover:text-indigo-900 hover:bg-indigo-50 border-transparent border rounded-md"
        >
          {app.title}
        </Link>
      </Column>
      <Column className="space-x-1 lg:space-y-1 flex lg:flex-col items-center lg:items-start">
        <span className="lg:hidden pr-2">Flags:</span>
        {app.isDev ? <Tag text="DEV Mode" color="red" /> : null}
        {app.allowedRegistrations ? (
          <Tag text="register allowed" color="blue" />
        ) : (
          <Tag text="register prohibited" color="red" />
        )}
      </Column>
      <Column className="text-right">
        <span className="lg:hidden pr-2">Actions:</span>
        <Link
          to={paths.applicationsEdit(app.id)}
          className="px-4 py-2 whitespace-nowrap text-right text-md lg:text-sm font-medium text-indigo-600
          hover:text-indigo-900 hover:bg-indigo-50 border-transparent border rounded-md"
        >
          Edit
        </Link>
        <Link
          to={paths.applicationsRegistrations(app.id)}
          className="px-4 py-2 whitespace-nowrap text-right text-md lg:text-sm font-medium text-indigo-600
          hover:text-indigo-900 hover:bg-indigo-50 border-transparent border rounded-md"
        >
          Registrations
        </Link>
      </Column>
    </Row>
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
