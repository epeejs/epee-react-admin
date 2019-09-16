import { Action, action, Thunk, thunk } from 'easy-peasy';
import { getReposInfo } from 'services/repos.service';

export interface Repos {
  stargazers_count: number;
  [other: string]: any;
}

export interface ReposModel {
  repos: Repos | null;
  reset: Action<ReposModel>;
  setRepos: Action<ReposModel, Repos>;
  fetchReposInfo: Thunk<ReposModel>;
}

export const reposModel: ReposModel = {
  repos: null,
  reset: action(state => {
    state.repos = null;
  }),
  setRepos: action((state, payload) => {
    state.repos = payload;
  }),
  fetchReposInfo: thunk(async actions => {
    const res = await getReposInfo();
    actions.setRepos(res);
  }),
};
