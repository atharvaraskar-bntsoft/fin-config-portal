import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { NotificationsConfig } from '@app/config/i18n/notifications.config';
import { Store, select } from '@ngrx/store';
import { IAppState } from '@app/store/state/app.state';
import { Router } from '@angular/router';
import { selectViewSettingsList } from '@app/store/selectors/view-settings.selector';
import { TranslateService } from '@ngx-translate/core';
import { ViewSettingGetObject } from '@app/models/view-settings.interface';

@Component({
  selector: 'app-notifications-details',
  styleUrls: ['./notifications-details.component.scss'],
  templateUrl: './notifications-details.component.html',
})
export class NotificationsDetailsComponent implements OnInit {
  public currentLang: string;
  public Labels: any;
  public row: any;
  public columns: Array<any>;
  public errorMessage: String;
  public successMessage: String;
  public dimensions = {
    footerHeight: 40,
    headerHeight: 40,
    rowHeight: 50,
  };
  public comment: String;
  public readonly DECLINED = 'DECLINED';
  public readonly APPROVED = 'APPROVED';
  public rows: any;
  public notificationsdetails: Array<any> = [];
  public notificationsdetailsData: Array<any>;
  public visibleAnimate = false;
  public visible = false;
  public jsonView: any = {};
  @ViewChild('Alertdate', { static: true }) Alertdate: TemplateRef<any>;
  @ViewChild('newValue', { static: true }) newValue: TemplateRef<any>;
  @ViewChild('oldValue', { static: true }) oldValue: TemplateRef<any>;
  @ViewChild('operationType', { static: true }) operationType: TemplateRef<any>;
  constructor(
    private _store: Store<IAppState>,
    private translate: TranslateService,
    private _router: Router,
  ) {
    this.row = this._router.getCurrentNavigation()?.extras.state;
    if (this.row !== undefined && this.row.rowData !== undefined) {
      this.rows = this._router.getCurrentNavigation()?.extras.state.rowData;
      this.jsonView = JSON.parse(this.rows.json);
      this.notificationsdetailsData = this._dataTransform(this.rows);
    } else {
      this._router.navigate(['/approvals/notifications']);
    }
    this._store.pipe(select(selectViewSettingsList)).subscribe((response: ViewSettingGetObject) => {
      if (response) {
        this.currentLang = response.data.settingDto.language;
        this.translate.setDefaultLang(this.currentLang);
      }
    });
  }

  private _dataTransform(rows: any): any {
    if (rows) {
      if (rows.data) {
        this.notificationsdetails = JSON.parse(rows.data).filter(
          ele => ele.oldValue !== ele.newValue,
        );
        return this.notificationsdetails
          .map((item: any) => {
            item.id = rows?.id;
            item.entityType = rows?.entityType;
            item.operationType = rows?.entityId ? 'UPDATE' : 'CREATE';
            item.entityId = rows?.entityId;
            item.newValue = item.newValue;
            item.oldValue = item.oldValue;
            // tslint:disable-next-line: triple-equals
            if (item.newValue === '1') {
              item.newValue = 'Enabled';
              // tslint:disable-next-line: triple-equals
            } else if (item.newValue === '0') {
              item.newValue = 'Disabled';
            }
            // tslint:disable-next-line: triple-equals
            if (item.oldValue === '1') {
              item.oldValue = 'Enabled';
              // tslint:disable-next-line: triple-equals
            } else if (item.oldValue === '0') {
              item.oldValue = 'Disabled';
            }
            return item;
          })
          .filter(it => it.columnName !== 'code' && it.newValue !== '');
      }
    }
  }

  ngOnInit() {
    
    this.translate
      .get(['ENTITY_ID', 'ACQUIRER_ENTITY_TYPE', 'COLUMN_NAME', 'NEW_VALUE', 'OLD_VALUE'])
      .subscribe(translation => {
        this.columns = [
          { prop: 'entityId', name: translation.ENTITY_ID },
          { prop: 'operationType', name: 'Operation Type', cellTemplate: this.operationType },
          { prop: 'entityType', name: translation.ACQUIRER_ENTITY_TYPE },
          { prop: 'columnName', name: translation.COLUMN_NAME },
          {
            prop: 'newValue',
            name: translation.NEW_VALUE,
            cellTemplate: this.newValue,
          },
          {
            prop: 'oldValue',
            name: translation.OLD_VALUE,
            cellTemplate: this.oldValue,
          },
        ];
      });
  }
  public open(): void {
    document.body.style.overflow = 'hidden';
    this.visible = true;
    setTimeout(() => (this.visibleAnimate = true), 200);
  }

  public close(): void {
    document.body.style.overflow = 'auto';
    this.visibleAnimate = false;
    setTimeout(() => (this.visible = false), 100);
  }
}
