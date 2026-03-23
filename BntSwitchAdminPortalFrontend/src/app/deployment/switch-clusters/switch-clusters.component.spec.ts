import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IAppState } from '@app/store/state/app.state';
import { MemoizedSelector, StoreModule } from '@ngrx/store';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { selectViewSettingsList } from '@app/store/selectors/view-settings.selector';
import { SwitchClustersComponent } from './switch-clusters.component';
import { CUSTOM_ELEMENTS_SCHEMA, EventEmitter } from '@angular/core';
import { of } from 'rxjs';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { NzModalService } from 'ng-zorro-antd/modal';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule } from '@angular/forms';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { RouterTestingModule } from '@angular/router/testing';
import { AlertModule } from 'bnt';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { selectGetSwitchClusters } from '@app/store/selectors/switch-clusters.selector';

import { selectPermissionsData } from '@app/store/selectors/permission.selectors';
import { CommonModule } from '@angular/common';
class translateServiceMock {
  public onLangChange: EventEmitter<any> = new EventEmitter();
  public onTranslationChange: EventEmitter<any> = new EventEmitter();
  public onDefaultLangChange: EventEmitter<any> = new EventEmitter();

  public get(key: any): any {
    return of(key);
  }
  
};
const selectGetSwitchClustersJSON =null;
const selectPermissionsDataJSON={};
const selectViewSettingsListJSON = {
  status: 'success',
  message: 'null',
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
describe('SwitchClustersComponent', () => {
  let component: SwitchClustersComponent;
  let fixture: ComponentFixture<SwitchClustersComponent>;
  let mockStore: MockStore<IAppState>;
  let mockselectViewSettingsList: MemoizedSelector<any, any>;
  let mockselectGetSwitchClusters: MemoizedSelector<any, any>;
  let mockselectPermissionsData: MemoizedSelector<any, any>;

 
  
  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [SwitchClustersComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers : [TranslateService,NzModalService,        
        { provide: TranslateService,  useClass: translateServiceMock },
        provideMockStore(),
      ],
      imports: [
        StoreModule,
        NgSelectModule,
        FormsModule,
        RouterTestingModule,
        NgxDatatableModule,
        CommonModule,
        // MockStoreModule.forRoot('Location', {}),
        AlertModule,
        StoreModule.forRoot({}),
        BrowserAnimationsModule,
        HttpClientTestingModule,
        TranslateModule,
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    
    mockStore = TestBed.get(MockStore);
    fixture = TestBed.createComponent(SwitchClustersComponent);
    component = fixture.componentInstance;

    mockselectViewSettingsList = mockStore.overrideSelector(
      selectViewSettingsList,
      selectViewSettingsListJSON,
    );
    mockselectGetSwitchClusters= mockStore.overrideSelector(
      selectGetSwitchClusters,
      selectGetSwitchClustersJSON
    );
    mockselectPermissionsData= mockStore.overrideSelector(
      selectPermissionsData,
      selectPermissionsDataJSON
    );

    mockStore.refreshState();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  afterEach(() => {
    fixture.destroy();
  });
});
