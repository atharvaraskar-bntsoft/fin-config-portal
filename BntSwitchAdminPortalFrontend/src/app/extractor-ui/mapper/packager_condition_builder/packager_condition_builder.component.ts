import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { selectViewSettingsList } from '@app/store/selectors/view-settings.selector.js';
import { IAppState } from '@app/store/state/app.state.js';
import { Store, select } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import { ViewSettingGetObject } from '@app/models/view-settings.interface';
import { Subject } from 'rxjs';
import { NzDrawerRef, NzDrawerService } from 'ng-zorro-antd/drawer';

@Component({
  selector: 'app-packager-condition-builder',
  templateUrl: './packager_condition_builder.component.html',
  styleUrls: ['./packager_condition_builder.component.scss'],
})
export class PackagerConditionBuilderComponent implements OnInit {

  @Input() isVisible = false;
  @Input() public listIdRule = [];
  @Input() currentIndex: any;
  public reg = new RegExp('^[0-9]+$');
  public aphaNumeric = new RegExp('^[0-9a-zA-Z_ ]+$');
  public aphaNumericWithComa = new RegExp('^[0-9a-zA-Z,]+$');
  public ruleData = [];
  public currentLang: string;
  public typeList = [{ name: 'Request' }, { name: 'Response' }];
  public selectedType = [];
  public selectedService = [];
  public serviceList;
  public fieldName = [];
  public ContextfieldName = [];
  public selectedOperator = [];
  public disabledValue = [];
  public selectedValue = [];
  public componetDestroyed = new Subject();
  @Input() public ShowSave = true;
  @Input() readOnlyFlag = false;
  public operatorList = [
    { text: 'Equal', value: 'equal' },
    { text: 'In', value: 'in' },
    { text: 'Null', value: 'null' },
    { text: 'Starts_With', value: 'starts_with' },
  ];
  @Output() closeDrawer = new EventEmitter<boolean>();
  @Output() closeCreate = new EventEmitter<boolean>();
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
  @Input() public btnText = 'Save Condition';
  @Input() public field = [];
  public contextImf = [];
  public multiple = [];
  public noErrorFlag;
  public ruleListItem = [];
  i = 0;
  index = 0;
  idValue = '0';
  id = '';
  public collapsed1: any;
  constructor(
    translate: TranslateService,
    private drawerRef: NzDrawerRef<string>
  ) {
    if (this.conditionObj) {
      if (this.conditionObj && (this.conditionObj.conditions || this.conditionObj.condition)) {
        let condition = this.conditionObj.conditions;
        if (this.conditionObj.condition) {
          condition = [this.conditionObj.condition];
        }
        this.getEditDataFn(condition);
      }
    }
  }

  saveconditionres(data: any) {
    this.drawerRef.close({
      action:'save',
      isVisible: false,
        condition: data.condition,
        currentIndex: this.currentIndex,
      });
  }

