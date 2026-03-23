import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { LoginRoutingModule } from './login-routing.module';
import { LoginComponent } from './login.component';
import { ServerErrorComponent } from './server-error/server-error.component';
import { TokenExpiredComponent } from "./token-expired/token-expired.component"
import { SharedModule } from '@app/shared/shared.module';

@NgModule({
  declarations: [LoginComponent, ServerErrorComponent,TokenExpiredComponent],
  imports: [
    CommonModule,
    SharedModule,
    ReactiveFormsModule,
    LoginRoutingModule,
    FormsModule,
  ],
})
export class LoginModule {}
