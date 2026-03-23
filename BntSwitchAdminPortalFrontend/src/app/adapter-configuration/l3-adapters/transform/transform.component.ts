import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { L1AdapterService } from '@app/services/l1-adapter.service';
import {
  GetElFunction,
  GetInBuiltMapper,
  GetServiceType,
  GetIMF,
  GetIPC,
} from '@app/store/actions/scheme-imf-mapper.action';
import {
  selectElFunction,
  selectGetServiceType,
  selectMapper,
  selectIMF,
  selectIPC,
} from '@app/store/selectors/scheme-imf-mapper.selectors';
import { select, Store } from '@ngrx/store';
import { Subject } from 'rxjs';
import { takeUntil, takeWhile } from 'rxjs/operators';
import {
  DraftTransform,
  GetAdapterDataMap,
  GetL1AdapterEntityIMF,
  GetL1AdapterEntityMapping,
  GetMessageContextList,
} from '../../../store/actions/l1-adapter.action';
import {
  selectAdapterDataMap,
  selectL1AdapterEntityIMFList,
  selectL1AdapterEntityMappingList,
  selectL1DraftSave,
  SelectMessageContextList,
} from '../../../store/selectors/l1-adapter.selectors';
import { AdapterCommonService } from '../../../services/adapter-common.service';
import {
  GetPostActionMethod,
  GetPreActionMethod,
  GetStepListMethod,
} from '../../../store/actions/l3-adapter.action';
import {
  SelectPostActionMethod,
  SelectPreActionMethod,
  SelectStepLisMethod,
} from '../../../store/selectors/l3-adapter.selectors';
import { IAppState } from '../../../store/state/app.state';
import { Utils } from 'src/utils';
import { TranslateService } from '@ngx-translate/core';
import { selectViewSettingsList } from '@app/store/selectors/view-settings.selector';
import { ViewSettingGetObject } from '@app/models/view-settings.interface';
import { AlertService } from '@app/services/alert.service';

@Component({
  selector: 'app-transform',
  styleUrls: ['../l3-adapters.component.scss'],
  templateUrl: './transform.component.html',
})
export class TransformComponent implements OnInit {
  @Input() public adapterData: any;
  @Input() public template: any;
  @Input() public format: any;
  @Input() public name: any;
  @Input() public imfId: any;
  public mapperList = [];
  public preExecuteData = [];
  public isoTransactions: any = [];
  public isVisible = false;
  public readonly widthConfig = ['200px', '100px', null];
  public isTransactionCondVisible = false;
  public requestMapping;
  public responseMapping;
  public conditionPush = [];
  public transactionCondition = [];
  public ruleListItem = [];
  public ruleTypeList = [
    { name: 'Equal', value: 'equal' },
    { name: 'Starts With', value: 'starts_with' },
  ];
  public transactionRequestArray = [];
  public transactionResponseArray = [];
  public reqRuleMapDisable;
  public resRuleMapDisable;
  public requestMappingTransaction;
  public responseMappingTransaction;
  public showRuleConditionList = [];
  public isDataEnrichmentScreenVisible = false;
  public enrichfields = 'configuration';
  public entityMappingList = [];
  public entityIMFList = [];
  public entityColumn = [];
  public entityList;
  public authData = [];
  public preActionArray = [];
  public showPostActionParam = false;
  public showPreActionParam = false;
  public postActionArray = [];
  public selectedPreActionParameter;
  public selectedPostActionParameter;
  public customMappings: any = [];
  public isJarUpload = false;
  public setCustomMapper = false;
  public fileInfos = [];
  public fileExtnsion;
  public selectedTransactionType;
  public transformTab = ['Request', ' Response', 'Pre Action Request', 'Post Action Response'];
  public selectSourceData = [];
  public selectSourceResData = [];
  public authReqDivShow = 'req';
  public selectedTabIndex = 0;
  public isAuthResVisible = false;
  public authResLoopList = [1, 2];
  public responseField = 'operation';
  public transactionTypeValueList = [];
  public isSaveDraft = false;
  public ruleError = false;
  public requestImfField = [];
  public responseImfField = [];
  public entitywhereName;
  public adapterDataMap: any;
  public transformActionItem: any = [];
  public transformActionItemRes: any = [];
  public FldID;
  public isRequest: any;
  public AuthorizationTitle: any;
  public reqIMFObj: any = [];
  public resIMFObj: any = [];
  public resIMFLeg: any = [];
  public allTransactionText = '';
  public queryObjDropDown = [];
  public queryObjDropDownModel;
  public queryObjIndex;
  public ruleSAF;
  public dataEnrichmentScreenError = false;
  public totals = 0;
  public serviceList;
  public jsonData;
  public ruleIcon = false;
  public setConstantMap = [];
  public imfLeg: any;
  public elData = [];
  public removable = true;
  public conditionObj;
  public enrichModelObject: any;
  public mappings: any = [];
  public mapping_dto: any = {};
  @Input() public readOnlyFlag = false;
  public hideSavebtn = false;
  public showLoader = false;
  public networkService;
  @Output() public tabValue: EventEmitter<Object> = new EventEmitter<Object>();
  private componentDestroyed = new Subject();
  public showReqEnrichVisible = false;
  public l3ReqConstant = [];
  public jsonCondition = null;
  public imfList;
  public ipcList = [];
  public executeData = [];
  public contextImf = [];

  public aphaNumeric = new RegExp('^[0-9a-zA-Z ]+$');
  public valueValidError = false;
  public valueSelectionList = ['List', 'Text'];
  jarFileExistWarning: any;
  public resMappingCondition;
  public currentLang: string;
  public requestCon = true;

  public currentIndex = null;
  public stepList = [];
  resAuthData: any[];

  constructor(
    private _store: Store<IAppState>,
    public _l1AdapterService: L1AdapterService,
    public _adapterCommonService: AdapterCommonService,
    public _alertSerivce: AlertService,
    private translate: TranslateService,
  ) {}

  public getStepListData() {
    this._store.dispatch(new GetStepListMethod());
    this._store
      .pipe(takeUntil(this.componentDestroyed), select(SelectStepLisMethod))
      .subscribe((response: any) => {
        if (response && response.data) {
          this.stepList = [];
          response.data.forEach(element => {
            if (element && element.type === 'execute_function') {
              this.stepList.push(element);
            }
          });
        }
      });
  }
  public getElFunctionListData() {
    this._store.dispatch(new GetElFunction());
    let takeData = true;
    this._store
      .pipe(
        takeUntil(this.componentDestroyed),
        takeWhile(() => takeData),
        select(selectElFunction),
      )
      .subscribe((response: any) => {
        if (response) {
          this.elData = response;
          takeData = false;
        }
      });
  }
  public viewSettingData() {
    this._store.pipe(select(selectViewSettingsList)).subscribe((response: ViewSettingGetObject) => {
      if (response) {
        this.currentLang = response.data.settingDto.language;
        this.translate.setDefaultLang(this.currentLang);
      }
    });
  }
  public gettL1AdapterEntityMappingData() {
    this._store.dispatch(new GetL1AdapterEntityMapping());
    this._store.pipe(select(selectL1AdapterEntityMappingList)).subscribe((response: any) => {
      if (response && response.data) {
        this.entityList = response.data;
        this.entityMappingList = Object.keys(response.data);
      }
    });
  }
  public getL1AdapterEntityIMFData() {
    this._store.dispatch(new GetL1AdapterEntityIMF());
    this._store.pipe(select(selectL1AdapterEntityIMFList)).subscribe((response: any) => {
      if (response && response.data) {
        this.entityIMFList = response.data.ImfField;
      }
    });
  }
  public serviceData() {
    this._store.dispatch(new GetServiceType());
    this._store.pipe(select(selectGetServiceType)).subscribe((response: any) => {
      if (response) {
        this.serviceList = response;
      }
    });
  }
  public PostActionData() {
    this._store.dispatch(new GetPostActionMethod());
    this._store
      .pipe(takeUntil(this.componentDestroyed), select(SelectPostActionMethod))
      .subscribe((ExecuteRes: any) => {
        if (ExecuteRes && ExecuteRes.data) {
          this.executeData = ExecuteRes.data;
        }
      });
  }
  public getIPCData() {
    this._store.dispatch(new GetIPC());
    this._store
      .pipe(takeUntil(this.componentDestroyed), select(selectIPC))
      .subscribe((ipcRes: any) => {
        if (ipcRes) {
          this.ipcList = ipcRes;
        }
      });
  }
  public getAdapterDataMapData() {
    this._store.dispatch(new GetAdapterDataMap());
    this._store
      .pipe(takeUntil(this.componentDestroyed), select(selectAdapterDataMap))
      .subscribe((response: any) => {
        if (response) {
          this.adapterDataMap = response.data.AdapterdataMap;
        }
      });
  }
  public getSelectMessageContextListData() {
    this._store.dispatch(new GetMessageContextList(this.imfId));
    this._store.pipe(select(SelectMessageContextList)).subscribe((response: any) => {
      if (response && response.data) {
        this.jsonData = JSON.parse(JSON.stringify(response.data.messageContextFieldsByVersion));
        this.contextImf = this.transformLogic(
          response.data.messageContextFieldsByVersion.attributes,
        );
      }
    });
  }
  public getIMFData() {
    this._store.dispatch(new GetIMF(this.imfId));
    this._store
      .pipe(takeUntil(this.componentDestroyed), select(selectIMF))
      .subscribe((imfRes: any) => {
        if (imfRes) {
          this.imfList = imfRes.ImfField;
        }
      });
  }
  public getMapperData() {
    this._store
      .pipe(takeUntil(this.componentDestroyed), select(selectMapper))
      .subscribe((response: any) => {
        if (response) {
          this.mapperList = response;
          localStorage.setItem('mapperList', JSON.stringify(response));
        }
      });
  }

