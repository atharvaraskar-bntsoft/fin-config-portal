import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IAppState } from '@app/store/state/app.state';
import { MemoizedSelector, StoreModule } from '@ngrx/store';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { NzModalService } from 'ng-zorro-antd/modal';
import { EventEmitter } from '@angular/core';
import { of } from 'rxjs';
import { AccountTypeDetailsComponent } from './account-type-details.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { AlertModule } from 'bnt';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { selectViewSettingsList } from '@app/store/selectors/view-settings.selector';
import {
  selectAccountTypeDetails,
  selectBinTableAll,
} from '@app/store/selectors/bin-table.selector';
import { SharedModule } from '@app/shared/shared.module';
import { CommonModule } from '@angular/common';
class translateServiceMock {
  public onLangChange: EventEmitter<any> = new EventEmitter();
  public onTranslationChange: EventEmitter<any> = new EventEmitter();
  public onDefaultLangChange: EventEmitter<any> = new EventEmitter();

  public get(key: any): any {
    return of(key);
  }
};
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
const selectAccountTypeDetailsJSON = {
  "total-record": 1,
  "page-no": 1,
  "total-filtered-record": 1,
  "BinAccountTypeList": [
    {
      "id": 2,
      "binAccountTypeMasterId": {
        "id": 1,
        "accountName": "Cheque Account Dual",
        "accountTypeCode": "00",
        "authenticationMethod": "NONE",
        "messageProtocolVariation": null,
        "minimumBudgetAmount": "30000.0000",
        "displayPrompt": "Default Account",
        "budgetAllowed": "1",
        "allowManualTransaction": "0",
        "active": "1",
        "budgetPeriods": {
          "budgetPeriod": [
            "03",
            "06",
            "12",
            "24",
            "36"
          ]
        }
      },
      "active": "1",
      "linkedTransactionTypes": [
        {
          "id": null,
          "active": "1",
          "txnTypeCode": "01",
          "transactionType": {
            "id": 88,
            "value": "Cash Withdrawal",
            "description": null
          }
        }
      ]
    }
  ]
};
const selectBinTableAllJSON = {
  "status": "success",
  "message": "Find Bin-Table List",
  "data": [
    {
      "id": 1,
      "brand": null,
      "bin": "476173",
      "cardProduct": null,
      "onus": null,
      "mod10": null,
      "international": null,
      "productType": null,
      "length": null,
      "binAccountType": null,
      "binAttributes": null
    },
    {
      "id": 2,
      "brand": null,
      "bin": "519612",
      "cardProduct": null,
      "onus": null,
      "mod10": null,
      "international": null,
      "productType": null,
      "length": null,
      "binAccountType": null,
      "binAttributes": null
    },
    {
      "id": 3,
      "brand": null,
      "bin": "523982",
      "cardProduct": null,
      "onus": null,
      "mod10": null,
      "international": null,
      "productType": null,
      "length": null,
      "binAccountType": null,
      "binAttributes": null
    },
    {
      "id": 4,
      "brand": null,
      "bin": "445121",
      "cardProduct": null,
      "onus": null,
      "mod10": null,
      "international": null,
      "productType": null,
      "length": null,
      "binAccountType": null,
      "binAttributes": null
    },
    {
      "id": 5,
      "brand": null,
      "bin": "4352",
      "cardProduct": null,
      "onus": null,
      "mod10": null,
      "international": null,
      "productType": null,
      "length": null,
      "binAccountType": null,
      "binAttributes": null
    },
    {
      "id": 6,
      "brand": null,
      "bin": "4761",
      "cardProduct": null,
      "onus": null,
      "mod10": null,
      "international": null,
      "productType": null,
      "length": null,
      "binAccountType": null,
      "binAttributes": null
    }
  ]
};
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
describe('AccountTypeDetailsComponent', () => {
  let component: AccountTypeDetailsComponent;
  let fixture: ComponentFixture<AccountTypeDetailsComponent>;
  let mockStore: MockStore<IAppState>;
  let mockselectViewSettingsList: MemoizedSelector<any, any>;
  let mockselectAccountTypeDetails: MemoizedSelector<any, any>;
  let mockselectBinTableAll: MemoizedSelector<any, any>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AccountTypeDetailsComponent],
      providers: [
        TranslateService,
        NzModalService,

        { provide: TranslateService, useClass: translateServiceMock },
        provideMockStore(),
      ],
      imports: [
        NgSelectModule,
        FormsModule,
        RouterTestingModule,
        NgxDatatableModule,
        SharedModule,
        // MockStoreModule.forRoot('Location', {}),
        AlertModule,

        BrowserAnimationsModule,
        HttpClientTestingModule,
        TranslateModule,
        CommonModule
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    mockStore = TestBed.get(MockStore);
    fixture = TestBed.createComponent(AccountTypeDetailsComponent);
    component = fixture.componentInstance;

    mockselectViewSettingsList = mockStore.overrideSelector(
      selectViewSettingsList,
      selectViewSettingsListJSON,
    );

    mockselectAccountTypeDetails = mockStore.overrideSelector(
      selectAccountTypeDetails,
      selectAccountTypeDetailsJSON,
    );
    mockselectBinTableAll = mockStore.overrideSelector(selectBinTableAll, selectBinTableAllJSON);
    mockStore.refreshState();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('openModal fuction should open the Modal', () => {
    component.resetFilter();
    expect(component.resetButtonFlag).toEqual(false);
  });
  it('Scroll fuction should call', () => {
    const offsety ={isTrusted: true,
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
      type: "scroll",
    }
    component.onScroll(offsety);
    expect(component.onScroll).toBeDefined;
    expect(component.onScroll).toHaveBeenCalled;
  });
  it('binFileChange fuction should have isAttributesVisible equal to ture', () => {
    component.binFileChange(event);
    expect(component.resetButtonFlag).toEqual(true);
  });
  it('closeModal fuction should have isAttributesVisible equal to false', () => {
    component.closeModal();
    expect(component.isAttributesVisible).toEqual(false);
  });
  it('closeBudget fuction have isBudgetVisible equal to false', () => {
    component.closeBudget();
    expect(component.isBudgetVisible).toEqual(false);
  });
  it('openModal fuction should have isAttributesVisible equal to true', () => {
    component.openModal(row);
    expect(component.isAttributesVisible).toEqual(true);
  });
  it('openBudget fuction should have isBudgetVisible equal to true', () => {
    component.openBudget(row);
    expect(component.isBudgetVisible).toEqual(true);
  });
  it('keyName fuction should call', () => {
    const data=4;
    component.keyName(data);
    expect(component.keyName).toBeTruthy;
  });
  
  
  afterEach(() => {
    fixture.destroy();
  });
});
