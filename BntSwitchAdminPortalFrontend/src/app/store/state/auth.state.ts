import { IAUTH } from '../../models/auth.interface';

export interface ILoginState {
  auth: false;
  authdata: IAUTH;
  resetData: any;
}

export const initialLoginState: ILoginState = {
  auth: false,
  authdata: null,
  resetData: null,
};
