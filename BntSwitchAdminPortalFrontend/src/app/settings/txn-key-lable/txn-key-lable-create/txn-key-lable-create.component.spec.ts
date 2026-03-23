import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { AlertService } from '@app/services/alert.service';
import { IAppState } from '@app/store/state/app.state';
import { MemoizedSelector, StoreModule } from '@ngrx/store';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { SnotifyService, ToastDefaults } from 'ng-snotify';
import { NzModalService } from 'ng-zorro-antd/modal';
import { EventEmitter } from '@angular/core';
import { of } from 'rxjs';
import { By } from '@angular/platform-browser';
import { TxnKeyLableCreateComponent } from './txn-key-lable-create.component';
import { SharedModule } from '@app/shared/shared.module';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { AlertModule } from 'bnt';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { selectViewSettingsList } from '@app/store/selectors/view-settings.selector';
import {
  selectTxnKeyLableTypeListGetById,
  selectTxnKeyLableTypePost,
  selectTxnKeyLableTypeUpdate,
} from '@app/store/selectors/txn-key-lable.selectors';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ClearState, GetByIdTxnKeyLableType } from '@app/store/actions/txn-key-lable.action';

class translateServiceMock {
  public onLangChange: EventEmitter<any> = new EventEmitter();
  public onTranslationChange: EventEmitter<any> = new EventEmitter();
  public onDefaultLangChange: EventEmitter<any> = new EventEmitter();

  public get(key: any): any {
    return of(key);
  }
  public setDefaultLang(key: any): any {
    return of(key);
  }
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
const selectTxnKeyLableTypeListGetByIdJSON = {
  data: {
    id: 111,
    locale: 'en_EN1',
    txnKey: 'test12',
    label: '1111',
    preSeeded: '0',
    active: '1',
  },
  message: 'Find By ID',
  status: 'success',
};
const selectTxnKeyLableTypePostJSON = {
  data: {
    id: 111,
  },
  message: 'TxnLabel Created',
  status: 'success',
};
const selectTxnKeyLableTypeUpdateJSON = {
  data: {
    active: '1',
    id: 111,
    label: '11116',
    locale: 'en_EN1',
    preSeeded: '0',
    txnKey: 'test12',
  },
  message: 'TxnKeyLabel Updated',
  status: 'success',
};
const value = {
  active: true,
  label: 'qqqq',
  txnKey: 'qqq',
};
const data = {
  active: true,
  label: 'aaa',
  txnKey: 'aaaa',
};
const updatedData = {
  active: '1',
  id: 113,
  label: 'aaa',
  locale: 'en_EN1',
  preSeeded: '0',
  txnKey: 'aaaa',
};
let router: Router;
describe('TxnKeyLableCreateComponent', () => {
  let component: TxnKeyLableCreateComponent;
  let fixture: ComponentFixture<TxnKeyLableCreateComponent>;
  let mockStore: MockStore<IAppState>;
  let mockselectViewSettingsList: MemoizedSelector<any, any>;
  let mockselectTxnKeyLableTypeListGetById: MemoizedSelector<any, any>;
  let mockselectTxnKeyLableTypePost: MemoizedSelector<any, any>;
  let mockselectTxnKeyLableTypeUpdate: MemoizedSelector<any, any>;

  beforeEach((() => {
    const translateService = jasmine.createSpyObj('TranslateService', ['get', 'setDefaultLang']);
    const routerSpy = jasmine.createSpyObj('Router', ['navigate']);
    TestBed.configureTestingModule({
      declarations: [TxnKeyLableCreateComponent],
      providers: [
        TranslateService,
        NzModalService,
        AlertService,
        SnotifyService,
        { provide: 'SnotifyToastConfig', useValue: ToastDefaults },
        { provide: TranslateService, useClass: translateServiceMock },
        provideMockStore(),
      ],
      imports: [
        StoreModule,
        SharedModule,
        NgSelectModule,
        FormsModule,
        RouterTestingModule,
        NgxDatatableModule,
        ReactiveFormsModule,
        AlertModule,
        StoreModule.forRoot({}),
        BrowserAnimationsModule,
        HttpClientTestingModule,
        TranslateModule,
        CommonModule
      ],
    }).compileComponents();
    mockStore = TestBed.get(MockStore);
    fixture = TestBed.createComponent(TxnKeyLableCreateComponent);
    component = fixture.componentInstance;

    mockselectViewSettingsList = mockStore.overrideSelector(
      selectViewSettingsList,
      selectViewSettingsListJSON,
    );

    mockselectTxnKeyLableTypeListGetById = mockStore.overrideSelector(
      selectTxnKeyLableTypeListGetById,
      selectTxnKeyLableTypeListGetByIdJSON,
    );
    mockselectTxnKeyLableTypePost = mockStore.overrideSelector(
      selectTxnKeyLableTypePost,
      selectTxnKeyLableTypePostJSON,
    );

    mockselectTxnKeyLableTypeUpdate = mockStore.overrideSelector(
      selectTxnKeyLableTypeUpdate,
      selectTxnKeyLableTypeUpdateJSON,
    );
    mockStore.refreshState();
    fixture.detectChanges();
    router = TestBed.get(Router);
    router.initialNavigation();

  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  
  it('function should click submit  button in html', () => {
    component.fg.value.txnKey = value.txnKey;
    component.fg.value.label = value.label;
    component.fg.setErrors({ valid: true });
    component.onSubmit({ value });
    component.isSpinning = true;
    component.submitted = true;
    expect(component.isSpinning).toBeTruthy;
    expect(component.submitted).toBeTruthy;    
    expect(component.isSpinning).toBe(true);
    expect(component.submitted).toBe(true);    
  });

  it('function should click check status in html', () => {
    component.checkStatus();
    expect(component.currentItem).toBeTruthy;
  });
  it('function should click check submited  status in html', () => {
    component.isSubmitted();
    expect(component.submit).toBeTruthy;
  });
  it('function should click set the data on create   in html', () => {
    component.setData(data);
    expect(component.currentItem).toBeTruthy;
  });
  it('function should click update  the data  in html', () => {
    const updatedD = Object.getPrototypeOf(component);
    updatedD._updateFormGroup(updatedData);
    expect(component.fg).toBeTruthy;
  });
  afterEach(() => {
    fixture.destroy();
  });
});
