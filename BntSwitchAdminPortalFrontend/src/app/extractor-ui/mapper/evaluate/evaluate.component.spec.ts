import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { EventEmitter } from '@angular/core';
import { of } from 'rxjs'
import { EvaluateComponent } from './evaluate.component';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { IAppState } from '@app/store/state/app.state';
import { StoreModule } from '@ngrx/store';
import { NgSelectModule } from '@ng-select/ng-select';
import { SharedModule } from '@app/shared/shared.module';
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
import { NzDrawerRef } from 'ng-zorro-antd/drawer';
class translateServiceMock {
  public onLangChange: EventEmitter<any> = new EventEmitter();
  public onTranslationChange: EventEmitter<any> = new EventEmitter();
  public onDefaultLangChange: EventEmitter<any> = new EventEmitter();
  public get(key: any): any {
    return of(key);
  }
};
describe('EvaluateComponent', () => {
  let component: EvaluateComponent;
  let fixture: ComponentFixture<EvaluateComponent>;
  let mockStore: MockStore<IAppState>;
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ EvaluateComponent ],
      imports: [
        StoreModule,
        SharedModule,
        NgSelectModule,
        FormsModule,
        RouterTestingModule,
        NgxDatatableModule,
        ReactiveFormsModule,
        // MockStoreModule.forRoot('Location', {}),
        AlertModule,StoreModule.forRoot({}),
        BrowserAnimationsModule,HttpClientTestingModule,TranslateModule,
      ],
      providers : [TranslateService,NzModalService,AlertService,
        SnotifyService,MainService,UntypedFormBuilder,NzDrawerRef,
        { provide: 'SnotifyToastConfig', useValue: ToastDefaults },
        { provide: TranslateService,  useClass: translateServiceMock },
        provideMockStore(),
      ],
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EvaluateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
 
  it(' fuction should make the add the data in html list', () => {
    component.addEvaluate();
    expect(component.submit).toEqual(false);
  });
  
  it(' fuction should make the remove custom the data in html list', () => {
    component.removeCustomMap(1);
    expect(component).toBeTruthy;
  });
  it(' fuction should make the remove the data in html list', () => {
    component.remove(1);
    expect(component).toBeTruthy;
  });
  it(' fuction should make the remove the data in html list', () => {
    component.addMap(1);
    expect(component).toBeTruthy;
  });
  
  it('should  Angular calls defaultFilters in ngOnInit', () => {
    component.ngOnInit();
    const parseObj = JSON.parse(null);
    component.getEvaluateObj;
  });
  // it(' fuction should make the save the data in html ', () => {
  //   component.save();
  //   expect(component.submit).toEqual(true);
  // });

  // it(' fuction should make the add the data in html list', () => {
  //   component.cancel();
  //   // const evaluateObj={};
  //   expect(component).toBeTruthy;
  // });
  it('should create', () => {
    expect(component).toBeTruthy();
  });
  afterEach(() => {
    fixture.destroy();
  });
});
