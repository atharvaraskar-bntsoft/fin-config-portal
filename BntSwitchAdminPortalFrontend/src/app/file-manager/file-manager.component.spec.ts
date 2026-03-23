
import { FileManagerComponent } from './file-manager.component';
import { MemoizedSelector, Store, StoreModule } from '@ngrx/store';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { IAppState } from '@app/store/state/app.state';
import { RouterTestingModule } from '@angular/router/testing';
import { CommonModule } from '@angular/common';
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { SharedModule } from '@app/shared/shared.module';
import { MissingTranslationHandler, TranslateLoader, TranslateModule, TranslateService } from '@ngx-translate/core';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { HttpLoaderFactory, MyMissingTranslationHandler } from '@app/shared/shared.module';

describe('FileManagerComponent', () => {
  let component: FileManagerComponent;
  let fixture: ComponentFixture<FileManagerComponent>;
  let store: Store<FileManagerComponent>;
  let mockStore: MockStore<IAppState>;

  beforeEach((() => {
    TestBed.configureTestingModule({
      declarations: [FileManagerComponent],
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
    fixture = TestBed.createComponent(FileManagerComponent);
    component = fixture.componentInstance;
    mockStore.refreshState();
    fixture.detectChanges();
  }));


  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('click button fuction should call navigate up', () => {
       component.navigateUp();
      expect(component.elementMoved.emit).toBeTruthy;
     });
     it('click button fuction should call navigate up', () => {
      const element={};
      component.openNewFile(element);
     expect(component.fileDetails.emit).toBeTruthy;
    });
    // it('click fuction call contain loader in html', () => {
    //   const changes = {};
    //   component.ngOnChanges(changes);
    //   expect(component).toBeTruthy;
    // });
    
    
});
