import { createEvent, createStore } from 'effector';

export const incrementClicked = createEvent();
export const resetClicked = createEvent();

export const $counterValue = createStore(0);

$counterValue.on(incrementClicked, (state) => state + 1).reset(resetClicked);
