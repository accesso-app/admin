import { createEffect, restore, sample } from 'effector';
import { createHatch } from 'framework';
import { query, resolved } from '../../shared/api';

export const hatch = createHatch();

/** What if
 *
 * @example
 * import { createQuery } from '../../shared/api'
 * const loadFx = createQuery({
 *   applications: {
 *     id: "appId",
 *     title: true,
 *     isDev: (is) => is ? "dev" : "prod,
 *     allowedRegistrations: true,
 *   },
 * })
 */

const loadFx = createEffect(async () => {
  const d = await resolved(() => query.applications);
  console.log(d);
  return d;
  // return d.map((item) => {
  //   return {
  //     id: item.id,
  //     isDev: item.isDev,
  //     allowedRegistrations: item.allowedRegistrations,
  //     title: item.title,
  //   };
  // });
});

export const $applications = restore(loadFx, []);

sample({
  clock: hatch.enter,
  target: loadFx,
});

loadFx.watch(() => console.info('loadFx'));

$applications.watch(console.info);
