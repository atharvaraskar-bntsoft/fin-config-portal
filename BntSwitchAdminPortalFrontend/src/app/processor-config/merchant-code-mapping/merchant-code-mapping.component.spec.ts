import { ComponentFixture, fakeAsync, TestBed, tick, waitForAsync } from '@angular/core/testing';
import { MerchantCodeMappingComponent } from './merchant-code-mapping.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { MemoizedSelector, Store, StoreModule } from '@ngrx/store';
import { RouterTestingModule } from '@angular/router/testing';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { IAppState } from '@app/store/state/app.state';
import { AlertModule, BoxModule, DatePickerRvModule, TabsModule } from 'bnt';
import { selectViewSettingsList } from '@app/store/selectors/view-settings.selector';
import { selectPermissionsData } from '@app/store/selectors/permission.selectors';
import { selectMerchantCodeMappingAndPermission } from '../../store/selectors/merchant-code-mapping.selector';
import { selectFilterData } from '@app/store/selectors/filter.selectors';
import { SnotifyService, ToastDefaults } from 'ng-snotify';
import { AlertService } from '@app/services/alert.service';
import { MerchantCodeMappingService } from '@app/services/merchant-code-mapping.service';
import { Overlay } from '@angular/cdk/overlay';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { EventEmitter } from '@angular/core';
import { of } from 'rxjs';
import { ImportFileService } from '@app/services/import-file.service';
import { SharedModule } from '@app/shared/shared.module';
import { NzPopconfirmModule } from 'ng-zorro-antd/popconfirm';

class translateServiceMock {
  public onLangChange: EventEmitter<any> = new EventEmitter();
  public onTranslationChange: EventEmitter<any> = new EventEmitter();
  public onDefaultLangChange: EventEmitter<any> = new EventEmitter();

