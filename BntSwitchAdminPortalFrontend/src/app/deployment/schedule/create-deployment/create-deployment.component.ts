import { DeploymentScheduleService } from './../../../services/deployment-schedule.service';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { TranslateService } from '@ngx-translate/core';
import {
  EditComponentAction,
  CreateComponentAction,
  FetchClusterListAction,
  FetchNonScheduleAction,
  ClearStateAction,
  FetchCorePropertiesListAction,
} from './../../../store/actions/deployment-schedule.action';
import { IClusterDetail, IComponentDetails, IPropertiesDetail } from './../schedulte.interface';
import { Component, OnInit, ViewChild, TemplateRef, OnDestroy } from '@angular/core';
import { UntypedFormGroup, UntypedFormControl, Validators } from '@angular/forms';
import { select, Store } from '@ngrx/store';
import { IAppState } from '@app/store/state/app.state';
import { Router } from '@angular/router';
import moment from 'moment';
import { Subscription } from 'rxjs/internal/Subscription';
import { Utils } from 'src/utils';
import { selectViewSettingsList } from '@app/store/selectors/view-settings.selector';
import { ViewSettingGetObject } from '@app/models/view-settings.interface';
import { differenceInCalendarDays } from 'date-fns';

@Component({
  selector: 'app-create-deployment',
  templateUrl: './create-deployment.component.html',
  styleUrls: ['./create-deployment.component.scss'],
})
export class CreateDeploymentComponent implements OnInit, OnDestroy {
  deploymentForm: UntypedFormGroup;
  clusterList: IClusterDetail[] = [];
  propertiesList: IPropertiesDetail[] = [];
  isForEdit: boolean;
  isNow = false;
  newDeploymentColumns: any[];
  newDeploymentData: any[];
  readonly headerHeight = 40;
  readonly rowHeight = 45;
  selectedComponents: any = [];
  selectedComponentWarning: boolean;
  public isSpinning = false;
  @ViewChild('select', { static: true }) select: TemplateRef<any>;
  @ViewChild('scheduledDate', { static: true }) scheduledDate: TemplateRef<any>;
  @ViewChild('version', { static: true }) version: TemplateRef<any>;
  @ViewChild('type', { static: true }) type: TemplateRef<any>;
  @ViewChild('modifiedBy', { static: true }) modifiedBy: TemplateRef<any>;
  @ViewChild('history', { static: true }) history: TemplateRef<any>;
  private subscriptions: Subscription[] = [];
  loading: boolean;
  public currentLang: string;
  today = new Date();

  disabledDate = (current: Date): boolean =>
  // Can not select days before today and today
  differenceInCalendarDays(current, this.today) < 0;

  constructor(
    private store: Store<IAppState>,
    private router: Router,
    public deploymentService: DeploymentScheduleService,
    private translate: TranslateService,
  ) {

   
  }

  ngOnInit() {

   
    this.store.pipe(select(selectViewSettingsList)).subscribe((response: ViewSettingGetObject) => {
      if (response) {
        this.currentLang = response.data.settingDto.language;
        this.translate.setDefaultLang(this.currentLang);
      }
    });

    this.isSpinning = false;
    this.deploymentForm = new UntypedFormGroup({
      id: new UntypedFormControl(),
      switchCluster: new UntypedFormControl(null, Validators.required),
      corePropertyDetailId: new UntypedFormControl(null),
      scheduledOn: new UntypedFormControl('', Validators.required),
      name: new UntypedFormControl({ value: '', disabled: true}),
    });

    this.tableData();
    this.columnList();
   
   
  }

  columnList(){
    const fetchColumnNames = [
      'NAME',
      'SCHEDULE_SELECT',
      'SCHEDULED_ON',
      'STATUS',
      'CURRENT_VERSION',
      'TYPE',
      'DEPLOYMENT_HISTORY',
      'LAST_MODIFIED_ON',
      'LAST_MODIFIED_BY',
    ];
    this.subscriptions.push(
      this.translate.get(fetchColumnNames).subscribe(res => {
        this.newDeploymentColumns = [
          {
            prop: 'select',
            name: res.SCHEDULE_SELECT,
            cellTemplate: this.select,
            sortable: false,
            width: 80,
          },
          {
            prop: 'componentType',
            name: res.TYPE,
            cellTemplate: this.type,
            sortable: false,
            width: 80,
          },
          { prop: 'componentName', name: res.NAME, sortable: false, width: 180 },
          {
            prop: 'currentVersion',
            name: res.CURRENT_VERSION,
            cellTemplate: this.version,
            sortable: false,
          },
          {
            prop: 'lastDeploymentHistory.message',
            name: res.DEPLOYMENT_HISTORY,
            sortable: false,
            cellTemplate: this.history,
            width: 200,
          },
          {
            prop: 'lastModifiedOn',
            name: res.LAST_MODIFIED_ON,
            cellTemplate: this.scheduledDate,
            sortable: false,
            width: 200,
          },
          {
            prop: 'lastModifiedBy',
            name: res.LAST_MODIFIED_BY,
            sortable: false,
            cellTemplate: this.modifiedBy,
          },
          { prop: 'status', name: res.STATUS, sortable: false },
        ];
      }),
    );
  }

