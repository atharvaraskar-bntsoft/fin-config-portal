import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ProcessorAdapterCreateComponent } from './processor-adapter-create.component';
import { UntypedFormControl, UntypedFormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MockStoreModule } from '@app/tests/tests.module';
import { MemoizedSelector, Store, StoreModule } from '@ngrx/store';
import { RouterTestingModule } from '@angular/router/testing';
import { IAppState } from '@app/store/state/app.state';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { selectViewSettingsList } from '@app/store/selectors/view-settings.selector';
import { EventEmitter } from '@angular/core';
import { Observable, of } from 'rxjs';
import {
  selectprocessorAdapterCreate,
  selectprocessorAdapterDetails,
  selectprocessorAdapterEdit,
  selectGetServiceList,
  selectGet13List,
} from '@app/store/selectors/processor-adapter.selector';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import {
  MissingTranslationHandler,
  TranslateLoader,
  TranslateModule,
  TranslateService,
} from '@ngx-translate/core';
import { AlertModule } from 'bnt';
import { NgSelectModule } from '@ng-select/ng-select';
import {
  HttpLoaderFactory,
  MyMissingTranslationHandler,
  SharedModule,
} from '@app/shared/shared.module';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { NzModalService } from 'ng-zorro-antd/modal';
import { AlertService } from '@app/services/alert.service';
import { SnotifyService, ToastDefaults } from 'ng-snotify';
import { data } from 'jquery';
import { ActivatedRoute, convertToParamMap } from '@angular/router';
import { HttpClient } from '@angular/common/http';

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
const selectGetServiceListJSON = [
  {
    active: '1',
    description: 'AUTH SERVICE',
    id: 30,
    lookupType: {
      description: 'Service Type',
      id: 7,
      modifiable: '0',
      name: 'Service_Type',
    },
    modifiable: '0',
    value: 'AUTH_SERVICE',
  },
];
const selectGet13ListJSON = [
  {
    id: 32,
    name: 'NEDBANK',
  },
];
const selectprocessorAdapterDetailsJSON = [
  {
    active: true,
    adapterId: {
      id: 27,
      name: 'l3_iso_tcp_client_4jan',
      type: 'L3',
    },
    code: '7677',
    createdBy: 5,
    createdOn: 1657623130000,
    description: 'ytytytytu',
    id: 18,
    isSAFEnabled: false,
    lookupvalueId: {
      active: null,
      description: 'FRAUD SERVICE',
      id: 31,
      value: 'FRAUD_SERVICE',
    },
    name: 'tytuyty',
    updatedBy: 1,
    updatedOn: 1657623203000,
  },
];
const selectprocessorAdapterEditJSON = [
  {
    data: {
      active: true,
      adapterId: {
        id: 27,
        name: 'l3_iso_tcp_client_4jan',
        type: 'L3',
      },
      code: '7677',
      createdBy: null,
      createdOn: null,
      description: 'ytytytytu',
      id: 18,
      isSAFEnabled: false,
      lookupvalueId: {
        active: null,
        description: 'FRAUD SERVICE',
        id: 31,
        value: 'FRAUD_SERVICE',
      },
      name: 'tytuyty',
      updatedBy: null,
      updatedOn: null,
    },
    message: 'Processor Adapter Updated',
    status: 'success',
  },
];
const selectprocessorAdapterCreateJSON = [{}];
const value = {
  active: true,
  adapterId: {
    id: 119,
    name: 'Sanjay_L3',
    type: 'L3',
  },
  code: '111',
  description: 'aaaaa1',
  id: 21,
  isSAFEnabled: true,
  lookupvalueId: {
    active: null,
    description: 'LOYALTY SERVICE',
    id: 56,
    value: 'LOYALTY_SERVICE',
  },
  name: 'aaaa',
};

