import { TestBed, ComponentFixture, waitForAsync } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { LayoutModule, LayoutService } from 'bnt';

import { adminLteConf } from './admin-lte.conf';
import { SnotifyModule, SnotifyService, ToastDefaults } from 'ng-snotify';
import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import {selectViewSettingsList} from '@app/store/selectors/view-settings.selector'
import { IAppState } from './store/state/app.state';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { MemoizedSelector } from '@ngrx/store';
import { AlertService } from './services/alert.service';
import { CookieService } from 'ngx-cookie-service';
import { UserIdleService } from 'angular-user-idle';
import { NgxSpinnerService } from 'ngx-spinner';
import { KeycloakService } from 'keycloak-angular';
import { EventEmitter } from '@angular/core';
import { of } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';
import { selectPermissionsData } from './store/selectors/permission.selectors';

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
  
const selectViewSettingsListJSON =
{
  status:"success",
  message:"Find all Setting",
  data:
  {
    "pagination":["20","25","30","40","50"],
    "language":["en_EN","en_EN1","fr_FR","en_INV"],
    "settingDto":{
      "id":1,
      "systemUserId":
      "SystemUser [firstName=Bnt, lastName=Admin,  email=bnt.admin@bnt.com, systemUserCategory=, password=9AHRz1ElALzTEdFKIKywyzEZh0IcZ/INhbGkbc0Qb84=, passwordLastUpdatedOn=2020-07-02 13:09:08.0, locked=0, deleted=0, lockedReason=null]","search":"contain","language":"en_EN1","pagination":"20"},"searchOption":["contain","contain2"]}
    }

