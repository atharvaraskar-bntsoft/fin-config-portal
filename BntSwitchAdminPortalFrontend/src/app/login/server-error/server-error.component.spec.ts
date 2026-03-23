import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ServerErrorComponent } from './server-error.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule } from '@angular/forms';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { MockStoreModule } from '@app/tests/tests.module';
import { MemoizedSelector, Store } from '@ngrx/store';
import { IAppState } from '@app/store/state/app.state';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { selectViewSettingsList } from '@app/store/selectors/view-settings.selector';
import { TranslateService } from '@ngx-translate/core';
import { EventEmitter } from '@angular/core';
import { of } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
import { KeycloakService } from 'keycloak-angular';

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

const selectViewSettingsListJson = {
  status: 'success',
  message: 'Find all Setting',
  data: {
    pagination: ['20', '25', '30', '40', '50'],
    language: ['en_EN', 'en_EN1', 'fr_FR', 'en_INV'],
    settingDto: {
      id: 1,
      systemUserId:
        'SystemUser [firstName=Bnt, lastName=Admin,  email=bnt.admin@bnt.com, systemUserCategory=, password=9AHRz1ElALzTEdFKIKywyzEZh0IcZ/INhbGkbc0Qb84=, passwordLastUpdatedOn=2020-07-02 13:09:08.0, locked=0, deleted=0, lockedReason=null]',
      search: 'contain',
      language: 'en_EN1',
      pagination: '20',
    },
    searchOption: ['contain', 'contain2'],
  },
};
describe('ServerErrorComponent', () => {
  let component: ServerErrorComponent;
  let fixture: ComponentFixture<ServerErrorComponent>;
  let mockStore: MockStore<IAppState>;
  let store: Store<ServerErrorComponent>;
  let mockselectViewSettingsList: MemoizedSelector<any, any>;
  let cookieService: CookieService;
  let keycloakService: KeycloakService;
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ServerErrorComponent],
      providers: [
        CookieService,
        KeycloakService,
        { provide: TranslateService, useClass: translateServiceMock },
        { provide: CookieService, useClass: cookieService },
        { provide: KeycloakService, useClass: keycloakService },
        provideMockStore(),
      ],
      imports: [
        NgSelectModule,
        FormsModule,
        // MockStoreModule.forRoot('Location', {}),
        NgxDatatableModule,
      ],
    }).compileComponents();
    mockStore = TestBed.get(MockStore);
    fixture = TestBed.createComponent(ServerErrorComponent);
    component = fixture.componentInstance;
    mockselectViewSettingsList = mockStore.overrideSelector(
      selectViewSettingsList,
      selectViewSettingsListJson,
    );
    mockStore.refreshState();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('click fuction should call delete cookie data in html list', () => {
    const delCookie = Object.getPrototypeOf(component);
    const name = {
    };
    delCookie.delete_cookie(name) ;
    expect(delCookie).toBeTruthy;
  });
  // it('fuction should call redirect to pagination ', () => {
  //   component.redirectToLogin();
  //   expect(component).toBeTruthy;
  // });

});
