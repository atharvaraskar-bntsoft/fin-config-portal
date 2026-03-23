import { ComponentFixture, fakeAsync, TestBed, waitForAsync } from '@angular/core/testing';

import { CurrenciesComponent } from './currencies.component';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { MockStoreModule } from '@app/tests/tests.module';
import { MemoizedSelector, Store, StoreModule } from '@ngrx/store';
import { RouterTestingModule } from '@angular/router/testing';
import { selectFilterData } from '@app/store/selectors/filter.selectors';
import { selectViewSettingsList } from '@app/store/selectors/view-settings.selector';
import { selectPermissionsData } from '@app/store/selectors/permission.selectors';
import { selectCurrenciesList } from '@app/store/selectors/currencies.selector';
import { EventEmitter } from '@angular/core';
import { of } from 'rxjs';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { IAppState } from '@app/store/state/app.state';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { SnotifyService } from 'ng-snotify';
import { ImportFileService } from '@app/services/import-file.service';
import { AlertService } from '@app/services/alert.service';
import { SharedModule } from '@app/shared/shared.module';
import { AlertModule, DatePickerRvModule, TabsModule } from 'bnt';
import { HttpClientTestingModule } from '@angular/common/http/testing';
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
const selectCurrenciesListJson = {
  status: 'success',
  message: 'null',
  data: {
    'total-record': 178,
    'page-no': 1,
    currencyList: [
      {
        id: 184,
        code: 'TJS',
        isoCode: '972',
        currencyName: 'Somoni',
        active: true,
        currencyMinorUnit: '2',
        deleted: '0',
      },
      {
        id: 183,
        code: 'STD',
        isoCode: '678',
        currencyName: 'Dobra',
        active: true,
        currencyMinorUnit: '2',
        deleted: '0',
      },
      {
        id: 182,
        code: 'LRD',
        isoCode: '430',
        currencyName: 'Liberian Dollar',
        active: true,
        currencyMinorUnit: '2',
        deleted: '0',
      },
      {
        id: 181,
        code: 'IQD',
        isoCode: '368',
        currencyName: 'Iraqi Dinar',
        active: true,
        currencyMinorUnit: '3',
        deleted: '0',
      },
      {
        id: 180,
        code: 'ERN',
        isoCode: '232',
        currencyName: 'Nakfa',
        active: true,
        currencyMinorUnit: '2',
        deleted: '0',
      },
      {
        id: 179,
        code: 'KMF',
        isoCode: '174',
        currencyName: 'Comoro Franc',
        active: true,
        currencyMinorUnit: '0',
        deleted: '0',
      },
      {
        id: 177,
        code: 'AWG',
        isoCode: '533',
        currencyName: 'Aruban Guilder',
        active: true,
        currencyMinorUnit: '2',
        deleted: '0',
      },
      {
        id: 174,
        code: 'NAF',
        isoCode: '000',
        currencyName: 'Netherlands Antilles Florin',
        active: true,
        currencyMinorUnit: '2',
        deleted: '0',
      },
      {
        id: 173,
        code: 'ZWD',
        isoCode: '716',
        currencyName: 'Zimbabwe Dollar',
        active: true,
        currencyMinorUnit: '2',
        deleted: '0',
      },
      {
        id: 172,
        code: 'ZAL',
        isoCode: '991',
        currencyName: 'South African Financial',
        active: true,
        currencyMinorUnit: '0',
        deleted: '0',
      },
      {
        id: 170,
        code: 'YER',
        isoCode: '886',
        currencyName: 'Yemeni Rial',
        active: true,
        currencyMinorUnit: '2',
        deleted: '0',
      },
      {
        id: 169,
        code: 'XPF',
        isoCode: '953',
        currencyName: 'CFP Franc',
        active: true,
        currencyMinorUnit: '0',
        deleted: '0',
      },
      {
        id: 168,
        code: 'XOF',
        isoCode: '952',
        currencyName: 'CFA Franc Bceao',
        active: true,
        currencyMinorUnit: '0',
        deleted: '0',
      },
      {
        id: 167,
        code: 'XCD',
        isoCode: '951',
        currencyName: 'East Caribbean Dollar',
        active: true,
        currencyMinorUnit: '2',
        deleted: '0',
      },
      {
        id: 166,
        code: 'XAF',
        isoCode: '950',
        currencyName: 'CFA Franc Beac',
        active: true,
        currencyMinorUnit: '0',
        deleted: '0',
      },
      {
        id: 165,
        code: 'WST',
        isoCode: '882',
        currencyName: 'Samoanian Tala',
        active: true,
        currencyMinorUnit: '2',
        deleted: '0',
      },
      {
        id: 164,
        code: 'VUV',
        isoCode: '548',
        currencyName: 'Vanuatu Vatu',
        active: true,
        currencyMinorUnit: '0',
        deleted: '0',
      },
      {
        id: 163,
        code: 'VND',
        isoCode: '704',
        currencyName: 'Vietnamese Dong',
        active: true,
        currencyMinorUnit: '0',
        deleted: '0',
      },
      {
        id: 162,
        code: 'VEB',
        isoCode: '862',
        currencyName: 'Venezuelan Bolivar',
        active: true,
        currencyMinorUnit: '2',
        deleted: '0',
      },
      {
        id: 161,
        code: 'UZS',
        isoCode: '860',
        currencyName: 'Uzbekistan Sum',
        active: true,
        currencyMinorUnit: '2',
        deleted: '0',
      },
    ],
    'total-filtered-record': 20,
  },
};
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
const selectFilterDataJson = {
  status: null,
  message: null,
  data: {
    status: [
      {
        id: '1',
        name: 'Active',
      },
      {
        id: '2',
        name: 'Inactive',
      },
    ],
  },
};
const eventData: HTMLSelectElement = { id: '1', name: 'Active' } as HTMLSelectElement;
describe('CurrenciesComponent', () => {
  let component: CurrenciesComponent;
  let fixture: ComponentFixture<CurrenciesComponent>;
  let mockStore: MockStore<IAppState>;
  let mockselectViewSettingsList: MemoizedSelector<any, any>;
  let mockselectPermissionsData: MemoizedSelector<any, any>;
  let mockselectCurrenciesList: MemoizedSelector<any, any>;
  let mockselectFilterData: MemoizedSelector<any, any>;
  let translateService: TranslateService;
  const importFileService = jasmine.createSpyObj('ImportFileService', ['clearData']);
  beforeEach(() => {
    const translateService = jasmine.createSpyObj('TranslateService', ['get', 'setDefaultLang']);
    const alertService = jasmine.createSpyObj('AlertService, SnotifyService', ['responseMessage']);
    TestBed.configureTestingModule({
      declarations: [CurrenciesComponent],
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
        StoreModule.forRoot({}),
        CommonModule
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    mockStore = TestBed.inject(MockStore);
    fixture = TestBed.createComponent(CurrenciesComponent);
    component = fixture.componentInstance;

    mockselectViewSettingsList = mockStore.overrideSelector(
      selectViewSettingsList,
      selectViewSettingsListJson,
    );
    mockselectPermissionsData = mockStore.overrideSelector(
      selectPermissionsData,
      selectPermissionsDataJson,
    );
    mockselectCurrenciesList = mockStore.overrideSelector(
      selectCurrenciesList,
      selectCurrenciesListJson,
    );
    mockselectFilterData = mockStore.overrideSelector(selectFilterData, selectFilterDataJson);

    translateService = TestBed.inject(TranslateService);
    mockStore.refreshState();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('openModal fuction should open the Modal', () => {
    component.open();
    expect(component.visibleAnimate).toEqual(false);
  });
  it('cancel fuction should cancel the Modal', () => {
    component.cancel();
    expect(component.visible).toEqual(false);
  });
  it('resetSearch fuction searchResetButton open the Modal', () => {
    component.resetSearch();
    expect(component.searchResetButton).toEqual(true);
  });
  it('getFilterNameData should have a resetSearch', () => {
    component.getFilterNameData(eventData);
    expect(component.searchResetButton).toEqual(true);
    component.resetSearch();
    component.getFilterNameData(eventData);
  });
  it('should call getFilterStatus function', fakeAsync(() => {
    const data = { id: '1' };
    component.getFilterStatus(data);
    expect(component.getFilterStatus).toBeDefined;
    expect(component.getFilterStatus).toHaveBeenCalled;
  }));

  it('Scroll fuction should call', () => {
    component.onScroll(event);
    expect(component.onScroll).toBeDefined;
    expect(component.onScroll).toHaveBeenCalled;
  });
  it('resetUpload fuction searchResetButton open the Modal', () => {
    component.resetUpload();
    expect(component.resetUpload).toBeDefined;
    expect(component.resetUpload).toHaveBeenCalled;
  });
  afterEach(() => {
    fixture.destroy();
  });
});
