import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { UntypedFormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { AlertService } from '@app/services/alert.service';
import { SharedModule } from '@app/shared/shared.module';
import { NgSelectModule } from '@ng-select/ng-select';
import { StoreModule } from '@ngrx/store';
import { provideMockStore } from '@ngrx/store/testing';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { SnotifyService, ToastDefaults } from 'ng-snotify';
import { NzModalService } from 'ng-zorro-antd/modal';
import { AlertModule } from 'bnt';
import { MainService } from '../../main.service';
import { EventEmitter } from '@angular/core';
import { of } from 'rxjs';
import { JoinResponseComponent } from './response.component';
import { L1AdapterService } from '@app/services/l1-adapter.service';
import { CommonModule } from '@angular/common';
class translateServiceMock {
  public onLangChange: EventEmitter<any> = new EventEmitter();
  public onTranslationChange: EventEmitter<any> = new EventEmitter();
  public onDefaultLangChange: EventEmitter<any> = new EventEmitter();

  public get(key: any): any {
    return of(key);
  }
}
xdescribe('JoinResponseComponent', () => {
  let component: JoinResponseComponent;
  let fixture: ComponentFixture<JoinResponseComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [JoinResponseComponent],
      providers: [
        TranslateService,
        NzModalService,
        AlertService,
        SnotifyService,
        MainService,
        UntypedFormBuilder,
        L1AdapterService,
        { provide: 'SnotifyToastConfig', useValue: ToastDefaults },
        { provide: TranslateService, useClass: translateServiceMock },
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
    fixture = TestBed.createComponent(JoinResponseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
