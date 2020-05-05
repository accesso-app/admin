import { createEvent } from 'effector';
import { checkAuthenticated } from 'features/session';

export const pageMounted = createEvent();

const pageReady = checkAuthenticated({ when: pageMounted });
