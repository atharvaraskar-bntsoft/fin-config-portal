import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { IAppState } from '@app/store/state/app.state';
import { AlertService } from '@app/services/alert.service';
import { TranslateService } from '@ngx-translate/core';
import { Router, ActivatedRoute } from '@angular/router';
import { takeUntil, takeWhile } from 'rxjs/operators';
import { selectViewSettingsList } from '@app/store/selectors/view-settings.selector';
import { ViewSettingGetObject } from '@app/models/view-settings.interface';
import { Subscription, Subject } from 'rxjs';
import {
  selectPostSwitchClusters,
  selectGetByIdSwitchClusters,
  selectPutSwitchClusters,
} from '@app/store/selectors/switch-clusters.selector';
import {
  ClearState,
  PutSwitchClusters,
  PostSwitchClusters,
  GetByIdSwitchClusters,
} from '@app/store/actions/switch-clusters.action';
import { UntypedFormGroup, UntypedFormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-switch-clusters-create',
  styleUrls: ['./switch-clusters-create.component.scss'],
  templateUrl: './switch-clusters-create.component.html',
})
export class SwitchClustersCreateComponent implements OnInit {
  submit = new Subscription();
  componetDestroyed = new Subject();
  isEditable = true;
  public currentLang: string;
  public submitted = false;
  public errorMessage: String;
  public successMessage: String;
  public fg: UntypedFormGroup;
  public currentItem: any = {
    active: null,
    dataCentre: null,
    region: null,
  };
  public dataById: any;
  public id: any;
  public dataObject: any;

  constructor(
    private _store: Store<IAppState>,
    private alertService: AlertService,
    private translate: TranslateService,
    private router: Router,
    private route: ActivatedRoute,
  ) {
    this._store
      .pipe(takeUntil(this.componetDestroyed), select(selectViewSettingsList))
      .subscribe((response: ViewSettingGetObject) => {
        if (response) {
          this.currentLang = response.data.settingDto.language;
          translate.setDefaultLang(this.currentLang);
        }
      });
    this._store
      .pipe(takeUntil(this.componetDestroyed), select(selectPostSwitchClusters))
      .subscribe((response: any) => {
        if (response) {
          this.submitted = false;
          this._store.dispatch(new ClearState());
          if (response.status === 'success') {
            this.successMessage = response.message;
            this.router.navigate(['/deployment/switch-clusters']);
          } else if (response.status === 'failure') {
            this.errorMessage = response.message;
          }
        }
      });
    this._store
      .pipe(takeUntil(this.componetDestroyed), select(selectPutSwitchClusters))
      .subscribe((response: any) => {
        if (response) {
          this.submitted = false;
          this._store.dispatch(new ClearState());
          if (response.status === 'success') {
            this.successMessage = response.message;
            this.router.navigate(['/deployment/switch-clusters']);
          } else if (response.status === 'failure') {
            this.errorMessage = response.message;
          }
        }
      });
  }

  ngOnInit() {
    this.createFormGroup();
    if (this.route.snapshot.paramMap.get('id')) {
      this._store.dispatch(new GetByIdSwitchClusters(this.route.snapshot.paramMap.get('id')));
      this._store.pipe(select(selectGetByIdSwitchClusters)).subscribe((response: any) => {
        if (response !== null) {
          this.dataObject = response;
          this._updateFormGroup(this.dataObject);
          this.isEditable = false;
        }
      });
    }
  }
  public createFormGroup(): void {
    this.fg = new UntypedFormGroup({
      active: new UntypedFormControl(this.currentItem.active),
      dataCentre: new UntypedFormControl(null, Validators.required),
      region: new UntypedFormControl(null, Validators.required),
    });
  }

  public setData(data): void {
    this.currentItem.dataCentre = data.dataCentre.trim();
    this.currentItem.region = data.region.trim();
    this.currentItem.active = data.active;
  }

  public onSubmit({ value }): void {
    this.fg.value.dataCentre = this.fg.value.dataCentre.replace(/<[^>]*>/g, '');
    this.fg.value.region = this.fg.value.region.replace(/<[^>]*>/g, '');
    if (this.fg.valid) {
      this.submitted = true;
      this._store.dispatch(new ClearState());
      this.setData(value);
      this.currentItem.active = this.currentItem.active ? '1' : '0';
      this.errorMessage = '';
      this.currentItem.id = this.dataObject ? this.dataObject.data.id : null;
      if (this.route.snapshot.paramMap.get('id')) {
        this._store.dispatch(new PutSwitchClusters(this.currentItem));
      } else {
        this._store.dispatch(new PostSwitchClusters(this.currentItem));
      }
      this.submitted = true;
      this.isSubmitted();
    } else {
      this.validateAllFormFields(this.fg);
    }
  }

  private _updateFormGroup(updatedData: any): void {
    if (this.fg) {
      this.currentItem.active = updatedData.data.active === '0' ? false : true;
      this.fg.setValue({
        active: updatedData.data.active === '1' ? true : false,
        dataCentre: updatedData.data.dataCentre,
        region: updatedData.data.region,
      });
    }
  }

  public checkStatus(): void {
    this.currentItem.active = !this.currentItem.active;
  }

  public f() {
    return this.fg.controls;
  }

  isSubmitted() {
    this.submit = this.alertService
      .getLoader()
      .pipe(
        takeUntil(this.componetDestroyed),
        takeWhile(() => this.submitted),
      )
      .subscribe(data => {
        if (data === false) {
          this.submitted = data;
          this.submit.unsubscribe();
        }
      });
  }

  isFieldValid(field: string) {
    return !this.fg.get(field).valid && this.fg.get(field).touched;
  }

  displayFieldCss(field: string) {
    return {
      'has-error': this.isFieldValid(field),
      'has-feedback': this.isFieldValid(field),
    };
  }

  validateAllFormFields(formGroup: UntypedFormGroup) {
    Object.keys(formGroup.controls).forEach(field => {
      console.log(field);
      const control = formGroup.get(field);
      if (control instanceof UntypedFormControl) {
        control.markAsTouched({ onlySelf: true });
      } else if (control instanceof UntypedFormGroup) {
        this.validateAllFormFields(control);
      }
    });
  }
}
