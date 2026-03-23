import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { AlertModule, TabsModule } from 'bnt';
import { LocationService } from '@app/services/location.service';
import { MemoizedSelector, Store, StoreModule } from '@ngrx/store';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MessageService } from '@app/services/message.service';
import { AlertService } from '@app/services/alert.service';
import { LocationComponent } from './location.component';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { ImportFileService } from '@app/services/import-file.service';
import { IAppState } from '@app/store/state/app.state';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { NzModalService } from 'ng-zorro-antd/modal';
import {selectViewSettingsList} from '@app/store/selectors/view-settings.selector';
import {selectLocation} from '@app/store/selectors/location.selector';
import {selectPermissionsData} from '@app/store/selectors/permission.selectors';
import {selectFilterData} from '@app/store/selectors/filter.selectors'
import { EventEmitter } from '@angular/core';
import { of } from 'rxjs';
import { SharedModule } from '@app/shared/shared.module';
class translateServiceMock {
  public onLangChange: EventEmitter<any> = new EventEmitter();
  public onTranslationChange: EventEmitter<any> = new EventEmitter();
  public onDefaultLangChange: EventEmitter<any> = new EventEmitter();

  public get(key: any): any {
    return of(key);
  }
}
const selectLocationJson = {
  status: 'success',
  message: 'Find all locations',
  data: {
    'total-record': 3,
    locationList: [
      {
        id: 3,
        totalDevice: 1,
        code: '000000080',
        name: 'New Delhi',
        merchant: {
          id: 3,
          name: 'Croma Retail Company',
        },
        merchantInstitution: null,
        description: 'In select citywalk',
        activateOn: 1520586000000,
        expiryOn: 1710493200000,
        storeId: null,
        posSafetyFlag: '1',
        reversalTimeout: '7',
        locked: '0',
        locationDetail: {
          id: 3,
          email: 'croma_newdelhi@info.com',
          phone: '9880989876',
          fax: '9880989876',
          address1: 'New Delhi',
          address2: 'citywalk',
          city: 'Delhi',
          country: {
            id: 12,
            countryName: 'India',
          },
          countryState: {
            id: 67,
            stateName: 'Default',
          },
          zip: '0243620',
        },
        coordinates: {
          lat: null,
          lng: null,
        },
        additionalAttribute: null,
      },
      {
        id: 2,
        totalDevice: 1,
        code: '000000002',
        name: 'Indirapuram, Ghaziabad',
        merchant: {
          id: 2,
          name: 'Reliance Digital',
        },
        merchantInstitution: null,
        description: 'Reliance digital Indirapuram, Ghaziabad, Uttar Pradesh',
        activateOn: 1521359760000,
        expiryOn: 1771315020000,
        storeId: null,
        posSafetyFlag: '1',
        reversalTimeout: '5',
        locked: '0',
        locationDetail: {
          id: 2,
          email: 'digitalreliance@info.com',
          phone: '1800-2390-23',
          fax: '1800-2390-32',
          address1: 'Indirapuram,Ghaziabad',
          address2: 'Ghaziabad, Uttar Pradesh ',
          city: 'Ghaziabad',
          country: {
            id: 12,
            countryName: 'India',
          },
          countryState: {
            id: 67,
            stateName: 'Default',
          },
          zip: '201012',
        },
        coordinates: {
          lat: null,
          lng: null,
        },
        additionalAttribute: null,
      },
      {
        id: 1,
        totalDevice: 1,
        code: '000000000000001',
        name: 'GIP Noida',
        merchant: {
          id: 1,
          name: 'GIP Noida',
        },
        merchantInstitution: null,
        description: '',
        activateOn: 1613484000000,
        expiryOn: 1739714400000,
        storeId: null,
        posSafetyFlag: '1',
        reversalTimeout: null,
        locked: '0',
        locationDetail: {
          id: 1,
          email: 'loc@gip.com',
          phone: '01245256897',
          fax: '01205658478',
          address1: 'Noida',
          address2: 'Noida',
          city: 'NOIDA',
          country: {
            id: 1,
            countryName: 'UK',
          },
          countryState: {
            id: 57,
            stateName: 'Default',
          },
          zip: '201301',
        },
        coordinates: {
          lat: null,
          lng: null,
        },
        additionalAttribute: null,
      },
    ],
    'page-no': 1,
    'total-filtered-record': 3,
  },
};

