import { createSelector } from '@ngrx/store';
import { IAppState } from '../state/app.state';
import { IActivationState } from '../state/activation-link.state';

export const selectActivation = (state: IAppState) => state.verifyActivation;

export const selectVerifyActivation = createSelector(
  selectActivation,
  (state: IActivationState) => state.verifyActivation,
);
export const selectPostActivation = createSelector(
  selectActivation,
  (state: IActivationState) => state.postActivation,
);
