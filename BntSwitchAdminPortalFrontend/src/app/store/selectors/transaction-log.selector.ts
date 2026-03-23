import { createSelector } from '@ngrx/store';

import { IAppState } from '../state/app.state';
import { ITransactionLogState } from '../state/transaction-log.state';

const selectLogs = (state: IAppState) => state.transactionLogs;

export const selectTransactionLogs = createSelector(
  selectLogs,
  (state: ITransactionLogState) => state.transactionlogs,
);
export const selectJson = createSelector(selectLogs, (state: ITransactionLogState) => state.json);
export const selectRequestMatrix = createSelector(
  selectLogs,
  (state: ITransactionLogState) => state.requestMatrix,
);
export const selectResponseMatrix = createSelector(
  selectLogs,
  (state: ITransactionLogState) => state.responseMatrix,
);
export const selectTransactionLogsById = createSelector(
  selectLogs,
  (state: ITransactionLogState) => state.transactionById,
);
export const postTransactionLogsReview = createSelector(
  selectLogs,
  (state: ITransactionLogState) => state.postTransactionLogreview,
);
export const selectFilterTxnData = createSelector(
  selectLogs,
  (state: ITransactionLogState) => state.selectedFilterTxnData,
);
