import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProcessorAdapterComponent } from './processor-adapter.component';
import { ProcessorAdapterCreateComponent } from './processor-adapter-create/processor-adapter-create.component';
import { AuthGuard } from '@app/services/guards/auth-guard.service';

const routes: Routes = [
  {
    canActivate: [AuthGuard],
    component: ProcessorAdapterComponent,
    data: {
      id: 'link_processor_adapter',
      permission: 'read',
      title: 'DESTINATION_END_POINT',
    },
    path: '',
  },
  {
    canActivate: [AuthGuard],
    component: ProcessorAdapterCreateComponent,
    data: {
      id: 'link_processor_adapter',
      permission: 'write',
      title: 'DESTINATION_END_POINT_CREATE',
    },
    path: 'create',
  },
  {
    canActivate: [AuthGuard],
    component: ProcessorAdapterCreateComponent,
    data: {
      id: 'link_processor_adapter',
      permission: 'update',
      title: 'DESTINATION_ROUTER_EDIT',
    },
    path: 'edit/:id',
  },
  {
    canActivate: [AuthGuard],
    component: ProcessorAdapterCreateComponent,
    data: {
      id: 'link_processor_adapter',
      permission: 'read',
      title: 'View Destination',
    },
    path: ':id/:view',
  },
];

@NgModule({
  exports: [RouterModule],
  imports: [RouterModule.forChild(routes)],
})
export class ProcessorAdapterRoutingModule {}
