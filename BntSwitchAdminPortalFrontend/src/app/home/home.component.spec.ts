import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { HomeComponent } from './home.component';
import { BoxModule, ChartJsModule } from 'bnt';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule } from '@angular/forms';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { MemoizedSelector, Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { IAppState } from '@app/store/state/app.state';
import { Observable, of } from 'rxjs';
import { selectDashboardList } from '@app/store/selectors/dashboard.selector';
import { selectViewSettingsList } from '@app/store/selectors/view-settings.selector';
import { CommonModule } from '@angular/common';
// import Prism from 'prismjs';
const selectDashboardListJSON = {
  dashboard: [
    {
      blockType: 'full',
      title: 'Transactions Velocity - Status',
      actionLink: '/',
      actionTitle: '',
      content: {
        type: 'line',
        coordinates: [
          {
            text: 'TOTAL',
            xcoordinats: [],
            ycoordinats: [],
          },
          {
            text: 'APPROVED',
            xcoordinats: [],
            ycoordinats: [],
          },
          {
            text: 'FAILED',
            xcoordinats: [],
            ycoordinats: [],
          },
        ],
        xCoordinateType: 'date',
        yCoordinateType: null,
      },
    },
  ],

  selectedDashboard: null,
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
describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let mockStore: MockStore<IAppState>;
  let mockselectDashboardList: MemoizedSelector<any, any>;
  let mockselectViewSettingsList: MemoizedSelector<any, any>;

  beforeEach(() => {
    const translateService = jasmine.createSpyObj('TranslateService', ['setDefaultLang']);
    TestBed.configureTestingModule({
      declarations: [HomeComponent],
      providers: [{ provide: TranslateService, useValue: translateService }, provideMockStore()],
      imports: [
        BoxModule,
        NgSelectModule,
        FormsModule,
        NgxDatatableModule,
        ChartJsModule,
        CommonModule
      ],
    }).compileComponents();
    mockStore = TestBed.get(MockStore);
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    mockselectDashboardList = mockStore.overrideSelector(
      selectDashboardList,
      selectDashboardListJSON,
    );
    mockselectViewSettingsList = mockStore.overrideSelector(
      selectViewSettingsList,
      selectViewSettingsListJSON,
    );
    mockStore.refreshState();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should interval be 1440', () => {
    expect(component.interval).toEqual(1440);
  });

  afterEach(() => {
    fixture.destroy();
  });
});
