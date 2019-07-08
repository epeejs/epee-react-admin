import { Dispatch } from 'react';
import { Action } from 'redux';

enum ActionTypes {
  SIGN_IN = 'SIGN_IN',
}

export interface IValueAction extends Action<ActionTypes> {
  payload?: any;
}

export type IValueDispatch = Dispatch<IValueAction>;

export interface IActionParam {
  type: ActionTypes;
  payload?: any;
}

export default ActionTypes;
