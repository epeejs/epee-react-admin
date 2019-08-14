import ActionTypes, { IActionParams } from 'constants/ActionTypes';

export interface IRepo {
  stargazers_count: number;
  [other: string]: any;
}
export interface IAppState {
  repo: IResponseNotPage<IRepo>;
}

const initState: IAppState = {
  repo: {
    loading: false,
    error: false,
  },
};

function app(state = initState, { type, payload }: IActionParams): IAppState {
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

export default app;
