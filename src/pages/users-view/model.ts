import { combine, createEffect, createEvent, createStore, guard, restore, sample } from 'effector';
import { createHatch } from 'framework';
import { spread } from 'patronum';

import { query, resolved } from '~/shared/api';

import { LocalUser } from './common';

export const hatch = createHatch();

const userLoadFx = createEffect((userId: string) =>
  resolved(() => {
    const user = query.userById({ userId });
    if (!user) return null;
    return {
      id: user.id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
    } as LocalUser;
  }),
);

const userSaveFx = createEffect((user: LocalUser) => {
  return user;
});

export const profileSubmitted = createEvent();
export const emailChanged = createEvent<string>();
export const firstNameChanged = createEvent<string>();
export const lastNameChanged = createEvent<string>();

export const $originalName = createStore('');

export const $id = createStore('');
export const $email = restore(emailChanged, '');
export const $firstName = restore(firstNameChanged, '');
export const $lastName = restore(lastNameChanged, '');
export const $isUserFound = createStore(false);
export const $userLoading = userLoadFx.pending;

const $userId = hatch.$params.map((params) => params['userId']);

sample({ clock: [hatch.enter, hatch.update], source: $userId, target: userLoadFx });

$isUserFound.on(userLoadFx.doneData, (_, user) => user !== null);

const userLoaded = guard({
  clock: [userLoadFx.doneData, userSaveFx.doneData],
  filter: (user): user is LocalUser => user !== null,
});

spread({
  source: userLoaded,
  targets: {
    id: $id,
    email: $email,
    firstName: $firstName,
    lastName: $lastName,
  },
});

$originalName.on(userLoaded, (_, { firstName, lastName }) => `${firstName} ${lastName}`);

sample({
  source: { id: $id, email: $email, firstName: $firstName, lastName: $lastName },
  clock: profileSubmitted,
  target: userSaveFx,
});
