import { Api } from 'constants/Api';
import request from 'utils/request';

export const getReposInfo = () => request(Api.GET_REPOS_INFO);
