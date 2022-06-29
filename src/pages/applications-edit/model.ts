import { createEffect, createEvent, createStore, guard, merge, restore, sample } from 'effector';
import { createHatch } from 'framework';
import { spread } from 'patronum';

import { Application, mutation, query, resolved } from '~/shared/api';

interface LocalApp {
  id: string;
  isDev: boolean;
  redirectUri: Array<string>;
  title: string;
  allowedRegistrations: boolean;
}

export const hatch = createHatch();

export const applicationSubmitted = createEvent();
export const titleChanged = createEvent<string>();
export const redirectUriChanged = createEvent<{ index: number; uri: string }>();
export const redirectUriAddClicked = createEvent();
export const allowedRegChanged = createEvent<void>();
export const isDevChanged = createEvent<void>();

export const $id = createStore('');
export const $title = restore(titleChanged, '');
export const $redirectUri = createStore<string[]>([]);
export const $allowedRegistrations = createStore(false);
export const $isDev = createStore(false);

$isDev.on(isDevChanged, (isDev) => !isDev);
$allowedRegistrations.on(allowedRegChanged, (allowed) => !allowed);

const appSaveFx = createEffect((app: LocalApp) =>
  resolved(() => {
    const fetched = mutation.applicationEdit({ form: app });
    if (!fetched) return null;
    return mapApp(fetched);
  }),
);

const appLoadFx = createEffect((id: string) =>
  resolved(() => {
    const application = query.application({ id });
    if (!application) {
      return null;
    }
    return mapApp(application);
  }),
);

const $appId = hatch.$params.map((params) => params['applicationId']);

sample({
  source: $appId,
  clock: [hatch.enter, hatch.update],
  target: appLoadFx,
});

const appLoaded = guard({
  clock: [appLoadFx.doneData],
  filter: (application): application is LocalApp => application !== null,
});

spread({
  source: merge([appLoaded, appSaveFx.done.map(({ params }) => params)]),
  targets: {
    id: $id,
    isDev: $isDev,
    redirectUri: $redirectUri,
    title: $title,
    allowedRegistrations: $allowedRegistrations,
  },
});

sample({
  source: {
    id: $id,
    title: $title,
    redirectUri: $redirectUri.map((list) => list.filter((uri) => uri.trim().length > 0)),
    allowedRegistrations: $allowedRegistrations,
    isDev: $isDev,
  },
  clock: applicationSubmitted,
  target: appSaveFx,
});

$redirectUri.on(redirectUriChanged, (list, { index, uri }) =>
  list.map((found, foundIndex) => (foundIndex === index ? uri : found)),
);
$redirectUri.on(redirectUriAddClicked, (list) => {
  if (last(list) !== '') {
    return [...list, ''];
  }
  return list;
});

function mapApp(app: Application): LocalApp {
  return {
    id: app.id!,
    isDev: app.isDev!,
    redirectUri: app.redirectUri.map((uri) => uri || ''),
    title: app.title!,
    allowedRegistrations: app.allowedRegistrations!,
  };
}

function last<T>(list: T[]): T | undefined {
  return list[list.length - 1];
}
