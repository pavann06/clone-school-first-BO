import { createSelector } from 'reselect';

const selectCrudState = (state) => state.crud;

export const selectCrud = createSelector([selectCrudState], (crudState) => crudState);

export const selectIsFormModalopen = createSelector(
  [selectCrudState],
  (crudState) => crudState.isFormModalOpen
);

export const selectIsDeleteModalOpen = createSelector(
  [selectCrudState],
  (crudState) => crudState.isDeleteModalOpen
);

export const selectIsTableRefresh = createSelector(
  [selectCrudState],
  (crudState) => crudState.isTableRefresh
);

export const selectRowData = createSelector([selectCrudState], (crudState) => crudState.rowData);

export const selectDeleteRowData = createSelector(
  [selectCrudState],
  (crudState) => crudState.deleteRowData
);

export const selectIsRequestLoading = createSelector(
  [selectCrudState],
  (crudState) => crudState.isRequestLoading
);
