import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { EventEmitter } from '@angular/core';
import { of } from 'rxjs';
import { ConstantExtractorComponent } from './constant-extractor.component';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { IAppState } from '@app/store/state/app.state';
import { StoreModule } from '@ngrx/store';
import { SharedModule } from '@app/shared/shared.module';
import { NgSelectModule } from '@ng-select/ng-select';
import { RouterTestingModule } from '@angular/router/testing';
import { UntypedFormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AlertModule } from 'bnt';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { NzModalService } from 'ng-zorro-antd/modal';
import { AlertService } from '@app/services/alert.service';
import { SnotifyService, ToastDefaults } from 'ng-snotify';
import { CommonModule } from '@angular/common';
class translateServiceMock {
  public onLangChange: EventEmitter<any> = new EventEmitter();
  public onTranslationChange: EventEmitter<any> = new EventEmitter();
  public onDefaultLangChange: EventEmitter<any> = new EventEmitter();

  public get(key: any): any {
    return of(key);
  }
}

xdescribe('ConstantExtractorComponent', () => {
  let component: ConstantExtractorComponent;
  let fixture: ComponentFixture<ConstantExtractorComponent>;
  let mockStore: MockStore<IAppState>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ConstantExtractorComponent],
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
        UntypedFormBuilder,

        { provide: 'SnotifyToastConfig', useValue: ToastDefaults },
        { provide: TranslateService, useClass: translateServiceMock },
        provideMockStore(),
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConstantExtractorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  it('function should call click close darwer in html', () => {
    component.closeDrawer();
    expect(component.closeConstant.emit).toBeTruthy;
  });
  it('function should call click close darwer in html', () => {
    component.close();
    expect(component.isVisible).toEqual(false);
  });
  it('function should call click close darwer in html', () => {
    component.addConstant();
    expect(component.conditionObj).toEqual(null);
  });
  it('function should call click save data in html', () => {
    const value = {
      onstantConfig: [
        {
          condition: null,
          packagerField: 'id',
          source: '1111',
        },
      ],
    };
    component.saveConstant(value);
    expect(component.constantValue.emit).toBeTruthy;
  });
  it('view details function should call click view data in html', () => {
    const data = {
      condition: null,
      packagerField: 'id',
      source: '1111',
    };
    component.viewData(data);
    expect(component).toBeTruthy;
  });
  it('function should call click remove condition data  in html list', () => {
    const i = 0;
    component.removeConstant(i);
    expect(component).toBeTruthy;
  });
  // it('function should call click delete condition data  in html list', () => {
  //   component. openCondition(1) ;
  //   expect(component.isVisible).toEqual(true);
  //   expect(component.conditionObj).toEqual(null);
  // });
  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
