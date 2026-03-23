import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Subject } from 'rxjs';
import { takeUntil, takeWhile } from 'rxjs/operators';
import {
  DraftTransform,
  GetAdapterDataMap,
  GetPaymentMethod,
  GetPostActionMethod,
  GetMessageContextList,
} from '../../../store/actions/l1-adapter.action';
import { L1AdapterService } from '../../../services/l1-adapter.service';
import { AdapterCommonService } from '../../../services/adapter-common.service';
import {
  selectAdapterDataMap,
  SelectPaymentMethod,
  SelectPostActionMethod,
  SelectMessageContextList,
} from '../../../store/selectors/l1-adapter.selectors';
import { GetIMF, GetIPC, GetServiceType } from '@app/store/actions/scheme-imf-mapper.action';
import { selectGetServiceType, selectIMF, selectIPC } from '@app/store/selectors/scheme-imf-mapper.selectors';
import { IAppState } from '../../../store/state/app.state';
import { CookieService } from 'ngx-cookie-service';
import { AlertService } from '@app/services/alert.service';
@Component({
  selector: 'app-transform-soap',
  styleUrls: ['../l1-adapters.component.scss'],
  templateUrl: './transform-soap.component.html',
})
export class TransformSOAPComponent implements OnInit {
  @Input() public adapterData: any;
  @Input() public template: any;
  @Input() public format: any;
  @Input() public name: any;
  @Input() readOnlyFlag = false;
  @Input() public checkSingleProperties:boolean;
  public paymentList = [];
  public reqMap = [];
  public resMap = [];
  public selectedPaymentMethod = [];
  public fileInfos = [];
  public fileExtnsion;
  public showLoader = false;
  public transactionList = [];
  public selectedTabIndex = 0;
  public transformTab = ['Request & Response', 'Post Action'];
  public postActionArray = [];
  public executeData = [];
  public ipcList;
  public imfList;
  public contextImf;
  public jsonData;
  public valueSelectionList = ['List', 'Text'];
  public selectedTransaction = '';
  public soapReqMapping = {
    transactions: [{ mappings: [], postActions: [], type: 'fields', name: 'Mapping1' }],
    type: 'transactions',
  };
  public soapResMapping = {
    transactions: [{ mappings: [], type: 'fields', name: 'Mapping1' }],
    type: 'transactions',
  };
  soapTransactions: any = [];
  // tslint:disable-next-line: ban-types
  @Output() public tabValue: EventEmitter<Object> = new EventEmitter<Object>();
  private componentDestroyed = new Subject();
  // tslint:disable-next-line: variable-name
  public adapterDataMap;
  public serviceList;
  public showPostActionParam = false;
  public selectedPostActionParameter;
  public showCancelBtn = false;
  public authData = [];
  constructor(
    private _store: Store<IAppState>,
    public _alertSerivce: AlertService,
    public _l1AdapterService: L1AdapterService,
    private _cookieService: CookieService,
    public _adapterCommonService: AdapterCommonService,
  ) {
    this._store.dispatch(new GetPaymentMethod());
    this._store.dispatch(new GetServiceType());
    this._store.pipe(select(SelectPaymentMethod)).subscribe((response: any) => {
      if (response && response.data) {
        this.paymentList = response.data;
      }
    });
    this._store.dispatch(new GetPostActionMethod());
    this._store
      .pipe(takeUntil(this.componentDestroyed), select(SelectPostActionMethod))
      .subscribe((response: any) => {
        if (response && response.data) {
          this.executeData = response.data;
          this.updatePostActionArray();
        }
      });
    this._store
      .pipe(takeUntil(this.componentDestroyed), select(selectIMF))
      .subscribe((response: any) => {
        if (response) {
          this.imfList = response.ImfField;
        }
      });
    this._store.dispatch(new GetIPC());
    this._store
      .pipe(takeUntil(this.componentDestroyed), select(selectIPC))
      .subscribe((response: any) => {
        if (response) {
          this.ipcList = response;
        }
      });
    this._store.pipe(select(SelectMessageContextList)).subscribe((response: any) => {
      if (response && response.data) {
        this.jsonData = response.data.messageContextFieldsByVersion;
        this.contextImf = this.transformLogic(
          response.data.messageContextFieldsByVersion.attributes,
        );
      }
    });
    this._store.pipe(select(selectGetServiceType)).subscribe((response: any) => {
      if (response) {
        this.serviceList = response;
      }
    });
    this._store.dispatch(new GetAdapterDataMap());
    this._store
      .pipe(takeUntil(this.componentDestroyed), select(selectAdapterDataMap))
      .subscribe((response: any) => {
        if (
          response &&
          response.data &&
          response.data.AdapterdataMap &&
          response.data.AdapterdataMap['custom.jar.files.id']
        ) {
          const map = response.data.AdapterdataMap['custom.jar.files.id'];
          this.adapterDataMap = JSON.parse(map);
          this.adapterDataMap &&
            this.adapterDataMap.listvalues &&
            this.adapterDataMap.listvalues.forEach((element, i) => {
              if (i === 0) {
                this.fileExtnsion = element;
              } else {
                this.fileExtnsion = this.fileExtnsion + ',' + element;
              }
            });
        }
      });
  }

