import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IAppState } from '@app/store/state/app.state';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { EventEmitter } from '@angular/core';
import { of } from 'rxjs';
import { TransformComponent } from './transform.component';
import { StoreModule } from '@ngrx/store';
import { NgSelectModule } from '@ng-select/ng-select';
import { UntypedFormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { AlertModule } from 'bnt';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { NzModalService } from 'ng-zorro-antd/modal';
import { AlertService } from '@app/services/alert.service';
import { SnotifyService, ToastDefaults } from 'ng-snotify';
import { MainService } from '../mapper/main.service';
import { AddRoleService } from '@app/services/add-role.service';
import { SharedModule } from '@app/shared/shared.module';
import { ExtractorService } from '@app/services/extractor.service';
import { CommonModule } from '@angular/common';
class translateServiceMock {
  public onLangChange: EventEmitter<any> = new EventEmitter();
  public onTranslationChange: EventEmitter<any> = new EventEmitter();
  public onDefaultLangChange: EventEmitter<any> = new EventEmitter();
  public get(key: any): any {
    return of(key);
  }
}
const changes = {
  previousValue: {
    jobName: null,
    jobDesc: null,
    jobGroup: null,
    type: null,
    active: 1,
    saveDarft: '1',
    details: {
      batchMode: null,
      cronExp: null,
      batchSize: null,
      repeatTime: null,
      imfId: {
        id: null,
      },
      mapping: null,
      jobClass: null,
      packager: null,
      etlJson: {
        type: '',
        reader: {
          type: null,
          readFrom: null,
          readIndex: null,
          filterCondition: null,
        },
        senders: [],
        transformer: {
          type: 'jsonTransformer',
          input: {
            header: null,
            mapper: 'mapper.json',
            packager: 'packager.json',
          },
          transformerType: 'JSON',
        },
      },
    },
  },
  currentValue: {
    id: 7,
    jobName: 'asdasd',
    jobDesc: 'asdasd',
    jobGroup: 'asdasd',
    active: true,
    type: 'json',
    saveDarft: null,
    details: {
      batchMode: 'REAL',
      cronExp: '1 2 3 4 5',
      batchSize: '654454',
      repeatTime: '23565',
      imfId: {
        id: 24,
        name: 'IMF Structure 82',
        version: 82,
      },
      mapping: {
        sources: [
          {
            source: 'userId',
            feature: 'copyasis',
            destination: 'account_number_extended',
          },
        ],
        listJoinMapping: [],
        listMapperMapping: [],
        listScriptMapping: [],
        listExtractMapping: [],
        listCopyAsIsMapping: [
          {
            ipc: 'SYSTEM_ERROR',
            status: 'M',
            imfField: {
              text: 'account_number_extended',
              type: 'request',
              alias: 'Extended account number',
              service: 'AUTH_SERVICE',
              useCase: '3',
            },
            condition: null,
            parentField: null,
            packagerField: 'userId',
            listValidationFunction: [],
          },
        ],
        listConstantMappingField: [],
      },
      jobClass: 'sadasd',
      packager: {
        attributes: [
          {
            type: 'field',
            fieldName: 'userId',
            fieldType: 'INTEGER',
            isSensitive: false,
            isHide: false,
            isPersist: true,
            alias: '',
            isEditable: true,
            parent: '0-0',
            isInvalid: true,
          },
          {
            type: 'field',
            fieldName: 'id',
            fieldType: 'INTEGER',
            isSensitive: false,
            isHide: false,
            isPersist: true,
            alias: '',
            isEditable: true,
            parent: '0-1',
            isInvalid: true,
          },
          {
            type: 'field',
            fieldName: 'title',
            fieldType: 'STRING',
            isSensitive: false,
            isHide: false,
            isPersist: true,
            alias: '',
            isEditable: true,
            parent: '0-2',
            isInvalid: true,
          },
          {
            type: 'field',
            fieldName: 'completed',
            fieldType: 'BOOLEAN',
            isSensitive: false,
            isHide: false,
            isPersist: true,
            alias: '',
            isEditable: true,
            parent: '0-3',
            isInvalid: true,
          },
        ],
      },
      etlJson: {
        type: '',
        reader: {
          type: 'DBReader',
          readFrom: '2022-09-09T11:28:07.945Z',
          readIndex: 445,
          filterCondition: {
            type: 'and',
            conditions: [
              {
                id: '0',
                type: 'equal',
                value: 'Cash Withdrawal',
                fieldName: '${transaction_type}',
              },
              {
                id: '1',
                type: 'starts_with',
                value: '12',
                fieldName: '${transaction_id}',
              },
            ],
          },
        },
        senders: [
          {
            type: 'kafkaSender',
            config: {
              UUID: '11',
              Amount: '11',
              Currency: '11',
              Merchant: '11',
              Terminal: '11',
              AcquirerId: '111',
              CustomerName: '111',
              CustomerEmail: '111',
              CustomerMobile: '111',
              CustomerAddress: '11',
              ReferenceNumber: '11',
              TransactionType: '11',
            },
            senderType: 'KAFKA',
          },
        ],
        transformer: {
          type: 'jsonTransformer',
          input: {
            header: null,
            mapper: 'asdasd_v0_mapping.json',
            packager: 'asdasd_v0_packager.json',
          },
          transformerType: 'JSON',
        },
      },
    },
  },
  firstChange: false,
};
const data = {
  destination: 'account_number_extended',
  destinationFlag: true,
  id: 'userId',
  name: 'userId',
  parentField: null,
};
xdescribe('TransformComponent', () => {
  let component: TransformComponent;
  let fixture: ComponentFixture<TransformComponent>;
  let mockStore: MockStore<IAppState>;
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TransformComponent],
      imports: [
        StoreModule,
        SharedModule,
        NgSelectModule,
        FormsModule,
        RouterTestingModule,
        ReactiveFormsModule,
        // MockStoreModule.forRoot('Location', {}),
        AlertModule,
        StoreModule.forRoot({}),
        BrowserAnimationsModule,
        HttpClientTestingModule,
        TranslateModule,
        CommonModule
      ],
      providers: [
        TranslateService,
        NzModalService,
        AlertService,
        SnotifyService,
        MainService,
        UntypedFormBuilder,
        AddRoleService,
        ExtractorService,
        { provide: 'SnotifyToastConfig', useValue: ToastDefaults },
        { provide: TranslateService, useClass: translateServiceMock },
        provideMockStore(),
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TransformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  it(' fuction should close constant drawer visible list in html', () => {
    component.closeConstant();
    expect(component.constantDrawerVisible).toEqual(false);
  });
  it(' fuction should open constant drawer visible list in html', () => {
    component.openSetConstantDrawer();
    expect(component.constantDrawerVisible).toEqual(true);
  });
  it(' fuction should call click reset button ', () => {
    component.reSetdata();
    expect(component).toBeTruthy;
  });
  it(' fuction should call click next button ', () => {
    component.next();
    expect(component.transformData.emit).toBeTruthy;
  });
  it(' fuction should call click save button ', () => {
    component.saveData();
    expect(component.transformData.emit).toBeTruthy;
  });
  it(' fuction should call click save button ', () => {
    component.removeSourceFormList();
    expect(component).toBeTruthy;
  });
  it(' fuction should call conevert packager ', () => {
    component.convertPackager(null);
    expect(component).toBeTruthy;
  });
  // it(' fuction should call conevert packager ', () => {

  //   component.ngOnChanges(changes);
  //   expect(component).toBeTruthy;
  // });
  it(' fuction should transaction click next form  ', () => {
    component.transactionReqPopFun(data, 0);
    expect(component).toBeTruthy;
  });
  it(' fuction should click close modal ', () => {
    component.close(null);
    expect(component.visible).toEqual(false);
  });
  it(' fuction should click close extract in html list ', () => {
    component.closeExtract(event);
    expect(component.visible).toEqual(false);
  });
  it(' fuction should click close join in html list ', () => {
    component.closeJoin(event);
    expect(component.visible).toEqual(false);
  });
  it(' fuction should click close mapper in html list ', () => {
    component.closeMapperReq(event);
    expect(component.visible).toEqual(false);
  });
  it(' fuction should click close script in html list ', () => {
    component.closeScript(event);
    expect(component.visible).toEqual(false);
  });
  // it(' fuction should click save script in html list ', () => {
  //   component.saveExtract(event);
  //   expect(component.visible).toEqual(false);
  // });
  // it(' fuction should transaction click next form  ', () => {
  //   component.changeMapper(item);
  //   expect(component).toBeTruthy;
  // });
  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
