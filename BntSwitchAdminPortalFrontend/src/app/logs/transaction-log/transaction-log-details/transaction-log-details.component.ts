import { Component, OnInit, OnDestroy, Input, EventEmitter, Output } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { IAppState } from '@app/store/state/app.state';
import {
  GetTransactionById,
  PostTransactionLogReview,
  ClearState,
} from '@app/store/actions/transaction-log.action';
import {
  selectTransactionLogsById,
  postTransactionLogsReview,
} from '@app/store/selectors/transaction-log.selector';
import { selectViewSettingsList } from '@app/store/selectors/view-settings.selector';
import { TranslateService } from '@ngx-translate/core';
import { ViewSettingGetObject } from '@app/models/view-settings.interface';
import { uniq } from 'underscore';

@Component({
  selector: 'app-transaction-log-details',
  styleUrls: ['./transaction-log-details.component.scss'],
  templateUrl: './transaction-log-details.component.html',
})
export class TransactionLogDetailsComponent implements OnInit, OnDestroy {
  @Input() isvisibleview = false;
  @Output() closeDrawer = new EventEmitter<boolean>();
  @Output() update: EventEmitter<any> = new EventEmitter();
  @Input() idView :any;
  title="Logs Details"
  public loading = false;
  public currentLang: string;
  public Labels: any = {};
  public rows: any = {};
  public id: string;
  public destinationFlag = false;
  public flagArr: any;
  public loader = true;

  constructor(private _store: Store<IAppState>, private translate: TranslateService) {}

  ngOnInit() {
    this._store.pipe(select(selectTransactionLogsById)).subscribe((response: any) => {
      if (response) {
        this._transformData(response.additionalParamsRequest);
        this._transformData(response.additionalParamsResponse);
        this._transformData(response.additionalFields);
        response.operations.forEach(ele => {
          this._transformData(ele.request);
          this._transformData(ele.response);
        });
        this.rows = JSON.parse(JSON.stringify(response));
        this.rows.additionalParamsRequest.third_column = this.manipulateThirdColumnData(response.additionalParamsRequest.third_column);
        this.rows.additionalParamsResponse.third_column = this.manipulateThirdColumnData(response.additionalParamsResponse.third_column);
        this.rows.additionalFields.third_column = this.manipulateThirdColumnData(response.additionalFields.third_column);
        
        this.flagArr = this.dataTransform(response);
        this.rows ? (this.loader = false) : (this.loader = true);
        this.loading = false;
      }
    });
    this._store.pipe(select(selectViewSettingsList)).subscribe((response: ViewSettingGetObject) => {
      if (response) {
        this.currentLang = response.data.settingDto.language;
        this.translate.setDefaultLang(this.currentLang);
              }
    });
    this.loading = true;
    this._store.dispatch(new GetTransactionById(this.idView));
  }

  manipulateThirdColumnData(data): any {
    console.log(data);
    let uniqueLabels = [];
    data && data.forEach((column) => {
      uniqueLabels.push(column.label);
    })
    uniqueLabels = uniq(uniqueLabels);
    uniqueLabels = uniqueLabels.map((label) => {
      const obj = { title: label, value: [] };
      const labelFilteredArr = data.filter((labelObj) => labelObj.label === label);
      obj.value = labelFilteredArr
      return obj;
    })
    return uniqueLabels;

  }
close(): void{
    this.isvisibleview=false;
    this.closeDrawer.emit(this.isvisibleview);
    
  }
  public setFlag() {
    localStorage.setItem('detailPage', 'yes');
  }

  private _transformData(data) {
    Object.keys(data).forEach(ele => {
      if (data[ele] && data[ele].length) {
        data[ele];
}
    });
  }

  updateAccountNumber(data) {
    data.forEach(item => {
      if (item.key === 'account_number') {
        item.value =
          item.value.slice(0, 6) +
          'xxxxxxxxx' +
          item.value.slice(item.value.length - 4, item.value.length);
      }
    });
  }

  public onShowDestination(value) {
    this.rows.operations.map(item => {
      if (item.name === value.name) {
        item.flag = !item.flag;
      }
      return item;
    });
  }

  public dataTransform(data) {
    const flagArr = data.operations.map(item => {
      item['flag'] = false;
      return item;
    });
    return flagArr;
  }

  public setData(data) {
    const obj = {
      forReview: { forReview: data },
      id: this.rows.txnId,
    };
    obj.forReview.forReview = !data;
    this._store.dispatch(new PostTransactionLogReview(obj));
    this._store.pipe(select(postTransactionLogsReview)).subscribe(response => {
      if (response) {
        if (response.status === 'success') {
          this._store.dispatch(new ClearState());
          this._store.dispatch(new GetTransactionById(this.idView));
        }
      }
    });
  }

  public getLabel(data) {
    if (data.path.includes('message_exchange.request_message.epp_serial_number')) {
      return 'Request ' + data.text;
    } else if (data.path.includes('message_exchange.response_message.epp_serial_number')) {
      return 'Response ' + data.text;
    } else {
      return data.text;
    }
  }

  getMilliseconds(date) {
    const d = new Date(date);
    return d.getTime();
  }

  ngOnDestroy() {
    this._store.dispatch(new ClearState());
  }
}
