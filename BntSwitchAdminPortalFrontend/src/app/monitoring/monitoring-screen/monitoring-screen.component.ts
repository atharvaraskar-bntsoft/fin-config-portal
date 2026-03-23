import {
  Component,
  Input,
  OnInit,
  ViewEncapsulation,
  AfterContentInit,
  OnDestroy,
} from '@angular/core';
import * as Prism from 'prismjs';
import { Store, select } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import { IAppState } from '../../store/state/app.state';
import {
  ChangeLoggerLogLevel,
  GetLoggerLogLevel,
  GetMonitoring,
  KillMonitoringInstance,
  NetworkDumpStatus,
  ExecuteMonitoringOperation,
} from '../../store/actions/monitoring.action';
import {
  changeLoggerLevel,
  killMonitoringInstance,
  LoggerLevel,
  networkDumpStatus,
  selectMonitoringScreen,
  selectMonitoringOperation,
} from '../../store/selectors/monitoring.selector';
import { selectViewSettingsList } from '@app/store/selectors/view-settings.selector';
import { ViewSettingGetObject } from '@app/models/view-settings.interface';
import { GetMonitoringRootObject } from '@app/models/monitoring.interface';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { MonitoringService } from '@app/services/monitoring.service';
import { AlertService } from '@app/services/alert.service';

@Component({
  encapsulation: ViewEncapsulation.None,
  selector: 'app-monitoring-screen',
  styleUrls: ['./monitoring-screen.component.scss'],
  templateUrl: './monitoring-screen.component.html',
})
export class MonitoringScreenComponent implements OnInit, AfterContentInit, OnDestroy {
  @Input() public msg: Object;
  public data: any;
  public currentLang: string;
  public title: string;
  public dataValue: any;
  public changeloggerMessage: string;
  public loggerMessage: string;
  public killMessage: string;
  public width: number;
  public tableData: any;
  public groupPerformanceMap: any;
  public height: number;
  public chartData: any;
  public incomingChartData: any;
  public incoming: any = [];
  public outgoing: any = [];
  public allNetworkStatusWithConnectionIdsMap: any = [
    { id: 'Primary', code: 'SIGN_ON,SIGN_OFF,ECHO,KEY_EXCHANGE' },
    { id: 'Secondary', code: 'SIGN_ON,SIGN_OFF,ECHO,KEY_EXCHANGE' },
  ];
  public position: string;
  public pause = false;
  public play = true;
  public interval: number;
  public nodeStatusMap: any = {
    PAUSED: 0,
    RUNNING: 0,
    UNREACHABLE: 0,
  };
  loading = true;
  public flag = true;
  public errorMsg: string;
  public transcationalCount: any;
  public config = {
    leftTime: 60,
    demand: true,
  };
  public networkRequestModel = [];
  public connectionRequestModel = [];
  public propertyRequestModel = [];
  public provertyValueRequestModel = [];
  public connectionMRequestModel = [];
  public maintenanceModel = [];
  componetDestroyed = new Subject();

  secretName: string = null;
  processName: string = null;
  processList: Array<string> = [
    'refresh',
    'refreshAll',
    'schedule',
    'scheduleAll',
    'unschedule',
    'unscheduleAll',
    'status',
    'statusAll',
  ];
  isDurationChecked: boolean = false;
  durationValue: number = null;
  objData: any;
  selectedItem = [];
  restUrlToShow: any;
  headerName: any;

