import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { SubscribeService } from '@app/services/subscribe.services';
@Component({
  selector: 'l3-copy-req-option',
  templateUrl: './request.component.html',
  styleUrls: ['./request.component.scss'],
})
export class L3CopyReqOptionComponent implements OnInit {
  @Input() validationList = [];
  @Input() field;
  @Input() sourceList;
  @Input() imfList;
  @Input() ipcList;
  @Input() networkService = 'GATEWAY_SERVICE';
  @Input() isRequest;
  @Input() imfId;
  @Input() serviceList;
  @Input() type;
  @Input() jsonData;
  @Input() isMandatory;
  @Input() readOnlyFlag = false;
  @Input() l3Adapter = false;
  @Input() public copyItem: any;
  @Output() public oncancel = new EventEmitter<boolean>();
  @Output() public copyData = new EventEmitter<Object>();

  public typeList = [
    { name: 'Request', value: 'request' },
    { name: 'Response', value: 'response' },
  ];

  public copyResValidation = [];
  public copyIpcValue;
  public copyResImfValue;
  public copyUseCase;
  public copyResponseError;
  public copySelectedService;
  public copySelectedType;
  constructor(private subscribeService: SubscribeService) { }

  ngOnInit() {
    if (this.copyItem && this.copyItem.selectedOption === 'copyField') {
      this.editData(this.copyItem);
    }
    if (this.jsonData) {
      this.jsonData = JSON.parse(JSON.stringify(this.jsonData))
    }
  }


  ngOnChanges(changes: SimpleChanges): void {
    //Called before any other lifecycle hook. Use it to inject dependencies, but avoid any serious work here.
    //Add '${implements OnChanges}' to the class.
    if (this.jsonData) {
      this.jsonData = JSON.parse(JSON.stringify(this.jsonData))
    }

  }

  public selectImfFn(value) {
    this.copyResImfValue = value.split('%')[0];
    this.copyUseCase = value.split('%')[1];
    if (this.copyUseCase === '1') {
      if (this.serviceList) {
        this.copySelectedService = this.serviceList.find(x => x.value === 'GATEWAY_SERVICE');
      }
    }
    if (this.copyUseCase === '1' || this.copyUseCase === '2') {
      this.copySelectedType = 'response';
    }
  }
  public editData(data) {
    this.copyIpcValue = this.copyItem.ipc;
    if (this.copyItem.source.indexOf('_message[') === -1) {
      if (this.copyItem.source.indexOf(']') === -1) {
        this.copyResImfValue = this.copyItem.source.split('{')[1].split('}')[0];
      } else {
        this.copyResImfValue = this.copyItem.source.split('].')[1].split('}')[0];
      }
    } else {
      this.copyResImfValue = this.copyItem.source.split('message[')[1].split(']')[0];
    }
    this.copyUseCase = parseInt(this.copyItem.useCase);
    if (this.serviceList) {
      let service = 'GATEWAY_SERVICE';
      if (this.copyUseCase !== 1) {
        service = this.copyItem.source.split('message_exchange[')[1].split('].')[0];
      }
      const data = this.serviceList.filter(x => x.value === service);
      if (data && data[0]) {
        this.copySelectedService = data[0];
      }
    }
    if (this.copyItem.source.indexOf('request_message') !== -1) {
      this.copySelectedType = 'request';
    } else {
      this.copySelectedType = 'response';
    }
    this.copyResValidation = [];
    if (this.copyItem.validationFunctions && this.validationList) {
      this.copyItem.validationFunctions.forEach(validation => {
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
            this.copyResValidation.push({
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

  public addValidation(item) {
    item.push({
      operator: null,
      operatorList: [],
      params: [],
      validation: null,
    });
  }
  public removeValidation(index) {
    this.copyResValidation.splice(index, 1);
  }

  public save() {
    let imfExp = {
      source: null,
      destination: null,
      ipc: null,
      validationFunctions: null,
      selectedOption: 'copyField',
      useCase: null,
      fieldId: null,
      type: 'field',
    };
    this.copyResponseError = false;
    if (
      this.copyResImfValue &&
      this.copySelectedService &&
      this.copySelectedService.value &&
      this.copySelectedType &&
      this.copyIpcValue
    ) {
      let messageType = 'response_message';
      if (this.isRequest) {
        messageType = 'request_message';
      }

      // let destination =
      //   '${message_exchange[' +
      //   this.networkService +
      //   '].native_' +
      //   messageType +
      //   '[' +
      //   this.field.id +
      //   ']}';

      let destination = null;
      if (this.field.id.indexOf('http_headers[') > -1) {
        destination =
          '${' + this.field.id + '}';
      } else {
        destination =
          '${message_exchange[' +
          this.networkService +
          '].native_' +
          messageType +
          '[' +
          this.field.id +
          ']}';
      }
      // if (this.l3Adapter) {
      //   destination =
      //     '${message_exchange[' +
      //     this.networkService +
      //     '].native_' +
      //     messageType +
      //     '[' +
      //     this.field.id +
      //     ']}';
      // }
      if (this.copyUseCase == 1) {
        imfExp.source = '${' + this.copyResImfValue + '}';
        imfExp.destination = [destination];
      } else if (this.copyUseCase === '2') {
        imfExp.source =
          '${message_exchange[' +
          this.copySelectedService.value +
          '].' +
          this.copyResImfValue +
          '}';
        imfExp.destination = [destination];
        imfExp.destination[1] =
          '${message_exchange[' + this.networkService + '].' + this.copyResImfValue + '}';
      } else {
        (imfExp.source =
          '${message_exchange[' +
          this.copySelectedService.value +
          '].' +
          this.copySelectedType +
          '_message[' +
          this.copyResImfValue +
          ']}'),
          (imfExp.destination = [destination]);
        if (this.type == 'l1') {
          imfExp.destination[1] =
            '${message_exchange[' +
            this.networkService +
            '].' +
            messageType +
            '[' +
            this.copyResImfValue +
            ']}';
        } else {
          imfExp.destination[1] =
            '${message_exchange[' +
            this.networkService +
            '].' +
            messageType +
            '[' +
            this.copyResImfValue +
            ']}';
        }
      }
      if (this.copyIpcValue.value) {
        imfExp.ipc = this.copyIpcValue.value;
      } else {
        imfExp.ipc = this.copyIpcValue;
      }
      imfExp.validationFunctions = [];
      imfExp = this.setValidation(imfExp);
      imfExp.selectedOption = 'copyField';
      imfExp.useCase = this.copyUseCase;
      imfExp.fieldId = this.field.id;
      this.copyData.emit({
        selectedOption: 'copyField',
        value: imfExp,
      });
    } else {
      this.copyResponseError = true;
    }
    this.subscribeService.setServiceType(true);
  }
  public cancel() {
    this.oncancel.emit(false);
  }
  private setValidation(imfExp) {
    this.copyResValidation.forEach(item1 => {
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
