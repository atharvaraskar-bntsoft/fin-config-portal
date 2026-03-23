import { GetBinMaster, GetBinTableAll } from './../../../store/actions/bin-table.action';
import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ViewSettingGetObject } from '@app/models/view-settings.interface';
import {
  GetAccountType,
  GetAccountTypeDetails,
  GetBinMasterAll,
} from '@app/store/actions/bin-table.action';
import {
  selectAccountType,
  selectAccountTypeDetails,
  selectBinMaster,
  selectBinMasterAll,
  selectBinTableAll,
} from '@app/store/selectors/bin-table.selector';
import { selectViewSettingsList } from '@app/store/selectors/view-settings.selector';
import { IAppState } from '@app/store/state/app.state';
import { select, Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Location } from '@angular/common';

declare var jQuery: any;

@Component({
  selector: 'app-account-type-details',
  templateUrl: './account-type-details.component.html',
  //   styleUrls: ['./account-type-details.component.css'],
})
export class AccountTypeDetailsComponent implements OnInit {
  public rows: any;
  public columns: any;
  public attributeData: any;
  public budgetData: any;
  public fileNames: any;
  readonly headerHeight = 40;
  public currentLang: string;
  readonly rowHeight = 75;
  readonly pageLimit = 15;
  private _page = 1;
  public request: Boolean = true;
  public loading = true;
  public currentPagination = '20';
  public accountTypeData: Array<any> = [];
  public totalRecords: Number;
  private _filters: Array<any> = [];
  public id: string;
  public isAttributesVisible = false;
  public resetButtonFlag: Boolean = true;
  public isBudgetVisible = false;
  componetDestroyed = new Subject();
  @ViewChild('linkedTransactionTypes', { static: true }) linkedTransactionTypes: TemplateRef<any>;
  @ViewChild('budgetPeriods', { static: true }) budgetPeriods: TemplateRef<any>;
  selectedId: number;
  tableHeaders: string[] = ['Code', 'Name'];

  constructor(
    private _store: Store<IAppState>,
    private _route: Router,
    private _router: ActivatedRoute,
    private translate: TranslateService,
    public location: Location,
  ) {  }

  ngOnInit(): void {
    this.id = this._router.snapshot.paramMap.get('id');
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
      .pipe(takeUntil(this.componetDestroyed), select(selectAccountTypeDetails))
      .subscribe((response: any) => {
        if (response) {
          this.request = true;
          if (this._page === 1) {
            this.accountTypeData = response.BinAccountTypeList;
          } else if (this.accountTypeData.length > 0) {
            this.accountTypeData = this.accountTypeData.concat(response.BinAccountTypeList);
          }
          if (response['total-filtered-record'] === this.accountTypeData.length) {
            this.request = false;
          }
          this.totalRecords = response['total-record'];
          this.loading = false;
        }
      });
    this._store.dispatch(new GetBinTableAll());
    this._store
      .pipe(takeUntil(this.componetDestroyed), select(selectBinTableAll))
      .subscribe((response: any) => {
        if (response) {
          this.fileNames = response.data;
          if (this.id) {
            this.selectedId = parseInt(this.id);
          }
        }
      });
    this.translate
      .get([
        'ACCOUNT_NAME',
        'TYPE_CODE',
        'ALLOWED_TRANSACTION',
        'AUTHENTICATION_METHOD',
        'BUDGET_ALLOWED',
        'DISPLAY_PROMPT',
        'MESSAGE_PROTOCAOL',
        'MINIMUM_AMMOUNT',
        'LINKED_TRANSACTION_TYPE',
      ])
      .subscribe(translation => {
        this.columns = [
          { prop: 'binAccountTypeMasterId.accountName', name: translation.ACCOUNT_NAME },
          { prop: 'binAccountTypeMasterId.accountTypeCode', name: translation.TYPE_CODE },
          //   {
          //     prop: 'binAccountTypeMasterId.allowManualTransaction',
          //     name: translation.ALLOWED_TRANSACTION,
          //   },
          {
            prop: 'binAccountTypeMasterId.authenticationMethod',
            name: translation.AUTHENTICATION_METHOD,
          },
          //   { prop: 'binAccountTypeMasterId.budgetAllowed', name: translation.BUDGET_ALLOWED },
          {
            prop: 'binAccountTypeMasterId.displayPrompt',
            name: translation.DISPLAY_PROMPT,
          },
          {
            prop: 'binAccountTypeMasterId.messageProtocolVariation',
            name: translation.MESSAGE_PROTOCAOL,
          },
          //   { prop: 'binAccountTypeMasterId.minimumBudgetAmount', name: translation.MINIMUM_AMMOUNT },
          {
            prop: 'linkedTransactionTypes',
            name: translation.LINKED_TRANSACTION_TYPE,
            cellTemplate: this.linkedTransactionTypes,
          },
          {
            prop: 'budgetPeriods',
            name: translation.BUDGET_PERIODS,
            cellTemplate: this.budgetPeriods,
          },
        ];
      });
  }

  public openModal(row) {
    this.isAttributesVisible = true;
    this.attributeData = row.linkedTransactionTypes;
  }

  public openBudget(row) {
    this.isBudgetVisible = true;
    this.budgetData = row.binAccountTypeMasterId?.budgetPeriods.budgetPeriod;
  }

  public closeBudget() {
    this.isBudgetVisible = false;
  }

  public closeModal() {
    this.isAttributesVisible = false;
  }

  public keyName(data) {
    return ++data;
  }

  private _transFilters(): String {
    return Object.keys(this._filters)
      .map(item => {
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
          THis.loadPage(THis._page);
        }
      }
    });
  }

  private loadPage(pagenumber: Number) {
    // set the loading flag, which serves two purposes:
    // 1) it prevents the same page from being loaded twice
    // 2) it enables display of the loading indicator
    const reqObj = {
      page: pagenumber,
      'page-size': this.currentPagination,
    };
    if (this.id) {
      reqObj['id'] = this.id;
    }
    this._store.dispatch(new GetAccountTypeDetails({ ...reqObj }));
    this.request = false;
  }

  resetFilter() {
    this.resetButtonFlag = false;
    this.id = null;
    this.selectedId = null;
    this.loadPage(this._page);
  }

  binFileChange($event) {
    this.resetButtonFlag = true;
    this.id = $event && $event.id;
    this.loadPage(this._page);
  }

  ngOnDestroy(): void {
    this.componetDestroyed.next();
    this.componetDestroyed.complete();
    this.componetDestroyed.unsubscribe();
  }
}
