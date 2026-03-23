import { HttpClientTestingModule } from '@angular/common/http/testing';
import { EventEmitter } from '@angular/core';
import { ComponentFixture, fakeAsync, TestBed, waitForAsync } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { AlertService } from '@app/services/alert.service';
import { ImportFileService } from '@app/services/import-file.service';
import { L1AdapterService } from '@app/services/l1-adapter.service';
import { L3AdapterService } from '@app/services/l3-adapter.service';
import { SharedModule } from '@app/shared/shared.module';
import { IAppState } from '@app/store/state/app.state';
import { NgSelectModule } from '@ng-select/ng-select';
import { MemoizedSelector, StoreModule } from '@ngrx/store';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { SnotifyService } from 'ng-snotify';
import { AlertModule, DatePickerRvModule, TabsModule } from 'bnt';
import { of } from 'rxjs';
import { configurationMasterList } from '@app/store/selectors/master-configuration.selector';
import { selectViewSettingsList } from '@app/store/selectors/view-settings.selector';
import { MasterConfigurationComponent } from './master-configuration.component';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, convertToParamMap, Router } from '@angular/router';

class translateServiceMock {
  public onLangChange: EventEmitter<any> = new EventEmitter();
  public onTranslationChange: EventEmitter<any> = new EventEmitter();
  public onDefaultLangChange: EventEmitter<any> = new EventEmitter();