  // tslint:disable-next-line: no-empty
  public ngOnInit() {
    this.adapterData.networkData.properties.network.forEach(x => {
      if ((x.field === 'custom.jar.files.id' || x.field === 'network--custom.jar.files.id') && x.datatype === 'file') {
        x.listvalues.forEach((element, i) => {
          if (i === 0) {
            this.fileExtnsion = element;
          } else {
            this.fileExtnsion = this.fileExtnsion + ',' + element;
          }
        });
        if (x.value === 'BLANK') {
          x.value = '';
        }
        if (x.value) {
          if (typeof x.value === 'string' && x.value.indexOf('|') !== -1) {
            const id = x.value.split('|');
            if (x.fileName) {
              if (x.fileName.indexOf('|') !== -1) {
                const name = x.fileName.split('|');
                id.forEach((ids, i) => {
                  this.fileInfos.push({ id: ids, name: name[i] });
                });
              }
            }
          } else {
            this.fileInfos.push({ id: x.value, name: x.fileName });
          }
        }
      }
    });
    this.soapTransactions = JSON.parse(
      JSON.stringify(this.adapterData.transformData.requestMapping),
    );
    this.soapTransactions = this.soapTransactions?.transactions || [];
    this.soapTransactions.forEach(transaction => {
      this.transactionList.push({ name: transaction.messageIntentifier });
      transaction.request.mappings.forEach(mapping => {
        if (mapping.type === 'custom_mapper') {
          this.reqMap[transaction.messageIntentifier] = mapping.className;
        } else {
          this.selectedPaymentMethod[transaction.messageIntentifier] = mapping.source;
        }
      });
    });
    if (this.transactionList.length === 0) {
      this.transactionList.push({ name: 'Mapping1' });
      this.selectedTransaction = this.transactionList[0].name;
      this.soapRequestResponse();
    } else {
      this.selectedTransaction = this.transactionList[0].name;
    }
    this.soapTransactions.forEach(transaction => {
      transaction.response.mappings.forEach(mapping => {
        if (mapping.type === 'custom_mapper') {
          this.resMap[transaction.messageIntentifier] = mapping.className;
        }
      });
    });
    this._store.dispatch(new GetIMF(this.adapterData.imfId.id));
    this._store.dispatch(
      new GetMessageContextList(this.adapterData.imfId.id),
    );
  }

  updatePostActionArray() {
    this.adapterData.transformData.requestMapping &&
      this.soapTransactions.forEach(element => {
       // if (element.messageIntentifier === this.selectedTransaction) {
          this.getPostActionData(element);
        //}
      });
    if (!this.postActionArray[this.selectedTransaction]) {
      this.postActionArray[this.selectedTransaction] = [];
    }
  }

  public draftTransform() {
    let flag = true;
    if (
      this.postActionArray[this.selectedTransaction] &&
      this.postActionArray[this.selectedTransaction].length > 0
    ) {
      this.postActionArray[this.selectedTransaction].forEach(element => {
        if (!element.executeModel) {
          element.showError = true;
          flag = false;
        } else if (!element.IPCvalue) {
          element.showError = true;
          flag = false;
        } else {
          element.showError = false;
        }
      });
    }
    if (flag) {
      this.SaveData();
      this._store.dispatch(new DraftTransform(this.adapterData));
    }
  }

  savePostAction() {
    let flag = true;
    if (
      this.postActionArray[this.selectedTransaction] &&
      this.postActionArray[this.selectedTransaction].length > 0
    ) {
      this.postActionArray[this.selectedTransaction].forEach(element => {
        if (!element.executeModel) {
          element.showError = true;
          this._alertSerivce.responseMessage({ message: 'Please provide all mandatory field in post action', status: 'failure' })
          flag = false;
        } else if (!element.IPCvalue) {
          this._alertSerivce.responseMessage({ message: 'Please provide all mandatory field in post action', status: 'failure' })
          element.showError = true;
          flag = false;
        } else {
          element.showError = false;
        }
      });
    }
    this.SaveData()
  }

