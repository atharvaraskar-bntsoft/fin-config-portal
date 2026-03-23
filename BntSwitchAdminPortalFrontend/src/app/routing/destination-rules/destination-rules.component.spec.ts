import { CommonModule } from '@angular/common';
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { DestinationRulesComponent } from './destination-rules.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { RouterTestingModule } from '@angular/router/testing';
import { PrettyJsonRvModule } from 'bnt';
import { MockStoreModule } from '@app/tests/tests.module';
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
import { of } from 'rxjs';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { HttpLoaderFactory, MyMissingTranslationHandler } from '@app/shared/shared.module';
import { EventEmitter } from '@angular/core';
import { SnotifyService, ToastDefaults } from 'ng-snotify';
import { AlertModule, DatePickerRvModule } from 'bnt';
import { DestinationRulesService } from '@app/services/destination-rules.service';
import { AlertService } from '@app/services/alert.service';
import { selectDestinationRules } from '@app/store/selectors/destination-rules.selector';
import { RouterRoutingModule } from '../router/router-routing.module';

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
const destinationRuleJson = {
  status: 'success',
  message: null,
  data: {
    'total-record': 6,
    'page-no': 1,
    ruleList: [
      {
        id: 17,
        name: 'Teet',
        ruleType: 'workflow',
        description: 'asas',
        active: '1',
        versionable: false,
        editable: false,
        zeroVersion: false,
        ruleConfiguration: [
          {
            id: 67,
            ruleId: null,
            ruleJson:
              '{"type": "conditional-decision", "condition": {"type": "equal", "value": "Cash Withdrawal", "fieldName": "${transaction_type}"}}',
            destination: '7',
            version: 0,
            verified: 1,
            droolRule: null,
            active: '1',
            json: '{"name": "Teet", "active": true, "commit": false, "ruleType": "workflow", "condition": "{\\"id\\":\\"0\\",\\"fieldName\\":\\"${transaction_type}\\",\\"type\\":\\"equal\\",\\"value\\":\\"Cash Withdrawal\\"}", "conditionUi": {"id": "0", "type": "equal", "value": "Cash Withdrawal", "fieldName": "${transaction_type}"}, "description": "asas", "destinations": [{"id": 7}], "additionalInfo": []}',
          },
        ],
        routerName: null,
        routerId: null,
        routerVersion: null,
        routerStatus: false,
      },
      {
        id: 10,
        name: 'nestedwfrule',
        ruleType: 'workflow',
        description: 'nestedwfrule',
        active: '1',
        versionable: false,
        editable: false,
        zeroVersion: false,
        ruleConfiguration: [
          {
            id: 47,
            ruleId: null,
            ruleJson:
              '{"type": "conditional-decision", "condition": {"type": "equal", "value": "GIFT_CARD", "fieldName": "${payment_method}"}}',
            destination: '6',
            version: 11,
            verified: 0,
            droolRule: null,
            active: '1',
            json: '{"name": "nestedwfrule", "active": true, "commit": true, "ruleType": "workflow", "condition": "{\\"id\\":\\"0\\",\\"type\\":\\"equal\\",\\"value\\":\\"GIFT_CARD\\",\\"fieldName\\":\\"${payment_method}\\"}", "conditionUi": {"id": "0", "type": "equal", "value": "GIFT_CARD", "fieldName": "${payment_method}"}, "description": "nestedwfrule", "destinations": [{"id": 6}], "additionalInfo": []}',
          },
          {
            id: 46,
            ruleId: null,
            ruleJson:
              '{"type": "conditional-decision", "condition": {"type": "equal", "value": "GIFT_CARD", "fieldName": "${payment_method}"}}',
            destination: '6',
            version: 10,
            verified: 0,
            droolRule: null,
            active: '1',
            json: '{"name": "nestedwfrule", "active": true, "commit": true, "ruleType": "workflow", "condition": "{\\"id\\":\\"0\\",\\"type\\":\\"equal\\",\\"value\\":\\"GIFT_CARD\\",\\"fieldName\\":\\"${payment_method}\\"}", "conditionUi": {"id": "0", "type": "equal", "value": "GIFT_CARD", "fieldName": "${payment_method}"}, "description": "nestedwfrule", "destinations": [{"id": 6}], "additionalInfo": []}',
          },
          {
            id: 45,
            ruleId: null,
            ruleJson:
              '{"type": "conditional-decision", "condition": {"type": "equal", "value": "GIFT_CARD", "fieldName": "${payment_method}"}}',
            destination: '6',
            version: 9,
            verified: 0,
            droolRule: null,
            active: '1',
            json: '{"name": "nestedwfrule", "active": true, "commit": true, "ruleType": "workflow", "condition": "{\\"id\\":\\"0\\",\\"type\\":\\"equal\\",\\"value\\":\\"GIFT_CARD\\",\\"fieldName\\":\\"${payment_method}\\"}", "conditionUi": {"id": "0", "type": "equal", "value": "GIFT_CARD", "fieldName": "${payment_method}"}, "description": "nestedwfrule", "destinations": [{"id": 6}], "additionalInfo": []}',
          },
          {
            id: 44,
            ruleId: null,
            ruleJson:
              '{"type": "conditional-decision", "condition": {"type": "equal", "value": "GIFT_CARD", "fieldName": "${payment_method}"}}',
            destination: '6',
            version: 8,
            verified: 0,
            droolRule: null,
            active: '1',
            json: '{"name": "nestedwfrule", "active": true, "commit": true, "ruleType": "workflow", "condition": "{\\"id\\":\\"0\\",\\"type\\":\\"equal\\",\\"value\\":\\"GIFT_CARD\\",\\"fieldName\\":\\"${payment_method}\\"}", "conditionUi": {"id": "0", "type": "equal", "value": "GIFT_CARD", "fieldName": "${payment_method}"}, "description": "nestedwfrule", "destinations": [{"id": 6}], "additionalInfo": []}',
          },
          {
            id: 40,
            ruleId: null,
            ruleJson:
              '{"type": "conditional-decision", "condition": {"type": "equal", "value": "GIFT_CARD", "fieldName": "${payment_method}"}}',
            destination: '6',
            version: 7,
            verified: 0,
            droolRule: null,
            active: '1',
            json: '{"name": "nestedwfrule", "active": true, "commit": true, "ruleType": "workflow", "condition": "{\\"id\\":\\"0\\",\\"type\\":\\"equal\\",\\"value\\":\\"GIFT_CARD\\",\\"fieldName\\":\\"${payment_method}\\"}", "conditionUi": {"id": "0", "type": "equal", "value": "GIFT_CARD", "fieldName": "${payment_method}"}, "description": "nestedwfrule", "destinations": [{"id": 6}], "additionalInfo": []}',
          },
          {
            id: 39,
            ruleId: null,
            ruleJson:
              '{"type": "conditional-decision", "condition": {"type": "equal", "value": "GIFT_CARD", "fieldName": "${payment_method}"}}',
            destination: '6',
            version: 6,
            verified: 0,
            droolRule: null,
            active: '1',
            json: '{"name": "nestedwfrule", "active": true, "commit": true, "ruleType": "workflow", "condition": "{\\"id\\":\\"0\\",\\"type\\":\\"equal\\",\\"value\\":\\"GIFT_CARD\\",\\"fieldName\\":\\"${payment_method}\\"}", "conditionUi": {"id": "0", "type": "equal", "value": "GIFT_CARD", "fieldName": "${payment_method}"}, "description": "nestedwfrule", "destinations": [{"id": 6}], "additionalInfo": []}',
          },
          {
            id: 38,
            ruleId: null,
            ruleJson:
              '{"type": "conditional-decision", "condition": {"type": "equal", "value": "GIFT_CARD", "fieldName": "${payment_method}"}}',
            destination: '6',
            version: 5,
            verified: 0,
            droolRule: null,
            active: '1',
            json: '{"name": "nestedwfrule", "active": true, "commit": true, "ruleType": "workflow", "condition": "{\\"id\\":\\"0\\",\\"fieldName\\":\\"${payment_method}\\",\\"type\\":\\"equal\\",\\"value\\":\\"GIFT_CARD\\"}", "conditionUi": {"id": "0", "type": "equal", "value": "GIFT_CARD", "fieldName": "${payment_method}"}, "description": "nestedwfrule", "destinations": [{"id": 6}], "additionalInfo": []}',
          },
          {
            id: 35,
            ruleId: null,
            ruleJson:
              '{"type": "conditional-decision", "condition": {"type": "equal", "value": "nestedwf", "fieldName": "${message_exchange[GATEWAY_SERVICE].request_message[api_version]}"}}',
            destination: '6',
            version: 4,
            verified: 0,
            droolRule: null,
            active: '1',
            json: '{"name": "nestedwfrule", "active": true, "commit": true, "ruleType": "workflow", "condition": "{\\"id\\":\\"0\\",\\"type\\":\\"equal\\",\\"value\\":\\"nestedwf\\",\\"fieldName\\":\\"${message_exchange[GATEWAY_SERVICE].request_message[api_version]}\\"}", "conditionUi": {"id": "0", "type": "equal", "value": "nestedwf", "fieldName": "${message_exchange[GATEWAY_SERVICE].request_message[api_version]}"}, "description": "nestedwfrule", "destinations": [{"id": 6}], "additionalInfo": []}',
          },
          {
            id: 34,
            ruleId: null,
            ruleJson:
              '{"type": "conditional-decision", "condition": {"type": "equal", "value": "nestedwf", "fieldName": "${message_exchange[GATEWAY_SERVICE].request_message[api_version]}"}}',
            destination: '6',
            version: 3,
            verified: 0,
            droolRule: null,
            active: '1',
            json: '{"name": "nestedwfrule", "active": true, "commit": true, "ruleType": "workflow", "condition": "{\\"id\\":\\"0\\",\\"type\\":\\"equal\\",\\"value\\":\\"nestedwf\\",\\"fieldName\\":\\"${message_exchange[GATEWAY_SERVICE].request_message[api_version]}\\"}", "conditionUi": {"id": "0", "type": "equal", "value": "nestedwf", "fieldName": "${message_exchange[GATEWAY_SERVICE].request_message[api_version]}"}, "description": "nestedwfrule", "destinations": [{"id": 6}], "additionalInfo": []}',
          },
          {
            id: 33,
            ruleId: null,
            ruleJson:
              '{"type": "conditional-decision", "condition": {"type": "equal", "value": "nestedwf", "fieldName": "${message_exchange[GATEWAY_SERVICE].request_message[api_version]}"}}',
            destination: '6',
            version: 2,
            verified: 0,
            droolRule: null,
            active: '1',
            json: '{"name": "nestedwfrule", "active": true, "commit": true, "ruleType": "workflow", "condition": "{\\"id\\":\\"0\\",\\"type\\":\\"equal\\",\\"value\\":\\"nestedwf\\",\\"fieldName\\":\\"${message_exchange[GATEWAY_SERVICE].request_message[api_version]}\\"}", "conditionUi": {"id": "0", "type": "equal", "value": "nestedwf", "fieldName": "${message_exchange[GATEWAY_SERVICE].request_message[api_version]}"}, "description": "nestedwfrule", "destinations": [{"id": 6}], "additionalInfo": []}',
          },
          {
            id: 32,
            ruleId: null,
            ruleJson:
              '{"type": "conditional-decision", "condition": {"type": "equal", "value": "nestedwf", "fieldName": "${message_exchange[GATEWAY_SERVICE].request_message[api_version]}"}}',
            destination: '6',
            version: 1,
            verified: 0,
            droolRule: null,
            active: '1',
            json: '{"name": "nestedwfrule", "active": true, "commit": true, "ruleType": "workflow", "condition": "{\\"id\\":\\"0\\",\\"type\\":\\"equal\\",\\"value\\":\\"nestedwf\\",\\"fieldName\\":\\"${message_exchange[GATEWAY_SERVICE].request_message[api_version]}\\"}", "conditionUi": {"id": "0", "type": "equal", "value": "nestedwf", "fieldName": "${message_exchange[GATEWAY_SERVICE].request_message[api_version]}"}, "description": "nestedwfrule", "destinations": [{"id": 6}], "additionalInfo": []}',
          },
        ],
        routerName: null,
        routerId: null,
        routerVersion: null,
        routerStatus: false,
      },
      {
        id: 8,
        name: 'l3json1',
        ruleType: 'workflow',
        description: 'l3json1',
        active: '1',
        versionable: false,
        editable: false,
        zeroVersion: false,
        ruleConfiguration: [
          {
            id: 69,
            ruleId: null,
            ruleJson:
              '{"type": "conditional-decision", "condition": {"type": "equal", "value": "GIFT_CARD", "fieldName": "${payment_method}"}}',
            destination: '1',
            version: 9,
            verified: 0,
            droolRule: null,
            active: '1',
            json: '{"name": "l3json1", "active": true, "commit": true, "ruleType": "workflow", "condition": "{\\"id\\":\\"0\\",\\"type\\":\\"equal\\",\\"value\\":\\"GIFT_CARD\\",\\"fieldName\\":\\"${payment_method}\\"}", "conditionUi": {"id": "0", "type": "equal", "value": "GIFT_CARD", "fieldName": "${payment_method}"}, "description": "l3json1", "destinations": [{"id": 1}], "additionalInfo": []}',
          },
          {
            id: 58,
            ruleId: null,
            ruleJson:
              '{"type": "conditional-decision", "condition": {"type": "equal", "value": "GIFT_CARD", "fieldName": "${payment_method}"}}',
            destination: '1',
            version: 8,
            verified: 0,
            droolRule: null,
            active: '1',
            json: '{"name": "l3json1", "active": true, "commit": true, "ruleType": "workflow", "condition": "{\\"id\\":\\"0\\",\\"type\\":\\"equal\\",\\"value\\":\\"GIFT_CARD\\",\\"fieldName\\":\\"${payment_method}\\"}", "conditionUi": {"id": "0", "type": "equal", "value": "GIFT_CARD", "fieldName": "${payment_method}"}, "description": "l3json1", "destinations": [{"id": 1}], "additionalInfo": []}',
          },
          {
            id: 51,
            ruleId: null,
            ruleJson:
              '{"type": "conditional-decision", "condition": {"type": "equal", "value": "GIFT_CARD", "fieldName": "${payment_method}"}}',
            destination: '1',
            version: 7,
            verified: 0,
            droolRule: null,
            active: '1',
            json: '{"name": "l3json1", "active": true, "commit": true, "ruleType": "workflow", "condition": "{\\"id\\":\\"0\\",\\"type\\":\\"equal\\",\\"value\\":\\"GIFT_CARD\\",\\"fieldName\\":\\"${payment_method}\\"}", "conditionUi": {"id": "0", "type": "equal", "value": "GIFT_CARD", "fieldName": "${payment_method}"}, "description": "l3json1", "destinations": [{"id": 1}], "additionalInfo": []}',
          },
          {
            id: 49,
            ruleId: null,
            ruleJson:
              '{"type": "conditional-decision", "condition": {"type": "equal", "value": "GIFT_CARD", "fieldName": "${payment_method}"}}',
            destination: '1',
            version: 6,
            verified: 0,
            droolRule: null,
            active: '1',
            json: '{"name": "l3json1", "active": true, "commit": true, "ruleType": "workflow", "condition": "{\\"id\\":\\"0\\",\\"type\\":\\"equal\\",\\"value\\":\\"GIFT_CARD\\",\\"fieldName\\":\\"${payment_method}\\"}", "conditionUi": {"id": "0", "type": "equal", "value": "GIFT_CARD", "fieldName": "${payment_method}"}, "description": "l3json1", "destinations": [{"id": 1}], "additionalInfo": []}',
          },
          {
            id: 42,
            ruleId: null,
            ruleJson:
              '{"type": "conditional-decision", "condition": {"type": "or", "conditions": [{"type": "equal", "value": "CARD", "fieldName": "${payment_method}"}, {"type": "equal", "value": "GIFT_CARD", "fieldName": "${payment_method}"}]}}',
            destination: '1',
            version: 5,
            verified: 0,
            droolRule: null,
            active: '1',
            json: '{"name": "l3json1", "active": true, "commit": true, "ruleType": "workflow", "condition": "{\\"type\\":\\"or\\",\\"conditions\\":[{\\"id\\":\\"0\\",\\"type\\":\\"equal\\",\\"value\\":\\"CARD\\",\\"fieldName\\":\\"${payment_method}\\"},{\\"id\\":\\"1\\",\\"type\\":\\"equal\\",\\"value\\":\\"GIFT_CARD\\",\\"fieldName\\":\\"${payment_method}\\"}]}", "conditionUi": {"type": "or", "conditions": [{"id": "0", "type": "equal", "value": "CARD", "fieldName": "${payment_method}"}, {"id": "1", "type": "equal", "value": "GIFT_CARD", "fieldName": "${payment_method}"}]}, "description": "l3json1", "destinations": [{"id": 1}], "additionalInfo": []}',
          },
          {
            id: 41,
            ruleId: null,
            ruleJson:
              '{"type": "conditional-decision", "condition": {"type": "or", "conditions": [{"type": "equal", "value": "CARD", "fieldName": "${payment_method}"}, {"type": "equal", "value": "GIFT_CARD", "fieldName": "${payment_method}"}]}}',
            destination: '6',
            version: 4,
            verified: 0,
            droolRule: null,
            active: '1',
            json: '{"name": "l3json1", "active": true, "commit": true, "ruleType": "workflow", "condition": "{\\"type\\":\\"or\\",\\"conditions\\":[{\\"id\\":\\"0\\",\\"type\\":\\"equal\\",\\"value\\":\\"CARD\\",\\"fieldName\\":\\"${payment_method}\\"},{\\"id\\":\\"1\\",\\"type\\":\\"equal\\",\\"value\\":\\"GIFT_CARD\\",\\"fieldName\\":\\"${payment_method}\\"}]}", "conditionUi": {"type": "or", "conditions": [{"id": "0", "type": "equal", "value": "CARD", "fieldName": "${payment_method}"}, {"id": "1", "type": "equal", "value": "GIFT_CARD", "fieldName": "${payment_method}"}]}, "description": "l3json1", "destinations": [{"id": 6}], "additionalInfo": []}',
          },
          {
            id: 19,
            ruleId: null,
            ruleJson:
              '{"type": "conditional-decision", "condition": {"type": "or", "conditions": [{"type": "equal", "value": "CARD", "fieldName": "${payment_method}"}, {"type": "equal", "value": "GIFT_CARD", "fieldName": "${payment_method}"}]}}',
            destination: '1',
            version: 3,
            verified: 0,
            droolRule: null,
            active: '1',
            json: '{"name": "l3json1", "active": true, "commit": true, "ruleType": "workflow", "condition": "{\\"type\\":\\"or\\",\\"conditions\\":[{\\"id\\":\\"0\\",\\"type\\":\\"equal\\",\\"value\\":\\"CARD\\",\\"fieldName\\":\\"${payment_method}\\"},{\\"id\\":\\"1\\",\\"type\\":\\"equal\\",\\"value\\":\\"GIFT_CARD\\",\\"fieldName\\":\\"${payment_method}\\"}]}", "conditionUi": {"type": "or", "conditions": [{"id": "0", "type": "equal", "value": "CARD", "fieldName": "${payment_method}"}, {"id": "1", "type": "equal", "value": "GIFT_CARD", "fieldName": "${payment_method}"}]}, "description": "l3json1", "destinations": [{"id": 1}], "additionalInfo": []}',
          },
          {
            id: 16,
            ruleId: null,
            ruleJson:
              '{"type": "conditional-decision", "condition": {"type": "or", "conditions": [{"type": "equal", "value": "CARD", "fieldName": "${payment_method}"}, {"type": "equal", "value": "GIFT_CARD", "fieldName": "${payment_method}"}]}}',
            destination: '1',
            version: 2,
            verified: 0,
            droolRule: null,
            active: '1',
            json: '{"name": "l3json1", "active": true, "commit": true, "ruleType": "workflow", "condition": "{\\"type\\":\\"or\\",\\"conditions\\":[{\\"id\\":\\"0\\",\\"fieldName\\":\\"${payment_method}\\",\\"type\\":\\"equal\\",\\"value\\":\\"CARD\\"},{\\"id\\":\\"1\\",\\"fieldName\\":\\"${payment_method}\\",\\"type\\":\\"equal\\",\\"value\\":\\"GIFT_CARD\\"}]}", "conditionUi": {"type": "or", "conditions": [{"id": "0", "type": "equal", "value": "CARD", "fieldName": "${payment_method}"}, {"id": "1", "type": "equal", "value": "GIFT_CARD", "fieldName": "${payment_method}"}]}, "description": "l3json1", "destinations": [{"id": 1}], "additionalInfo": []}',
          },
          {
            id: 10,
            ruleId: null,
            ruleJson:
              '{"type": "conditional-decision", "condition": {"type": "equal", "value": "DUPLICATE_TRANSMISSION", "fieldName": "${internal_processing_code}"}}',
            destination: '4',
            version: 1,
            verified: 0,
            droolRule: null,
            active: '1',
            json: '{"name": "l3json1", "active": true, "commit": true, "ruleType": "workflow", "condition": "{\\"id\\":\\"0\\",\\"type\\":\\"equal\\",\\"value\\":\\"DUPLICATE_TRANSMISSION\\",\\"fieldName\\":\\"${internal_processing_code}\\"}", "conditionUi": {"id": "0", "type": "equal", "value": "DUPLICATE_TRANSMISSION", "fieldName": "${internal_processing_code}"}, "description": "l3json1", "destinations": [{"id": 4}], "additionalInfo": []}',
          },
        ],
        routerName: null,
        routerId: null,
        routerVersion: null,
        routerStatus: false,
      },
      {
        id: 6,
        name: 'iso_tcp_client_rule',
        ruleType: 'workflow',
        description: 'iso_rule',
        active: '1',
        versionable: false,
        editable: false,
        zeroVersion: false,
        ruleConfiguration: [
          {
            id: 70,
            ruleId: null,
            ruleJson:
              '{"type": "conditional-decision", "condition": {"type": "equal", "value": "CARD", "fieldName": "${payment_method}"}}',
            destination: '3',
            version: 8,
            verified: 0,
            droolRule: null,
            active: '1',
            json: '{"name": "iso_tcp_client_rule", "active": true, "commit": true, "ruleType": "workflow", "condition": "{\\"id\\":\\"0\\",\\"type\\":\\"equal\\",\\"value\\":\\"CARD\\",\\"fieldName\\":\\"${payment_method}\\"}", "conditionUi": {"id": "0", "type": "equal", "value": "CARD", "fieldName": "${payment_method}"}, "description": "iso_rule", "destinations": [{"id": 3}], "additionalInfo": []}',
          },
          {
            id: 48,
            ruleId: null,
            ruleJson:
              '{"type": "conditional-decision", "condition": {"type": "equal", "value": "CARD", "fieldName": "${payment_method}"}}',
            destination: '3',
            version: 7,
            verified: 0,
            droolRule: null,
            active: '1',
            json: '{"name": "iso_tcp_client_rule", "active": true, "commit": true, "ruleType": "workflow", "condition": "{\\"id\\":\\"0\\",\\"type\\":\\"equal\\",\\"value\\":\\"CARD\\",\\"fieldName\\":\\"${payment_method}\\"}", "conditionUi": {"id": "0", "type": "equal", "value": "CARD", "fieldName": "${payment_method}"}, "description": "iso_rule", "destinations": [{"id": 3}], "additionalInfo": []}',
          },
          {
            id: 15,
            ruleId: null,
            ruleJson:
              '{"type": "conditional-decision", "condition": {"type": "equal", "value": "CARD", "fieldName": "${payment_method}"}}',
            destination: '3',
            version: 6,
            verified: 0,
            droolRule: null,
            active: '1',
            json: '{"name": "iso_tcp_client_rule", "active": true, "commit": true, "ruleType": "workflow", "condition": "{\\"id\\":\\"0\\",\\"fieldName\\":\\"${payment_method}\\",\\"type\\":\\"equal\\",\\"value\\":\\"CARD\\"}", "conditionUi": {"id": "0", "type": "equal", "value": "CARD", "fieldName": "${payment_method}"}, "description": "iso_rule", "destinations": [{"id": 3}], "additionalInfo": []}',
          },
          {
            id: 14,
            ruleId: null,
            ruleJson:
              '{"type": "conditional-decision", "condition": {"type": "equal", "value": "Purchase", "fieldName": "${transaction_type}"}}',
            destination: '3',
            version: 5,
            verified: 0,
            droolRule: null,
            active: '1',
            json: '{"name": "iso_tcp_client_rule", "active": true, "commit": true, "ruleType": "workflow", "condition": "{\\"id\\":\\"0\\",\\"type\\":\\"equal\\",\\"value\\":\\"Purchase\\",\\"fieldName\\":\\"${transaction_type}\\"}", "conditionUi": {"id": "0", "type": "equal", "value": "Purchase", "fieldName": "${transaction_type}"}, "description": "iso_rule", "destinations": [{"id": 3}], "additionalInfo": []}',
          },
          {
            id: 12,
            ruleId: null,
            ruleJson:
              '{"type": "conditional-decision", "condition": {"type": "equal", "value": "Activate", "fieldName": "${transaction_type}"}}',
            destination: '3',
            version: 4,
            verified: 0,
            droolRule: null,
            active: '1',
            json: '{"name": "iso_tcp_client_rule", "active": true, "commit": true, "ruleType": "workflow", "condition": "{\\"id\\":\\"0\\",\\"type\\":\\"equal\\",\\"value\\":\\"Activate\\",\\"fieldName\\":\\"${transaction_type}\\"}", "conditionUi": {"id": "0", "type": "equal", "value": "Activate", "fieldName": "${transaction_type}"}, "description": "iso_rule", "destinations": [{"id": 3}], "additionalInfo": []}',
          },
          {
            id: 8,
            ruleId: null,
            ruleJson:
              '{"type": "conditional-decision", "condition": {"type": "equal", "value": "Activate", "fieldName": "${transaction_type}"}}',
            destination: '3',
            version: 3,
            verified: 0,
            droolRule: null,
            active: '1',
            json: '{"name": "iso_tcp_client_rule", "active": true, "commit": true, "ruleType": "workflow", "condition": "{\\"id\\":\\"0\\",\\"type\\":\\"equal\\",\\"value\\":\\"Activate\\",\\"fieldName\\":\\"${transaction_type}\\"}", "conditionUi": {"id": "0", "type": "equal", "value": "Activate", "fieldName": "${transaction_type}"}, "description": "iso_rule", "destinations": [{"id": 3}], "additionalInfo": []}',
          },
          {
            id: 7,
            ruleId: null,
            ruleJson:
              '{"type": "conditional-decision", "condition": {"type": "equal", "value": "Activate", "fieldName": "${transaction_type}"}}',
            destination: '3',
            version: 2,
            verified: 0,
            droolRule: null,
            active: '1',
            json: '{"name": "iso_tcp_client_rule", "active": false, "commit": true, "ruleType": "workflow", "condition": "{\\"id\\":\\"0\\",\\"type\\":\\"equal\\",\\"value\\":\\"Activate\\",\\"fieldName\\":\\"${transaction_type}\\"}", "conditionUi": {"id": "0", "type": "equal", "value": "Activate", "fieldName": "${transaction_type}"}, "description": "iso_rule", "destinations": [{"id": 3}], "additionalInfo": []}',
          },
          {
            id: 6,
            ruleId: null,
            ruleJson:
              '{"type": "conditional-decision", "condition": {"type": "equal", "value": "Activate", "fieldName": "${transaction_type}"}}',
            destination: '3',
            version: 1,
            verified: 1,
            droolRule: null,
            active: '1',
            json: '{"name": "iso_tcp_client_rule", "active": false, "commit": true, "ruleType": "workflow", "condition": "{\\"id\\":\\"0\\",\\"fieldName\\":\\"${transaction_type}\\",\\"type\\":\\"equal\\",\\"value\\":\\"Activate\\"}", "conditionUi": {"id": "0", "type": "equal", "value": "Activate", "fieldName": "${transaction_type}"}, "description": "iso_rule", "destinations": [{"id": 3}], "additionalInfo": []}',
          },
        ],
        routerName: null,
        routerId: null,
        routerVersion: null,
        routerStatus: false,
      },
      {
        id: 4,
        name: 'HttpUrlEncodedRule',
        ruleType: 'workflow',
        description: 'HttpUrlEncodedRule',
        active: '1',
        versionable: false,
        editable: false,
        zeroVersion: false,
        ruleConfiguration: [
          {
            id: 68,
            ruleId: null,
            ruleJson:
              '{"type": "conditional-decision", "condition": {"type": "equal", "value": "Payment_Token", "fieldName": "${payment_method}"}}',
            destination: '2',
            version: 9,
            verified: 0,
            droolRule: null,
            active: '1',
            json: '{"name": "HttpUrlEncodedRule", "active": true, "commit": true, "ruleType": "workflow", "condition": "{\\"id\\":\\"0\\",\\"type\\":\\"equal\\",\\"value\\":\\"Payment_Token\\",\\"fieldName\\":\\"${payment_method}\\"}", "conditionUi": {"id": "0", "type": "equal", "value": "Payment_Token", "fieldName": "${payment_method}"}, "description": "HttpUrlEncodedRule", "destinations": [{"id": 2}], "additionalInfo": []}',
          },
          {
            id: 53,
            ruleId: null,
            ruleJson:
              '{"type": "conditional-decision", "condition": {"type": "equal", "value": "Payment_Token", "fieldName": "${payment_method}"}}',
            destination: '2',
            version: 8,
            verified: 0,
            droolRule: null,
            active: '1',
            json: '{"name": "HttpUrlEncodedRule", "active": true, "commit": true, "ruleType": "workflow", "condition": "{\\"id\\":\\"0\\",\\"type\\":\\"equal\\",\\"value\\":\\"Payment_Token\\",\\"fieldName\\":\\"${payment_method}\\"}", "conditionUi": {"id": "0", "type": "equal", "value": "Payment_Token", "fieldName": "${payment_method}"}, "description": "HttpUrlEncodedRule", "destinations": [{"id": 2}], "additionalInfo": []}',
          },
          {
            id: 43,
            ruleId: null,
            ruleJson:
              '{"type": "conditional-decision", "condition": {"type": "equal", "value": "Payment_Token", "fieldName": "${payment_method}"}}',
            destination: '2',
            version: 7,
            verified: 0,
            droolRule: null,
            active: '1',
            json: '{"name": "HttpUrlEncodedRule", "active": true, "commit": true, "ruleType": "workflow", "condition": "{\\"id\\":\\"0\\",\\"type\\":\\"equal\\",\\"value\\":\\"Payment_Token\\",\\"fieldName\\":\\"${payment_method}\\"}", "conditionUi": {"id": "0", "type": "equal", "value": "Payment_Token", "fieldName": "${payment_method}"}, "description": "HttpUrlEncodedRule", "destinations": [{"id": 2}], "additionalInfo": []}',
          },
          {
            id: 37,
            ruleId: null,
            ruleJson:
              '{"type": "conditional-decision", "condition": {"type": "equal", "value": "Payment_Token", "fieldName": "${payment_method}"}}',
            destination: '2',
            version: 6,
            verified: 0,
            droolRule: null,
            active: '1',
            json: '{"name": "HttpUrlEncodedRule", "active": true, "commit": true, "ruleType": "workflow", "condition": "{\\"id\\":\\"0\\",\\"type\\":\\"equal\\",\\"value\\":\\"Payment_Token\\",\\"fieldName\\":\\"${payment_method}\\"}", "conditionUi": {"id": "0", "type": "equal", "value": "Payment_Token", "fieldName": "${payment_method}"}, "description": "HttpUrlEncodedRule", "destinations": [{"id": 2}], "additionalInfo": []}',
          },
          {
            id: 36,
            ruleId: null,
            ruleJson:
              '{"type": "conditional-decision", "condition": {"type": "equal", "value": "Payment_Token", "fieldName": "${payment_method}"}}',
            destination: '2',
            version: 5,
            verified: 0,
            droolRule: null,
            active: '1',
            json: '{"name": "HttpUrlEncodedRule", "active": true, "commit": true, "ruleType": "workflow", "condition": "{\\"id\\":\\"0\\",\\"type\\":\\"equal\\",\\"value\\":\\"Payment_Token\\",\\"fieldName\\":\\"${payment_method}\\"}", "conditionUi": {"id": "0", "type": "equal", "value": "Payment_Token", "fieldName": "${payment_method}"}, "description": "HttpUrlEncodedRule", "destinations": [{"id": 2}], "additionalInfo": []}',
          },
          {
            id: 29,
            ruleId: null,
            ruleJson:
              '{"type": "conditional-decision", "condition": {"type": "equal", "value": "Payment_Token", "fieldName": "${payment_method}"}}',
            destination: '2',
            version: 4,
            verified: 1,
            droolRule: null,
            active: '1',
            json: '{"name": "HttpUrlEncodedRule", "active": true, "commit": true, "ruleType": "workflow", "condition": "{\\"id\\":\\"0\\",\\"fieldName\\":\\"${payment_method}\\",\\"type\\":\\"equal\\",\\"value\\":\\"Payment_Token\\"}", "conditionUi": {"id": "0", "type": "equal", "value": "Payment_Token", "fieldName": "${payment_method}"}, "description": "HttpUrlEncodedRule", "destinations": [{"id": 2}], "additionalInfo": []}',
          },
          {
            id: 27,
            ruleId: null,
            ruleJson:
              '{"type": "conditional-decision", "condition": {"type": "equal", "value": "APPROVED", "fieldName": "${internal_processing_code}"}}',
            destination: '2',
            version: 3,
            verified: 0,
            droolRule: null,
            active: '1',
            json: '{"name": "HttpUrlEncodedRule", "active": true, "commit": true, "ruleType": "workflow", "condition": "{\\"id\\":\\"0\\",\\"type\\":\\"equal\\",\\"value\\":\\"APPROVED\\",\\"fieldName\\":\\"${internal_processing_code}\\"}", "conditionUi": {"id": "0", "type": "equal", "value": "APPROVED", "fieldName": "${internal_processing_code}"}, "description": "HttpUrlEncodedRule", "destinations": [{"id": 2}], "additionalInfo": []}',
          },
          {
            id: 26,
            ruleId: null,
            ruleJson:
              '{"type": "conditional-decision", "condition": {"type": "equal", "value": "APPROVED", "fieldName": "${internal_processing_code}"}}',
            destination: '2',
            version: 2,
            verified: 0,
            droolRule: null,
            active: '1',
            json: '{"name": "HttpUrlEncodedRule", "active": true, "commit": true, "ruleType": "workflow", "condition": "{\\"id\\":\\"0\\",\\"type\\":\\"equal\\",\\"value\\":\\"APPROVED\\",\\"fieldName\\":\\"${internal_processing_code}\\"}", "conditionUi": {"id": "0", "type": "equal", "value": "APPROVED", "fieldName": "${internal_processing_code}"}, "description": "HttpUrlEncodedRule", "destinations": [{"id": 2}], "additionalInfo": []}',
          },
          {
            id: 4,
            ruleId: null,
            ruleJson:
              '{"type": "conditional-decision", "condition": {"type": "equal", "value": "APPROVED", "fieldName": "${internal_processing_code}"}}',
            destination: '2',
            version: 1,
            verified: 1,
            droolRule: null,
            active: '1',
            json: '{"name": "HttpUrlEncodedRule", "active": true, "commit": true, "ruleType": "workflow", "condition": "{\\"id\\":\\"0\\",\\"fieldName\\":\\"${internal_processing_code}\\",\\"type\\":\\"equal\\",\\"value\\":\\"APPROVED\\"}", "conditionUi": {"id": "0", "type": "equal", "value": "APPROVED", "fieldName": "${internal_processing_code}"}, "description": "HttpUrlEncodedRule", "destinations": [{"id": 2}], "additionalInfo": []}',
          },
        ],
        routerName: null,
        routerId: null,
        routerVersion: null,
        routerStatus: false,
      },
      {
        id: 2,
        name: 'Rule1',
        ruleType: 'workflow',
        description: 'Rule',
        active: '1',
        versionable: false,
        editable: false,
        zeroVersion: false,
        ruleConfiguration: [
          {
            id: 2,
            ruleId: null,
            ruleJson:
              '{"type": "conditional-decision", "condition": {"type": "equal", "value": "CARD", "fieldName": "${payment_method}"}}',
            destination: '1',
            version: 1,
            verified: 1,
            droolRule: null,
            active: '1',
            json: '{"name": "Rule1", "active": false, "commit": true, "ruleType": "workflow", "condition": "{\\"id\\":\\"0\\",\\"fieldName\\":\\"${payment_method}\\",\\"type\\":\\"equal\\",\\"value\\":\\"CARD\\"}", "conditionUi": {"id": "0", "type": "equal", "value": "CARD", "fieldName": "${payment_method}"}, "description": "Rule", "destinations": [{"id": 1}], "additionalInfo": []}',
          },
        ],
        routerName: null,
        routerId: null,
        routerVersion: null,
        routerStatus: false,
      },
    ],
    'total-filtered-record': 6,
  },
};

