import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { IAppState } from '@app/store/state/app.state';
import { DraftTransform, VersionData } from '@app/store/actions/l1-adapter.action';
import { takeUntil } from 'rxjs/operators';
import { selectVersionData } from '@app/store/selectors/l1-adapter.selectors';
import { AlertService } from '@app/services/alert.service';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { ClearState } from '@app/store/actions/router.actions';
import { selectViewSettingsList } from '@app/store/selectors/view-settings.selector';
import { ViewSettingGetObject } from '@app/models/view-settings.interface';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-beans',
  templateUrl: './beans.component.html',
  styleUrls: ['./beans.component.scss'],
})
export class BeansComponent implements OnInit {
  @Input() widthConfig: any;
  @Input() adapterData: any;
  @Input() name: any;
  @Input() template: any;
  @Input() tabIndex: any;
  @Input() isEdit: any;
  @Input() readOnlyFlag = false;
  @Input() singleProperty: any;
  public btnDisable = false;
  @Output() public tabValue: EventEmitter<Object> = new EventEmitter<Object>();
  public publishDisable: boolean = true;
  public componetDestroyed = new Subject();
  public isSaveDraft: boolean = true;
  public currentLang: string;
  constructor(
    private _store: Store<IAppState>,
    private alertService: AlertService,
    private _router: Router,
    private translate: TranslateService,
  ) {
 
  }

  ngOnInit() {
    this._store.pipe(select(selectViewSettingsList)).subscribe((response: ViewSettingGetObject) => {
      if (response) {
        this.currentLang = response.data.settingDto.language;
        this.translate.setDefaultLang(this.currentLang);
      }
    });
  }

  private validate(): boolean {
    
    return this.adapterData?.beanconfiguationData.beans.find((file: any) => {
      return file.fileContent === '';
    })
      ? true
      : false;
  }

  public draftTransform(): void {
    this.adapterData.networkData.properties.singleProperty = this.singleProperty;
    this._store.dispatch(new DraftTransform(this.adapterData));
  }

  public prevTabValue(): void {
    if (this.template?.value.indexOf('SOAP') !== -1) {
      this.tabValue.emit(3);
    } else {
      this.tabValue.emit(4);
    }
  }

  public versionData(): void {
    this.adapterData.networkData.properties.singleProperty = this.singleProperty;
    if (this.validate()) {
      this.btnDisable = true;
      this._store.dispatch(new VersionData(this.adapterData));
      this._store
        .pipe(takeUntil(this.componetDestroyed), select(selectVersionData))
        .subscribe((response: any) => {
          if (response && response.status === 'success') {
            this.btnDisable = false;
            this._router.navigateByUrl('/adapter-configuration/l1-adapters');
          }
        });
    } else {
      this.alertService.responseMessage({
        status: 'failure',
        message: 'fileContent should not be empty',
      });
    }
  }

  public checkData(): Array<any> {
    return this.adapterData && this.adapterData?.beanconfiguationData.beans > 0
      ? this.adapterData?.beanconfiguationData.beans
      : [];
  }

  ngOnDestroy(): void {
    // Called once, before the instance is destroyed.
    // Add 'implements OnDestroy' to the class.
    this.componetDestroyed.next();
    this.componetDestroyed.complete();
    this.componetDestroyed.unsubscribe();
    this._store.dispatch(new ClearState());
  }
}