  ngOnInit() {
    this.getStepListData();
    this.getElFunctionListData();
    this.viewSettingData();
    this.gettL1AdapterEntityMappingData();
    this.getL1AdapterEntityIMFData();
    this.serviceData();
    this.getIPCData();
    this.getAdapterDataMapData();
    this.PostActionData();
    this.getSelectMessageContextListData();
    this.getIMFData();
    this.getMapperData();

    this._store.dispatch(new GetPreActionMethod());
    this._store.dispatch(new GetPostActionMethod());

    this._store.dispatch(new GetInBuiltMapper(this.template.id));
    if (this.adapterData.transformData.requestMapping) {
      this.isoTransactions = JSON.parse(
        JSON.stringify(this.adapterData.transformData.requestMapping),
      );
      this.isoTransactions = this.isoTransactions?.transactions || [];
      this.isoTransactions.map(transactions => {
        this.allTransactionText = this.allTransactionText + ',' + transactions.messageIntentifier;
        let messageType = JSON.parse(JSON.stringify(transactions.messageIntentifier.toLowerCase()));
        const array = messageType.split(' ');
        if (array && array.length > 1) {
          messageType = array.join('');
        }
        this.transactionTypeValueList.push({
          value: transactions.messageIntentifier,
          name: messageType,
        });
        return transactions;
      });
      this.getPreActionData();
      this.getPostActionData();
      this.getAuthReqData(0, this.isoTransactions);
      this.getAuthResData(0, this.isoTransactions);
    }

    this.authData = [];
    if (this.adapterData.transformData.fieldSchemeImfMapperUiWrapper.length > 0) {
      this.adapterData.transformData.fieldSchemeImfMapperUiWrapper.map(item => {
        this.authData.push({ id: item.fieldId, name: item.fieldName });
      });
    }
    this.resAuthData = [];
    if (
      !!this.adapterData.transformData.responseFieldSchemeImfMapperUiWrapper &&
      this.adapterData.transformData.responseFieldSchemeImfMapperUiWrapper.length > 0
    ) {
      this.adapterData.transformData.responseFieldSchemeImfMapperUiWrapper.map(item => {
        this.resAuthData.push({ id: item.fieldId, name: item.fieldName });
      });
    } else {
      this.adapterData.transformData.fieldSchemeImfMapperUiWrapper.map(item => {
        this.resAuthData.push({ id: item.fieldId, name: item.fieldName });
      });
    }
    const networkService = this.adapterData.networkData.properties.network.find(
      x =>
        x &&
        (x.field === 'component.service.type' || x.field === 'network--component.service.type'),
    );
    if (networkService && networkService.value) {
      this.networkService = networkService.value;
    }
  }

  public showTransactionCondModal() {
    this.requestCon = true;
    this.transactionRequestArray = [];
    this.transactionResponseArray = [];
    this.resMappingCondition = undefined;
    this.conditionObj = undefined;
    this.isoTransactions.map(item1 => {
      if (item1.messageIntentifier === this.selectedTransactionType) {
        if (item1.condition) {
          this.conditionObj = JSON.parse(JSON.stringify(item1.condition));
        }
      } else {
        this.transactionRequestArray.push(item1);
        this.transactionResponseArray.push(item1);
      }
      return item1;
    });
    this.isTransactionCondVisible = true;
  }

  public tabChange(tab, i) {
    this.selectedTabIndex = i;
    if (tab === this.selectedTransactionType + ' Response') {
      this.authReqDivShow = 'res';
    } else if (tab === this.selectedTransactionType + ' Request') {
      this.authReqDivShow = 'req';
    } else if (tab === 'Post Action Response') {
      this.authReqDivShow = 'post';
    } else if (tab === 'Pre Action Request') {
      this.authReqDivShow = 'pre';
    }
    this.stringifyObj();
  }

  public pushAuthResItem() {
    const no = 1 + this.authResLoopList.length;
    this.authResLoopList.push(no);
  }

  public pullAuthResItem() {
    this.authResLoopList.pop();
  }

  public closeAuthResPopup() {
    this.isAuthResVisible = false;
  }

  public openAuthResPopup() {
    this.isAuthResVisible = true;
  }
  public emitError(event) {
    this.ruleError = event;
  }
  public cancelFn() {
    this.isTransactionCondVisible = false;
  }
  public BackFn() {
    this.requestCon = true;
  }

  public tabChangeValue() {
    const postActionflag = this.validatePostAction();
    const preActionflag = this.validatePreAction();
    if (postActionflag && preActionflag && !this.isSaveDraft) {
      this.stringifyObj();
      this.tabValue.emit(3);
    }
  }

  public prevTabValue() {
    this.tabValue.emit(1);
  }

  public handleCancel(fld): void {
    if (
      this.isRequest &&
      (!this.transformActionItem[fld.id + this.selectedTransactionType] ||
        this.requestImfField[fld.id + this.selectedTransactionType] === '')
    ) {
      this.selectSourceData[fld.id + this.selectedTransactionType] = false;
    } else if (
      !this.isRequest &&
      !this.transformActionItemRes[fld.id + this.selectedTransactionType]
    ) {
      this.selectSourceResData[fld.id + this.selectedTransactionType] = false;
    }
    this.isVisible = false;
  }

  public draftTransform() {
    this.isSaveDraft = true;
    const postActionflag = this.validatePostAction();
    const PreActionflag = this.validatePreAction();
    if (postActionflag && PreActionflag) {
      this.stringifyObj();
      this._store.dispatch(new DraftTransform(this.adapterData));
      this._store
        .pipe(takeUntil(this.componentDestroyed), select(selectL1DraftSave))
        .subscribe((response: any) => {
          if (response && response.status) {
            this.isSaveDraft = false;
          }
        });
    }
  }

  public delAuthReqField(id) {
    const source = '${' + id + '}';
    const destination =
      '${message_exchange[' + this.networkService + '].native_request_message[' + id + ']}';
    this.isoTransactions.map(item1 => {
      if (item1.messageIntentifier === this.selectedTransactionType) {
        item1.request.mappings.forEach((x, i) => {
          if (x) {
            if (x.destination && x.destination[0] === destination) {
              delete item1.request.mappings[i];
            } else if (x.source === source) {
              delete item1.request.mappings[i];
            } else if (x.type === 'imdg_enrich' && x.fieldId === id) {
              delete item1.request.mappings[i];
            }
          }
        });
        item1.request.mappings = item1.request.mappings.filter(x => x !== null);
      }
      return item1;
    });
    this.transformActionItem[id + this.selectedTransactionType] = null;
    this.requestImfField[id + this.selectedTransactionType] = null;
  }

  public delAuthResField(id) {
    const source = '${' + id + '}';
    this.isoTransactions.map(item1 => {
      if (item1.messageIntentifier === this.selectedTransactionType) {
        item1.response.mappings = item1.response.mappings
          .filter(x => {
            if (x.fieldId) {
              return x.fieldId !== id;
            } else {
              return x.source !== source;
            }
          })
          .filter(x => x !== null);
      }
      return item1;
    });
    this.transformActionItemRes[id + this.selectedTransactionType] = null;
    this.responseImfField[id + this.selectedTransactionType] = null;
  }

  public callSchemeImfMapper(data, type, flag) {
    if (flag) {
      if (type === 'req') {
        this.transactionReqPopFun(data);
      } else {
        this.transactionResPopFun(data);
      }
    } else {
      if (type === 'req') {
        this.delAuthReqField(data.id);
      } else {
        this.delAuthResField(data.id);
      }
    }
  }

  public transactionSelection(value) {
    if (value && value.nzValue) {
      this.selectedTransactionType = value.nzValue;
    }
    this.authReqDivShow = 'req';
    this.selectedTabIndex = 0;
    this.getPreActionData();
    this.getPostActionData();

    const reqTransaction = this.isoTransactions.findIndex(
      item => item && item.messageIntentifier === this.selectedTransactionType && item.condition,
    );
    const resTransaction = this.isoTransactions.findIndex(
      item => item && item.messageIntentifier === this.selectedTransactionType && item.condition,
    );
    this.allTransactionText = this.allTransactionText + ',' + this.selectedTransactionType;
    if (reqTransaction > -1) {
      this.transformActionItem = [];
      this.getAuthReqData(reqTransaction, this.isoTransactions);
    }
    if (resTransaction > -1) {
      this.transformActionItemRes = [];
      this.getAuthResData(resTransaction, this.isoTransactions);
    }
    this.transformTab = [
      this.selectedTransactionType + ' Request',
      this.selectedTransactionType + ' Response',
    ];
    this.transformTab.push('Pre Action Request');
    this.transformTab.push('Post Action Response');
    this.isoSchemaRequestResponse();
  }

  public isoSchemaRequestResponse() {
    let output = this.isoTransactions.find(
      item => item.messageIntentifier === this.selectedTransactionType,
    );
    if (output && !output.condition) {
      this.isoTransactions = this.isoTransactions.filter(
        item => item.messageIntentifier !== this.selectedTransactionType,
      );
      output = null;
      this.jsonCondition = null;
      this.showRuleConditionList[this.selectedTransactionType] = null;
    }
    if (!output) {
      this.jsonCondition = null;
      this.postActionArray[this.selectedTransactionType] = [];
      this.preActionArray[this.selectedTransactionType] = [];
      this.isoTransactions.push({
        messageIntentifier: this.selectedTransactionType,
        contractIntentifier: null,
        condition: null,
        request: {
          mappings: [],
          type: 'cart_request',
          pre_actions: [],
        },
        response: {
          type: 'cart_response',
          mappings: [],
          postActions: [],
        },
      });
      this.getPreActionData();
      this.getPostActionData();
    } else {
      this.jsonCondition = output.condition;
    }
  }