  public ngOnInit() {
    this.ruleListItem = JSON.parse(JSON.stringify(this.field));
    this.ruleListItem.map(item => {
      item.id = '${' + item.id + '}';
      return item;
    });

    if (this.ruleCondition) {
        this.ruleCondition = JSON.parse(JSON.stringify(this.ruleCondition));
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
    if (this.conditionObj && this.ruleData && this.conditionObj.conditions) {
      this.getEditDataFn(this.conditionObj.conditions);
    }

  }
  open(): void {
    this.isVisible = true;
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
    } else if (flag === 'operator') {
      /*let eventValue = this.operatorList.find(x=>x.value==event.value).text;
      event =
      {
        "text":eventValue ,
        "value":event
      }*/
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
    //this.clearValue(id);
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
      this.saveconditionres(data);
      // this.addSubRule.emit(data);
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
      } else {
        if (!element.fieldName) {
          this.noErrorFlag = false;
          this.Error[element.id].field = true;
        }
        if (!element.type) {
          this.Error[element.id].operator = true;
          this.noErrorFlag = false;
        }
        if ((element.type == 'null' || element.type == 'equal') && element.value == null) {
          this.Error[element.id].operator = false;
          this.Error[element.id].field = false;
          this.Error[element.id].value = false;
          element.type = 'equal';
          this.noErrorFlag = true;
        } else if (
          !element.value &&
          !element.pattern &&
          type !== 'not' &&
          this.selectedOperator[element.id] !== 'Null'
        ) {
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
    // this.fieldName[nodes.id] = this.ruleData.find(x => x.label === event);
    this.fieldName[nodes.id] = event;
    nodes.fieldName = this.fieldName[nodes.id].name;
    if (this.Error[nodes.id]) {
      this.Error[nodes.id].field = false;
    }
    this.delesNodesFn(nodes);
    this.otherVal(nodes.id);
  }
  private delesNodesFn(nodes) {
    delete nodes.type;
    delete nodes.value;
    delete nodes.pattern;
  }

  private operatorFn(event, nodes) {
    nodes.type = event.value;
    this.disabledValue[nodes.id] = false;
    if (nodes.type === 'in') {
      this.multiple[nodes.id] = true;
    } else {
      this.multiple[nodes.id] = false;
    }
    if (event.text === 'Null') {
      nodes.value = null;
      this.selectedValue[nodes.id] = null;
      this.disabledValue[nodes.id] = true;
    }
    if (event.value == 'null') {
      this.selectedOperator[nodes.id] = this.operatorList.find((it) => it.value == 'null')
      this.Error[nodes.id] = false;
      this.disabledValue[nodes.id] = true;
    }
    if (this.Error[nodes.id]) {
      this.Error[nodes.id].operator = false;
    }
    // this.selectedValue[nodes.id] = null;
    // delete nodes.pattern;
    // delete nodes.value;
    // nodes[event.key] = null;
  }
  private valueFn(event, nodes, flag) {
    if (event && !Array.isArray(event)) {
      event = event.trim();
    }
    if (event) {
      delete nodes.specialCharError;
      if (nodes.type) {
        nodes.value = event;
        //nodes[this.selectedOperator[nodes.id].key] = event;
        if (nodes.type === 'in') {
          if (event.indexOf(',') !== -1) {
            //nodes[this.selectedOperator[nodes.id].key] = event.split(',');
            nodes.value = event.split(',');
          } else if (!Array.isArray(event)) {
            //nodes[this.selectedOperator[nodes.id].key] = [event];
            nodes.value = event.split(',');
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
      if (Array.isArray(nodes.value)) {
        nodes.value.forEach(val => {
          if (!this.aphaNumeric.test(val)) {
            nodes.specialCharError = true;
            flag = false;
          }
        });
      } else {
        if (!this.aphaNumeric.test(nodes.value)) {
          nodes.specialCharError = true;
          flag = false;
        }
      }
    }
  }
  private getEditDataFn(conditions) {
    this.i += 1;
    conditions.forEach(item => {
      this.disabledValue[item.id] = false;
      if (item.fieldName) {
        this.getfieldName(item.fieldName, item.id , true);
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
      let type = item.type;
      if (!item.value && ('pattern' in item == false)) {
        item.type = type;
        if(item.type){
          const opt = this.operatorList.find((it) => it.value == 'null')
          this.selectedValue[item.id] = null
          this.disabledValue[item.id] = true;
          this.selectedOperator[item.id] = opt; 
        }
           }
           if (!item.value && item.type === 'equal') {
            type = 'null';
            item.type = 'null'
            this.disabledValue[item.id] = true;
          }
    });
  }

  private getfieldName(field, id, flag = true) {
    if (flag) {
      this.ContextfieldName[id] = field;
    }

  }

  private getOperator(type, id) {
    this.selectedOperator[id] = this.operatorList.find(x => x.value === type);
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
    this.selectedOperator[id] = null;
    this.selectedValue[id] = null;
  }

  close(){
    this.isVisible=false;
    this.closeCreate.emit(this.isVisible);
  }
}
