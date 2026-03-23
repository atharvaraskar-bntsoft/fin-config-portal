import { DestinationTableComponent } from './destination-table.component';
import { CommonModule } from '@angular/common';
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule } from '@angular/forms';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { RouterTestingModule } from '@angular/router/testing';
import { SharedModule } from '@app/shared/shared.module';
import { IAppState } from '@app/store/state/app.state';
import { MemoizedSelector, Store, StoreModule } from '@ngrx/store';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import {
  MissingTranslationHandler,
  TranslateLoader,
  TranslateModule,
  TranslateService,
} from '@ngx-translate/core';
import { of } from 'rxjs';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { HttpLoaderFactory, MyMissingTranslationHandler } from '@app/shared/shared.module';
import { EventEmitter } from '@angular/core';
import { SnotifyService, ToastDefaults } from 'ng-snotify';
import { AlertModule, DatePickerRvModule } from 'bnt';
import { AlertService } from '@app/services/alert.service';
import { version } from 'os';


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

describe('DestinationTableComponent', () => {
  let component: DestinationTableComponent;
  let fixture: ComponentFixture<DestinationTableComponent>;
  let store: Store<DestinationTableComponent>;
  let mockStore: MockStore<IAppState>;
  let setDefaultLangSpy: jasmine.Spy;
  let translate: TranslateService;

  beforeEach(() => {
    const translateService = jasmine.createSpyObj('TranslateService', ['get', 'setDefaultLang']);
    TestBed.configureTestingModule({
      declarations: [DestinationTableComponent],
      providers: [
        SnotifyService,
        AlertService,
        { provide: TranslateService, useClass: translateServiceMock },
        HttpClient,
        { provide: 'SnotifyToastConfig', useValue: ToastDefaults },
        provideMockStore(),
        // other providers
      ],
      imports: [
        CommonModule,
        NgSelectModule,
        FormsModule,
        AlertModule,
        HttpClientModule,
        SharedModule,
        NgSelectModule,
        FormsModule,
        RouterTestingModule,
        HttpClientTestingModule,
        NgxDatatableModule,
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
    fixture = TestBed.createComponent(DestinationTableComponent);
    component = fixture.componentInstance;
    mockStore.refreshState();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('click get should function call check open version in html list ', () => {
    const version = {
      configuredRoutes: null,
      id: 84,
      live: true,
      selectedRuleList: [
        {
          description: 'HttpUrlEncodedAdpRule',
          name: 'HttpUrlEncodedAdpRule',
          priority: '1',
          version: '1',
        },
      ],
      version: 19,
    };
    component.openVersion(version);
    expect(component.showVersion.emit).toBeDefined;
  });
  it('edit data row should function call edit version ', () => {
    const version = {
      configuredRoutes: null,
      id: 84,
      live: true,
      selectedRuleList: [
        {
          description: 'HttpUrlEncodedAdpRule',
          name: 'HttpUrlEncodedAdpRule',
          priority: '1',
          version: '1',
        },
      ],
      version: 81,
    };
    component.edit(version);
    expect(component.editCurrentRouter.emit).toBeDefined;
  });
  it('edit live version should function call click edit version ', () => {
    const version = {
      configuredRoutes: null,
      id: 65,
      live: true,
      selectedRuleList: [
        {
          description: 'HttpUrlEncodedAdpRule',
          name: 'HttpUrlEncodedAdpRule',
          priority: '1',
          version: '1',
        },
      ],
      version: 13,
    };

    component.editLive(version);
    expect(component.toggleLive.emit).toBeDefined;
  });
  // it('get filter should function call event in html row list ', () => {
  //   const router = {
  //     id: 10,
  //     name: 'test',
  //     routeDesc: 'test desc',
  //     routetype: 'service',
  //     routetypevalue: 'AUTH_SERVICE',
  //     routingVersion: [
  //       {
  //         configuredRoutes: null,
  //         id: 75,
  //         live: true,
  //         selectedRuleList: [
  //           {
  //             description: 'HttpUrlEncodedAdpRule',
  //             name: 'HttpUrlEncodedAdpRule',
  //             priority: '1',
  //             version: '8',
  //           },
  //         ],
  //         version: 1,
  //       },
  //     ],
  //     ruleActive: false,
  //     ruletype: null,
  //     serviceType: null,
  //     serviceTypeId: 30,
  //   };
  //   component.deleteRoute(router);
  //   expect(component.deleteCurrentRouter.emit).toBeDefined;
  // });
});
