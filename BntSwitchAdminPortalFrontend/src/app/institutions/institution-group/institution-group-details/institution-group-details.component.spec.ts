import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
// import { ImportFileModule } from '@app/import-file/import-file.module';
import { ImportFileService } from '@app/services/import-file.service';
import {SharedModule } from '@app/shared/shared.module';
import {selectViewSettingsList} from '@app/store/selectors/view-settings.selector'
import { IAppState } from '@app/store/state/app.state';
import { NgSelectModule } from '@ng-select/ng-select';
import { MemoizedSelector, StoreModule } from '@ngrx/store';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { SnotifyService } from 'ng-snotify';
import { AlertModule, DatePickerRvModule, TabsModule } from 'bnt';
import {selectInstitutionGroupDetails} from '@app/store/selectors/institution-group.selector'
import { InstitutionGroupDetailsComponent } from './institution-group-details.component';
import {selectPermissionsData} from '@app/store/selectors/permission.selectors'
import { EventEmitter } from '@angular/core';
import { of } from 'rxjs';
class translateServiceMock {
    public onLangChange: EventEmitter<any> = new EventEmitter();
    public onTranslationChange: EventEmitter<any> = new EventEmitter();
    public onDefaultLangChange: EventEmitter<any> = new EventEmitter();
  
    public get(key: any): any {
      return of(key);
    }
  }

const selectInstitutionGroupDetailsJson ={
  status: "success",
  message: "Find Merchant Group",
  data: {
    "id": 4,
    "institution": {
      "id": 1,
      "name": "Institution_1"
    },
    "acquirer": {
      "id": 9,
      "code": "00004321",
      "description": "VISA Acquirer",
      "active": true,
      "deleted": "0",
      "adviceMatch": "0",
      "name": "VISA Acquirer",
      "onusValidate": "1",
      "refundOffline": "1",
      "country": {
        "id": 12,
        "code": "IND",
        "countryName": "India",
        "currency": {
          "id": 22,
          "code": "INR",
          "isoCode": "356",
          "currencyName": "Indian Rupee",
          "active": true,
          "currencyMinorUnit": "2",
          "deleted": "0"
        },
        "isoCode": "356",
        "shortCode": "IN",
        "isdCode": "91",
        "active": true,
        "deleted": null
      },
      "pos_sms": null,
      "pos_dms": null,
      "txntype_sms": null,
      "txntype_dms": null,
      "accounttype_sms": null,
      "accounttype_dms": null
    },
    "code": "00000000101",
    "name": "VISA HTTP",
    "description": "VISA Http",
    "activateOn": 1646114940000,
    "expiryOn": 1722406140000,
    "totalMerchant": 2,
    "totalLocation": null,
    "totalDevice": null,
    "merchantInstitutionDetail": {
      "id": 4,
      "address1": "Test Addreee Near Sector 126",
      "address2": "",
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
      "fax": "",
      "email": "test@gmail.com"
    },
    "locked": "0"
  }
};
  const selectViewSettingsListJson= {
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
  const selectPermissionsDataJson = {
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
  }
describe('InstitutionGroupDetailsComponent', () => {
  let component: InstitutionGroupDetailsComponent;
  let fixture: ComponentFixture<InstitutionGroupDetailsComponent>;
  let mockStore: MockStore<IAppState>;
  let mockselectInstitutionGroupDetails: MemoizedSelector<any, any>;
  let mockselectViewSettingsList: MemoizedSelector<any, any>;
  let mockselectPermissionsData: MemoizedSelector<any, any>;
  let translateService: TranslateService;
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ InstitutionGroupDetailsComponent ],
      providers: [
        SnotifyService,
        { provide: TranslateService, useClass: translateServiceMock },
        { provide: 'SnotifyToastConfig', useValue: {} },
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
        // ImportFileModule,
        StoreModule.forRoot({}),
      ],
    })
    .compileComponents();
  });

  beforeEach(() => {
    mockStore = TestBed.get(MockStore);
    fixture = TestBed.createComponent(InstitutionGroupDetailsComponent);
    component = fixture.componentInstance;

    mockselectViewSettingsList = mockStore.overrideSelector(
        selectViewSettingsList,
        selectViewSettingsListJson,
      );
      mockselectInstitutionGroupDetails = mockStore.overrideSelector(
        selectInstitutionGroupDetails,
        selectInstitutionGroupDetailsJson,
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
 
  it('viewDetails fuction should make the isivible true ', () => {
    component.close();
    expect(component.isvisibleView).toEqual(false);
  });
  afterEach(() => {
    fixture.destroy();
  });
});

  