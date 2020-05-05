import { paths } from './paths';

import { AuthmenowDonePage } from './authmenow/done';
import { Error404Page } from './error404';
import { HomePage } from './home';
import { LoginPage } from './login';

export const routes = [
  { path: paths.home(), exact: true, component: HomePage },
  { path: paths.login(), exact: true, component: LoginPage },
  { path: paths.authmenowDone(), exact: true, component: AuthmenowDonePage },
  { path: '*', component: Error404Page },
];
