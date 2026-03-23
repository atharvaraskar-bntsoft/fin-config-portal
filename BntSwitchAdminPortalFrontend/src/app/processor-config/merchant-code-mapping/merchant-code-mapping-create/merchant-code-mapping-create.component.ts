import { Component, OnDestroy, OnInit } from '@angular/core';
import { UntypedFormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ViewSettingGetObject } from '@app/models/view-settings.interface';
import { AlertService } from '@app/services/alert.service';
import { selectMerchantCodeMappingPostSuccess } from '@app/store/selectors/merchant-code-mapping.selector';
import {
  selectMerchantConfigData,
  selectRowMerchantCodeMappingSuccess,
} from '@app/store/selectors/merchant-code-mapping.selector';
import { selectViewSettingsList } from '@app/store/selectors/view-settings.selector';
import { select, Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import { Subject, Subscription } from 'rxjs';
import { takeUntil, takeWhile } from 'rxjs/operators';
import { GetInstitutionAcquirerProcessorList } from '../../../store/actions/acquirer.action';
import { GetTreeDeepDevice } from '../../../store/actions/device.action';
import {
  GetMerchantConfigureData,
  GetRowMerchantCodeMapping,
} from '../../../store/actions/merchant-code-mapping.action';
import {
  ClearState,
  PostMerchantCodeMapping,
  UpdateMerchantCodeMapping,
} from '../../../store/actions/merchant-code-mapping.action';
import { selectInstitutionAcquirerProcessor } from '../../../store/selectors/acquirer.selector';
import { selectTreeDeepDetail } from '../../../store/selectors/device.selectors';
import { IAppState } from '../../../store/state/app.state';

@Component({
  selector: 'app-merchant-code-mapping-create',
  styleUrls: ['./merchant-code-mapping-create.component.scss'],
  templateUrl: './merchant-code-mapping-create.component.html',
})
export class MerchantCodeMappingCreateComponent implements OnInit, OnDestroy {
  [x: string]: any;
  public currentLang: string;
  public Labels: any = {};
  public isSpinning = false;
  public currentItem: any = {
    active: false,
    deleted: '0',
    destinationAcquirer: null,
    destinationDevice: null,
    destinationLocation: null,
    destinationMerchant: null,
    id: 1,
    processorId: null,
    processorList: null,
    sourceAcquirerId: null,
    sourceDeviceId: null,
    sourceLocationId: null,
    sourceMerchantId: null,
  };
  public errorClass = {
    processorId: false,
    mappingId: false,
    merchant: false,
    location: false,
    device: false,
    acquirer: false,
    merchantText: false,
    locationText: false,
    deviceText: false,
    acquirerText: false,
    institution: false,
  };
  public MerchantGroupId;
  public mappingId;
  public mappingList = [];
  public fg: UntypedFormGroup;
  public processorNameList: any;
  public deviceList = [];
  public merchantList = [];
  public acquirerList = [];
  public locationList = [];

  public errorMessage: String;
  public dataObject: any = [];
  public successMessage: String;
  public value: any;
  public submitted = false;
  public submit = new Subscription();
  public componetDestroyed = new Subject();
  public MerchantGroup = [];
  public allDisabled = false;

  constructor(
    private _store: Store<IAppState>,
    private alertService: AlertService,
    private translate: TranslateService,
    private router: Router,
    private route: ActivatedRoute,
  ) {


  }
    

  public ngOnInit() {

    // this._store.dispatch(new GetProcessorName());
    // this._store.pipe(select(selectProcessorName)).subscribe(ProcessorName => {
    //   if (ProcessorName) {
    //     this.processorNameList = ProcessorName.data;
    //   }
    // });

    this._store
      .pipe(takeUntil(this.componetDestroyed), select(selectViewSettingsList))
      .subscribe((response: ViewSettingGetObject) => {
        if (response) {
          this.currentLang = response.data.settingDto.language;
          this.translate.setDefaultLang(this.currentLang);
        }
      });

    this._store
      .pipe(takeUntil(this.componetDestroyed), select(selectMerchantCodeMappingPostSuccess))
      .subscribe((response: any) => {
        if (response) {
          this.submitted = false;
          this.isSpinning = false;
          this._store.dispatch(new ClearState());
          if (response && response.status === 'success') {
            this.router.navigate(['/processor-config/merchant-code-mapping']);
          } else if (response.status === 'failure') {
            this.errorMessage = response.message;
          }
        }
      });
    this._store.dispatch(new GetTreeDeepDevice());
    this._store
      .pipe(takeUntil(this.componetDestroyed), select(selectTreeDeepDetail))
      .subscribe((response: any) => {
        if (response) {
          this.MerchantGroup = [];
          response.forEach(merchant => {
            if (merchant.merchants.length > 0) {
              this.MerchantGroup.push(merchant);
            }
          });
          if (this.route.snapshot.paramMap.get('id')) {
            this.getMappingValue();
            if (this.dataObject.length > 0 && this.mappingId !== 'acquirer') {
              this.getlist();
            }
          }
        }
      });
    this._store.dispatch(new GetInstitutionAcquirerProcessorList());

    this._store
      .pipe(takeUntil(this.componetDestroyed), select(selectInstitutionAcquirerProcessor))
      .subscribe((response: any) => {
        if (response) {
          this.acquirerList = response.acqList;
          this.processorNameList = response.paList;
        }
      });
    this._store.dispatch(new GetMerchantConfigureData());

    this._store
      .pipe(takeUntil(this.componetDestroyed), select(selectMerchantConfigData))
      .subscribe((response: any) => {
        if (response) {
          this.mappingList = response;
        }
      });
  
    this.isSpinning = false;
    this.allDisabled = false;
    this.checkValue(this.currentItem);
    if (this.route.snapshot.paramMap.get('id')) {
      this.allDisabled = true;
      this._store.dispatch(new GetRowMerchantCodeMapping(this.route.snapshot.paramMap.get('id')));
      // this._store.pipe(select(selectRowMerchantCodeMappingSuccess)).subscribe((response: any) => {
      //   if (response !== null) {
      //     this.dataObject = response;
      //     this._updateFormGroup(this.dataObject);
      //     if (this.MerchantGroup.length > 0) {
      //       this.getMappingValue();
      //       if (this.mappingId !== 'acquirer') {
      //         this.getlist();
      //       }
      //     }
      //   }
      // });
    }
  }
  public getlist() {
    this.MerchantGroupId = this.currentItem.sourceMerchantId.merchantInstitution;
    this.MerchantGroupId = this.MerchantGroup.find(
      x => x.id === this.currentItem.sourceMerchantId.merchantInstitution.id,
    );
    this.merchantList = this.MerchantGroupId ? this.MerchantGroupId.merchants : [];
    if (this.mappingId === 'location' || this.mappingId === 'device') {
      const merchant = this.merchantList.find(x => x.id === this.currentItem.sourceMerchantId.id);
      this.locationList = merchant ? merchant.locations : [];
      if (this.mappingId === 'location' || this.mappingId === 'device') {
        const location = this.locationList.find(x => x.id === this.currentItem.sourceLocationId.id);
        this.deviceList = location ? location.devices : [];
        this.deviceList.map(data => {
          data.code = data.name;
          return data;
        });
      }
    }
  }
  public setData(data): void {
    this.currentItem.active = data.active;
    this.currentItem.merchantCode = data.merchantCode;
    this.currentItem.processorId = data.processorName;
    this.currentItem.processorMerchantCode = data.processorMerchantCode;
  }
  public onSubmit(): void {
    const flag = this.validationAll();
    if (!flag) {
      this.isSpinning = true;
      this.submitted = true;
      this.currentItem.id = this.dataObject ? this.dataObject.id : null;
      if (this.mappingId !== 'acquirer') {
        this.currentItem.sourceMerchantId.merchantInstitution = {
          id: this.MerchantGroupId.id,
          name: this.MerchantGroupId.name,
        };
      }
      if (this.route.snapshot.paramMap.get('id')) {
        this._store.dispatch(new UpdateMerchantCodeMapping(this.currentItem));
      } else {
        this._store.dispatch(new PostMerchantCodeMapping(this.currentItem));
      }
      this.isSubmitted();
    }
  }
  // loader
  public isSubmitted() {
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

  public checkStatus(): void {
    this.currentItem.active = !this.currentItem.active;
  }

  public f() {
    return this.fg.controls;
  }

  public checkValue(currentItem: boolean): any {
    this.translate.get(['ENABLE', 'DISABLE']).subscribe(translation => {
      return currentItem ? translation.ENABLE : translation.DISABLE;
    });
  }

  public getLocation(data) {
    const locationlist = [];
    data.locations.forEach(locations => {
      if (locations.devices.length > 0) {
        locationlist.push(locations);
      } else if (locations.devices.length == 0) {
        locationlist.push(locations);
      }
    });
    this.locationList = locationlist;
    this.currentItem.sourceDeviceId = null;
    this.currentItem.sourceLocationId = null;
    this.deviceList = [];
  }
  public getDevice(data) {
    this.deviceList = data.devices;
    this.deviceList.map(data => {
      data.code = data.name;
      return data;
    });
  }
  public ngOnDestroy() {
    this.componetDestroyed.next();
    this.submit.unsubscribe();
    this._store.dispatch(new ClearState());
    this.componetDestroyed.unsubscribe();
  }
  // loader
  private _updateFormGroup(updatedData: any): void {
    this.currentItem = updatedData;
  }
  private validationAll() {
    let flag = false;
    if (this.currentItem.processorId) {
      if (this.mappingId) {
        if (this.mappingId === 'acquirer') {
          flag = this.addErrorClass(this.currentItem.sourceAcquirerId, 'acquirer', flag);
          flag = this.addErrorClass(this.currentItem.destinationAcquirer, 'acquirerText', flag);
        } else {
          flag = this.addErrorClass(this.MerchantGroupId, 'institution', flag);
          flag = this.addErrorClass(this.currentItem.sourceMerchantId, 'merchant', flag);
          if (this.mappingId === 'merchant') {
            flag = this.addErrorClass(this.currentItem.destinationMerchant, 'merchantText', flag);
          } else {
            flag = this.addErrorClass(this.currentItem.sourceLocationId, 'location', flag);
            if (this.mappingId === 'location') {
              flag = this.addErrorClass(this.currentItem.destinationLocation, 'locationText', flag);
            } else if (this.mappingId === 'device') {
              flag = this.addErrorClass(this.currentItem.sourceDeviceId, 'device', flag);
              flag = this.addErrorClass(this.currentItem.destinationDevice, 'deviceText', flag);
            }
          }
        }
        this.errorClass.mappingId = false;
      } else {
        this.errorClass.mappingId = true;
        flag = true;
      }
      this.errorClass.processorId = false;
    } else {
      this.errorClass.processorId = true;
      flag = true;
    }
    return flag;
  }
  public addErrorClass(data, value, flag = false) {
    if (data) {
      this.errorClass[value] = false;
    } else {
      this.errorClass[value] = true;
      flag = true;
    }
    return flag;
  }
  public onMerchantGroupChange(val) {
    const merchantList = [];
    val.merchants.forEach(merchants => {
      if (merchants.locations.length > 0) {
        merchantList.push(merchants);
      }
    });
    this.merchantList = merchantList;
  }
  private getMappingValue() {
    if (this.currentItem.destinationDevice) {
      this.mappingId = 'device';
    } else if (this.currentItem.destinationLocation) {
      this.mappingId = 'location';
    } else if (this.currentItem.destinationMerchant) {
      this.mappingId = 'merchant';
    } else if (this.currentItem.destinationAcquirer) {
      this.mappingId = 'acquirer';
    }
  }
  public changeMapp() {
    this.currentItem.destinationLocation = null;
    this.currentItem.destinationAcquirer = null;
    this.currentItem.destinationDevice = null;
    this.currentItem.destinationMerchant = null;
    this.currentItem.sourceAcquirerId = null;
    this.currentItem.sourceDeviceId = null;
    this.currentItem.sourceLocationId = null;
    this.currentItem.sourceMerchantId = null;
  }
}
