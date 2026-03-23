import { AlertService } from '@app/services/alert.service';
import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { IAppState } from '@app/store/state/app.state';
import { Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import { ViewSettingGetObject } from '@app/models/view-settings.interface';
import { GetDeploymentStatus } from '@app/store/actions/deployment-status.action';
import { basePath } from '@app/config/i18n/services/request.url.config';
import { DeploymentStatusService } from '@app/services/deployment-status.service';
declare var jQuery: any;

@Component({
  selector: 'app-deployment-status',
  styleUrls: ['./deployment-status.component.scss'],
  templateUrl: './deployment-status.component.html',
})
export class DeploymentStatusComponent implements OnInit {
  public request: Boolean = true;
  public statusData: any;
  private _page = 1;
  public rows: any = [];
  public totalRecords: Number;
  public loading = true;
  public currentPagination = '20';
  public currentLang: string;
  private _filters: Array<any> = [];
  public columns: Array<any> = [];
  public deploymentHistory1 = {
    deployedOn: 1594307290000,
    versionDeployed: 1.0,
  };
  readonly headerHeight = 40;
  readonly rowHeight = 75;
  @ViewChild('deploymentHistory', { static: true })
  deploymentHistory: TemplateRef<any>;
  @ViewChild('action', { static: true }) action: TemplateRef<any>;
  @ViewChild('myTable', { static: true }) table;
  public permission: any;
  public permissionObject = {
    check: null,
    delete: null,
    id: '',
    read: null,
    update: null,
    write: null,
  };
  public deploymentStatusId = 'link_deployment_status';
  constructor(
    public _store: Store<IAppState>,
    private translate: TranslateService,
    private alertService: AlertService,
    public deploymentStatusService: DeploymentStatusService,
  ) {
    deploymentStatusService.getselectGetDeploymentStatus().subscribe((data: any) => {
      if (data) {
        this.request = true;
        this.statusData = data.data;
        if (this._page === 1) {
          this.rows = this.statusData.resultList;
        } 
        else if (this.rows.length !== 0) {
          this.rows = this.rows.concat(this.statusData.resultList);
        }
        this.rows = this.rows.filter(item => item.currentVersion !== 0);
        if (this.statusData['total-record'] === this.rows.length) {
          this.request = false;
        }
        this.totalRecords = data.data['total-record'];
        this.loading = false;
      }
    });

   deploymentStatusService.getselectViewSettingsList().subscribe((response: ViewSettingGetObject) => {
      if (response) {
        this.currentPagination = response.data.settingDto.pagination;
        this.currentLang = response.data.settingDto.language;
        translate.setDefaultLang(this.currentLang);
        this.loadPage(this._page);
      }
    });
    deploymentStatusService.getselectPermissionsData().subscribe((response: any) => {
      if (response) {
        this.permission = response.data.find(item => item.id === this.deploymentStatusId);
        this.permissionObject = this.permission;
      }
    });
  }

  ngOnInit() {
    this.translate
      .get([
        'TYPE',
        'NAME',
        'CURRENT_VERSION',
        'DEPLOYMENT_HISTORY',
        'MODIFIED_BY',
        'STATUS',
        'ACTION',
      ])
      .subscribe(translation => {
        this.columns = [
          { prop: 'componentType', name: translation.TYPE, width: 5 },
          { prop: 'componentName', name: translation.NAME, width: 30 },
          {
            prop: 'currentVersion',
            name: translation.CURRENT_VERSION,
            width: 13,
          },
          {
            prop: 'lastDeploymentHistory',
            name: translation.DEPLOYMENT_HISTORY,
            cellTemplate: this.deploymentHistory,
            width: 140,
            sortable: false,
          },
          {
            prop: 'userName',
            name: translation.MODIFIED_BY,
            width: 24,
          },
          { prop: 'status', name: translation.STATUS, width: 20 },
          {
            prop: '',
            name: translation.ACTION,
            cellTemplate: this.action,
            width: 20,
            sortable: false,
          },
        ];
      });
  }

  public onScroll(offsetY: any) {
    jQuery('.datatable-body').scroll(() => {
      if (
        jQuery('.datatable-body').scrollTop() + jQuery('.datatable-body').height() >
        jQuery(document).height() - 100
      ) {
        if (this.request) {
          this._page = ++this._page;
          this.loadPage(this._page);
        }
      }
    });
  }

  private _transFilters(): String {
    return Object.keys(this._filters)
      .map(item => {
        return item + ':' + this._filters[item];
      })
      .join(',');
  }


  private loadPage(pagenumber: Number) {
    // set the loading flag, which serves two purposes:
    // 1) it prevents the same page from being loaded twice
    // 2) it enables display of the loading indicator
    this._store.dispatch(
      new GetDeploymentStatus({
        filter: this._transFilters(),
        page: pagenumber,
        'page-size': this.currentPagination,
      }),
    );
    this.request = false;
  }

  public updateStatus(status, row): void {
    let url = '';
    url = `${basePath.domain}/deployment/component/${row.id}`;
    this._updateAction(url);
  }

  private _updateAction(url: string): void {
    this.deploymentStatusService.updateAction(url).subscribe(res => {
      if (res && 'status' in res) {
        this.alertService.responseMessage(res);
        this.loadPage(this._page);
      }
    });
  }
}
