import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { IAppState } from '@app/store/state/app.state';
import { TranslateService } from '@ngx-translate/core';
import { Router, ActivatedRoute } from '@angular/router';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { GetScheme, GetSchemeImfMapper } from '@app/store/actions/scheme-imf-mapper.action';
import {
  selectScheme,
  selectSchemeImfMapperList,
} from '@app/store/selectors/scheme-imf-mapper.selectors';

@Component({
  selector: 'scheme-imf-mapping',
  templateUrl: './scheme-imf-mapping.component.html',
  // tslint:disable-next-line: object-literal-sort-keys
  styleUrls: ['./scheme-imf-mapping.component.scss'],
})
export class SchemeImfMappingComponent implements OnInit {
  public currentPagination = '20';
  public currentLang: string;
  public columns: any;
  public rows: any;
  public rowData: any;
  public loading = true;
  public permission: any;
  private _page = 1;
  public totalRecords: Number;
  readonly headerHeight = 40;
  readonly rowHeight = 75;
  readonly pageLimit = 15;

  @ViewChild('imf', { static: true }) imf: TemplateRef<any>;
  public schemeList: any;
  public filter: any = {};

  public rowNetwork: any = [];
  request: any;
  componetDestroyed = new Subject();
  public isVisible = false;
  public imfTitle;
  public imfData;
  constructor(
    private _store: Store<IAppState>,
    private _router: Router,
    private _route: ActivatedRoute,
    private translate: TranslateService,
  ) {
    
  }

  ngOnInit() {
    
    this.translate
      .get(['TEMPLATE', 'FIELD ID', 'REQUEST IMF', 'RESPONSE IMF', 'ACTION'])
      .subscribe(translation => {
        this.columns = [
          { prop: 'Template', name: translation.ID },
          { prop: 'Field Id', name: translation.NAME },
          { prop: 'Request IMF', name: translation.FIELD },
          { prop: 'Response IMF', name: translation.VERSION },
          { prop: 'Action', name: translation.IMF, cellTemplate: this.imf },
        ];
      });
    this.rowNetwork.push({
      id: 1,
      name: 'Test1',
      field: 'HEADER LENGTH1',
      version: 4,
    });
    this.rowNetwork.push({
      id: 2,
      name: 'Test2',
      field: 'HEADER LENGTH2',
      version: 4,
    });
    this.rowNetwork.push({
      id: 3,
      name: 'Test3',
      field: 'HEADER LENGTH3',
      version: 4,
    });
    this.rowNetwork.push({
      id: 4,
      name: 'Test4',
      field: 'HEADER LENGTH4',
      version: 4,
    });
    this.loading = false;

    this.filter.scheme = 'abc';
  }

  viewClick(keyData) {
    // this.jsonObj = JSON.parse(keyData.imf);
    // this.open();
  }

  public getFilterScheme(e) {}
  public editImf(data) {
    localStorage.setItem('ImfData', JSON.stringify(data));
    this._router.navigate([
      'adapter-configuration/scheme-imf-mapping',
      data.messageStandard.id,
      parseInt(data.fieldId),
    ]);
  }

  public openIMFPopup(data, type) {
    this.isVisible = true;
    if (type === 'req') {
      this.imfTitle = 'Request IMF Expression Json Details';
      this.imfData = data.requestImfExpression;
    } else {
      this.imfTitle = 'Response IMF Expression Json Details';
      this.imfData = data.responseImfExpression;
    }
  }
  public onScroll(offsetY: any) {
    // jQuery('.datatable-body').scroll(() => {
    //   if (jQuery('.datatable-body').scrollTop()
    //     + jQuery('.datatable-body').height()
    //     > jQuery(document).height() - 100) {
    //     if (this.request) {
    //       this._page = ++this._page;
    //       this.loadPage(this._page);
    //     }
    //   }
    // });
  }
  public cleardata() {
    localStorage.setItem('ImfData', '');
  }
}
