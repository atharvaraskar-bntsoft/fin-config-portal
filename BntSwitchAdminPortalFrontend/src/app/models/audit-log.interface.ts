export interface Type {
  id: number;
  name: string;
}

export interface Object {
  type: Type;
  text: string;
}

export interface Role {
  id: number;
  name: string;
}

export interface User {
  id: number;
  name: string;
  role: Role;
}

export interface LogsList {
  id: number;
  date: any;
  object: Object;
  action: string;
  description?: any;
  user: User;
}

export interface AuditLogGetData {
  'total-record': number;
  logsList: LogsList[];
  'page-no': number;
  'total-filtered-record': number;
}

export interface AuditLogGetObject {
  status: string;
  message: string;
  data: AuditLogGetData;
}