  constructor(
    public _monitoringService: MonitoringService,
    private _store: Store<IAppState>,
    private alertService: AlertService,
    private translate: TranslateService,
  ) {
    this._store
      .pipe(takeUntil(this.componetDestroyed), select(selectMonitoringScreen))
      .subscribe((item: GetMonitoringRootObject) => {
        this._monitoringService.isSpinning = true;
        if (item && item.status === 'success' && item.data) {
          const output = item.data.result.nodeStatusMap;
          console.log('output', output);

          this.nodeStatusMap.RUNNING = output.UP || output['RUNNING'] || 0;
          this.nodeStatusMap.PAUSED = output.PAUSE || 0;
          this.nodeStatusMap.UNREACHABLE = output.UNREACHABLE || 0;
          const result = item['data']['result'];
          this.groupPerformanceMap = result['groupPerformanceMap'];
          this.incoming = this.groupPerformanceMap.incoming
            ? this.groupPerformance(this.groupPerformanceMap['incoming'])
            : [];
          this.outgoing = this.groupPerformanceMap.outgoing
            ? this.groupPerformance(this.groupPerformanceMap['outgoing'])
            : [];

          this.tableData = this.tranfromData(result['healthDataList']);
          this.objData = this.tableData[0].data[0];
          this.manipulateRestUrl();

          this.chartData = this.transformChartData();
          this._monitoringService.isSpinning = false;
          if ('incoming' in this.groupPerformanceMap) {
            this.incomingChartData = this._getTranscationalCount(
              this.groupPerformanceMap['incoming'],
              this.incoming,
            );
          }
        } else if (item) {
          this.flag = false;
          this.errorMsg = item.message;
          this._monitoringService.isSpinning = false;
        }
      });
    this._store
      .pipe(takeUntil(this.componetDestroyed), select(selectViewSettingsList))
      .subscribe((response: ViewSettingGetObject) => {
        if (response) {
          this.currentLang = response.data.settingDto.language;
          translate.setDefaultLang(this.currentLang);
        }
      });
  }

  manipulateRestUrl() {
    if (this.objData) {
      this.objData.restUrlToShow = this.objData.restURL;
      if (this.objData.restURL.includes('http://')) {
        this.objData.restURL = this.objData.restURL.split('http://')[1];
      } else if (this.objData.restURL.includes('https://')) {
        this.objData.restURL = this.objData.restURL.split('https://')[1];
      }
    }
  }

  ngAfterContentInit() {
    Prism.highlightAll();
  }

  absoute(value) {
    return Math.abs(value);
  }

  public transformChartData() {
    const nodeCountData = {
      actionLink: '/',
      actionTitle: '',
      blockType: 'half',
      content: {
        coordinates: [
          {
            text: 'RUNNING',
            value: this.nodeStatusMap.RUNNING || 0,
          },
          {
            text: 'UNREACHABLE',
            value: this.nodeStatusMap.UNREACHABLE || 0,
          },
          {
            text: 'PAUSED',
            value: this.nodeStatusMap.PAUSED || 0,
          },
        ],
        type: 'donut',
      },
      title: null,
    };
    return nodeCountData;
  }

  private _getTranscationalCount(incoming: any, data: any) {
    const transcationalData = {
      actionLink: '/',
      actionTitle: '',
      blockType: 'half',
      content: {
        coordinates: [],
        type: 'donut',
      },
      title: null,
    };
    transcationalData.content.coordinates = data.map(item => {
      return {
        text: item.toUpperCase(),
        value: incoming[item].txnCount,
      };
    });
    return transcationalData;
  }

  public transformChartIncomingData() {
    const nodeCountData = {
      actionLink: '/',
      actionTitle: '',
      blockType: 'half',
      content: {
        coordinates: [
          {
            text: 'RUNNING',
            value: this.nodeStatusMap.RUNNING || 0,
          },
          {
            text: 'UNREACHABLE',
            value: this.nodeStatusMap.UNREACHABLE || 0,
          },
          {
            text: 'PAUSED',
            value: this.nodeStatusMap.PAUSED || 0,
          },
        ],
        type: 'donut',
      },
      title: null,
    };
    return nodeCountData;
  }

