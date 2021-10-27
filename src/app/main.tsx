import { allSettled, createEvent, fork, forward } from 'effector';
import { Provider } from 'effector-react/scope';
import { createBrowserApplication } from 'framework';
import React from 'react';
import ReactDOM from 'react-dom';
import { Router } from 'react-router-dom';

import '~/app/main.css';
import { historyChanged, historyPush, historyReplace } from '~/entities/navigation';
import { Pages } from '~/pages';
import { ROUTES } from '~/pages/routes';

const ready = createEvent();

const app = createBrowserApplication({
  ready,
  routes: ROUTES,
});

forward({
  from: app.navigation.historyChanged,
  to: historyChanged,
});

forward({
  from: historyPush,
  to: app.navigation.historyPush,
});

forward({
  from: historyReplace,
  to: app.navigation.historyReplace,
});

const scope = fork();

allSettled(ready, { scope }).then(() => {
  ReactDOM.render(
    <React.StrictMode>
      <Provider value={scope}>
        <Router history={app.navigation.history}>
          <Pages />
        </Router>
      </Provider>
    </React.StrictMode>,
    document.getElementById('root'),
  );
});
