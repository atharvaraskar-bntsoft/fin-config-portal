import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { IAppState } from '@app/store/state/app.state';
import { NgSelectModule } from '@ng-select/ng-select';
import { MemoizedSelector, StoreModule } from '@ngrx/store';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { NzModalService } from 'ng-zorro-antd/modal';
import { AlertModule } from 'bnt';
import { EventEmitter } from '@angular/core';
import { of } from 'rxjs';
import {
  confrimRuleResponse,
  confrimUpdateRuleResponse,
} from '@app/store/selectors/destination-rules.selector';
import { selectPermissionsData } from '@app/store/selectors/permission.selectors';
import { DestinationRulesViewComponent } from './destination-rules-view.component';
import { selectViewSettingsList } from '@app/store/selectors/view-settings.selector';
import { ActivatedRoute, convertToParamMap, Router } from '@angular/router';
import { SharedModule } from '@app/shared/shared.module';
class translateServiceMock {
  public onLangChange: EventEmitter<any> = new EventEmitter();
  public onTranslationChange: EventEmitter<any> = new EventEmitter();
  public onDefaultLangChange: EventEmitter<any> = new EventEmitter();

  public get(key: any): any {
    return of(key);
  }
  
};
const selectViewSettingsListJSON = [{
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
}];
const confrimRuleResponseJSON={};
const confrimUpdateRuleResponseJSON ={};
const selectPermissionsDataJSON ={
  data:[
    {
      id: "link_notification",
read: true,
write: true,
update: true,
delete: true,
check: false,
    }
  ],
};
const row ={
  id:1,
};
// const row = {

//   type: "L2",

//   name: "XUZ",
//   id: 29,
//   subType: "Core",

//   corePropertiesDetails: [

//       {

//           id: 29,

//           version: 0

//       }

//   ],

//   version: 0,

//   versionId: 29

// };

xdescribe('DestinationRulesViewComponent', () => {
  let component: DestinationRulesViewComponent;
  let fixture: ComponentFixture<DestinationRulesViewComponent>;
  let mockStore: MockStore<IAppState>;
  let mockselectViewSettingsList: MemoizedSelector<any, any>;
  let mockconfrimRuleResponse :MemoizedSelector<any, any>;
  let mockconfrimUpdateRuleResponse  :MemoizedSelector<any, any>;
  let mockselectPermissionsData :MemoizedSelector<any, any>;

  beforeEach(() => {
    // const RouterSpy = jasmine.createSpyObj(
    //   'Router',
    //   ['navigate']
    // );
    TestBed.configureTestingModule({
      declarations: [DestinationRulesViewComponent],
      providers : [TranslateService,NzModalService,
        
        { provide: TranslateService,  useClass: translateServiceMock },
        provideMockStore(),
        // { provide: Router, useValue: RouterSpy },
        // {
        //   provide: ActivatedRoute,
        //   useValue: {
        //     snapshot: {
        //       paramMap: convertToParamMap({
        //         id: '1',
        //       }),
        //       data: { ruletype: 'workflow' },
        //     },
        //   },
        // },
      ],
      imports: [
        StoreModule,
        NgSelectModule,
        FormsModule,
        RouterTestingModule,
        NgxDatatableModule,
        SharedModule,
      
        // MockStoreModule.forRoot('Location', {}),
        AlertModule,
        StoreModule.forRoot({}),
        BrowserAnimationsModule,
        HttpClientTestingModule,
        TranslateModule,
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    mockStore = TestBed.get(MockStore);
    fixture = TestBed.createComponent(DestinationRulesViewComponent);
    component = fixture.componentInstance;

    mockselectViewSettingsList = mockStore.overrideSelector(
      selectViewSettingsList,
      selectViewSettingsListJSON,
    );
    mockconfrimRuleResponse = mockStore.overrideSelector(
      confrimRuleResponse,
      confrimRuleResponseJSON,
    );

    mockconfrimUpdateRuleResponse = mockStore.overrideSelector(
      confrimUpdateRuleResponse,
      confrimUpdateRuleResponseJSON,
    );
    mockselectPermissionsData =mockStore.overrideSelector(
      selectPermissionsData,
      selectPermissionsDataJSON,
    );
    mockStore.refreshState();
    fixture.detectChanges();
  });

  it('function should call onback', () => {
    component.onBack();
    expect(component.ruletype).toBeTruthy;
  });
  // it('should  Angular calls ngOnInit', () => {
  //   component.ngOnInit();
  // });
  it('getRowData fuction should call click on list screen row form this HTMl', () => {
    const DestinationRulesViewComponent = Object.getPrototypeOf(component);
    component.getRowData(row);
    expect(DestinationRulesViewComponent._router.navigate).toHaveBeenCalledWith(['/routing/rule-engine/', row.id]);
  });
  
  it('should create', () => {
    expect(component).toBeTruthy();
  });

  afterEach(() => {
    fixture.destroy();
  });
});
