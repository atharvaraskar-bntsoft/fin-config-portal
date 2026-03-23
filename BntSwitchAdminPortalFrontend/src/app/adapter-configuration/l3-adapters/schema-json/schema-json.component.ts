import { Component, OnInit, Input, Output, EventEmitter, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { IAppState } from '@app/store/state/app.state';
import { TranslateService } from '@ngx-translate/core';
import { AdapterCommonService } from '@app/services/adapter-common.service';
import { UntypedFormGroup, Validators, UntypedFormArray, UntypedFormBuilder } from '@angular/forms';
import * as Joi from '@hapi/joi';
import { AlertService } from '@app/services/alert.service';
import { GetImfTypeListJson } from '@app/store/actions/imf-json.action';
import { takeUntil } from 'rxjs/operators';
import { GetImfTypeListJsonSuccess } from '@app/store/selectors/imf-json.selector';
import { GetL3AdapterById } from '@app/store/actions/l3-adapter.action';
import { L1AdapterService } from '@app/services/l1-adapter.service';
import { selectL3AdapterById } from '@app/store/selectors/l3-adapter.selectors';
import { SubscribeService } from '@app/services/subscribe.services';
import * as _ from 'underscore';
import { RxwebValidators } from '@rxweb/reactive-form-validators';
import { NavigationEnd, Router } from '@angular/router';

declare var jQuery: any;
export type TSaveMethods = {
  store;
  reducer;
  currentItem;
};
@Component({
  selector: 'app-schema-json',
  templateUrl: './schema-json.component.html',
  styleUrls: ['./schema-json.component.scss'],
})
export class SchemaJsonComponent implements OnInit, OnDestroy {
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
  public schemaDraftResponse = true;
  public headers = [];
  public selectedApi;
  public selectedApiList = [];
  public ruleIcon = false;
  public isVisibleInvalidField:boolean = false;
  public tempJson = {
    basePath: null,
    defaultHost: null,
    singleApi: false,
    headers: [],
    defaultRole: null,
    apiDefinitions: [
      {
        name: null,
        api: '/',
        host: null,
        healthApi: null,
        method: null,
        incomingPackager: null,
        outgoingPackager: null,
      },
    ],
  };
  nextClicked = false;
  inValidFields: any;
  public tableSize = 'small';
  public showTable = false;
  public inValidFieldList: any = [];
  public oldRequestItem: any;
  public oldResponseItem: any;
  public validPackgerFieldName:boolean = true ;
  public isHeaderVisible = false;
  public methodList = ['GET', 'POST', 'PUT', 'DELETE'];
  public isRequestPayloadVisible: boolean = false;
  public isResponsePayloadVisible: boolean = false;
  public visibleRolePopup:boolean = false;
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
  public requestObj: any;
  public responseObj: any;
  public currentIndex: any;
  public attributes: any = {};
  public isViewResVisible: any = [];
  public isViewReqVisible: any = [];
  public savedHeadersList: any = [];
  public httpreg = /^([$]({[a-zA-Z0-9_]+:(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+})|((?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+))$/;
  public apiNameReg = /^(?! )[a-zA-Z0-9 ]+(?<! )$/
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
    defaultHost: Joi.string().optional().allow('', null),
    singleApi: Joi.boolean().required(),
    headers: Joi.array().items(Joi.string().optional().allow(null)).optional(),
    defaultRole: Joi.string().optional().allow(null),
    apiDefinitions: Joi.array()
      .items(
        Joi.object().keys({
          name: Joi.string().pattern(this.apiNameReg).required(),
          api: Joi.string(),
          host: Joi.string().optional().allow(null),
          healthApi: Joi.string().optional().allow(null),
          method: Joi.string().required(),
          incomingPackager: Joi.object().optional().allow(null),
          outgoingPackager: Joi.object().optional().allow(null),
        }),
      )
      .valid(),
  });

  public headersList: UntypedFormArray;
  public apisList: UntypedFormArray;
  public form: UntypedFormGroup;
  @Output() public tabValue: EventEmitter<Object> = new EventEmitter<Object>();
  public componetDestroyed = new Subject();
  public requestActiveTab = 0;
  public responseActiveTab = 0;
  public readOnly: boolean = false;

  constructor(
    public __alertService: AlertService,
    private fb: UntypedFormBuilder,
    private _l1AdapterService: L1AdapterService,
    private _store: Store<IAppState>,
    private translate: TranslateService,
    private adapterCommonService: AdapterCommonService,
    private subscribeService: SubscribeService,
    private router: Router
  ) {
    this._store.dispatch(new GetImfTypeListJson());
    this._store
      .pipe(takeUntil(this.componetDestroyed), select(GetImfTypeListJsonSuccess))
      .subscribe((response: any) => {
        if (response) {
          this.typeList = response['type-list'];
        }
      });

    this.subscribeService.getItems().subscribe(res => {
      if (res) {
        if (res.source == 'request') {
          this.jsonData[this.currentIndex]['attributes'] = res.attributes;
          this.getapiFormGroup(this.currentIndex).patchValue({
            incomingPackager: this.jsonData[this.currentIndex],
          });
        } else if (res.source == 'response') {
          this.resJsonData[this.currentIndex]['attributes'] = res.attributes;
          this.getapiFormGroup(this.currentIndex).patchValue({
            outgoingPackager: this.resJsonData[this.currentIndex],
          });
        }
      }
    });
  }

  /**
   * on init
   */
  public ngOnInit() {
    this.form = this.fb.group({
      basePath: [this.tempJson.basePath],
      defaultHost: [this.tempJson.defaultHost],
      headers: this.fb.array([]),
      defaultRole: this.tempJson.defaultRole,
      apiDefinitions: this.fb.array([
        this.createApis({
          api: '/',
          name: null,
          host: null,
          healthApi : null,
          method: null,
          incomingPackager: null,
          outgoingPackager: null,
        }),
      ]),
    });
    this.headersList = this.form.get('headers') as UntypedFormArray;
    this.apisList = this.form.get('apiDefinitions') as UntypedFormArray;

    if (this.adapterData && this.id) {
      this.renderItem();
    } else {
      this.rows = [];
      this.totals = 0;
      this.schemaData = null;
    }

  }

  /**
   * Gets header form group
   */
  get headerFormGroup() {
    return this.form.get('headers') as UntypedFormArray;
  }

  get apisFormGroup() {
    return this.form.get('apiDefinitions') as UntypedFormArray;
  }

  /**
   * Gets headers form group
   * @param index
   * @returns headers form group
   */
  getHeadersFormGroup(index): UntypedFormGroup {
    const formGroup = this.headersList.controls[index] as UntypedFormGroup;
    return formGroup;
  }

  getapiFormGroup(index): UntypedFormGroup {
    const formGroup = this.apisList.controls[index] as UntypedFormGroup;
    return formGroup;
  }

  checkPackgerValidation(output:any) {
  let flag = true;
  output.apiDefinitions.forEach(item => {
    if (item) {
      if (!item.outgoingPackager && !item.incomingPackager) {
        this.__alertService.responseMessage({ status: 'failure', message: 'Please Add Either Request Payload or Response Payload' });
        flag = false;
      }
    }
  });
  return flag;
}

  private setValue(data) {
    this.form.patchValue({
      basePath: data.basePath,
    });

    this.tempJson.defaultHost = data.defaultHost;
    this.form.patchValue({
     defaultHost: data.defaultHost,
   });

  if(data?.defaultRole?.length >=1){
    this.tempJson.defaultRole = data?.defaultRole?.split(",");
   this.form.patchValue({
    defaultRole: data?.defaultRole,
  });
  }

    this.removeApiList(0);
    data.apiDefinitions.forEach((item, index) => {
      this.apisList.push(this.createApis(item, index));
    });
    this.removeHeader(0);
    data.headers.forEach(item => {
      this.headersList.push(this.createHeader(item));
    });
    data.headers.forEach(item => {
      this.savedHeadersList.push(item);
    });
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
      this.form.disable()
    }

  }

  /**
   * Creates header
   * @returns header
   */
  createHeader(item): UntypedFormGroup {
    return this.fb.group({
      headers: [item],
    });
  }

  createApis(item, index?): UntypedFormGroup {
    this.jsonData[index] = item.incomingPackager;
    this.resJsonData[index] = item.outgoingPackager;
    this.reqData[index] = null;
    this.resData[index] = null;
    return this.fb.group({
      name: [item.name, Validators.compose([Validators.required, RxwebValidators.unique()])],
      api: [item.api],
      host:[item.host],
      healthApi: [item.healthApi],
      method: [item.method, Validators.compose([Validators.required])],
      incomingPackager: [item.incomingPackager],
      outgoingPackager: [item.outgoingPackager],
    });
  }

  /**
   * Adds header from
   */
  addApiList() {
    this.apisList.push(
      this.createApis({
        api: '/',
        name: null,
        host: null,
        healthApi: null,
        method: 'GET',
        incomingPackager: null,
        outgoingPackager: null,
      }),
    );
    this.jsonData.push({
      attributes: [],
    });
    this.resJsonData.push({
      attributes: [],
    });
  }

  /**
   * Removes header
   * @param index
   */
  removeApiList(index) {
    this.jsonData.splice(index, 1);
    this.resJsonData.splice(index, 1);
    this.reqData.splice(index, 1);
    this.resData.splice(index, 1);
    this.apisList.removeAt(index);
  }

  /**
   * Determines whether submit on
   */
  onValidateAndSubmit() {
    if(this.tempJson?.defaultRole?.length >= 1){
      this.form.value.defaultRole = this.tempJson?.defaultRole?.join(",");
    }
    if (this.form.valid) {
      this.checkBasePathSlash();
      let flag= this.checkdefaultHost();
      let output = Object.assign({}, this.form.value);
      output.headers = output.headers.map(item => item.headers);
      output.singleApi = output.apiDefinitions.length === 1 ? true : false;
      output.apiDefinitions = this.checkApiPath(output.apiDefinitions);
      if (this.checkPackgerValidation(output)) {
      let result = this.objSchema.validate(output);
      if (result.error || !flag) {
          if(!flag){
            this.__alertService.responseMessage({ status: 'failure', message: 'Either host or default host should be present' });
          }
          if(result.error){
            this.__alertService.responseMessage({ status: 'failure', message: result.error });
          }
      } else {
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
  }

  public onNextClick(): void {
    this.nextClicked = true;
    if (this.readOnlyFlag)
      this.nextData();
  }

  public onSaveDraftClick(): void {
    this.nextClicked = false;
  }

  get getFormName() {
    return this.form;
  }

  public nextData() {
    this.adapterCommonService.saveData(this.adapterData, this.template, this.name, this.tabIndex, this.isEdit);
    this._l1AdapterService.postNextSchemaDraft(this.adapterData).subscribe(item => {
      if (item.data) {
        this.adapterData.transformData = item?.data?.transformData;
        this.adapterCommonService.saveData(
          this.adapterData,
          this.template,
          this.name,
          this.tabIndex,
          this.isEdit
        );
        // this.subscribeService.setAddApiSchemaData(true);
        this.tabValue.emit(1);
      }
    });
  }

  public checkApiPath(apiDefinitions) {
    for (let i = 0; i < apiDefinitions.length; i++) {
      if (apiDefinitions[i].api.charAt(0) !== '/') {
        apiDefinitions[i].api = '/' + apiDefinitions[i].api;
      }
      if(apiDefinitions[i].host == ""){
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
    this.adapterCommonService.saveData(this.adapterData, this.template, this.name, this.tabIndex, this.isEdit);
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
                this.isEdit
              );
              //   this.subscribeService.setAddApiSchemaData(true);
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

  public closeHeaderPopup() {
    this.isHeaderVisible = false;
    for (var i = this.headersList.length; i >= 0; i--) {
      this.headersList.removeAt(i);
    }

    if(this.savedHeadersList.length!==0){
      this.savedHeadersList.forEach(item => {
        this.headersList.push(this.createHeader(item));
      });
    }

  }

  public saveHeaderPopup() {
    this.isHeaderVisible = false;
    this.savedHeadersList = [];
    this.form.value.headers.forEach((item,index) => {
      if(item && item.headers && (item.headers !== "" || item.headers !== null)){
        this.savedHeadersList.push(item.headers);
      }
    });
    for (var i = this.headersList.length; i >= 0; i--) {
      this.headersList.removeAt(i);
    }
    if(this.savedHeadersList.length!==0){
      this.savedHeadersList.forEach(item => {
        this.headersList.push(this.createHeader(item));
      });
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

  processObject(keytext, valueobject) {
    var childobject = {
      name: keytext,
      type: 'fields',
      attributes: [],
      fieldsType: 'SIMPLE',
      isEditable: true,
      parent: null
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

  processList(keytext, valueobject) {
    var childobject = {
      type: 'fields',
      name: keytext,
      fieldsType: 'LIST',
      attributes: [],
      isEditable: true,
      parent: null
    };
    if (valueobject.length) {
      for (var key in valueobject) {
        if (key && Array.isArray(valueobject[key])) {
          var nestedList = this.processList(key, valueobject[key]);
          childobject.attributes.push(nestedList);
        } else if (key && typeof valueobject[key] == 'object' && !Array.isArray(valueobject[key])) {
          var nestedobject = this.processObject(key, valueobject[key]);
          if(nestedobject.name === '0'){
            nestedobject.attributes.forEach(item=>{
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

  isFloat(value) {
    //alert(value+" : " +value.toString().indexOf('.'));
    if (!isNaN(value) && value.toString().indexOf('.') != -1) {
      return true;
    }
    return false;
  }

  isInteger(n) {
    return n === +n && n === (n | 0);
  }

  public checkAlphaWithUndernd(text) {
    const regex = /^[A-Za-z_]+$/;
    if(!regex.test(text)){
        this.inValidFieldList.push(text);
    }
    return regex.test(text);
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
        isEditable: true
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

  /**
   * Adds header from
   */
  addHeadersFrom() {
    this.headersList.push(this.createHeader(null));
  }

  /**
   * Removes header
   * @param index
   */
  removeHeader(index) {
    this.headersList.removeAt(index);
  }

  public openRequestPayload(i) {
    this.currentIndex = i;
    this.isViewReqVisible[this.currentIndex] = true;
    this.isRequestPayloadVisible = true;
    if (
      this.jsonData &&
      this.jsonData[this.currentIndex] &&
      this.jsonData[this.currentIndex].attributes.length
    ) {
        this.oldRequestItem = JSON.parse(JSON.stringify(this.jsonData[this.currentIndex]));
      this.requestActiveTab = 1;
      this.isViewReqVisible[this.currentIndex] = false;
    } else {
      this.requestActiveTab = 0;
    }
    this.subscribeService.updateSelectedIMF(null);
  }


 saveRequestPayload(){
    if(
      this.jsonData &&
      this.jsonData[this.currentIndex] &&
      this.jsonData[this.currentIndex].attributes.length
    ) {
            this.getapiFormGroup(this.currentIndex).patchValue({
                incomingPackager: this.jsonData[this.currentIndex],
              });
            this.isRequestPayloadVisible = false;
            this.reqData[this.currentIndex] = null;
            this.subscribeService.updateSelectedIMF(null);
            this.revertReqChanges = false;
    }
  }



  public closeRequestPayload() {
    if (
      this.jsonData &&
      this.jsonData[this.currentIndex] &&
      this.jsonData[this.currentIndex].attributes.length
    ) {
     this.jsonData[this.currentIndex] =   this.oldRequestItem;
    }
    this.reqData[this.currentIndex] = null;
    this.subscribeService.updateSelectedIMF(null);
    this.revertReqChanges = false;
    this.isRequestPayloadVisible = false;
  }


  public openResponsePayload(i) {
    this.currentIndex = i;
    this.isViewResVisible[this.currentIndex] = true;
    this.isResponsePayloadVisible = true;
    if (
      this.resJsonData &&
      this.resJsonData[this.currentIndex] &&
      this.resJsonData[this.currentIndex].attributes.length
    ) {
        this.oldResponseItem = JSON.parse(JSON.stringify(this.resJsonData[this.currentIndex]));
      this.isViewResVisible[this.currentIndex] = false;
      this.responseActiveTab = 1;
    } else {
      this.responseActiveTab = 0;
    }
    this.subscribeService.updateSelectedIMF(null);
  }

  public closeResponsePayload() {
    if (
      this.resJsonData &&
      this.resJsonData[this.currentIndex] &&
      this.resJsonData[this.currentIndex].attributes.length
    ) {
     this.resJsonData[this.currentIndex] = this.oldResponseItem;
    }
    this.isResponsePayloadVisible = false;
    this.responseObj = null;
    this.resData[this.currentIndex] = null;
    this.subscribeService.updateSelectedIMF(null);
    this.revertResChanges = false
  }


  saveResponsePayload(){
    this.subscribeService.sendItems(null);
    if (
      this.resJsonData &&
      this.resJsonData[this.currentIndex] &&
      this.resJsonData[this.currentIndex].attributes.length
    ) {
      this.getapiFormGroup(this.currentIndex).patchValue({
        outgoingPackager: this.resJsonData[this.currentIndex],
      });
      this.isResponsePayloadVisible = false;
      this.responseObj = null;
    this.resData[this.currentIndex] = null;
    this.subscribeService.updateSelectedIMF(null);
    this.revertResChanges = false
    }

  }

  public editMode() {
    this.isEditMode = true;
  }

  public viewMode() {
    this.isEditMode = false;
  }

  public requestTransform() {
    this.inValidFieldList = [];
    if (this.IsJsonString(this.reqData[this.currentIndex])) {
      this.requestActiveTab = 1;
      this.jsonData[this.currentIndex] = this.logobject(this.reqData[this.currentIndex]);
      this.revertReqChanges = true;
    } else {
      this.__alertService.responseMessage({
        status: 'failure',
        message: 'Please enter valid json',
      });
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

  public responseTransform() {
    this.inValidFieldList = [];
    if (this.IsJsonString(this.resData[this.currentIndex])) {
      this.responseActiveTab = 1;
      this.resJsonData[this.currentIndex] = this.logobject(this.resData[this.currentIndex]);
      this.revertResChanges = true;
      this.responseObj = null;
    } else {
      this.__alertService.responseMessage({
        status: 'failure',
        message: 'Please enter valid json',
      });
    }
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
    this.revertResChanges = false;
    this.responseActiveTab = 0;
  }

  public responseSecondTab() {
    this.revertResChanges = false;
    this.responseActiveTab = 1;
  }

  public checkBasePathSlash() {
    if (this.form.value.basePath && this.form.value.basePath.charAt(0) !== '/') {
      this.form.value.basePath = this.form.value.basePath.replace(
        this.form.value.basePath,
        '/' + this.form.value.basePath,
      );
    } else if (this.form.value.basePath == '' || this.form.value.basePath === undefined) {
      this.form.value.basePath = null;
    }
  }

  public checkdefaultHost() {
      var flag = true;
    if (this.form.value.defaultHost == '' || this.form.value.defaultHost === undefined) {
      this.form.value.defaultHost = null;
    }
    if(!this.form.value.defaultHost){
        this.form.value.apiDefinitions.forEach(element => {
              if(!element.host){
                  flag = false;
              }
        });
    }
    return flag;
  }

  handleOk(): void {
    this.isVisibleInvalidField = false;
  }

  handleCancel(): void {
    this.isVisibleInvalidField = false;
  }

  addRole() {
    this.visibleRolePopup = true;
  }

  closePopup(event: any): void {
    this.visibleRolePopup = event;
  }

  saveRoles(event: any): void {
    if (event) {
      this.tempJson.defaultRole = event;
      this.visibleRolePopup = false;
    }
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
