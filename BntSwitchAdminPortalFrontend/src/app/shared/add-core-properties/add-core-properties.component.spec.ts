import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { RouterTestingModule } from '@angular/router/testing';
//import { ImportFileModule } from '@app/import-file/import-file.module';
import { AlertService } from '@app/services/alert.service';
import { CorePropertiesService } from '@app/services/core-properties.service';
import { MockStoreModule } from '@app/tests/tests.module';
import { NgSelectModule } from '@ng-select/ng-select';
import { Store } from '@ngrx/store';
import {
  TranslateModule,
  TranslateLoader,
  MissingTranslationHandler,
  TranslateService,
} from '@ngx-translate/core';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { AlertModule, DatePickerRvModule, TabsModule } from 'bnt';
import { HttpLoaderFactory, MyMissingTranslationHandler } from '../shared.module';
import { SnotifyModule, SnotifyService, ToastDefaults } from 'ng-snotify';
import { AddCorePropertiesComponent } from './add-core-properties.component';
import { FieldErrorDisplayComponent } from '../field-error-display/field-error-display.component';
import { CommonModule } from '@angular/common';

xdescribe('AddCorePropertiesComponent', () => {
  let component: AddCorePropertiesComponent;
  let fixture: ComponentFixture<AddCorePropertiesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddCorePropertiesComponent, FieldErrorDisplayComponent],
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
        MockStoreModule.forRoot('Location', {}),
        //ImportFileModule,
        MatDialogModule,
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
        CommonModule
      ],
      providers: [
        Store,
        TranslateService,
        AlertService,
        SnotifyService,
        { provide: 'SnotifyToastConfig', useValue: {} },
        CorePropertiesService,
        { provide: MatDialogRef, useValue: {} },
        { provide: MAT_DIALOG_DATA, useValue: { corePropertyData: [] } },
        // other providers
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddCorePropertiesComponent);
    component = fixture.componentInstance;
    let displayFieldCss = component.displayFieldCss;
    //Then strip out contents so it can be called but does not error during testing
    displayFieldCss = function () {
      return;
    } as any;
    fixture.detectChanges();
  });

  it('should  Angular calls ngOnInit and initialize values in formBuilder', () => {
    component.ngOnInit();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    expect(component.submitted).toBe(false);
  });

  it('Component should contain a addNewProperty Form', () => {
    expect(component.addNewProperty).toBeTruthy();
  });

  it('should contain a default value for the addNewProperty Form', () => {
    expect(component.addNewProperty.value).toEqual({
      type: 'core',
      key: '',
      label: '',
      defaultvalue: '',
      mandatory: false,
    });
  });

  //   it('should call getDataFromWidget() on init method',()=>{
  //     spyOn(component,'getDataFromWidget').and.callThrough();
  //     component.ngOnInit();
  //     expect(component.getDataFromWidget).toHaveBeenCalled()
  // })

  it('should call saveItem() and validateData', () => {
    spyOn(component, 'validateAllFormFields').and.callThrough();
    component.saveItem(component.addNewProperty.value);
    expect(component.submitted).toBe(true);
    expect(component.validateAllFormFields).toHaveBeenCalled();
  });

  it('should call checkStatus() click on Mandatory check Input', () => {
    component.checkStatus();
  });
});
