import { combineReducers } from 'redux';

import * as actionTypes from './auth/types';
import { reducer as authReducer } from './auth';
import { reducer as crudReducer } from './crud';

// Combine all reducers.

const appReducer = combineReducers({
  auth: authReducer,
  crud: crudReducer,
});

const rootReducer = (state, action) => {
  if (action.type === actionTypes.LOGOUT_SUCCESS) {
    state = null;
  }
  return appReducer(state, action);
};

export default rootReducer;
