import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IAppState } from '@app/store/state/app.state';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { EventEmitter } from '@angular/core';
import { of } from 'rxjs';
import { ImfCreationTableComponent } from './imf-creation-table.component';
import { StoreModule } from '@ngrx/store';
import { SharedModule } from '@app/shared/shared.module';
import { NgSelectModule } from '@ng-select/ng-select';
import { UntypedFormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { AlertModule } from 'bnt';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { NzModalService } from 'ng-zorro-antd/modal';
import { AlertService } from '@app/services/alert.service';
import { SnotifyService, ToastDefaults } from 'ng-snotify';
import { MainService } from '../mapper/main.service';
import { A } from '@angular/cdk/keycodes';
import { CommonModule } from '@angular/common';
class translateServiceMock {
  public onLangChange: EventEmitter<any> = new EventEmitter();
  public onTranslationChange: EventEmitter<any> = new EventEmitter();
  public onDefaultLangChange: EventEmitter<any> = new EventEmitter();
  public get(key: any): any {
    return of(key);
  }
};
describe('ImfCreationTableComponent', () => {
  let component: ImfCreationTableComponent;
  let fixture: ComponentFixture<ImfCreationTableComponent>;
  let mockStore: MockStore<IAppState>;
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ImfCreationTableComponent],
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
        TranslateService,NzModalService,AlertService,SnotifyService,MainService,UntypedFormBuilder,
        { provide: 'SnotifyToastConfig', useValue: ToastDefaults },
        { provide: TranslateService, useClass: translateServiceMock },
        provideMockStore(),
      ],
    }).compileComponents();
  });
  beforeEach(() => {
    fixture = TestBed.createComponent(ImfCreationTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  it('function should call click open dialogue box data  in html list', () => {
    component.openDeleteDialog();
    expect(component).toBeTruthy;
  });
  it('function should call click cancel button  html list', () => {
    component.cancel();
    expect(component.visibleAnimate).toEqual(false);
  });
 
  it('function should call click and check field form valid html list', () => {
    component.isFormValid();
    expect(component.isSaveEnable).toEqual(false);
  });
  it('function should call click and check field form valid html list', () => {
    const value = {};
    component.submitIMF(value);
    expect(component).toBeTruthy;
  });
  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
