import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ProcessorAdapterComponent } from './processor-adapter.component';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { MockStoreModule } from '@app/tests/tests.module';
import { MemoizedSelector, Store, StoreModule } from '@ngrx/store';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { IAppState } from '@app/store/state/app.state';
import { EventEmitter } from '@angular/core';


import { selectViewSettingsList } from '@app/store/selectors/view-settings.selector';
import { of } from 'rxjs';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { NzModalService } from 'ng-zorro-antd/modal';
import { AlertService } from '@app/services/alert.service';
import { SnotifyService, ToastDefaults } from 'ng-snotify';
import { SharedModule } from '@app/shared/shared.module';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { AlertModule } from 'bnt';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { selectprocessorAdapterList } from '@app/store/selectors/processor-adapter.selector';
import { selectPermissionsData } from '@app/store/selectors/permission.selectors';
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
const selectprocessorAdapterListJSON ={

  processorAdapterList:[
    {
      active: true,
      adapterId:{
        id: 102,
      name: "klfklrkflrklfrlkflrklf",
      type: "L3",
      },
      code: "11111",
createdBy: 70,
createdOn: 1661750630000,
description: "aaaaa",
id: 20,
isSAFEnabled: true,
lookupvalueId:{
  active: null,
  description: "FRAUD SERVICE",
  id: 31,
  value: "FRAUD_SERVICE",
},
name: "aaaaaa",
updatedBy: null,
updatedOn: 1661750630000,
    }
  ],
};
const selectPermissionsDataJSON={
   data :[
    {
      id: 'link_notification',
    read: true,
   write: true,
   update: true,
   delete: true,
    check: false,
    }
   ],
  message: null,
status: 'success',
};
xdescribe('ProcessorAdapterComponent', () => {
  let component: ProcessorAdapterComponent;
  let fixture: ComponentFixture<ProcessorAdapterComponent>;
  // let store: Store<ProcessorAdapterComponent>;
  let mockStore: MockStore<IAppState>;
  let mockselectViewSettingsList: MemoizedSelector<any, any>;
  let mockselectprocessorAdapterList: MemoizedSelector<any, any>;
  let mockselectPermissionsData : MemoizedSelector<any, any>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProcessorAdapterComponent, MockStoreModule.forRoot('Location', {})],
      imports: [NgxDatatableModule,
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
      ],
      providers : [TranslateService,NzModalService,AlertService,
        SnotifyService,
        { provide: 'SnotifyToastConfig', useValue: ToastDefaults },
        { provide: TranslateService,  useClass: translateServiceMock },
        provideMockStore(),
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    mockStore = TestBed.get(MockStore);
    fixture = TestBed.createComponent(ProcessorAdapterComponent);
    component = fixture.componentInstance;

    mockselectViewSettingsList = mockStore.overrideSelector(
      selectViewSettingsList,
      selectViewSettingsListJSON,
    );

    mockselectprocessorAdapterList = mockStore.overrideSelector(
      selectprocessorAdapterList,
      selectprocessorAdapterListJSON
    );
    mockselectPermissionsData = mockStore.overrideSelector(
      selectPermissionsData,
      selectPermissionsDataJSON
    );
    mockStore.refreshState();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it("should render Table", () => {
    const ngxdatatable: HTMLElement = fixture.nativeElement.querySelector('ngx-datatable');
    const text = ngxdatatable.innerText;
    expect(text).toBeTruthy();
  });
  afterEach(() => {
    fixture.destroy();
  });
});