  public addTransaction() {
    if (this.selectedTransactionType) {
      this.selectedTransactionType = this.selectedTransactionType.trim();
      if (this.selectedTransactionType.length > 3) {
        let messageType = JSON.parse(JSON.stringify(this.selectedTransactionType.toLowerCase()));
        const array = messageType.split(' ');
        if (array && array.length > 1) {
          messageType = array.join('');
        }
        this.ruleIcon = true;
        const data = this.transactionTypeValueList.find(x => x.name.toLowerCase() === messageType);
        if (!data) {
          this.transactionTypeValueList.push({
            value: this.selectedTransactionType,
            name: messageType,
          });
          this.transactionSelection('');
        } else {
          this.selectedTransactionType = data.value;
        }
        this.isoSchemaRequestResponse();
      }
    }
  }

  public deleteTransactionFn(value) {
    this.authReqDivShow = 'req';
    if (value) {
      this.postActionArray[value] = [];
      this.preActionArray[value] = [];
      this.selectedTransactionType = undefined;
      this.isoTransactions = this.isoTransactions.filter(x => x.messageIntentifier !== value);
      this.transactionTypeValueList = this.transactionTypeValueList.filter(x => x.value !== value);
      this.showRuleConditionList[this.selectedTransactionType] = '';
    }
    this._alertSerivce.responseMessage({
      message: 'Message type deleted successfully',
      status: 'success',
    });
  }

  public transactionReqPopFun(data) {
    this.FldID = data;
    this.isRequest = true;
    this.AuthorizationTitle = 'request';
    this.isVisible = true;
  }
  public transactionResPopFun(data) {
    this.FldID = data;
    this.isRequest = false;
    this.AuthorizationTitle = 'response';
    this.isVisible = true;
  }

  public valueValidation(data) {
    if (this.aphaNumeric.test(data)) {
      this.valueValidError = false;
    } else {
      this.valueValidError = true;
    }
  }

  public reqValue(event: any) {
    if (event) {
      this.currentIndex = null;
      if (!this.reqIMFObj[this.selectedTransactionType]) {
        this.reqIMFObj[this.selectedTransactionType] = [];
      }
      if (event.selectedOption === 'operationField' || event.selectedOption === 'copyField') {
        const value = event.value;
        this.reqIMFObj[this.selectedTransactionType].push(value);
        if (value.source && value.destination && value.destination[0]) {
          let source;
          if (value.destination[0].indexOf('native_request_message[') !== -1) {
            source = value.destination[0].split('native_request_message[');
          } else {
            source = value.destination[0].split('native_response_message[');
          }
          if (source) {
            source = source[1].split(']');
            if (source) {
              source = source[0];
            }
          }
          this.selectSourceData[source + this.selectedTransactionType] = true;
          if (value.source.indexOf('_message[') === -1) {
            if (value.source.indexOf(']') === -1) {
              let imfName = value.source.split('{');
              if (imfName) {
                imfName = imfName[1].split('}');
                if (imfName) {
                  this.requestImfField[source + this.selectedTransactionType] = imfName[0];
                }
              }
            } else {
              let imfName = value.source.split('].');
              if (imfName) {
                imfName = imfName[1].split('}');
                if (imfName) {
                  this.requestImfField[source + this.selectedTransactionType] = imfName[0];
                }
              }
            }
          } else {
            let imfName = value.source.split('message[');
            if (imfName) {
              imfName = imfName[1].split(']');
              if (imfName) {
                this.requestImfField[source + this.selectedTransactionType] = imfName[0];
              }
            }
          }
          this.transformActionItem[source + this.selectedTransactionType] = value;
          this.pushReqData(source, [value]);
        }
      } else if (event.selectedOption === 'mapper') {
        if (event.value.type === 'in_built_mapper') {
          const value = event.value;
          const source = value.source.split('{')[1].split('}')[0];
          this.selectSourceData[source + this.selectedTransactionType] = true;
          this.requestImfField[source + this.selectedTransactionType] = event.value.mapper;
          this.transformActionItem[source + this.selectedTransactionType] = {
            selectedOption: 'mapper',
            value: event.value,
          };
          this.pushReqData(source, [event.value]);
        } else {
          this.pushReqData(event.value[0].fieldId, event.value, 'mapper');
          event.value.forEach(item => {
            if (item.type === 'field') {
              const source = item.source.split('{')[1].split('}')[0];
              this.selectSourceData[source + this.selectedTransactionType] = true;
              this.requestImfField[source + this.selectedTransactionType] = event.value[0].name;
              this.transformActionItem[source + this.selectedTransactionType] = {
                value: event.value,
                selectedOption: 'mapper',
              };
            }
          });
        }
      } else if (event.selectedOption === 'join') {
        // tooo custom join
        const source = event.value.fieldId;
        this.selectSourceData[source + this.selectedTransactionType] = true;
        this.transformActionItem[source + this.selectedTransactionType] = event.value;
        if (event.value.source) {
          const sourceList = [];
          event.value.source.forEach((el, i) => {
            let source;
            if (el.sourceType == 'text') {
              source = el.source;
            } else {
              source = this.getImfName(el.source);
            }
            sourceList.push(source);
          });
          this.requestImfField[source + this.selectedTransactionType] = sourceList.join(' ,');
        }

        this.pushReqData(source, [event.value], 'join');
      } else if (event.selectedOption === 'script') {
        const source = event.source.split('{')[1].split('}')[0];
        this.selectSourceData[source + this.selectedTransactionType] = true;
        this.transformActionItem[source + this.selectedTransactionType] = event;
        this.requestImfField[source + this.selectedTransactionType] = 'Script Mapper';
        this.pushReqData(source, [event]);
      } else {
        if (event.value.source) {
          const source = event.value.source.split('{')[1].split('}')[0];
          this.selectSourceData[source + this.selectedTransactionType] = true;
          this.transformActionItem[source + this.selectedTransactionType] = event.value;
          this.pushReqData(source, [event.value]);
        }
      }
    }
  }

  public resValue(value: any) {
    this.currentIndex = null;
    if (!this.resIMFObj[this.selectedTransactionType]) {
      this.resIMFObj[this.selectedTransactionType] = [];
    }
    if (value && value.source) {
      this.resIMFObj[this.selectedTransactionType].push(value);
      const source = value.source.split('{')[1].split('}')[0];
      this.selectSourceResData[source + this.selectedTransactionType] = true;
      if (
        value.type !== 'groovy_executor' &&
        value.type !== 'in_built_mapper' &&
        value.destination &&
        value.destination[0]
      ) {
        this.responseImfField[source + this.selectedTransactionType] = this.getImfName(
          value.destination[0],
        );
      } else if (value.type === 'in_built_mapper') {
        this.responseImfField[source + this.selectedTransactionType] = value.mapper;
      } else if (value.type === 'groovy_executor' && value.selectedOption === 'script') {
        this.responseImfField[source + this.selectedTransactionType] = 'ScriptMapper';
      }
      this.pushResData(value);
      this.transformActionItemRes[source + this.selectedTransactionType] = [];
      this.transformActionItemRes[source + this.selectedTransactionType].push(value);
      this.isoTransactions.forEach(transactions => {
        if (transactions.messageIntentifier === this.selectedTransactionType) {
          if (!this.currentIndex) {
            transactions.response.mappings.push(value);
          } else {
            transactions.response.mappings.splice(this.currentIndex, 0, value);
          }
        }
      });
    } else if (value && value.length > 0) {
      let source;
      if (value[0].source) {
        source = value[0].source.split('{')[1].split('}')[0];
      } else if (value[0].fieldId) {
        source = value[0].fieldId;
      }
      this.selectSourceResData[source + this.selectedTransactionType] = true;
      this.transformActionItemRes[source + this.selectedTransactionType] = [];
      this.responseImfField[source + this.selectedTransactionType] = '';
      value.forEach(data => {
        this.pushResData(data);
      });
      value.forEach(data => {
        this.resIMFObj[this.selectedTransactionType].push(data);
        if (data.name) {
          this.responseImfField[source + this.selectedTransactionType] = data.name;
          if (data.source) {
            const source1 = data.source.split('{')[1].split('}')[0];
            if (source !== source1) {
              this.transformActionItemRes[source1 + this.selectedTransactionType] = [];
              this.responseImfField[source1 + this.selectedTransactionType] = data.name;
              this.selectSourceResData[source1 + this.selectedTransactionType] = true;
              this.transformActionItemRes[source1 + this.selectedTransactionType].push(data);
            }
          }
        } else {
          if (data.destination) {
            if (this.responseImfField[source + this.selectedTransactionType] === '') {
              this.responseImfField[source + this.selectedTransactionType] = this.getImfName(
                data.destination[0],
              );
            } else {
              this.responseImfField[source + this.selectedTransactionType] =
                this.responseImfField[source + this.selectedTransactionType] +
                ',' +
                this.getImfName(data.destination[0]);
            }
          }
        }
        this.transformActionItemRes[source + this.selectedTransactionType].push(data);
        this.isoTransactions.map(transactions => {
          if (transactions.messageIntentifier === this.selectedTransactionType) {
            if (!this.currentIndex) {
              transactions.response.mappings.push(data);
            } else {
              transactions.response.mappings.splice(this.currentIndex, 0, data);
            }
          }
          return transactions;
        });
      });
    }
  }

