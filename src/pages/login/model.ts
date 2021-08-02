import { attach, createEffect, createEvent, forward } from 'effector';
import { oauthSettingsGet } from '../../api';

const oauthSettingsGetFx = attach({ effect: oauthSettingsGet });

export const loginClicked = createEvent();

export const handleAuthResponse = createEffect();

forward({
  from: loginClicked,
  to: oauthSettingsGetFx.prepend(() => ({ state: 'test' })),
});

oauthSettingsGetFx.done.watch(({ result }) => {
  window.location.href = result.answer.accessoUrl;
});
