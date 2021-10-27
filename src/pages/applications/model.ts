import { createEffect, restore, sample } from 'effector';
import { createHatch } from 'framework';

import { query, resolved } from '~/shared/api';

export const hatch = createHatch();

const loadFx = createEffect(async () => {
  return resolved(() =>
    query.applications.map((app) => ({
      id: app.id,
      title: app.title,
      isDev: app.isDev,
      redirectUri: app.redirectUri.map((e) => e),
      allowedRegistrations: app.allowedRegistrations,
    })),
  );
});

export const $applications = restore(loadFx, []);

sample({
  clock: hatch.enter,
  target: loadFx,
});
