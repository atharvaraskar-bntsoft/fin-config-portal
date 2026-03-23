import { CommonModule } from '@angular/common';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { EventEmitter } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { UntypedFormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { MainService } from '@app/extractor-ui/mapper/main.service';
import { AddRoleService } from '@app/services/add-role.service';
import { AlertService } from '@app/services/alert.service';
import { L1AdapterService } from '@app/services/l1-adapter.service';
import { SharedModule } from '@app/shared/shared.module';
import { IAppState } from '@app/store/state/app.state';
import { NgSelectModule } from '@ng-select/ng-select';
import { MemoizedSelector, StoreModule } from '@ngrx/store';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { SnotifyService, ToastDefaults } from 'ng-snotify';
import { NzModalService } from 'ng-zorro-antd/modal';
import { AlertModule } from 'bnt';
import { of } from 'rxjs';
import { L3XmlOverHttpComponent } from './l3-xml-over-http.component';
class translateServiceMock {
  public onLangChange: EventEmitter<any> = new EventEmitter();
  public onTranslationChange: EventEmitter<any> = new EventEmitter();
  public onDefaultLangChange: EventEmitter<any> = new EventEmitter();
  public get(key: any): any {
    return of(key);
  }
}
const GetImfTypeListJsonSuccessJSON = [{}];
describe('L3XmlOverHttpComponent', () => {
  let component: L3XmlOverHttpComponent;
  let fixture: ComponentFixture<L3XmlOverHttpComponent>;
  let mockStore: MockStore<IAppState>;
  let mockGetImfTypeListJsonSuccess: MemoizedSelector<any, any>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [L3XmlOverHttpComponent],
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
        L1AdapterService,
        AddRoleService,
        { provide: 'SnotifyToastConfig', useValue: ToastDefaults },
        { provide: TranslateService, useClass: translateServiceMock },

        provideMockStore(),
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(L3XmlOverHttpComponent);
    component = fixture.componentInstance;

    // mockGetImfTypeListJsonSuccess  = mockStore.overrideSelector(
    //   GetImfTypeListJsonSuccess,
    //   GetImfTypeListJsonSuccessJSON,
    // );

    // mockStore.refreshState();
    fixture.detectChanges();
  });
  it(' fuction should click add roleopen pop ', () => {
    component.addRole();
    expect(component.visibleRolePopup).toEqual(true);
  });
  it(' fuction should click handle to cancel the popup drawer ', () => {
    component.handleCancel();
    expect(component.isVisibleInvalidField).toEqual(false);
  });
  it(' fuction should click ok to handle the drawer ', () => {
    component.handleOk();
    expect(component.isVisibleInvalidField).toEqual(false);
  });
  it(' fuction should click close the drawer ', () => {
    component.closePopup(event);
    expect(component.visibleRolePopup).toBeTruthy;
  });
  it(' fuction should click save the data in html list ', () => {
    component.saveRoles(event);
    expect(component.visibleRolePopup).toEqual(false);
  });
  it(' fuction should click save the data in html list ', () => {
    component.showInvalidFields();
    expect(component.isVisibleInvalidField).toEqual(true);
  });
  it(' fuction should call click request first tab in view list ', () => {
    component.requestFirstTab();
    expect(component.requestActiveTab).toEqual(0);
  });
  it(' fuction should call click request second tab in view list ', () => {
    component.requestSecondTab();
    expect(component.requestActiveTab).toEqual(1);
  });
  it(' fuction should call click response first tab in view list ', () => {
    component.responsetFirstTab();
    expect(component.responseActiveTab).toEqual(0);
  });
  it(' fuction should call click response second tab in view list ', () => {
    component.responseSecondTab();
    expect(component.responseActiveTab).toEqual(1);
  });
  it(' fuction should call click request transform ', () => {
    component.requestTransform();
    expect(component.inValidFieldList).toBeNull;
  });
  it(' fuction should call click request transform ', () => {
    component.responseTransform();
    expect(component.inValidFieldList).toBeNull;
  });
  it(' fuction should call to edit data in row  ', () => {
    component.editMode();
    expect(component.isEditMode).toEqual(true);
  });
  it(' fuction should call to view data in row  ', () => {
    component.viewMode();
    expect(component.isEditMode).toEqual(false);
  });
  it(' fuction should call to revert changes the data  ', () => {
    component.revertChanges();
    expect(component.shouldRevertChange).toEqual(true);
  });
  it(' fuction should call to revert changes the data  ', () => {
    const i = 1;
    component.openRequestPayload(i);
    expect(component.isViewReqVisible).toBeTruthy;
  });
  it(' fuction should call numeric number', () => {
    component.isNumeric(1);
    expect(component).toBeTruthy;
  });
  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
