import { createSelector } from '@ngrx/store';

import { IAppState } from '../state/app.state';
import { IDeviceTypesState } from '@app/store/state/device-types.state';

const selectDeviceType = (state: IAppState) => state.deviceTypes;
export const selectDeviceTypesList = createSelector(
  selectDeviceType,
  (state: IDeviceTypesState) => state.deviceTypes,
);
