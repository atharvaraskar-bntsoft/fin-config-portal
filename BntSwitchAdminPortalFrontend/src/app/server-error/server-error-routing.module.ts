import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AccessErrorComponent } from './access/access-error.component';
import { NotFoundComponent } from './not-found/not-found.component';

const routes: Routes = [
  {
    component: AccessErrorComponent,
    path: 'access-denied',
    data: { title: 'Access Denied' },
  },
  {
    component: NotFoundComponent,
    path: 'not-found',
    data: { title: 'Page Not Found' },
  },
];

@NgModule({
  exports: [RouterModule],
  imports: [RouterModule.forChild(routes)],
})
export class ServerErrorRoutingModule {}
