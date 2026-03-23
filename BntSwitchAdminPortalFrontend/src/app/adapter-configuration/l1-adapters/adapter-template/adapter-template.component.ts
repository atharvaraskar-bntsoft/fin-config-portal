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
  GetNameValidation,
  ClearState,
} from '@app/store/actions/l1-adapter.action';
import { Subject } from 'rxjs';
import {
  selectDownloadTemplate,
  selectUploadTemplate,
  selctNameValidation,
} from '@app/store/selectors/l1-adapter.selectors';
import * as FileSaver from 'file-saver';
import { selectViewSettingsList } from '@app/store/selectors/view-settings.selector';
import { ViewSettingGetObject } from '@app/models/view-settings.interface';
import { TranslateService } from '@ngx-translate/core';
import { AlertService } from '@app/services/alert.service';
import { Utils } from 'src/utils';
import { SubscribeService } from '@app/services/subscribe.services';
import { L1AdapterService } from '@app/services/l1-adapter.service';
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'adapter-template',
  templateUrl: './adapter-template.component.html',
  styleUrls: ['./adapter-template.component.scss'],
})
export class AdapterTemplateComponent implements OnInit, OnDestroy {
  @Input() templateValueList: any;
  isVisible = false;
  isOkLoading = false;
  isVisibleMultiPackager = false;
  @Input() formatValueList: any;
  @Input() format: any;
  @Input() getIfmList: any;
  @Input() template: any;
  @Input() name: any;
  @Input() adapterData: any;
  @Input() imfId: any;
  @Input() isDisable = false;
  @Input() isHttp_urlencoded = false;
  @Input() activeTab = 0;
  @Input() isJson = false;
  @Input() isXmlHttp = false;
  @Input() readOnlyFlag = false;
  @Input() singleProperty: any;
  @Input() public id: any;
  @Input() multiPackager: boolean = false;
  public tabData: string = 'Request';
  @Output() public changeTemplate: EventEmitter<Object> = new EventEmitter<Object>();
  @Output() public changeAdapterData: EventEmitter<Object> = new EventEmitter<Object>();
  @Output() public loader: EventEmitter<Object> = new EventEmitter<Object>();
  @Output() public checkSingleProperty: EventEmitter<any> = new EventEmitter<any>();
  @Output() public multiPackagerValue: EventEmitter<any> = new EventEmitter<any>();
  public componetDestroyed = new Subject();
  public oldimfId;
  public type = 'L1';
  public currentLang: string;
  public nameValidator = false;
  public nameValidationMessage: any;
  public adapterEdit: false;
  public selectedtemplate: any;
  selectedTemplate: any;

  constructor(
    private _store: Store<IAppState>,
    private translate: TranslateService,
    private alertService: AlertService,
    private _subscribeService: SubscribeService,
    private _l1AdapterService: L1AdapterService,
  ) {
    if (this.id) {
      this.adapterTemplateForm.get('name').disable();
    }
    this._store.pipe(select(selectViewSettingsList)).subscribe((response: ViewSettingGetObject) => {
      if (response) {
        this.currentLang = response.data.settingDto.language;
        translate.setDefaultLang(this.currentLang);
      }
    });
  }

  adapterTemplateForm = new UntypedFormGroup({
    name: new UntypedFormControl('', [Validators.required]),
    template: new UntypedFormControl('', [Validators.required]),
    singleProperty: new UntypedFormControl('', Validators.required),
    multiPackager: new UntypedFormControl('', Validators.required),
    imfId: new UntypedFormControl('', Validators.required),
  });

  public textCheck(event) {
    return Utils.checkAlphaWithUnderndDash(event?.key);
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
      .pipe(takeUntil(this.componetDestroyed), select(selectUploadTemplate))
      .subscribe((response: any) => {
        if (response) {
          this.loader.emit(false);
          this.adapterData = response.data;
          this.adapterData.networkData.properties.multiPackager = this.multiPackager;
          this.adapterData.networkData.properties.singleProperty = this.singleProperty;
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
    this._store.pipe(select(selctNameValidation)).subscribe((response: any) => {
      if (response) {
        this.nameValidator = response.data;
        this.nameValidationMessage = response.message;
      }
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['imfId'] && this.imfId) {
      this.oldimfId = JSON.parse(JSON.stringify(this.imfId));
    }
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
      this.showConfirm();
    }
    this.multiPackagerValue.emit(this.adapterData.networkData.properties.multiPackager);
  }

  showConfirm(): void {
    this.isVisibleMultiPackager = true;
    this.isOkLoading = false;
  }

  multiPackagerOk(): void {
    this.isOkLoading = true;
    this.isVisibleMultiPackager = false;
    setTimeout(() => {
      this.adapterData.schemaData.responsePackager = null;
      this.adapterData.schemaData.responseSchema = null;
      this.adapterData.networkData.properties.samePackager = false;
      this.adapterData.transformData.responseFieldSchemeImfMapperUiWrapper = [];
      this.adapterData.transformData.requestMapping.transactions.map(item => {
        if (item) {
          item.response.mappings = [];
        }
      });
    }, 1000);
  }

  multiPackagerCancel(): void {
    this.isVisibleMultiPackager = false;
    this.adapterData.networkData.properties.multiPackager = true;
    this.multiPackager = true;
  }

  public getTemplateFormat(eventData: any, flag = '', nameValue?: string) {
    this.selectedTemplate = eventData.value;
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
      const name = eventData && eventData.target && eventData.target.value?.trim();
      if (name == '') {
        this.nameValidator = false;
        this.nameValidationMessage = 'Name is required.';
      } else if (name && name.length && nameValue === 'nameValidator') {
        this._store.dispatch(new GetNameValidation(name));
      }
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

  downloadTemplate() {
    if (
      this.adapterData?.configurationId &&
      this.adapterData?.networkData?.properties?.multiPackager
    ) {
      this.downloadTemplateById();
    } else {
      this._store.dispatch(new DownloadTempleData({ template: this.template.id }));
    }
  }

  downloadTemplateById() {
    this._l1AdapterService
      .downloadL1AdapterbyId({ id: this.adapterData.configurationId, fileType: this.tabData })
      .subscribe((response: any) => {
        if (response) {
          FileSaver.saveAs(response, `${this.template.value}.xml`);
        }
      });
  }

  public onDocumentChange(event) {
    this.loader.emit(true);
    const formData = new FormData();
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (_e: any) => {
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

  public ngOnDestroy(): void {
    // Called once, before the instance is destroyed.
    // Add 'implements OnDestroy' to the class.
    this.componetDestroyed.next();
    this.componetDestroyed.complete();
    this.componetDestroyed.unsubscribe();
    this._store.dispatch(new ClearState());
  }
}
