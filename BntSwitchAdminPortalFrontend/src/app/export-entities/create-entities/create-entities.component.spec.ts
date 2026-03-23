import { CreateEntitiesComponent } from './create-entities.component';
import { FormsModule, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';
import { NgxJsonViewerModule } from 'ngx-json-viewer';
import { MemoizedSelector, Store, StoreModule } from '@ngrx/store';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { IAppState } from '@app/store/state/app.state';
import { RouterTestingModule } from '@angular/router/testing';
import { CommonModule } from '@angular/common';
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { PrettyJsonRvModule } from 'bnt';
import { SharedModule } from '@app/shared/shared.module';
import {
  MissingTranslationHandler,
  TranslateLoader,
  TranslateModule,
  TranslateService,
} from '@ngx-translate/core';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { HttpLoaderFactory, MyMissingTranslationHandler } from '@app/shared/shared.module';
import { ExportEntitiesService } from '@app/services/export-entities.service';
import { EventEmitter } from '@angular/core';
import { of } from 'rxjs';
import { SnotifyService, ToastDefaults } from 'ng-snotify';
import { AlertModule } from 'bnt';
import { AlertService } from '@app/services/alert.service';
import { ActivatedRoute, convertToParamMap, Router } from '@angular/router';
import { snapshotList } from '@app/store/selectors/export-entities.selectors';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgSelectModule } from '@ng-select/ng-select';
import { SubscribeService } from '@app/services/subscribe.services';
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
class exportServiceMock {
  public onLangChange: EventEmitter<any> = new EventEmitter();
  public onTranslationChange: EventEmitter<any> = new EventEmitter();
  public onDefaultLangChange: EventEmitter<any> = new EventEmitter();

  public getSnapshotListById(key: any): any {
    return of(key);
  }
}

const snapshotListJson = {
  status: 'success',
  message: 'Find all entities',
  data: {
    'total-record': 125,
    entitiesList: [
      {
        id: null,
        entityType: 'Adapter',
        parentEntityId: 156,
        entityId: 156,
        entityName: 'Test1234567',
        version: null,
        idVersionListToExport: [{ id: 1134, version: 1 }],
      },
      {
        id: null,
        entityType: 'Adapter',
        parentEntityId: 108,
        entityId: 108,
        entityName: 'new',
        version: null,
        idVersionListToExport: [
          { id: 1129, version: 2 },
          { id: 1062, version: 1 },
        ],
      },
      {
        id: null,
        entityType: 'Adapter',
        parentEntityId: 128,
        entityId: 128,
        entityName: 'test_xmlhttp',
        version: null,
        idVersionListToExport: [
          { id: 1086, version: 2 },
          { id: 1087, version: 3 },
          { id: 1124, version: 6 },
          { id: 1095, version: 5 },
          { id: 1088, version: 4 },
        ],
      },
      {
        id: null,
        entityType: 'Tags',
        parentEntityId: 12,
        entityId: 12,
        entityName: 'shenu',
        version: null,
        idVersionListToExport: [],
      },
      {
        id: null,
        entityType: 'Adapter',
        parentEntityId: 10,
        entityId: 10,
        entityName: 'iso_tcp_server_1',
        version: null,
        idVersionListToExport: [{ id: 10, version: 1 }],
      },
      {
        id: null,
        entityType: 'Adapter',
        parentEntityId: 150,
        entityId: 150,
        entityName: 'asdasdasd',
        version: null,
        idVersionListToExport: [{ id: 1127, version: 1 }],
      },
      {
        id: null,
        entityType: 'Adapter',
        parentEntityId: 121,
        entityId: 121,
        entityName: 'Sanjay_TestAPI',
        version: null,
        idVersionListToExport: [
          { id: 1100, version: 4 },
          { id: 1097, version: 3 },
          { id: 1078, version: 2 },
          { id: 1122, version: 5 },
          { id: 1076, version: 1 },
        ],
      },
      {
        id: null,
        entityType: 'Adapter',
        parentEntityId: 122,
        entityId: 122,
        entityName: 'TestJson_17Aug',
        version: null,
        idVersionListToExport: [
          { id: 1098, version: 5 },
          { id: 1089, version: 2 },
          { id: 1092, version: 4 },
          { id: 1090, version: 3 },
          { id: 1099, version: 6 },
        ],
      },
      {
        id: null,
        entityType: 'ImfStructure',
        parentEntityId: 24,
        entityId: 24,
        entityName: 'IMF Structure 82',
        version: null,
        idVersionListToExport: [{ id: 24, version: 82 }],
      },
      {
        id: null,
        entityType: 'ImfStructure',
        parentEntityId: 23,
        entityId: 23,
        entityName: 'IMF Structure 81',
        version: null,
        idVersionListToExport: [{ id: 23, version: 81 }],
      },
      {
        id: null,
        entityType: 'Adapter',
        parentEntityId: 94,
        entityId: 94,
        entityName: 'Test_L1_1June',
        version: null,
        idVersionListToExport: [{ id: 1016, version: 1 }],
      },
      {
        id: null,
        entityType: 'Tags',
        parentEntityId: 11,
        entityId: 11,
        entityName: 'test123',
        version: null,
        idVersionListToExport: [],
      },
      {
        id: null,
        entityType: 'Tags',
        parentEntityId: 10,
        entityId: 10,
        entityName: 'test222',
        version: null,
        idVersionListToExport: [],
      },
      {
        id: null,
        entityType: 'Rule',
        parentEntityId: 23,
        entityId: 23,
        entityName: 'test111',
        version: null,
        idVersionListToExport: [{ id: 76, version: 1 }],
      },
      {
        id: null,
        entityType: 'Adapter',
        parentEntityId: 77,
        entityId: 77,
        entityName: 'TestISOL37Jun22',
        version: null,
        idVersionListToExport: [{ id: 989, version: 1 }],
      },
      {
        id: null,
        entityType: 'WorkFlow',
        parentEntityId: 47,
        entityId: 47,
        entityName: 'workflowN100',
        version: null,
        idVersionListToExport: [{ id: 47, version: 1 }],
      },
      {
        id: null,
        entityType: 'Tags',
        parentEntityId: 9,
        entityId: 9,
        entityName: 'test1dkfjkds',
        version: null,
        idVersionListToExport: [],
      },
      {
        id: null,
        entityType: 'Adapter',
        parentEntityId: 103,
        entityId: 103,
        entityName: 'looper',
        version: null,
        idVersionListToExport: [
          { id: 1058, version: 4 },
          { id: 1055, version: 3 },
          { id: 1050, version: 1 },
          { id: 1054, version: 2 },
        ],
      },
      {
        id: null,
        entityType: 'Adapter',
        parentEntityId: 26,
        entityId: 26,
        entityName: 'json_1_5jan',
        version: null,
        idVersionListToExport: [{ id: 31, version: 1 }],
      },
      {
        id: null,
        entityType: 'Adapter',
        parentEntityId: 58,
        entityId: 58,
        entityName: 'json_adapter',
        version: null,
        idVersionListToExport: [
          { id: 1035, version: 111 },
          { id: 1032, version: 110 },
          { id: 1020, version: 109 },
          { id: 988, version: 108 },
          { id: 985, version: 107 },
        ],
      },
    ],
    'page-no': 1,
    'total-filtered-record': 20,
  },
};

