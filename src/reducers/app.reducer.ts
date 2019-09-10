import { ActionParams, ActionTypes } from 'constants/ActionTypes';

export interface Repo {
  stargazers_count: number;
  [other: string]: any;
}
export interface AppReducerState {
  repo: IResponseNotPage<Repo>;
}

const initState: AppReducerState = {
  repo: {
    loading: false,
    error: false,
  },
};

export function appReducer(
  state = initState,
  { type, payload }: ActionParams,
): AppReducerState {
  switch (type) {
    case ActionTypes.FETCH_REPO_INFO_PENDING:
      return {
        ...state,
        repo: {
          loading: true,
          error: false,
        },
      };
    case ActionTypes.FETCH_REPO_INFO_OK:
      return {
        ...state,
        repo: {
          data: payload,
          loading: false,
          error: false,
        },
      };
    case ActionTypes.FETCH_REPO_INFO_FAIL:
      return {
        ...state,
        repo: {
          loading: false,
          error: true,
        },
      };
    default:
      return state;
  }
}
