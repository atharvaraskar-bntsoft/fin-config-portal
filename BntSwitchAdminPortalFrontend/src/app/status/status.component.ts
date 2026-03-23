import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { IAppState } from '../store/state/app.state';
import { selectStatusList } from '../store/selectors/status.selector';
import { GetStatus } from '../store/actions/status.action';
import { StatusConfig } from '../config/i18n/status.config';
import { TranslateService } from '@ngx-translate/core';
import { selectViewSettingsList } from '@app/store/selectors/view-settings.selector';
import { JsonApiService } from '@app/services/json-api.service';
import { ViewSettingGetObject } from '@app/models/view-settings.interface';
import { StatusGetObject } from '@app/models/status.interface';

@Component({
  selector: 'app-status',
  styleUrls: ['./status.component.scss'],
  templateUrl: './status.component.html',
})
export class StatusComponent implements OnInit {
  public Labels: any = {};
  public currentLang: string;
  public server_port: any;
  public currentItem: any;
  public table_titles = [];
  public jvm_titles = [];
  public check: number;
  public health: string;
  public version: any;
  public monitoringCoreDetail: any;
  public monitoringHazlecastDetail: any;
  public swagger: string;
  public errormessage: string;
  public visibleAnimate: any;
  public visible: any;
  public jsonObj: any;

  constructor(
    private _store: Store<IAppState>,
    private translate: TranslateService,
    private _router: Router,
    private _JsonApiService: JsonApiService,
  ) {}

  ngOnInit() {
    this._store.pipe(select(selectStatusList)).subscribe((response: StatusGetObject) => {
      const dataJson = response;
      if (dataJson) {
        if (dataJson['status'] === 'failure') {
          this.errormessage = dataJson['message'];
        } else {
          this.currentItem = dataJson['data'];
          this.jvm_titles = this.currentItem['jvmDetailList'];
          this.table_titles = this.currentItem['tabbleList'];
          this.server_port = this.currentItem['serverPortList'];
          this.version = this.currentItem['uiCodeDate'];
          this.monitoringCoreDetail = this.currentItem['monitoringCoreDetail'];
          this.monitoringHazlecastDetail = this.currentItem['monitoringHazlecastDetail'];
          [this.health, this.swagger] = this.currentItem['listInfoUrl'];
        }
      } else {
        console.log("Do nothing...");        
      }
    });
    this._store.pipe(select(selectViewSettingsList)).subscribe((response: ViewSettingGetObject) => {
      if (response) {
        this.currentLang = response.data.settingDto.language;
        this.translate.setDefaultLang(this.currentLang);
      }
    });
    this._store.dispatch(new GetStatus());
  }

  public openLink(url): void {
    window.open(url);
  }

  public openHealth(): void {
    this._JsonApiService.loadJosn().subscribe(json => {
      this.jsonObj = json.data;
      this.open();
    });
  }

  public txnKey() {
    this._router.navigate(['logs/txnKeyLable']);
  }

  public open(): void {
    document.body.style.overflow = 'hidden';
    this.visible = true;
    setTimeout(() => (this.visible = true), 200);
  }

  public close(): void {
    document.body.style.overflow = 'auto';
    this.visibleAnimate = false;
    setTimeout(() => (this.visible = false), 100);
  }
}
