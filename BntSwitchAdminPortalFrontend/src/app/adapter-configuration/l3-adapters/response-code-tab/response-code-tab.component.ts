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
import {
  selectInternalCode,
  SelectMessageContextList,
  selectVersionData,
} from '@app/store/selectors/l1-adapter.selectors';
import { Subject } from 'rxjs';
import { AlertService } from '@app/services/alert.service';
import { Router } from '@angular/router';
import { selectViewSettingsList } from '@app/store/selectors/view-settings.selector';
import { ViewSettingGetObject } from '@app/models/view-settings.interface';
import { TranslateService } from '@ngx-translate/core';
import { selectIMF } from '@app/store/selectors/scheme-imf-mapper.selectors';
import { debug } from 'console';

@Component({
  selector: 'app-response-code-tab',
  templateUrl: './response-code-tab.component.html',
  styleUrls: ['../l3-adapters.component.scss'],
})
export class ResponseCodeTabComponent implements OnInit {
  public responseCodeList = [];
  public responseCodeBackupList = [];
  public unReachCodeModel;
  public internalCodeList: any = [];
  public componetDestroyed = new Subject();
  @Input() public widthConfig: any;
  @Input() public adapterData: any;
  @Input() public name: any;
  @Input() public template: any;
  @Input() public tabIndex: any;
  @Input() public isEdit: any;
  @Input() public readOnlyFlag = false;
  public responseCodeData: any;
  public publishDisable = false;
  public componentResponseCodeFieldList = [];
  public ipcUiWrapper: any = {
    ipcList: [],
    defaultResponseCode: null,
    componentResponseCodeField: null,
  };
  public imfValue: any;
  @Output() public tabValue: EventEmitter<Object> = new EventEmitter<Object>();
  public imfList: any = [];
  public responseCode: any = null;
  public componentResponseCodeFieldName: any = null;
  public currentLang: string;
  constructor(
    private _store: Store<IAppState>,
    private alertService: AlertService,
    private _router: Router,
    private translate: TranslateService,
  ) {  }

