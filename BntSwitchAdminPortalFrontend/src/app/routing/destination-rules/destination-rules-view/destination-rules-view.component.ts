import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { IAppState } from '@app/store/state/app.state';
import { Router, ActivatedRoute } from '@angular/router';
import { selectViewSettingsList } from '@app/store/selectors/view-settings.selector';
import { DestinationRulesConfig } from '@app/config/i18n/destination-rules.config';
import { ConfrimRule, ConfrimRuleUpdateRule } from '@app/store/actions/destination-rules.action';
import {
  confrimRuleResponse,
  confrimUpdateRuleResponse,
} from '@app/store/selectors/destination-rules.selector';
import { TranslateService } from '@ngx-translate/core';
import { ViewSettingGetObject } from '@app/models/view-settings.interface';
import { selectPermissionsData } from '@app/store/selectors/permission.selectors';

@Component({
  selector: 'app-destination-rules-view',
  styleUrls: ['./destination-rules-view.component.scss'],
  templateUrl: './destination-rules-view.component.html',
})
export class DestinationRulesViewComponent implements OnInit {
  public destinationview: any;
  public row: any;
  public rows: any;
  public prejson: any;
  public Labels: any;
  public currentLang: string;
  public rowsInfo: any;
  public ruletype: any;
  public routPath: any;
  public ruleFlag = true;
  public permission: any;
  public routingDestinationId = 'link_routing_rule';
  public routingWorkflowRuleId = 'link_workflow_rule';
  public permissionObject = {
    check: null,
    delete: null,
    id: '',
    read: null,
    update: null,
    write: null,
  };

  constructor(
    private _store: Store<IAppState>,
    private translate: TranslateService,
    private _router: Router,
    private _route: ActivatedRoute,
  ) {
    
  }
  public getRowData(row) {
    this._router.navigate(['/routing/rule-engine/', this.ruletype, 'edit', row.id]);
  }

  private _dataTransform(rows: any): any {
    if (rows) {
      this.ruleFlag = true;
      this.rowsInfo = rows;
      this.prejson = rows.ruleConfiguration;
    }
  }

  public onBack() {
    this.ruletype = this._route.snapshot.data.ruletype;
    if (this.ruletype === 'workflow') {
      this._router.navigate(['/routing/rule/workflow']);
    } else {
      this._router.navigate(['/routing/rule/destination']);
    }
  }

  public onShowRule(item): void {
    item.show = !item.show;
  }

  showJson(item) {
    if (item.ruleJson) {
      return JSON.parse(item.ruleJson);
    }
  }

  public confirmRule(rule) {
    this._store.dispatch(new ConfrimRule(rule.id));
  }
  public updateRule(rule) {
    this._store.dispatch(new ConfrimRuleUpdateRule(rule.id));
  }
  ngOnInit() {
    this.row = this._router.getCurrentNavigation()?.extras.state;
    this.ruletype = this._route.snapshot.data.ruletype;
    if (this.row !== undefined && this.row.rowData !== undefined) {
      this.rows = this._router.getCurrentNavigation()?.extras.state.rowData;
      this.destinationview = this._dataTransform(this.rows);
    } else {
      this.ruletype = this._route.snapshot.data.ruletype;
      if (this.ruletype === 'workflow') {
        this._router.navigate(['/routing/rule/workflow']);
      } else {
        this._router.navigate(['/routing/rule/destination']);
      }
    }

    this._store.pipe(select(selectViewSettingsList)).subscribe((response: ViewSettingGetObject) => {
      if (response) {
        this.currentLang = response.data.settingDto.language;
        this.translate.setDefaultLang(this.currentLang);
      }
    });
    this._store.pipe(select(confrimRuleResponse)).subscribe((res: any) => {
      if (res) {
        if (res.status === 'success') {
          this.onBack();
          // this._store.dispatch(new GetDestinationRules(this._route.snapshot.data.ruletype));
        }
      };
    });
    this._store.pipe(select(confrimUpdateRuleResponse)).subscribe((res: any) => {
      if (res) {
        if (res.status === 'success') {
          this.onBack();
          // this._store.dispatch(new GetDestinationRules(this._route.snapshot.data.ruletype));
        }
      }
    });

    this._store.pipe(select(selectPermissionsData)).subscribe((response: any) => {
      if (response) {
        if (this.ruletype == 'workflow') {
          this.permission = response.data.find(item => item.id === this.routingWorkflowRuleId);
        } else {
          this.permission = response.data.find(item => item.id === this.routingDestinationId);
        }
        this.permissionObject = this.permission;
      }
    });
  }
}
