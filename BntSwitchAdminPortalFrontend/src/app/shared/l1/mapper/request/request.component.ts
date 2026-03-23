import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'l1-request-mapper',
  templateUrl: './request.component.html',
  styleUrls: ['./request.component.scss'],
})
export class L1RequestMapperComponent implements OnInit {
  @Input() mapperList = [];
  @Input() field;
  @Input() sourceList;
  @Input() imfList;
  @Input() typeList;
  @Input() serviceList;
  @Input() ipcList;
  @Input() networkService;
  @Input() jsonData;
  @Input() imfId;
  @Input() readOnlyFlag = false
  @Input() dependentSource = false;
  @Input() public isRequest;
  @Input() public mapperItem: any;
  @Output() public oncancel = new EventEmitter<boolean>();
  @Output() public mapperData = new EventEmitter<Object>();
  public mapperType;
  public selectedMapper;
  public selectedMapperParam = [];
  public mapperError = false;
  isSubmit = true;
  isValidvalue = false;

  constructor() {}

  ngOnInit() {
    if (this.mapperItem) {
      if (this.mapperItem.value) {
        this.editMapper(this.mapperItem.value);
      } else {
        this.editMapper(this.mapperItem);
      }
    }
  }

  public getImfFn(event, index, param) {
    this.isValidvalue = false;
    if (event) {
      this.selectedMapperParam[index].value = event.split('%')[0];
      this.selectedMapperParam[index].useCase = event.split('%')[1];
    }
  }

  public getImfFnDb(event, param) {
    this.selectedMapperParam[event.id].value = JSON.parse(JSON.stringify(event.value));
    if (this.selectedMapperParam[event.id].value) {
      this.mapperError = false;
    }
    param.error = false;
  }

  public selectMapperFn(data, type = null, edit = false) {
    if (edit) {
      this.mapperType = type;
    } else {
      this.mapperType = data.type;
    }
    this.isSubmit = false;
    this.selectedMapperParam = [];
    if (data && data.parametersUi && data.parametersUi.signature) {
      this.mapperError = false;
      const signature = JSON.parse(JSON.stringify(data.parametersUi.signature));
      if (data.parameters) {
        signature.forEach((item1, index) => {
          if (item1.name.indexOf('source') !== -1) {
            this.selectedMapperParam.push({
              label: item1.name,
              list: this.sourceList,
              name: 'source',
              value: item1.value,
              transformValue: data.parameters[index],
              error: false,
            });
          } else if (item1.name.indexOf('imf') !== -1) {
            this.selectedMapperParam.push({
              label: item1.name,
              list: this.imfList,
              name: 'imf',
              value: `${item1.value}`,
              useCase: item1.useCase,
              selectedService: item1.selectedService || null,
              selectedType: item1.selectedType || null,
              error: false,
            });
          } else {
            this.selectedMapperParam.push({
              label: item1.name,
              list: null,
              name: item1.type,
              value: data.parameters[index],
              error: false,
            });
          }
        });
      } else {
        signature.forEach(item1 => {
          if (item1.name.indexOf('source') !== -1) {
            this.selectedMapperParam.push({
              label: item1.name,
              list: this.sourceList,
              name: 'source',
              replacestring: item1.replacestring,
              value: item1.value,
              transformValue: item1.transformValue,
              error: false,
            });
          } else if (item1.name.indexOf('imf') !== -1) {
            this.selectedMapperParam.push({
              label: item1.name,
              list: this.imfList,
              name: 'imf',
              replacestring: item1.replacestring,
              value: item1.value,
              useCase: item1.useCase,
              selectedService: item1.selectedService || null,
              selectedType: item1.selectedType || null,
              error: false,
            });
          } else {
            this.selectedMapperParam.push({
              label: item1.name,
              list: null,
              name: item1.type,
              replacestring: item1.replacestring,
              value: item1.value,
              error: false,
            });
          }
        });
      }
    }
  }

  public selectSourceParam(event, param) {
    param.value = event.id;
    param.transformValue = '${' + event.id + '}';
    param.error = false;
  }

  private validation() {
    this.selectedMapperParam = this.selectedMapperParam.map(item => {
      if (this.selectedMapper.type !== 'DBMapper') {
        switch (item.name) {
          case 'source':
            if (item.value) {
              item.error = false;
            } else {
              item.error = true;
            }
            break;
          case 'imf':
            if (item.useCase == 3 && item.value && item.selectedService && item.selectedType) {
              item.error = false;
              this.isValidvalue = false;
            } else if (item.useCase == 2 && item.value && item.selectedService) {
              item.error = false;
              this.isValidvalue = false;
            } else if (item.useCase == 1 && item.value) {
              item.error = false;
              this.isValidvalue = false;
            } else {
              item.error = true;
            }
            break;
          default:
            item.error = false;
            break;
        }
      } else {
        if (item.value) {
          item.error = false;
        } else {
          item.error = true;
        }
      }
      return item;
    });
  }

