import { EmvMappingComponent } from './../emv-mapping/emv-mapping.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AccountTypeDetailsComponent } from './account-type-details/account-type-details.component';
import { BinTableDetailsComponent } from './bin-table-details/bin-table-details.component';
import { BinTableComponent } from './bin-table.component';
import { AuthGuard } from '@app/services/guards/auth-guard.service';

const routes: Routes = [
  {
    canActivate: [AuthGuard],
    component: BinTableComponent,
    data: {
      id: 'link_bin_table',
      permission: 'read',
      title: 'Bin Table',
    },
    path: 'bin-table',
  },
  {
    canActivate: [AuthGuard],
    component: BinTableDetailsComponent,
    data: {
      id: 'link_bin_table',
      permission: 'read',
      title: 'Bin Table Detail',
    },
    path: 'bin-table/bin-table-details/:id',
  },
  {
    canActivate: [AuthGuard],
    component: AccountTypeDetailsComponent,
    data: {
      id: 'link_bin_table',
      permission: 'read',
      title: 'Account Type Detail',
    },
    path: 'bin-table/account-type-details/:id',
  },
  {
    canActivate: [AuthGuard],
    component: EmvMappingComponent,
    data: {
      id: 'link_emv_data',
      permission: 'read',
      title: 'EMV DATA',
    },
    path: 'emv-data',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BinTableRoutingModule {}
