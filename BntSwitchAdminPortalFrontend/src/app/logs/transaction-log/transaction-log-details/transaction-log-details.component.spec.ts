import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ILocationState } from '@app/store/state/location.state';
import { Store, StoreModule } from '@ngrx/store';
import { MockStoreModule } from '@app/tests/tests.module';

import { TransactionLogDetailsComponent } from './transaction-log-details.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { RouterTestingModule } from '@angular/router/testing';
import { AlertModule, TabsModule, DatePickerRvModule } from 'bnt';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { EventEmitter } from '@angular/core';
import { of } from 'rxjs';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { IAppState } from '@app/store/state/app.state';
import { TranslateService } from '@ngx-translate/core';
import { MemoizedSelector } from '@ngrx/store';
import { SharedModule } from '@app/shared/shared.module';
import { CommonModule } from '@angular/common';
import { ModalModule } from 'angular-custom-modal';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { NzDrawerModule } from 'ng-zorro-antd/drawer';
import { TransactionLogService } from '@app/services/transaction-log.service';
import { selectViewSettingsList } from '@app/store/selectors/view-settings.selector';
import {
  selectTransactionLogsById,
  postTransactionLogsReview,
} from '@app/store/selectors/transaction-log.selector';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

class translateServiceMock {
  public onLangChange: EventEmitter<any> = new EventEmitter();
  public onTranslationChange: EventEmitter<any> = new EventEmitter();
  public onDefaultLangChange: EventEmitter<any> = new EventEmitter();

  public get(key: any): any {
    return of(key);
  }

