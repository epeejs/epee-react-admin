import { connectRouter, RouterState } from 'connected-react-router';
import { History } from 'history';
import { combineReducers } from 'redux';
import { appReducer, AppReducerState } from './app.reducer';

export interface ReduxState {
  router: RouterState;
  appReducer: AppReducerState;
}

export type GetState = () => ReduxState;

export const createRootReducer = (history: History) =>
  combineReducers({
    router: connectRouter(history),
    appReducer,
  });
