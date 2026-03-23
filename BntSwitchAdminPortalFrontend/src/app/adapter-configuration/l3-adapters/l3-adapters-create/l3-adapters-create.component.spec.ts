import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA, EventEmitter } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { ImportFileService } from '@app/services/import-file.service';
import { SharedModule } from '@app/shared/shared.module';
import { IAppState } from '@app/store/state/app.state';
import { NgSelectModule } from '@ng-select/ng-select';
import { MemoizedSelector, StoreModule } from '@ngrx/store';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { SnotifyService } from 'ng-snotify';
import { AlertModule, DatePickerRvModule, TabsModule } from 'bnt';
import { of } from 'rxjs';

import { L3AdaptersCreateComponent } from './l3-adapters-create.component';
import { selectL3AdapterById } from '@app/store/selectors/l3-adapter.selectors';
import { getIfmList } from '@app/store/selectors/imf-json.selector';
import { selectL3AdapterData } from '@app/store/selectors/l3-adapter.selectors';
import { CommonModule } from '@angular/common';
class translateServiceMock {
  public onLangChange: EventEmitter<any> = new EventEmitter();
  public onTranslationChange: EventEmitter<any> = new EventEmitter();
  public onDefaultLangChange: EventEmitter<any> = new EventEmitter();

  public get(key: any): any {
    return of(key);
  }
}
const selectL3AdapterByIdJson = [null];
const getIfmListJson = {
  status: 'success',
  message: 'Find all imfStructure',
  data: {
    'total-record': 15,
    'page-no': 1,
    imfStructureList: [
      {
        id: 21,
        name: 'IMF Structure 79',
        version: 79,
        imf: {},
      },
    ],
    'total-filtered-record': 10,
  },
};
const selectL3AdapterDataJson = {
  masterData: {
    adapterDto: {
      id: null,
      type: 'L3',
      standardMessageSpecification: {
        id: 1,
        messageStandard: {
          id: 47,
          value: 'ISO8583-v1987 (ASCII)',
          description: null,
          modifiable: '0',
          active: null,
          lookupType: {
            id: 4,
            name: 'Message_Standard',
            description: 'Message Standard',
            modifiable: '0',
          },
        },
        messageProtocol: {
          id: 24,
          value: 'ISO-8583',
          description: 'ISO 8583',
          modifiable: '0',
          active: null,
          lookupType: {
            id: 5,
            name: 'Message_Protocol',
            description: 'Message Protocol',
            modifiable: '0',
          },
        },
        transmissionProtocol: {
          id: 28,
          value: 'TCP',
          description: 'TCP',
          modifiable: '0',
          active: null,
          lookupType: {
            id: 6,
            name: 'Transmission_Protocol',
            description: 'Transmission Protocol',
            modifiable: '0',
          },
        },
      },
      name: null,
      adapterId: null,
      active: null,
      guid: null,
    },
  },
  schemaData: {},
  networkData: {
    persistRequired: '0',
    properties: {
      message: [
        {
          field: 'message--server.port',
          label: 'Server Port',
          listvalues: null,
          value: '0000',
          fileName: null,
          datatype: 'int',
          format: '^([0-9_-]){4,6}$',
          mandatory: true,
          hidden: true,
          mtype: 'message',
          custom: 1,
        },
      ],
      network: [
        {
          field: 'network--tcp.mode',
          label: 'TCP Mode',
          listvalues: ['server', 'client'],
          value: 'client',
          fileName: null,
          datatype: 'String',
          format: '^([a-z])',
          mandatory: true,
          hidden: false,
          mtype: 'network',
          custom: 1,
        },
      ],
    },
    connectionManagement: null,
  },
  transformData: {
    persistRequired: '0',
    requestMapping: null,
    responseMapping: null,
    imfLeg: null,
    fieldSchemeImfMapperUiWrapper: [],
    listIdRule: [
      {
        id: '0',
        name: 'Field 0 MESSAGE TYPE INDICATOR',
      },
    ],
    safingCondition: null,
    apiFieldsData: null,
  },
  responseCodeData: {
    persistRequired: '0',
    ipcUiWrapper: null,
  },
  beanconfiguationData: {
    persistRequired: '0',
    beans: [],
  },
  configurationId: null,
  configurationVersion: null,
  imfId: {
    id: 21,
    name: 'IMF Structure 79',
    version: 79,
  },
  beanTabDisable: true,
};
const vJosn = {
  imfId: null,
  name: 'test',
  templateData: {
    id: 48,
    value: 'ISO8583-v1993 (ASCII)',
    description: null,
    modifiable: '0',
    active: '1',
    lookupType: {
      id: 4,
      name: 'Message_Standard',
      description: 'Message Standard',
      modifiable: '0',
    },
  },
};
describe('L3AdaptersCreateComponent', () => {
  let component: L3AdaptersCreateComponent;
  let fixture: ComponentFixture<L3AdaptersCreateComponent>;
  let mockStore: MockStore<IAppState>;
  let mockselectL3AdapterById: MemoizedSelector<any, any>;
  let mockgetIfmList: MemoizedSelector<any, any>;
  let mockselectL3AdapterData: MemoizedSelector<any, any>;
  let translateService: TranslateService;
  const importFileService = jasmine.createSpyObj('ImportFileService', ['clearData']);
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [L3AdaptersCreateComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [
        SnotifyService,
        { provide: TranslateService, useClass: translateServiceMock },
        { provide: 'SnotifyToastConfig', useValue: {} },
        { provide: ImportFileService, useValue: importFileService },
        provideMockStore(),
      ],
      imports: [
        SharedModule,
        NgSelectModule,
        FormsModule,
        ReactiveFormsModule,
        AlertModule,
        TabsModule,
        TranslateModule.forRoot({}),
        DatePickerRvModule,
        RouterTestingModule,
        HttpClientTestingModule,
        NgxDatatableModule,
        StoreModule.forRoot({}),
        CommonModule
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    mockStore = TestBed.get(MockStore);
    fixture = TestBed.createComponent(L3AdaptersCreateComponent);
    component = fixture.componentInstance;

    mockselectL3AdapterById = mockStore.overrideSelector(
      selectL3AdapterById,
      selectL3AdapterByIdJson,
    );
    mockselectL3AdapterData = mockStore.overrideSelector(
      selectL3AdapterData,
      selectL3AdapterDataJson,
    );
    mockgetIfmList = mockStore.overrideSelector(getIfmList, getIfmListJson);

    translateService = TestBed.inject(TranslateService);
    mockStore.refreshState();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('selectTransform fuction should call', () => {
    const value = 2;
    component.tabValue(value);
    expect(component.tabIndex).toEqual(value);
  });
  it('selectTransform fuction should call', () => {
    const value = 1;
    component.tabValue(value);
    expect(component.tabIndex).toEqual(value);
  });
  it('selectTransform fuction should call', () => {
    component.selectTransform();
    expect(component.showTransform).toEqual(true);
  });
  it('schmaTab fuction should call', () => {
    component.schmaTab();
    expect(component.activeTab).toEqual(0);
  });
  it('networkTab fuction should call', () => {
    component.networkTab();
    expect(component.activeTab).toEqual(1);
  });
  it('responseTab fuction should call', () => {
    component.responseTab();
    expect(component.activeTab).toEqual(3);
  });
  it('selectTransform fuction should call', () => {
    const value = 3;
    component.tabValue(value);
    expect(component.tabIndex).toEqual(value);
  });
  it('selectTransform fuction should call', () => {
    const value = 4;
    component.tabValue(value);
    expect(component.tabIndex).toEqual(value);
  });
  afterEach(() => {
    fixture.destroy();
  });
});
