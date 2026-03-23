import { Component, OnInit } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ViewSettingGetObject } from '@app/models/view-settings.interface';
import { AlertService } from '@app/services/alert.service';
import {
  ClearState,
  GetByIdTxnKeyLableType,
  PostTxnKeyLableType,
  UpdateTxnKeyLableType,
} from '@app/store/actions/txn-key-lable.action';
import {
  selectTxnKeyLableTypeListGetById,
  selectTxnKeyLableTypePost,
  selectTxnKeyLableTypeUpdate,
} from '@app/store/selectors/txn-key-lable.selectors';
import { selectViewSettingsList } from '@app/store/selectors/view-settings.selector';
import { IAppState } from '@app/store/state/app.state';
import { select, Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import { Subject, Subscription } from 'rxjs';
import { takeUntil, takeWhile } from 'rxjs/operators';

@Component({
  selector: 'app-txn-key-lable-create',
  templateUrl: './txn-key-lable-create.component.html',
  styleUrls: ['./txn-key-lable-create.component.css'],
})
export class TxnKeyLableCreateComponent implements OnInit {
  public currentLang: string;
  public Labels: any = {};
  public currentItem: any = {
    txnKey: null,
    label: null,
    id: '',
    active: false,
  };
  isSpinning = false;
  public fg: UntypedFormGroup;
  public errorMessage: String;
  public dataObject: any;
  public successMessage: String;
  public editMode = false;
  public submitted = false;
  public id: any;
  submit = new Subscription();
  componetDestroyed = new Subject();
  constructor(
    private _store: Store<IAppState>,
    private alertService: AlertService,
    private translate: TranslateService,
    private router: Router,
    private route: ActivatedRoute,
  ) {
    
  }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    if (this.id) {
      this._store.dispatch(new GetByIdTxnKeyLableType(this.id));
      this._store
        .pipe(takeUntil(this.componetDestroyed), select(selectTxnKeyLableTypeListGetById))
        .subscribe((response: any) => {          
          if (response) {
            this.dataObject = response.data;
            this.editMode = response.data.preSeeded == '0' ? false : true;
            this._updateFormGroup(response.data);
          }
        });
    }
    this._store
      .pipe(takeUntil(this.componetDestroyed), select(selectViewSettingsList))
      .subscribe((response: ViewSettingGetObject) => {
        if (response) {
          this.currentLang = response.data.settingDto.language;
          this.translate.setDefaultLang(this.currentLang);
        }
      });
    this._store
      .pipe(takeUntil(this.componetDestroyed), select(selectTxnKeyLableTypePost))
      .subscribe((response: any) => {        
        if (response) {
          this.submitted = false;
          this.isSpinning = false;
          this._store.dispatch(new ClearState());
          if (response.status === 'success') {
            this.successMessage = response.message;
            this.router.navigate(['/logs/txnKeyLable']);
          } else if (response.status === 'failure') {
            this.errorMessage = response.message;
          }
        }
      });
    this._store
      .pipe(takeUntil(this.componetDestroyed), select(selectTxnKeyLableTypeUpdate))
      .subscribe((response: any) => {
        
        if (response) {
          this.submitted = false;
          this.isSpinning = false;
          this._store.dispatch(new ClearState());
          if (response.status === 'success') {
            this.successMessage = response.message;
            this.router.navigate(['/logs/txnKeyLable']);
          } else if (response.status === 'failure') {
            this.errorMessage = response.message;
          }
        }
      });
    this.createFormGroup();
  }

  public createFormGroup() {
    this.fg = new UntypedFormGroup({
      active: new UntypedFormControl(this.currentItem.active, Validators.required),
      txnKey: new UntypedFormControl(this.currentItem.txnKey, [Validators.required, Validators.pattern('[a-zA-Z0-9_.]+')]),
      label: new UntypedFormControl(this.currentItem.label, [Validators.required, Validators.pattern('^(?! )[a-zA-Z ]+(?<! )$')]),
    });
  }

  public onSubmit({ value }) {
    this.fg.value.txnKey = this.fg.value.txnKey.replace(/<[^>]*>/g, '');
    this.fg.value.label = this.fg.value.label.replace(/<[^>]*>/g, '');
    if (this.fg.valid) {
      this.isSpinning = true;
      this.submitted = true;
      this.setData(value);
      this.errorMessage = '';
      this.currentItem.id = this.dataObject ? this.dataObject.id : null;
      this.currentItem.active = this.currentItem.active ? '1' : '0';
      if (this.route.snapshot.paramMap.get('id')) {
        this._store.dispatch(new UpdateTxnKeyLableType(this.currentItem));
      } else {
        this._store.dispatch(new PostTxnKeyLableType(this.currentItem));
      }
      this.submitted = true;
      this.isSubmitted();
    } else {
      this.validateAllFormFields(this.fg);
    }
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
  isSubmitted() {
    this.submit = this.alertService
      .getLoader()
      .pipe(
        takeUntil(this.componetDestroyed),
        takeWhile(() => this.submitted),
      )
      .subscribe(data => {
        if (data === false) {
          this.isSpinning = false;
          this.submitted = data;
          this.submit.unsubscribe();
        }
      });
  }
  public setData(data) {
    this.currentItem['txnKey'] = data['txnKey'];
    this.currentItem['label'] = data['label'];
  }

  public checkStatus(): void {
    this.currentItem.active = !this.currentItem.active;
  }
  private _updateFormGroup(updatedData: any) {
    if (this.fg) {
      this.fg.setValue({
        active: updatedData.active === '0' ? false : true,
        txnKey: updatedData.txnKey,
        label: updatedData.label,
      });
      this.currentItem.active = updatedData.active !== '0' ? true : false;
    }
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
}
