import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { UntypedFormControl } from '@angular/forms';
import {
  GetField,
  GetIMF,
  GetIPC,
  GetMap,
  GetScheme,
} from '@app/store/actions/scheme-imf-mapper.action';
import { selectLookUpValue } from '@app/store/selectors/look-up-configuration.selector';
import { selectIMF, selectIPC, selectMap } from '@app/store/selectors/scheme-imf-mapper.selectors';
import { select, Store } from '@ngrx/store';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { GetLookUpList } from '../../../store/actions/l1-adapter.action';
import { SelectLookUpList } from '../../../store/selectors/l1-adapter.selectors';
import { IAppState } from '../../../store/state/app.state';

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'transform-action',
  templateUrl: './transform-action.component.html',
  styleUrls: ['./transform-action.component.scss'],
})
export class TransformActionComponent implements OnInit {
  @Input() public transformItem: any = [];
  @Input() public transformActionItemRes: any;
  @Input() public schresVald: any;
  @Input() public type: any;
  @Input() public selectedTransactionType: any;
  @Input() public isRequest: any;
  @Input() public imfId: any;
  @Input() public elData = [];
  @Input() public mapperList = [];
  @Input() public templateId;
  @Input() public authData;
  @Input() public scheme;
  @Input() public field;
  @Input() contextImf;
  @Input() readOnlyFlag = false;
  public lookupvalueList = [];
  public componetDestroyed = new Subject();
  public adapterDataMap: any;
  public imfList: any;
  public ipcList: any;
  public sourceList = [];
  public dependentSource = false;
  public conditionCheck = 'Mandatory';
  public lookupList = [];
  public mapperValue;
  @Input() public fieldList: any = [];
  public typeList = [
    { name: 'Request', value: 'request' },
    { name: 'Response', value: 'response' },
  ];
  public validationList: any = [];
  public transformList: any = [];
  public track2List: any = [];
  @Input() public serviceList: any;
  public conditionalId;
  public showTree = false;
  public resCustomMapper;
  public networkService = 'GATEWAY_SERVICE';
  public reqConditionCheck = 'Optional';
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
  public operatorList;
  public isMandatory: any;
  // public isInBuildMapper = true;
  public isExtract = false;
  public isConditional = false;
  public isConditionalData;
  public isParms = false;
  public imfValue: any;
  public ipcValue: any;
  // public resValidation: any;
  public selectedService: any;
  public copyPostvalidation = [];
  public itemList: any = {
    blockStepList: [],
    inBuiltMapperValue: '',
    isExtract: 'internalFormat',
    isInBuiltMapper: true,
    validationFormatList: [],
    validationFun: 'Length',
    validationName: 'Test',
    validationOprator: '=',
  };

  public validationFormatPer = {
    name: '',
    operator: '',
    value: '',
  };

  public blockStepPer = {
    name: '',
    operator: '',
    value: '',
  };
  public conditionError = false;
  public imfVersionList = [];
  public imfVersion;
  public getIMFData;
  public disabled = false;
  // public internalFormatError = false;
  public extractError = false;
  public responseError = false;
  public blockList: any;
  public reqIMF = [];
  @Input() public jsonData;
  public isAttribute = [];
  public resImfValue;
  public resIMF = [];
  // public inBuiltMapperList;
  // public builtInMapperValue;
  // public builtInMapperValue1;
  @Output() public isVisible = new EventEmitter<boolean>();
  @Output() public reqIMFObj = new EventEmitter<Object>();
  @Output() public resIMFObj = new EventEmitter<Object>();
  @Output() public resIMFLeg = new EventEmitter<Object>();
  @Output() public handleCancel = new EventEmitter<Object>();
  public resRadioModel = 'copyField';
  public resBlockList: any;
  public selectedType: any;
  // public TrackOperatorList;
  public useCase;
  public extractResValidation = [];

  public addCondition = false;
  public resConditionalData;
  public rawDestination = false;
  public showAddParamPopup = false;
  public selectedStepParameter = {};
  @Input() stepList = [];
  public showAllData = true;
  constructor(private _store: Store<IAppState>) {
    this._store
      .pipe(takeUntil(this.componetDestroyed), select(selectLookUpValue))
      .subscribe((data: any) => {
        if (data && data.data) {
          this.lookupvalueList = data.data.lookupValueList;
        }
      });
    this._store.dispatch(new GetMap());
    this._store
      .pipe(takeUntil(this.componetDestroyed), select(selectMap))
      .subscribe((response: any) => {
        if (response) {
          this.adapterDataMap = response.AdapterdataMap;
        }
      });
    this._store.dispatch(new GetLookUpList());
    this._store
      .pipe(takeUntil(this.componetDestroyed), select(SelectLookUpList))
      .subscribe((response: any) => {
        if (response && response.data && response.data.list) {
          this.lookupList = this.transformLogic(response.data.list);
        }
      });
    this._store
      .pipe(takeUntil(this.componetDestroyed), select(selectIMF))
      .subscribe((response: any) => {
        if (response) {
          this.imfList = response.ImfField;
        }
      });

    this._store.dispatch(new GetIPC());
    this._store
      .pipe(takeUntil(this.componetDestroyed), select(selectIPC))
      .subscribe((response: any) => {
        if (response) {
          this.ipcList = response;
        }
      });
    this.blockList = [
      {
        function: [],
        formatList: [{ operator: '', value: '' }],
        IMFvalue: null,
        IPCvalue: null,
        PostValidation: [],
        transformArray: [],
        validationFunction: [],
        collapse: false
      },
    ];
    this.resBlockList = [];

    if (this.stepList && this.isRequest) {
      this.stepList = this.stepList.filter(item => item.request);
    } else if (this.stepList && !this.isRequest) {
      this.stepList = this.stepList.filter(item => item.response);
    }
  }

