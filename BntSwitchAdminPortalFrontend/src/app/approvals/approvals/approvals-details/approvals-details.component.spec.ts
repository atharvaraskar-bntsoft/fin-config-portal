import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ApprovalsDetailsComponent } from './approvals-details.component';
import { MemoizedSelector, Store, StoreModule } from '@ngrx/store';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { MockStoreModule } from '@app/tests/tests.module';
import { AlertService } from '@app/services/alert.service';
import { MessageService } from '@app/services/message.service';
import { IApprovalsState } from '@app/store/state/approvals.state';
import { SnotifyService, ToastDefaults } from 'ng-snotify';
import { MockAction } from '@app/store/actions/mock.actions';
import { Router, RouterModule, Route, ExtraOptions } from '@angular/router';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { IAppState } from '@app/store/state/app.state';
import { AlertModule } from 'bnt';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { EventEmitter } from '@angular/core';
import { selectViewSettingsList } from '@app/store/selectors/view-settings.selector';
import { of } from 'rxjs';
import { selectApprovalsSuccess } from '../../../store/selectors/approvals.selector';
import { NzModalService } from 'ng-zorro-antd/modal';
import { SharedModule } from '@app/shared/shared.module';
import { HttpClient } from '@angular/common/http';
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
const selectApprovalsSuccessJSON = null;

describe('ApprovalsDetailsComponent', () => {
  let component: ApprovalsDetailsComponent;
  let fixture: ComponentFixture<ApprovalsDetailsComponent>;
  // let store: Store<IApprovalsState>;
  let mockStore: MockStore<IAppState>;
  let mockselectViewSettingsList: MemoizedSelector<any, any>;
  let mockselectApprovalsSuccess: MemoizedSelector<any, any>;
  let translateService: TranslateService;
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ApprovalsDetailsComponent],
      imports: [
        SharedModule,
        NgSelectModule,
        FormsModule,
        ReactiveFormsModule,
        RouterTestingModule,
        HttpClientTestingModule,
        NgxDatatableModule,
        // MockStoreModule.forRoot('Location', {}),
        AlertModule,
        TranslateModule.forRoot({}),
        StoreModule.forRoot({}),
        BrowserAnimationsModule,
        TranslateModule,
        CommonModule
      ],
      providers: [
        MessageService,
        AlertService,
        HttpClient,
        SnotifyService,
        NzModalService,
        { provide: 'SnotifyToastConfig', useValue: ToastDefaults },
        { provide: TranslateService, useClass: translateServiceMock },
        provideMockStore(),
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    mockStore = TestBed.get(MockStore);
    fixture = TestBed.createComponent(ApprovalsDetailsComponent);
    component = fixture.componentInstance;
    // store.dispatch(new MockAction({ Location }));
    component.rows = { id: 0 };
    mockselectViewSettingsList = mockStore.overrideSelector(
      selectViewSettingsList,
      selectViewSettingsListJSON,
    );

    mockselectApprovalsSuccess = mockStore.overrideSelector(
      selectApprovalsSuccess,
      selectApprovalsSuccessJSON,
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