const selectPermissionsDataJson = {
  status: 'success',
  message: null,
  data: [
    {
      id: 'link_notification',
      read: true,
      write: true,
      update: true,
      delete: true,
      check: false,
    },
    {
      id: 'link_merchant_reports',
      read: true,
      write: true,
      update: true,
      delete: true,
      check: false,
    },
    {
      id: 'link_emv_data',
      read: true,
      write: true,
      update: true,
      delete: true,
      check: false,
    },
    {
      id: 'link_dashboard',
      read: true,
      write: true,
      update: true,
      delete: true,
      check: false,
    },
    {
      id: 'link_status',
      read: true,
      write: true,
      update: true,
      delete: true,
      check: false,
    },
    {
      id: 'link_deployed_router',
      read: true,
      write: true,
      update: true,
      delete: true,
      check: false,
    },
    {
      id: 'link_exports',
      read: true,
      write: true,
      update: true,
      delete: true,
      check: false,
    },
    {
      id: 'link_merchant',
      read: true,
      write: true,
      update: true,
      delete: true,
      check: true,
    },
    {
      id: 'link_rule',
      read: true,
      write: true,
      update: true,
      delete: true,
      check: false,
    },
    {
      id: 'link_workflow_rule',
      read: true,
      write: true,
      update: true,
      delete: true,
      check: false,
    },
    {
      id: 'link_location',
      read: true,
      write: true,
      update: true,
      delete: true,
      check: true,
    },
    {
      id: 'link_deployment_schedule',
      read: true,
      write: true,
      update: true,
      delete: true,
      check: false,
    },
    {
      id: 'link_routing_rule',
      read: true,
      write: true,
      update: true,
      delete: true,
      check: false,
    },
    {
      id: 'link_view_settings',
      read: true,
      write: true,
      update: true,
      delete: true,
      check: false,
    },
    {
      id: 'link_user_roles',
      read: true,
      write: true,
      update: true,
      delete: true,
      check: false,
    },
    {
      id: 'link_exception_queue',
      read: true,
      write: true,
      update: true,
      delete: true,
      check: false,
    },
    {
      id: 'link_l3_adapters',
      read: true,
      write: true,
      update: true,
      delete: true,
      check: true,
    },
    {
      id: 'link_acquirer_id_config',
      read: true,
      write: true,
      update: true,
      delete: true,
      check: false,
    },
    {
      id: 'link_deployment_l2json',
      read: true,
      write: true,
      update: true,
      delete: true,
      check: false,
    },
    {
      id: 'link_audit_log',
      read: true,
      write: true,
      update: true,
      delete: true,
      check: false,
    },
    {
      id: 'link_access_log',
      read: true,
      write: true,
      update: true,
      delete: true,
      check: false,
    },
    {
      id: 'link_routing_router',
      read: true,
      write: true,
      update: true,
      delete: true,
      check: false,
    },
    {
      id: 'link_device_types',
      read: true,
      write: true,
      update: true,
      delete: true,
      check: false,
    },
    {
      id: 'link_mid',
      read: true,
      write: true,
      update: true,
      delete: true,
      check: false,
    },
    {
      id: 'link_bin_table',
      read: true,
      write: true,
      update: true,
      delete: true,
      check: false,
    },
    {
      id: 'link_lookup_values',
      read: true,
      write: true,
      update: true,
      delete: true,
      check: true,
    },
    {
      id: 'link_velocity',
      read: true,
      write: true,
      update: true,
      delete: true,
      check: false,
    },
    {
      id: 'link_countries',
      read: true,
      write: true,
      update: true,
      delete: true,
      check: false,
    },
    {
      id: 'link_deployment_clusters',
      read: true,
      write: true,
      update: true,
      delete: true,
      check: false,
    },
    {
      id: 'link_saf_queue',
      read: true,
      write: true,
      update: true,
      delete: true,
      check: false,
    },
    {
      id: 'link_acquirer_mapping',
      read: true,
      write: true,
      update: true,
      delete: true,
      check: false,
    },
    {
      id: 'link_country_states',
      read: true,
      write: true,
      update: true,
      delete: true,
      check: false,
    },
    {
      id: 'link_device',
      read: true,
      write: true,
      update: true,
      delete: true,
      check: true,
    },
    {
      id: 'link_el_function',
      read: true,
      write: true,
      update: true,
      delete: true,
      check: false,
    },
    {
      id: 'link_router',
      read: true,
      write: true,
      update: true,
      delete: true,
      check: false,
    },
    {
      id: 'link_imf',
      read: true,
      write: true,
      update: true,
      delete: true,
      check: false,
    },
    {
      id: 'link_pending_approvals',
      read: true,
      write: true,
      update: true,
      delete: true,
      check: false,
    },
    {
      id: 'link_invalid_txn_log',
      read: true,
      write: true,
      update: true,
      delete: true,
      check: false,
    },
    {
      id: 'link_currencies',
      read: true,
      write: true,
      update: true,
      delete: true,
      check: false,
    },
    {
      id: 'link_institution',
      read: true,
      write: true,
      update: true,
      delete: true,
      check: true,
    },
    {
      id: 'link_tag_rule',
      read: true,
      write: true,
      update: true,
      delete: true,
      check: false,
    },
    {
      id: 'link_user',
      read: true,
      write: true,
      update: true,
      delete: true,
      check: false,
    },
    {
      id: 'link_processor_adapter',
      read: true,
      write: true,
      update: true,
      delete: true,
      check: false,
    },
    {
      id: 'link_txn_log',
      read: true,
      write: true,
      update: true,
      delete: true,
      check: false,
    },
    {
      id: 'link_l1_adapters',
      read: true,
      write: true,
      update: true,
      delete: true,
      check: true,
    },
    {
      id: 'link_deployment_history',
      read: true,
      write: true,
      update: true,
      delete: true,
      check: false,
    },
    {
      id: 'link_monitoring',
      read: false,
      write: false,
      update: false,
      delete: false,
      check: false,
    },
    {
      id: 'link_extractor',
      read: true,
      write: true,
      update: true,
      delete: true,
      check: false,
    },
    {
      id: 'link_deployment_status',
      read: true,
      write: true,
      update: true,
      delete: true,
      check: false,
    },
    {
      id: 'link_workflow_router',
      read: true,
      write: true,
      update: true,
      delete: true,
      check: false,
    },
    {
      id: 'link_workflow',
      read: true,
      write: true,
      update: true,
      delete: true,
      check: false,
    },
  ],
};
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
const selectFilterDataJson = {
  status: null,
  message: null,
  data: {
    "address": [
      {
        "name": [
          "NOIDA",
          "UK"
        ],
        "type": "city"
      },
      {
        "name": [
          "Ghaziabad",
          "India"
        ],
        "type": "city"
      },
      {
        "name": [
          "Delhi",
          "India"
        ],
        "type": "city"
      }
    ],
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
    ]
  }
};
const selectLocationResponseJson = [null];
const eventData: HTMLSelectElement = { id: "1", name: "Active"} as HTMLSelectElement;
describe('LocationComponent', () => {
  let component: LocationComponent;
  let fixture: ComponentFixture<LocationComponent>;
  // let store: Store<ILocationState>;
  let mockStore: MockStore<IAppState>;
  // let getSpy: jasmine.Spy;
  let mockselectLocation: MemoizedSelector<any, any>;
  let mockselectViewSettingsList: MemoizedSelector<any, any>;
  let mockselectPermissionsData: MemoizedSelector<any, any>;
  let mockselectFilterData: MemoizedSelector<any, any>;
  let translateService: TranslateService;
  // let routerSpy = { navigate: jasmine.createSpy('navigate') };
  const importFileService = jasmine.createSpyObj('ImportFileService', ['clearData']);
  beforeEach(() => {
    // const translateService = jasmine.createSpyObj('TranslateService', ['get','setDefaultLang']);
    TestBed.configureTestingModule({
      declarations: [LocationComponent],
      providers: [
        LocationService,
        MessageService,
        AlertService,
        ImportFileService,
        { provide: TranslateService, useClass: translateServiceMock,},
        { provide: ImportFileService, useValue: importFileService },
      NzModalService,
       provideMockStore()],
      imports: [
        SharedModule,
        NgSelectModule,
        FormsModule,
        ReactiveFormsModule,
        AlertModule,
        TabsModule,
        TranslateModule.forRoot({}),
        RouterTestingModule,
        HttpClientTestingModule,
        NgxDatatableModule,
        StoreModule.forRoot({}),
      ],
    }).compileComponents();
  });
  beforeEach(() => {
    mockStore = TestBed.get(MockStore);
    fixture = TestBed.createComponent(LocationComponent);
    component = fixture.componentInstance;

    mockselectViewSettingsList = mockStore.overrideSelector(
      selectViewSettingsList,
      selectViewSettingsListJson,
    );
    mockselectLocation = mockStore.overrideSelector(
      selectLocation,
      selectLocationJson,
    );
    mockselectPermissionsData = mockStore.overrideSelector(
      selectPermissionsData,
      selectPermissionsDataJson,
    );
    mockselectFilterData = mockStore.overrideSelector(
      selectFilterData,
      selectFilterDataJson,
    );
    translateService = TestBed.inject(TranslateService);
    mockStore.refreshState();
    fixture.detectChanges();

  });
  


  it('should list location', () => {
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
    component.viewDetail(selectLocation);
    expect(component.isvisibleView).toEqual(true);
  });
  it('closeView fuction should close the Drawer ', () => {
    component.closeView(selectLocation);
    expect(component.isvisibleView).toEqual(false);
  });
  it('createview fuction should create the view screen', () => {
    component.createview(selectLocation);
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
    component.importButton();
    expect(component.openPopUp).toHaveBeenCalled();
  });
  it('resetall function should have resetflag tp false', () =>{
    component.resetAll();
    expect(component.resetFlag).toEqual(false)
  })
  it('changeViewToMap function should have resetflag tp false', () =>{
    component.changeViewToMap();
    expect(component.mapView).toEqual(true)
  });
  it('changeViewToList function should have resetflag tp false', () =>{
    component.changeViewToList();
    expect(component.mapView).toEqual(false)
  });
  it('getFilterNameData fuction should have searchResetButton to true', () => {
    component.getFilterNameData(selectFilterDataJson.data);
    expect(component.searchResetButton).toEqual(true)
  });
  it('resetSearch fuction searchResetButton open the Modal', () => {
    component.reset(event);
    expect(component.resetFlag).toEqual(false);
  });
it('getFilterStatus',()=>{
  component.getFilterStatus(eventData);
   expect(component._filters['status']).toEqual('1');
});
it('getFilterInstitution',()=>{
  component.getFilterInstitution(eventData);
   expect(component._filters['merchant']).toEqual('1');
});
 
  afterEach(() => {
    fixture.destroy();
  });
});
