import { createSelector } from '@ngrx/store';
import { IAppState } from '../state/app.state';
import { IBinDataState } from '../state/bin-data.state';

export const selectBinData = (state: IAppState) => state.binData;
export const selectPermissions = (state: IAppState) => state.permissions;

export const selectBinDataList = createSelector(
  selectBinData,
  (state: IBinDataState) => state.binData,
);

export const selectBinDataGetById = createSelector(
  selectBinData,
  (state: IBinDataState) => state.binDataGetById,
);

export const selectBinDataPost = createSelector(
  selectBinData,
  (state: IBinDataState) => state.binPostResponse,
);

export const selectBinDataDelete = createSelector(
  selectBinData,
  (state: IBinDataState) => state.binDeleteResponse,
);

export const selectBinDataAndPermission = createSelector(
  selectBinDataList,
  selectPermissions,
  (selectedBinDataList, selectedPermissions) => [selectedBinDataList, selectedPermissions],
);
