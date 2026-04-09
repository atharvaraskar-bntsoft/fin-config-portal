import { Component, OnInit, EventEmitter, Output, Input, ViewEncapsulation, OnChanges, SimpleChanges } from '@angular/core';
import { selectViewSettingsList } from '@app/store/selectors/view-settings.selector';
import { IAppState } from '@app/store/state/app.state.js';
import { Store, select } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import { ViewSettingGetObject } from '@app/models/view-settings.interface';
import { GetRuleCondition } from '@app/store/actions/router.actions';
import { selectGetRuleCondition } from '@app/store/selectors/router.selectors';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { SubscribeService } from '@app/services/subscribe.services';

@Component({
  selector: 'app-condition-builder',
  templateUrl: './condition_builder.component.html',
  styleUrls: ['./condition_builder.component.scss'],
})
export class ConditionBuilderComponent implements OnInit, OnChanges {
  public reg = new RegExp('^[0-9]+$');
  public aphaNumeric = /^[A-Za-z0-9\s\.\@\[\$\]\^\{\}\._]+$/;
  public aphaNumericWithComa = new RegExp('^[0-9a-zA-Z,]+$');
  public aphaNumericLike = new RegExp('^[0-9a-zA-Z%]+$');
  public ruleData = [];
  public imfToolTip = [];
  public currentLang: string;
  public typeList = [{ name: 'Request' }, { name: 'Response' }];
  public selectedType = [];
  public selectedService = [];
  public serviceList;
  public fieldName = [];
  public disabledValue = [];
  public ContextfieldName = [];
  public selectedOperator = [];
  public selectedValue = [];
  @Input() public readOnlyFlag = false;
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
  @Input() public hide = false;
  @Input() public serviceType;
  @Input() public exchangeType: any;
  @Input() public page;
  @Input() public postActionIndex;
  @Input() public Error = [];
  @Input() public jsonData;
  @Input() public btnText = 'Save';
  i = 0;
  index = 0;
  idValue = '0';
  id = '';

  public contextImf = [];
  public multiple = [];
  public noErrorFlag;

  public collapsed1: any;
  constructor(
    private _store: Store<IAppState>,
    private translate: TranslateService,
    private subscribeService: SubscribeService, // private _ruleEngineService: ruleEngineService, // private activeRouter: ActivatedRoute,
  ) {
    this._store.pipe(select(selectViewSettingsList)).subscribe((response: ViewSettingGetObject) => {
      if (response) {
        this.currentLang = response.data.settingDto.language;
        translate.setDefaultLang(this.currentLang);
      }
    });
    this._store.dispatch(new GetRuleCondition());
    this._store
      .pipe(takeUntil(this.componetDestroyed), select(selectGetRuleCondition))
      .subscribe((ruleData: any) => {
        if (ruleData && ruleData.data !== null) {
          // this.ruleData = ruleData.data.fields.filter(it => it.label);
          this.serviceList = ruleData.data.service;
          // this.serviceData.emit(ruleData.data.service);
          if (this.conditionObj && (this.conditionObj.conditions || this.conditionObj.condition)) {
            let condition = this.conditionObj.conditions;
            if (this.conditionObj.condition) {
              condition = [this.conditionObj.condition];
            }
            this.getEditDataFn(condition);
          }
        }
      });
  }

