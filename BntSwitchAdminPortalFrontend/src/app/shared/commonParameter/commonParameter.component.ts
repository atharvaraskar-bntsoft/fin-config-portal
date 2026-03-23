import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import * as _ from 'underscore';

@Component({
  selector: 'app-common-parameter',
  templateUrl: './commonParameter.component.html',
  styleUrls: ['./commonParameter.component.scss'],
})
export class CommonParameterComponent implements OnInit {
  public otherParam = [];
  public listParam = [];
  public mapParam = [];
  public imfToolTip;
  @Input() selectedStepParameter;
  public StepParameter = [];
  @Input() imfList;
  @Input() serviceList = [];
  @Input() sourceList;
  @Input() ipcList;
  @Input() readOnlyFlag = false;
  @Input() showCancelBtn = true;
  public imfListNew;
  @Output() public isVisible = new EventEmitter<object>();
  @Output() public parameter = new EventEmitter<Object>();
  public actionName;
  public paramError = false;
  public typeList = [
    { name: 'Request', value: 'request' },
    { name: 'Response', value: 'response' },
  ];

  constructor() { }

  public ngOnInit() {
    if (this.selectedStepParameter && this.selectedStepParameter.data.parameters) {
      this.StepParameter = this.selectedStepParameter.data.parameters;
      this.actionName = this.selectedStepParameter.data.actionName;
    }
    this.imfListNew = this.transformLogicNew(this.imfList.attributes);
    this.ipcList.map(item => {
      item.name = item.value;
      return item;
    });
    this.sourceList.map(item => {
      item.value = item.id;
      return item;
    });
    if (this.StepParameter && this.StepParameter.length > 0) {
      this.StepParameter.forEach((element, index) => {
        if (element.dataType.toLowerCase() === 'map') {
          this.mapFunction(element, index);
        } else if (element.dataType.toLowerCase() === 'list') {
          this.listFunction(element, index);
        } else {
          this.otherParamFn(element, index);
        }
      });
    }
  }

  checkNameHavingSourceKeyword(param) {
    return (param.name && (typeof param.name == 'string')) ? param.name.includes('source_') : false; // true
  }

  checkValueHavingDollar(value) {
    return (value && (typeof value == 'string')) ? value.includes('${') : value;
  }

  checkValueHavingDollarString(value) {
    return (value && (typeof value == 'string')) ? value.includes('${') : false;
  }

  public addParam(flag, data, idx) {
    if (flag === 'list') {
      this.listParam[idx].push({
        type: data.type,
        list: data.list,
        name: data.name,
        type1: data.type1,
        order: data.order,
      });
    } else {
      if (
        this.actionName === 'ENRICH_ORIGINAL_TRANSACTION' ||
        this.actionName === 'UPDATE_ORIGINAL'
      ) {
        this.mapParam[idx].push({
          type: data.type,
          list: data.list,
          list2: data.list2,
          name: data.name,
          name2: data.name2,
          type1: data.type1,
          type2: data.type2,
          order: data.order,
          type1service: data.type1service,
          type1type: data.type1type,
          type2service: data.type2service,
          type2ype: data.type2ype,
          type2useCase: data.type2useCase,
          type1useCase: data.type1useCase,
        });
      } else {
        this.mapParam[idx].push({
          type: data.type,
          list: data.list,
          list2: data.list2,
          name: data.name,
          name2: data.name2,
          type1: data.type1,
          type2: data.type2,
          order: data.order,
        });
      }
    }
  }

  public removeParam(flag, idx, index) {
    if (flag === 'list') {
      this.listParam[idx].splice(index, 1);;
    } else {
      this.mapParam[idx].splice(index, 1);;
    }
  }

