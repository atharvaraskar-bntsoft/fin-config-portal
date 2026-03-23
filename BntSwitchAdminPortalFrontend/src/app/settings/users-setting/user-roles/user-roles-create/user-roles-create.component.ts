import { Component, OnInit, OnDestroy } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { IAppState } from '@app/store/state/app.state';
import { UntypedFormBuilder, UntypedFormGroup, Validators, UntypedFormControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import {
  GetUserRolesFunctionList,
  PostUserRoles,
  GetUserRolesDetails,
  PutUserRoles,
} from '@app/store/actions/user-roles.actions';
import {
  selectUserRolesCreate,
  selectUserRolesFunctionList,
  selectUserRolesDetails,
} from '@app/store/selectors/user-roles.selector';
import { UserRolesCreateEditConfig } from '@app/config/i18n/user-roles.config';
import { ClearState } from '@app/store/actions/user-roles.actions';
import { selectViewSettingsList } from '@app/store/selectors/view-settings.selector';
import { TranslateService } from '@ngx-translate/core';
import { Subject, Subscription } from 'rxjs';
import { AlertService } from '@app/services/alert.service';
import { takeUntil, takeWhile } from 'rxjs/operators';
import { ViewSettingGetObject } from '@app/models/view-settings.interface';
import { GetUsersRoleList } from '@app/store/actions/user.actions';
import { selectUserRolelist } from '@app/store/selectors/user.selector';
import { GetPermission } from '@app/store/actions/permissions.action';
import { UserRolesService } from '@app/services/user-roles.service';

@Component({
  selector: 'app-user-roles-create',
  styleUrls: ['./user-roles-create.component.scss'],
  templateUrl: './user-roles-create.component.html',
})
export class UserRolesCreateComponent implements OnInit, OnDestroy {
  public checkboxData: any = [];
  public currentLang: string;
  public checkboxDataObject: any = [];
  public checkboxDataArray: any = [];
  public functionList: any;
  public roleList: any = [];
  public temps: any = [];
  public Labels: any = UserRolesCreateEditConfig['texts']['en_EN'];
  public userRolesForm: UntypedFormGroup;
  public roleDetail: any;
  public onFirstLoad = true;
  public currentItem: any = {
    active: false,
    deleted: false,
    // description: "",
    id: null,
    locked: true,
    name: null,
    roleFunctions: null,
  };
  componetDestroyed = new Subject();
  submit = new Subscription();
  public submitted = false;
  public permissions: any = [];
  public hiddenLInk: any = [];
  constructor(
    private _store: Store<IAppState>,
    private _userRolesService: UserRolesService,
    private alertService: AlertService,
    private translate: TranslateService,
    private formBuilder: UntypedFormBuilder,
    private router: Router,
    private route: ActivatedRoute,
  ) {
    this._store.dispatch(new GetUsersRoleList());
    this._store
      .pipe(takeUntil(this.componetDestroyed), select(selectUserRolesFunctionList))
      .subscribe((response: any) => {
        if (response) {
          this.functionList = JSON.parse(JSON.stringify(response));
          this.temps = [].concat([...this.functionList]);
          this.functionList = this.functionTransform(this.functionList);
          if (this.route.snapshot.paramMap.get('id')) {
            this._store.dispatch(new GetUserRolesDetails(this.route.snapshot.paramMap.get('id')));
          }
        }
      });

    this._store
      .pipe(takeUntil(this.componetDestroyed), select(selectUserRolelist))
      .subscribe((roleData: any) => {
        if (roleData) {
          this.roleList = roleData;
        }
      });

    this._store
      .pipe(takeUntil(this.componetDestroyed), select(selectViewSettingsList))
      .subscribe((response: ViewSettingGetObject) => {
        if (response) {
          this.currentLang = response.data.settingDto.language;
          translate.setDefaultLang(this.currentLang);
        }
      });

    this._store
      .pipe(takeUntil(this.componetDestroyed), select(selectUserRolesCreate))
      .subscribe((response: any) => {
        if (response) {
          this._store.dispatch(new ClearState());
          this.submitted = false;
          if (response && response.status === 'success') {
            this.router.navigate(['/settings/user-roles']);
          }
        }
      });
    this._store
      .pipe(takeUntil(this.componetDestroyed), select(selectUserRolesDetails))
      .subscribe((UserRolesDetails: any) => {
        if (UserRolesDetails !== null) {
          this._updateFormGroup(UserRolesDetails.data);
        }
      });
    this._store
      .pipe(takeUntil(this.componetDestroyed), select(selectUserRolesFunctionList))
      .subscribe((response: any) => {
        if (response) {
          this.functionList = JSON.parse(JSON.stringify(response));
          this.temps = [].concat([...this.functionList]);
          this.functionList = this.functionTransform(this.functionList);
          if (this.route.snapshot.paramMap.get('id')) {
            this._store.dispatch(new GetUserRolesDetails(this.route.snapshot.paramMap.get('id')));
          }
        }
      });
  }

  functionTransform(result) {
    const output = [].concat([...result]);
    return output.map(item => {
      const permission = {
        check: false,
        create: false,
        delete: false,
        id: null,
        modify: false,
        subMenuFunction: {
          id: null,
          mappingUrl: null,
          name: '',
          permissionData: null,
          url: '',
        },
        view: false,
      };
      const originalPermission = {
        check: item.operation.check,
        create: item.operation.create,
        delete: item.operation.delete,
        modify: item.operation.modify,
        view: item.operation.view,
      };
      // permission.id = item.id;
      permission.subMenuFunction.id = item.id;
      permission.subMenuFunction.name = item.name;
      item.permission = permission;
      item.originalPermission = originalPermission;
      item.operation = this.transformData(item);
      return item;
    });
  }

  roleCustom(fullpayload: any, partialPayload: any, event) {
    this.onFirstLoad = false;
    const isStatus = event.currentTarget.checked;
    switch (partialPayload.key) {
      case 'create':
        fullpayload.permission[partialPayload.key] = isStatus;
        if (isStatus) {
          fullpayload.permission['view'] = fullpayload.originalPermission['view'] && true;
        }
        break;
      case 'modify':
        fullpayload.permission[partialPayload.key] = isStatus;
        if (isStatus) {
          fullpayload.permission['view'] = fullpayload.originalPermission['view'] && true;
        }
        break;
      case 'delete':
        fullpayload.permission[partialPayload.key] = isStatus;
        if (isStatus) {
          fullpayload.permission['view'] = fullpayload.originalPermission['view'] && true;
        }
        break;
      case 'check':
        if (isStatus) {
          fullpayload.permission['view'] = fullpayload.originalPermission['view'] && true;
          fullpayload.permission['create'] = fullpayload.originalPermission['create'] && true;
          fullpayload.permission['modify'] = fullpayload.originalPermission['modify'] && true;
          fullpayload.permission['delete'] = fullpayload.originalPermission['delete'] && true;
          fullpayload.permission['check'] = fullpayload.originalPermission['check'] && true;
        } else {
          fullpayload.permission['check'] = false;
        }
        break;
      default:
        if (!isStatus) {
          fullpayload.permission['view'] = false;
          fullpayload.permission['create'] = false;
          fullpayload.permission['modify'] = false;
          fullpayload.permission['delete'] = false;
          fullpayload.permission['check'] = false;
        }
        fullpayload.permission[partialPayload.key] = isStatus;
        break;
    }
  }

  itemRemove(event) {
    this.functionList = this.functionList.map(item => {
      if (item.id === event.value.id) {
        item.permission.view = false;
        item.permission.create = false;
        item.permission.modify = false;
        item.permission.delete = false;
        item.permission.check = false;
        return item;
      } else {
        return item;
      }
    });
  }

  ngOnInit() {
    this._store.dispatch(new GetUserRolesFunctionList());
    this.userRolesForm = this.formBuilder.group({
      //  description: [this.currentItem.description, [Validators.required]],
      id: [this.currentItem.id],
      locked: [this.currentItem.locked, [Validators.required]],
      name: [this.currentItem.name, [Validators.required]],
      roleFunctions: [this.currentItem.roleFunctions, [Validators.required]],
    });
  }

  private _updateFormGroup(updatedData: any) {
    if (this.userRolesForm) {
      this.userRolesForm.patchValue({
        // description: updatedData.description,
        id: updatedData.id,
        locked: !updatedData.locked,
        name: updatedData.name,
        roleFunctions: this.updateFunctionList(updatedData.roleFunctions),
      });
      this.currentItem.locked = !updatedData.locked;
    }
  }

  updateFunctionList(roleFunctions) {
    this.checkboxDataObject = [];
    this.functionList.map(item => {
      const output = roleFunctions.find(value => {
        return value.subMenuFunction.id === item.id;
      });
      if (output) {
        item.permission = output;

        this.checkboxDataObject.push(item);
        return item;
      } else {
        return item;
      }
    });
    return this.checkboxDataObject;
  }

  onSubmitUserRolesForm({ value }) {
    if (this.userRolesForm.valid) {
      const payload = Object.assign({}, this.currentItem);
      payload.id = this.route.snapshot.paramMap.get('id')
        ? parseInt(this.route.snapshot.paramMap.get('id'))
        : null;
      // payload.description = value.description;
      payload.id = value.id;
      payload.name = value.name;
      payload.locked = !value.locked;
      payload.roleFunctions = this.checkboxDataObject.map(item => {
        return {
          check: item.permission['check'] && item.originalPermission['check'],
          create: item.permission['create'] && item.originalPermission['create'],
          delete: item.permission['delete'] && item.originalPermission['delete'],
          id: payload.id ? item.permission.id : null,
          modify: item.permission['modify'] && item.originalPermission['modify'],
          subMenuFunction: {
            id: item.permission.subMenuFunction.id,
            mappingUrl: item.permission.subMenuFunction.mappingUrl,
            name: item.name,
            permissionData: item.permission.subMenuFunction.permissionData,
            url: item.permission.subMenuFunction.url,
          },
          view: item.permission['view'] && item.originalPermission['view'],
        };
      });
      if (this.route.snapshot.paramMap.get('id')) {
        this._store.dispatch(new PutUserRoles(payload));
      } else {
        this._store.dispatch(new PostUserRoles(payload));
      }
      this.submitted = true;
      this.isSubmitted();
    } else {
      this.validateAllFormFields(this.userRolesForm);
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
  checkStatus() {
    this.currentItem.locked = !this.currentItem.locked;
  }

  public f() {
    return this.userRolesForm.controls;
  }

  public valuePush(data: any) {
    this.checkboxDataObject = data;
  }

  public transformData(data) {
    let findkey = this.hiddenLInk.find(it => parseInt(data.id) === parseInt(it.id));
    if (findkey) {
      delete data.operation.delete;
      delete data.operation.create;
      delete data.operation.check;
      delete data.operation.modify;
    }
    const output = Object.keys(data.operation);
    return output.map(value => {
      return {
        key: value,
        value: data.operation[value],
      };
    });
  }

  isFieldValid(field: string) {
    return !this.userRolesForm.get(field).valid && this.userRolesForm.get(field).touched;
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
    this.componetDestroyed.next();
    this.submit.unsubscribe();
    this._store.dispatch(new ClearState());
    this.componetDestroyed.unsubscribe();
  }
}
