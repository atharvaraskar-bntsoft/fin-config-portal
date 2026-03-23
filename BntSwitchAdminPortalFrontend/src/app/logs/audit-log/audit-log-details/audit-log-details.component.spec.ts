import { ComponentFixture, fakeAsync, TestBed, tick, waitForAsync } from '@angular/core/testing';

import { AuditLogDetailsComponent } from './audit-log-details.component';
import { AuditLogService } from '@app/services/audit-log.service';
import { SharedModule } from '@app/shared/shared.module';
import { IAppState } from '@app/store/state/app.state';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { CommonModule } from '@angular/common';
import { MissingTranslationHandler, TranslateLoader, TranslateModule, TranslateService } from '@ngx-translate/core';
import { of } from 'rxjs';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { MemoizedSelector, Store, StoreModule } from '@ngrx/store';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { HttpLoaderFactory, MyMissingTranslationHandler } from '@app/shared/shared.module';
import { MockStoreModule } from '@app/tests/tests.module';
import { EventEmitter } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';
import { selectViewSettingsList } from '@app/store/selectors/view-settings.selector';
import { Router } from '@angular/router';

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

let mockRouter = {
  navigate: jasmine.createSpy('navigate'),
  getCurrentNavigation: () => {
    return {
       extras: {
          state:{
            arcadeSelectedGame: '-LAbVp7C0lTu9CV-Mgt-'
          }
        }
      }
    }
}

const JsonFailure = {
  data: null,
   message: null,
   status: "success"
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

xdescribe('AuditLogDetailsComponent', () => {
  let component: AuditLogDetailsComponent;
  let fixture: ComponentFixture<AuditLogDetailsComponent>;
  let mockStore: MockStore<IAppState>;
  let MockselectViewSettingsList;
  let setDefaultLangSpy: jasmine.Spy;
  let auditLogService : AuditLogService
  let translate: TranslateService;
  let router: Router;
  beforeEach(() => {
    const translateService = jasmine.createSpyObj('TranslateService', ['get', 'setDefaultLang']);
    TestBed.configureTestingModule({
      declarations: [AuditLogDetailsComponent],
      providers: [
        { provide: TranslateService, useClass: translateServiceMock },
        AuditLogService,
        { provide: AuditLogService, useValue: auditLogService },
        
        provideMockStore(),
        // other providers
      ],
      imports: [
        CommonModule,
        SharedModule,
        // TabsModule,
        RouterTestingModule,
        NgxDatatableModule,
        StoreModule.forRoot({}),
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
    setDefaultLangSpy = translateService.get.and.returnValue(of([]));
    mockStore = TestBed.get(Store);
    fixture = TestBed.createComponent(AuditLogDetailsComponent);
    router = TestBed.inject(Router);
    component = fixture.componentInstance;
    MockselectViewSettingsList = mockStore.overrideSelector(selectViewSettingsList,selectViewSettingsListJSON);
    mockStore.refreshState();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should  Angular calls ngOnInit', () => {
    component.ngOnInit();
  });

  it('should  Angular calls ngOnInit',async () => {
    component.loadData();
    expect(component.auditdetailsData).not.toBeNull();
  });

  it("should render Table", () => {
    const ngxdatatable: HTMLElement = fixture.nativeElement.querySelector('ngx-datatable');
    const text = ngxdatatable.innerText;
    expect(text).toBeTruthy();
  });

  it('should  Angular calls  _dataTransform', async () => {
    (component as any)._dataTransform();
 })

  afterEach(() => {
    fixture.destroy();
  });

});
