import { Component,Input, OnInit} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { IAppState } from '@app/store/state/app.state';
import { GetTemplates, GetFormat , GetMessageContextList} from '@app/store/actions/l1-adapter.action';
import { GetImfJsonView } from '@app/store/actions/imf-json.action';
import { takeUntil } from 'rxjs/operators';
import { Subject, combineLatest, Observable } from 'rxjs';
import { selectTemplate, selectFormat } from '@app/store/selectors/l1-adapter.selectors';
import { getIfmList } from '@app/store/selectors/imf-json.selector';
import { GetL3Adapter, GetL3AdapterById, ClearState } from '@app/store/actions/l3-adapter.action';
import {
  selectL3AdapterData,
  selectL3AdapterById,
} from '@app/store/selectors/l3-adapter.selectors';
import { SubscribeService } from '@app/services/subscribe.services';
import {GetIMF} from '@app/store/actions/scheme-imf-mapper.action';
import {ImfJsonService} from '@app/services/imf-json.service';
@Component({
  selector: 'app-l3-adapters-create',
  templateUrl: './l3-adapters-create.component.html',
  styleUrls: ['./l3-adapters-create.component.scss'],
})
export class L3AdaptersCreateComponent implements OnInit {
  public templateValueList: any;
  public formatValueList: any;
  public rowsResponse: any = [];
  public template: any;
  public format: any;
  public imfId: any;
  public adapterData: any;
  public tabData: String = 'Request';
  public name: any = '';
  public isEdit = true;
  public getIfmList: any = [];
  public componetDestroyed = new Subject();
  public loading = true;
  public combinedState$ = new Observable();
  public takeWhile = true;
  public multiPackager:boolean = false;
  public id: any;
  public editMessage = false;
  public activeTab = 0;
  public tabIndex = 0;
  public showTransform = false;
  public networkTabDisable = true;
  public transformTabDisable = true;
  public responseTabDisable = true;
  public schemaById: any;
  public readonly widthConfig = ['200px', '200px', null];
  public pvalidationTabDisable = true;
  public ShowPostvalidationTab = true;
  public rows = [];
  public packagerLoader = false;
  public index: any;
  public isJson = false;
  public isHttp_urlencoded = false;
  public readOnlyFlag = false;
  public beanTabDisable = true;
  public isXmlHttp = false;
  public singleProperty: boolean = false;
  public checkSingleProperties: boolean;

  constructor(private _store: Store<IAppState>, private route: ActivatedRoute, private _subscribeService: SubscribeService,
    public _imfjsonService: ImfJsonService)
  {

  }

  checkJsonAdaptor() {
    this.isJson =
      this.template && this.template.value ? this.template.value.includes('JSON') : false;
      this.isHttp_urlencoded =  this.template && this.template.value ? this.template.value.includes('HTTP-URLENCODED') : false;
      this.isXmlHttp = this.template && this.template.value ? this.template.value.includes('XML-OVER-HTTP') : false;
  }

  changeMultiPackager(data){
     this.multiPackager = data;
  }

  checkSingleProperty(data){
    this.adapterData.networkData.properties.singleProperty = data;
    this.singleProperty = data;
  }