  public tabChangeValue() {
    let flag = true;
    if (
      this.postActionArray[this.selectedTransaction] &&
      this.postActionArray[this.selectedTransaction].length > 0
    ) {
      this.postActionArray[this.selectedTransaction].forEach(element => {
        if (!element.executeModel) {
          element.showError = true;
          flag = false;
        } else if (!element.IPCvalue) {
          element.showError = true;
          flag = false;
        } else {
          element.showError = false;
        }
      });
    }
    if (flag) {
      this.SaveData();
      this.tabValue.emit(3);
    }
  }

  public prevTabValue() {
    this.tabValue.emit(1);
  }

  public soapRequestResponse() {
    const output = this.soapTransactions.find(
      item => item.messageIntentifier === this.selectedTransaction,
    );
    if (!output) {
      this.soapTransactions.push({
        messageIntentifier: this.selectedTransaction,
        contractIntentifier: null,
        condition: null,
        request: {
          mappings: [],
          type: 'adapter_request',
          postActions: [],
        },
        response: {
          type: 'adapter_response',
          mappings: [],
        },
      });
    }
  }

  private SaveData() {
    this.adapterData.transformData.persistRequired = 1;
    this.soapTransactions.forEach(transact => {
      transact.request.mappings = [];
      transact.request.postActions = [];
      if (this.selectedPaymentMethod[transact.messageIntentifier] && this.reqMap[transact.messageIntentifier]) {
        transact.request.mappings.push({
          destination: ['payment_method'],
          ipc: 'SYSTEM_ERROR',
          source: this.selectedPaymentMethod[transact.messageIntentifier],
          type: 'field',
        });
        transact.request.mappings.push({
          className: this.reqMap[transact.messageIntentifier],
          ipc: 'SYSTEM_ERROR',
          type: 'custom_mapper',
        });
      }
      transact.request.postActions =
        this.postActionArray[transact.messageIntentifier] && this.postActionArray[transact.messageIntentifier].length > 0
          ? this.getPostAction(transact)
          : transact.request.postActions;
    });
    this.soapTransactions.forEach(transact => {
      transact.response.mappings = [];
      if (this.selectedPaymentMethod[transact.messageIntentifier] && this.resMap[transact.messageIntentifier]) {
        transact.response.mappings.push({
          destination: ['payment_method'],
          ipc: 'SYSTEM_ERROR',
          source: this.selectedPaymentMethod[transact.messageIntentifier],
          type: 'field',
        });
        transact.response.mappings.push({
          className: this.resMap[transact.messageIntentifier],
          ipc: 'SYSTEM_ERROR',
          type: 'custom_mapper',
        });
      }
    });
    this.soapTransactions.map(transactions => {
      transactions.request.mappings = transactions.request.mappings.filter(el => el && el !== null);
      return transactions;
    });
    this.soapTransactions.map(transactions => {
      transactions.response.mappings = transactions.response.mappings.filter(
        el => el && el !== null,
      );
      return transactions;
    });

    this.adapterData.transformData.requestMapping = {};
    this.adapterData.transformData.requestMapping.transactions = this.soapTransactions;
    let output = this._adapterCommonService.addFileAndValue(this.adapterDataMap, this.fileInfos);
    this.adapterData.networkData.properties.network =
      this._adapterCommonService.addAndRemoveJarFile(
        this.adapterData.networkData.properties.network,
        output,
      );
  }

