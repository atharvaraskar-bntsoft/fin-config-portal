import { Component, OnInit, OnDestroy, Input, Output, EventEmitter } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { ActivatedRoute, Router } from '@angular/router';
import { IAppState } from '../../../store/state/app.state';
import { selectLocationDetail } from 'src/app/store/selectors/location.selector';
import { GetLocationDetail, ClearState } from 'src/app/store/actions/location.action';
import { selectViewSettingsList } from '@app/store/selectors/view-settings.selector';
import { TranslateService } from '@ngx-translate/core';
import { selectPermissionsData } from '@app/store/selectors/permission.selectors';
import { ViewSettingGetObject } from '@app/models/view-settings.interface';
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';
import { Utils } from 'src/utils';

@Component({
  selector: 'app-location-info',
  styleUrls: ['./location-info.component.scss'],
  templateUrl: './location-info.component.html',
})
export class LocationInfoComponent implements OnInit, OnDestroy {
  @Input() isvisibleView = false;
  @Output() closeDrawer = new EventEmitter<boolean>();
  @Output() createview: EventEmitter<any> = new EventEmitter();
  @Input() idView :any;
  public loading = false;
  public currentLang: string;
  public Labels: any;
  public id: string;
  public row: any;
  public keyData: any;
  public visible = false;
  public visibleAnimate = false;
  public errorMessage: string;
  public successMessage: string;
  public permissions: any;
  public isAttributesVisible = false;
  public attributeData: any;
  confirmModal?: NzModalRef;
  public locationId = 'link_location';
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
    private _route: Router,
    private modal: NzModalService,
  ) {  }

  ngOnInit() {
    this._store.pipe(select(selectLocationDetail)).subscribe((data: any) => {
      this.row = data ? data : null;
      this.loading = false;
    this._store
      .pipe(select(selectViewSettingsList))
      .subscribe((response: ViewSettingGetObject) => {
        if (response) {
          this.currentLang = response.data.settingDto.language;
          this.translate.setDefaultLang(this.currentLang);
        }
      });
  });

  this._store.pipe(select(selectPermissionsData)).subscribe((response: any) => {
    if (response) {
      this.permissions = response.data.find(item => item.id === this.locationId);
      this.permissionObject = this.permissions;
    }
  });
    this.loading = true;
    this._store.dispatch(new GetLocationDetail(this.idView));
  }

  public deviceDetails(row) {
    this._route.navigate(['/institutions/devices/filter'], {
      queryParams: {
        merchantGroup: row && row.institution && row.institution.id,
        merchant: row && row.merchant && row.merchant.id,
        location: row.id,
      },
    });
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

  public openModal(row:any) {
    this.isAttributesVisible = true;
    this.attributeData = row.additionalAttribute;
  }

  public closeModal() {
    this.isAttributesVisible = false;
  }
  closeView(): void {
    this.isvisibleView = false;
    this.closeDrawer.emit(this.isvisibleView);
  }
  

  ngOnDestroy() {
    this._store.dispatch(new ClearState());
  }
}
