import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { IAppState } from '@app/store/state/app.state';
import {
  GetDestination,
  GetDestinationRules,
  UpdRule,
  ConfrimRule,
  ConfrimRuleUpdateRule,
  ClearDestinationRulesSuccess,
} from '@app/store/actions/destination-rules.action';
import {
  selectDestinations,
  selectDestinationRules,
  updRuleResponse,
  confrimRuleResponse,
  confrimUpdateRuleResponse,
} from '@app/store/selectors/destination-rules.selector';
import { Router, ActivatedRoute } from '@angular/router';
import { selectViewSettingsList } from '@app/store/selectors/view-settings.selector';
import { ClearState } from '@app/store/actions/router.actions';
import { TranslateService } from '@ngx-translate/core';
import { GetRuleCondition } from '@app/store/actions/rule-engine.actions';
import { ViewSettingGetObject } from '@app/models/view-settings.interface';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Utils } from 'src/utils';
import { selectPermissionsData } from '@app/store/selectors/permission.selectors';
import { DestinationRulesService } from '@app/services/destination-rules.service';
import { AlertService } from '@app/services/alert.service';

@Component({
  selector: 'app-destination-rules',
  styleUrls: ['./destination-rules.component.scss'],
  templateUrl: './destination-rules.component.html',
})
export class DestinationRulesComponent implements OnInit {
  public currentLang: string;
  public Labels: any;
  public destinationData: any;
  public rows: any = [];
  public columns: any;
  public loading: boolean;
  public editFlag = false;
  public viewFlag = true;
  public ruleFlag = false;
  public columnsInfo: any;
  public rowsInfo: any = [];
  public ruletype: string;
  public routPath: any;
  public prejson: any = {};
  private _filters: Array<any> = [];
  private _page = 1;
  public place: any = '';
  public currentPagination = '20';
  public request: Boolean = true;
  public flag: Boolean = false;
  public searchResetButton: Boolean = true;
  componetDestroyed = new Subject();
  @ViewChild('rowInfo', { static: true }) rowInfo: TemplateRef<any>;
  @ViewChild('action', { static: true }) actions: TemplateRef<any>;
  @ViewChild('version', { static: true }) version: TemplateRef<any>;
  @ViewChild('active', { static: true }) active: TemplateRef<any>;
  @ViewChild('destinations', { static: true }) destinations: TemplateRef<any>;
  @ViewChild('workflow_name', { static: true }) workflow_name: TemplateRef<any>;
  @ViewChild('myTable', { static: true }) table;
  readonly rowHeight = 48;
  readonly headerHeight = 40;
  public permission: any;
  public permissionObject = {
    check: null,
    delete: null,
    id: '',
    read: null,
    update: null,
    write: null,
  };
  public totalRecords: Number;
  public ruleList: any;
  public destination : any;
  public routingDestinationId = 'link_routing_rule';
  public routingWorkflowRuleId = 'link_workflow_rule';
  constructor(
    private _store: Store<IAppState>,
    private translate: TranslateService,
    private _route: ActivatedRoute,
    private _router: Router,
    private _destinationService: DestinationRulesService,
    private alertService: AlertService,
  ) {
    this._store.dispatch(new GetDestination());
    this._store
      .pipe(takeUntil(this.componetDestroyed), select(selectDestinations))
      .subscribe(Destination => {
        if (Destination) {
          this._store.dispatch(new ClearState());
          this.destinationData = Destination;
        }
      });
    this.ruletype = this._route.snapshot.data.ruletype;
    if (this.ruletype === 'workflow') {
      this._store.dispatch(new GetRuleCondition({ ruletype: 2 }));
      this.routPath = '/routing/rule-engine/workflow';
    } else {
      this._store.dispatch(new GetRuleCondition({ ruletype: 1 }));
      this.routPath = '/routing/rule-engine/route';
    }
    this._store.dispatch(new GetDestinationRules(this._route.snapshot.data.ruletype));
    this._store
      .pipe(takeUntil(this.componetDestroyed), select(selectDestinationRules))
      .subscribe(data => {
        if (data) {
          data['ruleList'] = data['ruleList'].map(item => {
            item.version = item.ruleConfiguration.length
              ? item.ruleConfiguration[0].version
              : null;
              if(this.ruletype == 'workflow') {
                item.destination = this.desnationRule(item.ruleConfiguration[0].id);
              }
              else {
                item.destination = this.desnationRule(item.ruleConfiguration[0].destination);
              }          
            return item;
          });
          this.request = true;
          if (this._page === 1) {
            this.rows = data['ruleList'];
          } else if (this.rows?.length !== 0) {
            this.rows = this.rows.concat(data['ruleList']);
          }
          if (data['total-record'] === this.rows?.length) {
            this.request = false;
          }
          this.totalRecords = data['total-record'];
          this.loading = false;
          this._store.dispatch(new ClearDestinationRulesSuccess());
          if (this.rows.length > 0) {
            this.flag = false;
          } else {
            this.flag = true;
          }
        }
      });
    this._store
      .pipe(takeUntil(this.componetDestroyed), select(selectViewSettingsList))
      .subscribe((response: ViewSettingGetObject) => {
        if (response) {
          this.currentPagination = response.data.settingDto.pagination;
          this.currentLang = response.data.settingDto.language;
          translate.setDefaultLang(this.currentLang);
          this.loadPage(this._page);
        }
      });

    this._store
      .pipe(takeUntil(this.componetDestroyed), select(updRuleResponse))
      .subscribe((res: any) => {
        if (res) {
          if (res.status === 'success') {
            this._store.dispatch(new GetDestinationRules(this._route.snapshot.data.ruletype));
            this._store.dispatch(new ClearDestinationRulesSuccess());
          }
        }
      });
    this._store.pipe(select(confrimRuleResponse)).subscribe((res: any) => {
      if (res) {
        if (res.status === 'success') {
          this._store.dispatch(new GetDestinationRules(this._route.snapshot.data.ruletype));
          this._store.dispatch(new ClearDestinationRulesSuccess());
        }
      }
    });
    this._store
      .pipe(takeUntil(this.componetDestroyed), select(confrimUpdateRuleResponse))
      .subscribe((res: any) => {
        if (res) {
          if (res.status === 'success') {
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

  editStatus(row) {
    const data = Object.assign({}, row);
    data.active = data.active == 0 ? 1 : 0;
    //this._store.dispatch(new UpdRule(data));
    this._destinationService.updRuleList(data).subscribe(res => {
      if (res) {
        this.alertService.responseMessage(res);
      }
    });
  }

  ngOnInit() {
    this.translate.get(['NAME', 'DESTINATIONS', 'WORKFLOW_NAME', 'VERSION', 'STATUS', 'ACTION']).subscribe(translation => {
      this.columns = [
        { prop: 'name', name: translation.NAME },
        {
          prop: 'destination',
          name: this.ruletype == 'workflow' ? translation.WORKFLOW_NAME : translation.DESTINATIONS,
          cellTemplate: this.destination,
        },
        {
          prop: 'version',
          name: translation.VERSION,
          cellTemplate: this.version,
          sortable: false,
        },
        {
          prop: 'active',
          name: translation.STATUS,
          cellTemplate: this.active,
          sortable: false,
        },
        {
          prop: 'action',
          name: translation.ACTION,
          cellTemplate: this.actions,
          sortable: false,
        },
      ];
    });
  }

  public onActivate(event: any): void {
    if (event.type === 'mouseenter') {
      this.rows = this.rows.map((item: any) => {
        if (item.id === event.row.id) {
          item.editFlag = true;
        } else {
          item.editFlag = false;
        }
        return item;
      });
    }
    if (event.type === 'mouseout') {
      this.editFlag = false;
    }
  }

  ngOnDestroy() {
    this.componetDestroyed.next();
    this.componetDestroyed.unsubscribe();
    this._store.dispatch(new ClearState());
  }

  // public onRowClick(row: any): void {
  //   this.ruletype = this._route.snapshot.data.ruletype;
  //   if (this.ruletype === 'workflow') {
  //     this._router.navigate(['/routing/rule/workflow/view'], {
  //       state: { rowData: row },
  //     });
  //   } else {
  //     this._router.navigate(['/routing/rule/destination/view'], {
  //       state: { rowData: row },
  //     });
  //   }
  // }

  public changeRow(event, row) {
    row.active = event.active;
    row.version = event.version;
    if(this.ruletype === 'workflow') {
      row.destination = event.id;
    }
    else {
      row.destination = this.desnationRule(event.destination);
    }

  }
  // this.viewFlag = false;
  // this.rowsInfo = row;
  // this.prejson = this.rowsInfo.ruleConfiguration[0].droolRule;
  public desnationRule(id): string {
    this.destination = '';
    if (this.ruletype === 'workflow') {
      return id;
    } else {
      let idList = id.split(',');
      if(idList.length > 1) {
        idList.forEach((res) => {
          let elementCheck = this.destinationData &&
          this.destinationData.findIndex(item => parseInt(item.id) === parseInt(res));
          if(elementCheck > -1) {
            this.destination += this.destinationData[elementCheck].name + ',';
          }
        })
        if(this.destination){
          return this.destination.slice(0, this.destination.length - 1);
          }
      }
      else {
      this.destination =
        this.destinationData && this.destinationData.find(item => item.id == parseInt(id, 0));
      return this.destination ? this.destination.name : id;
    }
  }
}
  public onBack(): void {
    this.viewFlag = true;
    this.ruleFlag = false;
  }

  public onShowRule(): void {
    this.ruleFlag = true;
  }

  public onHideRule(): void {
    this.ruleFlag = false;
  }

  public getRowData(row): void {
    let id = row.id;
    row.ruleConfiguration.forEach(item => {
      if(item.version === row.version) {
        id = item.id;
      }
    });
    this._router.navigate(['/routing/rule-engine/', this.ruletype,
  'edit', id]);   
  }

  public getFilterNameData(eventData: any) {
    if (this.place) {
      this.searchResetButton = false;
      if (!eventData) {
        delete this._filters['name'];
      } else {
        if (eventData.currentTarget.value && eventData.currentTarget.value !== '') {
          this._filters['name'] = eventData.currentTarget.value;
        } else {
          this.resetSearch();
        }
      }
      this._page = 1;
      this.loadPage(this._page);
    }
  }
  public resetSearch() {
    this.place = '';
    delete this._filters['name'];
    this._page = 1;
    this.searchResetButton = true;
    this.loadPage(this._page);
  }

  public confirmRule(rule) {
    this._store.dispatch(new ConfrimRule(rule));
  }
  public updateRule(rule) {
    this._store.dispatch(new ConfrimRuleUpdateRule(rule));
  }
  private loadPage(pagenumber: Number) {
    this.loading = true;
    const search = {
      filter: this._transFilters(),
      page: pagenumber,
      'page-size': this.currentPagination,
      ruleType: this._route.snapshot.data.ruletype,
    };
    this._store.dispatch(new GetDestinationRules(search));
    this.request = false;
  }
  private _transFilters() {
    return Object.keys(this._filters)
      .map(item => {
        return item + ':' + this._filters[item];
      })
      .join(',');
  }
}
