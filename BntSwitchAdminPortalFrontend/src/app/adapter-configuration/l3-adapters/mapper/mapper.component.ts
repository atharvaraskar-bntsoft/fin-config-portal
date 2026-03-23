import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { UntypedFormControl } from '@angular/forms';
import { GetLookUpValue } from '@app/store/actions/look-up-configuration.action';
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
  selector: 'app-mapper',
  styleUrls: ['./mapper.component.scss'],
  templateUrl: './mapper.component.html',
})
export class MapperComponent implements OnInit {
  @Input() public transformItem: any;
  @Input() public transformActionItemRes: any = [];
  @Input() public scheme: any;
  @Input() public field: any;
  @Input() public type: any;
  @Input() public selectedTransactionType: any;
  @Input() public isRequest: any;
  @Input() public imfId: any;
  @Input() public elData = [];
  @Input() public mapperList = [];
  @Input() public templateId;
  @Input() public authData;
  @Input() public networkService;
  @Input() public readOnlyFlag = false;
  @Input() public isArray:boolean;
  public mapperListTemp = [];
  public sourceList = [];
  public dependentSource = false;
  public conditionCheck = 'Mandatory';
  public lookupList = [];
  public lookupmodel = [];
  public lookupvalueList = [];
  // public schemeList: any;
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
  public assingeValueList: any;
  public adapterDataMap: any;
  public imfList: any;
  public ipcList: any;
  public conditionalList: any;
  public conditionalId;
  public showTree = false;
  public resCustomMapper;
  public numberOpraters: any = [
    { text: '== equals', value: '==' },
    { text: '!= not equals', value: '!=' },
    { text: '> greater than', value: '>' },
    { text: '< less than', value: '<' },
  ];
  public rawDestination = false;
  public operatorList;
  public isMandatory: any;
  public isInBuildMapper = true;
  public isExtract = false;
  public isConditional = false;
  public isConditionalData;
  public isParms = false;
  public stepParms1: string;
  public stepParms2: string;
  public postLength: any;
  public postOperator: any;
  public stepValue: any;
  public stepOprator: any;
  public postName: any;
  public imfValue: any;
  public ipcValue: any;
  public resValidation: any;
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
    collapse: false
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

  public schemeImfMapper = {
    fieldId: null,
    fieldType: null,
    id: null,
    imfExpression: null,
    responseImfLeg: null,
  };
  public imfVersionList = [];
  public imfVersion;
  public getIMFData;
  public disabled = false;
  public internalFormatError = false;
  public singleDestination = false;
  public extractError = false;
  public responseError = false;
  public blockList: any;
  componetDestroyed = new Subject();
  public reqIMF = [];
  @Input() public jsonData;
  public isAttribute = [];
  public resImfValue;
  public resIMF = [];
  public inBuiltMapperList;
  public builtInMapperValue;
  public builtInMapperValue1;
  @Output() public isVisible = new EventEmitter<boolean>();
  @Output() public reqIMFObj = new EventEmitter<Object>();
  @Output() public resIMFObj = new EventEmitter<Object>();
  @Output() public resIMFLeg = new EventEmitter<Object>();
  @Output() public handleCancel = new EventEmitter<Object>();
  public resRadioModel = 'copyField';
  public resBlockList: any;
  public selectedType: any;
  public TrackOperatorList;
  public builtInError = false;
  public mapperParam = [];
  public scriptError = false;
  public scriptText = '';
  public selectedMapper;
  public selectedMapperParam = [];
  public mapperError;
  public useCase;
  public copyResImfValue;
  public copyUseCase;
  public copySelectedService;
  public copySelectedType;
  public copyIpcValue;
  public copyResponseError = false;
  public dropDownClass: boolean;
  public extractResValidation = [];
  public sorces = [];
  public copyResValidation = [];
  public concatList = [];
  public reqConditionCheck = 'Optional';
  @Input() public contextImf = [];
  public addCondition = false;
  public resConditionalData;

  public showAddParamPopup = false;
  public selectedStepParameter = {};
  @Input() stepList = [];
  // public resBlockFunction = [];
  public showAllData = true;
  public conditionError = false;
  public stepListFilter = [];
  constructor(private _store: Store<IAppState>) {
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
    this.resBlockList = [];
    if (this.stepList && this.isRequest) {
      this.stepList = this.stepList.filter(item => item.request);
    } else if (this.stepList && !this.isRequest) {
      this.stepList = this.stepList.filter(item => item.response);
    }
  }

