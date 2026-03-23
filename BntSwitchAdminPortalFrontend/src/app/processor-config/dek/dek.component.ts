import { selectGetDek } from '@app/store/selectors/dek.selector';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ViewSettingGetObject } from '@app/models/view-settings.interface';
import { ClearState, GetDek } from '@app/store/actions/dek.action';
import { selectViewSettingsList } from '@app/store/selectors/view-settings.selector';
import { IAppState } from '@app/store/state/app.state';
import { select, Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { selectPermissionsData } from '@app/store/selectors/permission.selectors';
import { DekService } from '@app/services/dek.service';

@Component({
  selector: 'app-dek',
  templateUrl: './dek.component.html',
  styleUrls: ['./dek.component.css'],
})
export class DekComponent implements OnInit {
  public loading = true;
  public rows: any;
  public columns: any;
  readonly headerHeight = 40;
  readonly rowHeight = 75;
  public request: Boolean = true;
  readonly pageLimit = 15;
  public currentPagination = '20';
  private _page = 1;
  public dekData: any;
  public currentLang: string;
  componetDestroyed = new Subject();
  public permission: any;
  public permissionObject = {
    check: null,
    delete: null,
    id: '',
    read: null,
    update: null,
    write: null,
  };
  public dekId = 'link_dek';

  constructor(
    private _store: Store<IAppState>,
    private _router: Router,
    private translate: TranslateService,
    private _dekService: DekService,
  ) {
    this._store
      .pipe(takeUntil(this.componetDestroyed), select(selectViewSettingsList))
      .subscribe((response: ViewSettingGetObject) => {
        if (response) {
          this.currentPagination = response.data.settingDto.pagination;
          this.currentLang = response.data.settingDto.language;
          translate.setDefaultLang(this.currentLang);
          this.loadPage(this._page);
        }
      });
    this._store.pipe(select(selectPermissionsData)).subscribe((response: any) => {
      if (response) {
        this.permission = response.data.find(item => item.id === this.dekId);
        this.permissionObject = this.permission;
      }
    });
    this._store
      .pipe(takeUntil(this.componetDestroyed), select(selectGetDek))
      .subscribe((data: any) => {
        if (data) {
          this.dekData = data.data;
        }
      });
  }

  ngOnInit(): void {}
  private loadPage(pagenumber: Number) {
    // set the loading flag, which serves two purposes:
    // 1) it prevents the same page from being loaded twice
    // 2) it enables display of the loading indicator
    this._store.dispatch(
      new GetDek({
        page: pagenumber,
        'page-size': this.currentPagination,
      }),
    );
    this.request = false;
  }

  ngOnDestroy() {
    this.componetDestroyed.next();
    this._store.dispatch(new ClearState());
    this.componetDestroyed.unsubscribe();
  }
}
