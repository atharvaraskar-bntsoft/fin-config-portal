import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { selectJson } from '../../../store/selectors/transaction-log.selector';
import { GetJson } from '../../../store/actions/transaction-log.action';
import { Store, select } from '@ngrx/store';
import { IAppState } from '../../../store/state/app.state';
import { Utils } from './../../../../utils';
import { ClipboardService } from 'ngx-clipboard';
@Component({
  selector: 'app-view-json',
  templateUrl: './view-json.component.html',
  styleUrls: ['./view-json.component.css'],
})
export class ViewJsonComponent implements OnInit {
  @Input() visibleJson = false;
  @Output() closeDrawer = new EventEmitter<boolean>();
  @Output() update: EventEmitter<any> = new EventEmitter();
  @Input() keyData: any;
  title = 'Json';
  public loading = false;
  maskJSON: any;
  public copied = false;
  public visibleAnimate = false;
  public visible = false;

  constructor(private _store: Store<IAppState>, private _clipboardService: ClipboardService) {}

  ngOnInit(): void {
    console.log('KeyData' + this.keyData || JSON);
    this._store.dispatch(new GetJson(this.keyData));
    this.loading = true;
    this._store.pipe(select(selectJson)).subscribe(response => {
      if (response) {
        this.keyData = response;
        console.log('keydata', this.keyData);
        const blackList = ['account_number'];
        const getMaskedParams = Utils.maskJson(blackList, { replacement: 'xxxxxxxx' });
        this.maskJSON = getMaskedParams(JSON.parse(this.keyData.jsonData));
        this.open();
        this.loading = false;
      }
    });
  }
  copyToClipboard(item, event) {
    this.copied = true;
    this._clipboardService.copyFromContent(item);
    setTimeout(() => {
      this.copied = false;
    }, 1000);
  }
  public close(): void {
    document.body.style.overflow = 'auto';
    this.visibleAnimate = false;
    setTimeout(() => (this.visible = false), 100);
  }
  public open(): void {
    document.body.style.overflow = 'hidden';
    this.visible = true;
    setTimeout(() => (this.visibleAnimate = true), 200);
  }
  closeD(): void {
    this.visibleJson = false;
    this.closeDrawer.emit(this.visibleJson);
  }
}
