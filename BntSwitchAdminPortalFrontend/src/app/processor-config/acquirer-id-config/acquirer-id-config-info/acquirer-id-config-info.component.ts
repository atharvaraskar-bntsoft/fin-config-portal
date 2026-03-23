import { Component, OnInit, OnDestroy, Input, Output, EventEmitter } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { IAppState } from '@app/store/state/app.state';
import { ActivatedRoute, Router } from '@angular/router';
import {
  ClearState,
  GetAcquirerIdConfigDetails,
} from '@app/store/actions/acquirer-id-config-mapping.action';
import { selectAcquirerIdConfigDetails } from '@app/store/selectors/acquirer-id-config.selector';
import { selectViewSettingsList } from '@app/store/selectors/view-settings.selector';
import { TranslateService } from '@ngx-translate/core';
import { ViewSettingGetObject } from '@app/models/view-settings.interface';
import { selectPermissionsData } from '@app/store/selectors/permission.selectors';

@Component({
  selector: 'app-acquirer-id-config-info',
  templateUrl: './acquirer-id-config-info.component.html',
  styleUrls: ['./acquirer-id-config-info.component.css'],
})
export class AcquirerIdConfigInfoComponent implements OnInit {
  @Input() isvisibleView = false;
  @Output() closeDrawer = new EventEmitter<boolean>();
  @Output() create: EventEmitter<any> = new EventEmitter();
  @Input() idView :any;
  public statusLoading: Boolean = false;
  public loading = false;
  public id: string;
  public currentLang: string;
  public row: any;
  public permissions: any;
  public attributeData: any;
  public rowId: any;
  public errorMessage: string;
  public visibleAnimate = false;
  public request: Boolean = true;
  private _filters: Array<any> = [];
  public objectData: any;
  private _page = 1;
  title="Acquirer Details"
  public permissionObject = {
    check: null,
    delete: null,
    id: '',
    read: null,
    update: null,
    write: null,
  };
  public visible = false;
  public acquirerId = 'link_acquirer_id_config';

  constructor(
    private _store: Store<IAppState>,
    private translate: TranslateService,
    private _router: ActivatedRoute,
    private _route: Router,
  ) {
    
  }

  ngOnInit() {
    this.id = this._router.snapshot.paramMap.get('id');
    this._store.pipe(select(selectAcquirerIdConfigDetails)).subscribe((_data: any) => {
      this.row = _data;
      this.loading = false;
    });
    this._store.pipe(select(selectViewSettingsList)).subscribe((_response: ViewSettingGetObject) => {
      if (_response) {
        this.currentLang = _response.data.settingDto.language;
        this.translate.setDefaultLang(this.currentLang);
        
      }
    });
    this._store.pipe(select(selectPermissionsData)).subscribe((response: any) => {
      if (response) {
        this.permissions = response.data.find(item => item.id === this.acquirerId);
        this.permissionObject = this.permissions;
      }
    });

    this.loading = true;
    this._store.dispatch(new GetAcquirerIdConfigDetails(this.idView));
  }

  public allDetails() {
    this._route.navigate(['/institutions/acquirer-id-config']);
  }

  public cancel(): void {
    document.body.style.overflow = 'auto';
    this.visibleAnimate = false;
    setTimeout(() => (this.visible = false), 100);
  }

  close(): void {
    this.isvisibleView = false;
    this.closeDrawer.emit(this.isvisibleView);
  }
  
  ngOnDestroy() {
    this._store.dispatch(new ClearState());
  }
}
