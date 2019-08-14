import { Dispatch } from 'react';
import { Action } from 'redux';

enum ActionTypes {
  FETCH_REPO_INFO_PENDING = 'FETCH_REPO_INFO_PENDING',
  FETCH_REPO_INFO_OK = 'FETCH_REPO_INFO_OK',
  FETCH_REPO_INFO_FAIL = 'FETCH_REPO_INFO_FAIL',
}

export interface IValueAction<P> extends Action<ActionTypes> {
  payload?: P;
}

export type ValueDispatch<T = any> = Dispatch<IValueAction<T>>;

export interface IActionParams {
  type: ActionTypes;
  payload?: any;
}

export default ActionTypes;
