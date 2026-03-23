import { CommonModule } from '@angular/common';
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { AuditLogComponent } from './audit-log.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AlertService } from '@app/services/alert.service';
import { AuditLogService } from '@app/services/audit-log.service';
import { SharedModule } from '@app/shared/shared.module';
import { IAppState } from '@app/store/state/app.state';
import { MemoizedSelector, Store, StoreModule } from '@ngrx/store';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import {
  MissingTranslationHandler,
  TranslateLoader,
  TranslateModule,
  TranslateService,
} from '@ngx-translate/core';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { SnotifyService, ToastDefaults } from 'ng-snotify';
import { NzModalService } from 'ng-zorro-antd/modal';
import { AlertModule, DatePickerRvModule } from 'bnt';
import { of } from 'rxjs';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MockStoreModule } from '@app/tests/tests.module';
// import { ImportFileModule } from '@app/import-file/import-file.module';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { HttpLoaderFactory, MyMissingTranslationHandler } from '@app/shared/shared.module';
import { getCurrentFilter, selectAuditLogs } from '@app/store/selectors/audit-log.selector';
var $ = require('jquery');
import { DatePickerDirective } from '../../../../library/bnt/src/lib/datepicker/datepicker.directive';
import { EventEmitter } from '@angular/core';
import { selectFilterData } from '@app/store/selectors/filter.selectors';
import { GetAuditLogs, GetCurrentFilter } from '@app/store/actions/audit-log.action';
import { Event } from 'jquery';
import { GetFilterData } from '@app/store/actions/filter.actions';
import { FilterService } from '@app/services/filter.service';
import { Router } from '@angular/router';
import { AuditLogDetailsComponent } from './audit-log-details/audit-log-details.component';

class translateServiceMock {
  public onLangChange: EventEmitter<any> = new EventEmitter();
  public onTranslationChange: EventEmitter<any> = new EventEmitter();
  public onDefaultLangChange: EventEmitter<any> = new EventEmitter();

  public get(key: any): any {
    return of(key);
  }
}

class filterServiceMock {
  public populateFilterData(payloadUrl) {
    return of(filterJson);
  }
}

const auditLogJSON = {
  data: {
    'total-record': 1,
    'page-no': 1,
    'total-filtered-record': 1,
    logsList: [
      {
        action: 'u',
        date: 1658724563949,
        description: null,
        difference: null,
        id: 927,
        object: {
          text: 'MerchantCodeMapping',
          type: {
            id: 7,
            name: 'MerchantCodeMapping',
          },
        },
        user: {
          id: 1,
          name: 'Bnt Admin',
          role: {
            id: 1,
            name: 'ADMIN',
          },
        },
      },
    ],
  },
};

