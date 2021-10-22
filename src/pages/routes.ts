import { RouteConfig } from 'react-router-config';

import { paths } from './paths';

import { ApplicationsPage } from './applications';
import { DashboardPage } from './dashboard';
import { NotFoundPage } from './not-found';

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
    path: '*',
    component: NotFoundPage,
  },
];
