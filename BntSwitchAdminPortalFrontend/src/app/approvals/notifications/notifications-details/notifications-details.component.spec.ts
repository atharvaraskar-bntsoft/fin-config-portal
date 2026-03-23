import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { selectViewSettingsList } from '@app/store/selectors/view-settings.selector';
import { NotificationsDetailsComponent } from './notifications-details.component';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { RouterTestingModule } from '@angular/router/testing';
import { INotificationsState } from '@app/store/state/notifications.state';
import { MemoizedSelector, Store, StoreModule } from '@ngrx/store';
import { MockStoreModule } from '@app/tests/tests.module';
import { MockAction } from '@app/store/actions/mock.actions';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { IAppState } from '@app/store/state/app.state';
import { EventEmitter } from '@angular/core';
import { of } from 'rxjs';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { AlertModule } from 'bnt';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MessageService } from '@app/services/message.service';
import { AlertService } from '@app/services/alert.service';
import { NzModalService } from 'ng-zorro-antd/modal';
import { SnotifyService, ToastDefaults } from 'ng-snotify';
import { CommonModule } from '@angular/common';
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
describe('NotificationsDetailsComponent', () => {
  let component: NotificationsDetailsComponent;
  let fixture: ComponentFixture<NotificationsDetailsComponent>;
  // let store: Store<INotificationsState>;
  let mockStore: MockStore<IAppState>;
  let mockselectViewSettingsList: MemoizedSelector<any, any>;
  let translateService: TranslateService;
  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [NotificationsDetailsComponent],
      imports: [
        NgxDatatableModule,
        RouterTestingModule,
        // MockStoreModule.forRoot('Location', {}),
        RouterTestingModule,
        NgxDatatableModule,
        HttpClientTestingModule,
        AlertModule,
        // StoreModule.forRoot({}),
        BrowserAnimationsModule,
        TranslateModule,
        CommonModule
      ],
      providers: [
        MessageService,
        AlertService,
        NzModalService,
        SnotifyService,
        { provide: 'SnotifyToastConfig', useValue: ToastDefaults },

        { provide: TranslateService, useClass: translateServiceMock },
        provideMockStore(),
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    mockStore = TestBed.get(MockStore);

    fixture = TestBed.createComponent(NotificationsDetailsComponent);
    component = fixture.componentInstance;
    // store.dispatch(new MockAction({ Location }));
    component.rows = { id: 0 };
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
