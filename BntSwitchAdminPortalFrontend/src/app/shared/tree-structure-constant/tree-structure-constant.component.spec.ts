import { CommonModule } from '@angular/common';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { EventEmitter } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { ImportFileService } from '@app/services/import-file.service';
import { IAppState } from '@app/store/state/app.state';
import { NgSelectModule } from '@ng-select/ng-select';
import { StoreModule } from '@ngrx/store';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { SnotifyService } from 'ng-snotify';
import { AlertModule, TabsModule, DatePickerRvModule } from 'bnt';
import { async, of } from 'rxjs';
import { SharedModule } from '../shared.module';

import { TreeStructureConstantComponent } from './tree-structure-constant.component';
class translateServiceMock {
  public onLangChange: EventEmitter<any> = new EventEmitter();
  public onTranslationChange: EventEmitter<any> = new EventEmitter();
  public onDefaultLangChange: EventEmitter<any> = new EventEmitter();

  public get(key: any): any {
    return of(key);
  }
}
const data = {
  name: 'transaction_type',
  type: 'field',
  alias: 'TransactionType',
  nestedName: 'transaction_type',
  useCase: '1',
  datatype: null,
  data: ['Cash Withdrawal'],
  attributes: null,
  operator: [
    {
      text: 'Equal',
      value: 'equal',
      key: 'value',
    },
    {
      text: 'Like',
      value: 'like',
      key: 'pattern',
    },
    {
      text: 'In',
      value: 'in',
      key: 'value',
    },
    {
      text: 'StartsWith',
      value: 'starts_with',
      key: 'value',
    },
    {
      text: 'RegEx',
      value: 'pattern',
      key: 'pattern',
    },
    {
      text: 'GreaterThan',
      value: 'greaterThan',
      key: 'value',
    },
    {
      text: 'LessThan',
      value: 'lessThan',
      key: 'value',
    },
    {
      text: 'GreaterThanEqual',
      value: 'greaterThanEqual',
      key: 'value',
    },
    {
      text: 'LessThanEqual',
      value: 'lessThanEqual',
      key: 'value',
    },
    {
      text: 'Null',
      value: 'null',
      key: 'value',
    },
  ],
  fieldsType: null,
};
const value = ' ';
const event = 'synthetic%1';
xdescribe('TreeStructureConstantComponent', () => {
  let component: TreeStructureConstantComponent;
  let fixture: ComponentFixture<TreeStructureConstantComponent>;
  let mockStore: MockStore<IAppState>;
  let translateService: TranslateService;
  const importFileService = jasmine.createSpyObj('ImportFileService', ['clearData']);
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TreeStructureConstantComponent],
      providers: [
        SnotifyService,
        { provide: TranslateService, useClass: translateServiceMock },
        { provide: 'SnotifyToastConfig', useValue: {} },
        { provide: ImportFileService, useValue: importFileService },
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
    mockStore = TestBed.get(MockStore);
    fixture = TestBed.createComponent(TreeStructureConstantComponent);
    component = fixture.componentInstance;

    translateService = TestBed.inject(TranslateService);
    mockStore.refreshState();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('onChange fuction should call', () => {
    component.onChange(event);
    expect(component.onChange).toBeDefined;
    expect(component.onChange).toHaveBeenCalled;
  });
  it('selectImfFn fuction should call', () => {
    component.selectImfFn(value);
    expect(component.selectImfFn).toBeDefined;
    expect(component.selectImfFn).toHaveBeenCalled;
  });
  it('callfn fuction should call', () => {
    component.callfn(data);
    expect(component.callfn).toBeDefined;
    expect(component.callfn).toHaveBeenCalled;
  });
  afterEach(() => {
    fixture.destroy();
  });
});
