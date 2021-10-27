import { RouteConfig } from 'react-router-config';

import { ApplicationsNewPage } from '~/pages/applications-new';

import { ApplicationsPage } from './applications';
import { DashboardPage } from './dashboard';
import { NotFoundPage } from './not-found';
import { paths } from './paths';

export const ROUTES: RouteConfig[] = [
  {
    path: paths.dashboard(),
    component: DashboardPage,
    exact: true,
  },
  {
    path: paths.applications(),
    component: ApplicationsPage,
    exact: true,
  },
  {
    path: paths.applicationsNew(),
    component: ApplicationsNewPage,
    exact: true,
  },
  {
    path: '*',
    component: NotFoundPage,
  },
];
