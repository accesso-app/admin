import { createEffect } from 'effector';

export type SessionUser = {};

export const sessionGet = createEffect<
  void,
  { body: { user: {} } },
  { status: number }
>();

sessionGet.use(() => {
  // eslint-disable-next-line no-throw-literal
  throw { status: 401 };
});
