import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { NotificationsComponent } from './notifications.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { INotificationsState } from '@app/store/state/notifications.state';
import { MemoizedSelector, Store, StoreModule } from '@ngrx/store';
import { MockStoreModule } from '@app/tests/tests.module';
import { MockAction } from '@app/store/actions/mock.actions';
import { RouterTestingModule } from '@angular/router/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { IAppState } from '@app/store/state/app.state';
import { CUSTOM_ELEMENTS_SCHEMA, EventEmitter } from '@angular/core';
import { of } from 'rxjs';
import { selectViewSettingsList } from '@app/store/selectors/view-settings.selector';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { AlertModule } from 'bnt';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MessageService } from '@app/services/message.service';
import { AlertService } from '@app/services/alert.service';
import { NzModalService } from 'ng-zorro-antd/modal';
import { SnotifyService } from 'ng-snotify';
import { selectNotificationsList } from '@app/store/selectors/notifications.selector';
import { CommonModule } from '@angular/common';
class translateServiceMock {
  public onLangChange: EventEmitter<any> = new EventEmitter();
  public onTranslationChange: EventEmitter<any> = new EventEmitter();
  public onDefaultLangChange: EventEmitter<any> = new EventEmitter();

  public get(key: any): any {
    return of(key);
  }
}
const selectNotificationsListJSON = {
  'total-record': 0,
  'page-no': 1,
  checkerList: [],
  'total-filtered-record': 0,
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
describe('NotificationsComponent', () => {
  let component: NotificationsComponent;
  let fixture: ComponentFixture<NotificationsComponent>;
  // let store: Store<INotificationsState>;
  let mockStore: MockStore<IAppState>;
  let mockselectViewSettingsList: MemoizedSelector<any, any>;
  let mockselectNotificationsList: MemoizedSelector<any, any>;

  let translateService: TranslateService;
  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [NotificationsComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      imports: [
        NgSelectModule,
        FormsModule,
        NgxDatatableModule,
        RouterTestingModule,
        ReactiveFormsModule,
        // MockStoreModule.forRoot('Location', {}),
        HttpClientTestingModule,
        AlertModule,
        StoreModule.forRoot({}),
        BrowserAnimationsModule,
        TranslateModule,
        CommonModule
      ],
      providers: [
        MessageService,
        AlertService,
        NzModalService,
        SnotifyService,
        { provide: 'SnotifyToastConfig', useValue: {} },

        { provide: TranslateService, useClass: translateServiceMock },
        provideMockStore(),
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    mockStore = TestBed.get(MockStore);

    fixture = TestBed.createComponent(NotificationsComponent);
    component = fixture.componentInstance;
    // store.dispatch(new MockAction({ Location }));

    mockselectViewSettingsList = mockStore.overrideSelector(
      selectViewSettingsList,
      selectViewSettingsListJSON,
    );

    mockselectNotificationsList = mockStore.overrideSelector(
      selectNotificationsList,
      selectNotificationsListJSON,
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