  public tranfromData(data: any): any {
    if (data && data.length) {
      data.forEach((row: any, i) => {
        if (row && row.data && row.data.length) {
          row.data = row.data.map((dataString: any, ind) => {
            let newdata = typeof dataString === 'string' ? JSON.parse(dataString) : dataString;
            newdata['dayFormate'] = this.getInHours(newdata);
            newdata['parentIndex'] = i;
            newdata['isSelected'] = false;
            newdata['currentIndex'] = ind;
            if (
              newdata.allNetworkStatusList != undefined &&
              newdata?.allNetworkStatusList?.length !== 0
            ) {
              newdata.networkStatus = newdata.allNetworkStatusList[0].id;
              newdata.codeList = newdata.allNetworkStatusList[0]?.code?.split(',');
              
            }
            return newdata;
          });
        }
      });
    }
    return data;
  }

  public getAlert(data: any) {
    return data.status === 'UNREACHABLE' ? '1 Alerts' : '0 Alert';
  }

  ngOnInit() {
    this._store.dispatch(new GetMonitoring());
  }

  public groupPerformance(data: any) {
    const output = Object.keys(data);
    return output;
  }

  public getName(row: any) {
    return row.name;
  }

  public getInHours(data: any) {
    if (data !== undefined && data.runningSince && data.status !== 'UNREACHABLE') {
      const today: any = new Date();
      const serverDate: any = new Date(data.runningSince);
      const diffMs = today - serverDate; // milliseconds between now & serverdate
      const diffDays = Math.floor(diffMs / 86400000); // days
      const diffHrs = Math.floor((diffMs % 86400000) / 3600000); // hours
      const diffMins = Math.round(((diffMs % 86400000) % 3600000) / 60000);
      const output = '(' + diffDays + ' d., ' + diffHrs + ' hrs., ' + diffMins + ' min.)';
      return output;
    }
  }

  // public kill(data: any) {
  //   this._store.dispatch(new KillMonitoringInstance(data.restURL));
  //   this._store
  //     .pipe(takeUntil(this.componetDestroyed), select(killMonitoringInstance))
  //     .subscribe((item: GetMonitoringRootObject) => {
  //       if (item['status'] === 'success') {
  //         data.safeToKill = 'false';
  //         this.killMessage = item.message;
  //         data.status = 'UNREACHABLE';
  //       }
  //     });
  // }

  public onChangeLogLevel(selectedValue: any, fullRowObject: any, dataRowObject: any) {
    dataRowObject.loggerName = selectedValue;
    this._store.dispatch(new GetLoggerLogLevel(dataRowObject));
    this._store
      .pipe(takeUntil(this.componetDestroyed), select(LoggerLevel))
      .subscribe((item: GetMonitoringRootObject) => {
        if (item['status'] === 'success') {
          this.loggerMessage = item.message;
          dataRowObject.currentLogLevel = item['data'];
          dataRowObject.loggerLevel = item['data'];
        }
      });
  }

  public onChangeNewLogLevel(selectedValue: any, fullRowObject: any, dataRowObject: any) {
    dataRowObject.loggerLevel = selectedValue;
  }

  public onChangeNetworkStatus(allNetworkStatusList: any, dataRowObject: any, selectedValue: any) {
    dataRowObject.codeList = [];
    if (selectedValue) {
      this._monitoringService
        .networkStatusForConnectionName(dataRowObject.restURL, selectedValue)
        .subscribe((res: any) => {
          if (res && res.status == 'success') {
            dataRowObject.codeList = allNetworkStatusList
              .find(it => it.id == selectedValue)
              .name.split(',');
          }
          this.alertService.responseMessage({
            status: res?.status,
            message: res?.message,
          });
        });
    } else {
      dataRowObject.networkStaus = allNetworkStatusList[0].id;
      dataRowObject.codeList = allNetworkStatusList
        .find(it => it.id == allNetworkStatusList[0].id)
        .code.split(',');
    }
  }

