import { Unit, createEvent, forward, Event } from 'effector';
import { condition } from 'patronum/condition';

import { historyPush } from 'features/navigation';
import { paths } from 'pages/paths';
import { $isAuthenticated } from './auth';

/**
 * If user not authenticated, redirect to login
 */
export function checkAuthenticated<T>(config: {
  when: Unit<T>;
  continue?: Unit<T>;
}): Event<T> {
  const continueLogic = config.continue ?? createEvent();
  condition({
    source: config.when,
    if: $isAuthenticated,
    then: continueLogic,
    else: historyPush.prepend(paths.login),
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
export function checkAnonymous<T>(config: {
  when: Unit<T>;
  continue?: Unit<T>;
}): Event<T> {
  const continueLogic = config.continue ?? createEvent();
  condition({
    source: config.when,
    if: $isAuthenticated,
    then: historyPush.prepend(paths.home),
    else: continueLogic,
  });

  const result = createEvent<T>();
  forward({
    from: continueLogic,
    to: result,
  });
  return result;
}
