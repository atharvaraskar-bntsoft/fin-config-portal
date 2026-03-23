import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { selectViewSettingsList } from '@app/store/selectors/view-settings.selector';
import { IAppState } from '@app/store/state/app.state.js';
import { Store, select } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import { ViewSettingGetObject } from '@app/models/view-settings.interface';
import { Subject } from 'rxjs';
@Component({
  selector: 'app-reversal-condition-builder',
  templateUrl: './reversal_condition_builder.component.html',
  styleUrls: ['./reversal_condition_builder.component.scss'],
})
export class ReversalConditionBuilderComponent implements OnInit {
  public reg = new RegExp('^[0-9]+$');
  public aphaNumeric = new RegExp('^[0-9a-zA-Z_ ]+$');
  public aphaNumericWithComa = new RegExp('^[0-9a-zA-Z,]+$');
  public aphaNumericLike = new RegExp('^[0-9a-zA-Z%]+$');
  public ruleData = [];
  public currentLang: string;
  public typeList = [{ name: 'Request' }, { name: 'Response' }];
  public selectedType = [];
  public selectedService = [];
  public serviceList;
  public fieldName = [];
  public ContextfieldName = [];
  public selectedOperator = [];
  public selectedValue = [];
  public componetDestroyed = new Subject();
  @Input() public ShowSave = true;
  @Input() public operatorList = [
    { text: 'Equal', value: 'equal' },
    { text: 'In', value: 'in' },
    { text: 'Starts_With', value: 'starts_with' },
  ];
  @Output() public addSubRule: EventEmitter<any> = new EventEmitter<any>();
  @Input() public ruleCondition: any;
  @Input() public conditionObj: any;
  @Input() public Error = [];
  @Input() public jsonData;
  @Input() public btnText = 'Save';
  public contextImf = [];
  public multiple = [];
  public noErrorFlag;

  // public showPattern = [];
  constructor(
    private _store: Store<IAppState>,
    private translate: TranslateService, // private _ruleEngineService: ruleEngineService, // private activeRouter: ActivatedRoute,
  ) {
    this._store.pipe(select(selectViewSettingsList)).subscribe((response: ViewSettingGetObject) => {
      if (response) {
        this.currentLang = response.data.settingDto.language;
        translate.setDefaultLang(this.currentLang);
      }
    });
  }

