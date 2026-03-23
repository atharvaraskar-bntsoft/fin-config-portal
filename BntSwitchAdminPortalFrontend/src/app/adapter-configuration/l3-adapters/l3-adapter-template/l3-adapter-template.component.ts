import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  OnDestroy,
  SimpleChanges,
} from '@angular/core';
import { select, Store } from '@ngrx/store';
import { IAppState } from '../../../store/state/app.state';
import { takeUntil } from 'rxjs/operators';
import {
  DownloadTempleData,
  UploadTemplate,
  ClearState,
  GetNameValidation,
  DownloadTempleByID,
} from '@app/store/actions/l1-adapter.action';
import { Subject } from 'rxjs';
import {
  selctNameValidation,
  selectDownloadByIDTemplate,
  selectDownloadTemplate,
  selectUploadTemplate,
} from '@app/store/selectors/l1-adapter.selectors';
import * as FileSaver from 'file-saver';
import { Utils } from 'src/utils';
import { AlertService } from '@app/services/alert.service';
import { TranslateService } from '@ngx-translate/core';
import { selectViewSettingsList } from '@app/store/selectors/view-settings.selector';
import { ViewSettingGetObject } from '@app/models/view-settings.interface';
import { SubscribeService } from '@app/services/subscribe.services';
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';
@Component({
  selector: 'l3-adapter-template',
  templateUrl: './l3-adapter-template.component.html',
  styleUrls: ['./l3-adapter-template.component.scss'],
})
export class L3AdapterTemplateComponent implements OnInit, OnDestroy {
  @Input() public templateValueList: any;
  @Input() public format: any;
  @Input() public getIfmList: any;
  @Input() public template: any;
  @Input() activeTab = 0;
  @Input() public name: any;
  @Input() public adapterData: any;
  @Input() public id: any;
  @Input() public readOnlyFlag = false;
  public nameValidator = false;
  public currentLang: string;
  public nameValidationMessage: any;
  @Input() public imfId: any;
  @Input() public isDisable = false;
  @Input() public isHttp_urlencoded = false;
  @Input() public isJson = false;
  @Input() singleProperty: any;
  @Output() public changeTemplate: EventEmitter<Object> = new EventEmitter<Object>();
  @Output() public changeAdapterData: EventEmitter<Object> = new EventEmitter<Object>();
  @Output() public loader: EventEmitter<Object> = new EventEmitter<Object>();
  @Output() public checkSingleProperty: EventEmitter<any> = new EventEmitter<any>();
  @Output() public multiPackagerValue: EventEmitter<any> = new EventEmitter<any>();
  public componetDestroyed = new Subject();
  public type = 'L3';
  @Input() public multiPackager: boolean = false;
  public oldimfId;
  public tabData: string = 'Request';
  isVisible = false;
  isOkLoading = false;
  confirmModal?: NzModalRef; // For testing by now
  constructor(
    private _store: Store<IAppState>,
    private alertService: AlertService,
    private translate: TranslateService,
    private _subscribeService: SubscribeService,
    private modal: NzModalService,
  ) {
    this._store.pipe(select(selctNameValidation)).subscribe((response: any) => {
      if (response) {
        this.nameValidator = response.data;
        this.nameValidationMessage = response.message;
      }
    });
    this._store.pipe(select(selectViewSettingsList)).subscribe((response: ViewSettingGetObject) => {
      if (response) {
        this.currentLang = response.data.settingDto.language;
        translate.setDefaultLang(this.currentLang);
      }
    });
  }
  adapterTemplateForm = new UntypedFormGroup({
    name: new UntypedFormControl('', Validators.required),
    template: new UntypedFormControl('', [Validators.required]),
    singleProperty: new UntypedFormControl('', Validators.required),
    multiPackager: new UntypedFormControl('', Validators.required),
    imfId: new UntypedFormControl('', Validators.required),
  });

  public textCheck(event) {
    return Utils.checkAlphaWithUnderndDash(event.key);
  }

  public ngOnInit() {
    if (this.id) {
      this.adapterTemplateForm.get('name').disable();
    }
    this.imfId = {
      version: 0,
    };
    this._subscribeService.getCurrentTabValue().subscribe(res => {
      if (res) {
        this.tabData = res;
      }
    });
    this._store
      .pipe(takeUntil(this.componetDestroyed), select(selectDownloadTemplate))
      .subscribe((response: any) => {
        if (response) {
          FileSaver.saveAs(response, `${this.template.value}.xml`);
        }
      });

    this._store
      .pipe(takeUntil(this.componetDestroyed), select(selectDownloadByIDTemplate))
      .subscribe((response: any) => {
        if (response) {
          FileSaver.saveAs(response, `${this.template.value}.xml`);
        }
      });

    this._store
      .pipe(takeUntil(this.componetDestroyed), select(selectUploadTemplate))
      .subscribe((response: any) => {
        if (response) {
          this.loader.emit(false);
          this.adapterData = response.data;
          this.adapterData.networkData.properties.multiPackager = this.multiPackager;
          this.adapterData.networkData.properties.singleProperty = this.singleProperty;
          this.id = this.adapterData.configurationId;
          this.changeAdapterData.emit(response.data);
        }
      });
    this.alertService
      .getLoader()
      .pipe(takeUntil(this.componetDestroyed))
      .subscribe(data => {
        if (data === false) {
          this.loader.emit(false);
        }
      });
  }

