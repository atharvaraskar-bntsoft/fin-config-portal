import { Action } from '@ngrx/store';
import { L1AdapterGetObject } from '@app/models/l1-adapter.interface';

export enum EL1AdapterActions {
  GetL1Adapter = '[L1Adapter] Get L1 Adapter Data',
  GetL1AdapterSuccess = '[L1Adapter] Get L1 Adapter Data Success',
  DeleteL1Adapter = '[L1Adapter] Delete Bin Data',
  DeleteL1AdapterSuccess = '[L1Adapter] Delete Bin Data Success',
  PostL1Adapter = '[L1Adapter] Post L1 Adapter Data',
  PostL1AdapterSuccess = '[L1Adapter] Post L1 Adapter Data Success',
  GetRowL1Adapter = '[L1Adapter] Get Bin Data Row',
  GetRowL1AdapterSuccess = '[L1Adapter] Get Bin Data Row Success',
  UpdateL1Adapter = '[L1Adapter] Update Bin Data',
  UpdateL1AdapterSuccess = '[L1Adapter] Update Bin Data Success',
  ClearState = '[L1Adapter] Clear state',
  GetL1AdapterById = '[L1AdapterById] Get Bin Data By Id',
  GetL1AdapterByIdSuccess = '[L1AdapterByIdSuccess] Get Bin Data Success By ID',
  GetL1AdapterEntityMapping = '[L1Adapter] Get Entity Mapping Data',
  GetL1AdapterEntityMappingSuccess = '[L1Adapter] Get Entity Mapping Data Success',
  GetL1AdapterEntityIMF = '[L1Adapter] Get Entity IMF Data',
  GetL1AdapterEntityIMFSuccess = '[L1Adapter] Get Entity IMF Data Success',
  GetL1AdapterTransactionType = '[L1Adapter] Get Transaction Type',
  GetL1AdapterTransactionTypeSuccess = '[L1Adapter] Get Transaction Type Success',
  GetL1AdapterRuleList = '[L1Adapter] Get Rule List',
  GetL1AdapterRuleListSuccess = '[L1Adapter] Get Rule List Success',
  GetTemplates = '[L1Adapter] Get Templates',
  GetTemplatesSuccess = '[L1Adapter] Get Templates Success',
  GetFormat = '[L1Adapter] Get Format',
  GetFormatSuccess = '[L1Adapter] Get Format Success',
  GetAdapterById = '[L1Adapter] Get AdapterById',
  GetAdapterByIdSuccess = '[L1Adapter] Get AdapterById Success',
  GetMenu = '[L1Adapter] Get Menu',
  GetMenuSuccess = '[L1Adapter] Get Menu Success',
  GetSchema = '[L1Adapter] Get Schema',
  GetSchemaSuccess = '[L1Adapter] Get Schema Success',
  DraftSchema = '[L1Adapter] Draft Schema',
  DraftSchemaSuccess = '[L1Adapter] Draft Schema Success',
  GetNetwork = '[L1Adapter] Get Network',
  GetNetworkSuccess = '[L1Adapter] Get Network Success',
  DraftNetwork = '[L1Adapter] Draft Network',
  DraftNetworkSuccess = '[L1Adapter] Draft Network Success',
  DraftTransform = '[L1Adapter] Draft Transform',
  DraftTransformSuccess = '[L1Adapter] Draft Transform Success',
  GetSchemeImfMapper = '[L1Adapter] Get SchemeImfMapper',
  GetSchemeImfMapperSuccess = '[L1Adapter] Get SchemeImfMapper Success',
  GetAdapterDataMap = '[L1Adapter] Get AdapterDataMap',
  GetAdapterDataMapSuccess = '[L1Adapter] Get AdapterDataMap Success',
  GetInternalCode = '[L1Adapter] Get Internal Code',
  GetInternalCodeSuccess = '[L1Adapter] Get Internal Code Success',
  VersionData = '[L1Adapter] Version Data',
  VersionDataSuccess = '[L1Adapter] Version Data Success',
  DownloadTempleData = '[L1Adapter] Download Template',
  DownloadTempleDataSuccess = '[L1Adapter] Download Template Success',
  UploadTemplate = '[L1Adapter] Upload Template Data',
  UploadTemplateSuccess = '[L1Adapter] Upload Template Success',
  DeleteRowSuccess = '[L1Adapter] Delete Row Success',
  DeleteRow = '[L1Adapter] Delete Row',
  GetLookUpList = '[L1Adapter] Get Look Up List',
  GetLookUpListSuccess = '[L1Adapter] Get Look Up List Success',
  GetMessageContextList = '[L1Adapter] Get Message Context List',
  GetMessageContextListSuccess = '[L1Adapter] Get Message Context List Success',
  GetNameValidation = '[L1Adapter] Get Name Validation',
  GetNameValidationSuccess = '[L1Adapter] Get Name Validation Success',
  GetPaymentMethod = '[L1Adapter] Get payment method',
  GetPaymentMethodSuccess = '[L1Adapter] Get payment method Success',
  GetPostActionMethod = '[L1Adapter] Get Post Action Method',
  GetPostActionMethodSuccess = '[L1Adapter] Get Post Action Method Success',
  GetPreActionMethod = '[L1Adapter] Get Pre Action Method',
  GetPreActionMethodSuccess = '[L1Adapter] Get Pre Action Method Success',
  GetStepListMethod = '[L1Adapter] Get l1 step list Method',
  GetStepListMethodSuccess = '[L1Adapter] Get l1 step list Method Success',
  DownloadTempleByID = '[L1Adapter] Download Temphlate By ID',
  DownloadTempleByIDSuccess = '[L1Adapter] Download Temphlate By ID Success',
}

