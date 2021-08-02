import { attach, createEffect, createEvent, Effect, restore } from 'effector';
import queryString from 'query-string';

export const API_PREFIX = `http://localhost:9020/api`;

export interface Request {
  path: string;
  method: string;
  // eslint-disable-next-line @typescript-eslint/ban-types
  body?: object | null | void;
  query?: Record<string, string>;
  headers?: Record<string, string>;
  cookies?: string;
}

export interface Answer<T = unknown> {
  ok: boolean;
  body: T;
  status: number;
  headers: Record<string, string>;
}

export const setCookiesForRequest = createEvent<string>();
// WARNING: cookies should be sent only to an OUR backend
// Any other can steal the access token
export const $cookiesForRequest = restore(setCookiesForRequest, '');

export const setCookiesFromResponse = createEvent<string>();

export const requestInternalFx = createEffect<Request, Answer, Answer>({
  handler: requestClient,
});

export const requestFx: Effect<Request, Answer, Answer> = attach({
  effect: requestInternalFx,
  source: $cookiesForRequest,
  mapParams: (params, cookies) => ({ ...params, cookies }),
});

if (process.env.DEBUG || process.env.NODE_ENV === 'development') {
  requestInternalFx.watch(({ path, method }) => {
    console.log(`[requestInternal] ${method} ${path}`);
  });

  requestInternalFx.done.watch(({ params: { path, method }, result: { status } }) => {
    console.log(`[requestInternal.done] ${method} ${path} : ${status}`);
  });

  requestInternalFx.fail.watch(({ params: { path, method }, error: { status } }) => {
    console.log(`[requestInternal.fail] ${method} ${path} : ${status}`);
  });
}

export function queryToString(query: Record<string, string> | undefined): string {
  return query ? `?${queryString.stringify(query)}` : '';
}

export type ResponseResult<Data> = string | Record<string, Data> | null;

async function requestClient({ path, method, ...params }: Request) {
  const headers = new Headers(params.headers);
  contentDefault(headers, 'application/json; charset=utf-8');

  const query = queryToString(params.query);
  const body =
    contentIs(headers, 'application/json') && params.body ? JSON.stringify(params.body) : undefined;

  const response = await fetch(`${API_PREFIX}${path}${query}`, {
    method,
    headers,
    body,
    credentials: 'include',
  });

  // TODO: rewrite error system

  const answer = await getResponseAnswer(response);

  const responder = {
    ok: response.ok,
    body: answer,
    status: response.status,
    headers: toObject(response.headers),
  };

  if (response.ok) {
    return responder;
  }
  throw responder;
}

/**
 * Check if content-type JSON
 */
function contentIs(headers: Headers, type: string): boolean {
  // eslint-disable-next-line sonarjs/no-duplicate-string
  return headers.get('content-type')?.includes(type) ?? false;
}

function contentDefault(headers: Headers, type: string): Headers {
  if (!headers.has('content-type')) {
    headers.set('content-type', type);
  }
  return headers;
}

async function getResponseAnswer<Data>(response: Response): Promise<ResponseResult<Data>> {
  if (contentIs(response.headers, 'application/json')) {
    return response.json();
  }
  const hasEmptyResponse = !response.headers.get('content-type');
  if (hasEmptyResponse) {
    return null;
  }
  return response.text();
}

function toObject(headers: Headers): Record<string, string> {
  const object: Record<string, string> = {};
  headers.forEach((value, key) => {
    object[key] = value;
  });
  return object;
}
