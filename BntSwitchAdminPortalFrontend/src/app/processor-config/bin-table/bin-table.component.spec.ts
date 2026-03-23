import { HttpClientTestingModule } from '@angular/common/http/testing';
import { EventEmitter } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { AlertService } from '@app/services/alert.service';
import { ImportFileService } from '@app/services/import-file.service';
import { SharedModule } from '@app/shared/shared.module';
import { IAppState } from '@app/store/state/app.state';
import { NgSelectModule } from '@ng-select/ng-select';
import { MemoizedSelector, StoreModule } from '@ngrx/store';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { SnotifyService } from 'ng-snotify';
import { AlertModule, DatePickerRvModule, TabsModule } from 'bnt';
import { of } from 'rxjs';
import {selectViewSettingsList} from '@app/store/selectors/view-settings.selector';
import { BinTableComponent } from './bin-table.component';
import {selectGetBinTable} from '@app/store/selectors/bin-table.selector'
class translateServiceMock {
  public onLangChange: EventEmitter<any> = new EventEmitter();
  public onTranslationChange: EventEmitter<any> = new EventEmitter();
  public onDefaultLangChange: EventEmitter<any> = new EventEmitter();

  public get(key: any): any {
    return of(key);
  }
}
const selectViewSettingsListJson={
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
const selectGetBinTableJson={
  "status": "success",
  "message": "Find all BinMaster",
  "data": {
    "total-record": 1,
    "page-no": 1,
    "BinMasterList": [
      {
        "id": 1,
        "fileName": "SBSA_Binfile_v1.1.xml",
        "uploadedOn": 1646646961000,
        "activateOn": 1646645400000,
        "active": "1",
        "binTable": null
      }
    ],
    "total-filtered-record": 1
  }
};
describe('BinTableComponent', () => {
  let component: BinTableComponent;
  let fixture: ComponentFixture<BinTableComponent>;
  let mockStore: MockStore<IAppState>;
  let mockselectGetBinTable: MemoizedSelector<any, any>;
  let mockselectViewSettingsList: MemoizedSelector<any, any>;
  let translateService: TranslateService;
  const importFileService = jasmine.createSpyObj('ImportFileService', ['clearData']);
  beforeEach(() => {
    const translateService = jasmine.createSpyObj('TranslateService', ['get', 'setDefaultLang']);
    const alertService = jasmine.createSpyObj('AlertService, SnotifyService', ['responseMessage']);
    TestBed.configureTestingModule({
      declarations: [BinTableComponent],
      providers: [
        SnotifyService,
        { provide: TranslateService, useClass: translateServiceMock },
        { provide: 'SnotifyToastConfig', useValue: {} },
        { provide: ImportFileService, useValue: importFileService },
        { provide: AlertService, useValue: alertService },
        
        provideMockStore(),
      ],
      imports: [
        SharedModule,
        NgSelectModule,
        FormsModule,
        ReactiveFormsModule,
        AlertModule,
        TabsModule,
        TranslateModule.forRoot({}),
        DatePickerRvModule,
        RouterTestingModule,
        HttpClientTestingModule,
        NgxDatatableModule,
        //ImportFileModule,
        StoreModule.forRoot({}),
      ],
    }).compileComponents();
  });

  
  beforeEach(() => {
    mockStore = TestBed.inject(MockStore);
    fixture = TestBed.createComponent(BinTableComponent);
    component = fixture.componentInstance;


    mockselectViewSettingsList = mockStore.overrideSelector(
      selectViewSettingsList,
      selectViewSettingsListJson
    );
    mockselectGetBinTable = mockStore.overrideSelector(
      selectGetBinTable,
      selectGetBinTableJson
    );
    
    translateService = TestBed.inject(TranslateService);
    mockStore.refreshState();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('openPopUp fuction should open the PopUp', () => {
    component.openPopUp();
    expect(component.visiblePopUp).toEqual(true);
  });
  it('cancelPopUp fuction should open the cancelPopUp', () => {
    component.cancelPopUp();
    expect(component.visiblePopUpAnimate).toEqual(false);
  });
  it('Scroll fuction should call', () => {
    component.onScroll(event);
    expect(component.onScroll).toBeDefined;
    expect(component.onScroll).toHaveBeenCalled;
  });
  it('openDialog fuction should called the OpenPopUp', () => {
    spyOn(component,'openPopUp').and.callThrough();
    component.openPopUp();
    expect(component.request).toBe(false);
    component.openDialog();
    expect(component.openPopUp).toHaveBeenCalled();
  });
  it('saveUpload fuction should called the cancelPopUp', () => {
    spyOn(component,'cancelPopUp').and.callThrough();
    component.cancelPopUp();
    expect(component.request).toBe(false);
    component.saveUpload();
    expect(component.cancelPopUp).toHaveBeenCalled();
  });
  it('selectedFile fuction should call', () => {
    component.selectedFile(event);
    expect(component.selectedFile).toBeDefined;
    expect(component.selectedFile).toHaveBeenCalled;
  });
  it('onScheduleDateChange fuction should call', () => {
    component.onScheduleDateChange(event);
    expect(component.onScheduleDateChange).toBeDefined;
    expect(component.onScheduleDateChange).toHaveBeenCalled;
  });
  
  afterEach(() => {
    fixture.destroy();
  });
});
