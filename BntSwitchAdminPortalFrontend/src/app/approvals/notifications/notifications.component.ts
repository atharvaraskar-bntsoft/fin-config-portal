import { Component, OnInit, ViewChild, TemplateRef, ElementRef } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { IAppState } from '@app/store/state/app.state';
import { Router } from '@angular/router';
import {
  selectAlertsList,
  selectNotificationsList,
} from '@app/store/selectors/notifications.selector';
import { GetAlerts, GetNotifications } from '../../store/actions/notifications.actions';
import { selectViewSettingsList } from '@app/store/selectors/view-settings.selector';
import { TranslateService } from '@ngx-translate/core';
import { ViewSettingGetObject } from '@app/models/view-settings.interface';
import { NotificationGetCall } from '@app/models/notifications.interface';

declare var jQuery: any;

@Component({
  selector: 'app-notifications',
  styleUrls: ['./notifications.component.scss'],
  templateUrl: './notifications.component.html',
})
export class NotificationsComponent implements OnInit {
  public currentPagination = '20';
  public currentLang: string;
  public Labels: any = {};
  public loading = true;
  public rows: any = [];
  public rowAlert: any = [];
  public columns: Array<any> = [];
  public columnAlerts: Array<any> = [];

  private _page = 1;
  private _pageAlert = 1;
  public s: string;
  public totalRecords: Number;
  readonly headerHeight = 40;
  readonly rowHeight = 75;
  readonly pageLimit = 15;
  public request: Boolean = true;
  @ViewChild('details', { static: true }) details: TemplateRef<any>;
  @ViewChild('date', { static: true }) date: TemplateRef<any>;
  @ViewChild('Alertdate', { static: true }) Alertdate: TemplateRef<any>;
  @ViewChild('comment', { static: true }) comment: TemplateRef<any>;
  @ViewChild('operationType', { static: true }) operationType: TemplateRef<any>;
  @ViewChild('myTable', { static: true }) table;

  constructor(
    private _store: Store<IAppState>,
    private translate: TranslateService,
    private _router: Router,
    private el: ElementRef,
  ) {
    
  }

  ngOnInit() {
    this._store
      .pipe(select(selectNotificationsList))
      .subscribe((NotificationsList: NotificationGetCall) => {
        if (NotificationsList) {
          this.request = true;
          if (this._page === 1) {
            this.rows = NotificationsList.data.checkerList;
          } else if (this._page !== 1) {
            this.rows = this.rows.concat(NotificationsList.data.checkerList);
          }
          if (NotificationsList['total-record'] === this.rows.length) {
            this.request = false;
          }
          this.loading = false;
          this.totalRecords = NotificationsList.data['total-record'];
        }
      });
    // this._store
    //   .pipe(select(selectAlertsList))
    //   .subscribe((AlertDataList: any) => {
    //     if (AlertDataList) {
    //       this.request = true;
    //       if (this._page === 1) {
    //         this.rowAlert = AlertDataList.alertList;
    //       } else if (this.rowAlert.length !== 0) {
    //         this.rowAlert = this.rowAlert.concat(AlertDataList.alertList);
    //       }
    //       if (AlertDataList["total-filtered-record"] === this.rows.length) {
    //         this.request = false;
    //       }
    //       this.loading = false;
    //       this.totalRecords = AlertDataList["total-record"];
    //     }
    //   });
    this._store.pipe(select(selectViewSettingsList)).subscribe((response: ViewSettingGetObject) => {
      if (response) {
        this.currentPagination = response.data.settingDto.pagination;
        this.currentLang = response.data.settingDto.language;
        this.translate.setDefaultLang(this.currentLang);
        this.loadPage(this._page);
        this.loadAlertPage(this._page);
      }
    });
    this.translate
      .get([
        'ID',
        'ENTITY_ID',
        'ACQUIRER_ENTITY_TYPE',
        'CREATED_BY',
        'CREATEDON',
        'STATUS',
        'COMMENT',
        'ACTION',
        'PRIORTY',
        'MESSAGE',
        'ALERT_TYPE',
      ])
      .subscribe(translation => {
        this.columns = [
          { prop: 'id', name: translation.ID },
          { prop: 'entityId', name: translation.ENTITY_ID },
          { prop: 'operationType', name: 'Operation Type', cellTemplate: this.operationType },
          { prop: 'entityType', name: translation.ACQUIRER_ENTITY_TYPE },
          { prop: 'createdBy', name: translation.CREATED_BY },
          {
            prop: 'createdOn',
            name: translation.CREATEDON,
            cellTemplate: this.date,
          },
          { prop: 'status', name: translation.STATUS },
          {
            prop: 'comment',
            name: translation.COMMENT,
            cellTemplate: this.comment,
          },
          {
            prop: '',
            name: translation.ACTION,
            cellTemplate: this.details,
            sortable: false,
          },
        ];
        this.columnAlerts = [
          { prop: 'component', name: translation.ALERT_TYPE },
          { prop: 'message', name: translation.MESSAGE },
        ];
      });
  }

  public viewdetails(row) {
    this._router.navigate(['/approvals/notifications/details'], {
      state: { rowData: row },
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

  public onScrollAlert(offsetY: any) {
    jQuery('.datatable-body').scroll(() => {
      if (
        jQuery('.datatable-body').scrollTop() + jQuery('.datatable-body').height() >
        jQuery(document).height() - 100
      ) {
        if (this.request) {
          this._pageAlert = ++this._pageAlert;
          this.loadAlertPage(this._pageAlert);
        }
      }
    });
  }

  private loadPage(pagenumber: Number) {
    // set the loading flag, which serves two purposes:
    // 1) it prevents the same page from being loaded twice
    // 2) it enables display of the loading indicator
    this._store.dispatch(
      new GetNotifications({
        page: pagenumber,
        'page-size': this.currentPagination,
      }),
    );
    this.request = false;
  }

  private loadAlertPage(pagenumber: Number) {
    this._store.dispatch(
      new GetAlerts({
        page: pagenumber,
        'page-size': this.currentPagination,
      }),
    );
    this.request = false;
  }
}
