import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { AlertService } from '@app/services/alert.service';
import { CorePropertiesService } from '@app/services/core-properties.service';
import { HttpLoaderFactory, MyMissingTranslationHandler } from '@app/shared/shared.module';
import { NgSelectModule } from '@ng-select/ng-select';
import {
  MissingTranslationHandler,
  TranslateLoader,
  TranslateModule,
  TranslateService,
} from '@ngx-translate/core';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { SnotifyService } from 'ng-snotify';
import { AlertModule, DatePickerRvModule, TabsModule } from 'bnt';
import { CorePropertiesComponent } from './core-properties.component';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { ActivatedRoute, convertToParamMap, Router } from '@angular/router';
import { of } from 'rxjs';
import { selectCorePropertiesListGet } from '@app/store/selectors/core-properties.selector';
import { selectViewSettingsList } from '@app/store/selectors/view-settings.selector';
import { selectPermissionsData } from '@app/store/selectors/permission.selectors';
import { IAppState } from '@app/store/state/app.state';
import { CorePropertiesMockService } from '@app/tests/mock-service/core-properties.service.mock';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatMenuModule } from '@angular/material/menu';

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

const rowList = {
  status: 'success',
  message: null,
  data: {
    corePropertiesList: [
      {
        type: 'L2',
        name: 'XUZ',
        subType: 'Core',
        corePropertiesDetails: [
          {
            id: 29,
            version: 0,
          },
        ],
      },
    ],
    'total-record': 1,
    'page-no': 1,
    'total-filtered-record': 1,
  },
};

const rowJsonList = [
  {
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
  },
];

const permissionJSON = {
   data: [{
    check: false,
    delete: true,
    id: "link_deployment_history",
    read: true,
    update: true,
    write: true
  }], 
  message: null,
  status: 'success',
};

const rowData = {
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

const ActivatedRouteSpy = {
  snapshot: {
    paramMap: convertToParamMap({
      some: 'some',
      else: 'else',
    }),
  },
  queryParamMap: of(
    convertToParamMap({
      some: 'some',
      else: 'else',
    }),
  ),
};

xdescribe('CorePropertiesComponent', () => {
  let component: CorePropertiesComponent;
  let fixture: ComponentFixture<CorePropertiesComponent>;
  let mockStore: MockStore<IAppState>;
  let mockselectCorePropertiesListGet;
  let MockselectViewSettingsList;
  let mockselectPermissionsData;
  let setDefaultLangSpy: jasmine.Spy;

  beforeEach(() => {
    const translateService = jasmine.createSpyObj('TranslateService', ['get', 'setDefaultLang']);
    const RouterSpy = jasmine.createSpyObj('Router', ['navigate']);
    TestBed.configureTestingModule({
      declarations: [CorePropertiesComponent],
      imports: [
        NgSelectModule,
        FormsModule,
        ReactiveFormsModule,
        BrowserAnimationsModule,
        AlertModule,
        TabsModule,
        DatePickerRvModule,
        RouterTestingModule,
        MatMenuModule,
        HttpClientTestingModule,
        NgxDatatableModule,
        MatDialogModule,
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
      providers: [
        { provide: TranslateService, useValue: translateService },
        AlertService,
        SnotifyService,
        { provide: 'SnotifyToastConfig', useValue: {} },
        CorePropertiesService,
        { provide: MatDialogRef, useValue: {} },
        { provide: MAT_DIALOG_DATA, useValue: { corePropertyData: [] } },
        { provide: ActivatedRoute, useValue: ActivatedRouteSpy },
        { provide: CorePropertiesService, useClass: CorePropertiesMockService },
        { provide: Router, useValue: RouterSpy },
        provideMockStore(),
        // other providers
      ],
    }).compileComponents();
    setDefaultLangSpy = translateService.get.and.returnValue(of([]));
    fixture = TestBed.createComponent(CorePropertiesComponent);
    mockStore = TestBed.get(MockStore);

    component = fixture.componentInstance;
    mockselectCorePropertiesListGet = mockStore.overrideSelector(
      selectCorePropertiesListGet,
      rowList,
    );

    MockselectViewSettingsList = mockStore.overrideSelector(
      selectViewSettingsList,
      selectViewSettingsListJSON,
    );

    mockselectPermissionsData = mockStore.overrideSelector(selectPermissionsData, permissionJSON);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should  Angular calls ngOnInit', () => {
    component.ngOnInit();
  });

  it('loadPage fuction should call after load the component', () => {
    spyOn(component, '_transFilters').and.callThrough();
    component.loadPage(1);
    expect(component.request).toBe(false);
    expect(component._transFilters).toHaveBeenCalled();
  });

  it('should render Table', () => {
    const ngxdatatable: HTMLElement = fixture.nativeElement.querySelector('ngx-datatable');
    const text = ngxdatatable.innerText;
    expect(text).toBeTruthy();
  });

  it('deleteCoreProperties fuction should call click on delete  form HTMl', () => {
    component.deleteCoreProperties(rowData);
  });

  it('editCoreProperties fuction should call click on edit form this HTMl', () => {
    component.editCoreProperties(rowData);
    expect(component.router.navigate).toHaveBeenCalled();
  });

  it('changeRow fuction should call change value from the drop ', () => {
    component.changeRow();
  });

  it('Component should contain Property', () => {
    expect(component.loading).toBe(false);
    expect(component.coreProperties).toBeTruthy();
    expect(component.rowHeight).toBe(45);
    expect(component.permissionObject).toEqual({
      check: null,
      delete: null,
      id: '',
      read: null,
      update: null,
      write: null,
    });
    expect(component.corePropertiesId).toBe('link_l1_adapters');
    expect(component.request).toBe(false);
    expect(component._page).toBe(1);
    expect(component.currentPagination).toBe('20');
  });

  afterEach(() => {
    fixture.destroy();
  });
});
