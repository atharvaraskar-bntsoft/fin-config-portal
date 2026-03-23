import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DeploymentStatusRoutingModule } from './deployment-status-routing.module';
import { DeploymentStatusComponent } from './deployment-status.component';
import { SharedModule } from '@app/shared/shared.module';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { NgSelectModule } from '@ng-select/ng-select';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AlertModule, DatePickerRvModule } from 'bnt';
import { ScheduleComponent } from '../schedule/schedule.component';
import { CreateDeploymentComponent } from '../schedule/create-deployment/create-deployment.component';
import { AuthGuard } from '@app/services/guards/auth-guard.service';

@NgModule({
  declarations: [DeploymentStatusComponent, ScheduleComponent, CreateDeploymentComponent],
  imports: [
    CommonModule,
    DeploymentStatusRoutingModule,
    SharedModule,
    NgxDatatableModule,
    NgSelectModule,
    ReactiveFormsModule,
    FormsModule,
    AlertModule,
    DatePickerRvModule,
  ],
  providers: [AuthGuard],
})
export class DeploymentStatusModule {}
