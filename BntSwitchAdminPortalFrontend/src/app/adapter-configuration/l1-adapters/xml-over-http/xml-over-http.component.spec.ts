import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { XmlOverHttpComponent } from './xml-over-http.component';
import { EventEmitter } from '@angular/core';
import { of } from 'rxjs';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { IAppState } from '@app/store/state/app.state';
import { MemoizedSelector, StoreModule } from '@ngrx/store';
import { SharedModule } from '@app/shared/shared.module';
import { NgSelectModule } from '@ng-select/ng-select';
import { UntypedFormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { RouterTestingModule } from '@angular/router/testing';
import { AlertModule } from 'bnt';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { NzModalService } from 'ng-zorro-antd/modal';
import { AlertService } from '@app/services/alert.service';
import { SnotifyService, ToastDefaults } from 'ng-snotify';
import { MainService } from '@app/extractor-ui/mapper/main.service';
import { ExtractorService } from '@app/services/extractor.service';
import { L1AdapterService } from '@app/services/l1-adapter.service';

import { GetImfTypeListJsonSuccess } from '@app/store/selectors/imf-json.selector';
import { CommonModule } from '@angular/common';
class translateServiceMock {
  public onLangChange: EventEmitter<any> = new EventEmitter();
  public onTranslationChange: EventEmitter<any> = new EventEmitter();
  public onDefaultLangChange: EventEmitter<any> = new EventEmitter();
  public get(key: any): any {
    return of(key);
  }
}
const GetImfTypeListJsonSuccessJSON = [
  'STRING',
  'CHAR',
  'LIST',
  'MAP',
  'INTEGER',
  'DOUBLE',
  'LONG',
  'ARRAY',
  'BYTE_ARRAY',
  'DATE',
  'TIMEATAMP',
  'BOOLEAN',
  'NUMBER',
  'OBJECT',
  'INT_ARRAY',
];
describe('XmlOverHttpComponent', () => {
  let component: XmlOverHttpComponent;
  let fixture: ComponentFixture<XmlOverHttpComponent>;
  let mockStore: MockStore<IAppState>;
  let mockGetImfTypeListJsonSuccess: MemoizedSelector<any, any>;
  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [XmlOverHttpComponent],
      imports: [
        StoreModule,
        SharedModule,
        NgSelectModule,
        FormsModule,
        RouterTestingModule,
        NgxDatatableModule,
        ReactiveFormsModule,
        // MockStoreModule.forRoot('Location', {}),
        AlertModule,
        StoreModule.forRoot({}),
        BrowserAnimationsModule,
        HttpClientTestingModule,
        TranslateModule,
        CommonModule
      ],
      providers: [
        TranslateService,
        NzModalService,
        AlertService,
        SnotifyService,
        MainService,
        UntypedFormBuilder,
        ExtractorService,
        L1AdapterService,
        { provide: 'SnotifyToastConfig', useValue: ToastDefaults },
        { provide: TranslateService, useClass: translateServiceMock },
        provideMockStore(),
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(XmlOverHttpComponent);
    component = fixture.componentInstance;

    // mockGetImfTypeListJsonSuccess = mockStore.overrideSelector(
    //   GetImfTypeListJsonSuccess,
    //   GetImfTypeListJsonSuccessJSON,
    // );
    // mockStore.refreshState();
    fixture.detectChanges();
  });
  it('function should call click cancel button', () => {
    component.handleCancel();
    expect(component.isVisibleInvalidField).toEqual(false);
  });
  it('function should call click handle ok button', () => {
    component.handleOk();
    expect(component.isVisibleInvalidField).toEqual(false);
  });
  it('function should call click show invalid field', () => {
    component.showInvalidFields();
    expect(component.isVisibleInvalidField).toEqual(true);
  });
  it('function should call click show second response tab', () => {
    component.responseSecondTab();
    expect(component.responseActiveTab).toEqual(1);
  });
  it('function should call click show response first tab', () => {
    component.responsetFirstTab();
    expect(component.responseActiveTab).toEqual(0);
  });
  it('function should call click show request second tab', () => {
    component.requestSecondTab();
    expect(component.responseActiveTab).toEqual(0);
  });
  it('function should call click show request first tab', () => {
    component.requestFirstTab();
    expect(component.requestActiveTab).toEqual(0);
  });
  it('function should call click edit datsa in html list', () => {
    component.editMode();
    expect(component.isEditMode).toEqual(true);
  });
  it('function should call click view details in html list', () => {
    component.viewMode();
    expect(component.isEditMode).toEqual(false);
  });
  it('drawer function should call click close popup in html list', () => {
    component.closeHeaderPopup();
    expect(component.isHeaderVisible).toEqual(false);
  });
  it('drawer function should call click save popup in html list', () => {
    component.saveHeaderPopup();
    expect(component.isHeaderVisible).toEqual(false);
  });
  it('drawer function should call click save popup in html list', () => {
    component.onNextClick();
    expect(component.nextClicked).toBeTruthy;
  });
  it('drawer function should call change tab in html list', () => {
    component.tabChange();
    expect(component.tabValue.emit(1)).toBeTruthy;
  });
  it('function should call click view details in html list', () => {
    component.openHeaderPopup();
    expect(component.isHeaderVisible).toEqual(true);
  });
  it('function should call click add button to add header row list in html', () => {
    component.addHeadersFrom();
    expect(component).toBeTruthy;
  });
  it('function should call click add button to add header row list in html', () => {
    const index = 0;
    component.removeHeader(index);
    expect(component).toBeTruthy;
  });
  it('function should call click add button to remove header row list in html', () => {
    const index = 1;
    component.removeApiList(index);
    expect(component).toBeTruthy;
  });
  it('function should call click add button to get header row list in formgroup', () => {
    const index = 0;
    component.getHeadersFormGroup(index);
    expect(component).toBeTruthy;
  });
  it('function should call click add button to open form  list in formgroup', () => {
    const data = {
      api: '/path',
      host: 'host',
    };
    component.openRequestPayload(0, data);
    expect(component.isRequestPayloadVisible).toBeTruthy;
  });
  it('function should call click add button to add header row list in html', () => {
    const item = {
      attributes: [],
    };
    component.setInvalidField(item);
    expect(component).toBeTruthy;
  });
  it('function should call click check alphaunderText row list in html', () => {
    const text = 'ResponseAttributes';
    component.checkAlphaWithUndernd(text);
    expect(component).toBeTruthy;
  });
  it('drawer function should call click revert in html list', () => {
    component.revertChanges();
    expect(component.shouldRevertChange).toEqual(true);
  });
  it('drawer function should call click revert in html list', () => {
    const apiDefinitions = [{ api: '/path', host: 'host' }];
    component.checkApiPath(apiDefinitions);
    expect(component).toBeTruthy;
  });
  it('should Angular calls loadData', () => {
    component.logobject(1);
    expect(component).toBeTruthy;
  });
  it('should functuion call integers ', () => {
    component.isInteger(1);
    expect(component).toBeTruthy;
  });
  it('should function call ony numeric ', () => {
    component.isNumeric(1);
    expect(component).toBeTruthy;
  });
  it('should create', () => {
    expect(component).toBeTruthy();
  });
  afterEach(() => {
    fixture.destroy();
  });
});
