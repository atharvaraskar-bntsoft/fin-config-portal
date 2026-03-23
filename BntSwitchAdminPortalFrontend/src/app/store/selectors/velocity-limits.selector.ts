import { createSelector, State } from '@ngrx/store';

import { IAppState } from '../state/app.state';
import { IVelocityLimitsState } from '../state/velocity-limits.state';

const selectLimits = (state: IAppState) => state.velocityLimits;
const selectPermissions = (state: IAppState) => state.permissions;

export const selectVelocityLimits = createSelector(
  selectLimits,
  (state: IVelocityLimitsState) => state.Velocitylimits,
);

export const selectVelocityLimitsEditTransaction = createSelector(
  selectLimits,
  (state: IVelocityLimitsState) => state.Velocitylimitsedittransaction,
);

export const selectVelocityLimitsEditCurrency = createSelector(
  selectLimits,
  (state: IVelocityLimitsState) => state.Velocitylimitseditcurrency,
);

export const selectVelocityLimitsEditRow = createSelector(
  selectLimits,
  (state: IVelocityLimitsState) => state.Velocitylimitseditrow,
);

export const selectVelocityLimitsEditInstitution = createSelector(
  selectLimits,
  (state: IVelocityLimitsState) => state.Velocitylimitseditinstitution,
);

export const selectVelocityLimitsDelete = createSelector(
  selectLimits,
  (state: IVelocityLimitsState) => state.Velocitylimitsdelete,
);

export const selectVelocityLimitsUdate = createSelector(
  selectLimits,
  (state: IVelocityLimitsState) => state.Velocitylimitsupdate,
);

export const selectVelocityLimitsCreate = createSelector(
  selectLimits,
  (state: IVelocityLimitsState) => state.Velocitylimitscreate,
);

export const selectLimitsResponseJsonSuccess = createSelector(
  selectLimits,
  (state: IVelocityLimitsState) => state.velocityLimitsResponseSuccess,
);

export const selectLimitsAndPermission = createSelector(
  selectVelocityLimits,
  selectPermissions,
  (selectVelocityLimit, selectPermission) => [selectVelocityLimit, selectPermission],
);
