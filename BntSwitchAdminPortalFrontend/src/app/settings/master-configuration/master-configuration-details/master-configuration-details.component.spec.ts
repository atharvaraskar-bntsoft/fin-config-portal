import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { MasterConfigurationDetailsComponent } from './master-configuration-details.component';
import { configurationUpdated } from '@app/store/selectors/master-configuration.selector';
import { EventEmitter } from '@angular/core';
import { of } from 'rxjs';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { IAppState } from '@app/store/state/app.state';
import { MemoizedSelector, StoreModule } from '@ngrx/store';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { SnotifyService } from 'ng-snotify';
import { ImportFileService } from '@app/services/import-file.service';
import { AlertService } from '@app/services/alert.service';
import { SharedModule } from '@app/shared/shared.module';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AlertModule, DatePickerRvModule, TabsModule } from 'bnt';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { configurationMasterList } from '@app/store/selectors/master-configuration.selector';
import { CommonModule } from '@angular/common';
const configurationUpdatedJson = {
  status: 'success',
  message: 'Standard Message Specification Updated',
  data: 9,
};
const mockconfigurationMasterListJson = {
  row: {
    id: 9,
    properties:
      '{"l1configuration":{"message":[{"field":"server.port","label":"Servefff","value":"${server_port:8071}","format":"","hidden":false,"datatype":"String","mandatory":false},{"field":"component.type","label":"Component Type(Message)","value":"L1_JSON","format":"^([a-zA-Z0-9_-])","hidden":false,"datatype":"String","mandatory":true,"listvalues":null},{"field":"spring.profiles.active","label":"Spring Profiles Active(Message)","value":"hz-client,http_server","format":"^([a-zA-Z_,-])","hidden":true,"datatype":"String","fileName":null,"mandatory":true,"listvalues":null},{"field":"counters.to.be.collected","label":"Counters To Be Collecteds","value":"IPC,TRANSACTION_TYPE,PAYMENT_TYPE","format":"","hidden":true,"datatype":"String","mandatory":true,"listvalues":null}],"network":[{"field":"server.port","label":"Server Port(Network)","value":"${server_port:8031}","format":"","hidden":"true","datatype":"String","mandatory":"true"},{"field":"component.type","label":"Component Type(Network)","value":"L1_JSON","format":"^([a-zA-Z0-9_-])","hidden":false,"datatype":"String","mandatory":true,"listvalues":null},{"field":"spring.profiles.active","label":"Spring Profiles Active(Network)","value":"hz-client,http_server","format":"^([a-zA-Z_,-])","hidden":true,"datatype":"String","fileName":null,"mandatory":true,"listvalues":null}]},"l3configuration":{"message":[{"field":"server.port","label":"Server Port(Message)","value":"${server_port:8071}","format":"","hidden":"true","datatype":"String","mandatory":"true"},{"field":"component.type","label":"Component Type(Message)","value":"L3_JSON","format":"^([a-zA-Z0-9_-])","hidden":false,"datatype":"String","mandatory":true,"listvalues":null},{"field":"spring.profiles.active","label":"Spring Profiles Active(Message)","value":"hz-client,http_server","format":"^([a-zA-Z_,-])","hidden":true,"datatype":"String","fileName":null,"mandatory":true,"listvalues":null},{"field":"counters.to.be.collected","label":"Counters To Be Collected","value":"IPC,TRANSACTION_TYPE,PAYMENT_TYPE","format":"","hidden":true,"datatype":"String","mandatory":true,"listvalues":null}],"network":[{"field":"component.service.type","label":"Service Type","value":"GATEWAY_SERVICE","format":"^([a-zA-Z_-])","hidden":"false","datatype":"String","mandatory":"true","listvalues":["DB_QUERY:(select value from lookup_value where lookup_type in (select id from lookup_type where name = \'SERVICE_TYPE\'))"]},{"field":"server.port","label":"Server Port(Network)","value":"${server_port:8031}","format":"","hidden":"true","datatype":"String","mandatory":"true"},{"field":"component.type","label":"Component Type(Network)","value":"L3_JSON","format":"^([a-zA-Z0-9_-])","hidden":false,"datatype":"String","mandatory":true,"listvalues":null},{"field":"spring.profiles.active","label":"Spring Profiles Active(Network)","value":"hz-client,http_server","format":"^([a-zA-Z_,-])","hidden":true,"datatype":"String","fileName":null,"mandatory":true,"listvalues":null}]}}',
    messageStandard: {
      id: 189,
      value: 'XML-OVER-HTTP',
      description: 'XML-OVER-HTTP',
      modifiable: '0',
      active: '1',
      lookupType: {
        id: 4,
        name: 'Message_Standard',
        description: 'Message Standard',
        modifiable: '0',
      },
    },
    messageProtocol: {
      id: 25,
      value: 'XML-OVER-HTTP',
      description: 'XML OVER HTTP',
      modifiable: '0',
      active: '1',
      lookupType: {
        id: 5,
        name: 'Message_Protocol',
        description: 'Message Protocol',
        modifiable: '0',
      },
    },
    transmissionProtocol: {
      id: 29,
      value: 'HTTP',
      description: 'HTTP',
      modifiable: '0',
      active: '1',
      lookupType: {
        id: 6,
        name: 'Transmission_Protocol',
        description: 'Transmission Protocol',
        modifiable: '0',
      },
    },
  },
  screen: 'l3',
};
class translateServiceMock {
  public onLangChange: EventEmitter<any> = new EventEmitter();
  public onTranslationChange: EventEmitter<any> = new EventEmitter();
  public onDefaultLangChange: EventEmitter<any> = new EventEmitter();

