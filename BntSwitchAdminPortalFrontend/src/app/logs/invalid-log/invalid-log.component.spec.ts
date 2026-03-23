import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { ILocationState } from '@app/store/state/location.state';
import { MemoizedSelector, Store, StoreModule } from '@ngrx/store';
import { AlertModule, TabsModule, DatePickerRvModule } from 'bnt';
import { InvalidLogService } from '@app/services/invalid-log.service';
import { SharedModule } from '@app/shared/shared.module';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MockStoreModule } from '@app/tests/tests.module';
//import { ImportFileModule } from '@app/import-file/import-file.module';
import { InvalidLogComponent } from './invalid-log.component';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { of } from 'rxjs';
import { MissingTranslationHandler, TranslateLoader, TranslateModule, TranslateService } from '@ngx-translate/core';
import { SnotifyService, ToastDefaults } from 'ng-snotify';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { selectInvalidLog } from '@app/store/selectors/invalid-log.selector';
import { HttpLoaderFactory, MyMissingTranslationHandler } from '@app/shared/shared.module';
import { IAppState } from '@app/store/state/app.state';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

const invalidLogJSON = {
  status: "success",
  message: null,
  data: {
    resultList: [
      {
        deleted: "0",
        dependentData: {
          name: "AUTH_SERVICE",
          safingCondition: "saf_34_45",
          status: {
            executionStatus: "COMPLETED",
            routeId: "21",
            safingStage: "SUCCESS",
            serviceId: "070fb392-0d08-425e-90e4-4f863017c4f6",
          },
          type: "executeService"
        },
        id: "00012204t9WW684x448S",
        lastAttemptTime: 1650363699000,
        nextAttemptTime: null,
        noOfAttempts: 2,
        route: "",
        status: {
          id: "SUCCESS",
          name: "Success"
        },
      },
    ],
    'total-record': 1,
    'page-no': 1,
    'total-filtered-record': 1,
  },
};

const rowData =
{
  deleted: "0",
  dependentData: {
    name: "AUTH_SERVICE",
    safingCondition: "saf_34_45",
    status: {
      executionStatus: "COMPLETED",
      routeId: "21",
      safingStage: "SUCCESS",
      serviceId: "070fb392-0d08-425e-90e4-4f863017c4f6",
    },
    type: "executeService"
  },
  id: "00012204t9WW684x448S",
  lastAttemptTime: 1650363699000,
  nextAttemptTime: null,
  noOfAttempts: 2,
  route: "",
  status: {
    id: "SUCCESS",
    name: "Success"
  },
}

describe('KeysComponent', () => {
  let component: InvalidLogComponent;
  let fixture: ComponentFixture<InvalidLogComponent>;
  let mockStore: MockStore<IAppState>;
  let mockselectInvalidLog: MemoizedSelector<any, any>;
  let store: Store<ILocationState>;
  let setDefaultLangSpy: jasmine.Spy;
  let invalidLogService: InvalidLogService

  beforeEach((() => {
    const translateService = jasmine.createSpyObj('TranslateService', ['get', 'setDefaultLang']);
    TestBed.configureTestingModule({
      declarations: [InvalidLogComponent],
      providers: [{ provide: TranslateService, useValue: translateService }, SnotifyService, HttpClient,
      { provide: 'SnotifyToastConfig', useValue: ToastDefaults },
        InvalidLogService,
      { provide: InvalidLogService, useValue: invalidLogService },
      provideMockStore(),
        // other providers
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
        StoreModule.forRoot({}),
        //ImportFileModule,
      ],
      schemas:[CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();
    setDefaultLangSpy = translateService.get.and.returnValue(of([]));
    mockStore = TestBed.get(Store);
    fixture = TestBed.createComponent(InvalidLogComponent);
    component = fixture.componentInstance;
    mockselectInvalidLog = mockStore.overrideSelector(selectInvalidLog, invalidLogJSON);
    mockStore.refreshState();
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should  Angular calls ngOnInit', () => {
    component.ngOnInit();
  });


  it("should render Table", () => {
    const ngxdatatable: HTMLElement = fixture.nativeElement.querySelector('ngx-datatable');
    const text = ngxdatatable.innerText;
    expect(text).toBeTruthy();
  });

  it('Component should contain Property', () => {
    expect(component.loading).toBe(false);
    expect(component.rowHeight).toBe(75);
    expect(component.headerHeight).toBe(40);
    expect(component.request).toBe(false);
    expect(component.currentPagination).toBe('20');
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

  it('keyDetails fuction should call form HTMl', () => {
    component.keyDetails(rowData);
    expect(component.keyDetails).toBeDefined;
    expect(component.keyDetails).toHaveBeenCalled;
  });

  afterEach(() => {
    fixture.destroy();
  });

});