  tableData(){
    this.store.dispatch(new FetchClusterListAction());
    this.store.dispatch(new FetchCorePropertiesListAction());
    this.store.dispatch(new FetchNonScheduleAction());

    this.subscriptions.push(
      this.store.select('deploymentScheduleList').subscribe((res: any) => {
        this.newDeploymentData = Utils.newData(res.newlyDeployedData);
        this.clusterList = res.clusterList;
        this.propertiesList = res.corePropertiesList;
        this.newDeploymentData = this.newDeploymentData.map(item => {
          item.select = false;
          item.idVersionListToSchedule = item.idVersionListToSchedule.filter(
            item => item.version !== 0,
          );
          item.currentVersion = item.idVersionListToSchedule[0]
            ? item.idVersionListToSchedule[0].id
            : null;
          item.componentId = item.currentVersion;
          return item;
        });
        if (history.state && history.state.name && this.clusterList && this.propertiesList) {
          history.state.scheduledOn = moment(history.state.scheduledOn).format('YYYY/MM/DD hh:mm');
          this.deploymentForm.patchValue(history.state);
          this.isForEdit = true;
        }
        if (res?.editResponse.hasOwnProperty('status') && res.editResponse.status === 'success') {
          this.router.navigate(['/deployment', 'deployment-schedule']);
        }
        this.loading = false;
      }),
    );
  
  }

  dateFormat() {
    const d = new Date();
    const month = ('0' + (d.getMonth() + 1)).slice(-2);
    const date = ('0' + d.getDate()).slice(-2);
    const minutes = ('0' + d.getMinutes()).slice(-2);
    const hours = ('0' + d.getHours()).slice(-2);
    return d.getFullYear() + '/' + month + '/' + date + ' ' + hours + ':' + minutes;
  }

  // set the Date Now
  setCurrentDate(event) {
    if (event) {
      this.deploymentForm.controls.scheduledOn.setValue(this.dateFormat());
    } else {
      this.deploymentForm.controls.scheduledOn.setValue('');
    }
  }


  public scheduledOnChange(e) {
    const nowdate = moment(Date.now()).format('YYYY/MM/DD HH:MM');
    let selectdate = Date.parse(e) / 1000;
    let nowdatetimes = Date.parse(nowdate) / 1000;
    if (nowdatetimes <= selectdate) {
      this.deploymentForm.controls.scheduledOn.setValue(e);
    } else {
      this.deploymentForm.controls.scheduledOn.setValue(null);
    }
  }
  selectAllComponent(event) {
    if (event) {
      this.newDeploymentData = this.newDeploymentData.map(item => {
        item.select = true;
        return item;
      });
    } else {
      this.newDeploymentData = this.newDeploymentData.map(item => {
        item.select = false;
        return item;
      });
    }
  }

  public changeRow(event, row) {
    
    row.componentId = event.id;
  }

  public onSubmit() {
    this.isSpinning = true;
    this.selectedComponents = this.newDeploymentData.filter(item => item.select);
    this.selectedComponents.forEach(ele => {
      const data = ele.idVersionListToSchedule.find(item => item.id === ele.componentId);
      ele.currentVersion = data.version;
    });
    if (this.selectedComponents.length) {
      const updatedValue = this.deploymentForm.value;
      if (!this.isForEdit) {
        delete updatedValue.id;
      }
      updatedValue.scheduledOn = moment(updatedValue.scheduledOn).valueOf();
      const body = {
        ...updatedValue,
        deploymentStatus: this.selectedComponents,
      };
      if (this.isForEdit) {
        this.store.dispatch(new EditComponentAction(body));
      } else {
        this.store.dispatch(new CreateComponentAction(body));
      }
    } else {
      this.selectedComponentWarning = true;
      this.isSpinning = false;
    }
  }

  public resetForm() {
    const updatedata = this.deploymentForm.controls.name.value;
    this.deploymentForm.reset(this.deploymentForm.value);
    this.deploymentForm.controls.scheduledOn.setValue('');
    this.isNow = false;
    this.selectedComponentWarning = false;
    this.deploymentForm.reset(this.clusterList);
    this.deploymentForm.reset(this.propertiesList);
    this.deploymentForm.controls.name.patchValue(updatedata);
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
    this.store.dispatch(new ClearStateAction());
  }
}
