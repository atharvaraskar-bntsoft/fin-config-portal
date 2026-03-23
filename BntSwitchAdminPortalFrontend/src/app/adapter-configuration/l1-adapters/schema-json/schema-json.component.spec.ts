import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { AlertService } from '@app/services/alert.service';
import { IAppState } from '@app/store/state/app.state';
import { MemoizedSelector, StoreModule } from '@ngrx/store';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { SnotifyService, ToastDefaults } from 'ng-snotify';
import { NzModalService } from 'ng-zorro-antd/modal';
import { CUSTOM_ELEMENTS_SCHEMA, EventEmitter } from '@angular/core';
import { of } from 'rxjs';
import { SchemaJsonComponent } from './schema-json.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { AlertModule } from 'bnt';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { GetImfTypeListJsonSuccess } from '@app/store/selectors/imf-json.selector';
import { L1AdapterService } from '@app/services/l1-adapter.service';
import { SharedModule } from '@app/shared/shared.module';
import { A } from '@angular/cdk/keycodes';
import { data } from 'jquery';
import { CommonModule } from '@angular/common';
class translateServiceMock {
  public onLangChange: EventEmitter<any> = new EventEmitter();
  public onTranslationChange: EventEmitter<any> = new EventEmitter();
  public onDefaultLangChange: EventEmitter<any> = new EventEmitter();

  public get(key: any): any {
    return of(key);
  }
}
const GetImfTypeListJsonSuccessJSON = [];

xdescribe('SchemaJsonComponent', () => {
  let component: SchemaJsonComponent;
  let fixture: ComponentFixture<SchemaJsonComponent>;
  let mockStore: MockStore<IAppState>;
  let mockGetImfTypeListJsonSuccess: MemoizedSelector<any, any>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [SchemaJsonComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [
        TranslateService,
        NzModalService,
        AlertService,
        SnotifyService,
        L1AdapterService,

        { provide: 'SnotifyToastConfig', useValue: ToastDefaults },

        { provide: TranslateService, useClass: translateServiceMock },
        provideMockStore(),
      ],
      imports: [
        StoreModule,
        FormsModule,
        ReactiveFormsModule,
        NgSelectModule,
        FormsModule,
        RouterTestingModule,
        NgxDatatableModule,
        NzSpinModule,
        SharedModule,

        // MockStoreModule.forRoot('Location', {}),
        AlertModule,
        StoreModule.forRoot({}),
        BrowserAnimationsModule,
        HttpClientTestingModule,
        TranslateModule,
        CommonModule
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    mockStore = TestBed.get(MockStore);
    fixture = TestBed.createComponent(SchemaJsonComponent);
    component = fixture.componentInstance;

    mockGetImfTypeListJsonSuccess = mockStore.overrideSelector(
      GetImfTypeListJsonSuccess,
      GetImfTypeListJsonSuccessJSON,
    );
    mockStore.refreshState();
    fixture.detectChanges();
  });

  it(' fuction should onClick save draft', () => {
    component.onNextClick();
    expect(component.nextClicked).toEqual(true);
  });
  it('close function should close header Popup', () => {
    component.closeHeaderPopup();
    expect(component.isHeaderVisible).toEqual(false);
  });
  // it('should  Angular calls ngOnInit', () => {
  //   component.ngOnInit();
  //   component.renderItem();

  // });
  it('add header function should call ', () => {
    component.saveHeaderPopup();
    expect(component.isHeaderVisible).toEqual(false);
    expect(component.savedHeadersList).toEqual([]);
  });

  it(' fuction should onClick save draft', () => {
    component.onSaveDraftClick();
    expect(component.nextClicked).toEqual(false);
  });
  it('function should call close header Popup', () => {
    component.openHeaderPopup();
    expect(component.isHeaderVisible).toEqual(true);
  });
  it('function should call edit', () => {
    component.editMode();
    expect(component.isEditMode).toEqual(true);
  });
  it('function should call open view mode', () => {
    component.viewMode();
    expect(component.isEditMode).toEqual(false);
  });

  it('Component should contain Property', () => {
    component.revertChanges();

    expect(component.shouldRevertChange).toBe(true);
  });

  it('function should change the tab', () => {
    component.tabChange();
    expect(component.tabValue.emit(1)).toEqual();
  });

  // it('requestTransform Component should contain Property', () => {
  //   component. requestTransform(currentRequestItem);

  //   expect(component.inValidFieldList).toBe([]);
  //   expect(component.revertReqChanges).toBe(true);
  // });

  it('function should call handle', () => {
    component.handleOk();
    expect(component.isVisibleInvalidField).toEqual(false);
  });
  it(' function should call cancel handle ', () => {
    component.handleCancel();
    expect(component.isVisibleInvalidField).toEqual(false);
  });

  it(' function should call show invalid field ', () => {
    component.showInvalidFields();
    expect(component.isVisibleInvalidField).toEqual(true);
  });

  it(' function should call open response second tab ', () => {
    component.responseSecondTab();
    expect(component.revertResChanges).toEqual(false);
  });
  it(' function should call open response first tab ', () => {
    component.responsetFirstTab();
    expect(component.revertResChanges).toEqual(false);
  });
  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it(' function should call open request first tab ', () => {
    component.requestFirstTab();
    expect(component.revertReqChanges).toEqual(false);
  });
  it(' function should call open request second tab ', () => {
    component.requestSecondTab();
    expect(component.revertReqChanges).toEqual(false);
  });

  // it(' function should call multiple  ', () => {
  //   component.nameMultiResp();

  //   expect(component.currentResponseItem).toEqual(true);

  // });
  it(' should integer passes in this method ', () => {
    const result = component.isInteger(1);
    expect(result).toEqual(true);
  });
  it(' should number passes in this method ', () => {
    const result = component.isNumeric(1);
    expect(result).toEqual(true);
  });

  it(' should floating number passes in this method ', () => {
    const result = component.isFloat(5.99);
    expect(result).toEqual(true);
  });
  it(' should floating number passes in this method return  ', () => {
    const result = component.isFloat(A);
    expect(result).toEqual(false);
  });
  it(' fuction should render the items', () => {
    component.renderItem();
    expect(component.adapterData.schemaData.schema).toEqual(true);
    expect(component.readOnlyFlag).toEqual(false);
  });
  // it(' fuction should render the items', () => {
  //   component.closeHeaderPopup();
  //   expect(component.savedHeadersList).toEqual(true);

  // });
  it(' fuction should Save the items', () => {
    component.saveData();
    expect(component.saveData).toEqual(true);
  });

  it(' fuction should openRequest payload', () => {
    component.openRequestPayload(1, data);
    expect(component.currentIndex).toEqual(true);
    expect(component.isRequestPayloadVisible).toEqual(true);
    expect(component.setInvalidField).toEqual(true);
  });

  it(' fuction should openRequest payload', () => {
    component.openResponsePayload(1, data);
    expect(component.currentIndex).toEqual(true);
    expect(component.isViewResVisible).toEqual(true);
    expect(component.isResponsePayloadVisible).toEqual(true);
    expect(component.responseActiveTab).toBeTruthy();
    expect(component.currentResponseItem).toEqual(true);
    expect(component.oldResponseItem).toEqual(true);
  });

  it(' fuction should Save the items', () => {
    component.nameMultiResp();
    expect(component.currentResponseItem).toEqual(true);
  });
  afterEach(() => {
    fixture.destroy();
  });
});
