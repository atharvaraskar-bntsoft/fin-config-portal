import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CreateTagComponent } from './create-tag.component';
import { EventEmitter } from '@angular/core';
import { of } from 'rxjs';
import { selectViewSettingsList } from '@app/store/selectors/view-settings.selector';
import { IAppState } from '@app/store/state/app.state';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { MemoizedSelector, StoreModule } from '@ngrx/store';
import { NzModalService } from 'ng-zorro-antd/modal';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { AlertService } from '@app/services/alert.service';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { AlertModule } from 'bnt';

import { selectLatestWorkflowService } from '@app/store/selectors/workflows.selectors';
import {
  createTagList,
  editTagList,
  selectOperators,
  selectRuleTagList,
  updateTagList,
} from '@app/store/selectors/rule-tag.selectors';

import { SelectMessageContextList } from '../../../store/selectors/l1-adapter.selectors';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { SnotifyService, ToastDefaults } from 'ng-snotify';
import { SharedModule } from '@app/shared/shared.module';
import { A } from '@angular/cdk/keycodes';
import { CommonModule } from '@angular/common';
class translateServiceMock {
  public onLangChange: EventEmitter<any> = new EventEmitter();
  public onTranslationChange: EventEmitter<any> = new EventEmitter();
  public onDefaultLangChange: EventEmitter<any> = new EventEmitter();

  public get(key: any): any {
    return of(key);
  }
  
};
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
const getRule={
  condition:{
    
      "id": "0",
      "fieldName": "${payment_method}",
      "type": "pattern",
      "pattern": "CARD"
  },
  id:0,
    

};
const selectLatestWorkflowServiceJSON ={};
const selectRuleTagListJSON ={};
const createTagListJSON ={};
const updateTagListJSON ={};
const selectOperatorsJSON ={};
const SelectMessageContextListJSON={};
xdescribe('CreateTagComponent', () => {
  let component: CreateTagComponent;
  let fixture: ComponentFixture<CreateTagComponent>;
  let mockStore: MockStore<IAppState>;
  let mockselectViewSettingsList: MemoizedSelector<any, any>;
  let mockselectLatestWorkflowService :MemoizedSelector<any, any>;
  let mockselectRuleTagList : MemoizedSelector<any, any>;
  let mockcreateTagList : MemoizedSelector<any, any>;
  let mockupdateTagList : MemoizedSelector<any, any>;
  let mockselectOperators : MemoizedSelector<any, any>;
  let mockSelectMessageContextList : MemoizedSelector<any, any>;
  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [CreateTagComponent],
      providers : [TranslateService,NzModalService,AlertService,SnotifyService,
        { provide: 'SnotifyToastConfig', useValue: ToastDefaults },
        { provide: TranslateService,  useClass: translateServiceMock },
        provideMockStore(),
        
      ],
      imports: [
        SharedModule,
        StoreModule,
        NgSelectModule,
        FormsModule,
        RouterTestingModule,
        NgxDatatableModule,
      
        // MockStoreModule.forRoot('Location', {}),
        AlertModule,
        StoreModule.forRoot({}),
        BrowserAnimationsModule,
        HttpClientTestingModule,
        TranslateModule,
        CommonModule
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    mockStore = TestBed.get(MockStore);
    fixture = TestBed.createComponent(CreateTagComponent);
    component = fixture.componentInstance;
    mockselectViewSettingsList = mockStore.overrideSelector(
      selectViewSettingsList,
      selectViewSettingsListJSON,
    );
    mockselectLatestWorkflowService  = mockStore.overrideSelector(
      selectLatestWorkflowService,
      selectLatestWorkflowServiceJSON,
    );

    mockselectRuleTagList = mockStore.overrideSelector(
      selectRuleTagList,
      selectRuleTagListJSON
    );
    mockcreateTagList = mockStore.overrideSelector(
      createTagList,
      createTagListJSON,
    );
    mockupdateTagList =mockStore.overrideSelector(
      updateTagList,
      updateTagListJSON
    );
    mockselectOperators = mockStore.overrideSelector(
      selectOperators,
      selectOperatorsJSON
    );
    mockSelectMessageContextList = mockStore.overrideSelector(
      SelectMessageContextList,
      SelectMessageContextListJSON,
    );
    mockStore.refreshState();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  
  // it('function should call save rule tag in html', () => {
  //   component.saveRuleTag();
  //   expect(component.tagError).toEqual(false);
  // });
  

  it('function should call getservice value', () => {
    component.getService(A);
    expect(component.serviceList).toBeTruthy;
    expect(component.isSpinning).toEqual(false);
  });
 
  it('function should call update data in html', () => {
    component.UpdateTag();
   
    expect(component.tagError).toBeTruthy;;
  });
  
  it('function should call getserviceRule  value', () => {
    component.getRule(getRule) ;
    expect(component.conditionObj).toBeTruthy;
    expect(component.payload.condition).toBeTruthy;
    expect(component.isVisiblecon).toEqual(false);
  });

  
  it('should function call save rule', () => {
    const storeSpy = spyOn(mockStore, 'dispatch').and.callThrough();
    component.saveRuleTag();
    fixture.detectChanges();
    expect(storeSpy).toHaveBeenCalledTimes(0);
    expect(component.tag).toBeTruthy;
  });
  afterEach(() => {
    fixture.destroy();
  });
});
