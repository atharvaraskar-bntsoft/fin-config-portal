import { ExportEntitiesComponent } from './export-entities.component';
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
import { MissingTranslationHandler, TranslateLoader, TranslateModule, TranslateService } from '@ngx-translate/core';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { HttpLoaderFactory, MyMissingTranslationHandler } from '@app/shared/shared.module';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('ExportEntitiesComponent', () => {
  let component: ExportEntitiesComponent;
  let fixture: ComponentFixture<ExportEntitiesComponent>;
  let store: Store<ExportEntitiesComponent>;
  let mockStore: MockStore<IAppState>;

  beforeEach((() => {
    const translateService = jasmine.createSpyObj('TranslateService', ['get', 'setDefaultLang']);
    TestBed.configureTestingModule({
      declarations: [ExportEntitiesComponent],
      providers: [
        HttpClient,
        provideMockStore(),
        // other providers
      ],
      imports: [CommonModule,
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
      schemas:[CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();
    mockStore = TestBed.get(Store);
    fixture = TestBed.createComponent(ExportEntitiesComponent);
    component = fixture.componentInstance;
    mockStore.refreshState();
    fixture.detectChanges();
  }));


  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should  Angular calls ngAfterViewInit', () => {
    component.ngAfterViewInit();
  });
  
});