const selectPermissionsDataJson =
{
  status:"success",message:null,data:[{"id":"link_notification","read":true,"write":true,"update":true,"delete":true,"check":false},{"id":"link_merchant_reports","read":true,"write":true,"update":true,"delete":true,"check":false},{"id":"link_emv_data","read":true,"write":true,"update":true,"delete":true,"check":false},{"id":"link_dashboard","read":true,"write":true,"update":true,"delete":true,"check":false},{"id":"link_status","read":true,"write":true,"update":true,"delete":true,"check":false},{"id":"link_deployed_router","read":true,"write":true,"update":true,"delete":true,"check":false},{"id":"link_exports","read":true,"write":true,"update":true,"delete":true,"check":false},{"id":"link_merchant","read":true,"write":true,"update":true,"delete":true,"check":true},{"id":"link_rule","read":true,"write":true,"update":true,"delete":true,"check":false},{"id":"link_workflow_rule","read":true,"write":true,"update":true,"delete":true,"check":false},{"id":"link_location","read":true,"write":true,"update":true,"delete":true,"check":true},{"id":"link_deployment_schedule","read":true,"write":true,"update":true,"delete":true,"check":false},{"id":"link_routing_rule","read":true,"write":true,"update":true,"delete":true,"check":false},{"id":"link_view_settings","read":true,"write":true,"update":true,"delete":true,"check":false},{"id":"link_user_roles","read":true,"write":true,"update":true,"delete":true,"check":false},{"id":"link_exception_queue","read":true,"write":true,"update":true,"delete":true,"check":false},{"id":"link_l3_adapters","read":true,"write":true,"update":true,"delete":true,"check":true},{"id":"link_acquirer_id_config","read":true,"write":true,"update":true,"delete":true,"check":false},{"id":"link_deployment_l2json","read":true,"write":true,"update":true,"delete":true,"check":false},{"id":"link_audit_log","read":true,"write":true,"update":true,"delete":true,"check":false},{"id":"link_access_log","read":true,"write":true,"update":true,"delete":true,"check":false},{"id":"link_routing_router","read":true,"write":true,"update":true,"delete":true,"check":false},{"id":"link_device_types","read":true,"write":true,"update":true,"delete":true,"check":false},{"id":"link_mid","read":true,"write":true,"update":true,"delete":true,"check":false},{"id":"link_bin_table","read":true,"write":true,"update":true,"delete":true,"check":false},{"id":"link_lookup_values","read":true,"write":true,"update":true,"delete":true,"check":true},{"id":"link_velocity","read":true,"write":true,"update":true,"delete":true,"check":false},{"id":"link_countries","read":true,"write":true,"update":true,"delete":true,"check":false},{"id":"link_deployment_clusters","read":true,"write":true,"update":true,"delete":true,"check":false},{"id":"link_saf_queue","read":true,"write":true,"update":true,"delete":true,"check":false},{"id":"link_acquirer_mapping","read":true,"write":true,"update":true,"delete":true,"check":false},{"id":"link_country_states","read":true,"write":true,"update":true,"delete":true,"check":false},{"id":"link_device","read":true,"write":true,"update":true,"delete":true,"check":true},{"id":"link_el_function","read":true,"write":true,"update":true,"delete":true,"check":false},{"id":"link_router","read":true,"write":true,"update":true,"delete":true,"check":false},{"id":"link_imf","read":true,"write":true,"update":true,"delete":true,"check":false},{"id":"link_pending_approvals","read":true,"write":true,"update":true,"delete":true,"check":false},{"id":"link_invalid_txn_log","read":true,"write":true,"update":true,"delete":true,"check":false},{"id":"link_currencies","read":true,"write":true,"update":true,"delete":true,"check":false},{"id":"link_institution","read":true,"write":true,"update":true,"delete":true,"check":true},{"id":"link_tag_rule","read":true,"write":true,"update":true,"delete":true,"check":false},{"id":"link_user","read":true,"write":true,"update":true,"delete":true,"check":false},{"id":"link_processor_adapter","read":true,"write":true,"update":true,"delete":true,"check":false},{"id":"link_txn_log","read":true,"write":true,"update":true,"delete":true,"check":false},{"id":"link_l1_adapters","read":true,"write":true,"update":true,"delete":true,"check":true},{"id":"link_deployment_history","read":true,"write":true,"update":true,"delete":true,"check":false},{"id":"link_monitoring","read":false,"write":false,"update":false,"delete":false,"check":false},{"id":"link_extractor","read":true,"write":true,"update":true,"delete":true,"check":false},{"id":"link_deployment_status","read":true,"write":true,"update":true,"delete":true,"check":false},{"id":"link_workflow_router","read":true,"write":true,"update":true,"delete":true,"check":false},{"id":"link_workflow","read":true,"write":true,"update":true,"delete":true,"check":false}]
}
  
  
  xdescribe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let mockStore: MockStore<IAppState>;
  let setDefaultLangSpy: jasmine.Spy;
  let mockselectViewSettingsList;
  let mockselectPermissionsData;

  beforeEach((() => {
    const translateService = jasmine.createSpyObj('TranslateService', ['get', 'setDefaultLang']);
    TestBed.configureTestingModule({
      declarations: [AppComponent],
      providers: [
        { provide: TranslateService, useClass: translateServiceMock },
        AlertService,
        SnotifyService,
        LayoutService,
        CookieService,
        UserIdleService,
        NgxSpinnerService,
        KeycloakService,
        { provide: 'SnotifyToastConfig', useValue: ToastDefaults },       
        provideMockStore(),
        // other providers
      ],
      imports: [
        RouterTestingModule,
        BrowserDynamicTestingModule,
        CoreModule,
        LayoutModule.forRoot(adminLteConf),
        SnotifyModule,
        // SnotifyService,
        // ToastDefaults,
        BrowserDynamicTestingModule,
        HttpClientTestingModule,
      ],
    }).compileComponents();
    mockStore = TestBed.get(MockStore);
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    mockStore.refreshState();
    mockselectPermissionsData = mockStore.overrideSelector(
      selectPermissionsData,
      selectPermissionsDataJson,
    );
    component.permissions = selectPermissionsDataJson.data;
    mockselectViewSettingsList = mockStore.overrideSelector(
      selectViewSettingsList,
      selectViewSettingsListJSON,
    );
    setDefaultLangSpy = translateService.get.and.returnValue(of([]));   
    fixture.detectChanges();
  }));

  it('should create the app', waitForAsync(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));
});
