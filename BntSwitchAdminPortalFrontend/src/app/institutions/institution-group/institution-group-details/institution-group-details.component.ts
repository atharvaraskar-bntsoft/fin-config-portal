import { Component, OnInit, ContentChild, TemplateRef, ViewChild, OnDestroy, Input, Output, EventEmitter } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { IAppState } from '../../../store/state/app.state';
import { selectInstitutionGroupDetails } from '../../../store/selectors/institution-group.selector';
import {
  GetInstitutionGroupDetails,
  ClearState,
} from '../../../store/actions/institution-group.action';
import { ActivatedRoute, Router } from '@angular/router';
import { selectViewSettingsList } from '@app/store/selectors/view-settings.selector';
import { selectPermissionsData } from '@app/store/selectors/permission.selectors';
import { TranslateService } from '@ngx-translate/core';
import { ViewSettingGetObject } from '@app/models/view-settings.interface';
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';

@Component({
  selector: 'app-institution-group-details',
  styleUrls: ['./institution-group-details.component.scss'],
  templateUrl: './institution-group-details.component.html',
})
export class InstitutionGroupDetailsComponent implements OnInit, OnDestroy {
  @Input() isvisibleView = false;
  @Output() closeDrawer = new EventEmitter<boolean>();
  @Output() create: EventEmitter<any> = new EventEmitter();
  @Input() idView :any;
  public currentLang: string;
  public loading = false;
  public Labels: any;
  public id: any;
  public details: any;
  public keyData: any;
  public visible = false;
  public visibleAnimate = false;
  public errorMessage: string;
  public successMessage: string;
  private _filters: Array<any> = [];
  public addressList: any;
  confirmModal?: NzModalRef;
  public statusList: any;
  public permissions: any;
  public institutionGroupId = 'link_institution';
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
    private translate: TranslateService,
    private _router: ActivatedRoute,
    private _route: Router,
    private modal: NzModalService,
  ) { }

  ngOnInit() {
    this._store
    .pipe(select(selectInstitutionGroupDetails))
    .subscribe((InstitutionGroupDetails: any) => {
      if (InstitutionGroupDetails !== null && InstitutionGroupDetails !== undefined) {
        this.details = InstitutionGroupDetails;
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
      this.permissions = response.data.find(item => item.id === this.institutionGroupId);
      this.permissionObject = this.permissions;
    }
  });
    this.loading = true;
    this.id = this._router.snapshot.paramMap.get('id');
    this._store.dispatch(new GetInstitutionGroupDetails(this.idView));
  }

  public allDetails(): void {
    this._route.navigate(['/institutions/institution-group']);
  }
  close(): void {
    this.isvisibleView = false;
    this.closeDrawer.emit(this.isvisibleView);
  }

  ngOnDestroy() {
    this._store.dispatch(new ClearState());
  }
}
