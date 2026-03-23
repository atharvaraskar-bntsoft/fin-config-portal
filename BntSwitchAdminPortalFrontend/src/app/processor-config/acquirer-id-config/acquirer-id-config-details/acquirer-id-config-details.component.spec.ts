import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IAppState } from '@app/store/state/app.state';
import { MemoizedSelector, StoreModule } from '@ngrx/store';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { convertToParamMap, Data, Params, RouterModule, Routes } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { AcquirerIdConfigDetailsComponent } from './acquirer-id-config-details.component';
import { EventEmitter } from '@angular/core';
import { Observable, of } from 'rxjs';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule } from '@angular/forms';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import {
  AlertModule,
  BoxInfoModule,
  BoxModule,
  ChartJsModule,
  TabsModule,
} from 'bnt';
import { CountdownModule } from 'ngx-countdown';
import { SharedModule } from '@app/shared/shared.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { NzModalService } from 'ng-zorro-antd/modal';
import { AlertService } from '@app/services/alert.service';
import { MonitoringService } from '@app/services/monitoring.service';
import { SnotifyService, ToastDefaults } from 'ng-snotify';

import { selectPermissionsData } from '@app/store/selectors/permission.selectors';
import { selectAcquirerIdConfigDetails } from '@app/store/selectors/acquirer-id-config.selector';
import { selectViewSettingsList } from '@app/store/selectors/view-settings.selector';
import { ActivatedRoute, Router } from '@angular/router';

class translateServiceMock {
  public onLangChange: EventEmitter<any> = new EventEmitter();
  public onTranslationChange: EventEmitter<any> = new EventEmitter();
  public onDefaultLangChange: EventEmitter<any> = new EventEmitter();

  public get(key: any): any {
    return of(key);
  }
  public setDefaultLang(key: any): any {}
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
const selectAcquirerIdConfigDetailsJSON = {
  id: 9,
  code: '00004321',
  description: 'VISA Acquirer',
  active: true,
  deleted: '0',
  adviceMatch: '0',
  name: 'VISA Acquirer',
  onusValidate: '1',
  refundOffline: '1',
  country: {
    id: 12,
    code: 'IND',
    countryName: 'India',
    currency: {
      id: 22,
      code: 'INR',
      isoCode: '356',
      currencyName: 'Indian Rupee',
      active: true,
      currencyMinorUnit: '2',
      deleted: '0',
    },
    isoCode: '356',
    shortCode: 'IN',
    isdCode: '91',
    active: true,
    deleted: null,
  },
  pos_sms: null,
  pos_dms: null,
  txntype_sms: null,
  txntype_dms: null,
  accounttype_sms: null,
  accounttype_dms: null,
};
const selectPermissionsDataJSON = {
  data: [
    {
      id: 'link_notification',
      read: true,
      write: true,
      update: true,
      delete: true,
      check: false,
    },
  ],
  message: null,
  status: 'success',
};
describe('AcquirerIdConfigDetailsComponent', () => {
  let component: AcquirerIdConfigDetailsComponent;
  let fixture: ComponentFixture<AcquirerIdConfigDetailsComponent>;
  let mockStore: MockStore<IAppState>;
  let mockselectViewSettingsList: MemoizedSelector<any, any>;
  let mockselectAcquirerIdConfigDetails: MemoizedSelector<any, any>;
  let mockselectPermissionsData: MemoizedSelector<any, any>;
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AcquirerIdConfigDetailsComponent],
      imports: [
        NgSelectModule,
        FormsModule,
        NgxDatatableModule,
        RouterModule,
        RouterTestingModule,
        StoreModule,
        AlertModule,
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
  });

  beforeEach(() => {
    mockStore = TestBed.get(MockStore);
    fixture = TestBed.createComponent(AcquirerIdConfigDetailsComponent);
    component = fixture.componentInstance;

    mockselectViewSettingsList = mockStore.overrideSelector(
      selectViewSettingsList,
      selectViewSettingsListJSON,
    );
    mockselectAcquirerIdConfigDetails = mockStore.overrideSelector(
      selectAcquirerIdConfigDetails,
      selectAcquirerIdConfigDetailsJSON,
    );

    mockselectPermissionsData = mockStore.overrideSelector(
      selectPermissionsData,
      selectPermissionsDataJSON,
    );
    mockStore.refreshState();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
