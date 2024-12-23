import { thunk } from 'redux-thunk';
import { compose, createStore, applyMiddleware } from 'redux';

import rootReducer from './rootReducer';
import { storePersist } from './storePersist';

const middleware = [thunk];

let configStore = applyMiddleware(...middleware);

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

configStore = composeEnhancers(applyMiddleware(...middleware));

const AUTH_INITIAL_STATE = {
  isLoggedIn: false,
};

const AUTH_KEYS = ['access_token','refresh_token','isLoggedIn']

function hasAllKeys(obj, keys) {
  return keys.every(key => Object.prototype.hasOwnProperty.call(obj, key));
}

let auth_state = storePersist.get('auth_info');

auth_state = (auth_state && hasAllKeys(auth_state, AUTH_KEYS)) ? auth_state : AUTH_INITIAL_STATE;

const initialState = { auth: auth_state };
const store = createStore(rootReducer, initialState, configStore);

export default store;
