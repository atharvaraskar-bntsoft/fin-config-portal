import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { UserRolesCreateComponent } from './user-roles-create.component';
import { StoreModule, Store } from '@ngrx/store';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { AlertModule, TabsModule, DatePickerRvModule } from 'bnt';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { AlertService } from '@app/services/alert.service';
import { EventEmitter } from '@angular/core';
import { EMPTY, of } from 'rxjs';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { IAppState } from '@app/store/state/app.state';
import { TranslateService } from '@ngx-translate/core';
import { MemoizedSelector } from '@ngrx/store';
import { SharedModule } from '@app/shared/shared.module';
import { CommonModule } from '@angular/common';
import { ModalModule } from 'angular-custom-modal';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { NzDrawerModule } from 'ng-zorro-antd/drawer';
import { UserRolesService } from '@app/services/user-roles.service';
import { selectViewSettingsList } from '@app/store/selectors/view-settings.selector';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { selectUserRolelist } from '@app/store/selectors/user.selector';
import { selectUserRolesFunctionList } from '@app/store/selectors/user-roles.selector';
import { SnotifyService, ToastDefaults } from 'ng-snotify';
class translateServiceMock {
  public onLangChange: EventEmitter<any> = new EventEmitter();
  public onTranslationChange: EventEmitter<any> = new EventEmitter();
  public onDefaultLangChange: EventEmitter<any> = new EventEmitter();

  public get(key: any): any {
    return of(key);
  }

  public setDefaultLang(key: any): any { }
}

class UserRolesServiceMock {
  public onLangChange: EventEmitter<any> = new EventEmitter();
  public onTranslationChange: EventEmitter<any> = new EventEmitter();
  public onDefaultLangChange: EventEmitter<any> = new EventEmitter();

