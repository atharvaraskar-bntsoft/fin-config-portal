import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { L1AdapterService } from '@app/services/l1-adapter.service';
import { AdapterCommonService } from '../../../services/adapter-common.service';
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
import { Utils } from 'src/utils';
import {
  DraftTransform,
  GetAdapterDataMap,
  GetL1AdapterEntityIMF,
  GetL1AdapterEntityMapping,
  GetMessageContextList,
  GetPostActionMethod,
  GetPreActionMethod,
  GetStepListMethod,
} from '../../../store/actions/l1-adapter.action';
import {
  selectAdapterDataMap,
  selectL1AdapterEntityIMFList,
  selectL1AdapterEntityMappingList,
  selectL1DraftSave,
  SelectMessageContextList,
  SelectPostActionMethod,
  SelectPreActionMethod,
  SelectStepLisMethod,
} from '../../../store/selectors/l1-adapter.selectors';
import { IAppState } from '../../../store/state/app.state';
import { AlertService } from '@app/services/alert.service';

@Component({
  selector: 'app-transform-json',
  styleUrls: ['../l1-adapters.component.scss'],
  templateUrl: './transform-json.component.html',
})
export class TransformJsonComponent implements OnInit, OnDestroy {
  @Input() public adapterData: any;
  @Input() public template: any;
  @Input() public format: any;
  @Input() public name: any;
  @Input() public imfId: any;
  @Input() readOnlyFlag = false;
  @Input() tabIndex;
  @Input() public checkSingleProperties: boolean;
  public mapperList = [];
  public loopArray = [];
  public responseKey = 'default';
  public isVisible = false;
  public isArray = false;
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
  public currentActiveTab: any;
  public transactionRequestArray = [];
  public transactionResponseArray = [];
  public showRuleConditionList = [];
  public isDataEnrichmentScreenVisible = false;
  public enrichfields = 'configuration';
  public entityMappingList = [];
  public entityIMFList = [];
  public entityColumn = [];
  public entityList;
  public authData = [];
  public responseData = [];
  public preActionArray = [];
  public selectedTransactionType;
  public transformTab = [];
  public selectSourceData = [];
  public selectSourceResData = [];
  public authResEcho = [];
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
  public selectedPreActionParameter;
  public adapterDataMap: any;
  public echoObject: any = {};
  public transformActionItem: any = [];
  public transformActionItemRes: any = [];
  public FldID;
  public isRequest: any;
  public AuthorizationTitle: any;
  public reqIMFObj: any = [];
  public resIMFObj: any = [];
  public resIMFLeg: any = [];
  public customMappings: any = [];
  public isJarUpload = false;
  public setCustomMapper = false;
  public fileInfos = [];
  public fileExtnsion;
  public showLoader = false;
  public allTransactionText = '';
  public queryObjDropDown = [];
  public queryObjDropDownModel;
  public queryObjIndex;
  public ruleSAF;
  public dataEnrichmentScreenError = false;
  public totals = 0;
  public serviceList;
  public jsonData;
  public requestMappingTransaction;
  public responseMappingTransaction;
  public mappings: any = [];
  public jsonTransactions: any = [];
  public ruleIcon = false;
  public mapping_dto: any = {};
  public reqRuleMapDisable;
  public resRuleMapDisable;
  public setConstantMap = [];
  public imfLeg: any;
  public elData = [];
  public enrichMessage;
  public enrichModelObject: any;
  public removable = true;
  public contextNew = [];
  @Output() public tabValue: EventEmitter<Object> = new EventEmitter<Object>();
  private componentDestroyed = new Subject();
  public isResponseMutltipleCondition = false;
  public showReqEnrichVisible = false;
  public l1ResConstant = [];
  public resMultipleCondition;
  public imfList;
  public currentIndex = null;
  public postActionArray = [];
  public ipcList = [];
  public executeData = [];
  public preExecuteData = [];
  public contextImf = [];
  public aphaNumeric = new RegExp('^[0-9a-zA-Z ]+$');
  public valueValidError = false;
  public valueSelectionList = ['List', 'Text'];
  jarFileExistWarning: any;
  public requestCon = true;
  public responseCon = true;
  public resCondition;
  public reqCondition;
  public apiName = null;
  public showPostActionParam = false;
  public showPreActionParam = false;
  public selectedPostActionParameter;
  public showCancelBtn = false;
  public preShowCancelBtn = false;
  public isJson = false;
  public apiFields = [];
  public jsonCondition = null;
  public stepList = [];
  public listApiName = [];
  constructor(
    private _store: Store<IAppState>,
    public _l1AdapterService: L1AdapterService,
    public _adapterCommonService: AdapterCommonService,
    public _alertSerivce: AlertService,
  ) {
    this.getterApi();
    this.setterApi();
  }

  public setterApi() {
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
    this._store
      .pipe(takeUntil(this.componentDestroyed), select(selectMapper))
      .subscribe((response: any) => {
        if (response) {
          this.mapperList = response;
          // temporary solution for object ref issues
          localStorage.setItem('mapperList', JSON.stringify(response));
        }
      });
    this._store.pipe(select(selectL1AdapterEntityMappingList)).subscribe((response: any) => {
      if (response && response.data) {
        this.entityList = response.data;
        this.entityMappingList = Object.keys(response.data);
      }
    });
    this._store.pipe(select(selectL1AdapterEntityIMFList)).subscribe((response: any) => {
      if (response && response.data) {
        this.entityIMFList = response.data.ImfField;
      }
    });
    this._store.pipe(select(selectGetServiceType)).subscribe((response: any) => {
      if (response) {
        this.serviceList = response;
      }
    });

    this._store.pipe(select(SelectMessageContextList)).subscribe((response: any) => {
      if (response && response.data) {
        this.jsonData = JSON.parse(JSON.stringify(response.data.messageContextFieldsByVersion));
        const attributes = JSON.parse(JSON.stringify(response.data.messageContextFieldsByVersion));
        this.contextNew = this.transformLogic(attributes.attributes);
        this.contextImf = this.transformLogicNew(
          response.data.messageContextFieldsByVersion.attributes,
        );
      }
    });

    this._store
      .pipe(takeUntil(this.componentDestroyed), select(selectIMF))
      .subscribe((response: any) => {
        if (response) {
          this.imfList = response.ImfField;
        }
      });
    this._store
      .pipe(takeUntil(this.componentDestroyed), select(selectIPC))
      .subscribe((response: any) => {
        if (response) {
          this.ipcList = response;
        }
      });

    this._store
      .pipe(takeUntil(this.componentDestroyed), select(selectAdapterDataMap))
      .subscribe((response: any) => {
        if (response) {
          this.adapterDataMap = response.data.AdapterdataMap;
        }
      });

    this._store
      .pipe(takeUntil(this.componentDestroyed), select(selectL1DraftSave))
      .subscribe((response: any) => {
        this.isSaveDraft = false;
      });
  }

  public getterApi() {
    this._store.dispatch(new GetStepListMethod());
    this._store.dispatch(new GetElFunction());
    this._store.dispatch(new GetPostActionMethod());
    this._store.dispatch(new GetPreActionMethod());
    this._store.dispatch(new GetIPC());
    this._store.dispatch(new GetAdapterDataMap());
    this._store.dispatch(new GetServiceType());
    this._store.dispatch(new GetL1AdapterEntityIMF());
    this._store.dispatch(new GetL1AdapterEntityMapping());
  }

  public apiRequestResponse(event) {
    this.authData = [];
    this.transformTab = [];
    this.transactionTypeValueList = event.transactionTypeValueList;
    this.selectedTransactionType = event.transactionTypeValueList.length
      ? this.transactionTypeValueList[0].value
      : null;
    this.getPostActionData();
    this.getPreActionData();
    this.tabTransform(event, 0);
    this.transactionSelection({ nzValue: this.selectedTransactionType });
    this.tabChange(this.transformTab[0], 0);
  }

  public apiRequestResponse2(event) {
    this.authData = [];
    this.transactionTypeValueList = event.transactionTypeValueList;
    if (this.selectedTransactionType) {
      this.selectedTransactionType = event.transactionTypeValueList.length
        ? this.transactionTypeValueList.find(item => item.name == this.selectedTransactionType).name
        : null;
    } else {
      this.selectedTransactionType = event.transactionTypeValueList.length
        ? this.transactionTypeValueList[0].value
        : null;
    }
    this.tabTransform(event, 0);
  }

  public tabChange(tab, i) {
    this.currentActiveTab = tab;
    this.responseKey = this.currentActiveTab.outgoingPackagerName;
    if (tab && tab.data && (tab.key === 'request' || tab.key === 'response')) {
      this.adapterData.transformData.listIdRule = tab.data.concat(
        this.adapterData.transformData.apiFieldsData.headerFields,
      );
    }
    if (tab.key === 'response' && tab.api.isMutliResponse == 'Y') {
      this.authReqDivShow = 'res';
      this.selectedTabIndex = i;
      this.authData = tab.data;
      const index = this.jsonTransactions.findIndex(
        item =>
          item.messageIntentifier === this.selectedTransactionType &&
          item.contractIntentifier == this.apiName.apiName &&
          this.apiName.multiple,
      );
      tab.api.apiConditionalPackgerFields.map(item => {
        this.selectSourceResData = [];
        this.responseImfField = [];
        this.getJsonAuthMultipleResData(index, this.jsonTransactions);
      });
    } else if (tab.key === 'response' && !tab.api.isMutliResponse) {
      const index = this.jsonTransactions.findIndex(
        item =>
          item.messageIntentifier === this.selectedTransactionType &&
          item.contractIntentifier == this.apiName.apiName,
      );
      this.authReqDivShow = 'res';
      this.selectedTabIndex = i;
      this.authData = tab.data;
      this.selectSourceResData = [];
      this.responseImfField = [];
      this.getJsonAuthResData(index, this.jsonTransactions);
    } else if (tab.key === 'request') {
      const index = this.jsonTransactions.findIndex(
        item =>
          item.messageIntentifier === this.selectedTransactionType &&
          item.contractIntentifier == this.apiName.apiName,
      );
      this.authReqDivShow = 'req';
      this.selectedTabIndex = i;
      this.authData = tab.data;
      this.getJsonAuthReqData(index, this.jsonTransactions);
    } else if (tab.key === 'postAction') {
      this.authReqDivShow = 'post';
    } else if (tab.key === 'preAction') {
      this.authReqDivShow = 'pre';
    }
  }

