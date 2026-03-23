import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { DeviceInfoComponent } from './device-info.component';
import { MemoizedSelector, Store, StoreModule } from '@ngrx/store';
import { ILocationState } from '@app/store/state/location.state';
import { MockStoreModule } from '@app/tests/tests.module';
import { RouterTestingModule } from '@angular/router/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { IAppState } from '@app/store/state/app.state';
import { of } from 'rxjs';
import { EventEmitter } from '@angular/core';
import { SharedModule } from '@app/shared/shared.module';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import {selectViewSettingsList} from '@app/store/selectors/view-settings.selector'
import {selectDeviceDetail} from '@app/store/selectors/device.selectors'
import {selectPermissionsData} from '@app/store/selectors/permission.selectors'
import { SnotifyService } from 'ng-snotify';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AlertModule, DatePickerRvModule, TabsModule } from 'bnt';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
//import { ImportFileModule } from '@app/import-file/import-file.module';
class translateServiceMock {
  public onLangChange: EventEmitter<any> = new EventEmitter();
  public onTranslationChange: EventEmitter<any> = new EventEmitter();
  public onDefaultLangChange: EventEmitter<any> = new EventEmitter();

  public get(key: any): any {
    return of(key);
  }
}
const selectDeviceDetailJson={
  status: "success",
  message: "Find Device",
  data: {
    "id": 3,
    "location": {
      "id": 3,
      "name": "New Delhi"
    },
    "merchant": {
      "id": 3,
      "name": "Croma Retail Company"
    },
    "merchantInstitution": null,
    "code": "00000090",
    "type": {
      "id": 1,
      "code": "POS-TERMINAL",
      "locked": "0"
    },
    "reversalTimeout": "8",
    "posSafetyFlag": "1",
    "pedSerialNo": null,
    "name": null,
    "activateOn": 1520413200000,
    "locked": "0",
    "hostCapture": false,
    "pedId": "6",
    "deviceModelId": null,
    "additionalAttribute": null
  }
};
const selectViewSettingsListJson = {
  "status": "success",
  "message": "Find all Setting",
  "data": {
    "pagination": [
      "20",
      "25",
      "30",
      "40",
      "50"
    ],
    "language": [
      "en_EN",
      "en_EN1",
      "fr_FR",
      "en_INV"
    ],
    "settingDto": {
      "id": 1,
      "systemUserId": "SystemUser [firstName=Bnt, lastName=Admin,  email=bnt.admin@bnt.com, systemUserCategory=, password=9AHRz1ElALzTEdFKIKywyzEZh0IcZ/INhbGkbc0Qb84=, passwordLastUpdatedOn=2020-07-02 13:09:08.0, locked=0, deleted=0, lockedReason=null]",
      "search": "contain",
      "language": "en_EN1",
      "pagination": "20"
    },
    "searchOption": [
      "contain",
      "contain2"
    ]
  }
};
const selectPermissionsDataJson={
  "status": "success",
  "message": null,
  "data": [
    {
      "id": "link_notification",
      "read": true,
      "write": true,
      "update": true,
      "delete": true,
      "check": false
    },
    {
      "id": "link_merchant_reports",
      "read": true,
      "write": true,
      "update": true,
      "delete": true,
      "check": false
    },
    {
      "id": "link_emv_data",
      "read": true,
      "write": true,
      "update": true,
      "delete": true,
      "check": false
    },
    {
      "id": "link_dashboard",
      "read": true,
      "write": true,
      "update": true,
      "delete": true,
      "check": false
    },
    {
      "id": "link_status",
      "read": true,
      "write": true,
      "update": true,
      "delete": true,
      "check": false
    },
    {
      "id": "link_deployed_router",
      "read": true,
      "write": true,
      "update": true,
      "delete": true,
      "check": false
    },
    {
      "id": "link_exports",
      "read": true,
      "write": true,
      "update": true,
      "delete": true,
      "check": false
    },
    {
      "id": "link_merchant",
      "read": true,
      "write": true,
      "update": true,
      "delete": true,
      "check": true
    },
    {
      "id": "link_rule",
      "read": true,
      "write": true,
      "update": true,
      "delete": true,
      "check": false
    },
    {
      "id": "link_workflow_rule",
      "read": true,
      "write": true,
      "update": true,
      "delete": true,
      "check": false
    },
    {
      "id": "link_location",
      "read": true,
      "write": true,
      "update": true,
      "delete": true,
      "check": true
    },
    {
      "id": "link_deployment_schedule",
      "read": true,
      "write": true,
      "update": true,
      "delete": true,
      "check": false
    },
    {
      "id": "link_routing_rule",
      "read": true,
      "write": true,
      "update": true,
      "delete": true,
      "check": false
    },
    {
      "id": "link_view_settings",
      "read": true,
      "write": true,
      "update": true,
      "delete": true,
      "check": false
    },
    {
      "id": "link_user_roles",
      "read": true,
      "write": true,
      "update": true,
      "delete": true,
      "check": false
    },
    {
      "id": "link_exception_queue",
      "read": true,
      "write": true,
      "update": true,
      "delete": true,
      "check": false
    },
    {
      "id": "link_l3_adapters",
      "read": true,
      "write": true,
      "update": true,
      "delete": true,
      "check": true
    },
    {
      "id": "link_acquirer_id_config",
      "read": true,
      "write": true,
      "update": true,
      "delete": true,
      "check": false
    },
    {
      "id": "link_deployment_l2json",
      "read": true,
      "write": true,
      "update": true,
      "delete": true,
      "check": false
    },
    {
      "id": "link_audit_log",
      "read": true,
      "write": true,
      "update": true,
      "delete": true,
      "check": false
    },
    {
      "id": "link_access_log",
      "read": true,
      "write": true,
      "update": true,
      "delete": true,
      "check": false
    },
    {
      "id": "link_routing_router",
      "read": true,
      "write": true,
      "update": true,
      "delete": true,
      "check": false
    },
    {
      "id": "link_device_types",
      "read": true,
      "write": true,
      "update": true,
      "delete": true,
      "check": false
    },
    {
      "id": "link_mid",
      "read": true,
      "write": true,
      "update": true,
      "delete": true,
      "check": false
    },
    {
      "id": "link_bin_table",
      "read": true,
      "write": true,
      "update": true,
      "delete": true,
      "check": false
    },
    {
      "id": "link_lookup_values",
      "read": true,
      "write": true,
      "update": true,
      "delete": true,
      "check": true
    },
    {
      "id": "link_velocity",
      "read": true,
      "write": true,
      "update": true,
      "delete": true,
      "check": false
    },
    {
      "id": "link_countries",
      "read": true,
      "write": true,
      "update": true,
      "delete": true,
      "check": false
    },
    {
      "id": "link_deployment_clusters",
      "read": true,
      "write": true,
      "update": true,
      "delete": true,
      "check": false
    },
    {
      "id": "link_saf_queue",
      "read": true,
      "write": true,
      "update": true,
      "delete": true,
      "check": false
    },
    {
      "id": "link_acquirer_mapping",
      "read": true,
      "write": true,
      "update": true,
      "delete": true,
      "check": false
    },
    {
      "id": "link_country_states",
      "read": true,
      "write": true,
      "update": true,
      "delete": true,
      "check": false
    },
    {
      "id": "link_device",
      "read": true,
      "write": true,
      "update": true,
      "delete": true,
      "check": true
    },
    {
      "id": "link_el_function",
      "read": true,
      "write": true,
      "update": true,
      "delete": true,
      "check": false
    },
    {
      "id": "link_router",
      "read": true,
      "write": true,
      "update": true,
      "delete": true,
      "check": false
    },
    {
      "id": "link_imf",
      "read": true,
      "write": true,
      "update": true,
      "delete": true,
      "check": false
    },
    {
      "id": "link_pending_approvals",
      "read": true,
      "write": true,
      "update": true,
      "delete": true,
      "check": false
    },
    {
      "id": "link_invalid_txn_log",
      "read": true,
      "write": true,
      "update": true,
      "delete": true,
      "check": false
    },
    {
      "id": "link_currencies",
      "read": true,
      "write": true,
      "update": true,
      "delete": true,
      "check": false
    },
    {
      "id": "link_institution",
      "read": true,
      "write": true,
      "update": true,
      "delete": true,
      "check": true
    },
    {
      "id": "link_tag_rule",
      "read": true,
      "write": true,
      "update": true,
      "delete": true,
      "check": false
    },
    {
      "id": "link_user",
      "read": true,
      "write": true,
      "update": true,
      "delete": true,
      "check": false
    },
    {
      "id": "link_processor_adapter",
      "read": true,
      "write": true,
      "update": true,
      "delete": true,
      "check": false
    },
    {
      "id": "link_txn_log",
      "read": true,
      "write": true,
      "update": true,
      "delete": true,
      "check": false
    },
    {
      "id": "link_l1_adapters",
      "read": true,
      "write": true,
      "update": true,
      "delete": true,
      "check": true
    },
    {
      "id": "link_deployment_history",
      "read": true,
      "write": true,
      "update": true,
      "delete": true,
      "check": false
    },
    {
      "id": "link_monitoring",
      "read": false,
      "write": false,
      "update": false,
      "delete": false,
      "check": false
    },
    {
      "id": "link_extractor",
      "read": true,
      "write": true,
      "update": true,
      "delete": true,
      "check": false
    },
    {
      "id": "link_deployment_status",
      "read": true,
      "write": true,
      "update": true,
      "delete": true,
      "check": false
    },
    {
      "id": "link_workflow_router",
      "read": true,
      "write": true,
      "update": true,
      "delete": true,
      "check": false
    },
    {
      "id": "link_workflow",
      "read": true,
      "write": true,
      "update": true,
      "delete": true,
      "check": false
    }
  ]
};
const row = {
  type: "L2",
  name: "XUZ",
  subType: "Core",
  DeviceDetails: [
      {
          id: 29,
          version: 0
      }
  ],
  version: 0,
  versionId: 29
}
describe('InstitutionInfoComponent', () => {
  let component: DeviceInfoComponent;
  let fixture: ComponentFixture<DeviceInfoComponent>;
  let mockStore: MockStore<IAppState>;
  let mockselectDeviceDetail: MemoizedSelector<any, any>;
  let mockselectViewSettingsList: MemoizedSelector<any, any>;
  let mockselectPermissionsData: MemoizedSelector<any, any>;
  let translateService: TranslateService;
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DeviceInfoComponent],
      providers: [
        SnotifyService,
        { provide: TranslateService, useClass: translateServiceMock },
        { provide: 'SnotifyToastConfig', useValue: {} },
        provideMockStore(),
      ],
      imports: [
       RouterTestingModule,
       SharedModule,
       NgSelectModule,
       FormsModule,
       ReactiveFormsModule,
       AlertModule,
       TabsModule,
       TranslateModule.forRoot({}),
       DatePickerRvModule,
       HttpClientTestingModule,
       NgxDatatableModule,
       //ImportFileModule,
       StoreModule.forRoot({}),
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    mockStore = TestBed.get(MockStore);
    fixture = TestBed.createComponent(DeviceInfoComponent);
    component = fixture.componentInstance;
    mockselectDeviceDetail = mockStore.overrideSelector(
      selectDeviceDetail,
      selectDeviceDetailJson,
    );
    mockselectViewSettingsList = mockStore.overrideSelector(
      selectViewSettingsList,
      selectViewSettingsListJson,
    );
    mockselectPermissionsData = mockStore.overrideSelector(
      selectPermissionsData,
      selectPermissionsDataJson,
    );

    
    translateService = TestBed.inject(TranslateService);
    mockStore.refreshState();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('openModal fuction should open the Modal', () => {
    component.open();
    expect(component.visible).toEqual(true);
  });
  it('cancel fuction should cancel the Modal', () => {
    component.cancel();
    expect(component.visible).toEqual(false);
  });
  // it('viewDetails fuction should make the isvisibleView true ', () => {
  //   component.viewDetails(selectDeviceJson.data);
  //   expect(component.isvisibleView).toEqual(true);
  // });
  it('close fuction should close the Drawer ', () => {
    component.close();
    expect(component.isvisibleView).toEqual(false);
  });
  it('openModal fuction should open the PopUp', () => {
    component.openModal(row);
    expect(component.isAttributesVisible).toEqual(true);
  });
  it('closeModal fuction should open the Modal', () => {
    component.closeModal();
    expect(component.isAttributesVisible).toEqual(false);
  });
  afterEach(() => {
    fixture.destroy();
  });
});
