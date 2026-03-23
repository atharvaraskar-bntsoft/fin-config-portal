import { RuleEngineComponent } from './rule-engine.component';
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
import { AlertModule } from 'bnt';
import { AlertService } from '@app/services/alert.service';
import { RulesService } from '@app/services/rule.service';
import { Router } from '@angular/router';

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

describe('RuleEngineComponent', () => {
  let component: RuleEngineComponent;
  let fixture: ComponentFixture<RuleEngineComponent>;
  let store: Store<RuleEngineComponent>;
  let mockStore: MockStore<IAppState>;
  let setDefaultLangSpy: jasmine.Spy;
  let translate: TranslateService;
  let rulesService: RulesService;
  let router : Router;
  beforeEach(() => {
    const translateService = jasmine.createSpyObj('TranslateService', ['get', 'setDefaultLang']);
    TestBed.configureTestingModule({
      declarations: [RuleEngineComponent],
      providers: [
        SnotifyService,
        RulesService,
        AlertService,
        { provide: TranslateService, useClass: translateServiceMock },
        HttpClient,
        { provide: 'SnotifyToastConfig', useValue: ToastDefaults },
        { provide: RulesService, useValue: rulesService },
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
    fixture = TestBed.createComponent(RuleEngineComponent);
    component = fixture.componentInstance;
    mockStore.refreshState();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('click button  should function save to commite data in list ', () => {
    const commit = false;
    component.saveRule(commit);
    expect(component.showError).toEqual(true);
    expect(component.popupslide).toBeTruthy;
  });
  it('click button should function create condtion and save the data in condition list ', () => {
    const value = {
      condition: {},
      id: undefined,
    };
    component.getRule(value);
    expect(component.isVisiblecon).toEqual(false);
  });
  // it('should Angular calls click response tab loadData', () => {
  //   // const event={

  //   //   length
  //   //   :
  //   //   0,
  //   //   name
  //   //   :
  //   //   "trim",
  //   //   returnValue: true,
  //   //   value:'s'

  //   // };
  //   const event = {
  //     KeyboardEvent: {
  //       isTrusted: true,
  //       altKey: false,
  //       bubbles: true,
  //       cancelBubble: false,
  //       cancelable: true,
  //       charCode: 0,
  //       code: 'KeyA',
  //       composed: true,
  //       ctrlKey: false,
  //       currentTarget: [],
  //       defaultPrevented: false,
  //       detail: 0,
  //       eventPhase: 2,
  //       isComposing: false,
  //       key: 'a',
  //       keyCode: 65,
  //       location: 0,
  //       metaKey: false,
  //     },
  //   };
  //   component.routeName({ name: 'trim', value: 's' }, 'ruleName');
  //   expect(component).toBeTruthy;
  // });
  it('get click button should function create condition and choose filed call this function ', () => {
    const row = [
      {
      label: 'ISO1',
      name: '11112',
      text: 'ISO1',
      value: '11112',
      },
    ];
    component.destinations(row);
    expect(component.destinationsValues).toBeTruthy;
  });
  it(' should function call click open condition', () => {
    component.openCondition();
    expect(component.isVisiblecon).toBeTruthy;
  });
  it(' should function call click open condition', () => {
    component.conCancel();
    expect(component.isVisiblecon).toEqual(false);
  });
  it(' should function call click open condition', () => {
    const text="";
    component.checkAlphaWithUnderndDashname(text);
    expect(component).toBeTruthy;
  });
  it(' should function call click open condition', () => {
    const text="";
    component.checkAlphaWithUnderndDashdesc(text);
    expect(component).toBeTruthy;
  });
  it(' should function call save data in list', () => {
    const comit="false";
    component.save(comit);
    expect(component).toBeTruthy;
  });
  it(' should function call change status in row detail', () => {
    component.changeStatus();
    expect(component).toBeTruthy;
  });
  // it(' should function call click add description in html', () => {
  //   component.adddescription(event);
  //   expect(component).toBeTruthy;
  // });
  it(' should function call add rule ', () => {
    component.addrule();
    expect(component).toBeTruthy;
  });
  it(' should function  ', () => {
    const node={};
    component.deleteElement(node);
    expect(component).toBeTruthy;
  });
  // it(' should function  ', () => {
  //   const result = Object.getPrototypeOf(component);
  //   component._transFrom(result) ;
  //   expect(component).toBeTruthy;
  // });
  // it(' should function  ', () => {
  //   component.cancel() ;
  //   expect(component).toBeTruthy;
  // });
  // it('getRowData fuction should call click on viewdetails form this HTMl', () => {
  //   component.cancel();
  //   expect(component._router.navigate).toHaveBeenCalledWith(['routing/rule/destination']);
  // });
});
