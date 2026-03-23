import { createSelector } from '@ngrx/store';
import { IAppState } from '../state/app.state';
import { ICorePropertiesState } from '../state/core-properties.state';

export const selectCoreProperties = (state: IAppState) => state.CoreProperties;

export const selectCorePropertiesListGet = createSelector(   
  selectCoreProperties,
  (state: ICorePropertiesState) => state.CorePropertiesGet,
);
export const selectDefaultCorePropertiesListGet = createSelector(   
    selectCoreProperties,
    (state: ICorePropertiesState) => state.DefaultCorePropertiesGet,
  );
export const selectCorePropertiesListGetById = createSelector(   
  selectCoreProperties,
  (state: ICorePropertiesState) => state.CorePropertiesGetById,
);
export const selectCorePropertiesPost = createSelector(
  selectCoreProperties,
  (state: ICorePropertiesState) => state.CorePropertiesPost,
);
export const selectCorePropertiesUpdate = createSelector(
  selectCoreProperties,
  (state: ICorePropertiesState) => state.CorePropertiesUpdate,
);

