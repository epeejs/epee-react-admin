import { routerMiddleware } from 'connected-react-router';
import { createBrowserHistory } from 'history';
import { createRootReducer } from 'reducers';
import { applyMiddleware, createStore, Middleware } from 'redux';
import logger from 'redux-logger';
import thunk from 'redux-thunk';

const middlewares: Middleware[] = [thunk];

if (process.env.NODE_ENV === 'development' || window.config.debug) {
  middlewares.push(logger);
}

export const history = createBrowserHistory();

export const store = createStore(
  createRootReducer(history),
  applyMiddleware(routerMiddleware(history), ...middlewares),
);
