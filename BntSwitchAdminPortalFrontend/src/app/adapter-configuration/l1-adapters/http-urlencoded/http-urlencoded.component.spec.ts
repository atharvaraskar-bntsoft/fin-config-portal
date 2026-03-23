import { EventEmitter } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdapterCommonService } from '@app/services/adapter-common.service';
import { AlertService } from '@app/services/alert.service';
import { L1AdapterService } from '@app/services/l1-adapter.service';
import { SubscribeService } from '@app/services/subscribe.services';
import { IAppState } from '@app/store/state/app.state';
import { MemoizedSelector, StoreModule } from '@ngrx/store';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { SnotifyService, ToastDefaults } from 'ng-snotify';
import { NzModalService } from 'ng-zorro-antd/modal';
import { of } from 'rxjs';
import { HttpUrlencodedComponent } from './http-urlencoded.component';
import { GetImfTypeListJsonSuccess } from '@app/store/selectors/imf-json.selector';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { BrowserModule } from '@angular/platform-browser';
import { FieldErrorDisplayComponent } from '@app/shared/field-error-display/field-error-display.component';
import { CommonModule } from '@angular/common';

class translateServiceMock {
  public onLangChange: EventEmitter<any> = new EventEmitter();
  public onTranslationChange: EventEmitter<any> = new EventEmitter();
  public onDefaultLangChange: EventEmitter<any> = new EventEmitter();
  public get(key: any): any {
    return of(key);
  }
}

class formBuilderClass {
  public close(key: any): any {}
}

class nzModelSeviceClass {
  public close(key: any): any {}
}

