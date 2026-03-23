import { Component, OnDestroy, OnInit } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { AdapterCommonService } from '@app/services/adapter-common.service';
import { CorePropertiesService } from '@app/services/core-properties.service';
import { AddCorePropertiesComponent } from '@app/shared/add-core-properties/add-core-properties.component';
import { IAppState } from '@app/store/state/app.state';
import { Store } from '@ngrx/store';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertService } from '@app/services/alert.service';
import { takeUntil } from 'rxjs/operators';
import { Subject, Subscription } from 'rxjs';

@Component({
  selector: 'app-create-core-proper',
  templateUrl: './create-core-proper.component.html',
  styleUrls: ['./create-core-proper.component.scss'],
})
export class CreateCoreProperComponent implements OnInit, OnDestroy {
  public loading = false;
  public defaultLoading = false;
  public validatePropertiesName = false;
  readOnlyFlag = false;
  corePropertiesId: any = null;
  public currentLang: string;
  coreProName: string = null;
  coreProType: string = 'Core';
  typeValueList = [
    {
      text: 'Core',
      value: 'Core',
    },
  ];
  public formObj: any = {};
  public visibleNetwork = false;
  public visibleNetworkAnimate = false;
  public corePropertyData: any = [];
  public rows: any = [];
  componetDestroyed = new Subject();
  subscription = new Subscription();
  public infoForm: UntypedFormGroup;
  public tableSize = 'small';
  public totals = 0;
  public showError = false;
  constructor(
    public _store: Store<IAppState>,
    public adpaterCommonService: AdapterCommonService,
    public dialog: MatDialog,
    public corePropertiesService: CorePropertiesService,
    public router: Router,
    public activeRouter: ActivatedRoute,
    public alertService: AlertService,
  ) {}

  ngOnInit(): void {
    this.corePropertiesId = this.activeRouter.snapshot.params.id;
    if (this.corePropertiesId) {
      this.getCorePropertiesByIdDetails();
    } else {
      this.getDefaultProperties();
    }
  }

  public getCorePropertiesByIdDetails() {
    this.defaultLoading = true;
    this.corePropertiesService
      .getCorePropertiesById(this.corePropertiesId)
      .pipe(takeUntil(this.componetDestroyed))
      .subscribe(response => {
        this.defaultLoading = false;
        if (response && response.status == 'success') {
          if (response.data) {
            this.readOnlyFlag = true;
            this.coreProName = response.data.name;
            this.coreProType = response.data.subType;
            this.corePropertyData =
              response.data.properties.core && response.data.properties.core.length > 0
                ? response.data.properties.core
                : [];
            this.renderItem();
          }
        }
      });
  }
  public getDefaultProperties() {
    this.defaultLoading = true;
    this.corePropertiesService
      .getDefaultProperties()
      .pipe(takeUntil(this.componetDestroyed))
      .subscribe(response => {
        this.defaultLoading = false;
        if (response && response.status == 'success') {
          this.corePropertyData = response.data;
          this.renderItem();
        }
      });
  }

  public addItem() {
    this.visibleNetwork = true;
    this.visibleNetworkAnimate = true;
    this.dialog
      .open(AddCorePropertiesComponent, {
        data: {
          corePropertyData: this.corePropertyData,
          renderItem: this.renderItem,
        },
        width: '480px',
      })
      .afterClosed()
      .subscribe(res => {
        if (res === 'success') {
          this.renderItem();
        }
      });
  }

  removeItem(data, label) {
    const name = label;
    this.removeValidation(data);
    this.corePropertyData = this.corePropertyData.filter((item: any) => item.field !== data.field);
    this.renderItem();
  }

  removeValidation(data) {
    const validation = [];
    data.mandatory = false;
    if (data.mandatory) {
      validation.push(Validators.required);
    } else {
      data.format = null;
    }
    data.value = data.value;
    this.infoForm.removeControl(data.field);
  }

  public renderItem() {
    let finalArray = this.generateFinalData(this.corePropertyData, this.formObj);
    this.rows = [...finalArray];
    this.infoForm = new UntypedFormGroup(this.formObj);
    this.totals = this.rows.length;
  }
  get getFormName() {
    return this.infoForm;
  }

  public generateFinalData(arrayOne: any[], formObj: any) {
    arrayOne.forEach(el => {
      const validation = [];
      if (el.mandatory) {
        validation.push(Validators.required);
      } else {
        el.format = null;
      }
      el.value = el.value;
      formObj[el.field] = new UntypedFormControl(el.value, validation);
    });
    return arrayOne;
  }

  public numberOnly(event): boolean {
    const charCode = event.which ? event.which : event.keyCode;
    if (charCode === 45 || charCode === 95) {
      return true;
    } else if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  }

  public save(saveFlag) {
    if (this.infoForm.valid && this.coreProName) {
      let requestBody = {
        id: this.corePropertiesId ? this.corePropertiesId : null,
        name: this.coreProName.replace(/<[^>]*>/g, ''),
        type: 'L2',
        subType: this.coreProType,
        saveDraft: saveFlag,
        properties: {
          core: this.corePropertyData,
        },
        version: null,
      };
      this.corePropertiesService
        .saveCoreProperties(requestBody)
        .pipe(takeUntil(this.componetDestroyed))
        .subscribe(response => {
          if (response && response.status == 'success') {
            this.alertService.responseMessage(response);
            this.router.navigate(['/processor-config/core-properties']);
          } else {
            this.alertService.responseMessage(response);
          }
        });
    }
  }

  public publishMethod() {
    if (this.infoForm.valid && this.coreProName) {
      let requestBody = {
        id: this.corePropertiesId ? this.corePropertiesId : null,
        name: this.coreProName.replace(/<[^>]*>/g, ''),
        type: 'L2',
        subType: this.coreProType,
        saveDraft: false,
        properties: {
          core: this.corePropertyData,
        },
        version: null,
      };

      this.corePropertiesService
        .saveCoreProperties(requestBody)
        .pipe(takeUntil(this.componetDestroyed))
        .subscribe(response => {
          if (response && response.status == 'success') {
            this.alertService.responseMessage(response);
            this.router.navigate(['/processor-config/core-properties']);
          } else {
            this.alertService.responseMessage(response);
          }
        });
    }
  }

  validateName(event: any) {
    if (event && event.target && event.target.value) {
      const name = event && event.target && event.target.value.trim();
      this.validatePropertiesName = false;
      this.corePropertiesService
        .validateCorePropertiesName(name)
        .pipe(takeUntil(this.componetDestroyed))
        .subscribe(response => {
          if (response && !response.data) {
            this.validatePropertiesName = false;
            this.alertService.responseMessage(response);
          } else {
            this.validatePropertiesName = true;
          }
        });
    }
  }

  /**
   * on destroy
   */
  ngOnDestroy() {
    this.componetDestroyed.next();
    this.componetDestroyed.complete();
    this.componetDestroyed.unsubscribe();
    this.subscription.unsubscribe();
  }
}
