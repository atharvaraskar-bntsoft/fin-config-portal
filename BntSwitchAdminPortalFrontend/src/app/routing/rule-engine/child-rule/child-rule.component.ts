export interface IIsErrorEvent {
  validation_Type: string;
  error: boolean;
}

import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { selectViewSettingsList } from '@app/store/selectors/view-settings.selector';
import { IAppState } from '@app/store/state/app.state.js';
import { Store, select } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import { ruleEngineService } from '@app/services/rule-engine.services';
import { ViewSettingGetObject } from '@app/models/view-settings.interface';
@Component({
  selector: 'app-child-rule',
  styleUrls: ['./child-rule.component.scss'],
  templateUrl: './child-rule.component.html',
})
export class ChildRuleComponent implements OnInit {
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
  public ruleData: any;
  public operator: any;
  public valueFileds = true;
  public childRuleData: any;
  public inputDisbale = true;
  public error = false;
  public enumRuleData = [];
  public validation_Type: string;
  public showhideflag = true;
  public enum = false;
  public element: any;
  public elementValue: any;
  public keyType: String;
  public operatorType: String;
  public valueType: any;
  public nodeItem: any = {
    delete: false,
    group: false,
    key: null,
    nodes: [],
    operator: null,
    relation: null,
    value: null,
  };
  public ruleTypeRoute: any;
  public currentLang: string;
  public Labels: any;

  @Output() addSubRule: EventEmitter<any> = new EventEmitter<any>();
  @Output() errorField: EventEmitter<IIsErrorEvent> = new EventEmitter<IIsErrorEvent>();
  @Input() node: any;
  @Input() allnode: any;
  @Input() id: any;
  @Input() inputruleData: any;
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
  }

  ngOnInit() {
    if (this.inputruleData) {
      this.childRuleData = this.inputruleData;
      if (this.childRuleData) {
        this.ruleData = this.childRuleData.fields.map(item => {
          item.value = item.name;
          item.text = item.label;
          item.toolTip = item.toolTip;
          return item;
        });
        this.keyType = this.node.key;
        this.operatorType = this.node.operator;
        this.valueType = this.node.value;
        if (this.keyType !== '') {
          this.filedsData(
            this.ruleData.find(item => item.name === this.keyType),
            false,
          );
        }
      }
    }
  }

  public filedsData(e?: any, trigger?: boolean) {
    if (trigger) {
      this.operatorType = null;
      this.valueType = null;
    }
    if (e !== undefined) {
      this.node.key = e.name;
      this.inputDisbale = false;
      this.validation_Type = e.datatype;
      this.opratersList(e);
    }
  }

  public opratersList(e: any) {
    this.operator = e.operator;
    this.enum = !e.data ? false : true;
    this.enumRuleData = e.data
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
    rules.group = true;
    const node = Object.assign({}, this.nodeItem);
    node.id = rules.id + '-' + this.node.nodes.length;
    node.relation = 'AND';
    node.nodes = [];
    // this.addSubRule.emit(this.node)
    this.node.nodes.push(node);
  }

  public opratersData(e?: any) {
    this.node.operator = e !== undefined ? e.value : '';
  }

  public delete(node, id) {
    this.node.delete = true;
    this.addSubRule.emit(true);
    if (node.id.toString().split('-').length === 1) {
      this._ruleEngineService.sendMessage(this.node);
    }
  }

  public showhide() {
    this.node.value = null;
    this.showhideflag = !this.showhideflag;
  }

  public textData() {
    this.valueFileds = !this.valueFileds;
    this.error = false;
  }

  public isLeaf(): boolean {
    return this.node.nodes.length === 0;
  }

  public toData(e?: any): any {
    this.node.value = e !== undefined ? e.value : '';
    const value = e.value;
    let { validation_Type, error } = this;
    if (value && this.validation_Type === 'number') {
      if (!this.reg.test(value)) {
        this.error = true;
      } else {
        this.error = false;
      }
    } else if (value && this.validation_Type === 'string') {
      if (!/[^a-zA-Z0-9]/.test(value)) {
        this.error = false;
      } else {
        this.error = true;
      }
    }
    this.errorField.emit({ validation_Type, error });
  }

  public condition(node): boolean {
    if (this.allnode.length > 0) {
      return (
        node.relation !== '' &&
        this.allnode.filter(item => !item.delete).length - 1 !== parseInt(this.id)
      );
    } else {
      return node.id.toString().split('-').length === 1;
    }
  }
  public toDataInput(e?: any) {
    this.node.value = e !== undefined ? e.currentTarget.value : '';
    this.validation(e);
  }

  public validation(e: any) {
    const value = e.currentTarget.value;
    let { validation_Type, error } = this;
    if (value && this.validation_Type === 'number') {
      if (!this.reg.test(value)) {
        this.error = true;
      } else {
        this.error = false;
      }
    } else if (value && this.validation_Type === 'string') {
      if (/^([A-Za-z0-9\s]+,)*([A-Za-z0-9\s]+){1}$/.test(value)) {
        this.error = false;
      } else {
        this.error = true;
      }
    }
    this.errorField.emit({ validation_Type, error });
  }
}
