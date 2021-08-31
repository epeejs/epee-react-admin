/* eslint-disable */
import _ from 'lodash';
import 'whatwg-fetch';

export interface ReqInit extends Omit<RequestInit, 'body'> {
  headers?: Record<string, string>;
  /** eg. ?a=1 */
  params?: Record<string, any>;
  /** eg. /:id/.. */
  router?: Record<string, any>;
  /** 超时时间，默认3000 */
  timeout?: number;
  baseURL?: string;
  body?: Record<keyof any, any> | RequestInit['body'];
}

async function request<T = any>(path: string, init: ReqInit = {}): Promise<T> {
  const mergeInit = {
    ...request.default,
    ...init,
    headers: { ...request.default.headers, ...init.headers },
  };
  const { params, router, timeout, headers, baseURL, ...restOptions } = mergeInit;
  const hasType = Reflect.has(headers, 'Content-Type') || Reflect.has(headers, 'content-type');
  let url = path;
  let _body: any = mergeInit.body;
  const _method = _.capitalize(mergeInit.method);

  // 路由参数
  if (router) {
    url = path.replace(/:([A-Za-z]+)/g, (substring, p1: string) => router[p1]);
  }
  // 查询参数
  if (params) {
    url += _(_.reduce(params, (prev, val, key) => `${prev}${key}=${val}&`, '?')).trimEnd('&');
  }
  // body
  if (!hasType && _method !== 'get') {
    if (_.isPlainObject(_body)) {
      _body = JSON.stringify(_body);
    }
    Reflect.set(headers, 'Content-Type', 'application/json');
  }

  try {
    const response: Response = await Promise.race([
      fetch(baseURL ? `${baseURL}/${_.trimStart(url, '/')}` : url, {
        ...restOptions,
        body: _body,
        headers,
      }),
      new Promise<any>((resolve, reject) => {
        setTimeout(() => reject({ status: 408, statusText: 'TIME_OUT_ERR', url }), timeout);
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
  catch: ((error: any) => void) | null;
};

export default request;
