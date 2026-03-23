import {
  Component,
  OnInit,
  ViewChild,
  TemplateRef,
  OnDestroy,
  ChangeDetectorRef,
} from '@angular/core';
import { select, Store } from '@ngrx/store';
import { IAppState } from '../../store/state/app.state';
import { GetAdapterById, GetL1Adapter, ClearState } from '../../store/actions/l1-adapter.action';
import {
  selectFormat,
  selectL1AdapterById,
  selectL1AdapterData,
} from '../../store/selectors/l1-adapter.selectors';
import { takeUntil } from 'rxjs/operators';
import { Subject, Observable, combineLatest } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { getIfmList } from '../../store/selectors/imf-json.selector';
import { GetImfJsonView } from '../../store/actions/imf-json.action';
import { ViewSettingGetObject } from '@app/models/view-settings.interface';
import { selectViewSettingsList } from '@app/store/selectors/view-settings.selector';
import { TranslateService } from '@ngx-translate/core';
import { L1AdapterService } from '@app/services/l1-adapter.service';
import { SubscribeService } from '@app/services/subscribe.services';
import { GetIMF } from '@app/store/actions/scheme-imf-mapper.action';
import { ImfJsonService } from '@app/services/imf-json.service';
@Component({
  selector: 'app-l1-adapters',
  styleUrls: ['./l1-adapters.component.scss'],
  templateUrl: './l1-adapters.component.html',
})
export class L1AdaptersComponent implements OnInit, OnDestroy {
  public currentLang: string;
  public loading = true;
  public adapterData: any;
  public schemaById: any;
  public isEdit = true;
  @ViewChild('newaction', { static: true }) newaction: TemplateRef<any>;
  public name: any = '';
  public componetDestroyed = new Subject();
  public templateValueList: any;
  public formatValueList: any;
  public template: any;
  public tabData: string = 'Request';
  public format: any;
  public imfId: any;
  readonly widthConfig = ['200px', '200px', null];
  readonly widthConfiTransformRes = ['400px', '200px', '400px', '200px'];
  public dataObject: any;
  public id: any;
  public editData: any;
  public combinedState$ = new Observable();
  public tabIndex = 0;
  public showTransform = false;
  public activeTab = 0;
  public networkTabDisable = true;
  public transformTabDisable = true;
  public responseTabDisable = true;
  public takeWhile = true;
  public editMessage = false;
  public pvalidationTabDisable = true;
  public beansTabDisable = true;
  public packagerLoader = false;
  public ShowPostvalidationTab = false;
  public getIfmList: any = [];
  public showSoapTransform;
  public fvalid: any = false;
  public isJson = false;
  public = false;
  public isHttp_urlencoded = false;
  public isXmlHttp = false;
  public readOnlyFlag = false;
  public beanTabDisable = false;
  public singleProperty: boolean = false;
  public checkSingleProperties: boolean;
  public multiPackager: boolean = false;
  constructor(
    private cdr: ChangeDetectorRef,
    private _store: Store<IAppState>,
    private route: ActivatedRoute,
    private translate: TranslateService,
    private _l1AdapterService: L1AdapterService,
    private subscribeService: SubscribeService,
    public _imfjsonService: ImfJsonService,
  ) {}

  ngAfterViewChecked() {
    //your code to update the model
    this.cdr.detectChanges();
  }

  public loadData() {
    this.getAdapterDataById();
    this.getViewSettings();
  }

