import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'packager-condition',
  templateUrl: './packager_condition.component.html',
  styleUrls: ['./packager_condition.component.scss'],
})
export class PackagerConditionComponent implements OnInit {
  @Input() resCondition = [];
  @Input() listIdRule;
  @Input() btnText = 'Save';
  public ruleListItem = [];
  public condition = [{ fieldName: null, type: 'equal', value: '' }];
  public ruleTypeList = [
    { name: 'Equal', value: 'equal' },
    { name: 'Starts With', value: 'starts_with' },
  ];
  public aphaNumeric = new RegExp('^[0-9a-zA-Z ]+$');
  public valueValidError = false;
  public ruleError = false;
  @Output() public addCondition: EventEmitter<any> = new EventEmitter<any>();
  constructor() {}
  public ngOnInit() {
    if (this.resCondition && this.resCondition.length > 0) {
      this.condition = JSON.parse(JSON.stringify(this.resCondition));
    }
    this.ruleListItem = JSON.parse(JSON.stringify(this.listIdRule));
    this.ruleListItem.map(item => {
      item.id = '${' + item.id + '}';
      return item;
    });
  }
  public valueValidation(data) {
    if (!this.aphaNumeric.test(data)) {
      this.valueValidError = true;
    } else {
      this.valueValidError = false;
    }
  }

  public pushItem() {
    this.condition.push({
      fieldName: null,
      type: 'equal',
      value: '',
    });
  }
  public pullItem() {
    this.condition.pop();
    this.checkError();
  }
  public checkError() {
    let data = JSON.stringify(this.condition);
    data = data.replace(new RegExp('"value":""', 'g'), '"value": null');
    if (data.indexOf('null') === -1) {
      this.ruleError = false;
    }
  }
  public saveFn() {
    this.checkValidation();
    if (!this.ruleError && !this.valueValidError) {
      let data;
      if (this.condition.length < 2) {
        data = JSON.parse(JSON.stringify(this.condition[0]));
      } else {
        data = {
          conditions: JSON.parse(JSON.stringify(this.condition)),
          type: 'and',
        };
      }
      this.addCondition.emit(data);
    }
  }
  public checkValidation() {
    this.ruleError = false;
    this.valueValidError = false;
    this.condition.forEach(item => {
      if (!item.fieldName || !item.type || !item.value) {
        this.ruleError = true;
      } else {
        this.valueValidation(item.value);
      }
    });
  }
}
