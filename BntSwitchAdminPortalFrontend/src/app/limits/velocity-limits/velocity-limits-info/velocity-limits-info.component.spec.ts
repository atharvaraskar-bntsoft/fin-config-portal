import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ActivatedRoute, convertToParamMap, Router } from '@angular/router';
import { VelocityLimitsInfoComponent } from './velocity-limits-info.component';
import { MemoizedSelector, Store } from '@ngrx/store';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { TranslateService } from '@ngx-translate/core';
import { AlertService } from '@app/services/alert.service';
import { SnotifyService, ToastDefaults } from 'ng-snotify';
import { HttpClient } from '@angular/common/http';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { VelocityLimitsService } from '@app/services/velocity-limits.service';
import { AlertModule, InputRvModule, TabsModule } from 'bnt';
import { IAppState } from '@app/store/state/app.state';
import { of } from 'rxjs';
import { SharedModule } from '@app/shared/shared.module';
import { CommonModule } from '@angular/common';
import { ModalModule } from 'angular-custom-modal';
import { selectVelocityLimitsEditRow } from '@app/store/selectors/velocity-limits.selector';
import { selectViewSettingsList } from '@app/store/selectors/view-settings.selector';
import { selectFilterData } from '@app/store/selectors/filter.selectors';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { EventEmitter } from '@angular/core';
import { VelocityLimitsRoutingModule } from '../velocity-limits-routing.module';
import { selectPermissionsData } from '@app/store/selectors/permission.selectors';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

const filterJson = {
  data: {
    applyLimit: [
      {
        id: 'INSTITUTION_GROUP',
        name: 'MerchantInstitution',
      },
    ],
    status: [
      {
        id: '1',
        name: 'Active',
      },
    ],
    txnType: ['Cash Withdrawal'],
  },
};
const viewsettingJSON = {
  data: {
    pagination: [],
    language: [],
    settingDto: {
      id: 1,
      systemUserId:
        'SystemUser [firstName=Bnt, lastName=Admin,  email=bnt.admin@bnt.com, systemUserCategory=, password=9AHRz1ElALzTEdFKIKywyzEZh0IcZ/INhbGkbc0Qb84=, passwordLastUpdatedOn=2020-07-02 13:09:08.0, locked=0, deleted=0, lockedReason=null]',
      search: 'contain',
      language: 'en_EN1',
      pagination: '20',
    },
    searchOption: [],
  },
};

