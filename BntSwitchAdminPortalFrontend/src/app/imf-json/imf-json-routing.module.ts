import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ImfJsonComponent } from './imf-json.component';
import { AuthGuard } from '@app/services/guards/auth-guard.service';
import { ImfJsonCreateComponent } from './imf-json-create/imf-json-create.component';

const routes: Routes = [
  {
    canActivate: [AuthGuard],
    component: ImfJsonComponent,
    data: {
      id: 'link_imf',
      permission: 'read',
    },
    path: '',
  },
  {
    canActivate: [AuthGuard],
    component: ImfJsonCreateComponent,
    data: {
      id: 'link_imf',
      permission: 'write',
      title: 'Create IMF',
    },
    path: 'create',
  },
  {
    canActivate: [AuthGuard],
    component: ImfJsonCreateComponent,
    data: {
      id: 'link_imf',
      permission: 'update',
      title: 'Edit IMF',
    },
    path: 'edit/:id',
  },
];

@NgModule({
  exports: [RouterModule],
  imports: [RouterModule.forChild(routes)],
})
export class ImfJsonRoutingModule {}
