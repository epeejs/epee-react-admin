import { Dispatch } from 'react';
import { Action } from 'redux';

export enum ActionTypes {
  FETCH_REPO_INFO_PENDING = 'FETCH_REPO_INFO_PENDING',
  FETCH_REPO_INFO_OK = 'FETCH_REPO_INFO_OK',
  FETCH_REPO_INFO_FAIL = 'FETCH_REPO_INFO_FAIL',
}

export interface ValueAction<P = any> extends Action<ActionTypes> {
  payload?: P;
}

export type ValueDispatch<T = any> = Dispatch<ValueAction<T>>;

export interface ActionParams {
  type: ActionTypes;
  payload?: any;
}
