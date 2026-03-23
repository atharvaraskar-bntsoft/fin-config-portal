import { AdapterCommonService } from '@app/services/adapter-common.service';
import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { DraftSchema } from '../../../store/actions/l1-adapter.action';
import { GetL3Network } from '../../../store/actions/l3-adapter.action';
import { Store, select } from '@ngrx/store';
import { IAppState } from '../../../store/state/app.state';
import { takeUntil } from 'rxjs/operators';
import { selectL3Network } from '@app/store/selectors/l3-adapter.selectors';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';
import { UntypedFormBuilder, UntypedFormGroup, UntypedFormControl, Validators } from '@angular/forms';
import { L1AdapterService } from '../../../services/l1-adapter.service';
import { selectViewSettingsList } from '@app/store/selectors/view-settings.selector';
import { ViewSettingGetObject } from '@app/models/view-settings.interface';
import { TranslateService } from '@ngx-translate/core';
import { AlertService } from '@app/services/alert.service';
import { AddNetworkComponent } from '@app/shared/add-network/add-network.component';
import { MatDialog } from '@angular/material/dialog';
import { Utils } from 'src/utils';
import { SubscribeService } from '@app/services/subscribe.services';
import { ConnectionManagmentComponent } from '../connection-managment/connection-managment.component';

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
  @Input() public adapterData: any;
  @Input() public isEdit: any;
  public rowNetworkAll: any;
  public networkData: any;
  public type: any;
  public isCheck = false;
  public password: any;
  public showPasswrd = false;
  public fileValid = false;
  public currentLang: string;
  public passwordValue: any;
  public isServiceDisable = false;
  public visibleNetwork = false;
  public visibleNetworkAnimate = false;
  public connectionDetailsFormFlag: boolean = false;
  public isServicePart = false;
  @Input() public readOnlyFlag = false;
  public copyObj: any = {
    type: 'message',
    mandatory: false,
    label: null,
    key: null,
    isFile: false,
  };
  listvalueError: boolean;
  @Input() public name: any;
  @Input() public isJson = false;
  @Input() public template: any;
  @Input() public tabIndex: any;
  @Output() public tabValue: EventEmitter<Object> = new EventEmitter<Object>();
  @Output() public isDisable: EventEmitter<Object> = new EventEmitter<Boolean>();
  public formObj: any = {};
  public infoForm: UntypedFormGroup;
  public totals = 0;
  public finalData: any = [];
  public connectionManagement: any = {};
  public connectionManagementflag: boolean = false;
  public tcpmodeflag: boolean = false;
  public componetDestroyed = new Subject();
  public tableSize = 'small';
  constructor(
    public formBuilder: UntypedFormBuilder,
    private alertService: AlertService,
    public _l1AdapterService: L1AdapterService,
    private _store: Store<IAppState>,
    private translate: TranslateService,
    private router: Router,
    private dialog: MatDialog,
    public adpaterCommonService: AdapterCommonService,
    private subscribeService: SubscribeService,
  ) {
    this.subscribeService.getServiceType().subscribe(res => {
      if (res) {
        this.isServicePart = res;
      }
    });

    this._store.pipe(select(selectViewSettingsList)).subscribe((response: ViewSettingGetObject) => {
      if (response) {
        this.currentLang = response.data.settingDto.language;
        this.translate.setDefaultLang(this.currentLang);
      }
    });
  }

  removeItem(data, index) {
    const name = this.rows[index].label;
    this.removeValidation(data);
    switch (data.mtype) {
      case 'message':
        this.networkData.properties.message = this.networkData.properties.message.filter(
          item => item.field !== data.field,
        );
        break;
      default:
        this.networkData.properties.network = this.networkData.properties.network.filter(
          item => item.field !== data.field,
        );
        break;
    }
    this.renderItem();
  }

  public renderItem() {

    this.networkData.properties.network.map(item => {
      if (item.field === 'component.service.type') {
		if (!item.listvalues || item.listvalues.length === 0) {
		     item.listvalues = [item.value];
		   }
		item.listvalues = (item.listvalues ?? []).filter(x => x !== 'GATEWAY_SERVICE');
        if (item.value === 'GATEWAY_SERVICE') {
          item.value = 'AUTH_SERVICE';
        }
      }
      return item;
    });

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
    mergedData.sort((a, b) => (a.mandatory === b.mandatory ? 0 : a.mandatory ? -1 : 1));

    let mergedDataHidden = this.adpaterCommonService.generateFinalData(
      messageBottom,
      networkBottom,
      this.formObj,
    );
    mergedDataHidden.sort((a, b) => (a.mandatory === b.mandatory ? 0 : a.mandatory ? -1 : 1));

    this.rows = [...mergedData, ...mergedDataHidden];
    this.infoForm = new UntypedFormGroup(this.formObj);
    if (this.readOnlyFlag) {
      this.infoForm.disable();
    }
    this.totals = this.rows.length;
    this.infoForm.statusChanges.subscribe(val => {
      if (val === 'VALID') {
        this.isDisable.emit(false);
      } else {
        this.isDisable.emit(true);
      }
    });
  }

  public ngOnInit() {
    if (this.adapterData) {
      this._store
        .pipe(takeUntil(this.componetDestroyed), select(selectL3Network))
        .subscribe((response: any) => {
          if (response && response.networkData && response.networkData.properties.network) {
            this.networkData = response.networkData;
            this.networkData.properties.network = this.networkData.properties.network.map(item => {
              if (item.field === 'component.service.type') {
				item.listvalues = (item.listvalues ?? []).filter(x => x !== 'GATEWAY_SERVICE');
                if (item.value === 'GATEWAY_SERVICE') {
                  item.value = 'AUTH_SERVICE';
                }
              }
              return item;
            });
            this.adapterData.networkData = this.networkData;
            this.loading = false;
            this.renderItem();
          }
        });
      this.networkData = this.adapterData.networkData;
      if (!this.networkData.properties) {
        this._store.dispatch(new GetL3Network({ template: this.template.id }));
      } else {
        this.loading = false;
        this.renderItem();
      }
    } else {
      this.rows = [];
      this.networkData = null;
    }
    if (this.router.url.indexOf('create') !== -1) {
      this.isServiceDisable = false;
    } else {
      this.isServiceDisable = true;
    }
  }

  public numberOnly(event): boolean {
    const charCode = event.which ? event.which : event.keyCode;
    if (charCode === 45 || charCode === 95) {
      return true;
    } else if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  }

  public ngOnChanges(changes: SimpleChanges): void {
    // Called before any other lifecycle hook. Use it to inject dependencies, but avoid any serious work here.
    // Add '${implements OnChanges}' to the class.
    if (this.adapterData) {
      if (this.isJson) {
        this.connectionDetailsFormFlag = true;
      }
      this._store
        .pipe(takeUntil(this.componetDestroyed), select(selectL3Network))
        .subscribe((response: any) => {
          if (response && response.networkData && response.networkData?.properties?.network) {
            this.networkData = response.networkData;
            this.networkData.properties.network = this.networkData?.properties?.network.map(
              item => {
                if (item.field === 'component.service.type') {
					item.listvalues = (item.listvalues ?? []).filter(x => x !== 'GATEWAY_SERVICE');
                  if (item.value === 'GATEWAY_SERVICE') {
                    item.value = 'AUTH_SERVICE';
                  }
                }
                return item;
              },
            );
            this.adapterData.networkData = this.networkData;
            this.loading = false;
            this.renderItem();
          }
        });
      this.networkData = this.adapterData.networkData;
      if (
        this.adapterData &&
        this.adapterData.networkData &&
        this.adapterData.networkData.connectionManagement &&
        this.adapterData.networkData.connectionManagement.connections
      ) {
        this.connectionManagement = this.adapterData?.networkData?.connectionManagement;
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
      if (!this.networkData.properties) {
        this._store.dispatch(new GetL3Network({ template: this.template.id }));
      } else {
        this.loading = false;
        this.renderItem();
      }
    } else {
      this.rows = [];
      this.networkData = null;
    }
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

  public getType(val) {
    if (val === null) {
      return 'null';
    } else if (val === undefined) {
      return 'undefined';
    } else if (val.constructor === Array) {
      return 'array';
    } else if (val.constructor === Object) {
      return 'object';
    } else if (val.constructor === String) {
      return 'string';
    } else if (val.constructor === Number) {
      return 'number';
    } else if (val.constructor === Boolean) {
      return 'boolean';
    } else if (val.constructor === Function) {
      return 'function';
    } else {
      return 'object';
    }
  }

  public checkPassword(data) {
    if (data.label.toLowerCase().includes('password')) {
      const count = data.value.length;
      const sign = '*';
      this.passwordValue = sign.repeat(count);
      return true;
    } else {
      return false;
    }
  }

  public showPassword() {
    this.adpaterCommonService.togglePasswordField();
    this.showPasswrd = !this.showPasswrd;
  }

  public tabChange() {
    const rows = JSON.parse(JSON.stringify(this.rows));
    this.adapterData.networkData.properties.network = this.adpaterCommonService.dataTypeFilter(
      rows,
      'network',
    );
    this.adapterData.networkData.properties.message = this.adpaterCommonService.dataTypeFilter(
      rows,
      'message',
    );
    this.networkData.persistRequired = 1;
    if (this.connectionDetailsFormFlag) {
      this.adapterData.networkData.connectionManagement = this.connectionManagement;
    }
    this.tabValue.emit(2);
  }

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

  public connectionManagementDetails(data) {
    this.visibleNetwork = true;
    this.visibleNetworkAnimate = true;
    this.dialog
      .open(ConnectionManagmentComponent, {
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

  public draftNetwork() {
    if (this.infoForm.valid) {
      this.networkData.persistRequired = 1;
      if (this.isEdit) {
        this.adapterData.networkData.persistRequired = 1;
        this.adapterData.schemaData.persistRequired = 1;
        if (this.adapterData.transformData.requestMapping) {
          this.adapterData.transformData.persistRequired = 1;
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
      this.adapterData.networkData.properties.message = this.adpaterCommonService.dataTypeFilter(
        rows,
        'message',
      );
      if (this.connectionDetailsFormFlag) {
        this.adapterData.networkData.connectionManagement = this.connectionManagement;
      }
      const draft = this.adapterData;
      this._store.dispatch(new DraftSchema(draft));
    } else {
      this.adpaterCommonService.validateAllF1Fields(this.infoForm);
    }
  }

  public uploadFile(event, data) {
    const formData = new FormData();
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      this.infoForm.controls[data.field].setValue(event.target.value);
      const reader = new FileReader();
      const fileType =
        data.listvalues && data.listvalues.length > 1 ? data.listvalues.join() : data.listvalues;
      reader.readAsDataURL(file);
      reader.onload = (e: any) => {
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

  public ngOnDestroy(): void {
    this.componetDestroyed.next();
    this.componetDestroyed.complete();
    this.componetDestroyed.unsubscribe();
  }
}