const permissionJSON = {
  status: 'success',
  message: null,
  data: [
    {
      id: 'link_notification',
      read: true,
      write: true,
      update: true,
      delete: true,
      check: false,
    },
    {
      id: 'link_merchant_reports',
      read: true,
      write: true,
      update: true,
      delete: true,
      check: false,
    },
    {
      id: 'link_emv_data',
      read: true,
      write: true,
      update: true,
      delete: true,
      check: false,
    },
    {
      id: 'link_dashboard',
      read: true,
      write: true,
      update: true,
      delete: true,
      check: false,
    },
    {
      id: 'link_status',
      read: true,
      write: true,
      update: true,
      delete: true,
      check: false,
    },
    {
      id: 'link_deployed_router',
      read: true,
      write: true,
      update: true,
      delete: true,
      check: false,
    },
    {
      id: 'link_exports',
      read: true,
      write: true,
      update: true,
      delete: true,
      check: false,
    },
    {
      id: 'link_merchant',
      read: true,
      write: true,
      update: true,
      delete: true,
      check: true,
    },
    {
      id: 'link_rule',
      read: true,
      write: true,
      update: true,
      delete: true,
      check: false,
    },
    {
      id: 'link_workflow_rule',
      read: true,
      write: true,
      update: true,
      delete: true,
      check: false,
    },
    {
      id: 'link_location',
      read: true,
      write: true,
      update: true,
      delete: true,
      check: true,
    },
    {
      id: 'link_deployment_schedule',
      read: true,
      write: true,
      update: true,
      delete: true,
      check: false,
    },
    {
      id: 'link_routing_rule',
      read: true,
      write: true,
      update: true,
      delete: true,
      check: false,
    },
    {
      id: 'link_view_settings',
      read: true,
      write: true,
      update: true,
      delete: true,
      check: false,
    },
    {
      id: 'link_user_roles',
      read: true,
      write: true,
      update: true,
      delete: true,
      check: false,
    },
    {
      id: 'link_exception_queue',
      read: true,
      write: true,
      update: true,
      delete: true,
      check: false,
    },
    {
      id: 'link_l3_adapters',
      read: true,
      write: true,
      update: true,
      delete: true,
      check: true,
    },
    {
      id: 'link_acquirer_id_config',
      read: true,
      write: true,
      update: true,
      delete: true,
      check: false,
    },
    {
      id: 'link_deployment_l2json',
      read: true,
      write: true,
      update: true,
      delete: true,
      check: false,
    },
    {
      id: 'link_audit_log',
      read: true,
      write: true,
      update: true,
      delete: true,
      check: false,
    },
    {
      id: 'link_access_log',
      read: true,
      write: true,
      update: true,
      delete: true,
      check: false,
    },
    {
      id: 'link_routing_router',
      read: true,
      write: true,
      update: true,
      delete: true,
      check: false,
    },
    {
      id: 'link_device_types',
      read: true,
      write: true,
      update: true,
      delete: true,
      check: false,
    },
    {
      id: 'link_mid',
      read: true,
      write: true,
      update: true,
      delete: true,
      check: false,
    },
    {
      id: 'link_bin_table',
      read: true,
      write: true,
      update: true,
      delete: true,
      check: false,
    },
    {
      id: 'link_lookup_values',
      read: true,
      write: true,
      update: true,
      delete: true,
      check: true,
    },
    {
      id: 'link_velocity',
      read: true,
      write: true,
      update: true,
      delete: true,
      check: false,
    },
    {
      id: 'link_countries',
      read: true,
      write: true,
      update: true,
      delete: true,
      check: false,
    },
    {
      id: 'link_deployment_clusters',
      read: true,
      write: true,
      update: true,
      delete: true,
      check: false,
    },
    {
      id: 'link_saf_queue',
      read: true,
      write: true,
      update: true,
      delete: true,
      check: false,
    },
    {
      id: 'link_acquirer_mapping',
      read: true,
      write: true,
      update: true,
      delete: true,
      check: false,
    },
    {
      id: 'link_country_states',
      read: true,
      write: true,
      update: true,
      delete: true,
      check: false,
    },
    {
      id: 'link_device',
      read: true,
      write: true,
      update: true,
      delete: true,
      check: true,
    },
    {
      id: 'link_el_function',
      read: true,
      write: true,
      update: true,
      delete: true,
      check: false,
    },
    {
      id: 'link_router',
      read: true,
      write: true,
      update: true,
      delete: true,
      check: false,
    },
    {
      id: 'link_imf',
      read: true,
      write: true,
      update: true,
      delete: true,
      check: false,
    },
    {
      id: 'link_pending_approvals',
      read: true,
      write: true,
      update: true,
      delete: true,
      check: false,
    },
    {
      id: 'link_invalid_txn_log',
      read: true,
      write: true,
      update: true,
      delete: true,
      check: false,
    },
    {
      id: 'link_currencies',
      read: true,
      write: true,
      update: true,
      delete: true,
      check: false,
    },
    {
      id: 'link_institution',
      read: true,
      write: true,
      update: true,
      delete: true,
      check: true,
    },
    {
      id: 'link_tag_rule',
      read: true,
      write: true,
      update: true,
      delete: true,
      check: false,
    },
    {
      id: 'link_user',
      read: true,
      write: true,
      update: true,
      delete: true,
      check: false,
    },
    {
      id: 'link_processor_adapter',
      read: true,
      write: true,
      update: true,
      delete: true,
      check: false,
    },
    {
      id: 'link_txn_log',
      read: true,
      write: true,
      update: true,
      delete: true,
      check: false,
    },
    {
      id: 'link_l1_adapters',
      read: true,
      write: true,
      update: true,
      delete: true,
      check: true,
    },
    {
      id: 'link_deployment_history',
      read: true,
      write: true,
      update: true,
      delete: true,
      check: false,
    },
    {
      id: 'link_monitoring',
      read: false,
      write: false,
      update: false,
      delete: false,
      check: false,
    },
    {
      id: 'link_extractor',
      read: true,
      write: true,
      update: true,
      delete: true,
      check: false,
    },
    {
      id: 'link_deployment_status',
      read: true,
      write: true,
      update: true,
      delete: true,
      check: false,
    },
    {
      id: 'link_workflow_router',
      read: true,
      write: true,
      update: true,
      delete: true,
      check: false,
    },
    {
      id: 'link_workflow',
      read: true,
      write: true,
      update: true,
      delete: true,
      check: false,
    },
  ],
};
const selectVelocityLimitsEditRowJson = {
  status: 'success',
  message: 'Find Velocity Limits',
  data: {
    id: 1,
    merchantInstitutionId: {
      id: 2,
      institution: {
        id: 1,
        name: 'Institution_1',
      },
      acquirer: {
        id: 2,
        code: '002',
        description: 'Pine Lab for Pos',
        active: true,
        deleted: '0',
        adviceMatch: '1',
        name: 'Pine Lab',
        onusValidate: '0',
        refundOffline: '0',
        country: {
          id: 12,
          code: 'IND',
          countryName: 'India',
          currency: {
            id: 22,
            code: 'INR',
            isoCode: '356',
            currencyName: 'Indian Rupee',
            active: true,
            currencyMinorUnit: '2',
            deleted: '0',
          },
          isoCode: '356',
          shortCode: 'IN',
          isdCode: '91',
          active: true,
          deleted: null,
        },
        pos_sms: null,
        pos_dms: null,
        txntype_sms: null,
        txntype_dms: null,
        accounttype_sms: null,
        accounttype_dms: null,
      },
      code: '0000002',
      name: 'Reliance Industries Limt',
      description: 'Reliance Industries Limt group',
      activateOn: 1489822800000,
      expiryOn: 1803022800000,
      totalMerchant: 1,
      totalLocation: null,
      totalDevice: null,
      merchantInstitutionDetail: {
        id: 2,
        address1: 'Mumbai',
        address2: 'Mumbai India',
        city: 'Mumbai',
        zip: '400004',
        country: {
          id: 12,
          countryName: 'India',
        },
        countryState: {
          id: 67,
          stateName: 'Default',
        },
        phone: '1800 102 7382',
        fax: '3100 102 7382',
        email: 'reliance@info.com',
      },
      locked: '0',
    },
    merchantId: {
      id: 2,
      merchantInstitution: {
        id: 2,
        name: 'Reliance Industries Limt',
      },
      code: '00000002',
      name: 'Reliance Digital',
      description: 'Reliance digital under Reliance Industries',
      activateOn: 1521359280000,
      expiryOn: 1773906480000,
      totalLocation: 1,
      totalDevice: 1,
      locked: '0',
      posSafetyFlag: '0',
      reversalTimeout: null,
      merchantProfile: {
        id: 2,
        partialAuth: 'Y',
        velocity: null,
        category: '6011',
        services: 'LOYALTY_SERVICE',
        additionalServices: null,
      },
      acquirerID: null,
      merchantDetail: {
        id: 2,
        address1: 'Ghaziabad',
        address2: 'Indirapuram Ghaziabad UP',
        city: 'Ghaziabad',
        zip: '201012',
        country: {
          id: 12,
          countryName: 'India',
        },
        countryState: {
          id: 67,
          stateName: 'Default',
        },
        phone: '1800 889 1044',
        fax: ' 1800 889 1044',
        email: 'digital@info.com',
      },
      currency: null,
      bankName: null,
      accountNumber: null,
      additionalAttribute: null,
    },
    locationId: {
      id: 2,
      totalDevice: 1,
      code: '000000002',
      name: 'Indirapuram, Ghaziabad',
      merchant: {
        id: 2,
        name: 'Reliance Digital',
      },
      merchantInstitution: null,
      description: 'Reliance digital Indirapuram, Ghaziabad, Uttar Pradesh',
      activateOn: 1521359760000,
      expiryOn: 1771315020000,
      storeId: null,
      posSafetyFlag: '1',
      reversalTimeout: '5',
      locked: '0',
      locationDetail: {
        id: 2,
        email: 'digitalreliance@info.com',
        phone: '1800-2390-23',
        fax: '1800-2390-32',
        address1: 'Indirapuram,Ghaziabad',
        address2: 'Ghaziabad, Uttar Pradesh ',
        city: 'Ghaziabad',
        country: {
          id: 12,
          countryName: 'India',
        },
        countryState: {
          id: 67,
          stateName: 'Default',
        },
        zip: '201012',
      },
      coordinates: null,
      additionalAttribute: null,
    },
    deviceId: null,
    baseCurrencyId: {
      id: 5,
      code: 'BRL',
      isoCode: '986',
      currencyName: 'Brazilian Real',
      active: true,
      currencyMinorUnit: '2',
      deleted: '0',
    },
    transactionTypes: {
      id: null,
      name: 'Cash Withdrawal',
    },
    minutesCount: '1',
    limitAmount: {
      singleTransaction: '123456.0000',
      perTime: null,
      perDay: '123456.0000',
      perMonth: null,
    },
    limitCount: {
      singleTransaction: null,
      perTime: null,
      perDay: '10',
      perMonth: null,
    },
    locked: '0',
    deleted: '0',
    type: {
      id: 3,
      name: 'Location',
      code: 'LOCATIONS',
    },
  },
};
const row = {
  id: 3,
  merchantInstitutionId: {
    id: 4,
    institution: {
      id: 1,
      name: 'Institution_1',
    },
    acquirer: {
      id: 9,
      code: '00004321',
      description: 'VISA Acquirer',
      active: true,
      deleted: '0',
      adviceMatch: '0',
      name: 'VISA Acquirer',
      onusValidate: '1',
      refundOffline: '1',
      country: {
        id: 12,
        code: 'IND',
        countryName: 'India',
        currency: {
          id: 22,
          code: 'INR',
          isoCode: '356',
          currencyName: 'Indian Rupee',
          active: true,
          currencyMinorUnit: '2',
          deleted: '0',
        },
        isoCode: '356',
        shortCode: 'IN',
        isdCode: '91',
        active: true,
        deleted: null,
      },
      pos_sms: null,
      pos_dms: null,
      txntype_sms: null,
      txntype_dms: null,
      accounttype_sms: null,
      accounttype_dms: null,
    },
    code: '00000000101',
    name: 'VISA HTTP',
    description: 'VISA Http',
    activateOn: 1646114940000,
    expiryOn: 1722406140000,
    totalMerchant: 2,
    totalLocation: null,
    totalDevice: null,
    merchantInstitutionDetail: {
      id: 4,
      address1: 'Test Addreee Near Sector 126',
      address2: '',
      city: 'Noida',
      zip: '654321',
      country: {
        id: 12,
        countryName: 'India',
      },
      countryState: {
        id: 67,
        stateName: 'Default',
      },
      phone: '9876543210',
      fax: '',
      email: 'test@gmail.com',
    },
    locked: '0',
  },
  merchantId: {
    id: 4,
    merchantInstitution: {
      id: 4,
      name: 'VISA HTTP',
    },
    code: '000000000000001',
    name: 'DTestChain',
    description: 'DTestChain',
    activateOn: 1646201520000,
    expiryOn: 1762150320000,
    totalLocation: 0,
    totalDevice: 0,
    locked: '0',
    posSafetyFlag: '1',
    reversalTimeout: null,
    merchantProfile: {
      id: 4,
      partialAuth: 'N',
      velocity: null,
      category: '1234',
      services: 'AUTH_SERVICE,CARD_SERVICE,FRAUD_SERVICE,LOYALTY_SERVICE',
      additionalServices: null,
    },
    acquirerID: null,
    merchantDetail: {
      id: 4,
      address1: 'address',
      address2: null,
      city: 'Noida',
      zip: '654321',
      country: {
        id: 12,
        countryName: 'India',
      },
      countryState: {
        id: 67,
        stateName: 'Default',
      },
      phone: '9876543210',
      fax: null,
      email: 'testing@gmail.com',
    },
    currency: null,
    bankName: null,
    accountNumber: null,
    additionalAttribute: null,
  },
  locationId: null,
  deviceId: null,
  baseCurrencyId: {
    id: 6,
    code: 'BWP',
    isoCode: '072',
    currencyName: 'Botswana Pula',
    active: true,
    currencyMinorUnit: '2',
    deleted: '0',
  },
  transactionTypes: {
    id: null,
    name: 'Cash Withdrawal',
  },
  minutesCount: '1',
  limitAmount: {
    singleTransaction: '5000.0000',
    perTime: null,
    perDay: null,
    perMonth: null,
  },
  limitCount: {
    singleTransaction: null,
    perTime: null,
    perDay: null,
    perMonth: null,
  },
  locked: '0',
  deleted: '0',
  type: {
    id: 2,
    name: 'Merchant',
    code: 'INSTITUTIONS',
  },
  apply: {
    name: 'VISA HTTP',
    institution: 'INSTITUTIONS',
    transaction: 'Cash Withdrawal',
    merchant: 'DTestChain',
  },
  amount: {
    single: '5000.0000',
    perMinutes: null,
    perDay: null,
    perMonth: null,
  },
  count: {
    single: 'N/A',
    perMinutes: null,
    perDay: null,
    perMonth: null,
  },
};
const onMerchant = {
  id: 1,
  merchantInstitutionId: {
    id: 2,
    institution: {
      id: 1,
      name: 'Institution_1',
    },
    acquirer: {
      id: 2,
      code: '002',
      description: 'Pine Lab for Pos',
      active: true,
      deleted: '0',
      adviceMatch: '1',
      name: 'Pine Lab',
      onusValidate: '0',
      refundOffline: '0',
      country: {
        id: 12,
        code: 'IND',
        countryName: 'India',
        currency: {
          id: 22,
          code: 'INR',
          isoCode: '356',
          currencyName: 'Indian Rupee',
          active: true,
          currencyMinorUnit: '2',
          deleted: '0',
        },
        isoCode: '356',
        shortCode: 'IN',
        isdCode: '91',
        active: true,
        deleted: null,
      },
      pos_sms: null,
      pos_dms: null,
      txntype_sms: null,
      txntype_dms: null,
      accounttype_sms: null,
      accounttype_dms: null,
    },
    code: '0000002',
    name: 'Reliance Industries Limt',
    description: 'Reliance Industries Limt group',
    activateOn: 1489822800000,
    expiryOn: 1803022800000,
    totalMerchant: 1,
    totalLocation: null,
    totalDevice: null,
    merchantInstitutionDetail: {
      id: 2,
      address1: 'Mumbai',
      address2: 'Mumbai India',
      city: 'Mumbai',
      zip: '400004',
      country: {
        id: 12,
        countryName: 'India',
      },
      countryState: {
        id: 67,
        stateName: 'Default',
      },
      phone: '1800 102 7382',
      fax: '3100 102 7382',
      email: 'reliance@info.com',
    },
    locked: '0',
  },
  merchantId: {
    id: 2,
    merchantInstitution: {
      id: 2,
      name: 'Reliance Industries Limt',
    },
    code: '00000002',
    name: 'Reliance Digital',
    description: 'Reliance digital under Reliance Industries',
    activateOn: 1521359280000,
    expiryOn: 1773906480000,
    totalLocation: 1,
    totalDevice: 1,
    locked: '0',
    posSafetyFlag: '0',
    reversalTimeout: null,
    merchantProfile: {
      id: 2,
      partialAuth: 'Y',
      velocity: null,
      category: '6011',
      services: 'LOYALTY_SERVICE',
      additionalServices: null,
    },
    acquirerID: null,
    merchantDetail: {
      id: 2,
      address1: 'Ghaziabad',
      address2: 'Indirapuram Ghaziabad UP',
      city: 'Ghaziabad',
      zip: '201012',
      country: {
        id: 12,
        countryName: 'India',
      },
      countryState: {
        id: 67,
        stateName: 'Default',
      },
      phone: '1800 889 1044',
      fax: ' 1800 889 1044',
      email: 'digital@info.com',
    },
    currency: null,
    bankName: null,
    accountNumber: null,
    additionalAttribute: null,
  },
  locationId: {
    id: 2,
    totalDevice: 1,
    code: '000000002',
    name: 'Indirapuram, Ghaziabad',
    merchant: {
      id: 2,
      name: 'Reliance Digital',
    },
    merchantInstitution: null,
    description: 'Reliance digital Indirapuram, Ghaziabad, Uttar Pradesh',
    activateOn: 1521359760000,
    expiryOn: 1771315020000,
    storeId: null,
    posSafetyFlag: '1',
    reversalTimeout: '5',
    locked: '0',
    locationDetail: {
      id: 2,
      email: 'digitalreliance@info.com',
      phone: '1800-2390-23',
      fax: '1800-2390-32',
      address1: 'Indirapuram,Ghaziabad',
      address2: 'Ghaziabad, Uttar Pradesh ',
      city: 'Ghaziabad',
      country: {
        id: 12,
        countryName: 'India',
      },
      countryState: {
        id: 67,
        stateName: 'Default',
      },
      zip: '201012',
    },
    coordinates: null,
    additionalAttribute: null,
  },
  deviceId: null,
  baseCurrencyId: {
    id: 5,
    code: 'BRL',
    isoCode: '986',
    currencyName: 'Brazilian Real',
    active: true,
    currencyMinorUnit: '2',
    deleted: '0',
  },
  transactionTypes: {
    id: null,
    name: 'Cash Withdrawal',
  },
  minutesCount: '1',
  limitAmount: {
    singleTransaction: '123456.0000',
    perTime: null,
    perDay: '123456.0000',
    perMonth: null,
  },
  limitCount: {
    singleTransaction: null,
    perTime: null,
    perDay: '10',
    perMonth: null,
  },
  locked: '0',
  deleted: '0',
  type: {
    id: 3,
    name: 'Location',
    code: 'LOCATIONS',
  },
};
const deviceJson = {
  id: 5,
  merchantInstitutionId: {
    id: 1,
    institution: {
      id: 1,
      name: 'Institution_1',
    },
    acquirer: {
      id: 1,
      code: '00000000001',
      description: 'Test Aquirer',
      active: true,
      deleted: '0',
      adviceMatch: '1',
      name: 'Aquirer-One',
      onusValidate: '1',
      refundOffline: '1',
      country: {
        id: 1,
        code: 'GBR',
        countryName: 'UK',
        currency: {
          id: 16,
          code: 'GBP',
          isoCode: '826',
          currencyName: 'Sterling Pound',
          active: true,
          currencyMinorUnit: '2',
          deleted: '0',
        },
        isoCode: '826',
        shortCode: 'GB',
        isdCode: '44',
        active: true,
        deleted: null,
      },
      pos_sms: null,
      pos_dms: null,
      txntype_sms: null,
      txntype_dms: null,
      accounttype_sms: null,
      accounttype_dms: null,
    },
    code: '00000000001',
    name: 'Future-Group',
    description: '',
    activateOn: 1613484000000,
    expiryOn: 1765900800000,
    totalMerchant: 1,
    totalLocation: null,
    totalDevice: null,
    merchantInstitutionDetail: {
      id: 1,
      address1: 'NOIDA',
      address2: '',
      city: 'NOIDA',
      zip: '201301',
      country: {
        id: 1,
        countryName: 'UK',
      },
      countryState: {
        id: 57,
        stateName: 'Default',
      },
      phone: '475828258',
      fax: '0125482745',
      email: 'bigbazar@gip.com',
    },
    locked: '0',
  },
  merchantId: {
    id: 1,
    merchantInstitution: {
      id: 1,
      name: 'Future-Group',
    },
    code: '000000000000001',
    name: 'GIP Noida',
    description: '',
    activateOn: 1613484000000,
    expiryOn: 1739714400000,
    totalLocation: 1,
    totalDevice: 1,
    locked: '0',
    posSafetyFlag: '1',
    reversalTimeout: null,
    merchantProfile: {
      id: 1,
      partialAuth: 'Y',
      velocity: null,
      category: '5411',
      services: 'AUTH_SERVICE',
      additionalServices: null,
    },
    acquirerID: null,
    merchantDetail: {
      id: 1,
      address1: 'noida',
      address2: 'NOIDA',
      city: 'NOIDA',
      zip: '201301',
      country: {
        id: 1,
        countryName: 'UK',
      },
      countryState: {
        id: 57,
        stateName: 'Default',
      },
      phone: '021452',
      fax: '012545785',
      email: 'gip@future.com',
    },
    currency: null,
    bankName: null,
    accountNumber: null,
    additionalAttribute: null,
  },
  locationId: {
    id: 1,
    totalDevice: 1,
    code: '000000000000001',
    name: 'GIP Noida',
    merchant: {
      id: 1,
      name: 'GIP Noida',
    },
    merchantInstitution: null,
    description: '',
    activateOn: 1613484000000,
    expiryOn: 1739714400000,
    storeId: null,
    posSafetyFlag: '1',
    reversalTimeout: null,
    locked: '0',
    locationDetail: {
      id: 1,
      email: 'loc@gip.com',
      phone: '01245256897',
      fax: '01205658478',
      address1: 'Noida',
      address2: 'Noida',
      city: 'NOIDA',
      country: {
        id: 1,
        countryName: 'UK',
      },
      countryState: {
        id: 57,
        stateName: 'Default',
      },
      zip: '201301',
    },
    coordinates: null,
    additionalAttribute: null,
  },
  deviceId: {
    id: 1,
    location: {
      id: 1,
      name: 'GIP Noida',
    },
    merchant: {
      id: 1,
      name: 'GIP Noida',
    },
    merchantInstitution: null,
    code: '00000001',
    type: {
      id: 1,
      code: 'POS-TERMINAL',
      locked: '0',
    },
    reversalTimeout: null,
    posSafetyFlag: '1',
    pedSerialNo: null,
    name: null,
    activateOn: 1613484000000,
    locked: '0',
    hostCapture: false,
    pedId: null,
    deviceModelId: null,
    additionalAttribute: null,
  },
  baseCurrencyId: {
    id: 1,
    code: 'AED',
    isoCode: '784',
    currencyName: 'UAE Dirham',
    active: true,
    currencyMinorUnit: '2',
    deleted: '0',
  },
  transactionTypes: {
    id: null,
    name: 'Cash Withdrawal',
  },
  minutesCount: '1',
  limitAmount: {
    singleTransaction: '23333.0000',
    perTime: null,
    perDay: null,
    perMonth: null,
  },
  limitCount: {
    singleTransaction: null,
    perTime: null,
    perDay: null,
    perMonth: null,
  },
  locked: '0',
  deleted: '0',
  type: {
    id: 4,
    name: 'Device',
    code: 'DEVICES',
  },
};
class VelocityLimitsServiceStub {}
class TranslateServiceStub {
  public onLangChange: EventEmitter<any> = new EventEmitter();
  public onTranslationChange: EventEmitter<any> = new EventEmitter();
  public onDefaultLangChange: EventEmitter<any> = new EventEmitter();

