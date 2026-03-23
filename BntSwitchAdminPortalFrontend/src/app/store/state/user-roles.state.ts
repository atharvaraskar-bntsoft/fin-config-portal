import { UserRoleGetObject } from '../../models/user-roles.interface';

export interface IUserRolesState {
  selectedUserRoles: any;
  userRoles: UserRoleGetObject;
  userRolesCreate: any;
  userRolesDelete: any;
  userRolesDetails: any;
  userRolesEdit: any;
  userRolesFunction: any;
  userRolesStatus: any;
  getAdminRoleCheck: any;
}

export const initialUserRolesState: IUserRolesState = {
  selectedUserRoles: null,
  userRoles: null,
  userRolesCreate: null,
  userRolesDelete: null,
  userRolesDetails: null,
  userRolesEdit: null,
  userRolesFunction: null,
  userRolesStatus: null,
  getAdminRoleCheck: null,
};