export class GetNameValidation implements Action {
  public readonly type = EL1AdapterActions.GetNameValidation;
  constructor(public payload: any) {}
}

export class GetNameValidationSuccess implements Action {
  public readonly type = EL1AdapterActions.GetNameValidationSuccess;
  constructor(public payload: any) {}
}

export class DownloadTempleData implements Action {
  public readonly type = EL1AdapterActions.DownloadTempleData;
  constructor(public payload: any) {}
}

export class DownloadTempleDataSuccess implements Action {
  public readonly type = EL1AdapterActions.DownloadTempleDataSuccess;
  constructor(public payload: any) {}
}

export class DownloadTempleByID implements Action {
  public readonly type = EL1AdapterActions.DownloadTempleByID;
  constructor(public payload: any) {}
}

export class DownloadTempleByIDSuccess implements Action {
  public readonly type = EL1AdapterActions.DownloadTempleByIDSuccess;
  constructor(public payload: any) {}
}

export class UploadTemplate implements Action {
  public readonly type = EL1AdapterActions.UploadTemplate;
  constructor(public payload: any) {}
}

export class UploadTemplateSuccess implements Action {
  public readonly type = EL1AdapterActions.UploadTemplateSuccess;
  constructor(public payload: any) {}
}

export class VersionData implements Action {
  public readonly type = EL1AdapterActions.VersionData;
  constructor(public payload: any) {}
}

export class VersionDataSuccess implements Action {
  public readonly type = EL1AdapterActions.VersionDataSuccess;
  constructor(public payload: any) {}
}

export class GetInternalCode implements Action {
  public readonly type = EL1AdapterActions.GetInternalCode;
}

export class GetInternalCodeSuccess implements Action {
  public readonly type = EL1AdapterActions.GetInternalCodeSuccess;

  constructor(public payload: any) {}
}

export class GetL1Adapter implements Action {
  public readonly type = EL1AdapterActions.GetL1Adapter;
  constructor(public payload: any) {}
}

export class GetL1AdapterSuccess implements Action {
  public readonly type = EL1AdapterActions.GetL1AdapterSuccess;
  constructor(public payload: L1AdapterGetObject) {}
}

export class GetL1AdapterById implements Action {
  public readonly type = EL1AdapterActions.GetL1AdapterById;
  constructor(public payload: any) {}
}

export class GetL1AdapterByIdSuccess implements Action {
  public readonly type = EL1AdapterActions.GetL1AdapterByIdSuccess;
  constructor(public payload: any) {}
}

export class PostL1Adapter implements Action {
  public readonly type = EL1AdapterActions.PostL1Adapter;
  constructor(public payload: any) {}
}

export class PostL1AdapterSuccess implements Action {
  public readonly type = EL1AdapterActions.PostL1AdapterSuccess;
  constructor(public payload: any) {}
}

export class DeleteL1Adapter implements Action {
  public readonly type = EL1AdapterActions.DeleteL1Adapter;
  constructor(public payload: any) {}
}
export class DeleteL1AdapterSuccess implements Action {
  public readonly type = EL1AdapterActions.DeleteL1AdapterSuccess;
  constructor(public payload: any) {}
}

export class GetRowL1Adapter implements Action {
  public readonly type = EL1AdapterActions.GetRowL1Adapter;
  constructor(public payload?: any) {}
}

export class GetRowL1AdapterSuccess implements Action {
  public readonly type = EL1AdapterActions.GetRowL1AdapterSuccess;
  constructor(public payload: any) {}
}

export class UpdateL1Adapter implements Action {
  public readonly type = EL1AdapterActions.UpdateL1Adapter;
  constructor(public payload: any) {}
}

export class UpdateL1AdapterSuccess implements Action {
  public readonly type = EL1AdapterActions.UpdateL1AdapterSuccess;
  constructor(public payload: any) {}
}

