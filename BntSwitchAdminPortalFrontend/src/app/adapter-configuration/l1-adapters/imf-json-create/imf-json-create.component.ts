import { Component, OnInit, OnDestroy } from '@angular/core';
import { SubscribeService } from '@app/services/subscribe.services';
import { Subscription, Subject } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { IAppState } from '../../../store/state/app.state';
import {
  postImfJsonVersions,
  putImfJsonVersions,
  latestImfJsonVersions,
  selectNormalViewJson,
  getImfByIdJsonVersions,
} from '../../../store/selectors/imf-json.selector';
import {
  GetImfJson,
  CreateImfJson,
  UpdateImfJson,
  LatestImfJson,
  UserViewJson,
  GetImfJsonById,
  ClearState,
} from '../../../store/actions/imf-json.action';
import { selectViewSettingsList } from '@app/store/selectors/view-settings.selector';
import { TranslateService } from '@ngx-translate/core';
import { ViewSettingGetObject } from '@app/models/view-settings.interface';
import { takeUntil } from 'rxjs/operators';
import { Router, ActivatedRoute } from '@angular/router';
import { AlertService } from '@app/services/alert.service';
import { Utils } from 'src/utils';

export type TSaveMethods = {
  store;
  reducer;
  currentItem;
};
@Component({
  selector: 'app-imf-json-create',
  templateUrl: './imf-json-create.component.html',
  styleUrls: ['./imf-json-create.component.scss'],
})
export class ImfJsonCreateComponent implements OnInit, OnDestroy {
  public currentPagination = '20';
  public currentLang: string;
  public jsonData: any;
  public typeList: any = [];
  public normalData: any;
  public versionList: any = ['Version-1', 'Version-2', 'Version-3'];
  public currentItem: any = {
    id: null,
    name: '',
    version: null,
    imf: null,
  };
  public isSpinning = true;
  public isSpinningNormal = true;
  public saveMethods: TSaveMethods;
  public versionMethods: TSaveMethods;
  subscription = new Subscription();
  componetDestroyed = new Subject();
  imfStructureList: any = [];
  isUpdateTableVisible = false;
  shouldRevertChange: boolean;
  isSaveVisible = true;
  isSaveEnable = true;
  constructor(
    public alertService: AlertService,
    private _store: Store<IAppState>,
    private translate: TranslateService,
    public subscribeService: SubscribeService,
    private router: Router,
    private route: ActivatedRoute,
  ) {
    if (this.route.snapshot.paramMap.get('id')) {
      this._store.dispatch(new GetImfJsonById(this.route.snapshot.paramMap.get('id')));
    } else {
      this._store.dispatch(new LatestImfJson());
    }
    this.subscribeService.getButtonAction().subscribe(_ => (this.isSaveVisible = true));
    this.subscribeService.getSelectedIMF().subscribe(_ => (this.isSaveVisible = false));
  }

  /**
   * on init
   */
  ngOnInit() {
    this._store.pipe(takeUntil(this.componetDestroyed)).subscribe(res => {
      this.alertService.getIsBtnDisable().subscribe(_res => {
        if (_res) {
          this.isSaveEnable = _res.isEnable;
        }
      });
    });
    this.subscribeService.updateSelectedIMF(null);
    this._store
      .pipe(takeUntil(this.componetDestroyed), select(getImfByIdJsonVersions))
      .subscribe((response: any) => {
        if (response) {
          this.currentItem = Utils.newData(response.data);
          this.jsonData = JSON.parse(this.currentItem.imf);
          this.isSpinning = false;
          this.getJsonNormalView();
        }
      });

    this._store
      .pipe(takeUntil(this.componetDestroyed), select(selectViewSettingsList))
      .subscribe((response: ViewSettingGetObject) => {
        if (response) {
          this.currentPagination = response.data.settingDto.pagination;
          this.currentLang = response.data.settingDto.language;
          this.translate.setDefaultLang(this.currentLang);
        }
      });

    this._store
      .pipe(takeUntil(this.componetDestroyed), select(latestImfJsonVersions))
      .subscribe((response: any) => {
        if (response && response.data) {
          this.currentItem = response.data;
          this.jsonData = JSON.parse(this.currentItem.imf);
          this.getJsonNormalView();
          this.isSpinning = false;
        }
      });

    this._store
      .pipe(takeUntil(this.componetDestroyed), select(selectNormalViewJson))
      .subscribe((response: any) => {
        if (response) {
          this.normalData = response.data;
          this.isSpinningNormal = false;
        }
      });

    this._store
      .pipe(takeUntil(this.componetDestroyed), select(putImfJsonVersions))
      .subscribe((response: any) => {
        if (response) {
          if ((response.status == 'success')) {
            this._store.dispatch(new GetImfJson());
          }
        }
      });

    this._store
      .pipe(takeUntil(this.componetDestroyed), select(postImfJsonVersions))
      .subscribe((response: any) => {
        if (response) {
          if ((response.status == 'success')) {
            this.router.navigate(['/adapter-configuration/imf']);
            this._store.dispatch(new GetImfJson());
          }
        }
      });
  }