  public uploadFile(event) {
    this.showLoader = true;
    const formData = new FormData();
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (e: any) => {
        formData.set('uplodedFile', file);
        formData.set('allowed-file-type', this.fileExtnsion);
        this._l1AdapterService.upload(formData).subscribe(item => {
          this.showLoader = false;
          if (item && item.status !== 'failure') {
            this.fileInfos.push({ id: item.data.id, name: item.data.name });
          }
        });
      };
    }
  }

  public removeFile(index) {
    this.fileInfos.splice(index, 1);
  }

  public tabChange(tab) {
    if (tab.indexOf('Post Action') !== -1) {
      this.selectedTabIndex = 1;
      this.updatePostActionArray();
    }
  }

  public addPostAction() {
    this.postActionArray[this.selectedTransaction].push({
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
    this.postActionArray[this.selectedTransaction].splice(index, 1);
  }

  public executeFn(data, item) {
    item.listParam = [];
    item.param = [];
    item.mapParam = [];
    data.parameters.forEach((element, index) => {
      const dataList = [];
      const serviceList = [];
      if (element.possibleValue && element.possibleValue.length > 0) {
        element.possibleValue.forEach(pValue => {
          dataList.push({ id: pValue, name: pValue });
        });
      } else if (element.name.indexOf('imf') !== -1) {
        this.imfList.forEach(iValue => {
          dataList.push({ id: iValue.name, name: iValue.alias });
        });
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
  public addTransaction() {
    // const id = this.transactionList.length + 1;
    // this.transactionList.push({ name: 'Mapping' + id });
    // this.selectedTransaction = this.transactionList[this.transactionList.length - 1].name;
    const data = this.transactionList.find(x => x.name === this.selectedTransaction);
    if (!data) {
      this.transactionList.push({ name: this.selectedTransaction })
    }
    this.soapRequestResponse();
  }

  public deleteTransaction(value) {
    this.soapTransactions = this.soapTransactions.filter(
      x => x.messageIntentifier !== value,
    );
    this.transactionList = this.transactionList.filter(x => x.name !== value);
    if (this.selectedTransaction === value) {
      this.selectedTransaction = this.transactionList[this.transactionList.length - 1].name;
    }
    this._alertSerivce.responseMessage({
      message: 'Message type deleted successfully',
      status: 'success',
    });
  }

  private getPostActionData(data) {
    this.postActionArray[data.messageIntentifier] = [];
    data.request.postActions = data.request.postActions || []
    data.request.postActions.forEach(element => {
      const executeModel1 = this.executeData.find(x => x && x.actionName === element.execute);
      const param1 = [];
      const listParam1 = [];
      let mapParam1 = [];
      this.postActionArray[data.messageIntentifier].push({
        executeModel: executeModel1,
        // tslint:disable-next-line: object-literal-sort-keys
        IPCvalue: element.ipc,
        postAction: element.condition ? 'Conditional' : 'Optional',
        param: param1,
        listParam: listParam1,
        mapParam: mapParam1,
        conditionObj: element.condition,
        parameter: element.parameters,
      });
    });
  }

  private paramMapFn(item, element, serviceList, flag = false, parametersIndex) {
    const dataList = [];
    const dataList2 = [];
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
      } else {
        element.possibleValue[1].forEach(possibleValue => {
          dataList2.push({ id: possibleValue, name: possibleValue });
        });
      }
    }
    if (!item.mapParam[parametersIndex]) {
      item.mapParam[parametersIndex] = [];
    }
    item.mapParam[parametersIndex].push({
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
        name: element.displayName,
        label: element.name,
        value: null,
      });
    }
  }


  private getPostAction(transactions) {
    transactions.request.postActions = [];
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
    return transactions.request.postActions;
  }

  private transformLogic(data) {
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
        item.children = this.transformLogic(item.attributes);
      }
      return item;
    });
  }

  public radioChange(item) {
    item.isVisiblecon = true;
  }
  public getRule(data) {
    this.postActionArray[this.selectedTransaction][data.id].conditionObj = data.condition;
    this.postActionArray[this.selectedTransaction][data.id].isVisiblecon = false;
    console.log(data.condition);
  }
  public conCancel(item) {
    item.isVisiblecon = false;
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
  /////imf code
  public getImfFn(event, flag) {
    if (flag === 'paramIMF') {
      const id = event.id.split(',');
      this.postActionArray[this.selectedTransaction][id[0]].param[id[1]].value = JSON.parse(
        JSON.stringify(event.value),
      );
    } else if (flag === 'listIMF') {
      const id = event.id.split(',');
      this.postActionArray[this.selectedTransaction][id[0]].listParam[id[1]][id[2]].value =
        JSON.parse(JSON.stringify(event.value));
    } else if (flag === 'map1IMF') {
      const id = event.id.split(',');
      this.postActionArray[this.selectedTransaction][id[0]].mapParam[id[1]][id[2]].value =
        JSON.parse(JSON.stringify(event.value));
    } else if (flag === 'map2IMF') {
      const id = event.id.split(',');
      this.postActionArray[this.selectedTransaction][id[0]].mapParam[id[1]][id[2]].value2 =
        JSON.parse(JSON.stringify(event.value));
    }
  }

  //// new post action code
  public stepFunction(data, a, i, flag = false) {
    if (flag) {
      this.postActionArray[this.selectedTransaction][a].parameter = [];
    }
    if (data.parameters && data.parameters.length > 0) {
      this.showPostActionParam = true;
      this.selectedPostActionParameter = {
        data: data,
        index: a,
        index2: i,
        stepParam: this.postActionArray[this.selectedTransaction][a].parameter,
      };
    }
  }
  public closeParamPopup(a) {
    if (
      !this.postActionArray[this.selectedTransaction][a].parameter ||
      this.postActionArray[this.selectedTransaction][a].parameter.length === 0
    ) {
      this.postActionArray[this.selectedTransaction][a].executeModel = null;
      this.postActionArray[this.selectedTransaction][a].parameter = [];
    }
    this.showPostActionParam = false;
  }
  public addParam(event) {
    this.showPostActionParam = false;
    this.postActionArray[this.selectedTransaction][event.index].parameter = event.param;
    console.log(event);
  }
}
