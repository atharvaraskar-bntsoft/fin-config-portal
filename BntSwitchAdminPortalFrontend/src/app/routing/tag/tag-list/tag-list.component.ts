import { TemplateRef, ViewChild } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Component, OnInit } from '@angular/core';
import { GetNewTags } from '@app/store/actions/rule-tag.action';
import { selectNewTagList } from '@app/store/selectors/rule-tag.selectors';
import { IAppState } from '@app/store/state/app.state';
import { select, Store } from '@ngrx/store';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ITagsList } from './../tag.d';
import { Router } from '@angular/router';
import { selectPermissionsData } from '@app/store/selectors/permission.selectors';
import { RuleTagService } from '@app/services/rule-tag.service';
import { AlertService } from '@app/services/alert.service';
declare var jQuery: any;

@Component({
  selector: 'app-tag-list',
  templateUrl: './tag-list.component.html',
  styleUrls: ['./tag-list.component.scss'],
})
export class TagListComponent implements OnInit {
  public tagList$: Observable<ITagsList[]>;
  public currentTag: ITagsList;
  public visible: boolean;
  public visibleAnimate: boolean;
  public tagData: any = [];
  public componetDestroyed = new Subject();
  public editUrl;
  public totalRecords: number;
  private request: any;
  private _page = 1;
  public loading = true;
  public columns: (
    | { name: any; prop: string; cellTemplate?: undefined; sortable?: boolean }
    | { name: any; prop: string; cellTemplate: any; sortable?: boolean }
  )[];

  @ViewChild('serviceTempl', { static: true }) serviceTempl: TemplateRef<HTMLElement>;
  @ViewChild('destinationTmpl', { static: true }) destinationTmpl: TemplateRef<HTMLElement>;
  @ViewChild('activeTmpl', { static: true }) activeTmpl: TemplateRef<HTMLElement>;
  @ViewChild('actionTmpl', { static: true }) actionTmpl: TemplateRef<HTMLElement>;
  @ViewChild('myTable', { static: true }) table;

  readonly headerHeight = 40;
  readonly rowHeight = 50;
  public permission: any;
  public permissionObject = {
    check: null,
    delete: null,
    id: '',
    read: null,
    update: null,
    write: null,
  };

  public tagRuleId = 'link_tag_rule';
  constructor(
    private _store: Store<IAppState>,
    private _router: Router,
    private translate: TranslateService,
    private _tagService: RuleTagService,
    private alertService: AlertService,
  ) {  }

  public ngOnInit() {
    this._tagService.getSelectRuleTagList()
      .subscribe((res: any) => {
        if (res && res.tagsList) {
          this.request = true;
          const response = res.tagsList;
          if (this._page === 1) {
            this.tagData = response.content;
          } else if (this.tagData.length !== 0) {
            this.tagData = this.tagData.concat(response.content);
          }
          if (this.tagData && res.tagsList['totalFilterRecords'] === this.tagData.length) {
            this.request = false;
          }
          this.totalRecords = response['totalRecords'];
          this.loading = false;
        }
      });
    this._tagService.getSelectPermissionsData().subscribe((response: any) => {
      if (response) {
        this.permission = response.data.find(item => item.id === this.tagRuleId);
        this.permissionObject = this.permission;
      }
    });
    this.loadPage(this._page);
    this.tagList$ = this._tagService.getSelectRuleTagList();
    this.setColumns();
  }

  setColumns() {
    this.translate.get(['NAME', 'SERVICE', 'DESTINATIONS', 'STATUS', 'ACTIONS']).subscribe(res => {
      this.columns = [
        { name: res.NAME, prop: 'name' },
        { name: res.SERVICE, prop: 'serviceType', cellTemplate: this.serviceTempl },
        { name: res.DESTINATIONS, prop: 'tag', cellTemplate: this.destinationTmpl },
        { name: res.STATUS, prop: 'active', cellTemplate: this.activeTmpl },
        { name: res.ACTIONS, prop: 'action', cellTemplate: this.actionTmpl, sortable: false },
      ];
    });
  }

  public viewClick(keyData) {
    this.currentTag = keyData;
    this.open();
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
  public editRowData(row) {
    this._router.navigate(['routing/ruletags/edit', row.id]);
  }
  public updateRowData(row) {
    if (row.active === '1') {
      row.active = '0';
    } else {
      row.active = '1';
    }
    this._tagService.updateTag(row).subscribe(res => {
      if (res) {
        this.alertService.responseMessage(res);
      }
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

  private loadPage(pagenumber: number) {
    // set the loading flag, which serves two purposes:
    // 1) it prevents the same page from being loaded twice
    // 2) it enables display of the loading indicator
    this._store.dispatch(
      new GetNewTags({
        page: pagenumber,
        'page-size': '20',
      }),
    );
    this.request = false;
  }
}