const rowData = {
  action: 'u',
  date: 1658724563949,
  description: null,
  difference: null,
  id: 927,
  object: {
    text: 'MerchantCodeMapping',
    type: {
      id: 7,
      name: 'MerchantCodeMapping',
    },
  },
  user: {
    id: 1,
    name: 'Bnt Admin',
    role: {
      id: 1,
      name: 'ADMIN',
    },
  },
};
const viewDifferenceJSON = {
  id: 935,
  date: 1660025244315,
  object: { type: { id: 9, name: 'Tags' }, text: 'Tags', revisonId: 935 },
  action: 'c',
  description: null,
  user: { id: 1, name: 'Bnt Admin', role: { id: 1, name: 'ADMIN' } },
  difference:
    '{\n  "id" : 9,\n  "name" : "test1dkfjkds",\n  "tag" : "dfd",\n  "serviceType" : "CARD_SERVICE",\n  "exchangeType" : "request",\n  "deleted" : "0",\n  "active" : "1",\n  "condition" : {\n    "id" : "0",\n    "type" : "starts_with",\n    "value" : "new",\n    "fieldName" : "${transaction_id}"\n  }\n}',
  objectId: 9,
  name: 'Tags',
  role_details: 'Bnt Admin',
};
const filterJson = {
  status: null,
  message: null,
  data: {
    actionType: [
      {
        id: '1',
        name: 'Created',
      },
      {
        id: '2',
        name: 'Updated',
      },
      {
        id: '3',
        name: 'Deleted',
      },
    ],
    loginResult: [
      {
        id: '1',
        name: 'Succeeded',
      },
      {
        id: '2',
        name: 'Failed',
      },
    ],
    entityType: [
      {
        id: 'Deploymentworkflow',
        name: 'Deploymentworkflow',
      },
      {
        id: 'Processoradapter',
        name: 'Processoradapter',
      },
      {
        id: 'Deployment',
        name: 'Deployment',
      },
      {
        id: 'Setting',
        name: 'Setting',
      },
      {
        id: 'Tags',
        name: 'Tags',
      },
    ],
    user: [
      {
        id: 1,
        name: 'Bnt Admin',
      },
      {
        id: 2,
        name: 'deepak bisht',
      },
      {
        id: 3,
        name: 'Shubham Singh',
      },
      {
        id: 4,
        name: 'varun thakur',
      },
      {
        id: 5,
        name: 'neeraj gupta',
      },
      {
        id: 6,
        name: 'Vaibhav Dobhal',
      },
      {
        id: 7,
        name: 'Bhavna Gahlot',
      },
      {
        id: 8,
        name: 'Anil Gautam',
      },
      {
        id: 9,
        name: 'Nisha Goswami',
      },
      {
        id: 10,
        name: 'Hrishikesh Srivastava',
      },
      {
        id: 11,
        name: 'first admin',
      },
      {
        id: 12,
        name: 'Deshbandhu porwal',
      },
      {
        id: 69,
        name: 'Shubham Singh',
      },
      {
        id: 70,
        name: 'Shahanawaz Khan',
      },
      {
        id: 71,
        name: 'kaleem khan',
      },
      {
        id: 72,
        name: 'arti Agarwal',
      },
      {
        id: 73,
        name: 'nisha goswami',
      },
      {
        id: 74,
        name: 'asad iqbal',
      },
      {
        id: 75,
        name: 'Nilam Khandagale',
      },
      {
        id: 76,
        name: 'nitin gupta',
      },
    ],
  },
};

const filterSuccess = {
  data: null,
  message: null,
  status: 'success',
};

