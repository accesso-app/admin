import React from 'react';
import { withHatch } from 'framework';
import { checkAnonymous } from '../../features/session/model';
import { hatch } from './contract';

checkAnonymous({ when: hatch.enter });

export const LoginPage = withHatch(hatch, () => {
  return <button> Login </button>;
});
