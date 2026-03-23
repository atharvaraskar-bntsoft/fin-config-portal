import { ComponentFixture, fakeAsync, TestBed, waitForAsync } from '@angular/core/testing';
import { L3AdaptersComponent } from './l3-adapters.component';
import { selectL3AdapterList } from '@app/store/selectors/l3-adapter.selectors';
import { getIfmList } from '@app/store/selectors/imf-json.selector';
import { selectViewSettingsList } from '@app/store/selectors/view-settings.selector';
import { selectPermissionsData } from '@app/store/selectors/permission.selectors';
import { EventEmitter } from '@angular/core';
import { of } from 'rxjs';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { IAppState } from '@app/store/state/app.state';
import { MemoizedSelector, StoreModule } from '@ngrx/store';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AlertModule, DatePickerRvModule, TabsModule } from 'bnt';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { SharedModule } from '@app/shared/shared.module';
import { AlertService } from '@app/services/alert.service';
import { ImportFileService } from '@app/services/import-file.service';
import { SnotifyService } from 'ng-snotify';
import { L3AdapterService } from '@app/services/l3-adapter.service';
import { L1AdapterService } from '@app/services/l1-adapter.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';

class translateServiceMock {
  public onLangChange: EventEmitter<any> = new EventEmitter();
  public onTranslationChange: EventEmitter<any> = new EventEmitter();
  public onDefaultLangChange: EventEmitter<any> = new EventEmitter();

