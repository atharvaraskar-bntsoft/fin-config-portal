

import { AdapterTemplateComponent } from './adapter-template.component';
import { EventEmitter } from '@angular/core';
import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { L1AdapterService } from '@app/services/l1-adapter.service';
import { IAppState } from '@app/store/state/app.state';
import { MemoizedSelector, StoreModule } from '@ngrx/store';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { Observable, of } from 'rxjs';
import { selectViewSettingsList } from '@app/store/selectors/view-settings.selector';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { NzTabsModule } from 'ng-zorro-antd/tabs';
import { selectDownloadTemplate, selectL1AdapterById, selectUploadTemplate, selctNameValidation } from '../../../store/selectors/l1-adapter.selectors';
import { AlertService } from '@app/services/alert.service';
import { SnotifyService, ToastDefaults } from 'ng-snotify';
import { NgSelectModule } from '@ng-select/ng-select';
import { NzModalService } from 'ng-zorro-antd/modal';
import { SharedModule } from '@app/shared/shared.module';
import { CommonModule } from '@angular/common';
class translateServiceMock {
  public onLangChange: EventEmitter<any> = new EventEmitter();
  public onTranslationChange: EventEmitter<any> = new EventEmitter();
  public onDefaultLangChange: EventEmitter<any> = new EventEmitter();
  public get(key: any): any {
    return of(key);
  }
}
const viewsettingJSON =
  { status: "success", message: "Find all Setting", data: { "pagination": ["20", "25", "30", "40", "50"], "language": ["en_EN", "en_EN1", "fr_FR", "en_INV"], "settingDto": { "id": 1, "systemUserId": "SystemUser [firstName=Bnt, lastName=Admin,  email=bnt.admin@bnt.com, systemUserCategory=, password=9AHRz1ElALzTEdFKIKywyzEZh0IcZ/INhbGkbc0Qb84=, passwordLastUpdatedOn=2020-07-02 13:09:08.0, locked=0, deleted=0, lockedReason=null]", "search": "contain", "language": "en_EN1", "pagination": "20" }, "searchOption": ["contain", "contain2"] } }

