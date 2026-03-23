import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { MonitoringItemComponent } from './monitoring-item.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule } from '@angular/forms';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { MemoizedSelector, Store, StoreModule } from '@ngrx/store';
import { MockStoreModule } from '@app/tests/tests.module';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { IAppState } from '@app/store/state/app.state';

import { selectViewSettingsList } from '@app/store/selectors/view-settings.selector';
import { EventEmitter } from '@angular/core';
import { of } from 'rxjs';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { NzModalService } from 'ng-zorro-antd/modal';
import { AlertService } from '@app/services/alert.service';
import {
  AlertModule,
  BoxInfoModule,
  BoxModule,
  ChartJsModule,
  TabsModule,
} from 'bnt';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { SharedModule } from '@app/shared/shared.module';
import { MonitoringService } from '@app/services/monitoring.service';
import { SnotifyService, ToastDefaults } from 'ng-snotify';
import { CountdownModule } from 'ngx-countdown';


//@TODO :: this componet not used in application verify and delete

class translateServiceMock {
  public onLangChange: EventEmitter<any> = new EventEmitter();
  public onTranslationChange: EventEmitter<any> = new EventEmitter();
  public onDefaultLangChange: EventEmitter<any> = new EventEmitter();

  public get(key: any): any {
    return of(key);
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
xdescribe('MonitoringItemComponent', () => {
  let component: MonitoringItemComponent;
  let fixture: ComponentFixture<MonitoringItemComponent>;
  // let store: Store<MonitoringItemComponent>;
  let mockStore: MockStore<IAppState>;
  let mockselectViewSettingsList: MemoizedSelector<any, any>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [MonitoringItemComponent],
      imports: [
        NgSelectModule,
        FormsModule,
        ChartJsModule,
        TabsModule,
        BoxModule,
        // MockStoreModule.forRoot('Location', {}),
        NgxDatatableModule,
        BoxInfoModule,
        CountdownModule,
        AlertModule,
        StoreModule,
        SharedModule,
        StoreModule.forRoot({}),
        BrowserAnimationsModule,
        HttpClientTestingModule,
        TranslateModule,
      ],
      providers: [
        TranslateService,
        NzModalService,
        AlertService,
        MonitoringService,
        SnotifyService,
        { provide: TranslateService, useClass: translateServiceMock },

        { provide: 'SnotifyToastConfig', useValue: ToastDefaults },
        provideMockStore(),
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    mockStore = TestBed.get(MockStore);
    fixture = TestBed.createComponent(MonitoringItemComponent);
    component = fixture.componentInstance;
    mockselectViewSettingsList = mockStore.overrideSelector(
      selectViewSettingsList,
      selectViewSettingsListJSON,
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
