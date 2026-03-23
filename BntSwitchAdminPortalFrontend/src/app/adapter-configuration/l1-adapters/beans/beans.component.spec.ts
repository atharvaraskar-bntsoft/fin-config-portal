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
import { selectViewSettingsList } from '@app/store/selectors/view-settings.selector';
import { BeansComponent } from './beans.component';
import { selectVersionData } from '@app/store/selectors/l1-adapter.selectors';
import { CommonModule } from '@angular/common';
class translateServiceMock {
  public onLangChange: EventEmitter<any> = new EventEmitter();
  public onTranslationChange: EventEmitter<any> = new EventEmitter();
  public onDefaultLangChange: EventEmitter<any> = new EventEmitter();

  public get(key: any): any {
    return of(key);
  }
}
const selectViewSettingsListJson = {
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
const selectVersionDataJson = [null];

xdescribe('BeansComponent', () => {
  let component: BeansComponent;
  let fixture: ComponentFixture<BeansComponent>;
  let mockStore: MockStore<IAppState>;
  let mockselectViewSettingsList: MemoizedSelector<any, any>;
  let mockselectVersionData: MemoizedSelector<any, any>;
  let translateService: TranslateService;
  const importFileService = jasmine.createSpyObj('ImportFileService', ['clearData']);
  beforeEach(() => {
    const translateService = jasmine.createSpyObj('TranslateService', ['get', 'setDefaultLang']);
    const alertService = jasmine.createSpyObj('AlertService, SnotifyService', ['responseMessage']);
    TestBed.configureTestingModule({
      declarations: [BeansComponent],
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
        CommonModule
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    mockStore = TestBed.inject(MockStore);
    fixture = TestBed.createComponent(BeansComponent);
    component = fixture.componentInstance;

    mockselectViewSettingsList = mockStore.overrideSelector(
      selectViewSettingsList,
      selectViewSettingsListJson,
    );
    mockselectVersionData = mockStore.overrideSelector(selectVersionData, selectVersionDataJson);
    translateService = TestBed.inject(TranslateService);
    mockStore.refreshState();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('draftTransform fuction should call', () => {
    component.draftTransform();
    expect(component.draftTransform).toBeDefined;
    expect(component.draftTransform).toHaveBeenCalled;
  });
  it('prevTabValue fuction should call', () => {
    component.prevTabValue();
    expect(component.tabValue).toBeTruthy;
  });
  it('checkData fuction should call', () => {
    component.checkData();
    expect(component.checkData).toBeDefined;
    expect(component.checkData).toHaveBeenCalled;
  });
  // it('versionData fuction should call', () => {
  //   const deviceComponentObj = Object.getPrototypeOf(component);
  //   component.versionData();
  //   expect(deviceComponentObj.versionData).toBeDefined;
  //   expect(deviceComponentObj.versionData).toHaveBeenCalled;
  // });
  // it('versionData fuction should call', () => {
  //   component.versionData();
  //   const deviceComponentObj = Object.getPrototypeOf(component);
  //   component.versionData();
  //   expect(deviceComponentObj.validate).toHaveBeenCalled;
  //   expect(component.btnDisable).toEqual(false);
  // });
  it('should clear search value', () => {
    const deviceComponentObj = Object.getPrototypeOf(component);
    const storeSpy = jasmine.createSpy('dispatch').and.callThrough();
    component.versionData();
    fixture.detectChanges();
    expect(storeSpy).toHaveBeenCalledTimes(0);
  });

  afterEach(() => {
    fixture.destroy();
  });
});
