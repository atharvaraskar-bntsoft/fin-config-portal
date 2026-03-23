import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { LocationInfoComponent } from './location-info.component';
import { ILocationState } from '@app/store/state/location.state';
import { MemoizedSelector, Store, StoreModule } from '@ngrx/store';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AlertModule, TabsModule, DatePickerRvModule } from 'bnt';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { MockStoreModule } from '@app/tests/tests.module';
//import { ImportFileModule } from '@app/import-file/import-file.module';
import { LocationService } from '@app/services/location.service';
import { MessageService } from '@app/services/message.service';
import { AlertService } from '@app/services/alert.service';
import { ImportFileService } from '@app/services/import-file.service';
import { SnotifyService } from 'ng-snotify';
import { MockAction } from '@app/store/actions/mock.actions';
import { TranslateModule } from '@ngx-translate/core';
import { TranslateService } from '@ngx-translate/core';
import { EventEmitter } from '@angular/core';
import { of } from 'rxjs';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { IAppState } from '@app/store/state/app.state';
import {selectLocationDetail} from '@app/store/selectors/location.selector';
import {selectPermissionsData} from '@app/store/selectors/permission.selectors'
import { SharedModule } from '@app/shared/shared.module';
class translateServiceMock {
  public onLangChange: EventEmitter<any> = new EventEmitter();
  public onTranslationChange: EventEmitter<any> = new EventEmitter();
  public onDefaultLangChange: EventEmitter<any> = new EventEmitter();

  public get(key: any): any {
    return of(key);
  }
};
const selectPermissionsDataJSON = {
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
describe('LocationInfoComponent', () => {
  let component: LocationInfoComponent;
  let fixture: ComponentFixture<LocationInfoComponent>;
  let mockStore: MockStore<IAppState>;
  let store: Store<ILocationState>;
  let translateService: TranslateService;
  let mockselectLocationDetail: MemoizedSelector<any, any>;
  let mockselectPermissionsData: MemoizedSelector<any, any>;
  
  const importFileService = jasmine.createSpyObj('ImportFileService', ['clearData']);
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LocationInfoComponent],
      providers: [
        SnotifyService,
        { provide: TranslateService, useClass: translateServiceMock },
        { provide: 'SnotifyToastConfig', useValue: {} },
        { provide: ImportFileService, useValue: importFileService },
        provideMockStore(),
      ],
      imports: [
        SharedModule,
        NgSelectModule,
        FormsModule,
        ReactiveFormsModule,
        AlertModule,
        TabsModule,
        DatePickerRvModule,
        RouterTestingModule,
        HttpClientTestingModule,
        NgxDatatableModule,
        //ImportFileModule,
        TranslateModule.forRoot({}),
        StoreModule.forRoot({}),
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    mockStore = TestBed.get(MockStore);
    fixture = TestBed.createComponent(LocationInfoComponent);
    component = fixture.componentInstance;

   mockselectPermissionsData = mockStore.overrideSelector(
      selectPermissionsData,
      selectPermissionsDataJSON,
    );
    mockselectLocationDetail = mockStore.overrideSelector(
      selectLocationDetail,
      selectLocationDetailJson,
    );
    translateService = TestBed.inject(TranslateService);
    mockStore.refreshState();
    fixture.detectChanges();
  
  });

  it('should list info', () => {
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
 
  it('close fuction should close the Drawer ', () => {
    component.closeView();
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
