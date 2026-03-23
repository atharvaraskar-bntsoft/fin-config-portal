import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VelocityLimitsComponent } from './velocity-limits.component';
import { ModalModule } from 'angular-custom-modal';
import { VelocityLimitsRoutingModule } from './velocity-limits-routing.module';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { AlertModule, TabsModule, InputRvModule } from 'bnt';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { VelocityLimitsInfoComponent } from './velocity-limits-info/velocity-limits-info.component';
import { VelocityLimitsCreateComponent } from './velocity-limits-create/velocity-limits-create.component';
import { AuthGuard } from '@app/services/guards/auth-guard.service';
import { SharedModule } from '@app/shared/shared.module';

@NgModule({
  declarations: [
    VelocityLimitsComponent,
    VelocityLimitsCreateComponent,
    VelocityLimitsInfoComponent,
  ],
  imports: [
    SharedModule,
    AlertModule,
    CommonModule,
    NgxDatatableModule,
    VelocityLimitsRoutingModule,
    ModalModule,
    NgSelectModule,
    FormsModule,
    ReactiveFormsModule,
    TabsModule,
    InputRvModule,
  ],
  providers: [AuthGuard],
})
export class VelocityLimitsModule {}
