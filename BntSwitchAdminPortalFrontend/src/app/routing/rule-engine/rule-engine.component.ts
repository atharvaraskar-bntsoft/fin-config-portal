import { Component, OnInit, Inject } from '@angular/core';
import data from './droolmodconfig.json';
import { Router, ActivatedRoute } from '@angular/router';
import { DOCUMENT } from '@angular/common';
import { RuleCreateEditConfig } from '@app/config/i18n/rule-create-edit.config';
import {
  GetRuleItem,
  PostRule,
  PutRule,
  ClearState,
  GetRuleCondition,
} from '@app/store/actions/rule-engine.actions';
import { Store, select } from '@ngrx/store';
import { IAppState } from '@app/store/state/app.state';
import {
  selectGetRuleItem,
  selectPostRule,
  selectPutRule,
  selectGetRuleCondition,
} from '@app/store/selectors/rule-engine.selector';
import { selectViewSettingsList } from '@app/store/selectors/view-settings.selector';
import { AlertService } from '@app/services/alert.service';
import { TranslateService } from '@ngx-translate/core';
import { Subscription, Subject } from 'rxjs';
import { ViewSettingGetObject } from '@app/models/view-settings.interface.js';
import { takeUntil } from 'rxjs/operators';
import { Utils } from 'src/utils';
import { IIsErrorEvent } from './child-rule/child-rule.component';
import { GetMessageContextList } from '../../store/actions/l1-adapter.action';
import { SelectMessageContextList } from '../../store/selectors/l1-adapter.selectors';
import { RulesService } from '@app/services/rule.service';

@Component({
  selector: 'app-rule-engine',
  styleUrls: ['rule-engine.component.scss'],
  templateUrl: 'rule-engine.component.html',
})
export class RuleEngineComponent implements OnInit {
  public ruleList: any;
  subscription: Subscription;
  public activeTab = 'options';
  public outpustLabel: String;
  public isEditable: Boolean = false;
  public validationPush: any = [];
  public ruleDataOutput: any;
  public multiple: any;
  public language: any;
  public ruleId: any = 0;
  public node: any = [];
  public sendNewObject: any = [];
  public selectdestinations: any = [];
  public ruleData = data.data;
  public config = RuleCreateEditConfig;
  public texts: any;
  public destinationsValues: any = '';
  public description: String = '';
  public name: String = '';
  public enabled = false;
  public popupslide = false;
  public sendObject: any;
  public editnode: any;
  public error = false;
  public erroemessage = '';
  public validationError: Array<any> = [];
  public nodeItem: any = {
    delete: false,
    group: false,
    key: null,
    nodes: [],
    operator: null,
    relation: null,
    value: null,
  };
  public currentLang: string;
  public Labels: any;
  public ruleTypeRoute: any;
  public inputfields: Array<any> = [];
  public additionField: any[] = [];
  public result: any;
  public validationErrorMessage = false;
  componetDestroyed = new Subject();
  public model: any = {};
  switchcontrol: boolean;
  isErrorFromChild: IIsErrorEvent;
  placeholderMapping = {
    ruleName: 'RuleName',
    ruleDesc: 'RuleDescription',
  };
  public ruleNameRegex = '^[a-zA-Z0-9-_]+$';
  public ruleDescriptionRegex = '^[a-zA-Z0-9-_ ]+$';
  public jsonData;
  public isVisiblecon = false;
  public conditionObj;
  public showError = false;

  constructor(
    private _store: Store<IAppState>,
    private translate: TranslateService,
    private _rulesService: RulesService,
    protected router: Router,
    private activeRouter: ActivatedRoute,
    @Inject(DOCUMENT) document,
    public alertService: AlertService,
  ) {
    
  }

  ngOnInit() {
    this.ruleId = this.activeRouter.snapshot.params.id;
    this._store
      .pipe(takeUntil(this.componetDestroyed), select(selectViewSettingsList))
      .subscribe((response: ViewSettingGetObject) => {
        if (response) {
          this.currentLang = response.data.settingDto.language;
        }
        this.translate.setDefaultLang(this.currentLang);
      });
    if (this.activeRouter.snapshot.params.id !== undefined) {
      this._store.dispatch(new GetRuleItem(this.ruleId));
    } else {
      this._store.dispatch(new ClearState());
    }
    this.ruleTypeRoute = this.activeRouter.snapshot.data.ruletype;
    this.texts = this.config['texts']['en_EN'];

    this._store
      .pipe(takeUntil(this.componetDestroyed), select(selectGetRuleCondition))
      .subscribe((ruleData: any) => {
        if (ruleData && ruleData.data !== null) {
          this.ruleData = Utils.newData(ruleData.data);
          if (this.ruleData) {
            this.ruleDataOutput = this.ruleData['output']['values'].map((item: any) => {
              item.text = item.label;
              item.value = item.name;
              return item;
            });
            this.outpustLabel = this.ruleData['output'].label;
            this.isEditable = this.ruleData['output'].editable;
            this.multiple = this.ruleData['output'].multiple;
            this.inputfields = this.ruleData['inputfields'];
            this.inputfields = this.inputfields.map(item => {
              item.value = null;
              return item;
            });
            this._store
              .pipe(takeUntil(this.componetDestroyed), select(selectGetRuleItem))
              .subscribe((item: any) => {
                if (item && item.data !== null) {
                  this.result = JSON.parse(JSON.stringify(item));
                  if (item.data.rule.condition) {
                    this.conditionObj = JSON.parse(JSON.stringify(item.data.rule.condition));
                  }
                  this._transFrom(this.result);
                }
              });
          }
        }
      });
    this._store.dispatch(new GetMessageContextList(0));
    this._store.pipe(select(SelectMessageContextList)).subscribe((response: any) => {
      if (response && response.data) {
        this.jsonData = response.data.messageContextFieldsByVersion;
      }
    });
    const ruleType = this.activeRouter.snapshot.data.ruletype === 'route' ? 1 : 2;
    this._store.dispatch(new GetRuleCondition({ ruletype: ruleType }));
  }

