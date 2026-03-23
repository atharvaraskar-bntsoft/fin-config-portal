import { Component, OnInit, EventEmitter, Output, Input, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { selectViewSettingsList } from '@app/store/selectors/view-settings.selector';
import { IAppState } from '@app/store/state/app.state.js';
import { Store, select } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import { ruleEngineService } from '@app/services/rule-engine.services';
import { ViewSettingGetObject } from '@app/models/view-settings.interface';
import { GetRuleCondition } from '@app/store/actions/router.actions';
import { selectGetRuleCondition } from '@app/store/selectors/router.selectors';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-rule-condition',
  templateUrl: './rule-condition.component.html',
  styleUrls: ['./rule-condition.component.scss'],
})
export class RuleConditionComponent implements OnInit {
  public reg = new RegExp('^[0-9]+$');
  public aphaNumeric = new RegExp('^[A-Za-z0-9]+$');
  public ruleData: any;
  public operator = [];
  public showdelete = false;
  public valueFileds = true;
  public childRuleData: any;
  public inputDisbale = true;
  public error = [];
  public enumRuleData = [];
  public validation_Type;
  public showhideflag = true;
  public enum = [];
  public currentLang: string;
  public Labels: any;
  public typeList = [{ name: 'Request' }, { name: 'Response' }];
  public selectedType = [];
  public selectedService = [];
  public showService = [];
  public showType = [];
  public serviceList;
  public fieldName = [];
  public componetDestroyed = new Subject();
  @Input() public operatorList = [
    { text: 'Equal', value: 'equal' },
    { text: 'In', value: 'in' },
    { text: 'Starts_With', value: 'starts_with' },
  ];
  @Output() public addSubRule: EventEmitter<any> = new EventEmitter<any>();
  @Output() public serviceData: EventEmitter<any> = new EventEmitter<any>();
  @Output() public hideSave: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() public conditionError: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Input() public conditionObj: any;
  @Input() public hide = false;
  @Input() public getruleData: any;
  @Input() public serviceType;
  @Input() public exchangeType: any;
  @Input() public page;