  public hideAllFn(event) {
    this.showAllData = event;
  }

  radioChange(event) {
    this.rawDestination = false;
  }

  ngOnInit() {
    this._store.dispatch(new GetIMF(this.imfId));
    this.elData.forEach(x => {
      
      if (x.subType === 'validation') {
        if (x.parameters && typeof x.parameters === 'string') {
          x.parameters = JSON.parse(x.parameters);
        }
        this.validationList.push(x);
      } else if (x.subType === 'transform') {
        console.log('transform', x)
        if (x.parameters && typeof x.parameters === 'string') {
          console.log('x.parameters', x.parameters)
          x.parameters = JSON.parse(x.parameters);
        }
        this.transformList.push(x);
      } else if (x.subType === 'format') {
        if (x.parameters && typeof x.parameters === 'string') {
          x.parameters = JSON.parse(x.parameters);
        }
        this.track2List.push(x);
      }
    });
    this.isMandatory = this.elData.find(x => x.name === 'IS_NOT_NULL');
    // this.disabled = false;
    if (!this.disabled && this.transformItem && this.transformItem.length > 0 && this.isRequest) {
      this.getEditData();
    } else if (!this.disabled && this.transformActionItemRes && !this.isRequest) {
      this.editResponseData();
    }
    if (!this.transformItem || this.transformItem.length === 0) {
      this.requestModel();
    }
    this._store.dispatch(new GetScheme());
    this.authData.forEach(item => {
      this.sourceList.push({
        id: item.id,
        name: item.name,
        tooltip: item.name,
      });
    });
  }
  private editResponseData() {
    this.resBlockList = [];
    if (this.transformActionItemRes) {
      this.resRadioModel = this.transformActionItemRes.selectedOption;
      if (this.resRadioModel === 'mapper') {
        if ('value' in this.transformActionItemRes) {
          this.reqConditionCheck = this.transformActionItemRes.value.selectedCondition;
        } else {
          this.reqConditionCheck = this.transformActionItemRes.selectedCondition;
        }
      } else {
        this.reqConditionCheck = this.transformActionItemRes.selectedCondition;
      }
      if (this.reqConditionCheck === 'Conditional') {
        this.resConditionalData = this.transformActionItemRes.condition;
      }
      if (this.resRadioModel === 'join') {
      } else if (this.resRadioModel === 'operationField') {
        this.ipcValue = this.transformActionItemRes.ipc;
        this.rawDestination = this.transformActionItemRes.destination.length === 1 ? true : false;
        if (this.transformActionItemRes.source.indexOf('_message[') === -1) {
          if (this.transformActionItemRes.source.indexOf(']') === -1) {
            this.resImfValue = this.transformActionItemRes.source.split('{')[1].split('}')[0];
          } else {
            this.resImfValue = this.transformActionItemRes.source.split('].')[1].split('}')[0];
          }
        } else {
          this.resImfValue = this.transformActionItemRes.source.split('message[')[1].split(']')[0];
        }
        this.useCase = parseInt(this.transformActionItemRes.useCase);
        if (this.serviceList) {
          let service = 'GATEWAY_SERVICE';
          if (this.useCase !== 1) {
            service = this.transformActionItemRes.source
              .split('message_exchange[')[1]
              .split('].')[0];
          }
          const data = this.serviceList.filter(x => x.value === service);
          if (data && data[0]) {
            this.selectedService = data[0];
          }
        }
        if (this.transformActionItemRes.source.indexOf('request_message') !== -1) {
          this.selectedType = 'request';
        } else {
          this.selectedType = 'response';
        }
        if (this.transformActionItemRes.functions && this.stepList) {
          this.transformActionItemRes.functions.forEach(item => {
            if (item && item.type === 'value_mapper') {
              this.resCustomMapper = {
                defaultValue: item.defaultValue,
                mapper: [],
                useSameOnMatchFail: this.stringToBoolean(item.useSameOnMatchFail),
              };
              const data = Object.keys(item.mapping);
              data.forEach((mapping, index) => {
                const formControl1 = new UntypedFormControl(data[index]);
                this.resCustomMapper.mapper.push({
                  formControl: formControl1,
                  value1: item.mapping[data[index]],
                  value2: data[index],
                });
              });
            } else if (item) {
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
        this.extractResValidation = [];
        if (this.transformActionItemRes.validationFunctions && this.validationList) {
          this.transformActionItemRes.validationFunctions.forEach(validation => {
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
                this.extractResValidation.push({
                  operator: operator,
                  operatorList: parameter.operator,
                  params: param,
                  validation: data[0],
                });
              }
            }
          });
        }
      } else if (this.resRadioModel === 'mapper') {
        if (this.transformActionItemRes.value) {
          if (this.transformActionItemRes.value.selectedCondition) {
            this.reqConditionCheck = this.transformActionItemRes.value.selectedCondition;
            if (this.reqConditionCheck === 'Conditional') {
              this.resConditionalData = this.transformActionItemRes.value.condition;
            }
          } else {
            this.reqConditionCheck = this.transformActionItemRes.value[0].selectedCondition;
            if (this.reqConditionCheck === 'Conditional') {
              this.resConditionalData = this.transformActionItemRes.value[0].condition;
            }
          }
          this.editMapper(this.transformActionItemRes.value);
        }
      }
    }
  }

  public editMapper(data) {
    this.dependentSource = false;
    if (!data.type) {
      if (data[0].fieldId !== this.field.id) {
        this.dependentSource = true;
      }
    }
  }

  public fieldPresenceChange(value: string) {
    if (this.readOnlyFlag) return false
    if (value === 'conditionIdSelect') {
      this.isConditionalData = {
        type: 'not',
        condition: {
          type: 'equal',
          fieldName: '${' + this.conditionalId + '}',
          value: null,
        },
      };
    } else if (value === 'Conditional') {
      this.isMandatory = undefined;
      this.isConditional = true;
    } else if (value === 'Mandatory') {
      this.isConditional = false;
      this.isConditionalData = undefined;
      this.isMandatory = this.elData.find(x => x.name === 'IS_NOT_NULL');
    } else if (value === 'Optional') {
      this.isConditional = false;
      this.isConditionalData = undefined;
      this.isMandatory = undefined;
    }
  }

  public extractDataChange(parse: boolean) {
    if (this.readOnlyFlag) return false
    if (!this.dependentSource) {
      if (parse) {
        this.isExtract = true;
      } else {
        this.isExtract = false;
      }
      this.itemList.isExtract = parse;
    }
  }
  public saveConditionalData(condition) {
    this.isConditionalData = condition.condition;
    this.addCondition = false;
  }

  public addBlockStep(block) {
    if (this.isExtract) {
      block.push({ name: 'Step', value: null, params: [] });
    } else {
      this.itemList.blockStepList.push({
        name: 'Step',
        operator: '',
        value: '',
      });
    }
  }

  public removeBlockStep(index: number, block) {
    if (this.isExtract) {
      block.pop();
    } else {
      this.itemList.blockStepList.splice(index, 1);
    }
  }

  collapseBlockList(item) {
    item.collapse = !item.collapse
  }

  public addBlockList() {
    this.blockList.push({
      formatList: [{ operator: '', value: '' }],
      IMFvalue: null,
      IPCvalue: null,
      function: [],
      transformArray: [],
      PostValidation: [],
      validationFunction: [],
      collapse: true
    });
  }
  public removeBlockList() {
    this.blockList.pop();
  }

  public getClass(param, id, flag) {
    if (param.type === 'list') {
      if (id > 0) {
        if (flag === 'res') {
          return 'col-md-5 listFnMarginRes';
        } else {
          return 'col-md-5 listFnMarginReq';
        }
      } else {
        return 'col-md-5';
      }
    } else {
      return 'col-md-3 ';
    }
  }
  public parmsChange(block) {
    if (block.value.paramCount >= 2) {
      block.dropDownClass = true;
    } else {
      block.dropDownClass = false;
    }
    const parameter = block.value.parameters;
    block.params = [];
    if (parameter) {
      parameter.signature.forEach(param => {
        if (param.type.toLowerCase() === 'list') {
          block.dropDownClass = true;
        }
        if (param.name.indexOf('source') !== -1) {
          block.params.push({
            label: 'source',
            list: this.sourceList,
            name: param.name,
            type: param.type.toLowerCase(),
            value: null,
          });
        } else if (param.name.indexOf('imf') !== -1) {
          block.params.push({
            label: 'imf',
            list: this.imfList,
            name: param.name,
            value: null,
            type: param.type.toLowerCase(),
          });
        } else {
          block.params.push({ name: param.name, value: '', type: param.type.toLowerCase() });
        }
      });
      this.isParms = true;
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
  public requestModel() {
    this.itemList.validationFormatList = [];
    this.itemList.blockStepList = [];
    this.validationFormatPer.name = 'Should confirm to format';
    this.validationFormatPer.operator = null;
    this.validationFormatPer.value = null;
    this.itemList.validationFormatList.push(this.validationFormatPer);
    this.blockStepPer.name = 'Step';
    this.blockStepPer.operator = '=';
    this.blockStepPer.value = this.track2List;
    this.itemList.blockStepList.push(this.blockStepPer);
  }

  public getEditData() {

    if (this.transformItem.length > 0 && this.isRequest) {
      this.conditionCheck = this.transformItem[0].selectedCondition;
      this.isConditionalData = this.transformItem[0].condition;
      if (this.conditionCheck === 'Conditional') {
        this.isConditional = true;
      }
      if (this.transformItem[0].selectedOption === 'copy') {
        this.itemList.isExtract = 'internalFormat';
      } else if (this.transformItem.length === 1 && this.transformItem[0].selectedFormat === 4) {
        this.itemList.isExtract = 'script';
      } else if (
        this.transformItem[0].fieldId ||
        this.transformItem[0].selectedFormat === 3 ||
        this.transformItem[0].selectedOption === 'mapper'
      ) {
        this.itemList.isExtract = 'builtInMapper';
        if (
          this.transformItem[0].fieldId !== this.field.id &&
          this.transformItem[0].type !== 'in_built_mapper'
        ) {
          this.dependentSource = true;
        } else {
          this.dependentSource = false;
        }
      } else if (this.transformItem[0].selectedFormat === 2) {
        this.editExtract();
      }
    }
  }

  public oncancel() {
    this.handleCancel.emit(this.field);
  }

  private insertParameter = (parameter, param, validation, value) => {
    parameter.signature.forEach((signature, index) => {
      if (signature.name !== 'operator') {
        if (signature.name.indexOf('source') !== -1 && validation.parameters) {
          if (signature.type.toLowerCase() === 'list') {
            validation.parameters[0].forEach(signature2 => {
              param.push({
                label: 'source',
                list: this.sourceList,
                name: signature.name,
                value: signature2,
                type: signature.type.toLowerCase(),
              });
            });
          } else {
            param.push({
              label: 'source',
              list: this.sourceList,
              name: signature.name,
              value: validation.parameters[index],
            });
          }
        } else if (signature.name.indexOf('imf') !== -1 && validation.parameters) {
          if (signature.type.toLowerCase() === 'list') {
            validation.parameters[0].forEach(signature2 => {
              const signature1 = signature2.split('].request_message[');
              param.push({
                label: 'imf',
                list: this.imfList,
                name: signature.name,
                value: signature1[1].split(']}')[0],
                // serviceValue: signature1[0].split('[')[1],
                type: signature.type.toLowerCase(),
              });
            });
          } else {
            param.push({
              label: 'imf',
              list: this.imfList,
              name: signature.name,
              value: validation.parameters[index],
            });
          }
        } else {
          if (signature.type.toLowerCase() === 'list') {
            validation.parameters[0].forEach(signature2 => {
              param.push({
                name: signature.name,
                value: signature2,
                type: signature.type.toLowerCase(),
              });
            });
          } else {
            if (value[index + 1]) {
              param.push({
                name: signature.name,
                value: value[index + 1],
              });
            } else if (validation.parameters) {
              param.push({
                name: signature.name,
                value: validation.parameters[index],
              });
            }
          }
        }
      }
    });
    return param;
  };

  private editExtract() {
    this.isExtract = true;
    this.itemList.isExtract = 'extractfield';
    this.blockList = [];
    this.transformItem.forEach(item => {
      const imfValue = item.destination[0];
      const ipcValue = item.ipc;
      const postValidation = [];
      const formatListData = [];
      let count = 0;
      if (item.validationFunctions && this.validationList) {
        item.validationFunctions.forEach(validation => {
          if (
            validation.name !== 'IS_NOT_NULL' ||
            (validation.name === 'IS_NOT_NULL' && validation.parameters)
          ) {
            const data = this.validationList.filter(x => x.name === validation.name);
            let param = [];
            if (data && data[0]) {
              const parameter = data[0].parameters;
              let value = [];
              let operatordata;
              if (validation.expression) {
                value = this.getExpValue(validation.expression);
                if (parameter.operator) {
                  operatordata = parameter.operator.filter(
                    x => validation.expression.indexOf(x.label) !== -1,
                  )[0];
                }
              }
              if (parameter) {
                param = this.insertParameter(parameter, param, validation, value);
              }
              postValidation.push({
                operator: operatordata,
                operatorList: parameter.operator,
                params: param,
                validation: data[0],
              });
            }
          }
        });
      }
      const array = [];
      if (item.functions && this.stepList) {
        item.functions.forEach(validation => {
          if (validation.type !== 'value_mapper') {
            const data = this.stepList.find(
              x => x.actionName === validation.execute || x.actionName === validation.functionName,
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
              defaultValue: map.defaultValue,
              mapper: [],
              useSameOnMatchFail: this.stringToBoolean(map.useSameOnMatchFail),
            };
            const data = Object.keys(map.mapping);
            data.forEach((mapping, index) => {
              const formControl1 = new UntypedFormControl(map.mapping[data[index]]);
              mapper.mapper.push({
                formControl: formControl1,
                value1: data[index],
                value2: map.mapping[data[index]],
              });
            });
          }
        });
      }
      if (formatListData.length === 0) {
        formatListData.push({ operator: '', value: '' });
      }
      this.blockList.push({
        customMapper: mapper,
        function: [],
        formatList: formatListData,
        IMFvalue: imfValue,
        IPCvalue: ipcValue,
        PostValidation: postValidation,
        transformArray: array,
        validationFunction: [],
        collapse: true
      });
    });
  }

  private getExpValue = data => {
    let value = data.split('(');
    if (value && value[1]) {
      value = value[1].split(')');
      if (value && value[0]) {
        value = value[0].split(',');
      }
    }
    return value;
  };

  private transformLogic(data) {
    return data.map(item => {
      if (!item.values) {
        item.title = item.lookupvalue;
        item.key = item.lookupvalue;
        item.isLeaf = true;
      } else {
        item.title = item.lookuptype;
        item.key = item.lookuptype;
        item.disabled = true;
      }
      if (item.values) {
        item.children = this.transformLogic(item.values);
      }
      return item;
    });
  }
  public getImfFn(event, flag) {
    if (flag === 'CopyIMF') {
      this.imfValue = JSON.parse(JSON.stringify(event.value));
    } else if (flag === 'extractIMF') {
      this.blockList[event.id].IMFvalue = JSON.parse(JSON.stringify(event.value));
    } else if (flag === 'extractStepsIMF') {
      const idx1 = event.id.split('-')[0];
      const idx2 = event.id.split('-')[1];
      const idx3 = event.id.split('-')[2];
      this.blockList[idx1].transformArray[idx2].params[idx3].value = JSON.parse(
        JSON.stringify(event.value),
      );
    } else if (flag === 'extractStepsResIMF') {
      const idx1 = event.id.split('-')[0];
      const idx2 = event.id.split('-')[1];
      this.resBlockList[idx1].params[idx2].value = JSON.parse(JSON.stringify(event.value));
    }
  }
  public saveMapper(data) {
    if (Array.isArray(data.value)) {
      data.value.forEach(item1 => {
        item1 = this.setConditionValue(item1);
      });
    } else {
      data.value = this.setConditionValue(data.value);
    }
    if (!this.conditionError) {
      if (this.isRequest) {
        this.reqIMFObj.emit(data.value);
      } else {
        this.resIMFObj.emit(data);
      }
      this.isVisible.emit(false);
    }
  }
  public saveCopyReqData(data) {
    console.log(data);
    data = this.setConditionValue(data);
    if (!this.conditionError) {
      this.reqIMFObj.emit(data);
      this.isVisible.emit(false);
    }
  }
  public saveCopyResData(data) {
    data.value = this.setConditionValue(data.value);
    if (!this.conditionError) {
      this.resIMFObj.emit(data);
      this.isVisible.emit(false);
    }
  }
  public saveScript(data) {
    data = this.setConditionValue(data);
    if (!this.conditionError) {
      if (this.isRequest) {
        this.reqIMFObj.emit(data);
      } else {
        this.resIMFObj.emit(data);
      }
      this.isVisible.emit(false);
    }
  }
  public saveJoinMapper(data) {
    data.value = this.setConditionValue(data.value);
    if (!this.conditionError) {
      this.resIMFObj.emit(data);
      this.isVisible.emit(false);
    }
  }
  private setConditionValue(item1) {
    this.conditionError = false;
    const selectedConditionvalue = this.selectedConditionFunction();
    if (this.isRequest) {
      item1.selectedCondition = this.conditionCheck;
    } else {
      item1.selectedCondition = this.reqConditionCheck;
    }
    if (item1.type !== 'imdg_enrich') {
      if (item1.validationFunctions) {
        item1.validationFunctions = item1.validationFunctions.filter(
          validation =>
            validation.name !== 'IS_NOT_NULL' ||
            (validation.name === 'IS_NOT_NULL' && validation.parameters),
        );
      } else if (item1.selectedOption !== 'script') {
        item1.validationFunctions = [];
      }
      item1.condition = undefined;
      if (item1.selectedCondition === 'Mandatory' && item1.selectedOption !== 'script') {
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

  private selectedConditionFunction() {
    let returnCondition;
    let reqConditionCheck = this.reqConditionCheck;
    if (this.isRequest) {
      reqConditionCheck = this.conditionCheck;
    }
    if (reqConditionCheck === 'Mandatory') {
      this.elData.forEach(x => {
        if (x.name === 'IS_NOT_NULL') {
          returnCondition = x;
        }
      });
    } else if (reqConditionCheck === 'Conditional') {
      if (this.isRequest) {
        returnCondition = this.isConditionalData;
      } else {
        returnCondition = this.resConditionalData;
      }
    }
    return returnCondition;
  }

  public concatFn(params, name) {
    if (name.indexOf('source') !== -1) {
      params.push({
        label: 'source',
        list: this.sourceList,
        name: name,
        type: 'list',
        value: null,
      });
    } else if (name.indexOf('imf') !== -1) {
      params.push({
        label: 'imf',
        list: this.imfList,
        name: name,
        value: null,
        type: 'list',
      });
    } else {
      params.push({ name: name, value: '', type: 'list' });
    }
  }
  public popConcatFn(params) {
    params.pop();
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

  public addCustomMap(item) {
    const formControl1 = new UntypedFormControl();
    item.customMapper = {
      defaultValue: '',
      mapper: [{ value1: null, value2: null, formControl: formControl1 }],
      useSameOnMatchFail: true,
    };
  }
  public removeCustomMap(item) {
    item.customMapper = undefined;
  }
  public addMap(item) {
    const formControl1 = new UntypedFormControl();
    item.mapper.push({ value1: null, value2: null, formControl: formControl1 });
  }
  public removemMap(item) {
    item.mapper.pop();
  }
  public addValidation(item) {
    item.push({
      operator: null,
      operatorList: [],
      params: [],
      validation: null,
    });
  }
  public removeValidation(item) {
    item.pop();
  }

  public save() {
    let imfExp: any;
    imfExp = JSON.parse(this.adapterDataMap.req_blank_structure_field);
    if (this.isRequest) {
      if (this.conditionCheck === 'Mandatory' && !this.isMandatory) {
        this.isConditional = false;
        this.isConditionalData = undefined;
        this.isMandatory = this.elData.find(x => x.name === 'IS_NOT_NULL');
      }
      if (this.conditionCheck === 'Conditional' && !this.isConditionalData) {
        this.conditionError = true;
      } else {
        this.conditionError = false;
      }
      if (!this.conditionError) {
        imfExp.source = '${' + this.field.id + '}';
        this.reqIMF[this.field.id] = [];
        if (this.isExtract) {
          this.saveExtract(imfExp);
        }
      }
    } else {
      const selectedConditionvalue = this.selectedConditionFunction();
      if (this.resRadioModel === 'operationField') {
        this.saveResponseMapping(imfExp, selectedConditionvalue);
      }
    }
  }

  private saveExtract(imfExp) {
    const array = [];
    this.extractError = false;
    this.blockList.forEach(item => {
      let imfvalue = item.IMFvalue;
      if (item.IMFvalue && item.IMFvalue.value) {
        imfvalue = item.IMFvalue.value;
      }
      if (item.IPCvalue && imfvalue) {
        item.transformArray.forEach(item1 => {
          if (item1.function) {
            item.function.push(item1.function);
          }
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
        item.validationFunction = this.savePostValidation(
          item.PostValidation,
          item.validationFunction,
        );
        //imfExp.validationFunctions = item.validationFunction;
        imfExp.validationFunctions = (this.conditionCheck !== 'Optional') ? item.validationFunction : [];
        imfExp.functions = item.function;
        if (item.IPCvalue.value) {
          imfExp.ipc = item.IPCvalue.value;
        } else {
          imfExp.ipc = item.IPCvalue;
        }
        array.push({
          destination: [imfvalue],
          ipc: imfExp.ipc,
          condition: this.isConditionalData,
          selectedCondition: this.conditionCheck,
          source: imfExp.source,
          type: 'field',
          validationFunctions: imfExp.validationFunctions,
          functions: imfExp.functions,
          selectedFormat: 2,
        });
      } else {
        this.extractError = true;
      }
    });
    if (!this.extractError) {
      this.isVisible.emit(false);
      this.reqIMFObj.emit(array);
    }
  }

  private savePostValidation(Postvalidation, validationFunctions) {
    Postvalidation.forEach(item1 => {
      const Data = item1.validation;
      let flag = true;
      if (Data) {
        if (Data.expression) {
          Data.expression = Data.expression.replace('#fieldNo', this.field.id);
          if (item1.operator) {
            Data.expression = Data.expression.replace('#operator', item1.operator.expression);
          }
          item1.params.forEach(param => {
            if (!param.value) {
              flag = false;
            }
            Data.expression = Data.expression.replace('#' + param.name, param.value);
          });
          if (flag) {
            validationFunctions.push({
              name: Data.name,
              type: Data.expType,
              expression: Data.expression,
            });
          }
        } else if (!Data.expression) {
          const a = [];
          item1.params.forEach(param => {
            if (!param.value) {
              flag = true;
              param.value = null;
            }
            a.push(param.value);
          });
          if (flag) {
            validationFunctions.push({
              name: Data.name,
              type: Data.expType,
              parameters: a,
            });
          }
        }
      }
    });
    if (this.isMandatory) {
      validationFunctions.push({
        name: this.isMandatory.name,
        type: this.isMandatory.expType,
      });
    }
    return validationFunctions;
  }

  private saveResponseMapping(imfExp, selectedConditionvalue) {
    imfExp.functions = [];
    this.responseError = false;
    if (
      this.resImfValue &&
      this.selectedService &&
      this.selectedService.value &&
      this.selectedType &&
      this.ipcValue &&
      this.useCase == 3
    ) {
      let destination = null
      if (this.field.id.indexOf('http_headers[') > -1) {
        destination =
          '${' + this.field.id + '}';
      } else {
        destination =
          '${message_exchange[GATEWAY_SERVICE].native_response_message[' + this.field.id + ']}';
      }
      if (this.useCase === '1') {
        imfExp.source = '${' + this.resImfValue + '}';
        imfExp.destination = [destination];
      } else if (this.useCase === '2') {
        imfExp.source =
          '${message_exchange[' + this.selectedService.value + '].' + this.resImfValue + '}';
        imfExp.destination = [destination];
        imfExp.destination[1] = '${message_exchange[GATEWAY_SERVICE].' + this.resImfValue + '}';
      } else {
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
          '${message_exchange[GATEWAY_SERVICE].response_message[' + this.resImfValue + ']}';
      }
      if (this.ipcValue.value) {
        imfExp.ipc = this.ipcValue.value;
      } else {
        imfExp.ipc = this.ipcValue;
      }
      if (this.resRadioModel === 'operationField') {
        // imfExp.functions = this.saveFunctionData(this.resBlockList);
        this.resBlockList.forEach(fn => {
          imfExp.functions.push(fn.function);
        });
        if (this.resCustomMapper) {
          let map;
          this.resCustomMapper.mapper.map(mapper => {
            if (!map) {
              map = {};
            }
            if (mapper.value1 && mapper.value2) {
              map[mapper.value2] = mapper.value1;
            }
            return mapper;
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
      }
      imfExp.validationFunctions = [];
      this.extractResValidation.forEach(item1 => {
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

      if (this.rawDestination) {
        imfExp.rawDestination = imfExp.destination[1];
        imfExp.destination.pop();
      }
      imfExp = this.setConditionValue(imfExp);
      if (this.conditionError) {
        this.responseError = true;
      }
      imfExp.selectedOption = this.resRadioModel;
      imfExp.useCase = this.useCase;
      imfExp.fieldId = this.field.id;
      if (!this.responseError) {
        this.resIMFObj.emit({
          selectedOption: this.resRadioModel,
          value: imfExp,
        });
        this.isVisible.emit(false);
      }
    } else if (
      this.resImfValue &&
      this.selectedService &&
      this.selectedService.value &&
      this.ipcValue &&
      this.useCase == 2
    ) {
      const destination =
        '${message_exchange[GATEWAY_SERVICE].native_response_message[' + this.field.id + ']}';
      imfExp.source =
        '${message_exchange[' + this.selectedService.value + '].' + this.resImfValue + '}';
      imfExp.destination = [destination];
      imfExp.destination[1] = '${message_exchange[GATEWAY_SERVICE].' + this.resImfValue + '}';
      if (this.ipcValue.value) {
        imfExp.ipc = this.ipcValue.value;
      } else {
        imfExp.ipc = this.ipcValue;
      }
      if (this.resRadioModel === 'operationField') {
        this.resBlockList.forEach(fn => {
          imfExp.functions.push(fn.function);
        });
        if (this.resCustomMapper) {
          let map;
          this.resCustomMapper.mapper.map(mapper => {
            if (!map) {
              map = {};
            }
            if (mapper.value1 && mapper.value2) {
              map[mapper.value2] = mapper.value1;
            }
            return mapper;
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
      }
      imfExp.validationFunctions = [];
      this.extractResValidation.forEach(item1 => {
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
      if (this.rawDestination && this.useCase !== '1') {
        imfExp.rawDestination = imfExp.destination[1];
        imfExp.destination.pop();
      }
      imfExp = this.setConditionValue(imfExp);
      if (this.conditionError) {
        this.responseError = true;
      }
      imfExp.selectedOption = this.resRadioModel;
      imfExp.useCase = this.useCase;
      imfExp.fieldId = this.field.id;
      if (!this.responseError) {
        this.resIMFObj.emit({
          selectedOption: this.resRadioModel,
          value: imfExp,
        });
        this.isVisible.emit(false);
      }
    } else if (this.resImfValue && this.ipcValue && this.useCase == 1) {
      const destination =
        '${message_exchange[GATEWAY_SERVICE].native_response_message[' + this.field.id + ']}';
      imfExp.source = '${' + this.resImfValue + '}';
      imfExp.destination = [destination];
      if (this.ipcValue.value) {
        imfExp.ipc = this.ipcValue.value;
      } else {
        imfExp.ipc = this.ipcValue;
      }
      if (this.resRadioModel === 'operationField') {
        this.resBlockList.forEach(fn => {
          imfExp.functions.push(fn.function);
        });
        if (this.resCustomMapper) {
          let map;
          this.resCustomMapper.mapper.map(mapper => {
            if (!map) {
              map = {};
            }
            if (mapper.value1 && mapper.value2) {
              map[mapper.value2] = mapper.value1;
            }
            return mapper;
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
      }
      imfExp.validationFunctions = [];
      this.extractResValidation.forEach(item1 => {
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

      if (this.rawDestination && this.useCase !== '1') {
        imfExp.rawDestination = imfExp.destination[1];
        imfExp.destination.pop();
      }
      imfExp = this.setConditionValue(imfExp);
      if (this.conditionError) {
        this.responseError = true;
      }
      imfExp.selectedOption = this.resRadioModel;
      imfExp.useCase = this.useCase;
      imfExp.fieldId = this.field.id;
      if (!this.responseError) {
        this.resIMFObj.emit({
          selectedOption: this.resRadioModel,
          value: imfExp,
        });
        this.isVisible.emit(false);
      }
    } else {
      this.responseError = true;
    }
  }

  public saveResConditionalData(condition) {
    this.resConditionalData = condition.condition;
    this.addCondition = false;
  }

  public selectImfFn(value) {
    this.resImfValue = value.split('%')[0];
    this.useCase = value.split('%')[1];
    if (this.useCase === '1') {
      if (this.serviceList) {
        this.selectedService = this.serviceList.find(x => x.value === 'GATEWAY_SERVICE');
      }
    }
    if (this.useCase === '1' || this.useCase === '2') {
      this.selectedType = 'response';
    }
  }

  public addResBlockStep(block) {
    block.push({ name: 'Step', value: null, params: [] });
  }

  public removeResBlockStep(block) {
    block.pop();
  }
  public addResCustomMap() {
    const formControl1 = new UntypedFormControl();
    this.resCustomMapper = {
      mapper: [{ value1: null, value2: null, formControl: formControl1 }],
      defaultValue: '',
      useSameOnMatchFail: true,
    };
  }
  public removeResCustomMap() {
    this.resCustomMapper = undefined;
  }
  public addResMap(resCustomMapper) {
    const formControl1 = new UntypedFormControl();
    resCustomMapper.mapper.push({
      formControl: formControl1,
      value1: null,
      value2: null,
    });
  }
  public removemResMap(resCustomMapper) {
    resCustomMapper.mapper.pop();
  }

  public stepFunction(data, a, i, flag = true, flag2 = true) {
    if (flag) {
      if (flag2) {
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
    } else {
      if (flag2) {
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
    }
    if (data.parameters && data.parameters.length === 0 && this.isRequest) {
      this.addParam(this.selectedStepParameter);
    } else if (data.parameters && data.parameters.length === 0 && !this.isRequest) {
      this.addResParam(this.selectedStepParameter);
    } else {
      this.showAddParamPopup = true;
    }
  }

  public closeParamPopup(event) {
    if (event.data.parametersOptional == false) {
      if (!this.isRequest) {
        if (!this.resBlockList[event.index2].function) {
          delete this.resBlockList[event.index2];
        }
        this.resBlockList = this.resBlockList.filter(x => x && x !== null);
      } else {
        if (!this.blockList[event.index].transformArray[event.index2].function) {
          delete this.blockList[event.index].transformArray[event.index2];
        }
        this.blockList[event.index].transformArray = this.blockList[
          event.index
        ].transformArray.filter(x => x && x !== null);
      }
    } else {
      if (!this.isRequest) {
        this.addResParam(event);
      } else {
        this.addParam(event);
      }
    }
    this.showAddParamPopup = false;
  }

  public addParam(event) {
    this.showAddParamPopup = false;
    this.blockList[event.index].transformArray[event.index2].function = event.param;
    if (event.data.type === 'execute_function') {
      this.blockList[event.index].transformArray[event.index2].function = {
        type: event.data.type,
        execute: event.data.actionName,
        parameters: event.param,
      };
    }
  }

  public addResParam(event) {
    this.showAddParamPopup = false;
    if (event.data.type === 'execute_function') {
      this.resBlockList[event.index2].function = {
        type: event.data.type,
        execute: event.data.actionName,
        parameters: event.param,
      };
    }
  }
}
