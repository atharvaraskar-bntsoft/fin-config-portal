import { OverlayModule } from '@angular/cdk/overlay';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { EventEmitter } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { AlertService } from '@app/services/alert.service';
import { SubscribeService } from '@app/services/subscribe.services';
import { SharedModule } from '@app/shared/shared.module';
import { IAppState } from '@app/store/state/app.state';
import { NgSelectModule } from '@ng-select/ng-select';
import { MemoizedSelector, StoreModule } from '@ngrx/store';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { SnotifyService } from 'ng-snotify';
import { NzModalService } from 'ng-zorro-antd/modal';
import { AlertModule, DatePickerRvModule, TabsModule } from 'bnt';
import { of } from 'rxjs';
import { ImfJsonComponent } from './imf-json.component';
import { selectViewSettingsList } from '@app/store/selectors/view-settings.selector';
import { getIfmList, DeleteImfJsonSuccess } from '@app/store/selectors/imf-json.selector';
import { ImfJsonService } from '@app/services/imf-json.service';
import { selectPermissionsData } from '@app/store/selectors/permission.selectors';
import { ImportFileService } from '@app/services/import-file.service';
import { TransitionCheckState } from '@angular/material/checkbox';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ClipboardService } from 'ngx-clipboard';
import { CommonModule } from '@angular/common';

class translateServiceMock {
  public onLangChange: EventEmitter<any> = new EventEmitter();
  public onTranslationChange: EventEmitter<any> = new EventEmitter();
  public onDefaultLangChange: EventEmitter<any> = new EventEmitter();

  public get(key: any): any {
    return of(key);
  }

  public setDefaultLang(key: any): any {
    return of(key);
  }
}
const permissionJSON = {
  data: [
    {
      check: false,
      delete: true,
      id: 'link_imf',
      read: true,
      update: true,
      write: true,
    },
  ],
  status: null,
  message: null,
};
const selectViewSettingsListJson = {
  status: 'success',
  message: 'Find all Setting',
  data: {
    pagination: ['20', '25', '30', '40', '50'],
    language: ['en_EN', 'en_EN1', 'fr_FR', 'en_INV'],
    settingDto: {
      id: 1,
      systemUserId:
        'SystemUser [firstName=Bnt, lastName=Admin,  email=bnt.admin@bnt.com, systemUserCategory=, password=9AHRz1ElALzTEdFKIKywyzEZh0IcZ/INhbGkbc0Qb84=, passwordLastUpdatedOn=2020-07-02 13:09:08.0, locked=0, deleted=0, lockedReason=null]',
      search: 'contain',
      language: 'en_EN1',
      pagination: '20',
    },
    searchOption: ['contain', 'contain2'],
  },
};
const getIfmListJson = {};
const DeleteImfJsonSuccessJson = {};

