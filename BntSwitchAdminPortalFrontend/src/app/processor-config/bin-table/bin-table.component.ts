import {
  ClearState,
  GetBinTable,
  GetBinTableDetails,
  UploadFile,
} from './../../store/actions/bin-table.action';
import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { IAppState } from '@app/store/state/app.state';
import { selectViewSettingsList } from '@app/store/selectors/view-settings.selector';
import { ViewSettingGetObject } from '@app/models/view-settings.interface';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { fileUploaded, selectGetBinTable } from '@app/store/selectors/bin-table.selector';
import { AlertService } from '@app/services/alert.service';
declare var jQuery: any;
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-bin-table',
  templateUrl: './bin-table.component.html',
  styleUrls: ['./bin-table.component.scss'],
})
export class BinTableComponent implements OnInit {
  public rows: any = [];
  public columns: any;
  readonly headerHeight = 40;
  public currentLang: string;
  readonly rowHeight = 75;
  readonly pageLimit = 15;
  private _page = 1;
  public request: Boolean = true;
  public loading = true;
  public currentPagination = '20';
  private _filters: Array<any> = [];
  public binTableData: Array<any> = [];
  public totalRecords: Number;
  public visiblePopUp = false;
  public visiblePopUpAnimate = false;
  public multiSelectFile = false;
  public allowedMimeType = ['text/xml'];
  public activatedOnModel;
  public importXMLData = {
    activatedOn: null,
    uploadFile: null,
  };
  componetDestroyed = new Subject();

  @ViewChild('status', { static: true }) status: TemplateRef<any>;
  @ViewChild('uplodedOn', { static: true }) uplodedOn: TemplateRef<any>;
  @ViewChild('activatedOn', { static: true }) activatedOn: TemplateRef<any>;
  @ViewChild('fileName', { static: true }) fileName: TemplateRef<any>;
  @ViewChild('myTable', { static: true }) table;
  constructor(
    private _store: Store<IAppState>,
    private _router: ActivatedRoute,
    private translate: TranslateService,
    private _route: Router,
    private alertService: AlertService,
  ) {  }

  ngOnInit() {
    this._store
      .pipe(takeUntil(this.componetDestroyed), select(selectViewSettingsList))
      .subscribe((response: ViewSettingGetObject) => {
        if (response) {
          this.currentPagination = response.data.settingDto.pagination;
          this.currentLang = response.data.settingDto.language;
          this.translate.setDefaultLang(this.currentLang);
          this.loadPage(this._page);
        }
      });

    this._store
      .pipe(takeUntil(this.componetDestroyed), select(selectGetBinTable))
      .subscribe((response: any) => {
        if (response) {
          this.request = true;
          if (this._page === 1) {
            this.binTableData = response.data.BinMasterList;
          } else if (this.binTableData.length > 0) {
            this.binTableData = this.binTableData.concat(response.data.BinMasterList);
          }
          if (response.data['total-record'] === this.binTableData.length) {
            this.request = false;
          }
          this.totalRecords = response.data['total-record'];
          this.loading = false;
        }
      });

    this._store.pipe(select(fileUploaded)).subscribe((data: any) => {
      if (data && data.status === 'success') {
        this.loadPage(this._page);
      }
    });
    this.translate
      .get(['FILE_NAME', 'UPLOADED_ON', 'ACTIVE', 'ACTIVATED_ON'])
      .subscribe(translation => {
        this.columns = [
          { prop: 'fileName', name: translation.FILE_NAME, cellTemplate: this.fileName },
          { prop: 'active', name: translation.ACTIVE, cellTemplate: this.status },
          {
            prop: 'uploadedOn',
            name: translation.UPLOADED_ON,
            cellTemplate: this.uplodedOn,
          },
          {
            prop: 'activateOn',
            name: translation.ACTIVATED_ON,
            cellTemplate: this.activatedOn,
          },
        ];
      });
  }

  // private _transFilters(): String {
  //   return Object.keys(this._filters)
  //     .map((item) => {
  //       return item + ":" + this._filters[item];
  //     })
  //     .join(",");
  // }

  public onScroll(offsetY: any) {
    const THis = this;
    jQuery('.datatable-body').on('scroll', function () {
      let div = jQuery(this).get(0);
      if (div.scrollTop + div.clientHeight >= div.scrollHeight) {
        if (THis.request) {
          THis._page = ++THis._page;
          THis.loadPage(THis._page);
        }
      }
    });
  }

  private loadPage(pagenumber: Number) {
    // set the loading flag, which serves two purposes:
    // 1) it prevents the same page from being loaded twice
    // 2) it enables display of the loading indicator
    this._store.dispatch(
      new GetBinTable({
        // filter: this._transFilters(),
        page: pagenumber,
        'page-size': this.currentPagination,
      }),
    );
    this.request = false;
    this.loading = true;
  }

  openDialog() {
    this.openPopUp();
  }

  public openPopUp(): void {
    document.body.style.overflow = 'hidden';
    this.visiblePopUp = true;
    setTimeout(() => (this.visiblePopUpAnimate = true), 200);
  }

  public cancelPopUp(): void {
    document.body.style.overflow = 'auto';
    this.visiblePopUpAnimate = false;
    setTimeout(() => (this.visiblePopUp = false), 100);
    this.importXMLData.uploadFile = null;
    this.importXMLData.activatedOn = null;
  }

  selectedFile($event) {
    if ($event) {
      const file = $event[0];
      this.importXMLData.uploadFile = file;
    }
  }

  onScheduleDateChange($event: any) {
    if ($event) {
      this.importXMLData.activatedOn = new Date($event).getTime();
    }
  }

  saveUpload() {
    const formData: FormData = new FormData();
    formData.set('uploadFile', this.importXMLData.uploadFile);
    formData.set('activatedOn', this.importXMLData.activatedOn);
    if (!this.importXMLData.activatedOn || !this.importXMLData.uploadFile) {
      this.alertService.responseMessage({
        status: 'failure',
        message: 'Please Select .XML file and Schedule Date',
      });
    } else {
      this._store.dispatch(new UploadFile(formData));
      this.cancelPopUp();
    }
  }
  ngOnDestroy(): void {
    this.componetDestroyed.next();
    this.componetDestroyed.complete();
    this.componetDestroyed.unsubscribe();
    this._store.dispatch(new ClearState());
  }
}