  public handleSave(value) {
    this.isVisible = value;
  }

  public showCondition(value) {
    const key = this.selectedTransactionType + value.key;
    this.transactionTypeValueList.forEach(item => {
      if (item.value.trim() !== key.trim()) {
        this.ruleIcon = false;
      }
    });
  }
  public keyUpFn(value) {
    if (value.key === 'Delete' || value.key === 'Backspace') {
      this.ruleIcon = false;
    }
  }
  public changeReqMapFn() {
    if (
      this.requestMapping === false &&
      this.requestMappingTransaction &&
      this.requestMappingTransaction.name
    ) {
      this.isoTransactions.forEach(transactions => {
        if (transactions.messageIntentifier === this.selectedTransactionType) {
          transactions.request.mappings = [];
        }
      });
      this.selectSourceData = [];
      this.requestImfField = [];
      this.transformActionItem = [];
    } else if (this.requestMapping) {
      this.requestMappingTransaction = null;
    }
  }

  public changeResMapFn() {
    if (
      this.responseMapping === false &&
      this.responseMappingTransaction &&
      this.responseMappingTransaction.name
    ) {
      this.isoTransactions.forEach(transactions => {
        if (transactions.messageIntentifier === this.selectedTransactionType) {
          transactions.response.mappings = [];
        }
      });
      this.selectSourceResData = [];
      this.responseImfField = [];
      this.transformActionItemRes = [];
    } else if (this.responseMapping) {
      this.responseMappingTransaction = null;
    }
  }

  public copyReqMapFn() {
    this.isoTransactions.forEach((transactions, transactionsId) => {
      if (transactions.messageIntentifier === this.selectedTransactionType) {
        transactions.request.mappings = this.requestMappingTransaction.request.mappings;
        this.getReqMapping(this.isoTransactions, transactionsId);
      }
    });
  }

  public copyResMapFn() {
    this.isoTransactions.forEach((transactions, transactionsId) => {
      if (transactions.messageIntentifier === this.selectedTransactionType) {
        transactions.response.mappings = this.responseMappingTransaction.response.mappings;
        this.getAuthResData(transactionsId, this.isoTransactions);
      }
    });
  }
  // tslint:disable-next-line: use-life-cycle-interface
  ngOnDestroy(): void {
    // Called once, before the instance is destroyed.
    // Add 'implements OnDestroy' to the class.
    this.componentDestroyed.next();
    this.componentDestroyed.complete();
    this.componentDestroyed.unsubscribe();
  }

  public showDataModal() {
    let output;
    this.valueValidError = false;
    this.mappings = [];
    this.queryObjDropDown = [];
    this.dataEnrichmentScreenError = false;
    this.isoTransactions.forEach(item1 => {
      if (item1.messageIntentifier === this.selectedTransactionType) {
        item1.response.mappings.forEach(item => {
          if (item && item.type === 'field' && item.selectedConstant === 2) {
            let destination = '';
            if (
              item.destination &&
              item.destination[0] &&
              item.destination[0].indexOf('response_message[') !== -1
            ) {
              destination = item.destination[0].split('response_message[')[1].split(']')[0];
            }
            this.mappings.push({
              type: 'field',
              source: item.source,
              destination: item.resImfValue,
              ipc: item.ipc,
              useCase: item.useCase,
              resImfValue: item.resImfValue,
              condition: item.condition ? item.condition : null,
            });
          } else if (item && item.type === 'imdg_enrich' && !item.selectedCondition) {
            const obj = item;
            obj.fields.forEach(field => {
              if (
                field.destination &&
                field.destination[0] &&
                field.destination[0].indexOf('request_message[') !== -1
              ) {
                field.destination = field.destination[0].split('request_message[')[1].split(']')[0];
              }
            });
            obj.lookupType.query.condition.conditions.forEach(condition => {
              if (condition.value && condition.value.indexOf('request_message[') !== -1) {
                condition.value = condition.value.split('request_message[')[1].split(']')[0];
              }
            });
            this.queryObjDropDown.push({
              id: this.queryObjDropDown.length,
              name: obj.lookupType.query.from.mapName,
              value: obj,
            });
          }
        });
      }
    });
    if (this.queryObjDropDown.length > 0) {
      this.enrichModelObject = this.queryObjDropDown[this.queryObjDropDown.length - 1].value;
    }
    if (this.mappings.length === 0) {
      this.enrichfields = 'configuration';
      this.mappings.push({
        type: 'field',
        source: '',
        destination: null,
        ipc: '',
        condition: null,
      });
    } else {
      this.enrichfields = 'constValue';
    }
    this.isDataEnrichmentScreenVisible = true;
  }

  public clearEnrichModel() {
    this.enrichModelObject = {
      fields: [],
      ipc: 'SYSTEM_ERROR',
      lookupType: {
        query: {
          from: { mapName: null, type: 'from' },
          select: {
            columns: [
              {
                alias: { type: 'alias', name: null, alias: null },
                type: 'aliasColumn',
              },
            ],
            type: 'select',
          },
          type: 'search',
          condition: {
            conditions: [{ fieldName: null, type: 'equal', value: null }],
            type: 'and',
          },
        },
        type: 'imdg_enrich',
      },
      type: 'imdg_enrich',
    };
  }

  public checkConfigError() {
    if (this.enrichfields === 'configuration') {
      if (this.enrichModelObject) {
        if (!this.enrichModelObject.lookupType.query.from.mapName) {
          this.dataEnrichmentScreenError = true;
        }
        this.enrichModelObject.fields.map(field => {
          if (!field.destination || !field.source) {
            this.dataEnrichmentScreenError = true;
          }
          return field;
        });
        this.enrichModelObject.lookupType.query.condition.conditions.map(condition => {
          if (!condition.fieldName || !condition.value) {
            this.dataEnrichmentScreenError = true;
          }
          return condition;
        });
      } else {
        if (this.queryObjDropDown.length === 0) {
          this.dataEnrichmentScreenError = true;
        }
      }
    } else {
      this.mappings.map(item => {
        if (!item.source || !item.destination) {
          this.dataEnrichmentScreenError = true;
        }
        return item;
      });
    }
  }

  public hideSavefn(event) {
    this.hideSavebtn = event;
  }

  public openEnrichPopupFn() {
    this.showReqEnrichVisible = true;
    this.valueValidError = false;
    this.enrichfields = 'constValue';
    this.l3ReqConstant = [];
    this.dataEnrichmentScreenError = false;
    this.isoTransactions.forEach(transactions => {
      if (transactions.messageIntentifier === this.selectedTransactionType) {
        transactions.request.mappings.forEach(element => {
          if (element.selectedConstant == '2') {
            if (element.useCase) {
              this.l3ReqConstant.push({
                destination: element.destination[0]
                  .split('native_request_message[')[1]
                  .split(']')[0],
                ipc: 'SYSTEM_ERROR',
                source: element.source,
                type: 'field',
                singleDestination: element.destination.length > 1 ? false : true,
                resImfValue: element.resImfValue,
                useCase: element.useCase,
                condition: element.condition ? element.condition : null,
              });
            } else {
              this.l3ReqConstant.push({
                destination: element.destination[0]
                  .split('native_request_message[')[1]
                  .split(']')[0],
                ipc: 'SYSTEM_ERROR',
                source: element.source,
                type: 'field',
                singleDestination: element.destination.length > 1 ? false : true,
                condition: element.condition ? element.condition : null,
              });
            }
          }
        });
      }
    });
    if (this.l3ReqConstant.length === 0) {
      this.l3ReqConstant.push({
        destination: null,
        ipc: 'SYSTEM_ERROR',
        source: null,
        type: 'field',
        singleDestination: false,
        resImfValue: null,
        useCase: null,
        condition: null,
      });
    }
  }

  private saveConfiguration() {
    if (this.queryObjDropDown.length === 0 && this.enrichModelObject) {
      this.queryObjDropDown.push({
        id: 0,
        name: this.enrichModelObject.lookupType.query.from.mapName,
        value: this.enrichModelObject,
      });
    }
    if (this.enrichModelObject) {
      const data = this.queryObjDropDown.find(
        field => field && JSON.stringify(field.value) === JSON.stringify(this.enrichModelObject),
      );
      if (!data) {
        this.queryObjDropDown.push({
          id: this.queryObjDropDown.length,
          name: this.enrichModelObject.lookupType.query.from.mapName,
          value: this.enrichModelObject,
        });
      }
    }
    this.isoTransactions.map(item => {
      if (item.messageIntentifier === this.selectedTransactionType) {
        item.response.mappings = item.response.mappings.filter(it => it.selectedConstant !== '2');
        item.response.mappings = item.response.mappings.filter(it => it.type !== 'imdg_enrich');
        this.queryObjDropDown.map(queryObj => {
          queryObj.value.fields.map(field => {
            (field.destination = [
              'message_exchange[' +
                this.networkService +
                '].request_message[' +
                field.destination +
                ']',
            ]),
              (field.ipc = 'SYSTEM_ERROR'),
              (field.source = field.source),
              (field.type = 'field');
            return field;
          });
          queryObj.value.lookupType.query.select.columns.map(column => {
            (column.alias.alias = column.source),
              (column.alias.name = column.source),
              (column.alias.type = 'alias');
            return column;
          });
          queryObj.value.lookupType.query.condition.conditions.map(condition => {
            (condition.fieldName = condition.fieldName),
              (condition.value =
                '${message_exchange[' +
                this.networkService +
                '].request_message[' +
                condition.value +
                ']}'),
              (condition.type = 'equal');
            return condition;
          });
          item.response.mappings.push(queryObj.value);
          return queryObj;
        });
      }
      return item;
    });
  }

