import { selectGetDek, selectPostDek } from '@app/store/selectors/dek.selector';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ViewSettingGetObject } from '@app/models/view-settings.interface';
import { AlertService } from '@app/services/alert.service';
import { GetDek, ClearState, PostDek } from '@app/store/actions/dek.action';
import { selectViewSettingsList } from '@app/store/selectors/view-settings.selector';
import { IAppState } from '@app/store/state/app.state';
import { select, Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import { Subject, Subscription } from 'rxjs';
import { takeUntil, takeWhile } from 'rxjs/operators';
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';
import { Utils } from 'src/utils';

@Component({
  selector: 'app-dek-create',
  templateUrl: './dek-create.component.html',
  styleUrls: ['./dek-create.component.css'],
})
export class DekCreateComponent implements OnInit, OnDestroy {
  public fg: FormGroup;
  public currentLang: string;
  submit = new Subscription();
  componetDestroyed = new Subject();
  public errorMessage: String;
  public dataObject: any;
  public successMessage: String;
  public submitted = false;
  public dekData: any;
  public showPassword = false;
  public textValue: any = null;
  public key: any;
  confirmModal?: NzModalRef;

  constructor(
    private _store: Store<IAppState>,
    private alertService: AlertService,
    private translate: TranslateService,
    private router: Router,
    private modal: NzModalService,
  ) {
    this._store
      .pipe(takeUntil(this.componetDestroyed), select(selectViewSettingsList))
      .subscribe((response: ViewSettingGetObject) => {
        if (response) {
          this.currentLang = response.data.settingDto.language;
          translate.setDefaultLang(this.currentLang);
        }
      });
    this._store.dispatch(new GetDek());
    this._store
      .pipe(takeUntil(this.componetDestroyed), select(selectGetDek))
      .subscribe((data: any) => {
        if (data) {
          this.dekData = data.data;
        }
      });

    this._store
      .pipe(takeUntil(this.componetDestroyed), select(selectPostDek))
      .subscribe((response: any) => {
        if (response) {
          this.submitted = false;
          this._store.dispatch(new ClearState());
          if (response.status) {
            this.successMessage = response.message;
            this.router.navigate(['/processor-config/dek']);
          }
        }
      });
  }

  ngOnInit(): void {
    this.createFormGroup();
  }

  public createFormGroup() {
    this.fg = new FormGroup({
      clearText: new FormControl(null, [Validators.required, Validators.minLength(10)]),
    });
  }

  public generateKey() {
    this.fg.controls.clearText.setValue(this.makeid(16).toLowerCase());
  }

  makeid(length) {
    return this.bytestohex(window.crypto.getRandomValues(new Uint8Array(length)));
  }

  bytestohex(bytes) {
    var hexstring = '', h;
    for (var i = 0; i < bytes.length; i++) {
      h = bytes[i].toString(16);
      if (h.length == 1) { h = '0' + h; }
      hexstring += h;
    }
    return hexstring;
  }

  public onSubmit({ value }): void {
    this.confirmModal = this.modal.confirm({
      nzTitle: Utils.submitMessage(),
      nzOnOk: () => {
        if (this.fg.valid) {
          this.submitted = true;
          const obj = {
            clearText: value.clearText,
          };
          this._store.dispatch(new PostDek(obj));
          this.isSubmitted();
        } else {
          this.validateAllFormFields(this.fg);
        }
      },
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
          this.submitted = data;
          this.submit.unsubscribe();
        }
      });
  }

  validateAllFormFields(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach(field => {
      const control = formGroup.get(field);
      if (control instanceof FormControl) {
        control.markAsTouched({ onlySelf: true });
      } else if (control instanceof FormGroup) {
        this.validateAllFormFields(control);
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

  ngOnDestroy() {
    this.componetDestroyed.next();
    this.submit.unsubscribe();
    this._store.dispatch(new ClearState());
    this.componetDestroyed.unsubscribe();
  }
}
