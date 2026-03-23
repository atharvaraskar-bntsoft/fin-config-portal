import {
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { UntypedFormBuilder, UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ViewSettingGetObject } from '@app/models/view-settings.interface';
import { AdapterCommonService } from '@app/services/adapter-common.service';
import { selectNetwork } from '@app/store/selectors/l1-adapter.selectors';
import { selectViewSettingsList } from '@app/store/selectors/view-settings.selector';
import { select, Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Utils } from 'src/utils';
import { L1AdapterService } from '../../../services/l1-adapter.service';
import { DraftSchema, GetNetwork } from '../../../store/actions/l1-adapter.action';
import { IAppState } from '../../../store/state/app.state';
import { L1ConnectionManagmentComponent } from '../l1-connection-managment/l1-connection-managment.component';
import { AddNetworkComponent } from './../../../shared/add-network/add-network.component';

@Component({
  selector: 'app-network',
  templateUrl: './network.component.html',
  styleUrls: ['./network.component.scss'],
})
export class NetworkComponent implements OnInit, OnChanges, OnDestroy {
  public actionId = -1;
  public rows: any = [];
  public templateId: any;
  public loading = true;
  public connectionDetailsFormFlag: boolean = false;
  @Input() public widthConfig: any;
  @Input() public adapterData: any;
  @Input() public isEdit: any;
  @Input() public checkSingleProperties: boolean;
  public rowNetworkAll: any;
  public networkData: any;
  public type: any;
  public isCheck = false;
  public password: any;
  public showPasswrd = false;
  public fileValid = false;
  @Output() public formValidate: EventEmitter<boolean> = new EventEmitter<boolean>();
  public currentLang: string;
  public visibleNetwork = false;
  public visibleNetworkAnimate = false;
  public passwordValue: any;
  @Input() public readOnlyFlag = false;
  @Input() public name: any;
  @Input() public template: any;
  @Input() public tabIndex: any;
  @Output() public tabValue: EventEmitter<Object> = new EventEmitter<Object>();
  @Output() public isDisable: EventEmitter<Object> = new EventEmitter<boolean>();
  public formObj: any = {};
  public infoForm: UntypedFormGroup;
  public connectionManagement: any = {};
  public connectionManagementflag: boolean = false;
  public tcpmodeflag: boolean = false;
  public totals = 0;
  public finalData: any = [];
  public componetDestroyed = new Subject();
  public copyObj: any = {
    type: 'message',
    mandatory: false,
    label: null,
    key: null,
    isFile: false,
  };
  listvalueError: boolean;
  public tableSize = 'small';
  numbersOnly = Utils.numberOnly;

  constructor(
    public formBuilder: UntypedFormBuilder,
    public _l1AdapterService: L1AdapterService,
    private _store: Store<IAppState>,
    private changeDetector: ChangeDetectorRef,
    private translate: TranslateService,
    private dialog: MatDialog,
    public adpaterCommonService: AdapterCommonService,
  ) {
    this._store
      .pipe(takeUntil(this.componetDestroyed), select(selectNetwork))
      .subscribe((response: any) => {
        if (response) {
          this.networkData = Utils.newData(response.networkData);
          this.adapterData.networkData = this.networkData;
          this.loading = false;
          this.renderItem();
        }
      });
    this._store.pipe(select(selectViewSettingsList)).subscribe((response: ViewSettingGetObject) => {
      if (response) {
        this.currentLang = response.data.settingDto.language;
        translate.setDefaultLang(this.currentLang);
      }
    });
  }

  /**
   * Renders item
   */
  public renderItem() {
    const network = this.adpaterCommonService.getRenderData(
      this.networkData.properties.network,
      'network',
    );

    const networkBottom = network.filter(item => item.hidden);
    const networkTop = network.filter(item => !item.hidden);

    const message = this.adpaterCommonService.getRenderData(
      this.networkData.properties.message,
      'message',
    );

    const messageBottom = message.filter(item => item.hidden);
    const messageTop = message.filter(item => !item.hidden);

    let mergedData = this.adpaterCommonService.generateFinalData(
      networkTop,
      messageTop,
      this.formObj,
    );
    mergedData.sort((a, b) => {
      return a.mandatory === b.mandatory ? 0 : a.mandatory ? -1 : 1;
    });

    let mergedDataHidden = this.adpaterCommonService.generateFinalData(
      messageBottom,
      networkBottom,
      this.formObj,
    );
    mergedDataHidden.sort((a, b) => {
      return a.mandatory === b.mandatory ? 0 : a.mandatory ? -1 : 1;
    });

    this.infoForm = new UntypedFormGroup(this.formObj);
    if (this.readOnlyFlag) {
      this.infoForm.disable();
    }
    this.rows = [...mergedData, ...mergedDataHidden];
    this.totals = this.rows.length;
    this.infoForm.statusChanges.subscribe(val => {
      if (val === 'VALID') {
        this.formValidate.emit(true);
        this.isDisable.emit(false);
      } else {
        this.isDisable.emit(true);
        this.formValidate.emit(false);
      }
    });
  }

  /**
   * on init
   */
  public ngOnInit() {
    if (this.adapterData) {
      this.networkData = this.adapterData.networkData;
      if (!this.networkData.properties) {
        this._store.dispatch(new GetNetwork({ template: this.template.id }));
      } else {
        this.loading = false;
        this.renderItem();
      }
    } else {
      this.rows = [];
      this.networkData = null;
    }
  }

  /**
   * after content checked
   */
  ngAfterContentChecked(): void {
    this.changeDetector.detectChanges();
  }

  /**
   * Adds item
   */
  public addItem() {
    this.visibleNetwork = true;
    this.visibleNetworkAnimate = true;
    this.dialog
      .open(AddNetworkComponent, {
        data: {
          networkData: this.networkData,
          renderItem: this.renderItem,
        },
        width: '480px',
      })
      .afterClosed()
      .subscribe(res => {
        if (res === 'success') {
          this.renderItem();
        }
      });
  }

  /**
   * on changes
   * @param changes
   */
  public ngOnChanges(_changes: SimpleChanges): void {
    // Called before any other lifecycle hook. Use it to inject dependencies, but avoid any serious work here.
    // Add '${implements OnChanges}' to the class.
    if (this.adapterData) {
      this.networkData = this.adapterData?.networkData;
      if (
        this.adapterData &&
        this.adapterData.networkData &&
        this.adapterData.networkData.connectionManagement &&
        this.adapterData.networkData.connectionManagement.connections
      ) {
        this.connectionManagement = this.adapterData.networkData.connectionManagement;
        this.connectionManagementflag = true;
        this.connectionDetailsFormFlag = true;
      } else {
        this.connectionManagementflag = false;
      }
      this.adapterData?.networkData?.properties?.network.forEach(element => {
        if (element.field === 'tcp.mode') {
          this.tcpmodeflag = true;
        }
      });
      if (!this.networkData?.properties) {
        this._store.dispatch(new GetNetwork({ template: this.template.id }));
      } else {
        this.loading = false;
        this.renderItem();
      }
    } else {
      this.rows = [];
      this.networkData = null;
    }
  }

  /**
   * Shows password
   */
  public showPassword() {
    this.adpaterCommonService.togglePasswordField();
    this.showPasswrd = !this.showPasswrd;
  }

  /**
   * Tabs change
   */
  public tabChange() {
    this.networkData.persistRequired = 1;
    const rows = JSON.parse(JSON.stringify(this.rows));
    this.adapterData.networkData.properties.network = this.adpaterCommonService.dataTypeFilter(
      rows,
      'network',
    );
    this.adapterData.networkData.properties.message = this.adpaterCommonService.dataTypeFilter(
      rows,
      'message',
    );
    if (this.connectionDetailsFormFlag) {
      this.adapterData.networkData.connectionManagement = this.connectionManagement;
    }
    this.tabValue.emit(2);
  }

  /**
   * Prev tab value
   */
  public prevTabValue() {
    const rows = JSON.parse(JSON.stringify(this.rows));
    this.adapterData.networkData.properties.network = this.adpaterCommonService.dataTypeFilter(
      rows,
      'network',
    );
    this.adapterData.networkData.properties.message = this.adpaterCommonService.dataTypeFilter(
      rows,
      'message',
    );
    this.tabValue.emit(0);
  }

  /**
   * Removes item
   * @param data
   * @param index
   */
  removeItem(data, index) {
    const name = this.rows[index].label;
    this.removeValidation(data);
    if (data.mtype === 'message') {
      this.networkData.properties.message = this.networkData.properties.message.filter(
        item => item.field !== data.field,
      );
    } else {
      this.networkData.properties.network = this.networkData.properties.network.filter(
        item => item.field !== data.field,
      );
    }
    this.renderItem();
  }

  removeValidation(data) {
    const validation = [];
    data.mandatory = false;
    if (data.mandatory) {
      validation.push(Validators.required);
    } else {
      data.format = null;
    }
    data.field = data.field.replaceAll(data.mtype + '--', '');
    data.field = `${data.mtype}--${data.field}`;
    this.formObj[data.field] = new UntypedFormControl(data.value, validation);
  }

  /**
   * Drafts network
   */
  public draftNetwork() {
    if (this.infoForm.valid) {
      this.networkData.persistRequired = 1;
      if (this.isEdit) {
        this.adapterData.networkData.persistRequired = 1;
        this.adapterData.schemaData.persistRequired = 1;
        if (this.adapterData.transformData.requestMapping) {
          this.adapterData.transformData.persistRequired = 1;
          this.adapterData.responseCodeData.persistRequired = 1;
        }
      }
      this.adapterData.masterData.adapterDto.standardMessageSpecification.messageStandard = this
        .template
        ? this.template
        : null;
      this.adapterData.masterData.adapterDto.name = this.name ? this.name : null;
      this.adapterData.masterData.adapterDto.adapterId = Utils.schemaSlugify(this.name);
      this.adapterData.masterData.tabIndex = this.tabIndex;
      const rows = JSON.parse(JSON.stringify(this.rows));
      this.adapterData.networkData.properties.network = this.adpaterCommonService.dataTypeFilter(
        rows,
        'network',
      );
      if (this.connectionDetailsFormFlag) {
        this.adapterData.networkData.connectionManagement = this.connectionManagement;
      }
      this.adapterData.networkData.properties.message = this.adpaterCommonService.dataTypeFilter(
        rows,
        'message',
      );
      const draft = this.adapterData;
      this._store.dispatch(new DraftSchema(draft));
    } else {
      this.adpaterCommonService.validateAllF1Fields(this.infoForm);
    }
  }

  public connectionManagementDetails(data) {
    this.visibleNetwork = true;
    this.visibleNetworkAnimate = true;
    this.dialog
      .open(L1ConnectionManagmentComponent, {
        data: {
          connectionDetailsFormFlag: this.connectionDetailsFormFlag,
          connectionType: data,
          connectionManagement: this.connectionManagement,
          readOnlyFlag: this.readOnlyFlag,
        },
        width: '100%',
        height: '75%',
      })
      .afterClosed()
      .subscribe(res => {
        if (res && res.connectionDetailsFormFlag) {
          this.connectionDetailsFormFlag = true;
          this.connectionManagement = res.connectionManagement;
        }
      });
  }

  /**
   * Uploads file
   * @param event
   * @param data
   */
  public uploadFile(event, data) {
    const formData = new FormData();
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      this.infoForm.controls[data.field].setValue(event.target.value);
      const reader = new FileReader();
      const fileType =
        data.listvalues && data.listvalues.length > 1 ? data.listvalues.join() : data.listvalues;
      reader.readAsDataURL(file);
      reader.onload = (_e: any) => {
        formData.set('uplodedFile', file);
        formData.set('allowed-file-type', fileType);
        this._l1AdapterService.upload(formData).subscribe(item => {
          if (item && item.status !== 'failure') {
            data.value = item.data.id;
            data.fileName = item.data.name;
            this.fileValid = false;
          } else {
            this.fileValid = true;
          }
        });
      };
    }
  }

  /**
   * on destroy
   */
  public ngOnDestroy(): void {
    this.componetDestroyed.next();
    this.componetDestroyed.complete();
    this.componetDestroyed.unsubscribe();
  }
}
