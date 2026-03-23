import { Component, OnInit, Input, Output, EventEmitter, SimpleChanges } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { IAppState } from '@app/store/state/app.state';
import {
  GetInternalCode,
  DraftSchema,
  ClearState,
  VersionData,
} from '@app/store/actions/l1-adapter.action';
import { takeUntil } from 'rxjs/operators';
import { selectInternalCode, selectVersionData } from '@app/store/selectors/l1-adapter.selectors';
import { Subject } from 'rxjs';
import { AlertService } from '@app/services/alert.service';
import { Router } from '@angular/router';
import { selectViewSettingsList } from '@app/store/selectors/view-settings.selector';
import { ViewSettingGetObject } from '@app/models/view-settings.interface';
import { TranslateService } from '@ngx-translate/core';
import { selectIMF } from '@app/store/selectors/scheme-imf-mapper.selectors';

@Component({
  selector: 'app-responsetab-json',
  templateUrl: './responsetab-json.component.html',
  styleUrls: ['./responsetab-json.component.scss'],
})
export class ResponsetabJsonComponent implements OnInit {
  public responseCodeList = [];
  public apiList = [];
  @Input() readOnlyFlag = false;
  public responseCodeBackupList = [];
  public unReachCodeModel;
  public internalCodeList: any = [];
  public internalAPIList: any = [];
  public responseNameList: any = [];
  public componetDestroyed = new Subject();
  @Input() public widthConfig: any;
  @Input() public adapterData: any;
  @Input() public name: any;
  @Input() public template: any;
  @Input() public tabIndex: any;
  @Input() public isEdit: any;
  @Input() public templateType: any;
  public responseCodeData: any;
  public publishDisable = false;
  public componentResponseCodeFieldList = [];
  public ipcUiWrapper: any = {
    ipcList: [],
    defaultResponseCode: null,
    componentResponseCodeField: null,
  };
  @Output() public tabValue: EventEmitter<Object> = new EventEmitter<Object>();
  public imfList: any = [];
  public responseCode: any = null;
  public defaultStatusCode: any = null;
  public defaultResponseDesc: any = null;
  public componentResponseCodeFieldName: any = null;
  public currentLang: string;
  constructor(
    private _store: Store<IAppState>,
    private alertService: AlertService,
    private _router: Router,
    private translate: TranslateService,
  ) {  }

