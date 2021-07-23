import React from 'react';
import { StyleSheetManager } from 'styled-components';

import { QueryParamProvider } from 'use-query-params';
import { Route } from 'react-router';
import { GenericTemplate } from '../ui';
import { Pages } from '../pages';
import { Globals } from './globals';

export const Application: React.FC = () => (
  <QueryParamProvider ReactRouterRoute={Route}>
    <StyleSheetManager>
      <GenericTemplate>
        <Pages />
        <Globals/>
      </GenericTemplate>
    </StyleSheetManager>
  </QueryParamProvider>
);
