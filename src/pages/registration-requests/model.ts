import { createEffect, createEvent, createStore, guard, sample } from 'effector';
import { createHatch } from 'framework';
import { every } from 'patronum';

import { RequestStatus } from '~/pages/registration-requests/common';
import { mutation, RegisterRequest, resolved } from '~/shared/api';

export const hatch = createHatch();

export const $emailForNewRequest = createStore('');
export const $newRequestStatus = createStore<RequestStatus>('new');

export const emailForNewRequestChanged = createEvent<string>();
export const createRegistrationRequestClicked = createEvent();

const validateRequestEmailFx = createEffect<string, string, string>((email) => {
  if (email.match(/\w+@\w+/gim)) {
    return email;
  }
  throw email;
});

const registrationRequestCreateFx = createEffect((targetEmail: string) =>
  resolved(() => {
    const { email, code, expiresAt } = mutation.registerRequestCreate({ email: targetEmail });
    return { email, code, expiresAt } as RegisterRequest;
  }),
);

$emailForNewRequest.reset(hatch.exit, hatch.enter);
$newRequestStatus.reset(hatch.exit, hatch.enter);

$emailForNewRequest.on(emailForNewRequestChanged, (_, email) => email);
$newRequestStatus.on(emailForNewRequestChanged, () => 'new');

guard({
  clock: createRegistrationRequestClicked,
  filter: every({
    stores: [validateRequestEmailFx.pending, registrationRequestCreateFx.pending],
    predicate: false,
  }),
  source: $emailForNewRequest,
  target: validateRequestEmailFx,
});

sample({
  clock: validateRequestEmailFx.doneData,
  target: registrationRequestCreateFx,
});

sample({
  clock: every({
    stores: [validateRequestEmailFx.pending, registrationRequestCreateFx.pending],
    predicate: true,
  }),
  fn: () => 'pending' as RequestStatus,
  target: $newRequestStatus,
});

$newRequestStatus.on(registrationRequestCreateFx.done, () => 'done');
$emailForNewRequest.reset(registrationRequestCreateFx.done);

// Add registration request to list and highlight it

$newRequestStatus.on(validateRequestEmailFx.fail, () => 'invalid');

$newRequestStatus.on(registrationRequestCreateFx.fail, () => 'error');
