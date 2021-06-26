import { createEvent, forward } from 'effector';

export const sessionLoadFinished = createEvent();
export const sessionLoad = createEvent();
// Load session here
forward({ from: sessionLoad, to: sessionLoadFinished });
