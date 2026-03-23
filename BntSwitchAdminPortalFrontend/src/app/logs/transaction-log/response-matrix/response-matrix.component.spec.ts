import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ResponseMatrixComponent } from './response-matrix.component';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ILocationState } from '@app/store/state/location.state';
import { Store, StoreModule } from '@ngrx/store';
import { MockStoreModule } from '@app/tests/tests.module';
import { AlertModule, TabsModule, DatePickerRvModule } from 'bnt';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { EventEmitter } from '@angular/core';
import { of } from 'rxjs';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { IAppState } from '@app/store/state/app.state';
import { TranslateService } from '@ngx-translate/core';
import { MemoizedSelector } from '@ngrx/store';
import { SharedModule } from '@app/shared/shared.module';
import { CommonModule } from '@angular/common';
import { ModalModule } from 'angular-custom-modal';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { NzDrawerModule } from 'ng-zorro-antd/drawer';
import { TransactionLogService } from '@app/services/transaction-log.service';
import { selectViewSettingsList } from '@app/store/selectors/view-settings.selector';
import { selectResponseMatrix, selectTransactionLogs } from '@app/store/selectors/transaction-log.selector';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

class translateServiceMock {
  public onLangChange: EventEmitter<any> = new EventEmitter();
  public onTranslationChange: EventEmitter<any> = new EventEmitter();
  public onDefaultLangChange: EventEmitter<any> = new EventEmitter();

  public get(key: any): any {
    return of(key);
  }

  public setDefaultLang(key: any): any { }
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

const selectResponseMatrixJson =
{
  status: "success",
  message: "Find Txn Response Matrix",
  data: {
    "posTransactionType": "BalanceEnquiry",
    "requestFlag": true,
    "responseFlag": true,
    "transactionId": "00012204uMuYW84e448i",
    "mappingType": "ResponseMapping",
    "adapterId": null,
    "fileUri": null,
    "destinations": "l3json",
    "headerLabel": "Spec Response Mapping",
    logsList: [
      {
        "genericFieldName": "Generic FieldName",
        "request": {
          "key": "Spec Field (OUT)",
          "value": "Field Value",
          "text": "Spec   Field  ( Out )",
          "path": null,
          "type": null
        },
        "response": {
          "key": "ISO Field (IN)",
          "value": "Field Value",
          "text": "Iso   Field  ( In )",
          "path": null,
          "type": null
        }
      },
      {
        "genericFieldName": "Response Code",
        "request": {
          "key": "response_code",
          "value": "00,Approved,200",
          "text": "Response Code",
          "path": null,
          "type": null
        },
        "response": {
          "key": "Response",
          "value": "00",
          "text": "Response",
          "path": null,
          "type": null
        }
      }
    ]
  }
}

xdescribe('ResponseMatrixComponent', () => {
  let component: ResponseMatrixComponent;
  let fixture: ComponentFixture<ResponseMatrixComponent>;
  let store: Store<ILocationState>;
  let mockStore: MockStore<IAppState>;
  let translate: TranslateService;
  let mockselectViewSettingsList;
  let mockselectResponseMatrix: MemoizedSelector<any, any>;
  let transactionLogService: TransactionLogService
  
  beforeEach(() => {
    const translateService = jasmine.createSpyObj('TranslateService', ['get', 'setDefaultLang']);
    TestBed.configureTestingModule({
      declarations: [ResponseMatrixComponent],
      providers: [
        { provide: TranslateService, useClass: translateServiceMock },
        { provide: TransactionLogService, useValue: transactionLogService },
        provideMockStore(),
      ],
      imports: [
        NgSelectModule,
        FormsModule,
        ReactiveFormsModule,
        AlertModule,
        TabsModule,
        DatePickerRvModule,
        RouterTestingModule,
        HttpClientTestingModule,
        NgxDatatableModule,
        SharedModule,
        CommonModule,
        ModalModule,
        NzToolTipModule,
        NzDrawerModule,
        StoreModule,
        BrowserAnimationsModule
      ],
    }).compileComponents();
    mockStore = TestBed.inject(MockStore);
    fixture = TestBed.createComponent(ResponseMatrixComponent);
    translate = TestBed.inject(TranslateService);
    component = fixture.componentInstance;
    mockselectViewSettingsList = mockStore.overrideSelector(
      selectViewSettingsList,
      selectViewSettingsListJSON,
    );
    component.resIdView = '2';
    mockselectResponseMatrix = mockStore.overrideSelector(
      selectResponseMatrix, selectResponseMatrixJson
    );
    mockStore.refreshState();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('onBack fuction should call  form HTMl', () => {
    component.onBack();
    expect(component.onBack).toBeDefined;
    expect(component.onBack).toHaveBeenCalled;
  });
  it('close fuction should call  form HTMl', () => {
    component.close();
    expect(component.isvisibleviewRes).toEqual(false);
  });
  it('onBack fuction should call  form HTMl', () => {
    const resMat = Object.getPrototypeOf(component);
    resMat._rowDataTransform(selectResponseMatrixJson.data);
    expect(resMat._rowDataTransform).toBeDefined;
    expect(resMat._rowDataTransform).toHaveBeenCalled;
  });
  
  afterEach(() => {
    fixture.destroy();
  });
});
