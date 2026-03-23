import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { HeaderInnerComponent } from './header-inner.component';

import { DropdownModule } from 'bnt';
import { TimeAgoPipe } from 'time-ago-pipe';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CommonModule } from '@angular/common';
import { selectPermissionsData } from '@app/store/selectors/permission.selectors';
import { EventEmitter } from '@angular/core';
import { SharedModule } from '@app/shared/shared.module';
import { IAppState } from '@app/store/state/app.state';
import { selectViewSettingsList } from '@app/store/selectors/view-settings.selector';
import { of } from 'rxjs';
import {
  MissingTranslationHandler,
  TranslateLoader,
  TranslateModule,
  TranslateService,
} from '@ngx-translate/core';
import { MockStoreModule } from '@app/tests/tests.module';
import { HttpLoaderFactory, MyMissingTranslationHandler } from '@app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { MemoizedSelector, Store, StoreModule } from '@ngrx/store';
import { selectProfileList } from '@app/store/selectors/profile.selector';
import { selectNotificationsList } from '@app/store/selectors/notifications.selector';
import { ProfileService } from '@app/services/profile.service';
import { KeycloakService } from 'keycloak-angular';
import { MessageService } from '@app/services/message.service';
import { CookieService } from 'ngx-cookie-service';
import { UtcDatePipe } from '@app/shared/pipes/utc-date.pipe';
import { Pipe, PipeTransform } from '@angular/core';
import { LocalDatePipe } from '@app/shared/pipes/local-date.pipe';

@Pipe({ name: 'utc' })
class MockUtcPipe implements PipeTransform {
  transform(value: number): number {
    // blah blah
    return value;
  }
}
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

const permissionJSON = {
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
    {
      id: 'link_merchant_reports',
      read: true,
      write: true,
      update: true,
      delete: true,
      check: false,
    },
    {
      id: 'link_emv_data',
      read: true,
      write: true,
      update: true,
      delete: true,
      check: false,
    },
    {
      id: 'link_dashboard',
      read: true,
      write: true,
      update: true,
      delete: true,
      check: false,
    },
    {
      id: 'link_status',
      read: true,
      write: true,
      update: true,
      delete: true,
      check: false,
    },
    {
      id: 'link_deployed_router',
      read: true,
      write: true,
      update: true,
      delete: true,
      check: false,
    },
    {
      id: 'link_exports',
      read: true,
      write: true,
      update: true,
      delete: true,
      check: false,
    },
    {
      id: 'link_merchant',
      read: true,
      write: true,
      update: true,
      delete: true,
      check: true,
    },
    {
      id: 'link_rule',
      read: true,
      write: true,
      update: true,
      delete: true,
      check: false,
    },
    {
      id: 'link_workflow_rule',
      read: true,
      write: true,
      update: true,
      delete: true,
      check: false,
    },
    {
      id: 'link_location',
      read: true,
      write: true,
      update: true,
      delete: true,
      check: true,
    },
    {
      id: 'link_deployment_schedule',
      read: true,
      write: true,
      update: true,
      delete: true,
      check: false,
    },
    {
      id: 'link_routing_rule',
      read: true,
      write: true,
      update: true,
      delete: true,
      check: false,
    },
    {
      id: 'link_view_settings',
      read: true,
      write: true,
      update: true,
      delete: true,
      check: false,
    },
    {
      id: 'link_user_roles',
      read: true,
      write: true,
      update: true,
      delete: true,
      check: false,
    },
    {
      id: 'link_exception_queue',
      read: true,
      write: true,
      update: true,
      delete: true,
      check: false,
    },
    {
      id: 'link_l3_adapters',
      read: true,
      write: true,
      update: true,
      delete: true,
      check: true,
    },
    {
      id: 'link_acquirer_id_config',
      read: true,
      write: true,
      update: true,
      delete: true,
      check: false,
    },
    {
      id: 'link_deployment_l2json',
      read: true,
      write: true,
      update: true,
      delete: true,
      check: false,
    },
    {
      id: 'link_audit_log',
      read: true,
      write: true,
      update: true,
      delete: true,
      check: false,
    },
    {
      id: 'link_access_log',
      read: true,
      write: true,
      update: true,
      delete: true,
      check: false,
    },
    {
      id: 'link_routing_router',
      read: true,
      write: true,
      update: true,
      delete: true,
      check: false,
    },
    {
      id: 'link_device_types',
      read: true,
      write: true,
      update: true,
      delete: true,
      check: false,
    },
    {
      id: 'link_mid',
      read: true,
      write: true,
      update: true,
      delete: true,
      check: false,
    },
    {
      id: 'link_bin_table',
      read: true,
      write: true,
      update: true,
      delete: true,
      check: false,
    },
    {
      id: 'link_lookup_values',
      read: true,
      write: true,
      update: true,
      delete: true,
      check: true,
    },
    {
      id: 'link_velocity',
      read: true,
      write: true,
      update: true,
      delete: true,
      check: false,
    },
    {
      id: 'link_countries',
      read: true,
      write: true,
      update: true,
      delete: true,
      check: false,
    },
    {
      id: 'link_deployment_clusters',
      read: true,
      write: true,
      update: true,
      delete: true,
      check: false,
    },
    {
      id: 'link_saf_queue',
      read: true,
      write: true,
      update: true,
      delete: true,
      check: false,
    },
    {
      id: 'link_acquirer_mapping',
      read: true,
      write: true,
      update: true,
      delete: true,
      check: false,
    },
    {
      id: 'link_country_states',
      read: true,
      write: true,
      update: true,
      delete: true,
      check: false,
    },
    {
      id: 'link_device',
      read: true,
      write: true,
      update: true,
      delete: true,
      check: true,
    },
    {
      id: 'link_el_function',
      read: true,
      write: true,
      update: true,
      delete: true,
      check: false,
    },
    {
      id: 'link_router',
      read: true,
      write: true,
      update: true,
      delete: true,
      check: false,
    },
    {
      id: 'link_imf',
      read: true,
      write: true,
      update: true,
      delete: true,
      check: false,
    },
    {
      id: 'link_pending_approvals',
      read: true,
      write: true,
      update: true,
      delete: true,
      check: false,
    },
    {
      id: 'link_invalid_txn_log',
      read: true,
      write: true,
      update: true,
      delete: true,
      check: false,
    },
    {
      id: 'link_currencies',
      read: true,
      write: true,
      update: true,
      delete: true,
      check: false,
    },
    {
      id: 'link_institution',
      read: true,
      write: true,
      update: true,
      delete: true,
      check: true,
    },
    {
      id: 'link_tag_rule',
      read: true,
      write: true,
      update: true,
      delete: true,
      check: false,
    },
    {
      id: 'link_user',
      read: true,
      write: true,
      update: true,
      delete: true,
      check: false,
    },
    {
      id: 'link_processor_adapter',
      read: true,
      write: true,
      update: true,
      delete: true,
      check: false,
    },
    {
      id: 'link_txn_log',
      read: true,
      write: true,
      update: true,
      delete: true,
      check: false,
    },
    {
      id: 'link_l1_adapters',
      read: true,
      write: true,
      update: true,
      delete: true,
      check: true,
    },
    {
      id: 'link_deployment_history',
      read: true,
      write: true,
      update: true,
      delete: true,
      check: false,
    },
    {
      id: 'link_monitoring',
      read: false,
      write: false,
      update: false,
      delete: false,
      check: false,
    },
    {
      id: 'link_extractor',
      read: true,
      write: true,
      update: true,
      delete: true,
      check: false,
    },
    {
      id: 'link_deployment_status',
      read: true,
      write: true,
      update: true,
      delete: true,
      check: false,
    },
    {
      id: 'link_workflow_router',
      read: true,
      write: true,
      update: true,
      delete: true,
      check: false,
    },
    {
      id: 'link_workflow',
      read: true,
      write: true,
      update: true,
      delete: true,
      check: false,
    },
  ],
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
const profileListJson = {
  status: 'success',
  message: 'Find all user',
  data: {
    id: 72,
    firstName: 'arti',
    lastName: 'Agarwal',
    loginName: null,
    userId: 'arti.agarwal@bnt.com',
    email: 'arti.agarwal@bnt.com',
    locked: false,
    active: false,
    roleId: null,
  },
};
const selectNotificationsListJson = {
  status: 'success',
  message: null,
  data: {
    'total-record': 0,
    'page-no': 1,
    checkerList: [],
    'total-filtered-record': 0,
  },
};

