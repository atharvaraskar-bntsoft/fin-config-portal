import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '@app/services/guards/auth-guard.service';
import { ExtractorCreateComponent } from './extractor-create/extractor-create.component';
import { ExtractorJobConfigComponent } from './extractor-create/extractor-job-config/extractor-job-config.component';
import { ExtractorUiComponent } from './extractor-ui.component';

const routes: Routes = [
  {
    canActivate: [AuthGuard],
    component: ExtractorUiComponent,
    data: {
      id: 'link_extractor',
      permission: 'read',
    },
    path: '',
  },
  {
    canActivate: [AuthGuard],
    component: ExtractorCreateComponent,
    data: {
      id: 'link_extractor',
      permission: 'read',
      title: 'Create Extractor'
    },
    path: 'create',
  },
  {
    canActivate: [AuthGuard],
    component: ExtractorCreateComponent,
    data: {
      id: 'link_extractor',
      permission: 'update',
      title: 'Edit Extractor',
    },
    path: 'edit/:id',
  },
  {
    canActivate: [AuthGuard],
    component: ExtractorJobConfigComponent,
    data: {
      id: 'link_extractor',
      permission: 'read',
    },
    path: 'job-config',
  }
];

@NgModule({
  exports: [RouterModule],
  imports: [RouterModule.forChild(routes)],
})
export class ExtractorUiRoutingModule { }
