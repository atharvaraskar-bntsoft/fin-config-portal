import { createSelector } from '@ngrx/store';

import { IAppState } from '../state/app.state';
import { IUserState } from '../state/user.state';

const selectUsers = (state: IAppState) => state.users;

export const selectUserList = createSelector(selectUsers, (state: IUserState) => state.users);

export const selectSelectedUser = createSelector(
  selectUsers,
  (state: IUserState) => state.selectedUser,
);
export const selectUserCreate = createSelector(
  selectUsers,
  (state: IUserState) => state.usersCreate,
);
export const selectUserEdit = createSelector(selectUsers, (state: IUserState) => state.usersEdit);
export const selectUserDetails = createSelector(
  selectUsers,
  (state: IUserState) => state.usersDetails,
);
export const selectUserRolelist = createSelector(
  selectUsers,
  (state: IUserState) => state.usersRoleList,
);
export const selectUserDelete = createSelector(
  selectUsers,
  (state: IUserState) => state.usersDelete,
);
export const selectUserStatus = createSelector(
  selectUsers,
  (state: IUserState) => state.usersStatus,
);