  public refreshNetworkStatus(allNetworkStatusList: any, dataRowObject: any, selectedValue: any) {
    this._monitoringService
      .networkStatusForConnectionName(dataRowObject.restURL, selectedValue)
      .subscribe((res: any) => { 
        
        if (res && res.status == 'success') {
          let code = res.data;
          dataRowObject.codeList = code.split();
          dataRowObject.currentStatus = code.split();
        }
        
        this.alertService.responseMessage({
          status: res?.status,
          message: res?.message,
        });
      });
  }

  public changeLogLevel(data: any) {
    if (data.loggerName && data.loggerLevel) {
      this._store.dispatch(new ChangeLoggerLogLevel(data));
      this._store
        .pipe(takeUntil(this.componetDestroyed), select(changeLoggerLevel))
        .subscribe((item: GetMonitoringRootObject) => {
          if (item['status'] === 'success') {
            this.changeloggerMessage = item.message;
            data.currentLogLevel = data.loggerLevel;
          }
        });
    }
  }
  public executeOperation(value: any, methodName, connectionName) {
    const data = {
      beanName: value.beanName,
      jmxURL: value.jmxURL,
      methodName: methodName,
      connectionName: connectionName,
    };
    if (data) {
      this._store.dispatch(new ExecuteMonitoringOperation(data));
      this._store
        .pipe(takeUntil(this.componetDestroyed), select(selectMonitoringOperation))
        .subscribe((item: GetMonitoringRootObject) => {
          if (item && item.status === 'success' && item.data) {
            value.currentStatus = methodName;
          }
        });
    }
  }

  public executePropertyOperation(value: any, propertyKey, propertyValue) {
    const data = {
      beanName: value.beanName,
      jmxURL: value.jmxURL,
      propertyKey: propertyKey,
      propertyValue: propertyValue,
    };
    if (data) {
      this._monitoringService.ExecutePropertyOperation(data).subscribe(item => {
        if (item && item.status === 'success' && item.data) {
          value.currentStatus = propertyKey;
        }
        this.alertService.responseMessage(item);
      });
    }
  }

  public toggleMaintenance(value: any, rowIndex, dataIndex, dataValue) {
    const data = {
      beanName: dataValue.beanName,
      jmxURL: dataValue.jmxURL,
      connectionName: this.connectionMRequestModel[rowIndex + ',' + dataIndex],
    };
    if (data) {
      this._monitoringService.toggleMaintenance(data).subscribe(item => {
        this.alertService.responseMessage(item);
      });
    }
  }

  setConnectionMData(event, rowIndex, dataIndex, data) {
    this.connectionMRequestModel[rowIndex + ',' + dataIndex] = event;
    const output = this.connectionMRequestModel[rowIndex + ',' + dataIndex];
    const manOut = data.connectionDetailsMap[output];
    this.maintenanceModel[rowIndex + ',' + dataIndex] = manOut?.ON_MAINTENANCE || false;
  }

  public setData(event, rowindex, dataindex, data) {
    this.networkRequestModel[rowindex + ',' + dataindex] = event;
    data.currentStatus = event;
  }

  public setConnectionData(event, rowindex, dataindex) {
    this.connectionRequestModel[rowindex + ',' + dataindex] = event;
  }

  public setPropertyData(event, rowindex, dataindex, propertiesMap) {
    const output = propertiesMap.find(item => item.id == event);
    this.propertyRequestModel[rowindex + ',' + dataindex] = output.id;
    this.provertyValueRequestModel[rowindex + ',' + dataindex] = output.name;
  }

  public setPropertyValueData(event, rowindex, dataindex) {
    this.provertyValueRequestModel[rowindex + ',' + dataindex] = event;
  }

  public isNetworkDumpEnable(data: any) {
    return data?.groupOptions && data?.groupOptions?.NetworkDump ? true : false;
  }

  public enableDump(data: any, flag: boolean) {
    this.dataValue = {
      dataObject: data,
      flag: flag,
    };
    this._store.dispatch(new NetworkDumpStatus(this.dataValue));
    this._store
      .pipe(takeUntil(this.componetDestroyed), select(networkDumpStatus))
      .subscribe((item: GetMonitoringRootObject) => {
        if (item['status'] === 'success') {
          data.isEnableNetworkDump = item.data;
        }
      });
  }

