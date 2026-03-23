export interface SubMenuFunction {
  id: number;
  name: string;
  url: string;
  mappingUrl: string;
  permissionData?: any;
}

export interface RoleFunction {
  id: number;
  subMenuFunction: SubMenuFunction;
  view: boolean;
  create: boolean;
  modify: boolean;
  delete: boolean;
  check: boolean;
}

export interface UserRoleList {
  id: number;
  name: string;
  description: string;
  locked: boolean;
  active: boolean;
  deleted: boolean;
  roleFunctions: RoleFunction[];
}

export interface UserRoleGetData {
  'total-record': number;
  'page-no': number;
  userRoleList: UserRoleList[];
  'total-filtered-record': number;
}

export interface UserRoleGetObject {
  status: string;
  message: string;
  data: UserRoleGetData;
}
