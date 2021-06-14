import React from 'react';
import ReactDOM from 'react-dom';
import { Router } from 'react-router';
import { createBrowserApplication } from 'framework';
import { forward } from 'effector';
import { History } from 'history';

import * as navigation from 'entities/navigation';
import { sessionLoad, sessionLoadFinished } from 'entities/session';
import { ROUTES } from 'pages/routes';
import { Application } from './application';
import * as serviceWorker from './service-worker';

const app = createBrowserApplication({
  ready: sessionLoadFinished,
  routes: ROUTES,
});

if (!app || !app.navigation.history) {
  throw new Error(
    'Failed to initialize browserApplication. `app.navigation.history` is empty, maybe you trying to create app in non browser application?',
  );
}

forward({
  from: navigation.historyPush,
  to: app.navigation.historyPush,
});
forward({
  from: navigation.historyPushSearch,
  to: app.navigation.historyPushSearch,
});
forward({
  from: navigation.historyReplace,
  to: app.navigation.historyReplace,
});

sessionLoadFinished.watch(() => render(app!.navigation.history!));
sessionLoad();

function render(history: History<any>) {
  ReactDOM.render(
    <Router history={history}>
      <Application />
    </Router>,
    document.querySelector('#root'),
  );
}

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
