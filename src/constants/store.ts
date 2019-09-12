import { createStore } from 'easy-peasy';
import { storeModel } from 'models';
import { Middleware } from 'redux';
import logger from 'redux-logger';

const middlewares: Middleware[] = [];

if (process.env.NODE_ENV === 'development' || window.config.debug) {
  middlewares.push(logger);
}

export const store = createStore(storeModel, {
  middleware: middlewares,
});