  public ngOnInit() {
    
    this.ruleData = JSON.parse(JSON.stringify(this.transformLogic(this.jsonData?.fields)));
    if (this.ruleCondition) {
      if (this.ruleCondition.fieldName) {
        this.conditionObj = {
          type: 'and',
          conditions: [JSON.parse(JSON.stringify(this.ruleCondition))],
        };
      } else {
        const data = JSON.parse(JSON.stringify(this.ruleCondition));
        this.conditionObj = this.getCondition(data);
      }
    } else {
      if (!this.conditionObj) {
        this.conditionObj = { type: 'and', conditions: [] };
      }
    }
    if (this.conditionObj && this.conditionObj.conditions) {
      this.getEditDataFn(this.conditionObj.conditions);
    }
  }
  private getCondition(data) {
    if (data.condition) {
      data.conditions = [data.condition];
      delete data.condition;
    }
    data.conditions.forEach(element => {
      if (element.condition || element.conditions) {
        this.getCondition(element);
      }
    });
    return data;
  }
  public changeFieldData(event, nodes, flag) {
    if (flag === 'imf') {
      this.fieldFn(event, nodes);
    } else if (flag === 'service') {
      this.serviceFn(event, nodes);
    } else if (flag === 'type') {
      this.typeFn(event, nodes);
    } else if (flag === 'operator') {
      this.operatorFn(event, nodes);
    } else if (flag === 'value' || flag === 'textvalue') {
      this.valueFn(event, nodes, flag);
    }
  }
  public addSingleConditon() {
    if (this.conditionObj.group) {
      this.conditionObj.conditions.push({
        id: this.conditionObj.id + '-' + this.conditionObj.conditions.length,
      });
    } else {
      let id = 0;
      if (this.conditionObj.conditions.length > 0) {
        id = this.conditionObj.conditions[this.conditionObj.conditions.length - 1].id + 1;
      }
      this.conditionObj.conditions.push({
        id: id,
      });
    }
    if (this.conditionObj.conditions.length > 1 && this.conditionObj.type === 'not') {
      this.conditionObj.type = 'and';
    }
  }
  public createGroup(data: any, id: number) {
    const ids = JSON.parse(JSON.stringify(data.id));
    const condition = JSON.parse(JSON.stringify(this.conditionObj));
    this.conditionObj.conditions[id] = { type: 'and', group: true, id: ids, conditions: [] };
    data.id = ids + '-' + this.conditionObj.conditions[id].conditions.length;
    this.conditionObj.conditions[id].conditions.push(data);
  }
  public delete(id, i = -1) {
    this.clearValue(id);
    if (i !== -1) {
      // delete this.conditionObj.conditions[i].conditions;
      // delete this.conditionObj.conditions[i].group;
      delete this.conditionObj.conditions[i];
      this.conditionObj.conditions = this.conditionObj.conditions.filter(x => x !== null);
    } else {
      if (this.conditionObj.conditions) {
        this.conditionObj.conditions = this.conditionObj.conditions.filter(x => x.id !== id);
      }
    }
  }
  public saveConditon() {
    this.ruleCondition = JSON.parse(JSON.stringify(this.conditionObj));
    this.noErrorFlag = true;
    this.validation(this.ruleCondition.conditions, this.ruleCondition.type);
    if (this.noErrorFlag) {
      if (
        this.ruleCondition.conditions.length === 1 &&
        this.ruleCondition.type !== 'not' &&
        !this.ruleCondition.group
      ) {
        const rule = JSON.parse(JSON.stringify(this.conditionObj));
        this.ruleCondition = rule.conditions[0];
      } else {
        this.notFunction(this.ruleCondition);
      }
      const data = {
        condition: this.ruleCondition,
      };
      this.addSubRule.emit(data);
    }
  }
  private notFunction(condition) {
    if (condition.type === 'not') {
      condition.condition = JSON.parse(JSON.stringify(condition.conditions[0]));
      delete condition.conditions;
      if (condition.condition.type === 'not' || condition.condition.conditions) {
        this.notFunction(condition.condition);
      }
    } else {
      condition.conditions.forEach(x => {
        if (x.conditions) {
          this.notFunction(x);
        }
      });
    }
    return condition;
  }
  private validation(condition, type) {
    condition.forEach(element => {
      this.Error[element.id] = {
        field: false,
        service: false,
        type: false,
        operator: false,
        value: false,
        specialChar: false,
      };
      if (element.group) {
        this.validation(element.conditions, element.type);
      } else {
        if (!element.fieldName) {
          this.noErrorFlag = false;
          this.Error[element.id].field = true;
        }
        if (!element.type) {
          this.Error[element.id].operator = true;
          this.noErrorFlag = false;
        }
        if (!element.value && !element.pattern && type !== 'not') {
          this.Error[element.id].value = true;
          this.noErrorFlag = false;
        } else {
          if (element.specialCharError) {
            this.Error[element.id].specialChar = true;
            this.noErrorFlag = false;
          }
        }
      }
    });
  }
  private fieldFn(event, nodes) {
    this.fieldName[nodes.id] = event;
    nodes.fieldName = this.fieldName[nodes.id].name;
    if (this.Error[nodes.id]) {
      this.Error[nodes.id].field = false;
    }
    this.delesNodesFn(nodes);
    this.otherVal(nodes.id);
    if (event.name !== '${transaction_type}') {
      this.setValue(nodes);
    }
  }