  public refreshData() {
    this.config = JSON.parse(JSON.stringify(this.config));
    this.pause = false;
    this.play = true;
    this._store.dispatch(new GetMonitoring());
  }

  public onFinished(evt) {
    if (evt.action === 'finished') {
      this.refreshData();
    }
  }

  public pauseToogle() {
    this.pause = false;
    this.play = true;
  }

  public playToogle() {
    this.play = false;
    this.pause = true;
  }

  ngOnDestroy() {
    this.componetDestroyed.next();
    this.componetDestroyed.unsubscribe();
  }

  public numberOnly(event: any): boolean {
    const charCode = event.which ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  }

  onChangeSecretName(event: any, row: any, data: any) {}

  onChangeProcessName(event: any) {
    if (event) {
      this.isDurationChecked = false;
      this.durationValue = null;
    }

    if (
      this.processName === 'refreshAll' ||
      this.processName === 'scheduleAll' ||
      this.processName === 'unscheduleAll' ||
      this.processName === 'statusAll'
    ) {
      this.secretName = null;
    }
  }

  isDurationChange() {
    this.durationValue = null;
  }

  executeSecretOperation(data: any) {
    if (this.processName) {
      if (
        !this.secretName &&
        (this.processName === 'refresh' ||
          this.processName === 'schedule' ||
          this.processName === 'unschedule' ||
          this.processName === 'status')
      ) {
        this.alertService.onWarning('Secret is required!');
        return;
      }

      let path: string = `http://${data.restUrl}/`;
      if (this.processName === 'refresh') {
        path += `secretManager/refreshSecretValue/${this.secretName}`;
      } else if (this.processName === 'refreshAll') {
        path += `secretManager/refreshSecretValue`;
      } else if (this.processName === 'schedule') {
        path += `secretManager/schedule/refreshSecretValue/${this.secretName}`;
        if (this.isDurationChecked && this.durationValue) {
          path += `/${this.durationValue}`;
        }
      } else if (this.processName === 'scheduleAll') {
        path += `secretManager/schedule/refreshSecretValue`;
      } else if (this.processName === 'unschedule') {
        path += `secretManager/unschedule/refreshSecretValue/${this.secretName}`;
      } else if (this.processName === 'unscheduleAll') {
        path += `secretManager/unschedule/refreshSecretValue`;
      } else if (this.processName === 'status') {
        path += `/secretManager/schedule/getSecretStatus/${this.secretName}`;
      } else if (this.processName === 'statusAll') {
        path += `/secretManager/schedule/getSecretStatus`;
      }

      const reqData = {
        secretName: this.secretName ? this.secretName : null,
        processName: this.processName,
        endPoint: path,
      };
      this._monitoringService.secretManagerOperation(reqData).subscribe(response => {
        if (response) {
          this.alertService.onSuccess(response.status);
        }
      });
    } else {
      this.alertService.onWarning('Process is required!');
    }
  }

  responseData(event) {
    this.headerName = event.header
    this._monitoringService.isSpinning = false;
    event.result.healthDataList.forEach(ele => {
      ele.data.forEach(x => {
        if (x && JSON.parse(x).isDefault) {
          this.objData = null;
          this.objData = JSON.parse(x);
          this.objData.networkStatus = this.objData.allNetworkStatusList.length
            ? this.objData.allNetworkStatusList[0].id
            : null;
          this.objData.codeList = this.objData.allNetworkStatusList
            .find(it => it.id == this.objData.allNetworkStatusList[0].id)
            ?.name.split(',');
          this.objData.currentStatus = this.objData.allNetworkStatusList
            .find(it => it.id == this.objData.allNetworkStatusList[0].id)
            ?.name.split(',');
          this.manipulateRestUrl();
        }
      });
    });
  }
}
