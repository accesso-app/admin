import { paths } from './paths';

import { HomePage } from './home';
import { Error404Page } from './error404';
import { LoginPage } from './login';

export const routes = [
  { path: paths.home(), exact: true, component: HomePage },
  { path: paths.login(), exact: true, component: LoginPage },
  { path: '*', component: Error404Page },
];
