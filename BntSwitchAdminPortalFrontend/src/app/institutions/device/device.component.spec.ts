import { ComponentFixture, fakeAsync, TestBed, tick, waitForAsync } from '@angular/core/testing';

import { DeviceComponent } from './device.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AlertModule, TabsModule, DatePickerRvModule } from 'bnt';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { MockStoreModule } from '@app/tests/tests.module';
import { IDeviceState } from '@app/store/state/device.state';
import { MemoizedSelector, Store, StoreModule } from '@ngrx/store';
// import { ImportFileModule } from '@app/import-file/import-file.module';
import { DeviceService } from '@app/services/device.service';
import { MessageService } from '@app/services/message.service';
import { AlertService } from '@app/services/alert.service';
import { ImportFileService } from '@app/services/import-file.service';
import { SnotifyService } from 'ng-snotify';
import { MockAction } from '@app/store/actions/mock.actions';
import { EventEmitter } from '@angular/core';
import { SharedModule } from '@app/shared/shared.module';
import { Observable, of } from 'rxjs';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { IAppState } from '@app/store/state/app.state';
import {selectFilterData} from '@app/store/selectors/filter.selectors';
import {selectPermissionsData} from '@app/store/selectors/permission.selectors';
import {selectViewSettingsList} from '@app/store/selectors/view-settings.selector'
import {selectDevice} from '@app/store/selectors/device.selectors'
import {selectDeviceResponseSuccess} from '@app/store/selectors/device.selectors'
import {selectLocationDetail} from '@app/store/selectors/location.selector'
import { Router } from '@angular/router';
class translateServiceMock {
  public onLangChange: EventEmitter<any> = new EventEmitter();
  public onTranslationChange: EventEmitter<any> = new EventEmitter();
  public onDefaultLangChange: EventEmitter<any> = new EventEmitter();

