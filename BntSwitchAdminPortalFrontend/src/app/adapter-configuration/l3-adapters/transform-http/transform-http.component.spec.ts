import { HttpClientTestingModule } from '@angular/common/http/testing';
import { EventEmitter } from '@angular/core';
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
import { TransformHttpComponent } from './transform-http.component';
import { SelectStepLisMethod } from '@app/store/selectors/l3-adapter.selectors';
import { selectAdapterDataMap } from '@app/store/selectors/l1-adapter.selectors';
import { selectL1AdapterEntityIMFList } from '@app/store/selectors/l1-adapter.selectors';
import { selectL1AdapterEntityMappingList } from '@app/store/selectors/l1-adapter.selectors';
import { SelectPreActionMethod } from '@app/store/selectors/l1-adapter.selectors';
import { selectL1DraftSave } from '@app/store/selectors/l1-adapter.selectors';
import { SelectMessageContextList } from '@app/store/selectors/l1-adapter.selectors';
import { selectIPC } from '@app/store/selectors/scheme-imf-mapper.selectors';
import { selectIMF } from '@app/store/selectors/scheme-imf-mapper.selectors';
import { selectGetServiceType } from '@app/store/selectors/scheme-imf-mapper.selectors';
import { selectMapper } from '@app/store/selectors/scheme-imf-mapper.selectors';
import { L1AdapterService } from '@app/services/l1-adapter.service';
import { CommonModule } from '@angular/common';

