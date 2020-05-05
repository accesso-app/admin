import { createEvent, forward } from 'effector';
import { checkAnonymous, authmenowLogin } from 'features/session';

export const pageMounted = createEvent();
export const loginClicked = createEvent();

const pageReady = checkAnonymous({ when: pageMounted });

forward({
  from: loginClicked,
  to: authmenowLogin,
});
