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

export type TSaveMethods = {
  store;
  reducer;
  currentItem;
};

@Component({
  selector: 'app-http-urlencoded',
  templateUrl: './http-urlencoded.component.html',
  styleUrls: ['./http-urlencoded.component.scss'],
})
export class HttpUrlencodedComponent implements OnInit, OnDestroy {
  @Input() public schemaById: any;
  shouldRevertChange: boolean;
  @Input() public rows: any = [];
  @Input() public readOnlyFlag = false;
  public totals = 0;
  public loading = true;
  @Input() public widthConfig = [];
  @Input() public name: any;
  @Input() public template: any;
  @Input() public adapterData: any;
  @Input() public tabIndex: any;
  @Input() public schemaData: any;
  @Input() public id: any;
  @Input() public isEdit = false;
  @Input() public checkSingleProperties: boolean;
  public schemaDraftResponse = true;
  public headers = [];
  public selectedApi;
  public selectedApiList = [];
  public ruleIcon = false;
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
        method: null,
        incomingPackager: null,
        outgoingPackager: null,
      },
    ],
  };
  public isVisibleInvalidField: boolean = false;
  public inValidFieldList: any = [];
  public oldRequestItem: any;
  public oldResponseItem: any;
  public validPackgerFieldName: boolean = true;
  inValidFields: any;
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
  public requestObj: any;
  public responseObj: any;
  public currentIndex: any;
  public attributes: any = {};
  public isViewResVisible: any = [];
  public isViewReqVisible: any = [];
  public savedHeadersList: any = [];
  public visibleRolePopup: boolean = false;
  public httpreg =
    /^([$]({[a-z_]+:(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+})|((?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+))$/;
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
    defaultRole: Joi.string().optional().allow(null),
    apiDefinitions: Joi.array()
      .items(
        Joi.object().keys({
          name: Joi.string().pattern(this.apiNameReg).required(),
          api: Joi.string().required(),
          host: Joi.string().pattern(this.httpreg).optional().allow(null),
          method: Joi.string().required(),
          incomingPackager: Joi.object().required(),
          outgoingPackager: Joi.object().required(),
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
      defaultHost: [this.tempJson.defaultHost, [Validators.pattern(this.httpreg)]],
      headers: this.fb.array([]),
      defaultRole: this.tempJson.defaultRole,
      apiDefinitions: this.fb.array([
        this.createApis({
          api: '/',
          name: null,
          host: null,
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

  get getFormName() {
    return this.form;
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

  private setValue(data) {
    this.form.patchValue({
      basePath: data.basePath,
    });
    this.form.patchValue({
      defaultHost: data.defaultHost,
    });
    this.tempJson.defaultHost = data.defaultHost;

    if (data?.defaultRole?.length >= 1) {
      this.form.patchValue({
        defaultRole: data?.defaultRole,
      });
      this.tempJson.defaultRole = data?.defaultRole.split(',');
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
    if (this.readOnlyFlag) {
      this.form.disable();
    }
  }
  /**
   * Renders item
   */
  public renderItem() {
    if (this.adapterData.schemaData.schema) {
      this.adapterData.schemaData.schema = JSON.parse(this.adapterData.schemaData.schema);
      this.setValue(this.adapterData.schemaData.schema);
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
      api: [item.api, Validators.compose([Validators.required])],
      host: [item.host],
      method: [item.method, Validators.compose([Validators.required])],
      incomingPackager: [item.incomingPackager, Validators.compose([Validators.required])],
      outgoingPackager: [item.outgoingPackager, Validators.compose([Validators.required])],
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
    if (this.tempJson?.defaultRole?.length >= 1) {
      this.form.value.defaultRole = this.tempJson?.defaultRole?.join(',');
    }
    if (this.form.valid) {
      this.checkBasePathSlash();
      this.checkdefaultHost();
      let output = Object.assign({}, this.form.value);
      output.headers = output.headers.map(item => item.headers);
      output.singleApi = output.apiDefinitions.length === 1 ? true : false;
      output.apiDefinitions = this.checkApiPath(output.apiDefinitions);
      let result = this.objSchema.validate(output);
      const foundDuplicateName = output.apiDefinitions.find((nnn, index) => {
        return output.apiDefinitions.find((x, ind) => x.name === nnn.name && index !== ind);
      });
      if (result.error || foundDuplicateName) {
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

  public onNextClick(): void {
    this.nextClicked = true;
    if (this.readOnlyFlag) this.nextData();
  }

  public onSaveDraftClick(): void {
    this.nextClicked = false;
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
  }

  logobject(p) {
    var finalJsonObject = {
      attributes: [],
    };
    const myfields = p.split('\n');
    myfields.forEach(element => {
      var newStrObj = {
        type: 'field',
        fieldName: element.replace('.', '&#46;'),
        alias: element,
        fieldType: 'STRING',
        isSensitive: false,
        isHide: false,
        isPersist: true,
        isEditable: true,
      };
      finalJsonObject.attributes.push(newStrObj);
    });
    return finalJsonObject;
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

  public checkAlphaWithUndernd(text) {
    const regex = /^[A-Za-z_.]+$/;
    if (!regex.test(text)) {
      this.inValidFieldList.push(text);
    }
    return regex.test(text);
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
      this.isRequestPayloadVisible = true;
      this.responseActiveTab = 1;
      this.oldRequestItem = JSON.parse(JSON.stringify(this.jsonData[this.currentIndex]));
    } else {
      this.requestActiveTab = 0;
    }
    this.subscribeService.updateSelectedIMF(null);
  }

  saveRequestPayload() {
    if (
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
      this.jsonData[this.currentIndex] = this.oldRequestItem;
    }
    this.reqData[this.currentIndex] = null;
    this.subscribeService.updateSelectedIMF(null);
    this.revertReqChanges = false;
    this.isRequestPayloadVisible = false;
  }

  public openResponsePayload(i) {
    this.currentIndex = i;
    this.isResponsePayloadVisible = true;
    if (
      this.resJsonData &&
      this.resJsonData[this.currentIndex] &&
      this.resJsonData[this.currentIndex].attributes.length
    ) {
      this.oldResponseItem = JSON.parse(JSON.stringify(this.resJsonData[this.currentIndex]));
      this.isViewResVisible[this.currentIndex] = false;
      this.isResponsePayloadVisible = true;
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
      this.isResponsePayloadVisible = false;
    }
    this.responseObj = null;
    this.resData[this.currentIndex] = null;
    this.subscribeService.updateSelectedIMF(null);
    this.revertResChanges = false;
  }

  saveResponsePayload() {
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
      this.revertResChanges = false;
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
    this.requestActiveTab = 1;
    this.jsonData[this.currentIndex] = this.logobject(this.reqData[this.currentIndex]);
    this.revertReqChanges = true;
    if (this.inValidFieldList.length > 0) {
      this.showInvalidFields();
    }
  }

  checkAlphaWithUnderndDash(text) {
    const regex = /^(?! *$)[a-zA-Z._(\r|\n)-]+(?<!(\r|\n)$)$/;
    return regex.test(text);
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
    this.responseActiveTab = 1;
    this.resJsonData[this.currentIndex] = this.logobject(this.resData[this.currentIndex]);
    this.revertResChanges = true;
    if (this.inValidFieldList.length > 0) {
      this.showInvalidFields();
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
    if (!this.form.value.defaultHost) {
      this.form.value.apiDefinitions.forEach(element => {
        if (!element.host) {
          flag = false;
        } else {
          flag = true;
        }
      });
    }
    return flag;
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
