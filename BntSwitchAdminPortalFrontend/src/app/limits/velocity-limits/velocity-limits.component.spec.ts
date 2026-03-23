import { ComponentFixture, fakeAsync, TestBed, tick, waitForAsync } from '@angular/core/testing';
import { Router } from '@angular/router';
import { VelocityLimitsComponent } from './velocity-limits.component';
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
import { VelocityLimitsRoutingModule } from './velocity-limits-routing.module';
import { ModalModule } from 'angular-custom-modal';
import { selectLimitsAndPermission } from '@app/store/selectors/velocity-limits.selector';
import { selectViewSettingsList } from '@app/store/selectors/view-settings.selector';
import { selectFilterData } from '@app/store/selectors/filter.selectors';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { EventEmitter } from '@angular/core';
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

const permissionJSON = [
  {
    data: {
      ' page-no': 1,
      'total-filtered-record': 3,
      'total-record': 3,
      velocityLimitsList: {
        baseCurrencyId: {},
        deleted: '0',
        deviceId: null,
        id: 4,
        limitAmount: {},
        limitCount: {},
        locationId: null,
        locked: '1',
        merchantId: {},
        merchantInstitutionId: {
          acquirer: {
            accounttype_dms: null,
            accounttype_sms: null,
            active: true,
            adviceMatch: '1',
            code: '00000000001',
          },
          activateOn: 1613484000000,
          code: '00000000001',
          description: '',
          expiryOn: 1765900800000,
          id: 1,
          institution: {
            id: 1,
            name: 'Institution_1',
          },
          locked: '0',
          merchantInstitutionDetail: {
            address1: 'NOIDA',
            address2: '',
            city: 'NOIDA',
            country: {
              countryName: 'UK',
              id: 1,
            },
            countryState: {
              id: 57,
              stateName: 'Default',
            },
            email: 'bigbazar@gip.com',
            fax: '0125482745',
            id: 1,
            phone: '475828258',
            zip: '201301',
          },
          name: 'Future-Group',
          totalDevice: null,
          totalLocation: null,
          totalMerchant: 1,
        },
        minutesCount: '1',
        transactionTypes: {
          id: null,
          name: 'Cash Withdrawal',
        },
        type: {
          code: 'INSTITUTIONS',
          id: 2,
          name: 'Merchant',
        },
      },
    },
  },
];
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
const deleteJ = {
  id: 'link_velocity',
  read: true,
  write: true,
  update: true,
  delete: true,
  check: false,
};
const dataJson = {
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
  locked: '1',
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
  active: true,
  isLoader: true,
};
const deleteDetails = {
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
const stausOnChange = {
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
  locked: '1',
  deleted: '0',
  type: {
    id: 3,
    name: 'Location',
    code: 'LOCATIONS',
  },
  apply: {
    name: 'Reliance Industries Limt',
    institution: 'LOCATIONS',
    transaction: 'Cash Withdrawal',
    merchant: 'Reliance Digital',
  },
  amount: {
    single: '123456.0000',
    perMinutes: null,
    perDay: '123456.0000',
    perMonth: null,
  },
  count: {
    single: 'N/A',
    perMinutes: null,
    perDay: '10',
    perMonth: null,
  },
  active: true,
  isLoader: true,
};
const setDataJson = {
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
  locked: '1',
  deleted: '0',
  type: {
    id: 3,
    name: 'Location',
    code: 'LOCATIONS',
  },
  apply: {
    name: 'Reliance Industries Limt',
    institution: 'LOCATIONS',
    transaction: 'Cash Withdrawal',
    merchant: 'Reliance Digital',
  },
  amount: {
    single: '123456.0000',
    perMinutes: null,
    perDay: '123456.0000',
    perMonth: null,
  },
  count: {
    single: 'N/A',
    perMinutes: null,
    perDay: '10',
    perMonth: null,
  },
  active: true,
  isLoader: true,
};
const dataTransform = {
  'total-record': 1,
  velocityLimitsList: [
    {
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
      apply: {
        name: 'Reliance Industries Limt',
        institution: 'LOCATIONS',
        transaction: 'Cash Withdrawal',
        merchant: 'Reliance Digital',
      },
      amount: {
        single: '123456.0000',
        perMinutes: null,
        perDay: '123456.0000',
        perMonth: null,
      },
      count: {
        single: 'N/A',
        perMinutes: null,
        perDay: '10',
        perMonth: null,
      },
    },
  ],
  'page-no': 1,
  'total-filtered-record': 1,
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
describe('VelocityLimitsComponent', () => {
  let component: VelocityLimitsComponent;
  let fixture: ComponentFixture<VelocityLimitsComponent>;
  let mockStore: MockStore<IAppState>;
  let translate: TranslateService;
  let mockselectLimitsAndPermission: MemoizedSelector<any, any>;
  let mockselectViewSettingsList: MemoizedSelector<any, any>;
  let mockselectFilterData: MemoizedSelector<any, any>;
  let routerSpy = { navigate: jasmine.createSpy('navigate') };
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VelocityLimitsComponent],
      providers: [
        { provide: TranslateService, useClass: TranslateServiceStub },
        AlertService,
        SnotifyService,
        HttpClient,
        VelocityLimitsService,
        { provide: Router, useValue: routerSpy },
        { provide: VelocityLimitsService, useClass: VelocityLimitsServiceStub },
        { provide: 'SnotifyToastConfig', useValue: ToastDefaults },
        provideMockStore(),
      ],
      imports: [
        RouterTestingModule,
        SharedModule,
        AlertModule,
        CommonModule,
        NgxDatatableModule,
        VelocityLimitsRoutingModule,
        ModalModule,
        BrowserAnimationsModule,
        NgSelectModule,
        FormsModule,
        ReactiveFormsModule,
        TabsModule,
        InputRvModule,
        HttpClientTestingModule,
      ],
    }).compileComponents();

    mockStore = TestBed.get(Store);
    fixture = TestBed.createComponent(VelocityLimitsComponent);
    component = fixture.componentInstance;

    mockselectLimitsAndPermission = mockStore.overrideSelector(
      selectLimitsAndPermission,
      permissionJSON,
    );

    mockselectViewSettingsList = mockStore.overrideSelector(
      selectViewSettingsList,
      viewsettingJSON,
    );

    mockselectFilterData = mockStore.overrideSelector(selectFilterData, filterJson);

    mockStore.refreshState();
    fixture.detectChanges();
    translate = TestBed.get(TranslateService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should check rows not equal to 0', () => {
    component.setPage(2);
    expect(component.getPage()).toBe(2);
  });
  it('viewDetails fuction should make the isvisibleView true ', () => {
    let data = 3;
    component.viewOnDrawer(data);
    expect(component.isvisibleview).toEqual(true);
  });

  it('close fuction should close the Drawer ', () => {
    const eventclose = false;
    component.close(eventclose);
    expect(component.isvisibleview).toEqual(false);
  });

  it('create fuction should create the view screen', () => {
    component.create(event);
    expect(component.isvisibleview).toEqual(false);
  });
  it('should render Table', () => {
    const ngxdatatable: HTMLElement = fixture.nativeElement.querySelector('ngx-datatable');
    const text = ngxdatatable.innerText;
    expect(text).toBeTruthy();
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

  it('getFilterObjectData fuction should call after load the component', () => {
    const getFilterObjectData = {
      id: 1,
      name: 'MerchantInstitution',
      code: 'Merchant Group',
    };
    spyOn(component as any, 'loadPage').and.callThrough();
    (component as any).getFilterObjectData(getFilterObjectData);
    expect(component.request).toBe(false);
  });

  it('getFilterObjectData fuction should call after load the component', () => {
    const getFilterObjectData = {
      id: 1,
      name: 'MerchantInstitution',
      code: 'Merchant Group',
    };
    spyOn(component as any, 'loadPage').and.callThrough();
    (component as any).getFilterTxnData(getFilterObjectData);
    expect(component.request).toBe(false);
  });
  it('_dataTransform fuction should call', () => {
    const resMat = Object.getPrototypeOf(component);
    resMat._dataTransform(dataTransform);
    expect(resMat.totalRecords).toEqual(dataTransform['total-record']);
  });
  it('getFilterStatusData fuction should call after load the component', () => {
    const getFilterObjectData = {
      id: 1,
      name: 'MerchantInstitution',
      code: 'Merchant Group',
    };
    spyOn(component as any, 'loadPage').and.callThrough();
    (component as any).getFilterStatusData(getFilterObjectData);
    expect(component.request).toBe(false);
  });

  // it('deleteDetails fuction should call', () => {
  //   spyOn(component as any, 'loadPage').and.callThrough();
  //   (component as any).deleteDetails(deleteDetails);
  //   expect(component.request).toBe(false);
  // });

  it('editCoreProperties fuction should call click on edit form this HTMl', () => {
    component.editDetails(row);
    const resMat = Object.getPrototypeOf(component);
    expect(routerSpy?.navigate).toHaveBeenCalledWith(['/limits/velocity-limits/edit/', row.id]);
  });
  it('_dataTransform fuction should call', () => {
    const resMat = Object.getPrototypeOf(component);
    component.setData(setDataJson);
    expect(component.currentItem.merchantInstitutionId['id']).toEqual(
      setDataJson.merchantInstitutionId.id,
    );
  });

  it('openModal fuction should open the Modal', () => {
    component.resetFilterSearch();
    expect(component.place).toEqual('');
  });
  afterEach(() => {
    fixture.destroy();
  });
});
