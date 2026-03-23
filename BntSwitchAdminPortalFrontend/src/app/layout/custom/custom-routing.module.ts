import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CustomComponent } from './custom.component';

const routes: Routes = [
  {
    component: CustomComponent,
    path: '',
  },
];

@NgModule({
  exports: [RouterModule],
  imports: [RouterModule.forChild(routes)],
})
export class CustomRoutingModule {}
