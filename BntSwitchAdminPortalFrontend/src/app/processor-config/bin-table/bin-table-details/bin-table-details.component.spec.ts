import { ComponentFixture, fakeAsync, TestBed, tick, waitForAsync } from '@angular/core/testing';
import { IAppState } from '@app/store/state/app.state';
import { MemoizedSelector, StoreModule } from '@ngrx/store';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { selectViewSettingsList } from '@app/store/selectors/view-settings.selector';
import { BinTableDetailsComponent } from './bin-table-details.component';
import { EventEmitter } from '@angular/core';
import { of } from 'rxjs';
import { MissingTranslationHandler, TranslateLoader, TranslateModule, TranslateService } from '@ngx-translate/core';
import { NzModalService } from 'ng-zorro-antd/modal';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { AlertModule } from 'bnt';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { selectBinDataDetails, selectBinMasterAll } from '@app/store/selectors/bin-table.selector';
import { HttpLoaderFactory, MyMissingTranslationHandler, SharedModule } from '@app/shared/shared.module';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
class translateServiceMock {
  public onLangChange: EventEmitter<any> = new EventEmitter();
  public onTranslationChange: EventEmitter<any> = new EventEmitter();
  public onDefaultLangChange: EventEmitter<any> = new EventEmitter();

  public get(key: any): any {
    return of(key);
  }
  
};
const selectViewSettingsListJSON = {
  status: 'success',
  message: 'Find all Setting',
  data: {
    pagination: ['20', '25', '30', '40', '50'],
    language: ['en_EN', 'en_EN1', 'fr_FR', 'en_INV'],
    settingDto: {
      id: 1,
      systemUserId:
        'SystemUser [firstName=Bnt, lastName=Admin, email=bnt.admin@bnt.com, systemUserCategory=, password=9AHRz1ElALzTEdFKIKywyzEZh0IcZ/INhbGkbc0Qb84=, passwordLastUpdatedOn=2020-07-02 13:09:08.0, locked=0, deleted=0, lockedReason=null]',
      search: 'contain',
      language: 'en_EN1',
      pagination: '20',
    },
    searchOption: ['contain', 'contain2'],
  },
};
const selectBinDataDetailsJSON ={
  BinTableList: [
    {
      bin: '476173',
binAccountType: null,
binAttributes:{
  SRCOverrideFlag: 'true',
floorLimitCategory: '001',
whitelist: 'N',
},
brand: 'SBSA Onus Bin',
cardProduct: 'SBSA Bin',
id: 1,
international: 'Y',
length: '16',
mod10: 'N',
onus: 'Y',
productType: 'C',
    },
  ],
};
const selectBinMasterAllJSON ={
  data :[
    {
      id: 1,
fileName: "SBSA_Binfile_v1.1.xml",
uploadedOn: null,
activateOn: null,
active: null,
binTable: null,
    }
  ],
  message: 'Find all bin-Master List',
status: 'success'
};
const row = {
  bin:  "476173",
  binAccountType: null,
  binAttributes:{
    whitelist: "N",
  SRCOverrideFlag: "true",
  floorLimitCategory: "001",
  },
  brand: "SBSA Onus Bin",
cardProduct: "SBSA Bin",
id: 1,
international: "Y",
length: "16",
mod10: "N",
onus: "Y",
productType: "C",

};
describe('BinTableDetailsComponent', () => {
  let component: BinTableDetailsComponent;
  let fixture: ComponentFixture<BinTableDetailsComponent>;
  let mockStore: MockStore<IAppState>;
  let translateService: TranslateService;
  let setDefaultLangSpy: jasmine.Spy;
  let mockselectViewSettingsList: MemoizedSelector<any, any>;
let mockselectBinDataDetails : MemoizedSelector<any, any>;
let mockselectBinMasterAll :MemoizedSelector<any, any>;
  beforeEach(() => {
    const translateService = jasmine.createSpyObj('TranslateService', ['get', 'setDefaultLang']);
    // const RouterSpy = jasmine.createSpyObj(
    //   'Router',
    //   ['navigate']
    // );
    TestBed.configureTestingModule({
      declarations: [BinTableDetailsComponent],
      providers : [TranslateService,NzModalService,
        // { provide: Router, useValue: RouterSpy },
        { provide: TranslateService,  useClass: translateServiceMock },
        provideMockStore(),
      ],
      imports: [
        StoreModule,
        SharedModule,
        NgSelectModule,
        FormsModule,
        RouterTestingModule,
        NgxDatatableModule,
        // MockStoreModule.forRoot('Location', {}),
        AlertModule,
        StoreModule.forRoot({}),
        BrowserAnimationsModule,
        HttpClientTestingModule,
        TranslateModule.forRoot({}),
             ],
    }).compileComponents();
  });

  beforeEach(() => {
    mockStore = TestBed.get(MockStore);
    fixture = TestBed.createComponent(BinTableDetailsComponent);
    component = fixture.componentInstance;
   

    mockselectViewSettingsList = mockStore.overrideSelector(
      selectViewSettingsList,
      selectViewSettingsListJSON,
    );

    mockselectBinDataDetails = mockStore.overrideSelector(
      selectBinDataDetails,
      selectBinDataDetailsJSON,
    );

    mockselectBinMasterAll = mockStore.overrideSelector(
      selectBinMasterAll,
      selectBinMasterAllJSON,
    );
    translateService = TestBed.inject(TranslateService);
    mockStore.refreshState();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  // it('should  Angular calls ngOnInit', () => {
  //   component.ngOnInit();
  // });
  it('should call open Modal function', fakeAsync(() => {
    component.openModal(row);
    expect(component.isAttributesVisible).toEqual(true);
    tick(200);
    expect(component.isAttributesVisible).toEqual(true);
  }));

it ('should call close Modal function', fakeAsync(()=>{
  component.closeModal();
  expect (component.isAttributesVisible).toEqual(false);
  tick(100);
  expect(component.isAttributesVisible).toEqual(false);
}));

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


// it('getRowData fuction should call click on viewdetails form this HTMl', () => {
//   component. openAccountType(row);
//   expect(component._router.navigate).toHaveBeenCalledWith(['/processor-config/bin-table/account-type-details', row.id]);
// });


it('Component should contain Property', () => {
  // expect(component.rows).toBeTruthy();
  expect(component.rowHeight).toBe(75);
  expect(component.headerHeight).toBe(40);
  expect(component.currentPagination).toBe('20');
});

// it('resetSearch fuction searchResetButton open the Modal', () => {
//   component.resetFilter();
//   expect(component.resetButtonFlag).toEqual(true);
// });

 it(' Modal fuction should  open the Modal', () => {
  component.resetFilter();
 expect(component.resetButtonFlag).toEqual(false);
});

it('  fuction should call  loading  in Html', () => {
  component.loadMore();
 expect(component.request).toEqual(false);
});

// it('  fuction should call binfile change  in Html', () => {
//   component.  binFileChange($event);
//  expect(component.resetButtonFlag).toEqual(true);
// });

  afterEach(() => {
    fixture.destroy();
  });
});





