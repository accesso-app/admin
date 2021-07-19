import { createEvent } from 'effector';

export const historyPush = createEvent<string>();
export const historyPushSearch = createEvent<string>();
export const historyReplace = createEvent<string>();