  public showPattern = [];
  constructor(
    private _store: Store<IAppState>,
    private translate: TranslateService,
    private _ruleEngineService: ruleEngineService,
    private activeRouter: ActivatedRoute,
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
          this.ruleData = ruleData.data.fields.filter(it => it.label);
          this.serviceList = ruleData.data.service;
          this.serviceData.emit(ruleData.data.service);
          if (
            this.conditionObj &&
            this.conditionObj.conditions &&
            this.conditionObj.conditions.length > 0
          ) {
            // this.conditionObj = this.getruleData;
            this.getEditDataFn();
          }
        }
      });
  }

  public ngOnInit() {
    if (!this.conditionObj) {
      this.conditionObj = { type: 'and', conditions: [] };
    }
  }

  public filedsData(e?: any, node?: any) {
    const id = node.id;
    node.fieldName = e.name;
    this.showService[id] = false;
    this.showType[id] = false;
    this.selectedService[id] = this.serviceList[0];
    this.selectedType[id] = this.typeList[0].name;
    if (e) {
      if (!this.hide) {
        if (e.useCase === '2' || e.useCase === '3') {
          this.showService[id] = true;
          this.serviceChange(this.selectedService[id], node);
        }
        if (e.useCase === '3') {
          this.showType[id] = true;
          this.typeChange(this.selectedType[id], node);
        }
      } else {
        if (e.useCase === '2' || e.useCase === '3') {
          const data = node.fieldName.split('].');
          node.fieldName = '${message_exchange.[' + this.serviceType + '].' + data[1];
        }
        if (e.useCase === '3') {
          if (this.exchangeType === 'Request') {
            node.fieldName = node.fieldName.replace('response_message', 'request_message');
          } else {
            node.fieldName = node.fieldName.replace('request_message', 'response_message');
          }
        }
        this.addSubRule.emit(this.conditionObj);
      }
      this.inputDisbale = false;
      this.error[node.id] = false;
      this.validation_Type = e.datatype;
      this.opratersList(e, id, node);
      this.checkError();
    }
  }
  public serviceChange(e?: any, node?: any) {
    const data = node.fieldName.split('].');
    node.fieldName = '${message_exchange.[' + e + '].' + data[1];
    this.addSubRule.emit(this.conditionObj);
  }
  public typeChange(e?: any, node?: any) {
    if (e === 'Request' || e.name === 'Request') {
      node.fieldName = node.fieldName.replace('response_message', 'request_message');
    } else {
      node.fieldName = node.fieldName.replace('request_message', 'response_message');
    }
    this.addSubRule.emit(this.conditionObj);
  }

  public opratersList(e: any, id, node) {
    this.operator[id] = e.operator;
    if (e.data && e.data.length > 0) {
      this.enumRuleData[id] = e.data
        ? e.data.map(cur => {
            const item = {
              text: cur,
              value: cur,
            };
            return item;
          })
        : [];
      this.enum[id] = true;
      node.value = this.enumRuleData[id][0].value;
    } else {
      this.enum[id] = false;
      node.value = null;
    }
  }

  public createGroup(data: any, id: number) {
    this.showdelete = true;
    const i = data.id.toString();
    const array = i.split('-');
    if (array) {
      id = array[array.length - 1];
    }
    data.group = true;
    this.conditionObj.conditions[id] = { type: 'and', conditions: [] };
    data.id = data.id + '-' + this.conditionObj.conditions[id].conditions.length;
    this.conditionObj.conditions[id].conditions.push(data);
    this.conditionObj.conditions[id].conditions.push({
      fieldName: null,
      group: true,
      id: i + '-' + this.conditionObj.conditions[id].conditions.length,
      type: null,
      value: null,
    });
  }

  public opratersData(e?: any, nodes?: any) {
    if (e.key === 'pattern') {
      this.showPattern[nodes.id] = true;
      if (!nodes.pattern) {
        nodes.pattern = null;
      }
      if (nodes.value) {
        nodes.pattern = nodes.value;
      }
      delete nodes.value;
    } else {
      this.showPattern[nodes.id] = false;
      if (!nodes.value) {
        nodes.value = null;
      }
      if (nodes.pattern) {
        nodes.value = nodes.pattern;
      }
      delete nodes.pattern;
    }
    // if (e.key === "pattern" && nodes.value) {
    //   nodes.pattern = nodes.value;
    // } else {
    //  delete nodes.pattern;
    // }
    // this.node.operator = e !== undefined ? e.value : '';
    if (this.hide) {
      this.addSubRule.emit(this.conditionObj);
    }
    this.checkError();
  }

  public delete(id?: any) {
    let index1;
    this.conditionObj.conditions.forEach((item, index) => {
      if (id.conditions) {
        if (item === id) {
          index1 = index;
        }
      } else {
        if (item.id === id) {
          index1 = index;
        }
      }
    });
    if (index1 > -1) {
      this.conditionObj.conditions.splice(index1, 1);
    }
    this.addSubRule.emit(this.conditionObj);
  }

  public toData(e?: any, nodes?: any) {
    if (nodes.type === 'like' && e) {
      nodes.pattern = e;
    } else {
      delete nodes.pattern;
    }
  }

  public toDataInput(e?: any, nodes?: any) {
    if (nodes.type === 'like' && e) {
      nodes.pattern = e;
    } else {
      delete nodes.pattern;
    }
    this.validation(e);
  }

  public validation(e: any, nodes?: any) {
    const value = e.currentTarget.value;
    this.error[nodes.id] = false;
    if (value) {
      if (this.page !== 'postAction' && nodes.type !== 'in') {
        if (this.validation_Type === 'number' || this.validation_Type === 'integer') {
          if (!this.reg.test(value)) {
            this.error[nodes.id] = true;
          }
        } else {
          if (!this.aphaNumeric.test(value)) {
            this.error[nodes.id] = true;
          }
        }
      }
    } else {
      this.error[nodes.id] = true;
    }

    if (this.hide) {
      this.addSubRule.emit(this.conditionObj);
    }
    if (nodes && !nodes.value) {
      nodes.value = null;
      this.addSubRule.emit(this.conditionObj);
    }
    if (this.error[nodes.id]) {
      this.hideSave.emit(true);
    } else {
      if (JSON.stringify(this.error).indexOf('true') === -1) {
        this.hideSave.emit(false);
      }
    }
    this.checkError();
  }
  public hideSavefn(event) {
    if (event || JSON.stringify(this.error).indexOf('true') === -1) {
      this.hideSave.emit(event);
    }
  }
  public addrule() {
    // tslint:disable-next-line: object-literal-sort-keys
    this.conditionObj.conditions.push({
      type: null,
      fieldName: null,
      value: null,
      id: this.conditionObj.conditions.length,
    });
    this.addSubRule.emit(this.conditionObj);
  }

  public getRule(e) {
    this.addSubRule.emit(this.conditionObj);
  }
  public changeRelation(value) {
    this.conditionObj.type = value;
  }

  public emitJson() {
    if (this.hide) {
      this.addSubRule.emit(this.conditionObj);
    }
    this.checkError();
  }
  public checkError() {
    let flag = 1;
    this.conditionObj.conditions.forEach(element => {
      if (!element.fieldName || !element.value || !element.type) {
        flag = 0;
      }
    });
    if (flag) {
      this.conditionError.emit(false);
    }
  }
  public emitError(event) {
    this.conditionError.emit(event);
  }
  private getEditDataFn() {
    this.conditionObj.conditions.forEach(item => {
      if (item.fieldName) {
        if (item.fieldName.indexOf(']') !== -1) {
          const data = item.fieldName.split(']');
          if (data.length > 2) {
            this.showService[item.id] = true;
            this.showType[item.id] = true;
            this.selectedService[item.id] = data[0].split('[')[1];
            if (data[1].indexOf('request') !== -1) {
              this.selectedType[item.id] = 'Request';
            } else {
              this.selectedType[item.id] = 'Response';
              data[1] = data[1].replace('response', 'request');
            }
            this.fieldName[item.id] = this.ruleData.find(
              x => x.name.indexOf(data[1].split('[')[1]) !== -1,
            );
          } else {
            this.showService[item.id] = true;
            this.selectedService[item.id] = data[0].split('[')[1];
          }
          this.fieldName[item.id] = this.ruleData.find(x => x.name.indexOf(data[1]) !== -1);
        } else {
          this.fieldName[item.id] = this.ruleData.filter(data => data.name === item.fieldName)[0];
        }
        this.operator[item.id] = this.fieldName[item.id].operator;
        if (this.fieldName[item.id].data && this.fieldName[item.id].data.length > 0) {
          this.enum[item.id] = true;
          this.enumRuleData[item.id] = this.fieldName[item.id].data
            ? this.fieldName[item.id].data.map(cur => {
                const item1 = {
                  text: cur,
                  value: cur,
                };
                return item1;
              })
            : [];
        } else {
          this.enum[item.id] = false;
        }
      }
      if (item.pattern) {
        this.showPattern[item.id] = true;
      } else {
        this.showPattern[item.id] = false;
      }
    });
  }
}
