import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { InstitutionComponent } from './institution.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AlertModule, TabsModule, DatePickerRvModule } from 'bnt';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { MockStoreModule } from '@app/tests/tests.module';
import { InstitutionService } from '@app/services/institution.service';
import { MessageService } from '@app/services/message.service';
import { AlertService } from '@app/services/alert.service';
import { ImportFileService } from '@app/services/import-file.service';
import { SnotifyService } from 'ng-snotify';
//import { ImportFileModule } from '@app/import-file/import-file.module';
import { IInstitutionState } from '@app/store/state/institution.state';
import { MemoizedSelector, Store, StoreModule } from '@ngrx/store';
import { MockAction } from '@app/store/actions/mock.actions';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { IAppState } from '@app/store/state/app.state';
import { of } from 'rxjs';
import { selectPermissionsData } from '@app/store/selectors/permission.selectors';
import { selectInstitutionResponse } from '@app/store/selectors/institution.selectors';
import { selectInstitution } from '@app/store/selectors/institution.selectors';
import { selectViewSettingsList } from '@app/store/selectors/view-settings.selector';
import {selectFilterData} from '@app/store/selectors/filter.selectors'
import { NzModalService } from 'ng-zorro-antd/modal';
import { OverlayModule } from '@angular/cdk/overlay';
import { SharedModule } from '@app/shared/shared.module';
import { EventEmitter } from '@angular/core';
class translateServiceMock {
  public onLangChange: EventEmitter<any> = new EventEmitter();
  public onTranslationChange: EventEmitter<any> = new EventEmitter();
  public onDefaultLangChange: EventEmitter<any> = new EventEmitter();

