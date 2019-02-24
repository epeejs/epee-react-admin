import { applyMiddleware, createStore, Middleware } from 'redux';
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import reducer from 'src/reducer/index';

const middlewares: Middleware[] = [thunk];

if (process.env.NODE_ENV === 'development' || config.debug) {
  middlewares.push(logger);
}

const store = createStore(reducer, applyMiddleware(...middlewares));

export default store;