  public add() {
    const parameters = [];
    this.paramError = false;
    this.StepParameter.forEach((element, id) => {
      const listParameter = [];
      const mapParameter = {};
      this.listParam[id] &&
        this.listParam[id].forEach(param => {
          if (param && (param.value || param.value == 0)) {
            if (param.type === 'Integer') {
              param.value = parseInt(param.value);
            }
            if (!param.checked && this.checkNameHavingSourceKeyword(param)) {
              listParameter.push('${' + param.value + '}');
            } else {
              listParameter.push(param.value);
            }
          } else {
            this.paramError = false;
            param.value = null;
            if (!param.checked && this.checkNameHavingSourceKeyword(param)) {
              listParameter.push('${' + param.value + '}');
            } else {
              listParameter.push(param.value);
            }
          }
        });
      this.mapParam[id] &&
        this.mapParam[id].forEach(param => {
          if (param && (param.value || param.value == 0) && ((param.value2 || param.value2 == 0) || param.value3)) {
            let value1 = param.value;
            let value2 = param.value2;
            // replace dynamic value
            if (
              this.actionName === 'ENRICH_ORIGINAL_TRANSACTION' ||
              this.actionName === 'UPDATE_ORIGINAL'
            ) {
              if (param.type1useCase == 1) {
                value1 = '${' + param.value + '}';
              } else if (param.type1useCase == 2) {
                value1 = '${message_exchange[' + param.type1service + '].' + param.value + '}';
              } else {
                value1 =
                  '${message_exchange[' +
                  param.type1service +
                  '].' +
                  param.type1type +
                  '_message[' +
                  param.value +
                  ']}';
              }
              if (param.value3) {
                value2 = param.value3;
              } else {
                this.paramError = true;
              }
            }
            mapParameter[value1] = value2;
          } else {
            this.paramError = true;
          }
        });
      this.otherParam[id] &&
        this.otherParam[id].forEach(param => {
          if (param && (param.value || param.value == 0)) {
            if (param.type === 'Integer') {
              param.value = parseInt(param.value);
            }
            //parameters.push(param.value);
            if (!param.checked && this.checkNameHavingSourceKeyword(param)) {
              parameters.push('${' + param.value + '}');
            } else {
              parameters.push(param.value);
            }
          } else {
            this.paramError = false;
            param.value = null;
            if (!param.checked && this.checkNameHavingSourceKeyword(param)) {
              parameters.push('${' + param.value + '}');
            } else {
              parameters.push(param.value);
            }
          }
        });
      if (listParameter.length > 0) {
        parameters.push(listParameter);
      }
      if (!_.isEmpty(mapParameter) && this.mapParam[id] && this.mapParam[id].length > 0) {
        parameters.push(mapParameter);
      }
    });
    if (
      this.selectedStepParameter.data.actionName === 'MID_MID_MAPPING' ||
      this.selectedStepParameter.data.actionName === 'TID_TID_MAPPING' ||
      this.selectedStepParameter.data.actionName === 'LID_LID_MAPPING' ||
      this.selectedStepParameter.data.actionName === 'AID_AID_MAPPING'
    ) {
      this.paramError = false;
    }
    if (!this.paramError) {
      this.parameter.emit({
        param: parameters,
        index2: this.selectedStepParameter.index2,
        index: this.selectedStepParameter.index,
        data: this.selectedStepParameter.data,
      });
    }
  }

  public cancel() {
    this.isVisible.emit({
      param: this.selectedStepParameter.stepParam,
      index2: this.selectedStepParameter.index2,
      index: this.selectedStepParameter.index,
      data: this.selectedStepParameter.data,
    });
  }

