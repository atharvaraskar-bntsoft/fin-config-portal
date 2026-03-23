import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IAppState } from '@app/store/state/app.state';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { EventEmitter } from '@angular/core';
import { of } from 'rxjs';
import { ExtractorJobConfigComponent } from './extractor-job-config.component';
import { StoreModule } from '@ngrx/store';
import { SharedModule } from '@app/shared/shared.module';
import { NgSelectModule } from '@ng-select/ng-select';
import { UntypedFormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { AlertModule } from 'bnt';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { NzModalService } from 'ng-zorro-antd/modal';
import { AlertService } from '@app/services/alert.service';
import { SnotifyService, ToastDefaults } from 'ng-snotify';
import { MainService } from '@app/extractor-ui/mapper/main.service';
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
xdescribe('ExtractorJobConfigComponent', () => {
  let component: ExtractorJobConfigComponent;
  let fixture: ComponentFixture<ExtractorJobConfigComponent>;
  let mockStore: MockStore<IAppState>;
  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ExtractorJobConfigComponent],
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

        { provide: 'SnotifyToastConfig', useValue: ToastDefaults },
        { provide: TranslateService, useClass: translateServiceMock },
        provideMockStore(),
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExtractorJobConfigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  it(' fuction should call click onsubmit button to save the data in html list  ', () => {
    component.onSubmit({ active: true });
    expect(component).toBeTruthy;
  });
  // it('should call ngOnChanges', () => {
  //   const fixture = TestBed.createComponent(ExtractorJobConfigComponent);
  //   const onchangeComponent = fixture.componentInstance;
  //   onchangeComponent.initialJson = 'Test';

  //   expect(component.disable).toEqual(false);
  //   spyOn(component, 'ngOnChanges').and.callThrough();
  //       fixture.detectChanges();
  // });
  it('should call ngOnChanges', () => {
    component.ngOnChanges();
    expect(component.disable).toEqual(false);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
