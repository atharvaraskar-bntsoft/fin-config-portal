import { Component, OnInit, ElementRef, ViewChild, TemplateRef } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { IAppState } from '@app/store/state/app.state';
import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';
import { selectViewSettingsList } from '@app/store/selectors/view-settings.selector';
import { ViewSettingGetObject } from '@app/models/view-settings.interface';
import { selectGetSwitchClusters } from '@app/store/selectors/switch-clusters.selector';
import { GetSwitchClusters } from '@app/store/actions/switch-clusters.action';
import { selectPermissionsData } from '@app/store/selectors/permission.selectors';
declare var jQuery: any;

@Component({
  selector: 'app-switch-clusters',
  styleUrls: ['./switch-clusters.component.scss'],
  templateUrl: './switch-clusters.component.html',
})
export class SwitchClustersComponent implements OnInit {
  public request: Boolean = true;
  public switchClusterData: any;
  private _page = 1;
  public rows: any = [];
  public totalRecords: Number;
  public loading = true;
  public currentPagination = '20';
  public currentLang: string;
  private _filters: Array<any> = [];
  public columns: Array<any> = [];
  readonly headerHeight = 40;
  readonly rowHeight = 45;
  @ViewChild('action', { static: true }) actions: TemplateRef<any>;
  @ViewChild('active', { static: true }) active: TemplateRef<any>;
  @ViewChild('clusterKey', { static: true }) clusterKey: TemplateRef<any>;
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
  public deploymentClustersId = 'link_deployment_clusters';
  constructor(
    private _store: Store<IAppState>,
    private translate: TranslateService,
    private _router: Router,
    private el: ElementRef,
  ) {
    
  }

  ngOnInit() {

    this._store.pipe(select(selectGetSwitchClusters)).subscribe((data: any) => {
      if (data) {
        this.request = true;
        this.switchClusterData = data.data;
        if (this._page === 1) {
          this.rows = this.switchClusterData.switchclusterlist;
        } else if (this.rows.length !== 0) {
          this.rows = this.rows.concat(this.switchClusterData.switchclusterlist);
        }
        if (this.switchClusterData['total-record'] === this.rows.length) {
          this.request = false;
        }
        this.totalRecords = data.data['total-record'];
        this.loading = false;
      }
    });

    this._store.pipe(select(selectViewSettingsList)).subscribe((response: ViewSettingGetObject) => {
      if (response) {
        this.currentPagination = response.data.settingDto.pagination;
        this.currentLang = response.data.settingDto.language;
        this.translate.setDefaultLang(this.currentLang);
        this.loadPage(this._page);
      }
    });
    this._store.pipe(select(selectPermissionsData)).subscribe((response: any) => {
      if (response) {
        this.permission = response.data.find(item => item.id === this.deploymentClustersId);
        this.permissionObject = this.permission;
      }
    });
    this.translate
      .get(['DATA_CENTER', 'REGION', 'KEY', 'ACTIVE', 'ACTION'])
      .subscribe(translation => {
        this.columns = [
          { prop: 'dataCentre', name: translation.DATA_CENTER },
          { prop: 'region', name: translation.REGION },
          { 
            prop: 'clusterKey', 
            name: translation.KEY ,
            cellTemplate: this.clusterKey,
            sortable: false,
        },
          {
            prop: 'active',
            name: translation.ACTIVE,
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
  public getRowData(row): void {
    this._router.navigate(['/deployment/switch-clusters/edit', row.id]);
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
      new GetSwitchClusters({
        filter: this._transFilters(),
        page: pagenumber,
        'page-size': this.currentPagination,
      }),
    );
    this.request = false;
  }
}
