import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '@app/services/guards/auth-guard.service';
import { JsonCompareComponent } from './json-compare.component';

const routes: Routes = [
  {
    canActivate: [AuthGuard],
    component: JsonCompareComponent,
    data: {
      id: 'link_l1_adapters',
      permission: 'write',
      title: 'Json Compare',
    },
    path: '',
  },
];

@NgModule({
  exports: [RouterModule],
  imports: [RouterModule.forChild(routes)],
})
export class JsonCompreRoutingModule {}
