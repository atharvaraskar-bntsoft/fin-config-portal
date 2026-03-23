import { createSelector } from '@ngrx/store';
import { IAppState } from '../state/app.state';
import { IStatusState } from '../state/status.state';
import { IProfileState } from '../state/profile.state';

const selectProfile = (state: IAppState) => state.profile;
const selectProfileResponse = (state: IAppState) => state.profile;
const selectEditProfileResponse = (state: IAppState) => state.profile;

export const selectProfileList = createSelector(
  selectProfile,
  (state: IProfileState) => state.profile,
);

export const selectChangePasswordSuccess = createSelector(
  selectProfileResponse,
  (state: IProfileState) => state.profileResponse,
);

export const selectEditProfileSuccess = createSelector(
  selectEditProfileResponse,
  (state: IProfileState) => state.profileUpdateResponse,
);