  changeSinglePRoperty(event) {
    this.adapterData.networkData.properties.singleProperty = event.checked;
    this.singleProperty = event.checked;
    this.checkSingleProperty.emit(this.singleProperty);
  }

  changeMultiPackager(event) {
    this._subscribeService.setCurrentTabValue('Request');
    this.adapterData.networkData.properties.multiPackager = event.checked;
    this.multiPackager = event.checked;
    if (!this.multiPackager) {
      this.adapterData.schemaData.responsePackager = null;
      this.adapterData.schemaData.responseSchema = null;
      this.adapterData.networkData.properties.samePackager = false;
      this.adapterData.transformData.responseFieldSchemeImfMapperUiWrapper = [];
      if (this.adapterData.transformData.requestMapping) {
        this.showConfirm();
      }
    }
    this.multiPackagerValue.emit(this.adapterData.networkData.properties.multiPackager);
  }

  showConfirm(): void {
    this.confirmModal = this.modal.confirm({
      nzTitle: 'Do you Want to Uncheck Multi-Packager ?',
      nzContent: 'When clicked the OK button, we will be lose response mappings',
      nzOnOk: () =>
        new Promise((resolve, reject) => {
          setTimeout(Math.random() > 0.5 ? resolve : reject, 1000);
          this.adapterData.transformData.requestMapping.transactions.map(item => {
            if (item) {
              item.response.mappings = [];
            }
          });
        }).catch(() => console.log('Oops errors!')),
    });
  }

  public getTemplateFormat(eventData: any, flag = '', nameValue?: string) {
    if (flag === 'imf') {
      if (this.imfId.id === this.oldimfId.id && this.imfId.version !== this.oldimfId.version) {
        this.imfId.version = this.oldimfId.version;
      }
      this.isVisible = true;
    } else {
      this.getIfmList = [...this.getIfmList];
      const data = {
        name: this.name,
        templateData: this.template,
        imfId: this.imfId,
        isFromImfSelection: false,
      };
      this.changeTemplate.emit(data);
      const name = eventData && eventData.target && eventData.target.value;
      if (name == '') {
        this.nameValidator = false;
        this.nameValidationMessage = 'Name is required.';
      } else if (name && name.length && nameValue === 'nameValidator') {
        this._store.dispatch(new GetNameValidation(name));
      }
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['imfId'] && this.imfId) {
      this.oldimfId = JSON.parse(JSON.stringify(this.imfId));
    }
  }

  public downloadTemplate() {
    if (this.id === null) {
      this._store.dispatch(new DownloadTempleData({ template: this.template.id }));
    } else {
      this._store.dispatch(new DownloadTempleByID({ id: this.id, fileType: this.tabData }));
    }
  }

  public onDocumentChange(event) {
    this.loader.emit(true);
    const formData = new FormData();
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        formData.set('templateFile', file);
        formData.set('fileType', this.tabData);
        formData.set('templateId', this.template.id);
        formData.set('name', this.name);
        formData.set('imfId', this.imfId.id);
        formData.set('type', this.type);
        this._store.dispatch(new UploadTemplate({ formData: formData }));
      };
    }
  }

  handleOk(): void {
    this.isOkLoading = true;
    setTimeout(() => {
      this.isVisible = false;
      this.isOkLoading = false;
      if (this.adapterData && this.adapterData.masterData) {
        this.imfId = this.getIfmList.find(
          imf => imf.version === this.adapterTemplateForm.get('imfId').value,
        );
        this.oldimfId = JSON.parse(JSON.stringify(this.imfId));
        this.adapterData.imfId = this.imfId;
        const data = {
          name: this.name,
          templateData: this.template,
          imfId: this.imfId,
          isFromImfSelection: true,
        };
        this.changeTemplate.emit(data);
      }
    }, 1000);
  }

  handleCancel(): void {
    this.isVisible = false;
    this.adapterTemplateForm.patchValue({ imfId: this.oldimfId.id });
  }

  public ngOnDestroy(): void {
    // Called once, before the instance is destroyed.
    // Add 'implements OnDestroy' to the class.
    this.componetDestroyed.next();
    this.componetDestroyed.complete();
    this.componetDestroyed.unsubscribe();
    this._store.dispatch(new ClearState());
  }
}
