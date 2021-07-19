import React from 'react';
import { StyleSheetManager } from 'styled-components';

import { QueryParamProvider } from 'use-query-params';
import { Route } from 'react-router';
import { GenericTemplate } from '../ui';
import { Pages } from '../pages';

export const Application: React.FC = () => (
  <QueryParamProvider ReactRouterRoute={Route}>
    <StyleSheetManager>
      <GenericTemplate>
        <Pages />
      </GenericTemplate>
    </StyleSheetManager>
  </QueryParamProvider>
);
