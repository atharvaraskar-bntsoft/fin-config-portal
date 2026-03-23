import { ComponentFixture, fakeAsync, TestBed, tick, waitForAsync } from '@angular/core/testing';

import { StatusComponent } from './status.component';
import { ActionsSubject, MemoizedSelector, Store } from '@ngrx/store';
import { RouterTestingModule } from '@angular/router/testing';
import { TranslateModule } from '@ngx-translate/core';
import { JsonApiService } from '@app/services/json-api.service';
import { IAppState } from '@app/store/state/app.state';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { selectStatusList } from '@app/store/selectors/status.selector';
import { GetStatus } from '@app/store/actions/status.action';
import { selectViewSettingsList } from '@app/store/selectors/view-settings.selector';
import { of } from 'rxjs';
import { Router } from '@angular/router';

const statusJSONFailure = {
  status: 'failure',
  message: 'dummy',
  data: {},
};

const statusJSONSuccess = {
  status: 'success',
  message: 'Schema exported succcesfuly',
  data: {
    monitoringCoreDetail: ['127.0.0.1:9900'],
    dbDetailList: [
      {
        property: 'IP',
        value: 'localhost',
      },
    ],
    uiCodeDate: ['04Jul2022_10:00AM'],
    versionDetail: ['2.0.0.15-beta Last Server started date : Mon Jul 18 10:11:02 GMT+02:00 2022'],
    jvmDetailList: [
      {
        property: 'Vendor',
        value: 'Oracle Corporation',
      },
    ],
    tabbleList: ['acquirer_id_config', 'acquirer_mapping'],
    listInfoUrl: [
      'http://172.16.23.37:8080/bswitchadm/rest/actuator/health',
      'http://172.16.23.37:8080/bswitchadm/rest/swagger-ui.html',
    ],
    monitoringHazlecastDetail: ['127.0.0.1:9900'],
    serverPortList: [null],
  },
};

const viewSettingJSON = {
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

describe('StatusComponent ', () => {
  let component: StatusComponent;
  let fixture: ComponentFixture<StatusComponent>;
  let mockStore: MockStore<IAppState>;
  let mockselectStatusList: MemoizedSelector<any, any>;
  let mockselectViewSettingsList: MemoizedSelector<any, any>;
  let loadJosnSpy: jasmine.Spy;
  const actionSub: ActionsSubject = new ActionsSubject();
  const jsonApiService = jasmine.createSpyObj('JsonApiService', ['loadJosn']);
  let routerSpy = { navigate: jasmine.createSpy('navigate') };

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [StatusComponent],
      imports: [RouterTestingModule, TranslateModule.forRoot()],
      providers: [
        { provide: JsonApiService, useValue: jsonApiService },
        { provide: ActionsSubject, useValue: actionSub },
        { provide: Router, useValue: routerSpy },
        provideMockStore(),
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    mockStore = TestBed.get(Store);
    fixture = TestBed.createComponent(StatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    mockselectStatusList = mockStore.overrideSelector(selectStatusList, statusJSONSuccess);

    mockselectViewSettingsList = mockStore.overrideSelector(
      selectViewSettingsList,
      viewSettingJSON,
    );

    mockStore.refreshState();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should dispatch GetStatus in ngOnInit for Success response', () => {
    component.ngOnInit();
    expect(component.currentItem).not.toBeNull();
  });

  it('should dispatch GetStatus in ngOnInit for Failure response', () => {
    const dispatchSpy = spyOn(mockStore, 'dispatch').and.callThrough(); // spy on the store
    mockselectStatusList = mockStore.overrideSelector(selectStatusList, statusJSONFailure);
    mockStore.refreshState();
    fixture.detectChanges();
    component.ngOnInit();
    expect(dispatchSpy).toHaveBeenCalledWith(new GetStatus());
  });

  it('should call else ngOnInit for null json branck cover ', () => {
    const dispatchSpy = spyOn(mockStore, 'dispatch').and.callThrough(); // spy on the store
    mockselectStatusList = mockStore.overrideSelector(selectStatusList, null);
    mockStore.refreshState();
    fixture.detectChanges();
    component.ngOnInit();
    expect(dispatchSpy).toHaveBeenCalledWith(new GetStatus());
  });
  
  it('should call a function window.open during openLink function call', () => {
    let mockURL = '';
    const spy = spyOn(window, 'open');
    component.openLink(mockURL);
    expect(spy).toHaveBeenCalled();
  });

  it('should call openHealth function', () => {
    loadJosnSpy = jsonApiService.loadJosn.and.returnValue(of(['']));
    component.openHealth();
    expect(loadJosnSpy).toHaveBeenCalled();
  });

  it('should call open function', fakeAsync(() => {
    component.open();
    expect(component.visible).toEqual(true);
    tick(200);
    expect(component.visible).toEqual(true);
  }));

  it('should call close function', fakeAsync(() => {
    component.close();
    expect(component.visibleAnimate).toEqual(false);
    tick(100);
    expect(component.visible).toEqual(false);
  }));

  it('should navigate to route logs/txnKeyLable', () => {
    component.txnKey();
    expect(routerSpy.navigate).toHaveBeenCalledWith(['logs/txnKeyLable']);
  });

  afterEach(() => {
    fixture.destroy();
  });
});