export class GetL1AdapterEntityMapping implements Action {
  public readonly type = EL1AdapterActions.GetL1AdapterEntityMapping;
  constructor(public payload?: any) {}
}

export class GetL1AdapterEntityMappingSuccess implements Action {
  public readonly type = EL1AdapterActions.GetL1AdapterEntityMappingSuccess;
  constructor(public payload?: any) {}
}
export class GetL1AdapterEntityIMF implements Action {
  public readonly type = EL1AdapterActions.GetL1AdapterEntityIMF;
  constructor(public payload?: any) {}
}

export class GetL1AdapterEntityIMFSuccess implements Action {
  public readonly type = EL1AdapterActions.GetL1AdapterEntityIMFSuccess;
  constructor(public payload?: any) {}
}
export class GetL1AdapterTransactionType implements Action {
  public readonly type = EL1AdapterActions.GetL1AdapterTransactionType;
  constructor(public payload?: any) {}
}

export class GetL1AdapterTransactionTypeSuccess implements Action {
  public readonly type = EL1AdapterActions.GetL1AdapterTransactionTypeSuccess;
  constructor(public payload?: any) {}
}
export class GetL1AdapterRuleList implements Action {
  public readonly type = EL1AdapterActions.GetL1AdapterRuleList;
  constructor(public payload?: any) {}
}

export class GetL1AdapterRuleListSuccess implements Action {
  public readonly type = EL1AdapterActions.GetL1AdapterRuleListSuccess;
  constructor(public payload?: any) {}
}

export class ClearState implements Action {
  public readonly type = EL1AdapterActions.ClearState;
}

export class GetTemplates implements Action {
  public readonly type = EL1AdapterActions.GetTemplates;
}

export class GetTemplatesSuccess implements Action {
  public readonly type = EL1AdapterActions.GetTemplatesSuccess;

  constructor(public payload: any) {}
}

export class GetFormat implements Action {
  public readonly type = EL1AdapterActions.GetFormat;
}

export class GetFormatSuccess implements Action {
  public readonly type = EL1AdapterActions.GetFormatSuccess;

  constructor(public payload: any) {}
}

export class GetAdapterById implements Action {
  public readonly type = EL1AdapterActions.GetAdapterById;
  constructor(public payload: any) {}
}

export class GetAdapterByIdSuccess implements Action {
  public readonly type = EL1AdapterActions.GetAdapterByIdSuccess;

  constructor(public payload: any) {}
}
export class GetMenu implements Action {
  public readonly type = EL1AdapterActions.GetMenu;
  constructor(public payload?: any) {}
}

export class GetMenuSuccess implements Action {
  public readonly type = EL1AdapterActions.GetMenuSuccess;

  constructor(public payload: any) {}
}
export class GetSchema implements Action {
  public readonly type = EL1AdapterActions.GetSchema;

  constructor(public payload: any) {}
}

export class GetSchemaSuccess implements Action {
  public readonly type = EL1AdapterActions.GetSchemaSuccess;

  constructor(public payload: any) {}
}

export class DraftSchema implements Action {
  public readonly type = EL1AdapterActions.DraftSchema;
  constructor(public payload: any) {}
}

export class DraftSchemaSuccess implements Action {
  public readonly type = EL1AdapterActions.DraftSchemaSuccess;
  constructor(public payload: any) {}
}

export class GetNetwork implements Action {
  public readonly type = EL1AdapterActions.GetNetwork;
  constructor(public payload: any) {}
}

export class GetNetworkSuccess implements Action {
  public readonly type = EL1AdapterActions.GetNetworkSuccess;

  constructor(public payload: any) {}
}
export class DraftNetwork implements Action {
  public readonly type = EL1AdapterActions.DraftNetwork;
  constructor(public payload: any) {}
}

export class DraftNetworkSuccess implements Action {
  public readonly type = EL1AdapterActions.DraftNetworkSuccess;
  constructor(public payload: any) {}
}
export class DraftTransform implements Action {
  public readonly type = EL1AdapterActions.DraftTransform;
  constructor(public payload: any) {}
}

export class DraftTransformSuccess implements Action {
  public readonly type = EL1AdapterActions.DraftTransformSuccess;
  constructor(public payload: any) {}
}
export class GetSchemeImfMapper implements Action {
  public readonly type = EL1AdapterActions.GetSchemeImfMapper;
  constructor(public payload: any) {}
}

export class GetSchemeImfMapperSuccess implements Action {
  public readonly type = EL1AdapterActions.GetSchemeImfMapperSuccess;
  constructor(public payload: any) {}
}
export class GetAdapterDataMap implements Action {
  public readonly type = EL1AdapterActions.GetAdapterDataMap;
  constructor(public payload?: any) {}
}

