import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { UntypedFormControl } from '@angular/forms';
import { SubscribeService } from '@app/services/subscribe.services';

@Component({
  selector: 'l3-extract-data-request',
  templateUrl: './request.component.html',
  styleUrls: ['./request.component.scss'],
})
export class L3ExtractDataRequestComponent implements OnInit {
  @Input() jsonData: any;
  @Input() serviceList: any;
  @Input() showAddParamPopup;
  @Input() sourceList;
  @Input() public imfId: any;
  @Input() lookupList;
  @Input() stepList;
  @Input() imfList;
  @Input() ipcList;
  @Input() validationList;
  @Input() field;
  @Input() networkService;
  @Input() resRadioModel;
  @Input() reqConditionCheck;
  @Input() elData;
  @Input() adapterDataMap: any;
  @Input() resConditionalData;
  @Input() readOnlyFlag = false;
  @Input() transformItem;
  @Input() isMandatory;
  @Output() public showParamPopup = new EventEmitter<boolean>();
  @Output() public saveReqData = new EventEmitter<Object>();
  @Output() public oncancel = new EventEmitter<boolean>();
  public extractResValidation = [];
  public conditionError = false;
  public singleDestination = false;
  public resImfValue;
  public selectedService: any;
  public selectedType: any;
  public useCase;
  public rawDestination = false;
  public resBlockList: any = [];
  public blockList: any = [];
  public selectedStepParameter = {};
  public resCustomMapper;
  public ipcValue: any;
  public responseError = false;
  public typeList = [
    { name: 'Request', value: 'request' },
    { name: 'Response', value: 'response' },
  ];
  constructor(private subscribeService: SubscribeService) { }

  ngOnInit() {
    this.getEditData();
    if (this.jsonData) {
      this.jsonData = JSON.parse(JSON.stringify(this.jsonData))
    }
  }

