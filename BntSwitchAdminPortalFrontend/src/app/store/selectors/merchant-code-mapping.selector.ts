import { createSelector } from '@ngrx/store';
import { IAppState } from '../state/app.state';
import { IMerchantCodeMappingState } from '../state/merchant-code-mapping.state';

export const selectMerchantCodemapping = (state: IAppState) => state.merchantCodeMapping;
export const selectMerchantCodemappingResponse = (state: IAppState) => state.merchantCodeMapping;
export const deleteMerchantCodeMapping = (state: IAppState) => state.merchantCodeMapping;
export const selectRowMerchantCodemapping = (state: IAppState) => state.merchantCodeMapping;
export const merchantCodeMappingPostResponse = (state: IAppState) => state.merchantCodeMapping;
export const merchantConfigueData = (state: IAppState) => state.merchantCodeMapping;

export const selectMerchantCodeMappingList = createSelector(
  selectMerchantCodemapping,
  (state: IMerchantCodeMappingState) => state.merchantCodeMapping,
);

export const selectMerchantCodeMappingDelete = createSelector(
  deleteMerchantCodeMapping,
  (state: any) => state.deleteMerchantCodeMapping,
);
export const selectMerchantCodeMappingResponse = createSelector(
  selectMerchantCodemappingResponse,
  (state: IMerchantCodeMappingState) => state.selectedMerchantCodeMapping,
);
export const selectRowMerchantCodeMappingSuccess = createSelector(
  selectRowMerchantCodemapping,
  (state: IMerchantCodeMappingState) => state.merchantCodeMappingRow,
);

export const selectMerchantCodeMappingPostSuccess = createSelector(
  merchantCodeMappingPostResponse,
  (state: any) => state.merchantCodeMappingPostResponse,
);

export const selectMerchantCodeMappingAndPermission = createSelector(
  selectMerchantCodemapping,
  (state: any) => state.merchantCodeMapping,
);
export const selectMerchantConfigData = createSelector(
  merchantConfigueData,
  (state: any) => state.merchantConfigueData,
);
