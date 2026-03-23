import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RouterRoutingModule } from './router-routing.module';
import { RouterComponent } from './router.component';
import { NgxJsonViewerModule } from 'ngx-json-viewer';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { PrettyJsonRvModule } from 'bnt';
import { CreateRouterComponent } from './create-router/create-router.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule } from '@angular/forms';
// import { AddRouterVersionComponent } from './add-router-version/add-router-version.component';
import { SharedModule } from '@app/shared/shared.module';
// import { RouterDetailsComponent } from './router-details/router-details.component';
import { DestinationTableComponent } from './destination-table/destination-table.component';
import { AuthGuard } from '@app/services/guards/auth-guard.service';

@NgModule({
  declarations: [
    RouterComponent,
    CreateRouterComponent,
    // AddRouterVersionComponent,
    // RouterDetailsComponent,
    DestinationTableComponent,
  ],
  imports: [
    SharedModule,
    CommonModule,
    RouterRoutingModule,
    NgxDatatableModule,
    NgxJsonViewerModule,
    PrettyJsonRvModule,
    NgSelectModule,
    FormsModule,
  ],
  providers: [AuthGuard],
})
export class RouterModule {}
