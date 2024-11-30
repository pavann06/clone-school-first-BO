import * as actionTypes from './types';

const INITIAL_STATE = {
  isLoggedIn: false,
};

const authReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case actionTypes.REQUEST_LOADING:
      return {
        ...state,
        isLoading: true,
      };
    case actionTypes.REQUEST_FAILED:
      return INITIAL_STATE;

    case actionTypes.REQUEST_SUCCESS:
      return {
        ...action.payload,
      };
    case actionTypes.LOGOUT_SUCCESS:
      return INITIAL_STATE;

    default:
      return state;
  }
};

export default authReducer;
