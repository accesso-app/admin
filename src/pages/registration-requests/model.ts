import { createDomain, createEffect, createEvent, createStore, guard, sample } from 'effector';
import { createHatch } from 'framework';
import { every } from 'patronum';

import { LocalRegisterRequest, RequestStatus } from '~/pages/registration-requests/common';
import { mutation, query, resolved } from '~/shared/api';

export const hatch = createHatch(createDomain('registration-requests'));

export const $emailForNewRequest = createStore('');
export const $newRequestStatus = createStore<RequestStatus>('new');
export const $registerRequests = createStore<LocalRegisterRequest[]>([]);
type Code = string;
export const $registerRequestPendingMap = createStore<Record<Code, boolean>>({});

export const emailForNewRequestChanged = createEvent<string>();
export const createRegistrationRequestClicked = createEvent();
export const registrationRequestDeleteClicked = createEvent<{ code: string }>();
export const registrationRequestGenerateNewClicked =
  createEvent<{ generateForEmail: string; clickedOnCode: string }>();

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

const registrationRequestMakeANewFx = createEffect(
  (options: { generateForEmail: string; clickedOnCode: string }) =>
    resolved(
      () => {
        const { email, code, expiresAt } = mutation.registerRequestCreate({
          email: options.generateForEmail,
        });
        return { email, code, expiresAt, new: true } as LocalRegisterRequest;
      },
      { refetch: true, noCache: true },
    ),
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

$registerRequestPendingMap
  .on(registerRequestDeleteFx, (map, params) => ({
    ...map,
    [params.code]: true,
  }))
  .on(registerRequestDeleteFx.finally, (map, { params }) => deleteIfExists(map, params.code));

$registerRequests.on(registerRequestDeleteFx.done, (list, { params }) =>
  list.filter((item) => item.code !== params.code),
);

sample({
  clock: registrationRequestGenerateNewClicked,
  target: registrationRequestMakeANewFx,
});

$registerRequestPendingMap
  .on(registrationRequestMakeANewFx, (map, params) => ({
    ...map,
    [params.clickedOnCode]: true,
  }))
  .on(registrationRequestMakeANewFx.finally, (map, { params }) =>
    deleteIfExists(map, params.clickedOnCode),
  );

$registerRequests.on(registrationRequestMakeANewFx.done, (list, { params, result: request }) => {
  const clickedRequestIndex = list.findIndex((item) => item.code === params.clickedOnCode);
  if (clickedRequestIndex === -1) {
    // If found not request with that code, just add to the list beginning
    return [request, ...list];
  }

  // If clicked on first element, index will be -1
  const insertIndex = Math.max(clickedRequestIndex - 1, 0);

  // Add just before clicked element
  list.splice(insertIndex, 0, request);
  return [...list];
});

/**
 * Modifies original map and returns shallow copy
 */
function deleteIfExists<T extends object, K extends keyof T>(map: T, key: K): T {
  if (map[key]) {
    delete map[key];
    return { ...map };
  }
  return map;
}
