import { ComponentFixture, fakeAsync, TestBed, tick, waitForAsync } from '@angular/core/testing';
import { IAppState } from '@app/store/state/app.state';
import { MemoizedSelector } from '@ngrx/store';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { TranslateService } from '@ngx-translate/core';
import { selectViewSettingsList } from '@app/store/selectors/view-settings.selector';
import { selectPermissionsData } from '@app/store/selectors/permission.selectors';
import { RouterTestingModule } from '@angular/router/testing';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@app/shared/shared.module';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AlertModule, DatePickerRvModule } from 'bnt';
import { DeploymentScheduleService } from '@app/services/deployment-schedule.service';
import { EventEmitter, inject } from '@angular/core';
import { of } from 'rxjs';
import { CreateDeploymentComponent } from './create-deployment.component';
import { DeploymentStatusRoutingModule } from '@app/deployment/deployment-status/deployment-status-routing.module';
import {
  EditComponentAction,
  FetchClusterListAction,
  FetchCorePropertiesListAction,
  FetchNonScheduleAction,
} from '@app/store/actions/deployment-schedule.action';
import { By } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { ScheduleComponent } from '../schedule.component';

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

const permissionJSON = {
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
  ],
};

const scheduleJson = {
  status: 'success',
  message: 'get record',
  data: {
    clusterList: [
      {
        id: '1',
        name: '0001',
      },
      {
        id: '2',
        name: '0002',
      },
      {
        id: '3',
        name: '0003',
      },
    ],
    corePropertiesList: [
      {
        id: 2,
        corePropertiesName: 'Second rec_1',
      },
      {
        id: 5,
        corePropertiesName: 'core_SDASBD_1',
      },
      {
        id: 7,
        corePropertiesName: 'Test2_1',
      },
      {
        id: 10,
        corePropertiesName: 'Test3_1',
      },
      {
        id: 27,
        corePropertiesName: 'L1_1',
      },
      {
        id: 30,
        corePropertiesName: 'new_1',
      },
    ],
    currentScheduledData: [
      {
        id: 749,
        name: 'Deployment#745(04-08-2022)',
        deployedOn: null,
        scheduledOn: 1659593580000,
        status: 'Scheduled',
        statusReason: null,
        errorLog: null,
        switchCluster: null,
        deploymentCluster: {
          switchClusterId: {
            id: 1,
            clusterKey: null,
            region: '00',
            dataCentre: '01',
            active: '1',
          },
          status: 'Scheduled',
        },
        corePropertyDetailId: null,
        deploymentComponent: [
          {
            id: 876,
            componentType: 'L1',
            name: 'ISO1',
            version: 2,
            status: null,
            componentId: 1024,
            componentJson: null,
          },
        ],
        deploymentStatus: null,
      },
    ],
    newlyDeployedData: [
      {
        id: null,
        componentId: 831,
        componentName: 'Iso_mapper',
        componentType: 'L1',
        componentTypeShowOnUI: null,
        currentVersion: 831,
        lastDeploymentHistory: {
          version: null,
          lastModified: null,
          status: null,
          message: 'Never deployed',
        },
        idVersionListToSchedule: [
          { id: 831, version: 5 },
          { id: 817, version: 4 },
          { id: 815, version: 3 },
          { id: 808, version: 2 },
          { id: 807, version: 1 },
        ],
        lastModifiedOn: 1648710285000,
        lastModifiedBy: 1,
        status: 'Non-scheduled',
        userName: 'Bnt Admin',
        select: false,
      },
    ],
    editResponse: {},
  },
};
const scheduleJson2 = {
  status: 'success',
  message: 'get record',
  editResponse: { status: 'success' },
  newlyDeployedData: [
    {
      id: null,
      componentId: 831,
      componentName: 'Iso_mapper',
      componentType: 'L1',
      componentTypeShowOnUI: null,
      currentVersion: 831,
      lastDeploymentHistory: {
        version: null,
        lastModified: null,
        status: null,
        message: 'Never deployed',
      },
      idVersionListToSchedule: [
        { id: 831, version: 5 },
        { id: 817, version: 4 },
        { id: 815, version: 3 },
        { id: 808, version: 2 },
        { id: 807, version: 1 },
      ],
      lastModifiedOn: 1648710285000,
      lastModifiedBy: 1,
      status: 'Non-scheduled',
      userName: 'Bnt Admin',
      select: false,
    },
  ],
  data: {
    clusterList: [
      {
        id: '1',
        name: '0001',
      },
      {
        id: '2',
        name: '0002',
      },
      {
        id: '3',
        name: '0003',
      },
    ],
    corePropertiesList: [
      {
        id: 2,
        corePropertiesName: 'Second rec_1',
      },
      {
        id: 5,
        corePropertiesName: 'core_SDASBD_1',
      },
      {
        id: 7,
        corePropertiesName: 'Test2_1',
      },
      {
        id: 10,
        corePropertiesName: 'Test3_1',
      },
      {
        id: 27,
        corePropertiesName: 'L1_1',
      },
      {
        id: 30,
        corePropertiesName: 'new_1',
      },
    ],
    currentScheduledData: [
      {
        id: 749,
        name: 'Deployment#745(04-08-2022)',
        deployedOn: null,
        scheduledOn: 1659593580000,
        status: 'Scheduled',
        statusReason: null,
        errorLog: null,
        switchCluster: null,
        deploymentCluster: {
          switchClusterId: {
            id: 1,
            clusterKey: null,
            region: '00',
            dataCentre: '01',
            active: '1',
          },
          status: 'Scheduled',
        },
        corePropertyDetailId: null,
        deploymentComponent: [
          {
            id: 876,
            componentType: 'L1',
            name: 'ISO1',
            version: 2,
            status: null,
            componentId: 1024,
            componentJson: null,
          },
        ],
        deploymentStatus: null,
      },
    ],
  },
};

