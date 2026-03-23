import { HttpClientTestingModule } from '@angular/common/http/testing';
import { EventEmitter } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { RouterTestingModule } from '@angular/router/testing';
import { AlertService } from '@app/services/alert.service';
import { ImportFileService } from '@app/services/import-file.service';
import { SharedModule } from '@app/shared/shared.module';
import { IAppState } from '@app/store/state/app.state';
import { NgSelectModule } from '@ng-select/ng-select';
import { MemoizedSelector, StoreModule } from '@ngrx/store';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { SnotifyService } from 'ng-snotify';
import { AlertModule, DatePickerRvModule, TabsModule } from 'bnt';
import { of } from 'rxjs';
import { selectViewSettingsList } from '@app/store/selectors/view-settings.selector';
import { ReversibleDialogComponent } from './reversible-dialog.component';
import { CommonModule } from '@angular/common';
class translateServiceMock {
  public onLangChange: EventEmitter<any> = new EventEmitter();
  public onTranslationChange: EventEmitter<any> = new EventEmitter();
  public onDefaultLangChange: EventEmitter<any> = new EventEmitter();

  public get(key: any): any {
    return of(key);
  }
}
const selectViewSettingsListJson = {
  service: ['AUTH_SERVICE', 'CARD_SERVICE', 'FRAUD_SERVICE', 'GATEWAY_SERVICE', 'LOYALTY_SERVICE'],
  fields: [
    {
      useCase: '1',
      name: '${transaction_type}',
      label: 'TransactionType',
      datatype: 'string',
      operator: [
        {
          text: 'Equal',
          value: 'equal',
          key: 'value',
        },
        {
          text: 'Like',
          value: 'like',
          key: 'pattern',
        },
        {
          text: 'In',
          value: 'in',
          key: 'value',
        },
        {
          text: 'StartsWith',
          value: 'starts_with',
          key: 'value',
        },
        {
          text: 'RegEx',
          value: 'pattern',
          key: 'pattern',
        },
        {
          text: 'GreaterThan',
          value: 'greaterThan',
          key: 'value',
        },
        {
          text: 'LessThan',
          value: 'lessThan',
          key: 'value',
        },
        {
          text: 'GreaterThanEqual',
          value: 'greaterThanEqual',
          key: 'value',
        },
        {
          text: 'LessThanEqual',
          value: 'lessThanEqual',
          key: 'value',
        },
        {
          text: 'Null',
          value: 'null',
          key: 'value',
        },
      ],
      data: ['Cash Withdrawal'],
      toolTip: 'TransactionType',
    },
    {
      useCase: '2',
      name: '${message_exchange.[SELECTED_SERVICE].internal_processing_code}',
      label: 'Message Exchange IPC',
      datatype: 'string',
      operator: [
        {
          text: 'Equal',
          value: 'equal',
          key: 'value',
        },
        {
          text: 'Like',
          value: 'like',
          key: 'pattern',
        },
        {
          text: 'In',
          value: 'in',
          key: 'value',
        },
        {
          text: 'StartsWith',
          value: 'starts_with',
          key: 'value',
        },
        {
          text: 'RegEx',
          value: 'pattern',
          key: 'pattern',
        },
        {
          text: 'GreaterThan',
          value: 'greaterThan',
          key: 'value',
        },
        {
          text: 'LessThan',
          value: 'lessThan',
          key: 'value',
        },
        {
          text: 'GreaterThanEqual',
          value: 'greaterThanEqual',
          key: 'value',
        },
        {
          text: 'LessThanEqual',
          value: 'lessThanEqual',
          key: 'value',
        },
        {
          text: 'Null',
          value: 'null',
          key: 'value',
        },
      ],
      data: [
        'ACCOUNT  LISTING',
        'account listing',
        'ACCOUNT_CLOSED ',
        'APPROVED',
        'DECLINED',
        'DECLINED_OAR',
        'DO_NOT_HONOR',
        'DUPLICATE_TRANSMISSION',
        'ERROR',
        'EXCEEDS_CASH_LIMIT',
        'EXCEEDS_WITHDRAWAL_LIMIT',
        'EXPIRED_CARD',
        'IN_PROGRESS',
        'INCORRECT_PIN',
        'INSUFFICIENT_FUNDS',
        'INTERNAL PROCESSING_ -CODE',
        'INV_LOCAL_TRANSACTION_DATE_TIME',
        'INVALID_CARD',
        'INVALID_MERCHANT',
        'INVALID_TERMINAL',
        'ISSUER_INOPERATIVE',
        'LOST_CARD_PKP',
        'new value',
        'NOCREDIT_ACCOUNT',
        'NOSAVING_ACCOUNT',
        'PICKUP_CARD',
        'PIN_TRIES_EXCEEDED',
        'PINRETRIES_EXCEEDED',
        'REFER_TO_CARD_ISSUER',
        'RESTRICTED_CARD ',
        'SAFING_DECLINE',
        'SYSTEM_ERROR',
        'TEST_IPC',
        'TRANSACTION_TIMEOUT',
        'value',
      ],
      toolTip: 'message.exchange.ipc',
    },
    {
      useCase: '3',
      name: '${message_exchange.[SELECTED_SERVICE].SELECTED_TYPE_message.[internal_processing_code]}',
      label: 'IMF IPC',
      datatype: 'string',
      operator: [
        {
          text: 'Equal',
          value: 'equal',
          key: 'value',
        },
        {
          text: 'Like',
          value: 'like',
          key: 'pattern',
        },
        {
          text: 'In',
          value: 'in',
          key: 'value',
        },
        {
          text: 'StartsWith',
          value: 'starts_with',
          key: 'value',
        },
        {
          text: 'RegEx',
          value: 'pattern',
          key: 'pattern',
        },
        {
          text: 'GreaterThan',
          value: 'greaterThan',
          key: 'value',
        },
        {
          text: 'LessThan',
          value: 'lessThan',
          key: 'value',
        },
        {
          text: 'GreaterThanEqual',
          value: 'greaterThanEqual',
          key: 'value',
        },
        {
          text: 'LessThanEqual',
          value: 'lessThanEqual',
          key: 'value',
        },
        {
          text: 'Null',
          value: 'null',
          key: 'value',
        },
      ],
      data: [
        'ACCOUNT  LISTING',
        'account listing',
        'ACCOUNT_CLOSED ',
        'APPROVED',
        'DECLINED',
        'DECLINED_OAR',
        'DO_NOT_HONOR',
        'DUPLICATE_TRANSMISSION',
        'ERROR',
        'EXCEEDS_CASH_LIMIT',
        'EXCEEDS_WITHDRAWAL_LIMIT',
        'EXPIRED_CARD',
        'IN_PROGRESS',
        'INCORRECT_PIN',
        'INSUFFICIENT_FUNDS',
        'INTERNAL PROCESSING_ -CODE',
        'INV_LOCAL_TRANSACTION_DATE_TIME',
        'INVALID_CARD',
        'INVALID_MERCHANT',
        'INVALID_TERMINAL',
        'ISSUER_INOPERATIVE',
        'LOST_CARD_PKP',
        'new value',
        'NOCREDIT_ACCOUNT',
        'NOSAVING_ACCOUNT',
        'PICKUP_CARD',
        'PIN_TRIES_EXCEEDED',
        'PINRETRIES_EXCEEDED',
        'REFER_TO_CARD_ISSUER',
        'RESTRICTED_CARD ',
        'SAFING_DECLINE',
        'SYSTEM_ERROR',
        'TEST_IPC',
        'TRANSACTION_TIMEOUT',
        'value',
      ],
      toolTip: 'imf.ipc',
    },
  ],
};
xdescribe('ReversibleDialogComponent', () => {
  let component: ReversibleDialogComponent;
  let fixture: ComponentFixture<ReversibleDialogComponent>;
  let mockStore: MockStore<IAppState>;
  let translateService: TranslateService;
  let mockselectViewSettingsList: MemoizedSelector<any, any>;
  const importFileService = jasmine.createSpyObj('ImportFileService', ['clearData']);
  beforeEach(() => {
    const translateService = jasmine.createSpyObj('TranslateService', ['get', 'setDefaultLang']);
    const alertService = jasmine.createSpyObj('AlertService, SnotifyService', ['responseMessage']);
    const data = {
      title: 'title',
      message: 'message',
      summary: 'my summary',
    };
    TestBed.configureTestingModule({
      declarations: [ReversibleDialogComponent],
      providers: [
        SnotifyService,
        { provide: TranslateService, useClass: translateServiceMock },
        { provide: MatDialogRef, useValue: {} },
        { provide: MAT_DIALOG_DATA, useValue: {} },
        { provide: 'SnotifyToastConfig', useValue: {} },
        { provide: ImportFileService, useValue: importFileService },
        { provide: AlertService, useValue: alertService },
        provideMockStore(),
      ],
      imports: [
        SharedModule,
        NgSelectModule,
        FormsModule,
        // MatDialogModule,
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
        CommonModule
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    mockStore = TestBed.inject(MockStore);
    fixture = TestBed.createComponent(ReversibleDialogComponent);
    component = fixture.componentInstance;

    mockselectViewSettingsList = mockStore.overrideSelector(
      selectViewSettingsList,
      selectViewSettingsListJson,
    );
    translateService = TestBed.inject(TranslateService);
    mockStore.refreshState();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  afterEach(() => {
    fixture.destroy();
  });
});