  private setValue(nodes) {
    this.selectedService[nodes.id] = 'GATEWAY_SERVICE';
    this.selectedType[nodes.id] = 'Request';
    const data = nodes.fieldName.split('].');
    nodes.fieldName = data[0].split('[')[0] + '[' + 'GATEWAY_SERVICE' + '].' + data[1];
  }
  private delesNodesFn(nodes) {
    delete nodes.type;
    delete nodes.value;
    delete nodes.pattern;
  }
  private serviceFn(event, nodes) {
    const data = nodes.fieldName.split('].');
    nodes.fieldName = data[0].split('[')[0] + '[' + event + '].' + data[1];
    if (this.Error[nodes.id]) {
      this.Error[nodes.id].service = false;
    }
  }
  private typeFn(event, nodes) {
    if (event === 'Request') {
      nodes.fieldName = nodes.fieldName.replace('response', 'request');
    } else {
      nodes.fieldName = nodes.fieldName.replace('request', 'response');
    }
    if (this.Error[nodes.id]) {
      this.Error[nodes.id].type = false;
    }
  }
  private operatorFn(event, nodes) {
    nodes.type = event.value;
    if (nodes.type === 'in') {
      this.multiple[nodes.id] = true;
    } else {
      this.multiple[nodes.id] = false;
    }
    if (this.Error[nodes.id]) {
      this.Error[nodes.id].operator = false;
    }
    this.selectedValue[nodes.id] = null;
    delete nodes.pattern;
    delete nodes.value;
    nodes[event.key] = null;
  }
  private valueFn(event, nodes, flag) {
    if (event && !Array.isArray(event)) {
      event = event.trim();
    }
    if (event) {
      delete nodes.specialCharError;
      if (this.selectedOperator[nodes.id]) {
        nodes[this.selectedOperator[nodes.id].key] = event;
        if (nodes.type === 'in') {
          if (event.indexOf(',') !== -1) {
            nodes[this.selectedOperator[nodes.id].key] = event.split(',');
          } else if (!Array.isArray(event)) {
            nodes[this.selectedOperator[nodes.id].key] = [event];
          }
        }
        this.regexValidation(nodes, flag);
      } else if (event) {
        nodes.value = event;
      }
      if (this.Error[nodes.id]) {
        this.Error[nodes.id].value = false;
      }
    }
  }
  private regexValidation(nodes, flag) {
    if (flag === 'textvalue') {
      if (Array.isArray(nodes[this.selectedOperator[nodes.id].key])) {
        if (
          !this.fieldName[nodes.id].data ||
          (this.fieldName[nodes.id].data && this.fieldName[nodes.id].data.length === 0)
        ) {
          nodes[this.selectedOperator[nodes.id].key].forEach(val => {
            if (!this.aphaNumeric.test(val)) {
              nodes.specialCharError = true;
              flag = false;
            }
          });
        }
      } else {
        if (
          this.selectedOperator[nodes.id].value === 'like' &&
          !this.aphaNumericLike.test(nodes[this.selectedOperator[nodes.id].key])
        ) {
          nodes.specialCharError = true;
          flag = false;
        } else if (
          this.selectedOperator[nodes.id].value !== 'like' &&
          !this.aphaNumeric.test(nodes[this.selectedOperator[nodes.id].key])
        ) {
          nodes.specialCharError = true;
          flag = false;
        }
      }
    }
  }
  private getEditDataFn(conditions) {
    conditions.forEach(item => {
      if (item.fieldName) {
        this.getfieldName(item.fieldName, item.id);
      }
      if (item.type) {
        this.getOperator(item.type, item.id);
      }
      if (item.value || item.pattern) {
        let value = item.value;
        if (item.pattern) {
          value = item.pattern;
        }
        this.getvalue(value, item.id);
      }
    });
  }
  private getfieldName(field, id) {
    let useCase = '1';
    if (field.indexOf('].') === -1) {
      field = field.split('{')[1].split('}')[0];
    } else {
      useCase = '2';
      this.selectedService[id] = field.split('].')[0].split('[')[1];
      if (field.indexOf('_message') === -1) {
        field = field.split('].')[1].split('}')[0];
      } else {
        useCase = '3';
        if (field.indexOf('request_') !== -1) {
          this.selectedType[id] = 'Request';
        } else {
          this.selectedType[id] = 'Response';
        }
        field = field.split('_message.')[1].split(']')[0];
      }
    }
    this.valueFromImf(field, this.jsonData?.fields, id, useCase);
    this.ContextfieldName[id] = this.fieldName[id];
  }
  private valueFromImf(field, list, id, useCase) {
    this.fieldName[id] = list.find(x => x.useCase === useCase && x.name.indexOf(field) !== -1);
  }
  private getOperator(type, id) {
    if (type === 'in' && this.fieldName[id].data && this.fieldName[id].data.length > 0) {
      this.multiple[id] = true;
    } else {
      this.multiple[id] = false;
    }
    if (this.fieldName[id] && this.fieldName[id].operator) {
      this.selectedOperator[id] = this.fieldName[id].operator.find(x => x.value === type);
    }
  }

  private getvalue(value, id) {
    if (Array.isArray(value) && this.multiple[id] !== true) {
      value.forEach((val, i) => {
        if (i === 0) {
          this.selectedValue[id] = val;
        } else {
          this.selectedValue[id] = this.selectedValue[id] + ',' + val;
        }
      });
    } else {
      this.selectedValue[id] = value;
    }
  }
  private clearValue(id) {
    this.fieldName[id] = null;
    this.otherVal(id);
  }
  private otherVal(id) {
    this.selectedService[id] = null;
    this.selectedType[id] = null;
    this.selectedOperator[id] = null;
    this.selectedValue[id] = null;
  }
  private transformLogic(data) {
    return data?.map(item => {
      item.name = JSON.parse(JSON.stringify(this.nameLogic(item)));
      return item;
    });
  }
  private nameLogic(item) {
    let name = item.name;
    if (item.useCase !== '1') {
      name = item.name.replace('SELECTED_SERVICE', 'GATEWAY_SERVICE');
      if (item.useCase !== '1') {
        name = item.name.replace('SELECTED_TYPE', 'request');
      }
    }
    return name;
  }
}
