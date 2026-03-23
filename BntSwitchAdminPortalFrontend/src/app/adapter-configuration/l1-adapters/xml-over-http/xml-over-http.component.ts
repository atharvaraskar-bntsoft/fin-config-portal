import { Component, OnInit, Input, Output, EventEmitter, OnDestroy } from '@angular/core';
import { Subject, throwError } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { IAppState } from '@app/store/state/app.state';
import { TranslateService } from '@ngx-translate/core';
import { AdapterCommonService } from '@app/services/adapter-common.service';
import { UntypedFormArray, UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';
import * as Joi from '@hapi/joi';
import { AlertService } from '@app/services/alert.service';
import { GetImfTypeListJson } from '@app/store/actions/imf-json.action';
import { takeUntil } from 'rxjs/operators';
import { GetImfTypeListJsonSuccess } from '@app/store/selectors/imf-json.selector';
import { GetL3AdapterById } from '@app/store/actions/l3-adapter.action';
import { L1AdapterService } from '@app/services/l1-adapter.service';
import { selectL3AdapterById } from '@app/store/selectors/l3-adapter.selectors';
import { SubscribeService } from '@app/services/subscribe.services';

export type TSaveMethods = {
  store;
  reducer;
  currentItem;
};
@Component({
  selector: 'app-xml-over-http',
  templateUrl: './xml-over-http.component.html',
  styleUrls: ['./xml-over-http.component.scss'],
})
export class XmlOverHttpComponent implements OnInit, OnDestroy {
  @Input() public schemaById: any;
  shouldRevertChange: boolean;
  @Input() public rows: any = [];
  public totals = 0;
  public loading = true;
  @Input() public widthConfig = [];
  @Input() public name: any;
  @Input() public template: any;
  @Input() public adapterData: any;
  @Input() public tabIndex: any;
  @Input() public schemaData: any;
  @Input() public id: any;
  @Input() public readOnlyFlag = false;
  @Input() public isEdit = false;
  @Input() public checkSingleProperties: boolean;
  public schemaDraftResponse = true;
  public selectedApi;
  public selectedApiList = [];
  public ruleIcon = false;
  public tempJson = {
    basePath: null,
    defaultHost: null,
    singleApi: false,
    headers: [],
    apiDefinitions: [
      {
        name: null,
        api: '/',
        host: null,
        method: null,
        multiple: false,
        incomingPackager: null,
        outgoingPackager: null,
        rawOutgoingPackager: null,
        outgoingConditionalPackager: null,
        rawIncomingPackager: null,
      },
    ],
  };
  nextClicked = false;
  public tableSize = 'small';
  public showTable = false;
  public isHeaderVisible = false;
  public methodList = ['GET', 'POST', 'PUT', 'DELETE'];
  public isRequestPayloadVisible: boolean = false;
  public isResponsePayloadVisible: boolean = false;
  public jsonData: any = [];
  public resJsonData: any = [];
  public reqData: any = [];
  public resData: any = [];
  public typeList: any = [];
  public saveMethods: TSaveMethods;
  public versionMethods: TSaveMethods;
  public isEditMode: boolean = true;
  public revertResChanges: boolean = false;
  public revertReqChanges: boolean = false;
  public isVisibleInvalidField: boolean = false;
  public requestObj: any;
  public responseObj: any;
  public currentIndex: any;
  public attributes: any = {};
  public isViewResVisible: any = [];
  public isViewReqVisible: any = [];
  public savedHeadersList: any = [];
  public inValidFieldList: any = [];
  public currentRequestItem: any;
  public currentResponseItem: any;
  public oldoutgoingConditionalPackager: any;
  public oldRequestItem: any;
  public oldResponseItem: any;
  public headersList: UntypedFormArray;
  public clickTransform = false;
  public validPackgerFieldName: boolean = true;
  public form: UntypedFormGroup;
  public httpreg =
    /^([$]({[a-zA-Z0-9_]+:(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+})|((?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+))$/;
  public apiNameReg = /^(?! )[a-zA-Z0-9 ]+(?<! )$/;
  /*
    httpreg = Allow two types of URL validation:-  ${KEYCLOAK_URL:http:url} | http:url
  */

  /**
   * Obj schema of schema json component
   */
  public objSchema = Joi.object({
    basePath: Joi.string()
      .pattern(/^\/[a-z0-9-/]+$/)
      .optional()
      .allow('', null),
    defaultHost: Joi.string().pattern(this.httpreg).optional().allow('', null),
    singleApi: Joi.boolean().required(),
    headers: Joi.array().items(Joi.string().optional().allow(null)).optional(),
    apiDefinitions: Joi.array()
      .items(
        Joi.object().keys({
          name: Joi.string().pattern(this.apiNameReg).required(),
          api: Joi.string().required(),
          host: Joi.string().optional().allow(null),
          method: Joi.string().required(),
          multiple: Joi.boolean().required(),
          incomingPackager: Joi.object().optional().allow(null),
          outgoingPackager: Joi.object().optional().allow(null),
          rawOutgoingPackager: Joi.string().optional().allow(null),
          rawIncomingPackager: Joi.string().optional().allow(null),
          outgoingConditionalPackager: Joi.array()
            .items(
              Joi.object().keys({
                name: Joi.string(),
                outgoingPackager: Joi.object().optional().allow(null),
                rawOutgoingPackager: Joi.string().optional().allow(null),
              }),
            )
            .allow(null),
        }),
      )
      .valid(),
  });
  @Output() public tabValue: EventEmitter<Object> = new EventEmitter<Object>();
  public componetDestroyed = new Subject();
  public requestActiveTab = 0;
  public responseActiveTab = 0;
  inValidFields: any;
  xmlOverHttp: boolean = true;

  constructor(
    public __alertService: AlertService,
    private fb: UntypedFormBuilder,
    private _l1AdapterService: L1AdapterService,
    private _store: Store<IAppState>,
    private translate: TranslateService,
    private adapterCommonService: AdapterCommonService,
    private subscribeService: SubscribeService,
  ) {
    this._store.dispatch(new GetImfTypeListJson());
    this._store
      .pipe(takeUntil(this.componetDestroyed), select(GetImfTypeListJsonSuccess))
      .subscribe((response: any) => {
        if (response) {
          this.typeList = response['type-list'];
        }
      });
  }

  /**
   * on init
   */
  public ngOnInit() {
    this.form = this.fb.group({
      headers: this.fb.array([]),
    });

    this.headersList = this.form.get('headers') as UntypedFormArray;
    if (this.adapterData && this.id) {
      this.renderItem();
    } else {
      this.rows = [];
      this.totals = 0;
      this.schemaData = null;
    }
    this.subscribeService.getItems().subscribe(res => {
      if (res && res?.attributes?.length > 0) {
        if (res.source == 'request') {
          this.currentRequestItem.incomingPackager.attributes = res?.attributes;
        } else {
          if (res.name) {
            this.currentResponseItem.outgoingConditionalPackager[
              res.name
            ].outgoingPackager.attributes = res?.attributes;
          } else {
            this.currentResponseItem.outgoingPackager.attributes = res?.attributes;
          }
        }
      }
    });
  }

  private setValue(data) {
    data.apiDefinitions = data.apiDefinitions.map(item => {
      item.rawIncomingPackager = null;
      if (item.outgoingConditionalPackager) {
        item.multiple = true;
        item.outgoingConditionalPackager = this.reverseTransform(item);
        this.clickTransform = true;
      } else {
        item.rawOutgoingPackager = null;
        item.multiple = false;
      }
      return item;
    });
    this.removeHeader(0);
    data.headers.forEach(item => {
      this.headersList.push(this.createHeader(item));
    });
    data.headers.forEach(item => {
      this.savedHeadersList.push(item);
    });
    this.tempJson = data;
  }

  private reverseTransform(data) {
    data.outgoingConditionalPackager = JSON.parse(JSON.stringify(data.outgoingConditionalPackager));
    const payload = Object.keys(data.outgoingConditionalPackager);
    const finalValue = [];
    payload.forEach(element => {
      finalValue.push({
        name: element,
        outgoingPackager: data.outgoingConditionalPackager[element],
        rawOutgoingPackager: null,
      });
    });
    return finalValue;
  }
  /**
   * Renders item
   */
  public renderItem() {
    if (this.adapterData.schemaData.schema) {
      this.adapterData.schemaData.schema = JSON.parse(this.adapterData.schemaData.schema);
      this.setValue(this.adapterData.schemaData.schema);
    }
    if (this.readOnlyFlag) {
      this.form.disable();
    }
  }

  /**
   * Adds header from
   */
  addApiList() {
    this.tempJson.apiDefinitions.push({
      name: null,
      api: '/',
      host: null,
      method: null,
      multiple: false,
      incomingPackager: null,
      outgoingPackager: null,
      outgoingConditionalPackager: null,
      rawIncomingPackager: null,
      rawOutgoingPackager: null,
    });
  }

  checkPackgerValidation() {
    let flag = true;
    this.tempJson.apiDefinitions.forEach(item => {
      if (item) {
        if (!item.multiple && !item.outgoingPackager && !item.incomingPackager) {
          this.__alertService.responseMessage({
            status: 'failure',
            message: 'Please Add Either Request Payload or Response Payload',
          });
          flag = false;
        }
      }
    });
    return flag;
  }

  addHeadersFrom() {
    this.headersList.push(this.createHeader(null));
  }

  /**
   * Gets header form group
   */
  get headerFormGroup() {
    return this.form.get('headers') as UntypedFormArray;
  }

  removeHeader(index) {
    this.headersList.removeAt(index);
  }

  public closeHeaderPopup() {
    this.isHeaderVisible = false;
    for (var i = this.headersList.length; i >= 0; i--) {
      this.headersList.removeAt(i);
    }

    if (this.savedHeadersList.length !== 0) {
      this.savedHeadersList.forEach(item => {
        this.headersList.push(this.createHeader(item));
      });
    }
  }

  public saveHeaderPopup() {
    this.isHeaderVisible = false;
    this.savedHeadersList = [];
    this.form.value.headers.forEach((item, index) => {
      if (item && item.headers && (item.headers !== '' || item.headers !== null)) {
        this.savedHeadersList.push(item.headers);
      }
    });
    for (var i = this.headersList.length; i >= 0; i--) {
      this.headersList.removeAt(i);
    }
    if (this.savedHeadersList.length !== 0) {
      this.savedHeadersList.forEach(item => {
        this.headersList.push(this.createHeader(item));
      });
    }
    this.tempJson.headers = [];
    if (this.savedHeadersList.length !== 0) {
      this.savedHeadersList.forEach(item => {
        this.tempJson.headers.push(item);
      });
    }
  }

  createHeader(item): UntypedFormGroup {
    return this.fb.group({
      headers: [item],
    });
  }

  removeApiList(index) {
    this.tempJson.apiDefinitions.splice(index, 1);
    if (this.tempJson.apiDefinitions.length == 0) {
      this.subscribeService.sendApi(true);
    }
  }

  getHeadersFormGroup(index): UntypedFormGroup {
    const formGroup = this.headersList.controls[index] as UntypedFormGroup;
    return formGroup;
  }

  public checkBasePathSlash() {
    if (this.tempJson.basePath && this.tempJson.basePath.charAt(0) !== '/') {
      this.tempJson.basePath = this.tempJson.basePath.replace(
        this.tempJson.basePath,
        '/' + this.tempJson.basePath,
      );
    } else if (this.tempJson.basePath == '' || this.tempJson.basePath === undefined) {
      this.tempJson.basePath = null;
    }
  }

  public onSaveDraft(): void {
    this.checkBasePathSlash();
    let flag = this.checkApiName() && this.checkMethod() && this.checkApi();
    if (this.checkPackgerValidation()) {
      let output = Object.assign({}, this.tempJson);
      output.singleApi = output.apiDefinitions.length === 1 ? true : false;
      output.apiDefinitions = this.checkApiPath(output.apiDefinitions);
      let result = this.objSchema.validate(output);
      const foundDuplicateName = output.apiDefinitions.find((nnn, index) => {
        return output.apiDefinitions.find((x, ind) => x.name === nnn.name && index !== ind);
      });
      if (result.error || !flag || foundDuplicateName) {
        if (!flag) {
          this.__alertService.responseMessage({
            status: 'failure',
            message: 'Either host or default host should be present',
          });
        }
        if (result.error) {
          this.__alertService.responseMessage({ status: 'failure', message: result.error });
        }
        if (foundDuplicateName) {
          this.__alertService.responseMessage({
            status: 'failure',
            message: 'Api name should be unique',
          });
        }
      } else {
        output = this._dataTransform(output);
        this.adapterData.schemaData.schema = JSON.stringify(output);
        this.adapterData.schemaData.messageSchemaPackager = JSON.stringify(output);
        if (this.nextClicked) {
          this.nextData();
        } else {
          this.saveData();
        }
      }
    }
  }

  public checkApiName() {
    var flag = true;
    this.tempJson.apiDefinitions.forEach(item => {
      console.log(item);
      if (item) {
        if (!item.name) {
          this.__alertService.responseMessage({ status: 'failure', message: 'Please enter name' });
        }
      }
    });
    return flag;
  }

  public checkMethod() {
    var flag = true;
    this.tempJson.apiDefinitions.forEach(item => {
      console.log(item);
      if (item) {
        if (!item.method) {
          this.__alertService.responseMessage({
            status: 'failure',
            message: 'Please select method',
          });
        }
      }
    });
    return flag;
  }

  public checkApi() {
    var flag = true;
    this.tempJson.apiDefinitions.forEach(item => {
      console.log(item);
      if (item) {
        if (!item.api) {
          this.__alertService.responseMessage({ status: 'failure', message: 'Please enter api' });
        }
      }
    });
    return flag;
  }

  public onNextClick(): void {
    this.nextClicked = true;
    this.onSaveDraft();
  }

  public onSaveDraftClick(): void {
    this.nextClicked = false;
    this.onSaveDraft();
  }

  private _dataTransform(data) {
    data = JSON.parse(JSON.stringify(data));
    data.apiDefinitions = data.apiDefinitions.map(item => {
      delete item.rawIncomingPackager;
      delete item.rawOutgoingPackager;
      delete item.multiple;
      if (item.outgoingConditionalPackager) {
        const payload = {};
        const outgoingConditionalPackager = JSON.parse(
          JSON.stringify(item.outgoingConditionalPackager),
        );
        outgoingConditionalPackager.forEach(it => {
          payload[it.name] = it.outgoingPackager;
        });
        item.outgoingConditionalPackager = payload;
      }
      return item;
    });
    return data;
  }

  public nextData() {
    this.adapterCommonService.saveData(
      this.adapterData,
      this.template,
      this.name,
      this.tabIndex,
      this.isEdit,
    );
    this._l1AdapterService.postNextSchemaDraft(this.adapterData).subscribe(item => {
      if (item.data) {
        this.adapterData.transformData = item?.data?.transformData;
        this.adapterCommonService.saveData(
          this.adapterData,
          this.template,
          this.name,
          this.tabIndex,
          this.isEdit,
        );
        this.tabValue.emit(1);
      }
    });
  }

  public checkApiPath(apiDefinitions) {
    for (let i = 0; i < apiDefinitions.length; i++) {
      if (apiDefinitions[i].api.charAt(0) !== '/') {
        apiDefinitions[i].api = '/' + apiDefinitions[i].api;
      }
      if (apiDefinitions[i].host == '') {
        apiDefinitions[i].host = null;
      }
    }
    return apiDefinitions;
  }

  /**
   * Tabs change
   */
  public tabChange() {
    this.tabValue.emit(1);
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
    this._l1AdapterService.postSchemaDraft(this.adapterData).subscribe(item => {
      if (item.data.id) {
        this.__alertService.responseMessage(item);
        this._store.dispatch(new GetL3AdapterById(item.data.id));
        this._store
          .pipe(takeUntil(this.componetDestroyed), select(selectL3AdapterById))
          .subscribe((response: any) => {
            if (response && response.data && response.data.transformData) {
              this.adapterData.transformData = response?.data?.transformData;
              this.adapterCommonService.saveData(
                this.adapterData,
                this.template,
                this.name,
                this.tabIndex,
                this.isEdit,
              );
            }
          });
      }
    });
  }

  public openHeaderPopup() {
    this.isHeaderVisible = true;
    if (this.readOnlyFlag) {
      this.form.disable();
    }
  }

  logobject(p) {
    var finalJsonObject = {
      attributes: [],
    };
    p = JSON.parse(p);
    for (var key in p) {
      if (key && typeof p[key] == 'string') {
        this.pushSimpleObject(finalJsonObject, key, 'STRING');
      } else if (key && typeof p[key] == 'object' && !Array.isArray(p[key])) {
        var childobject = this.processObject(key, p[key]);
        finalJsonObject.attributes.push(childobject);
      } else if (key && typeof p[key] == 'object' && Array.isArray(p[key])) {
        var nestedList = this.processList(key, p[key]);
        finalJsonObject.attributes.push(nestedList);
      } else if (key && typeof p[key] == 'number') {
        this.pushSimpleObject(finalJsonObject, key, 'INTEGER');
      } else if (key && typeof p[key] == 'boolean') {
        this.pushSimpleObject(finalJsonObject, key, 'BOOLEAN');
      }
    }
    return finalJsonObject;
  }

  processObject(keytext, valueobject, lengthflag = false) {
    var childobject = {
      name: keytext,
      type: 'fields',
      attributes: [],
      fieldsType: 'SIMPLE',
      isEditable: true,
      parent: null,
    };
    for (var key in valueobject) {
      if (key && typeof valueobject[key] == 'string') {
        this.pushSimpleObject(childobject, key, 'STRING');
      } else if (key && Array.isArray(valueobject[key])) {
        var nestedList = this.processList(key, valueobject[key]);
        childobject.attributes.push(nestedList);
      } else if (key && typeof valueobject[key] == 'object' && !Array.isArray(valueobject[key])) {
        var nestedobject = this.processObject(key, valueobject[key]);
        childobject.attributes.push(nestedobject);
      } else if (key && typeof valueobject[key] == 'number') {
        this.pushSimpleObject(childobject, key, 'INTEGER');
      } else if (key && typeof valueobject[key] == 'boolean') {
        this.pushSimpleObject(childobject, key, 'BOOLEAN');
      }
    }
    return childobject;
  }

  processList(keytext, valueobject, lengthflag = false) {
    var childobject = {
      type: 'fields',
      name: keytext,
      fieldsType: 'LIST',
      attributes: [],
      isEditable: true,
      parent: null,
    };
    if (valueobject.length) {
      for (var key in valueobject) {
        if (key && Array.isArray(valueobject[key])) {
          var nestedList = this.processList(key, valueobject[key], true);
          childobject.attributes.push(nestedList);
        } else if (key && typeof valueobject[key] == 'object' && !Array.isArray(valueobject[key])) {
          var nestedobject = this.processObject(key, valueobject[key], true);
          if (nestedobject.name === '0') {
            nestedobject.attributes.forEach(item => {
              childobject.attributes.push(item);
            });
          }
        } else {
          delete childobject.attributes;
          delete childobject.fieldsType;
          delete childobject.name;
          childobject['isSensitive'] = false;
          childobject['isHide'] = false;
          childobject['isPersist'] = true;
          childobject['alias'] = '';
          childobject.type = 'field';
          childobject['fieldType'] = 'LIST';
          childobject['fieldName'] = keytext;
        }
      }
    } else {
      delete childobject.attributes;
      delete childobject.fieldsType;
      delete childobject.name;
      childobject['isSensitive'] = false;
      childobject['isHide'] = false;
      childobject['isPersist'] = true;
      childobject['alias'] = '';
      childobject.type = 'field';
      childobject['fieldType'] = 'LIST';
      childobject['fieldName'] = keytext;
    }

    return childobject;
  }

  public checkAlphaWithUndernd(text) {
    const regex = /^[A-Za-z_]+$/;
    if (!regex.test(text)) {
      this.inValidFieldList.push(text);
    }
    return regex.test(text);
  }

  isFloat(value) {
    if (!isNaN(value) && value.toString().indexOf('.') != -1) {
      return true;
    }
    return false;
  }

  isInteger(n) {
    return n === +n && n === (n | 0);
  }

  isNumeric(num) {
    return !isNaN(num);
  }

  pushSimpleObject(finalObject, keytext, valuetype) {
    if (!this.isNumeric(keytext)) {
      var newStrObj = {
        type: 'field',
        fieldName: keytext,
        fieldType: valuetype,
        isSensitive: false,
        isHide: false,
        isPersist: true,
        alias: '',
        isEditable: true,
      };

      finalObject.attributes.push(newStrObj);
    }
  }
  /**
   * Reverts changes
   */
  public revertChanges(): void {
    this.shouldRevertChange = true;
    this.__alertService.responseMessage({
      status: 'success',
      message: 'Changes Reverted Successfully',
    });
  }

  public openRequestPayload(i, data) {
    this.currentIndex = i;
    this.isRequestPayloadVisible = true;
    this.responseActiveTab = 0;
    if (data.incomingPackager && data.incomingPackager.attributes.length > 0) {
      this.responseActiveTab = 1;
    }
    this.currentRequestItem = data;
    this.oldRequestItem = JSON.parse(JSON.stringify(data));
  }

  multipleResponse(event, currentResponseItem) {
    if (event.currentTarget.checked) {
      this.subscribeService.updateSelectedIMF(null);
      currentResponseItem.outgoingConditionalPackager = [];
      currentResponseItem.outgoingConditionalPackager.push({
        name: null,
        rawOutgoingPackager: null,
        outgoingPackager: null,
        isCollapse: false,
      });
    } else {
      currentResponseItem.outgoingConditionalPackager = null;
    }
  }

  public closeRequestPayload(currentRequestItem) {
    this.isRequestPayloadVisible = false;
    this.subscribeService.updateSelectedIMF(null);
    currentRequestItem.rawOutgoingPackager = null;
    currentRequestItem.incomingPackager = this.oldRequestItem.incomingPackager;
  }

  saveRequestPayload(currentRequestItem) {
    currentRequestItem.rawIncomingPackager = null;
    this.isRequestPayloadVisible = false;
  }

  saveResponsePayload(currentResponseItem) {
    this.subscribeService.sendItems(null);
    this.subscribeService.updateSelectedIMF(null);
    if (
      currentResponseItem &&
      currentResponseItem.outgoingPackager &&
      currentResponseItem.outgoingPackager.attributes.length > 0 &&
      !currentResponseItem.multiple
    ) {
      currentResponseItem.rawOutgoingPackager = null;
      this.isResponsePayloadVisible = false;
    }
    if (currentResponseItem.outgoingConditionalPackager && currentResponseItem.multiple) {
      currentResponseItem.outgoingPackager = null;
      currentResponseItem.rawOutgoingPackager = null;
      currentResponseItem.outgoingConditionalPackager.forEach(it => {
        delete it.isCollapse;
        it.rawOutgoingPackager = null;
        this.isResponsePayloadVisible = false;
      });
    }
  }

  public openResponsePayload(i, data) {
    this.currentIndex = i;
    this.isViewResVisible[this.currentIndex] = true;
    this.isResponsePayloadVisible = true;
    this.responseActiveTab = 0;
    this.currentResponseItem = data;
    this.oldResponseItem = JSON.parse(JSON.stringify(data));
    if (this.currentResponseItem.outgoingConditionalPackager && this.currentResponseItem.multiple) {
      this.responseActiveTab = 1;
      this.currentResponseItem.outgoingConditionalPackager.forEach(it => {
        it.isCollapse = false;
      });
    } else {
      if (data.outgoingPackager && data.outgoingPackager.attributes.length > 0) {
        this.responseActiveTab = 1;
      }
    }
    this.subscribeService.updateSelectedIMF(null);
  }

  public closeResponsePayload(currentResponseItem) {
    this.subscribeService.sendItems(null);
    this.subscribeService.updateSelectedIMF(null);
    this.isResponsePayloadVisible = false;
    if (this.oldResponseItem.multiple) {
      currentResponseItem.outgoingConditionalPackager =
        this.oldResponseItem.outgoingConditionalPackager;
    } else {
      currentResponseItem.outgoingPackager = this.oldResponseItem?.outgoingPackager;
    }
  }

  public editMode() {
    this.isEditMode = true;
  }

  public viewMode() {
    this.isEditMode = false;
  }

  public requestTransform(currentRequestItem) {
    this.inValidFieldList = [];
    if (currentRequestItem.rawIncomingPackager) {
      try {
        this._l1AdapterService
          .transformXmlpackager(currentRequestItem.rawIncomingPackager)
          .subscribe(item => {
            let currentReq = JSON.parse(item.data.responseData);
            currentRequestItem.incomingPackager = currentReq[0];
            this.requestActiveTab = 1;
            this.revertReqChanges = true;
            if (this.inValidFieldList.length > 0) {
              this.showInvalidFields();
            }
          });
      } catch (e) {
        this.__alertService.responseMessage({
          status: 'failure',
          message: 'Please enter valid xml',
        });
      }
    }
  }

  public IsJsonString(str) {
    try {
      JSON.parse(str);
    } catch (e) {
      return false;
    }
    return true;
  }

  public responseTransform(currentResponseItem) {
    this.inValidFieldList = [];
    if (currentResponseItem.rawOutgoingPackager) {
      try {
        this._l1AdapterService
          .transformXmlpackager(currentResponseItem.rawOutgoingPackager)
          .subscribe(item => {
            if (item) {
              this.responseActiveTab = 1;
              let currentReq = JSON.parse(item.data.responseData);
              currentResponseItem.outgoingPackager = currentReq[0];
              this.revertResChanges = true;
              if (this.inValidFieldList.length > 0) {
                this.showInvalidFields();
              }
            }
          });
      } catch (e) {
        this.__alertService.responseMessage({
          status: 'failure',
          message: 'Please enter valid xml',
        });
      }
    }
  }

  public responseMultiTransform(currentResponseItem) {
    this.inValidFieldList = [];
    if (this.nameMultiResp()) {
      currentResponseItem.outgoingConditionalPackager.map(mapitem => {
        if (mapitem.rawOutgoingPackager && mapitem.rawOutgoingPackager !== null) {
          try {
            this._l1AdapterService
              .transformXmlpackager(mapitem.rawOutgoingPackager)
              .subscribe(item => {
                if (item) {
                  this.responseActiveTab = 1;
                  let currentReq = JSON.parse(item.data.responseData);
                  mapitem.outgoingPackager = currentReq[0];
                  this.revertResChanges = true;
                  if (this.inValidFieldList.length > 0) {
                    this.showInvalidFields();
                  }
                }
              });
          } catch (e) {
            this.__alertService.responseMessage({
              status: 'failure',
              message: 'Please enter valid xml',
            });
          }
        }
      });
    }
    this.clickTransform = true;
  }

  public nameMultiResp() {
    let isValid = true;
    this.currentResponseItem.outgoingConditionalPackager.map(item => {
      if (!item.name && isValid) {
        this.__alertService.responseMessage({
          status: 'failure',
          message: 'Please Enter Name',
        });
        isValid = false;
      }
      isValid = this.checkValid(item.name);
    });
    return isValid;
  }

  public checkValid(name) {
    let isValid = true;
    const regex = new RegExp('(?!^ +$)^.+$');
    if (!regex.test(name) && isValid) {
      this.__alertService.responseMessage({
        status: 'failure',
        message: name + ' Please Enter Valid Name',
      });
      isValid = false;
    } else if (name == null) {
      this.__alertService.responseMessage({
        status: 'failure',
        message: 'Please Enter Name',
      });
      isValid = false;
    }
    return isValid;
  }

  addItem(currentResponseItem) {
    currentResponseItem.outgoingConditionalPackager.push({
      name: null,
      rawOutgoingPackager: null,
      outgoingPackager: null,
      isCollapse: false,
    });
  }

  removeItem(currentResponseItem, index) {
    currentResponseItem.outgoingConditionalPackager.splice(index, 1);
  }

  public requestFirstTab() {
    this.requestActiveTab = 0;
    this.revertReqChanges = false;
  }

  public requestSecondTab() {
    this.requestActiveTab = 1;
    this.revertReqChanges = false;
  }

  public responsetFirstTab() {
    this.responseActiveTab = 0;
    this.revertResChanges = false;
  }

  public responseSecondTab() {
    this.responseActiveTab = 1;
    this.revertResChanges = false;
  }

  showInvalidFields(): void {
    this.isVisibleInvalidField = true;
    this.inValidFields = null;
    this.inValidFields = this.inValidFieldList.toString();
  }

  handleOk(): void {
    this.isVisibleInvalidField = false;
  }

  handleCancel(): void {
    this.isVisibleInvalidField = false;
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