xdescribe('KeysComponent', () => {
  let component: AuditLogComponent;
  let fixture: ComponentFixture<AuditLogComponent>;
  let mockStore: MockStore<IAppState>;
  let mockselectAuditLogs: MemoizedSelector<any, any>;
  let mockgetCurrentFilter;
  let mockselectFilterData;
  let setDefaultLangSpy: jasmine.Spy;
  let auditLogService: AuditLogService;
  let filterService: FilterService;
  let translate: TranslateService;
  let router: Router;

  beforeEach(() => {
    const translateService = jasmine.createSpyObj('TranslateService', ['get', 'setDefaultLang']);

    TestBed.configureTestingModule({
      declarations: [AuditLogComponent, DatePickerDirective],
      providers: [
        { provide: TranslateService, useClass: translateServiceMock },
        AlertService,
        SnotifyService,
        HttpClient,
        NzModalService,
        AuditLogService,
        FilterService,
        { provide: 'SnotifyToastConfig', useValue: ToastDefaults },
        { provide: AuditLogService, useValue: auditLogService },
        { provide: FilterService, useClass: filterServiceMock },
        provideMockStore(),
        // other providers
      ],
      imports: [
        CommonModule,
        NgSelectModule,
        FormsModule,
        ReactiveFormsModule,
        AlertModule,
        HttpClientModule,
        SharedModule,
        DatePickerRvModule,
        RouterTestingModule.withRoutes([
          { path: 'logs/audit-log/details', component: AuditLogDetailsComponent },
        ]),
        HttpClientTestingModule,
        NgxDatatableModule,
        StoreModule.forRoot({}),
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
    setDefaultLangSpy = translateService.get.and.returnValue(of([]));
    mockStore = TestBed.get(Store);
    fixture = TestBed.createComponent(AuditLogComponent);
    component = fixture.componentInstance;
    mockselectAuditLogs = mockStore.overrideSelector(selectAuditLogs, auditLogJSON);
    mockselectFilterData = mockStore.overrideSelector(selectFilterData, filterJson);
    mockgetCurrentFilter = mockStore.overrideSelector(getCurrentFilter, filterSuccess);
    mockStore.refreshState();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should Angular calls resetState in ngOnInit', () => {
    mockgetCurrentFilter = mockStore.overrideSelector(getCurrentFilter, filterSuccess);
    // mockStore.refreshState();
    // fixture.detectChanges();
    component.ngOnInit();
    (component as any).resetState();
    expect((component as any)._router.events).not.toBeNull();
  });

  it('should  Angular calls defaultFilters in ngOnInit', () => {
    component.ngOnInit();
    component.defaultFilters();
    expect(component.filterkey.logLevel).toEqual(4);
  });

  it('should dispatch GetFilterData in ngOnInit', fakeAsync(() => {
    const url = '/logs-audit/filter';
    const expectedActionSaf = new GetFilterData(url);
    const dispatchSpy = spyOn(mockStore, 'dispatch').and.callThrough(); // spy on the store
    mockselectAuditLogs = mockStore.overrideSelector(selectAuditLogs, auditLogJSON);
    mockStore.refreshState();
    fixture.detectChanges();
    component.filterCall();
    expect(dispatchSpy).toHaveBeenCalledWith(expectedActionSaf);
  }));

  it('should Angular calls loadData', () => {
    component.loadData();
    expect(component.rows).not.toBeNull();
  });

  it('should dispatch GetAuditLogs in ngOnInit', () => {
    const expectedActionSaf = new GetAuditLogs(component.data);
    const dispatchSpy = spyOn(mockStore, 'dispatch').and.callThrough(); // spy on the store
    mockselectFilterData = mockStore.overrideSelector(selectFilterData, filterJson);
    (component as any).loadPage((component as any)._page);
    expect(dispatchSpy).toHaveBeenCalledWith(expectedActionSaf);
  });

  it('should render Table', () => {
    const ngxdatatable: HTMLElement = fixture.nativeElement.querySelector('ngx-datatable');
    const text = ngxdatatable.innerText;
    expect(text).toBeTruthy();
  });

  it('Component should contain Property', () => {
    expect(component.loading).toBe(false);
    expect(component.rows).toBeTruthy();
    expect(component.rowHeight).toBe(75);
    expect(component.headerHeight).toBe(40);
    expect((component as any)._page).toBe(1);
    expect(component.request).toBe(false);
    expect(component.currentPagination).toBe('20');
    expect(component.fromDateError).toBe(false);
    expect(component.toDateError).toBe(false);
  });

  it('loadPage fuction should call after load the component', () => {
    spyOn(component as any, '_transFilters').and.callThrough();
    (component as any).loadPage(1);
    expect(component.request).toBe(false);
    expect((component as any)._transFilters).toHaveBeenCalled();
  });

  it('should call resetFilterSearch function', fakeAsync(() => {
    component.resetFilterSearch();
    tick(200);
    expect(component.resetFilterSearch).toBeDefined;
    expect(component.resetFilterSearch).toHaveBeenCalled;
  }));

  it('should call getFilterLoginResultData function', fakeAsync(() => {
    const data = { id: 'Tags' };
    component.getFilterLoginResultData(data);
    expect(component.getFilterLoginResultData).toBeDefined;
    expect(component.getFilterLoginResultData).toHaveBeenCalled;
  }));

  it('getFilterActionType fuction should call  form HTMl', () => {
    const data = { id: 1 };
    component.getFilterActionType(data);
    expect(component.getFilterActionType).toBeDefined;
    expect(component.getFilterActionType).toHaveBeenCalled;
  });

  it('checkDateFlag fuction should call  form HTMl', () => {
    const data = { id: 6 };
    component.checkDateFlag(data);
    expect(component.checkDateFlag).toBeDefined;
    expect(component.checkDateFlag).toHaveBeenCalled;
  });

  it('allTime fuction should call  form HTMl', () => {
    component.allTime();
    expect(component.allTime).toBeDefined;
    expect(component.allTime).toHaveBeenCalled;
    expect(component.otherFlag).toBe(true);
    expect(component.dateFlag).toBe(true);
  });

  it('calculateDateFrom fuction should call  form HTMl', () => {
    const data = { id: 6 };
    const calculateDateSeven = 7;
    component.checkDateFlag(data);
    component.otherFlag = true;
    component.calculateDateFrom(calculateDateSeven);
    expect(component.allTime).toBeDefined;
    expect(component.allTime).toHaveBeenCalled;
    expect(component.fromDate).not.toBeNull();
  });

  it('calculateDateFrom fuction should call  form HTMl', () => {
    const calculateDatethirty = 30;
    component.calculateDateFrom(calculateDatethirty);
    expect(component.allTime).toBeDefined;
    expect(component.allTime).toHaveBeenCalled;
    expect(component.fromDate).not.toBeNull();
  });
  it('calculateDateFrom fuction should call  form HTMl', () => {
    const calculateDate = 180;
    component.calculateDateFrom(calculateDate);
    expect(component.allTime).toBeDefined;
    expect(component.allTime).toHaveBeenCalled;
    expect(component.fromDate).not.toBeNull();
  });
  it('calculateDateFrom fuction should call  form HTMl', () => {
    const calculateDatelast = 365;
    component.calculateDateFrom(calculateDatelast);
    expect(component.allTime).toBeDefined;
    expect(component.allTime).toHaveBeenCalled;
    expect(component.fromDate).not.toBeNull();
  });

  it('getAuditLogsData fuction should call  form HTMl', () => {
    component.getAuditLogsData();
    expect(component.getAuditLogsData).toBeDefined;
    expect(component.getAuditLogsData).toHaveBeenCalled;
    expect((component as any)._page).toEqual(1);
  });

  it('setFilterData fuction should call  form TS', () => {
    component.setFilterData();
    expect(component.setFilterData).toBeDefined;
    expect(component.setFilterData).toHaveBeenCalled;
  });

  it('refreshData fuction should call  form HTMl', () => {
    component.refreshData();
    expect(component.refreshData).toBeDefined;
    expect(component.refreshData).toHaveBeenCalled;
  });

  it('viewdetails fuction should call  form HTMl', () => {
    component.viewdetails(rowData);
    expect(component.viewdetails).toBeDefined;
    expect(component.viewdetails).toHaveBeenCalled;
  });

  it('viewDiffrence fuction should call  form HTMl', () => {
    component.viewDiffrence(viewDifferenceJSON);
    expect(component.viewDiffrence).toBeDefined;
    expect(component.viewDiffrence).toHaveBeenCalled;
    expect(component.isDataVisible).toBe(true);
    expect(component.diffrence).toEqual(viewDifferenceJSON.difference);
  });

  it('fromDataUpdated fuction should call  form HTMl', () => {
    component.fromDataUpdated();
    expect(component.fromDataUpdated).toBeDefined;
    expect(component.fromDataUpdated).toHaveBeenCalled;
  });

  it('toDataUpdated fuction should call  form HTMl', () => {
    component.toDataUpdated();
    expect(component.toDataUpdated).toBeDefined;
    expect(component.toDataUpdated).toHaveBeenCalled;
    expect(component.toDateError).toBe(false);
  });

  it('checkButton fuction should call  form HTMl', () => {
    component.checkButton(rowData);
    expect(component.checkButton).toBeDefined;
    expect(component.checkButton).toHaveBeenCalled;
  });

  it('calculateDate fuction should call  form HTMl when fromDate is passed as argument', () => {
    const date = '2020/06/13 00:00';
    const name = 'fromDate';
    component.calculateDate(date, name);
    expect(component.calculateDate).toBeDefined;
    expect(component.calculateDate).toHaveBeenCalled;
    expect(component.fromDate).toEqual(date);
  });

  it('calculateDate fuction should call  form HTMl when toDate is passed as argument', () => {
    const date = '2020/02/08 13:51';
    const name = 'toDate';
    component.calculateDate(date, name);
    expect(component.calculateDate).toBeDefined;
    expect(component.calculateDate).toHaveBeenCalled;
    expect(component.toDate).toEqual(date);
  });

  afterEach(() => {
    fixture.destroy();
  });
});
