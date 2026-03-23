import { EventEmitter } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, convertToParamMap, Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { AlertService } from '@app/services/alert.service';
import { SharedModule } from '@app/shared/shared.module';
import { routers, getRouterById, routerServiceType } from '@app/store/selectors/router.selectors';
import { selectViewSettingsList } from '@app/store/selectors/view-settings.selector';
import { IAppState } from '@app/store/state/app.state';
import { MemoizedSelector } from '@ngrx/store';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { SnotifyService, ToastDefaults } from 'ng-snotify';
import { Observable, of } from 'rxjs';

import { CreateRouterComponent } from './create-router.component';

class translateServiceMock {
  public onLangChange: EventEmitter<any> = new EventEmitter();
  public onTranslationChange: EventEmitter<any> = new EventEmitter();
  public onDefaultLangChange: EventEmitter<any> = new EventEmitter();

  public get(key: any): any {
    return of(key);
  }

  public setDefaultLang(key: any): any {}
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

const routingListJson = {
  'total-record': 4,
  'page-no': 1,
  routingList: [
    {
      id: 6,
      name: 'AuthorizationRouter',
      routeDesc: 'AuthorizationRouter',
      routingVersion: [
        {
          id: 71,
          version: 16,
          selectedRuleList: [
            {
              name: 'l3_iso_tcp_client_4jan',
              description: 'l3_iso_tcp_client_4jan',
              version: '6',
              priority: '1',
            },
            {
              name: 'l3json',
              description: 'l3json',
              version: '6',
              priority: '2',
            },
            {
              name: 'HttpUrlEncodedAdpRule',
              description: 'HttpUrlEncodedAdpRule',
              version: '8',
              priority: '3',
            },
          ],
          configuredRoutes: null,
          live: true,
        },
      ],
      'total-filtered-record': 4,
    },
  ],
};

const getById = {
  routeName: 'AuthorizationRouter',
  routeDesc: 'AuthorizationRouter',
  routetypevalue: {
    id: 30,
    name: 'AUTH_SERVICE',
  },
  ruletype: 'route',
  routetype: 'service',
  ruleActive: false,
  ruleList: null,
  ruleListUpdate: [
    {
      id: null,
      name: 'l3_iso_tcp_client_4jan',
      description: 'l3_iso_tcp_client_4jan',
      versionList: [
        {
          value: '11',
          text: '1',
        },
      ],
      liveVersion: '22',
      active: true,
      priority: '1',
    },
    {
      id: null,
      name: 'l3json',
      description: 'l3json',
      versionList: [
        {
          value: '57',
          text: '7',
        },
      ],
      liveVersion: '52',
      active: true,
      priority: '2',
    },
    {
      id: null,
      name: 'HttpUrlEncodedAdpRule',
      description: 'HttpUrlEncodedAdpRule',
      versionList: [
        {
          value: '56',
          text: '8',
        },
      ],
      liveVersion: '56',
      active: true,
      priority: '3',
    },
    {
      id: null,
      name: 'iso_tcp_client',
      description: 'iso',
      versionList: [
        {
          value: '5',
          text: '1',
        },
      ],
      liveVersion: null,
      active: false,
      priority: null,
    },
    {
      id: null,
      name: 'ppro-auth-rule',
      description: 'pproauthrule',
      versionList: [
        {
          value: '60',
          text: '1',
        },
      ],
      liveVersion: null,
      active: false,
      priority: null,
    },
    {
      id: null,
      name: 'dlocal-auth-rule',
      description: 'dlocal-auth-rule',
      versionList: [
        {
          value: '61',
          text: '1',
        },
      ],
      liveVersion: null,
      active: false,
      priority: null,
    },
    {
      id: null,
      name: 'Test1',
      description: 'TEst1',
      versionList: [
        {
          value: '64',
          text: '1',
        },
        {
          value: '65',
          text: '2',
        },
      ],
      liveVersion: null,
      active: false,
      priority: null,
    },
    {
      id: null,
      name: 'aaaa',
      description: 'aaaaa',
      versionList: [
        {
          value: '72',
          text: '1',
        },
      ],
      liveVersion: null,
      active: false,
      priority: null,
    },
  ],
};

const serviceListJson = {
  status: 'success',
  message: null,
  data: {
    ruleList: [
      {
        id: 3,
        name: 'HttpUrlEncodedAdpRule',
        ruleType: 'route',
        description: 'HttpUrlEncodedAdpRule',
        active: '1',
        versionable: false,
        editable: false,
        zeroVersion: false,
        ruleConfiguration: [
          {
            id: 56,
            ruleId: null,
            ruleJson:
              '{"type": "conditional-decision", "condition": {"type": "equal", "value": "Payment_Token", "fieldName": "${payment_method}"}}',
            destination: 'null',
            version: 8,
            verified: 0,
            droolRule: null,
            active: '1',
            json: '{"name": "HttpUrlEncodedAdpRule", "active": true, "commit": true, "ruleType": "route", "condition": "{\\"id\\":\\"0\\",\\"type\\":\\"equal\\",\\"value\\":\\"Payment_Token\\",\\"fieldName\\":\\"${payment_method}\\"}", "conditionUi": {"id": "0", "type": "equal", "value": "Payment_Token", "fieldName": "${payment_method}"}, "description": "HttpUrlEncodedAdpRule", "destinations": [{"id": 21}], "additionalInfo": []}',
          },
        ],
      },
    ],
  },
};

describe('CreateRouterComponent', () => {
  let component: CreateRouterComponent;
  let fixture: ComponentFixture<CreateRouterComponent>;
  let mockStore: MockStore<IAppState>;
  let translate: TranslateService;
  let mockselectViewSettingsList;
  let mockselectRoutingList: MemoizedSelector<any, any>;
  let router: Router;
  let mockselectgetById;
  let mockselectRuleList;

  beforeEach(() => {
    const routerSpy = jasmine.createSpyObj('Router', ['navigate']);
    const routerService = jasmine.createSpyObj('RouterService', [
      'selectViewSettingsList',
      'routers',
      'routerServiceType',
      'getRouterById',
      'routerRuleList',
    ]);
    TestBed.configureTestingModule({
      declarations: [CreateRouterComponent],
      imports: [TranslateModule, FormsModule],
      providers: [
        { provide: TranslateService, useClass: translateServiceMock },
        provideMockStore(),
        RouterTestingModule,
        AlertService,
        SnotifyService,
        { provide: 'SnotifyToastConfig', useValue: ToastDefaults },
        { provide: Router, useValue: routerSpy },
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              paramMap: convertToParamMap({
                id: '1',
              }),
              data: { ruletype: 'workflow' },
            },
          },
        },
      ],
    }).compileComponents();

    mockStore = TestBed.inject(MockStore);
    fixture = TestBed.createComponent(CreateRouterComponent);
    translate = TestBed.inject(TranslateService);
    component = fixture.componentInstance;

    mockselectViewSettingsList = mockStore.overrideSelector(
      selectViewSettingsList,
      selectViewSettingsListJSON,
    );

    mockselectRoutingList = mockStore.overrideSelector(routers, routingListJson);

    mockselectgetById = mockStore.overrideSelector(getRouterById, getById);

    mockStore.refreshState();
    fixture.detectChanges();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateRouterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