  public closePopup(event) {
    this.l3ReqConstant = event.save ? event.l3ReqConstant : [];
    if (event.save) {
      this.isoTransactions.map(transactions => {
        if (transactions.messageIntentifier === this.selectedTransactionType) {
          transactions.request.mappings = transactions.request.mappings.filter(
            el => el && el.selectedConstant != '2',
          );
          this.l3ReqConstant.forEach(item => {
            if (item.source && item.destination) {
              this.showReqEnrichVisible = false;
              let destination = [
                '${message_exchange[' +
                  this.networkService +
                  '].native_request_message[' +
                  item.destination +
                  ']}',
              ];
              if (!item.resImfValue) {
                destination[1] =
                  '${message_exchange[' +
                  this.networkService +
                  '].additional_fields[' +
                  item.destination +
                  ']}';
              }
              if (item.useCase == 1 && item.resImfValue) {
                destination[1] = '${' + item.resImfValue + '}';
              } else if (item.useCase == 2 && item.resImfValue) {
                destination[1] =
                  '${message_exchange[' + this.networkService + '].' + item.resImfValue + '}';
              } else if (item.useCase == 3 && !item.singleDestination && item.resImfValue) {
                destination[1] =
                  '${message_exchange[' +
                  this.networkService +
                  '].request_message[' +
                  item.resImfValue +
                  ']}';
              }

              transactions.request.mappings.push({
                destination: destination,
                ipc: 'SYSTEM_ERROR',
                selectedConstant: '2',
                source: item.source,
                type: 'field',
                useCase: item.useCase,
                resImfValue: item.resImfValue,
                condition: item.condition,
              });
            } else {
              this.dataEnrichmentScreenError = true;
            }
          });
        }
        return transactions;
      });
    } else {
      this.isoTransactions.forEach(transactions => {
        if (transactions.messageIntentifier === this.selectedTransactionType) {
          transactions.request.mappings.forEach(element => {
            if (element.selectedConstant == '2') {
              if (element.useCase) {
                this.l3ReqConstant.push({
                  destination: element.destination[0]
                    .split('native_request_message[')[1]
                    .split(']')[0],
                  ipc: 'SYSTEM_ERROR',
                  source: element.source,
                  type: 'field',
                  singleDestination: element.destination.length > 1 ? false : true,
                  resImfValue: element.resImfValue,
                  useCase: element.useCase,
                  condition: element.condition ? element.condition : null,
                });
              } else {
                this.l3ReqConstant.push({
                  destination: element.destination[0]
                    .split('native_request_message[')[1]
                    .split(']')[0],
                  ipc: 'SYSTEM_ERROR',
                  source: element.source,
                  type: 'field',
                  singleDestination: element.destination.length > 1 ? false : true,
                  condition: element.condition ? element.condition : null,
                });
              }
            }
          });
        }
      });
    }
    this.showReqEnrichVisible = false;
  }

  private saveConstant() {
    this.isoTransactions.map(item => {
      if (item.messageIntentifier === this.selectedTransactionType) {
        item.response.mappings = item.response.mappings.filter(
          el => el && el.selectedConstant != 2,
        );
        this.mappings.forEach(item1 => {
          let destination;
          if (item1.useCase == 1) {
            destination = '${' + item1.resImfValue + '}';
          } else if (item1.useCase == 2) {
            destination =
              '${message_exchange[' + this.networkService + '].' + item1.resImfValue + '}';
          } else if (item1.useCase == 3) {
            destination =
              '${message_exchange[' +
              this.networkService +
              '].response_message[' +
              item1.resImfValue +
              ']}';
          }
          item.response.mappings.unshift({
            type: 'field',
            source: item1.source,
            destination: [destination],
            ipc: 'SYSTEM_ERROR',
            useCase: item1.useCase,
            resImfValue: item1.resImfValue,
            selectedConstant: 2,
            condition: item1.condition ? item1.condition : null,
          });
        });
      }
      return item;
    });
  }

  private stringifyObj() {
    this.adapterData.transformData.persistRequired = 1;
    this.validatePreAction();
    this.validatePostAction();
    this.isoTransactions.map(transactions => {
      if (transactions.messageIntentifier === this.selectedTransactionType) {
        this.setPostAction(transactions);
        this.setPreAction(transactions);
      }
      transactions.request.mappings = transactions.request.mappings.filter(el => el && el !== null);
      transactions.response.mappings = transactions.response.mappings.filter(
        el => el && el !== null,
      );
      return transactions;
    });
    this.setCustomMapperItem();
    this.setConstantMapperItem();
    this.adapterData.transformData.requestMapping = {};
    this.adapterData.transformData.requestMapping.transactions = this.isoTransactions;
  }

  public setCustomMapperItem() {
    if (this.selectedTabIndex == 0) {
      this.isoTransactions.forEach(transactions => {
        if (transactions.messageIntentifier === this.selectedTransactionType) {
          const customMappings = transactions.request.mappings.filter(
            item => item.type === 'custom_mapper',
          );
          transactions.request.mappings = transactions.request.mappings.filter(
            item => item.type !== 'custom_mapper',
          );
          if (customMappings) {
            transactions.request.mappings.push(...customMappings);
          }
        }
      });
    }
  }

  public setConstantMapperItem() {
    if (this.selectedTabIndex == 0) {
      this.isoTransactions.forEach(transactions => {
        if (transactions.messageIntentifier === this.selectedTransactionType) {
          const constantMappings = transactions.request.mappings.filter(
            item => item.selectedConstant === '2',
          );
          transactions.request.mappings = transactions.request.mappings.filter(
            item => item.selectedConstant !== '2',
          );
          if (constantMappings) {
            transactions.request.mappings.unshift(...constantMappings);
          }
        }
      });
    } else {
      this.isoTransactions.forEach(transactions => {
        if (transactions.messageIntentifier === this.selectedTransactionType) {
          const customMappings = transactions.response.mappings.filter(
            item => item.selectedConstant === '2',
          );
          transactions.response.mappings = transactions.response.mappings.filter(
            item => item.selectedConstant !== '2',
          );
          if (customMappings) {
            transactions.response.mappings.unshift(...customMappings);
          }
        }
      });
    }
  }

  private getAuthResData(id, data) {
    this.ruleIcon = true;
    this.responseImfField = [];
    data[id].response.mappings.forEach(item => {
      if (item && item.source && item.source !== data[id].messageIntentifier && !item.marker) {
        // request mapping destination array always contains a single data(format is fixed).
        if (
          item.type === 'field' &&
          item.destination &&
          item.destination[0] &&
          !item.selectedConstant
        ) {
          let imfField = this.getImfName(item.destination[0]);
          let source = this.getFieldId(item.source);
          if (item.fieldId) {
            if (source !== item.fieldId) {
              this.responseImfField[source + this.selectedTransactionType] = item.name;
              if (!this.transformActionItemRes[source + this.selectedTransactionType]) {
                this.transformActionItemRes[source + this.selectedTransactionType] = [];
              }
              this.selectSourceResData[source + this.selectedTransactionType] = true;
              this.transformActionItemRes[source + this.selectedTransactionType].push(item);
            } else {
              source = item.fieldId;
              this.responseImfField[source + this.selectedTransactionType] = item.name;
            }
          } else {
            if (this.responseImfField[source + this.selectedTransactionType]) {
              this.responseImfField[source + this.selectedTransactionType] =
                this.responseImfField[source + this.selectedTransactionType] + ',' + imfField;
            } else {
              this.responseImfField[source + this.selectedTransactionType] = imfField;
            }
          }
          this.selectSourceResData[source + this.selectedTransactionType] = true;
          if (!this.transformActionItemRes[source + this.selectedTransactionType]) {
            this.transformActionItemRes[source + this.selectedTransactionType] = [];
          }
          this.transformActionItemRes[source + this.selectedTransactionType].push(item);
        } else {
          const source = this.getFieldId(item.source);
          this.getData(item, source);
          if (item.type === 'in_built_mapper') {
            this.responseImfField[source + this.selectedTransactionType] = item.mapper;
          } else if (item.type === 'groovy_executor' && item.selectedOption === 'script') {
            this.responseImfField[source + this.selectedTransactionType] = 'ScriptMapper';
          }
        }
      }
    });
  }

  private getAuthReqData(id, data) {
    this.ruleIcon = true;
    this.selectedTransactionType = data[id].messageIntentifier;
    this.transformTab = [
      this.selectedTransactionType + ' Request',
      this.selectedTransactionType + ' Response',
    ];
    this.transformTab.push('Pre Action Request');
    this.transformTab.push('Post Action Response');
    this.showRuleConditionList[this.selectedTransactionType] = 'abc';
    this.getReqMapping(data, id);
  }

