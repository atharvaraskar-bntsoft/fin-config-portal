import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { RouterTestingModule } from '@angular/router/testing';
//import { ImportFileModule } from '@app/import-file/import-file.module';
import { AlertService } from '@app/services/alert.service';
import { MockStoreModule } from '@app/tests/tests.module';
import { NgSelectModule } from '@ng-select/ng-select';
import { Store, StoreModule } from '@ngrx/store';
import {
  TranslateModule,
  TranslateLoader,
  MissingTranslationHandler,
  TranslateService,
} from '@ngx-translate/core';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { AlertModule, DatePickerRvModule, TabsModule } from 'bnt';
import { HttpLoaderFactory, MyMissingTranslationHandler, SharedModule } from '../shared.module';
import { SnotifyModule, SnotifyService, ToastDefaults } from 'ng-snotify';
import { AddNetworkComponent } from './add-network.component';
import { EventEmitter } from '@angular/core';
import { of } from 'rxjs';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { IAppState } from '@app/store/state/app.state';
import { ImportFileService } from '@app/services/import-file.service';
import { ICopyObj } from './add-network.component';
import { CommonModule } from '@angular/common';
class translateServiceMock {
  public onLangChange: EventEmitter<any> = new EventEmitter();
  public onTranslationChange: EventEmitter<any> = new EventEmitter();
  public onDefaultLangChange: EventEmitter<any> = new EventEmitter();

  public get(key: any): any {
    return of(key);
  }
}
xdescribe('AddNetworkComponent', () => {
  let component: AddNetworkComponent;
  let fixture: ComponentFixture<AddNetworkComponent>;
  let mockStore: MockStore<IAppState>;
  let translateService: TranslateService;
  const importFileService = jasmine.createSpyObj('ImportFileService', ['clearData']);
  beforeEach(() => {
    const translateService = jasmine.createSpyObj('TranslateService', ['get', 'setDefaultLang']);
    const alertService = jasmine.createSpyObj('AlertService, SnotifyService', ['responseMessage']);
    TestBed.configureTestingModule({
      declarations: [AddNetworkComponent],
      providers: [
        SnotifyService,
        { provide: MatDialogRef, useValue: {} },
        { provide: MAT_DIALOG_DATA, useValue: [] },
        { provide: TranslateService, useClass: translateServiceMock },
        { provide: 'SnotifyToastConfig', useValue: {} },
        { provide: ImportFileService, useValue: importFileService },
        { provide: AlertService, useValue: alertService },
        provideMockStore(),
      ],
      imports: [
        SharedModule,
        MatDialogModule,
        NgSelectModule,
        FormsModule,
        ReactiveFormsModule,
        AlertModule,
        TabsModule,
        TranslateModule.forRoot({}),
        DatePickerRvModule,
        RouterTestingModule,
        HttpClientTestingModule,
        NgxDatatableModule,
        //ImportFileModule,
        StoreModule.forRoot({}),
        CommonModule
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    mockStore = TestBed.get(MockStore);
    fixture = TestBed.createComponent(AddNetworkComponent);
    component = fixture.componentInstance;

    translateService = TestBed.inject(TranslateService);
    mockStore.refreshState();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('cancel fuction should cancel the Modal', () => {
    component.checkStatus();
    expect(component.copyObj.mandatory).toEqual(component.copyObj.mandatory);
  });
  it('cancel fuction should cancel the Modal', () => {
    component.checkFileStatus();
    expect(component.copyObj.isFile).toEqual(component.copyObj.isFile);
  });
  it('cancel fuction should cancel the Modal', () => {
    component.checkFileStatus();
    expect(component.copyObj.isFile).toEqual(component.copyObj.isFile);
  });
  let valid = false;
  it('cancel fuction should cancel the Modal', () => {
    const ICopyObj = {
      type: 'message',
      mandatory: false,
      label: null,
      defaultvalue: null,
      key: null,
      isFile: false,
    };
    component.saveItem(ICopyObj);
    expect(component.submitted).toEqual(true);
  });
  it('cancel fuction should cancel the Modal', () => {
    const ICopyObj = {
      type: 'message',
      mandatory: false,
      label: null,
      defaultvalue: null,
      key: null,
      isFile: false,
    };
    component.saveItem(ICopyObj);
    expect(component.addNewProperty.value.defaultvalue).toEqual('');
  });
  it('cancel fuction should cancel the Modal', () => {
    const ICopyObj = {
      type: 'message',
      mandatory: false,
      label: null,
      defaultvalue: null,
      key: null,
      isFile: false,
    };
    // const { label, key, listvalues, isFile } = copyObj;
    component.saveItem(ICopyObj);
    // expect(component.listvalues).toEqual('');
  });
  // it('importButton fuction should called the OpenPopUp', () => {
  //   spyOn(component,'close').and.callThrough();
  //   component.close();
  //   component.importButton();
  //   expect(component.close).toHaveBeenCalled();
  // });
  afterEach(() => {
    fixture.destroy();
  });
});
