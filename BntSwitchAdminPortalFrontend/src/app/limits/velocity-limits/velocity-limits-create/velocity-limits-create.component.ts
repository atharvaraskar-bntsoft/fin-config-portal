import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { IAppState } from '../../../store/state/app.state';
import { AlertService } from '@app/services/alert.service';
import { ActivatedRoute, Router } from '@angular/router';
import { UntypedFormGroup, UntypedFormControl, Validators } from '@angular/forms';
import {
  GetVelocityLimitsEditTransaction,
  GetVelocityLimitsEditInstitution,
  GetVelocityLimitsEditCurrency,
  GetVelocityLimitsEditRow,
  UpdateVelocityLimits,
  CreateVelocityLimits,
} from 'src/app/store/actions/velocity-limits.action';
import {
  selectVelocityLimitsEditTransaction,
  selectVelocityLimitsEditInstitution,
  selectVelocityLimitsEditCurrency,
  selectVelocityLimitsEditRow,
  selectLimitsResponseJsonSuccess,
} from 'src/app/store/selectors/velocity-limits.selector';
import { ClearState } from '@app/store/actions/velocity-limits.action';
import { selectViewSettingsList } from '@app/store/selectors/view-settings.selector';
import { TranslateService } from '@ngx-translate/core';
import { Subscription, Subject } from 'rxjs';
import { takeUntil, takeWhile } from 'rxjs/operators';
import { ViewSettingGetObject } from '@app/models/view-settings.interface';

@Component({
  selector: 'app-velocity-limits-create',
  styleUrls: ['./velocity-limits-create.component.scss'],
  templateUrl: './velocity-limits-create.component.html',
})
export class VelocityLimitsCreateComponent implements OnInit, OnDestroy {
  public currencyTest: any;
  isSpinning = false;
  public transactionTest: any;
  public currentLang: string;
  public Labels: any = {};
  public limitFlag: Boolean = false;
  public inputBoxFlag = true;
  public institutionGroupFlag = false;
  public transactionLabelFlag = false;
  public deviceFlag = false;
  public locationFlag = false;
  public institutionFlag = false;
  public rowsDevicesData: any;
  public rowsLocationData: any;
  public rowsInstitutionData: any;
  public checkType: any = 1;
  public institutionGroupDataRow: any = [];
  public currencyDataRow: any;
  public transactionDataRow: any;
  public id: any;
  public currencyFlag = false;
  public errorMessage = '';
  public successMessage = '';
  public dataObject: any;
  public submitted = false;
  submit = new Subscription();
  public minutesCountFlag: Boolean = true;
  public editModeSingleTransaction = false;
  public editModeperTime = false;
  public editModeperDay = false;
  public editModeperMonth = false;
  public applyLimitTo = [
    { id: 1, name: 'MerchantInstitution', code: 'INSTITUTION_GROUPS' },
    { id: 2, name: 'Merchant', code: 'INSTITUTIONS' },
    { id: 3, name: 'Location', code: 'LOCATIONS' },
    { id: 4, name: 'Device', code: 'DEVICES' },
  ];
  public minutesCount = [1, 5, 20, 40, 60];
  public currentItem = {
    deviceId: null,
    locationId: null,
    merchantId: null,
    merchantInstitutionId: null,
    type: { id: 1, name: 'MerchantInstitution', code: 'INSTITUTION_GROUPS' },
    baseCurrencyId: null,
    id: null,
    limitAmount: {
      perDay: null,
      perMonth: null,
      perTime: null,
      singleTransaction: null,
    },
    limitCount: {
      perDay: null,
      perMonth: null,
      perTime: null,
      singleTransaction: null,
    },
    minutesCount: 1,
    locked: '0',
    transactionTypes: { id: null, name: null },
  };
  componetDestroyed = new Subject();
  public velocityFormGroup: UntypedFormGroup;
  public flag = 0;
  public disabled = false;
  constructor(
    private _store: Store<IAppState>,
    private translate: TranslateService,
    private _route: ActivatedRoute,
    private _router: Router,
    private alertService: AlertService,
  ) {  }

  public initilizedropDown() {
    //  this.getInstituteGroup();
    // this.getInstitute();
    // this.getLocation();
    // this.getDevice();
  }

  public getInstituteGroup() {
    if (!this.id && this.institutionGroupDataRow.length !== 0) {
      this.velocityFormGroup.patchValue({
        institutionGroup: this.institutionGroupDataRow[0],
      });
    }
  }

