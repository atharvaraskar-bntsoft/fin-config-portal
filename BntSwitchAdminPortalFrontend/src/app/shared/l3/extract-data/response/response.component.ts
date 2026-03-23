import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { UntypedFormControl } from '@angular/forms';
import { SubscribeService } from '@app/services/subscribe.services';

@Component({
  selector: 'l3-extract-data-response',
  templateUrl: './response.component.html',
  styleUrls: ['./response.component.scss'],
})
export class L3ExtractDataResponseComponent implements OnInit {
  @Input() conditionCheck;
  @Input() isConditionalData;
  @Input() jsonData: any;
  @Input() serviceList: any;
  @Input() showAddParamPopup;
  @Input() sourceList;
  @Input() lookupList;
  @Input() stepList;
  @Input() imfList;
  @Input() ipcList;
  @Input() public imfId: any;
  @Input() validationList;
  @Input() field;
  @Input() networkService;
  @Input() resRadioModel;
  @Input() reqConditionCheck;
  @Input() elData;
  @Input() adapterDataMap: any;
  @Input() transformActionItemRes;
  @Input() isMandatory;
  @Input() readOnlyFlag = false;
  @Output() public showParamPopup = new EventEmitter<boolean>();
  @Output() public saveResData = new EventEmitter<Object>();
  @Output() public oncancel = new EventEmitter<boolean>();
  public extractResValidation = [];
  public mapperParam = [];
  public reqIMF = [];
  public selectedMapperParam = [];
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
  public resConditionalData;
  public responseError = false;
  public imfValue: any;
  public extractError = false;
  public typeList = [
    { name: 'Request', value: 'request' },
    { name: 'Response', value: 'response' },
  ];
  constructor(private subscribeService: SubscribeService) {}

