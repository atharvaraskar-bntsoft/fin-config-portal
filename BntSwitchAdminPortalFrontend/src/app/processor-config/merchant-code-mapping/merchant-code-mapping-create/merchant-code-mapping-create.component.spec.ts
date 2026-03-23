import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { MerchantCodeMappingCreateComponent } from './merchant-code-mapping-create.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { RouterTestingModule } from '@angular/router/testing';
import { MockStoreModule } from '@app/tests/tests.module';
import { IMerchantCodeMappingState } from '@app/store/state/merchant-code-mapping.state';
import { MemoizedSelector, Store } from '@ngrx/store';
import { AlertService } from '@app/services/alert.service';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { IAppState } from '@app/store/state/app.state';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { selectViewSettingsList } from '@app/store/selectors/view-settings.selector';
import { selectTreeDeepDetail } from '../../../store/selectors/device.selectors';
import { selectInstitutionAcquirerProcessor } from '@app/store/selectors/acquirer.selector';
import { selectMerchantConfigData } from '@app/store/selectors/merchant-code-mapping.selector';

import { selectMerchantCodeMappingPostSuccess } from '@app/store/selectors/merchant-code-mapping.selector';
import { EventEmitter } from '@angular/core';
import { of } from 'rxjs';
import { SnotifyService, ToastDefaults } from 'ng-snotify';
// import { ImportFileModule } from '@app/import-file/import-file.module';
import { ImportFileService } from '@app/services/import-file.service';
import { SharedModule } from '@app/shared/shared.module';

class translateServiceMock {
  public onLangChange: EventEmitter<any> = new EventEmitter();
  public onTranslationChange: EventEmitter<any> = new EventEmitter();
  public onDefaultLangChange: EventEmitter<any> = new EventEmitter();