  public getInstitute() {
    this.rowsInstitutionData = this.institutionGroupDataRow[0]?.merchants;
    if (!this.id && this.rowsInstitutionData && this.rowsInstitutionData.length !== 0) {
      this.velocityFormGroup.patchValue({
        institution: this.rowsInstitutionData[0],
      });
    }
  }

  public getLocation() {
    this.rowsLocationData = this.rowsInstitutionData[0]?.locations;
    if (!this.id && this.rowsLocationData && this.rowsLocationData.length !== 0) {
      this.velocityFormGroup.patchValue({
        location: null,
      });
    }
  }

  public getDevice() {
    this.rowsDevicesData = this.rowsLocationData[0]?.devices;
    if (!this.id && this.rowsDevicesData && this.rowsDevicesData.length !== 0) {
      this.velocityFormGroup.patchValue({
        device: null,
      });
    }
  }

  public getTriggerInstituteGroup() {
    this.rowsLocationData = this.rowsInstitutionData[0]?.locations;
    this.rowsDevicesData = this.rowsLocationData[0]?.devices;
    if (this.rowsInstitutionData.length !== 0) {
      this.velocityFormGroup.patchValue({
        institution: null,
      });
    }
    if (this.rowsLocationData.length !== 0) {
      this.velocityFormGroup.patchValue({
        location: null,
      });
    }
    if (this.rowsDevicesData.length !== 0) {
      this.velocityFormGroup.patchValue({
        device: null,
      });
    }
  }

  public getTriggerInstitute() {
    this.rowsDevicesData = this.rowsLocationData[0]?.devices;
    if (this.rowsDevicesData.length !== 0) {
      this.velocityFormGroup.patchValue({
        device: null,
      });
    }
  }

  public ngOnInit() {
    
    this.id = this._route.snapshot.paramMap.get('id');

    this._store.pipe(select(selectViewSettingsList)).subscribe((response: ViewSettingGetObject) => {
      if (response) {
        this.currentLang = response.data.settingDto.language;
        this.translate.setDefaultLang(this.currentLang);
      }
    });

    this._store
      .pipe(takeUntil(this.componetDestroyed), select(selectLimitsResponseJsonSuccess))
      .subscribe((response: any) => {
        if (response) {
          this.submitted = false;
          this.isSpinning = false;
          if (response.status === 'success') {
            this._store.dispatch(new ClearState());
            this._router.navigate(['/limits/velocity-limits']);
          } else if (response.status === 'failure') {
            this._store.dispatch(new ClearState());
            this._router.navigate(['/limits/velocity-limits']);
          }
        }
      });

    this._store.dispatch(new GetVelocityLimitsEditTransaction());

    this._store.dispatch(new GetVelocityLimitsEditInstitution());

    this._store.dispatch(new GetVelocityLimitsEditCurrency());
    this.createFormGroup();
    this.translate
      .get(['INSTITUTION_GROUPS', 'INSTITUTIONS', 'LOCATIONS', 'DEVICES'])
      .subscribe(translation => {
        this.applyLimitTo = [
          { id: 1, name: 'MerchantInstitution', code: translation.INSTITUTION_GROUPS },
          { id: 2, name: 'Merchant', code: translation.INSTITUTIONS },
          { id: 3, name: 'Location', code: translation.LOCATIONS },
          { id: 4, name: 'Device', code: translation.DEVICES },
        ];
        this.currentItem.type = {
          id: 1,
          name: 'MerchantInstitution',
          code: translation.INSTITUTION_GROUP,
        };
      });

    this._store
      .pipe(takeUntil(this.componetDestroyed), select(selectVelocityLimitsEditTransaction))
      .subscribe((Velocitylimitsedittransaction: any) => {
        if (Velocitylimitsedittransaction) {
          this.transactionDataRow = Velocitylimitsedittransaction;
          // this.velocityFormGroup.patchValue({
          //   transactionTypes: this.transactionDataRow[0],
          // });
        }
      });

    this._store
      .pipe(takeUntil(this.componetDestroyed), select(selectVelocityLimitsEditCurrency))
      .subscribe((Velocitylimitseditcurrency: any) => {
        if (Velocitylimitseditcurrency !== null) {
          this.currencyDataRow = Velocitylimitseditcurrency;
          this.currentItem.baseCurrencyId = this.currencyDataRow[0];
          // this.velocityFormGroup.patchValue({
          //   currency: this.currentItem.baseCurrencyId,
          // });
        }
      });

    this._store
      .pipe(takeUntil(this.componetDestroyed), select(selectVelocityLimitsEditInstitution))
      .subscribe((Velocitylimiteditinstitutiongroup: any) => {
        if (
          Velocitylimiteditinstitutiongroup !== null &&
          Velocitylimiteditinstitutiongroup.length
        ) {
          this.institutionGroupDataRow = Velocitylimiteditinstitutiongroup;

          // this.getInstituteGroup();
          // this.getInstitute();
          // this.getLocation();
          // this.getDevice();
          this.isSpinning = false;
        }
      });

    if (this.id && this.velocityFormGroup) {
      this.applyLimitToDisabled();
    }

    if (this.id) {
      this.disabled = true;
      this._store.dispatch(new GetVelocityLimitsEditRow(this.id));
      this._store
        .pipe(takeUntil(this.componetDestroyed), select(selectVelocityLimitsEditRow))
        .subscribe((Velocitylimitseditrow: any) => {
          if (Velocitylimitseditrow) {
            this.checkType = Velocitylimitseditrow.type.id;
            this.dataObject = Velocitylimitseditrow;
            this.updateFormGroup(this.dataObject);
          }
        });
    }
    let validatorcurrency;
    validatorcurrency = this.velocityFormGroup.get('currency');
    validatorcurrency.setValidators(Validators.required);
  }

