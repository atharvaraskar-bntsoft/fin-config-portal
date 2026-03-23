import { IPermissionResponse } from '../../models/permission.interface';

export interface IPermissionState {
  permissions: IPermissionResponse;
}

export const initialPermissionState: IPermissionState = {
  permissions: null,
};
