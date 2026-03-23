import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { UrlEncodedImfCreationTableComponent } from './imf-creation-table.component';

import { HttpClientTestingModule } from '@angular/common/http/testing';
import { EventEmitter,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { AlertService } from '@app/services/alert.service';
import { SubscribeService } from '@app/services/subscribe.services';
import { SharedModule } from '@app/shared/shared.module';
import { IAppState } from '@app/store/state/app.state';
import { NgSelectModule } from '@ng-select/ng-select';
import { MemoizedSelector, StoreModule } from '@ngrx/store';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { SnotifyService } from 'ng-snotify';
import { NzModalService } from 'ng-zorro-antd/modal';
import { AlertModule, DatePickerRvModule, TabsModule } from 'bnt';
import { of } from 'rxjs';
import { ImfJsonService } from '@app/services/imf-json.service';
import { CommonModule } from '@angular/common';

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

describe('L1urlencodedImfCreationTableComponent', () => {
  let component: UrlEncodedImfCreationTableComponent;
  let fixture: ComponentFixture<UrlEncodedImfCreationTableComponent>;
  let mockStore: MockStore<IAppState>;
  let translateService: TranslateService;
  let imfJsonService: ImfJsonService;
  let setDefaultLangSpy: jasmine.Spy;

  beforeEach(() => {
    const translateService = jasmine.createSpyObj('TranslateService', ['get', 'setDefaultLang']);
    const alertService = jasmine.createSpyObj('AlertService, SnotifyService', ['responseMessage']);
    TestBed.configureTestingModule({
      declarations: [UrlEncodedImfCreationTableComponent],
      providers: [
        SnotifyService,
        NzModalService,
        // AlertService,
        SubscribeService,
        { provide: TranslateService, useClass: translateServiceMock },
        { provide: 'SnotifyToastConfig', useValue: {} },
        { provide: ImfJsonService, useValue: imfJsonService },
        { provide: AlertService, useValue: alertService },
        provideMockStore(),
      ],
      imports: [
        SharedModule,
        NgSelectModule,
        FormsModule,
        ReactiveFormsModule,
        AlertModule,
        TabsModule,
        TranslateModule.forRoot({}),
        DatePickerRvModule,
        HttpClientTestingModule,
        NgxDatatableModule,
        RouterTestingModule,
        BrowserModule,
        StoreModule.forRoot({}),
        CommonModule
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
    mockStore = TestBed.get(MockStore);
    fixture = TestBed.createComponent(UrlEncodedImfCreationTableComponent);
    component = fixture.componentInstance;
    mockStore.refreshState();
    // component.dataSource = imfStructure.data.imf;
    setDefaultLangSpy = translateService.get.and.returnValue(of([]));
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