  /**
   * Changes version
   * @param event
   */
  changeVersion(event): void {
    this.jsonData = JSON.parse(event.imf);
  }

  /**
   * Gets json
   * @returns
   */
  getJson() {
    return JSON.parse(JSON.stringify(this.jsonData) || '');
  }

  /**
   * Keys imf json create component
   * @param obj
   * @returns
   */
  keys(obj) {
    return obj instanceof Object ? Object.keys(obj) : [];
  }

  /**
   * Recursives call
   * @param data
   * @returns
   */
  recursiveCall(data) {
    const key = this.keys(data);
    key.forEach(item => {
      switch (item) {
        case 'type':
          delete data[item];
          break;
        case 'isSensitive':
        case 'isHide':
        case 'isPersist':
        case 'alias':
          delete data[item];
          break;
        default:
          break;
      }
      if (this.getType(data[item]) === 'array') {
        data[item].forEach(el => {
          this.recursiveCall(el);
        });
      }
    });
    return data;
  }

  /**
   * Tabs view change
   * @param event
   */

  /**
   * Gets type
   * @param val
   * @returns
   */
  getType(val) {
    if (val === null) {
      return 'null';
    } else if (val === undefined) {
      return 'undefined';
    } else if (val.constructor === Array) {
      return 'array';
    } else if (val.constructor === Object) {
      return 'object';
    } else if (val.constructor === String) {
      return 'string';
    } else if (val.constructor === Number) {
      return 'number';
    } else if (val.constructor === Boolean) {
      return 'boolean';
    } else if (val.constructor === Function) {
      return 'function';
    } else {
      return 'object';
    }
  }

  /**
   * Gets json normal view
   * @returns
   */
  getJsonNormalView() {
    if (this.normalData) {
      return JSON.parse(this.normalData);
    }
  }

  /**
   * Versions imf json create component
   */
  public version(): void {
    this.currentItem.id = null;
    this.currentItem.name = null;
    this.currentItem.version = null;
    const currentItem = { ...this.currentItem };
    currentItem.imf = {
      attributes: {},
    };
    this.versionMethods = {
      reducer: CreateImfJson,
      store: this._store,
      currentItem,
    };
  }

  /**
   * Saves imf json create component
   */
  public save(): void {
    const currentItem = { ...this.currentItem };
    currentItem.imf = {
      attributes: {},
    };
    this.saveMethods = {
      reducer: UpdateImfJson,
      store: this._store,
      currentItem,
    };
  }

  /**
   * Reverts changes
   */
  public revertChanges(): void {
    this.shouldRevertChange = true;
    this.alertService.responseMessage({
      status: 'success',
      message: 'Changes Reverted Successfully',
    });
  }

  /**
   * Determines whether scroll on
   * @param div
   */
  OnScroll(div): void {
    const d1 = document.getElementById('scroll');
    d1.scrollTop = div.scrollTop;
  }

  /**
   * on destroy
   */
  ngOnDestroy() {
    this.componetDestroyed.next();
    this.componetDestroyed.complete();
    this.componetDestroyed.unsubscribe();
    this._store.dispatch(new ClearState());
    this.subscription.unsubscribe();
  }
}
