import ActionTypes, { IActionParam } from 'constants/ActionTypes';

export interface IUser {
  name: string;
}
export interface IAppState {
  user: IUser | null;
}

const initState: IAppState = {
  user: null,
};

function app(state = initState, action: IActionParam): IAppState {
  switch (action.type) {
    case ActionTypes.SIGN_IN:
      return {
        ...state,
        user: action.payload as IUser,
      };
    default:
      return state;
  }
}

export default app;
