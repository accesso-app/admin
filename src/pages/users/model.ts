import { createEffect, createEvent, createStore, forward, sample } from 'effector';
import { createHatch } from 'framework';
import { debounce, debug } from 'patronum';

import { query, resolved, User } from '~/shared/api';

import { LocalUser } from './common';

export const hatch = createHatch();

export const searchQueryChanged = createEvent<string>();
export const searchQueryReset = createEvent();

export const $users = createStore<LocalUser[]>([]);
export const $searchQuery = createStore('');
export const $searchPending = createStore(false);

function mapUser(user: User): LocalUser {
  return {
    id: user.id!,
    email: user.email!,
    firstName: user.firstName!,
    lastName: user.lastName!,
  };
}

const usersAllFetchFx = createEffect(() =>
  resolved(() => query.users.map(mapUser), { noCache: true }),
);

const usersSearchFx = createEffect((search: string) =>
  resolved(() => query.usersSearch({ query: search }).map(mapUser), { noCache: true }),
);

sample({
  clock: hatch.enter,
  target: usersAllFetchFx,
});

$users.on(usersAllFetchFx.doneData, (_, users) => users);

$searchQuery
  .on(searchQueryChanged, (_, query) => query)
  .reset(searchQueryReset, hatch.enter, hatch.exit);

debounce({ source: $searchQuery, target: usersSearchFx, timeout: 300 });

forward({ from: usersSearchFx.pending, to: $searchPending });

$users.on(usersSearchFx.doneData, (_, users) => users);
