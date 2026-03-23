import {
  Component,
  OnInit,
  EventEmitter,
  Output,
  Input,
  SimpleChanges,
  OnChanges,
} from '@angular/core';
import { IAppState } from '@app/store/state/app.state.js';
import { Store, select } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import { SubscribeService } from '@app/services/subscribe.services';
import { selectViewSettingsList } from '@app/store/selectors/view-settings.selector';
import { ViewSettingGetObject } from '@app/models/view-settings.interface';

@Component({
  selector: 'app-rule-decision-condition',
  templateUrl: './rule-decision-condition.component.html',
  styleUrls: ['../rule-condition-node/rule-condition-node.component.scss'],
})
export class RuleDecisionConditionComponent implements OnInit {
  @Output() addSubRule: EventEmitter<any> = new EventEmitter<any>();
  @Input() conditionObj: any;
  @Input() getruleData: any;
  @Input() showTooltip: boolean;
  public stringOpraters: any = [
    { text: '== equals', value: '==' },
    { text: '!= not equals', value: '!=' },
  ];
  public numberOpraters: any = [
    { text: '== equals', value: '==' },
    { text: '!= not equals', value: '!=' },
    { text: '> greater than', value: '>' },
    { text: '< less than', value: '<' },
  ];
  public enumOpraters: any = [
    { text: '== equals', value: '==' },
    { text: '!= not equals', value: '!=' },
  ];
  public reg = new RegExp('^[0-9]+$');
  public valueFileds = true;
  public childRuleData: any;
  public inputDisbale = true;
  public error = false;
  public enumRuleData = [];
  public validation_Type: String;
  public showhideflag = true;
  public enum = [];
  public element: any;
  public elementValue: any;
  public keyType: String;
  public operatorType: String;
  public valueType: any;
  public nodeItem: any = {
    group: false,
    key: null,
    message: null,
    service: null,
    nodes: [],
    operator: null,
    relation: null,
    value: null,
  };
  public selectedType = [];
  public selectedService = [];
  public typeList = [{ name: 'Request' }, { name: 'Response' }];
  public ruleTypeRoute: any;
  public currentLang: string;
  public Labels: any;
  @Input() nodes: any;
  @Input() allnode: any;
  @Input() id: any;
  @Input() inputruleData: any;
  @Input() serviceList: any;
  ruleData: any = [];
  public operator = [];
  public fieldName = [];
  public showService = [];
  public showType = [];
  @Input() allnodes: any = [];
  constructor(private _store: Store<IAppState>, private translate: TranslateService) {  }

  ngOnInit() {

    this._store.pipe(select(selectViewSettingsList)).subscribe((response: ViewSettingGetObject) => {
      if (response) {
        this.currentLang = response.data.settingDto.language;
        this.translate.setDefaultLang(this.currentLang);
      }
    });
    if (this.inputruleData) {
      this.childRuleData = this.inputruleData;
      if (this.childRuleData) {
        this.ruleData = this.childRuleData.fields
          .map(item => {
            item.value = item.name;
            item.text = item.label;
            return item;
          })
          .filter(it => it.label);
      }
      this.getEditDataFn(this.nodes);
    }
  }

  private getEditDataFn(nodes) {
    nodes &&
      nodes.forEach(item => {
        if (item.key) {
          this.fieldName[item.id] = this.ruleData.find(x => x.label == item.fieldName);
          if (item.message === 'request_message') {
            this.selectedType[item.id] = 'Request';
            this.showType[item.id] = true;
          } else if (item.message === 'response_message') {
            this.selectedType[item.id] = 'Response';
            this.showType[item.id] = true;
          }
          if (item.service) {
            this.showService[item.id] = true;
            this.selectedService[item.id] = item.service;
          }
          this.operator[item.id] = this.fieldName[item.id].operator;
          if (this.fieldName[item.id].data && this.fieldName[item.id].data.length > 0) {
            this.enum[item.id] = true;
            this.enumRuleData[item.id] = this.fieldName[item.id].data
              ? this.fieldName[item.id].data.map(cur => {
                  return {
                    text: cur,
                    value: cur,
                  };
                })
              : [];
          } else {
            this.enum[item.id] = false;
          }
        }
      });
  }

  addrule() {
    this.nodes?.push({
      group: false,
      key: null,
      nodes: [],
      operator: null,
      relation: 'AND',
      value: null,
      id: this.nodes.length,
    });
  }

