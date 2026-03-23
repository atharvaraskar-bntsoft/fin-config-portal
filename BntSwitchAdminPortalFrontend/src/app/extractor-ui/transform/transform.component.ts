import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { ExtractorService } from '@app/services/extractor.service';
import { GetServiceType } from '@app/store/actions/scheme-imf-mapper.action';
import { selectGetServiceType } from '@app/store/selectors/scheme-imf-mapper.selectors';
import { IAppState } from '@app/store/state/app.state';
import { select, Store } from '@ngrx/store';
import { MainService } from '../mapper/main.service';

@Component({
  selector: 'app-transform',
  templateUrl: './transform.component.html',
  styleUrls: ['./transform.component.css'],
})
export class TransformComponent implements OnInit, OnChanges {
  @Output() setConstant: EventEmitter<any> = new EventEmitter();
  @Input() packgerList: Array<any> = [];
  @Output() transformData = new EventEmitter<any>();
  @Input() initialJson;
  @Input() jsonData: Array<any> = [];
  public authData = [];
  public adapterData = [];
  public fieldDataList = [];
  public serviceList: any = [];
  public typeList: any = [
    { name: 'Request', value: 'request' },
    { name: 'Response', value: 'response' },
  ];
  public FldID;
  public popup = '';
  public isRequest: any;
  public changeMapperValue: any = 'copyasis';
  public AuthorizationTitle: any;
  public field: any = [];
  joinJson: any;
  isScript: boolean = false;
  isMapperReq: boolean = false;
  isMapperRes: boolean = false;
  isJoinRes: boolean = false;
  public adapterDataMap: any;
  editMode: boolean = false;
  public copyAsObject: any = {
    field: null,
    listMappingCopyAsIs: [],
  };
  public sources: any = {
    destination: null,
    source: null,
    feature: null,
  };

  conditionDropDown: any;

  public sourcesOld: any = {
    destination: null,
    source: null,
    feature: null,
  };
  public mapping: any = {
    sources: [],
    listConstantMappingField: [],
    listCopyAsIsMapping: [],
    listExtractMapping: [],
    listMapperMapping: [],
    listScriptMapping: [],
    listJoinMapping: [],
  };

  visible: boolean;
  index: any;

  constantDrawerVisible: boolean = false;

  parentFieldflag: boolean = false;

  constantArray: any = [];