  public ngOnInit() {
    if (this.jsonData) {
      this.ruleData = this.transFormData(this.jsonData.attributes);
      this.contextImf = this.transformLogic(this.jsonData.attributes);
      this.contextImf = [...this.contextImf]
      if (this.contextImf.length && this.ruleData.length) {
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

          if (this.conditionObj && this.ruleData && this.conditionObj.conditions) {
            this.getEditDataFn(this.conditionObj.conditions);
          }
        } else {
          if (!this.conditionObj) {
            this.conditionObj = { type: 'and', conditions: [] };
          }
        }
      }
      this.subscribeService.getItems().subscribe(res => {
        if (res == 'removeAll') {
          const data = {
            id: this.postActionIndex,
            condition: null
          };
          this.addSubRule.emit(data);
        }
      });
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.jsonData) {
      this.ruleData = this.transFormData(this.jsonData.attributes);
      this.contextImf = this.transformLogic(this.jsonData.attributes);
      this.contextImf = [...this.contextImf]
      if (this.contextImf.length && this.ruleData.length) {
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
          if (this.conditionObj && this.ruleData && this.conditionObj.conditions) {
            this.getEditDataFn(this.conditionObj.conditions);
          }
        } else {
          if (!this.conditionObj) {
            this.conditionObj = { type: 'and', conditions: [] };
          }
        }
      }
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
    } else if (flag === 'checked') {
      this.checkValue(event, nodes);
    }
  }


  public addSingleConditon() {
    if (this.conditionObj.group) {
      this.conditionObj.conditions.push({
        id: this.conditionObj.id + '-' + this.conditionObj.conditions.length,
      });
    } else {
      let id = '0';
      if (this.conditionObj.conditions.length > 0) {
        id = (
          parseInt(this.conditionObj.conditions[this.conditionObj.conditions.length - 1].id) + 1
        ).toString();
      }
      this.conditionObj.conditions.push({
        id: id,
      });
      this.clearValue(id);
    }
    if (this.conditionObj.conditions.length > 1 && this.conditionObj.type === 'not') {
      this.conditionObj.type = 'and';
    }
  }

  public createGroup(data: any, id: number) {
    const ids = JSON.parse(JSON.stringify(data.id));
    this.conditionObj.conditions[id] = { type: 'and', group: true, id: ids, conditions: [] };
    data.id = ids + '-' + this.conditionObj.conditions[id].conditions.length;
    this.conditionObj.conditions[id].conditions.push(data);
  }

  public delete(id, i = -1) {
    this.clearValue(id);
    if (i !== -1) {
      delete this.conditionObj.conditions[i];
      this.conditionObj.conditions = this.conditionObj.conditions.filter(x => x !== null);
    } else {
      if (this.conditionObj.conditions) {
        this.conditionObj.conditions = this.conditionObj.conditions.filter(x => x.id !== id);

        this.index = 0;
        this.idValue = '0';
        this.id = '';
        this.iterateGroup(this.conditionObj.conditions);
        this.conditionObj.conditions = JSON.parse(JSON.stringify(this.conditionObj.conditions));
        this.getEditDataFn(this.conditionObj.conditions);
      }
    }
  }

  iterateGroup = obj => {
    Object.keys(obj).forEach(key => {
      if (key == 'id') {
        var lenCount = obj[key].toString().length;
        if (obj[key].toString().indexOf('-') !== -1) {
          if (this.id == '') {
            var val = obj[key].substr(0, lenCount - 1) + this.index.toString();
            obj[key] = val;
            this.id = obj[key];
            this.index += 1;
          } else if (lenCount > this.id.length) {
            this.index = 0;
            obj[key] = this.idValue + '-' + this.index.toString();
            this.index += 1;
            this.id = obj[key];
          } else if (lenCount < this.id.length) {
            this.index = 0;
            var Parentval3 = this.idValue;
            var Currentval = obj[key];
            var array3 = Parentval3.split('-');
            var currentArray = Currentval.split('-');
            var len = array3.length - currentArray.length;
            var updateval = '';
            var val1 = 0;
            for (var i = 0; i < array3.length - len; i++) {
              if (i == array3.length - (len + 1)) {
                array3[i] = (parseInt(array3[i]) + 1).toString();
              }
              updateval += array3[i].toString() + '-';
            }
            updateval = updateval.substr(0, updateval.length - 1);
            obj[key] = updateval.toString();
            this.index += 1;
            this.id = obj[key];
          } else {
            if (obj[key].toString().indexOf('-') !== -1) {
              var Parentval: any = this.idValue;
              var array = Parentval.split('-');
              var updateval = '';
              var updatedNumber = 0;
              updatedNumber = parseInt(array[array.length - 1]) + 1;
              for (var i = 0; i < array.length - 1; i++) {
                updateval += array[i].toString() + '-';
              }
              updateval = updateval + updatedNumber.toString();
              obj[key] = updateval.toString();
              this.index += 1;
              this.id = obj[key];
            } else {
              console.log('check');
            }
          }
        } else {
          if (this.id == '') {
            obj[key] = '0';
            this.id = obj[key];
            this.index += 1;
          } else {
            var Parentval2 = this.idValue;
            var parray = Parentval2.split('-');
            var updateval2 = '';
            updateval2 = (parseInt(parray[0]) + 1).toString();
            obj[key] = updateval2.toString();
            this.index += 1;
            this.id = obj[key];
          }
        }
      }
      if (typeof obj[key] === 'object') {
        this.idValue = this.id;
        this.iterateGroup(obj[key]);
      }
    });
  };

  // Delete Group

  public deleteGroup(id, groupsNode) {
    delete this.conditionObj.conditions[id];
    this.conditionObj.conditions = this.conditionObj.conditions.filter(x => x !== null);
    if (this.conditionObj.conditions) {
      this.conditionObj.conditions = this.conditionObj.conditions.filter(x => x.id !== id);
    }
    this.index = 0;
    this.idValue = '0';
    this.id = '';
    this.iterateGroup(this.conditionObj.conditions);
    this.conditionObj.conditions = JSON.parse(JSON.stringify(this.conditionObj.conditions));
    this.getEditDataFn(JSON.parse(JSON.stringify(this.conditionObj.conditions)));
  }

  public saveConditon() {
    this.ruleCondition = JSON.parse(JSON.stringify(this.conditionObj));
    this.noErrorFlag = true;
    this.validation(this.ruleCondition.conditions, this.ruleCondition.type);
    this.ruleCondition.conditions = this.transform(this.ruleCondition.conditions)
    if (this.noErrorFlag) {
      if (
        this.ruleCondition.conditions.length === 1 &&
        this.ruleCondition.type !== 'not' &&
        !this.ruleCondition.group
      ) {
        const rule = JSON.parse(JSON.stringify(this.ruleCondition));
        this.ruleCondition = rule.conditions[0];
      } else {
        this.notFunction(this.ruleCondition);
      }
      const data = {
        id: this.postActionIndex,
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

  private transform(condition) {
    return condition.map(element => {
      if (element.group) {
        this.validation(element.conditions, element.type);
      } else {
        if (element.type == 'null' && element.value == null) {
          element.type = 'equal';
        }
      }
      return element
    });
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
        return
      } else {
        if (!element.fieldName) {
          this.noErrorFlag = false;
          this.Error[element.id].field = true;
        }
        if (!element.type) {
          this.Error[element.id].operator = true;
          this.noErrorFlag = false;
        }
        if (!element.fieldName.includes('is_saf_processed')) {
          if (!element.value && (element.type == 'null' || element.type == 'equal')) {
            this.Error[element.id].value = false;
            this.noErrorFlag = true;
            element.type = 'equal';
          }
          else if (!element.value && !element.pattern && type !== 'not') {
            this.Error[element.id].value = true;
            this.noErrorFlag = false;
          } else {
            if (element.specialCharError) {
              this.Error[element.id].specialChar = true;
              this.noErrorFlag = false;
            }
          }
        }
      }
    });
  }

  private fieldFn(event, nodes) {
    this.fieldName[nodes.id] = event;
    nodes.fieldName = this.fieldName[nodes.id].name;
    this.fieldName[nodes.id].boolean = false
    if (nodes.fieldName.includes('is_saf_processed')) {
      this.fieldName[nodes.id].boolean = true
    }
    const field = JSON.parse(JSON.stringify(nodes.fieldName));
    this.getfieldName(field, nodes.id, false);
    if (this.Error[nodes.id]) {
      this.Error[nodes.id].field = false;
    }
    this.delesNodesFn(nodes);
    this.otherVal(nodes.id);
    this.setValue(nodes);
    this.setTagValue(nodes);
  }

  private setValue(nodes) {
    this.selectedService[nodes.id] = 'GATEWAY_SERVICE';
    this.selectedType[nodes.id] = 'Request';
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
    this.disabledValue[nodes.id] = false;
    if (nodes.type === 'in') {
      this.multiple[nodes.id] = true;
    } else {
      this.multiple[nodes.id] = false;
    }
    if (this.Error[nodes.id]) {
      this.Error[nodes.id].operator = false;
    }
    if (event.value == 'null') {
      this.selectedOperator[nodes.id] = this.fieldName[nodes.id].operator.find((it) => it.value == 'null')
      this.Error[nodes.id] = false;
      this.disabledValue[nodes.id] = true;
    }
    delete nodes.pattern;
    delete nodes.value;
    nodes[event.key] = null;
  }

  private checkValue(event, nodes) {
    nodes.value = event
    if (this.Error[nodes.id]) {
      this.Error[nodes.id].value = false;
    }
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
    this.i += 1;
    conditions.forEach(item => {
      if (item.group) {
        this.getEditDataFn(item.conditions)
        return
      } else if('fieldName' in item) {
        this.disabledValue[item.id] = false;
        if (item.fieldName) {
          this.getfieldName(item.fieldName, item.id, true);
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
        else if (item.fieldName && item.fieldName.includes('is_saf_processed')) {
          item.value = item.value
        }
        else if (!item.value && ('pattern' in item === false) && item.value == null) {
          item.type = 'null'
          item.value = null
          const opt = this.fieldName[item.id].operator.find((it) => it.value == 'null')
          this.selectedValue[item.id] = null
          this.disabledValue[item.id] = true;
          this.selectedOperator[item.id] = opt;
        }
      }
    });
  }

  private getfieldName(field, id, flag = true) {
    let useCase = '1';
    if (field.indexOf('].') === -1) {
      field = field.split('{')[1].split('}')[0];
    } else {
      useCase = '2';
      this.selectedService[id] = field.split('].')[0].split('[')[1];
      if (field.indexOf('_message[') === -1) {
        field = field.split('].')[1].split('}')[0];
      } else {
        useCase = '3';
        if (field.indexOf('request_') !== -1) {
          this.selectedType[id] = 'Request';
        } else {
          this.selectedType[id] = 'Response';
        }
        field = field.split('_message[')[1].split(']')[0];
      }
    }

    this.imfToolTip[id] = field;
    if (flag) {
      this.valueFromImf(field, this.contextImf, id, useCase);
      this.ContextfieldName[id] = this.fieldName[id];
    }
  }

  private valueFromImf(field, list, id, useCase) {
    list.forEach(val => {
      if (
        field === val.nestedName &&
        (val.useCase === useCase || useCase === 3 || useCase === '3')
      ) {
        this.fieldName[id] = val.key;
      } else if (val.attributes) {
        this.valueFromImf(field, val.attributes, id, useCase);
      }
    });
  }

  private getOperator(type, id) {
    if (type === 'in' && this.fieldName[id].data && this.fieldName[id].data.length > 0) {
      this.multiple[id] = true;
    } else {
      this.multiple[id] = false;
    }
    if (this.fieldName[id] && this.fieldName[id].operator) {
      this.selectedOperator[id] = this.fieldName[id].operator.find(x => x.value == type);
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
    this.ContextfieldName[id] = null;
    this.imfToolTip[id] = null;
    this.otherVal(id);
  }

  private otherVal(id) {
    this.selectedService[id] = null;
    this.selectedType[id] = null;
    this.selectedOperator[id] = null;
    this.selectedValue[id] = null;
  }

  private transFormData(data) {
    return data.map(item => {
      if (!item.attributes) {
        this.ruleData.push(item);
      }
      if (item.attributes) {
        this.transFormData(item.attributes);
      }
      return item;
    });
  }

  private transformLogic(data) {
    return data.map(item => {
      if (!item.attributes) {
        item.title = item.alias;
        item.key = this.nameLogic(item, {});
        item.isLeaf = true;
      } else {
        item.title = item.name;
        if (item.useCase !== '3') {
          item.key = item.alias;
          item.disabled = true;
        } else {
          item.key = this.nameLogic(item, {});
        }
      }
      if (item.attributes) {
        item.children = this.transformLogic(item.attributes);
      }
      return item;
    });
  }

  private nameLogic(item, key) {
    let name;
    let flag = false
    if (item.useCase == 1) {
      name = '${' + item.nestedName + '}';
    } else if (item.useCase == 2) {
      name = '${message_exchange[GATEWAY_SERVICE].' + item.nestedName + '}';
    } else {
      name = '${message_exchange[GATEWAY_SERVICE].request_message[' + item.nestedName + ']}';
    }
    if (name.includes('is_saf_processed')) {
      flag = true
    }
    key = {
      name: name,
      data: item.data,
      operator: item.operator,
      useCase: item.useCase,
      boolean: flag
    };
    return key;
  }
  /// for Tag Screen///////
  private setTagValue(nodes) {
    if (this.fieldName[nodes.id].useCase !== '1' && this.serviceType) {
      this.serviceFn(this.serviceType, nodes);
    } else if (this.fieldName[nodes.id].useCase === '3' && this.exchangeType) {
      this.typeFn(this.exchangeType, nodes);
    }
  }
}
