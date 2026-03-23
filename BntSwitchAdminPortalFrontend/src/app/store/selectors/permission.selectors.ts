import { IAppState } from '../state/app.state';
import { createSelector } from '@ngrx/store';
import { IPermissionState } from '../state/permission.state';

const selectPermissions = (state: IAppState) => state.permissions;

export const selectPermissionsData = createSelector(
  selectPermissions,
  (state: IPermissionState) => state.permissions,
);
