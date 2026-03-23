import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { SubscribeService } from '@app/services/subscribe.services';
@Component({
  selector: 'l3-request-join',
  templateUrl: './request.component.html',
  styleUrls: ['./request.component.scss'],
})
export class L3RequestJoinComponent implements OnInit {
  public customJoin = {
    ipcValue: null,
    extractResValidation: [],
    resBlockList: [],
    sources: [],
    resCustomMapper: {
      mapper: [],
      defaultValue: '',
    },
  };
  customJoinError: boolean;
  isSubmit: boolean;
  isValidvalue = false;
  public showAddParamPopup = false;
  public selectedStepParameter = {};
  @Input() stepList = [];
  // public resBlockFunction = [];
  @Input() field;
  @Input() readOnlyFlag = false;
  @Input() sourceList;
  @Input() imfList;
  @Input() ipcList;
  @Input() lookupList;
  @Input() serviceList = [];
  @Input() networkService;
  @Input() isRequest;
  @Input() l3Adapter = true;
  @Input() jsonData;
  @Input() typeList;
  @Input() validationList = [];
  @Input() isMandatory;
  @Input() public transformItem: any;
  @Output() public oncancel = new EventEmitter<boolean>();
  @Output() public emitParamPopup = new EventEmitter<boolean>();
  @Output() public joinMapper = new EventEmitter<Object>();
  public responseError = false;
  public source: any = {};
  public joinResImfValue;
  public joinUseCase;
  public joinResponseError;
  public joinSelectedService;
  public joinSelectedType;
  public joinResValidation = [];
  constructor(private subscribeService: SubscribeService) { }

  ngOnInit() {
    if (this.transformItem && this.transformItem.selectedOption === 'join') {
      this.getEditData();
    }
  }
  public addResBlockStep(block) {
    block.push({ name: 'Step', value: null, params: [], function: null });
  }

  public removeResBlockStep(block, index) {
    block.splice(index, 1);
  }

  public stepFunction(source, data, a, i, flag = true, flag1 = true) {
    this.emitParamPopup.emit(false);
    this.isSubmit = false;
    this.source = source;
    if (flag) {
      if (flag1) {
        source.resBlockList[i].function = null;
      }
      this.selectedStepParameter = {
        data: data,
        index: -1,
        index2: i,
        stepParam:
          source.resBlockList[i].function && source.resBlockList[i].function.parameters
            ? source.resBlockList[i].function.parameters
            : [],
      };
    }
    if (data.parameters && data.parameters.length === 0) {
      this.addParam(this.selectedStepParameter);
    } else {
      this.showAddParamPopup = true;
    }
  }

  public closeParamPopup(event) {
    if (event.data.parametersOptional == false) {
      if (event.index === -1) {
        if (!this.customJoin.resBlockList[event.index2].function) {
          delete this.customJoin.resBlockList[event.index2];
        }
        this.customJoin.resBlockList = this.customJoin.resBlockList.filter(x => x && x !== null);
      } else {
        if (!this.customJoin.sources[event.index].resBlockList[event.index2].function) {
          delete this.customJoin.sources[event.index].resBlockList[event.index2];
        }
        this.customJoin.sources[event.index].resBlockList = this.customJoin.sources[
          event.index
        ].resBlockList.filter(x => x && x !== null);
      }
    } else {
      this.addParam(event);
    }
    this.showAddParamPopup = false;
    this.emitParamPopup.emit(true);
  }

