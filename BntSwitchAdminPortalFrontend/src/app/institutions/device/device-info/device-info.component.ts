import { Component, OnInit, OnDestroy, Input, Output, EventEmitter } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { ActivatedRoute, Router } from '@angular/router';
import { IAppState } from '../../../store/state/app.state';
import { GetDeviceDetail, ClearState } from '../../../store/actions/device.action';
import { selectDeviceDetail } from '../../../store/selectors/device.selectors';
import { selectViewSettingsList } from '@app/store/selectors/view-settings.selector';
import { TranslateService } from '@ngx-translate/core';
import { selectPermissionsData } from '@app/store/selectors/permission.selectors';
import { ViewSettingGetObject } from '@app/models/view-settings.interface';
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';
import { Utils } from 'src/utils';
@Component({
  selector: 'app-device-info',
  styleUrls: ['./device-info.component.scss'],
  templateUrl: './device-info.component.html',
})
export class DeviceInfoComponent implements OnInit, OnDestroy {
  @Input() isvisibleView = false;
  @Output() closeDrawer = new EventEmitter<boolean>();
  @Output() create: EventEmitter<any> = new EventEmitter();
  @Input() idView :any;
  public loading = false;
  public currentLang: string;
  public Labels: any;
  public id: string;
  public row: any;
  public errorMessage: string;
  confirmModal?: NzModalRef;
  public visibleAnimate = false;
  public rowId: any;
  public visible = false;
  public isAttributesVisible = false;
  public attributeData: any;
  public successMessage: string;
  public permissions: any;
  public deviceId = 'link_device';
  public permissionObject = {
    check: null,
    delete: null,
    id: '',
    read: null,
    update: null,
    write: null,
  };
  constructor(
    private _store: Store<IAppState>,
    private _router: ActivatedRoute,
    private translate: TranslateService,
    private router: Router,
    private modal: NzModalService,
  ) { }

  ngOnInit() {
    this.id = this._router.snapshot.paramMap.get('id');
    this._store.pipe(select(selectDeviceDetail)).subscribe((data: any) => {
      this.row = data;
      this.loading = false;
    });
    this._store.pipe(select(selectViewSettingsList)).subscribe((response: ViewSettingGetObject) => {
      if (response) {
        this.currentLang = response.data.settingDto.language;
        this.translate.setDefaultLang(this.currentLang);
      }
    });
    this._store.pipe(select(selectPermissionsData)).subscribe((response: any) => {
      if (response) {
        this.permissions = response.data.find(item => item.id === this.deviceId);
        this.permissionObject = this.permissions;
      }
    });
    this.loading = true;
    this.id = this._router.snapshot.paramMap.get('id');
    this._store.dispatch(new GetDeviceDetail(this.idView));
  }

  public open(): void {
    document.body.style.overflow = 'hidden';
    this.visible = true;
    setTimeout(() => (this.visibleAnimate = true), 200);
  }

  public cancel(): void {
    document.body.style.overflow = 'auto';
    this.visibleAnimate = false;
    setTimeout(() => (this.visible = false), 100);
  }

  public allDetails(): void {
    this.router.navigate(['/institutions/devices']);
  }

  public locationDetails(row) {
    this.router.navigate(['/institutions/locations/locations-details/', row.location.id]);
  }

  public openModal(row) {
    this.isAttributesVisible = true;
    this.attributeData = row.additionalAttribute;
  }

  public closeModal() {
    this.isAttributesVisible = false;
  }
  public institutionDetails(row) {
    this.router.navigate(['/institutions/institutions/institution-details/', row.merchant.id]);
  }

  public institutionGroupDetails(row) {
    this.router.navigate(['/institutions/institution-group/', row.merchantInstitution.id]);
  }
  close(): void {
    this.isvisibleView = false;
    this.closeDrawer.emit(this.isvisibleView);
  }
  ngOnDestroy() {
    this._store.dispatch(new ClearState());
  }
}
