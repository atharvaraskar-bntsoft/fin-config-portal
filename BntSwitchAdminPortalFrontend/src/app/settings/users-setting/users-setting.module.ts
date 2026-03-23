import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { AlertModule, InputRvModule } from 'bnt';
import { UsersSettingRoutingModule } from './users-setting-routing.module';
import { UsersComponent } from './users/users.component';
import { UserRolesComponent } from './user-roles/user-roles.component';
import { UserRolesCreateComponent } from './user-roles/user-roles-create/user-roles-create.component';
import { AuthGuard } from '@app/services/guards/auth-guard.service';
import { SharedModule } from '@app/shared/shared.module';

@NgModule({
  declarations: [UsersComponent, UserRolesComponent, UserRolesCreateComponent],
  exports: [CommonModule, FormsModule, ReactiveFormsModule],
  imports: [
    SharedModule,
    AlertModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgxDatatableModule,
    NgSelectModule,
    ReactiveFormsModule,
    UsersSettingRoutingModule,
    InputRvModule,
  ],
  providers: [AuthGuard],
})
export class UsersSettingModule {}
