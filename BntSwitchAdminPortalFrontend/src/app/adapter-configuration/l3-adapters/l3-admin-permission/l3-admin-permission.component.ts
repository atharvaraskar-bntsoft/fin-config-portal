import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { L3AdapterService } from '@app/services/l3-adapter.service';

@Component({
  selector: 'app-l3-admin-permission',
  templateUrl: './l3-admin-permission.component.html',
  styleUrls: ['./l3-admin-permission.component.css'],
})
export class L3AdminPermissionComponent implements OnInit {
  public adminArrayList: any = {};
  public usedUserList: any = [];
  public listOfUsers: any = [];
  public selectedUser: any = [];
  public checkedView: boolean = false;
  public checkedEdit: boolean = false;
  public checkedAdmin: boolean = false;
  public adapterId: any = null;
  @Input() isVisible: boolean;
  @Input() selctedAdapter: any;
  @Output() closePopup = new EventEmitter<boolean>();
  @Output() saveAdmin: EventEmitter<any> = new EventEmitter();
  public adminJson = {
    userIDPermission: [
      {
        userID: null,
        permission: {
          edit: null,
          view: null,
          admin: null,
        },
      },
    ],
  };
  public form: FormGroup;
  public adminList: FormArray;
  constructor(private _l3AdapterService: L3AdapterService, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.userListData();

    this.form = this.fb.group({
      userIDPermission: this.fb.array([
        this.createAdminForm({
          userID: null,
          view: null,
          edit: null,
          admin: null,
        }),
      ]),
    });

    this.adminList = this.form.get('userIDPermission') as FormArray;
  }

  createAdminForm(item: any): FormGroup {
    return this.fb.group({
      userID: item.userID,
      view: item.view,
      edit: item.edit,
      admin: item.admin,
    });
  }

  addAdminList() {
    this.adminList.push(
      this.createAdminForm({
        userID: null,
        view: null,
        edit: null,
        admin: null,
      }),
    );
  }

  get adminFormGroup() {
    return this.form.get('userIDPermission') as FormArray;
  }

  userListData() {
    this._l3AdapterService.getUserList().subscribe(item => {
      this.listOfUsers = item.data.usersList;
    });
  }

  close(): void {
    this.selectedUser = [];
    this.isVisible = false;
    this.closePopup.emit(this.isVisible);
  }

  openChange(event: any) {
    this.usedUserList.forEach(element => {
      const elementIndex = this.listOfUsers.findIndex(el => el === element);
      if (elementIndex > -1) {
        this.listOfUsers.splice(elementIndex, 1);
      }
    });
  }

  setValue(data: any) {
    if (data) {
      this.usedUserList.push(data);
    }
  }

  setCheckedView(event: any) {
    this.checkedView = event;
  }

  setCheckedEdit(event: any) {
    this.checkedEdit = event;
  }

  setCheckedAdmin(event: any) {
    this.checkedAdmin = event;
  }

  saveForm() {
    let data = this.adminJson;
    if (data) {
      data = this.form.value;
    }
    return data;
  }

  save() {
    this.saveAdmin.emit(this.saveForm());
  }

  removeconnectionList(index: any) {
    const eleIndex = this.adminList.value[index];
    this.listOfUsers.push(eleIndex.userID);
    const elementIndex = this.usedUserList.findIndex(el => el.id === eleIndex.userID.id);
    if (elementIndex > -1) {
      this.usedUserList.splice(elementIndex, 1);
    }
    if (this.adminList.length > 1) {
      this.adminList.removeAt(index);
    }
  }
}
