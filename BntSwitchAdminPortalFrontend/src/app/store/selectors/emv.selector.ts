import { IEMVState } from './../state/emv-data.state';
import { IAppState } from '../state/app.state';
import { createSelector } from '@ngrx/store';

const emvSelector = (state: IAppState) => state.emvData;
export const emvTableSelector = createSelector(
  emvSelector,
  (state: IEMVState) => state.emvDataList,
);

export const emvValidName = createSelector(emvSelector, (state: IEMVState) => state.isValidname);

export const emvCreated = createSelector(emvSelector, (state: IEMVState) => state.createdData);
