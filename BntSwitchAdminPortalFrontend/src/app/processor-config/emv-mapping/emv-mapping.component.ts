import { CheckUniqueName, CreateEMVData } from './../../store/actions/emv-data.action';
import { Subscription, Observable } from 'rxjs';
import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { IAppState } from '@app/store/state/app.state';
import { Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import { GetEMVData } from '@app/store/actions/emv-data.action';
import { emvCreated, emvTableSelector, emvValidName } from '@app/store/selectors/emv.selector';
import { selectDeviceTypes } from '@app/store/selectors/device.selectors';
import { GetDeviceTypes } from '@app/store/actions/device.action';
import { AlertService } from '@app/services/alert.service';
declare var jQuery: any;

@Component({
  selector: 'app-emv-mapping',
  templateUrl: './emv-mapping.component.html',
  styleUrls: ['./emv-mapping.component.scss'],
})
export class EmvMappingComponent implements OnInit {
  subscription: Subscription[] = [];
  public currentPagination = '20';
  rows = [];
  headerHeight = 35;
  rowHeight = 50;
  columns = [];
  isVisible = false;
  public loading = true;
  private _page = 1;
  public request: boolean = true;
  title = 'Upload EMV Data';
  emvForm = {
    device: null,
    modelName: null,
    data: null,
  };
  deviceList = [];
  isValidName: Observable<boolean>;
  id: string;
  totalElements: number;
  XMLdata: any;
  @ViewChild('action', { static: true }) action: TemplateRef<any>;
  @ViewChild('active', { static: true }) active: TemplateRef<any>;
  @ViewChild('version', { static: true }) version: TemplateRef<any>;
  @ViewChild('emvData', { static: true }) emvData: TemplateRef<HTMLElement>;
  @ViewChild('myTable', { static: true }) table;
  editorOptions = {theme: 'vs-dark', language: 'xml'};
  isXMLDataVisible: boolean;

  constructor(
    private _store: Store<IAppState>,
    private alertService: AlertService,
    private translate: TranslateService,
  ) {  }

  ngOnInit(): void {
    this._store.dispatch(new GetDeviceTypes());
    this.loading = true;
    this.loadPage(this._page);
    this.isValidName = this._store.select(emvValidName);
    this.subscription.push(
      // Insert all the store selector here
      this._store.select(emvTableSelector).subscribe(res => {
        if (res) {
          if (res && this._page === 1) {
            this.rows = res && res.deviceModeList;
          } else if (this.rows.length !== 0 && res) {
            this.rows = this.rows.concat(res.deviceModeList);
          }
          this.rows.forEach(row => {
            let len = row.deviceModelConfiguration.length;
            row.verion = null;
            row.active = null;
            row.emvData = null;
            row.version = row.deviceModelConfiguration[len - 1].version;
            row.active = row.deviceModelConfiguration[len - 1]?.active;
            row.emvData = row.deviceModelConfiguration[len - 1].emvData;
            row.fileName = row.deviceModelConfiguration[len - 1]?.configurationData;
          });
          this.totalElements = this.rows.length ?? res.totalElements;
          this.loading = false;
        }
      }),
      // Get Column Names
      this.translate
        .get(['ACTIVE', 'MODEL_NAME', 'VERSION', 'DeviceTypes', 'VIEW_EMV_DATA'])
        .subscribe(translation => {
          this.columns = [
            { prop: 'modelName', name: translation.MODEL_NAME },
            { prop: 'deviceType.code', name: translation.DeviceTypes },
            {
              prop: 'version',
              name: translation.VERSION,
              sortable: false,
              cellTemplate: this.version,
            },
            { prop: 'fileName', name: 'File Name' },
            {
              prop: 'active',
              name: translation?.ACTIVE,
              sortable: false,
              cellTemplate: this.active,
            },
            {
              prop: '',
              name: translation.VIEW_EMV_DATA, 
              sortable: false,
              cellTemplate: this.emvData,
            },
          ];
        }),

      // Get Device List
      this._store.select(selectDeviceTypes).subscribe(response => {
        if (response) {
          this.deviceList = response;
        }
      }),
      this._store.select(emvCreated).subscribe(res => {
        if (res && res.status === 'success') {
          this._store.dispatch(new GetEMVData());
        }
      }),
    );
  }

  onScroll($event) {
    const THis = this;
    jQuery('.datatable-body').on('scroll', function () {
      let div = jQuery(this).get(0);
      if (div.scrollTop + div.clientHeight >= div.scrollHeight) {
        if (THis.request) {
          THis._page = ++THis._page;
          THis.loadPage(THis._page);
        }
      }
    });
  }

  private loadPage(pagenumber: number) {
    // set the loading flag, which serves two purposes:
    // 1) it prevents the same page from being loaded twice
    // 2) it enables display of the loading indicator
    this._store.dispatch(
      new GetEMVData({
        page: pagenumber,
        'page-size': this.currentPagination,
      }),
    );
    this.request = false;
  }

  updateTableRow($event, row) {
    row.active = $event?.active;
    row.emvData = $event.emvData;
    row.fileName = $event.configurationData;
  }

  cancel() {
    this.isVisible = false;
    this.resetForm();
  }

  selectedFile($event) {
    this.emvForm.data = $event[0];
  }

  isNameValid({ target }) {
    const newUrl = `${this.emvForm.device}/${this.emvForm.modelName}`;
    this._store.dispatch(new CheckUniqueName(newUrl));
  }

  submitEMV() {
    const { data, device, modelName } = this.emvForm;
    if (data) {
      const formData = new FormData();
      formData.append('uplodedFile', data);
      formData.set('uplodedFile', data);
      formData.set('deviceType', device);
      formData.set('modelName', modelName);
      // if(!this.id){
      this._store.dispatch(new CreateEMVData(formData));
      // }
      this.isVisible = false;
      this.resetForm();
    } else {
      this.alertService.responseMessage({
        status: 'failure',
        message: 'Please Provide all the Required Fields ',
      });
    }
  }

  resetForm() {
    this.id = null;
    Object.keys(this.emvForm).forEach(key => (this.emvForm[key] = null));
  }

  ViewXMLData(row) {
    this.isXMLDataVisible = true;
    this.XMLdata = row.emvData;
  }

  cancelXML() {
    this.isXMLDataVisible = false;
  }

  ngOnDestroy() {
    this.subscription.forEach(ele => ele.unsubscribe());
  }
}