  private transformLogic(data) {
    return data.map(item => {
      if (!item.attributes) {
        item.title = item.alias;
        item.key = item.nestedName;
        item.isLeaf = true;
      } else {
        item.title = item.name;
        item.key = item.nestedName;
        if (item.useCase !== '3') {
          item.disabled = true;
        }
      }
      if (item.attributes) {
        item.children = this.transformLogic(item.attributes);
      }
      return item;
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    this.imfList = this.transformLogic(this.imfList);
  }

  public ngOnInit() {
    this.responseCodeList.push({
      description: null,
      ipc: null,
      responseCode: null,
    });
    this._store.pipe(select(selectViewSettingsList)).subscribe((response: ViewSettingGetObject) => {
      if (response) {
        this.currentLang = response.data.settingDto.language;
        this.translate.setDefaultLang(this.currentLang);
      }
    });
    this._store.pipe(select(SelectMessageContextList)).subscribe((response: any) => {
      if (response && response.data) {
        this.imfList = this.transformLogic(response.data.messageContextFieldsByVersion.attributes);
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
        this.componentResponseCodeFieldName =
          this.responseCodeData.ipcUiWrapper.componentResponseCodeField;
      }
    }
    if (this.adapterData?.transformData.fieldSchemeImfMapperUiWrapper) {
      this.componentResponseCodeFieldList =
        this.adapterData?.transformData.fieldSchemeImfMapperUiWrapper.map(item => {
          item.id = item.fieldId;
          item.name = item.fieldName;
          return item;
        });
    }
  }

  public pushresponseCodeItem() {
    this.responseCodeData.persistRequired = 1;
    this.responseCodeList.push({
      description: null,
      ipc: null,
      responseCode: null,
    });
  }

  public pullresponseCodeItem(i) {
    this.responseCodeData.persistRequired = 1;
    this.responseCodeList.splice(i, 1);
  }


  public draftResponse(flag = true) {

    let isValid = true;
    const reg = new RegExp('^[0-9]+$');
    this.responseCodeList.map(item => {
      if (
        ((!item.responseCode || !item.ipc) && isValid) ||
        !this.componentResponseCodeFieldName ||
        !this.responseCode
      ) {
        isValid = false;
      }
    });
    if (isValid) {
      if (this.adapterData.responseCodeData.ipcUiWrapper) {
        this.adapterData.responseCodeData.ipcUiWrapper.defaultResponseCode = this.responseCode;
        this.adapterData.responseCodeData.ipcUiWrapper.componentResponseCodeField =
          this.componentResponseCodeFieldName;
        this.adapterData.responseCodeData.ipcUiWrapper.ipcList = this.responseCodeList;
      } else if (this.adapterData.responseCodeData.ipcUiWrapper == null) {
        this.adapterData.responseCodeData.ipcUiWrapper = this.ipcUiWrapper;
        this.adapterData.responseCodeData.ipcUiWrapper.defaultResponseCode = this.responseCode;
        this.adapterData.responseCodeData.ipcUiWrapper.componentResponseCodeField =
          this.componentResponseCodeFieldName;
        this.adapterData.responseCodeData.ipcUiWrapper.ipcList = this.responseCodeList;
      }
      this.adapterData.responseCodeData.persistRequired = 1;
      if (flag) {
        this._store.dispatch(new DraftSchema(this.adapterData));
      } else {
        this.tabValue.emit(4);
      }
    }else{
        if(!isValid){
            this.alertService.responseMessage({
                status: 'failure',
                message: 'Please enter mandatory fields',
              });
          }
    }
  }

  public versionData() {
    if (!this.publishDisable) {
      let isValid = true;
      this.responseCodeList.map(item => {
        if (
          ((!item.responseCode || !item.ipc) && isValid) ||
          !this.componentResponseCodeFieldName ||
          !this.responseCode
        ) {
          this.alertService.responseMessage({
            status: 'failure',
            message: 'Please enter mandatory fields',
          });
          isValid = false;
        }
      });
      if (isValid) {
        this.publishDisable = true;
        // this.adapterData.responseCodeData.ipcUiWrapper.ipcWrapperList = [this.adapterData.responseCodeData.ipcUiWrapper.ipcWrapperList[0]];
        // this.adapterData.responseCodeData.ipcUiWrapper.ipcWrapperList =
        // this.adapterData.responseCodeData.ipcUiWrapper.ipcWrapperList.concat(this.responseCodeList);
        if (this.adapterData.responseCodeData.ipcUiWrapper) {
          this.adapterData.responseCodeData.ipcUiWrapper.defaultResponseCode = this.responseCode;
          this.adapterData.responseCodeData.ipcUiWrapper.componentResponseCodeField =
            this.componentResponseCodeFieldName;
          this.adapterData.responseCodeData.ipcUiWrapper.ipcList = this.responseCodeList;
        } else if (this.adapterData.responseCodeData.ipcUiWrapper == null) {
          this.adapterData.responseCodeData.ipcUiWrapper = this.ipcUiWrapper;
          this.adapterData.responseCodeData.ipcUiWrapper.defaultResponseCode = this.responseCode;
          this.adapterData.responseCodeData.ipcUiWrapper.componentResponseCodeField =
            this.componentResponseCodeFieldName;
          this.adapterData.responseCodeData.ipcUiWrapper.ipcList = this.responseCodeList;
        }
        this.adapterData.responseCodeData.persistRequired = 1;
        this._store.dispatch(new VersionData(this.adapterData));
        this._store
          .pipe(takeUntil(this.componetDestroyed), select(selectVersionData))
          .subscribe((response: any) => {
            if (response && response.status === 'success') {
              this._router.navigateByUrl('/adapter-configuration/l1-adapters');
            }
          });
      }
    }
  }

  public prevTabValue() {
    this.tabValue.emit(2);
  }
  public tabChangeValue() {
    this.draftResponse(false);
  }

  validateResCode(value) {
    const regex = /^[ a-zA-Z0-9_]*$/;
    return regex.test(value.key);
  }

  isBtnDisabled() {
    let isValid = true;
    this.responseCodeList.map(item => {
      if (
        ((!item.responseCode || !item.ipc) && isValid) ||
        !this.componentResponseCodeFieldName ||
        !this.responseCode
      ) {
        isValid = false;
      }
    });
    return isValid;
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