  ngOnInit() {
    this._subscribeService.getCurrentTabValue().subscribe(res =>{
      if(res){
         this.tabData = res
        }
     });
    this.route.params.pipe(takeUntil(this.componetDestroyed)).subscribe(params => {
      if ('view' in params) {
          this.readOnlyFlag = true
        }
      if (params.adapterId) {
        this.id = params.adapterId;
        this._store.dispatch(new GetL3AdapterById(this.id));
        this.editMessage = true;
        this.networkTabDisable = false;
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

    this._store.dispatch(new GetTemplates());


   // this._store.dispatch(new GetFormat());

    this.combinedState$ = combineLatest(
      this._store.pipe(takeUntil(this.componetDestroyed), select(selectFormat)),
      this._store.pipe(takeUntil(this.componetDestroyed), select(selectTemplate)),
    );

    this.combinedState$.pipe(takeUntil(this.componetDestroyed)).subscribe(value => {
      this.templateValueList = value[1];
      this.formatValueList = value[0];
      this.loading = false;
      if (this.templateValueList && this.templateValueList.length) {
        // let soapTempalte = this.templateValueList.find(item => item.value === 'SOAP');
        this.index = this.templateValueList.findIndex(item => item.value === 'SOAP');
        if (this.index) {
          this.templateValueList.splice(this.index, 1);
        }
      }
      this.loadData()
    });
   

    if (!this.id) {
      this._store
        .pipe(takeUntil(this.componetDestroyed), select(selectL3AdapterData))
        .subscribe((response: any) => {
          if (response) {
            this.adapterData = response;
            // this.isEdit = false;
            this.takeWhile = false;
            this.name = !this.name ? this.adapterData.masterData.adapterDto.name : this.name;
            if (
              this.adapterData.masterData.adapterDto.standardMessageSpecification.messageStandard !=
              null
            ) {
              this.templateValueList.forEach(ele => {
                if (ele.id === this.adapterData.masterData.adapterDto.standardMessageSpecification.messageStandard.id) {
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

  getIfmListDataAndmanipulate() {
    this._imfjsonService.getImfList().pipe(takeUntil(this.componetDestroyed))
    .subscribe((response: any) => {
      if (response) {
        let IfmList = response.data.imfStructureList;
        IfmList = IfmList.filter(item => item.version !== 0);
        this.getIfmList = [];
        const size = 2;
        const slicedImfList = IfmList.slice(0, size);
        this.getIfmList = slicedImfList.map((item) => {
          return {
            "id": item.id, "name": item.name, "version": item.version
          }
        })
        if(this.getIfmList.findIndex(imf=>imf.id === this.imfId.id) === -1) {
          this.getIfmList.push(this.imfId)
        }
      }
    });
  }


 
    getAdapterdataById() {
      this._store
    .pipe(takeUntil(this.componetDestroyed), select(selectL3AdapterById))
    .subscribe((response: any) => {
      if (response && response.data) {
        this.adapterData = response.data;
        this.beanTabDisable = response.data.beanTabDisable;
        // this.isEdit = true;
        this.loading = false;
        if(this.adapterData.networkData.properties!==null){
        this.multiPackager =   this.adapterData.networkData.properties?.multiPackager ? this.adapterData.networkData.properties?.multiPackager : false;
        this.adapterData.networkData.properties.multiPackager = this.multiPackager;
        }
        this.imfId = this.adapterData.imfId
          ? this.adapterData.imfId
          : null;
          this.getIfmListDataAndmanipulate();
        this.name = this.adapterData.masterData.adapterDto.name
          ? this.adapterData.masterData.adapterDto.name
          : null;
          this.singleProperty = this.adapterData.networkData.properties?.singleProperty ?
          this.adapterData.networkData.properties?.singleProperty : false;
        if (
          this.adapterData.masterData.adapterDto.standardMessageSpecification.messageStandard !=
          null && this.templateValueList != null
        ) {
          this.templateValueList.forEach(ele => {
            if (ele.id === this.adapterData.masterData.adapterDto.standardMessageSpecification.messageStandard.id) {
              this.template = ele;
            }
          });
        }
        this.checkJsonAdaptor();
      }
    });
  }

  loadData() {
    this.getAdapterdataById();
   this._store.dispatch(new GetImfJsonView());
  }

  public selectTransform() {
    this.activeTab = 2;
    this.showTransform = true;
    this.tabValue(2);
  }

  public changeAdapterData(value) {
    this.adapterData = value;
    let output = this.adapterData.schemaData.schema;
    output = JSON.parse(output);
    if(this.tabData === 'Request'){
    this.rows = [...output.template.field];
    }else{
      this.rowsResponse = [...output.template.field];
    }

  }

  public changeTemplate(value: any) {
    this.name = value.name;
    this.template = value.templateData;
    this.imfId = value.imfId;
    if (this.template !== null) {
      const data = {
        template: this.template.id,
      };
      setTimeout(() => {
        if(this.imfId && this.imfId.id && value.isFromImfSelection) {
          this._store.dispatch(new GetIMF(this.imfId.id));
          this._store.dispatch(new GetMessageContextList(this.imfId.id));
        }
        else {
          this._store.dispatch(new GetL3Adapter(data));
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
    this.activeTab = 1;
  }

  public responseTab() {
    this.activeTab = 3;
  }

  public tabValue(value: any) {
    this.tabIndex = value;
    if (value === 1) {
      this.networkTabDisable = false;
      this.transformTabDisable = true;
      this.responseTabDisable = true;
      this.pvalidationTabDisable = true;
      // this.isEdit = true;
    } else if (value === 2) {
      this.showTransform = true;
      this.transformTabDisable = false;
      this.responseTabDisable = true;
      this.networkTabDisable = false;
      this.pvalidationTabDisable = true;
      // this.isEdit = true;
    } else if (value === 3) {
      this.networkTabDisable = false;
      this.transformTabDisable = false;
      this.responseTabDisable = false;
      this.pvalidationTabDisable = true;
      // this.isEdit = true;
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

  ngOnDestroy(): void {
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
