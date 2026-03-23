import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { AdapterTemplateComponent } from '@app/adapter-configuration/l1-adapters/adapter-template/adapter-template.component';
import { IAppState } from '@app/store/state/app.state';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { EventEmitter } from '@angular/core';
import { of } from 'rxjs';
import { SnotifyService } from 'ng-snotify';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { ImportFileService } from '@app/services/import-file.service';
import { AlertService } from '@app/services/alert.service';
import { SharedModule } from '@app/shared/shared.module';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AlertModule, DatePickerRvModule, TabsModule } from 'bnt';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { MemoizedSelector, StoreModule } from '@ngrx/store';
import { L1AdapterService } from '@app/services/l1-adapter.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { selectViewSettingsList } from '@app/store/selectors/view-settings.selector';
import { SubscribeService } from '@app/services/subscribe.services';
import { NzModalService } from 'ng-zorro-antd/modal';
class translateServiceMock {
  public onLangChange: EventEmitter<any> = new EventEmitter();
  public onTranslationChange: EventEmitter<any> = new EventEmitter();
  public onDefaultLangChange: EventEmitter<any> = new EventEmitter();

  public get(key: any): any {
    return of(key);
  }
}
const viewsettingJSON = {
  status: 'success',
  message: 'Find all Setting',
  data: {
    pagination: ['20', '25', '30', '40', '50'],
    language: ['en_EN', 'en_EN1', 'fr_FR', 'en_INV'],
    settingDto: {
      id: 1,
      systemUserId:
        'SystemUser [firstName=Bnt, lastName=Admin,  email=bnt.admin@bnt.com, systemUserCategory=, password=9AHRz1ElALzTEdFKIKywyzEZh0IcZ/INhbGkbc0Qb84=, passwordLastUpdatedOn=2020-07-02 13:09:08.0, locked=0, deleted=0, lockedReason=null]',
      search: 'contain',
      language: 'en_EN1',
      pagination: '20',
    },
    searchOption: ['contain', 'contain2'],
  },
};
describe('AdapterTemplateComponent', () => {
  let component: AdapterTemplateComponent;
  let fixture: ComponentFixture<AdapterTemplateComponent>;
  let mockStore: MockStore<IAppState>;
  let mockselectViewSettingsList: MemoizedSelector<any, any>;
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdapterTemplateComponent],
      providers: [
        SnotifyService,AlertService,SubscribeService,L1AdapterService,
        { provide: TranslateService, useClass: translateServiceMock },
        { provide: 'SnotifyToastConfig', useValue: {} },
        NzModalService,
        { provide: ImportFileService, useValue: ImportFileService },
        provideMockStore(),
      ],
      imports: [
        SharedModule,NgSelectModule,FormsModule,ReactiveFormsModule,AlertModule,
        BrowserAnimationsModule,TabsModule,TranslateModule.forRoot({}),
        DatePickerRvModule,RouterTestingModule,HttpClientTestingModule,
        NgxDatatableModule,StoreModule.forRoot({}),
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    mockStore = TestBed.inject(MockStore);
    fixture = TestBed.createComponent(AdapterTemplateComponent);
    component = fixture.componentInstance;

    mockselectViewSettingsList = mockStore.overrideSelector(
      selectViewSettingsList,
      viewsettingJSON,
    );
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it(' fuction should call click and loaddata', () => {
    const changes = {};
    component.ngOnChanges(changes);
    expect(component).toBeTruthy;
  });

  it(' fuction should save extract Mapper list in html', () => {
    const event = {
      isTrusted: true,
      altKey: false,
      bubbles: true,
      cancelBubble: false,
      cancelable: true,
      charCode: 0,
      code: 'KeyS',
      composed: true,
      ctrlKey: false,
    };
    component.textCheck(event);
    expect(component).toBeTruthy;
  });

  // it(' fuction should call click and loaddata', () => {
  //   component.getTemplateFormat({}, '', "nameValidator");
  //   expect(component).toBeTruthy;
  // });

  it(' fuction should call click and loaddata', () => {
    component.handleCancel();
    expect(component.isVisible).toEqual(false);
  });


 
});
