import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { Router } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { IAppState } from '../../../store/state/app.state';
import { selectApprovalsSuccess } from '../../../store/selectors/approvals.selector';
import { ClearState, GetApprovals, PostApprovals } from '../../../store/actions/approvals.actions';
import { selectViewSettingsList } from '@app/store/selectors/view-settings.selector';
import { TranslateService } from '@ngx-translate/core';
import { GetApprovalCount } from '@app/store/actions/approvals.actions';
import { ViewSettingGetObject } from '@app/models/view-settings.interface';

@Component({
  selector: 'app-approvals-details',
  styleUrls: ['./approvals-details.component.scss'],
  templateUrl: './approvals-details.component.html',
})
export class ApprovalsDetailsComponent implements OnInit {
  public currentLang: string; // todo for language code
  public Labels: any; // todo for language code

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
  public jsonView: any = {};
  public approvaldetails: Array<any> = [];
  public approvaldetailsData: Array<any>;
  public visibleAnimate = false;
  public visible = false;
  @ViewChild('newValue', { static: true }) newValue: TemplateRef<any>;
  @ViewChild('oldValue', { static: true }) oldValue: TemplateRef<any>;
  @ViewChild('operationType', { static: true }) operationType: TemplateRef<any>;
  constructor(
    private _store: Store<IAppState>,
    private translate: TranslateService,
    private _router: Router,
  ) {
    
  }

  private _dataTransform(rows: any): any {
    if (rows) {
      if (rows.data) {
        this.approvaldetails = JSON.parse(rows.data).filter(ele => ele.oldValue !== ele.newValue);
        return this.approvaldetails
          .map((item: any) => {
            item.id = rows.id;
            item.entityType = rows.entityType;
            item.operationType = rows.entityId ? 'UPDATE' : 'CREATE';
            item.entityId = rows.entityId;
            item.newValue = item.newValue;
            item.oldValue = item.oldValue;
            // // tslint:disable-next-line: triple-equals
            // if (
            //   item.newValue === '1'
            // ) {
            //   item.newValue = 'Enabled';
            //   // tslint:disable-next-line: triple-equals
            // } else if (
            //   item.newValue === '0'
            // ) {
            //   item.newValue = 'Disabled';
            // }
            // // tslint:disable-next-line: triple-equals
            // if (
            //   item.oldValue === '1'
            // ) {
            //   item.oldValue = 'Enabled';
            //   // tslint:disable-next-line: triple-equals
            // } else if (
            //   item.oldValue === '0'
            // ) {
            //   item.oldValue = 'Disabled';
            // }
            return item;
          })
          .filter(it => it.columnName !== 'code' && it.newValue !== '');
      }
    }
  };

  ngOnInit() {
    this.row = this._router.getCurrentNavigation()?.extras.state;
    if (this.row !== undefined && this.row.rowData !== undefined) {
      this.rows = this._router.getCurrentNavigation()?.extras.state.rowData;
      
      this.jsonView = JSON.parse(this.rows.json);
      this.approvaldetailsData = this._dataTransform(this.rows);
    } else {
      this._router.navigate(['/approvals/approvals']);
    }
    this._store.pipe(select(selectViewSettingsList)).subscribe((response: ViewSettingGetObject) => {
      if (response) {
        this.currentLang = response.data.settingDto.language;
        this.translate.setDefaultLang(this.currentLang);
      }
    });
    this._store.pipe(select(selectApprovalsSuccess)).subscribe((response: any) => {
      
      if (response && response.status === 'failure') {
        this.errorMessage = response.message;
      } else if (response && response.status === 'success') {
        this._store.dispatch(new ClearState());
        this._store.dispatch(new GetApprovalCount());
        this._router.navigate(['/approvals/approvals']);
        this.successMessage = response.message;
      }
    });
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

  public onApprove(): void {
    const data = this.checker(this.APPROVED);
    this.PendingApprovalDetails(data);
  }

  public onReject(): void {
    const data = this.checker(this.DECLINED);
    this.PendingApprovalDetails(data);
  }

  public PendingApprovalDetails(data): void {
    this._store.dispatch(new PostApprovals(data));
  }
  private checker(status): any {
    return {
      comment: this.comment,
      id: this.rows.id,
      entityType: this.rows.entityType,
      status: status,
    };
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
