import React from 'react';
import { withHatch } from 'framework';
import { hatch } from './contract';

export const OauthDonePage: React.FC = withHatch(hatch, () => {
  return <div>OauthDone</div>;
});
