import request from 'src/api/request';

import * as actionTypes from './types';

export const crud = {
  formModal: () => async (dispatch) => {
    dispatch({
      type: actionTypes.FORM_MODAL,
      payload: {},
    });
  },
  deleteModal: () => async (dispatch) => {
    dispatch({
      type: actionTypes.DELETE_MODAL,
      payload: {},
    });
  },
  tableRefresh: () => async (dispatch) => {
    dispatch({
      type: actionTypes.TABLE_REFRESH,
      payload: {},
    });
  },
  setRowData: (data) => async (dispatch) => {
    dispatch({
      type: actionTypes.ROW_DATA,
      payload: { rowData: data },
    });
  },
  setDeleteRowData: (data) => async (dispatch) => {
    dispatch({
      type: actionTypes.DELETE_ROW_DATA,
      payload: { deleteRowData: data },
    });
  },
  setIsRequestLoading: () => async (dispatch) => {
    dispatch({
      type: actionTypes.IS_REQUEST_LOADING,
      payload: {},
    });
  },
  CallCrudApi: (fieldValues, endPoint, method, withUpload) => async (dispatch) => {
    dispatch(crud.setIsRequestLoading());
    try {
      let response = {};
      response = await request[method === 'put' ? 'put' : 'post']({
        endPoint,
        jsonData: fieldValues,
        withUpload,
      });
      const { success } = response;
      if (success) {
        dispatch(crud.setRowData(null));
        dispatch(crud.formModal());
        dispatch(crud.tableRefresh());
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      dispatch(crud.setIsRequestLoading());
    }
    dispatch({
      type: actionTypes.CRUD_API,
      payload: { fieldValues, endPoint, method, withUpload },
    });
  },
};
