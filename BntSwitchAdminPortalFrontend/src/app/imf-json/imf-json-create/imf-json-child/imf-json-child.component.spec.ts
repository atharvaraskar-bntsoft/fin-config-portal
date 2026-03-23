import { OverlayModule } from '@angular/cdk/overlay';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { EventEmitter } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { AlertService } from '@app/services/alert.service';
import { ImportFileService } from '@app/services/import-file.service';
import { SubscribeService } from '@app/services/subscribe.services';
import { SharedModule } from '@app/shared/shared.module';
import { NgSelectModule } from '@ng-select/ng-select';
import { MemoizedSelector, StoreModule } from '@ngrx/store';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { SnotifyService } from 'ng-snotify';
import { NzModalService } from 'ng-zorro-antd/modal';
import { AlertModule, DatePickerRvModule, TabsModule } from 'bnt';
import { of } from 'rxjs';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { ImfJsonChildComponent } from './imf-json-child.component';
import {selectViewSettingsList} from '@app/store/selectors/view-settings.selector';
import { IAppState } from '@app/store/state/app.state';
class translateServiceMock {
  public onLangChange: EventEmitter<any> = new EventEmitter();
  public onTranslationChange: EventEmitter<any> = new EventEmitter();
  public onDefaultLangChange: EventEmitter<any> = new EventEmitter();

  public get(key: any): any {
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
describe('ImfJsonChildComponent', () => {
  let component: ImfJsonChildComponent;
  let fixture: ComponentFixture<ImfJsonChildComponent>;
  let mockselectViewSettingsList: MemoizedSelector<any, any>;
  let mockStore: MockStore<IAppState>;
  let translateService: TranslateService;
  const importFileService = jasmine.createSpyObj('ImportFileService', ['clearData']);
  const alertService = jasmine.createSpyObj('AlertService, SnotifyService', ['responseMessage']);
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ImfJsonChildComponent],
      providers: [
        SnotifyService,
        NzModalService,
        // AlertService,
        SubscribeService,
        { provide: TranslateService, useClass: translateServiceMock },
        { provide: 'SnotifyToastConfig', useValue: {} },
        { provide: ImportFileService, useValue: importFileService },
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
    mockStore = TestBed.get(MockStore);
    fixture = TestBed.createComponent(ImfJsonChildComponent);
    component = fixture.componentInstance;
    mockselectViewSettingsList = mockStore.overrideSelector(
      selectViewSettingsList,
      selectViewSettingsListJson,
    );
    translateService = TestBed.inject(TranslateService);
    mockStore.refreshState();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('select IMF should function call Event ', () => {
    const $event={};
    component.selectedIMF($event);
    expect(component).toBeDefined;
  });
  it('select should function call reset node  ', () => {
    const key={};
    component.resetNode(key);
    expect(component).toBeNull;
  });
  it('should function call obtain value  ', () => {
    const value={};
    component.isObject(value);
    expect(component).toBeTruthy;
  });
  it('should function call obtain value  ', () => {
    component.changeKey();
    expect(component).toBeTruthy;
  });
  it('should function call obtain value  ', () => {
    component.length();
    expect(component).toBeTruthy;
  });
  it('should function call add item field value  ', () => {
    const item={};
    component.addField(item);
    expect(component).toBeTruthy;
  });
  it('should function call add nested field item ', () => {
    const item={};
    component.addNestedField(item);
    expect(component.addTpl).toEqual(true);
    expect(component.inputKey).toBeNull;
  });
  it('should function call change field tuype in row list ', () => {
    const $event={};
    component.fieldTypeChange($event);
    expect(component).toBeTruthy;
  });
  // it('should function call change field tuype in row list ', () => {
  //   const $event={};
  //   component.isIMFSubmitted($event);
  //   expect(component.addTpl).toEqual(true);
  // });
  it('should function call obtain value  ', () => {
    const node={};
    component.clickNode(node);
    expect(component).toBeTruthy;
  });
  it('should function call obtain value  ', () => {
    const json={};
    component.checkDisable(json);
    expect(component).toBeTruthy;
  });
  it('should function call obtain value  ', () => {
    component.isLastIndex(null, 1) ;
    expect(component).toBeTruthy;
  });
});
