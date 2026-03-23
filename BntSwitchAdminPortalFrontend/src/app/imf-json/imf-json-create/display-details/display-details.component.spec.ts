import { OverlayModule } from '@angular/cdk/overlay';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { EventEmitter } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { AlertService } from '@app/services/alert.service';
import { SubscribeService } from '@app/services/subscribe.services';
import { SharedModule } from '@app/shared/shared.module';
import { IAppState } from '@app/store/state/app.state';
import { NgSelectModule } from '@ng-select/ng-select';
import { MemoizedSelector, StoreModule } from '@ngrx/store';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { SnotifyService } from 'ng-snotify';
import { NzModalService } from 'ng-zorro-antd/modal';
import { AlertModule, DatePickerRvModule, TabsModule } from 'bnt';
import { of } from 'rxjs';
import { DisplayDetailsComponent } from './display-details.component';
import {selectViewSettingsList} from '@app/store/selectors/view-settings.selector';
import {selectTemplateJson} from '@app/store/selectors/imf-json.selector'
import {selectTemplateDetailsJson} from '@app/store/selectors/imf-json.selector'
import { ImfJsonService } from '@app/services/imf-json.service';

class translateServiceMock {
    public onLangChange: EventEmitter<any> = new EventEmitter();
    public onTranslationChange: EventEmitter<any> = new EventEmitter();
    public onDefaultLangChange: EventEmitter<any> = new EventEmitter();
  
    public get(key: any): any {
      return of(key);
    }

    public setDefaultLang(key: any): any {
      return of(key);
    }
  }

const selectViewSettingsListJson ={
    "status": "success",
    "message": "Find all Setting",
    "data": {
      "pagination": [
        "20",
        "25",
        "30",
        "40",
        "50"
      ],
      "language": [
        "en_EN",
        "en_EN1",
        "fr_FR",
        "en_INV"
      ],
      "settingDto": {
        "id": 1,
        "systemUserId": "SystemUser [firstName=Bnt, lastName=Admin,  email=bnt.admin@bnt.com, systemUserCategory=, password=9AHRz1ElALzTEdFKIKywyzEZh0IcZ/INhbGkbc0Qb84=, passwordLastUpdatedOn=2020-07-02 13:09:08.0, locked=0, deleted=0, lockedReason=null]",
        "search": "contain",
        "language": "en_EN1",
        "pagination": "20"
      },
      "searchOption": [
        "contain",
        "contain2"
      ]
    }
  };
const selectSelectTemplateJson ={};
const selectSelectTemplateDetailsJson = {};  

describe('DisplayDetailsComponent', () => {
  let component: DisplayDetailsComponent;
  let fixture: ComponentFixture<DisplayDetailsComponent>;
  let mockStore: MockStore<IAppState>;
  let translateService: TranslateService;
  let imfJsonService: ImfJsonService
  let mockselectViewSettingsList: MemoizedSelector<any, any>;
  let mockselectTemplate: MemoizedSelector<any, any>;
  let mockselectTemplateDetails: MemoizedSelector<any, any>;

  beforeEach(() => {
    const translateService = jasmine.createSpyObj('TranslateService', ['get', 'setDefaultLang']);
    const alertService = jasmine.createSpyObj('AlertService, SnotifyService', ['responseMessage']);
    TestBed.configureTestingModule({
      declarations: [DisplayDetailsComponent],
      providers: [
        SnotifyService,
        NzModalService,
        // AlertService,
        SubscribeService,
        { provide: TranslateService, useClass: translateServiceMock },
        { provide: 'SnotifyToastConfig', useValue: {} },
        { provide: ImfJsonService, useValue: imfJsonService },
        { provide: AlertService, useValue: alertService },
        provideMockStore(),
      ],
      imports: [
        OverlayModule,
        SharedModule,
        NgSelectModule,
        FormsModule,
        ReactiveFormsModule,
        AlertModule,
        TabsModule,
        TranslateModule.forRoot({}),
        DatePickerRvModule,
        HttpClientTestingModule,
        NgxDatatableModule,
        RouterTestingModule,
        BrowserModule,
        StoreModule.forRoot({}),
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    mockStore = TestBed.get(MockStore);
    fixture = TestBed.createComponent(DisplayDetailsComponent);
    component = fixture.componentInstance;

    mockselectViewSettingsList = mockStore.overrideSelector(
        selectViewSettingsList,
        selectViewSettingsListJson,
      );
      mockselectTemplate = mockStore.overrideSelector(
        selectTemplateJson,
        selectSelectTemplateJson,
      );
      mockselectTemplateDetails = mockStore.overrideSelector(
        selectTemplateDetailsJson,
        selectSelectTemplateDetailsJson,
      );   
    translateService = TestBed.inject(TranslateService);
    mockStore.refreshState();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('click cancel button should function call cancel the page in html', () => {
    component.cancel();
    expect(component.showFieldPopup.emit).toBeTruthy;
  });
  it('click cancel button should function call cancel the page in html', () => {
    component.changeKey();
    expect(component).toBeTruthy;
  });
  it('click cancel button should function call cancel the page in html', () => {
    component.onChangefieldtype();
    expect(component).toBeTruthy;
  });
 
});
