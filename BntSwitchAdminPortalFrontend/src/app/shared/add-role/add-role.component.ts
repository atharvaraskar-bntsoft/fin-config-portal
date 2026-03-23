import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AddRoleService } from '../../services/add-role.service';

@Component({
  selector: 'app-add-role',
  templateUrl: './add-role.component.html',
  styleUrls: ['./add-role.component.css']
})
export class AddRoleComponent implements OnInit {

  @Input() visibleRolePopup;
  @Input() value = '';
  @Input() readOnlyFlag;
  @Input() defaultRole;
  @Output() closePopup = new EventEmitter<boolean>();
  @Output() saveRoles: EventEmitter<any> = new EventEmitter();
  multipleValue;
  listOfRoles : any
  public roles: any = [];

  constructor(
    private _addRoleService: AddRoleService,
  ) { }

  ngOnInit(): void {
    this._addRoleService.getAddRoleList().subscribe((item)=> {
      console.log(item.data);
      this.listOfRoles = item.data;
    })
  }

  close(): void {
    this.roles = [];
    this.visibleRolePopup = false;
    this.closePopup.emit(this.visibleRolePopup);
    // this.drawerRef.close({
    //   action: 'close',
    // });
  }

  selValue(event: any) {
    this.roles = event;
  }

  save() { 
    this.saveRoles.emit(this.roles);
    // this.drawerRef.close({
    //   action: 'save',
    //   visibleRolePopup: false,
    //   defaultRole: this.roles,
    // });
  }

}