const SelectStepLisMethodJson = {
  status: 'success',
  message: 'Find adapter-step-method list',
  data: [
    {
      actionName: 'HEX_STRING_TO_INT_ARRAY',
      parameters: [
        {
          dataType: 'String',
          name: 'functions.HEX_STRING_TO_INT_ARRAY.parameters.lable',
          possibleValue: null,
          displayName: 'functions.HEX_STRING_TO_INT_ARRAY.display.lable',
          ordinal: 0,
        },
      ],
      tooltip: null,
      type: 'execute_function',
      request: true,
      response: true,
      parametersOptional: true,
    },
    {
      actionName: 'ADDITION',
      parameters: [
        {
          dataType: 'String',
          name: 'source_field',
          possibleValue: null,
          displayName: 'Select field',
          ordinal: 0,
        },
      ],
      tooltip: null,
      type: 'execute_function',
      request: true,
      response: true,
      parametersOptional: true,
    },
    {
      actionName: 'SUBTRACTION',
      parameters: [
        {
          dataType: 'String',
          name: 'source_field',
          possibleValue: null,
          displayName: 'Select field',
          ordinal: 0,
        },
      ],
      tooltip: null,
      type: 'execute_function',
      request: true,
      response: true,
      parametersOptional: true,
    },
    {
      actionName: 'MULTIPLICATION',
      parameters: [
        {
          dataType: 'String',
          name: 'source_field',
          possibleValue: null,
          displayName: 'Select field',
          ordinal: 0,
        },
      ],
      tooltip: null,
      type: 'execute_function',
      request: true,
      response: true,
      parametersOptional: true,
    },
    {
      actionName: 'DIVISION',
      parameters: [
        {
          dataType: 'String',
          name: 'source_field',
          possibleValue: null,
          displayName: 'Select field',
          ordinal: 0,
        },
      ],
      tooltip: null,
      type: 'execute_function',
      request: true,
      response: true,
      parametersOptional: true,
    },
  ],
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
const selectAdapterDataMapJson = [null];
const selectMapperJson = [
  {
    name: 'ISO87_CardTrack2',
    type: 'DBMapper',
    fieldId: '35',
    requestJson: [
      {
        ipc: 'SYSTEM_ERROR',
        type: 'field',
        source: '${35}',
        destination: ['message_exchange[GATEWAY_SERVICE].request_message[card.track2]'],
      },
      {
        ipc: 'SYSTEM_ERROR',
        type: 'field',
        source: '${35}',
        functions: [
          {
            type: 'el_expression',
            expression: "substring(indexOf('=')+1,indexOf('=')+5)",
          },
        ],
        destination: ['message_exchange[GATEWAY_SERVICE].request_message[card.expiry]'],
      },
      {
        ipc: 'SYSTEM_ERROR',
        type: 'field',
        source: '${35}',
        functions: [
          {
            type: 'el_expression',
            expression: "substring(indexOf('=')+5,indexOf('=')+8)",
          },
        ],
        destination: ['message_exchange[GATEWAY_SERVICE].request_message[card.service_code]'],
      },
    ],
    parametersUi: {
      tooltip: 'Card Track2 Mapper',
      signature: [],
    },
  },
  {
    name: 'ISO_Amount_Mapper',
    type: 'DBMapper',
    fieldId: '49',
    requestJson: [
      {
        ipc: 'SYSTEM_ERROR',
        type: 'field',
        source: '${param1}',
        destination: ['message_exchange[GATEWAY_SERVICE].request_message[param2.currency]'],
      },
      {
        ipc: 'SYSTEM_ERROR',
        type: 'imdg_enrich',
        fields: [
          {
            ipc: 'SYSTEM_ERROR',
            type: 'field',
            source: '${minor_unit}',
            destination: ['message_exchange[GATEWAY_SERVICE].request_message[param2.minor_unit]'],
          },
        ],
        lookupType: {
          type: 'imdg_enrich',
          query: {
            from: {
              type: 'from',
              mapName: 'SW-Currency',
            },
            type: 'search',
            select: {
              type: 'select',
              columns: [
                {
                  type: 'aliasColumn',
                  alias: {
                    name: 'currencyMinorUnit',
                    type: 'alias',
                    alias: 'minor_unit',
                  },
                },
              ],
            },
            condition: {
              type: 'and',
              conditions: [
                {
                  type: 'equal',
                  value: '${message_exchange[GATEWAY_SERVICE].request_message[param2.currency]}',
                  fieldName: 'isoCode',
                },
              ],
            },
          },
        },
      },
      {
        ipc: 'SYSTEM_ERROR',
        type: 'field',
        source: '${source_field}',
        functions: [
          {
            type: 'function',
            parameters: ['${message_exchange[GATEWAY_SERVICE].request_message[param2.minor_unit]}'],
            functionName: 'ISO_87_AMOUNT_FORMATER',
          },
        ],
        destination: ['message_exchange[GATEWAY_SERVICE].request_message[param2.value]'],
      },
    ],
    parametersUi: {
      tooltip: 'tooltip_message',
      signature: [
        {
          name: 'source_currency_field',
          type: 'string',
          ordinal: '1',
          replacestring: 'param1',
        },
        {
          name: 'imf_amount_field',
          type: 'string',
          ordinal: '2',
          replacestring: 'param2',
        },
      ],
    },
  },
  {
    name: 'PARSE_87_LOCAL_DATE_TIME',
    type: 'BuiltInMapper',
    fieldId: 'ALL',
    requestJson: {
      type: 'in_built_mapper',
      source: '${source_field}',
      mapper: 'PARSE_87_LOCAL_DATE_TIME',
      parameters: [],
      ipc: 'SYSTEM_ERROR',
    },
    parametersUi: {
      tooltip: 'convert date and time fields and sets into desitantion imf field',
      signature: [
        {
          name: 'source_time_field',
          ordinal: 1,
          type: 'String',
        },
        {
          name: 'source_date_field',
          ordinal: 2,
          type: 'String',
        },
        {
          name: 'imf_local_date_time_field',
          ordinal: 3,
          type: 'String',
        },
      ],
    },
  },
  {
    name: 'PARSE_87_ICC_DE55',
    type: 'BuiltInMapper',
    fieldId: 'ALL',
    requestJson: {
      type: 'in_built_mapper',
      source: '${source_field}',
      mapper: 'PARSE_87_ICC_DE55',
      parameters: [],
      ipc: 'SYSTEM_ERROR',
    },
    parametersUi: {
      tooltip: 'parse tag field and populate into imf tags',
      signature: [
        {
          name: 'source_field',
          ordinal: 1,
          type: 'String',
        },
        {
          name: 'imf_field',
          ordinal: 2,
          type: 'String',
        },
        {
          name: 'header_expression',
          ordinal: 3,
          type: 'String',
        },
      ],
    },
  },
  {
    name: 'BUILD_87_ICC_DE55',
    type: 'BuiltInMapper',
    fieldId: 'ALL',
    requestJson: {
      type: 'in_built_mapper',
      source: '${source_field}',
      mapper: 'BUILD_87_ICC_DE55',
      parameters: [],
      ipc: 'SYSTEM_ERROR',
    },
    parametersUi: {
      tooltip: 'parse field and populate into iso field',
      signature: [
        {
          name: 'imf_field',
          ordinal: 1,
          type: 'String',
        },
        {
          name: 'source_field',
          ordinal: 2,
          type: 'String',
        },
        {
          name: 'imf_field',
          ordinal: 3,
          type: 'String',
        },
        {
          name: 'header_expression',
          ordinal: 4,
          type: 'String',
        },
      ],
    },
  },
  {
    name: 'AMMOUNT_MAPPER',
    type: 'BuiltInMapper',
    fieldId: 'ALL',
    requestJson: {
      type: 'in_built_mapper',
      source: '${source_field}',
      mapper: 'AMMOUNT_MAPPER',
      parameters: [],
      ipc: 'SYSTEM_ERROR',
    },
    parametersUi: {
      tooltip: 'prepare amount field using by shifting digits using currency minor unit',
      signature: [
        {
          name: 'source_amount_field',
          ordinal: 1,
          type: 'String',
        },
        {
          name: 'source_currency_field',
          ordinal: 2,
          type: 'String',
        },
        {
          name: 'imf_amaount_value_field',
          ordinal: 3,
          type: 'String',
        },
      ],
    },
  },
  {
    name: 'GROOVY_EXECUTOR',
    type: 'BuiltInMapper',
    fieldId: 'ALL',
    requestJson: {
      type: 'in_built_mapper',
      source: '${source_field}',
      mapper: 'GROOVY_EXECUTOR',
      parameters: [],
      ipc: 'SYSTEM_ERROR',
    },
    parametersUi: {
      tooltip: 'execute groovy script',
      signature: [
        {
          name: 'groovy_script',
          ordinal: 1,
          type: 'String',
        },
      ],
    },
  },
];
const selectGetServiceTypeJson = [
  {
    id: 30,
    value: 'AUTH_SERVICE',
    description: 'AUTH SERVICE',
    modifiable: '0',
    active: '1',
    lookupType: {
      id: 7,
      name: 'Service_Type',
      description: 'Service Type',
      modifiable: '0',
    },
  },
  {
    id: 65,
    value: 'CARD_SERVICE',
    description: 'CARD_SERVICE',
    modifiable: '0',
    active: '1',
    lookupType: {
      id: 7,
      name: 'Service_Type',
      description: 'Service Type',
      modifiable: '0',
    },
  },
  {
    id: 31,
    value: 'FRAUD_SERVICE',
    description: 'FRAUD SERVICE',
    modifiable: '0',
    active: '1',
    lookupType: {
      id: 7,
      name: 'Service_Type',
      description: 'Service Type',
      modifiable: '0',
    },
  },
  {
    id: 54,
    value: 'GATEWAY_SERVICE',
    description: 'GATEWAY_SERVICE',
    modifiable: '0',
    active: '1',
    lookupType: {
      id: 7,
      name: 'Service_Type',
      description: 'Service Type',
      modifiable: '0',
    },
  },
  {
    id: 56,
    value: 'LOYALTY_SERVICE',
    description: 'LOYALTY SERVICE',
    modifiable: '0',
    active: '1',
    lookupType: {
      id: 7,
      name: 'Service_Type',
      description: 'Service Type',
      modifiable: '0',
    },
  },
];
const selectIMFJson = {
  ImfField: [
    {
      name: 'response.amounts.amount_transaction.value',
      alias: 'Value',
      type: 'DOUBLE',
      hide: false,
    },
    {
      name: 'response.amounts.amount_transaction.minor_unit',
      alias: 'Currency minor unit',
      type: 'INTEGER',
      hide: false,
    },
    {
      name: 'response.amounts.amount_transaction.currency',
      alias: 'Currency',
      type: 'STRING',
      hide: false,
    },
    {
      name: 'paappi',
      alias: 'Pappi',
      type: 'STRING',
      hide: false,
    },
    {
      name: 'test',
      alias: 'testing',
      type: 'CHAR',
      hide: false,
    },
    {
      name: 'masked_card_number',
      alias: 'masked_card_number',
      type: 'STRING',
      hide: false,
    },
  ],
};
const selectIPCJson = [
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
  {
    id: 123,
    value: 'TEST_IPC',
    description: 'test desc',
    modifiable: '1',
    active: '1',
    lookupType: {
      id: 10,
      name: 'INTERNAL_PROCESSING_CODE',
      description: 'Internal Processing Code',
      modifiable: '0',
    },
  },
  {
    id: 59,
    value: 'TRANSACTION_TIMEOUT',
    description: 'TRANSACTION_TIMEOUT',
    modifiable: '0',
    active: '1',
    lookupType: {
      id: 10,
      name: 'INTERNAL_PROCESSING_CODE',
      description: 'Internal Processing Code',
      modifiable: '0',
    },
  },
  {
    id: 127,
    value: 'value',
    description: 'df',
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
const SelectMessageContextListJson = [null];
const selectL1DraftSaveJson = [null];
const SelectPreActionMethodJson = {
  status: 'success',
  message: 'Find cart-pre-actions-method list',
  data: [
    {
      actionName: 'ENRICH_ORIGINAL_TRANSACTION',
      parameters: [
        {
          dataType: 'Map',
          name: 'imf_field_names:imf_field_names',
          possibleValue: null,
          displayName: 'Txn Field To Match:Value',
          ordinal: 0,
        },
        {
          dataType: 'Map',
          name: 'imf_field_names:imf_field_names',
          possibleValue: null,
          displayName: 'Live Txn Field:Origional Txn Field',
          ordinal: 1,
        },
      ],
      tooltip: null,
      type: null,
      request: true,
      response: true,
      parametersOptional: false,
    },
    {
      actionName: 'UPDATE_ORIGINAL',
      parameters: [
        {
          dataType: 'Map',
          name: 'imf_field_names:imf_field_names',
          possibleValue: null,
          displayName: 'Txn Field To Match:Value',
          ordinal: 0,
        },
        {
          dataType: 'Map',
          name: 'imf_field_names:imf_field_names',
          possibleValue: null,
          displayName: 'Live Txn Field:Origional Txn Field',
          ordinal: 1,
        },
      ],
      tooltip: null,
      type: null,
      request: true,
      response: true,
      parametersOptional: false,
    },
    {
      actionName: 'EXECUTE_CUSTOM_CODE',
      parameters: [
        {
          dataType: 'String',
          name: 'Mapper class Name',
          possibleValue: null,
          displayName: 'Mapper class Name',
          ordinal: 0,
        },
      ],
      tooltip: null,
      type: null,
      request: true,
      response: true,
      parametersOptional: false,
    },
  ],
};
const selectL1AdapterEntityMappingListJson = {
  status: 'success',
  message: 'Find Entity-Mapping-List JSON',
  data: {
    Merchant: [
      'totalLocation',
      'totalDevice',
      'additionalAttribute',
      'activateOn',
      'updatedOn',
      'id',
      'reversalTimeout',
      'updatedBy',
      'merchantInstitution',
      'posSafetyFlag',
      'deleted',
      'expiryOn',
      'locked',
      'createdBy',
      'createdOn',
      'name',
      'description',
      'merchantDetail',
      'code',
      'merchantProfile',
      'code (where)',
    ],
    Device: [
      'updatedOn',
      'id',
      'location',
      'updatedBy',
      'deviceModelId',
      'type',
      'pedSerialNo',
      'code',
      'pedId',
      'name',
      'merchant',
      'reversalTimeout',
      'activateOn',
      'createdBy',
      'createdOn',
      'locked',
      'posSafetyFlag',
      'deleted',
      'additionalAttribute',
      'code (where)',
    ],
  },
};
const selectL1AdapterEntityIMFListJson = {
  status: 'success',
  message: 'Find Imf-field-list JSON',
  data: {
    ImfField: [
      'paappipppppepep',
      'ppro_notification',
      'account_number_extended',
      'posdatacode',
      'transmission_date_time',
      'settlementdate',
      'date_settlement',
      'date_conversion',
      'merchant_type',
      'account_number_country_code',
      'forwarding_institution_country_code',
      'network_international_identifier',
      'forwarding_institution_code',
      'approval_code',
      'authorizing_agent_institution_id',
      'cardholder_presence',
      'receiving_institution_identification_code',
      'merchant_identification',
      'device_code',
      'merchant_velocity',
      'pin_ksn',
      'pan_ksn',
      'otb_data',
      'offline_refund',
      'time_zone',
      'enc_track2',
      'security_token',
      'processor_id',
      'barcode',
      'bin',
      'response_desc',
      'session_guid',
      'system_trace_audit_number',
      'account_number',
      'customer_id',
      'request_guid',
      'machine_name',
      'terminal_identification',
      'local_date_time',
      'mac_address',
      'epp_serial_number',
      'utc_offset',
      'api_version',
      'earned_points',
      'earned_cash',
      'number_transactions',
      'from_date',
      'to_date',
      'destinationID',
      'card_number_last_four_digits',
      'response_code',
      'stan',
      'language',
      'additional_validation_data',
      'transaction_guid',
      'pin_data',
      'secondary_pin_data',
      'emv_data',
      'response_code',
      'error_message',
      'auth_code',
      'out_of_service',
      'auth_number',
      'rrn',
      'receipt_data',
      'for_ex_rate',
      'phone_number',
      'key_value_pairs',
      'acceptor_identification_code',
      'category',
      'companyId',
      'bill_reference',
      'payment_type',
      'acquirer_institution_code',
      'referenceNumber',
      'advice_type',
      'message_protocol',
      'echo_data',
      'additional_amount',
      'activation_code',
      'messages',
      'replay',
      'error_Code',
      'error_message',
      'txn_id',
      'dest_account_number',
      'reservation_id',
      'currency_date',
      'personal_id',
      'purpose',
      'ben_ref_number',
      'ben_ref_model',
      'ben_name',
      'ben_address',
      'ord_party_ref_model',
      'ord_party_ref_number',
      'ord_party_address',
      'ord_party_place',
      'urgency',
      'actual_amount',
      'template_id',
      'trn_status',
      'checkpoint',
      'source_amount_value',
      'source_amount_currency',
      'dest_amount_currency',
      'card_id',
      'purpose_code',
      'info',
      'fee_percent',
      'tax',
      'tax_percent',
      'local_currency_code',
      'exchange_rate',
      'product_type',
      'local_amount',
      'description',
      'dateofbirth',
      'rez',
      'source_id',
      'mti',
      'processing_code',
      'local_time',
      'local_date',
      'network_info_code',
      'additional_data',
      'new_pin_data',
      'advice_reason_code',
      'additional_response_data',
      'merchant_category_code',
      'merchant_name',
      'pin_format',
      'cvvecom_result_code',
      'la_additional_response_data',
      'card_authentication_result_code',
      'pacm_diversion_reasoncode',
      'pacm_diversion_level',
      'cvv_result_code',
      'card_product_type',
      'tvc_result_code',
      'avs_result_code',
      'pin_service_code',
      'response_reason_code',
      'network_identification_code',
      'fee_program_indicator',
      'product_id',
      'TID',
      'transaction_id',
      'visa_additional_response',
      'account_funding_source',
      'program_identifier',
      'fallback_reason',
      'transaction_date_time',
      'authorisation_source',
      'token_Cryptogram',
      'MC_DE48_SE42',
      'MC_DE48_SE52',
      'VISA_F44_SF15',
      'is_token_cryptogram_present',
      'notification_url',
      'payment_method_id',
      'payment_method_type',
      'payment_method_flow',
      'login',
      'password',
      'merchant_redirect_url',
      'redirect_secret',
      'request_status',
      'callback_url',
      'trn_status_detail',
      'trn_status_code',
      'payment_method',
      'order_id',
      'hash_value',
      'fund_status',
      'finger_print',
      'small_cash_indicator',
      'date_capture',
      'acquirer_country_code',
      'issuer_id',
      'replace_merchant_id',
      'replace_terminal_id',
      'repeat_count',
      'replace_merchant',
      'replace_terminal',
      'track2_ksn',
      'track2_initial_vector',
      'onus',
      'reference_id',
      'alternate_id',
      'unique_id',
      'reason',
      'operator_id',
      'basket_id',
      'transaction_ref',
      'reverse',
      'finalise',
      'sku',
      'consumer_message',
      'activate_message',
      'request_id',
      'member_status',
      'delivery_method',
      'amount_in_change',
      'cell_phone_number',
      'payment_code',
      'allocate_message',
      'block',
      'advice_match',
      'intial_email_address',
      'authorization_data_indicator',
      'mcc',
      'response2',
      'paappi',
      'test',
      'masked_card_number',
    ],
  },
};
class translateServiceMock {
  public onLangChange: EventEmitter<any> = new EventEmitter();
  public onTranslationChange: EventEmitter<any> = new EventEmitter();
  public onDefaultLangChange: EventEmitter<any> = new EventEmitter();

  public get(key: any): any {
    return of(key);
  }
}
describe('TransformHttpComponent', () => {
  let component: TransformHttpComponent;
  let fixture: ComponentFixture<TransformHttpComponent>;
  let mockStore: MockStore<IAppState>;
  let mockSelectStepLisMethod: MemoizedSelector<any, any>;
  let mockselectViewSettingsList: MemoizedSelector<any, any>;
  let mockselectAdapterDataMap: MemoizedSelector<any, any>;
  let mockselectMapper: MemoizedSelector<any, any>;
  let mockselectGetServiceType: MemoizedSelector<any, any>;
  let mockselectIMF: MemoizedSelector<any, any>;
  let mockselectIPC: MemoizedSelector<any, any>;
  let mockSelectMessageContextList: MemoizedSelector<any, any>;
  let mockselectL1DraftSave: MemoizedSelector<any, any>;
  let mockSelectPreActionMethod: MemoizedSelector<any, any>;
  let mockselectL1AdapterEntityMappingList: MemoizedSelector<any, any>;
  let mockselectL1AdapterEntityIMFList: MemoizedSelector<any, any>;

  let translateService: TranslateService;
  const importFileService = jasmine.createSpyObj('ImportFileService', ['clearData']);
  beforeEach(() => {
    const translateService = jasmine.createSpyObj('TranslateService', ['get', 'setDefaultLang']);
    const alertService = jasmine.createSpyObj('AlertService, SnotifyService', ['responseMessage']);
    TestBed.configureTestingModule({
      declarations: [TransformHttpComponent],
      providers: [
        SnotifyService,
        L1AdapterService,
        { provide: TranslateService, useClass: translateServiceMock },
        { provide: 'SnotifyToastConfig', useValue: {} },
        { provide: ImportFileService, useValue: importFileService },
        { provide: AlertService, useValue: alertService },

        provideMockStore(),
      ],
      imports: [
        SharedModule,
        NgSelectModule,
        FormsModule,
        ReactiveFormsModule,
        AlertModule,
        TabsModule,
        TranslateModule.forRoot({}),
        DatePickerRvModule,
        RouterTestingModule,
        HttpClientTestingModule,
        NgxDatatableModule,
        //ImportFileModule,
        StoreModule.forRoot({}),
        CommonModule
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    mockStore = TestBed.inject(MockStore);
    fixture = TestBed.createComponent(TransformHttpComponent);
    component = fixture.componentInstance;
    // component.adapterData={imfId:0};
    // component.adapterData.data={id:1};

    mockSelectStepLisMethod = mockStore.overrideSelector(
      SelectStepLisMethod,
      SelectStepLisMethodJson,
    );
    mockselectViewSettingsList = mockStore.overrideSelector(
      selectViewSettingsList,
      selectViewSettingsListJson,
    );
    mockselectAdapterDataMap = mockStore.overrideSelector(
      selectAdapterDataMap,
      selectAdapterDataMapJson,
    );
    mockselectMapper = mockStore.overrideSelector(selectMapper, selectMapperJson);
    mockselectGetServiceType = mockStore.overrideSelector(
      selectGetServiceType,
      selectGetServiceTypeJson,
    );
    mockselectIMF = mockStore.overrideSelector(selectIMF, selectIMFJson);
    mockselectIPC = mockStore.overrideSelector(selectIPC, selectIPCJson);
    mockSelectMessageContextList = mockStore.overrideSelector(
      SelectMessageContextList,
      SelectMessageContextListJson,
    );
    mockselectL1DraftSave = mockStore.overrideSelector(selectL1DraftSave, selectL1DraftSaveJson);
    mockSelectPreActionMethod = mockStore.overrideSelector(
      SelectPreActionMethod,
      SelectPreActionMethodJson,
    );
    mockselectL1AdapterEntityMappingList = mockStore.overrideSelector(
      selectL1AdapterEntityMappingList,
      selectL1AdapterEntityMappingListJson,
    );
    mockselectL1AdapterEntityIMFList = mockStore.overrideSelector(
      selectL1AdapterEntityIMFList,
      selectL1AdapterEntityIMFListJson,
    );
    translateService = TestBed.inject(TranslateService);
    mockStore.refreshState();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  afterEach(() => {
    fixture.destroy();
  });
});
