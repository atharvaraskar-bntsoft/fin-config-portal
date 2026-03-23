import { AlertService } from './../../services/alert.service';
import { OnDestroy, TemplateRef } from '@angular/core';
import { ViewChild } from '@angular/core';
import { GetSnapshotListToBeCreated } from './../../store/actions/export-entities.action';
import { TranslateService } from '@ngx-translate/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { UntypedFormGroup, UntypedFormControl, Validators } from '@angular/forms';
import { IAppState } from '@app/store/state/app.state';
import { Store } from '@ngrx/store';
import { snapshotList } from '@app/store/selectors/export-entities.selectors';
import { Subscription } from 'rxjs/internal/Subscription';
import { ExportEntitiesService } from '@app/services/export-entities.service';
declare var jQuery: any;

@Component({
  selector: 'app-create-entities',
  templateUrl: './create-entities.component.html',
  styleUrls: ['./create-entities.component.scss'],
})
export class CreateEntitiesComponent implements OnInit, OnDestroy {
  public currentPagination = '20';
  private _page = 1;
  public request: Boolean = true;
  exportForm: UntypedFormGroup;
  isCreatePage: boolean;
  headerHeight = 40;
  rowHeight = 50;
  rows = [];
  public totalRecords: Number;
  columns = [];
  private _filters: Array<any> = [];
  tableHeight = {
    outerContainer: 70,
    innerContainer: 60,
  };
  tableVsbl: boolean;
  snapshotExportedDetail = [];
  subscription: Subscription[] = [];
  loading: boolean;
  page: string;
  entityName: string;
  @ViewChild('versionList', { static: true }) versionList: TemplateRef<any>;
  @ViewChild('btnradio', { static: true }) btnradio: TemplateRef<any>;

  error: boolean;
  finalResult: any;
  records:number;
  constructor(
    private activeRoute: ActivatedRoute,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private translateService: TranslateService,
    private alertService: AlertService,
    private exportEntitiesService: ExportEntitiesService,
    private store: Store<IAppState>,
  ) {
    
  }

  private _fetchSnapshotBasedOnId(id) {
    this.exportEntitiesService.getSnapshotListById(id).subscribe((res: any) => {
      if (res && res.data) {
        this.loading = false;
        this.rows = res.data.snapshotExportedDetail;
        this.rows.forEach(ele => {
          ele.idVersionListToExport.push({ id: ele.entityId, version: ele.version });
          //ele.idVersionListToExport = ele.idVersionListToExport.sort((itemA, itemB) => itemB.version - itemA.version);
          ele.version = ele?.idVersionListToExport[0]?.id;
        });
      }
    });
  }
 
  ngOnInit(): void {
    this.exportForm = new UntypedFormGroup({
      id: new UntypedFormControl(null),
      name: new UntypedFormControl('', null),
      comment: new UntypedFormControl(null),
      snapshotExportedDetail: new UntypedFormControl(null, [Validators.required]),
    });
    this.subscription.push(
      this.activeRoute.data.subscribe(result => {
        this.rows = [];
        this.finalResult = result;
        if (this.finalResult) {
          this.loading = true;
          if (this.finalResult.page === 'create') {
            this.loadPage(this._page);
            this.isCreatePage = true;
            this.tableHeight.innerContainer = 50;
            this.tableHeight.outerContainer = 60;
          } else {
            const currentNav =
              this.router.getCurrentNavigation() && this.router.getCurrentNavigation().extras;
            this.page = (currentNav as any)?.page;
            this.activatedRoute.params.subscribe(res => {
              if (res.hasOwnProperty('id')) {
                this._fetchSnapshotBasedOnId(res.id);
              }
            });
            this.isCreatePage = false;
          }
          this.tableVsbl = true;
        }
      }),
    );

    /**
     * Fetch Snapshot List
     */

    this.subscription.push(
      this.store.select(snapshotList).subscribe(res => {
        if (res && res.data) {
          this.request = true;
          this.loading = false;
          if (this._page === 1) {
            this.rows = res.data.entitiesList;
            this.rows = this.rows.map(item => {
              item.idVersionListToExport = item.idVersionListToExport.sort(
                (itemA, itemB) => itemB.version - itemA.version,
              );
              item.idVersionListToExport = item.idVersionListToExport.slice(0, 3);
              return item;
            });
          } else if (this.rows.length !== 0) {
            this.rows = this.rows.concat(res.data.entitiesList);
            this.rows = this.rows.map(item => {
              item.idVersionListToExport = item.idVersionListToExport.sort(
                (itemA, itemB) => itemB.version - itemA.version,
              );
              item.idVersionListToExport = item.idVersionListToExport.slice(0, 3);
              return item;
            });
          }
          this.records = this.rows.length;
          if (res.data['total-record'] === this.rows.length) {
            this.request = false;
          }
          this.totalRecords = res.data['total-record'];
          this.rows.length &&
            this.rows.forEach(ele => {
              ele.version = ele.idVersionListToExport[0]?.id;
              ele.entityId = ele.idVersionListToExport[0]?.id;
            });
        }
      }),
    );

    /**
     * Set the table columns
     */
    this.translateService
      .get(['ACQUIRER_ENTITY_TYPE', 'ENTITY_VERSION', 'ENTITY_ID', 'ENTITY_NAME', 'SELECT_ENTITY'])
      .subscribe(translation => {
        if (this.isCreatePage) {
          this.entityName = translation.SELECT_ENTITY;
        } else {
          this.entityName = translation.ENTITY_NAME;
        }

        this.columns = [
          {
            prop: 'entityName',
            name: this.entityName,
            cellTemplate: this.btnradio,
            sortable: false,
          },
          {
            prop: 'entityType',
            name: translation.ACQUIRER_ENTITY_TYPE,
          },
          {
            prop: '',
            name: translation.ENTITY_VERSION,
            cellTemplate: this.versionList,
            sortable: false,
          },
        ];
      });
  }

  onSubmit(form) {
    this.exportForm.value.comment = this.exportForm.value.comment?.replace(/<[^>]*>/g, '');
    if (form.valid && this.snapshotExportedDetail) {
      this.snapshotExportedDetail;
      this.snapshotExportedDetail.forEach(ele => {
        if (ele && ele.idVersionListToExport) {
          ele.idVersionListToExport.forEach(item => {
            if (item.id === ele.entityId) {
              ele.version = item.version;
              ele.entityName = ele.entityName;
            }
          });
        }
      });
      this.error = false;
      this.subscription.push(
        this.exportEntitiesService
          .createExportSnapshot({ payload: form.value })
          .subscribe((res: any) => {
            this.alertService.responseMessage(res);
            if (res && res.status === 'success') {
              this.router.navigate(['export-list']);
            }
          }),
      );
    } else {
      this.error = true;
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

  onSelect(row) {
    this.exportForm.controls.snapshotExportedDetail.setValue(row.selected);
  }

  rowVersionChange(event, row) {
    row.entityId = event;
  }

  ngOnDestroy() {
    this.subscription.forEach(subs => subs.unsubscribe());
  }

  private loadPage(pagenumber: number) {
    // set the loading flag, which serves two purposes:
    // 1) it prevents the same page from being loaded twice
    // 2) it enables display of the loading indicator
    this.store.dispatch(
      new GetSnapshotListToBeCreated({
        filter: this._transFilters(),
        page: pagenumber,
        'page-size': this.currentPagination,
      }),
    );
    this.request = false;
  }

  private _transFilters(): Object {
    const output = Object.keys(this._filters);
    return output
      .map(item => {
        return item + ':' + this._filters[item];
      })
      .join(',');
  }
}
