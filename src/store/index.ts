import { config } from 'config';
import { routerMiddleware } from 'connected-react-router';
import { createBrowserHistory } from 'history';
import createRootReducer from 'reducer';
import { applyMiddleware, createStore, Middleware } from 'redux';
import logger from 'redux-logger';
import thunk from 'redux-thunk';

const middlewares: Middleware[] = [thunk];

if (process.env.NODE_ENV === 'development' || config.debug) {
  middlewares.push(logger);
}

export const history = createBrowserHistory();

const store = createStore(
  createRootReducer(history),
  applyMiddleware(routerMiddleware(history), ...middlewares),
);

export default store;
