import { Action, action, Thunk, thunk } from 'easy-peasy';
import { getReposInfo } from 'services/app.service';

export interface Repos {
  stargazers_count: number;
  [other: string]: any;
}

export interface AppModel {
  repos: Repos | null;
  fetchReposInfo: Thunk<AppModel>;
  setRepos: Action<AppModel, Repos>;
}

export const appModel: AppModel = {
  repos: null,
  setRepos: action((state, payload) => {
    state.repos = payload;
  }),
  fetchReposInfo: thunk(async actions => {
    const res = await getReposInfo();
    actions.setRepos(res);
  }),
};
