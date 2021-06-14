import { createEvent } from 'effector';
import { forward } from 'effector/effector.cjs';

export const sessionLoadFinished = createEvent();
export const sessionLoad = createEvent();
// Load session here
forward({ from: sessionLoad, to: sessionLoadFinished });
