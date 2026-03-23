export interface UsersList {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  locked: boolean;
  active: boolean;
  mobileNum: string;
  roleId: number;
}

export interface UserGetData {
  'total-record': number;
  usersList: UsersList[];
  'page-no': number;
  'total-filtered-record': number;
}

export interface UserGetObject {
  status: string;
  message: string;
  data: UserGetData;
}
