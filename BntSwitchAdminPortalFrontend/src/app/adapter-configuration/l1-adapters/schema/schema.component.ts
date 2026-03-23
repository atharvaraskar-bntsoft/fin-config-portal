import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  OnChanges,
} from '@angular/core';
import { IHeaders } from '@app/models/l1-adapter.interface';
import { ViewSettingGetObject } from '@app/models/view-settings.interface';
import { AdapterCommonService } from '@app/services/adapter-common.service';
import { SubscribeService } from '@app/services/subscribe.services';
import { selectViewSettingsList } from '@app/store/selectors/view-settings.selector';
import { select, Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ClearState, DraftSchema } from '../../../store/actions/l1-adapter.action';
import { selectSchemaDraft } from '../../../store/selectors/l1-adapter.selectors';
import { IAppState } from '../../../store/state/app.state';

@Component({
  selector: 'schema',
  templateUrl: './schema.component.html',
  styleUrls: ['./schema.component.scss'],
})
export class SchemaComponent implements OnInit, OnChanges {
  @Input() public schemaById: any;
  public rows: any = [];
  public rowsResponse: any = [];
  public totals = 0;
  public resTotals = 0;
  public reqPack = null;
  public resPack = null;
  public tabData = ['Request', 'Response'];
  public loading = true;
  @Input() public checkSingleProperties: boolean;
  @Input() public widthConfig: any;
  @Input() public name: any;
  @Input() public template: any;
  @Input() public adapterData: any;
  @Input() public tabIndex: any;
  @Input() public schemaData: any;
  @Input() public readOnlyFlag = false;
  @Input() public isEdit = false;
  public schemaDraftResponse = true;
  public selectedTabIndex = 0;
  public currentLang: string;
  @Output() public tabValue: EventEmitter<Object> = new EventEmitter<Object>();
  public soapData = [];
  public soapSchema = false;
  public componetDestroyed = new Subject();
  public headers: IHeaders[] = [];
  constructor(
    private _store: Store<IAppState>,
    private translate: TranslateService,
    private adapterCommonService: AdapterCommonService,
    private _subscribeService: SubscribeService,
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
    this._store
      .pipe(takeUntil(this.componetDestroyed), select(selectSchemaDraft))
      .subscribe((response: any) => {
        if (response) {
          if (response.status === 'success') {
            this.schemaDraftResponse = false;
          }
        }
      });
    this._store.pipe(select(selectViewSettingsList)).subscribe((response: ViewSettingGetObject) => {
      if (response) {
        this.currentLang = response.data.settingDto.language;
        this.translate.setDefaultLang(this.currentLang);
      }
    });
    this.generateTemplateBasedOnTempl();
    this.genrateTableHeaders();
  }

  /**
   * Generates template based on templ
   */
  generateTemplateBasedOnTempl() {
    if (this.adapterData) {
      if (this.template.value.indexOf('SOAP') !== -1) {
        const data = JSON.parse(this.adapterData.schemaData.schema);
        const id = Object.keys(data);
        this.schemaData = this.adapterData.schemaData;
        this.soapData = id && id.map(ele => ({ id: ele, value: data[ele] }));
        this.soapSchema = true;
        this.loading = false;
        this.totals = this.soapData.length;
      } else {
        this.renderItem();
      }
    } else {
      this.rows = [];
      this.totals = 0;
      this.schemaData = null;
    }
  }

  public tabDataChange(tab, i) {
    this._subscribeService.setCurrentTabValue(tab);
    this.selectedTabIndex = i;
  }

  /**
   * Genrates table headers
   */
  genrateTableHeaders() {
    /**
     * Get All the Table Headers
     */
    this.adapterCommonService
      .fetchSchemaHeaders(this.soapSchema)
      .subscribe(res => (this.headers = res));
  }

  /**
   * on changes
   * @param changes
   */
  ngOnChanges(changes: any): void {
    if (changes?.template?.firstChange) {
      this.template = changes?.template?.currentValue;
      this.soapSchema = this.template?.value.indexOf('SOAP') !== -1 ? true : false;
    }
    if (!changes?.adapterData?.firstChange) {
      if (changes?.adapterData) {
        this.adapterData = changes?.adapterData?.currentValue;
        this.genrateTableHeaders();
        this.generateTemplateBasedOnTempl();
      }
    }
  }

  updatePackagerValue() {
    if (this.adapterData.schemaData.responsePackager) {
      this.reqPack = this.adapterData.schemaData.responsePackager;
    }
    if (this.adapterData.schemaData.messageSchemaPackager) {
      this.resPack = this.adapterData.schemaData.messageSchemaPackager;
    }
    if (
      this.adapterData.networkData.properties.multiPackager &&
      (this.reqPack == null || this.resPack == null)
    ) {
      this.adapterData.networkData.properties.samePackager = true;
    } else {
      this.adapterData.networkData.properties.samePackager = false;
    }
  }

  /**
   * Tabs change
   */
  public tabChange() {
    this.updatePackagerValue();
    this.saveData();
    this.tabValue.emit(1);
  }

  /**
   * Drafts schema
   */
  public draftSchema() {
    this.updatePackagerValue();
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
   * Saves data
   */
  public saveData() {
    this.adapterCommonService.saveData(
      this.adapterData,
      this.template,
      this.name,
      this.tabIndex,
      this.isEdit,
    );
  }

  /**
   * on destroy
   */
  ngOnDestroy(): void {
    this.componetDestroyed.next();
    this.componetDestroyed.complete();
    this.componetDestroyed.unsubscribe();
    this.adapterData = null;
    this.name = null;
    this.template = null;
    this._store.dispatch(new ClearState());
  }
}
