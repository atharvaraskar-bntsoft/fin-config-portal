import { CommonModule } from '@angular/common';
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { RouterTestingModule } from '@angular/router/testing';
import { PrettyJsonRvModule } from 'bnt';
import { SharedModule } from '@app/shared/shared.module';
import { IAppState } from '@app/store/state/app.state';
import { MemoizedSelector, Store, StoreModule } from '@ngrx/store';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import {
  MissingTranslationHandler,
  TranslateLoader,
  TranslateModule,
  TranslateService,
} from '@ngx-translate/core';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { HttpLoaderFactory, MyMissingTranslationHandler } from '@app/shared/shared.module';
import { EventEmitter,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { SnotifyService, ToastDefaults } from 'ng-snotify';
import { AlertModule } from 'bnt';
import { ExportEntitiesService } from '@app/services/export-entities.service';
import { AlertService } from '@app/services/alert.service';
import { ImportExportComponent } from './import-export.component';
import { importDataList, importDataResponse, importExportSelector } from '@app/store/selectors/export-entities.selectors';
import { SubscribeService } from '@app/services/subscribe.services';
import { ClipboardService } from 'ngx-clipboard';

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
const importDataJson = 
{status:"success",message:"Snapshot imported",data:-1}

const importExportSelectorJson = {status:"success",message:"Find all entities",data:{"total-record":27,"entitiesList":[{"id":27,"name":"snapshot_timestamp_1660108520645","comment":"Test Nitin","data":null,"snapshotExportedDetail":[{"id":null,"entityType":"Routing","parentEntityId":null,"entityId":null,"entityName":null,"version":54,"idVersionListToExport":[]}]},{"id":8,"name":"snapshot_timestamp_1643606131609","comment":"7thVersion ISO Adp Backup","data":null,"snapshotExportedDetail":[{"id":null,"entityType":"Adapter","parentEntityId":null,"entityId":null,"entityName":null,"version":7,"idVersionListToExport":[]}]}],"page-no":1,"total-filtered-record":20}}

const importDataListJson =
{ status:"success", message:"Find all Snapshot-Import-Detail",data:{"total-record":30,"page-no":1,"snapshotImportDetail":[{"createdBy":1,"updatedBy":null,"createdOn":1660030912000,"updatedOn":1660030912000,"id":30,"fileName":"snapshottimestamp1660029160732.zip","comment":null,"dataToImport":"{\"Adapter\": [{\"imfId\": {\"id\": 6, \"name\": \"IMF Structure 70\", \"version\": 70}, \"masterData\": {\"adapterDto\": {\"id\": 63, \"name\": \"json_cart\", \"type\": \"L3\", \"active\": \"1\", \"adapterId\": \"json_cart\", \"standardMessageSpecification\": {\"id\": 7, \"messageProtocol\": {\"id\": 26, \"value\": \"JSON\", \"lookupType\": {\"id\": 5, \"name\": \"Message_Protocol\", \"modifiable\": \"0\", \"description\": \"Message Protocol\"}, \"modifiable\": \"0\", \"description\": \"JSON\"}, \"messageStandard\": {\"id\": -1, \"value\": \"JSON\", \"lookupType\": {\"id\": 4, \"name\": \"Message_Standard\", \"modifiable\": \"0\", \"description\": \"Message Standard\"}, \"modifiable\": \"0\", \"description\": \"JSON\"}, \"transmissionProtocol\": {\"id\": 29, \"value\": \"HTTP\", \"lookupType\": {\"id\": 6, \"name\": \"Transmission_Protocol\", \"modifiable\": \"0\", \"description\": \"Transmission Protocol\"}, \"modifiable\": \"0\", \"description\": \"HTTP\"}}}}","importedDataReport":null,"status":"SUCCESS"}],"total-filtered-record":20}}

describe('ImportExportComponent', () => {
  let component: ImportExportComponent;
  let fixture: ComponentFixture<ImportExportComponent>;
  let store: Store<ImportExportComponent>;
  let mockStore: MockStore<IAppState>;
  let setDefaultLangSpy: jasmine.Spy;
  let translate: TranslateService;
  let exportEntitiesService: ExportEntitiesService;
  let mockimportExportSelector: MemoizedSelector<any, any>;
  let mockimportDataList: MemoizedSelector<any, any>;
  let mockimportDataResponse: MemoizedSelector<any, any>;
  beforeEach(() => {
    const translateService = jasmine.createSpyObj('TranslateService', ['get', 'setDefaultLang']);
    TestBed.configureTestingModule({
      declarations: [ImportExportComponent],
      providers: [
        SnotifyService,ExportEntitiesService,
        AlertService,SubscribeService,ClipboardService,
        { provide: TranslateService, useClass: translateServiceMock },
        HttpClient,
        { provide: 'SnotifyToastConfig', useValue: ToastDefaults },
        { provide: ExportEntitiesService, useValue: exportEntitiesService },
        provideMockStore(),
        // other providers
      ],
      imports: [
        CommonModule,
        AlertModule,
        HttpClientModule,
        SharedModule,
        RouterTestingModule,
        HttpClientTestingModule,
        NgxDatatableModule,
        PrettyJsonRvModule,
        StoreModule.forRoot({}),
        TranslateModule.forRoot({
          loader: {
            deps: [HttpClient],
            provide: TranslateLoader,
            useFactory: HttpLoaderFactory,
          },
          missingTranslationHandler: {
            provide: MissingTranslationHandler,
            useClass: MyMissingTranslationHandler,
          },
          useDefaultLang: true,
        }),
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
    setDefaultLangSpy = translateService.get.and.returnValue(of([]));
    mockStore = TestBed.get(Store);
    fixture = TestBed.createComponent(ImportExportComponent);
    component = fixture.componentInstance;    
    mockimportExportSelector = mockStore.overrideSelector(importExportSelector, importExportSelectorJson);
    mockimportDataList = mockStore.overrideSelector(importDataList, importDataListJson);
    mockimportDataList = mockStore.overrideSelector(importDataResponse, importDataJson);    
    mockStore.refreshState();
    fixture.detectChanges();
  });
  it('Scroll fuction should call', () => {
    const offsety = {
      isTrusted: true,
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
      type: 'scroll',
    };
    component.onScroll(offsety);
    expect(component.onScroll).toBeDefined;
    expect(component.onScroll).toHaveBeenCalled;
  });
  it('should create', () => {
    expect(component).toBeTruthy();
  });
 
  it('cancel fuction should close the model', () => {
    component.cancel();
    expect(component.importPopup).toEqual(false);
  });
  it('close fuction should visible in html', () => {
    component.close();
    expect(component.visibleAnimate).toEqual(false);
  });
  it('fuction should service importJSOn visible modal in html', () => {
    component.importJson();
    expect(component.importPopup).toEqual(true);
  });
  it(' event fuction should visible modal in form html', () => {
    const $event = {
      lastModified: 1656499936116,
      length: 1,
    };
    component.selectedFile($event);
    expect(component.importForm).toBeTruthy;
  });
  it('copy fuction should visible in clipboard html', () => {
    component.copyToClipboard('null');
    expect(component.copied).toBeTruthy;
  });
  
  it('fuction should service importJSOn visible modal in html', () => {
    const data ={};
    component.submitConfirmation(data);
    expect(component.confirmationPopup).toEqual(false);
  });
  it('fuction should service importJSOn visible modal in html', () => {
    component.submitImport() ;
    expect(component).toBeTruthy;
  });
  afterEach(() => {
    fixture.destroy();
  });
});