  ngOnDestroy() {
    this.componetDestroyed.next();
    this.componetDestroyed.unsubscribe();
    this._store.dispatch(new ClearState());
  }
  addrule() {
    const node = Object.assign({}, this.nodeItem);
    node.nodes = [];
    node.id = this.node.length;
    node.relation = 'AND';
    this.node.push(node);
  }

  public deleteElement(node) {
    this.node = this.node.filter(item => !item.delete);
  }

  private _transFrom(result: any) {
    if (result && result.data !== null) {
      this.editnode = result.data;
      this.destinationsValues = result.data.rule.destinations;
      this.description = result.data.rule.description;
      this.name = result.data.rule.name;
      this.enabled = result.data.rule.active;
      this.selectdestinations = this.destinationsValues.map(item => {
        return this.ruleDataOutput.find(
          (fielddata: any) => parseInt(fielddata.value, 0) === item.id,
        );
      });
      this.inputfields = this.inputfields.map(field => {
        if (field.dtoField === 'ruleName') {
          field.value = result.data.rule.name;
        } else if (field.dtoField === 'ruleDesc') {
          field.value = result.data.rule.description;
        } else {
          if (result.data.rule.additionalInfo) {
            const outputfield = result.data.rule.additionalInfo.find(element => {
              return field.dtoField === element.name;
            });
            if (outputfield) {
              field.value = outputfield.value;
            }
          }
        }
        return field;
      });
    }
  }

  private _transfromData(transformdata) {
    return transformdata.map(itemgroup => {
      if (itemgroup.group) {
        const temp = {
          group: itemgroup.group,
          id: itemgroup.id,
          nodes: [],
          relation: itemgroup.relation,
        };

        const arrayelempent = {
          group: false,
          id: itemgroup.id,
          key: itemgroup.key,
          nodes: [],
          operator: itemgroup.operator,
          relation: itemgroup.nodes.length > 0 ? itemgroup.nodes[0].relation : '',
          value: itemgroup.value,
        };

        itemgroup.nodes.unshift(arrayelempent);
        temp.nodes = itemgroup.nodes;
        itemgroup = temp;
        if (itemgroup.nodes.length > 0) {
          this._transfromData(itemgroup.nodes);
        }
      }
      return itemgroup;
    });
  }

  private _finledata(findata) {
    return findata.map(item => {
      delete item.delete;
      if (item.group) {
        delete item.key;
        delete item.operator;
        delete item.value;
        if (item.nodes.length > 0) {
          if (item.nodes.length > 1) {
            item.nodes[item.nodes.length - 1].relation = '';
          }
          this._finledata(item.nodes);
        }
      }
      return item;
    });
  }

  cancel() {
    if (this.ruleTypeRoute === 'route') {
      this.router.navigate(['routing/rule/destination']);
    } else {
      this.router.navigate(['routing/rule/workflow']);
    }
  }

  checkNameValidation() {
    this.validationPush = [];
    if (!this.name || !this.checkAlphaWithUnderndDashname(this.name)) {
      this.validationPush.push(1);
    }

    if (!this.description || !this.checkAlphaWithUnderndDashdesc(this.description)) {
      this.validationPush.push(2);
    }
    if (this.destinationsValues.length === 0) {
      this.validationPush.push(3);
    }
    return this.validationPush.length > 0;
  }

  public checkAlphaWithUnderndDashname(text) {
    const regex = /^[a-zA-Z0-9-_]+$/;
    return regex.test(text);
  }
  public checkAlphaWithUnderndDashdesc(text) {
    const regex = /^[a-zA-Z0-9-_ ]+$/;
    return regex.test(text);
  }

