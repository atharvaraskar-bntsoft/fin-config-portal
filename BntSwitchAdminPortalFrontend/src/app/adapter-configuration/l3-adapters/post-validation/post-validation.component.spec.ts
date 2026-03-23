import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { AlertService } from '@app/services/alert.service';
import { IAppState } from '@app/store/state/app.state';
import { MemoizedSelector } from '@ngrx/store/src/selector';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { MissingTranslationHandler, TranslateLoader, TranslateModule, TranslateService } from '@ngx-translate/core';
import { NzModalService } from 'ng-zorro-antd/modal';
import { EventEmitter } from '@angular/core';
import { of } from 'rxjs';
import { PostValidationComponent } from './post-validation.component';
import { selectViewSettingsList } from '@app/store/selectors/view-settings.selector';
import { Store, StoreModule } from '@ngrx/store';
import { NgSelectModule } from '@ng-select/ng-select';
import { RouterTestingModule } from '@angular/router/testing';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { FormsModule } from '@angular/forms';
import { AlertModule } from 'bnt';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { SnotifyService, ToastDefaults } from 'ng-snotify';
import { HttpLoaderFactory, MyMissingTranslationHandler, SharedModule } from '@app/shared/shared.module';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { selectVersionData } from '@app/store/selectors/l1-adapter.selectors';
class translateServiceMock {
  public onLangChange: EventEmitter<any> = new EventEmitter();
  public onTranslationChange: EventEmitter<any> = new EventEmitter();
  public onDefaultLangChange: EventEmitter<any> = new EventEmitter();

