import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { AlertService } from '@app/services/alert.service';
import { IAppState } from '@app/store/state/app.state';
import { MemoizedSelector, StoreModule } from '@ngrx/store';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { SnotifyService, ToastDefaults } from 'ng-snotify';
import { NzModalService } from 'ng-zorro-antd/modal';
import { CUSTOM_ELEMENTS_SCHEMA, EventEmitter } from '@angular/core';
import { of } from 'rxjs';
import { SchemaJsonComponent } from './schema-json.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { RouterTestingModule } from '@angular/router/testing';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { AlertModule } from 'bnt';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { GetImfTypeListJsonSuccess } from '@app/store/selectors/imf-json.selector';
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
const GetImfTypeListJsonSuccessJSON = [];
describe('SchemaJsonComponent', () => {
  let component: SchemaJsonComponent;
  let fixture: ComponentFixture<SchemaJsonComponent>;
  let mockStore: MockStore<IAppState>;
  let mockGetImfTypeListJsonSuccess: MemoizedSelector<any, any>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [SchemaJsonComponent],
      providers: [
        TranslateService,
        NzModalService,
        AlertService,
        SnotifyService,
        L1AdapterService,

        { provide: 'SnotifyToastConfig', useValue: ToastDefaults },

        { provide: TranslateService, useClass: translateServiceMock },
        provideMockStore(),
      ],
      imports: [
        StoreModule,
        FormsModule,
        ReactiveFormsModule,
        NgSelectModule,
        FormsModule,
        RouterTestingModule,
        NgxDatatableModule,

        // MockStoreModule.forRoot('Location', {}),
        AlertModule,
        StoreModule.forRoot({}),
        BrowserAnimationsModule,
        HttpClientTestingModule,
        TranslateModule,
        CommonModule
      ],
      schemas:[CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();
  }));

  beforeEach(() => {
    mockStore = TestBed.get(MockStore);
    fixture = TestBed.createComponent(SchemaJsonComponent);
    component = fixture.componentInstance;

    mockGetImfTypeListJsonSuccess = mockStore.overrideSelector(
      GetImfTypeListJsonSuccess,
      GetImfTypeListJsonSuccessJSON,
    );
    mockStore.refreshState();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  afterEach(() => {
    fixture.destroy();
  });
});
