import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';

import { ViewJsonComponent } from './view-json.component';

import { ILocationState } from '@app/store/state/location.state';
import { Store, StoreModule } from '@ngrx/store';
import { MockStoreModule } from '@app/tests/tests.module';
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
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ClipboardService } from 'ngx-clipboard';
import { selectJson } from '@app/store/selectors/transaction-log.selector';

const Json =
{
  status: "success", message: "find txn Json", data:
    { jsonData: "{\n  \"audit_info\": {\n    \"update\": false,\n    \"version\": \"2.0.0.14-beta\",\n    \"created_on\": \"2022-04-20 07:20:33\"\n  },\n  \"payment_method\": \"CARD\",\n  \"transaction_id\": \"00012204t9MMu84ix44x\",\n  \"workflow_router\": {\n    \"router\": \"iso_tcp_client_rule\",\n    \"routerId\": \"3\"\n  },\n  \"transaction_type\": \"Purchase\",\n  \"message_collection\": [\n    {\n      \"message_exchange\": {\n        \"adapter_id\": \"l1_iso_tcp_server_11jan\",\n        \"service_type\": \"GATEWAY_SERVICE\",\n        \"request_message\": {\n          \"mti\": \"0200\",\n          \"rrn\": \"650439230799\",\n          \"card\": {\n            \"expiry\": \"8810\",\n            \"sequence_number\": \"2\",\n            \"masked_card_number\": \"444343xxxxxx0091\"\n          },\n          \"amounts\": {\n            \"amount_original\": {\n              \"transaction_amount\": {\n                \"value\": 34.56\n              }\n            },\n            \"amount_settlement\": {\n              \"value\": 98.0\n            },\n            \"amount_transaction\": {\n              \"value\": 100.0\n            },\n            \"amount_cardholder_billing\": {\n              \"value\": 20.0\n            }\n          },\n          \"icc_data\": {\n            \"tag_82\": \"0401\",\n            \"tag_84\": \"1E1756ED0E2134E21E1756ED0E2134E2\",\n            \"tag_95\": \"8001040880\",\n            \"tag_9A\": \"200420\",\n            \"tag_9C\": \"00\",\n            \"tag_5F2A\": \"0840\",\n            \"tag_9F02\": \"000000010010\",\n            \"tag_9F03\": \"000000000000\",\n            \"tag_9F10\": \"1E1756ED0E2134E21E1756ED0E2134E2\",\n            \"tag_9F1A\": \"0710\",\n            \"tag_9F26\": \"1E1756ED0E2134E2\",\n            \"tag_9F27\": \"1E\",\n            \"tag_9F33\": \"204020\",\n            \"tag_9F34\": \"020002\",\n            \"tag_9F36\": \"0001\",\n            \"tag_9F37\": \"2E13374C\"\n          },\n          \"shipping\": {\n            \"country_code\": \"USA\"\n          },\n          \"local_date\": \"9110\",\n          \"local_time\": \"153806\",\n          \"merchant_type\": \"5\",\n          \"account_number\": \"ENC(0000cNZoS77nYyYNjoi58T6NiDSGn6ZTf4mfaimNuwYScSCuHoUvaYDADSsPFmS55GzQGel0jDoRsKPs/YQqlR0t+A==)\",\n          \"date_settlement\": \"2022-04-20 07:20:33\",\n          \"processing_code\": \"881\",\n          \"original_data_element\": {\n            \"original_message_type_identifier\": \"20.0\"\n          },\n          \"transmission_date_time\": \"0120153806\",\n          \"fee_and_conversion_rate\": {\n            \"amount_fees\": {\n              \"transaction_amount_fee\": {\n                \"value\": 123456789.0\n              }\n            }\n          },\n          \"terminal_identification\": \"11111111\",\n          \"system_trace_audit_number\": \"333333\",\n          \"transaction_type_indicator\": {\n            \"type\": \"Purchase\",\n            \"to_account_type\": \"00\",\n            \"from_account_type\": \"00\"\n          },\n          \"account_number_country_code\": \"566\",\n          \"point_of_service_entry_mode\": {\n            \"pin_entry_mode\": \"10.0\"\n          },\n          \"acceptor_identification_code\": \"1              \",\n          \"forwarding_institution_country_code\": \"23\"\n        },\n        \"additionalFields\": {\n          \"2\": \"4443430000000091\",\n          \"3\": \"010000\",\n          \"5\": \"000000440098\",\n          \"8\": \"12345678\",\n          \"12\": \"153806\",\n          \"13\": \"9110\",\n          \"14\": \"8810\",\n          \"15\": \"0820\",\n          \"37\": \"650439230799\",\n          \"55\": \"nyYIHhdW7Q4hNOKfJwEenxAQHhdW7Q4hNOIeF1btDiE04p83BC4TN0yfNgIAAZUFgAEECICaAyAEIJwBAJ8CBgAAAAEAEF8qAghAggIEAZ8aAgcQnzQDAgACnzMDIEAghBAeF1btDiE04h4XVu0OITTinwMGAAAAAAAA\"\n        },\n        \"is_saf_processed\": false,\n        \"response_message\": {\n          \"card\": {\n            \"sequence_number\": \"112\"\n          },\n          \"amounts\": {\n            \"amount_original\": {\n              \"transaction_amount\": {\n                \"value\": 3456.0\n              }\n            },\n            \"amount_transaction\": {\n              \"value\": 100.0\n            },\n            \"amount_cardholder_billing\": {\n              \"value\": 20.0\n            }\n          },\n          \"shipping\": {\n            \"country_code\": \"840\"\n          },\n          \"merchant_type\": \"5999\",\n          \"response_code\": \"00\",\n          \"processing_code\": \"881\",\n          \"original_data_element\": {\n            \"original_message_type_identifier\": \"20\"\n          },\n          \"transmission_date_time\": \"0120153806\",\n          \"fee_and_conversion_rate\": {\n            \"amount_fees\": {\n              \"transaction_amount_fee\": {\n                \"value\": 123456789.0\n              }\n            }\n          },\n          \"system_trace_audit_number\": \"333333\",\n          \"account_number_country_code\": \"566\",\n          \"point_of_service_entry_mode\": {\n            \"pin_entry_mode\": \"10\"\n          },\n          \"forwarding_institution_country_code\": \"23\"\n        }\n      }\n    },\n    {\n      \"message_exchange\": {\n        \"route\": \"11\",\n        \"route_name\": \"l3_iso_tcp_client_4jan\",\n        \"service_type\": \"AUTH_SERVICE\",\n        \"request_message\": {\n          \"rrn\": \"650439230799\",\n          \"card\": {\n            \"expiry\": \"8810\",\n            \"sequence_number\": \"112\"\n          },\n          \"amounts\": {\n            \"amount_transaction\": {\n              \"value\": 100.0\n            }\n          },\n          \"icc_data\": {\n            \"tag_82\": \"0401\",\n            \"tag_84\": \"1E1756ED0E2134E21E1756ED0E2134E2\",\n            \"tag_95\": \"8001040880\",\n            \"tag_9A\": \"200420\",\n            \"tag_9C\": \"00\",\n            \"tag_5F2A\": \"0840\",\n            \"tag_9F02\": \"000000010010\",\n            \"tag_9F03\": \"000000000000\",\n            \"tag_9F10\": \"1E1756ED0E2134E21E1756ED0E2134E2\",\n            \"tag_9F1A\": \"0710\",\n            \"tag_9F26\": \"1E1756ED0E2134E2\",\n            \"tag_9F27\": \"1E\",\n            \"tag_9F33\": \"204020\",\n            \"tag_9F34\": \"020002\",\n            \"tag_9F36\": \"0001\",\n            \"tag_9F37\": \"2E13374C\"\n          },\n          \"shipping\": {\n            \"country_code\": \"840\"\n          },\n          \"local_date\": \"9110\",\n          \"local_time\": \"123456\",\n          \"merchant_type\": \"5999\",\n          \"account_number\": \"ENC(0000IRFFx7LhH5aEAU5CdVildY+h+9wBg+hmYwvu2OtZkO9a3KZjJYPn3vS6mC5V71Q1IFq7yjSGStvis2UuIbsdOg==)\",\n          \"processing_code\": \"881\",\n          \"transmission_date_time\": \"0120153806\",\n          \"system_trace_audit_number\": \"333333\",\n          \"transaction_type_indicator\": {\n            \"type\": \"01\"\n          }\n        },\n        \"is_saf_processed\": false,\n        \"response_message\": {\n          \"rrn\": \"650439230799\",\n          \"amounts\": {\n            \"amount_transaction\": {\n              \"value\": 100.0\n            }\n          },\n          \"order_id\": \"123456\",\n          \"shipping\": {\n            \"country_code\": \"840\"\n          },\n          \"response_code\": \"000\",\n          \"account_number\": \"ENC(0000oAAe6lscS3k030ZZwq1ypTcKjYDZuOp2jdwxLRM1K5N3siWzyiK2NpMm2O24wrR2KaiYGpcdoN8kGcpDOGwAjQ==)\",\n          \"processing_code\": \"881\",\n          \"system_trace_audit_number\": \"333333\"\n        },\n        \"is_autoreversal_enable\": false,\n        \"internal_processing_code\": \"APPROVED\"\n      }\n    }\n  ],\n  \"service_destinations\": {\n    \"AUTH_SERVICE\": {\n      \"key\": \"11\"\n    }\n  },\n  \"internal_processing_code\": \"APPROVED\"\n}", "txnType": "Purchase" }
}
const itemJson={
  "jsonData": "{\n  \"audit_info\": {\n    \"update\": false,\n    \"version\": \"2.0.0.14-beta\",\n    \"created_on\": \"2022-04-19 09:35:24\"\n  },\n  \"payment_method\": \"GIFT_CARD\",\n  \"transaction_id\": \"00012204uWWNW84e4443\",\n  \"workflow_router\": {\n    \"router\": \"l3json1\",\n    \"routerId\": \"1\"\n  },\n  \"transaction_type\": \"BalanceEnquiry\",\n  \"message_collection\": [\n    {\n      \"message_exchange\": {\n        \"adapter_id\": \"json_adapter\",\n        \"service_type\": \"GATEWAY_SERVICE\",\n        \"request_message\": {\n          \"rrn\": \"0065645\",\n          \"internal\": {\n            \"transaction_uuid\": \"00010\"\n          },\n          \"cust_record\": {\n            \"EMAIL_ADDRESS\": \"thiago@example.com\"\n          },\n          \"customer_id\": \"jamesrftgyhu\",\n          \"actual_amount\": \"1.6200001328400108E-7\",\n          \"cell_phone_number\": \"12345678\",\n          \"merchant_identification\": \"10000001\",\n          \"terminal_identification\": \"02\",\n          \"acquirer_institution_code\": \"MERCADO\"\n        },\n        \"additionalFields\": {\n          \"http_headers\": {\n            \"host\": \"172.16.23.88:30011\",\n            \"accept\": \"*/*\",\n            \"connection\": \"keep-alive\",\n            \"user-agent\": \"PostmanRuntime/7.29.0\",\n            \"content-type\": \"application/json\",\n            \"postman-token\": \"9ddd77c7-7459-41dd-8ccf-a6baa8738bfc\",\n            \"content-length\": \"343\",\n            \"accept-encoding\": \"gzip, deflate\"\n          },\n          \"http_status_code\": 200\n        },\n        \"is_saf_processed\": false,\n        \"response_message\": {\n          \"processor_id\": \"00010\",\n          \"approval_code\": \"4321\",\n          \"response_code\": \"00,Approved,200\",\n          \"response_desc\": \"Approved\"\n        }\n      }\n    },\n    {\n      \"message_exchange\": {\n        \"route\": \"79\",\n        \"route_name\": \"l3json\",\n        \"service_type\": \"AUTH_SERVICE\",\n        \"request_message\": {\n          \"rrn\": \"0065645\",\n          \"internal\": {\n            \"transaction_uuid\": \"00010\"\n          },\n          \"cust_record\": {\n            \"EMAIL_ADDRESS\": \"thiago@example.com\"\n          },\n          \"customer_id\": \"jamesrftgyhu\",\n          \"actual_amount\": \"1.6200001328400108E-7\",\n          \"cell_phone_number\": \"12345678\",\n          \"merchant_identification\": \"10000001\",\n          \"terminal_identification\": \"02\"\n        },\n        \"additionalFields\": {\n          \"http_headers\": {\n            \"Date\": \"Tue, 19 Apr 2022 09:35:24 GMT\",\n            \"Connection\": \"keep-alive\",\n            \"Keep-Alive\": \"timeout=60\",\n            \"Content-Type\": \"text/plain;charset=ISO-8859-1\",\n            \"Content-Length\": \"96\",\n            \"http_status_code\": \"200\"\n          }\n        },\n        \"is_saf_processed\": false,\n        \"response_message\": {\n          \"processor_id\": \"00010\",\n          \"approval_code\": \"4321\",\n          \"response_code\": \"00\",\n          \"response_desc\": \"Approved\"\n        },\n        \"is_autoreversal_enable\": false,\n        \"internal_processing_code\": \"APPROVED\"\n      }\n    }\n  ],\n  \"service_destinations\": {\n    \"AUTH_SERVICE\": {\n      \"key\": \"79\"\n    }\n  },\n  \"internal_processing_code\": \"APPROVED\"\n}",
  "txnType": "BalanceEnquiry"
}


describe('ViewJsonComponent', () => {
  let component: ViewJsonComponent;
  let fixture: ComponentFixture<ViewJsonComponent>;
  let store: Store<ILocationState>;
  let mockStore: MockStore<IAppState>;
  let translate: TranslateService;
  let mockselectJson: MemoizedSelector<any, any>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ViewJsonComponent],
      providers: [
        ClipboardService,
        provideMockStore(),
      ],
      imports: [
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
    fixture = TestBed.createComponent(ViewJsonComponent);
    translate = TestBed.inject(TranslateService);
    component = fixture.componentInstance;
    mockselectJson = mockStore.overrideSelector(
      selectJson, Json
    );
    component.keyData = Json.data;
    mockStore.refreshState();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  
  it('should call close function', fakeAsync(() => {
    component.close();
    expect(component.visibleAnimate).toEqual(false);
    tick(100);
    expect(component.visible).toEqual(false);
  }));
  it('should call open function', fakeAsync(() => {
    component.open();
    expect(component.visible).toEqual(true);
    tick(200);
    expect(component.visible).toEqual(true);
  }));
  afterEach(() => {
    fixture.destroy();
  });
});
