import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CustomMapperComponent } from './custom-mapper.component';
import { EventEmitter } from '@angular/core';
import { of } from 'rxjs';
import { MatDialogRef } from '@angular/material/dialog';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { ExtractorService } from '@app/services/extractor.service';
import { MainService } from '../main.service';
import { NzModalService } from 'ng-zorro-antd/modal';
import { AlertService } from '@app/services/alert.service';
import { SnotifyService, ToastDefaults } from 'ng-snotify';
import { UntypedFormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { NzDrawerRef } from 'ng-zorro-antd/drawer';
import { StoreModule } from '@ngrx/store';
import { SharedModule } from '@app/shared/shared.module';
import { NgSelectModule } from '@ng-select/ng-select';
import { RouterTestingModule } from '@angular/router/testing';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { AlertModule } from 'bnt';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { HttpClient } from '@angular/common/http';
import { IAppState } from '@app/store/state/app.state';
class translateServiceMock {
  public onLangChange: EventEmitter<any> = new EventEmitter();
  public onTranslationChange: EventEmitter<any> = new EventEmitter();
  public onDefaultLangChange: EventEmitter<any> = new EventEmitter();

  public get(key: any): any {
    return of(key);
  }
  
};
xdescribe('CustomMapperComponent', () => {
  let component: CustomMapperComponent;
  let fixture: ComponentFixture<CustomMapperComponent>;
  let mockStore: MockStore<IAppState>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomMapperComponent ],
      providers : [TranslateService,NzModalService,AlertService,
        SnotifyService,MainService,UntypedFormBuilder,NzDrawerRef,
        { provide: 'SnotifyToastConfig', useValue: ToastDefaults },
        { provide: TranslateService,  useClass: translateServiceMock },
        { provide: MatDialogRef, useValue: {} },
       
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

      ],
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomMapperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
