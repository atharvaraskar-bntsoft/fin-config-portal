import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { InstitutionInfoComponent } from './institution-info.component';
import { RouterTestingModule } from '@angular/router/testing';
import { MemoizedSelector,Store , StoreModule } from '@ngrx/store';
import { MockAction } from '@app/store/actions/mock.actions';
import { MockStoreModule } from '@app/tests/tests.module';
import { AlertService } from '@app/services/alert.service';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { SnotifyService, ToastDefaults } from 'ng-snotify';
import { ImportFileService } from '@app/services/import-file.service';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { IAppState } from '@app/store/state/app.state';
import { AlertModule, TabsModule, DatePickerRvModule } from 'bnt';
// import { ImportFileModule } from '@app/import-file/import-file.module';
import { SharedModule } from '@app/shared/shared.module';
import { selectViewSettingsList } from '@app/store/selectors/view-settings.selector';
import { selectPermissionsData } from '@app/store/selectors/permission.selectors';
import { selectInstitutionDetail } from '../../../store/selectors/institution.selectors';
import { EventEmitter } from '@angular/core';
import { of } from 'rxjs';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatMenuModule } from '@angular/material/menu';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatDialogModule } from '@angular/material/dialog';
import { NzModalService } from 'ng-zorro-antd/modal';




const selectInstitutionDetailJSON ={

  accountNumber: null,
acquirerID: null,
activateOn: 1646201520000,
additionalAttribute: null,
bankName: null,
code: '687555537877464',
currency: null,
description: 'DTestChain1',
expiryOn: 1762150320000,
id: 5,
locked: '0',
merchantDetail: null,
merchantInstitution:{
  id: 4,
  name: "VISA HTTP"
},
merchantProfile: null,
name: 'DTestChain1',
posSafetyFlag: '1',
reversalTimeout: null,
totalDevice: 0,
totalLocation: 0,
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

const selectPermissionsDataJSON ={

  data:[
    {
      
        id: 'link_notification',
        read: true,
        write: true,
        update: true,
        delete: true,
        check: false
      
    }
  ],
  message: null,
  status: 'success'
};


describe('InstitutionInfoComponent', () => {
  let component: InstitutionInfoComponent;
  let fixture: ComponentFixture<InstitutionInfoComponent>;
  // let store: Store<InstitutionInfoComponent>;
  let mockStore: MockStore<IAppState>;
  let getSpy: jasmine.Spy;
  let mockselectInstitutionDetail: MemoizedSelector<any, any>;
  let mockselectViewSettingsList: MemoizedSelector<any, any>;
  let mockselectPermissionsData : MemoizedSelector<any, any>;
 

  
  beforeEach(waitForAsync(() => {
    const translateService = jasmine.createSpyObj('TranslateService', ['get','setDefaultLang']);
    // store = TestBed.get(Store);
    TestBed.configureTestingModule({
      declarations: [InstitutionInfoComponent, ],
     providers :[AlertService,TranslateService,SnotifyService,  NzModalService,
      { provide: TranslateService, useValue: translateService },
        { provide: 'SnotifyToastConfig', useValue: ToastDefaults },
        
        provideMockStore(),
        
    ],
      imports: [RouterTestingModule,
        NgSelectModule,
        FormsModule,
        NgxDatatableModule,
        // MockStoreModule.forRoot('Location', {}),
        StoreModule.forRoot({}),
        FormsModule,
        AlertModule,
        // ImportFileModule,
        ReactiveFormsModule,
        BrowserAnimationsModule,
        TabsModule,
        DatePickerRvModule,
        MatMenuModule,
        RouterTestingModule,
        HttpClientTestingModule,
        MatDialogModule,
        SharedModule,
        // TranslateModule.forRoot({}),
        TranslateModule,
        
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    mockStore = TestBed.get(MockStore);
    fixture = TestBed.createComponent(InstitutionInfoComponent);
    component = fixture.componentInstance;
    // fixture.detectChanges();
    // store.dispatch(new MockAction({ Location }));

    mockselectViewSettingsList = mockStore.overrideSelector(
      selectViewSettingsList,
      selectViewSettingsListJSON,
    );

    mockselectPermissionsData = mockStore.overrideSelector(
      selectPermissionsData,
      selectPermissionsDataJSON
    );

    mockselectInstitutionDetail = mockStore.overrideSelector(
      selectInstitutionDetail,
      selectInstitutionDetailJSON,
    )

    // getSpy = translateService.get.and.returnValue(of(['']));
    mockStore.refreshState();
    fixture.detectChanges();
  });

  it('should list institution-info', () => {
    expect(component).toBeTruthy();
  });
  
  it('should create', () => {
    expect(component).toBeTruthy();
  });

  afterEach(() => {
    fixture.destroy();
  });
});
