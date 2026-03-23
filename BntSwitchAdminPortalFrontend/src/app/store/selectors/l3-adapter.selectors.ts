import { createSelector } from '@ngrx/store';
import { IAppState } from '../state/app.state';
import { IL3AdapterState } from '../state/l3-adapter.state';

export const selectL3Adapter = (state: IAppState) => state.l3Adapter;
export const selectPermissions = (state: IAppState) => state.permissions;

export const selectL3AdapterList = createSelector(
  selectL3Adapter,
  (state: IL3AdapterState) => state.l3Adapter,
);

export const selectL3AdapterData = createSelector(
  selectL3Adapter,
  (state: IL3AdapterState) => state.l3AdapterData,
);

export const selectL3AdapterById = createSelector(
  selectL3Adapter,
  (state: IL3AdapterState) => state.l3AdapterById,
);

export const selectL3Network = createSelector(
  selectL3Adapter,
  (state: IL3AdapterState) => state.networkList,
);

export const SelectPostActionMethod = createSelector(
  selectL3Adapter,
  (state: IL3AdapterState) => state.postAction,
);

export const SelectPreActionMethod = createSelector(
  selectL3Adapter,
  (state: IL3AdapterState) => state.preAction,
);

export const SelectStepLisMethod = createSelector(
  selectL3Adapter,
  (state: IL3AdapterState) => state.stepList,
);