  constructor(
    private _service: MainService,
    private _store: Store<IAppState>,
    private _extractorService: ExtractorService,
  ) {
    this._store.dispatch(new GetServiceType());
    this.authData = [];
    this._service.getAdapterDataMap().subscribe((response: any) => {
      if (response) {
        this.adapterDataMap = response.data.AdapterdataMap;
      }
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    let packgerList = null;
    if (
      changes.packgerList?.currentValue &&
      changes.packgerList.currentValue?.attributes.length > 0
    ) {
      let packgerList = changes.packgerList.currentValue;
    } else {
    }
    let initialJson = null;
    if (changes.initialJson && changes.initialJson.currentValue) {
      initialJson = changes.initialJson.currentValue;
    } else {
      initialJson = this.initialJson;
    }
    if (packgerList) {
      this.convertPackager(packgerList);
    } else {
      this.convertPackager(initialJson.details.packager);
    }
    if (initialJson && initialJson.details && initialJson.details.packager) {
      if (initialJson.details.mapping) {
        this.mapping = initialJson.details.mapping;
        if (this.mapping && this.mapping.sources && this.mapping.sources.length > 0) {
          this.constantArray = this.mapping.listConstantMappingField;
        }
      }
    }
  }

  public convertPackager(jsonPayload: any): void {
    if (jsonPayload && jsonPayload.attributes.length > 0) {
      this._extractorService.getAttributeJson(jsonPayload).subscribe(res => {
        if (res && res.status == 'success') {
          let data = res.data ? res.data : [];
          this.authData = [];
          const pList = data;
          if (pList && pList.length > 0) {
            pList.map((item: any) => {
              this.authData.push({
                id: item.id,
                name: item.name,
                destination: null,
                destinationFlag: false,
                parentField: item.parentField,
              });
            });
          }
          if (
            this.mapping &&
            this.mapping.listConstantMappingField &&
            this.mapping.listConstantMappingField.length > 0
          ) {
            this.constantArray = this.mapping.listConstantMappingField;
          }
          if (this.mapping.sources && this.mapping.sources.length > 0) {
            this.authData.forEach(element => {
              let sourceMapping = null;
              sourceMapping = this.mapping.sources.find(({ source }) => source === element.id);
              if (sourceMapping) {
                element.destination = sourceMapping.destination;
                element.destinationFlag = true;
              }
            });
          }
        }
      });
    }
  }

  ngOnInit(): void {
    this._store.pipe(select(selectGetServiceType)).subscribe((response: any) => {
      if (response) {
        this.serviceList = response;
      }
    });
  }

  public transactionReqPopFun(data, i) {
    this.index = i;
    let filterlistExtractMapping = [];
    let filterlistCopyAsIsMapping = [];
    let filterlistJoinMapping = [];
    let filterlistMapperMapping = [];
    let filterlistScriptMapping = [];

    this.FldID = data.id;
    if (this.mapping.sources) {
      let findsources = this.mapping.sources.find(({ source }) => source === this.FldID);
      if (findsources) {
        this.sources = findsources;
        this.sourcesOld = JSON.parse(JSON.stringify(findsources));
        filterlistExtractMapping = this.mapping.listExtractMapping.filter(
          ({ packagerField }) => packagerField === this.FldID,
        );
        filterlistCopyAsIsMapping = this.mapping.listCopyAsIsMapping.filter(
          ({ packagerField }) => packagerField === this.FldID,
        );
        filterlistJoinMapping = this.mapping.listJoinMapping.filter(
          ({ packagerField }) => packagerField === this.FldID,
        );
        filterlistMapperMapping = this.mapping.listMapperMapping.filter(
          ({ packagerField }) => packagerField === this.FldID,
        );
        filterlistScriptMapping = this.mapping.listScriptMapping.find(
          ({ packagerField }) => packagerField === this.FldID,
        );

        if (filterlistExtractMapping && filterlistExtractMapping.length > 0) {
          this.sources['listExtractMapping'] = [];
          this.changeMapperValue = 'extractdata';
          this.sources['listExtractMapping'] = filterlistExtractMapping;
        } else if (filterlistCopyAsIsMapping && filterlistCopyAsIsMapping.length > 0) {
          this.sources['listCopyAsIsMapping'] = [];
          this.changeMapperValue = 'copyasis';
          this.sources['listCopyAsIsMapping'] = filterlistCopyAsIsMapping;
        } else if (filterlistJoinMapping && filterlistJoinMapping.length > 0) {
          this.sources['listJoinMapping'] = [];
          this.changeMapperValue = 'join';
          this.sources['listJoinMapping'] = filterlistJoinMapping;
        } else if (filterlistMapperMapping && filterlistMapperMapping.length > 0) {
          this.sources['listMapperMapping'] = [];
          this.changeMapperValue = 'mapper';
          this.sources['listMapperMapping'] = filterlistMapperMapping;
        } else if (filterlistScriptMapping) {
          this.sources['listScriptMapping'] = [];
          this.changeMapperValue = 'script';
          this.sources['listScriptMapping'] = filterlistScriptMapping;
        }
      } else {
        this.sources = {
          destination: null,
          source: this.FldID,
          feature: this.changeMapperValue,
        };
      }
    }
    if (data.parentField) {
      this.parentFieldflag = true;
      this.sources['parentField'] = data.parentField;
    }
    this.visible = true;
  }

  public changeMapper(item) {
    this.sources.feature = item;
  }

  closeExtract(event: any): void {
    this.visible = false;
    this.reSetdata();
  }

  close(event: any): void {
    this.visible = false;
    this.reSetdata();
  }

  closeJoin(event: any): void {
    this.visible = false;
    this.reSetdata();
  }

  closeMapperReq(event: any): void {
    this.visible = false;
    this.reSetdata();
  }
  closeScript(event: any): void {
    this.visible = false;
    this.reSetdata();
  }

  saveExtract(event: any): void {
    let destinationlist = [];
    this.visible = false;
    this.removeMapping();
    this.removeSourceFormList();
    this.sources.destination = destinationlist.toString();
    delete this.sources.listExtractMapping;
    this.mapping.sources.push(this.sources);
    event.listExtractMapping.forEach(element => {
      this.mapping.listExtractMapping.push(element);
    });
    event.listExtractMapping.forEach(element => {
      destinationlist.push(element.imfField.text);
    });
    this.sources.destination = destinationlist.toString();
    this.authData[this.index].destination = this.sources.destination;
    this.authData[this.index].destinationFlag = true;
    this.reSetdata();
  }

  saveJoin(event: any): void {
    this.visible = false;
    this.removeMapping();
    this.removeSourceFormList();
    this.mapping.listJoinMapping.push(event);
    this.sources.destination = event.imfField.text;
    delete this.sources.listJoinMapping;
    this.mapping.sources.push(this.sources);
    this.authData[this.index].destination = this.sources.destination;
    this.authData[this.index].destinationFlag = true;
    this.reSetdata();
  }

  saveCopyAsIs(event: any): void {
    this.visible = false;
    this.removeMapping();
    this.removeSourceFormList();
    delete this.sources.listCopyAsIsMapping;
    this.mapping.listCopyAsIsMapping.push(event.listMappingCopyAsIs);
    this.sources.destination = event.listMappingCopyAsIs.imfField.text;
    this.mapping.sources.push(this.sources);
    this.authData[this.index].destination = this.sources.destination;
    this.authData[this.index].destinationFlag = true;
    this.reSetdata();
  }

  saveMapperData(event: any): void {
    this.visible = false;
    this.removeMapping();
    this.removeSourceFormList();
    delete this.sources.listMapperMapping;
    this.mapping.sources.push(this.sources);
    this.mapping.listMapperMapping.push(event.listMapperMapping);
    this.sources.destination = event.listMapperMapping.name;
    this.authData[this.index].destination = this.sources.destination;
    this.authData[this.index].destinationFlag = true;
    this.reSetdata();
  }
  saveScriptData(event: any): void {
    let destinationlist = [];
    this.visible = false;
    this.removeMapping();
    this.removeSourceFormList();
    delete this.sources.listScriptMapping;
    this.mapping.sources.push(this.sources);
    this.mapping.listScriptMapping.push(event.listScriptMapping);
    this.sources.destination = event.listScriptMapping.script;
    this.authData[this.index].destination = this.sources.destination;
    this.authData[this.index].destinationFlag = true;
    this.reSetdata();
  }

  removeMapping() {
    switch (this.sourcesOld.feature) {
      case 'copyasis':
        this.mapping.listCopyAsIsMapping = this.mapping.listCopyAsIsMapping.filter(
          ({ packagerField }) => packagerField !== this.FldID,
        );
        delete this.sources.listCopyAsIsMapping;
        delete this.sources.destination;
        break;
      case 'extractdata':
        this.mapping.listExtractMapping = this.mapping.listExtractMapping.filter(
          ({ packagerField }) => packagerField !== this.FldID,
        );
        delete this.sources.listExtractMapping;
        delete this.sources.destination;
        break;
      case 'mapper':
        this.mapping.listMapperMapping = this.mapping.listMapperMapping.filter(
          ({ packagerField }) => packagerField !== this.FldID,
        );
        delete this.sources.listMapperMapping;
        delete this.sources.destination;
        break;
      case 'script':
        this.mapping.listScriptMapping = this.mapping.listScriptMapping.filter(
          ({ packagerField }) => packagerField !== this.FldID,
        );
        delete this.sources.listScriptMapping;
        delete this.sources.destination;
        break;
      case 'join':
        this.mapping.listJoinMapping = this.mapping.listJoinMapping.filter(
          ({ packagerField }) => packagerField !== this.FldID,
        );
        delete this.sources.listJoinMapping;
        delete this.sources.destination;
        break;
    }
  }

  public removePackerFieldMapping(eventData, data, i) {
    if (!eventData) {
      this.authData[i].destination = null;
      let findsources = this.mapping.sources.find(({ source }) => source == data.id);
      this.mapping.source = this.mapping.sources.find(({ source }) => source !== data.id);
      switch (findsources.feature) {
        case 'copyasis':
          this.mapping.listCopyAsIsMapping = this.mapping.listCopyAsIsMapping.filter(
            ({ packagerField }) => packagerField !== data.id,
          );
          break;
        case 'extractdata':
          this.mapping.listExtractMapping = this.mapping.listExtractMapping.filter(
            ({ packagerField }) => packagerField !== data.id,
          );
          break;
        case 'mapper':
          this.mapping.listMapperMapping = this.mapping.listMapperMapping.filter(
            ({ packagerField }) => packagerField !== data.id,
          );
          break;
        case 'script':
          this.mapping.listScriptMapping = this.mapping.listScriptMapping.filter(
            ({ packagerField }) => packagerField !== this.FldID,
          );
          break;
        case 'join':
          this.mapping.listJoinMapping = this.mapping.listJoinMapping.filter(
            ({ packagerField }) => packagerField !== data.id,
          );
          break;
      }
    } else {
      this.transactionReqPopFun(data, i);
    }
  }

  removeSourceFormList() {
    if (this.mapping.sources && this.mapping.sources.length > 0) {
      this.mapping.sources = this.mapping.sources.filter(({ source }) => source !== this.FldID);
    }
  }

  saveData() {
    this.transformData.emit(this.mapping);
  }

  next() {
    this.transformData.emit(this.mapping);
  }

  reSetdata() {
    this.sources = {
      destination: null,
      source: null,
      feature: null,
    };
    this.changeMapperValue = 'copyasis';
    this.parentFieldflag = false;
  }

  openSetConstantDrawer() {
    this.constantDrawerVisible = true;
  }

  closeConstant() {
    this.constantDrawerVisible = false;
  }

  constantForm(data: any) {
    if (data) {
      this.constantArray = data.constantConfig;
      this.constantDrawerVisible = false;
      this.mapping.listConstantMappingField = this.constantArray;
    }
  }
}
