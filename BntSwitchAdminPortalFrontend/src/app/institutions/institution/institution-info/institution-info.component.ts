import { Component, OnInit, OnDestroy, Input, EventEmitter, Output } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { ActivatedRoute, Router } from '@angular/router';

import { IAppState } from '../../../store/state/app.state';

import { GetInstitutionDetail, ClearState } from '../../../store/actions/institution.action';
import { selectInstitutionDetail } from '../../../store/selectors/institution.selectors';
import { selectViewSettingsList } from '@app/store/selectors/view-settings.selector';
import { selectPermissionsData } from '@app/store/selectors/permission.selectors';
import { TranslateService } from '@ngx-translate/core';
import { ViewSettingGetObject } from '@app/models/view-settings.interface';
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';
@Component({
  selector: 'app-institution-info',
  styleUrls: ['./institution-info.component.scss'],
  templateUrl: './institution-info.component.html',
})
export class InstitutionInfoComponent implements OnInit, OnDestroy {
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
  public visibleAnimate = false;
  public rowId: any;
  confirmModal?: NzModalRef;
  private _filters: Array<any> = [];
  public permissions: any;
  public isAttributesVisible = false;
  public attributeData: any;
  public institutionId = 'link_merchant';
  public permissionObject = {
    check: null,
    delete: null,
    id: '',
    read: null,
    update: null,
    write: null,
  };
  public visible = false;

  constructor(
    private _store: Store<IAppState>,
    private translate: TranslateService,
    private _router: ActivatedRoute,
    private _route: Router,
  ) {
    this.id = this._router.snapshot.paramMap.get('id');
    this._store.pipe(select(selectInstitutionDetail)).subscribe((data: any) => {
      this.row = data;
      this.loading = false;
    });
    this._store.pipe(select(selectViewSettingsList)).subscribe((response: ViewSettingGetObject) => {
      if (response) {

        this.currentLang = response.data.settingDto.language;
        translate.setDefaultLang(this.currentLang);
      }
    });
    this._store.pipe(select(selectPermissionsData)).subscribe((response: any) => {
      if (response) {
        this.permissions = response.data.find(item => item.id === this.institutionId);
        this.permissionObject = this.permissions;
      }
    });
  }

  ngOnInit() {
    this.loading = true;
    this._store.dispatch(new GetInstitutionDetail(this.idView));
    
  }

  public allDetails() {
    this._route.navigate(['/institutions/institutions']);
  }

  getServices(services: any) {
    return services
      .map(item => {
        return item.name;
      })
      .join(', ');
  }

  getAdditionalServices(additionalServices: any) {
    return additionalServices
      .map(item => {
        return item.name;
      })
      .join(', ');
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

  public openModal(row) {
    this.isAttributesVisible = true;
    this.attributeData = row.additionalAttribute;
  }

  public closeModal() {
    this.isAttributesVisible = false;
  }

  public deviceDetails(row) {
    if (row && row !== undefined) {
      this._route.navigate(['/institutions/devices/filter'], {
        queryParams: { merchantGroup: row.institution.id, merchant: row.id },
      });
    }
  }

  public institutionGroupDetails(row) {
    this._route.navigate(['/institutions/institution-group/', row.institution.id]);
  }
  public loationDetails(row) {
    if (row && row !== undefined) {
      this._filters['merchantGroup'] = row.id;
      this._route.navigate(['/institutions/locations/filter'], {
        queryParams: { merchantGroup: row.institution.id, merchant: row.id },
      });
    }
  }
  close(): void {
    this.isvisibleView = false;
    this.closeDrawer.emit(this.isvisibleView);
  }
  

  ngOnDestroy() {
    this._store.dispatch(new ClearState());
  }
}
