import _ from 'lodash';
import 'whatwg-fetch';

export interface ReqInit extends RequestInit {
  headers?: Record<string, string>;
  /** eg. ?a=1 */
  params?: { [key: string]: any };
  /** eg. /:id/.. */
  router?: { [key: string]: any };
  /** 超时时间，默认3000 */
  timeout?: number;
}

async function request<T = unknown>(
  path: string,
  init: ReqInit = {},
): Promise<T> {
  const mergeInit = {
    ...request.default,
    ...init,
    headers: { ...request.default.headers, ...init.headers },
  };
  const { params, router, body, timeout, headers } = mergeInit;
  const hasType =
    Reflect.has(headers, 'Content-Type') ||
    Reflect.has(headers, 'content-type');
  let url = path;

  if (router) {
    url = path.replace(/:([A-Za-z]+)/g, (substring, p1: string) => router[p1]);
  }
  if (params) {
    url += _(
      _.reduce(params, (prev, val, key) => `${prev}${key}=${val}&`, '?'),
    ).trimEnd('&');
  }
  if (!hasType && typeof body === 'string') {
    Reflect.set(headers, 'Content-Type', 'application/json');
  }

  try {
    const response: Response = await Promise.race([
      fetch(url, mergeInit),
      new Promise<any>((resolve, reject) => {
        setTimeout(
          () => reject({ status: 408, statusText: 'TIME_OUT_ERR', url }),
          timeout,
        );
      }),
    ]);

    if (response.ok) {
      if (request.interceptors.response) {
        return await request.interceptors.response(response);
      }
      return await response.json();
    }
    throw response;
  } catch (error) {
    if (request.interceptors.catch) {
      request.interceptors.catch(error);
    }

    throw error;
  }
}

request.default = {
  method: 'GET',
  headers: {
    Accept: '*/*',
  },
  mode: 'cors',
  timeout: 3000,
  // credentials: 'include' // send cookies
} as ReqInit;

request.interceptors = {
  response: null,
  catch: null,
} as {
  response: ((response: Response) => Promise<any>) | null;
  catch: ((error: Partial<Response>) => void) | null;
};

export default request;
