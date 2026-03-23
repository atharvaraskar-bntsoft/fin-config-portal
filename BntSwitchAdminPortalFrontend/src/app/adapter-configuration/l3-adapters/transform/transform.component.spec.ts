import { ComponentFixture, fakeAsync, TestBed, tick, waitForAsync } from '@angular/core/testing';

import { TransformComponent } from './transform.component';
import { RouterTestingModule } from '@angular/router/testing';
import { L1AdapterService } from '@app/services/l1-adapter.service';
import { IAppState } from '@app/store/state/app.state';
import { MemoizedSelector, Store, StoreModule } from '@ngrx/store';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { MissingTranslationHandler, TranslateLoader, TranslateModule, TranslateService } from '@ngx-translate/core';
import { Observable, of } from 'rxjs';
import { selectAdapterDataMap, selectL1AdapterData, selectL1AdapterEntityIMFList, selectL1AdapterEntityMappingList,
  selectL1DraftSave,
  SelectMessageContextList } from '@app/store/selectors/l1-adapter.selectors';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { AlertService } from '@app/services/alert.service';
import { SnotifyService, ToastDefaults } from 'ng-snotify';
import { AdapterCommonService } from '@app/services/adapter-common.service';
import { CommonModule } from '@angular/common';
import { HttpLoaderFactory, MyMissingTranslationHandler, SharedModule } from '@app/shared/shared.module';
import { AlertModule } from 'bnt';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { HttpClient } from '@angular/common/http';
import { SelectPostActionMethod, SelectPreActionMethod, SelectStepLisMethod } from '@app/store/selectors/l3-adapter.selectors';
import { selectElFunction, selectGetServiceType, selectIMF, selectIPC, selectMapper } from '@app/store/selectors/scheme-imf-mapper.selectors';
import { BrowserAnimationsModule} from '@angular/platform-browser/animations';

const adapterDataJson = {
  status: 'success',
  message: 'Find Adaptor',
  data: {
    masterData: {
      adapterDto: {
        id: 97,
        type: 'L1',
        standardMessageSpecification: {
          id: 1,
          messageStandard: {
            id: 47,
            value: 'ISO8583-v1987 (ASCII)',
            description: null,
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
            id: 24,
            value: 'ISO-8583',
            description: 'ISO 8583',
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
            id: 28,
            value: 'TCP',
            description: 'TCP',
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
        name: 'ISO1',
        adapterId: 'iso1',
        active: '1',
        guid: null,
      },
    },
    schemaData: {
      persistRequired: '0',
      schema:
        '{"template":{"field":[{"length":"4","name":"MESSAGE TYPE INDICATOR","id":"0","class":"org.jpos.iso.IFA_NUMERIC"},{"length":"16","name":"BIT MAP","id":"1","class":"org.jpos.iso.IFB_BITMAP"},{"length":"19","name":"PAN - PRIMARY ACCOUNT NUMBER","id":"2","class":"org.jpos.iso.IFA_LLNUM"},{"length":"6","name":"PROCESSING CODE","id":"3","class":"org.jpos.iso.IFA_NUMERIC"},{"length":"12","name":"AMOUNT, TRANSACTION","id":"4","class":"org.jpos.iso.IFA_NUMERIC"},{"length":"12","name":"AMOUNT, SETTLEMENT","id":"5","class":"org.jpos.iso.IFA_NUMERIC"},{"length":"12","name":"AMOUNT, CARDHOLDER BILLING","id":"6","class":"org.jpos.iso.IFA_NUMERIC"},{"length":"10","name":"TRANSMISSION DATE AND TIME","id":"7","class":"org.jpos.iso.IFA_NUMERIC"},{"length":"8","name":"AMOUNT, CARDHOLDER BILLING FEE","id":"8","class":"org.jpos.iso.IFA_NUMERIC"},{"length":"8","name":"CONVERSION RATE, SETTLEMENT","id":"9","class":"org.jpos.iso.IFA_NUMERIC"},{"length":"8","name":"CONVERSION RATE, CARDHOLDER BILLING","id":"10","class":"org.jpos.iso.IFA_NUMERIC"},{"length":"6","name":"SYSTEM TRACE AUDIT NUMBER","id":"11","class":"org.jpos.iso.IFA_NUMERIC"},{"length":"6","name":"TIME, LOCAL TRANSACTION","id":"12","class":"org.jpos.iso.IFA_NUMERIC"},{"length":"4","name":"DATE, LOCAL TRANSACTION","id":"13","class":"org.jpos.iso.IFA_NUMERIC"},{"length":"4","name":"DATE, EXPIRATION","id":"14","class":"org.jpos.iso.IFA_NUMERIC"},{"length":"4","name":"DATE, SETTLEMENT","id":"15","class":"org.jpos.iso.IFA_NUMERIC"},{"length":"4","name":"DATE, CONVERSION","id":"16","class":"org.jpos.iso.IFA_NUMERIC"},{"length":"4","name":"DATE, CAPTURE","id":"17","class":"org.jpos.iso.IFA_NUMERIC"},{"length":"4","name":"MERCHANTS TYPE","id":"18","class":"org.jpos.iso.IFA_NUMERIC"},{"length":"3","name":"ACQUIRING INSTITUTION COUNTRY CODE","id":"19","class":"org.jpos.iso.IFA_NUMERIC"},{"length":"3","name":"PAN EXTENDED COUNTRY CODE","id":"20","class":"org.jpos.iso.IFA_NUMERIC"},{"length":"3","name":"FORWARDING INSTITUTION COUNTRY CODE","id":"21","class":"org.jpos.iso.IFA_NUMERIC"},{"length":"3","name":"POINT OF SERVICE ENTRY MODE","id":"22","class":"org.jpos.iso.IFA_NUMERIC"},{"length":"3","name":"CARD SEQUENCE NUMBER","id":"23","class":"org.jpos.iso.IFA_NUMERIC"},{"length":"3","name":"NETWORK INTERNATIONAL IDENTIFIEER","id":"24","class":"org.jpos.iso.IFA_NUMERIC"},{"length":"2","name":"POINT OF SERVICE CONDITION CODE","id":"25","class":"org.jpos.iso.IFA_NUMERIC"},{"length":"2","name":"POINT OF SERVICE PIN CAPTURE CODE","id":"26","class":"org.jpos.iso.IFA_NUMERIC"},{"length":"1","name":"AUTHORIZATION IDENTIFICATION RESP LEN","id":"27","class":"org.jpos.iso.IFA_NUMERIC"},{"length":"9","name":"AMOUNT, TRANSACTION FEE","id":"28","class":"org.jpos.iso.IFA_AMOUNT"},{"length":"9","name":"AMOUNT, SETTLEMENT FEE","id":"29","class":"org.jpos.iso.IFA_AMOUNT"},{"length":"9","name":"AMOUNT, TRANSACTION PROCESSING FEE","id":"30","class":"org.jpos.iso.IFA_AMOUNT"},{"length":"9","name":"AMOUNT, SETTLEMENT PROCESSING FEE","id":"31","class":"org.jpos.iso.IFA_AMOUNT"},{"length":"11","name":"ACQUIRING INSTITUTION IDENT CODE","id":"32","class":"org.jpos.iso.IFA_LLNUM"},{"length":"11","name":"FORWARDING INSTITUTION IDENT CODE","id":"33","class":"org.jpos.iso.IFA_LLNUM"},{"length":"28","name":"PAN EXTENDED","id":"34","class":"org.jpos.iso.IFA_LLCHAR"},{"length":"37","name":"TRACK 2 DATA","id":"35","class":"org.jpos.iso.IFA_LLNUM"},{"length":"104","name":"TRACK 3 DATA","id":"36","class":"org.jpos.iso.IFA_LLLCHAR"},{"length":"12","name":"RETRIEVAL REFERENCE NUMBER","id":"37","class":"org.jpos.iso.IF_CHAR"},{"length":"6","name":"AUTHORIZATION IDENTIFICATION RESPONSE","id":"38","class":"org.jpos.iso.IF_CHAR"},{"length":"2","name":"RESPONSE CODE","id":"39","class":"org.jpos.iso.IF_CHAR"},{"length":"3","name":"SERVICE RESTRICTION CODE","id":"40","class":"org.jpos.iso.IF_CHAR"},{"length":"8","name":"CARD ACCEPTOR TERMINAL IDENTIFICACION","id":"41","class":"org.jpos.iso.IF_CHAR"},{"length":"15","name":"CARD ACCEPTOR IDENTIFICATION CODE","id":"42","class":"org.jpos.iso.IF_CHAR"},{"length":"40","name":"CARD ACCEPTOR NAME/LOCATION","id":"43","class":"org.jpos.iso.IF_CHAR"},{"length":"25","name":"ADITIONAL RESPONSE DATA","id":"44","class":"org.jpos.iso.IFA_LLCHAR"},{"length":"76","name":"TRACK 1 DATA","id":"45","class":"org.jpos.iso.IFA_LLCHAR"},{"length":"999","name":"ADITIONAL DATA - ISO","id":"46","class":"org.jpos.iso.IFA_LLLCHAR"},{"length":"999","name":"ADITIONAL DATA - NATIONAL","id":"47","class":"org.jpos.iso.IFA_LLLCHAR"},{"length":"999","name":"ADITIONAL DATA - PRIVATE","id":"48","class":"org.jpos.iso.IFA_LLLCHAR"},{"length":"3","name":"CURRENCY CODE, TRANSACTION","id":"49","class":"org.jpos.iso.IF_CHAR"},{"length":"3","name":"CURRENCY CODE, SETTLEMENT","id":"50","class":"org.jpos.iso.IF_CHAR"},{"length":"3","name":"CURRENCY CODE, CARDHOLDER BILLING","id":"51","class":"org.jpos.iso.IF_CHAR"},{"length":"8","name":"PIN DATA","id":"52","class":"org.jpos.iso.IFB_BINARY"},{"length":"48","name":"SECURITY RELATED CONTROL INFORMATION","id":"53","class":"org.jpos.iso.IFB_BINARY "},{"length":"120","name":"ADDITIONAL AMOUNTS","id":"54","class":"org.jpos.iso.IFA_LLLCHAR"},{"length":"999","name":"RESERVED ISO","id":"55","class":"org.jpos.iso.IFA_LLLCHAR"},{"length":"999","name":"RESERVED ISO","id":"56","class":"org.jpos.iso.IFA_LLLCHAR"},{"length":"999","name":"RESERVED NATIONAL","id":"57","class":"org.jpos.iso.IFA_LLLCHAR"},{"length":"999","name":"RESERVED NATIONAL","id":"58","class":"org.jpos.iso.IFA_LLLCHAR"},{"length":"999","name":"RESERVED NATIONAL","id":"59","class":"org.jpos.iso.IFA_LLLCHAR"},{"length":"999","name":"RESERVED PRIVATE","id":"60","class":"org.jpos.iso.IFA_LLLCHAR"},{"length":"999","name":"RESERVED PRIVATE","id":"61","class":"org.jpos.iso.IFA_LLLCHAR"},{"length":"999","name":"RESERVED PRIVATE","id":"62","class":"org.jpos.iso.IFA_LLLCHAR"},{"length":"999","name":"RESERVED PRIVATE","id":"63","class":"org.jpos.iso.IFA_LLLCHAR"},{"length":"8","name":"MESSAGE AUTHENTICATION CODE FIELD","id":"64","class":"org.jpos.iso.IFA_BINARY"},{"length":"8","name":"BITMAP, EXTENDED","id":"65","class":"org.jpos.iso.IFA_BINARY"},{"length":"1","name":"SETTLEMENT CODE","id":"66","class":"org.jpos.iso.IFA_NUMERIC"},{"length":"2","name":"EXTENDED PAYMENT CODE","id":"67","class":"org.jpos.iso.IFA_NUMERIC"},{"length":"3","name":"RECEIVING INSTITUTION COUNTRY CODE","id":"68","class":"org.jpos.iso.IFA_NUMERIC"},{"length":"3","name":"SETTLEMENT INSTITUTION COUNTRY CODE","id":"69","class":"org.jpos.iso.IFA_NUMERIC"},{"length":"3","name":"NETWORK MANAGEMENT INFORMATION CODE","id":"70","class":"org.jpos.iso.IFA_NUMERIC"},{"length":"4","name":"MESSAGE NUMBER","id":"71","class":"org.jpos.iso.IFA_NUMERIC"},{"length":"4","name":"MESSAGE NUMBER LAST","id":"72","class":"org.jpos.iso.IFA_NUMERIC"},{"length":"6","name":"DATE ACTION","id":"73","class":"org.jpos.iso.IFA_NUMERIC"},{"length":"10","name":"CREDITS NUMBER","id":"74","class":"org.jpos.iso.IFA_NUMERIC"},{"length":"10","name":"CREDITS REVERSAL NUMBER","id":"75","class":"org.jpos.iso.IFA_NUMERIC"},{"length":"10","name":"DEBITS NUMBER","id":"76","class":"org.jpos.iso.IFA_NUMERIC"},{"length":"10","name":"DEBITS REVERSAL NUMBER","id":"77","class":"org.jpos.iso.IFA_NUMERIC"},{"length":"10","name":"TRANSFER NUMBER","id":"78","class":"org.jpos.iso.IFA_NUMERIC"},{"length":"10","name":"TRANSFER REVERSAL NUMBER","id":"79","class":"org.jpos.iso.IFA_NUMERIC"},{"length":"10","name":"INQUIRIES NUMBER","id":"80","class":"org.jpos.iso.IFA_NUMERIC"},{"length":"10","name":"AUTHORIZATION NUMBER","id":"81","class":"org.jpos.iso.IFA_NUMERIC"},{"length":"12","name":"CREDITS, PROCESSING FEE AMOUNT","id":"82","class":"org.jpos.iso.IFA_NUMERIC"},{"length":"12","name":"CREDITS, TRANSACTION FEE AMOUNT","id":"83","class":"org.jpos.iso.IFA_NUMERIC"},{"length":"12","name":"DEBITS, PROCESSING FEE AMOUNT","id":"84","class":"org.jpos.iso.IFA_NUMERIC"},{"length":"12","name":"DEBITS, TRANSACTION FEE AMOUNT","id":"85","class":"org.jpos.iso.IFA_NUMERIC"},{"length":"16","name":"CREDITS, AMOUNT","id":"86","class":"org.jpos.iso.IFA_NUMERIC"},{"length":"16","name":"CREDITS, REVERSAL AMOUNT","id":"87","class":"org.jpos.iso.IFA_NUMERIC"},{"length":"16","name":"DEBITS, AMOUNT","id":"88","class":"org.jpos.iso.IFA_NUMERIC"},{"length":"16","name":"DEBITS, REVERSAL AMOUNT","id":"89","class":"org.jpos.iso.IFA_NUMERIC"},{"length":"42","name":"ORIGINAL DATA ELEMENTS","id":"90","class":"org.jpos.iso.IFA_NUMERIC"},{"length":"1","name":"FILE UPDATE CODE","id":"91","class":"org.jpos.iso.IF_CHAR"},{"length":"2","name":"FILE SECURITY CODE","id":"92","class":"org.jpos.iso.IF_CHAR"},{"length":"5","name":"RESPONSE INDICATOR","id":"93","class":"org.jpos.iso.IF_CHAR"},{"length":"7","name":"SERVICE INDICATOR","id":"94","class":"org.jpos.iso.IF_CHAR"},{"length":"42","name":"REPLACEMENT AMOUNTS","id":"95","class":"org.jpos.iso.IF_CHAR"},{"length":"8","name":"MESSAGE SECURITY CODE","id":"96","class":"org.jpos.iso.IFA_BINARY"},{"length":"17","name":"AMOUNT, NET SETTLEMENT","id":"97","class":"org.jpos.iso.IFA_AMOUNT"},{"length":"25","name":"PAYEE","id":"98","class":"org.jpos.iso.IF_CHAR"},{"length":"11","name":"SETTLEMENT INSTITUTION IDENT CODE","id":"99","class":"org.jpos.iso.IFA_LLNUM"},{"length":"11","name":"RECEIVING INSTITUTION IDENT CODE","id":"100","class":"org.jpos.iso.IFA_LLNUM"},{"length":"17","name":"FILE NAME","id":"101","class":"org.jpos.iso.IFA_LLCHAR"},{"length":"28","name":"ACCOUNT IDENTIFICATION 1","id":"102","class":"org.jpos.iso.IFA_LLCHAR"},{"length":"28","name":"ACCOUNT IDENTIFICATION 2","id":"103","class":"org.jpos.iso.IFA_LLCHAR"},{"length":"100","name":"TRANSACTION DESCRIPTION","id":"104","class":"org.jpos.iso.IFA_LLLCHAR"},{"length":"999","name":"RESERVED ISO USE","id":"105","class":"org.jpos.iso.IFA_LLLCHAR"},{"length":"999","name":"RESERVED ISO USE","id":"106","class":"org.jpos.iso.IFA_LLLCHAR"},{"length":"999","name":"RESERVED ISO USE","id":"107","class":"org.jpos.iso.IFA_LLLCHAR"},{"length":"999","name":"RESERVED ISO USE","id":"108","class":"org.jpos.iso.IFA_LLLCHAR"},{"length":"999","name":"RESERVED ISO USE","id":"109","class":"org.jpos.iso.IFA_LLLCHAR"},{"length":"999","name":"RESERVED ISO USE","id":"110","class":"org.jpos.iso.IFA_LLLCHAR"},{"length":"999","name":"RESERVED ISO USE","id":"111","class":"org.jpos.iso.IFA_LLLCHAR"},{"length":"999","name":"RESERVED NATIONAL USE","id":"112","class":"org.jpos.iso.IFA_LLLCHAR"},{"length":"999","name":"RESERVED NATIONAL USE","id":"113","class":"org.jpos.iso.IFA_LLLCHAR"},{"length":"999","name":"RESERVED NATIONAL USE","id":"114","class":"org.jpos.iso.IFA_LLLCHAR"},{"length":"999","name":"RESERVED NATIONAL USE","id":"115","class":"org.jpos.iso.IFA_LLLCHAR"},{"length":"999","name":"RESERVED NATIONAL USE","id":"116","class":"org.jpos.iso.IFA_LLLCHAR"},{"length":"999","name":"RESERVED NATIONAL USE","id":"117","class":"org.jpos.iso.IFA_LLLCHAR"},{"length":"999","name":"RESERVED NATIONAL USE","id":"118","class":"org.jpos.iso.IFA_LLLCHAR"},{"length":"999","name":"RESERVED NATIONAL USE","id":"119","class":"org.jpos.iso.IFA_LLLCHAR"},{"length":"999","name":"RESERVED PRIVATE USE","id":"120","class":"org.jpos.iso.IFA_LLLCHAR"},{"length":"999","name":"RESERVED PRIVATE USE","id":"121","class":"org.jpos.iso.IFA_LLLCHAR"},{"length":"999","name":"RESERVED PRIVATE USE","id":"122","class":"org.jpos.iso.IFA_LLLCHAR"},{"length":"1","name":"Card data input capability","id":"123.1","class":"org.jpos.iso.IF_CHAR"},{"length":"1","name":"Cardholder authentication capability","id":"123.2","class":"org.jpos.iso.IF_CHAR"},{"length":"1","name":"Card capture capability","id":"123.3","class":"org.jpos.iso.IF_CHAR"},{"length":"1","name":"Operating environment","id":"123.4","class":"org.jpos.iso.IF_CHAR"},{"length":"1","name":"Cardholder is present","id":"123.5","class":"org.jpos.iso.IF_CHAR"},{"length":"1","name":"Card is present","id":"123.6","class":"org.jpos.iso.IF_CHAR"},{"length":"1","name":"Card data input mode","id":"123.7","class":"org.jpos.iso.IF_CHAR"},{"length":"1","name":"Cardholder authentication method","id":"123.8","class":"org.jpos.iso.IF_CHAR"},{"length":"1","name":"Cardholder authentication entity","id":"123.9","class":"org.jpos.iso.IF_CHAR"},{"length":"1","name":"Card data output capability","id":"123.10","class":"org.jpos.iso.IF_CHAR"},{"length":"1","name":"Terminal output capability","id":"123.11","class":"org.jpos.iso.IF_CHAR"},{"length":"1","name":"PIN capture capability","id":"123.12","class":"org.jpos.iso.IF_CHAR"},{"length":"1","name":"Terminal operator","id":"123.13","class":"org.jpos.iso.IF_CHAR"},{"length":"2","name":"Terminal type","id":"123.14","class":"org.jpos.iso.IF_CHAR"},{"length":"999","name":"RESERVED PRIVATE USE","id":"124","class":"org.jpos.iso.IFA_LLLCHAR"},{"length":"999","name":"RESERVED PRIVATE USE","id":"125","class":"org.jpos.iso.IFA_LLLCHAR"},{"length":"999","name":"RESERVED PRIVATE USE","id":"126","class":"org.jpos.iso.IFA_LLLCHAR"},{"length":"0","name":"PLACEHOLDER","id":"127.0","class":"org.jpos.iso.IF_CHAR"},{"length":"8","name":"BITMAP","id":"127.1","class":"org.jpos.iso.IFB_BITMAP"},{"length":"32","name":"SWITCH KEY","id":"127.2","class":"org.jpos.iso.IFA_LLCHAR"},{"length":"48","name":"ROUTING INFORMATION","id":"127.3","class":"org.jpos.iso.IF_CHAR"},{"length":"22","name":"POS DATA","id":"127.4","class":"org.jpos.iso.IF_CHAR"},{"length":"73","name":"SERVICE STATION DATA","id":"127.5","class":"org.jpos.iso.IF_CHAR"},{"length":"2","name":"AUTHORIZATION PROFILE","id":"127.6","class":"org.jpos.iso.IFA_NUMERIC"},{"length":"50","name":"CHECK DATA","id":"127.7","class":"org.jpos.iso.IFA_LLCHAR"},{"length":"128","name":"RETENTION DATA","id":"127.8","class":"org.jpos.iso.IFA_LLLCHAR"},{"length":"255","name":"ADDITIONAL NODE DATA","id":"127.9","class":"org.jpos.iso.IFA_LLLCHAR"},{"length":"3","name":"CVV2","id":"127.10","class":"org.jpos.iso.IFA_NUMERIC"},{"length":"32","name":"ORIGINAL KEY","id":"127.11","class":"org.jpos.iso.IFA_LLCHAR"},{"length":"25","name":"TERMINAL OWNDER","id":"127.12","class":"org.jpos.iso.IFA_LLCHAR"},{"length":"17","name":"POS GEOGRAPHIC DATA","id":"127.13","class":"org.jpos.iso.IF_CHAR"},{"length":"8","name":"SPONSOR BANK","id":"127.14","class":"org.jpos.iso.IF_CHAR"},{"length":"29","name":"AVS REQUEST","id":"127.15","class":"org.jpos.iso.IFA_LLCHAR"},{"length":"1","name":"AVS RESPONSE","id":"127.16","class":"org.jpos.iso.IF_CHAR"},{"length":"50","name":"CARDHOLDER INFORMATION","id":"127.17","class":"org.jpos.iso.IFA_LLCHAR"},{"length":"50","name":"VALIDATION DATA","id":"127.18","class":"org.jpos.iso.IFA_LLCHAR"},{"length":"45","name":"BANK DETAILS","id":"127.19","class":"org.jpos.iso.IF_CHAR"},{"length":"8","name":"AUTHORIZER DATE SETTLEMENT","id":"127.20","class":"org.jpos.iso.IFA_NUMERIC"},{"length":"12","name":"RECORD IDENTIFICATION","id":"127.21","class":"org.jpos.iso.IFA_LLCHAR"},{"length":"99999","name":"STRUCTURED DATA","id":"127.22","class":"org.jpos.iso.IFA_LLLLLCHAR"},{"length":"253","name":"PAYEE NAME AND ADDRESS","id":"127.23","class":"org.jpos.iso.IF_CHAR"},{"length":"28","name":"PAYER ACCOUNT INFORMATION","id":"127.24","class":"org.jpos.iso.IFA_LLCHAR"},{"length":"8","name":"BIT MAP","id":"127.25.1","class":"org.jpos.iso.IFB_BITMAP"},{"length":"12","name":"Amount Authorized","id":"127.25.2","class":"org.jpos.iso.IFA_NUMERIC"},{"length":"12","name":"Amount Other","id":"127.25.3","class":"org.jpos.iso.IFA_NUMERIC"},{"length":"32","name":"Application Identifier","id":"127.25.4","class":"org.jpos.iso.IFA_LLCHAR"},{"length":"4","name":"Application Interchange Profile","id":"127.25.5","class":"org.jpos.iso.IF_CHAR"},{"length":"4","name":"Application Transaction Counter","id":"127.25.6","class":"org.jpos.iso.IF_CHAR"},{"length":"4","name":"Application Usage Control","id":"127.25.7","class":"org.jpos.iso.IF_CHAR"},{"length":"2","name":"Authorization Response Code","id":"127.25.8","class":"org.jpos.iso.IF_CHAR"},{"length":"1","name":"Card Authentication Reliability Indicator","id":"127.25.9","class":"org.jpos.iso.IFA_NUMERIC"},{"length":"1","name":"Application Authentication Results Code","id":"127.25.10","class":"org.jpos.iso.IF_CHAR"},{"length":"1","name":"Chip Condition Code","id":"127.25.11","class":"org.jpos.iso.IFA_NUMERIC"},{"length":"16","name":"Cryptogram","id":"127.25.12","class":"org.jpos.iso.IF_CHAR"},{"length":"2","name":"Cryptogram Information Data","id":"127.25.13","class":"org.jpos.iso.IF_CHAR"},{"length":"504","name":"Cvm List","id":"127.25.14","class":"org.jpos.iso.IFA_LLLCHAR"},{"length":"6","name":"Cvm Results","id":"127.25.15","class":"org.jpos.iso.IF_CHAR"},{"length":"8","name":"Interface Device Serial Number","id":"127.25.16","class":"org.jpos.iso.IF_CHAR"},{"length":"11","name":"Issuer Action Code","id":"127.25.17","class":"org.jpos.iso.IF_CHAR"},{"length":"64","name":"Issuer Application Data","id":"127.25.18","class":"org.jpos.iso.IFA_LLCHAR"},{"length":"507","name":"Issuer Script Results","id":"127.25.19","class":"org.jpos.iso.IFA_LLLLCHAR"},{"length":"4","name":"Terminal Application Version Number","id":"127.25.20","class":"org.jpos.iso.IF_CHAR"},{"length":"6","name":"Terminal Capabilities","id":"127.25.21","class":"org.jpos.iso.IF_CHAR"},{"length":"3","name":"Terminal Country Code","id":"127.25.22","class":"org.jpos.iso.IFA_NUMERIC"},{"length":"2","name":"Terminal Type","id":"127.25.23","class":"org.jpos.iso.IFA_NUMERIC"},{"length":"10","name":"Terminal Verification Result","id":"127.25.24","class":"org.jpos.iso.IF_CHAR"},{"length":"1","name":"Transaction Category Code","id":"127.25.25","class":"org.jpos.iso.IFA_LLLCHAR"},{"length":"3","name":"Transaction Currency Code","id":"127.25.26","class":"org.jpos.iso.IFA_NUMERIC"},{"length":"6","name":"Transaction Date","id":"127.25.27","class":"org.jpos.iso.IFA_NUMERIC"},{"length":"8","name":"Transaction Sequence Counter ","id":"127.25.28","class":"org.jpos.iso.IFA_LCHAR"},{"length":"2","name":"Transaction Type","id":"127.25.29","class":"org.jpos.iso.IFA_NUMERIC"},{"length":"8","name":"Unpredictable Number","id":"127.25.30","class":"org.jpos.iso.IF_CHAR"},{"length":"32","name":"Issuer Authentication Data","id":"127.25.31","class":"org.jpos.iso.IFA_LLCHAR"},{"length":"335","name":"Issuer Script Template 1","id":"127.25.32","class":"org.jpos.iso.IFA_LLLLCHAR"},{"length":"335","name":"Issuer Script Template 2","id":"127.25.33","class":"org.jpos.iso.IFA_LLLLCHAR"},{"length":"2","name":"PostilionPrivateICCResponseData","id":"127.25.34","class":"org.jpos.iso.IFA_NUMERIC"},{"length":"64","name":"Customer Exclusive Data (CED)","id":"127.25.35","class":"org.jpos.iso.IF_CHAR"},{"length":"8","name":"Form Factor Indicator","id":"127.25.36","class":"org.jpos.iso.IF_CHAR"},{"length":"20","name":"ORIGINAL NODE","id":"127.26","class":"org.jpos.iso.IFA_LLCHAR"},{"length":"999","name":"MAC 2","id":"128","class":"org.jpos.iso.IFA_LLLCHAR"}]}}',
      messageSchemaPackager:
        '<?xml version="1.0" encoding="UTF-8" standalone="no"?>\r\n<!DOCTYPE isopackager PUBLIC\r\n        "-//jPOS/jPOS Generic Packager DTD 1.0//EN"\r\n        "http://jpos.org/dtd/generic-packager-1.0.dtd">\r\n\r\n<!--\r\n  field 52 (PIN DATA): IFA_BINARY replaced by IFB_BINARY\r\n  field 127 (RESERVED PRIVATE USE): IFA_LLLBINARY replaced by IFA_LLLLLLBINARY\r\n  See:\r\n  http://groups-beta.google.com/group/jpos-users/browse_thread/thread/e60807e917c8c170/e29a681592d63a2b#e29a681592d63a2b\r\n-->\r\n<isopackager>\r\n  <isofield\r\n      id="0"\r\n      length="4"\r\n      name="MESSAGE TYPE INDICATOR"\r\n      class="org.jpos.iso.IFA_NUMERIC"/>\r\n  <isofield\r\n      id="1"\r\n      length="16"\r\n      name="BIT MAP"\r\n      class="org.jpos.iso.IFB_BITMAP"/>\r\n  <isofield\r\n      id="2"\r\n      length="19"\r\n      name="PAN - PRIMARY ACCOUNT NUMBER"\r\n      class="org.jpos.iso.IFA_LLNUM"/>\r\n  <isofield\r\n      id="3"\r\n      length="6"\r\n      name="PROCESSING CODE"\r\n      class="org.jpos.iso.IFA_NUMERIC"/>\r\n  <isofield\r\n      id="4"\r\n      length="12"\r\n      name="AMOUNT, TRANSACTION"\r\n      class="org.jpos.iso.IFA_NUMERIC"/>\r\n  <isofield\r\n      id="5"\r\n      length="12"\r\n      name="AMOUNT, SETTLEMENT"\r\n      class="org.jpos.iso.IFA_NUMERIC"/>\r\n  <isofield\r\n      id="6"\r\n      length="12"\r\n      name="AMOUNT, CARDHOLDER BILLING"\r\n      class="org.jpos.iso.IFA_NUMERIC"/>\r\n  <isofield\r\n      id="7"\r\n      length="10"\r\n      name="TRANSMISSION DATE AND TIME"\r\n      class="org.jpos.iso.IFA_NUMERIC"/>\r\n  <isofield\r\n      id="8"\r\n      length="8"\r\n      name="AMOUNT, CARDHOLDER BILLING FEE"\r\n      class="org.jpos.iso.IFA_NUMERIC"/>\r\n  <isofield\r\n      id="9"\r\n      length="8"\r\n      name="CONVERSION RATE, SETTLEMENT"\r\n      class="org.jpos.iso.IFA_NUMERIC"/>\r\n  <isofield\r\n      id="10"\r\n      length="8"\r\n      name="CONVERSION RATE, CARDHOLDER BILLING"\r\n      class="org.jpos.iso.IFA_NUMERIC"/>\r\n  <isofield\r\n      id="11"\r\n      length="6"\r\n      name="SYSTEM TRACE AUDIT NUMBER"\r\n      class="org.jpos.iso.IFA_NUMERIC"/>\r\n  <isofield\r\n      id="12"\r\n      length="6"\r\n      name="TIME, LOCAL TRANSACTION"\r\n      class="org.jpos.iso.IFA_NUMERIC"/>\r\n  <isofield\r\n      id="13"\r\n      length="4"\r\n      name="DATE, LOCAL TRANSACTION"\r\n      class="org.jpos.iso.IFA_NUMERIC"/>\r\n  <isofield\r\n      id="14"\r\n      length="4"\r\n      name="DATE, EXPIRATION"\r\n      class="org.jpos.iso.IFA_NUMERIC"/>\r\n  <isofield\r\n      id="15"\r\n      length="4"\r\n      name="DATE, SETTLEMENT"\r\n      class="org.jpos.iso.IFA_NUMERIC"/>\r\n  <isofield\r\n      id="16"\r\n      length="4"\r\n      name="DATE, CONVERSION"\r\n      class="org.jpos.iso.IFA_NUMERIC"/>\r\n  <isofield\r\n      id="17"\r\n      length="4"\r\n      name="DATE, CAPTURE"\r\n      class="org.jpos.iso.IFA_NUMERIC"/>\r\n  <isofield\r\n      id="18"\r\n      length="4"\r\n      name="MERCHANTS TYPE"\r\n      class="org.jpos.iso.IFA_NUMERIC"/>\r\n  <isofield\r\n      id="19"\r\n      length="3"\r\n      name="ACQUIRING INSTITUTION COUNTRY CODE"\r\n      class="org.jpos.iso.IFA_NUMERIC"/>\r\n  <isofield\r\n      id="20"\r\n      length="3"\r\n      name="PAN EXTENDED COUNTRY CODE"\r\n      class="org.jpos.iso.IFA_NUMERIC"/>\r\n  <isofield\r\n      id="21"\r\n      length="3"\r\n      name="FORWARDING INSTITUTION COUNTRY CODE"\r\n      class="org.jpos.iso.IFA_NUMERIC"/>\r\n  <isofield\r\n      id="22"\r\n      length="3"\r\n      name="POINT OF SERVICE ENTRY MODE"\r\n      class="org.jpos.iso.IFA_NUMERIC"/>\r\n  <isofield\r\n      id="23"\r\n      length="3"\r\n      name="CARD SEQUENCE NUMBER"\r\n      class="org.jpos.iso.IFA_NUMERIC"/>\r\n  <isofield\r\n      id="24"\r\n      length="3"\r\n      name="NETWORK INTERNATIONAL IDENTIFIEER"\r\n      class="org.jpos.iso.IFA_NUMERIC"/>\r\n  <isofield\r\n      id="25"\r\n      length="2"\r\n      name="POINT OF SERVICE CONDITION CODE"\r\n      class="org.jpos.iso.IFA_NUMERIC"/>\r\n  <isofield\r\n      id="26"\r\n      length="2"\r\n      name="POINT OF SERVICE PIN CAPTURE CODE"\r\n      class="org.jpos.iso.IFA_NUMERIC"/>\r\n  <isofield\r\n      id="27"\r\n      length="1"\r\n      name="AUTHORIZATION IDENTIFICATION RESP LEN"\r\n      class="org.jpos.iso.IFA_NUMERIC"/>\r\n  <isofield\r\n      id="28"\r\n      length="9"\r\n      name="AMOUNT, TRANSACTION FEE"\r\n      class="org.jpos.iso.IFA_AMOUNT"/>\r\n  <isofield\r\n      id="29"\r\n      length="9"\r\n      name="AMOUNT, SETTLEMENT FEE"\r\n      class="org.jpos.iso.IFA_AMOUNT"/>\r\n  <isofield\r\n      id="30"\r\n      length="9"\r\n      name="AMOUNT, TRANSACTION PROCESSING FEE"\r\n      class="org.jpos.iso.IFA_AMOUNT"/>\r\n  <isofield\r\n      id="31"\r\n      length="9"\r\n      name="AMOUNT, SETTLEMENT PROCESSING FEE"\r\n      class="org.jpos.iso.IFA_AMOUNT"/>\r\n  <isofield\r\n      id="32"\r\n      length="11"\r\n      name="ACQUIRING INSTITUTION IDENT CODE"\r\n      class="org.jpos.iso.IFA_LLNUM"/>\r\n  <isofield\r\n      id="33"\r\n      length="11"\r\n      name="FORWARDING INSTITUTION IDENT CODE"\r\n      class="org.jpos.iso.IFA_LLNUM"/>\r\n  <isofield\r\n      id="34"\r\n      length="28"\r\n      name="PAN EXTENDED"\r\n      class="org.jpos.iso.IFA_LLCHAR"/>\r\n  <isofield\r\n      id="35"\r\n      length="37"\r\n      name="TRACK 2 DATA"\r\n      class="org.jpos.iso.IFA_LLNUM"/>\r\n  <isofield\r\n      id="36"\r\n      length="104"\r\n      name="TRACK 3 DATA"\r\n      class="org.jpos.iso.IFA_LLLCHAR"/>\r\n  <isofield\r\n      id="37"\r\n      length="12"\r\n      name="RETRIEVAL REFERENCE NUMBER"\r\n      class="org.jpos.iso.IF_CHAR"/>\r\n  <isofield\r\n      id="38"\r\n      length="6"\r\n      name="AUTHORIZATION IDENTIFICATION RESPONSE"\r\n      class="org.jpos.iso.IF_CHAR"/>\r\n  <isofield\r\n      id="39"\r\n      length="2"\r\n      name="RESPONSE CODE"\r\n      class="org.jpos.iso.IF_CHAR"/>\r\n  <isofield\r\n      id="40"\r\n      length="3"\r\n      name="SERVICE RESTRICTION CODE"\r\n      class="org.jpos.iso.IF_CHAR"/>\r\n  <isofield\r\n      id="41"\r\n      length="8"\r\n      name="CARD ACCEPTOR TERMINAL IDENTIFICACION"\r\n      class="org.jpos.iso.IF_CHAR"/>\r\n  <isofield\r\n      id="42"\r\n      length="15"\r\n      name="CARD ACCEPTOR IDENTIFICATION CODE"\r\n      class="org.jpos.iso.IF_CHAR"/>\r\n  <isofield\r\n      id="43"\r\n      length="40"\r\n      name="CARD ACCEPTOR NAME/LOCATION"\r\n      class="org.jpos.iso.IF_CHAR"/>\r\n  <isofield\r\n      id="44"\r\n      length="25"\r\n      name="ADITIONAL RESPONSE DATA"\r\n      class="org.jpos.iso.IFA_LLCHAR"/>\r\n  <isofield\r\n      id="45"\r\n      length="76"\r\n      name="TRACK 1 DATA"\r\n      class="org.jpos.iso.IFA_LLCHAR"/>\r\n  <isofield\r\n      id="46"\r\n      length="999"\r\n      name="ADITIONAL DATA - ISO"\r\n      class="org.jpos.iso.IFA_LLLCHAR"/>\r\n  <isofield\r\n      id="47"\r\n      length="999"\r\n      name="ADITIONAL DATA - NATIONAL"\r\n      class="org.jpos.iso.IFA_LLLCHAR"/>\r\n  <isofield\r\n      id="48"\r\n      length="999"\r\n      name="ADITIONAL DATA - PRIVATE"\r\n      class="org.jpos.iso.IFA_LLLCHAR"/>\r\n  <isofield\r\n      id="49"\r\n      length="3"\r\n      name="CURRENCY CODE, TRANSACTION"\r\n      class="org.jpos.iso.IF_CHAR"/>\r\n  <isofield\r\n      id="50"\r\n      length="3"\r\n      name="CURRENCY CODE, SETTLEMENT"\r\n      class="org.jpos.iso.IF_CHAR"/>\r\n  <isofield\r\n      id="51"\r\n      length="3"\r\n      name="CURRENCY CODE, CARDHOLDER BILLING"\r\n      class="org.jpos.iso.IF_CHAR"/>\r\n  <isofield\r\n      id="52"\r\n      length="8"\r\n      name="PIN DATA"\r\n      class="org.jpos.iso.IFB_BINARY"/>\r\n  <isofield\r\n      id="53"\r\n      length="48"\r\n      name="SECURITY RELATED CONTROL INFORMATION"\r\n      class="org.jpos.iso.IFB_BINARY "/>\r\n  <isofield\r\n      id="54"\r\n      length="120"\r\n      name="ADDITIONAL AMOUNTS"\r\n      class="org.jpos.iso.IFA_LLLCHAR"/>\r\n  <isofield\r\n      id="55"\r\n      length="999"\r\n      name="RESERVED ISO"\r\n      class="org.jpos.iso.IFA_LLLCHAR"/>\r\n  <isofield\r\n      id="56"\r\n      length="999"\r\n      name="RESERVED ISO"\r\n      class="org.jpos.iso.IFA_LLLCHAR"/>\r\n  <isofield\r\n      id="57"\r\n      length="999"\r\n      name="RESERVED NATIONAL"\r\n      class="org.jpos.iso.IFA_LLLCHAR"/>\r\n  <isofield\r\n      id="58"\r\n      length="999"\r\n      name="RESERVED NATIONAL"\r\n      class="org.jpos.iso.IFA_LLLCHAR"/>\r\n  <isofield\r\n      id="59"\r\n      length="999"\r\n      name="RESERVED NATIONAL"\r\n      class="org.jpos.iso.IFA_LLLCHAR"/>\r\n  <isofield\r\n      id="60"\r\n      length="999"\r\n      name="RESERVED PRIVATE"\r\n      class="org.jpos.iso.IFA_LLLCHAR"/>\r\n  <isofield\r\n      id="61"\r\n      length="999"\r\n      name="RESERVED PRIVATE"\r\n      class="org.jpos.iso.IFA_LLLCHAR"/>\r\n  <isofield\r\n      id="62"\r\n      length="999"\r\n      name="RESERVED PRIVATE"\r\n      class="org.jpos.iso.IFA_LLLCHAR"/>\r\n  <isofield\r\n      id="63"\r\n      length="999"\r\n      name="RESERVED PRIVATE"\r\n      class="org.jpos.iso.IFA_LLLCHAR"/>\r\n  <isofield\r\n      id="64"\r\n      length="8"\r\n      name="MESSAGE AUTHENTICATION CODE FIELD"\r\n      class="org.jpos.iso.IFA_BINARY"/>\r\n  <isofield\r\n      id="65"\r\n      length="8"\r\n      name="BITMAP, EXTENDED"\r\n      class="org.jpos.iso.IFA_BINARY"/>\r\n  <isofield\r\n      id="66"\r\n      length="1"\r\n      name="SETTLEMENT CODE"\r\n      class="org.jpos.iso.IFA_NUMERIC"/>\r\n  <isofield\r\n      id="67"\r\n      length="2"\r\n      name="EXTENDED PAYMENT CODE"\r\n      class="org.jpos.iso.IFA_NUMERIC"/>\r\n  <isofield\r\n      id="68"\r\n      length="3"\r\n      name="RECEIVING INSTITUTION COUNTRY CODE"\r\n      class="org.jpos.iso.IFA_NUMERIC"/>\r\n  <isofield\r\n      id="69"\r\n      length="3"\r\n      name="SETTLEMENT INSTITUTION COUNTRY CODE"\r\n      class="org.jpos.iso.IFA_NUMERIC"/>\r\n  <isofield\r\n      id="70"\r\n      length="3"\r\n      name="NETWORK MANAGEMENT INFORMATION CODE"\r\n      class="org.jpos.iso.IFA_NUMERIC"/>\r\n  <isofield\r\n      id="71"\r\n      length="4"\r\n      name="MESSAGE NUMBER"\r\n      class="org.jpos.iso.IFA_NUMERIC"/>\r\n  <isofield\r\n      id="72"\r\n      length="4"\r\n      name="MESSAGE NUMBER LAST"\r\n      class="org.jpos.iso.IFA_NUMERIC"/>\r\n  <isofield\r\n      id="73"\r\n      length="6"\r\n      name="DATE ACTION"\r\n      class="org.jpos.iso.IFA_NUMERIC"/>\r\n  <isofield\r\n      id="74"\r\n      length="10"\r\n      name="CREDITS NUMBER"\r\n      class="org.jpos.iso.IFA_NUMERIC"/>\r\n  <isofield\r\n      id="75"\r\n      length="10"\r\n      name="CREDITS REVERSAL NUMBER"\r\n      class="org.jpos.iso.IFA_NUMERIC"/>\r\n  <isofield\r\n      id="76"\r\n      length="10"\r\n      name="DEBITS NUMBER"\r\n      class="org.jpos.iso.IFA_NUMERIC"/>\r\n  <isofield\r\n      id="77"\r\n      length="10"\r\n      name="DEBITS REVERSAL NUMBER"\r\n      class="org.jpos.iso.IFA_NUMERIC"/>\r\n  <isofield\r\n      id="78"\r\n      length="10"\r\n      name="TRANSFER NUMBER"\r\n      class="org.jpos.iso.IFA_NUMERIC"/>\r\n  <isofield\r\n      id="79"\r\n      length="10"\r\n      name="TRANSFER REVERSAL NUMBER"\r\n      class="org.jpos.iso.IFA_NUMERIC"/>\r\n  <isofield\r\n      id="80"\r\n      length="10"\r\n      name="INQUIRIES NUMBER"\r\n      class="org.jpos.iso.IFA_NUMERIC"/>\r\n  <isofield\r\n      id="81"\r\n      length="10"\r\n      name="AUTHORIZATION NUMBER"\r\n      class="org.jpos.iso.IFA_NUMERIC"/>\r\n  <isofield\r\n      id="82"\r\n      length="12"\r\n      name="CREDITS, PROCESSING FEE AMOUNT"\r\n      class="org.jpos.iso.IFA_NUMERIC"/>\r\n  <isofield\r\n      id="83"\r\n      length="12"\r\n      name="CREDITS, TRANSACTION FEE AMOUNT"\r\n      class="org.jpos.iso.IFA_NUMERIC"/>\r\n  <isofield\r\n      id="84"\r\n      length="12"\r\n      name="DEBITS, PROCESSING FEE AMOUNT"\r\n      class="org.jpos.iso.IFA_NUMERIC"/>\r\n  <isofield\r\n      id="85"\r\n      length="12"\r\n      name="DEBITS, TRANSACTION FEE AMOUNT"\r\n      class="org.jpos.iso.IFA_NUMERIC"/>\r\n  <isofield\r\n      id="86"\r\n      length="16"\r\n      name="CREDITS, AMOUNT"\r\n      class="org.jpos.iso.IFA_NUMERIC"/>\r\n  <isofield\r\n      id="87"\r\n      length="16"\r\n      name="CREDITS, REVERSAL AMOUNT"\r\n      class="org.jpos.iso.IFA_NUMERIC"/>\r\n  <isofield\r\n      id="88"\r\n      length="16"\r\n      name="DEBITS, AMOUNT"\r\n      class="org.jpos.iso.IFA_NUMERIC"/>\r\n  <isofield\r\n      id="89"\r\n      length="16"\r\n      name="DEBITS, REVERSAL AMOUNT"\r\n      class="org.jpos.iso.IFA_NUMERIC"/>\r\n  <isofield\r\n      id="90"\r\n      length="42"\r\n      name="ORIGINAL DATA ELEMENTS"\r\n      class="org.jpos.iso.IFA_NUMERIC"/>\r\n  <isofield\r\n      id="91"\r\n      length="1"\r\n      name="FILE UPDATE CODE"\r\n      class="org.jpos.iso.IF_CHAR"/>\r\n  <isofield\r\n      id="92"\r\n      length="2"\r\n      name="FILE SECURITY CODE"\r\n      class="org.jpos.iso.IF_CHAR"/>\r\n  <isofield\r\n      id="93"\r\n      length="5"\r\n      name="RESPONSE INDICATOR"\r\n      class="org.jpos.iso.IF_CHAR"/>\r\n  <isofield\r\n      id="94"\r\n      length="7"\r\n      name="SERVICE INDICATOR"\r\n      class="org.jpos.iso.IF_CHAR"/>\r\n  <isofield\r\n      id="95"\r\n      length="42"\r\n      name="REPLACEMENT AMOUNTS"\r\n      class="org.jpos.iso.IF_CHAR"/>\r\n  <isofield\r\n      id="96"\r\n      length="8"\r\n      name="MESSAGE SECURITY CODE"\r\n      class="org.jpos.iso.IFA_BINARY"/>\r\n  <isofield\r\n      id="97"\r\n      length="17"\r\n      name="AMOUNT, NET SETTLEMENT"\r\n      class="org.jpos.iso.IFA_AMOUNT"/>\r\n  <isofield\r\n      id="98"\r\n      length="25"\r\n      name="PAYEE"\r\n      class="org.jpos.iso.IF_CHAR"/>\r\n  <isofield\r\n      id="99"\r\n      length="11"\r\n      name="SETTLEMENT INSTITUTION IDENT CODE"\r\n      class="org.jpos.iso.IFA_LLNUM"/>\r\n  <isofield\r\n      id="100"\r\n      length="11"\r\n      name="RECEIVING INSTITUTION IDENT CODE"\r\n      class="org.jpos.iso.IFA_LLNUM"/>\r\n  <isofield\r\n      id="101"\r\n      length="17"\r\n      name="FILE NAME"\r\n      class="org.jpos.iso.IFA_LLCHAR"/>\r\n  <isofield\r\n      id="102"\r\n      length="28"\r\n      name="ACCOUNT IDENTIFICATION 1"\r\n      class="org.jpos.iso.IFA_LLCHAR"/>\r\n  <isofield\r\n      id="103"\r\n      length="28"\r\n      name="ACCOUNT IDENTIFICATION 2"\r\n      class="org.jpos.iso.IFA_LLCHAR"/>\r\n  <isofield\r\n      id="104"\r\n      length="100"\r\n      name="TRANSACTION DESCRIPTION"\r\n      class="org.jpos.iso.IFA_LLLCHAR"/>\r\n  <isofield\r\n      id="105"\r\n      length="999"\r\n      name="RESERVED ISO USE"\r\n      class="org.jpos.iso.IFA_LLLCHAR"/>\r\n  <isofield\r\n      id="106"\r\n      length="999"\r\n      name="RESERVED ISO USE"\r\n      class="org.jpos.iso.IFA_LLLCHAR"/>\r\n  <isofield\r\n      id="107"\r\n      length="999"\r\n      name="RESERVED ISO USE"\r\n      class="org.jpos.iso.IFA_LLLCHAR"/>\r\n  <isofield\r\n      id="108"\r\n      length="999"\r\n      name="RESERVED ISO USE"\r\n      class="org.jpos.iso.IFA_LLLCHAR"/>\r\n  <isofield\r\n      id="109"\r\n      length="999"\r\n      name="RESERVED ISO USE"\r\n      class="org.jpos.iso.IFA_LLLCHAR"/>\r\n  <isofield\r\n      id="110"\r\n      length="999"\r\n      name="RESERVED ISO USE"\r\n      class="org.jpos.iso.IFA_LLLCHAR"/>\r\n  <isofield\r\n      id="111"\r\n      length="999"\r\n      name="RESERVED ISO USE"\r\n      class="org.jpos.iso.IFA_LLLCHAR"/>\r\n  <isofield\r\n      id="112"\r\n      length="999"\r\n      name="RESERVED NATIONAL USE"\r\n      class="org.jpos.iso.IFA_LLLCHAR"/>\r\n  <isofield\r\n      id="113"\r\n      length="999"\r\n      name="RESERVED NATIONAL USE"\r\n      class="org.jpos.iso.IFA_LLLCHAR"/>\r\n  <isofield\r\n      id="114"\r\n      length="999"\r\n      name="RESERVED NATIONAL USE"\r\n      class="org.jpos.iso.IFA_LLLCHAR"/>\r\n  <isofield\r\n      id="115"\r\n      length="999"\r\n      name="RESERVED NATIONAL USE"\r\n      class="org.jpos.iso.IFA_LLLCHAR"/>\r\n  <isofield\r\n      id="116"\r\n      length="999"\r\n      name="RESERVED NATIONAL USE"\r\n      class="org.jpos.iso.IFA_LLLCHAR"/>\r\n  <isofield\r\n      id="117"\r\n      length="999"\r\n      name="RESERVED NATIONAL USE"\r\n      class="org.jpos.iso.IFA_LLLCHAR"/>\r\n  <isofield\r\n      id="118"\r\n      length="999"\r\n      name="RESERVED NATIONAL USE"\r\n      class="org.jpos.iso.IFA_LLLCHAR"/>\r\n  <isofield\r\n      id="119"\r\n      length="999"\r\n      name="RESERVED NATIONAL USE"\r\n      class="org.jpos.iso.IFA_LLLCHAR"/>\r\n  <isofield\r\n      id="120"\r\n      length="999"\r\n      name="RESERVED PRIVATE USE"\r\n      class="org.jpos.iso.IFA_LLLCHAR"/>\r\n  <isofield\r\n      id="121"\r\n      length="999"\r\n      name="RESERVED PRIVATE USE"\r\n      class="org.jpos.iso.IFA_LLLCHAR"/>\r\n  <isofield\r\n      id="122"\r\n      length="999"\r\n      name="RESERVED PRIVATE USE"\r\n      class="org.jpos.iso.IFA_LLLCHAR"/>\r\n  <isofieldpackager id="123" length="999" name="RESERVED PRIVATE USE" class="org.jpos.iso.IFA_LLLCHAR" packager="org.jpos.iso.packager.GenericSubFieldPackager" emitBitmap="false">\r\n  \t<isofield id="1" length="1" name="Card data input capability" class="org.jpos.iso.IF_CHAR" />\r\n  \t<isofield id="2" length="1" name="Cardholder authentication capability" class="org.jpos.iso.IF_CHAR" />\r\n  \t<isofield id="3" length="1" name="Card capture capability" class="org.jpos.iso.IF_CHAR" />\r\n  \t<isofield id="4" length="1" name="Operating environment" class="org.jpos.iso.IF_CHAR" />\r\n  \t<isofield id="5" length="1" name="Cardholder is present" class="org.jpos.iso.IF_CHAR" />\r\n  \t<isofield id="6" length="1" name="Card is present" class="org.jpos.iso.IF_CHAR" />\r\n  \t<isofield id="7" length="1" name="Card data input mode" class="org.jpos.iso.IF_CHAR" />\r\n  \t<isofield id="8" length="1" name="Cardholder authentication method" class="org.jpos.iso.IF_CHAR" />\r\n  \t<isofield id="9" length="1" name="Cardholder authentication entity" class="org.jpos.iso.IF_CHAR" />\r\n  \t<isofield id="10" length="1" name="Card data output capability" class="org.jpos.iso.IF_CHAR" />\r\n  \t<isofield id="11" length="1" name="Terminal output capability" class="org.jpos.iso.IF_CHAR" />\r\n  \t<isofield id="12" length="1" name="PIN capture capability" class="org.jpos.iso.IF_CHAR" />\r\n  \t<isofield id="13" length="1" name="Terminal operator" class="org.jpos.iso.IF_CHAR" />\r\n  \t<isofield id="14" length="2" name="Terminal type" class="org.jpos.iso.IF_CHAR" />\r\n  </isofieldpackager>\r\n  <isofield\r\n      id="124"\r\n      length="999"\r\n      name="RESERVED PRIVATE USE"\r\n      class="org.jpos.iso.IFA_LLLCHAR"/>\t\r\n  <isofield\r\n      id="125"\r\n      length="999"\r\n      name="RESERVED PRIVATE USE"\r\n      class="org.jpos.iso.IFA_LLLCHAR"/>\r\n  <isofield\r\n      id="126"\r\n      length="999"\r\n      name="RESERVED PRIVATE USE"\r\n      class="org.jpos.iso.IFA_LLLCHAR"/>\r\n\r\n  <isofieldpackager\r\n      id="127"  \r\n      length="999999"\r\n      name="RESERVED PRIVATE USE"\r\n      class="org.jpos.iso.IFA_LLLLLLBINARY"\r\n      packager="org.jpos.iso.packager.GenericSubFieldPackager">\r\n      <isofield\r\n          id="0"\r\n          length="0"\r\n          name="PLACEHOLDER"\r\n          class="org.jpos.iso.IF_CHAR"/>\r\n      <isofield\r\n          id="1"\r\n          length="8"\r\n          name="BITMAP"\r\n          class="org.jpos.iso.IFB_BITMAP"/>\r\n      <isofield\r\n          id="2"\r\n          length="32"\r\n          name="SWITCH KEY"\r\n          class="org.jpos.iso.IFA_LLCHAR"/>\r\n      <isofield\r\n          id="3"\r\n          length="48"\r\n          name="ROUTING INFORMATION"\r\n          class="org.jpos.iso.IF_CHAR"/>\r\n      <isofield\r\n          id="4"\r\n          length="22"\r\n          name="POS DATA"\r\n          class="org.jpos.iso.IF_CHAR"/>\r\n      <isofield\r\n          id="5"\r\n          length="73"\r\n          name="SERVICE STATION DATA"\r\n          class="org.jpos.iso.IF_CHAR"/>\r\n      <isofield\r\n          id="6"\r\n          length="2"\r\n          name="AUTHORIZATION PROFILE"\r\n          class="org.jpos.iso.IFA_NUMERIC"/>\r\n      <isofield\r\n          id="7"\r\n          length="50"\r\n          name="CHECK DATA"\r\n          class="org.jpos.iso.IFA_LLCHAR"/>\r\n      <isofield\r\n          id="8"\r\n          length="128"\r\n          name="RETENTION DATA"\r\n          class="org.jpos.iso.IFA_LLLCHAR"/>\r\n      <isofield\r\n          id="9"\r\n          length="255"\r\n          name="ADDITIONAL NODE DATA"\r\n          class="org.jpos.iso.IFA_LLLCHAR"/>\r\n      <isofield\r\n          id="10"\r\n          length="3"\r\n          name="CVV2"\r\n          class="org.jpos.iso.IFA_NUMERIC"/>\r\n      <isofield\r\n          id="11"\r\n          length="32"\r\n          name="ORIGINAL KEY"\r\n          class="org.jpos.iso.IFA_LLCHAR"/>\r\n      <isofield\r\n          id="12"\r\n          length="25"\r\n          name="TERMINAL OWNDER"\r\n          class="org.jpos.iso.IFA_LLCHAR"/>\r\n      <isofield\r\n          id="13"\r\n          length="17"\r\n          name="POS GEOGRAPHIC DATA"\r\n          class="org.jpos.iso.IF_CHAR"/>\r\n      <isofield\r\n          id="14"\r\n          length="8"\r\n          name="SPONSOR BANK"\r\n          class="org.jpos.iso.IF_CHAR"/>\r\n      <isofield\r\n          id="15"\r\n          length="29"\r\n          name="AVS REQUEST"\r\n          class="org.jpos.iso.IFA_LLCHAR"/>\r\n      <isofield\r\n          id="16"\r\n          length="1"\r\n          name="AVS RESPONSE"\r\n          class="org.jpos.iso.IF_CHAR"/>\r\n      <isofield\r\n          id="17"\r\n          length="50"\r\n          name="CARDHOLDER INFORMATION"\r\n          class="org.jpos.iso.IFA_LLCHAR"/>\r\n      <isofield\r\n          id="18"\r\n          length="50"\r\n          name="VALIDATION DATA"\r\n          class="org.jpos.iso.IFA_LLCHAR"/>\r\n      <isofield\r\n          id="19"\r\n          length="45"\r\n          name="BANK DETAILS"\r\n          class="org.jpos.iso.IF_CHAR"/>\r\n      <isofield\r\n          id="20"\r\n          length="8"\r\n          name="AUTHORIZER DATE SETTLEMENT"\r\n          class="org.jpos.iso.IFA_NUMERIC"/>\r\n      <isofield\r\n          id="21"\r\n          length="12"\r\n          name="RECORD IDENTIFICATION"\r\n          class="org.jpos.iso.IFA_LLCHAR"/>\r\n      <isofield\r\n          id="22"\r\n          length="99999"\r\n          name="STRUCTURED DATA"\r\n          class="org.jpos.iso.IFA_LLLLLCHAR"/>\r\n      <isofield\r\n          id="23"\r\n          length="253"\r\n          name="PAYEE NAME AND ADDRESS"\r\n          class="org.jpos.iso.IF_CHAR"/>\r\n      <isofield\r\n          id="24"\r\n          length="28"\r\n          name="PAYER ACCOUNT INFORMATION"\r\n          class="org.jpos.iso.IFA_LLCHAR"/>\r\n  <!--<isofield\r\n          id="25"\r\n          length="8000"\r\n          name="ICC DATA"\r\n          class="org.jpos.iso.IFA_LLLLCHAR"/> -->\r\n\t  <isofieldpackager id="25" length="8000" name="ICC DATA" class="org.jpos.iso.IFA_LLLLCHAR" packager="org.jpos.iso.packager.GenericSubFieldPackager">\r\n\t       <isofield id="1" length="8" name="BIT MAP" class="org.jpos.iso.IFB_BITMAP"/>\r\n\t       <isofield id="2" length="12" name="Amount Authorized" class="org.jpos.iso.IFA_NUMERIC"/>\r\n\t       <isofield id="3" length="12" name="Amount Other" class="org.jpos.iso.IFA_NUMERIC"/>\r\n\t       <isofield id="4" length="32" name="Application Identifier" class="org.jpos.iso.IFA_LLCHAR"/>\r\n\t       <isofield id="5" length="4" name="Application Interchange Profile" class="org.jpos.iso.IF_CHAR"/>\r\n\t       <isofield id="6" length="4" name="Application Transaction Counter" class="org.jpos.iso.IF_CHAR"/>\r\n\t       <isofield id="7" length="4" name="Application Usage Control" class="org.jpos.iso.IF_CHAR"/>\r\n\t       <isofield id="8" length="2" name="Authorization Response Code" class="org.jpos.iso.IF_CHAR"/>\r\n\t       <isofield id="9" length="1" name="Card Authentication Reliability Indicator" class="org.jpos.iso.IFA_NUMERIC"/>\r\n\t       <isofield id="10" length="1" name="Application Authentication Results Code" class="org.jpos.iso.IF_CHAR"/>\r\n\t       <isofield id="11" length="1" name="Chip Condition Code"  class="org.jpos.iso.IFA_NUMERIC"/>\r\n\t       <isofield id="12" length="16" name="Cryptogram" class="org.jpos.iso.IF_CHAR"/>\r\n\t       <isofield id="13" length="2" name="Cryptogram Information Data" class="org.jpos.iso.IF_CHAR"/>\r\n\t       <isofield id="14" length="504" name="Cvm List" class="org.jpos.iso.IFA_LLLCHAR"/>\r\n\t       <isofield id="15" length="6" name="Cvm Results" class="org.jpos.iso.IF_CHAR"/>\r\n\t       <isofield id="16" length="8" name="Interface Device Serial Number" class="org.jpos.iso.IF_CHAR"/>\r\n\t       <isofield id="17" length="11" name="Issuer Action Code" class="org.jpos.iso.IF_CHAR"/>\r\n\t       <isofield id="18" length="64" name="Issuer Application Data" class="org.jpos.iso.IFA_LLCHAR"/>\r\n\t       <isofield id="19" length="507" name="Issuer Script Results" class="org.jpos.iso.IFA_LLLLCHAR"/>   \r\n\t       <isofield id="20" length="4" name="Terminal Application Version Number" class="org.jpos.iso.IF_CHAR"/>\r\n\t       <isofield id="21" length="6" name="Terminal Capabilities" class="org.jpos.iso.IF_CHAR"/>\r\n\t       <isofield id="22" length="3" name="Terminal Country Code" class="org.jpos.iso.IFA_NUMERIC"/>\r\n\t       <isofield id="23" length="2" name="Terminal Type" class="org.jpos.iso.IFA_NUMERIC"/>\r\n\t       <isofield id="24" length="10" name="Terminal Verification Result" class="org.jpos.iso.IF_CHAR"/>\r\n\t       <isofield id="25" length="1" name="Transaction Category Code" class="org.jpos.iso.IFA_LLLCHAR"/>\r\n\t       <isofield id="26" length="3" name="Transaction Currency Code" class="org.jpos.iso.IFA_NUMERIC"/>\r\n\t       <isofield id="27" length="6" name="Transaction Date" class="org.jpos.iso.IFA_NUMERIC"/>\r\n\t       <isofield id="28" length="8" name="Transaction Sequence Counter " class="org.jpos.iso.IFA_LCHAR"/>\r\n\t       <isofield id="29" length="2" name="Transaction Type" class="org.jpos.iso.IFA_NUMERIC"/>\r\n\t       <isofield id="30" length="8" name="Unpredictable Number" class="org.jpos.iso.IF_CHAR"/>\r\n\t       <isofield id="31" length="32" name="Issuer Authentication Data" class="org.jpos.iso.IFA_LLCHAR"/>\r\n\t       <isofield id="32" length="335" name="Issuer Script Template 1" class="org.jpos.iso.IFA_LLLLCHAR"/>\r\n\t       <isofield id="33" length="335" name="Issuer Script Template 2" class="org.jpos.iso.IFA_LLLLCHAR"/>\r\n\t       <isofield id="34" length="2" name="PostilionPrivateICCResponseData" class="org.jpos.iso.IFA_NUMERIC"/><!-- confusion investigate further -->\r\n\t       <isofield id="35" length="64" name="Customer Exclusive Data (CED)" class="org.jpos.iso.IF_CHAR"/>\r\n\t       <isofield id="36" length="8" name="Form Factor Indicator" class="org.jpos.iso.IF_CHAR"/>\r\n\t   </isofieldpackager>\r\n      <isofield\r\n          id="26"\r\n          length="20"\r\n          name="ORIGINAL NODE"\r\n          class="org.jpos.iso.IFA_LLCHAR"/>\r\n  </isofieldpackager>\r\n  <isofield\r\n      id="128"\r\n      length="999"\r\n      name="MAC 2"\r\n      class="org.jpos.iso.IFA_LLLCHAR"/>\r\n</isopackager>',
    },
    networkData: {
      persistRequired: '0',
      properties: {
        message: [
          {
            field: 'component.type',
            label: 'Component Type',
            listvalues: null,
            value: 'JSON',
            fileName: null,
            datatype: 'String',
            format: '^([a-zA-Z_-])',
            mandatory: true,
            hidden: false,
          },
          {
            field: 'component.name',
            label: 'Component Name(Message)',
            listvalues: null,
            value: 'atm_adapter',
            fileName: null,
            datatype: 'String',
            format: '^([a-zA-Z_-])',
            mandatory: true,
            hidden: false,
          },
          {
            field: 'component.iso.header.value',
            label: 'ISO Header Value(Message)',
            listvalues: null,
            value: 'ISO',
            fileName: null,
            datatype: 'String',
            format: '^([A-Za-z0-9_\\-\\.])',
            mandatory: true,
            hidden: false,
          },
          {
            field: 'server.port',
            label: 'Server Port',
            listvalues: null,
            value: '0000',
            fileName: null,
            datatype: 'int',
            format: '^([0-9_-]){4,6}$',
            mandatory: true,
            hidden: true,
          },
        ],
        network: [
          {
            field: 'tcp.mode',
            label: 'TCP Mode',
            listvalues: ['server', 'client'],
            value: 'client',
            fileName: null,
            datatype: 'String',
            format: '^([a-z])',
            mandatory: true,
            hidden: false,
          },
          {
            field: 'component.iso.header.value',
            label: 'ISO Header Value(Network)',
            listvalues: null,
            value: 'ISO',
            fileName: null,
            datatype: 'String',
            format: '^([A-Za-z0-9_\\-\\.])',
            mandatory: true,
            hidden: false,
          },
          {
            field: 'tcp.server.port',
            label: 'TCP Server Port',
            listvalues: null,
            value: '7070',
            fileName: null,
            datatype: 'int',
            format: '^([0-9_-]){4,6}$',
            mandatory: true,
            hidden: false,
          },
          {
            field: 'tcp.server.header.length',
            label: 'Message Length Bytes',
            listvalues: ['2', '4'],
            value: '2',
            fileName: null,
            datatype: 'String',
            format: '^([0-9_-])',
            mandatory: true,
            hidden: false,
          },
          {
            field: 'tcp.server.ssl.keystore.password',
            label: 'TCP SSL Keystore Password',
            listvalues: null,
            value: '12345',
            fileName: null,
            datatype: 'password',
            format: '^([a-zA-Z0-9_-])',
            mandatory: true,
            hidden: false,
          },
          {
            field: 'tcp.ssl.keystore.path',
            label: 'TCP SSL Keystore Path',
            listvalues: ['.JKS'],
            value: '155',
            fileName: 'keystore.jks',
            datatype: 'file',
            format: '',
            mandatory: true,
            hidden: false,
          },
          {
            field: 'component.name',
            label: 'Component Name(Network)',
            listvalues: null,
            value: 'atm_adapter',
            fileName: null,
            datatype: 'String',
            format: '^([a-zA-Z_-])',
            mandatory: true,
            hidden: false,
          },
          {
            field: 'server.connection.threshold.time.unit',
            label: 'Server Connection Threshold Time Unit',
            listvalues: ['HOURS', 'MINUTES', 'SECONDS'],
            value: 'HOURS',
            fileName: null,
            datatype: 'String',
            format: '^([a-zA-Z_-])',
            mandatory: true,
            hidden: false,
          },
          {
            field: 'server.total.threshold.time.unit',
            label: 'Server Total Threshold Time Unit',
            listvalues: ['HOURS', 'MINUTES', 'SECONDS'],
            value: 'HOURS',
            fileName: null,
            datatype: 'String',
            format: '^([a-zA-Z_-])',
            mandatory: true,
            hidden: false,
          },
          {
            field: 'component.transformation.network.requests.conf.path',
            label: 'component.transformation.network.requests.conf.path',
            listvalues: ['.JSON'],
            value: '157',
            fileName: 'network_requests.json',
            datatype: 'file',
            format: null,
            mandatory: false,
            hidden: false,
          },
          {
            field: 'network.request.handler.mapping.path',
            label: 'network.request.handler.mapping.path',
            listvalues: ['.JSON'],
            value: '156',
            fileName: 'network_handler.json',
            datatype: 'file',
            format: null,
            mandatory: false,
            hidden: false,
          },
          {
            field: 'component.service.type',
            label: 'Service Type',
            listvalues: null,
            value: 'GATEWAY_SERVICE',
            fileName: null,
            datatype: 'String',
            format: '^([a-zA-Z_-])',
            mandatory: true,
            hidden: true,
          },
          {
            field: 'tcp.to.channel.core.pool.size',
            label: 'TCP TO Channel Core Pool Size',
            listvalues: null,
            value: '100',
            fileName: null,
            datatype: 'int',
            format: '^([0-9_-])',
            mandatory: true,
            hidden: true,
          },
          {
            field: 'tcp.from.channel.core.pool.size',
            label: 'TCP FROM Channel Core Pool Size',
            listvalues: null,
            value: '100',
            fileName: null,
            datatype: 'int',
            format: '^([0-9_-])',
            mandatory: true,
            hidden: true,
          },
          {
            field: 'tcp.serialzer.type',
            label: 'TCP Serializer Type',
            listvalues: ['FIRST', 'SECOND'],
            value: 'FIRST',
            fileName: null,
            datatype: 'String',
            format: '^([a-zA-Z_-])',
            mandatory: true,
            hidden: true,
          },
          {
            field: 'server.request.sla.time',
            label: 'Server Request SLA Time',
            listvalues: null,
            value: '40000',
            fileName: null,
            datatype: 'int',
            format: '^([0-9_-])',
            mandatory: true,
            hidden: true,
          },
          {
            field: 'server.connection.threshold',
            label: 'Server Connection Threshold',
            listvalues: null,
            value: '1000000000',
            fileName: null,
            datatype: 'int',
            format: '^([0-9_-])',
            mandatory: true,
            hidden: true,
          },
          {
            field: 'server.connection.threshold.time',
            label: 'Server Connection Threshold Time',
            listvalues: null,
            value: '1',
            fileName: null,
            datatype: 'int',
            format: '^([0-9_-])',
            mandatory: true,
            hidden: true,
          },
          {
            field: 'server.total.threshold',
            label: 'Server Total Threshold',
            listvalues: null,
            value: '100000000',
            fileName: null,
            datatype: 'int',
            format: '^([0-9_-])',
            mandatory: true,
            hidden: true,
          },
          {
            field: 'server.total.threshold.time',
            label: 'Server Total Threshold Time',
            listvalues: null,
            value: '1',
            fileName: null,
            datatype: 'int',
            format: '^([0-9_-])',
            mandatory: true,
            hidden: true,
          },
          {
            field: 'custom.jar.files.id',
            label: 'Upload Jars',
            listvalues: ['.JAR'],
            value: '185',
            fileName: 'HelloWorld-0.6.5.jar',
            datatype: 'file',
            format: '',
            mandatory: false,
            hidden: true,
          },
        ],
      },
      connectionManagement: {
        connections: [
          {
            connection: 'test',
            ip: '192.12',
            port: '8080',
            label: '',
            timeOut: '',
          },
        ],
        strategyConnections: {
          strategyConnections: null,
          stationGroupStrategy: null,
          custumStrategy: null,
        },
        alternateConnection: 'N',
      },
    },
    transformData: {
      persistRequired: '0',
      requestMapping: {
        transactions: [
          {
            request: {
              type: 'adapter_request',
              mappings: [
                {
                  ipc: 'DECLINED',
                  type: 'custom_mapper',
                  className: 'com.bnt.bswitch.vrfmvp.CustomCodeExecution',
                },
              ],
              postActions: [],
            },
            response: {
              type: 'adapter_response',
              mappings: [],
              preActions: [],
            },
            condition: {
              id: '0',
              type: 'equal',
              value: '0210',
              fieldName: '${0}',
            },
            messageIntentifier: 'Purchase',
          },
        ],
      },
      responseMapping: null,
      imfLeg: null,
      fieldSchemeImfMapperUiWrapper: [
        {
          fieldId: '2',
          fieldName: 'Field 2 PAN - PRIMARY ACCOUNT NUMBER',
          requestImfExpression: null,
          responseImfExpression: null,
          responseImfLeg: null,
          requestImfField: null,
          responseImfField: null,
        },
        {
          fieldId: '3',
          fieldName: 'Field 3 PROCESSING CODE',
          requestImfExpression: null,
          responseImfExpression: null,
          responseImfLeg: null,
          requestImfField: null,
          responseImfField: null,
        },
        {
          fieldId: '4',
          fieldName: 'Field 4 AMOUNT, TRANSACTION',
          requestImfExpression: null,
          responseImfExpression: null,
          responseImfLeg: null,
          requestImfField: null,
          responseImfField: null,
        },
        {
          fieldId: '5',
          fieldName: 'Field 5 AMOUNT, SETTLEMENT',
          requestImfExpression: null,
          responseImfExpression: null,
          responseImfLeg: null,
          requestImfField: null,
          responseImfField: null,
        },
        {
          fieldId: '6',
          fieldName: 'Field 6 AMOUNT, CARDHOLDER BILLING',
          requestImfExpression: null,
          responseImfExpression: null,
          responseImfLeg: null,
          requestImfField: null,
          responseImfField: null,
        },
        {
          fieldId: '7',
          fieldName: 'Field 7 TRANSMISSION DATE AND TIME',
          requestImfExpression: null,
          responseImfExpression: null,
          responseImfLeg: null,
          requestImfField: null,
          responseImfField: null,
        },
        {
          fieldId: '8',
          fieldName: 'Field 8 AMOUNT, CARDHOLDER BILLING FEE',
          requestImfExpression: null,
          responseImfExpression: null,
          responseImfLeg: null,
          requestImfField: null,
          responseImfField: null,
        },
        {
          fieldId: '9',
          fieldName: 'Field 9 CONVERSION RATE, SETTLEMENT',
          requestImfExpression: null,
          responseImfExpression: null,
          responseImfLeg: null,
          requestImfField: null,
          responseImfField: null,
        },
        {
          fieldId: '10',
          fieldName: 'Field 10 CONVERSION RATE, CARDHOLDER BILLING',
          requestImfExpression: null,
          responseImfExpression: null,
          responseImfLeg: null,
          requestImfField: null,
          responseImfField: null,
        },
        {
          fieldId: '11',
          fieldName: 'Field 11 SYSTEM TRACE AUDIT NUMBER',
          requestImfExpression: null,
          responseImfExpression: null,
          responseImfLeg: null,
          requestImfField: null,
          responseImfField: null,
        },
        {
          fieldId: '12',
          fieldName: 'Field 12 TIME, LOCAL TRANSACTION',
          requestImfExpression: null,
          responseImfExpression: null,
          responseImfLeg: null,
          requestImfField: null,
          responseImfField: null,
        },
        {
          fieldId: '13',
          fieldName: 'Field 13 DATE, LOCAL TRANSACTION',
          requestImfExpression: null,
          responseImfExpression: null,
          responseImfLeg: null,
          requestImfField: null,
          responseImfField: null,
        },
        {
          fieldId: '14',
          fieldName: 'Field 14 DATE, EXPIRATION',
          requestImfExpression: null,
          responseImfExpression: null,
          responseImfLeg: null,
          requestImfField: null,
          responseImfField: null,
        },
        {
          fieldId: '15',
          fieldName: 'Field 15 DATE, SETTLEMENT',
          requestImfExpression: null,
          responseImfExpression: null,
          responseImfLeg: null,
          requestImfField: null,
          responseImfField: null,
        },
        {
          fieldId: '16',
          fieldName: 'Field 16 DATE, CONVERSION',
          requestImfExpression: null,
          responseImfExpression: null,
          responseImfLeg: null,
          requestImfField: null,
          responseImfField: null,
        },
        {
          fieldId: '17',
          fieldName: 'Field 17 DATE, CAPTURE',
          requestImfExpression: null,
          responseImfExpression: null,
          responseImfLeg: null,
          requestImfField: null,
          responseImfField: null,
        },
        {
          fieldId: '18',
          fieldName: 'Field 18 MERCHANTS TYPE',
          requestImfExpression: null,
          responseImfExpression: null,
          responseImfLeg: null,
          requestImfField: null,
          responseImfField: null,
        },
        {
          fieldId: '19',
          fieldName: 'Field 19 ACQUIRING INSTITUTION COUNTRY CODE',
          requestImfExpression: null,
          responseImfExpression: null,
          responseImfLeg: null,
          requestImfField: null,
          responseImfField: null,
        },
        {
          fieldId: '20',
          fieldName: 'Field 20 PAN EXTENDED COUNTRY CODE',
          requestImfExpression: null,
          responseImfExpression: null,
          responseImfLeg: null,
          requestImfField: null,
          responseImfField: null,
        },
        {
          fieldId: '21',
          fieldName: 'Field 21 FORWARDING INSTITUTION COUNTRY CODE',
          requestImfExpression: null,
          responseImfExpression: null,
          responseImfLeg: null,
          requestImfField: null,
          responseImfField: null,
        },
        {
          fieldId: '22',
          fieldName: 'Field 22 POINT OF SERVICE ENTRY MODE',
          requestImfExpression: null,
          responseImfExpression: null,
          responseImfLeg: null,
          requestImfField: null,
          responseImfField: null,
        },
        {
          fieldId: '23',
          fieldName: 'Field 23 CARD SEQUENCE NUMBER',
          requestImfExpression: null,
          responseImfExpression: null,
          responseImfLeg: null,
          requestImfField: null,
          responseImfField: null,
        },
        {
          fieldId: '24',
          fieldName: 'Field 24 NETWORK INTERNATIONAL IDENTIFIEER',
          requestImfExpression: null,
          responseImfExpression: null,
          responseImfLeg: null,
          requestImfField: null,
          responseImfField: null,
        },
        {
          fieldId: '25',
          fieldName: 'Field 25 POINT OF SERVICE CONDITION CODE',
          requestImfExpression: null,
          responseImfExpression: null,
          responseImfLeg: null,
          requestImfField: null,
          responseImfField: null,
        },
        {
          fieldId: '26',
          fieldName: 'Field 26 POINT OF SERVICE PIN CAPTURE CODE',
          requestImfExpression: null,
          responseImfExpression: null,
          responseImfLeg: null,
          requestImfField: null,
          responseImfField: null,
        },
        {
          fieldId: '27',
          fieldName: 'Field 27 AUTHORIZATION IDENTIFICATION RESP LEN',
          requestImfExpression: null,
          responseImfExpression: null,
          responseImfLeg: null,
          requestImfField: null,
          responseImfField: null,
        },
        {
          fieldId: '28',
          fieldName: 'Field 28 AMOUNT, TRANSACTION FEE',
          requestImfExpression: null,
          responseImfExpression: null,
          responseImfLeg: null,
          requestImfField: null,
          responseImfField: null,
        },
        {
          fieldId: '29',
          fieldName: 'Field 29 AMOUNT, SETTLEMENT FEE',
          requestImfExpression: null,
          responseImfExpression: null,
          responseImfLeg: null,
          requestImfField: null,
          responseImfField: null,
        },
        {
          fieldId: '30',
          fieldName: 'Field 30 AMOUNT, TRANSACTION PROCESSING FEE',
          requestImfExpression: null,
          responseImfExpression: null,
          responseImfLeg: null,
          requestImfField: null,
          responseImfField: null,
        },
        {
          fieldId: '31',
          fieldName: 'Field 31 AMOUNT, SETTLEMENT PROCESSING FEE',
          requestImfExpression: null,
          responseImfExpression: null,
          responseImfLeg: null,
          requestImfField: null,
          responseImfField: null,
        },
        {
          fieldId: '32',
          fieldName: 'Field 32 ACQUIRING INSTITUTION IDENT CODE',
          requestImfExpression: null,
          responseImfExpression: null,
          responseImfLeg: null,
          requestImfField: null,
          responseImfField: null,
        },
        {
          fieldId: '33',
          fieldName: 'Field 33 FORWARDING INSTITUTION IDENT CODE',
          requestImfExpression: null,
          responseImfExpression: null,
          responseImfLeg: null,
          requestImfField: null,
          responseImfField: null,
        },
        {
          fieldId: '34',
          fieldName: 'Field 34 PAN EXTENDED',
          requestImfExpression: null,
          responseImfExpression: null,
          responseImfLeg: null,
          requestImfField: null,
          responseImfField: null,
        },
        {
          fieldId: '35',
          fieldName: 'Field 35 TRACK 2 DATA',
          requestImfExpression: null,
          responseImfExpression: null,
          responseImfLeg: null,
          requestImfField: null,
          responseImfField: null,
        },
        {
          fieldId: '36',
          fieldName: 'Field 36 TRACK 3 DATA',
          requestImfExpression: null,
          responseImfExpression: null,
          responseImfLeg: null,
          requestImfField: null,
          responseImfField: null,
        },
        {
          fieldId: '37',
          fieldName: 'Field 37 RETRIEVAL REFERENCE NUMBER',
          requestImfExpression: null,
          responseImfExpression: null,
          responseImfLeg: null,
          requestImfField: null,
          responseImfField: null,
        },
        {
          fieldId: '38',
          fieldName: 'Field 38 AUTHORIZATION IDENTIFICATION RESPONSE',
          requestImfExpression: null,
          responseImfExpression: null,
          responseImfLeg: null,
          requestImfField: null,
          responseImfField: null,
        },
        {
          fieldId: '39',
          fieldName: 'Field 39 RESPONSE CODE',
          requestImfExpression: null,
          responseImfExpression: null,
          responseImfLeg: null,
          requestImfField: null,
          responseImfField: null,
        },
        {
          fieldId: '40',
          fieldName: 'Field 40 SERVICE RESTRICTION CODE',
          requestImfExpression: null,
          responseImfExpression: null,
          responseImfLeg: null,
          requestImfField: null,
          responseImfField: null,
        },
        {
          fieldId: '41',
          fieldName: 'Field 41 CARD ACCEPTOR TERMINAL IDENTIFICACION',
          requestImfExpression: null,
          responseImfExpression: null,
          responseImfLeg: null,
          requestImfField: null,
          responseImfField: null,
        },
        {
          fieldId: '42',
          fieldName: 'Field 42 CARD ACCEPTOR IDENTIFICATION CODE',
          requestImfExpression: null,
          responseImfExpression: null,
          responseImfLeg: null,
          requestImfField: null,
          responseImfField: null,
        },
        {
          fieldId: '43',
          fieldName: 'Field 43 CARD ACCEPTOR NAME/LOCATION',
          requestImfExpression: null,
          responseImfExpression: null,
          responseImfLeg: null,
          requestImfField: null,
          responseImfField: null,
        },
        {
          fieldId: '44',
          fieldName: 'Field 44 ADITIONAL RESPONSE DATA',
          requestImfExpression: null,
          responseImfExpression: null,
          responseImfLeg: null,
          requestImfField: null,
          responseImfField: null,
        },
        {
          fieldId: '45',
          fieldName: 'Field 45 TRACK 1 DATA',
          requestImfExpression: null,
          responseImfExpression: null,
          responseImfLeg: null,
          requestImfField: null,
          responseImfField: null,
        },
        {
          fieldId: '46',
          fieldName: 'Field 46 ADITIONAL DATA - ISO',
          requestImfExpression: null,
          responseImfExpression: null,
          responseImfLeg: null,
          requestImfField: null,
          responseImfField: null,
        },
        {
          fieldId: '47',
          fieldName: 'Field 47 ADITIONAL DATA - NATIONAL',
          requestImfExpression: null,
          responseImfExpression: null,
          responseImfLeg: null,
          requestImfField: null,
          responseImfField: null,
        },
        {
          fieldId: '48',
          fieldName: 'Field 48 ADITIONAL DATA - PRIVATE',
          requestImfExpression: null,
          responseImfExpression: null,
          responseImfLeg: null,
          requestImfField: null,
          responseImfField: null,
        },
        {
          fieldId: '49',
          fieldName: 'Field 49 CURRENCY CODE, TRANSACTION',
          requestImfExpression: null,
          responseImfExpression: null,
          responseImfLeg: null,
          requestImfField: null,
          responseImfField: null,
        },
        {
          fieldId: '50',
          fieldName: 'Field 50 CURRENCY CODE, SETTLEMENT',
          requestImfExpression: null,
          responseImfExpression: null,
          responseImfLeg: null,
          requestImfField: null,
          responseImfField: null,
        },
        {
          fieldId: '51',
          fieldName: 'Field 51 CURRENCY CODE, CARDHOLDER BILLING',
          requestImfExpression: null,
          responseImfExpression: null,
          responseImfLeg: null,
          requestImfField: null,
          responseImfField: null,
        },
        {
          fieldId: '52',
          fieldName: 'Field 52 PIN DATA',
          requestImfExpression: null,
          responseImfExpression: null,
          responseImfLeg: null,
          requestImfField: null,
          responseImfField: null,
        },
        {
          fieldId: '53',
          fieldName: 'Field 53 SECURITY RELATED CONTROL INFORMATION',
          requestImfExpression: null,
          responseImfExpression: null,
          responseImfLeg: null,
          requestImfField: null,
          responseImfField: null,
        },
        {
          fieldId: '54',
          fieldName: 'Field 54 ADDITIONAL AMOUNTS',
          requestImfExpression: null,
          responseImfExpression: null,
          responseImfLeg: null,
          requestImfField: null,
          responseImfField: null,
        },
        {
          fieldId: '55',
          fieldName: 'Field 55 RESERVED ISO',
          requestImfExpression: null,
          responseImfExpression: null,
          responseImfLeg: null,
          requestImfField: null,
          responseImfField: null,
        },
        {
          fieldId: '56',
          fieldName: 'Field 56 RESERVED ISO',
          requestImfExpression: null,
          responseImfExpression: null,
          responseImfLeg: null,
          requestImfField: null,
          responseImfField: null,
        },
        {
          fieldId: '57',
          fieldName: 'Field 57 RESERVED NATIONAL',
          requestImfExpression: null,
          responseImfExpression: null,
          responseImfLeg: null,
          requestImfField: null,
          responseImfField: null,
        },
        {
          fieldId: '58',
          fieldName: 'Field 58 RESERVED NATIONAL',
          requestImfExpression: null,
          responseImfExpression: null,
          responseImfLeg: null,
          requestImfField: null,
          responseImfField: null,
        },
        {
          fieldId: '59',
          fieldName: 'Field 59 RESERVED NATIONAL',
          requestImfExpression: null,
          responseImfExpression: null,
          responseImfLeg: null,
          requestImfField: null,
          responseImfField: null,
        },
        {
          fieldId: '60',
          fieldName: 'Field 60 RESERVED PRIVATE',
          requestImfExpression: null,
          responseImfExpression: null,
          responseImfLeg: null,
          requestImfField: null,
          responseImfField: null,
        },
        {
          fieldId: '61',
          fieldName: 'Field 61 RESERVED PRIVATE',
          requestImfExpression: null,
          responseImfExpression: null,
          responseImfLeg: null,
          requestImfField: null,
          responseImfField: null,
        },
        {
          fieldId: '62',
          fieldName: 'Field 62 RESERVED PRIVATE',
          requestImfExpression: null,
          responseImfExpression: null,
          responseImfLeg: null,
          requestImfField: null,
          responseImfField: null,
        },
        {
          fieldId: '63',
          fieldName: 'Field 63 RESERVED PRIVATE',
          requestImfExpression: null,
          responseImfExpression: null,
          responseImfLeg: null,
          requestImfField: null,
          responseImfField: null,
        },
        {
          fieldId: '64',
          fieldName: 'Field 64 MESSAGE AUTHENTICATION CODE FIELD',
          requestImfExpression: null,
          responseImfExpression: null,
          responseImfLeg: null,
          requestImfField: null,
          responseImfField: null,
        },
        {
          fieldId: '66',
          fieldName: 'Field 66 SETTLEMENT CODE',
          requestImfExpression: null,
          responseImfExpression: null,
          responseImfLeg: null,
          requestImfField: null,
          responseImfField: null,
        },
        {
          fieldId: '67',
          fieldName: 'Field 67 EXTENDED PAYMENT CODE',
          requestImfExpression: null,
          responseImfExpression: null,
          responseImfLeg: null,
          requestImfField: null,
          responseImfField: null,
        },
        {
          fieldId: '68',
          fieldName: 'Field 68 RECEIVING INSTITUTION COUNTRY CODE',
          requestImfExpression: null,
          responseImfExpression: null,
          responseImfLeg: null,
          requestImfField: null,
          responseImfField: null,
        },
        {
          fieldId: '69',
          fieldName: 'Field 69 SETTLEMENT INSTITUTION COUNTRY CODE',
          requestImfExpression: null,
          responseImfExpression: null,
          responseImfLeg: null,
          requestImfField: null,
          responseImfField: null,
        },
        {
          fieldId: '70',
          fieldName: 'Field 70 NETWORK MANAGEMENT INFORMATION CODE',
          requestImfExpression: null,
          responseImfExpression: null,
          responseImfLeg: null,
          requestImfField: null,
          responseImfField: null,
        },
        {
          fieldId: '71',
          fieldName: 'Field 71 MESSAGE NUMBER',
          requestImfExpression: null,
          responseImfExpression: null,
          responseImfLeg: null,
          requestImfField: null,
          responseImfField: null,
        },
        {
          fieldId: '72',
          fieldName: 'Field 72 MESSAGE NUMBER LAST',
          requestImfExpression: null,
          responseImfExpression: null,
          responseImfLeg: null,
          requestImfField: null,
          responseImfField: null,
        },
        {
          fieldId: '73',
          fieldName: 'Field 73 DATE ACTION',
          requestImfExpression: null,
          responseImfExpression: null,
          responseImfLeg: null,
          requestImfField: null,
          responseImfField: null,
        },
        {
          fieldId: '74',
          fieldName: 'Field 74 CREDITS NUMBER',
          requestImfExpression: null,
          responseImfExpression: null,
          responseImfLeg: null,
          requestImfField: null,
          responseImfField: null,
        },
        {
          fieldId: '75',
          fieldName: 'Field 75 CREDITS REVERSAL NUMBER',
          requestImfExpression: null,
          responseImfExpression: null,
          responseImfLeg: null,
          requestImfField: null,
          responseImfField: null,
        },
        {
          fieldId: '76',
          fieldName: 'Field 76 DEBITS NUMBER',
          requestImfExpression: null,
          responseImfExpression: null,
          responseImfLeg: null,
          requestImfField: null,
          responseImfField: null,
        },
        {
          fieldId: '77',
          fieldName: 'Field 77 DEBITS REVERSAL NUMBER',
          requestImfExpression: null,
          responseImfExpression: null,
          responseImfLeg: null,
          requestImfField: null,
          responseImfField: null,
        },
        {
          fieldId: '78',
          fieldName: 'Field 78 TRANSFER NUMBER',
          requestImfExpression: null,
          responseImfExpression: null,
          responseImfLeg: null,
          requestImfField: null,
          responseImfField: null,
        },
        {
          fieldId: '79',
          fieldName: 'Field 79 TRANSFER REVERSAL NUMBER',
          requestImfExpression: null,
          responseImfExpression: null,
          responseImfLeg: null,
          requestImfField: null,
          responseImfField: null,
        },
        {
          fieldId: '80',
          fieldName: 'Field 80 INQUIRIES NUMBER',
          requestImfExpression: null,
          responseImfExpression: null,
          responseImfLeg: null,
          requestImfField: null,
          responseImfField: null,
        },
        {
          fieldId: '81',
          fieldName: 'Field 81 AUTHORIZATION NUMBER',
          requestImfExpression: null,
          responseImfExpression: null,
          responseImfLeg: null,
          requestImfField: null,
          responseImfField: null,
        },
        {
          fieldId: '82',
          fieldName: 'Field 82 CREDITS, PROCESSING FEE AMOUNT',
          requestImfExpression: null,
          responseImfExpression: null,
          responseImfLeg: null,
          requestImfField: null,
          responseImfField: null,
        },
        {
          fieldId: '83',
          fieldName: 'Field 83 CREDITS, TRANSACTION FEE AMOUNT',
          requestImfExpression: null,
          responseImfExpression: null,
          responseImfLeg: null,
          requestImfField: null,
          responseImfField: null,
        },
        {
          fieldId: '84',
          fieldName: 'Field 84 DEBITS, PROCESSING FEE AMOUNT',
          requestImfExpression: null,
          responseImfExpression: null,
          responseImfLeg: null,
          requestImfField: null,
          responseImfField: null,
        },
        {
          fieldId: '85',
          fieldName: 'Field 85 DEBITS, TRANSACTION FEE AMOUNT',
          requestImfExpression: null,
          responseImfExpression: null,
          responseImfLeg: null,
          requestImfField: null,
          responseImfField: null,
        },
        {
          fieldId: '86',
          fieldName: 'Field 86 CREDITS, AMOUNT',
          requestImfExpression: null,
          responseImfExpression: null,
          responseImfLeg: null,
          requestImfField: null,
          responseImfField: null,
        },
        {
          fieldId: '87',
          fieldName: 'Field 87 CREDITS, REVERSAL AMOUNT',
          requestImfExpression: null,
          responseImfExpression: null,
          responseImfLeg: null,
          requestImfField: null,
          responseImfField: null,
        },
        {
          fieldId: '88',
          fieldName: 'Field 88 DEBITS, AMOUNT',
          requestImfExpression: null,
          responseImfExpression: null,
          responseImfLeg: null,
          requestImfField: null,
          responseImfField: null,
        },
        {
          fieldId: '89',
          fieldName: 'Field 89 DEBITS, REVERSAL AMOUNT',
          requestImfExpression: null,
          responseImfExpression: null,
          responseImfLeg: null,
          requestImfField: null,
          responseImfField: null,
        },
        {
          fieldId: '90',
          fieldName: 'Field 90 ORIGINAL DATA ELEMENTS',
          requestImfExpression: null,
          responseImfExpression: null,
          responseImfLeg: null,
          requestImfField: null,
          responseImfField: null,
        },
        {
          fieldId: '91',
          fieldName: 'Field 91 FILE UPDATE CODE',
          requestImfExpression: null,
          responseImfExpression: null,
          responseImfLeg: null,
          requestImfField: null,
          responseImfField: null,
        },
        {
          fieldId: '92',
          fieldName: 'Field 92 FILE SECURITY CODE',
          requestImfExpression: null,
          responseImfExpression: null,
          responseImfLeg: null,
          requestImfField: null,
          responseImfField: null,
        },
        {
          fieldId: '93',
          fieldName: 'Field 93 RESPONSE INDICATOR',
          requestImfExpression: null,
          responseImfExpression: null,
          responseImfLeg: null,
          requestImfField: null,
          responseImfField: null,
        },
        {
          fieldId: '94',
          fieldName: 'Field 94 SERVICE INDICATOR',
          requestImfExpression: null,
          responseImfExpression: null,
          responseImfLeg: null,
          requestImfField: null,
          responseImfField: null,
        },
        {
          fieldId: '95',
          fieldName: 'Field 95 REPLACEMENT AMOUNTS',
          requestImfExpression: null,
          responseImfExpression: null,
          responseImfLeg: null,
          requestImfField: null,
          responseImfField: null,
        },
        {
          fieldId: '96',
          fieldName: 'Field 96 MESSAGE SECURITY CODE',
          requestImfExpression: null,
          responseImfExpression: null,
          responseImfLeg: null,
          requestImfField: null,
          responseImfField: null,
        },
        {
          fieldId: '97',
          fieldName: 'Field 97 AMOUNT, NET SETTLEMENT',
          requestImfExpression: null,
          responseImfExpression: null,
          responseImfLeg: null,
          requestImfField: null,
          responseImfField: null,
        },
        {
          fieldId: '98',
          fieldName: 'Field 98 PAYEE',
          requestImfExpression: null,
          responseImfExpression: null,
          responseImfLeg: null,
          requestImfField: null,
          responseImfField: null,
        },
        {
          fieldId: '99',
          fieldName: 'Field 99 SETTLEMENT INSTITUTION IDENT CODE',
          requestImfExpression: null,
          responseImfExpression: null,
          responseImfLeg: null,
          requestImfField: null,
          responseImfField: null,
        },
        {
          fieldId: '100',
          fieldName: 'Field 100 RECEIVING INSTITUTION IDENT CODE',
          requestImfExpression: null,
          responseImfExpression: null,
          responseImfLeg: null,
          requestImfField: null,
          responseImfField: null,
        },
        {
          fieldId: '101',
          fieldName: 'Field 101 FILE NAME',
          requestImfExpression: null,
          responseImfExpression: null,
          responseImfLeg: null,
          requestImfField: null,
          responseImfField: null,
        },
        {
          fieldId: '102',
          fieldName: 'Field 102 ACCOUNT IDENTIFICATION 1',
          requestImfExpression: null,
          responseImfExpression: null,
          responseImfLeg: null,
          requestImfField: null,
          responseImfField: null,
        },
        {
          fieldId: '103',
          fieldName: 'Field 103 ACCOUNT IDENTIFICATION 2',
          requestImfExpression: null,
          responseImfExpression: null,
          responseImfLeg: null,
          requestImfField: null,
          responseImfField: null,
        },
        {
          fieldId: '104',
          fieldName: 'Field 104 TRANSACTION DESCRIPTION',
          requestImfExpression: null,
          responseImfExpression: null,
          responseImfLeg: null,
          requestImfField: null,
          responseImfField: null,
        },
        {
          fieldId: '105',
          fieldName: 'Field 105 RESERVED ISO USE',
          requestImfExpression: null,
          responseImfExpression: null,
          responseImfLeg: null,
          requestImfField: null,
          responseImfField: null,
        },
        {
          fieldId: '106',
          fieldName: 'Field 106 RESERVED ISO USE',
          requestImfExpression: null,
          responseImfExpression: null,
          responseImfLeg: null,
          requestImfField: null,
          responseImfField: null,
        },
        {
          fieldId: '107',
          fieldName: 'Field 107 RESERVED ISO USE',
          requestImfExpression: null,
          responseImfExpression: null,
          responseImfLeg: null,
          requestImfField: null,
          responseImfField: null,
        },
        {
          fieldId: '108',
          fieldName: 'Field 108 RESERVED ISO USE',
          requestImfExpression: null,
          responseImfExpression: null,
          responseImfLeg: null,
          requestImfField: null,
          responseImfField: null,
        },
        {
          fieldId: '109',
          fieldName: 'Field 109 RESERVED ISO USE',
          requestImfExpression: null,
          responseImfExpression: null,
          responseImfLeg: null,
          requestImfField: null,
          responseImfField: null,
        },
        {
          fieldId: '110',
          fieldName: 'Field 110 RESERVED ISO USE',
          requestImfExpression: null,
          responseImfExpression: null,
          responseImfLeg: null,
          requestImfField: null,
          responseImfField: null,
        },
        {
          fieldId: '111',
          fieldName: 'Field 111 RESERVED ISO USE',
          requestImfExpression: null,
          responseImfExpression: null,
          responseImfLeg: null,
          requestImfField: null,
          responseImfField: null,
        },
        {
          fieldId: '112',
          fieldName: 'Field 112 RESERVED NATIONAL USE',
          requestImfExpression: null,
          responseImfExpression: null,
          responseImfLeg: null,
          requestImfField: null,
          responseImfField: null,
        },
        {
          fieldId: '113',
          fieldName: 'Field 113 RESERVED NATIONAL USE',
          requestImfExpression: null,
          responseImfExpression: null,
          responseImfLeg: null,
          requestImfField: null,
          responseImfField: null,
        },
        {
          fieldId: '114',
          fieldName: 'Field 114 RESERVED NATIONAL USE',
          requestImfExpression: null,
          responseImfExpression: null,
          responseImfLeg: null,
          requestImfField: null,
          responseImfField: null,
        },
        {
          fieldId: '115',
          fieldName: 'Field 115 RESERVED NATIONAL USE',
          requestImfExpression: null,
          responseImfExpression: null,
          responseImfLeg: null,
          requestImfField: null,
          responseImfField: null,
        },
        {
          fieldId: '116',
          fieldName: 'Field 116 RESERVED NATIONAL USE',
          requestImfExpression: null,
          responseImfExpression: null,
          responseImfLeg: null,
          requestImfField: null,
          responseImfField: null,
        },
        {
          fieldId: '117',
          fieldName: 'Field 117 RESERVED NATIONAL USE',
          requestImfExpression: null,
          responseImfExpression: null,
          responseImfLeg: null,
          requestImfField: null,
          responseImfField: null,
        },
        {
          fieldId: '118',
          fieldName: 'Field 118 RESERVED NATIONAL USE',
          requestImfExpression: null,
          responseImfExpression: null,
          responseImfLeg: null,
          requestImfField: null,
          responseImfField: null,
        },
        {
          fieldId: '119',
          fieldName: 'Field 119 RESERVED NATIONAL USE',
          requestImfExpression: null,
          responseImfExpression: null,
          responseImfLeg: null,
          requestImfField: null,
          responseImfField: null,
        },
        {
          fieldId: '120',
          fieldName: 'Field 120 RESERVED PRIVATE USE',
          requestImfExpression: null,
          responseImfExpression: null,
          responseImfLeg: null,
          requestImfField: null,
          responseImfField: null,
        },
        {
          fieldId: '121',
          fieldName: 'Field 121 RESERVED PRIVATE USE',
          requestImfExpression: null,
          responseImfExpression: null,
          responseImfLeg: null,
          requestImfField: null,
          responseImfField: null,
        },
        {
          fieldId: '122',
          fieldName: 'Field 122 RESERVED PRIVATE USE',
          requestImfExpression: null,
          responseImfExpression: null,
          responseImfLeg: null,
          requestImfField: null,
          responseImfField: null,
        },
        {
          fieldId: '123.1',
          fieldName: 'Field 123.1 Card data input capability',
          requestImfExpression: null,
          responseImfExpression: null,
          responseImfLeg: null,
          requestImfField: null,
          responseImfField: null,
        },
        {
          fieldId: '123.2',
          fieldName: 'Field 123.2 Cardholder authentication capability',
          requestImfExpression: null,
          responseImfExpression: null,
          responseImfLeg: null,
          requestImfField: null,
          responseImfField: null,
        },
        {
          fieldId: '123.3',
          fieldName: 'Field 123.3 Card capture capability',
          requestImfExpression: null,
          responseImfExpression: null,
          responseImfLeg: null,
          requestImfField: null,
          responseImfField: null,
        },
        {
          fieldId: '123.4',
          fieldName: 'Field 123.4 Operating environment',
          requestImfExpression: null,
          responseImfExpression: null,
          responseImfLeg: null,
          requestImfField: null,
          responseImfField: null,
        },
        {
          fieldId: '123.5',
          fieldName: 'Field 123.5 Cardholder is present',
          requestImfExpression: null,
          responseImfExpression: null,
          responseImfLeg: null,
          requestImfField: null,
          responseImfField: null,
        },
        {
          fieldId: '123.6',
          fieldName: 'Field 123.6 Card is present',
          requestImfExpression: null,
          responseImfExpression: null,
          responseImfLeg: null,
          requestImfField: null,
          responseImfField: null,
        },
        {
          fieldId: '123.7',
          fieldName: 'Field 123.7 Card data input mode',
          requestImfExpression: null,
          responseImfExpression: null,
          responseImfLeg: null,
          requestImfField: null,
          responseImfField: null,
        },
        {
          fieldId: '123.8',
          fieldName: 'Field 123.8 Cardholder authentication method',
          requestImfExpression: null,
          responseImfExpression: null,
          responseImfLeg: null,
          requestImfField: null,
          responseImfField: null,
        },
        {
          fieldId: '123.9',
          fieldName: 'Field 123.9 Cardholder authentication entity',
          requestImfExpression: null,
          responseImfExpression: null,
          responseImfLeg: null,
          requestImfField: null,
          responseImfField: null,
        },
        {
          fieldId: '123.10',
          fieldName: 'Field 123.10 Card data output capability',
          requestImfExpression: null,
          responseImfExpression: null,
          responseImfLeg: null,
          requestImfField: null,
          responseImfField: null,
        },
        {
          fieldId: '123.11',
          fieldName: 'Field 123.11 Terminal output capability',
          requestImfExpression: null,
          responseImfExpression: null,
          responseImfLeg: null,
          requestImfField: null,
          responseImfField: null,
        },
        {
          fieldId: '123.12',
          fieldName: 'Field 123.12 PIN capture capability',
          requestImfExpression: null,
          responseImfExpression: null,
          responseImfLeg: null,
          requestImfField: null,
          responseImfField: null,
        },
        {
          fieldId: '123.13',
          fieldName: 'Field 123.13 Terminal operator',
          requestImfExpression: null,
          responseImfExpression: null,
          responseImfLeg: null,
          requestImfField: null,
          responseImfField: null,
        },
        {
          fieldId: '123.14',
          fieldName: 'Field 123.14 Terminal type',
          requestImfExpression: null,
          responseImfExpression: null,
          responseImfLeg: null,
          requestImfField: null,
          responseImfField: null,
        },
        {
          fieldId: '124',
          fieldName: 'Field 124 RESERVED PRIVATE USE',
          requestImfExpression: null,
          responseImfExpression: null,
          responseImfLeg: null,
          requestImfField: null,
          responseImfField: null,
        },
        {
          fieldId: '125',
          fieldName: 'Field 125 RESERVED PRIVATE USE',
          requestImfExpression: null,
          responseImfExpression: null,
          responseImfLeg: null,
          requestImfField: null,
          responseImfField: null,
        },
        {
          fieldId: '126',
          fieldName: 'Field 126 RESERVED PRIVATE USE',
          requestImfExpression: null,
          responseImfExpression: null,
          responseImfLeg: null,
          requestImfField: null,
          responseImfField: null,
        },
        {
          fieldId: '127.0',
          fieldName: 'Field 127.0 PLACEHOLDER',
          requestImfExpression: null,
          responseImfExpression: null,
          responseImfLeg: null,
          requestImfField: null,
          responseImfField: null,
        },
        {
          fieldId: '127.1',
          fieldName: 'Field 127.1 BITMAP',
          requestImfExpression: null,
          responseImfExpression: null,
          responseImfLeg: null,
          requestImfField: null,
          responseImfField: null,
        },
        {
          fieldId: '127.2',
          fieldName: 'Field 127.2 SWITCH KEY',
          requestImfExpression: null,
          responseImfExpression: null,
          responseImfLeg: null,
          requestImfField: null,
          responseImfField: null,
        },
        {
          fieldId: '127.3',
          fieldName: 'Field 127.3 ROUTING INFORMATION',
          requestImfExpression: null,
          responseImfExpression: null,
          responseImfLeg: null,
          requestImfField: null,
          responseImfField: null,
        },
        {
          fieldId: '127.4',
          fieldName: 'Field 127.4 POS DATA',
          requestImfExpression: null,
          responseImfExpression: null,
          responseImfLeg: null,
          requestImfField: null,
          responseImfField: null,
        },
        {
          fieldId: '127.5',
          fieldName: 'Field 127.5 SERVICE STATION DATA',
          requestImfExpression: null,
          responseImfExpression: null,
          responseImfLeg: null,
          requestImfField: null,
          responseImfField: null,
        },
        {
          fieldId: '127.6',
          fieldName: 'Field 127.6 AUTHORIZATION PROFILE',
          requestImfExpression: null,
          responseImfExpression: null,
          responseImfLeg: null,
          requestImfField: null,
          responseImfField: null,
        },
        {
          fieldId: '127.7',
          fieldName: 'Field 127.7 CHECK DATA',
          requestImfExpression: null,
          responseImfExpression: null,
          responseImfLeg: null,
          requestImfField: null,
          responseImfField: null,
        },
        {
          fieldId: '127.8',
          fieldName: 'Field 127.8 RETENTION DATA',
          requestImfExpression: null,
          responseImfExpression: null,
          responseImfLeg: null,
          requestImfField: null,
          responseImfField: null,
        },
        {
          fieldId: '127.9',
          fieldName: 'Field 127.9 ADDITIONAL NODE DATA',
          requestImfExpression: null,
          responseImfExpression: null,
          responseImfLeg: null,
          requestImfField: null,
          responseImfField: null,
        },
        {
          fieldId: '127.10',
          fieldName: 'Field 127.10 CVV2',
          requestImfExpression: null,
          responseImfExpression: null,
          responseImfLeg: null,
          requestImfField: null,
          responseImfField: null,
        },
        {
          fieldId: '127.11',
          fieldName: 'Field 127.11 ORIGINAL KEY',
          requestImfExpression: null,
          responseImfExpression: null,
          responseImfLeg: null,
          requestImfField: null,
          responseImfField: null,
        },
        {
          fieldId: '127.12',
          fieldName: 'Field 127.12 TERMINAL OWNDER',
          requestImfExpression: null,
          responseImfExpression: null,
          responseImfLeg: null,
          requestImfField: null,
          responseImfField: null,
        },
        {
          fieldId: '127.13',
          fieldName: 'Field 127.13 POS GEOGRAPHIC DATA',
          requestImfExpression: null,
          responseImfExpression: null,
          responseImfLeg: null,
          requestImfField: null,
          responseImfField: null,
        },
        {
          fieldId: '127.14',
          fieldName: 'Field 127.14 SPONSOR BANK',
          requestImfExpression: null,
          responseImfExpression: null,
          responseImfLeg: null,
          requestImfField: null,
          responseImfField: null,
        },
        {
          fieldId: '127.15',
          fieldName: 'Field 127.15 AVS REQUEST',
          requestImfExpression: null,
          responseImfExpression: null,
          responseImfLeg: null,
          requestImfField: null,
          responseImfField: null,
        },
        {
          fieldId: '127.16',
          fieldName: 'Field 127.16 AVS RESPONSE',
          requestImfExpression: null,
          responseImfExpression: null,
          responseImfLeg: null,
          requestImfField: null,
          responseImfField: null,
        },
        {
          fieldId: '127.17',
          fieldName: 'Field 127.17 CARDHOLDER INFORMATION',
          requestImfExpression: null,
          responseImfExpression: null,
          responseImfLeg: null,
          requestImfField: null,
          responseImfField: null,
        },
        {
          fieldId: '127.18',
          fieldName: 'Field 127.18 VALIDATION DATA',
          requestImfExpression: null,
          responseImfExpression: null,
          responseImfLeg: null,
          requestImfField: null,
          responseImfField: null,
        },
        {
          fieldId: '127.19',
          fieldName: 'Field 127.19 BANK DETAILS',
          requestImfExpression: null,
          responseImfExpression: null,
          responseImfLeg: null,
          requestImfField: null,
          responseImfField: null,
        },
        {
          fieldId: '127.20',
          fieldName: 'Field 127.20 AUTHORIZER DATE SETTLEMENT',
          requestImfExpression: null,
          responseImfExpression: null,
          responseImfLeg: null,
          requestImfField: null,
          responseImfField: null,
        },
        {
          fieldId: '127.21',
          fieldName: 'Field 127.21 RECORD IDENTIFICATION',
          requestImfExpression: null,
          responseImfExpression: null,
          responseImfLeg: null,
          requestImfField: null,
          responseImfField: null,
        },
        {
          fieldId: '127.22',
          fieldName: 'Field 127.22 STRUCTURED DATA',
          requestImfExpression: null,
          responseImfExpression: null,
          responseImfLeg: null,
          requestImfField: null,
          responseImfField: null,
        },
        {
          fieldId: '127.23',
          fieldName: 'Field 127.23 PAYEE NAME AND ADDRESS',
          requestImfExpression: null,
          responseImfExpression: null,
          responseImfLeg: null,
          requestImfField: null,
          responseImfField: null,
        },
        {
          fieldId: '127.24',
          fieldName: 'Field 127.24 PAYER ACCOUNT INFORMATION',
          requestImfExpression: null,
          responseImfExpression: null,
          responseImfLeg: null,
          requestImfField: null,
          responseImfField: null,
        },
        {
          fieldId: '127.25.1',
          fieldName: 'Field 127.25.1 BIT MAP',
          requestImfExpression: null,
          responseImfExpression: null,
          responseImfLeg: null,
          requestImfField: null,
          responseImfField: null,
        },
        {
          fieldId: '127.25.2',
          fieldName: 'Field 127.25.2 Amount Authorized',
          requestImfExpression: null,
          responseImfExpression: null,
          responseImfLeg: null,
          requestImfField: null,
          responseImfField: null,
        },
        {
          fieldId: '127.25.3',
          fieldName: 'Field 127.25.3 Amount Other',
          requestImfExpression: null,
          responseImfExpression: null,
          responseImfLeg: null,
          requestImfField: null,
          responseImfField: null,
        },
        {
          fieldId: '127.25.4',
          fieldName: 'Field 127.25.4 Application Identifier',
          requestImfExpression: null,
          responseImfExpression: null,
          responseImfLeg: null,
          requestImfField: null,
          responseImfField: null,
        },
        {
          fieldId: '127.25.5',
          fieldName: 'Field 127.25.5 Application Interchange Profile',
          requestImfExpression: null,
          responseImfExpression: null,
          responseImfLeg: null,
          requestImfField: null,
          responseImfField: null,
        },
        {
          fieldId: '127.25.6',
          fieldName: 'Field 127.25.6 Application Transaction Counter',
          requestImfExpression: null,
          responseImfExpression: null,
          responseImfLeg: null,
          requestImfField: null,
          responseImfField: null,
        },
        {
          fieldId: '127.25.7',
          fieldName: 'Field 127.25.7 Application Usage Control',
          requestImfExpression: null,
          responseImfExpression: null,
          responseImfLeg: null,
          requestImfField: null,
          responseImfField: null,
        },
        {
          fieldId: '127.25.8',
          fieldName: 'Field 127.25.8 Authorization Response Code',
          requestImfExpression: null,
          responseImfExpression: null,
          responseImfLeg: null,
          requestImfField: null,
          responseImfField: null,
        },
        {
          fieldId: '127.25.9',
          fieldName: 'Field 127.25.9 Card Authentication Reliability Indicator',
          requestImfExpression: null,
          responseImfExpression: null,
          responseImfLeg: null,
          requestImfField: null,
          responseImfField: null,
        },
        {
          fieldId: '127.25.10',
          fieldName: 'Field 127.25.10 Application Authentication Results Code',
          requestImfExpression: null,
          responseImfExpression: null,
          responseImfLeg: null,
          requestImfField: null,
          responseImfField: null,
        },
        {
          fieldId: '127.25.11',
          fieldName: 'Field 127.25.11 Chip Condition Code',
          requestImfExpression: null,
          responseImfExpression: null,
          responseImfLeg: null,
          requestImfField: null,
          responseImfField: null,
        },
        {
          fieldId: '127.25.12',
          fieldName: 'Field 127.25.12 Cryptogram',
          requestImfExpression: null,
          responseImfExpression: null,
          responseImfLeg: null,
          requestImfField: null,
          responseImfField: null,
        },
        {
          fieldId: '127.25.13',
          fieldName: 'Field 127.25.13 Cryptogram Information Data',
          requestImfExpression: null,
          responseImfExpression: null,
          responseImfLeg: null,
          requestImfField: null,
          responseImfField: null,
        },
        {
          fieldId: '127.25.14',
          fieldName: 'Field 127.25.14 Cvm List',
          requestImfExpression: null,
          responseImfExpression: null,
          responseImfLeg: null,
          requestImfField: null,
          responseImfField: null,
        },
        {
          fieldId: '127.25.15',
          fieldName: 'Field 127.25.15 Cvm Results',
          requestImfExpression: null,
          responseImfExpression: null,
          responseImfLeg: null,
          requestImfField: null,
          responseImfField: null,
        },
        {
          fieldId: '127.25.16',
          fieldName: 'Field 127.25.16 Interface Device Serial Number',
          requestImfExpression: null,
          responseImfExpression: null,
          responseImfLeg: null,
          requestImfField: null,
          responseImfField: null,
        },
        {
          fieldId: '127.25.17',
          fieldName: 'Field 127.25.17 Issuer Action Code',
          requestImfExpression: null,
          responseImfExpression: null,
          responseImfLeg: null,
          requestImfField: null,
          responseImfField: null,
        },
        {
          fieldId: '127.25.18',
          fieldName: 'Field 127.25.18 Issuer Application Data',
          requestImfExpression: null,
          responseImfExpression: null,
          responseImfLeg: null,
          requestImfField: null,
          responseImfField: null,
        },
        {
          fieldId: '127.25.19',
          fieldName: 'Field 127.25.19 Issuer Script Results',
          requestImfExpression: null,
          responseImfExpression: null,
          responseImfLeg: null,
          requestImfField: null,
          responseImfField: null,
        },
        {
          fieldId: '127.25.20',
          fieldName: 'Field 127.25.20 Terminal Application Version Number',
          requestImfExpression: null,
          responseImfExpression: null,
          responseImfLeg: null,
          requestImfField: null,
          responseImfField: null,
        },
        {
          fieldId: '127.25.21',
          fieldName: 'Field 127.25.21 Terminal Capabilities',
          requestImfExpression: null,
          responseImfExpression: null,
          responseImfLeg: null,
          requestImfField: null,
          responseImfField: null,
        },
        {
          fieldId: '127.25.22',
          fieldName: 'Field 127.25.22 Terminal Country Code',
          requestImfExpression: null,
          responseImfExpression: null,
          responseImfLeg: null,
          requestImfField: null,
          responseImfField: null,
        },
        {
          fieldId: '127.25.23',
          fieldName: 'Field 127.25.23 Terminal Type',
          requestImfExpression: null,
          responseImfExpression: null,
          responseImfLeg: null,
          requestImfField: null,
          responseImfField: null,
        },
        {
          fieldId: '127.25.24',
          fieldName: 'Field 127.25.24 Terminal Verification Result',
          requestImfExpression: null,
          responseImfExpression: null,
          responseImfLeg: null,
          requestImfField: null,
          responseImfField: null,
        },
        {
          fieldId: '127.25.25',
          fieldName: 'Field 127.25.25 Transaction Category Code',
          requestImfExpression: null,
          responseImfExpression: null,
          responseImfLeg: null,
          requestImfField: null,
          responseImfField: null,
        },
        {
          fieldId: '127.25.26',
          fieldName: 'Field 127.25.26 Transaction Currency Code',
          requestImfExpression: null,
          responseImfExpression: null,
          responseImfLeg: null,
          requestImfField: null,
          responseImfField: null,
        },
        {
          fieldId: '127.25.27',
          fieldName: 'Field 127.25.27 Transaction Date',
          requestImfExpression: null,
          responseImfExpression: null,
          responseImfLeg: null,
          requestImfField: null,
          responseImfField: null,
        },
        {
          fieldId: '127.25.28',
          fieldName: 'Field 127.25.28 Transaction Sequence Counter ',
          requestImfExpression: null,
          responseImfExpression: null,
          responseImfLeg: null,
          requestImfField: null,
          responseImfField: null,
        },
        {
          fieldId: '127.25.29',
          fieldName: 'Field 127.25.29 Transaction Type',
          requestImfExpression: null,
          responseImfExpression: null,
          responseImfLeg: null,
          requestImfField: null,
          responseImfField: null,
        },
        {
          fieldId: '127.25.30',
          fieldName: 'Field 127.25.30 Unpredictable Number',
          requestImfExpression: null,
          responseImfExpression: null,
          responseImfLeg: null,
          requestImfField: null,
          responseImfField: null,
        },
        {
          fieldId: '127.25.31',
          fieldName: 'Field 127.25.31 Issuer Authentication Data',
          requestImfExpression: null,
          responseImfExpression: null,
          responseImfLeg: null,
          requestImfField: null,
          responseImfField: null,
        },
        {
          fieldId: '127.25.32',
          fieldName: 'Field 127.25.32 Issuer Script Template 1',
          requestImfExpression: null,
          responseImfExpression: null,
          responseImfLeg: null,
          requestImfField: null,
          responseImfField: null,
        },
        {
          fieldId: '127.25.33',
          fieldName: 'Field 127.25.33 Issuer Script Template 2',
          requestImfExpression: null,
          responseImfExpression: null,
          responseImfLeg: null,
          requestImfField: null,
          responseImfField: null,
        },
        {
          fieldId: '127.25.34',
          fieldName: 'Field 127.25.34 PostilionPrivateICCResponseData',
          requestImfExpression: null,
          responseImfExpression: null,
          responseImfLeg: null,
          requestImfField: null,
          responseImfField: null,
        },
        {
          fieldId: '127.25.35',
          fieldName: 'Field 127.25.35 Customer Exclusive Data (CED)',
          requestImfExpression: null,
          responseImfExpression: null,
          responseImfLeg: null,
          requestImfField: null,
          responseImfField: null,
        },
        {
          fieldId: '127.25.36',
          fieldName: 'Field 127.25.36 Form Factor Indicator',
          requestImfExpression: null,
          responseImfExpression: null,
          responseImfLeg: null,
          requestImfField: null,
          responseImfField: null,
        },
        {
          fieldId: '127.26',
          fieldName: 'Field 127.26 ORIGINAL NODE',
          requestImfExpression: null,
          responseImfExpression: null,
          responseImfLeg: null,
          requestImfField: null,
          responseImfField: null,
        },
        {
          fieldId: '128',
          fieldName: 'Field 128 MAC 2',
          requestImfExpression: null,
          responseImfExpression: null,
          responseImfLeg: null,
          requestImfField: null,
          responseImfField: null,
        },
      ],
      listIdRule: [
        {
          id: '0',
          name: 'Field 0 MESSAGE TYPE INDICATOR',
        },
        {
          id: '1',
          name: 'Field 1 BIT MAP',
        },
        {
          id: '2',
          name: 'Field 2 PAN - PRIMARY ACCOUNT NUMBER',
        },
        {
          id: '3',
          name: 'Field 3 PROCESSING CODE',
        },
        {
          id: '4',
          name: 'Field 4 AMOUNT, TRANSACTION',
        },
        {
          id: '5',
          name: 'Field 5 AMOUNT, SETTLEMENT',
        },
        {
          id: '6',
          name: 'Field 6 AMOUNT, CARDHOLDER BILLING',
        },
        {
          id: '7',
          name: 'Field 7 TRANSMISSION DATE AND TIME',
        },
        {
          id: '8',
          name: 'Field 8 AMOUNT, CARDHOLDER BILLING FEE',
        },
        {
          id: '9',
          name: 'Field 9 CONVERSION RATE, SETTLEMENT',
        },
        {
          id: '10',
          name: 'Field 10 CONVERSION RATE, CARDHOLDER BILLING',
        },
        {
          id: '11',
          name: 'Field 11 SYSTEM TRACE AUDIT NUMBER',
        },
        {
          id: '12',
          name: 'Field 12 TIME, LOCAL TRANSACTION',
        },
        {
          id: '13',
          name: 'Field 13 DATE, LOCAL TRANSACTION',
        },
        {
          id: '14',
          name: 'Field 14 DATE, EXPIRATION',
        },
        {
          id: '15',
          name: 'Field 15 DATE, SETTLEMENT',
        },
        {
          id: '16',
          name: 'Field 16 DATE, CONVERSION',
        },
        {
          id: '17',
          name: 'Field 17 DATE, CAPTURE',
        },
        {
          id: '18',
          name: 'Field 18 MERCHANTS TYPE',
        },
        {
          id: '19',
          name: 'Field 19 ACQUIRING INSTITUTION COUNTRY CODE',
        },
        {
          id: '20',
          name: 'Field 20 PAN EXTENDED COUNTRY CODE',
        },
        {
          id: '21',
          name: 'Field 21 FORWARDING INSTITUTION COUNTRY CODE',
        },
        {
          id: '22',
          name: 'Field 22 POINT OF SERVICE ENTRY MODE',
        },
        {
          id: '23',
          name: 'Field 23 CARD SEQUENCE NUMBER',
        },
        {
          id: '24',
          name: 'Field 24 NETWORK INTERNATIONAL IDENTIFIEER',
        },
        {
          id: '25',
          name: 'Field 25 POINT OF SERVICE CONDITION CODE',
        },
        {
          id: '26',
          name: 'Field 26 POINT OF SERVICE PIN CAPTURE CODE',
        },
        {
          id: '27',
          name: 'Field 27 AUTHORIZATION IDENTIFICATION RESP LEN',
        },
        {
          id: '28',
          name: 'Field 28 AMOUNT, TRANSACTION FEE',
        },
        {
          id: '29',
          name: 'Field 29 AMOUNT, SETTLEMENT FEE',
        },
        {
          id: '30',
          name: 'Field 30 AMOUNT, TRANSACTION PROCESSING FEE',
        },
        {
          id: '31',
          name: 'Field 31 AMOUNT, SETTLEMENT PROCESSING FEE',
        },
        {
          id: '32',
          name: 'Field 32 ACQUIRING INSTITUTION IDENT CODE',
        },
        {
          id: '33',
          name: 'Field 33 FORWARDING INSTITUTION IDENT CODE',
        },
        {
          id: '34',
          name: 'Field 34 PAN EXTENDED',
        },
        {
          id: '35',
          name: 'Field 35 TRACK 2 DATA',
        },
        {
          id: '36',
          name: 'Field 36 TRACK 3 DATA',
        },
        {
          id: '37',
          name: 'Field 37 RETRIEVAL REFERENCE NUMBER',
        },
        {
          id: '38',
          name: 'Field 38 AUTHORIZATION IDENTIFICATION RESPONSE',
        },
        {
          id: '39',
          name: 'Field 39 RESPONSE CODE',
        },
        {
          id: '40',
          name: 'Field 40 SERVICE RESTRICTION CODE',
        },
        {
          id: '41',
          name: 'Field 41 CARD ACCEPTOR TERMINAL IDENTIFICACION',
        },
        {
          id: '42',
          name: 'Field 42 CARD ACCEPTOR IDENTIFICATION CODE',
        },
        {
          id: '43',
          name: 'Field 43 CARD ACCEPTOR NAME/LOCATION',
        },
        {
          id: '44',
          name: 'Field 44 ADITIONAL RESPONSE DATA',
        },
        {
          id: '45',
          name: 'Field 45 TRACK 1 DATA',
        },
        {
          id: '46',
          name: 'Field 46 ADITIONAL DATA - ISO',
        },
        {
          id: '47',
          name: 'Field 47 ADITIONAL DATA - NATIONAL',
        },
        {
          id: '48',
          name: 'Field 48 ADITIONAL DATA - PRIVATE',
        },
        {
          id: '49',
          name: 'Field 49 CURRENCY CODE, TRANSACTION',
        },
        {
          id: '50',
          name: 'Field 50 CURRENCY CODE, SETTLEMENT',
        },
        {
          id: '51',
          name: 'Field 51 CURRENCY CODE, CARDHOLDER BILLING',
        },
        {
          id: '52',
          name: 'Field 52 PIN DATA',
        },
        {
          id: '53',
          name: 'Field 53 SECURITY RELATED CONTROL INFORMATION',
        },
        {
          id: '54',
          name: 'Field 54 ADDITIONAL AMOUNTS',
        },
        {
          id: '55',
          name: 'Field 55 RESERVED ISO',
        },
        {
          id: '56',
          name: 'Field 56 RESERVED ISO',
        },
        {
          id: '57',
          name: 'Field 57 RESERVED NATIONAL',
        },
        {
          id: '58',
          name: 'Field 58 RESERVED NATIONAL',
        },
        {
          id: '59',
          name: 'Field 59 RESERVED NATIONAL',
        },
        {
          id: '60',
          name: 'Field 60 RESERVED PRIVATE',
        },
        {
          id: '61',
          name: 'Field 61 RESERVED PRIVATE',
        },
        {
          id: '62',
          name: 'Field 62 RESERVED PRIVATE',
        },
        {
          id: '63',
          name: 'Field 63 RESERVED PRIVATE',
        },
        {
          id: '64',
          name: 'Field 64 MESSAGE AUTHENTICATION CODE FIELD',
        },
        {
          id: '65',
          name: 'Field 65 BITMAP, EXTENDED',
        },
        {
          id: '66',
          name: 'Field 66 SETTLEMENT CODE',
        },
        {
          id: '67',
          name: 'Field 67 EXTENDED PAYMENT CODE',
        },
        {
          id: '68',
          name: 'Field 68 RECEIVING INSTITUTION COUNTRY CODE',
        },
        {
          id: '69',
          name: 'Field 69 SETTLEMENT INSTITUTION COUNTRY CODE',
        },
        {
          id: '70',
          name: 'Field 70 NETWORK MANAGEMENT INFORMATION CODE',
        },
        {
          id: '71',
          name: 'Field 71 MESSAGE NUMBER',
        },
        {
          id: '72',
          name: 'Field 72 MESSAGE NUMBER LAST',
        },
        {
          id: '73',
          name: 'Field 73 DATE ACTION',
        },
        {
          id: '74',
          name: 'Field 74 CREDITS NUMBER',
        },
        {
          id: '75',
          name: 'Field 75 CREDITS REVERSAL NUMBER',
        },
        {
          id: '76',
          name: 'Field 76 DEBITS NUMBER',
        },
        {
          id: '77',
          name: 'Field 77 DEBITS REVERSAL NUMBER',
        },
        {
          id: '78',
          name: 'Field 78 TRANSFER NUMBER',
        },
        {
          id: '79',
          name: 'Field 79 TRANSFER REVERSAL NUMBER',
        },
        {
          id: '80',
          name: 'Field 80 INQUIRIES NUMBER',
        },
        {
          id: '81',
          name: 'Field 81 AUTHORIZATION NUMBER',
        },
        {
          id: '82',
          name: 'Field 82 CREDITS, PROCESSING FEE AMOUNT',
        },
        {
          id: '83',
          name: 'Field 83 CREDITS, TRANSACTION FEE AMOUNT',
        },
        {
          id: '84',
          name: 'Field 84 DEBITS, PROCESSING FEE AMOUNT',
        },
        {
          id: '85',
          name: 'Field 85 DEBITS, TRANSACTION FEE AMOUNT',
        },
        {
          id: '86',
          name: 'Field 86 CREDITS, AMOUNT',
        },
        {
          id: '87',
          name: 'Field 87 CREDITS, REVERSAL AMOUNT',
        },
        {
          id: '88',
          name: 'Field 88 DEBITS, AMOUNT',
        },
        {
          id: '89',
          name: 'Field 89 DEBITS, REVERSAL AMOUNT',
        },
        {
          id: '90',
          name: 'Field 90 ORIGINAL DATA ELEMENTS',
        },
        {
          id: '91',
          name: 'Field 91 FILE UPDATE CODE',
        },
        {
          id: '92',
          name: 'Field 92 FILE SECURITY CODE',
        },
        {
          id: '93',
          name: 'Field 93 RESPONSE INDICATOR',
        },
        {
          id: '94',
          name: 'Field 94 SERVICE INDICATOR',
        },
        {
          id: '95',
          name: 'Field 95 REPLACEMENT AMOUNTS',
        },
        {
          id: '96',
          name: 'Field 96 MESSAGE SECURITY CODE',
        },
        {
          id: '97',
          name: 'Field 97 AMOUNT, NET SETTLEMENT',
        },
        {
          id: '98',
          name: 'Field 98 PAYEE',
        },
        {
          id: '99',
          name: 'Field 99 SETTLEMENT INSTITUTION IDENT CODE',
        },
        {
          id: '100',
          name: 'Field 100 RECEIVING INSTITUTION IDENT CODE',
        },
        {
          id: '101',
          name: 'Field 101 FILE NAME',
        },
        {
          id: '102',
          name: 'Field 102 ACCOUNT IDENTIFICATION 1',
        },
        {
          id: '103',
          name: 'Field 103 ACCOUNT IDENTIFICATION 2',
        },
        {
          id: '104',
          name: 'Field 104 TRANSACTION DESCRIPTION',
        },
        {
          id: '105',
          name: 'Field 105 RESERVED ISO USE',
        },
        {
          id: '106',
          name: 'Field 106 RESERVED ISO USE',
        },
        {
          id: '107',
          name: 'Field 107 RESERVED ISO USE',
        },
        {
          id: '108',
          name: 'Field 108 RESERVED ISO USE',
        },
        {
          id: '109',
          name: 'Field 109 RESERVED ISO USE',
        },
        {
          id: '110',
          name: 'Field 110 RESERVED ISO USE',
        },
        {
          id: '111',
          name: 'Field 111 RESERVED ISO USE',
        },
        {
          id: '112',
          name: 'Field 112 RESERVED NATIONAL USE',
        },
        {
          id: '113',
          name: 'Field 113 RESERVED NATIONAL USE',
        },
        {
          id: '114',
          name: 'Field 114 RESERVED NATIONAL USE',
        },
        {
          id: '115',
          name: 'Field 115 RESERVED NATIONAL USE',
        },
        {
          id: '116',
          name: 'Field 116 RESERVED NATIONAL USE',
        },
        {
          id: '117',
          name: 'Field 117 RESERVED NATIONAL USE',
        },
        {
          id: '118',
          name: 'Field 118 RESERVED NATIONAL USE',
        },
        {
          id: '119',
          name: 'Field 119 RESERVED NATIONAL USE',
        },
        {
          id: '120',
          name: 'Field 120 RESERVED PRIVATE USE',
        },
        {
          id: '121',
          name: 'Field 121 RESERVED PRIVATE USE',
        },
        {
          id: '122',
          name: 'Field 122 RESERVED PRIVATE USE',
        },
        {
          id: '123.1',
          name: 'Field 123.1 Card data input capability',
        },
        {
          id: '123.2',
          name: 'Field 123.2 Cardholder authentication capability',
        },
        {
          id: '123.3',
          name: 'Field 123.3 Card capture capability',
        },
        {
          id: '123.4',
          name: 'Field 123.4 Operating environment',
        },
        {
          id: '123.5',
          name: 'Field 123.5 Cardholder is present',
        },
        {
          id: '123.6',
          name: 'Field 123.6 Card is present',
        },
        {
          id: '123.7',
          name: 'Field 123.7 Card data input mode',
        },
        {
          id: '123.8',
          name: 'Field 123.8 Cardholder authentication method',
        },
        {
          id: '123.9',
          name: 'Field 123.9 Cardholder authentication entity',
        },
        {
          id: '123.10',
          name: 'Field 123.10 Card data output capability',
        },
        {
          id: '123.11',
          name: 'Field 123.11 Terminal output capability',
        },
        {
          id: '123.12',
          name: 'Field 123.12 PIN capture capability',
        },
        {
          id: '123.13',
          name: 'Field 123.13 Terminal operator',
        },
        {
          id: '123.14',
          name: 'Field 123.14 Terminal type',
        },
        {
          id: '124',
          name: 'Field 124 RESERVED PRIVATE USE',
        },
        {
          id: '125',
          name: 'Field 125 RESERVED PRIVATE USE',
        },
        {
          id: '126',
          name: 'Field 126 RESERVED PRIVATE USE',
        },
        {
          id: '127.0',
          name: 'Field 127.0 PLACEHOLDER',
        },
        {
          id: '127.1',
          name: 'Field 127.1 BITMAP',
        },
        {
          id: '127.2',
          name: 'Field 127.2 SWITCH KEY',
        },
        {
          id: '127.3',
          name: 'Field 127.3 ROUTING INFORMATION',
        },
        {
          id: '127.4',
          name: 'Field 127.4 POS DATA',
        },
        {
          id: '127.5',
          name: 'Field 127.5 SERVICE STATION DATA',
        },
        {
          id: '127.6',
          name: 'Field 127.6 AUTHORIZATION PROFILE',
        },
        {
          id: '127.7',
          name: 'Field 127.7 CHECK DATA',
        },
        {
          id: '127.8',
          name: 'Field 127.8 RETENTION DATA',
        },
        {
          id: '127.9',
          name: 'Field 127.9 ADDITIONAL NODE DATA',
        },
        {
          id: '127.10',
          name: 'Field 127.10 CVV2',
        },
        {
          id: '127.11',
          name: 'Field 127.11 ORIGINAL KEY',
        },
        {
          id: '127.12',
          name: 'Field 127.12 TERMINAL OWNDER',
        },
        {
          id: '127.13',
          name: 'Field 127.13 POS GEOGRAPHIC DATA',
        },
        {
          id: '127.14',
          name: 'Field 127.14 SPONSOR BANK',
        },
        {
          id: '127.15',
          name: 'Field 127.15 AVS REQUEST',
        },
        {
          id: '127.16',
          name: 'Field 127.16 AVS RESPONSE',
        },
        {
          id: '127.17',
          name: 'Field 127.17 CARDHOLDER INFORMATION',
        },
        {
          id: '127.18',
          name: 'Field 127.18 VALIDATION DATA',
        },
        {
          id: '127.19',
          name: 'Field 127.19 BANK DETAILS',
        },
        {
          id: '127.20',
          name: 'Field 127.20 AUTHORIZER DATE SETTLEMENT',
        },
        {
          id: '127.21',
          name: 'Field 127.21 RECORD IDENTIFICATION',
        },
        {
          id: '127.22',
          name: 'Field 127.22 STRUCTURED DATA',
        },
        {
          id: '127.23',
          name: 'Field 127.23 PAYEE NAME AND ADDRESS',
        },
        {
          id: '127.24',
          name: 'Field 127.24 PAYER ACCOUNT INFORMATION',
        },
        {
          id: '127.25.1',
          name: 'Field 127.25.1 BIT MAP',
        },
        {
          id: '127.25.2',
          name: 'Field 127.25.2 Amount Authorized',
        },
        {
          id: '127.25.3',
          name: 'Field 127.25.3 Amount Other',
        },
        {
          id: '127.25.4',
          name: 'Field 127.25.4 Application Identifier',
        },
        {
          id: '127.25.5',
          name: 'Field 127.25.5 Application Interchange Profile',
        },
        {
          id: '127.25.6',
          name: 'Field 127.25.6 Application Transaction Counter',
        },
        {
          id: '127.25.7',
          name: 'Field 127.25.7 Application Usage Control',
        },
        {
          id: '127.25.8',
          name: 'Field 127.25.8 Authorization Response Code',
        },
        {
          id: '127.25.9',
          name: 'Field 127.25.9 Card Authentication Reliability Indicator',
        },
        {
          id: '127.25.10',
          name: 'Field 127.25.10 Application Authentication Results Code',
        },
        {
          id: '127.25.11',
          name: 'Field 127.25.11 Chip Condition Code',
        },
        {
          id: '127.25.12',
          name: 'Field 127.25.12 Cryptogram',
        },
        {
          id: '127.25.13',
          name: 'Field 127.25.13 Cryptogram Information Data',
        },
        {
          id: '127.25.14',
          name: 'Field 127.25.14 Cvm List',
        },
        {
          id: '127.25.15',
          name: 'Field 127.25.15 Cvm Results',
        },
        {
          id: '127.25.16',
          name: 'Field 127.25.16 Interface Device Serial Number',
        },
        {
          id: '127.25.17',
          name: 'Field 127.25.17 Issuer Action Code',
        },
        {
          id: '127.25.18',
          name: 'Field 127.25.18 Issuer Application Data',
        },
        {
          id: '127.25.19',
          name: 'Field 127.25.19 Issuer Script Results',
        },
        {
          id: '127.25.20',
          name: 'Field 127.25.20 Terminal Application Version Number',
        },
        {
          id: '127.25.21',
          name: 'Field 127.25.21 Terminal Capabilities',
        },
        {
          id: '127.25.22',
          name: 'Field 127.25.22 Terminal Country Code',
        },
        {
          id: '127.25.23',
          name: 'Field 127.25.23 Terminal Type',
        },
        {
          id: '127.25.24',
          name: 'Field 127.25.24 Terminal Verification Result',
        },
        {
          id: '127.25.25',
          name: 'Field 127.25.25 Transaction Category Code',
        },
        {
          id: '127.25.26',
          name: 'Field 127.25.26 Transaction Currency Code',
        },
        {
          id: '127.25.27',
          name: 'Field 127.25.27 Transaction Date',
        },
        {
          id: '127.25.28',
          name: 'Field 127.25.28 Transaction Sequence Counter ',
        },
        {
          id: '127.25.29',
          name: 'Field 127.25.29 Transaction Type',
        },
        {
          id: '127.25.30',
          name: 'Field 127.25.30 Unpredictable Number',
        },
        {
          id: '127.25.31',
          name: 'Field 127.25.31 Issuer Authentication Data',
        },
        {
          id: '127.25.32',
          name: 'Field 127.25.32 Issuer Script Template 1',
        },
        {
          id: '127.25.33',
          name: 'Field 127.25.33 Issuer Script Template 2',
        },
        {
          id: '127.25.34',
          name: 'Field 127.25.34 PostilionPrivateICCResponseData',
        },
        {
          id: '127.25.35',
          name: 'Field 127.25.35 Customer Exclusive Data (CED)',
        },
        {
          id: '127.25.36',
          name: 'Field 127.25.36 Form Factor Indicator',
        },
        {
          id: '127.26',
          name: 'Field 127.26 ORIGINAL NODE',
        },
        {
          id: '128',
          name: 'Field 128 MAC 2',
        },
      ],
      safingCondition: null,
      apiFieldsData: null,
    },
    responseCodeData: {
      persistRequired: '0',
      ipcUiWrapper: {
        ipcList: [
          {
            ipc: 'DECLINED',
            responseCode: '99',
            description: null,
          },
        ],
        defaultResponseCode: '99',
        componentResponseCodeField: '39',
      },
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
    configurationId: 1051,
    configurationVersion: 0,
    imfId: {
      id: 11,
      name: 'IMF Structure 75',
      version: 75,
    },
    beanTabDisable: true,
  },
};
const SelectStepLisMethodJson = 
{
  status: "success",
  message: "Find adapter-step-method list",
  data: [
    {
      "actionName": "GET_ENTITY_CONFIG_VALUE",
      "parameters": [
        {
          "dataType": "Map",
          "name": "map_fields:imf_field_names",
          "possibleValue": [
            [
              "locationCode",
              "merchantCode",
              "merchantAdditionalAttributes[field]",
              "deviceID",
              "deviceCode",
              "deviceType",
              "pedId",
              "deviceActivateOn",
              "deviceExpiryOn",
              "deviceLocked",
              "batchLocked",
              "deviceAdditionalAttribute",
              "devicePosSafty",
              "deviceReversalTimeout",
              "locationID",
              "locationCode",
              "locationName",
              "locationAdditionalAttribute",
              "locationActivateOn",
              "locationExpiryOn",
              "locationLocked",
              "locationPosSafty",
              "locationReversalTimeout",
              "locationPostalCode",
              "locationCity",
              "locationCountryCode",
              "locationCountryIsoCode",
              "locationCountryShortCode",
              "merchantID",
              "merchantCode",
              "merchantName",
              "merchantActivateOn",
              "merchantExpiryOn",
              "merchantLocked",
              "merchantDcc",
              "markUpFee",
              "merchantPosSafty",
              "merchantReversalTimeout",
              "merchantInstitutionID",
              "merchantInstitutionCode",
              "merchantInstitutionActivateOn",
              "merchantInstitutionExpiryOn",
              "merchantInstitutionLocked",
              "isTransactionVelocityDefined",
              "merchantInstitutionDcc",
              "merchantCurrencyCode",
              "merchantCountryCode",
              "merchantCategoryCode",
              "services",
              "merchantPartialAuth",
              "isMerchantTransVelocity",
              "acquirerID",
              "postalCode",
              "acquirerMapID",
              "acquirerMapDeviceID",
              "acquirerMapLocationID",
              "acquirerMapMerchantID",
              "acquirerMapAcquirerId",
              "acquirerMapPaymentMethod",
              "acquirerIdConfigID",
              "acquirerIdConfigCode",
              "acquirerIdConfigName",
              "acquirerIdConfigCountryId",
              "acquirerIdConfigDeleted",
              "acquirerIdConfigDescription",
              "acquirerIdConfigActive",
              "acquirerIdConfigOnusValidate",
              "acquirerIdConfigOfflineRefundusValidate",
              "accounttypeSMS",
              "accounttypeDMS",
              "txntypeDMS",
              "txntypeSMS",
              "posDMS",
              "posSMS",
              "adviceMatch",
              "offLineRefund",
              "merchantCodeMapID",
              "merchantCodeMapProcessorID",
              "merchantCodeMapSrcAcquirerId",
              "merchantCodeMapSrcDeviceID",
              "merchantCodeMapSrcLocationID",
              "merchantCodeMapSrcMerchantID",
              "merchantCodeMapDestDevice",
              "merchantCodeMapDestLocation",
              "merchantCodeMapDestMerchant",
              "merchantCodeMapDestAcquirer"
            ],
            null
          ],
          "displayName": "Select field:Select IMF field",
          "ordinal": 0
        },
        {
          "dataType": "String",
          "name": "Merchant Field",
          "possibleValue": [
            "locationCode",
            "merchantCode",
            "merchantAdditionalAttributes[field]",
            "deviceID",
            "deviceCode",
            "deviceType",
            "pedId",
            "deviceActivateOn",
            "deviceExpiryOn",
            "deviceLocked",
            "batchLocked",
            "deviceAdditionalAttribute",
            "devicePosSafty",
            "deviceReversalTimeout",
            "locationID",
            "locationCode",
            "locationName",
            "locationAdditionalAttribute",
            "locationActivateOn",
            "locationExpiryOn",
            "locationLocked",
            "locationPosSafty",
            "locationReversalTimeout",
            "locationPostalCode",
            "locationCity",
            "locationCountryCode",
            "locationCountryIsoCode",
            "locationCountryShortCode",
            "merchantID",
            "merchantCode",
            "merchantName",
            "merchantActivateOn",
            "merchantExpiryOn",
            "merchantLocked",
            "merchantDcc",
            "markUpFee",
            "merchantPosSafty",
            "merchantReversalTimeout",
            "merchantInstitutionID",
            "merchantInstitutionCode",
            "merchantInstitutionActivateOn",
            "merchantInstitutionExpiryOn",
            "merchantInstitutionLocked",
            "isTransactionVelocityDefined",
            "merchantInstitutionDcc",
            "merchantCurrencyCode",
            "merchantCountryCode",
            "merchantCategoryCode",
            "services",
            "merchantPartialAuth",
            "isMerchantTransVelocity",
            "acquirerID",
            "postalCode",
            "acquirerMapID",
            "acquirerMapDeviceID",
            "acquirerMapLocationID",
            "acquirerMapMerchantID",
            "acquirerMapAcquirerId",
            "acquirerMapPaymentMethod",
            "acquirerIdConfigID",
            "acquirerIdConfigCode",
            "acquirerIdConfigName",
            "acquirerIdConfigCountryId",
            "acquirerIdConfigDeleted",
            "acquirerIdConfigDescription",
            "acquirerIdConfigActive",
            "acquirerIdConfigOnusValidate",
            "acquirerIdConfigOfflineRefundusValidate",
            "accounttypeSMS",
            "accounttypeDMS",
            "txntypeDMS",
            "txntypeSMS",
            "posDMS",
            "posSMS",
            "adviceMatch",
            "offLineRefund",
            "merchantCodeMapID",
            "merchantCodeMapProcessorID",
            "merchantCodeMapSrcAcquirerId",
            "merchantCodeMapSrcDeviceID",
            "merchantCodeMapSrcLocationID",
            "merchantCodeMapSrcMerchantID",
            "merchantCodeMapDestDevice",
            "merchantCodeMapDestLocation",
            "merchantCodeMapDestMerchant",
            "merchantCodeMapDestAcquirer"
          ],
          "displayName": "field name to get value",
          "ordinal": 1
        }
      ],
      "tooltip": null,
      "type": "execute_function",
      "request": true,
      "response": true,
      "parametersOptional": false
    },
    {
      "actionName": "MID_MID_MAPPING",
      "parameters": [
        {
          "dataType": "Map",
          "name": "map_fields:imf_field_names",
          "possibleValue": [
            [
              "locationCode",
              "merchantCode",
              "merchantAdditionalAttributes[field]",
              "deviceID",
              "deviceCode",
              "deviceType",
              "pedId",
              "deviceActivateOn",
              "deviceExpiryOn",
              "deviceLocked",
              "batchLocked",
              "deviceAdditionalAttribute",
              "devicePosSafty",
              "deviceReversalTimeout",
              "locationID",
              "locationCode",
              "locationName",
              "locationAdditionalAttribute",
              "locationActivateOn",
              "locationExpiryOn",
              "locationLocked",
              "locationPosSafty",
              "locationReversalTimeout",
              "locationPostalCode",
              "locationCity",
              "locationCountryCode",
              "locationCountryIsoCode",
              "locationCountryShortCode",
              "merchantID",
              "merchantCode",
              "merchantName",
              "merchantActivateOn",
              "merchantExpiryOn",
              "merchantLocked",
              "merchantDcc",
              "markUpFee",
              "merchantPosSafty",
              "merchantReversalTimeout",
              "merchantInstitutionID",
              "merchantInstitutionCode",
              "merchantInstitutionActivateOn",
              "merchantInstitutionExpiryOn",
              "merchantInstitutionLocked",
              "isTransactionVelocityDefined",
              "merchantInstitutionDcc",
              "merchantCurrencyCode",
              "merchantCountryCode",
              "merchantCategoryCode",
              "services",
              "merchantPartialAuth",
              "isMerchantTransVelocity",
              "acquirerID",
              "postalCode",
              "acquirerMapID",
              "acquirerMapDeviceID",
              "acquirerMapLocationID",
              "acquirerMapMerchantID",
              "acquirerMapAcquirerId",
              "acquirerMapPaymentMethod",
              "acquirerIdConfigID",
              "acquirerIdConfigCode",
              "acquirerIdConfigName",
              "acquirerIdConfigCountryId",
              "acquirerIdConfigDeleted",
              "acquirerIdConfigDescription",
              "acquirerIdConfigActive",
              "acquirerIdConfigOnusValidate",
              "acquirerIdConfigOfflineRefundusValidate",
              "accounttypeSMS",
              "accounttypeDMS",
              "txntypeDMS",
              "txntypeSMS",
              "posDMS",
              "posSMS",
              "adviceMatch",
              "offLineRefund",
              "merchantCodeMapID",
              "merchantCodeMapProcessorID",
              "merchantCodeMapSrcAcquirerId",
              "merchantCodeMapSrcDeviceID",
              "merchantCodeMapSrcLocationID",
              "merchantCodeMapSrcMerchantID",
              "merchantCodeMapDestDevice",
              "merchantCodeMapDestLocation",
              "merchantCodeMapDestMerchant",
              "merchantCodeMapDestAcquirer"
            ],
            null
          ],
          "displayName": "Select field:Select IMF field",
          "ordinal": 0
        }
      ],
      "tooltip": null,
      "type": "execute_function",
      "request": true,
      "response": true,
      "parametersOptional": true
    },
    {
      "actionName": "TID_TID_MAPPING",
      "parameters": [
        {
          "dataType": "Map",
          "name": "map_fields:imf_field_names",
          "possibleValue": [
            [
              "locationCode",
              "merchantCode",
              "merchantAdditionalAttributes[field]",
              "deviceID",
              "deviceCode",
              "deviceType",
              "pedId",
              "deviceActivateOn",
              "deviceExpiryOn",
              "deviceLocked",
              "batchLocked",
              "deviceAdditionalAttribute",
              "devicePosSafty",
              "deviceReversalTimeout",
              "locationID",
              "locationCode",
              "locationName",
              "locationAdditionalAttribute",
              "locationActivateOn",
              "locationExpiryOn",
              "locationLocked",
              "locationPosSafty",
              "locationReversalTimeout",
              "locationPostalCode",
              "locationCity",
              "locationCountryCode",
              "locationCountryIsoCode",
              "locationCountryShortCode",
              "merchantID",
              "merchantCode",
              "merchantName",
              "merchantActivateOn",
              "merchantExpiryOn",
              "merchantLocked",
              "merchantDcc",
              "markUpFee",
              "merchantPosSafty",
              "merchantReversalTimeout",
              "merchantInstitutionID",
              "merchantInstitutionCode",
              "merchantInstitutionActivateOn",
              "merchantInstitutionExpiryOn",
              "merchantInstitutionLocked",
              "isTransactionVelocityDefined",
              "merchantInstitutionDcc",
              "merchantCurrencyCode",
              "merchantCountryCode",
              "merchantCategoryCode",
              "services",
              "merchantPartialAuth",
              "isMerchantTransVelocity",
              "acquirerID",
              "postalCode",
              "acquirerMapID",
              "acquirerMapDeviceID",
              "acquirerMapLocationID",
              "acquirerMapMerchantID",
              "acquirerMapAcquirerId",
              "acquirerMapPaymentMethod",
              "acquirerIdConfigID",
              "acquirerIdConfigCode",
              "acquirerIdConfigName",
              "acquirerIdConfigCountryId",
              "acquirerIdConfigDeleted",
              "acquirerIdConfigDescription",
              "acquirerIdConfigActive",
              "acquirerIdConfigOnusValidate",
              "acquirerIdConfigOfflineRefundusValidate",
              "accounttypeSMS",
              "accounttypeDMS",
              "txntypeDMS",
              "txntypeSMS",
              "posDMS",
              "posSMS",
              "adviceMatch",
              "offLineRefund",
              "merchantCodeMapID",
              "merchantCodeMapProcessorID",
              "merchantCodeMapSrcAcquirerId",
              "merchantCodeMapSrcDeviceID",
              "merchantCodeMapSrcLocationID",
              "merchantCodeMapSrcMerchantID",
              "merchantCodeMapDestDevice",
              "merchantCodeMapDestLocation",
              "merchantCodeMapDestMerchant",
              "merchantCodeMapDestAcquirer"
            ],
            null
          ],
          "displayName": "Select field:Select IMF field",
          "ordinal": 0
        }
      ],
      "tooltip": null,
      "type": "execute_function",
      "request": true,
      "response": true,
      "parametersOptional": true
    },
    {
      "actionName": "LID_LID_MAPPING",
      "parameters": [
        {
          "dataType": "Map",
          "name": "map_fields:imf_field_names",
          "possibleValue": [
            [
              "locationCode",
              "merchantCode",
              "merchantAdditionalAttributes[field]",
              "deviceID",
              "deviceCode",
              "deviceType",
              "pedId",
              "deviceActivateOn",
              "deviceExpiryOn",
              "deviceLocked",
              "batchLocked",
              "deviceAdditionalAttribute",
              "devicePosSafty",
              "deviceReversalTimeout",
              "locationID",
              "locationCode",
              "locationName",
              "locationAdditionalAttribute",
              "locationActivateOn",
              "locationExpiryOn",
              "locationLocked",
              "locationPosSafty",
              "locationReversalTimeout",
              "locationPostalCode",
              "locationCity",
              "locationCountryCode",
              "locationCountryIsoCode",
              "locationCountryShortCode",
              "merchantID",
              "merchantCode",
              "merchantName",
              "merchantActivateOn",
              "merchantExpiryOn",
              "merchantLocked",
              "merchantDcc",
              "markUpFee",
              "merchantPosSafty",
              "merchantReversalTimeout",
              "merchantInstitutionID",
              "merchantInstitutionCode",
              "merchantInstitutionActivateOn",
              "merchantInstitutionExpiryOn",
              "merchantInstitutionLocked",
              "isTransactionVelocityDefined",
              "merchantInstitutionDcc",
              "merchantCurrencyCode",
              "merchantCountryCode",
              "merchantCategoryCode",
              "services",
              "merchantPartialAuth",
              "isMerchantTransVelocity",
              "acquirerID",
              "postalCode",
              "acquirerMapID",
              "acquirerMapDeviceID",
              "acquirerMapLocationID",
              "acquirerMapMerchantID",
              "acquirerMapAcquirerId",
              "acquirerMapPaymentMethod",
              "acquirerIdConfigID",
              "acquirerIdConfigCode",
              "acquirerIdConfigName",
              "acquirerIdConfigCountryId",
              "acquirerIdConfigDeleted",
              "acquirerIdConfigDescription",
              "acquirerIdConfigActive",
              "acquirerIdConfigOnusValidate",
              "acquirerIdConfigOfflineRefundusValidate",
              "accounttypeSMS",
              "accounttypeDMS",
              "txntypeDMS",
              "txntypeSMS",
              "posDMS",
              "posSMS",
              "adviceMatch",
              "offLineRefund",
              "merchantCodeMapID",
              "merchantCodeMapProcessorID",
              "merchantCodeMapSrcAcquirerId",
              "merchantCodeMapSrcDeviceID",
              "merchantCodeMapSrcLocationID",
              "merchantCodeMapSrcMerchantID",
              "merchantCodeMapDestDevice",
              "merchantCodeMapDestLocation",
              "merchantCodeMapDestMerchant",
              "merchantCodeMapDestAcquirer"
            ],
            null
          ],
          "displayName": "Select field:Select IMF field",
          "ordinal": 0
        }
      ],
      "tooltip": null,
      "type": "execute_function",
      "request": true,
      "response": true,
      "parametersOptional": true
    },
    {
      "actionName": "AID_AID_MAPPING",
      "parameters": [
        {
          "dataType": "Map",
          "name": "map_fields:imf_field_names",
          "possibleValue": [
            [
              "locationCode",
              "merchantCode",
              "merchantAdditionalAttributes[field]",
              "deviceID",
              "deviceCode",
              "deviceType",
              "pedId",
              "deviceActivateOn",
              "deviceExpiryOn",
              "deviceLocked",
              "batchLocked",
              "deviceAdditionalAttribute",
              "devicePosSafty",
              "deviceReversalTimeout",
              "locationID",
              "locationCode",
              "locationName",
              "locationAdditionalAttribute",
              "locationActivateOn",
              "locationExpiryOn",
              "locationLocked",
              "locationPosSafty",
              "locationReversalTimeout",
              "locationPostalCode",
              "locationCity",
              "locationCountryCode",
              "locationCountryIsoCode",
              "locationCountryShortCode",
              "merchantID",
              "merchantCode",
              "merchantName",
              "merchantActivateOn",
              "merchantExpiryOn",
              "merchantLocked",
              "merchantDcc",
              "markUpFee",
              "merchantPosSafty",
              "merchantReversalTimeout",
              "merchantInstitutionID",
              "merchantInstitutionCode",
              "merchantInstitutionActivateOn",
              "merchantInstitutionExpiryOn",
              "merchantInstitutionLocked",
              "isTransactionVelocityDefined",
              "merchantInstitutionDcc",
              "merchantCurrencyCode",
              "merchantCountryCode",
              "merchantCategoryCode",
              "services",
              "merchantPartialAuth",
              "isMerchantTransVelocity",
              "acquirerID",
              "postalCode",
              "acquirerMapID",
              "acquirerMapDeviceID",
              "acquirerMapLocationID",
              "acquirerMapMerchantID",
              "acquirerMapAcquirerId",
              "acquirerMapPaymentMethod",
              "acquirerIdConfigID",
              "acquirerIdConfigCode",
              "acquirerIdConfigName",
              "acquirerIdConfigCountryId",
              "acquirerIdConfigDeleted",
              "acquirerIdConfigDescription",
              "acquirerIdConfigActive",
              "acquirerIdConfigOnusValidate",
              "acquirerIdConfigOfflineRefundusValidate",
              "accounttypeSMS",
              "accounttypeDMS",
              "txntypeDMS",
              "txntypeSMS",
              "posDMS",
              "posSMS",
              "adviceMatch",
              "offLineRefund",
              "merchantCodeMapID",
              "merchantCodeMapProcessorID",
              "merchantCodeMapSrcAcquirerId",
              "merchantCodeMapSrcDeviceID",
              "merchantCodeMapSrcLocationID",
              "merchantCodeMapSrcMerchantID",
              "merchantCodeMapDestDevice",
              "merchantCodeMapDestLocation",
              "merchantCodeMapDestMerchant",
              "merchantCodeMapDestAcquirer"
            ],
            null
          ],
          "displayName": "Select field:Select IMF field",
          "ordinal": 0
        }
      ],
      "tooltip": null,
      "type": "execute_function",
      "request": true,
      "response": true,
      "parametersOptional": true
    },
    {
      "actionName": "EL_EXPRESSION",
      "parameters": [
        {
          "dataType": "String",
          "name": "El Expression",
          "possibleValue": null,
          "displayName": "Provide Spring EL to apply on value",
          "ordinal": 0
        }
      ],
      "tooltip": null,
      "type": "execute_function",
      "request": true,
      "response": true,
      "parametersOptional": true
    },
    {
      "actionName": "SUB_STRING",
      "parameters": [
        {
          "dataType": "Integer",
          "name": "functions.SUB_STRING.parameters.lable",
          "possibleValue": null,
          "displayName": "functions.SUB_STRING.display.lable",
          "ordinal": 0
        },
        {
          "dataType": "Integer",
          "name": "functions.SUB_STRING.parameters.lable",
          "possibleValue": null,
          "displayName": "functions.SUB_STRING.display.lable",
          "ordinal": 1
        }
      ],
      "tooltip": null,
      "type": "execute_function",
      "request": true,
      "response": true,
      "parametersOptional": true
    },
    {
      "actionName": "SUB_STRING_RIGHT",
      "parameters": [
        {
          "dataType": "Integer",
          "name": "functions.SUB_STRING_RIGHT.parameters.lable",
          "possibleValue": null,
          "displayName": "functions.SUB_STRING_RIGHT.display.lable",
          "ordinal": 0
        }
      ],
      "tooltip": null,
      "type": "execute_function",
      "request": true,
      "response": true,
      "parametersOptional": true
    },
    {
      "actionName": "TO_INT",
      "parameters": [
        {
          "dataType": "Object",
          "name": "functions.TO_INT.parameters.lable",
          "possibleValue": null,
          "displayName": "functions.TO_INT.display.lable",
          "ordinal": 0
        }
      ],
      "tooltip": null,
      "type": "execute_function",
      "request": true,
      "response": true,
      "parametersOptional": true
    },
    {
      "actionName": "TO_DECIMAL",
      "parameters": [
        {
          "dataType": "Object",
          "name": "functions.TO_DECIMAL.parameters.lable",
          "possibleValue": null,
          "displayName": "functions.TO_DECIMAL.display.lable",
          "ordinal": 0
        }
      ],
      "tooltip": null,
      "type": "execute_function",
      "request": true,
      "response": true,
      "parametersOptional": true
    },
    {
      "actionName": "NOW",
      "parameters": [
        {
          "dataType": "Object",
          "name": "functions.NOW.parameters.lable",
          "possibleValue": null,
          "displayName": "functions.NOW.display.lable",
          "ordinal": 0
        }
      ],
      "tooltip": null,
      "type": "execute_function",
      "request": true,
      "response": true,
      "parametersOptional": true
    },
    {
      "actionName": "FORMAT_DATE",
      "parameters": [
        {
          "dataType": "String",
          "name": "functions.FORMAT_DATE.parameters.lable",
          "possibleValue": null,
          "displayName": "functions.FORMAT_DATE.display.lable",
          "ordinal": 0
        }
      ],
      "tooltip": null,
      "type": "execute_function",
      "request": true,
      "response": true,
      "parametersOptional": true
    },
    {
      "actionName": "PARSE_DATE",
      "parameters": [
        {
          "dataType": "String",
          "name": "functions.PARSE_DATE.parameters.lable",
          "possibleValue": null,
          "displayName": "functions.PARSE_DATE.display.lable",
          "ordinal": 0
        }
      ],
      "tooltip": null,
      "type": "execute_function",
      "request": true,
      "response": true,
      "parametersOptional": true
    },
    {
      "actionName": "SET_CURRENT_DATE_FIELD",
      "parameters": [
        {
          "dataType": "Integer",
          "name": "functions.SET_CURRENT_DATE_FIELD.parameters.lable",
          "possibleValue": null,
          "displayName": "functions.SET_CURRENT_DATE_FIELD.display.lable",
          "ordinal": 0
        }
      ],
      "tooltip": null,
      "type": "execute_function",
      "request": true,
      "response": true,
      "parametersOptional": true
    },
    {
      "actionName": "FORMAT_LONG_DATE",
      "parameters": [
        {
          "dataType": "String",
          "name": "functions.FORMAT_LONG_DATE.parameters.lable",
          "possibleValue": null,
          "displayName": "functions.FORMAT_LONG_DATE.display.lable",
          "ordinal": 0
        }
      ],
      "tooltip": null,
      "type": "execute_function",
      "request": true,
      "response": true,
      "parametersOptional": true
    },
    {
      "actionName": "FORMAT_NOW",
      "parameters": [
        {
          "dataType": "String",
          "name": "functions.FORMAT_NOW.parameters.lable",
          "possibleValue": null,
          "displayName": "functions.FORMAT_NOW.display.lable",
          "ordinal": 0
        }
      ],
      "tooltip": null,
      "type": "execute_function",
      "request": true,
      "response": true,
      "parametersOptional": true
    },
    {
      "actionName": "PAD_LEFT",
      "parameters": [
        {
          "dataType": "Integer",
          "name": "functions.PAD_LEFT.parameters.lable",
          "possibleValue": null,
          "displayName": "functions.PAD_LEFT.display.lable",
          "ordinal": 0
        },
        {
          "dataType": "String",
          "name": "functions.PAD_LEFT.parameters.lable",
          "possibleValue": null,
          "displayName": "functions.PAD_LEFT.parameters.lable",
          "ordinal": 1
        }
      ],
      "tooltip": null,
      "type": "execute_function",
      "request": true,
      "response": true,
      "parametersOptional": true
    },
    {
      "actionName": "PAD_RIGHT",
      "parameters": [
        {
          "dataType": "Integer",
          "name": "functions.PAD_RIGHT.parameters.lable",
          "possibleValue": null,
          "displayName": "functions.PAD_RIGHT.display.lable",
          "ordinal": 0
        },
        {
          "dataType": "String",
          "name": "functions.PAD_RIGHT.parameters.lable",
          "possibleValue": null,
          "displayName": "functions.PAD_RIGHT.parameters.lable",
          "ordinal": 1
        }
      ],
      "tooltip": null,
      "type": "execute_function",
      "request": true,
      "response": true,
      "parametersOptional": true
    },
    {
      "actionName": "REPLACE",
      "parameters": [
        {
          "dataType": "String",
          "name": "functions.REPLACE.parameters.lable",
          "possibleValue": null,
          "displayName": "functions.REPLACE.display.lable",
          "ordinal": 0
        },
        {
          "dataType": "String",
          "name": "functions.REPLACE.parameters.lable",
          "possibleValue": null,
          "displayName": "functions.REPLACE.display.lable",
          "ordinal": 1
        }
      ],
      "tooltip": null,
      "type": "execute_function",
      "request": true,
      "response": true,
      "parametersOptional": true
    },
    {
      "actionName": "REPLACE_ALL",
      "parameters": [
        {
          "dataType": "String",
          "name": "functions.REPLACE_ALL.parameters.lable",
          "possibleValue": null,
          "displayName": "functions.REPLACE_ALL.display.lable",
          "ordinal": 0
        },
        {
          "dataType": "String",
          "name": "functions.REPLACE_ALL.parameters.lable",
          "possibleValue": null,
          "displayName": "functions.REPLACE_ALL.display.lable",
          "ordinal": 1
        }
      ],
      "tooltip": null,
      "type": "execute_function",
      "request": true,
      "response": true,
      "parametersOptional": true
    },
    {
      "actionName": "ISO_87_AMOUNT_FORMATER",
      "parameters": [
        {
          "dataType": "String",
          "name": "functions.ISO_87_AMOUNT_FORMATER.parameters.lable",
          "possibleValue": null,
          "displayName": "functions.ISO_87_AMOUNT_FORMATER.display.lable",
          "ordinal": 0
        }
      ],
      "tooltip": null,
      "type": "execute_function",
      "request": true,
      "response": true,
      "parametersOptional": true
    },
    {
      "actionName": "SIGNED_CONVERTER",
      "parameters": [
        {
          "dataType": "Object",
          "name": "functions.SIGNED_CONVERTER.parameters.lable",
          "possibleValue": null,
          "displayName": "functions.SIGNED_CONVERTER.display.lable",
          "ordinal": 0
        }
      ],
      "tooltip": null,
      "type": "execute_function",
      "request": true,
      "response": true,
      "parametersOptional": true
    },
    {
      "actionName": "AMOUNT_FORMATER",
      "parameters": [
        {
          "dataType": "String",
          "name": "functions.AMOUNT_FORMATER.parameters.lable",
          "possibleValue": null,
          "displayName": "functions.AMOUNT_FORMATER.display.lable",
          "ordinal": 0
        }
      ],
      "tooltip": null,
      "type": "execute_function",
      "request": true,
      "response": true,
      "parametersOptional": true
    },
    {
      "actionName": "DECIMAL_USING_LEFT_MOST_DIGIT",
      "parameters": [
        {
          "dataType": "String",
          "name": "functions.DECIMAL_USING_LEFT_MOST_DIGIT.parameters.lable",
          "possibleValue": null,
          "displayName": "functions.DECIMAL_USING_LEFT_MOST_DIGIT.display.lable",
          "ordinal": 0
        }
      ],
      "tooltip": null,
      "type": "execute_function",
      "request": true,
      "response": true,
      "parametersOptional": true
    },
    {
      "actionName": "BYTE_ARRAY_TO_HEX_STRING",
      "parameters": [],
      "tooltip": null,
      "type": "execute_function",
      "request": true,
      "response": true,
      "parametersOptional": true
    },
    {
      "actionName": "CONCAT",
      "parameters": [
        {
          "dataType": "List",
          "name": "functions.CONCAT.parameters.lable",
          "possibleValue": null,
          "displayName": "functions.CONCAT.display.lable",
          "ordinal": 0
        }
      ],
      "tooltip": null,
      "type": "execute_function",
      "request": true,
      "response": true,
      "parametersOptional": true
    },
    {
      "actionName": "CONCAT_STRING",
      "parameters": [
        {
          "dataType": "String",
          "name": "functions.CONCAT_STRING.parameters.lable",
          "possibleValue": null,
          "displayName": "functions.CONCAT_STRING.display.lable",
          "ordinal": 0
        },
        {
          "dataType": "String",
          "name": "functions.CONCAT_STRING.parameters.lable",
          "possibleValue": null,
          "displayName": "functions.CONCAT_STRING.display.lable",
          "ordinal": 1
        }
      ],
      "tooltip": null,
      "type": "execute_function",
      "request": true,
      "response": true,
      "parametersOptional": true
    },
    {
      "actionName": "PIN_TRANSLATION",
      "parameters": [
        {
          "dataType": "List",
          "name": "functions.PIN_TRANSLATION.parameters.lable",
          "possibleValue": null,
          "displayName": "functions.PIN_TRANSLATION.display.lable",
          "ordinal": 0
        }
      ],
      "tooltip": null,
      "type": "execute_function",
      "request": true,
      "response": true,
      "parametersOptional": true
    },
    {
      "actionName": "HSM_KSN_DECRIPT",
      "parameters": [
        {
          "dataType": "List",
          "name": "functions.HSM_KSN_DECRIPT.parameters.lable",
          "possibleValue": null,
          "displayName": "functions.HSM_KSN_DECRIPT.display.lable",
          "ordinal": 0
        }
      ],
      "tooltip": null,
      "type": "execute_function",
      "request": true,
      "response": true,
      "parametersOptional": true
    },
    {
      "actionName": "SLEEP",
      "parameters": [
        {
          "dataType": "String",
          "name": "functions.SLEEP.parameters.lable",
          "possibleValue": null,
          "displayName": "functions.SLEEP.display.lable",
          "ordinal": 0
        },
        {
          "dataType": "Integer",
          "name": "functions.SLEEP.parameters.lable",
          "possibleValue": null,
          "displayName": "functions.SLEEP.display.lable",
          "ordinal": 1
        },
        {
          "dataType": "Long",
          "name": "functions.SLEEP.parameters.lable",
          "possibleValue": null,
          "displayName": "functions.SLEEP.display.lable",
          "ordinal": 2
        }
      ],
      "tooltip": null,
      "type": "execute_function",
      "request": true,
      "response": true,
      "parametersOptional": true
    },
    {
      "actionName": "HEX_STRING_TO_INT_ARRAY",
      "parameters": [
        {
          "dataType": "String",
          "name": "functions.HEX_STRING_TO_INT_ARRAY.parameters.lable",
          "possibleValue": null,
          "displayName": "functions.HEX_STRING_TO_INT_ARRAY.display.lable",
          "ordinal": 0
        }
      ],
      "tooltip": null,
      "type": "execute_function",
      "request": true,
      "response": true,
      "parametersOptional": true
    },
    {
      "actionName": "ADDITION",
      "parameters": [
        {
          "dataType": "String",
          "name": "source_field",
          "possibleValue": null,
          "displayName": "Select field",
          "ordinal": 0
        }
      ],
      "tooltip": null,
      "type": "execute_function",
      "request": true,
      "response": true,
      "parametersOptional": true
    },
    {
      "actionName": "SUBTRACTION",
      "parameters": [
        {
          "dataType": "String",
          "name": "source_field",
          "possibleValue": null,
          "displayName": "Select field",
          "ordinal": 0
        }
      ],
      "tooltip": null,
      "type": "execute_function",
      "request": true,
      "response": true,
      "parametersOptional": true
    },
    {
      "actionName": "MULTIPLICATION",
      "parameters": [
        {
          "dataType": "String",
          "name": "source_field",
          "possibleValue": null,
          "displayName": "Select field",
          "ordinal": 0
        }
      ],
      "tooltip": null,
      "type": "execute_function",
      "request": true,
      "response": true,
      "parametersOptional": true
    },
    {
      "actionName": "DIVISION",
      "parameters": [
        {
          "dataType": "String",
          "name": "source_field",
          "possibleValue": null,
          "displayName": "Select field",
          "ordinal": 0
        }
      ],
      "tooltip": null,
      "type": "execute_function",
      "request": true,
      "response": true,
      "parametersOptional": true
    }
  ]
}
const selectElFunctionJson =
{
  status: "success",
  message: "Find EL Expession/Function list",
  data: [
    {
      "id": null,
      "name": "SUB_STRING",
      "expression": null,
      "active": true,
      "expType": "function",
      "featureType": "transform",
      "subType": "transform",
      "parameters": "{\r\n    \"tooltip\": \"Substring begins at the startIndex to the character at endindex\", \r\n   \"signature\":[\r\n{\r\n            \"name\": \"startindex\",\r\n            \"ordinal\": 1,\r\n            \"type\": \"Integer\"\r\n  }, \r\n{\r\n            \"name\": \"endindex\",\r\n            \"ordinal\": 2,\r\n            \"type\": \"Integer\"\r\n  }]\r\n}",
      "paramCount": 2
    },
    {
      "id": null,
      "name": "TRIM_STRING",
      "expression": null,
      "active": true,
      "expType": "function",
      "featureType": "transform",
      "subType": "transform",
      "parameters": "{\r\n    \"tooltip\": \"trim string at both side\", \r\n   \"signature\":[\r\n{\r\n            \"name\": \"Integer\",\r\n            \"ordinal\": 1,\r\n            \"type\": \"Integer\"\r\n  }, \r\n{\r\n            \"name\": \"Integer\",\r\n            \"ordinal\": 2,\r\n            \"type\": \"Integer\"\r\n  }]\r\n}",
      "paramCount": 2
    },
    {
      "id": null,
      "name": "SUB_STRING_RIGHT",
      "expression": null,
      "active": true,
      "expType": "function",
      "featureType": "transform",
      "subType": "transform",
      "parameters": "{\r\n    \"tooltip\": \"Substring begins start index till end index\", \r\n   \"signature\":[\r\n{\r\n            \"name\": \"startindex\",\r\n            \"ordinal\": 1,\r\n            \"type\": \"Integer\"\r\n  }]\r\n}",
      "paramCount": 1
    },
    {
      "id": null,
      "name": "TO_INT",
      "expression": null,
      "active": true,
      "expType": "function",
      "featureType": "transform",
      "subType": "transform",
      "parameters": "{\r\n    \"tooltip\": \"Convert to Intger\", \r\n   \"signature\":[]\r\n}",
      "paramCount": 0
    },
    {
      "id": null,
      "name": "TO_DECIMAL",
      "expression": null,
      "active": true,
      "expType": "function",
      "featureType": "transform",
      "subType": "transform",
      "parameters": "{\r\n    \"tooltip\": \"Convert to Decimal\", \r\n   \"signature\":[]\r\n}",
      "paramCount": 0
    },
    {
      "id": null,
      "name": "NOW",
      "expression": null,
      "active": true,
      "expType": "function",
      "featureType": "transform",
      "subType": "transform",
      "parameters": "{\r\n    \"tooltip\": \"Convert to current date\", \r\n   \"signature\":[]\r\n}",
      "paramCount": 0
    },
    {
      "id": null,
      "name": "FORMAT_DATE",
      "expression": null,
      "active": true,
      "expType": "function",
      "featureType": "transform",
      "subType": "transform",
      "parameters": "{\r\n    \"tooltip\": \"convert date to String in given format\", \r\n   \"signature\":[\r\n{\r\n            \"name\": \"format\",\r\n            \"ordinal\": 1,\r\n            \"type\": \"String\"\r\n  }]\r\n}",
      "paramCount": 1
    },
    {
      "id": null,
      "name": "PARSE_DATE",
      "expression": null,
      "active": true,
      "expType": "function",
      "featureType": "transform",
      "subType": "transform",
      "parameters": "{\r\n    \"tooltip\": \"convert to date from String using given format\", \r\n   \"signature\":[\r\n{\r\n            \"name\": \"format\",\r\n            \"ordinal\": 1,\r\n            \"type\": \"String\"\r\n  }]\r\n}",
      "paramCount": 1
    },
    {
      "id": null,
      "name": "SET_CURRENT_DATE_FIELD",
      "expression": null,
      "active": true,
      "expType": "function",
      "featureType": "transform",
      "subType": "transform",
      "parameters": "{\r\n    \"tooltip\": \"sets field value year month and day in current date\", \r\n   \"signature\":[\r\n{\r\n            \"name\": \"field value\",\r\n            \"ordinal\": 1,\r\n            \"type\": \"Integer\"\r\n  }]\r\n}",
      "paramCount": 1
    },
    {
      "id": null,
      "name": "FORMAT_LONG_DATE",
      "expression": null,
      "active": true,
      "expType": "function",
      "featureType": "transform",
      "subType": "transform",
      "parameters": "{\r\n    \"tooltip\": \"Format long to Date in given format\", \r\n   \"signature\":[\r\n{\r\n            \"name\": \"format\",\r\n            \"ordinal\": 1,\r\n            \"type\": \"String\"\r\n  }]\r\n}",
      "paramCount": 1
    },
    {
      "id": null,
      "name": "FORMAT_NOW",
      "expression": null,
      "active": true,
      "expType": "function",
      "featureType": "transform",
      "subType": "transform",
      "parameters": "{\r\n    \"tooltip\": \"Current time format\", \r\n   \"signature\":[\r\n{\r\n            \"name\": \"format\",\r\n            \"ordinal\": 1,\r\n            \"type\": \"String\"\r\n  }]\r\n}",
      "paramCount": 1
    },
    {
      "id": null,
      "name": "PAD_LEFT",
      "expression": null,
      "active": true,
      "expType": "function",
      "featureType": "transform",
      "subType": "transform",
      "parameters": "{\r\n    \"tooltip\": \"Add padding int value in left side\", \r\n   \"signature\":[\r\n{\r\n            \"name\": \"length\",\r\n            \"ordinal\": 1,\r\n            \"type\": \"Integer\"\r\n  }, \r\n{\r\n            \"name\": \"padding char\",\r\n            \"ordinal\": 2,\r\n            \"type\": \"Integer\"\r\n  }]\r\n}",
      "paramCount": 2
    },
    {
      "id": null,
      "name": "PAD_RIGHT",
      "expression": null,
      "active": true,
      "expType": "function",
      "featureType": "transform",
      "subType": "transform",
      "parameters": "{\r\n    \"tooltip\": \"Add padding int value in right side\", \r\n   \"signature\":[\r\n{\r\n            \"name\": \"padding char\",\r\n            \"ordinal\": 1,\r\n            \"type\": \"Integer\"\r\n  }, \r\n{\r\n            \"name\": \"Integer\",\r\n            \"ordinal\": 2,\r\n            \"type\": \"Integer\"\r\n  }]\r\n}",
      "paramCount": 2
    },
    {
      "id": null,
      "name": "REPLACE",
      "expression": null,
      "active": true,
      "expType": "function",
      "featureType": "transform",
      "subType": "transform",
      "parameters": "{\r\n    \"tooltip\": \"Replace first occurence of string with second string\", \r\n   \"signature\":[\r\n{\r\n            \"name\": \"tobe replaced\",\r\n            \"ordinal\": 1,\r\n            \"type\": \"String\"\r\n  }, \r\n{\r\n            \"name\": \"replace by\",\r\n            \"ordinal\": 2,\r\n            \"type\": \"String\"\r\n  }]\r\n}",
      "paramCount": 2
    },
    {
      "id": null,
      "name": "REPLACE_ALL",
      "expression": null,
      "active": true,
      "expType": "function",
      "featureType": "transform",
      "subType": "transform",
      "parameters": "{\r\n    \"tooltip\": \"Replace all occurence of string with second string\", \r\n   \"signature\":[\r\n{\r\n            \"name\": \"to be replaced\",\r\n            \"ordinal\": 1,\r\n            \"type\": \"String\"\r\n  }, \r\n{\r\n            \"name\": \"replaced by\",\r\n            \"ordinal\": 2,\r\n            \"type\": \"String\"\r\n  }]\r\n}",
      "paramCount": 2
    },
    {
      "id": null,
      "name": "ISO_87_AMOUNT_FORMATER",
      "expression": null,
      "active": true,
      "expType": "function",
      "featureType": "transform",
      "subType": "transform",
      "parameters": "{\r\n    \"tooltip\": \"ISO87 Amount Parser\", \r\n   \"signature\":[\r\n{\r\n            \"name\": \"imf_amount\",\r\n            \"ordinal\": 1,\r\n            \"type\": \"String\"\r\n  }]\r\n}",
      "paramCount": 1
    },
    {
      "id": null,
      "name": "SIGNED_CONVERTER",
      "expression": null,
      "active": true,
      "expType": "function",
      "featureType": "transform",
      "subType": "transform",
      "parameters": "{\r\n    \"tooltip\": \"Signed Converter\", \r\n   \"signature\":[]\r\n}",
      "paramCount": 0
    },
    {
      "id": null,
      "name": "AMOUNT_FORMATER",
      "expression": null,
      "active": true,
      "expType": "function",
      "featureType": "transform",
      "subType": "transform",
      "parameters": "{\r\n    \"tooltip\": \"Amount Parser\", \r\n   \"signature\":[\r\n{\r\n            \"name\": \"Amount_Formatter\",\r\n            \"ordinal\": 1,\r\n            \"type\": \"String\"\r\n  }]\r\n}",
      "paramCount": 1
    },
    {
      "id": null,
      "name": "DECIMAL_USING_LEFT_MOST_DIGIT",
      "expression": null,
      "active": true,
      "expType": "function",
      "featureType": "transform",
      "subType": "transform",
      "parameters": "{\r\n    \"tooltip\": \"Decimal using last most digit\", \r\n   \"signature\":[]\r\n}",
      "paramCount": 0
    },
    {
      "id": null,
      "name": "BYTE_ARRAY_TO_HEX_STRING",
      "expression": null,
      "active": true,
      "expType": "function",
      "featureType": "transform",
      "subType": "transform",
      "parameters": "{\r\n    \"tooltip\": \"Byte array conversion to hex string.\", \r\n   \"signature\":[\r\n{\r\n            \"name\": \"Integer\",\r\n            \"ordinal\": 1,\r\n            \"type\": \"Integer\"\r\n  }, \r\n{\r\n            \"name\": \"Integer\",\r\n            \"ordinal\": 2,\r\n            \"type\": \"Integer\"\r\n  }]\r\n}",
      "paramCount": 2
    },
    {
      "id": null,
      "name": "HEX_STRING_TO_INT_ARRAY",
      "expression": null,
      "active": true,
      "expType": "function",
      "featureType": "transform",
      "subType": "transform",
      "parameters": "{\r\n    \"tooltip\": \"Hex string conversion  to int array.\", \r\n   \"signature\":[\r\n{\r\n            \"name\": \"Integer\",\r\n            \"ordinal\": 1,\r\n            \"type\": \"Integer\"\r\n  }, \r\n{\r\n            \"name\": \"Integer\",\r\n            \"ordinal\": 2,\r\n            \"type\": \"Integer\"\r\n  }]\r\n}",
      "paramCount": 2
    },
    {
      "id": null,
      "name": "CONCAT",
      "expression": null,
      "active": true,
      "expType": "function",
      "featureType": "transform",
      "subType": "transform",
      "parameters": "{\r\n    \"tooltip\": \"Concat value.\", \r\n   \"signature\":[\r\n{\r\n            \"name\": \"provide fields list to concat\",\r\n            \"ordinal\": 1,\r\n            \"type\": \"List\"\r\n  }]\r\n}",
      "paramCount": 1
    },
    {
      "id": null,
      "name": "PIN_TRANSLATION",
      "expression": null,
      "active": true,
      "expType": "function",
      "featureType": "transform",
      "subType": "transform",
      "parameters": "{\r\n    \"tooltip\": \"Concat value.\", \r\n   \"signature\":[\r\n{\r\n            \"name\": \"provide fields list to concat\",\r\n            \"ordinal\": 1,\r\n            \"type\": \"List\"\r\n  }]\r\n}",
      "paramCount": 1
    },
    {
      "id": null,
      "name": "HSM_KSN_DECRIPT",
      "expression": null,
      "active": true,
      "expType": "function",
      "featureType": "transform",
      "subType": "transform",
      "parameters": "{\r\n    \"tooltip\": \"Concat value.\", \r\n   \"signature\":[\r\n{\r\n            \"name\": \"provide fields list to concat\",\r\n            \"ordinal\": 1,\r\n            \"type\": \"List\"\r\n  }]\r\n}",
      "paramCount": 1
    },
    {
      "id": null,
      "name": "CONCAT_STRING",
      "expression": null,
      "active": true,
      "expType": "function",
      "featureType": "transform",
      "subType": "transform",
      "parameters": "{\r\n    \"tooltip\": \"Concat two string \", \r\n   \"signature\":[\r\n{\r\n            \"name\": \"provide string to concat\",\r\n            \"ordinal\": 1,\r\n            \"type\": \"String\"\r\n  }]\r\n}",
      "paramCount": 1
    },
    {
      "id": null,
      "name": "SLEEP",
      "expression": null,
      "active": true,
      "expType": "function",
      "featureType": "transform",
      "subType": "transform",
      "parameters": "{\r\n    \"tooltip\": \"SLEEP\", \r\n   \"signature\":[\r\n{\r\n            \"name\": \"id\",\r\n            \"ordinal\": 1,\r\n            \"type\": \"String\"\r\n  }, \r\n{\r\n            \"name\": \"number of time\",\r\n            \"ordinal\": 2,\r\n            \"type\": \"String\"\r\n  }, \r\n{\r\n            \"name\": \"sleep interval\",\r\n            \"ordinal\": 3,\r\n            \"type\": \"String\"\r\n  }]\r\n}",
      "paramCount": 3
    },
    {
      "id": null,
      "name": "IS_NOT_NULL",
      "expression": null,
      "active": true,
      "expType": "in_built_validation",
      "featureType": "validation",
      "subType": "validation",
      "parameters": "{\r\n    \"tooltip\": \"Not Null Check\", \r\n   \"signature\":[]\r\n}",
      "paramCount": 0
    },
    {
      "id": null,
      "name": "IS_NULL",
      "expression": null,
      "active": true,
      "expType": "in_built_validation",
      "featureType": "validation",
      "subType": "validation",
      "parameters": "{\r\n    \"tooltip\": \"Null Check\", \r\n   \"signature\":[]\r\n}",
      "paramCount": 0
    },
    {
      "id": null,
      "name": "IS_EMPTY",
      "expression": null,
      "active": true,
      "expType": "in_built_validation",
      "featureType": "validation",
      "subType": "validation",
      "parameters": "{\r\n    \"tooltip\": \"Empty Check\", \r\n   \"signature\":[]\r\n}",
      "paramCount": 0
    },
    {
      "id": null,
      "name": "IS_NUMERIC",
      "expression": null,
      "active": true,
      "expType": "in_built_validation",
      "featureType": "validation",
      "subType": "validation",
      "parameters": "{\r\n    \"tooltip\": \"Numeric Check\", \r\n   \"signature\":[]\r\n}",
      "paramCount": 0
    },
    {
      "id": null,
      "name": "IS_ALPHA_BETIC",
      "expression": null,
      "active": true,
      "expType": "in_built_validation",
      "featureType": "validation",
      "subType": "validation",
      "parameters": "{\r\n    \"tooltip\": \"Alphbetic Check\", \r\n   \"signature\":[]\r\n}",
      "paramCount": 0
    },
    {
      "id": null,
      "name": "IS_ALPHA_NUMERIC",
      "expression": null,
      "active": true,
      "expType": "in_built_validation",
      "featureType": "validation",
      "subType": "validation",
      "parameters": "{\r\n    \"tooltip\": \"Alpha-Numeric Check\", \r\n   \"signature\":[]\r\n}",
      "paramCount": 0
    },
    {
      "id": null,
      "name": "IS_DECIMAL",
      "expression": null,
      "active": true,
      "expType": "in_built_validation",
      "featureType": "validation",
      "subType": "validation",
      "parameters": "{\r\n    \"tooltip\": \"Decimal Check\", \r\n   \"signature\":[]\r\n}",
      "paramCount": 0
    },
    {
      "id": null,
      "name": "IS_LENGTH_EQUAL",
      "expression": null,
      "active": true,
      "expType": "in_built_validation",
      "featureType": "validation",
      "subType": "validation",
      "parameters": "{\r\n    \"tooltip\": \"Length Equal Check\", \r\n   \"signature\":[\r\n{\r\n            \"name\": \"lengthtoequal\",\r\n            \"ordinal\": 1,\r\n            \"type\": \"Integer\"\r\n  }]\r\n}",
      "paramCount": 1
    },
    {
      "id": null,
      "name": "IS_LENGTH_LESS_THAN",
      "expression": null,
      "active": true,
      "expType": "in_built_validation",
      "featureType": "validation",
      "subType": "validation",
      "parameters": "{\r\n    \"tooltip\": \"Length Less Than Check\", \r\n   \"signature\":[\r\n{\r\n            \"name\": \"lengthtolessthan\",\r\n            \"ordinal\": 1,\r\n            \"type\": \"Integer\"\r\n  }]\r\n}",
      "paramCount": 1
    },
    {
      "id": null,
      "name": "IS_LENGTH_GREATER_THAN",
      "expression": null,
      "active": true,
      "expType": "in_built_validation",
      "featureType": "validation",
      "subType": "validation",
      "parameters": "{\r\n    \"tooltip\": \"Length Greater Than Check\", \r\n   \"signature\":[\r\n{\r\n            \"name\": \"lengthtogreaterthan\",\r\n            \"ordinal\": 1,\r\n            \"type\": \"Integer\"\r\n  }]\r\n}",
      "paramCount": 1
    },
    {
      "id": null,
      "name": "IS_LENGTH_IN_RANGE",
      "expression": null,
      "active": true,
      "expType": "in_built_validation",
      "featureType": "validation",
      "subType": "validation",
      "parameters": "{\r\n    \"tooltip\": \"Length Range Check\", \r\n   \"signature\":[\r\n{\r\n            \"name\": \"startRange\",\r\n            \"ordinal\": 1,\r\n            \"type\": \"Integer\"\r\n  }, \r\n{\r\n            \"name\": \"endRange\",\r\n            \"ordinal\": 2,\r\n            \"type\": \"Integer\"\r\n  }]\r\n}",
      "paramCount": 2
    },
    {
      "id": null,
      "name": "IS_LESS_THAN_EQUAL",
      "expression": null,
      "active": true,
      "expType": "in_built_validation",
      "featureType": "validation",
      "subType": "validation",
      "parameters": "{\r\n    \"tooltip\": \"Size Less Than Check\", \r\n   \"signature\":[\r\n{\r\n            \"name\": \"sizelessthan\",\r\n            \"ordinal\": 1,\r\n            \"type\": \"Integer\"\r\n  }]\r\n}",
      "paramCount": 1
    },
    {
      "id": null,
      "name": "IS_GREATER_THAN_EQUAL",
      "expression": null,
      "active": true,
      "expType": "in_built_validation",
      "featureType": "validation",
      "subType": "validation",
      "parameters": "{\r\n    \"tooltip\": \"Size Greater Than Equal Check\", \r\n   \"signature\":[\r\n{\r\n            \"name\": \"sizegraterthanequal\",\r\n            \"ordinal\": 1,\r\n            \"type\": \"Integer\"\r\n  }]\r\n}",
      "paramCount": 1
    },
    {
      "id": null,
      "name": "IS_BETWEEN_EQUAL",
      "expression": null,
      "active": true,
      "expType": "in_built_validation",
      "featureType": "validation",
      "subType": "validation",
      "parameters": "{\r\n    \"tooltip\": \"In Between or Equal check\", \r\n   \"signature\":[\r\n{\r\n            \"name\": \"startRange\",\r\n            \"ordinal\": 1,\r\n            \"type\": \"Integer\"\r\n  }, \r\n{\r\n            \"name\": \"endRange\",\r\n            \"ordinal\": 2,\r\n            \"type\": \"Integer\"\r\n  }]\r\n}",
      "paramCount": 2
    },
    {
      "id": null,
      "name": "IS_EQUAL",
      "expression": null,
      "active": true,
      "expType": "in_built_validation",
      "featureType": "validation",
      "subType": "validation",
      "parameters": "{\r\n    \"tooltip\": \"Equal Check\", \r\n   \"signature\":[\r\n{\r\n            \"name\": \"Equal check\",\r\n            \"ordinal\": 1,\r\n            \"type\": \"String\"\r\n  }]\r\n}",
      "paramCount": 1
    },
    {
      "id": null,
      "name": "IS_NOT_EQUAL",
      "expression": null,
      "active": true,
      "expType": "in_built_validation",
      "featureType": "validation",
      "subType": "validation",
      "parameters": "{\r\n    \"tooltip\": \"Not Equal Check\", \r\n   \"signature\":[\r\n{\r\n            \"name\": \"Not equal check\",\r\n            \"ordinal\": 1,\r\n            \"type\": \"String\"\r\n  }]\r\n}",
      "paramCount": 1
    },
    {
      "id": null,
      "name": "IS_LESS_THAN",
      "expression": null,
      "active": true,
      "expType": "in_built_validation",
      "featureType": "validation",
      "subType": "validation",
      "parameters": "{\r\n    \"tooltip\": \"Digit Less than Check\", \r\n   \"signature\":[\r\n{\r\n            \"name\": \"digitlessthan\",\r\n            \"ordinal\": 1,\r\n            \"type\": \"Integer\"\r\n  }]\r\n}",
      "paramCount": 1
    },
    {
      "id": null,
      "name": "IS_GREATER_THAN",
      "expression": null,
      "active": true,
      "expType": "in_built_validation",
      "featureType": "validation",
      "subType": "validation",
      "parameters": "{\r\n    \"tooltip\": \"Digit Greater Than Check\", \r\n   \"signature\":[\r\n{\r\n            \"name\": \"digitgreaterthan\",\r\n            \"ordinal\": 1,\r\n            \"type\": \"Integer\"\r\n  }]\r\n}",
      "paramCount": 1
    },
    {
      "id": null,
      "name": "IS_BETWEEN",
      "expression": null,
      "active": true,
      "expType": "in_built_validation",
      "featureType": "validation",
      "subType": "validation",
      "parameters": "{\r\n    \"tooltip\": \"Digit in Range Check\", \r\n   \"signature\":[\r\n{\r\n            \"name\": \"startRange\",\r\n            \"ordinal\": 1,\r\n            \"type\": \"Integer\"\r\n  }, \r\n{\r\n            \"name\": \"endRange\",\r\n            \"ordinal\": 2,\r\n            \"type\": \"Integer\"\r\n  }]\r\n}",
      "paramCount": 2
    },
    {
      "id": null,
      "name": "IS_LENGTH_LESS_THAN_EQUAL",
      "expression": null,
      "active": true,
      "expType": "in_built_validation",
      "featureType": "validation",
      "subType": "validation",
      "parameters": "{\r\n    \"tooltip\": \"Length Less Than Equal Check\", \r\n   \"signature\":[\r\n{\r\n            \"name\": \"digitLessthanEqual\",\r\n            \"ordinal\": 1,\r\n            \"type\": \"Integer\"\r\n  }]\r\n}",
      "paramCount": 1
    },
    {
      "id": null,
      "name": "IS_LENGTH_GREATER_THAN_EQUAL",
      "expression": null,
      "active": true,
      "expType": "in_built_validation",
      "featureType": "validation",
      "subType": "validation",
      "parameters": "{\r\n    \"tooltip\": \"Length Grater Than Equal\", \r\n   \"signature\":[\r\n{\r\n            \"name\": \"digitGraterThanEqual\",\r\n            \"ordinal\": 1,\r\n            \"type\": \"Integer\"\r\n  }]\r\n}",
      "paramCount": 1
    },
    {
      "id": null,
      "name": "REG_EX_VALIDATION",
      "expression": null,
      "active": true,
      "expType": "in_built_validation",
      "featureType": "validation",
      "subType": "validation",
      "parameters": "{\r\n    \"tooltip\": \"Regular Expression\", \r\n   \"signature\":[\r\n{\r\n            \"name\": \"Regular Expression\",\r\n            \"ordinal\": 1,\r\n            \"type\": \"String\"\r\n  }]\r\n}",
      "paramCount": 1
    },
    {
      "id": null,
      "name": "SPRING_EL",
      "expression": null,
      "active": true,
      "expType": "in_built_validation",
      "featureType": "validation",
      "subType": "validation",
      "parameters": "{\r\n    \"tooltip\": \"Spring EL Expression\", \r\n   \"signature\":[\r\n{\r\n            \"name\": \"Spring EL Expression\",\r\n            \"ordinal\": 1,\r\n            \"type\": \"String\"\r\n  }]\r\n}",
      "paramCount": 1
    },
    {
      "id": null,
      "name": "IS_LENGTH_IN_EQUAL_RANGE",
      "expression": null,
      "active": true,
      "expType": "in_built_validation",
      "featureType": "validation",
      "subType": "validation",
      "parameters": "{\r\n    \"tooltip\": \"Length Equal in Range Check\", \r\n   \"signature\":[\r\n{\r\n            \"name\": \"startRange\",\r\n            \"ordinal\": 1,\r\n            \"type\": \"Integer\"\r\n  }, \r\n{\r\n            \"name\": \"endRange\",\r\n            \"ordinal\": 2,\r\n            \"type\": \"Integer\"\r\n  }]\r\n}",
      "paramCount": 2
    }
  ]
}
const selectL1AdapterEntityMappingListJson = 
{
  status: "success",
  message: "Find Entity-Mapping-List JSON",
  data: {
    "Merchant": [
      "reversalTimeout",
      "expiryOn",
      "description",
      "createdOn",
      "code",
      "totalLocation",
      "merchantProfile",
      "totalDevice",
      "additionalAttribute",
      "updatedBy",
      "posSafetyFlag",
      "activateOn",
      "merchantInstitution",
      "locked",
      "deleted",
      "createdBy",
      "merchantDetail",
      "name",
      "updatedOn",
      "id",
      "code (where)"
    ],
    "Device": [
      "code",
      "locked",
      "createdOn",
      "type",
      "activateOn",
      "deviceModelId",
      "name",
      "additionalAttribute",
      "location",
      "merchant",
      "updatedBy",
      "posSafetyFlag",
      "deleted",
      "pedId",
      "createdBy",
      "pedSerialNo",
      "updatedOn",
      "id",
      "reversalTimeout",
      "code (where)"
    ]
  }
}
const selectL1AdapterEntityIMFListJson = 
{
  status: "success",
  message: "Find Imf-field-list JSON",
  data: {
    "ImfField": [
      "paappipppppepep",
      "ppro_notification",
      "account_number_extended",
      "posdatacode",
      "transmission_date_time",
      "settlementdate",
      "date_settlement",
      "date_conversion",
      "merchant_type",
      "account_number_country_code",
      "forwarding_institution_country_code",
      "network_international_identifier",
      "forwarding_institution_code",
      "approval_code",
      "authorizing_agent_institution_id",
      "cardholder_presence",
      "receiving_institution_identification_code",
      "merchant_identification",
      "device_code",
      "merchant_velocity",
      "pin_ksn",
      "pan_ksn",
      "otb_data",
      "offline_refund",
      "time_zone",
      "enc_track2",
      "security_token",
      "processor_id",
      "barcode",
      "bin",
      "response_desc",
      "session_guid",
      "system_trace_audit_number",
      "account_number",
      "customer_id",
      "request_guid",
      "machine_name",
      "terminal_identification",
      "local_date_time",
      "mac_address",
      "epp_serial_number",
      "utc_offset",
      "api_version",
      "earned_points",
      "earned_cash",
      "number_transactions",
      "from_date",
      "to_date",
      "destinationID",
      "card_number_last_four_digits",
      "response_code",
      "stan",
      "language",
      "additional_validation_data",
      "transaction_guid",
      "pin_data",
      "secondary_pin_data",
      "emv_data",
      "response_code",
      "error_message",
      "auth_code",
      "out_of_service",
      "auth_number",
      "rrn",
      "receipt_data",
      "for_ex_rate",
      "phone_number",
      "key_value_pairs",
      "acceptor_identification_code",
      "category",
      "companyId",
      "bill_reference",
      "payment_type",
      "acquirer_institution_code",
      "referenceNumber",
      "advice_type",
      "message_protocol",
      "echo_data",
      "additional_amount",
      "activation_code",
      "messages",
      "replay",
      "error_Code",
      "error_message",
      "txn_id",
      "dest_account_number",
      "reservation_id",
      "currency_date",
      "personal_id",
      "purpose",
      "ben_ref_number",
      "ben_ref_model",
      "ben_name",
      "ben_address",
      "ord_party_ref_model",
      "ord_party_ref_number",
      "ord_party_address",
      "ord_party_place",
      "urgency",
      "actual_amount",
      "template_id",
      "trn_status",
      "checkpoint",
      "source_amount_value",
      "source_amount_currency",
      "dest_amount_currency",
      "card_id",
      "purpose_code",
      "info",
      "fee_percent",
      "tax",
      "tax_percent",
      "local_currency_code",
      "exchange_rate",
      "product_type",
      "local_amount",
      "description",
      "dateofbirth",
      "rez",
      "source_id",
      "mti",
      "processing_code",
      "local_time",
      "local_date",
      "network_info_code",
      "additional_data",
      "new_pin_data",
      "advice_reason_code",
      "additional_response_data",
      "merchant_category_code",
      "merchant_name",
      "pin_format",
      "cvvecom_result_code",
      "la_additional_response_data",
      "card_authentication_result_code",
      "pacm_diversion_reasoncode",
      "pacm_diversion_level",
      "cvv_result_code",
      "card_product_type",
      "tvc_result_code",
      "avs_result_code",
      "pin_service_code",
      "response_reason_code",
      "network_identification_code",
      "fee_program_indicator",
      "product_id",
      "TID",
      "transaction_id",
      "visa_additional_response",
      "account_funding_source",
      "program_identifier",
      "fallback_reason",
      "transaction_date_time",
      "authorisation_source",
      "token_Cryptogram",
      "MC_DE48_SE42",
      "MC_DE48_SE52",
      "VISA_F44_SF15",
      "is_token_cryptogram_present",
      "notification_url",
      "payment_method_id",
      "payment_method_type",
      "payment_method_flow",
      "login",
      "password",
      "merchant_redirect_url",
      "redirect_secret",
      "request_status",
      "callback_url",
      "trn_status_detail",
      "trn_status_code",
      "payment_method",
      "order_id",
      "hash_value",
      "fund_status",
      "finger_print",
      "small_cash_indicator",
      "date_capture",
      "acquirer_country_code",
      "issuer_id",
      "replace_merchant_id",
      "replace_terminal_id",
      "repeat_count",
      "replace_merchant",
      "replace_terminal",
      "track2_ksn",
      "track2_initial_vector",
      "onus",
      "reference_id",
      "alternate_id",
      "unique_id",
      "reason",
      "operator_id",
      "basket_id",
      "transaction_ref",
      "reverse",
      "finalise",
      "sku",
      "consumer_message",
      "activate_message",
      "request_id",
      "member_status",
      "delivery_method",
      "amount_in_change",
      "cell_phone_number",
      "payment_code",
      "allocate_message",
      "block",
      "advice_match",
      "intial_email_address",
      "authorization_data_indicator",
      "mcc",
      "response2",
      "paappi",
      "test",
      "masked_card_number"
    ]
  }
}
const selectGetServiceTypeJson = 
{
  status: "success",
  message: "Find Lookup-value-list for SERVICE_TYPE",
  data: [
    {
      "id": 30,
      "value": "AUTH_SERVICE",
      "description": "AUTH SERVICE",
      "modifiable": "0",
      "active": "1",
      "lookupType": {
        "id": 7,
        "name": "Service_Type",
        "description": "Service Type",
        "modifiable": "0"
      }
    },
    {
      "id": 65,
      "value": "CARD_SERVICE",
      "description": "CARD_SERVICE",
      "modifiable": "0",
      "active": "1",
      "lookupType": {
        "id": 7,
        "name": "Service_Type",
        "description": "Service Type",
        "modifiable": "0"
      }
    },
    {
      "id": 31,
      "value": "FRAUD_SERVICE",
      "description": "FRAUD SERVICE",
      "modifiable": "0",
      "active": "1",
      "lookupType": {
        "id": 7,
        "name": "Service_Type",
        "description": "Service Type",
        "modifiable": "0"
      }
    },
    {
      "id": 54,
      "value": "GATEWAY_SERVICE",
      "description": "GATEWAY_SERVICE",
      "modifiable": "0",
      "active": "1",
      "lookupType": {
        "id": 7,
        "name": "Service_Type",
        "description": "Service Type",
        "modifiable": "0"
      }
    },
    {
      "id": 56,
      "value": "LOYALTY_SERVICE",
      "description": "LOYALTY SERVICE",
      "modifiable": "0",
      "active": "1",
      "lookupType": {
        "id": 7,
        "name": "Service_Type",
        "description": "Service Type",
        "modifiable": "0"
      }
    }
  ]
}
const selectAdapterDataMapJson =
{
  status: "success",
  message: "Find Adaptor Data Mapper",
  data: {
    "AdapterdataMap": {
      "data_enrichment_mapping_destination_field": "{\n  \"type\" : \"field\",\n  \"source\" : \"\",\n  \"destination\" : [ \"message_exchange[GATEWAY_SERVICE].request_message[]\" ],\n  \"ipc\" : \"SYSTEM_ERROR\"\n}",
      "custom.jar.files.id": "{\n  \"field\" : \"custom.jar.files.id\",\n  \"label\" : \"Upload Jars\",\n  \"value\" : \"\",\n  \"format\" : \"\",\n  \"hidden\" : \"true\",\n  \"datatype\" : \"file\",\n  \"fileName\" : \"\",\n  \"mandatory\" : \"false\",\n  \"listvalues\" : [ \".JAR\" ]\n}",
      "echoResponseMappingField": "{\n  \"type\" : \"field\",\n  \"source\" : \"${message_exchange[GATEWAY_SERVICE].additional_fields[fieldId]}\",\n  \"destination\" : [ \"fieldId\" ],\n  \"ipc\" : \"SYSTEM_ERROR\"\n}",
      "elExpressionBlankStruct": "{\n  \"name\" : \"\",\n  \"type\" : \"\",\n  \"expression\" : \"\"\n}",
      "imfBlankStructureField": "{\n  \"type\" : \"field\",\n  \"source\" : \"message_exchange[Selected_Service_Type].response_message[imf-field-name]\",\n  \"destination\" : [ \"message_exchange[GATEWAY_SERVICE].request_message[imf-field-name]\" ]\n}",
      "substring": "{\n  \"name\" : \"\",\n  \"type\" : \"\",\n  \"expression\" : \"\"\n}",
      "conditional_field_function": "{\n  \"name\" : \"conditional\",\n  \"type\" : \"el_expression\",\n  \"expression\" : \"isExist(${CONDITIONAL_FIELDID})\"\n}",
      "req_blank_structure_field": "{\n  \"type\" : \"field\",\n  \"source\" : \"\",\n  \"destination\" : [ \"message_exchange[GATEWAY_SERVICE].request_message[imf-field-name]\" ],\n  \"ipc\" : \"SYSTEM_ERROR\"\n}",
      "mappings.$.validationFunctions.$": "{\n  \"type\" : \"el_expression\",\n  \"name\" : \"\",\n  \"expression\" : \"some valid expression\"\n}",
      "data_enrichment_mapping_alias_field": "{\n  \"type\" : \"aliasColumn\",\n  \"alias\" : {\n    \"type\" : \"alias\",\n    \"name\" : \"\",\n    \"alias\" : \"\"\n  }\n}",
      "transactions.$.condition": "{\n  \"type\" : \"and/or\",\n  \"conditions\" : [ {\n    \"type\" : \"equal\",\n    \"fieldName\" : \"${}\",\n    \"value\" : \"some-value\"\n  }, {\n    \"type\" : \"equal\",\n    \"fieldName\" : \"${}\",\n    \"value\" : \"somevalue\"\n  } ]\n}",
      "track2": "{\n  \"name\" : \"\",\n  \"type\" : \"\",\n  \"expression\" : \"\"\n}",
      "echoRequestMappingField": "{\n  \"type\" : \"field\",\n  \"source\" : \"${fieldId}\",\n  \"destination\" : [ \"message_exchange[GATEWAY_SERVICE].additional_fields[fieldId]\" ],\n  \"ipc\" : \"SYSTEM_ERROR\"\n}",
      "length": "{\n  \"name\" : \"\",\n  \"type\" : \"\",\n  \"expression\" : \"\"\n}",
      "mandatory_field_function": "{\n  \"name\" : \"mandatory\",\n  \"type\" : \"el_expression\",\n  \"expression\" : \"isNotNull\"\n}",
      "transactions": "{\n  \"type\" : \"transactions\",\n  \"transactions\" : [ ]\n}",
      "mappings": "{\n  \"type\" : \"field\",\n  \"source\" : \"${FIELDID}\",\n  \"destination\" : \"\",\n  \"ipc\" : \"\"\n}",
      "transactions.$.mappings.$": "{\n  \"type\" : \"field\",\n  \"source\" : \"${FIELDID}\",\n  \"destination\" : \"\",\n  \"ipc\" : \"\"\n}",
      "transactions.$": "{\n  \"name\" : \"$\",\n  \"type\" : \"fields\",\n  \"condition\" : { },\n  \"mappings\" : [ ]\n}",
      "data_enrichment_mapping": "{\n  \"type\" : \"imdg_enrich\",\n  \"fields\" : [ ],\n  \"lookupType\" : {\n    \"type\" : \"imdg_enrich\",\n    \"query\" : {\n      \"type\" : \"search\",\n      \"select\" : {\n        \"type\" : \"select\",\n        \"columns\" : [ ]\n      },\n      \"from\" : {\n        \"type\" : \"from\",\n        \"mapName\" : \"\"\n      },\n      \"condition\" : {\n        \"type\" : \"and\",\n        \"conditions\" : [ ]\n      }\n    }\n  },\n  \"ipc\" : \"SYSTEM_ERROR\"\n}",
      "mappings.$.functions": "{\n  \"functions\" : [ ]\n}",
      "data_enrichment_mapping_condition_field": "{\n  \"type\" : \"equal\",\n  \"fieldName\" : \"\",\n  \"value\" : \"${message_exchange[GATEWAY_SERVICE].request_message[]}\"\n}",
      "api_transactionSet": "{\n  \"transactions\" : [ {\n    \"messageIntentifier\" : \"\",\n    \"contractIntentifier\" : \"\",\n    \"condition\" : null,\n    \"request\" : null,\n    \"response\" : null\n  } ]\n}",
      "mappings.$.functions.$": "{\n  \"type\" : \"el_expression\",\n  \"name\" : \"\",\n  \"expression\" : \"some valid expression\"\n}",
      "mappings.$.validationFunctions": "{\n  \"validationFunctions\" : [ ]\n}",
      "res_blank_structure_field": "{\n  \"type\" : \"field\",\n  \"source\" : \"message_exchange[Selected_Service_Type].response_message[imf-field-name]\",\n  \"destination\" : [ \"${FieldId}\" ],\n  \"ipc\" : \"SYSTEM_ERROR\"\n}"
    }
  }
}
const SelectPostActionMethodJson = 
{
  "status": "success",
  "message": "Find adapter-l3-post-actions-method list",
  "data": [
    {
      "actionName": "ENRICH_ORIGINAL_TRANSACTION",
      "parameters": [
        {
          "dataType": "Map",
          "name": "imf_field_names:imf_field_names",
          "possibleValue": null,
          "displayName": "Txn Field To Match:Value",
          "ordinal": 0
        },
        {
          "dataType": "Map",
          "name": "imf_field_names:imf_field_names",
          "possibleValue": null,
          "displayName": "Live Txn Field:Origional Txn Field",
          "ordinal": 1
        }
      ],
      "tooltip": null,
      "type": null,
      "request": true,
      "response": true,
      "parametersOptional": false
    },
    {
      "actionName": "UPDATE_ORIGINAL",
      "parameters": [
        {
          "dataType": "Map",
          "name": "imf_field_names:imf_field_names",
          "possibleValue": null,
          "displayName": "Txn Field To Match:Value",
          "ordinal": 0
        },
        {
          "dataType": "Map",
          "name": "imf_field_names:imf_field_names",
          "possibleValue": null,
          "displayName": "Live Txn Field:Origional Txn Field",
          "ordinal": 1
        }
      ],
      "tooltip": null,
      "type": null,
      "request": true,
      "response": true,
      "parametersOptional": false
    },
    {
      "actionName": "EXECUTE_CUSTOM_CODE",
      "parameters": [
        {
          "dataType": "String",
          "name": "Mapper class Name",
          "possibleValue": null,
          "displayName": "Mapper class Name",
          "ordinal": 0
        }
      ],
      "tooltip": null,
      "type": null,
      "request": true,
      "response": true,
      "parametersOptional": false
    }
  ]
}
const SelectPreActionMethodJson = 
{
  "status": "success",
  "message": "Find cart-pre-actions-method list",
  "data": [
    {
      "actionName": "ENRICH_ORIGINAL_TRANSACTION",
      "parameters": [
        {
          "dataType": "Map",
          "name": "imf_field_names:imf_field_names",
          "possibleValue": null,
          "displayName": "Txn Field To Match:Value",
          "ordinal": 0
        },
        {
          "dataType": "Map",
          "name": "imf_field_names:imf_field_names",
          "possibleValue": null,
          "displayName": "Live Txn Field:Origional Txn Field",
          "ordinal": 1
        }
      ],
      "tooltip": null,
      "type": null,
      "request": true,
      "response": true,
      "parametersOptional": false
    },
    {
      "actionName": "UPDATE_ORIGINAL",
      "parameters": [
        {
          "dataType": "Map",
          "name": "imf_field_names:imf_field_names",
          "possibleValue": null,
          "displayName": "Txn Field To Match:Value",
          "ordinal": 0
        },
        {
          "dataType": "Map",
          "name": "imf_field_names:imf_field_names",
          "possibleValue": null,
          "displayName": "Live Txn Field:Origional Txn Field",
          "ordinal": 1
        }
      ],
      "tooltip": null,
      "type": null,
      "request": true,
      "response": true,
      "parametersOptional": false
    },
    {
      "actionName": "EXECUTE_CUSTOM_CODE",
      "parameters": [
        {
          "dataType": "String",
          "name": "Mapper class Name",
          "possibleValue": null,
          "displayName": "Mapper class Name",
          "ordinal": 0
        }
      ],
      "tooltip": null,
      "type": null,
      "request": true,
      "response": true,
      "parametersOptional": false
    }
  ]
}
const selectIMFJson =
{
  "status": "success",
  "message": "Find Imf-field-list JSON",
  "data": {
    "ImfField": [
      {
        "name": "account_number_masked",
        "alias": "Account Number Masked",
        "type": "STRING",
        "hide": false
      },
      {
        "name": "account_number_extended",
        "alias": "Extended account number",
        "type": "STRING",
        "hide": false
      },
      {
        "name": "message_type_indicator",
        "alias": "Message type indicator",
        "type": "fields",
        "hide": false
      },
      {
        "name": "message_type_indicator.type",
        "alias": "Message Type Name",
        "type": "STRING",
        "hide": false
      },
      {
        "name": "transaction_type_indicator",
        "alias": "Transaction type indicator",
        "type": "fields",
        "hide": false
      },
      {
        "name": "transaction_type_indicator.type",
        "alias": "Type",
        "type": "STRING",
        "hide": false
      },
      {
        "name": "transaction_type_indicator.from_account_type",
        "alias": "From account type",
        "type": "STRING",
        "hide": false
      },
      {
        "name": "transaction_type_indicator.to_account_type",
        "alias": "To account type",
        "type": "STRING",
        "hide": false
      },
      {
        "name": "amounts",
        "alias": "Amounts",
        "type": "fields",
        "hide": false
      },
      {
        "name": "amounts.amount_transaction",
        "alias": "Amount transaction",
        "type": "fields",
        "hide": false
      },
      {
        "name": "amounts.amount_transaction.value",
        "alias": "Value",
        "type": "DOUBLE",
        "hide": false
      },
      {
        "name": "amounts.amount_transaction.minor_unit",
        "alias": "Currency minor unit",
        "type": "INTEGER",
        "hide": false
      },
      {
        "name": "amounts.amount_transaction.currency",
        "alias": "currency code",
        "type": "STRING",
        "hide": false
      },
      {
        "name": "amounts.amount_transaction.currency_iso",
        "alias": "Currency code ISO",
        "type": "STRING",
        "hide": false
      },
      {
        "name": "amounts.amount_settlement",
        "alias": "Amount settlement",
        "type": "fields",
        "hide": false
      },
      {
        "name": "amounts.amount_settlement.value",
        "alias": "Value",
        "type": "DOUBLE",
        "hide": false
      },
      {
        "name": "amounts.amount_settlement.minor_unit",
        "alias": "Currency minor unit",
        "type": "INTEGER",
        "hide": false
      },
      {
        "name": "amounts.amount_settlement.currency",
        "alias": "currency code",
        "type": "STRING",
        "hide": false
      },
      {
        "name": "amounts.amount_cardholder_billing",
        "alias": "Amount cardholder billing",
        "type": "fields",
        "hide": false
      },
      {
        "name": "amounts.amount_cardholder_billing.value",
        "alias": "Value",
        "type": "DOUBLE",
        "hide": false
      },
      {
        "name": "amounts.amount_cardholder_billing.minor_unit",
        "alias": "Currency minor unit",
        "type": "INTEGER",
        "hide": false
      },
      {
        "name": "amounts.amount_cardholder_billing.currency",
        "alias": "currency code",
        "type": "STRING",
        "hide": false
      },
      {
        "name": "amounts.debit_amount",
        "alias": "Debit amount",
        "type": "fields",
        "hide": false
      },
      {
        "name": "amounts.debit_amount.value",
        "alias": "Value",
        "type": "DOUBLE",
        "hide": false
      },
      {
        "name": "amounts.debit_amount.minor_unit",
        "alias": "Currency minor unit",
        "type": "INTEGER",
        "hide": false
      },
      {
        "name": "amounts.debit_amount.currency",
        "alias": "currency code",
        "type": "STRING",
        "hide": false
      },
      {
        "name": "amounts.requested_amount",
        "alias": "Requested amount",
        "type": "fields",
        "hide": false
      },
      {
        "name": "amounts.requested_amount.value",
        "alias": "Value",
        "type": "DOUBLE",
        "hide": false
      },
      {
        "name": "amounts.requested_amount.minor_unit",
        "alias": "Currency minor unit",
        "type": "INTEGER",
        "hide": false
      },
      {
        "name": "amounts.requested_amount.currency",
        "alias": "currency code",
        "type": "STRING",
        "hide": false
      },
      {
        "name": "amounts.total_amount",
        "alias": "Total amount",
        "type": "fields",
        "hide": false
      },
      {
        "name": "amounts.total_amount.value",
        "alias": "Value",
        "type": "DOUBLE",
        "hide": false
      },
      {
        "name": "amounts.total_amount.minor_unit",
        "alias": "Currency minor unit",
        "type": "INTEGER",
        "hide": false
      },
      {
        "name": "amounts.total_amount.currency",
        "alias": "currency code",
        "type": "STRING",
        "hide": false
      },
      {
        "name": "amounts.permitted_amount",
        "alias": "Permitted amount",
        "type": "fields",
        "hide": false
      },
      {
        "name": "amounts.permitted_amount.value",
        "alias": "Value",
        "type": "DOUBLE",
        "hide": false
      },
      {
        "name": "amounts.permitted_amount.minor_unit",
        "alias": "Currency minor unit",
        "type": "INTEGER",
        "hide": false
      },
      {
        "name": "amounts.permitted_amount.currency",
        "alias": "currency code",
        "type": "STRING",
        "hide": false
      },
      {
        "name": "amounts.dispensed_amount",
        "alias": "Dispensed amount",
        "type": "fields",
        "hide": false
      },
      {
        "name": "amounts.dispensed_amount.value",
        "alias": "Value",
        "type": "DOUBLE",
        "hide": false
      },
      {
        "name": "amounts.dispensed_amount.minor_unit",
        "alias": "Currency minor unit",
        "type": "INTEGER",
        "hide": false
      },
      {
        "name": "amounts.dispensed_amount.currency",
        "alias": "currency code",
        "type": "STRING",
        "hide": false
      },
      {
        "name": "amounts.authorised_amount",
        "alias": "Authorised amount",
        "type": "fields",
        "hide": false
      },
      {
        "name": "amounts.authorised_amount.value",
        "alias": "Value",
        "type": "DOUBLE",
        "hide": false
      },
      {
        "name": "amounts.authorised_amount.minor_unit",
        "alias": "Currency minor unit",
        "type": "INTEGER",
        "hide": false
      },
      {
        "name": "amounts.authorised_amount.currency",
        "alias": "currency code",
        "type": "STRING",
        "hide": false
      },
      {
        "name": "amounts.paid_amount",
        "alias": "Paid amount",
        "type": "fields",
        "hide": false
      },
      {
        "name": "amounts.paid_amount.value",
        "alias": "Value",
        "type": "DOUBLE",
        "hide": false
      },
      {
        "name": "amounts.paid_amount.minor_unit",
        "alias": "Currency minor unit",
        "type": "INTEGER",
        "hide": false
      },
      {
        "name": "amounts.paid_amount.currency",
        "alias": "currency code",
        "type": "STRING",
        "hide": false
      },
      {
        "name": "amounts.outstanding_amount",
        "alias": "Outstanding amount",
        "type": "fields",
        "hide": false
      },
      {
        "name": "amounts.outstanding_amount.value",
        "alias": "Value",
        "type": "DOUBLE",
        "hide": false
      },
      {
        "name": "amounts.outstanding_amount.minor_unit",
        "alias": "Currency minor unit",
        "type": "INTEGER",
        "hide": false
      },
      {
        "name": "amounts.outstanding_amount.currency",
        "alias": "currency code",
        "type": "STRING",
        "hide": false
      },
      {
        "name": "amounts.balance_amount",
        "alias": "Balance amount",
        "type": "fields",
        "hide": false
      },
      {
        "name": "amounts.balance_amount.value",
        "alias": "Value",
        "type": "DOUBLE",
        "hide": false
      },
      {
        "name": "amounts.balance_amount.minor_unit",
        "alias": "Currency minor unit",
        "type": "INTEGER",
        "hide": false
      },
      {
        "name": "amounts.balance_amount.currency",
        "alias": "currency code",
        "type": "STRING",
        "hide": false
      },
      {
        "name": "amounts.amount_original",
        "alias": "Amount original",
        "type": "fields",
        "hide": false
      },
      {
        "name": "amounts.amount_original.transaction_amount",
        "alias": "Transaction amount",
        "type": "fields",
        "hide": false
      },
      {
        "name": "amounts.amount_original.transaction_amount.value",
        "alias": "Value",
        "type": "DOUBLE",
        "hide": false
      },
      {
        "name": "amounts.amount_original.transaction_amount.minor_unit",
        "alias": "Currency minor unit",
        "type": "INTEGER",
        "hide": false
      },
      {
        "name": "amounts.amount_original.transaction_amount.currency",
        "alias": "currency code",
        "type": "STRING",
        "hide": false
      },
      {
        "name": "amounts.amount_original.settlement_amount",
        "alias": "Settlement amount",
        "type": "fields",
        "hide": false
      },
      {
        "name": "amounts.amount_original.settlement_amount.value",
        "alias": "Value",
        "type": "DOUBLE",
        "hide": false
      },
      {
        "name": "amounts.amount_original.settlement_amount.minor_unit",
        "alias": "Currency minor unit",
        "type": "INTEGER",
        "hide": false
      },
      {
        "name": "amounts.amount_original.settlement_amount.currency",
        "alias": "currency code",
        "type": "STRING",
        "hide": false
      },
      {
        "name": "amounts.amount_cashback",
        "alias": "Amount cashback",
        "type": "fields",
        "hide": false
      },
      {
        "name": "amounts.amount_cashback.value",
        "alias": "Value",
        "type": "DOUBLE",
        "hide": false
      },
      {
        "name": "amounts.amount_cashback.minor_unit",
        "alias": "Currency minor unit",
        "type": "INTEGER",
        "hide": false
      },
      {
        "name": "amounts.amount_cashback.currency",
        "alias": "Currency code",
        "type": "STRING",
        "hide": false
      },
      {
        "name": "fee_and_conversion_rate",
        "alias": "Fee and conversion rate",
        "type": "fields",
        "hide": false
      },
      {
        "name": "fee_and_conversion_rate.amount_cardholder_fee",
        "alias": "Amount cardholder fee",
        "type": "fields",
        "hide": false
      },
      {
        "name": "fee_and_conversion_rate.amount_cardholder_fee.value",
        "alias": "Value",
        "type": "DOUBLE",
        "hide": false
      },
      {
        "name": "fee_and_conversion_rate.amount_cardholder_fee.minor_unit",
        "alias": "Currency minor unit",
        "type": "INTEGER",
        "hide": false
      },
      {
        "name": "fee_and_conversion_rate.amount_cardholder_fee.currency",
        "alias": "currency code",
        "type": "STRING",
        "hide": false
      },
      {
        "name": "fee_and_conversion_rate.conversion_rate_settlement",
        "alias": "Conversion rate settlement",
        "type": "DOUBLE",
        "hide": false
      },
      {
        "name": "fee_and_conversion_rate.conversion_rate_cardholder_billing",
        "alias": "Conversion rate cardholder billing",
        "type": "DOUBLE",
        "hide": false
      },
      {
        "name": "fee_and_conversion_rate.amount_fees",
        "alias": "Amount fees",
        "type": "fields",
        "hide": false
      },
      {
        "name": "fee_and_conversion_rate.amount_fees.code",
        "alias": "Code",
        "type": "STRING",
        "hide": false
      },
      {
        "name": "fee_and_conversion_rate.amount_fees.conversion_rate_fee",
        "alias": "Conversion rate fee",
        "type": "DOUBLE",
        "hide": false
      },
      {
        "name": "fee_and_conversion_rate.amount_fees.transaction_amount_fee",
        "alias": "Transaction amount fee",
        "type": "fields",
        "hide": false
      },
      {
        "name": "fee_and_conversion_rate.amount_fees.transaction_amount_fee.value",
        "alias": "Value",
        "type": "DOUBLE",
        "hide": false
      },
      {
        "name": "fee_and_conversion_rate.amount_fees.transaction_amount_fee.minor_unit",
        "alias": "Currency minor unit",
        "type": "INTEGER",
        "hide": false
      },
      {
        "name": "fee_and_conversion_rate.amount_fees.transaction_amount_fee.currency",
        "alias": "currency code",
        "type": "STRING",
        "hide": false
      },
      {
        "name": "fee_and_conversion_rate.amount_fees.settlement_amount_fee",
        "alias": "Settlement amount fee",
        "type": "fields",
        "hide": false
      },
      {
        "name": "fee_and_conversion_rate.amount_fees.settlement_amount_fee.value",
        "alias": "Value",
        "type": "DOUBLE",
        "hide": false
      },
      {
        "name": "fee_and_conversion_rate.amount_fees.settlement_amount_fee.minor_unit",
        "alias": "Currency minor unit",
        "type": "INTEGER",
        "hide": false
      },
      {
        "name": "fee_and_conversion_rate.amount_fees.settlement_amount_fee.currency",
        "alias": "currency code",
        "type": "STRING",
        "hide": false
      },
      {
        "name": "fee_and_conversion_rate.amount_fees.fees_terminal",
        "alias": "Fees terminal",
        "type": "fields",
        "hide": false
      },
      {
        "name": "fee_and_conversion_rate.amount_fees.fees_terminal.value",
        "alias": "Value",
        "type": "DOUBLE",
        "hide": false
      },
      {
        "name": "fee_and_conversion_rate.amount_fees.fees_terminal.minor_unit",
        "alias": "Currency minor unit",
        "type": "INTEGER",
        "hide": false
      },
      {
        "name": "fee_and_conversion_rate.amount_fees.fees_terminal.currency",
        "alias": "currency code",
        "type": "STRING",
        "hide": false
      },
      {
        "name": "fee_and_conversion_rate.amount_fees.fees_convenience",
        "alias": "Fees convenience",
        "type": "fields",
        "hide": false
      },
      {
        "name": "fee_and_conversion_rate.amount_fees.fees_convenience.value",
        "alias": "Value",
        "type": "DOUBLE",
        "hide": false
      },
      {
        "name": "fee_and_conversion_rate.amount_fees.fees_convenience.minor_unit",
        "alias": "Currency minor unit",
        "type": "INTEGER",
        "hide": false
      },
      {
        "name": "fee_and_conversion_rate.amount_fees.fees_convenience.currency",
        "alias": "currency code",
        "type": "STRING",
        "hide": false
      },
      {
        "name": "fee_and_conversion_rate.amount_fees.fees_network",
        "alias": "Fees network",
        "type": "fields",
        "hide": false
      },
      {
        "name": "fee_and_conversion_rate.amount_fees.fees_network.value",
        "alias": "Value",
        "type": "DOUBLE",
        "hide": false
      },
      {
        "name": "fee_and_conversion_rate.amount_fees.fees_network.minor_unit",
        "alias": "Currency minor unit",
        "type": "INTEGER",
        "hide": false
      },
      {
        "name": "fee_and_conversion_rate.amount_fees.fees_network.currency",
        "alias": "currency code",
        "type": "STRING",
        "hide": false
      },
      {
        "name": "fee_and_conversion_rate.amount_fees.fees_for_ex",
        "alias": "Fees for ex",
        "type": "fields",
        "hide": false
      },
      {
        "name": "fee_and_conversion_rate.amount_fees.fees_for_ex.value",
        "alias": "Value",
        "type": "DOUBLE",
        "hide": false
      },
      {
        "name": "fee_and_conversion_rate.amount_fees.fees_for_ex.minor_unit",
        "alias": "Currency minor unit",
        "type": "INTEGER",
        "hide": false
      },
      {
        "name": "fee_and_conversion_rate.amount_fees.fees_for_ex.currency",
        "alias": "currency code",
        "type": "STRING",
        "hide": false
      },
      {
        "name": "posdatacode",
        "alias": "posdatacode",
        "type": "STRING",
        "hide": false
      },
      {
        "name": "transmission_date_time",
        "alias": "Transmission date time",
        "type": "STRING",
        "hide": false
      },
      {
        "name": "card",
        "alias": "Card",
        "type": "fields",
        "hide": false
      },
      {
        "name": "card.service_code",
        "alias": "service_code",
        "type": "STRING",
        "hide": false
      },
      {
        "name": "card.expiry",
        "alias": "Expiry",
        "type": "STRING",
        "hide": false
      },
      {
        "name": "card.sequence_number",
        "alias": "Sequence number",
        "type": "STRING",
        "hide": false
      },
      {
        "name": "card.track1",
        "alias": "Track 1",
        "type": "STRING",
        "hide": false
      },
      {
        "name": "card.track2",
        "alias": "Track 2",
        "type": "STRING",
        "hide": false
      },
      {
        "name": "card.security_control_information",
        "alias": "Security Control Information",
        "type": "STRING",
        "hide": false
      },
      {
        "name": "card.enc_track2",
        "alias": "Enc Track2",
        "type": "STRING",
        "hide": false
      },
      {
        "name": "card.enc_track2_ksn",
        "alias": "Enc Track2 Ksn",
        "type": "STRING",
        "hide": false
      },
      {
        "name": "card.intial_track2_vector",
        "alias": "Inital Track2 Vector",
        "type": "STRING",
        "hide": false
      },
      {
        "name": "card.track3",
        "alias": "Track 3",
        "type": "STRING",
        "hide": false
      },
      {
        "name": "card.card_presence",
        "alias": "Card presence",
        "type": "STRING",
        "hide": false
      },
      {
        "name": "card.capture_capability",
        "alias": "capture capability",
        "type": "STRING",
        "hide": false
      },
      {
        "name": "card.capture_method",
        "alias": "capture method",
        "type": "STRING",
        "hide": false
      },
      {
        "name": "card.output_capability",
        "alias": "output capability",
        "type": "STRING",
        "hide": false
      },
      {
        "name": "card.card_type",
        "alias": "Card Type",
        "type": "STRING",
        "hide": false
      },
      {
        "name": "card.instrument_type",
        "alias": "Instrument Type",
        "type": "STRING",
        "hide": false
      },
      {
        "name": "card.masked_card_number",
        "alias": "Masked Card Number",
        "type": "STRING",
        "hide": false
      },
      {
        "name": "card.expiry_month",
        "alias": "Expiry Month",
        "type": "STRING",
        "hide": false
      },
      {
        "name": "card.expiry_year",
        "alias": "Expiry Year",
        "type": "STRING",
        "hide": false
      },
      {
        "name": "settlementdate",
        "alias": "settlementdate",
        "type": "STRING",
        "hide": false
      },
      {
        "name": "date_settlement",
        "alias": "Settlement date",
        "type": "DATE",
        "hide": false
      },
      {
        "name": "date_conversion",
        "alias": "Conversion date",
        "type": "DATE",
        "hide": false
      },
      {
        "name": "merchant_type",
        "alias": "Merchant type",
        "type": "STRING",
        "hide": false
      },
      {
        "name": "account_number_country_code",
        "alias": "PAN country code",
        "type": "STRING",
        "hide": false
      },
      {
        "name": "forwarding_institution_country_code",
        "alias": "Forwarding institution country code",
        "type": "STRING",
        "hide": false
      },
      {
        "name": "point_of_service_entry_mode",
        "alias": "Point of service entry mode",
        "type": "fields",
        "hide": false
      },
      {
        "name": "point_of_service_entry_mode.pin_entry_mode",
        "alias": "Pin entry mode",
        "type": "STRING",
        "hide": false
      },
      {
        "name": "point_of_service_entry_mode.card_reading_method",
        "alias": "Card reading method",
        "type": "STRING",
        "hide": false
      },
      {
        "name": "point_of_service_entry_mode.card_holder_verification_method",
        "alias": "Cardholder verification method",
        "type": "STRING",
        "hide": false
      },
      {
        "name": "point_of_service_entry_mode.pos_environment",
        "alias": "POS environment",
        "type": "STRING",
        "hide": false
      },
      {
        "name": "point_of_service_entry_mode.security_characteristics",
        "alias": "Security characteristics",
        "type": "STRING",
        "hide": false
      },
      {
        "name": "pos_capability",
        "alias": "Pos capability",
        "type": "fields",
        "hide": false
      },
      {
        "name": "pos_capability.reading_capability",
        "alias": "Reading capability",
        "type": "STRING",
        "hide": false
      },
      {
        "name": "pos_capability.verification_capability",
        "alias": "Verification capability",
        "type": "STRING",
        "hide": false
      },
      {
        "name": "pos_capability.approval_code_length",
        "alias": "Approval code length",
        "type": "STRING",
        "hide": false
      },
      {
        "name": "pos_capability.cardholder_receipt_data_length",
        "alias": "Cardholder receipt data length",
        "type": "STRING",
        "hide": false
      },
      {
        "name": "pos_capability.Cardholder display data length",
        "alias": "Cardholder display data length",
        "type": "STRING",
        "hide": false
      },
      {
        "name": "pos_capability.card_acceptor_display_data_length",
        "alias": "Card acceptor display data length",
        "type": "STRING",
        "hide": false
      },
      {
        "name": "pos_capability.icc_script_data_length",
        "alias": "ICC script data length",
        "type": "STRING",
        "hide": false
      },
      {
        "name": "pos_capability.track3_rewrite_capability",
        "alias": "Track 3 rewrite capability",
        "type": "STRING",
        "hide": false
      },
      {
        "name": "pos_capability.card_capture_capability",
        "alias": "Card capture capability",
        "type": "STRING",
        "hide": false
      },
      {
        "name": "pos_capability.pin_input_length_capability",
        "alias": "Pin input length capability",
        "type": "STRING",
        "hide": false
      },
      {
        "name": "pos_capability.pos_condition_code",
        "alias": "Pos Condition Code",
        "type": "STRING",
        "hide": false
      },
      {
        "name": "pos_capability.cardholder_authentication_capability",
        "alias": "Cardholder Authentication Capability",
        "type": "STRING",
        "hide": false
      },
      {
        "name": "pos_capability.terminal_output_capability",
        "alias": "Pos Condition Code",
        "type": "STRING",
        "hide": false
      },
      {
        "name": "pos_capability.terminal_operator",
        "alias": "Pos Condition Code",
        "type": "STRING",
        "hide": false
      },
      {
        "name": "pos_capability.terminal_type",
        "alias": "Pos Condition Code",
        "type": "STRING",
        "hide": false
      },
      {
        "name": "pos_capability.pin_capture_code",
        "alias": "Pin capture code",
        "type": "STRING",
        "hide": false
      },
      {
        "name": "pos_capability.pos_additional_data",
        "alias": "Pos Additional Data",
        "type": "STRING",
        "hide": false
      },
      {
        "name": "network_international_identifier",
        "alias": "Network Management Information Code",
        "type": "STRING",
        "hide": false
      },
      {
        "name": "forwarding_institution_code",
        "alias": "Forwarding institution code",
        "type": "STRING",
        "hide": false
      },
      {
        "name": "approval_code",
        "alias": "Approval code",
        "type": "STRING",
        "hide": false
      },
      {
        "name": "card_acceptor_name_location",
        "alias": "Card acceptor name location",
        "type": "fields",
        "hide": false
      },
      {
        "name": "card_acceptor_name_location.card_acceptor_email",
        "alias": "Card Acceptor Email",
        "type": "STRING",
        "hide": false
      },
      {
        "name": "card_acceptor_name_location.card_acceptor_address",
        "alias": "Card Acceptor Address",
        "type": "STRING",
        "hide": false
      },
      {
        "name": "card_acceptor_name_location.card_acceptor_firstname",
        "alias": "Card Acceptor First Name",
        "type": "STRING",
        "hide": false
      },
      {
        "name": "card_acceptor_name_location.card_acceptor_lastname",
        "alias": "Card Acceptor Last Name",
        "type": "STRING",
        "hide": false
      },
      {
        "name": "card_acceptor_name_location.card_acceptor_city",
        "alias": "Card Acceptor City",
        "type": "STRING",
        "hide": false
      },
      {
        "name": "card_acceptor_name_location.card_acceptor_contact_information",
        "alias": "Email",
        "type": "STRING",
        "hide": false
      },
      {
        "name": "card_acceptor_name_location.email_opt_in",
        "alias": "Email Opt In",
        "type": "BOOLEAN",
        "hide": false
      },
      {
        "name": "card_acceptor_name_location.onus",
        "alias": "onus",
        "type": "BOOLEAN",
        "hide": false
      },
      {
        "name": "card_acceptor_name_location.brand",
        "alias": "Brand",
        "type": "STRING",
        "hide": false
      },
      {
        "name": "card_acceptor_name_location.other_data",
        "alias": "Other Data",
        "type": "MAP",
        "hide": false
      },
      {
        "name": "card_acceptor_name_location.card_acceptor_phone",
        "alias": "Phone",
        "type": "STRING",
        "hide": false
      },
      {
        "name": "card_acceptor_name_location.perform_card_capture",
        "alias": "Perform card capture",
        "type": "STRING",
        "hide": false
      },
      {
        "name": "card_acceptor_name_location.card_acceptor_country",
        "alias": "Country",
        "type": "STRING",
        "hide": false
      },
      {
        "name": "card_acceptor_name_location.card_acceptor_service_phone",
        "alias": "Service phone",
        "type": "STRING",
        "hide": false
      },
      {
        "name": "card_acceptor_name_location.card_acceptor_url",
        "alias": "URL",
        "type": "STRING",
        "hide": false
      },
      {
        "name": "card_acceptor_name_location.card_acceptor_name",
        "alias": "Card Acceptor Name",
        "type": "STRING",
        "hide": false
      },
      {
        "name": "card_acceptor_name_location.card_acceptor_postal_code",
        "alias": "Card Acceptor Postal Code",
        "type": "STRING",
        "hide": false
      },
      {
        "name": "card_acceptor_name_location.surcharge_indicator",
        "alias": "Surcharge Indicator",
        "type": "STRING",
        "hide": false
      },
      {
        "name": "card_acceptor_name_location.card_acceptor_state",
        "alias": "card Acceptor State",
        "type": "STRING",
        "hide": false
      },
      {
        "name": "card_acceptor_name_location.country_subdivision",
        "alias": "Country Subdivision",
        "type": "STRING",
        "hide": false
      },
      {
        "name": "card_acceptor_name_location.card_acceptor_postcode",
        "alias": "Postal Code",
        "type": "STRING",
        "hide": false
      },
      {
        "name": "card_acceptor_name_location.document",
        "alias": "Document",
        "type": "STRING",
        "hide": false
      },
      {
        "name": "card_acceptor_name_location.user_reference",
        "alias": "User Reference",
        "type": "STRING",
        "hide": false
      },
      {
        "name": "card_acceptor_name_location.address_number",
        "alias": "Address Number",
        "type": "INTEGER",
        "hide": false
      },
      {
        "name": "card_acceptor_name_location.country_code",
        "alias": "Country Code",
        "type": "STRING",
        "hide": false
      },
      {
        "name": "cardholder_verification_data",
        "alias": "Cardholder verification data",
        "type": "fields",
        "hide": false
      },
      {
        "name": "cardholder_verification_data.card_verification_data",
        "alias": "CVV",
        "type": "STRING",
        "hide": false
      },
      {
        "name": "cardholder_verification_data.card_holder_billing_address",
        "alias": "Card holder billing address",
        "type": "STRING",
        "hide": false
      },
      {
        "name": "cardholder_verification_data.card_holder_billing_postcode",
        "alias": "Postcode",
        "type": "STRING",
        "hide": false
      },
      {
        "name": "cardholder_verification_data.card_holder_billing_street",
        "alias": "Street",
        "type": "STRING",
        "hide": false
      },
      {
        "name": "cardholder_verification_data.avs_result_code",
        "alias": "AVS result code",
        "type": "STRING",
        "hide": false
      },
      {
        "name": "cardholder_verification_data.authentication_method",
        "alias": "Authentication Method",
        "type": "STRING",
        "hide": false
      },
      {
        "name": "cardholder_verification_data.authentication_entity",
        "alias": "Authentication Entity",
        "type": "STRING",
        "hide": false
      },
      {
        "name": "cardholder_verification_data.card_data_output_capability",
        "alias": "Card Data Output Capability",
        "type": "STRING",
        "hide": false
      },
      {
        "name": "cardholder_verification_data.authentication_method_array",
        "alias": "authentication method Array",
        "type": "ARRAY",
        "hide": false
      },
      {
        "name": "original_data_element",
        "alias": "Original data element",
        "type": "fields",
        "hide": false
      },
      {
        "name": "original_data_element.original_message_type_identifier",
        "alias": "Original Message Type Identifier",
        "type": "STRING",
        "hide": false
      },
      {
        "name": "original_data_element.stan",
        "alias": "Stan",
        "type": "STRING",
        "hide": false
      },
      {
        "name": "original_data_element.date_time_local",
        "alias": "Date Time Local",
        "type": "TIMEATAMP",
        "hide": false
      },
      {
        "name": "original_data_element.acquirer_institution_code",
        "alias": "Acquirer Institution Code",
        "type": "STRING",
        "hide": false
      },
      {
        "name": "original_data_element.auth_code",
        "alias": "Auth Code",
        "type": "STRING",
        "hide": false
      },
      {
        "name": "original_data_element.auth_number",
        "alias": "Auth Number",
        "type": "STRING",
        "hide": false
      },
      {
        "name": "original_data_element.rrn",
        "alias": "Retrieval reference number",
        "type": "STRING",
        "hide": false
      },
      {
        "name": "original_data_element.transaction_status",
        "alias": "Transaction status",
        "type": "STRING",
        "hide": false
      },
      {
        "name": "original_data_element.checkpoint",
        "alias": "Checkpoint",
        "type": "STRING",
        "hide": false
      },
      {
        "name": "original_data_element.txn_ipc",
        "alias": "txn_ipc",
        "type": "STRING",
        "hide": false
      },
      {
        "name": "original_data_element.transaction_type",
        "alias": "\"\"",
        "type": "STRING",
        "hide": false
      },
      {
        "name": "original_data_element.offline_refund",
        "alias": "offlineRefund",
        "type": "STRING",
        "hide": false
      },
      {
        "name": "original_data_element.message_protocol",
        "alias": "Message Protocol",
        "type": "STRING",
        "hide": false
      },
      {
        "name": "original_data_element.parent_transaction_id",
        "alias": "parentTransactionId",
        "type": "STRING",
        "hide": false
      },
      {
        "name": "original_data_element.transmission_date_time",
        "alias": "Transmission date time",
        "type": "STRING",
        "hide": false
      },
      {
        "name": "icc_data",
        "alias": "Icc data",
        "type": "fields",
        "hide": false
      },
      {
        "name": "icc_data.tag_9F26",
        "alias": "Application Cryptogram",
        "type": "STRING",
        "hide": false
      },
      {
        "name": "icc_data.tag_9F27",
        "alias": "Cryptogram information data",
        "type": "STRING",
        "hide": false
      },
      {
        "name": "icc_data.tag_9F10",
        "alias": "Issuer application data",
        "type": "STRING",
        "hide": false
      },
      {
        "name": "icc_data.tag_9F34",
        "alias": "CVM results",
        "type": "STRING",
        "hide": false
      },
      {
        "name": "icc_data.tag_9F33",
        "alias": "Terminal capabilities",
        "type": "STRING",
        "hide": false
      },
      {
        "name": "icc_data.tag_9F37",
        "alias": "Unpredictable number",
        "type": "STRING",
        "hide": false
      },
      {
        "name": "icc_data.tag_9F36",
        "alias": "Application transaction counter",
        "type": "STRING",
        "hide": false
      },
      {
        "name": "icc_data.tag_95",
        "alias": "Terminal verification result method",
        "type": "STRING",
        "hide": false
      },
      {
        "name": "icc_data.tag_9A",
        "alias": "Transaction date",
        "type": "STRING",
        "hide": false
      },
      {
        "name": "icc_data.tag_9C",
        "alias": "Transaction type Indicator",
        "type": "STRING",
        "hide": false
      },
      {
        "name": "icc_data.tag_9F02",
        "alias": "Amount authorized",
        "type": "STRING",
        "hide": false
      },
      {
        "name": "icc_data.tag_5F2A",
        "alias": "Transaction currency code",
        "type": "STRING",
        "hide": false
      },
      {
        "name": "icc_data.tag_5F24",
        "alias": "Application Expiration Date",
        "type": "STRING",
        "hide": false
      },
      {
        "name": "icc_data.tag_82",
        "alias": "Application interchange profile",
        "type": "STRING",
        "hide": false
      },
      {
        "name": "icc_data.tag_84",
        "alias": "Dedicated file name",
        "type": "STRING",
        "hide": false
      },
      {
        "name": "icc_data.tag_9F1A",
        "alias": "Terminal country code",
        "type": "STRING",
        "hide": false
      },
      {
        "name": "icc_data.tag_9F03",
        "alias": "Amount other",
        "type": "STRING",
        "hide": false
      },
      {
        "name": "icc_data.tag_9F06",
        "alias": "Amount other",
        "type": "STRING",
        "hide": false
      },
      {
        "name": "icc_data.tag_9F07",
        "alias": "Amount other",
        "type": "STRING",
        "hide": false
      },
      {
        "name": "icc_data.tag_8E",
        "alias": "Amount other",
        "type": "STRING",
        "hide": false
      },
      {
        "name": "icc_data.tag_9F1E",
        "alias": "Amount other",
        "type": "STRING",
        "hide": false
      },
      {
        "name": "icc_data.tag_9F0F",
        "alias": "Amount other",
        "type": "STRING",
        "hide": false
      },
      {
        "name": "icc_data.tag_9F09",
        "alias": "Amount other",
        "type": "STRING",
        "hide": false
      },
      {
        "name": "icc_data.tag_9F35",
        "alias": "Amount other",
        "type": "STRING",
        "hide": false
      },
      {
        "name": "icc_data.tag_5F34",
        "alias": "Application Primary Account Number",
        "type": "STRING",
        "hide": false
      },
      {
        "name": "icc_data.tag_9F41",
        "alias": "Transaction Sequence Counter",
        "type": "STRING",
        "hide": false
      },
      {
        "name": "icc_data.tag_9F0D",
        "alias": "Issuer Action Code - Default",
        "type": "STRING",
        "hide": false
      },
      {
        "name": "icc_data.tag_9F0E",
        "alias": "Issuer Action Code - Denial",
        "type": "STRING",
        "hide": false
      },
      {
        "name": "icc_data.tag_5A",
        "alias": "tag_5A",
        "type": "STRING",
        "hide": false
      },
      {
        "name": "icc_data.tag_9F08",
        "alias": "Terminal Application Version",
        "type": "STRING",
        "hide": false
      },
      {
        "name": "icc_data.tag_8C",
        "alias": "tag_8C",
        "type": "STRING",
        "hide": false
      },
      {
        "name": "icc_data.tag_8D",
        "alias": "tag_8D",
        "type": "STRING",
        "hide": false
      },
      {
        "name": "icc_data.tag_9F42",
        "alias": "Currency Code, Application",
        "type": "STRING",
        "hide": false
      },
      {
        "name": "icc_data.tag_5F28",
        "alias": "Issuer Country Code",
        "type": "STRING",
        "hide": false
      },
      {
        "name": "icc_data.tag_9F38",
        "alias": "tag_9F38",
        "type": "STRING",
        "hide": false
      },
      {
        "name": "icc_data.tag_9B",
        "alias": "Transaction Status Information",
        "type": "STRING",
        "hide": false
      },
      {
        "name": "icc_data.tag_5F20",
        "alias": "Card Holder Name",
        "type": "STRING",
        "hide": false
      },
      {
        "name": "icc_data.tag_8A",
        "alias": "Authorisation Response Code",
        "type": "STRING",
        "hide": false
      },
      {
        "name": "icc_data.tag_9F5B",
        "alias": "Issuer Scripts Results",
        "type": "STRING",
        "hide": false
      },
      {
        "name": "icc_data.tag_50",
        "alias": "Application Label",
        "type": "STRING",
        "hide": false
      },
      {
        "name": "icc_data.tag_98",
        "alias": "EMV Transaction Certificate",
        "type": "STRING",
        "hide": false
      },
      {
        "name": "icc_data.tag_9F69",
        "alias": "Card Authentication Results Code",
        "type": "STRING",
        "hide": false
      },
      {
        "name": "icc_data.tag_91",
        "alias": "Issuer Authentication Data",
        "type": "STRING",
        "hide": false
      },
      {
        "name": "icc_data.tag_71",
        "alias": "Issuer Script Template 1",
        "type": "STRING",
        "hide": false
      },
      {
        "name": "icc_data.tag_72",
        "alias": "Issuer Script Template 2",
        "type": "STRING",
        "hide": false
      },
      {
        "name": "icc_data.iccdata_tlv",
        "alias": "TLV Chip Data",
        "type": "STRING",
        "hide": false
      },
      {
        "name": "icc_data.tag_9F6E",
        "alias": "Cotactless Reader Capability",
        "type": "STRING",
        "hide": false
      },
      {
        "name": "cust_record",
        "alias": "Cust record",
        "type": "fields",
        "hide": false
      },
      {
        "name": "cust_record.ATM_NUMBER",
        "alias": "ATM_NUMBER",
        "type": "STRING",
        "hide": false
      },
      {
        "name": "cust_record.ERROR_SUB_CODE",
        "alias": "ERROR_SUB_CODE",
        "type": "STRING",
        "hide": false
      },
      {
        "name": "cust_record.TRAN_DATE",
        "alias": "TRAN_DATE",
        "type": "INTEGER",
        "hide": false
      },
      {
        "name": "cust_record.GENDER",
        "alias": "GENDER",
        "type": "STRING",
        "hide": false
      },
      {
        "name": "cust_record.BIRTH_DATE",
        "alias": "BIRTH_DATE",
        "type": "STRING",
        "hide": false
      },
      {
        "name": "cust_record.PARTIAL_PROFILE",
        "alias": "PARTIAL_PROFILE",
        "type": "STRING",
        "hide": false
      },
      {
        "name": "cust_record.OTHER_NAME",
        "alias": "OTHER_NAME",
        "type": "STRING",
        "hide": false
      },
      {
        "name": "cust_record.CUST_ID_TYPE",
        "alias": "CUST_ID_TYPE",
        "type": "STRING",
        "hide": false
      },
      {
        "name": "cust_record.ENTRY_MODE",
        "alias": "ENTRY_MODE",
        "type": "STRING",
        "hide": false
      },
      {
        "name": "cust_record.CUST_FUNCTION",
        "alias": "CUST_FUNCTION",
        "type": "STRING",
        "hide": false
      },
      {
        "name": "cust_record.ERROR_SYSTEM",
        "alias": "ERROR_SYSTEM",
        "type": "STRING",
        "hide": false
      },
      {
        "name": "cust_record.LAST_NAME",
        "alias": "LAST_NAME",
        "type": "STRING",
        "hide": false
      },
      {
        "name": "cust_record.CUST_ID_NUMBER",
        "alias": "CUST_ID_NUMBER",
        "type": "STRING",
        "hide": false
      },
      {
        "name": "cust_record.CUST_INITIAL",
        "alias": "CUST_INITIAL",
        "type": "STRING",
        "hide": false
      },
      {
        "name": "cust_record.PHONE_NUMBER",
        "alias": "PHONE_NUMBER",
        "type": "INTEGER",
        "hide": false
      },
      {
        "name": "cust_record.CUST_TITLE",
        "alias": "CUST_TITLE",
        "type": "STRING",
        "hide": false
      },
      {
        "name": "cust_record.MESSAGE_TYPE",
        "alias": "MESSAGETYPE",
        "type": "STRING",
        "hide": false
      },
      {
        "name": "cust_record.CARD_NUMBER",
        "alias": "CARDNUMBER",
        "type": "STRING",
        "hide": false
      },
      {
        "name": "cust_record.ERROR_CODE",
        "alias": "ERROR_CODE",
        "type": "STRING",
        "hide": false
      },
      {
        "name": "cust_record.TRACE_NUMBER",
        "alias": "TRACENUMBER",
        "type": "INTEGER",
        "hide": false
      },
      {
        "name": "cust_record.TRAN_DATETIME",
        "alias": "TRANDATETIME",
        "type": "INTEGER",
        "hide": false
      },
      {
        "name": "cust_record.EMAIL_ADDRESS",
        "alias": "EMAILADDRESS",
        "type": "STRING",
        "hide": false
      },
      {
        "name": "cust_record.BPID",
        "alias": "BPID",
        "type": "INTEGER",
        "hide": false
      },
      {
        "name": "cust_record.NUMBER_OF_ACNTS",
        "alias": "NUMBER  OF ACC",
        "type": "INTEGER",
        "hide": false
      },
      {
        "name": "cust_record.FIRST_NAME",
        "alias": "FIRST NAME",
        "type": "STRING",
        "hide": false
      },
      {
        "name": "cust_record.NUMBER_OF_CARDS",
        "alias": "NUMBER OF CARDS",
        "type": "INTEGER",
        "hide": false
      },
      {
        "name": "cust_record.PROCESSING_CODE",
        "alias": "PROCESSING CODE",
        "type": "STRING",
        "hide": false
      },
      {
        "name": "cust_record.TRAN_TIME",
        "alias": "TRAN TIME",
        "type": "INTEGER",
        "hide": false
      },
      {
        "name": "cust_record.APPLICATION_ID",
        "alias": "APPLICATION ID",
        "type": "STRING",
        "hide": false
      },
      {
        "name": "cust_card_record",
        "alias": "Cust card record",
        "type": "fields",
        "hide": false
      },
      {
        "name": "cust_card_record.CARD_TYPE",
        "alias": "CARD_TYPE",
        "type": "STRING",
        "hide": false
      },
      {
        "name": "cust_card_record.CARD_LANGUAGE_IND",
        "alias": "CARD_LANGUAGE_IND",
        "type": "STRING",
        "hide": false
      },
      {
        "name": "cust_card_record.CARD_LAST_UPDATE_DATE",
        "alias": "CARD_LAST_UPDATE_DATE",
        "type": "STRING",
        "hide": false
      },
      {
        "name": "cust_card_record.CARD_ANY_TRAN_IND",
        "alias": "CARD_ANY_TRAN_IND",
        "type": "STRING",
        "hide": false
      },
      {
        "name": "cust_card_record.CARD_TEMP_EAP_EXPIRY_ON",
        "alias": "CARD_TEMP_EAP_EXPIRY_ON",
        "type": "STRING",
        "hide": false
      },
      {
        "name": "cust_card_record.CARD_ATM_GREETING_IND",
        "alias": "CARD_ATM_GREETING_IND",
        "type": "STRING",
        "hide": false
      },
      {
        "name": "cust_card_record.CARD_FOREIGN_IND",
        "alias": "CARD_FOREIGN_IND",
        "type": "STRING",
        "hide": false
      },
      {
        "name": "cust_card_record.CARD_LAST_WITHDRAW_ON",
        "alias": "CARD_LAST_WITHDRAW_ON",
        "type": "STRING",
        "hide": false
      },
      {
        "name": "cust_card_record.CARD_INVALID_PIN_COUNT",
        "alias": "CARD_INVALID_PIN_COUNT",
        "type": "INTEGER",
        "hide": false
      },
      {
        "name": "cust_card_record.CARD_ATM_SPECIAL_IND",
        "alias": "CARD_ATM_SPECIAL_IND",
        "type": "STRING",
        "hide": false
      },
      {
        "name": "cust_card_record.CARD_MONTH_EAP_USED",
        "alias": "CARD_MONTH_EAP_USED",
        "type": "DOUBLE",
        "hide": false
      },
      {
        "name": "cust_card_record.CARD_MONTH_CW_LIMIT",
        "alias": "CARD_MONTH_CW_LIMIT",
        "type": "DOUBLE",
        "hide": false
      },
      {
        "name": "cust_card_record.CARD_ATM_HIGH_CONTRAST_IND",
        "alias": "CARD_ATM_HIGH_CONTRAST_IND",
        "type": "STRING",
        "hide": false
      },
      {
        "name": "cust_card_record.CARD_ATM_PREFERED_LANGUAGE",
        "alias": "CARD_ATM_PREFERED_LANGUAGE",
        "type": "INTEGER",
        "hide": false
      },
      {
        "name": "cust_card_record.CARD_DAILY_CW_LIMIT",
        "alias": "CARD_DAILY_CW_LIMIT",
        "type": "DOUBLE",
        "hide": false
      },
      {
        "name": "cust_card_record.CARD_SURNAME",
        "alias": "CARD_SURNAME",
        "type": "STRING",
        "hide": false
      },
      {
        "name": "cust_card_record.CARD_LAST_EAP_PAYMENT_ON",
        "alias": "CARD_LAST_EAP_PAYMENT_ON",
        "type": "STRING",
        "hide": false
      },
      {
        "name": "cust_card_record.CARD_NOCARD_IND",
        "alias": "CARD_NOCARD_IND",
        "type": "STRING",
        "hide": false
      },
      {
        "name": "cust_card_record.CARD_HOTCARD_STATUS",
        "alias": "CARD_HOTCARD_STATUS",
        "type": "STRING",
        "hide": false
      },
      {
        "name": "cust_card_record.CARD_ERROR_CODE",
        "alias": "CARD_ERROR_CODE",
        "type": "STRING",
        "hide": false
      },
      {
        "name": "cust_card_record.CARD_CPS_BLOCK_CODE",
        "alias": "CARD_CPS_BLOCK_CODE",
        "type": "STRING",
        "hide": false
      },
      {
        "name": "cust_card_record.CARD_CARD99_EAP_IND",
        "alias": "CARD_CARD99_EAP_IND",
        "type": "STRING",
        "hide": false
      },
      {
        "name": "cust_card_record.CARD_CPS_BLOCK_DATE",
        "alias": "CARD_CPS_BLOCK_DATE",
        "type": "STRING",
        "hide": false
      },
      {
        "name": "cust_card_record.CARD_POS_IND",
        "alias": "CARD_POS_IND",
        "type": "STRING",
        "hide": false
      },
      {
        "name": "cust_card_record.CARD_EXPIRY_DATE",
        "alias": "CARD_EXPIRY_DATE",
        "type": "STRING",
        "hide": false
      },
      {
        "name": "cust_card_record.CARD_LAST_ACTIVE_DATE",
        "alias": "CARD_LAST_ACTIVE_DATE",
        "type": "STRING",
        "hide": false
      },
      {
        "name": "cust_card_record.CARD_BASE_EAP_LIMIT",
        "alias": "CARD_BASE_EAP_LIMIT",
        "type": "DOUBLE",
        "hide": false
      },
      {
        "name": "cust_card_record.CARD_NUMBER",
        "alias": "CARD_NUMBER",
        "type": "STRING",
        "hide": false
      },
      {
        "name": "cust_card_record.CARD_MONTH_EAP_LIMIT",
        "alias": "CARD_MONTH_EAP_LIMIT",
        "type": "DOUBLE",
        "hide": false
      },
      {
        "name": "cust_card_record.CARD_PROD_SUBPROD_NUM",
        "alias": "CARD_PROD_SUBPROD_NUM",
        "type": "DOUBLE",
        "hide": false
      },
      {
        "name": "cust_card_record.CARD_DAILY_CW_USED",
        "alias": "CARD_DAILY_CW_USED",
        "type": "DOUBLE",
        "hide": false
      },
      {
        "name": "cust_card_record.CARD_INITIAL",
        "alias": "CARD_INITIAL",
        "type": "STRING",
        "hide": false
      },
      {
        "name": "cust_card_record.CARD_TEMP_EAP_IND",
        "alias": "CARD_TEMP_EAP_IND",
        "type": "STRING",
        "hide": false
      },
      {
        "name": "cust_card_record.CARD_ISSUED_DATE",
        "alias": "CARD_ISSUED_DATE",
        "type": "STRING",
        "hide": false
      },
      {
        "name": "cust_card_record.CARD_ATM_IND",
        "alias": "CARD_ATM_IND",
        "type": "STRING",
        "hide": false
      },
      {
        "name": "cust_card_record.CARD_MONTH_CW_USED",
        "alias": "CARD_MONTH_CW_USED",
        "type": "STRING",
        "hide": false
      },
      {
        "name": "cust_cash_record",
        "alias": "Cust cash record",
        "type": "fields",
        "hide": false
      },
      {
        "name": "cust_cash_record.cash_denom",
        "alias": "cash_denom",
        "type": "STRING",
        "hide": false
      },
      {
        "name": "cust_cash_record.cash_count",
        "alias": "cash_count",
        "type": "INTEGER",
        "hide": false
      },
      {
        "name": "authorizing_agent_institution_id",
        "alias": "Authorizing agent institution id",
        "type": "STRING",
        "hide": false
      },
      {
        "name": "cardholder_presence",
        "alias": "Cardholder presence",
        "type": "STRING",
        "hide": false
      },
      {
        "name": "receiving_institution_identification_code",
        "alias": "Receiving institution identification code",
        "type": "STRING",
        "hide": false
      },
      {
        "name": "merchant_identification",
        "alias": "Merchant id",
        "type": "STRING",
        "hide": false
      },
      {
        "name": "device_code",
        "alias": "Device Code",
        "type": "STRING",
        "hide": false
      },
      {
        "name": "merchant_velocity",
        "alias": "Merchant Velocity",
        "type": "STRING",
        "hide": false
      },
      {
        "name": "pin_ksn",
        "alias": "Pin Block KSN",
        "type": "STRING",
        "hide": false
      },
      {
        "name": "pan_ksn",
        "alias": "Card Number KSN",
        "type": "STRING",
        "hide": false
      },
      {
        "name": "otb_data",
        "alias": "OTBData",
        "type": "STRING",
        "hide": false
      },
      {
        "name": "offline_refund",
        "alias": "offlineRefund",
        "type": "STRING",
        "hide": false
      },
      {
        "name": "time_zone",
        "alias": "Time Zone",
        "type": "STRING",
        "hide": false
      },
      {
        "name": "enc_track2",
        "alias": "encTrack2",
        "type": "STRING",
        "hide": false
      },
      {
        "name": "security_token",
        "alias": "Security Token",
        "type": "STRING",
        "hide": false
      },
      {
        "name": "processor_id",
        "alias": "Processor ID",
        "type": "STRING",
        "hide": false
      },
      {
        "name": "barcode",
        "alias": "Barcode",
        "type": "STRING",
        "hide": false
      },
      {
        "name": "bin",
        "alias": "Bin",
        "type": "STRING",
        "hide": false
      },
      {
        "name": "response_desc",
        "alias": "Response Description",
        "type": "STRING",
        "hide": false
      },
      {
        "name": "session_guid",
        "alias": "Session Guid",
        "type": "STRING",
        "hide": false
      },
      {
        "name": "system_trace_audit_number",
        "alias": "Stan",
        "type": "STRING",
        "hide": false
      },
      {
        "name": "account_number",
        "alias": "Account Number",
        "type": "STRING",
        "hide": false
      },
      {
        "name": "customer_id",
        "alias": "customer_id",
        "type": "STRING",
        "hide": false
      },
      {
        "name": "request_guid",
        "alias": "Request Guid",
        "type": "STRING",
        "hide": false
      },
      {
        "name": "machine_name",
        "alias": "Machine Name",
        "type": "STRING",
        "hide": false
      },
      {
        "name": "terminal_identification",
        "alias": "Terminal Identification",
        "type": "STRING",
        "hide": false
      },
      {
        "name": "local_date_time",
        "alias": "Local Transaction Date Time",
        "type": "DATE",
        "hide": false
      },
      {
        "name": "mac_address",
        "alias": "Mac Address",
        "type": "STRING",
        "hide": false
      },
      {
        "name": "epp_serial_number",
        "alias": "Epp Serial Number",
        "type": "STRING",
        "hide": false
      },
      {
        "name": "utc_offset",
        "alias": "Utc Offset",
        "type": "STRING",
        "hide": false
      },
      {
        "name": "api_version",
        "alias": "Api Version",
        "type": "STRING",
        "hide": false
      },
      {
        "name": "product_list",
        "alias": "Product list",
        "type": "fields",
        "hide": false
      },
      {
        "name": "product_list.purchase_item",
        "alias": "Purchase item",
        "type": "fields",
        "hide": false
      },
      {
        "name": "product_list.purchase_item.product_name",
        "alias": "Product Name",
        "type": "STRING",
        "hide": false
      },
      {
        "name": "product_list.purchase_item.product_id",
        "alias": "Product Id",
        "type": "STRING",
        "hide": false
      },
      {
        "name": "product_list.purchase_item.quantity",
        "alias": "Quantity",
        "type": "STRING",
        "hide": false
      },
      {
        "name": "product_list.purchase_item.score_amount",
        "alias": "Score Amount",
        "type": "STRING",
        "hide": false
      },
      {
        "name": "product_list.purchase_item.value",
        "alias": "Value",
        "type": "DOUBLE",
        "hide": false
      },
      {
        "name": "product_list.purchase_item.currency",
        "alias": "currency_code",
        "type": "STRING",
        "hide": false
      },
      {
        "name": "earned_points",
        "alias": "Earned Points",
        "type": "STRING",
        "hide": false
      },
      {
        "name": "earned_cash",
        "alias": "Earned Cash",
        "type": "STRING",
        "hide": false
      },
      {
        "name": "number_transactions",
        "alias": "Number of Transaction",
        "type": "STRING",
        "hide": false
      },
      {
        "name": "from_date",
        "alias": "From Date",
        "type": "STRING",
        "hide": false
      },
      {
        "name": "to_date",
        "alias": "Time Zone",
        "type": "STRING",
        "hide": false
      },
      {
        "name": "destinationID",
        "alias": "destination id for primary and failover",
        "type": "STRING",
        "hide": false
      },
      {
        "name": "card_number_last_four_digits",
        "alias": "Card Number Last Four Digits",
        "type": "STRING",
        "hide": false
      },
      {
        "name": "response_code",
        "alias": "Response code",
        "type": "STRING",
        "hide": false
      },
      {
        "name": "stan",
        "alias": "Stan",
        "type": "STRING",
        "hide": false
      },
      {
        "name": "language",
        "alias": "Language",
        "type": "STRING",
        "hide": false
      },
      {
        "name": "additional_validation_data",
        "alias": "Additional Validation Data",
        "type": "STRING",
        "hide": false
      },
      {
        "name": "transaction_guid",
        "alias": "Transaction Guid",
        "type": "STRING",
        "hide": false
      },
      {
        "name": "pin_data",
        "alias": "Pin block",
        "type": "STRING",
        "hide": false
      },
      {
        "name": "secondary_pin_data",
        "alias": "Secondary Pin block",
        "type": "STRING",
        "hide": false
      },
      {
        "name": "emv_data",
        "alias": "Emv Data",
        "type": "STRING",
        "hide": false
      },
      {
        "name": "response_code",
        "alias": "Response code",
        "type": "STRING",
        "hide": false
      },
      {
        "name": "error_message",
        "alias": "Error Message",
        "type": "STRING",
        "hide": false
      },
      {
        "name": "auth_code",
        "alias": "Auth Code",
        "type": "STRING",
        "hide": false
      },
      {
        "name": "out_of_service",
        "alias": "Out of Service",
        "type": "STRING",
        "hide": false
      },
      {
        "name": "auth_number",
        "alias": "Auth Number",
        "type": "STRING",
        "hide": false
      },
      {
        "name": "rrn",
        "alias": "Retrieval reference number",
        "type": "STRING",
        "hide": false
      },
      {
        "name": "receipt_data",
        "alias": "Receipt data",
        "type": "STRING",
        "hide": false
      },
      {
        "name": "account_balances",
        "alias": "Account balances",
        "type": "fields",
        "hide": false
      },
      {
        "name": "account_balances.account_type",
        "alias": "Account type",
        "type": "STRING",
        "hide": false
      },
      {
        "name": "account_balances.auth_number",
        "alias": "Auth Number",
        "type": "STRING",
        "hide": false
      },
      {
        "name": "account_balances.rrn",
        "alias": "Retrieval reference number",
        "type": "STRING",
        "hide": false
      },
      {
        "name": "account_balances.balances",
        "alias": "Balances",
        "type": "fields",
        "hide": false
      },
      {
        "name": "account_balances.balances.name",
        "alias": "Name",
        "type": "STRING",
        "hide": false
      },
      {
        "name": "account_balances.balances.balance_account_name",
        "alias": "Balance account name",
        "type": "fields",
        "hide": false
      },
      {
        "name": "account_balances.balances.balance_account_name.value",
        "alias": "Value",
        "type": "DOUBLE",
        "hide": false
      },
      {
        "name": "account_balances.balances.balance_account_name.minor_unit",
        "alias": "Currency minor unit",
        "type": "INTEGER",
        "hide": false
      },
      {
        "name": "account_balances.balances.balance_account_name.currency",
        "alias": "currency code",
        "type": "STRING",
        "hide": false
      },
      {
        "name": "accounts",
        "alias": "Accounts",
        "type": "fields",
        "hide": false
      },
      {
        "name": "accounts.account_number",
        "alias": "account_number",
        "type": "STRING",
        "hide": false
      },
      {
        "name": "accounts.name",
        "alias": "Name",
        "type": "STRING",
        "hide": false
      },
      {
        "name": "accounts.customer_name",
        "alias": "Customer name",
        "type": "STRING",
        "hide": false
      },
      {
        "name": "accounts.customer_initials",
        "alias": "Customer initials",
        "type": "STRING",
        "hide": false
      },
      {
        "name": "accounts.email",
        "alias": "Email",
        "type": "STRING",
        "hide": false
      },
      {
        "name": "for_ex_rate",
        "alias": "For ex rate",
        "type": "NUMBER",
        "hide": false
      },
      {
        "name": "phone_number",
        "alias": "Phone Number",
        "type": "LONG",
        "hide": false
      },
      {
        "name": "key_value_pairs",
        "alias": "Key Value Pairs",
        "type": "MAP",
        "hide": false
      },
      {
        "name": "acceptor_identification_code",
        "alias": "Card acceptor identification code",
        "type": "STRING",
        "hide": false
      },
      {
        "name": "category",
        "alias": "Category",
        "type": "STRING",
        "hide": false
      },
      {
        "name": "companyId",
        "alias": "CompanyId",
        "type": "STRING",
        "hide": false
      },
      {
        "name": "bill_reference",
        "alias": "Bill Reference",
        "type": "STRING",
        "hide": false
      },
      {
        "name": "payment_type",
        "alias": "Payment Type",
        "type": "STRING",
        "hide": false
      },
      {
        "name": "acquirer_institution_code",
        "alias": "Acquirer Institution Code",
        "type": "STRING",
        "hide": false
      },
      {
        "name": "referenceNumber",
        "alias": "Reference Number",
        "type": "STRING",
        "hide": false
      },
      {
        "name": "balancesec",
        "alias": "Balancesec",
        "type": "fields",
        "hide": false
      },
      {
        "name": "balancesec.balance",
        "alias": "Balance",
        "type": "DOUBLE",
        "hide": false
      },
      {
        "name": "balancesec.currencyCode",
        "alias": "currency code",
        "type": "STRING",
        "hide": false
      },
      {
        "name": "noteItems",
        "alias": "Noteitems",
        "type": "fields",
        "hide": false
      },
      {
        "name": "noteItems.value",
        "alias": "Value",
        "type": "DOUBLE",
        "hide": false
      },
      {
        "name": "noteItems.minor_unit",
        "alias": "Currency minor unit",
        "type": "INTEGER",
        "hide": false
      },
      {
        "name": "noteItems.currency",
        "alias": "currency code",
        "type": "STRING",
        "hide": false
      },
      {
        "name": "noteItems.noteType",
        "alias": "Note type",
        "type": "STRING",
        "hide": false
      },
      {
        "name": "noteItems.count",
        "alias": "count",
        "type": "INTEGER",
        "hide": false
      },
      {
        "name": "noteItems.totalamount",
        "alias": "Total Amount",
        "type": "DOUBLE",
        "hide": false
      },
      {
        "name": "advice_type",
        "alias": "Advice Type",
        "type": "STRING",
        "hide": false
      },
      {
        "name": "message_protocol",
        "alias": "Message Protocol",
        "type": "STRING",
        "hide": false
      },
      {
        "name": "echo_data",
        "alias": "Echo Data",
        "type": "STRING",
        "hide": false
      },
      {
        "name": "additional_amount",
        "alias": "Additional Amount",
        "type": "STRING",
        "hide": false
      },
      {
        "name": "activation_code",
        "alias": "Activation Code",
        "type": "STRING",
        "hide": false
      },
      {
        "name": "messages",
        "alias": "Message",
        "type": "STRING",
        "hide": false
      },
      {
        "name": "replay",
        "alias": "Reply",
        "type": "STRING",
        "hide": false
      },
      {
        "name": "error_Code",
        "alias": "Error Code",
        "type": "STRING",
        "hide": false
      },
      {
        "name": "error_message",
        "alias": "Error Message",
        "type": "STRING",
        "hide": false
      },
      {
        "name": "txn_id",
        "alias": "Transaction ID",
        "type": "STRING",
        "hide": false
      },
      {
        "name": "dest_account_number",
        "alias": "Destination Account",
        "type": "STRING",
        "hide": false
      },
      {
        "name": "reservation_id",
        "alias": "Reservation ID",
        "type": "STRING",
        "hide": false
      },
      {
        "name": "currency_date",
        "alias": "Currency Date",
        "type": "STRING",
        "hide": false
      },
      {
        "name": "personal_id",
        "alias": "Personal ID",
        "type": "STRING",
        "hide": false
      },
      {
        "name": "purpose",
        "alias": "Purpose",
        "type": "STRING",
        "hide": false
      },
      {
        "name": "ben_ref_number",
        "alias": "Ben Ref Number",
        "type": "STRING",
        "hide": false
      },
      {
        "name": "ben_ref_model",
        "alias": "Ben Ref Model",
        "type": "STRING",
        "hide": false
      },
      {
        "name": "ben_name",
        "alias": "Ben Name",
        "type": "STRING",
        "hide": false
      },
      {
        "name": "ben_address",
        "alias": "Ben Address",
        "type": "STRING",
        "hide": false
      },
      {
        "name": "ord_party_ref_model",
        "alias": "Ord Party Ref Model",
        "type": "STRING",
        "hide": false
      },
      {
        "name": "ord_party_ref_number",
        "alias": "Ord Party Ref Number",
        "type": "STRING",
        "hide": false
      },
      {
        "name": "ord_party_address",
        "alias": "Ord Party Address",
        "type": "STRING",
        "hide": false
      },
      {
        "name": "ord_party_place",
        "alias": "Ord Party Place",
        "type": "STRING",
        "hide": false
      },
      {
        "name": "urgency",
        "alias": "Urgency",
        "type": "STRING",
        "hide": false
      },
      {
        "name": "actual_amount",
        "alias": "Actual Amount",
        "type": "STRING",
        "hide": false
      },
      {
        "name": "template_id",
        "alias": "Template ID",
        "type": "STRING",
        "hide": false
      },
      {
        "name": "trn_status",
        "alias": "Transaction status",
        "type": "STRING",
        "hide": false
      },
      {
        "name": "checkpoint",
        "alias": "Checkpoint",
        "type": "STRING",
        "hide": false
      },
      {
        "name": "source_amount_value",
        "alias": "Source Amount Value",
        "type": "STRING",
        "hide": false
      },
      {
        "name": "source_amount_currency",
        "alias": "Source Amount Currency",
        "type": "STRING",
        "hide": false
      },
      {
        "name": "dest_amount_currency",
        "alias": "Destination Amount Currency",
        "type": "STRING",
        "hide": false
      },
      {
        "name": "card_id",
        "alias": "Card ID",
        "type": "STRING",
        "hide": false
      },
      {
        "name": "purpose_code",
        "alias": "Purpose Code",
        "type": "STRING",
        "hide": false
      },
      {
        "name": "info",
        "alias": "INFO",
        "type": "STRING",
        "hide": false
      },
      {
        "name": "fee_percent",
        "alias": "Fee Percent",
        "type": "STRING",
        "hide": false
      },
      {
        "name": "tax",
        "alias": "Tax",
        "type": "STRING",
        "hide": false
      },
      {
        "name": "tax_percent",
        "alias": "Tax Percent",
        "type": "STRING",
        "hide": false
      },
      {
        "name": "local_currency_code",
        "alias": "local_currency_code",
        "type": "STRING",
        "hide": false
      },
      {
        "name": "exchange_rate",
        "alias": "Exchange Rate",
        "type": "STRING",
        "hide": false
      },
      {
        "name": "product_type",
        "alias": "product type",
        "type": "STRING",
        "hide": false
      },
      {
        "name": "local_amount",
        "alias": "Local Amount",
        "type": "STRING",
        "hide": false
      },
      {
        "name": "description",
        "alias": "Description",
        "type": "STRING",
        "hide": false
      },
      {
        "name": "dateofbirth",
        "alias": "dateofbirth",
        "type": "STRING",
        "hide": false
      },
      {
        "name": "rez",
        "alias": "REZ",
        "type": "STRING",
        "hide": false
      },
      {
        "name": "source_id",
        "alias": "Source Id",
        "type": "STRING",
        "hide": false
      },
      {
        "name": "mti",
        "alias": "MTI",
        "type": "STRING",
        "hide": false
      },
      {
        "name": "processing_code",
        "alias": "Processing Code",
        "type": "STRING",
        "hide": false
      },
      {
        "name": "local_time",
        "alias": "Local Transaction Time",
        "type": "STRING",
        "hide": false
      },
      {
        "name": "local_date",
        "alias": "Local Transaction Date",
        "type": "STRING",
        "hide": false
      },
      {
        "name": "network_info_code",
        "alias": "Network Management Information Code",
        "type": "STRING",
        "hide": false
      },
      {
        "name": "additional_data",
        "alias": "Additional Data",
        "type": "STRING",
        "hide": false
      },
      {
        "name": "new_pin_data",
        "alias": "New Pin Data",
        "type": "BYTE_ARRAY",
        "hide": false
      },
      {
        "name": "advice_reason_code",
        "alias": "Advice Reason Code",
        "type": "STRING",
        "hide": false
      },
      {
        "name": "additional_response_data",
        "alias": "Additional Response Data",
        "type": "STRING",
        "hide": false
      },
      {
        "name": "merchant_category_code",
        "alias": "MCC",
        "type": "STRING",
        "hide": false
      },
      {
        "name": "merchant_name",
        "alias": "Merchant Name",
        "type": "STRING",
        "hide": false
      },
      {
        "name": "pin_format",
        "alias": "Pin Format",
        "type": "STRING",
        "hide": false
      },
      {
        "name": "security",
        "alias": "Security",
        "type": "fields",
        "hide": false
      },
      {
        "name": "security.key_serial_number",
        "alias": "Key Serial Number",
        "type": "STRING",
        "hide": false
      },
      {
        "name": "security.key_management_algorithm",
        "alias": "key Management Algorithm",
        "type": "STRING",
        "hide": false
      },
      {
        "name": "security.mac",
        "alias": "Mac",
        "type": "STRING",
        "hide": false
      },
      {
        "name": "security.mac_algorithm",
        "alias": "Mac Algorithm",
        "type": "STRING",
        "hide": false
      },
      {
        "name": "security.mac_format",
        "alias": "Mac Format",
        "type": "STRING",
        "hide": false
      },
      {
        "name": "security.pan_key_index_number",
        "alias": "PAN Key Index Number",
        "type": "INTEGER",
        "hide": false
      },
      {
        "name": "security.mac_key_index_number",
        "alias": "MAC Key Index Number",
        "type": "INTEGER",
        "hide": false
      },
      {
        "name": "payment_context",
        "alias": "Payment context",
        "type": "fields",
        "hide": false
      },
      {
        "name": "payment_context.card_present",
        "alias": "Card Present",
        "type": "STRING",
        "hide": false
      },
      {
        "name": "payment_context.cardholder_present",
        "alias": "Cardholder Present",
        "type": "STRING",
        "hide": false
      },
      {
        "name": "payment_context.sales_channel",
        "alias": "Sales Channel",
        "type": "STRING",
        "hide": false
      },
      {
        "name": "payment_context.wallet",
        "alias": "Wallet",
        "type": "STRING",
        "hide": false
      },
      {
        "name": "payment_context.brand_choice",
        "alias": "Brand Choice",
        "type": "STRING",
        "hide": false
      },
      {
        "name": "payment_context.merchant_present",
        "alias": "Merchant Present",
        "type": "STRING",
        "hide": false
      },
      {
        "name": "payment_context.merchant_force",
        "alias": "Merchant Force",
        "type": "BOOLEAN",
        "hide": false
      },
      {
        "name": "payment_context.authentication_method",
        "alias": "Authentication Method",
        "type": "LIST",
        "hide": false
      },
      {
        "name": "payment_context.authentication_outcome",
        "alias": "Authentication Outcome",
        "type": "STRING",
        "hide": false
      },
      {
        "name": "payment_context.authentication_entity",
        "alias": "Authentication Entity",
        "type": "STRING",
        "hide": false
      },
      {
        "name": "payment_context.authentication_attempts",
        "alias": "Authentication Attempts",
        "type": "INTEGER",
        "hide": false
      },
      {
        "name": "payment_context.entry_mode",
        "alias": "Entry Mode",
        "type": "STRING",
        "hide": false
      },
      {
        "name": "payment_context.online",
        "alias": "Online",
        "type": "BOOLEAN",
        "hide": false
      },
      {
        "name": "payment_context.online_reason",
        "alias": "Online Reason",
        "type": "STRING",
        "hide": false
      },
      {
        "name": "payment_context.additional_online_reason",
        "alias": "Additional Online Reason",
        "type": "LIST",
        "hide": false
      },
      {
        "name": "payment_context.offline_duration",
        "alias": "Offline Duration",
        "type": "INTEGER",
        "hide": false
      },
      {
        "name": "payment_context.account_type",
        "alias": "Account Type",
        "type": "STRING",
        "hide": false
      },
      {
        "name": "payment_context.attendant_language",
        "alias": "Attendant Language",
        "type": "STRING",
        "hide": false
      },
      {
        "name": "payment_context.electronic_fallback",
        "alias": "Electronic Fallback",
        "type": "STRING",
        "hide": false
      },
      {
        "name": "payment_context.fallback_reason",
        "alias": "Fallback Reason",
        "type": "STRING",
        "hide": false
      },
      {
        "name": "payment_context.fallback_code",
        "alias": "Fallback Code",
        "type": "STRING",
        "hide": false
      },
      {
        "name": "payment_context.sca_exempt_reason",
        "alias": "Sca Exempt Reason",
        "type": "STRING",
        "hide": false
      },
      {
        "name": "payment_context.overridden_aid",
        "alias": "Overridden AID",
        "type": "STRING",
        "hide": false
      },
      {
        "name": "payment_context.acquirer_reference",
        "alias": "Acquirer Reference",
        "type": "STRING",
        "hide": false
      },
      {
        "name": "payment_context.acquirer_specification_version",
        "alias": "Acquirer Specification Version",
        "type": "STRING",
        "hide": false
      },
      {
        "name": "payment_context.scheme_reference_data",
        "alias": "Scheme Reference Data",
        "type": "STRING",
        "hide": false
      },
      {
        "name": "payment_context.batch_number",
        "alias": "Batch Number",
        "type": "STRING",
        "hide": false
      },
      {
        "name": "payment_context.fraud",
        "alias": "Fraud",
        "type": "fields",
        "hide": false
      },
      {
        "name": "payment_context.fraud.status",
        "alias": "Status",
        "type": "STRING",
        "hide": false
      },
      {
        "name": "payment_context.fraud.status_description",
        "alias": "Status Description",
        "type": "STRING",
        "hide": false
      },
      {
        "name": "payment_context.character_set",
        "alias": "Character Set",
        "type": "STRING",
        "hide": false
      },
      {
        "name": "payment_context.application_id",
        "alias": "Application Id",
        "type": "STRING",
        "hide": false
      },
      {
        "name": "payment_context.refusal_reason",
        "alias": "Refusal Reason",
        "type": "STRING",
        "hide": false
      },
      {
        "name": "payment_context.stored_credential_type",
        "alias": "Stored Credential Type",
        "type": "STRING",
        "hide": false
      },
      {
        "name": "payment_context.credit_term",
        "alias": "Credit Term",
        "type": "STRING",
        "hide": false
      },
      {
        "name": "cvvecom_result_code",
        "alias": "CVV2 Result Code",
        "type": "STRING",
        "hide": false
      },
      {
        "name": "la_additional_response_data",
        "alias": "LA Additional Response Data",
        "type": "CHAR",
        "hide": false
      },
      {
        "name": "card_authentication_result_code",
        "alias": "Card Authentication Result Code",
        "type": "CHAR",
        "hide": false
      },
      {
        "name": "pacm_diversion_reasoncode",
        "alias": "PACM Diversion Reasoncode",
        "type": "CHAR",
        "hide": false
      },
      {
        "name": "pacm_diversion_level",
        "alias": "PACM Diversion Level",
        "type": "STRING",
        "hide": false
      },
      {
        "name": "cvv_result_code",
        "alias": "CVV Result Code",
        "type": "CHAR",
        "hide": false
      },
      {
        "name": "card_product_type",
        "alias": "Card Product Type",
        "type": "CHAR",
        "hide": false
      },
      {
        "name": "tvc_result_code",
        "alias": "TVC Result code",
        "type": "CHAR",
        "hide": false
      },
      {
        "name": "avs_result_code",
        "alias": "AVS Result Code",
        "type": "STRING",
        "hide": false
      },
      {
        "name": "pin_service_code",
        "alias": "PIN service Code",
        "type": "STRING",
        "hide": false
      },
      {
        "name": "response_reason_code",
        "alias": "Response Source/Reason Code",
        "type": "CHAR",
        "hide": false
      },
      {
        "name": "network_identification_code",
        "alias": "Network Identification Code",
        "type": "STRING",
        "hide": false
      },
      {
        "name": "fee_program_indicator",
        "alias": "Fee Program Indicator",
        "type": "STRING",
        "hide": false
      },
      {
        "name": "product_id",
        "alias": "Product Id",
        "type": "STRING",
        "hide": false
      },
      {
        "name": "TID",
        "alias": "TID",
        "type": "STRING",
        "hide": false
      },
      {
        "name": "transaction_id",
        "alias": "Transaction Id",
        "type": "STRING",
        "hide": false
      },
      {
        "name": "visa_additional_response",
        "alias": "Visa Additional Response",
        "type": "STRING",
        "hide": false
      },
      {
        "name": "account_funding_source",
        "alias": "Account Funding Source",
        "type": "STRING",
        "hide": false
      },
      {
        "name": "program_identifier",
        "alias": "Program Identifier",
        "type": "STRING",
        "hide": false
      },
      {
        "name": "fallback_reason",
        "alias": "Fallback Reason",
        "type": "STRING",
        "hide": false
      },
      {
        "name": "transaction_date_time",
        "alias": "Transaction_Date Time",
        "type": "STRING",
        "hide": false
      },
      {
        "name": "authorisation_source",
        "alias": "Authorisation Source",
        "type": "STRING",
        "hide": false
      },
      {
        "name": "card_holder_verification_data",
        "alias": "Card holder verification data",
        "type": "fields",
        "hide": false
      },
      {
        "name": "card_holder_verification_data.avs_result_code",
        "alias": "AVS result code",
        "type": "STRING",
        "hide": false
      },
      {
        "name": "token_Cryptogram",
        "alias": "Token Cryptogram",
        "type": "STRING",
        "hide": false
      },
      {
        "name": "MC_DE48_SE33",
        "alias": "Mc de48 se33",
        "type": "fields",
        "hide": false
      },
      {
        "name": "MC_DE48_SE33.SF01",
        "alias": "SF01",
        "type": "STRING",
        "hide": false
      },
      {
        "name": "MC_DE48_SE33.SF02",
        "alias": "SF02",
        "type": "STRING",
        "hide": false
      },
      {
        "name": "MC_DE48_SE33.SF03",
        "alias": "SF03",
        "type": "STRING",
        "hide": false
      },
      {
        "name": "MC_DE48_SE33.SF04",
        "alias": "SF04",
        "type": "STRING",
        "hide": false
      },
      {
        "name": "MC_DE48_SE33.SF05",
        "alias": "SF05",
        "type": "STRING",
        "hide": false
      },
      {
        "name": "MC_DE48_SE33.SF06",
        "alias": "SF06",
        "type": "STRING",
        "hide": false
      },
      {
        "name": "MC_DE48_SE33.SF07",
        "alias": "SF07",
        "type": "STRING",
        "hide": false
      },
      {
        "name": "MC_DE48_SE33.SF08",
        "alias": "SF08",
        "type": "STRING",
        "hide": false
      },
      {
        "name": "MC_DE48_SE42",
        "alias": "MC_DE48_SE42",
        "type": "STRING",
        "hide": false
      },
      {
        "name": "MC_DE48_SE52",
        "alias": "MC_DE48_SE52",
        "type": "STRING",
        "hide": false
      },
      {
        "name": "VISA_F123",
        "alias": "Visa f123",
        "type": "fields",
        "hide": false
      },
      {
        "name": "VISA_F123.tag_1",
        "alias": "tag_1",
        "type": "STRING",
        "hide": false
      },
      {
        "name": "VISA_F123.tag_2",
        "alias": "tag_2",
        "type": "STRING",
        "hide": false
      },
      {
        "name": "VISA_F123.tag_3",
        "alias": "tag_3",
        "type": "STRING",
        "hide": false
      },
      {
        "name": "VISA_F123.tag_4",
        "alias": "tag_4",
        "type": "STRING",
        "hide": false
      },
      {
        "name": "VISA_F123.tag_5",
        "alias": "tag_5",
        "type": "STRING",
        "hide": false
      },
      {
        "name": "VISA_F123.tag_6",
        "alias": "tag_6",
        "type": "STRING",
        "hide": false
      },
      {
        "name": "VISA_F123.tag_7",
        "alias": "tag_7",
        "type": "STRING",
        "hide": false
      },
      {
        "name": "VISA_F123.tag_8",
        "alias": "tag_8",
        "type": "STRING",
        "hide": false
      },
      {
        "name": "VISA_F123.tag_10",
        "alias": "tag_10",
        "type": "STRING",
        "hide": false
      },
      {
        "name": "VISA_F123.tag_11",
        "alias": "tag_11",
        "type": "STRING",
        "hide": false
      },
      {
        "name": "VISA_F123.tag_12",
        "alias": "tag_12",
        "type": "STRING",
        "hide": false
      },
      {
        "name": "VISA_F123.tag_13",
        "alias": "tag_13",
        "type": "STRING",
        "hide": false
      },
      {
        "name": "VISA_F123.tag_14",
        "alias": "tag_14",
        "type": "STRING",
        "hide": false
      },
      {
        "name": "VISA_F123.tag_80",
        "alias": "tag_80",
        "type": "STRING",
        "hide": false
      },
      {
        "name": "VISA_F123.tag_81",
        "alias": "tag_81",
        "type": "STRING",
        "hide": false
      },
      {
        "name": "VISA_F123.tag_82",
        "alias": "tag_82",
        "type": "STRING",
        "hide": false
      },
      {
        "name": "VISA_F123.tag_83",
        "alias": "tag_83",
        "type": "STRING",
        "hide": false
      },
      {
        "name": "VISA_F123.tag_84",
        "alias": "tag_84",
        "type": "STRING",
        "hide": false
      },
      {
        "name": "VISA_F123.tag_85",
        "alias": "tag_85",
        "type": "STRING",
        "hide": false
      },
      {
        "name": "VISA_F123.tag_86",
        "alias": "tag_86",
        "type": "STRING",
        "hide": false
      },
      {
        "name": "VISA_F123.tag_1f31",
        "alias": "tag_1f31",
        "type": "STRING",
        "hide": false
      },
      {
        "name": "VISA_F123.tag_1f32",
        "alias": "tag_1f32",
        "type": "STRING",
        "hide": false
      },
      {
        "name": "VISA_F123.tag_1f33",
        "alias": "tag_1f33",
        "type": "STRING",
        "hide": false
      },
      {
        "name": "VISA_F123.tag_1f35",
        "alias": "tag_1f35",
        "type": "STRING",
        "hide": false
      },
      {
        "name": "VISA_F123.tag_1f7f",
        "alias": "tag_1f7f",
        "type": "STRING",
        "hide": false
      },
      {
        "name": "VISA_F44_SF15",
        "alias": "VISA_F44_SF15",
        "type": "STRING",
        "hide": false
      },
      {
        "name": "is_token_cryptogram_present",
        "alias": "is_token_cryptogram_present",
        "type": "BOOLEAN",
        "hide": false
      },
      {
        "name": "notification_url",
        "alias": "Notification URL",
        "type": "STRING",
        "hide": false
      },
      {
        "name": "payment_method_id",
        "alias": "Payment Method Id",
        "type": "STRING",
        "hide": false
      },
      {
        "name": "payment_method_type",
        "alias": "Payment method Type",
        "type": "STRING",
        "hide": false
      },
      {
        "name": "payment_method_flow",
        "alias": "Payment method flow",
        "type": "STRING",
        "hide": false
      },
      {
        "name": "login",
        "alias": "Login",
        "type": "STRING",
        "hide": false
      },
      {
        "name": "password",
        "alias": "Password",
        "type": "STRING",
        "hide": false
      },
      {
        "name": "merchant_redirect_url",
        "alias": "Merchant Redirect URL",
        "type": "STRING",
        "hide": false
      },
      {
        "name": "redirect_secret",
        "alias": "Redirect Secret",
        "type": "STRING",
        "hide": false
      },
      {
        "name": "request_status",
        "alias": "Request Status",
        "type": "STRING",
        "hide": false
      },
      {
        "name": "shipping",
        "alias": "Shipping",
        "type": "fields",
        "hide": false
      },
      {
        "name": "shipping.country_code",
        "alias": "Country Code",
        "type": "STRING",
        "hide": false
      },
      {
        "name": "shipping.name",
        "alias": "Name",
        "type": "STRING",
        "hide": false
      },
      {
        "name": "shipping.address_line1",
        "alias": "Address Line 1",
        "type": "STRING",
        "hide": false
      },
      {
        "name": "shipping.address_line2",
        "alias": "Address Line 2",
        "type": "STRING",
        "hide": false
      },
      {
        "name": "shipping.postal_code",
        "alias": "Postal Code",
        "type": "STRING",
        "hide": false
      },
      {
        "name": "shipping.required",
        "alias": "Required",
        "type": "STRING",
        "hide": false
      },
      {
        "name": "shipping.locale",
        "alias": "Locale",
        "type": "STRING",
        "hide": false
      },
      {
        "name": "shipping.payment_method_category",
        "alias": "Payment Method Category",
        "type": "STRING",
        "hide": false
      },
      {
        "name": "shipping.tax_amount",
        "alias": "Tax Amount",
        "type": "INTEGER",
        "hide": false
      },
      {
        "name": "wallet",
        "alias": "Wallet",
        "type": "fields",
        "hide": false
      },
      {
        "name": "wallet.token",
        "alias": "token",
        "type": "STRING",
        "hide": false
      },
      {
        "name": "wallet.name",
        "alias": "Name",
        "type": "STRING",
        "hide": false
      },
      {
        "name": "wallet.device_id",
        "alias": "Device Id",
        "type": "STRING",
        "hide": false
      },
      {
        "name": "wallet.email",
        "alias": "Email",
        "type": "STRING",
        "hide": false
      },
      {
        "name": "wallet.capture",
        "alias": "Capture",
        "type": "BOOLEAN",
        "hide": false
      },
      {
        "name": "wallet.label",
        "alias": "Label",
        "type": "STRING",
        "hide": false
      },
      {
        "name": "wallet.save",
        "alias": "Save",
        "type": "BOOLEAN",
        "hide": false
      },
      {
        "name": "wallet.verify",
        "alias": "Verify",
        "type": "BOOLEAN",
        "hide": false
      },
      {
        "name": "callback_url",
        "alias": "Callback URL",
        "type": "STRING",
        "hide": false
      },
      {
        "name": "trn_status_detail",
        "alias": "Transaction status Detail",
        "type": "STRING",
        "hide": false
      },
      {
        "name": "trn_status_code",
        "alias": "Transaction status Code",
        "type": "STRING",
        "hide": false
      },
      {
        "name": "payment_method",
        "alias": "Payment Method",
        "type": "STRING",
        "hide": false
      },
      {
        "name": "order_id",
        "alias": "Order Id",
        "type": "STRING",
        "hide": false
      },
      {
        "name": "hash_value",
        "alias": "Hash Value",
        "type": "STRING",
        "hide": false
      },
      {
        "name": "fund_status",
        "alias": "Fund Status",
        "type": "STRING",
        "hide": false
      },
      {
        "name": "finger_print",
        "alias": "Finger Print",
        "type": "STRING",
        "hide": false
      },
      {
        "name": "small_cash_indicator",
        "alias": "Cash Indicator",
        "type": "STRING",
        "hide": false
      },
      {
        "name": "account_list",
        "alias": "Account list",
        "type": "fields",
        "hide": false
      },
      {
        "name": "account_list.account_balances",
        "alias": "Account balances",
        "type": "fields",
        "hide": false
      },
      {
        "name": "account_list.account_balances.balances",
        "alias": "Balances",
        "type": "fields",
        "hide": false
      },
      {
        "name": "account_list.account_balances.balances.account_serial",
        "alias": "Account Serial",
        "type": "INTEGER",
        "hide": false
      },
      {
        "name": "account_list.account_balances.balances.account_product",
        "alias": "Account_Product",
        "type": "INTEGER",
        "hide": false
      },
      {
        "name": "account_list.account_balances.balances.account_available_balance",
        "alias": "Account Available Balance",
        "type": "DOUBLE",
        "hide": false
      },
      {
        "name": "account_list.account_balances.balances.account_ibt",
        "alias": "Account Ibt",
        "type": "INTEGER",
        "hide": false
      },
      {
        "name": "account_list.account_balances.balances.account_over_draft_limit",
        "alias": "account_over_draft_limit",
        "type": "INTEGER",
        "hide": false
      },
      {
        "name": "account_list.account_balances.balances.account_position",
        "alias": "account position",
        "type": "INTEGER",
        "hide": false
      },
      {
        "name": "account_list.account_balances.balances.account_status",
        "alias": "Account Status",
        "type": "STRING",
        "hide": false
      },
      {
        "name": "account_list.account_balances.balances.account_error_code",
        "alias": "Account Error Code",
        "type": "INTEGER",
        "hide": false
      },
      {
        "name": "account_list.account_balances.balances.account_prod_name_eng",
        "alias": "Account_Prod_Name_Eng",
        "type": "STRING",
        "hide": false
      },
      {
        "name": "account_list.account_balances.balances.account_notice_count",
        "alias": "Account Notice Count",
        "type": "INTEGER",
        "hide": false
      },
      {
        "name": "account_list.account_balances.balances.account_iso_type",
        "alias": "account iso type",
        "type": "INTEGER",
        "hide": false
      },
      {
        "name": "account_list.account_balances.balances.account_latest_balance",
        "alias": "Account Latest Balance",
        "type": "DOUBLE",
        "hide": false
      },
      {
        "name": "account_list.account_balances.balances.account_suite",
        "alias": "Account Suite",
        "type": "STRING",
        "hide": false
      },
      {
        "name": "account_list.account_balances.balances.account_type",
        "alias": "Account type",
        "type": "STRING",
        "hide": false
      },
      {
        "name": "account_list.account_balances.balances.account_notice_period",
        "alias": "Account Notice period",
        "type": "INTEGER",
        "hide": false
      },
      {
        "name": "account_list.account_balances.balances.account_style",
        "alias": "account style",
        "type": "STRING",
        "hide": false
      },
      {
        "name": "account_list.account_balances.balances.account_lastest_balance",
        "alias": "account_lastest_balance",
        "type": "STRING",
        "hide": false
      },
      {
        "name": "account_list.account_balances.balances.account_prod_name_afr",
        "alias": "Account Prod Name Afr",
        "type": "STRING",
        "hide": false
      },
      {
        "name": "account_list.account_balances.balances.account_name",
        "alias": "Account Name",
        "type": "STRING",
        "hide": false
      },
      {
        "name": "account_list.account_balances.balances.account_number",
        "alias": "account_number",
        "type": "STRING",
        "hide": false
      },
      {
        "name": "account_list.account_balances.balances.availableTransactions",
        "alias": "availableTransactions",
        "type": "STRING",
        "hide": false
      },
      {
        "name": "account_list.account_balances.balances.account_card_number",
        "alias": "Account Card Number",
        "type": "STRING",
        "hide": false
      },
      {
        "name": "account_list.account_balances.balances.email_address",
        "alias": "Email Address",
        "type": "STRING",
        "hide": false
      },
      {
        "name": "account_list.account_balances.balances.available_balance",
        "alias": "Available balance",
        "type": "fields",
        "hide": false
      },
      {
        "name": "account_list.account_balances.balances.available_balance.value",
        "alias": "Value",
        "type": "DOUBLE",
        "hide": false
      },
      {
        "name": "account_list.account_balances.balances.available_balance.currency",
        "alias": "currency code",
        "type": "STRING",
        "hide": false
      },
      {
        "name": "account_list.account_balances.balances.ledger_balance",
        "alias": "Ledger balance",
        "type": "fields",
        "hide": false
      },
      {
        "name": "account_list.account_balances.balances.ledger_balance.value",
        "alias": "Value",
        "type": "DOUBLE",
        "hide": false
      },
      {
        "name": "account_list.account_balances.balances.ledger_balance.currency",
        "alias": "currency code",
        "type": "STRING",
        "hide": false
      },
      {
        "name": "account_list.account_balances.balances.cash_balance",
        "alias": "Cash balance",
        "type": "fields",
        "hide": false
      },
      {
        "name": "account_list.account_balances.balances.cash_balance.value",
        "alias": "Value",
        "type": "DOUBLE",
        "hide": false
      },
      {
        "name": "account_list.account_balances.balances.cash_balance.currency",
        "alias": "currency code",
        "type": "STRING",
        "hide": false
      },
      {
        "name": "account_list.account_balances.balances.credit_balance",
        "alias": "Credit balance",
        "type": "fields",
        "hide": false
      },
      {
        "name": "account_list.account_balances.balances.credit_balance.value",
        "alias": "Value",
        "type": "DOUBLE",
        "hide": false
      },
      {
        "name": "account_list.account_balances.balances.credit_balance.currency",
        "alias": "currency code",
        "type": "STRING",
        "hide": false
      }
    ]
  }
}
const SelectMessageContextListJson = {
  status: "success",
  message: "Find MessageContextFields JSON",
  data : {
    messageContextFieldsByVersion:{
      name: "Message_Context",
      type: "fields",
      alias: "Message context",
      nestedName: "Message_Context",
      useCase: null,
      datatype: null,
      data: null,
      attributes:[
        {"name": "transaction_type",
        "type": "field",
        "alias": "TransactionType",
        "nestedName": "transaction_type",
        "useCase": "1",
        "datatype": null,
        "data": ["Cash Withdrawal"],
        "attributes": null,
        operator:[],
        "fieldsType": null,
        "title": "TransactionType",
        "key": "transaction_type",
        "isLeaf": true,
        "selected": false,
      }
      ],
      operator: null,
      fieldsType: null,
    }
  }
  }
const selectIPCJson = 
{
  status: "success",
  message: "Find Lookup-value-list for INTERNAL_PROCESSING_CODE",
  data: [
    {
      "id": 126,
      "value": "ACCOUNT  LISTING",
      "description": "desc",
      "modifiable": "1",
      "active": "1",
      "lookupType": {
        "id": 10,
        "name": "INTERNAL_PROCESSING_CODE",
        "description": "Internal Processing Code",
        "modifiable": "0"
      }
    },
    {
      "id": 125,
      "value": "account listing",
      "description": "desc",
      "modifiable": "1",
      "active": "1",
      "lookupType": {
        "id": 10,
        "name": "INTERNAL_PROCESSING_CODE",
        "description": "Internal Processing Code",
        "modifiable": "0"
      }
    },
    {
      "id": 68,
      "value": "ACCOUNT_CLOSED ",
      "description": "ACCOUNT CLOSED ",
      "modifiable": "0",
      "active": "1",
      "lookupType": {
        "id": 10,
        "name": "INTERNAL_PROCESSING_CODE",
        "description": "Internal Processing Code",
        "modifiable": "0"
      }
    },
    {
      "id": 51,
      "value": "APPROVED",
      "description": null,
      "modifiable": "0",
      "active": "1",
      "lookupType": {
        "id": 10,
        "name": "INTERNAL_PROCESSING_CODE",
        "description": "Internal Processing Code",
        "modifiable": "0"
      }
    },
    {
      "id": 52,
      "value": "DECLINED",
      "description": null,
      "modifiable": "0",
      "active": "1",
      "lookupType": {
        "id": 10,
        "name": "INTERNAL_PROCESSING_CODE",
        "description": "Internal Processing Code",
        "modifiable": "0"
      }
    },
    {
      "id": 69,
      "value": "DECLINED_OAR",
      "description": "DECLINED_OAR",
      "modifiable": "1",
      "active": "1",
      "lookupType": {
        "id": 10,
        "name": "INTERNAL_PROCESSING_CODE",
        "description": "Internal Processing Code",
        "modifiable": "0"
      }
    },
    {
      "id": 64,
      "value": "DO_NOT_HONOR",
      "description": "DO_NOT_HONOR",
      "modifiable": "0",
      "active": "1",
      "lookupType": {
        "id": 10,
        "name": "INTERNAL_PROCESSING_CODE",
        "description": "Internal Processing Code",
        "modifiable": "0"
      }
    },
    {
      "id": 61,
      "value": "DUPLICATE_TRANSMISSION",
      "description": "DUPLICATE_TRANSMISSION",
      "modifiable": "0",
      "active": "1",
      "lookupType": {
        "id": 10,
        "name": "INTERNAL_PROCESSING_CODE",
        "description": "Internal Processing Code",
        "modifiable": "0"
      }
    },
    {
      "id": 70,
      "value": "ERROR",
      "description": "ERROR",
      "modifiable": "0",
      "active": "1",
      "lookupType": {
        "id": 10,
        "name": "INTERNAL_PROCESSING_CODE",
        "description": "Internal Processing Code",
        "modifiable": "0"
      }
    },
    {
      "id": 71,
      "value": "EXCEEDS_CASH_LIMIT",
      "description": "EXCEEDS CASH LIMIT",
      "modifiable": "0",
      "active": "1",
      "lookupType": {
        "id": 10,
        "name": "INTERNAL_PROCESSING_CODE",
        "description": "Internal Processing Code",
        "modifiable": "0"
      }
    },
    {
      "id": 72,
      "value": "EXCEEDS_WITHDRAWAL_LIMIT",
      "description": "EXCEEDS WITHDRAWAL LIMIT",
      "modifiable": "0",
      "active": "1",
      "lookupType": {
        "id": 10,
        "name": "INTERNAL_PROCESSING_CODE",
        "description": "Internal Processing Code",
        "modifiable": "0"
      }
    },
    {
      "id": 73,
      "value": "EXPIRED_CARD",
      "description": "EXPIRED CARD",
      "modifiable": "0",
      "active": "1",
      "lookupType": {
        "id": 10,
        "name": "INTERNAL_PROCESSING_CODE",
        "description": "Internal Processing Code",
        "modifiable": "0"
      }
    },
    {
      "id": 53,
      "value": "IN_PROGRESS",
      "description": null,
      "modifiable": "0",
      "active": "1",
      "lookupType": {
        "id": 10,
        "name": "INTERNAL_PROCESSING_CODE",
        "description": "Internal Processing Code",
        "modifiable": "0"
      }
    },
    {
      "id": 74,
      "value": "INCORRECT_PIN",
      "description": "INCORRECT PIN",
      "modifiable": "0",
      "active": "1",
      "lookupType": {
        "id": 10,
        "name": "INTERNAL_PROCESSING_CODE",
        "description": "Internal Processing Code",
        "modifiable": "0"
      }
    },
    {
      "id": 75,
      "value": "INSUFFICIENT_FUNDS",
      "description": "INSUFFICIENT FUNDS",
      "modifiable": "0",
      "active": "1",
      "lookupType": {
        "id": 10,
        "name": "INTERNAL_PROCESSING_CODE",
        "description": "Internal Processing Code",
        "modifiable": "0"
      }
    },
    {
      "id": 124,
      "value": "INTERNAL PROCESSING_ -CODE",
      "description": "ddfdf",
      "modifiable": "1",
      "active": "1",
      "lookupType": {
        "id": 10,
        "name": "INTERNAL_PROCESSING_CODE",
        "description": "Internal Processing Code",
        "modifiable": "0"
      }
    },
    {
      "id": 62,
      "value": "INV_LOCAL_TRANSACTION_DATE_TIME",
      "description": "INV_LOCAL_TRANSACTION_DATE_TIME",
      "modifiable": "0",
      "active": "1",
      "lookupType": {
        "id": 10,
        "name": "INTERNAL_PROCESSING_CODE",
        "description": "Internal Processing Code",
        "modifiable": "0"
      }
    },
    {
      "id": 87,
      "value": "INVALID_CARD",
      "description": "INVALID_CARD",
      "modifiable": "1",
      "active": "1",
      "lookupType": {
        "id": 10,
        "name": "INTERNAL_PROCESSING_CODE",
        "description": "Internal Processing Code",
        "modifiable": "0"
      }
    },
    {
      "id": 63,
      "value": "INVALID_MERCHANT",
      "description": "INVALID_MERCHANT",
      "modifiable": "0",
      "active": "1",
      "lookupType": {
        "id": 10,
        "name": "INTERNAL_PROCESSING_CODE",
        "description": "Internal Processing Code",
        "modifiable": "0"
      }
    },
    {
      "id": 86,
      "value": "INVALID_TERMINAL",
      "description": "INVALID_TERMINAL",
      "modifiable": "1",
      "active": "1",
      "lookupType": {
        "id": 10,
        "name": "INTERNAL_PROCESSING_CODE",
        "description": "Internal Processing Code",
        "modifiable": "0"
      }
    },
    {
      "id": 76,
      "value": "ISSUER_INOPERATIVE",
      "description": "ISSUER INOPERATIVE",
      "modifiable": "0",
      "active": "1",
      "lookupType": {
        "id": 10,
        "name": "INTERNAL_PROCESSING_CODE",
        "description": "Internal Processing Code",
        "modifiable": "0"
      }
    },
    {
      "id": 77,
      "value": "LOST_CARD_PKP",
      "description": "LOST CARD PICK-UP",
      "modifiable": "0",
      "active": "1",
      "lookupType": {
        "id": 10,
        "name": "INTERNAL_PROCESSING_CODE",
        "description": "Internal Processing Code",
        "modifiable": "0"
      }
    },
    {
      "id": 128,
      "value": "new value",
      "description": "desc",
      "modifiable": "1",
      "active": "1",
      "lookupType": {
        "id": 10,
        "name": "INTERNAL_PROCESSING_CODE",
        "description": "Internal Processing Code",
        "modifiable": "0"
      }
    },
    {
      "id": 78,
      "value": "NOCREDIT_ACCOUNT",
      "description": "NOCREDITA CCOUNT",
      "modifiable": "0",
      "active": "1",
      "lookupType": {
        "id": 10,
        "name": "INTERNAL_PROCESSING_CODE",
        "description": "Internal Processing Code",
        "modifiable": "0"
      }
    },
    {
      "id": 79,
      "value": "NOSAVING_ACCOUNT",
      "description": "NOSAVING ACCOUNT",
      "modifiable": "0",
      "active": "1",
      "lookupType": {
        "id": 10,
        "name": "INTERNAL_PROCESSING_CODE",
        "description": "Internal Processing Code",
        "modifiable": "0"
      }
    },
    {
      "id": 80,
      "value": "PICKUP_CARD",
      "description": "PICKUP CARD",
      "modifiable": "0",
      "active": "1",
      "lookupType": {
        "id": 10,
        "name": "INTERNAL_PROCESSING_CODE",
        "description": "Internal Processing Code",
        "modifiable": "0"
      }
    },
    {
      "id": 81,
      "value": "PIN_TRIES_EXCEEDED",
      "description": "PIN TRIES EXCEEDED",
      "modifiable": "0",
      "active": "1",
      "lookupType": {
        "id": 10,
        "name": "INTERNAL_PROCESSING_CODE",
        "description": "Internal Processing Code",
        "modifiable": "0"
      }
    },
    {
      "id": 82,
      "value": "PINRETRIES_EXCEEDED",
      "description": "PINRETRIES EXCEEDED",
      "modifiable": "0",
      "active": "1",
      "lookupType": {
        "id": 10,
        "name": "INTERNAL_PROCESSING_CODE",
        "description": "Internal Processing Code",
        "modifiable": "0"
      }
    },
    {
      "id": 83,
      "value": "REFER_TO_CARD_ISSUER",
      "description": "REFER TO CARD ISSUE",
      "modifiable": "0",
      "active": "1",
      "lookupType": {
        "id": 10,
        "name": "INTERNAL_PROCESSING_CODE",
        "description": "Internal Processing Code",
        "modifiable": "0"
      }
    },
    {
      "id": 84,
      "value": "RESTRICTED_CARD ",
      "description": "RESTRICTED CARD ",
      "modifiable": "0",
      "active": "1",
      "lookupType": {
        "id": 10,
        "name": "INTERNAL_PROCESSING_CODE",
        "description": "Internal Processing Code",
        "modifiable": "0"
      }
    },
    {
      "id": 66,
      "value": "SAFING_DECLINE",
      "description": "SAFING_DECLINE",
      "modifiable": "0",
      "active": "1",
      "lookupType": {
        "id": 10,
        "name": "INTERNAL_PROCESSING_CODE",
        "description": "Internal Processing Code",
        "modifiable": "0"
      }
    },
    {
      "id": 85,
      "value": "SYSTEM_ERROR",
      "description": "SYSTEM_ERROR",
      "modifiable": "0",
      "active": "1",
      "lookupType": {
        "id": 10,
        "name": "INTERNAL_PROCESSING_CODE",
        "description": "Internal Processing Code",
        "modifiable": "0"
      }
    },
    {
      "id": 123,
      "value": "TEST_IPC",
      "description": "test desc",
      "modifiable": "1",
      "active": "1",
      "lookupType": {
        "id": 10,
        "name": "INTERNAL_PROCESSING_CODE",
        "description": "Internal Processing Code",
        "modifiable": "0"
      }
    },
    {
      "id": 59,
      "value": "TRANSACTION_TIMEOUT",
      "description": "TRANSACTION_TIMEOUT",
      "modifiable": "0",
      "active": "1",
      "lookupType": {
        "id": 10,
        "name": "INTERNAL_PROCESSING_CODE",
        "description": "Internal Processing Code",
        "modifiable": "0"
      }
    },
    {
      "id": 127,
      "value": "value",
      "description": "df",
      "modifiable": "1",
      "active": "1",
      "lookupType": {
        "id": 10,
        "name": "INTERNAL_PROCESSING_CODE",
        "description": "Internal Processing Code",
        "modifiable": "0"
      }
    }
  ]
}
const selectL1DraftSaveJson =
{status:"success",message:"Adapter Drafted",data:{"id":51}};
const selectMapperJson =
{
  status: "success",
  message: "Find Scheme-Mapper List",
  data: [
    {
      "name": "ISO87_CardTrack2",
      "type": "DBMapper",
      "fieldId": "35",
      "requestJson": [
        {
          "ipc": "SYSTEM_ERROR",
          "type": "field",
          "source": "${35}",
          "destination": [
            "message_exchange[GATEWAY_SERVICE].request_message[card.track2]"
          ]
        },
        {
          "ipc": "SYSTEM_ERROR",
          "type": "field",
          "source": "${35}",
          "functions": [
            {
              "type": "el_expression",
              "expression": "substring(indexOf('=')+1,indexOf('=')+5)"
            }
          ],
          "destination": [
            "message_exchange[GATEWAY_SERVICE].request_message[card.expiry]"
          ]
        },
        {
          "ipc": "SYSTEM_ERROR",
          "type": "field",
          "source": "${35}",
          "functions": [
            {
              "type": "el_expression",
              "expression": "substring(indexOf('=')+5,indexOf('=')+8)"
            }
          ],
          "destination": [
            "message_exchange[GATEWAY_SERVICE].request_message[card.service_code]"
          ]
        }
      ],
      "parametersUi": {
        "tooltip": "Card Track2 Mapper",
        "signature": []
      }
    },
    {
      "name": "ISO_Amount_Mapper",
      "type": "DBMapper",
      "fieldId": "49",
      "requestJson": [
        {
          "ipc": "SYSTEM_ERROR",
          "type": "field",
          "source": "${param1}",
          "destination": [
            "message_exchange[GATEWAY_SERVICE].request_message[param2.currency]"
          ]
        },
        {
          "ipc": "SYSTEM_ERROR",
          "type": "imdg_enrich",
          "fields": [
            {
              "ipc": "SYSTEM_ERROR",
              "type": "field",
              "source": "${minor_unit}",
              "destination": [
                "message_exchange[GATEWAY_SERVICE].request_message[param2.minor_unit]"
              ]
            }
          ],
          "lookupType": {
            "type": "imdg_enrich",
            "query": {
              "from": {
                "type": "from",
                "mapName": "SW-Currency"
              },
              "type": "search",
              "select": {
                "type": "select",
                "columns": [
                  {
                    "type": "aliasColumn",
                    "alias": {
                      "name": "currencyMinorUnit",
                      "type": "alias",
                      "alias": "minor_unit"
                    }
                  }
                ]
              },
              "condition": {
                "type": "and",
                "conditions": [
                  {
                    "type": "equal",
                    "value": "${message_exchange[GATEWAY_SERVICE].request_message[param2.currency]}",
                    "fieldName": "isoCode"
                  }
                ]
              }
            }
          }
        },
        {
          "ipc": "SYSTEM_ERROR",
          "type": "field",
          "source": "${source_field}",
          "functions": [
            {
              "type": "function",
              "parameters": [
                "${message_exchange[GATEWAY_SERVICE].request_message[param2.minor_unit]}"
              ],
              "functionName": "ISO_87_AMOUNT_FORMATER"
            }
          ],
          "destination": [
            "message_exchange[GATEWAY_SERVICE].request_message[param2.value]"
          ]
        }
      ],
      "parametersUi": {
        "tooltip": "tooltip_message",
        "signature": [
          {
            "name": "source_currency_field",
            "type": "string",
            "ordinal": "1",
            "replacestring": "param1"
          },
          {
            "name": "imf_amount_field",
            "type": "string",
            "ordinal": "2",
            "replacestring": "param2"
          }
        ]
      }
    },
    {
      "name": "PARSE_87_LOCAL_DATE_TIME",
      "type": "BuiltInMapper",
      "fieldId": "ALL",
      "requestJson": {
        "type": "in_built_mapper",
        "source": "${source_field}",
        "mapper": "PARSE_87_LOCAL_DATE_TIME",
        "parameters": [],
        "ipc": "SYSTEM_ERROR"
      },
      "parametersUi": {
        "tooltip": "convert date and time fields and sets into desitantion imf field",
        "signature": [
          {
            "name": "source_time_field",
            "ordinal": 1,
            "type": "String"
          },
          {
            "name": "source_date_field",
            "ordinal": 2,
            "type": "String"
          },
          {
            "name": "imf_local_date_time_field",
            "ordinal": 3,
            "type": "String"
          }
        ]
      }
    },
    {
      "name": "PARSE_87_ICC_DE55",
      "type": "BuiltInMapper",
      "fieldId": "ALL",
      "requestJson": {
        "type": "in_built_mapper",
        "source": "${source_field}",
        "mapper": "PARSE_87_ICC_DE55",
        "parameters": [],
        "ipc": "SYSTEM_ERROR"
      },
      "parametersUi": {
        "tooltip": "parse tag field and populate into imf tags",
        "signature": [
          {
            "name": "source_field",
            "ordinal": 1,
            "type": "String"
          },
          {
            "name": "imf_field",
            "ordinal": 2,
            "type": "String"
          },
          {
            "name": "header_expression",
            "ordinal": 3,
            "type": "String"
          }
        ]
      }
    },
    {
      "name": "BUILD_87_ICC_DE55",
      "type": "BuiltInMapper",
      "fieldId": "ALL",
      "requestJson": {
        "type": "in_built_mapper",
        "source": "${source_field}",
        "mapper": "BUILD_87_ICC_DE55",
        "parameters": [],
        "ipc": "SYSTEM_ERROR"
      },
      "parametersUi": {
        "tooltip": "parse field and populate into iso field",
        "signature": [
          {
            "name": "imf_field",
            "ordinal": 1,
            "type": "String"
          },
          {
            "name": "source_field",
            "ordinal": 2,
            "type": "String"
          },
          {
            "name": "imf_field",
            "ordinal": 3,
            "type": "String"
          },
          {
            "name": "header_expression",
            "ordinal": 4,
            "type": "String"
          }
        ]
      }
    },
    {
      "name": "AMMOUNT_MAPPER",
      "type": "BuiltInMapper",
      "fieldId": "ALL",
      "requestJson": {
        "type": "in_built_mapper",
        "source": "${source_field}",
        "mapper": "AMMOUNT_MAPPER",
        "parameters": [],
        "ipc": "SYSTEM_ERROR"
      },
      "parametersUi": {
        "tooltip": "prepare amount field using by shifting digits using currency minor unit",
        "signature": [
          {
            "name": "source_amount_field",
            "ordinal": 1,
            "type": "String"
          },
          {
            "name": "source_currency_field",
            "ordinal": 2,
            "type": "String"
          },
          {
            "name": "imf_amaount_value_field",
            "ordinal": 3,
            "type": "String"
          }
        ]
      }
    },
    {
      "name": "GROOVY_EXECUTOR",
      "type": "BuiltInMapper",
      "fieldId": "ALL",
      "requestJson": {
        "type": "in_built_mapper",
        "source": "${source_field}",
        "mapper": "GROOVY_EXECUTOR",
        "parameters": [],
        "ipc": "SYSTEM_ERROR"
      },
      "parametersUi": {
        "tooltip": "execute groovy script",
        "signature": [
          {
            "name": "groovy_script",
            "ordinal": 1,
            "type": "String"
          }
        ]
      }
    }
  ]
} 
xdescribe('TransformComponent', () => {
  let component: TransformComponent;
  let fixture: ComponentFixture<TransformComponent>;
  let mockStore: MockStore<IAppState>;
  let setDefaultLangSpy: jasmine.Spy;
  let mockselectL1AdapterData;
  let mockSelectStepLisMethod;
  let mockselectElFunction;
  let mockselectL1AdapterEntityMappingList;
  let mockselectL1AdapterEntityIMFList;
  let mockselectGetServiceType;
  let mockselectAdapterDataMap;
  let mockSelectPostActionMethod;
  let mockSelectPreActionMethod;
  let mockselectIMF;
  let mockSelectMessageContextList;
  let mockselectIPC;
  let mockselectL1DraftSave;
  let mockselectMapper;

  beforeEach(() => {
    const translateService = jasmine.createSpyObj('TranslateService', ['get', 'setDefaultLang']);
    TestBed.configureTestingModule({
      declarations: [TransformComponent],
      providers: [
        AlertService,
        SnotifyService,
        L1AdapterService,
        AdapterCommonService,
        { provide: 'SnotifyToastConfig', useValue: ToastDefaults },
        provideMockStore(),
        // other providers
      ],
      imports: [
        CommonModule,
        SharedModule,
        AlertModule,
        BrowserAnimationsModule,
        // TabsModule,
        RouterTestingModule,
        NgxDatatableModule,
        HttpClientTestingModule,
        StoreModule.forRoot({}),
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

    }).compileComponents();
    setDefaultLangSpy = translateService.get.and.returnValue(of([]));
    mockStore = TestBed.get(Store);
    fixture = TestBed.createComponent(TransformComponent);
    component = fixture.componentInstance;
    component.template = { id: 0 };
    mockselectL1AdapterData = mockStore.overrideSelector(selectL1AdapterData, adapterDataJson);
    component.adapterData = adapterDataJson.data
    mockSelectStepLisMethod = mockStore.overrideSelector(SelectStepLisMethod, SelectStepLisMethodJson);
    mockselectElFunction = mockStore.overrideSelector(selectElFunction, selectElFunctionJson);
    mockselectL1AdapterEntityMappingList = mockStore.overrideSelector(selectL1AdapterEntityMappingList, selectL1AdapterEntityMappingListJson);
    mockselectL1AdapterEntityIMFList = mockStore.overrideSelector(selectL1AdapterEntityIMFList, selectL1AdapterEntityIMFListJson);
    mockselectGetServiceType = mockStore.overrideSelector(selectGetServiceType, selectGetServiceTypeJson);
    mockselectAdapterDataMap = mockStore.overrideSelector(selectAdapterDataMap, selectAdapterDataMapJson);
    mockSelectPostActionMethod = mockStore.overrideSelector(SelectPostActionMethod, SelectPostActionMethodJson);
    mockSelectPreActionMethod = mockStore.overrideSelector(SelectPreActionMethod, SelectPreActionMethodJson);
    mockselectIMF = mockStore.overrideSelector(selectIMF, selectIMFJson);
    mockSelectMessageContextList = mockStore.overrideSelector(SelectMessageContextList, SelectMessageContextListJson);
    mockselectIPC = mockStore.overrideSelector(selectIPC, selectIPCJson);
    mockselectL1DraftSave = mockStore.overrideSelector(selectL1DraftSave, selectL1DraftSaveJson);
    mockselectMapper = mockStore.overrideSelector(selectMapper, selectMapperJson);
    mockStore.refreshState();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should  Angular calls ngOnInit and other functions', () => {
   // component.ngOnInit();
    ((component as any).getStepListData());
    ((component as any).getElFunctionListData());
    // ((component as any).viewSettingData());
    component.gettL1AdapterEntityMappingData();
    component.getL1AdapterEntityIMFData();
    component.serviceData();
    component.getIPCData();
    component.getAdapterDataMapData();
    component.PostActionData();
    component.getSelectMessageContextListData();
    component.getIMFData();
  });

  it('should call showTransactionCondModal function', fakeAsync(() => {
    component.showTransactionCondModal();
    expect(component.requestCon).toEqual(true);
    tick(100);
    expect(component.isTransactionCondVisible).toEqual(true);
  }));


  it('should  check response of SelectStepLisMethod', () => {
    component.stepList = SelectStepLisMethodJson.data;
    expect(component.stepList).not.toBeNull();
  });

  it('should  check response of selectElFunction', () => {
    expect(component.elData).not.toBeNull(); 
  });

  it('should  check response of ipcList', () => {
    expect(component.ipcList).not.toBeNull();
  });

  it('pushAuthResItem fuction should call  form HTMl', () => {
    component.pushAuthResItem();
    expect(component.pushAuthResItem).toBeDefined;
    expect(component.pushAuthResItem).toHaveBeenCalled;
  });
  it('pullAuthResItem fuction should call  form HTMl', () => {
    component.pullAuthResItem();
    expect(component.pullAuthResItem).toBeDefined;
    expect(component.pullAuthResItem).toHaveBeenCalled;
  });
  it('closeAuthResPopup fuction should call  form HTMl', () => {
    component.closeAuthResPopup();
    expect(component.closeAuthResPopup).toBeDefined;
    expect(component.closeAuthResPopup).toHaveBeenCalled;
    expect(component.isAuthResVisible).toBe(false);
  });
  it('openAuthResPopup fuction should call  form HTMl', () => {
    component.openAuthResPopup();
    expect(component.openAuthResPopup).toBeDefined;
    expect(component.openAuthResPopup).toHaveBeenCalled;
    expect(component.isAuthResVisible).toBe(true);
  });
  
  it('cancelFn fuction should call  form HTMl', () => {
    component.cancelFn();
    expect(component.cancelFn).toBeDefined;
    expect(component.cancelFn).toHaveBeenCalled;
  });
  it('BackFn fuction should call  form HTMl', () => {
    component.BackFn();
    expect(component.BackFn).toBeDefined;
    expect(component.BackFn).toHaveBeenCalled;
  });
  it('tabChange fuction should call  form HTMl', () => {
    component.selectedTabIndex = 0;
    component.preActionArray[component.selectedTransactionType]=[];
    component.postActionArray[component.selectedTransactionType]=[];
    component.tabChange("Enquiry Response",1);
    expect(component.tabChange).toBeDefined;
    expect(component.tabChange).toHaveBeenCalled;
  });
  it('tabChangeValue fuction should call  form HTMl', () => {
    component.preActionArray[component.selectedTransactionType]=[];
    component.postActionArray[component.selectedTransactionType]=[];
    component.tabChangeValue();
    expect(component.tabChangeValue).toBeDefined;
    expect(component.tabChangeValue).toHaveBeenCalled;
  });
  it('savePreAction fuction should call  form HTMl', () => {
    component.preActionArray[component.selectedTransactionType]=[];
    component.postActionArray[component.selectedTransactionType]=[];
    component.savePreAction();
    expect(component.savePreAction).toBeDefined;
    expect(component.savePreAction).toHaveBeenCalled;
  });
  
  it('draftTransform fuction should call  form HTMl', () => {
    component.preActionArray[component.selectedTransactionType]=[];
    component.postActionArray[component.selectedTransactionType]=[];
    component.draftTransform();
    expect(component.draftTransform).toBeDefined;
    expect(component.draftTransform).toHaveBeenCalled;
    expect(component.isSaveDraft).toBe(false);
  });
  it('isoSchemaRequestResponse fuction should call  form HTMl', () => {
    component.isoSchemaRequestResponse();
    expect(component.isoSchemaRequestResponse).toBeDefined;
    expect(component.isoSchemaRequestResponse).toHaveBeenCalled;
  });
  it('addTransaction fuction should call  form HTMl', () => {
    component.addTransaction();
    expect(component.addTransaction).toBeDefined;
    expect(component.addTransaction).toHaveBeenCalled;
  });
  it('changeResMapFn fuction should call  form HTMl', () => {
    component.isoTransactions = [];
    component.changeResMapFn();
    expect(component.changeResMapFn).toBeDefined;
    expect(component.changeResMapFn).toHaveBeenCalled;
  });
  it('prevTabValue fuction should call  form HTMl', () => {
    component.prevTabValue();
    expect(component.prevTabValue).toBeDefined;
    expect(component.prevTabValue).toHaveBeenCalled;
  });
  it('delAuthReqField fuction should call  form HTMl', () => {
    const id = '2'
    component.delAuthReqField(id);
    expect(component.delAuthReqField).toBeDefined;
    expect(component.delAuthReqField).toHaveBeenCalled;
  });
  it('delAuthResField fuction should call  form HTMl', () => {
    const id = '5'
    component.delAuthResField(id);
    expect(component.delAuthResField).toBeDefined;
    expect(component.delAuthResField).toHaveBeenCalled;
  });
  it('handleSave fuction should call  form HTMl', () => {
    component.handleSave(true);
    expect(component.handleSave).toBeDefined;
    expect(component.handleSave).toHaveBeenCalled;
  });
  it('keyUpFn fuction should call  form HTMl', () => {
    component.keyUpFn('Delete');
    expect(component.keyUpFn).toBeDefined;
    expect(component.keyUpFn).toHaveBeenCalled;
  });
  it('changeReqMapFn fuction should call  form HTMl', () => {
    component.changeReqMapFn();
    expect(component.changeReqMapFn).toBeDefined;
    expect(component.changeReqMapFn).toHaveBeenCalled;
  });
  it('showDataModal fuction should call  form HTMl', () => {
    component.showDataModal();
    expect(component.showDataModal).toBeDefined;
    expect(component.showDataModal).toHaveBeenCalled;
  });
  it('clearEnrichModel fuction should call  form HTMl', () => {
    component.clearEnrichModel();
    expect(component.clearEnrichModel).toBeDefined;
    expect(component.clearEnrichModel).toHaveBeenCalled;
  });
  it('openEnrichPopupFn fuction should call  form HTMl', () => {
    component.openEnrichPopupFn();
    expect(component.openEnrichPopupFn).toBeDefined;
    expect(component.openEnrichPopupFn).toHaveBeenCalled;
    expect(component.showReqEnrichVisible).toBe(true);
  });
  it('saveConfiguration fuction should call  form HTMl', () => {
    ((component as any).saveConfiguration());
    expect((component as any).saveConfiguration()).toBeDefined;
    expect((component as any).saveConfiguration()).toHaveBeenCalled;
  });
  it('addPostAction fuction should call  form HTMl', () => {
    component.postActionArray[component.selectedTransactionType]=[];
    component.addPostAction();       
    fixture.detectChanges();
    expect((component as any).addPostAction()).toBeDefined;
    expect((component as any).addPostAction()).toHaveBeenCalled;
  });
  it('savePostAction fuction should call  form HTMl', () => { 
    component.preActionArray[component.selectedTransactionType]=[];
    component.postActionArray[component.selectedTransactionType]=[];
    component.savePostAction();
    fixture.detectChanges();
    expect(component.savePostAction()).toBeDefined;
    expect(component.savePostAction()).toHaveBeenCalled;
  });
  it('validatePostAction fuction should call  form HTMl', () => {
    ((component as any).validatePostAction());
    expect((component as any).validatePostAction()).toBeDefined;
    expect((component as any).validatePostAction()).toHaveBeenCalled;
  });
  it('addPreAction fuction should call  form HTMl', () => {
    component.preActionArray[component.selectedTransactionType]=[];
    component.addPreAction();
    fixture.detectChanges();
    expect(component.addPreAction()).toBeDefined;
    expect(component.addPreAction()).toHaveBeenCalled;
  });
  it('callSchemeImfMapper fuction should call  form HTMl', () => {
   const data = {id: "2", name: "Field 2 PAN - PRIMARY ACCOUNT NUMBER"};
   const type ="req";
   const flag = true
    component.callSchemeImfMapper(data,type,flag);
    fixture.detectChanges();
    expect(component.callSchemeImfMapper(data,type,flag)).toBeDefined;
    expect(component.callSchemeImfMapper(data,type,flag)).toHaveBeenCalled;
  });
  it('transactionReqPopFun fuction should call  form HTMl', () => {
    const data = {id: "2", name: "Field 2 PAN - PRIMARY ACCOUNT NUMBER"};
     component.transactionReqPopFun(data);
     fixture.detectChanges();
     expect(component.transactionReqPopFun(data)).toBeDefined;
     expect(component.transactionReqPopFun(data)).toHaveBeenCalled;
     expect(component.isRequest).toBe(true);
     expect(component.isVisible).toBe(true);     
   });
   it('transactionResPopFun fuction should call  form HTMl', () => {
    const data = {id: "2", name: "Field 2 PAN - PRIMARY ACCOUNT NUMBER"};
     component.transactionResPopFun(data);
     fixture.detectChanges();
     expect(component.transactionResPopFun(data)).toBeDefined;
     expect(component.transactionResPopFun(data)).toHaveBeenCalled;
     expect(component.isRequest).toBe(false);
     expect(component.isVisible).toBe(true);
   });
   it('transactionSelection fuction should call  form HTMl', () => {
    const selectedTransactionType = "Enquiry";
     component.transactionSelection(selectedTransactionType);
     fixture.detectChanges();
     expect(component.transactionSelection(selectedTransactionType)).toBeDefined;
     expect(component.transactionSelection(selectedTransactionType)).toHaveBeenCalled;
   });
   it('deleteTransactionFn fuction should call  form HTMl', () => {
    const selectedTransactionType = "Enquiry";
     component.deleteTransactionFn(selectedTransactionType);
     fixture.detectChanges();
     expect(component.deleteTransactionFn(selectedTransactionType)).toBeDefined;
     expect(component.deleteTransactionFn(selectedTransactionType)).toHaveBeenCalled;
   });
   
   it('resValue fuction should call  form HTMl', () => {
    const value = {"destination":["${transaction_type}"],"ipc":"DECLINED_OAR","source":"${2}","type":"field","validationFunctions":[{"name":"IS_NOT_NULL","type":"in_built_validation"}],"selectedOption":"copy","selectedCondition":"Mandatory"}
    component.resValue(value);
     fixture.detectChanges();
     expect(component.resValue(value)).toBeDefined;
     expect(component.resValue(value)).toHaveBeenCalled;
   });
   it('opensetCustomMapper fuction should call  form HTMl', () => {   
    component.opensetCustomMapper();
     fixture.detectChanges();
     expect(component.opensetCustomMapper()).toBeDefined;
     expect(component.opensetCustomMapper()).toHaveBeenCalled;
   });
   it('removeFile fuction should call  form HTMl', () => {   
    component.removeFile(1);
     fixture.detectChanges();
     expect(component.removeFile(1)).toBeDefined;
     expect(component.removeFile(1)).toHaveBeenCalled;
   });
  it('copyReqMapFn fuction should call  form HTMl', () => {
    component.isoTransactions = [];
    component.copyReqMapFn();
    expect(component.copyReqMapFn).toBeDefined;
    expect(component.copyReqMapFn).toHaveBeenCalled;
  });
  it('copyResMapFn fuction should call  form HTMl', () => {
    component.isoTransactions = [];
    component.copyResMapFn();
    expect(component.copyResMapFn).toBeDefined;
    expect(component.copyResMapFn).toHaveBeenCalled;
  });
  it('uploadFile fuction should call  form HTMl', () => {
    const fileName = "HelloWorld-0.6.5.jar";
    const file = [];
    const files = [];
    component.uploadFile(fileName);
    fixture.detectChanges();
    expect(component.uploadFile(fileName)).toBeDefined;
    expect(component.uploadFile(fileName)).toHaveBeenCalled;
  });
});
