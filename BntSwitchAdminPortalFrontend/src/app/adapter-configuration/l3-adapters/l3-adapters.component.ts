import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { IAppState } from '@app/store/state/app.state';
import { Store, select } from '@ngrx/store';
import { Router } from '@angular/router';
import { takeUntil } from 'rxjs/operators';
import { selectL3AdapterList } from '@app/store/selectors/l3-adapter.selectors';
import { Subject } from 'rxjs';
import { selectViewSettingsList } from '@app/store/selectors/view-settings.selector';
import { ViewSettingGetObject } from '@app/models/view-settings.interface';
import { GetL3AdapterList } from '@app/store/actions/l3-adapter.action';
import { L3AdapterService } from '@app/services/l3-adapter.service';
import { AlertService } from '@app/services/alert.service';
import { Utils } from 'src/utils';
import { selectPermissionsData } from '@app/store/selectors/permission.selectors';
import { L1AdapterService } from '@app/services/l1-adapter.service';
import { GetImfJsonView } from '@app/store/actions/imf-json.action';
import { getIfmList } from '@app/store/selectors/imf-json.selector';
declare var jQuery: any;

@Component({
  selector: 'app-l3-adapters',
  templateUrl: './l3-adapters.component.html',
  styleUrls: ['./l3-adapters.component.scss'],
})
export class L3AdaptersComponent implements OnInit {
  public adaptorMenu: any = [];
  componetDestroyed = new Subject();
  public loading = true;
  public rows: any = [];
  public columns: Array<any> = [];
  readonly headerHeight = 40;
  public request: Boolean = true;
  private _page = 1;
  private _filters: Array<any> = [];
  public visible = false;
  public visibleAnimate = false;
  public finalId: any;
  public currentPagination = '20';
  readonly rowHeight = 48;
  public currentLang: string;
  public totalRecords: Number;
  public selectedVersion: any;
  public rowData: any = [];
  public visibleCopy = false;
  public visibleCopyAnimate = false;
  public currentItem: any;
  public copyObj: any = {
    configuraionId: null,
    adapterName: null,
    imfId: null,
  };
  public getIfmList: any = [];
  public isSaveCopy = false;
  @ViewChild('action', { static: true }) actions: TemplateRef<any>;
  @ViewChild('version', { static: true }) version: TemplateRef<any>;
  @ViewChild('status', { static: true }) status: TemplateRef<any>;
  @ViewChild('myTable', { static: true }) table;

  public permission: any;
  public permissionObject = {
    check: null,
    delete: null,
    id: '',
    read: null,
    update: null,
    write: null,
  };
  public beanTabDisable = true;
  public l3AdaptersId = 'link_l3_adapters';
  public selectedAdapterName: any;
  public l3jsonVisible: Boolean = false;
  public type = 'L3';

  constructor(
    private _store: Store<IAppState>,
    private translate: TranslateService,
    private _router: Router,
    private alertService: AlertService,
    private _l3AdapterService: L3AdapterService,
    private _l1AdapterService: L1AdapterService,
  ) {}

