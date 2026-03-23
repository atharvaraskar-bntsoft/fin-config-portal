import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA, EventEmitter } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { AlertService } from '@app/services/alert.service';
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
import { selectViewSettingsList } from '@app/store/selectors/view-settings.selector';
import { ResponsetabHttpJsonComponent } from './responsetab-http-json.component';
import { selectIMF } from '@app/store/selectors/scheme-imf-mapper.selectors';
import { selectInternalCode, selectL1AdapterById } from '@app/store/selectors/l1-adapter.selectors';
import { CommonModule } from '@angular/common';
class translateServiceMock {
  public onLangChange: EventEmitter<any> = new EventEmitter();
  public onTranslationChange: EventEmitter<any> = new EventEmitter();
  public onDefaultLangChange: EventEmitter<any> = new EventEmitter();

  public get(key: any): any {
    return of(key);
  }
}
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
const selectIMFJson = [
  {
    ImfField: [
      {
        name: 'paappipppppepep',
        alias: 'Pappi',
        type: 'STRING',
        hide: false,
      },
      {
        name: 'ppro_notification',
        alias: 'Ppro_Notification',
        type: 'STRING',
        hide: false,
      },
      {
        name: 'account_number_masked',
        alias: 'Account Number Masked',
        type: 'STRING',
        hide: false,
      },
      {
        name: 'account_number_extended',
        alias: 'Extended account number',
        type: 'STRING',
        hide: false,
      },
    ],
  },
];
const selectInternalCodeJson = [
  {
    id: 126,
    value: 'ACCOUNT  LISTING',
    description: 'desc',
    modifiable: '1',
    active: '1',
    lookupType: {
      id: 10,
      name: 'INTERNAL_PROCESSING_CODE',
      description: 'Internal Processing Code',
      modifiable: '0',
    },
  },
];
const l1AdapterByIdJson = [
  {
    status: 'success',
    message: 'Find Adaptor',
    data: {
      masterData: {
        adapterDto: {
          id: 122,
          type: 'L1',
          standardMessageSpecification: {
            id: 7,
            messageStandard: {
              id: -1,
              value: 'JSON',
              description: 'JSON',
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
              id: 26,
              value: 'JSON',
              description: 'JSON',
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
              id: 29,
              value: 'HTTP',
              description: 'HTTP',
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
          name: 'TestJson_17Aug',
          adapterId: 'testjson_17aug',
          active: '1',
          guid: null,
        },
      },
      schemaData: {
        persistRequired: '0',
        schema: '',
        messageSchemaPackager: '',
      },
      networkData: {
        persistRequired: '0',
        properties: null,
        connectionManagement: null,
      },
      transformData: {
        persistRequired: '0',
        requestMapping: null,
        responseMapping: null,
        imfLeg: null,
        fieldSchemeImfMapperUiWrapper: null,
        listIdRule: null,
        safingCondition: null,
        apiFieldsData: {
          headerFields: [
            {
              id: 'header[L1_MESSAGE_TYPE_INDICATOR]',
              name: 'apiName',
              possibleValue: ['api'],
              parentField: null,
            },
          ],
          apiFields: [
            {
              apiName: 'api',
              apiurl: '/api',
              isMutliResponse: null,
              incomingFields: [
                {
                  id: 'type',
                  name: 'type',
                  possibleValue: null,
                  parentField: null,
                },
              ],
              apiConditionalPackgerFields: null,
              outGoingFields: [
                {
                  id: 'type',
                  name: 'type',
                  possibleValue: null,
                  parentField: null,
                },
              ],
            },
          ],
        },
      },
      responseCodeData: {
        persistRequired: '0',
        ipcUiWrapper: null,
      },
      beanconfiguationData: {
        persistRequired: null,
        beans: [
          {
            componentType: 'L1',
            componentId: null,
            fileType: 'WORKFLOW CHAIN',
            fileName: 'workflow-chain.xml',
            fileContent: '',
            version: 1,
            packagingType: 'SYSTEM',
          },
        ],
      },
      configurationId: 1077,
      configurationVersion: 0,
      imfId: {
        id: 20,
        name: 'IMF Structure 78',
        version: 78,
      },
      beanTabDisable: true,
    },
  },
];

describe('ResponsetabHttpJsonComponent', () => {
  let component: ResponsetabHttpJsonComponent;
  let fixture: ComponentFixture<ResponsetabHttpJsonComponent>;
  let mockStore: MockStore<IAppState>;
  let mockselectViewSettingsList: MemoizedSelector<any, any>;
  let mockselectIMF: MemoizedSelector<any, any>;
  let mockselectInternalCode: MemoizedSelector<any, any>;
  let mockl1AdapterByIdJson: MemoizedSelector<any, any>;
  let translateService: TranslateService;
  const importFileService = jasmine.createSpyObj('ImportFileService', ['clearData']);
  beforeEach(() => {
    const translateService = jasmine.createSpyObj('TranslateService', ['get', 'setDefaultLang']);
    const alertService = jasmine.createSpyObj('AlertService, SnotifyService', ['responseMessage']);
    TestBed.configureTestingModule({
      declarations: [ResponsetabHttpJsonComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [
        SnotifyService,
        { provide: TranslateService, useClass: translateServiceMock },
        { provide: 'SnotifyToastConfig', useValue: {} },
        { provide: ImportFileService, useValue: importFileService },
        { provide: AlertService, useValue: alertService },

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
        //ImportFileModule,
        StoreModule.forRoot({}),
        CommonModule
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    mockStore = TestBed.inject(MockStore);
    fixture = TestBed.createComponent(ResponsetabHttpJsonComponent);
    component = fixture.componentInstance;

    mockselectViewSettingsList = mockStore.overrideSelector(
      selectViewSettingsList,
      selectViewSettingsListJson,
    );
    mockselectIMF = mockStore.overrideSelector(selectIMF, selectIMFJson);
    mockselectInternalCode = mockStore.overrideSelector(selectInternalCode, selectInternalCodeJson);
    mockl1AdapterByIdJson = mockStore.overrideSelector(selectL1AdapterById, l1AdapterByIdJson);

    translateService = TestBed.inject(TranslateService);
    mockStore.refreshState();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  // it('ngOnChanges fuction should call', () => {
  //   const changes =[propName: string];
  //   component.ngOnChanges(changes);
  //   expect(component.ngOnChanges).toBeDefined;
  //   expect(component.ngOnChanges).toHaveBeenCalled;
  // });
  it('pushresponseCodeItem fuction should call', () => {
    component.pushApiListItem();
    expect(component.pushApiListItem).toBeDefined;
    expect(component.pushApiListItem).toHaveBeenCalled;
  });

  afterEach(() => {
    fixture.destroy();
  });
});
