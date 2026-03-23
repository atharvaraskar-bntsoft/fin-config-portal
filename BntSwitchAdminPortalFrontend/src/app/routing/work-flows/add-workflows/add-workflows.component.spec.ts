import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { AddWorkflowsComponent } from './add-workflows.component';
import { RouterTestingModule } from '@angular/router/testing';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { MockStoreModule } from '@app/tests/tests.module';

import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { SharedModule } from '@app/shared/shared.module';
import { IAppState } from '@app/store/state/app.state';
import { selectViewSettingsList } from '@app/store/selectors/view-settings.selector';
import { EMPTY, of } from 'rxjs';
import {
  MissingTranslationHandler,
  TranslateLoader,
  TranslateModule,
  TranslateService,
} from '@ngx-translate/core';

import { HttpLoaderFactory, MyMissingTranslationHandler } from '@app/shared/shared.module';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { MemoizedSelector, Store, StoreModule } from '@ngrx/store';
import { AlertService } from '@app/services/alert.service';
import { SnotifyService, ToastDefaults } from 'ng-snotify';
import { NzModalService } from 'ng-zorro-antd/modal';
import { AlertModule, DatePickerRvModule } from 'bnt';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CommonModule } from '@angular/common';
import { selectPermissionsData } from '@app/store/selectors/permission.selectors';
import { CountryStatesService } from '@app/services/country-states.service';
import { ActivatedRoute, convertToParamMap, Router, RouterModule } from '@angular/router';
import { IPermissionResponse } from '@app/models/permission.interface';
import { EventEmitter } from '@angular/core';
import { selectGetRuleCondition } from '@app/store/selectors/router.selectors';
import { WorkflowEventService } from '@app/services/workflows.services';
import { SubscribeService } from '@app/services/subscribe.services';
import {
  selectInternalCode,
  SelectMessageContextList,
} from '@app/store/selectors/l1-adapter.selectors';
import { services } from '@app/services';

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

class WorkflowEventServiceMock {
  public onLangChange: EventEmitter<any> = new EventEmitter();
  public onTranslationChange: EventEmitter<any> = new EventEmitter();
  public onDefaultLangChange: EventEmitter<any> = new EventEmitter();

