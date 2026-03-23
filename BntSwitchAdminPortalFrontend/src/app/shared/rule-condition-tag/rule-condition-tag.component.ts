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

@Component({
  selector: 'rule-condition-tag',
  templateUrl: './rule-condition-tag.component.html',
  styleUrls: ['./rule-condition-tag.component.scss'],
})
export class RuleConditionTagComponent implements OnInit, OnChanges {
  @Output() addSubRule: EventEmitter<any> = new EventEmitter<any>();
  @Input() conditionObj: any;
  @Input() getruleData: any;
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
  public selectedType = [];
  public typeList = [{ name: 'Request' }, { name: 'Response' }];
  public ruleTypeRoute: any;
  public currentLang: string;
  public Labels: any;
  @Input() nodes: any;
  @Input() id: any;
  @Input() inputruleData: any;
  @Input() serviceList: any;
  @Input() operatorList: any;
  @Input() selectedService: any;
  ruleData: any = [];
  public operator = [];
  public fieldName = [];
  public showService = [];
  public showType = [];
  public value = null;
  constructor(
    private subscribeService: SubscribeService,
    private _store: Store<IAppState>,
    private translate: TranslateService,
  ) {}

  ngOnInit() {
    // if (this.inputruleData && this.nodes.length) {
    //   this.selectedService = this.selectedService
    //   this.getEditDataFn();
    // }
  }

  ngOnChanges() {
    if (this.inputruleData && this.nodes.length) {
      this.selectedService = this.selectedService;
      this.getEditDataFn();
    }
  }

  private getEditDataFn() {
    this.nodes.forEach(item => {
      let output;
      if (item.key) {
        output = this.findById(this.inputruleData, item.key);
      } else {
        output = {
          datatype: null,
          data: [],
        };
      }
      switch (output.datatype) {
        case null:
          item.operators = this.operatorList.stringOperators;
          break;
        default:
          item.operators = this.operatorList.stringOperators;
          break;
      }
      item.dataList = output.data || [];
      if (item.service === 'GATEWAY_SERVICE') {
        this.typeList = [{ name: 'Request' }];
      } else {
        this.typeList = [{ name: 'Response' }];
      }
      item.typeList = this.typeList;
    });
  }

  findById(tree, nodeId) {
    for (let node of tree) {
      if (node.key === nodeId) return node;

      if (node.children) {
        let desiredNode = this.findById(node.children, nodeId);
        if (desiredNode) return desiredNode;
      }
    }
    return false;
  }

  addrule() {
    if (this.selectedService === 'GATEWAY_SERVICE') {
      this.typeList = [{ name: 'Request' }];
    } else {
      this.typeList = [{ name: 'Response' }];
    }
    this.nodes.push({
      delete: false,
      group: false,
      key: null,
      nodes: [],
      operator: null,
      relation: 'AND',
      value: null,
      service: this.selectedService,
      id: this.nodes.length,
      typeList: this.typeList,
      operators: [],
      message: null,
      dataList: [],
    });
  }

  public createGroup(rules: any, id: number) {
    const node = {
      delete: false,
      group: false,
      type: null,
      key: null,
      service: this.selectedService,
      nodes: [],
      operator: null,
      relation: null,
      message: null,
      value: null,
      id: null,
      typeList: this.typeList,
      dataList: [],
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
    node.service = e;
    this.selectedService = e;
    if (e === 'GATEWAY_SERVICE') {
      this.typeList = [{ name: 'Request' }];
    } else {
      this.typeList = [{ name: 'Response' }];
    }
    node.typeList = this.typeList;
    this.subscribeService.sendServiceItems(this.selectedService);
  }

  public typeChange(e?: any, node?: any) {
    node.message = e.name;
  }

  public textData() {
    this.valueFileds = !this.valueFileds;
    this.error = false;
  }

  public isLeaf(node): boolean {
    return node.nodes.length === 0;
  }

  public toData(e, node): any {
    node.value = e !== undefined ? e.value : '';
  }

  public toDataInput(e, node: any) {
    node.value = e !== undefined ? e.currentTarget.value : '';
    this.validation(e);
  }

  public validation(e: any) {
    const value = e.currentTarget.value;
    if (value && this.validation_Type === 'number') {
      if (!this.reg.test(value)) {
        this.error = true;
      } else {
        this.error = false;
      }
      this.addSubRule.emit(this.error);
    }
  }

  onChange($event: any, node): void {
    const output = this.findById(this.inputruleData, $event);
    node.value = null;
    switch (output.datatype) {
      case null:
        node.operators = this.operatorList.stringOperators;
        break;

      default:
        node.operators = this.operatorList.stringOperators;
        break;
    }
    if (output.data && output.data.constructor === Array) {
      node.dataList = output.data;
    } else {
      node.dataList = [];
    }
  }
}