  private mapFunction(element, index) {
    let name = element.name.split(':');
    let List1 = [];
    let List2 = [];
    let type1;
    let type2;
    if (Array.isArray(element.possibleValue)) {
      if (element.possibleValue[0] && element.possibleValue[0].length > 0) {
        element.possibleValue[0].forEach(element => {
          List1.push({ value: element, name: element });
        });
        type1 = 'other';
      }
      if (element.possibleValue[1] && element.possibleValue[1].length > 0) {
        element.possibleValue[1].forEach(element => {
          List2.push({ value: element, name: element });
        });
        type2 = 'other';
      }
    }
    if (List1.length === 0) {
      if (name[0].indexOf('imf') !== -1) {
        type1 = 'imf';
        List1 = this.imfList;
      } else if (name[0].indexOf('ipc') !== -1) {
        type1 = 'other';
        List1 = this.ipcList;
      } else if (name[0].indexOf('source') !== -1) {
        type1 = 'other';
        List1 = this.sourceList;
      } else {
        type1 = 'text';
      }
    }
    if (List2.length === 0) {
      if (name[1].indexOf('imf') !== -1) {
        type2 = 'imf';
        List2 = this.imfList;
      } else if (name[1].indexOf('ipc') !== -1) {
        type2 = 'other';
        List2 = this.ipcList;
      } else if (name[1].indexOf('source') !== -1) {
        type2 = 'other';
        List2 = this.sourceList;
      } else {
        type2 = 'text';
      }
    }
    if (!this.mapParam[index]) {
      this.mapParam[index] = [];
    }
    if (this.selectedStepParameter.stepParam && this.selectedStepParameter.stepParam[index]) {
      const mapArray = Object.keys(this.selectedStepParameter.stepParam[index]);
      mapArray &&
        mapArray.forEach((item, idxz) => {
          const payload = {
            type: element.dataType,
            list: List1,
            list2: List2,
            name: element.displayName.split(':')[0],
            name2: element.displayName.split(':')[1],
            type1: type1,
            type2: type2,
            type1service: null,
            type1type: null,
            type2service: null,
            type2type: null,
            type2useCase: null,
            type1useCase: null,
            value: null,
            value2: null,
            value3: null,
          };
          let value2 = this.selectedStepParameter.stepParam[index][mapArray[idxz]];
          if (
            this.actionName === 'ENRICH_ORIGINAL_TRANSACTION' ||
            this.actionName === 'UPDATE_ORIGINAL'
          ) {
            payload.value3 = value2;
            if (item.indexOf('_message[') === -1) {
              if (item.indexOf(']') === -1) {
                payload.value = item.split('{')[1].split('}')[0];
                payload.type1useCase = 1;
              } else {
                payload.value = item.split('].')[1].split('}')[0];
                payload.type1service = item.split('message_exchange[')[1].split('].')[0];
                payload.type1useCase = 2;
              }
            } else {
              payload.type1useCase = 3;
              payload.type1service = item.split('message_exchange[')[1].split('].')[0];
              payload.value = item.split('message[')[1].split(']')[0];
            }
            if (item.indexOf('request_message') !== -1) {
              payload.type1type = 'request';
            } else {
              payload.type1type = 'response';
            }
            if (value2.indexOf('_message[') === -1) {
              if (value2.indexOf(']') === -1) {
                if (value2.indexOf('{') !== -1) {
                  payload.value2 = value2.split('{')[1].split('}')[0];
                  payload.type2useCase = 1;
                } else {
                  payload.value2 = null;
                }

              } else {
                payload.value2 = value2.split('].')[1].split('}')[0];
                payload.type2useCase = 2;
                payload.type2service = value2.split('message_exchange[')[1].split('].')[0];
              }
            } else {
              payload.value2 = value2.split('message[')[1].split(']')[0];
              payload.type2service = value2.split('message_exchange[')[1].split('].')[0];
              payload.type2useCase = 3;
            }
            if (value2.indexOf('request_message') !== -1) {
              payload.type2type = 'request';
            } else {
              payload.type2type = 'response';
            }
            this.mapParam[index].push(payload);
          } else {
            this.mapParam[index].push({
              type: element.dataType,
              list: List1,
              list2: List2,
              name: element.displayName.split(':')[0],
              name2: element.displayName.split(':')[1],
              type1: type1,
              type2: type2,
              value: item,
              value2: value2
            });
          }
        });
    }
    if (this.mapParam[index].length === 0) {
      if (
        this.actionName === 'ENRICH_ORIGINAL_TRANSACTION' ||
        this.actionName === 'UPDATE_ORIGINAL'
      ) {
        this.mapParam[index].push({
          type: element.dataType,
          list: List1,
          list2: List2,
          name: element.displayName.split(':')[0],
          name2: element.displayName.split(':')[1],
          type1: type1,
          type2: type2,
          type1service: null,
          type1type: null,
          type2service: null,
          type2ype: null,
          type2useCase: null,
          type1useCase: null,
        });
      } else {
        this.mapParam[index].push({
          type: element.dataType,
          list: List1,
          list2: List2,
          name: element.displayName.split(':')[0],
          name2: element.displayName.split(':')[1],
          type1: type1,
          type2: type2,
        });
      }
    }
  }

