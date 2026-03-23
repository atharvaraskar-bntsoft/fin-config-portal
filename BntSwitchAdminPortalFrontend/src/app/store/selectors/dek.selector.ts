import { createSelector } from '@ngrx/store';
import { IAppState } from '../state/app.state';
import { IDekState } from '../state/dek.state';

const selectDekData = (state: IAppState) => state.dek;

export const selectGetDek = createSelector(selectDekData, (state: IDekState) => state.getDek);

export const selectPostDek = createSelector(selectDekData, (state: IDekState) => state.postDek);
