import React from 'react';
import ReactDOM from 'react-dom';
import { Router } from 'react-router';
import { createBrowserApplication } from 'framework';
import { forward } from 'effector';
import { History } from 'history';

import * as navigation from 'features/navigation';
import { sessionLoaded } from 'features/session';
import { ROUTES } from 'pages/routes';
import { readyToLoadSession } from 'features/session/model';
import { Application } from './application';
import * as serviceWorker from './service-worker';

const app = createBrowserApplication({
  ready: sessionLoaded.map(noop),
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

sessionLoaded.watch(() => render(app!.navigation.history!));
readyToLoadSession();

function render(history: History<any>) {
  ReactDOM.render(
    <Router history={history}>
      <Application />
    </Router>,
    document.querySelector('#root'),
  );
}

function noop(): void {}

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
