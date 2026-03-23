import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
@Component({
  selector: 'l1-copy-req-option',
  templateUrl: './request.component.html',
  styleUrls: ['./request.component.scss'],
})
export class L1CopyReqOptionComponent implements OnInit {
  
  @Input() validationList = [];
  @Input() field;
  @Input() sourceList;
  @Input() imfList;
  @Input() ipcList;
  @Input() networkService;
  @Input() isRequest;
  @Input() imfId;
  @Input() readOnlyFlag = false;
  @Input() public copyItem: any;
  @Output() public oncancel = new EventEmitter<boolean>();
  @Output() public copyData = new EventEmitter<Object>();

  public copyPostvalidation = [];
  public ipcValue;
  public imfValue;
  public internalFormatError;
  constructor() {}

  ngOnInit() {
    if (this.copyItem) {
      this.editInternalFormatFn(this.copyItem[0]);
    }
  }
  public addValidation(item) {
    item.push({
      operator: null,
      operatorList: [],
      params: [],
      validation: null,
    });
  }
  public removeValidation(index) {
    this.copyPostvalidation.splice(index, 1);
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

  public getImfFn(event, flag) {
    if (flag === 'CopyIMF') {
      this.imfValue = JSON.parse(JSON.stringify(event.value));
    }
  }

  public saveData() {
    this.internalFormatError = false;
    let validationFunctions = [];
    let imfvalue = this.imfValue;
    if (imfvalue && this.ipcValue) {
      if (this.imfValue.value) {
        imfvalue = this.imfValue.value;
      }
      validationFunctions = this.savePostValidation(this.copyPostvalidation, validationFunctions);
      if (!this.internalFormatError) {
        this.copyData.emit({
          destination: [imfvalue],
          ipc: this.ipcValue,
          source: '${' + this.field.id + '}',
          type: 'field',
          validationFunctions: validationFunctions,
          selectedOption: 'copy',
        });
      }
    } else {
      this.internalFormatError = true;
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
          } else {
            this.internalFormatError = true;
          }
        }
      }
    });
    return validationFunctions;
  }

  private editInternalFormatFn(item) {
    if (item.destination && item.destination[0]) {
      this.imfValue = item.destination[0];
    }
    this.ipcValue = item.ipc;
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
            let operator;
            if (validation.expression) {
              value = this.getExpValue(validation.expression);
              if (parameter.operator) {
                operator = parameter.operator.filter(
                  x => validation.expression.indexOf(x.label) !== -1,
                )[0];
              }
            }
            if (parameter) {
              param = this.insertParameter(parameter, param, validation, value);
            }
            this.copyPostvalidation.push({
              operator: operator,
              operatorList: parameter.operator,
              params: param,
              validation: data[0],
            });
          }
        }
      });
    }
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
              const signature1 = signature2.split('].response_message[');
              param.push({
                label: 'imf',
                list: this.imfList,
                name: signature.name,
                value: signature1[1].split(']}')[0],
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

  public cancel() {
    this.oncancel.emit(false);
  }
}
