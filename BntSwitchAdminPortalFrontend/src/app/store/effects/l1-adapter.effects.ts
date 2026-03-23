import { Injectable } from '@angular/core';
import { AlertService } from '@app/services/alert.service';
import { L1AdapterService } from '@app/services/l1-adapter.service';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { de_DE } from 'ng-zorro-antd/i18n';
import { of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import {
  ClearState,
  DeleteL1Adapter,
  DeleteL1AdapterSuccess,
  DeleteRow,
  DeleteRowSuccess,
  DownloadTempleDataSuccess,
  DraftNetwork,
  DraftNetworkSuccess,
  DraftSchema,
  DraftSchemaSuccess,
  DraftTransform,
  DraftTransformSuccess,
  EL1AdapterActions,
  GetAdapterById,
  GetAdapterByIdSuccess,
  GetAdapterDataMap,
  GetAdapterDataMapSuccess,
  GetFormat,
  GetFormatSuccess,
  GetInternalCode,
  GetInternalCodeSuccess,
  GetL1Adapter,
  GetL1AdapterById,
  GetL1AdapterByIdSuccess,
  GetL1AdapterEntityIMF,
  GetL1AdapterEntityIMFSuccess,
  GetL1AdapterEntityMapping,
  GetL1AdapterEntityMappingSuccess,
  GetL1AdapterRuleList,
  GetL1AdapterRuleListSuccess,
  GetL1AdapterSuccess,
  GetL1AdapterTransactionType,
  GetL1AdapterTransactionTypeSuccess,
  GetLookUpList,
  GetLookUpListSuccess,
  GetMenu,
  GetMenuSuccess,
  GetMessageContextList,
  GetMessageContextListSuccess,
  GetNameValidation,
  GetNameValidationSuccess,
  GetNetwork,
  GetNetworkSuccess,
  GetPaymentMethod,
  GetPaymentMethodSuccess,
  GetRowL1Adapter,
  GetRowL1AdapterSuccess,
  GetSchema,
  GetSchemaSuccess,
  GetSchemeImfMapper,
  GetSchemeImfMapperSuccess,
  GetTemplates,
  GetTemplatesSuccess,
  PostL1Adapter,
  PostL1AdapterSuccess,
  UpdateL1Adapter,
  UpdateL1AdapterSuccess,
  UploadTemplateSuccess,
  VersionData,
  VersionDataSuccess,
  GetPostActionMethod,
  GetPostActionMethodSuccess,
  GetStepListMethod,
  GetStepListMethodSuccess,
  DownloadTempleByIDSuccess,
  GetPreActionMethodSuccess,
  GetPreActionMethod,
} from '../actions/l1-adapter.action';

@Injectable()
export class L1AdapterEffects {
  
  public UploadTemplate$ = createEffect(() => this._actions$.pipe(
    ofType<GetL1Adapter>(EL1AdapterActions.UploadTemplate),
    switchMap(data => this._l1AdapterService.uploadL1Adapter(data.payload)),
    switchMap((data: any) => {
      this.alertService.responseMessage(data);
      return of(new UploadTemplateSuccess(data));
    }),
  ));

  
  public DownloadTempleData$ = createEffect(() => this._actions$.pipe(
    ofType<GetL1Adapter>(EL1AdapterActions.DownloadTempleData),
    switchMap(data => this._l1AdapterService.downloadL1Adapter(data.payload)),
    switchMap((data: any) => {
      this.alertService.responseMessage({ message: 'Download Successfully' });
      return of(new DownloadTempleDataSuccess(data));
    }),
  ));

  
  public DownloadTempleByID$ = createEffect(() => this._actions$.pipe(
    ofType<GetL1Adapter>(EL1AdapterActions.DownloadTempleByID),
    switchMap(data => this._l1AdapterService.downloadL1AdapterbyId(data.payload)),
    switchMap((data: any) => {
      this.alertService.responseMessage({ message: 'Download Successfully' });
      return of(new DownloadTempleByIDSuccess(data));
    }),
  ));

  
  public GetL1Adapter$ = createEffect(() => this._actions$.pipe(
    ofType<GetL1Adapter>(EL1AdapterActions.GetL1Adapter),
    switchMap(data => this._l1AdapterService.getL1Adapter(data.payload)),
    switchMap((data: any) => {
      return of(new GetL1AdapterSuccess(data.data));
    }),
  ));

  
  public VersionData$ = createEffect(() => this._actions$.pipe(
    ofType<VersionData>(EL1AdapterActions.VersionData),
    switchMap(data => this._l1AdapterService.versionData(data.payload)),
    switchMap((data: any) => {
      this.alertService.responseMessage(data);
      return of(new VersionDataSuccess(data));
    }),
  ));

  
  public GetNameValidation$ = createEffect(() => this._actions$.pipe(
    ofType<GetNameValidation>(EL1AdapterActions.GetNameValidation),
    switchMap(payload => this._l1AdapterService.getNameValidation(payload)),
    switchMap((data: any) => {
      return of(new GetNameValidationSuccess(data));
    }),
  ));
  // L1Adapter$ = this._actions$.pipe(
  //   ofType<GetL1Adapter>(EL1AdapterActions.GetL1Adapter),
  //   switchMap((payload) => this._l1AdapterService.getL1Adapter(payload)),
  //   switchMap((response: L1AdapterGetObject) => {

  //     return of(new GetL1AdapterSuccess(response));
  //   })
  // );

  
  public PostL1Adapter$ = createEffect(() => this._actions$.pipe(
    ofType<PostL1Adapter>(EL1AdapterActions.PostL1Adapter),
    switchMap(data => this._l1AdapterService.postL1Adapter(data.payload)),
    switchMap((response: any) => {
      this.alertService.responseMessage(response);
      return of(new PostL1AdapterSuccess(response));
    }),
  ));

  
  public DeleteL1Adapter$ = createEffect(() => this._actions$.pipe(
    ofType<DeleteL1Adapter>(EL1AdapterActions.DeleteL1Adapter),
    switchMap(data => this._l1AdapterService.deleteLocation(data.payload)),
    switchMap((response: any) => {
      this.alertService.responseMessage(response);
      return of(new DeleteL1AdapterSuccess(response));
    }),
  ));

  
  public GetRowL1Adapter$ = createEffect(() => this._actions$.pipe(
    ofType<GetRowL1Adapter>(EL1AdapterActions.GetRowL1Adapter),
    switchMap(data => this._l1AdapterService.getRowL1Adapter(data)),
    switchMap((response: any) => {
      return of(new GetRowL1AdapterSuccess(response));
    }),
  ));
  
  public GetL1AdapterById$ = createEffect(() => this._actions$.pipe(
    ofType<GetL1AdapterById>(EL1AdapterActions.GetL1AdapterById),
    switchMap(data => this._l1AdapterService.getL1AdapterById(data)),
    switchMap((response: any) => {
      return of(new GetL1AdapterByIdSuccess(response));
    }),
  ));
  
  public UpdateL1Adapter$ = createEffect(() => this._actions$.pipe(
    ofType<UpdateL1Adapter>(EL1AdapterActions.UpdateL1Adapter),
    switchMap(data => this._l1AdapterService.updateL1Adapter(data.payload)),
    switchMap((response: any) => {
      this.alertService.responseMessage(response);
      return of(new UpdateL1AdapterSuccess(response));
    }),
  ));
  
  public GetTemplates$ = createEffect(() => this._actions$.pipe(
    ofType<GetTemplates>(EL1AdapterActions.GetTemplates),
    switchMap(() => this._l1AdapterService.getTemplates()),
    switchMap((data: any) => {
      return of(new GetTemplatesSuccess(data.data));
    }),
  ));
  
  public GetInternalCode$ = createEffect(() => this._actions$.pipe(
    ofType<GetInternalCode>(EL1AdapterActions.GetInternalCode),
    switchMap(() => this._l1AdapterService.getInternalCode()),
    switchMap((data: any) => {
      return of(new GetInternalCodeSuccess(data.data));
    }),
  ));

  
  public GetFormat$ = createEffect(() => this._actions$.pipe(
    ofType<GetFormat>(EL1AdapterActions.GetFormat),
    switchMap(() => this._l1AdapterService.getFormat()),
    switchMap((data: any) => {
      return of(new GetFormatSuccess(data.data));
    }),
  ));

  
  public GetSchema$ = createEffect(() => this._actions$.pipe(
    ofType<GetSchema>(EL1AdapterActions.GetSchema),
    switchMap(data => this._l1AdapterService.getschema(data.payload)),
    switchMap((data: any) => {
      return of(new GetSchemaSuccess(data.data));
    }),
  ));

  
  public DraftSchema$ = createEffect(() => this._actions$.pipe(
    ofType<DraftSchema>(EL1AdapterActions.DraftSchema),
    switchMap(data => this._l1AdapterService.postSchemaDraft(data.payload)),
    switchMap((response: any) => {
      this.alertService.responseMessage(response);
      return of(new DraftSchemaSuccess(response));
    }),
  ));
  
  public GetL1AdapterEntityMapping$ = createEffect(() => this._actions$.pipe(
    ofType<GetL1AdapterEntityMapping>(EL1AdapterActions.GetL1AdapterEntityMapping),
    switchMap(() => this._l1AdapterService.getL1AdapterEntityMappingList()),
    switchMap((response: any) => {
      return of(new GetL1AdapterEntityMappingSuccess(response));
    }),
  ));
  
  public GetL1AdapterEntityIMF$ = createEffect(() => this._actions$.pipe(
    ofType<GetL1AdapterEntityIMF>(EL1AdapterActions.GetL1AdapterEntityIMF),
    switchMap(() => this._l1AdapterService.getL1AdapterEntityIMFList()),
    switchMap((response: any) => {
      return of(new GetL1AdapterEntityIMFSuccess(response));
    }),
  ));

  
  public getL1AdapterTransactionType$ = createEffect(() => this._actions$.pipe(
    ofType<GetL1AdapterTransactionType>(EL1AdapterActions.GetL1AdapterTransactionType),
    switchMap(() => this._l1AdapterService.getL1AdapterTransactionType()),
    switchMap((response: any) => {
      return of(new GetL1AdapterTransactionTypeSuccess(response));
    }),
  ));
  
  public getL1AdapterRuleList$ = createEffect(() => this._actions$.pipe(
    ofType<GetL1AdapterRuleList>(EL1AdapterActions.GetL1AdapterRuleList),
    switchMap(data => this._l1AdapterService.getL1AdapterRuleList(data.payload)),
    switchMap((response: any) => {
      return of(new GetL1AdapterRuleListSuccess(response));
    }),
  ));
  
  public GetNetwork$ = createEffect(() => this._actions$.pipe(
    ofType<GetNetwork>(EL1AdapterActions.GetNetwork),
    switchMap(data => this._l1AdapterService.getNetwork(data.payload)),
    switchMap((data: any) => {
      return of(new GetNetworkSuccess(data.data));
    }),
  ));

  
  public DraftNetwork$ = createEffect(() => this._actions$.pipe(
    ofType<DraftNetwork>(EL1AdapterActions.DraftNetwork),
    switchMap(data => this._l1AdapterService.postNetwrokDraft(data.payload)),
    switchMap((response: any) => {
      this.alertService.responseMessage(response);
      return of(new DraftNetworkSuccess(response));
    }),
  ));
  
  public DraftTransform$ = createEffect(() => this._actions$.pipe(
    ofType<DraftTransform>(EL1AdapterActions.DraftTransform),
    switchMap(data => this._l1AdapterService.postTransformDraft(data.payload)),
    switchMap((response: any) => {
      this.alertService.responseMessage(response);
      return of(new DraftTransformSuccess(response));
    }),
  ));
  
  public GetAdapterById$ = createEffect(() => this._actions$.pipe(
    ofType<GetAdapterById>(EL1AdapterActions.GetAdapterById),
    switchMap(data => this._l1AdapterService.getAdapterById(data.payload)),
    switchMap((response: any) => {
      return of(new GetAdapterByIdSuccess(response));
    }),
  ));
  
  public GetMenu$ = createEffect(() => this._actions$.pipe(
    ofType<GetMenu>(EL1AdapterActions.GetMenu),
    switchMap(payload => this._l1AdapterService.getAdapterMenu(payload)),
    switchMap((data: any) => {
      return of(new GetMenuSuccess(data.data));
    }),
  ));
  
  public GetSchemeImfMapper$ = createEffect(() => this._actions$.pipe(
    ofType<GetSchemeImfMapper>(EL1AdapterActions.GetSchemeImfMapper),
    switchMap(data => this._l1AdapterService.getSchemeImfMapper(data.payload)),
    switchMap((response: any) => {
      return of(new GetSchemeImfMapperSuccess(response));
    }),
  ));
  
  public GetAdapterDataMap$ = createEffect(() => this._actions$.pipe(
    ofType<GetAdapterDataMap>(EL1AdapterActions.GetAdapterDataMap),
    switchMap(() => this._l1AdapterService.getAdapterDataMap()),
    switchMap((response: any) => {
      return of(new GetAdapterDataMapSuccess(response));
    }),
  ));
  
  public DeleteRow$ = createEffect(() => this._actions$.pipe(
    ofType<DeleteRow>(EL1AdapterActions.DeleteRow),
    switchMap(id => this._l1AdapterService.deleteRow(id)),
    switchMap((response: any) => {
      this.alertService.responseMessage(response);
      return of(new DeleteRowSuccess(response));
    }),
  ));
  
  public GetLookUpList$ = createEffect(() => this._actions$.pipe(
    ofType<GetLookUpList>(EL1AdapterActions.GetLookUpList),
    switchMap(payload => this._l1AdapterService.getLookUpList()),
    switchMap((response: any) => {
      return of(new GetLookUpListSuccess(response));
    }),
  ));
  
  public GetMessageContextList$ = createEffect(() => this._actions$.pipe(
    ofType<GetMessageContextList>(EL1AdapterActions.GetMessageContextList),
    switchMap(data => this._l1AdapterService.getMessageContextList(data.payload)),
    switchMap((response: any) => {
      return of(new GetMessageContextListSuccess(response));
    }),
  ));
  
  public GetPaymentMethod$ = createEffect(() => this._actions$.pipe(
    ofType<GetPaymentMethod>(EL1AdapterActions.GetPaymentMethod),
    switchMap(() => this._l1AdapterService.getPaymentMethodService()),
    switchMap((response: any) => {
      return of(new GetPaymentMethodSuccess(response));
    }),
  ));
  
  public GetPostActionMethod$ = createEffect(() => this._actions$.pipe(
    ofType<GetPostActionMethod>(EL1AdapterActions.GetPostActionMethod),
    switchMap(() => this._l1AdapterService.getPostActionMethod()),
    switchMap((response: any) => {
      return of(new GetPostActionMethodSuccess(response));
    }),
  ));

  
  public GetPreActionMethod$ = createEffect(() => this._actions$.pipe(
    ofType<GetPreActionMethod>(EL1AdapterActions.GetPreActionMethod),
    switchMap(() => this._l1AdapterService.getPreActionMethod()),
    switchMap((response: any) => {
      return of(new GetPreActionMethodSuccess(response));
    }),
  ));

  
  public GetStepListMethod$ = createEffect(() => this._actions$.pipe(
    ofType<GetPostActionMethod>(EL1AdapterActions.GetStepListMethod),
    switchMap(() => this._l1AdapterService.GetStepListMethod()),
    switchMap((response: any) => {
      return of(new GetStepListMethodSuccess(response));
    }),
  ));
  constructor(
    private _l1AdapterService: L1AdapterService,
    private _actions$: Actions,
    private alertService: AlertService,
  ) {}
}
