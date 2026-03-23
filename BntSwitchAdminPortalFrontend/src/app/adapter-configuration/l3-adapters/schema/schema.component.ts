import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  OnDestroy,
  SimpleChanges,
} from '@angular/core';
import { Subject } from 'rxjs';
import { Store } from '@ngrx/store';
import { IAppState } from '@app/store/state/app.state';
import { DraftSchema } from '@app/store/actions/l1-adapter.action';
import { TranslateService } from '@ngx-translate/core';
import { IHeaders } from '@app/models/l1-adapter.interface';
import { AdapterCommonService } from '@app/services/adapter-common.service';
import { SubscribeService } from '@app/services/subscribe.services';

@Component({
  selector: 'app-schema',
  templateUrl: './schema.component.html',
  styleUrls: ['./schema.component.scss'],
})
export class SchemaComponent implements OnInit, OnDestroy {
  @Input() public schemaById: any;
  @Input() public rows: any = [];
  @Input() public rowsResponse: any = [];
  public totals = 0;
  public resTotals = 0;
  public loading = true;
  public tabData = ['Request','Response'];
  public selectedTabIndex = 0;
  @Input() public widthConfig = [];
  @Input() public name: any;
  @Input() public template: any;
  @Input() public adapterData: any;
  @Input() public tabIndex: any;
  @Input() public schemaData: any;
  @Input() public readOnlyFlag = false;
  @Input() public isEdit = false;
  public schemaDraftResponse = true;
  public headers: IHeaders[] = [];
  @Output() public tabValue: EventEmitter<Object> = new EventEmitter<Object>();

  public componetDestroyed = new Subject();
  constructor(
    private _store: Store<IAppState>,
    private translate: TranslateService,
    private adapterCommonService: AdapterCommonService,
    private _subscribeService: SubscribeService
  ) {}

  /**
   * Renders item
   */
  public renderItem() {
    Object.assign(
      this,
      this.adapterCommonService.renderItem(
        this.schemaData,
        this.adapterData,
        this.rows,
        this.rowsResponse,
        this.totals,
        this.resTotals,
        this.loading,
      ),
    );
  }

  /**
   * on init
   */
  public ngOnInit() {
    this.generateTemplateBasedOnTempl();
    this._fetchHeaders();
  }

  /**
   * Generates template based on templ
   */
  generateTemplateBasedOnTempl() {
    if (this.adapterData) {
      this.renderItem();
    } else {
      this.rows = [];
      this.totals = 0;
      this.schemaData = null;
    }
  }

  public tabDataChange(tab, i) {
     this._subscribeService.setCurrentTabValue(tab);
      this.selectedTabIndex  = i;
  }

  ngOnChanges(changes: any): void {
    //Called before any other lifecycle hook. Use it to inject dependencies, but avoid any serious work here.
    //Add '${implements OnChanges}' to the class.
    if (!changes?.adapterData?.firstChange) {
      if (changes?.adapterData) {
        this.adapterData = changes?.adapterData.currentValue;
        this.generateTemplateBasedOnTempl();
      }
    }
  }

  /**
   * Fetchs headers
   */
  private _fetchHeaders(): void {
    this.adapterCommonService.fetchSchemaHeaders().subscribe(res => (this.headers = res));
  }

  /**
   * Tabs change
   */
  public tabChange() {
    if(this.adapterData.networkData.properties.multiPackager && (this.adapterData.schemaData.responsePackager == null || this.adapterData.schemaData.messageSchemaPackager == null)){
        this.adapterData.networkData.properties.samePackager = true;
    }
    this.saveData();
    this.tabValue.emit(1);
  }

  /**
   * Drafts schema
   */
  public draftSchema() {
    if(this.adapterData.networkData.properties.multiPackager && (this.adapterData.schemaData.responsePackager == null || this.adapterData.schemaData.messageSchemaPackager == null)){
        this.adapterData.networkData.properties.samePackager = true;
    }
    this.saveData();
    this._store.dispatch(new DraftSchema(this.adapterData));
  }

  /**
   * Drafts and next schema
   */
  public draftAndNextSchema() {
    if (this.schemaDraftResponse) {
      this.draftSchema();
    }
  }

  /**
   * Checks draft
   * @returns
   */
  public checkDraft() {
    if (this.name && this.name.length && this.template !== null) {
      return false;
    } else {
      return true;
    }
  }

  /**
   * Checks next
   * @returns
   */
  public checkNext() {
    if (this.name && this.name.length && this.template !== null) {
      return false;
    } else {
      return true;
    }
  }

  /**
   * Saves data
   */
  public saveData() {
    this.adapterCommonService.saveData(this.adapterData, this.template, this.name, this.tabIndex, this.isEdit);
  }

  /**
   * on destroy
   */
  ngOnDestroy(): void {
    this.componetDestroyed.next();
    this.componetDestroyed.complete();
    this.componetDestroyed.unsubscribe();
  }
}