export class GetAdapterDataMapSuccess implements Action {
  public readonly type = EL1AdapterActions.GetAdapterDataMapSuccess;
  constructor(public payload?: any) {}
}
export class DeleteRow implements Action {
  public readonly type = EL1AdapterActions.DeleteRow;
  constructor(public payload?: any) {}
}

export class DeleteRowSuccess implements Action {
  public readonly type = EL1AdapterActions.DeleteRowSuccess;
  constructor(public payload: any) {}
}

export class GetLookUpList implements Action {
  public readonly type = EL1AdapterActions.GetLookUpList;
  constructor(public payload?: any) {}
}

export class GetLookUpListSuccess implements Action {
  public readonly type = EL1AdapterActions.GetLookUpListSuccess;
  constructor(public payload: any) {}
}
export class GetMessageContextList implements Action {
  public readonly type = EL1AdapterActions.GetMessageContextList;
  constructor(public payload?: any) {}
}

export class GetMessageContextListSuccess implements Action {
  public readonly type = EL1AdapterActions.GetMessageContextListSuccess;
  constructor(public payload: any) {}
}
export class GetPaymentMethod implements Action {
  public readonly type = EL1AdapterActions.GetPaymentMethod;
  constructor(public payload?: any) {}
}

export class GetPaymentMethodSuccess implements Action {
  public readonly type = EL1AdapterActions.GetPaymentMethodSuccess;
  constructor(public payload: any) {}
}
export class GetPreActionMethod implements Action {
  public readonly type = EL1AdapterActions.GetPreActionMethod;
  constructor(public payload?: any) {}
}

export class GetPostActionMethod implements Action {
    public readonly type = EL1AdapterActions.GetPostActionMethod;
    constructor(public payload?: any) {}
  }

export class GetPreActionMethodSuccess implements Action {
  public readonly type = EL1AdapterActions.GetPreActionMethodSuccess;
  constructor(public payload?: any) {}
}

export class GetPostActionMethodSuccess implements Action {
    public readonly type = EL1AdapterActions.GetPostActionMethodSuccess;
    constructor(public payload?: any) {}
  }

export class GetStepListMethod implements Action {
  public readonly type = EL1AdapterActions.GetStepListMethod;
  constructor(public payload?: any) {}
}

export class GetStepListMethodSuccess implements Action {
  public readonly type = EL1AdapterActions.GetStepListMethodSuccess;
  constructor(public payload?: any) {}
}

export type L1AdapterActions =
  | GetL1Adapter
  | GetL1AdapterSuccess
  | GetL1AdapterById
  | DownloadTempleData
  | DownloadTempleDataSuccess
  | UploadTemplate
  | UploadTemplateSuccess
  | GetL1AdapterByIdSuccess
  | PostL1Adapter
  | PostL1AdapterSuccess
  | DeleteL1Adapter
  | DeleteL1AdapterSuccess
  | GetRowL1Adapter
  | GetRowL1AdapterSuccess
  | ClearState
  | UpdateL1Adapter
  | UpdateL1AdapterSuccess
  | GetTemplates
  | GetTemplatesSuccess
  | GetFormat
  | GetFormatSuccess
  | GetSchema
  | GetSchemaSuccess
  | DraftSchema
  | DraftSchemaSuccess
  | GetNetwork
  | GetNetworkSuccess
  | GetL1AdapterEntityIMF
  | GetL1AdapterEntityIMFSuccess
  | GetL1AdapterEntityMappingSuccess
  | GetL1AdapterEntityMapping
  | GetL1AdapterTransactionType
  | GetL1AdapterTransactionTypeSuccess
  | GetL1AdapterRuleList
  | DraftTransformSuccess
  | DraftTransform
  | GetL1AdapterRuleListSuccess
  | DraftNetwork
  | DraftNetworkSuccess
  | GetAdapterById
  | GetAdapterByIdSuccess
  | GetMenu
  | GetMenuSuccess
  | GetSchemeImfMapper
  | GetSchemeImfMapperSuccess
  | GetAdapterDataMapSuccess
  | GetAdapterDataMap
  | GetInternalCode
  | GetInternalCodeSuccess
  | VersionData
  | VersionDataSuccess
  | DeleteRow
  | GetLookUpListSuccess
  | GetLookUpList
  | GetMessageContextList
  | GetMessageContextListSuccess
  | DeleteRowSuccess
  | GetNameValidationSuccess
  | GetNameValidation
  | GetPaymentMethod
  | GetPaymentMethodSuccess
  | GetPostActionMethod
  | GetPreActionMethod
  | GetPreActionMethodSuccess
  | GetPostActionMethodSuccess
  | GetStepListMethod
  | GetStepListMethodSuccess
  | DownloadTempleByIDSuccess
  | DownloadTempleByID;
