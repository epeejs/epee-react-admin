import { Api } from 'constants/Api';
import { Repos } from 'models/repos.model';
import request from 'utils/request';

export const getReposInfo = () => request<Repos>(Api.GET_REPOS_INFO);