describe('ProcessorAdapterCreateComponent', () => {
  let component: ProcessorAdapterCreateComponent;
  let fixture: ComponentFixture<ProcessorAdapterCreateComponent>;
  // let store: Store<ProcessorAdapterCreateComponent>;
  let mockStore: MockStore<IAppState>;
  let setDefaultLangSpy: jasmine.Spy;
  let mockselectViewSettingsList: MemoizedSelector<any, any>;
  let mockselectGetServiceList: MemoizedSelector<any, any>;
  let mockselectGet13List: MemoizedSelector<any, any>;
  let mockselectprocessorAdapterDetails: MemoizedSelector<any, any>;
  let mockselectprocessorAdapterEdit: MemoizedSelector<any, any>;
  let mockselectprocessorAdapterCreate: MemoizedSelector<any, any>;

  beforeEach(() => {
    const translateService = jasmine.createSpyObj('TranslateService', ['get', 'setDefaultLang']);
    const RouterSpy = jasmine.createSpyObj('Router', ['navigate']);
    TestBed.configureTestingModule({
      declarations: [ProcessorAdapterCreateComponent],
      imports: [
        ReactiveFormsModule,
        // MockStoreModule.forRoot('Location', {}),
        BrowserAnimationsModule,
        HttpClientTestingModule,
        TranslateModule,
        AlertModule,
        StoreModule.forRoot({}),
        StoreModule,
        SharedModule,
        NgSelectModule,
        FormsModule,
        RouterTestingModule,
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
      providers: [
        TranslateService,
        NzModalService,
        AlertService,
        SnotifyService,
        { provide: TranslateService, useClass: translateServiceMock },
        { provide: 'SnotifyToastConfig', useValue: ToastDefaults },
        provideMockStore(),
        // {
        //   provide: ActivatedRoute,
        //   useValue: {
        //     snapshot: {
        //       paramMap: convertToParamMap({
        //         id: '1',
        //       }),
        //       data: { ruletype: 'workflow' },
        //     },
        //   },
        // },
      ],
    }).compileComponents();
    setDefaultLangSpy = translateService.get.and.returnValue(of([]));
    mockStore = TestBed.get(Store);
    fixture = TestBed.createComponent(ProcessorAdapterCreateComponent);
    component = fixture.componentInstance;
    mockselectViewSettingsList = mockStore.overrideSelector(
      selectViewSettingsList,
      selectViewSettingsListJSON,
    );
    mockselectGetServiceList = mockStore.overrideSelector(
      selectGetServiceList,
      selectGetServiceListJSON,
    );
    mockselectGet13List = mockStore.overrideSelector(selectGet13List, selectGet13ListJSON);
    mockselectprocessorAdapterDetails = mockStore.overrideSelector(
      selectprocessorAdapterDetails,
      selectprocessorAdapterDetailsJSON,
    );
    mockselectprocessorAdapterEdit = mockStore.overrideSelector(
      selectprocessorAdapterEdit,
      selectprocessorAdapterEditJSON,
    );
    mockselectprocessorAdapterCreate = mockStore.overrideSelector(
      selectprocessorAdapterCreate,
      selectprocessorAdapterCreateJSON,
    );
    mockStore.refreshState();
    fixture.detectChanges();
  });

  it('open fuction should open the status', () => {
    component.checkStatus();
    expect(component.currentItem).toBeTruthy;
  });
  it('open fuction should call check  enabled ', () => {
    component.checkSaf();
    expect(component.currentItem.isSAFEnabled).toEqual(true);
  });

  it('should  Angular calls ngOnInit', () => {
    component.ngOnInit();
    expect(component.readOnlyFlag).toEqual(false);
    expect(component.isEditable).toEqual(true);
  });
  it('fuction should call return fg controls  ', () => {
    component.f();
    expect(component.fg).toBeTruthy();
  });

  it('open fuction should set data in HTML', () => {
    component.setData(data);
    expect(component.currentItem).toBeTruthy();
  });
  it(' fuction should submit ', () => {
    component.isSubmitted();
    expect(component.submit).toBeTruthy();
  });
  it('should dispatch get in ngOnInit', () => {
    const storeSpy = spyOn(mockStore, 'dispatch').and.callThrough();
    expect(component.putAlive).toEqual(true);
  });

  it('fuction should submit ', () => {
    component.getFormName;
    expect(component.fg).toBeTruthy();
  });
  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('function should click check display field in html', () => {
    const field = 'code';
    component.displayFieldCss(field);
    expect(component.isFieldValid).toBeTruthy;
  });
  it('function should click check display field in html 2', () => {
    component.fg  = new UntypedFormGroup({
      name: new UntypedFormControl( 'Nancy', Validators.required)
    });
    component.onSubmitprocessorAdapterForm({ value });
    expect(component.currentItem.id).toBeTruthy;
  });
  afterEach(() => {
    fixture.destroy();
  });
});
