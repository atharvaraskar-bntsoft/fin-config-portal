import { ElementRef, EventEmitter } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { IAppState } from '@app/store/state/app.state';
import { MemoizedSelector, StoreModule } from '@ngrx/store';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { NzModalService } from 'ng-zorro-antd/modal';
import { of } from 'rxjs';
import { UserRolesComponent } from './user-roles.component';
import { selectProfileList } from '@app/store/selectors/profile.selector';
import {
  selectUserRolesList,
  selectGetAdminRoleCheck,
} from '../../../store/selectors/user-roles.selector';
import { selectFilterData } from '@app/store/selectors/filter.selectors';
import { selectViewSettingsList } from '@app/store/selectors/view-settings.selector';
import { selectPermissionsData } from '@app/store/selectors/permission.selectors';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { NzSwitchModule } from 'ng-zorro-antd/switch';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

class translateServiceMock {
  public onLangChange: EventEmitter<any> = new EventEmitter();
  public onTranslationChange: EventEmitter<any> = new EventEmitter();
  public onDefaultLangChange: EventEmitter<any> = new EventEmitter();
  public get(key: any): any {
    return of(key);
  }
}

class ElementRefClass {
  public close(key: any): any {}
}

class nzModelSeviceClass {
  public close(key: any): any {}
}

const profileListJson = {
  status: 'success',
  message: 'Find all user',
  data: {
    id: 1,
    firstName: 'Bnt',
    lastName: 'Admin',
    loginName: null,
    userId: 'bnt.admin@bnt.com',
    email: 'bnt.admin@bnt.com',
    locked: false,
    active: false,
    roleId: null,
  },
};

const userRoleListJson = {
  status: 'success',
  message: 'Find all Roles',
  data: {
    'total-record': 8,
    'page-no': 1,
    userRoleList: [
      {
        id: 8,
        name: 'ADMIN',
        description: '',
        locked: false,
        active: false,
        deleted: false,
        roleFunctions: [
          {
            id: 110,
            subMenuFunction: {
              id: 1,
              name: 'Merchant Group',
              url: 'link_institution',
              mappingUrl: 'merchant-institution',
              permissionData: null,
            },
            view: true,
            create: false,
            modify: false,
            delete: false,
            check: false,
          },
          {
            id: 111,
            subMenuFunction: {
              id: 39,
              name: 'Dashboard',
              url: 'link_dashboard',
              mappingUrl: null,
              permissionData: null,
            },
            view: true,
            create: true,
            modify: true,
            delete: true,
            check: false,
          },
          {
            id: 112,
            subMenuFunction: {
              id: 45,
              name: 'Notification',
              url: 'link_notification',
              mappingUrl: null,
              permissionData: null,
            },
            view: true,
            create: true,
            modify: true,
            delete: true,
            check: false,
          },
        ],
      },
    ],
    'total-filtered-record': 8,
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

const filterJson = {
  status: null,
  message: null,
  data: {
    function: [
      {
        id: 1,
        name: 'Merchant Group',
        operation: {
          create: true,
          modify: true,
          view: true,
          delete: true,
          check: true,
        },
      },
    ],
    status: [
      {
        id: '1',
        name: 'Active',
      },
    ],
  },
};

const permissionJson = {
  data: [
    {
      check: false,
      delete: true,
      id: 'link_user_roles',
      read: true,
      update: true,
      write: true,
    },
  ],
};

const getAdminRoleCheckJson = {
  status: null,
  message: null,
  data: {
    list: [
      {
        id: 1,
        roleID: {
          id: 1,
          name: 'ADMIN',
          description: 'Platform Super User Role',
          locked: false,
          active: false,
          deleted: false,
          roleFunctions: [
            {
              id: 1,
              subMenuFunction: {
                id: 1,
                name: 'Merchant Group',
                url: 'link_institution',
                mappingUrl: 'merchant-institution',
                permissionData: null,
              },
              view: true,
              create: true,
              modify: true,
              delete: true,
              check: true,
            },
          ],
        },
        systemUserID: {
          id: 1,
          firstName: 'Bnt',
          lastName: 'Admin',
          loginName: null,
          userId: 'bnt.admin@bnt.com',
          email: 'bnt.admin@bnt.com',
          locked: false,
          active: false,
          roleId: null,
        },
      },
    ],
    isAdminEnabled: true,
    adminRole: 'ADMIN',
  },
};

xdescribe('UserRolesComponent', () => {
  let component: UserRolesComponent;
  let fixture: ComponentFixture<UserRolesComponent>;
  let mockStore: MockStore<IAppState>;
  let mockselectProfileList: MemoizedSelector<any, any>;
  let mockselectUserRolesList: MemoizedSelector<any, any>;
  let mockselectFilterData: MemoizedSelector<any, any>;
  let mockselectGetAdminRoleCheck: MemoizedSelector<any, any>;
  let mockselectViewSettingsList: MemoizedSelector<any, any>;
  let mockselectPermissionsData: MemoizedSelector<any, any>;
  let setDefaultLangSpy: jasmine.Spy;

  beforeEach(() => {
    const translateService = jasmine.createSpyObj('TranslateService', ['get', 'setDefaultLang']);
    TestBed.configureTestingModule({
      declarations: [UserRolesComponent],
      providers: [
        NzModalService,
        provideMockStore(),
        { provide: TranslateService, useClass: translateServiceMock },
        { provide: ElementRef, useClass: ElementRefClass },
        { provide: NzModalService, useClass: nzModelSeviceClass },
      ],
      imports: [
        FormsModule,
        RouterTestingModule,
        NgSelectModule,
        NgxDatatableModule,
        NzSwitchModule,
        TranslateModule.forRoot({}),
        StoreModule.forRoot({}),
        CommonModule
      ],
    }).compileComponents();

    mockStore = TestBed.inject(MockStore);
    fixture = TestBed.createComponent(UserRolesComponent);
    component = fixture.componentInstance;

    mockselectProfileList = mockStore.overrideSelector(selectProfileList, profileListJson);

    mockselectUserRolesList = mockStore.overrideSelector(selectUserRolesList, userRoleListJson);

    mockselectFilterData = mockStore.overrideSelector(selectFilterData, filterJson);

    mockselectGetAdminRoleCheck = mockStore.overrideSelector(
      selectGetAdminRoleCheck,
      getAdminRoleCheckJson,
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

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