  public get(key: any): any {
    return of(key);
  }
}
const selectViewSettingsListJSON = {
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
const selectInstitutionJSON ={
  "status": "success",
  "message": "Find all Merchants",
  "data": {
    "total-record": 5,
    "page-no": 1,
    "merchantList": [
      {
        "id": 5,
        "merchantInstitution": {
          "id": 4,
          "name": "VISA HTTP"
        },
        "code": "687555537877464",
        "name": "DTestChain1",
        "description": "DTestChain1",
        "activateOn": 1646201520000,
        "expiryOn": 1762150320000,
        "totalLocation": 0,
        "totalDevice": 0,
        "locked": "0",
        "posSafetyFlag": "1",
        "reversalTimeout": null,
        "merchantProfile": null,
        "acquirerID": null,
        "merchantDetail": null,
        "currency": null,
        "bankName": null,
        "accountNumber": null,
        "additionalAttribute": null
      },
      {
        "id": 4,
        "merchantInstitution": {
          "id": 4,
          "name": "VISA HTTP"
        },
        "code": "000000000000001",
        "name": "DTestChain",
        "description": "DTestChain",
        "activateOn": 1646201520000,
        "expiryOn": 1762150320000,
        "totalLocation": 0,
        "totalDevice": 0,
        "locked": "0",
        "posSafetyFlag": "1",
        "reversalTimeout": null,
        "merchantProfile": {
          "id": 4,
          "partialAuth": "N",
          "velocity": null,
          "category": "1234",
          "services": "AUTH_SERVICE,CARD_SERVICE,FRAUD_SERVICE,LOYALTY_SERVICE",
          "additionalServices": null
        },
        "acquirerID": null,
        "merchantDetail": {
          "id": 4,
          "address1": "address",
          "address2": null,
          "city": "Noida",
          "zip": "654321",
          "country": {
            "id": 12,
            "countryName": "India"
          },
          "countryState": {
            "id": 67,
            "stateName": "Default"
          },
          "phone": "9876543210",
          "fax": null,
          "email": "testing@gmail.com"
        },
        "currency": null,
        "bankName": null,
        "accountNumber": null,
        "additionalAttribute": null
      },
      {
        "id": 3,
        "merchantInstitution": {
          "id": 3,
          "name": "Infiniti Retail Ltd"
        },
        "code": "0000000010",
        "name": "Croma Retail Company",
        "description": "Croma Retail Company Under infiniti",
        "activateOn": 1551772620000,
        "expiryOn": 1709798220000,
        "totalLocation": 1,
        "totalDevice": 1,
        "locked": "0",
        "posSafetyFlag": "1",
        "reversalTimeout": "8",
        "merchantProfile": {
          "id": 3,
          "partialAuth": "Y",
          "velocity": null,
          "category": "5814",
          "services": "LOYALTY_SERVICE",
          "additionalServices": null
        },
        "acquirerID": null,
        "merchantDetail": {
          "id": 3,
          "address1": "New , Delhi",
          "address2": "CityWalk",
          "city": "Delhi",
          "zip": "0243620",
          "country": {
            "id": 12,
            "countryName": "India"
          },
          "countryState": {
            "id": 67,
            "stateName": "Default"
          },
          "phone": "7890876789",
          "fax": "7890876789",
          "email": "croma@info.com"
        },
        "currency": null,
        "bankName": null,
        "accountNumber": null,
        "additionalAttribute": null
      },
      {
        "id": 2,
        "merchantInstitution": {
          "id": 2,
          "name": "Reliance Industries Limt"
        },
        "code": "00000002",
        "name": "Reliance Digital",
        "description": "Reliance digital under Reliance Industries",
        "activateOn": 1521359280000,
        "expiryOn": 1773906480000,
        "totalLocation": 1,
        "totalDevice": 1,
        "locked": "0",
        "posSafetyFlag": "0",
        "reversalTimeout": null,
        "merchantProfile": {
          "id": 2,
          "partialAuth": "Y",
          "velocity": null,
          "category": "6011",
          "services": "LOYALTY_SERVICE",
          "additionalServices": null
        },
        "acquirerID": null,
        "merchantDetail": {
          "id": 2,
          "address1": "Ghaziabad",
          "address2": "Indirapuram Ghaziabad UP",
          "city": "Ghaziabad",
          "zip": "201012",
          "country": {
            "id": 12,
            "countryName": "India"
          },
          "countryState": {
            "id": 67,
            "stateName": "Default"
          },
          "phone": "1800 889 1044",
          "fax": " 1800 889 1044",
          "email": "digital@info.com"
        },
        "currency": null,
        "bankName": null,
        "accountNumber": null,
        "additionalAttribute": null
      },
      {
        "id": 1,
        "merchantInstitution": {
          "id": 1,
          "name": "Future-Group"
        },
        "code": "000000000000001",
        "name": "GIP Noida",
        "description": "",
        "activateOn": 1613484000000,
        "expiryOn": 1739714400000,
        "totalLocation": 1,
        "totalDevice": 1,
        "locked": "0",
        "posSafetyFlag": "1",
        "reversalTimeout": null,
        "merchantProfile": {
          "id": 1,
          "partialAuth": "Y",
          "velocity": null,
          "category": "5411",
          "services": "AUTH_SERVICE",
          "additionalServices": null
        },
        "acquirerID": null,
        "merchantDetail": {
          "id": 1,
          "address1": "noida",
          "address2": "NOIDA",
          "city": "NOIDA",
          "zip": "201301",
          "country": {
            "id": 1,
            "countryName": "UK"
          },
          "countryState": {
            "id": 57,
            "stateName": "Default"
          },
          "phone": "021452",
          "fax": "012545785",
          "email": "gip@future.com"
        },
        "currency": null,
        "bankName": null,
        "accountNumber": null,
        "additionalAttribute": null
      }
    ],
    "total-filtered-record": 5
  }
};

const selectPermissionsDataJSON = {
  message: null,
  status: 'success',
  data: {
    check: false,
    delete: true,
    id: 'link_notification',
    read: true,
    update: true,
    write: true,
  },
};
const selectFilterDataJSON = {
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

const selectInstitutionResponseJSON = {};

describe('InstitutionComponent', () => {
  let component: InstitutionComponent;
  let fixture: ComponentFixture<InstitutionComponent>;
  let mockStore: MockStore<IAppState>;
  let getSpy: jasmine.Spy;
  let mockselectInstitution: MemoizedSelector<any, any>;
  let mockselectViewSettingsList: MemoizedSelector<any, any>;
  let mockselectPermissionsData: MemoizedSelector<any, any>;
  let mockselectFilterData: MemoizedSelector<any, any>;
  let mockselectInstitutionResponseData: MemoizedSelector<any, any>;
  let translateService: TranslateService;
  const importFileService = jasmine.createSpyObj('ImportFileService', ['clearData']);
  beforeEach(() => {
    const translateService = jasmine.createSpyObj('TranslateService', ['get', 'setDefaultLang']);
    const alertService = jasmine.createSpyObj('AlertService, SnotifyService', ['responseMessage']);
    TestBed.configureTestingModule({
      declarations: [InstitutionComponent],
      providers: [
        SnotifyService,
        { provide: TranslateService, useClass: translateServiceMock },
        { provide: 'SnotifyToastConfig', useValue: {} },
        { provide: ImportFileService, useValue: importFileService },
        { provide: AlertService, useValue: alertService },
        
        provideMockStore(),
      ],
      imports: [
        SharedModule,
        NgSelectModule,
        FormsModule,
        ReactiveFormsModule,
        AlertModule,
        TabsModule,
        TranslateModule.forRoot({}),
        DatePickerRvModule,
        RouterTestingModule,
        HttpClientTestingModule,
        NgxDatatableModule,
        //ImportFileModule,
        StoreModule.forRoot({}),
      ],
    }).compileComponents();
    getSpy = translateService.get.and.returnValue(of(['']));
  });
  // store.dispatch(new MockAction({ Location }));
  beforeEach(()=>{
    // store = TestBed.get(Store);
    mockStore = TestBed.get(MockStore);
    fixture = TestBed.createComponent(InstitutionComponent);
    component = fixture.componentInstance;

    mockselectViewSettingsList = mockStore.overrideSelector(
      selectViewSettingsList,
      selectViewSettingsListJSON,
    );
    mockselectInstitution = mockStore.overrideSelector(selectInstitution, selectInstitutionJSON);
    mockselectPermissionsData = mockStore.overrideSelector(
      selectPermissionsData,
      selectPermissionsDataJSON,
    );
    mockselectInstitutionResponseData = mockStore.overrideSelector(
      selectInstitutionResponse,
      selectInstitutionResponseJSON,
    );
    mockselectFilterData = mockStore.overrideSelector(
      selectFilterData,
      selectFilterDataJSON,
    );
    translateService = TestBed.inject(TranslateService);
    mockStore.refreshState();
    fixture.detectChanges();
  });
  it('should list institution', () => {
    expect(component).toBeTruthy();
  });
    afterEach(() => {
    fixture.destroy();
  });
});
