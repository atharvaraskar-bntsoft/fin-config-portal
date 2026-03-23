import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TreeStructureConstantComponent } from './tree-structure-constant.component';
import { RouterTestingModule } from '@angular/router/testing';
import { L1AdapterService } from '@app/services/l1-adapter.service';
import { IAppState } from '@app/store/state/app.state';
import { MemoizedSelector, Store, StoreModule } from '@ngrx/store';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { MissingTranslationHandler, TranslateLoader, TranslateModule, TranslateService } from '@ngx-translate/core';
import { Observable, of } from 'rxjs';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { AlertService } from '@app/services/alert.service';
import { SnotifyService, ToastDefaults } from 'ng-snotify';
import { AdapterCommonService } from '@app/services/adapter-common.service';
import { CommonModule } from '@angular/common';
import { HttpLoaderFactory, MyMissingTranslationHandler, SharedModule } from '@app/shared/shared.module';
import { AlertModule } from 'bnt';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

const jsonData =[{
  status: "success",
  message: "Find MessageContextFields JSON",
  data: {
    messageContextFieldsByVersion: {
      "name": "Message_Context",
      "type": "fields",
      "alias": "Message context",
      "nestedName": "Message_Context",
      "useCase": null,
      "datatype": null,
      "data": null,
      "attributes": [
        {
          "name": "transaction_type",
          "type": "field",
          "alias": "TransactionType",
          "nestedName": "transaction_type",
          "useCase": "1",
          "datatype": null,
          "data": [
            "Cash Withdrawal"
          ],
          "attributes": null,
          "operator": [
            {
              "text": "Equal",
              "value": "equal",
              "key": "value"
            },
            {
              "text": "Null",
              "value": "null",
              "key": "value"
            }
          ],
          "fieldsType": null
        },
        {
          "name": "payment_method",
          "type": "field",
          "alias": "PaymentMethod",
          "nestedName": "payment_method",
          "useCase": "1",
          "datatype": null,
          "data": [
            "CARD",
            "GIFT_CARD",
            "Payment_Token"
          ],
          "attributes": null,
          "operator": [
            {
              "text": "Equal",
              "value": "equal",
              "key": "value"
            },
            {
              "text": "Null",
              "value": "null",
              "key": "value"
            }
          ],
          "fieldsType": null
        },
        {
          "name": "internal_processing_code",
          "type": "field",
          "alias": "IPC",
          "nestedName": "internal_processing_code",
          "useCase": "1",
          "datatype": null,
          "data": [
            "ACCOUNT  LISTING",
            "LOST_CARD_PKP",
            "new value",
            "value"
          ],
          "attributes": null,
          "operator": [
            {
              "text": "Equal",
              "value": "equal",
              "key": "value"
            },
            {
              "text": "Like",
              "value": "like",
              "key": "pattern"
            },
            {
              "text": "In",
              "value": "in",
              "key": "value"
            },
            {
              "text": "Null",
              "value": "null",
              "key": "value"
            }
          ],
          "fieldsType": null
        },
        {
          "name": "transaction_id",
          "type": "field",
          "alias": "TransactionId",
          "nestedName": "transaction_id",
          "useCase": "1",
          "datatype": null,
          "data": [],
          "attributes": null,
          "operator": [
            {
              "text": "Equal",
              "value": "equal",
              "key": "value"
            },
            {
              "text": "Like",
              "value": "like",
              "key": "pattern"
            },
            {
              "text": "Null",
              "value": "null",
              "key": "value"
            }
          ],
          "fieldsType": null
        },
        {
          "name": "synthetic",
          "type": "field",
          "alias": "Synthetic",
          "nestedName": "synthetic",
          "useCase": "1",
          "datatype": null,
          "data": [],
          "attributes": null,
          "operator": [
            {
              "text": "Equal",
              "value": "equal",
              "key": "value"
            },
            {
              "text": "Like",
              "value": "like",
              "key": "pattern"
            },
            {
              "text": "In",
              "value": "in",
              "key": "value"
            },
            {
              "text": "GreaterThanEqual",
              "value": "greaterThanEqual",
              "key": "value"
            },
            {
              "text": "LessThanEqual",
              "value": "lessThanEqual",
              "key": "value"
            },
            {
              "text": "Null",
              "value": "null",
              "key": "value"
            }
          ],
          "fieldsType": null
        },
        {
          "name": "Message_Exchanges",
          "type": "fields",
          "alias": "Message exchanges",
          "nestedName": "Message_Exchanges",
          "useCase": null,
          "datatype": null,
          "data": null,
          "attributes": [
            {
              "name": "adapter_id",
              "type": "field",
              "alias": "Adapter",
              "nestedName": "adapter_id",
              "useCase": "2",
              "datatype": null,
              "data": [   ],
              "attributes": null,
              "operator": [
                {
                  "text": "Equal",
                  "value": "equal",
                  "key": "value"
                },
                {
                  "text": "Like",
                  "value": "like",
                  "key": "pattern"
                },
                {
                  "text": "In",
                  "value": "in",
                  "key": "value"
                },
                {
                  "text": "StartsWith",
                  "value": "starts_with",
                  "key": "value"
                },
                {
                  "text": "RegEx",
                  "value": "pattern",
                  "key": "pattern"
                },
                {
                  "text": "GreaterThan",
                  "value": "greaterThan",
                  "key": "value"
                },
                {
                  "text": "LessThan",
                  "value": "lessThan",
                  "key": "value"
                },
                {
                  "text": "GreaterThanEqual",
                  "value": "greaterThanEqual",
                  "key": "value"
                },
                {
                  "text": "LessThanEqual",
                  "value": "lessThanEqual",
                  "key": "value"
                },
                {
                  "text": "Null",
                  "value": "null",
                  "key": "value"
                }
              ],
              "fieldsType": null
            }
          ],
          "operator": null,
          "fieldsType": null
        }
      ],
      "operator": null,
      "fieldsType": null
    }
  }
}]
const data = [{
  name: "transaction_type",
  type: "field",
  alias: "TransactionType",
  nestedName: "transaction_type",
  useCase: "1",
  datatype: null,
  data: [
    "Cash Withdrawal"
  ],
  attributes: null,
  operator: [
    {
      text: "Equal",
      value: "equal",
      key: "value"
    },
    {
      text: "Like",
      value: "like",
      key: "pattern"
    },
    {
      text: "In",
      value: "in",
      key: "value"
    },
    {
      text: "StartsWith",
      value: "starts_with",
      key: "value"
    },
    {
      text: "RegEx",
      value: "pattern",
      key: "pattern"
    },
    {
      text: "GreaterThan",
      value: "greaterThan",
      key: "value"
    },
    {
      text: "LessThan",
      value: "lessThan",
      key: "value"
    },
    {
      text: "GreaterThanEqual",
      value: "greaterThanEqual",
      key: "value"
    },
    {
      text: "LessThanEqual",
      value: "lessThanEqual",
      key: "value"
    },
    {
      text: "Null",
      value: "null",
      key: "value"
    }
  ],
  fieldsType: null
}];
const dataat = [{
  name: "transaction_type",
  type: "field",
  alias: "TransactionType",
  nestedName: "transaction_type",
  useCase: "1",
  datatype: null,
  data: [
    "Cash Withdrawal"
  ],
  attributes: null,
  operator: [
    {
      text: "Equal",
      value: "equal",
      key: "value"
    },
    {
      text: "Like",
      value: "like",
      key: "pattern"
    },
    {
      text: "In",
      value: "in",
      key: "value"
    },
    {
      text: "StartsWith",
      value: "starts_with",
      key: "value"
    },
    {
      text: "RegEx",
      value: "pattern",
      key: "pattern"
    },
    {
      text: "GreaterThan",
      value: "greaterThan",
      key: "value"
    },
    {
      text: "LessThan",
      value: "lessThan",
      key: "value"
    },
    {
      text: "GreaterThanEqual",
      value: "greaterThanEqual",
      key: "value"
    },
    {
      text: "LessThanEqual",
      value: "lessThanEqual",
      key: "value"
    },
    {
      text: "Null",
      value: "null",
      key: "value"
    }
  ],
  fieldsType: null
}];
const value = " ";
const event ="synthetic%1";
describe('TreeStructureConstantComponent', () => {
  let component: TreeStructureConstantComponent;
  let fixture: ComponentFixture<TreeStructureConstantComponent>;
  let mockStore: MockStore<IAppState>;
  let setDefaultLangSpy: jasmine.Spy;

  beforeEach(() => {
    const translateService = jasmine.createSpyObj('TranslateService', ['get', 'setDefaultLang']);
    TestBed.configureTestingModule({
      declarations: [TreeStructureConstantComponent],
      providers: [
        AlertService,
        SnotifyService,
        L1AdapterService,
        AdapterCommonService,
        { provide: 'SnotifyToastConfig', useValue: ToastDefaults },
        provideMockStore(),
        // other providers
      ],
      imports: [
        FormsModule,
        CommonModule,
        SharedModule,
        AlertModule,
        // TabsModule,
        RouterTestingModule,
        NgxDatatableModule,
        HttpClientTestingModule,
        StoreModule.forRoot({}),
        TranslateModule.forRoot({
          loader: {
            deps: [HttpClient],
            provide: TranslateLoader,
            useFactory: HttpLoaderFactory,
          },
          missingTranslationHandler: {
            provide: MissingTranslationHandler,
            useClass: MyMissingTranslationHandler,
          },
          useDefaultLang: true,
        }),
      ],

    }).compileComponents();
    setDefaultLangSpy = translateService.get.and.returnValue(of([]));
    mockStore = TestBed.get(Store);
    fixture = TestBed.createComponent(TreeStructureConstantComponent);
    component = fixture.componentInstance;
    component.jsonData = jsonData;
    mockStore.refreshState();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('onChange fuction should call', () => {
    component.onChange(event);
    expect(component.onChange).toBeDefined;
    expect(component.onChange).toHaveBeenCalled;
  });
  it('selectImfFn fuction should call', () => {
    component.selectImfFn(jsonData);
    expect(component.selectImfFn).toBeDefined;
    expect(component.selectImfFn).toHaveBeenCalled;
  });
  it('callfn fuction should call', () => {
    component.callfn(data);
    expect(component.callfn).toBeDefined;
    expect(component.callfn).toHaveBeenCalled;
  });
  it('transformLogic fuction should call', () => {
    component.transformLogic(data,value);
    expect(component.transformLogic).toBeDefined;
  });
 
});
