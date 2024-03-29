import { RouteConfig } from 'react-router-config';

import { ApplicationsPage } from '~/pages/applications';
import { ApplicationsNewPage } from '~/pages/applications-new';
import { ApplicationsEditPage } from "~/pages/applications-edit";
import { DashboardPage } from '~/pages/dashboard';
import { NotFoundPage } from '~/pages/not-found';
import { RegistrationRequestsPage } from '~/pages/registration-requests';
import { UsersPage } from '~/pages/users';
import { UsersViewPage } from '~/pages/users-view';

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
    path: paths.applicationsEdit(),
    component: ApplicationsEditPage,
    exact: true,
  },
  {
    path: paths.registrationRequests(),
    component: RegistrationRequestsPage,
    exact: true,
  },
  {
    path: paths.users(),
    component: UsersPage,
    exact: true,
  },
  {
    path: paths.usersView(),
    component: UsersViewPage,
    exact: true,
  },
  {
    path: '*',
    component: NotFoundPage,
  },
];
