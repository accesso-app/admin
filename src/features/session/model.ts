import {
  createEvent,
  createStore,
  forward,
  guard,
  Unit,
  Event,
  combine,
  sample,
  createEffect,
} from 'effector';
import { condition } from 'patronum';
import { historyPush } from '../navigation';
import { PATHS } from '../../pages/paths';
import {
  sessionDelete,
  sessionGet,
  SessionCreateDone,
  SessionGetFail,
  SessionGetDone,
} from '../../api';

type SessionUser = SessionCreateDone['answer'];

export const readyToLoadSession = createEvent<void>();

export const sessionLoaded = sessionGet.finally;

export const $session = createStore<SessionUser | null>(null);
export const $isAuthenticated = $session.map((user) => user !== null);

// Show loading state if no session but first request is sent
export const $sessionPending = combine(
  [$session, sessionGet.pending],
  ([session, pending]) => !session && pending,
);

const sessionWaitFx = createEffect<void, SessionGetDone, SessionGetFail>({
  async handler() {
    // Here is pivot: sessionWaitFx was emitter before this point and events wait for it to resolve
    // but now sessionWaitFx effect became subscriber(watcher) itself
    return new Promise((resolve, reject) => {
      const watcher = sessionGet.finally.watch((response) => {
        if (response.status === 'done') {
          watcher();
          resolve(response.result);
          return;
        }
        reject(response.error);
      });
    });
  },
});

$session
  .on(sessionGet.doneData, (_, { answer }) => answer.userInfo)
  .on(sessionGet.failData, (session, { status }) => {
    if (status === 'unauthorized') {
      return null;
    }
    return session;
  })
  .on(sessionDelete.done, () => null);

guard({
  source: readyToLoadSession,
  filter: $sessionPending.map((is) => !is),
  target: sessionGet.prepend(() => ({})),
});

export function checkAuthenticated<T>(config: { when: Unit<T>; continue?: Unit<T> }): Event<T> {
  const continueLogic = config.continue ?? createEvent();

  // Synthetic event just to get store value
  const sessionPendingCheck = createEvent<boolean>();
  const authenticatedCheck = createEvent<boolean>();

  sample({
    source: $sessionPending,
    clock: config.when,
    target: sessionPendingCheck,
  });

  condition({
    source: sessionPendingCheck,
    if: (session) => session,
    then: sessionWaitFx,
    else: authenticatedCheck,
  });

  guard({
    source: authenticatedCheck,
    filter: $isAuthenticated.map((is) => !is),
    target: historyPush.prepend(PATHS.login),
  });

  // Used as guard event
  const continueTrigger = createEvent();
  sample({
    source: config.when,
    target: continueLogic,
    clock: continueTrigger,
  });

  condition({
    source: sessionWaitFx.finally,
    if: $isAuthenticated,
    then: continueTrigger,
    else: historyPush.prepend(PATHS.login),
  });

  const result = createEvent<T>();
  forward({
    from: continueLogic,
    to: result,
  });
  return result;
}

/**
 * If user **anonymous**, continue, else redirect to home
 */
export function checkAnonymous<T>(config: { when: Unit<T>; continue?: Unit<T> }): Event<T> {
  const continueLogic = config.continue ?? createEvent<T>();

  // Synthetic event just to get store value
  const sessionPendingCheck = createEvent<boolean>();
  const authenticatedCheck = createEvent<boolean>();

  // TODO probably replaceble if assign result of sample
  //   condition({
  //     source: sample({
  //        source: $sessionPending,
  //        clock: config.when,
  //     }),
  //     if: session => session,
  //     then: sessionWaitFx
  //   })
  sample({
    source: $sessionPending,
    clock: config.when,
    target: sessionPendingCheck,
  });

  condition({
    source: sessionPendingCheck,
    if: (session) => session,
    then: sessionWaitFx,
    else: authenticatedCheck,
  });

  guard({
    source: authenticatedCheck,
    filter: $isAuthenticated,
    target: historyPush.prepend(PATHS.home),
  });

  // Used as guard event
  const continueTrigger = createEvent();
  sample({
    source: config.when,
    target: continueLogic,
    clock: continueTrigger,
  });

  condition({
    source: sessionWaitFx.finally,
    if: $isAuthenticated,
    then: historyPush.prepend(PATHS.home),
    else: continueTrigger,
  });

  const result = createEvent<T>();
  forward({
    from: continueLogic,
    to: result,
  });
  return result;
}
