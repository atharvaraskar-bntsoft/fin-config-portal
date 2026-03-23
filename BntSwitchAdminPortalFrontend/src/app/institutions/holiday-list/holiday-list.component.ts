import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { HolidayService } from '@app/services/holiday.service';
import { IAppState } from '@app/store/state/app.state';
import { select, Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import { Subject, Subscription } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { selectPermissionsData } from '@app/store/selectors/permission.selectors';
import { selectViewSettingsList } from '@app/store/selectors/view-settings.selector';
import { ViewSettingGetObject } from '@app/models/view-settings.interface';
declare var jQuery: any;

@Component({
  selector: 'app-holiday-list',
  templateUrl: './holiday-list.component.html',
  styleUrls: ['./holiday-list.component.css']
})
export class HolidayListComponent implements OnInit {
  
  readonly headerHeight = 40;
  public columns: Array<any> = [];
  public currentPagination = '20';
  private _filters: Array<any> = [];
  componetDestroyed = new Subject();
  private subscription = [];
  public pageIndex = 1;
  public dataArray: any = [];
  public currentLang: string;
  public holidayId = 'link_device';
  readonly rowHeight = 45;

  @ViewChild('country', { static: true }) country: TemplateRef<any>;
  @ViewChild('cutoftime', { static: true }) cutoftime: TemplateRef<any>;
  @ViewChild('year', { static: true }) year: TemplateRef<any>;
  @ViewChild('weekly', { static: true }) weekly: TemplateRef<any>;
  @ViewChild('dateformat', { static: true }) dateformat: TemplateRef<any>;
  @ViewChild('days', { static: true }) days: TemplateRef<any>;
  @ViewChild('myTable', { static: true }) table;

  totalRecord: any;
  totalFilteredRecord: any;
  public permission: any;
  public permissionObject = {
    check: null,
    delete: null,
    id: '',
    read: null,
    update: null,
    write: null,
  };
  data: any;
  loading: boolean;
  private _page: number;
  request: any;
  constructor(private translate: TranslateService,
    private _store: Store<IAppState>,
    private holidayService: HolidayService,) {


  }

  ngOnInit(): void {
    this._store.pipe(takeUntil(this.componetDestroyed), select(selectViewSettingsList))
      .subscribe((response: ViewSettingGetObject) => {
        if (response) {
          this.currentLang = response.data.settingDto.language;
          this.translate.setDefaultLang(this.currentLang);
          this.loadPage();
        }
      });
    this._store.pipe(select(selectPermissionsData)).subscribe((response: any) => {
      if (response) {
        this.permission = response.data.find((item: any) => item.id === this.holidayId);
        this.permissionObject = this.permission;
      }
    });
    this.translate.get(['COUNTRY', 'CUTOFTIME', 'YEAR', 'WEEKLY', 'DATEFORMAT', 'DAYS', 'ACTION']).subscribe(translation => {
      this.columns = [
        {
          prop: 'country',
          name: translation.COUNTRY,
          sortable: false,
          cellTemplate: this.country,
        },
        {
          prop: 'cutoftime',
          name: translation.Cutoftime,
          sortable: false,
          cellTemplate: this.cutoftime,
        },
        {
          prop: 'year',
          name: translation.Year,
          sortable: false
        },
        {
          prop: 'weekly',
          name: translation.weekly,
          sortable: false,
          cellTemplate: this.weekly,
        },
        {
          prop: 'dateformat',
          name: translation.DateFormat,
          sortable: false,
          cellTemplate: this.dateformat,
        },
        {
          prop: 'days',
          name: translation.Days,
          sortable: false,
          cellTemplate: this.days,
        },
      ];
    });

    this.loadPage()
  }

  private loadPage() {
    this.loading = true;
    this.subscription.push(
      this.holidayService
        .getHoliday({
          filter: this._transFilters(),
          page: this.pageIndex,
          'page-size': this.currentPagination,
          //filter: this.filter,
        })
        .subscribe((res: any) => {
          if (res && res.data) {
            this.dataArray = res.data.holidayList;
            this.data = this.dataArray.map(item => {
              const holiday = JSON.parse(item.holidayList);
              item.holidayList = holiday;
              return item
            });
            this.totalRecord = res.data['total-record'];
            this.totalFilteredRecord = res.data['total-filtered-record'];
            this.loading = false;
          }
        })
    );
  }

  private _transFilters() {
    return Object.keys(this._filters)
      .map((item) => {
        return item + ':' + this._filters[item];
      })
      .join(',');
  }

  public onScroll(offsetY: any) {
    const THis = this;
    jQuery('.datatable-body').on('scroll', function () {
      let div = jQuery(this).get(0);
      if (div.scrollTop + div.clientHeight >= div.scrollHeight) {
        if (THis.request) {
          THis._page = ++THis._page;
          THis.loadPage();
        }
      }
    });
  }


}