  public get(key: any): any {
    return of(key);
  }
  public setDefaultLang(key: any): any {
    return of(key);
  }
}
const selectViewSettingsListJson = {
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
const configurationMasterListJson = {
  'total-record': 9,
  logsList: [
    {
      id: 9,
      properties:
        '{"l1configuration": {"message": [{"field": "server.port", "label": "Servefff", "value": "${server_port:8071}", "format": "", "hidden": false, "datatype": "String", "mandatory": false}, {"field": "component.type", "label": "Component Type(Message)", "value": "L1_JSON", "format": "^([a-zA-Z0-9_-])", "hidden": false, "datatype": "String", "mandatory": true, "listvalues": null}, {"field": "spring.profiles.active", "label": "Spring Profiles Active(Message)", "value": "hz-client,http_server", "format": "^([a-zA-Z_,-])", "hidden": true, "datatype": "String", "fileName": null, "mandatory": true, "listvalues": null}, {"field": "counters.to.be.collected", "label": "Counters To Be Collecteds", "value": "IPC,TRANSACTION_TYPE,PAYMENT_TYPE", "format": "", "hidden": true, "datatype": "String", "mandatory": true, "listvalues": null}], "network": [{"field": "server.port", "label": "Server Port(Network)", "value": "${server_port:8031}", "format": "", "hidden": "true", "datatype": "String", "mandatory": "true"}, {"field": "component.type", "label": "Component Type(Network)", "value": "L1_JSON", "format": "^([a-zA-Z0-9_-])", "hidden": false, "datatype": "String", "mandatory": true, "listvalues": null}, {"field": "spring.profiles.active", "label": "Spring Profiles Active(Network)", "value": "hz-client,http_server", "format": "^([a-zA-Z_,-])", "hidden": true, "datatype": "String", "fileName": null, "mandatory": true, "listvalues": null}]}, "l3configuration": {"message": [{"field": "server.port", "label": "Server Port(Message)", "value": "${server_port:8071}", "format": "", "hidden": "true", "datatype": "String", "mandatory": "true"}, {"field": "component.type", "label": "Component Type(Message)", "value": "L3_JSON", "format": "^([a-zA-Z0-9_-])", "hidden": false, "datatype": "String", "mandatory": true, "listvalues": null}, {"field": "spring.profiles.active", "label": "Spring Profiles Active(Message)", "value": "hz-client,http_server", "format": "^([a-zA-Z_,-])", "hidden": true, "datatype": "String", "fileName": null, "mandatory": true, "listvalues": null}, {"field": "counters.to.be.collected", "label": "Counters To Be Collected", "value": "IPC,TRANSACTION_TYPE,PAYMENT_TYPE", "format": "", "hidden": true, "datatype": "String", "mandatory": true, "listvalues": null}], "network": [{"field": "component.service.type", "label": "Service Type", "value": "GATEWAY_SERVICE", "format": "^([a-zA-Z_-])", "hidden": "false", "datatype": "String", "mandatory": "true", "listvalues": ["DB_QUERY:(select value from lookup_value where lookup_type in (select id from lookup_type where name = \'SERVICE_TYPE\'))"]}, {"field": "server.port", "label": "Server Port(Network)", "value": "${server_port:8031}", "format": "", "hidden": "true", "datatype": "String", "mandatory": "true"}, {"field": "component.type", "label": "Component Type(Network)", "value": "L3_JSON", "format": "^([a-zA-Z0-9_-])", "hidden": false, "datatype": "String", "mandatory": true, "listvalues": null}, {"field": "spring.profiles.active", "label": "Spring Profiles Active(Network)", "value": "hz-client,http_server", "format": "^([a-zA-Z_,-])", "hidden": true, "datatype": "String", "fileName": null, "mandatory": true, "listvalues": null}]}}',
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
    {
      id: 8,
      properties:
        '{"l1configuration": {"message": [{"field": "server.port", "label": "Server Port(Message)", "value": "${server_port:8071}", "format": "", "hidden": "true", "datatype": "String", "mandatory": "true"}, {"field": "component.type", "label": "Component Type(Message)", "value": "L1_JSON", "format": "^([a-zA-Z0-9_-])", "hidden": false, "datatype": "String", "mandatory": true, "listvalues": null}, {"field": "spring.profiles.active", "label": "Spring Profiles Active(Message)", "value": "hz-client,http_server", "format": "^([a-zA-Z_,-])", "hidden": true, "datatype": "String", "fileName": null, "mandatory": true, "listvalues": null}, {"field": "counters.to.be.collected", "label": "Counters To Be Collected", "value": "IPC,TRANSACTION_TYPE,PAYMENT_TYPE", "format": "", "hidden": true, "datatype": "String", "mandatory": true, "listvalues": null}], "network": [{"field": "server.port", "label": "Server Port(Network)", "value": "${server_port:8031}", "format": "", "hidden": "true", "datatype": "String", "mandatory": "true"}, {"field": "component.type", "label": "Component Type(Network)", "value": "L1_JSON", "format": "^([a-zA-Z0-9_-])", "hidden": false, "datatype": "String", "mandatory": true, "listvalues": null}, {"field": "spring.profiles.active", "label": "Spring Profiles Active(Network)", "value": "hz-client,http_server", "format": "^([a-zA-Z_,-])", "hidden": true, "datatype": "String", "fileName": null, "mandatory": true, "listvalues": null}]}, "l3configuration": {"message": [{"field": "server.port", "label": "Server Port(Message)", "value": "${server_port:8071}", "format": "", "hidden": "true", "datatype": "String", "mandatory": "true"}, {"field": "component.type", "label": "Component Type(Message)", "value": "L3_JSON", "format": "^([a-zA-Z0-9_-])", "hidden": false, "datatype": "String", "mandatory": true, "listvalues": null}, {"field": "spring.profiles.active", "label": "Spring Profiles Active(Message)", "value": "hz-client,http_server", "format": "^([a-zA-Z_,-])", "hidden": true, "datatype": "String", "fileName": null, "mandatory": true, "listvalues": null}, {"field": "counters.to.be.collected", "label": "Counters To Be Collected", "value": "IPC,TRANSACTION_TYPE,PAYMENT_TYPE", "format": "", "hidden": true, "datatype": "String", "mandatory": true, "listvalues": null}], "network": [{"field": "component.service.type", "label": "Service Type", "value": "GATEWAY_SERVICE", "format": "^([a-zA-Z_-])", "hidden": "false", "datatype": "String", "mandatory": "true", "listvalues": ["DB_QUERY:(select value from lookup_value where lookup_type in (select id from lookup_type where name = \'SERVICE_TYPE\'))"]}, {"field": "server.port", "label": "Server Port(Network)", "value": "${server_port:8031}", "format": "", "hidden": "true", "datatype": "String", "mandatory": "true"}, {"field": "component.type", "label": "Component Type(Network)", "value": "L3_JSON", "format": "^([a-zA-Z0-9_-])", "hidden": false, "datatype": "String", "mandatory": true, "listvalues": null}, {"field": "spring.profiles.active", "label": "Spring Profiles Active(Network)", "value": "hz-client,http_server", "format": "^([a-zA-Z_,-])", "hidden": true, "datatype": "String", "fileName": null, "mandatory": true, "listvalues": null}]}}',
      messageStandard: {
        id: -3,
        value: 'HTTP-URLENCODED',
        description: 'HTTP-URLENCODED',
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
        id: -4,
        value: 'HTTP-URLENCODED',
        description: 'HTTP-URLENCODED',
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
    {
      id: 7,
      properties:
        '{"l1configuration": {"message": [{"field": "server.port", "label": "Server Port(Message)", "value": "${server_port:8071}", "format": "", "hidden": "true", "datatype": "String", "mandatory": "true"}, {"field": "component.type", "label": "Component Type(Message)", "value": "L1_JSON", "format": "^([a-zA-Z0-9_-])", "hidden": false, "datatype": "String", "mandatory": true, "listvalues": null}, {"field": "spring.profiles.active", "label": "Spring Profiles Active(Message)", "value": "hz-client,http_server", "format": "^([a-zA-Z_,-])", "hidden": true, "datatype": "String", "fileName": null, "mandatory": true, "listvalues": null}, {"field": "counters.to.be.collected", "label": "Counters To Be Collected", "value": "IPC,TRANSACTION_TYPE,PAYMENT_TYPE", "format": "", "hidden": true, "datatype": "String", "mandatory": true, "listvalues": null}], "network": [{"field": "server.port", "label": "Server Port(Network)", "value": "${server_port:8031}", "format": "", "hidden": "true", "datatype": "String", "mandatory": "true"}, {"field": "component.type", "label": "Component Type(Network)", "value": "L1_JSON", "format": "^([a-zA-Z0-9_-])", "hidden": false, "datatype": "String", "mandatory": true, "listvalues": null}, {"field": "spring.profiles.active", "label": "Spring Profiles Active(Network)", "value": "hz-client,http_server", "format": "^([a-zA-Z_,-])", "hidden": true, "datatype": "String", "fileName": null, "mandatory": true, "listvalues": null}]}, "l3configuration": {"message": [{"field": "server.port", "label": "Server Port(Message)", "value": "${server_port:8071}", "format": "", "hidden": "true", "datatype": "String", "mandatory": "true"}, {"field": "component.type", "label": "Component Type(Message)", "value": "L3_JSON", "format": "^([a-zA-Z0-9_-])", "hidden": false, "datatype": "String", "mandatory": true, "listvalues": null}, {"field": "spring.profiles.active", "label": "Spring Profiles Active(Message)", "value": "hz-client,http_server", "format": "^([a-zA-Z_,-])", "hidden": true, "datatype": "String", "fileName": null, "mandatory": true, "listvalues": null}, {"field": "counters.to.be.collected", "label": "Counters To Be Collected", "value": "IPC,TRANSACTION_TYPE,PAYMENT_TYPE", "format": "", "hidden": true, "datatype": "String", "mandatory": true, "listvalues": null}], "network": [{"field": "component.service.type", "label": "Service Type", "value": "GATEWAY_SERVICE", "format": "^([a-zA-Z_-])", "hidden": "false", "datatype": "String", "mandatory": "true", "listvalues": ["DB_QUERY:(select value from lookup_value where lookup_type in (select id from lookup_type where name = \'SERVICE_TYPE\'))"]}, {"field": "server.port", "label": "Server Port(Network)", "value": "${server_port:8031}", "format": "", "hidden": "true", "datatype": "String", "mandatory": "true"}, {"field": "component.type", "label": "Component Type(Network)", "value": "L3_JSON", "format": "^([a-zA-Z0-9_-])", "hidden": false, "datatype": "String", "mandatory": true, "listvalues": null}, {"field": "spring.profiles.active", "label": "Spring Profiles Active(Network)", "value": "hz-client,http_server", "format": "^([a-zA-Z_,-])", "hidden": true, "datatype": "String", "fileName": null, "mandatory": true, "listvalues": null}]}}',
      messageStandard: {
        id: -1,
        value: 'JSON',
        description: 'JSON',
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
        id: 26,
        value: 'JSON',
        description: 'JSON',
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
    {
      id: 6,
      properties:
        '{"l1configuration": {"message": [{"field": "server.port", "label": "Server Port", "value": "9991", "format": "^([0-9_-]){4,6}$", "hidden": true, "datatype": "int", "fileName": null, "mandatory": true, "listvalues": null}, {"field": "component.type", "label": "Component Type", "value": "SOAP", "format": "^([a-zA-Z_-])", "hidden": false, "datatype": "String", "fileName": null, "mandatory": true, "listvalues": null}, {"field": "component.name", "label": "Component Name(Message)", "value": "eft_adapter", "format": "^([a-zA-Z_-])", "hidden": false, "datatype": "String", "fileName": null, "mandatory": true, "listvalues": null}], "network": [{"field": "server.port", "label": "Server Port(Network)", "value": "9992", "format": "^([0-9_-]){4,6}$", "hidden": true, "datatype": "int", "fileName": null, "mandatory": true, "listvalues": null}, {"field": "component.name", "label": "Component Name(Network)", "value": "eft_adapter", "format": "^([a-zA-Z_-])", "hidden": false, "datatype": "String", "fileName": null, "mandatory": true, "listvalues": null}, {"field": "spring.profiles.active", "label": "Spring Profiles Active", "value": "hz-client,soap_server", "format": "^([a-zA-Z_,-])", "hidden": true, "datatype": "String", "fileName": null, "mandatory": true, "listvalues": null}, {"field": "service.impl.class", "label": "Service Impl Class", "value": "com.bnt.adapter.common.EFTServicePortImpl", "format": "", "hidden": false, "datatype": "String", "fileName": null, "mandatory": true, "listvalues": null}, {"field": "url.mapping", "label": "Url Mapping", "value": "/cxf/vca/*", "format": "", "hidden": false, "datatype": "String", "fileName": null, "mandatory": true, "listvalues": null}, {"field": "endpoint.address", "label": "Endpoint Address", "value": "/eft", "format": "", "hidden": false, "datatype": "String", "fileName": null, "mandatory": true, "listvalues": null}]}}',
      messageStandard: {
        id: 57,
        value: 'SOAP',
        description: 'SOAP',
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
        id: 27,
        value: 'SOAP',
        description: 'SOAP',
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
    {
      id: 5,
      properties:
        '{"l1configuration": {"message": [{"field": "server.port", "label": "Server Port", "value": "0000", "format": "^([0-9_-]){4,6}$", "hidden": "true", "datatype": "int", "mandatory": "true"}, {"field": "component.type", "label": "Component Type", "value": "JSON", "format": "^([a-zA-Z_-])", "hidden": false, "datatype": "String", "mandatory": true, "listvalues": null}, {"field": "component.name", "label": "Component Name(Message)", "value": "atm_adapter", "format": "^([a-zA-Z_-])", "hidden": false, "datatype": "String", "mandatory": true, "listvalues": null}, {"field": "component.iso.header.value", "label": "ISO Header Value(Message)", "value": "", "format": "^([A-Za-z0-9_\\\\-\\\\.])", "hidden": "false", "datatype": "String", "mandatory": "true"}], "network": [{"field": "tcp.mode", "label": "TCP Mode", "value": "client", "format": "^([a-z])", "hidden": false, "datatype": "String", "mandatory": true, "listvalues": ["server", "client"]}, {"field": "component.iso.header.value", "label": "ISO Header Value(Network)", "value": "", "format": "^([A-Za-z0-9_\\\\-\\\\.])", "hidden": "false", "datatype": "String", "mandatory": "true"}, {"field": "component.service.type", "label": "Service Type", "value": "GATEWAY_SERVICE", "format": "^([a-zA-Z_-])", "hidden": "true", "datatype": "String", "mandatory": "true"}, {"field": "tcp.server.port", "label": "TCP Server Port", "value": "7070", "format": "^([0-9_-]){4,6}$", "hidden": "false", "datatype": "int", "mandatory": "true"}, {"field": "tcp.to.channel.core.pool.size", "label": "TCP TO Channel Core Pool Size", "value": "100", "format": "^([0-9_-])", "hidden": "true", "datatype": "int", "mandatory": "true"}, {"field": "tcp.from.channel.core.pool.size", "label": "TCP FROM Channel Core Pool Size", "value": "100", "format": "^([0-9_-])", "hidden": "true", "datatype": "int", "mandatory": "true"}, {"field": "tcp.server.header.length", "label": "Message Length Bytes", "value": "2", "format": "^([0-9_-])", "hidden": "false", "datatype": "String", "mandatory": "true", "listvalues": ["2", "4"]}, {"field": "tcp.serialzer.type", "label": "TCP Serializer Type", "value": "FIRST", "format": "^([a-zA-Z_-])", "hidden": "true", "datatype": "String", "mandatory": "true", "listvalues": ["FIRST", "SECOND"]}, {"field": "tcp.server.ssl.keystore.password", "label": "TCP SSL Keystore Password", "value": "", "format": "^([a-zA-Z0-9_-])", "hidden": "false", "datatype": "password", "mandatory": "true"}, {"field": "tcp.ssl.keystore.path", "label": "TCP SSL Keystore Path", "value": "", "format": "", "hidden": "false", "datatype": "file", "fileName": "", "mandatory": "true", "listvalues": [".JKS"]}, {"field": "server.request.sla.time", "label": "Server Request SLA Time", "value": "40000", "format": "^([0-9_-])", "hidden": "true", "datatype": "int", "mandatory": "true"}, {"field": "server.connection.threshold", "label": "Server Connection Threshold", "value": "1000000000", "format": "^([0-9_-])", "hidden": "true", "datatype": "int", "mandatory": "true"}, {"field": "server.connection.threshold.time", "label": "Server Connection Threshold Time", "value": "1", "format": "^([0-9_-])", "hidden": "true", "datatype": "int", "mandatory": "true"}, {"field": "server.total.threshold", "label": "Server Total Threshold", "value": "100000000", "format": "^([0-9_-])", "hidden": "true", "datatype": "int", "mandatory": "true"}, {"field": "server.total.threshold.time", "label": "Server Total Threshold Time", "value": "1", "format": "^([0-9_-])", "hidden": "true", "datatype": "int", "mandatory": "true"}, {"field": "component.name", "label": "Component Name(Network)", "value": "atm_adapter", "format": "^([a-zA-Z_-])", "hidden": false, "datatype": "String", "mandatory": true, "listvalues": null}, {"field": "server.connection.threshold.time.unit", "label": "Server Connection Threshold Time Unit", "value": "HOURS", "format": "^([a-zA-Z_-])", "hidden": false, "datatype": "String", "mandatory": true, "listvalues": ["HOURS", "MINUTES", "SECONDS"]}, {"field": "server.total.threshold.time.unit", "label": "Server Total Threshold Time Unit", "value": "HOURS", "format": "^([a-zA-Z_-])", "hidden": false, "datatype": "String", "mandatory": true, "listvalues": ["HOURS", "MINUTES", "SECONDS"]}]}, "l3configuration": {"message": [{"field": "server.port", "label": "Server Port", "value": "0000", "format": "^([0-9_-]){4,6}$", "hidden": "true", "datatype": "int", "mandatory": "true"}, {"field": "component.type", "label": "Component Type", "value": "JSON", "format": "^([a-zA-Z_-])", "hidden": false, "datatype": "String", "mandatory": true, "listvalues": null}, {"field": "component.name", "label": "Component Name(Message)", "value": "atm_adapter", "format": "^([a-zA-Z_-])", "hidden": false, "datatype": "String", "mandatory": true, "listvalues": null}, {"field": "iso.msg.direction", "label": "ISO MSG DIRECTION(Message)", "value": "2", "format": "", "hidden": true, "datatype": "int", "mandatory": true, "listvalues": null}], "network": [{"field": "tcp.mode", "label": "TCP Mode", "value": "client", "format": "^([a-z])", "hidden": false, "datatype": "String", "mandatory": true, "listvalues": ["server", "client"]}, {"field": "component.iso.header.value", "label": "ISO Header Value", "value": "", "format": "^([A-Za-z0-9_\\\\-\\\\.])", "hidden": "false", "datatype": "String", "mandatory": "true"}, {"field": "component.service.type", "label": "Service Type", "value": "GATEWAY_SERVICE", "format": "^([a-zA-Z_-])", "hidden": "false", "datatype": "String", "mandatory": "true", "listvalues": ["DB_QUERY:(select value from lookup_value where lookup_type in (select id from lookup_type where name = \'SERVICE_TYPE\'))"]}, {"field": "tcp.server.port", "label": "TCP Server Port", "value": "7070", "format": "^([0-9_-]){4,6}$", "hidden": "false", "datatype": "int", "mandatory": "true"}, {"field": "tcp.to.channel.core.pool.size", "label": "TCP TO Channel Core Pool Size", "value": "100", "format": "^([0-9_-])", "hidden": "true", "datatype": "int", "mandatory": "true"}, {"field": "tcp.from.channel.core.pool.size", "label": "TCP FROM Channel Core Pool Size", "value": "100", "format": "^([0-9_-])", "hidden": "true", "datatype": "int", "mandatory": "true"}, {"field": "tcp.server.header.length", "label": "Message Length Bytes", "value": "2", "format": "^([0-9_-])", "hidden": "false", "datatype": "String", "mandatory": "true", "listvalues": ["2", "4"]}, {"field": "tcp.serialzer.type", "label": "TCP Serializer Type", "value": "FIRST", "format": "^([a-zA-Z_-])", "hidden": "true", "datatype": "String", "mandatory": "true", "listvalues": ["FIRST", "SECOND"]}, {"field": "tcp.server.ssl.keystore.password", "label": "TCP SSL Keystore Password", "value": "", "format": "^([a-zA-Z0-9_-])", "hidden": "false", "datatype": "password", "mandatory": "true"}, {"field": "tcp.ssl.keystore.path", "label": "TCP SSL Keystore Path", "value": "", "format": "", "hidden": "false", "datatype": "file", "fileName": "", "mandatory": "true", "listvalues": [".JKS"]}, {"field": "server.request.sla.time", "label": "Server Request SLA Time", "value": "40000", "format": "^([0-9_-])", "hidden": "true", "datatype": "int", "mandatory": "true"}, {"field": "server.connection.threshold", "label": "Server Connection Threshold", "value": "1000000000", "format": "^([0-9_-])", "hidden": "true", "datatype": "int", "mandatory": "true"}, {"field": "server.connection.threshold.time", "label": "Server Connection Threshold Time", "value": "1", "format": "^([0-9_-])", "hidden": "true", "datatype": "int", "mandatory": "true"}, {"field": "server.total.threshold", "label": "Server Total Threshold", "value": "100000000", "format": "^([0-9_-])", "hidden": "true", "datatype": "int", "mandatory": "true"}, {"field": "server.total.threshold.time", "label": "Server Total Threshold Time", "value": "1", "format": "^([0-9_-])", "hidden": "true", "datatype": "int", "mandatory": "true"}, {"field": "component.name", "label": "Component Name(Network)", "value": "atm_adapter", "format": "^([a-zA-Z_-])", "hidden": false, "datatype": "String", "mandatory": true, "listvalues": null}, {"field": "server.connection.threshold.time.unit", "label": "Server Connection Threshold Time Unit", "value": "HOURS", "format": "^([a-zA-Z_-])", "hidden": false, "datatype": "String", "mandatory": true, "listvalues": ["HOURS", "MINUTES", "SECONDS"]}, {"field": "server.total.threshold.time.unit", "label": "Server Total Threshold Time Unit", "value": "HOURS", "format": "^([a-zA-Z_-])", "hidden": false, "datatype": "String", "mandatory": true, "listvalues": ["HOURS", "MINUTES", "SECONDS"]}, {"field": "iso.msg.direction", "label": "ISO MSG DIRECTION(Network)", "value": "2", "format": "", "hidden": true, "datatype": "int", "mandatory": true, "listvalues": null}]}}',
      messageStandard: {
        id: 46,
        value: 'ISO8583-v2003 (BINARY)',
        description: null,
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
        id: 24,
        value: 'ISO-8583',
        description: 'ISO 8583',
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
        id: 28,
        value: 'TCP',
        description: 'TCP',
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
    {
      id: 4,
      properties:
        '{"l1configuration": {"message": [{"field": "server.port", "label": "Server Port", "value": "0000", "format": "^([0-9_-]){4,6}$", "hidden": "true", "datatype": "int", "mandatory": "true"}, {"field": "component.type", "label": "Component Type", "value": "JSON", "format": "^([a-zA-Z_-])", "hidden": false, "datatype": "String", "mandatory": true, "listvalues": null}, {"field": "component.name", "label": "Component Name(Message)", "value": "atm_adapter", "format": "^([a-zA-Z_-])", "hidden": false, "datatype": "String", "mandatory": true, "listvalues": null}, {"field": "component.iso.header.value", "label": "ISO Header Value(Message)", "value": "", "format": "^([A-Za-z0-9_\\\\-\\\\.])", "hidden": "false", "datatype": "String", "mandatory": "true"}], "network": [{"field": "tcp.mode", "label": "TCP Mode", "value": "client", "format": "^([a-z])", "hidden": false, "datatype": "String", "mandatory": true, "listvalues": ["server", "client"]}, {"field": "component.iso.header.value", "label": "ISO Header Value(Network)", "value": "", "format": "^([A-Za-z0-9_\\\\-\\\\.])", "hidden": "false", "datatype": "String", "mandatory": "true"}, {"field": "component.service.type", "label": "Service Type", "value": "GATEWAY_SERVICE", "format": "^([a-zA-Z_-])", "hidden": "true", "datatype": "String", "mandatory": "true"}, {"field": "tcp.server.port", "label": "TCP Server Port", "value": "7070", "format": "^([0-9_-]){4,6}$", "hidden": "false", "datatype": "int", "mandatory": "true"}, {"field": "tcp.to.channel.core.pool.size", "label": "TCP TO Channel Core Pool Size", "value": "100", "format": "^([0-9_-])", "hidden": "true", "datatype": "int", "mandatory": "true"}, {"field": "tcp.from.channel.core.pool.size", "label": "TCP FROM Channel Core Pool Size", "value": "100", "format": "^([0-9_-])", "hidden": "true", "datatype": "int", "mandatory": "true"}, {"field": "tcp.server.header.length", "label": "Message Length Bytes", "value": "2", "format": "^([0-9_-])", "hidden": "false", "datatype": "String", "mandatory": "true", "listvalues": ["2", "4"]}, {"field": "tcp.serialzer.type", "label": "TCP Serializer Type", "value": "FIRST", "format": "^([a-zA-Z_-])", "hidden": "true", "datatype": "String", "mandatory": "true", "listvalues": ["FIRST", "SECOND"]}, {"field": "tcp.server.ssl.keystore.password", "label": "TCP SSL Keystore Password", "value": "", "format": "^([a-zA-Z0-9_-])", "hidden": "false", "datatype": "password", "mandatory": "true"}, {"field": "tcp.ssl.keystore.path", "label": "TCP SSL Keystore Path", "value": "", "format": "", "hidden": "false", "datatype": "file", "fileName": "", "mandatory": "true", "listvalues": [".JKS"]}, {"field": "server.request.sla.time", "label": "Server Request SLA Time", "value": "40000", "format": "^([0-9_-])", "hidden": "true", "datatype": "int", "mandatory": "true"}, {"field": "server.connection.threshold", "label": "Server Connection Threshold", "value": "1000000000", "format": "^([0-9_-])", "hidden": "true", "datatype": "int", "mandatory": "true"}, {"field": "server.connection.threshold.time", "label": "Server Connection Threshold Time", "value": "1", "format": "^([0-9_-])", "hidden": "true", "datatype": "int", "mandatory": "true"}, {"field": "server.total.threshold", "label": "Server Total Threshold", "value": "100000000", "format": "^([0-9_-])", "hidden": "true", "datatype": "int", "mandatory": "true"}, {"field": "server.total.threshold.time", "label": "Server Total Threshold Time", "value": "1", "format": "^([0-9_-])", "hidden": "true", "datatype": "int", "mandatory": "true"}, {"field": "component.name", "label": "Component Name(Network)", "value": "atm_adapter", "format": "^([a-zA-Z_-])", "hidden": false, "datatype": "String", "mandatory": true, "listvalues": null}, {"field": "server.connection.threshold.time.unit", "label": "Server Connection Threshold Time Unit", "value": "HOURS", "format": "^([a-zA-Z_-])", "hidden": false, "datatype": "String", "mandatory": true, "listvalues": ["HOURS", "MINUTES", "SECONDS"]}, {"field": "server.total.threshold.time.unit", "label": "Server Total Threshold Time Unit", "value": "HOURS", "format": "^([a-zA-Z_-])", "hidden": false, "datatype": "String", "mandatory": true, "listvalues": ["HOURS", "MINUTES", "SECONDS"]}]}, "l3configuration": {"message": [{"field": "server.port", "label": "Server Port", "value": "0000", "format": "^([0-9_-]){4,6}$", "hidden": "true", "datatype": "int", "mandatory": "true"}, {"field": "component.type", "label": "Component Type", "value": "JSON", "format": "^([a-zA-Z_-])", "hidden": false, "datatype": "String", "mandatory": true, "listvalues": null}, {"field": "component.name", "label": "Component Name(Message)", "value": "atm_adapter", "format": "^([a-zA-Z_-])", "hidden": false, "datatype": "String", "mandatory": true, "listvalues": null}, {"field": "iso.msg.direction", "label": "ISO MSG DIRECTION(Message)", "value": "2", "format": "", "hidden": true, "datatype": "int", "mandatory": true, "listvalues": null}], "network": [{"field": "tcp.mode", "label": "TCP Mode", "value": "client", "format": "^([a-z])", "hidden": false, "datatype": "String", "mandatory": true, "listvalues": ["server", "client"]}, {"field": "component.iso.header.value", "label": "ISO Header Value", "value": "", "format": "^([A-Za-z0-9_\\\\-\\\\.])", "hidden": "false", "datatype": "String", "mandatory": "true"}, {"field": "component.service.type", "label": "Service Type", "value": "GATEWAY_SERVICE", "format": "^([a-zA-Z_-])", "hidden": "false", "datatype": "String", "mandatory": "true", "listvalues": ["DB_QUERY:(select value from lookup_value where lookup_type in (select id from lookup_type where name = \'SERVICE_TYPE\'))"]}, {"field": "tcp.server.port", "label": "TCP Server Port", "value": "7070", "format": "^([0-9_-]){4,6}$", "hidden": "false", "datatype": "int", "mandatory": "true"}, {"field": "tcp.to.channel.core.pool.size", "label": "TCP TO Channel Core Pool Size", "value": "100", "format": "^([0-9_-])", "hidden": "true", "datatype": "int", "mandatory": "true"}, {"field": "tcp.from.channel.core.pool.size", "label": "TCP FROM Channel Core Pool Size", "value": "100", "format": "^([0-9_-])", "hidden": "true", "datatype": "int", "mandatory": "true"}, {"field": "tcp.server.header.length", "label": "Message Length Bytes", "value": "2", "format": "^([0-9_-])", "hidden": "false", "datatype": "String", "mandatory": "true", "listvalues": ["2", "4"]}, {"field": "tcp.serialzer.type", "label": "TCP Serializer Type", "value": "FIRST", "format": "^([a-zA-Z_-])", "hidden": "true", "datatype": "String", "mandatory": "true", "listvalues": ["FIRST", "SECOND"]}, {"field": "tcp.server.ssl.keystore.password", "label": "TCP SSL Keystore Password", "value": "", "format": "^([a-zA-Z0-9_-])", "hidden": "false", "datatype": "password", "mandatory": "true"}, {"field": "tcp.ssl.keystore.path", "label": "TCP SSL Keystore Path", "value": "", "format": "", "hidden": "false", "datatype": "file", "fileName": "", "mandatory": "true", "listvalues": [".JKS"]}, {"field": "server.request.sla.time", "label": "Server Request SLA Time", "value": "40000", "format": "^([0-9_-])", "hidden": "true", "datatype": "int", "mandatory": "true"}, {"field": "server.connection.threshold", "label": "Server Connection Threshold", "value": "1000000000", "format": "^([0-9_-])", "hidden": "true", "datatype": "int", "mandatory": "true"}, {"field": "server.connection.threshold.time", "label": "Server Connection Threshold Time", "value": "1", "format": "^([0-9_-])", "hidden": "true", "datatype": "int", "mandatory": "true"}, {"field": "server.total.threshold", "label": "Server Total Threshold", "value": "100000000", "format": "^([0-9_-])", "hidden": "true", "datatype": "int", "mandatory": "true"}, {"field": "server.total.threshold.time", "label": "Server Total Threshold Time", "value": "1", "format": "^([0-9_-])", "hidden": "true", "datatype": "int", "mandatory": "true"}, {"field": "component.name", "label": "Component Name(Network)", "value": "atm_adapter", "format": "^([a-zA-Z_-])", "hidden": false, "datatype": "String", "mandatory": true, "listvalues": null}, {"field": "server.connection.threshold.time.unit", "label": "Server Connection Threshold Time Unit", "value": "HOURS", "format": "^([a-zA-Z_-])", "hidden": false, "datatype": "String", "mandatory": true, "listvalues": ["HOURS", "MINUTES", "SECONDS"]}, {"field": "server.total.threshold.time.unit", "label": "Server Total Threshold Time Unit", "value": "HOURS", "format": "^([a-zA-Z_-])", "hidden": false, "datatype": "String", "mandatory": true, "listvalues": ["HOURS", "MINUTES", "SECONDS"]}, {"field": "iso.msg.direction", "label": "ISO MSG DIRECTION(Network)", "value": "2", "format": "", "hidden": true, "datatype": "int", "mandatory": true, "listvalues": null}]}}',
      messageStandard: {
        id: 45,
        value: 'ISO8583-v1993 (BINARY)',
        description: null,
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
        id: 24,
        value: 'ISO-8583',
        description: 'ISO 8583',
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
        id: 28,
        value: 'TCP',
        description: 'TCP',
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
    {
      id: 3,
      properties:
        '{"l1configuration": {"message": [{"field": "server.port", "label": "Server Port", "value": "0000", "format": "^([0-9_-]){4,6}$", "hidden": "true", "datatype": "int", "mandatory": "true"}, {"field": "component.type", "label": "Component Type", "value": "JSON", "format": "^([a-zA-Z_-])", "hidden": false, "datatype": "String", "mandatory": true, "listvalues": null}, {"field": "component.name", "label": "Component Name(Message)", "value": "atm_adapter", "format": "^([a-zA-Z_-])", "hidden": false, "datatype": "String", "mandatory": true, "listvalues": null}, {"field": "component.iso.header.value", "label": "ISO Header Value(Message)", "value": "", "format": "^([A-Za-z0-9_\\\\-\\\\.])", "hidden": "false", "datatype": "String", "mandatory": "true"}], "network": [{"field": "tcp.mode", "label": "TCP Mode", "value": "client", "format": "^([a-z])", "hidden": false, "datatype": "String", "mandatory": true, "listvalues": ["server", "client"]}, {"field": "component.iso.header.value", "label": "ISO Header Value(Network)", "value": "", "format": "^([A-Za-z0-9_\\\\-\\\\.])", "hidden": "false", "datatype": "String", "mandatory": "true"}, {"field": "component.service.type", "label": "Service Type", "value": "GATEWAY_SERVICE", "format": "^([a-zA-Z_-])", "hidden": "true", "datatype": "String", "mandatory": "true"}, {"field": "tcp.server.port", "label": "TCP Server Port", "value": "7070", "format": "^([0-9_-]){4,6}$", "hidden": "false", "datatype": "int", "mandatory": "true"}, {"field": "tcp.to.channel.core.pool.size", "label": "TCP TO Channel Core Pool Size", "value": "100", "format": "^([0-9_-])", "hidden": "true", "datatype": "int", "mandatory": "true"}, {"field": "tcp.from.channel.core.pool.size", "label": "TCP FROM Channel Core Pool Size", "value": "100", "format": "^([0-9_-])", "hidden": "true", "datatype": "int", "mandatory": "true"}, {"field": "tcp.server.header.length", "label": "Message Length Bytes", "value": "2", "format": "^([0-9_-])", "hidden": "false", "datatype": "String", "mandatory": "true", "listvalues": ["2", "4"]}, {"field": "tcp.serialzer.type", "label": "TCP Serializer Type", "value": "FIRST", "format": "^([a-zA-Z_-])", "hidden": "true", "datatype": "String", "mandatory": "true", "listvalues": ["FIRST", "SECOND"]}, {"field": "tcp.server.ssl.keystore.password", "label": "TCP SSL Keystore Password", "value": "", "format": "^([a-zA-Z0-9_-])", "hidden": "false", "datatype": "password", "mandatory": "true"}, {"field": "tcp.ssl.keystore.path", "label": "TCP SSL Keystore Path", "value": "", "format": "", "hidden": "false", "datatype": "file", "fileName": "", "mandatory": "true", "listvalues": [".JKS"]}, {"field": "server.request.sla.time", "label": "Server Request SLA Time", "value": "40000", "format": "^([0-9_-])", "hidden": "true", "datatype": "int", "mandatory": "true"}, {"field": "server.connection.threshold", "label": "Server Connection Threshold", "value": "1000000000", "format": "^([0-9_-])", "hidden": "true", "datatype": "int", "mandatory": "true"}, {"field": "server.connection.threshold.time", "label": "Server Connection Threshold Time", "value": "1", "format": "^([0-9_-])", "hidden": "true", "datatype": "int", "mandatory": "true"}, {"field": "server.total.threshold", "label": "Server Total Threshold", "value": "100000000", "format": "^([0-9_-])", "hidden": "true", "datatype": "int", "mandatory": "true"}, {"field": "server.total.threshold.time", "label": "Server Total Threshold Time", "value": "1", "format": "^([0-9_-])", "hidden": "true", "datatype": "int", "mandatory": "true"}, {"field": "component.name", "label": "Component Name(Network)", "value": "atm_adapter", "format": "^([a-zA-Z_-])", "hidden": false, "datatype": "String", "mandatory": true, "listvalues": null}, {"field": "server.connection.threshold.time.unit", "label": "Server Connection Threshold Time Unit", "value": "HOURS", "format": "^([a-zA-Z_-])", "hidden": false, "datatype": "String", "mandatory": true, "listvalues": ["HOURS", "MINUTES", "SECONDS"]}, {"field": "server.total.threshold.time.unit", "label": "Server Total Threshold Time Unit", "value": "HOURS", "format": "^([a-zA-Z_-])", "hidden": false, "datatype": "String", "mandatory": true, "listvalues": ["HOURS", "MINUTES", "SECONDS"]}]}, "l3configuration": {"message": [{"field": "server.port", "label": "Server Port", "value": "0000", "format": "^([0-9_-]){4,6}$", "hidden": "true", "datatype": "int", "mandatory": "true"}, {"field": "component.type", "label": "Component Type", "value": "JSON", "format": "^([a-zA-Z_-])", "hidden": false, "datatype": "String", "mandatory": true, "listvalues": null}, {"field": "component.name", "label": "Component Name(Message)", "value": "atm_adapter", "format": "^([a-zA-Z_-])", "hidden": false, "datatype": "String", "mandatory": true, "listvalues": null}, {"field": "iso.msg.direction", "label": "ISO MSG DIRECTION(Message)", "value": "2", "format": "", "hidden": true, "datatype": "int", "mandatory": true, "listvalues": null}], "network": [{"field": "tcp.mode", "label": "TCP Mode", "value": "client", "format": "^([a-z])", "hidden": false, "datatype": "String", "mandatory": true, "listvalues": ["server", "client"]}, {"field": "component.iso.header.value", "label": "ISO Header Value", "value": "", "format": "^([A-Za-z0-9_\\\\-\\\\.])", "hidden": "false", "datatype": "String", "mandatory": "true"}, {"field": "component.service.type", "label": "Service Type", "value": "GATEWAY_SERVICE", "format": "^([a-zA-Z_-])", "hidden": "false", "datatype": "String", "mandatory": "true", "listvalues": ["DB_QUERY:(select value from lookup_value where lookup_type in (select id from lookup_type where name = \'SERVICE_TYPE\'))"]}, {"field": "tcp.server.port", "label": "TCP Server Port", "value": "7070", "format": "^([0-9_-]){4,6}$", "hidden": "false", "datatype": "int", "mandatory": "true"}, {"field": "tcp.to.channel.core.pool.size", "label": "TCP TO Channel Core Pool Size", "value": "100", "format": "^([0-9_-])", "hidden": "true", "datatype": "int", "mandatory": "true"}, {"field": "tcp.from.channel.core.pool.size", "label": "TCP FROM Channel Core Pool Size", "value": "100", "format": "^([0-9_-])", "hidden": "true", "datatype": "int", "mandatory": "true"}, {"field": "tcp.server.header.length", "label": "Message Length Bytes", "value": "2", "format": "^([0-9_-])", "hidden": "false", "datatype": "String", "mandatory": "true", "listvalues": ["2", "4"]}, {"field": "tcp.serialzer.type", "label": "TCP Serializer Type", "value": "FIRST", "format": "^([a-zA-Z_-])", "hidden": "true", "datatype": "String", "mandatory": "true", "listvalues": ["FIRST", "SECOND"]}, {"field": "tcp.server.ssl.keystore.password", "label": "TCP SSL Keystore Password", "value": "", "format": "^([a-zA-Z0-9_-])", "hidden": "false", "datatype": "password", "mandatory": "true"}, {"field": "tcp.ssl.keystore.path", "label": "TCP SSL Keystore Path", "value": "", "format": "", "hidden": "false", "datatype": "file", "fileName": "", "mandatory": "true", "listvalues": [".JKS"]}, {"field": "server.request.sla.time", "label": "Server Request SLA Time", "value": "40000", "format": "^([0-9_-])", "hidden": "true", "datatype": "int", "mandatory": "true"}, {"field": "server.connection.threshold", "label": "Server Connection Threshold", "value": "1000000000", "format": "^([0-9_-])", "hidden": "true", "datatype": "int", "mandatory": "true"}, {"field": "server.connection.threshold.time", "label": "Server Connection Threshold Time", "value": "1", "format": "^([0-9_-])", "hidden": "true", "datatype": "int", "mandatory": "true"}, {"field": "server.total.threshold", "label": "Server Total Threshold", "value": "100000000", "format": "^([0-9_-])", "hidden": "true", "datatype": "int", "mandatory": "true"}, {"field": "server.total.threshold.time", "label": "Server Total Threshold Time", "value": "1", "format": "^([0-9_-])", "hidden": "true", "datatype": "int", "mandatory": "true"}, {"field": "component.name", "label": "Component Name(Network)", "value": "atm_adapter", "format": "^([a-zA-Z_-])", "hidden": false, "datatype": "String", "mandatory": true, "listvalues": null}, {"field": "server.connection.threshold.time.unit", "label": "Server Connection Threshold Time Unit", "value": "HOURS", "format": "^([a-zA-Z_-])", "hidden": false, "datatype": "String", "mandatory": true, "listvalues": ["HOURS", "MINUTES", "SECONDS"]}, {"field": "server.total.threshold.time.unit", "label": "Server Total Threshold Time Unit", "value": "HOURS", "format": "^([a-zA-Z_-])", "hidden": false, "datatype": "String", "mandatory": true, "listvalues": ["HOURS", "MINUTES", "SECONDS"]}, {"field": "iso.msg.direction", "label": "ISO MSG DIRECTION(Network)", "value": "2", "format": "", "hidden": true, "datatype": "int", "mandatory": true, "listvalues": null}]}}',
      messageStandard: {
        id: 48,
        value: 'ISO8583-v1993 (ASCII)',
        description: null,
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
        id: 28,
        value: 'TCP',
        description: 'TCP',
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
    {
      id: 2,
      properties:
        '{"l1configuration": {"message": [{"field": "server.port", "label": "Server Port", "value": "0000", "format": "^([0-9_-]){4,6}$", "hidden": "true", "datatype": "int", "mandatory": "true"}, {"field": "component.type", "label": "Component Type", "value": "JSON", "format": "^([a-zA-Z_-])", "hidden": false, "datatype": "String", "mandatory": true, "listvalues": null}, {"field": "component.name", "label": "Component Name(Message)", "value": "atm_adapter", "format": "^([a-zA-Z_-])", "hidden": false, "datatype": "String", "mandatory": true, "listvalues": null}, {"field": "component.iso.header.value", "label": "ISO Header Value(Message)", "value": "", "format": "^([A-Za-z0-9_\\\\-\\\\.])", "hidden": "false", "datatype": "String", "mandatory": "true"}], "network": [{"field": "tcp.mode", "label": "TCP Mode", "value": "client", "format": "^([a-z])", "hidden": false, "datatype": "String", "mandatory": true, "listvalues": ["server", "client"]}, {"field": "component.iso.header.value", "label": "ISO Header Value(Network)", "value": "", "format": "^([A-Za-z0-9_\\\\-\\\\.])", "hidden": "false", "datatype": "String", "mandatory": "true"}, {"field": "component.service.type", "label": "Service Type", "value": "GATEWAY_SERVICE", "format": "^([a-zA-Z_-])", "hidden": "true", "datatype": "String", "mandatory": "true"}, {"field": "tcp.server.port", "label": "TCP Server Port", "value": "7070", "format": "^([0-9_-]){4,6}$", "hidden": "false", "datatype": "int", "mandatory": "true"}, {"field": "tcp.to.channel.core.pool.size", "label": "TCP TO Channel Core Pool Size", "value": "100", "format": "^([0-9_-])", "hidden": "true", "datatype": "int", "mandatory": "true"}, {"field": "tcp.from.channel.core.pool.size", "label": "TCP FROM Channel Core Pool Size", "value": "100", "format": "^([0-9_-])", "hidden": "true", "datatype": "int", "mandatory": "true"}, {"field": "tcp.server.header.length", "label": "Message Length Bytes", "value": "2", "format": "^([0-9_-])", "hidden": "false", "datatype": "String", "mandatory": "true", "listvalues": ["2", "4"]}, {"field": "tcp.serialzer.type", "label": "TCP Serializer Type", "value": "FIRST", "format": "^([a-zA-Z_-])", "hidden": "true", "datatype": "String", "mandatory": "true", "listvalues": ["FIRST", "SECOND"]}, {"field": "tcp.server.ssl.keystore.password", "label": "TCP SSL Keystore Password", "value": "", "format": "^([a-zA-Z0-9_-])", "hidden": "false", "datatype": "password", "mandatory": "true"}, {"field": "tcp.ssl.keystore.path", "label": "TCP SSL Keystore Path", "value": "", "format": "", "hidden": "false", "datatype": "file", "fileName": "", "mandatory": "true", "listvalues": [".JKS"]}, {"field": "server.request.sla.time", "label": "Server Request SLA Time", "value": "40000", "format": "^([0-9_-])", "hidden": "true", "datatype": "int", "mandatory": "true"}, {"field": "server.connection.threshold", "label": "Server Connection Threshold", "value": "1000000000", "format": "^([0-9_-])", "hidden": "true", "datatype": "int", "mandatory": "true"}, {"field": "server.connection.threshold.time", "label": "Server Connection Threshold Time", "value": "1", "format": "^([0-9_-])", "hidden": "true", "datatype": "int", "mandatory": "true"}, {"field": "server.total.threshold", "label": "Server Total Threshold", "value": "100000000", "format": "^([0-9_-])", "hidden": "true", "datatype": "int", "mandatory": "true"}, {"field": "server.total.threshold.time", "label": "Server Total Threshold Time", "value": "1", "format": "^([0-9_-])", "hidden": "true", "datatype": "int", "mandatory": "true"}, {"field": "component.name", "label": "Component Name(Network)", "value": "atm_adapter", "format": "^([a-zA-Z_-])", "hidden": false, "datatype": "String", "mandatory": true, "listvalues": null}, {"field": "server.connection.threshold.time.unit", "label": "Server Connection Threshold Time Unit", "value": "HOURS", "format": "^([a-zA-Z_-])", "hidden": false, "datatype": "String", "mandatory": true, "listvalues": ["HOURS", "MINUTES", "SECONDS"]}, {"field": "server.total.threshold.time.unit", "label": "Server Total Threshold Time Unit", "value": "HOURS", "format": "^([a-zA-Z_-])", "hidden": false, "datatype": "String", "mandatory": true, "listvalues": ["HOURS", "MINUTES", "SECONDS"]}]}, "l3configuration": {"message": [{"field": "server.port", "label": "Server Port", "value": "0000", "format": "^([0-9_-]){4,6}$", "hidden": "true", "datatype": "int", "mandatory": "true"}, {"field": "component.type", "label": "Component Type", "value": "JSON", "format": "^([a-zA-Z_-])", "hidden": false, "datatype": "String", "mandatory": true, "listvalues": null}, {"field": "component.name", "label": "Component Name(Message)", "value": "atm_adapter", "format": "^([a-zA-Z_-])", "hidden": false, "datatype": "String", "mandatory": true, "listvalues": null}, {"field": "iso.msg.direction", "label": "ISO MSG DIRECTION(Message)", "value": "2", "format": "", "hidden": true, "datatype": "int", "mandatory": true, "listvalues": null}], "network": [{"field": "tcp.mode", "label": "TCP Mode", "value": "client", "format": "^([a-z])", "hidden": false, "datatype": "String", "mandatory": true, "listvalues": ["server", "client"]}, {"field": "component.iso.header.value", "label": "ISO Header Value", "value": "", "format": "^([A-Za-z0-9_\\\\-\\\\.])", "hidden": "false", "datatype": "String", "mandatory": "true"}, {"field": "component.service.type", "label": "Service Type", "value": "GATEWAY_SERVICE", "format": "^([a-zA-Z_-])", "hidden": "false", "datatype": "String", "mandatory": "true", "listvalues": ["DB_QUERY:(select value from lookup_value where lookup_type in (select id from lookup_type where name = \'SERVICE_TYPE\'))"]}, {"field": "tcp.server.port", "label": "TCP Server Port", "value": "7070", "format": "^([0-9_-]){4,6}$", "hidden": "false", "datatype": "int", "mandatory": "true"}, {"field": "tcp.to.channel.core.pool.size", "label": "TCP TO Channel Core Pool Size", "value": "100", "format": "^([0-9_-])", "hidden": "true", "datatype": "int", "mandatory": "true"}, {"field": "tcp.from.channel.core.pool.size", "label": "TCP FROM Channel Core Pool Size", "value": "100", "format": "^([0-9_-])", "hidden": "true", "datatype": "int", "mandatory": "true"}, {"field": "tcp.server.header.length", "label": "Message Length Bytes", "value": "2", "format": "^([0-9_-])", "hidden": "false", "datatype": "String", "mandatory": "true", "listvalues": ["2", "4"]}, {"field": "tcp.serialzer.type", "label": "TCP Serializer Type", "value": "FIRST", "format": "^([a-zA-Z_-])", "hidden": "true", "datatype": "String", "mandatory": "true", "listvalues": ["FIRST", "SECOND"]}, {"field": "tcp.server.ssl.keystore.password", "label": "TCP SSL Keystore Password", "value": "", "format": "^([a-zA-Z0-9_-])", "hidden": "false", "datatype": "password", "mandatory": "true"}, {"field": "tcp.ssl.keystore.path", "label": "TCP SSL Keystore Path", "value": "", "format": "", "hidden": "false", "datatype": "file", "fileName": "", "mandatory": "true", "listvalues": [".JKS"]}, {"field": "server.request.sla.time", "label": "Server Request SLA Time", "value": "40000", "format": "^([0-9_-])", "hidden": "true", "datatype": "int", "mandatory": "true"}, {"field": "server.connection.threshold", "label": "Server Connection Threshold", "value": "1000000000", "format": "^([0-9_-])", "hidden": "true", "datatype": "int", "mandatory": "true"}, {"field": "server.connection.threshold.time", "label": "Server Connection Threshold Time", "value": "1", "format": "^([0-9_-])", "hidden": "true", "datatype": "int", "mandatory": "true"}, {"field": "server.total.threshold", "label": "Server Total Threshold", "value": "100000000", "format": "^([0-9_-])", "hidden": "true", "datatype": "int", "mandatory": "true"}, {"field": "server.total.threshold.time", "label": "Server Total Threshold Time", "value": "1", "format": "^([0-9_-])", "hidden": "true", "datatype": "int", "mandatory": "true"}, {"field": "component.name", "label": "Component Name(Network)", "value": "atm_adapter", "format": "^([a-zA-Z_-])", "hidden": false, "datatype": "String", "mandatory": true, "listvalues": null}, {"field": "server.connection.threshold.time.unit", "label": "Server Connection Threshold Time Unit", "value": "HOURS", "format": "^([a-zA-Z_-])", "hidden": false, "datatype": "String", "mandatory": true, "listvalues": ["HOURS", "MINUTES", "SECONDS"]}, {"field": "server.total.threshold.time.unit", "label": "Server Total Threshold Time Unit", "value": "HOURS", "format": "^([a-zA-Z_-])", "hidden": false, "datatype": "String", "mandatory": true, "listvalues": ["HOURS", "MINUTES", "SECONDS"]}, {"field": "iso.msg.direction", "label": "ISO MSG DIRECTION(Network)", "value": "2", "format": "", "hidden": true, "datatype": "int", "mandatory": true, "listvalues": null}]}}',
      messageStandard: {
        id: 44,
        value: 'ISO8583-v1987 (BINARY)',
        description: null,
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
        id: 24,
        value: 'ISO-8583',
        description: 'ISO 8583',
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
        id: 28,
        value: 'TCP',
        description: 'TCP',
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
    {
      id: 1,
      properties:
        '{"l1configuration": {"message": [{"field": "server.port", "label": "Server Port", "value": "0000", "format": "^([0-9_-]){4,6}$", "hidden": "true", "datatype": "int", "mandatory": "true"}, {"field": "component.type", "label": "Component Type", "value": "JSON", "format": "^([a-zA-Z_-])", "hidden": false, "datatype": "String", "mandatory": true, "listvalues": null}, {"field": "component.name", "label": "Component Name(Message)", "value": "atm_adapter", "format": "^([a-zA-Z_-])", "hidden": false, "datatype": "String", "mandatory": true, "listvalues": null}, {"field": "component.iso.header.value", "label": "ISO Header Value(Message)", "value": "", "format": "^([A-Za-z0-9_\\\\-\\\\.])", "hidden": "false", "datatype": "String", "mandatory": "true"}], "network": [{"field": "tcp.mode", "label": "TCP Mode", "value": "client", "format": "^([a-z])", "hidden": false, "datatype": "String", "mandatory": true, "listvalues": ["server", "client"]}, {"field": "component.iso.header.value", "label": "ISO Header Value(Network)", "value": "", "format": "^([A-Za-z0-9_\\\\-\\\\.])", "hidden": "false", "datatype": "String", "mandatory": "true"}, {"field": "component.service.type", "label": "Service Type", "value": "GATEWAY_SERVICE", "format": "^([a-zA-Z_-])", "hidden": "true", "datatype": "String", "mandatory": "true"}, {"field": "tcp.server.port", "label": "TCP Server Port", "value": "7070", "format": "^([0-9_-]){4,6}$", "hidden": "false", "datatype": "int", "mandatory": "true"}, {"field": "tcp.to.channel.core.pool.size", "label": "TCP TO Channel Core Pool Size", "value": "100", "format": "^([0-9_-])", "hidden": "true", "datatype": "int", "mandatory": "true"}, {"field": "tcp.from.channel.core.pool.size", "label": "TCP FROM Channel Core Pool Size", "value": "100", "format": "^([0-9_-])", "hidden": "true", "datatype": "int", "mandatory": "true"}, {"field": "tcp.server.header.length", "label": "Message Length Bytes", "value": "2", "format": "^([0-9_-])", "hidden": "false", "datatype": "String", "mandatory": "true", "listvalues": ["2", "4"]}, {"field": "tcp.serialzer.type", "label": "TCP Serializer Type", "value": "FIRST", "format": "^([a-zA-Z_-])", "hidden": "true", "datatype": "String", "mandatory": "true", "listvalues": ["FIRST", "SECOND"]}, {"field": "tcp.server.ssl.keystore.password", "label": "TCP SSL Keystore Password", "value": "", "format": "^([a-zA-Z0-9_-])", "hidden": "false", "datatype": "password", "mandatory": "true"}, {"field": "tcp.ssl.keystore.path", "label": "TCP SSL Keystore Path", "value": "", "format": "", "hidden": "false", "datatype": "file", "fileName": "", "mandatory": "true", "listvalues": [".JKS"]}, {"field": "server.request.sla.time", "label": "Server Request SLA Time", "value": "40000", "format": "^([0-9_-])", "hidden": "true", "datatype": "int", "mandatory": "true"}, {"field": "server.connection.threshold", "label": "Server Connection Threshold", "value": "1000000000", "format": "^([0-9_-])", "hidden": "true", "datatype": "int", "mandatory": "true"}, {"field": "server.connection.threshold.time", "label": "Server Connection Threshold Time", "value": "1", "format": "^([0-9_-])", "hidden": "true", "datatype": "int", "mandatory": "true"}, {"field": "server.total.threshold", "label": "Server Total Threshold", "value": "100000000", "format": "^([0-9_-])", "hidden": "true", "datatype": "int", "mandatory": "true"}, {"field": "server.total.threshold.time", "label": "Server Total Threshold Time", "value": "1", "format": "^([0-9_-])", "hidden": "true", "datatype": "int", "mandatory": "true"}, {"field": "component.name", "label": "Component Name(Network)", "value": "atm_adapter", "format": "^([a-zA-Z_-])", "hidden": false, "datatype": "String", "mandatory": true, "listvalues": null}, {"field": "server.connection.threshold.time.unit", "label": "Server Connection Threshold Time Unit", "value": "HOURS", "format": "^([a-zA-Z_-])", "hidden": false, "datatype": "String", "mandatory": true, "listvalues": ["HOURS", "MINUTES", "SECONDS"]}, {"field": "server.total.threshold.time.unit", "label": "Server Total Threshold Time Unit", "value": "HOURS", "format": "^([a-zA-Z_-])", "hidden": false, "datatype": "String", "mandatory": true, "listvalues": ["HOURS", "MINUTES", "SECONDS"]}]}, "l3configuration": {"message": [{"field": "server.port", "label": "Server Port", "value": "0000", "format": "^([0-9_-]){4,6}$", "hidden": "true", "datatype": "int", "mandatory": "true"}, {"field": "component.type", "label": "Component Type", "value": "JSON", "format": "^([a-zA-Z_-])", "hidden": false, "datatype": "String", "mandatory": true, "listvalues": null}, {"field": "component.name", "label": "Component Name(Message)", "value": "atm_adapter", "format": "^([a-zA-Z_-])", "hidden": false, "datatype": "String", "mandatory": true, "listvalues": null}, {"field": "iso.msg.direction", "label": "ISO MSG DIRECTION(Message)", "value": "2", "format": "", "hidden": true, "datatype": "int", "mandatory": true, "listvalues": null}], "network": [{"field": "tcp.mode", "label": "TCP Mode", "value": "client", "format": "^([a-z])", "hidden": false, "datatype": "String", "mandatory": true, "listvalues": ["server", "client"]}, {"field": "component.iso.header.value", "label": "ISO Header Value", "value": "", "format": "^([A-Za-z0-9_\\\\-\\\\.])", "hidden": "false", "datatype": "String", "mandatory": "true"}, {"field": "component.service.type", "label": "Service Type", "value": "GATEWAY_SERVICE", "format": "^([a-zA-Z_-])", "hidden": "false", "datatype": "String", "mandatory": "true", "listvalues": ["DB_QUERY:(select value from lookup_value where lookup_type in (select id from lookup_type where name = \'SERVICE_TYPE\'))"]}, {"field": "tcp.server.port", "label": "TCP Server Port", "value": "7070", "format": "^([0-9_-]){4,6}$", "hidden": "false", "datatype": "int", "mandatory": "true"}, {"field": "tcp.to.channel.core.pool.size", "label": "TCP TO Channel Core Pool Size", "value": "100", "format": "^([0-9_-])", "hidden": "true", "datatype": "int", "mandatory": "true"}, {"field": "tcp.from.channel.core.pool.size", "label": "TCP FROM Channel Core Pool Size", "value": "100", "format": "^([0-9_-])", "hidden": "true", "datatype": "int", "mandatory": "true"}, {"field": "tcp.server.header.length", "label": "Message Length Bytes", "value": "2", "format": "^([0-9_-])", "hidden": "false", "datatype": "String", "mandatory": "true", "listvalues": ["2", "4"]}, {"field": "tcp.serialzer.type", "label": "TCP Serializer Type", "value": "FIRST", "format": "^([a-zA-Z_-])", "hidden": "true", "datatype": "String", "mandatory": "true", "listvalues": ["FIRST", "SECOND"]}, {"field": "tcp.server.ssl.keystore.password", "label": "TCP SSL Keystore Password", "value": "", "format": "^([a-zA-Z0-9_-])", "hidden": "false", "datatype": "password", "mandatory": "true"}, {"field": "tcp.ssl.keystore.path", "label": "TCP SSL Keystore Path", "value": "", "format": "", "hidden": "false", "datatype": "file", "fileName": "", "mandatory": "true", "listvalues": [".JKS"]}, {"field": "server.request.sla.time", "label": "Server Request SLA Time", "value": "40000", "format": "^([0-9_-])", "hidden": "true", "datatype": "int", "mandatory": "true"}, {"field": "server.connection.threshold", "label": "Server Connection Threshold", "value": "1000000000", "format": "^([0-9_-])", "hidden": "true", "datatype": "int", "mandatory": "true"}, {"field": "server.connection.threshold.time", "label": "Server Connection Threshold Time", "value": "1", "format": "^([0-9_-])", "hidden": "true", "datatype": "int", "mandatory": "true"}, {"field": "server.total.threshold", "label": "Server Total Threshold", "value": "100000000", "format": "^([0-9_-])", "hidden": "true", "datatype": "int", "mandatory": "true"}, {"field": "server.total.threshold.time", "label": "Server Total Threshold Time", "value": "1", "format": "^([0-9_-])", "hidden": "true", "datatype": "int", "mandatory": "true"}, {"field": "component.name", "label": "Component Name(Network)", "value": "atm_adapter", "format": "^([a-zA-Z_-])", "hidden": false, "datatype": "String", "mandatory": true, "listvalues": null}, {"field": "server.connection.threshold.time.unit", "label": "Server Connection Threshold Time Unit", "value": "HOURS", "format": "^([a-zA-Z_-])", "hidden": false, "datatype": "String", "mandatory": true, "listvalues": ["HOURS", "MINUTES", "SECONDS"]}, {"field": "server.total.threshold.time.unit", "label": "Server Total Threshold Time Unit", "value": "HOURS", "format": "^([a-zA-Z_-])", "hidden": false, "datatype": "String", "mandatory": true, "listvalues": ["HOURS", "MINUTES", "SECONDS"]}, {"field": "iso.msg.direction", "label": "ISO MSG DIRECTION(Network)", "value": "2", "format": "", "hidden": true, "datatype": "int", "mandatory": true, "listvalues": null}]}}',
      messageStandard: {
        id: 47,
        value: 'ISO8583-v1987 (ASCII)',
        description: null,
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
        id: 24,
        value: 'ISO-8583',
        description: 'ISO 8583',
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
        id: 28,
        value: 'TCP',
        description: 'TCP',
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
  ],
  'page-no': 1,
  'total-filtered-record': 9,
};
const row =
{"id":9,"properties":"{\"l1configuration\": {\"message\": [{\"field\": \"server.port\", \"label\": \"Servefff\", \"value\": \"${server_port:8071}\", \"format\": \"\", \"hidden\": false, \"datatype\": \"String\", \"mandatory\": false}, {\"field\": \"component.type\", \"label\": \"Component Type(Message)\", \"value\": \"L1_JSON\", \"format\": \"^([a-zA-Z0-9_-])\", \"hidden\": false, \"datatype\": \"String\", \"mandatory\": true, \"listvalues\": null}, {\"field\": \"spring.profiles.active\", \"label\": \"Spring Profiles Active(Message)\", \"value\": \"hz-client,http_server\", \"format\": \"^([a-zA-Z_,-])\", \"hidden\": true, \"datatype\": \"String\", \"fileName\": null, \"mandatory\": true, \"listvalues\": null}, {\"field\": \"counters.to.be.collected\", \"label\": \"Counters To Be Collecteds\", \"value\": \"IPC,TRANSACTION_TYPE,PAYMENT_TYPE\", \"format\": \"\", \"hidden\": true, \"datatype\": \"String\", \"mandatory\": true, \"listvalues\": null}], \"network\": [{\"field\": \"server.port\", \"label\": \"Server Port(Network)\", \"value\": \"${server_port:8031}\", \"format\": \"\", \"hidden\": \"true\", \"datatype\": \"String\", \"mandatory\": \"true\"}, {\"field\": \"component.type\", \"label\": \"Component Type(Network)\", \"value\": \"L1_JSON\", \"format\": \"^([a-zA-Z0-9_-])\", \"hidden\": false, \"datatype\": \"String\", \"mandatory\": true, \"listvalues\": null}, {\"field\": \"spring.profiles.active\", \"label\": \"Spring Profiles Active(Network)\", \"value\": \"hz-client,http_server\", \"format\": \"^([a-zA-Z_,-])\", \"hidden\": true, \"datatype\": \"String\", \"fileName\": null, \"mandatory\": true, \"listvalues\": null}]}, \"l3configuration\": {\"message\": [{\"field\": \"server.port\", \"label\": \"Server Port(Message)\", \"value\": \"${server_port:8071}\", \"format\": \"\", \"hidden\": \"true\", \"datatype\": \"String\", \"mandatory\": \"true\"}, {\"field\": \"component.type\", \"label\": \"Component Type(Message)\", \"value\": \"L3_JSON\", \"format\": \"^([a-zA-Z0-9_-])\", \"hidden\": false, \"datatype\": \"String\", \"mandatory\": true, \"listvalues\": null}, {\"field\": \"spring.profiles.active\", \"label\": \"Spring Profiles Active(Message)\", \"value\": \"hz-client,http_server\", \"format\": \"^([a-zA-Z_,-])\", \"hidden\": true, \"datatype\": \"String\", \"fileName\": null, \"mandatory\": true, \"listvalues\": null}, {\"field\": \"counters.to.be.collected\", \"label\": \"Counters To Be Collected\", \"value\": \"IPC,TRANSACTION_TYPE,PAYMENT_TYPE\", \"format\": \"\", \"hidden\": true, \"datatype\": \"String\", \"mandatory\": true, \"listvalues\": null}], \"network\": [{\"field\": \"component.service.type\", \"label\": \"Service Type\", \"value\": \"GATEWAY_SERVICE\", \"format\": \"^([a-zA-Z_-])\", \"hidden\": \"false\", \"datatype\": \"String\", \"mandatory\": \"true\", \"listvalues\": [\"DB_QUERY:(select value from lookup_value where lookup_type in (select id from lookup_type where name = 'SERVICE_TYPE'))\"]}, {\"field\": \"server.port\", \"label\": \"Server Port(Network)\", \"value\": \"${server_port:8031}\", \"format\": \"\", \"hidden\": \"true\", \"datatype\": \"String\", \"mandatory\": \"true\"}, {\"field\": \"component.type\", \"label\": \"Component Type(Network)\", \"value\": \"L3_JSON\", \"format\": \"^([a-zA-Z0-9_-])\", \"hidden\": false, \"datatype\": \"String\", \"mandatory\": true, \"listvalues\": null}, {\"field\": \"spring.profiles.active\", \"label\": \"Spring Profiles Active(Network)\", \"value\": \"hz-client,http_server\", \"format\": \"^([a-zA-Z_,-])\", \"hidden\": true, \"datatype\": \"String\", \"fileName\": null, \"mandatory\": true, \"listvalues\": null}]}}","messageStandard":{"id":189,"value":"XML-OVER-HTTP","description":"XML-OVER-HTTP","modifiable":"0","active":"1","lookupType":{"id":4,"name":"Message_Standard","description":"Message Standard","modifiable":"0"}},"messageProtocol":{"id":25,"value":"XML-OVER-HTTP","description":"XML OVER HTTP","modifiable":"0","active":"1","lookupType":{"id":5,"name":"Message_Protocol","description":"Message Protocol","modifiable":"0"}},"transmissionProtocol":{"id":29,"value":"HTTP","description":"HTTP","modifiable":"0","active":"1","lookupType":{"id":6,"name":"Transmission_Protocol","description":"Transmission Protocol","modifiable":"0"}}}
describe('MasterConfigurationComponent', () => {
  let component: MasterConfigurationComponent;
  let fixture: ComponentFixture<MasterConfigurationComponent>;
  let mockStore: MockStore<IAppState>;
  let mockselectViewSettingsList: MemoizedSelector<any, any>;
  let mockconfigurationMasterList: MemoizedSelector<any, any>;
  let translateService: TranslateService;
  const importFileService = jasmine.createSpyObj('ImportFileService', ['clearData']);
  let routerSpy = { navigate: jasmine.createSpy('navigate') };
  beforeEach(() => {
    const translateService = jasmine.createSpyObj('TranslateService', ['get', 'setDefaultLang']);
    const alertService = jasmine.createSpyObj('AlertService, SnotifyService', ['responseMessage']);
    TestBed.configureTestingModule({
      declarations: [MasterConfigurationComponent],
      providers: [
        SnotifyService,
        { provide: TranslateService, useClass: translateServiceMock },
        { provide: 'SnotifyToastConfig', useValue: {} },
        { provide: ImportFileService, useValue: importFileService },
        { provide: AlertService, useValue: alertService },
        { provide: Router, useValue: routerSpy },
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              paramMap: convertToParamMap({
                id: '1',
              }),
              data: { ruletype: 'workflow' },
            },
          },
        },
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
    mockStore = TestBed.inject(MockStore);
    fixture = TestBed.createComponent(MasterConfigurationComponent);
    component = fixture.componentInstance;

    mockselectViewSettingsList = mockStore.overrideSelector(
      selectViewSettingsList,
      selectViewSettingsListJson,
    );
    mockconfigurationMasterList = mockStore.overrideSelector(
      selectViewSettingsList,
      configurationMasterListJson,
    );
    mockStore.refreshState();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should  Angular calls ngOnInit', () => {
    mockselectViewSettingsList = mockStore.overrideSelector(
      selectViewSettingsList,
      selectViewSettingsListJson,
    );
    component.ngOnInit();
    component.viewSettingData();
    component.loadData();
    expect(component.request).toBe(false);
  });

  it('Scroll fuction should call', () => {
    const offsety = {
      isTrusted: true,
      bubbles: false,
      cancelBubble: false,
      cancelable: false,
      composed: false,
      currentTarget: 'datatable-body.datatable-body',
      defaultPrevented: false,
      eventPhase: 2,
      path: [],
      returnValue: true,
      srcElement: 'datatable-body.datatable-body',
      target: 'datatable-body.datatable-body',
      timeStamp: 7988.599999904633,
      type: 'scroll',
    };
    component.onScroll(offsety);
    expect(component.onScroll).toBeDefined;
    expect(component.onScroll).toHaveBeenCalled;
  });

  it('viewL1Data function should call from html ',  fakeAsync(()  => {
    component.viewL1Data(row);
    expect(routerSpy?.navigate).toHaveBeenCalledWith(['settings', 'config', 'details'], { state: { row, screen: 'l1' } });
  }));

  it('viewL3Data function should call from html ',  fakeAsync(()  => {
    component.viewL3Data(row);
    expect(routerSpy?.navigate).toHaveBeenCalledWith(['settings', 'config', 'details'], { state: { row, screen: 'l3' } });
  }));
  it('should Angular calls loadData', () => {
    ((component as any).loadPage(1));
    expect(component.request).not.toBeNull();
  });
  afterEach(() => {
    fixture.destroy();
  });
});
