import ActionTypes, { IValueDispatch } from 'constants/ActionTypes';
import { GetState } from 'reducer';
import { IUser } from 'reducer/app';

export const signin = (user: IUser) => (
  dispatch: IValueDispatch,
  getState: GetState,
) => {
  dispatch({
    type: ActionTypes.SIGN_IN,
    payload: user,
  });
};
