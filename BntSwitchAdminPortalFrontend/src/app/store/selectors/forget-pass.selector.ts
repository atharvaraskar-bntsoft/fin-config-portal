import { createSelector } from '@ngrx/store';

import { IAppState } from '../state/app.state';
import { IforgetPass } from '../state/forget-pass.state';

const selectToken = (state: IAppState) => state.forgetPass;

export const selectForgetPass = createSelector(
  selectToken,
  (state: IforgetPass) => state.forgetPass,
);

export const selectGroupResponseJsonSuccess = createSelector(
  selectToken,
  (state: IforgetPass) => state.forgetPass,
);