xdescribe('CreateDeploymentComponent', () => {
  let component: CreateDeploymentComponent;
  let fixture: ComponentFixture<CreateDeploymentComponent>;
  let mockStore: MockStore<IAppState>;
  let translate: TranslateService;
  let mockselectViewSettingsList: MemoizedSelector<any, any>;
  let mockselectPermissionList: MemoizedSelector<any, any>;
  let translateService: TranslateService;
  let mockselectScheduleList;
  let date = Date.now;
  let router: Router;

  beforeEach(() => {
    const routerSpy = jasmine.createSpyObj('Router', ['navigate']);
    const deploymentScheduleService = jasmine.createSpyObj('DeploymentScheduleService', [
      'getselectViewSettingsList',
      'getselectPermissionsData',
      'deploymentScheduleList',
    ]);
    TestBed.configureTestingModule({
      declarations: [CreateDeploymentComponent],
      providers: [
        { provide: TranslateService, useClass: translateServiceMock },
        { provide: DeploymentScheduleService, useValue: deploymentScheduleService },
        //{provide: Router, useValue: routerSpy},
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
        RouterTestingModule.withRoutes([
          { path: 'deployment/deployment-schedule', component: ScheduleComponent },
        ]),
      ],
    }).compileComponents();

    mockStore = TestBed.inject(MockStore);
    fixture = TestBed.createComponent(CreateDeploymentComponent);
    translate = TestBed.inject(TranslateService);
    component = fixture.componentInstance;

    mockselectViewSettingsList = mockStore.overrideSelector(
      selectViewSettingsList,
      selectViewSettingsListJSON,
    );

    mockselectPermissionList = mockStore.overrideSelector(selectPermissionsData, permissionJSON);

    mockselectScheduleList = mockStore.overrideSelector('deploymentScheduleList', scheduleJson);
    translateService = TestBed.inject(TranslateService);
    mockStore.refreshState();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Component should contain Property', () => {
    expect(component.isSpinning).toBe(false);
    expect(component.rowHeight).toBe(45);
    expect(component.headerHeight).toBe(40);
  });

   it('should call function', fakeAsync(() => {
     component.resetForm();
     component.setCurrentDate(true);
     component.setCurrentDate(false);
     component.scheduledOnChange(date);
     expect(component.dateFormat).toBeDefined;
     expect(component.resetForm).toHaveBeenCalled;
     expect(component.setCurrentDate).toHaveBeenCalled;
     expect(component.scheduledOnChange).toHaveBeenCalled;
   }));

  it('should display ngxdatatable works', () => {
    const ngxdatatable: HTMLElement = fixture.nativeElement.querySelector('ngx-datatable');
    const text = ngxdatatable.innerText;
    expect(text).toBeTruthy();
  });

  it('should display history works', () => {
    const matcheckbox: HTMLElement = fixture.nativeElement.querySelector('a');
    const text = matcheckbox.innerText;
    expect(text).toBeTruthy;
  });

  it('should dispatch GetStatus in ngOnInit for Failure response', () => {
    const dispatchSpy = spyOn(mockStore, 'dispatch').and.callThrough();
    mockselectScheduleList = mockStore.overrideSelector('deploymentScheduleList', scheduleJson2);
    mockStore.refreshState();
    fixture.detectChanges();
    component.ngOnInit();
    // component.tableData();
    //const spy = router.navigate as jasmine.Spy;
    //const navArgs = spy.calls.first().args[0];
    expect(dispatchSpy).toHaveBeenCalledWith(new FetchClusterListAction());
    expect(dispatchSpy).toHaveBeenCalledWith(new FetchCorePropertiesListAction());
    expect(dispatchSpy).toHaveBeenCalledWith(new FetchNonScheduleAction());
    expect(component.tableData()).toHaveBeenCalled;
    //expect(navArgs).toEqual(['/deployment', 'deployment-schedule']);
  });

  it('returns simple value', () => {
    const liElements = fixture.debugElement.queryAll(By.css('.newDeploymentColumns'));
    expect(liElements.length).toBe(0);
  });

  afterEach(() => {
    fixture.destroy();
  });
});
