import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { selectViewSettingsList } from '@app/store/selectors/view-settings.selector';
import { select, Store } from '@ngrx/store';
import { ViewSettingGetObject } from '@app/models/view-settings.interface';
import { IAppState } from '@app/store/state/app.state';
import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-audit-log-details',
  templateUrl: './audit-log-details.component.html',
  styleUrls: ['./audit-log-details.component.scss'],
})
export class AuditLogDetailsComponent implements OnInit {
  public currentLang: string; // todo for language code
  public Labels: any; // todo for language code

  public row: any;
  public columns: Array<any>;
  public dimensions = {
    footerHeight: 40,
    headerHeight: 40,
    rowHeight: 50,
  };
  public comment: String;
  public readonly DECLINED = 'DECLINED';
  public readonly APPROVED = 'APPROVED';
  public rows: any;
  public auditdetail: Array<any>;
  public auditFilterData: Array<any>;
  public auditdetailsData: Array<any>;
  constructor(
    private _store: Store<IAppState>,
    private translate: TranslateService,
    private _router: Router,
  ) { }

  public loadData(){
    this.row = this._router.getCurrentNavigation()?.extras.state;
    if (this.row !== undefined && this.row.rowData !== undefined) {
      this.rows = this._router.getCurrentNavigation()?.extras.state.rowData;
      this.auditdetailsData = this._dataTransform(this.rows);

    } else {
      this._router.navigate(['/logs/audit-log']);
    }
    this._store.pipe(select(selectViewSettingsList)).subscribe((response: ViewSettingGetObject) => {
      if (response) {
        this.currentLang = response.data.settingDto.language;
        this.translate.setDefaultLang(this.currentLang);
      }
    });
  }


  private _dataTransform(rows: any): any {
    if(rows.difference) {
    this.auditdetail = JSON.parse(rows.difference).filter(item => item.oldValue !== item.newValue);
    if (rows) {
      if (this.auditdetail) {
        this.auditFilterData = this.auditdetail.filter(
          item => item.columnName !== 'updatedOn' && item.columnName !== 'createdOn',
        );
        return this.auditFilterData;
      } else {
        return this.auditdetail;
      }
    }
  }
  }

  ngOnInit() {
    this.loadData();
    this.translate.get(['FIELD_NAME', 'NEW_VALUE', 'OLD_VALUE']).subscribe(translation => {
      this.columns = [
        { prop: 'columnName', name: translation.FIELD_NAME },
        {
          prop: 'newValue',
          name: translation.NEW_VALUE,
        },
        {
          prop: 'oldValue',
          name: translation.OLD_VALUE,
        },
      ];
    });
  }
}
