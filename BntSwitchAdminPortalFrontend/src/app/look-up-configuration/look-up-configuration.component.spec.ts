import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { LookUpConfigurationComponent } from './look-up-configuration.component';
import { IAppState } from '@app/store/state/app.state';
import { MemoizedSelector } from '@ngrx/store';
import {
  MissingTranslationHandler,
  TranslateLoader,
  TranslateModule,
  TranslateService,
} from '@ngx-translate/core';
import { RouterTestingModule } from '@angular/router/testing';
import { selectLookUpTypeList } from '@app/store/selectors/look-up-configuration.selector';
import { selectViewSettingsList } from '@app/store/selectors/view-settings.selector';
import { of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { HttpLoaderFactory, MyMissingTranslationHandler } from '@app/shared/shared.module';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { SharedModule } from '@app/shared/shared.module';
import { Router } from '@angular/router';

const lookupTypeListJson = {
  data: {
    'page-no': 1,
    resultList: [
      {
        description: 'LookUpNew',
        id: 23,
        modifiable: '1',
        name: 'LookUpNew',
      },
    ],
    'total-filtered-record': 20,
    'total-record': 23,
  },
  message: 'Find all Records',
  status: 'success',
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

const rowData = {
  description: 'LookUpNew',
  id: 23,
  modifiable: '1',
  name: 'LookUpNew',
};

describe('LookUpConfigurationComponent', () => {
  let component: LookUpConfigurationComponent;
  let fixture: ComponentFixture<LookUpConfigurationComponent>;
  let mockStore: MockStore<IAppState>;
  let mockselectLookUpTypeList: MemoizedSelector<any, any>;
  let mockselectViewSettingsList: MemoizedSelector<any, any>;
  let translate: TranslateService;
  let setDefaultLangSpy: jasmine.Spy;
  let routerSpy = { navigate: jasmine.createSpy('navigate') };

  beforeEach(() => {
    const translateService = jasmine.createSpyObj('TranslateService', ['get', 'setDefaultLang']);
    TestBed.configureTestingModule({
      declarations: [LookUpConfigurationComponent],
      providers: [
      { provide: TranslateService, useValue: translateService },
      { provide: Router, useValue: routerSpy },
      provideMockStore()
    ],
      imports: [
        RouterTestingModule,
        SharedModule,
        NgxDatatableModule,
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

    mockStore = TestBed.inject(MockStore);
    fixture = TestBed.createComponent(LookUpConfigurationComponent);
    component = fixture.componentInstance;
    mockselectLookUpTypeList = mockStore.overrideSelector(selectLookUpTypeList, lookupTypeListJson);

    mockselectViewSettingsList = mockStore.overrideSelector(
      selectViewSettingsList,
      viewsettingJSON,
    );

    setDefaultLangSpy = translateService.get.and.returnValue(of([]));

    mockStore.refreshState();
    fixture.detectChanges();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LookUpConfigurationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should run ngOnInIt', () => {
    component.ngOnInit();
    expect(component.currentPagination).toBe('20');
    expect(component.currentLang).toBe('en_EN1');
    expect(component.request).toBe(true);
  });

  it('should render Table', () => {
    const ngxdatatable: HTMLElement = fixture.nativeElement.querySelector('ngx-datatable');
    const text = ngxdatatable.innerText;
    expect(text).toBeTruthy();
  });

  it('configure() should work when clicked', () => {
    component.configure(rowData);
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/look-up-configuration/detail/', 23]);
  });

  it('loadData() should work', () => {
    component.loadData();
    expect(component.request).toBe(true);
  });

  afterEach(() => {
    fixture.destroy();
  });
});
