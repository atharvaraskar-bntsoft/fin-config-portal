import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NetworkComponent } from './network.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '@app/shared/shared.module';
import { IAppState } from '@app/store/state/app.state';
import { selectViewSettingsList } from '@app/store/selectors/view-settings.selector';
import { of } from 'rxjs';
import {
  MissingTranslationHandler,
  TranslateLoader,
  TranslateModule,
  TranslateService,
} from '@ngx-translate/core';
import { MockStoreModule } from '@app/tests/tests.module';
import { HttpLoaderFactory, MyMissingTranslationHandler } from '@app/shared/shared.module';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { MemoizedSelector, Store, StoreModule } from '@ngrx/store';
import { AlertService } from '@app/services/alert.service';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { SnotifyService, ToastDefaults } from 'ng-snotify';
import { NzModalService } from 'ng-zorro-antd/modal';
import { AlertModule, DatePickerRvModule } from 'bnt';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { L1AdapterService } from '@app/services/l1-adapter.service';
import { ActivatedRoute, convertToParamMap, Router, RouterModule } from '@angular/router';
import { EventEmitter,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';
import { selectL3Network } from '@app/store/selectors/l3-adapter.selectors';
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

const selectNetworkJson =
{
  status: "success",
  message: "Find Adaptor",
  data: {
    "masterData": {
      "adapterDto": {
        "id": 27,
        "type": "L3",
        "standardMessageSpecification": {
          "id": 1,
          "messageStandard": {
            "id": 47,
            "value": "ISO8583-v1987 (ASCII)",
            "description": null,
            "modifiable": "0",
            "active": null,
            "lookupType": {
              "id": 4,
              "name": "Message_Standard",
              "description": "Message Standard",
              "modifiable": "0"
            }
          },
          "messageProtocol": {
            "id": 24,
            "value": "ISO-8583",
            "description": "ISO 8583",
            "modifiable": "0",
            "active": null,
            "lookupType": {
              "id": 5,
              "name": "Message_Protocol",
              "description": "Message Protocol",
              "modifiable": "0"
            }
          },
          "transmissionProtocol": {
            "id": 28,
            "value": "TCP",
            "description": "TCP",
            "modifiable": "0",
            "active": null,
            "lookupType": {
              "id": 6,
              "name": "Transmission_Protocol",
              "description": "Transmission Protocol",
              "modifiable": "0"
            }
          }
        },
        "name": "l3_iso_tcp_client_4jan",
        "adapterId": "l3_iso_tcp_client_4jan",
        "active": "1",
        "guid": null
      }
    },
    "schemaData": {
      "persistRequired": "0",
      "schema": "{\"template\":{\"field\":[{\"length\":\"4\",\"name\":\"MESSAGE TYPE INDICATOR\",\"id\":\"0\",\"class\":\"org.jpos.iso.IFA_NUMERIC\"},{\"length\":\"16\",\"name\":\"BIT MAP\",\"id\":\"1\",\"class\":\"org.jpos.iso.IFA_BITMAP\"},{\"length\":\"19\",\"name\":\"PAN - PRIMARY ACCOUNT NUMBER\",\"id\":\"2\",\"class\":\"org.jpos.iso.IFA_LLNUM\"},{\"length\":\"6\",\"name\":\"PROCESSING CODE\",\"id\":\"3\",\"class\":\"org.jpos.iso.IFA_NUMERIC\"},{\"length\":\"12\",\"name\":\"AMOUNT, TRANSACTION\",\"id\":\"4\",\"class\":\"org.jpos.iso.IFA_NUMERIC\"},{\"length\":\"12\",\"name\":\"AMOUNT, SETTLEMENT\",\"id\":\"5\",\"class\":\"org.jpos.iso.IFA_NUMERIC\"},{\"length\":\"12\",\"name\":\"AMOUNT, CARDHOLDER BILLING\",\"id\":\"6\",\"class\":\"org.jpos.iso.IFA_NUMERIC\"},{\"length\":\"10\",\"name\":\"TRANSMISSION DATE AND TIME\",\"id\":\"7\",\"class\":\"org.jpos.iso.IFA_NUMERIC\"},{\"length\":\"8\",\"name\":\"AMOUNT, CARDHOLDER BILLING FEE\",\"id\":\"8\",\"class\":\"org.jpos.iso.IFA_NUMERIC\"},{\"length\":\"8\",\"name\":\"CONVERSION RATE, SETTLEMENT\",\"id\":\"9\",\"class\":\"org.jpos.iso.IFA_NUMERIC\"},{\"length\":\"8\",\"name\":\"CONVERSION RATE, CARDHOLDER BILLING\",\"id\":\"10\",\"class\":\"org.jpos.iso.IFA_NUMERIC\"},{\"length\":\"6\",\"name\":\"SYSTEM TRACE AUDIT NUMBER\",\"id\":\"11\",\"class\":\"org.jpos.iso.IFA_NUMERIC\"},{\"length\":\"6\",\"name\":\"TIME, LOCAL TRANSACTION\",\"id\":\"12\",\"class\":\"org.jpos.iso.IFA_NUMERIC\"},{\"length\":\"4\",\"name\":\"DATE, LOCAL TRANSACTION\",\"id\":\"13\",\"class\":\"org.jpos.iso.IFA_NUMERIC\"},{\"length\":\"4\",\"name\":\"DATE, EXPIRATION\",\"id\":\"14\",\"class\":\"org.jpos.iso.IFA_NUMERIC\"},{\"length\":\"4\",\"name\":\"DATE, SETTLEMENT\",\"id\":\"15\",\"class\":\"org.jpos.iso.IFA_NUMERIC\"},{\"length\":\"4\",\"name\":\"DATE, CONVERSION\",\"id\":\"16\",\"class\":\"org.jpos.iso.IFA_NUMERIC\"},{\"length\":\"4\",\"name\":\"DATE, CAPTURE\",\"id\":\"17\",\"class\":\"org.jpos.iso.IFA_NUMERIC\"},{\"length\":\"4\",\"name\":\"MERCHANTS TYPE\",\"id\":\"18\",\"class\":\"org.jpos.iso.IFA_NUMERIC\"},{\"length\":\"3\",\"name\":\"ACQUIRING INSTITUTION COUNTRY CODE\",\"id\":\"19\",\"class\":\"org.jpos.iso.IFA_NUMERIC\"},{\"length\":\"3\",\"name\":\"PAN EXTENDED COUNTRY CODE\",\"id\":\"20\",\"class\":\"org.jpos.iso.IFA_NUMERIC\"},{\"length\":\"3\",\"name\":\"FORWARDING INSTITUTION COUNTRY CODE\",\"id\":\"21\",\"class\":\"org.jpos.iso.IFA_NUMERIC\"},{\"length\":\"3\",\"name\":\"POINT OF SERVICE ENTRY MODE\",\"id\":\"22\",\"class\":\"org.jpos.iso.IFA_NUMERIC\"},{\"length\":\"3\",\"name\":\"CARD SEQUENCE NUMBER\",\"id\":\"23\",\"class\":\"org.jpos.iso.IFA_NUMERIC\"},{\"length\":\"3\",\"name\":\"NETWORK INTERNATIONAL IDENTIFIER\",\"id\":\"24\",\"class\":\"org.jpos.iso.IFA_NUMERIC\"},{\"length\":\"2\",\"name\":\"POINT OF SERVICE CONDITION CODE\",\"id\":\"25\",\"class\":\"org.jpos.iso.IFA_NUMERIC\"},{\"length\":\"2\",\"name\":\"POINT OF SERVICE PIN CAPTURE CODE\",\"id\":\"26\",\"class\":\"org.jpos.iso.IFA_NUMERIC\"},{\"length\":\"1\",\"name\":\"AUTHORIZATION IDENTIFICATION RESP LEN\",\"id\":\"27\",\"class\":\"org.jpos.iso.IFA_NUMERIC\"},{\"length\":\"9\",\"name\":\"AMOUNT, TRANSACTION FEE\",\"id\":\"28\",\"class\":\"org.jpos.iso.IFA_AMOUNT\"},{\"length\":\"9\",\"name\":\"AMOUNT, SETTLEMENT FEE\",\"id\":\"29\",\"class\":\"org.jpos.iso.IFA_AMOUNT\"},{\"length\":\"9\",\"name\":\"AMOUNT, TRANSACTION PROCESSING FEE\",\"id\":\"30\",\"class\":\"org.jpos.iso.IFA_AMOUNT\"},{\"length\":\"9\",\"name\":\"AMOUNT, SETTLEMENT PROCESSING FEE\",\"id\":\"31\",\"class\":\"org.jpos.iso.IFA_AMOUNT\"},{\"length\":\"11\",\"name\":\"ACQUIRING INSTITUTION IDENT CODE\",\"id\":\"32\",\"class\":\"org.jpos.iso.IFA_LLNUM\"},{\"length\":\"11\",\"name\":\"FORWARDING INSTITUTION IDENT CODE\",\"id\":\"33\",\"class\":\"org.jpos.iso.IFA_LLNUM\"},{\"length\":\"28\",\"name\":\"PAN EXTENDED\",\"id\":\"34\",\"class\":\"org.jpos.iso.IFA_LLCHAR\"},{\"length\":\"37\",\"name\":\"TRACK 2 DATA\",\"id\":\"35\",\"class\":\"org.jpos.iso.IFA_LLNUM\"},{\"length\":\"104\",\"name\":\"TRACK 3 DATA\",\"id\":\"36\",\"class\":\"org.jpos.iso.IFA_LLLCHAR\"},{\"length\":\"12\",\"name\":\"RETRIEVAL REFERENCE NUMBER\",\"id\":\"37\",\"class\":\"org.jpos.iso.IF_CHAR\"},{\"length\":\"6\",\"name\":\"AUTHORIZATION IDENTIFICATION RESPONSE\",\"id\":\"38\",\"class\":\"org.jpos.iso.IF_CHAR\"},{\"length\":\"2\",\"name\":\"RESPONSE CODE\",\"id\":\"39\",\"class\":\"org.jpos.iso.IF_CHAR\"},{\"length\":\"3\",\"name\":\"SERVICE RESTRICTION CODE\",\"id\":\"40\",\"class\":\"org.jpos.iso.IF_CHAR\"},{\"length\":\"8\",\"name\":\"CARD ACCEPTOR TERMINAL IDENTIFICACION\",\"id\":\"41\",\"class\":\"org.jpos.iso.IF_CHAR\"},{\"length\":\"15\",\"name\":\"CARD ACCEPTOR IDENTIFICATION CODE\",\"id\":\"42\",\"class\":\"org.jpos.iso.IF_CHAR\"},{\"length\":\"40\",\"name\":\"CARD ACCEPTOR NAME/LOCATION\",\"id\":\"43\",\"class\":\"org.jpos.iso.IF_CHAR\"},{\"length\":\"25\",\"name\":\"ADDITIONAL RESPONSE DATA\",\"id\":\"44\",\"class\":\"org.jpos.iso.IFA_LLCHAR\"},{\"length\":\"76\",\"name\":\"TRACK 1 DATA\",\"id\":\"45\",\"class\":\"org.jpos.iso.IFA_LLCHAR\"},{\"length\":\"999\",\"name\":\"ADDITIONAL DATA - ISO\",\"id\":\"46\",\"class\":\"org.jpos.iso.IFA_LLLCHAR\"},{\"length\":\"999\",\"name\":\"ADDITIONAL DATA - NATIONAL\",\"id\":\"47\",\"class\":\"org.jpos.iso.IFA_LLLCHAR\"},{\"length\":\"999\",\"name\":\"ADDITIONAL DATA - PRIVATE\",\"id\":\"48\",\"class\":\"org.jpos.iso.IFA_LLLCHAR\"},{\"length\":\"3\",\"name\":\"CURRENCY CODE, TRANSACTION\",\"id\":\"49\",\"class\":\"org.jpos.iso.IF_CHAR\"},{\"length\":\"3\",\"name\":\"CURRENCY CODE, SETTLEMENT\",\"id\":\"50\",\"class\":\"org.jpos.iso.IF_CHAR\"},{\"length\":\"3\",\"name\":\"CURRENCY CODE, CARDHOLDER BILLING\",\"id\":\"51\",\"class\":\"org.jpos.iso.IF_CHAR\"},{\"length\":\"8\",\"name\":\"PIN DATA\",\"id\":\"52\",\"class\":\"org.jpos.iso.IFA_BINARY\"},{\"length\":\"16\",\"name\":\"SECURITY RELATED CONTROL INFORMATION\",\"id\":\"53\",\"class\":\"org.jpos.iso.IFA_NUMERIC\"},{\"length\":\"120\",\"name\":\"ADDITIONAL AMOUNTS\",\"id\":\"54\",\"class\":\"org.jpos.iso.IFA_LLLCHAR\"},{\"length\":\"999\",\"name\":\"RESERVED ISO\",\"id\":\"55\",\"class\":\"org.jpos.iso.IFA_LLLCHAR\"},{\"length\":\"999\",\"name\":\"RESERVED ISO\",\"id\":\"56\",\"class\":\"org.jpos.iso.IFA_LLLCHAR\"},{\"length\":\"999\",\"name\":\"RESERVED NATIONAL\",\"id\":\"57\",\"class\":\"org.jpos.iso.IFA_LLLCHAR\"},{\"length\":\"999\",\"name\":\"RESERVED NATIONAL\",\"id\":\"58\",\"class\":\"org.jpos.iso.IFA_LLLCHAR\"},{\"length\":\"999\",\"name\":\"RESERVED NATIONAL\",\"id\":\"59\",\"class\":\"org.jpos.iso.IFA_LLLCHAR\"},{\"length\":\"999\",\"name\":\"RESERVED PRIVATE\",\"id\":\"60\",\"class\":\"org.jpos.iso.IFA_LLLCHAR\"},{\"length\":\"999\",\"name\":\"RESERVED PRIVATE\",\"id\":\"61\",\"class\":\"org.jpos.iso.IFA_LLLCHAR\"},{\"length\":\"999\",\"name\":\"RESERVED PRIVATE\",\"id\":\"62\",\"class\":\"org.jpos.iso.IFA_LLLCHAR\"},{\"length\":\"999\",\"name\":\"RESERVED PRIVATE\",\"id\":\"63\",\"class\":\"org.jpos.iso.IFA_LLLCHAR\"},{\"length\":\"8\",\"name\":\"MESSAGE AUTHENTICATION CODE FIELD\",\"id\":\"64\",\"class\":\"org.jpos.iso.IFA_BINARY\"},{\"length\":\"1\",\"name\":\"BITMAP, EXTENDED\",\"id\":\"65\",\"class\":\"org.jpos.iso.IFA_BINARY\"},{\"length\":\"1\",\"name\":\"SETTLEMENT CODE\",\"id\":\"66\",\"class\":\"org.jpos.iso.IFA_NUMERIC\"},{\"length\":\"2\",\"name\":\"EXTENDED PAYMENT CODE\",\"id\":\"67\",\"class\":\"org.jpos.iso.IFA_NUMERIC\"},{\"length\":\"3\",\"name\":\"RECEIVING INSTITUTION COUNTRY CODE\",\"id\":\"68\",\"class\":\"org.jpos.iso.IFA_NUMERIC\"},{\"length\":\"3\",\"name\":\"SETTLEMENT INSTITUTION COUNTRY CODE\",\"id\":\"69\",\"class\":\"org.jpos.iso.IFA_NUMERIC\"},{\"length\":\"3\",\"name\":\"NETWORK MANAGEMENT INFORMATION CODE\",\"id\":\"70\",\"class\":\"org.jpos.iso.IFA_NUMERIC\"},{\"length\":\"4\",\"name\":\"MESSAGE NUMBER\",\"id\":\"71\",\"class\":\"org.jpos.iso.IFA_NUMERIC\"},{\"length\":\"4\",\"name\":\"MESSAGE NUMBER LAST\",\"id\":\"72\",\"class\":\"org.jpos.iso.IFA_NUMERIC\"},{\"length\":\"6\",\"name\":\"DATE ACTION\",\"id\":\"73\",\"class\":\"org.jpos.iso.IFA_NUMERIC\"},{\"length\":\"10\",\"name\":\"CREDITS NUMBER\",\"id\":\"74\",\"class\":\"org.jpos.iso.IFA_NUMERIC\"},{\"length\":\"10\",\"name\":\"CREDITS REVERSAL NUMBER\",\"id\":\"75\",\"class\":\"org.jpos.iso.IFA_NUMERIC\"},{\"length\":\"10\",\"name\":\"DEBITS NUMBER\",\"id\":\"76\",\"class\":\"org.jpos.iso.IFA_NUMERIC\"},{\"length\":\"10\",\"name\":\"DEBITS REVERSAL NUMBER\",\"id\":\"77\",\"class\":\"org.jpos.iso.IFA_NUMERIC\"},{\"length\":\"10\",\"name\":\"TRANSFER NUMBER\",\"id\":\"78\",\"class\":\"org.jpos.iso.IFA_NUMERIC\"},{\"length\":\"10\",\"name\":\"TRANSFER REVERSAL NUMBER\",\"id\":\"79\",\"class\":\"org.jpos.iso.IFA_NUMERIC\"},{\"length\":\"10\",\"name\":\"INQUIRIES NUMBER\",\"id\":\"80\",\"class\":\"org.jpos.iso.IFA_NUMERIC\"},{\"length\":\"10\",\"name\":\"AUTHORIZATION NUMBER\",\"id\":\"81\",\"class\":\"org.jpos.iso.IFA_NUMERIC\"},{\"length\":\"12\",\"name\":\"CREDITS, PROCESSING FEE AMOUNT\",\"id\":\"82\",\"class\":\"org.jpos.iso.IFA_NUMERIC\"},{\"length\":\"12\",\"name\":\"CREDITS, TRANSACTION FEE AMOUNT\",\"id\":\"83\",\"class\":\"org.jpos.iso.IFA_NUMERIC\"},{\"length\":\"12\",\"name\":\"DEBITS, PROCESSING FEE AMOUNT\",\"id\":\"84\",\"class\":\"org.jpos.iso.IFA_NUMERIC\"},{\"length\":\"12\",\"name\":\"DEBITS, TRANSACTION FEE AMOUNT\",\"id\":\"85\",\"class\":\"org.jpos.iso.IFA_NUMERIC\"},{\"length\":\"16\",\"name\":\"CREDITS, AMOUNT\",\"id\":\"86\",\"class\":\"org.jpos.iso.IFA_NUMERIC\"},{\"length\":\"16\",\"name\":\"CREDITS, REVERSAL AMOUNT\",\"id\":\"87\",\"class\":\"org.jpos.iso.IFA_NUMERIC\"},{\"length\":\"16\",\"name\":\"DEBITS, AMOUNT\",\"id\":\"88\",\"class\":\"org.jpos.iso.IFA_NUMERIC\"},{\"length\":\"16\",\"name\":\"DEBITS, REVERSAL AMOUNT\",\"id\":\"89\",\"class\":\"org.jpos.iso.IFA_NUMERIC\"},{\"length\":\"42\",\"name\":\"ORIGINAL DATA ELEMENTS\",\"id\":\"90\",\"class\":\"org.jpos.iso.IFA_NUMERIC\"},{\"length\":\"1\",\"name\":\"FILE UPDATE CODE\",\"id\":\"91\",\"class\":\"org.jpos.iso.IF_CHAR\"},{\"length\":\"2\",\"name\":\"FILE SECURITY CODE\",\"id\":\"92\",\"class\":\"org.jpos.iso.IF_CHAR\"},{\"length\":\"6\",\"name\":\"RESPONSE INDICATOR\",\"id\":\"93\",\"class\":\"org.jpos.iso.IF_CHAR\"},{\"length\":\"7\",\"name\":\"SERVICE INDICATOR\",\"id\":\"94\",\"class\":\"org.jpos.iso.IF_CHAR\"},{\"length\":\"42\",\"name\":\"REPLACEMENT AMOUNTS\",\"id\":\"95\",\"class\":\"org.jpos.iso.IF_CHAR\"},{\"length\":\"16\",\"name\":\"MESSAGE SECURITY CODE\",\"id\":\"96\",\"class\":\"org.jpos.iso.IFA_BINARY\"},{\"length\":\"17\",\"name\":\"AMOUNT, NET SETTLEMENT\",\"id\":\"97\",\"class\":\"org.jpos.iso.IFA_AMOUNT\"},{\"length\":\"25\",\"name\":\"PAYEE\",\"id\":\"98\",\"class\":\"org.jpos.iso.IF_CHAR\"},{\"length\":\"11\",\"name\":\"SETTLEMENT INSTITUTION IDENT CODE\",\"id\":\"99\",\"class\":\"org.jpos.iso.IFA_LLNUM\"},{\"length\":\"11\",\"name\":\"RECEIVING INSTITUTION IDENT CODE\",\"id\":\"100\",\"class\":\"org.jpos.iso.IFA_LLNUM\"},{\"length\":\"17\",\"name\":\"FILE NAME\",\"id\":\"101\",\"class\":\"org.jpos.iso.IFA_LLCHAR\"},{\"length\":\"28\",\"name\":\"ACCOUNT IDENTIFICATION 1\",\"id\":\"102\",\"class\":\"org.jpos.iso.IFA_LLCHAR\"},{\"length\":\"28\",\"name\":\"ACCOUNT IDENTIFICATION 2\",\"id\":\"103\",\"class\":\"org.jpos.iso.IFA_LLCHAR\"},{\"length\":\"100\",\"name\":\"TRANSACTION DESCRIPTION\",\"id\":\"104\",\"class\":\"org.jpos.iso.IFA_LLLCHAR\"},{\"length\":\"999\",\"name\":\"RESERVED ISO USE\",\"id\":\"105\",\"class\":\"org.jpos.iso.IFA_LLLCHAR\"},{\"length\":\"999\",\"name\":\"RESERVED ISO USE\",\"id\":\"106\",\"class\":\"org.jpos.iso.IFA_LLLCHAR\"},{\"length\":\"999\",\"name\":\"RESERVED ISO USE\",\"id\":\"107\",\"class\":\"org.jpos.iso.IFA_LLLCHAR\"},{\"length\":\"999\",\"name\":\"RESERVED ISO USE\",\"id\":\"108\",\"class\":\"org.jpos.iso.IFA_LLLCHAR\"},{\"length\":\"999\",\"name\":\"RESERVED ISO USE\",\"id\":\"109\",\"class\":\"org.jpos.iso.IFA_LLLCHAR\"},{\"length\":\"999\",\"name\":\"RESERVED ISO USE\",\"id\":\"110\",\"class\":\"org.jpos.iso.IFA_LLLCHAR\"},{\"length\":\"999\",\"name\":\"RESERVED ISO USE\",\"id\":\"111\",\"class\":\"org.jpos.iso.IFA_LLLCHAR\"},{\"length\":\"999\",\"name\":\"RESERVED NATIONAL USE\",\"id\":\"112\",\"class\":\"org.jpos.iso.IFA_LLLCHAR\"},{\"length\":\"999\",\"name\":\"RESERVED NATIONAL USE\",\"id\":\"113\",\"class\":\"org.jpos.iso.IFA_LLLCHAR\"},{\"length\":\"999\",\"name\":\"RESERVED NATIONAL USE\",\"id\":\"114\",\"class\":\"org.jpos.iso.IFA_LLLCHAR\"},{\"length\":\"999\",\"name\":\"RESERVED NATIONAL USE\",\"id\":\"115\",\"class\":\"org.jpos.iso.IFA_LLLCHAR\"},{\"length\":\"999\",\"name\":\"RESERVED NATIONAL USE\",\"id\":\"116\",\"class\":\"org.jpos.iso.IFA_LLLCHAR\"},{\"length\":\"999\",\"name\":\"RESERVED NATIONAL USE\",\"id\":\"117\",\"class\":\"org.jpos.iso.IFA_LLLCHAR\"},{\"length\":\"999\",\"name\":\"RESERVED NATIONAL USE\",\"id\":\"118\",\"class\":\"org.jpos.iso.IFA_LLLCHAR\"},{\"length\":\"999\",\"name\":\"RESERVED NATIONAL USE\",\"id\":\"119\",\"class\":\"org.jpos.iso.IFA_LLLCHAR\"},{\"length\":\"999\",\"name\":\"RESERVED PRIVATE USE\",\"id\":\"120\",\"class\":\"org.jpos.iso.IFA_LLLCHAR\"},{\"length\":\"999\",\"name\":\"RESERVED PRIVATE USE\",\"id\":\"121\",\"class\":\"org.jpos.iso.IFA_LLLCHAR\"},{\"length\":\"999\",\"name\":\"RESERVED PRIVATE USE\",\"id\":\"122\",\"class\":\"org.jpos.iso.IFA_LLLCHAR\"},{\"length\":\"999\",\"name\":\"RESERVED PRIVATE USE\",\"id\":\"123\",\"class\":\"org.jpos.iso.IFA_LLLCHAR\"},{\"length\":\"999\",\"name\":\"RESERVED PRIVATE USE\",\"id\":\"124\",\"class\":\"org.jpos.iso.IFA_LLLCHAR\"},{\"length\":\"999\",\"name\":\"RESERVED PRIVATE USE\",\"id\":\"125\",\"class\":\"org.jpos.iso.IFA_LLLCHAR\"},{\"length\":\"999\",\"name\":\"RESERVED PRIVATE USE\",\"id\":\"126\",\"class\":\"org.jpos.iso.IFA_LLLCHAR\"},{\"length\":\"999\",\"name\":\"RESERVED PRIVATE USE\",\"id\":\"127\",\"class\":\"org.jpos.iso.IFA_LLLCHAR\"},{\"length\":\"8\",\"name\":\"MAC 2\",\"id\":\"128\",\"class\":\"org.jpos.iso.IFA_BINARY\"}]}}",
      "messageSchemaPackager": "<?xml version=\"1.0\" encoding=\"UTF-8\" standalone=\"no\"?>\r\n<!DOCTYPE isopackager SYSTEM \"genericpackager.dtd\">\r\n<isopackager>\r\n  <isofield\r\n      id=\"0\"\r\n      length=\"4\"\r\n      name=\"MESSAGE TYPE INDICATOR\"\r\n      class=\"org.jpos.iso.IFA_NUMERIC\"/>\r\n  <isofield\r\n      id=\"1\"\r\n      length=\"16\"\r\n      name=\"BIT MAP\"\r\n      class=\"org.jpos.iso.IFA_BITMAP\"/>\r\n  <isofield\r\n      id=\"2\"\r\n      length=\"19\"\r\n      name=\"PAN - PRIMARY ACCOUNT NUMBER\"\r\n      class=\"org.jpos.iso.IFA_LLNUM\"/>\r\n  <isofield\r\n      id=\"3\"\r\n      length=\"6\"\r\n      name=\"PROCESSING CODE\"\r\n      class=\"org.jpos.iso.IFA_NUMERIC\"/>\r\n  <isofield\r\n      id=\"4\"\r\n      length=\"12\"\r\n      name=\"AMOUNT, TRANSACTION\"\r\n      class=\"org.jpos.iso.IFA_NUMERIC\"/>\r\n  <isofield\r\n      id=\"5\"\r\n      length=\"12\"\r\n      name=\"AMOUNT, SETTLEMENT\"\r\n      class=\"org.jpos.iso.IFA_NUMERIC\"/>\r\n  <isofield\r\n      id=\"6\"\r\n      length=\"12\"\r\n      name=\"AMOUNT, CARDHOLDER BILLING\"\r\n      class=\"org.jpos.iso.IFA_NUMERIC\"/>\r\n  <isofield\r\n      id=\"7\"\r\n      length=\"10\"\r\n      name=\"TRANSMISSION DATE AND TIME\"\r\n      class=\"org.jpos.iso.IFA_NUMERIC\"/>\r\n  <isofield\r\n      id=\"8\"\r\n      length=\"8\"\r\n      name=\"AMOUNT, CARDHOLDER BILLING FEE\"\r\n      class=\"org.jpos.iso.IFA_NUMERIC\"/>\r\n  <isofield\r\n      id=\"9\"\r\n      length=\"8\"\r\n      name=\"CONVERSION RATE, SETTLEMENT\"\r\n      class=\"org.jpos.iso.IFA_NUMERIC\"/>\r\n  <isofield\r\n      id=\"10\"\r\n      length=\"8\"\r\n      name=\"CONVERSION RATE, CARDHOLDER BILLING\"\r\n      class=\"org.jpos.iso.IFA_NUMERIC\"/>\r\n  <isofield\r\n      id=\"11\"\r\n      length=\"6\"\r\n      name=\"SYSTEM TRACE AUDIT NUMBER\"\r\n      class=\"org.jpos.iso.IFA_NUMERIC\"/>\r\n  <isofield\r\n      id=\"12\"\r\n      length=\"6\"\r\n      name=\"TIME, LOCAL TRANSACTION\"\r\n      class=\"org.jpos.iso.IFA_NUMERIC\"/>\r\n  <isofield\r\n      id=\"13\"\r\n      length=\"4\"\r\n      name=\"DATE, LOCAL TRANSACTION\"\r\n      class=\"org.jpos.iso.IFA_NUMERIC\"/>\r\n  <isofield\r\n      id=\"14\"\r\n      length=\"4\"\r\n      name=\"DATE, EXPIRATION\"\r\n      class=\"org.jpos.iso.IFA_NUMERIC\"/>\r\n  <isofield\r\n      id=\"15\"\r\n      length=\"4\"\r\n      name=\"DATE, SETTLEMENT\"\r\n      class=\"org.jpos.iso.IFA_NUMERIC\"/>\r\n  <isofield\r\n      id=\"16\"\r\n      length=\"4\"\r\n      name=\"DATE, CONVERSION\"\r\n      class=\"org.jpos.iso.IFA_NUMERIC\"/>\r\n  <isofield\r\n      id=\"17\"\r\n      length=\"4\"\r\n      name=\"DATE, CAPTURE\"\r\n      class=\"org.jpos.iso.IFA_NUMERIC\"/>\r\n  <isofield\r\n      id=\"18\"\r\n      length=\"4\"\r\n      name=\"MERCHANTS TYPE\"\r\n      class=\"org.jpos.iso.IFA_NUMERIC\"/>\r\n  <isofield\r\n      id=\"19\"\r\n      length=\"3\"\r\n      name=\"ACQUIRING INSTITUTION COUNTRY CODE\"\r\n      class=\"org.jpos.iso.IFA_NUMERIC\"/>\r\n  <isofield\r\n      id=\"20\"\r\n      length=\"3\"\r\n      name=\"PAN EXTENDED COUNTRY CODE\"\r\n      class=\"org.jpos.iso.IFA_NUMERIC\"/>\r\n  <isofield\r\n      id=\"21\"\r\n      length=\"3\"\r\n      name=\"FORWARDING INSTITUTION COUNTRY CODE\"\r\n      class=\"org.jpos.iso.IFA_NUMERIC\"/>\r\n  <isofield\r\n      id=\"22\"\r\n      length=\"3\"\r\n      name=\"POINT OF SERVICE ENTRY MODE\"\r\n      class=\"org.jpos.iso.IFA_NUMERIC\"/>\r\n  <isofield\r\n      id=\"23\"\r\n      length=\"3\"\r\n      name=\"CARD SEQUENCE NUMBER\"\r\n      class=\"org.jpos.iso.IFA_NUMERIC\"/>\r\n  <isofield\r\n      id=\"24\"\r\n      length=\"3\"\r\n      name=\"NETWORK INTERNATIONAL IDENTIFIER\"\r\n      class=\"org.jpos.iso.IFA_NUMERIC\"/>\r\n  <isofield\r\n      id=\"25\"\r\n      length=\"2\"\r\n      name=\"POINT OF SERVICE CONDITION CODE\"\r\n      class=\"org.jpos.iso.IFA_NUMERIC\"/>\r\n  <isofield\r\n      id=\"26\"\r\n      length=\"2\"\r\n      name=\"POINT OF SERVICE PIN CAPTURE CODE\"\r\n      class=\"org.jpos.iso.IFA_NUMERIC\"/>\r\n  <isofield\r\n      id=\"27\"\r\n      length=\"1\"\r\n      name=\"AUTHORIZATION IDENTIFICATION RESP LEN\"\r\n      class=\"org.jpos.iso.IFA_NUMERIC\"/>\r\n  <isofield\r\n      id=\"28\"\r\n      length=\"9\"\r\n      name=\"AMOUNT, TRANSACTION FEE\"\r\n      class=\"org.jpos.iso.IFA_AMOUNT\"/>\r\n  <isofield\r\n      id=\"29\"\r\n      length=\"9\"\r\n      name=\"AMOUNT, SETTLEMENT FEE\"\r\n      class=\"org.jpos.iso.IFA_AMOUNT\"/>\r\n  <isofield\r\n      id=\"30\"\r\n      length=\"9\"\r\n      name=\"AMOUNT, TRANSACTION PROCESSING FEE\"\r\n      class=\"org.jpos.iso.IFA_AMOUNT\"/>\r\n  <isofield\r\n      id=\"31\"\r\n      length=\"9\"\r\n      name=\"AMOUNT, SETTLEMENT PROCESSING FEE\"\r\n      class=\"org.jpos.iso.IFA_AMOUNT\"/>\r\n  <isofield\r\n      id=\"32\"\r\n      length=\"11\"\r\n      name=\"ACQUIRING INSTITUTION IDENT CODE\"\r\n      class=\"org.jpos.iso.IFA_LLNUM\"/>\r\n  <isofield\r\n      id=\"33\"\r\n      length=\"11\"\r\n      name=\"FORWARDING INSTITUTION IDENT CODE\"\r\n      class=\"org.jpos.iso.IFA_LLNUM\"/>\r\n  <isofield\r\n      id=\"34\"\r\n      length=\"28\"\r\n      name=\"PAN EXTENDED\"\r\n      class=\"org.jpos.iso.IFA_LLCHAR\"/>\r\n  <isofield\r\n      id=\"35\"\r\n      length=\"37\"\r\n      name=\"TRACK 2 DATA\"\r\n      class=\"org.jpos.iso.IFA_LLNUM\"/>\r\n  <isofield\r\n      id=\"36\"\r\n      length=\"104\"\r\n      name=\"TRACK 3 DATA\"\r\n      class=\"org.jpos.iso.IFA_LLLCHAR\"/>\r\n  <isofield\r\n      id=\"37\"\r\n      length=\"12\"\r\n      name=\"RETRIEVAL REFERENCE NUMBER\"\r\n      class=\"org.jpos.iso.IF_CHAR\"/>\r\n  <isofield\r\n      id=\"38\"\r\n      length=\"6\"\r\n      name=\"AUTHORIZATION IDENTIFICATION RESPONSE\"\r\n      class=\"org.jpos.iso.IF_CHAR\"/>\r\n  <isofield\r\n      id=\"39\"\r\n      length=\"2\"\r\n      name=\"RESPONSE CODE\"\r\n      class=\"org.jpos.iso.IF_CHAR\"/>\r\n  <isofield\r\n      id=\"40\"\r\n      length=\"3\"\r\n      name=\"SERVICE RESTRICTION CODE\"\r\n      class=\"org.jpos.iso.IF_CHAR\"/>\r\n  <isofield\r\n      id=\"41\"\r\n      length=\"8\"\r\n      name=\"CARD ACCEPTOR TERMINAL IDENTIFICACION\"\r\n      class=\"org.jpos.iso.IF_CHAR\"/>\r\n  <isofield\r\n      id=\"42\"\r\n      length=\"15\"\r\n      name=\"CARD ACCEPTOR IDENTIFICATION CODE\"\r\n      class=\"org.jpos.iso.IF_CHAR\"/>\r\n  <isofield\r\n      id=\"43\"\r\n      length=\"40\"\r\n      name=\"CARD ACCEPTOR NAME/LOCATION\"\r\n      class=\"org.jpos.iso.IF_CHAR\"/>\r\n  <isofield\r\n      id=\"44\"\r\n      length=\"25\"\r\n      name=\"ADDITIONAL RESPONSE DATA\"\r\n      class=\"org.jpos.iso.IFA_LLCHAR\"/>\r\n  <isofield\r\n      id=\"45\"\r\n      length=\"76\"\r\n      name=\"TRACK 1 DATA\"\r\n      class=\"org.jpos.iso.IFA_LLCHAR\"/>\r\n  <isofield\r\n      id=\"46\"\r\n      length=\"999\"\r\n      name=\"ADDITIONAL DATA - ISO\"\r\n      class=\"org.jpos.iso.IFA_LLLCHAR\"/>\r\n  <isofield\r\n      id=\"47\"\r\n      length=\"999\"\r\n      name=\"ADDITIONAL DATA - NATIONAL\"\r\n      class=\"org.jpos.iso.IFA_LLLCHAR\"/>\r\n  <isofield\r\n      id=\"48\"\r\n      length=\"999\"\r\n      name=\"ADDITIONAL DATA - PRIVATE\"\r\n      class=\"org.jpos.iso.IFA_LLLCHAR\"/>\r\n  <isofield\r\n      id=\"49\"\r\n      length=\"3\"\r\n      name=\"CURRENCY CODE, TRANSACTION\"\r\n      class=\"org.jpos.iso.IF_CHAR\"/>\r\n  <isofield\r\n      id=\"50\"\r\n      length=\"3\"\r\n      name=\"CURRENCY CODE, SETTLEMENT\"\r\n      class=\"org.jpos.iso.IF_CHAR\"/>\r\n  <isofield\r\n      id=\"51\"\r\n      length=\"3\"\r\n      name=\"CURRENCY CODE, CARDHOLDER BILLING\"\r\n      class=\"org.jpos.iso.IF_CHAR\"/>\r\n  <isofield\r\n      id=\"52\"\r\n      length=\"8\"\r\n      name=\"PIN DATA\"\r\n      class=\"org.jpos.iso.IFA_BINARY\"/>\r\n  <isofield\r\n      id=\"53\"\r\n      length=\"16\"\r\n      name=\"SECURITY RELATED CONTROL INFORMATION\"\r\n      class=\"org.jpos.iso.IFA_NUMERIC\"/>\r\n  <isofield\r\n      id=\"54\"\r\n      length=\"120\"\r\n      name=\"ADDITIONAL AMOUNTS\"\r\n      class=\"org.jpos.iso.IFA_LLLCHAR\"/>\r\n  <isofield\r\n      id=\"55\"\r\n      length=\"999\"\r\n      name=\"RESERVED ISO\"\r\n      class=\"org.jpos.iso.IFA_LLLCHAR\"/>\r\n  <isofield\r\n      id=\"56\"\r\n      length=\"999\"\r\n      name=\"RESERVED ISO\"\r\n      class=\"org.jpos.iso.IFA_LLLCHAR\"/>\r\n  <isofield\r\n      id=\"57\"\r\n      length=\"999\"\r\n      name=\"RESERVED NATIONAL\"\r\n      class=\"org.jpos.iso.IFA_LLLCHAR\"/>\r\n  <isofield\r\n      id=\"58\"\r\n      length=\"999\"\r\n      name=\"RESERVED NATIONAL\"\r\n      class=\"org.jpos.iso.IFA_LLLCHAR\"/>\r\n  <isofield\r\n      id=\"59\"\r\n      length=\"999\"\r\n      name=\"RESERVED NATIONAL\"\r\n      class=\"org.jpos.iso.IFA_LLLCHAR\"/>\r\n  <isofield\r\n      id=\"60\"\r\n      length=\"999\"\r\n      name=\"RESERVED PRIVATE\"\r\n      class=\"org.jpos.iso.IFA_LLLCHAR\"/>\r\n  <isofield\r\n      id=\"61\"\r\n      length=\"999\"\r\n      name=\"RESERVED PRIVATE\"\r\n      class=\"org.jpos.iso.IFA_LLLCHAR\"/>\r\n  <isofield\r\n      id=\"62\"\r\n      length=\"999\"\r\n      name=\"RESERVED PRIVATE\"\r\n      class=\"org.jpos.iso.IFA_LLLCHAR\"/>\r\n  <isofield\r\n      id=\"63\"\r\n      length=\"999\"\r\n      name=\"RESERVED PRIVATE\"\r\n      class=\"org.jpos.iso.IFA_LLLCHAR\"/>\r\n  <isofield\r\n      id=\"64\"\r\n      length=\"8\"\r\n      name=\"MESSAGE AUTHENTICATION CODE FIELD\"\r\n      class=\"org.jpos.iso.IFA_BINARY\"/>\r\n  <isofield\r\n      id=\"65\"\r\n      length=\"1\"\r\n      name=\"BITMAP, EXTENDED\"\r\n      class=\"org.jpos.iso.IFA_BINARY\"/>\r\n  <isofield\r\n      id=\"66\"\r\n      length=\"1\"\r\n      name=\"SETTLEMENT CODE\"\r\n      class=\"org.jpos.iso.IFA_NUMERIC\"/>\r\n  <isofield\r\n      id=\"67\"\r\n      length=\"2\"\r\n      name=\"EXTENDED PAYMENT CODE\"\r\n      class=\"org.jpos.iso.IFA_NUMERIC\"/>\r\n  <isofield\r\n      id=\"68\"\r\n      length=\"3\"\r\n      name=\"RECEIVING INSTITUTION COUNTRY CODE\"\r\n      class=\"org.jpos.iso.IFA_NUMERIC\"/>\r\n  <isofield\r\n      id=\"69\"\r\n      length=\"3\"\r\n      name=\"SETTLEMENT INSTITUTION COUNTRY CODE\"\r\n      class=\"org.jpos.iso.IFA_NUMERIC\"/>\r\n  <isofield\r\n      id=\"70\"\r\n      length=\"3\"\r\n      name=\"NETWORK MANAGEMENT INFORMATION CODE\"\r\n      class=\"org.jpos.iso.IFA_NUMERIC\"/>\r\n  <isofield\r\n      id=\"71\"\r\n      length=\"4\"\r\n      name=\"MESSAGE NUMBER\"\r\n      class=\"org.jpos.iso.IFA_NUMERIC\"/>\r\n  <isofield\r\n      id=\"72\"\r\n      length=\"4\"\r\n      name=\"MESSAGE NUMBER LAST\"\r\n      class=\"org.jpos.iso.IFA_NUMERIC\"/>\r\n  <isofield\r\n      id=\"73\"\r\n      length=\"6\"\r\n      name=\"DATE ACTION\"\r\n      class=\"org.jpos.iso.IFA_NUMERIC\"/>\r\n  <isofield\r\n      id=\"74\"\r\n      length=\"10\"\r\n      name=\"CREDITS NUMBER\"\r\n      class=\"org.jpos.iso.IFA_NUMERIC\"/>\r\n  <isofield\r\n      id=\"75\"\r\n      length=\"10\"\r\n      name=\"CREDITS REVERSAL NUMBER\"\r\n      class=\"org.jpos.iso.IFA_NUMERIC\"/>\r\n  <isofield\r\n      id=\"76\"\r\n      length=\"10\"\r\n      name=\"DEBITS NUMBER\"\r\n      class=\"org.jpos.iso.IFA_NUMERIC\"/>\r\n  <isofield\r\n      id=\"77\"\r\n      length=\"10\"\r\n      name=\"DEBITS REVERSAL NUMBER\"\r\n      class=\"org.jpos.iso.IFA_NUMERIC\"/>\r\n  <isofield\r\n      id=\"78\"\r\n      length=\"10\"\r\n      name=\"TRANSFER NUMBER\"\r\n      class=\"org.jpos.iso.IFA_NUMERIC\"/>\r\n  <isofield\r\n      id=\"79\"\r\n      length=\"10\"\r\n      name=\"TRANSFER REVERSAL NUMBER\"\r\n      class=\"org.jpos.iso.IFA_NUMERIC\"/>\r\n  <isofield\r\n      id=\"80\"\r\n      length=\"10\"\r\n      name=\"INQUIRIES NUMBER\"\r\n      class=\"org.jpos.iso.IFA_NUMERIC\"/>\r\n  <isofield\r\n      id=\"81\"\r\n      length=\"10\"\r\n      name=\"AUTHORIZATION NUMBER\"\r\n      class=\"org.jpos.iso.IFA_NUMERIC\"/>\r\n  <isofield\r\n      id=\"82\"\r\n      length=\"12\"\r\n      name=\"CREDITS, PROCESSING FEE AMOUNT\"\r\n      class=\"org.jpos.iso.IFA_NUMERIC\"/>\r\n  <isofield\r\n      id=\"83\"\r\n      length=\"12\"\r\n      name=\"CREDITS, TRANSACTION FEE AMOUNT\"\r\n      class=\"org.jpos.iso.IFA_NUMERIC\"/>\r\n  <isofield\r\n      id=\"84\"\r\n      length=\"12\"\r\n      name=\"DEBITS, PROCESSING FEE AMOUNT\"\r\n      class=\"org.jpos.iso.IFA_NUMERIC\"/>\r\n  <isofield\r\n      id=\"85\"\r\n      length=\"12\"\r\n      name=\"DEBITS, TRANSACTION FEE AMOUNT\"\r\n      class=\"org.jpos.iso.IFA_NUMERIC\"/>\r\n  <isofield\r\n      id=\"86\"\r\n      length=\"16\"\r\n      name=\"CREDITS, AMOUNT\"\r\n      class=\"org.jpos.iso.IFA_NUMERIC\"/>\r\n  <isofield\r\n      id=\"87\"\r\n      length=\"16\"\r\n      name=\"CREDITS, REVERSAL AMOUNT\"\r\n      class=\"org.jpos.iso.IFA_NUMERIC\"/>\r\n  <isofield\r\n      id=\"88\"\r\n      length=\"16\"\r\n      name=\"DEBITS, AMOUNT\"\r\n      class=\"org.jpos.iso.IFA_NUMERIC\"/>\r\n  <isofield\r\n      id=\"89\"\r\n      length=\"16\"\r\n      name=\"DEBITS, REVERSAL AMOUNT\"\r\n      class=\"org.jpos.iso.IFA_NUMERIC\"/>\r\n  <isofield\r\n      id=\"90\"\r\n      length=\"42\"\r\n      name=\"ORIGINAL DATA ELEMENTS\"\r\n      class=\"org.jpos.iso.IFA_NUMERIC\"/>\r\n  <isofield\r\n      id=\"91\"\r\n      length=\"1\"\r\n      name=\"FILE UPDATE CODE\"\r\n      class=\"org.jpos.iso.IF_CHAR\"/>\r\n  <isofield\r\n      id=\"92\"\r\n      length=\"2\"\r\n      name=\"FILE SECURITY CODE\"\r\n      class=\"org.jpos.iso.IF_CHAR\"/>\r\n  <isofield\r\n      id=\"93\"\r\n      length=\"6\"\r\n      name=\"RESPONSE INDICATOR\"\r\n      class=\"org.jpos.iso.IF_CHAR\"/>\r\n  <isofield\r\n      id=\"94\"\r\n      length=\"7\"\r\n      name=\"SERVICE INDICATOR\"\r\n      class=\"org.jpos.iso.IF_CHAR\"/>\r\n  <isofield\r\n      id=\"95\"\r\n      length=\"42\"\r\n      name=\"REPLACEMENT AMOUNTS\"\r\n      class=\"org.jpos.iso.IF_CHAR\"/>\r\n  <isofield\r\n      id=\"96\"\r\n      length=\"16\"\r\n      name=\"MESSAGE SECURITY CODE\"\r\n      class=\"org.jpos.iso.IFA_BINARY\"/>\r\n  <isofield\r\n      id=\"97\"\r\n      length=\"17\"\r\n      name=\"AMOUNT, NET SETTLEMENT\"\r\n      class=\"org.jpos.iso.IFA_AMOUNT\"/>\r\n  <isofield\r\n      id=\"98\"\r\n      length=\"25\"\r\n      name=\"PAYEE\"\r\n      class=\"org.jpos.iso.IF_CHAR\"/>\r\n  <isofield\r\n      id=\"99\"\r\n      length=\"11\"\r\n      name=\"SETTLEMENT INSTITUTION IDENT CODE\"\r\n      class=\"org.jpos.iso.IFA_LLNUM\"/>\r\n  <isofield\r\n      id=\"100\"\r\n      length=\"11\"\r\n      name=\"RECEIVING INSTITUTION IDENT CODE\"\r\n      class=\"org.jpos.iso.IFA_LLNUM\"/>\r\n  <isofield\r\n      id=\"101\"\r\n      length=\"17\"\r\n      name=\"FILE NAME\"\r\n      class=\"org.jpos.iso.IFA_LLCHAR\"/>\r\n  <isofield\r\n      id=\"102\"\r\n      length=\"28\"\r\n      name=\"ACCOUNT IDENTIFICATION 1\"\r\n      class=\"org.jpos.iso.IFA_LLCHAR\"/>\r\n  <isofield\r\n      id=\"103\"\r\n      length=\"28\"\r\n      name=\"ACCOUNT IDENTIFICATION 2\"\r\n      class=\"org.jpos.iso.IFA_LLCHAR\"/>\r\n  <isofield\r\n      id=\"104\"\r\n      length=\"100\"\r\n      name=\"TRANSACTION DESCRIPTION\"\r\n      class=\"org.jpos.iso.IFA_LLLCHAR\"/>\r\n  <isofield\r\n      id=\"105\"\r\n      length=\"999\"\r\n      name=\"RESERVED ISO USE\"\r\n      class=\"org.jpos.iso.IFA_LLLCHAR\"/>\r\n  <isofield\r\n      id=\"106\"\r\n      length=\"999\"\r\n      name=\"RESERVED ISO USE\"\r\n      class=\"org.jpos.iso.IFA_LLLCHAR\"/>\r\n  <isofield\r\n      id=\"107\"\r\n      length=\"999\"\r\n      name=\"RESERVED ISO USE\"\r\n      class=\"org.jpos.iso.IFA_LLLCHAR\"/>\r\n  <isofield\r\n      id=\"108\"\r\n      length=\"999\"\r\n      name=\"RESERVED ISO USE\"\r\n      class=\"org.jpos.iso.IFA_LLLCHAR\"/>\r\n  <isofield\r\n      id=\"109\"\r\n      length=\"999\"\r\n      name=\"RESERVED ISO USE\"\r\n      class=\"org.jpos.iso.IFA_LLLCHAR\"/>\r\n  <isofield\r\n      id=\"110\"\r\n      length=\"999\"\r\n      name=\"RESERVED ISO USE\"\r\n      class=\"org.jpos.iso.IFA_LLLCHAR\"/>\r\n  <isofield\r\n      id=\"111\"\r\n      length=\"999\"\r\n      name=\"RESERVED ISO USE\"\r\n      class=\"org.jpos.iso.IFA_LLLCHAR\"/>\r\n  <isofield\r\n      id=\"112\"\r\n      length=\"999\"\r\n      name=\"RESERVED NATIONAL USE\"\r\n      class=\"org.jpos.iso.IFA_LLLCHAR\"/>\r\n  <isofield\r\n      id=\"113\"\r\n      length=\"999\"\r\n      name=\"RESERVED NATIONAL USE\"\r\n      class=\"org.jpos.iso.IFA_LLLCHAR\"/>\r\n  <isofield\r\n      id=\"114\"\r\n      length=\"999\"\r\n      name=\"RESERVED NATIONAL USE\"\r\n      class=\"org.jpos.iso.IFA_LLLCHAR\"/>\r\n  <isofield\r\n      id=\"115\"\r\n      length=\"999\"\r\n      name=\"RESERVED NATIONAL USE\"\r\n      class=\"org.jpos.iso.IFA_LLLCHAR\"/>\r\n  <isofield\r\n      id=\"116\"\r\n      length=\"999\"\r\n      name=\"RESERVED NATIONAL USE\"\r\n      class=\"org.jpos.iso.IFA_LLLCHAR\"/>\r\n  <isofield\r\n      id=\"117\"\r\n      length=\"999\"\r\n      name=\"RESERVED NATIONAL USE\"\r\n      class=\"org.jpos.iso.IFA_LLLCHAR\"/>\r\n  <isofield\r\n      id=\"118\"\r\n      length=\"999\"\r\n      name=\"RESERVED NATIONAL USE\"\r\n      class=\"org.jpos.iso.IFA_LLLCHAR\"/>\r\n  <isofield\r\n      id=\"119\"\r\n      length=\"999\"\r\n      name=\"RESERVED NATIONAL USE\"\r\n      class=\"org.jpos.iso.IFA_LLLCHAR\"/>\r\n  <isofield\r\n      id=\"120\"\r\n      length=\"999\"\r\n      name=\"RESERVED PRIVATE USE\"\r\n      class=\"org.jpos.iso.IFA_LLLCHAR\"/>\r\n  <isofield\r\n      id=\"121\"\r\n      length=\"999\"\r\n      name=\"RESERVED PRIVATE USE\"\r\n      class=\"org.jpos.iso.IFA_LLLCHAR\"/>\r\n  <isofield\r\n      id=\"122\"\r\n      length=\"999\"\r\n      name=\"RESERVED PRIVATE USE\"\r\n      class=\"org.jpos.iso.IFA_LLLCHAR\"/>\r\n  <isofield\r\n      id=\"123\"\r\n      length=\"999\"\r\n      name=\"RESERVED PRIVATE USE\"\r\n      class=\"org.jpos.iso.IFA_LLLCHAR\"/>\r\n  <isofield\r\n      id=\"124\"\r\n      length=\"999\"\r\n      name=\"RESERVED PRIVATE USE\"\r\n      class=\"org.jpos.iso.IFA_LLLCHAR\"/>\r\n  <isofield\r\n      id=\"125\"\r\n      length=\"999\"\r\n      name=\"RESERVED PRIVATE USE\"\r\n      class=\"org.jpos.iso.IFA_LLLCHAR\"/>\r\n  <isofield\r\n      id=\"126\"\r\n      length=\"999\"\r\n      name=\"RESERVED PRIVATE USE\"\r\n      class=\"org.jpos.iso.IFA_LLLCHAR\"/>\r\n  <isofield\r\n      id=\"127\"\r\n      length=\"999\"\r\n      name=\"RESERVED PRIVATE USE\"\r\n      class=\"org.jpos.iso.IFA_LLLCHAR\"/>\r\n  <isofield\r\n      id=\"128\"\r\n      length=\"8\"\r\n      name=\"MAC 2\"\r\n      class=\"org.jpos.iso.IFA_BINARY\"/>\r\n</isopackager>\r\n"
    },
    networkData: {
      "persistRequired": "0",
      "properties": {
        "message": [
          {
            "field": "component.type",
            "label": "Component Type",
            "listvalues": null,
            "value": "ISO",
            "fileName": null,
            "datatype": "String",
            "format": "^([a-zA-Z_-])",
            "mandatory": true,
            "hidden": false
          },
          {
            "field": "component.name",
            "label": "Component Name(Message)",
            "listvalues": null,
            "value": "iso_adapter",
            "fileName": null,
            "datatype": "String",
            "format": "^([a-zA-Z_-])",
            "mandatory": true,
            "hidden": false
          },
          {
            "field": "transaction.timeout",
            "label": "transaction.timeout",
            "listvalues": null,
            "value": "60",
            "fileName": null,
            "datatype": "String",
            "format": null,
            "mandatory": false,
            "hidden": false
          },
          {
            "field": "processor.timeout",
            "label": "processor.timeout",
            "listvalues": null,
            "value": "20000",
            "fileName": null,
            "datatype": "String",
            "format": null,
            "mandatory": false,
            "hidden": false
          },
          {
            "field": "component.response.code.default.value",
            "label": "component.response.code.default.value",
            "listvalues": null,
            "value": "99",
            "fileName": null,
            "datatype": "String",
            "format": null,
            "mandatory": false,
            "hidden": false
          },
          {
            "field": "server.port",
            "label": "Server Port",
            "listvalues": null,
            "value": "0000",
            "fileName": null,
            "datatype": "int",
            "format": "^([0-9_-]){4,6}$",
            "mandatory": true,
            "hidden": true
          },
          {
            "field": "iso.msg.direction",
            "label": "ISO MSG DIRECTION(Message)",
            "listvalues": null,
            "value": "2",
            "fileName": null,
            "datatype": "int",
            "format": "",
            "mandatory": true,
            "hidden": true
          }
        ],
        "network": [
          {
            "field": "tcp.mode",
            "label": "TCP Mode",
            "listvalues": [
              "server",
              "client"
            ],
            "value": "client",
            "fileName": null,
            "datatype": "String",
            "format": "^([a-z])",
            "mandatory": true,
            "hidden": false
          },
          {
            "field": "component.iso.header.value",
            "label": "ISO Header Value",
            "listvalues": null,
            "value": "ISO",
            "fileName": null,
            "datatype": "String",
            "format": "^([A-Za-z0-9_\\-\\.])",
            "mandatory": true,
            "hidden": false
          },
          {
            "field": "component.service.type",
            "label": "Service Type",
            "listvalues": [
              "AUTH_SERVICE",
              "CARD_SERVICE",
              "FRAUD_SERVICE",
              "LOYALTY_SERVICE"
            ],
            "value": "AUTH_SERVICE",
            "fileName": null,
            "datatype": "String",
            "format": "^([a-zA-Z_-])",
            "mandatory": true,
            "hidden": false
          },
          {
            "field": "tcp.server.port",
            "label": "TCP Server Port",
            "listvalues": null,
            "value": "7070",
            "fileName": null,
            "datatype": "int",
            "format": "^([0-9_-]){4,6}$",
            "mandatory": true,
            "hidden": false
          },
          {
            "field": "tcp.server.header.length",
            "label": "Message Length Bytes",
            "listvalues": [
              "2",
              "4"
            ],
            "value": "2",
            "fileName": null,
            "datatype": "String",
            "format": "^([0-9_-])",
            "mandatory": true,
            "hidden": false
          },
          {
            "field": "tcp.server.ssl.keystore.password",
            "label": "TCP SSL Keystore Password",
            "listvalues": null,
            "value": "12345",
            "fileName": null,
            "datatype": "password",
            "format": "^([a-zA-Z0-9_-])",
            "mandatory": true,
            "hidden": false
          },
          {
            "field": "tcp.ssl.keystore.path",
            "label": "TCP SSL Keystore Path",
            "listvalues": [
              ".JKS"
            ],
            "value": 36,
            "fileName": "keystore.jks",
            "datatype": "file",
            "format": "",
            "mandatory": true,
            "hidden": false
          },
          {
            "field": "component.name",
            "label": "Component Name(Network)",
            "listvalues": null,
            "value": "iso_adapter",
            "fileName": null,
            "datatype": "String",
            "format": "^([a-zA-Z_-])",
            "mandatory": true,
            "hidden": false
          },
          {
            "field": "server.connection.threshold.time.unit",
            "label": "Server Connection Threshold Time Unit",
            "listvalues": [
              "HOURS",
              "MINUTES",
              "SECONDS"
            ],
            "value": "HOURS",
            "fileName": null,
            "datatype": "String",
            "format": "^([a-zA-Z_-])",
            "mandatory": true,
            "hidden": false
          },
          {
            "field": "server.total.threshold.time.unit",
            "label": "Server Total Threshold Time Unit",
            "listvalues": [
              "HOURS",
              "MINUTES",
              "SECONDS"
            ],
            "value": "HOURS",
            "fileName": null,
            "datatype": "String",
            "format": "^([a-zA-Z_-])",
            "mandatory": true,
            "hidden": false
          },
          {
            "field": "spring.profiles.active",
            "label": "spring.profiles.active",
            "listvalues": null,
            "value": "hz-client,tcp_client",
            "fileName": null,
            "datatype": "String",
            "format": null,
            "mandatory": false,
            "hidden": false
          },
          {
            "field": "iso.message.corrolation.key.fields",
            "label": "iso.message.corrolation.key.fields",
            "listvalues": null,
            "value": "0100#0110:11,0200#0210:11,0220#0230:11,0800#0810:7#11,0420#0430:11",
            "fileName": null,
            "datatype": "String",
            "format": null,
            "mandatory": false,
            "hidden": false
          },
          {
            "field": "iso.message.default.corrolation.key.fields",
            "label": "iso.message.default.corrolation.key.fields",
            "listvalues": null,
            "value": "11",
            "fileName": null,
            "datatype": "String",
            "format": null,
            "mandatory": false,
            "hidden": false
          },
          {
            "field": "tcp.from.channel.core.pool.size",
            "label": "tcp.from.channel.core.pool.size",
            "listvalues": null,
            "value": "100",
            "fileName": null,
            "datatype": "String",
            "format": null,
            "mandatory": false,
            "hidden": false
          },
          {
            "field": "component.response.code.field.name",
            "label": "component.response.code.field.name",
            "listvalues": null,
            "value": "39",
            "fileName": null,
            "datatype": "String",
            "format": null,
            "mandatory": false,
            "hidden": false
          },
          {
            "field": "expired_limit",
            "label": "expired_limit",
            "listvalues": null,
            "value": "2",
            "fileName": null,
            "datatype": "String",
            "format": null,
            "mandatory": false,
            "hidden": false
          },
          {
            "field": "tcp.to.channel.core.pool.size",
            "label": "TCP TO Channel Core Pool Size",
            "listvalues": null,
            "value": "100",
            "fileName": null,
            "datatype": "int",
            "format": "^([0-9_-])",
            "mandatory": true,
            "hidden": true
          },
          {
            "field": "tcp.from.channel.core.pool.size",
            "label": "TCP FROM Channel Core Pool Size",
            "listvalues": null,
            "value": "100",
            "fileName": null,
            "datatype": "int",
            "format": "^([0-9_-])",
            "mandatory": true,
            "hidden": true
          },
          {
            "field": "tcp.serialzer.type",
            "label": "TCP Serializer Type",
            "listvalues": [
              "FIRST",
              "SECOND"
            ],
            "value": "FIRST",
            "fileName": null,
            "datatype": "String",
            "format": "^([a-zA-Z_-])",
            "mandatory": true,
            "hidden": true
          },
          {
            "field": "server.request.sla.time",
            "label": "Server Request SLA Time",
            "listvalues": null,
            "value": "40000",
            "fileName": null,
            "datatype": "int",
            "format": "^([0-9_-])",
            "mandatory": true,
            "hidden": true
          },
          {
            "field": "server.connection.threshold",
            "label": "Server Connection Threshold",
            "listvalues": null,
            "value": "1000000000",
            "fileName": null,
            "datatype": "int",
            "format": "^([0-9_-])",
            "mandatory": true,
            "hidden": true
          },
          {
            "field": "server.connection.threshold.time",
            "label": "Server Connection Threshold Time",
            "listvalues": null,
            "value": "1",
            "fileName": null,
            "datatype": "int",
            "format": "^([0-9_-])",
            "mandatory": true,
            "hidden": true
          },
          {
            "field": "server.total.threshold",
            "label": "Server Total Threshold",
            "listvalues": null,
            "value": "100000000",
            "fileName": null,
            "datatype": "int",
            "format": "^([0-9_-])",
            "mandatory": true,
            "hidden": true
          },
          {
            "field": "server.total.threshold.time",
            "label": "Server Total Threshold Time",
            "listvalues": null,
            "value": "1",
            "fileName": null,
            "datatype": "int",
            "format": "^([0-9_-])",
            "mandatory": true,
            "hidden": true
          },
          {
            "field": "iso.msg.direction",
            "label": "ISO MSG DIRECTION(Network)",
            "listvalues": null,
            "value": "2",
            "fileName": null,
            "datatype": "int",
            "format": "",
            "mandatory": true,
            "hidden": true
          }
        ]
      },
      "connectionManagement": {
        "connections": [
          {
            "connection": "iso",
            "ip": "172.16.23.17",
            "port": "31956",
            "label": "iso",
            "timeOut": "5000"
          }
        ],
        "strategyConnections": {
          "strategyConnections": "ROUND_ROBIN",
          "stationGroupStrategy": null,
          "custumStrategy": null
        },
        "alternateConnection": null
      }
    },
    "transformData": {
      "persistRequired": "0",
      "requestMapping": {
        "transactions": [
          {
            "request": {
              "type": "cart_request",
              "mappings": [
                {
                  "ipc": "DECLINED",
                  "type": "field",
                  "source": "${message_exchange[GATEWAY_SERVICE].request_message[system_trace_audit_number]}",
                  "fieldId": "11",
                  "useCase": "3",
                  "destination": [
                    "${message_exchange[AUTH_SERVICE].native_request_message[11]}",
                    "${message_exchange[AUTH_SERVICE].request_message[system_trace_audit_number]}"
                  ],
                  "selectedOption": "copyField",
                  "selectedCondition": "Mandatory",
                  "validationFunctions": [
                    {
                      "name": "IS_NOT_NULL",
                      "type": "in_built_validation"
                    }
                  ]
                },
                {
                  "ipc": "DECLINED",
                  "type": "field",
                  "source": "${message_exchange[AUTH_SERVICE].request_message[rrn]}",
                  "fieldId": "37",
                  "useCase": "3",
                  "destination": [
                    "${message_exchange[AUTH_SERVICE].native_request_message[37]}",
                    "${message_exchange[AUTH_SERVICE].request_message[rrn]}"
                  ],
                  "selectedOption": "copyField",
                  "selectedCondition": "Mandatory",
                  "validationFunctions": [
                    {
                      "name": "IS_NOT_NULL",
                      "type": "in_built_validation"
                    }
                  ]
                },
                {
                  "ipc": "DECLINED",
                  "type": "field",
                  "source": "${message_exchange[AUTH_SERVICE].request_message[auth_code]}",
                  "fieldId": "38",
                  "useCase": "3",
                  "destination": [
                    "${message_exchange[AUTH_SERVICE].native_request_message[38]}",
                    "${message_exchange[AUTH_SERVICE].request_message[auth_code]}"
                  ],
                  "selectedOption": "copyField",
                  "selectedCondition": "Mandatory",
                  "validationFunctions": [
                    {
                      "name": "IS_NOT_NULL",
                      "type": "in_built_validation"
                    }
                  ]
                },
                {
                  "ipc": "DECLINED",
                  "type": "field",
                  "source": "${message_exchange[AUTH_SERVICE].request_message[response_code]}",
                  "fieldId": "39",
                  "useCase": "3",
                  "destination": [
                    "${message_exchange[AUTH_SERVICE].native_request_message[39]}",
                    "${message_exchange[AUTH_SERVICE].request_message[response_code]}"
                  ],
                  "selectedOption": "copyField",
                  "selectedCondition": "Mandatory",
                  "validationFunctions": [
                    {
                      "name": "IS_NOT_NULL",
                      "type": "in_built_validation"
                    }
                  ]
                },
                {
                  "ipc": "DECLINED",
                  "type": "field",
                  "source": "${message_exchange[GATEWAY_SERVICE].request_message[amounts.amount_transaction.value]}",
                  "fieldId": "4",
                  "useCase": 3,
                  "functions": [
                    {
                      "type": "execute_function",
                      "execute": "AMOUNT_FORMATER",
                      "parameters": [
                        "2"
                      ]
                    }
                  ],
                  "destination": [
                    "${message_exchange[AUTH_SERVICE].native_request_message[4]}"
                  ],
                  "rawDestination": "${message_exchange[AUTH_SERVICE].request_message[amounts.amount_transaction.value]}",
                  "selectedOption": "operationField",
                  "selectedCondition": "Mandatory",
                  "validationFunctions": [
                    {
                      "name": "IS_NOT_NULL",
                      "type": "in_built_validation"
                    }
                  ]
                },
                {
                  "ipc": "DECLINED",
                  "type": "field",
                  "source": "${message_exchange[GATEWAY_SERVICE].request_message[transaction_date_time]}",
                  "fieldId": "7",
                  "useCase": "3",
                  "destination": [
                    "${message_exchange[AUTH_SERVICE].native_request_message[7]}",
                    "${message_exchange[AUTH_SERVICE].request_message[transaction_date_time]}"
                  ],
                  "selectedOption": "copyField",
                  "selectedCondition": "Mandatory",
                  "validationFunctions": [
                    {
                      "name": "IS_NOT_NULL",
                      "type": "in_built_validation",
                      "parameters": []
                    },
                    {
                      "name": "IS_NOT_NULL",
                      "type": "in_built_validation"
                    }
                  ]
                }
              ]
            },
            "response": {
              "type": "cart_response",
              "mappings": [
                {
                  "ipc": "DECLINED",
                  "type": "field",
                  "source": "${13}",
                  "destination": [
                    "${message_exchange[AUTH_SERVICE].response_message[local_date]}"
                  ],
                  "selectedOption": "copy",
                  "selectedCondition": "Mandatory",
                  "validationFunctions": [
                    {
                      "name": "IS_NOT_NULL",
                      "type": "in_built_validation"
                    }
                  ]
                },
                {
                  "ipc": "DECLINED",
                  "type": "field",
                  "source": "${7}",
                  "destination": [
                    "${message_exchange[AUTH_SERVICE].response_message[transmission_date_time]}"
                  ],
                  "selectedOption": "copy",
                  "selectedCondition": "Mandatory",
                  "validationFunctions": [
                    {
                      "name": "IS_NOT_NULL",
                      "type": "in_built_validation",
                      "parameters": []
                    },
                    {
                      "name": "IS_NOT_NULL",
                      "type": "in_built_validation"
                    }
                  ]
                },
                {
                  "ipc": "DECLINED",
                  "type": "field",
                  "source": "${4}",
                  "functions": [
                    {
                      "type": "execute_function",
                      "execute": "AMOUNT_FORMATER",
                      "parameters": [
                        "2"
                      ]
                    }
                  ],
                  "destination": [
                    "${message_exchange[AUTH_SERVICE].response_message[amounts.amount_transaction.value]}"
                  ],
                  "selectedOption": "isExtract",
                  "selectedCondition": "Mandatory",
                  "validationFunctions": [
                    {
                      "name": "IS_NOT_NULL",
                      "type": "in_built_validation",
                      "parameters": []
                    },
                    {
                      "name": "IS_NOT_NULL",
                      "type": "in_built_validation"
                    }
                  ]
                },
                {
                  "ipc": "DECLINED",
                  "type": "field",
                  "source": "${11}",
                  "destination": [
                    "${message_exchange[AUTH_SERVICE].response_message[system_trace_audit_number]}"
                  ],
                  "selectedOption": "copy",
                  "selectedCondition": "Mandatory",
                  "validationFunctions": [
                    {
                      "name": "IS_NOT_NULL",
                      "type": "in_built_validation"
                    }
                  ]
                },
                {
                  "ipc": "DECLINED",
                  "type": "field",
                  "source": "${37}",
                  "destination": [
                    "${message_exchange[AUTH_SERVICE].response_message[rrn]}"
                  ],
                  "selectedOption": "copy",
                  "selectedCondition": "Mandatory",
                  "validationFunctions": [
                    {
                      "name": "IS_NOT_NULL",
                      "type": "in_built_validation"
                    }
                  ]
                },
                {
                  "ipc": "DECLINED",
                  "type": "field",
                  "source": "${38}",
                  "destination": [
                    "${message_exchange[AUTH_SERVICE].response_message[auth_code]}"
                  ],
                  "selectedOption": "copy",
                  "selectedCondition": "Mandatory",
                  "validationFunctions": [
                    {
                      "name": "IS_NOT_NULL",
                      "type": "in_built_validation"
                    }
                  ]
                },
                {
                  "ipc": "DECLINED",
                  "type": "field",
                  "source": "${39}",
                  "destination": [
                    "${message_exchange[AUTH_SERVICE].response_message[response_code]}"
                  ],
                  "selectedOption": "copy",
                  "selectedCondition": "Mandatory",
                  "validationFunctions": [
                    {
                      "name": "IS_NOT_NULL",
                      "type": "in_built_validation"
                    }
                  ]
                }
              ]
            },
            "condition": {
              "id": "0",
              "type": "equal",
              "value": "0200",
              "fieldName": "${message_exchange[GATEWAY_SERVICE].request_message[mti]}"
            },
            "messageIntentifier": "Enquiry",
            "contractIntentifier": null
          }
        ]
      },
      "responseMapping": null,
      "imfLeg": null,
      "fieldSchemeImfMapperUiWrapper": [
        {
          "fieldId": "2",
          "fieldName": "Field 2 PAN - PRIMARY ACCOUNT NUMBER",
          "requestImfExpression": null,
          "responseImfExpression": null,
          "responseImfLeg": null,
          "requestImfField": null,
          "responseImfField": null
        },
        {
          "fieldId": "3",
          "fieldName": "Field 3 PROCESSING CODE",
          "requestImfExpression": null,
          "responseImfExpression": null,
          "responseImfLeg": null,
          "requestImfField": null,
          "responseImfField": null
        },
        {
          "fieldId": "4",
          "fieldName": "Field 4 AMOUNT, TRANSACTION",
          "requestImfExpression": null,
          "responseImfExpression": null,
          "responseImfLeg": null,
          "requestImfField": null,
          "responseImfField": null
        },
        {
          "fieldId": "5",
          "fieldName": "Field 5 AMOUNT, SETTLEMENT",
          "requestImfExpression": null,
          "responseImfExpression": null,
          "responseImfLeg": null,
          "requestImfField": null,
          "responseImfField": null
        },
        {
          "fieldId": "6",
          "fieldName": "Field 6 AMOUNT, CARDHOLDER BILLING",
          "requestImfExpression": null,
          "responseImfExpression": null,
          "responseImfLeg": null,
          "requestImfField": null,
          "responseImfField": null
        },
        {
          "fieldId": "7",
          "fieldName": "Field 7 TRANSMISSION DATE AND TIME",
          "requestImfExpression": null,
          "responseImfExpression": null,
          "responseImfLeg": null,
          "requestImfField": null,
          "responseImfField": null
        },
        {
          "fieldId": "8",
          "fieldName": "Field 8 AMOUNT, CARDHOLDER BILLING FEE",
          "requestImfExpression": null,
          "responseImfExpression": null,
          "responseImfLeg": null,
          "requestImfField": null,
          "responseImfField": null
        },
        {
          "fieldId": "9",
          "fieldName": "Field 9 CONVERSION RATE, SETTLEMENT",
          "requestImfExpression": null,
          "responseImfExpression": null,
          "responseImfLeg": null,
          "requestImfField": null,
          "responseImfField": null
        },
        {
          "fieldId": "10",
          "fieldName": "Field 10 CONVERSION RATE, CARDHOLDER BILLING",
          "requestImfExpression": null,
          "responseImfExpression": null,
          "responseImfLeg": null,
          "requestImfField": null,
          "responseImfField": null
        },
        {
          "fieldId": "11",
          "fieldName": "Field 11 SYSTEM TRACE AUDIT NUMBER",
          "requestImfExpression": null,
          "responseImfExpression": null,
          "responseImfLeg": null,
          "requestImfField": null,
          "responseImfField": null
        },
        {
          "fieldId": "12",
          "fieldName": "Field 12 TIME, LOCAL TRANSACTION",
          "requestImfExpression": null,
          "responseImfExpression": null,
          "responseImfLeg": null,
          "requestImfField": null,
          "responseImfField": null
        },
        {
          "fieldId": "13",
          "fieldName": "Field 13 DATE, LOCAL TRANSACTION",
          "requestImfExpression": null,
          "responseImfExpression": null,
          "responseImfLeg": null,
          "requestImfField": null,
          "responseImfField": null
        },
        {
          "fieldId": "14",
          "fieldName": "Field 14 DATE, EXPIRATION",
          "requestImfExpression": null,
          "responseImfExpression": null,
          "responseImfLeg": null,
          "requestImfField": null,
          "responseImfField": null
        },
        {
          "fieldId": "15",
          "fieldName": "Field 15 DATE, SETTLEMENT",
          "requestImfExpression": null,
          "responseImfExpression": null,
          "responseImfLeg": null,
          "requestImfField": null,
          "responseImfField": null
        },
        {
          "fieldId": "16",
          "fieldName": "Field 16 DATE, CONVERSION",
          "requestImfExpression": null,
          "responseImfExpression": null,
          "responseImfLeg": null,
          "requestImfField": null,
          "responseImfField": null
        },
        {
          "fieldId": "17",
          "fieldName": "Field 17 DATE, CAPTURE",
          "requestImfExpression": null,
          "responseImfExpression": null,
          "responseImfLeg": null,
          "requestImfField": null,
          "responseImfField": null
        },
        {
          "fieldId": "18",
          "fieldName": "Field 18 MERCHANTS TYPE",
          "requestImfExpression": null,
          "responseImfExpression": null,
          "responseImfLeg": null,
          "requestImfField": null,
          "responseImfField": null
        },
        {
          "fieldId": "19",
          "fieldName": "Field 19 ACQUIRING INSTITUTION COUNTRY CODE",
          "requestImfExpression": null,
          "responseImfExpression": null,
          "responseImfLeg": null,
          "requestImfField": null,
          "responseImfField": null
        },
        {
          "fieldId": "20",
          "fieldName": "Field 20 PAN EXTENDED COUNTRY CODE",
          "requestImfExpression": null,
          "responseImfExpression": null,
          "responseImfLeg": null,
          "requestImfField": null,
          "responseImfField": null
        },
        {
          "fieldId": "21",
          "fieldName": "Field 21 FORWARDING INSTITUTION COUNTRY CODE",
          "requestImfExpression": null,
          "responseImfExpression": null,
          "responseImfLeg": null,
          "requestImfField": null,
          "responseImfField": null
        },
        {
          "fieldId": "22",
          "fieldName": "Field 22 POINT OF SERVICE ENTRY MODE",
          "requestImfExpression": null,
          "responseImfExpression": null,
          "responseImfLeg": null,
          "requestImfField": null,
          "responseImfField": null
        },
        {
          "fieldId": "23",
          "fieldName": "Field 23 CARD SEQUENCE NUMBER",
          "requestImfExpression": null,
          "responseImfExpression": null,
          "responseImfLeg": null,
          "requestImfField": null,
          "responseImfField": null
        },
        {
          "fieldId": "24",
          "fieldName": "Field 24 NETWORK INTERNATIONAL IDENTIFIER",
          "requestImfExpression": null,
          "responseImfExpression": null,
          "responseImfLeg": null,
          "requestImfField": null,
          "responseImfField": null
        },
        {
          "fieldId": "25",
          "fieldName": "Field 25 POINT OF SERVICE CONDITION CODE",
          "requestImfExpression": null,
          "responseImfExpression": null,
          "responseImfLeg": null,
          "requestImfField": null,
          "responseImfField": null
        },
        {
          "fieldId": "26",
          "fieldName": "Field 26 POINT OF SERVICE PIN CAPTURE CODE",
          "requestImfExpression": null,
          "responseImfExpression": null,
          "responseImfLeg": null,
          "requestImfField": null,
          "responseImfField": null
        },
        {
          "fieldId": "27",
          "fieldName": "Field 27 AUTHORIZATION IDENTIFICATION RESP LEN",
          "requestImfExpression": null,
          "responseImfExpression": null,
          "responseImfLeg": null,
          "requestImfField": null,
          "responseImfField": null
        },
        {
          "fieldId": "28",
          "fieldName": "Field 28 AMOUNT, TRANSACTION FEE",
          "requestImfExpression": null,
          "responseImfExpression": null,
          "responseImfLeg": null,
          "requestImfField": null,
          "responseImfField": null
        },
        {
          "fieldId": "29",
          "fieldName": "Field 29 AMOUNT, SETTLEMENT FEE",
          "requestImfExpression": null,
          "responseImfExpression": null,
          "responseImfLeg": null,
          "requestImfField": null,
          "responseImfField": null
        },
        {
          "fieldId": "30",
          "fieldName": "Field 30 AMOUNT, TRANSACTION PROCESSING FEE",
          "requestImfExpression": null,
          "responseImfExpression": null,
          "responseImfLeg": null,
          "requestImfField": null,
          "responseImfField": null
        },
        {
          "fieldId": "31",
          "fieldName": "Field 31 AMOUNT, SETTLEMENT PROCESSING FEE",
          "requestImfExpression": null,
          "responseImfExpression": null,
          "responseImfLeg": null,
          "requestImfField": null,
          "responseImfField": null
        },
        {
          "fieldId": "32",
          "fieldName": "Field 32 ACQUIRING INSTITUTION IDENT CODE",
          "requestImfExpression": null,
          "responseImfExpression": null,
          "responseImfLeg": null,
          "requestImfField": null,
          "responseImfField": null
        },
        {
          "fieldId": "33",
          "fieldName": "Field 33 FORWARDING INSTITUTION IDENT CODE",
          "requestImfExpression": null,
          "responseImfExpression": null,
          "responseImfLeg": null,
          "requestImfField": null,
          "responseImfField": null
        },
        {
          "fieldId": "34",
          "fieldName": "Field 34 PAN EXTENDED",
          "requestImfExpression": null,
          "responseImfExpression": null,
          "responseImfLeg": null,
          "requestImfField": null,
          "responseImfField": null
        },
        {
          "fieldId": "35",
          "fieldName": "Field 35 TRACK 2 DATA",
          "requestImfExpression": null,
          "responseImfExpression": null,
          "responseImfLeg": null,
          "requestImfField": null,
          "responseImfField": null
        },
        {
          "fieldId": "36",
          "fieldName": "Field 36 TRACK 3 DATA",
          "requestImfExpression": null,
          "responseImfExpression": null,
          "responseImfLeg": null,
          "requestImfField": null,
          "responseImfField": null
        },
        {
          "fieldId": "37",
          "fieldName": "Field 37 RETRIEVAL REFERENCE NUMBER",
          "requestImfExpression": null,
          "responseImfExpression": null,
          "responseImfLeg": null,
          "requestImfField": null,
          "responseImfField": null
        },
        {
          "fieldId": "38",
          "fieldName": "Field 38 AUTHORIZATION IDENTIFICATION RESPONSE",
          "requestImfExpression": null,
          "responseImfExpression": null,
          "responseImfLeg": null,
          "requestImfField": null,
          "responseImfField": null
        },
        {
          "fieldId": "39",
          "fieldName": "Field 39 RESPONSE CODE",
          "requestImfExpression": null,
          "responseImfExpression": null,
          "responseImfLeg": null,
          "requestImfField": null,
          "responseImfField": null
        },
        {
          "fieldId": "40",
          "fieldName": "Field 40 SERVICE RESTRICTION CODE",
          "requestImfExpression": null,
          "responseImfExpression": null,
          "responseImfLeg": null,
          "requestImfField": null,
          "responseImfField": null
        },
        {
          "fieldId": "41",
          "fieldName": "Field 41 CARD ACCEPTOR TERMINAL IDENTIFICACION",
          "requestImfExpression": null,
          "responseImfExpression": null,
          "responseImfLeg": null,
          "requestImfField": null,
          "responseImfField": null
        },
        {
          "fieldId": "42",
          "fieldName": "Field 42 CARD ACCEPTOR IDENTIFICATION CODE",
          "requestImfExpression": null,
          "responseImfExpression": null,
          "responseImfLeg": null,
          "requestImfField": null,
          "responseImfField": null
        },
        {
          "fieldId": "43",
          "fieldName": "Field 43 CARD ACCEPTOR NAME/LOCATION",
          "requestImfExpression": null,
          "responseImfExpression": null,
          "responseImfLeg": null,
          "requestImfField": null,
          "responseImfField": null
        },
        {
          "fieldId": "44",
          "fieldName": "Field 44 ADDITIONAL RESPONSE DATA",
          "requestImfExpression": null,
          "responseImfExpression": null,
          "responseImfLeg": null,
          "requestImfField": null,
          "responseImfField": null
        },
        {
          "fieldId": "45",
          "fieldName": "Field 45 TRACK 1 DATA",
          "requestImfExpression": null,
          "responseImfExpression": null,
          "responseImfLeg": null,
          "requestImfField": null,
          "responseImfField": null
        },
        {
          "fieldId": "46",
          "fieldName": "Field 46 ADDITIONAL DATA - ISO",
          "requestImfExpression": null,
          "responseImfExpression": null,
          "responseImfLeg": null,
          "requestImfField": null,
          "responseImfField": null
        },
        {
          "fieldId": "47",
          "fieldName": "Field 47 ADDITIONAL DATA - NATIONAL",
          "requestImfExpression": null,
          "responseImfExpression": null,
          "responseImfLeg": null,
          "requestImfField": null,
          "responseImfField": null
        },
        {
          "fieldId": "48",
          "fieldName": "Field 48 ADDITIONAL DATA - PRIVATE",
          "requestImfExpression": null,
          "responseImfExpression": null,
          "responseImfLeg": null,
          "requestImfField": null,
          "responseImfField": null
        },
        {
          "fieldId": "49",
          "fieldName": "Field 49 CURRENCY CODE, TRANSACTION",
          "requestImfExpression": null,
          "responseImfExpression": null,
          "responseImfLeg": null,
          "requestImfField": null,
          "responseImfField": null
        },
        {
          "fieldId": "50",
          "fieldName": "Field 50 CURRENCY CODE, SETTLEMENT",
          "requestImfExpression": null,
          "responseImfExpression": null,
          "responseImfLeg": null,
          "requestImfField": null,
          "responseImfField": null
        },
        {
          "fieldId": "51",
          "fieldName": "Field 51 CURRENCY CODE, CARDHOLDER BILLING",
          "requestImfExpression": null,
          "responseImfExpression": null,
          "responseImfLeg": null,
          "requestImfField": null,
          "responseImfField": null
        },
        {
          "fieldId": "52",
          "fieldName": "Field 52 PIN DATA",
          "requestImfExpression": null,
          "responseImfExpression": null,
          "responseImfLeg": null,
          "requestImfField": null,
          "responseImfField": null
        },
        {
          "fieldId": "53",
          "fieldName": "Field 53 SECURITY RELATED CONTROL INFORMATION",
          "requestImfExpression": null,
          "responseImfExpression": null,
          "responseImfLeg": null,
          "requestImfField": null,
          "responseImfField": null
        },
        {
          "fieldId": "54",
          "fieldName": "Field 54 ADDITIONAL AMOUNTS",
          "requestImfExpression": null,
          "responseImfExpression": null,
          "responseImfLeg": null,
          "requestImfField": null,
          "responseImfField": null
        },
        {
          "fieldId": "55",
          "fieldName": "Field 55 RESERVED ISO",
          "requestImfExpression": null,
          "responseImfExpression": null,
          "responseImfLeg": null,
          "requestImfField": null,
          "responseImfField": null
        },
        {
          "fieldId": "56",
          "fieldName": "Field 56 RESERVED ISO",
          "requestImfExpression": null,
          "responseImfExpression": null,
          "responseImfLeg": null,
          "requestImfField": null,
          "responseImfField": null
        },
        {
          "fieldId": "57",
          "fieldName": "Field 57 RESERVED NATIONAL",
          "requestImfExpression": null,
          "responseImfExpression": null,
          "responseImfLeg": null,
          "requestImfField": null,
          "responseImfField": null
        },
        {
          "fieldId": "58",
          "fieldName": "Field 58 RESERVED NATIONAL",
          "requestImfExpression": null,
          "responseImfExpression": null,
          "responseImfLeg": null,
          "requestImfField": null,
          "responseImfField": null
        },
        {
          "fieldId": "59",
          "fieldName": "Field 59 RESERVED NATIONAL",
          "requestImfExpression": null,
          "responseImfExpression": null,
          "responseImfLeg": null,
          "requestImfField": null,
          "responseImfField": null
        },
        {
          "fieldId": "60",
          "fieldName": "Field 60 RESERVED PRIVATE",
          "requestImfExpression": null,
          "responseImfExpression": null,
          "responseImfLeg": null,
          "requestImfField": null,
          "responseImfField": null
        },
        {
          "fieldId": "61",
          "fieldName": "Field 61 RESERVED PRIVATE",
          "requestImfExpression": null,
          "responseImfExpression": null,
          "responseImfLeg": null,
          "requestImfField": null,
          "responseImfField": null
        },
        {
          "fieldId": "62",
          "fieldName": "Field 62 RESERVED PRIVATE",
          "requestImfExpression": null,
          "responseImfExpression": null,
          "responseImfLeg": null,
          "requestImfField": null,
          "responseImfField": null
        },
        {
          "fieldId": "63",
          "fieldName": "Field 63 RESERVED PRIVATE",
          "requestImfExpression": null,
          "responseImfExpression": null,
          "responseImfLeg": null,
          "requestImfField": null,
          "responseImfField": null
        },
        {
          "fieldId": "64",
          "fieldName": "Field 64 MESSAGE AUTHENTICATION CODE FIELD",
          "requestImfExpression": null,
          "responseImfExpression": null,
          "responseImfLeg": null,
          "requestImfField": null,
          "responseImfField": null
        },
        {
          "fieldId": "66",
          "fieldName": "Field 66 SETTLEMENT CODE",
          "requestImfExpression": null,
          "responseImfExpression": null,
          "responseImfLeg": null,
          "requestImfField": null,
          "responseImfField": null
        },
        {
          "fieldId": "67",
          "fieldName": "Field 67 EXTENDED PAYMENT CODE",
          "requestImfExpression": null,
          "responseImfExpression": null,
          "responseImfLeg": null,
          "requestImfField": null,
          "responseImfField": null
        },
        {
          "fieldId": "68",
          "fieldName": "Field 68 RECEIVING INSTITUTION COUNTRY CODE",
          "requestImfExpression": null,
          "responseImfExpression": null,
          "responseImfLeg": null,
          "requestImfField": null,
          "responseImfField": null
        },
        {
          "fieldId": "69",
          "fieldName": "Field 69 SETTLEMENT INSTITUTION COUNTRY CODE",
          "requestImfExpression": null,
          "responseImfExpression": null,
          "responseImfLeg": null,
          "requestImfField": null,
          "responseImfField": null
        },
        {
          "fieldId": "70",
          "fieldName": "Field 70 NETWORK MANAGEMENT INFORMATION CODE",
          "requestImfExpression": null,
          "responseImfExpression": null,
          "responseImfLeg": null,
          "requestImfField": null,
          "responseImfField": null
        },
        {
          "fieldId": "71",
          "fieldName": "Field 71 MESSAGE NUMBER",
          "requestImfExpression": null,
          "responseImfExpression": null,
          "responseImfLeg": null,
          "requestImfField": null,
          "responseImfField": null
        },
        {
          "fieldId": "72",
          "fieldName": "Field 72 MESSAGE NUMBER LAST",
          "requestImfExpression": null,
          "responseImfExpression": null,
          "responseImfLeg": null,
          "requestImfField": null,
          "responseImfField": null
        },
        {
          "fieldId": "73",
          "fieldName": "Field 73 DATE ACTION",
          "requestImfExpression": null,
          "responseImfExpression": null,
          "responseImfLeg": null,
          "requestImfField": null,
          "responseImfField": null
        },
        {
          "fieldId": "74",
          "fieldName": "Field 74 CREDITS NUMBER",
          "requestImfExpression": null,
          "responseImfExpression": null,
          "responseImfLeg": null,
          "requestImfField": null,
          "responseImfField": null
        },
        {
          "fieldId": "75",
          "fieldName": "Field 75 CREDITS REVERSAL NUMBER",
          "requestImfExpression": null,
          "responseImfExpression": null,
          "responseImfLeg": null,
          "requestImfField": null,
          "responseImfField": null
        },
        {
          "fieldId": "76",
          "fieldName": "Field 76 DEBITS NUMBER",
          "requestImfExpression": null,
          "responseImfExpression": null,
          "responseImfLeg": null,
          "requestImfField": null,
          "responseImfField": null
        },
        {
          "fieldId": "77",
          "fieldName": "Field 77 DEBITS REVERSAL NUMBER",
          "requestImfExpression": null,
          "responseImfExpression": null,
          "responseImfLeg": null,
          "requestImfField": null,
          "responseImfField": null
        },
        {
          "fieldId": "78",
          "fieldName": "Field 78 TRANSFER NUMBER",
          "requestImfExpression": null,
          "responseImfExpression": null,
          "responseImfLeg": null,
          "requestImfField": null,
          "responseImfField": null
        },
        {
          "fieldId": "79",
          "fieldName": "Field 79 TRANSFER REVERSAL NUMBER",
          "requestImfExpression": null,
          "responseImfExpression": null,
          "responseImfLeg": null,
          "requestImfField": null,
          "responseImfField": null
        },
        {
          "fieldId": "80",
          "fieldName": "Field 80 INQUIRIES NUMBER",
          "requestImfExpression": null,
          "responseImfExpression": null,
          "responseImfLeg": null,
          "requestImfField": null,
          "responseImfField": null
        },
        {
          "fieldId": "81",
          "fieldName": "Field 81 AUTHORIZATION NUMBER",
          "requestImfExpression": null,
          "responseImfExpression": null,
          "responseImfLeg": null,
          "requestImfField": null,
          "responseImfField": null
        },
        {
          "fieldId": "82",
          "fieldName": "Field 82 CREDITS, PROCESSING FEE AMOUNT",
          "requestImfExpression": null,
          "responseImfExpression": null,
          "responseImfLeg": null,
          "requestImfField": null,
          "responseImfField": null
        },
        {
          "fieldId": "83",
          "fieldName": "Field 83 CREDITS, TRANSACTION FEE AMOUNT",
          "requestImfExpression": null,
          "responseImfExpression": null,
          "responseImfLeg": null,
          "requestImfField": null,
          "responseImfField": null
        },
        {
          "fieldId": "84",
          "fieldName": "Field 84 DEBITS, PROCESSING FEE AMOUNT",
          "requestImfExpression": null,
          "responseImfExpression": null,
          "responseImfLeg": null,
          "requestImfField": null,
          "responseImfField": null
        },
        {
          "fieldId": "85",
          "fieldName": "Field 85 DEBITS, TRANSACTION FEE AMOUNT",
          "requestImfExpression": null,
          "responseImfExpression": null,
          "responseImfLeg": null,
          "requestImfField": null,
          "responseImfField": null
        },
        {
          "fieldId": "86",
          "fieldName": "Field 86 CREDITS, AMOUNT",
          "requestImfExpression": null,
          "responseImfExpression": null,
          "responseImfLeg": null,
          "requestImfField": null,
          "responseImfField": null
        },
        {
          "fieldId": "87",
          "fieldName": "Field 87 CREDITS, REVERSAL AMOUNT",
          "requestImfExpression": null,
          "responseImfExpression": null,
          "responseImfLeg": null,
          "requestImfField": null,
          "responseImfField": null
        },
        {
          "fieldId": "88",
          "fieldName": "Field 88 DEBITS, AMOUNT",
          "requestImfExpression": null,
          "responseImfExpression": null,
          "responseImfLeg": null,
          "requestImfField": null,
          "responseImfField": null
        },
        {
          "fieldId": "89",
          "fieldName": "Field 89 DEBITS, REVERSAL AMOUNT",
          "requestImfExpression": null,
          "responseImfExpression": null,
          "responseImfLeg": null,
          "requestImfField": null,
          "responseImfField": null
        },
        {
          "fieldId": "90",
          "fieldName": "Field 90 ORIGINAL DATA ELEMENTS",
          "requestImfExpression": null,
          "responseImfExpression": null,
          "responseImfLeg": null,
          "requestImfField": null,
          "responseImfField": null
        },
        {
          "fieldId": "91",
          "fieldName": "Field 91 FILE UPDATE CODE",
          "requestImfExpression": null,
          "responseImfExpression": null,
          "responseImfLeg": null,
          "requestImfField": null,
          "responseImfField": null
        },
        {
          "fieldId": "92",
          "fieldName": "Field 92 FILE SECURITY CODE",
          "requestImfExpression": null,
          "responseImfExpression": null,
          "responseImfLeg": null,
          "requestImfField": null,
          "responseImfField": null
        },
        {
          "fieldId": "93",
          "fieldName": "Field 93 RESPONSE INDICATOR",
          "requestImfExpression": null,
          "responseImfExpression": null,
          "responseImfLeg": null,
          "requestImfField": null,
          "responseImfField": null
        },
        {
          "fieldId": "94",
          "fieldName": "Field 94 SERVICE INDICATOR",
          "requestImfExpression": null,
          "responseImfExpression": null,
          "responseImfLeg": null,
          "requestImfField": null,
          "responseImfField": null
        },
        {
          "fieldId": "95",
          "fieldName": "Field 95 REPLACEMENT AMOUNTS",
          "requestImfExpression": null,
          "responseImfExpression": null,
          "responseImfLeg": null,
          "requestImfField": null,
          "responseImfField": null
        },
        {
          "fieldId": "96",
          "fieldName": "Field 96 MESSAGE SECURITY CODE",
          "requestImfExpression": null,
          "responseImfExpression": null,
          "responseImfLeg": null,
          "requestImfField": null,
          "responseImfField": null
        },
        {
          "fieldId": "97",
          "fieldName": "Field 97 AMOUNT, NET SETTLEMENT",
          "requestImfExpression": null,
          "responseImfExpression": null,
          "responseImfLeg": null,
          "requestImfField": null,
          "responseImfField": null
        },
        {
          "fieldId": "98",
          "fieldName": "Field 98 PAYEE",
          "requestImfExpression": null,
          "responseImfExpression": null,
          "responseImfLeg": null,
          "requestImfField": null,
          "responseImfField": null
        },
        {
          "fieldId": "99",
          "fieldName": "Field 99 SETTLEMENT INSTITUTION IDENT CODE",
          "requestImfExpression": null,
          "responseImfExpression": null,
          "responseImfLeg": null,
          "requestImfField": null,
          "responseImfField": null
        },
        {
          "fieldId": "100",
          "fieldName": "Field 100 RECEIVING INSTITUTION IDENT CODE",
          "requestImfExpression": null,
          "responseImfExpression": null,
          "responseImfLeg": null,
          "requestImfField": null,
          "responseImfField": null
        },
        {
          "fieldId": "101",
          "fieldName": "Field 101 FILE NAME",
          "requestImfExpression": null,
          "responseImfExpression": null,
          "responseImfLeg": null,
          "requestImfField": null,
          "responseImfField": null
        },
        {
          "fieldId": "102",
          "fieldName": "Field 102 ACCOUNT IDENTIFICATION 1",
          "requestImfExpression": null,
          "responseImfExpression": null,
          "responseImfLeg": null,
          "requestImfField": null,
          "responseImfField": null
        },
        {
          "fieldId": "103",
          "fieldName": "Field 103 ACCOUNT IDENTIFICATION 2",
          "requestImfExpression": null,
          "responseImfExpression": null,
          "responseImfLeg": null,
          "requestImfField": null,
          "responseImfField": null
        },
        {
          "fieldId": "104",
          "fieldName": "Field 104 TRANSACTION DESCRIPTION",
          "requestImfExpression": null,
          "responseImfExpression": null,
          "responseImfLeg": null,
          "requestImfField": null,
          "responseImfField": null
        },
        {
          "fieldId": "105",
          "fieldName": "Field 105 RESERVED ISO USE",
          "requestImfExpression": null,
          "responseImfExpression": null,
          "responseImfLeg": null,
          "requestImfField": null,
          "responseImfField": null
        },
        {
          "fieldId": "106",
          "fieldName": "Field 106 RESERVED ISO USE",
          "requestImfExpression": null,
          "responseImfExpression": null,
          "responseImfLeg": null,
          "requestImfField": null,
          "responseImfField": null
        },
        {
          "fieldId": "107",
          "fieldName": "Field 107 RESERVED ISO USE",
          "requestImfExpression": null,
          "responseImfExpression": null,
          "responseImfLeg": null,
          "requestImfField": null,
          "responseImfField": null
        },
        {
          "fieldId": "108",
          "fieldName": "Field 108 RESERVED ISO USE",
          "requestImfExpression": null,
          "responseImfExpression": null,
          "responseImfLeg": null,
          "requestImfField": null,
          "responseImfField": null
        },
        {
          "fieldId": "109",
          "fieldName": "Field 109 RESERVED ISO USE",
          "requestImfExpression": null,
          "responseImfExpression": null,
          "responseImfLeg": null,
          "requestImfField": null,
          "responseImfField": null
        },
        {
          "fieldId": "110",
          "fieldName": "Field 110 RESERVED ISO USE",
          "requestImfExpression": null,
          "responseImfExpression": null,
          "responseImfLeg": null,
          "requestImfField": null,
          "responseImfField": null
        },
        {
          "fieldId": "111",
          "fieldName": "Field 111 RESERVED ISO USE",
          "requestImfExpression": null,
          "responseImfExpression": null,
          "responseImfLeg": null,
          "requestImfField": null,
          "responseImfField": null
        },
        {
          "fieldId": "112",
          "fieldName": "Field 112 RESERVED NATIONAL USE",
          "requestImfExpression": null,
          "responseImfExpression": null,
          "responseImfLeg": null,
          "requestImfField": null,
          "responseImfField": null
        },
        {
          "fieldId": "113",
          "fieldName": "Field 113 RESERVED NATIONAL USE",
          "requestImfExpression": null,
          "responseImfExpression": null,
          "responseImfLeg": null,
          "requestImfField": null,
          "responseImfField": null
        },
        {
          "fieldId": "114",
          "fieldName": "Field 114 RESERVED NATIONAL USE",
          "requestImfExpression": null,
          "responseImfExpression": null,
          "responseImfLeg": null,
          "requestImfField": null,
          "responseImfField": null
        },
        {
          "fieldId": "115",
          "fieldName": "Field 115 RESERVED NATIONAL USE",
          "requestImfExpression": null,
          "responseImfExpression": null,
          "responseImfLeg": null,
          "requestImfField": null,
          "responseImfField": null
        },
        {
          "fieldId": "116",
          "fieldName": "Field 116 RESERVED NATIONAL USE",
          "requestImfExpression": null,
          "responseImfExpression": null,
          "responseImfLeg": null,
          "requestImfField": null,
          "responseImfField": null
        },
        {
          "fieldId": "117",
          "fieldName": "Field 117 RESERVED NATIONAL USE",
          "requestImfExpression": null,
          "responseImfExpression": null,
          "responseImfLeg": null,
          "requestImfField": null,
          "responseImfField": null
        },
        {
          "fieldId": "118",
          "fieldName": "Field 118 RESERVED NATIONAL USE",
          "requestImfExpression": null,
          "responseImfExpression": null,
          "responseImfLeg": null,
          "requestImfField": null,
          "responseImfField": null
        },
        {
          "fieldId": "119",
          "fieldName": "Field 119 RESERVED NATIONAL USE",
          "requestImfExpression": null,
          "responseImfExpression": null,
          "responseImfLeg": null,
          "requestImfField": null,
          "responseImfField": null
        },
        {
          "fieldId": "120",
          "fieldName": "Field 120 RESERVED PRIVATE USE",
          "requestImfExpression": null,
          "responseImfExpression": null,
          "responseImfLeg": null,
          "requestImfField": null,
          "responseImfField": null
        },
        {
          "fieldId": "121",
          "fieldName": "Field 121 RESERVED PRIVATE USE",
          "requestImfExpression": null,
          "responseImfExpression": null,
          "responseImfLeg": null,
          "requestImfField": null,
          "responseImfField": null
        },
        {
          "fieldId": "122",
          "fieldName": "Field 122 RESERVED PRIVATE USE",
          "requestImfExpression": null,
          "responseImfExpression": null,
          "responseImfLeg": null,
          "requestImfField": null,
          "responseImfField": null
        },
        {
          "fieldId": "123",
          "fieldName": "Field 123 RESERVED PRIVATE USE",
          "requestImfExpression": null,
          "responseImfExpression": null,
          "responseImfLeg": null,
          "requestImfField": null,
          "responseImfField": null
        },
        {
          "fieldId": "124",
          "fieldName": "Field 124 RESERVED PRIVATE USE",
          "requestImfExpression": null,
          "responseImfExpression": null,
          "responseImfLeg": null,
          "requestImfField": null,
          "responseImfField": null
        },
        {
          "fieldId": "125",
          "fieldName": "Field 125 RESERVED PRIVATE USE",
          "requestImfExpression": null,
          "responseImfExpression": null,
          "responseImfLeg": null,
          "requestImfField": null,
          "responseImfField": null
        },
        {
          "fieldId": "126",
          "fieldName": "Field 126 RESERVED PRIVATE USE",
          "requestImfExpression": null,
          "responseImfExpression": null,
          "responseImfLeg": null,
          "requestImfField": null,
          "responseImfField": null
        },
        {
          "fieldId": "127",
          "fieldName": "Field 127 RESERVED PRIVATE USE",
          "requestImfExpression": null,
          "responseImfExpression": null,
          "responseImfLeg": null,
          "requestImfField": null,
          "responseImfField": null
        },
        {
          "fieldId": "128",
          "fieldName": "Field 128 MAC 2",
          "requestImfExpression": null,
          "responseImfExpression": null,
          "responseImfLeg": null,
          "requestImfField": null,
          "responseImfField": null
        }
      ],
      "listIdRule": [
        {
          "id": "0",
          "name": "Field 0 MESSAGE TYPE INDICATOR"
        },
        {
          "id": "1",
          "name": "Field 1 BIT MAP"
        },
        {
          "id": "2",
          "name": "Field 2 PAN - PRIMARY ACCOUNT NUMBER"
        },
        {
          "id": "3",
          "name": "Field 3 PROCESSING CODE"
        },
        {
          "id": "4",
          "name": "Field 4 AMOUNT, TRANSACTION"
        },
        {
          "id": "5",
          "name": "Field 5 AMOUNT, SETTLEMENT"
        },
        {
          "id": "6",
          "name": "Field 6 AMOUNT, CARDHOLDER BILLING"
        },
        {
          "id": "7",
          "name": "Field 7 TRANSMISSION DATE AND TIME"
        },
        {
          "id": "8",
          "name": "Field 8 AMOUNT, CARDHOLDER BILLING FEE"
        },
        {
          "id": "9",
          "name": "Field 9 CONVERSION RATE, SETTLEMENT"
        },
        {
          "id": "10",
          "name": "Field 10 CONVERSION RATE, CARDHOLDER BILLING"
        },
        {
          "id": "11",
          "name": "Field 11 SYSTEM TRACE AUDIT NUMBER"
        },
        {
          "id": "12",
          "name": "Field 12 TIME, LOCAL TRANSACTION"
        },
        {
          "id": "13",
          "name": "Field 13 DATE, LOCAL TRANSACTION"
        },
        {
          "id": "14",
          "name": "Field 14 DATE, EXPIRATION"
        },
        {
          "id": "15",
          "name": "Field 15 DATE, SETTLEMENT"
        },
        {
          "id": "16",
          "name": "Field 16 DATE, CONVERSION"
        },
        {
          "id": "17",
          "name": "Field 17 DATE, CAPTURE"
        },
        {
          "id": "18",
          "name": "Field 18 MERCHANTS TYPE"
        },
        {
          "id": "19",
          "name": "Field 19 ACQUIRING INSTITUTION COUNTRY CODE"
        },
        {
          "id": "20",
          "name": "Field 20 PAN EXTENDED COUNTRY CODE"
        },
        {
          "id": "21",
          "name": "Field 21 FORWARDING INSTITUTION COUNTRY CODE"
        },
        {
          "id": "22",
          "name": "Field 22 POINT OF SERVICE ENTRY MODE"
        },
        {
          "id": "23",
          "name": "Field 23 CARD SEQUENCE NUMBER"
        },
        {
          "id": "24",
          "name": "Field 24 NETWORK INTERNATIONAL IDENTIFIER"
        },
        {
          "id": "25",
          "name": "Field 25 POINT OF SERVICE CONDITION CODE"
        },
        {
          "id": "26",
          "name": "Field 26 POINT OF SERVICE PIN CAPTURE CODE"
        },
        {
          "id": "27",
          "name": "Field 27 AUTHORIZATION IDENTIFICATION RESP LEN"
        },
        {
          "id": "28",
          "name": "Field 28 AMOUNT, TRANSACTION FEE"
        },
        {
          "id": "29",
          "name": "Field 29 AMOUNT, SETTLEMENT FEE"
        },
        {
          "id": "30",
          "name": "Field 30 AMOUNT, TRANSACTION PROCESSING FEE"
        },
        {
          "id": "31",
          "name": "Field 31 AMOUNT, SETTLEMENT PROCESSING FEE"
        },
        {
          "id": "32",
          "name": "Field 32 ACQUIRING INSTITUTION IDENT CODE"
        },
        {
          "id": "33",
          "name": "Field 33 FORWARDING INSTITUTION IDENT CODE"
        },
        {
          "id": "34",
          "name": "Field 34 PAN EXTENDED"
        },
        {
          "id": "35",
          "name": "Field 35 TRACK 2 DATA"
        },
        {
          "id": "36",
          "name": "Field 36 TRACK 3 DATA"
        },
        {
          "id": "37",
          "name": "Field 37 RETRIEVAL REFERENCE NUMBER"
        },
        {
          "id": "38",
          "name": "Field 38 AUTHORIZATION IDENTIFICATION RESPONSE"
        },
        {
          "id": "39",
          "name": "Field 39 RESPONSE CODE"
        },
        {
          "id": "40",
          "name": "Field 40 SERVICE RESTRICTION CODE"
        },
        {
          "id": "41",
          "name": "Field 41 CARD ACCEPTOR TERMINAL IDENTIFICACION"
        },
        {
          "id": "42",
          "name": "Field 42 CARD ACCEPTOR IDENTIFICATION CODE"
        },
        {
          "id": "43",
          "name": "Field 43 CARD ACCEPTOR NAME/LOCATION"
        },
        {
          "id": "44",
          "name": "Field 44 ADDITIONAL RESPONSE DATA"
        },
        {
          "id": "45",
          "name": "Field 45 TRACK 1 DATA"
        },
        {
          "id": "46",
          "name": "Field 46 ADDITIONAL DATA - ISO"
        },
        {
          "id": "47",
          "name": "Field 47 ADDITIONAL DATA - NATIONAL"
        },
        {
          "id": "48",
          "name": "Field 48 ADDITIONAL DATA - PRIVATE"
        },
        {
          "id": "49",
          "name": "Field 49 CURRENCY CODE, TRANSACTION"
        },
        {
          "id": "50",
          "name": "Field 50 CURRENCY CODE, SETTLEMENT"
        },
        {
          "id": "51",
          "name": "Field 51 CURRENCY CODE, CARDHOLDER BILLING"
        },
        {
          "id": "52",
          "name": "Field 52 PIN DATA"
        },
        {
          "id": "53",
          "name": "Field 53 SECURITY RELATED CONTROL INFORMATION"
        },
        {
          "id": "54",
          "name": "Field 54 ADDITIONAL AMOUNTS"
        },
        {
          "id": "55",
          "name": "Field 55 RESERVED ISO"
        },
        {
          "id": "56",
          "name": "Field 56 RESERVED ISO"
        },
        {
          "id": "57",
          "name": "Field 57 RESERVED NATIONAL"
        },
        {
          "id": "58",
          "name": "Field 58 RESERVED NATIONAL"
        },
        {
          "id": "59",
          "name": "Field 59 RESERVED NATIONAL"
        },
        {
          "id": "60",
          "name": "Field 60 RESERVED PRIVATE"
        },
        {
          "id": "61",
          "name": "Field 61 RESERVED PRIVATE"
        },
        {
          "id": "62",
          "name": "Field 62 RESERVED PRIVATE"
        },
        {
          "id": "63",
          "name": "Field 63 RESERVED PRIVATE"
        },
        {
          "id": "64",
          "name": "Field 64 MESSAGE AUTHENTICATION CODE FIELD"
        },
        {
          "id": "65",
          "name": "Field 65 BITMAP, EXTENDED"
        },
        {
          "id": "66",
          "name": "Field 66 SETTLEMENT CODE"
        },
        {
          "id": "67",
          "name": "Field 67 EXTENDED PAYMENT CODE"
        },
        {
          "id": "68",
          "name": "Field 68 RECEIVING INSTITUTION COUNTRY CODE"
        },
        {
          "id": "69",
          "name": "Field 69 SETTLEMENT INSTITUTION COUNTRY CODE"
        },
        {
          "id": "70",
          "name": "Field 70 NETWORK MANAGEMENT INFORMATION CODE"
        },
        {
          "id": "71",
          "name": "Field 71 MESSAGE NUMBER"
        },
        {
          "id": "72",
          "name": "Field 72 MESSAGE NUMBER LAST"
        },
        {
          "id": "73",
          "name": "Field 73 DATE ACTION"
        },
        {
          "id": "74",
          "name": "Field 74 CREDITS NUMBER"
        },
        {
          "id": "75",
          "name": "Field 75 CREDITS REVERSAL NUMBER"
        },
        {
          "id": "76",
          "name": "Field 76 DEBITS NUMBER"
        },
        {
          "id": "77",
          "name": "Field 77 DEBITS REVERSAL NUMBER"
        },
        {
          "id": "78",
          "name": "Field 78 TRANSFER NUMBER"
        },
        {
          "id": "79",
          "name": "Field 79 TRANSFER REVERSAL NUMBER"
        },
        {
          "id": "80",
          "name": "Field 80 INQUIRIES NUMBER"
        },
        {
          "id": "81",
          "name": "Field 81 AUTHORIZATION NUMBER"
        },
        {
          "id": "82",
          "name": "Field 82 CREDITS, PROCESSING FEE AMOUNT"
        },
        {
          "id": "83",
          "name": "Field 83 CREDITS, TRANSACTION FEE AMOUNT"
        },
        {
          "id": "84",
          "name": "Field 84 DEBITS, PROCESSING FEE AMOUNT"
        },
        {
          "id": "85",
          "name": "Field 85 DEBITS, TRANSACTION FEE AMOUNT"
        },
        {
          "id": "86",
          "name": "Field 86 CREDITS, AMOUNT"
        },
        {
          "id": "87",
          "name": "Field 87 CREDITS, REVERSAL AMOUNT"
        },
        {
          "id": "88",
          "name": "Field 88 DEBITS, AMOUNT"
        },
        {
          "id": "89",
          "name": "Field 89 DEBITS, REVERSAL AMOUNT"
        },
        {
          "id": "90",
          "name": "Field 90 ORIGINAL DATA ELEMENTS"
        },
        {
          "id": "91",
          "name": "Field 91 FILE UPDATE CODE"
        },
        {
          "id": "92",
          "name": "Field 92 FILE SECURITY CODE"
        },
        {
          "id": "93",
          "name": "Field 93 RESPONSE INDICATOR"
        },
        {
          "id": "94",
          "name": "Field 94 SERVICE INDICATOR"
        },
        {
          "id": "95",
          "name": "Field 95 REPLACEMENT AMOUNTS"
        },
        {
          "id": "96",
          "name": "Field 96 MESSAGE SECURITY CODE"
        },
        {
          "id": "97",
          "name": "Field 97 AMOUNT, NET SETTLEMENT"
        },
        {
          "id": "98",
          "name": "Field 98 PAYEE"
        },
        {
          "id": "99",
          "name": "Field 99 SETTLEMENT INSTITUTION IDENT CODE"
        },
        {
          "id": "100",
          "name": "Field 100 RECEIVING INSTITUTION IDENT CODE"
        },
        {
          "id": "101",
          "name": "Field 101 FILE NAME"
        },
        {
          "id": "102",
          "name": "Field 102 ACCOUNT IDENTIFICATION 1"
        },
        {
          "id": "103",
          "name": "Field 103 ACCOUNT IDENTIFICATION 2"
        },
        {
          "id": "104",
          "name": "Field 104 TRANSACTION DESCRIPTION"
        },
        {
          "id": "105",
          "name": "Field 105 RESERVED ISO USE"
        },
        {
          "id": "106",
          "name": "Field 106 RESERVED ISO USE"
        },
        {
          "id": "107",
          "name": "Field 107 RESERVED ISO USE"
        },
        {
          "id": "108",
          "name": "Field 108 RESERVED ISO USE"
        },
        {
          "id": "109",
          "name": "Field 109 RESERVED ISO USE"
        },
        {
          "id": "110",
          "name": "Field 110 RESERVED ISO USE"
        },
        {
          "id": "111",
          "name": "Field 111 RESERVED ISO USE"
        },
        {
          "id": "112",
          "name": "Field 112 RESERVED NATIONAL USE"
        },
        {
          "id": "113",
          "name": "Field 113 RESERVED NATIONAL USE"
        },
        {
          "id": "114",
          "name": "Field 114 RESERVED NATIONAL USE"
        },
        {
          "id": "115",
          "name": "Field 115 RESERVED NATIONAL USE"
        },
        {
          "id": "116",
          "name": "Field 116 RESERVED NATIONAL USE"
        },
        {
          "id": "117",
          "name": "Field 117 RESERVED NATIONAL USE"
        },
        {
          "id": "118",
          "name": "Field 118 RESERVED NATIONAL USE"
        },
        {
          "id": "119",
          "name": "Field 119 RESERVED NATIONAL USE"
        },
        {
          "id": "120",
          "name": "Field 120 RESERVED PRIVATE USE"
        },
        {
          "id": "121",
          "name": "Field 121 RESERVED PRIVATE USE"
        },
        {
          "id": "122",
          "name": "Field 122 RESERVED PRIVATE USE"
        },
        {
          "id": "123",
          "name": "Field 123 RESERVED PRIVATE USE"
        },
        {
          "id": "124",
          "name": "Field 124 RESERVED PRIVATE USE"
        },
        {
          "id": "125",
          "name": "Field 125 RESERVED PRIVATE USE"
        },
        {
          "id": "126",
          "name": "Field 126 RESERVED PRIVATE USE"
        },
        {
          "id": "127",
          "name": "Field 127 RESERVED PRIVATE USE"
        },
        {
          "id": "128",
          "name": "Field 128 MAC 2"
        }
      ],
      "safingCondition": null,
      "apiFieldsData": null
    },
    "responseCodeData": {
      "persistRequired": "0",
      "ipcUiWrapper": {
        "ipcList": [
          {
            "ipc": "APPROVED",
            "responseCode": "00",
            "description": "Approved"
          },
          {
            "ipc": "DECLINED",
            "responseCode": "99",
            "description": "Declined"
          },
          {
            "ipc": "DO_NOT_HONOR",
            "responseCode": "05",
            "description": "Donothonor"
          },
          {
            "ipc": "SYSTEM_ERROR",
            "responseCode": "06",
            "description": "Systemerror"
          }
        ],
        "defaultResponseCode": "DECLINED",
        "componentResponseCodeField": "internal_processing_code"
      }
    },
    "beanconfiguationData": {
      "persistRequired": null,
      "beans": [
        {
          "componentType": "L3",
          "componentId": null,
          "fileType": "CHANNELS",
          "fileName": "channels.xml",
          "fileContent": "<beans xmlns=\"http://www.springframework.org/schema/beans\"\r\n\txmlns:xsi=\"http://www.w3.org/2001/XMLSchema-instance\"\r\n\txmlns:p=\"http://www.springframework.org/schema/p\"\r\n\txmlns:int=\"http://www.springframework.org/schema/integration\"\r\n\txmlns:task=\"http://www.springframework.org/schema/task\"\r\n\txmlns:context=\"http://www.springframework.org/schema/context\"\r\n\txsi:schemaLocation=\"http://www.springframework.org/schema/beans\r\nhttp://www.springframework.org/schema/beans/spring-beans.xsd \r\nhttp://www.springframework.org/schema/integration http://www.springframework.org/schema/integration/spring-integration.xsd \r\nhttp://www.springframework.org/schema/task http://www.springframework.org/schema/task/spring-task.xsd \r\nhttp://www.springframework.org/schema/context http://www.springframework.org/schema/context/spring-context.xsd\">\r\n\r\n\t<task:executor id=\"requestConsumerChannelExecutor\" pool-size=\"50-150\" queue-capacity=\"5000\" keep-alive=\"50\" rejection-policy=\"CALLER_RUNS\"/>\r\n\t<int:channel id=\"requestConsumerChannel\">\r\n\t\t<int:dispatcher task-executor=\"requestConsumerChannelExecutor\" />\r\n\t</int:channel>\r\n\t\r\n\t<task:executor id=\"responseConsumerChannelExecutor\" pool-size=\"50-150\" queue-capacity=\"5000\" keep-alive=\"50\" rejection-policy=\"CALLER_RUNS\" />\t\r\n\t<int:channel id=\"responseConsumerChannel\" >\r\n\t\t<int:dispatcher task-executor=\"requestConsumerChannelExecutor\" />\r\n\t</int:channel>\r\n\r\n\t<int:channel id=\"requestSenderChannel\" />\r\n\t<int:channel id=\"responseSenderChannel\" />\r\n\t<int:channel id=\"reversalConsumerChannel\" />\r\n\t<int:channel id=\"transformationErrorChannel\" />\r\n\t<int:channel id=\"validationErrorChannel\" />\r\n\t<int:channel id=\"invalidMessageChannel\" />\r\n\r\n</beans>",
          "version": 1,
          "packagingType": "SYSTEM"
        },
        {
          "componentType": "L3",
          "componentId": null,
          "fileType": "WORKFLOW CHAIN",
          "fileName": "workflow-chain.xml",
          "fileContent": "<beans xmlns=\"http://www.springframework.org/schema/beans\"\r\n\txmlns:xsi=\"http://www.w3.org/2001/XMLSchema-instance\"\r\n\txmlns:p=\"http://www.springframework.org/schema/p\"\r\n\txmlns:int=\"http://www.springframework.org/schema/integration\"\r\n\txmlns:task=\"http://www.springframework.org/schema/task\"\r\n\txmlns:context=\"http://www.springframework.org/schema/context\"\r\n\txsi:schemaLocation=\"http://www.springframework.org/schema/beans\r\nhttp://www.springframework.org/schema/beans/spring-beans.xsd \r\nhttp://www.springframework.org/schema/integration http://www.springframework.org/schema/integration/spring-integration.xsd \r\nhttp://www.springframework.org/schema/task http://www.springframework.org/schema/task/spring-task.xsd \r\nhttp://www.springframework.org/schema/context http://www.springframework.org/schema/context/spring-context.xsd\">\r\n\r\n\t<int:chain input-channel=\"requestConsumerChannel\" output-channel=\"requestSenderChannel\">\r\n\t\t<int:transformer ref=\"cartTransformer\" method=\"prepareNativeRequest\"/>\r\n\t\t<int:transformer ref=\"cartTransformer\" method=\"prepareNativeSource\"/>\r\n\t</int:chain>\r\n\t\r\n\t<int:chain input-channel=\"responseConsumerChannel\" output-channel=\"responseSenderChannel\">\r\n\t<int:transformer ref=\"cartTransformer\" method=\"parseNativeResponse\"/>\r\n\t\t<int:transformer ref=\"cartTransformer\" method=\"prepareImfResponse\"/>\r\n\t</int:chain>\r\n\t\r\n\t\r\n\t\r\n</beans>",
          "version": 1,
          "packagingType": "SYSTEM"
        }
      ]
    },
    "configurationId": 51,
    "configurationVersion": 0,
    "imfId": {
      "id": 2,
      "name": "IMF Structure 66",
      "version": 66
    },
    "beanTabDisable": true
  }
}

describe('L3NetworkComponent', () => {
  let component: NetworkComponent;
  let fixture: ComponentFixture<NetworkComponent>;
  let mockStore: MockStore<IAppState>;
  let MockselectViewSettingsList;
  let mockselectL3Network: MemoizedSelector<any, any>;
  let setDefaultLangSpy: jasmine.Spy;
  let l1AdapterService;

  beforeEach(() => {
    const translateService = jasmine.createSpyObj('TranslateService', ['get', 'setDefaultLang']);
    TestBed.configureTestingModule({
      declarations: [NetworkComponent],
      providers: [
        { provide: TranslateService, useClass: translateServiceMock },
        AlertService,
        SnotifyService,
        HttpClient,
        NzModalService,
        L1AdapterService,
        { provide: 'SnotifyToastConfig', useValue: ToastDefaults },
        { provide: L1AdapterService, useValue: l1AdapterService },
        provideMockStore(),
        // other providers
      ],
      imports: [
        CommonModule,
        BrowserAnimationsModule,
        FormsModule,
        NgSelectModule,
        ReactiveFormsModule,
        AlertModule,
        HttpClientModule,
        SharedModule,
        StoreModule.forRoot({}),
        DatePickerRvModule,
        RouterTestingModule,
        HttpClientTestingModule,
        NgxDatatableModule,
        // ImportFileModule,
        TranslateModule.forRoot({
          loader: {
            deps: [HttpClient],
            provide: TranslateLoader,
            useFactory: HttpLoaderFactory,
          },
          missingTranslationHandler: {
            provide: MissingTranslationHandler,
            useClass: MyMissingTranslationHandler,
          },
          useDefaultLang: true,
        }),
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();

    mockStore = TestBed.get(Store);
    fixture = TestBed.createComponent(NetworkComponent);
    component = fixture.componentInstance;
    mockselectL3Network = mockStore.overrideSelector(selectL3Network, selectNetworkJson);
    MockselectViewSettingsList = mockStore.overrideSelector(
      selectViewSettingsList,
      selectViewSettingsListJSON,
    );
    mockStore.refreshState();
    setDefaultLangSpy = translateService.get.and.returnValue(of([]));
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
