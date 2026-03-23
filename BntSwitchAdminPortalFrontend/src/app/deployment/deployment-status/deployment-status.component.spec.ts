import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AlertService } from '@app/services/alert.service';
import { DeploymentStatusService } from '@app/services/deployment-status.service';
import { SharedModule } from '@app/shared/shared.module';
import { IAppState } from '@app/store/state/app.state';
import { NgSelectModule } from '@ng-select/ng-select';
import { Store } from '@ngrx/store';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { TranslateService } from '@ngx-translate/core';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { SnotifyService, ToastDefaults } from 'ng-snotify';
import { AlertModule, DatePickerRvModule } from 'bnt';
import { of } from 'rxjs';
import { DeploymentStatusRoutingModule } from './deployment-status-routing.module';
import { DeploymentStatusComponent } from './deployment-status.component';

const deploymentStatusJSON = {
  data: {
    'total-record': 1,
    historyMap: {},
    'page-no': 1,
    'total-filtered-record': 1,
    resultList: [
      {
        id: 8,
        componentId: 5,
        componentName: 'L3ISOAdp221221',
        componentType: 'L3',
        componentTypeShowOnUI: null,
        currentVersion: 1,
        lastDeploymentHistory: {
          version: 1,
          lastModified: 1640324307000,
          status: 'DEPLOYED',
          message: 'Version :1 DEPLOYED On:24 Dec 2021 07:38:27 am',
        },
        idVersionListToSchedule: null,
        lastModifiedOn: 1640324307000,
        lastModifiedBy: 1,
        status: 'DEPLOYED',
        userName: 'Bnt Admin',
      },
      {
        id: 8,
        componentId: 5,
        componentName: 'L3ISOAdp221221',
        componentType: 'L3',
        componentTypeShowOnUI: null,
        currentVersion: 1,
        lastDeploymentHistory: {
          version: 1,
          lastModified: 1640324307000,
          status: 'DEPLOYED',
          message: 'Version :1 DEPLOYED On:24 Dec 2021 07:38:27 am',
        },
        idVersionListToSchedule: null,
        lastModifiedOn: 1640324307000,
        lastModifiedBy: 1,
        status: 'DEPLOYED',
        userName: 'Bnt Admin',
      },
    ],
  },
};

const viewsettingJSON = {
  data: {
    pagination: [
    ],
    language: [
    ],
    settingDto: {
      id: 1,
      systemUserId: 'SystemUser [firstName=Bnt, lastName=Admin,  email=bnt.admin@bnt.com, systemUserCategory=, password=9AHRz1ElALzTEdFKIKywyzEZh0IcZ/INhbGkbc0Qb84=, passwordLastUpdatedOn=2020-07-02 13:09:08.0, locked=0, deleted=0, lockedReason=null]',
      search: 'contain',
      language: 'en_EN1',
      pagination: '20'
    },
    searchOption: [
    ]
  }
}

const permissionJSON = {
  data: [
    {
      "id": "link_notification",
      "read": true,
      "write": true,
      "update": true,
      "delete": true,
      "check": false
    },
    {
      "id": "link_merchant_reports",
      "read": true,
      "write": true,
      "update": true,
      "delete": true,
      "check": false
    },
  ]
}

const responseMessage = {
 
      "status": "success",
      "message": "Record Deleted",
      "data": null
  
}

describe('DeploymentStatusComponent', () => {
  let component: DeploymentStatusComponent;
  let fixture: ComponentFixture<DeploymentStatusComponent>;
  let mockStore: MockStore<IAppState>;
  let translate: TranslateService;
  let setDefaultLangSpy: jasmine.Spy;
  let setgetselectGetDeploymentStatusSpy: jasmine.Spy;
  let setgetViewSettingSpy: jasmine.Spy;
  let setgetPermissionSpy: jasmine.Spy;
  let setgetUpdateActionSpy: jasmine.Spy;
  let setgetResponseSpy: jasmine.Spy;

  beforeEach(() => {
    const translateService = jasmine.createSpyObj('TranslateService', ['get', 'setDefaultLang']);
    const alertService = jasmine.createSpyObj('AlertService, SnotifyService', ['responseMessage']);
    const deploymentStatusService = jasmine.createSpyObj('DeploymentStatusService', [
      'getselectGetDeploymentStatus',
      'getselectViewSettingsList',
      'getselectPermissionsData',
      //'updateAction'
    ]);
    TestBed.configureTestingModule({
      declarations: [DeploymentStatusComponent],
      providers: [
        { provide: TranslateService, useValue: translateService },
        AlertService,
        SnotifyService,
        HttpClient,
        { provide: 'SnotifyToastConfig', useValue: ToastDefaults },
        { provide: DeploymentStatusService, useValue: deploymentStatusService },
        provideMockStore(),
      ],
      imports: [
        CommonModule,
        DeploymentStatusRoutingModule,
        SharedModule,
        NgxDatatableModule,
        NgSelectModule,
        ReactiveFormsModule,
        FormsModule,
        AlertModule,
        DatePickerRvModule,
        HttpClientModule,
        BrowserAnimationsModule
      ],
    }).compileComponents();

    setgetselectGetDeploymentStatusSpy =
      deploymentStatusService.getselectGetDeploymentStatus.and.returnValue(
        of(deploymentStatusJSON),
      );

    setgetViewSettingSpy =
      deploymentStatusService.getselectViewSettingsList.and.returnValue(
        of(viewsettingJSON),
      );

    setgetPermissionSpy =
      deploymentStatusService.getselectPermissionsData.and.returnValue(
        of(permissionJSON),
      );

    setDefaultLangSpy = translateService.get.and.returnValue(of([]));

    mockStore = TestBed.get(Store);
    translate = TestBed.get(TranslateService);
    fixture = TestBed.createComponent(DeploymentStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it("should display a works", () => {
    const a: HTMLElement = fixture.nativeElement.querySelector('a');
    const text = a.innerText;
    expect(text).toBeTruthy();
  });

  it("should display span works", () => {
    const ngxdatatable: HTMLElement = fixture.nativeElement.querySelector('ngx-datatable');
    const text = ngxdatatable.innerText;
    expect(text).toBeTruthy();
  });

  it('should test the table ', () => {
    expect(component.rows).toEqual(deploymentStatusJSON.data.resultList);
  });


  it('should test the table total record ', () => {
    expect(component.totalRecords).toEqual(deploymentStatusJSON.data['total-record']);
  });


  it('should test the table resultList ', () => {
    expect(component.statusData.resultList).toEqual(deploymentStatusJSON.data.resultList);
  });

  afterEach(() => {
    fixture.destroy();
  });

});