import { CommonModule } from '@angular/common';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { EventEmitter } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { AlertService } from '@app/services/alert.service';
import { ImportFileService } from '@app/services/import-file.service';
import { IAppState } from '@app/store/state/app.state';
import { NgSelectModule } from '@ng-select/ng-select';
import { StoreModule } from '@ngrx/store';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { TranslateService, TranslateModule } from '@ngx-translate/core';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { SnotifyService } from 'ng-snotify';
import { AlertModule, TabsModule, DatePickerRvModule } from 'bnt';
import { of } from 'rxjs';
import { SharedModule } from '../shared.module';

import { StructuredDataTableComponent } from './structured-data-table.component';
class translateServiceMock {
  public onLangChange: EventEmitter<any> = new EventEmitter();
  public onTranslationChange: EventEmitter<any> = new EventEmitter();
  public onDefaultLangChange: EventEmitter<any> = new EventEmitter();

  public get(key: any): any {
    return of(key);
  }
}
xdescribe('StructuredDataTableComponent', () => {
  let component: StructuredDataTableComponent;
  let fixture: ComponentFixture<StructuredDataTableComponent>;
  let mockStore: MockStore<IAppState>;
  let translateService: TranslateService;
  let data;
  const importFileService = jasmine.createSpyObj('ImportFileService', ['clearData']);
  beforeEach(() => {
    const translateService = jasmine.createSpyObj('TranslateService', ['get', 'setDefaultLang']);
    const alertService = jasmine.createSpyObj('AlertService, SnotifyService', ['responseMessage']);
    TestBed.configureTestingModule({
      declarations: [StructuredDataTableComponent],
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
    fixture = TestBed.createComponent(StructuredDataTableComponent);
    component = fixture.componentInstance;
    translateService = TestBed.inject(TranslateService);
    mockStore.refreshState();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('trimData fuction should return class', () => {
    component.trimData(data);
    // expect(component).toEqual(data);
  });
  it('ngOnChanges fuction should called', () => {
    component.ngOnChanges(data);
    // expect(component.place).toEqual('');
  });
  afterEach(() => {
    fixture.destroy();
  });
});
