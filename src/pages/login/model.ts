import { createEffect, createEvent, forward } from 'effector';
import { loadAuthSettingsFx, OAuthSettings } from '../../features/auth';

export const loginClicked = createEvent();

export const handleAuthResponse = createEffect();

forward({
  from: loginClicked,
  to: loadAuthSettingsFx,
});

loadAuthSettingsFx.done.watch(({ result }) => {
  window.location.href = generateOAuthPath(result);
});

function generateOAuthPath(settings: OAuthSettings): string {
  const authServerUrl = 'https://localhost:3000/login';
  return `${authServerUrl}?client_id=${settings.clientId}&redirect_uri=${settings.redirectUri}&response_type=code`;
}