  public ngOnInit() {
    this.responseCodeList.push({
      description: null,
      ipc: null,
      responseCode: null,
      statusCode: null,
    });

    this.apiList.push({
      api: null,
      responseName: null,
      responseCode: null,
      responseDesc: null,
      uniquekey: null,
      responseNameList: [],
      responseFieldIList: [],
    });
    this._store.pipe(select(selectViewSettingsList)).subscribe((response: ViewSettingGetObject) => {
      if (response) {  
        this.currentLang = response.data.settingDto.language;
        this.translate.setDefaultLang(this.currentLang);
      }
    });

    this._store
      .pipe(takeUntil(this.componetDestroyed), select(selectIMF))
      .subscribe((response: any) => {
        if (response) {
          this.imfList = response.ImfField;
        }
      });
    this._store.dispatch(new GetInternalCode());

    this._store
      .pipe(takeUntil(this.componetDestroyed), select(selectInternalCode))
      .subscribe((response: any) => {
        if (response) {
          this.internalCodeList = response;
        }
      });
    if (this.adapterData) {
      this.responseCodeData = this.adapterData.responseCodeData;
      if (this.isEdit && this.responseCodeData.ipcUiWrapper) {
        this.responseCodeList = this.responseCodeData.ipcUiWrapper.ipcList;
        this.responseCode = this.responseCodeData.ipcUiWrapper.defaultResponseCode;
        this.defaultStatusCode = this.adapterData.responseCodeData.ipcUiWrapper.defaultStatusCode;
        this.defaultResponseDesc =
          this.adapterData.responseCodeData.ipcUiWrapper.defaultResponseDesc;
        this.apiList = [];
        if (this.adapterData?.responseCodeData?.ipcUiWrapper?.componentResponseCodeField) {
          this.strToArray(
            this.adapterData.responseCodeData.ipcUiWrapper.componentResponseCodeField,
          ).forEach(elementouter => {
            if (this.adapterData.schemaData.schema.apiDefinitions) {
              this.adapterData.schemaData.schema.apiDefinitions.forEach(element => {
                if (element.name === elementouter.api) {
                  if (
                    element.hasOwnProperty('outgoingConditionalPackager') &&
                    element.outgoingConditionalPackager !== null
                  ) {
                    var responseNameList = [];
                    element.outgoingConditionalPackager.forEach(element => {
                      responseNameList.push({
                        resName: element.name,
                        attributes: element.outgoingPackager.attributes,
                      });
                    });
                    var responseFieldIList = responseNameList.find(
                      o => o.resName === elementouter.responseName,
                    );
                    this.apiList.push({
                      api: elementouter.api,
                      responseName: elementouter.responseName,
                      responseCode: elementouter.responseCode,
                      responseDesc: elementouter.responseDesc,
                      responseNameList: responseNameList,
                      responseFieldIList: responseFieldIList?.attributes,
                      uniquekey: elementouter.api.concat(elementouter.responseName),
                    });
                  } else {
                    this.apiList.push({
                      api: elementouter.api,
                      responseName: elementouter.responseName,
                      responseCode: elementouter.responseCode,
                      responseDesc: elementouter.responseDesc,
                      responseFieldIList: element.outgoingPackager.attributes,
                      uniquekey: elementouter.api,
                    });
                  }
                }
              });
            }
          });
        }
      }
    }
    if (
      this.adapterData?.transformData &&
      this.adapterData.transformData.fieldSchemeImfMapperUiWrapper
    ) {
      this.componentResponseCodeFieldList =
        this.adapterData?.transformData.fieldSchemeImfMapperUiWrapper.map(item => {
          item.id = item.fieldId;
          item.name = item.fieldName;
          return item;
        });
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (!changes?.tabIndex?.firstChange && changes?.tabIndex?.currentValue === 3) {
      this.usedAPIChange(JSON.parse(this.adapterData.schemaData.schema));
    }
  }

  apiChange(event, index) {
    this.apiList[index].uniquekey = null;
    this.apiList[index].responseCode = null;
    this.apiList[index].responseDesc = null;
    this.apiList[index].responseName = null;
    this.apiList[index].responseNameList = [];
    this.apiList[index].api = null;
    this.apiList[index].responseFieldIList = [];
    if (event) {
      if (
        event.hasOwnProperty('outgoingConditionalPackager') &&
        event.outgoingConditionalPackager !== null
      ) {
        this.apiList[index].api = event.name;
        this.apiList[index].uniquekey = event.name;
        var result = Object.keys(event.outgoingConditionalPackager).map(key => [
          key,
          event.outgoingConditionalPackager[key],
        ]);
        result.forEach(element => {
          this.apiList[index].responseNameList.push({
            resName: element[0],
            attributes: element[1]['attributes'],
          });
        });
      } else {
        this.apiList[index].api = event.name;
        this.apiList[index].uniquekey = event.name;
        if (this.templateType === true) {
          this.apiList[index].responseFieldIList = [
            ...event.outgoingPackager.attributes[0].attributes,
          ];
        } else {
          this.apiList[index].responseFieldIList = event.outgoingPackager.attributes
        }
      }
    }
  }

  responseChange(event, index) {
    if (event) {
      this.apiList[index].uniquekey = this.apiList[index].api;
      this.apiList[index].uniquekey = this.apiList[index].uniquekey.concat(event.resName);
      this.apiList[index].responseName = event.resName;
      this.apiList[index].responseFieldIList = event.attributes;
      this.apiList[index].responseCode = null;
      this.apiList[index].responseDesc = null;
    } else {
      this.apiList[index].responseCode = null;
      this.apiList[index].responseDesc = null;
      this.apiList[index].responseFieldIList = [];
      this.apiList[index].responseName = null;
      this.apiList[index].uniquekey = this.apiList[index].api;
    }
  }

  usedAPIChange(apilist) {
    this.internalAPIList = apilist.apiDefinitions;
  }

  public pushresponseCodeItem() {
    this.responseCodeData.persistRequired = 1;
    this.responseCodeList.push({
      description: null,
      ipc: null,
      responseCode: null,
      responseCodeList: null,
    });
  }

  public pushApiListItem() {
    this.apiList.push({
      api: null,
      responseName: null,
      responseCode: null,
      responseDesc: null,
      uniquekey: null,
      responseNameList: [],
      responseFieldIList: [],
    });
  }

  public pullApiListItem(i) {
    this.apiList.splice(i, 1);
  }

  public pullresponseCodeItem(i) {
    this.responseCodeData.persistRequired = 1;
    this.responseCodeList.splice(i, 1);
  }

  public draftResponse(flag = true) {
    let isValid = true;
    const reg = new RegExp('^[0-9]+$');
    const testAlphaNumeric = new RegExp('^[a-z0-9]+$');
    const newAlphaNumeric = new RegExp('^[A-Za-z0-9]{1,4}$');
    for (let item of this.responseCodeList) {
      if (((!item.responseCode && !item.description && !item.statusCode) || !item.ipc) && isValid) {
        this.alertService.responseMessage({
          status: 'failure',
          message: 'Please enter mandatory fields',
        });
        isValid = false;
        break;
      }
    }

    if (
      !newAlphaNumeric.test(this.responseCode) &&
      this.template.value.indexOf('SOAP') === -1 &&
      isValid
    ) {
      this.alertService.responseMessage({
        status: 'failure',
        message: 'Default response code value should be in between 0 to 9',
      });
      isValid = false;
    } else if (
      !newAlphaNumeric.test(this.responseCode) &&
      this.template.value.indexOf('SOAP') !== -1 &&
      isValid
    ) {
      this.alertService.responseMessage({
        status: 'failure',
        message: 'Default response code value should be in between 0 to 9999',
      });
      isValid = false;
    }
    var valueArr = this.apiList.map(function (item) {
      return item.uniquekey;
    });
    var isDuplicate = valueArr.some(function (item, idx) {
      return valueArr.indexOf(item) != idx;
    });
    if (isDuplicate) {
      this.alertService.responseMessage({
        status: 'failure',
        message: 'API Name and Response Name Duplicate dose not Allows',
      });
      isValid = false;
    }

    for (var i = this.apiList.length - 1; i >= 0; i--) {
      if (this.apiList[i].api == '' || this.apiList[i].api == null) {
        this.pullApiListItem(i);
      }
    }
    if (isValid) {
      if (this.adapterData.responseCodeData.ipcUiWrapper) {
        this.adapterData.responseCodeData.ipcUiWrapper.defaultResponseCode = this.responseCode;
        this.adapterData.responseCodeData.ipcUiWrapper.defaultStatusCode = this.defaultStatusCode;
        this.adapterData.responseCodeData.ipcUiWrapper.defaultResponseDesc =
          this.defaultResponseDesc;
        if (this.apiList.length !== 0) {
          this.adapterData.responseCodeData.ipcUiWrapper.componentResponseCodeField =
            this.jsonArrayToString(this.apiList);
        }
        this.adapterData.responseCodeData.ipcUiWrapper.ipcList = this.responseCodeList;
      } else if (this.adapterData.responseCodeData.ipcUiWrapper == null) {
        this.adapterData.responseCodeData.ipcUiWrapper = this.ipcUiWrapper;
        this.adapterData.responseCodeData.ipcUiWrapper.defaultResponseCode = this.responseCode;
        this.adapterData.responseCodeData.ipcUiWrapper.defaultStatusCode = this.defaultStatusCode;
        this.adapterData.responseCodeData.ipcUiWrapper.defaultResponseDesc =
          this.defaultResponseDesc;
        if (this.apiList.length !== 0) {
          this.adapterData.responseCodeData.ipcUiWrapper.componentResponseCodeField =
            this.jsonArrayToString(this.apiList);
        }
        this.adapterData.responseCodeData.ipcUiWrapper.ipcList = this.responseCodeList;
      }
      this.adapterData.responseCodeData.persistRequired = 1;
      if (flag) {
        this._store.dispatch(new DraftSchema(this.adapterData));
      } else {
        this.tabValue.emit(4);
      }
    }
  }

  strToArray(str) {
    if (str) {
      str = str.replace(/&#46;/g, '.');
      var finalArray = [];
      var myArray = str.split(',');
      for (var j = 0; j < myArray.length; j++) {
        this.processSingle(myArray[j], finalArray);
      }
      return finalArray;
    }
  }

  jsonArrayToString(jsonArray) {
    var finalStr = '';
    for (var j = 0; j < jsonArray.length; j++) {
      if (j != 0) {
        finalStr = finalStr + ',';
      }
      var apiN = jsonArray[j]['api'];
      if (apiN != undefined && apiN != null) {
        finalStr = finalStr + apiN;
      }
      var responseName = jsonArray[j]['responseName'];
      if (responseName != undefined && responseName != null) {
        finalStr = finalStr + '#' + responseName;
      }
      var responseCode = jsonArray[j]['responseCode'];
      if (responseCode != undefined && responseCode != null) {
        finalStr = finalStr + ':' + responseCode;
      }
      var responseDesc = jsonArray[j]['responseDesc'];
      if (responseDesc != undefined && responseDesc != null) {
        finalStr = finalStr + '#' + responseDesc;
      }
    }
    return finalStr;
  }

  processSingle(str1, arrayVar) {
    var apiName;
    var responseName;
    var responseCode;
    var responseDesc;
    var myArray = str1.split(':');
    for (var j = 0; j < myArray.length; j++) {
      if (j == 0) {
        //api1#structure1
        var tArray = myArray[j].split('#');
        if (tArray.length > 1) {
          apiName = tArray[0];
          responseName = tArray[1];
        } else {
          apiName = myArray[j];
        }
      } else if (j == 1) {
        //XYZ#PPP
        var tArray = myArray[j].split('#');
        if (tArray.length > 1) {
          responseCode = tArray[0];
          responseDesc = tArray[1];
        } else {
          responseCode = myArray[j];
        }
      }
    }
    this.pushSimpleObject(arrayVar, apiName, responseName, responseCode, responseDesc);
  }

  pushSimpleObject(finalObject, apiName, responseName, responseCode, responseDesc) {
    if (responseCode && responseDesc) {
      responseCode = responseCode.replace('.', '&#46;');
      responseDesc = responseDesc.replace('.', '&#46;');
    }
    //alert(apiName + " : " + responseName + " : " + responseCode + " : " + responseDesc);
    var newStrObj = {
      api: apiName,
      responseName: responseName,
      responseCode: responseCode,
      responseDesc: responseDesc,
    };
    finalObject.push(newStrObj);
  }

  public prevTabValue() {
    this.tabValue.emit(2);
  }
  public tabChangeValue() {
    this.draftResponse(false);
  }

  isBtnDisabled() {
    let isValid = true;
    this.responseCodeList.map(item => {
      if (((!item.responseCode && !item.description && !item.statusCode) || !item.ipc) && isValid) {
        isValid = false;
      }
    });
    return isValid;
  }

  validateResCode(value) {
    const regex = /^[ a-zA-Z0-9_]*$/;
    return regex.test(value.key);
  }

  ngOnDestroy(): void {
    // Called once, before the instance is destroyed.
    // Add 'implements OnDestroy' to the class.
    this.componetDestroyed.next();
    this.componetDestroyed.complete();
    this.componetDestroyed.unsubscribe();
    this._store.dispatch(new ClearState());
  }
}