const adapterTemplateToolkitListJson =
{
  status: "success",
  message: "Find AdaterToolkit-Template-List ",
  data: [
    {
      "id": 47,
      "value": "ISO8583-v1987 (ASCII)",
      "description": null,
      "modifiable": "0",
      "active": "1",
      "lookupType": {
        "id": 4,
        "name": "Message_Standard",
        "description": "Message Standard",
        "modifiable": "0"
      }
    },
    {
      "id": 44,
      "value": "ISO8583-v1987 (BINARY)",
      "description": null,
      "modifiable": "0",
      "active": "1",
      "lookupType": {
        "id": 4,
        "name": "Message_Standard",
        "description": "Message Standard",
        "modifiable": "0"
      }
    },
    {
      "id": 48,
      "value": "ISO8583-v1993 (ASCII)",
      "description": null,
      "modifiable": "0",
      "active": "1",
      "lookupType": {
        "id": 4,
        "name": "Message_Standard",
        "description": "Message Standard",
        "modifiable": "0"
      }
    },
    {
      "id": 45,
      "value": "ISO8583-v1993 (BINARY)",
      "description": null,
      "modifiable": "0",
      "active": "1",
      "lookupType": {
        "id": 4,
        "name": "Message_Standard",
        "description": "Message Standard",
        "modifiable": "0"
      }
    },
    {
      "id": 46,
      "value": "ISO8583-v2003 (BINARY)",
      "description": null,
      "modifiable": "0",
      "active": "1",
      "lookupType": {
        "id": 4,
        "name": "Message_Standard",
        "description": "Message Standard",
        "modifiable": "0"
      }
    },
    {
      "id": 57,
      "value": "SOAP",
      "description": "SOAP",
      "modifiable": "0",
      "active": "1",
      "lookupType": {
        "id": 4,
        "name": "Message_Standard",
        "description": "Message Standard",
        "modifiable": "0"
      }
    },
    {
      "id": -1,
      "value": "JSON",
      "description": "JSON",
      "modifiable": "0",
      "active": "1",
      "lookupType": {
        "id": 4,
        "name": "Message_Standard",
        "description": "Message Standard",
        "modifiable": "0"
      }
    },
    {
      "id": -3,
      "value": "HTTP-URLENCODED",
      "description": "HTTP-URLENCODED",
      "modifiable": "0",
      "active": "1",
      "lookupType": {
        "id": 4,
        "name": "Message_Standard",
        "description": "Message Standard",
        "modifiable": "0"
      }
    },
    {
      "id": 189,
      "value": "XML-OVER-HTTP",
      "description": "XML-OVER-HTTP",
      "modifiable": "0",
      "active": "1",
      "lookupType": {
        "id": 4,
        "name": "Message_Standard",
        "description": "Message Standard",
        "modifiable": "0"
      }
    }
  ]
}
const l1AdapterByIdJson = {
  status: 'success',
  message: 'Find Adaptor',
  data: {
    masterData: {
      adapterDto: {
        id: 122,
        type: 'L1',
        standardMessageSpecification: {
          id: 7,
          messageStandard: {
            id: -1,
            value: 'JSON',
            description: 'JSON',
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
            id: 26,
            value: 'JSON',
            description: 'JSON',
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
        name: 'TestJson_17Aug',
        adapterId: 'testjson_17aug',
        active: '1',
        guid: null,
      },
    },
    schemaData: {
      persistRequired: '0',
      schema: '',
      messageSchemaPackager: '',
    },
    networkData: {
      persistRequired: '0',
      properties: null,
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
            id: 'header[L1_MESSAGE_TYPE_INDICATOR]',
            name: 'apiName',
            possibleValue: ['api'],
            parentField: null,
          },
        ],
        apiFields: [
          {
            apiName: 'api',
            apiurl: '/api',
            isMutliResponse: null,
            incomingFields: [
              {
                id: 'type',
                name: 'type',
                possibleValue: null,
                parentField: null,
              },
            ],
            apiConditionalPackgerFields: null,
            outGoingFields: [
              {
                id: 'type',
                name: 'type',
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
          fileContent: '',
          version: 1,
          packagingType: 'SYSTEM',
        },
      ],
    },
    configurationId: 1077,
    configurationVersion: 0,
    imfId: {
      id: 20,
      name: 'IMF Structure 78',
      version: 78,
    },
    beanTabDisable: true,
  },
};
const selectUploadTemplateJson =
{
  status: "success", message: "Upload Completed Successfully", data: { "masterData": { "adapterDto": { "id": 106, "type": "L1", "standardMessageSpecification": { "id": 4, "messageStandard": { "id": 45, "value": "ISO8583-v1993 (BINARY)", "description": null, "modifiable": "0", "active": null, "lookupType": { "id": 4, "name": "Message_Standard", "description": "Message Standard", "modifiable": "0" } }, "messageProtocol": { "id": 24, "value": "ISO-8583", "description": "ISO 8583", "modifiable": "0", "active": null, "lookupType": { "id": 5, "name": "Message_Protocol", "description": "Message Protocol", "modifiable": "0" } }, "transmissionProtocol": { "id": 28, "value": "TCP", "description": "TCP", "modifiable": "0", "active": null, "lookupType": { "id": 6, "name": "Transmission_Protocol", "description": "Transmission Protocol", "modifiable": "0" } } }, "name": "jgkhkdsf", "adapterId": "jgkhkdsf", "active": "1", "guid": null } }, "schemaData": { "persistRequired": "0", "schema": "{\"template\":{\"field\":[{\"length\":\"4\",\"name\":\"Message Type Indicator\",\"id\":\"0\",\"class\":\"org.jpos.iso.IFA_NUMERIC\"},{\"length\":\"16\",\"name\":\"Bitmap\",\"id\":\"1\",\"class\":\"org.jpos.iso.IFA_BITMAP\"},{\"length\":\"19\",\"name\":\"Primary Account number\",\"id\":\"2\",\"class\":\"org.jpos.iso.IFA_LLNUM\"},{\"length\":\"6\",\"name\":\"Processing Code\",\"id\":\"3\",\"class\":\"org.jpos.iso.IFA_NUMERIC\"},{\"length\":\"12\",\"name\":\"Amount, Transaction\",\"id\":\"4\",\"class\":\"org.jpos.iso.IFA_NUMERIC\"},{\"length\":\"12\",\"name\":\"Amount, Reconciliation\",\"id\":\"5\",\"class\":\"org.jpos.iso.IFA_NUMERIC\"},{\"length\":\"12\",\"name\":\"Amount, Cardholder billing\",\"id\":\"6\",\"class\":\"org.jpos.iso.IFA_NUMERIC\"},{\"length\":\"10\",\"name\":\"Date and time, transmission\",\"id\":\"7\",\"class\":\"org.jpos.iso.IFA_NUMERIC\"},{\"length\":\"8\",\"name\":\"Amount, Cardholder billing fee\",\"id\":\"8\",\"class\":\"org.jpos.iso.IFA_NUMERIC\"},{\"length\":\"8\",\"name\":\"Conversion rate, Reconciliation\",\"id\":\"9\",\"class\":\"org.jpos.iso.IFA_NUMERIC\"},{\"length\":\"8\",\"name\":\"Conversion rate, Cardholder billing\",\"id\":\"10\",\"class\":\"org.jpos.iso.IFA_NUMERIC\"},{\"length\":\"6\",\"name\":\"Systems trace audit number\",\"id\":\"11\",\"class\":\"org.jpos.iso.IFA_NUMERIC\"},{\"length\":\"12\",\"name\":\"Date and time, Local transaction\",\"id\":\"12\",\"class\":\"org.jpos.iso.IFA_NUMERIC\"},{\"length\":\"4\",\"name\":\"Date, Effective\",\"id\":\"13\",\"class\":\"org.jpos.iso.IFA_NUMERIC\"},{\"length\":\"4\",\"name\":\"Date, Expiration\",\"id\":\"14\",\"class\":\"org.jpos.iso.IFA_NUMERIC\"},{\"length\":\"6\",\"name\":\"Date, Settlement\",\"id\":\"15\",\"class\":\"org.jpos.iso.IFA_NUMERIC\"},{\"length\":\"4\",\"name\":\"Date, Conversion\",\"id\":\"16\",\"class\":\"org.jpos.iso.IFA_NUMERIC\"},{\"length\":\"4\",\"name\":\"Date, Capture\",\"id\":\"17\",\"class\":\"org.jpos.iso.IFA_NUMERIC\"},{\"length\":\"4\",\"name\":\"Merchant type\",\"id\":\"18\",\"class\":\"org.jpos.iso.IFA_NUMERIC\"},{\"length\":\"3\",\"name\":\"Country code, Acquiring institution\",\"id\":\"19\",\"class\":\"org.jpos.iso.IFA_NUMERIC\"},{\"length\":\"3\",\"name\":\"Country code, Primary account number\",\"id\":\"20\",\"class\":\"org.jpos.iso.IFA_NUMERIC\"},{\"length\":\"3\",\"name\":\"Country code, Forwarding institution\",\"id\":\"21\",\"class\":\"org.jpos.iso.IFA_NUMERIC\"},{\"length\":\"12\",\"name\":\"Point of service data code\",\"id\":\"22\",\"class\":\"org.jpos.iso.IF_CHAR\"},{\"length\":\"3\",\"name\":\"Card sequence number\",\"id\":\"23\",\"class\":\"org.jpos.iso.IFA_NUMERIC\"},{\"length\":\"3\",\"name\":\"Function code\",\"id\":\"24\",\"class\":\"org.jpos.iso.IFA_NUMERIC\"},{\"length\":\"4\",\"name\":\"Message reason code\",\"id\":\"25\",\"class\":\"org.jpos.iso.IFA_NUMERIC\"},{\"length\":\"4\",\"name\":\"Card acceptor business code\",\"id\":\"26\",\"class\":\"org.jpos.iso.IFA_NUMERIC\"},{\"length\":\"1\",\"name\":\"Approval code length\",\"id\":\"27\",\"class\":\"org.jpos.iso.IFA_NUMERIC\"},{\"length\":\"6\",\"name\":\"Date, Reconciliation\",\"id\":\"28\",\"class\":\"org.jpos.iso.IFA_NUMERIC\"},{\"length\":\"3\",\"name\":\"Reconciliation indicator\",\"id\":\"29\",\"class\":\"org.jpos.iso.IFA_NUMERIC\"},{\"length\":\"24\",\"name\":\"Amounts, original\",\"id\":\"30\",\"class\":\"org.jpos.iso.IFA_NUMERIC\"},{\"length\":\"99\",\"name\":\"Acquirer reference data\",\"id\":\"31\",\"class\":\"org.jpos.iso.IFA_LLCHAR\"},{\"length\":\"11\",\"name\":\"Acquirer institution identification code\",\"id\":\"32\",\"class\":\"org.jpos.iso.IFA_LLNUM\"},{\"length\":\"11\",\"name\":\"Forwarding institution identification code\",\"id\":\"33\",\"class\":\"org.jpos.iso.IFA_LLNUM\"},{\"length\":\"28\",\"name\":\"Primary account number, extended\",\"id\":\"34\",\"class\":\"org.jpos.iso.IFA_LLCHAR\"},{\"length\":\"37\",\"name\":\"Track 2 data\",\"id\":\"35\",\"class\":\"org.jpos.iso.IFA_LLCHAR\"},{\"length\":\"104\",\"name\":\"Track 3 data\",\"id\":\"36\",\"class\":\"org.jpos.iso.IFA_LLLCHAR\"},{\"length\":\"12\",\"name\":\"Retrieval reference number\",\"id\":\"37\",\"class\":\"org.jpos.iso.IF_CHAR\"},{\"length\":\"6\",\"name\":\"Approval code\",\"id\":\"38\",\"class\":\"org.jpos.iso.IF_CHAR\"},{\"length\":\"3\",\"name\":\"Action code\",\"id\":\"39\",\"class\":\"org.jpos.iso.IFA_NUMERIC\"},{\"length\":\"3\",\"name\":\"Service code\",\"id\":\"40\",\"class\":\"org.jpos.iso.IFA_NUMERIC\"},{\"length\":\"8\",\"name\":\"Card acceptor terminal identification\",\"id\":\"41\",\"class\":\"org.jpos.iso.IF_CHAR\"},{\"length\":\"15\",\"name\":\"Card acceptor identification code\",\"id\":\"42\",\"class\":\"org.jpos.iso.IF_CHAR\"},{\"length\":\"99\",\"name\":\"Card acceptor name/location\",\"id\":\"43\",\"class\":\"org.jpos.iso.IFA_LLCHAR\"},{\"length\":\"99\",\"name\":\"Additional response data\",\"id\":\"44\",\"class\":\"org.jpos.iso.IFA_LLCHAR\"},{\"length\":\"76\",\"name\":\"Track 1 data\",\"id\":\"45\",\"class\":\"org.jpos.iso.IFA_LLCHAR\"},{\"length\":\"204\",\"name\":\"Amounts, Fees\",\"id\":\"46\",\"class\":\"org.jpos.iso.IFA_LLLCHAR\"},{\"length\":\"999\",\"name\":\"Additional data - national\",\"id\":\"47\",\"class\":\"org.jpos.iso.IFA_LLLCHAR\"},{\"length\":\"999\",\"name\":\"Additional data - private\",\"id\":\"48\",\"class\":\"org.jpos.iso.IFA_LLLCHAR\"},{\"length\":\"3\",\"name\":\"Currency code, Transaction\",\"id\":\"49\",\"class\":\"org.jpos.iso.IF_CHAR\"},{\"length\":\"3\",\"name\":\"Currency code, Reconciliation\",\"id\":\"50\",\"class\":\"org.jpos.iso.IF_CHAR\"},{\"length\":\"3\",\"name\":\"Currency code, Cardholder billing\",\"id\":\"51\",\"class\":\"org.jpos.iso.IF_CHAR\"},{\"length\":\"8\",\"name\":\"Personal identification number [PIN] data\",\"id\":\"52\",\"class\":\"org.jpos.iso.IFA_BINARY\"},{\"length\":\"48\",\"name\":\"Security related control information\",\"id\":\"53\",\"class\":\"org.jpos.iso.IFA_LLBINARY\"},{\"length\":\"120\",\"name\":\"Amounts, additional\",\"id\":\"54\",\"class\":\"org.jpos.iso.IFA_LLLCHAR\"},{\"length\":\"255\",\"name\":\"IC card system related data\",\"id\":\"55\",\"class\":\"org.jpos.iso.IFA_LLLBINARY\"},{\"length\":\"35\",\"name\":\"Original data elements\",\"id\":\"56\",\"class\":\"org.jpos.iso.IFA_LLNUM\"},{\"length\":\"3\",\"name\":\"Authorization life cycle code\",\"id\":\"57\",\"class\":\"org.jpos.iso.IFA_NUMERIC\"},{\"length\":\"11\",\"name\":\"Authorizing agent institution Id Code\",\"id\":\"58\",\"class\":\"org.jpos.iso.IFA_LLNUM\"},{\"length\":\"999\",\"name\":\"Transport data\",\"id\":\"59\",\"class\":\"org.jpos.iso.IFA_LLLCHAR\"},{\"length\":\"999\",\"name\":\"Reserved for national use\",\"id\":\"60\",\"class\":\"org.jpos.iso.IFA_LLLCHAR\"},{\"length\":\"999\",\"name\":\"Reserved for national use\",\"id\":\"61\",\"class\":\"org.jpos.iso.IFA_LLLCHAR\"},{\"length\":\"999\",\"name\":\"Reserved for private use\",\"id\":\"62\",\"class\":\"org.jpos.iso.IFA_LLLCHAR\"},{\"length\":\"999\",\"name\":\"Reserved for private use\",\"id\":\"63\",\"class\":\"org.jpos.iso.IFA_LLLCHAR\"},{\"length\":\"8\",\"name\":\"Message authentication code field\",\"id\":\"64\",\"class\":\"org.jpos.iso.IFA_BINARY\"},{\"length\":\"8\",\"name\":\"Reserved for ISO use\",\"id\":\"65\",\"class\":\"org.jpos.iso.IFA_BINARY\"},{\"length\":\"204\",\"name\":\"Amounts, original fees\",\"id\":\"66\",\"class\":\"org.jpos.iso.IFA_LLLCHAR\"},{\"length\":\"2\",\"name\":\"Extended payment data\",\"id\":\"67\",\"class\":\"org.jpos.iso.IFA_NUMERIC\"},{\"length\":\"3\",\"name\":\"Country code, receiving institution\",\"id\":\"68\",\"class\":\"org.jpos.iso.IFA_NUMERIC\"},{\"length\":\"3\",\"name\":\"Country code, settlement institution\",\"id\":\"69\",\"class\":\"org.jpos.iso.IFA_NUMERIC\"},{\"length\":\"3\",\"name\":\"Country code, authorizing agent Inst.\",\"id\":\"70\",\"class\":\"org.jpos.iso.IFA_NUMERIC\"},{\"length\":\"8\",\"name\":\"Message number\",\"id\":\"71\",\"class\":\"org.jpos.iso.IFA_NUMERIC\"},{\"length\":\"999\",\"name\":\"Data record\",\"id\":\"72\",\"class\":\"org.jpos.iso.IFA_LLLCHAR\"},{\"length\":\"6\",\"name\":\"Date, action\",\"id\":\"73\",\"class\":\"org.jpos.iso.IFA_NUMERIC\"},{\"length\":\"10\",\"name\":\"Credits, number\",\"id\":\"74\",\"class\":\"org.jpos.iso.IFA_NUMERIC\"},{\"length\":\"10\",\"name\":\"Credits, reversal number\",\"id\":\"75\",\"class\":\"org.jpos.iso.IFA_NUMERIC\"},{\"length\":\"10\",\"name\":\"Debits, number\",\"id\":\"76\",\"class\":\"org.jpos.iso.IFA_NUMERIC\"},{\"length\":\"10\",\"name\":\"Debits, reversal number\",\"id\":\"77\",\"class\":\"org.jpos.iso.IFA_NUMERIC\"},{\"length\":\"10\",\"name\":\"Transfer, number\",\"id\":\"78\",\"class\":\"org.jpos.iso.IFA_NUMERIC\"},{\"length\":\"10\",\"name\":\"Transfer, reversal number\",\"id\":\"79\",\"class\":\"org.jpos.iso.IFA_NUMERIC\"},{\"length\":\"10\",\"name\":\"Inquiries, number\",\"id\":\"80\",\"class\":\"org.jpos.iso.IFA_NUMERIC\"},{\"length\":\"10\",\"name\":\"Authorizations, number\",\"id\":\"81\",\"class\":\"org.jpos.iso.IFA_NUMERIC\"},{\"length\":\"10\",\"name\":\"Inquiries, reversal number\",\"id\":\"82\",\"class\":\"org.jpos.iso.IFA_NUMERIC\"},{\"length\":\"10\",\"name\":\"Payments, number\",\"id\":\"83\",\"class\":\"org.jpos.iso.IFA_NUMERIC\"},{\"length\":\"10\",\"name\":\"Payments, reversal number\",\"id\":\"84\",\"class\":\"org.jpos.iso.IFA_NUMERIC\"},{\"length\":\"10\",\"name\":\"Fee collections, number\",\"id\":\"85\",\"class\":\"org.jpos.iso.IFA_NUMERIC\"},{\"length\":\"16\",\"name\":\"Credits, amount\",\"id\":\"86\",\"class\":\"org.jpos.iso.IFA_NUMERIC\"},{\"length\":\"16\",\"name\":\"Credits, reversal amount\",\"id\":\"87\",\"class\":\"org.jpos.iso.IFA_NUMERIC\"},{\"length\":\"16\",\"name\":\"Debits, amount\",\"id\":\"88\",\"class\":\"org.jpos.iso.IFA_NUMERIC\"},{\"length\":\"16\",\"name\":\"Debits, reversal amount\",\"id\":\"89\",\"class\":\"org.jpos.iso.IFA_NUMERIC\"},{\"length\":\"10\",\"name\":\"Authorizations, reversal number\",\"id\":\"90\",\"class\":\"org.jpos.iso.IFA_NUMERIC\"},{\"length\":\"3\",\"name\":\"Country code, transaction Dest. Inst.\",\"id\":\"91\",\"class\":\"org.jpos.iso.IFA_NUMERIC\"},{\"length\":\"3\",\"name\":\"Country code, transaction Orig. Inst.\",\"id\":\"92\",\"class\":\"org.jpos.iso.IFA_NUMERIC\"},{\"length\":\"11\",\"name\":\"Transaction Dest. Inst. Id code\",\"id\":\"93\",\"class\":\"org.jpos.iso.IFA_LLNUM\"},{\"length\":\"11\",\"name\":\"Transaction Orig. Inst. Id code\",\"id\":\"94\",\"class\":\"org.jpos.iso.IFA_LLNUM\"},{\"length\":\"99\",\"name\":\"Card issuer reference data\",\"id\":\"95\",\"class\":\"org.jpos.iso.IFA_LLCHAR\"},{\"length\":\"999\",\"name\":\"Key management data\",\"id\":\"96\",\"class\":\"org.jpos.iso.IFA_LLLBINARY\"},{\"length\":\"17\",\"name\":\"Amount, Net reconciliation\",\"id\":\"97\",\"class\":\"org.jpos.iso.IFA_AMOUNT\"},{\"length\":\"25\",\"name\":\"Payee\",\"id\":\"98\",\"class\":\"org.jpos.iso.IF_CHAR\"},{\"length\":\"11\",\"name\":\"Settlement institution Id code\",\"id\":\"99\",\"class\":\"org.jpos.iso.IFA_LLCHAR\"},{\"length\":\"11\",\"name\":\"Receiving institution Id code\",\"id\":\"100\",\"class\":\"org.jpos.iso.IFA_LLNUM\"},{\"length\":\"17\",\"name\":\"File name\",\"id\":\"101\",\"class\":\"org.jpos.iso.IFA_LLCHAR\"},{\"length\":\"28\",\"name\":\"Account identification 1\",\"id\":\"102\",\"class\":\"org.jpos.iso.IFA_LLCHAR\"},{\"length\":\"28\",\"name\":\"Account identification 2\",\"id\":\"103\",\"class\":\"org.jpos.iso.IFA_LLCHAR\"},{\"length\":\"100\",\"name\":\"Transaction description\",\"id\":\"104\",\"class\":\"org.jpos.iso.IFA_LLLCHAR\"},{\"length\":\"16\",\"name\":\"Credits, Chargeback amount\",\"id\":\"105\",\"class\":\"org.jpos.iso.IFA_NUMERIC\"},{\"length\":\"16\",\"name\":\"Debits, Chargeback amount\",\"id\":\"106\",\"class\":\"org.jpos.iso.IFA_NUMERIC\"},{\"length\":\"10\",\"name\":\"Credits, Chargeback number\",\"id\":\"107\",\"class\":\"org.jpos.iso.IFA_NUMERIC\"},{\"length\":\"10\",\"name\":\"Debits, Chargeback number\",\"id\":\"108\",\"class\":\"org.jpos.iso.IFA_NUMERIC\"},{\"length\":\"84\",\"name\":\"Credits, Fee amounts\",\"id\":\"109\",\"class\":\"org.jpos.iso.IFA_LLCHAR\"},{\"length\":\"84\",\"name\":\"Debits, Fee amounts\",\"id\":\"110\",\"class\":\"org.jpos.iso.IFA_LLCHAR\"},{\"length\":\"999\",\"name\":\"Reserved for ISO use\",\"id\":\"111\",\"class\":\"org.jpos.iso.IFA_LLLCHAR\"},{\"length\":\"999\",\"name\":\"Reserved for ISO use\",\"id\":\"112\",\"class\":\"org.jpos.iso.IFA_LLLCHAR\"},{\"length\":\"999\",\"name\":\"Reserved for ISO use\",\"id\":\"113\",\"class\":\"org.jpos.iso.IFA_LLLCHAR\"},{\"length\":\"999\",\"name\":\"Reserved for ISO use\",\"id\":\"114\",\"class\":\"org.jpos.iso.IFA_LLLCHAR\"},{\"length\":\"999\",\"name\":\"Reserved for ISO use\",\"id\":\"115\",\"class\":\"org.jpos.iso.IFA_LLLCHAR\"},{\"length\":\"999\",\"name\":\"Reserved for national use\",\"id\":\"116\",\"class\":\"org.jpos.iso.IFA_LLLCHAR\"},{\"length\":\"999\",\"name\":\"Reserved for national use\",\"id\":\"117\",\"class\":\"org.jpos.iso.IFA_LLLCHAR\"},{\"length\":\"999\",\"name\":\"Reserved for national use\",\"id\":\"118\",\"class\":\"org.jpos.iso.IFA_LLLCHAR\"},{\"length\":\"999\",\"name\":\"Reserved for national use\",\"id\":\"119\",\"class\":\"org.jpos.iso.IFA_LLLCHAR\"},{\"length\":\"999\",\"name\":\"Reserved for national use\",\"id\":\"120\",\"class\":\"org.jpos.iso.IFA_LLLCHAR\"},{\"length\":\"999\",\"name\":\"Reserved for national use\",\"id\":\"121\",\"class\":\"org.jpos.iso.IFA_LLLCHAR\"},{\"length\":\"999\",\"name\":\"Reserved for national use\",\"id\":\"122\",\"class\":\"org.jpos.iso.IFA_LLLCHAR\"},{\"length\":\"999\",\"name\":\"Reserved for private use\",\"id\":\"123\",\"class\":\"org.jpos.iso.IFA_LLLCHAR\"},{\"length\":\"999\",\"name\":\"Reserved for private use\",\"id\":\"124\",\"class\":\"org.jpos.iso.IFA_LLLCHAR\"},{\"length\":\"999\",\"name\":\"Reserved for private use\",\"id\":\"125\",\"class\":\"org.jpos.iso.IFA_LLLCHAR\"},{\"length\":\"999\",\"name\":\"Reserved for private use\",\"id\":\"126\",\"class\":\"org.jpos.iso.IFA_LLLCHAR\"},{\"length\":\"999\",\"name\":\"Reserved for private use\",\"id\":\"127\",\"class\":\"org.jpos.iso.IFA_LLLCHAR\"},{\"length\":\"8\",\"name\":\"Message authentication code field\",\"id\":\"128\",\"class\":\"org.jpos.iso.IFA_BINARY\"}]}}", "messageSchemaPackager": "<?xml version=\"1.0\" encoding=\"UTF-8\" standalone=\"no\"?>\r\n<!DOCTYPE isopackager SYSTEM \"genericpackager.dtd\">\r\n<isopackager>\r\n  <isofield\r\n      id=\"0\"\r\n      length=\"4\"\r\n      name=\"Message Type Indicator\"\r\n      class=\"org.jpos.iso.IFA_NUMERIC\"/>\r\n  <isofield\r\n      id=\"1\"\r\n      length=\"16\"\r\n      name=\"Bitmap\"\r\n      class=\"org.jpos.iso.IFA_BITMAP\"/>\r\n  <isofield\r\n      id=\"2\"\r\n      length=\"19\"\r\n      name=\"Primary Account number\"\r\n      class=\"org.jpos.iso.IFA_LLNUM\"/>\r\n  <isofield\r\n      id=\"3\"\r\n      length=\"6\"\r\n      name=\"Processing Code\"\r\n      class=\"org.jpos.iso.IFA_NUMERIC\"/>\r\n  <isofield\r\n      id=\"4\"\r\n      length=\"12\"\r\n      name=\"Amount, Transaction\"\r\n      class=\"org.jpos.iso.IFA_NUMERIC\"/>\r\n  <isofield\r\n      id=\"5\"\r\n      length=\"12\"\r\n      name=\"Amount, Reconciliation\"\r\n      class=\"org.jpos.iso.IFA_NUMERIC\"/>\r\n  <isofield\r\n      id=\"6\"\r\n      length=\"12\"\r\n      name=\"Amount, Cardholder billing\"\r\n      class=\"org.jpos.iso.IFA_NUMERIC\"/>\r\n  <isofield\r\n      id=\"7\"\r\n      length=\"10\"\r\n      name=\"Date and time, transmission\"\r\n      class=\"org.jpos.iso.IFA_NUMERIC\"/>\r\n  <isofield\r\n      id=\"8\"\r\n      length=\"8\"\r\n      name=\"Amount, Cardholder billing fee\"\r\n      class=\"org.jpos.iso.IFA_NUMERIC\"/>\r\n  <isofield\r\n      id=\"9\"\r\n      length=\"8\"\r\n      name=\"Conversion rate, Reconciliation\"\r\n      class=\"org.jpos.iso.IFA_NUMERIC\"/>\r\n  <isofield\r\n      id=\"10\"\r\n      length=\"8\"\r\n      name=\"Conversion rate, Cardholder billing\"\r\n      class=\"org.jpos.iso.IFA_NUMERIC\"/>\r\n  <isofield\r\n      id=\"11\"\r\n      length=\"6\"\r\n      name=\"Systems trace audit number\"\r\n      class=\"org.jpos.iso.IFA_NUMERIC\"/>\r\n  <isofield\r\n      id=\"12\"\r\n      length=\"12\"\r\n      name=\"Date and time, Local transaction\"\r\n      class=\"org.jpos.iso.IFA_NUMERIC\"/>\r\n  <isofield\r\n      id=\"13\"\r\n      length=\"4\"\r\n      name=\"Date, Effective\"\r\n      class=\"org.jpos.iso.IFA_NUMERIC\"/>\r\n  <isofield\r\n      id=\"14\"\r\n      length=\"4\"\r\n      name=\"Date, Expiration\"\r\n      class=\"org.jpos.iso.IFA_NUMERIC\"/>\r\n  <isofield\r\n      id=\"15\"\r\n      length=\"6\"\r\n      name=\"Date, Settlement\"\r\n      class=\"org.jpos.iso.IFA_NUMERIC\"/>\r\n  <isofield\r\n      id=\"16\"\r\n      length=\"4\"\r\n      name=\"Date, Conversion\"\r\n      class=\"org.jpos.iso.IFA_NUMERIC\"/>\r\n  <isofield\r\n      id=\"17\"\r\n      length=\"4\"\r\n      name=\"Date, Capture\"\r\n      class=\"org.jpos.iso.IFA_NUMERIC\"/>\r\n  <isofield\r\n      id=\"18\"\r\n      length=\"4\"\r\n      name=\"Merchant type\"\r\n      class=\"org.jpos.iso.IFA_NUMERIC\"/>\r\n  <isofield\r\n      id=\"19\"\r\n      length=\"3\"\r\n      name=\"Country code, Acquiring institution\"\r\n      class=\"org.jpos.iso.IFA_NUMERIC\"/>\r\n  <isofield\r\n      id=\"20\"\r\n      length=\"3\"\r\n      name=\"Country code, Primary account number\"\r\n      class=\"org.jpos.iso.IFA_NUMERIC\"/>\r\n  <isofield\r\n      id=\"21\"\r\n      length=\"3\"\r\n      name=\"Country code, Forwarding institution\"\r\n      class=\"org.jpos.iso.IFA_NUMERIC\"/>\r\n  <isofield\r\n      id=\"22\"\r\n      length=\"12\"\r\n      name=\"Point of service data code\"\r\n      class=\"org.jpos.iso.IF_CHAR\"/>\r\n  <isofield\r\n      id=\"23\"\r\n      length=\"3\"\r\n      name=\"Card sequence number\"\r\n      class=\"org.jpos.iso.IFA_NUMERIC\"/>\r\n  <isofield\r\n      id=\"24\"\r\n      length=\"3\"\r\n      name=\"Function code\"\r\n      class=\"org.jpos.iso.IFA_NUMERIC\"/>\r\n  <isofield\r\n      id=\"25\"\r\n      length=\"4\"\r\n      name=\"Message reason code\"\r\n      class=\"org.jpos.iso.IFA_NUMERIC\"/>\r\n  <isofield\r\n      id=\"26\"\r\n      length=\"4\"\r\n      name=\"Card acceptor business code\"\r\n      class=\"org.jpos.iso.IFA_NUMERIC\"/>\r\n  <isofield\r\n      id=\"27\"\r\n      length=\"1\"\r\n      name=\"Approval code length\"\r\n      class=\"org.jpos.iso.IFA_NUMERIC\"/>\r\n  <isofield\r\n      id=\"28\"\r\n      length=\"6\"\r\n      name=\"Date, Reconciliation\"\r\n      class=\"org.jpos.iso.IFA_NUMERIC\"/>\r\n  <isofield\r\n      id=\"29\"\r\n      length=\"3\"\r\n      name=\"Reconciliation indicator\"\r\n      class=\"org.jpos.iso.IFA_NUMERIC\"/>\r\n  <isofield\r\n      id=\"30\"\r\n      length=\"24\"\r\n      name=\"Amounts, original\"\r\n      class=\"org.jpos.iso.IFA_NUMERIC\"/>\r\n  <isofield\r\n      id=\"31\"\r\n      length=\"99\"\r\n      name=\"Acquirer reference data\"\r\n      class=\"org.jpos.iso.IFA_LLCHAR\"/>\r\n  <isofield\r\n      id=\"32\"\r\n      length=\"11\"\r\n      name=\"Acquirer institution identification code\"\r\n      class=\"org.jpos.iso.IFA_LLNUM\"/>\r\n  <isofield\r\n      id=\"33\"\r\n      length=\"11\"\r\n      name=\"Forwarding institution identification code\"\r\n      class=\"org.jpos.iso.IFA_LLNUM\"/>\r\n  <isofield\r\n      id=\"34\"\r\n      length=\"28\"\r\n      name=\"Primary account number, extended\"\r\n      class=\"org.jpos.iso.IFA_LLCHAR\"/>\r\n  <isofield\r\n      id=\"35\"\r\n      length=\"37\"\r\n      name=\"Track 2 data\"\r\n      class=\"org.jpos.iso.IFA_LLCHAR\"/>\r\n  <isofield\r\n      id=\"36\"\r\n      length=\"104\"\r\n      name=\"Track 3 data\"\r\n      class=\"org.jpos.iso.IFA_LLLCHAR\"/>\r\n  <isofield\r\n      id=\"37\"\r\n      length=\"12\"\r\n      name=\"Retrieval reference number\"\r\n      class=\"org.jpos.iso.IF_CHAR\"/>\r\n  <isofield\r\n      id=\"38\"\r\n      length=\"6\"\r\n      name=\"Approval code\"\r\n      class=\"org.jpos.iso.IF_CHAR\"/>\r\n  <isofield\r\n      id=\"39\"\r\n      length=\"3\"\r\n      name=\"Action code\"\r\n      class=\"org.jpos.iso.IFA_NUMERIC\"/>\r\n  <isofield\r\n      id=\"40\"\r\n      length=\"3\"\r\n      name=\"Service code\"\r\n      class=\"org.jpos.iso.IFA_NUMERIC\"/>\r\n  <isofield\r\n      id=\"41\"\r\n      length=\"8\"\r\n      name=\"Card acceptor terminal identification\"\r\n      class=\"org.jpos.iso.IF_CHAR\"/>\r\n  <isofield\r\n      id=\"42\"\r\n      length=\"15\"\r\n      name=\"Card acceptor identification code\"\r\n      class=\"org.jpos.iso.IF_CHAR\"/>\r\n  <isofield\r\n      id=\"43\"\r\n      length=\"99\"\r\n      name=\"Card acceptor name/location\"\r\n      class=\"org.jpos.iso.IFA_LLCHAR\"/>\r\n  <isofield\r\n      id=\"44\"\r\n      length=\"99\"\r\n      name=\"Additional response data\"\r\n      class=\"org.jpos.iso.IFA_LLCHAR\"/>\r\n  <isofield\r\n      id=\"45\"\r\n      length=\"76\"\r\n      name=\"Track 1 data\"\r\n      class=\"org.jpos.iso.IFA_LLCHAR\"/>\r\n  <isofield\r\n      id=\"46\"\r\n      length=\"204\"\r\n      name=\"Amounts, Fees\"\r\n      class=\"org.jpos.iso.IFA_LLLCHAR\"/>\r\n  <isofield\r\n      id=\"47\"\r\n      length=\"999\"\r\n      name=\"Additional data - national\"\r\n      class=\"org.jpos.iso.IFA_LLLCHAR\"/>\r\n  <isofield\r\n      id=\"48\"\r\n      length=\"999\"\r\n      name=\"Additional data - private\"\r\n      class=\"org.jpos.iso.IFA_LLLCHAR\"/>\r\n  <isofield\r\n      id=\"49\"\r\n      length=\"3\"\r\n      name=\"Currency code, Transaction\"\r\n      class=\"org.jpos.iso.IF_CHAR\"/>\r\n  <isofield\r\n      id=\"50\"\r\n      length=\"3\"\r\n      name=\"Currency code, Reconciliation\"\r\n      class=\"org.jpos.iso.IF_CHAR\"/>\r\n  <isofield\r\n      id=\"51\"\r\n      length=\"3\"\r\n      name=\"Currency code, Cardholder billing\"\r\n      class=\"org.jpos.iso.IF_CHAR\"/>\r\n  <isofield\r\n      id=\"52\"\r\n      length=\"8\"\r\n      name=\"Personal identification number [PIN] data\"\r\n      class=\"org.jpos.iso.IFA_BINARY\"/>\r\n  <isofield\r\n      id=\"53\"\r\n      length=\"48\"\r\n      name=\"Security related control information\"\r\n      class=\"org.jpos.iso.IFA_LLBINARY\"/>\r\n  <isofield\r\n      id=\"54\"\r\n      length=\"120\"\r\n      name=\"Amounts, additional\"\r\n      class=\"org.jpos.iso.IFA_LLLCHAR\"/>\r\n  <isofield\r\n      id=\"55\"\r\n      length=\"255\"\r\n      name=\"IC card system related data\"\r\n      class=\"org.jpos.iso.IFA_LLLBINARY\"/>\r\n  <isofield\r\n      id=\"56\"\r\n      length=\"35\"\r\n      name=\"Original data elements\"\r\n      class=\"org.jpos.iso.IFA_LLNUM\"/>\r\n  <isofield\r\n      id=\"57\"\r\n      length=\"3\"\r\n      name=\"Authorization life cycle code\"\r\n      class=\"org.jpos.iso.IFA_NUMERIC\"/>\r\n  <isofield\r\n      id=\"58\"\r\n      length=\"11\"\r\n      name=\"Authorizing agent institution Id Code\"\r\n      class=\"org.jpos.iso.IFA_LLNUM\"/>\r\n  <isofield\r\n      id=\"59\"\r\n      length=\"999\"\r\n      name=\"Transport data\"\r\n      class=\"org.jpos.iso.IFA_LLLCHAR\"/>\r\n  <isofield\r\n      id=\"60\"\r\n      length=\"999\"\r\n      name=\"Reserved for national use\"\r\n      class=\"org.jpos.iso.IFA_LLLCHAR\"/>\r\n  <isofield\r\n      id=\"61\"\r\n      length=\"999\"\r\n      name=\"Reserved for national use\"\r\n      class=\"org.jpos.iso.IFA_LLLCHAR\"/>\r\n  <isofield\r\n      id=\"62\"\r\n      length=\"999\"\r\n      name=\"Reserved for private use\"\r\n      class=\"org.jpos.iso.IFA_LLLCHAR\"/>\r\n  <isofield\r\n      id=\"63\"\r\n      length=\"999\"\r\n      name=\"Reserved for private use\"\r\n      class=\"org.jpos.iso.IFA_LLLCHAR\"/>\r\n  <isofield\r\n      id=\"64\"\r\n      length=\"8\"\r\n      name=\"Message authentication code field\"\r\n      class=\"org.jpos.iso.IFA_BINARY\"/>\r\n  <isofield\r\n      id=\"65\"\r\n      length=\"8\"\r\n      name=\"Reserved for ISO use\"\r\n      class=\"org.jpos.iso.IFA_BINARY\"/>\r\n  <isofield\r\n      id=\"66\"\r\n      length=\"204\"\r\n      name=\"Amounts, original fees\"\r\n      class=\"org.jpos.iso.IFA_LLLCHAR\"/>\r\n  <isofield\r\n      id=\"67\"\r\n      length=\"2\"\r\n      name=\"Extended payment data\"\r\n      class=\"org.jpos.iso.IFA_NUMERIC\"/>\r\n  <isofield\r\n      id=\"68\"\r\n      length=\"3\"\r\n      name=\"Country code, receiving institution\"\r\n      class=\"org.jpos.iso.IFA_NUMERIC\"/>\r\n  <isofield\r\n      id=\"69\"\r\n      length=\"3\"\r\n      name=\"Country code, settlement institution\"\r\n      class=\"org.jpos.iso.IFA_NUMERIC\"/>\r\n  <isofield\r\n      id=\"70\"\r\n      length=\"3\"\r\n      name=\"Country code, authorizing agent Inst.\"\r\n      class=\"org.jpos.iso.IFA_NUMERIC\"/>\r\n  <isofield\r\n      id=\"71\"\r\n      length=\"8\"\r\n      name=\"Message number\"\r\n      class=\"org.jpos.iso.IFA_NUMERIC\"/>\r\n  <isofield\r\n      id=\"72\"\r\n      length=\"999\"\r\n      name=\"Data record\"\r\n      class=\"org.jpos.iso.IFA_LLLCHAR\"/>\r\n  <isofield\r\n      id=\"73\"\r\n      length=\"6\"\r\n      name=\"Date, action\"\r\n      class=\"org.jpos.iso.IFA_NUMERIC\"/>\r\n  <isofield\r\n      id=\"74\"\r\n      length=\"10\"\r\n      name=\"Credits, number\"\r\n      class=\"org.jpos.iso.IFA_NUMERIC\"/>\r\n  <isofield\r\n      id=\"75\"\r\n      length=\"10\"\r\n      name=\"Credits, reversal number\"\r\n      class=\"org.jpos.iso.IFA_NUMERIC\"/>\r\n  <isofield\r\n      id=\"76\"\r\n      length=\"10\"\r\n      name=\"Debits, number\"\r\n      class=\"org.jpos.iso.IFA_NUMERIC\"/>\r\n  <isofield\r\n      id=\"77\"\r\n      length=\"10\"\r\n      name=\"Debits, reversal number\"\r\n      class=\"org.jpos.iso.IFA_NUMERIC\"/>\r\n  <isofield\r\n      id=\"78\"\r\n      length=\"10\"\r\n      name=\"Transfer, number\"\r\n      class=\"org.jpos.iso.IFA_NUMERIC\"/>\r\n  <isofield\r\n      id=\"79\"\r\n      length=\"10\"\r\n      name=\"Transfer, reversal number\"\r\n      class=\"org.jpos.iso.IFA_NUMERIC\"/>\r\n  <isofield\r\n      id=\"80\"\r\n      length=\"10\"\r\n      name=\"Inquiries, number\"\r\n      class=\"org.jpos.iso.IFA_NUMERIC\"/>\r\n  <isofield\r\n      id=\"81\"\r\n      length=\"10\"\r\n      name=\"Authorizations, number\"\r\n      class=\"org.jpos.iso.IFA_NUMERIC\"/>\r\n  <isofield\r\n      id=\"82\"\r\n      length=\"10\"\r\n      name=\"Inquiries, reversal number\"\r\n      class=\"org.jpos.iso.IFA_NUMERIC\"/>\r\n  <isofield\r\n      id=\"83\"\r\n      length=\"10\"\r\n      name=\"Payments, number\"\r\n      class=\"org.jpos.iso.IFA_NUMERIC\"/>\r\n  <isofield\r\n      id=\"84\"\r\n      length=\"10\"\r\n      name=\"Payments, reversal number\"\r\n      class=\"org.jpos.iso.IFA_NUMERIC\"/>\r\n  <isofield\r\n      id=\"85\"\r\n      length=\"10\"\r\n      name=\"Fee collections, number\"\r\n      class=\"org.jpos.iso.IFA_NUMERIC\"/>\r\n  <isofield\r\n      id=\"86\"\r\n      length=\"16\"\r\n      name=\"Credits, amount\"\r\n      class=\"org.jpos.iso.IFA_NUMERIC\"/>\r\n  <isofield\r\n      id=\"87\"\r\n      length=\"16\"\r\n      name=\"Credits, reversal amount\"\r\n      class=\"org.jpos.iso.IFA_NUMERIC\"/>\r\n  <isofield\r\n      id=\"88\"\r\n      length=\"16\"\r\n      name=\"Debits, amount\"\r\n      class=\"org.jpos.iso.IFA_NUMERIC\"/>\r\n  <isofield\r\n      id=\"89\"\r\n      length=\"16\"\r\n      name=\"Debits, reversal amount\"\r\n      class=\"org.jpos.iso.IFA_NUMERIC\"/>\r\n  <isofield\r\n      id=\"90\"\r\n      length=\"10\"\r\n      name=\"Authorizations, reversal number\"\r\n      class=\"org.jpos.iso.IFA_NUMERIC\"/>\r\n  <isofield\r\n      id=\"91\"\r\n      length=\"3\"\r\n      name=\"Country code, transaction Dest. Inst.\"\r\n      class=\"org.jpos.iso.IFA_NUMERIC\"/>\r\n  <isofield\r\n      id=\"92\"\r\n      length=\"3\"\r\n      name=\"Country code, transaction Orig. Inst.\"\r\n      class=\"org.jpos.iso.IFA_NUMERIC\"/>\r\n  <isofield\r\n      id=\"93\"\r\n      length=\"11\"\r\n      name=\"Transaction Dest. Inst. Id code\"\r\n      class=\"org.jpos.iso.IFA_LLNUM\"/>\r\n  <isofield\r\n      id=\"94\"\r\n      length=\"11\"\r\n      name=\"Transaction Orig. Inst. Id code\"\r\n      class=\"org.jpos.iso.IFA_LLNUM\"/>\r\n  <isofield\r\n      id=\"95\"\r\n      length=\"99\"\r\n      name=\"Card issuer reference data\"\r\n      class=\"org.jpos.iso.IFA_LLCHAR\"/>\r\n  <isofield\r\n      id=\"96\"\r\n      length=\"999\"\r\n      name=\"Key management data\"\r\n      class=\"org.jpos.iso.IFA_LLLBINARY\"/>\r\n  <isofield\r\n      id=\"97\"\r\n      length=\"17\"\r\n      name=\"Amount, Net reconciliation\"\r\n      class=\"org.jpos.iso.IFA_AMOUNT\"/>\r\n  <isofield\r\n      id=\"98\"\r\n      length=\"25\"\r\n      name=\"Payee\"\r\n      class=\"org.jpos.iso.IF_CHAR\"/>\r\n  <isofield\r\n      id=\"99\"\r\n      length=\"11\"\r\n      name=\"Settlement institution Id code\"\r\n      class=\"org.jpos.iso.IFA_LLCHAR\"/>\r\n  <isofield\r\n      id=\"100\"\r\n      length=\"11\"\r\n      name=\"Receiving institution Id code\"\r\n      class=\"org.jpos.iso.IFA_LLNUM\"/>\r\n  <isofield\r\n      id=\"101\"\r\n      length=\"17\"\r\n      name=\"File name\"\r\n      class=\"org.jpos.iso.IFA_LLCHAR\"/>\r\n  <isofield\r\n      id=\"102\"\r\n      length=\"28\"\r\n      name=\"Account identification 1\"\r\n      class=\"org.jpos.iso.IFA_LLCHAR\"/>\r\n  <isofield\r\n      id=\"103\"\r\n      length=\"28\"\r\n      name=\"Account identification 2\"\r\n      class=\"org.jpos.iso.IFA_LLCHAR\"/>\r\n  <isofield\r\n      id=\"104\"\r\n      length=\"100\"\r\n      name=\"Transaction description\"\r\n      class=\"org.jpos.iso.IFA_LLLCHAR\"/>\r\n  <isofield\r\n      id=\"105\"\r\n      length=\"16\"\r\n      name=\"Credits, Chargeback amount\"\r\n      class=\"org.jpos.iso.IFA_NUMERIC\"/>\r\n  <isofield\r\n      id=\"106\"\r\n      length=\"16\"\r\n      name=\"Debits, Chargeback amount\"\r\n      class=\"org.jpos.iso.IFA_NUMERIC\"/>\r\n  <isofield\r\n      id=\"107\"\r\n      length=\"10\"\r\n      name=\"Credits, Chargeback number\"\r\n      class=\"org.jpos.iso.IFA_NUMERIC\"/>\r\n  <isofield\r\n      id=\"108\"\r\n      length=\"10\"\r\n      name=\"Debits, Chargeback number\"\r\n      class=\"org.jpos.iso.IFA_NUMERIC\"/>\r\n  <isofield\r\n      id=\"109\"\r\n      length=\"84\"\r\n      name=\"Credits, Fee amounts\"\r\n      class=\"org.jpos.iso.IFA_LLCHAR\"/>\r\n  <isofield\r\n      id=\"110\"\r\n      length=\"84\"\r\n      name=\"Debits, Fee amounts\"\r\n      class=\"org.jpos.iso.IFA_LLCHAR\"/>\r\n  <isofield\r\n      id=\"111\"\r\n      length=\"999\"\r\n      name=\"Reserved for ISO use\"\r\n      class=\"org.jpos.iso.IFA_LLLCHAR\"/>\r\n  <isofield\r\n      id=\"112\"\r\n      length=\"999\"\r\n      name=\"Reserved for ISO use\"\r\n      class=\"org.jpos.iso.IFA_LLLCHAR\"/>\r\n  <isofield\r\n      id=\"113\"\r\n      length=\"999\"\r\n      name=\"Reserved for ISO use\"\r\n      class=\"org.jpos.iso.IFA_LLLCHAR\"/>\r\n  <isofield\r\n      id=\"114\"\r\n      length=\"999\"\r\n      name=\"Reserved for ISO use\"\r\n      class=\"org.jpos.iso.IFA_LLLCHAR\"/>\r\n  <isofield\r\n      id=\"115\"\r\n      length=\"999\"\r\n      name=\"Reserved for ISO use\"\r\n      class=\"org.jpos.iso.IFA_LLLCHAR\"/>\r\n  <isofield\r\n      id=\"116\"\r\n      length=\"999\"\r\n      name=\"Reserved for national use\"\r\n      class=\"org.jpos.iso.IFA_LLLCHAR\"/>\r\n  <isofield\r\n      id=\"117\"\r\n      length=\"999\"\r\n      name=\"Reserved for national use\"\r\n      class=\"org.jpos.iso.IFA_LLLCHAR\"/>\r\n  <isofield\r\n      id=\"118\"\r\n      length=\"999\"\r\n      name=\"Reserved for national use\"\r\n      class=\"org.jpos.iso.IFA_LLLCHAR\"/>\r\n  <isofield\r\n      id=\"119\"\r\n      length=\"999\"\r\n      name=\"Reserved for national use\"\r\n      class=\"org.jpos.iso.IFA_LLLCHAR\"/>\r\n  <isofield\r\n      id=\"120\"\r\n      length=\"999\"\r\n      name=\"Reserved for national use\"\r\n      class=\"org.jpos.iso.IFA_LLLCHAR\"/>\r\n  <isofield\r\n      id=\"121\"\r\n      length=\"999\"\r\n      name=\"Reserved for national use\"\r\n      class=\"org.jpos.iso.IFA_LLLCHAR\"/>\r\n  <isofield\r\n      id=\"122\"\r\n      length=\"999\"\r\n      name=\"Reserved for national use\"\r\n      class=\"org.jpos.iso.IFA_LLLCHAR\"/>\r\n  <isofield\r\n      id=\"123\"\r\n      length=\"999\"\r\n      name=\"Reserved for private use\"\r\n      class=\"org.jpos.iso.IFA_LLLCHAR\"/>\r\n  <isofield\r\n      id=\"124\"\r\n      length=\"999\"\r\n      name=\"Reserved for private use\"\r\n      class=\"org.jpos.iso.IFA_LLLCHAR\"/>\r\n  <isofield\r\n      id=\"125\"\r\n      length=\"999\"\r\n      name=\"Reserved for private use\"\r\n      class=\"org.jpos.iso.IFA_LLLCHAR\"/>\r\n  <isofield\r\n      id=\"126\"\r\n      length=\"999\"\r\n      name=\"Reserved for private use\"\r\n      class=\"org.jpos.iso.IFA_LLLCHAR\"/>\r\n  <isofield\r\n      id=\"127\"\r\n      length=\"999\"\r\n      name=\"Reserved for private use\"\r\n      class=\"org.jpos.iso.IFA_LLLCHAR\"/>\r\n  <isofield\r\n      id=\"128\"\r\n      length=\"8\"\r\n      name=\"Message authentication code field\"\r\n      class=\"org.jpos.iso.IFA_BINARY\"/>\r\n</isopackager>" }, "networkData": { "persistRequired": "0", "properties": null, "connectionManagement": null }, "transformData": { "persistRequired": "0", "requestMapping": null, "responseMapping": null, "imfLeg": null, "fieldSchemeImfMapperUiWrapper": [{ "fieldId": "2", "fieldName": "Field 2 Primary Account number", "requestImfExpression": null, "responseImfExpression": null, "responseImfLeg": null, "requestImfField": null, "responseImfField": null }, { "fieldId": "3", "fieldName": "Field 3 Processing Code", "requestImfExpression": null, "responseImfExpression": null, "responseImfLeg": null, "requestImfField": null, "responseImfField": null }, { "fieldId": "4", "fieldName": "Field 4 Amount, Transaction", "requestImfExpression": null, "responseImfExpression": null, "responseImfLeg": null, "requestImfField": null, "responseImfField": null }, { "fieldId": "5", "fieldName": "Field 5 Amount, Reconciliation", "requestImfExpression": null, "responseImfExpression": null, "responseImfLeg": null, "requestImfField": null, "responseImfField": null }, { "fieldId": "6", "fieldName": "Field 6 Amount, Cardholder billing", "requestImfExpression": null, "responseImfExpression": null, "responseImfLeg": null, "requestImfField": null, "responseImfField": null }, { "fieldId": "7", "fieldName": "Field 7 Date and time, transmission", "requestImfExpression": null, "responseImfExpression": null, "responseImfLeg": null, "requestImfField": null, "responseImfField": null }, { "fieldId": "8", "fieldName": "Field 8 Amount, Cardholder billing fee", "requestImfExpression": null, "responseImfExpression": null, "responseImfLeg": null, "requestImfField": null, "responseImfField": null }, { "fieldId": "9", "fieldName": "Field 9 Conversion rate, Reconciliation", "requestImfExpression": null, "responseImfExpression": null, "responseImfLeg": null, "requestImfField": null, "responseImfField": null }, { "fieldId": "10", "fieldName": "Field 10 Conversion rate, Cardholder billing", "requestImfExpression": null, "responseImfExpression": null, "responseImfLeg": null, "requestImfField": null, "responseImfField": null }, { "fieldId": "11", "fieldName": "Field 11 Systems trace audit number", "requestImfExpression": null, "responseImfExpression": null, "responseImfLeg": null, "requestImfField": null, "responseImfField": null }, { "fieldId": "12", "fieldName": "Field 12 Date and time, Local transaction", "requestImfExpression": null, "responseImfExpression": null, "responseImfLeg": null, "requestImfField": null, "responseImfField": null }, { "fieldId": "13", "fieldName": "Field 13 Date, Effective", "requestImfExpression": null, "responseImfExpression": null, "responseImfLeg": null, "requestImfField": null, "responseImfField": null }, { "fieldId": "14", "fieldName": "Field 14 Date, Expiration", "requestImfExpression": null, "responseImfExpression": null, "responseImfLeg": null, "requestImfField": null, "responseImfField": null }, { "fieldId": "15", "fieldName": "Field 15 Date, Settlement", "requestImfExpression": null, "responseImfExpression": null, "responseImfLeg": null, "requestImfField": null, "responseImfField": null }, { "fieldId": "16", "fieldName": "Field 16 Date, Conversion", "requestImfExpression": null, "responseImfExpression": null, "responseImfLeg": null, "requestImfField": null, "responseImfField": null }, { "fieldId": "17", "fieldName": "Field 17 Date, Capture", "requestImfExpression": null, "responseImfExpression": null, "responseImfLeg": null, "requestImfField": null, "responseImfField": null }, { "fieldId": "18", "fieldName": "Field 18 Merchant type", "requestImfExpression": null, "responseImfExpression": null, "responseImfLeg": null, "requestImfField": null, "responseImfField": null }, { "fieldId": "19", "fieldName": "Field 19 Country code, Acquiring institution", "requestImfExpression": null, "responseImfExpression": null, "responseImfLeg": null, "requestImfField": null, "responseImfField": null }, { "fieldId": "20", "fieldName": "Field 20 Country code, Primary account number", "requestImfExpression": null, "responseImfExpression": null, "responseImfLeg": null, "requestImfField": null, "responseImfField": null }, { "fieldId": "21", "fieldName": "Field 21 Country code, Forwarding institution", "requestImfExpression": null, "responseImfExpression": null, "responseImfLeg": null, "requestImfField": null, "responseImfField": null }, { "fieldId": "22", "fieldName": "Field 22 Point of service data code", "requestImfExpression": null, "responseImfExpression": null, "responseImfLeg": null, "requestImfField": null, "responseImfField": null }, { "fieldId": "23", "fieldName": "Field 23 Card sequence number", "requestImfExpression": null, "responseImfExpression": null, "responseImfLeg": null, "requestImfField": null, "responseImfField": null }, { "fieldId": "24", "fieldName": "Field 24 Function code", "requestImfExpression": null, "responseImfExpression": null, "responseImfLeg": null, "requestImfField": null, "responseImfField": null }, { "fieldId": "25", "fieldName": "Field 25 Message reason code", "requestImfExpression": null, "responseImfExpression": null, "responseImfLeg": null, "requestImfField": null, "responseImfField": null }, { "fieldId": "26", "fieldName": "Field 26 Card acceptor business code", "requestImfExpression": null, "responseImfExpression": null, "responseImfLeg": null, "requestImfField": null, "responseImfField": null }, { "fieldId": "27", "fieldName": "Field 27 Approval code length", "requestImfExpression": null, "responseImfExpression": null, "responseImfLeg": null, "requestImfField": null, "responseImfField": null }, { "fieldId": "28", "fieldName": "Field 28 Date, Reconciliation", "requestImfExpression": null, "responseImfExpression": null, "responseImfLeg": null, "requestImfField": null, "responseImfField": null }, { "fieldId": "29", "fieldName": "Field 29 Reconciliation indicator", "requestImfExpression": null, "responseImfExpression": null, "responseImfLeg": null, "requestImfField": null, "responseImfField": null }, { "fieldId": "30", "fieldName": "Field 30 Amounts, original", "requestImfExpression": null, "responseImfExpression": null, "responseImfLeg": null, "requestImfField": null, "responseImfField": null }, { "fieldId": "31", "fieldName": "Field 31 Acquirer reference data", "requestImfExpression": null, "responseImfExpression": null, "responseImfLeg": null, "requestImfField": null, "responseImfField": null }, { "fieldId": "32", "fieldName": "Field 32 Acquirer institution identification code", "requestImfExpression": null, "responseImfExpression": null, "responseImfLeg": null, "requestImfField": null, "responseImfField": null }, { "fieldId": "33", "fieldName": "Field 33 Forwarding institution identification code", "requestImfExpression": null, "responseImfExpression": null, "responseImfLeg": null, "requestImfField": null, "responseImfField": null }, { "fieldId": "34", "fieldName": "Field 34 Primary account number, extended", "requestImfExpression": null, "responseImfExpression": null, "responseImfLeg": null, "requestImfField": null, "responseImfField": null }, { "fieldId": "35", "fieldName": "Field 35 Track 2 data", "requestImfExpression": null, "responseImfExpression": null, "responseImfLeg": null, "requestImfField": null, "responseImfField": null }, { "fieldId": "36", "fieldName": "Field 36 Track 3 data", "requestImfExpression": null, "responseImfExpression": null, "responseImfLeg": null, "requestImfField": null, "responseImfField": null }, { "fieldId": "37", "fieldName": "Field 37 Retrieval reference number", "requestImfExpression": null, "responseImfExpression": null, "responseImfLeg": null, "requestImfField": null, "responseImfField": null }, { "fieldId": "38", "fieldName": "Field 38 Approval code", "requestImfExpression": null, "responseImfExpression": null, "responseImfLeg": null, "requestImfField": null, "responseImfField": null }, { "fieldId": "39", "fieldName": "Field 39 Action code", "requestImfExpression": null, "responseImfExpression": null, "responseImfLeg": null, "requestImfField": null, "responseImfField": null }, { "fieldId": "40", "fieldName": "Field 40 Service code", "requestImfExpression": null, "responseImfExpression": null, "responseImfLeg": null, "requestImfField": null, "responseImfField": null }, { "fieldId": "41", "fieldName": "Field 41 Card acceptor terminal identification", "requestImfExpression": null, "responseImfExpression": null, "responseImfLeg": null, "requestImfField": null, "responseImfField": null }, { "fieldId": "42", "fieldName": "Field 42 Card acceptor identification code", "requestImfExpression": null, "responseImfExpression": null, "responseImfLeg": null, "requestImfField": null, "responseImfField": null }, { "fieldId": "43", "fieldName": "Field 43 Card acceptor name/location", "requestImfExpression": null, "responseImfExpression": null, "responseImfLeg": null, "requestImfField": null, "responseImfField": null }, { "fieldId": "44", "fieldName": "Field 44 Additional response data", "requestImfExpression": null, "responseImfExpression": null, "responseImfLeg": null, "requestImfField": null, "responseImfField": null }, { "fieldId": "45", "fieldName": "Field 45 Track 1 data", "requestImfExpression": null, "responseImfExpression": null, "responseImfLeg": null, "requestImfField": null, "responseImfField": null }, { "fieldId": "46", "fieldName": "Field 46 Amounts, Fees", "requestImfExpression": null, "responseImfExpression": null, "responseImfLeg": null, "requestImfField": null, "responseImfField": null }, { "fieldId": "47", "fieldName": "Field 47 Additional data - national", "requestImfExpression": null, "responseImfExpression": null, "responseImfLeg": null, "requestImfField": null, "responseImfField": null }, { "fieldId": "48", "fieldName": "Field 48 Additional data - private", "requestImfExpression": null, "responseImfExpression": null, "responseImfLeg": null, "requestImfField": null, "responseImfField": null }, { "fieldId": "49", "fieldName": "Field 49 Currency code, Transaction", "requestImfExpression": null, "responseImfExpression": null, "responseImfLeg": null, "requestImfField": null, "responseImfField": null }, { "fieldId": "50", "fieldName": "Field 50 Currency code, Reconciliation", "requestImfExpression": null, "responseImfExpression": null, "responseImfLeg": null, "requestImfField": null, "responseImfField": null }, { "fieldId": "51", "fieldName": "Field 51 Currency code, Cardholder billing", "requestImfExpression": null, "responseImfExpression": null, "responseImfLeg": null, "requestImfField": null, "responseImfField": null }, { "fieldId": "52", "fieldName": "Field 52 Personal identification number [PIN] data", "requestImfExpression": null, "responseImfExpression": null, "responseImfLeg": null, "requestImfField": null, "responseImfField": null }, { "fieldId": "53", "fieldName": "Field 53 Security related control information", "requestImfExpression": null, "responseImfExpression": null, "responseImfLeg": null, "requestImfField": null, "responseImfField": null }, { "fieldId": "54", "fieldName": "Field 54 Amounts, additional", "requestImfExpression": null, "responseImfExpression": null, "responseImfLeg": null, "requestImfField": null, "responseImfField": null }, { "fieldId": "55", "fieldName": "Field 55 IC card system related data", "requestImfExpression": null, "responseImfExpression": null, "responseImfLeg": null, "requestImfField": null, "responseImfField": null }, { "fieldId": "56", "fieldName": "Field 56 Original data elements", "requestImfExpression": null, "responseImfExpression": null, "responseImfLeg": null, "requestImfField": null, "responseImfField": null }, { "fieldId": "57", "fieldName": "Field 57 Authorization life cycle code", "requestImfExpression": null, "responseImfExpression": null, "responseImfLeg": null, "requestImfField": null, "responseImfField": null }, { "fieldId": "58", "fieldName": "Field 58 Authorizing agent institution Id Code", "requestImfExpression": null, "responseImfExpression": null, "responseImfLeg": null, "requestImfField": null, "responseImfField": null }, { "fieldId": "59", "fieldName": "Field 59 Transport data", "requestImfExpression": null, "responseImfExpression": null, "responseImfLeg": null, "requestImfField": null, "responseImfField": null }, { "fieldId": "60", "fieldName": "Field 60 Reserved for national use", "requestImfExpression": null, "responseImfExpression": null, "responseImfLeg": null, "requestImfField": null, "responseImfField": null }, { "fieldId": "61", "fieldName": "Field 61 Reserved for national use", "requestImfExpression": null, "responseImfExpression": null, "responseImfLeg": null, "requestImfField": null, "responseImfField": null }, { "fieldId": "62", "fieldName": "Field 62 Reserved for private use", "requestImfExpression": null, "responseImfExpression": null, "responseImfLeg": null, "requestImfField": null, "responseImfField": null }, { "fieldId": "63", "fieldName": "Field 63 Reserved for private use", "requestImfExpression": null, "responseImfExpression": null, "responseImfLeg": null, "requestImfField": null, "responseImfField": null }, { "fieldId": "64", "fieldName": "Field 64 Message authentication code field", "requestImfExpression": null, "responseImfExpression": null, "responseImfLeg": null, "requestImfField": null, "responseImfField": null }, { "fieldId": "66", "fieldName": "Field 66 Amounts, original fees", "requestImfExpression": null, "responseImfExpression": null, "responseImfLeg": null, "requestImfField": null, "responseImfField": null }, { "fieldId": "67", "fieldName": "Field 67 Extended payment data", "requestImfExpression": null, "responseImfExpression": null, "responseImfLeg": null, "requestImfField": null, "responseImfField": null }, { "fieldId": "68", "fieldName": "Field 68 Country code, receiving institution", "requestImfExpression": null, "responseImfExpression": null, "responseImfLeg": null, "requestImfField": null, "responseImfField": null }, { "fieldId": "69", "fieldName": "Field 69 Country code, settlement institution", "requestImfExpression": null, "responseImfExpression": null, "responseImfLeg": null, "requestImfField": null, "responseImfField": null }, { "fieldId": "70", "fieldName": "Field 70 Country code, authorizing agent Inst.", "requestImfExpression": null, "responseImfExpression": null, "responseImfLeg": null, "requestImfField": null, "responseImfField": null }, { "fieldId": "71", "fieldName": "Field 71 Message number", "requestImfExpression": null, "responseImfExpression": null, "responseImfLeg": null, "requestImfField": null, "responseImfField": null }, { "fieldId": "72", "fieldName": "Field 72 Data record", "requestImfExpression": null, "responseImfExpression": null, "responseImfLeg": null, "requestImfField": null, "responseImfField": null }, { "fieldId": "73", "fieldName": "Field 73 Date, action", "requestImfExpression": null, "responseImfExpression": null, "responseImfLeg": null, "requestImfField": null, "responseImfField": null }, { "fieldId": "74", "fieldName": "Field 74 Credits, number", "requestImfExpression": null, "responseImfExpression": null, "responseImfLeg": null, "requestImfField": null, "responseImfField": null }, { "fieldId": "75", "fieldName": "Field 75 Credits, reversal number", "requestImfExpression": null, "responseImfExpression": null, "responseImfLeg": null, "requestImfField": null, "responseImfField": null }, { "fieldId": "76", "fieldName": "Field 76 Debits, number", "requestImfExpression": null, "responseImfExpression": null, "responseImfLeg": null, "requestImfField": null, "responseImfField": null }, { "fieldId": "77", "fieldName": "Field 77 Debits, reversal number", "requestImfExpression": null, "responseImfExpression": null, "responseImfLeg": null, "requestImfField": null, "responseImfField": null }, { "fieldId": "78", "fieldName": "Field 78 Transfer, number", "requestImfExpression": null, "responseImfExpression": null, "responseImfLeg": null, "requestImfField": null, "responseImfField": null }, { "fieldId": "79", "fieldName": "Field 79 Transfer, reversal number", "requestImfExpression": null, "responseImfExpression": null, "responseImfLeg": null, "requestImfField": null, "responseImfField": null }, { "fieldId": "80", "fieldName": "Field 80 Inquiries, number", "requestImfExpression": null, "responseImfExpression": null, "responseImfLeg": null, "requestImfField": null, "responseImfField": null }, { "fieldId": "81", "fieldName": "Field 81 Authorizations, number", "requestImfExpression": null, "responseImfExpression": null, "responseImfLeg": null, "requestImfField": null, "responseImfField": null }, { "fieldId": "82", "fieldName": "Field 82 Inquiries, reversal number", "requestImfExpression": null, "responseImfExpression": null, "responseImfLeg": null, "requestImfField": null, "responseImfField": null }, { "fieldId": "83", "fieldName": "Field 83 Payments, number", "requestImfExpression": null, "responseImfExpression": null, "responseImfLeg": null, "requestImfField": null, "responseImfField": null }, { "fieldId": "84", "fieldName": "Field 84 Payments, reversal number", "requestImfExpression": null, "responseImfExpression": null, "responseImfLeg": null, "requestImfField": null, "responseImfField": null }, { "fieldId": "85", "fieldName": "Field 85 Fee collections, number", "requestImfExpression": null, "responseImfExpression": null, "responseImfLeg": null, "requestImfField": null, "responseImfField": null }, { "fieldId": "86", "fieldName": "Field 86 Credits, amount", "requestImfExpression": null, "responseImfExpression": null, "responseImfLeg": null, "requestImfField": null, "responseImfField": null }, { "fieldId": "87", "fieldName": "Field 87 Credits, reversal amount", "requestImfExpression": null, "responseImfExpression": null, "responseImfLeg": null, "requestImfField": null, "responseImfField": null }, { "fieldId": "88", "fieldName": "Field 88 Debits, amount", "requestImfExpression": null, "responseImfExpression": null, "responseImfLeg": null, "requestImfField": null, "responseImfField": null }, { "fieldId": "89", "fieldName": "Field 89 Debits, reversal amount", "requestImfExpression": null, "responseImfExpression": null, "responseImfLeg": null, "requestImfField": null, "responseImfField": null }, { "fieldId": "90", "fieldName": "Field 90 Authorizations, reversal number", "requestImfExpression": null, "responseImfExpression": null, "responseImfLeg": null, "requestImfField": null, "responseImfField": null }, { "fieldId": "91", "fieldName": "Field 91 Country code, transaction Dest. Inst.", "requestImfExpression": null, "responseImfExpression": null, "responseImfLeg": null, "requestImfField": null, "responseImfField": null }, { "fieldId": "92", "fieldName": "Field 92 Country code, transaction Orig. Inst.", "requestImfExpression": null, "responseImfExpression": null, "responseImfLeg": null, "requestImfField": null, "responseImfField": null }, { "fieldId": "93", "fieldName": "Field 93 Transaction Dest. Inst. Id code", "requestImfExpression": null, "responseImfExpression": null, "responseImfLeg": null, "requestImfField": null, "responseImfField": null }, { "fieldId": "94", "fieldName": "Field 94 Transaction Orig. Inst. Id code", "requestImfExpression": null, "responseImfExpression": null, "responseImfLeg": null, "requestImfField": null, "responseImfField": null }, { "fieldId": "95", "fieldName": "Field 95 Card issuer reference data", "requestImfExpression": null, "responseImfExpression": null, "responseImfLeg": null, "requestImfField": null, "responseImfField": null }, { "fieldId": "96", "fieldName": "Field 96 Key management data", "requestImfExpression": null, "responseImfExpression": null, "responseImfLeg": null, "requestImfField": null, "responseImfField": null }, { "fieldId": "97", "fieldName": "Field 97 Amount, Net reconciliation", "requestImfExpression": null, "responseImfExpression": null, "responseImfLeg": null, "requestImfField": null, "responseImfField": null }, { "fieldId": "98", "fieldName": "Field 98 Payee", "requestImfExpression": null, "responseImfExpression": null, "responseImfLeg": null, "requestImfField": null, "responseImfField": null }, { "fieldId": "99", "fieldName": "Field 99 Settlement institution Id code", "requestImfExpression": null, "responseImfExpression": null, "responseImfLeg": null, "requestImfField": null, "responseImfField": null }, { "fieldId": "100", "fieldName": "Field 100 Receiving institution Id code", "requestImfExpression": null, "responseImfExpression": null, "responseImfLeg": null, "requestImfField": null, "responseImfField": null }, { "fieldId": "101", "fieldName": "Field 101 File name", "requestImfExpression": null, "responseImfExpression": null, "responseImfLeg": null, "requestImfField": null, "responseImfField": null }, { "fieldId": "102", "fieldName": "Field 102 Account identification 1", "requestImfExpression": null, "responseImfExpression": null, "responseImfLeg": null, "requestImfField": null, "responseImfField": null }, { "fieldId": "103", "fieldName": "Field 103 Account identification 2", "requestImfExpression": null, "responseImfExpression": null, "responseImfLeg": null, "requestImfField": null, "responseImfField": null }, { "fieldId": "104", "fieldName": "Field 104 Transaction description", "requestImfExpression": null, "responseImfExpression": null, "responseImfLeg": null, "requestImfField": null, "responseImfField": null }, { "fieldId": "105", "fieldName": "Field 105 Credits, Chargeback amount", "requestImfExpression": null, "responseImfExpression": null, "responseImfLeg": null, "requestImfField": null, "responseImfField": null }, { "fieldId": "106", "fieldName": "Field 106 Debits, Chargeback amount", "requestImfExpression": null, "responseImfExpression": null, "responseImfLeg": null, "requestImfField": null, "responseImfField": null }, { "fieldId": "107", "fieldName": "Field 107 Credits, Chargeback number", "requestImfExpression": null, "responseImfExpression": null, "responseImfLeg": null, "requestImfField": null, "responseImfField": null }, { "fieldId": "108", "fieldName": "Field 108 Debits, Chargeback number", "requestImfExpression": null, "responseImfExpression": null, "responseImfLeg": null, "requestImfField": null, "responseImfField": null }, { "fieldId": "109", "fieldName": "Field 109 Credits, Fee amounts", "requestImfExpression": null, "responseImfExpression": null, "responseImfLeg": null, "requestImfField": null, "responseImfField": null }, { "fieldId": "110", "fieldName": "Field 110 Debits, Fee amounts", "requestImfExpression": null, "responseImfExpression": null, "responseImfLeg": null, "requestImfField": null, "responseImfField": null }, { "fieldId": "111", "fieldName": "Field 111 Reserved for ISO use", "requestImfExpression": null, "responseImfExpression": null, "responseImfLeg": null, "requestImfField": null, "responseImfField": null }, { "fieldId": "112", "fieldName": "Field 112 Reserved for ISO use", "requestImfExpression": null, "responseImfExpression": null, "responseImfLeg": null, "requestImfField": null, "responseImfField": null }, { "fieldId": "113", "fieldName": "Field 113 Reserved for ISO use", "requestImfExpression": null, "responseImfExpression": null, "responseImfLeg": null, "requestImfField": null, "responseImfField": null }, { "fieldId": "114", "fieldName": "Field 114 Reserved for ISO use", "requestImfExpression": null, "responseImfExpression": null, "responseImfLeg": null, "requestImfField": null, "responseImfField": null }, { "fieldId": "115", "fieldName": "Field 115 Reserved for ISO use", "requestImfExpression": null, "responseImfExpression": null, "responseImfLeg": null, "requestImfField": null, "responseImfField": null }, { "fieldId": "116", "fieldName": "Field 116 Reserved for national use", "requestImfExpression": null, "responseImfExpression": null, "responseImfLeg": null, "requestImfField": null, "responseImfField": null }, { "fieldId": "117", "fieldName": "Field 117 Reserved for national use", "requestImfExpression": null, "responseImfExpression": null, "responseImfLeg": null, "requestImfField": null, "responseImfField": null }, { "fieldId": "118", "fieldName": "Field 118 Reserved for national use", "requestImfExpression": null, "responseImfExpression": null, "responseImfLeg": null, "requestImfField": null, "responseImfField": null }, { "fieldId": "119", "fieldName": "Field 119 Reserved for national use", "requestImfExpression": null, "responseImfExpression": null, "responseImfLeg": null, "requestImfField": null, "responseImfField": null }, { "fieldId": "120", "fieldName": "Field 120 Reserved for national use", "requestImfExpression": null, "responseImfExpression": null, "responseImfLeg": null, "requestImfField": null, "responseImfField": null }, { "fieldId": "121", "fieldName": "Field 121 Reserved for national use", "requestImfExpression": null, "responseImfExpression": null, "responseImfLeg": null, "requestImfField": null, "responseImfField": null }, { "fieldId": "122", "fieldName": "Field 122 Reserved for national use", "requestImfExpression": null, "responseImfExpression": null, "responseImfLeg": null, "requestImfField": null, "responseImfField": null }, { "fieldId": "123", "fieldName": "Field 123 Reserved for private use", "requestImfExpression": null, "responseImfExpression": null, "responseImfLeg": null, "requestImfField": null, "responseImfField": null }, { "fieldId": "124", "fieldName": "Field 124 Reserved for private use", "requestImfExpression": null, "responseImfExpression": null, "responseImfLeg": null, "requestImfField": null, "responseImfField": null }, { "fieldId": "125", "fieldName": "Field 125 Reserved for private use", "requestImfExpression": null, "responseImfExpression": null, "responseImfLeg": null, "requestImfField": null, "responseImfField": null }, { "fieldId": "126", "fieldName": "Field 126 Reserved for private use", "requestImfExpression": null, "responseImfExpression": null, "responseImfLeg": null, "requestImfField": null, "responseImfField": null }, { "fieldId": "127", "fieldName": "Field 127 Reserved for private use", "requestImfExpression": null, "responseImfExpression": null, "responseImfLeg": null, "requestImfField": null, "responseImfField": null }, { "fieldId": "128", "fieldName": "Field 128 Message authentication code field", "requestImfExpression": null, "responseImfExpression": null, "responseImfLeg": null, "requestImfField": null, "responseImfField": null }], "listIdRule": [{ "id": "0", "name": "Field 0 Message Type Indicator" }, { "id": "1", "name": "Field 1 Bitmap" }, { "id": "2", "name": "Field 2 Primary Account number" }, { "id": "3", "name": "Field 3 Processing Code" }, { "id": "4", "name": "Field 4 Amount, Transaction" }, { "id": "5", "name": "Field 5 Amount, Reconciliation" }, { "id": "6", "name": "Field 6 Amount, Cardholder billing" }, { "id": "7", "name": "Field 7 Date and time, transmission" }, { "id": "8", "name": "Field 8 Amount, Cardholder billing fee" }, { "id": "9", "name": "Field 9 Conversion rate, Reconciliation" }, { "id": "10", "name": "Field 10 Conversion rate, Cardholder billing" }, { "id": "11", "name": "Field 11 Systems trace audit number" }, { "id": "12", "name": "Field 12 Date and time, Local transaction" }, { "id": "13", "name": "Field 13 Date, Effective" }, { "id": "14", "name": "Field 14 Date, Expiration" }, { "id": "15", "name": "Field 15 Date, Settlement" }, { "id": "16", "name": "Field 16 Date, Conversion" }, { "id": "17", "name": "Field 17 Date, Capture" }, { "id": "18", "name": "Field 18 Merchant type" }, { "id": "19", "name": "Field 19 Country code, Acquiring institution" }, { "id": "20", "name": "Field 20 Country code, Primary account number" }, { "id": "21", "name": "Field 21 Country code, Forwarding institution" }, { "id": "22", "name": "Field 22 Point of service data code" }, { "id": "23", "name": "Field 23 Card sequence number" }, { "id": "24", "name": "Field 24 Function code" }, { "id": "25", "name": "Field 25 Message reason code" }, { "id": "26", "name": "Field 26 Card acceptor business code" }, { "id": "27", "name": "Field 27 Approval code length" }, { "id": "28", "name": "Field 28 Date, Reconciliation" }, { "id": "29", "name": "Field 29 Reconciliation indicator" }, { "id": "30", "name": "Field 30 Amounts, original" }, { "id": "31", "name": "Field 31 Acquirer reference data" }, { "id": "32", "name": "Field 32 Acquirer institution identification code" }, { "id": "33", "name": "Field 33 Forwarding institution identification code" }, { "id": "34", "name": "Field 34 Primary account number, extended" }, { "id": "35", "name": "Field 35 Track 2 data" }, { "id": "36", "name": "Field 36 Track 3 data" }, { "id": "37", "name": "Field 37 Retrieval reference number" }, { "id": "38", "name": "Field 38 Approval code" }, { "id": "39", "name": "Field 39 Action code" }, { "id": "40", "name": "Field 40 Service code" }, { "id": "41", "name": "Field 41 Card acceptor terminal identification" }, { "id": "42", "name": "Field 42 Card acceptor identification code" }, { "id": "43", "name": "Field 43 Card acceptor name/location" }, { "id": "44", "name": "Field 44 Additional response data" }, { "id": "45", "name": "Field 45 Track 1 data" }, { "id": "46", "name": "Field 46 Amounts, Fees" }, { "id": "47", "name": "Field 47 Additional data - national" }, { "id": "48", "name": "Field 48 Additional data - private" }, { "id": "49", "name": "Field 49 Currency code, Transaction" }, { "id": "50", "name": "Field 50 Currency code, Reconciliation" }, { "id": "51", "name": "Field 51 Currency code, Cardholder billing" }, { "id": "52", "name": "Field 52 Personal identification number [PIN] data" }, { "id": "53", "name": "Field 53 Security related control information" }, { "id": "54", "name": "Field 54 Amounts, additional" }, { "id": "55", "name": "Field 55 IC card system related data" }, { "id": "56", "name": "Field 56 Original data elements" }, { "id": "57", "name": "Field 57 Authorization life cycle code" }, { "id": "58", "name": "Field 58 Authorizing agent institution Id Code" }, { "id": "59", "name": "Field 59 Transport data" }, { "id": "60", "name": "Field 60 Reserved for national use" }, { "id": "61", "name": "Field 61 Reserved for national use" }, { "id": "62", "name": "Field 62 Reserved for private use" }, { "id": "63", "name": "Field 63 Reserved for private use" }, { "id": "64", "name": "Field 64 Message authentication code field" }, { "id": "65", "name": "Field 65 Reserved for ISO use" }, { "id": "66", "name": "Field 66 Amounts, original fees" }, { "id": "67", "name": "Field 67 Extended payment data" }, { "id": "68", "name": "Field 68 Country code, receiving institution" }, { "id": "69", "name": "Field 69 Country code, settlement institution" }, { "id": "70", "name": "Field 70 Country code, authorizing agent Inst." }, { "id": "71", "name": "Field 71 Message number" }, { "id": "72", "name": "Field 72 Data record" }, { "id": "73", "name": "Field 73 Date, action" }, { "id": "74", "name": "Field 74 Credits, number" }, { "id": "75", "name": "Field 75 Credits, reversal number" }, { "id": "76", "name": "Field 76 Debits, number" }, { "id": "77", "name": "Field 77 Debits, reversal number" }, { "id": "78", "name": "Field 78 Transfer, number" }, { "id": "79", "name": "Field 79 Transfer, reversal number" }, { "id": "80", "name": "Field 80 Inquiries, number" }, { "id": "81", "name": "Field 81 Authorizations, number" }, { "id": "82", "name": "Field 82 Inquiries, reversal number" }, { "id": "83", "name": "Field 83 Payments, number" }, { "id": "84", "name": "Field 84 Payments, reversal number" }, { "id": "85", "name": "Field 85 Fee collections, number" }, { "id": "86", "name": "Field 86 Credits, amount" }, { "id": "87", "name": "Field 87 Credits, reversal amount" }, { "id": "88", "name": "Field 88 Debits, amount" }, { "id": "89", "name": "Field 89 Debits, reversal amount" }, { "id": "90", "name": "Field 90 Authorizations, reversal number" }, { "id": "91", "name": "Field 91 Country code, transaction Dest. Inst." }, { "id": "92", "name": "Field 92 Country code, transaction Orig. Inst." }, { "id": "93", "name": "Field 93 Transaction Dest. Inst. Id code" }, { "id": "94", "name": "Field 94 Transaction Orig. Inst. Id code" }, { "id": "95", "name": "Field 95 Card issuer reference data" }, { "id": "96", "name": "Field 96 Key management data" }, { "id": "97", "name": "Field 97 Amount, Net reconciliation" }, { "id": "98", "name": "Field 98 Payee" }, { "id": "99", "name": "Field 99 Settlement institution Id code" }, { "id": "100", "name": "Field 100 Receiving institution Id code" }, { "id": "101", "name": "Field 101 File name" }, { "id": "102", "name": "Field 102 Account identification 1" }, { "id": "103", "name": "Field 103 Account identification 2" }, { "id": "104", "name": "Field 104 Transaction description" }, { "id": "105", "name": "Field 105 Credits, Chargeback amount" }, { "id": "106", "name": "Field 106 Debits, Chargeback amount" }, { "id": "107", "name": "Field 107 Credits, Chargeback number" }, { "id": "108", "name": "Field 108 Debits, Chargeback number" }, { "id": "109", "name": "Field 109 Credits, Fee amounts" }, { "id": "110", "name": "Field 110 Debits, Fee amounts" }, { "id": "111", "name": "Field 111 Reserved for ISO use" }, { "id": "112", "name": "Field 112 Reserved for ISO use" }, { "id": "113", "name": "Field 113 Reserved for ISO use" }, { "id": "114", "name": "Field 114 Reserved for ISO use" }, { "id": "115", "name": "Field 115 Reserved for ISO use" }, { "id": "116", "name": "Field 116 Reserved for national use" }, { "id": "117", "name": "Field 117 Reserved for national use" }, { "id": "118", "name": "Field 118 Reserved for national use" }, { "id": "119", "name": "Field 119 Reserved for national use" }, { "id": "120", "name": "Field 120 Reserved for national use" }, { "id": "121", "name": "Field 121 Reserved for national use" }, { "id": "122", "name": "Field 122 Reserved for national use" }, { "id": "123", "name": "Field 123 Reserved for private use" }, { "id": "124", "name": "Field 124 Reserved for private use" }, { "id": "125", "name": "Field 125 Reserved for private use" }, { "id": "126", "name": "Field 126 Reserved for private use" }, { "id": "127", "name": "Field 127 Reserved for private use" }, { "id": "128", "name": "Field 128 Message authentication code field" }], "safingCondition": null, "apiFieldsData": null }, "responseCodeData": { "persistRequired": "0", "ipcUiWrapper": null }, "beanconfiguationData": { "persistRequired": null, "beans": [{ "componentType": "L1", "componentId": null, "fileType": "WORKFLOW CHAIN", "fileName": "workflow-chain.xml", "fileContent": "<beans xmlns=\"http://www.springframework.org/schema/beans\"\r\n\txmlns:xsi=\"http://www.w3.org/2001/XMLSchema-instance\"\r\n\txmlns:p=\"http://www.springframework.org/schema/p\"\r\n\txmlns:int=\"http://www.springframework.org/schema/integration\"\r\n\txmlns:task=\"http://www.springframework.org/schema/task\"\r\n\txmlns:context=\"http://www.springframework.org/schema/context\"\r\n\txsi:schemaLocation=\"http://www.springframework.org/schema/beans\r\nhttp://www.springframework.org/schema/beans/spring-beans.xsd \r\nhttp://www.springframework.org/schema/integration http://www.springframework.org/schema/integration/spring-integration.xsd \r\nhttp://www.springframework.org/schema/task http://www.springframework.org/schema/task/spring-task.xsd \r\nhttp://www.springframework.org/schema/context http://www.springframework.org/schema/context/spring-context.xsd\">\r\n\r\n\t<int:chain input-channel=\"requestConsumerChannel\" output-channel=\"routingChannel\">\r\n\t\t<int:transformer ref=\"adapterTransformer\" method=\"parseNativeSource\"/>\r\n\t\t<int:transformer ref=\"adapterTransformer\" method=\"nativeToIMFTransformer\"/>\r\n\t\t<int:transformer ref=\"tagsTransformer\" method=\"parseTags\"/>\r\n\t\t<int:header-enricher>\r\n\t\t\t<int:header name=\"SPECIFICATION_ID\" value=\"${component.name:undefined}\"></int:header>\r\n\t\t</int:header-enricher>\r\n\t\t<int:header-enricher />\r\n\t</int:chain>\r\n\t\r\n\t<int:chain input-channel=\"responseConsumerChannel\" output-channel=\"responseSenderChannel\">\r\n\t\t<int:transformer ref=\"adapterTransformer\" method=\"responseTransformer\"/>\r\n\t\t<int:transformer ref=\"adapterTransformer\" method=\"nativetoSource\"/>\r\n\t</int:chain>\r\n\t\r\n\t<int:chain input-channel=\"invalidMessageChannel\" output-channel=\"responseSenderChannel\">\r\n\t\t<int:transformer ref=\"adapterTransformer\" method=\"prepareInvalidResponse\"/>\r\n\t</int:chain>\r\n\r\n</beans>", "version": 1, "packagingType": "SYSTEM" }, { "componentType": "L1", "componentId": null, "fileType": "CHANNELS", "fileName": "channels.xml", "fileContent": "<beans xmlns=\"http://www.springframework.org/schema/beans\"\r\n\txmlns:xsi=\"http://www.w3.org/2001/XMLSchema-instance\"\r\n\txmlns:p=\"http://www.springframework.org/schema/p\"\r\n\txmlns:int=\"http://www.springframework.org/schema/integration\"\r\n\txmlns:task=\"http://www.springframework.org/schema/task\"\r\n\txmlns:context=\"http://www.springframework.org/schema/context\"\r\n\txsi:schemaLocation=\"http://www.springframework.org/schema/beans\r\nhttp://www.springframework.org/schema/beans/spring-beans.xsd \r\nhttp://www.springframework.org/schema/integration http://www.springframework.org/schema/integration/spring-integration.xsd \r\nhttp://www.springframework.org/schema/task http://www.springframework.org/schema/task/spring-task.xsd \r\nhttp://www.springframework.org/schema/context http://www.springframework.org/schema/context/spring-context.xsd\">\r\n\r\n\t<task:executor id=\"requestConsumerChannelExecutor\" pool-size=\"50-150\" queue-capacity=\"5000\" keep-alive=\"50\" rejection-policy=\"CALLER_RUNS\"/>\r\n\t<int:channel id=\"requestConsumerChannel\">\r\n\t\t<int:dispatcher task-executor=\"requestConsumerChannelExecutor\" />\r\n\t</int:channel>\r\n\t\r\n\t<task:executor id=\"responseConsumerChannelExecutor\" pool-size=\"50-150\" queue-capacity=\"5000\" keep-alive=\"50\" rejection-policy=\"CALLER_RUNS\" />\t\r\n\t<int:channel id=\"responseConsumerChannel\" >\r\n\t\t<int:dispatcher task-executor=\"requestConsumerChannelExecutor\" />\r\n\t</int:channel>\r\n\r\n\t<int:channel id=\"requestSenderChannel\" />\r\n\t<int:channel id=\"responseSenderChannel\" />\r\n\t<int:channel id=\"reversalConsumerChannel\" />\r\n\t<int:channel id=\"transformationErrorChannel\" />\r\n\t<int:channel id=\"validationErrorChannel\" />\r\n\t<int:channel id=\"invalidMessageChannel\" />\r\n\r\n</beans>", "version": 1, "packagingType": "SYSTEM" }] }, "configurationId": 1060, "configurationVersion": 0, "imfId": { "id": 12, "name": "IMF Structure 76", "version": 76 }, "beanTabDisable": true }
};
const selctNameValidationJson ={
  status: "success",
  message: "Adapter Name is invalid.",
  data: true
};
const selectDownloadTemplateJson ={}
const eJson ={active:"1",
description:null,
id:"46",
lookupType:{id: 4, name: 'Message_Standard', description: 'Message Standard', modifiable: '0'},
modifiable:"0",
value:"ISO8583-v2003 (BINARY)"}
const flag= '';
const namevalue = "";
const changesJson ={
  getIfmList: {
    previousValue: [],
    currentValue: [
      {
        id: 24,
        name: "IMF Structure 82",
        version: 82
      },
      {
        id: 23,
        name: "IMF Structure 81",
        version: 81
      }
    ],
    firstChange: false
  }
};
const flagJson ={

  isTrusted:true,
  bubbles:true,
  cancelBubble:false,
  cancelable:false,
  composed:false,
  currentTarget:null,
  defaultPrevented:false,
  eventPhase:0,
  path:[],
  returnValue:true,
  srcElement:[],
  target:[],
  timeStamp:175324.5,
  type:"change"
}
xdescribe('AdapterTemplateComponent', () => {
  let component: AdapterTemplateComponent;
  let fixture: ComponentFixture<AdapterTemplateComponent>;
  let mockStore: MockStore<IAppState>;
  let mockselectL1AdapterComponentList: MemoizedSelector<any, any>;
  let mockselectDownloadTemplate: MemoizedSelector<any, any>;
  let mockselectUploadTemplate: MemoizedSelector<any, any>;
  let mockselectViewSettingsList: MemoizedSelector<any, any>;
  let mockselctNameValidation: MemoizedSelector<any, any>;
  let setDefaultLangSpy: jasmine.Spy;
  let l1AdapterService: L1AdapterService
  
  beforeEach(() => {
    const translateService = jasmine.createSpyObj('TranslateService', ['get', 'setDefaultLang']);
    TestBed.configureTestingModule({
      declarations: [AdapterTemplateComponent],
      providers: [
        L1AdapterService,
        AlertService,
        SnotifyService,
        NzModalService,
        provideMockStore(),
        { provide: TranslateService, useClass: translateServiceMock },
        { provide: L1AdapterService, useClass: l1AdapterService },
        { provide: 'SnotifyToastConfig', useValue: ToastDefaults },
      ],
      imports: [
        SharedModule,
        RouterTestingModule,
        NzSpinModule,
        NzTabsModule,
        NgSelectModule,
        HttpClientTestingModule,
        TranslateModule.forRoot({}),
        StoreModule.forRoot({}),
        CommonModule
      ],
    }).compileComponents();

    mockStore = TestBed.inject(MockStore);
    fixture = TestBed.createComponent(AdapterTemplateComponent);
    // translate = TestBed.inject(TranslateService);
    component = fixture.componentInstance;
    mockselectL1AdapterComponentList = mockStore.overrideSelector(
      selectL1AdapterById,
      l1AdapterByIdJson,
    );
    component.getIfmList = [];
    mockselectUploadTemplate = mockStore.overrideSelector(
      selectUploadTemplate,
      selectUploadTemplateJson
    );

    mockselectViewSettingsList = mockStore.overrideSelector(
      selectViewSettingsList,
      viewsettingJSON,
    );
    mockselctNameValidation = mockStore.overrideSelector(
      selctNameValidation,
      selctNameValidationJson,
    );
    mockselectDownloadTemplate = mockStore.overrideSelector(
      selectDownloadTemplate,
      selectDownloadTemplateJson,
    );
    setDefaultLangSpy = translateService.get.and.returnValue(of([]));

    mockStore.refreshState();
    fixture.detectChanges();

  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  // it('changeSinglePRoperty fuction should call', () => {
  //   component.changeSinglePRoperty();
  //   expect(component.singleProperty).toEqual(true);
  // });
  it('handleOk fuction should call', () => {
    component.handleOk();
    expect(component.isOkLoading).toEqual(true);
  });
   it("tests the exit button click", fakeAsync(() => {
    let flag = "";
    component.getTemplateFormat(eJson,flag,namevalue)
    tick(1000)
    fixture.detectChanges()
    fixture.whenStable().then(() => { 
      expect(component.isOkLoading).toEqual(true);
    })
  }));
  it('changeSinglePRoperty fuction should call', () => {
   let flag = "imf";
   let nameValue = "nameValidator";
    component.getTemplateFormat(flagJson,flag,nameValue);
    expect(component.isOkLoading).toEqual(true); 
  });
  it('changeSinglePRoperty fuction should call', () => {
    let flag = "imf";
    let nameValue = "nameValidator";
     component.getTemplateFormat(flagJson,flag,nameValue);
     expect(component.nameValidator).toEqual(true); 
   });
  //  it('should clear search value', () => {
  //   const adapter = Object.getPrototypeOf(component);
  //   const storeSpy = spyOn(adapter._store,'dispatch').and.callThrough();
  //   component.downloadTemplate();
  //   fixture.detectChanges();
  //   expect(storeSpy).toHaveBeenCalledTimes(1);
  // });
  // it("tests the exit button click", fakeAsync(() => {
  //   const adapter = Object.getPrototypeOf(component);
  //   const storeSpy = spyOn(adapter._store,'dispatch').and.callThrough();
  //   component.downloadTemplate();
  //   fixture.detectChanges();
  //   tick() 
  //   expect(storeSpy).toHaveBeenCalledTimes(1);
  // }));
  it('handleCancel fuction should open the cancelPopUp', () => {
    component.handleCancel();
    expect(component.isVisible).toEqual(false);
  });
  it('onDocumentChange fuction should call', () => {
    component.onDocumentChange(flagJson);
    expect(component.loader.emit(true)).toBeTruthy;
  });
  it('getTemplateFormat fuction should call', () => {
    component.getTemplateFormat(eJson,flag,namevalue);
    expect(component.isVisible).toEqual(false);
  });  
  afterEach(() => {
    fixture.destroy();
  });
});
