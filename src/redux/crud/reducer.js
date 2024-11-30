import * as actionTypes from './types';

const INITIAL_STATE = {
  isFormModalOpen: false,
  isDeleteModalOpen: false,
  isTableRefresh: false,
  isRequestLoading: false,
  rowData: null,
  deleteRowData: null,
};

const CrudReducer = (state = INITIAL_STATE, action) => {
  const { payload } = action;
  switch (action.type) {
    case actionTypes.FORM_MODAL:
      return {
        ...state,
        isFormModalOpen: !state.isFormModalOpen,
      };

    case actionTypes.DELETE_MODAL:
      return {
        ...state,
        isDeleteModalOpen: !state.isDeleteModalOpen,
      };
    case actionTypes.TABLE_REFRESH:
      return {
        ...state,
        isTableRefresh: !state.isTableRefresh,
      };
    case actionTypes.ROW_DATA:
      return {
        ...state,
        rowData: payload.rowData,
      };
    case actionTypes.DELETE_ROW_DATA:
      return {
        ...state,
        deleteRowData: payload.deleteRowData,
      };
    case actionTypes.IS_REQUEST_LOADING:
      return {
        ...state,
        isRequestLoading: !state.isRequestLoading,
      };
    default:
      return state;
  }
};

export default CrudReducer;
