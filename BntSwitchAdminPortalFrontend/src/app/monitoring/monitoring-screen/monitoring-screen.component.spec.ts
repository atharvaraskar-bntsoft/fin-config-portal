import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { MonitoringScreenComponent } from './monitoring-screen.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule } from '@angular/forms';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { ChartJsModule, TabsModule, BoxModule, BoxInfoModule, AlertModule } from 'bnt';
import { CountdownModule } from 'ngx-countdown';
import { IAppState } from '@app/store/state/app.state';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { MemoizedSelector, StoreModule } from '@ngrx/store';
import { SharedModule } from '@app/shared/shared.module';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { selectMonitoringScreen } from '../../store/selectors/monitoring.selector';
import { NzModalService } from 'ng-zorro-antd/modal';
import { AlertService } from '@app/services/alert.service';
import { MonitoringService } from '@app/services/monitoring.service';
import { EventEmitter } from '@angular/core';
import { of } from 'rxjs';
import { selectViewSettingsList } from '@app/store/selectors/view-settings.selector';
import { SnotifyService, ToastDefaults } from 'ng-snotify';
class translateServiceMock {
  public onLangChange: EventEmitter<any> = new EventEmitter();
  public onTranslationChange: EventEmitter<any> = new EventEmitter();
  public onDefaultLangChange: EventEmitter<any> = new EventEmitter();

  public get(key: any): any {
    return of(key);
  }
  
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
const selectMonitoringScreenJSON ={};
describe('MonitoringScreenComponent', () => {
  let component: MonitoringScreenComponent;
  let fixture: ComponentFixture<MonitoringScreenComponent>;
  let mockStore: MockStore<IAppState>;
  let mockselectViewSettingsList: MemoizedSelector<any, any>;
  let mockselectMonitoringScreen : MemoizedSelector<any, any>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [MonitoringScreenComponent],
      imports: [
        NgSelectModule,FormsModule,NgxDatatableModule,ChartJsModule,
        TabsModule,BoxModule,BoxInfoModule,CountdownModule,
        StoreModule,AlertModule,SharedModule,StoreModule.forRoot({}),
        BrowserAnimationsModule,HttpClientTestingModule,TranslateModule,
      ],
      providers : [TranslateService,NzModalService,AlertService,MonitoringService,SnotifyService,
        { provide: TranslateService,  useClass: translateServiceMock },
        { provide: 'SnotifyToastConfig', useValue: ToastDefaults },
        provideMockStore(),
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    mockStore = TestBed.get(MockStore);
    fixture = TestBed.createComponent(MonitoringScreenComponent);
    component = fixture.componentInstance;

    mockselectViewSettingsList = mockStore.overrideSelector(
      selectViewSettingsList,
      selectViewSettingsListJSON,
    );
    mockselectMonitoringScreen =mockStore.overrideSelector(
      selectMonitoringScreen,
      selectMonitoringScreenJSON
    );
    mockStore.refreshState();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  afterEach(() => {
    fixture.destroy();
  });
});
