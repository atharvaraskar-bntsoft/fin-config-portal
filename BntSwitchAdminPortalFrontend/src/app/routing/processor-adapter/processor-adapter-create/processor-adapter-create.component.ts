import { Component, OnInit, OnDestroy } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators, UntypedFormControl } from '@angular/forms';
import { select, Store } from '@ngrx/store';
import { IAppState } from '@app/store/state/app.state';
import { Router, ActivatedRoute } from '@angular/router';
import {
  PostProcessorAdapter,
  GetProcessorAdapterDetails,
  PutProcessorAdapter,
  GetServiceList,
  Get13List,
} from '@app/store/actions/processor-adapter.action';
import {
  selectprocessorAdapterCreate,
  selectprocessorAdapterDetails,
  selectprocessorAdapterEdit,
  selectGetServiceList,
  selectGet13List,
} from '@app/store/selectors/processor-adapter.selector';
import { ClearState } from '@app/store/actions/processor-adapter.action';
import { selectViewSettingsList } from '@app/store/selectors/view-settings.selector';
import { TranslateService } from '@ngx-translate/core';
import { Subject, Subscription } from 'rxjs';
import { takeUntil, takeWhile } from 'rxjs/operators';
import { AlertService } from '@app/services/alert.service';
import { ViewSettingGetObject } from '@app/models/view-settings.interface';

@Component({
  selector: 'app-processor-adapter-create',
  styleUrls: ['./processor-adapter-create.component.scss'],
  templateUrl: './processor-adapter-create.component.html',
})
export class ProcessorAdapterCreateComponent implements OnInit, OnDestroy {
  public fg: UntypedFormGroup;
  public currentLang: string;
  public Labels: any;
  isEditable = true;
  disabled: boolean = false;
  public currentItem: any = {
    active: true,
    adapterId: null,
    code: '',
    description: '',
    id: null,
    isSAFEnabled: false,
    name: null,
    lookupvalueId: null,
  };
  public dataObject: any;
  public postAlive = true;
  public putAlive = true;
  public submitted = false;
  public readOnlyFlag = false;
  public cartiageList: any;
  public serviceDataList: any;
  public serviceModifiedList: any;

  componetDestroyed = new Subject();
  submit = new Subscription();
  private _router: any;
  constructor(
    private _store: Store<IAppState>,
    private translate: TranslateService,
    private route: ActivatedRoute,
    private alertService: AlertService,
    private formBuilder: UntypedFormBuilder,
    private router: Router,
  ) {
    
  }

