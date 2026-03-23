import { createSelector } from '@ngrx/store';

import { IAppState } from '../state/app.state';
import { IforgetPass } from '../state/forget-pass.state';
import { INewPassState } from '../state/new-pass.state';

const selectNewPassword = (state: IAppState) => state.newPass;

export const selectNewPass = createSelector(
  selectNewPassword,
  (state: INewPassState) => state.newPass,
);

export const selectGroupResponseJsonSuccess = createSelector(
  selectNewPassword,
  (state: INewPassState) => state.newPass,
);
