import { Link } from 'react-router-dom';
import React from 'react';
import { Column, ColumnHead, Row, Table, TableBody, TableHead } from '../../shared/ui';
import { NavigationTemplate, StackedTemplate } from '../../entities/navigation';
import { paths } from '../paths';
import { createStore } from 'effector';
import { Application } from '../../shared/api';
import { useList, useStore } from 'effector-react/scope';

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

function App({ app }: { app: Application }) {
  return (
    <Row>
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
  // const list = useList($applications, (app) => <App app={app} />);
  const list = useStore($applications);
  return (
    <NavigationTemplate>
      <StackedTemplate title="Applications">
        <Table>
          <TableHead>
            <ColumnHead>Application name</ColumnHead>
            <ColumnHead>Is DEV</ColumnHead>
            <ColumnHead>Register allowed</ColumnHead>
            <ColumnHead>
              <span className="sr-only">Actions</span>
            </ColumnHead>
          </TableHead>
          <TableBody>
            {list.map((item, k) => (
              <App key={k} app={item} />
            ))}
          </TableBody>
        </Table>
      </StackedTemplate>
    </NavigationTemplate>
  );
}
