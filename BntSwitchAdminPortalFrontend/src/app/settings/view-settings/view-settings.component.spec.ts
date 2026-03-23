import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ViewSettingsComponent } from './view-settings.component';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { StoreModule, Store, MemoizedSelector } from '@ngrx/store';
import { IViewSettingsState } from '@app/store/state/viewsettings.state';
import { MockStoreModule } from '@app/tests/tests.module';
import { MockAction } from '@app/store/actions/mock.actions';
import { RouterTestingModule } from '@angular/router/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { CookieService } from 'ngx-cookie-service';
import { ToastDefaults } from 'ng-snotify';
import { AlertService } from '@app/services/alert.service';
import { IAppState } from '@app/store/state/app.state';
import { NzModalService } from 'ng-zorro-antd/modal';
import { selectViewSettingsList } from '@app/store/selectors/view-settings.selector';
import { AlertModule, DatePickerRvModule, TabsModule } from 'bnt';
// import { ImportFileModule } from '@app/import-file/import-file.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { EventEmitter } from '@angular/core';
import { of } from 'rxjs';
import { CommonModule } from '@angular/common';

class translateServiceMock {
  public onLangChange: EventEmitter<any> = new EventEmitter();
  public onTranslationChange: EventEmitter<any> = new EventEmitter();
  public onDefaultLangChange: EventEmitter<any> = new EventEmitter();

  public get(key: any): any {
    return of(key);
  }
  public setDefaultLang(key: string): any {}
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

describe('ViewSettingsComponent', () => {
  let component: ViewSettingsComponent;
  let fixture: ComponentFixture<ViewSettingsComponent>;
  // let store: Store<IViewSettingsState>;
  let mockStore: MockStore<IAppState>;
  let mockselectViewSettingsList: MemoizedSelector<any, any>;

  beforeEach(waitForAsync(() => {
    const translateService = jasmine.createSpyObj('TranslateService', ['get', 'setDefaultLang']);
    TestBed.configureTestingModule({
      declarations: [ViewSettingsComponent],
      providers: [
        TranslateService,
        CookieService,
        AlertService,
        NzModalService,
        { provide: TranslateService, useValue: translateService },
        { provide: 'SnotifyToastConfig', useValue: ToastDefaults },
        { provide: TranslateService, useClass: translateServiceMock },
        provideMockStore(),
      ],
      imports: [
        StoreModule,
        NgSelectModule,
        FormsModule,
        AlertModule,
        StoreModule.forRoot({}),
        NgxDatatableModule,
        ReactiveFormsModule,
        // ImportFileModule,
        // MockStoreModule.forRoot('Location', {}),
        RouterTestingModule,
        BrowserAnimationsModule,
        TabsModule,
        DatePickerRvModule,
        HttpClientTestingModule,
        TranslateModule,
        CommonModule
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    mockStore = TestBed.get(MockStore);
    fixture = TestBed.createComponent(ViewSettingsComponent);
    component = fixture.componentInstance;
    // store.dispatch(new MockAction({ Location }));

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
