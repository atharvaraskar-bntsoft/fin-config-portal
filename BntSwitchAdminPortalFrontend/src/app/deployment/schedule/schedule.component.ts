import { Store, select } from '@ngrx/store';
import { Component, OnInit, TemplateRef, ViewChild, OnDestroy } from '@angular/core';
import { IComponentDetails, IScheduled } from './schedulte.interface'
import { TranslateService } from '@ngx-translate/core';
import { IAppState } from '@app/store/state/app.state';
import { Router } from '@angular/router';
import {
  NewDeploymentListAction,
  ScheduledDeploymentListAction,
  FetchNonScheduleAction,
  FetchScheduledAction,
} from '@app/store/actions/deployment-schedule.action';
import { DeploymentScheduleService } from '@app/services/deployment-schedule.service';
import { Subscription } from 'rxjs/internal/Subscription';
import { selectViewSettingsList } from '@app/store/selectors/view-settings.selector';
import { ViewSettingGetObject } from '@app/models/view-settings.interface';
import { selectPermissionsData } from '@app/store/selectors/permission.selectors';

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.scss'],
})
export class ScheduleComponent implements OnInit, OnDestroy {
  rowData: any;
  newDeploymentData: IComponentDetails[] | IScheduled[];
  readonly headerHeight = 40;
  readonly rowHeight = 50;
  columns: any[];
  newDeploymentColumns: any[];
  loading: boolean;
  private subscriptions: Subscription[] = [];
  public currentLang: string;

  @ViewChild('action', { static: true }) actions: TemplateRef<any>;
  @ViewChild('scheduledDate', { static: true }) scheduledDate: TemplateRef<any>;
  @ViewChild('version', { static: true }) version: TemplateRef<any>;
  @ViewChild('type', { static: true }) type: TemplateRef<any>;
  @ViewChild('history', { static: true }) history: TemplateRef<any>;
  @ViewChild('modifiedBy', { static: true }) modifiedBy: TemplateRef<any>;
  @ViewChild('scheduledOn', { static: true }) scheduledOn: TemplateRef<any>;
  public permission: any;
  public permissionObject = {
    check: null,
    delete: null,
    id: '',
    read: null,
    update: null,
    write: null,
  };
  public deploymentScheduleId = 'link_deployment_schedule';
  constructor(
    private translate: TranslateService,
    private router: Router,
    public deploymentService: DeploymentScheduleService,
    private store: Store<IAppState>,
  ) {

  }

  ngOnInit() {
    this.loading = true;
    this.permissionData();
    this.tableData();
    this.columnData();

  }

  columnData() {
    const fetchColumnNames = [
      'NAME',
      'SCHEDULED_ON',
      'ACTION',
      'STATUS',
      'CURRENT_VERSION',
      'TYPE',
      'DEPLOYMENT_HISTORY',
      'LAST_MODIFIED_ON',
      'LAST_MODIFIED_BY',
    ];
    this.subscriptions.push(
      this.translate.get(fetchColumnNames).subscribe(res => {
        this.columns = [
          { prop: 'name', name: res.NAME },
          {
            prop: 'scheduledOn',
            cellTemplate: this.scheduledOn,
            name: res.SCHEDULED_ON,
          },
        ];
        this.newDeploymentColumns = [
          {
            prop: 'componentType',
            name: res.TYPE,
            cellTemplate: this.type,
            width: 10,
          },
          { prop: 'componentName', name: res.NAME, width: 60 },
          {
            prop: 'currentVersion',
            name: res.CURRENT_VERSION,
            cellTemplate: this.version,
            width: 60,
            sortable: false,
          },
          {
            prop: 'lastDeploymentHistory.message',
            name: res.DEPLOYMENT_HISTORY,
            cellTemplate: this.history,
            sortable: false,
            width: 100,
          },
          {
            prop: 'lastModifiedOn',
            name: res.LAST_MODIFIED_ON,
            cellTemplate: this.scheduledDate,
            width: 85,
            sortable: false,
          },
          {
            prop: 'lastModifiedBy',
            name: res.LAST_MODIFIED_BY,
            cellTemplate: this.modifiedBy,
            width: 60,
            sortable: false,
          },
          { prop: 'status', name: res.STATUS, width: 70, sortable: false },
        ];
      }),
    );

  }

  tableData() {
    
    this.store.dispatch(new FetchNonScheduleAction());

    this.store.dispatch(new FetchScheduledAction());

    // Subscribing the store here
    this.subscriptions.push(
      this.store.select('deploymentScheduleList').subscribe(res => {
        this.newDeploymentData = res.newlyDeployedData;
        this.newDeploymentData = this.newDeploymentData.map(item => {
          item.select = false;
          item.idVersionListToSchedule = item.idVersionListToSchedule.filter(
            item => item.version !== 0,
          );
          item.currentVersion = item.idVersionListToSchedule[0]
            ? item.idVersionListToSchedule[0].id
            : null;
          return item;
        });
        this.rowData = res.currentScheduledData;
        this.loading = false;
      }),
    );

  }

  permissionData() {
    this.store.pipe(select(selectViewSettingsList)).subscribe((response: ViewSettingGetObject) => {
      if (response) {
        this.currentLang = response.data.settingDto.language;
        this.translate.setDefaultLang(this.currentLang);
      }
    });
    this.store.pipe(select(selectPermissionsData)).subscribe((response: any) => {
      if (response) {
        this.permission = response.data.find(item => item.id === this.deploymentScheduleId);
        this.permissionObject = this.permission;
      }
    });
  }

  editOrView(item?: IScheduled) {
    const { clusterKey: name, id } = item['deploymentCluster']['switchClusterId'];
    item.switchCluster = item.switchCluster ? item.switchCluster : { name, id: id.toString() };
    this.router.navigate(['/deployment', 'edit-schedule-deployment', item.id], {
      state: item,
    });
  }

  createDeployment() {
    this.router.navigate(['/deployment', 'create-schedule-deployment']);
  }

  ngOnDestroy() {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }
}
