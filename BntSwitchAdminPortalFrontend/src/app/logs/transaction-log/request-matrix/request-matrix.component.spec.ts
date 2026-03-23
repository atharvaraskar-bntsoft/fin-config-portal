import { EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { IAppState } from '@app/store/state/app.state';
import { MemoizedSelector, StoreModule } from '@ngrx/store';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { of } from 'rxjs';
import { RequestMatrixComponent } from './request-matrix.component';
import { selectRequestMatrix } from '@app/store/selectors/transaction-log.selector';
import { selectViewSettingsList } from '@app/store/selectors/view-settings.selector';
import { NzDrawerModule } from 'ng-zorro-antd/drawer';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { NzCardModule } from 'ng-zorro-antd/card';

class translateServiceMock {
  public onLangChange: EventEmitter<any> = new EventEmitter();
  public onTranslationChange: EventEmitter<any> = new EventEmitter();
  public onDefaultLangChange: EventEmitter<any> = new EventEmitter();
  public get(key: any): any {
    return of(key);
  }
}

const requestMatrixJson = {
  "posTransactionType": "BalanceEnquiry",
  "requestFlag": true,
  "responseFlag": true,
  "transactionId": "00012204uMuYW84e448i",
  "mappingType": "RequestMapping",
  "adapterId": null,
  "fileUri": null,
  "destinations": "l3json",
  "headerLabel": "Spec Request Mapping",
  "logsList": [
    {
      "genericFieldName": "GenericFieldName",
      "request": {
        "key": "Spec Field (IN)",
        "value": "Field Value",
        "text": "Spec   Field  ( In )",
        "path": null,
        "type": null
      },
      "response": {
        "key": "ISO 8583 Field (OUT)",
        "value": "Field Value",
        "text": "Iso  8583  Field  ( Out )",
        "path": null,
        "type": null
      },
      "reqKey": "Spec Field (IN)",
      "reqValue": "Field Value",
      "resKey": "ISO 8583 Field (OUT)",
      "resValue": "Field Value"
    },
    {
      "genericFieldName": "Device Code",
      "request": {
        "key": "terminal_id",
        "value": "02",
        "text": "Terminal Id",
        "path": null,
        "type": null
      },
      "response": {
        "key": "Card Acceptor Terminal Identification",
        "value": "02",
        "text": "Card   Acceptor   Terminal   Identification",
        "path": null,
        "type": null
      },
      "reqKey": "terminal_id",
      "reqValue": "02",
      "resKey": "Card Acceptor Terminal Identification",
      "resValue": "02"
    }
  ]
}

const viewsettingJSON = {
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

describe('RequestMatrixComponent', () => {
  let component: RequestMatrixComponent;
  let fixture: ComponentFixture<RequestMatrixComponent>;
  let mockStore: MockStore<IAppState>;
  let mockselectRequestMatrixList: MemoizedSelector<any, any>;
  let mockselectViewSettingsList: MemoizedSelector<any, any>;
  let setDefaultLangSpy: jasmine.Spy;
  let routerSpy = {navigate: jasmine.createSpy('navigate')};
  beforeEach(() => {
    const translateService = jasmine.createSpyObj('TranslateService', ['get', 'setDefaultLang']);
    TestBed.configureTestingModule({
      declarations: [RequestMatrixComponent],
      providers: [
        TranslateService,
        { provide: Router, useValue: routerSpy },
        { provide: TranslateService, useClass: translateServiceMock },
        provideMockStore(),
      ],
      imports: [
        RouterTestingModule,
        NzDrawerModule,
        NzSpinModule,
        NzCardModule,
        TranslateModule.forRoot({}),
        StoreModule.forRoot({}),
      ],
    }).compileComponents();
  });
  beforeEach(() => {
    mockStore = TestBed.inject(MockStore);
    fixture = TestBed.createComponent(RequestMatrixComponent);
    component = fixture.componentInstance;

    mockselectRequestMatrixList = mockStore.overrideSelector(
      selectRequestMatrix,
      requestMatrixJson,
    );

    mockselectViewSettingsList = mockStore.overrideSelector(
      selectViewSettingsList,
      viewsettingJSON,
    );

    mockStore.refreshState();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should call close function', () => {
    component.close();
    expect(component.visibleMat).toEqual(false);
  });
  it('editCoreProperties fuction should call change the route', () => {
    component.onBack();
    const resMat = Object.getPrototypeOf(component);
    expect(routerSpy?.navigate).toHaveBeenCalledWith(['/logs/transaction-log']);
  });
  afterEach(() => {
    fixture.destroy();
  });
});