describe('HeaderInnerComponent', () => {
  let component: HeaderInnerComponent;
  let fixture: ComponentFixture<HeaderInnerComponent>;
  let store: Store<HeaderInnerComponent>;
  let mockStore: MockStore<IAppState>;
  let mockselectProfileList: MemoizedSelector<any, any>;
  let mockselectNotificationsList;
  let MockselectViewSettingsList;
  let mockselectPermissionsData;
  let setDefaultLangSpy: jasmine.Spy;
  let profileService: ProfileService;
  let keycloakService: KeycloakService;
  let messageService: MessageService;
  let cookieService: CookieService;
  let utcDatePipe;

  beforeEach(() => {
    const translateService = jasmine.createSpyObj('TranslateService', ['get', 'setDefaultLang']);
    const RouterSpy = jasmine.createSpyObj('Router', ['navigate']);
    TestBed.configureTestingModule({
      declarations: [HeaderInnerComponent, TimeAgoPipe, MockUtcPipe, UtcDatePipe, LocalDatePipe],
      providers: [
        { provide: TranslateService, useClass: translateServiceMock },
        HttpClient,
        ProfileService,
        { provide: UtcDatePipe, useClass: MockUtcPipe },
        { provide: LocalDatePipe, useClass: MockUtcPipe },
        { provide: KeycloakService, useClass: keycloakService },
        { provide: CookieService, useClass: cookieService },
        { provide: MessageService, useClass: messageService },
        { provide: ProfileService, useValue: profileService },
        
        provideMockStore(),
        // other providers
      ],
      imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        SharedModule,
        StoreModule.forRoot({}),
        DropdownModule,
        RouterTestingModule,
        HttpClientTestingModule,
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
    fixture = TestBed.createComponent(HeaderInnerComponent);
    component = fixture.componentInstance;
    mockStore.refreshState();
    mockselectProfileList = mockStore.overrideSelector(selectProfileList, profileListJson);
    mockselectNotificationsList = mockStore.overrideSelector(
      selectNotificationsList,
      selectNotificationsListJson,
    );
    MockselectViewSettingsList = mockStore.overrideSelector(
      selectViewSettingsList,
      selectViewSettingsListJSON,
    );
    mockselectPermissionsData = mockStore.overrideSelector(selectPermissionsData, permissionJSON);
    setDefaultLangSpy = translateService.get.and.returnValue(of([]));
    component.now = new Date();   
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should  Angular calls ngOnInit', () => {
    component.ngOnInit();
  });

  it('toogleText fuction should call form HTMl', () => {
    component.toogleText();
    expect(component.toogleText).toBeDefined;
    expect(component.toogleText).toHaveBeenCalled;
  });

  it('projectMode fuction should call form HTMl', () => {
    component.projectMode();
    expect(component.projectMode).toBeDefined;
    expect(component.projectMode).toHaveBeenCalled;
  });

  afterEach(() => {
    fixture.destroy();
  });

});