  public createFormGroup() {
    this.velocityFormGroup = new UntypedFormGroup({
      currency: new UntypedFormControl(this.currentItem.baseCurrencyId),
      device: new UntypedFormControl(this.currentItem.deviceId),
      institution: new UntypedFormControl(this.currentItem.merchantId),
      institutionGroup: new UntypedFormControl(null),
      limitAmount: new UntypedFormGroup({
        perDay: new UntypedFormControl(),
        perDayCheckBox: new UntypedFormControl(),
        perMonth: new UntypedFormControl(),
        perMonthCheckBox: new UntypedFormControl(),
        perTime: new UntypedFormControl(),
        perTimeCheckBox: new UntypedFormControl(),
        singleTransaction: new UntypedFormControl(),
        singleTransactionCheckBox: new UntypedFormControl(),
      }),
      limitCount: new UntypedFormGroup({
        perDay: new UntypedFormControl(),
        perDayCheckBox: new UntypedFormControl(),
        perMonth: new UntypedFormControl(),
        perMonthCheckBox: new UntypedFormControl(),
        perTime: new UntypedFormControl(),
        perTimeCheckBox: new UntypedFormControl(),
        singleTransaction: new UntypedFormControl(),
        singleTransactionCheckBox: new UntypedFormControl(),
      }),
      location: new UntypedFormControl(this.currentItem.locationId),
      minutesCount: new UntypedFormControl(this.currentItem.minutesCount),
      locked: new UntypedFormControl(this.currentItem.locked === '1' ? false : true),
      transactionTypes: new UntypedFormControl(null, Validators.required),
      type: new UntypedFormControl(null),
    });
  }

  public f() {
    return this.velocityFormGroup.controls;
  }

  public fillEditDropDown(updatedData: any) {
    let output;
    if (this.institutionGroupDataRow && this.institutionGroupDataRow.length !== 0) {
      if (updatedData.merchantInstitutionId !== null) {
        output = this.institutionGroupDataRow.find(
          item => item.id === updatedData.merchantInstitutionId.id,
        );
        this.rowsInstitutionData = output ? output.merchants : [];
      }
      if (updatedData.merchantId !== null) {
        output = this.rowsInstitutionData.find(item => item.id === updatedData.merchantId.id);
        this.rowsLocationData = output ? output.locations : [];
      }
      if (updatedData.locationId !== null) {
        output = this.rowsLocationData.find(item => item.id === updatedData.locationId.id);
        this.rowsDevicesData = output ? output.devices : [];
      }
    }
  }

