

import { CountryStatesComponent } from './country-states.component';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { NgSelectModule } from '@ng-select/ng-select';
import { RouterTestingModule } from '@angular/router/testing';
import { ComponentFixture, fakeAsync, TestBed } from '@angular/core/testing';
import { SharedModule } from '@app/shared/shared.module';
import { IAppState } from '@app/store/state/app.state';
import { selectViewSettingsList } from '@app/store/selectors/view-settings.selector';
import { of } from 'rxjs';
import { MissingTranslationHandler, TranslateLoader, TranslateModule, TranslateService } from '@ngx-translate/core';

import { HttpLoaderFactory, MyMissingTranslationHandler } from '@app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { MemoizedSelector, Store, StoreModule } from '@ngrx/store';
import { AlertService } from '@app/services/alert.service';
import { SnotifyService, ToastDefaults } from 'ng-snotify';
import { NzModalService } from 'ng-zorro-antd/modal';
import { AlertModule, DatePickerRvModule } from 'bnt';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CommonModule } from '@angular/common';
import { selectPermissionsData } from '@app/store/selectors/permission.selectors';
import { CountryStatesService } from '@app/services/country-states.service';
import { ActivatedRoute, convertToParamMap, Router, RouterModule } from '@angular/router';
import { IPermissionResponse } from '@app/models/permission.interface';
import { EventEmitter } from '@angular/core';
import { selectCountryStatesList } from '../../store/selectors/country-state-scheme.selector';
import { FilterService } from '@app/services/filter.service';
import { selectFilterData } from '@app/store/selectors/filter.selectors';

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

class filterServiceMock {
  public populateFilterData(payloadUrl) {

    return of(filterJson);
  }
}

const filterJson =
{
  status: null,
  message: null,
  data: {
    country:
      [
        { "code": "GBR", "name": "UK", "id": "1", "shortCode": "GB" },
        { "code": "USA", "name": "USA", "id": "2", "shortCode": "US" },
        { "code": "ESP", "name": "Spain", "id": "3", "shortCode": "ES" },
      ],
    status:
      [
        { "id": "1", "name": "Active" },
        { "id": "2", "name": "Inactive" }
      ]
  }
}
const CountryStatesJson =
{
  status: "success",
  message: "Find all countries",
  data: {
    "total-record": 311,
    "page-no": 1,
    stateList: [
      {
        "id": 1,
        "code": "AL",
        "deleted": "0",
        "stateName": "Alabama",
        "country": {
          "id": 2,
          "code": "USA",
          "countryName": "USA",
          "currency": {
            "id": 48,
            "code": "USD",
            "isoCode": "840",
            "currencyName": "US Dollar",
            "active": true,
            "currencyMinorUnit": "2",
            "deleted": "0"
          },
          "isoCode": "840",
          "shortCode": "US",
          "isdCode": "1",
          "active": true,
          "deleted": null
        },
        "active": true
      },
      {
        "id": 2,
        "code": "AK",
        "deleted": "0",
        "stateName": "Alaska",
        "country": {
          "id": 2,
          "code": "USA",
          "countryName": "USA",
          "currency": {
            "id": 48,
            "code": "USD",
            "isoCode": "840",
            "currencyName": "US Dollar",
            "active": true,
            "currencyMinorUnit": "2",
            "deleted": "0"
          },
          "isoCode": "840",
          "shortCode": "US",
          "isdCode": "1",
          "active": true,
          "deleted": null
        },
        "active": true
      },
    ],
    "total-filtered-record": 20
  }
}

