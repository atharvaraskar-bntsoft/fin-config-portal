import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { WorkflowComponent } from './workflow.component';
import { EventEmitter } from '@angular/core';
import { of } from 'rxjs';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { IAppState } from '@app/store/state/app.state';
import { MemoizedSelector, StoreModule } from '@ngrx/store';
import { RouterTestingModule } from '@angular/router/testing';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { UntypedFormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { selectLatestWorkflow } from '../../store/selectors/workflows.selectors';
import { SelectMessageContextList } from '@app/store/selectors/l1-adapter.selectors';
import { selectViewSettingsList } from '@app/store/selectors/view-settings.selector';
import { selectPermissionsData } from '@app/store/selectors/permission.selectors';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { SharedModule } from '@app/shared/shared.module';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';

class translateServiceMock {
  public onLangChange: EventEmitter<any> = new EventEmitter();
  public onTranslationChange: EventEmitter<any> = new EventEmitter();
  public onDefaultLangChange: EventEmitter<any> = new EventEmitter();
  public get(key: any): any {
    return of(key);
  }
}

const workflowListJson = {
  status: 'success',
  message: 'Find WorkFlow List',
  data: {
    'total-record': 43,
    workflowlist: [
      {
        id: 45,
        name: 'Workflow1',
        version: 9,
        workflowId: 1,
        workflowJson: null,
        serviceGroupJson: [],
        responseCode: {
          type: 'option3',
          value: "'AUTH_SERVICE'",
          text: "setResponseOfService('AUTH_SERVICE')",
        },
        reverseCondition: {
          reverseCondition: [],
          services: [],
        },
        status: '1',
        workFlowServices: [
          {
            id: 59,
            serviceType: 'SERVICE',
            serviceName: 'AUTH_SERVICE',
            ordinal: 1,
            groupName: null,
            postDecisionRuleJsonUi: null,
            precedingDecisionUi: null,
            services: [],
            safingConditionJson: null,
            safingExceptionConditionJson: null,
          },
          {
            id: 60,
            serviceType: 'SERVICE',
            serviceName: 'CARD_SERVICE',
            ordinal: 2,
            groupName: null,
            postDecisionRuleJsonUi: null,
            precedingDecisionUi: null,
            services: [],
            safingConditionJson: null,
            safingExceptionConditionJson: null,
          },
        ],
      },
    ],
    'page-no': 1,
    'total-filtered-record': 20,
  },
};

const messageContextListJson = {
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
          operator: [
            {
              text: 'Equal',
              value: 'equal',
              key: 'value',
            },
          ],
          fieldsType: null,
        },
      ],
      operator: null,
      fieldsType: null,
    },
  },
};

const viewsettingJSON = {
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

const permissionJson = {
  data: [
    {
      check: true,
      delete: true,
      id: 'link_workflow',
      read: true,
      update: true,
      write: true,
    },
  ],
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
describe('WorkflowComponent', () => {
  let component: WorkflowComponent;
  let fixture: ComponentFixture<WorkflowComponent>;
  let mockStore: MockStore<IAppState>;
  let mockselectWorkflowList: MemoizedSelector<any, any>;
  let mockselectMessageContextList: MemoizedSelector<any, any>;
  let mockselectViewSettingsList: MemoizedSelector<any, any>;
  let mockselectPermissionsData: MemoizedSelector<any, any>;
  let setDefaultLangSpy: jasmine.Spy;

  beforeEach(() => {
    const translateService = jasmine.createSpyObj('TranslateService', ['get', 'setDefaultLang']);
    TestBed.configureTestingModule({
      declarations: [WorkflowComponent],
      providers: [
        UntypedFormBuilder,
        provideMockStore(),
        { provide: TranslateService, useClass: translateServiceMock },
      ],
      imports: [
        FormsModule,
        ReactiveFormsModule,
        RouterTestingModule,
        NzSelectModule,
        NzSpinModule,
        SharedModule,
        HttpClientModule,
        InfiniteScrollModule,
        BrowserAnimationsModule,
        TranslateModule.forRoot({}),
        StoreModule.forRoot({}),
        CommonModule
      ],
    }).compileComponents();

    mockStore = TestBed.inject(MockStore);
    fixture = TestBed.createComponent(WorkflowComponent);
    component = fixture.componentInstance;

    mockselectWorkflowList = mockStore.overrideSelector(selectLatestWorkflow, workflowListJson);

    mockselectMessageContextList = mockStore.overrideSelector(
      SelectMessageContextList,
      messageContextListJson,
    );

    mockselectViewSettingsList = mockStore.overrideSelector(
      selectViewSettingsList,
      viewsettingJSON,
    );

    mockselectPermissionsData = mockStore.overrideSelector(selectPermissionsData, permissionJson);

    setDefaultLangSpy = translateService.get.and.returnValue(of([]));

    mockStore.refreshState();
    fixture.detectChanges();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkflowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('ngModelChange fuction should have isloading=true', () => {
    component.ngModelChange(event);
    expect(component.isSpinning).toEqual(true);
  });
  it('ngModelChange fuction should have isloading=true', () => {
    let eventData = 1;
    component.ngModelChange(eventData);
    expect(component.isSpinning).toEqual(false);
  });
  it('Scroll fuction should call', () => {
    component.onScroll();
    expect(component.onScroll).toBeDefined;
    expect(component.onScroll).toHaveBeenCalled;
  });
  it('showModal fuction should have isVisibleTop=true', () => {
    component.showModal();
    expect(component.isVisibleTop).toEqual(true);
  });
  it('closeModal fuction should have isVisibleTop=true', () => {
    component.closeModal();
    expect(component.isVisibleTop).toEqual(false);
  });
  it('createWorkFlow fuction should have isSpinning =true', () => {
    component.createWorkFlow();
    expect(component.fg.valid).toBeTruthy;
  });

  // it('editCoreProperties fuction should call click on edit form this HTMl', () => {
  //   component.editItem(row);
  //   const resMat = Object.getPrototypeOf(component);
  //   expect(routerSpy.navigate).toHaveBeenCalledWith(['/limits/velocity-limits/edit/',row.id]);
  // });
});
