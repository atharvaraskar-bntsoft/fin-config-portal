import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { UntypedFormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { MainService } from '@app/extractor-ui/mapper/main.service';
import { AlertService } from '@app/services/alert.service';
import { SharedModule } from '@app/shared/shared.module';
import { IAppState } from '@app/store/state/app.state';
import { NgSelectModule } from '@ng-select/ng-select';
import { StoreModule } from '@ngrx/store';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { SnotifyService, ToastDefaults } from 'ng-snotify';
import { NzModalService } from 'ng-zorro-antd/modal';
import { AlertModule } from 'bnt';
import { EventEmitter } from '@angular/core';
import { of } from 'rxjs';
import { AddSenderPropertyComponent } from './add-sender-property.component';
// import { MatDialogRef } from '@angular/material/dialog';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ExtractorService } from '@app/services/extractor.service';
import { CommonModule } from '@angular/common';
class translateServiceMock {
  public onLangChange: EventEmitter<any> = new EventEmitter();
  public onTranslationChange: EventEmitter<any> = new EventEmitter();
  public onDefaultLangChange: EventEmitter<any> = new EventEmitter();
  public get(key: any): any {
    return of(key);
  }
}
const value = {};
const obj = {
  id: 'UUID',
  name: 'UUID',
  parentField: null,
  possibleValue: null,
};
xdescribe('AddSenderPropertyComponent', () => {
  let component: AddSenderPropertyComponent;
  let fixture: ComponentFixture<AddSenderPropertyComponent>;
  let mockStore: MockStore<IAppState>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddSenderPropertyComponent],
      providers: [
        TranslateService,
        NzModalService,
        AlertService,
        SnotifyService,
        MainService,
        UntypedFormBuilder,
        ExtractorService,
        { provide: 'SnotifyToastConfig', useValue: ToastDefaults },
        { provide: TranslateService, useClass: translateServiceMock },
        { provide: MatDialogRef, useValue: {} },
        { provide: MAT_DIALOG_DATA, useValue: {} },
        provideMockStore(),
      ],
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
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddSenderPropertyComponent);
    component = fixture.componentInstance;

    // mockStore.refreshState();
    fixture.detectChanges();
  });
  it(' fuction should make the save sender property is true ', () => {
    component.saveSenderProperty();
    expect(component.submitted).toEqual(true);
  });
  it(' fuction should make the add property to load in Html ', () => {
    component.addProperty();
    expect(component.senderConfig).toBeTruthy;
  });
  it(' fuction should make the remove property to load in Html ', () => {
    component.removeProperty(1);
    expect(component.senderConfig).toBeTruthy;
  });
  it('should Angular calls loadData', () => {
    component.loadData();
    expect(component.data.senderConfig).toBeTruthy;
  });
  it(' fuction should make the render  property  in Html ', () => {
    component.renderData(obj);
    expect(component).toBeTruthy;
  });
  it('view data  fuction should make  in Html ', () => {
    const value = 'Amount';
    component.viewData(value);
    expect(component).toBeTruthy;
  });
  it(' fuction should check the data in Html ', () => {
    const sConfig = [{ property: 'UUID', value: '11' }];
    component.configData(sConfig);
    expect(component).toBeTruthy;
  });
  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
