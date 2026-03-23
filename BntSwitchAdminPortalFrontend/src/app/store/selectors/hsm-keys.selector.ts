import { createSelector } from '@ngrx/store';

import { IAppState } from '../state/app.state';
import { IHsmKeysState } from '../state/hsm-keys.state';

const selectKeys = (state: IAppState) => state.hsmKeys;

export const selectHsmKeys = createSelector(selectKeys, (state: IHsmKeysState) => state.hsmkeys);
export const selectHsmKeysById = createSelector(
  selectKeys,
  (state: IHsmKeysState) => state.hsmkeysById,
);
export const selectPostHsmKeys = createSelector(
  selectKeys,
  (state: IHsmKeysState) => state.postHsmKeys,
);
export const selectInstitutionGroupList = createSelector(
  selectKeys,
  (state: IHsmKeysState) => state.institutionGroupList,
);
export const selectInstitutionList = createSelector(
  selectKeys,
  (state: IHsmKeysState) => state.Institutiion,
);
export const selectLocationList = createSelector(
  selectKeys,
  (state: IHsmKeysState) => state.Location,
);
export const selectTreeDeepDetail = createSelector(
  selectKeys,
  (state: IHsmKeysState) => state.TreeDeepDevice,
);
