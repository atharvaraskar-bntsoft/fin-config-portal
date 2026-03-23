import { createSelector } from '@ngrx/store';

import { IAppState } from '../state/app.state';
import { IBinTableState } from '../state/bin-table.state';

const selectBinTableData = (state: IAppState) => state.binTable;

export const selectGetBinTable = createSelector(
  selectBinTableData,
  (state: IBinTableState) => state.getBinTable,
);

export const selectAccountType = createSelector(
  selectBinTableData,
  (state: IBinTableState) => state.getAccountType,
);

export const selectBinDataDetails = createSelector(
  selectBinTableData,
  (state: IBinTableState) => state.getBinTableDetails,
);

export const selectAccountTypeDetails = createSelector(
  selectBinTableData,
  (state: IBinTableState) => state.getAccountTypeDetails,
);

export const selectBinTableAll = createSelector(
  selectBinTableData,
  (state: IBinTableState) => state.getBinTableAll,
);

export const selectBinMaster = createSelector(
  selectBinTableData,
  (state: IBinTableState) => state.getBinMaster,
);

export const selectBinMasterAll = createSelector(
  selectBinTableData,
  (state: IBinTableState) => state.getBinMasterAll,
);

export const selectBinTableAllData = createSelector(
  selectBinTableData,
  (state: IBinTableState) => state.getBinTableData,
);

export const fileUploaded = createSelector(
  selectBinTableData,
  (state: IBinTableState) => state.binUpload,
);
