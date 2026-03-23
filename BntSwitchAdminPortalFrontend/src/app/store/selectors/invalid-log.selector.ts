import { createSelector } from '@ngrx/store';

import { IAppState } from '../state/app.state';
import { IInvalidLogState } from '../state/invalid-log.state';

/*
  This Selector will  work for the below screens:
  1. SAF Screen
  2. Exceptional Screen and
  3. Invalid Logs
*/

const selectInvalidLogs = (state: IAppState) => state.invalidlogs;

export const selectInvalidLog = createSelector(
  selectInvalidLogs,
  (state: IInvalidLogState) => state.invalidlogs,
);

export const safQueueList = createSelector(
  selectInvalidLogs,
  (state: IInvalidLogState) => state.safQueueList,
);

export const safProcessorList = createSelector(
  selectInvalidLogs,
  (state: IInvalidLogState) => state.safProcessorList,
);

export const selectDeleteMultiple = createSelector(
  selectInvalidLogs,
  (state: IInvalidLogState) => state.deleteMultiple,
);

export const exceptionalQueueList = createSelector(
  selectInvalidLogs,
  (state: IInvalidLogState) => state.exceptionalQueueList,
);

export const moveToSAFQueue = createSelector(
  selectInvalidLogs,
  (state: IInvalidLogState) => state.moveToSafQueueFromExceptional,
);

export const deleteSAFQueue = createSelector(
  selectInvalidLogs,
  (state: IInvalidLogState) => state.deleteSAFQueue,
);

export const safDDLSelector = createSelector(
  selectInvalidLogs,
  (state: IInvalidLogState) => state.safStatusDDL,
);