  private getEditData() {
    this.resBlockList = [];
    if (this.transformItem && this.transformItem.selectedOption === 'operationField') {
      this.resRadioModel = this.transformItem.selectedOption;
      this.reqConditionCheck = this.transformItem.selectedCondition;
      this.ipcValue = this.transformItem.ipc;
      this.singleDestination = this.transformItem.destination.length === 1 ? true : false;
      this.rawDestination = this.transformItem.destination.length === 1 ? true : false;
      this.resImfValue = this.getResImfValue(this.transformItem.source);
      // tslint:disable-next-line: radix
      this.useCase = parseInt(this.transformItem.useCase);
      this.selectedService = this.getSelectedServiceFn(this.transformItem.source, this.useCase);
      this.selectedType = this.getType(this.transformItem.source);
      if (this.transformItem.functions && this.stepList) {
        this.getResFunction(this.transformItem.functions);
      }
      this.extractResValidation = [];
      if (this.transformItem.validationFunctions && this.validationList) {
        this.extractResValidation = this.getResValidationFunction(
          this.transformItem.validationFunctions,
        );
      }
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    //Called before any other lifecycle hook. Use it to inject dependencies, but avoid any serious work here.
    //Add '${implements OnChanges}' to the class.
    if (this.jsonData) {
      this.jsonData = JSON.parse(JSON.stringify(this.jsonData))
    }

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

  private getSelectedServiceFn(source, useCase) {
    let getService;
    if (this.serviceList) {
      let service = 'GATEWAY_SERVICE';
      if (useCase !== 1) {
        service = source.split('message_exchange[')[1].split('].')[0];
      }
      const data = this.serviceList.filter(x => x.value === service);
      if (data && data[0]) {
        getService = data[0];
      }
    }
    return getService;
  }

  private getType(source) {
    let type = 'response';
    if (source.indexOf('request_message') !== -1) {
      type = 'request';
    }
    return type;
  }

  private getResFunction(functionsData) {
    functionsData.forEach(item => {
      if (item.type === 'value_mapper') {
        this.resCustomMapper = {
          mapper: [],
          defaultValue: item.defaultValue,
          useSameOnMatchFail: this.stringToBoolean(item.useSameOnMatchFail),
        };
        const data = Object.keys(item.mapping);
        data.forEach((mapping, index) => {
          const formControl = new UntypedFormControl(data[index]);
          this.resCustomMapper.mapper.push({
            value1: item.mapping[data[index]],
            value2: data[index],
            formControl: formControl,
          });
        });
      } else {
        const data = this.stepList.find(
          x => x.actionName === item.execute || x.actionName === item.functionName,
        );
        if (data) {
          const key = {
            name: 'Step',
            value: data,
            dropDownClass: true,
            function: item,
          };
          this.resBlockList.push(JSON.parse(JSON.stringify(key)));
        }
      }
    });
  }

  private getResValidationFunction(validationFunctionsData) {
    const array = [];
    validationFunctionsData.forEach(validation => {
      if (
        validation.name !== 'IS_NOT_NULL' ||
        (validation.name === 'IS_NOT_NULL' && validation.parameters)
      ) {
        const data = this.validationList.filter(x => x.name === validation.name);
        const param = [];
        if (data && data[0]) {
          const parameter = data[0].parameters;
          let value = [];
          let operator;
          if (validation.expression) {
            value = validation.expression.split('(')[1].split(')')[0].split(',');
            if (parameter.operator) {
              operator = parameter.operator.filter(
                x => validation.expression.indexOf(x.label) !== -1,
              )[0];
            }
          }
          if (parameter) {
            parameter.signature.forEach((signature, index) => {
              if (signature.name.indexOf('source') !== -1) {
                param.push({
                  label: 'source',
                  list: this.sourceList,
                  name: signature.name,
                  value: validation.parameters[index],
                });
              } else if (signature.name.indexOf('imf') !== -1) {
                param.push({
                  label: 'imf',
                  name: signature.name,
                  value: validation.parameters[index],
                  list: this.imfList,
                });
              } else {
                if (value[index + 1]) {
                  param.push({
                    name: signature.name,
                    value: value[index + 1],
                  });
                } else {
                  param.push({
                    name: signature.name,
                    value: validation.parameters[index],
                  });
                }
              }
            });
          }
          array.push({
            operator: operator,
            operatorList: parameter.operator,
            params: param,
            validation: data[0],
          });
        }
      }
    });
    return array;
  }

  private selectedConditionFunction() {
    let returnCondition;
    let reqConditionCheck = this.reqConditionCheck;
    if (reqConditionCheck === 'Mandatory') {
      this.elData.forEach(x => {
        if (x.name === 'IS_NOT_NULL') {
          returnCondition = x;
        }
      });
    } else if (reqConditionCheck === 'Conditional') {
      returnCondition = this.resConditionalData;
    }
    return returnCondition;
  }

  public cancel() {
    this.oncancel.emit(false);
  }

  stringToBoolean(string) {
    switch (string) {
      case 'true':
      case 'yes':
      case '1':
        return true;
      case 'false':
      case 'no':
      case '0':
      case null:
        return false;
      default:
        return Boolean(string);
    }
  }

  private saveResponseMapping(imfExp, selectedConditionvalue) {
    let flag = true;
    this.responseError = false;
    if (
      this.resImfValue &&
      this.selectedService &&
      this.selectedService.value &&
      this.selectedType &&
      this.ipcValue &&
      this.useCase == 3
    ) {
      imfExp = JSON.parse(this.adapterDataMap.res_blank_structure_field);
      imfExp.functions = [];
      // const destination =
      //   '${message_exchange[' +
      //   this.networkService +
      //   '].native_request_message[' +
      //   this.field.id +
      //   ']}';
      let destination = null
      if (this.field.id.indexOf('http_headers[') > -1) {
        destination =
          '${' + this.field.id + '}';
      } else {
        destination =
          '${message_exchange[' +
        this.networkService +
        '].native_request_message[' + this.field.id + ']}';
      }
      (imfExp.source =
        '${message_exchange[' +
        this.selectedService.value +
        '].' +
        this.selectedType +
        '_message[' +
        this.resImfValue +
        ']}'),
        (imfExp.destination = [destination]);
      imfExp.destination[1] =
        '${message_exchange[' +
        this.networkService +
        '].request_message[' +
        this.resImfValue +
        ']}';
      if (this.ipcValue.value) {
        imfExp.ipc = this.ipcValue.value;
      } else {
        imfExp.ipc = this.ipcValue;
      }
      this.resBlockList.forEach(fn => {
        imfExp.functions.push(fn.function);
      });
      if (this.resCustomMapper) {
        let map;
        this.resCustomMapper.mapper.forEach(mapper => {
          if (!map) {
            map = {};
          }
          if (mapper.value1 && mapper.value2) {
            map[mapper.value2] = mapper.value1;
          }
        });
        if (map) {
          imfExp.functions.push({
            defaultValue: this.resCustomMapper.defaultValue,
            mapping: map,
            useSameOnMatchFail: this.stringToBoolean(this.resCustomMapper.useSameOnMatchFail),
            type: 'value_mapper',
          });
        }
      }
      imfExp.validationFunctions = [];
      this.extractResValidation.forEach(item1 => {
        flag = true;
        if (item1.validation) {
          if (item1.validation.expression) {
            item1.validation.expression = item1.validation.expression.replace(
              '#fieldNo',
              this.field.id,
            );
            if (item1.operator) {
              item1.validation.expression = item1.validation.expression.replace(
                '#operator',
                item1.operator.expression,
              );
            }
            item1.params.forEach(param => {
              if (param.value) {
                item1.validation.expression = item1.validation.expression.replace(
                  '#' + param.name,
                  param.value,
                );
              } else {
                flag = false;
              }
            });
            if (flag) {
              imfExp.validationFunctions.push({
                name: item1.validation.name,
                type: item1.validation.expType,
                expression: item1.validation.expression,
              });
            }
          } else {
            const a = [];
            if (item1.params) {
              item1.params.forEach(param => {
                if (param.value) {
                  a.push(param.value);
                } else {
                  flag = false;
                }
              });
            }
            if (flag) {
              imfExp.validationFunctions.push({
                name: item1.validation.name,
                type: item1.validation.expType,
                parameters: a,
              });
            }
          }
        }
      });
      imfExp = this.setConditionValue(imfExp);

      imfExp.selectedOption = this.resRadioModel;
      imfExp.useCase = this.useCase;
      imfExp.fieldId = this.field.id;

      if (this.rawDestination && this.useCase !== '1') {
        imfExp.rawDestination = imfExp.destination[1];
        imfExp.destination.pop();
      }
      if (!this.responseError) {
        this.saveReqData.emit({
          selectedOption: this.resRadioModel,
          value: imfExp,
        });
      }
    } else if (this.resImfValue && this.ipcValue && this.useCase == 1) {
      imfExp = JSON.parse(this.adapterDataMap.res_blank_structure_field);
      imfExp.functions = [];
      const destination =
        '${message_exchange[' +
        this.networkService +
        '].native_request_message[' +
        this.field.id +
        ']}';
      imfExp.source = '${' + this.resImfValue + '}';
      imfExp.destination = [destination];
      if (this.ipcValue.value) {
        imfExp.ipc = this.ipcValue.value;
      } else {
        imfExp.ipc = this.ipcValue;
      }
      this.resBlockList.forEach(fn => {
        imfExp.functions.push(fn.function);
      });
      if (this.resCustomMapper) {
        let map;
        this.resCustomMapper.mapper.forEach(mapper => {
          if (!map) {
            map = {};
          }
          if (mapper.value1 && mapper.value2) {
            map[mapper.value2] = mapper.value1;
          }
        });
        if (map) {
          imfExp.functions.push({
            defaultValue: this.resCustomMapper.defaultValue,
            mapping: map,
            useSameOnMatchFail: this.stringToBoolean(this.resCustomMapper.useSameOnMatchFail),
            type: 'value_mapper',
          });
        }
      }
      imfExp.validationFunctions = [];
      this.extractResValidation.forEach(item1 => {
        flag = true;
        if (item1.validation) {
          if (item1.validation.expression) {
            item1.validation.expression = item1.validation.expression.replace(
              '#fieldNo',
              this.field.id,
            );
            if (item1.operator) {
              item1.validation.expression = item1.validation.expression.replace(
                '#operator',
                item1.operator.expression,
              );
            }
            item1.params.forEach(param => {
              if (param.value) {
                item1.validation.expression = item1.validation.expression.replace(
                  '#' + param.name,
                  param.value,
                );
              } else {
                flag = false;
              }
            });
            if (flag) {
              imfExp.validationFunctions.push({
                name: item1.validation.name,
                type: item1.validation.expType,
                expression: item1.validation.expression,
              });
            }
          } else {
            const a = [];
            if (item1.params) {
              item1.params.forEach(param => {
                if (param.value) {
                  a.push(param.value);
                } else {
                  flag = false;
                }
              });
            }
            if (flag) {
              imfExp.validationFunctions.push({
                name: item1.validation.name,
                type: item1.validation.expType,
                parameters: a,
              });
            }
          }
        }
      });
      imfExp = this.setConditionValue(imfExp);

      imfExp.selectedOption = this.resRadioModel;
      imfExp.useCase = this.useCase;
      imfExp.fieldId = this.field.id;

      if (this.rawDestination && this.useCase != 1) {
        imfExp.rawDestination = imfExp.destination[1];
        imfExp.destination.pop();
      }
      if (!this.responseError) {
        this.saveReqData.emit({
          selectedOption: this.resRadioModel,
          value: imfExp,
        });
      }
    } else if (
      this.resImfValue &&
      this.selectedService &&
      this.selectedService.value &&
      this.ipcValue &&
      this.useCase == 2
    ) {
      imfExp = JSON.parse(this.adapterDataMap.res_blank_structure_field);
      imfExp.functions = [];
      const destination =
        '${message_exchange[' +
        this.networkService +
        '].native_request_message[' +
        this.field.id +
        ']}';
      imfExp.source =
        '${message_exchange[' + this.selectedService.value + '].' + this.resImfValue + '}';
      imfExp.destination = [destination];
      imfExp.destination[1] =
        '${message_exchange[' + this.networkService + '].' + this.resImfValue + '}';
      if (this.ipcValue.value) {
        imfExp.ipc = this.ipcValue.value;
      } else {
        imfExp.ipc = this.ipcValue;
      }
      this.resBlockList.forEach(fn => {
        imfExp.functions.push(fn.function);
      });
      if (this.resCustomMapper) {
        let map;
        this.resCustomMapper.mapper.forEach(mapper => {
          if (!map) {
            map = {};
          }
          if (mapper.value1 && mapper.value2) {
            map[mapper.value2] = mapper.value1;
          }
        });
        if (map) {
          imfExp.functions.push({
            defaultValue: this.resCustomMapper.defaultValue,
            mapping: map,
            useSameOnMatchFail: this.stringToBoolean(this.resCustomMapper.useSameOnMatchFail),
            type: 'value_mapper',
          });
        }
      }
      imfExp.validationFunctions = [];
      this.extractResValidation.forEach(item1 => {
        flag = true;
        if (item1.validation) {
          if (item1.validation.expression) {
            item1.validation.expression = item1.validation.expression.replace(
              '#fieldNo',
              this.field.id,
            );
            if (item1.operator) {
              item1.validation.expression = item1.validation.expression.replace(
                '#operator',
                item1.operator.expression,
              );
            }
            item1.params.forEach(param => {
              if (param.value) {
                item1.validation.expression = item1.validation.expression.replace(
                  '#' + param.name,
                  param.value,
                );
              } else {
                flag = false;
              }
            });
            if (flag) {
              imfExp.validationFunctions.push({
                name: item1.validation.name,
                type: item1.validation.expType,
                expression: item1.validation.expression,
              });
            }
          } else {
            const a = [];
            if (item1.params) {
              item1.params.forEach(param => {
                if (param.value) {
                  a.push(param.value);
                } else {
                  flag = false;
                }
              });
            }
            if (flag) {
              imfExp.validationFunctions.push({
                name: item1.validation.name,
                type: item1.validation.expType,
                parameters: a,
              });
            }
          }
        }
      });
      imfExp = this.setConditionValue(imfExp);

      imfExp.selectedOption = this.resRadioModel;
      imfExp.useCase = this.useCase;
      imfExp.fieldId = this.field.id;

      if (this.rawDestination && this.useCase != '1') {
        imfExp.rawDestination = imfExp.destination[1];
        imfExp.destination.pop();
      }
      if (!this.responseError) {
        this.saveReqData.emit({
          selectedOption: this.resRadioModel,
          value: imfExp,
        });
      }
    } else {
      this.responseError = true;
    }
  }

  private setConditionValue(item1) {
    const selectedConditionvalue = this.selectedConditionFunction();
    item1.selectedCondition = this.reqConditionCheck;
    if (item1.type !== 'imdg_enrich') {
      if (item1.validationFunctions) {
        item1.validationFunctions = item1.validationFunctions.filter(
          validation =>
            validation.name !== 'IS_NOT_NULL' ||
            (validation.name === 'IS_NOT_NULL' && validation.parameters),
        );
      } else {
        item1.validationFunctions = [];
      }
      item1.condition = undefined;
      if (item1.selectedCondition === 'Mandatory') {
        item1.validationFunctions.push({
          name: selectedConditionvalue.name,
          type: selectedConditionvalue.expType,
        });
      } else if (item1.selectedCondition === 'Conditional') {
        if (selectedConditionvalue) {
          item1.condition = selectedConditionvalue;
        } else {
          this.conditionError = true;
        }
      }
    }
    return item1;
  }

  public save() {
    let imfExp: any;
    const selectedConditionvalue = this.selectedConditionFunction();
    this.saveResponseMapping(imfExp, selectedConditionvalue);
    this.subscribeService.setServiceType(true);
  }

  public selectImfFn(value) {
    this.resImfValue = value.split('%')[0];
    this.useCase = value.split('%')[1];
    if (this.useCase == 1) {
      if (this.serviceList) {
        this.selectedService = this.serviceList.find(x => x.value === 'GATEWAY_SERVICE');
      }
    }
    if (this.useCase === 2) {
      this.selectedType = 'response';
    }
  }

  public addBlockStep(block) {
    block.push({ name: 'Step', value: null, params: [], function: null });
  }

  public removeBlockStep(index: number, block) {
    block.splice(index, 1);
  }

  public stepFunction(data, a, i, flag = true, flag1 = true) {
    if (flag1) {
      this.resBlockList[i].function = null;
    }
    this.selectedStepParameter = {
      data: data,
      index: a,
      index2: i,
      stepParam:
        this.resBlockList[i].function && this.resBlockList[i].function.parameters
          ? this.resBlockList[i].function.parameters
          : [],
    };
    if (data.parameters && data.parameters.length === 0) {
      this.addReqParam(this.selectedStepParameter);
    } else {
      this.showAddParamPopup = true;
      this.showParamPopup.emit(true);
    }
  }

  public addReqParam(event) {
    this.showAddParamPopup = false;
    this.showParamPopup.emit(false);
    if (event.data.type === 'execute_function') {
      this.resBlockList[event.index2].function = {
        type: event.data.type,
        execute: event.data.actionName,
        parameters: event.param,
      };
    } else {
      this.resBlockList[event.index2].function = {
        type: event.data.type,
        execute: event.data.actionName,
        parameters: event.param ? event.param : [],
      };
    }
  }

  public addResCustomMap() {
    const formControl = new UntypedFormControl();
    this.resCustomMapper = {
      mapper: [{ value1: null, value2: null, formControl: formControl }],
      defaultValue: '',
      useSameOnMatchFail: true,
    };
  }

  public addResMap(resCustomMapper) {
    const formControl = new UntypedFormControl();
    resCustomMapper.mapper.push({
      value1: null,
      value2: null,
      formControl: formControl,
    });
  }

  public removeResCustomMap() {
    this.resCustomMapper = undefined;
  }

  public removemMap(item, index) {
    item.mapper.splice(index, 1);
  }

  public closeParamPopup(event) {
    if (event.data.parametersOptional == false) {
      if (!this.resBlockList[event.index2].function) {
        delete this.resBlockList[event.index2];
      }
      this.resBlockList = this.resBlockList.filter(x => x && x !== null);

    } else {
      this.addReqParam(event);
    }
    this.showAddParamPopup = false;
    this.showParamPopup.emit(false);
  }

  public addValidation(item) {
    item.push({
      validation: null,
      operator: null,
      params: [],
      operatorList: [],
    });
  }

  public removeValidation(item, index) {
    item.splice(index, 1);
  }

  public validationParam(block) {
    const parameter = block.validation.parameters;
    block.params = [];
    if (parameter) {
      parameter.signature.forEach(param => {
        if (param.name !== 'operator') {
          if (param.name.indexOf('source') !== -1) {
            block.params.push({
              label: 'source',
              list: this.sourceList,
              name: param.name,
              value: null,
            });
          } else if (param.name.indexOf('imf') !== -1) {
            block.params.push({
              label: 'imf',
              list: this.imfList,
              name: param.name,
              value: null,
            });
          } else {
            block.params.push({ name: param.name, value: '', type: param.type });
          }
        }
      });
      block.operatorList = parameter.operator ? parameter.operator : [];
    }
  }
}
