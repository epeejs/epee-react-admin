import * as _ from 'lodash';

interface ReqInit extends RequestInit {
  /** eg. ?a=1 */
  params?: { [key: string]: any };
  /** eg. /:id/.. */
  router?: { [key: string]: any };
}

async function request<T = {}>(path: string, init: ReqInit = {}) {
  const { params, router } = init;
  let url = path;

  if (router) {
    url = path.replace(/:(\w+)/g, function(substring, p1: string) {
      return router[p1];
    });
  }
  if (params) {
    url += '?';
    // tslint:disable-next-line: forin
    for (const key in params) {
      url += `${key}=${params[key]}&`;
    }
    url = _.trimEnd(url, '&');
  }

  const response = await fetch(url, _.defaultsDeep(request.default, init));

  return (await response.json()) as T;
}

request.default = {
  headers: {
    'content-type': 'application/json'
  },
  mode: 'cors'
} as ReqInit;

export default request;