  ngOnInit() {
    this._store.dispatch(new GetServiceList());
    this._store
      .pipe(takeUntil(this.componetDestroyed), select(selectGetServiceList))
      .subscribe(value => {
        if (value) {
          this.serviceDataList = value;
          this.serviceModifiedList = this.serviceDataList.map(item => {
            return {
              description: item.description,
              id: item.id,
              value: item.value,
            };
          });
        }
      });

    this._store.dispatch(new Get13List());
    this._store
      .pipe(takeUntil(this.componetDestroyed), select(selectGet13List))
      .subscribe(response => {
        if (response) {
          this.cartiageList = response;
        }
      });

    this._store
      .pipe(takeUntil(this.componetDestroyed), select(selectViewSettingsList))
      .subscribe((response: ViewSettingGetObject) => {
        if (response) {
          this.currentLang = response.data.settingDto.language;
          this.translate.setDefaultLang(this.currentLang);
        }
      });
    if (this.route.snapshot.paramMap.get('id')) {
      this._store.dispatch(new GetProcessorAdapterDetails(this.route.snapshot.paramMap.get('id')));
      this._store
        .pipe(takeUntil(this.componetDestroyed), select(selectprocessorAdapterDetails))
        .subscribe((response: any) => {
          if (response !== null) {
            this.dataObject = response;
            this._updateFormGroup(this.dataObject);
          }
        });
      this.isEditable = false;
      this._store
        .pipe(
          takeUntil(this.componetDestroyed),
          takeWhile(() => this.putAlive),
          select(selectprocessorAdapterEdit),
        )
        .subscribe((response: any) => {
          if (response) {
            this._store.dispatch(new ClearState());
            this.submitted = false;
            if (response && response.status === 'success') {
              this.putAlive = false;
              this.router.navigate(['/routing/processor-adapter']);
            }
          }
        });
    } else {
      this._store
        .pipe(
          takeUntil(this.componetDestroyed),
          takeWhile(() => this.postAlive),
          select(selectprocessorAdapterCreate),
        )
        .subscribe(response => {
          if (response) {
            if (response && response.status === 'success') {
              this.postAlive = false;
              this._store.dispatch(new ClearState());
              this.router.navigate(['/routing/processor-adapter']);
            }
          }
        });
    }
    this.route.params.pipe(takeUntil(this.componetDestroyed)).subscribe(params => {
      if ('view' in params) {
        this.readOnlyFlag = true;
      }
    });
    this.fg = this.formBuilder.group({
      active: [this.currentItem.active, [Validators.required]],
      adapterId: [this.currentItem.adapterId],
      code: [this.currentItem.code, [Validators.required, Validators.pattern('[0-9]+')]],
      description: [this.currentItem.description, [Validators.required, Validators.pattern('^(?! )[a-zA-Z0-9 :!@#\$%\^\&*\)\(+=._-]+(?<! )$')]],
      id: [this.currentItem.id],
      isSAFEnabled: [this.currentItem.isSAFEnabled, [Validators.required]],
      name: [this.currentItem.name, [Validators.required]],
      lookupvalueId: [this.currentItem.lookupvalueId],
    });
  }

  get getFormName() {
    return this.fg;
  }

  public f() {
    return this.fg.controls;
  }

  checkStatus(): void {
    this.currentItem.active = !this.currentItem.active;
  }

  checkSaf(): void {
    this.currentItem.isSAFEnabled = !this.currentItem.isSAFEnabled;
  }

  public setData(data): void {
    this.currentItem['active'] = data['active'];
    this.currentItem['adapterId'] = data['adapterId'];
    this.currentItem['code'] = data['code'];
    this.currentItem['description'] = data['description'];
    this.currentItem['id'] = data['id'];
    this.currentItem['isSAFEnabled'] = data['isSAFEnabled'];
    this.currentItem['name'] = data['name'];
    this.currentItem['lookupvalueId'] = data['lookupvalueId'];
  }

  onSubmitprocessorAdapterForm({ value }): void {
    this.fg.value.name = this.fg.value.name.replace(/<[^>]*>/g, '');
    if (this.fg.valid) {
      this.setData(value);
      this.currentItem.id = this.dataObject ? this.dataObject.id : null;
      if (this.currentItem.id) {
        this.putAlive = true;
        this._store.dispatch(new PutProcessorAdapter(this.currentItem));
      } else {
        this.postAlive = true;
        this._store.dispatch(new PostProcessorAdapter(this.currentItem));
      }
      this.submitted = true;
      this.isSubmitted();
    } else {
      this.validateAllFormFields(this.fg);
    }
  }
  // loader
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
  // loader
  private _updateFormGroup(updatedData: any): void {
    if (this.fg) {
      this.fg.patchValue({
        active: updatedData.active,
        adapterId: updatedData.adapterId,
        code: updatedData.code,
        description: updatedData.description,
        id: updatedData.id,
        isSAFEnabled: updatedData.isSAFEnabled,
        name: updatedData.name,
        lookupvalueId: updatedData.lookupvalueId,
      });
      this.currentItem['active'] = updatedData['active'];
      this.currentItem['isSAFEnabled'] = updatedData['isSAFEnabled'];
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

  ngOnDestroy() {
    this.putAlive = false;
    this.postAlive = false;
    this.componetDestroyed.next();
    this.submit.unsubscribe();
    this.componetDestroyed.unsubscribe();
    this._store.dispatch(new ClearState());
  }
}
