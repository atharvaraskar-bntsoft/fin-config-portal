import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IAppState } from '@app/store/state/app.state';
import { MemoizedSelector, StoreModule } from '@ngrx/store';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { NzModalService } from 'ng-zorro-antd/modal';
import { EventEmitter } from '@angular/core';
import { of } from 'rxjs';
import { NzSpinModule } from 'ng-zorro-antd/spin';

import { NzCardModule } from 'ng-zorro-antd/card';

import { NzDrawerModule } from 'ng-zorro-antd/drawer';
import { selectPermissionsData } from '@app/store/selectors/permission.selectors';
import { selectAcquirerIdConfigDetails } from '@app/store/selectors/acquirer-id-config.selector';
import { AcquirerIdConfigInfoComponent } from './acquirer-id-config-info.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { AlertModule } from 'bnt';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { selectViewSettingsList } from '@app/store/selectors/view-settings.selector';
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
const selectAcquirerIdConfigDetailsJSON ={};
const selectPermissionsDataJSON ={
   data :[
    {
      id: 'link_notification',
read: true,
write: true,
update: true,
delete: true,
check: false,
    },
   ],
  message: null,
status: 'success'
};
xdescribe('AcquirerIdConfigInfoComponent', () => {
  let component: AcquirerIdConfigInfoComponent;
  let fixture: ComponentFixture<AcquirerIdConfigInfoComponent>;
  let mockStore: MockStore<IAppState>;
  let mockselectViewSettingsList: MemoizedSelector<any, any>;
  let mockselectAcquirerIdConfigDetails: MemoizedSelector<any, any>;
  let mockselectPermissionsData: MemoizedSelector<any, any>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AcquirerIdConfigInfoComponent,],
      providers : [TranslateService,NzModalService,
        
        { provide: TranslateService,  useClass: translateServiceMock },
        provideMockStore(),
      ],
      imports: [
        StoreModule,
        NzSpinModule,
        NgSelectModule,
        FormsModule,
        RouterTestingModule,
        NgxDatatableModule,
        // MockStoreModule.forRoot('Location', {}),
        AlertModule,
        StoreModule.forRoot({}),
        BrowserAnimationsModule,
        HttpClientTestingModule,
        TranslateModule,
        NzDrawerModule,
        NzCardModule,
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    mockStore = TestBed.get(MockStore);
    fixture = TestBed.createComponent(AcquirerIdConfigInfoComponent);
    component = fixture.componentInstance;

    mockselectViewSettingsList = mockStore.overrideSelector(
      selectViewSettingsList,
      selectViewSettingsListJSON,
    );
    mockselectAcquirerIdConfigDetails = mockStore.overrideSelector(
      selectAcquirerIdConfigDetails,
      selectAcquirerIdConfigDetailsJSON,
    );
    mockselectPermissionsData = mockStore.overrideSelector(
      selectPermissionsData,
      selectPermissionsDataJSON,
    );
    
    mockStore.refreshState();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('function should call close the drawer', () => {
    component.  close();
    expect(component.closeDrawer).toBeTruthy;
    expect(component.isvisibleView).toEqual(false);
  });
  it('function should call close the drawer', () => {
    component.  cancel();
    expect(component.visibleAnimate).toEqual(false);
  });
  afterEach(() => {
    fixture.destroy();
  });
});