const permissionJSON: IPermissionResponse = {
  data: [{
    check: false,
    delete: true,
    id: "link_country_states",
    read: true,
    update: true,
    write: true
  }],
  status: null,
  message: null
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

describe('CountryStatesComponent', () => {
  let component: CountryStatesComponent;
  let fixture: ComponentFixture<CountryStatesComponent>;
  let store: Store<CountryStatesComponent>;
  let mockStore: MockStore<IAppState>;
  let mockselectCountryStatesList: MemoizedSelector<any, any>;
  let MockselectViewSettingsList;
  let mockselectPermissionsData;
  let setDefaultLangSpy: jasmine.Spy;
  let countryStatesService: CountryStatesService
  let filterService: FilterService;
  let mockselectFilterData;

  beforeEach((() => {
    const translateService = jasmine.createSpyObj('TranslateService', ['get', 'setDefaultLang']);
    const RouterSpy = jasmine.createSpyObj(
      'Router',
      ['navigate']
    );
    TestBed.configureTestingModule({
      declarations: [CountryStatesComponent],
      providers: [
        { provide: TranslateService, useClass: translateServiceMock },
        AlertService,
        SnotifyService,
        HttpClient,
        NzModalService,
        CountryStatesService,
        FilterService,
        { provide: CountryStatesService, useValue: countryStatesService },
        { provide: 'SnotifyToastConfig', useValue: ToastDefaults },
        { provide: FilterService, useClass: filterServiceMock },

        provideMockStore(),
        // other providers
      ],
      imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        AlertModule,
        HttpClientModule,
        SharedModule,
        StoreModule.forRoot({}),
        DatePickerRvModule,
        RouterTestingModule,
        HttpClientTestingModule,
        NgSelectModule,
        NgxDatatableModule,
        //ImportFileModule,
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
    fixture = TestBed.createComponent(CountryStatesComponent);
    component = fixture.componentInstance;
    mockStore.refreshState();
    MockselectViewSettingsList = mockStore.overrideSelector(selectViewSettingsList, selectViewSettingsListJSON);
    mockselectPermissionsData = mockStore.overrideSelector(selectPermissionsData, permissionJSON);
    mockselectFilterData = mockStore.overrideSelector(selectFilterData, filterJson);
    mockselectCountryStatesList = mockStore.overrideSelector(selectCountryStatesList, CountryStatesJson);
    setDefaultLangSpy = translateService.get.and.returnValue(of([]));
    component.countriesStateData = CountryStatesJson.data.stateList;
    component.rows = CountryStatesJson.data.stateList;;
    component.loading = false;
    fixture.detectChanges();
  }));


  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should  Angular calls ngOnInit', () => {
    component.ngOnInit();
    component.loadData();
    component.viewSettingData();
    component.permissionData();
  });

  it('openModal fuction should open the Modal', () => {
    component.open();
    expect(component.visibleAnimate).toEqual(false);
  });

  it('cancel fuction should cancel the Modal', () => {
    component.cancel();
    expect(component.visibleAnimate).toEqual(false);
  });

  it('should call getFilterStatus function', fakeAsync(() => {
    const eventData: HTMLSelectElement = { id: '1', name: 'GIP Noida' } as HTMLSelectElement;
    component.getFilterStatus(eventData);
    expect(component.getFilterStatus).toBeDefined;
    expect(component.getFilterStatus).toHaveBeenCalled;
  }));

  it('should call getFilterCountries function', fakeAsync(() => {
    const eventData: HTMLSelectElement = { id: '1', name: 'GIP Noida' } as HTMLSelectElement;
    component.getFilterCountries(eventData);
    expect(component.getFilterCountries).toBeDefined;
    expect(component.getFilterCountries).toHaveBeenCalled;
  }));

  it('should call getFilterNameData function', fakeAsync(() => {
    const eventData: HTMLSelectElement = { id: '1', name: 'USA' } as HTMLSelectElement;
    component.getFilterNameData(eventData);
    expect(component.getFilterNameData).toBeDefined;
    expect(component.getFilterNameData).toHaveBeenCalled;
    expect(component.searchResetButton).toEqual(true);
    spyOn(component, 'resetSearch').and.callThrough();
    component.resetSearch();
    expect(component.resetSearch).toHaveBeenCalled();
  }));

  it('Scroll fuction should call', () => {
    component.onScroll(event);
    expect(component.onScroll).toBeDefined;
    expect(component.onScroll).toHaveBeenCalled;
  });

  it('resetSearch fuction searchResetButton open the Modal', () => {
    component.resetSearch();
    expect(component.searchResetButton).toEqual(true);
  });

  it('openModal fuction should open the Modal', () => {
    component.resetFilterSearch();
    expect((component as any).filter).toEqual({});
    expect((component as any)._filters).toEqual([]);
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
