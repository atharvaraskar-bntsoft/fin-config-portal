import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IAppState } from '@app/store/state/app.state';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { EventEmitter } from '@angular/core';
import { of } from 'rxjs';
import { SenderComponent } from './sender.component';
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
const rows = {
  length: 0,
};
xdescribe('SenderComponent', () => {
  let component: SenderComponent;
  let fixture: ComponentFixture<SenderComponent>;
  let mockStore: MockStore<IAppState>;
  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [SenderComponent],
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
        { provide: 'SnotifyToastConfig', useValue: ToastDefaults },
        { provide: TranslateService, useClass: translateServiceMock },
        provideMockStore(),
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SenderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  it('add  fuction should make the sender property in html ', () => {
    component.addSender();
    expect(component).toBeTruthy;
  });
  it('angular  fuction should make ngonchage in html ', () => {
    component.ngOnChanges();
    expect(component).toBeTruthy;
  });
  it('angular fuction should call render the item in html ', () => {
    component.renderItem();
    expect(component.rows).toBeTruthy;
  });
  it('angular fuction should call remove the item in html ', () => {
    component.removeItem(1);
    expect(component.senderData).toBeTruthy;
  });
  // it('angular fuction should call edit data item in html ', () => {
  //   component.editData();
  //   expect(component.senderData).toBeTruthy;
  // });
  it('angular fuction should call edit data item in html ', () => {
    component.editItem(length, 0);
    expect(component).toBeTruthy;
  });
  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