  getAdapterDataById() {
    this._store
      .pipe(takeUntil(this.componetDestroyed), select(selectL1AdapterById))
      .subscribe((response: any) => {
        if (response && response.data) {
          this.adapterData = response.data;
          this.beanTabDisable = response.data.beanTabDisable;
          this.loading = false;
          if (this.adapterData.networkData.properties !== null) {
            this.multiPackager = this.adapterData.networkData.properties?.multiPackager
              ? this.adapterData.networkData.properties?.multiPackager
              : false;
            this.adapterData.networkData.properties.multiPackager = this.multiPackager;
            this.singleProperty = this.adapterData.networkData.properties?.singleProperty
              ? this.adapterData.networkData.properties?.singleProperty
              : false;
            this.adapterData.networkData.properties.singleProperty = this.singleProperty;
          }
          this.imfId = this.adapterData.imfId ? this.adapterData.imfId : null;
          this.getIfmListDataAndmanipulate();
          this.name = this.adapterData.masterData.adapterDto.name
            ? this.adapterData.masterData.adapterDto.name
            : null;
          if (
            this.adapterData.masterData.adapterDto.standardMessageSpecification.messageStandard !=
              null &&
            this.templateValueList &&
            this.templateValueList.length > 0
          ) {
            this.templateValueList.forEach(ele => {
              if (
                ele.id ===
                this.adapterData.masterData.adapterDto.standardMessageSpecification.messageStandard
                  .id
              ) {
                this.template = ele;
              }
            });
          }
          this.checkJsonAdaptor();
        }
      });
  }

  getIfmListDataAndmanipulate() {
    this._imfjsonService
      .getImfList()
      .pipe(takeUntil(this.componetDestroyed))
      .subscribe((response: any) => {
        if (response) {
          let IfmList = response.data.imfStructureList;
          IfmList = IfmList.filter(item => item.version !== 0);
          this.getIfmList = [];
          const size = 2;
          const slicedImfList = IfmList.slice(0, size);
          this.getIfmList = slicedImfList.map(item => {
            return {
              id: item.id,
              name: item.name,
              version: item.version,
            };
          });
          if (this.getIfmList.findIndex(imf => imf.id === this.imfId.id) === -1) {
            this.getIfmList.push(this.imfId);
          }
        }
      });
  }

  getViewSettings() {
    this._store.pipe(select(selectViewSettingsList)).subscribe((response: ViewSettingGetObject) => {
      if (response) {
        this.currentLang = response.data.settingDto.language;
        this.translate.setDefaultLang(this.currentLang);
      }
    });
  }

  public ngOnInit() {
    this.subscribeService.getCurrentTabValue().subscribe(res => {
      if (res) {
        this.tabData = res;
      }
    });
    this.subscribeService.getApi().subscribe(res => {
      if (res) {
        this.networkTabDisable = true;
        this.transformTabDisable = true;
      }
    });

    // updated code
    this.route?.params?.pipe(takeUntil(this.componetDestroyed)).subscribe(params => {
      if ('view' in params) {
        this.readOnlyFlag = true;
      }
      if (params.adapterId) {
        this.id = params.adapterId;
        this._store.dispatch(new GetAdapterById(this.id));
        this.editMessage = true;
        this.networkTabDisable = true;
      } else {
        this.id = null;
        this.adapterData = null;
        this.isEdit = false;
        this.name = null;
        this.template = null;
        this.imfId = null;
      }
      // In a real app: dispatch action to load the details here.
    });
    this.combinedState$ = combineLatest(
      this._store.pipe(takeUntil(this.componetDestroyed), select(selectFormat)),
    );
    this._l1AdapterService
      .getTemplates()
      .pipe(takeUntil(this.componetDestroyed))
      .subscribe((res: any) => {
        this.templateValueList = res.data;
        this.loadData();
      });

    this.combinedState$.pipe(takeUntil(this.componetDestroyed)).subscribe(value => {
      this.formatValueList = value[0];
      this.loading = false;
    });
    if (!this.id) {
      this._store
        .pipe(takeUntil(this.componetDestroyed), select(selectL1AdapterData))
        .subscribe((response: any) => {
          if (response) {
            this.adapterData = response;
            this.takeWhile = false;
            this.name = !this.name ? this.adapterData.masterData.adapterDto.name : this.name;
            if (
              this.adapterData.masterData.adapterDto.standardMessageSpecification.messageStandard !=
              null
            ) {
              this.templateValueList.forEach(ele => {
                if (
                  ele.id ===
                  this.adapterData.masterData.adapterDto.standardMessageSpecification
                    .messageStandard.id
                ) {
                  this.template = ele;
                }
              });
            }
            this.imfId = this.adapterData.imfId ? this.adapterData.imfId : null;
            this.getIfmListDataAndmanipulate();
            this.checkJsonAdaptor();
          }
        });
    }
  }
  
  

