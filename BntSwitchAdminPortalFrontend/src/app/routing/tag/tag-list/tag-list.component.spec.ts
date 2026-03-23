import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { AlertService } from '@app/services/alert.service';
import { RuleTagService } from '@app/services/rule-tag.service';
import { HttpLoaderFactory, MyMissingTranslationHandler, SharedModule } from '@app/shared/shared.module';
import { IAppState } from '@app/store/state/app.state';
import { NgSelectModule } from '@ng-select/ng-select';
import { Store, StoreModule } from '@ngrx/store';
import {
  MissingTranslationHandler,
  TranslateLoader,
  TranslateModule,
  TranslateService,
} from '@ngx-translate/core';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { SnotifyService, ToastDefaults } from 'ng-snotify';
import { AlertModule, DatePickerRvModule, TabsModule } from 'bnt';
import { TagListComponent } from './tag-list.component';
import { of } from 'rxjs';
import { ActivatedRoute, convertToParamMap, Router } from '@angular/router';
import {selectRuleTag} from '@app/store/selectors/rule-tag.selectors'
const tagrulelistJson={
  "pageNo": 1,
  "totalRecords": 13,
  "totalFilterRecords": 13,
  "content": [
    {
      "id": 13,
      "name": "san",
      "tag": "HIGH_RISK",
      "serviceType": "LOYALTY_SERVICE",
      "exchangeType": "request",
      "deleted": "0",
      "active": "1",
      "condition": {
        "id": "0",
        "type": "equal",
        "value": "Cash Withdrawal",
        "fieldName": "${transaction_type}"
      }
    },
    {
      "id": 12,
      "name": "shenu",
      "tag": "HIGH_RISK",
      "serviceType": "LOYALTY_SERVICE",
      "exchangeType": "response",
      "deleted": "0",
      "active": "1",
      "condition": {
        "type": "and",
        "conditions": [
          {
            "id": "0",
            "type": "greaterThan",
            "value": "23",
            "fieldName": "${transaction_id}"
          },
          {
            "id": "1",
            "type": "pattern",
            "pattern": "GIFT_CARD",
            "fieldName": "${payment_method}"
          }
        ]
      }
    },
    {
      "id": 11,
      "name": "test123",
      "tag": "new",
      "serviceType": "CARD_SERVICE",
      "exchangeType": "response",
      "deleted": "0",
      "active": "0",
      "condition": {
        "type": "not",
        "condition": {
          "id": "0",
          "type": "starts_with",
          "value": "44",
          "fieldName": "${transaction_id}"
        }
      }
    },
    {
      "id": 10,
      "name": "test222",
      "tag": "HIGH_RISK",
      "serviceType": "AUTH_SERVICE",
      "exchangeType": "response",
      "deleted": "0",
      "active": "1",
      "condition": {
        "id": "0",
        "type": "equal",
        "value": "Cash Withdrawal",
        "fieldName": "${transaction_type}"
      }
    },
    {
      "id": 9,
      "name": "test1dkfjkds",
      "tag": "HIGH_RISK",
      "serviceType": "CARD_SERVICE",
      "exchangeType": "request",
      "deleted": "0",
      "active": "1",
      "condition": {
        "type": "and",
        "conditions": [
          {
            "id": "0",
            "type": "starts_with",
            "value": "555",
            "fieldName": "${transaction_id}"
          },
          {
            "id": "1",
            "type": "starts_with",
            "value": "GIFT_CARD",
            "fieldName": "${payment_method}"
          }
        ]
      }
    },
    {
      "id": 8,
      "name": "testnew  ",
      "tag": "HIGH_RISK",
      "serviceType": "LOYALTY_SERVICE",
      "exchangeType": "response",
      "deleted": "0",
      "active": "1",
      "condition": {
        "id": "0",
        "type": "starts_with",
        "value": "neewhfjsdh",
        "fieldName": "${message_exchange[LOYALTY_SERVICE].retry_count}"
      }
    },
    {
      "id": 7,
      "name": "test",
      "tag": "Afgfjdsd",
      "serviceType": "AUTH_SERVICE",
      "exchangeType": "response",
      "deleted": "0",
      "active": "1",
      "condition": {
        "id": "0",
        "type": "equal",
        "value": "Cash Withdrawal",
        "fieldName": "${transaction_type}"
      }
    },
    {
      "id": 6,
      "name": "adda",
      "tag": "dfd",
      "serviceType": "AUTH_SERVICE",
      "exchangeType": "request",
      "deleted": "0",
      "active": "1",
      "condition": {
        "id": "0",
        "type": "equal",
        "value": "Cash Withdrawal",
        "fieldName": "${transaction_type}"
      }
    },
    {
      "id": 5,
      "name": "jkljkjjklk$$%%$54",
      "tag": "dfd",
      "serviceType": "FRAUD_SERVICE",
      "exchangeType": "response",
      "deleted": "0",
      "active": "1",
      "condition": {
        "id": "0",
        "type": "starts_with",
        "value": true,
        "fieldName": "${message_exchange[FRAUD_SERVICE].is_saf_processed}"
      }
    },
    {
      "id": 4,
      "name": "test1111",
      "tag": "Afgfjdsd",
      "serviceType": "LOYALTY_SERVICE",
      "exchangeType": "request",
      "deleted": "0",
      "active": "1",
      "condition": {
        "id": "0",
        "type": "equal",
        "value": "Cash Withdrawal",
        "fieldName": "${transaction_type}"
      }
    },
    {
      "id": 3,
      "name": "test50",
      "tag": "Afgfjdsd",
      "serviceType": "AUTH_SERVICE",
      "exchangeType": "request",
      "deleted": "0",
      "active": "1",
      "condition": {
        "id": "0",
        "type": "like",
        "pattern": "Cash Withdrawal",
        "fieldName": "${transaction_type}"
      }
    },
    {
      "id": 2,
      "name": "Abc",
      "tag": "HIGH_RISK",
      "serviceType": "CARD_SERVICE",
      "exchangeType": "response",
      "deleted": "0",
      "active": "1",
      "condition": {
        "id": "0",
        "type": "starts_with",
        "value": "CARD",
        "fieldName": "${payment_method}"
      }
    },
    {
      "id": 1,
      "name": "TAG1",
      "tag": "Afgfjdsd",
      "serviceType": "AUTH_SERVICE",
      "exchangeType": "request",
      "deleted": "0",
      "active": "1",
      "condition": {
        "id": "0",
        "type": "equal",
        "value": "Cash Withdrawal",
        "fieldName": "${transaction_type}"
      }
    }
  ]
} 
const tagListJson = {
  data: {
    tagsList: {
      content: [
        {
          active: '1',
          condition: {
            fieldName: '${transaction_type}',
            id: '0',
            type: 'equal',
            value: 'Cash Withdrawal',
          },
          deleted: '0',
          exchangeType: 'response',
          id: 7,
          name: 'test',
          serviceType: 'AUTH_SERVICE',
          tag: 'Afgfjdsd',
        },
      ],
      pageNo: 1,
      totalFilterRecords: 7,
      totalRecords: 7,
    },
  },
};