  private getReqMapping(data, id) {
    data[id].request.mappings.forEach(item => {
      if (item && item.type === 'join') {
        if (
          item.destination &&
          item.destination[0] &&
          item.destination[0].indexOf('native_request_message[') !== -1 &&
          item.selectedOption !== 'mapper' &&
          item.selectedOption !== 'script'
        ) {
          const source = item.fieldId;
          if (item.source) {
            const sourceList = [];
            item.source.forEach((el, i) => {
              let source;
              if (el.sourceType == 'text') {
                source = el.source;
              } else {
                source = this.getImfName(el.source);
              }
              sourceList.push(source);
            });
            this.requestImfField[source + this.selectedTransactionType] = sourceList.join(' ,');
          }
          this.selectSourceData[source + this.selectedTransactionType] = true;
          this.transformActionItem[source + this.selectedTransactionType] = item;
        }
      } else if (
        item &&
        item.source &&
        item.source !== data[id].messageIntentifier &&
        !item.marker
      ) {
        if (
          item.destination &&
          item.destination[0] &&
          item.destination[0].indexOf('native_request_message[') !== -1 &&
          item.selectedOption !== 'mapper' &&
          item.selectedOption !== 'script'
        ) {
          const source = item.fieldId;
          const imfName = this.getImfName(item.source);
          this.requestImfField[source + this.selectedTransactionType] = imfName;
          this.selectSourceData[source + this.selectedTransactionType] = true;
          this.transformActionItem[source + this.selectedTransactionType] = item;
        } else if (item.selectedOption === 'mapper' && item.type !== 'in_built_mapper') {
          const source = this.getFieldId(item.source);
          this.selectSourceData[source + this.selectedTransactionType] = true;
          this.requestImfField[source + this.selectedTransactionType] = item.messageIntentifier;
          if (!this.transformActionItem[source + this.selectedTransactionType]) {
            this.transformActionItem[source + this.selectedTransactionType] = {
              selectedOption: 'mapper',
              value: [],
            };
          }
          this.transformActionItem[source + this.selectedTransactionType].value.push(item);
        } else {
          const source = this.getFieldId(item.source);
          this.selectSourceData[source + this.selectedTransactionType] = true;
          this.transformActionItem[source + this.selectedTransactionType] = item;
          if (item.type === 'in_built_mapper') {
            this.requestImfField[source + this.selectedTransactionType] = item.mapper;
          } else if (item.selectedOption === 'script') {
            this.requestImfField[source + this.selectedTransactionType] = 'Script Mapper';
          }
        }
      }
    });
  }

  private getFieldId = source => {
    let id = source.split('{');
    if (id && id[1]) {
      id = id[1].split('}');
      if (id && id[0]) {
        id = id[0];
      }
    }
    return id;
  };

  private getData = (item, source) => {
    this.transformActionItemRes[source + this.selectedTransactionType] = [];
    this.transformActionItemRes[source + this.selectedTransactionType].push(item);
    this.selectSourceResData[source + this.selectedTransactionType] = true;
  };

  private getImfName = item => {
    if (item.indexOf('_message[') === -1) {
      if (item.indexOf(']') === -1) {
        let imfName = item.split('{');
        if (imfName && imfName[1]) {
          imfName = imfName[1].split('}');
          if (imfName && imfName[0]) {
            return imfName[0];
          }
        }
      } else {
        let imfName = item.split('].');
        if (imfName && imfName[1]) {
          imfName = imfName[1].split('}');
          if (imfName && imfName[0]) {
            return imfName[0];
          }
        }
      }
    } else {
      let imfName = item.split('message[');
      if (imfName && imfName[1]) {
        imfName = imfName[1].split(']');
        if (imfName && imfName[0]) {
          return imfName[0];
        }
      }
    }
  };

  private pushReqData(id, data, flag = '') {
    this.isoTransactions.map(transactions => {
      if (transactions.messageIntentifier === this.selectedTransactionType) {
        transactions.request.mappings.forEach((element, i) => {
          if (element && element.fieldId === id) {
            if (element.type === 'field' && flag === 'mapper') {
              const source = element.source.split('{')[1].split('}')[0];
              this.selectSourceData[source + this.selectedTransactionType] = false;
              this.requestImfField[source + this.selectedTransactionType] = '';
              this.transformActionItem[source + this.selectedTransactionType] = undefined;
            }
            this.currentIndex = i;
            delete transactions.request.mappings[i];
          } else if (element.selectedFormat == 4) {
            const source = element.source.split('{')[1].split('}')[0];
            if (source === id) {
              this.currentIndex = i;
              delete transactions.request.mappings[i];
            }
          }
        });
        transactions.request.mappings = transactions.request.mappings.filter(x => x !== null);
        data.forEach(item => {
          if (!this.currentIndex) {
            transactions.request.mappings.push(item);
          } else {
            transactions.request.mappings.splice(this.currentIndex, 0, item);
          }
        });
      }
      return transactions;
    });
  }

  private pushResData(data) {
    this.isoTransactions.forEach(transactions => {
      if (transactions.messageIntentifier === this.selectedTransactionType) {
        transactions.response.mappings.forEach((map, index) => {
          if (map && map.source === data.source) {
            this.currentIndex = index;
            delete transactions.response.mappings[index];
          } else if (
            map &&
            ((map.source && map.source === data.fieldId) ||
              (map.fieldId && map.fieldId === data.fieldId))
          ) {
            if (map.source) {
              const source1 = map.source.split('{')[1].split('}')[0];
              if (data.fieldId !== source1) {
                this.selectSourceResData[source1 + this.selectedTransactionType] = [];
                this.responseImfField[source1 + this.selectedTransactionType] = ' ';
                this.selectSourceResData[source1 + this.selectedTransactionType] = false;
              }
            }
            this.currentIndex = index;
            delete transactions.response.mappings[index];
          }
        });
      }
    });
  }

  public removeFile(index) {
    this.fileInfos.splice(index, 1);
  }

  public uploadFile(event) {
    const files = event?.target?.files;
    const fileName = event?.target?.files[0]?.name;
    const isValidName = fileName && Utils.isFileNameExist(this.fileInfos, fileName);
    if (!isValidName) {
      this.showLoader = true;
      this.jarFileExistWarning = null;
      const formData = new FormData();
      if (event.target.files && event.target.files.length > 0) {
        const file = event.target.files[0];
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = (e: any) => {
          formData.set('uplodedFile', file);
          formData.set('allowed-file-type', '.jar');
          this._l1AdapterService.upload(formData).subscribe(item => {
            this.showLoader = false;
            if (item && item.status !== 'failure') {
              this.fileInfos.push({ id: item.data.id, name: item.data.name });
            }
          });
        };
      }
    } else {
      this.jarFileExistWarning = `${fileName} Already Exist.`;
    }
  }

  opensetCustomMapper() {
    this.fileInfos = [];
    const map = JSON.parse(this.adapterDataMap['custom.jar.files.id']);
    const output = this.adapterData.networkData.properties.network.find(
      x =>
        (x.field === 'custom.jar.files.id' || x.field === 'network--custom.jar.files.id') &&
        x.datatype === 'file',
    );
    if (output) {
      this.isJarUpload = true;
      if (output.value !== 'BLANK') {
        const fileName = output.fileName.split('|');
        const fileValue = output.value.split('|');
        fileName.forEach((element, index) => {
          this.fileInfos.push({
            id: fileValue[index],
            name: element,
          });
        });
      }
    } else if (map && map.field === 'custom.jar.files.id') {
      this.isJarUpload = true;
    }

    if (this.selectedTabIndex == 0) {
      const output = this.isoTransactions.find(
        transactions => transactions.messageIntentifier === this.selectedTransactionType,
      );
      this.customMappings = output.request.mappings.filter(item => item.type === 'custom_mapper');
      if (this.customMappings.length === 0) {
        this.customMappings.push({
          type: 'custom_mapper',
          className: null,
          ipc: null,
        });
      }
    } else {
      const output = this.isoTransactions.find(
        transactions => transactions.messageIntentifier === this.selectedTransactionType,
      );
      this.customMappings = output.response.mappings.filter(item => item.type === 'custom_mapper');
      if (this.customMappings.length === 0) {
        this.customMappings.push({
          type: 'custom_mapper',
          className: null,
          ipc: null,
        });
      }
    }
    this.setCustomMapper = true;
  }

  closeSetCustomMapper() {
    let output = this._adapterCommonService.getJarFileData(
      JSON.parse(this.adapterDataMap['custom.jar.files.id']),
      this.adapterData.networkData.properties.network,
      this.fileInfos,
    );
    this.adapterData.networkData.properties.network =
      this._adapterCommonService.addAndRemoveJarFile(
        this.adapterData.networkData.properties.network,
        output,
      );

    if (this.selectedTabIndex == 0) {
      this.isoTransactions.forEach(transactions => {
        if (transactions.messageIntentifier === this.selectedTransactionType) {
          transactions.request.mappings = transactions.request.mappings.filter(
            item => item.type !== 'custom_mapper',
          );
          this.customMappings = this.customMappings.filter(item => {
            if (item.className) {
              item.className = item.className.replace(/<[^>]*>/g, '');
            }
            transactions.request.mappings.push(...this.customMappings);
          });
        }
      });
    } else {
      this.isoTransactions.forEach(transactions => {
        if (transactions.messageIntentifier === this.selectedTransactionType) {
          transactions.response.mappings = transactions.response.mappings.filter(
            item => item.type !== 'custom_mapper',
          );
          this.customMappings = this.customMappings.filter(item => {
            if (item.className) {
              item.className = item.className.replace(/<[^>]*>/g, '');
            }
            transactions.response.mappings.unshift(...this.customMappings);
          });
        }
      });
    }
    this.setCustomMapper = false;
  }

  public pullCustomMapperItem(i) {
    this.customMappings.splice(i, 1);
  }

  public pushCustomMapperItem() {
    this.customMappings.push({
      type: 'custom_mapper',
      className: null,
      ipc: null,
    });
  }

  public executeFn(data, item) {
    item.listParam = [];
    item.param = [];
    item.mapParam = [];
    data.parameters.forEach((element, index) => {
      let dataList = [];
      let serviceList = [];
      if (element.possibleValue && element.possibleValue.length > 0) {
        element.possibleValue.forEach(pValue => {
          dataList.push({ id: pValue, name: pValue });
        });
      } else if (element.name.indexOf('source') !== -1) {
        dataList = this.authData;
      } else if (element.name.indexOf('imf') !== -1) {
        this.imfList.forEach(iValue => {
          dataList.push({ id: iValue.name, name: iValue.alias });
        });
        serviceList = this.serviceList;
      }
      if (element.dataType.toLowerCase() === 'list') {
        this.paramlistFn(item, element, dataList, serviceList, false, index);
      } else if (element.dataType.toLowerCase() === 'map') {
        this.paramMapFn(item, element, serviceList, false, index);
      } else {
        item.param.push({
          type: element.dataType,
          label: element.name,
          list: dataList,
          name: element.displayName,
          value: null,
        });
      }
    });
  }

