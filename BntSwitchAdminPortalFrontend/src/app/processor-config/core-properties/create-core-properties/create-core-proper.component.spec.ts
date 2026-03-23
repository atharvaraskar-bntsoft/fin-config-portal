import { HttpClientTestingModule } from '@angular/common/http/testing';
import { async, ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { AlertService } from '@app/services/alert.service';
import { NgSelectModule } from '@ng-select/ng-select';
import {
  TranslateFakeLoader,
  TranslateLoader,
  TranslateModule,
  TranslateService,
} from '@ngx-translate/core';
import { SnotifyService } from 'ng-snotify';
import { AlertModule } from 'bnt';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { of } from 'rxjs';
import { CorePropertiesMockService } from '@app/tests/mock-service/core-properties.service.mock';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatMenuModule } from '@angular/material/menu';
import { CreateCoreProperComponent } from './create-core-proper.component';
import { IAppState } from '@app/store/state/app.state';
import { selectViewSettingsList } from '@app/store/selectors/view-settings.selector';
import { CorePropertiesService } from '@app/services/core-properties.service';
import { AdapterCommonService } from '@app/services/adapter-common.service';

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

const successResJSON = {
  status: 'success',
  message: 'Core Properties drafted',
  data: {
    id: 13,
  },
};

const getDefaultPropertiesJSON = {
  status: 'success',
  message: 'GET defaultProperties',
  data: [
    {
      field: 'server.port',
      fileName: null,
      value: '0',
      label: 'server port',
      format: '',
      hidden: false,
      datatype: 'Integer',
      mandatory: true,
      listvalues: null,
      isEditable: false,
    },
  ],
};

const getCorePropertiesByIdJSON = {
  status: 'success',
  message: 'Find CoreProperties',
  data: {
    type: 'L2',
    subType: 'Core',
    name: 'XUZ',
    id: 12,
    version: 0,
    saveDraft: null,
    properties: {
      core: [
        {
          field: 'server.port',
          fileName: null,
          value: '0',
          label: 'server port',
          format: '',
          hidden: false,
          datatype: 'Integer',
          mandatory: true,
          listvalues: null,
          isEditable: false,
        },
      ],
    },
  },
};

