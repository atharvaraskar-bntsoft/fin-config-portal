import { ComponentFixture, fakeAsync, TestBed, waitForAsync } from '@angular/core/testing';

import { UsersComponent } from './users.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { StoreModule, Store, MemoizedSelector } from '@ngrx/store';
import { IUserState } from '@app/store/state/user.state';
import { MockStoreModule } from '@app/tests/tests.module';
import { MockAction } from '@app/store/actions/mock.actions';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { IAppState } from '@app/store/state/app.state';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { SnotifyService } from 'ng-snotify';
import { EventEmitter } from '@angular/core';
import { of } from 'rxjs';
import { AlertService } from '@app/services/alert.service';
import { ImportFileService } from '@app/services/import-file.service';
import { SharedModule } from '@app/shared/shared.module';
import { AlertModule, DatePickerRvModule, TabsModule } from 'bnt';
import { selectViewSettingsList } from '@app/store/selectors/view-settings.selector';
import { selectPermissionsData } from '@app/store/selectors/permission.selectors';
import { selectUserStatus } from '@app/store/selectors/user.selector';
import { selectUserList } from '@app/store/selectors/user.selector';
import { selectUserDelete } from '@app/store/selectors/user.selector';
import { selectFilterData } from '@app/store/selectors/filter.selectors';
import { CommonModule } from '@angular/common';
class translateServiceMock {
  public onLangChange: EventEmitter<any> = new EventEmitter();
  public onTranslationChange: EventEmitter<any> = new EventEmitter();
  public onDefaultLangChange: EventEmitter<any> = new EventEmitter();

  public get(key: any): any {
    return of(key);
  }
}
const selectPermissionsDataJson = {
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
const selectUserStatusJson = [null];
const selectUserListJson = {
  status: 'success',
  message: 'Find all Users',
  data: {
    'total-record': 20,
    usersList: [
      {
        id: 76,
        firstName: 'nitin',
        lastName: 'gupta',
        loginName: null,
        userId: 'nitin.gupta@bnt.com',
        email: 'nitin.gupta@bnt.com',
        locked: false,
        active: false,
        roleId: null,
        name: 'nitin gupta',
      },
    ],
    'page-no': 1,
    'total-filtered-record': 15,
  },
};
const selectUserDeleteJson = [null];
const selectFilterDataJson = {
  status: null,
  message: null,
  data: {
    status: [
      {
        id: '1',
        name: 'Active',
      },
      {
        id: '2',
        name: 'Inactive',
      },
    ],
  },
};
const row = {
  type: 'L2',
  name: 'XUZ',
  subType: 'Core',
  corePropertiesDetails: [
    {
      id: 29,
      version: 0,
    },
  ],
  version: 0,
  versionId: 29,
};
xdescribe('UsersComponent', () => {
  let component: UsersComponent;
  let fixture: ComponentFixture<UsersComponent>;
  let store: Store<IUserState>;
  let mockStore: MockStore<IAppState>;
  let mockselectPermissionsData: MemoizedSelector<any, any>;
  let mockselectViewSettingsList: MemoizedSelector<any, any>;
  let mockselectUserStatus: MemoizedSelector<any, any>;
  let mockselectUserListJson: MemoizedSelector<any, any>;
  let mockselectUserDeleteJson: MemoizedSelector<any, any>;
  let mockselectFilterData: MemoizedSelector<any, any>;

  let translateService: TranslateService;
  const importFileService = jasmine.createSpyObj('ImportFileService', ['clearData']);
  beforeEach(() => {
    const translateService = jasmine.createSpyObj('TranslateService', ['get', 'setDefaultLang']);
    const alertService = jasmine.createSpyObj('AlertService, SnotifyService', ['responseMessage']);
    TestBed.configureTestingModule({
      declarations: [UsersComponent],
      providers: [
        SnotifyService,
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
  mockStore = TestBed.inject(MockStore);
  fixture = TestBed.createComponent(UsersComponent);
  component = fixture.componentInstance;

  mockselectViewSettingsList = mockStore.overrideSelector(
    selectViewSettingsList,
    selectViewSettingsListJson,
  );
  mockselectPermissionsData = mockStore.overrideSelector(
    selectPermissionsData,
    selectPermissionsDataJson,
  );
  mockselectUserStatus = mockStore.overrideSelector(selectUserStatus, selectUserStatusJson);
  mockselectUserListJson = mockStore.overrideSelector(selectUserList, selectUserListJson);
  mockselectUserDeleteJson = mockStore.overrideSelector(selectUserDelete, selectUserListJson);
  mockselectFilterData = mockStore.overrideSelector(selectFilterData, selectFilterDataJson);
  // store.dispatch(new MockAction({ Location }));
  translateService = TestBed.inject(TranslateService);
  mockStore.refreshState();
  fixture.detectChanges();
  
  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('resetSearch fuction searchResetButton open the Modal', () => {
    component.resetSearch();
    expect(component.searchResetButton).toEqual(true);
  });
  it('openModal fuction should open the Modal', () => {
    component.open();
    expect(component.visibleAnimate).toEqual(false);
  });
  it('cancel fuction should cancel the Modal', () => {
    component.cancel();
    expect(component.visible).toEqual(false);
  });
  it('getFilterNameData should have a resetSearch', () => {
    component.getFilterNameData(event);
    expect(component.searchResetButton).toEqual(true);
    spyOn(component, 'resetSearch').and.callThrough();
    component.resetSearch();
    component.getFilterNameData(event);
    expect(component.resetSearch).toHaveBeenCalled();
  });
  // it('should call getRowData function', () => {
  //   component.getRowData(row);
  //   expect(component.getRowData).toBeDefined;
  // });
  it('should call getFilterAddressData function', fakeAsync(() => {
    const data = {
      name: ['NOIDA', 'UK'],
      type: 'city',
    };
    component.getFilterStatusData(event);
    expect(component.getFilterStatusData).toBeDefined;
    expect(component.getFilterStatusData).toHaveBeenCalled;
  }));
  it('should call getFilterAddressData function', fakeAsync(() => {
    const data = {
      name: ['NOIDA', 'UK'],
      type: 'city',
    };
    component.getFilterRole(event);
    expect(component.getFilterRole).toBeDefined;
    expect(component.getFilterRole).toHaveBeenCalled;
  }));
  it('cancel fuction should cancel the Modal', () => {
    component.deleteRow(row);
    expect(component.getFilterRole).toBeDefined;
    expect(component.getFilterRole).toHaveBeenCalled;
  });
  it('cancel fuction should cancel the Modal', () => {
    component.delete();
    expect(component.delete).toBeDefined;
    expect(component.delete).toHaveBeenCalled;
  });

  afterEach(() => {
    fixture.destroy();
  });
});
