import { createSelector } from '@ngrx/store';

import { IAppState } from '../state/app.state';
import { IUserRolesState } from '../state/user-roles.state';

const selectUserRoles = (state: IAppState) => state.userRoles;

export const selectUserRolesList = createSelector(
  selectUserRoles,
  (state: IUserRolesState) => state.userRoles,
);
export const selectGetAdminRoleCheck = createSelector(
  selectUserRoles,
  (state: IUserRolesState) => state.getAdminRoleCheck,
);
export const selectSelectedUserRoles = createSelector(
  selectUserRoles,
  (state: IUserRolesState) => state.selectedUserRoles,
);
export const selectUserRolesCreate = createSelector(
  selectUserRoles,
  (state: IUserRolesState) => state.userRolesCreate,
);
export const selectUserRolesDelete = createSelector(
  selectUserRoles,
  (state: IUserRolesState) => state.userRolesDelete,
);
export const selectUserRolesDetails = createSelector(
  selectUserRoles,
  (state: IUserRolesState) => state.userRolesDetails,
);
export const selectUserRolesEdit = createSelector(
  selectUserRoles,
  (state: IUserRolesState) => state.userRolesEdit,
);

export const selectUserRolesFunctionList = createSelector(
  selectUserRoles,
  (state: IUserRolesState) => state.userRolesFunction,
);
export const selectUserRolesStatus = createSelector(
  selectUserRoles,
  (state: IUserRolesState) => state.userRolesStatus,
);
