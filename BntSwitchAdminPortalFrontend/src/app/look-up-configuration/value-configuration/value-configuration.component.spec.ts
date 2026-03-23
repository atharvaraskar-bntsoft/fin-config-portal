import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { ValueConfigurationComponent } from './value-configuration.component';
import { IAppState } from '@app/store/state/app.state';
import { MemoizedSelector } from '@ngrx/store';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { RouterTestingModule } from '@angular/router/testing';
import { selectLookUpValue } from '@app/store/selectors/look-up-configuration.selector';
import { selectViewSettingsList } from '@app/store/selectors/view-settings.selector';
import { of } from 'rxjs';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { EventEmitter } from '@angular/core';
import { NzSwitchModule } from 'ng-zorro-antd/switch';
import { FormsModule } from '@angular/forms';

class translateServiceMock {
  public onLangChange: EventEmitter<any> = new EventEmitter();
  public onTranslationChange: EventEmitter<any> = new EventEmitter();
  public onDefaultLangChange: EventEmitter<any> = new EventEmitter();

  public get(key: any): any {
    return of(key);
  }

  public setDefaultLang(key: string): any {}
}

const lookupValueJson = {
  data: {
    lookupValueList: [
      {
        id: 188,
        value: 'Mobile',
        description: 'Mobile',
        modifiable: '0',
        active: '1',
        lookupType: {
          id: 22,
          name: 'Channel78@@',
          description: 'Channel78@@',
          modifiable: '0',
        },
      },
    ],
    lookupType: {},
  },
  message: 'Find Lookup Value list by id',
  status: 'success',
};

const viewsettingJSON = {
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

describe('ValueConfigurationComponent', () => {
  let component: ValueConfigurationComponent;
  let fixture: ComponentFixture<ValueConfigurationComponent>;
  let mockStore: MockStore<IAppState>;
  let mockselectLookUpValueList: MemoizedSelector<any, any>;
  let mockselectViewSettingsList: MemoizedSelector<any, any>;
  let translate: TranslateService;
  let setDefaultLangSpy: jasmine.Spy;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ValueConfigurationComponent],
      providers: [
        { provide: TranslateService, useClass: translateServiceMock },
        provideMockStore(),
      ],
      imports: [
        RouterTestingModule,
        NgxDatatableModule,
        TranslateModule.forRoot({}),
        NzSwitchModule,
        FormsModule,
      ],
    }).compileComponents();

    mockStore = TestBed.inject(MockStore);
    fixture = TestBed.createComponent(ValueConfigurationComponent);
    component = fixture.componentInstance;
    mockselectLookUpValueList = mockStore.overrideSelector(selectLookUpValue, lookupValueJson);

    mockselectViewSettingsList = mockStore.overrideSelector(
      selectViewSettingsList,
      viewsettingJSON,
    );

    translate = TestBed.inject(TranslateService);
    mockStore.refreshState();
    fixture.detectChanges();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ValueConfigurationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should run ngOnInIt', () => {
    component.ngOnInit();
    expect(component.id).toBe(null);
    expect(component.currentPagination).toBe('20');
    expect(component.currentLang).toBe('en_EN1');
    expect(component.request).toBe(false);
  });

  it('should render Table', () => {
    const ngxdatatable: HTMLElement = fixture.nativeElement.querySelector('ngx-datatable');
    const text = ngxdatatable.innerText;
    expect(text).toBeTruthy();
  });

  afterEach(() => {
    fixture.destroy();
  });
});
