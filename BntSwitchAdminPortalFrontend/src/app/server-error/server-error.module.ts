import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ServerErrorRoutingModule } from './server-error-routing.module';
import { AccessErrorComponent } from './access/access-error.component';
import { NotFoundComponent } from './not-found/not-found.component';

@NgModule({
  declarations: [AccessErrorComponent, NotFoundComponent],
  imports: [CommonModule, ServerErrorRoutingModule],
})
export class ServerErrorModule {}