  ngOnInit() {
    this._store
      .pipe(takeUntil(this.componetDestroyed), select(selectL3AdapterList))
      .subscribe((response: any) => {
        if (response) {
          this.rowData = Utils.newData(response.data.adaptorlist);
          this.rowData = this.rowData.map(item => {
            item.status = item.adapterConfigSummaryUIWapper.length
              ? item.adapterConfigSummaryUIWapper[0].status
              : null;
            item.version = item.adapterConfigSummaryUIWapper.length
              ? item.adapterConfigSummaryUIWapper[0].version
              : null;
            item.action = item.adapterConfigSummaryUIWapper.length
              ? item.adapterConfigSummaryUIWapper[0].action
              : null;
            return item;
          });

          this.request = true;
          if (this._page === 1) {
            this.adaptorMenu = this.rowData;
          } else if (this.adaptorMenu.length !== 0) {
            this.adaptorMenu = this.adaptorMenu.concat(this.rowData);
          }
          if (response.data['total-record'] === this.adaptorMenu.length) {
            this.request = false;
          }
          this.totalRecords = response.data['total-record'];
          this.loading = false;
        }
      });
    this._store.pipe(select(selectViewSettingsList)).subscribe((response: ViewSettingGetObject) => {
      if (response) {
        this.currentPagination = response.data.settingDto.pagination;
        this.currentLang = response.data.settingDto.language;
        this.translate.setDefaultLang(this.currentLang);
        this.loadPage(this._page);
      }
    });

    this._store.dispatch(new GetImfJsonView());
    this._store
      .pipe(takeUntil(this.componetDestroyed), select(getIfmList))
      .subscribe((response: any) => {
        if (response) {
          let IfmList = response.data.imfStructureList;
          IfmList = IfmList.filter(item => item.version !== 0);
          this.getIfmList = [];
          const size = 2;
          const items = IfmList.slice(0, size);
          this.getIfmList = items.map(item => {
            return {
              id: item.id,
              name: item.name,
              version: item.version,
            };
          });
        }
      });

    this._store.pipe(select(selectPermissionsData)).subscribe((response: any) => {
      if (response) {
        this.permission = response.data.find(item => item.id === this.l3AdaptersId);
        this.permissionObject = this.permission;
      }
    });
    this.translate.get(['NAME', 'TEMPLATE', 'VERSION', 'ACTION']).subscribe(translation => {
      this.columns = [
        { prop: 'name', name: translation.NAME },
        { prop: 'template', name: translation.TEMPLATE },
        {
          prop: 'version',
          name: translation.VERSION,
          cellTemplate: this.version,
          sortable: false,
          width: 20,
        },
        {
          prop: 'action',
          name: translation.ACTION,
          cellTemplate: this.actions,
          sortable: false,
        },
      ];
    });
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

  public changeRow(event, row) {
    row.status = event.status;
    row.version = event.version;
    row.action = event.action;
  }

  private _transFilters(): String {
    return Object.keys(this._filters)
      .map(item => {
        return item + ':' + this._filters[item];
      })
      .join(',');
  }

  public getRowData(row): void {
    let id = row.id;
    row.adapterConfigSummaryUIWapper?.forEach(item => {
      if (item.version === row.version) {
        id = item.id;
      }
    });
    this._router.navigate(['adapter-configuration/l3-adapters', id]);
  }

  public viewRowData(row): void {
    let id = row.id;
    row.adapterConfigSummaryUIWapper.forEach(item => {
      if (item.version === row.version) {
        id = item.id;
      }
    });
    this._router.navigate(['adapter-configuration/l3-adapters/', id, 'view']);
  }
  
  
  async downloadRowL3(row: any) {
    const adapterId = row.id;
    const selectedVersionObj = row.adapterConfigSummaryUIWapper.find(
      item => item.version === row.version
    );

    if (!selectedVersionObj) {
      console.error('Selected version not found!');
      return;
    }

    const version = selectedVersionObj.version;

    const payload = { adapterId, version };

    try {
      const dirHandle = await (window as any).showDirectoryPicker();
      const beansDirHandle = await dirHandle.getDirectoryHandle('beans', { create: true });

      this._l3AdapterService.downloadL3Adapter(payload).subscribe(async res => {
        if (res?.status === 'success' && res?.data?.files?.length) {
          for (const file of res.data.files) {
            let content = file.content;
            if (file.contentType === 'application/json') {
              try { content = JSON.stringify(JSON.parse(file.content), null, 2); } 
              catch(e) { console.error('JSON parse error', e); }
            }

            const targetDir = file.fileName.startsWith('channel') || file.fileName.startsWith('workflow')
              ? beansDirHandle
              : dirHandle;

            const fileHandle = await targetDir.getFileHandle(file.fileName, { create: true });
            const writable = await fileHandle.createWritable();
            await writable.write(content);
            await writable.close();
          }
          alert('All L3 adapter configuration files have been downloaded successfully!');
        }
      });
    } catch (err) {
      console.error('Error downloading L3 adapter config:', err);
    }
  }


  public deleteRow(row) {
    this.finalId = row.id;
    row.adapterConfigSummaryUIWapper.forEach(item => {
      if (item.version === row.version) {
        this.finalId = item.id;
      }
    });
    this._l1AdapterService
      .deleteRow(this.finalId)
      .pipe(takeUntil(this.componetDestroyed))
      .subscribe(res => {
        if (res && res.status === 'success') {
          this.alertService.responseMessage(res);
          this.loadPage(this._page);
        }
      });
  }

  public checkEdit(row) {
    if (row.action && row.action.includes('M')) {
      return true;
    } else {
      return false;
    }
  }

  public checkDelete(row) {
    if (row.action && row.action.includes('D')) {
      return true;
    } else {
      return false;
    }
  }
  public copyClick(row) {
    document.body.style.overflow = 'hidden';
    this.visibleCopy = true;
    this.currentItem = row;
    this.copyObj.configuraionId = row.adapterConfigSummaryUIWapper[0].id;
    this.copyObj.adapterName = null;
    this.copyObj.imfId = null;
    this.isSaveCopy = false;
    setTimeout(() => (this.visibleCopyAnimate = true), 200);
  }
  public copyCancel(): void {
    document.body.style.overflow = 'auto';
    this.visibleCopyAnimate = false;
    setTimeout(() => (this.visibleCopy = false), 100);
  }

  public saveCopy() {
    if (this.copyObj.adapterName && this.copyObj.imfId) {
      const formData = new FormData();
      this.isSaveCopy = true;
      formData.append('adapterName', this.copyObj.adapterName);
      formData.append('configuraionId', this.copyObj.configuraionId);
      formData.append('imfId', this.copyObj.imfId);
      this._l3AdapterService.copyL3Adapter(formData).subscribe(item => {
        if (item && item.status !== 'failure') {
          this.alertService.responseMessage(item);
          this.isSaveCopy = false;
        }
        this.loadPage(this._page);
        this.visibleCopy = false;
        this.isSaveCopy = false;
      });
    } else {
      this.alertService.responseMessage({
        status: 'failure',
        message: 'Please Enter Mandatory Fields',
      });
    }
  }

  private loadPage(pagenumber: Number) {
    // set the loading flag, which serves two purposes:
    // 1) it prevents the same page from being loaded twice
    // 2) it enables display of the loading indicator
    this._store?.dispatch(
      new GetL3AdapterList({
        filter: this._transFilters(),
        page: pagenumber,
        'page-size': this.currentPagination,
      }),
    );
    this.request = false;
  }

  compareJson(row) {
    this.selectedAdapterName = row.name;
    this.l3jsonVisible = true;
  }
  closePopup(): void {
    this.l3jsonVisible = false;
  }
}
