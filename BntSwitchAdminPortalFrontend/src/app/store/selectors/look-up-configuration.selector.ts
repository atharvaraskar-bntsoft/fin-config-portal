import { createSelector } from '@ngrx/store';
import { IAppState } from '../state/app.state';
import { ILookUpTypeConfigurationState } from '../state/look-up-configuration.state';

export const selectLookUpTypeConfiguration = (state: IAppState) => state.lookUpConfiguration;

export const selectLookUpTypeList = createSelector(
  selectLookUpTypeConfiguration,
  (state: ILookUpTypeConfigurationState) => state.LookUpType,
);

export const selectLookUpTypeDelete = createSelector(
  selectLookUpTypeConfiguration,
  (state: ILookUpTypeConfigurationState) => state.deleteLookUpTypeConfiguration,
);
export const selectLookUpTypePost = createSelector(
  selectLookUpTypeConfiguration,
  (state: ILookUpTypeConfigurationState) => state.LookUpTypePost,
);
export const selectLookUpTypePut = createSelector(
  selectLookUpTypeConfiguration,
  (state: ILookUpTypeConfigurationState) => state.LookUpTypePut,
);
export const selectLookUpValue = createSelector(
  selectLookUpTypeConfiguration,
  (state: ILookUpTypeConfigurationState) => state.LookUpValue,
);
export const selectUpdateLookUpValue = createSelector(
  selectLookUpTypeConfiguration,
  (state: ILookUpTypeConfigurationState) => state.LookUpValueUpdate,
);
