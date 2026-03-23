import { ComponentFixture, fakeAsync, TestBed, tick, waitForAsync } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from "@angular/core";
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { IAppState } from '@app/store/state/app.state';
import { AcquirerIdConfigComponent } from './acquirer-id-config.component';
import { MemoizedSelector, Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import { BoxModule, ChartJsModule } from 'bnt';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule } from '@angular/forms';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import {selectViewSettingsList} from '@app/store/selectors/view-settings.selector'
import { Router, NavigationStart, NavigationEnd, Event as RouterEvent } from '@angular/router';
import {selectAcquirerIdConfig} from '@app/store/selectors/acquirer-id-config.selector'
import { RouterTestingModule } from '@angular/router/testing';
import { NzModalService } from 'ng-zorro-antd/modal';
import { OverlayModule } from '@angular/cdk/overlay';
import {selectAcquirerIdFlag} from '@app/store/selectors/acquirer-id-config.selector'
import { TranslateModule } from "@ngx-translate/core";
import {SharedModule} from '@app/shared/shared.module';
import { of } from 'rxjs';
import { GetStatus } from '@app/store/actions/status.action';
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
}

const selectAcquirerIdConfigJSON = {
  message: "Find all Acquirer",
  status: "success",
  data:{
    acquirerMappingList:[
      {
        id: 9,
        code: "00004321",
        description: "VISA Acquirer",
        active: true,
        deleted: "0",
        adviceMatch: "0",
        name: "VISA Acquirer",
        onusValidate: "1",
        refundOffline: "1",
        country: {
          id: 12,
          code: null,
          countryName: "India",
          currency: null,
          isoCode: null,
          shortCode: null,
          isdCode: null,
          active: false,
          deleted: null
        },
        pos_sms: null,
        pos_dms: null,
        txntype_sms: null,
        txntype_dms: null,
        accounttype_sms: null,
        accounttype_dms: null
      },
    ],
    'page-no': 1,
    'total-record': 7,
  },
}
const selectAcquirerIdFlagJSON ={
  condition_Flag: true
}
const row = {
  type: "L2",
  name: "XUZ",
  subType: "Core",
  corePropertiesDetails: [
      {
          id: 29,
          version: 0
      }
  ],
  version: 0,
  versionId: 29
}


describe('AcquirerIdConfigComponent', () => {
  let component: AcquirerIdConfigComponent;
  let fixture: ComponentFixture<AcquirerIdConfigComponent>;
  let mockStore: MockStore<IAppState>;
  let getSpy: jasmine.Spy;
  let mockselectacquirerList: MemoizedSelector<any, any>;
  let mockselectViewSettingsList: MemoizedSelector<any, any>;
  let mockselectAcquirerIdFlag: MemoizedSelector<any, any>;
  const RouterSpy = jasmine.createSpyObj(
    'Router',
    ['navigate']
  );
  beforeEach(() => {
    const translateService = jasmine.createSpyObj('TranslateService', ['get','setDefaultLang']);

    TestBed.configureTestingModule({
      declarations: [AcquirerIdConfigComponent],
      providers: [{ provide: TranslateService, useValue: translateService,},
        { provide: Router, useValue: RouterSpy },
      NzModalService,
       provideMockStore()],
      imports: [BoxModule,
        OverlayModule,
        SharedModule,
         TranslateModule,
         NgSelectModule, 
         FormsModule, 
         NgxDatatableModule,
         RouterTestingModule, 
         ChartJsModule
        ],
    }).compileComponents();
    mockStore = TestBed.get(MockStore);
    fixture = TestBed.createComponent(AcquirerIdConfigComponent);
    component = fixture.componentInstance;
    mockselectViewSettingsList = mockStore.overrideSelector(
      selectViewSettingsList,
      selectViewSettingsListJSON,
    );
    mockselectacquirerList = mockStore.overrideSelector(
      selectAcquirerIdConfig,
      selectAcquirerIdConfigJSON,
    );
    mockselectAcquirerIdFlag = mockStore.overrideSelector(
      selectAcquirerIdFlag,
      selectAcquirerIdFlagJSON,
    );
    getSpy = translateService.get.and.returnValue(of(['']));
    mockStore.refreshState();
    fixture.detectChanges();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AcquirerIdConfigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it("should render Table", () => {
    const ngxdatatable: HTMLElement = fixture.nativeElement.querySelector('ngx-datatable');
    const text = ngxdatatable.innerText;
    expect(text).toBeTruthy();
  });
 
  it('onActivate fuction should call click on viewDetail form this HTMl', () => {
    component.onActivate(row);
    expect(component._router.navigate).toHaveBeenCalled();
  });
  it('viewDetails fuction should make the isivible true ', () => {
    component.viewDetails(selectAcquirerIdConfigJSON.data);
    expect(component.isvisibleView).toEqual(true);
  });
  it('close fuction should close the modal ', () => {
    component.close(selectAcquirerIdConfigJSON.data);
    expect(component.isvisibleView).toEqual(false);
  });
  it('should call close function', fakeAsync(() => {
    component.closeModal();
    expect(component.isAttributesVisible).toEqual(false);
  }));
  it('create fuction should create the view screen', () => {
    component.create(selectAcquirerIdConfigJSON.data);
    expect(component.isvisibleView).toEqual(false)
  });
  it('openModal fuction should open the Modal', () => {
    component.openModal(row);
    expect(component.isAttributesVisible).toEqual(true);
  });
  it('loadPage fuction should call after Oninit', () => {
    spyOn(component,'_transFilters').and.callThrough();
    component.loadPage(1);
    expect(component.request).toBe(false);
    expect(component._transFilters).toHaveBeenCalled();
  });
  afterEach(() => {
    fixture.destroy();
  });
});