  public setDefaultLang(key: any): any { }
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

const selectTransactionLogsByIdJson ={
  status: "success",
  message: "get txn by id",
  data: {
    id: 4380,
    additionalParamsRequest: {
      first_column: [
        {
          key: "acceptor_identification_code",
          value: "1              ",
          text: "Acceptor Identification Code",
          path: "message_collection[0].message_exchange.request_message.acceptor_identification_code",
          type: null
        },
        {
          key: "account_number",
          value: "ENC(0000cNZoS77nYyYNjoi58T6NiDSGn6ZTf4mfaimNuwYScSCuHoUvaYDADSsPFmS55GzQGel0jDoRsKPs/YQqlR0t+A==)",
          text: "Account Number",
          path: "message_collection[0].message_exchange.request_message.account_number",
          type: null
        },
        {
          key: "account_number_country_code",
          value: "566",
          text: "Account Number Country Code",
          path: "message_collection[0].message_exchange.request_message.account_number_country_code",
          type: null
        },
        {
          key: "amounts.amount_cardholder_billing.value",
          value: 20,
          text: "Billing Amount",
          path: "message_collection[0].message_exchange.request_message.amounts.amount_cardholder_billing.value",
          type: null
        },
        {
          key: "card.expiry",
          value: "8810",
          text: "Card Expiry",
          path: "message_collection[0].message_exchange.request_message.card.expiry",
          type: null
        },
        {
          key: "shipping.country_code",
          value: "USA",
          text: "Country Code",
          path: "message_collection[0].message_exchange.request_message.shipping.country_code",
          type: null
        }
      ],
      second_column: [
        {
          key: "processing_code",
          value: "881",
          text: "Processing Code",
          path: "message_collection[0].message_exchange.response_message.processing_code",
          type: null
        },
        {
          key: "response_code",
          value: "00",
          text: "Response Code",
          path: "message_collection[0].message_exchange.response_message.response_code",
          type: null
        },
        {
          key: "card.sequence_number",
          value: "112",
          text: "Sequence Number",
          path: "message_collection[0].message_exchange.response_message.card.sequence_number",
          type: null
        }
      ]
    },
    additionalFields: {
      first_column: [
        {
          key: "2",
          value: "4443430000000091",
          text: "2",
          path: "message_collection[0].message_exchange.additionalFields.2",
          type: null
        },
        {
          key: "3",
          value: "010000",
          text: "3",
          path: "message_collection[0].message_exchange.additionalFields.3",
          type: null
        }
      ],
      second_column: [
        {
          key: "13",
          value: "9110",
          text: "13",
          path: "message_collection[0].message_exchange.additionalFields.13",
          type: null
        },
        {
          key: "14",
          value: "8810",
          text: "14",
          path: "message_collection[0].message_exchange.additionalFields.14",
          type: null
        }
      ]
    },
    additionalParams: [
      {
        key: "12",
        value: "153806",
        text: "12",
        path: "message_collection[0].message_exchange.additionalFields.12",
        type: null
      },
      {
        key: "13",
        value: "9110",
        text: "13",
        path: "message_collection[0].message_exchange.additionalFields.13",
        type: null
      },
      {
        key: "14",
        value: "8810",
        text: "14",
        path: "message_collection[0].message_exchange.additionalFields.14",
        type: null
      },
      {
        key: "15",
        value: "0820",
        text: "15",
        path: "message_collection[0].message_exchange.additionalFields.15",
        type: null
      }
    ],
    errors: [],
    operations: [
      {
        name: null,
        client: null,
        deviceTypeCode: null,
        request: {
          first_column: [
            {
              key: "account_number",
              value: "ENC(0000IRFFx7LhH5aEAU5CdVildY+h+9wBg+hmYwvu2OtZkO9a3KZjJYPn3vS6mC5V71Q1IFq7yjSGStvis2UuIbsdOg==)",
              text: "Account Number",
              path: "message_collection[1].message_exchange.request_message.account_number",
              type: null
            },
            {
              key: "card.expiry",
              value: "8810",
              text: "Card Expiry",
              path: "message_collection[1].message_exchange.request_message.card.expiry",
              type: null
            }
          ]
        },
        additionalField: {}
      }
    ],
    infoParams: [],
    date: 1650451841000,
    txnResponse: {
      type: 2,
      text: "APPROVED",
      label: "APPROVED"
    },
    txnStatus: null,
    forReview: false,
    transactionName: null,
    requestType: null,
    actionType: null,
    requestedAmount: null,
    requestedCurrency: null,
    approvedAmount: null,
    approvedCurrency: null,
    destinations: null,
    txnId: "00012204t9MMu84ix44x",
    parentTxnId: null,
    pspRefId: null,
    txnType: "Purchase",
    messageTypeIndicator: null,
    rrn: null,
    deviceCode: "11111111",
    acqInstitutionSource: null,
    responseCode: null,
    acqInstitutionDestination: null,
    processingStatus: "APPROVED",
    safprocessed: null,
    merchantCode: "1              "
  }
}

xdescribe('TransactionLogDetailsComponent', () => {
  let component: TransactionLogDetailsComponent;
  let fixture: ComponentFixture<TransactionLogDetailsComponent>;
  let store: Store<ILocationState>;
  let mockStore: MockStore<IAppState>;
  let translate: TranslateService;
  let mockselectViewSettingsList;
  let mockselectTransactionLogsById: MemoizedSelector<any, any>;
  let transactionLogService: TransactionLogService

  beforeEach(() => {
    const translateService = jasmine.createSpyObj('TranslateService', ['get', 'setDefaultLang']);
    TestBed.configureTestingModule({
      declarations: [TransactionLogDetailsComponent],
      providers: [
        { provide: TranslateService, useClass: translateServiceMock },
        { provide: TransactionLogService, useValue: transactionLogService },
        provideMockStore(),
      ],
      imports: [
        NgSelectModule,
        FormsModule,
        ReactiveFormsModule,
        AlertModule,
        TabsModule,
        DatePickerRvModule,
        RouterTestingModule,
        HttpClientTestingModule,
        NgxDatatableModule,
        SharedModule,
        CommonModule,
        ModalModule,
        NzToolTipModule,
        NzDrawerModule,
        StoreModule,
        BrowserAnimationsModule
      ],
    }).compileComponents();
    mockStore = TestBed.inject(MockStore);
    fixture = TestBed.createComponent(TransactionLogDetailsComponent);
    translate = TestBed.inject(TranslateService);
    component = fixture.componentInstance;
    mockselectViewSettingsList = mockStore.overrideSelector(
      selectViewSettingsList,
      selectViewSettingsListJSON,
    );
    mockselectTransactionLogsById = mockStore.overrideSelector(
      selectTransactionLogsById, selectTransactionLogsByIdJson
    );
    mockStore.refreshState();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  // it('refreshData fuction should call  form HTMl', () => {
  //   component.updateAccountNumber(selectViewSettingsListJSON.data);
  //   expect(component.updateAccountNumber).toBeDefined;
  //   expect(component.updateAccountNumber).toHaveBeenCalled;
  // });
  it('cancelPopUp fuction should open the cancelPopUp', () => {
    component.close();
    expect(component.isvisibleview).toEqual(false);
  });
  it('refreshData fuction should call  form HTMl', () => {
    component.setFlag();
    expect(component.setFlag).toBeDefined;
    expect(component.setFlag).toHaveBeenCalled;
  });
  // it('refreshData fuction should call  form HTMl', () => {
  //   const deviceComponentObj = Object.getPrototypeOf(component);
  //   deviceComponentObj._transformData();
  //   expect(deviceComponentObj._transformData).toBeDefined;
  //   expect(deviceComponentObj._transformData).toHaveBeenCalled;
  // });
  
});
