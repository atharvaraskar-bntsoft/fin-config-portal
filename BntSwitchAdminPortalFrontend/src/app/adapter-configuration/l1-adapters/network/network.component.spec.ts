import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NetworkComponent } from './network.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '@app/shared/shared.module';
import { IAppState } from '@app/store/state/app.state';
import { selectViewSettingsList } from '@app/store/selectors/view-settings.selector';
import { of } from 'rxjs';
import {
  MissingTranslationHandler,
  TranslateLoader,
  TranslateModule,
  TranslateService,
} from '@ngx-translate/core';
import { MockStoreModule } from '@app/tests/tests.module';
import { HttpLoaderFactory, MyMissingTranslationHandler } from '@app/shared/shared.module';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { MemoizedSelector, Store, StoreModule } from '@ngrx/store';
import { AlertService } from '@app/services/alert.service';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { SnotifyService, ToastDefaults } from 'ng-snotify';
import { NzModalService } from 'ng-zorro-antd/modal';
import { AlertModule, DatePickerRvModule } from 'bnt';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { L1AdapterService } from '@app/services/l1-adapter.service';
import { ActivatedRoute, convertToParamMap, Router, RouterModule } from '@angular/router';
import { EventEmitter,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';
import { selectNetwork } from '@app/store/selectors/l1-adapter.selectors';
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

const selectViewSettingsListJSON = {
  status: 'success',
  message: 'Find all Setting',
  data: {
    pagination: ['20', '25', '30', '40', '50'],
    language: ['en_EN', 'en_EN1', 'fr_FR', 'en_INV'],
    settingDto: {
      id: 1,
      systemUserId:
        'SystemUser [firstName=BntlastName=Admin, email=bnt.admin@bnt.com, systemUserCategory=, password=9AHRz1ElALzTEdFKIKywyzEZh0IcZ/INhbGkbc0Qb84=, passwordLastUpdatedOn=2020-07-02 13:09:08.0, locked=0, deleted=0, lockedReason=null]',
      search: 'contain',
      language: 'en_EN1',
      pagination: '20',
    },
    searchOption: ['contain', 'contain2'],
  },
};

const selectNetworkJson =
{
  status: "success",
  message: "Find netwrok-attribute in Adapter-JSON",
  data:
  {
    "masterData":
    {
      "adapterDto":
      {
        "id": null, "type": "L1",
        "standardMessageSpecification": {
          "id": 2,
          "messageStandard": {
            "id": 44, "value": "ISO8583-v1987 (BINARY)", "description": null, "modifiable": "0", "active": null, "lookupType": { "id": 4, "name": "Message_Standard", "description": "Message Standard", "modifiable": "0" }
          }, "messageProtocol": { "id": 24, "value": "ISO-8583", "description": "ISO 8583", "modifiable": "0", "active": null, "lookupType": { "id": 5, "name": "Message_Protocol", "description": "Message Protocol", "modifiable": "0" } }, "transmissionProtocol": { "id": 28, "value": "TCP", "description": "TCP", "modifiable": "0", "active": null, "lookupType": { "id": 6, "name": "Transmission_Protocol", "description": "Transmission Protocol", "modifiable": "0" } }
        }, "name": null, "adapterId": null, "active": null, "guid": null
      }
    }, "schemaData": { "persistRequired": "0", "schema": null, "messageSchemaPackager": null },
    networkData: { "persistRequired": "0", "properties": { "message": [{ "field": "server.port", "label": "Server Port", "listvalues": null, "value": "0000", "fileName": null, "datatype": "int", "format": "^([0-9_-]){4,6}$", "mandatory": true, "hidden": true }, { "field": "component.type", "label": "Component Type", "listvalues": null, "value": "JSON", "fileName": null, "datatype": "String", "format": "^([a-zA-Z_-])", "mandatory": true, "hidden": false }, { "field": "component.name", "label": "Component Name(Message)", "listvalues": null, "value": "atm_adapter", "fileName": null, "datatype": "String", "format": "^([a-zA-Z_-])", "mandatory": true, "hidden": false }, { "field": "component.iso.header.value", "label": "ISO Header Value(Message)", "listvalues": null, "value": "", "fileName": null, "datatype": "String", "format": "^([A-Za-z0-9_\\-\\.])", "mandatory": true, "hidden": false }], "network": [{ "field": "tcp.mode", "label": "TCP Mode", "listvalues": ["server", "client"], "value": "client", "fileName": null, "datatype": "String", "format": "^([a-z])", "mandatory": true, "hidden": false }, { "field": "component.iso.header.value", "label": "ISO Header Value(Network)", "listvalues": null, "value": "", "fileName": null, "datatype": "String", "format": "^([A-Za-z0-9_\\-\\.])", "mandatory": true, "hidden": false }, { "field": "component.service.type", "label": "Service Type", "listvalues": null, "value": "GATEWAY_SERVICE", "fileName": null, "datatype": "String", "format": "^([a-zA-Z_-])", "mandatory": true, "hidden": true }, { "field": "tcp.server.port", "label": "TCP Server Port", "listvalues": null, "value": "7070", "fileName": null, "datatype": "int", "format": "^([0-9_-]){4,6}$", "mandatory": true, "hidden": false }, { "field": "tcp.to.channel.core.pool.size", "label": "TCP TO Channel Core Pool Size", "listvalues": null, "value": "100", "fileName": null, "datatype": "int", "format": "^([0-9_-])", "mandatory": true, "hidden": true }, { "field": "tcp.from.channel.core.pool.size", "label": "TCP FROM Channel Core Pool Size", "listvalues": null, "value": "100", "fileName": null, "datatype": "int", "format": "^([0-9_-])", "mandatory": true, "hidden": true }, { "field": "tcp.server.header.length", "label": "Message Length Bytes", "listvalues": ["2", "4"], "value": "2", "fileName": null, "datatype": "String", "format": "^([0-9_-])", "mandatory": true, "hidden": false }, { "field": "tcp.serialzer.type", "label": "TCP Serializer Type", "listvalues": ["FIRST", "SECOND"], "value": "FIRST", "fileName": null, "datatype": "String", "format": "^([a-zA-Z_-])", "mandatory": true, "hidden": true }, { "field": "tcp.server.ssl.keystore.password", "label": "TCP SSL Keystore Password", "listvalues": null, "value": "", "fileName": null, "datatype": "password", "format": "^([a-zA-Z0-9_-])", "mandatory": true, "hidden": false }, { "field": "tcp.ssl.keystore.path", "label": "TCP SSL Keystore Path", "listvalues": [".JKS"], "value": "", "fileName": "", "datatype": "file", "format": "", "mandatory": true, "hidden": false }, { "field": "server.request.sla.time", "label": "Server Request SLA Time", "listvalues": null, "value": "40000", "fileName": null, "datatype": "int", "format": "^([0-9_-])", "mandatory": true, "hidden": true }, { "field": "server.connection.threshold", "label": "Server Connection Threshold", "listvalues": null, "value": "1000000000", "fileName": null, "datatype": "int", "format": "^([0-9_-])", "mandatory": true, "hidden": true }, { "field": "server.connection.threshold.time", "label": "Server Connection Threshold Time", "listvalues": null, "value": "1", "fileName": null, "datatype": "int", "format": "^([0-9_-])", "mandatory": true, "hidden": true }, { "field": "server.total.threshold", "label": "Server Total Threshold", "listvalues": null, "value": "100000000", "fileName": null, "datatype": "int", "format": "^([0-9_-])", "mandatory": true, "hidden": true }, { "field": "server.total.threshold.time", "label": "Server Total Threshold Time", "listvalues": null, "value": "1", "fileName": null, "datatype": "int", "format": "^([0-9_-])", "mandatory": true, "hidden": true }, { "field": "component.name", "label": "Component Name(Network)", "listvalues": null, "value": "atm_adapter", "fileName": null, "datatype": "String", "format": "^([a-zA-Z_-])", "mandatory": true, "hidden": false }, { "field": "server.connection.threshold.time.unit", "label": "Server Connection Threshold Time Unit", "listvalues": ["HOURS", "MINUTES", "SECONDS"], "value": "HOURS", "fileName": null, "datatype": "String", "format": "^([a-zA-Z_-])", "mandatory": true, "hidden": false }, { "field": "server.total.threshold.time.unit", "label": "Server Total Threshold Time Unit", "listvalues": ["HOURS", "MINUTES", "SECONDS"], "value": "HOURS", "fileName": null, "datatype": "String", "format": "^([a-zA-Z_-])", "mandatory": true, "hidden": false }] }, "connectionManagement": { "connections": [], "strategyConnections": { "strategyConnections": null, "stationGroupStrategy": null, "custumStrategy": null }, "alternateConnection": "N" } }, "transformData": { "persistRequired": "0", "requestMapping": null, "responseMapping": null, "imfLeg": null, "fieldSchemeImfMapperUiWrapper": null, "listIdRule": null, "safingCondition": null, "apiFieldsData": null }, "responseCodeData": { "persistRequired": "0", "ipcUiWrapper": null }, "beanconfiguationData": { "persistRequired": "0", "beans": null }, "configurationId": null, "configurationVersion": null, "imfId": null, "beanTabDisable": false
  }
}

describe('L1NetworkComponent', () => {
  let component: NetworkComponent;
  let fixture: ComponentFixture<NetworkComponent>;
  let mockStore: MockStore<IAppState>;
  let MockselectViewSettingsList;
  let mockselectNetwork: MemoizedSelector<any, any>;
  let setDefaultLangSpy: jasmine.Spy;
  let l1AdapterService;

  beforeEach(() => {
    const translateService = jasmine.createSpyObj('TranslateService', ['get', 'setDefaultLang']);
    TestBed.configureTestingModule({
      declarations: [NetworkComponent],
      providers: [
        { provide: TranslateService, useClass: translateServiceMock },
        AlertService,
        SnotifyService,
        HttpClient,
        NzModalService,
        L1AdapterService,
        { provide: 'SnotifyToastConfig', useValue: ToastDefaults },
        { provide: L1AdapterService, useValue: l1AdapterService },
        provideMockStore(),
        // other providers
      ],
      imports: [
        CommonModule,
        BrowserAnimationsModule,
        FormsModule,
        NgSelectModule,
        ReactiveFormsModule,
        AlertModule,
        HttpClientModule,
        SharedModule,
        StoreModule.forRoot({}),
        DatePickerRvModule,
        RouterTestingModule,
        HttpClientTestingModule,
        NgxDatatableModule,
        // ImportFileModule,
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
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();

    mockStore = TestBed.get(Store);
    fixture = TestBed.createComponent(NetworkComponent);
    component = fixture.componentInstance;
    mockselectNetwork = mockStore.overrideSelector(selectNetwork, selectNetworkJson);
    MockselectViewSettingsList = mockStore.overrideSelector(
      selectViewSettingsList,
      selectViewSettingsListJSON,
    );
    mockStore.refreshState();
    setDefaultLangSpy = translateService.get.and.returnValue(of([]));
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
