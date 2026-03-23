import { ComponentFixture, fakeAsync, TestBed, tick, waitForAsync } from '@angular/core/testing';
import { InstitutionGroupComponent } from './institution-group.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { MemoizedSelector, Store, StoreModule } from '@ngrx/store';
import { AlertModule, TabsModule, DatePickerRvModule } from 'bnt';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
//import { ImportFileModule } from '@app/import-file/import-file.module';
import { ImportFileService } from '@app/services/import-file.service';
import { SnotifyService } from 'ng-snotify';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { IAppState } from '@app/store/state/app.state';
import { TranslateService } from '@ngx-translate/core';
import { selectInstitutionGroup } from '@app/store/selectors/institution-group.selector';
import { selectPermissionsData } from '@app/store/selectors/permission.selectors';
import { selectViewSettingsList } from '@app/store/selectors/view-settings.selector';
import { selectFilterData } from '@app/store/selectors/filter.selectors';
import { Observable, of } from 'rxjs';
import { TranslateModule } from '@ngx-translate/core';
import { selectGroupResponseJsonSuccess } from '@app/store/selectors/institution-group.selector';
import { EventEmitter } from '@angular/core';
import { SharedModule } from '@app/shared/shared.module';
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
    language: ['en_EN', 'en_EN1', 'fr_FR', 'en_INV'],
    pagination: ['20', '25', '30', '40', '50'],
    searchOption: ['contain', 'contain2'],
    settingDto: {
      id: 1,
      language: "en_EN1",
      pagination: "20",
      search: "contain",
      systemUserId: "SystemUser [firstName=Bnt, lastName=Admin,  email=bnt.admin@bnt.com, systemUserCategory=, password=9AHRz1ElALzTEdFKIKywyzEZh0IcZ/INhbGkbc0Qb84=, passwordLastUpdatedOn=2020-07-02 13:09:08.0, locked=0, deleted=0, lockedReason=null]"
    },
  },
};
const selectInstitutionGroupJSON = {
  status: "success",
  message: "Find all Merchant Groups",
  data: {
    "total-record": 4,
    "institutionList": [
      {
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
      },
      {
        "id": 3,
        "institution": {
          "id": 1,
          "name": "Institution_1"
        },
        "acquirer": {
          "id": 3,
          "code": "003",
          "description": "HDFC Pos",
          "active": true,
          "deleted": "0",
          "adviceMatch": "1",
          "name": "HDFC",
          "onusValidate": "1",
          "refundOffline": "0",
          "country": {
            "id": 1,
            "code": "GBR",
            "countryName": "UK",
            "currency": {
              "id": 16,
              "code": "GBP",
              "isoCode": "826",
              "currencyName": "Sterling Pound",
              "active": true,
              "currencyMinorUnit": "2",
              "deleted": "0"
            },
            "isoCode": "826",
            "shortCode": "GB",
            "isdCode": "44",
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
        "code": "0100",
        "name": "Infiniti Retail Ltd",
        "description": "Infiniti Retail Ltd Tata Group",
        "activateOn": 1520322660000,
        "expiryOn": 1741938660000,
        "totalMerchant": 1,
        "totalLocation": null,
        "totalDevice": null,
        "merchantInstitutionDetail": {
          "id": 3,
          "address1": "Mumbai",
          "address2": "Mumbai Ind",
          "city": "Mumbai",
          "zip": "0243620",
          "country": {
            "id": 12,
            "countryName": "India"
          },
          "countryState": {
            "id": 67,
            "stateName": "Default"
          },
          "phone": "072076 66000",
          "fax": "072076 66000",
          "email": "Infiniti@info.com"
        },
        "locked": "0"
      },
      {
        "id": 2,
        "institution": {
          "id": 1,
          "name": "Institution_1"
        },
        "acquirer": {
          "id": 2,
          "code": "002",
          "description": "Pine Lab for Pos",
          "active": true,
          "deleted": "0",
          "adviceMatch": "1",
          "name": "Pine Lab",
          "onusValidate": "0",
          "refundOffline": "0",
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
        "code": "0000002",
        "name": "Reliance Industries Limt",
        "description": "Reliance Industries Limt group",
        "activateOn": 1489822800000,
        "expiryOn": 1803022800000,
        "totalMerchant": 1,
        "totalLocation": null,
        "totalDevice": null,
        "merchantInstitutionDetail": {
          "id": 2,
          "address1": "Mumbai",
          "address2": "Mumbai India",
          "city": "Mumbai",
          "zip": "400004",
          "country": {
            "id": 12,
            "countryName": "India"
          },
          "countryState": {
            "id": 67,
            "stateName": "Default"
          },
          "phone": "1800 102 7382",
          "fax": "3100 102 7382",
          "email": "reliance@info.com"
        },
        "locked": "0"
      },
      {
        "id": 1,
        "institution": {
          "id": 1,
          "name": "Institution_1"
        },
        "acquirer": {
          "id": 1,
          "code": "00000000001",
          "description": "Test Aquirer",
          "active": true,
          "deleted": "0",
          "adviceMatch": "1",
          "name": "Aquirer-One",
          "onusValidate": "1",
          "refundOffline": "1",
          "country": {
            "id": 1,
            "code": "GBR",
            "countryName": "UK",
            "currency": {
              "id": 16,
              "code": "GBP",
              "isoCode": "826",
              "currencyName": "Sterling Pound",
              "active": true,
              "currencyMinorUnit": "2",
              "deleted": "0"
            },
            "isoCode": "826",
            "shortCode": "GB",
            "isdCode": "44",
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
        "code": "00000000001",
        "name": "Future-Group",
        "description": "",
        "activateOn": 1613484000000,
        "expiryOn": 1765900800000,
        "totalMerchant": 1,
        "totalLocation": null,
        "totalDevice": null,
        "merchantInstitutionDetail": {
          "id": 1,
          "address1": "NOIDA",
          "address2": "",
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
          "phone": "475828258",
          "fax": "0125482745",
          "email": "bigbazar@gip.com"
        },
        "locked": "0"
      }
    ],
    "page-no": 1,
    "total-filtered-record": 4
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
}
const selectFilterDataJSON = 
{
  status: null,
  message: null,
  data: {
    address: [
      {
        name: [
          "NOIDA",
          "UK"
        ],
        type: "city"
      },
      {
        name: [
          "Mumbai",
          "India"
        ],
        type: "city"
      },
      {
        name: [
          "Noida",
          "India"
        ],
        type: "city"
      }
    ],
    status: [
      {
        "id": "1",
        "name": "Active"
      },
      {
        "id": "2",
        "name": "Inactive"
      }
    ]
  }
}
const row = {
  type: "L2",
  name: "XUZ",
  subType: "Core",
  corePropertiesDetails: [
      {
          id: 29,
          version: 0
      }
  ],
  version: 0,
  versionId: 29
};
const selectGroupResponseJsonSuccessJSON = [null];
xdescribe('InstitutionGroupComponent', () => {
  let component: InstitutionGroupComponent;
  let fixture: ComponentFixture<InstitutionGroupComponent>;
  let mockStore: MockStore<IAppState>;
  let mockselectInstitutionGroup: MemoizedSelector<any, any>;
  let mockselectViewSettingsList: MemoizedSelector<any, any>;
  let mockselectPermissionsData: MemoizedSelector<any, any>;
  let mockselectFilterData: MemoizedSelector<any, any>;
  let mockselectGroupResponse: MemoizedSelector<any, any>;
  let translateService: TranslateService;
  let institutionGroupComponent :InstitutionGroupComponent;
  const importFileService = jasmine.createSpyObj('ImportFileService', ['clearData']);

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InstitutionGroupComponent],
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
        TranslateModule.forRoot({}),
        DatePickerRvModule,
        RouterTestingModule,
        HttpClientTestingModule,
        NgxDatatableModule,
        //ImportFileModule,
        StoreModule.forRoot({}),
      ],
    }).compileComponents();
  });
  beforeEach(() => {
    mockStore = TestBed.get(MockStore);
    fixture = TestBed.createComponent(InstitutionGroupComponent);
    component = fixture.componentInstance;

    mockselectViewSettingsList = mockStore.overrideSelector(
      selectViewSettingsList,
      selectViewSettingsListJSON,
    );
    mockselectInstitutionGroup = mockStore.overrideSelector(
      selectInstitutionGroup,
      selectInstitutionGroupJSON,
    );
    mockselectPermissionsData = mockStore.overrideSelector(
      selectPermissionsData,
      selectPermissionsDataJSON,
    );
    mockselectFilterData = mockStore.overrideSelector(selectFilterData, selectFilterDataJSON);
    mockselectGroupResponse = mockStore.overrideSelector(
      selectGroupResponseJsonSuccess,
      selectGroupResponseJsonSuccessJSON,
    );

    translateService = TestBed.inject(TranslateService);
    mockStore.refreshState();
    fixture.detectChanges();
  

  });
  
  it('should list institution group', () => {
    expect(component).toBeTruthy();
  });
  it('viewDetails fuction should make the isvisibleView true ', () => {
    component.viewDetails(selectInstitutionGroupJSON.data);
    expect(component.isvisibleView).toEqual(true);
  });
  it('close fuction should close the Drawer ', () => {
    component.close(selectInstitutionGroupJSON.data);
    expect(component.isvisibleView).toEqual(false);
  });
  it('create fuction should create the view screen', () => {
    component.create(selectInstitutionGroupJSON.data);
    expect(component.isvisibleView).toEqual(false)
  });
  it("should render Table", () => {
    const ngxdatatable: HTMLElement = fixture.nativeElement.querySelector('ngx-datatable');
    const text = ngxdatatable.innerText;
    expect(text).toBeTruthy();
  });
  it('openModal fuction should open the Modal', () => {
    component.open();
    expect(component.visibleAnimate).toEqual(false);
  });
  it('cancel fuction should cancel the Modal', () => {
    component.cancel();
    expect(component.visible).toEqual(false);
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
  it('getFilterNameData should have a resetSearch', () => {
    component.getFilterNameData(selectFilterDataJSON.data);
    expect(component.searchResetButton).toEqual(true);
    spyOn(component,'resetSearch').and.callThrough()
    component.resetSearch();
    component.getFilterNameData(selectFilterDataJSON.data);
    expect(component.resetSearch).toHaveBeenCalled();
  });
  it('should call getFilterLoginResultData function', fakeAsync(() => {
    const data = { id: "Tags" }
    component.getFilterStatusData(data);
    expect(component.getFilterStatusData).toBeDefined;
    expect(component.getFilterStatusData).toHaveBeenCalled;
  }));
  it('should call getFilterAddressData function', fakeAsync(() => {
    const data = {
      name: ['NOIDA', 'UK'],
      type: "city"
      }
    component.getFilterAddressData(data);
    expect(component.getFilterAddressData).toBeDefined;
    expect(component.getFilterAddressData).toHaveBeenCalled;
  }));
  afterEach(() => {
    fixture.destroy();
  });
});

