import { VelocityLimitsCreateComponent } from './velocity-limits-create.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { IVelocityLimitsState } from '@app/store/state/velocity-limits.state';

import { MockStoreModule } from '@app/tests/tests.module';
import { MockAction } from '@app/store/actions/mock.actions';
import { RouterTestingModule } from '@angular/router/testing';

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MemoizedSelector, Store } from '@ngrx/store';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { TranslateService } from '@ngx-translate/core';
import { AlertService } from '@app/services/alert.service';
import { SnotifyService, ToastDefaults } from 'ng-snotify';
import { HttpClient } from '@angular/common/http';
import { NzModalService } from 'ng-zorro-antd/modal';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { VelocityLimitsService } from '@app/services/velocity-limits.service';
import { AlertModule, InputRvModule, TabsModule } from 'bnt';
import { IAppState } from '@app/store/state/app.state';
import { of } from 'rxjs';
import { SharedModule } from '@app/shared/shared.module';
import { CommonModule } from '@angular/common';
import { ModalModule } from 'angular-custom-modal';
import { selectLimitsAndPermission } from '@app/store/selectors/velocity-limits.selector';
import { selectViewSettingsList } from '@app/store/selectors/view-settings.selector';
import { selectFilterData } from '@app/store/selectors/filter.selectors';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { EventEmitter } from '@angular/core';
import { VelocityLimitsRoutingModule } from '../velocity-limits-routing.module';

const viewsettingJSON = {
  data: {
    pagination: [],
    language: [],
    settingDto: {
      id: 1,
      systemUserId:
        'SystemUser [firstName=Bnt, lastName=Admin,  email=bnt.admin@bnt.com, systemUserCategory=, password=9AHRz1ElALzTEdFKIKywyzEZh0IcZ/INhbGkbc0Qb84=, passwordLastUpdatedOn=2020-07-02 13:09:08.0, locked=0, deleted=0, lockedReason=null]',
      search: 'contain',
      language: 'en_EN1',
      pagination: '20',
    },
    searchOption: [],
  },
};

const permissionJSON = [
  {
    data: {
      ' page-no': 1,
      'total-filtered-record': 3,
      'total-record': 3,
      velocityLimitsList: {
        baseCurrencyId: {},
        deleted: '0',
        deviceId: null,
        id: 4,
        limitAmount: {},
        limitCount: {},
        locationId: null,
        locked: '1',
        merchantId: {},
        merchantInstitutionId: {
          acquirer: {
            accounttype_dms: null,
            accounttype_sms: null,
            active: true,
            adviceMatch: '1',
            code: '00000000001',
          },
          activateOn: 1613484000000,
          code: '00000000001',
          description: '',
          expiryOn: 1765900800000,
          id: 1,
          institution: {
            id: 1,
            name: 'Institution_1',
          },
          locked: '0',
          merchantInstitutionDetail: {
            address1: 'NOIDA',
            address2: '',
            city: 'NOIDA',
            country: {
              countryName: 'UK',
              id: 1,
            },
            countryState: {
              id: 57,
              stateName: 'Default',
            },
            email: 'bigbazar@gip.com',
            fax: '0125482745',
            id: 1,
            phone: '475828258',
            zip: '201301',
          },
          name: 'Future-Group',
          totalDevice: null,
          totalLocation: null,
          totalMerchant: 1,
        },
        minutesCount: '1',
        transactionTypes: {
          id: null,
          name: 'Cash Withdrawal',
        },
        type: {
          code: 'INSTITUTIONS',
          id: 2,
          name: 'Merchant',
        },
      },
    },
  },
];

class TranslateServiceStub {
  public onLangChange: EventEmitter<any> = new EventEmitter();
  public onTranslationChange: EventEmitter<any> = new EventEmitter();
  public onDefaultLangChange: EventEmitter<any> = new EventEmitter();

  public get(key: any): any {
    return of(key);
  }
  public setDefaultLang(key: any): any { }
}

class VelocityLimitsServiceStub {
  // constructor(private _http: HttpClient, private _store: Store<IAppState>) { }
}

describe('VelocityLimitsCreateComponent', () => {
  let component: VelocityLimitsCreateComponent;
  let fixture: ComponentFixture<VelocityLimitsCreateComponent>;
  let store: Store<IVelocityLimitsState>;
  let mockStore: MockStore<IAppState>;
  let translate: TranslateService;
  let mockselectViewSettingsList: MemoizedSelector<any, any>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VelocityLimitsCreateComponent],
      providers: [
        { provide: TranslateService, useClass: TranslateServiceStub },
        AlertService,
        SnotifyService,
        HttpClient,
        NzModalService,
        { provide: VelocityLimitsService, useClass: VelocityLimitsServiceStub },
        { provide: 'SnotifyToastConfig', useValue: ToastDefaults },
        provideMockStore(),
      ],
      imports: [
        RouterTestingModule,
        SharedModule,
        AlertModule,
        CommonModule,
        NgxDatatableModule,
        VelocityLimitsRoutingModule,
        ModalModule,
        NgSelectModule,
        FormsModule,
        ReactiveFormsModule,
        TabsModule,
        InputRvModule,
        HttpClientTestingModule,
      ],
    }).compileComponents();

    mockStore = TestBed.get(Store);
    fixture = TestBed.createComponent(VelocityLimitsCreateComponent);
    component = fixture.componentInstance;


    mockselectViewSettingsList = mockStore.overrideSelector(
      selectViewSettingsList,
      viewsettingJSON,
    );

    mockStore.refreshState();
    fixture.detectChanges();
    translate = TestBed.get(TranslateService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
