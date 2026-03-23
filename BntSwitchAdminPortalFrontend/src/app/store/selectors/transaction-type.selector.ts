import { createSelector } from '@ngrx/store';
import { IAppState } from '../state/app.state';
import { ITransactionTypeState } from '../state/transaction-type.state';
export const selectTransactionType = (state: IAppState) => state.transactionType;
export const selectPermissions = (state: IAppState) => state.permissions;

export const selectTransactionTypeList = createSelector(
  selectTransactionType,
  (state: ITransactionTypeState) => state.transactionType,
);

export const selectTransactionTypePost = createSelector(
  selectTransactionType,
  (state: ITransactionTypeState) => state.postTransactionType,
);

export const selectTransactionTypeGetById = createSelector(
  selectTransactionType,
  (state: ITransactionTypeState) => state.getByIdTransactionType,
);

export const selectTransactionTypeAndPermission = createSelector(
  selectTransactionTypeList,
  selectPermissions,
  (selectedTransactionTypeList, selectedPermissions) => [
    selectedTransactionTypeList,
    selectedPermissions,
  ],
);
