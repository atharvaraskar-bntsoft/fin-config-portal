import {
  Component,
  OnInit,
  EventEmitter,
  Input,
  Output,
  SimpleChanges,
  OnChanges,
} from '@angular/core';
import { MainService } from '../main.service';
import { removeListeners, removeSubscriptions } from '../helpers';

@Component({
  selector: 'app-mapper-option-req',
  templateUrl: './mapper-option-req.component.html',
  styleUrls: ['./mapper-option-req.component.css'],
})
export class MapperOptionReqComponent implements OnInit, OnChanges {
  @Input() conditionDropDown: Array<any> = [];
  @Input() authData = [];
  public imfValue;
  public isVisible: boolean = false;
  public imfList: any = [];
  @Input() sources: any;
  @Input() public mapperItem: any;
  @Input() dependentSource = false;
  @Input() networkService;
  @Input() readOnlyFlag;
  @Output() public saveMapperData = new EventEmitter<Object>();
  @Output() public closeMapperReq = new EventEmitter<boolean>();
  private subscriptions = []; // for memory leakage
  private listeners = [];
  public mapperList: any;
  public mapperType;
  public selectedMapper;
  public selectedMapperParam = [];
  public mapperError = false;
  isSubmit = true;
  imfError = false;
  public sourceList;
  @Input() jsonData: any;
  public selectedIMFValue;
  isMapper: any;
  public conditionObj: any;
  public imfToolTip;
  public imfFeature: string = null;
  public mapperObject: any = {
    listMapperMapping: {
      packagerField: null,
      status: null,
      condition: null,
      name: null,
      type: null,
      listParameters: [],
    },
  };

  public typeList = [
    { name: 'Request', value: 'request' },
    { name: 'Response', value: 'response' },
  ];
  serviceList: any;

  public contextNew = [];
  public contextImf = [];
  @Input() fieldDataList;
  currentIndex: any;
  rowList: any;
  disable: boolean = false;
  disableType: boolean = false;
  public sourceData = [];