  public addParam(event) {
    this.showAddParamPopup = false;
    if (event.data.type === 'execute_function') {
      if (event.index === -1) {
        this.source.resBlockList[event.index2].function = {
          type: event.data.type,
          execute: event.data.actionName,
          parameters: event.param,
        };
      }
    }
    this.emitParamPopup.emit(true);
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

  public addResJoinMap(item) {
    item.mapper.push({
      value1: null,
      value2: null,
    });
  }

  public removemResJoinMap(item, index) {
    item.splice(index, 1);
  }

  public addSource(item) {
    item.push({
      selectedService: null,
      selectedType: null,
      resImfValue: null,
      useCase: null,
      collapse: false,
      ipcValue: null,
      sourceType: 'imf',
      extractResValidation: [],
      resBlockList: [],
      resCustomMapper: {
        mapper: [],
        defaultValue: '',
        useSameOnMatchFail: true,
      },
    });
  }

  public removeSource(index) {
    this.customJoin.sources.splice(index, 1);
  }

  collapseClick(item) {
    item.collapse = !item.collapse;
  }

  public selectImfFnJoin(item, value) {
    if (value) {
      item.resImfValue = value.split('%')[0];
      item.useCase = value.split('%')[1];
      this.isValidvalue = false;
      if (item.useCase === '1') {
        if (this.serviceList) {
          item.selectedService = this.serviceList.find(x => x.value === 'GATEWAY_SERVICE');
        }
      }
      if (item.useCase === '1' || item.useCase === '2') {
        item.selectedType = 'response';
      }
    } else {
      item.resImfValue = null;
      item.useCase = null;
    }
  }

  validation() {
    if (!this.customJoin.ipcValue && !this.customJoin.sources.length) {
      this.customJoinError = true;
      this.isSubmit = true;
    }
    for (let index = 0; index < this.customJoin.sources.length; index++) {
      if (
        !this.customJoin.sources[index].resImfValue &&
        this.customJoin.sources[index].sourceType == 'imf'
      ) {
        this.customJoinError = true;
        this.isSubmit = true;
        this.isValidvalue = true;
        break;
      } else if (!this.customJoin.sources[index].ipcValue) {
        this.customJoinError = true;
        this.isSubmit = true;
        break;
      }
    }
  }

  private setValidation(imfExp) {
    this.joinResValidation.forEach(item1 => {
      let flag = true;
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
                param.value = null;
                a.push(param.value);
                flag = true;
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

    return imfExp;
  }

  public selectImfFn(value) {
    this.joinResImfValue = value.split('%')[0];
    this.joinUseCase = value.split('%')[1];
    if (this.joinUseCase === '1') {
      if (this.serviceList) {
        this.joinSelectedService = this.serviceList.find(x => x.value === 'GATEWAY_SERVICE');
      }
    }
    if (this.joinUseCase === '1' || this.joinUseCase === '2') {
      this.joinSelectedType = 'response';
    }
  }

  public save() {
    let imfExp = {
      functions: [],
      fieldId: '',
      type: '',
      destination: [],
      metaData: {
        useCase: null,
      },
      validationFunctions: [],
    };
    this.customJoinError = false;
    this.isSubmit = false;
    this.validation();
    if (this?.customJoin?.ipcValue && this?.customJoin?.sources.length && !this.customJoinError) {
      this.customJoinError = false;
      this.isSubmit = false;
      let flag = true;
      this.responseError = false;
      imfExp['functions'] = [];
      imfExp['fieldId'] = this.field.id;
      imfExp['type'] = 'join';
      imfExp['destination'] = [
        '${message_exchange[' +
        this.networkService +
        '].native_request_message[' +
        this.field.id +
        ']}',
      ];
      if (
        this.joinResImfValue &&
        this.joinSelectedService &&
        this.joinSelectedService.value &&
        this.joinSelectedType
      ) {
        if (this.joinSelectedType == 'request') {
          this.joinSelectedType = 'request_message';
        } else {
          this.joinSelectedType = 'response_message';
        }
        let messageType = 'response_message';
        if (this.isRequest) {
          messageType = 'request_message';
        }

        // let destination =
        //   '${message_exchange[' +
        //   this.networkService +
        //   '].native_request_message[' +
        //   this.field.id +
        //   ']}';
        // if (this.l3Adapter) {
        //   destination =
        //     '${message_exchange[' +
        //     this.networkService +
        //     '].native_request_message[' +
        //     this.field.id +
        //     ']}';
        // }
        let destination = null;
        if (this.field.id.indexOf('http_headers[') > -1) {
          destination =
            '${' + this.field.id + '}';
        } else {
          destination =
            '${message_exchange[' +
            this.networkService +
            '].native_request_message[' +
            this.field.id +
            ']}';
        }
        if (this.joinUseCase == 1) {
          imfExp.destination = [destination];
          imfExp.destination[1] =
            '${message_exchange[' + this.networkService + '].' + this.joinResImfValue + '}';
        } else if (this.joinUseCase === '2') {
          imfExp.destination = [destination];
          imfExp.destination[1] =
            '${message_exchange[' +
            this.joinSelectedService.value +
            '].' +
            this.joinResImfValue +
            '}';
        } else {
          imfExp.destination = [destination];
          imfExp.destination[1] =
            '${message_exchange[' +
            this.joinSelectedService.value +
            '].' +
            this.joinSelectedType +
            '[' +
            this.joinResImfValue +
            ']}';
        }

        imfExp.validationFunctions = [];
        imfExp = this.setValidation(imfExp);
        imfExp.metaData.useCase = this.joinUseCase;
        imfExp.fieldId = this.field.id;
      } else {
        imfExp.destination = [
          '${message_exchange[' +
          this.networkService +
          '].native_request_message[' +
          this.field.id +
          ']}',
        ];
      }
      if (this.customJoin.ipcValue.value) {
        imfExp['ipc'] = this.customJoin.ipcValue.value;
      } else {
        imfExp['ipc'] = this.customJoin.ipcValue;
      }
      this.customJoin.resBlockList.forEach(fn => {
        imfExp.functions.push(fn.function);
      });
      // imfExp.functions = JSON.parse(JSON.stringify(this.resBlockFunction[this.field.id]));
      if (this.customJoin.resCustomMapper && this.customJoin.resCustomMapper.mapper.length > 0) {
        imfExp.functions = JSON.parse(
          JSON.stringify(this.saveEvaluateData(this.customJoin.resCustomMapper, imfExp)),
        );
      }
      imfExp.validationFunctions = this.savePostValidation(
        this.customJoin.extractResValidation,
        imfExp,
        flag,
      );
      const sources = [];
      this.customJoin.sources = this.customJoin.sources.map(element => {
        // element.functions = JSON.parse(JSON.stringify(this.resBlockFunction[this.field.id]));
        element.functions = [];
        element.resBlockList.forEach(fn => {
          element.functions.push(fn.function);
        });
        if (element.resCustomMapper && element.resCustomMapper.mapper.length > 0) {
          element.functions = JSON.parse(
            JSON.stringify(this.saveEvaluateData(element.resCustomMapper, element)),
          );
        }
        element.validationFunctions = [];
        if (element.extractResValidation) {
          flag = true;
          element.validationFunctions = this.savePostValidation(
            element.extractResValidation,
            element,
            flag,
          );
        }
        if (element.sourceType == 'imf') {
          if (element.useCase == 1) {
            element.source = '${' + element.resImfValue + '}';
            element.destination = '${' + element.resImfValue + '}';
          } else if (element.useCase == 2) {
            element.source =
              '${message_exchange[' +
              element.selectedService.value +
              '].' +
              element.resImfValue +
              '}';
            element.destination =
              '${message_exchange[' + this.networkService + '].' + element.resImfValue + '}';
          } else {
            element.source =
              '${message_exchange[' +
              element.selectedService.value +
              '].' +
              element.selectedType +
              '_message[' +
              element.resImfValue +
              ']}';
            element.destination =
              '${message_exchange[' +
              this.networkService +
              '].request_message[' +
              element.resImfValue +
              ']}';
          }
        } else if (element.sourceType === 'text') {
          if (!element.resImfValue) {
            element.destination = null;
          } else {
            if (element.useCase == 1) {
              element.destination = '${' + element.resImfValue + '}';
            } else if (element.useCase == 2) {
              element.destination =
                '${message_exchange[' + this.networkService + '].' + element.resImfValue + '}';
            } else {
              element.destination =
                '${message_exchange[' +
                this.networkService +
                '].request_message[' +
                element.resImfValue +
                ']}';
            }
          }
        }
        sources.push({
          source: element.source,
          target: element.destination,
          functions: element.functions,
          useCase: element.useCase,
          sourceType: element.sourceType || 'imf',
          errorCode: element.ipcValue,
        });
        delete element.ipcValue;
      });
      imfExp['source'] = sources;
      imfExp.validationFunctions = imfExp.validationFunctions.filter(
        validation =>
          validation.name !== 'IS_NOT_NULL' ||
          (validation.name === 'IS_NOT_NULL' && validation.parameters),
      );
      imfExp.fieldId = this.field.id;
      imfExp['selectedOption'] = 'join';
      this.joinMapper.emit(imfExp);
    } else {
      this.customJoinError = true;
      this.isSubmit = true;
    }
    this.subscribeService.setServiceType(true);
  }

  private saveEvaluateData(evaluate, imfExp) {
    let map;
    evaluate.mapper.forEach(mapper => {
      if (!map) {
        map = {};
      }
      if (mapper.value1 && mapper.value2) {
        map[mapper.value2] = mapper.value1;
      }
    });
    if (map) {
      imfExp.functions.push({
        defaultValue: evaluate.defaultValue,
        mapping: map,
        useSameOnMatchFail: this.stringToBoolean(evaluate.useSameOnMatchFail),
        type: 'value_mapper',
      });
    }
    return imfExp.functions;
  }

  private savePostValidation(postValid, imfExp, flag) {
    postValid.forEach(item1 => {
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
    return imfExp.validationFunctions;
  }

  private getEditData() {
    const transformItem = JSON.parse(JSON.stringify(this.transformItem));
    if (transformItem.destination[1]) {
      if (transformItem.destination[1].indexOf('_message[') === -1) {
        if (transformItem.destination[1].indexOf(']') === -1) {
          this.joinResImfValue = transformItem.destination[1].split('{')[1].split('}')[0];
        } else {
          this.joinResImfValue = transformItem.destination[1].split('].')[1].split('}')[0];
        }
      } else {
        this.joinResImfValue = transformItem.destination[1].split('message[')[1].split(']')[0];
      }
      this.joinUseCase = parseInt(transformItem.metaData.useCase);
      if (this.serviceList) {
        let service = 'GATEWAY_SERVICE';
        if (this.joinUseCase !== 1) {
          service = transformItem.destination[1].split('message_exchange[')[1].split('].')[0];
        }
        const data = this.serviceList.filter(x => x.value === service);
        if (data && data[0]) {
          this.joinSelectedService = data[0];
        }
      }
      if (transformItem.destination[1].indexOf('request_message') !== -1) {
        this.joinSelectedType = 'request';
      } else {
        this.joinSelectedType = 'response';
      }
    }
    this.customJoin.ipcValue = transformItem.ipc;
    if (transformItem.functions && this.stepList) {
      this.getResJoinFunction(this.customJoin, transformItem.functions);
    }
    this.customJoin.extractResValidation = [];
    if (transformItem.validationFunctions && this.validationList) {
      this.customJoin.extractResValidation = this.getResValidationFunction(
        transformItem.validationFunctions,
      );
    }
    if (this.transformItem.source && this.stepList) {
      this.customJoin.sources = this.getResValidationSources(transformItem.source);
    }
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

  private getResJoinFunction(ref, functionsData) {
    functionsData.forEach(item => {
      if (item.type === 'value_mapper') {
        ref.resCustomMapper = {
          mapper: [],
          defaultValue: item.defaultValue,
          useSameOnMatchFail: this.stringToBoolean(item.useSameOnMatchFail),
        };
        const data = Object.keys(item.mapping);
        data.forEach((mapping, index) => {
          ref.resCustomMapper.mapper.push({
            value1: item.mapping[data[index]],
            value2: data[index],
          });
        });
      } else {
        const data = this.stepList.find(
          x => x.actionName === item.execute || x.actionName === item.execute,
        );
        if (data) {
          const key = {
            name: 'Step',
            value: data,
            function: item,
          };
          ref.resBlockList.push(JSON.parse(JSON.stringify(key)));
        }
      }
    });
  }

  private getResValidationSources(sources) {
    return sources.map(source => {
      source.sourceType = source.sourceType ? source.sourceType : 'imf';
      if (source.sourceType === 'text') {
        source.source = source.source;
        source.resImfValue = this.getTargetImfValue(source.target);
      } else {
        source.resImfValue = this.getResImfValue(source.source);
        source.selectedService = this.getSelectedServiceFn(source.source, source.useCase);
        source.selectedType = this.getType(source.source);
      }
      source.collapse = true;
      source.useCase = parseInt(source.useCase);
      source.ipcValue = source.errorCode;
      source.resBlockList = [];
      if (source.functions && this.stepList) {
        this.getResJoinFunction(source, source.functions);
      }
      return source;
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

  private getTargetImfValue(taregt) {
    let resImfValue;
    if (taregt) {
      if (taregt.indexOf('_message[') === -1) {
        if (taregt.indexOf(']') === -1) {
          resImfValue = taregt.split('{')[1].split('}')[0];
        } else {
          resImfValue = taregt.split('].')[1].split('}')[0];
        }
      } else {
        resImfValue = taregt.split('message[')[1].split(']')[0];
      }
    }
    return resImfValue;
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
      if (useCase == 2 || useCase == 3) {
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
}