  public get(key: any): any {
    return of(key);
  }
  public setDefaultLang(key: any): any {}
}
describe('VelocityLimitsInfoComponent', () => {
  let component: VelocityLimitsInfoComponent;
  let fixture: ComponentFixture<VelocityLimitsInfoComponent>;
  let mockStore: MockStore<IAppState>;
  let translate: TranslateService;
  let mockselectLimitsAndPermission: MemoizedSelector<any, any>;
  let mockselectViewSettingsList: MemoizedSelector<any, any>;
  let mockselectFilterData: MemoizedSelector<any, any>;
  let mockselectVelocityLimitsEditRow: MemoizedSelector<any, any>;
  let router: Router;
  const routerSpy = jasmine.createSpyObj('Router', ['navigate']);
  beforeEach(() => {
    const routerService = jasmine.createSpyObj('RouterService', [
      'selectViewSettingsList',
      'routers',
      'routerServiceType',
      'getRouterById',
      'routerRuleList',
    ]);
    TestBed.configureTestingModule({
      declarations: [VelocityLimitsInfoComponent],
      providers: [
        { provide: TranslateService, useClass: TranslateServiceStub },
        AlertService,
        SnotifyService,
        HttpClient,
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
        { provide: VelocityLimitsService, useClass: VelocityLimitsServiceStub },
        { provide: 'SnotifyToastConfig', useValue: ToastDefaults },
        provideMockStore(),
      ],
      imports: [
        RouterTestingModule,
        SharedModule,
        AlertModule,
        BrowserAnimationsModule,
        CommonModule,
        NgxDatatableModule,
        VelocityLimitsRoutingModule,
        ModalModule,
        NgSelectModule,
        FormsModule,
        ReactiveFormsModule,
        TabsModule,
        InputRvModule,
        HttpClientTestingModule,
      ],
    }).compileComponents();

    mockStore = TestBed.get(Store);
    fixture = TestBed.createComponent(VelocityLimitsInfoComponent);
    component = fixture.componentInstance;

    mockselectLimitsAndPermission = mockStore.overrideSelector(
      selectPermissionsData,
      permissionJSON,
    );

    mockselectViewSettingsList = mockStore.overrideSelector(
      selectViewSettingsList,
      viewsettingJSON,
    );

    mockselectFilterData = mockStore.overrideSelector(selectFilterData, filterJson);

    mockselectVelocityLimitsEditRow = mockStore.overrideSelector(
      selectVelocityLimitsEditRow,
      selectVelocityLimitsEditRowJson,
    );

    mockStore.refreshState();
    fixture.detectChanges();
    translate = TestBed.get(TranslateService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('close fuction should close the Drawer ', () => {
    component.close();
    expect(component.isvisibleview).toEqual(false);
  });
  it('editCoreProperties fuction should call click on edit form this HTMl', () => {
    component.editDetails(row);
    const resMat = Object.getPrototypeOf(component);
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/limits/velocity-limits/edit/', row.id]);
  });
  it('onInstitution fuction should call click on edit form this HTMl', () => {
    component.onInstitution(row);
    const resMat = Object.getPrototypeOf(component);
    expect(routerSpy.navigate).toHaveBeenCalledWith([
      '/institutions/institution-group-detail/',
      row.merchantInstitutionId.id,
    ]);
  });
  it('onMerchant fuction should call click on edit form this HTMl', () => {
    component.onMerchant(row);
    const resMat = Object.getPrototypeOf(component);
    expect(routerSpy.navigate).toHaveBeenCalledWith([
      '/institutions/institutions/institution-details/',
      row.merchantId.id,
    ]);
  });
  it('onLocation fuction should call click on edit form this HTMl', () => {
    component.onLocation(onMerchant);
    const resMat = Object.getPrototypeOf(component);
    expect(routerSpy.navigate).toHaveBeenCalledWith([
      '/institutions/locations/locations-details/',
      onMerchant.locationId.id,
    ]);
  });
  it('onLocation fuction should call click on edit form this HTMl', () => {
    component.onDevice(deviceJson);
    const resMat = Object.getPrototypeOf(component);
    expect(routerSpy.navigate).toHaveBeenCalledWith([
      '/institutions/devices/device-details/',
      deviceJson.deviceId.id,
    ]);
  });
  afterEach(() => {
    fixture.destroy();
  });
});
