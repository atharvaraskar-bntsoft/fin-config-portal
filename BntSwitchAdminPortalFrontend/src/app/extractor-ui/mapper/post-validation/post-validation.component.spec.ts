import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { PostValidationComponent } from './post-validation.component';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { IAppState } from '@app/store/state/app.state';
import { MemoizedSelector, Store, StoreModule } from '@ngrx/store';
import { HttpLoaderFactory, MyMissingTranslationHandler, SharedModule } from '@app/shared/shared.module';
import { NgSelectModule } from '@ng-select/ng-select';
import { UntypedFormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { AlertModule } from 'bnt';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MissingTranslationHandler, TranslateLoader, TranslateModule, TranslateService } from '@ngx-translate/core';
import { NzModalService } from 'ng-zorro-antd/modal';
import { AlertService } from '@app/services/alert.service';
import { SnotifyService, ToastDefaults } from 'ng-snotify';
import { MainService } from '../main.service';
import { NzDrawerRef, NzDrawerService } from 'ng-zorro-antd/drawer';
import { EventEmitter } from '@angular/core';
import { of } from 'rxjs';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { selectViewSettingsList } from '@app/store/selectors/view-settings.selector';
class translateServiceMock {
  public onLangChange: EventEmitter<any> = new EventEmitter();
  public onTranslationChange: EventEmitter<any> = new EventEmitter();
  public onDefaultLangChange: EventEmitter<any> = new EventEmitter();
  public get(key: any): any {
    return of(key);
  }
}
class NzDrawerRefMock {
  public close(key: any): any { }
}

const selectViewSettingsListJSON = {
  status: 'success',
  message: 'Find all Setting',
  data: {
    pagination: ['20', '25', '30', '40', '50'],
    language: ['en_EN', 'en_EN1', 'fr_FR', 'en_INV'],
    settingDto: {
      id: 1,
      systemUserId:
        'SystemUser [firstName=Bnt, lastName=Admin, email=bnt.admin@bnt.com, systemUserCategory=, password=9AHRz1ElALzTEdFKIKywyzEZh0IcZ/INhbGkbc0Qb84=, passwordLastUpdatedOn=2020-07-02 13:09:08.0, locked=0, deleted=0, lockedReason=null]',
      search: 'contain',
      language: 'en_EN1',
      pagination: '20',
    },
    searchOption: ['contain', 'contain2'],
  },
};
xdescribe('PostValidationComponent', () => {
  let component: PostValidationComponent;
  let fixture: ComponentFixture<PostValidationComponent>;
  let mockStore: MockStore<IAppState>;
  let mockselectViewSettingsList: MemoizedSelector<any, any>;
  let setDefaultLangSpy: jasmine.Spy;
  
  beforeEach(() => {
    const translateService = jasmine.createSpyObj('TranslateService', ['get', 'setDefaultLang']);
    TestBed.configureTestingModule({
      declarations: [PostValidationComponent],
      imports: [
        StoreModule,
        SharedModule,
        NgSelectModule,
        FormsModule,
        RouterTestingModule,
        ReactiveFormsModule,
        // MockStoreModule.forRoot('Location', {}),
        AlertModule,
        StoreModule.forRoot({}),
        BrowserAnimationsModule,
        HttpClientTestingModule,
        TranslateModule,
        CommonModule,
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
      providers: [
        TranslateService,
        NzModalService,
        AlertService,
        SnotifyService,
        MainService,
        UntypedFormBuilder,
        NzDrawerRef,
        NzDrawerService,
        { provide: 'SnotifyToastConfig', useValue: ToastDefaults },
        { provide: TranslateService, useClass: translateServiceMock },
        { provide: NzDrawerRef, useClass: NzDrawerRefMock },
        provideMockStore(),
      ],
    }).compileComponents();
    mockStore = TestBed.get(Store);
    fixture = TestBed.createComponent(PostValidationComponent);
    component = fixture.componentInstance;
    mockselectViewSettingsList = mockStore.overrideSelector(
      selectViewSettingsList,
      selectViewSettingsListJSON,
    );
    component.listValidation = ['test'];
    mockStore.refreshState();
    fixture.detectChanges();
  });

  it('should create', () => {
    component.listValidation = ['test'];
    expect(component).toBeTruthy();  
  });
  // it('removeValidation fuction should call  form HTMl', () => {
  //   component.removeValidation(1);
  //   expect(component.removeValidation).toBeDefined;
  //   expect(component.removeValidation).toHaveBeenCalled;
  // });
  // it('addValidation fuction should call  form HTMl', () => {
  //   component.addValidation();
  //   expect(component.addValidation).toBeDefined;
  //   expect(component.addValidation).toHaveBeenCalled;
  // });
  // it('savePostValidation fuction should call  form HTMl', () => {
  //   component.savePostValidation();
  //   expect(component.savePostValidation).toBeDefined;
  //   expect(component.savePostValidation).toHaveBeenCalled;
  // });
  // it('close fuction should call  form HTMl', () => {
  //   component.close();
  //   expect(component.close).toBeDefined;
  //   expect(component.close).toHaveBeenCalled;
  // });
  // it('checkCssClass fuction should call  form HTMl', () => {
  //   const data = {"name":null,"operator":null,"operatorList":[],"params":[],"validation":null};
  //   component.checkCssClass(data);
  //   expect(component.checkCssClass).toBeDefined;
  //   expect(component.checkCssClass).toHaveBeenCalled;
  // });
  // it('validationParam fuction should call  form HTMl', () => {
  //   const block = {"name":"IS_NOT_NULL","operator":null,"operatorList":[],"params":[],"validation":null,"parameters":[]};
  //   const indexj = 0;
  //   component.validationParam(block,indexj);
  //   expect(component.validationParam).toBeDefined;
  //   expect(component.validationParam).toHaveBeenCalled;
  //   component.validationList.forEach(function (arrayItem) {
  //     var x = arrayItem
  //     if(x.actionName == block.name){
  //       block.parameters = x.parameters
  //     expect(x).not.toBeUndefined();
  //     }
  //   })
  // });
  // afterEach(() => {
  //   fixture.destroy();
  // });
  
});
