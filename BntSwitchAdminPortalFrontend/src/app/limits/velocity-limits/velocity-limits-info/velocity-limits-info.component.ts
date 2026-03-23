import { Component, OnInit, Input, OnDestroy, Output, EventEmitter } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { IAppState } from '../../../store/state/app.state';
import { selectVelocityLimitsEditRow } from '../../../store/selectors/velocity-limits.selector';
import {
  ClearState,
  GetVelocityLimitsEditRow,
} from '../../../store/actions/velocity-limits.action';
import { ActivatedRoute, Router } from '@angular/router';
import { selectViewSettingsList } from '@app/store/selectors/view-settings.selector';
import { TranslateService } from '@ngx-translate/core';
import { selectPermissionsData } from '@app/store/selectors/permission.selectors';
import { ViewSettingGetObject } from '@app/models/view-settings.interface';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { VelocityLimitsService } from '@app/services/velocity-limits.service';
import { AlertService } from '@app/services/alert.service';

@Component({
  selector: 'app-velocity-limits-info',
  templateUrl: './velocity-limits-info.component.html',
})
export class VelocityLimitsInfoComponent implements OnInit, OnDestroy {
  @Input() isvisibleview = false;
  @Output() closeDrawer = new EventEmitter<boolean>();
  @Output() update: EventEmitter<any> = new EventEmitter();
  @Input() idView: any;
  title = 'Velocity Limits Details';
  public loading = false;
  public currentLang: string;
  public Labels: any;
  public row: any;
  public id: string;
  public keyData: any;
  public editData: any;
  public visible = false;
  public visibleAnimate = false;
  public status: any;
  public objectData: any;
  public visibleAlert = false;
  public visibleAnimateAlert = false;
  public permissionObject = {
    check: null,
    delete: null,
    id: '',
    read: null,
    update: null,
    write: null,
  };
  public permissions: any;
  public velocityLimitId = 'link_velocity';
  componetDestroyed = new Subject();

  constructor(
    private _store: Store<IAppState>,
    private translate: TranslateService,
    private _router: ActivatedRoute,
    private _routerEdit: Router,
    private _velocityService: VelocityLimitsService,
    private alertService: AlertService,
  ) {}

  ngOnInit() {
    this._store
      .pipe(takeUntil(this.componetDestroyed), select(selectVelocityLimitsEditRow))
      .subscribe((response: any) => {
        if (response) {
          this.row = response;
          this.loading = false;
        }
      });

    this._store.pipe(select(selectViewSettingsList)).subscribe((response: ViewSettingGetObject) => {
      if (response) {
        this.currentLang = response.data.settingDto.language;
        this.translate.setDefaultLang(this.currentLang);
      }
    });

    this._store.pipe(select(selectPermissionsData)).subscribe((response: any) => {
      if (response) {
        this.permissions = response.data.find(item => item?.id === this.velocityLimitId);
        this.permissionObject = this.permissions;
      }
    });
    this.loading = true;
    this.id = this._router.snapshot.paramMap.get('id');
    this._store.dispatch(new GetVelocityLimitsEditRow(this.idView));
  }

  public editDetails(row) {
    this.editData = row;
    this._routerEdit.navigate(['/limits/velocity-limits/edit/', this.editData?.id]);
  }

  public deleteRecord(row) {
    this.objectData = row.transactionTypes?.name;
    this.keyData = row?.id;
    this._velocityService
      .deleteLimits(this.keyData)
      .pipe(takeUntil(this.componetDestroyed))
      .subscribe(res => {
        if (res && res.status === 'success') {
          this._routerEdit.navigate(['/limits/velocity-limits']);
          this.alertService.responseMessage(res);
        }
      });
  }

  close(): void {
    this.isvisibleview = false;
    this.closeDrawer.emit(this.isvisibleview);
  }

  public onInstitution(row) {
    if (row && row !== undefined) {
      this._routerEdit.navigate([
        '/institutions/institution-group-detail/',
        row.merchantInstitutionId.id,
      ]);
    }
  }

  public onMerchant(row) {
    this._routerEdit.navigate([
      '/institutions/institutions/institution-details/',
      row.merchantId.id,
    ]);
  }

  public onLocation(row) {
    this._routerEdit.navigate(['/institutions/locations/locations-details/', row.locationId.id]);
  }

  public onDevice(row) {
    this._routerEdit.navigate(['/institutions/devices/device-details/', row.deviceId.id]);
  }
  ngOnDestroy() {
    this.componetDestroyed.unsubscribe();
    this._store.dispatch(new ClearState());
  }
}