  ngOnInit() {
    this.editExtract();
    if(this.jsonData) {
      this.jsonData = JSON.parse(JSON.stringify(this.jsonData))
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    //Called before any other lifecycle hook. Use it to inject dependencies, but avoid any serious work here.
    //Add '${implements OnChanges}' to the class.
    if(this.jsonData) {
      this.jsonData = JSON.parse(JSON.stringify(this.jsonData))
    }
     
  }
  
  private editExtract() {
    this.blockList = [];
    if (this.transformActionItemRes && this.transformActionItemRes.length && this.transformActionItemRes[0].selectedOption == 'isExtract') {
      this.transformActionItemRes.forEach(item => {
        const imfValue = item.destination[0];
        const ipcValue = item.ipc;
        const postValidation = [];
        const formatList = [];
        if (item.validationFunctions && this.validationList) {
          item.validationFunctions.forEach(validation => {
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
                postValidation.push({
                  operator: operator,
                  operatorList: parameter.operator,
                  params: param,
                  validation: data[0],
                });
              }
            }
          });
        }
        const array = [];
        if (item.functions && this.stepList && this.stepList.length > 0) {
          item.functions.forEach(validation => {
            if (validation.type !== 'value_mapper') {
              const data = this.stepList.find(
                x =>
                  x.actionName === validation.execute || x.actionName === validation.functionName,
              );
              if (data) {
                const key = {
                  name: 'Step',
                  value: data,
                  function: validation,
                };
                array.push(JSON.parse(JSON.stringify(key)));
              }
            }
          });
        }
        let mapper;
        if (item.functions) {
          item.functions.forEach(map => {
            if (map.type === 'value_mapper') {
              mapper = {
                mapper: [],
                defaultValue: map.defaultValue,
                useSameOnMatchFail: this.stringToBoolean(map.useSameOnMatchFail),
              };
              const data = Object.keys(map.mapping);
              data.forEach((mapping, index) => {
                const formControl = new UntypedFormControl(map.mapping[data[index]]);
                mapper.mapper.push({
                  value1: data[index],
                  value2: map.mapping[data[index]],
                  formControl: formControl,
                });
              });
            }
          });
        }
        if (formatList.length === 0) {
          formatList.push({ operator: '', value: '' });
        }
        this.blockList.push({
          transformArray: array,
          // tslint:disable-next-line: object-literal-sort-keys
          PostValidation: postValidation,
          formatList: formatList,
          IMFvalue: imfValue,
          IPCvalue: ipcValue,
          function: [],
          validationFunction: [],
          customMapper: mapper,
          selectedOption: 'isExtract'
        });
      });
    } else {
      this.blockList = [
        {
          formatList: [{ operator: '', value: '' }],
          function: [],
          IMFvalue: null,
          IPCvalue: null,
          PostValidation: [],
          transformArray: [],
          collapse: true,
          validationFunction: [],
        },
      ];
    }
  }

  public removeBlockList(index) {
    this.blockList.splice(index, 1);
  }

  collapseBlockList(item) {
    item.collapse = !item.collapse;
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

  public addBlockList() {
    this.blockList.push({
      formatList: [{ operator: '', value: '' }],
      function: [],
      IMFvalue: null,
      IPCvalue: null,
      transformArray: [],
      PostValidation: [],
      validationFunction: [],
      collapse: true,
    });
  }

  private setConditionValue(item1) {
    this.conditionError = false;
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
    imfExp = JSON.parse(this.adapterDataMap.req_blank_structure_field);
    imfExp.source = '${' + this.field.id + '}';
    this.reqIMF[this.field.id] = [];
    this.saveExtract(imfExp);
    this.subscribeService.setServiceType(true);
  }

  private saveExtract(imfExp) {
    const array = [];
    this.extractError = false;
    this.conditionError = false;
    let flag = true;
    this.blockList.forEach(item => {
      let imfvalue = item.IMFvalue;
      if (item.IMFvalue && item.IMFvalue.value) {
        imfvalue = item.IMFvalue.value;
      }
      if (item.IPCvalue && imfvalue) {
        const destinationStr = imfvalue;
        item.transformArray.forEach(item1 => {
          item.function.push(item1.function);
        });
        if (item.customMapper) {
          let map;
          item.customMapper.mapper.forEach(mapper => {
            if (!map) {
              map = {};
            }
            if (mapper.value1 && mapper.value2) {
              const value1 = mapper.value1;
              map[value1] = mapper.value2;
            }
          });
          if (map) {
            item.function.push({
              type: 'value_mapper',
              mapping: map,
              defaultValue: item.customMapper.defaultValue,
              useSameOnMatchFail: this.stringToBoolean(item.customMapper.useSameOnMatchFail),
            });
          }
        }
        item.formatList.forEach(item1 => {
          if (item1.value && item1.value.expression) {
            item1.value.expression = item1.value.expression.replace('fieldNo', this.field.id);
            item.validationFunction.push({
              name: item1.value.name,
              type: item1.value.expType,
              expression: item1.value.expression,
            });
          }
        });
        item.PostValidation.forEach(item1 => {
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
                item.validationFunction.push({
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
                    flag = true;
                    param.value = null;
                    a.push(param.value);
                  }
                });
              }
              if (flag) {
                item.validationFunction.push({
                  name: item1.validation.name,
                  type: item1.validation.expType,
                  parameters: a,
                });
              }
            }
          }
        });
        if (this.isMandatory) {
          item.validationFunction.push({
            name: this.isMandatory.name,
            type: this.isMandatory.expType,
          });
        }
        item = this.setConditionValue(item);
        imfExp.validationFunctions = item.validationFunction;
        imfExp.functions = item.function;
        if (item.IPCvalue.value) {
          imfExp.ipc = item.IPCvalue.value;
        } else {
          imfExp.ipc = item.IPCvalue;
        }
        array.push({
          destination: [destinationStr],
          ipc: imfExp.ipc,
          condition: this.isConditionalData,
          selectedCondition: this.conditionCheck,
          source: imfExp.source,
          type: 'field',
          validationFunctions: imfExp.validationFunctions,
          functions: imfExp.functions,
          selectedOption: 'isExtract'
        });
      } else {
        this.extractError = true;
      }
    });
    if (!this.extractError && !this.conditionError) {
      this.saveResData.emit(array);
    }
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

  public addCustomMap(item) {
    const formControl = new UntypedFormControl();
    item.customMapper = {
      mapper: [{ value1: null, value2: null, formControl: formControl }],
      defaultValue: '',
      useSameOnMatchFail: true,
    };
  }
  public removeCustomMap(item) {
    item.customMapper = undefined;
  }

  public addMap(item) {
    const formControl = new UntypedFormControl();
    item.mapper.push({ value1: null, value2: null, formControl: formControl });
  }

  public removemMap(item, index) {
    item.mapper.splice(index, 1);
  }

  public stepFunction(data, a, i, flag = true, flag1 = true) {
    if (flag1) {
      this.blockList[a].transformArray[i].function = null;
    }
    
    this.selectedStepParameter = {
      data: data,
      index: a,
      index2: i,
      stepParam:
        this.blockList[a].transformArray[i].function &&
        this.blockList[a].transformArray[i].function.parameters
          ? this.blockList[a].transformArray[i].function.parameters
          : [],
    };
    if (data.parameters && data.parameters.length === 0) {
      this.addParam(this.selectedStepParameter);
    } else {
      this.showAddParamPopup = true;
      this.showParamPopup.emit(true);
    }
  }

  public addParam(event) {
    this.showAddParamPopup = false;
    this.showParamPopup.emit(false);
    this.blockList[event.index].transformArray[event.index2].function = event.param;
    if (event.data.type === 'execute_function') {
      this.blockList[event.index].transformArray[event.index2].function = {
        type: event.data.type,
        execute: event.data.actionName,
        parameters: event.param,
      };
    }
  }

  public closeParamPopup(event) {
    if (event.data.parametersOptional == false) {
      if (!this.blockList[event.index].transformArray[event.index2].function) {
        delete this.blockList[event.index].transformArray[event.index2];
      }
      this.blockList[event.index].transformArray = this.blockList[
        event.index
      ].transformArray.filter(x => x && x !== null);
    } else {
      // this.addParam(event);
    }
    this.showAddParamPopup = false;
    this.showParamPopup.emit(false);
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

  public getImfFn(event, flag) {
    if (flag === 'CopyIMF') {
      this.imfValue = JSON.parse(JSON.stringify(event.value));
    } else if (flag === 'extractIMF') {
      this.blockList[event.id].IMFvalue = JSON.parse(JSON.stringify(event.value));
    } else if (flag === 'builtinIMF') {
      this.mapperParam[event.id].value = JSON.parse(JSON.stringify(event.value));
    } else if (flag === 'builtinIMFRes') {
      this.selectedMapperParam[event.id].value = JSON.parse(JSON.stringify(event.value));
    }
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
