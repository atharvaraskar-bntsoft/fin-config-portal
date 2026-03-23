import { DeviceTypeGetObject } from '@app/models/device-types.interface';

export interface IDeviceTypesState {
  deviceTypes: DeviceTypeGetObject;
}

export const initialDeviceTypesState: IDeviceTypesState = {
  deviceTypes: null,
};
