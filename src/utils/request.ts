import _ from 'lodash';
import 'whatwg-fetch';

interface ReqInit extends RequestInit {
  headers?: Record<string, string>;
  /** eg. ?a=1 */
  params?: { [key: string]: any };
  /** eg. /:id/.. */
  router?: { [key: string]: any };
  /** 超时时间，默认3000 */
  timeout?: number;
}

async function request<T = any>(path: string, init: ReqInit = {}): Promise<T> {
  const mergeInit = {
    ...request.default,
    ...init,
    headers: { ...request.default.headers, ...init.headers },
  };
  const { params, router, body, timeout, headers } = mergeInit;
  let url = path;

  if (router) {
    url = path.replace(/:([A-Za-z]+)/g, function(substring, p1: string) {
      return router[p1];
    });
  }
  if (params) {
    url += _(
      _.reduce(params, (prev, val, key) => (prev += `${key}=${val}&`), '?'),
    ).trimEnd('&');
  }

  if (typeof body === 'string') {
    Reflect.set(headers, 'Content-Type', 'application/json');
  } else if (body instanceof FormData) {
    Reflect.set(headers, 'Content-Type', 'multipart/form-data');
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
      } else {
        return await response.json();
      }
    } else {
      throw response;
    }
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