  public updateFormGroup(updatedData: any) {
    if (updatedData) {
      this.fillEditDropDown(updatedData);
      this.limitFlag = true;
      this.velocityFormGroup.setValue({
        currency:
          updatedData.baseCurrencyId !== null
            ? { id: updatedData.baseCurrencyId.id, name: updatedData.baseCurrencyId.code }
            : null,
        device:
          updatedData.deviceId !== null
            ? { id: updatedData.deviceId.id, name: updatedData.deviceId.code }
            : null,
        institution: updatedData.merchantId !== null ? updatedData.merchantId : null,
        institutionGroup:
          updatedData.merchantInstitutionId !== null ? updatedData.merchantInstitutionId : null,
        limitAmount: {
          perDay: updatedData.limitAmount.perDay,
          perDayCheckBox: updatedData.limitAmount.perDay !== null ? true : false,
          perMonth: updatedData.limitAmount.perMonth,
          perMonthCheckBox: updatedData.limitAmount.perMonth !== null ? true : false,
          perTime: updatedData.limitAmount.perTime,
          perTimeCheckBox: updatedData.limitAmount.perTime !== null ? true : false,
          singleTransaction: updatedData.limitAmount.singleTransaction,
          singleTransactionCheckBox:
            updatedData.limitAmount.singleTransaction !== null ? true : false,
        },
        limitCount: {
          perDay:
            updatedData.limitCount.perDay !== null
              ? parseInt(updatedData.limitCount.perDay, 0)
              : '',
          perDayCheckBox: updatedData.limitCount.perDay !== null ? true : false,
          perMonth: updatedData.limitCount.perMonth,
          perMonthCheckBox: updatedData.limitCount.perMonth !== null ? true : false,
          perTime: updatedData.limitCount.perTime,
          perTimeCheckBox: updatedData.limitCount.perTime !== null ? true : false,
          singleTransaction: updatedData.limitCount.singleTransaction,
          singleTransactionCheckBox:
            updatedData.limitCount.singleTransaction !== null ? true : false,
        },
        location: updatedData.locationId !== null ? updatedData.locationId : null,
        minutesCount: updatedData.minutesCount,
        locked: updatedData.locked === '1' ? false : true,
        transactionTypes: updatedData.transactionTypes,
        type: updatedData.type,
      });
      this.currentItem.type = updatedData.type;
      this.currentItem.transactionTypes = updatedData.transactionTypes;
      this.checkType = updatedData.type.id;
      if (!updatedData.limitCount.perDay) {
        this.velocityFormGroup.get('limitCount.perDay').disable();
      } else {
        this.velocityFormGroup.get('limitCount.perDay').enable();
      }

      if (!updatedData.limitCount.perMonth) {
        this.velocityFormGroup.get('limitCount.perMonth').disable();
      } else {
        this.velocityFormGroup.get('limitCount.perMonth').enable();
      }

      if (!updatedData.limitCount.perTime) {
        this.velocityFormGroup.get('limitCount.perTime').disable();
      } else {
        this.velocityFormGroup.get('limitCount.perTime').enable();
      }

      if (!updatedData.limitAmount.perDay) {
        this.velocityFormGroup.get('limitAmount.perDay').disable();
      } else {
        this.velocityFormGroup.get('limitAmount.perDay').enable();
      }

      if (!updatedData.limitAmount.perMonth) {
        this.velocityFormGroup.get('limitAmount.perMonth').disable();
      } else {
        this.velocityFormGroup.get('limitAmount.perMonth').enable();
      }

      if (!updatedData.limitAmount.perTime) {
        this.velocityFormGroup.get('limitAmount.perTime').disable();
      } else {
        this.velocityFormGroup.get('limitAmount.perTime').enable();
      }

      if (!updatedData.limitAmount.singleTransaction) {
        this.velocityFormGroup.get('limitAmount.singleTransaction').disable();
      } else {
        this.velocityFormGroup.get('limitAmount.singleTransaction').enable();
      }
      this.currentItem.locked = updatedData.locked;
    }
  }

  public setData(data) {
    const txnObj = { id: null, name: data.transactionTypes };
    switch (this.checkType) {
      case 1:
        data.institution = null;
        data.location = null;
        data.device = null;
        break;
      case 2:
        data.location = null;
        data.device = null;
      case 3:
        data.device = null;
        break;
    }
    this.currentItem.deviceId = data.device;
    this.currentItem.locationId = data.location;
    this.currentItem.merchantId = data.institution;
    this.currentItem.merchantInstitutionId = data.institutionGroup;
    this.currentItem.type = data.type || this.currentItem.type;
    this.currentItem.id = this.dataObject ? this.dataObject.id : null;
    this.currentItem['limitAmount']['perDay'] = data.limitAmount.perDayCheckBox
      ? data.limitAmount.perDay
      : null;
    this.currentItem['limitAmount']['perTime'] = data.limitAmount.perTimeCheckBox
      ? data.limitAmount.perTime
      : null;
    this.currentItem['limitAmount']['perMonth'] = data.limitAmount.perMonthCheckBox
      ? data.limitAmount.perMonth
      : null;
    this.currentItem['limitAmount']['singleTransaction'] = data.limitAmount
      .singleTransactionCheckBox
      ? data.limitAmount.singleTransaction
      : null;
    this.currentItem['limitCount']['perDay'] = data.limitCount.perDayCheckBox
      ? parseInt(data.limitCount.perDay, 0)
      : null;
    this.currentItem['limitCount']['perTime'] = data.limitCount.perTimeCheckBox
      ? parseInt(data.limitCount.perTime, 0)
      : null;
    this.currentItem['limitCount']['perMonth'] = data.limitCount.perMonthCheckBox
      ? parseInt(data.limitCount.perMonth, 0)
      : null;
    this.currentItem['minutesCount'] = data.minutesCount;
    // this.currentItem['status'] = data['status'];
    this.currentItem.baseCurrencyId = data.currency;
    this.currentItem.transactionTypes = data.transactionTypes
      ? txnObj
      : this.currentItem.transactionTypes;
    // data.transactionTypes || this.currentItem.transactionTypes;
  }

