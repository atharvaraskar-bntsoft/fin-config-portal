import { Router } from '@angular/router';
import {
  FetchImportExportAction,
  GetImportEntitiesList,
  POSTIMPORTDATA,
} from './../../store/actions/export-entities.action';
import { selectDownloadSnapshot } from './../../store/selectors/export-entities.selectors';
import { TranslateService } from '@ngx-translate/core';
import { Component, Input, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { IAppState } from '@app/store/state/app.state';
import { select, Store } from '@ngrx/store';
import {
  importDataList,
  importDataResponse,
  importExportSelector,
} from '@app/store/selectors/export-entities.selectors';
import { ClipboardService } from 'ngx-clipboard';
import { Utils } from 'src/utils';
import * as FileSaver from 'file-saver';
import { AlertService } from '@app/services/alert.service';
import { SubscribeService } from '@app/services/subscribe.services';
import { ExportEntitiesService } from '@app/services/export-entities.service';
import { selectPermissionsData } from '@app/store/selectors/permission.selectors';
declare var jQuery;

@Component({
  selector: 'app-import-export',
  templateUrl: './import-export.component.html',
  styleUrls: ['./import-export.component.scss'],
})
export class ImportExportComponent implements OnInit {
  @Input() template: any;
  loading = false;
  private _page = 1;
  readonly headerHeight = 40;
  readonly rowHeight = 50;
  readonly pageLimit = 15;
  public currentPagination = '20';
  public rows: any[];
  public deltaList: any[];
  public rowId: any;
  public request = true;
  public;
  columns = [];
  @ViewChild('action', { static: true }) action: TemplateRef<any>;
  copied: boolean;
  jsonObj: any;
  data: any;
  visibleAnimate: boolean;
  visible: boolean;
  page = 'IMPORT' || 'EXPORT';
  public importPopup = false;
  public confirmationPopup = false;
  public totalRecords: Number;
  public deltaData = {};
  public records: Number;
  private _filters: Array<any> = [];
  importTitle = 'Import JSON';
  public importForm = {
    importData: null,
  };
  urlParams: any;
  public permission: any;
  public permissionObject = {
    check: null,
    delete: null,
    id: '',
    read: null,
    update: null,
    write: null,
  };
  public exports = 'link_exports';
  @ViewChild('versionList', { static: true }) versionList: TemplateRef<any>;
  @ViewChild('entityType', { static: true }) entityType: TemplateRef<any>;

  constructor(
    private translate: TranslateService,
    private _clipboardService: ClipboardService,
    private _exportentitiesService: ExportEntitiesService,
    private _store: Store<IAppState>,
    private router: Router,
    private _subscribeService: SubscribeService,
    private alertService: AlertService,
  ) {
    this._setPage();
  }

  ngOnInit(): void {
    this.loadPage(this._page);
    this.setColumns();
    if (this.page === 'EXPORT') {
      this._store.select(importExportSelector).subscribe(result => {
        if (result) {
          this.request = true;
          this.loading = false;
          if (this._page === 1) {
            this.rows = Utils.newData(result.entitiesList);
          } else if (this.rows.length !== 0) {
            this.rows = this.rows.concat(Utils.newData(result.entitiesList));
          }
          this.records = this.rows.length;
          if (result['total-record'] === this.rows.length) {
            this.request = false;
          }
          this.totalRecords = result['total-record'];
        }
      });
    } else if (this.page === 'IMPORT') {
      this._store.select(importDataList).subscribe(result => {
        if (result) {
          this.request = true;
          this.loading = false;
          if (this._page === 1) {
            this.rows = Utils.newData(result.data.snapshotImportDetail);
          } else if (this.rows.length !== 0) {
            this.rows = this.rows.concat(Utils.newData(result.data.snapshotImportDetail));
          }
          this.records = this.rows.length;
          if (result.data['total-record'] === this.rows.length) {
            this.request = false;
          }
          this.totalRecords = result.data['total-record'];
        }
      });
    }
    this.loading = true;
    this._store.select(importDataResponse).subscribe(data => {
      if (data && data.status === 'success') {
        this.loadPage(this._page);
      }
    });

    this._store.pipe(select(selectPermissionsData)).subscribe((response: any) => {
      if (response) {
        this.permission = response.data.find(item => item.id === this.exports);
        this.permissionObject = this.permission;
      }
    });
  }

  private _setPage() {
    this.urlParams = this.router.url.split('/');
    if (this.urlParams[this.urlParams.length - 1] === 'import-snapshot') {
      this.page = 'IMPORT';
    } else {
      this.page = 'EXPORT';
    }
  }

  private setColumns() {
    if (this.page === 'EXPORT') {
      this.translate
        .get(['ID', 'NAME', 'COMMENT', 'ACTION', 'ACQUIRER_ENTITY_TYPE', 'ENTITY_VERSION'])
        .subscribe(translation => {
          this.columns = [
            {
              prop: 'id',
              name: translation.ID,
              width: 10,
            },
            {
              prop: 'name',
              name: translation.NAME,
              width: 170,
            },
            {
              prop: 'comment',
              name: translation.COMMENT,
              width: 250,
            },
            {
              prop: 'entityType',
              name: translation.ACQUIRER_ENTITY_TYPE,
              cellTemplate: this.entityType,
              sortable: false,
              width: 150,
            },
            {
              prop: 'versionList',
              name: translation.ENTITY_VERSION,
              cellTemplate: this.versionList,
              sortable: false,
              width: 55,
            },
            {
              prop: 'action',
              name: translation.ACTION,
              cellTemplate: this.action,
              sortable: false,
            },
          ];
        });
    } else if (this.page === 'IMPORT') {
      this.translate.get(['ID', 'NAME', 'STATUS']).subscribe(translation => {
        this.columns = [
          { prop: 'id', name: translation.ID, width: 10 },
          { prop: 'fileName', name: translation.NAME, width: 200 },
          { prop: 'status', name: translation.STATUS, width: 200 },
        ];
      });
    }
  }

  //It is not used on UI

  viewJSON(row) {
    this._exportentitiesService.getData(row.id).subscribe((data: any) => {
      this.visible = true;
      this.jsonObj = JSON.parse(data.data.data);

      if (this.jsonObj.hasOwnProperty('Adapter')) {
        this.jsonObj.Adapter[0].schemaData.schema = JSON.parse(
          this.jsonObj.Adapter[0].schemaData.schema,
        );
      }

      if (this.jsonObj.data.hasOwnProperty('Routing')) {
        this.jsonObj.data.Routing[0].routingVersion[0].configuredRoutes[0].routeWrapper.ruleConfig.json =
          JSON.parse(
            this.jsonObj.data.Routing[0].routingVersion[0].configuredRoutes[0].routeWrapper
              .ruleConfig.json,
          );
        this.jsonObj.data.Routing[0].routingVersion[0].configuredRoutes[0].routeWrapper.ruleConfig.ruleJson =
          JSON.parse(
            this.jsonObj.data.Routing[0].routingVersion[0].configuredRoutes[0].routeWrapper
              .ruleConfig.ruleJson,
          );
        this.jsonObj.data.Routing[0].routingVersion[0].configuredRoutes[0].routeWrapper.ruleConfig.json.condition =
          JSON.parse(
            this.jsonObj.data.Routing[0].routingVersion[0].configuredRoutes[0].routeWrapper
              .ruleConfig.json.condition,
          );
      }
      if (this.jsonObj.data.hasOwnProperty('Rule')) {
        this.jsonObj.data.Rule[0].ruleConfiguration[0].json = JSON.parse(
          this.jsonObj.data.Rule[0].ruleConfiguration[0].json,
        );
        this.jsonObj.data.Rule[0].ruleConfiguration[0].ruleJson = JSON.parse(
          this.jsonObj.data.Rule[0].ruleConfiguration[0].ruleJson,
        );
        this.jsonObj.data.Rule[0].ruleConfiguration[0].json.condition = JSON.parse(
          this.jsonObj.data.Rule[0].ruleConfiguration[0].json.condition,
        );
      }
      if (this.jsonObj.data.hasOwnProperty('ImfStructure')) {
        this.jsonObj.data.ImfStructure[0].imf = JSON.parse(this.jsonObj.data.ImfStructure[0].imf);
      }
    });
  }

  //It is not used on UI

  // navigateToViewDetails(row) {
  //   this.router.navigate(['export-list', 'view-details', row.id], row);
  // }

  copyToClipboard(item: string) {
    this.copied = true;
    this._clipboardService.copyFromContent(JSON.stringify(item));
    setTimeout(() => {
      this.copied = false;
    }, 1000);
  }

  //It is not used on UI

  // importSnapshot(row) {

  //   if (this.page === 'IMPORT') {
  //     this.router.navigate(['export-list', 'view-details', row.id], { ...row, page: this.page });
  //   }
  // }

  //It is not used on UI

  public downloadSnapshot(row) {
    this.rowId = row.id;
    this._exportentitiesService.downloadSnapshot(this.rowId).subscribe((item: any) => {
      // var blob = new Blob([item], { type: 'application/octet-stream' });
      // FileSaver.saveAs(blob, 'test.zip');
    });
  }

  public close(): void {
    document.body.style.overflow = 'auto';
    this.visibleAnimate = false;
    setTimeout(() => (this.visible = false), 100);
    this._subscribeService.sendResetFileItems(true);
  }

  public importJson() {
    this._subscribeService.sendResetFileItems(true);
    this.importPopup = true;
  }

  public cancel() {
    this.importPopup = false;
    this.resetForm();
    this._subscribeService.sendResetFileItems(true);
  }

  resetForm() {
    this.importForm.importData = null;
  }

  selectedFile($event) {
    if ($event) {
      const file = $event[0];
      this.importForm.importData = file;
    }
  }
  submitImport() {
    this.deltaData = {};
    if (this.importForm.importData) {
      const formData = new FormData();
      formData.set('uplodedFile', this.importForm.importData);
      this._exportentitiesService.postImportData(formData).subscribe((data: any) => {
        if (data) {
          let obj = JSON.parse(data.data);
          if (obj.deltaList) {
            this.deltaList = obj.deltaList;
            this.deltaData['name'] = obj.fileName;
            this.confirmationPopup = true;
          } else {
            this.alertService.responseMessage(data);
          }
        }
      });
      // this._store.dispatch(new POSTIMPORTDATA(formData));
      this.cancel();
    } else {
      this.alertService.responseMessage({
        status: 'failure',
        message: 'Please Select .JSON File',
      });
    }
  }
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

  private _transFilters(): String {
    return Object.keys(this._filters)
      .map(item => {
        return item + ':' + this._filters[item];
      })
      .join(',');
  }

  private loadPage(pageNum: number) {
    if (this.page === 'EXPORT') {
      this._store.dispatch(
        new FetchImportExportAction({
          filter: this._transFilters(),
          page: pageNum,
          'page-size': this.currentPagination,
        }),
      );
    } else if (this.page === 'IMPORT') {
      this._store.dispatch(
        new GetImportEntitiesList({
          filter: this._transFilters(),
          page: pageNum,
          'page-size': this.currentPagination,
        }),
      );
    }
    this.request = false;
  }

  public submitConfirmation(data) {
    if (data == 'Y') {
      this.deltaData['confirmation'] = data;
      this._exportentitiesService.postImportDataConfirmation(this.deltaData).subscribe(data => {
        this.alertService.responseMessage(data);
      });
      this.confirmationPopup = false;
    } else {
      this.confirmationPopup = false;
    }
  }
}
