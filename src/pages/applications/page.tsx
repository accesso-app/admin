import { Link } from 'react-router-dom';
import React from 'react';
import { Table, TableBody, TableHead, Row, Column, ColumnHead } from '../../shared/ui';
import { NavigationTemplate, StackedTemplate } from '../../entities/navigation';
import { paths } from '../paths';

export function ApplicationsPage() {
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
            <Row>
              <Column>
                <span className="text-sm text-gray-800 font-medium">Cardbox [DEV]</span>
              </Column>
              <Column>
                <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                  Yes
                </span>
              </Column>
              <Column>
                <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                  Yes
                </span>
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
            <Row>
              <Column>
                <span className="text-sm text-gray-800 font-medium">Testing app</span>
              </Column>
              <Column>
                <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                  Yes
                </span>
              </Column>
              <Column>
                <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">
                  No
                </span>
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
          </TableBody>
        </Table>
      </StackedTemplate>
    </NavigationTemplate>
  );
}
