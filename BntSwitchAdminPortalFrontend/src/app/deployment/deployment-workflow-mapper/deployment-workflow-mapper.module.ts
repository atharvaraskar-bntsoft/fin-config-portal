import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DeploymentWorkflowMapperRoutingModule } from './deployment-workflow-mapper-routing.module';
import { DeploymentWorkflowMapperComponent } from './deployment-workflow-mapper.component';
import { SharedModule } from '@app/shared/shared.module';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { NgSelectModule } from '@ng-select/ng-select';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AlertModule, PrettyJsonRvModule } from 'bnt';
import { ModalModule } from 'angular-custom-modal';
import { AuthGuard } from '@app/services/guards/auth-guard.service';

@NgModule({
  declarations: [DeploymentWorkflowMapperComponent],
  imports: [
    CommonModule,
    DeploymentWorkflowMapperRoutingModule,
    SharedModule,
    NgxDatatableModule,
    NgSelectModule,
    ReactiveFormsModule,
    PrettyJsonRvModule,
    ModalModule,
    FormsModule,
    AlertModule,
  ],
  providers: [AuthGuard],
})
export class DeploymentWorkflowMapperModule {}
