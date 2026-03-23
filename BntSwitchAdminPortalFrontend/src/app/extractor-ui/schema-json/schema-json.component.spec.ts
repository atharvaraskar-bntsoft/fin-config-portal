import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { SchemaJsonComponent } from './schema-json.component';
import { EventEmitter } from '@angular/core';
import { of } from 'rxjs';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { IAppState } from '@app/store/state/app.state';
import { StoreModule } from '@ngrx/store';
import { SharedModule } from '@app/shared/shared.module';
import { RouterTestingModule } from '@angular/router/testing';
import { UntypedFormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { AlertModule } from 'bnt';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { NzModalService } from 'ng-zorro-antd/modal';
import { AlertService } from '@app/services/alert.service';
import { SnotifyService, ToastDefaults } from 'ng-snotify';
import { MainService } from '../mapper/main.service';

import { GetImfTypeListJsonSuccess } from '@app/store/selectors/imf-json.selector';
import { NzDrawerRef, NzDrawerService } from 'ng-zorro-antd/drawer';
import { CommonModule } from '@angular/common';
class translateServiceMock {
  public onLangChange: EventEmitter<any> = new EventEmitter();
  public onTranslationChange: EventEmitter<any> = new EventEmitter();
  public onDefaultLangChange: EventEmitter<any> = new EventEmitter();
  public get(key: any): any {
    return of(key);
  }
}
const GetImfTypeListJsonSuccessJSON = {};
xdescribe('SchemaJsonComponent', () => {
  let component: SchemaJsonComponent;
  let fixture: ComponentFixture<SchemaJsonComponent>;
  let mockStore: MockStore<IAppState>;
  let mockGetImfTypeListJsonSuccess: MockStore<IAppState>;
  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [SchemaJsonComponent],
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
        CommonModule
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
        provideMockStore(),
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    mockStore = TestBed.get(MockStore);
    fixture = TestBed.createComponent(SchemaJsonComponent);
    component = fixture.componentInstance;

    // GetImfTypeListJsonSuccess = mockStore.overrideSelector(
    //   GetImfTypeListJsonSuccess,
    //   GetImfTypeListJsonSuccessJSON,
    // );
    fixture.detectChanges();
  });
  it('function should call first tab in html', () => {
    component.firstTab();
    expect(component.activeTab).toEqual(0);
  });
  it('function should call second tab in html', () => {
    component.secondTab();
    expect(component.activeTab).toEqual(1);
  });
  it('function should call show fields tab in html', () => {
    component.showInvalidFields();
    expect(component.isVisibleInvalidField).toEqual(true);
  });
  it('function should call handleOk', () => {
    component.handleOk();
    expect(component.isVisibleInvalidField).toEqual(false);
  });
  it('function should call handle cancel', () => {
    component.handleCancel();
    expect(component.isVisibleInvalidField).toEqual(false);
  });
  // it('function should call close the json in html list', () => {
  //   component.closeJson();
  //   expect(component).toBeTruthy;
  // });
  //  it('function should call handle cancel', () => {
  //   const data ={
  //     attributes :[
  //       length = 0
  //     ],
  //   };
  //   component.deleteInValidFieldandValidate(data);
  //   expect(component).toBeTruthy;
  // });
  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