  public removeListParam(item) {
    item.pop();
  }
  public addListParam(item, concat, index) {
    this.paramlistFn(item, concat, concat.list, concat.serviceList, true, index);
  }
  public removeMapParam(item) {
    item.pop();
  }
  public addMapParam(item, concat, parametersIndex) {
    this.paramMapFn(item, concat, concat.serviceList, true, parametersIndex);
  }
  public radioChange(item) {
    item.isVisiblecon = true;
  }
  public getConRule(data) {
    this.postActionArray[this.selectedTransactionType][data.id].conditionObj = data.condition;
    this.postActionArray[this.selectedTransactionType][data.id].isVisiblecon = false;
  }
  public conCancel(item) {
    item.isVisiblecon = false;
  }

  public saveMessageConRule(event) {
    this.responseMapping = false;
    this.requestMapping = false;
    this.isTransactionCondVisible = false;
    this.showRuleConditionList[this.selectedTransactionType] = 'abc';
    this.jsonCondition = JSON.parse(JSON.stringify(event.condition));
    const result = this.isoTransactions.find(
      item => item.messageIntentifier === this.selectedTransactionType,
    );
    if (result) {
      result.condition = this.jsonCondition;
    }
  }

  private paramMapFn(item, element, serviceList, flag = false, index) {
    let dataList = [];
    let dataList2 = [];
    let splitName = [];
    if (!flag) {
      splitName = element.name.split(':');
      if (splitName[0].indexOf('imf') !== -1) {
        this.imfList.forEach(imfData => {
          dataList.push({ id: imfData.name, name: imfData.alias });
        });
      } else if (splitName[0].indexOf('source') !== -1) {
        dataList = this.authData;
      } else {
        element.possibleValue[0].forEach(possibleValue => {
          dataList.push({ id: possibleValue, name: possibleValue });
        });
      }
      if (splitName[1].indexOf('imf') !== -1) {
        this.imfList.forEach(imfData => {
          dataList2.push({ id: imfData.name, name: imfData.alias });
        });
      } else if (splitName[1].indexOf('source') !== -1) {
        dataList2 = this.authData;
      } else {
        element.possibleValue[1].forEach(possibleValue => {
          dataList2.push({ id: possibleValue, name: possibleValue });
        });
      }
    }
    if (!item.mapParam[index]) {
      item.mapParam[index] = [];
    }
    item.mapParam[index].push({
      type: flag ? element.type : element.dataType,
      list: flag ? element.list : dataList,
      list2: flag ? element.list2 : dataList2,
      name: flag ? element.name : element.displayName.split(':')[0],
      name2: flag ? element.name2 : element.displayName.split(':')[1],
      label: flag ? element.label : splitName[0],
      label2: flag ? element.label2 : splitName[1],
      value: null,
      value2: null,
      selection: 'List',
    });
  }

  private paramlistFn(item, element, dataList, serviceList, flag = false, index) {
    let name = element.name;
    if (flag) {
      name = element.label;
    }
    if (!item.listParam[index]) {
      item.listParam[index] = [];
    }
    if (name.indexOf('imf') !== -1) {
      item.listParam[index].push({
        type: flag ? element.type : element.dataType,
        list: dataList,
        name: flag ? element.name : element.displayName,
        label: flag ? element.label : element.name,
        value: null,
      });
    } else {
      item.listParam[index].push({
        type: flag ? element.type : element.dataType,
        list: dataList,
        name: flag ? element.name : element.displayName,
        label: flag ? element.label : element.name,
        value: null,
      });
    }
  }

  private getMapEditData(element1, mapParam, parameter) {
    if (!mapParam) {
      mapParam = [];
    }
    let selectionVal = 'List';
    const splitName = element1.name.split(':');
    let dataList2 = [];
    let dataList = [];
    if (splitName[0].indexOf('imf') !== -1) {
      this.imfList.forEach(imfData => {
        dataList.push({ id: imfData.name, name: imfData.alias });
      });
    } else if (splitName[0].indexOf('source') !== -1) {
      dataList = this.authData;
    } else {
      element1.possibleValue[0].forEach(possibleValue => {
        dataList.push({ id: possibleValue, name: possibleValue });
      });
    }
    if (splitName[1].indexOf('imf') !== -1) {
      this.imfList.forEach(imfData => {
        dataList2.push({ id: imfData.name, name: imfData.alias });
      });
    } else if (splitName[1].indexOf('source') !== -1) {
      dataList2 = this.authData;
    } else {
      element1.possibleValue[1].forEach(possibleValue => {
        dataList2.push({ id: possibleValue, name: possibleValue });
      });
    }
    const mapArray = Object.keys(parameter);
    let value;
    let value2;
    // let service
    mapArray.forEach((list, id) => {
      value = list;
      value2 = parameter[mapArray[id]];
      if (splitName[1].indexOf('imf') !== -1) {
        if (parameter[mapArray[id]].indexOf('{') !== -1) {
          selectionVal = 'List';
        } else {
          selectionVal = 'Text';
        }
      }
      mapParam.push({
        type: element1.dataType,
        list: dataList,
        list2: dataList2,
        name: element1.displayName.split(':')[0],
        name2: element1.displayName.split(':')[1],
        label: splitName[0],
        label2: splitName[1],
        value: value,
        value2: value2,
        selection: selectionVal,
      });
    });
    return mapParam;
  }

  private getValue(condition) {
    if (condition) {
      if (condition.conditions && condition.conditions.length > 0) {
        condition.conditions.forEach(element => {
          if (element.conditions) {
            this.getValue(element);
          } else {
            this.inValue(element);
          }
        });
      } else {
        this.inValue(condition);
      }
    }
    return condition;
  }

  private inValue(conditions) {
    if (conditions.type === 'in') {
      if (conditions.value.indexOf(',') !== -1) {
        conditions.value = conditions.value.split(',');
      } else {
        conditions.value = [conditions.value];
      }
    }
  }

  private getConditionObj(condition, conditionObjData) {
    if (condition.conditions) {
      condition.conditions.map(a => {
        if (a.conditions) {
          this.getConditionObj(a, conditionObjData);
        } else {
          a = this.getconValue(a);
        }
        return a;
      });
      conditionObjData = JSON.parse(JSON.stringify(condition));
    } else {
      condition = this.getconValue(condition);
      conditionObjData = {
        conditions: [JSON.parse(JSON.stringify(condition))],
        type: 'and',
      };
    }
    return conditionObjData;
  }

  private getconValue(condition) {
    let conValue = condition.value;
    if (condition.type === 'in' && conValue[0]) {
      condition.value.forEach((a, i) => {
        if (i === 0) {
          conValue = a;
        } else {
          conValue = conValue + ',' + a;
        }
      });
      condition.value = conValue;
    }
    return condition;
  }

  private transformLogic(data) {
    return data.map(item => {
      if (!item.attributes) {
        item.title = item.alias;
        item.key = item.nestedName;
        item.isLeaf = true;
      } else {
        item.title = item.name;
        item.key = item.nestedName;
        if (item.useCase !== '3') {
          item.disabled = true;
        }
      }
      if (item.attributes) {
        item.children = this.transformLogic(item.attributes);
      }
      return item;
    });
  }

  public closeReqConstant(event) {
    this.enrichfields = event.enrichfields;
    this.mappings = event.mappings;
    this.queryObjDropDown = event.queryObjDropDown;
    this.isDataEnrichmentScreenVisible = false;
    this.dataEnrichmentScreenError = false;
    this.checkConfigError();
    if (!this.dataEnrichmentScreenError) {
      if (this.enrichfields == 'configuration') {
        this.saveConfiguration();
      } else {
        this.clearEnrichModel();
        this.saveConstant();
      }
      this.isDataEnrichmentScreenVisible = false;
    }
  }

  private getPreActionData() {
    this._store
      .pipe(takeUntil(this.componentDestroyed), select(SelectPreActionMethod))
      .subscribe((ExecuteRes: any) => {
        if (ExecuteRes && ExecuteRes.data) {
          this.preExecuteData = ExecuteRes.data;
          this.isoTransactions.forEach(transactions => {
            if (transactions.messageIntentifier === this.selectedTransactionType) {
              this.preActionArray[transactions.messageIntentifier] = [];
              if (transactions.request.pre_actions) {
                transactions.request.pre_actions.forEach(element => {
                  const executeModelN = this.preExecuteData.find(
                    x => x && x.actionName === element.execute,
                  );
                  const paramN = [];
                  const listParamN = [];
                  const mapParamN = [];
                  this.preActionArray[transactions.messageIntentifier].push({
                    executeModel: executeModelN,
                    // tslint:disable-next-line: object-literal-sort-keys
                    IPCvalue: element.ipc,
                    preAction: element.condition ? 'Conditional' : 'Optional',
                    param: paramN,
                    listParam: listParamN,
                    mapParam: mapParamN,
                    conditionObj: element.condition,
                    parameter: element.parameters,
                  });
                });
              }
            }
          });
        }
      });
  }

