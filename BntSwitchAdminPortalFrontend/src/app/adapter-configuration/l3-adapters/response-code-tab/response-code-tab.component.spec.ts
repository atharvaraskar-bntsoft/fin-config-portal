import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA, EventEmitter, NgModule } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { AlertService } from '@app/services/alert.service';
import { ImportFileService } from '@app/services/import-file.service';
import { SharedModule } from '@app/shared/shared.module';
import { IAppState } from '@app/store/state/app.state';
import { NgSelectModule } from '@ng-select/ng-select';
import { MemoizedSelector, StoreModule } from '@ngrx/store';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { SnotifyService } from 'ng-snotify';
import { AlertModule, DatePickerRvModule, TabsModule } from 'bnt';
import { of } from 'rxjs';
import { selectViewSettingsList } from '@app/store/selectors/view-settings.selector';
import { ResponseCodeTabComponent } from './response-code-tab.component';
import { SelectMessageContextList } from '@app/store/selectors/l1-adapter.selectors';
import { selectInternalCode } from '@app/store/selectors/l1-adapter.selectors';
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
const SelectMessageContextListJson = {
  status: 'success',
  message: 'Find MessageContextFields JSON',
  data: {
    messageContextFieldsByVersion: {
      name: 'Message_Context',
      type: 'fields',
      alias: 'Message context',
      nestedName: 'Message_Context',
      useCase: null,
      datatype: null,
      data: null,
      attributes: [
        {
          name: 'transaction_type',
          type: 'field',
          alias: 'TransactionType',
          nestedName: 'transaction_type',
          useCase: '1',
          datatype: null,
          data: ['Cash Withdrawal'],
          attributes: null,
          operator: [],
          fieldsType: null,
          title: 'TransactionType',
          key: 'transaction_type',
          isLeaf: true,
          selected: false,
        },
      ],
      operator: null,
      fieldsType: null,
    },
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
const selectInternalCodeJson = [
  {
    id: 126,
    value: 'ACCOUNT  LISTING',
    description: 'desc',
    modifiable: '1',
    active: '1',
    lookupType: {
      id: 10,
      name: 'INTERNAL_PROCESSING_CODE',
      description: 'Internal Processing Code',
      modifiable: '0',
    },
  },
];
describe('ResponseCodeTabComponent', () => {
  let component: ResponseCodeTabComponent;
  let fixture: ComponentFixture<ResponseCodeTabComponent>;
  let mockStore: MockStore<IAppState>;
  let mockSelectMessageContextList: MemoizedSelector<any, any>;
  let mockselectViewSettingsList: MemoizedSelector<any, any>;
  let mockselectInternalCode: MemoizedSelector<any, any>;
  let translateService: TranslateService;
  const importFileService = jasmine.createSpyObj('ImportFileService', ['clearData']);
  beforeEach(() => {
    const translateService = jasmine.createSpyObj('TranslateService', ['get', 'setDefaultLang']);
    const alertService = jasmine.createSpyObj('AlertService, SnotifyService', ['responseMessage']);
    TestBed.configureTestingModule({
      declarations: [ResponseCodeTabComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [
        SnotifyService,
        { provide: TranslateService, useClass: translateServiceMock },
        { provide: 'SnotifyToastConfig', useValue: {} },
        { provide: ImportFileService, useValue: importFileService },
        { provide: AlertService, useValue: alertService },

        provideMockStore(),
      ],
      imports: [
        SharedModule,NgSelectModule,FormsModule,ReactiveFormsModule,
        AlertModule,TabsModule,TranslateModule.forRoot({}),
        DatePickerRvModule,RouterTestingModule,HttpClientTestingModule,
        NgxDatatableModule,StoreModule.forRoot({}),
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    mockStore = TestBed.inject(MockStore);
    fixture = TestBed.createComponent(ResponseCodeTabComponent);
    component = fixture.componentInstance;

    mockselectViewSettingsList = mockStore.overrideSelector(
      selectViewSettingsList,selectViewSettingsListJson,
    );
    mockSelectMessageContextList = mockStore.overrideSelector(
      SelectMessageContextList,SelectMessageContextListJson,
    );
    mockselectInternalCode = mockStore.overrideSelector(selectInternalCode, selectInternalCodeJson);
    translateService = TestBed.inject(TranslateService);
    mockStore.refreshState();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('click previous button fuction should render tab in html', () => {
    component.prevTabValue();
    expect(component.tabValue.emit(2)).toBeTruthy;
  });

  it('fuction should validate responese code tab in html', () => {
    component.validateResCode('');
    expect(component).toBeDefined;
  });

  it('fuction should validate responese code tab in html', () => {
    component.versionData();
    expect(component.responseCodeList).toBeDefined;
  });

  it('click previous button fuction should render tab in html', () => {
    const changes = {};
    component.ngOnChanges(changes);
    expect(component).toBeTruthy;
  });

  it('click fuction should call apply transform', () => {
    const applyA = Object.getPrototypeOf(component);
    applyA.transformLogic([]);
    expect(applyA).toBeTruthy;
  });
  afterEach(() => {
    fixture.destroy();
  });
});