  public onSubmit({ value }) {
    if (this.checkLimitType()) {
      this.isSpinning = true;
      this.submitted = true;
      this.setData(value);
      if (this._route.snapshot.paramMap.get('id')) {
        this._store.dispatch(new UpdateVelocityLimits(this.currentItem));
      } else {
        this._store.dispatch(new CreateVelocityLimits(this.currentItem));
      }
      this.submitted = true;
      this.isSubmitted();
    } else {
      this.alertService.responseMessage({
        status: 'failure',
        message: 'Please select the limit to applied',
      });
    }
    //this._store.dispatch(new CreateVelocityLimits(this.currentItem));
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
        console.log('data', data);
        if (data == false) {
          this.submitted = data;
          this.isSpinning = false;
          this.submit.unsubscribe();
        }
      });
  }

  public onInstitutionGroupChange(value: any) {
    this.setDefaultValueDeviceAndLocation();
    if (value && value.merchants.length !== 0) {
      this.rowsInstitutionData = value.merchants;
      this.getTriggerInstituteGroup();
    } else {
      this.rowsInstitutionData = [];
      this.rowsLocationData = [];
      this.rowsDevicesData = [];
    }
  }

  public onInstitutionChange(value: any) {
    this.setDefaultValueDeviceAndLocation();
    if (value && value.locations.length !== 0) {
      this.rowsLocationData = value.locations;
      this.velocityFormGroup.patchValue({
        location: null,
      });
      this.getTriggerInstitute();
    } else {
      this.rowsLocationData = [];
      this.rowsDevicesData = [];
    }
  }

  public onLocationChange(value: any) {
    this.setDefaultValueDevice();
    if (value && value.devices.length !== 0) {
      this.rowsDevicesData = value.devices;
      this.velocityFormGroup.patchValue({
        device: null,
      });
    } else {
      this.rowsDevicesData = [];
    }
  }

  setDefaultValueInsituteGroupAndInstituteAndLocationAndDevice() {
    this.velocityFormGroup.patchValue({
      device: null,
    });
    this.velocityFormGroup.patchValue({
      location: null,
    });
    this.velocityFormGroup.patchValue({
      institution: null,
    });
    this.velocityFormGroup.patchValue({
      institutionGroup: null,
    });
  }

  setDefaultValueInsituteAndLocationAndDevice() {
    this.velocityFormGroup.patchValue({
      device: null,
    });
    this.velocityFormGroup.patchValue({
      location: null,
    });
    this.velocityFormGroup.patchValue({
      institution: null,
    });
  }

  setDefaultValueDeviceAndLocation() {
    this.velocityFormGroup.patchValue({
      device: null,
    });
    this.velocityFormGroup.patchValue({
      location: null,
    });
  }

  setDefaultValueDevice() {
    this.velocityFormGroup.patchValue({
      device: null,
    });
  }

  public applyLimitToChange(event) {
    const validators = [Validators.required];
    let validatorsObj;
    this.setDefaultValueInsituteGroupAndInstituteAndLocationAndDevice();
    this.initilizedropDown();

    switch (event.id) {
      case 2:
        this.checkType = 2;
        //  this.getInstitute();
        // dynamic validation
        validatorsObj = this.velocityFormGroup.get('institution');
        validatorsObj.setValidators(validators);
        validatorsObj = this.velocityFormGroup.get('location');
        validatorsObj.clearValidators();
        validatorsObj = this.velocityFormGroup.get('device');
        validatorsObj.clearValidators();
        break;
      case 3:
        this.checkType = 3;
        // this.getInstitute();
        // this.getLocation();
        // dynamic validation
        validatorsObj = this.velocityFormGroup.get('institution');
        validatorsObj.setValidators(validators);
        validatorsObj = this.velocityFormGroup.get('location');
        validatorsObj.setValidators(validators);
        validatorsObj = this.velocityFormGroup.get('device');
        validatorsObj.clearValidators();
        break;
      case 4:
        this.checkType = 4;
        // this.getInstitute();
        // this.getLocation();
        // this.getDevice();

        // dynamic validation
        validatorsObj = this.velocityFormGroup.get('institution');
        validatorsObj.setValidators(validators);
        validatorsObj = this.velocityFormGroup.get('location');
        validatorsObj.setValidators(validators);
        validatorsObj = this.velocityFormGroup.get('device');
        validatorsObj.setValidators(validators);
        break;
      default:
        this.checkType = 1;
        // this.getInstituteGroup();
        // dynamic validation
        validatorsObj = this.velocityFormGroup.get('institutionGroup');
        validatorsObj.setValidators(validators);
        validatorsObj = this.velocityFormGroup.get('institution');
        validatorsObj.clearValidators();
        validatorsObj = this.velocityFormGroup.get('location');
        validatorsObj.clearValidators();
        validatorsObj = this.velocityFormGroup.get('device');
        validatorsObj.clearValidators();
        break;
    }
  }

  public minutesFlag() {
    this.minutesCountFlag = !this.minutesCountFlag;
  }

  public perTimeDropDown(event) {
    this.minutesCountFlag = !this.minutesCountFlag;
    this.currentItem.minutesCount = event;
  }

  public checkStatus() {
    if (this.currentItem.locked === '0') {
      this.currentItem.locked = '1';
    } else {
      this.currentItem.locked = '0';
    }
    this.velocityFormGroup.patchValue({
      locked: this.currentItem.locked === '1' ? false : true,
    });
  }

  checkLimitType(): Boolean {
    const output = this.velocityFormGroup.value;
    if (
      output.limitAmount.perDayCheckBox ||
      output.limitAmount.perMonthCheckBox ||
      output.limitAmount.perTimeCheckBox ||
      output.limitAmount.singleTransactionCheckBox
    ) {
      return true;
    } else if (
      output.limitCount.perDayCheckBox ||
      output.limitCount.perMonthCheckBox ||
      output.limitCount.perTimeCheckBox
    ) {
      return true;
    } else {
      return false;
    }
  }

  // checkbox logic
  public singleTransactionAmountCheckBox(event): void {
    this.currentItem.limitAmount.singleTransaction = event.srcElement.checked;
    const validators = [Validators.required, Validators.pattern(/^(0|[1-9]\d*)(\.\d+)?$/)];
    const singleTransactionControl = this.velocityFormGroup.get('limitAmount.singleTransaction');

    if (event.srcElement.checked === false) {
      this.limitFlag = false;
      this.velocityFormGroup.patchValue({
        limitAmount: {
          singleTransaction: null,
        },
      });
      singleTransactionControl.clearValidators();
      this.velocityFormGroup.get('limitAmount.singleTransaction').disable();
    } else {
      singleTransactionControl.setValidators(validators);
      this.limitFlag = true;
      this.velocityFormGroup.get('limitAmount.singleTransaction').enable();
      if (this.dataObject) {
        this.velocityFormGroup.patchValue({
          limitAmount: {
            singleTransaction: this.dataObject.limitAmount.singleTransaction,
          },
        });
      } else {
        this.velocityFormGroup.patchValue({
          limitAmount: {
            singleTransaction: null,
          },
        });
      }
    }
    this.velocityFormGroup.updateValueAndValidity();
  }

  public perTimeAmountCheckBox(event): void {
    this.editModeperTime = event.srcElement.checked;
    this.currentItem.limitAmount.perTime = event.srcElement.checked;
    console.log('check', this.currentItem.limitAmount.perTime);
    const validators = [Validators.required, Validators.pattern(/^(0|[1-9]\d*)(\.\d+)?$/)];
    const perTimeControl = this.velocityFormGroup.get('limitAmount.perTime');
    if (event.srcElement.checked === false) {
      this.limitFlag = false;
      this.velocityFormGroup.patchValue({
        limitAmount: {
          perTime: '',
        },
      });
      perTimeControl.clearValidators();
      perTimeControl.disable();
    } else {
      this.limitFlag = true;
      if (this.dataObject) {
        this.velocityFormGroup.patchValue({
          limitAmount: {
            perTime: this.dataObject.limitAmount.perTime,
          },
        });
      } else {
        this.velocityFormGroup.patchValue({
          limitAmount: {
            perTime: null,
          },
        });
      }
      perTimeControl.setValidators(validators);
      perTimeControl.enable();
    }
    this.velocityFormGroup.updateValueAndValidity();
  }

  public perTimeCountCheckBox(event): void {
    this.editModeperTime = event.srcElement.checked;
    this.currentItem.limitCount.perTime = event.srcElement.checked;
    const validators = [Validators.required, Validators.pattern(/^(0|[1-9]\d*)(\.\d+)?$/)];
    const perTimeControl = this.velocityFormGroup.get('limitCount.perTime');
    if (event.srcElement.checked === false) {
      this.limitFlag = false;
      this.velocityFormGroup.patchValue({
        limitCount: {
          perTime: null,
        },
      });
      perTimeControl.disable();
    } else {
      this.limitFlag = true;
      if (this.dataObject) {
        this.velocityFormGroup.patchValue({
          limitCount: {
            perTime: this.dataObject.limitCount.perTime,
          },
        });
      } else {
        this.velocityFormGroup.patchValue({
          limitCount: {
            perTime: null,
          },
        });
      }
      perTimeControl.setValidators(validators);
      perTimeControl.enable();
    }
    this.velocityFormGroup.updateValueAndValidity();
  }

  public perDayAmountCheckBox(event): void {
    this.editModeperDay = event.srcElement.checked;
    this.currentItem.limitAmount.perDay = event.srcElement.checked;
    const validators = [Validators.required, Validators.pattern(/^(0|[1-9]\d*)(\.\d+)?$/)];
    const perDayControl = this.velocityFormGroup.get('limitAmount.perDay');
    if (event.srcElement.checked === false) {
      this.limitFlag = false;
      this.velocityFormGroup.patchValue({
        limitAmount: {
          perDay: null,
        },
      });
      perDayControl.disable();
    } else {
      this.limitFlag = true;
      if (this.dataObject) {
        this.velocityFormGroup.patchValue({
          limitAmount: {
            perDay: this.dataObject.limitAmount.perDay,
          },
        });
      } else {
        this.velocityFormGroup.patchValue({
          limitAmount: {
            perDay: null,
          },
        });
      }
      perDayControl.setValidators(validators);
      perDayControl.enable();
    }
    this.velocityFormGroup.updateValueAndValidity();
  }

  public perDayCountCheckBox(event): void {
    this.editModeperDay = event.srcElement.checked;
    this.currentItem.limitCount.perDay = event.srcElement.checked;
    const validators = [Validators.required, Validators.pattern(/^(0|[1-9]\d*)(\.\d+)?$/)];
    const perDayControl = this.velocityFormGroup.get('limitCount.perDay');
    if (event.srcElement.checked === false) {
      this.limitFlag = false;
      this.velocityFormGroup.patchValue({
        limitCount: {
          perDay: null,
        },
      });
      perDayControl.disable();
      perDayControl.clearValidators();
    } else {
      this.limitFlag = true;
      if (this.dataObject) {
        this.velocityFormGroup.patchValue({
          limitCount: {
            perDay: this.dataObject.limitCount.perDay,
          },
        });
      } else {
        this.velocityFormGroup.patchValue({
          limitCount: {
            perDay: null,
          },
        });
      }
      perDayControl.setValidators(validators);
      perDayControl.enable();
    }
    this.velocityFormGroup.updateValueAndValidity();
  }

  public perMonthAmountCheckBox(event): void {
    this.editModeperMonth = event.srcElement.checked;
    this.currentItem.limitAmount.perMonth = event.srcElement.checked;
    const perMonthControl = this.velocityFormGroup.get('limitAmount.perMonth');
    const validators = [Validators.required, Validators.pattern(/^(0|[1-9]\d*)(\.\d+)?$/)];
    if (event.srcElement.checked === false) {
      this.limitFlag = false;
      this.velocityFormGroup.patchValue({
        limitAmount: {
          perMonth: null,
        },
      });
      perMonthControl.clearValidators();
      this.velocityFormGroup.get('limitAmount.perMonth').disable();
    } else {
      this.limitFlag = true;
      this.velocityFormGroup.get('limitAmount.perMonth').enable();
      perMonthControl.setValidators(validators);
      if (this.dataObject) {
        this.velocityFormGroup.patchValue({
          limitAmount: {
            perMonth: this.dataObject.limitAmount.perMonth,
          },
        });
      } else {
        this.velocityFormGroup.patchValue({
          limitAmount: {
            perMonth: null,
          },
        });
      }
    }
    this.velocityFormGroup.updateValueAndValidity();
  }

  public perMonthCountCheckBox(event): void {
    this.editModeperMonth = event.srcElement.checked;
    this.currentItem.limitCount.perMonth = event.srcElement.checked;
    const validators = [Validators.required, Validators.pattern(/^(0|[1-9]\d*)(\.\d+)?$/)];
    const perMonthControl = this.velocityFormGroup.get('limitCount.perMonth');
    if (event.srcElement.checked === false) {
      this.limitFlag = false;
      this.velocityFormGroup.patchValue({
        limitCount: {
          perMonth: null,
        },
      });
      perMonthControl.clearValidators();
      this.velocityFormGroup.get('limitCount.perMonth').disable();
    } else {
      this.limitFlag = true;
      this.velocityFormGroup.get('limitCount.perMonth').enable();
      perMonthControl.setValidators(validators);
      if (this.dataObject) {
        this.velocityFormGroup.patchValue({
          limitCount: {
            perMonth: this.dataObject.limitCount.perMonth,
          },
        });
      } else {
        this.velocityFormGroup.patchValue({
          limitCount: {
            perMonth: null,
          },
        });
      }
    }
    this.velocityFormGroup.updateValueAndValidity();
  }

  // checkbox logic

  public applyLimitToDisabled(): void {
    const validators = [Validators.required, Validators.pattern(/^(0|[1-9]\d*)(\.\d+)?$/)];
    this.velocityFormGroup.controls.type.disable();
    this.velocityFormGroup.controls.transactionTypes.disable();
    this.velocityFormGroup.controls.institutionGroup.disable();
    this.velocityFormGroup.controls.institution.disable();
    this.velocityFormGroup.controls.location.disable();
    this.velocityFormGroup.controls.device.disable();
    this.velocityFormGroup.get('limitAmount').valueChanges.subscribe((mode: any) => {
      const singleTransactionControl = this.velocityFormGroup.get('limitAmount.singleTransaction');
      if (mode.singleTransactionCheckBox) {
        singleTransactionControl.setValidators(validators);
      } else {
        this.editModeSingleTransaction = false;
        singleTransactionControl.clearValidators();
      }
      const perTimeControl = this.velocityFormGroup.get('limitAmount.perTime');
      if (mode.perTimeCheckBox) {
        this.editModeperTime = true;
        perTimeControl.setValidators(validators);
      } else {
        this.editModeperTime = false;
        perTimeControl.clearValidators();
      }
      const perDayControl = this.velocityFormGroup.get('limitAmount.perDay');
      if (mode.perDayCheckBox) {
        this.editModeperDay = true;
        perDayControl.setValidators(validators);
      } else {
        this.editModeperDay = false;
        perDayControl.clearValidators();
      }
      const perMonthControl = this.velocityFormGroup.get('limitAmount.perMonth');
      if (mode.perMonthCheckBox) {
        this.editModeperMonth = true;
        perMonthControl.setValidators(validators);
      } else {
        this.editModeperMonth = false;
        perMonthControl.clearValidators();
      }
      this.velocityFormGroup.updateValueAndValidity();
    });

    this.velocityFormGroup.get('limitCount').valueChanges.subscribe((mode: any) => {
      const singleTransactionControl = this.velocityFormGroup.get('limitCount.singleTransaction');
      if (mode.singleTransactionCheckBox) {
        singleTransactionControl.setValidators(validators);
      } else {
        singleTransactionControl.clearValidators();
      }
      const perTimeControl = this.velocityFormGroup.get('limitCount.perTime');
      if (mode.perTimeCheckBox) {
        this.editModeperTime = true;
        perTimeControl.setValidators(validators);
      } else {
        this.editModeperTime = false;
        perTimeControl.clearValidators();
      }
      const perDayControl = this.velocityFormGroup.get('limitCount.perDay');
      if (mode.perDayCheckBox) {
        this.editModeperDay = true;
        perDayControl.setValidators(validators);
      } else {
        this.editModeperDay = false;
        perDayControl.clearValidators();
      }
      const perMonthControl = this.velocityFormGroup.get('limitCount.perMonth');
      if (mode.perMonthCheckBox) {
        this.editModeperMonth = true;
        perMonthControl.setValidators(validators);
      } else {
        this.editModeperMonth = false;
        perMonthControl.clearValidators();
      }
      this.velocityFormGroup.updateValueAndValidity();
    });
  }

  public onTransactionLabel(): void {
    this.transactionLabelFlag = true;
  }

  public cancel(): void {
    this._router.navigate(['/limits/velocity-limits']);
  }

  ngOnDestroy() {
    this.componetDestroyed.next();
    this.submit.unsubscribe();
    this.componetDestroyed.unsubscribe();
    this._store.dispatch(new ClearState());
  }
}
