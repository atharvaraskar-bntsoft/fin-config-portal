import { ComponentFixture, fakeAsync, TestBed, tick, waitForAsync } from '@angular/core/testing';
import { TransactionLogComponent } from './transaction-log.component';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { FormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { DatePickerRvModule, PrettyJsonRvModule } from 'bnt';
import { TransactionLogDetailsComponent } from './transaction-log-details/transaction-log-details.component';
import { ILocationState } from '@app/store/state/location.state';
import { Store, StoreModule } from '@ngrx/store';
import { MockStoreModule } from '@app/tests/tests.module';
import { RouterTestingModule } from '@angular/router/testing';
import { EventEmitter } from '@angular/core';
import { of } from 'rxjs';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { IAppState } from '@app/store/state/app.state';
import { TranslateService } from '@ngx-translate/core';
import { MemoizedSelector } from '@ngrx/store';
import { SharedModule } from '@app/shared/shared.module';
import { CommonModule } from '@angular/common';
import { TransactionLogRoutingModule } from './transaction-log-routing.module';
import { ModalModule } from 'angular-custom-modal';
import { ClipboardModule, ClipboardService } from 'ngx-clipboard';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { NzDrawerModule } from 'ng-zorro-antd/drawer';
import { TransactionLogService } from '@app/services/transaction-log.service';
import { selectViewSettingsList } from '@app/store/selectors/view-settings.selector';
import { selectFilterData } from '@app/store/selectors/filter.selectors';
import { selectTransactionLogs } from '@app/store/selectors/transaction-log.selector';
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
class clipboardServiceMock{
  public copyFromContent(key: any): any {
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

const logsListJson = {
  "status": "success",
  "message": "Find Txn logs",
  "data": {
    "total-record": 4180,
    "logsList": [
    ],
    "page-no": 1,
    "total-filtered-record": 0
  }
}

const filterJson = {
  "status": null,
  "message": null,
  "data": {
    "txnType": [
      "Cash Withdrawal"
    ],
    "status": [
      {
        "id": "2",
        "name": "Approved"
      },
      {
        "id": "0",
        "name": "Failed"
      }
    ],
    "device": [
      {
        "id": 1,
        "code": "00000001"
      },
      {
        "id": 2,
        "code": "0000002"
      },
    ],
    "merchant": [
      {
        "id": 1,
        "name": "GIP Noida",
        "code": "000000000000001"
      },
      {
        "id": 2,
        "name": "Reliance Digital",
        "code": "00000002"
      },
    ],
    "destination": [
      {
        "id": 1,
        "name": "L3_test"
      },
      {
        "id": 2,
        "name": "L3_Json"
      },
    ]
  }
}

const sourceAcquirer = {
	"status": "success",
	"message": null,
	"data": {
		"pageNo": 1,
		"totalRecords": 7,
		"totalFilterRecords": 7,
		"content": [
			{
				"key": "00000000001",
				"value": "00000000001"
			},
			{
				"key": "00004321",
				"value": "00004321"
			},
		]
	}
}

const sourceDevice = {
	"status": "success",
	"message": null,
	"data": {
		"pageNo": 1,
		"totalRecords": 3,
		"totalFilterRecords": 3,
		"content": [
			{
				"key": "00000001",
				"value": "00000001"
			},
			{
				"key": "0000002",
				"value": "0000002"
			},
			{
				"key": "00000090",
				"value": "00000090"
			}
		]
	}
}

const sourceMerchant = {
	"status": "success",
	"message": null,
	"data": {
		"pageNo": 1,
		"totalRecords": 3,
		"totalFilterRecords": 3,
		"content": [
			{
				"key": "000000000000001",
				"value": "000000000000001"
			},
			{
				"key": "000000002",
				"value": "000000002"
			},
			{
				"key": "000000080",
				"value": "000000080"
			}
		]
	}
}

const destinationEndpoint = {
	"status": "success",
	"message": null,
	"data": {
		"pageNo": 1,
		"totalRecords": 18,
		"totalFilterRecords": 18,
		"content": [
			{
				"key": "Http_Core",
				"value": "21"
			},
			{
				"key": "tytuyty",
				"value": "7677"
			}
		]
	}
}
const rowJson={
  "id": 4352,
  "additionalParamsRequest": {},
  "additionalParamsResponse": {},
  "additionalFields": {},
  "additionalParams": [],
  "errors": [],
  "operations": [],
  "infoParams": [
    {
      "name": "MASTER_DATA",
      "params": [
        {
          "key": "Payment Method",
          "value": "Payment_Token"
        }
      ]
    },
    {
      "name": "GATEWAY_SERVICES_DATA",
      "params": [
        {
          "key": "Response Code",
          "value": "00,,200"
        }
      ]
    }
  ],
  "date": 1647358331000,
  "txnResponse": {
    "type": 0,
    "text": "DELAYED_RESPONSE",
    "label": "FAILURE"
  },
  "txnStatus": null,
  "forReview": false,
  "transactionName": null,
  "requestType": null,
  "actionType": null,
  "requestedAmount": null,
  "requestedCurrency": "INR",
  "approvedAmount": null,
  "approvedCurrency": null,
  "destinations": null,
  "txnId": "00012204t9WW684x448S",
  "parentTxnId": null,
  "pspRefId": null,
  "txnType": "Enquiry",
  "messageTypeIndicator": null,
  "rrn": null,
  "deviceCode": null,
  "acqInstitutionSource": null,
  "responseCode": null,
  "acqInstitutionDestination": null,
  "processingStatus": null,
  "safprocessed": true,
  "merchantCode": null
};
const itemJson={
  "jsonData": "{\n  \"audit_info\": {\n    \"update\": false,\n    \"version\": \"2.0.0.14-beta\",\n    \"created_on\": \"2022-04-19 09:35:24\"\n  },\n  \"payment_method\": \"GIFT_CARD\",\n  \"transaction_id\": \"00012204uWWNW84e4443\",\n  \"workflow_router\": {\n    \"router\": \"l3json1\",\n    \"routerId\": \"1\"\n  },\n  \"transaction_type\": \"BalanceEnquiry\",\n  \"message_collection\": [\n    {\n      \"message_exchange\": {\n        \"adapter_id\": \"json_adapter\",\n        \"service_type\": \"GATEWAY_SERVICE\",\n        \"request_message\": {\n          \"rrn\": \"0065645\",\n          \"internal\": {\n            \"transaction_uuid\": \"00010\"\n          },\n          \"cust_record\": {\n            \"EMAIL_ADDRESS\": \"thiago@example.com\"\n          },\n          \"customer_id\": \"jamesrftgyhu\",\n          \"actual_amount\": \"1.6200001328400108E-7\",\n          \"cell_phone_number\": \"12345678\",\n          \"merchant_identification\": \"10000001\",\n          \"terminal_identification\": \"02\",\n          \"acquirer_institution_code\": \"MERCADO\"\n        },\n        \"additionalFields\": {\n          \"http_headers\": {\n            \"host\": \"172.16.23.88:30011\",\n            \"accept\": \"*/*\",\n            \"connection\": \"keep-alive\",\n            \"user-agent\": \"PostmanRuntime/7.29.0\",\n            \"content-type\": \"application/json\",\n            \"postman-token\": \"9ddd77c7-7459-41dd-8ccf-a6baa8738bfc\",\n            \"content-length\": \"343\",\n            \"accept-encoding\": \"gzip, deflate\"\n          },\n          \"http_status_code\": 200\n        },\n        \"is_saf_processed\": false,\n        \"response_message\": {\n          \"processor_id\": \"00010\",\n          \"approval_code\": \"4321\",\n          \"response_code\": \"00,Approved,200\",\n          \"response_desc\": \"Approved\"\n        }\n      }\n    },\n    {\n      \"message_exchange\": {\n        \"route\": \"79\",\n        \"route_name\": \"l3json\",\n        \"service_type\": \"AUTH_SERVICE\",\n        \"request_message\": {\n          \"rrn\": \"0065645\",\n          \"internal\": {\n            \"transaction_uuid\": \"00010\"\n          },\n          \"cust_record\": {\n            \"EMAIL_ADDRESS\": \"thiago@example.com\"\n          },\n          \"customer_id\": \"jamesrftgyhu\",\n          \"actual_amount\": \"1.6200001328400108E-7\",\n          \"cell_phone_number\": \"12345678\",\n          \"merchant_identification\": \"10000001\",\n          \"terminal_identification\": \"02\"\n        },\n        \"additionalFields\": {\n          \"http_headers\": {\n            \"Date\": \"Tue, 19 Apr 2022 09:35:24 GMT\",\n            \"Connection\": \"keep-alive\",\n            \"Keep-Alive\": \"timeout=60\",\n            \"Content-Type\": \"text/plain;charset=ISO-8859-1\",\n            \"Content-Length\": \"96\",\n            \"http_status_code\": \"200\"\n          }\n        },\n        \"is_saf_processed\": false,\n        \"response_message\": {\n          \"processor_id\": \"00010\",\n          \"approval_code\": \"4321\",\n          \"response_code\": \"00\",\n          \"response_desc\": \"Approved\"\n        },\n        \"is_autoreversal_enable\": false,\n        \"internal_processing_code\": \"APPROVED\"\n      }\n    }\n  ],\n  \"service_destinations\": {\n    \"AUTH_SERVICE\": {\n      \"key\": \"79\"\n    }\n  },\n  \"internal_processing_code\": \"APPROVED\"\n}",
  "txnType": "BalanceEnquiry"
}
const eventData: HTMLSelectElement = null as HTMLSelectElement;
const eventData2: HTMLSelectElement = {id:'2'} as HTMLSelectElement;
xdescribe('KeysComponent', () => {
  let component: TransactionLogComponent;
  let fixture: ComponentFixture<TransactionLogComponent>;
  let store: Store<ILocationState>;
  let mockStore: MockStore<IAppState>;
  let translate: TranslateService;
  let mockselectViewSettingsList;
  let mockselectFilterList;
  let mockselectLogsList;
  let setgetSourceAcquirer: jasmine.Spy;
  let setgetSourceDevice: jasmine.Spy;
  let setgetSourceMerchant: jasmine.Spy;
  let getSourceDestinationEndpointName: jasmine.Spy;

  beforeEach(() => {
    const transactionLogService = jasmine.createSpyObj('TransactionLogService', [
      'selectViewSettingsList',
      'selectTransactionLogs',
      'selectFilterData',
      'getSourceAcquirer',
      'getSourceDevice',
      'getSourceMerchant',
      'getSourceDestinationEndpointName'
    ]);
    TestBed.configureTestingModule({
      declarations: [TransactionLogComponent, TransactionLogDetailsComponent],
      providers: [
        { provide: TranslateService, useClass: translateServiceMock },
        { provide: ClipboardService, useClass: clipboardServiceMock },
        { provide: TransactionLogService, useValue: transactionLogService },
        provideMockStore(),
      ],
      imports: [
        NgSelectModule,
        FormsModule,
        RouterTestingModule,
        NgxDatatableModule,
        PrettyJsonRvModule,
        // MockStoreModule.forRoot('Location', {}),
        SharedModule,
        CommonModule,
        TransactionLogRoutingModule,
        ModalModule,
        DatePickerRvModule,
        ClipboardModule,
        NzToolTipModule,
        NzDrawerModule,
        StoreModule,
        BrowserAnimationsModule
      ],
    }).compileComponents();

    mockStore = TestBed.inject(MockStore);
    fixture = TestBed.createComponent(TransactionLogComponent);
    translate = TestBed.inject(TranslateService);
    component = fixture.componentInstance;
    

    mockselectViewSettingsList = mockStore.overrideSelector(
      selectViewSettingsList,
      selectViewSettingsListJSON,
    );

    mockselectFilterList = mockStore.overrideSelector(
      selectFilterData,
      filterJson,
    );

    mockselectLogsList = mockStore.overrideSelector(
      selectTransactionLogs,
      logsListJson,
    );

    setgetSourceAcquirer =
    transactionLogService.getSourceAcquirer.and.returnValue(
        of(sourceAcquirer),
      );

    setgetSourceDevice =
      transactionLogService.getSourceDevice.and.returnValue(
          of(sourceDevice),
        );

    setgetSourceMerchant = transactionLogService.getSourceMerchant.and.returnValue(
      of(sourceMerchant),
    );

    setgetSourceMerchant= transactionLogService.getSourceDestinationEndpointName.and.returnValue(
      of(sourceMerchant),
    );

    mockStore.refreshState();
    fixture.detectChanges();
  });

  it('should create', () => { 
    expect(component).toBeTruthy();
  });
  it('should create', () => { 
    expect(component).toBeTruthy();
  });
  it('menuVisible should be false', () => {
    component.closeMenu();
    expect(component.menuVisible).toEqual(false);
  });
  it('menuVisible should be false', () => {
    component.allFitrerdValue();
    expect(component.acquirerID && component.acquirerID ).toEqual('');
  });
  it('menuVisible should be false', () => {
    component.selectFilterValue();
    expect(component.filterkey?.logLevel).toEqual(1);
  });
  // it('menuVisible should be false', () => {
  //   component.selectFilterValue();
  //   expect(component.selectedFilter['processorAdpCode']).toBeTruthy;
  // });
  it('menuVisible should be false', () => {
    component.closeJson(event);
    expect(component.visibleJson).toEqual(false);
  });
  it('menuVisible should be false', () => {
    component.createJson(event);
    expect(component.visibleJson).toEqual(false);
  });
  it('menuVisible should be false', () => {
    component.matCloseDrawer(event);
    expect(component.visibleMat).toEqual(false);
  });
  it('menuVisible should be false', () => {
    component.matCreate(event);
    expect(component.visibleMat).toEqual(false);
  });
  it('menuVisible should be false', () => {
    component.rescloseDrawer(event);
    expect(component.isvisibleviewRes).toEqual(false);
  });
  it('menuVisible should be false', () => {
    component.rescreate(event);
    expect(component.isvisibleviewRes).toEqual(false);
  });
  it('should call open function', fakeAsync(() => {
    component.open();
    expect(component.visible).toEqual(true);
    tick(200);
    expect(component.visible).toEqual(true);
  }));

  it('should call close function', fakeAsync(() => {
    component.close();
    expect(component.visibleAnimate).toEqual(false);
    tick(100);
    expect(component.visible).toEqual(false);
  }));
  it('menuVisible should be false', () => {
    component.txncloseDrawer(event);
    expect(component.isvisibleview).toEqual(false);
  });
  it('menuVisible should be false', () => {
    component.txncreate(event);
    expect(component.isvisibleview).toEqual(false);
  });
  it('menuVisible should be false', () => {
    component.selectMerchantID(event);
    expect(component.filterkey.merchant).toEqual(event);
  });
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
    expect(component.place).toEqual('');
  });
  it('openModal fuction should open the Modal', () => {
    component.showDiv();
    expect(component.divFlag).toBeFalsy;
  });
  it('openModal fuction should open the Modal', () => {
    component.toDataUpdated();
    expect(component.filterkey.logLevel).toEqual(1);
  });
  it('openModal fuction should open the Modal', () => {
    const dateJson ={
      "id": 4,
      "name": "Other"
    }
    const dateJson2 ={  }
    component.checkDateFlag(dateJson);
    expect(dateJson).toBeTruthy;
  });
  it('checkDateFlagForSelectedFilter fuction should open the Modal', () => {
    const dateJson ={
      "id": 4,
      "name": "Other"
    }
    const dateJson2 ={  }
    component.checkDateFlagForSelectedFilter(dateJson);
    expect(dateJson).toBeTruthy;
  });
  
  it('openModal fuction should open the Modal', () => {
    const sourceAcquirerData    = [

      { key: '00000000001', value: '00000000001'},
      { key: '00004321', value: '00004321' }
    ];
    component.getInput(sourceAcquirerData);
    expect(component.getInput).toBeTruthy;
  });

  it('openModal fuction should open the Modal', () => {
    component.fromDataUpdated();
    expect(component.fromDateError).toEqual(false);
  });
  it('openModal fuction should open the Modal', () => {
    component.fromDataUpdated();
    expect(component.filterkey.logLevel).toEqual(1);
  });
  it('menuVisible should be false', () => {
    component.getTransactionLogsData();
    expect(component.acquirerID && component.acquirerID).toEqual('');
  });
  it('refreshData fuction should open the Modal', () => {
    component.refreshData();
    expect(component.filterLoading).toEqual(true);
  });
  it('resetall function should have resetflag tp false', () =>{
    component.resetAll();
    expect(component.resetFlag).toEqual(false)
  })
  it('resetall function should have resetflag tp false', () =>{
    component.calculatefromDate(event);
    expect(component.fromDateError).toEqual(false)
  });
  it('resetall function should have resetflag tp false', () =>{
    component.calculateToDate(event);
    expect(component.toDateError).toEqual(false)     
  });
  it('getFilterNameData fuction should call loadPage', () => {
    component.getFilterNameData(event);
    expect(component.searchResetButton).toEqual(true)  
  });
  it('getFilterNameData fuction should call loadPage', () => {
    const dataon = {length:4};
    component.onDestinationEndpointNameSearch(dataon);
    expect(component.DestinationEndpointpage ).toEqual(1)  
  });
  it('getFilterNameData fuction should call loadPage', () => {
    const dataon = {length:4};
    component.onMerchantSearch(dataon);
    expect(component.MerchantDatapage).toEqual(1)  
  });
  it('getFilterNameData fuction should call loadPage', () => {
    const dataon = {length:4,key:2,device:3,filterkey:4};
    const dataon2 = {};
    component.selectTerminalID(dataon);
    expect(component.filterkey.device).toEqual(dataon)
    component.selectTerminalID(dataon2);  
    expect(component.filterkey.device).toEqual(dataon2) 
  });
  it('getFilterNameData fuction should call loadPage', () => {
    const dataon = {length:4,key:2,device:3,filterkey:4};
    component.onDeviceSearch(dataon);
    expect(component.DeviceDatapage).toEqual(1)  
  });
  it('getFilterNameData fuction should call loadPage', () => {
    const dataon = {length:4,key:2,device:3,filterkey:4};
    component.onSearch(dataon);
    expect(component.sourceAcquirerDataPage).toEqual(1)  
  });
  it('getFilterNameData fuction should call loadPage', () => {
    const resMat = Object.getPrototypeOf(component);
    const sourceDestinationEndpointNameData = [{ key: '000000000000001', value: '000000000000001' },
    { key: '000000002', value: '000000002' },{ key: '000000080', value: '000000080' }];
    component.getSourceDestinationEndpointNameFilterData(eventData2);
    expect(component.sourceDestinationEndpointNameData).toEqual(sourceDestinationEndpointNameData)  
  });
  it('getFilterNameData fuction should call loadPage', () => {
    const resMat = Object.getPrototypeOf(component);
    const sourceDestinationEndpointNameData = [{ key: '000000000000001', value: '000000000000001' },
    { key: '000000002', value: '000000002' },{ key: '000000080', value: '000000080' }];
    component.getSourceDestinationEndpointNameFilterData(eventData);
    expect(component.sourceDestinationEndpointNameData).toEqual(sourceDestinationEndpointNameData)  
  });
  it('getFilterNameData fuction should call loadPage', () => {
    const resMat = Object.getPrototypeOf(component);
    const sourceMerchantData  = [{ key: '000000000000001', value: '000000000000001' },
    { key: '000000002', value: '000000002' },{ key: '000000080', value: '000000080' }];
    component.getSourceMerchantFilterData(eventData2);
    expect(component.sourceMerchantData).toEqual(sourceMerchantData )  
  });
  it('getFilterNameData fuction should call loadPage', () => {
    const resMat = Object.getPrototypeOf(component);
    const sourceMerchantData  = [{ key: '000000000000001', value: '000000000000001' },
    { key: '000000002', value: '000000002' },{ key: '000000080', value: '000000080' }];
    component.getSourceMerchantFilterData(eventData);
    expect(component.sourceMerchantData).toEqual(sourceMerchantData )  
  });
  it('getFilterNameData fuction should call loadPage', () => {
    const resMat = Object.getPrototypeOf(component);
    const sourceDeviceData   = [{ key: '00000001', value: '00000001' } ,
    { key: '0000002', value: '0000002' },
    { key: '00000090', value: '00000090' }];
    component.getSourceDeviceFilterData(eventData);
    expect(component.sourceDeviceData ).toEqual(sourceDeviceData)  
  });
  it('getFilterNameData fuction should call loadPage', () => {
    const resMat = Object.getPrototypeOf(component);
    const sourceDeviceData   = [{ key: '00000001', value: '00000001' } ,
    { key: '0000002', value: '0000002' },
    { key: '00000090', value: '00000090' }];
    component.getSourceDeviceFilterData(eventData2);
    expect(component.sourceDeviceData ).toEqual(sourceDeviceData)  
  });
  it('getFilterNameData fuction should call loadPage', () => {
    const resMat = Object.getPrototypeOf(component);
    const sourceAcquirerData    = [

    { key: '00000000001', value: '00000000001'},
    { key: '00004321', value: '00004321' }
  ];
    component.getSourceFilterData(eventData);
    expect(component.sourceAcquirerData  ).toEqual(sourceAcquirerData )  
  });
  it('getSourceFilterData fuction should call loadPage', () => {
    const resMat = Object.getPrototypeOf(component);
    const sourceAcquirerData    = [

    { key: '00000000001', value: '00000000001'},
    { key: '00004321', value: '00004321' }
  ];
    component.getSourceFilterData(eventData2);
    expect(component.sourceAcquirerData  ).toEqual(sourceAcquirerData )  
  });
  it('getFilterTxnType fuction should have _filters', () => {
    const resMat = Object.getPrototypeOf(component);
    const sourceAcquirerData    = [

    { key: '00000000001', value: '00000000001'},
    { key: '00004321', value: '00004321' }
  ];
    component.getFilterTxnType(eventData2);
    expect(component._filters['txnType']).toEqual(eventData2)  
  });
  it('getFilterMerchant fuction should have _filters', () => {
    const resMat = Object.getPrototypeOf(component);
    const sourceAcquirerData    = [

    { key: '00000000001', value: '00000000001'},
    { key: '00004321', value: '00004321' }
  ];
    component.getFilterMerchant(eventData2);
    expect(component._filters['merchant']).toBeTruthy; 
  });
  it('getFilterDevice fuction should have _filters', () => {
    const resMat = Object.getPrototypeOf(component);
    const sourceAcquirerData    = [

    { key: '00000000001', value: '00000000001'},
    { key: '00004321', value: '00004321' }
  ];
    component.getFilterDevice(eventData2);
    expect(component._filters['merchant']).toBeTruthy; 
  });
  it('getFilterDestination fuction should _filters ', () => {
    const resMat = Object.getPrototypeOf(component);
    const sourceAcquirerData    = [

    { key: '00000000001', value: '00000000001'},
    { key: '00004321', value: '00004321' }
  ];
    component.getFilterDestination(eventData2);
    expect(component._filters['merchant']).toBeTruthy; 
  });
  it('getFilterCurrency fuction should _filters[merchant] ', () => {
    const resMat = Object.getPrototypeOf(component);
    const sourceAcquirerData    = [

    { key: '00000000001', value: '00000000001'},
    { key: '00004321', value: '00004321' }
  ];
    component.getFilterCurrency(eventData2);
    expect(component._filters['merchant']).toBeTruthy; 
  });
  it('getFilterStatus fuction should have_filters[merchant]', () => {
    const resMat = Object.getPrototypeOf(component);
    const sourceAcquirerData    = [

    { key: '00000000001', value: '00000000001'},
    { key: '00004321', value: '00004321' }
  ];
    component.getFilterStatus(eventData2);
    expect(component._filters['merchant']).toBeTruthy; 
  });
  it('reset fuction should have _filters.length=0', () => {
    component.reset(event);
    expect(component._filters.length).toEqual(0)  
  });
  it('getParams fuction should have isloading=true', () => {
    component.getParams(rowJson);
    expect(rowJson &&rowJson.infoParams?.length).toBeTruthy;  
  });
  it('copyToClipboard fuction should have isloading=true', () => {
    component.copyToClipboard(itemJson,event);
    expect(component.copied).toEqual(true);  
  });
  it('getFilterMessageList fuction should have _filters[msgType]', () => {
    const dataon = {responseCode:4,searchResetButton:12,name:21};
    component.getFilterMessageList(dataon);
    expect(component._filters['msgType'] ).toEqual(dataon.name)  
  });
  it('getFilterAuthList fuction should have _filters[auth] ', () => {
    const dataon = {responseCode:4,searchResetButton:12,name:21};
    component.getFilterAuthList(dataon);
    expect(component._filters['auth']).toEqual(dataon.name)  
  });
  it('getFilterSafQueueList fuction should have filters[saf]', () => {
    const dataon = {responseCode:4,searchResetButton:12,name:21};
    component.getFilterSafQueueList(dataon);
    expect(component._filters['saf']).toEqual(dataon.name)  
  });
  it('responseMatrix fuction should have responseMatrix=true', () => {
    const dataon = {responseCode:4,searchResetButton:12,name:21};
    component.responseMatrix(dataon);
    expect(component.isvisibleviewRes).toEqual(true)  
  });
  it('requestMatrix fuction should have visibleMat=true', () => {
    const dataon = {responseCode:4,searchResetButton:12,name:21};
    component.requestMatrix(dataon);
    expect(component.visibleMat).toEqual(true)  
  });
  it('viewJson fuction should have visibleJson=true', () => {
    const dataon = {responseCode:4,searchResetButton:12,name:21};
    component.viewJson(dataon);
    expect(component.visibleJson).toEqual(true)  
  });
  afterEach(() => {
    fixture.destroy();
  });
});
