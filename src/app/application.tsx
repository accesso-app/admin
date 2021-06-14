import React from 'react';
import { StyleSheetManager } from 'styled-components';

import { GenericTemplate } from '../ui';
import { Pages } from '../pages';

export const Application: React.FC = () => (
  <StyleSheetManager>
    <GenericTemplate>
      <Pages />
    </GenericTemplate>
  </StyleSheetManager>
);
