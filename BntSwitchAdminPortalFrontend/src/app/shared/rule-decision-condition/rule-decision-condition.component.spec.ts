import { HttpClientTestingModule } from '@angular/common/http/testing';
import { EventEmitter } from '@angular/core';
import { ComponentFixture, fakeAsync, TestBed, waitForAsync } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { RouterTestingModule } from '@angular/router/testing';
import { AlertService } from '@app/services/alert.service';
import { ImportFileService } from '@app/services/import-file.service';
import { IAppState } from '@app/store/state/app.state';
import { NgSelectModule } from '@ng-select/ng-select';
import { MemoizedSelector, StoreModule } from '@ngrx/store';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { SnotifyService } from 'ng-snotify';
import { AlertModule, TabsModule, DatePickerRvModule } from 'bnt';
import { of } from 'rxjs';
import { SharedModule } from '../shared.module';
import { selectViewSettingsList } from '@app/store/selectors/view-settings.selector';
import { RuleDecisionConditionComponent } from './rule-decision-condition.component';
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
xdescribe('RuleDecisionConditionComponent', () => {
  let component: RuleDecisionConditionComponent;
  let fixture: ComponentFixture<RuleDecisionConditionComponent>;
  let mockStore: MockStore<IAppState>;
  let mockselectViewSettingsList: MemoizedSelector<any, any>;
  let translateService: TranslateService;
  const importFileService = jasmine.createSpyObj('ImportFileService', ['clearData']);
  beforeEach(() => {
    const translateService = jasmine.createSpyObj('TranslateService', ['get', 'setDefaultLang']);
    const alertService = jasmine.createSpyObj('AlertService, SnotifyService', ['responseMessage']);
    TestBed.configureTestingModule({
      declarations: [RuleDecisionConditionComponent],
      providers: [
        SnotifyService,
        { provide: TranslateService, useClass: translateServiceMock },
        { provide: MatDialogRef, useValue: {} },
        { provide: MAT_DIALOG_DATA, useValue: [] },
        { provide: 'SnotifyToastConfig', useValue: {} },
        { provide: ImportFileService, useValue: importFileService },
        { provide: AlertService, useValue: alertService },

        provideMockStore(),
      ],
      imports: [
        SharedModule,
        NgSelectModule,
        FormsModule,
        MatDialogModule,
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
    fixture = TestBed.createComponent(RuleDecisionConditionComponent);
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
  it('should call getFilterAddressData function', fakeAsync(() => {
    component.addrule();
    expect(component.addrule).toBeDefined;
    expect(component.addrule).toHaveBeenCalled;
  }));
  it('should call getFilterAddressData function', fakeAsync(() => {
    const e = { key: 'value', text: 'Equal', value: 'equal' };
    const node = { fieldName: '${transaction_type}', id: '0' };
    component.filedsData(node, e);
    expect(component.addrule).toBeDefined;
    expect(component.addrule).toHaveBeenCalled;
  }));

  it('should create', () => {
    component.textData();
    expect(component.error).toEqual(false);
  });
  it('should create', () => {
    const node = { fieldName: '${transaction_type}', id: '0' };
    component.isLeaf(node);
    expect(component.isLeaf(node)).toBeDefined;
  });
  it('should create', () => {
    const e = { key: 'value', text: 'Equal', value: 'equal' };
    const node = { fieldName: '${transaction_type}', id: '0' };
    component.toData(node, e);
    expect(component.toData(node, e)).toBeDefined;
  });
  it('should create', () => {
    const node = { fieldName: '${transaction_type}', id: '0' };
    component.condition(node);
    expect(component.condition(node)).toBeDefined;
  });

  it('should Isvalid Function', () => {
    component.isValid(name);
    expect(component).toBeDefined;
  });
  it('should Isvalid Function', () => {
    const e = { key: 'value', text: 'Equal', value: 'equal' };
    const node = { fieldName: '${transaction_type}', id: '0', message: 'asd' };
    component.typeChange(e, node);
    expect(component).toBeDefined;
    component.typeChange(e, node);
    // expect(component).toEqual('response_message');
  });

  afterEach(() => {
    fixture.destroy();
  });
});
