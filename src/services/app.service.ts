import { API } from 'constants/API';
import request from 'utils/request';

export const getReposInfo = () =>
  request<IResponseBody<{}>>(API.GET_REPOS_INFO);