  public get(key: any): any {
    return of(key);
  }
}
const data = 
{
  label:'test',
  value :'abc',
  mandatory: true,
  hidden: true
}


describe('MasterConfigurationDetailsComponent', () => {
  let component: MasterConfigurationDetailsComponent;
  let fixture: ComponentFixture<MasterConfigurationDetailsComponent>;
  let mockStore: MockStore<IAppState>;
  let mockconfigurationUpdated: MemoizedSelector<any, any>;
  let mockconfigurationMasterList: MemoizedSelector<any, any>;
  let translateService: TranslateService;
  const importFileService = jasmine.createSpyObj('ImportFileService', ['clearData']);
  beforeEach(() => {
    const translateService = jasmine.createSpyObj('TranslateService', ['get', 'setDefaultLang']);
    const alertService = jasmine.createSpyObj('AlertService, SnotifyService', ['responseMessage']);
    TestBed.configureTestingModule({
      declarations: [MasterConfigurationDetailsComponent],
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
    fixture = TestBed.createComponent(MasterConfigurationDetailsComponent);
    component = fixture.componentInstance;

    mockconfigurationUpdated = mockStore.overrideSelector(
      configurationUpdated,
      configurationUpdatedJson,
    );
    mockconfigurationMasterList = mockStore.overrideSelector(
      configurationMasterList,
      mockconfigurationMasterListJson,
    );

    translateService = TestBed.inject(TranslateService);
    mockStore.refreshState();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('tabChange fuction should call', () => {
    const index =1
    const tab = 2;
    component.tabChange({index,tab});
    expect(component.tabChange).toBeDefined;
    expect(component.tabChange).toHaveBeenCalled;
  });
  // it('updateData fuction should call', () => {
  //   component.updateData(data);
  //   expect(component.updateData).toBeDefined;
  //   expect(component.updateData).toHaveBeenCalled;
  // });
  it('cancelForm fuction should call', () => {
    component.cancelForm();
    expect(component.cancelForm).toBeDefined;
    expect(component.cancelForm).toHaveBeenCalled;
    expect(component.isEditDialogVsl).toBe(false);
  });
  it('editDetail fuction should call', () => {
    component.editDetail(data);
    expect(component.editDetail).toBeDefined;
    expect(component.editDetail).toHaveBeenCalled;
  });
  it('submitForm fuction should call', () => {
    component.submitForm();
    expect(component.submitForm).toBeDefined;
    expect(component.submitForm).toHaveBeenCalled;
  });
  afterEach(() => {
    fixture.destroy();
  });
});