  getTemplateListAndLoadData() {
    this._l1AdapterService
      .getTemplates()
      .pipe(takeUntil(this.componetDestroyed))
      .subscribe((res: any) => {
        this.templateValueList = res.data;
        this.loadData();
      });
  }

  checkJsonAdaptor() {
    this.isJson =
      this.template && this.template.value ? this.template.value.includes('JSON') : false;
    this.isHttp_urlencoded =
      this.template && this.template.value
        ? this.template.value.includes('HTTP-URLENCODED')
        : false;
    this.isXmlHttp =
      this.template && this.template.value ? this.template.value.includes('XML-OVER-HTTP') : false;
  }

  public selectTransform() {
    this.activeTab = 2;
    this.showTransform = true;
    if (this.template.value.indexOf('SOAP') !== -1) {
      this.showSoapTransform = true;
    } else {
      this.showSoapTransform = false;
    }
  }

  checkSingleProperty(data) {
    this.adapterData.networkData.properties.singleProperty = data;
    this.singleProperty = data;
  }

  changeMultiPackager(data) {
    this.adapterData.networkData.properties.multiPackager = this.multiPackager;
    this.multiPackager = data;
  }

  public changeTemplate(value: any) {
    this.name = value['name'];
    this.template = value['templateData'];
    this.imfId = value['imfId'];
    if (this.template !== null) {
      const data = {
        template: this.template.id,
      };
      setTimeout(() => {
        if (value.isFromImfSelection && this.imfId && this.imfId.id) {
          this._store.dispatch(new GetIMF(this.imfId.id));
        } else {
          this._store.dispatch(new GetL1Adapter(data));
        }
      }, 500);
    }
  }

  public loaderValue(value: any) {
    this.loading = value;
  }

  public schmaTab() {
    this.activeTab = 0;
  }

  public networkTab() {
    this.networkTabHandling();
    this.activeTab = 1;
  }

  public responseTab() {
    this.activeTab = 3;
  }

  public tabValue(value: any) {
    if (value === 1) {
      this.networkTabHandling();
    } else if (value === 2) {
      this.showTransform = true;
      this.transformTabDisable = false;
      this.responseTabDisable = true;
      this.networkTabDisable = false;
      if (this.template.value.indexOf('SOAP') !== -1) {
        this.showSoapTransform = true;
      } else {
        this.showSoapTransform = false;
      }
    } else if (value === 3) {
      this.networkTabDisable = false;
      this.transformTabDisable = false;
      this.responseTabDisable = false;
      this.pvalidationTabDisable = true;
    } else if (value === 4) {
      this.networkTabDisable = false;
      this.transformTabDisable = false;
      this.responseTabDisable = false;
      this.pvalidationTabDisable = false;
      this.ShowPostvalidationTab = true;
    }
    this.isEdit = true;
    this.activeTab = value;
  }

  public formValidate(value: any) {
    if (value == false) {
      this.fvalid = false;
    } else if (value == true) {
      this.fvalid = true;
    }
  }

  private networkTabHandling() {
    this.networkTabDisable = true;
    this.transformTabDisable = true;
    this.responseTabDisable = true;
    this.pvalidationTabDisable = true;
  }

  public tabDisable(value) {
    this.transformTabDisable = value;
    if (value) {
      this.responseTabDisable = value;
    }
    if (this.adapterData.transformData.requestMapping) {
      this.responseTabDisable = false;
    }
  }
  public changeAdapterData(value) {
    this.adapterData = value;
  }
  public ngOnDestroy(): void {
    // Called once, before the instance is destroyed.
    // Add 'implements OnDestroy' to the class.
    this.adapterData = null;
    this.name = null;
    this.template = null;
    this.imfId = null;
    this.componetDestroyed.next();
    this.componetDestroyed.complete();
    this.componetDestroyed.unsubscribe();
    this._store.dispatch(new ClearState());
  }
}
