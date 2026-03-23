import { ComponentFixture, fakeAsync, TestBed, waitForAsync } from '@angular/core/testing';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { EmvMappingComponent } from './emv-mapping.component';
import { IAppState } from '@app/store/state/app.state';
import { MemoizedSelector, StoreModule } from '@ngrx/store';
import {
  MissingTranslationHandler,
  TranslateLoader,
  TranslateModule,
  TranslateService,
} from '@ngx-translate/core';
import { emvTableSelector, emvCreated, emvValidName } from '@app/store/selectors/emv.selector';
import { selectViewSettingsList } from '@app/store/selectors/view-settings.selector';
import { of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { HttpLoaderFactory, MyMissingTranslationHandler } from '@app/shared/shared.module';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { SharedModule } from '@app/shared/shared.module';
import { AlertService } from '@app/services/alert.service';
import { SnotifyService, ToastDefaults } from 'ng-snotify';
import { NgSelectModule } from '@ng-select/ng-select';
import { EventEmitter } from '@angular/core';
import { AlertModule, DatePickerRvModule, TabsModule } from 'bnt';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ImportFileService } from '@app/services/import-file.service';
import { selectDeviceTypes } from '@app/store/selectors/device.selectors';
class translateServiceMock {
  public onLangChange: EventEmitter<any> = new EventEmitter();
  public onTranslationChange: EventEmitter<any> = new EventEmitter();
  public onDefaultLangChange: EventEmitter<any> = new EventEmitter();

  public get(key: any): any {
    return of(key);
  }
}

const emvJson = {
  data: {
    status: 'success',
    message: 'Find all device-model',
    data: {
      'total-record': 0,
      'page-no': 1,
      deviceModeList: [],
      'total-filtered-record': 0,
    },
  },
};
const emvTableSelectorJson = {
  data: {
    status: 'success',
    message: 'Find all device-model',
    data: {
      'total-record': 0,
      'page-no': 1,
      deviceModeList: [
        {
          id: 1,
          code: 'POS-TERMINAL',
          locked: '0',
        },
        {
          id: 2,
          code: 'WEB-PORTAL',
          locked: '0',
        },
        {
          id: 3,
          code: 'SYSDEL3',
          locked: '0',
        },
        {
          id: 4,
          code: 'SYSDEL4',
          locked: '0',
        },
        {
          id: 5,
          code: 'ATM',
          locked: '0',
        },
      ],
      'total-filtered-record': 0,
    },
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
const row = {
  type: 'L2',
  name: 'XUZ',
  subType: 'Core',
  corePropertiesDetails: [
    {
      id: 29,
      version: 0,
    },
  ],
  version: 0,
  versionId: 29,
};
const emvDeviceJson = [
  {
    id: 1,
    code: 'POS-TERMINAL',
    locked: '0',
  },
  {
    id: 2,
    code: 'WEB-PORTAL',
    locked: '0',
  },
  {
    id: 3,
    code: 'SYSDEL3',
    locked: '0',
  },
  {
    id: 4,
    code: 'SYSDEL4',
    locked: '0',
  },
  {
    id: 5,
    code: 'ATM',
    locked: '0',
  },
];
const emvCreatedJson = [null];
const emvValidNameJson = [null];
describe('EmvMappingComponent', () => {
  let component: EmvMappingComponent;
  let fixture: ComponentFixture<EmvMappingComponent>;
  let mockStore: MockStore<IAppState>;
  let mockselectEmvMappingList: MemoizedSelector<any, any>;
  let mockselectViewSettingsList: MemoizedSelector<any, any>;
  let mockemvDevice: MemoizedSelector<any, any>;
  let mockemvCreated: MemoizedSelector<any, any>;
  let mockemvValidName: MemoizedSelector<any, any>;
  let mockemvTableSelector: MemoizedSelector<any, any>;

  let translateService: TranslateService;
  const importFileService = jasmine.createSpyObj('ImportFileService', ['clearData']);
  beforeEach(() => {
    const translateService = jasmine.createSpyObj('TranslateService', ['get', 'setDefaultLang']);
    const alertService = jasmine.createSpyObj('AlertService, SnotifyService', ['responseMessage']);
    TestBed.configureTestingModule({
      declarations: [EmvMappingComponent],
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
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    mockStore = TestBed.inject(MockStore);
    fixture = TestBed.createComponent(EmvMappingComponent);
    component = fixture.componentInstance;

    mockselectEmvMappingList = mockStore.overrideSelector(emvTableSelector, emvJson);
    mockemvTableSelector = mockStore.overrideSelector(emvTableSelector, emvTableSelectorJson);

    mockselectViewSettingsList = mockStore.overrideSelector(
      selectViewSettingsList,
      viewsettingJSON,
    );
    mockemvDevice = mockStore.overrideSelector(selectDeviceTypes, emvDeviceJson);
    mockemvCreated = mockStore.overrideSelector(emvCreated, emvCreatedJson);
    mockemvValidName = mockStore.overrideSelector(emvValidName, emvValidNameJson);

    translateService = TestBed.inject(TranslateService);
    mockStore.refreshState();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should call function', fakeAsync(() => {
    component.resetForm();
    expect(component.resetForm).toHaveBeenCalled;
  }));

  it('cancelXML fuction should called', () => {
    component.cancelXML();
    expect(component.isXMLDataVisible).toEqual(false);
  });
  it('ViewXMLData fuction should called', () => {
    component.ViewXMLData(row);
    expect(component.isXMLDataVisible).toEqual(true);
  });
  it('submitEMV fuction should called', () => {
    component.submitEMV();
    expect(component.isVisible).toEqual(false);
  });
  it('cancel fuction should cancel the Modal', () => {
    component.cancel();
    expect(component.isVisible).toEqual(false);
  });
  it('updateTableRow fuction should called', () => {
    component.updateTableRow({ emvData : [],configurationData: []}, row);
    expect(component.updateTableRow).toBeDefined;
    expect(component.updateTableRow).toHaveBeenCalled;
  });
  // it('selectedFile fuction should called', () => {
  //   component.selectedFile(event);
  //   expect(component.selectedFile).toBeDefined;
  //   expect(component.selectedFile).toHaveBeenCalled;
  // });
  it('Scroll fuction should call', () => {
    component.onScroll(event);
    expect(component.onScroll).toBeDefined;
    expect(component.onScroll).toHaveBeenCalled;
  });
  afterEach(() => {
    fixture.destroy();
  });
});
