import { DeviceGetObject } from '../../models/device.interface';

export interface IDeviceState {
  Device: DeviceGetObject;
  DeviceDetail: any;
  DeviceResponseSuccess: any;
  DeviceTypes: any;
  Institutiion: any;
  InstitutionGroup: any;
  Location: any;
  TreeDeepDevice: any;
  selectedDevice: any;
  deviceModelMappedData: any;
}

export const initialDeviceState: IDeviceState = {
  Device: null,
  DeviceDetail: null,
  DeviceResponseSuccess: null,
  DeviceTypes: null,
  Institutiion: null,
  InstitutionGroup: null,
  Location: null,
  TreeDeepDevice: null,
  selectedDevice: null,
  deviceModelMappedData: null,
};