  public getRoleHidden(): any {
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

const selectUserRolelistJson =
{
  status: "success",
  message: "Role list",
  data: [
    {
      "id": 1,
      "name": "Administrator"
    },
    {
      "id": 2,
      "name": "CUSTODIAN"
    },
    {
      "id": 3,
      "name": "DUMMY"
    },
    {
      "id": 4,
      "name": "VIEW-ONLY"
    },
    {
      "id": 5,
      "name": "EDITOR"
    }
  ]
}

const selectUserRolesFunctionListJson =
{
  status: "success",
  message: null,
  data: [
    {
      "id": 1,
      "name": "Merchant Group",
      "operation": {
        "create": true,
        "modify": true,
        "view": true,
        "delete": true,
        "check": true
      }
    },
    {
      "id": 2,
      "name": "Merchants",
      "operation": {
        "create": true,
        "modify": true,
        "view": true,
        "delete": true,
        "check": true
      }
    },
    {
      "id": 3,
      "name": "Locations",
      "operation": {
        "create": true,
        "modify": true,
        "view": true,
        "delete": true,
        "check": true
      }
    },
    {
      "id": 4,
      "name": "Device",
      "operation": {
        "create": true,
        "modify": true,
        "view": true,
        "delete": true,
        "check": true
      }
    },
    {
      "id": 7,
      "name": "Schedule",
      "operation": {
        "create": true,
        "modify": true,
        "view": true,
        "delete": true,
        "check": false
      }
    },
    {
      "id": 9,
      "name": "IMF",
      "operation": {
        "create": true,
        "modify": true,
        "view": true,
        "delete": true,
        "check": false
      }
    },
    {
      "id": 10,
      "name": "History",
      "operation": {
        "create": true,
        "modify": true,
        "view": true,
        "delete": true,
        "check": false
      }
    },
    {
      "id": 11,
      "name": "Deployment Status",
      "operation": {
        "create": true,
        "modify": true,
        "view": true,
        "delete": false,
        "check": true
      }
    },
    {
      "id": 13,
      "name": "Audit Logs",
      "operation": {
        "create": true,
        "modify": true,
        "view": true,
        "delete": true,
        "check": false
      }
    },
    {
      "id": 14,
      "name": "Access Logs",
      "operation": {
        "create": true,
        "modify": true,
        "view": true,
        "delete": true,
        "check": false
      }
    },
    {
      "id": 15,
      "name": "Transaction Logs",
      "operation": {
        "create": true,
        "modify": true,
        "view": true,
        "delete": true,
        "check": false
      }
    },
    {
      "id": 16,
      "name": "Invalid Transaction Logs",
      "operation": {
        "create": true,
        "modify": true,
        "view": true,
        "delete": true,
        "check": false
      }
    },
    {
      "id": 22,
      "name": "Workflow",
      "operation": {
        "create": true,
        "modify": true,
        "view": true,
        "delete": true,
        "check": false
      }
    },
    {
      "id": 23,
      "name": "Router",
      "operation": {
        "create": true,
        "modify": true,
        "view": true,
        "delete": true,
        "check": false
      }
    },
    {
      "id": 24,
      "name": "Rule",
      "operation": {
        "create": true,
        "modify": true,
        "view": true,
        "delete": true,
        "check": false
      }
    },
    {
      "id": 25,
      "name": "Velocity",
      "operation": {
        "create": true,
        "modify": true,
        "view": true,
        "delete": true,
        "check": false
      }
    },
    {
      "id": 27,
      "name": "L1 Adapters",
      "operation": {
        "create": true,
        "modify": true,
        "view": true,
        "delete": true,
        "check": true
      }
    },
    {
      "id": 28,
      "name": "L3 Adapters",
      "operation": {
        "create": true,
        "modify": true,
        "view": true,
        "delete": true,
        "check": true
      }
    },
    {
      "id": 29,
      "name": "Lookup Values",
      "operation": {
        "create": true,
        "modify": true,
        "view": true,
        "delete": true,
        "check": true
      }
    },
    {
      "id": 30,
      "name": "Users",
      "operation": {
        "create": true,
        "modify": true,
        "view": true,
        "delete": true,
        "check": false
      }
    },
    {
      "id": 31,
      "name": "Role Mapping",
      "operation": {
        "create": true,
        "modify": true,
        "view": true,
        "delete": false,
        "check": true
      }
    },
    {
      "id": 32,
      "name": "Countries",
      "operation": {
        "create": true,
        "modify": true,
        "view": true,
        "delete": true,
        "check": false
      }
    },
    {
      "id": 35,
      "name": "Country States",
      "operation": {
        "create": true,
        "modify": true,
        "view": true,
        "delete": true,
        "check": false
      }
    },
    {
      "id": 36,
      "name": "Currencies",
      "operation": {
        "create": true,
        "modify": true,
        "view": true,
        "delete": true,
        "check": false
      }
    },
    {
      "id": 37,
      "name": "Device Types",
      "operation": {
        "create": true,
        "modify": true,
        "view": true,
        "delete": true,
        "check": false
      }
    },
    {
      "id": 41,
      "name": "Monitoring",
      "operation": {
        "create": false,
        "modify": false,
        "view": false,
        "delete": false,
        "check": false
      }
    },
    {
      "id": 44,
      "name": "Pending Approvals",
      "operation": {
        "create": true,
        "modify": true,
        "view": true,
        "delete": false,
        "check": true
      }
    },
    {
      "id": 45,
      "name": "Notification",
      "operation": {
        "create": true,
        "modify": true,
        "view": true,
        "delete": false,
        "check": true
      }
    },
    {
      "id": 46,
      "name": "Destination Rule",
      "operation": {
        "create": true,
        "modify": true,
        "view": true,
        "delete": false,
        "check": true
      }
    },
    {
      "id": 47,
      "name": "Workflow Rule",
      "operation": {
        "create": true,
        "modify": true,
        "view": true,
        "delete": false,
        "check": true
      }
    },
    {
      "id": 48,
      "name": "Destination Router",
      "operation": {
        "create": true,
        "modify": true,
        "view": true,
        "delete": false,
        "check": true
      }
    },
    {
      "id": 49,
      "name": "Workflow Router",
      "operation": {
        "create": true,
        "modify": true,
        "view": true,
        "delete": false,
        "check": true
      }
    },
    {
      "id": 51,
      "name": "Destination Endpoint",
      "operation": {
        "create": true,
        "modify": true,
        "view": true,
        "delete": false,
        "check": true
      }
    },
    {
      "id": 53,
      "name": "Acquirer Id Config",
      "operation": {
        "create": true,
        "modify": true,
        "view": true,
        "delete": false,
        "check": true
      }
    },
    {
      "id": 54,
      "name": "Merchant Reports",
      "operation": {
        "create": true,
        "modify": true,
        "view": true,
        "delete": false,
        "check": true
      }
    },
    {
      "id": 56,
      "name": "Status",
      "operation": {
        "create": true,
        "modify": true,
        "view": true,
        "delete": false,
        "check": true
      }
    },
    {
      "id": 57,
      "name": "Export Import",
      "operation": {
        "create": true,
        "modify": true,
        "view": true,
        "delete": false,
        "check": true
      }
    },
    {
      "id": 58,
      "name": "Deployed Router",
      "operation": {
        "create": true,
        "modify": true,
        "view": true,
        "delete": false,
        "check": true
      }
    },
    {
      "id": 59,
      "name": "View Settings",
      "operation": {
        "create": true,
        "modify": true,
        "view": true,
        "delete": false,
        "check": true
      }
    },
    {
      "id": 62,
      "name": "EL-Function",
      "operation": {
        "create": true,
        "modify": true,
        "view": true,
        "delete": false,
        "check": true
      }
    },
    {
      "id": 63,
      "name": "Clusters",
      "operation": {
        "create": true,
        "modify": true,
        "view": true,
        "delete": false,
        "check": true
      }
    },
    {
      "id": 64,
      "name": "Workflow JSON",
      "operation": {
        "create": true,
        "modify": true,
        "view": true,
        "delete": false,
        "check": true
      }
    },
    {
      "id": 66,
      "name": "MID Mapping",
      "operation": {
        "create": true,
        "modify": true,
        "view": true,
        "delete": false,
        "check": true
      }
    },
    {
      "id": 67,
      "name": "Tags",
      "operation": {
        "create": true,
        "modify": true,
        "view": true,
        "delete": false,
        "check": false
      }
    },
    {
      "id": 68,
      "name": "Acquirer Mapping",
      "operation": {
        "create": true,
        "modify": true,
        "view": true,
        "delete": true,
        "check": false
      }
    },
    {
      "id": 69,
      "name": "SAF Queue",
      "operation": {
        "create": true,
        "modify": true,
        "view": true,
        "delete": true,
        "check": false
      }
    },
    {
      "id": 70,
      "name": "Exception Queue",
      "operation": {
        "create": true,
        "modify": true,
        "view": true,
        "delete": true,
        "check": false
      }
    },
    {
      "id": 71,
      "name": "Bin Table",
      "operation": {
        "create": true,
        "modify": true,
        "view": true,
        "delete": true,
        "check": false
      }
    },
    {
      "id": 72,
      "name": "EMV Data",
      "operation": {
        "create": true,
        "modify": true,
        "view": true,
        "delete": true,
        "check": false
      }
    },
    {
      "id": 73,
      "name": "Generate DEK",
      "operation": {
        "create": true,
        "modify": true,
        "view": true,
        "delete": true,
        "check": false
      }
    },
    {
      "id": 74,
      "name": "Extractor UI",
      "operation": {
        "create": true,
        "modify": true,
        "view": true,
        "delete": true,
        "check": false
      }
    }
  ]
}

xdescribe('UserRolesCreateComponent', () => {
  let component: UserRolesCreateComponent;
  let fixture: ComponentFixture<UserRolesCreateComponent>;
  let mockStore: MockStore<IAppState>;
  let translate: TranslateService;
  let mockselectViewSettingsList;
  let mockselectUserRolesFunctionList;
  let mockselectUserRolelist: MemoizedSelector<any, any>;
  let userRolesService: UserRolesService

  beforeEach(() => {
    const translateService = jasmine.createSpyObj('TranslateService', ['get', 'setDefaultLang']);
    TestBed.configureTestingModule({
      declarations: [UserRolesCreateComponent],
      providers: [
        UserRolesService,
        AlertService,
        { provide: TranslateService, useClass: translateServiceMock },
        { provide: UserRolesService, useClass: UserRolesServiceMock },
        SnotifyService,
        { provide: 'SnotifyToastConfig', useValue: ToastDefaults },
        provideMockStore(),
      ],
      imports: [
        NgSelectModule,
        FormsModule,
        ReactiveFormsModule,
        AlertModule,
        TabsModule,
        DatePickerRvModule,
        RouterTestingModule,
        HttpClientTestingModule,
        NgxDatatableModule,
        SharedModule,
        CommonModule,
        ModalModule,
        NzToolTipModule,
        NzDrawerModule,
        StoreModule,
        BrowserAnimationsModule
      ],
    }).compileComponents();
    mockStore = TestBed.inject(MockStore);
    fixture = TestBed.createComponent(UserRolesCreateComponent);
    translate = TestBed.inject(TranslateService);
    component = fixture.componentInstance;
    mockselectViewSettingsList = mockStore.overrideSelector(
      selectViewSettingsList,
      selectViewSettingsListJSON,
    );
    mockselectUserRolelist = mockStore.overrideSelector(
      selectUserRolelist, selectUserRolelistJson
    );
    mockselectUserRolesFunctionList = mockStore.overrideSelector(
      selectUserRolesFunctionList, selectUserRolesFunctionListJson
    );
    mockStore.refreshState();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

});
