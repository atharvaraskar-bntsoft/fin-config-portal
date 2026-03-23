import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { EventEmitter } from '@angular/core';
import { of } from 'rxjs';
import { StepComponent } from './step.component';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { IAppState } from '@app/store/state/app.state';
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
import { MainService } from '../main.service';
import { ExtractorService } from '@app/services/extractor.service';
import { NzDrawerRef } from 'ng-zorro-antd/drawer';
import { CommonModule } from '@angular/common';
class translateServiceMock {
  public onLangChange: EventEmitter<any> = new EventEmitter();
  public onTranslationChange: EventEmitter<any> = new EventEmitter();
  public onDefaultLangChange: EventEmitter<any> = new EventEmitter();
  public get(key: any): any {
    return of(key);
  }
}
xdescribe('StepComponent', () => {
  let component: StepComponent;
  let fixture: ComponentFixture<StepComponent>;
  let mockStore: MockStore<IAppState>;
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StepComponent],
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
        NzDrawerRef,
        { provide: 'SnotifyToastConfig', useValue: ToastDefaults },
        { provide: TranslateService, useClass: translateServiceMock },
        provideMockStore(),
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StepComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
