import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SwitchClustersRoutingModule } from './switch-clusters-routing.module';
import { SwitchClustersComponent } from './switch-clusters.component';
import { SwitchClustersCreateComponent } from './switch-clusters-create/switch-clusters-create.component';
import { SharedModule } from '@app/shared/shared.module';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { NgSelectModule } from '@ng-select/ng-select';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AlertModule, InputRvModule } from 'bnt';
import { AuthGuard } from '@app/services/guards/auth-guard.service';

@NgModule({
  declarations: [SwitchClustersComponent, SwitchClustersCreateComponent],
  imports: [
    CommonModule,
    SwitchClustersRoutingModule,
    SharedModule,
    NgxDatatableModule,
    NgSelectModule,
    InputRvModule,
    ReactiveFormsModule,
    FormsModule,
    AlertModule,
  ],
  providers: [AuthGuard],
})
export class SwitchClustersModule {}