  private setPreAction(transactions) {
    transactions.request.pre_actions = [];
    this.preActionArray[transactions.messageIntentifier].forEach(element => {
      // tslint:disable-next-line: no-unused-expression
      const parameter = element.parameter ? element.parameter : [];
      if (element.executeModel) {
        if (
          parameter.length > 0 ||
          !element.executeModel.parameters ||
          element.executeModel.parameters.length === 0
        ) {
          const postObject = {
            type: 'CartPreActions',
            execute: element.executeModel.actionName,
            parameters: parameter,
          };
          if (element.IPCvalue) {
            postObject['ipc'] = element.IPCvalue;
          }
          if (element.preAction === 'Conditional' && element.conditionObj) {
            postObject['condition'] = element.conditionObj;
          }
          transactions.request.pre_actions.push(JSON.parse(JSON.stringify(postObject)));
        }
      }
    });
    return transactions.request.pre_actions;
  }

  public addPreAction() {
    this.preActionArray[this.selectedTransactionType].push({
      preAction: 'Optional',
      postConditionId: null,
      executeModel: null,
      param: [],
      listParam: [],
      mapParam: [],
      IPCvalue: null,
      conditionObj: null,
    });
  }

  public preCloseParamPopup(a) {
    if (
      !this.preActionArray[this.selectedTransactionType][a].parameter ||
      this.preActionArray[this.selectedTransactionType][a].parameter.length === 0
    ) {
      this.preActionArray[this.selectedTransactionType][a].executeModel = null;
      this.preActionArray[this.selectedTransactionType][a].parameter = [];
    }
    this.showPreActionParam = false;
  }

  public removePreAction(index) {
    this.preActionArray[this.selectedTransactionType].splice(index, 1);
  }

  public addPreParam(event) {
    this.showPreActionParam = false;
    this.preActionArray[this.selectedTransactionType][event.index].parameter = event.param;
  }

  private setPostAction(transactions) {
    transactions.response.postActions = [];
    this.postActionArray[transactions.messageIntentifier].forEach(element => {
      // tslint:disable-next-line: no-unused-expression
      const parameter = element.parameter ? element.parameter : [];
      if (element.executeModel) {
        if (
          parameter.length > 0 ||
          !element.executeModel.parameters ||
          element.executeModel.parameters.length === 0
        ) {
          const postObject = {
            type: 'CartPostActions',
            execute: element.executeModel.actionName,
            parameters: parameter,
          };
          if (element.IPCvalue) {
            postObject['ipc'] = element.IPCvalue;
          }
          if (element.postAction === 'Conditional' && element.conditionObj) {
            postObject['condition'] = element.conditionObj;
          }
          transactions.response.postActions.push(JSON.parse(JSON.stringify(postObject)));
        }
      }
    });
  }

  public closeParamPopup(a) {
    if (
      !this.postActionArray[this.selectedTransactionType][a].parameter ||
      this.postActionArray[this.selectedTransactionType][a].parameter.length === 0
    ) {
      this.postActionArray[this.selectedTransactionType][a].executeModel = null;
      this.postActionArray[this.selectedTransactionType][a].parameter = [];
    }
    this.showPostActionParam = false;
  }

  public addParam(event) {
    this.showPostActionParam = false;
    this.postActionArray[this.selectedTransactionType][event.index].parameter = event.param;
  }

  validatePostAction() {
    let flag = true;
    if (
      this.postActionArray[this.selectedTransactionType] &&
      this.postActionArray[this.selectedTransactionType].length > 0
    ) {
      this.postActionArray[this.selectedTransactionType].forEach(element => {
        if (!element.executeModel) {
          element.showError = true;
          this._alertSerivce.responseMessage({
            message: 'Please provide all mandatory field in post action',
            status: 'failure',
          });
          flag = false;
        } else if (!element.IPCvalue) {
          element.showError = true;
          this._alertSerivce.responseMessage({
            message: 'Please provide all mandatory field in post action',
            status: 'failure',
          });
          flag = false;
        } else {
          element.showError = false;
        }
      });
    }
    return flag;
  }

  savePostAction() {
    const flag = this.validatePostAction();
    if (flag) {
      this.stringifyObj();
    }
  }

  public addPostAction() {
    this.postActionArray[this.selectedTransactionType].push({
      postAction: 'Optional',
      postConditionId: null,
      executeModel: null,
      param: [],
      listParam: [],
      mapParam: [],
      IPCvalue: null,
      conditionObj: null,
    });
  }

  public removePostAction(index) {
    this.postActionArray[this.selectedTransactionType].splice(index, 1);
  }

  public getRule(data) {
    this.postActionArray[this.selectedTransactionType][data.id].conditionObj = data.condition;
    this.postActionArray[this.selectedTransactionType][data.id].isVisiblecon = false;
  }

  public getImfFn(event, flag) {
    if (flag === 'paramIMF') {
      const id = event.id.split(',');
      this.postActionArray[this.selectedTransactionType][id[0]].param[id[1]].value = JSON.parse(
        JSON.stringify(event.value),
      );
    } else if (flag === 'listIMF') {
      const id = event.id.split(',');
      this.postActionArray[this.selectedTransactionType][id[0]].listParam[id[1]][id[2]].value =
        JSON.parse(JSON.stringify(event.value));
    } else if (flag === 'map1IMF') {
      const id = event.id.split(',');
      this.postActionArray[this.selectedTransactionType][id[0]].mapParam[id[1]][id[2]].value =
        JSON.parse(JSON.stringify(event.value));
    } else if (flag === 'map2IMF') {
      const id = event.id.split(',');
      this.postActionArray[this.selectedTransactionType][id[0]].mapParam[id[1]][id[2]].value2 =
        JSON.parse(JSON.stringify(event.value));
    }
  }

  private getPostActionData() {
    this._store
      .pipe(takeUntil(this.componentDestroyed), select(SelectPostActionMethod))
      .subscribe((response: any) => {
        if (response && response.data) {
          this.executeData = response.data;
          this.isoTransactions.forEach(transactions => {
            if (transactions.messageIntentifier === this.selectedTransactionType) {
              this.postActionArray[transactions.messageIntentifier] = [];
              if (transactions.response.postActions) {
                transactions.response.postActions.forEach(element => {
                  const executeModelN = this.executeData.find(
                    x => x && x.actionName === element.execute,
                  );
                  const paramN = [];
                  const listParamN = [];
                  const mapParamN = [];
                  this.postActionArray[transactions.messageIntentifier].push({
                    executeModel: executeModelN,
                    // tslint:disable-next-line: object-literal-sort-keys
                    IPCvalue: element.ipc,
                    postAction: element.condition ? 'Conditional' : 'Optional',
                    param: paramN,
                    listParam: listParamN,
                    mapParam: mapParamN,
                    conditionObj: element.condition,
                    parameter: element.parameters,
                  });
                });
              }
            }
          });
        }
      });
  }

  //// new post action code
  public poststepFunction(data, a, i, flag = false) {
    if (flag) {
      this.postActionArray[this.selectedTransactionType][a].parameter = [];
    }
    if (data.parameters && data.parameters.length > 0) {
      this.showPostActionParam = true;
      this.selectedPostActionParameter = {
        data: data,
        index: a,
        index2: i,
        stepParam: this.postActionArray[this.selectedTransactionType][a].parameter,
      };
    }
  }

  public preGetRule(value) {
    this.preActionArray[this.selectedTransactionType][value.id].conditionObj = value.condition;
    this.preActionArray[this.selectedTransactionType][value.id].isVisiblecon = false;
  }

  public preGetImfFn(event, flag) {
    if (flag === 'paramIMF') {
      const id = event.id.split(',');
      this.preActionArray[this.selectedTransactionType][id[0]].param[id[1]].value = JSON.parse(
        JSON.stringify(event.value),
      );
    } else if (flag === 'listIMF') {
      const id = event.id.split(',');
      this.preActionArray[this.selectedTransactionType][id[0]].listParam[id[1]][id[2]].value =
        JSON.parse(JSON.stringify(event.value));
    } else if (flag === 'map1IMF') {
      const id = event.id.split(',');
      this.preActionArray[this.selectedTransactionType][id[0]].mapParam[id[1]][id[2]].value =
        JSON.parse(JSON.stringify(event.value));
    } else if (flag === 'map2IMF') {
      const id = event.id.split(',');
      this.preActionArray[this.selectedTransactionType][id[0]].mapParam[id[1]][id[2]].value2 =
        JSON.parse(JSON.stringify(event.value));
    }
  }

  validatePreAction() {
    let flag = true;
    if (
      this.preActionArray[this.selectedTransactionType] &&
      this.preActionArray[this.selectedTransactionType].length > 0
    ) {
      this.preActionArray[this.selectedTransactionType].forEach(element => {
        if (!element.executeModel) {
          element.showError = true;
          this._alertSerivce.responseMessage({
            message: 'Please provide all mandatory field in pre action',
            status: 'failure',
          });
          flag = false;
        } else if (!element.IPCvalue) {
          element.showError = true;
          this._alertSerivce.responseMessage({
            message: 'Please provide all mandatory field in pre action',
            status: 'failure',
          });
          flag = false;
        } else {
          element.showError = false;
        }
      });
    }
    return flag;
  }

  savePreAction() {
    const flag = this.validatePreAction();
    if (flag) {
      this.stringifyObj();
    }
  }

  public prestepFunction(data, a, i, flag = false) {
    if (flag) {
      this.preActionArray[this.selectedTransactionType][a].parameter = [];
    }
    if (data.parameters && data.parameters.length > 0) {
      this.showPreActionParam = true;
      this.selectedPreActionParameter = {
        data: data,
        index: a,
        index2: i,
        stepParam: this.preActionArray[this.selectedTransactionType][a].parameter,
      };
    }
  }
}