  public get(key: any): any {
    return of(key);
  }
  public setDefaultLang(key: any): any {}
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

const selectTreeDeepDetailJSON = [
  {
    data: [
      {
        id: 1,
        name: 'Future-Group',
        merchantInstitutionId: null,
        merchantInstitutionName: null,
        merchants: [
          {
            id: 1,
            name: 'GIP Noida',
            merchantId: null,
            merchantName: null,
            locations: [
              {
                id: 1,
                name: 'GIP Noida',
                code: '000000000000001',
                locationId: null,
                locationName: null,
                devices: [
                  {
                    id: 1,
                    name: '00000001',
                  },
                ],
              },
            ],
            devices: null,
          },
        ],
        locations: null,
      },
    ],
  },
];

const selectMerchantConfigDataJSON = {
  data: [
    {
      id: 'acquirer',
      name: 'Acquirer Mapping',
    },
    {
      id: 'merchant',
      name: 'Merchant Chain Mapping',
    },
    {
      id: 'location',
      name: 'Merchant Store Mapping(MID)',
    },
    {
      id: 'device',
      name: 'Merchant Terminal Mapping(TID)',
    },
  ],
};
const selectMerchantCodeMappingPostSuccessJSON = {
  status: 'success',
  message: 'Merchant Mapping Created',
  data: {
    id: 9,
  },
};

const selectInstitutionAcquirerProcessorJSON = {
  data: {
    acqList: [
      {
        id: 1,
        name: 'Aquirer-One',
        code: '00000000001',
      },
    ],
    paList: [
      {
        id: 1,
        name: 'L3_test',
      },
      {
        id: 2,
        name: 'L3_Json',
      },
      {
        id: 3,
        name: 'iso_tcp_client_4',
      },
      {
        id: 5,
        name: 'json_1_5jan',
      },
      {
        id: 6,
        name: 'l3json',
      },
      {
        id: 7,
        name: 'l3_iso_tcp_client_4jan',
      },
      {
        id: 9,
        name: 'test34',
      },
      {
        id: 10,
        name: 'sd',
      },
      {
        id: 11,
        name: 'ISO1',
      },
      {
        id: 12,
        name: 'ret',
      },
      {
        id: 14,
        name: 'trt',
      },
      {
        id: 15,
        name: 'kjdfkdfjgkdfs',
      },
      {
        id: 16,
        name: 'newdata',
      },
      {
        id: 17,
        name: 'kkjkriiriir',
      },
      {
        id: 18,
        name: 'tytuyty',
      },
    ],
    instList: [
      {
        id: 1,
        name: 'GIP Noida',
        code: '000000000000001',
      },
      {
        id: 2,
        name: 'Reliance Digital',
        code: '00000002',
      },
      {
        id: 3,
        name: 'Croma Retail Company',
        code: '0000000010',
      },
      {
        id: 4,
        name: 'DTestChain',
        code: '000000000000001',
      },
      {
        id: 5,
        name: 'DTestChain1',
        code: '687555537877464',
      },
    ],
  },
};

describe('MerchantCodeMappingCreateComponent', () => {
  let component: MerchantCodeMappingCreateComponent;
  let fixture: ComponentFixture<MerchantCodeMappingCreateComponent>;
  // let store: Store<IMerchantCodeMappingState>;
  let mockStore: MockStore<IAppState>;
  let mockselectViewSettingsList: MemoizedSelector<any, any>;

  let mockselectTreeDeepDetail: MemoizedSelector<any, any>;

  let mockselectMerchantConfigData: MemoizedSelector<any, any>;
  let mockselectMerchantCodeMappingPostSuccess: MemoizedSelector<any, any>;
  let mockselectInstitutionAcquirerProcessor: MemoizedSelector<any, any>;
  let translateService: TranslateService;

  const importFileService = jasmine.createSpyObj('ImportFileService', ['clearData']);
  beforeEach(() => {
    const translateService = jasmine.createSpyObj('TranslateService', ['get','setDefaultLang']);
    TestBed.configureTestingModule({
      declarations: [MerchantCodeMappingCreateComponent],
      providers: [
        AlertService,
        TranslateService,
        SnotifyService,
        { provide: TranslateService, useClass: translateServiceMock },
        { provide: 'SnotifyToastConfig', useValue: ToastDefaults },
        { provide: ImportFileService, useValue: importFileService },
        provideMockStore(),
      ],
      imports: [
        NgSelectModule,
        FormsModule,
        NgxDatatableModule,
        // MockStoreModule.forRoot('Location', {}),
        FormsModule,
        // ImportFileModule,
        SharedModule,
        ReactiveFormsModule,
        RouterTestingModule,
        TranslateModule.forRoot({}),
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    mockStore = TestBed.get(MockStore);

    fixture = TestBed.createComponent(MerchantCodeMappingCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    mockselectTreeDeepDetail = mockStore.overrideSelector(
      selectTreeDeepDetail,
      selectTreeDeepDetailJSON,
    );

    mockselectInstitutionAcquirerProcessor = mockStore.overrideSelector(
      selectInstitutionAcquirerProcessor,
      selectInstitutionAcquirerProcessorJSON,
    );
    mockselectMerchantCodeMappingPostSuccess = mockStore.overrideSelector(
      selectMerchantCodeMappingPostSuccess,
      selectMerchantCodeMappingPostSuccessJSON,
    );

    mockselectMerchantConfigData = mockStore.overrideSelector(
      selectMerchantConfigData,
      selectMerchantConfigDataJSON,
    );

    mockselectViewSettingsList = mockStore.overrideSelector(
      selectViewSettingsList,
      selectViewSettingsListJSON,
    );

    // mockselectRowMerchantCodeMappingSuccess = mockStore.overrideSelector(
    //   selectRowMerchantCodeMappingSuccess,
    //   selectRowMerchantCodeMappingSuccessJSON,
    // )

    translateService = TestBed.inject(TranslateService);
   
    mockStore.refreshState();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // it('should  Angular calls ngOnInit', () => {
  //   component.ngOnInit();
  // });

  afterEach(() => {
    fixture.destroy();
  });
});