const typeListJson = {
  status: 'success',
  message: 'Find imf field-type-list',
  data: {
    'type-list': [
      'STRING',
      'CHAR',
      'LIST',
      'MAP',
      'INTEGER',
      'DOUBLE',
      'LONG',
      'ARRAY',
      'BYTE_ARRAY',
      'DATE',
      'TIMEATAMP',
      'BOOLEAN',
      'NUMBER',
      'OBJECT',
      'INT_ARRAY',
    ],
  },
};
const adaptorDataJson = {
  masterData: {
    adapterDto: {
      id: 101,
      type: 'L1',
      standardMessageSpecification: {
        id: 8,
        messageStandard: {
          id: -3,
          value: 'HTTP-URLENCODED',
          description: 'HTTP-URLENCODED',
          modifiable: '0',
          active: null,
          lookupType: {
            id: 4,
            name: 'Message_Standard',
            description: 'Message Standard',
            modifiable: '0',
          },
        },
        messageProtocol: {
          id: -4,
          value: 'HTTP-URLENCODED',
          description: 'HTTP-URLENCODED',
          modifiable: '0',
          active: null,
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
          active: null,
          lookupType: {
            id: 6,
            name: 'Transmission_Protocol',
            description: 'Transmission Protocol',
            modifiable: '0',
          },
        },
      },
      name: 'jfslkajdfk',
      adapterId: 'jfslkajdfk',
      active: '1',
      guid: null,
    },
    tabIndex: 0,
  },
  schemaData: {
    persistRequired: 1,
    schema:
      '{"basePath":null,"defaultHost":null,"headers":["test"],"apiDefinitions":[{"name":"api","api":"//","host":"host","method":"POST","incomingPackager":{"attributes":[{"parent":"0-0","fieldName":"abc&#46;abpp5677","isEditable":true,"isSensitive":false,"alias":"abc.abpp5677","isPersist":true,"type":"field","fieldType":"STRING","isHide":false}]},"outgoingPackager":{"attributes":[{"parent":"0-0","fieldName":"fgkldfk&#46;kjjoeo494859","isEditable":true,"isSensitive":false,"alias":"fgkldfk.kjjoeo494859","isPersist":true,"type":"field","fieldType":"STRING","isHide":false}]}}],"singleApi":true}',
    messageSchemaPackager:
      '{"basePath":null,"defaultHost":null,"headers":["test"],"apiDefinitions":[{"name":"api","api":"//","host":"host","method":"POST","incomingPackager":{"attributes":[{"parent":"0-0","fieldName":"abc&#46;abpp5677","isEditable":true,"isSensitive":false,"alias":"abc.abpp5677","isPersist":true,"type":"field","fieldType":"STRING","isHide":false}]},"outgoingPackager":{"attributes":[{"parent":"0-0","fieldName":"fgkldfk&#46;kjjoeo494859","isEditable":true,"isSensitive":false,"alias":"fgkldfk.kjjoeo494859","isPersist":true,"type":"field","fieldType":"STRING","isHide":false}]}}],"singleApi":true}',
  },
  networkData: {
    persistRequired: 1,
    properties: {
      message: [
        {
          field: 'message--server.port',
          label: 'Server Port(Message)',
          listvalues: null,
          value: '${server_port:8071}',
          fileName: null,
          datatype: 'String',
          format: '',
          mandatory: true,
          hidden: true,
          mtype: 'message',
          custom: 1,
        },
        {
          field: 'message--component.type',
          label: 'Component Type(Message)',
          listvalues: null,
          value: 'L1_JSON',
          fileName: null,
          datatype: 'String',
          format: '^([a-zA-Z0-9_-])',
          mandatory: true,
          hidden: false,
          mtype: 'message',
          custom: 1,
        },
      ],
      network: [
        {
          field: 'network--server.port',
          label: 'Server Port(Network)',
          listvalues: null,
          value: '${server_port:8031}',
          fileName: null,
          datatype: 'String',
          format: '',
          mandatory: true,
          hidden: true,
          mtype: 'network',
          custom: 1,
        },
      ],
    },
    connectionManagement: null,
  },
  transformData: {
    persistRequired: '0',
    requestMapping: null,
    responseMapping: null,
    imfLeg: null,
    fieldSchemeImfMapperUiWrapper: null,
    listIdRule: null,
    safingCondition: null,
    apiFieldsData: {
      headerFields: [
        {
          id: 'header[test]',
          name: 'test',
          possibleValue: null,
          parentField: null,
        },
        {
          id: 'header[L1_MESSAGE_TYPE_INDICATOR]',
          name: 'apiName',
          possibleValue: ['api'],
          parentField: null,
        },
      ],
      apiFields: [
        {
          apiName: 'api',
          apiurl: '',
          isMutliResponse: null,
          incomingFields: [
            {
              id: 'http_headers[test]',
              name: 'HTTP-HEADER(test)',
              possibleValue: null,
              parentField: null,
            },
            {
              id: 'abc&#46;abpp5677',
              name: 'abc.abpp5677',
              possibleValue: null,
              parentField: null,
            },
          ],
          apiConditionalPackgerFields: null,
          outGoingFields: [
            {
              id: 'http_headers[test]',
              name: 'HTTP-HEADER(test)',
              possibleValue: null,
              parentField: null,
            },
            {
              id: 'fgkldfk&#46;kjjoeo494859',
              name: 'fgkldfk.kjjoeo494859',
              possibleValue: null,
              parentField: null,
            },
          ],
        },
      ],
    },
  },
  responseCodeData: {
    persistRequired: '0',
    ipcUiWrapper: null,
  },
  beanconfiguationData: {
    persistRequired: null,
    beans: [
      {
        componentType: 'L1',
        componentId: null,
        fileType: 'WORKFLOW CHAIN',
        fileName: 'workflow-chain.xml',
        fileContent:
          '<beans xmlns="http://www.springframework.org/schema/beans"\r\n\txmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"\r\n\txmlns:p="http://www.springframework.org/schema/p"\r\n\txmlns:int="http://www.springframework.org/schema/integration"\r\n\txmlns:task="http://www.springframework.org/schema/task"\r\n\txmlns:context="http://www.springframework.org/schema/context"\r\n\txsi:schemaLocation="http://www.springframework.org/schema/beans\r\nhttp://www.springframework.org/schema/beans/spring-beans.xsd \r\nhttp://www.springframework.org/schema/integration http://www.springframework.org/schema/integration/spring-integration.xsd \r\nhttp://www.springframework.org/schema/task http://www.springframework.org/schema/task/spring-task.xsd \r\nhttp://www.springframework.org/schema/context http://www.springframework.org/schema/context/spring-context.xsd">\r\n\r\n\t<int:chain input-channel="requestConsumerChannel" output-channel="routingChannel">\r\n\t\t<int:transformer ref="adapterTransformer" method="parseNativeSource"/>\r\n\t\t<int:transformer ref="adapterTransformer" method="nativeToIMFTransformer"/>\r\n\t\t<int:transformer ref="tagsTransformer" method="parseTags"/>\r\n\t\t<int:header-enricher>\r\n\t\t\t<int:header name="SPECIFICATION_ID" value="${component.name:undefined}"></int:header>\r\n\t\t</int:header-enricher>\r\n\t\t<int:header-enricher />\r\n\t</int:chain>\r\n\t\r\n\t<int:chain input-channel="responseConsumerChannel" output-channel="responseSenderChannel">\r\n\t\t<int:transformer ref="adapterTransformer" method="responseTransformer"/>\r\n\t\t<int:transformer ref="adapterTransformer" method="nativetoSource"/>\r\n\t</int:chain>\r\n\t\r\n\t<int:chain input-channel="invalidMessageChannel" output-channel="responseSenderChannel">\r\n\t\t<int:transformer ref="adapterTransformer" method="prepareInvalidResponse"/>\r\n\t</int:chain>\r\n\r\n</beans>',
        version: 1,
        packagingType: 'SYSTEM',
      },
      {
        componentType: 'L1',
        componentId: null,
        fileType: 'CHANNELS',
        fileName: 'channels.xml',
        fileContent:
          '<beans xmlns="http://www.springframework.org/schema/beans"\r\n\txmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"\r\n\txmlns:p="http://www.springframework.org/schema/p"\r\n\txmlns:int="http://www.springframework.org/schema/integration"\r\n\txmlns:task="http://www.springframework.org/schema/task"\r\n\txmlns:context="http://www.springframework.org/schema/context"\r\n\txsi:schemaLocation="http://www.springframework.org/schema/beans\r\nhttp://www.springframework.org/schema/beans/spring-beans.xsd \r\nhttp://www.springframework.org/schema/integration http://www.springframework.org/schema/integration/spring-integration.xsd \r\nhttp://www.springframework.org/schema/task http://www.springframework.org/schema/task/spring-task.xsd \r\nhttp://www.springframework.org/schema/context http://www.springframework.org/schema/context/spring-context.xsd">\r\n\r\n\t<task:executor id="requestConsumerChannelExecutor" pool-size="50-150" queue-capacity="5000" keep-alive="50" rejection-policy="CALLER_RUNS"/>\r\n\t<int:channel id="requestConsumerChannel">\r\n\t\t<int:dispatcher task-executor="requestConsumerChannelExecutor" />\r\n\t</int:channel>\r\n\t\r\n\t<task:executor id="responseConsumerChannelExecutor" pool-size="50-150" queue-capacity="5000" keep-alive="50" rejection-policy="CALLER_RUNS" />\t\r\n\t<int:channel id="responseConsumerChannel" >\r\n\t\t<int:dispatcher task-executor="requestConsumerChannelExecutor" />\r\n\t</int:channel>\r\n\r\n\t<int:channel id="requestSenderChannel" />\r\n\t<int:channel id="responseSenderChannel" />\r\n\t<int:channel id="reversalConsumerChannel" />\r\n\t<int:channel id="transformationErrorChannel" />\r\n\t<int:channel id="validationErrorChannel" />\r\n\t<int:channel id="invalidMessageChannel" />\r\n\r\n</beans>',
        version: 1,
        packagingType: 'SYSTEM',
      },
    ],
  },
  configurationId: 1046,
  configurationVersion: 0,
  imfId: {
    id: 12,
    name: 'IMF Structure 76',
    version: 76,
  },
  beanTabDisable: true,
};
xdescribe('HttpUrlencodedComponent', () => {
  let component: HttpUrlencodedComponent;
  let fixture: ComponentFixture<HttpUrlencodedComponent>;
  let mockStore: MockStore<IAppState>;
  let mockselectTypeList: MemoizedSelector<any, any>;
  let setDefaultLangSpy: jasmine.Spy;

  beforeEach(() => {
    const translateService = jasmine.createSpyObj('TranslateService', ['get', 'setDefaultLang']);
    TestBed.configureTestingModule({
      declarations: [HttpUrlencodedComponent, FieldErrorDisplayComponent],
      providers: [
        AlertService,
        SnotifyService,
        L1AdapterService,
        AdapterCommonService,
        SubscribeService,
        provideMockStore(),
        { provide: 'SnotifyToastConfig', useValue: ToastDefaults },
        { provide: TranslateService, useClass: translateServiceMock },
        // { provide: FormBuilder, useClass: formBuilderClass},
        // FormBuilder,
        { provide: NzModalService, useClass: nzModelSeviceClass },
      ],
      imports: [
        FormsModule,
        ReactiveFormsModule,
        RouterTestingModule,
        HttpClientTestingModule,
        BrowserModule,
        TranslateModule.forRoot({}),
        // StoreModule.forRoot({}),
        CommonModule
      ],
    }).compileComponents();

    mockStore = TestBed.inject(MockStore);
    fixture = TestBed.createComponent(HttpUrlencodedComponent);
    component = fixture.componentInstance;

    mockselectTypeList = mockStore.overrideSelector(GetImfTypeListJsonSuccess, typeListJson);

    setDefaultLangSpy = translateService.get.and.returnValue(of([]));

    mockStore.refreshState();
    fixture.detectChanges();
  });

  // beforeEach(() => {
  //   fixture = TestBed.createComponent(HttpUrlencodedComponent);
  //   component = fixture.componentInstance;
  //   component.tempJson = {
  //     basePath: null,
  //     defaultHost: null,
  //     singleApi: false,
  //     headers: [],
  //     apiDefinitions: [
  //       {
  //         name: null,
  //         api: '/',
  //         host: null,
  //         method: null,
  //         incomingPackager: null,
  //         outgoingPackager: null,
  //       },
  //     ],
  //   };
  //   component.adapterData = adaptorDataJson;
  //   fixture.detectChanges();
  // });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
});
