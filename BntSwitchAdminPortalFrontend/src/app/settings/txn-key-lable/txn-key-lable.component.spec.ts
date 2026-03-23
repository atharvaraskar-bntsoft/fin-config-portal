import { ComponentFixture, fakeAsync, TestBed, tick, waitForAsync } from '@angular/core/testing';
import { IAppState } from '@app/store/state/app.state';
import { MemoizedSelector, Store, StoreModule } from '@ngrx/store';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { EventEmitter } from '@angular/core';
import { of } from 'rxjs';
import { ActivatedRoute, convertToParamMap, Router } from '@angular/router';
import { TxnKeyLableComponent } from './txn-key-lable.component';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { AlertService } from '@app/services/alert.service';
import { SnotifyService, ToastDefaults } from 'ng-snotify';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { AlertModule } from 'bnt';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { selectViewSettingsList } from '@app/store/selectors/view-settings.selector';
import {
  selectTxnKeyLableTypeListGet,
  selectTxnKeyLableTypeUpdate,
} from '@app/store/selectors/txn-key-lable.selectors';
import { Overlay } from '@angular/cdk/overlay';
import { SharedModule } from '@app/shared/shared.module';
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
const selectTxnKeyLableTypeListGetJSON = {
  data: {
    resultList: [
      {
        id: 110,
        locale: 'en_EN1',
        txnKey: 'Tester1',
        label: 'Tester1',
        preSeeded: '0',
        active: '0',
      },
      {
        id: 109,
        locale: 'en_EN1',
        txnKey: 'response.payment_data.outcome.outcome_type',
        label: 'Outcome Type',
        preSeeded: '1',
        active: '1',
      },
      {
        id: 108,
        locale: 'en_EN1',
        txnKey: 'transaction.detailed_amount.currency_code',
        label: 'Detailed Amount Currency Code',
        preSeeded: '1',
        active: '1',
      },
      {
        id: 107,
        locale: 'en_EN1',
        txnKey: 'transaction.total_amount.currency_code',
        label: 'Total Amount Currency Code',
        preSeeded: '1',
        active: '1',
      },
      {
        id: 106,
        locale: 'en_EN1',
        txnKey: 'transaction.merchant.locale.country_code',
        label: 'Merchant Locale Country Code',
        preSeeded: '1',
        active: '1',
      },
      {
        id: 105,
        locale: 'en_EN1',
        txnKey: 'internal.entity.locale.country_code',
        label: 'Entity Locale Country Code',
        preSeeded: '1',
        active: '1',
      },
      {
        id: 104,
        locale: 'en_EN1',
        txnKey: 'response.transaction.transaction_uuid',
        label: 'Transaction Uid',
        preSeeded: '1',
        active: '1',
      },
      {
        id: 103,
        locale: 'en_EN1',
        txnKey: 'response.transaction.poi.poi_id',
        label: 'Poi Id',
        preSeeded: '1',
        active: '1',
      },
      {
        id: 102,
        locale: 'en_EN1',
        txnKey: 'response.transaction.merchant.merchant_id',
        label: 'Merchant Id',
        preSeeded: '1',
        active: '1',
      },
      {
        id: 101,
        locale: 'en_EN1',
        txnKey: 'response.transaction.poi.site.location.location_category',
        label: 'Location Category',
        preSeeded: '1',
        active: '1',
      },
      {
        id: 100,
        locale: 'en_EN1',
        txnKey: 'response.transaction.merchant.address.address_line_1',
        label: 'Address Line 1',
        preSeeded: '1',
        active: '1',
      },
      {
        id: 99,
        locale: 'en_EN1',
        txnKey: 'response.transaction.poi.software.0.version',
        label: 'Software Version',
        preSeeded: '1',
        active: '1',
      },
      {
        id: 98,
        locale: 'en_EN1',
        txnKey: 'internal.payment_contract.settlement.settlement_type',
        label: 'Settlement type',
        preSeeded: '1',
        active: '1',
      },
      {
        id: 97,
        locale: 'en_EN1',
        txnKey: 'transaction.merchant.address.address_line_1',
        label: 'Address Line 1',
        preSeeded: '1',
        active: '1',
      },
      {
        id: 96,
        locale: 'en_EN1',
        txnKey: 'internal.transaction_uuid',
        label: 'Transaction Uid',
        preSeeded: '1',
        active: '1',
      },
      {
        id: 95,
        locale: 'en_EN1',
        txnKey: 'internal.poi.device.device_uid',
        label: 'Device Uid',
        preSeeded: '1',
        active: '1',
      },
      {
        id: 94,
        locale: 'en_EN1',
        txnKey: 'payment_data.customer.billing_address.address_type',
        label: 'Billing Address Type',
        preSeeded: '1',
        active: '1',
      },
      {
        id: 93,
        locale: 'en_EN1',
        txnKey: 'payment_data.customer.billing_address.address_line_3',
        label: 'Billing Address Line 3',
        preSeeded: '1',
        active: '1',
      },
      {
        id: 92,
        locale: 'en_EN1',
        txnKey: 'payment_data.customer.billing_address.address_line_2',
        label: 'Billing Address Line 2',
        preSeeded: '1',
        active: '1',
      },
      {
        id: 91,
        locale: 'en_EN1',
        txnKey: 'payment_data.customer.billing_address.address_line_1',
        label: 'Billing Address Line 1',
        preSeeded: '1',
        active: '1',
      },
    ],
    'total-filtered-record': 20,
    'total-record': 110,
    'page-no': 1,
  },
  message: 'Find all Records',
  status: 'success',
};
const selectTxnKeyLableTypeUpdateJSON = {
  data: {
    id: 110,
    locale: 'en_EN1',
    txnKey: 'Tester1',
    label: 'Tester1',
    preSeeded: '0',
    active: '0',
  },
  message: 'TxnKeyLabel Updated',
  status: 'success',
};
const row = {
  active: '1',
  id: 112,
  label: 'aaa',
  locale: 'en_EN1',
  preSeeded: '0',
  txnKey: 'aaa1',
};
const row1 = {
  active: '0',
  id: 112,
  label: 'aaa',
  locale: 'en_EN1',
  preSeeded: '0',
  txnKey: 'aaa1',
};
const getrow1 = {
  active: '1',
  id: 111,
  label: '11116',
  locale: 'en_EN1',
  preSeeded: '0',
  txnKey: 'test12',
};
let router: Router;
describe('TxnKeyLableComponent', () => {
  let component: TxnKeyLableComponent;
  let fixture: ComponentFixture<TxnKeyLableComponent>;
  let mockStore: MockStore<IAppState>;
  let mockselectViewSettingsList: MemoizedSelector<any, any>;
  let mockselectTxnKeyLableTypeListGet: MemoizedSelector<any, any>;
  let mockselectTxnKeyLableTypeUpdate: MemoizedSelector<any, any>;
  let routerSpy = { navigate: jasmine.createSpy('navigate') };
  beforeEach(() => {
    const translateService = jasmine.createSpyObj('TranslateService', ['get', 'setDefaultLang']);    
    TestBed.configureTestingModule({
      declarations: [TxnKeyLableComponent],
      providers: [
        TranslateService,
        AlertService,
        SnotifyService,
        Overlay,
        { provide: 'SnotifyToastConfig', useValue: ToastDefaults },
        { provide: TranslateService, useClass: translateServiceMock },
        { provide: Router, useValue: routerSpy },
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              paramMap: convertToParamMap({
                id: '1',
              }),
              data: { ruletype: 'workflow' },
            },
          },
        },
        provideMockStore(),
      ],
      imports: [
        StoreModule,
        SharedModule,
        NgSelectModule,
        FormsModule,
        RouterTestingModule,
        NgxDatatableModule,
        ReactiveFormsModule,
        AlertModule,
        StoreModule.forRoot({}),
        BrowserAnimationsModule,
        HttpClientTestingModule,
        TranslateModule,
        CommonModule
      ],
    }).compileComponents();
    mockStore = TestBed.get(MockStore);   
    fixture = TestBed.createComponent(TxnKeyLableComponent);
    component = fixture.componentInstance;

    mockselectViewSettingsList = mockStore.overrideSelector(
      selectViewSettingsList,
      selectViewSettingsListJSON,
    );

    mockselectTxnKeyLableTypeListGet = mockStore.overrideSelector(
      selectTxnKeyLableTypeListGet,
      selectTxnKeyLableTypeListGetJSON,
    );

    mockselectTxnKeyLableTypeUpdate = mockStore.overrideSelector(
      selectTxnKeyLableTypeUpdate,
      selectTxnKeyLableTypeUpdateJSON,
    );
    mockStore.refreshState();
    fixture.detectChanges();
    
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should  Angular calls ngOnInit', () => {
    component.ngOnInit();
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
  it('function should change the status in html list', () => {
    component.changeStatus(row);
    expect(component.statusLoading).toEqual(true);
  });
  it('function should click delete button to delete the data row', () => {
    component.deleteRow(row1);
    expect(component.errorMessage).toBeTruthy;
    expect(component.successMessage).toBeTruthy;
  });
  it('should Angular calls loadData', () => {
    component.loadPage(1);
    expect(component.request).not.toBeNull();
  });
  it('getRowData fuction should call click on viewdetails form this HTMl', fakeAsync(() => {
    component.getRowData(row);
    expect(routerSpy?.navigate).toHaveBeenCalledWith(['logs/txnKeyLable/edit', row.id]);
  }));
  afterEach(() => {
    fixture.destroy();
  });
});
