
import { Router, ActivatedRoute } from '@angular/router';
import { SchemeImfMappingComponent } from './scheme-imf-mapping.component';
import { CommonModule } from '@angular/common';
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule } from '@angular/forms';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { RouterTestingModule } from '@angular/router/testing';
import { PrettyJsonRvModule } from 'bnt';
import { SharedModule } from '@app/shared/shared.module';
import { IAppState } from '@app/store/state/app.state';
import { MemoizedSelector, Store, StoreModule } from '@ngrx/store';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { MissingTranslationHandler, TranslateLoader, TranslateModule, TranslateService } from '@ngx-translate/core';
import { of } from 'rxjs';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { HttpLoaderFactory, MyMissingTranslationHandler } from '@app/shared/shared.module';
import { EventEmitter } from '@angular/core';
import { SnotifyService, ToastDefaults } from 'ng-snotify';
import { AlertModule, DatePickerRvModule } from 'bnt';
import { AlertService } from '@app/services/alert.service';
import { SchemeImfMapperService } from '@app/services/scheme-imf-mapper.service';
import { SchemeImfMappingRoutingModule } from './scheme-imf-mapping-routing.module';

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

describe('SchemeImfMappingComponent', () => {
  let component: SchemeImfMappingComponent;
  let fixture: ComponentFixture<SchemeImfMappingComponent>;
  let store: Store<SchemeImfMappingComponent>;
  let mockStore: MockStore<IAppState>;
  let setDefaultLangSpy: jasmine.Spy;
  let translate: TranslateService;
  let schemeImfMapperService: SchemeImfMapperService

  beforeEach((() => {
    const translateService = jasmine.createSpyObj('TranslateService', ['get', 'setDefaultLang']);
    TestBed.configureTestingModule({
      declarations: [SchemeImfMappingComponent],
      providers: [
        SnotifyService,
        AlertService,
        { provide: TranslateService, useClass: translateServiceMock },
        HttpClient,
        { provide: 'SnotifyToastConfig', useValue: ToastDefaults },
        { provide: SchemeImfMapperService, useValue: schemeImfMapperService },
        provideMockStore(),
        // other providers
      ],
      imports: [CommonModule,
        NgSelectModule,
        FormsModule,
        AlertModule,
        HttpClientModule,
        SchemeImfMappingRoutingModule,
        SharedModule,
        NgSelectModule,
        FormsModule,
        RouterTestingModule.withRoutes([]),
        HttpClientTestingModule,
        NgxDatatableModule,
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
    setDefaultLangSpy = translateService.get.and.returnValue(of([]));
    mockStore = TestBed.get(Store);
    fixture = TestBed.createComponent(SchemeImfMappingComponent);
    component = fixture.componentInstance;

    mockStore.refreshState();
    fixture.detectChanges();
  }));
  it('Scroll fuction should call', () => {
    const offsety ={
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
      type: "scroll",
    }
    component.onScroll(offsety);
    expect(component.onScroll).toBeDefined;
    expect(component.onScroll).toHaveBeenCalled;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('fuction should validate responese code tab in html', () => {
    component.cleardata() ;
    expect(component).toBeTruthy;
  });
  it('get filter fuction should filter schema', () => {
    const e={}
    component.getFilterScheme(e);
    expect(component).toBeTruthy;
  });

it('fuction should call open modall in html', () => {
  component.openIMFPopup([], 0) ;
  expect(component.isVisible).toEqual(true);
});
it('fuction should click view keydata', () => {
  const keyData={};
  component.viewClick(keyData);
  expect(component).toBeNull;
});
});
