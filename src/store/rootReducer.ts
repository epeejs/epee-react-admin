import { combineReducers } from 'redux';
import { loginSlice } from './slice/login';

const rootReducer = combineReducers({
  login: loginSlice.reducer,
});

export default rootReducer;