  collapseBlockList(item) {
    item.collapse = !item.collapse
  }

  showParamPopup(event) {
    this.showAddParamPopup = event;
  }

  ngOnInit() {
    console.log(this.isArray);
    if (this.imfId) {
      this._store.dispatch(new GetIMF(this.imfId));
    }
    this.elData.forEach(x => {
      if (x.subType === 'validation') {
        if (x.parameters && typeof x.parameters === 'string') {
          x.parameters = JSON.parse(x.parameters);
        }
        this.validationList.push(x);
      } else if (x.subType === 'transform') {
        if (x.parameters && typeof x.parameters === 'string') {
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
    // this.disabled = false;
    this.isMandatory = this.elData.find(x => x.name === 'IS_NOT_NULL');
    if (!this.disabled && this.transformItem && this.isRequest) {
      this.getEditData();
    } else if (!this.disabled && this.transformActionItemRes && !this.isRequest) {
      this.editResponseData();
    }
    if (!this.transformActionItemRes || this.transformActionItemRes.length === 0) {
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

  public changeScheme(e) {
    this.fieldList = [];
    this._store.dispatch(new GetField(e.id));
  }

  public changeField() {
    this.isMandatory = this.validationList.filter(x => x.name === 'isMandatory')[0];
    this.isMandatory.expression = this.isMandatory.expression.replace('#fieldNo', this.field.id);
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
        serviceValue: null,
        type: 'list',
      });
    } else {
      params.push({ name: name, value: '', type: 'list' });
    }
  }

  public popConcatFn(params) {
    params.pop();
  }

  public getClass(param, id, flag) {
    if (param.type === 'list') {
      if (id > 0) {
        if (flag === 'res') {
          return 'col-md-5 listFnMarginRes listWidth';
        } else {
          return 'col-md-5 listFnMarginReq ';
        }
      } else {
        if (flag === 'res') {
          return 'col-md-5 listWidth';
        } else {
          return 'col-md-5 ';
        }
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

  public mapperChange(mapper: boolean) {
    if (mapper) {
      this.isInBuildMapper = true;
    } else {
      this.isInBuildMapper = false;
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

  public fieldPresenceChange(value: string) {
    if(this.readOnlyFlag) return false;
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

  public addBlockStep(block) {
    block.push({ name: 'Step', value: null, params: [], function: null });
  }

  public removeBlockStep(index: number, block) {
    block.splice(index, 1);
  }

  public addValidationFormat(item) {
    if (this.isExtract) {
      item.push({ operator: '', value: '' });
    } else {
      this.itemList.validationFormatList.push({
        name: 'Should confirm to format',
        operator: '',
        value: '',
      });
    }
  }

  public removeValidationFormat(item, index: number) {
    item.splice(index, 1);
  }

  radioChange(event) {
    if(this.readOnlyFlag) return false
    this.singleDestination = false;
    this.rawDestination = false;
  }

  public save() {
    let imfExp: any;
    if (this.isRequest) {
      const selectedConditionvalue = this.selectedConditionFunction();
      if (this.resRadioModel === 'operationField') {
        this.saveResponseMapping(imfExp, selectedConditionvalue);
      }
    } else {
      imfExp = JSON.parse(this.adapterDataMap.req_blank_structure_field);
      imfExp.source = '${' + this.field.id + '}';
      this.reqIMF[this.field.id] = [];
      if (this.isExtract) {
        this.saveExtract(imfExp);
      }
    }
  }

  public editResponseData() {
    if (this.transformActionItemRes.length > 0 && !this.isRequest) {
      this.conditionCheck = this.transformActionItemRes[0].selectedCondition;
      this.fieldPresenceChange(this.conditionCheck);
      this.isConditionalData = this.transformActionItemRes[0].condition;
      if (
        this.isConditionalData &&
        this.isConditionalData.condition &&
        this.isConditionalData.condition.fieldName
      ) {
        this.isConditional = true;
        this.conditionalId = this.isConditionalData.condition.fieldName.split('{')[1].split('}')[0];
      }
      if (
        this.transformActionItemRes[0].selectedFormat === 1 ||
        this.transformActionItemRes[0].selectedOption === 'copy'
      ) {
        this.itemList.isExtract = 'internalFormat';
      } else if (
        this.transformActionItemRes.length === 1 &&
        this.transformActionItemRes[0].selectedFormat === 4
      ) {
        this.editScript();
      } else if (
        this.transformActionItemRes[0].fieldId ||
        this.transformActionItemRes[0].selectedOption === 'mapper' ||
        this.transformActionItemRes[0].selectedFormat === 3
      ) {
        this.editBuiltInMapper();
      } else {
        this.editExtract();
      }
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
      collapse: true
    });
  }

  public removeBlockList() {
    this.blockList.pop();
  }

  public selectImfFn(value) {
    if (this.resRadioModel === 'operationField') {
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
    } else {
      this.copyResImfValue = value.split('%')[0];
      this.copyUseCase = value.split('%')[1];
      if (this.copyUseCase == 1) {
        if (this.serviceList) {
          this.copySelectedService = this.serviceList.find(x => x.value === 'GATEWAY_SERVICE');
        }
      }
      if (this.copyUseCase == 1 || this.copyUseCase === '2') {
        this.copySelectedType = 'response';
      }
    }
  }

  public getOperator(value, postValid) {
    const parameter = value.parameters;
    if (parameter) {
      if (value.subType === 'format') {
        this.TrackOperatorList = parameter.operator;
        postValid.operator = this.TrackOperatorList[0];
      } else {
        this.operatorList = parameter.operator;
        this.postOperator = this.operatorList[0];
        const param = parameter.signature.filter(
          x => x.name !== 'operator' && x.name !== 'fieldNo',
        );
        if (param.length > 0) {
          this.isParms = true;
        } else {
          this.isParms = false;
        }
      }
    }
  }
  public showDiv() {
    this.showTree = true;
  }
  public hideDiv() {
    this.showTree = false;
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

  public getlookupvalue(id, block) {
    block.value2 = null;
    this.lookupvalueList = [];
    this._store.dispatch(new GetLookUpValue(id));
    this._store
      .pipe(takeUntil(this.componetDestroyed), select(selectLookUpValue))
      .subscribe((data: any) => {
        if (data && data.data) {
          this.lookupvalueList = data.data.lookupValueList;
        }
      });
  }

  public setValue(e, block) {
    block.value2 = e.value;
  }

  public selectMapper(flag) {
    this.mapperParam = [];
    let data;
    if (flag === 'edit' || flag === 'builtin') {
      if (this.transformActionItemRes[0].parametersUi) {
        data = this.transformActionItemRes[0].parametersUi.signature;
      }
    } else {
      this.builtInMapperValue = JSON.parse(JSON.stringify(flag));
      if (this.builtInMapperValue.parametersUi && this.builtInMapperValue.parametersUi.signature) {
        data = this.builtInMapperValue.parametersUi.signature;
      }
    }
    if (data && flag !== 'builtin') {
      data.forEach(item1 => {
        if (item1.name.indexOf('source') !== -1) {
          this.mapperParam.push({
            name: 'source',
            value: item1.value,
            list: this.sourceList,
            replacestring: item1.replacestring,
            label: item1.name,
          });
        } else if (item1.name.indexOf('imf') !== -1) {
          this.mapperParam.push({
            name: 'imf',
            value: item1.value,
            list: this.imfList,
            replacestring: item1.replacestring,
            label: item1.name,
          });
        } else {
          this.mapperParam.push({
            name: item1.type,
            value: item1.value,
            list: null,
            replacestring: item1.replacestring,
            label: item1.name,
          });
        }
      });
    } else if (data && flag === 'builtin') {
      data.forEach((item1, index) => {
        if (item1.name.indexOf('source') !== -1) {
          const source = this.transformActionItemRes[0].parameters[index]
            .split('{')[1]
            .split('}')[0];
          this.mapperParam.push({
            name: 'source',
            value: source,
            list: this.sourceList,
            replacestring: item1.replacestring,
            label: item1.name,
          });
        } else if (item1.name.indexOf('imf') !== -1) {
          let value = this.transformActionItemRes[0].parameters[index];
          this.mapperParam.push({
            name: 'imf',
            value: value,
            list: this.imfList,
            replacestring: item1.replacestring,
            label: item1.name,
          });
        } else {
          this.mapperParam.push({
            name: item1.type,
            value: this.transformActionItemRes[0].parameters[index],
            list: null,
            replacestring: item1.replacestring,
            label: item1.name,
          });
        }
      });
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

  public removeResCustomMap() {
    this.resCustomMapper = undefined;
  }

  public addResMap(resCustomMapper) {
    const formControl = new UntypedFormControl();
    resCustomMapper.mapper.push({
      value1: null,
      value2: null,
      formControl: formControl,
    });
  }

  public removemResMap(resCustomMapper) {
    resCustomMapper.mapper.pop();
  }

  public editMapper(data) {
    this.dependentSource = false;
    if (!data.type) {
      if (data[0].fieldId !== this.field.id) {
        this.dependentSource = true;
      }
    }
  }

  public oncancel() {
    this.handleCancel.emit(this.field);
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
        if (this.conditionError) {
          this.extractError = true;
        }
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
        });
      } else {
        this.extractError = true;
      }
    });
    if (!this.extractError && !this.conditionError) {
      this.isVisible.emit(false);
      this.resIMFObj.emit(array);
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
      const destination =
        '${message_exchange[' +
        this.networkService +
        '].native_request_message[' +
        this.field.id +
        ']}';
      if (this.useCase === '1') {
        imfExp.source = '${' + this.resImfValue + '}';
        imfExp.destination = [destination];
      }
      else if (this.useCase == 2) {
        imfExp.source =
          '${message_exchange[' + this.selectedService.value + '].' + this.resImfValue + '}';
        imfExp.destination = [destination];
        imfExp.destination[1] =
          '${message_exchange[' + this.networkService + '].' + this.resImfValue + '}';
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
          '${message_exchange[' +
          this.networkService +
          '].request_message[' +
          this.resImfValue +
          ']}';
      }
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
      if (this.conditionError) {
        this.responseError = true;
      }
      imfExp.selectedOption = this.resRadioModel;
      imfExp.useCase = this.useCase;
      imfExp.fieldId = this.field.id;

      if (this.rawDestination && this.useCase !== '1') {
        imfExp.rawDestination = imfExp.destination[1];
        imfExp.destination.pop();
      }
      if (!this.responseError) {
        this.reqIMFObj.emit({
          selectedOption: this.resRadioModel,
          value: imfExp,
        });
        this.isVisible.emit(false);
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
      if (this.useCase == 1) {
        imfExp.source = '${' + this.resImfValue + '}';
        imfExp.destination = [destination];
      }
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
      if (this.conditionError) {
        this.responseError = true;
      }
      imfExp.selectedOption = this.resRadioModel;
      imfExp.useCase = this.useCase;
      imfExp.fieldId = this.field.id;

      if (this.rawDestination && this.useCase !== '1') {
        imfExp.rawDestination = imfExp.destination[1];
        imfExp.destination.pop();
      }
      if (!this.responseError) {
        this.reqIMFObj.emit({
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
      imfExp = JSON.parse(this.adapterDataMap.res_blank_structure_field);
      imfExp.functions = [];
      const destination =
        '${message_exchange[' +
        this.networkService +
        '].native_request_message[' +
        this.field.id +
        ']}';
      if (this.useCase == 1) {
        imfExp.source = '${' + this.resImfValue + '}';
        imfExp.destination = [destination];
      }
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
      if (this.conditionError) {
        this.responseError = true;
      }
      imfExp.selectedOption = this.resRadioModel;
      imfExp.useCase = this.useCase;
      imfExp.fieldId = this.field.id;

      if (this.rawDestination && this.useCase !== '1') {
        imfExp.rawDestination = imfExp.destination[1];
        imfExp.destination.pop();
      }
      if (!this.responseError) {
        this.reqIMFObj.emit({
          selectedOption: this.resRadioModel,
          value: imfExp,
        });
        this.isVisible.emit(false);
      }
    } else {
      this.responseError = true;
    }
  }

  private editScript() {
    this.itemList.isExtract = 'script';
  }

  private editBuiltInMapper() {
    this.itemList.isExtract = 'builtInMapper';
    if (
      this.transformActionItemRes[0].fieldId !== this.field.id &&
      this.transformActionItemRes[0].type !== 'in_built_mapper'
    ) {
      this.dependentSource = true;
    } else {
      this.dependentSource = false;
    }
  }

  private getEditData() {
    this.resBlockList = [];
    if (this.transformItem) {
      this.resRadioModel = this.transformItem.selectedOption;
      this.reqConditionCheck = this.transformItem.selectedCondition;
      this.fieldPresenceChange(this.reqConditionCheck);
      if (this.reqConditionCheck === 'Conditional') {
        this.resConditionalData = this.transformItem.condition;
      }
      if (this.resRadioModel === 'copyField') {
        this.singleDestination = this.transformItem.destination.length === 1 ? true : false;
      } else if (this.resRadioModel === 'operationField') {
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
      } else if (this.resRadioModel === 'mapper') {
        if (this.transformItem.value) {
          if (this.transformItem.value.selectedCondition) {
            this.reqConditionCheck = this.transformItem.value.selectedCondition;
            if (this.reqConditionCheck === 'Conditional') {
              this.resConditionalData = this.transformItem.value.condition;
            }
          } else {
            this.reqConditionCheck = this.transformItem.value[0].selectedCondition;
            if (this.reqConditionCheck === 'Conditional') {
              this.resConditionalData = this.transformItem.value[0].condition;
            }
          }
          this.editMapper(this.transformItem.value);
        }
      }
    }
  }

  saveReqData(event) {

    this.reqIMFObj.emit(event);
    this.isVisible.emit(false);
  }

  saveResData(event) {

    this.resIMFObj.emit(event);
    this.isVisible.emit(false);
  }

  private editExtract() {
    this.isExtract = true;
    this.itemList.isExtract = 'extractfield';
    this.blockList = [];
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
      });
    });
  }

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

  private selectedConditionFunction() {
    let returnCondition;
    let reqConditionCheck = this.reqConditionCheck;
    if (!this.isRequest) {
      reqConditionCheck = this.conditionCheck;
    }
    if (reqConditionCheck === 'Mandatory') {
      this.elData.forEach(x => {
        if (x.name === 'IS_NOT_NULL') {
          returnCondition = x;
        }
      });
    } else if (reqConditionCheck === 'Conditional') {
      if (!this.isRequest) {
        returnCondition = this.isConditionalData;
      } else {
        returnCondition = this.resConditionalData;
      }
    }
    return returnCondition;
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

  public saveConditionalData(condition) {
    this.isConditionalData = condition.condition;
    this.addCondition = false;
  }
  public saveResConditionalData(condition) {
    this.resConditionalData = condition.condition;
    this.addCondition = false;
  }

  /////imf code
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

  ///new code for step function
  public stepFunction(data, a, i, flag = true, flag1 = true) {
    if (flag) {
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
    } else {
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
    }
    if (data.parameters && data.parameters.length === 0 && this.isRequest) {
      this.addReqParam(this.selectedStepParameter);
    } else if (data.parameters && data.parameters.length === 0 && !this.isRequest) {
      this.addParam(this.selectedStepParameter);
    } else {
      this.showAddParamPopup = true;
    }
  }

  public closeParamPopup(event) {
    if (event.data.parametersOptional == false) {
      if (this.isRequest) {
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
      if (this.isRequest) {
        this.addReqParam(event);
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

  public addReqParam(event) {
    this.showAddParamPopup = false;
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

  public saveJoinMapper(imfExp) {
    const selectedConditionvalue = this.selectedConditionFunction();
    imfExp.selectedCondition = this.reqConditionCheck;
    if (this.reqConditionCheck === 'Mandatory') {
      imfExp.validationFunctions.push({
        name: selectedConditionvalue.name,
        type: selectedConditionvalue.expType,
      });
    } else if (this.reqConditionCheck === 'Conditional') {
      imfExp.condition = selectedConditionvalue;
    }
    this.reqIMFObj.emit({
      selectedOption: this.resRadioModel,
      value: imfExp,
    });
    this.isVisible.emit(false);
  }

  public hideAllFn(event) {
    this.showAllData = event;
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
      if (!this.isRequest) {
        this.resIMFObj.emit(data.value);
      } else {
        this.reqIMFObj.emit(data);
      }
      this.isVisible.emit(false);
    }
  }
  public saveCopyResData(data) {
    data = this.setConditionValue(data);
    if (!this.conditionError) {
      this.resIMFObj.emit(data);
      this.isVisible.emit(false);
    }
  }

  public saveCopyReqData(data) {
    data.value = this.setConditionValue(data.value);
    if (!this.conditionError) {
      this.reqIMFObj.emit(data);
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

  private setConditionValue(item1) {
    this.conditionError = false;
    const selectedConditionvalue = this.selectedConditionFunction();
    if (!this.isRequest) {
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
}
