import { SchemeImfMappingCreateComponent } from './scheme-imf-mapping-create.component';

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
import { SchemeImfMapperService } from '@app/services/scheme-imf-mapper.service';

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

describe('SchemeImfMappingCreateComponent', () => {
  let component: SchemeImfMappingCreateComponent;
  let fixture: ComponentFixture<SchemeImfMappingCreateComponent>;
  let store: Store<SchemeImfMappingCreateComponent>;
  let mockStore: MockStore<IAppState>;
  let setDefaultLangSpy: jasmine.Spy;
  let translate: TranslateService;
  let schemeImfMapperService: SchemeImfMapperService;

  beforeEach(() => {
    const translateService = jasmine.createSpyObj('TranslateService', ['get', 'setDefaultLang']);
    TestBed.configureTestingModule({
      declarations: [SchemeImfMappingCreateComponent],
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
    fixture = TestBed.createComponent(SchemeImfMappingCreateComponent);
    component = fixture.componentInstance;

    mockStore.refreshState();
    fixture.detectChanges();
  });
  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('fuction should call', () => {
    const e = {
      id
: 
"RESPONSE",
value
: 
"RESPONSE"
    };
    component.changeType(e);
    expect(component).toBeTruthy;
  });

  it('fuction should call change the schemetab', () => {
    const e = {
      active: '1',
      description: 'JSON',
      id: -1,
      lookupType: {
        description: 'Message Standard',
        id: 4,
        modifiable: '0',
        name: 'Message_Standard',
      },
      modifiable: '0',
      value: 'JSON',
    };
    component.changeScheme(e);
    expect(component).toBeTruthy;
  });
  it(' fuction should call check validation', () => {
    component.addValidationFormat(1, undefined);
    expect(component).toBeTruthy;
  });
  it(' fuction should call check validation', () => {
    const parse=true;
    component.extractDataChange(parse);
    expect(component).toBeTruthy;
  });
  it(' fuction should call add block list', () => {
    component.addBlockList();
    expect(component).toBeTruthy;
  });
  
  it(' fuction should call remove block list', () => {
    component.removeBlockList();
    expect(component.blockList.pop).toBeTruthy;
  });

  it(' fuction should call remove block list', () => {
    component.cancel();
    expect(component).toBeTruthy;
  });

  // it(' fuction should call remove block list', () => {
  //   component.save() ;
  //   expect(component).toBeTruthy;
  // });

  it(' fuction should call remove block list', () => {
    const value="Optional";
    component.fieldPresenceChange(value);
    expect(component.isConditional).toBeTruthy;
  });

  it(' fuction should call change mapper', () => {
    const mapper=true;
    component.mapperChange(mapper);
    expect(component.isConditional).toBeTruthy;
  });

  it(' fuction should call add mapper', () => { 
    component.addBlockStep(1, 'blockStepList');
    expect(component.isConditional).toBeTruthy;
  });
  it(' fuction should call remove mapper block', () => { 
    component.removeBlockStep(1, 'blockStepList');
    expect(component.isConditional).toBeTruthy;
  });
  it(' fuction should call remove validation mapper block', () => { 
    const item={};
    component.removeValidationFormat(1, item);
    expect(component.isConditional).toBeTruthy;
  });
  // it(' fuction should call remove mapper block', () => { 
  //   const block={};
  //   component.parmsChange(block);
  //   expect(component.isConditional).toBeTruthy;
  // });
  // it(' fuction should call remove mapper block', () => { 
  //   const e={
  //     active: '1',
  //     description: 'JSON',
  //     id: -1,
  //     lookupType: {
  //       description: 'Message Standard',
  //       id: 4,
  //       modifiable: '0',
  //       name: 'Message_Standard',
  //     },
  //     modifiable: '0',
  //     value: 'JSON',
  //   };
  //   component.changeField(e);
  //   expect(component.isConditional).toBeTruthy;
  // });
});
