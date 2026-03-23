import { createSelector } from '@ngrx/store';
import { IAppState } from '../state/app.state';
import { IHistoryState } from '../state/history.state';

export const selectHistory = (state: IAppState) => state.history;

export const selectGetHistory = createSelector(
  selectHistory,
  (state: IHistoryState) => state.getHistory,
);

export const selectGetByIdHistory = createSelector(
  selectHistory,
  (state: IHistoryState) => state.getByIdHistory,
);