  public filedsData(node, e?: any) {
    if (e !== undefined) {
      this.showService[node.id] = this.showService[node.id] = false;
      this.showType[node.id] = false;
      this.selectedService[node.id] = null;
      this.selectedType[node.id] = null;
      node.fieldName = e.label;
      node.key = e.name;
      if (e.useCase === '2' || e.useCase === '3') {
        this.showService[node.id] = true;
      }
      if (e.useCase === '3') {
        this.showType[node.id] = true;
      }
      this.inputDisbale = false;
      this.validation_Type = e.datatype;
      node.validation_Type = e.datatype;
      node.service = null;
      node.message = null;
      node.value = null;
      this.opratersList(e, node.id);
    }
  }

  public opratersList(e: any, id) {
    this.operator[id] = e.operator;
    if (e.data && e.data.length > 0) {
      this.enum[id] = true;
    } else {
      this.enum[id] = false;
    }
    this.enumRuleData[id] = e.data
      ? e.data.map(cur => {
          const item = {
            text: cur,
            value: cur,
          };
          return item;
        })
      : [];
  }

  public createGroup(rules: any, id: number) {
    const node = {
      delete: false,
      group: false,
      key: null,
      service: null,
      nodes: [],
      operator: null,
      relation: null,
      message: null,
      value: null,
      id: null,
    };
    node.id = rules.id + '-' + rules.nodes.length;
    node.relation = 'AND';
    node.nodes = [];
    rules.group = true;
    rules.nodes.push(node);
  }

  public opratersData(node, e?: any) {
    node.operator = e !== undefined ? e.value : '';
  }

  public delete(node, id) {
    const index = this.nodes.findIndex(item => item.id === node.id);
    this.nodes.splice(index, 1);
  }

  public serviceChange(e?: any, node?: any) {
    if (this.selectedType[node.id]) {
      if (node.key.indexOf('.request_message') !== -1) {
        const data = node.key.split('].request_message')[1];
        node.key = '${message_exchange[' + e + '].request_message' + data;
        node.service = e;
      } else if (node.key.indexOf('.response_message') !== -1) {
        const data = node.key.split('].response_message')[1];
        node.key = '${message_exchange[' + e + '].response_message' + data;
        node.service = e;
      }
    } else {
      const { key } = node;
      const data = key.split(']').slice(-2);
      node.key = '${message_exchange[' + e + ']' + data[0] + ']' + data[1];
      node.service = e;
    }
  }

  public typeChange(e?: any, node?: any) {
    if (e.name === 'Request' && node.key?.indexOf('.SELECTED_TYPE') > -1) {
      node.key = node.key.replace('SELECTED_TYPE', 'request');
      node.message = 'request_message';
    } else if (node.key?.indexOf('.SELECTED_TYPE') > -1 && e.name === 'Response') {
      node.key = node.key.replace('SELECTED_TYPE', 'response');
      node.message = 'response_message';
    }
  }

  public textData() {
    this.valueFileds = !this.valueFileds;
    this.error = false;
  }

  public isLeaf(node): boolean {
    return node.nodes?.length === 0;
  }

  public toData(node, e?: any): any {
    node.value = e !== undefined ? e.value : '';
  }

  public condition(node): boolean {
    if (this.allnode?.length > 0) {
      return (
        node.relation !== '' &&
        this.allnode.filter(item => !item.delete)?.length - 1 !== parseInt(this.id)
      );
    } else {
      return node.id.toString().split('-')?.length === 1;
    }
  }

  public toDataInput(node, e?: any) {
    node.value = e !== undefined ? e.currentTarget?.value : '';
    this.validation(e, node);
  }

  public validation(e: any, node?) {
    const value = e.currentTarget.value;
    if (value && this.validation_Type === 'number') {
      if (!this.reg.test(value)) {
        node.error = true;
      } else {
        node.error = false;
      }
    } else if (!this.isValid(value)) {
      node.error = true;
    } else {
      node.error = false;
    }
    this.error = node.error;
    this.addSubRule.emit(this.error);
  }

  isValid(str) {
    return /^([a-z0-9\s]+,)*([a-z0-9\s]+){1}$/g.test(str);
    // return /^[a-zA-Z0-9]*$/g.test(str);
  }
}
