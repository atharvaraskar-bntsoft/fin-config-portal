import { createSelector } from '@ngrx/store';

import { IAppState } from '../state/app.state';
import { IDeviceState } from '../state/device.state';

const selectDevices = (state: IAppState) => state.Device;

export const selectDevice = createSelector(selectDevices, (state: IDeviceState) => state.Device);
export const selectDeviceDetail = createSelector(
  selectDevices,
  (state: IDeviceState) => state.DeviceDetail,
);
export const selectTreeDeepDetail = createSelector(
  selectDevices,
  (state: IDeviceState) => state.TreeDeepDevice,
);
export const selectDeviceResponseSuccess = createSelector(
  selectDevices,
  (state: IDeviceState) => state.DeviceResponseSuccess,
);
export const selectDeviceTypes = createSelector(
  selectDevices,
  (state: IDeviceState) => state.DeviceTypes,
);
export const selectInstitutionList = createSelector(
  selectDevices,
  (state: IDeviceState) => state.Institutiion,
);
export const selectInstitutionGroupList = createSelector(
  selectDevices,
  (state: IDeviceState) => state.InstitutionGroup,
);
export const selectLocationList = createSelector(
  selectDevices,
  (state: IDeviceState) => state.Location,
);

export const deviceModelData = createSelector(
  selectDevices,
  (state: IDeviceState) => state.deviceModelMappedData,
);
