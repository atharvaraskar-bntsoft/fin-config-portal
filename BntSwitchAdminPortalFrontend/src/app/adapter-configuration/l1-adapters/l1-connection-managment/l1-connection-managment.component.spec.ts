import { L1ConnectionManagmentComponent } from './l1-connection-managment.component';
import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { AuditLogService } from '@app/services/audit-log.service';
import { SharedModule } from '@app/shared/shared.module';
import { IAppState } from '@app/store/state/app.state';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { CommonModule } from '@angular/common';
import {
  MissingTranslationHandler,
  TranslateLoader,
  TranslateModule,
  TranslateService,
} from '@ngx-translate/core';
import { of } from 'rxjs';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { MemoizedSelector, Store, StoreModule } from '@ngrx/store';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { HttpLoaderFactory, MyMissingTranslationHandler } from '@app/shared/shared.module';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';
import { AlertService } from '@app/services/alert.service';
import { SubscribeService } from '@app/services/subscribe.services';
import { AlertModule, DatePickerRvModule } from 'bnt';
import { SnotifyService, ToastDefaults } from 'ng-snotify';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

describe('L1ConnectionManagmentComponent', () => {
  let component: L1ConnectionManagmentComponent;
  let fixture: ComponentFixture<L1ConnectionManagmentComponent>;
  let mockStore: MockStore<IAppState>;
  let setDefaultLangSpy: jasmine.Spy;
  const dialogMock = {
    close: () => {},
  };
  beforeEach(() => {
    const translateService = jasmine.createSpyObj('TranslateService', ['get', 'setDefaultLang']);
    TestBed.configureTestingModule({
      declarations: [L1ConnectionManagmentComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [
        AuditLogService,
        AlertService,
        SnotifyService,
        SubscribeService,
        { provide: MatDialogRef, useValue: dialogMock },
        { provide: MAT_DIALOG_DATA, useValue: [] },
        { provide: 'SnotifyToastConfig', useValue: ToastDefaults },
        provideMockStore(),
        // other providers
      ],
      imports: [
        CommonModule,
        SharedModule,
        AlertModule,
        FormsModule,
        ReactiveFormsModule,
        MatDialogModule,
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
    fixture = TestBed.createComponent(L1ConnectionManagmentComponent);
    component = fixture.componentInstance;
    mockStore.refreshState();
    fixture.detectChanges();
  });
  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('fuction should remove connection list in html1', () => {
    component.removeconnectionList(1);
    expect(component.connectionList).toBeTruthy;
  });
  it('fuction should remove connection list in html2', () => {
    component.addconnectionList();
    expect(component.connectionList).toBeTruthy;
  });
  it('fuction should remove connection list in html3', () => {
    component.close();
    expect(component.connectiondata).toEqual({ connectionDetailsFormFlag: undefined });
  });
  it('fuction should remove connection list in html4', () => {
    // component.dialogRef = new
    component.saveForm();
    expect(component.connectionManangement).toBeTruthy;
  });
  // it('fuction should remove connection list in html5', () => {
  //   component.checkValue(event, 1);
  //   expect(component).toBeTruthy;
  // });
  afterEach(() => {
    fixture.destroy();
  });
});
