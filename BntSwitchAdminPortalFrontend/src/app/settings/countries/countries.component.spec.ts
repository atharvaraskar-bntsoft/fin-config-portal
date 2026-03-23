import { ComponentFixture, fakeAsync, TestBed, waitForAsync } from '@angular/core/testing';

import { CountriesComponent } from './countries.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { RouterTestingModule } from '@angular/router/testing';
import { MemoizedSelector, Store, StoreModule } from '@ngrx/store';
import { MockStoreModule } from '@app/tests/tests.module';
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
import { selectViewSettingsList } from '@app/store/selectors/view-settings.selector';
import { selectPermissionsData } from '@app/store/selectors/permission.selectors';
import { selectCountriesList } from '@app/store/selectors/countries.selector';
import { selectFilterData } from '@app/store/selectors/filter.selectors';
import { CommonModule } from '@angular/common';
class translateServiceMock {
  public onLangChange: EventEmitter<any> = new EventEmitter();
  public onTranslationChange: EventEmitter<any> = new EventEmitter();
  public onDefaultLangChange: EventEmitter<any> = new EventEmitter();

  public get(key: any): any {
    return of(key);
  }
}
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
const selectCountriesListJson = {
  status: 'success',
  message: 'Find all Country',
  data: {
    'total-record': 248,
    'page-no': 1,
    countryList: [
      {
        id: 251,
        code: 'GEA',
        countryName: 'AbKhazia',
        currency: {
          id: 40,
          code: 'RUB',
          isoCode: '643',
          currencyName: 'Russian Ruble',
          active: true,
          currencyMinorUnit: '2',
          deleted: '0',
        },
        isoCode: '643',
        shortCode: 'AB',
        isdCode: '840',
        active: true,
        deleted: null,
      },
      {
        id: 250,
        code: 'GBA',
        countryName: 'Alderney',
        currency: {
          id: 16,
          code: 'GBP',
          isoCode: '826',
          currencyName: 'Sterling Pound',
          active: true,
          currencyMinorUnit: '2',
          deleted: '0',
        },
        isoCode: '826',
        shortCode: 'GB',
        isdCode: '441481',
        active: true,
        deleted: null,
      },
      {
        id: 249,
        code: 'NLD',
        countryName: 'Netherlands',
        currency: {
          id: 14,
          code: 'EUR',
          isoCode: '978',
          currencyName: 'Euro',
          active: true,
          currencyMinorUnit: '2',
          deleted: '0',
        },
        isoCode: '528',
        shortCode: 'NL',
        isdCode: '31',
        active: true,
        deleted: null,
      },
      {
        id: 248,
        code: 'ZWE',
        countryName: 'Zimbabwe',
        currency: {
          id: 173,
          code: 'ZWD',
          isoCode: '716',
          currencyName: 'Zimbabwe Dollar',
          active: true,
          currencyMinorUnit: '2',
          deleted: '0',
        },
        isoCode: '716',
        shortCode: 'ZW',
        isdCode: '263',
        active: true,
        deleted: null,
      },
      {
        id: 247,
        code: 'ZMB',
        countryName: 'Zambia',
        currency: {
          id: 50,
          code: 'ZMW',
          isoCode: '967',
          currencyName: 'Zambian Kwacha',
          active: true,
          currencyMinorUnit: '2',
          deleted: '0',
        },
        isoCode: '894',
        shortCode: 'ZM',
        isdCode: '260',
        active: true,
        deleted: null,
      },
      {
        id: 246,
        code: 'YEM',
        countryName: 'Yemen',
        currency: {
          id: 170,
          code: 'YER',
          isoCode: '886',
          currencyName: 'Yemeni Rial',
          active: true,
          currencyMinorUnit: '2',
          deleted: '0',
        },
        isoCode: '887',
        shortCode: 'YE',
        isdCode: '967',
        active: true,
        deleted: null,
      },
      {
        id: 245,
        code: 'ESH',
        countryName: 'Western Sahara',
        currency: {
          id: 29,
          code: 'MAD',
          isoCode: '504',
          currencyName: 'Moroccan Dirham',
          active: true,
          currencyMinorUnit: '2',
          deleted: '0',
        },
        isoCode: '732',
        shortCode: 'EH',
        isdCode: '0',
        active: true,
        deleted: null,
      },
      {
        id: 244,
        code: 'WLF',
        countryName: 'Wallis And Futuna Islands',
        currency: {
          id: 169,
          code: 'XPF',
          isoCode: '953',
          currencyName: 'CFP Franc',
          active: true,
          currencyMinorUnit: '0',
          deleted: '0',
        },
        isoCode: '876',
        shortCode: 'WF',
        isdCode: '681',
        active: true,
        deleted: null,
      },
      {
        id: 243,
        code: 'VIR',
        countryName: 'US Virgin Islands',
        currency: {
          id: 48,
          code: 'USD',
          isoCode: '840',
          currencyName: 'US Dollar',
          active: true,
          currencyMinorUnit: '2',
          deleted: '0',
        },
        isoCode: '850',
        shortCode: 'VI',
        isdCode: '001-340',
        active: true,
        deleted: null,
      },
      {
        id: 242,
        code: 'VGB',
        countryName: 'British Virgin Islands',
        currency: {
          id: 48,
          code: 'USD',
          isoCode: '840',
          currencyName: 'US Dollar',
          active: true,
          currencyMinorUnit: '2',
          deleted: '0',
        },
        isoCode: '092',
        shortCode: 'VG',
        isdCode: '001-284',
        active: true,
        deleted: null,
      },
      {
        id: 241,
        code: 'VNM',
        countryName: 'Vietnam',
        currency: {
          id: 163,
          code: 'VND',
          isoCode: '704',
          currencyName: 'Vietnamese Dong',
          active: true,
          currencyMinorUnit: '0',
          deleted: '0',
        },
        isoCode: '704',
        shortCode: 'VN',
        isdCode: '84',
        active: true,
        deleted: null,
      },
      {
        id: 240,
        code: 'VEN',
        countryName: 'Venezuela Bolivarian Republic Of',
        currency: {
          id: 162,
          code: 'VEB',
          isoCode: '862',
          currencyName: 'Venezuelan Bolivar',
          active: true,
          currencyMinorUnit: '2',
          deleted: '0',
        },
        isoCode: '862',
        shortCode: 'VE',
        isdCode: '58',
        active: true,
        deleted: null,
      },
      {
        id: 239,
        code: 'VUT',
        countryName: 'Vanuatu',
        currency: {
          id: 164,
          code: 'VUV',
          isoCode: '548',
          currencyName: 'Vanuatu Vatu',
          active: true,
          currencyMinorUnit: '0',
          deleted: '0',
        },
        isoCode: '548',
        shortCode: 'VU',
        isdCode: '678',
        active: true,
        deleted: null,
      },
      {
        id: 238,
        code: 'UZB',
        countryName: 'Uzbekistan',
        currency: {
          id: 161,
          code: 'UZS',
          isoCode: '860',
          currencyName: 'Uzbekistan Sum',
          active: true,
          currencyMinorUnit: '2',
          deleted: '0',
        },
        isoCode: '860',
        shortCode: 'UZ',
        isdCode: '998',
        active: true,
        deleted: null,
      },
      {
        id: 237,
        code: 'URY',
        countryName: 'Uruguay',
        currency: {
          id: 160,
          code: 'UYU',
          isoCode: '858',
          currencyName: 'Peso Uruguayo',
          active: true,
          currencyMinorUnit: '2',
          deleted: '0',
        },
        isoCode: '858',
        shortCode: 'UY',
        isdCode: '598',
        active: true,
        deleted: null,
      },
      {
        id: 236,
        code: 'UMI',
        countryName: 'United States Minor Outlying Islands',
        currency: {
          id: 48,
          code: 'USD',
          isoCode: '840',
          currencyName: 'US Dollar',
          active: true,
          currencyMinorUnit: '2',
          deleted: '0',
        },
        isoCode: '581',
        shortCode: 'UM',
        isdCode: '0',
        active: true,
        deleted: null,
      },
      {
        id: 235,
        code: 'UKR',
        countryName: 'Ukraine',
        currency: {
          id: 158,
          code: 'UAH',
          isoCode: '980',
          currencyName: 'Ukraine Hryvnia',
          active: true,
          currencyMinorUnit: '2',
          deleted: '0',
        },
        isoCode: '804',
        shortCode: 'UA',
        isdCode: '380',
        active: true,
        deleted: null,
      },
      {
        id: 234,
        code: 'UGA',
        countryName: 'Uganda',
        currency: {
          id: 159,
          code: 'UGX',
          isoCode: '800',
          currencyName: 'Uganda Shilling',
          active: true,
          currencyMinorUnit: '0',
          deleted: '0',
        },
        isoCode: '800',
        shortCode: 'UG',
        isdCode: '256',
        active: true,
        deleted: null,
      },
      {
        id: 233,
        code: 'TUV',
        countryName: 'Tuvalu',
        currency: {
          id: 2,
          code: 'AUD',
          isoCode: '036',
          currencyName: 'Australian Dollar',
          active: true,
          currencyMinorUnit: '2',
          deleted: '0',
        },
        isoCode: '798',
        shortCode: 'TV',
        isdCode: '688',
        active: true,
        deleted: null,
      },
      {
        id: 232,
        code: 'TCA',
        countryName: 'Turks and Caicos',
        currency: {
          id: 48,
          code: 'USD',
          isoCode: '840',
          currencyName: 'US Dollar',
          active: true,
          currencyMinorUnit: '2',
          deleted: '0',
        },
        isoCode: '796',
        shortCode: 'TC',
        isdCode: '1649',
        active: true,
        deleted: null,
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
describe('CountriesComponent', () => {
  let component: CountriesComponent;
  let fixture: ComponentFixture<CountriesComponent>;
  let mockStore: MockStore<IAppState>;
  let mockselectFilterData: MemoizedSelector<any, any>;
  let mockselectCountriesList: MemoizedSelector<any, any>;
  let mockselectViewSettingsList: MemoizedSelector<any, any>;
  let mockselectPermissionsData: MemoizedSelector<any, any>;
  let translateService: TranslateService;
  const importFileService = jasmine.createSpyObj('ImportFileService', ['clearData']);
  beforeEach(() => {
    const translateService = jasmine.createSpyObj('TranslateService', ['get', 'setDefaultLang']);
    const alertService = jasmine.createSpyObj('AlertService, SnotifyService', ['responseMessage']);
    TestBed.configureTestingModule({
      declarations: [CountriesComponent],
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
      // imports: [
      //   RouterTestingModule,
      //   FormsModule,
      //   ReactiveFormsModule,
      //   RouterTestingModule,
      //   NgSelectModule,
      //   NgxDatatableModule,
      //   MockStoreModule.forRoot('Location', {}),
      // ],
    }).compileComponents();
  });

  beforeEach(() => {
    mockStore = TestBed.inject(MockStore);
    fixture = TestBed.createComponent(CountriesComponent);
    component = fixture.componentInstance;

    mockselectViewSettingsList = mockStore.overrideSelector(
      selectViewSettingsList,
      selectViewSettingsListJson,
    );
    mockselectPermissionsData = mockStore.overrideSelector(
      selectPermissionsData,
      selectPermissionsDataJson,
    );
    mockselectCountriesList = mockStore.overrideSelector(
      selectCountriesList,
      selectCountriesListJson,
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
    expect(component.visibleAnimate).toEqual(false);
  });
  it('should call getFilterLoginResultData function', fakeAsync(() => {
    const data = { id: 'Tags' };
    component.getFilterStatusData(data);
    expect(component.getFilterStatusData).toBeDefined;
    expect(component.getFilterStatusData).toHaveBeenCalled;
  }));
  it('getFilterNameData should have a resetSearch', () => {
    component.getFilterNameData(selectFilterDataJson.data);
    expect(component.searchResetButton).toEqual(true);
    spyOn(component, 'resetSearch').and.callThrough();
    component.resetSearch();
    component.getFilterNameData(selectFilterDataJson.data);
    expect(component.resetSearch).toHaveBeenCalled();
  });
  afterEach(() => {
    fixture.destroy();
  });
});
