import { combineReducers } from 'redux';
import app, { IAppState } from './app';

const reducer = combineReducers({ app });

export interface IReduxState {
  app: IAppState;
}

export default reducer;
