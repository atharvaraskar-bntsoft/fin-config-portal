import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { AlertService } from '@app/services/alert.service';
import { IAppState } from '@app/store/state/app.state';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { SnotifyService, ToastDefaults } from 'ng-snotify';
import { NzModalService } from 'ng-zorro-antd/modal';
import { EventEmitter,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { of } from 'rxjs';
import { SchemaComponent } from './schema.component';
import { SharedModule } from '@app/shared/shared.module';
import { StoreModule } from '@ngrx/store';
import { FormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { RouterTestingModule } from '@angular/router/testing';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { AlertModule } from 'bnt';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { AdapterCommonService } from '@app/services/adapter-common.service';
import { CommonModule } from '@angular/common';

class translateServiceMock {
  public onLangChange: EventEmitter<any> = new EventEmitter();
  public onTranslationChange: EventEmitter<any> = new EventEmitter();
  public onDefaultLangChange: EventEmitter<any> = new EventEmitter();

  public get(key: any): any {
    return of(key);
  }
}
const networkData = {};
describe('SchemaComponent', () => {
  let component: SchemaComponent;
  let fixture: ComponentFixture<SchemaComponent>;
  let mockStore: MockStore<IAppState>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SchemaComponent],
      providers: [
        TranslateService,
        NzModalService,
        AlertService,
        SnotifyService,
        AdapterCommonService,
        { provide: 'SnotifyToastConfig', useValue: ToastDefaults },
        { provide: TranslateService, useClass: translateServiceMock },
        provideMockStore(),
      ],
      imports: [
        SharedModule,
        StoreModule,
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
        CommonModule
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    mockStore = TestBed.get(MockStore);
    fixture = TestBed.createComponent(SchemaComponent);
    component = fixture.componentInstance;

    mockStore.refreshState();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should  Angular calls ngOnInit', () => {
    component.ngOnInit();
  });
 
  // it('function should change the tab', () => {
  //   component.tabChange();
  // //   const networkData={
  // //     "connections": [],
  // //     "strategyConnections": {
  // //       "strategyConnections": null,
  // //       "stationGroupStrategy": null,
  // //       "custumStrategy": null
  // //     },
  // //     "alternateConnection": null,
  // //     persistRequired : "0",
  // //     "networkData":{id:0},
  // // };
  // const adapterData={
  //   "currentValue": {
  //     "masterData": {
  //       "adapterDto": {
  //         "id": 261,
  //         "type": "L3",
  //         "standardMessageSpecification": {
  //           "id": 7,
  //           "messageStandard": {
  //             "id": -1,
  //             "value": "JSON",
  //             "description": "JSON",
  //             "modifiable": "0",
  //             "active": null,
  //             "lookupType": {
  //               "id": 4,
  //               "name": "Message_Standard",
  //               "description": "Message Standard",
  //               "modifiable": "0"
  //             }
  //           },
  //           "messageProtocol": {
  //             "id": 26,
  //             "value": "JSON",
  //             "description": "JSON",
  //             "modifiable": "0",
  //             "active": null,
  //             "lookupType": {
  //               "id": 5,
  //               "name": "Message_Protocol",
  //               "description": "Message Protocol",
  //               "modifiable": "0"
  //             }
  //           },
  //           "transmissionProtocol": {
  //             "id": 29,
  //             "value": "HTTP",
  //             "description": "HTTP",
  //             "modifiable": "0",
  //             "active": null,
  //             "lookupType": {
  //               "id": 6,
  //               "name": "Transmission_Protocol",
  //               "description": "Transmission Protocol",
  //               "modifiable": "0"
  //             }
  //           }
  //         },
  //         "name": "aaa",
  //         "adapterId": "aaa",
  //         "active": "1",
  //         "guid": null
  //       }
  //     },
  //     "schemaData": {
  //       "persistRequired": "0",
  //       "schema": {
  //         "headers": [
  
  //         ],
  //         "apiDefinitions": [
  //           {
  //             "healthApi": "aaaa",
  //             "method": "GET",
  //             "incomingPackager": {
  //               "attributes": [
  //                 {
  //                   "parent": "0-0",
  //                   "fieldName": "id",
  //                   "isEditable": true,
  //                   "isSensitive": false,
  //                   "alias": "",
  //                   "isPersist": true,
  //                   "type": "field",
  //                   "fieldType": "INTEGER",
  //                   "isHide": false
  //                 },
  //                 {
  //                   "parent": "0-1",
  //                   "fieldName": "title",
  //                   "isEditable": true,
  //                   "isSensitive": false,
  //                   "alias": "",
  //                   "isPersist": true,
  //                   "type": "field",
  //                   "fieldType": "STRING",
  //                   "isHide": false
  //                 },
  //                 {
  //                   "parent": "0-2",
  //                   "fieldName": "description",
  //                   "isEditable": true,
  //                   "isSensitive": false,
  //                   "alias": "",
  //                   "isPersist": true,
  //                   "type": "field",
  //                   "fieldType": "STRING",
  //                   "isHide": false
  //                 },
  //                 {
  //                   "parent": "0-3",
  //                   "fieldName": "price",
  //                   "isEditable": true,
  //                   "isSensitive": false,
  //                   "alias": "",
  //                   "isPersist": true,
  //                   "type": "field",
  //                   "fieldType": "INTEGER",
  //                   "isHide": false
  //                 },
  //                 {
  //                   "parent": "0-4",
  //                   "fieldName": "discountPercentage",
  //                   "isEditable": true,
  //                   "isSensitive": false,
  //                   "alias": "",
  //                   "isPersist": true,
  //                   "type": "field",
  //                   "fieldType": "INTEGER",
  //                   "isHide": false
  //                 },
  //                 {
  //                   "parent": "0-5",
  //                   "fieldName": "rating",
  //                   "isEditable": true,
  //                   "isSensitive": false,
  //                   "alias": "",
  //                   "isPersist": true,
  //                   "type": "field",
  //                   "fieldType": "INTEGER",
  //                   "isHide": false
  //                 },
  //                 {
  //                   "parent": "0-6",
  //                   "fieldName": "stock",
  //                   "isEditable": true,
  //                   "isSensitive": false,
  //                   "alias": "",
  //                   "isPersist": true,
  //                   "type": "field",
  //                   "fieldType": "INTEGER",
  //                   "isHide": false
  //                 },
  //                 {
  //                   "parent": "0-7",
  //                   "fieldName": "brand",
  //                   "isEditable": true,
  //                   "isSensitive": false,
  //                   "alias": "",
  //                   "isPersist": true,
  //                   "type": "field",
  //                   "fieldType": "STRING",
  //                   "isHide": false
  //                 },
  //                 {
  //                   "parent": "0-8",
  //                   "fieldName": "category",
  //                   "isEditable": true,
  //                   "isSensitive": false,
  //                   "alias": "",
  //                   "isPersist": true,
  //                   "type": "field",
  //                   "fieldType": "STRING",
  //                   "isHide": false
  //                 },
  //                 {
  //                   "parent": "0-9",
  //                   "fieldName": "thumbnail",
  //                   "isEditable": true,
  //                   "isSensitive": false,
  //                   "alias": "",
  //                   "isPersist": true,
  //                   "type": "field",
  //                   "fieldType": "STRING",
  //                   "isHide": false
  //                 },
  //                 {
  //                   "parent": "0-10",
  //                   "fieldName": "images",
  //                   "isEditable": true,
  //                   "isSensitive": false,
  //                   "alias": "",
  //                   "isPersist": true,
  //                   "type": "field",
  //                   "fieldType": "LIST",
  //                   "isHide": false
  //                 }
  //               ]
  //             },
  //             "name": "aaaa",
  //             "host": "172.1.1.2.0",
  //             "api": "/aaaaaaa",
  //             "outgoingPackager": {
  //               "attributes": [
  //                 {
  //                   "parent": "0-0",
  //                   "fieldName": "id",
  //                   "isEditable": true,
  //                   "isSensitive": false,
  //                   "alias": "",
  //                   "isPersist": true,
  //                   "type": "field",
  //                   "fieldType": "INTEGER",
  //                   "isHide": false
  //                 },
  //                 {
  //                   "parent": "0-1",
  //                   "fieldName": "title",
  //                   "isEditable": true,
  //                   "isSensitive": false,
  //                   "alias": "",
  //                   "isPersist": true,
  //                   "type": "field",
  //                   "fieldType": "STRING",
  //                   "isHide": false
  //                 },
  //                 {
  //                   "parent": "0-2",
  //                   "fieldName": "description",
  //                   "isEditable": true,
  //                   "isSensitive": false,
  //                   "alias": "",
  //                   "isPersist": true,
  //                   "type": "field",
  //                   "fieldType": "STRING",
  //                   "isHide": false
  //                 },
  //                 {
  //                   "parent": "0-3",
  //                   "fieldName": "price",
  //                   "isEditable": true,
  //                   "isSensitive": false,
  //                   "alias": "",
  //                   "isPersist": true,
  //                   "type": "field",
  //                   "fieldType": "INTEGER",
  //                   "isHide": false
  //                 },
  //                 {
  //                   "parent": "0-4",
  //                   "fieldName": "discountPercentage",
  //                   "isEditable": true,
  //                   "isSensitive": false,
  //                   "alias": "",
  //                   "isPersist": true,
  //                   "type": "field",
  //                   "fieldType": "INTEGER",
  //                   "isHide": false
  //                 },
  //                 {
  //                   "parent": "0-5",
  //                   "fieldName": "rating",
  //                   "isEditable": true,
  //                   "isSensitive": false,
  //                   "alias": "",
  //                   "isPersist": true,
  //                   "type": "field",
  //                   "fieldType": "INTEGER",
  //                   "isHide": false
  //                 },
  //                 {
  //                   "parent": "0-6",
  //                   "fieldName": "stock",
  //                   "isEditable": true,
  //                   "isSensitive": false,
  //                   "alias": "",
  //                   "isPersist": true,
  //                   "type": "field",
  //                   "fieldType": "INTEGER",
  //                   "isHide": false
  //                 },
  //                 {
  //                   "parent": "0-7",
  //                   "fieldName": "brand",
  //                   "isEditable": true,
  //                   "isSensitive": false,
  //                   "alias": "",
  //                   "isPersist": true,
  //                   "type": "field",
  //                   "fieldType": "STRING",
  //                   "isHide": false
  //                 },
  //                 {
  //                   "parent": "0-8",
  //                   "fieldName": "category",
  //                   "isEditable": true,
  //                   "isSensitive": false,
  //                   "alias": "",
  //                   "isPersist": true,
  //                   "type": "field",
  //                   "fieldType": "STRING",
  //                   "isHide": false
  //                 },
  //                 {
  //                   "parent": "0-9",
  //                   "fieldName": "thumbnail",
  //                   "isEditable": true,
  //                   "isSensitive": false,
  //                   "alias": "",
  //                   "isPersist": true,
  //                   "type": "field",
  //                   "fieldType": "STRING",
  //                   "isHide": false
  //                 },
  //                 {
  //                   "parent": "0-10",
  //                   "fieldName": "images",
  //                   "isEditable": true,
  //                   "isSensitive": false,
  //                   "alias": "",
  //                   "isPersist": true,
  //                   "type": "field",
  //                   "fieldType": "LIST",
  //                   "isHide": false
  //                 }
  //               ]
  //             }
  //           }
  //         ],
  //         "singleApi": true
  //       },
  //       "messageSchemaPackager": "{\"basePath\":null,\"defaultHost\":null,\"headers\":[],\"defaultRole\":null,\"apiDefinitions\":[{\"name\":\"aaaa\",\"api\":\"/aaaaaaa\",\"host\":\"172.1.1.2.0\",\"healthApi\":\"aaaa\",\"method\":\"GET\",\"incomingPackager\":{\"attributes\":[{\"type\":\"field\",\"fieldName\":\"id\",\"fieldType\":\"INTEGER\",\"isSensitive\":false,\"isHide\":false,\"isPersist\":true,\"alias\":\"\",\"isEditable\":true,\"parent\":\"0-0\"},{\"type\":\"field\",\"fieldName\":\"title\",\"fieldType\":\"STRING\",\"isSensitive\":false,\"isHide\":false,\"isPersist\":true,\"alias\":\"\",\"isEditable\":true,\"parent\":\"0-1\"},{\"type\":\"field\",\"fieldName\":\"description\",\"fieldType\":\"STRING\",\"isSensitive\":false,\"isHide\":false,\"isPersist\":true,\"alias\":\"\",\"isEditable\":true,\"parent\":\"0-2\"},{\"type\":\"field\",\"fieldName\":\"price\",\"fieldType\":\"INTEGER\",\"isSensitive\":false,\"isHide\":false,\"isPersist\":true,\"alias\":\"\",\"isEditable\":true,\"parent\":\"0-3\"},{\"type\":\"field\",\"fieldName\":\"discountPercentage\",\"fieldType\":\"INTEGER\",\"isSensitive\":false,\"isHide\":false,\"isPersist\":true,\"alias\":\"\",\"isEditable\":true,\"parent\":\"0-4\"},{\"type\":\"field\",\"fieldName\":\"rating\",\"fieldType\":\"INTEGER\",\"isSensitive\":false,\"isHide\":false,\"isPersist\":true,\"alias\":\"\",\"isEditable\":true,\"parent\":\"0-5\"},{\"type\":\"field\",\"fieldName\":\"stock\",\"fieldType\":\"INTEGER\",\"isSensitive\":false,\"isHide\":false,\"isPersist\":true,\"alias\":\"\",\"isEditable\":true,\"parent\":\"0-6\"},{\"type\":\"field\",\"fieldName\":\"brand\",\"fieldType\":\"STRING\",\"isSensitive\":false,\"isHide\":false,\"isPersist\":true,\"alias\":\"\",\"isEditable\":true,\"parent\":\"0-7\"},{\"type\":\"field\",\"fieldName\":\"category\",\"fieldType\":\"STRING\",\"isSensitive\":false,\"isHide\":false,\"isPersist\":true,\"alias\":\"\",\"isEditable\":true,\"parent\":\"0-8\"},{\"type\":\"field\",\"fieldName\":\"thumbnail\",\"fieldType\":\"STRING\",\"isSensitive\":false,\"isHide\":false,\"isPersist\":true,\"alias\":\"\",\"isEditable\":true,\"parent\":\"0-9\"},{\"type\":\"field\",\"isEditable\":true,\"parent\":\"0-10\",\"isSensitive\":false,\"isHide\":false,\"isPersist\":true,\"alias\":\"\",\"fieldType\":\"LIST\",\"fieldName\":\"images\"}]},\"outgoingPackager\":{\"attributes\":[{\"type\":\"field\",\"fieldName\":\"id\",\"fieldType\":\"INTEGER\",\"isSensitive\":false,\"isHide\":false,\"isPersist\":true,\"alias\":\"\",\"isEditable\":true,\"parent\":\"0-0\"},{\"type\":\"field\",\"fieldName\":\"title\",\"fieldType\":\"STRING\",\"isSensitive\":false,\"isHide\":false,\"isPersist\":true,\"alias\":\"\",\"isEditable\":true,\"parent\":\"0-1\"},{\"type\":\"field\",\"fieldName\":\"description\",\"fieldType\":\"STRING\",\"isSensitive\":false,\"isHide\":false,\"isPersist\":true,\"alias\":\"\",\"isEditable\":true,\"parent\":\"0-2\"},{\"type\":\"field\",\"fieldName\":\"price\",\"fieldType\":\"INTEGER\",\"isSensitive\":false,\"isHide\":false,\"isPersist\":true,\"alias\":\"\",\"isEditable\":true,\"parent\":\"0-3\"},{\"type\":\"field\",\"fieldName\":\"discountPercentage\",\"fieldType\":\"INTEGER\",\"isSensitive\":false,\"isHide\":false,\"isPersist\":true,\"alias\":\"\",\"isEditable\":true,\"parent\":\"0-4\"},{\"type\":\"field\",\"fieldName\":\"rating\",\"fieldType\":\"INTEGER\",\"isSensitive\":false,\"isHide\":false,\"isPersist\":true,\"alias\":\"\",\"isEditable\":true,\"parent\":\"0-5\"},{\"type\":\"field\",\"fieldName\":\"stock\",\"fieldType\":\"INTEGER\",\"isSensitive\":false,\"isHide\":false,\"isPersist\":true,\"alias\":\"\",\"isEditable\":true,\"parent\":\"0-6\"},{\"type\":\"field\",\"fieldName\":\"brand\",\"fieldType\":\"STRING\",\"isSensitive\":false,\"isHide\":false,\"isPersist\":true,\"alias\":\"\",\"isEditable\":true,\"parent\":\"0-7\"},{\"type\":\"field\",\"fieldName\":\"category\",\"fieldType\":\"STRING\",\"isSensitive\":false,\"isHide\":false,\"isPersist\":true,\"alias\":\"\",\"isEditable\":true,\"parent\":\"0-8\"},{\"type\":\"field\",\"fieldName\":\"thumbnail\",\"fieldType\":\"STRING\",\"isSensitive\":false,\"isHide\":false,\"isPersist\":true,\"alias\":\"\",\"isEditable\":true,\"parent\":\"0-9\"},{\"type\":\"field\",\"isEditable\":true,\"parent\":\"0-10\",\"isSensitive\":false,\"isHide\":false,\"isPersist\":true,\"alias\":\"\",\"fieldType\":\"LIST\",\"fieldName\":\"images\"}]}}],\"singleApi\":true}"
  //     },
  //     "networkData": {
  //       "persistRequired": "0",
  //       "properties": null,
  //       "connectionManagement": null
  //     },
  //     "transformData": {
  //       "persistRequired": "0",
  //       "requestMapping": null,
  //       "responseMapping": null,
  //       "imfLeg": null,
  //       "fieldSchemeImfMapperUiWrapper": null,
  //       "listIdRule": null,
  //       "safingCondition": null,
  //       "apiFieldsData": {
  //         "headerFields": [
  //           {
  //             "id": "header[MESSAGE_TYPE_INDICATOR]",
  //             "name": "apiName",
  //             "possibleValue": [
  //               "aaaa"
  //             ],
  //             "parentField": null
  //           }
  //         ],
  //         "apiFields": [
  //           {
  //             "apiName": "aaaa",
  //             "apiurl": "/aaaaaaa",
  //             "isMutliResponse": null,
  //             "incomingFields": [
  //               {
  //                 "id": "id",
  //                 "name": "id",
  //                 "possibleValue": null,
  //                 "parentField": null
  //               },
  //               {
  //                 "id": "title",
  //                 "name": "title",
  //                 "possibleValue": null,
  //                 "parentField": null
  //               },
  //               {
  //                 "id": "description",
  //                 "name": "description",
  //                 "possibleValue": null,
  //                 "parentField": null
  //               },
  //               {
  //                 "id": "price",
  //                 "name": "price",
  //                 "possibleValue": null,
  //                 "parentField": null
  //               },
  //               {
  //                 "id": "discountPercentage",
  //                 "name": "discountPercentage",
  //                 "possibleValue": null,
  //                 "parentField": null
  //               },
  //               {
  //                 "id": "rating",
  //                 "name": "rating",
  //                 "possibleValue": null,
  //                 "parentField": null
  //               },
  //               {
  //                 "id": "stock",
  //                 "name": "stock",
  //                 "possibleValue": null,
  //                 "parentField": null
  //               },
  //               {
  //                 "id": "brand",
  //                 "name": "brand",
  //                 "possibleValue": null,
  //                 "parentField": null
  //               },
  //               {
  //                 "id": "category",
  //                 "name": "category",
  //                 "possibleValue": null,
  //                 "parentField": null
  //               },
  //               {
  //                 "id": "thumbnail",
  //                 "name": "thumbnail",
  //                 "possibleValue": null,
  //                 "parentField": null
  //               },
  //               {
  //                 "id": "images",
  //                 "name": "images",
  //                 "possibleValue": null,
  //                 "parentField": null
  //               }
  //             ],
  //             "apiConditionalPackgerFields": null,
  //             "outGoingFields": [
  //               {
  //                 "id": "id",
  //                 "name": "id",
  //                 "possibleValue": null,
  //                 "parentField": null
  //               },
  //               {
  //                 "id": "title",
  //                 "name": "title",
  //                 "possibleValue": null,
  //                 "parentField": null
  //               },
  //               {
  //                 "id": "description",
  //                 "name": "description",
  //                 "possibleValue": null,
  //                 "parentField": null
  //               },
  //               {
  //                 "id": "price",
  //                 "name": "price",
  //                 "possibleValue": null,
  //                 "parentField": null
  //               },
  //               {
  //                 "id": "discountPercentage",
  //                 "name": "discountPercentage",
  //                 "possibleValue": null,
  //                 "parentField": null
  //               },
  //               {
  //                 "id": "rating",
  //                 "name": "rating",
  //                 "possibleValue": null,
  //                 "parentField": null
  //               },
  //               {
  //                 "id": "stock",
  //                 "name": "stock",
  //                 "possibleValue": null,
  //                 "parentField": null
  //               },
  //               {
  //                 "id": "brand",
  //                 "name": "brand",
  //                 "possibleValue": null,
  //                 "parentField": null
  //               },
  //               {
  //                 "id": "category",
  //                 "name": "category",
  //                 "possibleValue": null,
  //                 "parentField": null
  //               },
  //               {
  //                 "id": "thumbnail",
  //                 "name": "thumbnail",
  //                 "possibleValue": null,
  //                 "parentField": null
  //               },
  //               {
  //                 "id": "images",
  //                 "name": "images",
  //                 "possibleValue": null,
  //                 "parentField": null
  //               }
  //             ]
  //           }
  //         ]
  //       }
  //     },
  //     "responseCodeData": {
  //       "persistRequired": "0",
  //       "ipcUiWrapper": null
  //     },
  //     "beanconfiguationData": {
  //       "persistRequired": null,
  //       "beans": [
  //         {
  //           "componentType": "L3",
  //           "componentId": null,
  //           "fileType": "CHANNELS",
  //           "fileName": "channels.xml",
  //           "fileContent": "<beans xmlns=\"http://www.springframework.org/schema/beans\"\r\n\txmlns:xsi=\"http://www.w3.org/2001/XMLSchema-instance\"\r\n\txmlns:p=\"http://www.springframework.org/schema/p\"\r\n\txmlns:int=\"http://www.springframework.org/schema/integration\"\r\n\txmlns:task=\"http://www.springframework.org/schema/task\"\r\n\txmlns:context=\"http://www.springframework.org/schema/context\"\r\n\txsi:schemaLocation=\"http://www.springframework.org/schema/beans\r\nhttp://www.springframework.org/schema/beans/spring-beans.xsd \r\nhttp://www.springframework.org/schema/integration http://www.springframework.org/schema/integration/spring-integration.xsd \r\nhttp://www.springframework.org/schema/task http://www.springframework.org/schema/task/spring-task.xsd \r\nhttp://www.springframework.org/schema/context http://www.springframework.org/schema/context/spring-context.xsd\">\r\n\r\n\t<task:executor id=\"requestConsumerChannelExecutor\" pool-size=\"50-150\" queue-capacity=\"5000\" keep-alive=\"50\" rejection-policy=\"CALLER_RUNS\"/>\r\n\t<int:channel id=\"requestConsumerChannel\">\r\n\t\t<int:dispatcher task-executor=\"requestConsumerChannelExecutor\" />\r\n\t</int:channel>\r\n\t\r\n\t<task:executor id=\"responseConsumerChannelExecutor\" pool-size=\"50-150\" queue-capacity=\"5000\" keep-alive=\"50\" rejection-policy=\"CALLER_RUNS\" />\t\r\n\t<int:channel id=\"responseConsumerChannel\" >\r\n\t\t<int:dispatcher task-executor=\"requestConsumerChannelExecutor\" />\r\n\t</int:channel>\r\n\r\n\t<int:channel id=\"requestSenderChannel\" />\r\n\t<int:channel id=\"responseSenderChannel\" />\r\n\t<int:channel id=\"reversalConsumerChannel\" />\r\n\t<int:channel id=\"transformationErrorChannel\" />\r\n\t<int:channel id=\"validationErrorChannel\" />\r\n\t<int:channel id=\"invalidMessageChannel\" />\r\n\r\n</beans>",
  //           "version": 1,
  //           "packagingType": "SYSTEM"
  //         },
  //         {
  //           "componentType": "L3",
  //           "componentId": null,
  //           "fileType": "WORKFLOW CHAIN",
  //           "fileName": "workflow-chain.xml",
  //           "fileContent": "<beans xmlns=\"http://www.springframework.org/schema/beans\"\r\n\txmlns:xsi=\"http://www.w3.org/2001/XMLSchema-instance\"\r\n\txmlns:p=\"http://www.springframework.org/schema/p\"\r\n\txmlns:int=\"http://www.springframework.org/schema/integration\"\r\n\txmlns:task=\"http://www.springframework.org/schema/task\"\r\n\txmlns:context=\"http://www.springframework.org/schema/context\"\r\n\txsi:schemaLocation=\"http://www.springframework.org/schema/beans\r\nhttp://www.springframework.org/schema/beans/spring-beans.xsd \r\nhttp://www.springframework.org/schema/integration http://www.springframework.org/schema/integration/spring-integration.xsd \r\nhttp://www.springframework.org/schema/task http://www.springframework.org/schema/task/spring-task.xsd \r\nhttp://www.springframework.org/schema/context http://www.springframework.org/schema/context/spring-context.xsd\">\r\n\r\n\t<int:chain input-channel=\"requestConsumerChannel\" output-channel=\"requestSenderChannel\">\r\n\t\t<int:transformer ref=\"cartTransformer\" method=\"prepareNativeRequest\"/>\r\n\t\t<int:transformer ref=\"cartTransformer\" method=\"prepareNativeSource\"/>\r\n\t</int:chain>\r\n\t\r\n\t<int:chain input-channel=\"responseConsumerChannel\" output-channel=\"responseSenderChannel\">\r\n\t<int:transformer ref=\"cartTransformer\" method=\"parseNativeResponse\"/>\r\n\t\t<int:transformer ref=\"cartTransformer\" method=\"prepareImfResponse\"/>\r\n\t</int:chain>\r\n\t\r\n\t\r\n\t\r\n</beans>",
  //           "version": 1,
  //           "packagingType": "SYSTEM"
  //         }
  //       ]
  //     },
  //     "configurationId": 1261,
  //     "configurationVersion": 0,
  //     "imfId": {
  //       "id": 29,
  //       "name": "IMF Structure 86",
  //       "version": 86
  //     },
  //     "beanTabDisable": true
  //   },
  //   "firstChange": true
  // };
   

  //   expect(component.adapterData.networkData)
  //   expect(component.tabValue.emit(1)).toEqual();
  //   expect(component.saveData).toEqual(true);
  // });

  // it('function should call next draft schema', () => {
  //   component.draftAndNextSchema();
  //   const networkData={
  //       "connections": [],
  //       "strategyConnections": {
  //         "strategyConnections": null,
  //         "stationGroupStrategy": null,
  //         "custumStrategy": null
  //       },
  //       "alternateConnection": null,
  //       persistRequired : "0",
  //   };
  //   expect(component.adapterData.networkData).toBeTruthy;
  // });


  // it('should clear search value', () => {
  //   const storeSpy = spyOn(mockStore, 'dispatch').and.callThrough();
  //   component.draftSchema();
  //   fixture.detectChanges();
  //   expect(storeSpy).toHaveBeenCalledTimes(1);
  // });

  afterEach(() => {
    fixture.destroy();
  });
});
