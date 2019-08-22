import { Api } from 'constants/Api';
import request from 'utils/request';

export const getReposInfo = () =>
  request<IResponseBody<{}>>(Api.GET_REPOS_INFO);