xdescribe('DestinationRulesComponent', () => {
  let component: DestinationRulesComponent;
  let fixture: ComponentFixture<DestinationRulesComponent>;
  let store: Store<DestinationRulesComponent>;
  let mockStore: MockStore<IAppState>;
  let setDefaultLangSpy: jasmine.Spy;
  let mockselectAuditLogs: MemoizedSelector<any, any>;
  let translate: TranslateService;
  let destinationRulesService: DestinationRulesService;
  let mockselectDestinationRules: MemoizedSelector<any, any>;

  beforeEach(() => {
    const translateService = jasmine.createSpyObj('TranslateService', ['get', 'setDefaultLang']);
    TestBed.configureTestingModule({
      declarations: [DestinationRulesComponent],
      providers: [
        SnotifyService,
        AlertService,
        DestinationRulesService,
        { provide: TranslateService, useClass: translateServiceMock },
        HttpClient,
        { provide: 'SnotifyToastConfig', useValue: ToastDefaults },
        { provide: DestinationRulesService, useValue: destinationRulesService },
        provideMockStore(),
      ],
      imports: [
        CommonModule,
        NgSelectModule,
        FormsModule,
        AlertModule,
        HttpClientModule,
        SharedModule,
        NgSelectModule,
        FormsModule,
        RouterTestingModule,
        HttpClientTestingModule,
        NgxDatatableModule,
        PrettyJsonRvModule,
        StoreModule.forRoot({}),
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
    fixture = TestBed.createComponent(DestinationRulesComponent);
    component = fixture.componentInstance;
    mockselectDestinationRules = mockStore.overrideSelector(
      selectDestinationRules,
      destinationRuleJson,
    );
    spyOn(component['_router'], 'navigate').and.returnValue(true);
    mockStore.refreshState();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('click reset button should function call filter  ', () => {
    component.resetSearch();
    expect(component.searchResetButton).toEqual(true);
  });
  it(' should function call onback  ', () => {
    component.onBack();
    expect(component.viewFlag).toEqual(true);
    expect(component.ruleFlag).toEqual(false);
  });
  it(' should function call showRule  ', () => {
    component.onShowRule();
    expect(component.ruleFlag).toEqual(true);
  });
  it(' should function call hideRule  ', () => {
    component.onHideRule();
    expect(component.ruleFlag).toEqual(false);
  });
  
  // it('getRowData fuction should call click on viewdetails form this HTMl', () => {
  //   const row = {
  //     active: '1',
  //     description: 'a',
  //     destination: '76767',
  //     editable: false.valueOf,
  //     id: 33,
  //     name: 'she',
  //     routerId: null,
  //     routerName: null,
  //     routerStatus: false,
  //     routerVersion: null,
  //     rule: undefined,
  //     ruleConfiguration: [
  //       {
  //         active: '1',
  //         destination: '76767',
  //         droolRule: null,
  //         id: 94,
  //         json: '{"name": "she", "active": true, "commit": true, "ruleType": "route", "condition": "{\\"id\\":\\"0\\",\\"type\\":\\"pattern\\",\\"pattern\\":\\"Payment_Token\\",\\"fieldName\\":\\"${payment_method}\\"}", "conditionUi": {"id": "0", "type": "pattern", "pattern": "Payment_Token", "fieldName": "${payment_method}"}, "description": "a", "destinations": [{"id": 76767}], "additionalInfo": []}',
  //         ruleId: null,
  //         ruleJson:
  //           '{"type": "conditional-decision", "condition": {"type": "pattern", "pattern": "Payment_Token", "fieldName": "${payment_method}"}}',
  //         verified: 0,
  //         version: 3,
  //       },
  //       {
  //         active: '1',
  //         destination: '76767',
  //         droolRule: null,
  //         id: 93,
  //         json: '{"name": "she", "active": true, "commit": true, "ruleType": "route", "condition": "{\\"id\\":\\"0\\",\\"fieldName\\":\\"${payment_method}\\",\\"type\\":\\"pattern\\",\\"pattern\\":\\"Payment_Token\\"}", "conditionUi": {"id": "0", "type": "pattern", "pattern": "Payment_Token", "fieldName": "${payment_method}"}, "description": "a", "destinations": [{"id": 76767}], "additionalInfo": []}',
  //         ruleId: null,
  //         ruleJson:
  //           '{"type": "conditional-decision", "condition": {"type": "pattern", "pattern": "Payment_Token", "fieldName": "${payment_method}"}}',
  //         verified: 0,
  //         version: 2,
  //       },
  //       {
  //         active: '1',
  //         destination: '76767',
  //         droolRule: null,
  //         id: 92,
  //         json: '{"name": "she", "active": true, "commit": true, "ruleType": "route", "condition": "{\\"id\\":\\"0\\",\\"type\\":\\"pattern\\",\\"pattern\\":\\"CARD\\",\\"fieldName\\":\\"${payment_method}\\"}", "conditionUi": {"id": "0", "type": "pattern", "pattern": "CARD", "fieldName": "${payment_method}"}, "description": "a", "destinations": [{"id": 76767}], "additionalInfo": []}',
  //         ruleId: null,
  //         ruleJson:
  //           '{"type": "conditional-decision", "condition": {"type": "pattern", "pattern": "CARD", "fieldName": "${payment_method}"}}',
  //         verified: 0,
  //         version: 1,
  //       },
  //     ],
  //     ruleType: 'route',
  //     verified: 0,
  //     version: 1,
  //     versionable: false,
  //     zeroVersion: false,
  //   };
  //   component.getRowData(row);
  //   expect((component as any)._router.navigate).toHaveBeenCalledWith(['/routing/rule-engine/', row.id]);
  // });
  it(' should function call click destination rule  ', () => {
    const id = '7';
    component.desnationRule(id);
    expect(component).toBeTruthy;
  });
  
  it(' should function call click version cheked and get row in list  ', () => {
    const row = {
      active: '1',
      description: 'desc',
      destination: '76767',
      editable: false,
      id: 30,
      name: 'test10',
      routerId: null,
      routerName: null,
      routerStatus: false,
      routerVersion: null,
      rule: undefined,
    };
    component.onRowClick(row);
    expect(component).toBeTruthy;
  });
  it(' should function call click check status toggle in html row list ', () => {
    component.onActivate(event);
    expect(component.editFlag).toEqual(false);
  });

  it('get filter should function call event in html row list ', () => {
    const eventData = {};
    component.getFilterNameData(eventData);
    expect(component.searchResetButton).toBeDefined;
  });
  it('get filter should function call confirm rule ', () => {
    const rule = {};
    component.confirmRule(rule);
    expect(component).toBeDefined;
  });
  it('update  should function call update data ', () => {
    const rule = {};
    component.updateRule(rule);
    expect(component).toBeDefined;
  });
  // it('should call _transFilters ', () => {
  //   var result: any = component._transFilters();
  //   expect(result).toEqual('');
  // });

  it('click fuction should call getIMFINDEX', () => {
    const currAttriRef = Object.getPrototypeOf(component);
    const data = [
      {
        active: '1',
        description: 'a',
        editable: false,
        id: 33,
        name: 'she',
        routerId: null,
        routerName: null,
        routerStatus: false,
        routerVersion: null,
        ruleConfiguration: [
          {
            active: '1',
            destination: '76767',
            droolRule: null,
            id: 94,
            json: '{"name": "she", "active": true, "commit": true, "ruleType": "route", "condition": "{\\"id\\":\\"0\\",\\"type\\":\\"pattern\\",\\"pattern\\":\\"Payment_Token\\",\\"fieldName\\":\\"${payment_method}\\"}", "conditionUi": {"id": "0", "type": "pattern", "pattern": "Payment_Token", "fieldName": "${payment_method}"}, "description": "a", "destinations": [{"id": 76767}], "additionalInfo": []}',
            ruleId: null,
            ruleJson:
              '{"type": "conditional-decision", "condition": {"type": "pattern", "pattern": "Payment_Token", "fieldName": "${payment_method}"}}',
            verified: 0,
            version: 3,
          },
          {
            active: '1',
            destination: '76767',
            droolRule: null,
            id: 93,
            json: '{"name": "she", "active": true, "commit": true, "ruleType": "route", "condition": "{\\"id\\":\\"0\\",\\"fieldName\\":\\"${payment_method}\\",\\"type\\":\\"pattern\\",\\"pattern\\":\\"Payment_Token\\"}", "conditionUi": {"id": "0", "type": "pattern", "pattern": "Payment_Token", "fieldName": "${payment_method}"}, "description": "a", "destinations": [{"id": 76767}], "additionalInfo": []}',
            ruleId: null,
            ruleJson:
              '{"type": "conditional-decision", "condition": {"type": "pattern", "pattern": "Payment_Token", "fieldName": "${payment_method}"}}',
            verified: 0,
            version: 2,
          },
          {
            active: '1',
            destination: '76767',
            droolRule: null,
            id: 92,
            json: '{"name": "she", "active": true, "commit": true, "ruleType": "route", "condition": "{\\"id\\":\\"0\\",\\"type\\":\\"pattern\\",\\"pattern\\":\\"CARD\\",\\"fieldName\\":\\"${payment_method}\\"}", "conditionUi": {"id": "0", "type": "pattern", "pattern": "CARD", "fieldName": "${payment_method}"}, "description": "a", "destinations": [{"id": 76767}], "additionalInfo": []}',
            ruleId: null,
            ruleJson:
              '{"type": "conditional-decision", "condition": {"type": "pattern", "pattern": "CARD", "fieldName": "${payment_method}"}}',
            verified: 0,
            version: 1,
          },
        ],
        ruleType: 'route',
        versionable: false,
        zeroVersion: false,
      },
    ];
    currAttriRef._destinationRulesDataTransform(data);
    expect(currAttriRef).toBeTruthy;
  });

  // it('get filter should function call event in html row list ', () => {
  //   const row = {
  //     active: '1',
  //     description: 'desc',
  //     destination: '76767',
  //     editable: false,
  //     id: 30,
  //     name: 'test10',
  //     routerId: null,
  //     routerName: null,
  //     routerStatus: false,
  //     routerVersion: null,
  //     rule: undefined,
  //     ruleConfiguration: [
  //       {
  //         active: '1',
  //         destination: '76767',
  //         droolRule: null,
  //         id: 84,
  //         json: '{"name": "test10", "active": true, "commit": false, "ruleType": "route", "condition": "{\\"id\\":\\"0\\",\\"fieldName\\":\\"${transaction_type}\\",\\"type\\":\\"equal\\",\\"value\\":\\"Cash Withdrawal\\"}", "conditionUi": {"id": "0", "type": "equal", "value": "Cash Withdrawal", "fieldName": "${transaction_type}"}, "description": "desc", "destinations": [{"id": 76767}], "additionalInfo": []}',
  //         ruleId: null,
  //         ruleJson:
  //           '{"type": "conditional-decision", "condition": {"type": "equal", "value": "Cash Withdrawal", "fieldName": "${transaction_type}"}}',
  //         verified: 1,
  //         version: 0,
  //       },
  //     ],
  //     ruleType: 'route',
  //     verified: 1,
  //     version: 0,
  //     versionable: false,
  //     zeroVersion: false,
  //   };
  //   component.editStatus(row);
  //   expect(component.searchResetButton).toBeDefined;
  // });
  afterEach(() => {
    fixture.destroy();
  });
});