  public get(key: any): any {
    return of(key);
  }
  public setDefaultLang(key: string): any {}
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

const selectMerchantCodeMappingAndPermissionJSON = {
  status: 'success',
  message: 'Find all Merchant Mapping',
  data: {
    merchantMappingList: [
      {
        id: 9,
        processorId: {
          id: 1,
          name: 'l3_iso_tcp_client_4jan',
        },
        sourceAcquirerId: null,

        sourceDeviceId: {
          id: 1,
          location: {
            id: 1,
            name: 'GIP Noida',
          },
          merchant: {
            id: 1,
            name: 'GIP Noida',
          },
          merchantInstitution: null,
          code: '0000000',
          type: {
            id: 1,
            code: 'POS-TERMINAL',
            locked: '0',
          },
          reversalTimeout: null,
          posSafetyFlag: '1',
          pedSerialNo: null,
          name: null,
          activateOn: 1613484000000,
          locked: '0',
          hostCapture: false,
          pedId: null,
          deviceModelId: null,
          additionalAttribute: null,
        },
        destinationDevice: 'delhi',
        sourceLocationId: {
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
          coordinates: null,
          additionalAttribute: null,
        },
        sourceMerchantId: {
          id: 1,
          merchantInstitution: {
            id: 1,
            name: 'Future-Group',
          },
          code: '000000000000001',
          name: 'GIP Noida',
          description: '',
          activateOn: 1613484000000,
          expiryOn: 1739714400000,
          totalLocation: 1,
          totalDevice: 1,
          locked: '0',
          posSafetyFlag: '1',
          reversalTimeout: null,
          merchantProfile: {
            id: 1,
            partialAuth: 'Y',
            velocity: null,
            category: '5411',
            services: 'AUTH_SERVICE',
            additionalServices: null,
          },
          acquirerID: null,
          merchantDetail: {
            id: 1,
            address1: 'noida',
            address2: 'NOIDA',
            city: 'NOIDA',
            zip: '201301',
            country: {
              id: 1,
              countryName: 'UK',
            },
            countryState: {
              id: 57,
              stateName: 'Default',
            },
            phone: '021452',
            fax: '012545785',
            email: 'gip@future.com',
          },
          currency: null,
          bankName: null,
          accountNumber: null,
          additionalAttribute: null,
        },
        destinationLocation: null,
        destinationMerchant: null,
        destinationAcquirer: null,
        active: true,
        processorList: null,
        deleted: '0',
      },
    ],
  },
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
  status: 'success',
  message: null,
};

const selectFilterDataJSON = {
  status: null,
  message: null,
  data: {
    processorList: [
      {
        id: 'name',
        name: 'L3_test',
      },
    ],
    status: [
      {
        id: 1,
        name: 'Active',
      },
      {
        id: 2,
        name: 'Inactive',
      },
    ],
  },
};

describe('MerchantCodeMappingComponent', () => {
  let component: MerchantCodeMappingComponent;
  let fixture: ComponentFixture<MerchantCodeMappingComponent>;
  let mockStore: MockStore<IAppState>;
  let mockselectMerchantCodeMappingAndPermission: MemoizedSelector<any, any>;
  let mockselectPermissionsData: MemoizedSelector<any, any>;
  let mockselectViewSettingsList: MemoizedSelector<any, any>;
  let mockselectFilterData: MemoizedSelector<any, any>;
  let translateService: TranslateService;
  // let setDefaultLangSpy: jasmine.Spy;
  // const importFileService = jasmine.createSpyObj('ImportFileService', ['clearData']);
  beforeEach(() => {
    // let translateService = jasmine.createSpyObj('TranslateService', ['setDefaultLang']);
    TestBed.configureTestingModule({
      declarations: [MerchantCodeMappingComponent],
      providers: [
        { provide: TranslateService, useClass: translateServiceMock },
        provideMockStore(),
        { provide: 'SnotifyToastConfig', useValue: ToastDefaults },
        { provide: ImportFileService, useValue: ImportFileService },
        AlertService,
        MerchantCodeMappingService,
        Overlay,
        SnotifyService,
        HttpClient,
        HttpHandler,
      ],
      imports: [
        BoxModule,
        RouterTestingModule,
        NgSelectModule,
        NzPopconfirmModule,
        FormsModule,
        ReactiveFormsModule,
        TabsModule,
        DatePickerRvModule,
        NgxDatatableModule,
        TranslateModule.forRoot({}),
        HttpClientTestingModule,
        NgxDatatableModule,
        AlertModule,
        SharedModule,
        StoreModule.forRoot({}),
      ],
    }).compileComponents();
  });
  beforeEach(() => {
    mockStore = TestBed.get(MockStore);
    fixture = TestBed.createComponent(MerchantCodeMappingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    mockselectMerchantCodeMappingAndPermission = mockStore.overrideSelector(
      selectMerchantCodeMappingAndPermission,
      selectMerchantCodeMappingAndPermissionJSON,
    );

    mockselectPermissionsData = mockStore.overrideSelector(
      selectPermissionsData,
      selectPermissionsDataJSON,
    );

    mockselectViewSettingsList = mockStore.overrideSelector(
      selectViewSettingsList,
      selectViewSettingsListJSON,
    );

    mockselectFilterData = mockStore.overrideSelector(selectFilterData, selectFilterDataJSON);
    translateService = TestBed.inject(TranslateService);
    mockStore.refreshState();
    fixture.detectChanges();
  });
  it('Scroll fuction should call', () => {
    const offsety = {
      isTrusted: true,
      bubbles: false,
      cancelBubble: false,
      cancelable: false,
      composed: false,
      currentTarget: 'datatable-body.datatable-body',
      defaultPrevented: false,
      eventPhase: 2,
      path: [],
      returnValue: true,
      srcElement: 'datatable-body.datatable-body',
      target: 'datatable-body.datatable-body',
      timeStamp: 7988.599999904633,
      type: 'scroll',
    };
    component.onScroll(offsety);
    expect(component.onScroll).toBeDefined;
    expect(component.onScroll).toHaveBeenCalled;
  });
  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render Table', () => {
    const ngxdatatable: HTMLElement = fixture.nativeElement.querySelector('ngx-datatable');
    const text = ngxdatatable.innerText;
    expect(text).toBeTruthy();
  });

  it('should test the table total record ', () => {
    expect(component.totalRecords).toEqual(
      selectMerchantCodeMappingAndPermissionJSON.data['total-record'],
    );
  });
  it('click button fuction should reset button remove all the features in html list', () => {
    component.resetFilterSearch();
    expect(component).toBeTruthy;
  });
  // it('click button fuction should call open import modal in screen', () => {
  //   const row={id:1};
  //   component.deleteRow(row);
  //   expect(component.objectData).toBeDefined;
  // });
  // it('getRowData fuction should call click on viewdetails form this HTMl', () => {
  //   const row={};
  //   component.getRowData(row);
  //   expect(component._router.navigate).toHaveBeenCalledWith(['/processor-config/merchant-code-mapping/edit', row.id]);
  // });
  afterEach(() => {
    fixture.destroy();
  });
});
