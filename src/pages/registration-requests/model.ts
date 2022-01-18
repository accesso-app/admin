import { createDomain, createEffect, createEvent, createStore, guard, sample } from 'effector';
import { createHatch } from 'framework';
import { debug, every } from 'patronum';

import { LocalRegisterRequest, RequestStatus } from '~/pages/registration-requests/common';
import { mutation, query, resolved } from '~/shared/api';

export const hatch = createHatch(createDomain('registration-requests'));

export const $emailForNewRequest = createStore('');
export const $newRequestStatus = createStore<RequestStatus>('new');
export const $registerRequests = createStore<LocalRegisterRequest[]>([]);

export const emailForNewRequestChanged = createEvent<string>();
export const createRegistrationRequestClicked = createEvent();
export const registrationRequestDeleteClicked = createEvent<{ code: string }>();

const validateRequestEmailFx = createEffect<string, string, string>((email) => {
  if (email.match(/\w+@\w+/gim)) {
    return email;
  }
  throw email;
});

const registrationRequestCreateFx = createEffect((targetEmail: string) =>
  resolved(() => {
    const { email, code, expiresAt } = mutation.registerRequestCreate({ email: targetEmail });
    return { email, code, expiresAt, new: true } as LocalRegisterRequest;
  }),
);

const loadRequestsFx = createEffect(() =>
  resolved(() => {
    return query.registerRequests
      .map(
        (request) =>
          ({
            code: request.code,
            email: request.email,
            expiresAt: request.expiresAt,
            new: false,
          } as LocalRegisterRequest),
      )
      .reverse();
  }),
);

const registerRequestDeleteFx = createEffect((params: { code: string }) =>
  resolved(() => {
    const req = mutation.registerRequestDelete(params);
    return req?.email;
  }),
);

$emailForNewRequest.reset(hatch.exit, hatch.enter);
$newRequestStatus.reset(hatch.exit, hatch.enter);
// do not reset registerRequests to hide empty page between page changes

sample({ clock: hatch.enter, target: loadRequestsFx });

debug(loadRequestsFx, hatch.enter, hatch.update, hatch.exit);

$registerRequests.on(loadRequestsFx.doneData, (_, list) => list);

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
$registerRequests.on(registrationRequestCreateFx.doneData, (list, request) => [request, ...list]);

$newRequestStatus.on(validateRequestEmailFx.fail, () => 'invalid');

$newRequestStatus.on(registrationRequestCreateFx.fail, () => 'error');

sample({
  clock: registrationRequestDeleteClicked,
  target: registerRequestDeleteFx,
});

$registerRequests.on(registerRequestDeleteFx.done, (list, { params }) =>
  list.filter((item) => item.code !== params.code),
);
