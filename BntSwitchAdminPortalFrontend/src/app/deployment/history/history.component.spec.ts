import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HistoryComponent } from './history.component';
import { AuditLogService } from '@app/services/audit-log.service';
import { SharedModule } from '@app/shared/shared.module';
import { IAppState } from '@app/store/state/app.state';
import { selectGetHistory } from '@app/store/selectors/history.selector';
import { selectViewSettingsList } from '@app/store/selectors/view-settings.selector';
import { of } from 'rxjs';
import { MissingTranslationHandler, TranslateLoader, TranslateModule, TranslateService } from '@ngx-translate/core';
import { MockStoreModule } from '@app/tests/tests.module';
import { HttpLoaderFactory, MyMissingTranslationHandler } from '@app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { MemoizedSelector, Store, StoreModule } from '@ngrx/store';
import { AlertService } from '@app/services/alert.service';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { SnotifyService, ToastDefaults } from 'ng-snotify';
import { NzModalService } from 'ng-zorro-antd/modal';
import { AlertModule, DatePickerRvModule } from 'bnt';
// import { ImportFileModule } from '@app/import-file/import-file.module';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CommonModule } from '@angular/common';
import { selectPermissionsData } from '@app/store/selectors/permission.selectors';
import { HistoryService } from '@app/services/history.service';
import { ActivatedRoute, convertToParamMap, Router, RouterModule } from '@angular/router';
import { IPermissionResponse } from '@app/models/permission.interface';
import { EventEmitter } from '@angular/core';

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

const historyJSON = {
  data: {
    'total-record': 1,
    'page-no': 1,
    'total-filtered-record': 1,
    historylist: [
      {
        corePropertyDetailId: null,
        deployedOn: 1657293142000,
        deploymentCluster: {
          status: "Scheduled",
          switchClusterId: {
            active: "1",
            clusterKey: "0001",
            dataCentre: "01",
            id: 1,
            region: "00",
          }
        },
        deploymentComponent: [
          {
            componentId: 74,
            componentJson: null,
            componentType: "Router",
            id: 875,
            name: "JPMCAuthRouter",
            status: null,
            version: 1,
          }
        ],
        deploymentStatus: null,
        errorLog: null,
        id: 748,
        name: "Deployment#744(08-07-2022)",
        scheduledOn: 1657278060000,
        status: "DEPLOYED",
        statusReason: null,
        switchCluster: null,

      },
    ],
  },
};

const permissionJSON: IPermissionResponse = {
  data: [{
    check: false,
    delete: true,
    id: "link_deployment_history",
    read: true,
    update: true,
    write: true
  }],
  status: null,
  message: null
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

const rowData = {
  corePropertyDetailId: null,
  deployedOn: 1657293142000,
  deploymentCluster: {
    status: "Scheduled",
    switchClusterId: {
      active: "1",
      clusterKey: "0001",
      dataCentre: "01",
      id: 1,
      region: "00",
    }
  },
  deploymentComponent: [
    {
      componentId: 74,
      componentJson: null,
      componentType: "Router",
      id: 875,
      name: "JPMCAuthRouter",
      status: null,
      version: 1,
    }
  ],
  deploymentStatus: null,
  errorLog: null,
  id: 748,
  name: "Deployment#744(08-07-2022)",
  scheduledOn: 1657278060000,
  status: "DEPLOYED",
  statusReason: null,
  switchCluster: null,

}


describe('HistoryComponent', () => {
  let component: HistoryComponent;
  let fixture: ComponentFixture<HistoryComponent>;
  let mockStore: MockStore<IAppState>;
  let mockselectGetHistory: MemoizedSelector<any, any>;
  let MockselectViewSettingsList;
  let mockselectPermissionsData;
  let setDefaultLangSpy: jasmine.Spy;
  let auditLogService: AuditLogService
  let historyService: HistoryService


  beforeEach((() => {
    const translateService = jasmine.createSpyObj('TranslateService', ['get', 'setDefaultLang']);
    const RouterSpy = jasmine.createSpyObj(
      'Router',
      ['navigate']
    );
    TestBed.configureTestingModule({
      declarations: [HistoryComponent],
      providers: [
        { provide: TranslateService, useClass: translateServiceMock },
        AlertService,
        SnotifyService,
        HttpClient,
        NzModalService,
        AuditLogService,
        HistoryService,
        { provide: HistoryService, useValue: historyService },
        { provide: 'SnotifyToastConfig', useValue: ToastDefaults },
        { provide: AuditLogService, useValue: auditLogService },
        { provide: Router, useValue: RouterSpy },
        provideMockStore(),
        // other providers
      ],
      imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        AlertModule,
        HttpClientModule,
        SharedModule,
        StoreModule.forRoot({}),
        DatePickerRvModule,
        RouterTestingModule,
        HttpClientTestingModule,
        NgxDatatableModule,
        //ImportFileModule,
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
    fixture = TestBed.createComponent(HistoryComponent);
    component = fixture.componentInstance;
    mockselectGetHistory = mockStore.overrideSelector(selectGetHistory, historyJSON);
    MockselectViewSettingsList = mockStore.overrideSelector(selectViewSettingsList, selectViewSettingsListJSON);
    mockselectPermissionsData = mockStore.overrideSelector(selectPermissionsData, permissionJSON);
    setDefaultLangSpy = translateService.get.and.returnValue(of([]));
    mockStore.refreshState();
    fixture.detectChanges();
  }));


  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should  Angular calls ngOnInit', () => {
    component.ngOnInit();
  });

  it("should render Table", () => {
    const ngxdatatable: HTMLElement = fixture.nativeElement.querySelector('ngx-datatable');
    const text = ngxdatatable.innerText;
    expect(text).toBeTruthy();
  });

  it('getRowData fuction should call click on viewdetails form this HTMl', () => {
    component.getRowData(rowData);
    expect(component._router.navigate).toHaveBeenCalledWith(['/deployment/history', rowData.id]);
  });

  it('should test the table total record ', () => {
    expect(component.totalRecords).toEqual(historyJSON.data['total-record']);
  });

  it('Component should contain Property', () => {
    expect(component.loading).toBe(false);
    expect(component.rows).toBeTruthy();
    expect(component.rowHeight).toBe(45);
    expect(component.headerHeight).toBe(40);
    expect(component.deploymentHistoryId).toBe('link_deployment_history');
    expect(component._page).toBe(1);
    expect(component.currentPagination).toBe('20');
    expect(component._filters).toEqual([]);
  });

  it('should call permissionData for response', () => {
    mockselectPermissionsData = mockStore.overrideSelector(selectPermissionsData, permissionJSON);
    mockStore.refreshState();
    fixture.detectChanges();
    component.permissionData();
    expect(component.permissionObject).not.toBeNull();
  });

  it('should call _transFilters ', () => {
    var result: any = component._transFilters();
    expect(result).toEqual('');
  });

  afterEach(() => {
    fixture.destroy();
  });

});