  public saveMapper() {
    try {
      this.validation();
      this.mapperError = this.selectedMapperParam.find(item => item.error) ? true : false;
      this.isSubmit = this.selectedMapperParam.find(item => item.error) ? true : false;
      this.isValidvalue = this.mapperError;
      console.log(this.isSubmit);
      if (!this.mapperError && this.selectedMapper) {
        const data = JSON.parse(JSON.stringify(this.selectedMapper));
        if (data && data.requestJson) {
          data.requestJson = JSON.stringify(data.requestJson);
          data.parametersUi = JSON.parse(JSON.stringify(data.parametersUi));
          data.requestJson = data.requestJson.replace(
            new RegExp('source_field', 'g'),
            this.field.id,
          );
          if (this.selectedMapper.type === 'DBMapper') {
            this.selectedMapperParam.forEach((item1, index) => {
              data.requestJson = data.requestJson.replace(
                new RegExp(item1.replacestring, 'g'),
                item1.value,
              );
              if (item1.value) {
                data.requestJson = JSON.parse(data.requestJson);
                data.parametersUi.signature[index].value = JSON.parse(JSON.stringify(item1.value));
                data.requestJson = JSON.stringify(data.requestJson);
              } else {
                this.mapperError = true;
              }
            });
            data.requestJson = JSON.parse(data.requestJson);
            data.requestJson.forEach(item1 => {
              item1.fieldId = this.field.id;
              item1.parametersUi = JSON.parse(JSON.stringify(data.parametersUi));
              item1.name = this.selectedMapper.name;
              item1.selectedOption = 'mapper';
            });
          } else {
            data.requestJson = JSON.parse(data.requestJson);
            data.requestJson.parametersUi = data.parametersUi;
            data.requestJson.selectedOption = 'mapper';
            data.requestJson.fieldId = this.field.id;
            this.selectedMapperParam.forEach((item1, index) => {
              const output = data.requestJson.parametersUi.signature[index];
              if (item1.value && item1.value.trim()) {
                if (item1.name === 'source') {
                  output.value = item1.value;
                  data.requestJson.parameters.push(item1.transformValue);
                } else if (item1.name === 'imf') {
                  let value;
                  switch (parseInt(item1.useCase)) {
                    case 1:
                      output.useCase = item1.useCase;
                      value = '${' + item1.value + '}';
                      break;
                    case 2:
                      output.useCase = item1.useCase;
                      output.selectedService = item1.selectedService;
                      value =
                        '${message_exchange[' + item1.selectedService + '].' + item1.value + '}';
                      break;
                    default:
                      output.useCase = item1.useCase;
                      output.selectedService = item1.selectedService;
                      output.selectedType = item1.selectedType;
                      value =
                        '${message_exchange[' +
                        item1.selectedService +
                        '].' +
                        item1.selectedType +
                        '_message[' +
                        item1.value +
                        ']}';
                      break;
                  }
                  data.requestJson.parameters.push(value);
                  output.value = item1.value;
                } else {
                  data.requestJson.parameters.push(item1.value);
                }
              } else {
                data.requestJson.parameters.push(item1.value);
                this.mapperError = true;
              }
            });
          }
        }
        this.mapperData.emit({
          value: data.requestJson,
          selectedOption: 'mapper',
        });
      }
    } catch (error) {
      this.mapperError = true;
    }
  }

  public editMapper(data) {
    this.dependentSource = false;
    if (data.type && data.selectedOption === 'mapper') {
      this.selectedMapper = this.mapperList.find(
        x => x.name === data.name || x.name === data.mapper,
      );
      this.selectMapperFn(data, this.selectedMapper.type, true);
    } else if (
      data[0] &&
      (data[0].selectedFormat === 3 || (data[0].selectedOption === 'mapper' && data[0].name))
    ) {
      this.selectedMapper = this.mapperList.find(x => x.name === data[0].name);
      this.selectMapperFn(data[0], this.selectedMapper.type, true);
      if (data[0].fieldId !== this.field.id) {
        this.dependentSource = true;
      }
    } else if (
      data[0] &&
      (data[0].selectedFormat === 3 || (data[0].selectedOption === 'mapper' && data[0].mapper))
    ) {
      this.selectedMapper = this.mapperList.find(x => x.name === data[0].mapper);
      this.selectMapperFn(data[0], this.selectedMapper.type, true);
      if (data[0].fieldId !== this.field.id) {
        this.dependentSource = true;
      }
    }
  }

  public cancel() {
    this.oncancel.emit(false);
  }
}