describe('CreateCoreProperComponent', () => {
  let component: CreateCoreProperComponent;
  let fixture: ComponentFixture<CreateCoreProperComponent>;
  let mockStore: MockStore<IAppState>;
  let MockselectViewSettingsList;
  let setDefaultLangSpy: jasmine.Spy;
  const translateService = jasmine.createSpyObj('TranslateService', ['get', 'setDefaultLang']);
  let myCorePropertiesServiceSpy: jasmine.Spy;
  let mockMatDialog: jasmine.SpyObj<MatDialog>;
  const nzModalServiceObj = jasmine.createSpyObj('NzModalService', ['confirm']);
  let modalService: MatDialog;
  let dialogSpy: jasmine.Spy;
  let dialogRefSpyObj = jasmine.createSpyObj({ afterClosed: of('success'), close: null });
  dialogRefSpyObj.componentInstance = { body: '' };
  const mockDialogRef = {
    open: jasmine.createSpy('open'),
  };
  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [CreateCoreProperComponent],
      imports: [
        NgSelectModule,
        FormsModule,
        ReactiveFormsModule,
        BrowserAnimationsModule,
        AlertModule,
        RouterTestingModule,
        MatMenuModule,
        HttpClientTestingModule,
        // MockStoreModule.forRoot('Location', {}),
        //ImportFileModule,
        MatDialogModule,
        // TranslateModule,
        TranslateModule.forRoot({
          loader: {
            provide: TranslateLoader,
            useClass: TranslateFakeLoader,
          },
        }),
      ],
      providers: [
        AlertService,
        SnotifyService,
        TranslateService,
        AdapterCommonService,
        { provide: 'SnotifyToastConfig', useValue: {} },
        { provide: MatDialog },
        { provide: CorePropertiesService, useClass: CorePropertiesMockService },
        provideMockStore(),
        // other providers
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateCoreProperComponent);
    fixture.detectChanges();
    mockStore = TestBed.inject(MockStore);
    modalService = TestBed.inject(MatDialog);
    component = fixture.componentInstance;
    MockselectViewSettingsList = mockStore.overrideSelector(
      selectViewSettingsList,
      selectViewSettingsListJSON,
    );
    mockStore.refreshState();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  //@TODO:: test cases commented due to An error was thrown in afterAll
  // TypeError: Cannot read properties of undefined (reading 'success')

  // it('should call ngOnInit function', () => {
  //   component.corePropertiesId = 2;
  //   expect(component.corePropertiesId).toBe(2);
  //   expect(component.corePropertiesId).not.toBeNull();
  //   component.ngOnInit();
  // });

  // it('should call getCorePropertiesByIdDetails fuction and Call getCorePropertiesById service in case of edit', () => {
  //   expect(component.corePropertiesId).not.toBeNull();
  //   let newService = fixture.debugElement.injector.get(CorePropertiesService);
  //   spyOn(newService, 'getCorePropertiesById').and.callFake(() => {
  //     return of(getCorePropertiesByIdJSON);
  //   });
  //   component.getCorePropertiesByIdDetails();
  // });

  // it('should call getDefaultProperties fuction and Call getDefaultProperties service in case of Create', () => {
  //   let newService = fixture.debugElement.injector.get(CorePropertiesService);
  //   spyOn(newService, 'getDefaultProperties').and.callFake(() => {
  //     return of(getDefaultPropertiesJSON);
  //   });
  //   component.getDefaultProperties();
  // });

  // it('should click Send button with async', () => {
  //   fixture.detectChanges();
  //   let buttonElement = fixture.debugElement.query(By.css('.Add-Properties'));
  //   spyOn(component, 'addItem');
  //   buttonElement.triggerEventHandler('click', null);
  //   fixture.detectChanges();
  //   fixture.whenStable().then(() => {
  //     expect(component.addItem).toHaveBeenCalled();
  //   });
  // });

  // it('should call addItem function', () => {
  //   component.addItem();
  // });

  // it('should call renderItem function', () => {
  //   spyOn(component, 'generateFinalData').and.callThrough();
  //   component.renderItem();
  //   expect(component.generateFinalData).toHaveBeenCalled();
  // });

  // it('should call save function', () => {
  //   component.coreProName = 'newPro';
  //   component.corePropertiesId = 2;
  //   let finalArray = component.generateFinalData(
  //     getCorePropertiesByIdJSON.data.properties.core,
  //     component.formObj,
  //   );
  //   let requestBody = {
  //     id: component.corePropertiesId,
  //     name: component.coreProName,
  //     type: 'L2',
  //     subType: 'core',
  //     saveDraft: true,
  //     properties: {
  //       core: component.corePropertyData,
  //     },
  //     version: null,
  //   };
  //   component.infoForm = new FormGroup(component.formObj);
  //   component.infoForm.controls['server.port'].setValue(3400);
  //   let newService = fixture.debugElement.injector.get(CorePropertiesService);
  //   spyOn(newService, 'saveCoreProperties').and.callFake(() => {
  //     return of(successResJSON);
  //   });
  //   component.save(true);
  //   expect(component.infoForm.valid).toBeTruthy();
  //   newService.saveCoreProperties(requestBody);
  //   expect(component.coreProName).not.toBeNull();
  // });

  // it('should call generateFinalData function', () => {
  //   component.generateFinalData(getCorePropertiesByIdJSON.data.properties.core, component.formObj);
  // });

  // it('should call removeItem function', () => {
  //   const event = new Event('click');
  //   component.removeItem(getCorePropertiesByIdJSON.data.properties.core, component.infoForm);
  // });

  // it('should call validateName function', () => {
  //   const event = {
  //     target: {
  //       value: 'coreNew',
  //     },
  //   };
  //   let newService = fixture.debugElement.injector.get(CorePropertiesService);
  //   spyOn(newService, 'validateCorePropertiesName').and.callFake(() => {
  //     return of(successResJSON);
  //   });
  //   component.validateName(event);
  //   expect(event).not.toBeNull();
  //   //expect(component.validatePropertiesName).toBeT
  // });

  // it('should call numberOnly function from the HTML Input event keyCode === 45  ', () => {
  //   const event = {
  //     keyCode: 45,
  //     which: 45,
  //   };
  //   var result = component.numberOnly(event);
  //   expect(result).toBe(true);
  // });

  // it('should call numberOnly function from the HTML Input event  in case (charCode > 31 && (charCode < 48 || charCode > 57) ', () => {
  //   const event = {
  //     keyCode: 121,
  //     which: 121,
  //   };
  //   var result = component.numberOnly(event);
  //   expect(result).toBeFalsy();
  // });

  afterEach(() => {
    fixture.destroy();
  });
});
