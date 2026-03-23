import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '@app/services/guards/auth-guard.service';
import { RuleEngineComponent } from './rule-engine.component';

const routes: Routes = [
  {
    canActivate: [AuthGuard],
    component: RuleEngineComponent,
    path: '',
    data: {
      id: 'link_routing_rule',
      permission: 'write',
    },
  },
  {
    canActivate: [AuthGuard],
    component: RuleEngineComponent,
    path: 'edit/:id',
    data: {
      id: 'link_routing_rule',
      permission: 'update',
    },
  },
];

@NgModule({
  exports: [RouterModule],
  imports: [RouterModule.forChild(routes)],
})
export class RuleEngineRoutingModule {}
