import { MonitoringService } from './../../services/monitoring.service';
import { Component, Input, OnInit, OnDestroy, Output, EventEmitter } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import { IAppState } from '../../store/state/app.state';
import { selectViewSettingsList } from '@app/store/selectors/view-settings.selector';
import { ViewSettingGetObject } from '@app/models/view-settings.interface';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { AlertService } from '@app/services/alert.service';

@Component({
  selector: 'app-monitoring-item',
  styleUrls: ['./monitoring-item.component.scss'],
  templateUrl: './monitoring-item.component.html',
})
export class MonitoringItemComponent implements OnInit, OnDestroy {
  @Input() public data: any;
  @Input() public isSpinning: boolean = true;
  @Input() public tableData;
  @Output() public responseData = new EventEmitter();
  public currentLang: string;
  componetDestroyed = new Subject();
  selectedText: any;
  textColor = '';
  result: any;
  prevText: any;

  constructor(
    private _store: Store<IAppState>,
    private translate: TranslateService,
    private _monitoringService: MonitoringService,
    public alertService: AlertService,
  ) {
    this._store
      .pipe(takeUntil(this.componetDestroyed), select(selectViewSettingsList))
      .subscribe((response: ViewSettingGetObject) => {
        if (response) {
          this.currentLang = response?.data.settingDto.language;
          translate.setDefaultLang(this.currentLang);
        }
      });
  }

  ngOnInit() {}

  public getName(row: any) {
    return row.name;
  }

  public getId(row: any) {
    if (row.id && row.id.includes(':')) {
      return null;
    } else {
      return '-v' + row.id;
    }
  }

  public showDetail(row: any, index) {
    if (this._monitoringService.prevText) {
      this.tableData[this._monitoringService.prevText.parentIndex].data[
        this._monitoringService.prevText.currentIndex
      ].isSelected = false;
      this._monitoringService.prevText.isSelected = false;
    }
    this.selectedText = row;
    this._monitoringService.isSpinning = true;
    this.selectedText.isSelected = true;
    this._monitoringService.prevText = this.selectedText;
    const payload = {
      restURL: row.restURL,
      componentType: this.data.metaInfo.header,
      name: row.name,
      statusChanged: row.statusChanged,
      id: row.id,
      status: row.status,
      jmxLocation: row.jmxURL,
    };
    this._monitoringService.showData(payload).subscribe(res => {
      if (res.status === 'success') {
        console.log('success', res);
        res.data.header = this.data.metaInfo.header
        this.responseData.emit(res.data);
      }
    });
  }

  // public start(data: any, headerName) {
  //   this._monitoringService.startInstance(data.restURL, headerName).subscribe(res => {
  //     if (res.status === 'success') {
  //       data.status = 'UP';
  //     }
  //     this.alertService.responseMessage(res);
  //   });
  // }

  // public stop(data: any, headerName) {
  //   if(data && data.restURL){
  //     if(data.restURL.includes('http://')){
  //       data.restURL = data.restURL.split('http://')[1];
  //     }else if(data.restURL.includes('https://')){
  //       data.restURL = data.restURL.split('https://')[1];
  //     }
  //     }
  //   this._monitoringService.stopInstance(data.restURL, headerName).subscribe(res => {
  //     if (res && res.status === 'success') {
  //       data.status = 'PAUSED';
  //     }
  //     this.alertService.responseMessage(res);
  //   });
  // }

  ngOnDestroy() {
    this.componetDestroyed.next();
    this.componetDestroyed.unsubscribe();
  }
}