  private listFunction(element, index) {
    let name = element.name;
    let List1 = [];
    let type1;
    if (Array.isArray(element.possibleValue)) {
      if (element.possibleValue.length > 0) {
        element.possibleValue.forEach(element => {
          List1.push({ value: element, name: element });
        });
        type1 = 'other';
      }
    }
    if (List1.length === 0) {
      if (name.indexOf('imf') !== -1) {
        type1 = 'imf';
        List1 = this.imfList;
      } else if (name.indexOf('ipc') !== -1) {
        type1 = 'other';
        List1 = this.ipcList;
      } else if (name.indexOf('source') !== -1) {
        type1 = 'other';
        List1 = this.sourceList;
      } else {
        type1 = 'text';
      }
    }
    if (!this.listParam[index]) {
      this.listParam[index] = [];
    }
    if (this.selectedStepParameter.stepParam && this.selectedStepParameter.stepParam[index]) {
      this.selectedStepParameter.stepParam[index].forEach(item => {
        let checked = this.checkValueHavingDollar(item)
        this.listParam[index].push({
          type: element.dataType,
          list: List1,
          name: element.displayName,
          type1: type1,
          value: this.removeString(item, element),
          checked: !checked
        });
      });
    }
    if (this.listParam[index].length === 0) {
      this.listParam[index].push({
        type: element.dataType,
        list: List1,
        name: element.displayName,
        type1: type1,
        checked: true
      });
    }
  }

  removeString(value, element) {
    if (this.checkNameHavingSourceKeyword(element)) {
      return (value && (typeof value == 'string')) ? value.replace('${', '').replace('}', '') : value
    } else {
      return value
    }
  }

  private otherParamFn(element, index) {
    let name = element.name;
    let List1 = [];
    let type1;
    if (Array.isArray(element.possibleValue)) {
      if (element.possibleValue.length > 0) {
        element.possibleValue.forEach(element => {
          List1.push({ value: element, name: element });
        });
        type1 = 'other';
      }
    }
    if (List1.length === 0) {
      if (name.indexOf('imf') !== -1) {
        type1 = 'imf';
        List1 = this.imfList;
      } else if (name.indexOf('ipc') !== -1) {
        type1 = 'other';
        List1 = this.ipcList;
      } else if (name.indexOf('source') !== -1) {
        type1 = 'other';
        List1 = this.sourceList;
      } else {
        type1 = 'text';
      }
    }
    if (!this.otherParam[index]) {
      this.otherParam[index] = [];
    }
    let val;
    if (
      this.selectedStepParameter.stepParam &&
      (this.selectedStepParameter.stepParam[index] ||
        this.selectedStepParameter.stepParam[index] == 0)
    ) {
      val = this.selectedStepParameter.stepParam[index];
    }
    let checked = this.checkValueHavingDollar(val)
    this.otherParam[index].push({
      type: element.dataType,
      list: List1,
      name: element.displayName,
      type1: type1,
      value: this.removeString(val, element),
      checked: !checked
    });
  }

  private transformLogicNew(data) {
    data = JSON.parse(JSON.stringify(data));
    return data.map(item => {
      if (!item.attributes) {
        item.title = item.alias;
        item.key = this.nameLogic(item);
        item.isLeaf = true;
      } else {
        item.title = item.alias;
        if (item.useCase != '3') {
          item.key = item.name;
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

  selectType1ImfFn(event, item) {
    item.type1useCase = event.split('%')[1];
    item.value = event.split('%')[0];
  }

  selectType2ImfFn(event, item) {
    if (event) {
      item.value3 = null;
      item.type2type = null;
      item.type2service = null;
      item.type2useCase = event.split('%')[1];
      item.value2 = event.split('%')[0];
      if (item.type2useCase == 1) {
        item.value3 = '${' + item.value2 + '}';
      }
    } else {
      item.type2useCase = null;
      item.value3 = null;
      item.type2type = null;
      item.type2service = null;
    }
  }

  changeService(event, item) {
    item.value3 = null;
    item.type2type = null;
    if (event && item.type2useCase == 2) {
      item.value3 = '${message_exchange[' + event.value + '].' + item.value2 + '}';
    }
  }

  changeTypes(event, item) {
    if (event) {
      item.value3 =
        '${message_exchange[' +
        item.type2service +
        '].' +
        event.value +
        '_message[' +
        item.value2 +
        ']}';
    }
  }

  changeInputs(event, item) {
    if (event.target.value.length && (event.code == "Backspace" || event.code == "Delete")) {
      item.type2useCase = null;
      item.value2 = null;
      item.type2type = null;
      item.type2service = null;
    }
  }

  private nameLogic(item) {
    let name;
    if (item.useCase == 1) {
      name = '${' + item.nestedName + '}';
    } else if (item.useCase == 2) {
      name = '${message_exchange[GATEWAY_SERVICE].' + item.nestedName + '}';
    } else {
      name = '${message_exchange[GATEWAY_SERVICE].request_message[' + item.nestedName + ']}';
    }
    return name;
  }
}
