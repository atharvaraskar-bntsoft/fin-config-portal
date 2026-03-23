import { createSelector } from '@ngrx/store';
import { IAppState } from '../state/app.state';
import { ISchemeImfMapperState } from '../state/scheme-imf-mapper.state';

export const selectSchemeImfMapper = (state: IAppState) => state.schemeImfMapper;
export const selectPermissions = (state: IAppState) => state.permissions;

export const selectSchemeImfMapperList = createSelector(
  selectSchemeImfMapper,
  (state: ISchemeImfMapperState) => state.schemeImfMapper,
);

export const selectScheme = createSelector(
  selectSchemeImfMapper,
  (state: ISchemeImfMapperState) => state.schemeList,
);

export const selectField = createSelector(
  selectSchemeImfMapper,
  (state: ISchemeImfMapperState) => state.fieldList,
);

export const selectIMF = createSelector(
  selectSchemeImfMapper,
  (state: ISchemeImfMapperState) => state.imfList,
);

export const selectIPC = createSelector(
  selectSchemeImfMapper,
  (state: ISchemeImfMapperState) => state.ipcList,
);

export const selectMap = createSelector(
  selectSchemeImfMapper,
  (state: ISchemeImfMapperState) => state.mapList,
);

export const selectSchemeImfMapperSave = createSelector(
  selectSchemeImfMapper,
  (state: ISchemeImfMapperState) => state.schemeImfMapperSave,
);

export const selectElFunction = createSelector(
  selectSchemeImfMapper,
  (state: ISchemeImfMapperState) => state.elFunctionList,
);
export const selectGetIMFVersion = createSelector(
  selectSchemeImfMapper,
  (state: ISchemeImfMapperState) => state.imfVersionList,
);
export const selectGetServiceType = createSelector(
  selectSchemeImfMapper,
  (state: ISchemeImfMapperState) => state.serviceType,
);
export const selectMapper = createSelector(
  selectSchemeImfMapper,
  (state: ISchemeImfMapperState) => state.builtMapper,
);