  constructor(private _service: MainService) {
    this.subscriptions.push(
      this._service.getServiceList().subscribe(item => {
        this.serviceList = item.data;
      }),
    );
    this.subscriptions.push(
      this._service.getBuiltMapperList(47).subscribe(item => {
        if (item.status == 'success') {
          this.mapperList = item.data;
          if (
            this.sources &&
            this.sources.listMapperMapping &&
            this.sources.listMapperMapping.length > 0
          ) {
            this.editMapper(this.sources.listMapperMapping);
          }
        }
      }),
    );
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes && changes.conditionDropDown && changes.conditionDropDown.currentValue) {
      this.authData.forEach(item => {
        this.sourceData.push({ id: item.id, name: item.name });
      });
      this.jsonData = changes.conditionDropDown.currentValue;
      this.imfList = this.transformLogicNew(changes.conditionDropDown.currentValue.attributes);
    }
  }

  deleteCondition(item) {
    item.condition = null;
  }

  nestedLoop(event, list) {
    for (let x of list) {
      if (x.children) {
        this.nestedLoop(event, x.children);
      } else if (x.key === event.value) {
        this.rowList = x;
      }
    }
  }

  public onChange(event, param) {
    param.error = false;
    this.nestedLoop(event, param.list);
    if (this.rowList !== undefined && this.rowList.children) {
      this.rowList = this.rowList.children.find(item => item.key === event.value);
    }

    this.selectedMapperParam[event.id].value = {
      useCase: this.rowList.useCase,
      text: this.rowList.nestedName,
      networkService: '',
      type: '',
      alias: this.rowList.key,
    };

    if (this.selectedMapperParam[event.id].value) {
      this.mapperError = false;
    }
    this.isSubmit = true;
  }

  public selectService(event, param) {
    param.error = false;
    param.value.networkService = event;
  }

  public selectType(event, param) {
    param.error = false;
    param.value.type = event;
  }

  private getToolTip(imfList) {
    imfList.forEach(val => {
      if (val.key === this.selectedIMFValue) {
        this.imfToolTip = val.title;
      } else if (val.attributes) {
        this.getToolTip(val.attributes);
      }
    });
  }
  private transformLogic(data) {
    return data.map(item => {
      if (!item.attributes) {
        item.title = item.alias;
        item.key = item.title;
        item.isLeaf = true;
      } else {
        item.title = item.name;
        item.key = item.title;
        if (item.useCase !== '3') {
          item.disabled = true;
        }
      }
      if (item.attributes) {
        item.children = this.transformLogic(item.attributes);
      }
      return item;
    });
  }

  private transformLogicNew(data) {
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
        item.children = this.transformLogicNew(item.attributes);
      }
      return item;
    });
  }
  private nameLogic(item) {
    let name;
    if (item.useCase === '1' && !this.isMapper) {
      name = item.title;
    } else if (item.useCase === '2' && !this.isMapper) {
      name = item.title;
    } else if (!this.isMapper) {
      name = item.title;
    } else {
      name = item.title;
    }
    return name;
  }

  private getImfName = item => {
    let useCase = '1';
    if (item.indexOf('_message[') === -1 && !this.isMapper) {
      if (item.indexOf(']') === -1) {
        this.selectedIMFValue = item;
      } else {
        useCase = '2';
        let imfName = item.split('].');
        if (imfName && imfName[1]) {
          imfName = imfName[1].split('}');
          if (imfName && imfName[0]) {
            this.valueFromImf(imfName[0], this.imfList, useCase);
          }
        }
      }
    } else if (!this.isMapper) {
      useCase = '3';
      let imfName = item.split('message[');
      if (imfName && imfName[1]) {
        imfName = imfName[1].split(']');
        if (imfName && imfName[0]) {
          this.valueFromImf(imfName[0], this.imfList, useCase);
        }
      }
    } else {
      useCase = '3';
      this.selectedIMFValue = item;
    }
  };

  private valueFromImf(field, list, useCase) {
    list.forEach(val => {
      if (field === val.title && (val.useCase === useCase || useCase === 3 || useCase === '3')) {
        this.selectedIMFValue = val.key;
        this.imfToolTip = val.title;
      } else if (val.attributes) {
        this.valueFromImf(field, val.attributes, useCase);
      }
    });
  }

  ngOnInit(): void {
    if (!this.sources.hasOwnProperty('listMapperMapping')) {
      (this.mapperObject.listMapperMapping.packagerField = this.sources.source),
        (this.mapperObject.listMapperMapping.condition = null),
        (this.mapperObject.listMapperMapping.status = 'M'),
        (this.mapperObject.listMapperMapping.name = null),
        (this.mapperObject.listMapperMapping.type = null),
        (this.mapperObject.listMapperMapping.listParameters = []);
    }
  }

  public editMapper(data) {
    this.mapperObject.listMapperMapping.status = data[0].status;
    this.mapperObject.listMapperMapping.condition = data[0].condition;
    this.mapperObject.listMapperMapping.packagerField = data[0].packagerField;
    this.mapperObject.listMapperMapping.type = data[0].type;
    this.mapperObject.listMapperMapping.name = data[0].name;
    if (this.mapperList) {
      this.selectedMapper = this.mapperList.find(x => x.name === data[0].name);
      this.selectMapperFn(data[0], this.selectedMapper.type, true);
    }
  }

  public selectMapperFn(data, type = null, edit = false) {
    this.imfFeature = 'MAPPER';
    if (edit == false) {
      this.mapperObject.listMapperMapping.name = data.name;
      this.mapperObject.listMapperMapping.type = data.type;
    }

    if (edit) {
      this.mapperType = type;
    } else {
      this.mapperType = data.type;
    }
    this.isSubmit = true;
    this.selectedMapperParam = [];
    if (!edit) {
      if (data && data.parametersUi && data.parametersUi.signature) {
        this.mapperError = false;
        const signature = JSON.parse(JSON.stringify(data.parametersUi.signature));
        if (data.parameters) {
          signature.forEach((item1, index) => {
            if (item1.name.indexOf('source') !== -1) {
              this.selectedMapperParam.push({
                dataType: 'string',
                ordinal: item1.ordinal,
                label: item1.name,
                list: this.sourceList,
                name: 'source',
                value: item1.value,
                error: false,
              });
            } else if (item1.name.indexOf('imf') !== -1) {
              this.selectedMapperParam.push({
                dataType: 'string',
                label: item1.name,
                ordinal: item1.ordinal,
                list: this.imfList,
                name: 'imf',
                value: {
                  useCase: item1.useCase,
                  text: item1.value,
                  networkService: item1.networkService,
                  type: item1.type,
                },
                selectedService: item1.selectedService || null,
                selectedType: item1.type || null,
                error: false,
              });
            } else {
              this.selectedMapperParam.push({
                dataType: 'string',
                ordinal: item1.ordinal,
                label: item1.name,
                list: null,
                name: item1.type,
                value: data.parametersUi[index],
                error: false,
              });
            }
          });
        } else {
          signature.forEach(item1 => {
            if (item1.name.indexOf('source') !== -1) {
              this.selectedMapperParam.push({
                dataType: 'string',
                label: item1.name,
                ordinal: item1.ordinal,
                list: this.authData,
                name: 'source',
                value: item1.value,
                error: false,
              });
            } else if (item1.name.indexOf('imf') !== -1) {
              this.selectedMapperParam.push({
                dataType: 'string',
                label: item1.name,
                ordinal: item1.ordinal,
                list: this.imfList,
                name: 'imf',
                value: {
                  useCase: item1.useCase,
                  text: item1.value,
                  networkService: item1.networkService,
                  type: item1.type,
                },
                selectedService: item1.selectedService || null,
                selectedType: item1.type || null,
                error: false,
              });
            } else {
              this.selectedMapperParam.push({
                dataType: 'string',
                label: item1.name,
                ordinal: item1.ordinal,
                list: null,
                name: item1.type,
                value: item1.value,
                error: false,
              });
            }
          });
        }
      }
    } else {
      if (data && data.listParameters) {
        this.mapperError = false;
        const signature = JSON.parse(JSON.stringify(data.listParameters));
        signature.forEach(item1 => {
          if (item1.label.indexOf('source') !== -1) {
            this.selectedMapperParam.push({
              dataType: item1.dataType,
              label: item1.label,
              ordinal: item1.ordinal,
              list: this.authData,
              name: 'source',
              value: item1.value,
              error: false,
            });
          } else if (item1.label.indexOf('imf') !== -1) {
            this.selectedMapperParam.push({
              dataType: item1.dataType,
              label: item1.label,
              ordinal: item1.ordinal,
              list: this.imfList,
              name: 'imf',
              value: item1.value,
              selectedService: item1.value.networkService || null,
              selectedType: item1.value.type || null,
              error: false,
            });
          } else {
            this.selectedMapperParam.push({
              dataType: 'string',
              label: item1.label,
              ordinal: item1.ordinal,
              value: item1.value,
            });
          }
        });
      }
    }
  }

  public selectSourceParam(event, param) {
    param.value = event;
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
            if (
              item.value.useCase == 3 &&
              item.value &&
              item.selectedService &&
              item.selectedType
            ) {
              item.error = false;
            } else if (item.value.useCase == 2 && item.value && item.selectedService) {
              item.error = false;
            } else if (item.value.useCase == 1 && item.value) {
              item.error = false;
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
      if (!this.selectedMapper) {
        this.isSubmit = false;
      } else if (
        this.mapperObject.listMapperMapping.status === 'C' &&
        !this.mapperObject.listMapperMapping.condition
      ) {
        this.isSubmit = false;
      } else {
        this.isSubmit = true;
      }
      let validate = this.selectedMapperParam.find(item => item.error) ? true : false;
      if (this.isSubmit == true && !validate) {
        const parameter = this.selectedMapperParam.forEach((ele: any, index) => {
          this.mapperObject.listMapperMapping.listParameters.push({
            dataType: ele.dataType,
            ordinal: ele.ordinal,
            label: ele.name,
            value: ele.value,
          });
        });
        this.saveMapperData.emit(this.mapperObject);
      }
    } catch (error) {
      this.mapperError = true;
    }
  }
  public getRule(value) {
    if (value.condition) {
      this.conditionObj = JSON.parse(JSON.stringify(value.condition));
      this.mapperObject.listMapperMapping.condition = JSON.parse(JSON.stringify(value.condition));
      this.isVisible = false;
    }
  }
  createCondition(item, index) {
    this.isVisible = true;
    this.currentIndex = index;
    if (item.listMapperMapping.condition) {
      this.conditionObj = item.listMapperMapping.condition;
    } else {
      this.conditionObj = null;
    }
  }

  close() {
    this.isVisible = false;
  }

  conditionNull(item, event) {
    this.isSubmit = true;
    if (event != 'C') {
      item.condition = null;
    }
  }

  public cancel() {
    this.closeMapperReq.emit(false);
  }

  ngOnDestroy() {
    this.listeners = removeListeners(this.listeners);
    this.subscriptions = removeSubscriptions(this.subscriptions);
  }
}
