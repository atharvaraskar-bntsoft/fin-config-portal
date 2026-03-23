export interface ProfileGetData {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  locked: boolean;
  active: boolean;
  mobileNum: string;
  roleId: number;
}

export interface ProfileGetObject {
  status: string;
  message: string;
  data: ProfileGetData;
}
