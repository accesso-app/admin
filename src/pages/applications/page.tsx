import { createStore } from 'effector';
import { useList } from 'effector-react/scope';
import React from 'react';
import { Link } from 'react-router-dom';

import { NavigationTemplate, StackedTemplate } from '~/entities/navigation';
import { paths } from '~/pages/paths';
import { Application } from '~/shared/api';
import { Column, ColumnHead, Row, Table, TableBody, TableHead } from '~/shared/ui';

export const $applications = createStore<Application[]>([]);

function Tag({ enabled }: { enabled: boolean }) {
  const yes = 'bg-blue-100 text-blue-800';
  const no = 'bg-red-100 text-red-800';
  const cls = enabled ? yes : no;
  const text = enabled ? 'Yes' : 'No';

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

function App({ app }: { app: Application }) {
  return (
    <Row>
      <ColumnHead>
        <span className="font-mono">{app.id}</span>
      </ColumnHead>
      <Column>
        <span className="text-sm text-gray-800 font-medium">{app.title}</span>
      </Column>
      <Column>
        <Tag enabled={app.isDev ?? false} />
      </Column>
      <Column>
        <Tag enabled={app.allowedRegistrations ?? false} />
      </Column>
      <Column className="text-right">
        <Link
          to={paths.applications()}
          className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium text-indigo-600 hover:text-indigo-900"
        >
          Open
        </Link>
        <Link
          to={paths.applications()}
          className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium text-indigo-600 hover:text-indigo-900"
        >
          Edit
        </Link>
      </Column>
    </Row>
  );
}

export function ApplicationsPage() {
  const list = useList($applications, (app) => <App app={app} />);
  return (
    <NavigationTemplate>
      <StackedTemplate title="Applications" extras={<CreateApplication />}>
        <Table>
          <TableHead>
            <ColumnHead>ID</ColumnHead>
            <ColumnHead>Application name</ColumnHead>
            <ColumnHead>Is DEV</ColumnHead>
            <ColumnHead>Register allowed</ColumnHead>
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
