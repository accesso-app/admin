import React from 'react';
import { createEvent, createStore } from 'effector';
import styled from 'styled-components';
import { reflect } from '@effector/reflect';
import { withHatch } from 'framework';

import { format } from 'shared/lib/format';
import { hatch } from './contract';

export const $counterValue = createStore(0);
export const incrementClicked = createEvent<React.MouseEvent<HTMLButtonElement>>();
export const resetClicked = createEvent<React.MouseEvent<HTMLButtonElement>>();

export const HomePage: React.FC = withHatch(hatch, () => (
  <div>
    <h1>Effector</h1>
    <Value />
    <div>
      <Increment>Increment</Increment>
      <Reset>Reset</Reset>
    </div>
  </div>
));

const Value = reflect({
  view: styled.h2``,
  bind: { children: format`Counter value: ${$counterValue}` },
});

const Button = styled.button``;

const Increment = reflect({
  view: Button,
  bind: { onClick: incrementClicked },
});

const Reset = reflect({
  view: Button,
  bind: { onClick: resetClicked },
});