describe('ImfJsonComponent', () => {
  let component: ImfJsonComponent;
  let fixture: ComponentFixture<ImfJsonComponent>;
  let mockStore: MockStore<IAppState>;
  let translateService: TranslateService;
  let setDefaultLangSpy: jasmine.Spy;
  let imfJsonService: ImfJsonService;
  let mockselectPermissionsData;
  let mockselectViewSettingsList: MemoizedSelector<any, any>;
  let mockgetIfmList: MemoizedSelector<any, any>;
  let mockDeleteImfJsonSuccess: MemoizedSelector<any, any>;
  const importFileService = jasmine.createSpyObj('ImportFileService', ['clearData']);

  beforeEach(() => {
    const translateService = jasmine.createSpyObj('TranslateService', ['get', 'setDefaultLang']);
    const alertService = jasmine.createSpyObj('AlertService, SnotifyService', ['responseMessage']);
    TestBed.configureTestingModule({
      declarations: [ImfJsonComponent],
      providers: [
        SnotifyService,
        NzModalService,
        // AlertService,
        ClipboardService,
        SubscribeService,
        ImportFileService,
        { provide: TranslateService, useClass: translateServiceMock },
        { provide: 'SnotifyToastConfig', useValue: {} },
        { provide: ImfJsonService, useValue: imfJsonService },
        { provide: ImportFileService, useValue: importFileService },
        { provide: AlertService, useValue: alertService },
        provideMockStore(),
      ],
      imports: [
        CommonModule,
        OverlayModule,
        SharedModule,
        NgSelectModule,
        FormsModule,
        ReactiveFormsModule,
        AlertModule,
        TabsModule,
        TranslateModule.forRoot({}),
        DatePickerRvModule,
        HttpClientTestingModule,
        NgxDatatableModule,
        RouterTestingModule,
        BrowserModule,
        BrowserAnimationsModule,
        StoreModule.forRoot({}),
      ],
    }).compileComponents();
    mockStore = TestBed.get(MockStore);
    fixture = TestBed.createComponent(ImfJsonComponent);
    component = fixture.componentInstance;
    mockselectViewSettingsList = mockStore.overrideSelector(
      selectViewSettingsList,
      selectViewSettingsListJson,
    );
    mockgetIfmList = mockStore.overrideSelector(getIfmList, getIfmListJson);
    mockDeleteImfJsonSuccess = mockStore.overrideSelector(
      DeleteImfJsonSuccess,
      DeleteImfJsonSuccessJson,
    );
    mockselectPermissionsData = mockStore.overrideSelector(selectPermissionsData, permissionJSON);
    setDefaultLangSpy = translateService.get.and.returnValue(of([]));
    mockStore.refreshState();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('click open button should call open modal in html ', () => {
    component.open();
    expect(component.visible).toEqual(true);
  });
//   it('getRowData fuction should call click on viewdetails form this HTMl', () => {
//     const row = {
//       edit: true,
//       id: 29,
//       imf: {},
//       index: 0,
//       name: 'IMF Structure 86',
//       version: 86,
//     };
//     component.viewEditClick(row);
//         expect(component._router.navigate).toHaveBeenCalledWith(['/adapter-configuration/imf/edit', row.id]);
//   });

// it('click open button should call open modal in html ', () => {
//     const keyData = {
//       edit: true,
//       id: 29,
//       imf: { 
        
//         "attributes": [
//         {
//           "type": "field",
//           "alias": "Account number",
//           "isHide": false,
//           "parent": "0-0",
//           "pattern": "(?<=\\w{6}).(?=[^.]*?\\w{4})",
//           "fieldName": "account_number",
//           "fieldType": "STRING",
//           "isPersist": true,
//           "isEditable": false,
//           "isSensitive": false
//         },
//         {
//           "type": "field",
//           "alias": "Extended account number",
//           "isHide": false,
//           "parent": "0-1",
//           "pattern": "(?<=\\w{2}).(?=[^.]*?\\w{2})",
//           "fieldName": "account_number_extended",
//           "fieldType": "STRING",
//           "isPersist": true,
//           "isEditable": false,
//           "isSensitive": true
//         },
//         {
//           "name": "transaction_type_indicator",
//           "type": "fields",
//           "parent": "0-2",
//           "attributes": [
//             {
//               "type": "field",
//               "alias": "Type",
//               "isHide": false,
//               "parent": "0-2-0",
//               "pattern": null,
//               "fieldName": "type",
//               "fieldType": "STRING",
//               "isPersist": true,
//               "isEditable": false,
//               "isSensitive": false
//             },
//             {
//               "type": "field",
//               "alias": "From account type",
//               "isHide": false,
//               "parent": "0-2-1",
//               "pattern": null,
//               "fieldName": "from_account_type",
//               "fieldType": "STRING",
//               "isPersist": true,
//               "isEditable": false,
//               "isSensitive": false
//             },
//             {
//               "type": "field",
//               "alias": "To account type",
//               "isHide": false,
//               "parent": "0-2-2",
//               "pattern": null,
//               "fieldName": "to_account_type",
//               "fieldType": "STRING",
//               "isPersist": true,
//               "isEditable": false,
//               "isSensitive": false
//             },
//             {
//               "type": "field",
//               "alias": "condition",
//               "isHide": false,
//               "parent": "0-2-3",
//               "pattern": null,
//               "fieldName": "condition",
//               "fieldType": "STRING",
//               "isPersist": true,
//               "isEditable": false,
//               "isSensitive": false
//             },
//             {
//               "type": "field",
//               "alias": "Budget Period",
//               "isHide": false,
//               "parent": "0-2-4",
//               "pattern": null,
//               "fieldName": "budget_period",
//               "fieldType": "STRING",
//               "isPersist": true,
//               "isEditable": false,
//               "isSensitive": false
//             }
//           ],
//           "fieldsType": "SIMPLE",
//           "isEditable": false
//         },
//         {
//           "name": "amounts",
//           "type": "fields",
//           "parent": "0-3",
//           "attributes": [
//             {
//               "name": "amount_transaction",
//               "type": "fields",
//               "parent": "0-3-0",
//               "attributes": [
//                 {
//                   "type": "field",
//                   "alias": "Value",
//                   "isHide": false,
//                   "parent": "0-3-0-0",
//                   "pattern": null,
//                   "fieldName": "value",
//                   "fieldType": "DOUBLE",
//                   "isPersist": true,
//                   "isEditable": false,
//                   "isSensitive": false
//                 },
//                 {
//                   "type": "field",
//                   "alias": "Currency minor unit",
//                   "isHide": false,
//                   "parent": "0-3-0-1",
//                   "pattern": null,
//                   "fieldName": "minor_unit",
//                   "fieldType": "INTEGER",
//                   "isPersist": true,
//                   "isEditable": false,
//                   "isSensitive": false
//                 },
//                 {
//                   "type": "field",
//                   "alias": "Currency code",
//                   "isHide": false,
//                   "parent": "0-3-0-2",
//                   "pattern": null,
//                   "fieldName": "currency",
//                   "fieldType": "STRING",
//                   "isPersist": true,
//                   "isEditable": false,
//                   "isSensitive": false
//                 }
//               ],
//               "fieldsType": "SIMPLE",
//               "isEditable": false
//             },
//             {
//               "name": "amount_cashback",
//               "type": "fields",
//               "parent": "0-3-1",
//               "attributes": [
//                 {
//                   "type": "field",
//                   "alias": "Value",
//                   "isHide": false,
//                   "parent": "0-3-1-0",
//                   "pattern": null,
//                   "fieldName": "value",
//                   "fieldType": "DOUBLE",
//                   "isPersist": true,
//                   "isEditable": false,
//                   "isSensitive": false
//                 },
//                 {
//                   "type": "field",
//                   "alias": "Currency minor unit",
//                   "isHide": false,
//                   "parent": "0-3-1-1",
//                   "pattern": null,
//                   "fieldName": "minor_unit",
//                   "fieldType": "INTEGER",
//                   "isPersist": true,
//                   "isEditable": false,
//                   "isSensitive": false
//                 },
//                 {
//                   "type": "field",
//                   "alias": "Currency code",
//                   "isHide": false,
//                   "parent": "0-3-1-2",
//                   "pattern": null,
//                   "fieldName": "currency",
//                   "fieldType": "STRING",
//                   "isPersist": true,
//                   "isEditable": false,
//                   "isSensitive": false
//                 }
//               ],
//               "fieldsType": "SIMPLE",
//               "isEditable": false
//             },
//             {
//               "name": "amount_settlement",
//               "type": "fields",
//               "parent": "0-3-2",
//               "attributes": [
//                 {
//                   "type": "field",
//                   "alias": "Value",
//                   "isHide": false,
//                   "parent": "0-3-2-0",
//                   "pattern": null,
//                   "fieldName": "value",
//                   "fieldType": "DOUBLE",
//                   "isPersist": true,
//                   "isEditable": false,
//                   "isSensitive": false
//                 },
//                 {
//                   "type": "field",
//                   "alias": "Currency minor unit",
//                   "isHide": false,
//                   "parent": "0-3-2-1",
//                   "pattern": null,
//                   "fieldName": "minor_unit",
//                   "fieldType": "INTEGER",
//                   "isPersist": true,
//                   "isEditable": false,
//                   "isSensitive": false
//                 },
//                 {
//                   "type": "field",
//                   "alias": "Currency code",
//                   "isHide": false,
//                   "parent": "0-3-2-2",
//                   "pattern": null,
//                   "fieldName": "currency",
//                   "fieldType": "STRING",
//                   "isPersist": true,
//                   "isEditable": false,
//                   "isSensitive": false
//                 }
//               ],
//               "fieldsType": "SIMPLE",
//               "isEditable": false
//             },
//             {
//               "name": "amount_cardholder_billing",
//               "type": "fields",
//               "parent": "0-3-3",
//               "attributes": [
//                 {
//                   "type": "field",
//                   "alias": "Value",
//                   "isHide": false,
//                   "parent": "0-3-3-0",
//                   "pattern": null,
//                   "fieldName": "value",
//                   "fieldType": "DOUBLE",
//                   "isPersist": true,
//                   "isEditable": false,
//                   "isSensitive": false
//                 },
//                 {
//                   "type": "field",
//                   "alias": "Currency minor unit",
//                   "isHide": false,
//                   "parent": "0-3-3-1",
//                   "pattern": null,
//                   "fieldName": "minor_unit",
//                   "fieldType": "INTEGER",
//                   "isPersist": true,
//                   "isEditable": false,
//                   "isSensitive": false
//                 },
//                 {
//                   "type": "field",
//                   "alias": "Currency code",
//                   "isHide": false,
//                   "parent": "0-3-3-2",
//                   "pattern": null,
//                   "fieldName": "currency",
//                   "fieldType": "STRING",
//                   "isPersist": true,
//                   "isEditable": false,
//                   "isSensitive": false
//                 }
//               ],
//               "fieldsType": "SIMPLE",
//               "isEditable": false
//             },
//             {
//               "name": "amount_original",
//               "type": "fields",
//               "parent": "0-3-4",
//               "attributes": [
//                 {
//                   "name": "transaction_amount",
//                   "type": "fields",
//                   "parent": "0-3-4-0",
//                   "attributes": [
//                     {
//                       "type": "field",
//                       "alias": "Value",
//                       "isHide": false,
//                       "parent": "0-3-4-0-0",
//                       "pattern": null,
//                       "fieldName": "value",
//                       "fieldType": "DOUBLE",
//                       "isPersist": true,
//                       "isEditable": false,
//                       "isSensitive": false
//                     },
//                     {
//                       "type": "field",
//                       "alias": "Currency minor unit",
//                       "isHide": false,
//                       "parent": "0-3-4-0-1",
//                       "pattern": null,
//                       "fieldName": "minor_unit",
//                       "fieldType": "INTEGER",
//                       "isPersist": true,
//                       "isEditable": false,
//                       "isSensitive": false
//                     },
//                     {
//                       "type": "field",
//                       "alias": "Currency code",
//                       "isHide": false,
//                       "parent": "0-3-4-0-2",
//                       "pattern": null,
//                       "fieldName": "currency",
//                       "fieldType": "STRING",
//                       "isPersist": true,
//                       "isEditable": false,
//                       "isSensitive": false
//                     }
//                   ],
//                   "fieldsType": "SIMPLE",
//                   "isEditable": false
//                 },
//                 {
//                   "name": "settlement_amount",
//                   "type": "fields",
//                   "parent": "0-3-4-1",
//                   "attributes": [
//                     {
//                       "type": "field",
//                       "alias": "Value",
//                       "isHide": false,
//                       "parent": "0-3-4-1-0",
//                       "pattern": null,
//                       "fieldName": "value",
//                       "fieldType": "DOUBLE",
//                       "isPersist": true,
//                       "isEditable": false,
//                       "isSensitive": false
//                     },
//                     {
//                       "type": "field",
//                       "alias": "Currency minor unit",
//                       "isHide": false,
//                       "parent": "0-3-4-1-1",
//                       "pattern": null,
//                       "fieldName": "minor_unit",
//                       "fieldType": "INTEGER",
//                       "isPersist": true,
//                       "isEditable": false,
//                       "isSensitive": false
//                     },
//                     {
//                       "type": "field",
//                       "alias": "Currency code",
//                       "isHide": false,
//                       "parent": "0-3-4-1-2",
//                       "pattern": null,
//                       "fieldName": "currency",
//                       "fieldType": "STRING",
//                       "isPersist": true,
//                       "isEditable": false,
//                       "isSensitive": false
//                     }
//                   ],
//                   "fieldsType": "SIMPLE",
//                   "isEditable": false
//                 }
//               ],
//               "fieldsType": "SIMPLE",
//               "isEditable": false
//             }
//           ],
//           "fieldsType": "SIMPLE",
//           "isEditable": false
//         },
//         {
//           "name": "fee_and_conversion_rate",
//           "type": "fields",
//           "parent": "0-4",
//           "attributes": [
//             {
//               "name": "amount_cardholder_fee",
//               "type": "fields",
//               "parent": "0-4-0",
//               "attributes": [
//                 {
//                   "type": "field",
//                   "alias": "Value",
//                   "isHide": false,
//                   "parent": "0-4-0-0",
//                   "pattern": null,
//                   "fieldName": "value",
//                   "fieldType": "DOUBLE",
//                   "isPersist": true,
//                   "isEditable": false,
//                   "isSensitive": false
//                 },
//                 {
//                   "type": "field",
//                   "alias": "Currency minor unit",
//                   "isHide": false,
//                   "parent": "0-4-0-1",
//                   "pattern": null,
//                   "fieldName": "minor_unit",
//                   "fieldType": "INTEGER",
//                   "isPersist": true,
//                   "isEditable": false,
//                   "isSensitive": false
//                 },
//                 {
//                   "type": "field",
//                   "alias": "currency_code",
//                   "isHide": false,
//                   "parent": "0-4-0-2",
//                   "pattern": null,
//                   "fieldName": "currency",
//                   "fieldType": "STRING",
//                   "isPersist": true,
//                   "isEditable": false,
//                   "isSensitive": false
//                 }
//               ],
//               "fieldsType": "SIMPLE",
//               "isEditable": false
//             },
//             {
//               "type": "field",
//               "alias": "Conversion rate settlement",
//               "isHide": false,
//               "parent": "0-4-1",
//               "pattern": null,
//               "fieldName": "conversion_rate_settlement",
//               "fieldType": "DOUBLE",
//               "isPersist": true,
//               "isEditable": false,
//               "isSensitive": false
//             },
//             {
//               "type": "field",
//               "alias": "Conversion rate cardholder billing",
//               "isHide": false,
//               "parent": "0-4-2",
//               "pattern": null,
//               "fieldName": "conversion_rate_cardholder_billing",
//               "fieldType": "DOUBLE",
//               "isPersist": true,
//               "isEditable": false,
//               "isSensitive": false
//             },
//             {
//               "name": "amount_fees",
//               "type": "fields",
//               "parent": "0-4-3",
//               "attributes": [
//                 {
//                   "type": "field",
//                   "alias": "Code",
//                   "isHide": false,
//                   "parent": "0-4-3-0",
//                   "pattern": null,
//                   "fieldName": "code",
//                   "fieldType": "STRING",
//                   "isPersist": true,
//                   "isEditable": false,
//                   "isSensitive": false
//                 },
//                 {
//                   "type": "field",
//                   "alias": "",
//                   "isHide": false,
//                   "parent": "0-4-3-1",
//                   "pattern": null,
//                   "fieldName": "conversion_rate_fee",
//                   "fieldType": "DOUBLE",
//                   "isPersist": true,
//                   "isEditable": false,
//                   "isSensitive": false
//                 },
//                 {
//                   "name": "transaction_amount_fee",
//                   "type": "fields",
//                   "parent": "0-4-3-2",
//                   "attributes": [
//                     {
//                       "type": "field",
//                       "alias": "Value",
//                       "isHide": false,
//                       "parent": "0-4-3-2-0",
//                       "pattern": null,
//                       "fieldName": "value",
//                       "fieldType": "DOUBLE",
//                       "isPersist": true,
//                       "isEditable": false,
//                       "isSensitive": false
//                     },
//                     {
//                       "type": "field",
//                       "alias": "Currency minor unit",
//                       "isHide": false,
//                       "parent": "0-4-3-2-1",
//                       "pattern": null,
//                       "fieldName": "minor_unit",
//                       "fieldType": "INTEGER",
//                       "isPersist": true,
//                       "isEditable": false,
//                       "isSensitive": false
//                     },
//                     {
//                       "type": "field",
//                       "alias": "currency_code",
//                       "isHide": false,
//                       "parent": "0-4-3-2-2",
//                       "pattern": null,
//                       "fieldName": "currency",
//                       "fieldType": "STRING",
//                       "isPersist": true,
//                       "isEditable": false,
//                       "isSensitive": false
//                     }
//                   ],
//                   "fieldsType": "SIMPLE",
//                   "isEditable": false
//                 },
//                 {
//                   "name": "settlement_amount_fee",
//                   "type": "fields",
//                   "parent": "0-4-3-3",
//                   "attributes": [
//                     {
//                       "type": "field",
//                       "alias": "Value",
//                       "isHide": false,
//                       "parent": "0-4-3-3-0",
//                       "pattern": null,
//                       "fieldName": "value",
//                       "fieldType": "DOUBLE",
//                       "isPersist": true,
//                       "isEditable": false,
//                       "isSensitive": false
//                     },
//                     {
//                       "type": "field",
//                       "alias": "Currency minor unit",
//                       "isHide": false,
//                       "parent": "0-4-3-3-1",
//                       "pattern": null,
//                       "fieldName": "minor_unit",
//                       "fieldType": "INTEGER",
//                       "isPersist": true,
//                       "isEditable": false,
//                       "isSensitive": false
//                     },
//                     {
//                       "type": "field",
//                       "alias": "currency_code",
//                       "isHide": false,
//                       "parent": "0-4-3-3-2",
//                       "pattern": null,
//                       "fieldName": "currency",
//                       "fieldType": "STRING",
//                       "isPersist": true,
//                       "isEditable": false,
//                       "isSensitive": false
//                     }
//                   ],
//                   "fieldsType": "SIMPLE",
//                   "isEditable": false
//                 }
//               ],
//               "fieldsType": "SIMPLE",
//               "isEditable": false
//             }
//           ],
//           "fieldsType": "SIMPLE",
//           "isEditable": false
//         },
//         {
//           "type": "field",
//           "alias": "Transmission date time",
//           "isHide": false,
//           "parent": "0-5",
//           "pattern": null,
//           "fieldName": "transmission_date_time",
//           "fieldType": "DATE",
//           "isPersist": true,
//           "isEditable": false,
//           "isSensitive": false
//         },
//         {
//           "type": "field",
//           "alias": "System trace audit number",
//           "isHide": false,
//           "parent": "0-6",
//           "pattern": null,
//           "fieldName": "system_trace_audit_number",
//           "fieldType": "INTEGER",
//           "isPersist": true,
//           "isEditable": false,
//           "isSensitive": false
//         },
//         {
//           "type": "field",
//           "alias": "Local transaction date time",
//           "isHide": false,
//           "parent": "0-7",
//           "pattern": null,
//           "fieldName": "local_date_time",
//           "fieldType": "OBJECT",
//           "isPersist": true,
//           "isEditable": false,
//           "isSensitive": false
//         },
//         {
//           "name": "card",
//           "type": "fields",
//           "parent": "0-8",
//           "attributes": [
//             {
//               "type": "field",
//               "alias": "Expiry",
//               "isHide": false,
//               "parent": "0-8-0",
//               "pattern": null,
//               "fieldName": "expiry",
//               "fieldType": "STRING",
//               "isPersist": true,
//               "isEditable": false,
//               "isSensitive": false
//             },
//             {
//               "type": "field",
//               "alias": "Sequence number",
//               "isHide": false,
//               "parent": "0-8-1",
//               "pattern": null,
//               "fieldName": "sequence_number",
//               "fieldType": "STRING",
//               "isPersist": true,
//               "isEditable": false,
//               "isSensitive": false
//             },
//             {
//               "type": "field",
//               "alias": "Track 1",
//               "isHide": false,
//               "parent": "0-8-2",
//               "pattern": "(?<=\\w{4}).(?=[^.]*?\\w{4})",
//               "fieldName": "track1",
//               "fieldType": "STRING",
//               "isPersist": false,
//               "isEditable": false,
//               "isSensitive": true
//             },
//             {
//               "type": "field",
//               "alias": "Track 2",
//               "isHide": false,
//               "parent": "0-8-3",
//               "pattern": "(?<=\\w{4}).(?=[^.]*?\\w{4})",
//               "fieldName": "track2",
//               "fieldType": "STRING",
//               "isPersist": false,
//               "isEditable": false,
//               "isSensitive": true
//             },
//             {
//               "type": "field",
//               "alias": "Track 3",
//               "isHide": false,
//               "parent": "0-8-4",
//               "pattern": "(?<=\\w{4}).(?=[^.]*?\\w{4})",
//               "fieldName": "track3",
//               "fieldType": "STRING",
//               "isPersist": false,
//               "isEditable": false,
//               "isSensitive": true
//             },
//             {
//               "type": "field",
//               "alias": "Service code",
//               "isHide": false,
//               "parent": "0-8-5",
//               "pattern": null,
//               "fieldName": "service_code",
//               "fieldType": "STRING",
//               "isPersist": true,
//               "isEditable": false,
//               "isSensitive": false
//             },
//             {
//               "type": "field",
//               "alias": "Security Control Information",
//               "isHide": false,
//               "parent": "0-8-6",
//               "pattern": null,
//               "fieldName": "security_control_information",
//               "fieldType": "STRING",
//               "isPersist": true,
//               "isEditable": false,
//               "isSensitive": false
//             },
//             {
//               "type": "field",
//               "alias": "Card presence",
//               "isHide": false,
//               "parent": "0-8-7",
//               "pattern": null,
//               "fieldName": "card_presence",
//               "fieldType": "STRING",
//               "isPersist": true,
//               "isEditable": false,
//               "isSensitive": false
//             },
//             {
//               "type": "field",
//               "alias": "capture capability",
//               "isHide": false,
//               "parent": "0-8-8",
//               "pattern": null,
//               "fieldName": "capture_capability",
//               "fieldType": "STRING",
//               "isPersist": true,
//               "isEditable": false,
//               "isSensitive": false
//             },
//             {
//               "type": "field",
//               "alias": "capture method",
//               "isHide": false,
//               "parent": "0-8-9",
//               "pattern": null,
//               "fieldName": "capture_method",
//               "fieldType": "STRING",
//               "isPersist": true,
//               "isEditable": false,
//               "isSensitive": false
//             },
//             {
//               "type": "field",
//               "alias": "output capability",
//               "isHide": false,
//               "parent": "0-8-10",
//               "pattern": null,
//               "fieldName": "output_capability",
//               "fieldType": "STRING",
//               "isPersist": true,
//               "isEditable": false,
//               "isSensitive": false
//             },
//             {
//               "type": "field",
//               "alias": "Card Type",
//               "isHide": false,
//               "parent": "0-8-11",
//               "pattern": null,
//               "fieldName": "card_type",
//               "fieldType": "STRING",
//               "isPersist": true,
//               "isEditable": false,
//               "isSensitive": false
//             }
//           ],
//           "fieldsType": "SIMPLE",
//           "isEditable": false
//         },
//         {
//           "type": "field",
//           "alias": "Settlement date",
//           "isHide": false,
//           "parent": "0-9",
//           "pattern": null,
//           "fieldName": "date_settlement",
//           "fieldType": "DATE",
//           "isPersist": true,
//           "isEditable": false,
//           "isSensitive": false
//         },
//         {
//           "type": "field",
//           "alias": "Conversion date",
//           "isHide": false,
//           "parent": "0-10",
//           "pattern": null,
//           "fieldName": "date_conversion",
//           "fieldType": "DATE",
//           "isPersist": true,
//           "isEditable": false,
//           "isSensitive": false
//         },
//         {
//           "type": "field",
//           "alias": "Capture date",
//           "isHide": false,
//           "parent": "0-11",
//           "pattern": null,
//           "fieldName": "date_capture",
//           "fieldType": "DATE",
//           "isPersist": true,
//           "isEditable": false,
//           "isSensitive": false
//         },
//         {
//           "type": "field",
//           "alias": "Merchant type",
//           "isHide": false,
//           "parent": "0-12",
//           "pattern": null,
//           "fieldName": "merchant_type",
//           "fieldType": "STRING",
//           "isPersist": true,
//           "isEditable": false,
//           "isSensitive": false
//         },
//         {
//           "type": "field",
//           "alias": "Message Protocol",
//           "isHide": false,
//           "parent": "0-13",
//           "pattern": null,
//           "fieldName": "message_protocol",
//           "fieldType": "STRING",
//           "isPersist": true,
//           "isEditable": false,
//           "isSensitive": false
//         },
//         {
//           "type": "field",
//           "alias": "Acquiring institution country code",
//           "isHide": false,
//           "parent": "0-14",
//           "pattern": null,
//           "fieldName": "acquirer_country_code",
//           "fieldType": "STRING",
//           "isPersist": true,
//           "isEditable": false,
//           "isSensitive": false
//         },
//         {
//           "type": "field",
//           "alias": "PAN country code",
//           "isHide": false,
//           "parent": "0-15",
//           "pattern": null,
//           "fieldName": "account_number_country_code",
//           "fieldType": "STRING",
//           "isPersist": true,
//           "isEditable": false,
//           "isSensitive": false
//         },
//         {
//           "type": "field",
//           "alias": "Forwarding institution country code",
//           "isHide": false,
//           "parent": "0-16",
//           "pattern": null,
//           "fieldName": "forwarding_institution_country_code",
//           "fieldType": "STRING",
//           "isPersist": true,
//           "isEditable": false,
//           "isSensitive": false
//         },
//         {
//           "name": "point_of_service_entry_mode",
//           "type": "fields",
//           "parent": "0-17",
//           "attributes": [
//             {
//               "type": "field",
//               "alias": "pos type",
//               "isHide": false,
//               "parent": "0-17-0",
//               "pattern": null,
//               "fieldName": "type",
//               "fieldType": "STRING",
//               "isPersist": true,
//               "isEditable": false,
//               "isSensitive": false
//             },
//             {
//               "type": "field",
//               "alias": "pos location",
//               "isHide": false,
//               "parent": "0-17-1",
//               "pattern": null,
//               "fieldName": "location",
//               "fieldType": "STRING",
//               "isPersist": true,
//               "isEditable": false,
//               "isSensitive": false
//             },
//             {
//               "type": "field",
//               "alias": "pos device",
//               "isHide": false,
//               "parent": "0-17-2",
//               "pattern": null,
//               "fieldName": "device",
//               "fieldType": "STRING",
//               "isPersist": true,
//               "isEditable": false,
//               "isSensitive": false
//             },
//             {
//               "type": "field",
//               "alias": "pos Operator",
//               "isHide": false,
//               "parent": "0-17-3",
//               "pattern": null,
//               "fieldName": "operator",
//               "fieldType": "STRING",
//               "isPersist": true,
//               "isEditable": false,
//               "isSensitive": false
//             },
//             {
//               "type": "field",
//               "alias": "out put",
//               "isHide": false,
//               "parent": "0-17-4",
//               "pattern": null,
//               "fieldName": "output",
//               "fieldType": "STRING",
//               "isPersist": true,
//               "isEditable": false,
//               "isSensitive": false
//             },
//             {
//               "type": "field",
//               "alias": "Card reading method",
//               "isHide": false,
//               "parent": "0-17-5",
//               "pattern": null,
//               "fieldName": "card_reading_method",
//               "fieldType": "STRING",
//               "isPersist": true,
//               "isEditable": false,
//               "isSensitive": false
//             },
//             {
//               "type": "field",
//               "alias": "Cardholder verification method",
//               "isHide": false,
//               "parent": "0-17-6",
//               "pattern": null,
//               "fieldName": "card_holder_verification_method",
//               "fieldType": "STRING",
//               "isPersist": true,
//               "isEditable": false,
//               "isSensitive": false
//             },
//             {
//               "type": "field",
//               "alias": "POS environment",
//               "isHide": false,
//               "parent": "0-17-7",
//               "pattern": null,
//               "fieldName": "pos_environment",
//               "fieldType": "STRING",
//               "isPersist": true,
//               "isEditable": false,
//               "isSensitive": false
//             },
//             {
//               "type": "field",
//               "alias": "Security characteristics",
//               "isHide": false,
//               "parent": "0-17-8",
//               "pattern": null,
//               "fieldName": "security_characteristics",
//               "fieldType": "STRING",
//               "isPersist": true,
//               "isEditable": false,
//               "isSensitive": false
//             },
//             {
//               "type": "field",
//               "alias": "Pin entry mode",
//               "isHide": false,
//               "parent": "0-17-9",
//               "pattern": null,
//               "fieldName": "pin_entry_mode",
//               "fieldType": "STRING",
//               "isPersist": true,
//               "isEditable": false,
//               "isSensitive": false
//             }
//           ],
//           "fieldsType": "SIMPLE",
//           "isEditable": false
//         },
//         {
//           "name": "pos_capability",
//           "type": "fields",
//           "parent": "0-18",
//           "attributes": [
//             {
//               "type": "field",
//               "alias": "Reading capability",
//               "isHide": false,
//               "parent": "0-18-0",
//               "pattern": null,
//               "fieldName": "reading_capability",
//               "fieldType": "STRING",
//               "isPersist": true,
//               "isEditable": false,
//               "isSensitive": false
//             },
//             {
//               "type": "field",
//               "alias": "Verification capability",
//               "isHide": false,
//               "parent": "0-18-1",
//               "pattern": null,
//               "fieldName": "verification_capability",
//               "fieldType": "STRING",
//               "isPersist": true,
//               "isEditable": false,
//               "isSensitive": false
//             },
//             {
//               "type": "field",
//               "alias": "Approval code length",
//               "isHide": false,
//               "parent": "0-18-2",
//               "pattern": null,
//               "fieldName": "approval_code_length",
//               "fieldType": "STRING",
//               "isPersist": true,
//               "isEditable": false,
//               "isSensitive": false
//             },
//             {
//               "type": "field",
//               "alias": "Cardholder receipt data length",
//               "isHide": false,
//               "parent": "0-18-3",
//               "pattern": null,
//               "fieldName": "cardholder_receipt_data_length",
//               "fieldType": "STRING",
//               "isPersist": true,
//               "isEditable": false,
//               "isSensitive": false
//             },
//             {
//               "type": "field",
//               "alias": "Card acceptor receipt data length",
//               "isHide": false,
//               "parent": "0-18-4",
//               "pattern": null,
//               "fieldName": "card_acceptor_receipt_data_length",
//               "fieldType": "STRING",
//               "isPersist": true,
//               "isEditable": false,
//               "isSensitive": false
//             },
//             {
//               "type": "field",
//               "alias": "Cardholder display data length",
//               "isHide": false,
//               "parent": "0-18-5",
//               "pattern": null,
//               "fieldName": "cardholder_display_data_length",
//               "fieldType": "STRING",
//               "isPersist": true,
//               "isEditable": false,
//               "isSensitive": false
//             },
//             {
//               "type": "field",
//               "alias": "Card acceptor display data length",
//               "isHide": false,
//               "parent": "0-18-6",
//               "pattern": null,
//               "fieldName": "card_acceptor_display_data_length",
//               "fieldType": "STRING",
//               "isPersist": true,
//               "isEditable": false,
//               "isSensitive": false
//             },
//             {
//               "type": "field",
//               "alias": "ICC script data length",
//               "isHide": false,
//               "parent": "0-18-7",
//               "pattern": null,
//               "fieldName": "icc_script_data_length",
//               "fieldType": "STRING",
//               "isPersist": true,
//               "isEditable": false,
//               "isSensitive": false
//             },
//             {
//               "type": "field",
//               "alias": "Track 3 rewrite capability",
//               "isHide": false,
//               "parent": "0-18-8",
//               "pattern": null,
//               "fieldName": "track3_rewrite_capability",
//               "fieldType": "STRING",
//               "isPersist": true,
//               "isEditable": false,
//               "isSensitive": false
//             },
//             {
//               "type": "field",
//               "alias": "Card capture capability",
//               "isHide": false,
//               "parent": "0-18-9",
//               "pattern": null,
//               "fieldName": "card_capture_capability",
//               "fieldType": "STRING",
//               "isPersist": true,
//               "isEditable": false,
//               "isSensitive": false
//             },
//             {
//               "type": "field",
//               "alias": "Pin input length capability",
//               "isHide": false,
//               "parent": "0-18-10",
//               "pattern": null,
//               "fieldName": "pin_input_length_capability",
//               "fieldType": "STRING",
//               "isPersist": true,
//               "isEditable": false,
//               "isSensitive": false
//             },
//             {
//               "type": "field",
//               "alias": "Pos Condition Code",
//               "isHide": false,
//               "parent": "0-18-11",
//               "pattern": null,
//               "fieldName": "pos_condition_code",
//               "fieldType": "STRING",
//               "isPersist": true,
//               "isEditable": false,
//               "isSensitive": false
//             }
//           ],
//           "fieldsType": "SIMPLE",
//           "isEditable": false
//         },
//         {
//           "type": "field",
//           "alias": "Network international identifier",
//           "isHide": false,
//           "parent": "0-19",
//           "pattern": null,
//           "fieldName": "network_international_identifier",
//           "fieldType": "STRING",
//           "isPersist": true,
//           "isEditable": false,
//           "isSensitive": false
//         },
//         {
//           "type": "field",
//           "alias": "Acquirer institution code",
//           "isHide": false,
//           "parent": "0-20",
//           "pattern": null,
//           "fieldName": "acquirer_institution_code",
//           "fieldType": "STRING",
//           "isPersist": true,
//           "isEditable": false,
//           "isSensitive": false
//         },
//         {
//           "type": "field",
//           "alias": "Forwarding institution code",
//           "isHide": false,
//           "parent": "0-21",
//           "pattern": null,
//           "fieldName": "forwarding_institution_code",
//           "fieldType": "STRING",
//           "isPersist": true,
//           "isEditable": false,
//           "isSensitive": false
//         },
//         {
//           "type": "field",
//           "alias": "Retrieval reference number",
//           "isHide": false,
//           "parent": "0-22",
//           "pattern": null,
//           "fieldName": "rrn",
//           "fieldType": "STRING",
//           "isPersist": true,
//           "isEditable": false,
//           "isSensitive": false
//         },
//         {
//           "type": "field",
//           "alias": "Approval code",
//           "isHide": false,
//           "parent": "0-23",
//           "pattern": null,
//           "fieldName": "approval_code",
//           "fieldType": "STRING",
//           "isPersist": true,
//           "isEditable": false,
//           "isSensitive": false
//         },
//         {
//           "type": "field",
//           "alias": "Response code",
//           "isHide": false,
//           "parent": "0-24",
//           "pattern": null,
//           "fieldName": "response_code",
//           "fieldType": "STRING",
//           "isPersist": true,
//           "isEditable": false,
//           "isSensitive": false
//         },
//         {
//           "type": "field",
//           "alias": "Response description",
//           "isHide": false,
//           "parent": "0-25",
//           "pattern": null,
//           "fieldName": "response_desc",
//           "fieldType": "STRING",
//           "isPersist": true,
//           "isEditable": false,
//           "isSensitive": false
//         },
//         {
//           "type": "field",
//           "alias": "Terminal identification",
//           "isHide": false,
//           "parent": "0-26",
//           "pattern": null,
//           "fieldName": "terminal_identification",
//           "fieldType": "STRING",
//           "isPersist": true,
//           "isEditable": false,
//           "isSensitive": false
//         },
//         {
//           "type": "field",
//           "alias": "Card acceptor identification code",
//           "isHide": false,
//           "parent": "0-27",
//           "pattern": null,
//           "fieldName": "acceptor_identification_code",
//           "fieldType": "STRING",
//           "isPersist": true,
//           "isEditable": false,
//           "isSensitive": false
//         },
//         {
//           "name": "card_acceptor_name_location",
//           "type": "fields",
//           "parent": "0-28",
//           "attributes": [
//             {
//               "type": "field",
//               "alias": "Additional address",
//               "isHide": false,
//               "parent": "0-28-0",
//               "pattern": null,
//               "fieldName": "card_acceptor_address",
//               "fieldType": "STRING",
//               "isPersist": true,
//               "isEditable": false,
//               "isSensitive": false
//             },
//             {
//               "type": "field",
//               "alias": "Contact information",
//               "isHide": false,
//               "parent": "0-28-1",
//               "pattern": null,
//               "fieldName": "card_acceptor_contact_information",
//               "fieldType": "STRING",
//               "isPersist": true,
//               "isEditable": false,
//               "isSensitive": false
//             },
//             {
//               "type": "field",
//               "alias": "City",
//               "isHide": false,
//               "parent": "0-28-2",
//               "pattern": null,
//               "fieldName": "card_acceptor_city",
//               "fieldType": "STRING",
//               "isPersist": true,
//               "isEditable": false,
//               "isSensitive": false
//             },
//             {
//               "type": "field",
//               "alias": "Country",
//               "isHide": false,
//               "parent": "0-28-3",
//               "pattern": null,
//               "fieldName": "card_acceptor_country",
//               "fieldType": "STRING",
//               "isPersist": true,
//               "isEditable": false,
//               "isSensitive": false
//             },
//             {
//               "type": "field",
//               "alias": "Service phone",
//               "isHide": false,
//               "parent": "0-28-4",
//               "pattern": null,
//               "fieldName": "card_acceptor_service_phone",
//               "fieldType": "STRING",
//               "isPersist": true,
//               "isEditable": false,
//               "isSensitive": false
//             },
//             {
//               "type": "field",
//               "alias": "Email",
//               "isHide": false,
//               "parent": "0-28-5",
//               "pattern": null,
//               "fieldName": "card_acceptor_email",
//               "fieldType": "STRING",
//               "isPersist": true,
//               "isEditable": false,
//               "isSensitive": false
//             },
//             {
//               "type": "field",
//               "alias": "URL",
//               "isHide": false,
//               "parent": "0-28-6",
//               "pattern": null,
//               "fieldName": "card_acceptor_url",
//               "fieldType": "STRING",
//               "isPersist": true,
//               "isEditable": false,
//               "isSensitive": false
//             },
//             {
//               "type": "field",
//               "alias": "Name",
//               "isHide": false,
//               "parent": "0-28-7",
//               "pattern": null,
//               "fieldName": "card_acceptor_name",
//               "fieldType": "STRING",
//               "isPersist": true,
//               "isEditable": false,
//               "isSensitive": false
//             },
//             {
//               "type": "field",
//               "alias": "Phone",
//               "isHide": false,
//               "parent": "0-28-8",
//               "pattern": null,
//               "fieldName": "card_acceptor_phone",
//               "fieldType": "STRING",
//               "isPersist": true,
//               "isEditable": false,
//               "isSensitive": false
//             },
//             {
//               "type": "field",
//               "alias": "Postal code",
//               "isHide": false,
//               "parent": "0-28-9",
//               "pattern": null,
//               "fieldName": "card_acceptor_postal_code",
//               "fieldType": "STRING",
//               "isPersist": true,
//               "isEditable": false,
//               "isSensitive": false
//             },
//             {
//               "type": "field",
//               "alias": "Surcharge Indicator",
//               "isHide": false,
//               "parent": "0-28-10",
//               "pattern": null,
//               "fieldName": "surcharge_indicator",
//               "fieldType": "STRING",
//               "isPersist": true,
//               "isEditable": false,
//               "isSensitive": false
//             },
//             {
//               "type": "field",
//               "alias": "Card acceptor date",
//               "isHide": false,
//               "parent": "0-28-11",
//               "pattern": null,
//               "fieldName": "card_acceptor_state",
//               "fieldType": "STRING",
//               "isPersist": true,
//               "isEditable": false,
//               "isSensitive": false
//             }
//           ],
//           "fieldsType": "SIMPLE",
//           "isEditable": false
//         },
//         {
//           "name": "cardholder_verification_data",
//           "type": "fields",
//           "parent": "0-29",
//           "attributes": [
//             {
//               "type": "field",
//               "alias": "CVV",
//               "isHide": false,
//               "parent": "0-29-0",
//               "pattern": "(?<=\\w{2}).(?=[^.]*?\\w{2})",
//               "fieldName": "card_verification_data",
//               "fieldType": "STRING",
//               "isPersist": false,
//               "isEditable": false,
//               "isSensitive": true
//             },
//             {
//               "type": "field",
//               "alias": "Card holder billing address",
//               "isHide": false,
//               "parent": "0-29-1",
//               "pattern": "(?<=\\w{2}).(?=[^.]*?\\w{2})",
//               "fieldName": "card_holder_billing_address",
//               "fieldType": "STRING",
//               "isPersist": false,
//               "isEditable": false,
//               "isSensitive": true
//             },
//             {
//               "type": "field",
//               "alias": "Postcode",
//               "isHide": false,
//               "parent": "0-29-2",
//               "pattern": "(?<=\\w{2}).(?=[^.]*?\\w{2})",
//               "fieldName": "card_holder_billing_postcode",
//               "fieldType": "STRING",
//               "isPersist": false,
//               "isEditable": false,
//               "isSensitive": true
//             },
//             {
//               "type": "field",
//               "alias": "Street",
//               "isHide": false,
//               "parent": "0-29-3",
//               "pattern": "(?<=\\w{2}).(?=[^.]*?\\w{2})",
//               "fieldName": "card_holder_billing_street",
//               "fieldType": "STRING",
//               "isPersist": false,
//               "isEditable": false,
//               "isSensitive": true
//             },
//             {
//               "type": "field",
//               "alias": "authentication method",
//               "isHide": false,
//               "parent": "0-29-4",
//               "pattern": null,
//               "fieldName": "authentication_method",
//               "fieldType": "STRING",
//               "isPersist": true,
//               "isEditable": false,
//               "isSensitive": false
//             },
//             {
//               "type": "field",
//               "alias": "authentication entity",
//               "isHide": false,
//               "parent": "0-29-5",
//               "pattern": null,
//               "fieldName": "authentication_entity",
//               "fieldType": "STRING",
//               "isPersist": true,
//               "isEditable": false,
//               "isSensitive": false
//             },
//             {
//               "type": "field",
//               "alias": "AVS result code",
//               "isHide": false,
//               "parent": "0-29-6",
//               "pattern": null,
//               "fieldName": "avs_result_code",
//               "fieldType": "STRING",
//               "isPersist": true,
//               "isEditable": false,
//               "isSensitive": false
//             }
//           ],
//           "fieldsType": "SIMPLE",
//           "isEditable": false
//         },
//         {
//           "type": "field",
//           "alias": "Pin block",
//           "isHide": false,
//           "parent": "0-30",
//           "pattern": null,
//           "fieldName": "pin_data",
//           "fieldType": "STRING",
//           "isPersist": false,
//           "isEditable": false,
//           "isSensitive": false
//         },
//         {
//           "name": "original_data_element",
//           "type": "fields",
//           "parent": "0-31",
//           "attributes": [
//             {
//               "type": "field",
//               "alias": "Identifier",
//               "isHide": false,
//               "parent": "0-31-0",
//               "pattern": null,
//               "fieldName": "original_message_type_identifier",
//               "fieldType": "STRING",
//               "isPersist": true,
//               "isEditable": false,
//               "isSensitive": false
//             },
//             {
//               "type": "field",
//               "alias": "Stan",
//               "isHide": false,
//               "parent": "0-31-1",
//               "pattern": null,
//               "fieldName": "stan",
//               "fieldType": "INTEGER",
//               "isPersist": true,
//               "isEditable": false,
//               "isSensitive": false
//             },
//             {
//               "type": "field",
//               "alias": "Local date time",
//               "isHide": false,
//               "parent": "0-31-2",
//               "pattern": null,
//               "fieldName": "date_time_local",
//               "fieldType": "TIMEATAMP",
//               "isPersist": true,
//               "isEditable": false,
//               "isSensitive": false
//             },
//             {
//               "type": "field",
//               "alias": "Acquirer institution code",
//               "isHide": false,
//               "parent": "0-31-3",
//               "pattern": null,
//               "fieldName": "acquirer_institution_code",
//               "fieldType": "STRING",
//               "isPersist": true,
//               "isEditable": false,
//               "isSensitive": false
//             },
//             {
//               "type": "field",
//               "alias": "Retrieval reference number",
//               "isHide": false,
//               "parent": "0-31-4",
//               "pattern": null,
//               "fieldName": "rrn",
//               "fieldType": "STRING",
//               "isPersist": true,
//               "isEditable": false,
//               "isSensitive": false
//             },
//             {
//               "type": "field",
//               "alias": "txn_ipc",
//               "isHide": false,
//               "parent": "0-31-5",
//               "pattern": null,
//               "fieldName": "txn_ipc",
//               "fieldType": "STRING",
//               "isPersist": true,
//               "isEditable": false,
//               "isSensitive": false
//             },
//             {
//               "type": "field",
//               "alias": "",
//               "isHide": false,
//               "parent": "0-31-6",
//               "fieldName": "transaction_type",
//               "fieldType": "STRING",
//               "isPersist": false,
//               "isEditable": false,
//               "isSensitive": false
//             },
//             {
//               "type": "field",
//               "alias": "offlineRefund",
//               "isHide": false,
//               "parent": "0-31-7",
//               "pattern": null,
//               "fieldName": "offline_refund",
//               "fieldType": "STRING",
//               "isPersist": true,
//               "isEditable": false,
//               "isSensitive": false
//             },
//             {
//               "type": "field",
//               "alias": "Message protocol",
//               "isHide": false,
//               "parent": "0-31-8",
//               "pattern": null,
//               "fieldName": "message_protocol",
//               "fieldType": "STRING",
//               "isPersist": true,
//               "isEditable": false,
//               "isSensitive": false
//             },
//             {
//               "type": "field",
//               "alias": "parentTransactionId",
//               "isHide": false,
//               "parent": "0-31-9",
//               "pattern": null,
//               "fieldName": "parent_transaction_id",
//               "fieldType": "STRING",
//               "isPersist": true,
//               "isEditable": false,
//               "isSensitive": false
//             }
//           ],
//           "fieldsType": "SIMPLE",
//           "isEditable": false
//         },
//         {
//           "name": "icc_data",
//           "type": "fields",
//           "parent": "0-32",
//           "attributes": [
//             {
//               "type": "field",
//               "alias": "Application Cryptogram",
//               "isHide": false,
//               "parent": "0-32-0",
//               "pattern": null,
//               "fieldName": "tag_9F26",
//               "fieldType": "STRING",
//               "isPersist": true,
//               "isEditable": false,
//               "isSensitive": false
//             },
//             {
//               "type": "field",
//               "alias": "Cryptogram information data",
//               "isHide": false,
//               "parent": "0-32-1",
//               "pattern": null,
//               "fieldName": "tag_9F27",
//               "fieldType": "STRING",
//               "isPersist": true,
//               "isEditable": false,
//               "isSensitive": false
//             },
//             {
//               "type": "field",
//               "alias": "Issuer application data",
//               "isHide": false,
//               "parent": "0-32-2",
//               "pattern": null,
//               "fieldName": "tag_9F10",
//               "fieldType": "STRING",
//               "isPersist": true,
//               "isEditable": false,
//               "isSensitive": false
//             },
//             {
//               "type": "field",
//               "alias": "CVM results",
//               "isHide": false,
//               "parent": "0-32-3",
//               "pattern": null,
//               "fieldName": "tag_9F34",
//               "fieldType": "STRING",
//               "isPersist": true,
//               "isEditable": false,
//               "isSensitive": false
//             },
//             {
//               "type": "field",
//               "alias": "Terminal capabilities",
//               "isHide": false,
//               "parent": "0-32-4",
//               "pattern": null,
//               "fieldName": "tag_9F33",
//               "fieldType": "STRING",
//               "isPersist": true,
//               "isEditable": false,
//               "isSensitive": false
//             },
//             {
//               "type": "field",
//               "alias": "Unpredictable number",
//               "isHide": false,
//               "parent": "0-32-5",
//               "pattern": null,
//               "fieldName": "tag_9F37",
//               "fieldType": "STRING",
//               "isPersist": true,
//               "isEditable": false,
//               "isSensitive": false
//             },
//             {
//               "type": "field",
//               "alias": "Application transaction counter",
//               "isHide": false,
//               "parent": "0-32-6",
//               "pattern": null,
//               "fieldName": "tag_9F36",
//               "fieldType": "STRING",
//               "isPersist": true,
//               "isEditable": false,
//               "isSensitive": false
//             },
//             {
//               "type": "field",
//               "alias": "Terminal verification result method",
//               "isHide": false,
//               "parent": "0-32-7",
//               "pattern": null,
//               "fieldName": "tag_95",
//               "fieldType": "STRING",
//               "isPersist": true,
//               "isEditable": false,
//               "isSensitive": false
//             },
//             {
//               "type": "field",
//               "alias": "Transaction date",
//               "isHide": false,
//               "parent": "0-32-8",
//               "pattern": null,
//               "fieldName": "tag_9A",
//               "fieldType": "STRING",
//               "isPersist": true,
//               "isEditable": false,
//               "isSensitive": false
//             },
//             {
//               "type": "field",
//               "alias": "Transaction type Indicator",
//               "isHide": false,
//               "parent": "0-32-9",
//               "pattern": null,
//               "fieldName": "tag_9C",
//               "fieldType": "STRING",
//               "isPersist": true,
//               "isEditable": false,
//               "isSensitive": false
//             },
//             {
//               "type": "field",
//               "alias": "Amount authorized",
//               "isHide": false,
//               "parent": "0-32-10",
//               "pattern": null,
//               "fieldName": "tag_9F02",
//               "fieldType": "STRING",
//               "isPersist": true,
//               "isEditable": false,
//               "isSensitive": false
//             },
//             {
//               "type": "field",
//               "alias": "Transaction currency code",
//               "isHide": false,
//               "parent": "0-32-11",
//               "pattern": null,
//               "fieldName": "tag_5F2A",
//               "fieldType": "STRING",
//               "isPersist": true,
//               "isEditable": false,
//               "isSensitive": false
//             },
//             {
//               "type": "field",
//               "alias": "Application interchange profile",
//               "isHide": false,
//               "parent": "0-32-12",
//               "pattern": null,
//               "fieldName": "tag_82",
//               "fieldType": "STRING",
//               "isPersist": true,
//               "isEditable": false,
//               "isSensitive": false
//             },
//             {
//               "type": "field",
//               "alias": "Dedicated file name",
//               "isHide": false,
//               "parent": "0-32-13",
//               "pattern": null,
//               "fieldName": "tag_84",
//               "fieldType": "STRING",
//               "isPersist": true,
//               "isEditable": false,
//               "isSensitive": false
//             },
//             {
//               "type": "field",
//               "alias": "Terminal country code",
//               "isHide": false,
//               "parent": "0-32-14",
//               "pattern": null,
//               "fieldName": "tag_9F1A",
//               "fieldType": "STRING",
//               "isPersist": true,
//               "isEditable": false,
//               "isSensitive": false
//             },
//             {
//               "type": "field",
//               "alias": "Amount other",
//               "isHide": false,
//               "parent": "0-32-15",
//               "pattern": null,
//               "fieldName": "tag_9F03",
//               "fieldType": "STRING",
//               "isPersist": true,
//               "isEditable": false,
//               "isSensitive": false
//             },
//             {
//               "type": "field",
//               "alias": "Stan",
//               "isHide": false,
//               "parent": "0-32-16",
//               "pattern": null,
//               "fieldName": "stan",
//               "fieldType": "STRING",
//               "isPersist": true,
//               "isEditable": false,
//               "isSensitive": false
//             },
//             {
//               "type": "field",
//               "alias": "Card Holder Name",
//               "isHide": false,
//               "parent": "0-32-17",
//               "pattern": null,
//               "fieldName": "tag_5F20",
//               "fieldType": "STRING",
//               "isPersist": true,
//               "isEditable": false,
//               "isSensitive": false
//             },
//             {
//               "type": "field",
//               "alias": "Authorisation Response Code",
//               "isHide": false,
//               "parent": "0-32-18",
//               "pattern": null,
//               "fieldName": "tag_8A",
//               "fieldType": "STRING",
//               "isPersist": true,
//               "isEditable": false,
//               "isSensitive": false
//             },
//             {
//               "type": "field",
//               "alias": "CVM List",
//               "isHide": false,
//               "parent": "0-32-19",
//               "pattern": null,
//               "fieldName": "tag_8E",
//               "fieldType": "STRING",
//               "isPersist": true,
//               "isEditable": false,
//               "isSensitive": false
//             },
//             {
//               "type": "field",
//               "alias": "Interface Device Serial Number",
//               "isHide": false,
//               "parent": "0-32-20",
//               "pattern": null,
//               "fieldName": "tag_9F1E",
//               "fieldType": "STRING",
//               "isPersist": true,
//               "isEditable": false,
//               "isSensitive": false
//             },
//             {
//               "type": "field",
//               "alias": "Transaction Status Information",
//               "isHide": false,
//               "parent": "0-32-21",
//               "pattern": null,
//               "fieldName": "tag_9B",
//               "fieldType": "STRING",
//               "isPersist": true,
//               "isEditable": false,
//               "isSensitive": false
//             },
//             {
//               "type": "field",
//               "alias": "Application Identifier",
//               "isHide": false,
//               "parent": "0-32-22",
//               "pattern": null,
//               "fieldName": "tag_9F06",
//               "fieldType": "STRING",
//               "isPersist": true,
//               "isEditable": false,
//               "isSensitive": false
//             },
//             {
//               "type": "field",
//               "alias": "Application Usage Control",
//               "isHide": false,
//               "parent": "0-32-23",
//               "pattern": null,
//               "fieldName": "tag_9F07",
//               "fieldType": "STRING",
//               "isPersist": true,
//               "isEditable": false,
//               "isSensitive": false
//             },
//             {
//               "type": "field",
//               "alias": "Terminal Type",
//               "isHide": false,
//               "parent": "0-32-24",
//               "pattern": null,
//               "fieldName": "tag_9F35",
//               "fieldType": "STRING",
//               "isPersist": true,
//               "isEditable": false,
//               "isSensitive": false
//             },
//             {
//               "type": "field",
//               "alias": "Issuer Scripts Results",
//               "isHide": false,
//               "parent": "0-32-25",
//               "pattern": null,
//               "fieldName": "tag_9F5B",
//               "fieldType": "STRING",
//               "isPersist": true,
//               "isEditable": false,
//               "isSensitive": false
//             },
//             {
//               "type": "field",
//               "alias": "Issuer Action Code Online",
//               "isHide": false,
//               "parent": "0-32-26",
//               "pattern": null,
//               "fieldName": "tag_9F0F",
//               "fieldType": "STRING",
//               "isPersist": true,
//               "isEditable": false,
//               "isSensitive": false
//             },
//             {
//               "type": "field",
//               "alias": "Application Label",
//               "isHide": false,
//               "parent": "0-32-27",
//               "pattern": null,
//               "fieldName": "tag_50",
//               "fieldType": "STRING",
//               "isPersist": true,
//               "isEditable": false,
//               "isSensitive": false
//             },
//             {
//               "type": "field",
//               "alias": "EMV Transaction Certificate",
//               "isHide": false,
//               "parent": "0-32-28",
//               "pattern": null,
//               "fieldName": "tag_98",
//               "fieldType": "STRING",
//               "isPersist": true,
//               "isEditable": false,
//               "isSensitive": false
//             },
//             {
//               "type": "field",
//               "alias": "Terminal Application Version",
//               "isHide": false,
//               "parent": "0-32-29",
//               "pattern": null,
//               "fieldName": "tag_9F08",
//               "fieldType": "STRING",
//               "isPersist": true,
//               "isEditable": false,
//               "isSensitive": false
//             },
//             {
//               "type": "field",
//               "alias": "Card Authentication Results Code",
//               "isHide": false,
//               "parent": "0-32-30",
//               "pattern": null,
//               "fieldName": "tag_9F69",
//               "fieldType": "STRING",
//               "isPersist": true,
//               "isEditable": false,
//               "isSensitive": false
//             },
//             {
//               "type": "field",
//               "alias": "Terminal Verification Results",
//               "isHide": false,
//               "parent": "0-32-31",
//               "pattern": null,
//               "fieldName": "tag_95",
//               "fieldType": "STRING",
//               "isPersist": true,
//               "isEditable": false,
//               "isSensitive": false
//             },
//             {
//               "type": "field",
//               "alias": "Issuer Authentication Data",
//               "isHide": false,
//               "parent": "0-32-32",
//               "pattern": null,
//               "fieldName": "tag_91",
//               "fieldType": "STRING",
//               "isPersist": true,
//               "isEditable": false,
//               "isSensitive": false
//             },
//             {
//               "type": "field",
//               "alias": "Issuer Script Template 1",
//               "isHide": false,
//               "parent": "0-32-33",
//               "pattern": null,
//               "fieldName": "tag_71",
//               "fieldType": "STRING",
//               "isPersist": true,
//               "isEditable": false,
//               "isSensitive": false
//             },
//             {
//               "type": "field",
//               "alias": "Issuer Script Template 2",
//               "isHide": false,
//               "parent": "0-32-34",
//               "pattern": null,
//               "fieldName": "tag_72",
//               "fieldType": "STRING",
//               "isPersist": true,
//               "isEditable": false,
//               "isSensitive": false
//             }
//           ],
//           "fieldsType": "SIMPLE",
//           "isEditable": false
//         },
//         {
//           "type": "field",
//           "alias": "Authorizing agent institution id",
//           "isHide": false,
//           "parent": "0-33",
//           "pattern": null,
//           "fieldName": "authorizing_agent_institution_id",
//           "fieldType": "STRING",
//           "isPersist": true,
//           "isEditable": false,
//           "isSensitive": false
//         },
//         {
//           "type": "field",
//           "alias": "Cardholder presence",
//           "isHide": false,
//           "parent": "0-34",
//           "pattern": null,
//           "fieldName": "cardholder_presence",
//           "fieldType": "STRING",
//           "isPersist": true,
//           "isEditable": false,
//           "isSensitive": false
//         },
//         {
//           "type": "field",
//           "alias": "Receiving institution identification code",
//           "isHide": false,
//           "parent": "0-35",
//           "pattern": null,
//           "fieldName": "receiving_institution_identification_code",
//           "fieldType": "STRING",
//           "isPersist": true,
//           "isEditable": false,
//           "isSensitive": false
//         },
//         {
//           "type": "field",
//           "alias": "Merchant id",
//           "isHide": false,
//           "parent": "0-36",
//           "pattern": null,
//           "fieldName": "merchant_identification",
//           "fieldType": "STRING",
//           "isPersist": true,
//           "isEditable": false,
//           "isSensitive": false
//         },
//         {
//           "type": "field",
//           "alias": "Device Code",
//           "isHide": false,
//           "parent": "0-37",
//           "pattern": null,
//           "fieldName": "device_code",
//           "fieldType": "STRING",
//           "isPersist": true,
//           "isEditable": false,
//           "isSensitive": false
//         },
//         {
//           "type": "field",
//           "alias": "Merchant Velocity",
//           "isHide": false,
//           "parent": "0-38",
//           "pattern": null,
//           "fieldName": "merchant_velocity",
//           "fieldType": "STRING",
//           "isPersist": true,
//           "isEditable": false,
//           "isSensitive": false
//         },
//         {
//           "type": "field",
//           "alias": "Mac Address",
//           "isHide": false,
//           "parent": "0-39",
//           "pattern": null,
//           "fieldName": "mac_address",
//           "fieldType": "STRING",
//           "isPersist": true,
//           "isEditable": false,
//           "isSensitive": false
//         },
//         {
//           "type": "field",
//           "alias": "Epp Serial Number",
//           "isHide": false,
//           "parent": "0-40",
//           "pattern": null,
//           "fieldName": "epp_serial_number",
//           "fieldType": "STRING",
//           "isPersist": true,
//           "isEditable": false,
//           "isSensitive": false
//         },
//         {
//           "type": "field",
//           "alias": "Echo Data",
//           "isHide": false,
//           "parent": "0-41",
//           "pattern": null,
//           "fieldName": "echo_data",
//           "fieldType": "STRING",
//           "isPersist": true,
//           "isEditable": false,
//           "isSensitive": false
//         },
//         {
//           "type": "field",
//           "alias": "Repeat Count",
//           "isHide": false,
//           "parent": "0-42",
//           "pattern": null,
//           "fieldName": "repeat_count",
//           "fieldType": "STRING",
//           "isPersist": true,
//           "isEditable": false,
//           "isSensitive": false
//         },
//         {
//           "type": "field",
//           "alias": "Advice Type",
//           "isHide": false,
//           "parent": "0-43",
//           "pattern": null,
//           "fieldName": "advice_type",
//           "fieldType": "STRING",
//           "isPersist": true,
//           "isEditable": false,
//           "isSensitive": false
//         },
//         {
//           "type": "field",
//           "alias": "Ksn ID",
//           "isHide": false,
//           "parent": "0-44",
//           "pattern": null,
//           "fieldName": "pin_ksn",
//           "fieldType": "STRING",
//           "isPersist": true,
//           "isEditable": false,
//           "isSensitive": false
//         },
//         {
//           "type": "field",
//           "alias": "Replace merchant",
//           "isHide": false,
//           "parent": "0-45",
//           "pattern": null,
//           "fieldName": "replace_merchant",
//           "fieldType": "STRING",
//           "isPersist": true,
//           "isEditable": false,
//           "isSensitive": false
//         },
//         {
//           "type": "field",
//           "alias": "Replace terminal",
//           "isHide": false,
//           "parent": "0-46",
//           "pattern": null,
//           "fieldName": "replace_terminal",
//           "fieldType": "STRING",
//           "isPersist": true,
//           "isEditable": false,
//           "isSensitive": false
//         },
//         {
//           "type": "field",
//           "alias": "OTBData",
//           "isHide": false,
//           "parent": "0-47",
//           "pattern": null,
//           "fieldName": "otb_data",
//           "fieldType": "STRING",
//           "isPersist": true,
//           "isEditable": false,
//           "isSensitive": false
//         },
//         {
//           "type": "field",
//           "alias": "offlineRefund",
//           "isHide": false,
//           "parent": "0-48",
//           "pattern": null,
//           "fieldName": "offline_refund",
//           "fieldType": "STRING",
//           "isPersist": true,
//           "isEditable": false,
//           "isSensitive": false
//         },
//         {
//           "name": "message_type_identifier",
//           "type": "fields",
//           "parent": "0-49",
//           "attributes": [
//             {
//               "type": "field",
//               "alias": "Type",
//               "isHide": false,
//               "parent": "0-49-0",
//               "pattern": null,
//               "fieldName": "type",
//               "fieldType": "STRING",
//               "isPersist": true,
//               "isEditable": false,
//               "isSensitive": false
//             }
//           ],
//           "fieldsType": "SIMPLE",
//           "isEditable": false
//         },
//         {
//           "name": "fallback_reason",
//           "type": "field",
//           "alias": "Fallback Reason",
//           "level": 1,
//           "isHide": false,
//           "parent": "0-50",
//           "pattern": null,
//           "inputKey": "",
//           "fieldName": "fallback_reason",
//           "fieldType": "STRING",
//           "isPersist": true,
//           "isEditable": true,
//           "isSensitive": false
//         },
//         {
//           "type": "field",
//           "alias": "Fallback Code",
//           "isHide": false,
//           "parent": "0-51",
//           "pattern": null,
//           "fieldName": "fallback_code",
//           "fieldType": "STRING",
//           "isPersist": true,
//           "isEditable": true,
//           "isSensitive": false
//         },
//         {
//           "name": "TID",
//           "type": "field",
//           "alias": "TID",
//           "level": 1,
//           "isHide": false,
//           "parent": "0-52",
//           "pattern": null,
//           "inputKey": "",
//           "fieldName": "TID",
//           "fieldType": "STRING",
//           "isPersist": true,
//           "isEditable": true,
//           "isSensitive": false
//         },
//         {
//           "name": "three_d_secure",
//           "type": "fields",
//           "parent": "0-53",
//           "attributes": [
//             {
//               "type": "field",
//               "alias": "Authentication Status",
//               "isHide": false,
//               "parent": "0-53-0",
//               "pattern": null,
//               "fieldName": "authentication_status",
//               "fieldType": "STRING",
//               "isPersist": true,
//               "isEditable": false,
//               "isSensitive": false
//             },
//             {
//               "type": "field",
//               "alias": "Authentication Type",
//               "isHide": false,
//               "parent": "0-53-1",
//               "pattern": null,
//               "fieldName": "authentication_type",
//               "fieldType": "STRING",
//               "isPersist": true,
//               "isEditable": false,
//               "isSensitive": false
//             },
//             {
//               "type": "field",
//               "alias": "Authentication Value",
//               "isHide": false,
//               "parent": "0-53-2",
//               "pattern": null,
//               "fieldName": "authentication_value",
//               "fieldType": "STRING",
//               "isPersist": true,
//               "isEditable": false,
//               "isSensitive": false
//             },
//             {
//               "type": "field",
//               "alias": "Authentication Value Algorithm",
//               "isHide": false,
//               "parent": "0-53-3",
//               "pattern": null,
//               "fieldName": "authentication_value_algorithm",
//               "fieldType": "STRING",
//               "isPersist": true,
//               "isEditable": false,
//               "isSensitive": false
//             },
//             {
//               "type": "field",
//               "alias": "Enrollment Status",
//               "isHide": false,
//               "parent": "0-53-4",
//               "pattern": null,
//               "fieldName": "enrollment_status",
//               "fieldType": "STRING",
//               "isPersist": true,
//               "isEditable": false,
//               "isSensitive": false
//             },
//             {
//               "type": "field",
//               "alias": "Ds Transaction ID",
//               "isHide": false,
//               "parent": "0-53-5",
//               "pattern": null,
//               "fieldName": "ds_transaction_id",
//               "fieldType": "STRING",
//               "isPersist": true,
//               "isEditable": false,
//               "isSensitive": false
//             },
//             {
//               "type": "field",
//               "alias": "Signature Verification",
//               "isHide": false,
//               "parent": "0-53-6",
//               "pattern": null,
//               "fieldName": "signature_verification",
//               "fieldType": "STRING",
//               "isPersist": true,
//               "isEditable": false,
//               "isSensitive": false
//             },
//             {
//               "type": "field",
//               "alias": "Eci",
//               "isHide": false,
//               "parent": "0-53-7",
//               "pattern": null,
//               "fieldName": "eci",
//               "fieldType": "STRING",
//               "isPersist": true,
//               "isEditable": false,
//               "isSensitive": false
//             },
//             {
//               "type": "field",
//               "alias": "Xid",
//               "isHide": false,
//               "parent": "0-53-8",
//               "pattern": null,
//               "fieldName": "xid",
//               "fieldType": "STRING",
//               "isPersist": true,
//               "isEditable": false,
//               "isSensitive": false
//             },
//             {
//               "type": "field",
//               "alias": "Verification",
//               "isHide": false,
//               "parent": "0-53-9",
//               "pattern": null,
//               "fieldName": "verification",
//               "fieldType": "LIST",
//               "isPersist": true,
//               "isEditable": false,
//               "isSensitive": false
//             },
//             {
//               "type": "field",
//               "alias": "Version",
//               "isHide": false,
//               "parent": "0-53-10",
//               "pattern": null,
//               "fieldName": "version",
//               "fieldType": "STRING",
//               "isPersist": true,
//               "isEditable": false,
//               "isSensitive": false
//             },
//             {
//               "type": "field",
//               "alias": "Error Desc",
//               "isHide": false,
//               "parent": "0-53-11",
//               "pattern": null,
//               "fieldName": "error_desc",
//               "fieldType": "STRING",
//               "isPersist": true,
//               "isEditable": false,
//               "isSensitive": false
//             },
//             {
//               "type": "field",
//               "alias": "Error No",
//               "isHide": false,
//               "parent": "0-53-12",
//               "pattern": null,
//               "fieldName": "error_no",
//               "fieldType": "STRING",
//               "isPersist": true,
//               "isEditable": false,
//               "isSensitive": false
//             },
//             {
//               "name": "additional_data",
//               "type": "fields",
//               "parent": "0-53-13",
//               "attributes": [
//                 {
//                   "type": "field",
//                   "alias": "Total Items",
//                   "isHide": false,
//                   "parent": "0-53-13-0",
//                   "pattern": null,
//                   "fieldName": "total_items",
//                   "fieldType": "INTEGER",
//                   "isPersist": true,
//                   "isEditable": false,
//                   "isSensitive": false
//                 },
//                 {
//                   "type": "field",
//                   "alias": "Device Channel",
//                   "isHide": false,
//                   "parent": "0-53-13-1",
//                   "pattern": null,
//                   "fieldName": "device_channel",
//                   "fieldType": "STRING",
//                   "isPersist": true,
//                   "isEditable": false,
//                   "isSensitive": false
//                 },
//                 {
//                   "type": "field",
//                   "alias": "Status Reason",
//                   "isHide": false,
//                   "parent": "0-53-13-2",
//                   "pattern": null,
//                   "fieldName": "status_reason",
//                   "fieldType": "INTEGER",
//                   "isPersist": true,
//                   "isEditable": false,
//                   "isSensitive": false
//                 },
//                 {
//                   "type": "field",
//                   "alias": "Challenge Indicator",
//                   "isHide": false,
//                   "parent": "0-53-13-3",
//                   "pattern": null,
//                   "fieldName": "challenge_indicator",
//                   "fieldType": "STRING",
//                   "isPersist": true,
//                   "isEditable": false,
//                   "isSensitive": false
//                 },
//                 {
//                   "type": "field",
//                   "alias": "Cancel Challenge",
//                   "isHide": false,
//                   "parent": "0-53-13-4",
//                   "pattern": null,
//                   "fieldName": "cancel_challenge",
//                   "fieldType": "STRING",
//                   "isPersist": true,
//                   "isEditable": false,
//                   "isSensitive": false
//                 },
//                 {
//                   "type": "field",
//                   "alias": "Acs Url",
//                   "isHide": false,
//                   "parent": "0-53-13-5",
//                   "pattern": null,
//                   "fieldName": "acs_url",
//                   "fieldType": "STRING",
//                   "isPersist": true,
//                   "isEditable": false,
//                   "isSensitive": false
//                 },
//                 {
//                   "type": "field",
//                   "alias": "Acs Operator ID",
//                   "isHide": false,
//                   "parent": "0-53-13-6",
//                   "pattern": null,
//                   "fieldName": "acs_operator_id",
//                   "fieldType": "STRING",
//                   "isPersist": true,
//                   "isEditable": false,
//                   "isSensitive": false
//                 },
//                 {
//                   "type": "field",
//                   "alias": "Network Score",
//                   "isHide": false,
//                   "parent": "0-53-13-7",
//                   "pattern": null,
//                   "fieldName": "network_score",
//                   "fieldType": "STRING",
//                   "isPersist": true,
//                   "isEditable": false,
//                   "isSensitive": false
//                 },
//                 {
//                   "type": "field",
//                   "alias": "Reason Code",
//                   "isHide": false,
//                   "parent": "0-53-13-8",
//                   "pattern": null,
//                   "fieldName": "reason_code",
//                   "fieldType": "STRING",
//                   "isPersist": true,
//                   "isEditable": false,
//                   "isSensitive": false
//                 },
//                 {
//                   "type": "field",
//                   "alias": "Reason Desc",
//                   "isHide": false,
//                   "parent": "0-53-13-9",
//                   "pattern": null,
//                   "fieldName": "reason_desc",
//                   "fieldType": "STRING",
//                   "isPersist": true,
//                   "isEditable": false,
//                   "isSensitive": false
//                 }
//               ],
//               "fieldsType": "SIMPLE",
//               "isEditable": null
//             }
//           ],
//           "fieldsType": "SIMPLE",
//           "isEditable": null
//         },
//         {
//           "name": "cvvecom_result_code",
//           "type": "field",
//           "alias": "CVV2 Result Code",
//           "isHide": false,
//           "parent": "0-54",
//           "pattern": null,
//           "inputKey": "",
//           "fieldName": "cvvecom_result_code",
//           "fieldType": "STRING",
//           "isPersist": true,
//           "isEditable": true,
//           "isSensitive": false
//         },
//         {
//           "name": "response_reason_code",
//           "type": "field",
//           "alias": "Response Source/Reason Code",
//           "isHide": false,
//           "parent": "0-55",
//           "pattern": null,
//           "inputKey": "",
//           "fieldName": "response_reason_code",
//           "fieldType": "CHAR",
//           "isPersist": true,
//           "isEditable": true,
//           "isSensitive": false
//         },
//         {
//           "type": "field",
//           "alias": "Cavv Result",
//           "isHide": false,
//           "parent": "0-56",
//           "pattern": null,
//           "fieldName": "cavv_result",
//           "fieldType": "STRING",
//           "isPersist": true,
//           "isEditable": false,
//           "isSensitive": false
//         },
//         {
//           "type": "field",
//           "alias": "additional_response_code",
//           "isHide": false,
//           "parent": "0-57",
//           "pattern": null,
//           "fieldName": "additional_response_code",
//           "fieldType": "STRING",
//           "isPersist": true,
//           "isEditable": false,
//           "isSensitive": false
//         },
//         {
//           "type": "field",
//           "alias": "last_four_digit_pan",
//           "isHide": false,
//           "parent": "0-58",
//           "pattern": null,
//           "fieldName": "last_four_digit_pan",
//           "fieldType": "STRING",
//           "isPersist": true,
//           "isEditable": false,
//           "isSensitive": false
//         },
//         {
//           "name": "tvc_result_code",
//           "type": "field",
//           "alias": "TVC Result code",
//           "isHide": false,
//           "parent": "0-59",
//           "pattern": null,
//           "inputKey": "",
//           "fieldName": "tvc_result_code",
//           "fieldType": "CHAR",
//           "isPersist": true,
//           "isEditable": true,
//           "isSensitive": false
//         },
//         {
//           "name": "card_product_type",
//           "type": "field",
//           "alias": "Card Product Type",
//           "isHide": false,
//           "parent": "0-60",
//           "pattern": null,
//           "inputKey": "",
//           "fieldName": "card_product_type",
//           "fieldType": "CHAR",
//           "isPersist": true,
//           "isEditable": true,
//           "isSensitive": false
//         },
//         {
//           "type": "field",
//           "alias": "Cvv Result Code",
//           "isHide": false,
//           "parent": "0-61",
//           "pattern": null,
//           "fieldName": "cvv_result_code",
//           "fieldType": "STRING",
//           "isPersist": true,
//           "isEditable": false,
//           "isSensitive": false
//         },
//         {
//           "name": "pacm_diversion_reasoncode",
//           "type": "field",
//           "alias": "PACM Diversion Reasoncode",
//           "isHide": false,
//           "parent": "0-62",
//           "pattern": null,
//           "inputKey": "",
//           "fieldName": "pacm_diversion_reasoncode",
//           "fieldType": "CHAR",
//           "isPersist": true,
//           "isEditable": true,
//           "isSensitive": false
//         },
//         {
//           "name": "pacm_diversion_level",
//           "type": "field",
//           "alias": "PACM Diversion Level",
//           "level": 1,
//           "isHide": false,
//           "parent": "0-63",
//           "pattern": null,
//           "inputKey": "",
//           "fieldName": "pacm_diversion_level",
//           "fieldType": "STRING",
//           "isPersist": true,
//           "isEditable": true,
//           "isSensitive": false
//         },
//         {
//           "name": "card_authentication_result_code",
//           "type": "field",
//           "alias": "Card Authentication Result Code",
//           "isHide": false,
//           "parent": "0-64",
//           "pattern": null,
//           "inputKey": "",
//           "fieldName": "card_authentication_result_code",
//           "fieldType": "CHAR",
//           "isPersist": true,
//           "isEditable": true,
//           "isSensitive": false
//         },
//         {
//           "name": "account_funding_source",
//           "type": "field",
//           "alias": "Account Funding Source",
//           "isHide": false,
//           "parent": "0-65",
//           "pattern": null,
//           "inputKey": "",
//           "fieldName": "account_funding_source",
//           "fieldType": "STRING",
//           "isPersist": true,
//           "isEditable": true,
//           "isSensitive": false
//         },
//         {
//           "name": "authorization_data_indicator",
//           "type": "field",
//           "alias": "Authorization Data Indicator",
//           "isHide": false,
//           "parent": "0-66",
//           "pattern": null,
//           "inputKey": "",
//           "fieldName": "authorization_data_indicator",
//           "fieldType": "STRING",
//           "isPersist": true,
//           "isEditable": true,
//           "isSensitive": false
//         },
//         {
//           "name": "product_id",
//           "type": "field",
//           "alias": "Product Id",
//           "isHide": false,
//           "parent": "0-67",
//           "pattern": null,
//           "fieldType": "STRING",
//           "isPersist": true,
//           "isEditable": true,
//           "isSensitive": false
//         },
//         {
//           "name": "program_identifier",
//           "type": "field",
//           "alias": "Program Identifier",
//           "isHide": false,
//           "parent": "0-68",
//           "pattern": null,
//           "inputKey": "",
//           "fieldName": "program_identifier",
//           "fieldType": "STRING",
//           "isPersist": true,
//           "isEditable": true,
//           "isSensitive": false
//         },
//         {
//           "name": "fee_program_indicator",
//           "type": "field",
//           "alias": "Fee Program Indicator",
//           "isHide": false,
//           "parent": "0-69",
//           "pattern": null,
//           "inputKey": "",
//           "fieldName": "fee_program_indicator",
//           "fieldType": "STRING",
//           "isPersist": true,
//           "isEditable": true,
//           "isSensitive": false
//         },
//         {
//           "type": "field",
//           "alias": "Partial_Reversal",
//           "isHide": false,
//           "parent": "0-70",
//           "pattern": null,
//           "fieldName": "partial_reversal",
//           "fieldType": "BOOLEAN",
//           "isPersist": true,
//           "isEditable": true,
//           "isSensitive": false
//         },
//         {
//           "type": "field",
//           "alias": "Contactless Single Tap Support",
//           "isHide": false,
//           "parent": "0-71",
//           "pattern": null,
//           "fieldName": "contactless_single_tap_support",
//           "fieldType": "STRING",
//           "isPersist": true,
//           "isEditable": false,
//           "isSensitive": false
//         },
//         {
//           "type": "field",
//           "alias": "Sca Exempt Reason",
//           "isHide": false,
//           "parent": "0-72",
//           "pattern": null,
//           "fieldName": "sca_exempt_reason",
//           "fieldType": "STRING",
//           "isPersist": true,
//           "isEditable": true,
//           "isSensitive": false
//         },
//         {
//           "type": "field",
//           "alias": "Token Cryptogram",
//           "isHide": false,
//           "parent": "0-73",
//           "pattern": null,
//           "fieldName": "token_Cryptogram",
//           "fieldType": "STRING",
//           "isPersist": true,
//           "isEditable": false,
//           "isSensitive": false
//         },
//         {
//           "type": "field",
//           "alias": "Partial Auth Indicator",
//           "isHide": false,
//           "parent": "0-74",
//           "pattern": null,
//           "fieldName": "partial_auth_indicator",
//           "fieldType": "BOOLEAN",
//           "isPersist": true,
//           "isEditable": true,
//           "isSensitive": false
//         },
//         {
//           "type": "field",
//           "alias": "Merchant Present",
//           "isHide": false,
//           "parent": "0-75",
//           "pattern": null,
//           "fieldName": "merchant_present",
//           "fieldType": "STRING",
//           "isPersist": true,
//           "isEditable": false,
//           "isSensitive": false
//         },
//         {
//           "type": "field",
//           "alias": "Cat Level",
//           "isHide": false,
//           "parent": "0-76",
//           "pattern": null,
//           "fieldName": "cat_level",
//           "fieldType": "STRING",
//           "isPersist": true,
//           "isEditable": false,
//           "isSensitive": false
//         },
//         {
//           "type": "field",
//           "alias": "Card Brand",
//           "isHide": false,
//           "parent": "0-77",
//           "pattern": null,
//           "fieldName": "card_brand",
//           "fieldType": "STRING",
//           "isPersist": true,
//           "isEditable": false,
//           "isSensitive": false
//         },
//         {
//           "type": "field",
//           "alias": "Pan Mapping Info",
//           "isHide": false,
//           "parent": "0-78",
//           "pattern": null,
//           "fieldName": "pan_mapping_info",
//           "fieldType": "STRING",
//           "isPersist": true,
//           "isEditable": false,
//           "isSensitive": false
//         },
//         {
//           "type": "field",
//           "alias": "Transaction Integrity Class",
//           "isHide": false,
//           "parent": "0-79",
//           "pattern": null,
//           "fieldName": "transaction_integrity_class",
//           "fieldType": "STRING",
//           "isPersist": true,
//           "isEditable": false,
//           "isSensitive": false
//         },
//         {
//           "name": "pin_service_code",
//           "type": "field",
//           "alias": "PIN service Code",
//           "isHide": false,
//           "parent": "0-80",
//           "pattern": null,
//           "inputKey": "",
//           "fieldName": "pin_service_code",
//           "fieldType": "STRING",
//           "isPersist": true,
//           "isEditable": true,
//           "isSensitive": false
//         },
//         {
//           type: "field",
//           alias: "Authorisation Source",
//           isHide: false,
//           parent: "0-81",
//           pattern: null,
//           fieldName: "authorisation_source",
//           fieldType: "STRING",
//           isPersist: true,
//           isEditable: false,
//           isSensitive: false
//         }
//       ]},
//       index: 0,
//       name: 'IMF Structure 86',
//       version: 86,
//     };
//     component.viewClick(keyData);
//     expect(component).toBeTruthy;
//   });
it('click delete button should call data dete in html list json ', () => {
    component.delete();
    expect(component.closeDelete).toBeTruthy;
  });
  it('click delete button should call data dete in html list json ', () => {
    const row={};
    component.deleteRow(row);
    expect(component).toBeTruthy;
  });
  it('click button should call in html list ', () => {
    component.openDelete();
    expect(component.deleteVisible).toEqual(true);
  });
  it('click close button should call close modal ', () => {
    component.close();
    expect(component.visibleAnimate).toEqual(false);
  });
  it('function should call copy clipboard in list', () => {
    const item="";
    component.copyToClipboard(item);
    expect(component.copied).toEqual(true);
  });
  it('get IMF data function should call open event', () => {
    component.getImfData(event);
    expect(component.currentItem).toBeTruthy;
  });
});
