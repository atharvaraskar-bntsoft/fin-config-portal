import { CreateEntitiesComponent } from './create-entities/create-entities.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ExportEntitiesComponent } from './export-entities.component';
import { AuthGuard } from '@app/services/guards/auth-guard.service';

const routes: Routes = [
  {
    canActivate: [AuthGuard],
    component: ExportEntitiesComponent,
    path: '',
  },
  {
    data: {
      id: 'link_exports',
      permission: 'write',
      title: 'Create Snapshot',
      page: 'create',
    },
    canActivate: [AuthGuard],
    component: CreateEntitiesComponent,
    path: 'create-entities',
  },

  {
    data: {
      id: 'link_exports',
      permission: 'read',
      title: 'View Snapshot Details',
      page: 'details',
    },
    canActivate: [AuthGuard],
    component: CreateEntitiesComponent,
    path: 'view-details/:id',
  },
  {
    data: {
      id: 'link_exports',
      permission: 'read',
      title: 'Import Snapshot',
      page: 'details',
    },
    canActivate: [AuthGuard],
    component: ExportEntitiesComponent,
    path: 'import-snapshot',
  },
];

@NgModule({
  exports: [RouterModule],
  imports: [RouterModule.forChild(routes)],
})
export class ExportEntitiesRoutingModule {}
