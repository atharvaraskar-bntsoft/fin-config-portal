import { EventEmitter } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IAppState } from '@app/store/state/app.state';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { SnotifyService } from 'ng-snotify';
import { of } from 'rxjs';
import { ImportFileService } from '@app/services/import-file.service';
import { DeploymentWorkflowMapperComponent } from './deployment-workflow-mapper.component';
import { SharedModule } from '@app/shared/shared.module';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AlertModule, DatePickerRvModule, TabsModule } from 'bnt';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { MemoizedSelector, StoreModule } from '@ngrx/store';
import { selectViewSettingsList } from '@app/store/selectors/view-settings.selector';
import { selectGetDeploymentWorkflow } from '@app/store/selectors/deployment-workflow-mapper.selector';
import { selectPermissionsData } from '@app/store/selectors/permission.selectors';
import { selectGetByIdDeploymentWorkflow } from '@app/store/selectors/deployment-workflow-mapper.selector';
import { CommonModule } from '@angular/common';
class translateServiceMock {
  public onLangChange: EventEmitter<any> = new EventEmitter();
  public onTranslationChange: EventEmitter<any> = new EventEmitter();
  public onDefaultLangChange: EventEmitter<any> = new EventEmitter();

  public get(key: any): any {
    return of(key);
  }
}

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
const selectPermissionsDataJson = {
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
  ],
};
const selectGetDeploymentWorkflowJson = {
  status: 'success',
  message: 'get deployment workflow',
  data: {
    'total-record': 5,
    'page-no': 1,
    diploymentWorkkflowlist: [
      {
        id: 5,
        workflowJson: null,
        componentDetailsJson: null,
        corePropertyDetailId: null,
        deploymentId: 750,
        deploymentDto: {
          id: 750,
          name: 'Deployment#746(04-08-2022)',
          deployedOn: null,
          scheduledOn: null,
          status: null,
          statusReason: null,
          errorLog: null,
          switchCluster: null,
          deploymentCluster: null,
          corePropertyDetailId: null,
          deploymentComponent: null,
          deploymentStatus: null,
        },
      },
    ],
    'total-filtered-record': 5,
  },
};
const selectGetByIdDeploymentWorkflowJson = {
  status: 'success',
  message: null,
  data: {
    createdBy: 1,
    updatedBy: null,
    createdOn: 1661755863000,
    updatedOn: 1661755863000,
    id: 8,
    componentDetailsJson: '[{}',
    deploymentId: 753,
    corePropertyDetailId: 0,
  },
};
const valueJson = {
  workflows: {
    '1': {
      type: 'begin',
      service: {
        name: 'AUTH_SERVICE',
        type: 'executeService',
      },
      responseCodeEvaluator: {
        rule: {
          type: 'spring-el-response-code',
          expression: "setIpcConsiderFail('AUTH_SERVICE')",
        },
        type: 'evaluateResponse',
      },
    },
    '2': {
      type: 'begin',
      service: {
        name: 'AUTH_SERVICE',
        type: 'executeService',
        safingCondition: 'saf_33_44',
      },
      responseCodeEvaluator: {
        rule: {
          type: 'spring-el-response-code',
          expression: "setResponseOfService('AUTH_SERVICE')",
        },
        type: 'evaluateResponse',
      },
    },
    '3': {
      type: 'begin',
      service: {
        name: 'AUTH_SERVICE',
        type: 'executeService',
      },
      responseCodeEvaluator: {
        rule: {
          type: 'spring-el-response-code',
          expression: "setResponseOfService('AUTH_SERVICE')",
        },
        type: 'evaluateResponse',
      },
    },
    '6': {
      type: 'begin',
      service: {
        name: 'AUTH_SERVICE',
        type: 'executeService',
        dependents: [
          {
            type: 'decision',
            failed: {
              name: 'LOYALTY_SERVICE',
              type: 'executeService',
            },
            passed: {
              name: 'CARD_SERVICE',
              type: 'executeService',
              dependents: [
                {
                  type: 'decision',
                  failed: {
                    name: 'LOYALTY_SERVICE',
                    type: 'executeService',
                  },
                  passed: {
                    name: 'FRAUD_SERVICE',
                    type: 'executeService',
                  },
                  ruleId: 'dec_29_nestedgroup',
                },
              ],
            },
            ruleId: 'dec_29_36',
          },
        ],
      },
      responseCodeEvaluator: null,
    },
    '7': {
      type: 'begin',
      service: {
        name: 'AUTH_SERVICE',
        type: 'executeService',
        dependents: [
          {
            type: 'decision',
            failed: {
              name: 'LOYALTY_SERVICE',
              type: 'executeService',
            },
            passed: {
              name: 'CARD_SERVICE',
              type: 'executeService',
              dependents: [
                {
                  type: 'decision',
                  failed: {
                    name: 'LOYALTY_SERVICE',
                    type: 'executeService',
                  },
                  passed: {
                    name: 'FRAUD_SERVICE',
                    type: 'executeService',
                  },
                  ruleId: 'dec_27_nestedGrop',
                },
              ],
            },
            ruleId: 'dec_27_34',
          },
        ],
      },
      responseCodeEvaluator: null,
    },
    '8': {
      type: 'begin',
      service: {
        name: 'AUTH_SERVICE',
        type: 'executeService',
        dependents: [
          {
            type: 'decision',
            failed: {
              name: 'LOYALTY_SERVICE',
              type: 'executeService',
            },
            passed: {
              name: 'CARD_SERVICE',
              type: 'executeService',
              dependents: [
                {
                  type: 'decision',
                  failed: {
                    name: 'LOYALTY_SERVICE',
                    type: 'executeService',
                  },
                  passed: {
                    name: 'FRAUD_SERVICE',
                    type: 'executeService',
                  },
                  ruleId: 'dec_31_TestGroup5',
                },
              ],
            },
            ruleId: 'dec_31_42',
          },
        ],
      },
      responseCodeEvaluator: null,
    },
  },
  defaultFlow: '1',
  workflowRules: {
    l3json1: {
      rule: {
        type: 'conditional-decision',
        condition: {
          type: 'equal',
          value: 'GIFT_CARD',
          fieldName: '${payment_method}',
        },
      },
      type: 'workflowRule',
      workflow: '1',
    },
    HttpUrlEncodedRule: {
      rule: {
        type: 'conditional-decision',
        condition: {
          type: 'equal',
          value: 'Payment_Token',
          fieldName: '${payment_method}',
        },
      },
      type: 'workflowRule',
      workflow: '2',
    },
    iso_tcp_client_rule: {
      rule: {
        type: 'conditional-decision',
        condition: {
          type: 'equal',
          value: 'CARD',
          fieldName: '${payment_method}',
        },
      },
      type: 'workflowRule',
      workflow: '3',
    },
  },
  destinationRules: {
    l3json: {
      rule: {
        type: 'conditional-decision',
        condition: {
          type: 'equal',
          value: 'GIFT_CARD',
          fieldName: '${payment_method}',
        },
      },
      type: 'routingRule',
      destination: ['79'],
    },
    l3json1: {
      rule: {
        type: 'conditional-decision',
        condition: {
          type: 'or',
          conditions: [
            {
              type: 'equal',
              value: 'CARD',
              fieldName: '${payment_method}',
            },
            {
              type: 'equal',
              value: 'GIFT_CARD',
              fieldName: '${payment_method}',
            },
          ],
        },
      },
      type: 'routingRule',
      destination: ['1'],
    },
    HttpUrlEncodedAdpRule: {
      rule: {
        type: 'conditional-decision',
        condition: {
          type: 'equal',
          value: 'APPROVED',
          fieldName: '${internal_processing_code}',
        },
      },
      type: 'routingRule',
      destination: ['3'],
    },
    l3_iso_tcp_client_4jan: {
      rule: {
        type: 'conditional-decision',
        condition: {
          type: 'equal',
          value: 'CARD',
          fieldName: '${payment_method}',
        },
      },
      type: 'routingRule',
      destination: ['11'],
    },
  },
  destinationRouter: {
    AUTH_SERVICE: [
      'l3json1',
      'l3_iso_tcp_client_4jan',
      'l3_iso_tcp_client_4jan',
      'l3json',
      'HttpUrlEncodedAdpRule',
    ],
  },
  servicesConditions: {
    dec_27_34: {
      type: 'conditional-decision',
      condition: {
        type: 'equal',
        value: 'Cash Withdrawal',
        fieldName: '${transaction_type}',
      },
    },
    dec_29_36: {
      type: 'conditional-decision',
      condition: {
        type: 'equal',
        value: 'APPROVED',
        fieldName: '${message_exchange[AUTH_SERVICE].internal_processing_code}',
      },
    },
    dec_31_42: {
      type: 'conditional-decision',
      condition: {
        type: 'equal',
        value: 'APPROVED',
        fieldName: '${internal_processing_code}',
      },
    },
    saf_33_44: {
      type: 'conditional-decision',
      condition: {
        type: 'equal',
        value: 'TRANSACTION_TIMEOUT',
        fieldName: '${message_exchange[AUTH_SERVICE].internal_processing_code}',
      },
    },
    dec_27_nestedGrop: {
      type: 'conditional-decision',
      condition: {
        type: 'equal',
        value: 'Cash Withdrawal',
        fieldName: '${transaction_type}',
      },
    },
    dec_31_TestGroup5: {
      type: 'conditional-decision',
      condition: {
        type: 'equal',
        value: 'Cash Withdrawal',
        fieldName: '${transaction_type}',
      },
    },
    dec_29_nestedgroup: {
      type: 'conditional-decision',
      condition: {
        type: 'equal',
        value: 'APPROVED',
        fieldName: '${message_exchange[CARD_SERVICE].internal_processing_code}',
      },
    },
  },
  orchestrationRouter: ['HttpUrlEncodedRule', 'l3json1', 'iso_tcp_client_rule'],
};
xdescribe('DeploymentWorkflowMapperComponent', () => {
  let component: DeploymentWorkflowMapperComponent;
  let fixture: ComponentFixture<DeploymentWorkflowMapperComponent>;
  let mockStore: MockStore<IAppState>;
  let translateService: TranslateService;
  let mockselectViewSettingsList: MemoizedSelector<any, any>;
  let mockselectPermissionsData: MemoizedSelector<any, any>;
  let mockselectGetDeploymentWorkflow: MemoizedSelector<any, any>;
  let mockselectGetByIdDeploymentWorkflow: MemoizedSelector<any, any>;
  const importFileService = jasmine.createSpyObj('ImportFileService', ['clearData']);
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DeploymentWorkflowMapperComponent],
      providers: [
        SnotifyService,
        { provide: TranslateService, useClass: translateServiceMock },
        { provide: 'SnotifyToastConfig', useValue: {} },
        { provide: ImportFileService, useValue: importFileService },
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
    mockStore = TestBed.get(MockStore);
    fixture = TestBed.createComponent(DeploymentWorkflowMapperComponent);
    component = fixture.componentInstance;

    mockselectViewSettingsList = mockStore.overrideSelector(
      selectViewSettingsList,
      selectViewSettingsListJson,
    );

    mockselectGetDeploymentWorkflow = mockStore.overrideSelector(
      selectGetDeploymentWorkflow,
      selectGetDeploymentWorkflowJson,
    );
    mockselectPermissionsData = mockStore.overrideSelector(
      selectPermissionsData,
      selectPermissionsDataJson,
    );
    mockselectGetByIdDeploymentWorkflow = mockStore.overrideSelector(
      selectGetByIdDeploymentWorkflow,
      selectGetByIdDeploymentWorkflowJson,
    );
    translateService = TestBed.inject(TranslateService);
    mockStore.refreshState();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('openPopUp fuction should open the PopUp', () => {
    component.open();
    expect(component.visible).toEqual(true);
  });
  it('cancelPopUp fuction should open the cancelPopUp', () => {
    component.close();
    expect(component.visibleAnimate).toEqual(false);
  });
  it('Scroll fuction should call', () => {
    component.onScroll(event);
    expect(component.onScroll).toBeDefined;
    expect(component.onScroll).toHaveBeenCalled;
  });
  // it('jsonData fuction should call', () => {
  //   const value ={"workflows": {"1": {"type": "begin", "service": {"name": "AUTH_SERVICE", "type": "executeService"}, "responseCodeEvaluator": {"rule": {"type": "spring-el-response-code", "expression": "setIpcConsiderFail('AUTH_SERVICE')"}, "type": "evaluateResponse"}}, "2": {"type": "begin", "service": {"name": "AUTH_SERVICE", "type": "executeService", "safingCondition": "saf_33_44"}, "responseCodeEvaluator": {"rule": {"type": "spring-el-response-code", "expression": "setResponseOfService('AUTH_SERVICE')"}, "type": "evaluateResponse"}}, "3": {"type": "begin", "service": {"name": "AUTH_SERVICE", "type": "executeService"}, "responseCodeEvaluator": {"rule": {"type": "spring-el-response-code", "expression": "setResponseOfService('AUTH_SERVICE')"}, "type": "evaluateResponse"}}, "6": {"type": "begin", "service": {"name": "AUTH_SERVICE", "type": "executeService", "dependents": [{"type": "decision", "failed": {"name": "LOYALTY_SERVICE", "type": "executeService"}, "passed": {"name": "CARD_SERVICE", "type": "executeService", "dependents": [{"type": "decision", "failed": {"name": "LOYALTY_SERVICE", "type": "executeService"}, "passed": {"name": "FRAUD_SERVICE", "type": "executeService"}, "ruleId": "dec_29_nestedgroup"}]}, "ruleId": "dec_29_36"}]}, "responseCodeEvaluator": null}, "7": {"type": "begin", "service": {"name": "AUTH_SERVICE", "type": "executeService", "dependents": [{"type": "decision", "failed": {"name": "LOYALTY_SERVICE", "type": "executeService"}, "passed": {"name": "CARD_SERVICE", "type": "executeService", "dependents": [{"type": "decision", "failed": {"name": "LOYALTY_SERVICE", "type": "executeService"}, "passed": {"name": "FRAUD_SERVICE", "type": "executeService"}, "ruleId": "dec_27_nestedGrop"}]}, "ruleId": "dec_27_34"}]}, "responseCodeEvaluator": null}, "8": {"type": "begin", "service": {"name": "AUTH_SERVICE", "type": "executeService", "dependents": [{"type": "decision", "failed": {"name": "LOYALTY_SERVICE", "type": "executeService"}, "passed": {"name": "CARD_SERVICE", "type": "executeService", "dependents": [{"type": "decision", "failed": {"name": "LOYALTY_SERVICE", "type": "executeService"}, "passed": {"name": "FRAUD_SERVICE", "type": "executeService"}, "ruleId": "dec_31_TestGroup5"}]}, "ruleId": "dec_31_42"}]}, "responseCodeEvaluator": null}}, "defaultFlow": "1", "workflowRules": {"l3json1": {"rule": {"type": "conditional-decision", "condition": {"type": "equal", "value": "GIFT_CARD", "fieldName": "${payment_method}"}}, "type": "workflowRule", "workflow": "1"}, "HttpUrlEncodedRule": {"rule": {"type": "conditional-decision", "condition": {"type": "equal", "value": "Payment_Token", "fieldName": "${payment_method}"}}, "type": "workflowRule", "workflow": "2"}, "iso_tcp_client_rule": {"rule": {"type": "conditional-decision", "condition": {"type": "equal", "value": "CARD", "fieldName": "${payment_method}"}}, "type": "workflowRule", "workflow": "3"}}, "destinationRules": {"l3json": {"rule": {"type": "conditional-decision", "condition": {"type": "equal", "value": "GIFT_CARD", "fieldName": "${payment_method}"}}, "type": "routingRule", "destination": ["79"]}, "l3json1": {"rule": {"type": "conditional-decision", "condition": {"type": "or", "conditions": [{"type": "equal", "value": "CARD", "fieldName": "${payment_method}"}, {"type": "equal", "value": "GIFT_CARD", "fieldName": "${payment_method}"}]}}, "type": "routingRule", "destination": ["1"]}, "HttpUrlEncodedAdpRule": {"rule": {"type": "conditional-decision", "condition": {"type": "equal", "value": "APPROVED", "fieldName": "${internal_processing_code}"}}, "type": "routingRule", "destination": ["3"]}, "l3_iso_tcp_client_4jan": {"rule": {"type": "conditional-decision", "condition": {"type": "equal", "value": "CARD", "fieldName": "${payment_method}"}}, "type": "routingRule", "destination": ["11"]}}, "destinationRouter": {"AUTH_SERVICE": ["l3json1", "l3_iso_tcp_client_4jan", "l3_iso_tcp_client_4jan", "l3json", "HttpUrlEncodedAdpRule"]}, "servicesConditions": {"dec_27_34": {"type": "conditional-decision", "condition": {"type": "equal", "value": "Cash Withdrawal", "fieldName": "${transaction_type}"}}, "dec_29_36": {"type": "conditional-decision", "condition": {"type": "equal", "value": "APPROVED", "fieldName": "${message_exchange[AUTH_SERVICE].internal_processing_code}"}}, "dec_31_42": {"type": "conditional-decision", "condition": {"type": "equal", "value": "APPROVED", "fieldName": "${internal_processing_code}"}}, "saf_33_44": {"type": "conditional-decision", "condition": {"type": "equal", "value": "TRANSACTION_TIMEOUT", "fieldName": "${message_exchange[AUTH_SERVICE].internal_processing_code}"}}, "dec_27_nestedGrop": {"type": "conditional-decision", "condition": {"type": "equal", "value": "Cash Withdrawal", "fieldName": "${transaction_type}"}}, "dec_31_TestGroup5": {"type": "conditional-decision", "condition": {"type": "equal", "value": "Cash Withdrawal", "fieldName": "${transaction_type}"}}, "dec_29_nestedgroup": {"type": "conditional-decision", "condition": {"type": "equal", "value": "APPROVED", "fieldName": "${message_exchange[CARD_SERVICE].internal_processing_code}"}}}, "orchestrationRouter": ["HttpUrlEncodedRule", "l3json1", "iso_tcp_client_rule"]};
  //   component.jsonData(value);
  //   expect(component.jsonData).toBeDefined;
  //   expect(component.jsonData).toHaveBeenCalled;
  // });
  it('jsonData fuction should call', () => {
    const keyData = 3;
    component.keyDetails(9);
    expect(component.keyDetails).toBeDefined;
  });
  //  it('Scroll fuction should call', () => {
  //   const deviceComponentObj = Object.getPrototypeOf(component);
  //   deviceComponentObj._transFilters();
  //   expect(deviceComponentObj._transFilters).toBeDefined;
  //   expect(deviceComponentObj._transFilters).toHaveBeenCalled;
  // });
  // it('Scroll fuction should call', () => {
  //   component.jsonData(valueJson);
  //   expect(component.jsonData).toBeDefined;
  //   expect(component.jsonData).toHaveBeenCalled;
  // });

  afterEach(() => {
    fixture.destroy();
  });
});