  save(comit) {
    if (!this.isErrorFromChild || !this.isErrorFromChild.error) {
      if (this.conditionObj) {
        const saveObject = {
          active: this.enabled,
          additionalInfo: this.additionField,
          commit: comit,
          description: this.description,
          destinations: this.destinationsValues,
          name: this.name,
          nodes: this.sendObject,
          ruleType: this.ruleTypeRoute,
          condition: this.conditionObj,
          conditionUi: this.conditionObj,
        };
        if (this.ruleId > 0) {
          const putreq = {
            rule: this.ruleId,
            saveObject: saveObject,
          };
          this._rulesService
            .putRule(putreq)
            .pipe(takeUntil(this.componetDestroyed))
            .subscribe((res: any) => {
              if (res) {
                const dataJson = res;
                if (dataJson['status'] === 'success') {
                  this.alertService.responseMessage(dataJson);
                  if (this.ruleTypeRoute === 'route') {
                    this.router.navigate(['routing/rule/destination']);
                  } else {
                    this.router.navigate(['routing/rule/workflow']);
                  }
                } else {
                  this.error = true;
                  this.erroemessage = res.message;
                }
              }
            });
        } else {
          this._rulesService
            .postRule(saveObject)
            .pipe(takeUntil(this.componetDestroyed))
            .subscribe((res: any) => {
              if (res) {
                const dataJson = res;
                if (dataJson['status'] === 'success') {
                  this.alertService.responseMessage(dataJson);
                  this.erroemessage = res.message;
                  if (this.ruleTypeRoute === 'route') {
                    this.router.navigate(['routing/rule/destination']);
                  } else {
                    this.router.navigate(['routing/rule/workflow']);
                  }
                } else {
                  this.error = true;
                  this.erroemessage = res.message;
                }
              }
            });
        }
      }
    } else {
      this.alertService.responseMessage({
        status: 'failure',
        message: 'Please Enter valid Text in Input Field',
      });
    }
  }
  routeName(event, dtoField) {
    if (dtoField === 'ruleName') {
      this.name = event.currentTarget.value.trim();
    } else if (dtoField === 'ruleDesc') {
      this.description = event.currentTarget.value.trim();
    } else {
      this.additionField = this.inputfields
        .filter(input => {
          if (input.dtoField === 'ruleName' || input.dtoField === 'ruleDesc') {
          } else {
            return input;
          }
        })
        .map(item => {
          const additiondata = {};
          additiondata['name'] = item.dtoField.trim();
          additiondata['value'] = item.value.trim();
          return additiondata;
        });
    }
  }

  changeStatus() {
    this.enabled = !this.enabled;
  }

  adddescription(event) {
    this.description = event.currentTarget.value;
  }

  destinations(row) {
    this.destinationsValues = row.map(item => {
      return item.value;
    });
  }

  saveRule(commit) {
    this.showError = true;
    this.validationErrorMessage = false;
    this.validationError = [];
    if (this.conditionObj && !this.checkNameValidation()) {
      this.popupslide = true;
      this.save(commit);
    } else {
      if (!this.conditionObj) {
        this.validationErrorMessage = true;
      }
      this.validationError.map(id => {
        if (document.getElementById(id) !== null) {
          document.getElementById(id).className = 'validation';
        }
      });
    }
  }
  public getRule(value) {
    this.conditionObj = value.condition;
    this.isVisiblecon = false;
  }
  public openCondition() {
    this.isVisiblecon = true;
  }
  public conCancel() {
    this.isVisiblecon = false;
  }

  private _removeDelete(removedata: any) {
    return removedata.map(item => {
      item.nodes = item.nodes.filter(del => del && !del.delete);
      item.nodes.map(childitem => {
        if (childitem.nodes.length > 0) {
          this._removeDelete(childitem.nodes);
        }
      });
      return item;
    });
  }

  private _validation(validatedata) {
    validatedata.map(item => {
      if (item.key === null || item.operator === null || item.value === null) {
        this.validationError.push(item.id);
      }
      if (document.getElementById(item.id) !== null) {
        document.getElementById(item.id).className = '';
      }

      if (item.nodes.length > 0) {
        this._validation(item.nodes);
      }
    });
    if (validatedata.length === 0) {
      this.validationErrorMessage = true;
    } else {
      this.validationErrorMessage = false;
    }
    return this.validationError.length > 0;
  }

  private _removeItem(remdata) {
    return remdata.map(item => {
      if (item.nodes.length > 0) {
        if (item.nodes.length > 1) {
          item.nodes[item.nodes.length - 1].relation = '';
        }
        item.nodes.map(chiditem => {
          if (chiditem.nodes.length > 0) {
            this._removeItem(chiditem.nodes);
          }
        });
      }
      return item;
    });
  }

  private _updateEditObject(updatedata) {
    return updatedata.map(item => {
      if (item.group && item.nodes.length > 0) {
        item.key = item.nodes[0].key;
        item.value = item.nodes[0].value;
        item.operator = item.nodes[0].operator;
        item.nodes[item.nodes.length - 1].relation =
          item.nodes.length > 1 ? item.nodes[item.nodes.length - 2].relation : 'AND';
      }
      item.nodes.shift();

      if (item.nodes.length > 0) {
        this._updateEditObject(item.nodes);
      }
      return item;
    });
  }
}
