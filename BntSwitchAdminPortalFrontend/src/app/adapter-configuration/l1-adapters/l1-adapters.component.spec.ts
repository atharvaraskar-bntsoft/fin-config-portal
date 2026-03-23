import { ChangeDetectorRef, CUSTOM_ELEMENTS_SCHEMA, EventEmitter } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { L1AdapterService } from '@app/services/l1-adapter.service';
import { IAppState } from '@app/store/state/app.state';
import { MemoizedSelector, StoreModule } from '@ngrx/store';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { Observable, of } from 'rxjs';
import { selectL1AdapterById } from '../../store/selectors/l1-adapter.selectors';
import { getIfmList } from '../../store/selectors/imf-json.selector';
import { selectViewSettingsList } from '@app/store/selectors/view-settings.selector';
import { L1AdaptersComponent } from './l1-adapters.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { AdapterTemplateComponent } from './adapter-template/adapter-template.component';
import { NzTabsModule } from 'ng-zorro-antd/tabs';
import { CommonModule } from '@angular/common';

class translateServiceMock {
  public onLangChange: EventEmitter<any> = new EventEmitter();
  public onTranslationChange: EventEmitter<any> = new EventEmitter();
  public onDefaultLangChange: EventEmitter<any> = new EventEmitter();
  public get(key: any): any {
    return of(key);
  }
}

class changeDetectorRefWork {
  public close(key: any): any {}
}

class activateRouterClass {
  public close(key: any): any {}
}

class adapterTemplateComponentClass {
  public close(key: any): any {}
}

const l1AdapterByIdJson = {
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
};

const imfListJson = {
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
        imf: '',
      },
    ],
    'total-filtered-record': 10,
  },
};

const viewsettingJSON = {
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
const value = {
  imfId: null,
  name: 'test1',
  templateData: null,
};

describe('L1AdaptersComponent', () => {
  let component: L1AdaptersComponent;
  let fixture: ComponentFixture<L1AdaptersComponent>;
  let mockStore: MockStore<IAppState>;
  let mockselectL1AdapterComponentList: MemoizedSelector<any, any>;
  let mockselectImfList: MemoizedSelector<any, any>;
  let mockselectViewSettingsList: MemoizedSelector<any, any>;
  let setDefaultLangSpy: jasmine.Spy;
  let changeDetectorRef: ChangeDetectorRef;

  beforeEach(() => {
    const translateService = jasmine.createSpyObj('TranslateService', ['get', 'setDefaultLang']);
    TestBed.configureTestingModule({
      declarations: [L1AdaptersComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [
        L1AdapterService,
        provideMockStore(),
        { provide: TranslateService, useClass: translateServiceMock },
        { provide: ChangeDetectorRef, useClass: changeDetectorRefWork },
        { provide: ActivatedRoute, useClass: activateRouterClass },
        { provide: AdapterTemplateComponent, useClass: adapterTemplateComponentClass },
      ],
      imports: [
        RouterTestingModule,
        NzSpinModule,
        NzTabsModule,
        HttpClientTestingModule,
        TranslateModule.forRoot({}),
        StoreModule.forRoot({}),
        CommonModule
      ],
      // schemas:[CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();

    mockStore = TestBed.inject(MockStore);
    fixture = TestBed.createComponent(L1AdaptersComponent);
    component = fixture.componentInstance;

    mockselectL1AdapterComponentList = mockStore.overrideSelector(
      selectL1AdapterById,
      l1AdapterByIdJson,
    );

    mockselectImfList = mockStore.overrideSelector(getIfmList, imfListJson);

    mockselectViewSettingsList = mockStore.overrideSelector(
      selectViewSettingsList,
      viewsettingJSON,
    );

    setDefaultLangSpy = translateService.get.and.returnValue(of([]));

    mockStore.refreshState();
    fixture.detectChanges();
    changeDetectorRef = TestBed.inject(ChangeDetectorRef);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(L1AdaptersComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should Angular calls click response tab loadData', () => {
    component.responseTab();
    expect(component.activeTab).toEqual(3);
  });
  it('should function calls click schema Tab loadData', () => {
    component.schmaTab();
    expect(component.activeTab).toEqual(0);
  });
  it('should Angular calls click network Tab to loadData in html', () => {
    component.networkTab();
    expect(component.activeTab).toEqual(1);
  });
  // it('should Angular calls click select transform Tab loadData', () => {
  //   component.selectTransform();
    
  //   expect(component.activeTab).toEqual(2);
  //   const value=true;
  //   expect(component.showSoapTransform.value).toBeTruthy;
  // });
  it('should function calls check form validate value in html', () => {
    const value=true;
    component.formValidate(value);
    expect(component.fvalid).toEqual(true);
  });
  // it('should function calls click tab disabled in html', () => {
  //   const value = 1;
  //   component.tabDisable(value);
  //   expect(component.responseTabDisable).toBeTruthy;
  // });
  it('should function calls and change the tab button in html', () => {
    const value = 1;
    component.tabValue(value);
    expect(component.showTransform).toBeTruthy;
  });
  it('should function calls load data', () => {
    const value = 'false';
    component.loaderValue(value);
    expect(component.loading).toBeTruthy;
  });
  it('should function change the template in html ', () => {
    const value={
      imfId :{version : 0},
      name: "aaa",
      templateData : null
    };
    component.changeTemplate(value);
    expect(component.name).toBeTruthy;
  });
  // it('should function check single property the  in html ', () => {
  //   const data = "true"
  //   component.checkSingleProperty(data);
  //   expect(component.singleProperty).toBeTruthy;
  // });
  // it('should function calls check form validate value in html', () => {
  //   const value = 'false';
  //   component.changeAdapterData(value);
  //   expect(component.adapterData).toBeTruthy;
  // });
  
  afterEach(() => {
    fixture.destroy();
  });
});
