import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { EventEmitter } from '@angular/core';
import { of } from 'rxjs'
import { HolidayListComponent } from './holiday-list.component';
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
import { MainService } from '@app/extractor-ui/mapper/main.service';
import { NzDrawerRef, NzDrawerService } from 'ng-zorro-antd/drawer';
import { HolidayService } from '@app/services/holiday.service';
import { ColumnChangesService, DatatableComponent, DimensionsHelper, ScrollbarHelper } from '@swimlane/ngx-datatable';
class translateServiceMock {
  public onLangChange: EventEmitter<any> = new EventEmitter();
  public onTranslationChange: EventEmitter<any> = new EventEmitter();
  public onDefaultLangChange: EventEmitter<any> = new EventEmitter();
  public get(key: any): any {
    return of(key);
  }
};
xdescribe('HolidayListComponent', () => {
  let component: HolidayListComponent;
  let fixture: ComponentFixture<HolidayListComponent>;
  let mockStore: MockStore<IAppState>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ HolidayListComponent ],
      imports: [
        StoreModule,  SharedModule,NgSelectModule,
        FormsModule,RouterTestingModule,  ReactiveFormsModule,
        // MockStoreModule.forRoot('Location', {}),
        AlertModule,StoreModule.forRoot({}),
        BrowserAnimationsModule,HttpClientTestingModule,TranslateModule,
      ],
      providers : [TranslateService,NzModalService,AlertService,
        SnotifyService,MainService,UntypedFormBuilder, NzDrawerRef,
        NzDrawerService,HolidayService,DatatableComponent,ScrollbarHelper,
        DimensionsHelper,ColumnChangesService,
        { provide: 'SnotifyToastConfig', useValue: ToastDefaults },
        { provide: TranslateService,  useClass: translateServiceMock },
        provideMockStore(),
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HolidayListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  it('Scroll fuction should call', () => {
    const offsety ={isTrusted: true,
      bubbles: false,
      cancelBubble: false,
      cancelable: false,
      composed: false,
      currentTarget: 'datatable-body.datatable-body',
      defaultPrevented: false,
      eventPhase: 2,
      path: [],
      returnValue: true,
      srcElement: 'datatable-body.datatable-body',
      target: 'datatable-body.datatable-body',
timeStamp: 7988.599999904633,
type: "scroll",
    }
    component.onScroll(offsety);
    expect(component.onScroll).toBeDefined;
expect(component.onScroll).toHaveBeenCalled;

  });
  it('loadPage fuction should call after load the component', () => {
    spyOn(component as any, '_transFilters').and.callThrough();
    (component as any).loadPage(1);
    expect(component.request).toBeTruthy;
    expect((component as any)._transFilters).toHaveBeenCalled();
  });
  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
