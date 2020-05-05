import { createEvent } from 'effector';
import { checkAnonymous } from 'features/session';

export const pageMounted = createEvent();

const pageReady = checkAnonymous({ when: pageMounted });
