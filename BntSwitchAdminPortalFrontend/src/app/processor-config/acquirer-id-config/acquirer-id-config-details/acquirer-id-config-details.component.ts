import { Component, OnInit } from '@angular/core';
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
import { Utils } from 'src/utils';
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';
import { selectPermissionsData } from '@app/store/selectors/permission.selectors';

@Component({
  selector: 'app-acquirer-id-config-details',
  templateUrl: './acquirer-id-config-details.component.html',
  styleUrls: ['./acquirer-id-config-details.component.css']
})
export class AcquirerIdConfigDetailsComponent implements OnInit {
  public id: string;
  public currentLang: string;
  public row: any;
  public permissions: any;
  public attributeData: any;
  public rowId: any;
  confirmModal?: NzModalRef;
  public errorMessage: string;
  public visibleAnimate = false;
  public request: Boolean = true;
  private _filters: Array<any> = [];
  public objectData: any;
  private _page = 1;
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
    this.id = this._router.snapshot.paramMap.get('id');
    this._store.pipe(select(selectAcquirerIdConfigDetails)).subscribe((data: any) => {
      this.row = data;
    });
    this._store.pipe(select(selectViewSettingsList)).subscribe((response: ViewSettingGetObject) => {
      if (response) {
        this.currentLang = response.data.settingDto.language;
        translate.setDefaultLang(this.currentLang);
      }
    });
    this._store.pipe(select(selectPermissionsData)).subscribe((response: any) => {
      if (response) {
        this.permissions = response.data.find(item => item.id === this.acquirerId);
        this.permissionObject = this.permissions;
      }
    });
  }

  ngOnInit(): void {
    this._store.dispatch(new GetAcquirerIdConfigDetails(this.id));
  }
  
  public allDetails() {
    this._route.navigate(['/institutions/acquirer-id-config']);
  }

  public cancel(): void {
    document.body.style.overflow = 'auto';
    this.visibleAnimate = false;
    setTimeout(() => (this.visible = false), 100);
  }

  ngOnDestroy() {
    this._store.dispatch(new ClearState());
  }

}