  public getItems(): any {
    return of(EMPTY);
  }
  public getUsedItems(): any {
    return of(EMPTY);
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

const selectGetRuleConditionJson = {};
const selectInternalCodeJson = {};
const SelectMessageContextListJson = {};

describe('AddWorkflowsComponent', () => {
  let component: AddWorkflowsComponent;
  let fixture: ComponentFixture<AddWorkflowsComponent>;
  let store: Store<AddWorkflowsComponent>;
  let mockStore: MockStore<IAppState>;
  let mockselectGetRuleCondition: MemoizedSelector<any, any>;
  let MockselectViewSettingsList;
  let mockselectPermissionsData;
  let setDefaultLangSpy: jasmine.Spy;
  let workflowEventService: WorkflowEventService;
  let mockselectInternalCode;
  let mockSelectMessageContextList;

  beforeEach(() => {
    const translateService = jasmine.createSpyObj('TranslateService', ['get', 'setDefaultLang']);
    const workflowsService = jasmine.createSpyObj('WorkflowEventService', [
      'getItems',
      'getUsedItems',
    ]);
    const RouterSpy = jasmine.createSpyObj('Router', ['navigate']);
    TestBed.configureTestingModule({
      declarations: [AddWorkflowsComponent],
      providers: [
        { provide: TranslateService, useClass: translateServiceMock },
        { provide: WorkflowEventService, useValue: WorkflowEventServiceMock },
        AlertService,
        SnotifyService,
        SubscribeService,
        HttpClient,
        NzModalService,
        WorkflowEventService,
        { provide: 'SnotifyToastConfig', useValue: ToastDefaults },
        provideMockStore(),
        // other providers
      ],
      imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        AlertModule,
        HttpClientModule,
        SharedModule,
        StoreModule.forRoot({}),
        DatePickerRvModule,
        RouterTestingModule,
        HttpClientTestingModule,
        NgSelectModule,
        NgxDatatableModule,
        //ImportFileModule,
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

    mockStore = TestBed.get(Store);
    fixture = TestBed.createComponent(AddWorkflowsComponent);
    component = fixture.componentInstance;
    mockselectGetRuleCondition = mockStore.overrideSelector(
      selectGetRuleCondition,
      selectGetRuleConditionJson,
    );
    mockselectInternalCode = mockStore.overrideSelector(selectInternalCode, selectInternalCodeJson);
    mockSelectMessageContextList = mockStore.overrideSelector(
      SelectMessageContextList,
      SelectMessageContextListJson,
    );
    MockselectViewSettingsList = mockStore.overrideSelector(
      selectViewSettingsList,
      selectViewSettingsListJSON,
    );
    setDefaultLangSpy = translateService.get.and.returnValue(of([]));
    mockStore.refreshState();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('click close button fuction should close the model', () => {
    component.closeModal();
    expect(component.isVisible).toEqual(false);
  });
  it('fuction should call select value', () => {
    component.validation();
    expect(component.selectedValue).toBeDefined;
  });
  it('click button fuction should remove the data in row list', () => {
    component.removeElement();
    expect(component.menuList).toBeTruthy;
  });
  it('click add button fuction should add row the list', () => {
    component.addService();
    expect(component.addFirstElement).toBeTruthy;
  });
  it('click add button fuction should add group the list', () => {
    component.addGroupService();
    expect(component.addFirstGroupElement).toBeTruthy;
  });
  it('click button fuction should remove the list', () => {
    component.removeUsedService();
    expect(component.globalList).toBeTruthy;
  });
  it('click button fuction should remove user service the list', () => {
    component.removeUsedServiceFormList();
    expect(component.globalList).toBeTruthy;
  });
  it('click save fuction should save user daat row the list', () => {
    component.saveWorkflow();
    expect(component.workflowObj).toBeTruthy;
    expect(component.isEmptyOrSpaces).toBeTruthy;
  });
  it('click fuction should save the data in the list', () => {
    component.publishWorkflow();
    expect(component.workflowObj).toBeTruthy;
    expect(component.isSaveEnable).toHaveBeenCalled;
  });
  it('click fuction should move to down list', () => {
    component.moveToDownElement();
    expect(component.exportMenuList).toBeTruthy;
  });
  it('click save fuction should save user daat row the list', () => {
    component.save();
    expect(component.selectedValue).toBeTruthy;
  });
  it('click save fuction should save user daat row the list', () => {
    component.resetObject();
    expect(component.workflowObj).toBeTruthy;
  });

  it('add fuction should add group service list', () => {
    const item = [{ length: 0 }];
    component.groupAddInServiceList(item);
    expect(component.decisionGroup).toBeTruthy;
  });
  it('fuction should empty space', () => {
    component.isEmptyOrSpaces('test45');
    expect(component).toBeNull;
  });
  it('click fuction should change the tab', () => {
    component.tabClick(1);
    expect(component).toBeTruthy;
  });
  it('fuction should call get group service', () => {
    component.getGroupService({ id: 89, services: [] }, [(length = 0)]);
    expect(component).toBeTruthy;
  });

  it('add fuction should add group service list', () => {
    component.removeUsedGroupService();
    expect(component.groupGlobalList).toBeTruthy;
  });
  it('add fuction should add group service list', () => {
    component.groupDataTransform('aaaaaa', [{ id: 1, services: [] }]);
    expect(component.groupDataTransform).toBeTruthy;
  });

  it('add service fuction should check json ', () => {
    const services = [
      {
        groupName: null,
        id: 95,
        ordinal: 1,
        postDecisionRuleJsonUi: null,
        precedingDecisionUi: null,
        safingConditionJson: null,
        safingExceptionConditionJson: null,
        serviceName: 'AUTH_SERVICE',
        serviceType: 'SERVICE',
        services: [
          // length:0,
        ],
      },
    ];
    component.jsonParse(services);
    expect(component.groupGlobalList).toBeTruthy;
  });

  it('click button fuction should change the tab of group', () => {
    const index = 1;
    component.tabClick(index);
    expect(component).toBeTruthy;
  });
  it('click button fuction should change the tab of group', () => {
    const item = {
      groupName: null,
      id: 95,
      ordinal: 1,
      postDecisionRuleJsonUi: null,
      precedingDecisionUi: null,
      safingConditionJson: null,
      safingExceptionConditionJson: null,
      serviceName: 'AUTH_SERVICE',
      serviceType: 'SERVICE',
      services: [],
    };
    component.getGroupService(item, []);
    expect(component).toBeTruthy;
  });

  it('click button fuction should change the tab of group', () => {
    const arr = [
      {
        id: 1,
        isService: true,
        name: 'AUTH_SERVICE',
        status: false,
      },
      { id: 2, isService: true, name: 'CARD_SERVICE', status: false },
      (length = 2),
    ];
    component.moveArrayItemToNewIndex(arr, -1, 0);
    expect(component.menuList['false']).toBeTruthy;
  });
  it('add fuction should call event', () => {
    const event = {
      source: {},
      value: 'option2',
    };
    component.onChange(event);
    expect(component).toBeTruthy;
  });

  // it('add fuction should call to check name valid ', () => {
  //   component.isNameValid(event);
  //   expect(component).toBeTruthy;
  // });
  it('add fuction should call to check name valid ', () => {
    component.getElement();
    expect(component).toBeTruthy;
  });

  it('add fuction should call change element ', () => {
    component.moveToUpElement();
    expect(component.exportMenuList).toBeTruthy;
  });

  it('add fuction should call add group list ', () => {
    component.addGroupInList();
    expect(component).toBeTruthy;
  });

  it('add fuction should call press any key ', () => {
    component.keyPressAlphaNumericWithCharacters({ keyCode: 65 });
    expect(component).toBeTruthy;
  });

  //   it('add fuction should call press left key ', () => {
  //  const menuList=[
  //   {id:1,name:"AUTH_SERVICE",isService:true,status:false},
  //   {id:2,name:"CARD_SERVICE",isService:true,status:false},
  //   {id:3,name:"FRAUD_SERVICE",isService:true,status:false},
  //   {id:4,name:"GATEWAY_SERVICE",isService:true,status:false},
  //   {id:5,name:"LOYALTY_SERVICE",isService:true,status:false}
  //  ];
  //     component.getSelectedLeft(1);
  //     expect(component.menuList['']).toBeTruthy;
  //   });

  it('add fuction should call open Modal in html ', () => {
    component.openModal();
    expect(component.isVisible).toEqual(true);
  });

  it('add fuction should call open reverse Modal in html ', () => {
    component.openReversalModal();
    expect(component.isReversalVisible).toEqual(true);
  });

  it('add fuction should call open reverse Modal in html ', () => {
    component.deleteElement(event);
    expect(component).toBeTruthy;
  });

  it('add fuction should call open reverse Modal in html ', () => {
    component.removeGroup(1, []);
    expect(component).toBeTruthy;
  });
});
