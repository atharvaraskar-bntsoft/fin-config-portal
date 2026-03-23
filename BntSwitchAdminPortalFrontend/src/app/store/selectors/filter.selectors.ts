import { createSelector } from '@ngrx/store';
import { IAppState } from '../state/app.state';
import { IFilterState } from '@app/store/state/filter.state';

const selectFilter = (state: IAppState) => state.filterState;

export const selectFilterData = createSelector(
  selectFilter,
  (state: IFilterState) => state.filterState,
);