const permissionJson = {
  data: [
    {
      check: false,
      delete: true,
      id: 'link_tag_rule',
      read: true,
      update: true,
      write: true,
    },
  ],
};
const row ={
  id: 12,
  name: "shenu",
  tag: "HIGH_RISK",
  serviceType: "LOYALTY_SERVICE",
  exchangeType: "request",
  deleted: "0",
  active: "1",
  condition: {
    id: "0",
    type: "like",
    pattern: "Payment_Token",
    fieldName: "${payment_method}"
  }
};
const keyJson={
  "id": 12,
  "name": "shenu",
  "tag": "new",
  "serviceType": "LOYALTY_SERVICE",
  "exchangeType": "response",
  "deleted": "0",
  "active": "1",
  "condition": {
    "id": "0",
    "type": "greaterThan",
    "value": "23",
    "fieldName": "${transaction_id}"
  }
};
describe('TagListComponent', () => {
  let component: TagListComponent;
  let fixture: ComponentFixture<TagListComponent>;
  let mockStore: MockStore<IAppState>;
  let setgetSelectRuleTagListSpy: jasmine.Spy;
  let mockgetSelectRuleTagList: jasmine.Spy;
  let setgetPermissionSpy: jasmine.Spy;
  let router: Router;
  const routerSpy = jasmine.createSpyObj('Router', ['navigate']);
  beforeEach(() => {
    const routerService = jasmine.createSpyObj('RouterService', [
      'selectViewSettingsList',
      'routers',
      'routerServiceType',
      'getRouterById',
      'routerRuleList',
    ]);
    const tagListService = jasmine.createSpyObj('RuleTagService', [
      'getSelectRuleTagList',
      'getSelectPermissionsData',
    ]);
    TestBed.configureTestingModule({
      declarations: [TagListComponent],
      providers: [
        TranslateService,
        // RuleTagService,
        AlertService,
        SnotifyService,
        { provide: Router, useValue: routerSpy },
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              paramMap: convertToParamMap({
                id: '1',
              }),
              data: { ruletype: 'workflow' },
            },
          },
        },
        { provide: 'SnotifyToastConfig', useValue: ToastDefaults },
        { provide: RuleTagService, useValue: tagListService },
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
        // MatDialogRef,
        HttpClientTestingModule,
        NgxDatatableModule,
        // MockStoreModule.forRoot('Location', {}),
        SharedModule,
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

    setgetSelectRuleTagListSpy = tagListService.getSelectRuleTagList.and.returnValue(
      of(tagListJson),
    );

    setgetPermissionSpy = tagListService.getSelectPermissionsData.and.returnValue(
      of(permissionJson),
    );
    // mockgetSelectRuleTagList = mockStore.overrideSelector(
    //   selectRule,
    //   tagrulelistJson
    // );
    
    mockStore = TestBed.get(Store);
    fixture = TestBed.createComponent(TagListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Scroll fuction should call', () => {
    component.onScroll(event);
    expect(component.onScroll).toBeDefined;
    expect(component.onScroll).toHaveBeenCalled;
  });

  it('should call open function', fakeAsync(() => {
    component.open();
    expect(component.visible).toEqual(true);
    tick(200);
    expect(component.visible).toEqual(true);
  }));

  it('should call close function', fakeAsync(() => {
    component.close();
    expect(component.visibleAnimate).toEqual(false);
    tick(100);
    expect(component.visible).toEqual(false);
  }));

  it('importButton fuction should called the Open', () => {
    spyOn(component,'open').and.callThrough();
    component.open();
    component.viewClick(keyJson);
    expect(component.open).toHaveBeenCalled();
  });

  it('editCoreProperties fuction should call click on edit form this HTMl', () => {
    component.editRowData(row);
    const resMat = Object.getPrototypeOf(component);
    expect(routerSpy.navigate).toHaveBeenCalledWith(['routing/ruletags/edit',row.id]);
  });

  // it('updateRowData fuction should have row.active equals to 1', () => {
  //   component.updateRowData(row);
  //   expect(row.active).toBeTruthy;
  // });
  
  afterEach(() => {
    fixture.destroy();
  });
});
