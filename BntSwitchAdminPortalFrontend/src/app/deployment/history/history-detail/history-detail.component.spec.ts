
import { HistoryDetailComponent } from './history-detail.component';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AuditLogService } from '@app/services/audit-log.service';
import { SharedModule } from '@app/shared/shared.module';
import { IAppState } from '@app/store/state/app.state';
import { selectGetByIdHistory, selectGetHistory } from '@app/store/selectors/history.selector';
import { selectViewSettingsList } from '@app/store/selectors/view-settings.selector';
import { of } from 'rxjs';
import { MissingTranslationHandler, TranslateLoader, TranslateModule, TranslateService } from '@ngx-translate/core';
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
import { HistoryService } from '@app/services/history.service';
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
const detailJson =
{
  status: "success",
  message: null,
  data: {
    "id": 750,
    "name": "Deployment#746(04-08-2022)",
    "deployedOn": null,
    "scheduledOn": 1659616200000,
    "status": "Scheduled",
    "statusReason": null,
    "errorLog": null,
    "switchCluster": null,
    "deploymentCluster": {
      "switchClusterId": {
        "id": 1,
        "clusterKey": "0001",
        "region": "00",
        "dataCentre": "01",
        "active": "1"
      },
      "status": "Scheduled"
    },
    "corePropertyDetailId": null,
    "deploymentComponent": [
      {
        "id": 877,
        "componentType": "L1",
        "name": "L11",
        "version": 9,
        "status": null,
        "componentId": 1045,
        "componentJson": null
      }
    ],
    "deploymentStatus": null
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

describe('HistoryDetailComponent', () => {
  let component: HistoryDetailComponent;
  let fixture: ComponentFixture<HistoryDetailComponent>;
  let mockStore: MockStore<IAppState>;
  let mockselectGetByIdHistory: MemoizedSelector<any, any>;
  let MockselectViewSettingsList;
  let setDefaultLangSpy: jasmine.Spy;
  let auditLogService: AuditLogService
  let historyService: HistoryService

  beforeEach((() => {
    const translateService = jasmine.createSpyObj('TranslateService', ['get', 'setDefaultLang']);
    TestBed.configureTestingModule({
      declarations: [HistoryDetailComponent],
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
        // ImportFileModule,
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
    fixture = TestBed.createComponent(HistoryDetailComponent);
    component = fixture.componentInstance;
    mockselectGetByIdHistory = mockStore.overrideSelector(selectGetByIdHistory, detailJson);
    MockselectViewSettingsList = mockStore.overrideSelector(selectViewSettingsList, selectViewSettingsListJSON);
    setDefaultLangSpy = translateService.get.and.returnValue(of([]));
    mockStore.refreshState();
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // it('should  Angular calls ngOnInit', () => {
  //   component.ngOnInit();
  // });

  // it('getRowData fuction should call click on back link form this HTMl', () => {
  //   component.allDetails();
  //   expect((component as any)._router.navigate).toHaveBeenCalledWith(['/deployment/history']);
  // });

});