  public get(key: any): any {
    return of(key);
  }
}
const selectViewSettingsListJson = {
  status: "success",
  message: "Find all Setting",
  data: {
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
const selectFilterDataJson = {
  status: null,
  message: null,
  data: {
    "merchant": [
      {
        "id": "1",
        "name": "GIP Noida"
      },
      {
        "id": "2",
        "name": "Reliance Digital"
      },
      {
        "id": "3",
        "name": "Croma Retail Company"
      },
      {
        "id": "4",
        "name": "DTestChain"
      },
      {
        "id": "5",
        "name": "DTestChain1"
      }
    ],
    "location": [
      {
        "id": "1",
        "name": "GIP Noida"
      },
      {
        "id": "2",
        "name": "Indirapuram, Ghaziabad"
      },
      {
        "id": "3",
        "name": "New Delhi"
      }
    ],
    "merchantGroup": [
      {
        "id": "1",
        "name": "Future-Group"
      },
      {
        "id": "2",
        "name": "Reliance Industries Limt"
      },
      {
        "id": "3",
        "name": "Infiniti Retail Ltd"
      },
      {
        "id": "4",
        "name": "VISA HTTP"
      }
    ],
    "status": [
      {
        "id": "1",
        "name": "Active"
      },
      {
        "id": "2",
        "name": "Inactive"
      }
    ],
    _page:1
  }
};
const selectPermissionsDataJson={
  status: "success",
  message: null,
  data: [
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
const selectDeviceJson ={
  status: "success",
  message: "Find all Devices",
  data: {
    "total-record": 3,
    "page-no": 1,
    devicesList: [
      {
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
      },
      {
        "id": 2,
        "location": {
          "id": 2,
          "name": "Indirapuram, Ghaziabad"
        },
        "merchant": {
          "id": 2,
          "name": "Reliance Digital"
        },
        "merchantInstitution": null,
        "code": "0000002",
        "type": {
          "id": 1,
          "code": "POS-TERMINAL",
          "locked": "0"
        },
        "reversalTimeout": null,
        "posSafetyFlag": "0",
        "pedSerialNo": null,
        "name": null,
        "activateOn": 1489824120000,
        "locked": "0",
        "hostCapture": false,
        "pedId": "3",
        "deviceModelId": null,
        "additionalAttribute": null
      },
      {
        "id": 1,
        "location": {
          "id": 1,
          "name": "GIP Noida"
        },
        "merchant": {
          "id": 1,
          "name": "GIP Noida"
        },
        "merchantInstitution": null,
        "code": "00000001",
        "type": {
          "id": 1,
          "code": "POS-TERMINAL",
          "locked": "0"
        },
        "reversalTimeout": null,
        "posSafetyFlag": "1",
        "pedSerialNo": null,
        "name": null,
        "activateOn": 1613484000000,
        "locked": "0",
        "hostCapture": false,
        "pedId": null,
        "deviceModelId": null,
        "additionalAttribute": null
      }
    ],
    "total-filtered-record": 3
  }
};
const selectDeviceResponseSuccessJson= [null];
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
const getFilterInstitutionJson= {id: "1",name: "GIP Noida"};
const selectLocationDetailJson = {
  status: "success",
  message: "Find Location",
  data: {
    "id": 3,
    "totalDevice": 1,
    "code": "000000080",
    "name": "New Delhi",
    "merchant": {
      "id": 3,
      "name": "Croma Retail Company"
    },
    "merchantInstitution": null,
    "description": "In select citywalk",
    "activateOn": 1520586000000,
    "expiryOn": 1710493200000,
    "storeId": null,
    "posSafetyFlag": "1",
    "reversalTimeout": "7",
    "locked": "0",
    "locationDetail": {
      "id": 3,
      "email": "croma_newdelhi@info.com",
      "phone": "9880989876",
      "fax": "9880989876",
      "address1": "New Delhi",
      "address2": "citywalk",
      "city": "Delhi",
      "country": {
        "id": 12,
        "countryName": "India"
      },
      "countryState": {
        "id": 67,
        "stateName": "Default"
      },
      "zip": "0243620"
    },
    "coordinates": {
      "lat": null,
      "lng": null
    },
    "additionalAttribute": null
  }
};
// selectFilterDataJson
const eventData: HTMLSelectElement = { id: "1", name: "GIP Noida"} as HTMLSelectElement;
describe('DeviceComponent', () => {
  let router: Router;
  let component: DeviceComponent;
  let fixture: ComponentFixture<DeviceComponent>;
  let mockStore: MockStore<IAppState>;
  let translateService: TranslateService;
  let mockselectViewSettingsList: MemoizedSelector<any, any>;
  let mockselectPermissionsData: MemoizedSelector<any, any>;
  let mockselectFilterData: MemoizedSelector<any, any>;
  let mockselectDeviceData: MemoizedSelector<any,any>
  let mockselectDeviceResponseSuccessData : MemoizedSelector<any,any>
  let mockselectLocationDetailData : MemoizedSelector<any,any>
  let loadJosnSpy: jasmine.Spy;
  const jsonApiService = jasmine.createSpyObj('JsonApiService', ['loadJosn']);
  // let routerSpy = { navigate: jasmine.createSpy('navigate') };
  const importFileService = jasmine.createSpyObj('ImportFileService', ['clearData']);
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DeviceComponent],
      providers: [
        DeviceService,
        MessageService,
        AlertService,
        ImportFileService,
        SnotifyService,
        
        { provide: TranslateService, useClass: translateServiceMock },
        { provide: 'SnotifyToastConfig', useValue: {} },
        { provide: ImportFileService, useValue: importFileService },
        // { provide: Router, useValue: routerSpy },
        provideMockStore(),
      ],
      imports: [
        SharedModule,
        NgSelectModule,
        FormsModule,
        ReactiveFormsModule,
        AlertModule,
        DatePickerRvModule,
        RouterTestingModule,
        TranslateModule.forRoot({}),
        HttpClientTestingModule,
        NgxDatatableModule,
        //ImportFileModule,
        StoreModule.forRoot({}),
      ],

    }).compileComponents();
  });

  beforeEach(() => {
    mockStore = TestBed.get(MockStore);
    router = TestBed.get(Router);
    fixture = TestBed.createComponent(DeviceComponent);
    component = fixture.componentInstance;
    // store.dispatch(new MockAction({ Location }));
    mockselectViewSettingsList = mockStore.overrideSelector(
      selectViewSettingsList,
      selectViewSettingsListJson,
    );
    mockselectPermissionsData = mockStore.overrideSelector(
      selectPermissionsData,
      selectPermissionsDataJson,
    );
    mockselectFilterData = mockStore.overrideSelector(
      selectFilterData,
      selectFilterDataJson);
    
      mockselectDeviceData = mockStore.overrideSelector(
        selectDevice,
        selectDeviceJson);
      mockselectDeviceResponseSuccessData = mockStore.overrideSelector(
        selectDeviceResponseSuccess,
        selectDeviceResponseSuccessJson);

        mockselectLocationDetailData = mockStore.overrideSelector(
          selectLocationDetail,
          selectLocationDetailJson)
  

    translateService = TestBed.inject(TranslateService);
    mockStore.refreshState();
    fixture.detectChanges();
  
  });

  it('should list device', () => {
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
  it('viewDetails fuction should make the isvisibleView true ', () => {
    component.viewDetails(selectDeviceJson.data);
    expect(component.isvisibleView).toEqual(true);
  });
  it('close fuction should close the Drawer ', () => {
    component.close(selectDeviceJson.data);
    expect(component.isvisibleView).toEqual(false);
  });
  it('create fuction should create the view screen', () => {
    component.create(selectDeviceJson.data);
    expect(component.isvisibleView).toEqual(false)
  });
  it('openPopUp fuction should open the PopUp', () => {
    component.openPopUp();
    expect(component.visiblePopUp).toEqual(true);
  });
  it('cancelPopUp fuction should open the cancelPopUp', () => {
    component.cancelPopUp();
    expect(component.visiblePopUpAnimate).toEqual(false);
  });
  it('resetSearch fuction searchResetButton open the Modal', () => {
    component.resetSearch();
    expect(component.searchResetButton).toEqual(true);
  });
  it('openModal fuction should open the Modal', () => {
    component.resetFilterSearch();
    expect(component.place).toEqual('');
  });
  it('importButton fuction should called the OpenPopUp', () => {
    spyOn(component,'openPopUp').and.callThrough();
    component.openPopUp();
    expect(component.request).toBe(false);
    component.importButton();
    expect(component.openPopUp).toHaveBeenCalled();
  });
  it('getFilterStatusData fuction should call loadPage', () => {
    const deviceComponentObj = Object.getPrototypeOf(component);
    spyOn(deviceComponentObj,'loadPage').and.callThrough();
    component.getFilterStatusData(selectFilterDataJson.data);
    expect(deviceComponentObj.loadPage).toHaveBeenCalled();
  });
  it('getFilterNameData fuction should call loadPage', () => {
    component.getFilterNameData(selectFilterDataJson.data);
    expect(component.searchResetButton).toEqual(true)
    const deviceComponentObj = Object.getPrototypeOf(component);
    spyOn(deviceComponentObj,'loadPage').and.callThrough();
    component.getFilterStatusData(selectFilterDataJson.data);
    expect(deviceComponentObj.loadPage).toHaveBeenCalled();
  });
  it("should render Table", () => {
    const ngxdatatable: HTMLElement = fixture.nativeElement.querySelector('ngx-datatable');
    const text = ngxdatatable.innerText;
    expect(text).toBeTruthy();
  });
  
  afterEach(() => {
    fixture.destroy();
  });
});
