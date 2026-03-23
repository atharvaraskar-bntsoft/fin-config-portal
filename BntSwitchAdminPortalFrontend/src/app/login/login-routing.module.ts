import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login.component';
import { ServerErrorComponent } from './server-error/server-error.component';
import { TokenExpiredComponent } from "./token-expired/token-expired.component"

const routes: Routes = [
  {
    children: [
      {
        component: ServerErrorComponent,
        data: {
          customLayout: true,
        },
        path: 'denied',
      },
      {
        component: TokenExpiredComponent,
        data: {
          customLayout: true,
        },
        path: "token-expired"
      }
    ],
    component: LoginComponent,
    path: '',
  },
];

@NgModule({
  exports: [RouterModule],
  imports: [RouterModule.forChild(routes)],
})
export class LoginRoutingModule {}
