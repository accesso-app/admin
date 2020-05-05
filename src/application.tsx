import * as React from 'react';
import { Router } from 'react-router';

import { history } from 'features/navigation';
import { readyToLoadSession } from 'features/session';
import { GenericTemplate } from './ui';
import { Pages } from './pages';

export const Application: React.FC = () => (
  <Router history={history}>
    <Internal />
  </Router>
);

const Internal: React.FC = () => {
  React.useEffect(() => readyToLoadSession(), []);

  return (
    <GenericTemplate>
      <Pages />
    </GenericTemplate>
  );
};
