import { UserGetObject } from '../../models/user.interface';

export interface IUserState {
  selectedUser: any;
  users: UserGetObject;
  usersCreate: any;
  usersDelete: any;
  usersDetails: any;
  usersEdit: any;
  usersRoleList: any;
  usersStatus: any;
}

export const initialUserState: IUserState = {
  selectedUser: null,
  users: null,
  usersCreate: null,
  usersDelete: null,
  usersDetails: null,
  usersEdit: null,
  usersRoleList: null,
  usersStatus: null,
};