  public get(key: any): any {
    return of(key);
  }
}
const selectPermissionsDataJson = {
  status: 'success',
  message: null,
  data: [
    {
      id: 'link_notification',
      read: true,
      write: true,
      update: true,
      delete: true,
      check: false,
    },
    {
      id: 'link_merchant_reports',
      read: true,
      write: true,
      update: true,
      delete: true,
      check: false,
    },
    {
      id: 'link_emv_data',
      read: true,
      write: true,
      update: true,
      delete: true,
      check: false,
    },
    {
      id: 'link_dashboard',
      read: true,
      write: true,
      update: true,
      delete: true,
      check: false,
    },
    {
      id: 'link_status',
      read: true,
      write: true,
      update: true,
      delete: true,
      check: false,
    },
    {
      id: 'link_deployed_router',
      read: true,
      write: true,
      update: true,
      delete: true,
      check: false,
    },
    {
      id: 'link_exports',
      read: true,
      write: true,
      update: true,
      delete: true,
      check: false,
    },
    {
      id: 'link_merchant',
      read: true,
      write: true,
      update: true,
      delete: true,
      check: true,
    },
    {
      id: 'link_rule',
      read: true,
      write: true,
      update: true,
      delete: true,
      check: false,
    },
    {
      id: 'link_workflow_rule',
      read: true,
      write: true,
      update: true,
      delete: true,
      check: false,
    },
    {
      id: 'link_location',
      read: true,
      write: true,
      update: true,
      delete: true,
      check: true,
    },
    {
      id: 'link_deployment_schedule',
      read: true,
      write: true,
      update: true,
      delete: true,
      check: false,
    },
    {
      id: 'link_routing_rule',
      read: true,
      write: true,
      update: true,
      delete: true,
      check: false,
    },
    {
      id: 'link_view_settings',
      read: true,
      write: true,
      update: true,
      delete: true,
      check: false,
    },
    {
      id: 'link_user_roles',
      read: true,
      write: true,
      update: true,
      delete: true,
      check: false,
    },
    {
      id: 'link_exception_queue',
      read: true,
      write: true,
      update: true,
      delete: true,
      check: false,
    },
    {
      id: 'link_l3_adapters',
      read: true,
      write: true,
      update: true,
      delete: true,
      check: true,
    },
    {
      id: 'link_acquirer_id_config',
      read: true,
      write: true,
      update: true,
      delete: true,
      check: false,
    },
    {
      id: 'link_deployment_l2json',
      read: true,
      write: true,
      update: true,
      delete: true,
      check: false,
    },
    {
      id: 'link_audit_log',
      read: true,
      write: true,
      update: true,
      delete: true,
      check: false,
    },
    {
      id: 'link_access_log',
      read: true,
      write: true,
      update: true,
      delete: true,
      check: false,
    },
    {
      id: 'link_routing_router',
      read: true,
      write: true,
      update: true,
      delete: true,
      check: false,
    },
    {
      id: 'link_device_types',
      read: true,
      write: true,
      update: true,
      delete: true,
      check: false,
    },
    {
      id: 'link_mid',
      read: true,
      write: true,
      update: true,
      delete: true,
      check: false,
    },
    {
      id: 'link_bin_table',
      read: true,
      write: true,
      update: true,
      delete: true,
      check: false,
    },
    {
      id: 'link_lookup_values',
      read: true,
      write: true,
      update: true,
      delete: true,
      check: true,
    },
    {
      id: 'link_velocity',
      read: true,
      write: true,
      update: true,
      delete: true,
      check: false,
    },
    {
      id: 'link_countries',
      read: true,
      write: true,
      update: true,
      delete: true,
      check: false,
    },
    {
      id: 'link_deployment_clusters',
      read: true,
      write: true,
      update: true,
      delete: true,
      check: false,
    },
    {
      id: 'link_saf_queue',
      read: true,
      write: true,
      update: true,
      delete: true,
      check: false,
    },
    {
      id: 'link_acquirer_mapping',
      read: true,
      write: true,
      update: true,
      delete: true,
      check: false,
    },
    {
      id: 'link_country_states',
      read: true,
      write: true,
      update: true,
      delete: true,
      check: false,
    },
    {
      id: 'link_device',
      read: true,
      write: true,
      update: true,
      delete: true,
      check: true,
    },
    {
      id: 'link_el_function',
      read: true,
      write: true,
      update: true,
      delete: true,
      check: false,
    },
    {
      id: 'link_router',
      read: true,
      write: true,
      update: true,
      delete: true,
      check: false,
    },
    {
      id: 'link_imf',
      read: true,
      write: true,
      update: true,
      delete: true,
      check: false,
    },
    {
      id: 'link_pending_approvals',
      read: true,
      write: true,
      update: true,
      delete: true,
      check: false,
    },
    {
      id: 'link_invalid_txn_log',
      read: true,
      write: true,
      update: true,
      delete: true,
      check: false,
    },
    {
      id: 'link_currencies',
      read: true,
      write: true,
      update: true,
      delete: true,
      check: false,
    },
    {
      id: 'link_institution',
      read: true,
      write: true,
      update: true,
      delete: true,
      check: true,
    },
    {
      id: 'link_tag_rule',
      read: true,
      write: true,
      update: true,
      delete: true,
      check: false,
    },
    {
      id: 'link_user',
      read: true,
      write: true,
      update: true,
      delete: true,
      check: false,
    },
    {
      id: 'link_processor_adapter',
      read: true,
      write: true,
      update: true,
      delete: true,
      check: false,
    },
    {
      id: 'link_txn_log',
      read: true,
      write: true,
      update: true,
      delete: true,
      check: false,
    },
    {
      id: 'link_l1_adapters',
      read: true,
      write: true,
      update: true,
      delete: true,
      check: true,
    },
    {
      id: 'link_deployment_history',
      read: true,
      write: true,
      update: true,
      delete: true,
      check: false,
    },
    {
      id: 'link_monitoring',
      read: false,
      write: false,
      update: false,
      delete: false,
      check: false,
    },
    {
      id: 'link_extractor',
      read: true,
      write: true,
      update: true,
      delete: true,
      check: false,
    },
    {
      id: 'link_deployment_status',
      read: true,
      write: true,
      update: true,
      delete: true,
      check: false,
    },
    {
      id: 'link_workflow_router',
      read: true,
      write: true,
      update: true,
      delete: true,
      check: false,
    },
    {
      id: 'link_workflow',
      read: true,
      write: true,
      update: true,
      delete: true,
      check: false,
    },
  ],
};
const selectL3AdapterListJson = {
  status: 'success',
  message: 'Find Adaptor-List',
  data: {
    'total-record': 25,
    'page-no': 1,
    adaptorlist: [
      {
        id: 120,
        template: 'JSON',
        name: 'l3JSON17',
        adapterConfigSummaryUIWapper: [
          {
            id: 1075,
            version: 0,
            status: null,
            action: ['V', 'M', 'D'],
          },
        ],
        status: null,
        version: 0,
        action: ['V', 'M', 'D'],
      },
    ],
    'total-filtered-record': 20,
  },
};
const getIfmListJson = {
  status: 'success',
  message: 'Find all imfStructure',
  data: {
    'total-record': 16,
    'page-no': 1,
    imfStructureList: [
      {
        id: 22,
        name: 'IMF Structure 0',
        version: 0,
      },
    ],
    'total-filtered-record': 10,
  },
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
const event = {
  action: ['V', 'M'],
  id: 1114,
  status: null,
  version: 1,
};
const row = {
  id: 145,
  template: 'ISO8583-v1987 (ASCII)',
  name: 'asdasdas',
  adapterConfigSummaryUIWapper: [
    {
      id: 1114,
      version: 1,
      status: null,
      action: ['V', 'M'],
    },
  ],
  status: null,
  version: 1,
  action: ['V', 'M'],
};

xdescribe('L3AdaptersComponent', () => {
  let component: L3AdaptersComponent;
  let fixture: ComponentFixture<L3AdaptersComponent>;
  let mockStore: MockStore<IAppState>;
  let mockselectViewSettingsList: MemoizedSelector<any, any>;
  let mockselectPermissionsData: MemoizedSelector<any, any>;
  let mockselectL3AdapterList: MemoizedSelector<any, any>;
  let mockgetIfmList: MemoizedSelector<any, any>;
  let mockselectVersionData: MemoizedSelector<any, any>;
  let translateService: TranslateService;
  const importFileService = jasmine.createSpyObj('ImportFileService', ['clearData']);
  beforeEach(() => {
    const translateService = jasmine.createSpyObj('TranslateService', ['get', 'setDefaultLang']);
    const alertService = jasmine.createSpyObj('AlertService, SnotifyService', ['responseMessage']);
    TestBed.configureTestingModule({
      declarations: [L3AdaptersComponent],
      providers: [
        SnotifyService,
        L3AdapterService,
        L1AdapterService,
        { provide: TranslateService, useClass: translateServiceMock },
        { provide: 'SnotifyToastConfig', useValue: {} },
        { provide: ImportFileService, useValue: importFileService },
        { provide: AlertService, useValue: alertService },

        provideMockStore(),
      ],
      imports: [
        SharedModule,
        BrowserAnimationsModule,
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
        CommonModule,
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    mockStore = TestBed.inject(MockStore);
    fixture = TestBed.createComponent(L3AdaptersComponent);
    component = fixture.componentInstance;

    mockselectViewSettingsList = mockStore.overrideSelector(
      selectViewSettingsList,
      selectViewSettingsListJson,
    );
    mockselectPermissionsData = mockStore.overrideSelector(
      selectPermissionsData,
      selectPermissionsDataJson,
    );
    mockselectL3AdapterList = mockStore.overrideSelector(
      selectL3AdapterList,
      selectL3AdapterListJson,
    );
    mockgetIfmList = mockStore.overrideSelector(getIfmList, getIfmListJson);
    translateService = TestBed.inject(TranslateService);
    mockStore.refreshState();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should call changeRow function', fakeAsync(() => {
    component.changeRow(event, row);
    expect(component.changeRow).toBeDefined;
    expect(component.changeRow).toHaveBeenCalled;
  }));
  it('should call deleteRow function', fakeAsync(() => {
    const rowd = {
      id: 76,
      template: 'ISO8583-v1987 (ASCII)',
      name: 'L3_3Jun22',
      adapterConfigSummaryUIWapper: [
        {
          id: 987,
          version: 0,
          status: null,
          action: ['V', 'M', 'D'],
        },
      ],
      status: null,
      version: 0,
      action: ['V', 'M', 'D'],
    };
    component.deleteRow(rowd);
    expect(component.deleteRow).toBeDefined;
    expect(component.deleteRow).toHaveBeenCalled;
  }));
  it('should call copyClick function', () => {
    component.copyClick(row);
    expect(component.isSaveCopy).toEqual(false);
    expect(component.visibleCopyAnimate).toEqual(false);
  });
  it('should call getRowData function', () => {
    component.getRowData(row);
    expect(component.getRowData).toBeDefined;
  });
  it('should call viewRowData function', () => {
    component.viewRowData(row);
    expect(component.viewRowData).toBeDefined;
  });
  it('should call loadPage function', () => {
    const adapter = Object.getPrototypeOf(component);
    const pagenumber = 1;
    adapter.loadPage(pagenumber);
    expect(adapter.request).toEqual(false);
  });
  it('should call copyCancel function', () => {
    component.copyCancel();
    expect(component.visibleCopyAnimate).toEqual(false);
  });
  it('should call saveCopy function', () => {
    const formData = new FormData();
    component.saveCopy();
    expect(component.isSaveCopy).toEqual(false);
    expect(component.visibleCopy).toEqual(false);
  });

  it('Scroll fuction should call', () => {
    const offsety = {
      isTrusted: true,
      bubbles: false,
      cancelBubble: false,
      cancelable: false,
      composed: false,
      currentTarget: 'datatable-body.datatable-body',
      defaultPrevented: false,
      eventPhase: 2,
      path: [],
      returnValue: true,
      srcElement: 'datatable-body.datatable-body',
      target: 'datatable-body.datatable-body',
      timeStamp: 7988.599999904633,
      type: 'scroll',
    };
    component.onScroll(offsety);
    expect(component.onScroll).toBeDefined;
    expect(component.onScroll).toHaveBeenCalled;
  });

  it('should call checkDelete function', () => {
    component.checkDelete(row);
    expect(component.checkDelete).toBeDefined;
    expect(component.checkDelete).toHaveBeenCalled;
  });
  it('should call checkEdit function', () => {
    component.checkEdit(row);
    expect(component.checkEdit).toBeDefined;
    expect(component.checkEdit).toHaveBeenCalled;
  });

  afterEach(() => {
    fixture.destroy();
  });
});
