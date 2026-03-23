import { DekComponent } from './dek.component';
import { DekCreateComponent } from './dek-create/dek-create.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '@app/services/guards/auth-guard.service';

const routes: Routes = [
  {
    canActivate: [AuthGuard],
    component: DekComponent,
    path: '',
    data: {
      permission: 'read',
      id: 'link_dek',
    },
  },
  {
    canActivate: [AuthGuard],
    component: DekCreateComponent,
    data: {
      permission: 'write',
      title: 'Generate MEK',
      id: 'link_dek',
    },
    path: 'create',
  },
];

@NgModule({
imports: [RouterModule.forChild(routes)],
exports: [RouterModule],
})

export class DekRoutingModule {}
