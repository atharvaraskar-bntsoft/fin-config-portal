import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DraftTransform, VersionData } from '@app/store/actions/l1-adapter.action';
import { AlertService } from '@app/services/alert.service';
import { ClearState } from '@app/store/actions/router.actions';
import { Router } from '@angular/router';
import { IAppState } from '@app/store/state/app.state';
import { selectVersionData } from '@app/store/selectors/l1-adapter.selectors';
import { selectViewSettingsList } from '@app/store/selectors/view-settings.selector';
import { select, Store } from '@ngrx/store';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { TranslateService } from '@ngx-translate/core';
import { ViewSettingGetObject } from '@app/models/view-settings.interface';

@Component({
  selector: 'app-beans',
  templateUrl: './beans.component.html',
  styleUrls: ['./beans.component.scss'],
})
export class BeansComponent implements OnInit {
  @Input() public widthConfig: any;
  @Input() public adapterData: any;
  @Input() public name: any;
  @Input() public template: any;
  @Input() public tabIndex: any;
  @Input() public isEdit: any;
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
  ) {  }

  // tslint:disable-next-line: no-empty
  public ngOnInit() {
    this._store.pipe(select(selectViewSettingsList)).subscribe((response: ViewSettingGetObject) => {
      if (response) {
        this.currentLang = response.data.settingDto.language;
        this.translate.setDefaultLang(this.currentLang);
      }
    });
  }

  public draftTransform(): void {
    this.adapterData.networkData.properties.singleProperty = this.singleProperty;
    this._store.dispatch(new DraftTransform(this.adapterData));
  }

  public prevTabValue(): void {
    this.tabValue.emit(4);
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
            this._router.navigateByUrl('/adapter-configuration/l3-adapters');
          }
        });
    } else {
      this.alertService.responseMessage({
        message: 'fileContent should not be empty',
        status: 'failure',
      });
    }
  }

  public checkData(): Array<any> {
    return this.adapterData && this.adapterData.beanconfiguationData.beans > 0
      ? this.adapterData.beanconfiguationData.beans
      : [];
  }

  private validate(): boolean {
    return this.adapterData?.beanconfiguationData.beans.find((file: any) => {
      return (file.fileContent === '' || file.fileContent === null);
    })
      ? true
      : false;
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