  public get(key: any): any {
    return of(key);
  }
}
const selectViewSettingsListJSON = {
  status: 'success',
  message: 'Find all Setting',
  data: {
    pagination: ['20', '25', '30', '40', '50'],
    language: ['en_EN', 'en_EN1', 'fr_FR', 'en_INV'],
    settingDto: {
      id: 1,
      systemUserId:
        'SystemUser [firstName=Bnt, lastName=Admin, email=bnt.admin@bnt.com, systemUserCategory=, password=9AHRz1ElALzTEdFKIKywyzEZh0IcZ/INhbGkbc0Qb84=, passwordLastUpdatedOn=2020-07-02 13:09:08.0, locked=0, deleted=0, lockedReason=null]',
      search: 'contain',
      language: 'en_EN1',
      pagination: '20',
    },
    searchOption: ['contain', 'contain2'],
  },
};
const data = [{ "request": { "type": "adapter_request", "mappings": [{ "ipc": "DECLINED_OAR", "type": "custom_mapper", "className": "test" }], "postActions": [] }, "response": { "type": "adapter_response", "mappings": [{ "ipc": "ACCOUNT LISTING", "type": "field", "source": "${synthetic}", "fieldId": "2", "useCase": "1", "destination": ["${message_exchange[GATEWAY_SERVICE].native_response_message[2]}"], "selectedOption": "copyField", "selectedCondition": "Optional", "validationFunctions": [] }, { "ipc": "SCRIPT_ERROR", "type": "groovy_executor", "script": "test", "source": "${3}", "selectedFormat": 4, "selectedOption": "script", "selectedCondition": "Optional" }, { "ipc": "DECLINED_OAR", "type": "custom_mapper", "className": "test" }], "preActions": [] }, "condition": { "id": "0", "type": "starts_with", "value": "89", "fieldName": "${5}" }, "messageIntentifier": "test", "contractIntentifier": null }];
const l1AdapterByIdJson = { masterData: { adapterDto: { "id": 253, "type": "L1", standardMessageSpecification: { "id": 4, messageStandard: { "id": 45, "value": "ISO8583-v1993 (BINARY)", "description": null, "modifiable": "0", "active": "1", "lookupType": { "id": 4, "name": "Message_Standard", "description": "Message Standard", "modifiable": "0" } }, "messageProtocol": { "id": 24, "value": "ISO-8583", "description": "ISO 8583", "modifiable": "0", "active": null, "lookupType": { "id": 5, "name": "Message_Protocol", "description": "Message Protocol", "modifiable": "0" } }, "transmissionProtocol": { "id": 28, "value": "TCP", "description": "TCP", "modifiable": "0", "active": null, "lookupType": { "id": 6, "name": "Transmission_Protocol", "description": "Transmission Protocol", "modifiable": "0" } } }, "name": "tytyt", "adapterId": "tytyt", "active": "1", "guid": null }, "tabIndex": 0 }, "schemaData": { "persistRequired": 1, "schema": "{\"template\":{\"field\":[{\"pad\":\"false\",\"length\":\"4\",\"name\":\"Message Type Indicator\",\"id\":\"0\",\"class\":\"org.jpos.iso.IFB_NUMERIC\"},{\"length\":\"16\",\"name\":\"Bitmap\",\"id\":\"1\",\"class\":\"org.jpos.iso.IFB_BITMAP\"},{\"pad\":\"false\",\"length\":\"19\",\"name\":\"Primary Account number\",\"id\":\"2\",\"class\":\"org.jpos.iso.IFB_LLNUM\"},{\"length\":\"84\",\"name\":\"Credits, Fee amounts\",\"id\":\"109\",\"class\":\"org.jpos.iso.IFB_LLCHAR\"},{\"length\":\"84\",\"name\":\"Debits, Fee amounts\",\"id\":\"110\",\"class\":\"org.jpos.iso.IFB_LLCHAR\"},{\"length\":\"999\",\"name\":\"Reserved for ISO use\",\"id\":\"111\",\"class\":\"org.jpos.iso.IFB_LLLCHAR\"},{\"length\":\"999\",\"name\":\"Reserved for ISO use\",\"id\":\"112\",\"class\":\"org.jpos.iso.IFB_LLLCHAR\"},{\"length\":\"999\",\"name\":\"Reserved for ISO use\",\"id\":\"113\",\"class\":\"org.jpos.iso.IFB_LLLCHAR\"},{\"length\":\"999\",\"name\":\"Reserved for ISO use\",\"id\":\"114\",\"class\":\"org.jpos.iso.IFB_LLLCHAR\"},{\"length\":\"999\",\"name\":\"Reserved for ISO use\",\"id\":\"115\",\"class\":\"org.jpos.iso.IFB_LLLCHAR\"},{\"length\":\"999\",\"name\":\"Reserved for national use\",\"id\":\"116\",\"class\":\"org.jpos.iso.IFB_LLLCHAR\"},{\"length\":\"999\",\"name\":\"Reserved for national use\",\"id\":\"117\",\"class\":\"org.jpos.iso.IFB_LLLCHAR\"},{\"length\":\"999\",\"name\":\"Reserved for national use\",\"id\":\"118\",\"class\":\"org.jpos.iso.IFB_LLLCHAR\"},{\"length\":\"999\",\"name\":\"Reserved for national use\",\"id\":\"119\",\"class\":\"org.jpos.iso.IFB_LLLCHAR\"},{\"length\":\"999\",\"name\":\"Reserved for national use\",\"id\":\"120\",\"class\":\"org.jpos.iso.IFB_LLLCHAR\"},{\"length\":\"999\",\"name\":\"Reserved for national use\",\"id\":\"121\",\"class\":\"org.jpos.iso.IFB_LLLCHAR\"},{\"length\":\"999\",\"name\":\"Reserved for national use\",\"id\":\"122\",\"class\":\"org.jpos.iso.IFB_LLLCHAR\"},{\"length\":\"999\",\"name\":\"Reserved for private use\",\"id\":\"123\",\"class\":\"org.jpos.iso.IFB_LLLCHAR\"},{\"length\":\"999\",\"name\":\"Reserved for private use\",\"id\":\"124\",\"class\":\"org.jpos.iso.IFB_LLLCHAR\"},{\"length\":\"999\",\"name\":\"Reserved for private use\",\"id\":\"125\",\"class\":\"org.jpos.iso.IFB_LLLCHAR\"},{\"length\":\"999\",\"name\":\"Reserved for private use\",\"id\":\"126\",\"class\":\"org.jpos.iso.IFB_LLLCHAR\"},{\"length\":\"999\",\"name\":\"Reserved for private use\",\"id\":\"127\",\"class\":\"org.jpos.iso.IFB_LLLCHAR\"},{\"length\":\"8\",\"name\":\"Message authentication code field\",\"id\":\"128\",\"class\":\"org.jpos.iso.IFB_BINARY\"}]}}", "responseSchema": null, "messageSchemaPackager": "", "responsePackager": null, "fileType": null, "defaultPackager": false }, "networkData": { "persistRequired": 1, "properties": { "message": [{ "field": "component.type", "label": "Component Type", "listvalues": null, "value": "JSON", "fileName": null, "datatype": "String", "format": "^([a-zA-Z_-])", "mandatory": true, "hidden": false },  { "field": "custom.jar.files.id", "label": "Upload Jars", "listvalues": [".JAR"], "value": "257", "fileName": "a-0.1.jar", "datatype": "file", "format": null, "mandatory": false, "hidden": true }], "singleProperty": false, "multiPackager": false, "samePackager": false }, "connectionManagement": { "connections": [{ "connection": "test", "ip": "1.2.3.4", "port": "9090", "label": "", "timeOut": "" }], "strategyConnections": { "strategyConnections": null, "stationGroupStrategy": null, "custumStrategy": null }, "alternateConnection": "N" } }, transformData: { "persistRequired": 1, "requestMapping": { "transactions": [{ "request": { "type": "adapter_request", "mappings": [{ "ipc": "DECLINED_OAR", "type": "custom_mapper", "className": "test" }], "postActions": [] }, "response": { "type": "adapter_response", "mappings": [{ "ipc": "ACCOUNT LISTING", "type": "field", "source": "${synthetic}", "fieldId": "2", "useCase": "1", "destination": ["${message_exchange[GATEWAY_SERVICE].native_response_message[2]}"], "selectedOption": "copyField", "selectedCondition": "Optional", "validationFunctions": [] }, { "ipc": "SCRIPT_ERROR", "type": "groovy_executor", "script": "test", "source": "${3}", "selectedFormat": 4, "selectedOption": "script", "selectedCondition": "Optional" }, { "ipc": "DECLINED_OAR", "type": "custom_mapper", "className": "test" }], "preActions": [] }, "condition": { "id": "0", "type": "starts_with", "value": "89", "fieldName": "${5}" }, "messageIntentifier": "test", "contractIntentifier": null }] }, "responseMapping": null, "imfLeg": null, "fieldSchemeImfMapperUiWrapper": [{ "fieldId": "2", "fieldName": "Field 2 Primary Account number", "requestImfExpression": null, "responseImfExpression": null, "responseImfLeg": null, "requestImfField": null, "responseImfField": null, "id": "2", "name": "Field 2 Primary Account number" }, { "fieldId": "3", "fieldName": "Field 3 Processing Code", "requestImfExpression": null, "responseImfExpression": null, "responseImfLeg": null, "requestImfField": null, "responseImfField": null, "id": "3", "name": "Field 3 Processing Code" }, { "fieldId": "4", "fieldName": "Field 4 Amount, Transaction", "requestImfExpression": null, "responseImfExpression": null, "responseImfLeg": null, "requestImfField": null, "responseImfField": null, "id": "4", "name": "Field 4 Amount, Transaction" }, { "fieldId": "5", "fieldName": "Field 5 Amount, Reconciliation", "requestImfExpression": null, "responseImfExpression": null, "responseImfLeg": null, "requestImfField": null, "responseImfField": null, "id": "5", "name": "Field 5 Amount, Reconciliation" }, { "fieldId": "6", "fieldName": "Field 6 Amount, Cardholder billing", "requestImfExpression": null, "responseImfExpression": null, "responseImfLeg": null, "requestImfField": null, "responseImfField": null, "id": "6", "name": "Field 6 Amount, Cardholder billing" }, { "fieldId": "7", "fieldName": "Field 7 Date and time, transmission", "requestImfExpression": null, "responseImfExpression": null, "responseImfLeg": null, "requestImfField": null, "responseImfField": null, "id": "7", "name": "Field 7 Date and time, transmission" }, { "fieldId": "8", "fieldName": "Field 8 Amount, Cardholder billing fee", "requestImfExpression": null, "responseImfExpression": null, "responseImfLeg": null, "requestImfField": null, "responseImfField": null, "id": "8", "name": "Field 8 Amount, Cardholder billing fee" }, { "fieldId": "9", "fieldName": "Field 9 Conversion rate, Reconciliation", "requestImfExpression": null, "responseImfExpression": null, "responseImfLeg": null, "requestImfField": null, "responseImfField": null, "id": "9", "name": "Field 9 Conversion rate, Reconciliation" }, { "fieldId": "128", "fieldName": "Field 128 Message authentication code field", "requestImfExpression": null, "responseImfExpression": null, "responseImfLeg": null, "requestImfField": null, "responseImfField": null, "id": "128", "name": "Field 128 Message authentication code field" }], "responseFieldSchemeImfMapperUiWrapper": null, "listIdRule": [{ "id": "0", "name": "Field 0 Message Type Indicator" }, { "id": "1", "name": "Field 1 Bitmap" }, { "id": "2", "name": "Field 2 Primary Account number" }, { "id": "3", "name": "Field 3 Processing Code" }, { "id": "4", "name": "Field 4 Amount, Transaction" }, { "id": "5", "name": "Field 5 Amount, Reconciliation" }, { "id": "6", "name": "Field 6 Amount, Cardholder billing" }, { "id": "7", "name": "Field 7 Date and time, transmission" }, { "id": "8", "name": "Field 8 Amount, Cardholder billing fee" }, { "id": "9", "name": "Field 9 Conversion rate, Reconciliation" }, { "id": "10", "name": "Field 10 Conversion rate, Cardholder billing" }, { "id": "11", "name": "Field 11 Systems trace audit number" }, { "id": "12", "name": "Field 12 Date and time, Local transaction" }, { "id": "13", "name": "Field 13 Date, Effective" }, { "id": "14", "name": "Field 14 Date, Expiration" }, { "id": "15", "name": "Field 15 Date, Settlement" }, { "id": "16", "name": "Field 16 Date, Conversion" }, { "id": "17", "name": "Field 17 Date, Capture" }, { "id": "18", "name": "Field 18 Merchant type" }, { "id": "19", "name": "Field 19 Country code, Acquiring institution" }, { "id": "20", "name": "Field 20 Country code, Primary account number" }, { "id": "21", "name": "Field 21 Country code, Forwarding institution" }, { "id": "22", "name": "Field 22 Point of service data code" }, { "id": "23", "name": "Field 23 Card sequence number" }, { "id": "24", "name": "Field 24 Function code" }, { "id": "25", "name": "Field 25 Message reason code" }, { "id": "26", "name": "Field 26 Card acceptor business code" }, { "id": "27", "name": "Field 27 Approval code length" }, { "id": "28", "name": "Field 28 Date, Reconciliation" }, { "id": "29", "name": "Field 29 Reconciliation indicator" }, { "id": "30", "name": "Field 30 Amounts, original" }, { "id": "31", "name": "Field 31 Acquirer reference data" }, { "id": "32", "name": "Field 32 Acquirer institution ident code" }, { "id": "33", "name": "Field 33 Forwarding institution ident code" }, { "id": "34", "name": "Field 34 Primary account number, extended" }, { "id": "35", "name": "Field 35 Track 2 data" }, { "id": "36", "name": "Field 36 Track 3 data" }, { "id": "37", "name": "Field 37 Retrieval reference number" }, { "id": "38", "name": "Field 38 Approval code" }, { "id": "39", "name": "Field 39 Action code" }, { "id": "40", "name": "Field 40 Service code" }, { "id": "61", "name": "Field 61 Reserved for national use" }, { "id": "62", "name": "Field 62 Reserved for private use" }, { "id": "63", "name": "Field 63 Reserved for private use" }, { "id": "64", "name": "Field 64 Message authentication code field" }, { "id": "65", "name": "Field 65 Reserved for ISO use" }, { "id": "66", "name": "Field 66 Amounts, original fees" }, { "id": "67", "name": "Field 67 Extended payment data" }, { "id": "68", "name": "Field 68 Country code, receiving institution" }, { "id": "69", "name": "Field 69 Country code, settlement institution" }, { "id": "98", "name": "Field 98 Payee" }, { "id": "99", "name": "Field 99 Settlement institution Id code" }, { "id": "100", "name": "Field 100 Receiving institution Id code" }], "responseListIdRule": null, "safingCondition": null, "apiFieldsData": null }, "responseCodeData": { "persistRequired": 1, "ipcUiWrapper": { "ipcList": [{ "description": null, "ipc": "ACCOUNT  LISTING", "responseCode": "1" }], "defaultResponseCode": "1", "componentResponseCodeField": "1" } }, "beanconfiguationData": { "persistRequired": null }, "configurationId": 1322, "configurationVersion": 0, "imfId": { "id": 29, "name": "IMF Structure 86", "version": 86 }, "beanTabDisable": true }
const selectVersionDataJson = { id: 1321 };

