import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WorkflowComponent } from './workflow.component';
import { AddWorkflowsComponent } from './add-workflows/add-workflows.component';
import { AuthGuard } from '@app/services/guards/auth-guard.service';

const routes: Routes = [
  {
    canActivate: [AuthGuard],
    component: WorkflowComponent,
    path: '',
    data: {
      id: 'link_workflow',
      permission: 'read',
    },
  },
  {
    canActivate: [AuthGuard],
    component: AddWorkflowsComponent,
    data: {
      id: 'link_workflow',
      permission: 'write',
      title: 'Create Workflow',
    },
    path: 'create',
  },
  {
    canActivate: [AuthGuard],
    component: AddWorkflowsComponent,
    data: {
      id: 'link_workflow',
      permission: 'update',
      title: 'Edit Workflow',
    },
    path: 'edit/:id',
  },
  {
    canActivate: [AuthGuard],
    component: AddWorkflowsComponent,
    data: {
      id: 'link_workflow',
      permission: 'read',
      title: 'View Workflow',
    },
    path: ':id/:view',
  },
];

@NgModule({
  exports: [RouterModule],
  imports: [RouterModule.forChild(routes)],
})
export class WorkflowRoutingModule {}
