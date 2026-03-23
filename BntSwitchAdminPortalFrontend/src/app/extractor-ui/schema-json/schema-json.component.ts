import { Component, OnInit, Input, Output, EventEmitter, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { IAppState } from '@app/store/state/app.state';
import { TranslateService } from '@ngx-translate/core';
import { AdapterCommonService } from '@app/services/adapter-common.service';
import { AlertService } from '@app/services/alert.service';
import { GetImfTypeListJson } from '@app/store/actions/imf-json.action';
import { takeUntil } from 'rxjs/operators';
import { GetImfTypeListJsonSuccess } from '@app/store/selectors/imf-json.selector';
import { L1AdapterService } from '@app/services/l1-adapter.service';
import { SubscribeService } from '@app/services/subscribe.services';
import * as _ from 'underscore';
import { NzDrawerRef } from 'ng-zorro-antd/drawer';
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

  public activeTab = 0;
  public currentItem: any;
  public rawIncomingPackager: any;
  public revertChanges: boolean = false;
  public isPayloadVisible: boolean = false;
  @Input() public jsonPayLoad: any;
  @Input() public tabIndex: any;
  @Input() public readOnlyFlag = false;
  @Input() public isEdit = false;
  @Input() public panels = [];
  @Input() public initialJson:any;
  public componetDestroyed = new Subject();
  public typeList: any = [];
  public inValidFieldList: any = [];
  public isVisibleInvalidField:boolean = false;
  public oldRequestItem: any;
  public isRequestPayloadVisible: boolean = false;



  public saveMethods: TSaveMethods;
  public versionMethods: TSaveMethods;
    inValidFields: any;


  constructor(public __alertService: AlertService,
    private subscribeService: SubscribeService, 
    private _store: Store<IAppState>,
    private translate: TranslateService,
    private drawerRef: NzDrawerRef<string>) {

    this._store.dispatch(new GetImfTypeListJson());
    this._store
      .pipe(takeUntil(this.componetDestroyed), select(GetImfTypeListJsonSuccess))
      .subscribe((response: any) => {
        if (response) {
          this.typeList = response['type-list'];
        }
      });

  }

  ngOnInit(): void {
    if (this.isEdit) {
      this.activeTab = 1;
      this.setInvalidField(this.jsonPayLoad);
      this.currentItem = {
        attributes: this.jsonPayLoad?.attributes
      }
      this.oldRequestItem = JSON.parse(JSON.stringify(this.currentItem));
    }
  }

  setInvalidField(item){
    item?.attributes?.forEach(element => {
       if(element.type === 'field'){
       element.isInvalid = this.checkAlphaWithUndernd(element.fieldName);
       }else{
           element.isInvalid = this.checkAlphaWithUndernd(element.name);
       }
       if(element && element?.attributes?.length > 0)
       this.setInvalidField(element);
    });
 }


 public checkAlphaWithUndernd(text) {
    const regex = /^[A-Za-z_]+$/;
    if(!regex.test(text)){
        this.inValidFieldList.push(text);
    }
    return regex.test(text);
  }



  ngOnChanges() {
    this.currentItem = {
      attributes: this.jsonPayLoad
    }
  }

  public requestTransform(rawIncomingPackager) {
    this.inValidFieldList = [];
    if (this.IsJsonString(rawIncomingPackager)) {
      this.activeTab = 1;
      this.currentItem = this.logobject(rawIncomingPackager);
      this.revertChanges = true;
      if(this.inValidFieldList.length > 0){
        this.showInvalidFields();
      }
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


  public firstTab() {
    this.activeTab = 0;
    this.revertChanges = false;
  }

  public secondTab() {
    this.activeTab = 1;
    this.revertChanges = false;
  }


  processObject(keytext, valueobject,lengthflag = false) {
    let isInvalidflag  =  true;
    if(!lengthflag){
        isInvalidflag = this.checkAlphaWithUndernd(keytext)
    }
    var childobject = {
      name: keytext,
      type: 'fields',
      attributes: [],
      fieldsType: 'SIMPLE',
      isEditable: true,
      parent: null,
      isInvalid:isInvalidflag
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

  processList(keytext, valueobject,lengthflag = false) {
    let isInvalidflag  =  true;
    if(!lengthflag){
        isInvalidflag = this.checkAlphaWithUndernd(keytext)
    }
    var childobject = {
      type: 'fields',
      name: keytext,
      fieldsType: 'LIST',
      attributes: [],
      isEditable: true,
      parent: null,
      isInvalid:isInvalidflag
    };
    if (valueobject.length) {
      for (var key in valueobject) {
        if (key && Array.isArray(valueobject[key])) {
          var nestedList = this.processList(key, valueobject[key],true);
          childobject.attributes.push(nestedList);
        } else if (key && typeof valueobject[key] == 'object' && !Array.isArray(valueobject[key])) {
          var nestedobject = this.processObject(key, valueobject[key],true);
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
        isInvalid:this.checkAlphaWithUndernd(keytext)
      };
      finalObject.attributes.push(newStrObj);
    }
  }

  ngOnDestroy(): void {
    // throw new Error('Method not implemented.');
  }

  isNumeric(num) {
    return !isNaN(num);
  }

  saveJson() {
    this.drawerRef.close({
      action: 'save',
      jsonPayload: this.currentItem
    });
  }

  showInvalidFields(): void {
    this.isVisibleInvalidField = true;
    this.inValidFields = null;
    this.inValidFields  = this.inValidFieldList.toString();
  }

  saveRequestPayload(){
    if(this.deleteInValidFieldandValidate(this.currentItem)){
        this.saveJson();
    }
  }

  public closeRequestPayload() {
    this.subscribeService.updateSelectedIMF(null);
    this.currentItem =  this.oldRequestItem;
    this.deleteInValidField(this.currentItem);
    this.drawerRef.close({
        action: 'close',
        jsonPayload: this.currentItem
      });
  }



  deleteInValidFieldandValidate(data:any):boolean{
    let flag = true;
    if(data && data.attributes.length > 0){
        data.attributes.forEach(element => {
            if(element.isInvalid){
                delete element.isInvalid;
                if(element?.attributes?.length > 0){
                    this.deleteInValidFieldandValidate(element);
                }
            }else{
                flag =  false;
                    throw this.__alertService.responseMessage({
                        status: 'failure',
                        message: 'Please enter valid Field Name',
               });
            }
         });
    }
    return flag;
  }

  deleteInValidField(data:any):void{
    if(data && data.attributes.length > 0){
        data.attributes.forEach(element => {
            if(element){
                delete element.isInvalid;
                if(element?.attributes?.length > 0){
                    this.deleteInValidField(element);
                }
            }
         });
    }
  }

  handleOk(): void {
    this.isVisibleInvalidField = false;
  }

  handleCancel(): void {
    this.isVisibleInvalidField = false;
  }


  closeJson() {
    this.drawerRef.close({
      action: 'close',
    });
  };


}
