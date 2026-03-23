export interface LoginResult {
  message: string;
  status: boolean;
}

export interface Description {
  value: string;
  key: string;
}

export interface User {
  name: string;
  id: number;
}

export interface LogsList {
  id: number;
  log_in: any;
  log_out?: any;
  login_result: LoginResult;
  access_points: number;
  description: Description[];
  user: User;
}

export interface AccessLogGetData {
  'total-record': number;
  logsList: LogsList[];
  'page-no': number;
  'total-filtered-record': number;
}

export interface AccessLogGetObject {
  status: string;
  message: string;
  data: AccessLogGetData;
}
