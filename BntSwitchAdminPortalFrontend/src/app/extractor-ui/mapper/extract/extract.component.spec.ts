import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { EventEmitter } from '@angular/core';
import { of } from 'rxjs'
import { ExtractComponent } from './extract.component';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { IAppState } from '@app/store/state/app.state';
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
import { MainService } from '../main.service';
import { AddRoleService } from '@app/services/add-role.service';
import { NzDrawerService } from 'ng-zorro-antd/drawer';
import { L1AdapterService } from '@app/services/l1-adapter.service';
import { CommonModule } from '@angular/common';
class translateServiceMock {
  public onLangChange: EventEmitter<any> = new EventEmitter();
  public onTranslationChange: EventEmitter<any> = new EventEmitter();
  public onDefaultLangChange: EventEmitter<any> = new EventEmitter();
  public get(key: any): any {
    return of(key);
  }
};
xdescribe('ExtractComponent', () => {
  let component: ExtractComponent;
  let fixture: ComponentFixture<ExtractComponent>;
  let mockStore: MockStore<IAppState>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ExtractComponent ],
      imports: [
        StoreModule,  SharedModule,NgSelectModule,
        FormsModule,RouterTestingModule,  ReactiveFormsModule,
        // MockStoreModule.forRoot('Location', {}),
        AlertModule,StoreModule.forRoot({}),
        BrowserAnimationsModule, HttpClientTestingModule, TranslateModule,
        CommonModule
      ],
      providers : [TranslateService,NzModalService,AlertService,
        SnotifyService,MainService,UntypedFormBuilder,AddRoleService, 
        NzDrawerService,L1AdapterService,
        { provide: 'SnotifyToastConfig', useValue: ToastDefaults },
        { provide: TranslateService,  useClass: translateServiceMock },
        provideMockStore(),
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExtractComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
