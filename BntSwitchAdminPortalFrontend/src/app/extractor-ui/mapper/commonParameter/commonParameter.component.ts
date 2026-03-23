import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import * as _ from 'underscore';

@Component({
  selector: 'extractor-common-parameter',
  templateUrl: './commonParameter.component.html',
  styleUrls: ['./commonParameter.component.scss'],
})
export class CommonParameterComponent implements OnInit {
  public otherParam = [];
  public listParam = [];
  public mapParam = [];
  public imfToolTip;
  @Input() selectedStepParameterStringify;
  selectedStepParameter: any;
  oldselectedStepParameter: any;
  public StepParameter = [];
  @Input() imfList;
  @Input() serviceList = [];
  @Input() sourceList;
  @Input() ipcList;
  @Input() readOnlyFlag = false;
  @Input() showCancelBtn = true;
  public imfListNew;
  @Output() public parameter = new EventEmitter<Object>();
  @Output() public saveAndclose = new EventEmitter<Object>();

  public actionName;
  public paramError = false;
  public typeList = [
    { name: 'Request', value: 'request' },
    { name: 'Response', value: 'response' },
  ];

  public submit: any = false;

  constructor() { }

  public ngOnInit() {
    if (this.selectedStepParameterStringify != 'null') {
      this.selectedStepParameter = JSON.parse(this.selectedStepParameterStringify);
      this.oldselectedStepParameter = JSON.parse(this.selectedStepParameterStringify);
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
  }

  checkNameHavingSourceKeyword(param) {
    return param.name ? param.name.includes('source_') : false; // true
  }

  checkNameHavingImfKeyword(param) {
    return param.name ? param.name.includes('imf_') : false; // true
  }

  checkValueHavingDollar(value) {
    return value ? value.includes('${') : false;
  }

  public addParamNew(flag, data, idx) {
    this.submit = false;
    if (flag === 'list') {
      data.value.push({
        textValue: null,
      });
    }
    if (flag === 'map') {
      data.valueMap.push({
        key: null,
        isText: false,
        value: {
          useCase: null,
          text: null,
          service: 'GATEWAY_SERVICE',
          type: 'request',
        },
      });
    }
  }

  public removeParamNew(flag, data, index) {
    if (flag === 'list') {
      data.value.splice(index, 1);
    } else {
      data.valueMap.splice(index, 1);
    }
  }

  savedata(): void {
    for (let item of this.selectedStepParameter.listParameters) {
      if ((item.dataType.toLowerCase() === "string" || item.dataType.toLowerCase() === "integer" || item.dataType.toLowerCase() === "object" || item.dataType.toLowerCase() === "long") && (!item.value || item.value == null)) {
        this.submit = true;
      } else if (item.dataType.toLowerCase() === "map") {
        for (let obj of item.valueMap) {
          if (obj.key == null || obj.value.text == null) {
            this.submit = true;
          } else {
            this.submit = false;
          }
        }
      } else if (item.dataType.toLowerCase() === "list") {
        for (let obj of item.value) {
          if (obj.textValue == null) {
            this.submit = true;
          } else {
            this.submit = false;
          }
        }
      } else {
        this.submit = false;
      }
    }

    if (this.submit == false) {
      this.parameter.emit({
        listParameter: this.selectedStepParameter.listParameters,
        index2: this.selectedStepParameter.index2,
        data: this.selectedStepParameter.data,
        action: 'save',
      });
    }
  }

  saveAndClose() {
    this.saveAndclose.emit({
      listParameter: this.selectedStepParameter.listParameters,
      index2: this.selectedStepParameter.index2,
      data: this.selectedStepParameter.data,
      action: 'save',
    });

  }
  public cancel() {
    this.parameter.emit({
      selectedStepParameter: this.selectedStepParameter,
      listParameter: this.oldselectedStepParameter.listParameters,
      action: 'close',
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

  private nameLogic(item) {
    let name;
    name = item.alias;
    return name;
  }

  public selectImf(event, item1) {
    let data = JSON.parse(JSON.stringify(this.imfListNew));
    this.findUseCaseValue(data, event, item1);
  }

  public findUseCaseValue(data, event, item1) {
    const result = data.find(({ name }) => name === event);
    if (!result) {
      data.forEach(item => {
        if (item.attributes) {
          this.findUseCaseValue(item.attributes, event, item1);
        }
      });
    } else {
      item1.value.useCase = result.useCase;
    }
  }
}
