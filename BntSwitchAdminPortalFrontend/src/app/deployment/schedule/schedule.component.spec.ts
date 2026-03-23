import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { IAppState } from '@app/store/state/app.state';
import { MemoizedSelector } from '@ngrx/store';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { TranslateService } from '@ngx-translate/core';
import { selectViewSettingsList } from '@app/store/selectors/view-settings.selector';
import { ScheduleComponent } from './schedule.component';
import { selectPermissionsData } from '@app/store/selectors/permission.selectors';
import { RouterTestingModule } from '@angular/router/testing';
import { CommonModule } from '@angular/common';
import { DeploymentStatusRoutingModule } from '../deployment-status/deployment-status-routing.module';
import { SharedModule } from '@app/shared/shared.module';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AlertModule, DatePickerRvModule } from 'bnt';
import { DeploymentScheduleService } from '@app/services/deployment-schedule.service';
import { EventEmitter } from '@angular/core';
import { of } from 'rxjs';
import { Router } from '@angular/router';
import { FetchNonScheduleAction, FetchScheduledAction } from '@app/store/actions/deployment-schedule.action';

class translateServiceMock {
  public onLangChange: EventEmitter<any> = new EventEmitter();
  public onTranslationChange: EventEmitter<any> = new EventEmitter();
  public onDefaultLangChange: EventEmitter<any> = new EventEmitter();

  public get(key: any): any {
    return of(key);
  }

  public setDefaultLang(key: any): any {

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

const permissionJSON = {
  data: [
    {
      id: "link_notification",
      read: true,
      write: true,
      update: true,
      delete: true,
      check: false
    },
    {
      id: "link_merchant_reports",
      read: true,
      write: true,
      update: true,
      delete: true,
      check: false
    },
    {
      id: "link_deployment_schedule",
      read: true,
      write: true,
      update: true,
      delete: true,
      check: false
    },
  ]
}

const scheduleJson = {
  status: 'success',
  message: 'get record',
  editResponse: { status: 'success' },
  data: {
      clusterList: [],
      corePropertiesList: [],
      currentScheduledData: [
          {
              id: 746,
              name: "Deployment#742(08-07-2022)",
              deployedOn: null,
              scheduledOn: 1657276680000,
              status: "Scheduled",
              statusReason: null,
              errorLog: null,
              switchCluster: null,
              deploymentCluster: {
                  switchClusterId: {
                      id: 1,
                      clusterKey: null,
                      region: "00",
                      dataCentre: "01",
                      active: "1"
                  },
                  status: "Scheduled"
              },
              corePropertyDetailId: null,
              deploymentComponent: [
                  {
                      id: 873,
                      componentType: "EX",
                      name: "5july_test",
                      version: 2,
                      status: null,
                      componentId: 9,
                      componentJson: null
                  }
              ],
              deploymentStatus: null
          },
      ],
      newlyDeployedData: [
          {
              id: null,
              componentId: null,
              componentName: "ISO1",
              componentType: "L1",
              componentTypeShowOnUI: null,
              lastDeploymentHistory: {
                  version: 1,
                  lastModified: 1657197441000,
                  status: "DEPLOYED",
                  message: "Version :1 DEPLOYED On:07 Jul 2022 02:37:21 pm"
              },
              idVersionListToSchedule: [
                  {
                      id: 1024,
                      version: 2
                  }
              ],
              lastModifiedOn: 1657794940000,
              lastModifiedBy: 1,
              status: "Non-scheduled",
              userName: "Bnt Admin"
          },
      ],
  }
}
 

describe('ScheduleComponent', () => {
  let component: ScheduleComponent;
  let fixture: ComponentFixture<ScheduleComponent>;
  let mockStore: MockStore<IAppState>;
  let translate: TranslateService;
  let mockselectViewSettingsList: MemoizedSelector<any, any>;
  let mockselectPermissionList: MemoizedSelector<any, any>;
  let  mockselectScheduleList;
  let translateService: TranslateService;
  let router: Router;
 
  beforeEach(() => {
    const routerSpy = jasmine.createSpyObj('Router', ['navigate']);
    const deploymentScheduleService = jasmine.createSpyObj('DeploymentScheduleService', [
      'getselectViewSettingsList',
      'getselectPermissionsData',
      'deploymentScheduleList'
    ]);
    TestBed.configureTestingModule({
      declarations: [ScheduleComponent],
      providers: [{ provide: TranslateService, useClass: translateServiceMock }, 
        { provide: DeploymentScheduleService, useValue: deploymentScheduleService }, 
        {provide: Router, useValue: routerSpy}, provideMockStore()],
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
        RouterTestingModule
      ],
    }).compileComponents();

    mockStore = TestBed.inject(MockStore);
    fixture = TestBed.createComponent(ScheduleComponent);
    translate = TestBed.inject(TranslateService);
    component = fixture.componentInstance;

    mockselectViewSettingsList = mockStore.overrideSelector(
      selectViewSettingsList,
      selectViewSettingsListJSON,
    )


    mockselectPermissionList = mockStore.overrideSelector(
      selectPermissionsData,
      permissionJSON
    )
    mockselectScheduleList = mockStore.overrideSelector(
      'deploymentScheduleList',
      scheduleJson
    )

    translateService = TestBed.inject(TranslateService);
    router = TestBed.inject(Router)
    mockStore.refreshState();
    fixture.detectChanges();
  });
 

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should test the table ', fakeAsync(() => {
    tick(100)
    expect(component.currentLang).toContain(selectViewSettingsListJSON.data.settingDto.language);
  }));

  it('should test the table ', fakeAsync(() => {
    expect(component.headerHeight).toEqual(40);
    expect(component.rowHeight).toEqual(50)
  }));

    it('should navigate to route createDeployment',() => {
      component.createDeployment();
      component.columnData();
      expect(component.createDeployment).toHaveBeenCalled;
      expect(component.columnData()).toHaveBeenCalled;
      const spy = router.navigate as jasmine.Spy;
      const navArgs = spy.calls.first().args[0];
      expect(navArgs).toEqual(['/deployment', 'create-schedule-deployment']);
    });

    it('should call updateTimeStamp', () => {
      expect(fixture.componentInstance.history).toBeDefined();
      expect(fixture.componentInstance.actions).toBeDefined();
      expect(fixture.componentInstance.version).toBeDefined();
      expect(fixture.componentInstance.type).toBeDefined();
    });

    it("should display ngxdatatable works", () => {
      const ngxdatatable: HTMLElement = fixture.nativeElement.querySelector('ngx-datatable');
      const text = ngxdatatable.innerText;
      expect(text).toBeTruthy();
    });

   /* it('should dispatch GetStatus in ngOnInit for Failure response', () => {
    const dispatchSpy = spyOn(mockStore, 'dispatch').and.callThrough();
    mockselectScheduleList = mockStore.overrideSelector('deploymentScheduleList', scheduleJson);
    mockStore.refreshState();
    fixture.detectChanges();
    component.ngOnInit();
    component.tableData();
    expect(dispatchSpy).toHaveBeenCalledWith(new FetchScheduledAction());
    expect(dispatchSpy).toHaveBeenCalledWith(new FetchNonScheduleAction());
  });*/

  afterEach(() => {
    fixture.destroy();
  });
});