describe('PostValidationComponent', () => {
  let component: PostValidationComponent;
  let fixture: ComponentFixture<PostValidationComponent>;
  let mockStore: MockStore<IAppState>;
  let mockselectViewSettingsList: MemoizedSelector<any, any>;
  let setDefaultLangSpy: jasmine.Spy;
  let mockselectVersionData;
  let router: Router;

  beforeEach(() => {
    const translateService = jasmine.createSpyObj('TranslateService', ['get', 'setDefaultLang']);
    const routerSpy = jasmine.createSpyObj('Router', ['navigateByUrl']);
    TestBed.configureTestingModule({
      declarations: [PostValidationComponent],
      providers: [
        TranslateService,
        NzModalService,
        AlertService,
        SnotifyService,
        { provide: 'SnotifyToastConfig', useValue: ToastDefaults },
        { provide: Router, useValue: routerSpy },
        { provide: TranslateService, useClass: translateServiceMock },
        provideMockStore(),
      ],
      imports: [
        SharedModule,
        StoreModule,
        NgSelectModule,
        FormsModule,
        RouterTestingModule,
        NgxDatatableModule,

        // MockStoreModule.forRoot('Location', {}),
        AlertModule,
        StoreModule.forRoot({}),
        BrowserAnimationsModule,
        HttpClientTestingModule,
        TranslateModule,
        CommonModule,
        TranslateModule.forRoot({
          loader: {
            deps: [HttpClient],
            provide: TranslateLoader,
            useFactory: HttpLoaderFactory,
          },
          missingTranslationHandler: {
            provide: MissingTranslationHandler,
            useClass: MyMissingTranslationHandler,
          },
          useDefaultLang: true,
        }),
      ],
    }).compileComponents();
    mockStore = TestBed.get(Store);
    fixture = TestBed.createComponent(PostValidationComponent);
    component = fixture.componentInstance;
    mockselectViewSettingsList = mockStore.overrideSelector(
      selectViewSettingsList,
      selectViewSettingsListJSON,
    );
    mockselectVersionData = mockStore.overrideSelector(
      selectVersionData,
      selectVersionDataJson,
    );
    setDefaultLangSpy = translateService.get.and.returnValue(of([]));
    mockStore.refreshState();
    fixture.detectChanges();    
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should  Angular calls ngOnInit', () => {
    component.adapterData = l1AdapterByIdJson;
    component.ngOnInit();
    expect(component.adapterData).toEqual(l1AdapterByIdJson);
  });

  it('draftTransform fuction should call  form HTMl', () => {
    component.draftTransform();
    expect(component.draftTransform).toBeDefined;
    expect(component.draftTransform).toHaveBeenCalled;
  });
  it('prevTabValue fuction should call  form HTMl', () => {
    component.prevTabValue();
    expect(component.prevTabValue).toBeDefined;
    expect(component.prevTabValue).toHaveBeenCalled;
  });
  it('versionData fuction should call', () => {
    const storeSpy = jasmine.createSpy('dispatch').and.callThrough()
    component.versionData();
    fixture.detectChanges();
    expect(component.btnDisable).toEqual(true);
    expect(storeSpy).toHaveBeenCalledTimes(0);
  });
  it('updateObject fuction should call ', () => {
    component.adapterData = l1AdapterByIdJson;
    component.transjections = data;
    (component as any).updateObject();
    expect((component as any).updateObject).toBeDefined;
    expect((component as any).updateObject).toHaveBeenCalled;
  });
  it('removeMapping fuction should call ', () => {
    component.adapterData = l1AdapterByIdJson;
    (component as any).removeMapping();
    expect((component as any).removeMapping).toBeDefined;
    expect((component as any).removeMapping).toHaveBeenCalled;
  });

  afterEach(() => {
    fixture.destroy();
  });
 
});
