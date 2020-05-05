import { createEvent, forward } from 'effector';
import { paths } from 'pages/paths';

export const authmenowLogin = createEvent();

const redirect = createEvent<string>();

/* eslint-disable prefer-destructuring */
const CLIENT_ID =
  process.env.REACT_APP_CLIENT_ID ?? 'PROVIDE_REACT_APP_CLIENT_ID';
const AUTHMENOW_URL =
  process.env.REACT_APP_AUTHMENOW_URL ?? 'https://auth-dev.atomix.team';
/* eslint-enable prefer-destructuring */

forward({
  from: authmenowLogin,
  to: redirect.prepend(authorizeUrl),
});

function authorizeUrl() {
  const url = new URL(AUTHMENOW_URL);
  url.pathname = '/oauth/authorize';
  url.searchParams.set('response_type', 'code');
  url.searchParams.set('client_id', CLIENT_ID);
  url.searchParams.set('redirect_uri', redirectUrl());

  return url.toString();
}

function redirectUrl() {
  const current = `${document.location.protocol}//${document.location.host}`;
  const url = new URL(current);
  url.pathname = paths.authmenowDone();

  return url.toString();
}

redirect.watch((url) => {
  document.location.href = url;
});