  public ngOnInit() {
    this._store.dispatch(new GetInBuiltMapper(this.template.id));
    if (this.ruleListItem.length === 0) {
      if (this.adapterData.transformData.apiFieldsData) {
        this.listApiName = [];
        this.adapterData.transformData.persistRequired = 0;
        this.apiFields = this.adapterData?.transformData?.apiFieldsData?.apiFields.map(item => {
          item.transactionTypeValueList = [];
          if (!item?.apiConditionalPackgerFields && item?.outGoingFields?.length) {
            item.multiple = false;
          } else if (item.apiConditionalPackgerFields?.length) {
            item.multiple = true;
          }
          this.listApiName.push(item.apiName);
          return item;
        });
        this.authReqDivShow = 'req';
        this.jsonTransactions = JSON.parse(
          JSON.stringify(this.adapterData.transformData.requestMapping),
        );
        this.jsonTransactions = this.jsonTransactions?.transactions || [];
        this.jsonTransactions = this.jsonTransactions
          .map(transactions => {
            this.allTransactionText =
              this.allTransactionText + ',' + transactions.messageIntentifier;
            let messageType = JSON.parse(
              JSON.stringify(transactions.messageIntentifier.toLowerCase()),
            );
            const array = messageType.split(' ');
            if (array && array.length > 1) {
              messageType = array.join('');
            }
            this.transactionTypeValueList.push({
              value: transactions.messageIntentifier,
              name: messageType,
            });
            this.regenerateApiList(transactions);
            return transactions;
          })
          .filter(item => this.listApiName.indexOf(item.contractIntentifier) > -1);
        if (this.jsonTransactions.length) {
          this.reOrderApi();
          this.apiName = this.apiFields[0];
          this.transactionTypeValueList = this.apiFields[0]?.transactionTypeValueList;
          this.selectedTransactionType = this.transactionTypeValueList[0].value;
          this.getJsonAuthReqData(0, this.jsonTransactions);
          this.getJsonAuthResData(0, this.jsonTransactions);
          this.getPostActionData();
          this.getPreActionData();
          this.apiRequestResponse(this.apiName);
        } else {
          this.apiName = this.apiFields[0];
          this.apiRequestResponse(this.apiName);
        }
        if (this.imfId) {
          this._store.dispatch(new GetIMF(this.imfId));
          this._store.dispatch(new GetMessageContextList(this.imfId));
        }
      }
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    if (!changes.tabIndex.firstChange && changes.tabIndex.currentValue === 2) {
      if (this.ruleListItem.length === 0) {
        if (this.adapterData.transformData.apiFieldsData) {
          this.adapterData.transformData.persistRequired = 0;
          this.listApiName = [];
          this.apiFields = this.adapterData?.transformData?.apiFieldsData?.apiFields.map(item => {
            item.transactionTypeValueList = [];
            if (!item?.apiConditionalPackgerFields && item?.outGoingFields?.length) {
              item.multiple = false;
            } else if (item?.apiConditionalPackgerFields?.length) {
              item.multiple = true;
            }
            this.listApiName.push(item.apiName);
            return item;
          });
          this.authReqDivShow = 'req';
          this.jsonTransactions = JSON.parse(
            JSON.stringify(this.adapterData.transformData.requestMapping),
          );
          this.jsonTransactions = this.jsonTransactions?.transactions || [];
          this.jsonTransactions = this.jsonTransactions
            .map(transactions => {
              this.allTransactionText =
                this.allTransactionText + ',' + transactions.messageIntentifier;
              let messageType = JSON.parse(
                JSON.stringify(transactions.messageIntentifier.toLowerCase()),
              );
              const array = messageType.split(' ');
              if (array && array.length > 1) {
                messageType = array.join('');
              }
              this.transactionTypeValueList.push({
                value: transactions.messageIntentifier,
                name: messageType,
              });
              this.regenerateApiList(transactions);
              return transactions;
            })
            .filter(item => this.listApiName.indexOf(item.contractIntentifier) > -1);
          if (this.jsonTransactions.length) {
            this.reOrderApi();
            this.apiName = this.apiFields[0];
            this.transactionTypeValueList = this.apiFields[0]?.transactionTypeValueList;
            this.selectedTransactionType = this.transactionTypeValueList[0].value;
            this.getJsonAuthReqData(0, this.jsonTransactions);
            this.getJsonAuthResData(0, this.jsonTransactions);
            this.getPostActionData();
            this.getPreActionData();
            this.apiRequestResponse(this.apiName);
          } else {
            this.apiName = this.apiFields[0];
            this.apiRequestResponse(this.apiName);
          }
          if (this.imfId) {
            this._store.dispatch(new GetIMF(this.imfId));
            this._store.dispatch(new GetMessageContextList(this.imfId));
          }
        }
      }
    }
  }

  public reOrderApi() {
    this.apiFields = this.apiFields.map(item => {
      item.count = item.transactionTypeValueList.length;
      return item;
    });
    this.apiFields.sort((a, b) => b.count - a.count);
  }

  public regenerateApiList(data) {
    const output = this.apiFields.find(item => data.contractIntentifier === item.apiName);
    if (output) {
      output.transactionTypeValueList.push({
        value: data.messageIntentifier,
        name: data.messageIntentifier,
      });
    }
  }

  public showTransactionCondModal() {
    this.requestCon = true;
    this.ruleError = false;
    this.ruleSAF = false;
    this.reqRuleMapDisable = false;
    this.resRuleMapDisable = false;
    this.requestMapping = false;
    this.responseMapping = false;
    this.transactionRequestArray = [];
    this.transactionResponseArray = [];
    this.reqCondition = undefined;
    this.jsonTransactions.forEach(item1 => {
      if (item1.contractIntentifier === this.apiName.apiName) {
        if (item1.messageIntentifier !== this.selectedTransactionType) {
          this.transactionRequestArray.push(item1);
          this.transactionResponseArray.push(item1);
        }
      }
    });
    const result = this.jsonTransactions.find(
      item1 =>
        item1.messageIntentifier === this.selectedTransactionType &&
        item1.contractIntentifier === this.apiName.apiName,
    );
    if (result && result.condition) {
      this.reqCondition = JSON.parse(JSON.stringify(result.condition));
    }

    this.isTransactionCondVisible = true;
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

  public valueValidation(data) {
    if (this.aphaNumeric.test(data)) {
      this.valueValidError = false;
    } else {
      this.valueValidError = true;
    }
  }

  public cancelFn() {
    this.isTransactionCondVisible = false;
  }

  public pushItem() {
    this.conditionPush.push(this.conditionPush.length + 1);
    this.transactionCondition[this.selectedTransactionType].conditions.push({
      fieldName: null,
      type: 'equal',
      value: '',
    });
  }

  public pullItem() {
    this.conditionPush.pop();
    this.transactionCondition[this.selectedTransactionType].conditions.pop();
    this.checkError();
  }

  public checkError() {
    let data = JSON.stringify(this.transactionCondition[this.selectedTransactionType].conditions);
    data = data.replace(new RegExp('"value":""', 'g'), '"value": null');
    if (data.indexOf('null') === -1) {
      this.ruleError = false;
    }
  }
  open(): void {
    this.isDataEnrichmentScreenVisible = true;
  }

  public enrichChangeFn() {
    this.dataEnrichmentScreenError = false;
  }

  public showDataModal() {
    this.mappings = [];
    this.queryObjDropDown = [];
    this.dataEnrichmentScreenError = false;
    this.isDataEnrichmentScreenVisible = true;
    this.jsonTransactions.forEach(item1 => {
      if (
        item1.messageIntentifier === this.selectedTransactionType &&
        item1.contractIntentifier === this.apiName.apiName
      ) {
        item1.request.mappings.forEach(item => {
          if (item && item.type === 'field' && item.selectedConstant == '2') {
            let destination = '';
            if (
              item.destination &&
              item.destination[0] &&
              item.destination[0].indexOf('request_message[') !== -1
            ) {
              destination = item.destination[0].split('request_message[')[1].split(']')[0];
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
  }

  public closeDataModal() {
    this.dataEnrichmentScreenError = false;
    this.checkConfigError();
    if (!this.dataEnrichmentScreenError) {
      this.jsonTransactions.map(item => {
        if (
          item.messageIntentifier === this.selectedTransactionType &&
          item.contractIntentifier === this.apiName.apiName
        ) {
          item.request.mappings = item.request.mappings.filter(
            mapping =>
              mapping &&
              (mapping.type !== 'imdg_enrich' || mapping.selectedCondition) &&
              (mapping.type !== 'field' || mapping.selectedConstant !== '2'),
          );
        }
        return item;
      });
      if (this.enrichfields === 'configuration') {
        this.mappings = [];
        this.saveConfiguration();
      } else {
        this.clearEnrichModel();
        this.saveConstant();
      }
      this.isDataEnrichmentScreenVisible = false;
    } else {
      this.dataEnrichmentScreenError = true;
    }
  }

  public addEntityFn(): void {
    this.dataEnrichmentScreenError = false;
    if (this.enrichModelObject) {
      this.checkConfigError();
      if (!this.dataEnrichmentScreenError) {
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
        this.clearEnrichModel();
      }
    } else {
      this.clearEnrichModel();
    }
  }

  public selectConfigFn(value) {
    this.enrichModelObject = value.value;
  }

  public removeEntityFn(value): void {
    this.queryObjDropDown.splice(value.id, 1);
    if (JSON.stringify(value.value) === JSON.stringify(this.enrichModelObject)) {
      this.clearEnrichModel();
    }
  }

  public removeEntity() {
    this.enrichModelObject = undefined;
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

  public tabChangeValue() {
    const postActionflag = this.validatePostAction();
    const preActionflag = this.validatePreAction();
    if (postActionflag && preActionflag) {
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

  public changeDestination(data, event) {
    data.destination = event;
    if (event) {
      data.resImfValue = event.split('%')[0];
      data.useCase = event.split('%')[1];
    } else {
      data.resImfValue = null;
      data.useCase = null;
    }
  }

  public changeImfDestination(data, event) {
    if (event) {
      data.resImfValue = event.split('%')[0];
      data.useCase = event.split('%')[1];
    } else {
      data.resImfValue = null;
      data.useCase = null;
    }
  }

  public entityMapChange(item): void {
    // reset field if change entity
    item.fields = [];
    // get entity column list
    const data = this.entityList[item.lookupType.query.from.mapName];
    this.entityColumn = data.filter(x => x.indexOf('(where)') === -1);
    if (this.entityColumn.length !== 0) {
      item.fields.push({
        destination: null,
        ipc: 'SYSTEM_ERROR',
        source: null,
        type: 'field',
      });
    }
    const wheredata = data.filter(x => x.indexOf('(where)') !== -1);
    wheredata.forEach(item1 => {
      this.entitywhereName = item1.split('(where)')[0];
    });
  }

  public selectWhereField(element, event) {
    element.value = event;
    element.fieldName = this.entitywhereName;
  }

  public pullrepeatImfList(item) {
    item.fields.pop();
  }

  public pushrepeatImfList(item) {
    item.fields.push({
      destination: null,
      ipc: 'SYSTEM_ERROR',
      source: null,
      type: 'field',
    });
    item.lookupType.query.select.columns.push({
      alias: { type: 'alias', name: null, alias: null },
      type: 'aliasColumn',
    });
  }

  public pushConstItem() {
    this.mappings.push({
      type: 'field',
      source: null,
      destination: null,
      ipc: '',
      condition: null,
    });
  }

  public pullConstItem() {
    this.mappings.pop();
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
        } else if (
          !element.IPCvalue &&
          element.executeModel.actionName === 'ENRICH_ORIGINAL_TRANSACTION'
        ) {
          element.showError = false;
        } else if (
          !element.IPCvalue &&
          element.executeModel.actionName !== 'ENRICH_ORIGINAL_TRANSACTION'
        ) {
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

  public draftTransform() {
    this.isSaveDraft = true;
    const postActionflag = this.validatePostAction();
    const PreActionflag = this.validatePreAction();
    if (postActionflag && PreActionflag) {
      this.stringifyObj();
      this._store.dispatch(new DraftTransform(this.adapterData));
    } else {
      this.isSaveDraft = false;
    }
  }

  deleteArrayMApping(data) {
    const listOfId = data.id.split('.#.');
    listOfId.forEach((element, index) => {
      var fieldClone = '';
      const len = listOfId.length - index;
      fieldClone = listOfId.slice(0, len).join('.#.');
      fieldClone = '${' + fieldClone + '}';
      this.removeFieldElement(this.loopArray, fieldClone);
    });
    return this.loopArray[0];
  }

  public delAuthReqField(data) {
    const source = '${' + data.id + '}';
    if (data.parentField) {
      this.findGetSetArrayMapper(data);
    }
    this.jsonTransactions.map(item1 => {
      if (
        item1.messageIntentifier === this.selectedTransactionType &&
        item1.contractIntentifier === this.apiName.apiName
      ) {
        item1.request.mappings = item1.request.mappings.filter(x => {
          if (x.fieldId) {
            return x.fieldId !== data.id;
          } else {
            return x.source !== source;
          }
        });
      }
      return item1;
    });
    this.transformActionItem[data.id + this.selectedTransactionType] = null;
    this.requestImfField[data.id + this.selectedTransactionType] = null;
  }

  public delAuthResField(data, flag = false) {
    const source = '${' + data.id + '}';
    let destination = null;
    if (data.id.indexOf('http_headers[') > -1) {
      destination = '${' + data.id + '}';
    } else {
      destination = '${message_exchange[GATEWAY_SERVICE].native_response_message[' + data.id + ']}';
    }
    this.jsonTransactions.map(item1 => {
      if (
        item1.messageIntentifier === this.selectedTransactionType &&
        item1.contractIntentifier === this.apiName.apiName
      ) {
        item1.response.mappings.forEach((x, i) => {
          if (x) {
            if (x.destination && x.destination[0] === destination) {
              delete item1.response.mappings[i];
            } else if (x.source === source) {
              delete item1.response.mappings[i];
            } else if (x.type === 'imdg_enrich' && x.fieldId === data.id) {
              delete item1.response.mappings[i];
            } else if (x.selectedFormat == 4) {
              const source = x.source.split('{')[1].split('}')[0];
              if (source === data.id) {
                delete item1.response.mappings[i];
              }
            }
          }
        });
        item1.response.mappings = item1.response.mappings.filter(x => x !== null);
      }
      return item1;
    });
    this.responseImfField[data.id + this.selectedTransactionType] = null;
    this.transformActionItemRes[data.id + this.selectedTransactionType] = null;
    if (flag) {
      this.authResEcho[data.id + this.selectedTransactionType + '-' + this.responseKey] = false;
      this.removeEchoFromReq(data.id);
    }
  }

  public delMultiAuthResField(id, flag = false) {
    const source = '${' + id + '}';
    let destination = null;
    if (id.indexOf('http_headers[') > -1) {
      destination = '${' + id + '}';
    } else {
      destination = '${message_exchange[GATEWAY_SERVICE].native_response_message[' + id + ']}';
    }
    this.jsonTransactions.map(item1 => {
      if (
        item1.messageIntentifier === this.selectedTransactionType &&
        item1.contractIntentifier === this.apiName.apiName
      ) {
        if (this.currentActiveTab.multiple) {
          const output = item1.conditionalResponses.find(
            el => el.packagerName === this.responseKey,
          );
          if (output) {
            output.mappings.forEach((x, i) => {
              if (x) {
                if (x.destination && x.destination[0] === destination) {
                  delete output.mappings[i];
                } else if (x.source === source) {
                  delete output.mappings[i];
                } else if (x.type === 'imdg_enrich' && x.fieldId === id) {
                  delete output.mappings[i];
                } else if (x.selectedFormat == 4) {
                  const source = x.source.split('{')[1].split('}')[0];
                  if (source === id) {
                    delete output.mappings[i];
                  }
                }
              }
            });
            output.mappings = output.mappings.filter(x => x !== null);
          }
        }
      }
      return item1;
    });
    this.responseImfField[id + this.selectedTransactionType] = null;
    this.transformActionItemRes[id + this.selectedTransactionType] = null;
    if (flag) {
      this.authResEcho[id + this.selectedTransactionType] = false;
      this.removeEchoFromReq(id);
    }
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
        this.delAuthReqField(data);
      } else if (this.currentActiveTab.multiple) {
        this.delMultiAuthResField(data.id, true);
      } else {
        this.delAuthResField(data, true);
      }
    }
  }

  public pushWhereConditions() {
    const obj = {
      fieldName: null,
      type: 'equal',
      value: null,
    };
    this.enrichModelObject.lookupType.query.condition.conditions.push(obj);
  }

  public pullWhereConditions() {
    this.enrichModelObject.lookupType.query.condition.conditions.pop();
  }

  public selectEcho(flag, data) {
    if (this.currentActiveTab.multiple) {
      this.delMultiAuthResField(data.id);
      const additionalField =
        '${message_exchange[GATEWAY_SERVICE].additional_fields[' + data.id + ']}';
      const sourceId = '${' + data.id + '}';
      if (flag) {
        this.selectSourceResData[data.id + this.selectedTransactionType + '-' + this.responseKey] =
          true;
        this.jsonTransactions.forEach(item => {
          if (
            item.messageIntentifier === this.selectedTransactionType &&
            item.contractIntentifier === this.apiName.apiName
          ) {
            let destination;
            if (data.id.indexOf('http_headers[') > -1) {
              destination = '${' + data.id + '}';
            } else {
              destination =
                '${message_exchange[GATEWAY_SERVICE].native_response_message[' + data.id + ']}';
            }
            const output = item.conditionalResponses.find(
              el => el.packagerName === this.responseKey,
            );
            if (output) {
              item.mappings.push({
                destination: [destination],
                echo: true,
                ipc: 'SYSTEM_ERROR',
                source: additionalField,
                type: 'field',
              });
            }
          }
        });
        this.jsonTransactions.forEach(item => {
          if (
            item.messageIntentifier === this.selectedTransactionType &&
            item.contractIntentifier === this.apiName.apiName
          ) {
            item.request.mappings.push({
              destination: [additionalField],
              echo: true,
              ipc: 'SYSTEM_ERROR',
              source: sourceId,
              type: 'field',
            });
          }
        });
      } else {
        this.selectSourceResData[data.id + this.selectedTransactionType + '-' + this.responseKey] =
          false;
      }
      this.removeEchoFromReq(data.id);
    } else {
      this.delAuthResField(data);
      const additionalField =
        '${message_exchange[GATEWAY_SERVICE].additional_fields[' + data.id + ']}';
      const sourceId = '${' + data.id + '}';
      if (flag) {
        this.selectSourceResData[data.id + this.selectedTransactionType + '-' + this.responseKey] =
          true;
        this.jsonTransactions.forEach(item => {
          if (
            item.messageIntentifier === this.selectedTransactionType &&
            item.contractIntentifier === this.apiName.apiName
          ) {
            let destination;
            if (data.id.indexOf('http_headers[') > -1) {
              destination = '${' + data.id + '}';
            } else {
              destination =
                '${message_exchange[GATEWAY_SERVICE].native_response_message[' + data.id + ']}';
            }
            item.response.mappings.push({
              destination: [destination],
              echo: true,
              ipc: 'SYSTEM_ERROR',
              source: additionalField,
              type: 'field',
            });
          }
        });
        this.jsonTransactions.forEach(item => {
          if (
            item.messageIntentifier === this.selectedTransactionType &&
            item.contractIntentifier === this.apiName.apiName
          ) {
            item.request.mappings.push({
              destination: [additionalField],
              echo: true,
              ipc: 'SYSTEM_ERROR',
              source: sourceId,
              type: 'field',
            });
          }
        });
      } else {
        this.selectSourceResData[data.id + this.selectedTransactionType + '-' + this.responseKey] =
          false;
      }
      this.removeEchoFromReq(data.id);
    }
  }

  public transactionReqPopFun(data) {
    this.FldID = data;
    this.isArray = false;
    this.isRequest = true;
    this.AuthorizationTitle = 'request';
    this.isVisible = true;
  }

  public transactionReqArrayPopFun(data) {
    this.FldID = data;
    this.isRequest = true;
    this.AuthorizationTitle = 'request';
    this.isVisible = true;
    this.isArray = true;
  }

  public transactionResArrayPopFun(data) {
    this.FldID = data;
    this.isRequest = false;
    this.AuthorizationTitle = 'response';
    this.isVisible = true;
    this.isArray = false;
  }

  public reqValue(value: any) {
    if (!this.reqIMFObj[this.selectedTransactionType]) {
      this.reqIMFObj[this.selectedTransactionType] = [];
    }
    if (value && value.source) {
      this.reqIMFObj[this.selectedTransactionType].push(value);
      const source = value.source.split('{')[1].split('}')[0];
      this.selectSourceData[source + this.selectedTransactionType] = true;
      if (
        value.type !== 'groovy_executor' &&
        value.type !== 'in_built_mapper' &&
        value.destination &&
        value.destination[0]
      ) {
        this.requestImfField[source + this.selectedTransactionType] = this.getImfName(
          value.destination[0],
        );
      } else if (value.type === 'in_built_mapper') {
        this.requestImfField[source + this.selectedTransactionType] = value.mapper;
      } else if (value.type === 'groovy_executor' && value.selectedOption === 'script') {
        this.requestImfField[source + this.selectedTransactionType] = 'ScriptMapper';
      }
      this.transformActionItem[source + this.selectedTransactionType] = [];
      this.transformActionItem[source + this.selectedTransactionType].push(value);
      //todo request json
      this.pullJsonReqData(value);
      const output = this.jsonTransactions.find(
        element =>
          element.messageIntentifier === this.selectedTransactionType &&
          element.contractIntentifier == this.apiName.apiName,
      );
      if (output) {
        if (this.currentIndex) {
          output.request.mappings.splice(this.currentIndex, 0, value);
        } else {
          output.request.mappings.push(value);
        }
      }
    } else if (value && value.length > 0) {
      let source;
      if (value[0].source) {
        source = value[0].source.split('{')[1].split('}')[0];
      }
      if (value[0].fieldId) {
        source = value[0].fieldId;
      }
      this.selectSourceData[source + this.selectedTransactionType] = true;
      this.transformActionItem[source + this.selectedTransactionType] = [];
      this.requestImfField[source + this.selectedTransactionType] = '';
      this.pullJsonReqData(value[0]);
      value.forEach(data => {
        if (data.selectedCondition == 'Optional') {
          data.validationFunctions = [];
        }
        this.reqIMFObj[this.selectedTransactionType].push(data);
        if (data.name) {
          this.requestImfField[source + this.selectedTransactionType] = data.name;
          if (data.source) {
            const source1 = data.source.split('{')[1].split('}')[0];
            if (source !== source1) {
              this.transformActionItem[source1 + this.selectedTransactionType] = [];
              this.requestImfField[source1 + this.selectedTransactionType] = data.name;
              this.selectSourceData[source1 + this.selectedTransactionType] = true;
              this.transformActionItem[source1 + this.selectedTransactionType].push(data);
            }
          }
        } else {
          if (data.destination) {
            if (this.requestImfField[source + this.selectedTransactionType] === '') {
              this.requestImfField[source + this.selectedTransactionType] = this.getImfName(
                data.destination[0],
              );
            } else {
              this.requestImfField[source + this.selectedTransactionType] =
                this.requestImfField[source + this.selectedTransactionType] +
                ',' +
                this.getImfName(data.destination[0]);
            }
          }
        }
        this.transformActionItem[source + this.selectedTransactionType].push(data);
        const output = this.jsonTransactions.find(
          element =>
            element.messageIntentifier === this.selectedTransactionType &&
            element.contractIntentifier == this.apiName.apiName,
        );
        if (output) {
          if (this.currentIndex) {
            output.request.mappings.splice(this.currentIndex, 0, data);
          } else {
            output.request.mappings.push(data);
          }
        }
      });
    }
  }

  private setIntialSchemaArrayMapper(fieldId, value) {
    const loop = fieldId.id.split('.#.');
    const length = loop.length;
    loop.forEach((element, index) => {
      const initLoop = {
        type: 'loop',
        mappings: {
          type: 'fields',
          mappings: [],
        },
        field: null,
      };
      this.defaultLoopObjectClone(this.loopArray, initLoop, element, index, loop, length, value);
    });
    return this.loopArray[0];
  }

  defaultLoopObjectClone(loopArray, initLoop, fieldId, index, loopField, length, value) {
    var fieldClone = '';
    var previousField = '';
    if (index > 0) {
      loopField = loopField.slice(0, index + 1);
      fieldClone = loopField.join('.#.');
      fieldClone = '${' + fieldClone + '}';
    } else {
      fieldClone = '${' + fieldId + '}';
    }

    loopField = loopField.slice(0, index);
    previousField = loopField.join('.#.');
    previousField = '${' + previousField + '}';

    initLoop.field = fieldClone;
    let previousId = null;
    if (!this.isRequest) {
      this.resfindSetLoopArray(
        loopArray,
        fieldClone,
        initLoop,
        index,
        length,
        value,
        previousField,
        previousId,
      );
    } else {
      this.findSetLoopArray(
        loopArray,
        fieldClone,
        initLoop,
        index,
        length,
        value,
        previousField,
        previousId,
      );
    }
  }

  removeFieldElement(loopArray, source) {
    const elementIndex = loopArray.findIndex(el => el.source === source);
    const loopElement = loopArray.find(it => it.field == source);
    if (elementIndex != -1) {
      return loopArray.splice(elementIndex, 1);
    }
    if (loopElement) {
      if (loopElement.mappings.mappings.length === 0) {
        return loopArray.splice(
          loopArray.findIndex(el => el.field === source),
          1,
        );
      }
    } else {
      for (let el of loopArray) {
        if (el.type === 'loop') {
          this.removeFieldElement(el.mappings.mappings, source);
        }
      }
    }
  }

  findSetLoopArray(
    loopArray,
    fieldClone,
    initLoop,
    index,
    length,
    value,
    previousField,
    previousId,
  ) {
    const findoutput = loopArray.find(it => it.field == fieldClone);
    if (!findoutput) {
      if (loopArray.length > 0) {
        for (let el of loopArray) {
          if (el.type === 'loop') {
            previousId = el.field;
            this.findSetLoopArray(
              el.mappings.mappings,
              fieldClone,
              initLoop,
              index,
              length,
              value,
              previousField,
              previousId,
            );
          }
          if (el.type === 'field' && previousId === previousField) {
            const findloop = loopArray.find(it => it.field == fieldClone);
            if ((index === length - 2 || !findloop) && initLoop.field !== value.source) {
              loopArray.push(initLoop);
              break;
            }
          }
        }
      } else {
        const findInitLoop = loopArray.find(it => it.field == initLoop.field);
        if (
          !findoutput &&
          length !== index + 1 &&
          initLoop.field !== value.source &&
          !findInitLoop
        ) {
          return loopArray.push(initLoop);
        } else if (!findoutput && length === index + 1) {
          return this.updateLoopArray(loopArray, value);
        } else {
          return true;
        }
      }
    } else {
      if (index === length - 2) {
        return this.updateLoopArray(findoutput.mappings.mappings, value);
      }
    }
  }

  resfindSetLoopArray(
    loopArray,
    fieldClone,
    initLoop,
    index,
    length,
    value,
    previousField,
    previousId,
  ) {
    const findoutput = loopArray.find(it => it.field == fieldClone);
    if (!findoutput) {
      if (loopArray.length > 0) {
        for (let el of loopArray) {
          if (el.type === 'loop') {
            previousId = el.field;
            this.resfindSetLoopArray(
              el.mappings.mappings,
              fieldClone,
              initLoop,
              index,
              length,
              value,
              previousField,
              previousId,
            );
          }
          if (el.type === 'field' && previousId === previousField) {
            const findloop = loopArray.find(it => it.field == fieldClone);
            if ((index === length - 2 || !findloop) && initLoop.field !== value.fieldId) {
              loopArray.push(initLoop);
              break;
            }
          }
        }
      } else {
        const findInitLoop = loopArray.find(it => it.field == initLoop.field);
        if (
          !findoutput &&
          length !== index + 1 &&
          initLoop.field !== value.fieldId &&
          !findInitLoop
        ) {
          return loopArray.push(initLoop);
        } else if (!findoutput && length === index + 1) {
          return this.updateResLoopArray(loopArray, value);
        } else {
          return true;
        }
      }
    } else {
      if (index === length - 2) {
        return this.updateResLoopArray(findoutput.mappings.mappings, value);
      }
    }
  }

  updateResLoopArray(loopArray, value) {
    const elementIndex = loopArray.findIndex(el => el.fieldId === value.fieldId);
    if (elementIndex != -1) {
      loopArray.splice(elementIndex, 1);
      return loopArray.push(value);
    } else {
      return loopArray.push(value);
    }
  }

  updateLoopArray(loopArray, value) {
    const elementIndex = loopArray.findIndex(el => el.source === value.source);
    if (elementIndex != -1) {
      loopArray.splice(elementIndex, 1);
      return loopArray.push(value);
    } else {
      return loopArray.push(value);
    }
  }

  findGetSetArrayMapper(fieldId, value?) {
    const output = this.jsonTransactions.find(
      element =>
        element.messageIntentifier === this.selectedTransactionType &&
        element.contractIntentifier == this.apiName.apiName,
    );
    if (output) {
      if (this.isRequest) {
        this.loopArray = [];
        const requestMapping = output.request.mappings.find(
          el => el.field === '${' + fieldId.parentField.split('|')[0] + '}',
        );
        requestMapping
          ? this.loopArray.push(JSON.parse(JSON.stringify(requestMapping)))
          : (this.loopArray = []);
        let mapping = null;
        value
          ? (mapping = this.setIntialSchemaArrayMapper(fieldId, value))
          : (mapping = this.deleteArrayMApping(fieldId));
        output.request.mappings = output.request.mappings.filter(
          el => el.field !== '${' + fieldId.parentField.split('|')[0] + '}',
        );
        if (mapping) {
          output.request.mappings.push(JSON.parse(JSON.stringify(mapping)));
        }
      }
    }
  }

  public resArrayValue(event: any) {
    if (!this.resIMFObj[this.selectedTransactionType + '-' + this.responseKey]) {
      this.resIMFObj[this.selectedTransactionType + '-' + this.responseKey] = [];
    }
    if (event.selectedOption === 'operationField' || event.selectedOption === 'copyField') {
      const value = event.value;
      this.resIMFObj[this.selectedTransactionType + '-' + this.responseKey].push(value);
      if (value.source && value.destination) {
        let source = null;
        if (value.destination[0].indexOf('http_headers[') > -1) {
          source = value.destination[0].split('${')[1].split('}')[0];
        } else {
          source = value.destination[0].split('native_response_message[')[1].split(']')[0];
        }
        this.selectSourceResData[source + this.selectedTransactionType + '-' + this.responseKey] =
          true;
        if (value.source.indexOf('_message[') === -1) {
          if (value.source.indexOf(']') === -1) {
            let imfName = value.source.split('{');
            if (imfName) {
              imfName = imfName[1].split('}');
              if (imfName) {
                this.responseImfField[
                  source + this.selectedTransactionType + '-' + this.responseKey
                ] = imfName[0];
              }
            }
          } else {
            let imfName = value.source.split('].');
            if (imfName) {
              imfName = imfName[1].split('}');
              if (imfName) {
                this.responseImfField[
                  source + this.selectedTransactionType + '-' + this.responseKey
                ] = imfName[0];
              }
            }
          }
        } else {
          let imfName = value.source.split('message[');
          if (imfName) {
            imfName = imfName[1].split(']');
            if (imfName) {
              this.responseImfField[
                source + this.selectedTransactionType + '-' + this.responseKey
              ] = imfName[0];
            }
          }
        }
        this.transformActionItemRes[
          source + this.selectedTransactionType + '-' + this.responseKey
        ] = value;
        this.findGetSetArrayMapper(this.FldID, event.value);
      }
    }
  }

  public reqArrayValue(value: any) {
    if (!this.reqIMFObj[this.selectedTransactionType]) {
      this.reqIMFObj[this.selectedTransactionType] = [];
    }
    if (value && value.source) {
      this.reqIMFObj[this.selectedTransactionType].push(value);
      const source = value.source.split('{')[1].split('}')[0];
      this.selectSourceData[source + this.selectedTransactionType] = true;
      if (
        value.type !== 'groovy_executor' &&
        value.type !== 'in_built_mapper' &&
        value.destination &&
        value.destination[0]
      ) {
        this.requestImfField[source + this.selectedTransactionType] = this.getImfName(
          value.destination[0],
        );
      }

      this.transformActionItem[source + this.selectedTransactionType] = [];
      this.transformActionItem[source + this.selectedTransactionType].push(value);
      //todo request json
      this.findGetSetArrayMapper(this.FldID, value);
    } else if (value && value.length > 0) {
      let source;
      if (value[0].source) {
        source = value[0].source.split('{')[1].split('}')[0];
      }
      if (value[0].fieldId) {
        source = value[0].fieldId;
      }
      this.selectSourceData[source + this.selectedTransactionType] = true;
      this.transformActionItem[source + this.selectedTransactionType] = [];
      this.requestImfField[source + this.selectedTransactionType] = '';
      value.forEach(data => {
        this.reqIMFObj[this.selectedTransactionType].push(data);
        if (data.name) {
          this.requestImfField[source + this.selectedTransactionType] = data.name;
          if (data.source) {
            const source1 = data.source.split('{')[1].split('}')[0];
            if (source !== source1) {
              this.transformActionItem[source1 + this.selectedTransactionType] = [];
              this.requestImfField[source1 + this.selectedTransactionType] = data.name;
              this.selectSourceData[source1 + this.selectedTransactionType] = true;
              this.transformActionItem[source1 + this.selectedTransactionType].push(data);
            }
          }
        } else {
          if (data.destination) {
            if (this.requestImfField[source + this.selectedTransactionType] === '') {
              this.requestImfField[source + this.selectedTransactionType] = this.getImfName(
                data.destination[0],
              );
            } else {
              this.requestImfField[source + this.selectedTransactionType] =
                this.requestImfField[source + this.selectedTransactionType] +
                ',' +
                this.getImfName(data.destination[0]);
            }
          }
        }
        this.transformActionItem[source + this.selectedTransactionType].push(data);
        const output = this.jsonTransactions.find(
          element =>
            element.messageIntentifier === this.selectedTransactionType &&
            element.contractIntentifier == this.apiName.apiName,
        );
        if (output) {
          this.findGetSetArrayMapper(this.FldID, data);
        }
      });
    }
  }

  public transactionResPopFun(data) {
    this.isArray = false;
    if (!this.authResEcho[data.id + this.selectedTransactionType + '-' + this.responseKey]) {
      this.FldID = data;
      this.isRequest = false;
      this.AuthorizationTitle = 'response';
      this.isVisible = true;
    }
  }

  public resValue(event: any) {
    if (this.currentActiveTab.multiple) {
      this.resMultipleValue(event);
    } else if (event) {
      if (!this.resIMFObj[this.selectedTransactionType + '-' + this.responseKey]) {
        this.resIMFObj[this.selectedTransactionType + '-' + this.responseKey] = [];
      }
      if (event.selectedOption === 'operationField' || event.selectedOption === 'copyField') {
        const value = event.value;
        this.resIMFObj[this.selectedTransactionType + '-' + this.responseKey].push(value);
        if (value.source && value.destination) {
          let source = null;
          if (value.destination[0].indexOf('http_headers[') > -1) {
            source = value.destination[0].split('${')[1].split('}')[0];
          } else {
            source = value.destination[0].split('native_response_message[')[1].split(']')[0];
          }
          this.selectSourceResData[source + this.selectedTransactionType + '-' + this.responseKey] =
            true;
          if (value.source.indexOf('_message[') === -1) {
            if (value.source.indexOf(']') === -1) {
              let imfName = value.source.split('{');
              if (imfName) {
                imfName = imfName[1].split('}');
                if (imfName) {
                  this.responseImfField[
                    source + this.selectedTransactionType + '-' + this.responseKey
                  ] = imfName[0];
                }
              }
            } else {
              let imfName = value.source.split('].');
              if (imfName) {
                imfName = imfName[1].split('}');
                if (imfName) {
                  this.responseImfField[
                    source + this.selectedTransactionType + '-' + this.responseKey
                  ] = imfName[0];
                }
              }
            }
          } else {
            let imfName = value.source.split('message[');
            if (imfName) {
              imfName = imfName[1].split(']');
              if (imfName) {
                this.responseImfField[
                  source + this.selectedTransactionType + '-' + this.responseKey
                ] = imfName[0];
              }
            }
          }
          this.transformActionItemRes[
            source + this.selectedTransactionType + '-' + this.responseKey
          ] = value;
          this.pullJsonResData(source, [value]);
        }
      } else if (event.selectedOption === 'join') {
        const value = event.value;
        if (value.destination && value.destination[0]) {
          const source = value.fieldId;
          this.selectSourceResData[source + this.selectedTransactionType + '-' + this.responseKey] =
            true;
          this.transformActionItemRes[
            source + this.selectedTransactionType + '-' + this.responseKey
          ] = value;
          const sourceList = [];
          value.source.forEach((el, i) => {
            let source;
            if (el.sourceType == 'text') {
              source = el.source;
            } else {
              source = this.getResImfValue(el.source);
            }
            sourceList.push(source);
          });
          this.responseImfField[source + this.selectedTransactionType + '-' + this.responseKey] =
            sourceList.join(' ,');
          this.pullJsonResData(source, [event.value]);
        }
      } else if (event.selectedOption === 'mapper') {
        if (event.value.type === 'in_built_mapper') {
          const value = event.value;
          const source = value.source.split('{')[1].split('}')[0];
          this.selectSourceResData[source + this.selectedTransactionType + '-' + this.responseKey] =
            true;
          this.responseImfField[source + this.selectedTransactionType + '-' + this.responseKey] =
            event.value.mapper;
          this.transformActionItemRes[
            source + this.selectedTransactionType + '-' + this.responseKey
          ] = {
            selectedOption: 'mapper',
            value: event.value,
          };
          this.pullJsonResData(source, [event.value]);
        } else {
          this.pullJsonResData(event.value[0].fieldId, event.value, 'mapper');
          event.value.forEach(item => {
            if (item.type === 'field') {
              const source = item.source.split('{')[1].split('}')[0];
              this.selectSourceResData[
                source + this.selectedTransactionType + '-' + this.responseKey
              ] = true;
              this.responseImfField[
                item.fieldId + this.selectedTransactionType + '-' + this.responseKey
              ] = event.value[0].name;
              this.transformActionItemRes[
                source + this.selectedTransactionType + '-' + this.responseKey
              ] = {
                value: event.value,
                selectedOption: 'mapper',
              };
            }
          });
        }
      } else if (event.selectedOption === 'script') {
        const source = event.source.split('{')[1].split('}')[0];
        this.selectSourceResData[source + this.selectedTransactionType + '-' + this.responseKey] =
          true;
        this.transformActionItemRes[
          source + this.selectedTransactionType + '-' + this.responseKey
        ] = event;
        this.responseImfField[source + this.selectedTransactionType + '-' + this.responseKey] =
          'Script Mapper';
        this.pullJsonResData(source, [event]);
      } else {
        if (event.value.source) {
          const source = event.value.source.split('{')[1].split('}')[0];
          this.selectSourceResData[source + this.selectedTransactionType + '-' + this.responseKey] =
            true;
          this.transformActionItemRes[
            source + this.selectedTransactionType + '-' + this.responseKey
          ] = event.value;
          this.pullJsonResData(source, [event.value]);
        }
      }
    }
  }

  public resMultipleValue(event: any) {
    if (event) {
      if (!this.resIMFObj[this.selectedTransactionType]) {
        this.resIMFObj[this.selectedTransactionType] = [];
      }
      if (event.selectedOption === 'operationField' || event.selectedOption === 'copyField') {
        const value = event.value;
        this.resIMFObj[this.selectedTransactionType].push(value);
        if (value.source && value.destination) {
          let source = null;
          if (value.destination[0].indexOf('http_headers[') > -1) {
            source = value.destination[0].split('${')[1].split('}')[0];
          } else {
            source = value.destination[0].split('native_response_message[')[1].split(']')[0];
          }
          this.selectSourceResData[source + this.selectedTransactionType + '-' + this.responseKey] =
            true;
          if (value.source.indexOf('_message[') === -1) {
            if (value.source.indexOf(']') === -1) {
              let imfName = value.source.split('{');
              if (imfName) {
                imfName = imfName[1].split('}');
                if (imfName) {
                  this.responseImfField[
                    source + this.selectedTransactionType + '-' + this.responseKey
                  ] = imfName[0];
                }
              }
            } else {
              let imfName = value.source.split('].');
              if (imfName) {
                imfName = imfName[1].split('}');
                if (imfName) {
                  this.responseImfField[
                    source + this.selectedTransactionType + '-' + this.responseKey
                  ] = imfName[0];
                }
              }
            }
          } else {
            let imfName = value.source.split('message[');
            if (imfName) {
              imfName = imfName[1].split(']');
              if (imfName) {
                this.responseImfField[
                  source + this.selectedTransactionType + '-' + this.responseKey
                ] = imfName[0];
              }
            }
          }
          this.transformActionItemRes[
            source + this.selectedTransactionType + '-' + this.responseKey
          ] = value;
          this.pullMultipleJsonResData(source, [value], '');
        }
      } else if (event.selectedOption === 'join') {
        const value = event.value;
        if (value.destination && value.destination[0]) {
          const source = value.fieldId;
          this.selectSourceResData[source + this.selectedTransactionType + '-' + this.responseKey] =
            true;
          this.transformActionItemRes[
            source + this.selectedTransactionType + '-' + this.responseKey
          ] = value;
          const sourceList = [];
          value.source.forEach((el, i) => {
            let source;
            if (el.sourceType == 'text') {
              source = el.source;
            } else {
              source = this.getResImfValue(el.source);
            }
            sourceList.push(source);
          });
          this.responseImfField[source + this.selectedTransactionType + '-' + this.responseKey] =
            sourceList.join(' ,');
          this.pullJsonResData(source, [event.value]);
        }
      } else if (event.selectedOption === 'mapper') {
        if (event.value.type === 'in_built_mapper') {
          const value = event.value;
          const source = value.source.split('{')[1].split('}')[0];
          this.selectSourceResData[source + this.selectedTransactionType + '-' + this.responseKey] =
            true;
          this.responseImfField[source + this.selectedTransactionType + '-' + this.responseKey] =
            event.value.mapper;
          this.transformActionItemRes[
            source + this.selectedTransactionType + '-' + this.responseKey
          ] = {
            selectedOption: 'mapper',
            value: event.value,
          };
          this.pullJsonResData(source, [event.value]);
        } else {
          this.pullJsonResData(event.value[0].fieldId, event.value, 'mapper');
          event.value.forEach(item => {
            if (item.type === 'field') {
              const source = item.source.split('{')[1].split('}')[0];
              this.selectSourceResData[
                source + this.selectedTransactionType + '-' + this.responseKey
              ] = true;
              this.responseImfField[
                item.fieldId + this.selectedTransactionType + '-' + this.responseKey
              ] = event.value[0].name;
              this.transformActionItemRes[
                source + this.selectedTransactionType + '-' + this.responseKey
              ] = {
                value: event.value,
                selectedOption: 'mapper',
              };
            }
          });
        }
      } else if (event.selectedOption === 'script') {
        const source = event.source.split('{')[1].split('}')[0];
        this.selectSourceResData[source + this.selectedTransactionType + '-' + this.responseKey] =
          true;
        this.transformActionItemRes[
          source + this.selectedTransactionType + '-' + this.responseKey
        ] = event;
        this.responseImfField[source + this.selectedTransactionType + '-' + this.responseKey] =
          'Script Mapper';
        this.pullJsonResData(source, [event]);
      } else {
        if (event.value.source) {
          const source = event.value.source.split('{')[1].split('}')[0];
          this.selectSourceResData[source + this.selectedTransactionType + '-' + this.responseKey] =
            true;
          this.transformActionItemRes[
            source + this.selectedTransactionType + '-' + this.responseKey
          ] = event.value;
          this.pullMultipleJsonResData(source, [event.value]);
        }
      }
    }
  }

  public imfLegValue(value) {
    if (!this.resIMFLeg[this.selectedTransactionType]) {
      this.resIMFLeg[this.selectedTransactionType] = [];
    }
    this.resIMFLeg[this.selectedTransactionType].push(value);
  }

  public handleSave(value) {
    this.isVisible = value;
  }

  public changeReqMapFn() {
    if (
      this.requestMapping === false &&
      this.requestMappingTransaction &&
      this.requestMappingTransaction.messageIntentifier
    ) {
      const output = this.jsonTransactions.find(
        element =>
          element.messageIntentifier === this.selectedTransactionType &&
          element.contractIntentifier === this.apiName.apiName,
      );
      if (output) {
        output.request.mappings = [];
      }
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
      this.responseMappingTransaction.messageIntentifier
    ) {
      this.jsonTransactions.forEach(transactions => {
        if (
          transactions.messageIntentifier === this.selectedTransactionType &&
          transactions.contractIntentifier === this.apiName.apiName
        ) {
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
    this.jsonTransactions.forEach((transactions, transactionsId) => {
      if (
        transactions.messageIntentifier === this.selectedTransactionType &&
        transactions.contractIntentifier === this.apiName.apiName
      ) {
        transactions.request.mappings = this.requestMappingTransaction.request.mappings;
        this.getCopyAuthReqData(transactionsId, this.jsonTransactions);
      }
    });
  }

  public copyResMapFn() {
    this.jsonTransactions.forEach((transactions, transactionsId) => {
      if (
        transactions.messageIntentifier === this.selectedTransactionType &&
        transactions.contractIntentifier === this.apiName.apiName
      ) {
        transactions.response.mappings = this.responseMappingTransaction.response.mappings;
        this.getCopyAuthResData(transactionsId, this.jsonTransactions);
      }
    });
  }

  // add message type logic
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
          const output = this.apiFields.find(item => item.apiName === this.apiName.apiName);
          if (output) {
            output.transactionTypeValueList.push({
              value: this.selectedTransactionType,
              name: this.selectedTransactionType,
            });
            this.transactionTypeValueList = output.transactionTypeValueList;
          }
          this.jsonSchemaRequestResponse();
        } else {
          this.selectedTransactionType = data.value;
          this.transactionSelection({ nzValue: this.selectedTransactionType });
        }
      }
    }
  }

  public transactionSelection(value) {
    // if json adaptor
    if (value && value.nzValue) {
      this.selectedTransactionType = value.nzValue;
      this.authReqDivShow = 'req';
      this.selectedTabIndex = 0;
      this.getPostActionData();
      this.getPreActionData();
      const conditionIsExist = this.jsonTransactions.findIndex(
        item => item && item.messageIntentifier === this.selectedTransactionType && item.condition,
      );
      const reqTransaction = this.jsonTransactions.findIndex(
        item =>
          item &&
          item.messageIntentifier === this.selectedTransactionType &&
          item.condition &&
          item.request.mappings &&
          item.contractIntentifier == this.apiName.apiName &&
          !this.apiName.multiple,
      );

      const resTransaction = this.jsonTransactions.findIndex(
        item =>
          item &&
          item.messageIntentifier === this.selectedTransactionType &&
          item.condition &&
          item.response.mappings &&
          item.contractIntentifier == this.apiName.apiName &&
          !this.apiName.multiple,
      );

      const resMTransaction = this.jsonTransactions.findIndex(
        item =>
          item &&
          item.messageIntentifier === this.selectedTransactionType &&
          item.condition &&
          item.conditionalResponses &&
          item.conditionalResponses.mappings &&
          item.contractIntentifier == this.apiName.apiName &&
          this.apiName.multiple,
      );
      if (reqTransaction > -1) {
        this.getJsonAuthReqData(reqTransaction, this.jsonTransactions);
      } else if (resTransaction > -1) {
        this.getJsonAuthResData(resTransaction, this.jsonTransactions);
      } else if (resMTransaction > -1) {
        this.getJsonAuthMultipleResData(resMTransaction, this.jsonTransactions);
      }
      this.transformTab = this.transformTab.map(item => {
        item.messageType = this.selectedTransactionType;
        return item;
      });
      if (conditionIsExist > -1) {
        this.tabChange(this.transformTab[0], 0);
      }
      this.ruleIcon = true;
    }
  }

  public jsonSchemaRequestResponse() {
    let output = this.jsonTransactions.find(
      item =>
        item.messageIntentifier === this.selectedTransactionType &&
        item.contractIntentifier == this.apiName.apiName,
    );
    if (output && !output.condition) {
      this.jsonTransactions = this.jsonTransactions.filter(
        item =>
          item.messageIntentifier !== this.selectedTransactionType &&
          item.contractIntentifier == this.apiName.apiName,
      );
      output = null;
      this.jsonCondition = null;
      this.postActionArray[this.selectedTransactionType] = [];
      this.preActionArray[this.selectedTransactionType] = [];
      this.showRuleConditionList[this.selectedTransactionType] = null;
    }
    if (!output) {
      this.jsonCondition = null;
      let defaultPayload = {
        messageIntentifier: this.selectedTransactionType,
        contractIntentifier: this.apiName.apiName,
        condition: null,
        request: {
          mappings: [],
          type: 'adapter_request',
          postActions: [],
        },
        response: {
          type: 'adapter_response',
          mappings: [],
          preActions: [],
        },
        conditionalResponses: [],
      };
      if (this.apiName.multiple) {
        this.apiName.apiConditionalPackgerFields.map(it => {
          defaultPayload.conditionalResponses.push({
            type: 'adapter_conditional_response',
            packagerName: it.outgoingPackagerName,
            condition: null,
            mappings: [],
          });
        });
      }
      this.jsonTransactions.push(defaultPayload);
      this.getPostActionData();
      this.getPreActionData();
    } else {
      this.jsonCondition = output.condition;
    }
  }

  public deleteTransactionFn(value, event) {
    // if json adaptor
    this.authReqDivShow = 'req';
    if (value) {
      this.selectedTransactionType = null;
      this.postActionArray[value] = [];
      this.preActionArray[value] = [];
      this.apiFields = this.apiFields.map(element => {
        element.transactionTypeValueList = element.transactionTypeValueList.filter(
          it => !(it.value === value),
        );
        return element;
      });
      const output = this.apiFields.find(item => item.apiName === this.apiName.apiName);
      if (output) {
        this.transactionTypeValueList = output.transactionTypeValueList;
      }
      this.jsonTransactions = this.jsonTransactions.filter(
        x => x.messageIntentifier !== value && x.contractIntentifier == this.apiName.apiName,
      );
      this.showRuleConditionList[this.selectedTransactionType] = '';
    }
    this._alertSerivce.responseMessage({
      message: 'Message type deleted successfully',
      status: 'success',
    });
  }

  // add message type logic

  public showCondition(value) {
    this.showRuleConditionList = [];
    this.ruleIcon = false;
    const key = this.selectedTransactionType + value.key;
    let output = this.apiFields.find(item => item.apiName === this.apiName.apiName);
    if (output) {
      output = output.transactionTypeValueList.find(item => item.value.trim() == key.trim());
      if (output) {
        this.ruleIcon = false;
      } else {
        this.showRuleConditionList[this.selectedTransactionType] = '';
      }
    }
  }

  public keyUpFn(value) {
    if (value.key === 'Delete' || value.key === 'Backspace') {
      this.ruleIcon = false;
    }
  }

  public openEnrichPopupFn() {
    this.l1ResConstant = [];
    this.enrichfields = 'constValue';
    this.jsonTransactions.forEach(transactions => {
      if (
        transactions.messageIntentifier === this.selectedTransactionType &&
        transactions.contractIntentifier === this.apiName.apiName
      ) {
        if (this.currentActiveTab.multiple) {
          const output = transactions.conditionalResponses.find(
            el => el.packagerName === this.responseKey,
          );
          if (output) {
            output.mappings.forEach(element => {
              if (element.selectedConstant == 2) {
                let destination = null;
                if (element.destination[0].indexOf('http_headers[') > -1) {
                  destination = element.destination[0].split('${')[1].split('}')[0];
                } else {
                  destination = element.destination[0]
                    .split('native_response_message[')[1]
                    .split(']')[0];
                }
                this.l1ResConstant.push({
                  destination: destination,
                  ipc: 'SYSTEM_ERROR',
                  source: element.source,
                  type: 'field',
                  resImfValue: element.resImfValue,
                  useCase: element.useCase,
                  condition: element.condition ? element.condition : null,
                });
              }
            });
          }
        } else {
          transactions.response.mappings.forEach(element => {
            if (element.selectedConstant == 2) {
              let destination = null;
              if (element.destination[0].indexOf('http_headers[') > -1) {
                destination = element.destination[0].split('${')[1].split('}')[0];
              } else {
                destination = element.destination[0]
                  .split('native_response_message[')[1]
                  .split(']')[0];
              }
              this.l1ResConstant.push({
                destination: destination,
                ipc: 'SYSTEM_ERROR',
                source: element.source,
                type: 'field',
                resImfValue: element.resImfValue,
                useCase: element.useCase,
                condition: element.condition ? element.condition : null,
              });
            }
          });
        }
      }
    });
    if (this.l1ResConstant.length === 0) {
      this.l1ResConstant.push({
        destination: null,
        ipc: 'SYSTEM_ERROR',
        source: null,
        type: 'field',
        condition: null,
      });
    }
    this.showReqEnrichVisible = true;
  }

  public closePopup(event) {
    this.l1ResConstant = event.save ? event.l1ResConstant : [];
    if (event.save) {
      this.jsonTransactions.map(transactions => {
        if (
          transactions.messageIntentifier === this.selectedTransactionType &&
          transactions.contractIntentifier === this.apiName.apiName
        ) {
          if (this.currentActiveTab.multiple) {
            const output = transactions.conditionalResponses.find(
              el => el.packagerName === this.responseKey,
            );
            if (output) {
              output.mappings = output.mappings.filter(el => el && el.selectedConstant != '2');
              this.l1ResConstant.forEach(item => {
                if (item.source && item.destination) {
                  let destination = null;
                  this.showReqEnrichVisible = false;
                  if (item.destination.indexOf('http_headers[') > -1) {
                    destination = ['${' + item.destination + '}'];
                  } else {
                    destination = [
                      '${message_exchange[GATEWAY_SERVICE].native_response_message[' +
                        item.destination +
                        ']}',
                    ];
                  }
                  if (!item.resImfValue) {
                    destination[1] =
                      '${message_exchange[GATEWAY_SERVICE].additional_fields[' +
                      item.destination +
                      ']}';
                  }
                  if (item.useCase == 1 && item.resImfValue) {
                    destination[1] = '${' + item.resImfValue + '}';
                  } else if (item.useCase == 2 && item.resImfValue) {
                    destination[1] =
                      '${message_exchange[GATEWAY_SERVICE].' + item.resImfValue + '}';
                  } else if (item.useCase == 3 && !item.singleDestination && item.resImfValue) {
                    destination[1] =
                      '${message_exchange[GATEWAY_SERVICE].response_message[' +
                      item.resImfValue +
                      ']}';
                  }
                  output.mappings.push({
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
          } else {
            transactions.response.mappings = transactions.response.mappings.filter(
              el => el && el.selectedConstant != '2',
            );
            this.l1ResConstant.forEach(item => {
              if (item.source && item.destination) {
                let destination = null;
                this.showReqEnrichVisible = false;
                if (item.destination.indexOf('http_headers[') > -1) {
                  destination = ['${' + item.destination + '}'];
                } else {
                  destination = [
                    '${message_exchange[GATEWAY_SERVICE].native_response_message[' +
                      item.destination +
                      ']}',
                  ];
                }
                if (!item.resImfValue) {
                  destination[1] =
                    '${message_exchange[GATEWAY_SERVICE].additional_fields[' +
                    item.destination +
                    ']}';
                }
                if (item.useCase == 1 && item.resImfValue) {
                  destination[1] = '${' + item.resImfValue + '}';
                } else if (item.useCase == 2 && item.resImfValue) {
                  destination[1] = '${message_exchange[GATEWAY_SERVICE].' + item.resImfValue + '}';
                } else if (item.useCase == 3 && !item.singleDestination && item.resImfValue) {
                  destination[1] =
                    '${message_exchange[GATEWAY_SERVICE].response_message[' +
                    item.resImfValue +
                    ']}';
                }

                transactions.response.mappings.push({
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
        }
        return transactions;
      });
    }
    this.showReqEnrichVisible = false;
  }

  public addItemfn() {
    this.l1ResConstant.push({
      destination: null,
      ipc: 'SYSTEM_ERROR',
      source: null,
      type: 'field',
      condition: null,
    });
  }

  public removeItemfn() {
    this.l1ResConstant.pop();
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
      } else if (element.name.indexOf('ipc') !== -1) {
        this.ipcList.forEach(iValue => {
          dataList.push({ id: iValue.value, name: iValue.value });
        });
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

  public getRule(data) {
    this.postActionArray[this.selectedTransactionType][data.id].conditionObj = data.condition;
    this.postActionArray[this.selectedTransactionType][data.id].isVisiblecon = false;
  }

  public preGetRule(data) {
    this.preActionArray[this.selectedTransactionType][data.id].conditionObj = data.condition;
    this.preActionArray[this.selectedTransactionType][data.id].isVisiblecon = false;
  }

  public conCancel(item) {
    item.isVisiblecon = false;
  }

  // tslint:disable-next-line: use-life-cycle-interface
  public ngOnDestroy(): void {
    // Called once, before the instance is destroyed.
    // Add 'implements OnDestroy' to the class.
    this.jsonTransactions = [];
    this.apiFields = [];
    this.componentDestroyed.next();
    this.componentDestroyed.complete();
    this.componentDestroyed.unsubscribe();
  }

  private stringifyObj() {
    this.adapterData.transformData.persistRequired = 1;
    this.validatePostAction();
    this.validatePreAction();
    this.jsonTransactions = this.jsonTransactions.map(transactions => {
      if (
        transactions.messageIntentifier === this.selectedTransactionType &&
        transactions.contractIntentifier == this.apiName.apiName
      ) {
        if (transactions.conditionalResponses) {
          transactions.conditionalResponses = transactions.conditionalResponses.map(item => {
            item.mappings = item.mappings.filter(el => el && el !== null);
            return item;
          });
        }
        transactions.request.mappings = transactions.request.mappings.filter(
          el => el && el !== null,
        );
        this.setPostAction(transactions);
        this.setPreAction(transactions);
      }
      return transactions;
    });
    this.setCustomMapperItem();
    this.adapterData.transformData.requestMapping = {};
    this.adapterData.transformData.requestMapping.transactions = this.jsonTransactions;
  }

  public setCustomMapperItem() {
    if (this.selectedTabIndex !== 0) {
      this.jsonTransactions.forEach(transactions => {
        if (transactions.messageIntentifier === this.selectedTransactionType) {
          const customMappings = transactions.response.mappings.filter(
            item => item.type === 'custom_mapper',
          );
          transactions.response.mappings = transactions.response.mappings.filter(
            item => item.type !== 'custom_mapper',
          );
          if (customMappings) {
            transactions.response.mappings.push(...customMappings);
          }
        }
      });
    }
  }

  public setConstantMapperItem() {
    if (this.selectedTabIndex == 0) {
      this.jsonTransactions.forEach(transactions => {
        if (
          transactions.messageIntentifier === this.selectedTransactionType &&
          transactions.contractIntentifier == this.apiName.apiName
        ) {
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
      this.jsonTransactions.forEach(transactions => {
        if (
          transactions.messageIntentifier === this.selectedTransactionType &&
          transactions.contractIntentifier === this.apiName.apiName
        ) {
          if (this.currentActiveTab.multiple) {
            const element = transactions.conditionalResponses.find(
              el => el.packagerName === this.responseKey,
            );
            const constantMappings = element.mappings.filter(item => item.selectedConstant === '2');
            element.mappings = element.mappings.filter(item => item.selectedConstant !== '2');
            element.mappings.unshift(...constantMappings);
          } else {
            const constantMappings = transactions.response.mappings.filter(
              item => item.selectedConstant === '2',
            );
            transactions.response.mappings = transactions.response.mappings.filter(
              item => item.selectedConstant !== '2',
            );
            transactions.response.mappings.unshift(...constantMappings);
          }
        }
      });
    }
  }

  private getJsonAuthReqData(id, data, flag = true) {
    this.transformActionItem = [];
    this.ruleIcon = true;
    this.requestImfField = [];
    if (data[id]) {
      if (flag) {
        this.getRuleConditionData();
      }
      this.echoObject[this.selectedTransactionType] = {
        echo: [],
        reqecho: [],
        responseImfExp: [],
      };
      data[id].request.mappings.forEach(item => {
        if (
          item &&
          item.source &&
          item.source !== data[id].messageIntentifier &&
          !item.selectedConstant &&
          !item.echo
        ) {
          if (item.type === 'field') {
            if (
              item.destination &&
              item.destination[0] &&
              (item.destination[0].indexOf('http_headers[') === -1 ||
                item.destination[0].indexOf('additional_fields') === -1)
            ) {
              let imfField = this.getImfName(item.destination[0]);
              let source = this.getFieldId(item.source);
              if (item.fieldId) {
                if (source !== item.fieldId) {
                  const source1 = item.fieldId;
                  this.requestImfField[source1 + this.selectedTransactionType] = item.name;
                  if (!this.transformActionItem[source1 + this.selectedTransactionType]) {
                    this.transformActionItem[source1 + this.selectedTransactionType] = [];
                  }
                  this.selectSourceData[source1 + this.selectedTransactionType] = true;
                  this.transformActionItem[source1 + this.selectedTransactionType].push(item);
                } else {
                  source = item.fieldId;
                  this.requestImfField[source + this.selectedTransactionType] = item.name;
                }
              } else {
                if (this.requestImfField[source + this.selectedTransactionType] && false) {
                  this.requestImfField[source + this.selectedTransactionType] =
                    this.requestImfField[source + this.selectedTransactionType] + ',' + imfField;
                } else {
                  this.requestImfField[source + this.selectedTransactionType] = imfField;
                }
              }
              this.selectSourceData[source + this.selectedTransactionType] = true;
              if (!this.transformActionItem[source + this.selectedTransactionType]) {
                this.transformActionItem[source + this.selectedTransactionType] = [];
              }
              this.transformActionItem[source + this.selectedTransactionType].push(item);
            } else if (
              item.destination[0].indexOf('additional_fields') === -1 ||
              item.destination[0].indexOf('http_headers[') === -1
            ) {
              const reqecho = this.findData(
                this.echoObject[this.selectedTransactionType].reqecho,
                item,
              );
              if (!reqecho) {
                this.echoObject[this.selectedTransactionType].reqecho.push(item);
              }
            }
          } else if (item.type === 'in_built_mapper') {
            const source = this.getFieldId(item.source);
            this.requestImfField[source + this.selectedTransactionType] = item.mapper;
            this.getData(item, source);
          } else if (item.type === 'groovy_executor' && item.source && !item.marker) {
            const source = this.getFieldId(item.source);
            if (item.selectedOption === 'script') {
              this.requestImfField[source + this.selectedTransactionType] = 'ScriptMapper';
            }
            this.getData(item, source);
          }
        } else if (item.type === 'loop') {
          this.loopArray = [];
          let sourceList = this.getSourseData(item.mappings.mappings);
          sourceList.forEach(it => {
            if (it.type === 'field') {
              if (
                it.destination &&
                it.destination[0] &&
                (it.destination[0].indexOf('http_headers[') === -1 ||
                  it.destination[0].indexOf('additional_fields') === -1)
              ) {
                let imfField = this.getImfName(it.destination[0]);
                let source = this.getFieldId(it.source);
                if (it.fieldId) {
                  if (source !== it.fieldId) {
                    const source1 = it.fieldId;
                    this.requestImfField[source1 + this.selectedTransactionType] = it.name;
                    if (!this.transformActionItem[source1 + this.selectedTransactionType]) {
                      this.transformActionItem[source1 + this.selectedTransactionType] = [];
                    }
                    this.selectSourceData[source1 + this.selectedTransactionType] = true;
                    this.transformActionItem[source1 + this.selectedTransactionType].push(it);
                  } else {
                    source = it.fieldId;
                    this.requestImfField[source + this.selectedTransactionType] = it.name;
                  }
                } else {
                  if (this.requestImfField[source + this.selectedTransactionType] && false) {
                    this.requestImfField[source + this.selectedTransactionType] =
                      this.requestImfField[source + this.selectedTransactionType] + ',' + imfField;
                  } else {
                    this.requestImfField[source + this.selectedTransactionType] = imfField;
                  }
                }
                this.selectSourceData[source + this.selectedTransactionType] = true;
                if (!this.transformActionItem[source + this.selectedTransactionType]) {
                  this.transformActionItem[source + this.selectedTransactionType] = [];
                }
                this.transformActionItem[source + this.selectedTransactionType].push(it);
              } else if (
                it.destination[0].indexOf('additional_fields') === -1 ||
                it.destination[0].indexOf('http_headers[') === -1
              ) {
                const reqecho = this.findData(
                  this.echoObject[this.selectedTransactionType].reqecho,
                  it,
                );
                if (!reqecho) {
                  this.echoObject[this.selectedTransactionType].reqecho.push(it);
                }
              }
            }
          });
        }
      });
    }
  }

  private getSourseData(mapperList) {
    mapperList.forEach(element => {
      if (element.type === 'field') {
        this.loopArray.push(element);
      } else if (element.type === 'loop') {
        this.getSourseData(element.mappings.mappings);
      }
    });
    return this.loopArray;
  }

  private getJsonAuthResData(id, data) {
    if (data[id]) {
      data[id].response.mappings.forEach(item => {
        if (
          item &&
          item.source &&
          item.source !== data[id].messageIntentifier &&
          !item.selectedConstant
        ) {
          if (item.source.indexOf('additional_fields') === -1) {
            if (item.type === 'join') {
              if (item.destination && item.destination[0]) {
                const source = item.fieldId;
                this.selectSourceResData[
                  source + this.selectedTransactionType + '-' + this.responseKey
                ] = true;
                this.transformActionItemRes[
                  source + this.selectedTransactionType + '-' + this.responseKey
                ] = item;
                const sourceList = [];
                item.source.forEach((el, i) => {
                  let source;
                  if (el.sourceType == 'text') {
                    source = el.source;
                  } else {
                    source = this.getResImfValue(el.source);
                  }
                  sourceList.push(source);
                });
                this.responseImfField[
                  source + this.selectedTransactionType + '-' + this.responseKey
                ] = sourceList.join(' ,');
              }
            } else if (item.destination && item.destination[0]) {
              const source = item.fieldId;
              const imfName = this.getImfName(item.source);
              this.responseImfField[
                source + this.selectedTransactionType + '-' + this.responseKey
              ] = imfName;
              this.selectSourceResData[
                source + this.selectedTransactionType + '-' + this.responseKey
              ] = true;
              this.transformActionItemRes[
                source + this.selectedTransactionType + '-' + this.responseKey
              ] = item;
            } else if (item.selectedOption === 'mapper' && item.type !== 'in_built_mapper') {
              const source = this.getFieldId(item.source);
              this.selectSourceResData[
                source + this.selectedTransactionType + '-' + this.responseKey
              ] = true;
              this.responseImfField[
                source + this.selectedTransactionType + '-' + this.responseKey
              ] = item.name;
              if (
                !this.transformActionItemRes[
                  source + this.selectedTransactionType + '-' + this.responseKey
                ]
              ) {
                this.transformActionItemRes[
                  source + this.selectedTransactionType + '-' + this.responseKey
                ] = {
                  selectedOption: 'mapper',
                  value: [],
                };
              }
              this.transformActionItemRes[
                source + this.selectedTransactionType + '-' + this.responseKey
              ].value.push(item);
            } else {
              const source = this.getFieldId(item.source);
              this.selectSourceResData[
                source + this.selectedTransactionType + '-' + this.responseKey
              ] = true;
              this.transformActionItemRes[
                source + this.selectedTransactionType + '-' + this.responseKey
              ] = item;
              if (item.type === 'in_built_mapper') {
                this.responseImfField[
                  source + this.selectedTransactionType + '-' + this.responseKey
                ] = item.mapper;
              } else if (item.selectedOption === 'script') {
                this.responseImfField[
                  source + this.selectedTransactionType + '-' + this.responseKey
                ] = 'Script Mapper';
              }
            }
          } else if (item.source.indexOf('additional_fields') !== -1) {
            let source = item.destination[0].split('native_response_message[');
            if (source && source[1]) {
              source = source[1].split(']');
              if (source && source[0]) {
                source = source[0];
              }
            }
            this.selectSourceResData[
              source + this.selectedTransactionType + '-' + this.responseKey
            ] = true;
            this.authResEcho[source + this.selectedTransactionType + '-' + this.responseKey] = true;
            if (!this.echoObject[this.selectedTransactionType + '-' + this.responseKey]) {
              this.echoObject[this.selectedTransactionType + '-' + this.responseKey] = {
                echo: [],
                reqecho: [],
                responseImfExp: [],
              };
              this.echoObject[this.selectedTransactionType + '-' + this.responseKey].echo.push(
                item,
              );
            } else {
              const echo = this.findData(
                this.echoObject[this.selectedTransactionType + '-' + this.responseKey].echo,
                item,
              );
              if (!echo) {
                this.echoObject[this.selectedTransactionType + '-' + this.responseKey].echo.push(
                  item,
                );
              }
            }
          }
        }
      });
    }
  }

  private getJsonAuthMultipleResData(id, data) {
    if (data[id]) {
      const output = data[id].conditionalResponses.find(el => el.packagerName === this.responseKey);
      if (output) {
        output.mappings.forEach(item => {
          if (
            item &&
            item.source &&
            item.source !== data[id].messageIntentifier &&
            !item.selectedConstant
          ) {
            if (item.source.indexOf('additional_fields') === -1) {
              if (item.type === 'join') {
                if (
                  item.destination &&
                  item.destination[0] &&
                  (item.destination[0].indexOf('native_response_message[') !== -1 ||
                    item.destination[0].indexOf('http_headers[') > -1)
                ) {
                  const source = item.fieldId;
                  this.selectSourceResData[
                    source + this.selectedTransactionType + '-' + this.responseKey
                  ] = true;
                  this.transformActionItemRes[
                    source + this.selectedTransactionType + '-' + this.responseKey
                  ] = item;
                  const sourceList = [];
                  item.source.forEach((el, i) => {
                    let source;
                    if (el.sourceType == 'text') {
                      source = el.source;
                    } else {
                      source = this.getResImfValue(el.source);
                    }
                    sourceList.push(source);
                  });
                  this.responseImfField[
                    source + this.selectedTransactionType + '-' + this.responseKey
                  ] = sourceList.join(' ,');
                }
              } else if (
                item.destination &&
                item.destination[0] &&
                (item.destination[0].indexOf('native_response_message[') !== -1 ||
                  item.destination[0].indexOf('http_headers[') > -1)
              ) {
                const source = item.fieldId;
                const imfName = this.getImfName(item.source);
                this.responseImfField[
                  source + this.selectedTransactionType + '-' + this.responseKey
                ] = imfName;
                this.selectSourceResData[
                  source + this.selectedTransactionType + '-' + this.responseKey
                ] = true;
                this.transformActionItemRes[
                  source + this.selectedTransactionType + '-' + this.responseKey
                ] = item;
              } else if (item.selectedOption === 'mapper' && item.type !== 'in_built_mapper') {
                const source = this.getFieldId(item.source);
                this.selectSourceResData[
                  source + this.selectedTransactionType + '-' + this.responseKey
                ] = true;
                this.responseImfField[
                  source + this.selectedTransactionType + '-' + this.responseKey
                ] = item.name;
                if (
                  !this.transformActionItemRes[
                    source + this.selectedTransactionType + '-' + this.responseKey
                  ]
                ) {
                  this.transformActionItemRes[
                    source + this.selectedTransactionType + '-' + this.responseKey
                  ] = {
                    selectedOption: 'mapper',
                    value: [],
                  };
                }
                this.transformActionItemRes[
                  source + this.selectedTransactionType + '-' + this.responseKey
                ].value.push(item);
              } else {
                const source = this.getFieldId(item.source);
                this.selectSourceResData[
                  source + this.selectedTransactionType + '-' + this.responseKey
                ] = true;
                this.transformActionItemRes[
                  source + this.selectedTransactionType + '-' + this.responseKey
                ] = item;
                if (item.type === 'in_built_mapper') {
                  this.responseImfField[
                    source + this.selectedTransactionType + '-' + this.responseKey
                  ] = item.mapper;
                } else if (item.selectedOption === 'script') {
                  this.responseImfField[
                    source + this.selectedTransactionType + '-' + this.responseKey
                  ] = 'Script Mapper';
                }
              }
            } else if (item.source.indexOf('additional_fields') !== -1) {
              let source = item.destination[0].split('native_response_message[');
              if (source && source[1]) {
                source = source[1].split(']');
                if (source && source[0]) {
                  source = source[0];
                }
              }
              this.selectSourceResData[
                source + this.selectedTransactionType + '-' + this.responseKey
              ] = true;
              this.authResEcho[source + this.selectedTransactionType + '-' + this.responseKey] =
                true;
            }
          }
        });
      }
    }
  }

  private getCopyAuthReqData(id, data, flag = true) {
    this.transformActionItem = [];
    data[id].request.mappings.forEach(item => {
      if (
        item &&
        item.source &&
        item.source !== data[id].messageIntentifier &&
        !item.selectedConstant
      ) {
        if (item.type === 'field') {
          if (
            item.destination &&
            item.destination[0] &&
            item.destination[0].indexOf('additional_fields') === -1
          ) {
            let imfField = this.getImfName(item.destination[0]);
            let source = this.getFieldId(item.source);
            if (item.fieldId) {
              if (source !== item.fieldId) {
                this.requestImfField[source + this.selectedTransactionType] = item.name;
                if (!this.transformActionItem[source + this.selectedTransactionType]) {
                  this.transformActionItem[source + this.selectedTransactionType] = [];
                }
                this.selectSourceData[source + this.selectedTransactionType] = true;
                this.transformActionItem[source + this.selectedTransactionType].push(item);
              } else {
                source = item.fieldId;
                this.requestImfField[source + this.selectedTransactionType] = item.name;
              }
            } else {
              if (this.requestImfField[source + this.selectedTransactionType]) {
                this.requestImfField[source + this.selectedTransactionType] =
                  this.requestImfField[source + this.selectedTransactionType] + ',' + imfField;
              } else {
                this.requestImfField[source + this.selectedTransactionType] = imfField;
              }
            }
            this.selectSourceData[source + this.selectedTransactionType] = true;
            if (!this.transformActionItem[source + this.selectedTransactionType]) {
              this.transformActionItem[source + this.selectedTransactionType] = [];
            }
            this.transformActionItem[source + this.selectedTransactionType].push(item);
          } else if (item.destination[0].indexOf('additional_fields') !== -1) {
            const reqecho = this.findData(
              this.echoObject[this.selectedTransactionType].reqecho,
              item,
            );
            if (!reqecho) {
              this.echoObject[this.selectedTransactionType].reqecho.push(item);
            }
          }
        }
      }
    });
  }

  private getCopyAuthResData(id, data) {
    this.responseImfField = [];
    data[id].response.mappings.forEach(item => {
      if (
        item &&
        item.source &&
        item.source !== data[id].messageIntentifier &&
        !item.selectedConstant
      ) {
        if (item.source.indexOf('additional_fields') === -1) {
          if (item.type === 'join') {
            if (
              item.destination &&
              item.destination[0] &&
              item.destination[0].indexOf('native_response_message[') !== -1
            ) {
              const source = item.fieldId;
              this.selectSourceResData[source + this.selectedTransactionType] = true;
              this.transformActionItemRes[source + this.selectedTransactionType] = item;
              const sourceList = [];
              item.source.forEach((el, i) => {
                const source = this.getResImfValue(el.source);
                sourceList.push(source);
              });
              this.responseImfField[source + this.selectedTransactionType] = sourceList.join(' ,');
            }
          } else if (
            item.destination &&
            item.destination[0] &&
            item.destination[0].indexOf('native_response_message[') !== -1
          ) {
            const source = item.fieldId;
            const imfName = this.getImfName(item.source);
            this.responseImfField[source + this.selectedTransactionType] = imfName;
            this.selectSourceResData[source + this.selectedTransactionType] = true;
            this.transformActionItemRes[source + this.selectedTransactionType] = item;
          } else if (item.selectedOption === 'mapper' && item.type !== 'in_built_mapper') {
            const source = this.getFieldId(item.source);
            this.selectSourceResData[source + this.selectedTransactionType] = true;
            this.responseImfField[source + this.selectedTransactionType] = item.name;
            if (!this.transformActionItemRes[source + this.selectedTransactionType]) {
              this.transformActionItemRes[source + this.selectedTransactionType] = {
                selectedOption: 'mapper',
                value: [],
              };
              this.transformActionItemRes[source + this.selectedTransactionType].value.push(item);
            }
          } else {
            const source = this.getFieldId(item.source);
            this.selectSourceResData[source + this.selectedTransactionType] = true;
            this.transformActionItemRes[source + this.selectedTransactionType] = item;
            if (item.type === 'in_built_mapper') {
              this.responseImfField[source + this.selectedTransactionType] = item.mapper;
            } else if (item.selectedOption === 'script') {
              this.responseImfField[source + this.selectedTransactionType] = 'Script Mapper';
            }
          }
        } else if (item.source.indexOf('additional_fields') !== -1) {
          let source = item.destination[0].split('native_response_message[');
          if (source && source[1]) {
            source = source[1].split(']');
            if (source && source[0]) {
              source = source[0];
            }
          }
          this.selectSourceResData[source + this.selectedTransactionType] = true;
          this.authResEcho[source + this.selectedTransactionType] = true;
          if (!this.echoObject[this.selectedTransactionType]) {
            this.echoObject[this.selectedTransactionType] = {
              echo: [],
              reqecho: [],
              responseImfExp: [],
            };
            this.echoObject[this.selectedTransactionType].echo.push(item);
          } else {
            const echo = this.findData(this.echoObject[this.selectedTransactionType].echo, item);
            if (!echo) {
              this.echoObject[this.selectedTransactionType].echo.push(item);
            }
          }
        }
      }
    });
  }

  private getResImfValue(Source) {
    let resImfValue;
    if (Source.indexOf('_message[') === -1) {
      if (Source.indexOf(']') === -1) {
        resImfValue = Source.split('{')[1].split('}')[0];
      } else {
        resImfValue = Source.split('].')[1].split('}')[0];
      }
    } else {
      resImfValue = Source.split('message[')[1].split(']')[0];
    }
    return resImfValue;
  }

  private tabTransform(event, activeTab) {
    this.transformTab = [];
    if (event && event.incomingFields && event.incomingFields.length) {
      this.transformTab.push({
        key: 'request',
        value: 'Request',
        data: event?.incomingFields,
        messageType: this.selectedTransactionType,
        api: this.apiName,
      });
      this.adapterData.transformData.listIdRule = event?.incomingFields.concat(
        this.adapterData.transformData.apiFieldsData.headerFields,
      );
    }
    if (event && event.outGoingFields && event.outGoingFields.length) {
      this.transformTab.push({
        key: 'response',
        value: 'Response',
        data: event.outGoingFields,
        outgoingPackagerName: 'default',
        messageType: this.selectedTransactionType,
        api: this.apiName,
        multiple: false,
      });
    }
    if (event && event.apiConditionalPackgerFields && event.apiConditionalPackgerFields.length) {
      event.apiConditionalPackgerFields.forEach((item, index) => {
        this.transformTab.push({
          key: 'response',
          value: item.outgoingPackagerName + ' Response',
          data: item.outGoingFields,
          outgoingPackagerName: item.outgoingPackagerName,
          messageType: this.selectedTransactionType,
          api: this.apiName,
          multiple: true,
        });
      });
    }
    this.transformTab.push({
      key: 'postAction',
      value: 'Post Action Request',
      messageType: '',
      api: this.apiName,
    });
    this.transformTab.push({
      key: 'preAction',
      value: 'Pre Action Response',
      messageType: '',
      api: this.apiName,
    });
  }

  private getRuleConditionData() {
    this.showRuleConditionList[this.selectedTransactionType] = 'abc';
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

  private findData = (Data, item) => {
    const obj = Data.find(x => x && JSON.stringify(x) === JSON.stringify(item));
    if (obj) {
      return true;
    } else {
      return false;
    }
  };
  private getData = (item, source) => {
    this.transformActionItem[source + this.selectedTransactionType] = [];
    this.transformActionItem[source + this.selectedTransactionType].push(item);
    this.selectSourceData[source + this.selectedTransactionType] = true;
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

  private pullArrayJsonReqData(data) {
    this.jsonTransactions.forEach(transactions => {
      if (
        transactions.messageIntentifier === this.selectedTransactionType &&
        transactions.contractIntentifier === this.apiName.apiName
      ) {
        transactions.request.mappings.forEach((maps, index) => {
          if (maps.type === 'loop') {
            maps.mappings.mappings.forEach((map, index) => {
              if (
                map &&
                map.source === data.source &&
                map.type === data.type &&
                map.destination &&
                map.destination[0].indexOf('additional_fields') === -1
              ) {
                this.currentIndex = index;
                delete maps.mappings.mappings[index];
              } else if (
                map &&
                ((map.source && map.source === data.fieldId) ||
                  (map.fieldId && map.fieldId === data.fieldId))
              ) {
                if (map.source) {
                  const source1 = map.source.split('{')[1].split('}')[0];
                  if (data.fieldId !== source1) {
                    this.transformActionItem[source1 + this.selectedTransactionType] = [];
                    this.requestImfField[source1 + this.selectedTransactionType] = ' ';
                    this.selectSourceData[source1 + this.selectedTransactionType] = false;
                  }
                }
                this.currentIndex = index;
                delete maps.mappings.mappings[index];
              }
            });
            maps.mappings.mappings = maps.mappings.mappings.filter(it => it);
          }
        });
        transactions.request.mappings = transactions.request.mappings.filter(it => it);
      }
    });
  }

  private pullJsonReqData(data) {
    this.jsonTransactions.forEach(transactions => {
      if (
        transactions.messageIntentifier === this.selectedTransactionType &&
        transactions.contractIntentifier === this.apiName.apiName
      ) {
        transactions.request.mappings.forEach((map, index) => {
          if (
            map &&
            map.source === data.source &&
            map.type === data.type &&
            map.destination &&
            map.destination[0].indexOf('additional_fields') === -1
          ) {
            this.currentIndex = index;
            delete transactions.request.mappings[index];
          } else if (
            map &&
            ((map.source && map.source === data.fieldId) ||
              (map.fieldId && map.fieldId === data.fieldId))
          ) {
            if (map.source) {
              const source1 = map.source.split('{')[1].split('}')[0];
              if (data.fieldId !== source1) {
                this.transformActionItem[source1 + this.selectedTransactionType] = [];
                this.requestImfField[source1 + this.selectedTransactionType] = ' ';
                this.selectSourceData[source1 + this.selectedTransactionType] = false;
              }
            }
            this.currentIndex = index;
            delete transactions.request.mappings[index];
          } else if (
            map &&
            map.source === data.source &&
            (data.type === 'groovy_executor' || data.type === 'in_built_mapper')
          ) {
            this.currentIndex = index;
            delete transactions.request.mappings[index];
          }
        });
        transactions.request.mappings = transactions.request.mappings.filter(it => it);
      }
    });
  }

  private pullJsonResData(id, data, flag = '') {
    this.jsonTransactions.forEach(transactions => {
      if (
        transactions.messageIntentifier === this.selectedTransactionType &&
        transactions.contractIntentifier === this.apiName.apiName &&
        !this.apiName.multiple
      ) {
        transactions.response.mappings.forEach((element, i) => {
          if (element && element.fieldId === id) {
            if (element.type === 'field' && flag === 'mapper') {
              const source = element.source.split('{')[1].split('}')[0];
              this.selectSourceResData[
                source + this.selectedTransactionType + '-' + this.responseKey
              ] = false;
              this.responseImfField[id + this.selectedTransactionType + '-' + this.responseKey] =
                source;
              this.transformActionItemRes[
                source + this.selectedTransactionType + '-' + this.responseKey
              ] = undefined;
            }
            this.currentIndex = i;
            delete transactions.response.mappings[i];
          } else if (element.selectedFormat == 4) {
            const source = element.source.split('{')[1].split('}')[0];
            if (source === id) {
              this.currentIndex = i;
              delete transactions.response.mappings[i];
            }
          }
        });
        transactions.response.mappings = transactions.response.mappings.filter(x => x !== null);
        transactions.response.mappings = transactions.response.mappings.filter(it => it);
        data.forEach(item => {
          if (this.currentIndex) {
            transactions.response.mappings.splice(this.currentIndex, 0, item);
          } else {
            transactions.response.mappings.push(item);
          }
        });
      }
      return transactions;
    });
  }

  private pullMultipleJsonResData(id, data, flag = '') {
    this.jsonTransactions.forEach(transactions => {
      if (
        transactions.messageIntentifier === this.selectedTransactionType &&
        transactions.contractIntentifier === this.apiName.apiName &&
        this.apiName.multiple
      ) {
        const output = transactions.conditionalResponses.find(
          it => it.packagerName == this.responseKey,
        );
        if (output) {
          output.mappings.forEach((element, i) => {
            if (element && element.fieldId === id) {
              if (element.type === 'field' && flag === 'mapper') {
                const source = element.source.split('{')[1].split('}')[0];
                this.selectSourceResData[
                  source + this.selectedTransactionType + '-' + this.responseKey
                ] = false;
                this.responseImfField[id + this.selectedTransactionType + '-' + this.responseKey] =
                  source;
                this.transformActionItemRes[
                  source + this.selectedTransactionType + '-' + this.responseKey
                ] = undefined;
              }
              this.currentIndex = i;
              delete output.mappings[i];
            } else if (element.selectedFormat == 4) {
              const source = element.source.split('{')[1].split('}')[0];
              if (source === id) {
                this.currentIndex = i;
                delete output.mappings[i];
              }
            }
          });
          output.mappings = output.mappings.filter(x => x !== null);
          output.mappings = output.mappings.filter(it => it);
          data.forEach(item => {
            if (this.currentIndex) {
              output.mappings.splice(this.currentIndex, 0, item);
            } else {
              output.mappings.push(item);
            }
          });
        }
      }
      return transactions;
    });
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
    this.jsonTransactions.map(item => {
      if (
        item.messageIntentifier === this.selectedTransactionType &&
        item.contractIntentifier == this.apiName.apiName
      ) {
        item.request.mappings = item.request.mappings.filter(it => it.selectedConstant !== '2');
        item.request.mappings = item.request.mappings.filter(it => it.type !== 'imdg_enrich');
        this.queryObjDropDown = this.queryObjDropDown.map(queryObj => {
          queryObj.value.fields.map(field => {
            (field.destination = [
              '${message_exchange[GATEWAY_SERVICE].request_message[' + field.destination + ']}',
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
                '${message_exchange[GATEWAY_SERVICE].request_message[' + condition.value + ']}'),
              (condition.type = 'equal');
            return condition;
          });
          item.request.mappings.push(queryObj.value);
          return queryObj;
        });
      }
      return item;
    });
  }

  private saveConstant() {
    this.jsonTransactions.map(item => {
      if (
        item.messageIntentifier === this.selectedTransactionType &&
        item.contractIntentifier === this.apiName.apiName
      ) {
        item.request.mappings = item.request.mappings.filter(el => el && el.selectedConstant != 2);
        this.mappings.forEach(item1 => {
          let destination;
          if (item1.useCase == 1) {
            destination = '${' + item1.resImfValue + '}';
          } else if (item1.useCase == 2) {
            destination = '${message_exchange[GATEWAY_SERVICE].' + item1.resImfValue + '}';
          } else if (item1.useCase == 3) {
            destination =
              '${message_exchange[GATEWAY_SERVICE].request_message[' + item1.resImfValue + ']}';
          }
          item.request.mappings.unshift({
            type: 'field',
            source: item1.source,
            destination: [destination],
            ipc: item1.ipc,
            useCase: item1.useCase,
            resImfValue: item1.resImfValue,
            selectedConstant: '2',
            condition: item1.condition ? item1.condition : null,
          });
        });
      }
      return item;
    });
  }

  openCondition() {
    this.isResponseMutltipleCondition = true;
    this.resMultipleCondition = null;
    this.jsonTransactions.map(item => {
      if (
        item.messageIntentifier === this.selectedTransactionType &&
        item.contractIntentifier === this.apiName.apiName
      ) {
        const output = item.conditionalResponses.find(el => el.packagerName === this.responseKey);
        this.resMultipleCondition = JSON.parse(JSON.stringify(output.condition));
      }
    });
  }

  public cancelMultiCondition() {
    this.isResponseMutltipleCondition = false;
  }

  public saveResCondition(event) {
    this.resMultipleCondition = JSON.parse(JSON.stringify(event.condition));
    this.isResponseMutltipleCondition = false;
    this.jsonTransactions.map(item => {
      if (
        item.messageIntentifier === this.selectedTransactionType &&
        item.contractIntentifier === this.apiName.apiName
      ) {
        const output = item.conditionalResponses.find(el => el.packagerName === this.responseKey);
        output.condition = this.resMultipleCondition;
      }
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
      if (this.enrichfields === 'configuration') {
        this.saveConfiguration();
      } else {
        this.clearEnrichModel();
        this.saveConstant();
      }
    }
    this.isDataEnrichmentScreenVisible = false;
  }

  close() {
    this.isDataEnrichmentScreenVisible = false;
  }

  private removeEchoFromReq(id) {
    const additionalField = '${message_exchange[GATEWAY_SERVICE].additional_fields[' + id + ']}';
    this.jsonTransactions.map(item1 => {
      if (
        item1.messageIntentifier === this.selectedTransactionType &&
        item1.contractIntentifier === this.apiName.apiName
      ) {
        item1.request.mappings.forEach((x, i) => {
          if (x) {
            if (x.destination && x.destination[0] === additionalField) {
              delete item1.request.mappings[i];
            } else if (x.type === 'imdg_enrich' && x.fieldId === id) {
              delete item1.request.mappings[i];
            } else if (x.source === `{${id}}` && x.echo) {
              delete item1.request.mappings[i];
            }
          }
        });
        item1.request.mappings = item1.request.mappings.filter(x => x !== null);
      }
      return item1;
    });
  }

  private getPostActionData() {
    this._store
      .pipe(takeUntil(this.componentDestroyed), select(SelectPostActionMethod))
      .subscribe((response: any) => {
        if (response && response.data) {
          this.executeData = response.data;
          this.jsonTransactions.forEach(transactions => {
            if (
              transactions.messageIntentifier === this.selectedTransactionType &&
              transactions.contractIntentifier === this.apiName.apiName
            ) {
              this.postActionArray[transactions.messageIntentifier] = [];
              if (transactions.request.postActions) {
                transactions.request.postActions.forEach(element => {
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

  private setPostAction(transactions) {
    transactions.request.postActions = [];
    if (this.postActionArray[transactions.messageIntentifier]) {
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
              type: 'AdapterPostActions',
              execute: element.executeModel.actionName,
              parameters: parameter,
            };
            if (element.IPCvalue) {
              postObject['ipc'] = element.IPCvalue;
            }
            if (element.postAction === 'Conditional' && element.conditionObj) {
              postObject['condition'] = element.conditionObj;
            }
            transactions.request.postActions.push(JSON.parse(JSON.stringify(postObject)));
          }
        }
      });
    }
  }

  private paramMapFn(item, element, serviceList, flag = false, index) {
    let dataList = [];
    let dataList2 = [];
    let splitName = [];
    if (!flag) {
      splitName = element.name.split(':');
      if (splitName[0].indexOf('ipc') !== -1) {
        this.ipcList.forEach(imfData => {
          dataList.push({ id: imfData.value, name: imfData.value });
        });
      }
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
      if (splitName[1].indexOf('ipc') !== -1) {
        this.ipcList.forEach(imfData => {
          dataList2.push({ id: imfData.value, name: imfData.value });
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
    if (name.indexOf('ipc') !== -1) {
      item.listParam[index].push({
        type: flag ? element.type : element.dataType,
        list: dataList,
        name: flag ? element.name : element.displayName,
        label: flag ? element.label : element.name,
        value: null,
      });
    } else if (name.indexOf('imf') !== -1) {
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

  public removeFile(index) {
    this.fileInfos.splice(index, 1);
  }

  public uploadFile(event) {
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
      const output = this.jsonTransactions.find(
        transactions =>
          transactions.messageIntentifier === this.selectedTransactionType &&
          transactions.contractIntentifier === this.apiName.apiName,
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
      const output = this.jsonTransactions.find(
        transactions =>
          transactions.messageIntentifier === this.selectedTransactionType &&
          transactions.contractIntentifier === this.apiName.apiName,
      );
      if (this.currentActiveTab.multiple) {
        const element = output.conditionalResponses.find(
          el => el.packagerName === this.responseKey,
        );
        this.customMappings = element.mappings.filter(item => item.type === 'custom_mapper');
      } else {
        this.customMappings = output.response.mappings.filter(
          item => item.type === 'custom_mapper',
        );
      }
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
      this.jsonTransactions.forEach(transactions => {
        if (
          transactions.messageIntentifier === this.selectedTransactionType &&
          transactions.contractIntentifier === this.apiName.apiName
        ) {
          transactions.request.mappings = transactions.request.mappings.filter(
            item => item.type !== 'custom_mapper',
          );
          this.customMappings = this.customMappings.filter(item => item.className);
          transactions.request.mappings.unshift(...this.customMappings);
        }
      });
    } else {
      this.jsonTransactions.forEach(transactions => {
        if (
          transactions.messageIntentifier === this.selectedTransactionType &&
          transactions.contractIntentifier === this.apiName.apiName
        ) {
          if (this.currentActiveTab.multiple) {
            const element = transactions.conditionalResponses.find(
              el => el.packagerName === this.responseKey,
            );
            element.mappings = element.mappings.filter(item => item.type !== 'custom_mapper');
            this.customMappings = this.customMappings.filter(item => item.className);
            element.mappings.push(...this.customMappings);
          } else {
            transactions.response.mappings = transactions.response.mappings.filter(
              item => item.type !== 'custom_mapper',
            );
            this.customMappings = this.customMappings.filter(item => item.className);
            transactions.response.mappings.push(...this.customMappings);
          }
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

  private transformLogicNew(data) {
    return data.map(item => {
      if (!item.attributes) {
        item.title = item.alias;
        item.key = this.nameLogic(item);
        item.isLeaf = true;
      } else {
        item.title = item.name;
        if (item.useCase !== '3') {
          item.key = item.alias;
          item.disabled = true;
        } else {
          item.key = this.nameLogic(item);
        }
      }
      if (item.attributes) {
        item.children = this.transformLogicNew(item.attributes);
      }
      return item;
    });
  }

  private nameLogic(item) {
    let name;
    if (item.useCase === '1') {
      name = '${' + item.nestedName + '}';
    } else if (item.useCase === '2') {
      name = '${message_exchange[GATEWAY_SERVICE].' + item.nestedName + '}';
    } else {
      name = '${message_exchange[GATEWAY_SERVICE].request_message[' + item.nestedName + ']}';
    }
    return name;
  }

  public saveReqCondition(event) {
    this.jsonCondition = JSON.parse(JSON.stringify(event.condition));
    this.isTransactionCondVisible = false;
    this.showRuleConditionList[this.selectedTransactionType] = 'abc';
    const result = this.jsonTransactions.find(
      item =>
        item.messageIntentifier === this.selectedTransactionType &&
        item.contractIntentifier === this.apiName.apiName,
    );
    if (result) {
      result.condition = this.jsonCondition;
    }
    this.transformTab = this.transformTab.map(item => {
      item.messageType = this.selectedTransactionType;
      return item;
    });
  }

  public BackFn() {
    this.requestCon = true;
  }

  /////imf code
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

  public preActionGetImfFn(event, flag) {
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
    this.postActionArray[this.selectedTransactionType][a].showError = false;
    if (this.postActionArray[this.selectedTransactionType][a].IPCvalue != null) {
      this.isSaveDraft = false;
    }
  }
  public setIpcData(event, a) {
    if (event != null) {
      this.postActionArray[this.selectedTransactionType][a].showError = false;
      if (this.postActionArray[this.selectedTransactionType][a].executeModel != null) {
        this.isSaveDraft = false;
      }
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

  public addPreParam(event) {
    this.showPreActionParam = false;
    this.preActionArray[this.selectedTransactionType][event.index].parameter = event.param;
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

  savePreAction() {
    const flag = this.validatePreAction();
    if (flag) {
      this.stringifyObj();
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

  public removePreAction(index) {
    this.preActionArray[this.selectedTransactionType].splice(index, 1);
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

  private getPreActionData() {
    this._store
      .pipe(takeUntil(this.componentDestroyed), select(SelectPreActionMethod))
      .subscribe((ExecuteRes: any) => {
        if (ExecuteRes && ExecuteRes.data) {
          this.preExecuteData = ExecuteRes.data;
          this.jsonTransactions.forEach(transactions => {
            if (
              transactions.messageIntentifier === this.selectedTransactionType &&
              transactions.contractIntentifier === this.apiName.apiName
            ) {
              this.preActionArray[transactions.messageIntentifier] = [];
              if (transactions.response.preActions) {
                transactions.response.preActions.forEach(element => {
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
    transactions.response.preActions = [];
    if (this.preActionArray[transactions.messageIntentifier]) {
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
              type: 'AdapterPreActions',
              execute: element.executeModel.actionName,
              parameters: parameter,
            };
            if (element.IPCvalue) {
              postObject['ipc'] = element.IPCvalue;
            }
            if (element.preAction === 'Conditional' && element.conditionObj) {
              postObject['condition'] = element.conditionObj;
            }
            transactions.response.preActions.push(JSON.parse(JSON.stringify(postObject)));
          }
        }
      });
    }
    return transactions.response.preActions;
  }
}
