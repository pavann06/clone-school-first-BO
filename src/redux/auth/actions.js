import * as actionTypes from './types';

export const afterLogin = (data) => async (dispatch) => {
  if (data.success === true) {
    const auth_state = {
      ...data.data,
      isLoggedIn: true,
    };
    window.localStorage.removeItem('auth_info')
    console.log(auth_state , "Auth State")
    window.localStorage.setItem('auth_info', JSON.stringify(auth_state));
    dispatch({
      type: actionTypes.REQUEST_SUCCESS,
      payload: auth_state,
    });
  } else {
    dispatch({
      type: actionTypes.REQUEST_FAILED,
    });
  }
};

export const logout = () => async (dispatch) => {
  dispatch({
    type: actionTypes.LOGOUT_SUCCESS,
  });
  // authService.logout();
};
