import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DestinationRulesComponent } from './destination-rules.component';
// import { DestinationRulesAddComponent } from '../destination-rules-add/destination-rules-add.component';
import { DestinationRulesViewComponent } from './destination-rules-view/destination-rules-view.component';
import { SharedModule } from '@app/shared/shared.module';
import { AuthGuard } from '@app/services/guards/auth-guard.service';

const routes: Routes = [
  {
    canActivate: [AuthGuard],
    component: DestinationRulesComponent,
    path: '',
    data: {
      id: 'link_routing_rule',
      permission: 'read',
    },
  },
  // {
  //   canActivate: [AuthGuard],
  //   component: DestinationRulesAddComponent,
  //   path: 'add',
  // },
  {
    canActivate: [AuthGuard],
    component: DestinationRulesViewComponent,
    path: 'view',
  },
];

@NgModule({
  exports: [RouterModule],
  imports: [RouterModule.forChild(routes), SharedModule],
})
export class DestinationRulesRoutingModule {}
