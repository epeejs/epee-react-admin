import { connectRouter, RouterState } from 'connected-react-router';
import { History } from 'history';
import { combineReducers } from 'redux';
import app, { IAppState } from './app';

export interface IReduxState {
  router: RouterState;
  app: IAppState;
}

export type GetState = () => IReduxState;

export default (history: History) =>
  combineReducers({
    router: connectRouter(history),
    app,
  });
