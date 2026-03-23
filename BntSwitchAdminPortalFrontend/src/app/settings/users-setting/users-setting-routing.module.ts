import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UsersComponent } from './users/users.component';
import { UserRolesComponent } from './user-roles/user-roles.component';
import { UserRolesCreateComponent } from './user-roles/user-roles-create/user-roles-create.component';
import { AuthGuard } from '@app/services/guards/auth-guard.service';

const routes: Routes = [
  {
    canActivate: [AuthGuard],
    component: UsersComponent,
    data: {
      id: 'link_user',
      permission: 'read',
      title: 'Users',
    },
    path: 'users',
  },
  {
    canActivate: [AuthGuard],
    component: UserRolesComponent,
    data: {
      id: 'link_user_roles',
      permission: 'read',
      title: 'Role Mapping',
    },
    path: 'user-roles',
  },
  {
    canActivate: [AuthGuard],
    component: UserRolesCreateComponent,
    data: {
      id: 'link_user_roles',
      permission: 'write',
      title: 'Create Role Mapping',
    },
    path: 'user-roles/create',
  },
  {
    canActivate: [AuthGuard],
    component: UserRolesCreateComponent,
    data: {
      id: 'link_user_roles',
      permission: 'update',
      title: 'Edit Role Mapping',
    },
    path: 'user-roles/edit/:id',
  },
];

@NgModule({
  exports: [RouterModule],
  imports: [RouterModule.forChild(routes)],
})
export class UsersSettingRoutingModule {}
