import ActionTypes, { IValueDispatch } from 'constants/ActionTypes';
import { IUser } from 'reducer/app';

export const signin = (user: IUser) => (dispatch: IValueDispatch) => {
  dispatch({
    type: ActionTypes.SIGN_IN,
    payload: user,
  });
};
