import { createSelector } from '@ngrx/store';
import { IAppState } from '../state/app.state';
import { IL1AdapterState } from '../state/l1-adapter.state';

export const selectL1Adapter = (state: IAppState) => state.l1Adapter;
export const selectPermissions = (state: IAppState) => state.permissions;

export const selectL1AdapterList = createSelector(
  selectL1Adapter,
  (state: IL1AdapterState) => state.l1Adapter,
);

export const selectUploadTemplate = createSelector(
  selectL1Adapter,
  (state: IL1AdapterState) => state.upload,
);

export const selectDownloadTemplate = createSelector(
  selectL1Adapter,
  (state: IL1AdapterState) => state.download,
);

export const selectDownloadByIDTemplate = createSelector(
  selectL1Adapter,
  (state: IL1AdapterState) => state.downloadByID,
);
export const selctNameValidation = createSelector(
  selectL1Adapter,
  (state: IL1AdapterState) => state.getNameValidation,
);
export const selectL1AdapterData = createSelector(
  selectL1Adapter,
  (state: IL1AdapterState) => state.l1AdapterData,
);

export const selectL1AdapterGetById = createSelector(
  selectL1Adapter,
  (state: IL1AdapterState) => state.l1AdapterGetById,
);

export const selectL1AdapterPost = createSelector(
  selectL1Adapter,
  (state: IL1AdapterState) => state.l1AdapterPostResponse,
);

export const selectL1AdapterDelete = createSelector(
  selectL1Adapter,
  (state: IL1AdapterState) => state.l1AdapterDeleteResponse,
);

export const selectTemplate = createSelector(
  selectL1Adapter,
  (state: IL1AdapterState) => state.templateList,
);

export const selectFormat = createSelector(
  selectL1Adapter,
  (state: IL1AdapterState) => state.formatList,
);

export const selectSchema = createSelector(
  selectL1Adapter,
  (state: IL1AdapterState) => state.schemaList,
);

export const selectSchemaDraft = createSelector(
  selectL1Adapter,
  (state: IL1AdapterState) => state.schemaDraft,
);

export const selectNetwork = createSelector(
  selectL1Adapter,
  (state: IL1AdapterState) => state.networkList,
);


export const selectL1AdapterAndPermission = createSelector(
  selectL1AdapterList,
  selectPermissions,
  (selectedL1AdapterList, selectedPermissions) => [selectedL1AdapterList, selectedPermissions],
);
export const selectL1AdapterEntityMappingList = createSelector(
  selectL1Adapter,
  (state: IL1AdapterState) => state.l1AdapterEntityMappingList,
);
export const selectL1AdapterEntityIMFList = createSelector(
  selectL1Adapter,
  (state: IL1AdapterState) => state.l1AdapterEntityIMFList,
);
export const selectL1AdapterTransactionType = createSelector(
  selectL1Adapter,
  (state: IL1AdapterState) => state.l1AdapterTransactionType,
);
export const selectL1AdapterRuleList = createSelector(
  selectL1Adapter,
  (state: IL1AdapterState) => state.l1AdapterRuleList,
);
export const selectL1AdapterById = createSelector(
  selectL1Adapter,
  (state: IL1AdapterState) => state.adapterById,
);
export const selectL1AdapterMenu = createSelector(
  selectL1Adapter,
  (state: IL1AdapterState) => state.menu,
);
export const selectL1DraftSave = createSelector(
  selectL1Adapter,
  (state: IL1AdapterState) => state.saveDraft,
);
export const selectSchemeImfMapper = createSelector(
  selectL1Adapter,
  (state: IL1AdapterState) => state.SchemeImfMapper,
);
export const selectAdapterDataMap = createSelector(
  selectL1Adapter,
  (state: IL1AdapterState) => state.AdapterDataMap,
);
export const selectInternalCode = createSelector(
  selectL1Adapter,
  (state: IL1AdapterState) => state.internalCode,
);
export const selectVersionData = createSelector(
  selectL1Adapter,
  (state: IL1AdapterState) => state.versionData,
);
export const SelectDeleteRow = createSelector(
  selectL1Adapter,
  (state: IL1AdapterState) => state.DeleteRow,
);
export const SelectLookUpList = createSelector(
  selectL1Adapter,
  (state: IL1AdapterState) => state.lookuplist,
);
export const SelectMessageContextList = createSelector(
  selectL1Adapter,
  (state: IL1AdapterState) => state.MessageContextList,
);
export const SelectPaymentMethod = createSelector(
  selectL1Adapter,
  (state: IL1AdapterState) => state.getPaymentlist,
);

export const SelectPostActionMethod = createSelector(
  selectL1Adapter,
  (state: IL1AdapterState) => state.postAction,
);

export const SelectPreActionMethod = createSelector(
    selectL1Adapter,
    (state: IL1AdapterState) => state.preAction,
  );
export const SelectStepLisMethod = createSelector(
  selectL1Adapter,
  (state: IL1AdapterState) => state.stepList,
);