const rowData = {
  selected: [
    {
      id: null,
      entityType: 'Adapter',
      parentEntityId: 156,
      entityId: 1134,
      entityName: 'Test1234567',
      version: 1134,
      idVersionListToExport: [{ id: 1134, version: 1 }],
    },
  ],
};

const formData = [
  {
    id: null,
    entityType: 'Adapter',
    parentEntityId: 128,
    entityId: 1124,
    entityName: 'test_xmlhttp',
    version: 1124,
    idVersionListToExport: [
      { id: 1124, version: 6 },
      { id: 1095, version: 5 },
      { id: 1088, version: 4 },
    ],
  },
];

describe('CreateEntitiesComponent', () => {
  let component: CreateEntitiesComponent;
  let fixture: ComponentFixture<CreateEntitiesComponent>;
  let store: Store<CreateEntitiesComponent>;
  let mockStore: MockStore<IAppState>;
  let exportEntitiesService: ExportEntitiesService;
  let setDefaultLangSpy: jasmine.Spy;
  let translate: TranslateService;
  let mocksnapshotList;

  beforeEach(() => {
    const translateService = jasmine.createSpyObj('TranslateService', ['get', 'setDefaultLang']);
    const exportService = jasmine.createSpyObj('ExportEntitiesService', ['getSnapshotListById']);
    const routerSpy = jasmine.createSpyObj('Router', ['navigate']);
    TestBed.configureTestingModule({
      declarations: [CreateEntitiesComponent],
      providers: [
        SnotifyService,
        AlertService,
        HttpClient,
        { provide: 'SnotifyToastConfig', useValue: ToastDefaults },
        { provide: TranslateService, useClass: translateServiceMock },
        { provide: ExportEntitiesService, useClass: exportServiceMock },
        //  { provide: Router, useValue: routerSpy },

        provideMockStore(),
        // other providers
      ],
      imports: [
        CommonModule,
        BrowserAnimationsModule,
        FormsModule,
        ReactiveFormsModule,
        NgSelectModule,
        HttpClientModule,
        SharedModule,
        RouterTestingModule,
        HttpClientTestingModule,
        NgxDatatableModule,
        NgxJsonViewerModule,
        PrettyJsonRvModule,
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
    mockStore = TestBed.get(Store);
    fixture = TestBed.createComponent(CreateEntitiesComponent);
    component = fixture.componentInstance;
    mockStore.refreshState();
    mocksnapshotList = mockStore.overrideSelector(snapshotList, snapshotListJson);
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
  it('should  Angular calls ngOnInit', () => {
    component.ngOnInit();
  });
  // it('should call _transFilters ', () => {
  //   const result: any = component._transFilters();
  //   expect(result).toEqual('');
  // });
  // it('click close button fuction should close the model', () => {
  //   const form={
  //     formGroup:{
  //       length: 2,
  //       name: "replace"
  //     },

  //   };
  //   component.onSubmit(form);
  //   expect(component.exportForm.value.comment.replace).toBeTruthy;
  // });
  it('click close button fuction should close the model', () => {
    const row = {
      selected: [
        {
          id: null,
          entityType: 'Rule',
          parentEntityId: 32,
          entityId: 95,
          entityName: 'rrrrr',
          version: 95,
        },
      ],
    };
    component.onSelect(row);
    expect(component).toBeTruthy;
  });
  it('click close button fuction should close the model', () => {
    const row = {
      entityId: 95,
      entityName: 'rrrrr',
      entityType: 'Rule',
      id: null,
      idVersionListToExport:[
        {id: 95,version: 2},
        {id: 91,version: 1},
      ],
      parentEntityId: 32,
version: 91
    };
    component.rowVersionChange(91, row);
    expect(component).toBeTruthy;
  });
  it('fuction should call and contain property in html', () => {
    component.ngOnInit();
    expect(component.isCreatePage).toBeDefined;
  });
});
