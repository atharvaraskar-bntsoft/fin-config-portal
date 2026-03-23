import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MerchantCodeMappingComponent } from './merchant-code-mapping.component';
import { MerchantCodeMappingCreateComponent } from './merchant-code-mapping-create/merchant-code-mapping-create.component';
import { AuthGuard } from '@app/services/guards/auth-guard.service';

const routes: Routes = [
  {
    canActivate: [AuthGuard],
    component: MerchantCodeMappingComponent,
    data: {
      id: 'link_mid',
      permission: 'read',
    },
    path: '',
  },
  {
    canActivate: [AuthGuard],
    component: MerchantCodeMappingCreateComponent,
    data: {
      id: 'link_mid',
      permission: 'write',
    },
    path: 'create',
  },
  {
    canActivate: [AuthGuard],
    component: MerchantCodeMappingCreateComponent,
    data: {
      id: 'link_mid',
      permission: 'update',
    },
    path: 'edit/:id',
  },
];

@NgModule({
  exports: [RouterModule],
  imports: [RouterModule.forChild(routes)],
})
export class MerchantCodeMappingRoutingModule {}
